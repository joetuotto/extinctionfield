import pytest
from berm.formula.cross_sectional import (
    emf_index,
    emf_effective,
    predict_tfr_cross_sectional,
    electrified_tfr,
)


class TestEmfIndex:
    def test_zero_inputs(self):
        assert emf_index(0, 0) == 0.0

    def test_max_inputs(self):
        assert abs(emf_index(8500, 47) - 1.0) < 1e-9

    def test_clamped_above_max(self):
        assert abs(emf_index(20000, 100) - 1.0) < 1e-9

    def test_weights_sum_to_one(self):
        result = emf_index(8500, 47, w_elf=0.60, w_rf=0.40)
        assert abs(result - 1.0) < 1e-9


class TestEmfEffective:
    def test_full_access(self):
        idx = emf_index(4000, 30)
        eff = emf_effective(4000, 30, 100)
        assert abs(eff - idx) < 1e-9

    def test_half_access(self):
        idx = emf_index(4000, 30)
        eff = emf_effective(4000, 30, 50)
        assert abs(eff - idx * 0.5) < 1e-9

    def test_zero_access(self):
        assert emf_effective(4000, 30, 0) == 0.0


class TestPredictTfr:
    def test_finland(self):
        result = predict_tfr_cross_sectional(5500, 31, 100)
        assert abs(result["predicted_tfr"] - 1.32) < 0.5

    def test_niger(self):
        result = predict_tfr_cross_sectional(20, 0, 19)
        assert result["predicted_tfr"] > 5.0

    def test_south_korea(self):
        result = predict_tfr_cross_sectional(4500, 41, 100)
        assert result["predicted_tfr"] < 2.0

    def test_access_adjustment_raises_tfr(self):
        full = predict_tfr_cross_sectional(1000, 5, 100)
        half = predict_tfr_cross_sectional(1000, 5, 50)
        assert half["predicted_tfr"] > full["predicted_tfr"]

    def test_zero_exposure(self):
        result = predict_tfr_cross_sectional(0, 0, 0)
        assert abs(result["predicted_tfr"] - 5.66) < 0.01

    def test_result_keys(self):
        result = predict_tfr_cross_sectional(3000, 20, 80)
        expected_keys = {
            "predicted_tfr", "emf_index", "emf_effective",
            "elf_component", "rf_component", "access_adjustment",
            "baseline_tfr", "floor_tfr", "model", "caveat",
        }
        assert set(result.keys()) == expected_keys


class TestElectrifiedTfr:
    def test_nigeria(self):
        result = electrified_tfr(5.14, 55)
        assert result["electrified_tfr"] < 5.14
        assert result["electrified_tfr"] > 1.0

    def test_full_access(self):
        result = electrified_tfr(1.7, 100)
        assert abs(result["electrified_tfr"] - 1.7) < 0.01

    def test_low_access_error(self):
        result = electrified_tfr(6.0, 3)
        assert "error" in result

    def test_floor_clamp(self):
        result = electrified_tfr(1.0, 90)
        assert result["electrified_tfr"] >= 0.5
