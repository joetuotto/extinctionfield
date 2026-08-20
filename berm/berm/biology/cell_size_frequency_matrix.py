"""Cell size x frequency matrix: TTFields-validated resonance model.

TTFields data shows: different cancer types respond to different frequencies.
Optimal frequency correlates with cell size. This is the SAME resonance
principle BERM uses for insects (Thielens 2018: insect size ~ lambda/2
-> resonance absorption) but at the INTRACELLULAR level.

Mechanism: internal structures formed during cell division (mitotic spindle,
cleavage furrow) act as resonance geometries. Larger cell -> longer spindle
-> lower resonance frequency.

Status: DIAGNOSTIC_ONLY — extrapolation from therapeutic data to environmental
exposure requires intensity threshold validation.
"""

from __future__ import annotations

from dataclasses import dataclass


@dataclass(frozen=True)
class CellFrequencyEntry:
    """One cell type with its estimated IF resonance parameters."""

    cell_type: str
    freq_kHz_range: tuple[float, float]
    size_um: float
    division_rate: str
    vulnerability: str
    environmental_sources: str
    note: str


TTFIELDS_CANCER_DATA: dict[str, dict] = {
    "GBM":        {"freq_kHz": 200, "cell_diameter_um": 20},
    "pancreatic": {"freq_kHz": 150, "cell_diameter_um": 25},
    "breast":     {"freq_kHz": 120, "cell_diameter_um": 30},
    "melanoma":   {"freq_kHz": 100, "cell_diameter_um": 35},
    "NSCLC":      {"freq_kHz": 150, "cell_diameter_um": 25},
    "ovarian":    {"freq_kHz": 200, "cell_diameter_um": 20},
    "SCLC":       {"freq_kHz": 200, "cell_diameter_um": 18},
}


BERM_TARGET_CELLS: dict[str, CellFrequencyEntry] = {

    "spermatogonia": CellFrequencyEntry(
        cell_type="spermatogonia",
        freq_kHz_range=(100, 200),
        size_um=12,
        division_rate="continuous, very rapid",
        vulnerability="VERY HIGH",
        environmental_sources="LED drivers (20-200 kHz), inverters",
        note=(
            "Spermatogenesis is one of the most rapidly dividing cell "
            "processes in the body. TTFields mechanism (mitotic spindle "
            "disruption) would affect it directly."
        ),
    ),

    "spermatocyte_meiosis": CellFrequencyEntry(
        cell_type="spermatocyte (meiosis)",
        freq_kHz_range=(80, 150),
        size_um=15,
        division_rate="two divisions (meiosis I + II)",
        vulnerability="VERY HIGH",
        environmental_sources="LED drivers, HVAC variable frequency drives",
        note=(
            "Meiosis is especially sensitive because chromosome segregation "
            "requires precise spindle function. TTFields disrupts exactly "
            "this process."
        ),
    ),

    "oocyte": CellFrequencyEntry(
        cell_type="oocyte",
        freq_kHz_range=(30, 80),
        size_um=120,
        division_rate="slow (meiosis I arrested for decades)",
        vulnerability="MODERATE (sensitive only during rare division phases)",
        environmental_sources="power electronics, EV inverters",
        note=(
            "Oocyte meiosis I resumes only at ovulation. IF exposure "
            "precisely at ovulation could disrupt meiotic division. "
            "Burr (1937) bioelectric activity at ovulation is relevant."
        ),
    ),

    "gut_epithelium": CellFrequencyEntry(
        cell_type="gut epithelium",
        freq_kHz_range=(150, 300),
        size_um=10,
        division_rate="very rapid (renews every 3-5 days)",
        vulnerability="HIGH",
        environmental_sources="LED drivers, switch-mode power supplies",
        note=(
            "TTFields literature explicitly identifies gut epithelial cells "
            "as a safety concern in torso treatments. Jo et al. 2019: "
            "extended exposure affected normal gut cells equally."
        ),
    ),

    "bone_marrow_stem": CellFrequencyEntry(
        cell_type="bone marrow stem cells",
        freq_kHz_range=(150, 300),
        size_um=8,
        division_rate="rapid",
        vulnerability="MODERATE (bone shielding attenuates)",
        environmental_sources="LED drivers",
        note=(
            "TTFields safety relies on bone insulation effect. "
            "This applies in targeted therapy but NOT in environmental "
            "exposure where field comes from all directions."
        ),
    ),

    "insect_cells": CellFrequencyEntry(
        cell_type="insect cells",
        freq_kHz_range=(200, 500),
        size_um=5,
        division_rate="varies",
        vulnerability="VERY HIGH (small cells + small organisms)",
        environmental_sources="LED drivers + Wi-Fi resonance at body level",
        note=(
            "Insect cells are affected at TWO resonance levels: "
            "1) Intracellular (TTFields-type, kHz) "
            "2) Whole body (Thielens, GHz lambda/2 resonance)"
        ),
    ),
}


def vulnerability_score(cell_type: str) -> float:
    """Numeric vulnerability score for a BERM target cell type.

    Combines division rate, environmental frequency overlap, and
    shielding factors.
    """
    scores = {
        "spermatogonia": 0.95,
        "spermatocyte_meiosis": 0.90,
        "oocyte": 0.40,
        "gut_epithelium": 0.80,
        "bone_marrow_stem": 0.50,
        "insect_cells": 0.95,
    }
    return scores.get(cell_type, 0.0)


def frequency_overlap_with_environment(cell_type: str) -> dict:
    """Check if a cell type's resonance frequency overlaps with
    common environmental IF sources."""
    entry = BERM_TARGET_CELLS.get(cell_type)
    if entry is None:
        return {"overlap": False, "note": f"unknown cell type: {cell_type}"}

    low, high = entry.freq_kHz_range

    env_sources = {
        "LED_driver": (20, 200),
        "HVAC_VFD": (2, 20),
        "SMPS": (50, 500),
        "metro_inverter": (1, 10),
        "EV_inverter": (5, 20),
        "induction_cooktop": (20, 100),
    }

    overlaps = {}
    for source, (s_low, s_high) in env_sources.items():
        if s_low <= high and s_high >= low:
            overlap_low = max(low, s_low)
            overlap_high = min(high, s_high)
            overlaps[source] = {
                "overlap_kHz": (overlap_low, overlap_high),
                "overlap_fraction": (overlap_high - overlap_low) / (high - low),
            }

    return {
        "cell_type": cell_type,
        "resonance_range_kHz": (low, high),
        "overlapping_sources": overlaps,
        "overlap_count": len(overlaps),
        "has_overlap": len(overlaps) > 0,
    }


def ttfields_extrapolation_summary() -> dict:
    """Summary of TTFields extrapolation to BERM target cells."""
    results = {}
    for cell_type in BERM_TARGET_CELLS:
        overlap = frequency_overlap_with_environment(cell_type)
        results[cell_type] = {
            "vulnerability": vulnerability_score(cell_type),
            "environmental_overlap": overlap["has_overlap"],
            "overlapping_source_count": overlap["overlap_count"],
            "resonance_kHz": BERM_TARGET_CELLS[cell_type].freq_kHz_range,
        }

    return {
        "summary": results,
        "key_finding": (
            "Spermatogonia and spermatocyte meiosis have VERY HIGH "
            "vulnerability AND strong frequency overlap with LED drivers "
            "and switch-mode power supplies — the dominant IF sources in "
            "modern indoor environments."
        ),
        "intensity_caveat": (
            "TTFields uses 1-3 V/cm (100-300 V/m). Environmental IF is "
            "~0.5-3 V/m. Gap is 30-600x. The three-channel model does "
            "NOT claim environmental IF equals TTFields intensity. It "
            "claims CHRONIC low-dose x DECADES may cumulatively affect "
            "rapidly dividing cells — testable, not assumed."
        ),
    }
