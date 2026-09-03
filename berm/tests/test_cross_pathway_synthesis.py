from __future__ import annotations

import math

import pytest

from berm.biology.cross_pathway_synthesis import (
    EVIDENCE_SYNTHESIS_CLUSTERS,
    additive_interaction_contrast,
    graded_susceptibility_probability,
    joint_endocrine_predictor,
    log_multiplicative_interaction_contrast,
    synthesis_manifest,
)


def test_seven_registered_syntheses_are_unique_and_berm_owned() -> None:
    manifest = synthesis_manifest()

    assert len(EVIDENCE_SYNTHESIS_CLUSTERS) == 7
    assert len({item.id for item in EVIDENCE_SYNTHESIS_CLUSTERS}) == 7
    assert manifest["role"] == "berm_compositional_evidence_layer"
    assert manifest["fieldStateRole"] == "optional_physical_measurement_input_only"


def test_interaction_contrasts_are_zero_for_additive_or_multiplicative_nulls() -> None:
    assert additive_interaction_contrast(10.0, 12.0, 13.0, 15.0) == pytest.approx(0.0)
    assert log_multiplicative_interaction_contrast(10.0, 20.0, 30.0, 60.0) == pytest.approx(0.0)


def test_joint_endocrine_predictor_exposes_the_interaction_coefficient() -> None:
    result = joint_endocrine_predictor(
        2.0,
        3.0,
        intercept=1.0,
        beta_testosterone=0.5,
        beta_cortisol=-0.25,
        beta_interaction=-0.1,
    )
    assert result == pytest.approx(0.65)


def test_graded_susceptibility_is_continuous_and_threshold_centred() -> None:
    assert graded_susceptibility_probability(1.0, 1.0, scale=0.2) == pytest.approx(0.5)
    low = graded_susceptibility_probability(0.5, 1.0, scale=0.2)
    high = graded_susceptibility_probability(1.5, 1.0, scale=0.2)
    assert 0.0 < low < 0.5 < high < 1.0
    assert low == pytest.approx(1.0 - high)


def test_invalid_numeric_inputs_do_not_create_hidden_results() -> None:
    with pytest.raises(ValueError):
        graded_susceptibility_probability(1.0, 1.0, scale=0.0)
    with pytest.raises(ValueError):
        log_multiplicative_interaction_contrast(1.0, 2.0, 3.0, 0.0)
    with pytest.raises(ValueError):
        additive_interaction_contrast(math.nan, 1.0, 1.0, 1.0)
