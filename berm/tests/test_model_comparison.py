"""Tests for BERM v18 Phase 1: Model comparison M0–M3."""

import math
import pytest

from berm.stats.model_comparison import (
    _annual_emf,
    _bspline_basis,
    m0_calibrate_rate,
    m0_predict,
    m1_calibrate_rate,
    m1_predict,
    m2_adjusted_exposure,
    m2_calibrate_rate,
    m2_predict,
    m2_weighted_exposure,
    m3_adjusted_exposure,
    m3_calibrate_rate,
    m3_predict,
    m3_weighted_exposure,
    _loocv_m0,
    _loocv_m1,
    _loocv_m2,
    _loocv_m3,
    estimate_tau,
    estimate_m3_coeffs,
    compare_models,
    SPLINE_KNOTS,
    N_SPLINE_COEFFS,
    LOOCVResult,
)
from berm.data.countries import V12_ACTUAL_TFR_2024, TECH_DIFFUSION
from berm.v16 import calibrate_v16


COUNTRIES = list(V12_ACTUAL_TFR_2024.keys())
# Use a small subset for fast tests
FAST_COUNTRIES = ["Finland", "SouthKorea", "Japan", "USA", "Germany",
                  "Nigeria", "Niger", "Brazil", "India", "China"]


class TestHelpers:
    def test_annual_emf_positive(self):
        for c in ["Finland", "USA", "Japan"]:
            emf = _annual_emf(c, 2024)
            assert emf > 0, f"{c} annual EMF should be positive"

    def test_annual_emf_zero_before_tech(self):
        td = TECH_DIFFUSION.get("Finland")
        if td and td.start > 1970:
            emf = _annual_emf("Finland", 1970)
            assert emf < 0.5, "EMF before tech rollout should be near zero"

    def test_bspline_basis_length(self):
        basis = _bspline_basis(5.0, SPLINE_KNOTS)
        assert len(basis) == N_SPLINE_COEFFS

    def test_bspline_basis_nonnegative(self):
        for x in [0, 5, 10, 15, 20, 25, 30]:
            basis = _bspline_basis(float(x), SPLINE_KNOTS)
            assert all(b >= 0 for b in basis)

    def test_bspline_peaks_at_center(self):
        basis = _bspline_basis(2.5, SPLINE_KNOTS)
        assert basis[0] > 0, "First basis should be active at x=2.5"


class TestM0:
    def test_calibrate_rate_positive(self):
        for c in FAST_COUNTRIES:
            rate = m0_calibrate_rate(c)
            assert rate > 0, f"{c} M0 rate should be positive"

    def test_predict_reproduces_at_2024(self):
        for c in FAST_COUNTRIES:
            rate = m0_calibrate_rate(c)
            pred = m0_predict(c, 2024, rate)
            actual = V12_ACTUAL_TFR_2024[c]
            assert abs(pred - actual) < 0.01, (
                f"{c}: M0 at 2024 should reproduce observed TFR"
            )

    def test_predict_with_mean_rate(self):
        rates = [m0_calibrate_rate(c) for c in FAST_COUNTRIES]
        mean_rate = sum(rates) / len(rates)
        pred = m0_predict("Finland", 2024, mean_rate)
        assert 0.1 < pred < 10, "Prediction with mean rate should be reasonable"


class TestM1:
    @pytest.fixture(autouse=True)
    def _calibrate(self):
        calibrate_v16()

    def test_calibrate_rate_positive(self):
        for c in FAST_COUNTRIES:
            rate = m1_calibrate_rate(c)
            assert rate > 0, f"{c} M1 rate should be positive"

    def test_predict_reproduces_at_2024(self):
        for c in FAST_COUNTRIES:
            rate = m1_calibrate_rate(c)
            pred = m1_predict(c, 2024, rate)
            actual = V12_ACTUAL_TFR_2024[c]
            assert abs(pred - actual) < 0.05, (
                f"{c}: M1 pred={pred:.3f} vs actual={actual:.3f}"
            )


class TestM2:
    def test_weighted_exposure_increases_with_year(self):
        e1 = m2_weighted_exposure("USA", 2010, tau=10.0)
        e2 = m2_weighted_exposure("USA", 2020, tau=10.0)
        assert e2 >= e1

    def test_high_tau_approaches_uniform(self):
        wce_high = m2_weighted_exposure("USA", 2024, tau=500.0)
        wce_low = m2_weighted_exposure("USA", 2024, tau=2.0)
        assert wce_high != wce_low, "Different τ should give different weights"

    def test_calibrate_rate_positive(self):
        for c in FAST_COUNTRIES:
            rate = m2_calibrate_rate(c, tau=10.0)
            assert rate > 0, f"{c} M2 rate should be positive"

    def test_predict_reproduces_at_2024(self):
        for c in FAST_COUNTRIES:
            rate = m2_calibrate_rate(c, tau=10.0)
            pred = m2_predict(c, 2024, tau=10.0, cultural_rate=rate)
            actual = V12_ACTUAL_TFR_2024[c]
            assert abs(pred - actual) < 0.05, (
                f"{c}: M2 pred={pred:.3f} vs actual={actual:.3f}"
            )


class TestM3:
    def test_weighted_exposure_flat_coeffs(self):
        coeffs = [1.0] * N_SPLINE_COEFFS
        wce = m3_weighted_exposure("USA", 2024, coeffs)
        assert wce > 0

    def test_calibrate_rate_positive(self):
        coeffs = [1.0] * N_SPLINE_COEFFS
        for c in FAST_COUNTRIES:
            rate = m3_calibrate_rate(c, coeffs)
            assert rate > 0, f"{c} M3 rate should be positive"

    def test_predict_reproduces_at_2024(self):
        coeffs = [1.0] * N_SPLINE_COEFFS
        for c in FAST_COUNTRIES:
            rate = m3_calibrate_rate(c, coeffs)
            pred = m3_predict(c, 2024, coeffs, rate)
            actual = V12_ACTUAL_TFR_2024[c]
            assert abs(pred - actual) < 0.05, (
                f"{c}: M3 pred={pred:.3f} vs actual={actual:.3f}"
            )


class TestLOOCV:
    @pytest.fixture(autouse=True)
    def _calibrate(self):
        calibrate_v16()

    def test_loocv_m0_runs(self):
        r = _loocv_m0(FAST_COUNTRIES)
        assert isinstance(r, LOOCVResult)
        assert r.rmse > 0
        assert r.n == len(FAST_COUNTRIES)

    def test_loocv_m1_runs(self):
        r = _loocv_m1(FAST_COUNTRIES)
        assert isinstance(r, LOOCVResult)
        assert r.rmse > 0
        assert r.n == len(FAST_COUNTRIES)

    def test_loocv_m2_runs(self):
        r = _loocv_m2(FAST_COUNTRIES, tau=10.0)
        assert isinstance(r, LOOCVResult)
        assert r.rmse > 0
        assert r.extra["tau"] == 10.0

    def test_loocv_m3_runs(self):
        coeffs = [1.0] * N_SPLINE_COEFFS
        r = _loocv_m3(FAST_COUNTRIES, coeffs)
        assert isinstance(r, LOOCVResult)
        assert r.rmse > 0

    def test_m1_loocv_rmse_reasonable(self):
        r = _loocv_m1(FAST_COUNTRIES)
        assert r.rmse < 3.0, f"M1 RMSE={r.rmse} is unreasonably high"

    def test_m0_rmse_not_nan(self):
        r = _loocv_m0(FAST_COUNTRIES)
        assert not math.isnan(r.rmse)
        assert not math.isinf(r.rmse)


class TestTauEstimation:
    def test_estimate_tau_runs(self):
        result = estimate_tau(FAST_COUNTRIES, tau_grid=[2.0, 5.0, 10.0, 20.0])
        assert "best_tau" in result
        assert "best_rmse" in result
        assert result["best_tau"] in [2.0, 5.0, 10.0, 20.0]
        assert result["best_rmse"] > 0

    def test_interpretation_present(self):
        result = estimate_tau(FAST_COUNTRIES, tau_grid=[5.0, 15.0, 35.0])
        assert "interpretation" in result
        assert len(result["interpretation"]) > 10


class TestM3Estimation:
    def test_estimate_m3_runs(self):
        result = estimate_m3_coeffs(FAST_COUNTRIES)
        assert "best_profile" in result
        assert "best_coeffs" in result
        assert "best_rmse" in result
        assert result["best_rmse"] > 0
        assert len(result["best_coeffs"]) == N_SPLINE_COEFFS


class TestFullComparison:
    def test_compare_models_runs(self):
        comp = compare_models(FAST_COUNTRIES)
        assert comp.winner in ["M0_baseline", "M1_cumEMF",
                                "M2_exp_decay", "M3_free_WCE"]
        assert len(comp.results) == 4
        for name, r in comp.results.items():
            assert r.rmse > 0, f"{name} RMSE should be positive"
            assert r.n == len(FAST_COUNTRIES)

    def test_all_models_have_per_country(self):
        comp = compare_models(FAST_COUNTRIES)
        for name, r in comp.results.items():
            assert len(r.per_country) == len(FAST_COUNTRIES), (
                f"{name} should have results for all countries"
            )

    def test_tau_estimation_present(self):
        comp = compare_models(FAST_COUNTRIES)
        assert comp.tau_estimation is not None
        assert "best_tau" in comp.tau_estimation

    def test_m3_estimation_present(self):
        comp = compare_models(FAST_COUNTRIES)
        assert comp.m3_estimation is not None
        assert "best_profile" in comp.m3_estimation
