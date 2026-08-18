"""BERM v16/v17 extended model: decomposed biological capacity pipeline.

Replaces the community sigmoid single-function approach with a
multi-layer biological capacity model:
  TFR = bioCap * behavioral * cultural

bioCap = maleBioCap * spermCa2 * CRY * melatonin * ovulVGIC
maleBioCap = baseBioCap * dysbiosis * BBB * nutrition * epigenetic

All functions match the Wolfram LBERMv4Model_1.wl reference exactly.
"""

from __future__ import annotations

import math

from berm.config import RECOVERY_LAYERS, ALPHA_EFF
from berm.data.countries import (
    COUNTRY_PARAMS,
    NETWORK_QUALITY,
    TECH_DIFFUSION,
    SMARTPHONE_PEN_2024,
    SMARTPHONE_MIDPOINT,
    EARPOD_PEN_2024,
    WIFI_PEN_2024,
    WIFI_MIDPOINT,
    IOT_DEVICES_2024,
    SMARTPHONE_IN_BEDROOM,
    NUTRITION_PROFILES,
    OCCUPATIONAL_STRUCTURE_2024,
    OCCUPATIONAL_EMF_WEIGHTS,
    V12_ACTUAL_TFR_2024,
    CULTURAL_TFR_PARAMS,
    IVF_SHARES,
    MIGRATION_DATA,
    ANTIDEPRESSANT_DDD,
    DEPRESSION_PARAMS,
    get_country_params,
)
from berm.exposure.ambient import get_attenuation_factor
from berm.biology.pathways import dysbiosis_index, pathway_f, l_reuteri_oxytocin_pathway


# === stdlib chi (no numpy dependency) ===

def chi(ambient_level: float) -> float:
    """Lindgren selection rule: A / sqrt(1 + A^2)."""
    return ambient_level / math.sqrt(1 + ambient_level ** 2)


# === Tech diffusion curve ===

def tech_diffusion_curve(half_year: int, year: int) -> float:
    """Logistic tech adoption: 1 / (1 + exp(-0.3 * (year - halfYear)))."""
    return 1.0 / (1.0 + math.exp(-0.3 * (year - half_year)))


# === Cultural TFR (demographic transition baseline) ===

def cultural_tfr(country: str, year: int) -> float:
    """Country-specific cultural TFR ceiling: a + b * exp(-c * (year - 1960))."""
    a, b, c = CULTURAL_TFR_PARAMS.get(country, (1.2, 4.0, 0.04))
    return a + b * math.exp(-c * (year - 1960))


# === Leaf device penetration functions ===

def smartphone_penetration(country: str, year: int) -> float:
    """Smartphone penetration: logistic curve with country-specific midpoint."""
    pen2024 = SMARTPHONE_PEN_2024.get(country, 0.40)
    mid = SMARTPHONE_MIDPOINT.get(country, 2016)
    return pen2024 / (1.0 + math.exp(-0.5 * (year - mid)))


def phone_body_contact_hours(year: int) -> float:
    """Daily phone body contact hours (global trend)."""
    if year < 2007:
        raw = 2.0
    elif year < 2012:
        raw = 2.0 + 4.0 * (year - 2007) / 5.0
    elif year < 2015:
        raw = 6.0 + 6.0 * (year - 2012) / 3.0
    elif year < 2020:
        raw = 12.0 + 2.0 * (year - 2015) / 5.0
    else:
        raw = 14.0 + 0.5 * (year - 2020)
    return max(0.0, min(18.0, raw))


def earpod_penetration(country: str, year: int) -> float:
    """Earpod/earbud penetration: ramp from 2016."""
    pen2024 = EARPOD_PEN_2024.get(country, 0.05)
    if year < 2016:
        ramp = 0.0
    else:
        ramp = min(1.0, (year - 2016.0) / 8.0)
    return pen2024 * ramp


def wifi_penetration(country: str, year: int) -> float:
    """WiFi home penetration: logistic with country midpoint."""
    pen2024 = WIFI_PEN_2024.get(country, 0.30)
    mid = WIFI_MIDPOINT.get(country, 2015)
    return pen2024 / (1.0 + math.exp(-0.4 * (year - mid)))


def iot_devices_per_household(country: str, year: int) -> float:
    """IoT devices per household: linear ramp from 2014."""
    dev2024 = IOT_DEVICES_2024.get(country, 3)
    return dev2024 * max(0.0, min(1.0, (year - 2014.0) / 10.0))


# === Ambient generation multiplier ===

def v16_ambient_gen_mult(year: int, td) -> float:
    """Technology generation multiplier for ambient EMF."""
    if year >= td.year_5g:
        return 4.0
    if year >= td.year_4g:
        return 2.5
    if year >= td.year_3g:
        return 1.5
    if year >= td.start:
        return 1.0
    return 0.0


# === Occupational structure ===

def agriculture_share(country: str, year: int) -> float:
    occ = OCCUPATIONAL_STRUCTURE_2024.get(
        country, {"agriculture": 0.20})
    agri2024 = occ.get("agriculture", 0.20)
    if agri2024 > 0.50:
        decline_rate = 0.015
    elif agri2024 > 0.20:
        decline_rate = 0.010
    elif agri2024 > 0.05:
        decline_rate = 0.005
    else:
        decline_rate = 0.001
    agri_year = agri2024 + decline_rate * (2024 - year)
    return max(0.01, min(0.90, agri_year))


def service_share(country: str, year: int) -> float:
    occ = OCCUPATIONAL_STRUCTURE_2024.get(
        country, {"services": 0.50, "agriculture": 0.20})
    serv2024 = occ.get("services", 0.50)
    agri2024 = occ.get("agriculture", 0.20)
    agri_year = agriculture_share(country, year)
    serv_year = serv2024 - (agri_year - agri2024) * 0.6
    return max(0.10, min(0.90, serv_year))


def remote_work_share(country: str, year: int) -> float:
    occ = OCCUPATIONAL_STRUCTURE_2024.get(
        country, {"remote_work": 0.05})
    remote2024 = occ.get("remote_work", 0.05)
    if year < 2019:
        return 0.02 * remote2024
    if year == 2020:
        return 0.8 * remote2024
    if year >= 2024:
        return remote2024
    return remote2024 * (0.8 + 0.2 * (year - 2020) / 4.0)


def occupational_emf_multiplier(country: str, year: int) -> float:
    agri = agriculture_share(country, year)
    services = service_share(country, year)
    industry = max(0.0, 1.0 - agri - services)
    remote = remote_work_share(country, year)
    return (
        agri * OCCUPATIONAL_EMF_WEIGHTS["agriculture"]
        + industry * OCCUPATIONAL_EMF_WEIGHTS["industry"]
        + max(0.0, services - remote) * OCCUPATIONAL_EMF_WEIGHTS["office_services"]
        + remote * OCCUPATIONAL_EMF_WEIGHTS["remote_work"]
    )


# === v16 Annual exposure channels ===

def _get_td(country: str):
    from berm.data.countries import TechDiffusion
    return TECH_DIFFUSION.get(
        country,
        TechDiffusion(1995, 2005, 2005, 2013, 2022),
    )


def v16_ambient_annual(country: str, year: int) -> float:
    """Annual ambient EMF: base station + WiFi + IoT."""
    td = _get_td(country)
    atten = get_attenuation_factor(country)
    nq = NETWORK_QUALITY.get(country, 0.7)
    bs = (tech_diffusion_curve(td.half, year)
          * v16_ambient_gen_mult(year, td) * atten * nq)
    wifi = wifi_penetration(country, year) * 0.15
    iot = iot_devices_per_household(country, year) * 0.005
    return bs + wifi + iot


def v16_personal_annual(country: str, year: int) -> float:
    """Annual personal EMF: smartphone SAR + earpod."""
    td = _get_td(country)
    atten = get_attenuation_factor(country)
    nq = NETWORK_QUALITY.get(country, 0.7)
    sp_pen = smartphone_penetration(country, year)
    body_hrs = phone_body_contact_hours(year)
    ear_pen = earpod_penetration(country, year)
    if year >= td.year_5g:
        phone_sar = 1.4
    elif year >= td.year_4g:
        phone_sar = 1.2
    elif year >= td.year_3g:
        phone_sar = 1.0
    else:
        phone_sar = 0.6
    phone_contrib = sp_pen * (body_hrs / 16.0) * phone_sar * atten * nq
    earpod_contrib = ear_pen * sp_pen * 0.8 * nq
    return 1.5 * (phone_contrib + earpod_contrib)


# === v17 Layer retention (5-layer recovery model) ===

def v17_layer_retention(delta_years: int) -> float:
    """Weighted retention across 5 damage layers after delta_years."""
    total = 0.0
    for layer in RECOVERY_LAYERS.values():
        if delta_years == 0:
            total += layer["weight"] * 1.0
        else:
            total += layer["weight"] * (1.0 - layer["alpha"]) ** delta_years
    return total


# === v17 Cohort adjustment (vulnerability-weighted) ===

def vulnerability_by_age(age: float) -> float:
    """Age-dependent EMF vulnerability multiplier.

    Fetus is most sensitive (bioelectric code most active: Sempou 2022,
    Levin 2023). Newborn sensitive (BBB undeveloped). Child sensitive
    (smaller body -> higher SAR per kg).
    """
    if age < 0:
        return 5.0
    elif age < 2:
        return 4.0
    elif age < 6:
        return 3.0
    elif age < 12:
        return 2.5
    elif age < 18:
        return 2.0
    return 1.0


_VULN_BY_AGE = [
    (-1, 5.0),   # fetal
    (0, 4.0),    # 0-1
    (1, 4.0),    # 1-2
    (2, 3.0),    # 2-3
    (3, 3.0),    # 3-4
    (4, 3.0),    # 4-5
    (5, 3.0),    # 5-6
    (6, 2.5),    # 6-7
    (7, 2.5),    # 7-8
    (8, 2.5),    # 8-9
    (9, 2.5),    # 9-10
    (10, 2.5),   # 10-11
    (11, 2.5),   # 11-12
    (12, 2.0),   # 12-13
    (13, 2.0),   # 13-14
    (14, 2.0),   # 14-15
    (15, 2.0),   # 15-16
    (16, 2.0),   # 16-17
    (17, 2.0),   # 17-18
]

_VULN_MAX = sum(v for _, v in _VULN_BY_AGE)


def v17_cohort_adjustment(country: str, year: int) -> float:
    """Vulnerability-weighted cohort EMF amplification.

    For the peak birth cohort (age 28 at eval year), weight each
    developmental year by age-specific EMF vulnerability:
    fetal 5x, 0-2 4x, 2-6 3x, 6-12 2.5x, 12-18 2x, adult 1x.
    """
    td = _get_td(country)
    peak_birth_year = year - 28
    emf_start = td.start

    weighted = 0.0
    for age, vuln in _VULN_BY_AGE:
        if peak_birth_year + age >= emf_start:
            weighted += vuln

    fraction = weighted / _VULN_MAX
    return 1.0 + 0.20 * fraction


def cohort_weighted_exposure(country: str, eval_year: int) -> float:
    """Cohort-weighted cumulative exposure (simple sum, no retention).

    Weights each year's exposure by the age-specific vulnerability
    that the peak birth cohort (age 28 at eval_year) experienced.
    """
    td = _get_td(country)
    birth_year = eval_year - 28
    weighted_cum = 0.0

    for year in range(max(td.start, birth_year - 1), eval_year + 1):
        age = year - birth_year
        amb = v16_ambient_annual(country, year)
        pers = v16_personal_annual(country, year)
        annual = amb + chi(amb) * pers
        weight = vulnerability_by_age(age)
        weighted_cum += annual * weight

    return weighted_cum


# === Cohort-weighted cumulative with retention (Erä 4.2) ===

_cohort_norm_factor: float = 1.0


def _cohort_weighted_cum_raw(country: str, year: int) -> float:
    """Cohort-weighted cumulative with 5-layer retention (unnormalized)."""
    td = _get_td(country)
    birth_year = year - 28
    total = 0.0
    for y in range(td.start, year + 1):
        amb = v16_ambient_annual(country, y)
        pers = v16_personal_annual(country, y)
        annual = amb + chi(amb) * pers
        age = y - birth_year
        vuln = vulnerability_by_age(age)
        ret = v17_layer_retention(year - y)
        total += annual * vuln * ret
    return total


def _compute_cohort_norm_factor() -> float:
    """Normalization factor: keeps adj_cum scale compatible with b parameter."""
    ratios = []
    for c in V12_ACTUAL_TFR_2024:
        wt_cum = v17_weighted_cum_exposure(c, 2024)
        coh_adj = v17_cohort_adjustment(c, 2024)
        cohort_raw = _cohort_weighted_cum_raw(c, 2024)
        if cohort_raw > 0.01:
            ratios.append((wt_cum * coh_adj) / cohort_raw)
    return sum(ratios) / len(ratios)


def cohort_weighted_exposure_normalized(country: str, year: int) -> float:
    """Cohort-weighted cumulative with retention, normalized to old scale."""
    return _cohort_weighted_cum_raw(country, year) * _cohort_norm_factor


# === Cumulative exposure chain ===

def v16_two_channel_cum_exposure(country: str, year: int) -> float:
    """Raw two-channel cumulative: ambient + chi(ambient) * personal."""
    td = _get_td(country)
    total = 0.0
    for y in range(td.start, year + 1):
        amb = v16_ambient_annual(country, y)
        pers = v16_personal_annual(country, y)
        total += amb + chi(amb) * pers
    return total


def v17_weighted_cum_exposure(country: str, year: int) -> float:
    """5-layer recovery weighted cumulative exposure."""
    td = _get_td(country)
    total = 0.0
    for y in range(td.start, year + 1):
        amb = v16_ambient_annual(country, y)
        pers = v16_personal_annual(country, y)
        annual_exp = amb + chi(amb) * pers
        total += annual_exp * v17_layer_retention(year - y)
    return total


def v16_adjusted_cumulative_exposure(country: str, year: int) -> float:
    """Adjusted cumulative = cohort-weighted-normalized * occupational."""
    return (
        cohort_weighted_exposure_normalized(country, year)
        * occupational_emf_multiplier(country, year)
    )


# === v17 Night / CRY / Melatonin / Ovulation ===

GAMMA_CRY = 0.02
GAMMA_MELATONIN = 0.015
GAMMA_OVUL_VGIC = 0.008
GAMMA_MOTILITY = 0.015
GAMMA_CAPACITATION = 0.005
GAMMA_NAVIGATION = 0.003


def v17_night_fraction(country: str, year: int) -> float:
    """Night EMF fraction: smartphone-in-bedroom * WiFi contribution."""
    sp_pen = smartphone_penetration(country, year)
    bed_frac = SMARTPHONE_IN_BEDROOM.get(country, 0.55)
    wifi_pen = wifi_penetration(country, year)
    return max(0.0, min(1.5, sp_pen * bed_frac * (1.0 + wifi_pen * 0.3)))


def v17_cry_annual_response(country: str, year: int) -> float:
    """CRY annual response: personal * nightFraction."""
    pers = v16_personal_annual(country, year)
    nf = v17_night_fraction(country, year)
    return pers * nf


def v17_cry_effect(country: str, year: int) -> float:
    """CRY effect on female fertility: RPM/cryptochrome disruption."""
    cry_ann = v17_cry_annual_response(country, year)
    return max(0.85, min(1.0, 1.0 - GAMMA_CRY * cry_ann))


def v17_melatonin_suppression(country: str, year: int) -> float:
    """Melatonin suppression from night EMF exposure."""
    night_emf = v17_night_fraction(country, year) * v16_personal_annual(country, year)
    return max(0.90, min(1.0, 1.0 - GAMMA_MELATONIN * night_emf))


def v17_ovulation_vgic(country: str, year: int) -> float:
    """VGIC disruption of ovulation bioelectric coordination."""
    amb = v16_ambient_annual(country, year)
    pers = v16_personal_annual(country, year)
    vgic_exposure = chi(amb) * pers
    return max(0.95, min(1.0, 1.0 - GAMMA_OVUL_VGIC * vgic_exposure))


# === Sperm Ca2+ fecundity ===

def v17_sperm_ca2_fecundity(country: str, year: int) -> float:
    """Sperm Ca2+ channel (CatSper) disruption: motility * capacitation * navigation."""
    pers = v16_personal_annual(country, year)
    adj_cum = v16_adjusted_cumulative_exposure(country, year)
    cum_norm = min(1.0, adj_cum / 50.0)
    motility = 1.0 - GAMMA_MOTILITY * pers
    capacitation = 1.0 - GAMMA_CAPACITATION * cum_norm
    navigation = 1.0 - GAMMA_NAVIGATION * cum_norm
    return max(0.92, min(1.0, motility * capacitation * navigation))


# === v11 Base biological capacity ===

def v11_biological_capacity(cum_exposure: float) -> float:
    """Base biological capacity: exponential decay above threshold."""
    a, b, threshold = 6.5, 0.010, 5.0
    if cum_exposure <= threshold:
        return a
    return a * math.exp(-b * (cum_exposure - threshold))


# === v12 Nutrition modifier ===

def v12_nutrition_modifier(country: str) -> float:
    """Antioxidant protection modifier from diet quality."""
    profile = NUTRITION_PROFILES.get(
        country, {"antioxidant_index": 0.55, "diet_quality": 0.55})
    antiox_idx = profile["antioxidant_index"]
    protection = max(-1.0, min(1.0, (antiox_idx - 0.5) / 0.5))
    return 1.0 + 0.10 * protection


# === v16 Epigenetic factor ===

def v16_epigenetic_factor(country: str, year: int) -> float:
    """Epigenetic generational cumulation: 0.97^generations."""
    td = _get_td(country)
    years_of_emf = max(0, year - td.start)
    generations = years_of_emf / 28.0
    return 0.97 ** generations


# === v17 Male biological capacity ===

def v17_male_bio_cap(adj_cum_emf: float, country: str, year: int) -> float:
    """Male biological capacity: base * dysbiosis * BBB * nutrition * epigenetic.

    emf_norm uses INSTANTANEOUS EMF (ambient+personal for this year),
    not cumulative — dysbiosis and BBB are physiologically instantaneous.
    """
    base_bio_cap = v11_biological_capacity(adj_cum_emf)
    instant_emf = v16_ambient_annual(country, year) + v16_personal_annual(country, year)
    emf_norm = min(1.0, instant_emf / 8.0)
    dys_idx = dysbiosis_index(emf_norm)
    dys_effect = max(0.7, min(1.0, 1.0 - 0.08 * max(0.0, dys_idx - 1.0)))
    bbb_result = pathway_f(emf_norm)
    bbb_effect = max(0.8, min(1.0, 1.0 - 0.02 * max(0.0, bbb_result["multiplier"] - 1.0)))
    nutr_effect = v12_nutrition_modifier(country)
    epi_effect = v16_epigenetic_factor(country, year)
    return base_bio_cap * dys_effect * bbb_effect * nutr_effect * epi_effect


# === v16 Full biological capacity ===

def v16_biological_capacity(adj_cum_emf: float, country: str, year: int) -> float:
    """Full biological capacity: male * spermCa2 * CRY * melatonin * ovulVGIC."""
    return (
        v17_male_bio_cap(adj_cum_emf, country, year)
        * v17_sperm_ca2_fecundity(country, year)
        * v17_cry_effect(country, year)
        * v17_melatonin_suppression(country, year)
        * v17_ovulation_vgic(country, year)
    )


# === v17 Male/Female/Couple decomposition ===

def v17_f_male(country: str, year: int) -> float:
    """Male fertility factor."""
    adj_cum = v16_adjusted_cumulative_exposure(country, year)
    return v17_male_bio_cap(adj_cum, country, year) * v17_sperm_ca2_fecundity(country, year)


def v17_f_female(country: str, year: int) -> float:
    """Female fertility factor."""
    return (
        v17_cry_effect(country, year)
        * v17_melatonin_suppression(country, year)
        * v17_ovulation_vgic(country, year)
    )


def v17_f_couple(country: str, year: int) -> float:
    """Couple fertility = male * female = v16BiologicalCapacity."""
    return v17_f_male(country, year) * v17_f_female(country, year)


# === Behavioral factor V3 (5D endocrine) ===

def emf_behavioral_factor_v3(adj_cum_emf: float) -> float:
    """5-dimensional endocrine behavioral factor.

    Oxytocin, testosterone (cortisol-suppressed), dopamine,
    cortisol, vasopressin — geometric mean.
    """
    oxytocin = math.exp(-0.010 * adj_cum_emf)
    testosterone = math.exp(-0.013 * adj_cum_emf)
    dopamine = math.exp(-0.016 * adj_cum_emf)
    cortisol = math.exp(-0.008 * adj_cum_emf)
    vasopressin = math.exp(-0.006 * adj_cum_emf)
    cortisol_suppression = 0.5 + 0.5 * cortisol
    effective_t = testosterone * cortisol_suppression
    combined = (oxytocin * effective_t * dopamine * cortisol * vasopressin) ** (1.0 / 5.0)
    return max(0.1, combined)


# === OT dual pathway diagnostics (DIAGNOSTIC_ONLY) ===


def vagal_oxytocin_pathway(cum_emf: float, instant_emf: float) -> dict:
    """HPA activation -> vagal suppression -> OT decline (DIAGNOSTIC_ONLY).

    Porges 2001/2025: myelinated vagus inhibits HPA; chronic stress reverses.
    Pawlak 2025: EMF -> corticosterone d=1.88.
    Carter 2021: OT/AVP fundamental to mammalian sociality.
    """
    cortisol_elevation = 1.0 + 0.88 * min(1.0, instant_emf / 5.0)
    vagal_tone = 1.0 / cortisol_elevation
    ot_from_vagal = vagal_tone ** 0.5
    chronic_hpa_load = 1 - math.exp(-0.008 * cum_emf)
    selye_phase = "resistance" if chronic_hpa_load < 0.5 else "exhaustion"

    return {
        "cortisol_elevation": round(cortisol_elevation, 3),
        "vagal_tone": round(vagal_tone, 4),
        "ot_vagal_fraction": round(ot_from_vagal, 4),
        "chronic_hpa_load": round(chronic_hpa_load, 4),
        "selye_phase": selye_phase,
        "mechanism": "EMF → HPA↑ → cortisol↑ → vagal suppression → OT↓",
    }


def oxytocin_dual_pathway_diagnostic(
    country: str, year: int, cum_emf: float, instant_emf: float,
) -> dict:
    """Combined OT diagnostic from two convergent pathways (DIAGNOSTIC_ONLY).

    Pathway 1 (HPA-vagal): EMF -> cortisol -> vagal suppression -> OT down.
    Pathway 2 (microbiome): EMF -> dysbiosis -> L. reuteri down -> OT down.
    Both converge on oxytocin, explaining behavioural OT = exp(-0.010*cumEMF).
    """
    emf_norm = min(1.0, instant_emf / 5.0)
    vagal = vagal_oxytocin_pathway(cum_emf, instant_emf)
    microbiome = l_reuteri_oxytocin_pathway(emf_norm)
    model_ot = math.exp(-0.010 * cum_emf)
    diagnostic_ot = vagal["ot_vagal_fraction"] * microbiome["ot_microbiome_fraction"]

    return {
        "model_ot": round(model_ot, 4),
        "diagnostic_ot": round(diagnostic_ot, 4),
        "vagal_contribution": vagal,
        "microbiome_contribution": microbiome,
        "convergence_note": (
            "Both pathways converge on oxytocin. The model's exponential "
            "OT = exp(-0.010 * cumEMF) approximates two independent "
            "biological mechanisms that both suppress OT."
        ),
    }


# === v16 True cultural rate with alpha compensation ===

_v16_true_cultural_rates: dict[str, float] = {}
_v16_bio_behav_2024: dict[str, float] = {}


def calibrate_v16() -> dict[str, float]:
    """Calibrate cultural rates from observed TFR 2024."""
    global _v16_true_cultural_rates, _v16_bio_behav_2024, _cohort_norm_factor
    _cohort_norm_factor = _compute_cohort_norm_factor()
    rates: dict[str, float] = {}
    bb: dict[str, float] = {}
    for c in V12_ACTUAL_TFR_2024:
        adj_cum = v16_adjusted_cumulative_exposure(c, 2024)
        bio_cap = v16_biological_capacity(adj_cum, c, 2024)
        behav = emf_behavioral_factor_v3(adj_cum)
        actual = V12_ACTUAL_TFR_2024[c]
        if bio_cap * behav > 0.001:
            cult = actual / (bio_cap * behav)
        else:
            cult = 0.80
        rates[c] = round(cult, 2)
        bb[c] = bio_cap * behav
    _v16_true_cultural_rates = rates
    _v16_bio_behav_2024 = bb
    return rates


def v16_true_cultural_rate(country: str, year: int) -> float:
    """Alpha-compensated cultural rate with temporal evolution."""
    if not _v16_true_cultural_rates:
        calibrate_v16()
    rate2024 = _v16_true_cultural_rates.get(country, 0.80)
    cult_ratio = cultural_tfr(country, year) / cultural_tfr(country, 2024)
    bio_behav24 = _v16_bio_behav_2024.get(country, 1.0)
    adj_cum_y = v16_adjusted_cumulative_exposure(country, year)
    bio_behav_y = (
        v16_biological_capacity(adj_cum_y, country, year)
        * emf_behavioral_factor_v3(adj_cum_y)
    )
    effective_alpha = ALPHA_EFF
    compensation = (bio_behav24 / max(bio_behav_y, 0.001)) ** effective_alpha
    scaled_rate = rate2024 * cult_ratio * compensation
    return max(0.05, min(2.50, scaled_rate))


# === IVF temporal projection ===

def ivf_share_projected(country: str, year: int) -> float:
    """IVF share grows 0.5pp/year from 2023 baseline, capped at 20%."""
    base = IVF_SHARES.get(country, 0.02)
    return max(0.0, min(0.20, base + 0.005 * (year - 2023)))


# === TFR interpretation layer (does NOT alter predict_tfr output) ===

def biological_tfr(observed_tfr: float, ivf_share: float,
                   ivf_success_rate: float = 0.30) -> float:
    """Biological TFR without IVF rescue.

    IVF births buffer observed TFR — without them the biological
    signal would be lower. BERM's prediction targets this underlying
    biological TFR; observed TFR includes the IVF mask.
    """
    ivf_births_fraction = ivf_share * ivf_success_rate
    return observed_tfr * (1 - ivf_births_fraction)


def native_tfr(total_tfr: float, immigrant_tfr: float,
               immigrant_share: float) -> float:
    """Separate native-born TFR from total TFR.

    Does not change predict_tfr output — reported alongside it.
    """
    if immigrant_share >= 1.0:
        return total_tfr
    return (total_tfr - immigrant_share * immigrant_tfr) / (1 - immigrant_share)


def immigration_buffer(country: str, predicted_tfr: float) -> dict:
    """Immigration buffer diagnostics for a country."""
    imm = MIGRATION_DATA.get(country)
    if not imm:
        return {
            "country": country,
            "total_tfr": predicted_tfr,
            "native_tfr": predicted_tfr,
            "buffer": 0.0,
            "buffer_pct": 0.0,
            "immigrant_share": 0.0,
        }

    imm_share = imm["imm_share"]
    imm_tfr = imm["imm_tfr"]
    nat = native_tfr(predicted_tfr, imm_tfr, imm_share)
    buf = predicted_tfr - nat

    return {
        "country": country,
        "total_tfr": predicted_tfr,
        "native_tfr": round(nat, 3),
        "buffer": round(buf, 3),
        "buffer_pct": round(buf / nat * 100, 1) if nat > 0 else 0.0,
        "immigrant_share": imm_share,
    }


def immigrant_generation_tfr(origin_emf: float, host_emf: float,
                              generation: str,
                              years_in_host: float = 10) -> float:
    """Immigrant generation TFR by EMF adaptation.

    G1: origin-country TFR decays exponentially toward host EMF level.
    G2: faster adaptation (shorter exposure memory).
    G3: near host-country native level.
    """
    base = 6.0
    if generation == "G1":
        return base * math.exp(-0.12 * years_in_host * max(0, host_emf - origin_emf))
    elif generation == "G2":
        return base * math.exp(-0.40 * host_emf * 5.0)
    elif generation == "G3":
        return base * math.exp(-0.40 * host_emf * 5.0) * 0.7
    return base


# === v16 Prediction ===

def v16_predicted_tfr(country: str, year: int) -> float:
    """V16 predicted TFR = bioCap * behavioral * cultural."""
    adj_cum = v16_adjusted_cumulative_exposure(country, year)
    bio_cap = v16_biological_capacity(adj_cum, country, year)
    behav = emf_behavioral_factor_v3(adj_cum)
    cult = v16_true_cultural_rate(country, year)
    return bio_cap * behav * cult


def predict_tfr_extended(country: str, year: int) -> dict:
    """Extended TFR prediction with interpretation layers.

    Calls v16_predicted_tfr (unchanged) and adds IVF decomposition,
    immigration buffer, and biological native TFR. No numerical
    change to the core prediction.
    """
    if not _v16_true_cultural_rates:
        calibrate_v16()

    predicted = v16_predicted_tfr(country, year)

    ivf_share = ivf_share_projected(country, year)
    bio_tfr = biological_tfr(predicted, ivf_share)

    imm = immigration_buffer(country, predicted)

    nat_tfr = imm["native_tfr"]
    bio_nat = biological_tfr(nat_tfr, ivf_share) if nat_tfr else None

    return {
        "predicted_tfr": predicted,
        "ivf_share": round(ivf_share, 4),
        "biological_tfr": round(bio_tfr, 3),
        "ivf_contribution": round(predicted - bio_tfr, 3),
        "native_tfr": nat_tfr,
        "immigration_buffer": imm["buffer"],
        "immigration_buffer_pct": imm["buffer_pct"],
        "biological_native_tfr": round(bio_nat, 3) if bio_nat is not None else None,
    }


# === DIAGNOSTIC: SSRI endogenous mediator model ===

def ddd_to_prevalence(ddd_per_1000: float) -> float:
    """Convert DDD/1000 inhabitants/day to population prevalence."""
    return ddd_per_1000 / 1000.0


def endogenous_ssri_model(country: str, year: int, cum_emf: float) -> dict:
    """EMF -> depression -> SSRI -> reproductive effects (DIAGNOSTIC_ONLY).

    Moncrieff 2022: serotonin hypothesis debunked — SSRI does not fix
    the root cause. SSRI use is an endogenous consequence of EMF-induced
    depression, not an independent confounder.

    Kacem 2024: EMF exposure -> depression OR 1.45.
    """
    dep_params = DEPRESSION_PARAMS.get(
        country, {"baseline": 0.05, "treatment_access": 0.30})
    base_dep = dep_params["baseline"]
    access = dep_params["treatment_access"]

    emf_fraction = min(1.0, cum_emf / 50)
    emf_attributable = base_dep * (1.45 - 1) * emf_fraction
    total_depression = base_dep + emf_attributable

    ssri_prev = total_depression * access * 0.65

    # Population-level reproductive effects
    pop_conc_decline = ssri_prev * 0.24
    pop_mot_decline = ssri_prev * 0.12
    sexual_dysf = ssri_prev * 0.55
    attempt_reduction = sexual_dysf * 0.30

    fertility_loss = 1 - (
        (1 - pop_conc_decline) * (1 - pop_mot_decline) * (1 - attempt_reduction)
    )

    ddd = ANTIDEPRESSANT_DDD.get(country, 10)
    ddd_prev = ddd_to_prevalence(ddd)

    return {
        "country": country,
        "year": year,
        "depression_prevalence": round(total_depression, 4),
        "emf_attributable_depression": round(emf_attributable, 4),
        "ssri_prevalence": round(ssri_prev, 4),
        "ssri_mediated_fertility_loss": round(fertility_loss, 4),
        "ddd_per_1000": ddd,
        "ddd_prevalence": round(ddd_prev, 4),
        "is_endogenous": True,
        "moncrieff_note": "serotonin hypothesis debunked 2022",
    }


# === DIAGNOSTIC: Sempou mTOR pathway ===

def sempou_mtor_effect(vmem_perturbation: float) -> dict:
    """Sempou 2022: Vmem -> Ca2+ -> mTOR -> differentiation block (DIAGNOSTIC_ONLY).

    Spermatogonial differentiation depends on mTOR level.
    EMF-mediated depolarisation -> Ca2+up -> mTORup -> differentiationdown
    -> mature spermdown -> concentrationdown.
    Rapamycin (mTOR inhibitor) should reverse the effect.
    """
    mtor_activation = 1.0 + 0.25 * vmem_perturbation
    differentiation_efficiency = 1.0 / (1.0 + 0.5 * max(0, mtor_activation - 1.0))

    return {
        "mtor_activation": round(mtor_activation, 3),
        "differentiation_efficiency": round(differentiation_efficiency, 3),
        "sperm_production_multiplier": round(differentiation_efficiency, 3),
        "rapamycin_rescue_prediction": "differentiation restored if mTOR inhibited",
    }


# === DIAGNOSTIC: Pharmacological validation matrix ===

PHARM_VALIDATION: dict[str, dict[str, str]] = {
    "CCB": {
        "pathway": "A (VGIC)",
        "drug_effect": "VGCC block -> sperm -23% (amlodipine 30d)",
        "emf_equivalent": "~6% VGCC disruption -> ~1.5%/yr decline",
        "rescue_test": "R1: CCB blocks EMF effect (Pall 2013: 23 studies)",
        "status": "VALIDATED",
    },
    "rapamycin": {
        "pathway": "F (mTOR/Sempou)",
        "drug_effect": "mTOR down -> sperm count down, differentiation accelerated",
        "emf_equivalent": "mTOR up -> differentiation blocked -> sperm down",
        "rescue_test": "R2: rapamycin restores differentiation in EMF cells",
        "status": "PREDICTED_NOT_TESTED",
    },
    "SSRI": {
        "pathway": "D (HPA->HPG)",
        "drug_effect": "prolactin up -> GnRH down -> SDF 2.2x, concentration -24%",
        "emf_equivalent": "cortisol up -> GnRH down -> same downstream",
        "rescue_test": "additive effects (different upstream)",
        "status": "ENDOGENOUS_MEDIATOR",
        "moncrieff": "serotonin hypothesis debunked 2022",
    },
    "melatonin": {
        "pathway": "C (pineal)",
        "drug_effect": "restores suppressed melatonin -> IVF fertilization +15%",
        "emf_equivalent": "EMF suppresses melatonin -> supplement rescues",
        "rescue_test": "R3: benefit greater in high-EMF environments",
        "status": "RESCUE_EVIDENCE",
    },
    "metformin": {
        "pathway": "F (mTOR/AMPK)",
        "drug_effect": "AMPK up -> mTOR down -> PCOS improves, longevity up",
        "emf_equivalent": "EMF -> mTOR up -> metformin counteracts",
        "rescue_test": "R4: metformin response greater in high-EMF PCOS",
        "status": "HYPOTHESIS",
        "longevity_note": "UK CPRD paradox: diabetics+metformin > healthy controls",
    },
}


# === v17 Sex ratio prediction ===

BASELINE_MALE_RATIO = 0.512
SEX_RATIO_ROS_SENSITIVITY = 0.003


def v17_predicted_sex_ratio(country: str, year: int) -> float:
    """Predicted sex ratio (fraction male). EMF shifts toward female."""
    adj_cum = v16_adjusted_cumulative_exposure(country, year)
    ros_exposure = min(1.0, adj_cum / 50.0)
    shift = SEX_RATIO_ROS_SENSITIVITY * ros_exposure
    return BASELINE_MALE_RATIO - shift


# === v16 Full country report ===

def v16_country_tfr(country: str, year: int) -> dict:
    """Full v16 country report with all intermediate values."""
    if not _v16_true_cultural_rates:
        calibrate_v16()

    adj_cum = v16_adjusted_cumulative_exposure(country, year)
    amb_ann = v16_ambient_annual(country, year)
    pers_ann = v16_personal_annual(country, year)
    occ_mult = occupational_emf_multiplier(country, year)
    instant_emf = amb_ann + pers_ann
    emf_norm = min(1.0, instant_emf / 8.0)

    base_bio_cap = v11_biological_capacity(adj_cum)
    dys_idx = dysbiosis_index(emf_norm)
    dys_eff = max(0.7, min(1.0, 1.0 - 0.08 * max(0.0, dys_idx - 1.0)))
    bbb_result = pathway_f(emf_norm)
    bbb_eff = max(0.8, min(1.0, 1.0 - 0.02 * max(0.0, bbb_result["multiplier"] - 1.0)))
    nutr_eff = v12_nutrition_modifier(country)
    epi_eff = v16_epigenetic_factor(country, year)
    night_frac = v17_night_fraction(country, year)
    cry_ann = v17_cry_annual_response(country, year)
    cry_eff = v17_cry_effect(country, year)
    melat_eff = v17_melatonin_suppression(country, year)
    sperm_ca2 = v17_sperm_ca2_fecundity(country, year)
    ovul_vgic = v17_ovulation_vgic(country, year)
    male_bio_cap = base_bio_cap * dys_eff * bbb_eff * nutr_eff * epi_eff
    bio_cap = male_bio_cap * sperm_ca2 * cry_eff * melat_eff * ovul_vgic

    oxy_ret = math.exp(-0.010 * adj_cum)
    test_ret = math.exp(-0.013 * adj_cum)
    dopa_ret = math.exp(-0.016 * adj_cum)
    cort_ret = math.exp(-0.008 * adj_cum)
    avp_ret = math.exp(-0.006 * adj_cum)
    cort_supp = 0.5 + 0.5 * cort_ret
    eff_t = test_ret * cort_supp
    behav = max(0.1, (oxy_ret * eff_t * dopa_ret * cort_ret * avp_ret) ** (1.0 / 5.0))

    true_cult = v16_true_cultural_rate(country, year)
    predicted = bio_cap * behav * true_cult

    ivf_share = ivf_share_projected(country, year)
    biological_tfr_val = predicted * (1 - ivf_share)

    imm = MIGRATION_DATA.get(country)
    if imm is not None:
        imm_share = imm["imm_share"]
        imm_tfr = imm["imm_tfr"]
        native_tfr_val = (predicted - imm_share * imm_tfr) / (1 - imm_share)
    else:
        imm_share = 0.0
        imm_tfr = 0.0
        native_tfr_val = predicted

    return _build_country_report(
        country, year, adj_cum, amb_ann, pers_ann, occ_mult, emf_norm,
        base_bio_cap, dys_idx, dys_eff, bbb_result, bbb_eff, nutr_eff, epi_eff,
        night_frac, cry_ann, cry_eff, melat_eff, sperm_ca2, ovul_vgic,
        male_bio_cap, bio_cap, oxy_ret, test_ret, dopa_ret, cort_ret, avp_ret,
        cort_supp, eff_t, behav, true_cult, predicted,
        ivf_share, biological_tfr_val, imm_share, imm_tfr, native_tfr_val,
    )


def _build_country_report(
    country, year, adj_cum, amb_ann, pers_ann, occ_mult, emf_norm,
    base_bio_cap, dys_idx, dys_eff, bbb_result, bbb_eff, nutr_eff, epi_eff,
    night_frac, cry_ann, cry_eff, melat_eff, sperm_ca2, ovul_vgic,
    male_bio_cap, bio_cap, oxy_ret, test_ret, dopa_ret, cort_ret, avp_ret,
    cort_supp, eff_t, behav, true_cult, predicted,
    ivf_share, biological_tfr_val, imm_share, imm_tfr, native_tfr_val,
):
    retentions = [oxy_ret, eff_t, dopa_ret, cort_ret, avp_ret]
    labels = ["Oxytocin", "Testosterone(HPA-suppressed)", "Dopamine", "Cortisol", "Vasopressin"]
    dominant = labels[retentions.index(min(retentions))]

    return {
        "country": country,
        "year": year,
        "ambient_annual": amb_ann,
        "personal_annual": pers_ann,
        "personal_fraction": pers_ann / (amb_ann + pers_ann) if (amb_ann + pers_ann) > 0 else 0.0,
        "occupational_multiplier": occ_mult,
        "adjusted_cumulative_exposure": adj_cum,
        "smartphone_penetration": smartphone_penetration(country, year),
        "phone_body_contact_hrs": phone_body_contact_hours(year),
        "earpod_penetration": earpod_penetration(country, year),
        "emf_norm": emf_norm,
        "base_bio_cap": base_bio_cap,
        "dysbiosis_index": dys_idx,
        "dysbiosis_modifier": dys_eff,
        "bbb_multiplier": bbb_result["multiplier"],
        "bbb_modifier": bbb_eff,
        "nutrition_modifier": nutr_eff,
        "epigenetic_factor": epi_eff,
        "cry_night_fraction": night_frac,
        "cry_annual_response": cry_ann,
        "cry_effect": cry_eff,
        "melatonin_suppression": melat_eff,
        "male_bio_cap": male_bio_cap,
        "sperm_ca2_fecundity": sperm_ca2,
        "ovulation_vgic": ovul_vgic,
        "female_fertility": cry_eff * melat_eff * ovul_vgic,
        "adjusted_bio_cap": bio_cap,
        "f_male": male_bio_cap * sperm_ca2,
        "f_female": cry_eff * melat_eff * ovul_vgic,
        "behavioral_v5": behav,
        "oxytocin_retention": oxy_ret,
        "testosterone_retention": test_ret,
        "dopamine_retention": dopa_ret,
        "cortisol_retention": cort_ret,
        "vasopressin_retention": avp_ret,
        "cortisol_t_suppression": cort_supp,
        "effective_testosterone": eff_t,
        "dominant_suppression": dominant,
        "true_cultural_base": _v16_true_cultural_rates.get(country, 0.80),
        "true_cultural_adjusted": true_cult,
        "bio_behav_2024": _v16_bio_behav_2024.get(country, 1.0),
        "bio_behav_current": bio_cap * behav,
        "effective_alpha": ALPHA_EFF,
        "chi_ambient": chi(amb_ann),
        "cohort_adjustment": v17_cohort_adjustment(country, year),
        "cohort_norm_factor": _cohort_norm_factor,
        "f_couple": v17_f_couple(country, year),
        "predicted_sex_ratio": v17_predicted_sex_ratio(country, year),
        "predicted_tfr": predicted,
        "total_emf_effect": 6.5 - bio_cap * behav,
        "percent_lost_to_emf": (6.5 - bio_cap * behav) / 6.5,
        "ivf_share": ivf_share,
        "biological_tfr": biological_tfr_val,
        "immigration_share": imm_share,
        "immigrant_tfr": imm_tfr,
        "native_tfr": native_tfr_val,
        "feedback_amplification": feedback_amplification(country, year),
        "ot_dual_pathway": oxytocin_dual_pathway_diagnostic(
            country, year, adj_cum, amb_ann + pers_ann),
        "l_reuteri_pathway": l_reuteri_oxytocin_pathway(emf_norm),
        "vagal_pathway": vagal_oxytocin_pathway(adj_cum, amb_ann + pers_ann),
    }


# === LOOCV cross-validation ===

def _calibrate_excluding(exclude: str) -> tuple[dict[str, float], dict[str, float]]:
    """Calibrate cultural rates excluding one country. Returns (rates, bio_behav)."""
    rates: dict[str, float] = {}
    bb: dict[str, float] = {}
    for c in V12_ACTUAL_TFR_2024:
        if c == exclude:
            continue
        adj_cum = v16_adjusted_cumulative_exposure(c, 2024)
        bio_cap = v16_biological_capacity(adj_cum, c, 2024)
        behav = emf_behavioral_factor_v3(adj_cum)
        actual = V12_ACTUAL_TFR_2024[c]
        if bio_cap * behav > 0.001:
            cult = actual / (bio_cap * behav)
        else:
            cult = 0.80
        rates[c] = cult
        bb[c] = bio_cap * behav
    return rates, bb


def loocv_v16() -> dict:
    """Leave-one-out cross-validation for v16 model.

    For each country in the calibration set:
    1. Remove it from calibration
    2. Calibrate cultural rates from remaining countries
    3. Assign the mean cultural rate to the left-out country
    4. Predict its TFR = bioCap * behavioral * meanCulturalRate
    5. Compare to observed TFR

    Returns dict with per_country results, rmse, mae, max_error, bias, n.
    """
    countries = list(V12_ACTUAL_TFR_2024.keys())
    per_country: dict[str, dict] = {}

    for leave_out in countries:
        rates, bb = _calibrate_excluding(leave_out)
        mean_cult = sum(rates.values()) / len(rates)

        adj_cum = v16_adjusted_cumulative_exposure(leave_out, 2024)
        bio_cap = v16_biological_capacity(adj_cum, leave_out, 2024)
        behav = emf_behavioral_factor_v3(adj_cum)
        predicted = bio_cap * behav * mean_cult
        actual = V12_ACTUAL_TFR_2024[leave_out]
        error = predicted - actual

        per_country[leave_out] = {
            "predicted": predicted,
            "actual": actual,
            "error": error,
            "abs_error": abs(error),
            "bio_cap": bio_cap,
            "behavioral": behav,
            "assigned_cultural_rate": mean_cult,
            "bio_behav": bio_cap * behav,
        }

    errors = [r["error"] for r in per_country.values()]
    abs_errors = [r["abs_error"] for r in per_country.values()]
    n = len(errors)
    rmse = math.sqrt(sum(e ** 2 for e in errors) / n)
    mae = sum(abs_errors) / n
    bias = sum(errors) / n

    return {
        "per_country": per_country,
        "rmse": rmse,
        "mae": mae,
        "max_error": max(abs_errors),
        "bias": bias,
        "n": n,
    }


# === v17 Full extended report ===

def v17_full_report(country: str, year_range: range | None = None) -> dict:
    """Extended country diagnostics with time series and decomposition.

    Parameters
    ----------
    country : str
        Country name (must be in COUNTRY_PARAMS or V12_ACTUAL_TFR_2024).
    year_range : range, optional
        Years to generate time series for. Defaults to 2000-2050.

    Returns
    -------
    dict with:
        snapshot_2024: full v16_country_tfr for 2024
        time_series: list of {year, predicted_tfr, bio_cap, behavioral, cultural, ...}
        decomposition: attribution of TFR decline to each component
        cross_country: ranking among all calibrated countries
    """
    if not _v16_true_cultural_rates:
        calibrate_v16()

    if year_range is None:
        year_range = range(2000, 2051)

    snapshot = v16_country_tfr(country, 2024)

    ts = []
    for yr in year_range:
        adj_cum = v16_adjusted_cumulative_exposure(country, yr)
        bio_cap_val = v16_biological_capacity(adj_cum, country, yr)
        behav_val = emf_behavioral_factor_v3(adj_cum)
        cult_val = v16_true_cultural_rate(country, yr)
        pred = bio_cap_val * behav_val * cult_val

        f_male_val = v17_f_male(country, yr)
        f_female_val = v17_f_female(country, yr)

        ts.append({
            "year": yr,
            "predicted_tfr": pred,
            "adjusted_cumulative_exposure": adj_cum,
            "bio_cap": bio_cap_val,
            "behavioral": behav_val,
            "cultural": cult_val,
            "f_male": f_male_val,
            "f_female": f_female_val,
        })

    ref_year = max(yr for yr in year_range if yr <= 2010) if any(yr <= 2010 for yr in year_range) else min(year_range)
    ref_entry = next(e for e in ts if e["year"] == ref_year)
    latest_entry = next(e for e in ts if e["year"] == 2024) if 2024 in year_range else ts[-1]

    bio_change = latest_entry["bio_cap"] / ref_entry["bio_cap"] if ref_entry["bio_cap"] > 0 else 1.0
    behav_change = latest_entry["behavioral"] / ref_entry["behavioral"] if ref_entry["behavioral"] > 0 else 1.0
    cult_change = latest_entry["cultural"] / ref_entry["cultural"] if ref_entry["cultural"] > 0 else 1.0
    total_change = latest_entry["predicted_tfr"] / ref_entry["predicted_tfr"] if ref_entry["predicted_tfr"] > 0 else 1.0

    decomposition = {
        "reference_year": ref_year,
        "comparison_year": latest_entry["year"],
        "bio_cap_ratio": bio_change,
        "behavioral_ratio": behav_change,
        "cultural_ratio": cult_change,
        "total_ratio": total_change,
        "bio_cap_pct_change": (bio_change - 1) * 100,
        "behavioral_pct_change": (behav_change - 1) * 100,
        "cultural_pct_change": (cult_change - 1) * 100,
    }

    ranking = []
    for c in sorted(V12_ACTUAL_TFR_2024.keys()):
        adj_cum_c = v16_adjusted_cumulative_exposure(c, 2024)
        bio_cap_c = v16_biological_capacity(adj_cum_c, c, 2024)
        behav_c = emf_behavioral_factor_v3(adj_cum_c)
        pred_c = v16_predicted_tfr(c, 2024)
        ranking.append({
            "country": c,
            "predicted_tfr": pred_c,
            "actual_tfr": V12_ACTUAL_TFR_2024[c],
            "bio_cap": bio_cap_c,
            "behavioral": behav_c,
            "emf_effect": (6.5 - bio_cap_c * behav_c) / 6.5,
        })
    ranking.sort(key=lambda x: x["predicted_tfr"])

    return {
        "country": country,
        "snapshot_2024": snapshot,
        "time_series": ts,
        "decomposition": decomposition,
        "cross_country": ranking,
    }


# === Feedback amplification diagnostic ===


def feedback_amplification(country: str, year: int) -> dict:
    """Diagnostic: estimated feedback amplification for forecast years.

    For year <= 2024, returns amplification=1.0 (no feedback).
    For year > 2024, estimates urbanization-driven density multiplier
    based on projected TFR decline from 2024 baseline.

    DIAGNOSTIC_ONLY — does not change predict_tfr output.
    """
    if year <= 2024:
        return {
            "amplification": 1.0,
            "density_multiplier": 1.0,
            "urban_shift": 0.0,
            "tfr_decline_rate": 0.0,
        }

    if not _v16_true_cultural_rates:
        calibrate_v16()

    base_tfr = v16_predicted_tfr(country, 2024)
    current_tfr = v16_predicted_tfr(country, year)

    tfr_decline_rate = max(0.0, (base_tfr - current_tfr) / base_tfr)
    years_forward = year - 2024
    urban_shift = min(0.15, 0.003 * tfr_decline_rate * years_forward)
    density_mult = 1.0 + 0.5 * urban_shift
    amplification = density_mult

    return {
        "amplification": round(amplification, 6),
        "density_multiplier": round(density_mult, 6),
        "urban_shift": round(urban_shift, 6),
        "tfr_decline_rate": round(tfr_decline_rate, 6),
    }


# === Feedback loop simulation ===

_feedback_urban_overrides: dict[tuple[str, int], float] = {}
_feedback_density_overrides: dict[tuple[str, int], float] = {}


def _get_feedback_urban_frac(country: str, year: int) -> float:
    """Get urban fraction, with feedback override if available."""
    return _feedback_urban_overrides.get(
        (country, year),
        get_country_params(country).urban_frac,
    )


def feedback_loop_simulate(
    country: str,
    start_year: int = 2024,
    end_year: int = 2050,
) -> list[dict]:
    """Iterative feedback simulation: TFR↓ → urbanization↑ → density↑ → EMF↑ → TFR↓.

    Each year's TFR decline shifts population toward urban areas,
    increasing EMF exposure density. The feedback is small per year
    but compounds over decades.

    Parameters
    ----------
    country : Country name.
    start_year : First simulation year (must be >= calibration year 2024).
    end_year : Last simulation year.

    Returns list of dicts with year, predicted_tfr, feedback_tfr,
    urban_frac, density_multiplier, feedback_effect.
    """
    global _feedback_urban_overrides, _feedback_density_overrides

    if not _v16_true_cultural_rates:
        calibrate_v16()

    cp = get_country_params(country)
    base_urban = cp.urban_frac
    base_density = cp.pop_density

    results = []
    current_urban = base_urban
    current_tfr = v16_predicted_tfr(country, start_year)
    base_tfr = current_tfr

    for year in range(start_year, end_year + 1):
        no_feedback_tfr = v16_predicted_tfr(country, year)

        if year > start_year:
            tfr_decline_rate = max(0.0, (base_tfr - current_tfr) / base_tfr)
            urban_shift = 0.003 * tfr_decline_rate
            current_urban = min(0.98, current_urban + urban_shift)

        density_mult = 1.0 + 0.5 * max(0.0, current_urban - base_urban)

        _feedback_density_overrides[(country, year)] = density_mult

        feedback_tfr = no_feedback_tfr / density_mult
        current_tfr = feedback_tfr

        results.append({
            "year": year,
            "predicted_tfr": no_feedback_tfr,
            "feedback_tfr": feedback_tfr,
            "urban_frac": round(current_urban, 4),
            "density_multiplier": round(density_mult, 4),
            "feedback_effect": round(no_feedback_tfr - feedback_tfr, 4),
        })

    _feedback_urban_overrides.clear()
    _feedback_density_overrides.clear()

    return results
