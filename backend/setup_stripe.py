import os
from pathlib import Path
import stripe
from dotenv import load_dotenv
from catalog import HATS
from stripe_catalog import sync_hat

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


for h in HATS:
    sync_hat(h["slug"], h["name"], h["price"], h["images"][0])
    print("ok", h["slug"])

try:
    ensure_tax_settings()
except stripe.error.StripeError as e:
    print("tax settings:", e.user_message)
