"""Generate the deprecated translated-label lookup for migration audits.

The website runtime must never import the generated file. New and migrated
citations use a literal canonical ``referenceId`` through ``StudyCitation``.
This tool remains only for comparing the old coverage during migration and is
not part of the build or publication pipeline.

Evidence and modulome pages cite studies inline as
`{ citation: "Chae et al. (PLOS ONE)", year: 2019, note: "..." }`.
Those labels carried no link.  This script scans every such citation out of the
page sources, resolves it against the reference registries, and emits a compact
lookup table the `CitationLink` component reads.

Resolution order, most authoritative first:
  1. FIELDSTATE_EVIDENCE records in lib/evidence.ts   (explicit url, exact label)
  2. references_full.json                             (first-author surname + year)
  3. legacyEvidence.json                              (first-author surname + year)
  4. berm/data/evidence/citation_link_overrides.json  (hand-verified, for labels
     that are not author-year citations: agency records, patents, directives)

Citations that resolve to nothing are listed in the run report and render as
plain text on the site — never as a broken link.

Usage:
    python3 berm/export_citation_links.py
"""

from __future__ import annotations

import argparse
import json
import re
import sys
import unicodedata
from collections import defaultdict
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
WEB = ROOT / "website"
REFERENCES = WEB / "public" / "data" / "references_full.json"
LEGACY = WEB / "lib" / "legacyEvidence.json"
EVIDENCE_TS = WEB / "lib" / "evidence.ts"
OVERRIDES = ROOT / "berm" / "data" / "evidence" / "citation_link_overrides.json"
OUTPUT = WEB / "lib" / "citationLinks.ts"

CITATION_RE = re.compile(r'citation:\s*"((?:[^"\\]|\\.)*)"\s*,\s*year:\s*(\d{1,4})')
# modulome pages cite as {id, citation, finding} with the year folded into the
# slug or the label instead of a separate field
YEARLESS_RE = re.compile(
    r'id:\s*"([^"]+)",\s*\n\s*citation:\s*"((?:[^"\\]|\\.)*)",\s*\n\s*finding:'
)


def identifier_url(label: str) -> str | None:
    """URL derived from an identifier the label itself states — never guessed."""
    match = re.search(r"\bPMC(\d{6,9})\b", label)
    if match:
        return f"https://pmc.ncbi.nlm.nih.gov/articles/PMC{match.group(1)}/"
    match = re.search(r"\bPubMed\s*:?\s*(\d{7,9})\b", label, re.I)
    if match:
        return f"https://pubmed.ncbi.nlm.nih.gov/{match.group(1)}/"
    match = re.search(r"\bdoi:?\s*(10\.\d{4,9}/\S+)", label, re.I)
    if match:
        return f"https://doi.org/{match.group(1).rstrip('.,;)')}"
    return None


def year_from(slug: str, label: str) -> int | None:
    for text in (label, slug):
        match = re.search(r"\b(19\d\d|20\d\d)\b", text)
        if match:
            return int(match.group(1))
    return None
EVIDENCE_RECORD_RE = re.compile(
    r'citation:\s*"((?:[^"\\]|\\.)*)"\s*,\s*year:\s*(\d{1,4})\s*,\s*url:\s*"([^"]*)"'
)


# Letters NFD does not decompose into base + combining mark.
TRANSLITERATE = str.maketrans({"ß": "ss", "ø": "o", "æ": "ae", "œ": "oe", "ł": "l", "đ": "d", "þ": "th"})


def normalize_key(text: str) -> str:
    """Mirror of normalizeCitationKey() in the generated TypeScript."""
    stripped = "".join(
        c for c in unicodedata.normalize("NFD", text.lower()) if not unicodedata.combining(c)
    )
    return re.sub(r"\s+", " ", re.sub(r"[^a-z0-9]+", " ", stripped)).strip()


def surnames(text: str) -> list[str]:
    """Candidate first-author surnames for a label, most likely first.

    Labels are not uniform: "Chae K-S et al.", "REFLEX / Diem et al.",
    "Šofranková et al. (Pathogens)".  Each slash-separated segment is a
    plausible naming of the same study, so all of them are offered.
    """
    plain = "".join(
        c for c in unicodedata.normalize("NFD", text.translate(TRANSLITERATE))
        if not unicodedata.combining(c)
    )
    plain = re.sub(r"\(.*?\)", " ", plain)
    out: list[str] = []
    for segment in re.split(r"[/;]", plain):
        segment = re.split(r"\s+(?:et al|ym|and)\b", segment)[0]
        segment = re.split(r"[,&]", segment)[0]
        parts = [p for p in segment.split() if p]
        if not parts:
            continue
        name = re.sub(r"[^a-z]", "", parts[0].lower())
        if name and name not in out:
            out.append(name)
    return out


def first_surname(text: str) -> str:
    found = surnames(text)
    return found[0] if found else ""


def reference_url(entry: dict) -> str | None:
    """Same precedence as referenceUrl() in lib/references.ts."""
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


def source_files() -> list[Path]:
    skip = (".next", "node_modules")
    return sorted(
        p for ext in ("*.tsx", "*.ts")
        for p in WEB.rglob(ext)
        if not any(s in p.parts for s in skip)
    )


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument(
        "--migration-audit",
        action="store_true",
        help="explicitly regenerate the deprecated comparison artifact",
    )
    args = parser.parse_args()
    if not args.migration_audit:
        print(
            "Refusing to generate translated-text citation links. "
            "Use canonical referenceId values; pass --migration-audit only for legacy comparison.",
            file=sys.stderr,
        )
        return 2

    references = json.loads(REFERENCES.read_text())["references"]
    legacy = json.loads(LEGACY.read_text())
    overrides = json.loads(OVERRIDES.read_text()) if OVERRIDES.exists() else {}

    # index the registries by (surname, year)
    by_author_year: dict[tuple[str, int], list[str]] = defaultdict(list)
    for entry in references:
        url = reference_url(entry)
        if url:
            by_author_year[(first_surname(entry.get("authors", "")), int(entry.get("year") or 0))].append(url)
    for record in legacy:
        url = (record.get("url") or "").strip()
        if url:
            by_author_year[(first_surname(record.get("citation", "")), int(record.get("year") or 0))].append(url)

    # explicit label -> url from the bounded v17 evidence records
    explicit: dict[str, str] = {}
    for citation, year, url in EVIDENCE_RECORD_RE.findall(EVIDENCE_TS.read_text()):
        if not url:
            continue
        explicit[f"{normalize_key(citation)}|{year}"] = url
        for name in surnames(citation):
            by_author_year[(name, int(year))].append(url)

    links: dict[str, str] = {}
    unresolved: list[tuple[str, int, str]] = []
    seen: set[tuple[str, int]] = set()

    for path in source_files():
        text = path.read_text(encoding="utf-8", errors="replace")
        for match in CITATION_RE.finditer(text):
            citation, year = match.group(1), int(match.group(2))
            if (citation, year) in seen:
                continue
            seen.add((citation, year))
            key = f"{normalize_key(citation)}|{year}"

            url = explicit.get(key) or overrides.get(key) or identifier_url(citation)
            if not url:
                for name in surnames(citation):
                    for drift in (0, -1, 1, -2, 2):
                        candidates = by_author_year.get((name, year + drift), [])
                        if candidates:
                            url = candidates[0]
                            break
                    if url:
                        break

            if url:
                links[key] = url
            else:
                rel = str(path.relative_to(WEB))
                unresolved.append((citation, year, rel))

        for slug, citation in YEARLESS_RE.findall(text):
            year = year_from(slug, citation)
            if (citation, year or 0) in seen:
                continue
            seen.add((citation, year or 0))
            key = normalize_key(citation)

            url = overrides.get(key)
            if not url and year:
                for name in surnames(citation) or surnames(slug.replace("-", " ")):
                    for drift in (0, -1, 1):
                        candidates = by_author_year.get((name, year + drift), [])
                        if candidates:
                            url = candidates[0]
                            break
                    if url:
                        break
            if not url:
                url = identifier_url(citation)

            if url:
                links[key] = url
            else:
                unresolved.append((citation, year or 0, str(path.relative_to(WEB))))

    body = "\n".join(f'  {json.dumps(k)}: {json.dumps(v)},' for k, v in sorted(links.items()))
    OUTPUT.write_text(f'''/**
 * @deprecated Migration-audit artifact only.
 *
 * Inline citation link table.
 *
 * The website runtime must never import this translated-text lookup. All
 * visible citations resolve exclusively through a literal referenceId.
 * GENERATED by berm/export_citation_links.py — do not edit by hand.
 * Regenerate after changing references_full.json, legacyEvidence.json or any
 * inline `citation:` label.
 */

const CITATION_LINKS: Readonly<Record<string, string>> = {{
{body}
}};

/** Normalizes a citation label to its lookup key; mirrors the generator. */
export function normalizeCitationKey(citation: string): string {{
  return citation
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\\u0300-\\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}}

/**
 * Source URL for an inline citation, or null when none is known.
 *
 * Citations that carry a year are keyed by label and year; modulome pages cite
 * without a separate year field and are keyed by label alone.
 */
export function citationHref(citation: string, year?: number | string): string | null {{
  const key = normalizeCitationKey(citation);
  if (year !== undefined && year !== null) {{
    const dated = CITATION_LINKS[`${{key}}|${{year}}`];
    if (dated) return dated;
  }}
  return CITATION_LINKS[key] ?? null;
}}

export const CITATION_LINK_COUNT = {len(links)};
''')

    total = len(links) + len(unresolved)
    print(f"inline citations: {total}   linked: {len(links)}   unresolved: {len(unresolved)}")
    print(f"written -> {OUTPUT.relative_to(ROOT)}")
    if unresolved:
        print("\nunresolved (render as plain text):")
        for citation, year, rel in unresolved:
            print(f"  {year}  {citation[:64]:66} {rel}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
