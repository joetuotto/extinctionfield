from __future__ import annotations

from berm.diagnostics.lh_t_diagnostic import (
    classify_lh_t_pattern,
    DisruptionLevel,
    Gradient,
    OBSERVED_AGE_PATTERN,
    OBSERVED_PATTERN,
    santi_2025_summary,
    two_signature_prediction,
)


def test_both_declining_is_hypothalamic() -> None:
    result = classify_lh_t_pattern(lh_declining=True, t_declining=True)
    assert result.level == DisruptionLevel.HYPOTHALAMIC


def test_t_down_lh_up_is_testicular() -> None:
    result = classify_lh_t_pattern(lh_declining=False, t_declining=True)
    assert result.level == DisruptionLevel.TESTICULAR


def test_lh_down_t_stable_is_mixed() -> None:
    result = classify_lh_t_pattern(lh_declining=True, t_declining=False)
    assert result.level == DisruptionLevel.MIXED


def test_both_stable_is_indeterminate() -> None:
    result = classify_lh_t_pattern(lh_declining=False, t_declining=False)
    assert result.level == DisruptionLevel.INDETERMINATE


def test_observed_pattern_is_hypothalamic() -> None:
    assert OBSERVED_PATTERN.level == DisruptionLevel.HYPOTHALAMIC
    assert "hypothalamus" in OBSERVED_PATTERN.interpretation.lower()


def test_santi_summary_has_required_fields() -> None:
    summary = santi_2025_summary()
    assert summary["diagnosed_level"] == "hypothalamic"
    assert "Santi" in summary["reference"]
    assert "caveat" in summary
    assert "key_finding" in summary


def test_hypothalamic_mentions_emf_consistency() -> None:
    result = classify_lh_t_pattern(lh_declining=True, t_declining=True)
    assert "EMF" in result.berm_consistency


def test_testicular_mentions_edc() -> None:
    result = classify_lh_t_pattern(lh_declining=False, t_declining=True)
    assert "EDC" in result.berm_consistency


def test_age_gradient_with_rising_lh_is_predicted_not_contrary() -> None:
    result = classify_lh_t_pattern(
        lh_declining=False, t_declining=True, gradient=Gradient.AGE
    )
    assert result.level == DisruptionLevel.TESTICULAR
    assert result.gradient == Gradient.AGE
    assert "pathway A" in result.berm_consistency
    assert "does not count against" in result.berm_consistency


def test_secular_gradient_with_rising_lh_does_not_support_model() -> None:
    result = classify_lh_t_pattern(
        lh_declining=False, t_declining=True, gradient=Gradient.SECULAR
    )
    assert "does NOT support" in result.berm_consistency


def test_obesity_mediated_decline_is_not_discriminating() -> None:
    result = classify_lh_t_pattern(
        lh_declining=True, t_declining=True, gradient=Gradient.OBESITY_MEDIATED
    )
    assert result.level == DisruptionLevel.HYPOTHALAMIC
    assert "BMI-independent" in result.berm_consistency


def test_gradient_defaults_to_secular() -> None:
    assert classify_lh_t_pattern(True, True).gradient == Gradient.SECULAR


def test_observed_age_pattern_is_testicular() -> None:
    assert OBSERVED_AGE_PATTERN.level == DisruptionLevel.TESTICULAR
    assert OBSERVED_AGE_PATTERN.gradient == Gradient.AGE


def test_two_signature_prediction_is_falsifiable() -> None:
    pred = two_signature_prediction()
    assert pred["age_axis"]["level"] == "testicular"
    assert pred["secular_axis"]["level"] == "hypothalamic"
    assert "fails if" in pred["falsification"]
    assert "Marriott" in pred["competing_explanation"]
