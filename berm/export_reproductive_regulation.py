#!/usr/bin/env python3
"""Validate and mirror the BERM reproductive-regulation evidence catalog.

This export preserves source-specific observations and the separate conditional
syntheses. It neither fits response coefficients nor promotes component studies
into evidence of a calibrated environmental-field route.
"""

from __future__ import annotations

import argparse
import json
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
CATALOG = ROOT / "berm/data/evidence/reproductive_regulation_v1.json"
OUTPUTS = (
    ROOT / "website/data/reproductive-regulation.json",
    ROOT / "website/public/data/reproductive-regulation.json",
)
BRANCHES = {"motivation_realisation", "capacity", "care_feedback"}


def _localized(value: object, label: str) -> None:
    if not isinstance(value, dict) or any(
        not isinstance(value.get(lang), str) or not value[lang].strip()
        for lang in ("en", "fi")
    ):
        raise ValueError(f"{label}: complete English and Finnish copy is required")


def _ids(rows: object, label: str) -> set[str]:
    if not isinstance(rows, list) or not rows:
        raise ValueError(f"{label}: nonempty records required")
    identifiers = [row.get("id") for row in rows if isinstance(row, dict)]
    if len(identifiers) != len(rows) or any(
        not isinstance(identifier, str) or not identifier.strip()
        for identifier in identifiers
    ):
        raise ValueError(f"{label}: nonempty string IDs required")
    if len(identifiers) != len(set(identifiers)):
        raise ValueError(f"{label}: duplicate IDs")
    return set(identifiers)


def _links(values: object, available: set[str], label: str, *, allow_empty: bool = False) -> None:
    if not isinstance(values, list) or (not values and not allow_empty):
        raise ValueError(f"{label}: an ID list is required")
    if any(not isinstance(value, str) or value not in available for value in values):
        raise ValueError(f"{label}: unresolved ID")
    if len(values) != len(set(values)):
        raise ValueError(f"{label}: duplicate ID")


def build_reproductive_regulation_export(catalog_path: Path = CATALOG) -> dict:
    catalog = json.loads(catalog_path.read_text(encoding="utf-8"))
    if catalog.get("schemaVersion") != 1 or catalog.get("modelOwner") != "BERM":
        raise ValueError("BERM catalog schema version 1 is required")
    policy = catalog.get("stagePolicy", {})
    if (
        policy.get("phase") != "structure_and_direction"
        or policy.get("fieldAttribution") != "conditional_unresolved"
        or policy.get("quantitativeCalibration") != "open"
        or policy.get("newExperimentsRequired") is not False
    ):
        raise ValueError("The structural integration must retain open field and numerical calibration")
    for key in ("summary", "calibration"):
        _localized(policy.get(key), f"stagePolicy.{key}")
    studies = _ids(catalog.get("studies"), "studies")
    families = _ids(catalog.get("families"), "families")
    datasets = _ids(catalog.get("existingDatasets"), "existingDatasets")
    _ids(catalog.get("syntheses"), "syntheses")
    variables = catalog.get("variableLabels")
    if not isinstance(variables, dict) or not variables:
        raise ValueError("variableLabels must resolve measured variables and outcomes")
    for key, value in variables.items():
        _localized(value, f"variableLabels.{key}")
    bibliography = json.loads((ROOT / "website/public/data/references_full.json").read_text())
    references = {row["id"] for row in bibliography["references"]}
    claim_registry = json.loads((ROOT / "website/data/claims.json").read_text())
    claims = {row["id"] for row in claim_registry["claims"]}

    for family in catalog["families"]:
        for key in ("label", "description"):
            _localized(family.get(key), f"{family['id']}.{key}")
    for study in catalog["studies"]:
        identifier = study["id"]
        if study.get("evidenceKind") not in {"component_experiment", "observational"}:
            raise ValueError(f"{identifier}: preserve component versus observational evidence")
        if study.get("familyId") not in families:
            raise ValueError(f"{identifier}: unresolved family")
        _links([study.get("referenceId")], references, f"{identifier}.referenceId")
        _links(study.get("datasetIds"), datasets, f"{identifier}.datasetIds")
        _links(study.get("branches"), BRANCHES, f"{identifier}.branches")
        _links(study.get("measuredVariables"), set(variables), f"{identifier}.measuredVariables")
        _links(study.get("outcomes"), set(variables), f"{identifier}.outcomes")
        _links(study.get("correctionReferenceIds"), references, f"{identifier}.corrections", allow_empty=True)
        for key in ("system", "intervention", "finding", "scope", "timeCourse"):
            _localized(study.get(key), f"{identifier}.{key}")
    for dataset in catalog["existingDatasets"]:
        identifier = dataset["id"]
        if dataset.get("familyId") not in families:
            raise ValueError(f"{identifier}: unresolved family")
        _links([dataset.get("referenceId")], references, f"{identifier}.referenceId")
        _links(dataset.get("studyIds"), studies, f"{identifier}.studyIds", allow_empty=True)
        _links(dataset.get("measuredVariables"), set(variables), f"{identifier}.measuredVariables")
        if not isinstance(dataset.get("url"), str) or not dataset["url"].startswith("https://"):
            raise ValueError(f"{identifier}: an explicit HTTPS access/source route is required")
        if dataset.get("yearBasis") not in {"collection", "publication"} or not isinstance(dataset.get("years"), str):
            raise ValueError(f"{identifier}: distinguish collection years from publication years")
        for key in ("individualLevel", "longitudinal"):
            if not isinstance(dataset.get(key), bool):
                raise ValueError(f"{identifier}: {key} must be explicit")
        for key in ("title", "description", "scope", "access"):
            _localized(dataset.get(key), f"{identifier}.{key}")
    for study in catalog["studies"]:
        for dataset_id in study["datasetIds"]:
            dataset = next(row for row in catalog["existingDatasets"] if row["id"] == dataset_id)
            if study["id"] not in dataset["studyIds"]:
                raise ValueError(f"{study['id']}: dataset back-reference missing")
    for synthesis in catalog["syntheses"]:
        identifier = synthesis["id"]
        if synthesis.get("status") != "conditional_synthesis":
            raise ValueError(f"{identifier}: synthesis must remain distinct from a component experiment")
        _links([synthesis.get("claimId")], claims, f"{identifier}.claimId")
        _links(synthesis.get("studyIds"), studies, f"{identifier}.studyIds")
        _links(synthesis.get("referenceIds"), references, f"{identifier}.referenceIds")
        expected = {
            study["referenceId"] for study in catalog["studies"]
            if study["id"] in synthesis["studyIds"]
        }
        if set(synthesis["referenceIds"]) != expected:
            raise ValueError(f"{identifier}: references do not match the selected component studies")
        for key in ("title", "statement", "scope"):
            _localized(synthesis.get(key), f"{identifier}.{key}")
    return catalog


def serialized_export(catalog_path: Path = CATALOG) -> str:
    return json.dumps(build_reproductive_regulation_export(catalog_path), ensure_ascii=False, indent=2, allow_nan=False) + "\n"


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--check", action="store_true", help="Validate both mirrors without changing files")
    args = parser.parse_args()
    content = serialized_export()
    for path in OUTPUTS:
        if args.check:
            if not path.exists() or path.read_text(encoding="utf-8") != content:
                raise SystemExit(f"Stale or missing reproductive-regulation export: {path}")
        else:
            path.parent.mkdir(parents=True, exist_ok=True)
            path.write_text(content, encoding="utf-8")
            print(f"Wrote {path}")


if __name__ == "__main__":
    main()
