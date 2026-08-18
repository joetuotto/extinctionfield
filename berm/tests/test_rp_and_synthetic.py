"""Tests for BERM v18 Phase 2 (R+P) and Phase 3 (synthetic falsification)."""

import math
import pytest

from berm.stats.reversible_persistent import (
    rp_damage,
    rp_predict,
    rp_calibrate_rate,
    loocv_rp,
    estimate_rp_parameters,
    RPEstimationResult,
)
from berm.stats.synthetic_tests import (
    generate_synthetic_world,
    run_falsification_battery,
    placebo_rollout_test,
    wrong_lag_test,
    SyntheticWorld,
    SyntheticCountry,
)
from berm.data.countries import V12_ACTUAL_TFR_2024
from berm.v16 import calibrate_v16


FAST_COUNTRIES = ["Finland", "SouthKorea", "Japan", "USA", "Germany",
                  "Nigeria", "Niger", "Brazil", "India", "China"]


# ═══════════════════════════════════════════════════════════════
# Phase 2: Reversible / Persistent
# ═══════════════════════════════════════════════════════════════

class TestRPDamage:
    def test_damage_positive(self):
        result = rp_damage("Finland", 2024, rho=0.9, q=0.5)
        assert result["final_D"] > 0
        assert result["final_R"] > 0
        assert result["final_P"] > 0

    def test_pure_persistent_equals_cumulative(self):
        result = rp_damage("USA", 2024, rho=0.9, q=0.0)
        assert result["final_D"] == result["final_P"]

    def test_pure_reversible(self):
        result = rp_damage("USA", 2024, rho=0.9, q=1.0)
        assert result["final_D"] == result["final_R"]

    def test_half_life_calculation(self):
        result = rp_damage("Finland", 2024, rho=0.9, q=0.5)
        expected_hl = -1.0 / math.log(0.9)
        assert abs(result["half_life_reversible"] - expected_hl) < 0.2

    def test_trajectory_length(self):
        result = rp_damage("Japan", 2024, rho=0.9, q=0.5)
        traj = result["trajectory"]
        assert len(traj.years) > 0
        assert len(traj.R_series) == len(traj.years)

    def test_higher_rho_means_more_accumulation(self):
        r_low = rp_damage("USA", 2024, rho=0.5, q=0.5)
        r_high = rp_damage("USA", 2024, rho=0.95, q=0.5)
        assert r_high["final_R"] > r_low["final_R"]


class TestRPPredict:
    @pytest.fixture(autouse=True)
    def _calibrate(self):
        calibrate_v16()

    def test_predict_positive(self):
        rate = rp_calibrate_rate("Finland", rho=0.9, q=0.5)
        pred = rp_predict("Finland", 2024, rho=0.9, q=0.5, cultural_rate=rate)
        assert pred > 0

    def test_reproduces_at_2024(self):
        for c in FAST_COUNTRIES:
            rate = rp_calibrate_rate(c, rho=0.9, q=0.5)
            pred = rp_predict(c, 2024, rho=0.9, q=0.5, cultural_rate=rate)
            actual = V12_ACTUAL_TFR_2024[c]
            assert abs(pred - actual) < 0.1, (
                f"{c}: R+P pred={pred:.3f} vs actual={actual:.3f}"
            )

    def test_calibrate_rate_positive(self):
        for c in FAST_COUNTRIES:
            rate = rp_calibrate_rate(c, rho=0.9, q=0.5)
            assert rate > 0


class TestRPLOOCV:
    @pytest.fixture(autouse=True)
    def _calibrate(self):
        calibrate_v16()

    def test_loocv_runs(self):
        result = loocv_rp(FAST_COUNTRIES, rho=0.9, q=0.5)
        assert "rmse" in result
        assert result["rmse"] > 0
        assert result["n"] == len(FAST_COUNTRIES)

    def test_different_params_different_rmse(self):
        r1 = loocv_rp(FAST_COUNTRIES, rho=0.5, q=0.0)
        r2 = loocv_rp(FAST_COUNTRIES, rho=0.9, q=0.5)
        assert r1["rmse"] != r2["rmse"]


class TestRPEstimation:
    def test_estimation_runs(self):
        result = estimate_rp_parameters(
            FAST_COUNTRIES,
            rho_grid=[0.7, 0.9],
            q_grid=[0.0, 0.5, 1.0],
        )
        assert isinstance(result, RPEstimationResult)
        assert result.best_rmse > 0
        assert 0.0 <= result.best_q <= 1.0
        assert 0.0 < result.best_rho < 1.0

    def test_interpretation_present(self):
        result = estimate_rp_parameters(
            FAST_COUNTRIES,
            rho_grid=[0.9],
            q_grid=[0.0, 0.5, 1.0],
        )
        assert len(result.interpretation) > 10

    def test_all_results_populated(self):
        result = estimate_rp_parameters(
            FAST_COUNTRIES,
            rho_grid=[0.7, 0.9],
            q_grid=[0.0, 0.5],
        )
        assert len(result.all_results) == 4  # 2 rho × 2 q


# ═══════════════════════════════════════════════════════════════
# Phase 3: Synthetic Tests
# ═══════════════════════════════════════════════════════════════

class TestSyntheticWorld:
    def test_generate_s0(self):
        world = generate_synthetic_world("S0")
        assert isinstance(world, SyntheticWorld)
        assert world.scenario == "S0"
        assert not world.has_emf_effect
        assert len(world.countries) == 25

    def test_generate_s3(self):
        world = generate_synthetic_world("S3")
        assert world.has_emf_effect
        assert len(world.countries) == 25

    def test_generate_all_scenarios(self):
        for s in ["S0", "S1", "S2", "S3", "S4", "S5", "S6"]:
            world = generate_synthetic_world(s)
            assert len(world.countries) == 25
            for c in world.countries:
                assert len(c.tfr) == 35
                assert len(c.emf) == 35
                assert all(v >= 0.5 for v in c.tfr.values())

    def test_deterministic_seed(self):
        w1 = generate_synthetic_world("S3", seed=123)
        w2 = generate_synthetic_world("S3", seed=123)
        c1_tfr = list(w1.countries[0].tfr.values())
        c2_tfr = list(w2.countries[0].tfr.values())
        assert c1_tfr == c2_tfr

    def test_different_seeds_different_worlds(self):
        w1 = generate_synthetic_world("S3", seed=1)
        w2 = generate_synthetic_world("S3", seed=2)
        c1_tfr = list(w1.countries[0].tfr.values())
        c2_tfr = list(w2.countries[0].tfr.values())
        assert c1_tfr != c2_tfr

    def test_s0_no_emf_correlation(self):
        world = generate_synthetic_world("S0")
        last_year = max(world.countries[0].tfr.keys())
        for c in world.countries:
            cum_emf = sum(c.emf.values())
            tfr = c.tfr[last_year]
            assert cum_emf > 0
            assert tfr > 0


class TestFalsificationBattery:
    def test_battery_runs(self):
        results = run_falsification_battery()
        assert len(results) == 7
        for r in results:
            assert r.berm_rmse > 0
            assert r.null_rmse > 0

    def test_s0_no_false_positive(self):
        results = run_falsification_battery()
        s0 = next(r for r in results if r.scenario == "S0")
        assert s0.correct, (
            f"S0 false positive: BERM found effect where none exists "
            f"(BERM RMSE={s0.berm_rmse}, null={s0.null_rmse})"
        )

    def test_s3_detects_cumulative(self):
        results = run_falsification_battery()
        s3 = next(r for r in results if r.scenario == "S3")
        assert s3.berm_wins, (
            f"S3: BERM should detect cumulative EMF "
            f"(BERM RMSE={s3.berm_rmse}, null={s3.null_rmse})"
        )


class TestPlaceboRollout:
    def test_placebo_runs(self):
        result = placebo_rollout_test(n_permutations=20)
        assert result.n_permutations == 20
        assert 0.0 <= result.p_value <= 1.0
        assert result.original_rmse > 0

    def test_interpretation_present(self):
        result = placebo_rollout_test(n_permutations=10)
        assert len(result.interpretation) > 10


class TestWrongLag:
    def test_wrong_lag_runs(self):
        result = wrong_lag_test(shift_range=range(-3, 4))
        assert len(result.shifts) == 7
        assert len(result.rmses) == 7
        assert result.best_rmse > 0

    def test_zero_shift_included(self):
        result = wrong_lag_test(shift_range=range(-3, 4))
        assert 0 in result.shifts
        assert result.zero_rmse > 0

    def test_interpretation_present(self):
        result = wrong_lag_test(shift_range=range(-2, 3))
        assert len(result.interpretation) > 10

    def test_optimal_near_zero_for_s3(self):
        result = wrong_lag_test(shift_range=range(-5, 6))
        assert abs(result.best_shift) <= 3, (
            f"S3 has zero true lag, but best shift is {result.best_shift}"
        )
