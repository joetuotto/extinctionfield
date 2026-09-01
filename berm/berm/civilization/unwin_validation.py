"""DIAGNOSTIC_ONLY: Historical society classification using Unwin phases.

Maps BioCap values to J.D. Unwin's four phases of cultural energy
(Sex and Culture, 1934). Provides phase classification and transition
detection across a biomarker trajectory.

Phases (ascending cultural energy):
    ZOISTIC       - BioCap < 0.55
    MANISTIC      - BioCap < 0.75
    DEISTIC       - BioCap < 0.90
    RATIONALISTIC - BioCap >= 0.90
"""

from __future__ import annotations

from enum import Enum


class Phase(Enum):
    """Unwin cultural energy phases."""
    ZOISTIC = "ZOISTIC"
    MANISTIC = "MANISTIC"
    DEISTIC = "DEISTIC"
    RATIONALISTIC = "RATIONALISTIC"


# Ordered from lowest to highest cultural energy.
PHASE_ORDER: list[Phase] = [
    Phase.ZOISTIC,
    Phase.MANISTIC,
    Phase.DEISTIC,
    Phase.RATIONALISTIC,
]

# Upper BioCap thresholds for each phase (exclusive).
PHASE_THRESHOLDS: list[tuple[float, Phase]] = [
    (0.55, Phase.ZOISTIC),
    (0.75, Phase.MANISTIC),
    (0.90, Phase.DEISTIC),
]


def classify_phase(biocap: float) -> str:
    """Classify a BioCap value into an Unwin phase.

    Parameters
    ----------
    biocap : float
        Biological carrying capacity in [0, 1].

    Returns
    -------
    str
        Phase name: ZOISTIC, MANISTIC, DEISTIC, or RATIONALISTIC.
    """
    for threshold, phase in PHASE_THRESHOLDS:
        if biocap < threshold:
            return phase.value
    return Phase.RATIONALISTIC.value


def detect_transitions(trajectory: list[dict]) -> list[dict]:
    """Find phase change points in a biomarker trajectory.

    Parameters
    ----------
    trajectory : list[dict]
        Output from get_trajectory(). Each dict must have 'year'
        and 'biocap' keys.

    Returns
    -------
    list[dict]
        Each transition dict contains:
        - year: year at which the phase changed
        - from_phase: previous phase name
        - to_phase: new phase name
        - biocap: BioCap value at the transition point
    """
    if len(trajectory) < 2:
        return []

    transitions: list[dict] = []
    prev_phase = classify_phase(trajectory[0]["biocap"])

    for entry in trajectory[1:]:
        current_phase = classify_phase(entry["biocap"])
        if current_phase != prev_phase:
            transitions.append({
                "year": entry["year"],
                "from_phase": prev_phase,
                "to_phase": current_phase,
                "biocap": entry["biocap"],
            })
            prev_phase = current_phase

    return transitions
