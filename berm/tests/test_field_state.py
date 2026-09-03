"""Focused tests for the FieldState physics/data boundary."""

from __future__ import annotations

import math

import pytest

from berm.exposure.lindgren import two_channel_exposure
from berm.physics.field_state import (
    R42_WINDOW,
    assess_field_state_completeness,
    CircadianState,
    FieldState,
    ReceptorState,
    SourceCoupling,
    SpectralBin,
    TransferMatrix,
    Vector3,
    evaluate_field_state,
)


def test_package_exports_field_state_contract():
    from berm.physics import FieldState as PackageFieldState
    from berm.physics import assess_field_state_completeness as package_status

    assert PackageFieldState is FieldState
    assert package_status is assess_field_state_completeness


def test_legacy_adapter_exactly_preserves_two_channel_scalar_semantics():
    state = FieldState.from_legacy_channels(ambient=0.5, personal=0.3)
    result = evaluate_field_state(state, ReceptorState(organ="testis"))

    expected = float(two_channel_exposure(0.5, 0.3))
    assert result.legacy_timing_proxy == pytest.approx(expected)
    assert result.selected_vector_magnitude == pytest.approx(expected)
    assert result.chi == pytest.approx(0.5 / math.sqrt(1.0 + 0.5**2))
    assert result.completeness.status == "LEGACY_TIMING_PROXY"
    assert not result.completeness.measurement_ready


def test_proxy_cannot_silently_be_reported_as_a_full_physical_field_state():
    state = FieldState(
        background=Vector3.scalar(0.2),
        ambient=Vector3.scalar(0.2),
        personal=Vector3.scalar(0.4),
        normalization_id="national_mobile_proxy",
        provenance={"source_id": "WORLD_BANK_MOBILE"},
    )
    status = assess_field_state_completeness(state)

    assert status.status == "PARTIAL_FIELD_STATE"
    assert not status.measurement_ready
    assert "organ_transfer" in status.missing_components
    assert "measured_background_vector" in status.missing_components


def test_context_and_native_geomagnetic_units_are_carried_without_mixing_units():
    state = FieldState(
        background=Vector3.scalar(0.2),
        ambient=Vector3.scalar(0.2),
        personal=Vector3.scalar(0.4),
        normalization_id="calibrated_potential_v1",
        country="FIN",
        area="Helsinki",
        setting="household",
        cohort_id=1995,
        biological_sex="female",
        life_stage="reproductive_age",
        geomagnetic_b0=Vector3(18_000.0, 1_000.0, 45_000.0),
        geomagnetic_b0_unit="nT",
    )

    assert state.cohort_id == 1995
    assert state.geomagnetic_b0_unit == "nT"


def test_native_geomagnetic_vector_requires_its_unit():
    with pytest.raises(ValueError, match="geomagnetic_b0_unit"):
        FieldState(
            background=Vector3.scalar(0.2),
            ambient=Vector3.scalar(0.2),
            personal=Vector3.scalar(0.4),
            normalization_id="fixture",
            geomagnetic_b0=Vector3(18_000.0, 1_000.0, 45_000.0),
        )


def test_vector_geometry_is_retained_while_legacy_proxy_remains_magnitude_only():
    common = dict(
        background=Vector3(1.0, 0.0, 0.0),
        ambient=Vector3(1.0, 0.0, 0.0),
        normalization_id="fixture",
    )
    aligned = FieldState(**common, personal=Vector3(1.0, 0.0, 0.0))
    perpendicular = FieldState(**common, personal=Vector3(0.0, 1.0, 0.0))
    receptor = ReceptorState(organ="testis", tissue_axis=Vector3(1.0, 0.0, 0.0))

    aligned_result = evaluate_field_state(aligned, receptor)
    perpendicular_result = evaluate_field_state(perpendicular, receptor)

    assert aligned_result.legacy_timing_proxy == pytest.approx(
        perpendicular_result.legacy_timing_proxy
    )
    assert aligned_result.geometric_cross_term == pytest.approx(2.0)
    assert perpendicular_result.geometric_cross_term == pytest.approx(0.0)
    assert aligned_result.background_personal_cosine == pytest.approx(1.0)
    assert perpendicular_result.background_personal_cosine == pytest.approx(0.0)
    assert aligned_result.tissue_axis_projection > perpendicular_result.tissue_axis_projection


def test_coherent_cross_term_requires_explicit_phase_and_coherence():
    base = dict(
        background=Vector3(1.0, 0.0, 0.0),
        ambient=Vector3(0.0, 0.0, 0.0),
        personal=Vector3(2.0, 0.0, 0.0),
        normalization_id="fixture",
    )
    unknown = evaluate_field_state(FieldState(**base), ReceptorState(organ="testis"))
    in_phase = evaluate_field_state(
        FieldState(
            **base,
            source_coupling=SourceCoupling(
                relative_phase_rad=0.0,
                coherence=0.5,
                coherence_time_seconds=10.0,
            ),
        ),
        ReceptorState(organ="testis"),
    )
    anti_phase = evaluate_field_state(
        FieldState(
            **base,
            source_coupling=SourceCoupling(
                relative_phase_rad=math.pi,
                coherence=0.5,
                coherence_time_seconds=10.0,
            ),
        ),
        ReceptorState(organ="testis"),
    )

    assert unknown.geometric_cross_term == pytest.approx(4.0)
    assert unknown.coherent_cross_term == 0.0
    assert in_phase.coherent_cross_term == pytest.approx(2.0)
    assert anti_phase.coherent_cross_term == pytest.approx(-2.0)


def test_measurement_ready_state_requires_coherence_duration() -> None:
    coupling = SourceCoupling(relative_phase_rad=0.0, coherence=0.8)
    assert coupling.coherence_time_seconds is None
    with pytest.raises(ValueError):
        SourceCoupling(coherence_time_seconds=0.0)


def test_measured_spectral_overlap_and_circadian_context_are_explicit():
    state = FieldState(
        background=Vector3.scalar(0.2),
        ambient=Vector3.scalar(0.2),
        personal=Vector3.scalar(0.4),
        normalization_id="fixture",
        ambient_envelope_psd=(SpectralBin(0.030, 4.0, 0.010),),
        mixed_envelope_psd=(SpectralBin(0.030, 2.0, 0.020),),
        circadian=CircadianState(night_fraction=0.75, state_id="measured_night"),
    )
    result = evaluate_field_state(
        state,
        ReceptorState(organ="testis", frequency_window=R42_WINDOW),
    )

    assert result.ambient_envelope_overlap == pytest.approx(0.04)
    assert result.mixed_envelope_overlap == pytest.approx(0.04)
    assert result.window_id == "R42_20_40_mHz"
    assert result.night_selected_projection == pytest.approx(
        0.75 * result.tissue_axis_projection
    )


def test_transfer_is_named_and_changes_local_state_without_mutating_input():
    state = FieldState(
        background=Vector3(1.0, 0.0, 0.0),
        ambient=Vector3(1.0, 0.0, 0.0),
        personal=Vector3(1.0, 0.0, 0.0),
        normalization_id="fixture",
    )
    attenuation = TransferMatrix(
        row_x=Vector3(0.5, 0.0, 0.0),
        row_y=Vector3(0.0, 1.0, 0.0),
        row_z=Vector3(0.0, 0.0, 1.0),
        transfer_id="testis_fixture",
    )
    attenuated = evaluate_field_state(state, ReceptorState(organ="testis"), attenuation)
    identity = evaluate_field_state(state, ReceptorState(organ="testis"))

    assert attenuated.transfer_id == "testis_fixture"
    assert attenuated.background_magnitude == pytest.approx(0.5)
    assert attenuated.selected_vector_magnitude < identity.selected_vector_magnitude
    assert state.background == Vector3(1.0, 0.0, 0.0)


@pytest.mark.parametrize(
    "constructor",
    [
        lambda: Vector3(float("nan"), 0.0, 0.0),
        lambda: SpectralBin(0.030, -1.0, 0.010),
        lambda: SourceCoupling(coherence=1.01),
        lambda: CircadianState(night_fraction=1.01),
        lambda: ReceptorState(organ="testis", tissue_axis=Vector3(0.0, 0.0, 0.0)),
        lambda: FieldState(
            background=Vector3.scalar(0.1),
            ambient=Vector3.scalar(0.1),
            personal=Vector3.scalar(0.1),
            normalization_id="",
        ),
    ],
)
def test_invalid_inputs_fail_loudly(constructor):
    with pytest.raises(ValueError):
        constructor()
