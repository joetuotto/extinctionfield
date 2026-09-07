"""Shared validation helpers and calibration vocabulary for the modulome.

The modulome extension answers one question: *how does a measurable cell
state determine the strength, direction and time course of a field
response?*  It therefore never carries a default biological coefficient.
Every quantitative mapping is supplied by the caller together with its
parameter and evidence identifiers, exactly as
``berm.biology.reproductive_state`` requires for organ memory.

Epistemic tags used across the package
--------------------------------------
[L1]           algebraic consequence of a declared premise
[KANDIDAATTI]  additional assumption of this extension, not derived
[HAVAINTO]     measured under stated experimental conditions
[AVOIN]        open question, no registered parameterisation yet
"""

from __future__ import annotations

import math
from typing import Iterable, Mapping

from berm.biology.reproductive_state import (
    ENDPOINT_CALIBRATED,
    STRUCTURAL_ONLY,
    VALID_CALIBRATION_STATUSES,
)

MODULOME_VERSION = "modulome-state-v1"

__all__ = [
    "ENDPOINT_CALIBRATED",
    "MODULOME_VERSION",
    "STRUCTURAL_ONLY",
    "VALID_CALIBRATION_STATUSES",
    "check_calibration_status",
    "combine_statuses",
    "finite",
    "nonempty",
    "nonnegative",
    "normalise_ids",
    "read_only_measurements",
    "unit_interval",
]


def finite(name: str, value: float) -> float:
    if isinstance(value, bool):
        raise ValueError(f"{name} must be a finite number, not a boolean")
    try:
        resolved = float(value)
    except (TypeError, ValueError) as exc:
        raise ValueError(f"{name} must be a finite number") from exc
    if not math.isfinite(resolved):
        raise ValueError(f"{name} must be a finite number")
    return resolved


def nonnegative(name: str, value: float) -> float:
    resolved = finite(name, value)
    if resolved < 0.0:
        raise ValueError(f"{name} must be non-negative")
    return resolved


def unit_interval(name: str, value: float) -> float:
    resolved = finite(name, value)
    if not 0.0 <= resolved <= 1.0:
        raise ValueError(f"{name} must be in [0, 1]")
    return resolved


def nonempty(name: str, value: str) -> str:
    if not isinstance(value, str) or not value.strip():
        raise ValueError(f"{name} must be a non-empty string")
    return value.strip()


def normalise_ids(values: Iterable[str], name: str) -> tuple[str, ...]:
    if isinstance(values, (str, bytes)):
        raise ValueError(f"{name} must be a collection of IDs, not a string")
    resolved = tuple(nonempty(name, value) for value in values)
    if len(set(resolved)) != len(resolved):
        raise ValueError(f"{name} contains duplicate IDs")
    return resolved


def check_calibration_status(value: str) -> str:
    if value not in VALID_CALIBRATION_STATUSES:
        raise ValueError(
            "calibration_status must be STRUCTURAL_ONLY or ENDPOINT_CALIBRATED"
        )
    return value


def combine_statuses(*statuses: str) -> str:
    """Calibrated only when every contributing record is calibrated."""
    return (
        ENDPOINT_CALIBRATED
        if statuses and all(status == ENDPOINT_CALIBRATED for status in statuses)
        else STRUCTURAL_ONLY
    )


def read_only_measurements(
    name: str, values: Mapping[str, float]
) -> tuple[tuple[str, float], ...]:
    """Freeze a measurement mapping into sorted, validated key/value pairs.

    Measurements are the observed quantities that *define* a state coordinate.
    They are retained so a later analysis can check which measurement moved,
    rather than only seeing the aggregated coordinate.
    """
    if not isinstance(values, Mapping):
        raise ValueError(f"{name} must be a mapping")
    return tuple(
        sorted(
            (nonempty(f"{name} key", key), finite(f"{name}[{key}]", value))
            for key, value in values.items()
        )
    )
