"""
Melatoniini-hedelmällisyyssilta: cascade 1 → cascade 6.

Mallintaa EMF → pinealirauhasen häiriö → melatoniini ↓ →
HPG-akseli ↓ + follikkuli­nestesuoja ↓ → hedelmällisyys ↓.

Perustuu: Battelle 1980, Tong 2017, Tamura 2012,
IVF meta-analyysit (PMC12500685, PMC11265587).

DIAGNOSTIC_ONLY: ei vaikuta TFR-ennusteeseen.
Parametrit ovat estimaatteja — ÄLÄ käytä kliiniseen ennustamiseen.
"""

from dataclasses import dataclass
import math


@dataclass
class MelatoninFertilityResult:
    endogenous_melatonin: float
    total_melatonin: float
    emf_suppression_pct: float
    hpg_factor: float
    antioxidant_factor: float
    fertility_index: float
    supplement_benefit: float


def melatonin_fertility_model(
    emf_exposure: float,
    age: int,
    sex: str = "F",
    shift_work: bool = False,
    melatonin_supplement_mg: float = 0.0,
) -> MelatoninFertilityResult:
    """Estimate melatonin-mediated fertility impact.

    DIAGNOSTIC_ONLY. Not for clinical use.
    """
    emf_suppression = 0.5 * emf_exposure
    age_decline = max(0, 0.01 * (age - 30))
    shift_penalty = 0.3 if shift_work else 0.0

    endogenous_melatonin = max(
        0.1, 1.0 - emf_suppression - age_decline - shift_penalty
    )

    supplement_effect = min(0.5, melatonin_supplement_mg * 0.1)
    total_melatonin = min(1.2, endogenous_melatonin + supplement_effect)

    hpg_factor = 0.5 + 0.5 * total_melatonin
    antioxidant_factor = total_melatonin ** 0.7
    fertility_index = hpg_factor * 0.4 + antioxidant_factor * 0.6

    return MelatoninFertilityResult(
        endogenous_melatonin=round(endogenous_melatonin, 3),
        total_melatonin=round(total_melatonin, 3),
        emf_suppression_pct=round(emf_suppression * 100, 1),
        hpg_factor=round(hpg_factor, 3),
        antioxidant_factor=round(antioxidant_factor, 3),
        fertility_index=round(fertility_index, 3),
        supplement_benefit=round(supplement_effect, 3),
    )


def compare_scenarios() -> dict:
    """Compare melatonin-fertility across environments."""
    scenarios = {
        "low_emf_30F": (0.1, 30, "F", False, 0.0),
        "high_emf_30F": (0.8, 30, "F", False, 0.0),
        "high_emf_30F_supplement": (0.8, 30, "F", False, 3.0),
        "shift_work_30F": (0.3, 30, "F", True, 0.0),
        "low_emf_35M": (0.1, 35, "M", False, 0.0),
        "high_emf_35M": (0.8, 35, "M", False, 0.0),
    }
    results = {}
    for name, (emf, age, sex, shift, sup) in scenarios.items():
        r = melatonin_fertility_model(emf, age, sex, shift, sup)
        results[name] = {
            "melatonin": r.total_melatonin,
            "fertility": r.fertility_index,
            "suppression_pct": r.emf_suppression_pct,
        }
    return results


def melatonin_bridge_summary() -> dict:
    """Return mechanistic chain and predictions."""
    return {
        "chain": [
            "EMF → pineal gland senses field 'as light'",
            "NAT activity ↓ → serotonin → melatonin conversion slows",
            "Nocturnal melatonin peak: amplitude ↓, timing delayed",
            "Circulating melatonin ↓ → follicular fluid melatonin ↓",
            "HPG axis: GnRH ↓ → LH/FSH ↓ → sex hormones ↓",
            "Follicular fluid: antioxidant protection ↓ → oocyte quality ↓",
            "Testes: Leydig cell protection ↓ → testosterone ↓",
            "Combined effect: fertility ↓ across multiple pathways",
        ],
        "pathways": {
            "HPG": "Melatonin → hypothalamus → GnRH → LH/FSH → gonads",
            "antioxidant": "Melatonin in follicular fluid → ROS neutralization → oocyte protection",
            "anti_inflammatory": "Melatonin → NF-κB ↓ → chronic inflammation ↓",
            "mitochondrial": "Melatonin → AMPK/SIRT1 ↑ → reproductive cell energy ↑",
            "epigenetic": "Melatonin regulates Gdf9, Bmp15 in oocytes",
        },
        "predictions": {
            "P38": "IVF success rates lower in high-EMF environments",
            "P39": "Melatonin supplement benefit greater in high-EMF (larger deficit to correct)",
            "P40": "Shift workers: lower fertility AND greater melatonin supplement benefit",
        },
        "warnings": [
            "Melatonin HPG effect is NOT unidirectional — it can suppress GnRH in some contexts",
            "EMF → melatonin evidence is INCONSISTENT in humans (animal data stronger)",
            "Melatonin supplementation is NOT risk-free in reproductive age",
            "IVF meta-analyses have small N, blinding difficulties, possible publication bias",
            "Shift work fertility effects are MULTIFACTORIAL — melatonin is one factor",
            "Python model is CONCEPTUAL — not calibrated for prediction",
        ],
    }
