"""Tests for melatonin_fertility_bridge diagnostic."""

from berm.diagnostics.melatonin_fertility_bridge import (
    MelatoninFertilityResult,
    melatonin_fertility_model,
    compare_scenarios,
    melatonin_bridge_summary,
)


def test_low_emf_baseline():
    r = melatonin_fertility_model(0.1, 30, "F")
    assert r.endogenous_melatonin > 0.9
    assert r.fertility_index > 0.8


def test_high_emf_suppression():
    low = melatonin_fertility_model(0.1, 30, "F")
    high = melatonin_fertility_model(0.8, 30, "F")
    assert high.endogenous_melatonin < low.endogenous_melatonin
    assert high.fertility_index < low.fertility_index
    assert high.emf_suppression_pct > 30


def test_supplement_recovery():
    without = melatonin_fertility_model(0.8, 30, "F", melatonin_supplement_mg=0)
    with_sup = melatonin_fertility_model(0.8, 30, "F", melatonin_supplement_mg=3)
    assert with_sup.total_melatonin > without.total_melatonin
    assert with_sup.fertility_index > without.fertility_index
    assert with_sup.supplement_benefit > 0


def test_shift_work_penalty():
    normal = melatonin_fertility_model(0.3, 30, "F", shift_work=False)
    shift = melatonin_fertility_model(0.3, 30, "F", shift_work=True)
    assert shift.endogenous_melatonin < normal.endogenous_melatonin
    assert shift.fertility_index < normal.fertility_index


def test_age_decline():
    young = melatonin_fertility_model(0.3, 25, "F")
    older = melatonin_fertility_model(0.3, 40, "F")
    assert older.endogenous_melatonin < young.endogenous_melatonin


def test_melatonin_floor():
    r = melatonin_fertility_model(1.0, 50, "F", shift_work=True)
    assert r.endogenous_melatonin >= 0.1


def test_compare_scenarios():
    results = compare_scenarios()
    assert len(results) == 6
    assert results["low_emf_30F"]["fertility"] > results["high_emf_30F"]["fertility"]
    assert results["high_emf_30F_supplement"]["fertility"] > results["high_emf_30F"]["fertility"]


def test_summary_structure():
    s = melatonin_bridge_summary()
    assert len(s["chain"]) == 8
    assert len(s["pathways"]) == 5
    assert "P38" in s["predictions"]
    assert "P39" in s["predictions"]
    assert "P40" in s["predictions"]
    assert len(s["warnings"]) == 6
