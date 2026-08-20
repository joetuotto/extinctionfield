"""Integrity tests for the legacy A--F bibliography migration manifest.

The manifest is deliberately separate from the active FieldState evidence
register.  It preserves every historical citation and makes its current
interpretation explicit without reviving legacy claims as model parameters.
"""

from __future__ import annotations

import hashlib
import json
from pathlib import Path

from berm.biology.causal_registry import validate_causal_nodes
from berm.evidence_registry import load_fieldstate_evidence


MIGRATION_PATH = (
    Path(__file__).resolve().parent.parent
    / "data"
    / "evidence"
    / "legacy_reference_migration_v1.json"
)
EXPECTED_LEGACY_ID_DIGEST = "cdc11b7ecc289086960a3f0df87a4c0785b16edd362417cd2f60cd8b969acb82"
EXPECTED_LEGACY_METADATA_DIGEST = "b3303ad782d5993d3cb816eb333db3efe71f1ba17d436a83f8c503bf6d9af907"
ALLOWED_STATUSES = {
    "SUPERSEDED_BY_ACTIVE_RECORD",
    "MIGRATION_CANDIDATE",
    "CONTEXT_ONLY",
    "HISTORICAL_CONTEXT",
    "UNVERIFIED_CITATION",
    "OUTSIDE_ACTIVE_GRAPH",
    "RETRACTED_2024",
}
ALLOWED_CALIBRATION_ROLES = {"STRUCTURAL_ONLY", "CONTEXT_ONLY"}
EMPTY_NODE_STATUSES = {
    "CONTEXT_ONLY",
    "UNVERIFIED_CITATION",
    "OUTSIDE_ACTIVE_GRAPH",
    "RETRACTED_2024",
}
EMPTY_NODE_ROLES = {
    "OUTSIDE_ACTIVE_GRAPH_CONTEXT",
    "PHARMACOLOGICAL_ANALOGY_CONTEXT",
    "RECOVERY_WINDOW_OR_TECHNOLOGY_CONTEXT",
    "SOURCE_QUALIFICATION_PENDING",
    "RETRACTED_SOURCE_PROVENANCE_ONLY",
}


def _load_manifest() -> dict:
    return json.loads(MIGRATION_PATH.read_text(encoding="utf-8"))


def test_legacy_bibliography_is_complete_and_source_anchored() -> None:
    manifest = _load_manifest()
    archive = manifest["source_archive"]
    records = manifest["records"]
    added = set(manifest["post_archive_additions"]["legacy_ids"])
    archive_records = [r for r in records if r["legacy_id"] not in added]
    ids = [record["legacy_id"] for record in archive_records]
    digest = hashlib.sha256(("\n".join(sorted(ids)) + "\n").encode()).hexdigest()

    assert manifest["migration_version"] == "legacy-reference-migration-v1"
    assert archive["record_count"] == 129
    assert len(archive_records) == 129
    assert len(records) == len(archive_records) + len(added)
    assert len({r["legacy_id"] for r in records}) == len(records)
    assert digest == EXPECTED_LEGACY_ID_DIGEST
    assert archive["git_blob"] == "505f761b3b4d79dbfe8b6cfcb52d3fa79a793ae8"
    assert archive["legacy_repository_path"] == "website/public/data/references.json"

    preserved_metadata = [
        {
            "id": record["legacy_id"],
            "authors": record["citation"].get("authors"),
            "year": record["citation"].get("year"),
            "title": record["citation"].get("title"),
            "journal": record["citation"].get("journal"),
            "n": record["citation"].get("n"),
            "type": record["legacy_classification"].get("type"),
            "level": record["legacy_classification"].get("evidence_level_label"),
            "pathway": record["legacy_classification"].get("pathways"),
            "tags": record["legacy_classification"].get("tags"),
        }
        for record in archive_records
    ]
    metadata_json = json.dumps(
        preserved_metadata,
        ensure_ascii=False,
        separators=(",", ":"),
    )
    assert hashlib.sha256(metadata_json.encode()).hexdigest() == EXPECTED_LEGACY_METADATA_DIGEST
    assert archive["preserved_metadata_sha256"] == EXPECTED_LEGACY_METADATA_DIGEST


def test_post_archive_additions_are_declared_and_never_claim_archive_provenance() -> None:
    manifest = _load_manifest()
    added = set(manifest["post_archive_additions"]["legacy_ids"])
    records = {record["legacy_id"]: record for record in manifest["records"]}

    assert added <= set(records)
    for legacy_id in added:
        record = records[legacy_id]
        assert "legacy_source_record_index" not in record
        assert record["source_status"] == "BERM_INTERNAL_ANALYSIS"
    for legacy_id, record in records.items():
        if legacy_id not in added:
            assert isinstance(record["legacy_source_record_index"], int)


def test_migration_records_are_bounded_and_use_only_semantic_nodes() -> None:
    records = _load_manifest()["records"]

    for record in records:
        assert record["status"] in ALLOWED_STATUSES
        assert record["calibration_role"] in ALLOWED_CALIBRATION_ROLES
        assert record["translation_scope"].strip()
        assert record["model_domain"].strip()
        assert record["limitations"]
        assert all(str(item).strip() for item in record["limitations"])
        assert record["citation"]["title"].strip()
        assert record["citation"]["authors"].strip()
        assert "finding" not in record
        assert "effect_size" not in record
        assert "parameter_id" not in record
        assert "tfr_coefficient" not in record

        nodes = record["canonical_nodes"]
        if nodes:
            assert validate_causal_nodes(nodes) == tuple(nodes)
        else:
            assert record["status"] in EMPTY_NODE_STATUSES
            assert record["evidence_role"] in EMPTY_NODE_ROLES


def test_active_aliases_point_to_real_bounded_fieldstate_records() -> None:
    records = _load_manifest()["records"]
    active_ids = {record.id for record in load_fieldstate_evidence()}
    aliases = [
        record
        for record in records
        if record["status"] == "SUPERSEDED_BY_ACTIVE_RECORD"
    ]

    assert {record["legacy_id"] for record in aliases} == {
        "ritz2004",
        "zandieh2025",
        "deiuliis2009",
    }
    assert all(record["canonical_evidence_id"] in active_ids for record in aliases)
