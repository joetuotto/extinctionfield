"""V16/V17 extended model tests.

Verified against Wolfram LBERMv4Model_1.wl session v16verify.
All assertions match Wolfram output to machine precision.
"""

import math
import pytest

from berm.v16 import (
    chi,
    tech_diffusion_curve,
    cultural_tfr,
    smartphone_penetration,
    phone_body_contact_hours,
    earpod_penetration,
    wifi_penetration,
    iot_devices_per_household,
    v16_ambient_gen_mult,
    agriculture_share,
    service_share,
    remote_work_share,
    occupational_emf_multiplier,
    v16_ambient_annual,
    v16_personal_annual,
    v17_layer_retention,
    v17_cohort_adjustment,
    v17_weighted_cum_exposure,
    v16_adjusted_cumulative_exposure,
    v17_night_fraction,
    v17_cry_effect,
    v17_melatonin_suppression,
    v17_ovulation_vgic,
    v17_sperm_ca2_fecundity,
    v11_biological_capacity,
    v12_nutrition_modifier,
    v16_epigenetic_factor,
    v17_male_bio_cap,
    v16_biological_capacity,
    v17_f_male,
    v17_f_female,
    emf_behavioral_factor_v3,
    calibrate_v16,
    v16_true_cultural_rate,
    v16_predicted_tfr,
    v16_country_tfr,
    v17_predicted_sex_ratio,
    loocv_v16,
    v17_full_report,
    # v17 new functions
    biological_tfr,
    observed_from_biological,
    ivf_share_projected,
    native_tfr,
    immigration_buffer,
    immigrant_generation_tfr,
    predict_tfr_extended,
    vulnerability_by_age,
    cohort_weighted_exposure,
    ddd_to_prevalence,
    endogenous_ssri_model,
    sempou_mtor_effect,
    PHARM_VALIDATION,
    feedback_loop_simulate,
    feedback_amplification,
    vagal_oxytocin_pathway,
    oxytocin_dual_pathway_diagnostic,
    behavioral_quadruple_suppression,
    SOCIAL_SCIENCE_PROXY_MAP,
)
from berm.biology.pathways import l_reuteri_oxytocin_pathway
from berm.config import BIO_CAPACITY_SLOPE


@pytest.fixture(autouse=True)
def _calibrate():
    calibrate_v16()


# === Bio-calibrated predictions (v16_predicted_tfr outputs biological TFR) ===
# Calibration target: observed_TFR × (1 - IVF_share)

BIO_PREDICTIONS = [
    ("SouthKorea", 2024, 0.6549275392671918),
    ("Japan", 2024, 1.0976806302192161),
    ("Finland", 2024, 1.2224588346121685),
    ("USA", 2024, 1.588712201896173),
    ("Nigeria", 2024, 5.146896136243353),
    ("Denmark", 2024, 1.3635684836571151),
    ("India", 2024, 1.98587371691445),
    ("Iran", 2024, 2.1299996313876504),
    ("Brazil", 2024, 1.6181012245632926),
    ("China", 2024, 1.0503690507509063),
    ("Ethiopia", 2024, 4.0921744328353675),
    ("SouthKorea", 2030, 0.5347197130358514),
    ("Japan", 2030, 0.9023359845906637),
    ("Finland", 2030, 0.9957901347994496),
    ("USA", 2030, 1.280362451983669),
    ("Nigeria", 2030, 4.778841741087077),
    ("Niger", 2030, 6.474795895468166),
]


@pytest.mark.parametrize("country,year,expected", BIO_PREDICTIONS)
def test_bio_calibrated_prediction(country, year, expected):
    result = v16_predicted_tfr(country, year)
    assert abs(result - expected) < 1e-6, (
        f"{country} {year}: {result:.10f} vs expected {expected:.10f}"
    )


# === Wolfram-verified intermediates for Korea 2024 ===

def test_korea_ambient_annual():
    assert abs(v16_ambient_annual("SouthKorea", 2024) - 4.015166827136581) < 1e-8

def test_korea_personal_annual():
    assert abs(v16_personal_annual("SouthKorea", 2024) - 2.0910266331815337) < 1e-8

def test_korea_adj_cum():
    assert abs(v16_adjusted_cumulative_exposure("SouthKorea", 2024) - 36.568822004312075) < 1e-6

def test_korea_bio_cap():
    adj = v16_adjusted_cumulative_exposure("SouthKorea", 2024)
    bio = v16_biological_capacity(adj, "SouthKorea", 2024)
    assert abs(bio - 3.6724358277584916) < 1e-6

def test_korea_behavioral():
    adj = v16_adjusted_cumulative_exposure("SouthKorea", 2024)
    beh = emf_behavioral_factor_v3(adj)
    assert abs(beh - 0.6605037273917392) < 1e-8


# === Wolfram-verified component values for Korea 2024 ===

def test_korea_cry_effect():
    assert abs(v17_cry_effect("SouthKorea", 2024) - 0.9558176956782213) < 1e-8

def test_korea_melatonin():
    assert abs(v17_melatonin_suppression("SouthKorea", 2024) - 0.9668632717586659) < 1e-8

def test_korea_sperm_ca2():
    assert abs(v17_sperm_ca2_fecundity("SouthKorea", 2024) - 0.9629748803021638) < 1e-8

def test_korea_ovulation_vgic():
    assert abs(v17_ovulation_vgic("SouthKorea", 2024) - 0.9837676491534563) < 1e-8

def test_korea_epigenetic():
    assert abs(v16_epigenetic_factor("SouthKorea", 2024) - 0.9615950737421349) < 1e-8

def test_korea_bbb_modifier():
    r = v16_country_tfr("SouthKorea", 2024)
    assert abs(r["bbb_modifier"] - 0.9145904798736132) < 1e-8

def test_korea_dysbiosis_modifier():
    r = v16_country_tfr("SouthKorea", 2024)
    assert abs(r["dysbiosis_modifier"] - 0.9582673270660116) < 1e-8

def test_korea_sex_ratio():
    assert abs(v17_predicted_sex_ratio("SouthKorea", 2024) - 0.5098058706797413) < 1e-8

def test_korea_cohort_adj():
    assert abs(v17_cohort_adjustment("SouthKorea", 2024) - 1.2) < 1e-8

def test_korea_f_male():
    assert abs(v17_f_male("SouthKorea", 2024) - 4.0394436039899615) < 1e-6

def test_korea_f_female():
    assert abs(v17_f_female("SouthKorea", 2024) - 0.9091439781783418) < 1e-8


# === V16 Verification assertions (from Wolfram v16Verification) ===

def test_v16c_korea_accuracy():
    bio_tfr = v16_predicted_tfr("SouthKorea", 2024)
    assert abs(bio_tfr - 0.655) < 0.05

def test_v16d_nigeria_above_3():
    assert v16_predicted_tfr("Nigeria", 2024) > 3.0

def test_v16e_niger_above_6():
    assert v16_predicted_tfr("Niger", 2024) > 6.0

def test_v16j_occ_niger_lower():
    assert occupational_emf_multiplier("Niger", 2024) < occupational_emf_multiplier("USA", 2024)

def test_v16k_adj_cum_korea_higher():
    assert (v16_adjusted_cumulative_exposure("SouthKorea", 2024) >
            v16_adjusted_cumulative_exposure("Nigeria", 2024))

def test_v16m_bbb_reduces():
    r = v16_country_tfr("SouthKorea", 2024)
    assert r["bbb_modifier"] < 1.0

def test_v16n_dysbiosis_reduces():
    r = v16_country_tfr("SouthKorea", 2024)
    assert r["dysbiosis_modifier"] < 1.0

def test_v16o_epigenetic_reduces():
    r = v16_country_tfr("SouthKorea", 2024)
    assert r["epigenetic_factor"] < 1.0

def test_v16p_bio_cap_positive():
    r = v16_country_tfr("SouthKorea", 2024)
    assert r["adjusted_bio_cap"] > 0

def test_v16q_behav_decreases():
    assert emf_behavioral_factor_v3(70) < emf_behavioral_factor_v3(30)

def test_v16r_behav_floor():
    assert emf_behavioral_factor_v3(500) == 0.1

def test_v16s_dominant_suppression():
    r = v16_country_tfr("SouthKorea", 2024)
    assert r["dominant_suppression"] == "Testosterone(HPA-suppressed)"

def test_v16t_cultural_time_dependent():
    assert (v16_true_cultural_rate("SouthKorea", 2000) !=
            v16_true_cultural_rate("SouthKorea", 2024))

def test_v16v_cultural_rates_reasonable():
    from berm.v16 import _v16_true_cultural_rates
    for c, rate in _v16_true_cultural_rates.items():
        assert 0.05 < rate < 2.50, f"{c}: rate {rate} out of bounds"

def test_v16w_native_below_predicted():
    r = v16_country_tfr("SouthKorea", 2024)
    assert r["native_tfr"] < r["predicted_tfr"]

def test_v16x_high_emf_low_tfr():
    assert v16_predicted_tfr("SouthKorea", 2024) < v16_predicted_tfr("Niger", 2024)

def test_v16y_all_bio_behav_below_baseline():
    from berm.data.countries import V12_ACTUAL_TFR_2024
    for c in V12_ACTUAL_TFR_2024:
        adj = v16_adjusted_cumulative_exposure(c, 2024)
        bb = v16_biological_capacity(adj, c, 2024) * emf_behavioral_factor_v3(adj)
        assert bb < 6.5, f"{c}: bioBehav {bb} >= 6.5"


# === V17-specific assertions ===

def test_v17a_male_female_decomposition():
    r = v16_country_tfr("SouthKorea", 2024)
    assert "male_bio_cap" in r
    assert "female_fertility" in r

def test_v17b_f_couple_consistent():
    r = v16_country_tfr("SouthKorea", 2024)
    assert abs(r["f_couple"] - r["f_male"] * r["f_female"]) < 0.001

def test_v17d_melatonin_active():
    r = v16_country_tfr("SouthKorea", 2024)
    assert r["melatonin_suppression"] < 1.0

def test_v17e_sex_ratio_shift():
    r = v16_country_tfr("SouthKorea", 2024)
    assert r["predicted_sex_ratio"] < 0.512

def test_v17g_hpa_suppression_active():
    r = v16_country_tfr("SouthKorea", 2024)
    assert r["effective_testosterone"] < r["testosterone_retention"]

def test_v17h_alpha_is_043():
    r = v16_country_tfr("SouthKorea", 2024)
    assert r["effective_alpha"] == 0.43

def test_v17i_sperm_ca2_active():
    r = v16_country_tfr("SouthKorea", 2024)
    assert r["sperm_ca2_fecundity"] < 1.0

def test_v17j_ovulation_vgic_active():
    r = v16_country_tfr("SouthKorea", 2024)
    assert r["ovulation_vgic"] < 1.0


# === chi function properties ===

def test_chi_zero():
    assert chi(0.0) == 0.0

def test_chi_large_saturates():
    assert abs(chi(100.0) - 1.0) < 0.001

def test_chi_monotonic():
    for a in [0.0, 0.1, 0.5, 1.0, 2.0]:
        assert chi(a + 0.1) > chi(a)


# === Leaf function properties ===

def test_smartphone_pen_bounded():
    for c in ["SouthKorea", "Niger"]:
        for y in [2000, 2010, 2024, 2035]:
            p = smartphone_penetration(c, y)
            assert 0.0 <= p <= 1.0

def test_earpod_zero_before_2016():
    assert earpod_penetration("USA", 2015) == 0.0

def test_iot_zero_before_2014():
    assert iot_devices_per_household("USA", 2013) == 0.0

def test_phone_hours_clipped():
    assert phone_body_contact_hours(2030) <= 18.0
    assert phone_body_contact_hours(1990) >= 0.0


# === Layer retention ===

def test_layer_retention_zero_delta():
    assert abs(v17_layer_retention(0) - 1.0) < 1e-10

def test_layer_retention_decreases():
    assert v17_layer_retention(10) < v17_layer_retention(0)

def test_layer_retention_asymptote():
    ret = v17_layer_retention(1000)
    assert ret > 0.14  # neuron weight (alpha=0) never recovers


# === v11 bio cap ===

def test_v11_below_threshold():
    assert v11_biological_capacity(3.0) == 6.5

def test_v11_above_threshold():
    assert v11_biological_capacity(10.0) < 6.5

def test_v11_positive():
    assert v11_biological_capacity(100.0) > 0


# === All countries produce valid predictions ===

def test_all_countries_predict():
    from berm.data.countries import V12_ACTUAL_TFR_2024
    for c in V12_ACTUAL_TFR_2024:
        tfr = v16_predicted_tfr(c, 2024)
        assert 0.0 < tfr < 10.0, f"{c}: {tfr}"


def test_all_countries_2030():
    from berm.data.countries import V12_ACTUAL_TFR_2024
    for c in V12_ACTUAL_TFR_2024:
        tfr = v16_predicted_tfr(c, 2030)
        assert 0.0 < tfr < 10.0, f"{c}: {tfr}"


# === LOOCV cross-validation tests ===

def test_loocv_returns_all_countries():
    from berm.data.countries import V12_ACTUAL_TFR_2024
    result = loocv_v16()
    assert result["n"] == len(V12_ACTUAL_TFR_2024)
    assert set(result["per_country"].keys()) == set(V12_ACTUAL_TFR_2024.keys())


def test_loocv_metrics_positive():
    result = loocv_v16()
    assert result["rmse"] > 0
    assert result["mae"] > 0
    assert result["max_error"] > 0


def test_loocv_rmse_ge_mae():
    result = loocv_v16()
    assert result["rmse"] >= result["mae"]


def test_loocv_per_country_structure():
    result = loocv_v16()
    for c, r in result["per_country"].items():
        assert "predicted" in r
        assert "actual" in r
        assert "error" in r
        assert "abs_error" in r
        assert "bio_cap" in r
        assert "behavioral" in r
        assert "assigned_cultural_rate" in r
        assert r["abs_error"] == pytest.approx(abs(r["error"]))
        assert r["error"] == pytest.approx(r["predicted"] - r["actual"])


def test_loocv_predictions_positive():
    result = loocv_v16()
    for c, r in result["per_country"].items():
        assert r["predicted"] > 0, f"{c}: predicted={r['predicted']}"
        assert r["actual"] > 0, f"{c}: actual={r['actual']}"


def test_loocv_developed_countries_reasonable():
    """Developed countries with similar demographic regimes should have LOOCV error < 1.0."""
    result = loocv_v16()
    developed = ["Finland", "Sweden", "Norway", "Denmark", "Germany",
                 "France", "Japan", "Australia", "Canada"]
    for c in developed:
        assert result["per_country"][c]["abs_error"] < 1.0, (
            f"{c}: abs_error={result['per_country'][c]['abs_error']:.3f}"
        )


def test_loocv_bias_bounded():
    result = loocv_v16()
    assert abs(result["bias"]) < 1.0


# === v17 Full Report tests ===

def test_v17_full_report_structure():
    r = v17_full_report("Finland")
    assert r["country"] == "Finland"
    assert "snapshot_2024" in r
    assert "time_series" in r
    assert "decomposition" in r
    assert "cross_country" in r


def test_v17_full_report_snapshot_matches():
    r = v17_full_report("Finland")
    direct = v16_country_tfr("Finland", 2024)
    assert r["snapshot_2024"]["predicted_tfr"] == pytest.approx(
        direct["predicted_tfr"])


def test_v17_full_report_time_series_length():
    r = v17_full_report("Finland")
    assert len(r["time_series"]) == 51
    assert r["time_series"][0]["year"] == 2000
    assert r["time_series"][-1]["year"] == 2050


def test_v17_full_report_custom_range():
    r = v17_full_report("Finland", year_range=range(2020, 2031))
    assert len(r["time_series"]) == 11
    assert r["time_series"][0]["year"] == 2020
    assert r["time_series"][-1]["year"] == 2030


def test_v17_full_report_time_series_fields():
    r = v17_full_report("Finland")
    for entry in r["time_series"]:
        assert "year" in entry
        assert "predicted_tfr" in entry
        assert "bio_cap" in entry
        assert "behavioral" in entry
        assert "cultural" in entry
        assert "f_male" in entry
        assert "f_female" in entry
        assert entry["predicted_tfr"] > 0


def test_v17_full_report_decomposition():
    r = v17_full_report("Finland")
    d = r["decomposition"]
    assert d["reference_year"] == 2010
    assert d["comparison_year"] == 2024
    assert d["bio_cap_pct_change"] < 0
    assert d["behavioral_pct_change"] < 0


def test_v17_full_report_cross_country_all_present():
    from berm.data.countries import V12_ACTUAL_TFR_2024
    r = v17_full_report("Finland")
    countries_in_ranking = {e["country"] for e in r["cross_country"]}
    assert countries_in_ranking == set(V12_ACTUAL_TFR_2024.keys())


def test_v17_full_report_cross_country_sorted():
    r = v17_full_report("Finland")
    tfrs = [e["predicted_tfr"] for e in r["cross_country"]]
    assert tfrs == sorted(tfrs)


def test_v17_full_report_tfr_declines_over_time():
    """TFR should generally decline from 2000 to 2050 for high-EMF countries."""
    r = v17_full_report("SouthKorea")
    tfr_2000 = r["time_series"][0]["predicted_tfr"]
    tfr_2050 = r["time_series"][-1]["predicted_tfr"]
    assert tfr_2050 < tfr_2000


def test_v17_full_report_multiple_countries():
    for c in ["SouthKorea", "USA", "Nigeria", "India"]:
        r = v17_full_report(c)
        assert r["country"] == c
        assert len(r["time_series"]) == 51
        assert r["snapshot_2024"]["predicted_tfr"] > 0


# === v17 TFR interpretation layer ===

def test_biological_tfr_reduces():
    assert biological_tfr(1.5, 0.05) < 1.5

def test_biological_tfr_zero_ivf():
    assert biological_tfr(1.5, 0.0) == 1.5

def test_biological_tfr_bounded():
    assert biological_tfr(1.5, 0.20) > 0

def test_biological_tfr_formula():
    assert biological_tfr(1.55, 0.12) == pytest.approx(1.55 * 0.88, abs=1e-10)

def test_native_tfr_basic():
    nat = native_tfr(1.50, 2.0, 0.20)
    assert nat < 1.50

def test_native_tfr_zero_immigration():
    assert native_tfr(1.50, 2.0, 0.0) == 1.50

def test_native_tfr_full_immigration():
    assert native_tfr(1.50, 2.0, 1.0) == 1.50

def test_immigration_buffer_with_data():
    buf = immigration_buffer("Finland", 1.32)
    assert buf["country"] == "Finland"
    assert buf["native_tfr"] < 1.32
    assert buf["buffer"] > 0
    assert buf["buffer_pct"] > 0
    assert buf["immigrant_share"] > 0

def test_immigration_buffer_no_data():
    buf = immigration_buffer("Niger", 6.80)
    assert buf["buffer"] == 0.0
    assert buf["native_tfr"] == 6.80

def test_immigrant_generation_tfr_g1():
    g1 = immigrant_generation_tfr(0.1, 0.5, "G1", 10)
    assert 0 < g1 < 6.0

def test_immigrant_generation_tfr_g2_lower():
    g2 = immigrant_generation_tfr(0.1, 0.5, "G2")
    g1 = immigrant_generation_tfr(0.1, 0.5, "G1", 10)
    assert g2 < g1

def test_immigrant_generation_tfr_g3_lowest():
    g3 = immigrant_generation_tfr(0.1, 0.5, "G3")
    g2 = immigrant_generation_tfr(0.1, 0.5, "G2")
    assert g3 < g2


# === predict_tfr_extended ===

def test_predict_tfr_extended_structure():
    r = predict_tfr_extended("Finland", 2024)
    assert "predicted_tfr" in r
    assert "biological_tfr" in r
    assert "observed_tfr" in r
    assert "ivf_share" in r
    assert "ivf_contribution" in r
    assert "native_tfr" in r
    assert "immigration_buffer" in r
    assert "immigration_buffer_pct" in r

def test_predict_tfr_extended_bio_matches_core():
    ext = predict_tfr_extended("Finland", 2024)
    bio = v16_predicted_tfr("Finland", 2024)
    assert ext["biological_tfr"] == pytest.approx(bio, abs=0.01)

def test_predict_tfr_extended_observed_higher():
    r = predict_tfr_extended("Finland", 2024)
    assert r["observed_tfr"] > r["biological_tfr"]

def test_predict_tfr_extended_ivf_positive():
    r = predict_tfr_extended("Denmark", 2024)
    assert r["ivf_contribution"] > 0

def test_predict_tfr_extended_bio_lower():
    r = predict_tfr_extended("Finland", 2024)
    assert r["biological_tfr"] < r["predicted_tfr"]

def test_predict_tfr_extended_all_countries():
    from berm.data.countries import V12_ACTUAL_TFR_2024
    for c in V12_ACTUAL_TFR_2024:
        r = predict_tfr_extended(c, 2024)
        assert r["predicted_tfr"] > 0
        assert r["biological_tfr"] <= r["predicted_tfr"]


# === vulnerability_by_age ===

def test_vulnerability_fetal_highest():
    assert vulnerability_by_age(-0.5) == 5.0

def test_vulnerability_infant():
    assert vulnerability_by_age(1) == 4.0

def test_vulnerability_child():
    assert vulnerability_by_age(4) == 3.0

def test_vulnerability_adolescent():
    assert vulnerability_by_age(15) == 2.0

def test_vulnerability_adult():
    assert vulnerability_by_age(25) == 1.0

def test_vulnerability_decreasing():
    ages = [-0.5, 1, 4, 8, 15, 25]
    vulns = [vulnerability_by_age(a) for a in ages]
    for i in range(len(vulns) - 1):
        assert vulns[i] >= vulns[i + 1]


# === cohort_weighted_exposure ===

def test_cohort_weighted_positive():
    cwe = cohort_weighted_exposure("SouthKorea", 2024)
    assert cwe > 0

def test_cohort_weighted_higher_than_raw():
    from berm.v16 import v16_two_channel_cum_exposure
    cwe = cohort_weighted_exposure("SouthKorea", 2024)
    raw = v16_two_channel_cum_exposure("SouthKorea", 2024)
    assert cwe > raw


# === SSRI model ===

def test_endogenous_ssri_model_structure():
    from berm.v16 import v16_adjusted_cumulative_exposure
    cum = v16_adjusted_cumulative_exposure("Finland", 2024)
    r = endogenous_ssri_model("Finland", 2024, cum)
    assert r["is_endogenous"] is True
    assert r["ssri_prevalence"] > 0
    assert r["ssri_mediated_fertility_loss"] > 0
    assert r["ddd_per_1000"] > 0

def test_ssri_model_low_emf_low_effect():
    r_low = endogenous_ssri_model("Niger", 2024, 2.0)
    r_high = endogenous_ssri_model("Finland", 2024, 40.0)
    assert r_low["ssri_mediated_fertility_loss"] < r_high["ssri_mediated_fertility_loss"]

def test_ddd_to_prevalence():
    assert ddd_to_prevalence(100) == 0.1
    assert ddd_to_prevalence(0) == 0.0


# === Sempou mTOR ===

def test_sempou_mtor_effect_structure():
    r = sempou_mtor_effect(0.5)
    assert "mtor_activation" in r
    assert "differentiation_efficiency" in r
    assert "sperm_production_multiplier" in r
    assert r["differentiation_efficiency"] < 1.0

def test_sempou_mtor_zero_perturbation():
    r = sempou_mtor_effect(0.0)
    assert r["mtor_activation"] == 1.0
    assert r["differentiation_efficiency"] == 1.0

def test_sempou_mtor_higher_perturbation_lower_efficiency():
    r_low = sempou_mtor_effect(0.2)
    r_high = sempou_mtor_effect(0.8)
    assert r_high["differentiation_efficiency"] < r_low["differentiation_efficiency"]


# === Pharmacological validation matrix ===

def test_pharm_validation_keys():
    assert "CCB" in PHARM_VALIDATION
    assert "rapamycin" in PHARM_VALIDATION
    assert "SSRI" in PHARM_VALIDATION
    assert "melatonin" in PHARM_VALIDATION
    assert "metformin" in PHARM_VALIDATION

def test_pharm_validation_structure():
    for drug, info in PHARM_VALIDATION.items():
        assert "pathway" in info
        assert "drug_effect" in info
        assert "emf_equivalent" in info
        assert "rescue_test" in info
        assert "status" in info


# === Feedback loop ===

def test_feedback_loop_simulate_structure():
    results = feedback_loop_simulate("Finland", 2024, 2030)
    assert len(results) == 7
    for r in results:
        assert "year" in r
        assert "predicted_tfr" in r
        assert "feedback_tfr" in r
        assert "urban_frac" in r
        assert "density_multiplier" in r

def test_feedback_loop_feedback_lowers_tfr():
    results = feedback_loop_simulate("SouthKorea", 2024, 2035)
    for r in results:
        assert r["feedback_tfr"] <= r["predicted_tfr"] + 0.001


# === Bio-calibrated predictions stable after IVF integration ===

@pytest.mark.parametrize("country,year,expected", [
    ("SouthKorea", 2024, 0.6549275392671918),
    ("Japan", 2024, 1.0976806302192161),
    ("Finland", 2024, 1.2224588346121685),
    ("USA", 2024, 1.588712201896173),
    ("Nigeria", 2024, 5.146896136243353),
    ("Niger", 2030, 6.474795895468166),
])
def test_predictions_stable_after_ivf_integration(country, year, expected):
    """Post-IVF integration: calibration targets biological TFR."""
    result = v16_predicted_tfr(country, year)
    assert abs(result - expected) < 1e-6


# === Feedback amplification diagnostic (Erä 4.3a) ===

def test_feedback_amplification_2024_neutral():
    r = feedback_amplification("Finland", 2024)
    assert r["amplification"] == 1.0
    assert r["density_multiplier"] == 1.0
    assert r["urban_shift"] == 0.0

def test_feedback_amplification_forecast_structure():
    r = feedback_amplification("SouthKorea", 2030)
    assert "amplification" in r
    assert "density_multiplier" in r
    assert "urban_shift" in r
    assert "tfr_decline_rate" in r

def test_feedback_amplification_forecast_positive():
    r = feedback_amplification("SouthKorea", 2035)
    assert r["amplification"] >= 1.0
    assert r["urban_shift"] >= 0.0
    assert r["tfr_decline_rate"] >= 0.0

def test_feedback_amplification_higher_future():
    r2030 = feedback_amplification("SouthKorea", 2030)
    r2040 = feedback_amplification("SouthKorea", 2040)
    assert r2040["amplification"] >= r2030["amplification"]

def test_feedback_amplification_in_report():
    r = v16_country_tfr("SouthKorea", 2030)
    assert "feedback_amplification" in r
    fa = r["feedback_amplification"]
    assert fa["amplification"] >= 1.0

def test_feedback_amplification_no_tfr_change():
    """Diagnostic only — predictions unchanged."""
    assert abs(v16_predicted_tfr("SouthKorea", 2024) - 0.6549275392671918) < 1e-6


# === T1: CatSper fertilization cascade ===

def test_cascade_structure():
    from berm.biology.fertilization_cascade import cascade_fertilization_prob
    r = cascade_fertilization_prob(0.5)
    assert "stages" in r
    assert len(r["stages"]) == 6
    assert "cascade_product" in r
    assert "adjusted_fert_prob" in r

def test_cascade_zero_emf():
    from berm.biology.fertilization_cascade import cascade_fertilization_prob
    r = cascade_fertilization_prob(0.0)
    assert r["cascade_product"] == 1.0
    assert r["adjusted_fert_prob"] == 0.25

def test_cascade_high_emf_reduces():
    from berm.biology.fertilization_cascade import cascade_fertilization_prob
    r_low = cascade_fertilization_prob(0.1)
    r_high = cascade_fertilization_prob(0.9)
    assert r_high["adjusted_fert_prob"] < r_low["adjusted_fert_prob"]

def test_cascade_country_diagnostic():
    from berm.biology.fertilization_cascade import cascade_country_diagnostic
    r = cascade_country_diagnostic(0.7)
    assert "annual_fert_prob" in r
    assert 0 < r["annual_fert_prob"] < 1.0


# === T2: Multi-source interference ===

def test_interference_default():
    from berm.exposure.interference import interference_multiplier
    r = interference_multiplier()
    assert r["multiplier"] >= 1.0
    assert r["n_sources"] == 4

def test_interference_single_source():
    from berm.exposure.interference import interference_multiplier
    r = interference_multiplier(["wifi_2g"])
    assert r["multiplier"] == 1.0

def test_interference_more_sources_higher():
    from berm.exposure.interference import interference_multiplier
    r2 = interference_multiplier(["cellular_data", "wifi_2g"])
    r4 = interference_multiplier(["cellular_data", "wifi_2g", "bluetooth", "base_station"])
    assert r4["multiplier"] >= r2["multiplier"]

def test_interference_coherence():
    from berm.exposure.interference import frequency_coherence
    same_freq = frequency_coherence(2.4, 2.4)
    diff_freq = frequency_coherence(0.9, 5.0)
    assert same_freq > diff_freq
    assert abs(same_freq - 1.0) < 1e-10


# === T3: Housing EMF factor ===

def test_housing_factor_structure():
    from berm.exposure.housing import housing_emf_factor
    r = housing_emf_factor("SouthKorea")
    assert "net_housing_factor" in r
    assert "outdoor_attenuation" in r
    assert "indoor_source_density" in r

def test_housing_korea_vs_niger():
    from berm.exposure.housing import housing_emf_factor
    rk = housing_emf_factor("SouthKorea")
    rn = housing_emf_factor("Niger")
    assert rk["indoor_source_density"] > rn["indoor_source_density"]

def test_housing_comparison():
    from berm.exposure.housing import housing_comparison
    results = housing_comparison()
    assert len(results) >= 5
    assert all("net_factor" in r for r in results)

def test_housing_unknown_country():
    from berm.exposure.housing import housing_emf_factor
    r = housing_emf_factor("UnknownCountry")
    assert r["net_housing_factor"] > 0


# === L. reuteri oxytocin pathway (Pathway E extension) ===

def test_l_reuteri_structure():
    r = l_reuteri_oxytocin_pathway(0.5)
    assert "l_reuteri_level" in r
    assert "ot_microbiome_fraction" in r
    assert "t_microbiome_fraction" in r
    assert "sperm_microbiome_fraction" in r

def test_l_reuteri_zero_emf():
    r = l_reuteri_oxytocin_pathway(0.0)
    assert r["l_reuteri_level"] == 1.0
    assert r["ot_microbiome_fraction"] == 1.0

def test_l_reuteri_high_emf_reduces():
    r_low = l_reuteri_oxytocin_pathway(0.1)
    r_high = l_reuteri_oxytocin_pathway(0.9)
    assert r_high["ot_microbiome_fraction"] < r_low["ot_microbiome_fraction"]
    assert r_high["t_microbiome_fraction"] < r_low["t_microbiome_fraction"]

def test_l_reuteri_bounded():
    r = l_reuteri_oxytocin_pathway(1.0)
    assert r["ot_microbiome_fraction"] >= 0.3
    assert r["t_microbiome_fraction"] >= 0.5


# === Vagal oxytocin pathway (Pathway D extension) ===

def test_vagal_structure():
    r = vagal_oxytocin_pathway(20.0, 3.0)
    assert "cortisol_elevation" in r
    assert "vagal_tone" in r
    assert "ot_vagal_fraction" in r
    assert "chronic_hpa_load" in r
    assert "selye_phase" in r

def test_vagal_zero_emf():
    r = vagal_oxytocin_pathway(0.0, 0.0)
    assert r["cortisol_elevation"] == 1.0
    assert r["vagal_tone"] == 1.0
    assert r["ot_vagal_fraction"] == 1.0

def test_vagal_high_emf_reduces_ot():
    r_low = vagal_oxytocin_pathway(5.0, 1.0)
    r_high = vagal_oxytocin_pathway(30.0, 5.0)
    assert r_high["ot_vagal_fraction"] < r_low["ot_vagal_fraction"]

def test_vagal_selye_phases():
    r_early = vagal_oxytocin_pathway(5.0, 2.0)
    r_late = vagal_oxytocin_pathway(100.0, 5.0)
    assert r_early["selye_phase"] == "resistance"
    assert r_late["selye_phase"] == "exhaustion"


# === Dual OT pathway diagnostic ===

def test_dual_ot_structure():
    r = oxytocin_dual_pathway_diagnostic("SouthKorea", 2024, 29.0, 5.8)
    assert "model_ot" in r
    assert "diagnostic_ot" in r
    assert "vagal_contribution" in r
    assert "microbiome_contribution" in r
    assert "convergence_note" in r

def test_dual_ot_model_matches_behavioral():
    import math
    cum = 29.0
    r = oxytocin_dual_pathway_diagnostic("SouthKorea", 2024, cum, 5.8)
    expected_ot = math.exp(-0.010 * cum)
    assert abs(r["model_ot"] - round(expected_ot, 4)) < 1e-4

def test_dual_ot_in_report():
    r = v16_country_tfr("SouthKorea", 2024)
    assert "ot_dual_pathway" in r
    assert "l_reuteri_pathway" in r
    assert "vagal_pathway" in r

def test_dual_ot_no_tfr_change():
    """OT diagnostics must not change predictions."""
    assert abs(v16_predicted_tfr("SouthKorea", 2024) - 0.6549275392671918) < 1e-6
    assert abs(v16_predicted_tfr("Finland", 2024) - 1.2224588346121685) < 1e-6


# === Quadruple behavioral suppression diagnostic ===

def test_quad_suppression_structure():
    r = behavioral_quadruple_suppression("SouthKorea", 2024, 29.0, 5.8)
    assert "p_approach" in r
    assert "p_attraction" in r
    assert "p_sex" in r
    assert "p_fertilization" in r
    assert "p_total" in r
    assert "model_behav" in r
    assert "hormonal_state" in r
    assert "social_science_proxy_map" in r
    assert "sources" in r
    assert "uncertainty" in r
    assert "dual_hormone_note" in r
    assert "pronatalist_failure_explanation" in r


def test_quad_suppression_probabilities_bounded():
    r = behavioral_quadruple_suppression("SouthKorea", 2024, 29.0, 5.8)
    for key in ("p_approach", "p_attraction", "p_sex", "p_fertilization"):
        assert 0 < r[key] <= 1.0, f"{key}={r[key]}"


def test_quad_suppression_total_is_product():
    r = behavioral_quadruple_suppression("SouthKorea", 2024, 29.0, 5.8)
    product = r["p_approach"] * r["p_attraction"] * r["p_sex"] * r["p_fertilization"]
    assert abs(r["p_total"] - round(product, 4)) < 0.001


def test_quad_suppression_higher_emf_lower_probabilities():
    r_low = behavioral_quadruple_suppression("Niger", 2024, 5.0, 2.0)
    r_high = behavioral_quadruple_suppression("SouthKorea", 2024, 29.0, 5.8)
    assert r_high["p_approach"] < r_low["p_approach"]
    assert r_high["p_attraction"] < r_low["p_attraction"]
    assert r_high["p_sex"] < r_low["p_sex"]
    assert r_high["p_fertilization"] < r_low["p_fertilization"]


def test_quad_suppression_zero_emf():
    r = behavioral_quadruple_suppression("Niger", 2024, 0.0, 0.0)
    assert abs(r["p_approach"] - 1.0) < 0.01
    assert abs(r["p_attraction"] - 1.0) < 0.01
    assert abs(r["p_sex"] - 1.0) < 0.01
    assert abs(r["p_fertilization"] - 1.0) < 0.01


def test_quad_suppression_hormonal_state():
    r = behavioral_quadruple_suppression("SouthKorea", 2024, 29.0, 5.8)
    hs = r["hormonal_state"]
    assert 0 < hs["oxytocin"] < 1.0
    assert 0 < hs["testosterone"] < 1.0
    assert 0 < hs["dopamine"] < 1.0
    assert hs["cortisol_elevation"] > 1.0
    assert hs["cortisol_suppression"] < 1.0


def test_quad_suppression_social_science_map():
    r = behavioral_quadruple_suppression("SouthKorea", 2024, 29.0, 5.8)
    ssm = r["social_science_proxy_map"]
    assert "men_dont_commit" in ssm
    assert "women_too_picky" in ssm
    assert "couples_too_busy" in ssm
    assert "infertility_rising" in ssm


def test_quad_suppression_in_report():
    r = v16_country_tfr("SouthKorea", 2024)
    assert "quadruple_suppression" in r
    assert "social_science_proxy_map" in r
    qs = r["quadruple_suppression"]
    assert 0 < qs["p_total"] < 1.0


def test_quad_suppression_no_tfr_change():
    """Diagnostic only: predictions unchanged."""
    assert abs(v16_predicted_tfr("SouthKorea", 2024) - 0.6549275392671918) < 1e-6
    assert abs(v16_predicted_tfr("Finland", 2024) - 1.2224588346121685) < 1e-6


def test_social_science_proxy_map_structure():
    assert "men_dont_commit" in SOCIAL_SCIENCE_PROXY_MAP
    assert "women_too_picky" in SOCIAL_SCIENCE_PROXY_MAP
    assert "couples_too_busy" in SOCIAL_SCIENCE_PROXY_MAP
    assert "infertility_rising" in SOCIAL_SCIENCE_PROXY_MAP
    assert "career_over_kids" in SOCIAL_SCIENCE_PROXY_MAP
    for key, entry in SOCIAL_SCIENCE_PROXY_MAP.items():
        assert "social_observation" in entry
        assert "hormonal_substrate" in entry
        assert "berm_parameter" in entry
        assert "emf_link" in entry


# === IVF compensation (ACTIVE) ===

def test_ivf_denmark_bio_tfr_approx_136():
    """Denmark bio TFR ≈ 1.36 (observed 1.55, IVF ~12%)."""
    bio = v16_predicted_tfr("Denmark", 2024)
    assert abs(bio - 1.36) < 0.05

def test_ivf_niger_correction_negligible():
    """Niger IVF correction ≈ 0 (IVF share ~0.05%)."""
    bio = v16_predicted_tfr("Niger", 2024)
    ivf = ivf_share_projected("Niger", 2024)
    obs = observed_from_biological(bio, ivf)
    assert abs(obs - bio) < 0.05

def test_ivf_buffer_grows_over_time():
    """IVF buffer should grow as IVF share increases."""
    bio_2024 = v16_predicted_tfr("Denmark", 2024)
    bio_2035 = v16_predicted_tfr("Denmark", 2035)
    ivf_2024 = ivf_share_projected("Denmark", 2024)
    ivf_2035 = ivf_share_projected("Denmark", 2035)
    buffer_2024 = observed_from_biological(bio_2024, ivf_2024) - bio_2024
    buffer_2035 = observed_from_biological(bio_2035, ivf_2035) - bio_2035
    buffer_pct_2024 = buffer_2024 / bio_2024 if bio_2024 > 0 else 0
    buffer_pct_2035 = buffer_2035 / bio_2035 if bio_2035 > 0 else 0
    assert buffer_pct_2035 > buffer_pct_2024

def test_ivf_share_capped():
    assert ivf_share_projected("Denmark", 2100) <= 0.25

def test_ivf_observed_roundtrip():
    """observed_from_biological(biological_tfr(obs)) ≈ obs."""
    obs = 1.55
    share = 0.12
    bio = biological_tfr(obs, share)
    recovered = observed_from_biological(bio, share)
    assert abs(recovered - obs) < 1e-10

def test_ivf_report_has_both_tfrs():
    """Country report includes both biological and observed predictions."""
    r = v16_country_tfr("Denmark", 2024)
    assert "biological_predicted_tfr" in r
    assert "ivf_contribution" in r
    assert r["biological_predicted_tfr"] < r["predicted_tfr"]
    assert r["ivf_contribution"] > 0

def test_ivf_loocv_rmse():
    """LOOCV RMSE ≤ 1.20 after IVF calibration change."""
    result = loocv_v16()
    assert result["rmse"] <= 1.20

def test_ivf_loocv_has_observed():
    """LOOCV results include observed TFR for comparison."""
    result = loocv_v16()
    for c, r in result["per_country"].items():
        assert "observed" in r
        assert r["observed"] >= r["actual"]

def test_ivf_all_countries_bio_below_observed():
    """Biological TFR ≤ observed TFR for all countries."""
    from berm.data.countries import V12_ACTUAL_TFR_2024
    for c in V12_ACTUAL_TFR_2024:
        bio = v16_predicted_tfr(c, 2024)
        ivf = ivf_share_projected(c, 2024)
        obs = observed_from_biological(bio, ivf)
        assert bio <= obs + 1e-10, f"{c}: bio {bio:.4f} > obs {obs:.4f}"


# === Exposure-response slope lives in berm.config (audit P2-19) ===

def test_bio_capacity_slope_equals_historical_literal():
    """v11_biological_capacity carried `b = 0.010` as a function-local literal."""
    assert BIO_CAPACITY_SLOPE == 0.010


def test_v11_bio_cap_uses_config_slope():
    cum = 25.0
    assert v11_biological_capacity(cum) == 6.5 * math.exp(-BIO_CAPACITY_SLOPE * (cum - 5.0))
    assert v11_biological_capacity(cum) == 6.5 * math.exp(-0.010 * (cum - 5.0))


def test_bio_capacity_slope_is_patchable(monkeypatch):
    """The point of the move: the slope can now be varied without editing source."""
    import berm.v16 as v16_module
    monkeypatch.setattr(v16_module, "BIO_CAPACITY_SLOPE", 0.020)
    assert v11_biological_capacity(25.0) == 6.5 * math.exp(-0.020 * 20.0)


@pytest.mark.parametrize("country,year,expected", [
    # Reference values: Wolfram-verified BIO_PREDICTIONS above.
    ("SouthKorea", 2024, 0.6549275392671918),
    ("Finland", 2030, 0.9957901347994496),
])
def test_config_slope_leaves_wolfram_predictions_unchanged(country, year, expected):
    assert abs(v16_predicted_tfr(country, year) - expected) < 1e-6


# === Diagnostics off the report path (v16_country_tfr(diagnostics=False)) ===

REPORT_DIAGNOSTIC_KEYS = (
    "feedback_amplification",
    "ot_dual_pathway",
    "vagal_pathway",
    "quadruple_suppression",
)


def test_report_diagnostics_default_on():
    r = v16_country_tfr("SouthKorea", 2030)
    for key in REPORT_DIAGNOSTIC_KEYS:
        assert isinstance(r[key], dict), key


def test_report_diagnostics_off_sets_keys_to_none():
    r = v16_country_tfr("SouthKorea", 2030, diagnostics=False)
    for key in REPORT_DIAGNOSTIC_KEYS:
        assert key in r and r[key] is None, key
    # Non-diagnostic content is untouched.
    assert isinstance(r["l_reuteri_pathway"], dict)
    assert r["social_science_proxy_map"] is SOCIAL_SCIENCE_PROXY_MAP


@pytest.mark.parametrize("country,year", [
    ("SouthKorea", 2024), ("Finland", 2030), ("Denmark", 2024), ("Niger", 2035),
])
def test_report_diagnostics_flag_does_not_change_predictions(country, year):
    full = v16_country_tfr(country, year)
    lean = v16_country_tfr(country, year, diagnostics=False)
    assert set(full) == set(lean)
    for key in full:
        if key in REPORT_DIAGNOSTIC_KEYS:
            continue
        assert full[key] == lean[key], key


def test_report_flag_does_not_reclassify_report_functions():
    """model_data_driven scans berm.v16 docstrings for DIAGNOSTIC_ONLY."""
    from berm.model_data_driven import diagnostic_mechanisms
    names = diagnostic_mechanisms()
    for fn in (
        "feedback_amplification",
        "oxytocin_dual_pathway_diagnostic",
        "vagal_oxytocin_pathway",
        "behavioral_quadruple_suppression",
    ):
        assert fn in names, fn
    assert "v16_country_tfr" not in names
    assert "v11_biological_capacity" not in names
