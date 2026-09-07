"""Provenance and validation for conditional interaction operators."""

from dataclasses import dataclass
import math

STRUCTURAL_ONLY = "STRUCTURAL_ONLY"
ENDPOINT_CALIBRATED = "ENDPOINT_CALIBRATED"


def finite(name, value):
    if isinstance(value, bool):
        raise ValueError(f"{name} must be a finite number")
    try:
        number = float(value)
    except (TypeError, ValueError) as exc:
        raise ValueError(f"{name} must be a finite number") from exc
    if not math.isfinite(number):
        raise ValueError(f"{name} must be a finite number")
    return number


def positive(name, value, *, zero=False):
    number = finite(name, value)
    if number < 0 or (number == 0 and not zero):
        raise ValueError(f"{name} must be {'non-negative' if zero else 'positive'}")
    return number


def text(name, value):
    if not isinstance(value, str) or not value.strip():
        raise ValueError(f"{name} must be non-empty")
    return value.strip()


def ids(name, values):
    if isinstance(values, str):
        raise ValueError(f"{name} must be a sequence of IDs")
    result = tuple(text(name, item) for item in values)
    if len(set(result)) != len(result):
        raise ValueError(f"{name} must be unique")
    return result


def vector(name, values, length, *, nonnegative=False):
    result = tuple(finite(name, item) for item in values)
    if len(result) != length:
        raise ValueError(f"{name} must have length {length}")
    if nonnegative and any(item < 0 for item in result):
        raise ValueError(f"{name} must be non-negative")
    return result


@dataclass(frozen=True)
class InteractionProvenance:
    """Scope of an input, not evidence for upstream geometry or EMF causation.

    Empty evidence IDs explicitly mean no study supports this parameterisation.
    ENDPOINT_CALIBRATED is a caller declaration requiring parameter and evidence
    IDs; it never upgrades an upstream bridge. Component observations and the
    composed inference remain distinct through ``basis`` and ``input_bases``.
    """

    context: str
    parameter_ids: tuple[str, ...]
    evidence_ids: tuple[str, ...]
    calibration_status: str = STRUCTURAL_ONLY
    basis: str = "HYPOTHESIS"
    input_bases: tuple[str, ...] = ()
    l2_bridge_status: str = "OPEN"

    def __post_init__(self):
        object.__setattr__(self, "context", text("context", self.context))
        for name in ("parameter_ids", "evidence_ids"):
            object.__setattr__(self, name, ids(name, getattr(self, name)))
        if self.calibration_status not in {STRUCTURAL_ONLY, ENDPOINT_CALIBRATED}:
            raise ValueError("unknown calibration_status")
        if self.basis not in {"OBSERVATION", "HYPOTHESIS", "SYNTHETIC_INFERENCE"}:
            raise ValueError("unknown basis")
        if self.l2_bridge_status != "OPEN":
            raise ValueError("interaction operators cannot close the upstream L2 bridge")
        if self.calibration_status == ENDPOINT_CALIBRATED:
            if not self.parameter_ids or not self.evidence_ids:
                raise ValueError("calibrated records require parameter and evidence IDs")
        object.__setattr__(self, "input_bases", tuple(self.input_bases))


def parameters(provenance):
    if not isinstance(provenance, InteractionProvenance):
        raise ValueError("InteractionProvenance is required")
    if not provenance.parameter_ids:
        raise ValueError("coefficients require caller-supplied parameter IDs")


def combine(context, *records):
    """Composing calibrated components does not calibrate the new operator."""
    return InteractionProvenance(
        context=context,
        parameter_ids=tuple(dict.fromkeys(p for r in records for p in r.parameter_ids)),
        evidence_ids=tuple(dict.fromkeys(e for r in records for e in r.evidence_ids)),
        basis="SYNTHETIC_INFERENCE",
        input_bases=tuple(dict.fromkeys(b for r in records for b in (r.basis, *r.input_bases))),
    )
