"""Conditional BERM co-exposure records and matched descriptive contrasts.

The Lindgren 2025 tensor perturbation is upstream of an open BERM L2
operator. Drug context and an interface can condition that operator; neither
is an extra geometric field or an automatic biological gain. Existing state,
steroid-production and binding records are reused without a new capacity gate.
"""

from __future__ import annotations

from dataclasses import dataclass
import math
from types import MappingProxyType
from typing import Mapping

from berm.biology.androgen_capacity import HormoneBindingState
from berm.biology.cross_pathway_synthesis import additive_interaction_contrast
from berm.modulome.state import CellStateVector
from berm.modulome.steroidogenesis import SteroidogenesisObservation, steroidogenesis_structure
from berm.physics.static_tribo_interface import InterfaceConditions, StaticTriboelectricInterface


COMBINED_EXPOSURES_VERSION = "berm-combined-exposures-v1"
EXPOSURE_FACTORS = ("contraceptive_state", "material_interface", "rf_device_protocol")
EVIDENCE_KINDS = frozenset({"field_experiment", "component_experiment", "observational", "illustrative"})
MEASUREMENT_UNITS = {
    "potential_difference": "V",
    "electric_field": "V/m",
    "sar": "W/kg",
    "chemical_permeability": "m/s",
    "chemical_permeability_ratio": "1",
}


def _text(name: str, value: str) -> str:
    if not isinstance(value, str) or not value.strip():
        raise ValueError(f"{name} must be a non-empty string")
    return value.strip()


def _number(name: str, value: float, *, nonnegative: bool = False) -> float:
    if isinstance(value, bool):
        raise ValueError(f"{name} must be numeric, not boolean")
    value = float(value)
    if not math.isfinite(value) or (nonnegative and value < 0):
        raise ValueError(f"{name} must be finite" + (" and non-negative" if nonnegative else ""))
    return value


def _ids(values: tuple[str, ...]) -> tuple[str, ...]:
    if isinstance(values, str):
        raise ValueError("source_ids must be a sequence of identifiers")
    values = tuple(_text("source_id", value) for value in values)
    if not values or len(set(values)) != len(values):
        raise ValueError("source_ids must be non-empty and unique")
    return values


@dataclass(frozen=True)
class ExposureTiming:
    """Seconds relative to a named event; negative starts permit pretreatment."""

    reference_event: str
    start_s: float
    end_s: float

    def __post_init__(self) -> None:
        object.__setattr__(self, "reference_event", _text("reference_event", self.reference_event))
        for name in ("start_s", "end_s"):
            object.__setattr__(self, name, _number(name, getattr(self, name)))
        if self.end_s < self.start_s:
            raise ValueError("end_s must not precede start_s")


@dataclass(frozen=True)
class MedicationAgent:
    """A named active ingredient; an unknown dose stays None, never a gain."""

    ingredient: str
    drug_class: str
    dose: float | None
    dose_units: str | None
    route: str

    def __post_init__(self) -> None:
        for name in ("ingredient", "drug_class", "route"):
            object.__setattr__(self, name, _text(name, getattr(self, name)))
        if (self.dose is None) != (self.dose_units is None):
            raise ValueError("dose and dose_units must be supplied together or both None")
        if self.dose is not None:
            object.__setattr__(self, "dose", _number("dose", self.dose, nonnegative=True))
            object.__setattr__(self, "dose_units", _text("dose_units", self.dose_units))


@dataclass(frozen=True)
class MedicationContext:
    """Formulation, schedule and history replace a binary OC sensitivity flag."""

    protocol_id: str
    exposure_state: str
    agents: tuple[MedicationAgent, ...]
    administration_schedule: str
    timing: ExposureTiming

    def __post_init__(self) -> None:
        for name in ("protocol_id", "administration_schedule"):
            object.__setattr__(self, name, _text(name, getattr(self, name)))
        if self.exposure_state not in {"none", "current", "prior", "not_reported"}:
            raise ValueError("exposure_state must be none, current, prior or not_reported")
        agents = tuple(self.agents)
        if not all(isinstance(agent, MedicationAgent) for agent in agents):
            raise TypeError("agents must contain MedicationAgent records")
        if self.exposure_state in {"current", "prior"} and not agents:
            raise ValueError("current or prior exposure requires named agents")
        if self.exposure_state == "none" and agents:
            raise ValueError("none exposure cannot contain active agents")
        if not isinstance(self.timing, ExposureTiming):
            raise TypeError("timing must be ExposureTiming")
        object.__setattr__(self, "agents", agents)


@dataclass(frozen=True)
class ProtocolMeasurement:
    """Distinct physical or chemical endpoint, with its own site and assay.

    A permeability ratio remains tied to a named chemical and comparator.
    It cannot be supplied as an electric-field or absorbed-power measurement.
    """

    measurement_id: str
    quantity: str
    value: float
    units: str
    site: str
    assay_protocol_id: str
    timing: ExposureTiming
    source_ids: tuple[str, ...]
    chemical: str | None = None
    comparator_id: str | None = None

    def __post_init__(self) -> None:
        for name in ("measurement_id", "site", "assay_protocol_id"):
            object.__setattr__(self, name, _text(name, getattr(self, name)))
        if self.quantity not in MEASUREMENT_UNITS or self.units != MEASUREMENT_UNITS[self.quantity]:
            raise ValueError("quantity and units must match the measurement vocabulary")
        object.__setattr__(self, "value", _number("value", self.value,
            nonnegative=self.quantity != "potential_difference"))
        if not isinstance(self.timing, ExposureTiming):
            raise TypeError("timing must be ExposureTiming")
        object.__setattr__(self, "source_ids", _ids(self.source_ids))
        if self.quantity.startswith("chemical_permeability"):
            object.__setattr__(self, "chemical", _text("chemical", self.chemical))
        if self.quantity == "chemical_permeability_ratio":
            object.__setattr__(self, "comparator_id", _text("comparator_id", self.comparator_id))


@dataclass(frozen=True)
class RFDeviceProtocol:
    protocol_id: str
    exposure_state: str
    carrier_frequencies_hz: tuple[float, ...]
    modulation: str
    timing: ExposureTiming
    measurements: tuple[ProtocolMeasurement, ...] = ()

    def __post_init__(self) -> None:
        for name in ("protocol_id", "modulation"):
            object.__setattr__(self, name, _text(name, getattr(self, name)))
        if self.exposure_state not in {"exposed", "sham", "not_reported"}:
            raise ValueError("RF exposure_state must be exposed, sham or not_reported")
        frequencies = tuple(_number("carrier_frequency", v) for v in self.carrier_frequencies_hz)
        if any(v <= 0 for v in frequencies):
            raise ValueError("carrier frequencies must be positive")
        if not isinstance(self.timing, ExposureTiming):
            raise TypeError("timing must be ExposureTiming")
        measurements = tuple(self.measurements)
        if not all(isinstance(m, ProtocolMeasurement) and m.quantity in {"electric_field", "sar"}
                   for m in measurements):
            raise ValueError("RF measurements must be electric_field or sar records")
        object.__setattr__(self, "carrier_frequencies_hz", frequencies)
        object.__setattr__(self, "measurements", measurements)


@dataclass(frozen=True)
class HormoneClearanceObservation:
    """Clearance volume/time, distinct from production or serum concentration."""

    hormone: str
    value: float | None
    units: str
    compartment: str
    timing: ExposureTiming
    source_ids: tuple[str, ...]

    def __post_init__(self) -> None:
        for name in ("hormone", "compartment"):
            object.__setattr__(self, name, _text(name, getattr(self, name)))
        if self.units not in {"L/s", "L/min", "L/h", "mL/min", "mL/h"}:
            raise ValueError("clearance units must be volume/time")
        if self.value is not None:
            object.__setattr__(self, "value", _number("clearance", self.value, nonnegative=True))
        if not isinstance(self.timing, ExposureTiming):
            raise TypeError("timing must be ExposureTiming")
        object.__setattr__(self, "source_ids", _ids(self.source_ids))


@dataclass(frozen=True)
class CombinedExposureContext:
    """Join existing records without converting their coordinates into effects.

    InterfaceConditions may be registered before a local static measurement
    exists. A supplied StaticTriboelectricInterface must describe that interface.
    The three protocol IDs identify factors; their product is not a fourth one.
    """

    context_id: str
    medication: MedicationContext
    material: InterfaceConditions
    rf_device: RFDeviceProtocol
    static_interface: StaticTriboelectricInterface | None = None
    receiver_state: CellStateVector | None = None
    production: SteroidogenesisObservation | None = None
    binding: HormoneBindingState | None = None
    binding_units: str | None = None
    clearance: HormoneClearanceObservation | None = None
    chemical_measurements: tuple[ProtocolMeasurement, ...] = ()

    def __post_init__(self) -> None:
        object.__setattr__(self, "context_id", _text("context_id", self.context_id))
        for name, cls in (("medication", MedicationContext), ("material", InterfaceConditions),
                          ("rf_device", RFDeviceProtocol)):
            if not isinstance(getattr(self, name), cls):
                raise TypeError(f"{name} must be {cls.__name__}")
        for name, cls in (("static_interface", StaticTriboelectricInterface), ("receiver_state", CellStateVector),
                          ("production", SteroidogenesisObservation), ("binding", HormoneBindingState),
                          ("clearance", HormoneClearanceObservation)):
            if getattr(self, name) is not None and not isinstance(getattr(self, name), cls):
                raise TypeError(f"{name} must be {cls.__name__} or None")
        if self.static_interface is not None and self.static_interface.conditions != self.material:
            raise ValueError("static_interface must match the declared material conditions")
        if (self.binding is None) != (self.binding_units is None):
            raise ValueError("binding and binding_units must be supplied together")
        if self.binding_units is not None:
            if self.binding_units not in {"mol/L", "mmol/L", "umol/L", "nmol/L", "pmol/L"}:
                raise ValueError("binding_units must name a common molar concentration scale")
        if (self.receiver_state is not None and self.production is not None
                and self.production.cell_state is not None
                and self.receiver_state != self.production.cell_state):
            raise ValueError("production and receiver_state must reuse the same state record")
        measurements = tuple(self.chemical_measurements)
        if not all(isinstance(m, ProtocolMeasurement) and m.quantity.startswith("chemical_permeability")
                   for m in measurements):
            raise ValueError("chemical_measurements must contain chemical permeability records")
        object.__setattr__(self, "chemical_measurements", measurements)

    @property
    def factor_levels(self) -> dict[str, str]:
        return dict(zip(EXPOSURE_FACTORS, (self.medication.protocol_id,
                    self.material.interface_id, self.rf_device.protocol_id)))


@dataclass(frozen=True)
class FactorialEndpointObservation:
    """A cell mean on an explicitly declared endpoint scale.

    Protocol-level factor IDs must describe all three factors, including sham
    or absence. matching_context_id identifies the common system, allocation,
    co-treatments and acquisition protocol; source IDs provide its audit trail.
    """

    observation_id: str
    factor_levels: Mapping[str, str]
    endpoint: str
    units: str
    compartment: str
    timing: ExposureTiming
    matching_context_id: str
    evidence_kind: str
    mean: float | None
    source_ids: tuple[str, ...]

    def __post_init__(self) -> None:
        for name in ("observation_id", "endpoint", "units", "compartment", "matching_context_id"):
            object.__setattr__(self, name, _text(name, getattr(self, name)))
        if set(self.factor_levels) != set(EXPOSURE_FACTORS):
            raise ValueError("factor_levels must contain exactly the three exposure factors")
        levels = {key: _text(key, self.factor_levels[key]) for key in EXPOSURE_FACTORS}
        object.__setattr__(self, "factor_levels", MappingProxyType(levels))
        if not isinstance(self.timing, ExposureTiming):
            raise TypeError("timing must be ExposureTiming")
        if self.evidence_kind not in EVIDENCE_KINDS:
            raise ValueError("unknown evidence_kind")
        if self.mean is not None:
            object.__setattr__(self, "mean", _number("mean", self.mean))
        object.__setattr__(self, "source_ids", _ids(self.source_ids))


def matched_interaction_contrast(
    y00: FactorialEndpointObservation,
    y10: FactorialEndpointObservation,
    y01: FactorialEndpointObservation,
    y11: FactorialEndpointObservation,
    *,
    factors: tuple[str, str],
    comparison_id: str,
) -> dict:
    """Y11 - Y10 - Y01 + Y00; a descriptive mean contrast, not significance.

    Order identifies baseline and alternate levels. The unvaried third factor
    is held fixed. No pooling across scales, observation windows or evidence
    kinds occurs; a missing mean leaves the contrast None.
    """
    comparison_id = _text("comparison_id", comparison_id)
    cells = (y00, y10, y01, y11)
    if not all(isinstance(cell, FactorialEndpointObservation) for cell in cells):
        raise TypeError("all cells must be FactorialEndpointObservation records")
    if len(factors) != 2 or len(set(factors)) != 2 or not set(factors) <= set(EXPOSURE_FACTORS):
        raise ValueError("factors must name two distinct registered exposure factors")
    if len({cell.observation_id for cell in cells}) != 4:
        raise ValueError("four distinct observation IDs are required")
    for name in ("endpoint", "units", "compartment", "timing", "matching_context_id", "evidence_kind"):
        if any(getattr(cell, name) != getattr(y00, name) for cell in cells[1:]):
            raise ValueError(f"matched contrast requires identical {name}")
    first, second = factors
    baseline, alternate = dict(y00.factor_levels), dict(y11.factor_levels)
    if any(baseline[factor] == alternate[factor] for factor in factors):
        raise ValueError("each compared factor must have two distinct levels")
    expected = (baseline, {**baseline, first: alternate[first]},
                {**baseline, second: alternate[second]},
                {**baseline, first: alternate[first], second: alternate[second]})
    if any(dict(cell.factor_levels) != level for cell, level in zip(cells, expected)):
        raise ValueError("cells must form a matched 2x2 design with the third factor fixed")
    means = [cell.mean for cell in cells]
    contrast = None if any(mean is None for mean in means) else additive_interaction_contrast(*means)
    if contrast is not None and not math.isfinite(contrast):
        raise ValueError("interaction contrast overflowed its endpoint scale")
    return {
        "comparisonId": comparison_id, "model": "BERM", "factors": list(factors),
        "heldFixed": {key: value for key, value in baseline.items() if key not in factors},
        "endpoint": y00.endpoint, "units": y00.units, "compartment": y00.compartment,
        "timing": {"referenceEvent": y00.timing.reference_event,
                   "startSeconds": y00.timing.start_s, "endSeconds": y00.timing.end_s},
        "matchingContextId": y00.matching_context_id, "evidenceKind": y00.evidence_kind,
        "cellMeans": dict(zip(("Y00", "Y10", "Y01", "Y11"), means)),
        "contrast": contrast, "formula": "Y11 - Y10 - Y01 + Y00",
        "interpretationKind": "descriptive_additive_mean_contrast",
        "synergyStatus": None, "statisticalSignificance": None,
        "observationIds": [cell.observation_id for cell in cells],
        "sourceIds": list(dict.fromkeys(source for cell in cells for source in cell.source_ids)),
        "humanEndpointTransfer": None,
    }


def combined_exposures_structure() -> dict:
    """JSON-safe public structure for the evidence UI, with no forecast export."""
    steroidogenesis = steroidogenesis_structure()
    return {
        "version": COMBINED_EXPOSURES_VERSION,
        "model": "BERM", "status": "STRUCTURAL_ONLY",
        "factors": [
            {"id": "contraceptive_state", "role": "named_drug_and_receiver_context",
             "coordinates": ["ingredient", "drug_class", "dose", "dose_units", "route", "schedule", "timing"]},
            {"id": "material_interface", "role": "physical_interface_and_transfer_context",
             "coordinates": ["material_pair", "geometry", "humidity", "contact", "motion", "grounding"]},
            {"id": "rf_device_protocol", "role": "named_physical_input_protocol",
             "coordinates": ["spectrum", "modulation", "timing", "electric_field", "sar"]},
        ],
        "interactions": {
            "materialByRF": {"factors": ["material_interface", "rf_device_protocol"], "independentFactor": False},
            "drugByRF": {"factors": ["contraceptive_state", "rf_device_protocol"], "independentFactor": False},
            "sign": None, "magnitude": None,
        },
        "layers": [
            {"id": "L0", "category": "lindgren_geometry", "status": "primary_premise",
             "formula": "g = eta + A tensor A", "version": "Lindgren-Kovacs-Liukkonen 2025"},
            {"id": "L1", "category": "lindgren_geometry", "status": "derived_with_explicit_BERM_scale",
             "formula": "delta_g = kappa(A0 tensor a + a tensor A0 + a tensor a)",
             "multiInput": "a = sum(a_p); cross terms require a declared temporal averaging operator"},
            {"id": "L2", "category": "berm_conditional_mechanism", "status": "open_calibration",
             "formula": "r_i(t) = Xi_i[S_i(history)](delta_g)", "owner": "BERM"},
            {"id": "L3_L4", "category": "imported_empirical_biology", "status": "component_evidence",
             "composition": "shared calcium/redox state -> production; binding and clearance retained separately"},
        ],
        "existingModules": {
            "physicalInterface": "berm.physics.static_tribo_interface.StaticTriboelectricInterface",
            "receiverState": "berm.modulome.state.CellStateVector",
            "production": "berm.modulome.steroidogenesis.SteroidogenesisObservation",
            "binding": "berm.biology.androgen_capacity.HormoneBindingState",
            "contrast": "berm.biology.cross_pathway_synthesis.additive_interaction_contrast",
            "publicEntryPoint": "berm.biology.combined_exposures_structure",
        },
        "hormoneStages": {
            "production": "output per viable cell in a named stimulation and redox context",
            "binding": "mass-action free testosterone from supplied consistent concentrations and constants",
            "clearance": "separately observed volume/time; concentration is not production",
            "sharedState": "one receiver/calcium/redox context, not a product of duplicate mechanism gains",
            "capacityPolicy": steroidogenesis["outputMappingPolicy"],
        },
        "measurementContract": {
            "quantities": dict(MEASUREMENT_UNITS),
            "conversionPolicy": "No automatic V-to-E, E-to-SAR or chemical-permeability-to-field conversion",
            "fieldStateRole": "optional_physical_measurement_input_only",
            "permeabilityScope": "named chemical, assay, timing and comparator; never a universal organ gain",
        },
        "contrastContract": {
            "function": "berm.biology.matched_interaction_contrast",
            "formula": "Y11 - Y10 - Y01 + Y00", "factorCount": 3, "contrastedFactors": 2,
            "match": ["third_factor", "endpoint", "units", "compartment", "timing", "matching_context_id", "evidence_kind"],
            "interpretationKind": "descriptive_additive_mean_contrast",
            "missingMean": None, "synergyStatus": None, "statisticalSignificance": None,
        },
        "claimIds": ["claim.synergy.state-conditioned-coexposure",
                     "claim.synergy.contraceptive-receiver-state", "claim.synergy.material-device-transfer"],
        "openCalibration": {"gaugePrescription": None, "physicalScale": None, "tissueKernel": None,
                            "responseSign": None, "responseLag": None, "drugStateTransfer": None,
                            "materialToTissueTransfer": None, "humanEndpointTransfer": None},
        "predictionPolicy": {"historicalForecastsChanged": False, "newCapacityMultiplier": None,
                             "automaticGains": None, "fourthIndependentFactor": False},
    }


__all__ = ["COMBINED_EXPOSURES_VERSION", "EXPOSURE_FACTORS", "CombinedExposureContext",
           "ExposureTiming", "MedicationAgent", "MedicationContext", "ProtocolMeasurement",
           "RFDeviceProtocol", "HormoneClearanceObservation", "FactorialEndpointObservation",
           "matched_interaction_contrast", "combined_exposures_structure"]
