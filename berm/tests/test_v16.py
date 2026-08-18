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
)


@pytest.fixture(autouse=True)
def _calibrate():
    calibrate_v16()


# === Wolfram-verified predictions (12 test points, machine precision) ===

WOLFRAM_PREDICTIONS = [
    ("SouthKorea", 2024, 0.710867650237284),
    ("Japan", 2024, 1.2000456995104392),
    ("Finland", 2024, 1.3044273718078119),
    ("USA", 2024, 1.644313496098271),
    ("Nigeria", 2024, 5.218634512898348),
    ("Denmark", 2024, 1.5523841164922647),
    ("India", 2024, 1.9903580921575863),
    ("Iran", 2024, 2.116681851298839),
    ("Brazil", 2024, 1.6741072895906424),
    ("China", 2024, 1.0694376600000028),
    ("Ethiopia", 2024, 4.090102277792336),
    ("SouthKorea", 2030, 0.5814812605395421),
    ("Japan", 2030, 0.9901818454414129),
    ("Finland", 2030, 1.0609304451062245),
    ("USA", 2030, 1.340981870989352),
    ("Nigeria", 2030, 4.907206725059884),
    ("Niger", 2030, 6.527420798482735),
]


@pytest.mark.parametrize("country,year,expected", WOLFRAM_PREDICTIONS)
def test_wolfram_verified_prediction(country, year, expected):
    result = v16_predicted_tfr(country, year)
    assert abs(result - expected) < 1e-6, (
        f"{country} {year}: {result:.10f} vs Wolfram {expected:.10f}"
    )


# === Wolfram-verified intermediates for Korea 2024 ===

def test_korea_ambient_annual():
    assert abs(v16_ambient_annual("SouthKorea", 2024) - 3.7151883313137164) < 1e-8

def test_korea_personal_annual():
    assert abs(v16_personal_annual("SouthKorea", 2024) - 2.0910266331815337) < 1e-8

def test_korea_adj_cum():
    assert abs(v16_adjusted_cumulative_exposure("SouthKorea", 2024) - 25.662814686300546) < 1e-6

def test_korea_bio_cap():
    adj = v16_adjusted_cumulative_exposure("SouthKorea", 2024)
    bio = v16_biological_capacity(adj, "SouthKorea", 2024)
    assert abs(bio - 4.324787148288158) < 1e-6

def test_korea_behavioral():
    adj = v16_adjusted_cumulative_exposure("SouthKorea", 2024)
    beh = emf_behavioral_factor_v3(adj)
    assert abs(beh - 0.7471388720868352) < 1e-8


# === Wolfram-verified component values for Korea 2024 ===

def test_korea_cry_effect():
    assert abs(v17_cry_effect("SouthKorea", 2024) - 0.9558176956782213) < 1e-8

def test_korea_melatonin():
    assert abs(v17_melatonin_suppression("SouthKorea", 2024) - 0.9668632717586659) < 1e-8

def test_korea_sperm_ca2():
    assert abs(v17_sperm_ca2_fecundity("SouthKorea", 2024) - 0.9646611656026346) < 1e-8

def test_korea_ovulation_vgic():
    assert abs(v17_ovulation_vgic("SouthKorea", 2024) - 0.9838467086404602) < 1e-8

def test_korea_epigenetic():
    assert abs(v16_epigenetic_factor("SouthKorea", 2024) - 0.9615950737421349) < 1e-8

def test_korea_bbb_modifier():
    r = v16_country_tfr("SouthKorea", 2024)
    assert abs(r["bbb_modifier"] - 0.9351128020156173) < 1e-8

def test_korea_dysbiosis_modifier():
    r = v16_country_tfr("SouthKorea", 2024)
    assert abs(r["dysbiosis_modifier"] - 0.9878726263744135) < 1e-8

def test_korea_sex_ratio():
    assert abs(v17_predicted_sex_ratio("SouthKorea", 2024) - 0.510460231118822) < 1e-8

def test_korea_cohort_adj():
    assert abs(v17_cohort_adjustment("SouthKorea", 2024) - 1.0888888888888888) < 1e-8

def test_korea_f_male():
    assert abs(v17_f_male("SouthKorea", 2024) - 4.756605909395564) < 1e-6

def test_korea_f_female():
    assert abs(v17_f_female("SouthKorea", 2024) - 0.909217040609892) < 1e-8


# === V16 Verification assertions (from Wolfram v16Verification) ===

def test_v16c_korea_accuracy():
    tfr = v16_predicted_tfr("SouthKorea", 2024)
    assert abs(tfr - 0.72) < 0.05

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
