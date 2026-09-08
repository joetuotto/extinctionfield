#!/usr/bin/env python3
"""Mirror the canonical research catalog with BERM's structural model contract.

This export does not fit dose/response curves or invent scenario kinetics. The
catalog owns sources and translations; the model owns its implemented state,
mass-balance, conditional readout and unresolved-transfer declarations.
"""

from __future__ import annotations

import argparse
import json
from pathlib import Path

from berm.modulome.steroidogenesis import steroidogenesis_structure


ROOT = Path(__file__).resolve().parents[1]
CATALOG = ROOT / "berm" / "data" / "evidence" / "steroidogenesis_v1.json"
OUTPUTS = (ROOT / "website" / "data" / "steroidogenesis.json",
           ROOT / "website" / "public" / "data" / "steroidogenesis.json")


def build_steroidogenesis_export(catalog_path: Path = CATALOG) -> dict:
    catalog = json.loads(catalog_path.read_text(encoding="utf-8"))
    required = {"version", "modelOwner", "stagePolicy", "studies", "syntheses", "states", "families", "copy"}
    if not isinstance(catalog, dict) or required - set(catalog):
        raise ValueError("steroidogenesis catalog is missing required fields")
    if catalog["modelOwner"] != "BERM":
        raise ValueError("the steroidogenesis model owner must be BERM")
    identifiers = {}
    for group in ("studies", "syntheses", "states", "families"):
        rows = catalog[group]
        if not isinstance(rows, list) or not rows:
            raise ValueError(f"{group} must contain catalog records")
        ids = [row.get("id") for row in rows if isinstance(row, dict)]
        if len(ids) != len(rows) or any(not isinstance(value, str) or not value.strip() for value in ids):
            raise ValueError(f"{group} records must have non-empty IDs")
        if len(ids) != len(set(ids)):
            raise ValueError(f"{group} contains duplicate IDs")
        identifiers[group] = set(ids)
    for study in catalog["studies"]:
        if study.get("evidenceKind") not in {"field_experiment", "component_experiment"}:
            raise ValueError("studies must retain field versus component experiment identity")
        if study.get("familyId") not in identifiers["families"]:
            raise ValueError("study familyId does not resolve")
        if not isinstance(study.get("referenceId"), str) or not study["referenceId"].strip():
            raise ValueError("each study must name its canonical referenceId")
    for synthesis in catalog["syntheses"]:
        study_ids = synthesis.get("studyIds")
        if not isinstance(study_ids, list) or not study_ids or any(value not in identifiers["studies"] for value in study_ids):
            raise ValueError("synthesis studyIds must resolve to catalog studies")
    return {**catalog, "modelStructure": steroidogenesis_structure()}


def serialized_export(catalog_path: Path = CATALOG) -> str:
    return json.dumps(build_steroidogenesis_export(catalog_path), ensure_ascii=False, indent=2, allow_nan=False) + "\n"


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--check", action="store_true", help="check both mirrors without changing files")
    args = parser.parse_args()
    content = serialized_export()
    for path in OUTPUTS:
        if args.check:
            if not path.exists() or path.read_text(encoding="utf-8") != content:
                raise SystemExit(f"Stale or missing steroidogenesis export: {path}")
        else:
            path.parent.mkdir(parents=True, exist_ok=True)
            path.write_text(content, encoding="utf-8")
            print(f"Wrote {path}")


if __name__ == "__main__":
    main()
