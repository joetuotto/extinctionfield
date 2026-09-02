"""Migration gradient model: BioCap contrast between regions.

Predicts migration pressure as a function of the BioCap differential
between source and destination regions. The biologically stronger
population (higher BioCap, shorter cumulative electromagnetic exposure)
expands into the weaker one -- the pattern of Germanic tribes into Rome,
Arabs into Byzantium, and today Sub-Saharan Africa into Western Europe --
modulated by demographic pressure (TFR above replacement).

Regional BioCap is computed with biocap(year, lat, region=name), so each
region's electrification history (chi_map.chi_electrification) adds to
its latitude baseline.
"""

from __future__ import annotations

from typing import NamedTuple

import numpy as np

from berm.civilization.biocap import biocap
from berm.civilization.chi_map import chi_total


class Region(NamedTuple):
    """Macro-region parameters for migration gradient model."""

    name: str
    lat: float  # representative latitude
    electrification_year: int
    current_biocap_estimate: float  # 0-1 scale, circa 2020
    tfr: float  # total fertility rate circa 2020


REGIONS: dict[str, Region] = {
    "Sub-Saharan Africa": Region(
        "Sub-Saharan Africa", 0.0, 1955, 0.72, 4.6,
    ),
    "Middle East": Region(
        "Middle East", 30.0, 1935, 0.55, 2.8,
    ),
    "South Asia": Region(
        "South Asia", 20.0, 1930, 0.50, 2.2,
    ),
    "Latin America": Region(
        "Latin America", -15.0, 1925, 0.52, 2.0,
    ),
    "East Asia": Region(
        "East Asia", 35.0, 1920, 0.38, 1.2,
    ),
    "Western Europe": Region(
        "Western Europe", 50.0, 1882, 0.35, 1.5,
    ),
    "USA": Region(
        "USA", 38.0, 1882, 0.40, 1.7,
    ),
    "Japan": Region(
        "Japan", 36.0, 1887, 0.30, 1.3,
    ),
    "South Korea": Region(
        "South Korea", 37.0, 1910, 0.25, 0.8,
    ),
}


def biocap_gradient(
    source_region: str,
    dest_region: str,
    year: float,
) -> float:
    """Biological capacity contrast between two regions at a given year.

    Positive values indicate the source has higher BioCap than the
    destination (expansion/migration pressure from the biologically
    stronger source into the weaker destination). Negative values
    indicate the destination is the stronger population.

    Parameters
    ----------
    source_region : str
        Source region name (key in REGIONS).
    dest_region : str
        Destination region name (key in REGIONS).
    year : float
        Calendar year for the comparison.

    Returns
    -------
    float
        BioCap(source) - BioCap(dest). Positive = pressure toward dest.

    Raises
    ------
    KeyError
        If either region is not in REGIONS.
    """
    src = REGIONS[source_region]
    dst = REGIONS[dest_region]

    src_biocap = biocap(year, src.lat, region=src.name)
    dst_biocap = biocap(year, dst.lat, region=dst.name)

    return src_biocap - dst_biocap


def migration_pressure(
    source_region: str,
    dest_region: str,
    year: float,
) -> float:
    """Migration pressure index (0-1) from source to destination.

    Combines the BioCap gradient (source stronger than destination) with
    TFR-driven population pressure. Higher values indicate stronger
    migration drive from source into destination.

    Parameters
    ----------
    source_region, dest_region : str
        Region names.
    year : float
        Calendar year.

    Returns
    -------
    float
        Migration pressure index in [0, 1].
    """
    grad = biocap_gradient(source_region, dest_region, year)
    src = REGIONS[source_region]

    # TFR-driven population pressure (higher TFR = more young people
    # seeking opportunity)
    tfr_pressure = max(0.0, (src.tfr - 2.1) / 4.0)  # replacement = 2.1

    # Combine gradient and demographic pressure
    raw = 0.6 * max(0.0, grad) + 0.4 * tfr_pressure
    return float(np.clip(raw, 0.0, 1.0))


def gradient_matrix(year: float) -> dict[str, dict[str, float]]:
    """Pairwise BioCap gradient matrix for all regions.

    Parameters
    ----------
    year : float
        Calendar year.

    Returns
    -------
    dict
        Nested dict: result[source][dest] = gradient value.
    """
    names = list(REGIONS.keys())
    matrix: dict[str, dict[str, float]] = {}
    for src in names:
        matrix[src] = {}
        for dst in names:
            if src == dst:
                matrix[src][dst] = 0.0
            else:
                matrix[src][dst] = biocap_gradient(src, dst, year)
    return matrix
