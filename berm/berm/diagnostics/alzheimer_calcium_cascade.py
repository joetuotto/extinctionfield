"""
Alzheimer-amyloidi-kalsium-EMF kaskadin diagnostiikka.

Mallintaa EMF → VGCC → Ca²⁺ → BACE1 → Aβ-oligomeerit →
positiivinen palautesilmukka → neurodegeneraatio -ketjun.

DIAGNOSTIC_ONLY: ei vaikuta TFR-ennusteeseen.
Parametrit ovat estimaatteja — ÄLÄ käytä kliiniseen ennustamiseen.
"""

from dataclasses import dataclass
import math


@dataclass
class AlzheimerCascadeState:
    year: int
    age: int
    cumulative_emf: float
    intracellular_ca: float
    bace1_activity: float
    abeta_production: float
    abeta_oligomers: float
    abeta_pore_ca_influx: float
    plaque_burden: float
    cognitive_score: float
    feedback_loop_active: bool


EMF_GROWTH = {
    "rural": 0.01,
    "suburban": 0.02,
    "urban": 0.035,
    "high_tech": 0.05,
}

GENOTYPE_FACTOR = {
    "T/T": 1.0,
    "T/C": 1.35,
    "C/C": 1.7,
}


def alzheimer_cascade_model(
    birth_year: int,
    cacna1c_genotype: str = "T/T",
    emf_profile: str = "urban",
    years_to_simulate: int = 85,
) -> list[AlzheimerCascadeState]:
    """Simulate Alzheimer cascade progression for an individual."""
    genotype_factor = GENOTYPE_FACTOR.get(cacna1c_genotype, 1.0)
    emf_growth = EMF_GROWTH.get(emf_profile, 0.03)

    states: list[AlzheimerCascadeState] = []
    cumulative_emf = 0.0
    abeta_oligomers = 0.0
    plaque_burden = 0.0
    pore_influx = 0.0

    for year_offset in range(years_to_simulate):
        year = birth_year + year_offset
        age = year_offset

        if year < 1990:
            yearly_emf = 0.005
        elif year < 2000:
            yearly_emf = 0.01 + emf_growth * (year - 1990) / 10
        else:
            yearly_emf = emf_growth * 1.5

        cumulative_emf += yearly_emf

        emf_ca = cumulative_emf * genotype_factor * 0.1
        total_ca = emf_ca + pore_influx

        age_compensation = max(0.3, 1.0 - age / 120)
        effective_ca = total_ca / age_compensation

        bace1 = 1.0 + 0.5 * math.tanh(effective_ca - 0.5)
        abeta_rate = bace1 * 0.01

        oligomer_fraction = min(0.9, 0.3 + 0.4 * effective_ca)
        new_oligomers = abeta_rate * oligomer_fraction
        abeta_oligomers += new_oligomers

        clearance = abeta_oligomers * 0.05 * age_compensation
        abeta_oligomers = max(0, abeta_oligomers - clearance)

        plaque_burden += abeta_oligomers * 0.001

        pore_threshold = 0.1
        if abeta_oligomers > pore_threshold:
            pore_influx = (abeta_oligomers - pore_threshold) * 0.08
        else:
            pore_influx = 0.0

        feedback_active = pore_influx > 0.001

        cognitive = max(0, 1.0 - plaque_burden * 0.5 - abeta_oligomers * 0.3)

        states.append(AlzheimerCascadeState(
            year=year,
            age=age,
            cumulative_emf=round(cumulative_emf, 4),
            intracellular_ca=round(effective_ca, 4),
            bace1_activity=round(bace1, 4),
            abeta_production=round(abeta_rate, 5),
            abeta_oligomers=round(abeta_oligomers, 4),
            abeta_pore_ca_influx=round(pore_influx, 5),
            plaque_burden=round(plaque_burden, 5),
            cognitive_score=round(cognitive, 3),
            feedback_loop_active=feedback_active,
        ))

    return states


def compare_genotypes_and_environments() -> dict:
    """Compare AD cascade across genotypes and EMF environments."""
    scenarios = {
        "T/T rural": ("T/T", "rural"),
        "T/T urban": ("T/T", "urban"),
        "T/C rural": ("T/C", "rural"),
        "T/C urban": ("T/C", "urban"),
    }

    results = {}
    for name, (genotype, env) in scenarios.items():
        states = alzheimer_cascade_model(
            birth_year=1950,
            cacna1c_genotype=genotype,
            emf_profile=env,
        )
        age_70 = next(s for s in states if s.age == 70)
        age_80 = next(s for s in states if s.age == 80)
        results[name] = {
            "cognitive_70": age_70.cognitive_score,
            "cognitive_80": age_80.cognitive_score,
            "plaque_70": age_70.plaque_burden,
            "plaque_80": age_80.plaque_burden,
            "feedback_onset_age": next(
                (s.age for s in states if s.feedback_loop_active), None
            ),
        }

    return results


def alzheimer_cascade_summary() -> dict:
    """Return the mechanistic chain and predictions."""
    return {
        "chain": [
            "EMF → VGCC (L-type Ca²⁺ channels in neurons)",
            "Ca²⁺ influx → calmodulin (CaM) activation",
            "Ca²⁺/CaM → BACE1 (β-secretase) activity ↑",
            "BACE1 → amyloidogenic APP processing → Aβ ↑",
            "Ca²⁺ directs Aβ(1-40) → toxic oligomers (not fibrils)",
            "Aβ oligomers → form Ca²⁺ pores in membrane",
            "Pore Ca²⁺ influx → POSITIVE FEEDBACK LOOP",
            "Accelerating Ca²⁺/Aβ cycle → neurodegeneration",
        ],
        "predictions": {
            "P29": "AD incidence correlates with cumulative lifetime EMF",
            "P30": "CACNA1C rs7304986 T/C carriers have higher AD risk",
            "P31": "AD incidence accelerates 2025-2035 (30y lag from 2G/Wi-Fi)",
            "P32": "Low-EMF care homes slow AD progression",
        },
        "key_refs": [
            "pmc4909906_calcium_ad",
            "pmc3065491_bhatt_ca_oligomers",
            "pmc7179355_oday_calcium",
            "pmc8125740_calcium_abeta",
        ],
        "warnings": [
            "Calcium hypothesis is ONE of several competing AD hypotheses",
            "EMF is NOT the sole cause of AD",
            "Controlled EMF (Arendash) PROTECTS — dose/frequency/context matter",
            "This model is CONCEPTUAL, not calibrated for clinical use",
        ],
    }
