"""Hindcast validation: run BERM predictions against observed TFR history.

Computes RMSE, MAE, and max absolute error for model validation.
Supports both v17 model (predict_country_year, self-contained) and
legacy pipeline (predict_tfr, requires manual parameters).
"""

import math

from berm.model import predict_country_year
from berm.data.countries import HISTORICAL_TFR


def hindcast_v17(
    country: str,
    years: list[int] | range | None = None,
) -> dict:
    """Run hindcast for a country using v17 model pipeline.

    Uses HISTORICAL_TFR for comparison. All model parameters come from
    country data — no manual inputs needed.

    Parameters
    ----------
    country : str
        Country name (must be in HISTORICAL_TFR).
    years : list or range, optional
        Years to hindcast. Defaults to all years in HISTORICAL_TFR.

    Returns
    -------
    dict with predicted, observed, errors, rmse, mae, max_error, n_years.
    """
    obs_series = HISTORICAL_TFR.get(country)
    if obs_series is None:
        raise ValueError(f"No historical TFR data for {country}")

    obs_dict = dict(obs_series)

    if years is None:
        years = sorted(obs_dict.keys())

    predicted: dict[int, float] = {}
    observed: dict[int, float] = {}
    errors: dict[int, float] = {}

    for yr in years:
        if yr not in obs_dict:
            continue

        result = predict_country_year(country, yr)
        pred = result["predicted_tfr"]
        obs = obs_dict[yr]

        predicted[yr] = pred
        observed[yr] = obs
        errors[yr] = pred - obs

    return _compute_metrics(predicted, observed, errors)


def hindcast_country(
    country: str,
    years: range,
    mobile_penetration_series: dict[int, float],
    pop_density: float,
    observed_tfr_series: dict[int, float],
    calibration_year: int = 2024,
    base_tfr: float | None = None,
    cultural_ratio: float = 1.0,
) -> dict:
    """Run hindcast using legacy predict_tfr pipeline.

    Kept for backward compatibility. New code should use hindcast_v17.
    """
    from berm.tfr import predict_tfr

    if base_tfr is None:
        if calibration_year not in observed_tfr_series:
            raise ValueError(
                f"calibration_year {calibration_year} not in observed_tfr_series; "
                "provide base_tfr explicitly"
            )
        base_tfr = observed_tfr_series[calibration_year]

    predicted: dict[int, float] = {}
    observed: dict[int, float] = {}
    errors: dict[int, float] = {}

    for yr in years:
        if yr not in mobile_penetration_series:
            continue
        if yr not in observed_tfr_series:
            continue

        pen = mobile_penetration_series[yr]
        result = predict_tfr(
            country=country,
            year=yr,
            mobile_penetration=pen,
            pop_density=pop_density,
            base_tfr=base_tfr,
            cultural_ratio=cultural_ratio,
            calibration_year=calibration_year,
        )

        pred = result["tfr_predicted"]
        obs = observed_tfr_series[yr]

        predicted[yr] = pred
        observed[yr] = obs
        errors[yr] = pred - obs

    return _compute_metrics(predicted, observed, errors)


def _compute_metrics(
    predicted: dict[int, float],
    observed: dict[int, float],
    errors: dict[int, float],
) -> dict:
    n = len(errors)
    if n == 0:
        return {
            "predicted": predicted,
            "observed": observed,
            "errors": errors,
            "rmse": float("nan"),
            "mae": float("nan"),
            "max_error": float("nan"),
            "n_years": 0,
        }

    squared_errors = [e ** 2 for e in errors.values()]
    abs_errors = [abs(e) for e in errors.values()]

    return {
        "predicted": predicted,
        "observed": observed,
        "errors": errors,
        "rmse": math.sqrt(sum(squared_errors) / n),
        "mae": sum(abs_errors) / n,
        "max_error": max(abs_errors),
        "n_years": n,
    }
