"""Tests for the fail-closed sentinel-leading hindcast protocol."""

from __future__ import annotations

import json
from pathlib import Path

from berm.validation.sentinel_hindcast_protocol import (
    GeoTemporalMatch,
    InputAsset,
    LeadLagRule,
    MEASUREMENT_READY_FIELD_STATE,
    ParameterFamily,
    SentinelHindcastPlan,
    current_sentinel_hindcast_readiness,
    validate_sentinel_hindcast_plan,
)


SHA = "a" * 64


def _asset(
    asset_id: str,
    table: str,
    role: str,
    *,
    start: int = 2010,
    end: int = 2018,
    geography: tuple[str, ...] = ("FRA-X",),
    fieldstate_status: str | None = None,
) -> InputAsset:
    return InputAsset(
        asset_id=asset_id,
        table=table,
        role=role,  # type: ignore[arg-type] -- fixture covers declared roles.
        source_ids=(f"SOURCE_{asset_id.upper()}",),
        manifest_sha256=SHA,
        geography_ids=geography,
        start_year=start,
        end_year=end,
        measurement_type="OBSERVED",
        fieldstate_status=fieldstate_status,
    )


def _assets() -> tuple[InputAsset, ...]:
    return (
        _asset(
            "fieldstate",
            "fieldstate_observation",
            "FIELDSTATE",
            fieldstate_status=MEASUREMENT_READY_FIELD_STATE,
        ),
        _asset("sentinel", "sentinel_species_region_year", "SENTINEL_ENDPOINT"),
        _asset("human", "biomarker_cohort", "HUMAN_BIOMARKER"),
        _asset("confounders", "exposure_ambient_region_year", "CONFOUNDER"),
        _asset("demand", "culture_demand_age_country_year", "DEMOGRAPHIC_BASELINE", end=2020),
        _asset(
            "tfr",
            "fertility_tfr_region_year",
            "TARGET_DEMOGRAPHIC_OUTCOME",
            start=2021,
            end=2023,
        ),
    )


def _plan(**overrides) -> SentinelHindcastPlan:
    values = {
        "protocol_id": "fixture-v1",
        "calibration_end_year": 2018,
        "lock_year": 2019,
        "forecast_origin_year": 2020,
        "target_start_year": 2021,
        "target_end_year": 2023,
        "upstream_asset_ids": ("fieldstate", "sentinel", "human", "confounders"),
        "demographic_baseline_asset_ids": ("demand",),
        "target_outcome_asset_id": "tfr",
        "parameter_families": (
            ParameterFamily(
                family_id="btb-response",
                target_node="BARRIER_BTB",
                parameter_ids=("fieldstate_scale", "btb_slope", "btb_retention"),
                scale_anchor_parameter_id="fieldstate_scale",
                calibration_asset_ids=("fieldstate", "sentinel", "human"),
            ),
        ),
        "lead_lag_rules": (
            LeadLagRule(
                lag_id="dog-sperm-to-human-sperm",
                sentinel_endpoint="dog_progressive_motility",
                human_endpoint="human_sperm_dna_fragmentation",
                minimum_lead_years=1.0,
                maximum_lead_years=3.0,
                biological_basis_asset_ids=("sentinel", "human"),
                calibration_target="HUMAN_BIOLOGICAL_ENDPOINT",
                locked_before_outcome_unblinding=True,
            ),
        ),
        "matches": (
            GeoTemporalMatch(
                match_id="fra-x-2010-2018",
                geography_id="FRA-X",
                start_year=2010,
                end_year=2018,
                match_level="PREDEFINED_CATCHMENT",
                fieldstate_asset_id="fieldstate",
                sentinel_asset_id="sentinel",
                human_biomarker_asset_id="human",
                confounder_asset_ids=("confounders",),
                geography_crosswalk_id="fra-x-catchment-v1",
                time_window_rule_id="quarterly-trailing-90d-v1",
                endpoint_definition_id="sperm-panel-v1",
            ),
        ),
        "calibration_geography_ids": ("FRA-X",),
        "geographic_holdout_ids": ("FRA-Y",),
    }
    values.update(overrides)
    return SentinelHindcastPlan(**values)


def _codes(plan: SentinelHindcastPlan, assets: tuple[InputAsset, ...] | None = None) -> set[str]:
    return {item.code for item in validate_sentinel_hindcast_plan(plan, assets or _assets())}


def test_valid_plan_locks_upstream_biology_before_tfr_evaluation() -> None:
    assert validate_sentinel_hindcast_plan(_plan(), _assets()) == ()


def test_upstream_fit_rejects_asfr_tfr_and_demographic_residual_inputs() -> None:
    plan = _plan(upstream_asset_ids=("fieldstate", "sentinel", "human", "confounders", "tfr", "demand"))
    codes = _codes(plan)

    assert "UPSTREAM_DEMOGRAPHIC_OUTCOME_FORBIDDEN" in codes
    assert "TARGET_OUTCOME_LEAKS_UPSTREAM" in codes


def test_match_requires_measurement_ready_fieldstate_not_ambient_only_layer() -> None:
    changed = list(_assets())
    changed[0] = _asset(
        "fieldstate",
        "measured_rf_site_time",
        "FIELDSTATE",
        fieldstate_status="MEASURED_AMBIENT_RF_NOT_JOINED_TO_BIOLOGY",
    )

    assert "FIELDSTATE_NOT_MEASUREMENT_READY" in _codes(_plan(), tuple(changed))


def test_lag_cannot_be_selected_from_tfr_or_left_unlocked() -> None:
    invalid_lag = LeadLagRule(
        lag_id="invalid",
        sentinel_endpoint="dog_progressive_motility",
        human_endpoint="human_sperm_dna_fragmentation",
        minimum_lead_years=1.0,
        maximum_lead_years=3.0,
        biological_basis_asset_ids=("sentinel", "human"),
        calibration_target="TFR",
        locked_before_outcome_unblinding=False,
    )
    codes = _codes(_plan(lead_lag_rules=(invalid_lag,)))

    assert "LAG_CALIBRATED_TO_DEMOGRAPHIC_OUTCOME" in codes
    assert "LAG_NOT_LOCKED_BEFORE_OUTCOME_UNBLINDING" in codes


def test_match_rejects_a_nonshared_geography_or_time_window() -> None:
    changed = list(_assets())
    changed[2] = _asset("human", "biomarker_cohort", "HUMAN_BIOMARKER", geography=("FRA-Y",))

    assert "GEOGRAPHY_NOT_SHARED_BY_MATCHED_ASSETS" in _codes(_plan(), tuple(changed))


def test_match_cannot_smuggle_a_biological_asset_outside_upstream_lock() -> None:
    plan = _plan(upstream_asset_ids=("fieldstate", "sentinel", "confounders"))

    assert "MATCH_USES_NON_UPSTREAM_ASSET" in _codes(plan)


def test_current_repository_readiness_is_explicitly_blocked() -> None:
    readiness = current_sentinel_hindcast_readiness()

    assert readiness.status == "BLOCKED"
    assert {item.code for item in readiness.blockers} == {
        "G3_MATCHED_RF_BIOLOGY_ABSENT",
        "G5_MULTIREGION_SENTINEL_ABSENT",
        "G7_OBSERVED_HUMAN_BIOMARKER_ABSENT",
        "G8_MATCHED_SUBNATIONAL_OUTCOME_ABSENT",
        "G4_PARITY_TEMPO_SEPARATION_ABSENT",
    }
    assert len(readiness.required_outputs) == 4


def test_external_schema_exposes_lock_and_biological_lag_contract() -> None:
    root = Path(__file__).resolve().parents[1]
    schema_path = root / "data" / "schemas" / "sentinel_hindcast_protocol.schema.json"
    schema = json.loads(schema_path.read_text(encoding="utf-8"))

    assert schema["properties"]["version"]["const"] == "sentinel-hindcast-protocol-v1"
    assert "forecast_origin_year" in schema["required"]
    assert schema["$defs"]["lagRule"]["properties"]["calibration_target"]["const"] == "HUMAN_BIOLOGICAL_ENDPOINT"
