"""Check that every canonical source link the site emits actually resolves.

The canonical reference database is the website's only source-link surface:
  website/public/data/references_full.json

Canonical reference records in registered, pending, missing or other
non-emittable link states are deliberately excluded. Only strict metadata
matches and curated official URLs reach the ``verified`` state.

A DOI is checked against doi.org, which answers 302 for a registered DOI and
404 for one that does not exist — so a wrong-but-plausible DOI is caught here
rather than by a reader clicking it.

Usage:
    python3 berm/verify_reference_links.py [--limit N]
"""

from __future__ import annotations

import argparse
import json
import re
import ssl
import sys
import urllib.error
import urllib.request
from concurrent.futures import ThreadPoolExecutor
from pathlib import Path

import certifi

ROOT = Path(__file__).resolve().parents[1]
REFERENCES = ROOT / "website" / "public" / "data" / "references_full.json"

SSL_CTX = ssl.create_default_context(cafile=certifi.where())
UA = "Mozilla/5.0 (compatible; BERM-link-check/1.0)"
EMITTABLE_LINK_STATUSES = {"verified"}


class NoRedirect(urllib.request.HTTPRedirectHandler):
    def redirect_request(self, req, fp, code, msg, headers, newurl):
        return None


OPENER = urllib.request.build_opener(NoRedirect, urllib.request.HTTPSHandler(context=SSL_CTX))


def check(url: str) -> tuple[str, int | str]:
    for method in ("HEAD", "GET"):
        try:
            req = urllib.request.Request(url, method=method, headers={"User-Agent": UA})
            with OPENER.open(req, timeout=30) as res:
                return url, res.status
        except urllib.error.HTTPError as exc:
            if exc.code in (301, 302, 303, 307, 308):
                return url, exc.code
            if exc.code in (403, 405) and method == "HEAD":
                continue  # some hosts refuse HEAD; retry as GET
            return url, exc.code
        except Exception as exc:  # noqa: BLE001 - network conditions vary
            if method == "GET":
                return url, type(exc).__name__
    return url, "unreachable"


def reference_url(entry: dict) -> str | None:
    status = str(entry.get("link_status") or "").strip().lower()
    if status not in EMITTABLE_LINK_STATUSES:
        return None

    # Keep this order aligned with the website resolver: canonical DOI first,
    # then open PubMed Central, PubMed, and finally an official source URL.
    doi = (entry.get("doi") or "").strip()
    if doi.startswith("10."):
        return f"https://doi.org/{doi}"
    if doi.startswith("http"):
        return doi

    pmcid = str(entry.get("pmcid") or "").strip() or (
        doi if re.fullmatch(r"PMC\d+", doi, re.I) else ""
    )
    if re.fullmatch(r"PMC\d+", pmcid, re.I):
        return f"https://pmc.ncbi.nlm.nih.gov/articles/{pmcid.upper()}/"

    pmid = str(entry.get("pmid") or "").strip() or (doi if re.fullmatch(r"\d{7,9}", doi) else "")
    if re.fullmatch(r"\d{7,9}", pmid):
        return f"https://pubmed.ncbi.nlm.nih.gov/{pmid}/"

    url = (entry.get("url") or "").strip()
    return url or None


def collect() -> dict[str, list[str]]:
    """url -> the registry entries that point at it."""
    owners: dict[str, list[str]] = {}

    def add(url: str | None, owner: str) -> None:
        if url:
            owners.setdefault(url, []).append(owner)

    for entry in json.loads(REFERENCES.read_text())["references"]:
        add(reference_url(entry), f"references:{entry['id']}")
    return owners


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--limit", type=int, default=0, help="check only the first N distinct urls")
    parser.add_argument("--workers", type=int, default=8)
    args = parser.parse_args()

    owners = collect()
    urls = sorted(owners)
    if args.limit:
        urls = urls[: args.limit]
    print(f"checking {len(urls)} distinct source links", flush=True)

    with ThreadPoolExecutor(max_workers=args.workers) as pool:
        results = list(pool.map(check, urls))

    def ok(url: str, status: int | str) -> bool:
        if isinstance(status, int) and status < 400:
            return True
        # PubMed refuses automated requests with 403; the record itself is fine
        return status == 403 and "pubmed.ncbi.nlm.nih.gov" in url

    broken = [(u, s) for u, s in results if not ok(u, s)]
    print(f"resolved: {len(results) - len(broken)}/{len(results)}")
    if broken:
        print("\nunresolved links:")
        for url, status in broken:
            print(f"  [{status}] {url}")
            for owner in owners[url][:3]:
                print(f"        {owner}")
    return 1 if broken else 0


if __name__ == "__main__":
    sys.exit(main())
