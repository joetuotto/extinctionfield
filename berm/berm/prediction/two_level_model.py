"""Two-level TFR prediction model.

Level 1 (cross-sectional): electrification threshold positions a country
on the global TFR curve using the existing exponential fit.

Level 2 (temporal): testosterone secular decline provides within-country
temporal dynamics via the empirical T→TFR lag relationship.

The two levels are independent — Level 1 sets the baseline, Level 2
modulates it over time.  Neither level claims causation; the model
is a structured forecasting tool whose mechanistic interpretation
requires the evidence assembled elsewhere in the BERM framework.
"""

from __future__ import annotations

import math
from dataclasses import dataclass
from typing import Sequence


# --- Level 1: Cross-sectional electrification threshold ---

# Calibrated on 54 countries (v19.1).  The EMF index is a proxy for
# infrastructure saturation, not a direct EMF dose.
_L1_A = 4.11
_L1_B = 54.0
_L1_C = 1.55


def electrification_threshold(emf_index: float,
                               a: float = _L1_A,
                               b: float = _L1_B,
                               c: float = _L1_C) -> float:
    """Level 1 predicted TFR from infrastructure EMF index.

    TFR = a * exp(-b * emf_index) + c

    Parameters
    ----------
    emf_index : float
        Composite EMF infrastructure index in [0, 1].
    a, b, c : float
        Exponential fit parameters (default: v19.1 calibration).

    Returns
    -------
    float
        Predicted TFR from Level 1 alone.
    """
    return a * math.exp(-b * emf_index) + c


# --- Level 2: Testosterone temporal dynamics ---

# USA secular decline parameters.
# Source: Travison et al. 2007 (JCEM), Lokeshwar et al. 2021 (Urology).
# AFHS baseline: ~638 ng/dL in 1982 cohort (age-standardised).
# Age-independent decline: ~1.2%/year.
_T0_DEFAULT = 638.0        # ng/dL, AFHS 1982 baseline
_DECLINE_RATE = 0.012      # fractional annual decline
_BASE_YEAR = 1982

# T→TFR transfer function.
# Calibrated on USA 2007-2024: TFR = slope * T_lagged + intercept.
# Optimal lag = 8 years; R² = 0.97 on training window.
_T_TFR_SLOPE = 0.00544
_T_TFR_INTERCEPT = -0.745
_OPTIMAL_LAG_YEARS = 8


def testosterone_trajectory(year: float,
                            t0: float = _T0_DEFAULT,
                            decline_rate: float = _DECLINE_RATE,
                            base_year: float = _BASE_YEAR) -> float:
    """Projected population-mean testosterone for a given calendar year.

    T(year) = T0 * (1 - decline_rate)^(year - base_year)

    Parameters
    ----------
    year : float
        Calendar year (can be fractional).
    t0 : float
        Baseline testosterone in ng/dL at base_year.
    decline_rate : float
        Fractional annual decline (0.012 = 1.2%/year).
    base_year : float
        Year of the baseline measurement.

    Returns
    -------
    float
        Estimated population-mean T in ng/dL.
    """
    return t0 * (1.0 - decline_rate) ** (year - base_year)


def t_to_tfr_modifier(testosterone_ng_dl: float,
                      slope: float = _T_TFR_SLOPE,
                      intercept: float = _T_TFR_INTERCEPT) -> float:
    """Convert testosterone level to a TFR modifier.

    TFR_modifier = slope * T + intercept

    Calibrated on USA temporal data (2007-2024, 8-year lag).
    The modifier represents the T-attributable TFR component;
    it is added to the Level 1 baseline to get the two-level prediction.

    Returns
    -------
    float
        TFR modifier (can be negative, meaning T decline suppresses TFR
        below the cross-sectional baseline).
    """
    return slope * testosterone_ng_dl + intercept


# --- Combined two-level prediction ---

@dataclass(frozen=True)
class TwoLevelPrediction:
    """Result of a two-level TFR prediction."""
    year: float
    level1_tfr: float
    testosterone_ng_dl: float
    t_modifier: float
    predicted_tfr: float
    emf_index: float
    lag_years: int


def predict_tfr_two_level(
    emf_index: float,
    year: float,
    *,
    t0: float = _T0_DEFAULT,
    decline_rate: float = _DECLINE_RATE,
    base_year: float = _BASE_YEAR,
    lag_years: int = _OPTIMAL_LAG_YEARS,
    tfr_floor: float = 0.5,
) -> TwoLevelPrediction:
    """Two-level TFR prediction combining cross-sectional and temporal signals.

    Level 1: electrification threshold → baseline TFR.
    Level 2: T(year - lag) → temporal modifier added to baseline.

    Parameters
    ----------
    emf_index : float
        Country's EMF infrastructure index (0-1).
    year : float
        Prediction year.
    t0, decline_rate, base_year : float
        Testosterone trajectory parameters.
    lag_years : int
        T→TFR lag (default 8 years).
    tfr_floor : float
        Minimum predicted TFR (biological floor).

    Returns
    -------
    TwoLevelPrediction
    """
    level1 = electrification_threshold(emf_index)

    t_year = year - lag_years
    t_level = testosterone_trajectory(t_year, t0, decline_rate, base_year)
    modifier = t_to_tfr_modifier(t_level)

    predicted = max(tfr_floor, level1 + modifier)

    return TwoLevelPrediction(
        year=year,
        level1_tfr=level1,
        testosterone_ng_dl=t_level,
        t_modifier=modifier,
        predicted_tfr=predicted,
        emf_index=emf_index,
        lag_years=lag_years,
    )


def predict_tfr_series(
    emf_index: float,
    years: Sequence[float],
    **kwargs,
) -> list[TwoLevelPrediction]:
    """Predict TFR for a sequence of years."""
    return [predict_tfr_two_level(emf_index, y, **kwargs) for y in years]


# --- USA validation: 2007-2024 ---

# Observed USA TFR (CDC NVSS / UN WPP).
USA_TFR_OBSERVED: dict[int, float] = {
    2007: 2.12, 2008: 2.07, 2009: 2.01, 2010: 1.93,
    2011: 1.89, 2012: 1.88, 2013: 1.86, 2014: 1.86,
    2015: 1.84, 2016: 1.82, 2017: 1.77, 2018: 1.73,
    2019: 1.71, 2020: 1.64, 2021: 1.66, 2022: 1.67,
    2023: 1.62, 2024: 1.62,
}

# USA EMF index (approximate; high-saturation country).
USA_EMF_INDEX = 0.85


def validate_usa_temporal(
    years: Sequence[int] | None = None,
) -> dict:
    """Validate T→TFR temporal model against USA observed data.

    Returns fit statistics (R², RMSE) and per-year comparison.
    """
    if years is None:
        years = sorted(USA_TFR_OBSERVED.keys())

    observed = []
    predicted = []
    rows = []

    for y in years:
        if y not in USA_TFR_OBSERVED:
            continue
        obs = USA_TFR_OBSERVED[y]
        t_year = y - _OPTIMAL_LAG_YEARS
        t_level = testosterone_trajectory(t_year)
        pred_tfr = t_to_tfr_modifier(t_level)
        observed.append(obs)
        predicted.append(pred_tfr)
        rows.append({
            "year": y,
            "t_year": t_year,
            "testosterone_ng_dl": round(t_level, 1),
            "observed_tfr": obs,
            "predicted_tfr_modifier": round(pred_tfr, 3),
            "residual": round(obs - pred_tfr, 3),
        })

    n = len(observed)
    if n < 3:
        raise ValueError(f"need >= 3 years, got {n}")

    mean_obs = sum(observed) / n
    ss_res = sum((o - p) ** 2 for o, p in zip(observed, predicted))
    ss_tot = sum((o - mean_obs) ** 2 for o in observed)
    r2 = 1.0 - ss_res / ss_tot if ss_tot > 0 else float("nan")
    rmse = math.sqrt(ss_res / n)

    return {
        "n": n,
        "r2": round(r2, 4),
        "rmse": round(rmse, 4),
        "years": rows,
        "model": "T→TFR temporal (lag=8yr)",
        "caveat": (
            "Calibrated AND validated on the same USA window. "
            "Out-of-sample validation requires other countries with "
            "harmonised longitudinal T data."
        ),
    }
