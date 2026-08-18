"""BERM v17 core model: community sigmoid -> TFR prediction.

The community sigmoid maps effective EMF to biological TFR using
a 5-point calibration (Amish, Haredi, Mennonite, US, Korea).
Country-level prediction adds cultural pronatalism and IVF correction.

This replaces the sperm-based bio_capacity approach in tfr.py,
which is kept for sub-pathway decomposition.
"""

from __future__ import annotations

import math

from berm.data.countries import (
    CALIBRATED_SIGMOID_V7,
    CULTURAL_PRONATALISM,
    IVF_SHARES,
    get_country_params,
)
from berm.exposure.ambient import bimodal_effective_emf, effective_emf_field
from berm.exposure.personal import (
    personal_emf_exposure,
    tech_penetration_profile,
    two_component_emf,
    night_proximity_prevalence,
    circadian_adjusted_exposure,
    cohort_weighted_exposure,
    proximity_sar_multiplier,
    personal_contact_hours,
)


def community_fit_function(eac: float) -> float:
    """Original community sigmoid (v4): 5-point Amish-Korea fit.

    a - b / (1 + exp(-(log(eac) - logThreshold) / k))
    R² = 0.9986 on calibration data.
    """
    a, b = 6.566, 6.394
    log_threshold, k = -1.361, 0.509
    log_eac = math.log(max(eac, 1e-20))
    return a - b / (1 + math.exp(-(log_eac - log_threshold) / k))


def berm_sigmoid_v7(effective_emf: float) -> float:
    """Recalibrated sigmoid (v7): density-weighted EMF scale 0.001-2.4.

    R² = 0.9993, RMSE = 0.061.
    """
    p = CALIBRATED_SIGMOID_V7
    log_emf = math.log(max(effective_emf, 1e-20))
    return p["a"] - p["b"] / (1 + math.exp(-(log_emf - p["log_threshold"]) / p["k"]))


def density_weighted_tfr_with_personal(
    country: str,
    year: int,
) -> float:
    """Density-weighted TFR using bimodal EMF model.

    Matches Wolfram densityWeightedTFRWithPersonal exactly:
    metro and non-metro EMF computed separately with different
    density and urban-fraction inputs, then sigmoid evaluated
    for each and population-weighted by metro_pop_share.
    """
    from berm.exposure.ambient import effective_emf_field

    cp = get_country_params(country)
    mobile_pen = tech_penetration_profile(country, year)

    metro_share = cp.metro_pop_share
    non_metro_dens = max(1.0, cp.pop_density * (1 - metro_share))

    metro_emf = effective_emf_field(mobile_pen, cp.metro_density, 0.98)
    non_metro_emf = effective_emf_field(mobile_pen, non_metro_dens, 0.3)

    personal = personal_emf_exposure(country, mobile_pen, year)
    metro_total = min(2.0, metro_emf + personal)
    non_metro_total = min(2.0, non_metro_emf + personal)

    return (
        metro_share * community_fit_function(max(metro_total, 0.0001))
        + (1 - metro_share) * community_fit_function(max(non_metro_total, 0.0001))
    )


def cultural_component(country: str) -> float:
    return CULTURAL_PRONATALISM.get(country, 0.0)


def ivf_share_projected(country: str, year: int) -> float:
    base = IVF_SHARES.get(country, 0.02)
    return max(0, min(0.20, base + 0.005 * (year - 2023)))


def biological_tfr(observed_tfr: float, ivf_share: float) -> float:
    return observed_tfr * (1 - ivf_share)


def native_tfr(country: str, total_tfr: float) -> float:
    """Decompose total TFR into native TFR by removing immigration buffer."""
    from berm.data.countries import MIGRATION_DATA
    d = MIGRATION_DATA.get(country)
    if d is None:
        return total_tfr
    return (total_tfr - d["imm_share"] * d["imm_tfr"]) / (1 - d["imm_share"])


def predict_country_year(country: str, year: int) -> dict:
    """Full BERM v17 prediction for a country-year.

    Pipeline:
    1. Two-component EMF (ambient + personal)
    2. Circadian adjustment
    3. Community sigmoid → biological TFR
    4. Cultural pronatalism component
    5. IVF correction → biological TFR

    Returns dict with all intermediate values for transparency.
    """
    tc = two_component_emf(country, year)
    ambient_emf = tc["ambient"]
    personal_emf = tc["personal"]
    combined_emf = tc["combined"]
    mobile_pen = tc["mobile_pen"]

    night_prev = night_proximity_prevalence(year)
    circ_adj = circadian_adjusted_exposure(combined_emf, combined_emf, night_prev)

    cohort_idx = cohort_weighted_exposure(country, year)
    prox_mult = proximity_sar_multiplier(personal_contact_hours(year))

    bio_sigmoid_tfr = density_weighted_tfr_with_personal(country, year)
    cult_comp = cultural_component(country)
    pred_tfr = max(0.0, bio_sigmoid_tfr + cult_comp)

    ivf_corr = ivf_share_projected(country, year)
    bio_tfr = biological_tfr(pred_tfr, ivf_corr)

    return {
        "country": country,
        "year": year,
        "ambient_emf": ambient_emf,
        "personal_emf": personal_emf,
        "combined_emf": combined_emf,
        "personal_fraction": tc["personal_fraction"],
        "circadian_adjusted_emf": circ_adj,
        "cohort_index": cohort_idx,
        "proximity_multiplier": prox_mult,
        "bio_sigmoid_tfr": bio_sigmoid_tfr,
        "cultural_component": cult_comp,
        "predicted_tfr": pred_tfr,
        "ivf_share": ivf_corr,
        "biological_tfr": bio_tfr,
        "mobile_pen": mobile_pen,
    }
