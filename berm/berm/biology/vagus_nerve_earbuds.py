"""Vagus nerve stimulation analogy for earbud RF exposure.

VNS devices: electrical stimulation via vagus nerve produces systemic
anti-inflammatory effects and modulates CNS function.

GammaCore (electroCore) stimulates the CERVICAL vagus nerve externally.
Earbuds (AirPods, Galaxy Buds) sit in the ear canal, near the auricular
branch of the vagus nerve AND the cervical vagus nerve.

If intentional VNS produces measurable systemic effects, unintentional
RF exposure at the same anatomical location may produce unintended effects.

Status: DIAGNOSTIC_ONLY — the VNS-earbud analogy generates testable
predictions but requires empirical validation.
"""

from __future__ import annotations

from dataclasses import dataclass


@dataclass(frozen=True)
class VNSComparison:
    """Comparison between therapeutic VNS and earbud RF exposure."""

    parameter: str
    vns_value: str
    earbud_value: str
    ratio_or_note: str


VAGUS_ANATOMY = {
    "vns_target": (
        "Cervical vagus nerve (GammaCore) or auricular branch "
        "(auricular stimulation)"
    ),
    "earbud_position": (
        "In ear canal, <2 cm from vagus auricular branch. "
        "Bluetooth 2.4 GHz, continuous connection 4-8 h/day."
    ),
    "proximity_mm": 15,
}


VNS_VS_EARBUD_PARAMETERS: list[VNSComparison] = [
    VNSComparison(
        parameter="frequency",
        vns_value="5 kHz carrier, 25 Hz modulation",
        earbud_value="2.4 GHz Bluetooth",
        ratio_or_note="VNS: low freq, high intensity, short duration",
    ),
    VNSComparison(
        parameter="intensity",
        vns_value="~24 V peak, 1-24 mA",
        earbud_value="~4 dBm (2.5 mW)",
        ratio_or_note="VNS 1000x higher intensity",
    ),
    VNSComparison(
        parameter="duration",
        vns_value="2 min treatment session",
        earbud_value="4-8 h/day continuous",
        ratio_or_note="Earbud 120-240x longer exposure",
    ),
    VNSComparison(
        parameter="pattern",
        vns_value="Intentional pulse pattern",
        earbud_value="Pulsed data transmission",
        ratio_or_note="Both pulsed, different modulation",
    ),
]


PREDICTED_EARBUD_EFFECTS = {
    "anti_inflammatory_impairment": (
        "Vagal tone disruption -> chronic low-grade inflammation"
    ),
    "oxytocin_disruption": (
        "Vagus-OT axis (Poutahidis MIT): RF disruption -> OT production "
        "decrease -> social bonding decrease -> pair formation motivation decrease"
    ),
    "gut_brain_axis": (
        "Vagus mediates gut signals to brain. RF disruption -> gut-brain "
        "axis disruption -> mental health effects"
    ),
}


def vagus_earbud_analysis() -> dict:
    """Full analysis of earbud-vagus nerve interaction.

    Returns anatomical, parameter, and prediction data.
    """
    return {
        "anatomy": VAGUS_ANATOMY,
        "parameter_comparison": [
            {
                "parameter": c.parameter,
                "vns": c.vns_value,
                "earbud": c.earbud_value,
                "note": c.ratio_or_note,
            }
            for c in VNS_VS_EARBUD_PARAMETERS
        ],
        "predicted_effects": PREDICTED_EARBUD_EFFECTS,
        "testable_prediction": (
            "Heavy earbud users (>4h/day) should have lower vagal tone "
            "(measurable via heart rate variability, HRV) than non-users, "
            "controlling for other factors."
        ),
        "key_question": (
            "Does chronic low-intensity RF exposure near the vagus nerve "
            "produce the OPPOSITE effect of therapeutic VNS? I.e., does "
            "it impair vagal anti-inflammatory reflex?"
        ),
        "berm_pathways": ["VAGUS_ANTIINFLAMMATORY", "MICROBIOME_OT"],
        "status": "DIAGNOSTIC_ONLY",
    }


def hrv_prediction() -> dict:
    """Quantitative HRV prediction for earbud users."""
    return {
        "metric": "RMSSD (root mean square of successive RR differences)",
        "prediction": (
            "Heavy earbud users (>4h/day): RMSSD 10-20% lower "
            "than matched non-users"
        ),
        "data_source": (
            "Wearable device HRV data (Apple Watch, Oura Ring, Garmin) "
            "x earbud usage hours (Screen Time / device logs)"
        ),
        "controls": [
            "age",
            "BMI",
            "exercise frequency",
            "caffeine intake",
            "sleep duration",
            "stress (PSS score)",
            "smoking",
        ],
        "confounders": [
            "Earbud users may have higher screen time (RF exposure)",
            "Earbud users may be more sedentary",
            "Music/podcast content may independently affect HRV",
        ],
        "discriminative_test": (
            "Compare wired headphone users (same audio, no RF near vagus) "
            "with wireless earbud users. If both groups show equal HRV "
            "reduction -> audio content or sedentary behavior, not RF. "
            "If only wireless shows reduction -> RF-vagus mechanism."
        ),
    }
