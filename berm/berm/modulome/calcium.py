"""Calcium as a circulation between compartments, not a single pool.

    plasma-membrane channels
        <-> cytosolic Ca2+
            <-> ER store
                <-> mitochondria

A change in membrane current can therefore be a *consequence* of intracellular
regulation rather than a direct action on the channel protein.  The model
predicts three quantities separately, because an experiment can measure them
separately:

1. the first calcium response,
2. the change in the store,
3. the later change in membrane currents.

Blocking release from the store or reuptake into it removes the third
prediction while leaving the first intact.  That is the discriminating
structure: the late change is driven by *completed release/reuptake cycles*,
so either arm alone is sufficient to abolish it.

Because the response depends on the store load and the resting potential, the
same channel expression level produces a different response in a different
cell state.  No rate constant here has a project default.
"""

from __future__ import annotations

from dataclasses import dataclass
from typing import Sequence

from berm.modulome._common import (
    MODULOME_VERSION,
    STRUCTURAL_ONLY,
    check_calibration_status,
    nonempty,
    nonnegative,
    normalise_ids,
    unit_interval,
)

__all__ = [
    "CalciumCompartments",
    "CalciumKinetics",
    "CalciumPhaseSummary",
    "CalciumTrace",
    "ILLUSTRATIVE_CALCIUM_KINETICS",
    "simulate_calcium",
]


@dataclass(frozen=True)
class CalciumCompartments:
    """Compartment concentrations in one registered relative unit."""

    cytosol: float = 0.0
    er_store: float = 1.0
    mitochondrial: float = 0.0

    def __post_init__(self) -> None:
        for name in ("cytosol", "er_store", "mitochondrial"):
            object.__setattr__(self, name, nonnegative(name, getattr(self, name)))


@dataclass(frozen=True)
class CalciumKinetics:
    """Named compartment rate constants, per second. [KANDIDAATTI]"""

    parameter_ids: tuple[str, ...]
    influx_gain: float
    ryr_release: float
    serca_uptake: float
    mcu_uptake: float
    mito_efflux: float
    extrusion: float
    cicr_half_activation: float = 0.25
    er_capacity: float = 1.0
    late_current_gain: float = 1.0
    calibration_status: str = STRUCTURAL_ONLY
    evidence_ids: tuple[str, ...] = ()

    def __post_init__(self) -> None:
        if not self.parameter_ids:
            raise ValueError("parameter_ids must identify the calcium kinetics")
        object.__setattr__(
            self, "parameter_ids", normalise_ids(self.parameter_ids, "parameter_id")
        )
        for name in (
            "influx_gain",
            "ryr_release",
            "serca_uptake",
            "mcu_uptake",
            "mito_efflux",
            "extrusion",
            "late_current_gain",
        ):
            object.__setattr__(self, name, nonnegative(name, getattr(self, name)))
        for name in ("cicr_half_activation", "er_capacity"):
            value = nonnegative(name, getattr(self, name))
            if value <= 0.0:
                raise ValueError(f"{name} must be > 0")
            object.__setattr__(self, name, value)
        check_calibration_status(self.calibration_status)
        object.__setattr__(
            self, "evidence_ids", normalise_ids(self.evidence_ids, "evidence_id")
        )

    def without_ryr_release(self) -> "CalciumKinetics":
        """Intervention arm: release from the store is blocked."""
        return self._replace_rate("ryr_release", 0.0, "ryr-release-blocked")

    def without_serca_uptake(self) -> "CalciumKinetics":
        """Intervention arm: reuptake into the store is blocked."""
        return self._replace_rate("serca_uptake", 0.0, "serca-uptake-blocked")

    def without_mcu_uptake(self) -> "CalciumKinetics":
        """Intervention arm: mitochondrial uptake is blocked."""
        return self._replace_rate("mcu_uptake", 0.0, "mcu-uptake-blocked")

    def _replace_rate(self, name: str, value: float, suffix: str) -> "CalciumKinetics":
        fields = {
            "parameter_ids": (*self.parameter_ids, f"{self.parameter_ids[0]}.{suffix}"),
            "influx_gain": self.influx_gain,
            "ryr_release": self.ryr_release,
            "serca_uptake": self.serca_uptake,
            "mcu_uptake": self.mcu_uptake,
            "mito_efflux": self.mito_efflux,
            "extrusion": self.extrusion,
            "cicr_half_activation": self.cicr_half_activation,
            "er_capacity": self.er_capacity,
            "late_current_gain": self.late_current_gain,
            "calibration_status": self.calibration_status,
            "evidence_ids": self.evidence_ids,
        }
        fields[name] = value
        return CalciumKinetics(**fields)


#: Shape-only rate set for figures and tests; never an estimate.
ILLUSTRATIVE_CALCIUM_KINETICS = CalciumKinetics(
    parameter_ids=("modulome.calcium.illustrative-shape-v1",),
    influx_gain=0.90,
    ryr_release=0.55,
    serca_uptake=0.75,
    mcu_uptake=0.30,
    mito_efflux=0.18,
    extrusion=0.45,
    cicr_half_activation=0.20,
    er_capacity=1.4,
    late_current_gain=0.55,
)


@dataclass(frozen=True)
class CalciumPhaseSummary:
    """The three separately predicted observables of one exposure."""

    first_calcium_response: float
    time_to_first_peak_s: float
    store_change: float
    mitochondrial_response: float
    cumulative_store_cycling: float
    late_membrane_current_change: float
    modulome_version: str = MODULOME_VERSION


@dataclass(frozen=True)
class CalciumTrace:
    """Full compartment trajectory plus its phase summary."""

    trace_id: str
    times_s: tuple[float, ...]
    cytosol: tuple[float, ...]
    er_store: tuple[float, ...]
    mitochondrial: tuple[float, ...]
    summary: CalciumPhaseSummary
    parameter_ids: tuple[str, ...]
    calibration_status: str


def simulate_calcium(
    initial: CalciumCompartments,
    *,
    kinetics: CalciumKinetics,
    exposure: Sequence[float],
    dt_s: float,
    receptor_readiness: float = 1.0,
    early_window_s: float | None = None,
    trace_id: str = "calcium-trace",
) -> CalciumTrace:
    """Integrate the four-compartment circulation with an explicit Euler step.

    ``exposure`` is the registered per-step field drive; ``receptor_readiness``
    is the state coordinate ``s`` that gates influx, so the same drive in a
    different cell state produces a different first response.
    """
    if not isinstance(initial, CalciumCompartments):
        raise TypeError("initial must be a CalciumCompartments")
    if not isinstance(kinetics, CalciumKinetics):
        raise TypeError("kinetics must be a CalciumKinetics")
    step = nonnegative("dt_s", dt_s)
    if step <= 0.0:
        raise ValueError("dt_s must be > 0")
    drive = tuple(nonnegative("exposure", value) for value in exposure)
    if not drive:
        raise ValueError("exposure must contain at least one step")
    readiness = unit_interval("receptor_readiness", receptor_readiness)
    window = (
        len(drive) * step if early_window_s is None else nonnegative("early_window_s", early_window_s)
    )

    times = [0.0]
    cytosol = [initial.cytosol]
    store = [initial.er_store]
    mito = [initial.mitochondrial]
    cycling = 0.0

    for index, u in enumerate(drive):
        c, e, m = cytosol[-1], store[-1], mito[-1]
        influx = kinetics.influx_gain * u * readiness
        gate = c / (c + kinetics.cicr_half_activation)
        release = kinetics.ryr_release * e * gate
        uptake = kinetics.serca_uptake * c * max(0.0, 1.0 - e / kinetics.er_capacity)
        mito_in = kinetics.mcu_uptake * c
        mito_out = kinetics.mito_efflux * m
        extrusion = kinetics.extrusion * c

        # Completed release/reuptake cycles: zero when either arm is blocked.
        cycling += min(release, uptake) * step

        cytosol.append(max(0.0, c + step * (influx + release - uptake - mito_in + mito_out - extrusion)))
        store.append(max(0.0, e + step * (uptake - release)))
        mito.append(max(0.0, m + step * (mito_in - mito_out)))
        times.append((index + 1) * step)

    early_indices = [i for i, t in enumerate(times) if t <= window] or [0]
    early_peak_index = max(early_indices, key=lambda i: cytosol[i])
    summary = CalciumPhaseSummary(
        first_calcium_response=cytosol[early_peak_index] - cytosol[0],
        time_to_first_peak_s=times[early_peak_index],
        store_change=store[-1] - store[0],
        mitochondrial_response=max(mito) - mito[0],
        cumulative_store_cycling=cycling,
        late_membrane_current_change=-kinetics.late_current_gain * cycling,
    )
    return CalciumTrace(
        trace_id=nonempty("trace_id", trace_id),
        times_s=tuple(times),
        cytosol=tuple(cytosol),
        er_store=tuple(store),
        mitochondrial=tuple(mito),
        summary=summary,
        parameter_ids=kinetics.parameter_ids,
        calibration_status=kinetics.calibration_status,
    )
