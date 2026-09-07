"""Tests for the IPR mechanism candidate (receptor layer only).

They lock the synthesis §15 numbers, the λ limits, the reverse-τ calculation's
status, the Gavoçi null in the validation set and the rule that the receptor
layer never emits a population figure.
"""

from __future__ import annotations

import math

import pytest
from scipy.special import jv

from berm.physics import ipr_mechanism as m


# === reference frequency and index ===

def test_bare_calcium_cyclotron_frequency_at_37_microtesla() -> None:
    f_c = m.cyclotron_frequency(m.charge_to_mass(m.ION_TABLE["Ca2+"]), 37e-6)
    assert f_c == pytest.approx(28.35, abs=0.02)


def test_synthesis_reference_frequency_is_not_the_bare_ion_value() -> None:
    """The synthesis takes f_c = 25.2 Hz; bare Ca2+ at 37 µT gives 28.35 Hz.
    The module records the discrepancy rather than hiding it."""
    ex = m.koch_2003_worked_example()
    assert ex["bare_Ca2+_f_c_at_B0_Hz"] == pytest.approx(28.35, abs=0.02)
    assert ex["B0_for_bare_Ca2+_at_25.2Hz_T"] == pytest.approx(32.9e-6, rel=1e-2)
    assert "KANDIDAATTI" in m.KOCH_2003_EXAMPLE.f_c_source


def test_isotope_exchange_shifts_reference_frequency_by_mass_only() -> None:
    ca40 = m.Ion("40Ca2+", 2, 39.9626)
    ca44 = m.Ion("44Ca2+", 2, 43.9555)
    B0 = 37e-6
    ratio = m.cyclotron_frequency(m.charge_to_mass(ca44), B0) / m.cyclotron_frequency(
        m.charge_to_mass(ca40), B0
    )
    assert ratio == pytest.approx(39.9626 / 43.9555, rel=1e-9)


def test_resonance_index_rounds_to_nearest_integer() -> None:
    assert m.resonance_index(25.2, 24.0) == 1
    assert m.resonance_index(50.0, 24.0) == 2
    with pytest.raises(ValueError):
        m.resonance_index(25.2, 0.0)


# === relaxation sensitivity ===

def test_lambda_limits_one_and_one_plus_c_gamma() -> None:
    assert m.relaxation_sensitivity(24.0, 0.0) == pytest.approx(1.0)
    assert m.relaxation_sensitivity(24.0, 1e6) == pytest.approx(2.0, rel=1e-9)
    assert m.relaxation_sensitivity(24.0, 1e6, c_gamma=0.5) == pytest.approx(1.5, rel=1e-9)


def test_lambda_is_monotone_in_tau() -> None:
    values = [m.relaxation_sensitivity(24.0, t) for t in (0.0, 0.002, 0.01, 0.02, 0.1, 1.0)]
    assert values == sorted(values)


# === synthesis §15 worked example ===

def test_koch_2003_numbers_match_the_synthesis() -> None:
    ex = m.koch_2003_worked_example()
    assert ex["u"] == pytest.approx(3.01593, abs=1e-5)
    assert ex["lambda"] == pytest.approx(1.92428, abs=1e-5)
    assert ex["s"] == pytest.approx(2.02049, abs=1e-5)
    assert ex["coefficient_mismatch_vs_2"] == pytest.approx(0.01025, abs=1e-5)
    assert ex["b_max_T"] == pytest.approx(33.7e-6, rel=2e-3)
    assert ex["b_null_T"] == pytest.approx(70.2e-6, rel=2e-3)


def test_reverse_tau_is_17_6_ms_and_labelled_as_numerical_compatibility() -> None:
    tau = m.inverse_tau_for_argument_scale(24.0, 25.2, 2.0)
    assert tau == pytest.approx(0.017629, abs=1e-6)
    # the forward calculation with that tau must give s = 2 exactly
    lam = m.relaxation_sensitivity(24.0, tau)
    assert m.argument_scale(lam, 25.2, 24.0) == pytest.approx(2.0, abs=1e-9)
    ex = m.koch_2003_worked_example()
    assert "not a blind prediction" in str(ex["status"])
    assert "NUMEERINEN" in str(ex["status"])


def test_reverse_tau_rejects_unreachable_scale() -> None:
    with pytest.raises(ValueError):
        m.inverse_tau_for_argument_scale(24.0, 25.2, target_s=5.0)  # lambda > 2


# === Bessel structure ===

def test_first_maximum_and_null_sit_on_j1() -> None:
    lam, f_c, f, B0 = 1.92428, 25.2, 24.0, 37e-6
    s = m.argument_scale(lam, f_c, f)
    z_max = s * m.first_j1_maximum_amplitude(lam, f_c, f, B0) / B0
    z_null = s * m.first_j1_null_amplitude(lam, f_c, f, B0) / B0
    assert jv(1, z_max) == pytest.approx(0.58187, abs=1e-4)
    assert abs(jv(1, z_null)) < 1e-6


def test_readouts_are_distinct_functions_and_interference_can_go_negative() -> None:
    z = 2.0
    amp = m.readout_value(m.Readout.AMPLITUDE, 1, z)
    rate = m.readout_value(m.Readout.RATE, 1, z)
    assert rate == pytest.approx(amp * amp)
    # interference relative to reference: below a_ref^2 when a_1 < 0
    below = m.readout_value(m.Readout.INTERFERENCE, 1, z, a_ref=1.0, a_1=-1.0)
    above = m.readout_value(m.Readout.INTERFERENCE, 1, z, a_ref=1.0, a_1=1.0)
    assert below < 1.0 < above
    # a null readout exists at a J1 zero for every readout
    z0 = m.J1_FIRST_NULL
    assert abs(m.readout_value(m.Readout.AMPLITUDE, 1, z0)) < 1e-6
    assert m.readout_value(m.Readout.INTERFERENCE, 1, z0) == pytest.approx(1.0, abs=1e-6)


# === layer boundary ===

def test_receptor_layer_emits_no_population_field() -> None:
    r = m.mechanism_response(
        m.MechanismInputs(q_m=m.charge_to_mass(m.ION_TABLE["Ca2+"]), B0=37e-6, b=33.7e-6, f=24.0, tau=0.02)
    )
    forbidden = {"tfr", "asfr", "fertility", "births", "population"}
    assert not (set(r._fields) & forbidden)
    assert any("NOT COMPUTED" in tag for tag in r.epistemic)
    assert any("KANDIDAATTI" in tag for tag in r.epistemic)


def test_calculation_order_is_u_lambda_s_z_j() -> None:
    r = m.mechanism_response(
        m.MechanismInputs(q_m=m.charge_to_mass(m.ION_TABLE["Ca2+"]), B0=37e-6, b=20e-6, f=24.0, tau=0.02)
    )
    assert r.u == pytest.approx(2 * math.pi * 24.0 * 0.02)
    assert r.lambda_ == pytest.approx(m.relaxation_sensitivity(24.0, 0.02))
    assert r.s == pytest.approx(r.lambda_ * r.f_c / 24.0)
    assert r.z == pytest.approx(r.s * 20e-6 / 37e-6)
    assert r.j_n_z == pytest.approx(float(jv(r.n, r.z)))


# === null result stays in the validation set ===

def test_gavoci_null_is_a_constraint_not_an_exception() -> None:
    g = m.gavoci_2013_null_check()
    assert g["predicted_non_null"] == 1.0  # the candidate predicts a response
    assert "no significant change" in str(g["observed"])
    assert "null result" in str(g["status"])
    assert "independent measurement" in str(g["constraint"])
    assert m.GAVOCI_2013_NULL.reference_id == "gavoci2013_ipr_k_null"
