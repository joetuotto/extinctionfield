"""BERM v18 Phase 1: Model comparison M0–M3 with LOOCV.

Four models compared on the same 2024 cross-section data:
  M0: Demographic baseline (no EMF)
  M1: Current BERM v17 (cumulative EMF with cohort weighting + retention)
  M2: Exponential decay weighted exposure (1 new parameter: τ)
  M3: Free-form weighted exposure (B-spline lag weights, 5 new parameters)

Each model is evaluated via leave-one-country-out cross-validation.
The left-out country gets the mean cultural rate from the remaining
countries; everything else (exposure, bio, behavioral) is computed
from the country's own data.
"""

from __future__ import annotations

import math
from dataclasses import dataclass, field

from berm.data.countries import (
    CULTURAL_TFR_PARAMS,
    TECH_DIFFUSION,
    V12_ACTUAL_TFR_2024,
)
from berm.v16 import (
    _get_td,
    chi,
    cultural_tfr,
    emf_behavioral_factor_v3,
    occupational_emf_multiplier,
    v16_ambient_annual,
    v16_biological_capacity,
    v16_personal_annual,
    vulnerability_by_age,
    v17_layer_retention,
    cohort_weighted_exposure_normalized,
    v16_adjusted_cumulative_exposure,
    calibrate_v16,
)


# ─── Helpers ────────────────────────────────────────────────────────

def _annual_emf(country: str, year: int) -> float:
    """Two-channel annual EMF: ambient + chi(ambient) * personal."""
    amb = v16_ambient_annual(country, year)
    pers = v16_personal_annual(country, year)
    return amb + chi(amb) * pers


def _bspline_basis(x: float, knots: list[float]) -> list[float]:
    """Evaluate normalized cubic B-spline basis at x.

    Returns one weight per inter-knot interval (len(knots) - 1 values).
    Uses a simple triangular basis for stability with few knots.
    """
    n = len(knots) - 1
    basis = []
    for i in range(n):
        lo = knots[i]
        hi = knots[i + 1]
        mid = (lo + hi) / 2.0
        half_w = (hi - lo) / 2.0
        if half_w < 1e-9:
            basis.append(0.0)
            continue
        dist = abs(x - mid) / half_w
        basis.append(max(0.0, 1.0 - dist))
    return basis


# ─── M0: Demographic baseline (no EMF) ─────────────────────────────

def m0_cultural_convergence(country: str, year: int) -> float:
    """TFR from cultural convergence alone, no EMF.

    Uses the same CULTURAL_TFR_PARAMS as v16 but treats
    the cultural curve as the ONLY driver of TFR.
    cultural_tfr(country, year) = a + b * exp(-c * (year - 1960))
    """
    return cultural_tfr(country, year)


def m0_predict(country: str, year: int, cultural_rate: float) -> float:
    """M0 prediction: TFR = cultural_rate * temporal_ratio.

    cultural_rate is calibrated as the observed TFR at 2024
    for training countries. For the left-out country,
    cultural_rate = mean of training set's observed TFR.
    The temporal ratio tracks the cultural evolution curve.
    """
    cult_2024 = cultural_tfr(country, 2024)
    if cult_2024 < 0.01:
        return cultural_rate
    ratio = cultural_tfr(country, year) / cult_2024
    return cultural_rate * ratio


def m0_calibrate_rate(country: str) -> float:
    """M0 cultural rate = observed TFR at 2024 (no decomposition)."""
    return V12_ACTUAL_TFR_2024[country]


# ─── M1: Current BERM v17 (existing infrastructure) ────────────────

def m1_predict(country: str, year: int, cultural_rate: float) -> float:
    """M1 prediction: current BERM = bioCap * behavioral * cultural.

    Uses the full v16/v17 pipeline with cohort-weighted exposure,
    5-layer retention, and occupational multiplier.
    """
    adj_cum = v16_adjusted_cumulative_exposure(country, year)
    bio_cap = v16_biological_capacity(adj_cum, country, year)
    behav = emf_behavioral_factor_v3(adj_cum)
    cult_ratio = cultural_tfr(country, year) / cultural_tfr(country, 2024)
    return bio_cap * behav * cultural_rate * cult_ratio


def m1_calibrate_rate(country: str) -> float:
    """Back-solve M1 cultural rate from observed 2024 TFR."""
    actual = V12_ACTUAL_TFR_2024[country]
    adj_cum = v16_adjusted_cumulative_exposure(country, 2024)
    bio_cap = v16_biological_capacity(adj_cum, country, 2024)
    behav = emf_behavioral_factor_v3(adj_cum)
    denom = bio_cap * behav
    if denom < 0.001:
        return 0.80
    return actual / denom


# ─── M2: Exponential decay weighted exposure ───────────────────────

def m2_weighted_exposure(country: str, year: int, tau: float) -> float:
    """Weighted cumulative exposure with exponential decay.

    w(lag) = exp(-lag / τ), normalized so Σw = 1.
    When τ → ∞, converges to equal weighting (like cumEMF).
    When τ → 0, only the current year matters.
    """
    td = _get_td(country)
    start = td.start

    if year < start:
        return 0.0

    wce = 0.0
    total_weight = 0.0
    for t in range(start, year + 1):
        lag = year - t
        weight = math.exp(-lag / tau)
        emf = _annual_emf(country, t)
        wce += weight * emf
        total_weight += weight

    if total_weight > 0:
        wce /= total_weight

    return wce


def m2_adjusted_exposure(country: str, year: int, tau: float) -> float:
    """M2 exposure with occupational multiplier applied."""
    wce = m2_weighted_exposure(country, year, tau)
    occ = occupational_emf_multiplier(country, year)
    # Scale to match adj_cum magnitude for bio/behav functions
    # Use the number of exposure years as a scaling factor
    td = _get_td(country)
    n_years = max(1, year - td.start + 1)
    return wce * occ * n_years


def m2_predict(country: str, year: int, tau: float,
               cultural_rate: float) -> float:
    """M2 prediction: bioCap(wce) * behavioral(wce) * cultural."""
    adj = m2_adjusted_exposure(country, year, tau)
    bio_cap = v16_biological_capacity(adj, country, year)
    behav = emf_behavioral_factor_v3(adj)
    cult_ratio = cultural_tfr(country, year) / cultural_tfr(country, 2024)
    return bio_cap * behav * cultural_rate * cult_ratio


def m2_calibrate_rate(country: str, tau: float) -> float:
    """Back-solve M2 cultural rate from observed 2024 TFR."""
    actual = V12_ACTUAL_TFR_2024[country]
    adj = m2_adjusted_exposure(country, 2024, tau)
    bio_cap = v16_biological_capacity(adj, country, 2024)
    behav = emf_behavioral_factor_v3(adj)
    denom = bio_cap * behav
    if denom < 0.001:
        return 0.80
    return actual / denom


# ─── M3: Free-form B-spline weighted exposure ──────────────────────

SPLINE_KNOTS = [0.0, 5.0, 10.0, 15.0, 20.0, 30.0]
N_SPLINE_COEFFS = len(SPLINE_KNOTS) - 1  # 5


def m3_weighted_exposure(country: str, year: int,
                         coeffs: list[float]) -> float:
    """Weighted cumulative exposure with B-spline lag weights.

    w(lag) = Σ θ_i * B_i(lag), where B_i are triangular basis functions.
    Coefficients θ are constrained to be non-negative.
    Normalized so Σw = 1.
    """
    td = _get_td(country)
    start = td.start

    if year < start:
        return 0.0

    wce = 0.0
    total_weight = 0.0
    for t in range(start, year + 1):
        lag = year - t
        basis = _bspline_basis(lag, SPLINE_KNOTS)
        weight = sum(max(0.0, c) * b for c, b in zip(coeffs, basis))
        weight = max(0.0, weight)
        emf = _annual_emf(country, t)
        wce += weight * emf
        total_weight += weight

    if total_weight > 0:
        wce /= total_weight

    return wce


def m3_adjusted_exposure(country: str, year: int,
                         coeffs: list[float]) -> float:
    """M3 exposure with occupational multiplier and year scaling."""
    wce = m3_weighted_exposure(country, year, coeffs)
    occ = occupational_emf_multiplier(country, year)
    td = _get_td(country)
    n_years = max(1, year - td.start + 1)
    return wce * occ * n_years


def m3_predict(country: str, year: int, coeffs: list[float],
               cultural_rate: float) -> float:
    """M3 prediction: bioCap(wce) * behavioral(wce) * cultural."""
    adj = m3_adjusted_exposure(country, year, coeffs)
    bio_cap = v16_biological_capacity(adj, country, year)
    behav = emf_behavioral_factor_v3(adj)
    cult_ratio = cultural_tfr(country, year) / cultural_tfr(country, 2024)
    return bio_cap * behav * cultural_rate * cult_ratio


def m3_calibrate_rate(country: str, coeffs: list[float]) -> float:
    """Back-solve M3 cultural rate from observed 2024 TFR."""
    actual = V12_ACTUAL_TFR_2024[country]
    adj = m3_adjusted_exposure(country, 2024, coeffs)
    bio_cap = v16_biological_capacity(adj, country, 2024)
    behav = emf_behavioral_factor_v3(adj)
    denom = bio_cap * behav
    if denom < 0.001:
        return 0.80
    return actual / denom


# ─── LOOCV Framework ───────────────────────────────────────────────


@dataclass
class LOOCVResult:
    """Result of leave-one-out cross-validation for one model."""
    model_name: str
    rmse: float
    mae: float
    bias: float
    max_error: float
    n: int
    per_country: dict[str, dict] = field(default_factory=dict)
    extra: dict = field(default_factory=dict)


def _loocv_m0(countries: list[str]) -> LOOCVResult:
    """LOOCV for M0 (demographic baseline, no EMF)."""
    per_country: dict[str, dict] = {}

    for leave_out in countries:
        train = [c for c in countries if c != leave_out]
        rates = {c: m0_calibrate_rate(c) for c in train}
        mean_rate = sum(rates.values()) / len(rates)

        predicted = m0_predict(leave_out, 2024, mean_rate)
        actual = V12_ACTUAL_TFR_2024[leave_out]
        error = predicted - actual

        per_country[leave_out] = {
            "predicted": round(predicted, 4),
            "actual": actual,
            "error": round(error, 4),
            "cultural_rate": round(mean_rate, 4),
        }

    return _build_result("M0_baseline", per_country)


def _loocv_m1(countries: list[str]) -> LOOCVResult:
    """LOOCV for M1 (current BERM v17)."""
    calibrate_v16()
    per_country: dict[str, dict] = {}

    for leave_out in countries:
        train = [c for c in countries if c != leave_out]
        rates = {c: m1_calibrate_rate(c) for c in train}
        mean_rate = sum(rates.values()) / len(rates)

        predicted = m1_predict(leave_out, 2024, mean_rate)
        actual = V12_ACTUAL_TFR_2024[leave_out]
        error = predicted - actual

        per_country[leave_out] = {
            "predicted": round(predicted, 4),
            "actual": actual,
            "error": round(error, 4),
            "cultural_rate": round(mean_rate, 4),
        }

    return _build_result("M1_cumEMF", per_country)


def _loocv_m2(countries: list[str], tau: float) -> LOOCVResult:
    """LOOCV for M2 (exponential decay) at a given τ."""
    per_country: dict[str, dict] = {}

    for leave_out in countries:
        train = [c for c in countries if c != leave_out]
        rates = {c: m2_calibrate_rate(c, tau) for c in train}
        mean_rate = sum(rates.values()) / len(rates)

        predicted = m2_predict(leave_out, 2024, tau, mean_rate)
        actual = V12_ACTUAL_TFR_2024[leave_out]
        error = predicted - actual

        per_country[leave_out] = {
            "predicted": round(predicted, 4),
            "actual": actual,
            "error": round(error, 4),
            "cultural_rate": round(mean_rate, 4),
        }

    result = _build_result("M2_exp_decay", per_country)
    result.extra["tau"] = tau
    return result


def _loocv_m3(countries: list[str],
              coeffs: list[float]) -> LOOCVResult:
    """LOOCV for M3 (B-spline weights) at given coefficients."""
    per_country: dict[str, dict] = {}

    for leave_out in countries:
        train = [c for c in countries if c != leave_out]
        rates = {c: m3_calibrate_rate(c, coeffs) for c in train}
        mean_rate = sum(rates.values()) / len(rates)

        predicted = m3_predict(leave_out, 2024, coeffs, mean_rate)
        actual = V12_ACTUAL_TFR_2024[leave_out]
        error = predicted - actual

        per_country[leave_out] = {
            "predicted": round(predicted, 4),
            "actual": actual,
            "error": round(error, 4),
            "cultural_rate": round(mean_rate, 4),
        }

    result = _build_result("M3_free_WCE", per_country)
    result.extra["coeffs"] = coeffs
    return result


def _build_result(name: str, per_country: dict[str, dict]) -> LOOCVResult:
    """Compute aggregate statistics from per-country results."""
    errors = [r["error"] for r in per_country.values()]
    abs_errors = [abs(e) for e in errors]
    n = len(errors)
    rmse = math.sqrt(sum(e ** 2 for e in errors) / n)
    mae = sum(abs_errors) / n
    bias = sum(errors) / n
    max_error = max(abs_errors)
    return LOOCVResult(
        model_name=name,
        rmse=round(rmse, 4),
        mae=round(mae, 4),
        bias=round(bias, 4),
        max_error=round(max_error, 4),
        n=n,
        per_country=per_country,
    )


# ─── τ Estimation (M2) ─────────────────────────────────────────────

TAU_GRID = (
    [0.5 * i for i in range(1, 10)]     # 0.5, 1.0, ..., 4.5
    + list(range(5, 20))                  # 5, 6, ..., 19
    + list(range(20, 55, 5))              # 20, 25, ..., 50
)


def estimate_tau(countries: list[str] | None = None,
                 tau_grid: list[float] | None = None) -> dict:
    """Find optimal τ via grid search over LOOCV RMSE.

    Returns dict with best_tau, best_rmse, all_results, interpretation.
    """
    if countries is None:
        countries = list(V12_ACTUAL_TFR_2024.keys())
    if tau_grid is None:
        tau_grid = TAU_GRID

    results: list[tuple[float, float]] = []
    for tau in tau_grid:
        r = _loocv_m2(countries, tau)
        results.append((tau, r.rmse))

    best_tau, best_rmse = min(results, key=lambda x: x[1])

    if best_tau > 30:
        interpretation = (
            f"τ = {best_tau:.1f}y > 30y: effect is essentially cumulative. "
            "cumEMF is the correct metric."
        )
    elif best_tau > 10:
        interpretation = (
            f"τ = {best_tau:.1f}y (10-30y): long-lasting but not fully cumulative. "
            "Partial recovery is meaningful."
        )
    elif best_tau > 3:
        interpretation = (
            f"τ = {best_tau:.1f}y (3-10y): medium-term effect. "
            "Recovery is significant; cumEMF overestimates."
        )
    else:
        interpretation = (
            f"τ = {best_tau:.1f}y < 3y: short-term effect. "
            "cumEMF is the wrong metric entirely."
        )

    return {
        "best_tau": best_tau,
        "best_rmse": best_rmse,
        "all_results": results,
        "interpretation": interpretation,
    }


# ─── M3 Coefficient Estimation ─────────────────────────────────────

M3_CANDIDATE_PROFILES = {
    "flat": [1.0, 1.0, 1.0, 1.0, 1.0],
    "recent": [3.0, 2.0, 1.0, 0.5, 0.2],
    "early": [0.2, 0.5, 1.0, 2.0, 3.0],
    "mid_peak": [0.5, 1.0, 3.0, 1.0, 0.5],
    "decay_5y": [3.0, 1.0, 0.3, 0.1, 0.05],
    "decay_15y": [1.5, 1.5, 1.0, 0.5, 0.1],
    "u_shaped": [2.0, 0.5, 0.5, 0.5, 2.0],
}


def estimate_m3_coeffs(countries: list[str] | None = None) -> dict:
    """Find best B-spline coefficients via candidate profile search.

    Full numerical optimization would require scipy; instead we evaluate
    a set of interpretable candidate profiles and pick the best.
    """
    if countries is None:
        countries = list(V12_ACTUAL_TFR_2024.keys())

    results: list[tuple[str, list[float], float]] = []
    for name, coeffs in M3_CANDIDATE_PROFILES.items():
        r = _loocv_m3(countries, coeffs)
        results.append((name, coeffs, r.rmse))

    best_name, best_coeffs, best_rmse = min(results, key=lambda x: x[2])

    return {
        "best_profile": best_name,
        "best_coeffs": best_coeffs,
        "best_rmse": best_rmse,
        "all_results": [(n, c, r) for n, c, r in results],
        "knots": SPLINE_KNOTS,
    }


# ─── Full Model Comparison ─────────────────────────────────────────

@dataclass
class ComparisonResult:
    """Full M0-M3 comparison results."""
    results: dict[str, LOOCVResult]
    winner: str
    tau_estimation: dict | None = None
    m3_estimation: dict | None = None


def compare_models(countries: list[str] | None = None) -> ComparisonResult:
    """Run full LOOCV comparison of M0, M1, M2, M3.

    Returns ComparisonResult with per-model LOOCV metrics,
    winner identification, and τ/coefficient estimates.
    """
    if countries is None:
        countries = list(V12_ACTUAL_TFR_2024.keys())

    calibrate_v16()

    # M0: no EMF
    r_m0 = _loocv_m0(countries)

    # M1: current BERM
    r_m1 = _loocv_m1(countries)

    # M2: exponential decay (find optimal τ first)
    tau_est = estimate_tau(countries)
    r_m2 = _loocv_m2(countries, tau_est["best_tau"])

    # M3: free-form WCE (find best profile first)
    m3_est = estimate_m3_coeffs(countries)
    r_m3 = _loocv_m3(countries, m3_est["best_coeffs"])

    results = {
        "M0_baseline": r_m0,
        "M1_cumEMF": r_m1,
        "M2_exp_decay": r_m2,
        "M3_free_WCE": r_m3,
    }

    winner = min(results, key=lambda k: results[k].rmse)

    return ComparisonResult(
        results=results,
        winner=winner,
        tau_estimation=tau_est,
        m3_estimation=m3_est,
    )


def print_comparison(comp: ComparisonResult) -> None:
    """Print formatted comparison results."""
    print("MODEL COMPARISON (LOOCV RMSE)")
    print("=" * 60)
    for name in ["M0_baseline", "M1_cumEMF", "M2_exp_decay", "M3_free_WCE"]:
        r = comp.results[name]
        marker = " ←WINNER" if name == comp.winner else ""
        extra = ""
        if name == "M2_exp_decay" and comp.tau_estimation:
            extra = f"  [τ={comp.tau_estimation['best_tau']:.1f}y]"
        if name == "M3_free_WCE" and comp.m3_estimation:
            extra = f"  [{comp.m3_estimation['best_profile']}]"
        print(f"  {name:20s}  RMSE={r.rmse:.4f}  MAE={r.mae:.4f}"
              f"  bias={r.bias:+.4f}{extra}{marker}")

    print()
    print("INTERPRETATION:")
    w = comp.winner
    if w == "M0_baseline":
        print("  M0 wins: EMF adds NO explanatory power beyond demographics.")
        print("  This is a SERIOUS problem for BERM.")
    elif w == "M1_cumEMF":
        print("  M1 wins: cumulative EMF (current BERM) is the best model.")
        print("  The cumulative assumption is statistically supported.")
    elif w == "M2_exp_decay":
        tau = comp.tau_estimation["best_tau"] if comp.tau_estimation else "?"
        print(f"  M2 wins: exponential decay with τ={tau}y beats cumEMF.")
        print(f"  {comp.tau_estimation['interpretation']}")
    elif w == "M3_free_WCE":
        profile = comp.m3_estimation["best_profile"] if comp.m3_estimation else "?"
        print(f"  M3 wins: free-form weights ({profile}) beat both M1 and M2.")
        print("  The lag structure is non-trivial; data prefers a specific shape.")

    print()
    print("Per-country worst errors (top 5):")
    winner_result = comp.results[w]
    sorted_countries = sorted(
        winner_result.per_country.items(),
        key=lambda x: abs(x[1]["error"]),
        reverse=True,
    )
    for c, d in sorted_countries[:5]:
        print(f"  {c:15s}  pred={d['predicted']:.2f}  "
              f"obs={d['actual']:.2f}  err={d['error']:+.3f}")
