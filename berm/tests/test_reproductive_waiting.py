"""Heterogeneous waiting curves and the opt-in conditional ASFR bridge."""

import pytest

from berm.biology.reproductive_state import CoupleReproductiveState, FemaleReproductiveState, MaleReproductiveState
from berm.data.wpp import AGE_GROUPS
from berm.outcomes.fieldstate_asfr import AgeSpecificConditionalInput, project_conditional_asfr
from berm.outcomes.reproductive_waiting import CoupleWaitingState, WaitingHorizonComparison, summarize_waiting_cohort


def couple(**female_options) -> CoupleReproductiveState:
    return CoupleReproductiveState(MaleReproductiveState(), FemaleReproductiveState(**female_options))


def cohort(probabilities, *, weights=None):
    weights = weights if weights is not None else [1] * len(probabilities)
    return tuple(CoupleWaitingState(couple(), probability, weight) for probability, weight in zip(probabilities, weights))


def test_heterogeneity_with_same_mean_produces_longer_waiting_tail() -> None:
    uniform = summarize_waiting_cohort(cohort([0.2]), 12)
    mixture = summarize_waiting_cohort(cohort([0.1, 0.3]), 12)
    assert uniform.mean_cycle_conception_probability == pytest.approx(mixture.mean_cycle_conception_probability)
    assert uniform.conceived_probability == pytest.approx(0.931280523264)
    assert mixture.conceived_probability == pytest.approx(0.851864087879)
    assert mixture.survivor_probability > uniform.survivor_probability
    assert mixture.next_cycle_conception_probability < 0.2
    assert mixture.restricted_mean_waiting_cycles > uniform.restricted_mean_waiting_cycles
    hazards = [summarize_waiting_cohort(cohort([0.1, 0.3]), step).next_cycle_conception_probability for step in range(13)]
    assert all(left > right for left, right in zip(hazards, hazards[1:]))


def test_weight_normalization_and_restricted_mean_survival_identity() -> None:
    states = cohort([0.1, 0.3], weights=[1, 3])
    summary = summarize_waiting_cohort(states, 12)
    expected_restricted = sum(summarize_waiting_cohort(states, cycle).survivor_probability for cycle in range(12))
    assert summary.restricted_mean_waiting_cycles == pytest.approx(expected_restricted)
    rescaled = summarize_waiting_cohort(cohort([0.1, 0.3], weights=[1e307, 3e307]), 12)
    for name in ("mean_cycle_conception_probability", "conceived_probability", "supported_conception_probability",
                 "survivor_probability", "next_cycle_conception_probability", "restricted_mean_waiting_cycles"):
        assert getattr(rescaled, name) == pytest.approx(getattr(summary, name), abs=1e-14)


def test_pair_capacity_applies_before_waiting_and_support_after_conception() -> None:
    state = CoupleWaitingState(couple(ovulatory_clock_gate=0.5, luteal_implantation_support=0.4), 0.2)
    result = summarize_waiting_cohort((state,), 6)
    assert state.cycle_conception_probability == pytest.approx(0.1)
    assert result.conceived_probability == pytest.approx(1 - 0.9**6)
    assert result.supported_conception_probability == pytest.approx((1 - 0.9**6) * 0.4)
    assert result.survivor_probability == pytest.approx(0.9**6)
    assert result.next_cycle_conception_probability == pytest.approx(0.1)


def test_first_conception_support_does_not_count_repeated_attempts_after_loss() -> None:
    state = CoupleWaitingState(couple(luteal_implantation_support=0.5), 1)
    result = summarize_waiting_cohort((state,), 12)
    # Certain first-cycle conception means no further conception risk set.
    # Applying support to every new cycle instead would incorrectly approach 1.
    assert result.supported_conception_probability == 0.5
    assert result.next_cycle_conception_probability is None
    assert "unit reference support" in result.as_dict()["support_assumption"]


def test_conditional_hazard_survives_unconditional_probability_underflow() -> None:
    result = summarize_waiting_cohort(cohort([0.9]), 1000)
    assert result.survivor_probability == 0  # Below the floating-point range.
    assert result.next_cycle_conception_probability == pytest.approx(0.9)
    # A tiny initial stratum dominates the survivor cohort after the others
    # have certainly conceived; its original normalized weight can underflow.
    weighted = summarize_waiting_cohort(cohort([1, 0.1], weights=[1e308, 1e-308]), 12)
    assert weighted.next_cycle_conception_probability == pytest.approx(0.1)


def test_zero_one_horizon_and_small_probability_limits() -> None:
    zero = summarize_waiting_cohort(cohort([0]), 12)
    assert zero.conceived_probability == 0
    assert zero.restricted_mean_waiting_cycles == 12
    assert zero.next_cycle_conception_probability == 0
    one = summarize_waiting_cohort(cohort([1]), 12)
    assert one.conceived_probability == 1
    assert one.restricted_mean_waiting_cycles == 1
    assert one.next_cycle_conception_probability is None
    before = summarize_waiting_cohort(cohort([0.2, 1]), 0)
    assert before.conceived_probability == 0
    assert before.survivor_probability == 1
    assert before.restricted_mean_waiting_cycles == 0
    tiny = summarize_waiting_cohort(cohort([1e-16]), 12)
    assert tiny.conceived_probability == pytest.approx(1.2e-15, rel=1e-12, abs=0)
    assert tiny.restricted_mean_waiting_cycles == pytest.approx(12)


def test_waiting_ratio_replaces_capacity_ratio_and_keeps_tempo_separate() -> None:
    comparison = WaitingHorizonComparison(
        cohort([0.2]), cohort([0.1, 0.3]), 12, ("synthetic-waiting-to-ASFR",), starting_parity=1,
        evidence_ids=("waiting-distribution-component",),
    )
    inputs = tuple(AgeSpecificConditionalInput(
        age, 100, couple(), couple(ovarian_reserve=0.5), waiting_comparison=comparison,
        target_demand_opportunity=0.8, target_tempo=1.1,
    ) for age in AGE_GROUPS)
    projection = project_conditional_asfr(geography_id="SYNTHETIC", year=2026, reference_year=2025, groups=inputs)
    ratio = comparison.target.supported_conception_probability / comparison.reference.supported_conception_probability
    assert inputs[0].biological_ratio == pytest.approx(ratio)
    assert projection.predicted_tfr == pytest.approx(3.5 * ratio * 0.8 * 1.1)
    assert projection.calibration_status == "STRUCTURAL_ONLY"
    mapping = projection.as_dict()["age_groups"][0]["biological_mapping"]
    assert mapping["starting_parity"] == 1
    assert mapping["parameter_ids"] == ["synthetic-waiting-to-ASFR"]
    assert "not calendar births" in mapping["target"]["endpoint"]
    assert "external mapping" in mapping["assumption"]
    assert mapping["field_state_statuses"] == {"reference": ["NOT_EVALUATED"], "target": ["NOT_EVALUATED"]}
    assert "field_state_status" not in projection.as_dict()["age_groups"][0]


def test_default_linear_route_output_remains_unchanged() -> None:
    baseline = couple()
    inputs = tuple(AgeSpecificConditionalInput(age, 100, baseline, baseline) for age in AGE_GROUPS)
    projection = project_conditional_asfr(geography_id="SYNTHETIC", year=2026, reference_year=2025, groups=inputs)
    assert projection.predicted_tfr == projection.reference_tfr
    assert all("biological_mapping" not in row and "biological_coordination" not in row for row in projection.as_dict()["age_groups"])


@pytest.mark.parametrize("action", [
    lambda: cohort([float("nan")]),
    lambda: cohort([True]),
    lambda: cohort([-0.1]),
    lambda: cohort([1.1]),
    lambda: cohort([0.2], weights=[float("inf")]),
    lambda: cohort([0.2], weights=[-1]),
    lambda: summarize_waiting_cohort(cohort([0.1], weights=[0]), 12),
    lambda: summarize_waiting_cohort((), 12),
    lambda: summarize_waiting_cohort(cohort([0.2]), -1),
    lambda: summarize_waiting_cohort(cohort([0.2]), 1.5),
    lambda: summarize_waiting_cohort(cohort([0.2]), True),
    lambda: WaitingHorizonComparison(cohort([0]), cohort([0.2]), 12, ("mapping",)),
    lambda: WaitingHorizonComparison(cohort([0.2]), cohort([0.2]), 0, ("mapping",)),
    lambda: WaitingHorizonComparison(cohort([0.2]), cohort([0.2]), 12, ()),
    lambda: WaitingHorizonComparison(cohort([0.2]), cohort([0.2]), 12, ("duplicate", "duplicate")),
    lambda: WaitingHorizonComparison(cohort([0.2]), cohort([0.2]), 12, "mapping"),
    lambda: WaitingHorizonComparison(cohort([1e-323]), cohort([1]), 1, ("unrepresentable-ratio",)),
])
def test_invalid_waiting_inputs_fail_explicitly(action) -> None:
    with pytest.raises(ValueError):
        action()
