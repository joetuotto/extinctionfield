"""DIAGNOSTIC_ONLY: Phase transition detection and prediction.

Identifies Unwin phase transitions in a biomarker trajectory and
extrapolates to predict the next transition based on current trends.
"""

from __future__ import annotations

import math

from berm.civilization.unwin_validation import (
    PHASE_THRESHOLDS,
    Phase,
    classify_phase,
)
from berm.civilization.cultural_energy import BIOMARKER_WEIGHTS


def _find_trigger_marker(
    prev_entry: dict,
    curr_entry: dict,
) -> str:
    """Identify the biomarker that changed the most between two time points.

    Weights the absolute change by the biomarker's BioCap weight to
    identify the primary driver of a phase transition.

    Returns the marker name with the largest weighted delta.
    """
    best_marker = ""
    best_score = -1.0

    for marker, weight in BIOMARKER_WEIGHTS.items():
        if marker not in prev_entry or marker not in curr_entry:
            continue
        delta = abs(curr_entry[marker] - prev_entry[marker])
        score = delta * abs(weight)
        if score > best_score:
            best_score = score
            best_marker = marker

    return best_marker


def identify_transitions(trajectory: list[dict]) -> list[dict]:
    """Identify all phase transitions in a trajectory.

    Parameters
    ----------
    trajectory : list[dict]
        Output from get_trajectory(). Each dict must have 'year',
        'biocap', and individual biomarker keys.

    Returns
    -------
    list[dict]
        Each transition contains:
        - year: when the transition occurred
        - from_phase: previous Unwin phase
        - to_phase: new Unwin phase
        - trigger_marker: biomarker most responsible for the shift
    """
    if len(trajectory) < 2:
        return []

    transitions: list[dict] = []
    prev_phase = classify_phase(trajectory[0]["biocap"])

    for i in range(1, len(trajectory)):
        curr_phase = classify_phase(trajectory[i]["biocap"])
        if curr_phase != prev_phase:
            trigger = _find_trigger_marker(trajectory[i - 1], trajectory[i])
            transitions.append({
                "year": trajectory[i]["year"],
                "from_phase": prev_phase,
                "to_phase": curr_phase,
                "trigger_marker": trigger,
            })
            prev_phase = curr_phase

    return transitions


def predict_next_transition(trajectory: list[dict]) -> dict | None:
    """Predict the next phase transition by linear extrapolation.

    Uses the BioCap trend from the last two trajectory points to
    estimate when the next threshold will be crossed.

    Parameters
    ----------
    trajectory : list[dict]
        Must have at least two entries with 'year' and 'biocap'.

    Returns
    -------
    dict or None
        If a transition is predicted within 100 years of the last
        data point, returns:
        - year: predicted transition year
        - from_phase: current phase
        - to_phase: predicted next phase
        - trigger_marker: marker with the steepest recent change
        Returns None if no transition is predicted.
    """
    if len(trajectory) < 2:
        return None

    last = trajectory[-1]
    prev = trajectory[-2]

    dt = last["year"] - prev["year"]
    if dt == 0:
        return None

    biocap_rate = (last["biocap"] - prev["biocap"]) / dt
    if biocap_rate == 0:
        return None

    current_phase = classify_phase(last["biocap"])
    current_biocap = last["biocap"]

    # Find the next threshold to cross based on direction of change.
    target_threshold: float | None = None
    target_phase: str | None = None

    if biocap_rate < 0:
        # Declining: look for the next lower threshold.
        for threshold, phase in reversed(PHASE_THRESHOLDS):
            if current_biocap >= threshold:
                target_threshold = threshold
                target_phase = phase.value
                break
    else:
        # Rising: look for the next upper threshold.
        for threshold, phase in PHASE_THRESHOLDS:
            if current_biocap < threshold:
                target_threshold = threshold
                # The phase ABOVE this threshold.
                idx = [p for _, p in PHASE_THRESHOLDS].index(phase)
                if idx + 1 < len(PHASE_THRESHOLDS):
                    target_phase = PHASE_THRESHOLDS[idx + 1][1].value
                else:
                    target_phase = Phase.RATIONALISTIC.value
                break

    if target_threshold is None or target_phase is None:
        return None

    # Time to reach threshold.
    years_to_transition = (target_threshold - current_biocap) / biocap_rate
    if years_to_transition < 0:
        return None

    predicted_year = last["year"] + years_to_transition

    # Only predict within a 100-year horizon.
    if predicted_year > last["year"] + 100:
        return None

    trigger = _find_trigger_marker(prev, last)

    return {
        "year": round(predicted_year),
        "from_phase": current_phase,
        "to_phase": target_phase,
        "trigger_marker": trigger,
    }
