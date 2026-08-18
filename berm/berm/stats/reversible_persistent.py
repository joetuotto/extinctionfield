"""BERM v18 Phase 2: Reversible/Persistent decomposition.

State-space model that decomposes biological damage into:
  R(t) = ρ × R(t-1) + β × E(t)    [reversible, decays over time]
  P(t) = P(t-1) + γ × E(t)         [persistent, accumulates forever]
  D(t) = q × R(t) + (1-q) × P(t)   [total damage]

Parameters:
  ρ: recovery rate [0, 1). Higher = slower recovery.
  q: fraction of damage that is reversible [0, 1].
     q=0 → fully cumulative (current BERM assumption).
     q=1 → fully reversible.
  β, γ: damage rate coefficients (calibrated per model fit).

The implicit lag weight profile is:
  w(ℓ) = q × ρ^ℓ + (1-q) × 1

When q=0 this is M1 (cumulative). When q=1 and ρ<1 this is M2-like.
"""

from __future__ import annotations

import math
from dataclasses import dataclass, field

from berm.data.countries import (
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
    calibrate_v16,
)


def _annual_emf(country: str, year: int) -> float:
    amb = v16_ambient_annual(country, year)
    pers = v16_personal_annual(country, year)
    return amb + chi(amb) * pers


@dataclass
class RPTrajectory:
    """Time series of R, P, D states for one country."""
    country: str
    rho: float
    q: float
    years: list[int] = field(default_factory=list)
    R_series: list[float] = field(default_factory=list)
    P_series: list[float] = field(default_factory=list)
    D_series: list[float] = field(default_factory=list)
    emf_series: list[float] = field(default_factory=list)


def rp_damage(country: str, year: int, rho: float, q: float) -> dict:
    """Compute reversible + persistent damage up to given year.

    Returns dict with final_D, final_R, final_P, half_life, trajectory.
    """
    td = _get_td(country)
    start = td.start

    R = 0.0
    P = 0.0
    traj = RPTrajectory(country=country, rho=rho, q=q)

    for t in range(start, year + 1):
        emf = _annual_emf(country, t)
        R = rho * R + emf
        P = P + emf
        D = q * R + (1 - q) * P

        traj.years.append(t)
        traj.R_series.append(round(R, 4))
        traj.P_series.append(round(P, 4))
        traj.D_series.append(round(D, 4))
        traj.emf_series.append(round(emf, 4))

    half_life = -1.0 / math.log(rho) if 0 < rho < 1 else float("inf")

    return {
        "final_D": traj.D_series[-1] if traj.D_series else 0.0,
        "final_R": traj.R_series[-1] if traj.R_series else 0.0,
        "final_P": traj.P_series[-1] if traj.P_series else 0.0,
        "half_life_reversible": round(half_life, 1),
        "reversible_fraction": q,
        "persistent_fraction": 1 - q,
        "trajectory": traj,
    }


def rp_predict(country: str, year: int, rho: float, q: float,
               cultural_rate: float) -> float:
    """Predict TFR using R+P damage model.

    D is used in place of adj_cum_emf in the bioCap/behavioral functions.
    Scaling is applied to keep D in a similar range as adj_cum_emf.
    """
    result = rp_damage(country, year, rho, q)
    D = result["final_D"]

    occ = occupational_emf_multiplier(country, year)
    adj_D = D * occ

    bio_cap = v16_biological_capacity(adj_D, country, year)
    behav = emf_behavioral_factor_v3(adj_D)
    cult_ratio = cultural_tfr(country, year) / cultural_tfr(country, 2024)

    return bio_cap * behav * cultural_rate * cult_ratio


def rp_calibrate_rate(country: str, rho: float, q: float) -> float:
    """Back-solve cultural rate for R+P model."""
    actual = V12_ACTUAL_TFR_2024[country]
    result = rp_damage(country, 2024, rho, q)
    D = result["final_D"]

    occ = occupational_emf_multiplier(country, 2024)
    adj_D = D * occ

    bio_cap = v16_biological_capacity(adj_D, country, 2024)
    behav = emf_behavioral_factor_v3(adj_D)
    denom = bio_cap * behav
    if denom < 0.001:
        return 0.80
    return actual / denom


def loocv_rp(countries: list[str], rho: float, q: float) -> dict:
    """LOOCV for R+P model at given (ρ, q)."""
    errors = []

    for leave_out in countries:
        train = [c for c in countries if c != leave_out]
        rates = {c: rp_calibrate_rate(c, rho, q) for c in train}
        mean_rate = sum(rates.values()) / len(rates)

        predicted = rp_predict(leave_out, 2024, rho, q, mean_rate)
        actual = V12_ACTUAL_TFR_2024[leave_out]
        errors.append(predicted - actual)

    n = len(errors)
    rmse = math.sqrt(sum(e ** 2 for e in errors) / n)
    mae = sum(abs(e) for e in errors) / n
    bias = sum(errors) / n

    return {
        "rho": rho,
        "q": q,
        "rmse": round(rmse, 4),
        "mae": round(mae, 4),
        "bias": round(bias, 4),
        "n": n,
    }


@dataclass
class RPEstimationResult:
    """Result of R+P parameter estimation."""
    best_rho: float
    best_q: float
    best_rmse: float
    half_life: float
    all_results: list[dict]
    interpretation: str
    m1_rmse: float | None = None


def estimate_rp_parameters(
    countries: list[str] | None = None,
    rho_grid: list[float] | None = None,
    q_grid: list[float] | None = None,
) -> RPEstimationResult:
    """Grid search over (ρ, q) to find best R+P parameters.

    Default grid:
      ρ ∈ [0.50, 0.55, ..., 0.95, 0.97, 0.99]
      q ∈ [0.0, 0.1, ..., 1.0]
    """
    if countries is None:
        countries = list(V12_ACTUAL_TFR_2024.keys())
    if rho_grid is None:
        rho_grid = [0.5 + 0.05 * i for i in range(10)] + [0.97, 0.99]
    if q_grid is None:
        q_grid = [0.1 * i for i in range(11)]

    calibrate_v16()

    all_results: list[dict] = []
    best_rmse = float("inf")
    best_rho = 0.9
    best_q = 0.0

    for rho in rho_grid:
        for q in q_grid:
            result = loocv_rp(countries, rho, q)
            all_results.append(result)
            if result["rmse"] < best_rmse:
                best_rmse = result["rmse"]
                best_rho = rho
                best_q = q

    half_life = -1.0 / math.log(best_rho) if 0 < best_rho < 1 else float("inf")

    if best_q < 0.2:
        interpretation = (
            f"q={best_q:.2f} < 0.2: effect is predominantly PERSISTENT/CUMULATIVE. "
            "Current cumEMF assumption is well-supported."
        )
    elif best_q > 0.8:
        interpretation = (
            f"q={best_q:.2f} > 0.8: effect is predominantly REVERSIBLE "
            f"(half-life ≈ {half_life:.1f}y). "
            "cumEMF significantly overestimates long-term impact."
        )
    else:
        interpretation = (
            f"q={best_q:.2f}: BOTH components are significant. "
            f"Reversible half-life ≈ {half_life:.1f}y. "
            "Recovery window theory gets statistical support."
        )

    return RPEstimationResult(
        best_rho=round(best_rho, 4),
        best_q=round(best_q, 2),
        best_rmse=round(best_rmse, 4),
        half_life=round(half_life, 1),
        all_results=all_results,
        interpretation=interpretation,
    )


def print_rp_results(result: RPEstimationResult) -> None:
    """Print formatted R+P estimation results."""
    print("REVERSIBLE / PERSISTENT DECOMPOSITION")
    print("=" * 60)
    print(f"  Best ρ (recovery rate):  {result.best_rho:.4f}")
    print(f"  Best q (reversible frac): {result.best_q:.2f}")
    print(f"  R+P RMSE:                {result.best_rmse:.4f}")
    if result.m1_rmse is not None:
        print(f"  M1 (cumEMF) RMSE:        {result.m1_rmse:.4f}")
        delta = result.best_rmse - result.m1_rmse
        print(f"  Delta:                   {delta:+.4f}")
    print(f"  Reversible half-life:    {result.half_life:.1f} years")
    print()
    print(f"  INTERPRETATION: {result.interpretation}")

    print()
    print("  q (reversible fraction) profile at best ρ:")
    q_at_best_rho = [
        r for r in result.all_results
        if abs(r["rho"] - result.best_rho) < 0.001
    ]
    for r in sorted(q_at_best_rho, key=lambda x: x["q"]):
        marker = " ←" if abs(r["q"] - result.best_q) < 0.01 else ""
        print(f"    q={r['q']:.1f}  RMSE={r['rmse']:.4f}{marker}")
