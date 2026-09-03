"""Descriptive technology-timing cohort/ASFR signature for BERM validation.

The calculation asks a narrow question implied by BERM's developmental-memory
premise: do younger reproductive cohorts, whose early-life *technology timing
proxy* is higher than older cohorts, have a more negative young-versus-older
ASFR change?  It deliberately does not call the proxy a physical FieldState,
fit an EMF coefficient, or change the v2 outcome model.

It is a proxy-only diagnostic that can inform the design of a future matched
FieldState panel.  It is not obtained from FieldState and supplies no biological bridge, so its
output always carries ``PROXY_ONLY`` status.
"""

from __future__ import annotations

import csv
from dataclasses import dataclass
import math
from pathlib import Path
from typing import Callable, Mapping

from berm.data.wpp import AGE_GROUPS
from berm.v16 import vulnerability_by_age


COHORT_SIGNATURE_VERSION = "fieldstate-cohort-signature-v1"
PROXY_STATUS = "TECHNOLOGY_TIMING_PROXY_NOT_FIELDSTATE"

AGE_MIDPOINTS: Mapping[str, int] = {
    "15-19": 17,
    "20-24": 22,
    "25-29": 27,
    "30-34": 32,
    "35-39": 37,
    "40-44": 42,
    "45-49": 47,
}
YOUNG_GROUPS = ("15-19", "20-24", "25-29")
OLDER_GROUPS = ("30-34", "35-39", "40-44", "45-49")
DEVELOPMENTAL_AGES = tuple(range(-1, 18))


def _mean(values: list[float]) -> float:
    if not values:
        raise ValueError("cannot take the mean of no values")
    return sum(values) / len(values)


def interpolate_observed_series(series: Mapping[int, float], year: int) -> float | None:
    """Interpolate inside observed bounds only; never extrapolate a proxy."""
    years = sorted(series)
    if not years or year < years[0] or year > years[-1]:
        return None
    if year in series:
        return float(series[year])
    upper = next(index for index, candidate in enumerate(years) if candidate > year)
    lo_year, hi_year = years[upper - 1], years[upper]
    return float(series[lo_year]) + (float(series[hi_year]) - float(series[lo_year])) * (
        (year - lo_year) / (hi_year - lo_year)
    )


def developmental_timing_proxy(
    series: Mapping[int, float],
    birth_year: int,
    *,
    ages: tuple[int, ...] = DEVELOPMENTAL_AGES,
    vulnerability: Callable[[float], float] = vulnerability_by_age,
) -> float | None:
    """Vulnerability-weighted technology timing proxy, fetal year through 17."""
    terms: list[tuple[float, float]] = []
    for age in ages:
        value = interpolate_observed_series(series, birth_year + age)
        if value is None:
            return None
        weight = float(vulnerability(age))
        if weight < 0.0:
            raise ValueError("vulnerability weights must be non-negative")
        terms.append((weight, value))
    denominator = sum(weight for weight, _ in terms)
    if denominator <= 0.0:
        raise ValueError("developmental vulnerability weights must sum to > 0")
    return sum(weight * value for weight, value in terms) / denominator


@dataclass(frozen=True)
class CohortASFRSignatureRow:
    """One country-level, descriptive young/older cohort contrast."""

    geography_id: str
    cohort_timing_proxy_gap: float
    young_minus_older_asfr_log_change: float
    young_log_change: float
    older_log_change: float


@dataclass(frozen=True)
class CohortASFRSignatureResult:
    """Summary of a descriptive timing-proxy/ASFR signature."""

    version: str
    base_year: int
    target_year: int
    n_countries: int
    pearson_r: float | None
    proxy_status: str
    rows: tuple[CohortASFRSignatureRow, ...]
    source_ids: tuple[str, ...]
    limitations: tuple[str, ...]

    def as_dict(self) -> dict:
        return {
            "version": self.version,
            "base_year": self.base_year,
            "target_year": self.target_year,
            "n_countries": self.n_countries,
            "pearson_r": self.pearson_r,
            "proxy_status": self.proxy_status,
            "source_ids": self.source_ids,
            "limitations": self.limitations,
            "rows": [row.__dict__ for row in self.rows],
        }


def pearson_r(rows: tuple[CohortASFRSignatureRow, ...]) -> float | None:
    """Dependency-free correlation; p values belong to an external analysis plan."""
    if len(rows) < 2:
        return None
    x = [row.cohort_timing_proxy_gap for row in rows]
    y = [row.young_minus_older_asfr_log_change for row in rows]
    x_mean, y_mean = _mean(x), _mean(y)
    numerator = sum((a - x_mean) * (b - y_mean) for a, b in zip(x, y, strict=True))
    denominator_x = sum((a - x_mean) ** 2 for a in x)
    denominator_y = sum((b - y_mean) ** 2 for b in y)
    if denominator_x == 0.0 or denominator_y == 0.0:
        return None
    return numerator / math.sqrt(denominator_x * denominator_y)


def build_cohort_asfr_signature(
    *,
    mobile_proxy_by_country_year: Mapping[str, Mapping[int, float]],
    asfr_by_country_year: Mapping[tuple[str, int], Mapping[str, float]],
    base_year: int = 2000,
    target_year: int = 2023,
    countries: set[str] | None = None,
) -> CohortASFRSignatureResult:
    """Compute the national timing-proxy cohort signature.

    The output is a diagnostic to compare against a measurement-ready v2
    FieldState panel later.  It is neither derived from FieldState nor a
    biological bridge and must never be fed into ``RegisteredOrganIncrement``.
    """
    candidate_countries = set(mobile_proxy_by_country_year)
    candidate_countries &= {country for country, _ in asfr_by_country_year}
    if countries is not None:
        candidate_countries &= countries

    rows: list[CohortASFRSignatureRow] = []
    for country in sorted(candidate_countries):
        baseline = asfr_by_country_year.get((country, base_year), {})
        target = asfr_by_country_year.get((country, target_year), {})
        if not all(group in baseline and group in target for group in AGE_GROUPS):
            continue
        proxies = {
            group: developmental_timing_proxy(
                mobile_proxy_by_country_year[country], target_year - AGE_MIDPOINTS[group]
            )
            for group in AGE_GROUPS
        }
        if any(value is None for value in proxies.values()):
            continue
        young_change = _mean([
            math.log((float(target[group]) + 1.0) / (float(baseline[group]) + 1.0))
            for group in YOUNG_GROUPS
        ])
        older_change = _mean([
            math.log((float(target[group]) + 1.0) / (float(baseline[group]) + 1.0))
            for group in OLDER_GROUPS
        ])
        rows.append(CohortASFRSignatureRow(
            geography_id=country,
            cohort_timing_proxy_gap=(
                _mean([float(proxies[group]) for group in YOUNG_GROUPS])
                - _mean([float(proxies[group]) for group in OLDER_GROUPS])
            ),
            young_minus_older_asfr_log_change=young_change - older_change,
            young_log_change=young_change,
            older_log_change=older_change,
        ))

    result_rows = tuple(rows)
    return CohortASFRSignatureResult(
        version=COHORT_SIGNATURE_VERSION,
        base_year=base_year,
        target_year=target_year,
        n_countries=len(result_rows),
        pearson_r=pearson_r(result_rows),
        proxy_status=PROXY_STATUS,
        rows=result_rows,
        source_ids=("UN_WPP_2024_ASFR", "WB_IT_CEL_SETS_P2"),
        limitations=(
            "Ecological country-level calculation.",
            "Mobile subscriptions are a technology timing proxy, not a physical FieldState or organ dose.",
            "Development, policy, demand, tempo and access to care may covary with technology adoption.",
        ),
    )


def load_processed_signature_inputs(
    data_dir: str | Path | None = None,
) -> tuple[dict[str, dict[int, float]], dict[tuple[str, int], dict[str, float]]]:
    """Load existing BERM WPP and World Bank/ITU products without mutation."""
    root = (
        Path(data_dir)
        if data_dir is not None
        else Path(__file__).resolve().parents[2] / "data" / "processed"
    )
    mobile: dict[str, dict[int, float]] = {}
    with (root / "mobile_by_country_year.csv").open(encoding="utf-8", newline="") as handle:
        for row in csv.DictReader(handle):
            mobile.setdefault(row["country_iso3"], {})[int(row["year"])] = float(row["subs_per_100"])
    asfr: dict[tuple[str, int], dict[str, float]] = {}
    with (root / "fertility_asfr_region_age_year.csv").open(encoding="utf-8", newline="") as handle:
        for row in csv.DictReader(handle):
            if row["measurement_type"] != "OBSERVED":
                continue
            asfr.setdefault((row["geography_id"], int(row["year"])), {})[row["age_group"]] = float(row["value"])
    return mobile, asfr


def run_processed_cohort_asfr_signature(
    *,
    data_dir: str | Path | None = None,
    base_year: int = 2000,
    target_year: int = 2023,
    countries: set[str] | None = None,
) -> CohortASFRSignatureResult:
    """Convenience read-only analysis over BERM's ingested WPP/WB products."""
    mobile, asfr = load_processed_signature_inputs(data_dir)
    return build_cohort_asfr_signature(
        mobile_proxy_by_country_year=mobile,
        asfr_by_country_year=asfr,
        base_year=base_year,
        target_year=target_year,
        countries=countries,
    )


__all__ = [
    "AGE_MIDPOINTS",
    "COHORT_SIGNATURE_VERSION",
    "DEVELOPMENTAL_AGES",
    "PROXY_STATUS",
    "CohortASFRSignatureResult",
    "CohortASFRSignatureRow",
    "build_cohort_asfr_signature",
    "developmental_timing_proxy",
    "interpolate_observed_series",
    "pearson_r",
    "load_processed_signature_inputs",
    "run_processed_cohort_asfr_signature",
]
