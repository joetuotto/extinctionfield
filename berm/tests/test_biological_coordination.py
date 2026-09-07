"""Numerical and integration checks for explicit coordination closures."""

from dataclasses import replace
import math

import pytest

from berm.biology.coordination import (
    HormoneReceptivityState, PhaseRelation, RedoxFunctionalState,
    ReproductiveCoordinationState, advance_chemical_memory, conditional_gate_success,
    phase_coordination, recovery_retention, steady_pulse_memory,
)
from berm.biology.reproductive_state import (
    BarrierState, CoupleReproductiveState, EndpointCapacityMapping,
    FemaleReproductiveState, MaleReproductiveState, OrganMemoryState,
    evolve_organ_memory_over_time, map_memory_to_capacity,
)
from berm.data.wpp import AGE_GROUPS
from berm.outcomes.fieldstate_asfr import AgeSpecificConditionalInput, project_conditional_asfr


def timing(lag: float = 0) -> HormoneReceptivityState:
    return HormoneReceptivityState(1, 0.5, 1, 0.5, lag, "declared relative signal units")


def test_hormone_overlap_matches_independent_full_cycle_quadrature() -> None:
    state = HormoneReceptivityState(3, 1.2, 2, 0.7, 1.1, "nmol/L")
    observed = math.fsum(
        (3 + 1.2 * math.cos(math.tau * step / 4096))
        * (2 + 0.7 * math.cos(math.tau * step / 4096 + 1.1))
        for step in range(4096)
    ) / 4096
    assert state.average_response == pytest.approx(observed, abs=1e-12)


def test_equal_means_preserve_timing_difference_and_scale_units() -> None:
    aligned, antiphase = timing(), timing(math.pi)
    assert aligned.average_response == pytest.approx(1.125)
    assert antiphase.average_response == pytest.approx(0.875)
    assert antiphase.timing_factor == pytest.approx(7 / 9)
    scaled = replace(antiphase, signal_mean=1000, signal_amplitude=500, signal_units="rescaled")
    assert scaled.average_response == pytest.approx(875)
    assert scaled.timing_factor == pytest.approx(antiphase.timing_factor)


def test_coordination_preserves_appropriate_antiphase_and_wraps_angles() -> None:
    assert phase_coordination((PhaseRelation(math.pi, math.pi),)) == pytest.approx(1)
    assert phase_coordination((PhaseRelation(0, math.pi),)) == pytest.approx(-1)
    relations = (PhaseRelation(0, 0, 3), PhaseRelation(math.pi, 0, 1))
    assert phase_coordination(relations) == pytest.approx(0.5)
    assert PhaseRelation(math.tau + 0.2, 0.2).alignment == pytest.approx(1)
    assert phase_coordination((PhaseRelation(0, 0, 1e308), PhaseRelation(math.pi, 0, 1e308))) == pytest.approx(0)


def test_same_redox_increment_improves_low_state_and_reduces_high_state() -> None:
    low = RedoxFunctionalState(0, 1, 0.5, "registered assay units")
    high = replace(low, value=1)
    assert replace(low, value=low.value + 0.5).functional_factor > low.functional_factor
    assert replace(high, value=high.value + 0.5).functional_factor < high.functional_factor
    assert high.functional_factor == 1
    assert replace(high, value=1e200).functional_factor == 0


def test_memory_uses_seconds_and_pulse_after_recovery_convention() -> None:
    tau = 3600 / math.log(2)
    assert advance_chemical_memory(8, increment=1, elapsed_seconds=3600, recovery_time_seconds=tau) == pytest.approx(5)
    assert advance_chemical_memory(8, increment=1, elapsed_seconds=0, recovery_time_seconds=tau) == 9
    assert recovery_retention(elapsed_seconds=7200, recovery_time_seconds=tau) == pytest.approx(0.25)
    assert steady_pulse_memory(increment=1, interval_seconds=360, recovery_time_seconds=3600) == pytest.approx(10.5083319448)
    assert steady_pulse_memory(increment=1, interval_seconds=10800, recovery_time_seconds=3600) == pytest.approx(1.05239569649)


def test_steady_pulse_memory_is_fixed_point_and_preserves_signed_chemical_state() -> None:
    for increment in (-0.3, 0, 2):
        stationary = steady_pulse_memory(increment=increment, interval_seconds=0.3, recovery_time_seconds=4)
        assert advance_chemical_memory(stationary, increment=increment, elapsed_seconds=0.3, recovery_time_seconds=4) == pytest.approx(stationary)


def test_physical_time_memory_reaches_existing_endpoint_path_and_keeps_provenance() -> None:
    memory = OrganMemoryState("OVARY", reversible_load=4, persistent_load=2, calibration_status="ENDPOINT_CALIBRATED")
    for _ in range(2):
        memory = evolve_organ_memory_over_time(
            memory, elapsed_seconds=3600, reversible_recovery_seconds=3600 / math.log(2),
            persistent_recovery_seconds=None, reversible_increment=1, persistent_increment=0.2,
            parameter_ids=("organ-recovery-scenario",), evidence_ids=("component-anchor",),
        )
    assert memory.reversible_load == pytest.approx(2.5)
    assert memory.persistent_load == pytest.approx(2.4)
    assert memory.parameter_ids == ("organ-recovery-scenario",)
    assert memory.evidence_ids == ("component-anchor",)
    assert memory.calibration_status == "STRUCTURAL_ONLY"
    endpoint = map_memory_to_capacity(memory, EndpointCapacityMapping(
        "reserve", "OVARY", 0.1, 0.2, parameter_ids=("registered-mapping",)
    ))
    assert endpoint.factor == pytest.approx(math.exp(-0.73))


def test_coordination_reaches_pair_and_asfr_and_exposes_mapping() -> None:
    clock = ReproductiveCoordinationState(hormone_timing=timing(math.pi), parameter_ids=("harmonic-clock-gate",))
    reference = CoupleReproductiveState(MaleReproductiveState(), FemaleReproductiveState())
    target = replace(reference, female=FemaleReproductiveState(coordination=clock))
    assert target.conception_capacity == pytest.approx(7 / 9)
    assert target.live_birth_support == 1
    projection = project_conditional_asfr(
        geography_id="SYNTHETIC", year=2026, reference_year=2025,
        groups=tuple(AgeSpecificConditionalInput(age, 100, reference, target) for age in AGE_GROUPS),
    )
    assert projection.predicted_tfr == pytest.approx(3.5 * 7 / 9)
    reported = projection.as_dict()["age_groups"][0]["biological_coordination"]["target"]
    assert reported["parameter_ids"] == ["harmonic-clock-gate"]
    assert reported["hormone_timing"]["signal_units"] == "declared relative signal units"
    assert projection.calibration_status == "STRUCTURAL_ONLY"


def test_explicit_gates_remain_default_and_coordination_cannot_double_count_or_calibrate() -> None:
    plain = FemaleReproductiveState(ovulatory_clock_gate=0.4, oocyte_redox_quality=0.5)
    assert plain.conception_capacity == pytest.approx(0.2)
    clock = ReproductiveCoordinationState(hormone_timing=timing(), parameter_ids=("timing",))
    redox = ReproductiveCoordinationState(oocyte_redox=RedoxFunctionalState(1, 1, 1, "relative"), parameter_ids=("redox",))
    with pytest.raises(ValueError, match="replaces ovulatory"):
        replace(plain, coordination=clock)
    with pytest.raises(ValueError, match="replaces oocyte"):
        replace(plain, coordination=redox)
    state = FemaleReproductiveState(
        coordination=clock, calibration_status="ENDPOINT_CALIBRATED",
        placental_barrier_support=BarrierState("PLACENTA", calibration_status="ENDPOINT_CALIBRATED"),
    )
    assert state.combined_calibration_status == "STRUCTURAL_ONLY"


def test_named_conditional_gates_use_chain_rule() -> None:
    gates = {name: 0.9 for name in ("encounter", "transport", "fertilization", "implantation", "support")}
    assert conditional_gate_success(gates) == pytest.approx(0.59049)
    assert conditional_gate_success({"first": 0, "next_given_first": 0.7}) == 0


@pytest.mark.parametrize("action", [
    lambda: timing(float("nan")),
    lambda: replace(timing(), signal_amplitude=2),
    lambda: replace(timing(), signal_mean=True),
    lambda: replace(timing(), signal_mean=0, signal_amplitude=0),
    lambda: replace(timing(), signal_units=""),
    lambda: phase_coordination(()),
    lambda: phase_coordination((PhaseRelation(0, 0, 0),)),
    lambda: PhaseRelation(0, 0, -1),
    lambda: RedoxFunctionalState(1, 1, 0, "units"),
    lambda: ReproductiveCoordinationState(hormone_timing=timing()),
    lambda: ReproductiveCoordinationState(hormone_timing=timing(), parameter_ids="mapping"),
    lambda: ReproductiveCoordinationState(parameter_ids=("empty",)),
    lambda: recovery_retention(elapsed_seconds=-1, recovery_time_seconds=1),
    lambda: recovery_retention(elapsed_seconds=1, recovery_time_seconds=0),
    lambda: steady_pulse_memory(increment=1, interval_seconds=0, recovery_time_seconds=1),
    lambda: conditional_gate_success({"stage": 1.1}),
])
def test_invalid_coordination_parameters_fail_explicitly(action) -> None:
    with pytest.raises(ValueError):
        action()
