"""Tests for BERM v19.1 falsification framework."""

import pytest


class TestT1LedDID:
    def test_runs_without_error(self):
        from berm.validation.falsification_v19_1 import run_t1_led_did
        result = run_t1_led_did()
        assert result.test_id == "T1"
        assert result.status == "RAN"

    def test_uses_all_eu_countries(self):
        from berm.validation.falsification_v19_1 import run_t1_led_did
        result = run_t1_led_did()
        assert result.details["eu_n"] >= 15

    def test_uses_control_countries(self):
        from berm.validation.falsification_v19_1 import run_t1_led_did
        result = run_t1_led_did()
        assert result.details["ctrl_n"] >= 5

    def test_did_is_numeric(self):
        from berm.validation.falsification_v19_1 import run_t1_led_did
        result = run_t1_led_did()
        assert isinstance(result.details["did_estimate"], float)

    def test_falsified_is_boolean(self):
        from berm.validation.falsification_v19_1 import run_t1_led_did
        result = run_t1_led_did()
        assert isinstance(result.falsified, bool)


class TestT3CovidRetrodiction:
    def test_runs_without_error(self):
        from berm.validation.falsification_v19_1 import run_t3_covid_retrodiction
        result = run_t3_covid_retrodiction()
        assert result.test_id == "T3"
        assert result.status == "RAN"

    def test_m2_predicts_correctly(self):
        from berm.validation.falsification_v19_1 import run_t3_covid_retrodiction
        result = run_t3_covid_retrodiction()
        assert result.details["m2_prediction_correct"] is True

    def test_m1_cannot_predict(self):
        from berm.validation.falsification_v19_1 import run_t3_covid_retrodiction
        result = run_t3_covid_retrodiction()
        assert result.details["m1_prediction_correct"] is False

    def test_discriminating(self):
        from berm.validation.falsification_v19_1 import run_t3_covid_retrodiction
        result = run_t3_covid_retrodiction()
        assert result.details["discriminating"] is True


class TestT7IntensityComparison:
    def test_runs_without_error(self):
        from berm.validation.falsification_v19_1 import run_t7_intensity_comparison
        result = run_t7_intensity_comparison()
        assert result.test_id == "T7"
        assert result.status == "RAN"

    def test_tdcs_is_key_comparator(self):
        from berm.validation.falsification_v19_1 import run_t7_intensity_comparison
        result = run_t7_intensity_comparison()
        assert "tDCS_cortical" in result.details["comparisons"]
        tdcs = result.details["comparisons"]["tDCS_cortical"]
        assert tdcs["ambient_exceeds_median"] is True

    def test_not_all_below(self):
        from berm.validation.falsification_v19_1 import run_t7_intensity_comparison
        result = run_t7_intensity_comparison()
        assert result.details["n_exceeds"] >= 1


class TestRegistry:
    def test_all_seven_tests_defined(self):
        from berm.validation.falsification_v19_1 import TEST_REGISTRY
        assert len(TEST_REGISTRY) == 7
        for tid in ["T1", "T2", "T3", "T4", "T5", "T6", "T7"]:
            assert tid in TEST_REGISTRY

    def test_falsification_matrix_covers_tests(self):
        from berm.validation.falsification_v19_1 import FALSIFICATION_MATRIX
        test_ids = {row[0] for row in FALSIFICATION_MATRIX}
        assert "T1" in test_ids
        assert "T2" in test_ids
        assert "T7" in test_ids


class TestRunAll:
    def test_run_all_returns_summary(self):
        from berm.validation.falsification_v19_1 import run_all_available
        summary = run_all_available()
        assert summary["version"] == "v19.1"
        assert summary["tests_run"] == 3
        assert summary["tests_total"] == 7
        assert "T1" in summary["results"]
        assert "T3" in summary["results"]
        assert "T7" in summary["results"]

    def test_pending_tests_listed(self):
        from berm.validation.falsification_v19_1 import run_all_available
        summary = run_all_available()
        assert "T2" in summary["pending_tests"]
        assert "T4" in summary["pending_tests"]
