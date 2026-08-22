"""BBB permeability model with aging × EMF synergy.

Pathway F: EMF opens tight junctions via three independent mechanisms
(VGCC→Ca²⁺→eNOS→NO→TJ, p38MAPK→hsp27, miRNA). Aging degrades the
SAME tight junction proteins (occludin, claudin, ZO-1), removing
compensatory reserve. The combination is synergistic, not additive.

Evidence level: [M/C] — multiple independent labs support BBB opening
(Salford, Tang, Ulusoy, Gao) but others do not replicate (Finnie,
Franke, de Gannes). Gao 2024 explains discrepancy: conformational
change without expression change means western blot misses the effect.

Arendash paradox: BBB opening is bidirectional — beneficial (Aβ
clearance) in clean blood, harmful (neurotoxin entry) in contaminated
blood. Net effect depends on context, not mechanism existence.
"""

from __future__ import annotations

import math


def bbb_permeability_with_aging(
    emf_exposure: float,
    age_years: int,
    hospital: bool = False,
) -> dict:
    """Calculate BBB permeability considering aging and EMF synergy.

    Parameters
    ----------
    emf_exposure : float
        Normalized 0-1 (0 = no EMF, 1 = maximum measured environment).
    age_years : int
        Patient age in years.
    hospital : bool
        Whether patient is in a hospital environment (high multi-channel EMF).

    Returns
    -------
    dict with age_factor, emf_factor, synergy_multiplier,
    total_permeability, drug_brain_multiplier, risk_category.
    """
    # Aging BBB degradation (Immunity & Ageing 2015, PMC4362825)
    # Sigmoid: begins ~50y, significant ~70y
    age_factor = 0.02 + 0.35 / (1 + math.exp(-(age_years - 65) / 8))

    # EMF BBB effect (Salford 2003, Ulusoy 2025, Tang 2015)
    emf_factor = 0.02 + 0.45 / (1 + math.exp(-(emf_exposure - 0.3) / 0.1))

    # Hospital: high EMF across all channels simultaneously
    if hospital:
        emf_factor *= 1.8

    # Synergistic combination — same TJ proteins targeted by both
    synergy = 1.0 + 0.5 * age_factor * emf_factor
    total_permeability = min(0.95, (age_factor + emf_factor) * synergy)

    # Effective brain dose of circulating drugs
    drug_brain_multiplier = 1.0 + total_permeability * 3.0

    return {
        "age_factor": round(age_factor, 3),
        "emf_factor": round(emf_factor, 3),
        "synergy_multiplier": round(synergy, 3),
        "total_permeability": round(total_permeability, 3),
        "drug_brain_multiplier": round(drug_brain_multiplier, 2),
        "risk_category": (
            "LOW" if total_permeability < 0.2
            else "MODERATE" if total_permeability < 0.4
            else "HIGH" if total_permeability < 0.6
            else "CRITICAL"
        ),
    }


def arendash_context_model(
    bbb_open: float,
    blood_toxin_load: float,
    amyloid_beta_level: float,
) -> dict:
    """Model the Arendash paradox: BBB opening is bidirectional.

    Parameters
    ----------
    bbb_open : float
        Degree of BBB opening (0-1).
    blood_toxin_load : float
        Environmental toxin burden in blood (0-1).
    amyloid_beta_level : float
        Brain Aβ aggregate level (0-1).

    Returns
    -------
    dict with net_effect, toxin_entry, ab_clearance, interpretation.
    """
    toxin_entry = bbb_open * blood_toxin_load
    ab_clearance = bbb_open * amyloid_beta_level * 0.4
    net_effect = ab_clearance - toxin_entry

    if net_effect > 0.05:
        interpretation = "NET_BENEFICIAL"
    elif net_effect < -0.05:
        interpretation = "NET_HARMFUL"
    else:
        interpretation = "NEUTRAL"

    return {
        "bbb_open": round(bbb_open, 3),
        "toxin_entry": round(toxin_entry, 3),
        "ab_clearance": round(ab_clearance, 3),
        "net_effect": round(net_effect, 3),
        "interpretation": interpretation,
    }


BBB_MECHANISMS = {
    "vgcc_enos": {
        "pathway": "VGCC → Ca²⁺ → eNOS → NO → occludin/claudin ↓",
        "evidence": ["Ulusoy 2025", "Pall 2013"],
        "frequency": "27.12 MHz (demonstrated), RF general",
    },
    "p38mapk_hsp27": {
        "pathway": "p38MAPK → hsp27 → endothelial stress fibers → TJ disruption",
        "evidence": ["Leszczynski 2002"],
        "frequency": "900 MHz (GSM)",
    },
    "mirna": {
        "pathway": "miRNA expression change → long-term TJ protein dysregulation",
        "evidence": ["Dasdag 2015"],
        "frequency": "2.4 GHz (Wi-Fi)",
    },
    "conformational": {
        "pathway": "TJ protein conformational change (no expression change)",
        "evidence": ["Gao 2024"],
        "frequency": "EMP (pulsed)",
        "note": "Explains negative western blot studies",
    },
}
