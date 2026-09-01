"""Empire lifespan analysis and Suess cycle comparison.

Tests whether the ~200yr Suess/de Vries solar cycle is reflected in
empire lifespan distributions. Many major empires last approximately
200-300 years, which could reflect environmental forcing through
BioCap oscillations.
"""

from __future__ import annotations

import math

import numpy as np

from berm.civilization.solar_reconstruction import SUESS_PERIOD
from berm.civilization.historical_test import EMPIRES, Empire


# Extended empire dataset for statistical power
EXTENDED_EMPIRES: list[Empire] = [
    *EMPIRES,
    Empire("Achaemenid", -550, -330, 32.0, -480),
    Empire("Macedonian", -336, -168, 40.0, -323),
    Empire("Gupta", 320, 550, 25.0, 450),
    Empire("Tang", 618, 907, 34.0, 750),
    Empire("Holy Roman", 962, 1806, 50.0, 1200),
    Empire("Mughal", 1526, 1857, 28.0, 1700),
    Empire("Portuguese", 1415, 1999, 39.0, 1550),
    Empire("Dutch", 1602, 1949, 52.0, 1670),
    Empire("French Colonial", 1534, 1962, 49.0, 1810),
    Empire("Russian/Soviet", 1721, 1991, 56.0, 1945),
]


def empire_lifespans() -> list[tuple[str, int]]:
    """Extract (name, lifespan) pairs for all extended empires.

    Returns
    -------
    list[tuple[str, int]]
        Sorted by lifespan descending.
    """
    spans = [(e.name, e.end - e.start) for e in EXTENDED_EMPIRES]
    return sorted(spans, key=lambda x: x[1], reverse=True)


def empire_lifespan_distribution() -> dict[str, float]:
    """Descriptive statistics on empire lifespans.

    Returns
    -------
    dict
        Keys: mean, median, std, min, max, n.
    """
    spans = np.array([e.end - e.start for e in EXTENDED_EMPIRES], dtype=float)
    return {
        "mean": float(np.mean(spans)),
        "median": float(np.median(spans)),
        "std": float(np.std(spans, ddof=1)),
        "min": float(np.min(spans)),
        "max": float(np.max(spans)),
        "n": float(len(spans)),
    }


def suess_cycle_match() -> dict[str, float]:
    """Compare empire lifespans to the ~200yr Suess cycle.

    Computes how many empires have lifespans within 1 standard
    deviation of the Suess period, and the circular-statistics
    alignment of lifespans modulo the Suess period.

    Returns
    -------
    dict
        Keys: suess_period, fraction_within_1sd, mean_phase_alignment,
              rayleigh_r, mean_lifespan.
    """
    spans = np.array([e.end - e.start for e in EXTENDED_EMPIRES], dtype=float)
    mean_span = float(np.mean(spans))
    std_span = float(np.std(spans, ddof=1))

    # Fraction of empires within SUESS_PERIOD +/- 1 std
    within_1sd = np.sum(
        np.abs(spans - SUESS_PERIOD) < std_span,
    )
    fraction = float(within_1sd) / len(spans)

    # Circular statistics: phase alignment of lifespans mod Suess period
    phases = 2 * math.pi * (spans % SUESS_PERIOD) / SUESS_PERIOD
    mean_cos = float(np.mean(np.cos(phases)))
    mean_sin = float(np.mean(np.sin(phases)))
    rayleigh_r = math.sqrt(mean_cos ** 2 + mean_sin ** 2)
    mean_phase = math.atan2(mean_sin, mean_cos) / (2 * math.pi) * SUESS_PERIOD

    return {
        "suess_period": SUESS_PERIOD,
        "fraction_within_1sd": fraction,
        "mean_phase_alignment_yr": mean_phase,
        "rayleigh_r": rayleigh_r,
        "mean_lifespan": mean_span,
    }


def lifespan_histogram_bins(
    bin_width: float = 50.0,
) -> tuple[np.ndarray, np.ndarray]:
    """Histogram of empire lifespans.

    Parameters
    ----------
    bin_width : float
        Bin width in years.

    Returns
    -------
    edges : ndarray
        Bin edges.
    counts : ndarray
        Count per bin.
    """
    spans = np.array([e.end - e.start for e in EXTENDED_EMPIRES], dtype=float)
    max_span = float(np.max(spans))
    edges = np.arange(0, max_span + bin_width, bin_width)
    counts, _ = np.histogram(spans, bins=edges)
    return edges, counts
