from fastapi import FastAPI, APIRouter, HTTPException, Request, Header
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, EmailStr, BeforeValidator, ConfigDict
from typing import List, Optional, Annotated
from datetime import datetime, timezone
from bson import ObjectId
import stripe

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

from catalog import HATS  # noqa: E402

client = AsyncIOMotorClient(os.environ['MONGO_URL'])
db = client[os.environ['DB_NAME']]
stripe.api_key = os.environ["STRIPE_SECRET_KEY"]
STRIPE_WEBHOOK_SECRET = os.environ["STRIPE_WEBHOOK_SECRET"]
ADMIN_PASSCODE = os.environ["ADMIN_PASSCODE"]
TAX_MODE = "calc_only"

app = FastAPI()
api = APIRouter(prefix="/api")
logger = logging.getLogger(__name__)
logging.basicConfig(level=logging.INFO)

PyObjectId = Annotated[str, BeforeValidator(lambda v: str(v) if isinstance(v, ObjectId) else v)]


def now():
    return datetime.now(timezone.utc).isoformat()


class BaseDocument(BaseModel):
    model_config = ConfigDict(populate_by_name=True)
    id: Optional[PyObjectId] = Field(default=None, alias="_id")

    @classmethod
    def from_mongo(cls, doc):
        return cls(**doc)

    def to_mongo(self):
        d = self.model_dump(by_alias=True, exclude={"id"})
        return d


class Product(BaseDocument):
    slug: str
    name: str
    price: float
    currency: str = "CAD"
    tagline: str = ""
    description: str
    details: List[str] = []
    images: List[str] = []
    sold: bool = False
    order: int = 0


class CustomRequestIn(BaseModel):
    name: str = Field(min_length=1)
    email: EmailStr
    phone: Optional[str] = ""
    base_hat: str = ""
    colours: str = ""
    band: str = ""
    details: List[str] = []
    head_size: str = ""
    budget: str = ""
    vision: str = Field(min_length=1)
    reference_hat: Optional[str] = ""


class CustomRequest(BaseDocument, CustomRequestIn):
    created_at: str = Field(default_factory=now)
    status: str = "new"


class ContactIn(BaseModel):
    name: str = Field(min_length=1)
    email: EmailStr
    phone: Optional[str] = ""
    message: str = Field(min_length=1)


class ContactMessage(BaseDocument, ContactIn):
    created_at: str = Field(default_factory=now)


class Transaction(BaseDocument):
    session_id: str
    slugs: List[str]
    amount: float
    currency: str = "cad"
    status: str = "initiated"
    payment_status: str = "pending"
    created_at: str = Field(default_factory=now)
    updated_at: str = Field(default_factory=now)


class CheckoutIn(BaseModel):
    slugs: List[str] = Field(min_length=1, max_length=20)
    origin_url: str


class SoldIn(BaseModel):
    sold: bool


@app.on_event("startup")
async def seed():
    for h in HATS:
        existing = await db.products.find_one({"slug": h["slug"]})
        fields = {k: v for k, v in h.items()}
        if existing:
            await db.products.update_one({"slug": h["slug"]}, {"$set": fields})
        else:
            await db.products.insert_one(Product(**fields).to_mongo())


@api.get("/")
async def root():
    return {"message": "Renegade Hats API"}


@api.get("/products", response_model=List[Product], response_model_by_alias=False)
async def list_products():
    docs = await db.products.find().sort("order", 1).to_list(200)
    return [Product.from_mongo(d) for d in docs]


@api.get("/products/{slug}", response_model=Product, response_model_by_alias=False)
async def get_product(slug: str):
    doc = await db.products.find_one({"slug": slug})
    if not doc:
        raise HTTPException(404, "Hat not found")
    return Product.from_mongo(doc)


@api.post("/custom-requests")
async def create_custom(req: CustomRequestIn):
    item = CustomRequest(**req.model_dump())
    await db.custom_requests.insert_one(item.to_mongo())
    return {"ok": True}


@api.post("/contact")
async def create_contact(req: ContactIn):
    item = ContactMessage(**req.model_dump())
    await db.contact_messages.insert_one(item.to_mongo())
    return {"ok": True}


async def mark_paid(session_id: str, payment_intent=None):
    res = await db.payment_transactions.find_one_and_update(
        {"session_id": session_id, "payment_status": {"$ne": "paid"}},
        {"$set": {"status": "completed", "payment_status": "paid",
                  "stripe_payment_intent_id": payment_intent, "updated_at": now()}},
    )
    if res:
        await db.products.update_many({"slug": {"$in": res["slugs"]}}, {"$set": {"sold": True}})


@api.post("/payments/checkout")
async def checkout(req: CheckoutIn):
    slugs = list(dict.fromkeys(req.slugs))
    docs = await db.products.find({"slug": {"$in": slugs}}).to_list(50)
    if len(docs) != len(slugs):
        raise HTTPException(404, "One or more hats were not found")
    sold = [d["name"] for d in docs if d.get("sold")]
    if sold:
        raise HTTPException(409, f"Already sold: {', '.join(sold)}")
    line_items = []
    for s in slugs:
        prices = stripe.Price.list(lookup_keys=[f"hat_{s}"], active=True, limit=1).data
        if not prices:
            raise HTTPException(500, f"Price not found for {s}")
        line_items.append({"price": prices[0].id, "quantity": 1})
    kwargs = dict(
        line_items=line_items, mode="payment",
        success_url=f"{req.origin_url}/payment/success?session_id={{CHECKOUT_SESSION_ID}}",
        cancel_url=f"{req.origin_url}/payment/cancel",
        shipping_address_collection={"allowed_countries": ["CA", "US"]},
        metadata={"slugs": ",".join(slugs)},
    )
    try:
        session = stripe.checkout.Session.create(**kwargs, automatic_tax={"enabled": True},
                                                 billing_address_collection="required")
    except stripe.error.InvalidRequestError as e:
        logger.warning("automatic tax unavailable, falling back: %s", e.user_message)
        session = stripe.checkout.Session.create(**kwargs)
    tx = Transaction(session_id=session.id, slugs=slugs, amount=float(sum(d["price"] for d in docs)))
    await db.payment_transactions.insert_one(tx.to_mongo())
    return {"checkout_url": session.url, "session_id": session.id}


@api.get("/payments/status/{session_id}")
async def payment_status(session_id: str):
    record = await db.payment_transactions.find_one({"session_id": session_id})
    if not record:
        raise HTTPException(404, "Transaction not found")
    if record.get("payment_status") != "paid":
        try:
            s = stripe.checkout.Session.retrieve(session_id)
            if s.payment_status == "paid" or s.status == "complete":
                await mark_paid(session_id, s.payment_intent)
                record = await db.payment_transactions.find_one({"session_id": session_id})
        except stripe.error.StripeError:
            pass
    return {"session_id": record["session_id"], "status": record["status"],
            "payment_status": record["payment_status"]}


@api.post("/stripe/webhook")
async def stripe_webhook(request: Request):
    payload = await request.body()
    try:
        event = stripe.Webhook.construct_event(payload, request.headers.get("stripe-signature", ""),
                                               STRIPE_WEBHOOK_SECRET)
    except (stripe.error.SignatureVerificationError, ValueError):
        raise HTTPException(400, "Invalid signature")
    obj, t = event["data"]["object"], event["type"]
    if t in ("checkout.session.completed", "checkout.session.async_payment_succeeded"):
        if obj.get("payment_status") == "paid":
            await mark_paid(obj["id"], obj.get("payment_intent"))
    elif t in ("checkout.session.expired", "checkout.session.async_payment_failed"):
        st = "expired" if t.endswith("expired") else "failed"
        await db.payment_transactions.update_one({"session_id": obj["id"]},
                                                 {"$set": {"status": st, "payment_status": st, "updated_at": now()}})
    return {"status": "ok"}


def check_admin(passcode: Optional[str]):
    if passcode != ADMIN_PASSCODE:
        raise HTTPException(401, "Invalid passcode")


@api.get("/admin/data")
async def admin_data(x_admin_passcode: Optional[str] = Header(None)):
    check_admin(x_admin_passcode)
    customs = await db.custom_requests.find().sort("created_at", -1).to_list(500)
    contacts = await db.contact_messages.find().sort("created_at", -1).to_list(500)
    orders = await db.payment_transactions.find({"payment_status": "paid"}).sort("created_at", -1).to_list(500)
    return {
        "custom_requests": [CustomRequest.from_mongo(d).model_dump() for d in customs],
        "contacts": [ContactMessage.from_mongo(d).model_dump() for d in contacts],
        "orders": [Transaction.from_mongo(d).model_dump() for d in orders],
    }


@api.patch("/admin/products/{slug}")
async def admin_set_sold(slug: str, body: SoldIn, x_admin_passcode: Optional[str] = Header(None)):
    check_admin(x_admin_passcode)
    res = await db.products.update_one({"slug": slug}, {"$set": {"sold": body.sold}})
    if not res.matched_count:
        raise HTTPException(404, "Hat not found")
    return {"ok": True}


app.include_router(api)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origin_regex=".*",
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
