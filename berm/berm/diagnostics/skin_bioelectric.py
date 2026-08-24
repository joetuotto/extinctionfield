"""
Ihon biosähköinen sensorijärjestelmä — BERM v19.1 diagnostiikkamoduuli.

Mallintaa ihon transepiteliaalisen potentiaalin (TEP),
pietsosähköisen kohinan ja haavanparanumisen viiveen
EMF-altistuksen funktiona.

DIAGNOSTIC_ONLY: ei vaikuta TFR-ennusteeseen.
"""

from dataclasses import dataclass
from enum import IntEnum


class SkinChannel(IntEnum):
    TEP = 1
    PIEZO1 = 2
    TRPV4 = 3
    VGCC = 4


@dataclass
class SkinSensorProfile:
    channel: SkinChannel
    name: str
    ion_permeability: str
    resting_potential_mv: float
    emf_susceptible: bool
    role: str


SKIN_SENSORS = {
    "tep": SkinSensorProfile(
        channel=SkinChannel.TEP,
        name="Transepithelial potential (skin battery)",
        ion_permeability="Na⁺/K⁺ (ATPase-driven)",
        resting_potential_mv=35.0,
        emf_susceptible=True,
        role="Maintains endogenous electric field across epidermis",
    ),
    "piezo1": SkinSensorProfile(
        channel=SkinChannel.PIEZO1,
        name="PIEZO1 mechanotransducer",
        ion_permeability="Ca²⁺/Na⁺ (non-selective cation)",
        resting_potential_mv=0.0,
        emf_susceptible=True,
        role="Touch sensation in keratinocytes",
    ),
    "trpv4": SkinSensorProfile(
        channel=SkinChannel.TRPV4,
        name="TRPV4 multimodal sensor",
        ion_permeability="Ca²⁺ (primary)",
        resting_potential_mv=0.0,
        emf_susceptible=True,
        role="Integrates mechanical, thermal, UVB, osmotic signals",
    ),
    "vgcc": SkinSensorProfile(
        channel=SkinChannel.VGCC,
        name="VGCC (Cav1.2/CACNA1C)",
        ion_permeability="Ca²⁺ (voltage-gated)",
        resting_potential_mv=0.0,
        emf_susceptible=True,
        role="Piezoelectric signal transduction in dermis",
    ),
}


TEP_BASELINE_MV = 35.0
TEP_RANGE = (10.0, 60.0)
WOUND_EF_MV_PER_MM = 150.0
COLLAGEN_PIEZO_COEFF_PC_PER_N = 7.5


def tep_perturbation(emf_field_strength_v_per_m: float) -> dict:
    """Model TEP change under EMF exposure.

    At ambient urban levels (~0.67-1.51 V/m), TEP perturbation is small.
    At higher levels, Na⁺/K⁺-ATPase disruption reduces TEP measurably.
    """
    sensitivity = 0.8
    delta_mv = -sensitivity * emf_field_strength_v_per_m
    new_tep = max(0.0, TEP_BASELINE_MV + delta_mv)
    pct_change = (delta_mv / TEP_BASELINE_MV) * 100

    return {
        "baseline_tep_mv": TEP_BASELINE_MV,
        "emf_v_per_m": emf_field_strength_v_per_m,
        "tep_change_mv": round(delta_mv, 2),
        "new_tep_mv": round(new_tep, 2),
        "pct_change": round(pct_change, 1),
        "within_range": TEP_RANGE[0] <= new_tep <= TEP_RANGE[1],
    }


def piezoelectric_noise(emf_frequency_hz: float,
                        emf_field_strength_v_per_m: float = 1.0) -> dict:
    """Model signal-to-noise ratio for touch sensation under EMF.

    Piezoelectric collagen generates ~7.5 pC/N from mechanical touch.
    EMF induces competing voltage across the same VGCC channels.
    """
    touch_signal_pc = COLLAGEN_PIEZO_COEFF_PC_PER_N * 1.0

    if emf_frequency_hz <= 0:
        emf_noise_pc = 0.0
    else:
        freq_factor = min(emf_frequency_hz / 1000.0, 10.0)
        emf_noise_pc = 0.5 * emf_field_strength_v_per_m * (1.0 + freq_factor)

    snr = touch_signal_pc / max(emf_noise_pc, 0.001)

    return {
        "touch_signal_pc": round(touch_signal_pc, 2),
        "emf_noise_pc": round(emf_noise_pc, 3),
        "signal_to_noise": round(snr, 1),
        "degraded": snr < 10.0,
        "emf_frequency_hz": emf_frequency_hz,
        "emf_field_v_per_m": emf_field_strength_v_per_m,
    }


def wound_healing_delay(emf_exposure_v_per_m: float) -> dict:
    """Model wound healing delay under EMF interference.

    Endogenous wound EF is ~100-200 mV/mm.
    EMF superimposes noise on electrotactic guidance signals.
    """
    wound_ef = WOUND_EF_MV_PER_MM

    emf_interference = emf_exposure_v_per_m * 0.1
    interference_ratio = emf_interference / wound_ef

    delay_factor = 1.0 + interference_ratio * 0.5
    delay_factor = min(delay_factor, 2.0)

    return {
        "wound_ef_mv_per_mm": wound_ef,
        "emf_interference_mv_per_mm": round(emf_interference, 3),
        "interference_ratio": round(interference_ratio, 4),
        "delay_factor": round(delay_factor, 3),
        "delay_pct": round((delay_factor - 1.0) * 100, 1),
        "electrotaxis_impaired": interference_ratio > 0.1,
    }


def skin_convergence_points() -> dict:
    """Three convergence points of the skin bioelectric system."""
    return {
        "convergence_1_treatment": (
            "SSRI < TMS < Li⁺ < psychedelics → all converge on Ca²⁺"
        ),
        "convergence_2_sensory": (
            "Touch + EMF → VGCC/PIEZO1/TRPV4 → Ca²⁺ "
            "(same channel, different stimulus, indistinguishable)"
        ),
        "convergence_3_homeostasis": (
            "TEP + wound EF + piezoelectricity → ion channels → Ca²⁺ "
            "(EMF perturbs all three simultaneously)"
        ),
    }


def ehs_skin_mechanism() -> dict:
    """Predicted mechanism for EHS skin symptoms."""
    return {
        "symptoms": ["tingling", "burning", "itching", "redness", "numbness"],
        "mechanism_chain": [
            "EMF perturbs TEP (10-60 mV skin battery)",
            "TRPV4 multimodal activation → Ca²⁺ influx",
            "TRPV4 mediates histaminergic itch (PMC4858974)",
            "EMF-induced itch indistinguishable from allergic itch",
            "Collagen piezoelectric response to EMF → phantom touch",
        ],
        "testable_predictions": {
            "P17": "EMF exposure measurably reduces TEP; EHS patients show larger TEP drop",
            "P18": "Wound healing slower in high-EMF environments, controlling for confounders",
        },
        "falsification": {
            "P17": "No TEP change under EMF, or EHS patients show equal/smaller change",
            "P18": "No wound healing difference, or faster healing in high-EMF",
        },
    }
