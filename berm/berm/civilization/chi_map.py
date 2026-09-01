"""Chi susceptibility mapping: latitude and electrification dependence.

chi(lambda) encodes how strongly a region's biological capacity responds
to solar/electromagnetic perturbation. In the pre-electric era, tropical
latitudes dominate (UV flux, vitamin D, melatonin amplitude). After
electrification, mid-latitude industrialized regions acquire additional
chi from anthropogenic EM fields.
"""

from __future__ import annotations

import math

import numpy as np

# Electrification onset years by macro-region
ELECTRIFICATION_YEARS: dict[str, int] = {
    "Western Europe": 1882,
    "USA": 1882,
    "Japan": 1887,
    "East Asia": 1920,
    "South Korea": 1910,
    "South Asia": 1930,
    "Middle East": 1935,
    "Latin America": 1925,
    "Sub-Saharan Africa": 1955,
}

# Peak anthropogenic chi boost by region (post-saturation)
ELECTRIFICATION_CHI_PEAK: dict[str, float] = {
    "Western Europe": 0.45,
    "USA": 0.50,
    "Japan": 0.55,
    "East Asia": 0.40,
    "South Korea": 0.55,
    "South Asia": 0.20,
    "Middle East": 0.25,
    "Latin America": 0.25,
    "Sub-Saharan Africa": 0.10,
}


def chi_latitude(lat: float) -> float:
    """Latitude-dependent baseline chi (pre-electric natural susceptibility).

    Higher near the equator due to greater solar UV flux and stronger
    circadian amplitude. Falls off with cos(lat) modulated by a tropical
    enhancement term.

    Parameters
    ----------
    lat : float
        Latitude in degrees (-90 to 90).

    Returns
    -------
    float
        Baseline chi in [0, 1].
    """
    abs_lat = abs(lat)
    # Cosine envelope: peaks at equator
    cos_term = math.cos(math.radians(abs_lat))
    # Tropical enhancement: Gaussian bump centered at equator
    tropical = 0.3 * math.exp(-0.5 * (abs_lat / 25) ** 2)
    return float(np.clip(cos_term * 0.7 + tropical, 0.0, 1.0))


def chi_electrification(year: float, region: str) -> float:
    """Electrification-era chi boost for a given region and year.

    Models the ramp-up of anthropogenic EM exposure from grid
    electrification through to modern RF saturation. Uses a logistic
    ramp with region-specific onset and saturation levels.

    Parameters
    ----------
    year : float
        Calendar year.
    region : str
        Macro-region name (must be in ELECTRIFICATION_YEARS).

    Returns
    -------
    float
        Electrification chi boost in [0, peak].

    Raises
    ------
    KeyError
        If region is not recognized.
    """
    onset = ELECTRIFICATION_YEARS[region]
    peak = ELECTRIFICATION_CHI_PEAK[region]

    if year < onset:
        return 0.0

    # Logistic ramp: 50% at onset+40yr, ~95% at onset+80yr
    midpoint = onset + 40.0
    k = 0.08
    ramp = 1 / (1 + math.exp(-k * (year - midpoint)))
    return peak * ramp


def chi_total(lat: float, year: float, region: str) -> float:
    """Combined chi: latitude baseline plus electrification boost.

    Parameters
    ----------
    lat : float
        Latitude in degrees.
    year : float
        Calendar year.
    region : str
        Macro-region name.

    Returns
    -------
    float
        Total chi susceptibility (can exceed 1.0 in heavily
        electrified low-latitude regions).
    """
    return chi_latitude(lat) + chi_electrification(year, region)
