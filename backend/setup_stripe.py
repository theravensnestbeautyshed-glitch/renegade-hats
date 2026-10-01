import os
from pathlib import Path
import stripe
from dotenv import load_dotenv
from catalog import HATS

load_dotenv(Path(__file__).parent / ".env")
stripe.api_key = os.environ["STRIPE_SECRET_KEY"]


def ensure_tax_settings():
    s = stripe.tax.Settings.retrieve()
    if s.head_office and getattr(s.head_office, "address", None):
        return
    stripe.tax.Settings.modify(
        head_office={"address": {"country": "CA", "line1": "4500 Marine Ave", "city": "Powell River",
                                 "state": "BC", "postal_code": "V8A 2K5"}},
        defaults={"tax_behavior": "exclusive"},
    )


def get_or_create_product(h):
    for p in stripe.Product.list(active=True).auto_paging_iter():
        if p.to_dict().get("metadata", {}).get("emergent_product_id") == h["slug"]:
            return p
    return stripe.Product.create(name=h["name"], tax_code="txcd_99999999", images=h["images"][:1],
                                 metadata={"managed_by": "emergent", "emergent_product_id": h["slug"]})


for h in HATS:
    product = get_or_create_product(h)
    lk, amount = f"hat_{h['slug']}", int(h["price"] * 100)
    existing = stripe.Price.list(lookup_keys=[lk], active=True, limit=1).data
    if existing and (existing[0].unit_amount != amount or existing[0].currency != "cad"):
        stripe.Price.modify(existing[0].id, active=False)
        existing = []
    if not existing:
        stripe.Price.create(product=product.id, unit_amount=amount, currency="cad",
                            lookup_key=lk, transfer_lookup_key=True)
    print("ok", lk)

try:
    ensure_tax_settings()
except stripe.error.StripeError as e:
    print("tax settings:", e.user_message)
