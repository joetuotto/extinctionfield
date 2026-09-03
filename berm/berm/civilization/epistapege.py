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


EPISTAPEGE_TRANSITIONS = (
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
    "CIVILIZATION_READING_SEQUENCE",
    "EPISTAPEGE_CANONICAL_ROUTE",
    "EPISTAPEGE_CONCEPTUAL_SEQUENCE",
    "EPISTAPEGE_STATUS",
    "EPISTAPEGE_TRANSITIONS",
    "ObservabilityTransition",
    "validate_epistapege_contract",
]
