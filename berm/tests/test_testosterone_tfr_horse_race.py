from __future__ import annotations

import numpy as np

from berm.stats.testosterone_tfr_horse_race import fit_ols_hc3, partial_r2


def _fit(y: np.ndarray, predictors: list[np.ndarray], names: list[str]):
    x = np.column_stack([np.ones(len(y)), *predictors])
    return fit_ols_hc3(y, x, ["intercept", *names])


def test_ols_recovers_exact_linear_coefficients() -> None:
    x1 = np.linspace(-2.0, 2.0, 40)
    x2 = np.sin(np.linspace(0.0, 5.0, 40))
    y = 1.5 + 2.0 * x1 - 0.75 * x2

    result = _fit(y, [x1, x2], ["x1", "x2"])

    assert np.allclose(result.beta, [1.5, 2.0, -0.75], atol=1e-10)
    assert result.r2 == 1.0


def test_partial_r2_matches_nested_r2_definition() -> None:
    rng = np.random.default_rng(7)
    x1 = rng.normal(size=200)
    x2 = rng.normal(size=200)
    y = 0.5 * x1 + 0.8 * x2 + rng.normal(scale=0.5, size=200)
    reduced = _fit(y, [x1], ["x1"])
    full = _fit(y, [x1, x2], ["x1", "x2"])

    expected = (full.r2 - reduced.r2) / (1.0 - reduced.r2)

    assert np.isclose(partial_r2(full, reduced), expected)
    assert 0.0 < expected < 1.0


def test_partial_r2_rejects_different_samples() -> None:
    y = np.arange(20, dtype=float)
    short = _fit(y[:-1], [y[:-1]], ["x"])
    long = _fit(y, [y], ["x"])

    try:
        partial_r2(long, short)
    except ValueError as exc:
        assert "identical samples" in str(exc)
    else:  # pragma: no cover - assertion guard
        raise AssertionError("different samples should fail")
