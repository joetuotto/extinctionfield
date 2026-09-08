"""Conditional composition of measured/supplied cell mechanisms and organ gates.

No electromagnetic dose is inferred here. A caller registers a LOCAL BIOLOGICAL
DRIVER and every transfer coefficient. A conditional formal response operator
exists; its physical scale and tissue-specific geometry-to-driver map remain
open. The new composition is STRUCTURAL_ONLY even when a component is calibrated.
It does not modify the archived v17 coefficients or forecasts.
"""
from __future__ import annotations

from dataclasses import dataclass, replace
import math
from typing import Mapping

from berm.biology.coordination import HormoneReceptivityState, ReproductiveCoordinationState
from berm.biology.reproductive_state import CoupleReproductiveState
from berm.modulome._common import finite, nonempty, nonnegative, normalise_ids, STRUCTURAL_ONLY
from berm.modulome.calcium import CalciumCompartments, CalciumKinetics, simulate_calcium
from berm.modulome.membrane import MembraneMachinery
from berm.modulome.state import CellStateVector, StateKinetics, advance_cell_state

FEATURES = frozenset({
    "receptor_readiness", "repair_capacity", "damage_load", "calcium_peak",
    "calcium_final", "er_store_final", "mitochondrial_peak", "store_cycling",
    "late_membrane_current_change",
})


def _ids(values, name):
    if isinstance(values, (str, bytes)):
        raise ValueError(f"{name} must be a collection")
    result = normalise_ids(values, name)
    if not result:
        raise ValueError(f"{name} must identify the conditional mapping")
    return result


@dataclass(frozen=True)
class CellProtocol:
    protocol_id: str
    driver: tuple[float, ...]
    driver_units: str
    driver_provenance: str
    dt_s: float
    kinetics_interval_s: float
    state_increment_gain: float
    coupling_parameter_ids: tuple[str, ...]
    initial_state: CellStateVector
    membrane: MembraneMachinery
    initial_calcium: CalciumCompartments
    state_kinetics: StateKinetics
    calcium_kinetics: CalciumKinetics

    def __post_init__(self):
        for name in ("protocol_id", "driver_units", "driver_provenance"):
            object.__setattr__(self, name, nonempty(name, getattr(self, name)))
        values = tuple(nonnegative("driver", value) for value in self.driver)
        if not values:
            raise ValueError("driver must contain at least one time step")
        object.__setattr__(self, "driver", values)
        for name in ("dt_s", "kinetics_interval_s"):
            value = finite(name, getattr(self, name))
            if value <= 0:
                raise ValueError(f"{name} must be positive")
            object.__setattr__(self, name, value)
        if self.dt_s != self.kinetics_interval_s:
            raise ValueError("StateKinetics is per interval: kinetics_interval_s must equal dt_s")
        object.__setattr__(self, "state_increment_gain", nonnegative("state_increment_gain", self.state_increment_gain))
        object.__setattr__(self, "coupling_parameter_ids", _ids(self.coupling_parameter_ids, "coupling_parameter_ids"))
        for name, cls in (("initial_state", CellStateVector), ("membrane", MembraneMachinery),
                          ("initial_calcium", CalciumCompartments), ("state_kinetics", StateKinetics),
                          ("calcium_kinetics", CalciumKinetics)):
            if not isinstance(getattr(self, name), cls):
                raise TypeError(f"{name} must be {cls.__name__}")
        # Euler's loss fraction must stay below one in each compartment. This
        # avoids passing a numerically unstable/clipped trace into a capacity.
        k = self.calcium_kinetics
        losses = (k.serca_uptake + k.mcu_uptake + k.extrusion,
                  k.ryr_release, k.mito_efflux)
        if self.dt_s * max(losses) > 1:
            raise ValueError("dt_s is too large for the supplied calcium loss rates")


@dataclass(frozen=True)
class FunctionalEndpointMapping:
    """A named Gaussian functional window, never an inferred fertility slope.

    coordinate = intercept + sum(coefficients[feature] * feature)
    factor = exp(-0.5*((coordinate-optimum)/width)**2)

    Coefficients carry feature-to-coordinate units. The caller names those
    coordinate units and the functional assay. A change can improve or impair
    function depending on the starting position relative to the optimum.
    """
    endpoint_id: str
    component: str
    coefficients: Mapping[str, float]
    intercept: float
    optimum: float
    width: float
    coordinate_units: str
    parameter_ids: tuple[str, ...]
    evidence_ids: tuple[str, ...] = ()

    def __post_init__(self):
        for name in ("endpoint_id", "coordinate_units"):
            object.__setattr__(self, name, nonempty(name, getattr(self, name)))
        if self.component not in {"sperm_function", "oocyte_redox_quality"}:
            raise ValueError("component must be sperm_function or oocyte_redox_quality")
        if not isinstance(self.coefficients, Mapping) or not self.coefficients:
            raise ValueError("coefficients must map measured features to a functional coordinate")
        if set(self.coefficients) - FEATURES:
            raise ValueError("unknown functional endpoint features")
        object.__setattr__(self, "coefficients", {k: finite(k, v) for k, v in self.coefficients.items()})
        for name in ("intercept", "optimum", "width"):
            object.__setattr__(self, name, finite(name, getattr(self, name)))
        if self.width <= 0:
            raise ValueError("width must be positive")
        object.__setattr__(self, "parameter_ids", _ids(self.parameter_ids, "parameter_ids"))
        object.__setattr__(self, "evidence_ids", normalise_ids(self.evidence_ids, "evidence_id"))

    def evaluate(self, features: Mapping[str, float]) -> dict:
        coordinate = finite("functional coordinate", self.intercept + math.fsum(
            coefficient * features[name] for name, coefficient in self.coefficients.items()))
        distance = (coordinate - self.optimum) / self.width
        factor = math.exp(-0.5 * distance * distance)
        return {"endpoint_id": self.endpoint_id, "component": self.component,
                "coordinate": coordinate, "coordinate_units": self.coordinate_units,
                "factor": factor, "calibration_status": STRUCTURAL_ONLY,
                "parameter_ids": list(self.parameter_ids), "evidence_ids": list(self.evidence_ids),
                "mapping": "caller-supplied Gaussian functional window"}


def simulate_cell_protocol(protocol: CellProtocol) -> dict:
    """Step membrane-gated Ca and a history-dependent s/A/D state together.

    Calcium sees readiness at the START of each registered interval. State
    kinetics then advance for the next interval. Gain converts biological
    driver*time to the exposure-increment units used by StateKinetics.
    No new empirical coefficient or technology multiplier is supplied here.
    """
    if not isinstance(protocol, CellProtocol):
        raise TypeError("protocol must be CellProtocol")
    state, calcium = protocol.initial_state, protocol.initial_calcium
    rows, cycling = [], 0.0
    competence = protocol.membrane.receptor_competence
    calcium_peak, mito_peak = calcium.cytosol, calcium.mitochondrial
    for index, driver in enumerate(protocol.driver):
        readiness = competence * state.receptor_readiness
        trace = simulate_calcium(calcium, kinetics=protocol.calcium_kinetics,
                                 exposure=(driver,), dt_s=protocol.dt_s,
                                 receptor_readiness=readiness)
        calcium = CalciumCompartments(trace.cytosol[-1], trace.er_store[-1], trace.mitochondrial[-1])
        cycling += trace.summary.cumulative_store_cycling
        calcium_peak = max(calcium_peak, calcium.cytosol)
        mito_peak = max(mito_peak, calcium.mitochondrial)
        state = advance_cell_state(state, exposure_increment=(
            driver * protocol.dt_s * competence * protocol.state_increment_gain),
            kinetics=protocol.state_kinetics,
            state_id=f"{protocol.protocol_id}.step-{index + 1}")
        rows.append({"time_s": (index + 1) * protocol.dt_s, "driver": driver,
                     "effective_readiness_before_step": readiness,
                     "receptor_readiness": state.receptor_readiness,
                     "repair_capacity": state.repair_capacity, "damage_load": state.damage_load,
                     "calcium": calcium.cytosol, "er_store": calcium.er_store,
                     "mitochondrial_calcium": calcium.mitochondrial})
    features = {"receptor_readiness": state.receptor_readiness,
                "repair_capacity": state.repair_capacity, "damage_load": state.damage_load,
                "calcium_peak": calcium_peak, "calcium_final": calcium.cytosol,
                "er_store_final": calcium.er_store, "mitochondrial_peak": mito_peak,
                "store_cycling": cycling,
                "late_membrane_current_change": -protocol.calcium_kinetics.late_current_gain * cycling}
    return {"protocol_id": protocol.protocol_id, "driver_units": protocol.driver_units,
            "driver_provenance": protocol.driver_provenance,
            "membrane_competence": competence, "features": features, "trace": rows,
            "parameter_ids": list(dict.fromkeys((*protocol.coupling_parameter_ids,
                *protocol.initial_state.parameter_ids, *protocol.state_kinetics.parameter_ids,
                *protocol.calcium_kinetics.parameter_ids))),
            "evidence_ids": list(dict.fromkeys((*protocol.initial_state.evidence_ids,
                *protocol.membrane.evidence_ids, *protocol.state_kinetics.evidence_ids,
                *protocol.calcium_kinetics.evidence_ids))),
            "calibration_status": STRUCTURAL_ONLY, "l2_bridge_status": "OPEN"}


@dataclass(frozen=True)
class LocalHormoneSource:
    """One local oscillator's output; all sources share named concentration units."""
    source_id: str
    mean: float
    amplitude: float
    phase_radians: float
    available_fraction: float

    def __post_init__(self):
        object.__setattr__(self, "source_id", nonempty("source_id", self.source_id))
        for name in ("mean", "amplitude"):
            object.__setattr__(self, name, nonnegative(name, getattr(self, name)))
        if self.amplitude > self.mean:
            raise ValueError("amplitude must not exceed mean")
        object.__setattr__(self, "phase_radians", finite("phase_radians", self.phase_radians))
        value = finite("available_fraction", self.available_fraction)
        if not 0 <= value <= 1:
            raise ValueError("available_fraction must be in [0, 1]")
        object.__setattr__(self, "available_fraction", value)


@dataclass(frozen=True)
class ImplantationSupport:
    """Local hormone sum and a supplied functional requirement, not an RF fit.

    Each source contributes to the total before applying the threshold. Thus
    one remaining source can compensate if its output meets the requirement.
    The harmonic average assumes full cycles at a common frequency.
    """
    sources: tuple[LocalHormoneSource, ...]
    receptivity_mean: float
    receptivity_amplitude: float
    receptivity_phase_radians: float
    required_response: float
    signal_units: str
    parameter_ids: tuple[str, ...]
    evidence_ids: tuple[str, ...] = ()

    def __post_init__(self):
        sources = tuple(self.sources)
        if not sources or not all(isinstance(source, LocalHormoneSource) for source in sources):
            raise ValueError("sources must contain LocalHormoneSource records")
        if len({s.source_id for s in sources}) != len(sources):
            raise ValueError("source_id must be unique")
        object.__setattr__(self, "sources", sources)
        for name in ("receptivity_mean", "receptivity_amplitude", "required_response"):
            object.__setattr__(self, name, nonnegative(name, getattr(self, name)))
        if self.receptivity_amplitude > self.receptivity_mean or self.required_response == 0:
            raise ValueError("non-negative receptivity and positive required_response are required")
        object.__setattr__(self, "receptivity_phase_radians", finite("receptivity_phase_radians", self.receptivity_phase_radians))
        object.__setattr__(self, "signal_units", nonempty("signal_units", self.signal_units))
        object.__setattr__(self, "parameter_ids", _ids(self.parameter_ids, "parameter_ids"))
        object.__setattr__(self, "evidence_ids", normalise_ids(self.evidence_ids, "evidence_id"))

    def as_dict(self):
        contributions = {source.source_id: source.available_fraction * (
            source.mean * self.receptivity_mean + 0.5 * source.amplitude * self.receptivity_amplitude
            * math.cos(source.phase_radians - self.receptivity_phase_radians)) for source in self.sources}
        response = finite("implantation response", math.fsum(contributions.values()))
        return {"source_responses": contributions, "average_response": response,
                "required_response": self.required_response, "signal_units": self.signal_units,
                "factor": min(1.0, max(0.0, response / self.required_response)),
                "parameter_ids": list(self.parameter_ids), "evidence_ids": list(self.evidence_ids),
                "calibration_status": STRUCTURAL_ONLY}


def couple_from_modulome(*, base_couple: CoupleReproductiveState, protocol: CellProtocol,
                         endpoint: FunctionalEndpointMapping,
                         hormone_timing: HormoneReceptivityState | None = None,
                         timing_parameter_ids: tuple[str, ...] = (),
                         timing_evidence_ids: tuple[str, ...] = (),
                         implantation: ImplantationSupport | None = None) -> tuple[CoupleReproductiveState, dict]:
    """Replace one named capacity gate, preserving the other partner's state."""
    if not isinstance(base_couple, CoupleReproductiveState):
        raise TypeError("base_couple must be CoupleReproductiveState")
    result = simulate_cell_protocol(protocol)
    functional = endpoint.evaluate(result["features"])
    male, female = base_couple.male, base_couple.female
    if endpoint.component == "sperm_function":
        if male.sperm_function != 1:
            raise ValueError("modulome replaces sperm_function; leave the manual gate at 1")
        male = replace(male, sperm_function=functional["factor"], calibration_status=STRUCTURAL_ONLY)
    else:
        if female.oocyte_redox_quality != 1 or (female.coordination and female.coordination.oocyte_redox is not None):
            raise ValueError("modulome replaces oocyte_redox_quality; leave the manual gate at 1")
        female = replace(female, oocyte_redox_quality=functional["factor"], calibration_status=STRUCTURAL_ONLY)
    if hormone_timing is not None:
        _ids(timing_parameter_ids, "timing_parameter_ids")
        if female.ovulatory_clock_gate != 1 or (female.coordination and female.coordination.hormone_timing is not None):
            raise ValueError("timing replaces ovulatory_clock_gate; leave the manual gate at 1")
        previous = female.coordination
        coordination = ReproductiveCoordinationState(
            hormone_timing=hormone_timing,
            oocyte_redox=previous.oocyte_redox if previous else None,
            parameter_ids=tuple(dict.fromkeys((*timing_parameter_ids, *(previous.parameter_ids if previous else ())))),
            evidence_ids=tuple(dict.fromkeys((*timing_evidence_ids, *(previous.evidence_ids if previous else ())))))
        female = replace(female, coordination=coordination)
    implantation_result = None
    if implantation is not None:
        if female.luteal_implantation_support != 1:
            raise ValueError("local hormone model replaces luteal_implantation_support; leave manual gate at 1")
        implantation_result = implantation.as_dict()
        female = replace(female, luteal_implantation_support=implantation_result["factor"], calibration_status=STRUCTURAL_ONLY)
    couple = replace(base_couple, male=male, female=female,
                     provenance={**base_couple.provenance, "modulome_protocol": protocol.protocol_id,
                                 "functional_endpoint": endpoint.endpoint_id})
    result.update({"functional_endpoint": functional,
                   "hormone_timing": None if hormone_timing is None else female.coordination.as_dict(),
                   "implantation": implantation_result,
                   "conception_capacity": couple.conception_capacity,
                   "live_birth_support": couple.live_birth_support,
                   "biological_capacity": couple.biological_capacity})
    result["parameter_ids"] = list(dict.fromkeys((*result["parameter_ids"], *endpoint.parameter_ids,
        *(base_couple.female.coordination.parameter_ids if base_couple.female.coordination is not None else ()),
        *(timing_parameter_ids if hormone_timing is not None else ()),
        *(implantation.parameter_ids if implantation is not None else ()))))
    result["evidence_ids"] = list(dict.fromkeys((*result["evidence_ids"], *endpoint.evidence_ids,
        *base_couple.male.evidence_ids, *base_couple.male.btb.evidence_ids,
        *base_couple.female.evidence_ids, *base_couple.female.placental_barrier_support.evidence_ids,
        *(base_couple.female.coordination.evidence_ids if base_couple.female.coordination is not None else ()),
        *(timing_evidence_ids if hormone_timing is not None else ()),
        *(implantation.evidence_ids if implantation is not None else ()))))
    return couple, result
