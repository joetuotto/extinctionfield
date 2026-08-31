"""Behavioral factor v21: testosterone-calibrated temporal adjustment.

The behavioral factor captures how testosterone secular decline modifies
the effective reproductive capacity beyond what the cross-sectional
EMF model predicts.  It acts as a time-varying multiplier on the
biological TFR.

v21 replaces the previous heuristic behavioral adjustment with a
T-trajectory-derived factor that has an empirical anchor
(USA 2007-2024 TFR explained at R² ≈ 0.97 with 8-year lag).
"""

from __future__ import annotations

from berm.prediction.two_level_model import (
    testosterone_trajectory,
    t_to_tfr_modifier,
    _T0_DEFAULT,
    _DECLINE_RATE,
    _BASE_YEAR,
    _OPTIMAL_LAG_YEARS,
)


def behavioral_factor_v21(
    year: float,
    *,
    t0: float = _T0_DEFAULT,
    decline_rate: float = _DECLINE_RATE,
    base_year: float = _BASE_YEAR,
    lag_years: int = _OPTIMAL_LAG_YEARS,
    reference_year: float = 1990.0,
) -> float:
    """T-calibrated behavioral factor as a TFR multiplier.

    Returns a value near 1.0 for the reference year and declining
    over time as testosterone declines.  The factor is the ratio
    of the T-to-TFR modifier at the target year vs the reference year.

    Parameters
    ----------
    year : float
        Target year.
    reference_year : float
        Year at which the factor equals 1.0 (default: 1990,
        approximately when developed-world TFR stabilised near
        the cross-sectional model's prediction).

    Returns
    -------
    float
        Multiplicative factor (< 1.0 means T decline suppresses
        TFR below cross-sectional baseline).
    """
    t_ref = testosterone_trajectory(
        reference_year - lag_years, t0, decline_rate, base_year
    )
    t_now = testosterone_trajectory(
        year - lag_years, t0, decline_rate, base_year
    )

    modifier_ref = t_to_tfr_modifier(t_ref)
    modifier_now = t_to_tfr_modifier(t_now)

    if modifier_ref == 0:
        return 1.0

    return modifier_now / modifier_ref


def annual_behavioral_series(
    start_year: int = 1990,
    end_year: int = 2050,
    **kwargs,
) -> list[dict]:
    """Generate annual behavioral factor series."""
    return [
        {
            "year": y,
            "factor": round(behavioral_factor_v21(y, **kwargs), 4),
            "t_ng_dl": round(
                testosterone_trajectory(y - _OPTIMAL_LAG_YEARS), 1
            ),
        }
        for y in range(start_year, end_year + 1)
    ]
