"""FDA-validated therapeutic EMF devices and their non-thermal mechanisms.

The Therapeutic Device Paradox: FDA has approved 9+ medical devices whose
efficacy depends on non-thermal EMF biological effects across frequencies
from DC to 27 MHz. Each approval required clinical proof of biological
response. Simultaneously, EMF safety regulation (ICNIRP) does not
acknowledge non-thermal effects at any of these frequencies.

Status: STRUCTURAL_ONLY — constrains mechanism topology and regulatory
analysis. Does not create a numerical TFR coefficient by itself.
"""

from __future__ import annotations

from dataclasses import dataclass


@dataclass(frozen=True)
class TherapeuticEMFDevice:
    """One FDA-approved/cleared EMF therapeutic device."""

    key: str
    name: str
    fda_status: str
    frequency_hz: float | tuple[float, float]
    intensity: str
    mechanism: str
    non_thermal: bool
    biological_target: str
    berm_pathway: str
    evidence_level: str
    critical_note: str = ""


THERAPEUTIC_EMF_DEVICES: dict[str, TherapeuticEMFDevice] = {

    "bone_growth_DC": TherapeuticEMFDevice(
        key="bone_growth_DC",
        name="Implantable DC bone growth stimulator",
        fda_status="PMA 1986 (OsteoStim, Electro-Biology/Zimmer Biomet)",
        frequency_hz=0.0,
        intensity="20-100 uA",
        mechanism="DC current directs osteoblast migration and proliferation",
        non_thermal=True,
        biological_target="osteoblasts, bone tissue",
        berm_pathway="VMEM_MTOR",
        evidence_level="FDA PMA (phase III equivalent)",
    ),

    "tDCS_depression": TherapeuticEMFDevice(
        key="tDCS_depression",
        name="Transcranial direct current stimulation (tDCS)",
        fda_status="PMA December 2025 (Flow Neuroscience) — home use",
        frequency_hz=0.0,
        intensity="1-2 mA -> 0.3-1.0 V/m in cortex",
        mechanism=(
            "Modulates cortical excitability, long-lasting neuroplastic "
            "changes. Non-thermal."
        ),
        non_thermal=True,
        biological_target="cortical neurons",
        berm_pathway="HPA_HPG",
        evidence_level="FDA PMA (RCT data)",
        critical_note=(
            "Therapeutic field strength (0.3-1.0 V/m) is the SAME order of "
            "magnitude as measured urban ambient RF field (0.67-1.51 V/m). "
            "If 0.3 V/m DC changes brain function sufficiently for FDA "
            "approval, 0.67 V/m RF cannot be biologically irrelevant."
        ),
    ),

    "CES_anxiety_insomnia": TherapeuticEMFDevice(
        key="CES_anxiety_insomnia",
        name="Cranial electrostimulation (CES)",
        fda_status="510(k) cleared (Alpha-Stim) — insomnia, depression, anxiety",
        frequency_hz=0.5,
        intensity="10-600 uA",
        mechanism=(
            "Microcurrent pulses through earlobes modulate brainstem "
            "neurotransmitter balance"
        ),
        non_thermal=True,
        biological_target="brainstem, limbic system",
        berm_pathway="HPA_HPG",
        evidence_level="FDA 510(k)",
    ),

    "PEMF_bone_healing": TherapeuticEMFDevice(
        key="PEMF_bone_healing",
        name="PEMF non-invasive bone growth stimulator",
        fda_status=(
            "PMA 1979 (EBI Bone Healing System, Electro-Biology); "
            "PMA 1986 (Physio-Stim, Orthofix); PMA 1997 (OrthoLogic 1000)"
        ),
        frequency_hz=(1.0, 100.0),
        intensity="1-5 mT pulsed magnetic field",
        mechanism=(
            "Activates cell membrane adenosine A2A/A3 receptors (GPCR). "
            "Stimulates osteoblast ECM synthesis. "
            "Anti-inflammatory effect via cytokines."
        ),
        non_thermal=True,
        biological_target="osteoblasts, chondrocytes, membrane adenosine receptors",
        berm_pathway="GPCR_ADENOSINE",
        evidence_level="FDA PMA x3 (decades of clinical use, 72% of hospitals)",
        critical_note=(
            "Mechanism is via adenosine receptors, NOT VGCC. "
            "This expands BERM mechanism beyond VGCC: "
            "EMF affects MULTIPLE membrane proteins."
        ),
    ),

    "rTMS_depression": TherapeuticEMFDevice(
        key="rTMS_depression",
        name="Repetitive transcranial magnetic stimulation (rTMS)",
        fda_status=(
            "510(k) 2008 depression (NeuroStar); 2013 OCD (BrainsWay deep TMS); "
            "2018 smoking cessation; 2024-2025 adolescents (15-21y)"
        ),
        frequency_hz=(1.0, 50.0),
        intensity="1-2 T pulsed magnetic field -> ~100 V/m in cortex",
        mechanism=(
            "Magnetic pulse induces electric field in cortex (Faraday's law). "
            "Depolarizes neurons -> long-lasting neuroplastic changes. "
            "rTMS changes brain function for WEEKS after treatment course."
        ),
        non_thermal=True,
        biological_target="dorsolateral prefrontal cortex (DLPFC)",
        berm_pathway="HPA_HPG",
        evidence_level="FDA 510(k) x multiple; NCCN guideline",
        critical_note=(
            "LONG-LASTING NEUROPLASTIC CHANGES from short exposure validate "
            "BERM alpha parameter: part of EMF effect is irreversible."
        ),
    ),

    "VNS_migraine": TherapeuticEMFDevice(
        key="VNS_migraine",
        name="Vagus nerve stimulation (VNS)",
        fda_status=(
            "510(k) (GammaCore, electroCore) — migraine, cluster headache; "
            "14 FDA-cleared auricular VNS devices"
        ),
        frequency_hz=(1.0, 30.0),
        intensity="1-24 mA transcutaneous",
        mechanism=(
            "Electrical stimulation via vagus nerve produces systemic "
            "anti-inflammatory effects (cholinergic anti-inflammatory "
            "pathway). Modulates CNS function."
        ),
        non_thermal=True,
        biological_target="vagus nerve -> brainstem -> systemic",
        berm_pathway="MICROBIOME_OT",
        evidence_level="FDA 510(k) x14+",
        critical_note=(
            "Vagus nerve runs in immediate proximity to earbud Bluetooth "
            "transmitters in the neck/ear area. If intentional electrical "
            "stimulation produces systemic effects, unintentional RF "
            "exposure in the same tissue may produce interference."
        ),
    ),

    "TTFields_GBM": TherapeuticEMFDevice(
        key="TTFields_GBM",
        name="Tumor Treating Fields (TTFields / Optune)",
        fda_status=(
            "PMA 2011 recurrent GBM; PMA 2015 newly diagnosed GBM; "
            "PMA 2026 pancreatic cancer (Optune Pax/PANOVA-3)"
        ),
        frequency_hz=(100_000.0, 500_000.0),
        intensity="1-3 V/cm (100-300 V/m in tissue)",
        mechanism=(
            "Disrupts mitotic spindle formation (tubulin polymerization). "
            "Dielectrophoretic forces at dividing cell cleavage furrow. "
            "Non-thermal: frequency below 1000 kHz threshold."
        ),
        non_thermal=True,
        biological_target="dividing cells — cancer cells AND normal dividing cells",
        berm_pathway="IF_MITOTIC_DISRUPTION",
        evidence_level=(
            "FDA PMA x3 (phase III RCT: EF-11, EF-14, PANOVA-3). "
            "JAMA publication. Over 18,000 patients treated."
        ),
        critical_note=(
            "Novocure patent US 7,016,725 explicitly identifies: "
            "'cells in the ovaries or testicles may be sensitive to the "
            "electric fields'. No TTFields study has included "
            "spermatogenesis or fertility assessment."
        ),
    ),

    "PRF_inflammation": TherapeuticEMFDevice(
        key="PRF_inflammation",
        name="Pulsed Radio Frequency (PRF) inflammation therapy",
        fda_status="510(k) cleared multiple devices (27.12 MHz)",
        frequency_hz=27_120_000.0,
        intensity="Pulsed, non-thermal power level",
        mechanism=(
            "Pulsed 27.12 MHz sine wave produces non-thermal biological "
            "response: edema reduction, wound healing acceleration, "
            "nerve regeneration."
        ),
        non_thermal=True,
        biological_target="soft tissue, wounds, nerves",
        berm_pathway="A_VGCC_ROS",
        evidence_level="FDA 510(k), clinical use since 1960s",
        critical_note=(
            "Patent documentation explicitly states: 'electromagnetic "
            "field capable of eliciting a non-thermal biological effect.'"
        ),
    ),

    "RF_ablation_modulated": TherapeuticEMFDevice(
        key="RF_ablation_modulated",
        name="Amplitude-modulated RF (non-thermal anti-cancer)",
        fda_status="Widely approved as surgical tool",
        frequency_hz=(300_000.0, 5_000_000.0),
        intensity="High (surgical)",
        mechanism=(
            "Primary mechanism thermal (tissue heating). "
            "BUT: PMC9655505 (2022) showed amplitude-modulated RF "
            "produces non-thermal anti-cancer effects in colorectal cancer."
        ),
        non_thermal=False,
        biological_target="tumors",
        berm_pathway="A_VGCC_ROS",
        evidence_level="FDA approved (thermal); non-thermal component under study",
    ),
}


TTFIELDS_FREQUENCY_CELL_SIZE = {
    "GBM": {"freq_kHz": 200, "cell_diameter_um": 20},
    "pancreatic": {"freq_kHz": 150, "cell_diameter_um": 25},
    "breast": {"freq_kHz": 120, "cell_diameter_um": 30},
    "melanoma": {"freq_kHz": 100, "cell_diameter_um": 35},
    "normal_cells": {"freq_kHz": 50, "note": "TTFields safety literature"},
}


def fda_frequency_map() -> list[dict]:
    """Return sorted list of FDA-approved EMF devices by frequency."""
    result = []
    for device in THERAPEUTIC_EMF_DEVICES.values():
        freq = device.frequency_hz
        if isinstance(freq, tuple):
            freq_low, freq_high = freq
        else:
            freq_low = freq_high = freq
        result.append({
            "key": device.key,
            "name": device.name,
            "freq_low_hz": freq_low,
            "freq_high_hz": freq_high,
            "non_thermal": device.non_thermal,
            "fda_status": device.fda_status,
            "mechanism": device.mechanism,
            "berm_pathway": device.berm_pathway,
        })
    return sorted(result, key=lambda d: d["freq_low_hz"])


def icnirp_vs_fda_contradiction() -> dict:
    """Document the logical contradiction between ICNIRP and FDA positions.

    FDA requires proof of biological effect for device approval.
    ICNIRP assumes absence of biological effect for exposure limits.
    These two positions are logically incompatible.
    """
    non_thermal_devices = [
        d for d in THERAPEUTIC_EMF_DEVICES.values() if d.non_thermal
    ]
    return {
        "fda_position": (
            "Biological effect must be demonstrated for device approval. "
            f"{len(non_thermal_devices)} devices approved based on "
            "non-thermal EMF biological effects."
        ),
        "icnirp_position": (
            "Only thermal effects are recognized for exposure limit setting. "
            "Non-thermal effects are not acknowledged at any frequency."
        ),
        "logical_contradiction": (
            "If non-thermal biological effects exist at multiple frequencies "
            "(as FDA approvals demonstrate), then exposure limits based "
            "solely on thermal effects are necessarily incomplete."
        ),
        "frequency_coverage": {
            "dc_to_elf": "0-100 Hz (bone stimulators, PEMF, rTMS, VNS)",
            "intermediate": "100 kHz-500 kHz (TTFields)",
            "radiofrequency": "27.12 MHz (PRF)",
        },
        "tdcs_vs_ambient": {
            "therapeutic_field_Vm": "0.3-1.0",
            "urban_ambient_field_Vm": "0.67-1.51",
            "ratio": "Same order of magnitude",
            "implication": (
                "If 0.3 V/m DC is biologically active enough for FDA "
                "approval, urban ambient RF at 0.67-1.51 V/m cannot be "
                "assumed biologically inert."
            ),
        },
        "device_count": len(non_thermal_devices),
        "frequency_bands_covered": 9,
    }
