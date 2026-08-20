"""Tests for discovery-first Bayesian evidence use in the BERM v2 route."""

from __future__ import annotations

import pytest

from berm.validation.evidence_constrained_hindcast import (
    FieldStateContrast,
    MobilityWeightedFieldState,
    default_evidence_constrained_hindcast_specification,
    evaluate_historical_signatures,
    evidence_constrained_hindcast_summary,
    predict_cross_species_direction,
    validate_evidence_constrained_hindcast_spec,
)


def _fieldstate(
    distribution_id: str,
    *,
    mean: float,
    lower: float,
    upper: float,
    start_year: int,
) -> MobilityWeightedFieldState:
    return MobilityWeightedFieldState(
        distribution_id=distribution_id,
        geography_id="FRA-TEST",
        population_or_species_id="test-population",
        target_node="MALE_SPERM",
        feature_id="selected_vector_magnitude",
        start_year=start_year,
        end_year=start_year,
        mean=mean,
        lower=lower,
        upper=upper,
        spatial_coverage_fraction=0.7,
        temporal_coverage_fraction=0.8,
        mobility_model_id="home-work-catchment-v1",
        geometry_transfer_model_id="organ-transfer-v1",
        source_ids=("ANFR_MEASURED_RF",),
        uncertainty_components=("mobility", "geometry", "sampling"),
        measurement_status="PARTIAL_MEASURED_FIELDSTATE",
    )


def test_active_evidence_is_used_for_topology_direction_lag_and_priors() -> None:
    specification = default_evidence_constrained_hindcast_specification()
    summary = evidence_constrained_hindcast_summary(specification)

    assert validate_evidence_constrained_hindcast_spec(specification) == ()
    assert summary["active_structural_paths"] == 5
    assert summary["active_directional_lag_priors"] == 5
    assert summary["active_calibration_families"] == 5
    assert summary["active_cross_species_signatures"] == 2
    assert summary["active_evidence_record_count"] >= 20
    assert "partial local FieldState+endpoint" in str(summary["calibration_ladder"])


def test_prior_sensitivity_has_no_hidden_zero_prior_and_keeps_all_four_views() -> None:
    specification = default_evidence_constrained_hindcast_specification()

    for family in specification.calibration_families:
        assert {variant.evidence_weighting for variant in family.prior_variants} == {
            "MECHANISM_WEIGHTED",
            "ANIMAL_ENDPOINT_WEIGHTED",
            "HUMAN_ENDPOINT_WEIGHTED",
            "WEAKLY_INFORMATIVE",
        }
        assert not any(variant.point_mass_at_zero for variant in family.prior_variants)
        assert set(family.forbidden_outcome_tables) >= {
            "fertility_asfr_region_age_year",
            "fertility_tfr_region_year",
        }


def test_mobility_weighted_cross_species_prediction_has_explicit_uncertainty() -> None:
    specification = default_evidence_constrained_hindcast_specification()
    signature = next(
        value for value in specification.cross_species_signatures
        if value.signature_id == "dog_to_human_sperm_catchment"
    )
    source = FieldStateContrast(
        _fieldstate("dog-reference", mean=1.0, lower=0.5, upper=1.5, start_year=2020),
        _fieldstate("dog-target", mean=3.0, lower=2.5, upper=3.5, start_year=2021),
    )
    human = FieldStateContrast(
        _fieldstate("human-reference", mean=1.5, lower=1.0, upper=2.0, start_year=2020),
        _fieldstate("human-target", mean=4.0, lower=3.5, upper=4.5, start_year=2021),
    )

    prediction = predict_cross_species_direction(
        signature,
        source_contrast=source,
        target_contrast=human,
    )

    assert prediction.status == "FORWARD_DIRECTIONAL_PREDICTION"
    assert prediction.source_fieldstate_change == "INCREASED"
    assert prediction.target_fieldstate_change == "INCREASED"
    assert prediction.predicted_source_endpoint_direction == "NONINCREASING_BERM_PRIOR_WITH_SPECIES_TAILS"
    assert prediction.predicted_target_endpoint_direction == "NONINCREASING_BERM_PRIOR_WITH_SPECIES_TAILS"
    assert {"mobility", "geometry", "sampling", "catchment geometry"} <= set(
        prediction.uncertainty_components
    )


def test_historical_asfr_pattern_is_evaluated_only_after_the_upstream_specification() -> None:
    specification = default_evidence_constrained_hindcast_specification()
    evaluations = evaluate_historical_signatures(specification.historical_signature_windows)

    assert [(value.window_id, value.n_geographies) for value in evaluations] == [
        ("cohort_1990_2013", 196),
        ("cohort_1995_2018", 196),
        ("cohort_2000_2023", 163),
    ]
    assert [value.asfr_cohort_pearson_r for value in evaluations] == pytest.approx([
        -0.7499795085,
        -0.7289237088,
        -0.6664467038,
    ])
    assert all(value.asfr_direction_matches for value in evaluations)
    assert all(value.outcome_role == "POSTERIOR_PREDICTIVE_ONLY" for value in evaluations)
    assert all(value.tfr_context_pearson_r is not None for value in evaluations)


def test_cross_species_distribution_requires_explicit_uncertainty_components() -> None:
    with pytest.raises(ValueError, match="uncertainty_component"):
        MobilityWeightedFieldState(
            distribution_id="missing-uncertainty",
            geography_id="FRA-TEST",
            population_or_species_id="test-population",
            target_node="MALE_SPERM",
            feature_id="selected_vector_magnitude",
            start_year=2020,
            end_year=2020,
            mean=1.0,
            lower=0.5,
            upper=1.5,
            spatial_coverage_fraction=0.7,
            temporal_coverage_fraction=0.8,
            mobility_model_id="home-work-catchment-v1",
            geometry_transfer_model_id="organ-transfer-v1",
            source_ids=("ANFR_MEASURED_RF",),
            uncertainty_components=(),
            measurement_status="PARTIAL_MEASURED_FIELDSTATE",
        )
