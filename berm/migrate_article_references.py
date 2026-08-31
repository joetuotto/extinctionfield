"""Convert reviewed article reference strings to explicit referenceId objects."""

from __future__ import annotations

import json
import re
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
WEB = ROOT / "website"
ARTICLE_DIR = WEB / "app" / "[locale]" / "articles" / "[slug]"
MANIFEST = ROOT / "berm" / "data" / "evidence" / "article_reference_migration.json"
REGISTRY = WEB / "public" / "data" / "references_full.json"

ARRAY = re.compile(r"(?P<head>references:\s*\[)(?P<body>.*?)(?P<tail>\]\s*,)", re.S)
STRING = re.compile(r'(?P<indent>^[ \t]*)"(?P<label>(?:[^"\\]|\\.)*)"(?P<comma>,?)', re.M)


def main() -> int:
    manifest = json.loads(MANIFEST.read_text())
    registry = json.loads(REGISTRY.read_text())
    ids = {record["id"] for record in registry["references"]}
    ids.update(alias for record in registry["references"] for alias in record.get("aliases", []))
    changed = 0

    for filename, config in manifest.items():
        reference_ids = config["referenceIds"]
        unknown = [reference_id for reference_id in reference_ids if reference_id not in ids]
        if unknown:
            raise SystemExit(f"{filename}: unknown IDs {unknown}")
        path = ARTICLE_DIR / filename
        source = path.read_text()

        def replace_array(match: re.Match[str]) -> str:
            nonlocal changed
            body = match.group("body")
            strings = list(STRING.finditer(body))
            if len(strings) != len(reference_ids):
                raise SystemExit(
                    f"{filename}: expected {len(reference_ids)} reference strings per locale, found {len(strings)}"
                )
            index = 0

            def replace_string(string_match: re.Match[str]) -> str:
                nonlocal index, changed
                reference_id = reference_ids[index]
                index += 1
                changed += 1
                return (
                    f'{string_match.group("indent")}{{ referenceId: "{reference_id}", '
                    f'label: "{string_match.group("label")}" }},'
                )

            return match.group("head") + STRING.sub(replace_string, body) + match.group("tail")

        source, arrays = ARRAY.subn(replace_array, source)
        if arrays < 2:
            raise SystemExit(f"{filename}: expected localized reference arrays, found {arrays}")
        path.write_text(source)

    print(f"Migrated {changed} localized article bibliography entries")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
