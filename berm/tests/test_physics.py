"""Tests for BERM physics layer: GME mixing, R42 envelope, 3GPP convergence."""

import math
import pytest

from berm.physics.gme_mixing import (
    gme_background_response,
    gme_nonlinear_coefficient,
    gme_envelope_selfmixing,
)
from berm.physics.r42_envelope import (
    r42_window,
    xi_r42_pulse_train,
    xi_r42_from_protocol,
    r43_locked_conditions,
    protocol_landscape,
    R42_CENTER_HZ,
    R42_LOW_HZ,
    R42_HIGH_HZ,
)
from berm.physics.threegpp_convergence import (
    edrx_r42_analysis,
    convergence_significance,
    EDRX_CYCLES_SECONDS,
    PTW_VALUES_SECONDS,
)


# ── GME mixing ──

class TestGMEBackgroundResponse:
    def test_zero_gives_zero(self):
        assert gme_background_response(0.0) == 0.0

    def test_one_gives_1_5(self):
        assert gme_background_response(1.0) == pytest.approx(1.5)

    def test_large_approaches_3(self):
        assert gme_background_response(1000.0) == pytest.approx(3.0, abs=0.01)

    def test_monotonically_increasing(self):
        values = [gme_background_response(a) for a in [0.1, 0.5, 1.0, 2.0, 10.0]]
        for i in range(len(values) - 1):
            assert values[i] < values[i + 1]


class TestGMENonlinearCoefficient:
    def test_zero_diverges(self):
        c = gme_nonlinear_coefficient(0.0)
        assert c == float("-inf")

    def test_near_zero_negative(self):
        c = gme_nonlinear_coefficient(0.01)
        assert c < -50

    def test_zero_crossing_near_inv_sqrt2(self):
        c = gme_nonlinear_coefficient(1.0 / math.sqrt(2))
        assert abs(c) < 0.01

    def test_one_gives_0_5(self):
        c = gme_nonlinear_coefficient(1.0)
        assert c == pytest.approx(0.5)

    def test_large_approaches_2_over_alpha(self):
        c = gme_nonlinear_coefficient(100.0)
        assert c == pytest.approx(2.0 / 100.0, abs=0.001)


class TestGMEEnvelopeSelfmixing:
    def test_empty_series(self):
        result = gme_envelope_selfmixing([], bar_A=1.0)
        assert result["baseband_rms"] == 0.0

    def test_nonzero_series(self):
        result = gme_envelope_selfmixing([1.0, 2.0, 3.0], bar_A=1.0)
        assert result["baseband_rms"] > 0
        assert result["K_G_squared"] > 0

    def test_higher_bar_A_lower_coupling(self):
        r1 = gme_envelope_selfmixing([1.0], bar_A=0.5)
        r2 = gme_envelope_selfmixing([1.0], bar_A=5.0)
        assert r1["K_G_squared"] > r2["K_G_squared"]


# ── R42 envelope ──

class TestR42Window:
    def test_center_is_one(self):
        assert r42_window(R42_CENTER_HZ) == pytest.approx(1.0)

    def test_far_from_center_near_zero(self):
        assert r42_window(0.1) < 0.01
        assert r42_window(0.001) < 0.01

    def test_symmetric(self):
        offset = 0.005
        w_low = r42_window(R42_CENTER_HZ - offset)
        w_high = r42_window(R42_CENTER_HZ + offset)
        assert w_low == pytest.approx(w_high, abs=1e-10)


class TestXiR42PulseTrain:
    def test_33s_higher_than_10s(self):
        xi_33 = xi_r42_pulse_train(33.28)
        xi_10 = xi_r42_pulse_train(10.24)
        assert xi_33 > xi_10

    def test_center_period_is_maximum(self):
        periods = [10.24, 20.48, 25.60, 33.28, 40.96, 81.92, 163.84]
        xis = {T: xi_r42_pulse_train(T) for T in periods}
        max_T = max(xis, key=xis.get)
        assert max_T == 33.28

    def test_positive_values(self):
        for T in [10, 20, 33, 50, 100]:
            assert xi_r42_pulse_train(float(T)) >= 0


class TestXiR42FromProtocol:
    def test_returns_expected_keys(self):
        result = xi_r42_from_protocol(40.96, 33.28)
        assert "xi_total" in result
        assert "xi_edrx_layer" in result
        assert "dominant_layer" in result

    def test_xi_positive(self):
        result = xi_r42_from_protocol(40.96, 33.28)
        assert result["xi_total"] > 0


class TestR43LockedConditions:
    def test_eight_conditions(self):
        conds = r43_locked_conditions()
        assert len(conds) == 8

    def test_c4_center_is_highest(self):
        conds = r43_locked_conditions()
        assert conds[0]["id"] == "C4_center"
        assert conds[0]["xi_norm"] == 1.0

    def test_all_have_xi(self):
        for c in r43_locked_conditions():
            assert "xi_r42" in c
            assert "xi_norm" in c
            assert c["xi_r42"] >= 0

    def test_predicted_ordering(self):
        conds = r43_locked_conditions()
        ids = [c["id"] for c in conds]
        assert ids.index("C4_center") < ids.index("C5_edrx")
        assert ids.index("C5_edrx") < ids.index("C3_inside")
        assert ids.index("C3_inside") < ids.index("C1_fast")


class TestProtocolLandscape:
    def test_returns_nonempty(self):
        results = protocol_landscape()
        assert len(results) > 0

    def test_sorted_descending(self):
        results = protocol_landscape()
        for i in range(len(results) - 1):
            assert results[i]["xi_total"] >= results[i + 1]["xi_total"]


# ── 3GPP convergence ──

class TestEdrxR42Analysis:
    def test_edrx_40_96_in_r42(self):
        analysis = edrx_r42_analysis()
        edrx_freqs = [e["T_s"] for e in analysis["edrx_in_r42"]]
        assert 40.96 in edrx_freqs

    def test_ptw_33_28_closest(self):
        analysis = edrx_r42_analysis()
        closest = min(analysis["ptw_in_r42"], key=lambda x: x["deviation_pct"])
        assert closest["PTW_s"] == 33.28
        assert closest["deviation_pct"] < 0.5

    def test_seven_ptw_in_r42(self):
        analysis = edrx_r42_analysis()
        assert len(analysis["ptw_in_r42"]) == 7

    def test_summary_fraction(self):
        analysis = edrx_r42_analysis()
        assert analysis["summary"]["ptw_fraction_in_r42"] == pytest.approx(
            7 / 16, abs=0.01
        )


class TestConvergenceSignificance:
    def test_returns_p_values(self):
        sig = convergence_significance()
        assert "p_any_band" in sig
        assert "p_any_precise" in sig
        assert 0 < sig["p_any_band"] < 1
        assert 0 < sig["p_any_precise"] < 1

    def test_band_p_less_than_1(self):
        sig = convergence_significance()
        assert sig["p_any_band"] < 1.0

    def test_precise_smaller_than_band(self):
        sig = convergence_significance()
        assert sig["p_any_precise"] < sig["p_any_band"]
