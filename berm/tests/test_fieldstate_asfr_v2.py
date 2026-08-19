"""Tests for the isolated FieldState -> organ -> couple -> ASFR route."""

from __future__ import annotations

import math

import pytest

from berm.biology.reproductive_state import (
    ENDPOINT_CALIBRATED,
    STRUCTURAL_ONLY,
    BarrierState,
    CoupleReproductiveState,
    EndpointCapacityMapping,
    FemaleReproductiveState,
    MaleReproductiveState,
    OrganMemoryState,
    evolve_organ_memory,
    map_memory_to_capacity,
    mean_couple_capacity,
)
from berm.data.wpp import AGE_GROUPS
from berm.data.field_state import FieldStateObservation, validate_fieldstate_panel
from berm.outcomes.fieldstate_asfr import (
    AgeSpecificFieldStateInput,
    project_fieldstate_asfr,
)
from berm.model_fieldstate_asfr import MODEL_VERSION, project_wpp_fieldstate_asfr
from berm.physics.field_state import FieldState, ReceptorState, TransferMatrix
from berm.stats.fieldstate_core import (
    RegisteredOrganIncrement,
    evaluate_fieldstate_core,
)


def _couple(
    *,
    male_factor: float = 1.0,
    female_factor: float = 1.0,
    calibrated: bool = False,
) -> CoupleReproductiveState:
    status = ENDPOINT_CALIBRATED if calibrated else STRUCTURAL_ONLY
    male = MaleReproductiveState(
        sperm_output=male_factor,
        btb=BarrierState("BTB", calibration_status=status),
        calibration_status=status,
    )
    female = FemaleReproductiveState(
        ovarian_reserve=female_factor,
        placental_barrier_support=BarrierState("PLACENTA", calibration_status=status),
        calibration_status=status,
    )
    return CoupleReproductiveState(male, female, field_state_status="PARTIAL_FIELD_STATE")


def test_organ_memory_keeps_reversible_and_persistent_components_separate() -> None:
    initial = OrganMemoryState("BTB", reversible_load=2.0, persistent_load=5.0)

    updated = evolve_organ_memory(
        initial,
        reversible_increment=3.0,
        persistent_increment=4.0,
        reversible_retention=0.5,
        persistent_retention=0.8,
        parameter_ids=("btb_response_v1",),
        evidence_ids=("YU_2020_LOCAL_4G_BTB",),
    )

    assert updated.reversible_load == pytest.approx(4.0)
    assert updated.persistent_load == pytest.approx(8.0)
    assert updated.total_load == pytest.approx(12.0)
    assert updated.parameter_ids == ("btb_response_v1",)
    assert updated.evidence_ids == ("YU_2020_LOCAL_4G_BTB",)


def test_endpoint_capacity_mapping_is_explicit_and_not_a_hidden_tfr_slope() -> None:
    memory = OrganMemoryState("BTB", reversible_load=2.0, persistent_load=3.0)
    mapping = EndpointCapacityMapping(
        component="BTB_integrity",
        organ="BTB",
        beta_reversible=0.1,
        beta_persistent=0.2,
        floor=0.25,
        parameter_ids=("btb_capacity_mapping_v1",),
        evidence_ids=("YU_2020_LOCAL_4G_BTB",),
    )

    result = map_memory_to_capacity(memory, mapping)

    expected = 0.25 + 0.75 * math.exp(-(0.1 * 2.0 + 0.2 * 3.0))
    assert result.factor == pytest.approx(expected)
    assert result.reversible_burden == pytest.approx(0.2)
    assert result.persistent_burden == pytest.approx(0.6)
    assert result.calibration_status == STRUCTURAL_ONLY

    with pytest.raises(ValueError, match="does not match"):
        map_memory_to_capacity(memory, EndpointCapacityMapping(
            component="ovarian_reserve",
            organ="OVARY",
            beta_reversible=0.1,
            beta_persistent=0.2,
            parameter_ids=("ovary_capacity_mapping_v1",),
        ))


def test_btb_is_a_distinct_barrier_and_enters_only_male_state() -> None:
    bbb = BarrierState("BBB", tight_junction_integrity=0.5)
    btb = BarrierState("BTB", tight_junction_integrity=0.5)

    assert bbb.integrity == btb.integrity == 0.5
    with pytest.raises(ValueError, match="BTB"):
        MaleReproductiveState(btb=bbb)

    male = MaleReproductiveState(btb=btb)
    assert male.conception_capacity == pytest.approx(0.5)


def test_fieldstate_core_preserves_proxy_status_and_requires_registered_increment() -> None:
    state = FieldState.from_legacy_channels(ambient=2.0, personal=3.0, country="FIN", year=2023)
    prior = OrganMemoryState("BTB")
    increment = RegisteredOrganIncrement(
        organ="BTB",
        reversible_increment=0.2,
        persistent_increment=0.1,
        reversible_retention=0.5,
        parameter_ids=("btb_endpoint_mapping_placeholder",),
        evidence_ids=("YU_2020_LOCAL_4G_BTB",),
    )

    result = evaluate_fieldstate_core(
        state,
        ReceptorState("BTB"),
        previous_memory=prior,
        registered_increment=increment,
    )

    assert result.features.completeness_status == "LEGACY_TIMING_PROXY"
    assert result.organ_memory.field_state_status == "LEGACY_TIMING_PROXY"
    assert result.calibration_status == STRUCTURAL_ONLY
    assert result.features.legacy_timing_proxy == pytest.approx(
        2.0 + 2.0 / (1.0 + 2.0**2) ** 0.5 * 3.0
    )


def test_fieldstate_panel_requires_local_cohort_sex_setting_and_unique_time_key() -> None:
    state = FieldState(
        background=FieldState.from_legacy_channels(1.0, 1.0).background,
        ambient=FieldState.from_legacy_channels(1.0, 1.0).ambient,
        personal=FieldState.from_legacy_channels(1.0, 1.0).personal,
        normalization_id="measured_normalised_v1",
        country="FIN",
        area="UUSIMAA",
        setting="household",
        cohort_id="1998",
        biological_sex="MALE",
        life_stage="adult",
        year=2023,
        provenance={"source_id": "LOCAL_FIELD_PANEL", "calibration_id": "norm-v1"},
    )
    record = FieldStateObservation(
        observation_id="fin-hh-001",
        time_id="2023-03-01T22:00:00+02:00",
        state=state,
        receptor=ReceptorState("BTB"),
        transfer=TransferMatrix(transfer_id="testis_transfer_v1"),
        source_ids=("LOCAL_FIELD_PANEL",),
    )

    assert validate_fieldstate_panel((record,)) == (record,)
    with pytest.raises(ValueError, match="duplicate"):
        validate_fieldstate_panel((record, record))


def test_couple_aggregation_uses_paired_states_not_product_of_population_means() -> None:
    paired = (
        _couple(male_factor=0.5, female_factor=1.0),
        _couple(male_factor=1.0, female_factor=0.5),
    )

    # Each actual pair has 0.5 biological capacity.  Multiplying the two
    # population means would give 0.75 * 0.75 = 0.5625 instead.
    assert mean_couple_capacity(paired) == pytest.approx(0.5)


def test_asfr_projection_keeps_biology_demand_tempo_and_art_separate() -> None:
    reference = _couple()
    target = _couple(male_factor=0.8)
    inputs = tuple(
        AgeSpecificFieldStateInput(
            age_group=group,
            reference_asfr=100.0,
            reference_couple=reference,
            target_couple=target,
            reference_demand_opportunity=1.0,
            target_demand_opportunity=0.5,
            reference_tempo=1.0,
            target_tempo=1.2,
            reference_art_live_birth_delivery=1.0,
            target_art_live_birth_delivery=1.1,
            asfr_source_id="UN_WPP_2024_ASFR",
        )
        for group in AGE_GROUPS
    )

    projection = project_fieldstate_asfr(
        geography_id="FIN",
        year=2023,
        reference_year=2000,
        groups=inputs,
    )

    expected_ratio = 0.8 * 0.5 * 1.2 * 1.1
    assert projection.groups[0].biological_ratio == pytest.approx(0.8)
    assert projection.groups[0].demand_opportunity_ratio == pytest.approx(0.5)
    assert projection.groups[0].tempo_ratio == pytest.approx(1.2)
    assert projection.groups[0].art_live_birth_delivery_ratio == pytest.approx(1.1)
    assert projection.predicted_asfr == pytest.approx((100.0 * expected_ratio,) * 7)
    assert projection.predicted_tfr == pytest.approx(5.0 * 7 * 100.0 * expected_ratio / 1000.0)
    assert projection.calibration_status == STRUCTURAL_ONLY


def test_asfr_projection_requires_all_standard_age_groups_in_order() -> None:
    couple = _couple()
    groups = [AgeSpecificFieldStateInput(group, 10.0, couple, couple) for group in AGE_GROUPS[:-1]]

    with pytest.raises(ValueError, match="exactly"):
        project_fieldstate_asfr(
            geography_id="FIN", year=2023, reference_year=2000, groups=groups
        )


def test_calibrated_status_requires_both_partners_and_both_barriers() -> None:
    reference = _couple(calibrated=True)
    target = _couple(calibrated=True)
    groups = [AgeSpecificFieldStateInput(group, 10.0, reference, target) for group in AGE_GROUPS]

    result = project_fieldstate_asfr(
        geography_id="FIN", year=2023, reference_year=2000, groups=groups
    )

    assert result.calibration_status == ENDPOINT_CALIBRATED


def test_wpp_facade_uses_observed_reference_asfr_without_v16_exposure_curve() -> None:
    couple = _couple()
    by_age = {group: couple for group in AGE_GROUPS}

    result = project_wpp_fieldstate_asfr(
        geography_id="FIN",
        year=2023,
        reference_year=2023,
        reference_couples=by_age,
        target_couples=by_age,
    )

    assert result["route"] == MODEL_VERSION
    assert result["predicted_asfr"] == pytest.approx(result["reference_asfr"])
    assert result["calibration_status"] == STRUCTURAL_ONLY
    assert "national mobile subscriptions" in result["warnings"][0]
    assert result["legacy_evidence_migration"]["record_count"] == 129
    assert "demand/opportunity" in result["active_chain"]
