"""Tests for mTOR-EMF aging model."""

import math
import pytest

from berm.biology.mtor_aging import (
    MTOR_BASELINE,
    EMF_MTOR_GAIN,
    METFORMIN_MTOR_REDUCTION,
    RAPAMYCIN_MTOR_REDUCTION,
    CR_MTOR_REDUCTION,
    AGING_MTOR_EXPONENT,
    SENESCENCE_THRESHOLD,
    mtor_effective,
    aging_rate_multiplier,
    senescence_accumulation,
    metformin_longevity_benefit,
    mtor_fertility_aging_interaction,
    intervention_comparison,
)


# === mtor_effective ===

class TestMtorEffective:
    def test_baseline_no_emf(self):
        assert mtor_effective(0.0) == pytest.approx(MTOR_BASELINE)

    def test_full_emf_no_intervention(self):
        assert mtor_effective(1.0) == pytest.approx(
            MTOR_BASELINE + EMF_MTOR_GAIN
        )

    def test_metformin_reduces(self):
        without = mtor_effective(1.0)
        with_met = mtor_effective(1.0, {"metformin": True})
        assert with_met < without
        assert with_met == pytest.approx(
            without * (1 - METFORMIN_MTOR_REDUCTION)
        )

    def test_rapamycin_stronger_than_metformin(self):
        met = mtor_effective(1.0, {"metformin": True})
        rapa = mtor_effective(1.0, {"rapamycin": True})
        assert rapa < met

    def test_cr_reduces(self):
        without = mtor_effective(1.0)
        with_cr = mtor_effective(1.0, {"CR": True})
        assert with_cr < without

    def test_shabbat_only_effective_with_emf(self):
        no_emf = mtor_effective(0.0)
        no_emf_shabbat = mtor_effective(0.0, {"shabbat": True})
        assert no_emf_shabbat == pytest.approx(no_emf)

        high_emf = mtor_effective(1.0)
        high_emf_shabbat = mtor_effective(1.0, {"shabbat": True})
        assert high_emf_shabbat < high_emf

    def test_combined_interventions(self):
        met_only = mtor_effective(1.0, {"metformin": True})
        met_cr = mtor_effective(1.0, {"metformin": True, "CR": True})
        assert met_cr < met_only

    def test_floor_at_0_1(self):
        extreme = mtor_effective(
            0.0, {"metformin": True, "rapamycin": True, "CR": True, "IF": True}
        )
        assert extreme >= 0.1

    def test_none_interventions_same_as_empty(self):
        assert mtor_effective(0.5) == mtor_effective(0.5, None)
        assert mtor_effective(0.5) == mtor_effective(0.5, {})

    def test_monotonic_in_emf(self):
        levels = [0.0, 0.2, 0.5, 0.8, 1.0, 1.5]
        values = [mtor_effective(e) for e in levels]
        for i in range(len(values) - 1):
            assert values[i] < values[i + 1]


# === aging_rate_multiplier ===

class TestAgingRate:
    def test_baseline_is_one(self):
        assert aging_rate_multiplier(1.0) == pytest.approx(1.0)

    def test_elevated_mtor_accelerates(self):
        rate = aging_rate_multiplier(1.25)
        assert rate > 1.0
        assert rate == pytest.approx(1.25 ** AGING_MTOR_EXPONENT)

    def test_reduced_mtor_decelerates(self):
        rate = aging_rate_multiplier(0.70)
        assert rate < 1.0

    def test_monotonic(self):
        levels = [0.5, 0.7, 1.0, 1.25, 1.5]
        rates = [aging_rate_multiplier(m) for m in levels]
        for i in range(len(rates) - 1):
            assert rates[i] < rates[i + 1]

    def test_spec_values(self):
        """Verify the approximate values stated in the docstring."""
        assert aging_rate_multiplier(1.25) == pytest.approx(1.17, abs=0.01)
        assert aging_rate_multiplier(0.70) == pytest.approx(0.78, abs=0.01)


# === senescence_accumulation ===

class TestSenescence:
    def test_below_threshold_is_zero(self):
        assert senescence_accumulation(1.0, 10.0) == 0.0
        assert senescence_accumulation(SENESCENCE_THRESHOLD, 10.0) == 0.0

    def test_above_threshold_positive(self):
        assert senescence_accumulation(1.25, 10.0) > 0.0

    def test_proportional_to_years(self):
        s5 = senescence_accumulation(1.25, 5.0)
        s10 = senescence_accumulation(1.25, 10.0)
        assert s10 == pytest.approx(2 * s5)

    def test_proportional_to_excess(self):
        s1 = senescence_accumulation(1.20, 10.0)
        s2 = senescence_accumulation(1.25, 10.0)
        assert s2 > s1


# === metformin_longevity_benefit ===

class TestMetforminBenefit:
    def test_structure(self):
        r = metformin_longevity_benefit(1.0, 10.0)
        assert "biological_age_reduction" in r
        assert "natural_benefit" in r
        assert "emf_specific_benefit" in r
        assert "emf_fraction_of_benefit" in r
        assert r["emf_level"] == 1.0
        assert r["drug_duration_years"] == 10.0

    def test_benefit_positive(self):
        r = metformin_longevity_benefit(1.0, 10.0)
        assert r["biological_age_reduction"] > 0

    def test_emf_increases_benefit(self):
        """Core hypothesis: metformin benefit ∝ EMF level."""
        low = metformin_longevity_benefit(0.2, 10.0)
        high = metformin_longevity_benefit(1.0, 10.0)
        assert high["biological_age_reduction"] > low["biological_age_reduction"]

    def test_zero_emf_has_some_natural_benefit(self):
        """Even without EMF, metformin has some anti-aging effect."""
        r = metformin_longevity_benefit(0.0, 10.0)
        assert r["natural_benefit"] > 0
        assert r["emf_specific_benefit"] == pytest.approx(0.0, abs=0.001)

    def test_emf_fraction_increases_with_emf(self):
        """Higher EMF → larger fraction of benefit is EMF-specific."""
        low = metformin_longevity_benefit(0.2, 10.0)
        high = metformin_longevity_benefit(1.0, 10.0)
        assert high["emf_fraction_of_benefit"] > low["emf_fraction_of_benefit"]

    def test_longer_duration_more_benefit(self):
        short = metformin_longevity_benefit(1.0, 5.0)
        long = metformin_longevity_benefit(1.0, 20.0)
        assert long["biological_age_reduction"] > short["biological_age_reduction"]

    def test_mtor_values_consistent(self):
        r = metformin_longevity_benefit(1.0, 10.0)
        assert r["mtor_without_drug"] == pytest.approx(mtor_effective(1.0))
        assert r["mtor_with_drug"] == pytest.approx(
            mtor_effective(1.0, {"metformin": True})
        )


# === mtor_fertility_aging_interaction ===

class TestFertilityAgingInteraction:
    def test_structure(self):
        r = mtor_fertility_aging_interaction(30.0)
        assert "mtor_level" in r
        assert "aging_rate_multiplier" in r
        assert "sperm_differentiation_efficiency" in r
        assert "follicle_burnout_rate" in r

    def test_zero_emf_normal(self):
        r = mtor_fertility_aging_interaction(0.0)
        assert r["mtor_level"] == pytest.approx(MTOR_BASELINE)
        assert r["aging_rate_multiplier"] == pytest.approx(1.0)
        assert r["sperm_differentiation_efficiency"] == pytest.approx(1.0)
        assert r["follicle_burnout_rate"] == pytest.approx(1.0)

    def test_high_emf_impairs(self):
        r = mtor_fertility_aging_interaction(50.0)
        assert r["mtor_level"] > MTOR_BASELINE
        assert r["aging_rate_multiplier"] > 1.0
        assert r["sperm_differentiation_efficiency"] < 1.0

    def test_emf_capped_at_1_5(self):
        r1 = mtor_fertility_aging_interaction(75.0)
        r2 = mtor_fertility_aging_interaction(100.0)
        assert r1["mtor_level"] == pytest.approx(r2["mtor_level"])

    def test_sperm_and_aging_covary(self):
        """Higher EMF → both aging and fertility worsen together."""
        low = mtor_fertility_aging_interaction(10.0)
        high = mtor_fertility_aging_interaction(50.0)
        assert high["aging_rate_multiplier"] > low["aging_rate_multiplier"]
        assert (high["sperm_differentiation_efficiency"]
                < low["sperm_differentiation_efficiency"])


# === intervention_comparison ===

class TestInterventionComparison:
    def test_returns_all_interventions(self):
        results = intervention_comparison(1.0, 10.0)
        assert len(results) == 7
        labels = [r["intervention"] for r in results]
        assert "ei interventioita" in labels
        assert "metformiini" in labels
        assert "rapamysiini" in labels

    def test_no_intervention_saves_zero(self):
        results = intervention_comparison(1.0, 10.0)
        baseline = next(r for r in results if r["intervention"] == "ei interventioita")
        assert baseline["biological_years_saved"] == pytest.approx(0.0)

    def test_rapamycin_most_effective(self):
        results = intervention_comparison(1.0, 10.0)
        rapa = next(r for r in results if r["intervention"] == "rapamysiini")
        met = next(r for r in results if r["intervention"] == "metformiini")
        assert rapa["biological_years_saved"] > met["biological_years_saved"]

    def test_combined_better_than_single(self):
        results = intervention_comparison(1.0, 10.0)
        met = next(r for r in results if r["intervention"] == "metformiini")
        met_cr = next(r for r in results if r["intervention"] == "metformiini + CR")
        assert met_cr["biological_years_saved"] > met["biological_years_saved"]


# === Testable predictions (falsifiable) ===

class TestFalsifiablePredictions:
    def test_e1_urban_benefit_greater_than_rural(self):
        """E1: Metformin benefit should be larger in urban (high EMF)."""
        urban = metformin_longevity_benefit(0.9, 10.0)
        rural = metformin_longevity_benefit(0.3, 10.0)
        assert urban["biological_age_reduction"] > rural["biological_age_reduction"]

    def test_e2_amish_minimal_extra_benefit(self):
        """E2: In Amish (EMF ≈ 0), metformin has minimal extra longevity benefit."""
        amish = metformin_longevity_benefit(0.05, 10.0)
        assert amish["emf_fraction_of_benefit"] < 0.15

    def test_e6_shabbat_provides_mtor_relief(self):
        """E6: Shabbat EMF break reduces mTOR in high-EMF environment."""
        no_shabbat = mtor_effective(1.0)
        with_shabbat = mtor_effective(1.0, {"shabbat": True})
        assert with_shabbat < no_shabbat
        reduction_pct = (no_shabbat - with_shabbat) / no_shabbat * 100
        assert reduction_pct > 0
