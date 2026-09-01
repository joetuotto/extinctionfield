"""Historical validation: renaissances, empires, and solar correlation.

Tests the BERM civilization model against historical events to check
whether cultural flourishing periods correlate with grand solar minima
recovery phases, and whether empire lifespans cluster near the Suess
cycle.
"""

from __future__ import annotations

from typing import NamedTuple

import numpy as np

from berm.civilization.solar_reconstruction import (
    GRAND_MINIMA,
    is_grand_minimum,
    solar_activity,
)


class Renaissance(NamedTuple):
    """Cultural renaissance event with temporal location."""

    name: str
    peak_year: int
    associated_minimum: str  # name of preceding grand minimum


class Empire(NamedTuple):
    """Historical empire for lifespan analysis."""

    name: str
    start: int  # year CE (negative for BCE)
    end: int
    lat: float  # approximate capital latitude
    peak_year: int


RENAISSANCES: list[Renaissance] = [
    Renaissance("Song Dynasty Golden Age", 1060, "Oort"),
    Renaissance("Kamakura Buddhist Revival", 1185, "Oort"),
    Renaissance("Italian Proto-Renaissance", 1250, "Wolf"),
    Renaissance("Timurid Renaissance", 1400, "Wolf"),
    Renaissance("Italian High Renaissance", 1500, "Spoerer"),
    Renaissance("Northern Renaissance", 1520, "Spoerer"),
    Renaissance("Mughal Cultural Peak", 1600, "Spoerer"),
    Renaissance("Scientific Revolution", 1660, "Maunder"),
    Renaissance("Enlightenment", 1750, "Maunder"),
    Renaissance("Romantic Movement", 1820, "Dalton"),
]

EMPIRES: list[Empire] = [
    Empire("Roman", -27, 476, 42.0, 117),
    Empire("Arab/Islamic", 632, 1258, 33.0, 850),
    Empire("Ottoman", 1299, 1922, 41.0, 1600),
    Empire("British", 1588, 1997, 52.0, 1920),
    Empire("Spanish", 1492, 1898, 40.0, 1580),
    Empire("Mongol", 1206, 1368, 47.0, 1279),
    Empire("Ming", 1368, 1644, 40.0, 1450),
    Empire("Qing", 1644, 1912, 40.0, 1790),
    Empire("Byzantine", 330, 1453, 41.0, 565),
    Empire("Abbasid", 750, 1258, 33.0, 850),
]


def _nearest_minimum_distance(year: int) -> float:
    """Distance in years from the given year to the nearest grand minimum center."""
    min_dist = float("inf")
    for gm in GRAND_MINIMA:
        center = (gm.start + gm.end) / 2.0
        dist = abs(year - center)
        if dist < min_dist:
            min_dist = dist
    return min_dist


def renaissance_solar_correlation() -> dict[str, float]:
    """Test correlation between renaissances and grand minima recovery.

    Each renaissance is expected to occur shortly after a grand minimum
    (during the recovery / rising solar activity phase). We compute:
    1. Mean distance from renaissance peak to nearest minimum center
    2. Fraction occurring within 80yr of a minimum end
    3. Correlation between renaissance timing and solar recovery slope

    Returns
    -------
    dict
        Keys: mean_distance_yr, fraction_near_minimum, solar_slope_correlation.
    """
    distances = []
    near_count = 0

    for ren in RENAISSANCES:
        dist = _nearest_minimum_distance(ren.peak_year)
        distances.append(dist)

        # Check if within 80yr of any minimum end
        for gm in GRAND_MINIMA:
            if 0 <= (ren.peak_year - gm.end) <= 80:
                near_count += 1
                break

    # Solar activity slope at each renaissance peak
    slopes = []
    for ren in RENAISSANCES:
        s_before = solar_activity(ren.peak_year - 10)
        s_after = solar_activity(ren.peak_year + 10)
        slopes.append(s_after - s_before)

    slopes_arr = np.array(slopes)
    # Renaissances should correlate with rising solar activity
    positive_slope_frac = float(np.mean(slopes_arr > 0))

    return {
        "mean_distance_yr": float(np.mean(distances)),
        "fraction_near_minimum": near_count / len(RENAISSANCES),
        "positive_solar_slope_fraction": positive_slope_frac,
        "n_renaissances": len(RENAISSANCES),
    }


def empire_solar_overlap() -> list[dict[str, object]]:
    """Analyze each empire's overlap with grand minima.

    Returns a list of dicts with empire name, lifespan, and the
    fraction of its lifespan spent in grand minima.

    Returns
    -------
    list[dict]
        Per-empire analysis.
    """
    results = []
    for emp in EMPIRES:
        lifespan = emp.end - emp.start
        minimum_years = 0
        for year in range(emp.start, emp.end + 1):
            if is_grand_minimum(year):
                minimum_years += 1
        results.append({
            "name": emp.name,
            "lifespan": lifespan,
            "minimum_years": minimum_years,
            "minimum_fraction": minimum_years / max(lifespan, 1),
        })
    return results
