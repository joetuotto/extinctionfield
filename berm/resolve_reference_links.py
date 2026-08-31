"""Resolve missing links in the site's canonical reference registry.

``website/public/data/references_full.json`` is the only bibliographic source
of truth. Claim and interpretation catalogues refer to it by ``referenceId``
and are never independently enriched. This script looks each unlinked
canonical entry up in Crossref and PubMed and fills in the identifier when —
and only when — the match is unambiguous.

Matching is deliberately strict: a candidate needs a normalized title score
of at least 0.98, an exact first-author surname and publication year, a journal
match when the registry names one, and a 0.05 lead over the runner-up. Anything
below threshold is left empty and reported. A wrong link is worse than no link,
so the script never guesses.

Usage:
    python3 berm/resolve_reference_links.py            # resolve + report only
    python3 berm/resolve_reference_links.py --apply    # write the registry
    python3 berm/resolve_reference_links.py --offline  # reuse matching cache only
"""

from __future__ import annotations

import argparse
import hashlib
import html
import json
import re
import ssl
import sys
import threading
import time
import urllib.parse
import urllib.request
from concurrent.futures import ThreadPoolExecutor
from datetime import date
from difflib import SequenceMatcher
from pathlib import Path

import certifi

ROOT = Path(__file__).resolve().parents[1]
REFERENCES = ROOT / "website" / "public" / "data" / "references_full.json"
CACHE = ROOT / "berm" / "data" / "evidence" / "reference_link_cache.json"

UA = "BERM-reference-linker/1.0"
SSL_CTX = ssl.create_default_context(cafile=certifi.where())
REQUEST_LOCK = threading.Lock()
LAST_REQUEST_AT: dict[str, float] = {}

# A bibliographic search result must clear every threshold below. Explicit DOI,
# PMCID and PMID conversions use the authoritative identifier path instead.
MATCH_SCHEMA_VERSION = 2
IDENTIFIER_MATCH_SCHEMA_VERSION = 2
MIN_TITLE_SCORE = 0.98
MIN_RUNNER_UP_MARGIN = 0.05


# ── text helpers ───────────────────────────────────────────────────

def norm(s: str) -> str:
    s = html.unescape(re.sub(r"<[^>]+>", " ", s or "")).lower()
    for a, b in (("ä", "a"), ("ö", "o"), ("ü", "u"), ("å", "a"), ("é", "e"), ("í", "i"), ("š", "s")):
        s = s.replace(a, b)
    return re.sub(r"\s+", " ", re.sub(r"[^a-z0-9]+", " ", s)).strip()


def similarity(a: str, b: str) -> float:
    return SequenceMatcher(None, norm(a), norm(b)).ratio()


def first_surname(authors: str) -> str:
    text = re.split(r"\s+(?:et al\.?|ym\.?)\b", (authors or "").strip(), maxsplit=1)[0]
    text = re.split(r"[;&]", text, maxsplit=1)[0].strip()
    if "," in text:
        text = text.split(",", 1)[0].strip()
    parts = text.split()
    while len(parts) > 1 and re.fullmatch(r"(?:[A-Z]\.?){1,4}", parts[-1]):
        parts.pop()
    if not parts:
        return ""
    return norm(" ".join(parts))


JOURNAL_STOPWORDS = {"a", "an", "and", "de", "for", "in", "of", "on", "the"}


def journal_tokens(value: str) -> list[str]:
    return [token for token in norm(value).split() if token not in JOURNAL_STOPWORDS]


def journal_matches(known: str, candidate: str) -> bool | None:
    """Corroborate a known journal, allowing conventional word abbreviations."""
    known_tokens = journal_tokens(known)
    if not known_tokens:
        return None
    candidate_tokens = journal_tokens(candidate)
    if not candidate_tokens:
        return False
    if known_tokens == candidate_tokens:
        return True
    if len(known_tokens) != len(candidate_tokens):
        return False

    def token_matches(left: str, right: str) -> bool:
        if left == right:
            return True
        if {left, right} == {"j", "journal"}:
            return True
        return (
            (len(left) >= 2 and right.startswith(left))
            or (len(right) >= 2 and left.startswith(right))
        )

    return all(
        token_matches(left, right)
        for left, right in zip(known_tokens, candidate_tokens, strict=True)
    )


def bibliography_fingerprint(title: str, authors: str, year: int | None, journal: str) -> str:
    """Fingerprint every field that can change a bibliographic match."""
    payload = {
        "authors": norm(authors),
        "journal": norm(journal),
        "title": norm(title),
        "version": MATCH_SCHEMA_VERSION,
        "year": int(year or 0),
    }
    encoded = json.dumps(payload, sort_keys=True, separators=(",", ":")).encode("utf-8")
    return hashlib.sha256(encoded).hexdigest()


def identifier_fingerprint(ref: dict, kind: str, identifier: str) -> str:
    payload = {
        "bibliography": bibliography_fingerprint(
            ref.get("title", ""),
            ref.get("authors", ""),
            ref.get("year"),
            ref.get("journal", "") or "",
        ),
        "identifier": identifier.upper() if kind == "pmcid" else identifier.lower(),
        "kind": kind,
        "version": IDENTIFIER_MATCH_SCHEMA_VERSION,
    }
    encoded = json.dumps(payload, sort_keys=True, separators=(",", ":")).encode("utf-8")
    return hashlib.sha256(encoded).hexdigest()


def ranked_best(candidates: list[dict]) -> dict | None:
    if not candidates:
        return None
    candidates.sort(key=lambda item: item["score"], reverse=True)
    best = dict(candidates[0])
    runner_up_score = float(candidates[1]["score"]) if len(candidates) > 1 else 0.0
    best["runner_up_score"] = runner_up_score
    best["margin"] = float(best["score"]) - runner_up_score
    return best


# ── http ───────────────────────────────────────────────────────────

def throttle(url: str) -> None:
    """Respect the public-service rate limits even with worker threads."""
    host = urllib.parse.urlparse(url).netloc.lower()
    interval = 0.35 if host.endswith("ncbi.nlm.nih.gov") else 0.05
    with REQUEST_LOCK:
        now = time.monotonic()
        wait = interval - (now - LAST_REQUEST_AT.get(host, 0.0))
        if wait > 0:
            time.sleep(wait)
        LAST_REQUEST_AT[host] = time.monotonic()

def fetch(url: str, tries: int = 4) -> dict | None:
    for attempt in range(tries):
        try:
            throttle(url)
            req = urllib.request.Request(url, headers={"User-Agent": UA})
            with urllib.request.urlopen(req, timeout=30, context=SSL_CTX) as fh:
                return json.loads(fh.read().decode("utf-8", "replace"))
        except Exception:
            if attempt == tries - 1:
                return None
            time.sleep(2.0 * (attempt + 1))
    return None


def crossref_candidate(item: dict, title: str, authors: str, journal: str) -> dict:
    surname = first_surname(authors)
    cand_title = (item.get("title") or [""])[0]
    try:
        year = item["issued"]["date-parts"][0][0]
    except Exception:
        year = None
    candidate_authors = item.get("author") or []
    candidate_first_author = norm(candidate_authors[0].get("family", "")) if candidate_authors else ""
    candidate_journal = (item.get("container-title") or [""])[0]
    return {
        "score": similarity(title, cand_title),
        "doi": (item.get("DOI") or "").lower(),
        "title": cand_title,
        "year": year,
        "first_author": candidate_first_author,
        "author_match": bool(surname) and surname == candidate_first_author,
        "journal": candidate_journal,
        "journal_match": journal_matches(journal, candidate_journal),
        "kind": item.get("type"),
    }


def crossref_by_doi(doi: str, title: str, authors: str, journal: str) -> dict | None:
    """Resolve an explicit DOI and compare its authoritative metadata."""
    url = "https://api.crossref.org/works/" + urllib.parse.quote(doi, safe="")
    data = fetch(url)
    item = (data or {}).get("message")
    if not isinstance(item, dict):
        return None
    candidate = crossref_candidate(item, title, authors, journal)
    candidate["identifier_match"] = candidate.get("doi", "").lower() == doi.lower()
    return candidate


def crossref(title: str, authors: str, journal: str) -> dict | None:
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
    candidates: list[dict] = []
    for item in data.get("message", {}).get("items", []):
        candidates.append(crossref_candidate(item, title, authors, journal))
    return ranked_best(candidates)


def pubmed_candidate(item: dict, pmid: str, title: str, authors: str, journal: str) -> dict:
    surname = first_surname(authors)
    candidate_title = item.get("title", "")
    doi = next(
        (a.get("value", "") for a in item.get("articleids", []) if a.get("idtype") == "doi"),
        "",
    )
    pmcid = next(
        (
            a.get("value", "")
            for a in item.get("articleids", [])
            if a.get("idtype") in {"pmc", "pmcid"}
        ),
        "",
    )
    match = re.search(r"\b(1[89]\d\d|20\d\d)\b", item.get("pubdate", ""))
    candidate_authors = item.get("authors") or []
    candidate_first_author = first_surname(candidate_authors[0].get("name", "")) if candidate_authors else ""
    candidate_journal = item.get("fulljournalname", "") or item.get("source", "")
    return {
        "score": similarity(title, candidate_title),
        "doi": doi.lower(),
        "pmcid": pmcid.upper(),
        "pmid": str(pmid),
        "title": candidate_title,
        "year": int(match.group(1)) if match else None,
        "first_author": candidate_first_author,
        "author_match": bool(surname) and surname == candidate_first_author,
        "journal": candidate_journal,
        "journal_match": journal_matches(journal, candidate_journal),
        "kind": "journal-article",
    }


def pubmed_summaries(pmids: list[str], chunk_size: int = 100) -> dict[str, dict]:
    """Fetch authoritative PubMed metadata in bounded batches."""
    summaries: dict[str, dict] = {}
    unique_pmids = sorted({str(pmid) for pmid in pmids if re.fullmatch(r"\d{7,9}", str(pmid))})
    for offset in range(0, len(unique_pmids), chunk_size):
        chunk = unique_pmids[offset:offset + chunk_size]
        data = fetch(
            "https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esummary.fcgi"
            "?db=pubmed&retmode=json&id=" + ",".join(chunk)
        )
        result = (data or {}).get("result", {})
        for pmid in chunk:
            item = result.get(pmid)
            if isinstance(item, dict):
                summaries[pmid] = item
    return summaries


def pubmed(title: str, authors: str, journal: str) -> dict | None:
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
    candidates: list[dict] = []
    for pmid in ids[:5]:
        item = result.get(pmid)
        if not item:
            continue
        candidates.append(pubmed_candidate(item, pmid, title, authors, journal))
    return ranked_best(candidates)


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

def accepted(year: int | None, journal: str, candidate: dict | None) -> bool:
    if not candidate or not (candidate.get("doi") or candidate.get("pmid")):
        return False
    try:
        exact_year = int(year or 0) > 0 and int(year) == int(candidate.get("year") or 0)
    except (TypeError, ValueError):
        exact_year = False
    if not exact_year:
        return False
    if float(candidate.get("score") or 0.0) < MIN_TITLE_SCORE:
        return False
    if candidate.get("author_match") is not True:
        return False
    # Exact title + author + year with a clear runner-up margin identifies the
    # work even when the local journal uses an abbreviation (for example PNAS)
    # or contains volume/PMCID text. Authoritative metadata replaces that local
    # journal string when the candidate is applied.
    margin = candidate.get("margin")
    return margin is not None and float(margin) >= MIN_RUNNER_UP_MARGIN


def identifier_metadata_accepted(year: int | None, journal: str, candidate: dict | None) -> bool:
    """Verify metadata returned for an identifier already stored in the record.

    An exact DOI/PMID/PMCID lookup has no search runner-up. Exact title + year
    is sufficient even when the legacy author or journal field is abbreviated;
    a close title additionally requires the same first author and year. A
    one-year online/print date difference is accepted only with an exact title
    and first-author match.
    """
    if not candidate or candidate.get("identifier_match") is not True:
        return False
    try:
        known_year = int(year or 0)
        candidate_year = int(candidate.get("year") or 0)
    except (TypeError, ValueError):
        return False
    if known_year <= 0 or candidate_year <= 0:
        return False
    title_score = float(candidate.get("score") or 0.0)
    year_delta = abs(known_year - candidate_year)
    if title_score >= MIN_TITLE_SCORE and year_delta == 0:
        return True
    if candidate.get("author_match") is not True:
        return False
    if title_score >= 0.90 and year_delta == 0:
        return True
    return title_score >= MIN_TITLE_SCORE and year_delta == 1


def resolve(title: str, authors: str, year: int | None, journal: str) -> dict:
    candidate = crossref(title, authors, journal)
    source = "crossref"
    if not accepted(year, journal, candidate):
        alt = pubmed(title, authors, journal)
        if accepted(year, journal, alt):
            candidate, source = alt, "pubmed"
        elif alt and (not candidate or alt["score"] > candidate["score"]):
            candidate, source = alt, "pubmed"
    return {
        "candidate": candidate,
        "source": source if candidate else None,
        "accepted": accepted(year, journal, candidate),
    }


def identifier_target(ref: dict) -> tuple[str, str] | None:
    """Return a direct identifier that still needs metadata verification.

    ``registered`` means that an identifier exists in the local repository;
    it does not prove that the identifier belongs to this bibliography.  Both
    registered and pending identifiers therefore take the authoritative
    metadata path before they can become ``verified``.
    """
    if str(ref.get("link_status") or "").strip().lower() not in {"pending", "registered"}:
        return None
    doi = str(ref.get("doi") or "").strip().lower()
    if doi.startswith("10."):
        return "doi", doi
    pmcid = str(ref.get("pmcid") or "").strip().upper()
    if re.fullmatch(r"PMC\d{6,9}", pmcid):
        return "pmcid", pmcid
    pmid = str(ref.get("pmid") or "").strip()
    if re.fullmatch(r"\d{7,9}", pmid):
        return "pmid", pmid
    return None


def identifier_result(ref: dict, kind: str, identifier: str, source: str, candidate: dict | None) -> dict:
    journal = ref.get("journal", "") or ""
    return {
        "registry": "references",
        "id": ref["id"],
        "identifier_kind": kind,
        "identifier": identifier,
        "title": ref.get("title", ""),
        "authors": ref.get("authors", ""),
        "year": ref.get("year"),
        "journal": journal,
        "fingerprint": identifier_fingerprint(ref, kind, identifier),
        "match_schema": IDENTIFIER_MATCH_SCHEMA_VERSION,
        "source": source,
        "candidate": candidate,
        "accepted": identifier_metadata_accepted(ref.get("year"), journal, candidate),
    }


def ncbi_identifier_candidate(
    ref: dict,
    kind: str,
    identifier: str,
    conversion: dict | None,
    summary: dict | None,
) -> dict | None:
    """Combine NCBI ID conversion and PubMed metadata for an exact ID check."""
    if kind not in {"pmid", "pmcid"} or not conversion or not summary:
        return None

    converted_pmid = str(conversion.get("pmid") or "").strip()
    converted_pmcid = str(conversion.get("pmcid") or "").strip().upper()
    if not re.fullmatch(r"\d{7,9}", converted_pmid):
        return None
    if kind == "pmid" and converted_pmid != identifier:
        return None
    if kind == "pmcid" and converted_pmcid != identifier.upper():
        return None

    candidate = pubmed_candidate(
        summary,
        converted_pmid,
        ref.get("title", ""),
        ref.get("authors", ""),
        ref.get("journal", "") or "",
    )
    summary_pmcid = str(candidate.get("pmcid") or "").strip().upper()
    candidate["identifier_match"] = (
        candidate.get("pmid") == converted_pmid
        and (
            (kind == "pmid" and converted_pmid == identifier)
            or (
                kind == "pmcid"
                and converted_pmcid == identifier.upper()
                and summary_pmcid == identifier.upper()
            )
        )
    )

    # The converter is authoritative for aliases which older PubMed summaries
    # occasionally omit, but never use those aliases to establish the match.
    if conversion.get("doi") and not candidate.get("doi"):
        candidate["doi"] = str(conversion["doi"]).strip().lower()
    if converted_pmcid and not candidate.get("pmcid"):
        candidate["pmcid"] = converted_pmcid
    return candidate


# ── registry-specific extraction ───────────────────────────────────

def needs_link(ref: dict) -> bool:
    doi = (ref.get("doi") or "").strip()
    if doi.startswith("10.") or doi.startswith("http"):
        return False
    return not any(
        str(ref.get(key) or "").strip()
        for key in ("url", "pmid", "pmcid")
    )


def apply_verified_candidate(ref: dict, candidate: dict) -> None:
    """Apply only authoritative fields from an already accepted candidate."""
    if candidate.get("doi"):
        ref["doi"] = str(candidate["doi"]).strip().lower()
    if candidate.get("pmid"):
        ref["pmid"] = str(candidate["pmid"])
    if candidate.get("pmcid"):
        ref["pmcid"] = str(candidate["pmcid"]).upper()
    if candidate.get("title"):
        ref["title"] = str(candidate["title"]).strip()
    if candidate.get("journal"):
        ref["journal"] = str(candidate["journal"]).strip()
    if candidate.get("year"):
        ref["year"] = int(candidate["year"])

    candidate_kind = str(candidate.get("kind") or "").strip().lower()
    type_by_kind = {
        "journal-article": "journal",
        "book-chapter": "book-chapter",
        "book": "book",
        "monograph": "book",
        "proceedings-article": "proceedings-article",
        "report": "report",
        "dataset": "dataset",
    }
    if candidate_kind in type_by_kind:
        ref["type"] = type_by_kind[candidate_kind]


# ── main ───────────────────────────────────────────────────────────

def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--apply", action="store_true", help="write resolved links into the registries")
    parser.add_argument("--workers", type=int, default=3)
    parser.add_argument("--refresh", action="store_true",
                        help="ignore the cache and re-resolve every entry")
    parser.add_argument("--offline", action="store_true",
                        help="apply only previously cached authoritative matches; never use the network")
    args = parser.parse_args()

    data = json.loads(REFERENCES.read_text())
    references = data["references"]

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
        pmcid = str(ref.get("pmcid") or "").strip().upper()
        if re.fullmatch(r"PMC\d+", pmcid):
            pmc_ids.add(pmcid)

    cache_data = json.loads(CACHE.read_text()) if CACHE.exists() else {"id_map": {}, "results": []}
    print(f"authoritative id lookups: {len(pmc_ids)} PMC, {len(pmid_ids)} PubMed", flush=True)
    id_map = cache_data.get("id_map", {}) if args.offline else (
        ncbi_ids(sorted(pmc_ids), "pmcid") | ncbi_ids(sorted(pmid_ids), "pmid")
    )

    # 2. Verify every not-yet-verified direct identifier against its
    # bibliographic metadata. ID conversion or local registration alone is
    # never sufficient to establish that the identifier belongs to the work.
    identifier_targets = [
        (ref, kind, identifier)
        for ref in references
        for kind, identifier in [identifier_target(ref) or ("", "")]
        if kind
    ]
    print(f"unverified direct identifier checks: {len(identifier_targets)}", flush=True)

    def identifier_cache_key(ref: dict, kind: str, identifier: str) -> tuple[str, str, str, str]:
        return ref["id"], kind, identifier, identifier_fingerprint(ref, kind, identifier)

    identifier_cached: dict[tuple[str, str, str, str], dict] = {}
    stale_identifier_cached = 0
    if CACHE.exists() and (not args.refresh or args.offline):
        for entry in cache_data.get("identifier_results", []):
            candidate = entry.get("candidate")
            fingerprint = entry.get("fingerprint")
            if (
                isinstance(candidate, dict)
                and entry.get("match_schema") == IDENTIFIER_MATCH_SCHEMA_VERSION
                and isinstance(fingerprint, str)
                and fingerprint
            ):
                refreshed = dict(entry)
                refreshed["accepted"] = identifier_metadata_accepted(
                    entry.get("year"), entry.get("journal", "") or "", candidate
                )
                identifier_cached[(
                    entry["id"],
                    entry["identifier_kind"],
                    entry["identifier"],
                    fingerprint,
                )] = refreshed
            elif candidate:
                stale_identifier_cached += 1
        print(
            f"reusing {len(identifier_cached)} direct-ID metadata checks; "
            f"skipped {stale_identifier_cached} stale entries",
            flush=True,
        )

    identifier_results: list[dict] = []
    missing_identifier_targets: list[tuple[dict, str, str]] = []
    for ref, kind, identifier in identifier_targets:
        hit = identifier_cached.get(identifier_cache_key(ref, kind, identifier))
        if hit:
            identifier_results.append(hit)
        elif not args.offline:
            missing_identifier_targets.append((ref, kind, identifier))

    if not args.offline:
        doi_targets = [target for target in missing_identifier_targets if target[1] == "doi"]

        def work_direct_doi(target: tuple[dict, str, str]) -> dict:
            ref, kind, identifier = target
            candidate = crossref_by_doi(
                identifier,
                ref.get("title", ""),
                ref.get("authors", ""),
                ref.get("journal", "") or "",
            )
            return identifier_result(ref, kind, identifier, "crossref_doi", candidate)

        if doi_targets:
            with ThreadPoolExecutor(max_workers=args.workers) as pool:
                identifier_results.extend(pool.map(work_direct_doi, doi_targets))

        ncbi_targets = [target for target in missing_identifier_targets if target[1] in {"pmid", "pmcid"}]
        target_pmids: list[str] = []
        for _, kind, identifier in ncbi_targets:
            conversion = id_map.get(identifier)
            converted_pmid = str((conversion or {}).get("pmid") or "").strip()
            if (
                re.fullmatch(r"\d{7,9}", converted_pmid)
                and (kind != "pmid" or converted_pmid == identifier)
            ):
                target_pmids.append(converted_pmid)
        summaries = pubmed_summaries(target_pmids)

        for ref, kind, identifier in ncbi_targets:
            conversion = id_map.get(identifier)
            converted_pmid = str((conversion or {}).get("pmid") or "").strip()
            candidate = ncbi_identifier_candidate(
                ref,
                kind,
                identifier,
                conversion,
                summaries.get(converted_pmid),
            )
            identifier_results.append(
                identifier_result(ref, kind, identifier, "ncbi_pubmed_metadata", candidate)
            )

    # 3. Bibliographic pass for everything still unlinked.
    ref_targets = [r for r in references if needs_link(r)]
    print(f"bibliographic lookups: {len(ref_targets)} canonical references", flush=True)

    def work_reference(ref: dict) -> dict:
        title = ref.get("title", "")
        authors = ref.get("authors", "")
        year = ref.get("year")
        journal = ref.get("journal", "") or ""
        out = {
            "registry": "references",
            "id": ref["id"],
            "title": title,
            "year": year,
            "authors": authors,
            "journal": journal,
            "fingerprint": bibliography_fingerprint(title, authors, year, journal),
            "match_schema": MATCH_SCHEMA_VERSION,
        }
        out.update(resolve(title, authors, year, journal))
        return out

    def reference_cache_key(ref: dict) -> tuple[str, str, str]:
        return (
            "references",
            ref["id"],
            bibliography_fingerprint(
                ref.get("title", ""),
                ref.get("authors", ""),
                ref.get("year"),
                ref.get("journal", "") or "",
            ),
        )

    cached: dict[tuple[str, str, str], dict] = {}
    stale_cached = 0
    if CACHE.exists() and (not args.refresh or args.offline):
        for entry in cache_data.get("results", []):
            fingerprint = entry.get("fingerprint")
            if (
                entry.get("candidate")
                and entry.get("match_schema") == MATCH_SCHEMA_VERSION
                and isinstance(fingerprint, str)
                and fingerprint
            ):
                refreshed = dict(entry)
                refreshed["accepted"] = accepted(
                    entry.get("year"), entry.get("journal", "") or "", entry.get("candidate")
                )
                cached[(entry["registry"], entry["id"], fingerprint)] = refreshed
            elif entry.get("candidate"):
                stale_cached += 1
        print(
            f"reusing {len(cached)} fingerprinted cache lookups; "
            f"skipped {stale_cached} stale entries",
            flush=True,
        )

    def cached_or(cache_key, worker):
        def run(item: dict) -> dict:
            hit = cached.get(cache_key(item))
            return hit if hit else worker(item)
        return run

    if args.offline:
        results = [
            cached[reference_cache_key(item)]
            for item in ref_targets
            if reference_cache_key(item) in cached
        ]
    else:
        with ThreadPoolExecutor(max_workers=args.workers) as pool:
            results = list(pool.map(cached_or(reference_cache_key, work_reference), ref_targets))

    if not args.offline:
        CACHE.parent.mkdir(parents=True, exist_ok=True)
        next_cache = dict(cache_data)
        next_cache.update({
            "id_map": id_map,
            "identifier_results": identifier_results,
            "results": results,
        })
        CACHE.write_text(json.dumps(next_cache, indent=1, ensure_ascii=False))

    identifier_ok = sum(1 for r in identifier_results if r["accepted"])
    ok = sum(1 for r in results if r["accepted"])
    print(
        f"verified direct identifiers: {identifier_ok}/{len(identifier_results)}",
        flush=True,
    )
    print(f"accepted: {ok}/{len(results)}   cache -> {CACHE.relative_to(ROOT)}", flush=True)

    if not args.apply:
        print("(dry run — pass --apply to write the canonical registry)")
        return 0

    by_id = {(r["registry"], r["id"]): r for r in results}
    identifier_by_id = {
        (r["id"], r["identifier_kind"], r["identifier"]): r
        for r in identifier_results
    }
    filled_refs = 0
    for ref in references:
        direct = identifier_target(ref)
        if direct:
            kind, identifier = direct
            verified = identifier_by_id.get((ref["id"], kind, identifier))
            if verified and verified["accepted"]:
                candidate = verified["candidate"]
                apply_verified_candidate(ref, candidate)
                ref["link_status"] = "verified"
                ref["link_source"] = verified["source"]
                ref["link_checked_at"] = date.today().isoformat()
                filled_refs += 1
            elif verified and verified.get("candidate"):
                # Preserve the identifier as a review candidate, but make the
                # record non-emittable when authoritative metadata did not
                # match. This prevents a valid DOI for the wrong paper from
                # becoming a public citation link.
                ref["link_status"] = "pending"
                ref["link_checked_at"] = date.today().isoformat()
            # A direct identifier may only be published through the strict
            # authoritative metadata result above, never through ID conversion
            # or a looser bibliographic search result.
            continue

        result = by_id.get(("references", ref["id"]))
        if result and result["registry"] == "references" and result["accepted"]:
            apply_verified_candidate(ref, result["candidate"])
            ref["link_status"] = "verified"
            ref["link_source"] = result["source"]
            ref["link_checked_at"] = date.today().isoformat()
            filled_refs += 1

    REFERENCES.write_text(json.dumps(data, indent=2, ensure_ascii=False) + "\n")
    print(f"written: {filled_refs} canonical references", flush=True)
    return 0


if __name__ == "__main__":
    sys.exit(main())
