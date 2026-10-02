import stripe


def _find_product(slug):
    for p in stripe.Product.list(active=True).auto_paging_iter():
        if p.to_dict().get("metadata", {}).get("emergent_product_id") == slug:
            return p
    return None


def sync_hat(slug, name, price, image=None):
    """Ensure a Stripe product and CAD price (lookup key hat_<slug>) exist and match."""
    img = [image] if image and image.startswith("http") else []
    product = _find_product(slug)
    if product:
        stripe.Product.modify(product.id, name=name, **({"images": img} if img else {}))
    else:
        product = stripe.Product.create(name=name, tax_code="txcd_99999999", images=img,
                                        metadata={"managed_by": "emergent", "emergent_product_id": slug})
    lk, amount = f"hat_{slug}", int(round(price * 100))
    existing = stripe.Price.list(lookup_keys=[lk], active=True, limit=1).data
    if existing and existing[0].unit_amount == amount and existing[0].currency == "cad":
        return
    stripe.Price.create(product=product.id, unit_amount=amount, currency="cad", lookup_key=lk, transfer_lookup_key=True)
    if existing:
        stripe.Price.modify(existing[0].id, active=False)


def archive_hat(slug):
    product = _find_product(slug)
    if product:
        for pr in stripe.Price.list(product=product.id, active=True).auto_paging_iter():
            stripe.Price.modify(pr.id, active=False)
        stripe.Product.modify(product.id, active=False)
