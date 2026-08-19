"""Focused tests for the static textile/skin and host/vegetation interface contract."""

from __future__ import annotations

import math

import pytest

from berm.physics.static_tribo_interface import (
    TICK_HOST_REFERENCE_E_FIELD_V_PER_M,
    ChargeDecayPoint,
    InterfaceConditions,
    StaticMeasurement,
    StaticTriboelectricInterface,
    assess_static_interface_completeness,
    compare_to_tick_host_reference_field,
    estimate_rc_relaxation_time,
    estimate_uniform_gap_field,
    field_slew_rate,
    fit_single_exponential_relaxation,
    induced_polarization_force_proxy,
)


def _conditions(**overrides):
    values = {
        "material_pair": ("PET textile", "human scrotal skin"),
        "interface_id": "fixture",
        "relative_humidity": 0.35,
        "temperature_c": 22.0,
        "gap_m": 0.001,
        "contact_area_m2": 0.01,
        "contact_pressure_pa": 100.0,
        "sliding_speed_m_per_s": 0.05,
        "motion_state": "walking",
        "grounding_status": "controlled_reference",
        "ground_path_impedance_ohm": 1e9,
        "capacitance_to_reference_f": 100e-12,
        "reference_electrode_id": "ground-plane-1",
        "antistatic_treatment": "untreated",
        "geometry_id": "fixture_geometry",
    }
    values.update(overrides)
    return InterfaceConditions(**values)


def test_historical_v_per_cm_squared_reading_is_preserved_but_not_mislabelled_as_field():
    reading = StaticMeasurement(
        kind="instrument_normalized_surface_reading",
        value=338.9,
        unit="V/cm²",
        measurement_id="shafik_style_reading",
        reference="not_reported",
    )
    state = StaticTriboelectricInterface(
        conditions=_conditions(grounding_status="not_reported", geometry_id="not_reported"),
        measurements=(reading,),
    )

    assert reading.is_historical_instrument_reading
    assert not reading.supports_si_field_map
    assert assess_static_interface_completeness(state).status == "HISTORICAL_INTERFACE_PROXY"


def test_uniform_gap_estimate_requires_true_volts_and_declared_geometry():
    estimate = estimate_uniform_gap_field(
        100.0,
        0.002,
        relative_permittivity=2.0,
        area_m2=0.01,
    )

    assert estimate.electric_field_v_per_m == pytest.approx(50_000.0)
    assert estimate.surface_charge_density_c_per_m2 == pytest.approx(
        2.0 * 8.854_187_812_8e-12 * 50_000.0
    )
    assert estimate.total_charge_c == pytest.approx(
        estimate.surface_charge_density_c_per_m2 * 0.01
    )
    assert "parallel-plate" in estimate.assumption.lower()


def test_empirical_charge_relaxation_fit_has_no_universal_material_time_constant():
    fit = fit_single_exponential_relaxation(
        (
            ChargeDecayPoint(0.0, 100.0, "q0"),
            ChargeDecayPoint(10.0, 50.0, "q10"),
        ),
        unit="relative_meter_units",
        fit_id="dry_pet_fixture",
    )

    assert fit.tau_s == pytest.approx(10.0 / math.log(2.0))
    assert fit.predicted_magnitude(10.0) == pytest.approx(50.0)
    assert "empirical" in fit.model_note.lower()


def test_measurement_ready_requires_field_charge_time_reference_geometry_conditions_and_provenance():
    fit = fit_single_exponential_relaxation(
        (
            ChargeDecayPoint(0.0, 2e-8, "charge_0"),
            ChargeDecayPoint(60.0, 1e-8, "charge_60"),
        ),
        unit="C",
        fit_id="fixture_decay",
    )
    measurements = (
        StaticMeasurement(
            kind="electric_field",
            value=1_000.0,
            unit="V/m",
            measurement_id="field_map",
            reference="ground_plane",
            probe_distance_m=0.002,
            probe_area_m2=1e-4,
            calibration_id="cal-1",
            probe_axis=(0.0, 0.0, 1.0),
            instrument_bandwidth_hz=100.0,
            input_impedance_ohm=1e12,
        ),
        StaticMeasurement(
            kind="charge",
            value=2e-8,
            unit="C",
            measurement_id="charge",
            reference="faraday_cup_to_ground",
        ),
    )
    state = StaticTriboelectricInterface(
        conditions=_conditions(),
        measurements=measurements,
        decay_fit=fit,
        provenance={"source_id": "fixture", "collection_method": "field_mill_and_faraday_cup"},
    )

    status = assess_static_interface_completeness(state)
    assert status.status == "MEASUREMENT_READY_STATIC_INTERFACE"
    assert status.measurement_ready
    assert not status.missing_components


def test_tick_reference_comparison_is_a_field_magnitude_ratio_not_a_gradient_or_lift_claim():
    assert compare_to_tick_host_reference_field(TICK_HOST_REFERENCE_E_FIELD_V_PER_M) == pytest.approx(1.0)
    assert compare_to_tick_host_reference_field(-150_000.0) == pytest.approx(0.5)


def test_induced_polarization_force_proxy_requires_gradient_and_polarizability():
    assert induced_polarization_force_proxy(4.0, 3.0) == pytest.approx(6.0)
    assert induced_polarization_force_proxy(-4.0, 3.0) == pytest.approx(-6.0)
    with pytest.raises(ValueError, match="polarizability"):
        induced_polarization_force_proxy(4.0, 0.0)


def test_field_slew_rate_retains_direction_and_validates_time():
    assert field_slew_rate(100.0, 160.0, 2.0) == pytest.approx(30.0)
    with pytest.raises(ValueError, match="delta_t_s"):
        field_slew_rate(100.0, 160.0, 0.0)


def test_rc_relaxation_is_a_checked_fixture_approximation_not_an_empirical_decay_replacement():
    assert estimate_rc_relaxation_time(1e9, 100e-12) == pytest.approx(0.1)
    with pytest.raises(ValueError, match="capacitance"):
        estimate_rc_relaxation_time(1e9, 0.0)
