"""Admin hat editor backend tests (upload, CRUD, checkout w/ updated price, persistence)."""
import io
import os
import pytest
import requests

BASE_URL = os.environ["REACT_APP_BACKEND_URL"].rstrip("/")
API = f"{BASE_URL}/api"
PASS = "renegade2026"
H = {"X-Admin-Passcode": PASS}


@pytest.fixture(scope="module")
def s():
    return requests.Session()


# tiny valid 1x1 PNG
PNG_BYTES = (
    b"\x89PNG\r\n\x1a\n\x00\x00\x00\rIHDR\x00\x00\x00\x01\x00\x00\x00\x01"
    b"\x08\x02\x00\x00\x00\x90wS\xde\x00\x00\x00\x0cIDATx\x9cc\xf8\xcf"
    b"\xc0\x00\x00\x00\x03\x00\x01\x5a\xf6\x1d\x4d\x00\x00\x00\x00IEND\xaeB`\x82"
)


# --- Upload ---
def test_upload_requires_passcode(s):
    r = s.post(f"{API}/admin/upload", files={"file": ("a.png", PNG_BYTES, "image/png")}, timeout=30)
    assert r.status_code == 401


def test_upload_rejects_bad_type(s):
    r = s.post(f"{API}/admin/upload", files={"file": ("a.txt", b"hi", "text/plain")}, headers=H, timeout=30)
    assert r.status_code == 400


def test_upload_png_and_serve(s):
    r = s.post(f"{API}/admin/upload", files={"file": ("a.png", PNG_BYTES, "image/png")}, headers=H, timeout=60)
    assert r.status_code == 200, r.text
    url = r.json()["url"]
    assert url.startswith("/api/files/")
    # public GET
    r2 = s.get(f"{BASE_URL}{url}", timeout=60)
    assert r2.status_code == 200
    assert r2.headers.get("content-type", "").startswith("image/png")
    assert r2.content == PNG_BYTES


@pytest.fixture(scope="module")
def uploaded_url(s):
    r = s.post(f"{API}/admin/upload", files={"file": ("b.png", PNG_BYTES, "image/png")}, headers=H, timeout=60)
    assert r.status_code == 200
    return r.json()["url"]


# --- Product CRUD ---
def test_create_requires_passcode(s, uploaded_url):
    r = s.post(f"{API}/admin/products", json={
        "name": "TEST No Auth", "price": 100, "description": "d", "images": [uploaded_url],
    }, timeout=30)
    assert r.status_code == 401


def test_create_validation(s, uploaded_url):
    # missing images
    r = s.post(f"{API}/admin/products", json={"name": "TEST X", "price": 10, "description": "d", "images": []}, headers=H, timeout=30)
    assert r.status_code == 422
    # price 0
    r = s.post(f"{API}/admin/products", json={"name": "TEST X", "price": 0, "description": "d", "images": [uploaded_url]}, headers=H, timeout=30)
    assert r.status_code == 422
    # empty name
    r = s.post(f"{API}/admin/products", json={"name": "", "price": 10, "description": "d", "images": [uploaded_url]}, headers=H, timeout=30)
    assert r.status_code == 422


_created = []


def test_create_and_appears_in_lists(s, uploaded_url):
    payload = {
        "name": "TEST Hat Alpha",
        "price": 123.45,
        "description": "A test hat",
        "story": "A test story",
        "details": ["detail one", "detail two"],
        "images": [uploaded_url],
        "size": "M", "material": "wool", "colour": "black", "hatband": "rope",
    }
    r = s.post(f"{API}/admin/products", json=payload, headers=H, timeout=60)
    assert r.status_code == 200, r.text
    data = r.json()
    assert data["slug"] == "test-hat-alpha"
    assert data["price"] == 123.45
    assert "_id" not in data
    _created.append(data["slug"])

    # unique slug suffix
    r2 = s.post(f"{API}/admin/products", json=payload, headers=H, timeout=60)
    assert r2.status_code == 200
    assert r2.json()["slug"] == "test-hat-alpha-2"
    _created.append(r2.json()["slug"])

    # appears in list and detail
    lst = s.get(f"{API}/products", timeout=30).json()
    slugs = [p["slug"] for p in lst]
    assert "test-hat-alpha" in slugs and "test-hat-alpha-2" in slugs
    det = s.get(f"{API}/products/test-hat-alpha", timeout=30).json()
    assert det["name"] == "TEST Hat Alpha"
    assert det["details"] == ["detail one", "detail two"]


def test_update_price_and_fields(s, uploaded_url):
    body = {
        "name": "TEST Hat Alpha",
        "price": 199.00,
        "description": "updated desc",
        "story": "updated story",
        "details": ["x"],
        "images": [uploaded_url],
    }
    r = s.put(f"{API}/admin/products/test-hat-alpha", json=body, headers=H, timeout=60)
    assert r.status_code == 200, r.text
    assert r.json()["price"] == 199.0
    assert r.json()["story"] == "updated story"
    det = s.get(f"{API}/products/test-hat-alpha", timeout=30).json()
    assert det["price"] == 199.0


def test_update_requires_passcode(s, uploaded_url):
    r = s.put(f"{API}/admin/products/test-hat-alpha", json={
        "name": "x", "price": 1, "description": "d", "images": [uploaded_url],
    }, timeout=30)
    assert r.status_code == 401


def test_checkout_uses_updated_price(s):
    r = s.post(f"{API}/payments/checkout", json={
        "slugs": ["test-hat-alpha"], "origin_url": BASE_URL,
    }, timeout=60)
    assert r.status_code == 200, r.text
    sid = r.json()["session_id"]
    try:
        import stripe as _s
        _s.api_key = os.environ.get("STRIPE_SECRET_KEY") or os.environ.get("STRIPE_API_KEY")
        if _s.api_key:
            sess = _s.checkout.Session.retrieve(sid)
            # amount_total in cents, 199.00 CAD = 19900
            assert sess.amount_total == 19900, f"amount_total={sess.amount_total}"
            assert sess.currency.lower() == "cad"
    finally:
        s.post(f"{API}/payments/release/{sid}", timeout=30)


def test_delete_requires_passcode(s):
    r = s.delete(f"{API}/admin/products/test-hat-alpha", timeout=30)
    assert r.status_code == 401


def test_delete_and_cleanup(s):
    # Delete every TEST hat we created
    for slug in list(_created):
        r = s.delete(f"{API}/admin/products/{slug}", headers=H, timeout=60)
        assert r.status_code == 200
        g = s.get(f"{API}/products/{slug}", timeout=30)
        assert g.status_code == 404


def test_delete_unknown_404(s):
    r = s.delete(f"{API}/admin/products/no-such-slug", headers=H, timeout=30)
    assert r.status_code == 404


# --- Seed persistence: originals untouched ---
EXPECTED_ORIG = {
    "the-renegade": 249.0,
    "midnight-renegade": 249.0,
    "renegade-red": 275.0,
    "the-outlaw": 275.0,
    "the-wanderer": 295.0,
    "the-shaman": 325.0,
}


def test_originals_still_present(s):
    lst = s.get(f"{API}/products", timeout=30).json()
    prices = {p["slug"]: p["price"] for p in lst}
    sold = {p["slug"]: p["sold"] for p in lst}
    for slug, price in EXPECTED_ORIG.items():
        assert slug in prices
        assert prices[slug] == price, f"{slug}: {prices[slug]} != {price}"
        assert sold[slug] is False, f"{slug} sold flag not reset"
