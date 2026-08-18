"""CatSper 6-stage fertilization cascade diagnostic.

DIAGNOSTIC_ONLY — does not affect TFR predictions.

Models the six sequential stages of sperm-oocyte interaction,
each gated by CatSper Ca2+ channel function. EMF disruption at
any stage reduces the overall fertilization probability:

  Stage 1: Capacitation (hyperactivation onset)
  Stage 2: Chemotaxis (progesterone gradient navigation)
  Stage 3: Acrosome reaction (enzyme release)
  Stage 4: Zona pellucida binding
  Stage 5: Membrane fusion (oolemma recognition)
  Stage 6: Pronucleus formation (Ca2+ oscillation trigger)

Each stage has an EMF sensitivity (gamma) and a minimum
floor below which function cannot drop. The cascade product
gives the overall per-cycle fertilization probability.

Sources:
  Lishko 2012 (CatSper gating), Strünker 2011 (chemotaxis),
  Sun 2017 (progesterone activation), Panagopoulos 2019 (EMF).
"""

import math
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


def stage_efficiency(emf_norm: float, stage: CascadeStage) -> float:
    """Efficiency of a single cascade stage given normalized EMF (0-1)."""
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
        "stages": stages_out,
        "cascade_product": round(product, 6),
        "baseline_fert_prob": BASELINE_FERT_PROB,
        "adjusted_fert_prob": round(BASELINE_FERT_PROB * product, 6),
        "emf_norm": round(emf_norm, 6),
    }


def cascade_country_diagnostic(emf_norm: float, cycles_per_year: float = 13.0) -> dict:
    """Per-year fertilization diagnostic.

    Estimates the annual probability of at least one successful
    fertilization given the cascade-adjusted per-cycle probability.
    """
    result = cascade_fertilization_prob(emf_norm)
    p_cycle = result["adjusted_fert_prob"]
    p_annual = 1.0 - (1.0 - p_cycle) ** cycles_per_year
    result["cycles_per_year"] = cycles_per_year
    result["annual_fert_prob"] = round(p_annual, 6)
    return result
