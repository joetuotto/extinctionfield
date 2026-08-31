"""Apply the reviewed citation-to-referenceId migration manifest.

This is a one-time source migration.  It does not infer references from author
names or dates: every logical table row and every yearless record ID is listed
explicitly in citation_reference_migration.json.
"""

from __future__ import annotations

import json
import re
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
WEB = ROOT / "website"
MANIFEST = ROOT / "berm" / "data" / "evidence" / "citation_reference_migration.json"
REGISTRY = WEB / "public" / "data" / "references_full.json"

DATED = re.compile(
    r'(citation:\s*"(?:[^"\\]|\\.)*"\s*,\s*year:\s*(?:"(?P<year_text>[^"]+)"|(?P<year_num>\d{1,4})))(?P<comma>\s*,)'
)
YEARLESS = re.compile(
    r'(?P<head>id:\s*"(?P<row_id>[^"]+)"\s*,\s*\n\s*citation:\s*"(?:[^"\\]|\\.)*"\s*,)(?P<gap>\s*\n\s*)(?P<tail>finding:)'
)
CITATION_TAG = re.compile(r"<CitationLink\b(?P<attrs>[\s\S]*?)/>")


def main() -> int:
    manifest = json.loads(MANIFEST.read_text())
    registry = json.loads(REGISTRY.read_text())
    ids = {record["id"] for record in registry["references"]}
    ids.update(alias for record in registry["references"] for alias in record.get("aliases", []))
    changed = 0

    for relative, logical_ids in manifest["dated"].items():
        unknown = [reference_id for reference_id in logical_ids if reference_id not in ids]
        if unknown:
            raise SystemExit(f"{relative}: unknown manifest IDs: {unknown}")
        path = WEB / relative
        source = path.read_text()

        matches = [
            match
            for match in DATED.finditer(source)
            if any(char.isdigit() for char in (match.group("year_text") or match.group("year_num") or ""))
        ]
        expected = len(logical_ids) * 5
        if len(matches) != expected:
            raise SystemExit(f"{relative}: expected {expected} localized citation rows, found {len(matches)}")

        index = 0

        def insert_dated(match: re.Match[str]) -> str:
            nonlocal index
            year = match.group("year_text") or match.group("year_num") or ""
            if not any(char.isdigit() for char in year):
                return match.group(0)
            reference_id = logical_ids[index % len(logical_ids)]
            index += 1
            return f'{match.group(1)}{match.group("comma")} referenceId: "{reference_id}",'

        source = DATED.sub(insert_dated, source)
        path.write_text(source)
        changed += index

    for relative, row_map in manifest["yearless"].items():
        unknown = [reference_id for reference_id in row_map.values() if reference_id not in ids]
        if unknown:
            raise SystemExit(f"{relative}: unknown manifest IDs: {unknown}")
        path = WEB / relative
        source = path.read_text()
        inserted = 0

        def insert_yearless(match: re.Match[str]) -> str:
            nonlocal inserted
            reference_id = row_map.get(match.group("row_id"))
            if not reference_id:
                raise SystemExit(f"{relative}: missing mapping for row {match.group('row_id')}")
            inserted += 1
            return (
                f'{match.group("head")}\n        referenceId: "{reference_id}",'
                f'{match.group("gap")}{match.group("tail")}'
            )

        source = YEARLESS.sub(insert_yearless, source)
        expected = len(row_map) * 5
        if inserted != expected:
            raise SystemExit(f"{relative}: expected {expected} localized yearless rows, found {inserted}")
        path.write_text(source)
        changed += inserted

    # All CitationLink renderers now consume the explicit field.  The legacy
    # label/year adapter remains in the component only for unmigrated content.
    for relative in set(manifest["dated"]) | set(manifest["yearless"]):
        path = WEB / relative
        source = path.read_text()

        def update_tag(match: re.Match[str]) -> str:
            attrs = match.group("attrs")
            if "referenceId=" in attrs:
                return match.group(0)
            variable = re.search(r"citation=\{([A-Za-z_$][\w$]*)\.citation\}", attrs)
            if not variable:
                raise SystemExit(f"{relative}: cannot identify CitationLink record variable")
            name = variable.group(1)
            return f'<CitationLink referenceId={{{name}.referenceId}} locale={{locale}}{attrs}/>'

        source = CITATION_TAG.sub(update_tag, source)
        path.write_text(source)

    print(f"Migrated {changed} localized citation records across {len(set(manifest['dated']) | set(manifest['yearless']))} pages")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
