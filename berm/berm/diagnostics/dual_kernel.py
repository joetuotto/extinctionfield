"""Dual-Kernel Convolution (DKC) framework — DIAGNOSTIC_ONLY.

Nothing in this module feeds the TFR prediction pipeline. It implements the
four DKC constructs and the identification test that decides whether the
framework's two-kernel decomposition is estimable from the data BERM holds.

Framework
---------
The DKC framework writes the fertility response as the sum of two
convolutions of the same technology-diffusion exposure signal:

    F(t) = alpha * (E * k_B)(t) + beta * (E * k_R)(t)

    k_B  fast behavioural kernel   (time displacement, dating, social time)
    k_R  slow biological kernel    (ROS accumulation, Leydig damage, T decline)

Each kernel is a normalised discrete exponential, so its weights sum to one
and its mean lag equals tau. That normalisation is what makes alpha and beta
comparable across different tau values:

    conv_tau(t) = (1 - r) * sum_{l>=0} E(t-l) * r^l ,   r = exp(-1/tau)

Identification result (2026-09-04, this module's own test)
---------------------------------------------------------
``fit_age_resolved_kernels`` fits a single kernel per WPP age group on 54
countries x 5 waves of age-specific fertility rates, with country fixed
effects and a log response. The fast kernel is sharply identified and its
suppression slope falls monotonically with age; no slow kernel appears.

``dual_kernel_identifiability`` shows why. Over every tau pair in the
framework's own predicted range the two kernel regressors correlate at
r >= 0.98, because every country's exposure history is a smooth monotone
sigmoid. Under the framework's own sign constraint (alpha, beta >= 0) the
slow kernel's weight goes to zero at every pair tested. An unconstrained fit
does improve BIC, but only by using the two kernels as a sign-opposed
difference — a numerical derivative, not a fast/slow decomposition.

The consequence is structural, not a data-volume problem: a monotone
exposure ramp cannot separate two exponential memories. Separating them
needs a non-monotone exposure shock (the COVID ambient dip) or a design in
which one calendar year maps to several cumulative histories (cohort data).
Until then the DKC decomposition stays a testable candidate.  This diagnostic
does not alter the separately content-addressed F1--F9 falsification register.
"""

from __future__ import annotations

import json
import math
from pathlib import Path
from typing import NamedTuple

from berm.data.countries import (
    COUNTRY_PARAMS,
    IOT_DEVICES_2024,
    SMARTPHONE_IN_BEDROOM,
    TECH_DIFFUSION,
    get_country_params,
)
from berm.v16 import (
    chi,
    iot_devices_per_household,
    phone_body_contact_hours,
    smartphone_penetration,
    v16_ambient_annual,
    v16_personal_annual,
    wifi_penetration,
)

__all__ = [
    "TAU_B_FITTED",
    "TAU_B_BIC_RANGE",
    "AGE_KERNEL_SLOPES",
    "KERNEL_COLLINEARITY",
    "REPAIR_HALF_LIFE_HOURS",
    "KernelResponse",
    "RecoveryState",
    "dual_kernel_response",
    "kernel_weight",
    "convolve_exposure",
    "recovery_ratio",
    "recovery_state",
    "spectral_complexity",
    "density_tech_interaction",
    "fit_age_resolved_kernels",
    "dual_kernel_identifiability",
]


# === Fitted constants (provenance: fit_age_resolved_kernels, 2026-09-04) ===

#: Best-fitting fast-kernel time constant in years, WPP ASFR ages 15-29.
TAU_B_FITTED = 1.0

#: Tau values within 2 BIC units of the optimum at ages 15-19.
TAU_B_BIC_RANGE = (0.5, 2.0)

#: Suppression slope on log ASFR per unit convolved exposure, by age group.
#: Positive = suppression. The sign flip at 35+ is the postponement signature.
AGE_KERNEL_SLOPES = {
    "15-19": 0.2576,
    "20-24": 0.2335,
    "25-29": 0.1457,
    "30-34": 0.0430,
    "35-39": -0.1072,
    "40-44": -0.1982,
}

#: Pearson r between the fast and slow kernel regressors, by (tau_B, tau_R).
KERNEL_COLLINEARITY = {
    (1.5, 12.0): 0.9916,
    (1.0, 20.0): 0.9838,
    (4.0, 6.0): 0.9996,
}

#: Oxidative-repair half-life in hours. Shared with diagnostics.covid_lockdown
#: so that both modules report the same recovery arithmetic.
REPAIR_HALF_LIFE_HOURS = 6.0
_REPAIR_TAU_HOURS = REPAIR_HALF_LIFE_HOURS / math.log(2)  # ~8.656 h

#: Exposure-free fraction of the day below which repair per cycle falls under
#: one half of the damage accrued, i.e. the accumulating regime.
RECOVERY_RATIO_CRITICAL = 0.25

_PANEL_PATH = (
    Path(__file__).resolve().parents[3]
    / "berm"
    / "data"
    / "global"
    / "all_countries_panel.json"
)
_BURN_IN_YEARS = 45


class KernelResponse(NamedTuple):
    """Split of the DKC response into its two kernel arms."""

    country: str
    year: int
    behavioral: float
    biological: float
    total: float
    biological_share: float


class RecoveryState(NamedTuple):
    """Recovery-window state for one country-year."""

    country: str
    year: int
    exposed_hours: float
    free_hours: float
    recovery_ratio: float
    repair_fraction: float
    net_daily_damage: float
    accumulating: bool


# === Kernels ===


def kernel_weight(lag: int, tau: float) -> float:
    """Normalised discrete exponential weight at `lag` years.

    Weights over lag 0..inf sum to 1 and have mean lag `tau`, so slopes
    fitted with different tau values stay on the same scale.
    """
    if tau <= 0:
        raise ValueError("tau must be positive")
    r = math.exp(-1.0 / tau)
    return (1.0 - r) * (r**lag)


def annual_exposure(country: str, year: int) -> float:
    """Legacy normalized proxy: ambient + chi(ambient) * personal.

    These country series are dimensionless technology-timing coordinates, not
    raw V/m values or calibrated FieldState measurements.  Their identification
    with the reduced L1 coordinate is a separate open L0-to-L2 mapping.
    """
    ambient = v16_ambient_annual(country, year)
    personal = v16_personal_annual(country, year)
    return ambient + chi(ambient) * personal


def convolve_exposure(
    country: str, year: int, tau: float, burn_in: int = _BURN_IN_YEARS
) -> float:
    """Convolve the country's exposure history with one exponential kernel."""
    total = 0.0
    for lag in range(0, burn_in + 1):
        total += annual_exposure(country, year - lag) * kernel_weight(lag, tau)
    return total


def dual_kernel_response(
    country: str,
    year: int,
    tau_b: float = TAU_B_FITTED,
    tau_r: float = 12.0,
    alpha: float = 0.7,
    beta: float | None = None,
) -> KernelResponse:
    """Split the DKC response into behavioural and biological arms.

    The normalization constraint is exact: ``beta=1-alpha``.  ``beta`` remains
    as a compatibility argument, but a mismatching value is rejected rather
    than becoming an independent degree of freedom.
    """
    if not 0.0 <= alpha <= 1.0:
        raise ValueError("alpha must be between zero and one")
    resolved_beta = 1.0 - alpha
    if beta is not None and not math.isclose(
        beta,
        resolved_beta,
        rel_tol=0.0,
        abs_tol=1e-12,
    ):
        raise ValueError("beta must equal 1-alpha")
    if tau_r <= tau_b:
        raise ValueError("tau_r must be greater than tau_b")
    behavioral = alpha * convolve_exposure(country, year, tau_b)
    biological = resolved_beta * convolve_exposure(country, year, tau_r)
    total = behavioral + biological
    share = biological / total if total else 0.0
    return KernelResponse(country, year, behavioral, biological, total, share)


# === Recovery window ===


def recovery_ratio(country: str, year: int) -> float:
    """Exposure-free fraction of the 24-hour day.

    Waking screen contact and a phone kept in the bedroom overnight both
    consume the exposure-free window. Pre-smartphone the free window is the
    sleep period; at full penetration it approaches the residual hours only.
    """
    penetration = smartphone_penetration(country, year)
    bedroom_fraction = SMARTPHONE_IN_BEDROOM.get(country, 0.55)
    screen_hours = phone_body_contact_hours(year) * penetration
    sleep_near_hours = 8.0 * bedroom_fraction * penetration
    free_hours = max(0.0, 24.0 - screen_hours - sleep_near_hours)
    return free_hours / 24.0


def recovery_state(country: str, year: int) -> RecoveryState:
    """Recovery-window state and the repair arithmetic that follows from it.

    Repair follows first-order kinetics with a 6-hour half-life, the same
    constant `diagnostics.covid_lockdown` uses, so the two modules agree:

        repaired fraction = 1 - exp(-free_hours / tau),  tau = 6 / ln 2

    `accumulating` is the pharmacokinetic reading: when the exposure-free
    interval is short relative to the repair half-life, each cycle clears
    less than it accrues and damage carries over into the next day.
    """
    ratio = recovery_ratio(country, year)
    free_hours = ratio * 24.0
    exposed_hours = 24.0 - free_hours
    repair_fraction = 1.0 - math.exp(-free_hours / _REPAIR_TAU_HOURS)
    net_daily_damage = exposed_hours * (1.0 - repair_fraction)
    return RecoveryState(
        country=country,
        year=year,
        exposed_hours=exposed_hours,
        free_hours=free_hours,
        recovery_ratio=ratio,
        repair_fraction=repair_fraction,
        net_daily_damage=net_daily_damage,
        accumulating=ratio < RECOVERY_RATIO_CRITICAL,
    )


# === Spectral complexity ===


def spectral_complexity(country: str, year: int) -> float:
    """Shannon-scaled count of simultaneously active frequency bands.

    Each technology generation adds bands without retiring the previous
    ones, so band count is cumulative. The return value is log2(1 + bands),
    which is the Shannon form: adding bands raises capacity-for-noise
    logarithmically, not linearly.
    """
    td = TECH_DIFFUSION.get(country)
    if td is None:
        return math.log2(2.0)  # broadcast baseline only

    bands = 1.0  # FM/TV broadcast baseline
    if year >= td.start:
        bands += 1.0  # 2G
    if year >= td.year_3g:
        bands += 2.0
    if year >= td.year_4g:
        bands += 3.0
    if year >= td.year_5g:
        bands += 4.0

    bands += wifi_penetration(country, year) * 2.0
    if IOT_DEVICES_2024.get(country) is not None:
        bands += min(iot_devices_per_household(country, year) / 10.0, 2.0)

    return math.log2(1.0 + bands)


# === Density x technology ===


def density_tech_interaction(country: str, year: int) -> float:
    """Population density x technology penetration x spectral complexity.

    Ambient exposure from base stations scales with how densely the
    transmitters are packed, so density and penetration should enter as a
    product rather than as two additive covariates.

    Raises
    ------
    KeyError
        If the country has no measured population density. `get_country_params`
        silently substitutes a 50 /km2 default for unknown countries, which
        would put Hong Kong-class densities two orders of magnitude low; this
        function refuses that substitution instead of hiding it.
    """
    if country not in COUNTRY_PARAMS:
        raise KeyError(
            f"{country!r} has no measured population density in COUNTRY_PARAMS; "
            "get_country_params would return the 50/km2 fallback"
        )
    density = get_country_params(country).pop_density
    penetration = smartphone_penetration(country, year)
    return math.log1p(density) * penetration * spectral_complexity(country, year)


# === Identification tests ===


def _panel_tfr(
    y0: int = 1990, y1: int = 2024, min_years: int = 25
) -> dict[str, dict[int, float]]:
    """Country -> {year: TFR} from the WPP/World Bank annual panel."""
    import re

    with _PANEL_PATH.open(encoding="utf-8") as handle:
        panel = json.load(handle)

    overrides = {
        "SouthKorea": "KOR",
        "USA": "USA",
        "Iran": "IRN",
        "DRCongo": "COD",
        "Egypt": "EGY",
        "Turkey": "TUR",
        "UAE": "ARE",
        "UK": "GBR",
    }

    def norm(text: str | None) -> str:
        return re.sub(r"[^a-z]", "", (text or "").lower())

    by_name = {}
    for iso, record in panel["countries"].items():
        key = norm(record.get("country_name"))
        if key:
            by_name[key] = iso

    out: dict[str, dict[int, float]] = {}
    for country in sorted(set(TECH_DIFFUSION) & set(COUNTRY_PARAMS)):
        iso = overrides.get(country) or by_name.get(norm(country))
        if not iso or iso not in panel["countries"]:
            continue
        years = panel["countries"][iso]["years"]
        series = {}
        for year in range(y0, y1 + 1):
            record = years.get(str(year))
            if record and isinstance(record.get("tfr"), (int, float)):
                series[year] = float(record["tfr"])
        if len(series) >= min_years:
            out[country] = series
    return out


def _ols_fixed_effects(
    rows: list[tuple[str, float, list[float]]], countries: list[str]
) -> tuple[list[float], float]:
    """Least squares with country dummies plus k global slopes.

    Slopes enter with a negative sign so a positive slope means suppression.
    Returns (slopes, sum of squared errors).
    """
    k = len(rows[0][2])
    index = {c: i for i, c in enumerate(countries)}
    n_par = len(countries) + k
    ata = [[0.0] * n_par for _ in range(n_par)]
    atb = [0.0] * n_par
    for country, response, regressors in rows:
        row = [0.0] * n_par
        row[index[country]] = 1.0
        for j, value in enumerate(regressors):
            row[len(countries) + j] = -value
        for i in range(n_par):
            if row[i] == 0.0:
                continue
            atb[i] += row[i] * response
            for j in range(n_par):
                if row[j] != 0.0:
                    ata[i][j] += row[i] * row[j]
    coefficients = _solve(ata, atb)
    sse = 0.0
    for country, response, regressors in rows:
        predicted = coefficients[index[country]] - sum(
            coefficients[len(countries) + j] * value
            for j, value in enumerate(regressors)
        )
        sse += (response - predicted) ** 2
    return coefficients[len(countries) :], sse


def _solve(a: list[list[float]], b: list[float]) -> list[float]:
    """Gauss-Jordan solve with partial pivoting and a ridge on singularity."""
    n = len(b)
    m = [row[:] + [b[i]] for i, row in enumerate(a)]
    for i in range(n):
        pivot_row = max(range(i, n), key=lambda r: abs(m[r][i]))
        if abs(m[pivot_row][i]) < 1e-12:
            m[i][i] += 1e-9
            pivot_row = i
        m[i], m[pivot_row] = m[pivot_row], m[i]
        pivot = m[i][i]
        for j in range(i, n + 1):
            m[i][j] /= pivot
        for r in range(n):
            if r != i and m[r][i] != 0.0:
                factor = m[r][i]
                for j in range(i, n + 1):
                    m[r][j] -= factor * m[i][j]
    return [m[i][n] for i in range(n)]


def fit_age_resolved_kernels(
    taus: tuple[float, ...] = (
        0.5,
        1.0,
        1.5,
        2.0,
        3.0,
        4.0,
        6.0,
        8.0,
        10.0,
        12.0,
        15.0,
        20.0,
        30.0,
        40.0,
    ),
) -> dict[str, dict]:
    """Fit one kernel per WPP age group; report the tau the data prefers.

    The DKC framework predicts that the fast kernel dominates the young age
    groups and that the best-fitting tau rises with age as cumulative
    exposure activates the slow kernel. This is the test of that prediction.

    Returns one record per age group with the best tau, the suppression
    slope on log ASFR, and every tau within 2 BIC units of the optimum.
    """
    from berm.data.asfr import AGE_GROUPS, WPP_ASFR

    countries = sorted(set(WPP_ASFR) & set(TECH_DIFFUSION) & set(COUNTRY_PARAMS))
    exposure_cache: dict[tuple[str, float, int], float] = {}

    def cached_conv(country: str, year: int, tau: float) -> float:
        key = (country, tau, year)
        if key not in exposure_cache:
            exposure_cache[key] = convolve_exposure(country, year, tau)
        return exposure_cache[key]

    results: dict[str, dict] = {}
    for age_index, age_group in enumerate(AGE_GROUPS):
        fits = []
        for tau in taus:
            rows = []
            for country in countries:
                for year, values in WPP_ASFR[country].items():
                    rate = values[age_index]
                    if rate and rate > 0.5:
                        rows.append(
                            (country, math.log(rate), [cached_conv(country, year, tau)])
                        )
            if not rows:
                continue
            present = sorted({row[0] for row in rows})
            slopes, sse = _ols_fixed_effects(rows, present)
            n = len(rows)
            n_par = len(present) + 2  # dummies + slope + estimated tau
            bic = n * math.log(sse / n) + n_par * math.log(n)
            fits.append((bic, tau, slopes[0], math.sqrt(sse / n), n))
        if not fits:
            continue
        fits.sort()
        bic, tau, slope, rmse, n = fits[0]
        results[age_group] = {
            "tau": tau,
            "slope": slope,
            "rmse": rmse,
            "n": n,
            "bic": bic,
            "tau_within_2_bic": [t for b, t, *_ in fits if b - bic <= 2.0],
        }
    return results


def dual_kernel_identifiability(
    tau_pairs: tuple[tuple[float, float], ...] = ((1.5, 12.0), (1.0, 20.0), (4.0, 6.0)),
) -> dict[tuple[float, float], dict]:
    """Test whether the two kernels are separable on the TFR panel.

    For each tau pair, report the correlation between the two kernel
    regressors, the unconstrained (alpha, beta) fit, and the fit under the
    framework's own sign constraint alpha, beta >= 0.

    A pair is separable only if the constrained fit puts non-zero weight on
    the slow kernel. As of 2026-09-04 none of them does.
    """
    tfr = _panel_tfr()
    countries = sorted(tfr)
    cache: dict[tuple[str, float, int], float] = {}

    def cached_conv(country: str, year: int, tau: float) -> float:
        key = (country, tau, year)
        if key not in cache:
            cache[key] = convolve_exposure(country, year, tau)
        return cache[key]

    out: dict[tuple[float, float], dict] = {}
    for tau_b, tau_r in tau_pairs:
        fast, slow, rows = [], [], []
        for country, series in tfr.items():
            for year, value in series.items():
                cb = cached_conv(country, year, tau_b)
                cr = cached_conv(country, year, tau_r)
                fast.append(cb)
                slow.append(cr)
                rows.append((country, value, [cb, cr]))

        n = len(fast)
        mean_fast = sum(fast) / n
        mean_slow = sum(slow) / n
        cov = sum((a - mean_fast) * (b - mean_slow) for a, b in zip(fast, slow))
        var_fast = sum((a - mean_fast) ** 2 for a in fast)
        var_slow = sum((b - mean_slow) ** 2 for b in slow)
        correlation = cov / math.sqrt(var_fast * var_slow)

        (alpha, beta), sse = _ols_fixed_effects(rows, countries)

        # Constrained: reparameterise as scale * ((1-w)*fast + w*slow), w in [0,1],
        # which enforces alpha, beta >= 0 whenever scale >= 0.
        best = None
        for step in range(0, 101):
            w = step / 100.0
            mixed = [
                (country, value, [(1.0 - w) * regressors[0] + w * regressors[1]])
                for country, value, regressors in rows
            ]
            slopes, mixed_sse = _ols_fixed_effects(mixed, countries)
            if slopes[0] < 0.0:
                continue
            if best is None or mixed_sse < best[1]:
                best = (w, mixed_sse, slopes[0])

        out[(tau_b, tau_r)] = {
            "kernel_correlation": correlation,
            "unconstrained_alpha": alpha,
            "unconstrained_beta": beta,
            "unconstrained_rmse": math.sqrt(sse / n),
            "constrained_slow_weight": best[0] if best else None,
            "constrained_rmse": math.sqrt(best[1] / n) if best else None,
            "separable": bool(best and best[0] > 0.0),
        }
    return out
