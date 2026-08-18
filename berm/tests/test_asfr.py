"""Tests for ASFR cohort model: data, cohort exposure, and predictions."""

import math
import pytest

from berm.data.asfr import (
    AGE_GROUPS,
    WPP_ASFR,
    get_asfr,
    asfr_to_tfr,
    age_group_midpoint,
    mean_age_at_birth,
)
from berm.outcomes.cohort_exposure import (
    cohort_cumulative_emf,
    cohort_cumulative_with_retention,
    cohort_bio_capacity,
    cohort_behavioral_factor,
    cohort_bio_behav,
    cohort_profile,
    compare_cohorts,
)
from berm.outcomes.asfr_model import (
    predict_asfr,
    predict_asfr_timeseries,
    cohort_fertility_trajectory,
    youngest_cohort_effect,
)


class TestASFRData:
    def test_age_groups_count(self):
        assert len(AGE_GROUPS) == 7

    def test_age_groups_span(self):
        assert AGE_GROUPS[0] == "15-19"
        assert AGE_GROUPS[-1] == "45-49"

    def test_all_countries_have_2024(self):
        for country in WPP_ASFR:
            assert 2024 in WPP_ASFR[country], f"{country} missing 2024"

    def test_all_asfr_tuples_length(self):
        for country, years in WPP_ASFR.items():
            for year, asfr in years.items():
                assert len(asfr) == 7, f"{country} {year} has {len(asfr)} values"

    def test_all_asfr_nonnegative(self):
        for country, years in WPP_ASFR.items():
            for year, asfr in years.items():
                for i, v in enumerate(asfr):
                    assert v >= 0, f"{country} {year} group {i} negative: {v}"

    def test_asfr_decreasing_at_extremes(self):
        for country, years in WPP_ASFR.items():
            for year, asfr in years.items():
                assert asfr[6] < asfr[3], (
                    f"{country} {year}: 45-49 rate should be less than 30-34"
                )

    def test_tfr_formula(self):
        asfr = (50.0, 100.0, 120.0, 80.0, 30.0, 5.0, 0.5)
        tfr = asfr_to_tfr(asfr)
        assert abs(tfr - 5.0 * 385.5 / 1000.0) < 0.001

    def test_usa_tfr_reasonable(self):
        asfr = get_asfr("USA", 2024)
        tfr = asfr_to_tfr(asfr)
        assert 1.4 < tfr < 1.8, f"USA 2024 TFR={tfr}"

    def test_south_korea_tfr_very_low(self):
        asfr = get_asfr("SouthKorea", 2024)
        tfr = asfr_to_tfr(asfr)
        assert tfr < 0.8, f"SouthKorea 2024 TFR={tfr}"

    def test_niger_tfr_high(self):
        asfr = get_asfr("Niger", 2024)
        tfr = asfr_to_tfr(asfr)
        assert tfr > 5.5, f"Niger 2024 TFR={tfr}"

    def test_interpolation(self):
        asfr_2015 = get_asfr("USA", 2015)
        asfr_2010 = get_asfr("USA", 2010)
        asfr_2020 = get_asfr("USA", 2020)
        for i in range(7):
            assert min(asfr_2010[i], asfr_2020[i]) <= asfr_2015[i] + 0.01
            assert asfr_2015[i] <= max(asfr_2010[i], asfr_2020[i]) + 0.01

    def test_extrapolation_before_data(self):
        asfr = get_asfr("USA", 1980)
        assert asfr == WPP_ASFR["USA"][1990]

    def test_missing_country(self):
        assert get_asfr("Narnia", 2024) is None

    def test_age_group_midpoint(self):
        assert age_group_midpoint("15-19") == 17.0
        assert age_group_midpoint("30-34") == 32.0

    def test_mean_age_at_birth(self):
        asfr = get_asfr("USA", 2024)
        mab = mean_age_at_birth(asfr)
        assert 28.0 < mab < 32.0


class TestCohortExposure:
    def test_cumulative_increases_with_age(self):
        cum_20 = cohort_cumulative_emf("USA", 1995, 20)
        cum_30 = cohort_cumulative_emf("USA", 1995, 30)
        assert cum_30 > cum_20

    def test_later_cohort_higher_exposure(self):
        cum_1980 = cohort_cumulative_emf("USA", 1980, 28)
        cum_2000 = cohort_cumulative_emf("USA", 2000, 28)
        assert cum_2000 > cum_1980

    def test_retention_less_than_raw(self):
        raw = cohort_cumulative_emf("USA", 1990, 30)
        ret = cohort_cumulative_with_retention("USA", 1990, 30)
        assert ret <= raw

    def test_bio_capacity_range(self):
        bio = cohort_bio_capacity("USA", 1995, 28)
        assert 0.1 < bio < 7.0

    def test_behavioral_range(self):
        behav = cohort_behavioral_factor("USA", 1995, 28)
        assert 0.1 < behav < 1.0

    def test_bio_behav_product(self):
        bio = cohort_bio_capacity("USA", 1995, 28)
        behav = cohort_behavioral_factor("USA", 1995, 28)
        bb = cohort_bio_behav("USA", 1995, 28)
        assert abs(bb - bio * behav) < 0.01

    def test_older_cohort_higher_biobehav(self):
        bb_old = cohort_bio_behav("USA", 1970, 28)
        bb_new = cohort_bio_behav("USA", 2000, 28)
        assert bb_old > bb_new

    def test_profile_returns_all_ages(self):
        profile = cohort_profile("USA", 1990)
        assert len(profile) == 7
        assert profile[0]["age"] == 17
        assert profile[-1]["age"] == 47

    def test_profile_cumulative_increases(self):
        profile = cohort_profile("USA", 1990)
        for i in range(len(profile) - 1):
            assert profile[i + 1]["adjusted_cumulative"] >= profile[i]["adjusted_cumulative"]

    def test_compare_cohorts_ordering(self):
        cohorts = compare_cohorts("USA")
        for i in range(len(cohorts) - 1):
            assert cohorts[i + 1]["adjusted_cumulative"] >= cohorts[i]["adjusted_cumulative"]

    def test_compare_cohorts_bio_behav_decreasing(self):
        cohorts = compare_cohorts("USA")
        for i in range(len(cohorts) - 1):
            assert cohorts[i]["bio_behav"] >= cohorts[i + 1]["bio_behav"]


class TestASFRModel:
    def test_predict_asfr_structure(self):
        result = predict_asfr("USA", 2030)
        assert "age_groups" in result
        assert len(result["age_groups"]) == 7
        assert "predicted_tfr" in result
        assert "v16_tfr" in result

    def test_predicted_tfr_positive(self):
        result = predict_asfr("USA", 2030)
        assert result["predicted_tfr"] > 0

    def test_reference_year_identity(self):
        result = predict_asfr("USA", 2024, reference_year=2024)
        ref_asfr = get_asfr("USA", 2024)
        ref_tfr = asfr_to_tfr(ref_asfr)
        assert abs(result["predicted_tfr"] - ref_tfr) < 0.05

    def test_future_tfr_lower_than_present(self):
        r_2024 = predict_asfr("USA", 2024)
        r_2040 = predict_asfr("USA", 2040)
        assert r_2040["predicted_tfr"] < r_2024["predicted_tfr"]

    def test_all_age_groups_decrease_forward(self):
        r_2024 = predict_asfr("USA", 2024)
        r_2040 = predict_asfr("USA", 2040)
        for i in range(7):
            assert r_2040["age_groups"][i]["bio_behav_ratio"] <= 1.0

    def test_younger_groups_decline_faster(self):
        result = predict_asfr("USA", 2040)
        groups = result["age_groups"]
        ratio_young = groups[1]["bio_behav_ratio"]
        ratio_old = groups[5]["bio_behav_ratio"]
        assert ratio_young < ratio_old

    def test_missing_country(self):
        result = predict_asfr("Narnia", 2030)
        assert "error" in result

    def test_timeseries_length(self):
        ts = predict_asfr_timeseries("USA", 2024, 2050, step=5)
        assert len(ts) == 6

    def test_timeseries_decreasing_tfr(self):
        ts = predict_asfr_timeseries("USA", 2024, 2050, step=5)
        for i in range(len(ts) - 1):
            assert ts[i + 1]["predicted_tfr"] <= ts[i]["predicted_tfr"]

    def test_cohort_trajectory_structure(self):
        traj = cohort_fertility_trajectory("USA", 1990)
        assert "trajectory" in traj
        assert len(traj["trajectory"]) == 7

    def test_cohort_trajectory_bio_behav_decreases(self):
        traj = cohort_fertility_trajectory("USA", 1990)
        for i in range(len(traj["trajectory"]) - 1):
            assert (
                traj["trajectory"][i + 1]["bio_behav"]
                <= traj["trajectory"][i]["bio_behav"]
            )

    def test_youngest_cohort_penalty_positive(self):
        result = youngest_cohort_effect("USA", 2035)
        assert result["cohort_penalty"] > 0
        assert result["youngest_bio_behav"] < result["oldest_bio_behav"]

    def test_youngest_cohort_penalty_increases_over_time(self):
        p_2025 = youngest_cohort_effect("USA", 2025)
        p_2040 = youngest_cohort_effect("USA", 2040)
        assert p_2040["cohort_penalty"] >= p_2025["cohort_penalty"]

    def test_mean_age_at_birth_shifts_up(self):
        r_2024 = predict_asfr("USA", 2024)
        r_2040 = predict_asfr("USA", 2040)
        assert r_2040["mean_age_at_birth"] >= r_2024["mean_age_at_birth"]

    def test_multiple_countries(self):
        for country in ["Japan", "Finland", "Nigeria", "India", "Brazil"]:
            result = predict_asfr(country, 2030)
            assert result["predicted_tfr"] > 0, f"{country} failed"
            assert len(result["age_groups"]) == 7
