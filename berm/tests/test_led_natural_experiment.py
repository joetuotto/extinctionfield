"""Tests for LED natural experiment diagnostic module."""

import pytest


class TestLEDMarketShare:
    def test_load_led_market_share(self):
        from berm.diagnostics.led_natural_experiment import load_led_market_share
        data = load_led_market_share()
        assert "eu_early" in data
        assert "usa" in data
        assert "developing" in data

    def test_eu_adopts_faster_than_developing(self):
        from berm.diagnostics.led_natural_experiment import load_led_market_share
        data = load_led_market_share()
        eu_2014 = data["eu_early"]["data"][2014]
        dev_2014 = data["developing"]["data"][2014]
        assert eu_2014 > dev_2014 * 3

    def test_all_shares_between_0_and_1(self):
        from berm.diagnostics.led_natural_experiment import load_led_market_share
        data = load_led_market_share()
        for group_key in ("eu_early", "eu_standard", "usa", "japan_korea", "developing"):
            for year_str, share in data[group_key]["data"].items():
                assert 0.0 <= share <= 1.0, f"{group_key} {year_str}: {share}"


class TestAdoptionGap:
    def test_gap_positive_2012_to_2016(self):
        from berm.diagnostics.led_natural_experiment import led_adoption_gap
        for year in range(2012, 2017):
            gap = led_adoption_gap(year)
            assert gap["adoption_gap"] > 0, f"EU should lead in {year}"

    def test_gap_structure(self):
        from berm.diagnostics.led_natural_experiment import led_adoption_gap
        gap = led_adoption_gap(2015)
        assert "eu_led_share" in gap
        assert "non_eu_led_share" in gap
        assert "if_exposure_ratio" in gap
        assert gap["if_exposure_ratio"] > 1.0


class TestTFRSlope:
    def test_declining_series_negative_slope(self):
        from berm.diagnostics.led_natural_experiment import tfr_slope
        series = {2015: 1.65, 2016: 1.57, 2017: 1.49, 2018: 1.41}
        slope = tfr_slope(series, 2015, 2018)
        assert slope < 0

    def test_empty_range_returns_zero(self):
        from berm.diagnostics.led_natural_experiment import tfr_slope
        slope = tfr_slope({}, 2000, 2010)
        assert slope == 0.0


class TestDIDEstimate:
    def test_did_returns_named_tuple(self):
        from berm.diagnostics.led_natural_experiment import did_estimate, SAMPLE_TFR
        result = did_estimate(
            SAMPLE_TFR["Finland"],
            SAMPLE_TFR["United States"],
        )
        assert hasattr(result, "did_estimate")
        assert hasattr(result, "prediction_consistent")

    def test_did_uses_correct_periods(self):
        from berm.diagnostics.led_natural_experiment import did_estimate, SAMPLE_TFR
        result = did_estimate(
            SAMPLE_TFR["Finland"],
            SAMPLE_TFR["United States"],
            pre_period=(2003, 2009),
            post_period=(2013, 2020),
        )
        assert result.pre_period == (2003, 2009)
        assert result.post_period == (2013, 2020)


class TestRunDiagnostic:
    def test_run_diagnostic_returns_dict(self):
        from berm.diagnostics.led_natural_experiment import run_diagnostic
        result = run_diagnostic()
        assert "did_result" in result
        assert "led_gap_at_midpoint" in result
        assert "caveats" in result
        assert result["status"] == "DIAGNOSTIC_ONLY"

    def test_caveats_not_empty(self):
        from berm.diagnostics.led_natural_experiment import run_diagnostic
        result = run_diagnostic()
        assert len(result["caveats"]) >= 3
