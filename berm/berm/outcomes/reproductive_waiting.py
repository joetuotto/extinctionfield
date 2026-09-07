"""Couple heterogeneity and finite-window supported-conception scenarios.

These are conditional geometric waiting models: each couple's conception
probability stays constant across the supplied number of eligible cycles,
conditional on its state.  Mix couples *after* calculating their survival
curves.  ``supported_conception_probability`` applies the pregnancy-support
factor to the FIRST conception.  Interpreting that relative factor as a
probability assumes unit support in the declared reference state.  This is
a synthetic scenario probability, not a calendar birth rate or the chance
of any supported conception after repeated losses and re-entry.  Gestation,
post-loss re-entry, parity-dependent state changes and calendar tempo need
their own supplied models.  No national forecasts are changed by this module.
"""

from __future__ import annotations

from dataclasses import dataclass
import math
from typing import Iterable

from berm.biology.reproductive_state import CoupleReproductiveState, STRUCTURAL_ONLY


def _finite(name: str, value: float) -> float:
    if isinstance(value, bool):
        raise ValueError(f"{name} must be finite")
    try:
        value = float(value)
    except (TypeError, ValueError, OverflowError) as exc:
        raise ValueError(f"{name} must be finite") from exc
    if not math.isfinite(value):
        raise ValueError(f"{name} must be finite")
    return value


def _count(name: str, value: int) -> int:
    resolved = _finite(name, value)
    if resolved < 0 or not resolved.is_integer():
        raise ValueError(f"{name} must be a non-negative integer")
    return int(resolved)


@dataclass(frozen=True)
class CoupleWaitingState:
    """One pair and its named scenario's reference conception probability.

    ``reference_cycle_conception_probability`` is a probability per eligible
    cycle *before* the relative conception-capacity factors.  It must not
    already include the same capacity decrement.  ``weight`` is a non-negative
    relative stratum size; it is normalized within each supplied cohort.
    """

    couple: CoupleReproductiveState
    reference_cycle_conception_probability: float
    weight: float = 1.0

    def __post_init__(self) -> None:
        if not isinstance(self.couple, CoupleReproductiveState):
            raise TypeError("couple must be a CoupleReproductiveState")
        probability = _finite("reference_cycle_conception_probability", self.reference_cycle_conception_probability)
        weight = _finite("weight", self.weight)
        if not 0 <= probability <= 1:
            raise ValueError("reference_cycle_conception_probability must be in [0, 1]")
        if weight < 0:
            raise ValueError("weight must be non-negative")
        object.__setattr__(self, "reference_cycle_conception_probability", probability)
        object.__setattr__(self, "weight", weight)

    @property
    def cycle_conception_probability(self) -> float:
        return self.reference_cycle_conception_probability * self.couple.conception_capacity


@dataclass(frozen=True)
class WaitingCohortResult:
    cycles: int
    mean_cycle_conception_probability: float
    conceived_probability: float
    supported_conception_probability: float
    survivor_probability: float
    next_cycle_conception_probability: float | None
    restricted_mean_waiting_cycles: float

    def as_dict(self) -> dict:
        return {
            "cycles": self.cycles,
            "mean_cycle_conception_probability": self.mean_cycle_conception_probability,
            "conceived_probability": self.conceived_probability,
            "supported_conception_probability": self.supported_conception_probability,
            "survivor_probability": self.survivor_probability,
            "next_cycle_conception_probability": self.next_cycle_conception_probability,
            "restricted_mean_waiting_cycles": self.restricted_mean_waiting_cycles,
            "endpoint": "first conception with downstream support within eligible cycles; not calendar births",
            "support_assumption": "The relative pregnancy-support factor is a conditional probability only under unit reference support; no re-entry after a loss is modeled.",
        }


def summarize_waiting_cohort(states: Iterable[CoupleWaitingState], cycles: int) -> WaitingCohortResult:
    """Mix survival curves, preserving the lower-fecundability survivor tail.

    Restricted mean waiting is E[min(T, cycles)] with T >= 1.  The next-cycle
    probability conditions on remaining without conception at the horizon;
    it is None only when all positive-weight strata have certain conception.
    Log-space conditioning preserves the hazard when the unconditional
    survivor probability is too small to represent as a floating-point value.
    """
    cycles = _count("cycles", cycles)
    states = tuple(states)
    if not states or not all(isinstance(state, CoupleWaitingState) for state in states):
        raise ValueError("states must contain CoupleWaitingState values")
    scale = max(state.weight for state in states)
    if scale == 0:
        raise ValueError("states must have positive total weight")
    total = math.fsum(state.weight / scale for state in states)
    weighted = []
    log_survivor_terms = []
    for state in states:
        weight = (state.weight / scale) / total
        probability = state.cycle_conception_probability
        if cycles == 0 or probability == 0:
            survival, conceived = 1.0, 0.0
            log_survival = 0.0
        elif probability == 1:
            survival, conceived = 0.0, 1.0
            log_survival = -math.inf
        else:
            log_survival = cycles * math.log1p(-probability)
            survival, conceived = math.exp(log_survival), -math.expm1(log_survival)
        restricted_wait = float(cycles) if probability == 0 else conceived / probability
        weighted.append((weight, probability, survival, conceived, restricted_wait, state.couple.live_birth_support))
        if state.weight > 0 and math.isfinite(log_survival):
            log_survivor_terms.append((math.log(state.weight) + log_survival, probability))
    survivor = math.fsum(w * s for w, _, s, _, _, _ in weighted)
    if log_survivor_terms:
        largest_log = max(log_weight for log_weight, _ in log_survivor_terms)
        relative_survivors = [(math.exp(log_weight - largest_log), p) for log_weight, p in log_survivor_terms]
        next_probability = (math.fsum(w * p for w, p in relative_survivors)
                            / math.fsum(w for w, _ in relative_survivors))
    else:
        next_probability = None
    return WaitingCohortResult(
        cycles=cycles,
        mean_cycle_conception_probability=math.fsum(w * p for w, p, _, _, _, _ in weighted),
        conceived_probability=math.fsum(w * c for w, _, _, c, _, _ in weighted),
        supported_conception_probability=math.fsum(w * c * support for w, _, _, c, _, support in weighted),
        survivor_probability=survivor,
        next_cycle_conception_probability=next_probability,
        restricted_mean_waiting_cycles=math.fsum(w * wait for w, _, _, _, wait, _ in weighted),
    )


@dataclass(frozen=True)
class WaitingHorizonComparison:
    """Explicit alternative biological ratio for a conditional ASFR scenario.

    Using supported-first-conception probability as a biological ASFR ratio is an
    additional STRUCTURAL_ONLY mapping.  It REPLACES the linear couple-capacity
    ratio.  ``starting_parity`` records which transition is being considered;
    this model does not claim to predict completed family size from a single
    horizon, and the horizon is not automatically a calendar year.
    """

    reference_states: tuple[CoupleWaitingState, ...]
    target_states: tuple[CoupleWaitingState, ...]
    cycles: int
    parameter_ids: tuple[str, ...]
    starting_parity: int = 0
    evidence_ids: tuple[str, ...] = ()

    def __post_init__(self) -> None:
        object.__setattr__(self, "cycles", _count("cycles", self.cycles))
        object.__setattr__(self, "starting_parity", _count("starting_parity", self.starting_parity))
        for name in ("reference_states", "target_states"):
            states = tuple(getattr(self, name))
            summarize_waiting_cohort(states, self.cycles)
            object.__setattr__(self, name, states)
        for name in ("parameter_ids", "evidence_ids"):
            if isinstance(getattr(self, name), (str, bytes)):
                raise ValueError(f"{name} must be a collection of IDs, not a string")
            ids = tuple(getattr(self, name))
            if any(not isinstance(value, str) or not value.strip() for value in ids):
                raise ValueError(f"{name} must contain non-empty strings")
            ids = tuple(value.strip() for value in ids)
            if len(ids) != len(set(ids)):
                raise ValueError(f"{name} must contain unique IDs")
            object.__setattr__(self, name, ids)
        if not self.parameter_ids:
            raise ValueError("parameter_ids must identify the waiting-to-ASFR scenario mapping")
        if self.reference.supported_conception_probability <= 0:
            raise ValueError("reference supported-conception probability must be positive")
        _finite("waiting biological ratio", self.biological_ratio)

    @property
    def reference(self) -> WaitingCohortResult:
        return summarize_waiting_cohort(self.reference_states, self.cycles)

    @property
    def target(self) -> WaitingCohortResult:
        return summarize_waiting_cohort(self.target_states, self.cycles)

    @property
    def biological_ratio(self) -> float:
        return _finite("waiting biological ratio", self.target.supported_conception_probability
                       / self.reference.supported_conception_probability)

    @property
    def calibration_status(self) -> str:
        return STRUCTURAL_ONLY

    def as_dict(self) -> dict:
        return {
            "mapping": "finite-window-supported-conception-ratio",
            "calibration_status": self.calibration_status,
            "starting_parity": self.starting_parity,
            "eligible_cycles": self.cycles,
            "biological_ratio": self.biological_ratio,
            "reference": self.reference.as_dict(),
            "target": self.target.as_dict(),
            "parameter_ids": list(self.parameter_ids),
            "evidence_ids": list(self.evidence_ids),
            "field_state_statuses": {
                "reference": sorted({state.couple.field_state_status for state in self.reference_states if state.weight > 0}),
                "target": sorted({state.couple.field_state_status for state in self.target_states if state.weight > 0}),
            },
            "assumption": "Supported-first-conception ratio substitutes for the biological ASFR term under unit reference pregnancy support; re-entry after loss, gestation and calendar tempo require an external mapping.",
        }


__all__ = ["CoupleWaitingState", "WaitingCohortResult", "summarize_waiting_cohort", "WaitingHorizonComparison"]
