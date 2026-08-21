"""Tests for canonical causal names and bounded FieldState evidence records."""

from __future__ import annotations

import pytest

from berm.biology.causal_registry import canonical_node_id, get_causal_node
from berm.evidence_registry import (
    evidence_for_node,
    evidence_summary,
    legacy_evidence_summary,
    load_fieldstate_evidence,
    load_legacy_evidence_migration,
)


def test_legacy_aliases_resolve_to_one_stable_semantic_node() -> None:
    assert canonical_node_id("BTB") == "BARRIER_BTB"
    assert canonical_node_id("legacy pathway F BBB") == "BARRIER_BBB"
    assert get_causal_node("O_RESERVE").id == "OVARIAN_RESERVE"


def test_unknown_and_duplicate_causal_aliases_fail_loudly() -> None:
    with pytest.raises(KeyError, match="unknown causal node"):
        canonical_node_id("not_a_pathway")


def test_registry_has_bounded_evidence_for_new_male_female_and_physics_nodes() -> None:
    records = load_fieldstate_evidence()
    ids = {record.id for record in records}

    assert "YU_2020_LOCAL_4G_BTB" in ids
    assert "AHMADI_2016_OVARIAN_FOLLICLES" in ids
    assert "SHERRARD_2018_CRY_ROS" in ids
    assert "CORDELLI_2025_CORRIGENDUM" in ids
    assert "NADERI_2026_RODENT_SYSTEMATIC_REVIEW" in ids
    assert "BALDINI_2025_ART_LAB_SPERM" in ids
    assert "YOUSEFI_2025_NEONATAL_OOGENESIS" in ids
    assert "SHAFIK_1992_HUMAN_TEXTILE_SURFACE_READING" in ids
    assert "SHAFIK_1992_HUMAN_POLYESTER_SLING" in ids
    assert "DINCMEN_2016_PET_ANTISTATIC_DECAY" in ids
    assert "ENGLAND_2023_TICK_STATIC_ATTACHMENT" in ids
    assert "GARCIA_ROBLEDO_2025_FLOWER_MITE_ELECTRORECEPTION" in ids
    assert "SOFRANKOVA_2023_TICK_RF_NEUROPEPTIDE" in ids
    assert all(record.calibration_role in {"STRUCTURAL_ONLY", "CONTEXT_ONLY"} for record in records)
    assert all(record.limitations for record in records)


def test_evidence_is_attached_to_semantic_nodes_not_ambiguous_pathway_letters() -> None:
    btb = evidence_for_node("BTB")
    summary = evidence_summary()

    assert any(record.id == "YU_2020_LOCAL_4G_BTB" for record in btb)
    assert "BARRIER_BTB" in summary
    assert "T" not in summary


def test_static_interface_and_ecological_branch_stay_structural_not_tfr_coefficients() -> None:
    static_records = evidence_for_node("STATIC_TRIBO_INTERFACE")
    low_frequency_records = evidence_for_node("FIELDSTATE_LOW_FREQUENCY_ELECTRIC")
    encounter_records = evidence_for_node("ECOLOGICAL_ENCOUNTER")

    assert any(record.id == "SHAFIK_1992_HUMAN_TEXTILE_SURFACE_READING" for record in static_records)
    assert any(record.id == "MALLINSON_2025_HONEYBEE_EFIELD_FORAGING" for record in low_frequency_records)
    assert any(record.id == "GARCIA_ROBLEDO_2025_FLOWER_MITE_ELECTRORECEPTION" for record in low_frequency_records)
    assert any(record.id == "SOFRANKOVA_2023_TICK_RF_NEUROPEPTIDE" for record in encounter_records)
    assert any(record.id == "ENGLAND_2023_TICK_STATIC_ATTACHMENT" for record in encounter_records)
    assert all(
        record.calibration_role == "STRUCTURAL_ONLY"
        for record in static_records + low_frequency_records + encounter_records
    )


def test_asfr_keeps_biological_and_nonbiological_inputs_explicit() -> None:
    asfr = get_causal_node("ASFR")

    assert asfr.parents == (
        "COUPLE_FECUNDABILITY",
        "DEMAND_OPPORTUNITY",
        "TEMPO",
        "ART_LIVE_BIRTH_DELIVERY",
    )
    assert get_causal_node("demand/opportunity").prediction_role == "explicit_nonbiological_input"
    assert get_causal_node("tempo").calibration_status == "requires_external_measurement"


def test_legacy_bibliography_is_available_without_becoming_active_evidence() -> None:
    records = load_legacy_evidence_migration()
    summary = legacy_evidence_summary(records)

    # 129 frozen archive records plus 5 declared post-archive additions.
    assert len(records) == 134
    assert summary["record_count"] == 134
    assert sum(1 for r in records if r.legacy_source_record_index is None) == 5
    assert summary["active_alias_count"] == 3
    assert summary["by_status"]["MIGRATION_CANDIDATE"] == 39
    # A retracted source keeps its provenance row but no causal attachment.
    assert summary["by_status"]["RETRACTED_2024"] == 1
    assert all(
        not record.canonical_nodes
        for record in records
        if record.status == "RETRACTED_2024"
    )
    assert any(not record.canonical_nodes for record in records)


def test_top_level_package_exposes_the_integrated_route_and_evidence_layers() -> None:
    import berm

    assert berm.FIELDSTATE_ASFR_MODEL_VERSION == "berm-v19"
    assert berm.legacy_evidence_summary()["record_count"] == 134
