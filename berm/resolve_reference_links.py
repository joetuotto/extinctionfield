"""Resolve missing link sources for the site's reference registries.

Two registries carry the site's scientific citations:

  website/public/data/references_full.json   (the reference database page)
  website/lib/legacyEvidence.json            (the legacy evidence table)

Both are hand-maintained, and entries are routinely added without a DOI.  This
script looks each unlinked entry up in Crossref and PubMed and fills in the
identifier when — and only when — the match is unambiguous.

Matching is deliberately strict: a candidate is accepted on a near-exact
normalized title, corroborated by first-author surname and publication year.
Anything below threshold is left empty and reported.  A wrong link is worse
than no link, so the script never guesses.

Usage:
    python3 berm/resolve_reference_links.py            # resolve + report only
    python3 berm/resolve_reference_links.py --apply    # write the registries
"""

from __future__ import annotations

import argparse
import json
import re
import ssl
import sys
import time
import urllib.parse
import urllib.request
from concurrent.futures import ThreadPoolExecutor
from difflib import SequenceMatcher
from pathlib import Path

import certifi

ROOT = Path(__file__).resolve().parents[1]
REFERENCES = ROOT / "website" / "public" / "data" / "references_full.json"
LEGACY = ROOT / "website" / "lib" / "legacyEvidence.json"
CACHE = ROOT / "berm" / "data" / "evidence" / "reference_link_cache.json"

UA = "BERM-reference-linker/1.0"
SSL_CTX = ssl.create_default_context(cafile=certifi.where())

# A candidate must clear these to be written into a registry.
STRICT_TITLE = 0.95      # near-exact title, year must agree
CORROBORATED_TITLE = 0.90  # slightly looser, but needs an author-surname hit


# ── text helpers ───────────────────────────────────────────────────

def norm(s: str) -> str:
    s = (s or "").lower()
    for a, b in (("ä", "a"), ("ö", "o"), ("ü", "u"), ("å", "a"), ("é", "e"), ("í", "i"), ("š", "s")):
        s = s.replace(a, b)
    return re.sub(r"\s+", " ", re.sub(r"[^a-z0-9]+", " ", s)).strip()


def similarity(a: str, b: str) -> float:
    return SequenceMatcher(None, norm(a), norm(b)).ratio()


def first_surname(authors: str) -> str:
    a = re.split(r"\s+(?:et al|ym)\b", (authors or "").strip())[0]
    a = re.split(r"[,&;]", a)[0].strip()
    parts = a.split()
    if not parts:
        return ""
    head = parts[0]
    return norm(head if len(head) > 2 and not head.endswith(".") else parts[-1])


# ── http ───────────────────────────────────────────────────────────

def fetch(url: str, tries: int = 4) -> dict | None:
    for attempt in range(tries):
        try:
            req = urllib.request.Request(url, headers={"User-Agent": UA})
            with urllib.request.urlopen(req, timeout=30, context=SSL_CTX) as fh:
                return json.loads(fh.read().decode("utf-8", "replace"))
        except Exception:
            if attempt == tries - 1:
                return None
            time.sleep(2.0 * (attempt + 1))
    return None


def crossref(title: str, authors: str) -> dict | None:
    if len(norm(title)) < 12:
        return None
    surname = first_surname(authors)
    query = f"{title} {surname}".strip()
    url = (
        "https://api.crossref.org/works?rows=5"
        "&select=DOI,title,author,issued,container-title,type"
        "&query.bibliographic=" + urllib.parse.quote(query)
    )
    data = fetch(url)
    if not data:
        return None
    best = None
    for item in data.get("message", {}).get("items", []):
        cand_title = (item.get("title") or [""])[0]
        score = similarity(title, cand_title)
        try:
            year = item["issued"]["date-parts"][0][0]
        except Exception:
            year = None
        families = " ".join(norm(a.get("family", "")) for a in (item.get("author") or []))
        if best is None or score > best["score"]:
            best = {
                "score": score,
                "doi": (item.get("DOI") or "").lower(),
                "title": cand_title,
                "year": year,
                "author_match": bool(surname) and surname in families,
                "journal": (item.get("container-title") or [""])[0],
                "kind": item.get("type"),
            }
    return best


def pubmed(title: str) -> dict | None:
    if len(norm(title)) < 12:
        return None
    search = fetch(
        "https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi"
        "?db=pubmed&retmode=json&retmax=5&term=" + urllib.parse.quote(f'"{title}"[Title]')
    )
    ids = (search or {}).get("esearchresult", {}).get("idlist") or []
    if not ids:
        return None
    summary = fetch(
        "https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esummary.fcgi"
        "?db=pubmed&retmode=json&id=" + ",".join(ids[:5])
    )
    if not summary:
        return None
    result = summary.get("result", {})
    best = None
    for pmid in ids[:5]:
        item = result.get(pmid)
        if not item:
            continue
        score = similarity(title, item.get("title", ""))
        doi = next(
            (a.get("value", "") for a in item.get("articleids", []) if a.get("idtype") == "doi"),
            "",
        )
        match = re.search(r"\b(1[89]\d\d|20\d\d)\b", item.get("pubdate", ""))
        if best is None or score > best["score"]:
            best = {
                "score": score,
                "doi": doi.lower(),
                "pmid": pmid,
                "title": item.get("title", ""),
                "year": int(match.group(1)) if match else None,
                "journal": item.get("fulljournalname", ""),
                "author_match": False,
            }
    return best


def ncbi_ids(identifiers: list[str], idtype: str) -> dict[str, dict]:
    """Authoritative PMC/PubMed id -> DOI conversion."""
    if not identifiers:
        return {}
    url = (
        "https://pmc.ncbi.nlm.nih.gov/tools/idconv/api/v1/articles/"
        f"?tool=berm-reference-linker&format=json&idtype={idtype}&ids="
        + urllib.parse.quote(",".join(identifiers))
    )
    data = fetch(url) or {}
    out: dict[str, dict] = {}
    for record in data.get("records", []):
        for key in ("requested-id", "pmcid", "pmid"):
            if record.get(key):
                out[str(record[key])] = record
    return out


# ── acceptance ─────────────────────────────────────────────────────

def accepted(year: int | None, candidate: dict | None) -> bool:
    if not candidate or not candidate.get("doi"):
        return False
    score = candidate["score"]
    cand_year = candidate.get("year") or 0
    year_ok = not year or not cand_year or abs(int(year) - int(cand_year)) <= 1
    if score >= STRICT_TITLE and year_ok:
        return True
    return score >= CORROBORATED_TITLE and year_ok and bool(candidate.get("author_match"))


def resolve(title: str, authors: str, year: int | None) -> dict:
    candidate = crossref(title, authors)
    source = "crossref"
    if not accepted(year, candidate):
        alt = pubmed(title)
        if accepted(year, alt):
            candidate, source = alt, "pubmed"
        elif alt and (not candidate or alt["score"] > candidate["score"]):
            candidate, source = alt, "pubmed"
    return {
        "candidate": candidate,
        "source": source if candidate else None,
        "accepted": accepted(year, candidate),
    }


# ── registry-specific extraction ───────────────────────────────────

def needs_link(ref: dict) -> bool:
    doi = (ref.get("doi") or "").strip()
    if doi.startswith("10.") or doi.startswith("http"):
        return False
    return not (ref.get("url") or "").strip()


def parse_legacy_citation(citation: str) -> tuple[str, str]:
    """'Pall ML (2013). Title. Journal' -> (authors, title)."""
    match = re.match(r"^(.*?)\(\d{4}[a-z]?\)\.\s*(.*)$", citation)
    if not match:
        return "", citation
    authors = match.group(1).strip(" .,")
    title = re.split(r"\.\s+(?=[A-Z0-9])", match.group(2))[0]
    return authors, title.strip(" .")


def explicit_identifier(text: str) -> str:
    match = re.search(r"\bPMC(\d{6,9})\b", text)
    if match:
        return "PMC" + match.group(1)
    match = re.search(r"\bPubMed\s+(\d{7,9})\b", text, re.I)
    if match:
        return match.group(1)
    return ""


# ── main ───────────────────────────────────────────────────────────

def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--apply", action="store_true", help="write resolved links into the registries")
    parser.add_argument("--workers", type=int, default=3)
    parser.add_argument("--refresh", action="store_true",
                        help="ignore the cache and re-resolve every entry")
    args = parser.parse_args()

    data = json.loads(REFERENCES.read_text())
    references = data["references"]
    legacy = json.loads(LEGACY.read_text())

    # 1. Authoritative pass: PMC / PubMed identifiers already recorded.
    pmc_ids, pmid_ids = set(), set()
    for ref in references:
        doi = (ref.get("doi") or "").strip()
        if re.fullmatch(r"PMC\d+", doi, re.I):
            pmc_ids.add(doi.upper())
        elif re.fullmatch(r"\d{7,9}", doi):
            pmid_ids.add(doi)
        if ref.get("pmid") and not doi.startswith("10."):
            pmid_ids.add(str(ref["pmid"]))
    for record in legacy:
        ident = explicit_identifier(record.get("citation", ""))
        if ident.startswith("PMC"):
            pmc_ids.add(ident)
        elif ident:
            pmid_ids.add(ident)

    print(f"authoritative id lookups: {len(pmc_ids)} PMC, {len(pmid_ids)} PubMed", flush=True)
    id_map = ncbi_ids(sorted(pmc_ids), "pmcid") | ncbi_ids(sorted(pmid_ids), "pmid")

    # 2. Bibliographic pass for everything still unlinked.
    ref_targets = [r for r in references if needs_link(r)]
    legacy_targets = [r for r in legacy if not (r.get("url") or "").strip()]
    print(f"bibliographic lookups: {len(ref_targets)} references, {len(legacy_targets)} legacy records", flush=True)

    def work_reference(ref: dict) -> dict:
        out = {"registry": "references", "id": ref["id"], "title": ref.get("title", ""),
               "year": ref.get("year"), "authors": ref.get("authors", "")}
        out.update(resolve(ref.get("title", ""), ref.get("authors", ""), ref.get("year")))
        return out

    def work_legacy(record: dict) -> dict:
        authors, title = parse_legacy_citation(record.get("citation", ""))
        out = {"registry": "legacy", "id": record["id"], "title": title, "year": record.get("year"),
               "authors": authors, "explicit_id": explicit_identifier(record.get("citation", ""))}
        out.update(resolve(title, authors, record.get("year")))
        return out

    cached: dict[tuple[str, str], dict] = {}
    if CACHE.exists() and not args.refresh:
        for entry in json.loads(CACHE.read_text()).get("results", []):
            # a null candidate means the lookup failed, not that nothing matched
            if entry.get("candidate"):
                cached[(entry["registry"], entry["id"])] = entry
        print(f"reusing {len(cached)} cached lookups", flush=True)

    def cached_or(registry: str, worker):
        def run(item: dict) -> dict:
            hit = cached.get((registry, item["id"]))
            return hit if hit else worker(item)
        return run

    with ThreadPoolExecutor(max_workers=args.workers) as pool:
        results = list(pool.map(cached_or("references", work_reference), ref_targets)) + list(
            pool.map(cached_or("legacy", work_legacy), legacy_targets))

    CACHE.parent.mkdir(parents=True, exist_ok=True)
    CACHE.write_text(json.dumps({"id_map": id_map, "results": results}, indent=1, ensure_ascii=False))

    ok = sum(1 for r in results if r["accepted"])
    print(f"accepted: {ok}/{len(results)}   cache -> {CACHE.relative_to(ROOT)}", flush=True)

    if not args.apply:
        print("(dry run — pass --apply to write the registries)")
        return 0

    by_id = {r["id"]: r for r in results}
    filled_refs = 0
    for ref in references:
        doi = (ref.get("doi") or "").strip()
        record = id_map.get(doi.upper()) or id_map.get(doi) or id_map.get(str(ref.get("pmid") or ""))
        if record and record.get("doi") and not doi.startswith("10."):
            ref["doi"] = record["doi"].lower()
            if record.get("pmid"):
                ref["pmid"] = str(record["pmid"])
            filled_refs += 1
            continue
        result = by_id.get(ref["id"])
        if result and result["registry"] == "references" and result["accepted"]:
            ref["doi"] = result["candidate"]["doi"]
            if result["candidate"].get("pmid"):
                ref["pmid"] = str(result["candidate"]["pmid"])
            filled_refs += 1

    filled_legacy = 0
    for record in legacy:
        if (record.get("url") or "").strip():
            continue
        ident = explicit_identifier(record.get("citation", ""))
        entry = id_map.get(ident.upper()) or id_map.get(ident)
        if entry and entry.get("doi"):
            record["url"] = f"https://doi.org/{entry['doi'].lower()}"
            filled_legacy += 1
            continue
        result = by_id.get(record["id"])
        if result and result["registry"] == "legacy" and result["accepted"]:
            record["url"] = f"https://doi.org/{result['candidate']['doi']}"
            filled_legacy += 1
        elif ident.startswith("PMC"):
            record["url"] = f"https://pmc.ncbi.nlm.nih.gov/articles/{ident}/"
            filled_legacy += 1
        elif ident:
            record["url"] = f"https://pubmed.ncbi.nlm.nih.gov/{ident}/"
            filled_legacy += 1

    REFERENCES.write_text(json.dumps(data, indent=2, ensure_ascii=False) + "\n")
    LEGACY.write_text(json.dumps(legacy, indent=2, ensure_ascii=False) + "\n")
    print(f"written: {filled_refs} references, {filled_legacy} legacy records", flush=True)
    return 0


if __name__ == "__main__":
    sys.exit(main())
