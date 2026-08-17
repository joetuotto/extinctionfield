"""Conventional demographic transition model (no EMF component).

Standard log-linear model for comparison/residual analysis.
Coefficients from Bongaarts 2017, Vollset 2020 meta-regression.
"""

import math


def conventional_tfr(
    country: str,
    year: int,
    gdp_per_capita: float,
    female_education_years: float,
    urbanization_pct: float,
    contraceptive_prevalence: float,
) -> float:
    """Predict TFR from standard development indicators.

    Parameters
    ----------
    country : str
        Country name (for labeling; does not affect calculation).
    year : int
        Prediction year (for labeling; does not affect calculation).
    gdp_per_capita : float
        GDP per capita in current USD.
    female_education_years : float
        Mean years of female education.
    urbanization_pct : float
        Urban population percentage (0-100).
    contraceptive_prevalence : float
        Contraceptive prevalence rate (0-100).

    Returns
    -------
    float
        Predicted TFR, clamped to [0.5, 8.0].
    """
    # Guard against log(0)
    log_gdp = math.log(max(gdp_per_capita, 1.0))

    tfr = (
        7.0
        - 0.5 * log_gdp
        - 0.15 * female_education_years
        - 0.02 * urbanization_pct
        - 0.03 * contraceptive_prevalence
    )

    return max(0.5, min(8.0, tfr))
