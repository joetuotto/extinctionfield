"""Test peak-field exposure for pulsed radar systems."""

import math

from berm.biology.pathways import biological_sigmoid
from berm.exposure.pulsed_radar_peak import (
    PATHWAY_PEAK_SENSITIVITY,
    PEAK_WEIGHT,
    RECOVERY_LAYERS,
    RMS_WEIGHT,
    nike_lopar_peak_field,
    nike_lopar_rms_field,
    pathway_weighted_sigmoid,
    peak_rms_ratio,
    permanent_damage,
    sidelobe_peak_field,
    sidelobe_rms_field,
)

# Nike LOPAR: 1 MW peak, 33 dBi main lobe, -20 dB sidelobe,
# 400 Hz PRF, 1 us pulse, 2 deg beam.
NIKE = dict(p_peak_w=1e6, g_main_dbi=33.0, sidelobe_db=-20.0)
NIKE_DUTY = dict(prf_hz=400.0, pulse_s=1e-6, beam_deg=2.0)


def test_pathway_weights_sum_to_one():
    total = sum(v["weight"] for v in PATHWAY_PEAK_SENSITIVITY.values())
    assert abs(total - 1.0) < 1e-12


def test_peak_pathways_dominate():
    # A (VGIC), B (CRY/RPM) and D (HPA) respond to peak; only C (BBB) to RMS.
    assert abs(PEAK_WEIGHT - 0.85) < 1e-12
    assert abs(RMS_WEIGHT - 0.15) < 1e-12
    assert abs(PEAK_WEIGHT + RMS_WEIGHT - 1.0) < 1e-12


def test_recovery_layer_weights_sum_to_one():
    total = sum(layer["weight"] for layer in RECOVERY_LAYERS)
    assert abs(total - 1.0) < 1e-12


def test_recovery_alphas_in_unit_range():
    assert all(0.0 <= layer["alpha"] <= 1.0 for layer in RECOVERY_LAYERS)


def test_sidelobe_peak_field_inverse_distance():
    e1 = sidelobe_peak_field(r_m=1000.0, **NIKE)
    e2 = sidelobe_peak_field(r_m=2000.0, **NIKE)
    assert abs(e1 / e2 - 2.0) < 1e-10  # E ~ 1/r, power ~ 1/r^2


def test_nike_lopar_peak_field_at_1km():
    # Documented reference value: 24.5 V/m at 1 km sidelobe.
    assert abs(nike_lopar_peak_field(1.0) - 24.5) < 0.1


def test_nike_lopar_rms_field_at_1km():
    # Time-averaged field is three orders of magnitude smaller.
    assert abs(nike_lopar_rms_field(1.0) - 0.037) < 0.001


def test_peak_rms_ratio_matches_field_ratio():
    ratio = nike_lopar_peak_field(1.0) / nike_lopar_rms_field(1.0)
    assert abs(ratio - peak_rms_ratio(**NIKE_DUTY)) < 1e-9
    assert abs(ratio - 670.8) < 0.1  # documented 671:1


def test_peak_rms_ratio_independent_of_distance():
    for r_km in (0.5, 1.0, 10.0, 100.0):
        ratio = nike_lopar_peak_field(r_km) / nike_lopar_rms_field(r_km)
        assert abs(ratio - 670.8) < 0.1


def test_rms_equals_peak_at_unit_duty_cycle():
    # Continuous wave (duty cycle 1) collapses the peak/RMS distinction.
    cw = dict(prf_hz=1.0, pulse_s=1.0, beam_deg=360.0)
    e_peak = sidelobe_peak_field(r_m=1000.0, **NIKE)
    e_rms = sidelobe_rms_field(r_m=1000.0, **NIKE, **cw)
    assert abs(e_peak - e_rms) < 1e-9
    assert abs(peak_rms_ratio(**cw) - 1.0) < 1e-12


def test_pathway_weighted_sigmoid_between_components():
    e_peak = nike_lopar_peak_field(1.0)
    e_rms = nike_lopar_rms_field(1.0)
    s = pathway_weighted_sigmoid(e_peak, e_rms)
    assert biological_sigmoid(e_rms) < s < biological_sigmoid(e_peak)
    assert 0.0 < s < 1.0


def test_pathway_weighted_sigmoid_is_peak_dominated():
    # 85% peak weighting keeps the response high even when RMS is negligible.
    e_peak = nike_lopar_peak_field(1.0)
    e_rms = nike_lopar_rms_field(1.0)
    assert pathway_weighted_sigmoid(e_peak, e_rms) > 0.8
    assert biological_sigmoid(e_rms) < 0.05  # RMS alone would predict ~no effect


def test_sigmoid_half_response_distance_for_peak_field():
    # S(E_peak) crosses 50% near 95 km, S(E_rms) near 0.14 km.
    e_half = math.exp(-1.361)
    r_peak_km = nike_lopar_peak_field(1.0) / e_half
    r_rms_km = nike_lopar_rms_field(1.0) / e_half
    assert 90.0 < r_peak_km < 100.0
    assert 0.13 < r_rms_km < 0.15
    assert abs(biological_sigmoid(nike_lopar_peak_field(r_peak_km)) - 0.5) < 1e-6


def test_response_decreases_with_distance():
    responses = [
        pathway_weighted_sigmoid(nike_lopar_peak_field(r), nike_lopar_rms_field(r))
        for r in (0.5, 1.0, 10.0, 100.0, 1000.0)
    ]
    assert all(a > b for a, b in zip(responses, responses[1:]))


def test_permanent_damage_scales_with_irreversible_fraction():
    # Damage = S(E_peak) * sum((1 - alpha_i) * w_i); the sum is 0.575.
    e_peak = nike_lopar_peak_field(1.0)
    expected = biological_sigmoid(e_peak) * 0.575
    assert abs(permanent_damage(e_peak) - expected) < 1e-12


def test_permanent_damage_bounds():
    assert permanent_damage(1e-12) < 1e-6
    assert permanent_damage(1e6) < 0.575 + 1e-9
    assert permanent_damage(10.0) > permanent_damage(1.0)
