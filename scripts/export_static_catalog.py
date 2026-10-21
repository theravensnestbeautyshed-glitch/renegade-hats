"""Export the hat catalogue (DB + stored photos) into the frontend as static files.

Run from /app:  python3 scripts/export_static_catalog.py
Writes frontend/src/data/catalog.json and frontend/public/img/hats/*.
"""
import json
import os
import sys
from pathlib import Path

import requests

ROOT = Path(__file__).resolve().parents[1]
API = sys.argv[1] if len(sys.argv) > 1 else os.environ["EXPORT_API_URL"]
IMG_DIR = ROOT / "frontend/public/img/hats"
OUT = ROOT / "frontend/src/data/catalog.json"


def localise(url):
    if not url.startswith("/api/files/"):
        return url
    name = url.rsplit("/", 1)[-1]
    dest = IMG_DIR / name
    if not dest.exists():
        r = requests.get(f"{API}{url}", timeout=60)
        r.raise_for_status()
        dest.write_bytes(r.content)
    return f"/img/hats/{name}"


def main():
    IMG_DIR.mkdir(parents=True, exist_ok=True)
    hats = requests.get(f"{API}/api/products", timeout=60).json()
    for h in hats:
        h["images"] = [localise(u) for u in h.get("images", [])]
    OUT.write_text(json.dumps(hats, indent=2, ensure_ascii=False) + "\n")
    print(f"exported {len(hats)} hats, {sum(len(h['images']) for h in hats)} images")


if __name__ == "__main__":
    main()
