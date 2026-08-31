from __future__ import annotations

from berm.diagnostics.lh_t_diagnostic import (
    classify_lh_t_pattern,
    DisruptionLevel,
    OBSERVED_PATTERN,
    santi_2025_summary,
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
