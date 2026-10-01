"""Backend tests for RENÉGADE HATS."""
import os
import pytest
import requests

BASE_URL = os.environ.get("REACT_APP_BACKEND_URL", "https://renegade-state.preview.emergentagent.com").rstrip("/")
API = f"{BASE_URL}/api"
ADMIN_PASSCODE = "renegade2026"

EXPECTED = {
    "the-renegade": 249.0,
    "midnight-renegade": 249.0,
    "renegade-red": 275.0,
    "the-outlaw": 275.0,
    "the-wanderer": 295.0,
    "the-shaman": 325.0,
}


@pytest.fixture(scope="module")
def s():
    return requests.Session()


# --- Products ---
def test_list_products(s):
    r = s.get(f"{API}/products", timeout=30)
    assert r.status_code == 200
    data = r.json()
    slugs = {p["slug"]: p["price"] for p in data}
    assert len(data) == 6, f"Expected 6 hats, got {len(data)}: {list(slugs)}"
    for slug, price in EXPECTED.items():
        assert slug in slugs, f"Missing {slug}"
        assert slugs[slug] == price, f"Price mismatch {slug}: {slugs[slug]} vs {price}"
    for p in data:
        assert p["currency"] == "CAD"
        assert "_id" not in p
        assert len(p["images"]) >= 1


def test_get_product_valid(s):
    r = s.get(f"{API}/products/the-renegade", timeout=30)
    assert r.status_code == 200
    assert r.json()["name"] == "The Renegade"


def test_get_product_404(s):
    r = s.get(f"{API}/products/does-not-exist", timeout=30)
    assert r.status_code == 404


# --- Custom requests removed ---
def test_custom_requests_endpoint_removed(s):
    r = s.post(f"{API}/custom-requests", json={
        "name": "x", "email": "x@y.com", "vision": "x",
    }, timeout=30)
    assert r.status_code == 404


# --- Contact ---
def test_contact_valid(s):
    r = s.post(f"{API}/contact", json={
        "name": "TEST_Bob", "email": "test_bob@example.com", "message": "Hello there",
    }, timeout=30)
    assert r.status_code == 200
    assert r.json()["ok"] is True


def test_contact_invalid(s):
    r = s.post(f"{API}/contact", json={"name": "", "email": "bad", "message": ""}, timeout=30)
    assert r.status_code == 422


# --- Newsletter ---
def test_newsletter_valid(s):
    r = s.post(f"{API}/newsletter", json={"email": "test_newsletter@example.com"}, timeout=30)
    assert r.status_code == 200
    assert r.json()["ok"] is True


def test_newsletter_invalid_email(s):
    r = s.post(f"{API}/newsletter", json={"email": "not-an-email"}, timeout=30)
    assert r.status_code == 422


def test_newsletter_in_admin_data(s):
    r = s.get(f"{API}/admin/data", headers={"X-Admin-Passcode": ADMIN_PASSCODE}, timeout=30)
    assert r.status_code == 200
    data = r.json()
    assert "subscribers" in data
    emails = [x.get("email") for x in data["subscribers"]]
    assert "test_newsletter@example.com" in emails


# --- Payments ---
def test_checkout_creates_session(s):
    r = s.post(f"{API}/payments/checkout", json={
        "slugs": ["the-renegade"], "origin_url": BASE_URL,
    }, timeout=60)
    assert r.status_code == 200, r.text
    data = r.json()
    assert "checkout.stripe.com" in data["checkout_url"]
    assert data["session_id"].startswith("cs_")
    # status
    sid = data["session_id"]
    r2 = s.get(f"{API}/payments/status/{sid}", timeout=30)
    assert r2.status_code == 200
    assert r2.json()["payment_status"] == "pending"


def test_checkout_sold_409(s):
    # Mark sold via admin
    r = s.patch(f"{API}/admin/products/the-outlaw", json={"sold": True},
                headers={"X-Admin-Passcode": ADMIN_PASSCODE}, timeout=30)
    assert r.status_code == 200
    try:
        r2 = s.post(f"{API}/payments/checkout", json={
            "slugs": ["the-outlaw"], "origin_url": BASE_URL,
        }, timeout=30)
        assert r2.status_code == 409
    finally:
        # Reset
        s.patch(f"{API}/admin/products/the-outlaw", json={"sold": False},
                headers={"X-Admin-Passcode": ADMIN_PASSCODE}, timeout=30)


# --- Admin ---
def test_admin_no_header_401(s):
    r = s.get(f"{API}/admin/data", timeout=30)
    assert r.status_code == 401


def test_admin_wrong_passcode_401(s):
    r = s.get(f"{API}/admin/data", headers={"X-Admin-Passcode": "wrong"}, timeout=30)
    assert r.status_code == 401


def test_admin_data_ok(s):
    r = s.get(f"{API}/admin/data", headers={"X-Admin-Passcode": ADMIN_PASSCODE}, timeout=30)
    assert r.status_code == 200
    data = r.json()
    assert "contacts" in data and "orders" in data and "subscribers" in data
    assert "custom_requests" not in data
    for section in data.values():
        for item in section:
            assert "_id" not in item


def test_admin_toggle_sold_and_reset(s):
    h = {"X-Admin-Passcode": ADMIN_PASSCODE}
    r = s.patch(f"{API}/admin/products/the-shaman", json={"sold": True}, headers=h, timeout=30)
    assert r.status_code == 200
    g = s.get(f"{API}/products/the-shaman", timeout=30).json()
    assert g["sold"] is True
    # reset
    r = s.patch(f"{API}/admin/products/the-shaman", json={"sold": False}, headers=h, timeout=30)
    assert r.status_code == 200
    g = s.get(f"{API}/products/the-shaman", timeout=30).json()
    assert g["sold"] is False


def test_admin_toggle_unknown_404(s):
    r = s.patch(f"{API}/admin/products/nope", json={"sold": True},
                headers={"X-Admin-Passcode": ADMIN_PASSCODE}, timeout=30)
    assert r.status_code == 404
