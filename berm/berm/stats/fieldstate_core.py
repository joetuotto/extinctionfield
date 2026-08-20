"""Pure FieldState -> organ-memory bridge for ``fieldstate-asfr-v2``.

This module is intentionally parallel to :mod:`berm.stats.temporal_core`.
It consumes an externally supplied, local FieldState and retains the physical
features that Lindgren's premises make distinguishable: selection, vector
projection, background/personal cross terms, phase/coherence, spectral
envelope overlap and circadian timing.

It does not call ``v16``, create a country diffusion curve, or convert a
mobile-subscription proxy into an organ decrement.  A study-specific endpoint
model must provide registered reversible/persistent increments.  That makes a
full causal chain possible without treating the physics layer as a hidden TFR
coefficient.
"""

from __future__ import annotations

from dataclasses import dataclass
import math
from typing import Iterable, Mapping

from berm.biology.reproductive_state import (
    ENDPOINT_CALIBRATED,
    STRUCTURAL_ONLY,
    OrganMemoryState,
    evolve_organ_memory,
)
from berm.physics.field_state import (
    IDENTITY_TRANSFER,
    FieldState,
    FieldStateResponse,
    ReceptorState,
    TransferMatrix,
    evaluate_field_state,
)


FIELDSTATE_CORE_VERSION = "fieldstate-core-v1"


def _finite(name: str, value: float) -> float:
    if isinstance(value, bool):
        raise ValueError(f"{name} must be a finite number, not a boolean")
    try:
        resolved = float(value)
    except (TypeError, ValueError) as exc:
        raise ValueError(f"{name} must be a finite number") from exc
    if not math.isfinite(resolved):
        raise ValueError(f"{name} must be a finite number")
    return resolved


def _nonempty(name: str, value: str) -> str:
    if not isinstance(value, str) or not value.strip():
        raise ValueError(f"{name} must be a non-empty string")
    return value.strip()


def _ids(values: Iterable[str], name: str) -> tuple[str, ...]:
    result = tuple(_nonempty(name, value) for value in values)
    if len(set(result)) != len(result):
        raise ValueError(f"{name} contains duplicate IDs")
    return result


@dataclass(frozen=True)
class FieldStateFeatures:
    """Observed physics features retained before any biology coefficient.

    Values carry their FieldState normalisation.  They are *features*, not
    exposure doses, damage scores, or outcome probabilities.
    """

    organ: str
    normalization_id: str
    completeness_status: str
    legacy_timing_proxy: float
    selected_vector_magnitude: float
    tissue_axis_projection: float
    geometric_cross_term: float
    coherent_cross_term: float
    envelope_overlap: float
    night_selected_projection: float
    background_personal_cosine: float | None
    source_response: FieldStateResponse

    def __post_init__(self) -> None:
        object.__setattr__(self, "organ", _nonempty("organ", self.organ))
        object.__setattr__(
            self, "normalization_id", _nonempty("normalization_id", self.normalization_id)
        )
        object.__setattr__(
            self, "completeness_status", _nonempty("completeness_status", self.completeness_status)
        )
        for name in (
            "legacy_timing_proxy",
            "selected_vector_magnitude",
            "tissue_axis_projection",
            "geometric_cross_term",
            "coherent_cross_term",
            "envelope_overlap",
            "night_selected_projection",
        ):
            object.__setattr__(self, name, _finite(name, getattr(self, name)))
        if self.background_personal_cosine is not None:
            cosine = _finite("background_personal_cosine", self.background_personal_cosine)
            if not -1.0 <= cosine <= 1.0:
                raise ValueError("background_personal_cosine must be in [-1, 1]")
            object.__setattr__(self, "background_personal_cosine", cosine)
        if not isinstance(self.source_response, FieldStateResponse):
            raise TypeError("source_response must be a FieldStateResponse")

    def as_dict(self) -> dict[str, float | str | None]:
        """A serialisable feature record without silently changing signs."""
        return {
            "organ": self.organ,
            "normalization_id": self.normalization_id,
            "completeness_status": self.completeness_status,
            "legacy_timing_proxy": self.legacy_timing_proxy,
            "selected_vector_magnitude": self.selected_vector_magnitude,
            "tissue_axis_projection": self.tissue_axis_projection,
            "geometric_cross_term": self.geometric_cross_term,
            "coherent_cross_term": self.coherent_cross_term,
            "envelope_overlap": self.envelope_overlap,
            "night_selected_projection": self.night_selected_projection,
            "background_personal_cosine": self.background_personal_cosine,
        }


def extract_fieldstate_features(response: FieldStateResponse) -> FieldStateFeatures:
    """Expose all Lindgren-relevant response components as named features."""
    if not isinstance(response, FieldStateResponse):
        raise TypeError("response must be a FieldStateResponse")
    return FieldStateFeatures(
        organ=response.organ,
        normalization_id=response.normalization_id,
        completeness_status=response.completeness.status,
        legacy_timing_proxy=response.legacy_timing_proxy,
        selected_vector_magnitude=response.selected_vector_magnitude,
        tissue_axis_projection=response.tissue_axis_projection,
        geometric_cross_term=response.geometric_cross_term,
        coherent_cross_term=response.coherent_cross_term,
        envelope_overlap=(
            response.ambient_envelope_overlap
            + response.personal_envelope_overlap
            + response.mixed_envelope_overlap
        ),
        night_selected_projection=response.night_selected_projection,
        background_personal_cosine=response.background_personal_cosine,
        source_response=response,
    )


@dataclass(frozen=True)
class RegisteredOrganIncrement:
    """A pre-specified endpoint mapping for a single organ/time interval.

    ``reversible_increment`` and ``persistent_increment`` must be derived
    upstream using a registered parameter set and a defined endpoint.  The
    source field is intentionally not read here: calling code must make the
    physics-to-biology mapping explicit and auditable.
    """

    organ: str
    reversible_increment: float
    persistent_increment: float
    reversible_retention: float
    persistent_retention: float = 1.0
    parameter_ids: tuple[str, ...] = ()
    evidence_ids: tuple[str, ...] = ()
    calibration_status: str = STRUCTURAL_ONLY
    endpoint: str = "unspecified"

    def __post_init__(self) -> None:
        object.__setattr__(self, "organ", _nonempty("organ", self.organ))
        for name in (
            "reversible_increment",
            "persistent_increment",
            "reversible_retention",
            "persistent_retention",
        ):
            value = _finite(name, getattr(self, name))
            if name.endswith("retention"):
                if not 0.0 <= value <= 1.0:
                    raise ValueError(f"{name} must be in [0, 1]")
            elif value < 0.0:
                raise ValueError(f"{name} must be non-negative")
            object.__setattr__(self, name, value)
        object.__setattr__(self, "parameter_ids", _ids(self.parameter_ids, "parameter_id"))
        object.__setattr__(self, "evidence_ids", _ids(self.evidence_ids, "evidence_id"))
        if self.calibration_status not in {STRUCTURAL_ONLY, ENDPOINT_CALIBRATED}:
            raise ValueError(
                "calibration_status must be STRUCTURAL_ONLY or ENDPOINT_CALIBRATED"
            )
        object.__setattr__(self, "endpoint", _nonempty("endpoint", self.endpoint))


@dataclass(frozen=True)
class FieldStateCoreResult:
    """One complete physical-input -> organ-memory transition."""

    model_version: str
    features: FieldStateFeatures
    organ_memory: OrganMemoryState
    registered_increment: RegisteredOrganIncrement
    provenance: Mapping[str, str]

    @property
    def calibration_status(self) -> str:
        """Report numerical endpoint-calibration resolution only.

        A ``STRUCTURAL_ONLY`` result may still be an evidence-constrained
        FieldState transition and may support direction, lag, transfer and
        posterior-predictive signatures.  It simply does not claim that this
        particular organ endpoint has a narrow, locally calibrated coefficient.
        """
        return (
            ENDPOINT_CALIBRATED
            if (
                self.features.completeness_status == "MEASUREMENT_READY_FIELD_STATE"
                and self.registered_increment.calibration_status == ENDPOINT_CALIBRATED
                and self.organ_memory.calibration_status == ENDPOINT_CALIBRATED
            )
            else STRUCTURAL_ONLY
        )


def evaluate_fieldstate_core(
    state: FieldState,
    receptor: ReceptorState,
    *,
    previous_memory: OrganMemoryState,
    registered_increment: RegisteredOrganIncrement,
    transfer: TransferMatrix = IDENTITY_TRANSFER,
    provenance: Mapping[str, str] | None = None,
) -> FieldStateCoreResult:
    """Evaluate FieldState and advance only the matching organ R/P state.

    This is intentionally a small bridge: it preserves enough information to
    test vector, phase, spectrum, organ geometry, circadian and memory
    predictions independently.  It does not decide the numerical response of
    a BTB, ovary, sperm cell or brain barrier.
    """
    if not isinstance(previous_memory, OrganMemoryState):
        raise TypeError("previous_memory must be an OrganMemoryState")
    if not isinstance(registered_increment, RegisteredOrganIncrement):
        raise TypeError("registered_increment must be a RegisteredOrganIncrement")
    if receptor.organ != previous_memory.organ or receptor.organ != registered_increment.organ:
        raise ValueError(
            "receptor.organ, previous_memory.organ, and registered_increment.organ "
            "must be identical"
        )
    response = evaluate_field_state(state, receptor, transfer)
    features = extract_fieldstate_features(response)
    memory = evolve_organ_memory(
        previous_memory,
        reversible_increment=registered_increment.reversible_increment,
        persistent_increment=registered_increment.persistent_increment,
        reversible_retention=registered_increment.reversible_retention,
        persistent_retention=registered_increment.persistent_retention,
        parameter_ids=registered_increment.parameter_ids,
        evidence_ids=registered_increment.evidence_ids,
        calibration_status=registered_increment.calibration_status,
        field_state_status=response.completeness.status,
    )
    if provenance is not None and not isinstance(provenance, Mapping):
        raise ValueError("provenance must be a mapping")
    return FieldStateCoreResult(
        model_version=FIELDSTATE_CORE_VERSION,
        features=features,
        organ_memory=memory,
        registered_increment=registered_increment,
        provenance=dict(provenance or {}),
    )


__all__ = [
    "FIELDSTATE_CORE_VERSION",
    "FieldStateCoreResult",
    "FieldStateFeatures",
    "RegisteredOrganIncrement",
    "evaluate_fieldstate_core",
    "extract_fieldstate_features",
]
