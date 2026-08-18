"""GME (Geometric Mixing Effect) core functions.

Full-Weyl metric self-mixing: RF envelope transfers to baseband
via quadratic nonlinearity inherent in curved-space electrodynamics.

Source: Lindgren geometry (single paper, not replicated).
Epistemic level: L* (theoretical derivation, no experimental confirmation).
"""

from __future__ import annotations

import math


def gme_background_response(bar_alpha: float) -> float:
    """Full-Weyl metric hotspot curvature R_G(alpha_bar).

    R_G = 3 * alpha_bar^2 / (1 + alpha_bar^2)

    Properties:
      R_G(0) = 0  (flat space, no mixing)
      R_G(1) = 1.5  (critical coupling)
      R_G(inf) -> 3  (saturation)
    """
    return 3.0 * bar_alpha ** 2 / (1.0 + bar_alpha ** 2)


def gme_nonlinear_coefficient(bar_alpha: float) -> float:
    """Nonlinear coupling coefficient C(alpha_bar).

    C = (2*alpha_bar^2 - 1) / (alpha_bar * (1 + alpha_bar^2))

    Zero crossing at alpha_bar = 1/sqrt(2) ~ 0.707.
    Diverges as alpha_bar -> 0 (C ~ -1/alpha_bar).
    """
    if abs(bar_alpha) < 1e-12:
        return float("-inf")
    return (2.0 * bar_alpha ** 2 - 1.0) / (
        bar_alpha * (1.0 + bar_alpha ** 2)
    )


def gme_envelope_selfmixing(
    rf_power_series: list[float],
    bar_A: float = 1.0,
) -> dict:
    """Compute baseband component from RF envelope via GME self-mixing.

    The squared field u^2(t) contains a |x(t)|^2 baseband branch.
    K_G^2(A_bar) is the coupling coefficient.

    Parameters
    ----------
    rf_power_series : instantaneous RF power samples (linear, not dBm)
    bar_A : normalized background field amplitude
    """
    K_G = gme_nonlinear_coefficient(bar_A)
    K_G_sq = K_G ** 2

    n = len(rf_power_series)
    if n == 0:
        return {
            "K_G": K_G,
            "K_G_squared": K_G_sq,
            "baseband_rms": 0.0,
        }

    mean_sq = sum(p ** 2 for p in rf_power_series) / n
    baseband_rms = math.sqrt(K_G_sq / 4.0 * mean_sq)

    return {
        "K_G": round(K_G, 8),
        "K_G_squared": round(K_G_sq, 8),
        "baseband_rms": round(baseband_rms, 8),
    }
