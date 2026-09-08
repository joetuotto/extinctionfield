"""Archived six-stage fertilization scenario diagnostic.

DIAGNOSTIC_ONLY — does not affect TFR predictions.

The locked coefficients illustrate sequential sperm-oocyte bottlenecks.
They are not measured EMF-to-CatSper effects, and CatSper has not been shown
to be the specific gate of every stage listed here:

  Stage 1: Capacitation (hyperactivation onset)
  Stage 2: Chemotaxis (progesterone gradient navigation)
  Stage 3: Acrosome reaction (enzyme release)
  Stage 4: Zona pellucida binding
  Stage 5: Membrane fusion (oolemma recognition)
  Stage 6: Pronucleus formation (Ca2+ oscillation trigger)

Each stage retains a legacy scenario sensitivity (gamma) and floor.
Their product produces a synthetic per-cycle probability under an explicit
independent-stage closure, not a fertility estimate from catsper_2021.

Sources:
  Lishko 2012 (CatSper gating), Strünker 2011 (chemotaxis),
  Sun 2017 (progesterone activation), Panagopoulos 2019 (EMF).
  These component sources do not establish the full six-stage EMF chain.
"""

from copy import deepcopy
from typing import NamedTuple


class CascadeStage(NamedTuple):
    name: str
    gamma: float
    floor: float


STAGES = [
    CascadeStage("capacitation", 0.020, 0.70),
    CascadeStage("chemotaxis", 0.015, 0.75),
    CascadeStage("acrosome_reaction", 0.025, 0.65),
    CascadeStage("zona_binding", 0.010, 0.80),
    CascadeStage("membrane_fusion", 0.018, 0.72),
    CascadeStage("pronucleus", 0.012, 0.78),
]

BASELINE_FERT_PROB = 0.25

# Corrected scope of the ESHRE abstract; not an effect-size calibration.
# DOI: https://doi.org/10.1093/humrep/deab130.035
CATSPER_2021_SCOPE = {
    "reference_id": "catsper_2021",
    "doi": "10.1093/humrep/deab130.035",
    "publication_type": "ESHRE_CONFERENCE_ABSTRACT",
    "species": "Wistar-Albino rat",
    "sex": "male",
    "animal_count": 50,
    "exposure_setting": "in vivo",
    "frequency_mhz": 2100,
    "hours_per_day": 1,
    "duration_days": 28,
    "intervention": "amlodipine",
    "intervention_mg_per_kg": 1,
    "catsper_specific_intervention": False,
    "significant_endpoints": {"sperm_motility": "p < 0.05", "sperm_calcium": "p < 0.05"},
    "non_significant_endpoints": {"mating": "p > 0.05", "live_birth": "p > 0.05"},
    "catsper_gene_analysis_status": "ONGOING_AT_ABSTRACT_PUBLICATION",
    "human_in_vitro_experiment": False,
    "supports_specific_emf_to_catsper_identification": False,
    "fertility_decrement_established": False,
}


def stage_efficiency(emf_norm: float, stage: CascadeStage) -> float:
    """Locked scenario efficiency given the legacy normalized proxy (0-1)."""
    raw = 1.0 - stage.gamma * emf_norm * 10.0
    return max(stage.floor, min(1.0, raw))


def cascade_fertilization_prob(emf_norm: float) -> dict:
    """Full 6-stage cascade diagnostic.

    Parameters
    ----------
    emf_norm : Normalized instantaneous EMF (0-1), same scale as
               used in v17_male_bio_cap (instant_emf / 8.0).

    Returns dict with per-stage efficiencies, cascade product,
    and adjusted fertilization probability.
    """
    stages_out = {}
    product = 1.0
    for s in STAGES:
        eff = stage_efficiency(emf_norm, s)
        stages_out[s.name] = round(eff, 6)
        product *= eff

    return {
        "model_role": "LEGACY_DIAGNOSTIC_SCENARIO",
        "calibration_status": "STRUCTURAL_ONLY",
        "l2_bridge_status": "OPEN",
        "evidence_scope": deepcopy(CATSPER_2021_SCOPE),
        "interpretation": (
            "Locked illustrative cascade coefficients; not calibrated by the 2021 rat abstract. "
            "Amlodipine is not a CatSper-specific intervention. Sperm motility/calcium "
            "findings do not establish a mating or live-birth decrement, a human in-vitro "
            "effect, or an EMF-to-CatSper mechanism."
        ),
        "stages": stages_out,
        "cascade_product": round(product, 6),
        "baseline_fert_prob": BASELINE_FERT_PROB,
        "adjusted_fert_prob": round(BASELINE_FERT_PROB * product, 6),
        "emf_norm": round(emf_norm, 6),
    }


def cascade_country_diagnostic(emf_norm: float, cycles_per_year: float = 13.0) -> dict:
    """Synthetic finite-cycle diagnostic retained under its historical name.

    Repeats the scenario's fixed per-cycle probability. This has no gestation,
    pregnancy loss or re-entry model and must not be read as observed births.
    """
    result = cascade_fertilization_prob(emf_norm)
    p_cycle = result["adjusted_fert_prob"]
    p_annual = 1.0 - (1.0 - p_cycle) ** cycles_per_year
    result["cycles_per_year"] = cycles_per_year
    result["annual_fert_prob"] = round(p_annual, 6)
    return result
