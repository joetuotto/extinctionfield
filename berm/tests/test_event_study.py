"""Tests for BERM v18 Phase 5: Event study."""

import pytest

from berm.stats.event_study import (
    event_study,
    EventStudyResult,
    EventCoefficient,
    ROLLOUT_4G,
    _get_tfr_series,
)


class TestRolloutData:
    def test_rollout_years_populated(self):
        assert len(ROLLOUT_4G) > 10

    def test_rollout_years_reasonable(self):
        for country, year in ROLLOUT_4G.items():
            assert 2000 <= year <= 2025, f"{country}: year_4g={year}"


class TestTFRSeries:
    def test_loads_known_country(self):
        series = _get_tfr_series("Finland")
        assert len(series) >= 5
        assert 2000 in series or any(y >= 1990 for y in series)

    def test_unknown_country_empty(self):
        series = _get_tfr_series("Atlantis")
        assert len(series) == 0


class TestEventStudy:
    @pytest.fixture
    def result(self):
        return event_study()

    def test_returns_result(self, result):
        assert isinstance(result, EventStudyResult)
        assert result.rollout_type == "4G"

    def test_has_coefficients(self, result):
        assert len(result.coefficients) > 0

    def test_default_window(self, result):
        taus = [c.tau for c in result.coefficients]
        assert -5 in taus
        assert 0 in taus
        assert 10 in taus

    def test_tau_zero_is_zero(self, result):
        at_zero = next(c for c in result.coefficients if c.tau == 0)
        assert at_zero.mean_tfr_change == 0.0

    def test_uses_multiple_countries(self, result):
        assert result.n_countries_used >= 3

    def test_interpretation_present(self, result):
        assert len(result.interpretation) > 20

    def test_pre_post_magnitudes(self, result):
        assert result.pre_trend_magnitude >= 0
        assert isinstance(result.post_effect_magnitude, float)

    def test_custom_window(self):
        result = event_study(event_window=range(-2, 3))
        taus = [c.tau for c in result.coefficients]
        assert taus == [-2, -1, 0, 1, 2]

    def test_coefficient_has_n_obs(self):
        result = event_study(event_window=range(-1, 2))
        for c in result.coefficients:
            assert c.n_obs >= 0
