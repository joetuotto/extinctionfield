"""
Ioninen hoitohierarkia — BERM v19.1 diagnostiikkamoduuli.

Mallintaa mielialahäiriöiden hoitojen tehokkuuden
ionisen kohdistuksen asteen funktiona.

DIAGNOSTIC_ONLY: ei vaikuta TFR-ennusteeseen.
"""

from dataclasses import dataclass
from enum import IntEnum
from typing import Optional


class IonicDirectness(IntEnum):
    CHEMICAL = 1
    ELECTROMAGNETIC = 2
    IONIC_CHRONIC = 3
    IONIC_RESET = 4
    IONIC_TOTAL = 5


@dataclass
class TreatmentProfile:
    name: str
    mechanism: str
    ionic_directness: IonicDirectness
    primary_ion_target: str
    channel_target: str
    onset_hours: float
    duration_weeks: float
    nnt_depression: Optional[float]
    key_evidence: str

    @property
    def ionic_efficiency_score(self) -> float:
        speed_factor = 1.0 / max(self.onset_hours, 1.0)
        duration_factor = self.duration_weeks
        directness_weight = float(self.ionic_directness)
        return directness_weight * speed_factor * duration_factor


TREATMENT_PROFILES = {
    "ssri": TreatmentProfile(
        name="SSRI (e.g. escitalopram)",
        mechanism="5-HT reuptake inhibition → serotonin increase "
                  "→ indirect ion channel modulation",
        ionic_directness=IonicDirectness.CHEMICAL,
        primary_ion_target="Na⁺/Ca²⁺ (indirect)",
        channel_target="5-HTT → indirect VGCC modulation",
        onset_hours=336,
        duration_weeks=0,
        nnt_depression=7.0,
        key_evidence="Cipriani 2018 Lancet, 21 ADs, 116,477 patients",
    ),
    "tms": TreatmentProfile(
        name="TMS (transcranial magnetic stimulation)",
        mechanism="Pulsed magnetic field → induced electric current "
                  "→ ion channel current modulation in cortex",
        ionic_directness=IonicDirectness.ELECTROMAGNETIC,
        primary_ion_target="Na⁺/Ca²⁺ (direct)",
        channel_target="VGSC + VGCC (induced field)",
        onset_hours=336,
        duration_weeks=8,
        nnt_depression=5.0,
        key_evidence="FDA 510(k) 2008, Neuronetics. Remission 30-35%.",
    ),
    "tdcs": TreatmentProfile(
        name="tDCS (transcranial direct current stimulation)",
        mechanism="0.3-1.0 V/m → direct membrane potential modulation "
                  "→ Na⁺/K⁺/Ca²⁺ current changes",
        ionic_directness=IonicDirectness.ELECTROMAGNETIC,
        primary_ion_target="Na⁺/K⁺ (direct, weak)",
        channel_target="VGSC + K_leak (DC depolarization)",
        onset_hours=336,
        duration_weeks=4,
        nnt_depression=6.0,
        key_evidence="FDA De Novo 2025 (Flow). Urban ambient 0.67-1.51 V/m.",
    ),
    "lithium": TreatmentProfile(
        name="Lithium (Li⁺)",
        mechanism="Li⁺ traverses VGSC → replaces Na⁺ 1:1 → "
                  "reduces intracellular Na⁺ and Ca²⁺ → "
                  "normalizes neuronal excitability",
        ionic_directness=IonicDirectness.IONIC_CHRONIC,
        primary_ion_target="Na⁺ (direct replacement), Ca²⁺ (indirect reduction)",
        channel_target="VGSC (Li⁺ permeates Na⁺ channel) + K⁺ channels",
        onset_hours=168,
        duration_weeks=0,
        nnt_depression=None,
        key_evidence="Meta-analysis >14,000 patients: superior. "
                     "El-Mallakh 2004, Bhansali 2010. GWAS: ion channel genes.",
    ),
    "psilocybin": TreatmentProfile(
        name="Psilocybin",
        mechanism="5-HT2A → Gq → PLC → IP3 → Ca²⁺ ER release → "
                  "CIF → Cav1.2 (CACNA1C) activation → "
                  "massive Ca²⁺ surge → neuronal reorganization",
        ionic_directness=IonicDirectness.IONIC_RESET,
        primary_ion_target="Ca²⁺ (massive, acute)",
        channel_target="5-HT2A → Gq → IP3R → Cav1.2 (CACNA1C)",
        onset_hours=4,
        duration_weeks=12,
        nnt_depression=3.0,
        key_evidence="Goodwin 2022 NEJM, Davis 2021 JAMA Psychiatry. "
                     "Cav1.2 link: PMC12491688.",
    ),
    "ketamine": TreatmentProfile(
        name="Ketamine",
        mechanism="NMDA receptor blockade → glutamate surge → "
                  "AMPA → Ca²⁺ influx → BDNF → TrkB → synaptogenesis",
        ionic_directness=IonicDirectness.IONIC_RESET,
        primary_ion_target="Ca²⁺ (NMDA channel blockade → rebound)",
        channel_target="NMDA (Ca²⁺/Na⁺-permeable ion channel)",
        onset_hours=2,
        duration_weeks=2,
        nnt_depression=3.5,
        key_evidence="Zarate 2006 Arch Gen Psychiatry (first RCT). "
                     "NMDA is an ion channel, not a neurotransmitter receptor.",
    ),
    "ect": TreatmentProfile(
        name="ECT (electroconvulsive therapy)",
        mechanism="Electrical pulse → forced seizure → cortical spreading "
                  "depolarization (CSD) → near-complete ionic reset across "
                  "entire cortex → Ca²⁺ wave → prolonged electrical "
                  "activity suppression → full ionic landscape reorganization",
        ionic_directness=IonicDirectness.IONIC_TOTAL,
        primary_ion_target="ALL (Na⁺, K⁺, Ca²⁺, Cl⁻ — total gradient "
                           "reset during CSD wave)",
        channel_target="ALL voltage-gated channels simultaneously (forced "
                       "seizure opens all VGCs → CSD)",
        onset_hours=1,
        duration_weeks=4,
        nnt_depression=2.0,
        key_evidence="Rosenthal et al. 2025 Nature Communications: ECT "
                     "triggers CSD wave. 70-80% response in treatment-"
                     "resistant depression. Meta-analyses confirm ECT "
                     "superiority over all other depression treatments.",
    ),
}


def treatment_hierarchy_diagnostic() -> list:
    profiles = list(TREATMENT_PROFILES.values())
    return sorted(profiles,
                  key=lambda p: p.ionic_directness,
                  reverse=True)


def calcium_convergence_paths() -> dict:
    return {
        "SSRI":        "5-HT ↑ → 5-HT2A → Gq → IP3 → Ca²⁺ (INDIRECT)",
        "TMS":         "EM field → induced E → VGCC → Ca²⁺ (DIRECT)",
        "tDCS":        "DC field → Vm shift → VGCC → Ca²⁺ (DIRECT, weak)",
        "Lithium":     "Li⁺ → VGSC → Na⁺ replacement → Na/Ca exchanger → Ca²⁺ ↓ (DIRECT)",
        "Psilocybin":  "5-HT2A → Gq → IP3 → Ca²⁺ + CIF → Cav1.2 → Ca²⁺ (MASSIVE)",
        "Ketamine":    "NMDA blockade → Glu surge → AMPA → Ca²⁺ (REBOUND)",
        "ECT":         "Electrical pulse → seizure → CSD wave → ALL VGCs "
                       "→ Na⁺/K⁺/Ca²⁺/Cl⁻ total reset (COMPLETE)",
    }
