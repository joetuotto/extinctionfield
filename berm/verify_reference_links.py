"""Check that every source link the site emits actually resolves.

Covers all three link surfaces:
  website/public/data/references_full.json   (reference database)
  website/lib/legacyEvidence.json            (legacy evidence table)
  website/lib/citationLinks.ts               (inline citations)

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
LEGACY = ROOT / "website" / "lib" / "legacyEvidence.json"
CITATION_LINKS = ROOT / "website" / "lib" / "citationLinks.ts"

SSL_CTX = ssl.create_default_context(cafile=certifi.where())
UA = "Mozilla/5.0 (compatible; BERM-link-check/1.0)"


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
    url = (entry.get("url") or "").strip()
    if url:
        return url
    doi = (entry.get("doi") or "").strip()
    if doi.startswith("10."):
        return f"https://doi.org/{doi}"
    if doi.startswith("http"):
        return doi
    if re.fullmatch(r"PMC\d+", doi, re.I):
        return f"https://pmc.ncbi.nlm.nih.gov/articles/{doi.upper()}/"
    pmid = str(entry.get("pmid") or "").strip() or (doi if re.fullmatch(r"\d{7,9}", doi) else "")
    return f"https://pubmed.ncbi.nlm.nih.gov/{pmid}/" if pmid else None


def collect() -> dict[str, list[str]]:
    """url -> the registry entries that point at it."""
    owners: dict[str, list[str]] = {}

    def add(url: str | None, owner: str) -> None:
        if url:
            owners.setdefault(url, []).append(owner)

    for entry in json.loads(REFERENCES.read_text())["references"]:
        add(reference_url(entry), f"references:{entry['id']}")
    for entry in json.loads(LEGACY.read_text()):
        add((entry.get("url") or "").strip() or None, f"legacy:{entry['id']}")
    if CITATION_LINKS.exists():
        for key, url in re.findall(r'^\s*"([^"]+)":\s*"([^"]+)",\s*$', CITATION_LINKS.read_text(), re.M):
            add(url, f"citation:{key}")
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
