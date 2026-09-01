"""BioCap integral computation.

BioCap(t, lambda) tracks cumulative biological carrying capacity as a
function of time and latitude. The integral combines degradation from
solar, urbanization, and electrification stressors with partial recovery
modulated by anthropogenic EM saturation.

Formula:
    BioCap(t,lam) = BioCap0
        - integral[ chi(lam) * (S(tau) + U(tau) + E(tau)) dtau ]
        + integral[ alpha * chi(lam) * (1-S(tau)) * (1-sigma(tau)) dtau ]

where:
    S(tau) = solar activity (normalized 0-1)
    U(tau) = urbanization proxy
    E(tau) = electrification proxy
    chi(lam) = latitude-dependent susceptibility
    alpha = recovery coefficient (~0.3)
    sigma(tau) = anthropogenic EM saturation
"""

from __future__ import annotations

import math

import numpy as np

from berm.civilization.solar_reconstruction import solar_activity
from berm.civilization.chi_map import chi_latitude

# Recovery coefficient: fraction of natural recovery realized per unit time
ALPHA = 0.3

# Integration step (years)
DT = 1.0


def urbanization_proxy(year: float) -> float:
    """Urbanization stressor proxy U(tau).

    Logistic growth from ~5% in 1800 to ~56% in 2020 (UN World
    Urbanization Prospects). Normalized to [0, 1].

    Parameters
    ----------
    year : float
        Calendar year.

    Returns
    -------
    float
        Urbanization fraction in [0, 1].
    """
    if year < 1000:
        return 0.02
    # Logistic centered at 1960 with growth rate ~0.025/yr
    midpoint = 1960.0
    k = 0.025
    raw = 1 / (1 + math.exp(-k * (year - midpoint)))
    return float(np.clip(raw, 0.0, 1.0))


def electrification_proxy(year: float) -> float:
    """Electrification stressor proxy E(tau).

    Models the global average grid + RF EM burden. Zero before 1880,
    ramps logistically to ~0.85 by 2020.

    Parameters
    ----------
    year : float
        Calendar year.

    Returns
    -------
    float
        Electrification burden in [0, 1].
    """
    if year < 1880:
        return 0.0
    midpoint = 1960.0
    k = 0.04
    raw = 1 / (1 + math.exp(-k * (year - midpoint)))
    return float(np.clip(0.85 * raw, 0.0, 1.0))


def sigma(year: float) -> float:
    """Anthropogenic EM saturation sigma(tau).

    0 before 1880, ramps to ~0.95 by 2020. Represents the degree
    to which anthropogenic EM fields have replaced natural recovery
    windows.

    Parameters
    ----------
    year : float
        Calendar year.

    Returns
    -------
    float
        EM saturation in [0, 1].
    """
    if year < 1880:
        return 0.0
    midpoint = 1960.0
    k = 0.045
    raw = 0.95 / (1 + math.exp(-k * (year - midpoint)))
    return float(np.clip(raw, 0.0, 0.95))


def biocap(
    t: float,
    lam: float,
    biocap0: float = 1.0,
    t_start: float = 1000.0,
) -> float:
    """Compute BioCap at time t for latitude lambda.

    Integrates degradation and recovery from t_start to t using the
    BioCap integral formula.

    Parameters
    ----------
    t : float
        Target year.
    lam : float
        Latitude in degrees.
    biocap0 : float
        Initial biological capacity (default 1.0).
    t_start : float
        Integration start year (default 1000 CE).

    Returns
    -------
    float
        BioCap value at (t, lam). Clamped to [0, biocap0].
    """
    if t <= t_start:
        return biocap0

    chi = chi_latitude(lam)
    years = np.arange(t_start, t, DT)
    degradation = 0.0
    recovery = 0.0

    for tau in years:
        s = solar_activity(tau)
        u = urbanization_proxy(tau)
        e = electrification_proxy(tau)
        sig = sigma(tau)

        # Degradation: stressor load weighted by chi
        degradation += chi * (s + u + e) * DT

        # Recovery: natural recovery during low solar activity,
        # suppressed by anthropogenic EM saturation
        recovery += ALPHA * chi * (1 - s) * (1 - sig) * DT

    # Scale factors: stressors are normalized 0-1 but accumulated
    # over centuries, so divide by total span to keep BioCap in
    # reasonable range
    span = t - t_start
    net_change = (recovery - degradation) / span

    result = biocap0 + net_change
    return float(np.clip(result, 0.0, biocap0))


def biocap_series(
    lam: float,
    start: float = 1000.0,
    end: float = 2025.0,
    step: float = 10.0,
    biocap0: float = 1.0,
) -> tuple[np.ndarray, np.ndarray]:
    """Generate a BioCap time series for a given latitude.

    Parameters
    ----------
    lam : float
        Latitude in degrees.
    start, end : float
        Year range.
    step : float
        Sample interval (years).
    biocap0 : float
        Initial biological capacity.

    Returns
    -------
    years : ndarray
        Year values.
    values : ndarray
        BioCap at each year.
    """
    years = np.arange(start, end, step)
    values = np.array([biocap(y, lam, biocap0, t_start=start) for y in years])
    return years, values
