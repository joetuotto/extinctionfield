"""Lag kernels and weighted cumulative exposure (WCE) for BERM validation.

The legacy cumulative model is retained as ``CumulativeKernel``.  The other
kernels describe *shape* only: their lag weights are non-negative and sum to
one.  A train-only scale bridge can subsequently put a normalized WCE back on
the legacy cumulative-dose scale before it enters the biological response.

Keeping the shape and scale separate is deliberate.  It prevents a short
memory kernel from winning merely because its weights have a smaller raw sum,
and it prevents information from a backtest's test window from setting the
exposure scale.
"""

from __future__ import annotations

import math
from dataclasses import dataclass
from statistics import median
from typing import Mapping, Protocol, Sequence


MAX_LAG_YEARS = 35
SPLINE_KNOTS: tuple[float, ...] = (0.0, 5.0, 10.0, 15.0, 20.0, 30.0)
SPLINE_CENTERS: tuple[float, ...] = (2.5, 7.5, 12.5, 17.5, 25.0)


class LagKernel(Protocol):
    """A non-negative finite-memory lag kernel."""

    name: str
    max_lag: int

    def raw_weight(self, lag: int) -> float:
        """Return the unnormalised weight for ``lag`` years ago."""


def _validate_max_lag(max_lag: int) -> int:
    if isinstance(max_lag, bool) or not isinstance(max_lag, int):
        raise ValueError("max_lag must be an integer")
    if not 0 <= max_lag <= MAX_LAG_YEARS:
        raise ValueError(f"max_lag must be between 0 and {MAX_LAG_YEARS}")
    return max_lag


def _normalise(raw_weights: Sequence[float]) -> tuple[float, ...]:
    if not raw_weights:
        raise ValueError("at least one lag weight is required")
    if any(not math.isfinite(weight) or weight < 0 for weight in raw_weights):
        raise ValueError("lag weights must be finite and non-negative")
    total = sum(raw_weights)
    if total <= 0:
        raise ValueError("lag weights must contain at least one positive value")
    return tuple(weight / total for weight in raw_weights)


@dataclass(frozen=True)
class CumulativeKernel:
    """Legacy M1 comparator: unweighted cumulative exposure ``Σ E``.

    This is intentionally not a normalized WCE.  ``normalised_weights`` is
    supplied only for visual comparison; ``memory_from_series`` retains the
    legacy sum exactly.
    """

    name: str = "cum_emf"
    max_lag: int = MAX_LAG_YEARS

    def __post_init__(self) -> None:
        _validate_max_lag(self.max_lag)

    def raw_weight(self, lag: int) -> float:
        if lag < 0:
            raise ValueError("lag must be non-negative")
        return 1.0


@dataclass(frozen=True)
class ExponentialKernel:
    """Exponentially decaying memory with a biological memory ``tau`` years."""

    tau: float
    max_lag: int = MAX_LAG_YEARS
    name: str = "exp_decay"

    def __post_init__(self) -> None:
        if not math.isfinite(self.tau) or not 0.5 <= self.tau <= 50.0:
            raise ValueError("tau must be finite and between 0.5 and 50 years")
        _validate_max_lag(self.max_lag)

    def raw_weight(self, lag: int) -> float:
        if lag < 0 or lag > self.max_lag:
            return 0.0
        return math.exp(-lag / self.tau)


@dataclass(frozen=True)
class SplineKernel:
    """Non-negative five-parameter piecewise-linear lag profile.

    The supplied knots are ``[0, 5, 10, 15, 20, 30]``.  Five coefficients
    describe a first-order spline profile at the five interval centres; values
    between centres are linearly interpolated and endpoint values are held
    constant.  This gives a smooth, non-negative free-form profile while
    preserving the required five free parameters.
    """

    coefficients: tuple[float, float, float, float, float]
    max_lag: int = 30
    name: str = "spline"

    def __post_init__(self) -> None:
        _validate_max_lag(self.max_lag)
        if self.max_lag != 30:
            raise ValueError("SplineKernel max_lag is fixed by the final 30-year knot")
        if len(self.coefficients) != 5:
            raise ValueError("SplineKernel requires exactly five coefficients")
        if any(not math.isfinite(value) or value < 0 for value in self.coefficients):
            raise ValueError("Spline coefficients must be finite and non-negative")
        if sum(self.coefficients) <= 0:
            raise ValueError("Spline coefficients must contain at least one positive value")

    def raw_weight(self, lag: int) -> float:
        if lag < 0 or lag > self.max_lag:
            return 0.0
        point = float(lag)
        if point <= SPLINE_CENTERS[0]:
            return self.coefficients[0]
        if point >= SPLINE_CENTERS[-1]:
            return self.coefficients[-1]
        for index in range(len(SPLINE_CENTERS) - 1):
            left = SPLINE_CENTERS[index]
            right = SPLINE_CENTERS[index + 1]
            if left <= point <= right:
                fraction = (point - left) / (right - left)
                return (
                    self.coefficients[index] * (1.0 - fraction)
                    + self.coefficients[index + 1] * fraction
                )
        raise AssertionError("lag falls outside spline centres")


@dataclass(frozen=True)
class CohortAgeKernel:
    """Fixed peak-cohort developmental vulnerability weighting.

    A TFR observation is represented by a reference reproductive cohort at
    age 28.  An exposure ``lag`` years earlier therefore occurred at
    ``28 - lag``.  The specified fetal/infant/child/puberty/adult weights are
    5/4/3/2/1 and are normalized only after the available history is known.
    """

    reference_age: int = 28
    max_lag: int = MAX_LAG_YEARS
    name: str = "cohort_age"

    def __post_init__(self) -> None:
        if self.reference_age < 18:
            raise ValueError("reference_age must be at least 18")
        _validate_max_lag(self.max_lag)

    def raw_weight(self, lag: int) -> float:
        if lag < 0 or lag > self.max_lag:
            return 0.0
        age_at_exposure = self.reference_age - lag
        if age_at_exposure < 0:
            return 5.0  # fetal
        if age_at_exposure < 2:
            return 4.0  # infant
        if age_at_exposure < 12:
            return 3.0  # child
        if age_at_exposure < 18:
            return 2.0  # puberty
        return 1.0  # adult


@dataclass(frozen=True)
class WeightedExposure:
    """One date's memory exposure with the actual normalized lag profile."""

    year: int
    value: float
    intensity: float
    scale: float
    lags: tuple[int, ...]
    weights: tuple[float, ...]
    kernel: str
    is_legacy_cumulative: bool


def normalized_lag_weights(kernel: LagKernel, available_lags: int) -> tuple[float, ...]:
    """Return non-negative weights for lags ``0..available_lags-1``.

    ``available_lags`` includes the current year.  Histories shorter than a
    kernel's maximum lag are truncated and renormalized; no data are invented
    before the first observed exposure year.
    """

    if available_lags < 1:
        raise ValueError("available_lags must be at least one")
    length = min(available_lags, kernel.max_lag + 1)
    return _normalise([kernel.raw_weight(lag) for lag in range(length)])


def cumulative_exposure(
    exposure_by_year: Mapping[int, float],
    year: int,
    *,
    start_year: int,
) -> float:
    """Legacy M1 exposure: the exact cumulative sum from ``start_year``."""

    if year < start_year:
        return 0.0
    values: list[float] = []
    for current_year in range(start_year, year + 1):
        try:
            value = float(exposure_by_year[current_year])
        except KeyError as exc:
            raise ValueError(f"missing exposure for {current_year}") from exc
        if not math.isfinite(value) or value < 0:
            raise ValueError(f"exposure for {current_year} must be finite and non-negative")
        values.append(value)
    return sum(values)


def weighted_intensity(
    exposure_by_year: Mapping[int, float],
    year: int,
    kernel: LagKernel,
    *,
    start_year: int,
) -> tuple[float, tuple[int, ...], tuple[float, ...]]:
    """Return a normalized WCE intensity and the realized weights.

    The returned intensity has the same units as annual exposure.  It becomes
    a cumulative-dose-compatible memory index only after multiplying by a
    train-only scale from :func:`calibrate_wce_scale`.
    """

    if year < start_year:
        raise ValueError("year precedes the available exposure history")
    available_lags = year - start_year + 1
    weights = normalized_lag_weights(kernel, available_lags)
    lags = tuple(range(len(weights)))
    values: list[float] = []
    for lag in lags:
        source_year = year - lag
        try:
            value = float(exposure_by_year[source_year])
        except KeyError as exc:
            raise ValueError(f"missing exposure for {source_year}") from exc
        if not math.isfinite(value) or value < 0:
            raise ValueError(f"exposure for {source_year} must be finite and non-negative")
        values.append(value)
    return sum(weight * value for weight, value in zip(weights, values)), lags, weights


def memory_from_series(
    exposure_by_year: Mapping[int, float],
    year: int,
    kernel: LagKernel,
    *,
    start_year: int,
    scale: float = 1.0,
) -> WeightedExposure:
    """Build a legacy cumulative or scaled normalized memory exposure."""

    if not math.isfinite(scale) or scale <= 0:
        raise ValueError("scale must be finite and positive")
    if isinstance(kernel, CumulativeKernel):
        value = cumulative_exposure(exposure_by_year, year, start_year=start_year)
        available_lags = year - start_year + 1
        weights = normalized_lag_weights(kernel, available_lags)
        return WeightedExposure(
            year=year,
            value=value,
            intensity=value / available_lags,
            scale=1.0,
            lags=tuple(range(len(weights))),
            weights=weights,
            kernel=kernel.name,
            is_legacy_cumulative=True,
        )

    intensity, lags, weights = weighted_intensity(
        exposure_by_year, year, kernel, start_year=start_year
    )
    return WeightedExposure(
        year=year,
        value=intensity * scale,
        intensity=intensity,
        scale=scale,
        lags=lags,
        weights=weights,
        kernel=kernel.name,
        is_legacy_cumulative=False,
    )


def calibrate_wce_scale(
    exposures_by_country: Mapping[str, Mapping[int, float]],
    kernel: LagKernel,
    *,
    start_year: int,
    train_end: int,
) -> float:
    """Fit the WCE scale bridge using only exposure history through train end.

    For each country, compare its legacy cumulative dose at ``train_end`` to
    its normalized WCE intensity at the same date.  Their median ratio makes
    WCE and cumulative models comparable without looking at test outcomes.
    ``CumulativeKernel`` always has a scale of one.
    """

    if train_end < start_year:
        raise ValueError("train_end precedes start_year")
    if isinstance(kernel, CumulativeKernel):
        return 1.0
    ratios: list[float] = []
    for exposure_by_year in exposures_by_country.values():
        cumulative = cumulative_exposure(
            exposure_by_year, train_end, start_year=start_year
        )
        intensity, _, _ = weighted_intensity(
            exposure_by_year, train_end, kernel, start_year=start_year
        )
        if intensity > 0:
            ratios.append(cumulative / intensity)
    if not ratios:
        raise ValueError("cannot calibrate WCE scale from zero or missing exposure")
    return float(median(ratios))


def lag_profile(kernel: LagKernel) -> tuple[float, ...]:
    """Normalized display profile across the kernel's complete lag window."""

    return normalized_lag_weights(kernel, kernel.max_lag + 1)

