"""Explicit biological coordination closures downstream of BERM's L2 bridge.

The 2025 premise ``g = eta + kappa A ⊗ A`` supplies the tensor perturbation;
a separately specified response kernel K(S) is still required to obtain a
molecular input.  This module starts with that supplied biological state.  It
does not estimate K, infer a redox increment from a field, or calibrate an
environmental dose.  Its analytic closures express the component-supported
signal/receptivity, phase-relation and recovery structure of the 2026 synthesis.
All mappings are STRUCTURAL_ONLY until an endpoint-specific fit is supplied.
"""

from __future__ import annotations

from dataclasses import dataclass
import math
from typing import Iterable, Mapping


COORDINATION_VERSION = "biological-coordination-v1"


def _number(name: str, value: float, *, minimum: float | None = None) -> float:
    if isinstance(value, bool):
        raise ValueError(f"{name} must be a finite number")
    try:
        value = float(value)
    except (TypeError, ValueError, OverflowError) as exc:
        raise ValueError(f"{name} must be a finite number") from exc
    if not math.isfinite(value) or (minimum is not None and value < minimum):
        raise ValueError(f"{name} must be finite and >= {minimum}" if minimum is not None
                         else f"{name} must be finite")
    return value


def _text(name: str, value: str) -> str:
    if not isinstance(value, str) or not value.strip():
        raise ValueError(f"{name} must be a non-empty string")
    return value.strip()


@dataclass(frozen=True)
class PhaseRelation:
    """One tissue pair's phase difference relative to its desired lag.

    Angles are in radians at a common frequency.  An appropriate antiphase
    relationship therefore scores +1 when ``preferred_lag_radians = pi``.
    The score is a coordination descriptor, not a probability or injury dose.
    """

    observed_lag_radians: float
    preferred_lag_radians: float
    weight: float = 1.0

    def __post_init__(self) -> None:
        for name in ("observed_lag_radians", "preferred_lag_radians"):
            object.__setattr__(self, name, _number(name, getattr(self, name)))
        object.__setattr__(self, "weight", _number("weight", self.weight, minimum=0))

    @property
    def alignment(self) -> float:
        return math.cos(math.remainder(self.observed_lag_radians, math.tau)
                        - math.remainder(self.preferred_lag_radians, math.tau))


def phase_coordination(relations: Iterable[PhaseRelation]) -> float:
    """Weighted Q in [-1, 1], preserving the tissue-specific preferred lags."""
    relations = tuple(relations)
    if not relations or not all(isinstance(item, PhaseRelation) for item in relations):
        raise ValueError("relations must contain PhaseRelation values")
    scale = max(item.weight for item in relations)
    if scale == 0:
        raise ValueError("relations must have positive total weight")
    denominator = math.fsum(item.weight / scale for item in relations)
    return math.fsum(item.weight / scale * item.alignment for item in relations) / denominator


@dataclass(frozen=True)
class HormoneReceptivityState:
    """Same-frequency harmonic signal and tissue receptivity over full cycles.

    H = mean + amplitude*cos(wt); R = mean + amplitude*cos(wt + lag).
    Signal means/amplitudes use caller-named concentration units; receptivity
    is dimensionless.  Non-negative waveforms require amplitude <= mean.
    ``average_response`` has the signal's units.  ``timing_factor`` compares
    this response to the aligned response with the same means/amplitudes, so
    it represents timing only, without treating a serum level as tissue dose.
    """

    signal_mean: float
    signal_amplitude: float
    receptivity_mean: float
    receptivity_amplitude: float
    lag_radians: float
    signal_units: str

    def __post_init__(self) -> None:
        for name in ("signal_mean", "signal_amplitude", "receptivity_mean", "receptivity_amplitude"):
            object.__setattr__(self, name, _number(name, getattr(self, name), minimum=0))
        object.__setattr__(self, "lag_radians", _number("lag_radians", self.lag_radians))
        object.__setattr__(self, "signal_units", _text("signal_units", self.signal_units))
        if self.signal_amplitude > self.signal_mean or self.receptivity_amplitude > self.receptivity_mean:
            raise ValueError("amplitudes cannot exceed means for non-negative waveforms")
        if self.aligned_response <= 0 or not math.isfinite(self.aligned_response):
            raise ValueError("aligned_response must be positive and finite")

    @property
    def aligned_response(self) -> float:
        return (self.signal_mean * self.receptivity_mean
                + 0.5 * self.signal_amplitude * self.receptivity_amplitude)

    @property
    def average_response(self) -> float:
        alignment = phase_coordination((PhaseRelation(self.lag_radians, 0),))
        return (self.signal_mean * self.receptivity_mean
                + 0.5 * self.signal_amplitude * self.receptivity_amplitude * alignment)

    @property
    def timing_factor(self) -> float:
        return self.average_response / self.aligned_response


@dataclass(frozen=True)
class RedoxFunctionalState:
    """Named Gaussian functional window, with caller-supplied optimum/width.

    The window is an explicit phenomenological closure, not a fit to Zhang's
    mouse data or a universal optimal ROS concentration.  Value, optimum and
    width share ``units``.  The factor is relative to the declared optimum.
    A positive redox increment can improve or reduce function depending on
    the starting state; the increment must be supplied independently.
    """

    value: float
    optimum: float
    width: float
    units: str

    def __post_init__(self) -> None:
        for name in ("value", "optimum", "width"):
            object.__setattr__(self, name, _number(name, getattr(self, name)))
        if self.width <= 0:
            raise ValueError("width must be positive")
        object.__setattr__(self, "units", _text("units", self.units))

    @property
    def functional_factor(self) -> float:
        distance = (self.value - self.optimum) / self.width
        return math.exp(-0.5 * distance * distance)


@dataclass(frozen=True)
class ReproductiveCoordinationState:
    """Opt-in estimates for distinct clock and oocyte-redox capacity gates.

    Parameter IDs identify the harmonic and redox mapping assumptions.  Their
    factors replace matching manual gates in FemaleReproductiveState; they
    are never multiplied a second time.  Component studies constrain these
    forms but cannot by themselves confer endpoint calibration.
    """

    hormone_timing: HormoneReceptivityState | None = None
    oocyte_redox: RedoxFunctionalState | None = None
    parameter_ids: tuple[str, ...] = ()
    evidence_ids: tuple[str, ...] = ()

    def __post_init__(self) -> None:
        if self.hormone_timing is not None and not isinstance(self.hormone_timing, HormoneReceptivityState):
            raise TypeError("hormone_timing must be a HormoneReceptivityState")
        if self.oocyte_redox is not None and not isinstance(self.oocyte_redox, RedoxFunctionalState):
            raise TypeError("oocyte_redox must be a RedoxFunctionalState")
        if self.hormone_timing is None and self.oocyte_redox is None:
            raise ValueError("at least one coordination component is required")
        for name in ("parameter_ids", "evidence_ids"):
            if isinstance(getattr(self, name), (str, bytes)):
                raise ValueError(f"{name} must be a collection of IDs, not a string")
            ids = tuple(_text(name, item) for item in getattr(self, name))
            if len(set(ids)) != len(ids):
                raise ValueError(f"{name} must contain unique IDs")
            object.__setattr__(self, name, ids)
        if not self.parameter_ids:
            raise ValueError("parameter_ids must identify the coordination mapping")

    @property
    def calibration_status(self) -> str:
        return "STRUCTURAL_ONLY"

    def as_dict(self) -> dict:
        result = {
            "version": COORDINATION_VERSION,
            "calibration_status": self.calibration_status,
            "parameter_ids": list(self.parameter_ids),
            "evidence_ids": list(self.evidence_ids),
        }
        if self.hormone_timing is not None:
            state = self.hormone_timing
            result["hormone_timing"] = {
                "signal_mean": state.signal_mean,
                "signal_amplitude": state.signal_amplitude,
                "signal_units": state.signal_units,
                "receptivity_mean": state.receptivity_mean,
                "receptivity_amplitude": state.receptivity_amplitude,
                "lag_radians": state.lag_radians,
                "average_response": state.average_response,
                "timing_factor": state.timing_factor,
                "mapping": "relative harmonic overlap replaces the ovulatory clock gate",
            }
        if self.oocyte_redox is not None:
            state = self.oocyte_redox
            result["oocyte_redox"] = {
                "value": state.value, "optimum": state.optimum,
                "width": state.width, "units": state.units,
                "functional_factor": state.functional_factor,
                "mapping": "Gaussian functional window replaces the oocyte redox gate",
            }
        return result


def recovery_retention(*, elapsed_seconds: float, recovery_time_seconds: float) -> float:
    """Exact retention exp(-elapsed/tau) for first-order recovery in seconds."""
    elapsed = _number("elapsed_seconds", elapsed_seconds, minimum=0)
    tau = _number("recovery_time_seconds", recovery_time_seconds, minimum=0)
    if tau == 0:
        raise ValueError("recovery_time_seconds must be positive")
    return math.exp(-elapsed / tau)


def advance_chemical_memory(
    previous: float, *, increment: float, elapsed_seconds: float, recovery_time_seconds: float
) -> float:
    """Decay an existing state then apply a signed, instantaneous increment.

    Previous state and increment share caller-registered biological units.
    This is a pulse-at-the-end convention, not a continuous-infusion solver.
    """
    previous = _number("previous", previous)
    increment = _number("increment", increment)
    result = (recovery_retention(elapsed_seconds=elapsed_seconds,
                                recovery_time_seconds=recovery_time_seconds) * previous + increment)
    return _number("updated memory", result)


def steady_pulse_memory(*, increment: float, interval_seconds: float, recovery_time_seconds: float) -> float:
    """Post-pulse steady state q/(1-exp(-interval/tau)), in increment units."""
    increment = _number("increment", increment)
    interval = _number("interval_seconds", interval_seconds, minimum=0)
    tau = _number("recovery_time_seconds", recovery_time_seconds, minimum=0)
    if interval == 0 or tau == 0:
        raise ValueError("interval_seconds and recovery_time_seconds must be positive")
    denominator = -math.expm1(-interval / tau)
    if denominator == 0:
        raise ValueError("interval/recovery ratio is below numerical resolution")
    return _number("steady pulse memory", increment / denominator)


def conditional_gate_success(gates: Mapping[str, float]) -> float:
    """Chain rule for distinct conditional gates, without assuming independence.

    Each supplied probability conditions on the preceding gates succeeding;
    callers must not insert multiple measurements of the same biological gate.
    """
    if not isinstance(gates, Mapping) or not gates:
        raise ValueError("gates must be a non-empty mapping of distinct conditional stages")
    probabilities = []
    for name, probability in gates.items():
        _text("gate name", name)
        probability = _number(name, probability, minimum=0)
        if probability > 1:
            raise ValueError("gate probabilities must be in [0, 1]")
        probabilities.append(probability)
    return math.prod(probabilities)


__all__ = [
    "COORDINATION_VERSION", "PhaseRelation", "phase_coordination",
    "HormoneReceptivityState", "RedoxFunctionalState", "ReproductiveCoordinationState",
    "recovery_retention", "advance_chemical_memory", "steady_pulse_memory",
    "conditional_gate_success",
]
