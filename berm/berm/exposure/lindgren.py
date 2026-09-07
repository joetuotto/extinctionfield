"""Legacy exposure helpers using the reduced Lindgren selection rule.

Lindgren 2025 supplies the ansatz ``g_uv = eta_uv + kappa A_u A_v``.  The
coefficient ``chi(A_bar) = A_bar / sqrt(1 + A_bar^2)`` is retained as an
L1-derived result of the geodesic-deviation chain.  Choosing the positive
``|A_bar|`` coordinate by an explicit dimensionless, collinear
Lorentz-to-Euclidean spatial/scalar reduction is an L2 bridge: the directed
derivative then evaluates the always-L1 formula as ``chi(|A_bar|)``.  Using a
legacy proxy as that coordinate is a separate L0-to-L2 identification and does
not close the open geometry-to-observable coupling.

Two-channel model: total = ambient + chi(ambient) * personal

Properties:
  chi(0) = 0: no linear response at zero background
  chi(A_bar) -> 1 as A_bar -> inf: saturates
  Odd: chi(-A_bar) = -chi(A_bar)
"""

import numpy as np
from numpy.typing import NDArray


def chi(a_bar: float | NDArray) -> float | NDArray:
    """L1: χ(Ā) = Ā/√(1+Ā²). Johdettu tilavuuselementin linearisaatiosta."""
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


def candidate_ion_channel_response(
    a_bar: float | NDArray,
    delta_v_mem: float | NDArray,
    bridge_coupling: float | NDArray,
) -> float | NDArray:
    """Evaluate the explicit L2 candidate response ``C·χ(Ā)·ΔV_mem``.

    The coefficient ``χ`` keeps its L1 status.  Multiplication by the supplied
    membrane-voltage shift and bridge coupling is the open L2 biological
    identification; neither quantity is claimed to follow from the metric.
    """

    return np.asarray(bridge_coupling) * chi(a_bar) * np.asarray(delta_v_mem)
