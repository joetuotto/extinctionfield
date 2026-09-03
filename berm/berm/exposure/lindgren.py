"""Legacy exposure helpers and the normalized Lindgren geometry coordinate.

Lindgren 2025 supplies the ansatz ``g_uv = eta_uv + kappa A_u A_v``.  For an
explicitly normalized positive-norm mode, the same bounded shape follows from
the rank-one inverse metric as the coordinate ``chi_geo``.  It remains only a
geometric coordinate: BERM's use of it in the legacy two-channel technology-
timing proxy is not a Lindgren-derived biological response.

Two-channel model: total = ambient + chi(ambient) * personal

Properties:
  chi(0) = 0: no linear response at zero background
  chi(A_bar) -> 1 as A_bar -> inf: saturates
  Odd: chi(-A_bar) = -chi(A_bar)
"""

import numpy as np
from numpy.typing import NDArray

def chi(a_bar: float | NDArray) -> float | NDArray:
    """Legacy signed proxy; its non-negative branch has the ``chi_geo`` shape.

    The sign-preserving extension is retained for compatibility with the
    archived v17 proxy.  ``geometric_chi`` is the stricter geometry API and
    accepts only the non-negative normalized magnitude ``rho``.
    """
    a = np.asarray(a_bar)
    result = a / np.sqrt(1 + a**2)
    return float(result) if result.ndim == 0 else result

def chi_derivative(a_bar: float | NDArray) -> float | NDArray:
    """d(chi)/d(A_bar) = 1 / (1 + A_bar^2)^(3/2). Peak sensitivity at A_bar=0."""
    a = np.asarray(a_bar)
    return 1.0 / (1 + a**2) ** 1.5

def two_channel_exposure(
    ambient: float | NDArray,
    personal: float | NDArray,
) -> float | NDArray:
    """Legacy proxy combination, not a calibrated biological response."""
    return np.asarray(ambient) + chi(ambient) * np.asarray(personal)
