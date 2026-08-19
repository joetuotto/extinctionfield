"""Tests for the pure, externally supplied temporal BERM core."""

from __future__ import annotations

import math

import pytest

from berm.stats.temporal_core import (
    EXCLUDED_LEGACY_ACUTE_SUBPATHS,
    TemporalCoreResult,
    evaluate_temporal_core,
    lindgren_chi,
    response_from_external_exposure,
    selected_two_channel_exposure,
)
from berm.v16 import (
    emf_behavioral_factor_v3,
    v11_biological_capacity,
    v12_nutrition_modifier,
)


def test_core_retains_explicit_bio_cap_times_behavioral_structure():
    result = evaluate_temporal_core(
        "USA",
        2020,
        memory_exposure=12.0,
        ambient=0.5,
        personal=1.5,
        input_provenance={"source": "fixture", "memory_method": "exp decay tau=10"},
    )

    expected_base = v11_biological_capacity(12.0)
    expected_nutrition = v12_nutrition_modifier("USA")
    expected_behav = emf_behavioral_factor_v3(12.0)

    assert isinstance(result, TemporalCoreResult)
    assert result.base_biological_capacity == pytest.approx(expected_base)
    assert result.nutrition_modifier == pytest.approx(expected_nutrition)
    assert result.bio_capacity == pytest.approx(expected_base * expected_nutrition)
    assert result.behavioral_factor == pytest.approx(expected_behav)
    assert result.bio_cap_x_behav == pytest.approx(
        result.bio_capacity * result.behavioral_factor
    )
    assert result.biological_capacity == result.bio_capacity
    assert result.behav == result.behavioral_factor


def test_exact_external_exposure_response_contract_is_available():
    result = response_from_external_exposure(12.0, 0.5, 1.5, "USA", 2020)

    assert isinstance(result, TemporalCoreResult)
    assert result.bio_behavior == pytest.approx(
        result.bio_capacity * result.behavioral_factor
    )
    assert result.as_dict()["bio_behavior"] == pytest.approx(result.bio_behavior)


def test_core_accepts_external_channels_and_preserves_lindgren_selection_rule():
    result = evaluate_temporal_core(
        "Finland",
        2015,
        memory_exposure=4.0,
        ambient=0.3,
        personal=2.0,
        memory_definition="external WCE, normalized lag weights",
    )

    expected_chi = 0.3 / math.sqrt(1.0 + 0.3**2)
    assert result.chi == pytest.approx(expected_chi)
    assert result.selected_personal_exposure == pytest.approx(expected_chi * 2.0)
    assert result.instantaneous_selected_exposure == pytest.approx(
        0.3 + expected_chi * 2.0
    )
    assert selected_two_channel_exposure(0.3, 2.0) == pytest.approx(
        result.instantaneous_selected_exposure
    )
    assert lindgren_chi(0.3) == pytest.approx(expected_chi)


def test_current_channels_do_not_silently_double_count_an_external_memory_value():
    low_current = evaluate_temporal_core(
        "USA", 2020, memory_exposure=15.0, ambient=0.01, personal=0.01
    )
    high_current = evaluate_temporal_core(
        "USA", 2020, memory_exposure=15.0, ambient=5.0, personal=5.0
    )

    # The upstream temporal model owns the memory value.  The current-year
    # channels remain observable diagnostics, not an implicit second exposure.
    assert high_current.instantaneous_selected_exposure > low_current.instantaneous_selected_exposure
    assert high_current.bio_capacity == pytest.approx(low_current.bio_capacity)
    assert high_current.behavioral_factor == pytest.approx(low_current.behavioral_factor)
    assert high_current.bio_cap_x_behav == pytest.approx(low_current.bio_cap_x_behav)


def test_core_does_not_call_legacy_annual_generators_or_global_calibration(monkeypatch):
    # Patching the old pathways to explode makes accidental use visible.  The
    # pure core imports only the non-calibrating scalar v11/v12/behavioural
    # primitives and therefore remains callable.
    import berm.v16 as legacy_v16

    def forbidden(*_args, **_kwargs):
        raise AssertionError("pure temporal core must not call legacy stateful exposure")

    monkeypatch.setattr(legacy_v16, "v16_ambient_annual", forbidden)
    monkeypatch.setattr(legacy_v16, "v16_personal_annual", forbidden)
    monkeypatch.setattr(legacy_v16, "calibrate_v16", forbidden)

    result = evaluate_temporal_core(
        "USA", 2020, memory_exposure=10.0, ambient=0.4, personal=1.0
    )
    assert result.bio_cap_x_behav > 0.0
    assert "none" in result.model_provenance["calibration"]


def test_result_carries_provenance_and_explicitly_lists_excluded_acute_subpaths():
    original_provenance = {"mobile": {"status": "observed"}}
    result = evaluate_temporal_core(
        "Japan",
        2024,
        memory_exposure=20.0,
        ambient=0.8,
        personal=2.1,
        input_provenance=original_provenance,
    )

    # The record is insulated from both mutations to the input and mutations
    # to a detached dict returned for export.
    original_provenance["mobile"]["status"] = "changed-after-evaluation"
    exported = result.as_dict()
    exported["input_provenance"]["mobile"]["status"] = "changed-after-export"

    assert result.input_provenance["mobile"]["status"] == "observed"
    assert result.input_provenance["temporal_core_input_contract"]["memory_exposure"].startswith(
        "externally supplied"
    )
    assert result.model_provenance["exposure_generation"].startswith("caller supplied")
    assert result.excluded_legacy_acute_subpaths == EXCLUDED_LEGACY_ACUTE_SUBPATHS
    assert any("v17_cry_effect" in path for path in result.excluded_legacy_acute_subpaths)
    assert exported["input_provenance"]["mobile"]["status"] == "changed-after-export"


@pytest.mark.parametrize(
    "field,value",
    [
        ("memory_exposure", -0.1),
        ("memory_exposure", float("nan")),
        ("ambient", -1.0),
        ("personal", float("inf")),
    ],
)
def test_physical_and_memory_inputs_must_be_finite_and_nonnegative(field, value):
    kwargs = {"memory_exposure": 1.0, "ambient": 0.1, "personal": 0.2}
    kwargs[field] = value
    with pytest.raises(ValueError, match=field):
        evaluate_temporal_core("USA", 2020, **kwargs)


def test_labels_and_provenance_contract_are_validated():
    with pytest.raises(ValueError, match="country"):
        evaluate_temporal_core("", 2020, memory_exposure=1, ambient=0, personal=0)
    with pytest.raises(ValueError, match="year"):
        evaluate_temporal_core("USA", 2020.5, memory_exposure=1, ambient=0, personal=0)
    with pytest.raises(ValueError, match="input_provenance"):
        evaluate_temporal_core(
            "USA", 2020, memory_exposure=1, ambient=0, personal=0,
            input_provenance=["not", "a", "mapping"],
        )
