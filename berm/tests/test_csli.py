"""Tests for Cross-Species Lag Invariance (CSLI) framework."""

import numpy as np
import pytest

from berm.stats import csli as csli_mod
from berm.stats.csli import (
    _parse_winter_year,
    load_bee_data,
    load_bird_data,
    load_sperm_data,
    load_emf_data,
    load_tfr_data,
    _bspline_basis,
    estimate_lag_kernel,
    cross_species_lag_comparison,
    lag_invariance_test,
    latent_common_shock,
    SPECIES_BIOLOGY,
)

biological_scaling_fn = csli_mod.test_biological_scaling


class TestParseWinterYear:
    def test_standard(self):
        assert _parse_winter_year("2015-16") == 2016

    def test_century_boundary(self):
        assert _parse_winter_year("1999-00") == 2000

    def test_single_year(self):
        assert _parse_winter_year("2020") == 2020

    def test_full_year_format(self):
        assert _parse_winter_year("2018-2019") == 2019


class TestDataLoaders:
    def test_bee_data_loads(self):
        data = load_bee_data()
        assert len(data) > 0
        for iso3, series in data.items():
            assert len(iso3) == 3
            assert all(isinstance(y, int) for y in series.keys())
            assert all(isinstance(v, float) for v in series.values())

    def test_bird_data_loads(self):
        data = load_bird_data()
        assert len(data) > 0
        for iso3, series in data.items():
            assert all(isinstance(y, int) for y in series.keys())

    def test_sperm_data_loads(self):
        data = load_sperm_data()
        assert len(data) > 0
        for iso3, series in data.items():
            assert all(v > 0 for v in series.values())

    def test_emf_data_loads(self):
        data = load_emf_data()
        assert len(data) > 0
        for iso3, series in data.items():
            assert all(isinstance(y, int) for y in series.keys())

    def test_tfr_data_loads(self):
        data = load_tfr_data()
        assert len(data) > 0
        for iso3, series in data.items():
            assert all(0 < v < 10 for v in series.values())

    def test_emf_and_bee_share_countries(self):
        emf = load_emf_data()
        bees = load_bee_data()
        shared = set(emf.keys()) & set(bees.keys())
        assert len(shared) >= 3

    def test_emf_and_tfr_share_countries(self):
        emf = load_emf_data()
        tfr = load_tfr_data()
        shared = set(emf.keys()) & set(tfr.keys())
        assert len(shared) >= 10


class TestBSplineBasis:
    def test_nonnegative(self):
        knots = np.linspace(0, 15, 5)
        for k in range(7):
            for lag in range(16):
                val = _bspline_basis(float(lag), k, knots, degree=3)
                assert val >= 0.0

    def test_peak_at_center(self):
        knots = np.linspace(0, 15, 5)
        mid_knot = 7.5
        vals = [_bspline_basis(float(lag), 2, knots, degree=3) for lag in range(16)]
        peak_lag = np.argmax(vals)
        assert abs(peak_lag - mid_knot) < 5


class TestEstimateLagKernel:
    @pytest.fixture
    def emf_data(self):
        return load_emf_data()

    def test_bee_kernel(self, emf_data):
        bees = load_bee_data()
        result = estimate_lag_kernel(bees, emf_data)
        assert "error" not in result or result["n_observations"] > 0
        if "lag_weights" in result:
            assert len(result["lag_weights"]) == 16
            assert result["n_countries"] > 0

    def test_tfr_kernel(self, emf_data):
        tfr = load_tfr_data()
        result = estimate_lag_kernel(tfr, emf_data)
        if "lag_weights" in result:
            assert len(result["lag_weights"]) == 16
            assert isinstance(result["r_squared"], float)
            assert result["mean_lag"] >= 0

    def test_too_few_observations(self):
        outcome = {"XX": {2020: 1.0}}
        emf = {"XX": {2020: 50.0}}
        result = estimate_lag_kernel(outcome, emf)
        assert "error" in result

    def test_no_overlapping_countries(self):
        outcome = {"AA": {2020: 1.0}}
        emf = {"BB": {2020: 50.0}}
        result = estimate_lag_kernel(outcome, emf)
        assert "error" in result


class TestCrossSpeciesComparison:
    def test_runs_with_real_data(self):
        emf = load_emf_data()
        sentinel = {
            "bees": load_bee_data(),
            "birds": load_bird_data(),
            "human_tfr": load_tfr_data(),
        }
        result = cross_species_lag_comparison(sentinel, emf)
        assert "species_results" in result
        assert "order_matches_biology" in result
        assert "lag_order" in result
        assert "spearman_rho" in result

    def test_species_biology_complete(self):
        for sp, bio in SPECIES_BIOLOGY.items():
            assert "generation_time_days" in bio
            assert "expected_lag_years" in bio
            assert bio["generation_time_days"] > 0


class TestLagInvariance:
    def test_runs_with_bee_data(self):
        emf = load_emf_data()
        bees = load_bee_data()
        result = lag_invariance_test("bees", bees, emf)
        assert "cv" in result
        assert "assessment" in result
        assert result["cv"] >= 0

    def test_runs_with_tfr_data(self):
        emf = load_emf_data()
        tfr = load_tfr_data()
        result = lag_invariance_test("human_tfr", tfr, emf)
        assert "cv" in result
        assert "n_countries" in result


class TestBiologicalScaling:
    def test_runs(self):
        emf = load_emf_data()
        sentinel = {
            "bees": load_bee_data(),
            "birds": load_bird_data(),
            "human_tfr": load_tfr_data(),
        }
        comparison = cross_species_lag_comparison(sentinel, emf)
        observed_lags = {}
        for species, mean_lag, _ in comparison["lag_order"]:
            observed_lags[species] = mean_lag
        result = biological_scaling_fn(observed_lags)
        assert "slope" in result
        assert "r_squared" in result
        assert "formula" in result


class TestLatentCommonShock:
    def test_runs_with_real_data(self):
        emf = load_emf_data()
        tfr = load_tfr_data()
        sentinel = {
            "bees": load_bee_data(),
            "birds": load_bird_data(),
        }
        result = latent_common_shock(sentinel, emf, tfr)
        assert "model_comparison" in result
        assert "common_shock_real" in result
        for model_name in result["model_comparison"]:
            mc = result["model_comparison"][model_name]
            assert "bic" in mc
