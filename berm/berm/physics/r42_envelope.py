"""R42 envelope spectral metric and R43 locked predictions.

R42 window: biological band-pass at 20-40 mHz where Zandieh et al. (2025)
observed frequency-specific mitochondrial/ROS responses.

Xi_R42 quantifies how much of an RF envelope's spectral energy falls
inside this window. Higher Xi -> more biologically relevant modulation.
"""

from __future__ import annotations

import math

from berm.physics.gme_mixing import gme_nonlinear_coefficient

R42_CENTER_HZ = 0.030
R42_LOW_HZ = 0.02045
R42_HIGH_HZ = 0.03955
R42_BANDWIDTH_HZ = R42_HIGH_HZ - R42_LOW_HZ


def r42_window(f_hz: float) -> float:
    """Gaussian-weighted R42 biological band-pass window.

    Centered at 30 mHz, sigma ~ 5 mHz (matches Zandieh peak width).
    Returns weight in [0, 1].
    """
    sigma = 0.005
    return math.exp(-0.5 * ((f_hz - R42_CENTER_HZ) / sigma) ** 2)


def xi_r42_pulse_train(T_period: float, duty_cycle: float = 0.5,
                       n_harmonics: int = 20) -> float:
    """Compute Xi_R42 for a rectangular pulse train with period T.

    Fourier coefficients of rect pulse: A_n = D * sinc(n * D)
    where D = duty cycle.

    Xi = sum_n A_n^2 * W(f_n) where W is the R42 window.
    """
    xi = 0.0
    for n in range(1, n_harmonics + 1):
        f_n = n / T_period
        sinc_arg = n * duty_cycle
        if abs(sinc_arg) < 1e-12:
            a_n = duty_cycle
        else:
            a_n = duty_cycle * math.sin(math.pi * sinc_arg) / (
                math.pi * sinc_arg
            )
        xi += a_n ** 2 * r42_window(f_n)
    return xi


def xi_r42_from_protocol(
    T_edrx: float,
    ptw: float,
    drx_within_ptw: float = 2.56,
    bar_A: float = 1.0,
) -> dict:
    """Compute Xi_R42 from 3GPP protocol parameters.

    Two periodic layers:
    1. eDRX cycle (T_edrx): UE wake/sleep
    2. DRX within PTW (drx_within_ptw): paging monitoring
    """
    K_G = gme_nonlinear_coefficient(bar_A)
    K_G_sq = K_G ** 2

    D_edrx = ptw / T_edrx

    xi_edrx = 0.0
    for n in range(1, 20):
        f_n = n / T_edrx
        sinc_arg = n * D_edrx
        if abs(sinc_arg) < 1e-12:
            a_n = D_edrx
        else:
            a_n = D_edrx * math.sin(math.pi * sinc_arg) / (
                math.pi * sinc_arg
            )
        xi_edrx += a_n ** 2 * r42_window(f_n)

    D_drx = 0.1
    xi_drx = 0.0
    for n in range(1, 20):
        f_n = n / drx_within_ptw
        sinc_arg = n * D_drx
        if abs(sinc_arg) < 1e-12:
            a_n = D_drx
        else:
            a_n = D_drx * math.sin(math.pi * sinc_arg) / (
                math.pi * sinc_arg
            )
        xi_drx += a_n ** 2 * r42_window(f_n)

    xi_total = K_G_sq * (xi_edrx + xi_drx)

    return {
        "T_edrx": T_edrx,
        "ptw": ptw,
        "xi_edrx_layer": round(xi_edrx, 8),
        "xi_drx_layer": round(xi_drx, 8),
        "xi_total": round(xi_total, 8),
        "K_G_squared": round(K_G_sq, 6),
        "dominant_layer": "eDRX" if xi_edrx > xi_drx else "DRX",
    }


def r43_locked_conditions() -> list[dict]:
    """Return the 8 locked R43 experimental conditions with predicted Xi values.

    Updated 2026-08-18: All conditions now use eDRX cycle values.
    PTW values (25.60, 33.28) removed — PTW is a window duration,
    not a periodic timer, and does not produce spectral lines.

    The ONLY eDRX fundamental inside R42 is 40.96s -> 24.414 mHz.
    """
    conditions = [
        {"id": "C1_below", "T_s": 10.24, "label": "Below R42 (negative control)"},
        {"id": "C2_edrx20", "T_s": 20.48, "label": "eDRX shortest"},
        {"id": "C3_edrx40", "T_s": 40.96, "label": "eDRX fundamental hit (24.4 mHz)"},
        {"id": "C4_edrx81", "T_s": 81.92, "label": "eDRX harmonics 2-3 in R42"},
        {"id": "C5_edrx163", "T_s": 163.84, "label": "eDRX harmonics 4-6 in R42"},
        {"id": "C6_edrx327", "T_s": 327.68, "label": "eDRX high harmonics"},
        {"id": "C7_edrx655", "T_s": 655.36, "label": "eDRX very long (near-negative)"},
        {"id": "C8_nbiot", "T_s": 100.00, "label": "NB-IoT typical"},
    ]

    for c in conditions:
        c["xi_r42"] = round(xi_r42_pulse_train(c["T_s"], duty_cycle=0.5), 8)

    max_xi = max(c["xi_r42"] for c in conditions)
    for c in conditions:
        c["xi_norm"] = round(c["xi_r42"] / max_xi, 4) if max_xi > 0 else 0.0

    conditions.sort(key=lambda c: -c["xi_r42"])

    return conditions


def protocol_landscape() -> list[dict]:
    """Compute Xi_R42 for all 3GPP eDRX/PTW combinations.

    Returns sorted list (highest Xi first) showing which protocol
    parameter combinations produce the most R42-band energy.
    """
    from berm.physics.threegpp_convergence import (
        EDRX_CYCLES_SECONDS,
        PTW_VALUES_SECONDS,
    )

    results = []
    for T_edrx in EDRX_CYCLES_SECONDS[:4]:
        for ptw in PTW_VALUES_SECONDS:
            if ptw > T_edrx:
                continue
            xi = xi_r42_from_protocol(T_edrx, ptw)
            results.append({
                "T_edrx": T_edrx,
                "ptw": ptw,
                "xi_total": xi["xi_total"],
            })

    results.sort(key=lambda x: -x["xi_total"])
    return results
