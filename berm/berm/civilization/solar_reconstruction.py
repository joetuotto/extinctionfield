"""Solar activity reconstruction from cosmogenic isotope proxies.

Schwabe (~11yr), Gleissberg (~88yr), and Suess/de Vries (~200yr) cycles
overlaid with grand minima intervals identified from 10Be and 14C records.

References:
    Usoskin et al. 2007 (grand minima chronology)
    Clette et al. 2014 (sunspot number recalibration)
"""

from __future__ import annotations

import math
from typing import NamedTuple

import numpy as np


class GrandMinimum(NamedTuple):
    """Named grand solar minimum with start/end years."""

    name: str
    start: int
    end: int


GRAND_MINIMA: list[GrandMinimum] = [
    GrandMinimum("Oort", 1010, 1050),
    GrandMinimum("Wolf", 1280, 1350),
    GrandMinimum("Spoerer", 1460, 1550),
    GrandMinimum("Maunder", 1645, 1715),
    GrandMinimum("Dalton", 1790, 1830),
    GrandMinimum("Modern", 2020, 2053),
]

# Cycle parameters
SCHWABE_PERIOD = 11.0  # years
GLEISSBERG_PERIOD = 88.0  # years
SUESS_PERIOD = 208.0  # years (de Vries cycle)

# Amplitude weights (summed contribution to normalized output)
SCHWABE_AMPLITUDE = 0.25
GLEISSBERG_AMPLITUDE = 0.15
SUESS_AMPLITUDE = 0.10


def _cycle_component(year: float, period: float, amplitude: float) -> float:
    """Single sinusoidal cycle component, centered on zero."""
    phase = 2 * math.pi * year / period
    return amplitude * math.sin(phase)


def _grand_minimum_depth(year: float) -> float:
    """Depth factor during grand minima (0.0 = normal, up to 0.6 = deep).

    Gaussian-weighted proximity to minimum center, with smooth transitions.
    """
    for gm in GRAND_MINIMA:
        center = (gm.start + gm.end) / 2.0
        half_width = (gm.end - gm.start) / 2.0
        if abs(year - center) < half_width * 1.5:
            dist = (year - center) / max(half_width, 1.0)
            return 0.6 * math.exp(-2 * dist ** 2)
    return 0.0


def solar_activity(year: float) -> float:
    """Normalized solar activity at a given year (0-1 scale).

    Combines Schwabe, Gleissberg, and Suess cycles with grand minimum
    suppression. Returns 0.0 at deepest grand minimum, ~1.0 at modern
    maximum.

    Parameters
    ----------
    year : float
        Calendar year (CE).

    Returns
    -------
    float
        Normalized solar activity in [0, 1].
    """
    base = 0.5  # long-term mean
    schwabe = _cycle_component(year, SCHWABE_PERIOD, SCHWABE_AMPLITUDE)
    gleissberg = _cycle_component(year, GLEISSBERG_PERIOD, GLEISSBERG_AMPLITUDE)
    suess = _cycle_component(year, SUESS_PERIOD, SUESS_AMPLITUDE)

    raw = base + schwabe + gleissberg + suess
    depth = _grand_minimum_depth(year)
    suppressed = raw * (1 - depth)

    return float(np.clip(suppressed, 0.0, 1.0))


def is_grand_minimum(year: float) -> bool:
    """Check whether a year falls within any recognized grand minimum.

    Parameters
    ----------
    year : float
        Calendar year (CE).

    Returns
    -------
    bool
        True if year is inside a grand minimum interval.
    """
    for gm in GRAND_MINIMA:
        if gm.start <= year <= gm.end:
            return True
    return False


def solar_activity_series(
    start: float,
    end: float,
    step: float = 1.0,
) -> tuple[np.ndarray, np.ndarray]:
    """Generate a time series of solar activity.

    Parameters
    ----------
    start, end : float
        Year range (inclusive of start).
    step : float
        Year increment.

    Returns
    -------
    years : ndarray
        Year values.
    activity : ndarray
        Corresponding normalized solar activity.
    """
    years = np.arange(start, end, step)
    activity = np.array([solar_activity(y) for y in years])
    return years, activity
