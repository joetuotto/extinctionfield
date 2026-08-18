"""Individual susceptibility modifiers for EMF response.

DIAGNOSTIC_ONLY — these functions model inter-individual variation
in EMF sensitivity. They are NOT part of the population-level TFR
prediction pipeline. They exist for research diagnostics and to
generate the individual susceptibility distribution shown on the
website.

Three factors:
  1. Genetic: CACNA1C rs1006737 VGCC polymorphism + GSTM1/GSTT1
  2. Anatomical: skull thickness, fat layer, tissue water content
  3. Cumulative: allostatic load → Selye phase transition
"""

# CACNA1C rs1006737 risk allele frequency by population
# Source: GWAS Catalog, MIT DSpace CACNA1C review
CACNA1C_RISK_FREQUENCY = {
    "European": 0.33,
    "East_Asian": 0.10,
    "African": 0.15,
    "South_Asian": 0.25,
}


def vgcc_susceptibility_modifier(genotype: str) -> float:
    """VGCC sensitivity modifier as function of CACNA1C rs1006737 genotype.

    Source: medrxiv 2024 (5G sleep EEG + CACNA1C genotyping),
            MIT DSpace (CACNA1C functional phenotyping in induced neurons).

    AA (homozygous risk):     1.4x response
    AG (heterozygous):        1.15x response
    GG (homozygous non-risk): 1.0x response (reference)
    """
    return {"AA": 1.4, "AG": 1.15, "GG": 1.0}.get(genotype, 1.0)


def gst_susceptibility(gstm1_null: bool, gstt1_null: bool) -> float:
    """GST null-genotype effect on ROS defense capacity.

    Source: GSTM1/GSTT1 null polymorphisms and EHS association.
    Analogous to PMC2072834 (GSTM1 deletion moderates PM2.5 → HRV).

    Null genotype = weaker oxidative stress clearance.
    """
    modifier = 1.0
    if gstm1_null:
        modifier *= 1.3
    if gstt1_null:
        modifier *= 1.2
    return modifier


def anatomical_susceptibility(age: int, sex: str, bmi: float) -> float:
    """Anatomical EMF sensitivity based on tissue geometry.

    Children: thinner skull → higher SAR → greater response.
    Low BMI: thinner fat layer → less RF attenuation.

    Source: Gandhi 1996 (SAR distribution in head),
            de Salles (children SAR 2-3x adults).
    """
    if age < 6:
        age_factor = 2.5
    elif age < 12:
        age_factor = 2.0
    elif age < 18:
        age_factor = 1.5
    else:
        age_factor = 1.0

    bmi_factor = max(0.8, 1.3 - 0.015 * bmi)

    return age_factor * bmi_factor


def selye_phase(cumulative_years: float, intensity: float) -> dict:
    """Allostatic load phase classification.

    Phase 1 (alarm):      0-1 load units, acute response
    Phase 2 (resistance): 1-15 load units, compensated, NO symptoms
    Phase 3 (exhaustion):  >15 load units, symptoms emerge

    Source: Selye 1956 General Adaptation Syndrome,
            integrated in BERM 9.0.
    """
    load = cumulative_years * intensity

    if load < 1:
        phase = "alarm"
        capacity_remaining = 0.95
    elif load < 15:
        phase = "resistance"
        capacity_remaining = max(0.3, 1.0 - 0.045 * load)
    else:
        phase = "exhaustion"
        capacity_remaining = max(0.05, 0.3 - 0.02 * (load - 15))

    return {
        "phase": phase,
        "allostatic_load": round(load, 2),
        "compensation_capacity": round(capacity_remaining, 3),
        "ehs_onset_predicted": phase == "exhaustion",
    }


def individual_chi_modifier(
    genotype: str = "GG",
    gstm1_null: bool = False,
    gstt1_null: bool = False,
    age: int = 30,
    sex: str = "M",
    bmi: float = 25.0,
    cumulative_years: float = 10.0,
    intensity: float = 1.0,
) -> dict:
    """Combined individual susceptibility modifier.

    χ_i = χ(Ā) × g_VGCC × g_anatomy × g_cumulative

    Returns dict with component values and combined modifier.
    """
    g_vgcc = vgcc_susceptibility_modifier(genotype)
    g_gst = gst_susceptibility(gstm1_null, gstt1_null)
    g_anatomy = anatomical_susceptibility(age, sex, bmi)
    phase = selye_phase(cumulative_years, intensity)

    exhaustion_amplifier = 1.0
    if phase["phase"] == "exhaustion":
        exhaustion_amplifier = 1.0 / max(0.1, phase["compensation_capacity"])

    combined = g_vgcc * g_gst * g_anatomy * exhaustion_amplifier

    return {
        "g_vgcc": round(g_vgcc, 3),
        "g_gst": round(g_gst, 3),
        "g_anatomy": round(g_anatomy, 3),
        "selye_phase": phase,
        "exhaustion_amplifier": round(exhaustion_amplifier, 3),
        "combined_modifier": round(combined, 3),
    }
