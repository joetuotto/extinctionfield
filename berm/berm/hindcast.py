"""Hindcast validation: run BERM predictions against observed TFR history.

Computes RMSE, MAE, and max absolute error for model validation.
"""

import math

from berm.tfr import predict_tfr


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
    """Run hindcast for a country over a range of years.

    Parameters
    ----------
    country : str
        Country name.
    years : range
        Year range to hindcast over.
    mobile_penetration_series : dict[int, float]
        Mobile penetration by year (0-1).
    pop_density : float
        Population density (people/km^2), assumed constant.
    observed_tfr_series : dict[int, float]
        Observed TFR values by year for comparison.
    calibration_year : int
        Year used for base_tfr calibration.
    base_tfr : float or None
        Base TFR at calibration year. If None, uses observed value at
        calibration_year from observed_tfr_series.
    cultural_ratio : float
        Cultural fertility preference ratio.

    Returns
    -------
    dict with:
        predicted: dict[int, float] — predicted TFR per year
        observed: dict[int, float] — observed TFR per year (filtered)
        errors: dict[int, float] — signed error per year
        rmse: float
        mae: float
        max_error: float
        n_years: int
    """
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

    rmse = math.sqrt(sum(squared_errors) / n)
    mae = sum(abs_errors) / n
    max_error = max(abs_errors)

    return {
        "predicted": predicted,
        "observed": observed,
        "errors": errors,
        "rmse": rmse,
        "mae": mae,
        "max_error": max_error,
        "n_years": n,
    }
