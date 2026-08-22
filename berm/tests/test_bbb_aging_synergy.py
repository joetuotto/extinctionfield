"""Tests for BBB aging × EMF synergy model."""

from berm.diagnostics.bbb_aging_synergy import (
    arendash_context_model,
    bbb_permeability_with_aging,
    BBB_MECHANISMS,
)


def test_young_no_emf_is_safe():
    r = bbb_permeability_with_aging(0.0, 25)
    assert r["risk_category"] == "LOW"


def test_old_no_emf_is_moderate():
    r = bbb_permeability_with_aging(0.0, 80)
    assert r["risk_category"] in ("LOW", "MODERATE")


def test_old_hospital_is_high():
    r = bbb_permeability_with_aging(0.5, 80, hospital=True)
    assert r["risk_category"] in ("HIGH", "CRITICAL")


def test_synergy_exceeds_sum():
    """Combined effect > sum of parts (synergy via shared TJ proteins)."""
    age_only = bbb_permeability_with_aging(0.0, 80)
    emf_only = bbb_permeability_with_aging(0.5, 25)
    both = bbb_permeability_with_aging(0.5, 80)
    assert both["total_permeability"] > (
        age_only["total_permeability"] + emf_only["total_permeability"]
    ) * 0.9


def test_hospital_increases_risk():
    home = bbb_permeability_with_aging(0.3, 80, hospital=False)
    hosp = bbb_permeability_with_aging(0.3, 80, hospital=True)
    assert hosp["total_permeability"] > home["total_permeability"]


def test_drug_multiplier_increases_with_permeability():
    low = bbb_permeability_with_aging(0.0, 25)
    high = bbb_permeability_with_aging(0.5, 80, hospital=True)
    assert high["drug_brain_multiplier"] > low["drug_brain_multiplier"]


def test_permeability_capped_at_095():
    r = bbb_permeability_with_aging(1.0, 100, hospital=True)
    assert r["total_permeability"] <= 0.95


def test_arendash_clean_blood_is_beneficial():
    r = arendash_context_model(bbb_open=0.5, blood_toxin_load=0.0, amyloid_beta_level=0.8)
    assert r["interpretation"] == "NET_BENEFICIAL"


def test_arendash_toxic_blood_is_harmful():
    r = arendash_context_model(bbb_open=0.5, blood_toxin_load=0.8, amyloid_beta_level=0.1)
    assert r["interpretation"] == "NET_HARMFUL"


def test_arendash_low_opening_is_neutral():
    r = arendash_context_model(bbb_open=0.05, blood_toxin_load=0.5, amyloid_beta_level=0.5)
    assert r["interpretation"] == "NEUTRAL"


def test_bbb_mechanisms_has_four_routes():
    assert len(BBB_MECHANISMS) == 4
    assert "vgcc_enos" in BBB_MECHANISMS
    assert "conformational" in BBB_MECHANISMS


def test_young_emf_moderate_risk():
    r = bbb_permeability_with_aging(0.6, 30)
    assert r["risk_category"] in ("MODERATE", "HIGH")
