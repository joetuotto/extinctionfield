"""Qualitative Epistapege observability branch of BERM.

Epistapege is not a second model and it is not a FieldState output.  It names
BERM's testable civilization-level composition in which a latent biological
state can alter behavioural weighting, be translated into an accessible
narrative, and then be reused as the measured explanatory variable by an
institution.  Component findings may constrain individual transitions; the
complete multiscale route remains open until it is tested in one longitudinal
design.
"""

from __future__ import annotations

from dataclasses import dataclass
import math
from typing import Iterable


EPISTAPEGE_STATUS = "open_testable_extension"
EPISTAPEGE_CANONICAL_ROUTE = "/civilization/epistapege"

# The website reading order is pedagogical.  The conceptual sequence below is
# the proposed causal-observability sequence and must not be interpreted as a
# calibrated historical law.
CIVILIZATION_READING_SEQUENCE = (
    "PATHOPEGE",
    "EPISTAPEGE",
    "PATOPOLIS",
    "PATOKRATIA",
    "PATOPOLITEIA",
    "PATHOPOLITES",
    "PATOKINESIS",
)
EPISTAPEGE_CONCEPTUAL_SEQUENCE = (
    "PATHOPEGE",
    "EPISTAPEGE",
    "PATHOREA",
    "PATHOSTASIS",
    "PATOPOLITEIA",
)


@dataclass(frozen=True)
class ObservabilityTransition:
    """One explicitly testable transition in the Epistapege composition."""

    source: str
    target: str
    evidence_class: str
    required_test: str


@dataclass(frozen=True)
class BehaviouralStratum:
    """One measured individual-state/context stratum in a forward aggregation.

    ``outcome_probability`` is a conditional individual probability, not a
    diagnosis inferred from an aggregate political result.  The explicit
    weights keep BERM's individual-to-population direction separate from the
    invalid reverse ecological inference.
    """

    biological_state_id: str
    social_context_id: str
    outcome_probability: float
    population_weight: float

    def __post_init__(self) -> None:
        for name in ("biological_state_id", "social_context_id"):
            value = getattr(self, name)
            if not isinstance(value, str) or not value.strip():
                raise ValueError(f"{name} must be a non-empty identifier")
        for name in ("outcome_probability", "population_weight"):
            value = float(getattr(self, name))
            if not math.isfinite(value) or not 0.0 <= value <= 1.0:
                raise ValueError(f"{name} must be in [0, 1]")


def aggregate_behaviour_probability(strata: Iterable[BehaviouralStratum]) -> float:
    """Return ``sum_s P(Y|z_s,x_s) w_s / sum_s w_s``.

    This is BERM's explicit forward aggregation operator.  It permits
    heterogeneous and even oppositely signed stratum effects; it does not
    assign an individual's biological state from the population outcome.
    """

    values = tuple(strata)
    if not values or not all(isinstance(value, BehaviouralStratum) for value in values):
        raise ValueError("strata must contain at least one BehaviouralStratum")
    total_weight = sum(value.population_weight for value in values)
    if total_weight <= 0.0:
        raise ValueError("at least one population weight must be positive")
    return sum(
        value.outcome_probability * value.population_weight for value in values
    ) / total_weight


def institutional_memory_update(
    previous_state: float,
    current_aggregate_report: float,
    *,
    retention: float,
) -> float:
    """Update a normalized institutional state with explicit persistence.

    ``I[t+1] = retention*I[t] + (1-retention)*P[t]``.  The operation states
    the memory assumption used by the Epistapege extension without claiming a
    calibrated historical retention coefficient.
    """

    resolved = {
        "previous_state": float(previous_state),
        "current_aggregate_report": float(current_aggregate_report),
        "retention": float(retention),
    }
    if any(not math.isfinite(value) or not 0.0 <= value <= 1.0 for value in resolved.values()):
        raise ValueError("institutional state, report and retention must be in [0, 1]")
    return resolved["retention"] * resolved["previous_state"] + (
        1.0 - resolved["retention"]
    ) * resolved["current_aggregate_report"]


EPISTAPEGE_TRANSITIONS = (
    ObservabilityTransition(
        "INDIVIDUAL_BEHAVIORAL_RESPONSE",
        "BIOBEHAVIORAL_WEIGHTING",
        "COMPOSED_CONVERGENCE",
        "joint state-by-context effects and a measured population state distribution",
    ),
    ObservabilityTransition(
        "BIOBEHAVIORAL_WEIGHTING",
        "NARRATIVE_ATTRIBUTION",
        "COMPOSED_CONVERGENCE",
        "joint longitudinal biomarkers, behaviour and later self-report",
    ),
    ObservabilityTransition(
        "NARRATIVE_ATTRIBUTION",
        "EPISTAPEGE_OBSERVABILITY_LOSS",
        "COMPOSED_CONVERGENCE",
        "matched latent-state and report measurement with temporal ordering",
    ),
    ObservabilityTransition(
        "EPISTAPEGE_OBSERVABILITY_LOSS",
        "INSTITUTIONAL_MODEL_REUSE",
        "OPEN_L2",
        "matched model-selection and intervention-updating experiment",
    ),
)


def validate_epistapege_contract() -> None:
    """Fail if the declared observability chain is discontinuous or overstated."""

    allowed = {"DIRECT_COMPONENT", "COMPOSED_CONVERGENCE", "OPEN_L2"}
    for left, right in zip(EPISTAPEGE_TRANSITIONS, EPISTAPEGE_TRANSITIONS[1:]):
        if left.target != right.source:
            raise ValueError("Epistapege transitions must form one continuous chain")
    if any(step.evidence_class not in allowed for step in EPISTAPEGE_TRANSITIONS):
        raise ValueError("unknown Epistapege evidence class")
    if any(step.evidence_class == "DIRECT_SAME_PROTOCOL" for step in EPISTAPEGE_TRANSITIONS):
        raise ValueError("the complete Epistapege route is not directly established")


__all__ = [
    "BehaviouralStratum",
    "CIVILIZATION_READING_SEQUENCE",
    "EPISTAPEGE_CANONICAL_ROUTE",
    "EPISTAPEGE_CONCEPTUAL_SEQUENCE",
    "EPISTAPEGE_STATUS",
    "EPISTAPEGE_TRANSITIONS",
    "ObservabilityTransition",
    "aggregate_behaviour_probability",
    "institutional_memory_update",
    "validate_epistapege_contract",
]
