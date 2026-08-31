from __future__ import annotations

import math

from berm.diagnostics.cross_species_gradient import (
    CROSS_SPECIES_GRADIENT,
    GRADIENT_FIT,
    fit_gradient,
    predict_decline,
    gradient_summary,
)


def test_seven_species() -> None:
    assert len(CROSS_SPECIES_GRADIENT) == 7


def test_emf_burden_ordered() -> None:
    burdens = [d.emf_burden for d in CROSS_SPECIES_GRADIENT]
    assert burdens == sorted(burdens)


def test_gradient_r_above_threshold() -> None:
    """Cross-species gradient r should be ≥ 0.80."""
    assert GRADIENT_FIT.r >= 0.80, f"r = {GRADIENT_FIT.r}"


def test_gradient_p_significant() -> None:
    """p < 0.05 for 7-species gradient."""
    assert GRADIENT_FIT.p_value < 0.05, f"p = {GRADIENT_FIT.p_value}"


def test_gradient_positive_slope() -> None:
    assert GRADIENT_FIT.slope > 0


def test_fit_matches_precomputed() -> None:
    fresh = fit_gradient()
    assert fresh.r == GRADIENT_FIT.r
    assert fresh.slope == GRADIENT_FIT.slope


def test_predict_decline_monotonic() -> None:
    d_low = predict_decline(0.1)
    d_high = predict_decline(0.9)
    assert d_high > d_low


def test_predict_decline_reasonable_range() -> None:
    d = predict_decline(1.0)
    assert 0.0 < d < 1.0, f"decline at EMF=1.0 is {d}"


def test_gradient_summary_structure() -> None:
    s = gradient_summary()
    assert s["n_species"] == 7
    assert "equation" in s
    assert "caveat" in s
    assert len(s["species"]) == 7


def test_all_species_have_sources() -> None:
    for d in CROSS_SPECIES_GRADIENT:
        assert d.source, f"{d.name} missing source"
        assert d.note, f"{d.name} missing note"
