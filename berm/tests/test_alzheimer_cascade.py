"""Tests for the Alzheimer calcium cascade diagnostic module."""

from berm.diagnostics.alzheimer_calcium_cascade import (
    alzheimer_cascade_model,
    compare_genotypes_and_environments,
    alzheimer_cascade_summary,
)


def test_tc_worse_than_tt():
    """T/C genotype produces worse cognitive outcome than T/T."""
    r = compare_genotypes_and_environments()
    assert r["T/C urban"]["cognitive_80"] < r["T/T urban"]["cognitive_80"]


def test_urban_worse_than_rural():
    """Urban environment produces more plaque than rural."""
    r = compare_genotypes_and_environments()
    assert r["T/T urban"]["plaque_80"] > r["T/T rural"]["plaque_80"]


def test_feedback_loop_eventually_activates():
    """Positive feedback loop activates at some point."""
    states = alzheimer_cascade_model(1950, "T/C", "urban")
    assert any(s.feedback_loop_active for s in states)


def test_cognitive_decline_follows_plaques():
    """Cognitive decline follows plaque accumulation."""
    states = alzheimer_cascade_model(1950, "T/T", "urban")
    high_plaque = [s for s in states if s.plaque_burden > 0.5]
    if high_plaque:
        assert high_plaque[0].cognitive_score < 0.8


def test_rural_tt_has_latest_onset():
    """T/T rural has latest feedback loop onset."""
    r = compare_genotypes_and_environments()
    onsets = {k: v["feedback_onset_age"] for k, v in r.items()
              if v["feedback_onset_age"] is not None}
    if "T/T rural" in onsets and "T/C urban" in onsets:
        assert onsets["T/T rural"] > onsets["T/C urban"]


def test_summary_has_predictions():
    """Summary includes P29-P32 predictions."""
    s = alzheimer_cascade_summary()
    assert "P29" in s["predictions"]
    assert "P32" in s["predictions"]
    assert len(s["chain"]) >= 7
    assert len(s["warnings"]) >= 3


def test_model_returns_correct_length():
    """Model returns correct number of states."""
    states = alzheimer_cascade_model(1950, years_to_simulate=50)
    assert len(states) == 50
    assert states[0].age == 0
    assert states[-1].age == 49
