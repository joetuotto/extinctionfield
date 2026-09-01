"""DIAGNOSTIC_ONLY: Secular biomarker trajectories for civilization-level modeling.

Hardcoded trend data for eight biomarkers, modeled as logistic declines
(or increases, for cortisol) from historical baselines. Each trajectory
produces normalized values at any given year, enabling BioCap computation
across the 1900-2060 range.
"""

from __future__ import annotations

import math

from berm.civilization.cultural_energy import compute_biocap


# Trend parameters per biomarker.
# For positive markers (higher = better): value declines from 1.0 toward
#   (1.0 - max_decline) following a logistic centered at midpoint_year.
# For CORT (higher = worse): value rises from 0.0 toward max_rise.
#
# Fields: (midpoint_year, logistic_k, max_change, direction)
#   direction: "decline" for positive markers, "rise" for cortisol.
TREND_DATA: dict[str, dict] = {
    "T": {
        "midpoint_year": 2000,
        "k": 0.06,
        "max_change": 0.55,
        "direction": "decline",
    },
    "OXT": {
        "midpoint_year": 2010,
        "k": 0.08,
        "max_change": 0.50,
        "direction": "decline",
    },
    "DA": {
        "midpoint_year": 2015,
        "k": 0.10,
        "max_change": 0.45,
        "direction": "decline",
    },
    "MEL": {
        "midpoint_year": 1995,
        "k": 0.04,
        "max_change": 0.55,
        "direction": "decline",
    },
    "BDNF": {
        "midpoint_year": 2015,
        "k": 0.06,
        "max_change": 0.40,
        "direction": "decline",
    },
    "CORT": {
        "midpoint_year": 2005,
        "k": 0.06,
        "max_change": 0.70,
        "direction": "rise",
    },
    "D": {
        "midpoint_year": 2000,
        "k": 0.05,
        "max_change": 0.45,
        "direction": "decline",
    },
    "B2": {
        "midpoint_year": 2010,
        "k": 0.04,
        "max_change": 0.30,
        "direction": "decline",
    },
}


class BiomarkerTrajectory:
    """Compute normalized biomarker value at a given year.

    Uses a logistic curve parameterized by midpoint year, steepness (k),
    maximum change, and direction (decline or rise).
    """

    def __init__(self, name: str, params: dict) -> None:
        self.name = name
        self.midpoint_year: float = params["midpoint_year"]
        self.k: float = params["k"]
        self.max_change: float = params["max_change"]
        self.direction: str = params["direction"]

    def value_at(self, year: float) -> float:
        """Return the normalized biomarker value at the given year.

        Returns
        -------
        float
            Value in [0, 1].
        """
        logistic = 1.0 / (1.0 + math.exp(-self.k * (year - self.midpoint_year)))

        if self.direction == "decline":
            # Starts near 1.0, declines toward (1.0 - max_change)
            val = 1.0 - self.max_change * logistic
        else:
            # Starts near 0.0, rises toward max_change
            val = self.max_change * logistic

        return max(0.0, min(1.0, val))


# Pre-built trajectory objects for each biomarker.
TRAJECTORIES: dict[str, BiomarkerTrajectory] = {
    name: BiomarkerTrajectory(name, params)
    for name, params in TREND_DATA.items()
}


def biomarker_values_at(year: float) -> dict[str, float]:
    """Return all eight biomarker values at the given year.

    Parameters
    ----------
    year : float
        Calendar year.

    Returns
    -------
    dict
        Mapping from biomarker name to normalized value.
    """
    return {name: traj.value_at(year) for name, traj in TRAJECTORIES.items()}


def get_trajectory(
    start_year: int = 1900,
    end_year: int = 2060,
    step: int = 5,
) -> list[dict]:
    """Generate a trajectory of biomarker values and BioCap over time.

    Parameters
    ----------
    start_year : int
        First year in the trajectory.
    end_year : int
        Last year (exclusive) in the trajectory.
    step : int
        Year interval between data points.

    Returns
    -------
    list[dict]
        Each dict contains 'year', one key per biomarker, and 'biocap'.
    """
    result: list[dict] = []
    year = start_year
    while year < end_year:
        markers = biomarker_values_at(year)
        bc = compute_biocap(markers)
        entry: dict = {"year": year}
        entry.update(markers)
        entry["biocap"] = bc
        result.append(entry)
        year += step
    return result
