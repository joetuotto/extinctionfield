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
    get_country_params,
)
from berm.exposure.ambient import get_attenuation_factor
from berm.biology.pathways import dysbiosis_index, pathway_f


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
    """Adjusted cumulative = weighted * occupational * cohort."""
    return (
        v17_weighted_cum_exposure(country, year)
        * occupational_emf_multiplier(country, year)
        * v17_cohort_adjustment(country, year)
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
    """Male biological capacity: base * dysbiosis * BBB * nutrition * epigenetic."""
    base_bio_cap = v11_biological_capacity(adj_cum_emf)
    emf_norm = min(1.0, adj_cum_emf / 100.0)
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


# === v16 True cultural rate with alpha compensation ===

_v16_true_cultural_rates: dict[str, float] = {}
_v16_bio_behav_2024: dict[str, float] = {}


def calibrate_v16() -> dict[str, float]:
    """Calibrate cultural rates from observed TFR 2024."""
    global _v16_true_cultural_rates, _v16_bio_behav_2024
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


# === v16 Prediction ===

def v16_predicted_tfr(country: str, year: int) -> float:
    """V16 predicted TFR = bioCap * behavioral * cultural."""
    adj_cum = v16_adjusted_cumulative_exposure(country, year)
    bio_cap = v16_biological_capacity(adj_cum, country, year)
    behav = emf_behavioral_factor_v3(adj_cum)
    cult = v16_true_cultural_rate(country, year)
    return bio_cap * behav * cult


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
    emf_norm = min(1.0, adj_cum / 100.0)

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
