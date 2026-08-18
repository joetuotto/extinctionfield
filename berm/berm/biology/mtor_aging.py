"""mTOR-ikääntymismalli: EMF × metformiini -vuorovaikutus.

Hypoteesi: metformiinin longevity-hyöty ∝ EMF-altistus.
Luonnollisessa ympäristössä (EMF ≈ 0) hyöty on minimaalinen.
Modernissa ympäristössä (EMF korkea) hyöty on merkittävä.

Lindgren: mTOR on metrisen tilan downstream-integraattori.
EMF muuttaa metriikkaa → Ca²⁺ muuttuu → mTOR muuttuu →
kasvu/ylläpito -tasapaino kallistuu → ikääntyminen kiihtyy.

Sempou-polku:
  EMF → VGIC → Ca²⁺↑ → mTOR↑ → autofagia↓, senessenss↑, inflamm.↑
  Metformiini → AMPK↑ → mTOR↓ → autofagia↑, senessenss↓, inflamm.↓
"""

from __future__ import annotations

import math

# mTOR-parametrit (Sempou-arviot)
MTOR_BASELINE = 1.0
EMF_MTOR_GAIN = 0.25
METFORMIN_MTOR_REDUCTION = 0.30
RAPAMYCIN_MTOR_REDUCTION = 0.85
CR_MTOR_REDUCTION = 0.20
IF_MTOR_REDUCTION = 0.10

# Ikääntymisparametrit
AGING_MTOR_EXPONENT = 0.7
SENESCENCE_THRESHOLD = 1.15
SENESCENCE_RATE = 0.01


def mtor_effective(emf_level: float, interventions: dict | None = None) -> float:
    """Efektiivinen mTOR-taso.

    Parameters
    ----------
    emf_level : float
        Normalisoitu EMF-altistus (0 = amish, 1 = moderni kaupunki).
    interventions : dict, optional
        {"metformin": True, "rapamycin": True, "CR": True,
         "IF": True, "shabbat": True}
    """
    mtor = MTOR_BASELINE + EMF_MTOR_GAIN * emf_level

    if interventions is None:
        interventions = {}

    if interventions.get("metformin"):
        mtor *= (1 - METFORMIN_MTOR_REDUCTION)
    if interventions.get("rapamycin"):
        mtor *= (1 - RAPAMYCIN_MTOR_REDUCTION)
    if interventions.get("CR"):
        mtor *= (1 - CR_MTOR_REDUCTION)
    if interventions.get("IF"):
        mtor *= (1 - IF_MTOR_REDUCTION)
    if interventions.get("shabbat"):
        # 25h/viikko EMF-vapaa = ~15% ajasta mTOR palautuu
        mtor *= (1 - 0.15 * EMF_MTOR_GAIN * emf_level / max(mtor, 0.1))

    return max(0.1, mtor)


def aging_rate_multiplier(mtor: float) -> float:
    """Ikääntymisnopeus mTOR:in funktiona.

    mTOR=1.0 → rate=1.0 (normaali)
    mTOR=1.25 → rate≈1.17 (kiihdytetty)
    mTOR=0.70 → rate≈0.79 (hidastettu)
    """
    return mtor ** AGING_MTOR_EXPONENT


def senescence_accumulation(mtor: float, years: float) -> float:
    """Senessenttien solujen kertymä.

    Kun mTOR > threshold, autofaginen siivous on riittämätöntä
    ja senessentit solut kertyvät.
    """
    if mtor <= SENESCENCE_THRESHOLD:
        return 0.0
    excess = mtor - SENESCENCE_THRESHOLD
    return excess * years * SENESCENCE_RATE


def metformin_longevity_benefit(
    emf_level: float, drug_duration_years: float
) -> dict:
    """Metformiinin longevity-hyöty EMF-kontekstissa.

    Returns
    -------
    dict with biological_age_reduction, natural_benefit,
    emf_specific_benefit, emf_fraction_of_benefit.
    """
    mtor_without = mtor_effective(emf_level)
    mtor_with = mtor_effective(emf_level, {"metformin": True})

    rate_without = aging_rate_multiplier(mtor_without)
    rate_with = aging_rate_multiplier(mtor_with)

    bio_age_diff = (rate_without - rate_with) * drug_duration_years

    mtor_natural = mtor_effective(0.0)
    mtor_natural_met = mtor_effective(0.0, {"metformin": True})
    natural_benefit = (
        aging_rate_multiplier(mtor_natural)
        - aging_rate_multiplier(mtor_natural_met)
    ) * drug_duration_years

    emf_specific_benefit = bio_age_diff - natural_benefit
    emf_fraction = emf_specific_benefit / max(bio_age_diff, 0.001)

    return {
        "emf_level": emf_level,
        "drug_duration_years": drug_duration_years,
        "mtor_without_drug": mtor_without,
        "mtor_with_drug": mtor_with,
        "aging_rate_without": rate_without,
        "aging_rate_with": rate_with,
        "biological_age_reduction": bio_age_diff,
        "natural_benefit": natural_benefit,
        "emf_specific_benefit": emf_specific_benefit,
        "emf_fraction_of_benefit": emf_fraction,
    }


def mtor_fertility_aging_interaction(cum_emf: float) -> dict:
    """mTOR yhdistää ikääntymisen ja hedelmällisyyden.

    Sama mTOR-hyperaktivaatio joka kiihdyttää ikääntymistä
    häiritsee myös spermatogeneesiä ja follikulogeneesiä.

    Parameters
    ----------
    cum_emf : float
        Kumulatiivinen EMF-altistus (v16_adjusted_cumulative_exposure).
    """
    emf_level = min(1.5, cum_emf / 50.0)
    mtor = mtor_effective(emf_level)

    aging_mult = aging_rate_multiplier(mtor)

    # mTOR↑ → spermatogonien differentiaatio↓
    sperm_differentiation = 1.0 / (1.0 + 0.5 * max(0.0, mtor - 1.0))
    # mTOR↑ → follikkelien liiallinen aktivaatio → AMH↓
    follicle_burnout = 1.0 + 0.3 * max(0.0, mtor - 1.15)

    senescence = senescence_accumulation(mtor, 1.0)

    return {
        "emf_level": emf_level,
        "mtor_level": mtor,
        "aging_rate_multiplier": aging_mult,
        "sperm_differentiation_efficiency": sperm_differentiation,
        "follicle_burnout_rate": follicle_burnout,
        "annual_senescence_accumulation": senescence,
    }


def intervention_comparison(emf_level: float, years: float) -> list[dict]:
    """Vertaa eri interventioiden vaikutusta samalla EMF-tasolla."""
    interventions = [
        ("ei interventioita", {}),
        ("metformiini", {"metformin": True}),
        ("rapamysiini", {"rapamycin": True}),
        ("kalorirestriktio", {"CR": True}),
        ("intermittent fasting", {"IF": True}),
        ("shabbat (25h/vko EMF-vapaa)", {"shabbat": True}),
        ("metformiini + CR", {"metformin": True, "CR": True}),
    ]

    results = []
    baseline_rate = aging_rate_multiplier(mtor_effective(emf_level))

    for label, intv in interventions:
        mtor = mtor_effective(emf_level, intv)
        rate = aging_rate_multiplier(mtor)
        bio_age_saved = (baseline_rate - rate) * years

        results.append({
            "intervention": label,
            "mtor_level": mtor,
            "aging_rate": rate,
            "biological_years_saved": bio_age_saved,
            "aging_reduction_pct": (1 - rate / baseline_rate) * 100
                if baseline_rate > 0 else 0.0,
        })

    return results
