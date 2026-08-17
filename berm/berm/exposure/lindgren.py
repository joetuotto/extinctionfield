"""Lindgren geometric electromagnetism: g_uv = eta_uv + A_u A_v

Selection rule: chi(A_bar) = A_bar / sqrt(1 + A_bar^2)
Two-channel model: total = ambient + chi(ambient) * personal

Properties:
  chi(0) = 0: no linear response at zero background
  chi(A_bar) -> 1 as A_bar -> inf: saturates
  Odd: chi(-A_bar) = -chi(A_bar)
"""

import numpy as np
from numpy.typing import NDArray

def chi(a_bar: float | NDArray) -> float | NDArray:
    """Lindgren selection rule chi(A_bar) = A_bar / sqrt(1 + A_bar^2)."""
    a = np.asarray(a_bar)
    return a / np.sqrt(1 + a**2)

def chi_derivative(a_bar: float | NDArray) -> float | NDArray:
    """d(chi)/d(A_bar) = 1 / (1 + A_bar^2)^(3/2). Peak sensitivity at A_bar=0."""
    a = np.asarray(a_bar)
    return 1.0 / (1 + a**2) ** 1.5

def two_channel_exposure(
    ambient: float | NDArray,
    personal: float | NDArray,
) -> float | NDArray:
    """Two-channel exposure: ambient + chi(ambient) * personal."""
    return np.asarray(ambient) + chi(ambient) * np.asarray(personal)
