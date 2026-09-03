"""Static triboelectric interface contract for the FieldState measurement module.

This module represents a *local, measured interface state* such as a textile-
skin contact or a host-vegetation air gap.  It deliberately does not turn a
material label (for example ``polyester``) or a historical instrument reading
into an organ dose or a fertility coefficient.

The central boundary is important for the BERM model:

* ``V`` is a potential difference only after a reference and geometry are
  declared;
* ``V / cm²`` reported by a historical meter is a physically underdetermined
  surface-instrument reading, not a convertible SI electric field;
* ``E(r,t)``, ``dE/dt`` and ``∇E²`` are retained separately because a charged
  textile/skin interface and an induced tick-host encounter have different
  physical couplings;
* charge relaxation is modelled only as an explicitly declared, empirical
  single-exponential fit.  It is not assumed to be a universal material
  constant.

The contract is diagnostic.  It exposes what must be measured before this
FieldState branch could be joined to a biological organ state.
"""

from __future__ import annotations

from dataclasses import dataclass, field
import math
from typing import Any, Literal, Mapping


STATIC_TRIBO_INTERFACE_VERSION = "static-tribo-interface-v1"
VACUUM_PERMITTIVITY_F_PER_M = 8.854_187_812_8e-12
TICK_HOST_REFERENCE_E_FIELD_V_PER_M = 300_000.0

MeasurementKind = Literal[
    "potential_difference",
    "electric_field",
    "charge",
    "charge_density",
    "field_slew_rate",
    "field_energy_gradient",
    "instrument_normalized_surface_reading",
]
GroundingStatus = Literal[
    "grounded",
    "floating",
    "controlled_reference",
    "not_reported",
]


def _finite(name: str, value: float) -> float:
    if isinstance(value, bool):
        raise ValueError(f"{name} must be a finite number, not a boolean")
    try:
        result = float(value)
    except (TypeError, ValueError) as exc:
        raise ValueError(f"{name} must be a finite number") from exc
    if not math.isfinite(result):
        raise ValueError(f"{name} must be a finite number")
    return result


def _nonnegative(name: str, value: float) -> float:
    result = _finite(name, value)
    if result < 0.0:
        raise ValueError(f"{name} must be non-negative")
    return result


def _positive(name: str, value: float) -> float:
    result = _nonnegative(name, value)
    if result <= 0.0:
        raise ValueError(f"{name} must be > 0")
    return result


def _nonempty(name: str, value: str) -> str:
    if not isinstance(value, str) or not value.strip():
        raise ValueError(f"{name} must be a non-empty string")
    return value.strip()


@dataclass(frozen=True)
class StaticMeasurement:
    """One documented measurement at a static or quasi-static interface.

    ``instrument_normalized_surface_reading`` is a compatibility name for a
    historic, physically underdetermined report such as Shafik's ``V/cm²``
    readings.  It may preserve a within-setup ordering, but it cannot be
    converted by this package into ``V/m`` or into a tissue field.
    """

    kind: MeasurementKind
    value: float
    unit: str
    measurement_id: str
    reference: str = "not_reported"
    probe_distance_m: float | None = None
    probe_area_m2: float | None = None
    calibration_id: str | None = None
    probe_axis: tuple[float, float, float] | None = None
    instrument_bandwidth_hz: float | None = None
    input_impedance_ohm: float | None = None
    timestamp_s: float | None = None

    def __post_init__(self) -> None:
        allowed = {
            "potential_difference",
            "electric_field",
            "charge",
            "charge_density",
            "field_slew_rate",
            "field_energy_gradient",
            "instrument_normalized_surface_reading",
        }
        if self.kind not in allowed:
            raise ValueError(f"unknown static measurement kind {self.kind!r}")
        object.__setattr__(self, "value", _finite("value", self.value))
        object.__setattr__(self, "unit", _nonempty("unit", self.unit))
        object.__setattr__(self, "measurement_id", _nonempty("measurement_id", self.measurement_id))
        object.__setattr__(self, "reference", _nonempty("reference", self.reference))
        for name in ("probe_distance_m", "probe_area_m2", "timestamp_s"):
            value = getattr(self, name)
            if value is not None:
                object.__setattr__(self, name, _nonnegative(name, value))
        if self.calibration_id is not None:
            object.__setattr__(self, "calibration_id", _nonempty("calibration_id", self.calibration_id))
        if self.probe_axis is not None:
            axis = tuple(_finite("probe_axis", value) for value in self.probe_axis)
            if len(axis) != 3 or math.isclose(sum(value * value for value in axis), 0.0):
                raise ValueError("probe_axis must be a non-zero three-component vector")
            object.__setattr__(self, "probe_axis", axis)
        for name in ("instrument_bandwidth_hz", "input_impedance_ohm"):
            value = getattr(self, name)
            if value is not None:
                object.__setattr__(self, name, _positive(name, value))

        expected_units = {
            "electric_field": "V/m",
            "charge": "C",
            "charge_density": "C/m²",
            "field_slew_rate": "V/(m·s)",
            "field_energy_gradient": "V²/m³",
        }
        expected = expected_units.get(self.kind)
        if expected is not None and self.unit != expected:
            raise ValueError(f"{self.kind} must use {expected}, got {self.unit!r}")

    @property
    def is_historical_instrument_reading(self) -> bool:
        return self.kind == "instrument_normalized_surface_reading"

    @property
    def supports_si_field_map(self) -> bool:
        return self.kind == "electric_field" and self.unit == "V/m"


@dataclass(frozen=True)
class InterfaceConditions:
    """Boundary conditions that govern charge creation, retention and geometry."""

    material_pair: tuple[str, str]
    interface_id: str
    relative_humidity: float | None = None
    temperature_c: float | None = None
    gap_m: float | None = None
    contact_area_m2: float | None = None
    contact_pressure_pa: float | None = None
    sliding_speed_m_per_s: float | None = None
    motion_state: str = "not_reported"
    grounding_status: GroundingStatus = "not_reported"
    ground_path_impedance_ohm: float | None = None
    capacitance_to_reference_f: float | None = None
    reference_electrode_id: str = "not_reported"
    antistatic_treatment: str = "not_reported"
    geometry_id: str = "not_reported"

    def __post_init__(self) -> None:
        if len(self.material_pair) != 2:
            raise ValueError("material_pair must contain exactly two named materials")
        object.__setattr__(
            self,
            "material_pair",
            tuple(_nonempty("material", material) for material in self.material_pair),
        )
        object.__setattr__(self, "interface_id", _nonempty("interface_id", self.interface_id))
        if self.relative_humidity is not None:
            humidity = _finite("relative_humidity", self.relative_humidity)
            if not 0.0 <= humidity <= 1.0:
                raise ValueError("relative_humidity must be in [0, 1]")
            object.__setattr__(self, "relative_humidity", humidity)
        if self.temperature_c is not None:
            object.__setattr__(self, "temperature_c", _finite("temperature_c", self.temperature_c))
        for name in (
            "gap_m",
            "contact_area_m2",
            "contact_pressure_pa",
            "sliding_speed_m_per_s",
        ):
            value = getattr(self, name)
            if value is not None:
                object.__setattr__(self, name, _nonnegative(name, value))
        if self.grounding_status not in {
            "grounded",
            "floating",
            "controlled_reference",
            "not_reported",
        }:
            raise ValueError(f"unknown grounding_status {self.grounding_status!r}")
        for name in ("ground_path_impedance_ohm", "capacitance_to_reference_f"):
            value = getattr(self, name)
            if value is not None:
                object.__setattr__(self, name, _positive(name, value))
        for name in (
            "motion_state",
            "reference_electrode_id",
            "antistatic_treatment",
            "geometry_id",
        ):
            object.__setattr__(self, name, _nonempty(name, getattr(self, name)))


@dataclass(frozen=True)
class ChargeDecayPoint:
    """A repeated measurement used to estimate one empirical decay constant."""

    elapsed_s: float
    magnitude: float
    source_measurement_id: str

    def __post_init__(self) -> None:
        object.__setattr__(self, "elapsed_s", _nonnegative("elapsed_s", self.elapsed_s))
        object.__setattr__(self, "magnitude", _positive("magnitude", self.magnitude))
        object.__setattr__(
            self,
            "source_measurement_id",
            _nonempty("source_measurement_id", self.source_measurement_id),
        )


@dataclass(frozen=True)
class ChargeRelaxationFit:
    """Explicit single-exponential empirical fit: ``Q(t)=Q0 exp(-t/tau)``."""

    tau_s: float
    q0: float
    unit: str
    fit_id: str
    points: tuple[ChargeDecayPoint, ...]
    model_note: str = (
        "Single-exponential empirical fit; humidity, motion, leakage and surface chemistry can "
        "make real charge decay multi-phase."
    )

    def __post_init__(self) -> None:
        object.__setattr__(self, "tau_s", _positive("tau_s", self.tau_s))
        object.__setattr__(self, "q0", _positive("q0", self.q0))
        object.__setattr__(self, "unit", _nonempty("unit", self.unit))
        object.__setattr__(self, "fit_id", _nonempty("fit_id", self.fit_id))
        points = tuple(self.points)
        if len(points) < 2 or not all(isinstance(point, ChargeDecayPoint) for point in points):
            raise ValueError("points must contain at least two ChargeDecayPoint values")
        if tuple(sorted(point.elapsed_s for point in points)) != tuple(point.elapsed_s for point in points):
            raise ValueError("points must be ordered by elapsed_s")
        object.__setattr__(self, "points", points)

    def predicted_magnitude(self, elapsed_s: float) -> float:
        return self.q0 * math.exp(-_nonnegative("elapsed_s", elapsed_s) / self.tau_s)


@dataclass(frozen=True)
class StaticInterfaceCompleteness:
    """Status of a static-interface record before biological interpretation."""

    status: str
    measurement_ready: bool
    present_components: tuple[str, ...]
    missing_components: tuple[str, ...]


@dataclass(frozen=True)
class StaticTriboelectricInterface:
    """A local textile-skin or organism-interface FieldState record.

    The state is indexed by its physical interface, not by a country or a
    generic textile name.  It can be joined later to a specific organ transfer
    and biological endpoint, but this type intentionally defines no such
    coefficient.
    """

    conditions: InterfaceConditions
    measurements: tuple[StaticMeasurement, ...]
    decay_fit: ChargeRelaxationFit | None = None
    provenance: Mapping[str, Any] = field(default_factory=dict)

    def __post_init__(self) -> None:
        measurements = tuple(self.measurements)
        if not measurements or not all(isinstance(measurement, StaticMeasurement) for measurement in measurements):
            raise ValueError("measurements must contain at least one StaticMeasurement")
        ids = tuple(measurement.measurement_id for measurement in measurements)
        if len(set(ids)) != len(ids):
            raise ValueError("measurements must have unique measurement_id values")
        object.__setattr__(self, "measurements", measurements)
        if self.decay_fit is not None and not isinstance(self.decay_fit, ChargeRelaxationFit):
            raise ValueError("decay_fit must be a ChargeRelaxationFit or None")
        if not isinstance(self.provenance, Mapping):
            raise ValueError("provenance must be a mapping")

    def measurements_of(self, kind: MeasurementKind) -> tuple[StaticMeasurement, ...]:
        return tuple(measurement for measurement in self.measurements if measurement.kind == kind)


@dataclass(frozen=True)
class UniformGapEstimate:
    """A labelled idealisation, never a conversion of a historical V/cm² reading."""

    potential_difference_v: float
    gap_m: float
    relative_permittivity: float
    electric_field_v_per_m: float
    surface_charge_density_c_per_m2: float
    area_m2: float | None
    total_charge_c: float | None
    assumption: str = "Uniform parallel-plate dielectric approximation"


def fit_single_exponential_relaxation(
    points: tuple[ChargeDecayPoint, ...],
    *,
    unit: str,
    fit_id: str,
) -> ChargeRelaxationFit:
    """Fit a two-point endpoint ``tau`` without inventing a universal decay rate.

    A more complex dataset may be fitted outside the model and supplied as an
    explicit empirical ``ChargeRelaxationFit``.  This closed-form helper is
    intentionally restricted to the first and last point so its assumption is
    transparent in the record.
    """
    ordered = tuple(points)
    if len(ordered) < 2:
        raise ValueError("at least two decay points are required")
    if tuple(sorted(point.elapsed_s for point in ordered)) != tuple(point.elapsed_s for point in ordered):
        raise ValueError("decay points must be ordered by elapsed_s")
    first, last = ordered[0], ordered[-1]
    delta_t = last.elapsed_s - first.elapsed_s
    if delta_t <= 0.0:
        raise ValueError("decay points must span positive elapsed time")
    if last.magnitude >= first.magnitude:
        raise ValueError("single-exponential relaxation requires a declining magnitude")
    tau = delta_t / math.log(first.magnitude / last.magnitude)
    q0 = first.magnitude / math.exp(-first.elapsed_s / tau)
    return ChargeRelaxationFit(
        tau_s=tau,
        q0=q0,
        unit=unit,
        fit_id=fit_id,
        points=ordered,
    )


def estimate_uniform_gap_field(
    potential_difference_v: float,
    gap_m: float,
    *,
    relative_permittivity: float = 1.0,
    area_m2: float | None = None,
) -> UniformGapEstimate:
    """Return an explicitly idealised field estimate from true volts and gap.

    This accepts only a declared potential difference in volts.  It cannot be
    passed a historical, physically underdetermined ``V/cm²`` reading.
    """
    potential = _finite("potential_difference_v", potential_difference_v)
    gap = _positive("gap_m", gap_m)
    epsilon_r = _positive("relative_permittivity", relative_permittivity)
    area = None if area_m2 is None else _positive("area_m2", area_m2)
    electric_field = potential / gap
    surface_charge_density = VACUUM_PERMITTIVITY_F_PER_M * epsilon_r * electric_field
    total_charge = None if area is None else surface_charge_density * area
    return UniformGapEstimate(
        potential_difference_v=potential,
        gap_m=gap,
        relative_permittivity=epsilon_r,
        electric_field_v_per_m=electric_field,
        surface_charge_density_c_per_m2=surface_charge_density,
        area_m2=area,
        total_charge_c=total_charge,
    )


def field_slew_rate(
    earlier_field_v_per_m: float,
    later_field_v_per_m: float,
    delta_t_s: float,
) -> float:
    """Return signed ``dE/dt`` from two measured field-map samples."""
    dt = _positive("delta_t_s", delta_t_s)
    return (_finite("later_field_v_per_m", later_field_v_per_m) - _finite(
        "earlier_field_v_per_m", earlier_field_v_per_m
    )) / dt


def estimate_rc_relaxation_time(
    ground_path_impedance_ohm: float,
    capacitance_to_reference_f: float,
) -> float:
    """Return the checked fixture approximation ``τ_RC = R_leak · C_eff``.

    This is a circuit approximation for a documented leakage path and
    capacitance to a declared reference.  It never replaces a measured decay
    curve: textile interfaces can have spatially heterogeneous, multi-phase
    charge relaxation.
    """
    resistance = _positive("ground_path_impedance_ohm", ground_path_impedance_ohm)
    capacitance = _positive("capacitance_to_reference_f", capacitance_to_reference_f)
    return resistance * capacitance


def assess_static_interface_completeness(
    state: StaticTriboelectricInterface,
) -> StaticInterfaceCompleteness:
    """Declare which quantities exist for a physical reconstruction.

    A historical physically underdetermined reading alone stays
    ``HISTORICAL_INTERFACE_PROXY``.
    Measurement-ready status requires an SI field map, explicit reference and
    probe geometry, charge/charge-density, boundary conditions, a temporal
    decay measurement and provenance.  This status is not a biological effect
    claim.
    """
    if not isinstance(state, StaticTriboelectricInterface):
        raise TypeError("state must be a StaticTriboelectricInterface")
    kinds = {measurement.kind for measurement in state.measurements}
    has_field = "electric_field" in kinds
    has_charge = bool({"charge", "charge_density"} & kinds)
    has_slew = "field_slew_rate" in kinds or state.decay_fit is not None
    has_history = "instrument_normalized_surface_reading" in kinds
    has_reference = all(measurement.reference != "not_reported" for measurement in state.measurements)
    has_instrument_geometry = all(
        measurement.probe_distance_m is not None and measurement.probe_area_m2 is not None
        and measurement.calibration_id is not None
        and measurement.probe_axis is not None
        and measurement.instrument_bandwidth_hz is not None
        and measurement.input_impedance_ohm is not None
        for measurement in state.measurements
        if measurement.kind in {"instrument_normalized_surface_reading", "electric_field"}
    )
    has_conditions = (
        state.conditions.relative_humidity is not None
        and state.conditions.gap_m is not None
        and state.conditions.geometry_id != "not_reported"
        and state.conditions.grounding_status != "not_reported"
    )
    has_reference_coupling = (
        state.conditions.ground_path_impedance_ohm is not None
        and state.conditions.capacitance_to_reference_f is not None
        and state.conditions.reference_electrode_id != "not_reported"
    )
    has_provenance = any(
        state.provenance.get(key)
        for key in ("source_id", "dataset_id", "measurement_id", "collection_method", "calibration_id")
    )
    required = {
        "si_field_map": has_field,
        "surface_charge_or_density": has_charge,
        "temporal_decay_or_slew": has_slew,
        "ground_reference": has_reference,
        "probe_geometry_and_instrument": has_instrument_geometry,
        "interface_boundary_conditions": has_conditions,
        "reference_coupling_impedance_and_capacitance": has_reference_coupling,
        "measurement_provenance": has_provenance,
    }
    present = tuple(name for name, available in required.items() if available)
    missing = tuple(name for name, available in required.items() if not available)
    if not missing:
        status = "MEASUREMENT_READY_STATIC_INTERFACE"
    elif has_history and not has_field and not has_charge:
        status = "HISTORICAL_INTERFACE_PROXY"
    else:
        status = "PARTIAL_STATIC_INTERFACE"
    return StaticInterfaceCompleteness(
        status=status,
        measurement_ready=not missing,
        present_components=present,
        missing_components=missing,
    )


def compare_to_tick_host_reference_field(
    electric_field_v_per_m: float,
    *,
    reference_field_v_per_m: float = TICK_HOST_REFERENCE_E_FIELD_V_PER_M,
) -> float:
    """Report local ``|E|`` relative to the documented tick-host field scale.

    England et al. modelled local host-vegetation regions exceeding about
    300 kV/m.  This is a dimensionless *field-magnitude comparison*, not a
    gradient or a tick-lift prediction: induced attraction additionally
    depends on ``∇(E²)``, tick polarizability, mass and local geometry.
    """
    return abs(_finite("electric_field_v_per_m", electric_field_v_per_m)) / _positive(
        "reference_field_v_per_m", reference_field_v_per_m
    )


def induced_polarization_force_proxy(
    field_energy_gradient_v2_per_m3: float,
    polarizability_c_m2_per_v: float,
) -> float:
    """Return the one-axis induced-polarization force proxy ``½ α∇(E²)``.

    The result is in newtons when ``α`` is supplied in SI ``C·m²/V`` and the
    signed local field-energy gradient is supplied in ``V²/m³``.  It is a
    local physics calculation only: overcoming gravity or adhesion requires
    the organism's measured mass, orientation and contact geometry.
    """
    gradient = _finite("field_energy_gradient_v2_per_m3", field_energy_gradient_v2_per_m3)
    polarizability = _positive("polarizability_c_m2_per_v", polarizability_c_m2_per_v)
    return 0.5 * polarizability * gradient


__all__ = [
    "STATIC_TRIBO_INTERFACE_VERSION",
    "TICK_HOST_REFERENCE_E_FIELD_V_PER_M",
    "VACUUM_PERMITTIVITY_F_PER_M",
    "ChargeDecayPoint",
    "ChargeRelaxationFit",
    "GroundingStatus",
    "InterfaceConditions",
    "MeasurementKind",
    "StaticInterfaceCompleteness",
    "StaticMeasurement",
    "StaticTriboelectricInterface",
    "UniformGapEstimate",
    "assess_static_interface_completeness",
    "compare_to_tick_host_reference_field",
    "estimate_uniform_gap_field",
    "estimate_rc_relaxation_time",
    "field_slew_rate",
    "fit_single_exponential_relaxation",
    "induced_polarization_force_proxy",
]
