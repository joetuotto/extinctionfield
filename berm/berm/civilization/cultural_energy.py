"""DIAGNOSTIC_ONLY: Cultural energy model from biomarker-derived BioCap.

Computes biological carrying capacity (BioCap) as a weighted composite of
eight biomarkers, then derives cultural energy as the product of population,
BioCap, and an efficiency parameter.

BioCap = sum(w_i * marker_i) for each biomarker, where cortisol carries a
negative weight (higher cortisol degrades capacity).

Cultural energy follows E_c = N * BioCap * eta, connecting population scale
to biological substrate quality.
"""

from __future__ import annotations

import math


# Biomarker weights: positive markers contribute proportionally,
# cortisol (CORT) carries a negative weight.
BIOMARKER_WEIGHTS: dict[str, float] = {
    "T": 0.20,       # testosterone
    "OXT": 0.20,     # oxytocin
    "DA": 0.15,      # dopamine
    "MEL": 0.15,     # melatonin
    "BDNF": 0.10,    # brain-derived neurotrophic factor
    "CORT": -0.10,   # cortisol (negative: higher is worse)
    "D": 0.05,       # vitamin D
    "B2": 0.05,      # riboflavin
}

REQUIRED_MARKERS: frozenset[str] = frozenset(BIOMARKER_WEIGHTS.keys())


def compute_biocap(biomarker_dict: dict[str, float]) -> float:
    """Compute BioCap from eight normalized biomarker values.

    Parameters
    ----------
    biomarker_dict : dict
        Keys: T, OXT, DA, MEL, BDNF, CORT, D, B2.
        Values: normalized floats in [0, 1], where 1.0 represents
        the historical optimum for positive markers and the maximum
        observed level for cortisol.

    Returns
    -------
    float
        Weighted BioCap score, clamped to [0, 1].

    Raises
    ------
    KeyError
        If any required biomarker key is missing.
    """
    missing = REQUIRED_MARKERS - set(biomarker_dict.keys())
    if missing:
        raise KeyError(f"Missing biomarker keys: {sorted(missing)}")

    raw = sum(
        BIOMARKER_WEIGHTS[k] * biomarker_dict[k]
        for k in REQUIRED_MARKERS
    )
    return max(0.0, min(1.0, raw))


def compute_cultural_energy(
    N: float,
    biocap: float,
    eta: float = 1.0,
) -> float:
    """Compute cultural energy from population and BioCap.

    E_c = N * BioCap * eta

    Parameters
    ----------
    N : float
        Population size.
    biocap : float
        Biological carrying capacity in [0, 1].
    eta : float
        Efficiency multiplier (default 1.0). Encodes institutional,
        technological, and organizational factors.

    Returns
    -------
    float
        Cultural energy (non-negative).
    """
    return max(0.0, N * biocap * eta)
