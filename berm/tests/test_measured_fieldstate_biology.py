"""Direct tests for the locked measured FieldState--biology calibration panel.

The panel is intentionally a *quantitative calibration* contract.  These tests
do not downgrade the project's separately curated mechanistic or experimental
evidence when a study is not locally pairable; they enforce only the stricter
requirements needed before estimating a numerical FieldState-to-endpoint
response.
"""

from __future__ import annotations

from dataclasses import fields, replace
import json
from pathlib import Path

import pytest

from berm.data.field_state import FieldStateObservation
from berm.data.measured_fieldstate_biology import (
    BiologicalEndpointObservation,
    EndpointCalibrationLock,
    EndpointExposureRule,
    FieldStateBiologyPair,
    FieldStateMeasurementBinding,
    LockedMeasuredFieldStateBiologyPanel,
    SentinelHumanLeadLagLink,
    SpatialMatchGeometry,
    current_measured_fieldstate_biology_readiness,
    validate_endpoint_calibration_lock,
    validate_locked_measured_panel,
)
from berm.physics.field_state import (
    CircadianState,
    FieldState,
    ReceptorState,
    SourceCoupling,
    SpectralBin,
    TransferMatrix,
    Vector3,
)


SHA_A = "a" * 64
SHA_B = "b" * 64
SHA_C = "c" * 64


def _fieldstate_observation(
    observation_id: str,
    endpoint_join_id: str,
    *,
    site_id: str,
    time_id: str,
) -> FieldStateObservation:
    """Create one fully documented local FieldState fixture."""
    state = FieldState(
        background=Vector3(0.2, 0.1, 0.0),
        ambient=Vector3(0.3, 0.0, 0.1),
        personal=Vector3(0.1, 0.2, 0.0),
        normalization_id="measured_local_normalisation_v1",
        country="FRA",
        area=site_id,
        setting="clinic",
        cohort_id=observation_id,
        biological_sex="MALE",
        life_stage="ADULT",
        year=2021,
        geomagnetic_b0=Vector3(22.0, -3.0, 41.0),
        geomagnetic_b0_unit="uT",
        ambient_envelope_psd=(SpectralBin(0.03, 1.0, 0.01),),
        circadian=CircadianState(night_fraction=0.5, state_id="measured_clock_v1"),
        source_coupling=SourceCoupling(
            relative_phase_rad=0.25,
            coherence=0.8,
            coupling_id="measured_phase_v1",
        ),
        provenance={
            "source_id": "LOCAL_FIELD_ARTEFACT",
            "calibration_id": "normalisation_calibration_v1",
        },
    )
    return FieldStateObservation(
        observation_id=observation_id,
        time_id=time_id,
        state=state,
        receptor=ReceptorState("BTB", receptor_id="btb_receptor_v1"),
        transfer=TransferMatrix(transfer_id="testis_transfer_v1"),
        source_ids=("LOCAL_FIELD_ARTEFACT",),
        endpoint_join_id=endpoint_join_id,
    )


def _binding(
    observation_id: str,
    *,
    site_id: str,
    start: str,
    end: str,
) -> FieldStateMeasurementBinding:
    return FieldStateMeasurementBinding(
        binding_id=f"binding-{observation_id}",
        fieldstate_observation_id=observation_id,
        geography_id="FRA",
        site_id=site_id,
        target_node="BTB",
        biological_sex="MALE",
        life_stage="ADULT",
        window_start=start,
        window_end=end,
        time_window_rule_id="trailing_10_day_window_v1",
        measurement_geometry_id="clinic_local_geometry_v1",
        physical_artifact_sha256=SHA_A,
        source_manifest_sha256=SHA_B,
        coverage_fraction=0.95,
    )


def _endpoint(
    observation_id: str,
    endpoint_join_id: str,
    *,
    biology_role: str,
    endpoint_id: str,
    site_id: str,
    start: str,
    end: str,
) -> BiologicalEndpointObservation:
    return BiologicalEndpointObservation(
        observation_id=observation_id,
        endpoint_join_id=endpoint_join_id,
        biology_role=biology_role,  # type: ignore[arg-type] -- fixtures cover legal roles.
        organism_id="Canis_lupus_familiaris" if biology_role == "SENTINEL" else "Homo_sapiens",
        target_node="BTB",
        endpoint_id=endpoint_id,
        endpoint_layer="SENTINEL_REPRODUCTIVE" if biology_role == "SENTINEL" else "GAMETE",
        biological_sex="MALE",
        life_stage="ADULT",
        geography_id="FRA",
        site_id=site_id,
        window_start=start,
        window_end=end,
        value=0.72,
        unit="proportion",
        assay_id="casa_v1",
        endpoint_statistic="mean",
        source_ids=("BIOLOGY_ASSAY_RELEASE",),
        manifest_sha256=SHA_C,
        sample_size=24,
        covariate_asset_ids=("temperature_panel_v1",),
        uncertainty_lower=0.65,
        uncertainty_upper=0.80,
        provenance={"assay_protocol_id": "casa_protocol_v1"},
    )


def _pair(
    pair_id: str,
    observation_id: str,
    endpoint_observation_id: str,
    endpoint_join_id: str,
    *,
    site_id: str,
    rule_id: str,
) -> FieldStateBiologyPair:
    return FieldStateBiologyPair(
        pair_id=pair_id,
        endpoint_join_id=endpoint_join_id,
        fieldstate_observation_id=observation_id,
        biological_observation_id=endpoint_observation_id,
        geography_id="FRA",
        site_id=site_id,
        endpoint_exposure_rule_id=rule_id,
        site_crosswalk_id=f"crosswalk-{site_id}",
        site_crosswalk_sha256=SHA_B,
        confounder_asset_ids=("temperature_panel_v1",),
    )


def _transfer_geometry(match_level: str) -> SpatialMatchGeometry:
    """A deliberately low-weight but fully declared non-exact spatial route."""
    common: dict[str, object] = {
        "geometry_id": f"geometry-{match_level.lower()}",
        "match_level": match_level,
        "source_record_role": "FIELDSTATE",
        "source_record_id": "fieldstate-human-training",
        "target_record_role": "BIOLOGICAL",
        "target_record_id": "endpoint-human-training",
        "source_geography_id": "FRA",
        "source_site_id": "FRA-SITE-A",
        "target_geography_id": "FRA",
        "target_site_id": "FRA-SITE-B",
        "crosswalk_id": "spatial-transfer-v1",
        "crosswalk_sha256": SHA_B,
        "distance_metric_id": "population_weighted_network_distance_v1",
        "distance_estimate_m": 12_000.0,
        "distance_uncertainty_lower_m": 4_000.0,
        "distance_uncertainty_upper_m": 30_000.0,
        "temporal_alignment_rule_id": "trailing_10_day_window_v1",
        "temporal_uncertainty_days": 2.5,
        "spatial_uncertainty_method_id": "bootstrap_crosswalk_v1",
    }
    if match_level == "MOBILITY_WEIGHTED_CATCHMENT":
        common.update(
            mobility_kernel_id="daily_mobility_kernel_v1",
            mobility_kernel_sha256=SHA_C,
            # No arbitrary adequacy threshold is imposed: the low effective
            # support is retained as a quantified uncertainty input.
            weight_sum=0.01,
            effective_sample_size=0.1,
        )
    elif match_level == "LOCAL_AREA_ESTIMATE":
        common.update(
            local_area_estimator_id="local_area_kriging_v1",
            local_area_estimator_sha256=SHA_C,
        )
    return SpatialMatchGeometry(**common)  # type: ignore[arg-type] -- exact dataclass keys above.


def _exact_geometry(
    geometry_id: str,
    *,
    source_record_role: str,
    source_record_id: str,
    target_record_role: str,
    target_record_id: str,
    site_id: str,
) -> SpatialMatchGeometry:
    return SpatialMatchGeometry(
        geometry_id=geometry_id,
        match_level="EXACT_SITE",
        source_record_role=source_record_role,  # type: ignore[arg-type]
        source_record_id=source_record_id,
        target_record_role=target_record_role,  # type: ignore[arg-type]
        target_record_id=target_record_id,
        source_geography_id="FRA",
        source_site_id=site_id,
        target_geography_id="FRA",
        target_site_id=site_id,
        crosswalk_id=f"crosswalk-{site_id}",
        crosswalk_sha256=SHA_B,
        distance_metric_id="declared_same_site_reference_v1",
        distance_estimate_m=0.0,
        distance_uncertainty_lower_m=0.0,
        distance_uncertainty_upper_m=0.0,
        temporal_alignment_rule_id="trailing_10_day_window_v1",
        temporal_uncertainty_days=0.0,
        spatial_uncertainty_method_id="declared_identity_crosswalk_v1",
    )


def _make_panel(
    *,
    fieldstates: tuple[FieldStateObservation, ...],
    bindings: tuple[FieldStateMeasurementBinding, ...],
    endpoints: tuple[BiologicalEndpointObservation, ...],
    rules: tuple[EndpointExposureRule, ...],
    links: tuple[SentinelHumanLeadLagLink, ...],
    pairs: tuple[FieldStateBiologyPair, ...],
    geometries: tuple[SpatialMatchGeometry, ...] = (),
    panel_id: str = "measured-panel-fixture-v1",
    protocol_id: str = "fieldstate-biology-fixture-v1",
    frozen_at: str = "2021-12-31T00:00:00+00:00",
) -> LockedMeasuredFieldStateBiologyPanel:
    manifest_sha256 = LockedMeasuredFieldStateBiologyPanel.calculate_manifest_sha256(
        panel_id=panel_id,
        protocol_id=protocol_id,
        frozen_at=frozen_at,
        fieldstate_observations=fieldstates,
        fieldstate_measurement_bindings=bindings,
        biological_observations=endpoints,
        endpoint_exposure_rules=rules,
        sentinel_human_lead_lag_links=links,
        pairs=pairs,
        match_geometries=geometries,
    )
    return LockedMeasuredFieldStateBiologyPanel(
        panel_id=panel_id,
        protocol_id=protocol_id,
        manifest_sha256=manifest_sha256,
        frozen_at=frozen_at,
        fieldstate_observations=fieldstates,
        fieldstate_measurement_bindings=bindings,
        biological_observations=endpoints,
        endpoint_exposure_rules=rules,
        sentinel_human_lead_lag_links=links,
        pairs=pairs,
        match_geometries=geometries,
    )


def _valid_panel() -> LockedMeasuredFieldStateBiologyPanel:
    sentinel_fieldstate = _fieldstate_observation(
        "fieldstate-sentinel",
        "join-sentinel",
        site_id="FRA-SITE-A",
        time_id="2021-01-10T00:00:00+00:00",
    )
    human_training_fieldstate = _fieldstate_observation(
        "fieldstate-human-training",
        "join-human-training",
        site_id="FRA-SITE-A",
        time_id="2021-01-20T00:00:00+00:00",
    )
    human_holdout_fieldstate = _fieldstate_observation(
        "fieldstate-human-holdout",
        "join-human-holdout",
        site_id="FRA-SITE-B",
        time_id="2021-02-10T00:00:00+00:00",
    )
    fieldstates = (
        sentinel_fieldstate,
        human_training_fieldstate,
        human_holdout_fieldstate,
    )
    bindings = (
        _binding(
            sentinel_fieldstate.observation_id,
            site_id="FRA-SITE-A",
            start="2021-01-01T00:00:00+00:00",
            end="2021-01-10T00:00:00+00:00",
        ),
        _binding(
            human_training_fieldstate.observation_id,
            site_id="FRA-SITE-A",
            start="2021-01-11T00:00:00+00:00",
            end="2021-01-20T00:00:00+00:00",
        ),
        _binding(
            human_holdout_fieldstate.observation_id,
            site_id="FRA-SITE-B",
            start="2021-02-01T00:00:00+00:00",
            end="2021-02-10T00:00:00+00:00",
        ),
    )
    sentinel_endpoint = _endpoint(
        "endpoint-sentinel",
        "join-sentinel",
        biology_role="SENTINEL",
        endpoint_id="dog_sperm_motility",
        site_id="FRA-SITE-A",
        start="2021-01-15T00:00:00+00:00",
        end="2021-01-16T00:00:00+00:00",
    )
    human_training_endpoint = _endpoint(
        "endpoint-human-training",
        "join-human-training",
        biology_role="HUMAN",
        endpoint_id="human_sperm_motility",
        site_id="FRA-SITE-A",
        start="2021-01-25T00:00:00+00:00",
        end="2021-01-26T00:00:00+00:00",
    )
    human_holdout_endpoint = _endpoint(
        "endpoint-human-holdout",
        "join-human-holdout",
        biology_role="HUMAN",
        endpoint_id="human_sperm_motility",
        site_id="FRA-SITE-B",
        start="2021-02-15T00:00:00+00:00",
        end="2021-02-16T00:00:00+00:00",
    )
    endpoints = (sentinel_endpoint, human_training_endpoint, human_holdout_endpoint)
    rules = (
        EndpointExposureRule(
            rule_id="rule-sentinel",
            biology_role="SENTINEL",
            endpoint_id="dog_sperm_motility",
            target_node="BTB",
            minimum_lag_days=3,
            maximum_lag_days=7,
            accumulation_rule_id="trailing_window_mean_v1",
            biological_basis_asset_ids=("dog_spermatogenesis_basis_v1",),
        ),
        EndpointExposureRule(
            rule_id="rule-human",
            biology_role="HUMAN",
            endpoint_id="human_sperm_motility",
            target_node="BTB",
            minimum_lag_days=3,
            maximum_lag_days=7,
            accumulation_rule_id="trailing_window_mean_v1",
            biological_basis_asset_ids=("human_spermatogenesis_basis_v1",),
        ),
    )
    links = (
        SentinelHumanLeadLagLink(
            link_id="dog-to-human-sperm-lead-v1",
            sentinel_endpoint_id="dog_sperm_motility",
            human_endpoint_id="human_sperm_motility",
            target_node="BTB",
            minimum_lead_days=7,
            maximum_lead_days=35,
            biological_basis_asset_ids=("comparative_reproduction_basis_v1",),
            match_geometry_ids=("geometry-link-training", "geometry-link-holdout"),
        ),
    )
    pairs = (
        _pair(
            "pair-sentinel",
            sentinel_fieldstate.observation_id,
            sentinel_endpoint.observation_id,
            sentinel_endpoint.endpoint_join_id,
            site_id="FRA-SITE-A",
            rule_id="rule-sentinel",
        ),
        _pair(
            "pair-human-training",
            human_training_fieldstate.observation_id,
            human_training_endpoint.observation_id,
            human_training_endpoint.endpoint_join_id,
            site_id="FRA-SITE-A",
            rule_id="rule-human",
        ),
        _pair(
            "pair-human-holdout",
            human_holdout_fieldstate.observation_id,
            human_holdout_endpoint.observation_id,
            human_holdout_endpoint.endpoint_join_id,
            site_id="FRA-SITE-B",
            rule_id="rule-human",
        ),
    )
    link_holdout_geometry = SpatialMatchGeometry(
        geometry_id="geometry-link-holdout",
        match_level="LOCAL_AREA_ESTIMATE",
        source_record_role="BIOLOGICAL",
        source_record_id=sentinel_endpoint.observation_id,
        target_record_role="BIOLOGICAL",
        target_record_id=human_holdout_endpoint.observation_id,
        source_geography_id="FRA",
        source_site_id="FRA-SITE-A",
        target_geography_id="FRA",
        target_site_id="FRA-SITE-B",
        crosswalk_id="local-area-link-v1",
        crosswalk_sha256=SHA_B,
        distance_metric_id="administrative_area_centroid_distance_v1",
        distance_estimate_m=12_000.0,
        distance_uncertainty_lower_m=4_000.0,
        distance_uncertainty_upper_m=30_000.0,
        temporal_alignment_rule_id="sentinel_human_lead_window_v1",
        temporal_uncertainty_days=2.0,
        spatial_uncertainty_method_id="local_area_estimator_bootstrap_v1",
        local_area_estimator_id="local_area_kriging_v1",
        local_area_estimator_sha256=SHA_C,
    )
    geometries = (
        _exact_geometry(
            "geometry-pair-sentinel",
            source_record_role="FIELDSTATE",
            source_record_id=sentinel_fieldstate.observation_id,
            target_record_role="BIOLOGICAL",
            target_record_id=sentinel_endpoint.observation_id,
            site_id="FRA-SITE-A",
        ),
        _exact_geometry(
            "geometry-pair-human-training",
            source_record_role="FIELDSTATE",
            source_record_id=human_training_fieldstate.observation_id,
            target_record_role="BIOLOGICAL",
            target_record_id=human_training_endpoint.observation_id,
            site_id="FRA-SITE-A",
        ),
        _exact_geometry(
            "geometry-pair-human-holdout",
            source_record_role="FIELDSTATE",
            source_record_id=human_holdout_fieldstate.observation_id,
            target_record_role="BIOLOGICAL",
            target_record_id=human_holdout_endpoint.observation_id,
            site_id="FRA-SITE-B",
        ),
        _exact_geometry(
            "geometry-link-training",
            source_record_role="BIOLOGICAL",
            source_record_id=sentinel_endpoint.observation_id,
            target_record_role="BIOLOGICAL",
            target_record_id=human_training_endpoint.observation_id,
            site_id="FRA-SITE-A",
        ),
        link_holdout_geometry,
    )
    pairs = tuple(
        replace(pair, match_geometry_id=f"geometry-{pair.pair_id}")
        for pair in pairs
    )
    return _make_panel(
        fieldstates=fieldstates,
        bindings=bindings,
        endpoints=endpoints,
        rules=rules,
        links=links,
        pairs=pairs,
        geometries=geometries,
    )


def _relocked(panel: LockedMeasuredFieldStateBiologyPanel, **overrides: object) -> LockedMeasuredFieldStateBiologyPanel:
    values: dict[str, object] = {
        "fieldstates": panel.fieldstate_observations,
        "bindings": panel.fieldstate_measurement_bindings,
        "endpoints": panel.biological_observations,
        "rules": panel.endpoint_exposure_rules,
        "links": panel.sentinel_human_lead_lag_links,
        "pairs": panel.pairs,
        "geometries": panel.match_geometries,
        "panel_id": panel.panel_id,
        "protocol_id": panel.protocol_id,
        "frozen_at": panel.frozen_at,
    }
    values.update(overrides)
    return _make_panel(**values)  # type: ignore[arg-type] -- test helper supplies exact keys.


def _endpoint_lock(panel: LockedMeasuredFieldStateBiologyPanel, **overrides: object) -> EndpointCalibrationLock:
    values: dict[str, object] = {
        "lock_id": "human-endpoint-lock-v1",
        "panel_id": panel.panel_id,
        "panel_manifest_sha256": panel.manifest_sha256,
        "target_node": "BTB",
        "biology_role": "HUMAN",
        "endpoint_id": "human_sperm_motility",
        "feature_ids": ("selected_vector_magnitude", "coherent_cross_term"),
        "parameter_ids": ("fieldstate_scale", "human_endpoint_slope"),
        "scale_anchor_parameter_id": "fieldstate_scale",
        "training_pair_ids": ("pair-human-training",),
        "temporal_holdout_pair_ids": ("pair-human-holdout",),
        "geographic_holdout_site_ids": ("FRA-SITE-B",),
        "response_model_id": "endpoint_response_linear_v1",
        "response_model_spec_sha256": SHA_C,
        "locked_at": "2022-01-15T00:00:00+00:00",
    }
    values.update(overrides)
    return EndpointCalibrationLock(**values)  # type: ignore[arg-type] -- fixture keys mirror the dataclass.


def _codes(items: object) -> set[str]:
    return {item.code for item in items}  # type: ignore[union-attr]


def test_exact_measured_sentinel_human_panel_and_preoutcome_lock_are_ready() -> None:
    panel = _valid_panel()
    lock = _endpoint_lock(panel)

    readiness = validate_locked_measured_panel(panel)

    assert readiness.structural_evidence_status == "ACTIVE"
    assert readiness.quantitative_calibration_status == "READY_FOR_ENDPOINT_CALIBRATION"
    assert readiness.violations == ()
    assert set(readiness.ready_pair_ids) == {
        "pair-sentinel",
        "pair-human-training",
        "pair-human-holdout",
    }
    assert validate_endpoint_calibration_lock(panel, lock) == ()


@pytest.mark.parametrize(
    "match_level",
    ("MOBILITY_WEIGHTED_CATCHMENT", "LOCAL_AREA_ESTIMATE"),
)
def test_declared_spatial_transfer_tiers_allow_nonexact_endpoint_linkage(
    match_level: str,
) -> None:
    panel = _valid_panel()
    geometry = _transfer_geometry(match_level)
    endpoints = tuple(
        replace(endpoint, site_id="FRA-SITE-B")
        if endpoint.observation_id == "endpoint-human-training"
        else endpoint
        for endpoint in panel.biological_observations
    )
    pairs = tuple(
        replace(
            pair,
            site_id="FRA-SITE-B",
            site_crosswalk_id="spatial-transfer-v1",
            match_geometry_id=geometry.geometry_id,
        )
        if pair.pair_id == "pair-human-training"
        else pair
        for pair in panel.pairs
    )
    transferred = _relocked(
        panel,
        endpoints=endpoints,
        pairs=pairs,
        geometries=tuple(
            item
            for item in panel.match_geometries
            if item.geometry_id != "geometry-pair-human-training"
        )
        + (geometry,),
        links=tuple(
            replace(link, match_geometry_ids=())
            for link in panel.sentinel_human_lead_lag_links
        ),
    )

    readiness = validate_locked_measured_panel(transferred)

    assert readiness.quantitative_calibration_status == "READY_FOR_ENDPOINT_CALIBRATION"
    assert readiness.violations == ()
    assert geometry.distance_uncertainty_upper_m == 30_000.0
    if match_level == "MOBILITY_WEIGHTED_CATCHMENT":
        assert geometry.effective_sample_size == 0.1
    else:
        assert geometry.local_area_estimator_id == "local_area_kriging_v1"


def test_mobility_route_requires_a_declared_kernel_not_a_nearby_probe_shortcut() -> None:
    with pytest.raises(ValueError, match="requires a mobility kernel"):
        SpatialMatchGeometry(
            geometry_id="missing-kernel",
            match_level="MOBILITY_WEIGHTED_CATCHMENT",
            source_record_role="FIELDSTATE",
            source_record_id="fieldstate-human-training",
            target_record_role="BIOLOGICAL",
            target_record_id="endpoint-human-training",
            source_geography_id="FRA",
            source_site_id="FRA-SITE-A",
            target_geography_id="FRA",
            target_site_id="FRA-SITE-B",
            crosswalk_id="spatial-transfer-v1",
            crosswalk_sha256=SHA_B,
            distance_metric_id="population_weighted_network_distance_v1",
            distance_estimate_m=12_000.0,
            distance_uncertainty_lower_m=4_000.0,
            distance_uncertainty_upper_m=30_000.0,
            temporal_alignment_rule_id="trailing_10_day_window_v1",
            temporal_uncertainty_days=2.5,
            spatial_uncertainty_method_id="bootstrap_crosswalk_v1",
        )


def test_binding_is_the_authoritative_exact_site_and_physical_artifact_lock() -> None:
    panel = _valid_panel()
    changed_bindings = tuple(
        replace(binding, site_id="FRA-SITE-X", physical_artifact_sha256=SHA_C)
        if binding.fieldstate_observation_id == "fieldstate-human-training"
        else binding
        for binding in panel.fieldstate_measurement_bindings
    )
    changed = _relocked(panel, bindings=changed_bindings)

    codes = _codes(validate_locked_measured_panel(changed).violations)

    assert "EXACT_SITE_MISMATCH" in codes
    # The actual panel content has changed, so a new canonical manifest is
    # required rather than silently reusing the earlier lock label.
    assert changed.manifest_sha256 != panel.manifest_sha256


def test_endpoint_rule_and_sentinel_lead_are_checked_before_any_demographic_step() -> None:
    panel = _valid_panel()
    changed_pairs = tuple(
        replace(pair, endpoint_exposure_rule_id="rule-sentinel")
        if pair.pair_id == "pair-human-training"
        else pair
        for pair in panel.pairs
    )
    changed_links = (
        replace(panel.sentinel_human_lead_lag_links[0], maximum_lead_days=8),
    )
    changed = _relocked(panel, pairs=changed_pairs, links=changed_links)

    codes = _codes(validate_locked_measured_panel(changed).violations)

    assert "ENDPOINT_EXPOSURE_RULE_MISMATCH" in codes
    assert "SENTINEL_HUMAN_LEAD_LAG_NOT_OBSERVED" in codes


def test_calibration_lock_binds_canonical_panel_and_populated_holdouts() -> None:
    panel = _valid_panel()
    mismatched_manifest = _endpoint_lock(panel, panel_manifest_sha256=SHA_A)
    missing_holdout = _endpoint_lock(panel, geographic_holdout_site_ids=("FRA-SITE-X",))

    assert "LOCK_PANEL_MANIFEST_MISMATCH" in _codes(
        validate_endpoint_calibration_lock(panel, mismatched_manifest)
    )
    missing_codes = _codes(validate_endpoint_calibration_lock(panel, missing_holdout))
    assert "UNKNOWN_GEOGRAPHIC_HOLDOUT_SITE" in missing_codes
    assert "GEOGRAPHIC_HOLDOUT_NOT_POPULATED" in missing_codes


def test_pending_quantitative_calibration_does_not_deactivate_structural_evidence() -> None:
    readiness = current_measured_fieldstate_biology_readiness()

    assert readiness.structural_evidence_status == "ACTIVE"
    assert readiness.quantitative_calibration_status == "PENDING_MATCHED_CALIBRATION"
    assert readiness.status == "PENDING_MATCHED_CALIBRATION"
    assert {
        "ANFR_AMBIENT_ONLY",
        "NO_LOCKED_SPATIOTEMPORAL_BIOLOGY_PANEL",
        "NO_SENTINEL_HUMAN_CHAIN",
    } == _codes(readiness.violations)


def test_external_schema_exposes_only_the_preoutcome_calibration_surface() -> None:
    root = Path(__file__).resolve().parents[1]
    schema = json.loads(
        (root / "data" / "schemas" / "measured_fieldstate_biology_panel.schema.json").read_text(
            encoding="utf-8"
        )
    )
    required = set(schema["required"])
    forbidden = {
        "asfr",
        "tfr",
        "demand",
        "tempo",
        "parity",
        "migration",
        "art",
    }
    lock_properties = schema["$defs"]["endpointCalibrationLock"]["properties"]
    binding_required = set(schema["$defs"]["fieldstateMeasurementBinding"]["required"])
    spatial_geometry = schema["$defs"]["spatialMatchGeometry"]
    module_lock_fields = {item.name for item in fields(EndpointCalibrationLock)}

    assert schema["properties"]["upstream_lock_status"]["const"] == (
        "LOCKED_BEFORE_DEMOGRAPHIC_UNBLINDING"
    )
    assert {
        "fieldstate_measurement_bindings",
        "match_geometries",
        "endpoint_exposure_rules",
        "sentinel_human_lead_lag_links",
        "endpoint_calibration_locks",
    } <= required
    assert {
        "physical_artifact_sha256",
        "source_manifest_sha256",
        "measurement_geometry_id",
        "coverage_fraction",
    } <= binding_required
    assert spatial_geometry["properties"]["match_level"]["enum"] == [
        "EXACT_SITE",
        "MOBILITY_WEIGHTED_CATCHMENT",
        "LOCAL_AREA_ESTIMATE",
    ]
    assert {
        "crosswalk_sha256",
        "distance_uncertainty_lower_m",
        "distance_uncertainty_upper_m",
        "temporal_uncertainty_days",
        "spatial_uncertainty_method_id",
    } <= set(spatial_geometry["required"])
    assert schema["additionalProperties"] is False
    assert schema["$defs"]["endpointCalibrationLock"]["additionalProperties"] is False
    assert forbidden.isdisjoint(schema["properties"])
    assert forbidden.isdisjoint(lock_properties)
    assert forbidden.isdisjoint(module_lock_fields)
    assert set(schema["$defs"]["upstreamIdentifier"]["allOf"][1]["not"]["enum"]) == {
        "fertility_asfr_region_age_year",
        "fertility_tfr_region_year",
        "fertility_parity_progression",
        "culture_demand_age_country_year",
        "migration_generation_fertility",
        "art_outcomes_age_year",
    }
