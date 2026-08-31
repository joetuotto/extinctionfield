from __future__ import annotations

import math

from berm.prediction import two_level_model as tlm

electrification_threshold = tlm.electrification_threshold
_testosterone_trajectory = tlm.testosterone_trajectory
t_to_tfr_modifier = tlm.t_to_tfr_modifier
predict_tfr_two_level = tlm.predict_tfr_two_level
predict_tfr_series = tlm.predict_tfr_series
validate_usa_temporal = tlm.validate_usa_temporal
USA_TFR_OBSERVED = tlm.USA_TFR_OBSERVED
TwoLevelPrediction = tlm.TwoLevelPrediction


def test_electrification_threshold_high_emf_gives_low_tfr() -> None:
    tfr = electrification_threshold(0.9)
    assert 1.5 < tfr < 2.0


def test_electrification_threshold_zero_emf_gives_high_tfr() -> None:
    tfr = electrification_threshold(0.0)
    assert abs(tfr - (4.11 + 1.55)) < 0.01


def test_electrification_threshold_monotonic() -> None:
    values = [electrification_threshold(i / 10) for i in range(11)]
    for a, b in zip(values, values[1:]):
        assert a >= b


def test_t_trajectory_baseline() -> None:
    t = _testosterone_trajectory(1982)
    assert abs(t - 638.0) < 0.01


def test_t_trajectory_declines() -> None:
    t_1982 = _testosterone_trajectory(1982)
    t_2002 = _testosterone_trajectory(2002)
    assert t_2002 < t_1982
    # 20 years at 1.2%/year: 638 * 0.988^20 ≈ 501
    assert abs(t_2002 - 638 * 0.988 ** 20) < 0.01


def test_t_trajectory_2024() -> None:
    t = _testosterone_trajectory(2024)
    # 42 years at 1.2%/year
    expected = 638 * 0.988 ** 42
    assert abs(t - expected) < 0.1


def test_t_to_tfr_modifier_positive_for_high_t() -> None:
    mod = t_to_tfr_modifier(600)
    assert mod > 0


def test_t_to_tfr_modifier_decreases_with_t() -> None:
    mod_high = t_to_tfr_modifier(600)
    mod_low = t_to_tfr_modifier(400)
    assert mod_high > mod_low


def test_predict_tfr_two_level_returns_dataclass() -> None:
    result = predict_tfr_two_level(0.85, 2023)
    assert isinstance(result, TwoLevelPrediction)
    assert result.year == 2023
    assert result.emf_index == 0.85
    assert result.lag_years == 8
    assert result.predicted_tfr > 0


def test_predict_tfr_two_level_floor() -> None:
    result = predict_tfr_two_level(0.99, 2100, tfr_floor=0.5)
    assert result.predicted_tfr >= 0.5


def test_predict_tfr_series_length() -> None:
    years = list(range(2010, 2025))
    results = predict_tfr_series(0.85, years)
    assert len(results) == len(years)


def test_predict_tfr_series_declining() -> None:
    years = list(range(2010, 2025))
    results = predict_tfr_series(0.85, years)
    for a, b in zip(results, results[1:]):
        assert a.predicted_tfr >= b.predicted_tfr


def test_usa_temporal_validation_r2() -> None:
    """The T→TFR temporal model should explain ≥85% of USA TFR variance."""
    result = validate_usa_temporal()
    assert result["r2"] >= 0.85, f"R² = {result['r2']}, expected >= 0.85"
    assert result["n"] == len(USA_TFR_OBSERVED)


def test_usa_temporal_validation_rmse() -> None:
    result = validate_usa_temporal()
    assert result["rmse"] < 0.15, f"RMSE = {result['rmse']}, expected < 0.15"


def test_usa_temporal_has_caveat() -> None:
    result = validate_usa_temporal()
    assert "calibrated" in result["caveat"].lower()
