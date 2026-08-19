"""Tests for the external-data WCE lag-kernel layer."""

from __future__ import annotations

import pytest

from berm.stats.wce import (
    CohortAgeKernel,
    CumulativeKernel,
    ExponentialKernel,
    SplineKernel,
    calibrate_wce_scale,
    cumulative_exposure,
    lag_profile,
    memory_from_series,
    normalized_lag_weights,
)


EXPOSURE = {year: float(year - 1999) for year in range(2000, 2036)}


def test_exponential_weights_are_nonnegative_and_normalized():
    weights = normalized_lag_weights(ExponentialKernel(tau=5.0), 36)
    assert sum(weights) == pytest.approx(1.0)
    assert all(weight >= 0 for weight in weights)
    assert weights[0] > weights[-1]


def test_longer_exponential_memory_retains_more_old_exposure():
    short = normalized_lag_weights(ExponentialKernel(tau=1.0), 36)
    long = normalized_lag_weights(ExponentialKernel(tau=30.0), 36)
    assert long[-1] > short[-1]


def test_spline_profile_is_nonnegative_and_normalized():
    kernel = SplineKernel((0.2, 0.5, 1.0, 0.5, 0.1))
    profile = lag_profile(kernel)
    assert len(profile) == 31
    assert sum(profile) == pytest.approx(1.0)
    assert all(weight >= 0 for weight in profile)


def test_spline_rejects_negative_or_wrong_length_coefficients():
    with pytest.raises(ValueError):
        SplineKernel((1.0, 1.0, 1.0, 1.0))  # type: ignore[arg-type]
    with pytest.raises(ValueError):
        SplineKernel((1.0, -1.0, 1.0, 1.0, 1.0))


def test_cohort_kernel_matches_specified_developmental_weights():
    kernel = CohortAgeKernel()
    assert kernel.raw_weight(0) == 1.0       # age 28
    assert kernel.raw_weight(12) == 2.0      # age 16
    assert kernel.raw_weight(20) == 3.0      # age 8
    assert kernel.raw_weight(27) == 4.0      # age 1
    assert kernel.raw_weight(29) == 5.0      # fetal


def test_legacy_cumulative_retains_exact_sum():
    result = memory_from_series(
        EXPOSURE, 2004, CumulativeKernel(), start_year=2000
    )
    assert result.value == pytest.approx(15.0)
    assert result.is_legacy_cumulative is True
    assert sum(result.weights) == pytest.approx(1.0)


def test_wce_only_uses_available_history_and_normalizes_after_truncation():
    result = memory_from_series(
        EXPOSURE, 2001, ExponentialKernel(tau=5.0), start_year=2000, scale=1.0
    )
    assert result.lags == (0, 1)
    assert sum(result.weights) == pytest.approx(1.0)
    assert 1.0 <= result.value <= 2.0


def test_train_only_scale_matches_cumulative_endpoint_scale():
    panel = {
        "A": {year: 1.0 for year in range(2000, 2005)},
        "B": {year: 2.0 for year in range(2000, 2005)},
    }
    scale = calibrate_wce_scale(
        panel, ExponentialKernel(tau=5.0), start_year=2000, train_end=2004
    )
    assert scale == pytest.approx(5.0)
    result = memory_from_series(
        panel["A"], 2004, ExponentialKernel(tau=5.0), start_year=2000, scale=scale
    )
    assert result.value == pytest.approx(5.0)
    assert cumulative_exposure(panel["A"], 2004, start_year=2000) == 5.0
