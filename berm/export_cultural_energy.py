#!/usr/bin/env python3
"""Export the cultural-energy BioCap dataset shown on the website.

Writes ``website/public/data/berm_cultural_energy_model.json`` from the
live model so that the Patopoliteia page (trajectory chart, biomarker
radar, Unwin phases, phase transitions, sensitivity table, migration
gradient map) and the BioCap figures on the home and mathematics pages
share one machine-readable source of truth.

Sections
--------
trajectory        get_trajectory(1900, 2061, 5) + classify_phase per year
                  (8 markers incl. B2; CORT stored raw, 0 = optimum)
transitions       identify_transitions() on the yearly trajectory
biomarkers_2025   biomarker_values_at(2025)
sensitivity       sensitivity_all(2025)  (recovery_pct = share of the gap
                  between current BioCap and the maximum 1.0)
environments      compute_biocap(environment_biomarkers(env, 2025)) for
                  the five EMF environments (political_biology)
regions           biocap(year, lat, region) for the nine macro-regions at
                  2000/2025/2060/2080 plus chi_latitude / chi_total and the
                  Sub-Saharan Africa -> Western Europe gradient
phase_thresholds  unwin_validation.PHASE_THRESHOLDS
weights           cultural_energy.BIOMARKER_WEIGHTS
biomarker_database  carried over from the previous file (units, evidence,
                  cultural function); T annual_decline_pct pinned to 1.2

``tests/test_cultural_energy_site_sync.py`` checks that the JSON is
current.

Usage:  PYTHONPATH=. python3 export_cultural_energy.py [output.json]
"""

from __future__ import annotations

import json
import sys
from datetime import date
from pathlib import Path
from typing import Any

BERM_DIR = Path(__file__).resolve().parent
if str(BERM_DIR) not in sys.path:
    sys.path.insert(0, str(BERM_DIR))

from berm import __version__  # noqa: E402
from berm.civilization import (  # noqa: E402
    BIOMARKER_WEIGHTS,
    PHASE_THRESHOLDS,
    REGIONS,
    biocap,
    biomarker_values_at,
    chi_latitude,
    chi_total,
    classify_phase,
    compute_biocap,
    get_trajectory,
    identify_transitions,
    migration_pressure,
    predict_next_transition,
    sensitivity_all,
)
from berm.civilization.migration_gradient import biocap_gradient  # noqa: E402
from berm.civilization.political_biology import (  # noqa: E402
    ENVIRONMENTS,
    environment_biomarkers,
)

DEFAULT_OUT = (
    BERM_DIR.parent / "website" / "public" / "data" / "berm_cultural_energy_model.json"
)

YEAR = 2025
TRAJ_START, TRAJ_END, TRAJ_STEP = 1900, 2061, 5
REGION_YEARS = (2000, 2025, 2060, 2080)
ENV_ORDER = ("amish", "rural", "suburban", "urban_residential", "urban_office")
MARKERS = ("T", "OXT", "DA", "MEL", "BDNF", "CORT", "D", "B2")
DP = 4


def _phase(value: float) -> str:
    phase = classify_phase(value)
    return getattr(phase, "value", phase)


def trajectory_section() -> list[dict[str, Any]]:
    rows = []
    for entry in get_trajectory(TRAJ_START, TRAJ_END, TRAJ_STEP):
        row: dict[str, Any] = {"year": entry["year"]}
        for m in MARKERS:
            row[m] = round(entry[m], DP)
        row["biocap"] = round(entry["biocap"], DP)
        row["phase"] = _phase(entry["biocap"])
        rows.append(row)
    return rows


def transitions_section() -> dict[str, Any]:
    yearly = get_trajectory(TRAJ_START, TRAJ_END, 1)
    transitions = [
        {**t, "biocap": round(
            next(e["biocap"] for e in yearly if e["year"] == t["year"]), DP
        )}
        for t in identify_transitions(yearly)
    ]
    nxt = predict_next_transition(yearly)
    return {"detected": transitions, "predicted_next": nxt}


def sensitivity_section() -> list[dict[str, Any]]:
    return sensitivity_all(YEAR)


def environments_section() -> dict[str, Any]:
    out = {}
    for env in ENV_ORDER:
        markers = environment_biomarkers(env, YEAR)
        out[env] = {
            "label": ENVIRONMENTS[env].label,
            "emf_factor": ENVIRONMENTS[env].emf_factor,
            "biocap": round(compute_biocap(markers), DP),
            "markers": {m: round(markers[m], DP) for m in MARKERS},
        }
    return out


def regions_section() -> dict[str, Any]:
    rows = {}
    for name, region in REGIONS.items():
        rows[name] = {
            "lat": region.lat,
            "electrification_year": region.electrification_year,
            "chi_latitude": round(chi_latitude(region.lat), DP),
            "chi_total_2025": round(chi_total(region.lat, YEAR, name), DP),
            "biocap": {
                str(y): round(biocap(y, region.lat, region=name), DP)
                for y in REGION_YEARS
            },
            "tfr_2020": region.tfr,
        }
    ranked = sorted(rows, key=lambda n: rows[n]["biocap"][str(YEAR)], reverse=True)
    ssa, weu = "Sub-Saharan Africa", "Western Europe"
    return {
        "years": list(REGION_YEARS),
        "rows": rows,
        "ranking_2025_high_to_low": ranked,
        "ssa_to_western_europe": {
            "gradient_2025": round(biocap_gradient(ssa, weu, YEAR), DP),
            "gradient_2080": round(biocap_gradient(ssa, weu, 2080), DP),
            "migration_pressure_2025": round(migration_pressure(ssa, weu, YEAR), DP),
        },
        "gradient_sign": "positive = source has higher BioCap than destination",
    }


def load_previous_database(path: Path) -> dict[str, Any]:
    if not path.exists():
        return {}
    try:
        previous = json.loads(path.read_text(encoding="utf-8"))
    except json.JSONDecodeError:
        return {}
    db = previous.get("biomarker_database", {})
    if "testosterone" in db:
        db["testosterone"]["annual_decline_pct"] = 1.2
        db["testosterone"]["weight_in_model"] = BIOMARKER_WEIGHTS["T"]
    if "cortisol" in db:
        db["cortisol"]["weight_in_model"] = BIOMARKER_WEIGHTS["CORT"]
        db["cortisol"]["normalisation"] = (
            "stored raw: 0 = pre-industrial floor, 1 = maximum observed; "
            "enters BioCap as |w| * (1 - CORT)"
        )
    return db


def build(previous_path: Path = DEFAULT_OUT) -> dict[str, Any]:
    traj = trajectory_section()
    now = next(r for r in traj if r["year"] == YEAR)
    return {
        "metadata": {
            "generated": date.today().isoformat(),
            "generatedBy": "berm/export_cultural_energy.py",
            "source": "berm.civilization (biomarker_trajectories, cultural_energy, "
                      "unwin_validation, sensitivity, political_biology, biocap, "
                      "chi_map, migration_gradient)",
            "version": __version__,
            "reference_year": YEAR,
            "biocap_definition": (
                "BioCap = sum(w_i * m_i) over T, OXT, DA, MEL, BDNF, D, B2 "
                "+ 0.10 * (1 - CORT); absolute weights sum to 1.0, range [0, 1], "
                "1.0 = pre-industrial optimum"
            ),
            "biocap_2025": now["biocap"],
            "phase_2025": now["phase"],
        },
        "weights": BIOMARKER_WEIGHTS,
        "phase_thresholds": [
            {"below": thr, "phase": getattr(ph, "value", ph)} for thr, ph in PHASE_THRESHOLDS
        ],
        "trajectory": traj,
        "transitions": transitions_section(),
        "biomarkers_2025": {m: round(v, DP) for m, v in biomarker_values_at(YEAR).items()},
        "sensitivity": sensitivity_section(),
        "environments": environments_section(),
        "regions": regions_section(),
        "biomarker_database": load_previous_database(previous_path),
        "model_note": (
            "Trajectories are logistic fits to secular biomarker trends "
            "(biomarker_trajectories.TREND_DATA); the model's value is in "
            "identifying which biomarkers drive the decline and when the "
            "Unwin thresholds are crossed."
        ),
    }


def write(payload: dict[str, Any], out_path: Path) -> Path:
    out_path.parent.mkdir(parents=True, exist_ok=True)
    out_path.write_text(
        json.dumps(payload, indent=2, ensure_ascii=False) + "\n", encoding="utf-8"
    )
    return out_path


def main(argv: list[str]) -> int:
    out = Path(argv[1]) if len(argv) > 1 else DEFAULT_OUT
    payload = build(previous_path=DEFAULT_OUT)
    write(payload, out)
    meta = payload["metadata"]
    print(f"Wrote {out}")
    print(f"  BioCap {YEAR}: {meta['biocap_2025']} ({meta['phase_2025']})")
    print(f"  transitions: {payload['transitions']['detected']}")
    print(f"  environments: "
          + ", ".join(f"{k}={v['biocap']}" for k, v in payload['environments'].items()))
    print(f"  regions 2025 ranking: {payload['regions']['ranking_2025_high_to_low']}")
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv))
