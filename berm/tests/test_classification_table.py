"""Integrity tests for the negative-findings classification table.

The table is the single source of truth for what each documented negative
finding bears on. The site renders it directly, so a summary count that
disagrees with the records would publish a false claim.
"""

from __future__ import annotations

import json
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent.parent
TABLE_PATH = ROOT / "docs" / "audit" / "CLASSIFICATION_TABLE.json"
SITE_COPY_PATH = ROOT / "website" / "lib" / "classificationTable.json"

REQUIRED_FIELDS = {
    "id",
    "name",
    "original_classification",
    "revised_classification",
    "reason",
    "affects",
    "affects_l_berm",
    "affects_empirical_berm",
    "discriminating_test_available",
    "discriminating_test",
}

REMAINS_NEGATIVE = {
    "soliton_layer_falsified",
    "mechanism_impossible",
    "physics_error",
    "documentation_integrity",
    "parsimony_problem",
    "consistency_problem",
}
RECLASSIFIED = {"non_discriminating", "straw_man", "underdetermined", "wrong_test"}
OLD_VERSION_TARGETS = {
    "berm_v6_v9_resonance",
    "berm_v6_v9_documents",
    "density_only_model",
}


def _load() -> dict:
    return json.loads(TABLE_PATH.read_text(encoding="utf-8"))


def test_every_finding_carries_the_full_schema() -> None:
    records = _load()["findings"]

    assert len(records) == 13
    assert len({record["id"] for record in records}) == len(records)
    for record in records:
        assert REQUIRED_FIELDS <= set(record)
        assert isinstance(record["affects_l_berm"], bool)
        assert isinstance(record["affects_empirical_berm"], bool)
        assert record["reason"].strip()
        assert record["revised_classification"] in (
            REMAINS_NEGATIVE | RECLASSIFIED | {"internal_refinement"}
        )


def test_a_declared_discriminating_test_is_actually_named() -> None:
    for record in _load()["findings"]:
        has_test = record["discriminating_test_available"]
        named = record["discriminating_test"]
        assert has_test == (named is not None)
        if has_test:
            assert named.strip()


def test_summary_counts_match_the_records_they_summarise() -> None:
    table = _load()
    records = table["findings"]
    summary = table["summary"]

    counted = {
        "total": len(records),
        "remains_negative": sum(
            1 for r in records if r["revised_classification"] in REMAINS_NEGATIVE
        ),
        "reclassified": sum(
            1 for r in records if r["revised_classification"] in RECLASSIFIED
        ),
        "internal_refinement": sum(
            1 for r in records if r["revised_classification"] == "internal_refinement"
        ),
        "affects_current_berm": sum(1 for r in records if r["affects_empirical_berm"]),
        "affects_l_berm_only": sum(1 for r in records if r["affects_l_berm"]),
        "affects_old_versions_only": sum(
            1 for r in records if r["affects"] in OLD_VERSION_TARGETS
        ),
        "discriminating_tests_needed": sum(
            1 for r in records if r["discriminating_test_available"]
        ),
    }
    assert summary == counted


def test_site_copy_is_byte_identical_to_the_canonical_table() -> None:
    # The bundler cannot follow a symlink out of the app directory, so the site
    # keeps a copy. It must not drift from the audited source.
    assert SITE_COPY_PATH.read_bytes() == TABLE_PATH.read_bytes()


def test_model_metadata_counts_come_from_the_audit_table() -> None:
    import berm

    table = _load()["summary"]
    meta = berm.model_metadata()

    assert meta["reasoning_protocol_version"] == "1.0"
    assert meta["negative_findings_reviewed"] == table["total"]
    assert meta["findings_reclassified"] == table["reclassified"]
    assert meta["findings_remain_negative"] == table["remains_negative"]
    assert meta["findings_internal_refinement"] == table["internal_refinement"]
    assert meta["findings_affecting_current_model"] == table["affects_current_berm"]
    # D1-D3 test the primary branch; the table's five are per-finding follow-ups.
    assert meta["discriminating_tests_needed"] == 3
    assert meta["follow_up_discriminating_tests_identified"] == table[
        "discriminating_tests_needed"
    ]
    assert meta["discriminating_tests_completed"] == 0
    assert meta["primary_pathway"] == "C_RPM"


def test_evidence_records_carry_an_explicit_protocol_assessment_state() -> None:
    """Every active record declares whether the protocol has been applied to it.

    An unassessed record must say so rather than carry an invented verdict:
    guessing whether a source discriminates BERM from the consensus model is
    the exact error the protocol exists to prevent.
    """
    path = ROOT / "berm" / "data" / "evidence" / "fieldstate_causal_evidence.json"
    records = json.loads(path.read_text(encoding="utf-8"))["records"]
    fields = (
        "discriminating",
        "tests_berm_specific_prediction",
        "berm_prediction_derived",
        "consensus_prediction_same",
    )

    for record in records:
        status = record["protocol_assessment_status"]
        assert status in {"PENDING", "ASSESSED"}
        for field in fields:
            assert field in record
            if status == "PENDING":
                assert record[field] is None
            else:
                assert isinstance(record[field], bool)
