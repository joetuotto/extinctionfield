"""BERM v17 biological pathways A-F.

Pathway decomposition for attribution analysis. The community sigmoid
provides the TFR prediction; pathways provide mechanistic explanation.

Pathway weights: A=45%, B=25%, C=15%, D=15% (calibrated from biomarkers).
Total community gradient: 5.776 TFR points (Amish 6.5 - Korea 0.72).
"""

from __future__ import annotations

import math

PATHWAY_WEIGHTS = {"A": 0.45, "B": 0.25, "C": 0.15, "D": 0.15}
TOTAL_COMMUNITY_GRADIENT = 5.776


def biological_sigmoid(eac: float) -> float:
    """Biological sigmoid: fraction of maximum EMF effect realized.

    Logistic function calibrated to community data.
    """
    log_eac = math.log(max(eac, 1e-20))
    return 1 / (1 + math.exp(-(log_eac - (-1.361)) / 0.509))


def pathway_a(eac: float) -> float:
    """VGIC -> Ca2+ -> ROS -> Sperm damage. Weight 45%."""
    return -PATHWAY_WEIGHTS["A"] * TOTAL_COMMUNITY_GRADIENT * biological_sigmoid(eac)


def pathway_b(eac: float) -> float:
    """RPM -> CRY -> Circadian disruption. Weight 25%."""
    return -PATHWAY_WEIGHTS["B"] * TOTAL_COMMUNITY_GRADIENT * biological_sigmoid(eac)


def pathway_c(eac: float) -> float:
    """BBB disruption (via HPA). Weight 15%."""
    return -PATHWAY_WEIGHTS["C"] * TOTAL_COMMUNITY_GRADIENT * biological_sigmoid(eac)


def pathway_d(eac: float) -> float:
    """HPA -> HPG cross-inhibition. Weight 15%."""
    return -PATHWAY_WEIGHTS["D"] * TOTAL_COMMUNITY_GRADIENT * biological_sigmoid(eac)


def direct_effect_ad(eac: float) -> float:
    """Combined effect of pathways A through D."""
    return pathway_a(eac) + pathway_b(eac) + pathway_c(eac) + pathway_d(eac)


# Pathway E: Dysbiosis

def lactobacillus_response(emf_norm: float) -> float:
    """Lactobacillus decline under EMF. Exp[-0.35 * emfNorm]."""
    return math.exp(-0.35 * emf_norm)


def ecoli_response(emf_norm: float) -> float:
    """E. coli proliferation under EMF. Exp[0.20 * emfNorm]."""
    return math.exp(0.20 * emf_norm)


def dysbiosis_index(emf_norm: float) -> float:
    """Dysbiosis index: E.coli / Lactobacillus ratio."""
    return ecoli_response(emf_norm) / lactobacillus_response(emf_norm)


def l_reuteri_oxytocin_pathway(emf_norm: float) -> dict:
    """L. reuteri -> oxytocin -> reproductive health (DIAGNOSTIC_ONLY).

    Poutahidis 2014 (MIT): L. reuteri raises T, enlarges testes,
    increases spermatogenesis via IL-17 suppression.
    Erdman & Poutahidis 2016: L. reuteri upregulates OT via vagus.
    """
    l_reuteri = lactobacillus_response(emf_norm)
    ot_from_microbiome = 0.3 + 0.7 * l_reuteri
    t_from_microbiome = 0.5 + 0.5 * l_reuteri
    sperm_from_microbiome = 0.4 + 0.6 * l_reuteri

    return {
        "l_reuteri_level": round(l_reuteri, 4),
        "ot_microbiome_fraction": round(ot_from_microbiome, 4),
        "t_microbiome_fraction": round(t_from_microbiome, 4),
        "sperm_microbiome_fraction": round(sperm_from_microbiome, 4),
        "mechanism": "L. reuteri → vagus → OT↑ + IL-17↓ → T↑ + spermatogenesis↑",
    }


def pathway_e(emf_norm: float, human_transfer: float = 0.5) -> float:
    """Microbiome pathway: dysbiosis -> SCFA loss + inflammation.

    emf_norm: combined EMF normalized to 0-1 (combined / 0.8).
    """
    scfa = 1 - lactobacillus_response(emf_norm)
    infl = ecoli_response(emf_norm) - 1
    return -(0.4 * scfa + 0.6 * infl) * human_transfer * 2.0


# Pathway F: BBB multiplier

BBB_CHEMICALS = [
    {"name": "EndocrineDisruptors", "blood": 1.0, "potency": 0.6, "normal_bbb": 0.05},
    {"name": "HeavyMetals", "blood": 0.3, "potency": 0.8, "normal_bbb": 0.02},
    {"name": "Microplastics", "blood": 0.5, "potency": 0.3, "normal_bbb": 0.01},
]

SCHUMANN_EAC = 1e-6


def bbb_permeability(eac: float, threshold: float = 0.15, steepness: float = 0.08) -> float:
    """Blood-brain barrier permeability as function of EMF."""
    return 0.02 + 0.83 / (1 + math.exp(-(eac - threshold) / steepness))


def chemical_brain_dose(chemical: dict, bbb: float) -> float:
    return chemical["blood"] * chemical["potency"] * (
        chemical["normal_bbb"] + (1 - chemical["normal_bbb"]) * bbb
    )


def pathway_f(eac: float) -> dict[str, float]:
    """BBB pathway: EMF increases BBB permeability -> neurotoxin entry."""
    bbb = bbb_permeability(eac)
    bbb_baseline = bbb_permeability(SCHUMANN_EAC)

    with_emf = sum(chemical_brain_dose(c, bbb) for c in BBB_CHEMICALS)
    without_emf = sum(chemical_brain_dose(c, bbb_baseline) for c in BBB_CHEMICALS)

    return {
        "bbb_permeability": bbb,
        "brain_tox_with_emf": with_emf,
        "brain_tox_without_emf": without_emf,
        "emf_attributable": with_emf - without_emf,
        "multiplier": with_emf / without_emf if without_emf > 0 else 1.0,
    }


def total_effect(eac: float) -> dict[str, float]:
    """Combined effect of all pathways A-F.

    Returns decomposition with BERM share of total TFR decline.
    """
    ad = direct_effect_ad(eac)
    emf_norm = min(eac / 0.8, 1.0)
    e = pathway_e(emf_norm)
    f_result = pathway_f(eac)
    f_attr = f_result["emf_attributable"]
    total = ad + e + f_attr
    d_idx = dysbiosis_index(emf_norm)
    decline = 2.51

    return {
        "eac": eac,
        "pathway_ad": ad,
        "pathway_a": pathway_a(eac),
        "pathway_b": pathway_b(eac),
        "pathway_c": pathway_c(eac),
        "pathway_d": pathway_d(eac),
        "pathway_e": e,
        "pathway_f_multiplier": f_result["multiplier"],
        "pathway_f_emf_attributable": f_attr,
        "total": total,
        "dysbiosis_index": d_idx,
        "berm_share": min(abs(total) / decline, 1.0),
    }
