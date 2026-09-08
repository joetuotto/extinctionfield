"""Explicit adapters for conditional response and androgen organ inputs.

The signed tensor response, nonnegative cellular driver and androgen capacity
are different quantities. These adapters expose every conversion and prohibit
silent rectification or a second testosterone-production multiplier.
"""
from __future__ import annotations

from dataclasses import asdict, dataclass, replace
from typing import Mapping

from berm.biology.androgen_capacity import (
    HormoneBindingState, ReceptorPathway, androgen_effective_capacity,
)
from berm.biology.reproductive_state import CoupleReproductiveState
from berm.modulome._common import STRUCTURAL_ONLY, finite, nonempty, nonnegative, normalise_ids
from berm.physics.lindgren_response import contract_retarded_response


def _ids(values, name):
    result = normalise_ids(values, name)
    if not result:
        raise ValueError(f"{name} must identify the supplied mapping")
    return result


@dataclass(frozen=True)
class SignedResponseTransfer:
    """Caller-specified affine conversion: driver = baseline + gain * response.

    gain carries driver_units / response_units. Either sign is legal; the
    entire converted trace must be nonnegative for the current cell model.
    Invalid traces are rejected, never rectified, clipped or rescaled.
    """
    transfer_id: str
    response_units: str
    driver_units: str
    provenance: str
    baseline: float
    gain: float
    parameter_ids: tuple[str, ...]
    evidence_ids: tuple[str, ...] = ()

    def __post_init__(self):
        for name in ("transfer_id", "response_units", "driver_units", "provenance"):
            object.__setattr__(self, name, nonempty(name, getattr(self, name)))
        object.__setattr__(self, "baseline", nonnegative("baseline", self.baseline))
        object.__setattr__(self, "gain", finite("gain", self.gain))
        object.__setattr__(self, "parameter_ids", _ids(self.parameter_ids, "parameter_ids"))
        object.__setattr__(self, "evidence_ids", normalise_ids(self.evidence_ids, "evidence_ids"))

    def apply(self, responses) -> tuple[float, ...]:
        values = tuple(finite("response", value) for value in responses)
        if not values:
            raise ValueError("responses must contain at least one time step")
        result = tuple(finite("converted driver", self.baseline + self.gain * value) for value in values)
        if any(value < 0 for value in result):
            raise ValueError("converted driver is negative; supply a justified transfer, not abs or clipping")
        return result


def retarded_driver_from_mapping(raw: Mapping) -> dict:
    """Evaluate one caller-supplied lag history per cellular time step.

    Lag quadrature weights are required and have named units. They are not
    silently equated with the cell's dt_s: lag integration and cell stepping
    can use different grids. response_units include the declared quadrature.
    """
    required = {"kernel_histories", "delta_metric_histories", "lag_weights",
                "lag_weight_units", "kernel_provenance", "kernel_parameter_ids", "transfer"}
    if not isinstance(raw, Mapping) or required - set(raw) or set(raw) - required - {"kernel_evidence_ids"}:
        raise ValueError("retarded_response requires " + ", ".join(sorted(required)) + "; kernel_evidence_ids is optional")
    provenance = nonempty("kernel_provenance", raw["kernel_provenance"])
    kernel_parameters = _ids(raw["kernel_parameter_ids"], "kernel_parameter_ids")
    kernel_evidence = normalise_ids(raw.get("kernel_evidence_ids", ()), "kernel_evidence_ids")
    weight_units = nonempty("lag_weight_units", raw["lag_weight_units"])
    transfer = SignedResponseTransfer(**raw["transfer"])
    kernels, metrics = raw["kernel_histories"], raw["delta_metric_histories"]
    if not len(kernels) or len(kernels) != len(metrics):
        raise ValueError("kernel and metric histories must align by cell time step")
    weights = tuple(nonnegative("lag_weight", value) for value in raw["lag_weights"])
    if not weights or not any(weights):
        raise ValueError("lag_weights must include a positive quadrature weight")
    contracted = tuple(contract_retarded_response(kernel, metric, lag_weights=weights)
                       for kernel, metric in zip(kernels, metrics))
    signed = tuple(result.total for result in contracted)
    return {
        "signed_response": list(signed), "driver": list(transfer.apply(signed)),
        "lag_contributions": [list(result.lag_contributions) for result in contracted],
        "lag_weights": list(weights), "lag_weight_units": weight_units,
        "kernel_provenance": provenance, "transfer": asdict(transfer),
        "kernel_parameter_ids": list(kernel_parameters), "kernel_evidence_ids": list(kernel_evidence),
        "parameter_ids": list(dict.fromkeys((*kernel_parameters, *transfer.parameter_ids))),
        "evidence_ids": list(dict.fromkeys((*kernel_evidence, *transfer.evidence_ids))),
        "operator_form_status": "CONDITIONAL_FORMAL_OPERATOR",
        "physical_identification_status": "OPEN", "calibration_status": STRUCTURAL_ONLY,
    }


@dataclass(frozen=True)
class AndrogenOrganInput:
    """Whole supply/binding/receptor capacity, replacing its own organ gate.

    Binding concentrations, binding-site amounts and all Kd values must share
    concentration_units. No empirical weights or normalisation are inferred.
    This composition already includes testosterone supply, so the independent
    steroidogenic_support factor must be neutral to avoid counting it twice.
    """
    binding: HormoneBindingState
    pathways: tuple[ReceptorPathway, ...]
    pathway_weights: tuple[float, ...]
    concentration_units: str
    provenance: str
    parameter_ids: tuple[str, ...]
    evidence_ids: tuple[str, ...] = ()

    def __post_init__(self):
        if not isinstance(self.binding, HormoneBindingState):
            raise TypeError("binding must be HormoneBindingState")
        object.__setattr__(self, "pathways", tuple(self.pathways))
        if not self.pathways or not all(isinstance(p, ReceptorPathway) for p in self.pathways):
            raise ValueError("pathways must contain ReceptorPathway values")
        if len({p.name for p in self.pathways}) != len(self.pathways):
            raise ValueError("receptor pathway names must be unique")
        weights = tuple(nonnegative("pathway_weight", value) for value in self.pathway_weights)
        if len(weights) != len(self.pathways) or not any(weights):
            raise ValueError("explicit positive-total pathway_weights must align with pathways")
        object.__setattr__(self, "pathway_weights", weights)
        for name in ("concentration_units", "provenance"):
            object.__setattr__(self, name, nonempty(name, getattr(self, name)))
        object.__setattr__(self, "parameter_ids", _ids(self.parameter_ids, "parameter_ids"))
        object.__setattr__(self, "evidence_ids", normalise_ids(self.evidence_ids, "evidence_ids"))

    def apply(self, couple: CoupleReproductiveState) -> tuple[CoupleReproductiveState, dict]:
        if couple.male.androgen_effective_capacity != 1:
            raise ValueError("androgen model replaces androgen_effective_capacity; leave manual gate at 1")
        if couple.male.steroidogenic_support != 1:
            raise ValueError("androgen model includes testosterone supply; leave steroidogenic_support at 1")
        result = androgen_effective_capacity(self.binding, self.pathways, pathway_weights=self.pathway_weights)
        male = replace(couple.male, androgen_effective_capacity=result.effective_capacity,
                       calibration_status=STRUCTURAL_ONLY,
                       evidence_ids=tuple(dict.fromkeys((*couple.male.evidence_ids, *self.evidence_ids))))
        trace = {**asdict(result), "concentration_units": self.concentration_units,
                 "provenance": self.provenance, "parameter_ids": list(self.parameter_ids),
                 "evidence_ids": list(self.evidence_ids), "calibration_status": STRUCTURAL_ONLY,
                 "composition_scope": "testosterone_supply_binding_and_receptor_response_once"}
        return replace(couple, male=male), trace
