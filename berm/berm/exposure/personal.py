"""Personal EMF exposure from device proximity.

Piecewise contact-hour evolution (1995-2022+), night proximity,
wearable penetration, circadian weighting (night exposure 2.5x).

Source: L-BERM Wolfram reference, eMarketer/Statista device usage data.
"""

from __future__ import annotations

import math


def personal_contact_hours(year: int) -> float:
    """Daily hours of phone body contact. Piecewise historical trend."""
    if year < 1995:
        return 0.1
    if year < 2005:
        return 0.5
    if year < 2012:
        return 2.0
    if year < 2018:
        return 6.0
    if year < 2022:
        return 10.0
    return 14.0


def night_proximity_prevalence(year: int) -> float:
    """Fraction of population sleeping near phone."""
    if year < 2005:
        return 0.05
    if year < 2012:
        return 0.30
    if year < 2018:
        return 0.65
    return 0.85


def proximity_sar_multiplier(contact_hours: float) -> float:
    """SAR multiplier from device proximity."""
    return 1 + 50 * (contact_hours / 24)


def circadian_adjusted_exposure(
    day_eac: float,
    night_eac: float,
    night_prev: float,
) -> float:
    """Circadian-weighted exposure. Night exposure gets 2.5x biological weight."""
    return (16.0 / 24.0) * day_eac + (8.0 / 24.0) * night_eac * 2.5 * night_prev


def personal_emf_exposure(
    country: str,
    mobile_pen: float,
    year: int,
) -> float:
    """Personal EMF exposure from phone + wearable proximity.

    Three components: phone fraction, night fraction, wearable fraction.
    Clipped to [0, 1.5].
    """
    contact_hrs = personal_contact_hours(year)
    night_prev = night_proximity_prevalence(year)
    wearable_pen = min(1.0, max(0, mobile_pen * 0.5 * max(0, (year - 2014)) / 10.0))

    phone_frac = contact_hrs / 24.0
    night_frac = night_prev * (8.0 / 24.0)
    wear_frac = wearable_pen * 0.3

    personal = mobile_pen * (0.55 * phone_frac + 0.30 * night_frac + 0.15 * wear_frac)
    return max(0.0, min(1.5, personal))


def tech_penetration_profile(country: str, year: int) -> float:
    """Country-specific mobile tech adoption curve.

    Power-law ramp from country start year.
    """
    from berm.data.countries import TECH_DIFFUSION

    td = TECH_DIFFUSION.get(country)
    if td is None:
        start_year, rate = 1995, 0.02
    else:
        start_year = td.start
        half_year = td.half
        span = half_year - start_year
        rate = 0.5 ** (1.0 / max(1, span) ** 1.5) if span > 0 else 0.02
        rate = 0.02

    params = {
        "SouthKorea": (1990, 0.02), "Japan": (1991, 0.02),
        "Finland": (1992, 0.015), "Denmark": (1992, 0.015),
        "USA": (1995, 0.02), "Canada": (1994, 0.02),
        "Australia": (1994, 0.02), "Norway": (1993, 0.015),
        "Sweden": (1993, 0.015), "Germany": (1993, 0.02),
        "France": (1994, 0.02), "Spain": (1996, 0.02),
        "Italy": (1996, 0.02), "Iran": (2000, 0.03),
        "India": (2000, 0.04), "China": (1998, 0.03),
        "Brazil": (2000, 0.03), "Mexico": (2000, 0.03),
        "Ethiopia": (2010, 0.05), "Niger": (2012, 0.04),
        "Bangladesh": (2005, 0.05), "Nigeria": (2008, 0.03),
    }
    start_year, rate = params.get(country, (1995, 0.02))

    if year < start_year:
        return 0.0
    return min(1.0, rate * (year - start_year) ** 1.5)


def two_component_emf(country: str, year: int) -> dict[str, float]:
    """Two-component EMF: ambient (infrastructure) + personal (devices).

    The core exposure function combining density-based ambient field
    with device-proximity personal exposure. Metro share (not urban_frac)
    is the population weight for metro vs non-metro ambient.
    """
    from berm.data.countries import get_country_params
    from berm.exposure.ambient import effective_emf_field

    cp = get_country_params(country)
    mobile_pen = tech_penetration_profile(country, year)

    metro_share = cp.metro_pop_share
    non_metro_dens = max(1.0, cp.pop_density * (1 - metro_share))

    metro_ambient = effective_emf_field(mobile_pen, cp.metro_density, 0.98)
    non_metro_ambient = effective_emf_field(mobile_pen, non_metro_dens, 0.3)

    ambient = metro_share * metro_ambient + (1 - metro_share) * non_metro_ambient
    personal = personal_emf_exposure(country, mobile_pen, year)
    combined = min(2.0, ambient + personal)

    return {
        "ambient": ambient,
        "personal": personal,
        "combined": combined,
        "metro_ambient": metro_ambient,
        "non_metro_ambient": non_metro_ambient,
        "metro_share": metro_share,
        "mobile_pen": mobile_pen,
        "personal_fraction": personal / max(combined, 0.001),
        "ambient_fraction": ambient / max(combined, 0.001),
    }


def vulnerability_by_age(age: int) -> float:
    """Age-dependent EMF vulnerability. Fetal 5x, adult 1x."""
    if age < 0:
        return 5.0
    if age < 2:
        return 4.0
    if age < 6:
        return 3.0
    if age < 12:
        return 2.5
    if age < 18:
        return 2.0
    return 1.0


def cohort_biological_exposure(
    country: str,
    birth_year: int,
    eval_year: int,
) -> float:
    """Cumulative biologically-weighted EMF exposure for a birth cohort."""
    total = 0.0
    for y in range(birth_year - 1, eval_year + 1):
        total += tech_penetration_profile(country, y) * vulnerability_by_age(y - birth_year)
    return total


def cohort_weighted_exposure(country: str, eval_year: int) -> float:
    """Population-weighted cohort exposure for reproductive-age women.

    Gaussian weighting centered on age 28 (peak fertility).
    """
    b_years = range(eval_year - 45, eval_year - 14)
    weights = []
    exposures = []
    for by in b_years:
        age = eval_year - by
        w = math.exp(-((age - 28.0) ** 2) / 98.0)
        weights.append(w)
        exposures.append(cohort_biological_exposure(country, by, eval_year))

    total_w = sum(weights)
    if total_w == 0:
        return 0.0
    return sum(w * e for w, e in zip(weights, exposures)) / total_w
