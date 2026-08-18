"""Tests for pre-telecom ambient EMF: military radar + broadcast."""

import math
import pytest

from berm.exposure.military_ambient import (
    military_ambient,
    broadcast_ambient,
    total_pre_telecom,
    military_base_level,
    _mil_curve,
    _broadcast_curve,
    NATO_COUNTRIES,
    WARSAW_PACT,
)


class TestMilCurve:
    def test_zero_before_1950(self):
        assert _mil_curve(1940) == 0.0
        assert _mil_curve(1949) == 0.0

    def test_ramp_1950_1965(self):
        assert _mil_curve(1950) == 0.0
        assert _mil_curve(1957) == pytest.approx(7 / 15.0)
        assert _mil_curve(1965) == pytest.approx(1.0)

    def test_plateau_1965_1985(self):
        assert _mil_curve(1965) == pytest.approx(1.0)
        assert _mil_curve(1975) == 1.0
        assert _mil_curve(1985) == pytest.approx(1.0)

    def test_decline_1985_2000(self):
        assert _mil_curve(1985) == pytest.approx(1.0)
        assert _mil_curve(1990) == pytest.approx(1.0 - 0.7 * 5 / 15.0)
        assert _mil_curve(2000) == pytest.approx(0.3)

    def test_residual_after_2000(self):
        assert _mil_curve(2000) == pytest.approx(0.3)
        assert _mil_curve(2010) == 0.3
        assert _mil_curve(2025) == 0.3

    def test_monotonic_ramp(self):
        values = [_mil_curve(y) for y in range(1950, 1966)]
        for i in range(len(values) - 1):
            assert values[i] <= values[i + 1]

    def test_monotonic_decline(self):
        values = [_mil_curve(y) for y in range(1985, 2001)]
        for i in range(len(values) - 1):
            assert values[i] >= values[i + 1]


class TestBroadcastCurve:
    def test_zero_before_1950(self):
        assert _broadcast_curve(1940) == 0.0

    def test_logistic_growth(self):
        v1960 = _broadcast_curve(1960)
        v1975 = _broadcast_curve(1975)
        v1990 = _broadcast_curve(1990)
        assert 0 < v1960 < v1975 < v1990

    def test_saturates_near_one(self):
        assert _broadcast_curve(2000) > 0.95


class TestMilitaryBaseLevel:
    def test_nato_countries(self):
        for c in NATO_COUNTRIES:
            assert military_base_level(c) == 0.3

    def test_warsaw_pact(self):
        for c in WARSAW_PACT:
            assert military_base_level(c) == 0.4

    def test_special_countries(self):
        assert military_base_level("Israel") == 0.6
        assert military_base_level("SouthKorea") == 0.5
        assert military_base_level("Japan") == 0.3
        assert military_base_level("Finland") == 0.15

    def test_default(self):
        assert military_base_level("Niger") == 0.05
        assert military_base_level("India") == 0.05


class TestMilitaryAmbient:
    def test_zero_before_1950(self):
        assert military_ambient("USA", 1940) == 0.0

    def test_usa_peak(self):
        assert military_ambient("USA", 1975) == pytest.approx(0.3)

    def test_warsaw_higher_than_nato(self):
        assert military_ambient("Poland", 1975) > military_ambient("USA", 1975)

    def test_israel_highest_special(self):
        assert military_ambient("Israel", 1975) > military_ambient("USA", 1975)

    def test_developing_country_low(self):
        assert military_ambient("Niger", 1975) == pytest.approx(0.05)

    def test_finland_moderate(self):
        val = military_ambient("Finland", 1975)
        assert 0.1 < val < 0.3

    def test_residual_post_2000(self):
        val = military_ambient("USA", 2020)
        assert val == pytest.approx(0.3 * 0.3)


class TestBroadcastAmbient:
    def test_zero_before_1950(self):
        assert broadcast_ambient("USA", 1940) == 0.0

    def test_usa_saturated(self):
        val = broadcast_ambient("USA", 2000)
        assert val == pytest.approx(0.3, abs=0.02)

    def test_country_specific_base(self):
        assert broadcast_ambient("USA", 2000) > broadcast_ambient("Finland", 2000)

    def test_default_country(self):
        val = broadcast_ambient("SomeCountry", 2000)
        assert val > 0


class TestTotalPreTelecom:
    def test_sum_of_components(self):
        country, year = "USA", 1975
        total = total_pre_telecom(country, year)
        mil = military_ambient(country, year)
        bcast = broadcast_ambient(country, year)
        assert total == pytest.approx(mil + bcast)

    def test_zero_before_1950(self):
        assert total_pre_telecom("USA", 1940) == 0.0

    def test_peak_cold_war_substantial(self):
        val = total_pre_telecom("USA", 1975)
        assert val > 0.4

    def test_niger_low(self):
        val = total_pre_telecom("Niger", 1975)
        assert val < 0.2
