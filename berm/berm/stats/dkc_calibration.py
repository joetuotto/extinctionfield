"""Calibration contracts for Dual-Kernel Convolution candidates.

This module contains only model-selection plumbing.  It deliberately names the
available national technology series for what they are: a technology-timing
proxy.  A proxy record carries both ``PROXY`` and
``TECHNOLOGY_TIMING_PROXY`` labels so downstream code cannot silently promote
it to a physical measurement.

The grids are the pre-specified grids from the 2026-09-04 integration brief.
They are materialised as immutable tuples so their cardinality and boundary
values can be locked by tests before any outcome is examined.
"""

from __future__ import annotations

from dataclasses import dataclass
import math
from itertools import product
from numbers import Integral, Real
from typing import Any, Iterable, Mapping


PROXY = "PROXY"
TECHNOLOGY_TIMING_PROXY = "TECHNOLOGY_TIMING_PROXY"
WPP_LAST_OBSERVED_YEAR = 2023
NOT_IDENTIFIABLE_WITH_CURRENT_DATA = "NOT_IDENTIFIABLE_WITH_CURRENT_DATA"


def _finite_real(name: str, value: Real) -> float:
    if isinstance(value, bool) or not isinstance(value, Real):
        raise ValueError(f"{name} must be a finite real number")
    result = float(value)
    if not math.isfinite(result):
        raise ValueError(f"{name} must be a finite real number")
    return result


def _integer(name: str, value: Integral, *, minimum: int) -> int:
    if isinstance(value, bool) or not isinstance(value, Integral):
        raise ValueError(f"{name} must be an integer")
    result = int(value)
    if result < minimum:
        comparator = "positive" if minimum == 1 else f">= {minimum}"
        raise ValueError(f"{name} must be {comparator}")
    return result


@dataclass(frozen=True)
class DKCParameters:
    """One valid DKC grid point.

    ``beta`` is intentionally not an initializer field.  It is always the
    normalization complement ``1 - alpha`` and therefore cannot become a
    second free mixture parameter.
    """

    tau_b: float
    tau_r: float
    alpha: float
    hill_n: float = 1.0
    n_b: int = 1

    def __post_init__(self) -> None:
        tau_b = _finite_real("tau_b", self.tau_b)
        tau_r = _finite_real("tau_r", self.tau_r)
        alpha = _finite_real("alpha", self.alpha)
        hill_n = _finite_real("hill_n", self.hill_n)
        n_b = _integer("n_b", self.n_b, minimum=1)

        if tau_b <= 0.0:
            raise ValueError("tau_b must be positive")
        if tau_r <= 0.0:
            raise ValueError("tau_r must be positive")
        if tau_r <= tau_b:
            raise ValueError("tau_r must be greater than tau_b")
        if not 0.0 <= alpha <= 1.0:
            raise ValueError("alpha must be in [0, 1]")
        if hill_n <= 0.0:
            raise ValueError("hill_n must be positive")

        object.__setattr__(self, "tau_b", tau_b)
        object.__setattr__(self, "tau_r", tau_r)
        object.__setattr__(self, "alpha", alpha)
        object.__setattr__(self, "hill_n", hill_n)
        object.__setattr__(self, "n_b", n_b)

    @property
    def beta(self) -> float:
        """The normalized slow-arm weight, fixed to ``1 - alpha``."""
        return 1.0 - self.alpha


@dataclass(frozen=True)
class DKCGridPoint:
    """One pre-specified candidate before the kernel-order constraint is applied.

    The brief's 448-point base Cartesian product contains the seven points
    ``tau_b == tau_r == 5``.  Keeping those points in ``BASE_GRID`` preserves
    the pre-registration exactly; :meth:`validated` rejects them before any
    fit.  This makes the conflict visible instead of silently shrinking or
    altering the declared grid.
    """

    tau_b: float
    tau_r: float
    alpha: float
    hill_n: float = 1.0
    n_b: int = 1

    @property
    def beta(self) -> float:
        return 1.0 - self.alpha

    @property
    def admissible(self) -> bool:
        return self.tau_r > self.tau_b

    def validated(self) -> DKCParameters:
        """Return a validated fit parameter set or raise for an invalid point."""
        return DKCParameters(
            tau_b=self.tau_b,
            tau_r=self.tau_r,
            alpha=self.alpha,
            hill_n=self.hill_n,
            n_b=self.n_b,
        )


BASE_TAU_B = (0.5, 1.0, 1.5, 2.0, 2.5, 3.0, 4.0, 5.0)
BASE_TAU_R = (5.0, 7.0, 10.0, 12.0, 15.0, 18.0, 20.0, 25.0)
BASE_ALPHA = (0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7)

REFINED_TAU_B = (0.3, 0.5, 0.7, 1.0, 1.5, 2.0)
REFINED_TAU_R = (5.0, 8.0, 10.0, 12.0, 15.0, 20.0)
REFINED_ALPHA = (0.2, 0.3, 0.4, 0.5, 0.6)
REFINED_HILL_N = (1.0, 1.5, 2.0, 2.5, 3.0, 3.5)
REFINED_N_B = (2, 3, 4, 5)


BASE_GRID: tuple[DKCGridPoint, ...] = tuple(
    DKCGridPoint(tau_b=tau_b, tau_r=tau_r, alpha=alpha)
    for tau_b, tau_r, alpha in product(BASE_TAU_B, BASE_TAU_R, BASE_ALPHA)
)

REFINED_GRID: tuple[DKCGridPoint, ...] = tuple(
    DKCGridPoint(
        tau_b=tau_b,
        tau_r=tau_r,
        alpha=alpha,
        hill_n=hill_n,
        n_b=n_b,
    )
    for tau_b, tau_r, alpha, hill_n, n_b in product(
        REFINED_TAU_B,
        REFINED_TAU_R,
        REFINED_ALPHA,
        REFINED_HILL_N,
        REFINED_N_B,
    )
)

# Only these points may enter a fit.  Seven equality points from the exact
# base Cartesian product are intentionally absent; the refined grid is fully
# admissible.
VALID_BASE_GRID: tuple[DKCParameters, ...] = tuple(
    point.validated() for point in BASE_GRID if point.admissible
)
VALID_REFINED_GRID: tuple[DKCParameters, ...] = tuple(
    point.validated() for point in REFINED_GRID if point.admissible
)


def bic_score(n_obs: int, mse: float, k: int) -> float:
    """Return ``n_obs * ln(mse) + k * ln(n_obs)`` without hidden corrections."""
    resolved_n = _integer("n_obs", n_obs, minimum=1)
    resolved_k = _integer("k", k, minimum=0)
    resolved_mse = _finite_real("mse", mse)
    if resolved_mse <= 0.0:
        raise ValueError("mse must be positive")
    return resolved_n * math.log(resolved_mse) + resolved_k * math.log(resolved_n)


def bic(n_obs: int, mse: float, k: int) -> float:
    """Readable alias for :func:`bic_score`."""
    return bic_score(n_obs=n_obs, mse=mse, k=k)


@dataclass(frozen=True)
class TechnologyTimingProxy:
    """One explicitly labelled national technology-timing proxy value."""

    geography_id: str
    year: int
    value: float
    source_id: str
    measurement_type: str = PROXY
    variable_role: str = TECHNOLOGY_TIMING_PROXY

    def __post_init__(self) -> None:
        if not isinstance(self.geography_id, str) or not self.geography_id.strip():
            raise ValueError("geography_id must be a non-empty string")
        if not isinstance(self.source_id, str) or not self.source_id.strip():
            raise ValueError("source_id must be a non-empty string")
        year = _integer("year", self.year, minimum=1)
        value = _finite_real("value", self.value)
        if value < 0.0:
            raise ValueError("technology-timing proxy value must be non-negative")
        if self.measurement_type != PROXY:
            raise ValueError(f"measurement_type must be {PROXY!r}")
        if self.variable_role != TECHNOLOGY_TIMING_PROXY:
            raise ValueError(f"variable_role must be {TECHNOLOGY_TIMING_PROXY!r}")
        object.__setattr__(self, "geography_id", self.geography_id.strip())
        object.__setattr__(self, "source_id", self.source_id.strip())
        object.__setattr__(self, "year", year)
        object.__setattr__(self, "value", value)


def _mapping_copy(row: Mapping[str, Any]) -> dict[str, Any]:
    if not isinstance(row, Mapping):
        raise ValueError("every observation must be a mapping")
    return dict(row)


def _first_present(row: Mapping[str, Any], keys: tuple[str, ...]) -> Any:
    for key in keys:
        if key in row and row[key] is not None and str(row[key]).strip() != "":
            return row[key]
    return None


def _country(row: Mapping[str, Any], requested_key: str | None) -> str:
    keys = (
        (requested_key,)
        if requested_key
        else (
            "geography_id",
            "country_iso3",
            "country",
        )
    )
    value = _first_present(row, tuple(key for key in keys if key is not None))
    if not isinstance(value, str) or not value.strip():
        wanted = requested_key or "geography_id/country_iso3/country"
        raise ValueError(f"observation is missing non-empty country key {wanted!r}")
    return value.strip()


@dataclass(frozen=True)
class CountryHoldoutFold:
    """One country-held-out fold with an immutable row partition."""

    held_out_country: str
    train_rows: tuple[Mapping[str, Any], ...]
    test_rows: tuple[Mapping[str, Any], ...]
    country_key: str | None = None

    @property
    def train_countries(self) -> frozenset[str]:
        return frozenset(_country(row, self.country_key) for row in self.train_rows)

    @property
    def test_countries(self) -> frozenset[str]:
        return frozenset(_country(row, self.country_key) for row in self.test_rows)


def leave_one_country_out(
    observations: Iterable[Mapping[str, Any]],
    *,
    country_key: str | None = None,
) -> tuple[CountryHoldoutFold, ...]:
    """Create deterministic folds with the held-out country absent from training."""
    rows = tuple(_mapping_copy(row) for row in observations)
    if not rows:
        raise ValueError("observations must not be empty")
    countries_by_row = tuple(_country(row, country_key) for row in rows)
    countries = tuple(sorted(set(countries_by_row)))
    if len(countries) < 2:
        raise ValueError("leave-one-country-out requires at least two countries")

    folds: list[CountryHoldoutFold] = []
    for held_out in countries:
        train_rows = tuple(
            row for row, country in zip(rows, countries_by_row) if country != held_out
        )
        test_rows = tuple(
            row for row, country in zip(rows, countries_by_row) if country == held_out
        )
        train_ids = {country for country in countries_by_row if country != held_out}
        test_ids = {held_out} if test_rows else set()
        if train_ids & test_ids:
            raise RuntimeError(
                "country leakage detected while constructing holdout fold"
            )
        folds.append(
            CountryHoldoutFold(
                held_out_country=held_out,
                train_rows=train_rows,
                test_rows=test_rows,
                country_key=country_key,
            )
        )
    return tuple(folds)


@dataclass(frozen=True)
class ExcludedObservation:
    """A row rejected from a temporal comparison, with an auditable reason."""

    row: Mapping[str, Any]
    reason: str


@dataclass(frozen=True)
class TemporalHoldout:
    """Observed-outcome temporal partition and its explicit exclusions."""

    train_rows: tuple[Mapping[str, Any], ...]
    test_rows: tuple[Mapping[str, Any], ...]
    excluded_rows: tuple[ExcludedObservation, ...]
    train_end: int
    test_start: int
    test_end: int


def _outcome_status(row: Mapping[str, Any]) -> tuple[str, str, str]:
    source = _first_present(row, ("source_id", "tfr_source"))
    measurement = _first_present(row, ("measurement_type", "tfr_measurement_type"))
    series = _first_present(row, ("series_status", "tfr_series_status"))
    return (
        str(source or "").strip().upper(),
        str(measurement or "").strip().upper(),
        str(series or "").strip().upper(),
    )


def _ineligible_outcome_reason(row: Mapping[str, Any], year: int) -> str | None:
    source, measurement, series = _outcome_status(row)
    is_wpp = source.startswith("UN_WPP_")

    if series.startswith("PROJECTION"):
        return "WPP_PROJECTION_STATUS"
    if measurement == "DERIVED":
        return "DERIVED_OUTCOME"
    if measurement != "OBSERVED":
        return "OUTCOME_NOT_EXPLICITLY_OBSERVED"
    if is_wpp and year > WPP_LAST_OBSERVED_YEAR:
        return "WPP_AFTER_LAST_OBSERVED_YEAR"
    if is_wpp and series != "ESTIMATE":
        return "WPP_NON_ESTIMATE_STATUS"
    return None


def temporal_holdout(
    observations: Iterable[Mapping[str, Any]],
    *,
    train_end: int = 2015,
    test_start: int = 2016,
    test_end: int = 2024,
    year_key: str = "year",
    require_nonempty: bool = True,
) -> TemporalHoldout:
    """Split observed outcomes into train/test without treating projections as data.

    The default is the integration brief's main split: training through 2015
    and evaluation over 2016--2024.  WPP's 2024 row is retained in the
    exclusion ledger rather than entering the test set, because its provenance
    marks it ``DERIVED`` and ``PROJECTION_MEDIUM``.  Consequently the latest
    WPP year that can be scored is 2023.
    """
    resolved_train_end = _integer("train_end", train_end, minimum=1)
    resolved_test_start = _integer("test_start", test_start, minimum=1)
    resolved_test_end = _integer("test_end", test_end, minimum=1)
    if resolved_test_start <= resolved_train_end:
        raise ValueError("test_start must be greater than train_end")
    if resolved_test_end < resolved_test_start:
        raise ValueError("test_end must be greater than or equal to test_start")

    train: list[dict[str, Any]] = []
    test: list[dict[str, Any]] = []
    excluded: list[ExcludedObservation] = []

    for source_row in observations:
        row = _mapping_copy(source_row)
        if year_key not in row:
            raise ValueError(f"observation is missing year key {year_key!r}")
        year = _integer("observation year", row[year_key], minimum=1)
        reason = _ineligible_outcome_reason(row, year)
        if reason is not None:
            excluded.append(ExcludedObservation(row=row, reason=reason))
            continue
        if year <= resolved_train_end:
            train.append(row)
        elif resolved_test_start <= year <= resolved_test_end:
            test.append(row)
        else:
            excluded.append(
                ExcludedObservation(row=row, reason="OUTSIDE_TEMPORAL_HOLDOUT")
            )

    if require_nonempty and not train:
        raise ValueError("temporal holdout has no eligible training observations")
    if require_nonempty and not test:
        raise ValueError("temporal holdout has no eligible test observations")

    return TemporalHoldout(
        train_rows=tuple(train),
        test_rows=tuple(test),
        excluded_rows=tuple(excluded),
        train_end=resolved_train_end,
        test_start=resolved_test_start,
        test_end=resolved_test_end,
    )


@dataclass(frozen=True)
class ModelMetadata:
    """Predeclared interpretation and parameter budget for one model family."""

    model_id: str
    label: str
    parameter_count: int | tuple[int, int]
    status: str
    input_role: str | None


MODEL_METADATA: dict[str, ModelMetadata] = {
    "M0": ModelMetadata("M0", "constant_baseline", 0, "READY", None),
    "M1": ModelMetadata(
        "M1", "cumulative_technology_timing_proxy", 1, "READY", TECHNOLOGY_TIMING_PROXY
    ),
    "M2": ModelMetadata(
        "M2", "single_exponential_kernel", 2, "READY", TECHNOLOGY_TIMING_PROXY
    ),
    "M3": ModelMetadata(
        "M3", "base_dual_kernel_candidate", 4, "CANDIDATE", TECHNOLOGY_TIMING_PROXY
    ),
    "M4": ModelMetadata(
        "M4",
        "refined_dual_kernel_candidate",
        (8, 10),
        NOT_IDENTIFIABLE_WITH_CURRENT_DATA,
        TECHNOLOGY_TIMING_PROXY,
    ),
}


@dataclass(frozen=True)
class ModelScore:
    """A comparable BIC score or an explicit not-identifiable record."""

    model_id: str
    status: str
    n_obs: int | None
    mse: float | None
    k: int | None
    bic: float | None


def make_model_score(
    model_id: str,
    *,
    n_obs: int | None = None,
    mse: float | None = None,
    k: int | None = None,
) -> ModelScore:
    """Build one model score without imposing or assuming a winner ordering."""
    try:
        metadata = MODEL_METADATA[model_id]
    except KeyError as exc:
        raise ValueError(f"unknown model_id: {model_id!r}") from exc

    if metadata.status == NOT_IDENTIFIABLE_WITH_CURRENT_DATA:
        if n_obs is not None or mse is not None or k is not None:
            raise ValueError(
                f"{model_id} is {NOT_IDENTIFIABLE_WITH_CURRENT_DATA} and cannot "
                "receive a comparative BIC score"
            )
        return ModelScore(
            model_id=model_id,
            status=metadata.status,
            n_obs=None,
            mse=None,
            k=None,
            bic=None,
        )

    if n_obs is None or mse is None:
        raise ValueError("identified model scores require n_obs and mse")
    if k is None:
        if not isinstance(metadata.parameter_count, int):
            raise ValueError("k is required when the parameter budget is a range")
        k = metadata.parameter_count
    score = bic_score(n_obs=n_obs, mse=mse, k=k)
    return ModelScore(
        model_id=model_id,
        status=metadata.status,
        n_obs=int(n_obs),
        mse=float(mse),
        k=int(k),
        bic=score,
    )


__all__ = [
    "BASE_ALPHA",
    "BASE_GRID",
    "BASE_TAU_B",
    "BASE_TAU_R",
    "CountryHoldoutFold",
    "DKCGridPoint",
    "DKCParameters",
    "ExcludedObservation",
    "MODEL_METADATA",
    "ModelMetadata",
    "ModelScore",
    "NOT_IDENTIFIABLE_WITH_CURRENT_DATA",
    "PROXY",
    "REFINED_ALPHA",
    "REFINED_GRID",
    "REFINED_HILL_N",
    "REFINED_N_B",
    "REFINED_TAU_B",
    "REFINED_TAU_R",
    "TECHNOLOGY_TIMING_PROXY",
    "TechnologyTimingProxy",
    "TemporalHoldout",
    "VALID_BASE_GRID",
    "VALID_REFINED_GRID",
    "WPP_LAST_OBSERVED_YEAR",
    "bic",
    "bic_score",
    "leave_one_country_out",
    "make_model_score",
    "temporal_holdout",
]
