"""Evidence-first constraint ledger tests.

These tests protect the intended interpretation: active and source-qualified
evidence remains available as topology/direction/lag/susceptibility priors,
while retracted or seriously contested records remain auditable provenance and
never become hidden weights.
"""

from __future__ import annotations

from berm.evidence_constraints import (
    FieldStateMatchContext,
    constraints_for_match,
    constraints_for_node,
    evidence_constraint_summary,
    legacy_evidence_placements,
    load_active_evidence_constraints,
    load_evidence_constraints,
    load_evidence_source_profiles,
    load_legacy_source_qualifications,
    load_verified_legacy_constraints,
)
from berm.evidence_registry import load_fieldstate_evidence, load_legacy_evidence_migration


def test_every_canonical_active_source_has_a_positive_constraint_profile() -> None:
    sources = load_fieldstate_evidence()
    profiles = load_evidence_source_profiles()
    canonical_constraints = load_active_evidence_constraints()

    assert {profile.evidence_id for profile in profiles} == {source.id for source in sources}
    assert len(canonical_constraints) == sum(len(source.causal_nodes) for source in sources)
    assert all(item.expected_direction for item in canonical_constraints)
    assert all(item.receptor_transfer.field_features for item in canonical_constraints)


def test_verified_legacy_sources_are_active_broad_priors_not_a_discard_bin() -> None:
    qualifications = load_legacy_source_qualifications()
    constraints = load_verified_legacy_constraints()
    ids = {item.evidence_id for item in constraints}

    assert len(qualifications) >= 20
    assert "LEGACY_PALL_2013_VGCC_SYNTHESIS" in ids
    assert "LEGACY_ADAMS_2014_SPERM_META" in ids
    assert "LEGACY_AVENDANO_2012_WIFI_HUMAN_SPERM" in ids
    assert "LEGACY_ENGELS_2014_BIRD_NOISE" in ids
    assert "LEGACY_SEMPOU_2022_VMEM_DEVELOPMENT" in ids
    assert "LEGACY_THIELENS_2018_INSECT_RF_TRANSFER" in ids
    assert "LEGACY_MANTA_2014_DROSOPHILA_OVARIAN_ROS" in ids
    assert any(item.parameter_prior_tier == "DIRECT_ENDPOINT_PROTOCOL_PRIOR" for item in constraints)


def test_retracted_or_seriously_contested_sources_remain_provenance_without_weight() -> None:
    qualifications = {item.legacy_id: item for item in load_legacy_source_qualifications()}
    active_ids = {item.evidence_id for item in load_evidence_constraints()}

    assert qualifications["friedman2007"].model_placement == "PROVENANCE_ONLY_NOT_ACTIVE_WEIGHT"
    assert qualifications["diem2005"].model_placement == "PROVENANCE_ONLY_NOT_ACTIVE_WEIGHT"
    assert not any("FRIEDMAN" in identifier for identifier in active_ids)
    assert not any("DIEM" in identifier for identifier in active_ids)


def test_all_legacy_records_keep_a_source_by_source_placement() -> None:
    legacy = load_legacy_evidence_migration()
    placements = legacy_evidence_placements()
    summary = evidence_constraint_summary()

    # 129 frozen archive records plus 5 declared post-archive additions.
    assert len(legacy) == 134
    assert len(placements) == 134
    assert {item.legacy_id for item in placements} == {item.legacy_id for item in legacy}
    assert summary["legacy_record_count"] == 134
    assert summary["verified_legacy_source_count"] >= 19
    assert summary["active_constraint_count"] > summary["canonical_active_constraint_count"]
    assert "weakly-informative" in summary["prior_family_sensitivity"]


def test_node_query_exposes_direct_and_indirect_convergence() -> None:
    ca_ros = constraints_for_node("A_VGCC_ROS")
    sperm = constraints_for_node("MALE_SPERM")

    assert any(item.evidence_id == "LEGACY_PALL_2013_VGCC_SYNTHESIS" for item in ca_ros)
    assert any(item.evidence_id == "LEGACY_AVENDANO_2012_WIFI_HUMAN_SPERM" for item in sperm)
    assert any(item.evidence_id == "YU_2020_LOCAL_4G_BTB" for item in sperm)


def test_mobility_weighted_fieldstate_match_is_a_valid_uncertainty_context() -> None:
    match = FieldStateMatchContext(
        match_directness="MOBILITY_WEIGHTED_CATCHMENT",
        spatial_or_mobility_method="participant diary plus weighted home/work/school microenvironment model",
        spatial_uncertainty="coverage and dwell-time uncertainty retained in the likelihood",
        temporal_alignment="daily FieldState summaries aligned to endpoint-relevant windows",
        transfer_model_id="mobility-catchment-v1",
    )
    constraints = constraints_for_match(match, node_ids=("MALE_SPERM", "OVARIAN_RESERVE"))

    assert not match.requires_literal_same_site
    assert constraints
    assert {item.causal_node for item in constraints} <= {"MALE_SPERM", "OVARIAN_RESERVE"}
