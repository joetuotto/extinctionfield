"""DIAGNOSTIC_ONLY: Sensitivity analysis for biomarker contributions to BioCap.

Quantifies the marginal effect of restoring each individual biomarker to
its optimum while holding all others at their current (degraded) levels.
Identifies which interventions yield the largest BioCap recovery.
"""

from __future__ import annotations

from berm.civilization.cultural_energy import (
    BIOMARKER_WEIGHTS,
    REQUIRED_MARKERS,
    compute_biocap,
)
from berm.civilization.biomarker_trajectories import biomarker_values_at


# Default reference year for sensitivity analysis.
REFERENCE_YEAR: int = 2025


def sensitivity_single(
    baseline_markers: dict[str, float],
    target_marker: str,
    restore_value: float = 1.0,
) -> float:
    """Compute percentage BioCap recovery from restoring one marker.

    Sets the target marker to restore_value while keeping all others
    at their baseline levels, then computes the BioCap delta as a
    percentage of the theoretical maximum recovery.

    Parameters
    ----------
    baseline_markers : dict
        Current biomarker values (all eight keys required).
    target_marker : str
        Which biomarker to restore (e.g. 'T', 'OXT').
    restore_value : float
        Value to set the target marker to (default 1.0 for positive
        markers). For CORT, use 0.0 to represent full restoration.

    Returns
    -------
    float
        Percentage BioCap recovery (0-100 scale).

    Raises
    ------
    KeyError
        If target_marker is not a valid biomarker name.
    """
    if target_marker not in REQUIRED_MARKERS:
        raise KeyError(f"Unknown biomarker: {target_marker}")

    baseline_biocap = compute_biocap(baseline_markers)

    restored = dict(baseline_markers)
    restored[target_marker] = restore_value

    restored_biocap = compute_biocap(restored)

    # Maximum possible BioCap: all positive markers at 1.0, CORT at 0.0.
    max_markers = {k: 1.0 for k in REQUIRED_MARKERS}
    max_markers["CORT"] = 0.0
    max_biocap = compute_biocap(max_markers)

    headroom = max_biocap - baseline_biocap
    if headroom <= 0:
        return 0.0

    recovery = (restored_biocap - baseline_biocap) / headroom * 100.0
    return recovery


def sensitivity_all(
    reference_year: int = REFERENCE_YEAR,
) -> list[dict]:
    """Run sensitivity analysis for all eight biomarkers.

    For each biomarker, computes the BioCap recovery percentage from
    restoring that single marker to its optimum at the reference year.

    Parameters
    ----------
    reference_year : int
        Year at which to evaluate baseline biomarker values.

    Returns
    -------
    list[dict]
        Sorted by recovery percentage (descending). Each dict contains:
        - marker: biomarker name
        - weight: the biomarker's weight in the BioCap formula
        - baseline_value: current value at reference_year
        - restore_to: target restoration value
        - recovery_pct: percentage of max BioCap recovered
        - delta_biocap: absolute BioCap change
    """
    baseline = biomarker_values_at(reference_year)
    baseline_biocap = compute_biocap(baseline)

    results: list[dict] = []
    for marker in sorted(REQUIRED_MARKERS):
        # For CORT, restoration means reducing to 0.0.
        restore_to = 0.0 if marker == "CORT" else 1.0

        recovery_pct = sensitivity_single(baseline, marker, restore_to)

        restored = dict(baseline)
        restored[marker] = restore_to
        delta = compute_biocap(restored) - baseline_biocap

        results.append({
            "marker": marker,
            "weight": BIOMARKER_WEIGHTS[marker],
            "baseline_value": round(baseline[marker], 4),
            "restore_to": restore_to,
            "recovery_pct": round(recovery_pct, 2),
            "delta_biocap": round(delta, 4),
        })

    results.sort(key=lambda r: r["recovery_pct"], reverse=True)
    return results
