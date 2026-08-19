"""Test BERM v17 core model: community sigmoid, country predictions, pathways."""

import math

from berm.model import (
    community_fit_function,
    berm_sigmoid_v7,
    density_weighted_tfr_with_personal,
    cultural_component,
    ivf_share_projected,
    biological_tfr,
    native_tfr,
    predict_country_year,
)
from berm.exposure.personal import (
    tech_penetration_profile,
    personal_contact_hours,
    night_proximity_prevalence,
    two_component_emf,
    vulnerability_by_age,
    cohort_weighted_exposure,
)
from berm.exposure.ambient import (
    effective_emf_field,
    bimodal_effective_emf,
    get_attenuation_factor,
)
from berm.biology.pathways import (
    biological_sigmoid,
    pathway_a,
    pathway_e,
    pathway_f,
    dysbiosis_index,
    total_effect,
)
from berm.data.countries import COMMUNITY_DATA


# === Community sigmoid ===

def test_community_sigmoid_amish():
    """Amish (EMF ~ 0.001) should give TFR near 6.5."""
    tfr = community_fit_function(0.001)
    assert abs(tfr - 6.5) < 0.2, f"Amish TFR {tfr} too far from 6.5"


def test_community_sigmoid_korea():
    """Korea (EMF ~ 0.8) should give TFR near 0.72."""
    tfr = community_fit_function(0.8)
    assert tfr < 1.5, f"Korea TFR {tfr} too high"


def test_community_sigmoid_monotone():
    """Higher EMF should give lower TFR."""
    tfrs = [community_fit_function(d["emf"]) for d in COMMUNITY_DATA]
    for i in range(len(tfrs) - 1):
        assert tfrs[i] >= tfrs[i + 1], f"Not monotone at index {i}"


def test_community_sigmoid_calibration():
    """Check R² > 0.99 on calibration points."""
    observed = [d["tfr"] for d in COMMUNITY_DATA]
    predicted = [community_fit_function(d["emf"]) for d in COMMUNITY_DATA]
    mean_obs = sum(observed) / len(observed)
    ss_res = sum((o - p) ** 2 for o, p in zip(observed, predicted))
    ss_tot = sum((o - mean_obs) ** 2 for o in observed)
    r2 = 1 - ss_res / ss_tot
    assert r2 > 0.99, f"R² = {r2} < 0.99"


# === Effective EMF field ===

def test_effective_emf_field_zero():
    assert effective_emf_field(0.0, 100.0, 0.5) == 0.0


def test_effective_emf_field_saturates():
    result = effective_emf_field(1.0, 50000.0, 0.95)
    assert result <= 2.0


# === Country attenuation ===

def test_attenuation_korea():
    """Korea: no outage, no sanctions, but mountains."""
    factor = get_attenuation_factor("SouthKorea")
    assert 0.85 < factor < 1.0


def test_attenuation_nigeria():
    """Nigeria: 6h outage, sanctions 0.85."""
    factor = get_attenuation_factor("Nigeria")
    assert factor < 0.75


def test_attenuation_finland():
    """Finland: flat terrain, no outages."""
    factor = get_attenuation_factor("Finland")
    assert factor > 0.95


# === Tech penetration ===

def test_tech_pen_before_start():
    assert tech_penetration_profile("SouthKorea", 1985) == 0.0


def test_tech_pen_saturates():
    pen = tech_penetration_profile("SouthKorea", 2024)
    assert pen == 1.0


def test_tech_pen_ordering():
    """Korea should be ahead of Niger at any given year."""
    kr = tech_penetration_profile("SouthKorea", 2010)
    ne = tech_penetration_profile("Niger", 2010)
    assert kr > ne


# === Personal EMF ===

def test_contact_hours_evolution():
    assert personal_contact_hours(1990) == 0.1
    assert personal_contact_hours(2000) == 0.5
    assert personal_contact_hours(2015) == 6.0
    assert personal_contact_hours(2023) == 14.0


def test_night_proximity_evolution():
    assert night_proximity_prevalence(2000) == 0.05
    assert night_proximity_prevalence(2020) == 0.85


# === Two-component EMF ===

def test_two_component_finland():
    tc = two_component_emf("Finland", 2024)
    assert tc["combined"] > 0
    assert tc["personal"] > 0
    assert tc["ambient"] >= 0
    assert tc["personal_fraction"] > 0.1  # Finland: low density, personal is significant


def test_two_component_korea():
    tc = two_component_emf("SouthKorea", 2024)
    assert tc["combined"] > tc["personal"]  # Metro density matters


# === Vulnerability by age ===

def test_vulnerability_fetal():
    assert vulnerability_by_age(-1) == 5.0


def test_vulnerability_adult():
    assert vulnerability_by_age(30) == 1.0


# === Cultural component ===

def test_cultural_nigeria():
    assert cultural_component("Nigeria") == 4.3


def test_cultural_finland():
    assert cultural_component("Finland") == 0.0


def test_cultural_china():
    assert cultural_component("China") == -0.5


# === IVF shares ===

def test_ivf_projection():
    assert ivf_share_projected("Denmark", 2023) == 0.12
    assert abs(ivf_share_projected("Denmark", 2033) - 0.17) < 1e-10
    assert ivf_share_projected("Denmark", 2043) == 0.22


# === Full country prediction ===

def test_predict_finland_2024():
    result = predict_country_year("Finland", 2024)
    tfr = result["predicted_tfr"]
    assert 0.5 < tfr < 3.0, f"Finland 2024 TFR {tfr} outside reasonable range"
    assert result["cultural_component"] == 0.0


def test_predict_korea_2024():
    result = predict_country_year("SouthKorea", 2024)
    tfr = result["predicted_tfr"]
    assert 0.3 < tfr < 2.0, f"Korea 2024 TFR {tfr} outside reasonable range"


def test_predict_nigeria_2024():
    result = predict_country_year("Nigeria", 2024)
    tfr = result["predicted_tfr"]
    assert tfr > 3.0, f"Nigeria 2024 TFR {tfr} too low (cultural +4.3)"


def test_predict_future_lower():
    """Future year should show lower TFR (more cumulative EMF)."""
    r2024 = predict_country_year("Finland", 2024)
    r2035 = predict_country_year("Finland", 2035)
    assert r2035["predicted_tfr"] < r2024["predicted_tfr"]


def test_predict_output_keys():
    result = predict_country_year("USA", 2024)
    expected_keys = {
        "country", "year", "ambient_emf", "personal_emf", "combined_emf",
        "personal_fraction", "circadian_adjusted_emf", "cohort_index",
        "proximity_multiplier", "bio_sigmoid_tfr", "cultural_component",
        "predicted_tfr", "ivf_share", "biological_tfr", "mobile_pen",
    }
    assert set(result.keys()) == expected_keys


# === Pathways ===

def test_pathway_a_negative():
    """Pathway A should produce negative (harmful) effect."""
    assert pathway_a(0.5) < 0


def test_pathway_e_dysbiosis():
    """Higher EMF -> higher dysbiosis index."""
    low = dysbiosis_index(0.1)
    high = dysbiosis_index(0.8)
    assert high > low


def test_pathway_f_bbb():
    result = pathway_f(0.5)
    assert result["bbb_permeability"] > 0
    assert result["emf_attributable"] > 0
    assert result["multiplier"] > 1.0


def test_total_effect_decomposition():
    result = total_effect(0.5)
    assert result["berm_share"] > 0
    assert result["berm_share"] <= 1.0
    assert result["pathway_ad"] < 0
    assert result["pathway_e"] < 0


# === Native TFR ===

def test_native_tfr_finland():
    nt = native_tfr("Finland", 1.26)
    assert nt < 1.26  # immigrants raise observed TFR
    assert nt > 0.5


def test_native_tfr_no_migration_data():
    nt = native_tfr("Niger", 6.8)
    assert nt == 6.8  # no migration data -> pass through
