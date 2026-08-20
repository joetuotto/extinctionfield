"""Peak field exposure for pulsed radar systems.

Corrects the RMS-averaging error: 85% of BERM biological pathways
(A: VGIC 45%, B: CRY/RPM 25%, D: HPA 15%) respond to peak field,
not time-averaged RMS. Only pathway C (BBB, 15%) responds to SAR/RMS.

Nike LOPAR example at 1 km sidelobe:
  E_peak = 24.5 V/m   (single 1 µs pulse)
  E_rms  = 0.037 V/m  (time-averaged)
  Ratio  = 671:1

The biological sigmoid S(E_peak) reaches 50% at 95 km,
while S(E_rms) reaches 50% at 0.14 km.
"""

from __future__ import annotations

import math
from berm.biology.pathways import biological_sigmoid

PATHWAY_PEAK_SENSITIVITY = {
    "A_VGIC": {"weight": 0.45, "responds_to": "peak"},
    "B_CRY_RPM": {"weight": 0.25, "responds_to": "peak"},
    "C_BBB": {"weight": 0.15, "responds_to": "rms"},
    "D_HPA": {"weight": 0.15, "responds_to": "peak"},
}

PEAK_WEIGHT = sum(
    v["weight"] for v in PATHWAY_PEAK_SENSITIVITY.values()
    if v["responds_to"] == "peak"
)  # 0.85

RMS_WEIGHT = sum(
    v["weight"] for v in PATHWAY_PEAK_SENSITIVITY.values()
    if v["responds_to"] == "rms"
)  # 0.15

RECOVERY_LAYERS = [
    {"name": "VGIC", "alpha": 1.0, "weight": 0.10},
    {"name": "ROS", "alpha": 0.8, "weight": 0.30},
    {"name": "DNA", "alpha": 0.1, "weight": 0.25},
    {"name": "Leydig", "alpha": 0.3, "weight": 0.20},
    {"name": "Neuron", "alpha": 0.0, "weight": 0.15},
]


def sidelobe_peak_field(
    p_peak_w: float,
    g_main_dbi: float,
    sidelobe_db: float,
    r_m: float,
) -> float:
    """Peak electric field in the sidelobe at distance r_m (V/m).

    E_peak = sqrt(P_peak * G_sidelobe * Z0 / (4*pi*r²))
    """
    g_sl = 10 ** (g_main_dbi / 10) * 10 ** (sidelobe_db / 10)
    z0 = 377.0
    return math.sqrt(p_peak_w * g_sl * z0 / (4 * math.pi * r_m ** 2))


def sidelobe_rms_field(
    p_peak_w: float,
    g_main_dbi: float,
    sidelobe_db: float,
    r_m: float,
    prf_hz: float,
    pulse_s: float,
    beam_deg: float,
) -> float:
    """Time-averaged RMS field accounting for duty cycle and beam sweep."""
    dc = prf_hz * pulse_s * beam_deg / 360.0
    g_sl = 10 ** (g_main_dbi / 10) * 10 ** (sidelobe_db / 10)
    z0 = 377.0
    return math.sqrt(p_peak_w * g_sl * dc * z0 / (4 * math.pi * r_m ** 2))


def peak_rms_ratio(prf_hz: float, pulse_s: float, beam_deg: float) -> float:
    """Ratio of peak to RMS field."""
    dc = prf_hz * pulse_s * beam_deg / 360.0
    return 1.0 / math.sqrt(dc)


def pathway_weighted_sigmoid(e_peak: float, e_rms: float) -> float:
    """Effective biological response weighting peak and RMS by pathway.

    85% of pathways (A, B, D) use S(E_peak).
    15% of pathways (C) use S(E_rms).
    """
    return PEAK_WEIGHT * biological_sigmoid(e_peak) + RMS_WEIGHT * biological_sigmoid(e_rms)


def permanent_damage(e_peak: float) -> float:
    """Recovery-weighted permanent damage fraction.

    Each layer has a recovery coefficient alpha (0=irreversible, 1=full).
    Damage = sum_i((1 - alpha_i) * S(E_peak) * weight_i)
    """
    s = biological_sigmoid(e_peak)
    return sum(
        (1 - layer["alpha"]) * s * layer["weight"]
        for layer in RECOVERY_LAYERS
    )


def nike_lopar_peak_field(r_km: float) -> float:
    """Nike LOPAR sidelobe peak field at distance r_km."""
    return sidelobe_peak_field(
        p_peak_w=1e6,
        g_main_dbi=33.0,
        sidelobe_db=-20.0,
        r_m=r_km * 1000.0,
    )


def nike_lopar_rms_field(r_km: float) -> float:
    """Nike LOPAR sidelobe RMS field at distance r_km."""
    return sidelobe_rms_field(
        p_peak_w=1e6,
        g_main_dbi=33.0,
        sidelobe_db=-20.0,
        r_m=r_km * 1000.0,
        prf_hz=400.0,
        pulse_s=1e-6,
        beam_deg=2.0,
    )
