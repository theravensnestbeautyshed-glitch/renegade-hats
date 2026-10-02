import os
import requests

STORAGE_BASE = (os.environ.get("INTEGRATION_PROXY_URL") or "").strip() or "https://integrations.emergentagent.com"
STORAGE_URL = STORAGE_BASE.rstrip("/") + "/objstore/api/v1/storage"
APP_NAME = "renegade-hats"
_storage_key = None


def init_storage(force=False):
    global _storage_key
    if _storage_key and not force:
        return _storage_key
    resp = requests.post(f"{STORAGE_URL}/init", json={"emergent_key": os.environ["EMERGENT_LLM_KEY"]}, timeout=30)
    resp.raise_for_status()
    _storage_key = resp.json()["storage_key"]
    return _storage_key


def _request(method, path, headers=None, **kw):
    def go():
        return requests.request(method, f"{STORAGE_URL}/objects/{path}", headers={"X-Storage-Key": init_storage(), **(headers or {})}, **kw)
    resp = go()
    if resp.status_code == 404 and method == "PUT":
        init_storage(force=True)
        resp = go()
    resp.raise_for_status()
    return resp


def put_object(path, data, content_type):
    return _request("PUT", path, data=data, headers={"Content-Type": content_type}, timeout=120).json()


def get_object(path):
    resp = _request("GET", path, timeout=60)
    return resp.content, resp.headers.get("Content-Type", "application/octet-stream")
