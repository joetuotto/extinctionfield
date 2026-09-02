#!/usr/bin/env python3
"""Export the civilization index tables shown on the website.

The civilization pages (patokratia, pathopolites, patopolis, patokinesis)
render tables of indices computed by ``berm.civilization.political_biology``
as hand-copied literals.  This script recomputes every one of those tables at
the reference year and writes them to
``website/public/data/civilization_indices.json`` so the page literals have a
machine-readable source of truth.
``tests/test_civilization_site_sync.py`` checks that the JSON is current and
that the page literals match the same computation.

Rounding follows what each page displays:
  3 decimals — pathopolites, EMF->political, IQ-shredder tables, foundation
               scores and biomarker values; patokinesis signal-degradation,
               behavioral-sink, BIS and transmission gradients
  2 decimals — r/K, loyalty-collapse, policy-vulnerability and moral-distress
               tables
Amish->urban-office ratios (the "6.5x" style figures) are computed from the
displayed (rounded) values so a reader can reproduce them from the table
itself; the pages follow the same convention.

Usage:  PYTHONPATH=. python3 export_civilization.py [output.json]
"""

from __future__ import annotations

import inspect
import json
import sys
from datetime import date
from pathlib import Path
from typing import Any

BERM_DIR = Path(__file__).resolve().parent
if str(BERM_DIR) not in sys.path:
    sys.path.insert(0, str(BERM_DIR))

from berm import __version__  # noqa: E402
from berm.civilization.political_biology import (  # noqa: E402
    BINDING_FOUNDATIONS,
    ENVIRONMENTS,
    IDEOLOGY_PROFILES,
    INDIVIDUALIZING_FOUNDATIONS,
    MORAL_FOUNDATION_FUNCTIONS,
    POLICY_DOMAINS,
    behavioral_sink_gradient,
    civilizational_transmission_gradient,
    environment_biomarkers,
    environment_profile,
    foundation_collapse_order,
    iq_shredder_gradient,
    loyalty_collapse_gradient,
    moral_breadth,
    moral_distress_index,
    moral_foundations_profile,
    pathopolites_gradient,
    policy_vulnerability_profile,
    rk_environment_gradient,
    signal_degradation_gradient,
    urban_rural_gradient,
)

DEFAULT_OUT = (
    BERM_DIR.parent / "website" / "public" / "data" / "civilization_indices.json"
)

YEAR = 2025
ENV_ORDER = ("amish", "rural", "suburban", "urban_residential", "urban_office")
TRAJECTORY_ENV = "suburban"
TRAJECTORY_YEARS = (1950, 1990, 2010, 2025, 2050)

INDEX_DP = 3
SCORE_DP = 2
RATIO_DP = 1

PATHOPOLITES_DIMENSIONS = (
    "victimhood_identity",
    "safety_seeking",
    "external_locus",
    "cognitive_fragility",
    "anomic_distress",
    "moral_compensation",
)
IQ_SHREDDER_COMPONENTS = (
    "reproductive_suppression",
    "dopaminergic_capture",
    "time_preference_shift",
    "genetic_burn_rate",
    "shredder_efficiency",
)
RK_TRAITS = (
    "competition",
    "mating_strategy",
    "parental_investment",
    "sexual_timing",
    "group_loyalty",
)
LOYALTY_COLLAPSE_METRICS = (
    "loyalty",
    "care",
    "boundary_dissolution",
    "care_dominance",
    "collective_action_capacity",
    "pathological_universalism",
    "ratchet_velocity",
)
BIOMARKERS = ("T", "OXT", "DA", "MEL", "BDNF", "CORT", "D", "B2")
IDEOLOGY_LABELS = {p.name: p.label for p in IDEOLOGY_PROFILES}

# patokinesis/page.tsx — S6 renders total_signal_strength, pair_signal_compound,
# obesity_amplification (signal side) and normative_predation,
# institutional_capture, behavioral_sink (sink side); the JSON carries the
# full profiles.
SIGNAL_DEGRADATION_COLUMNS = (
    "morphological_signal",
    "dynamic_signal",
    "cryptic_signal",
    "total_signal_strength",
    "signal_degradation",
    "obesity_amplification",
    "signal_perception",
    "pair_signal_compound",
)
BEHAVIORAL_SINK_COLUMNS = (
    "normative_predation",
    "institutional_capture",
    "sterilization_contagion",
    "behavioral_sink",
)
# patokinesis/page.tsx — S10 BIS gradient (first four) and S11 transmission
# gradient (last six); transmission_resistance is not displayed.
TRANSMISSION_COLUMNS = (
    "behavioral_immune",
    "destigmatization",
    "stigma_inversion",
    "net_immunity",
    "transmission_resistance",
    "recovery_sabotage",
    "dependency_transmission",
    "social_contagion",
    "empathy_weaponization",
    "active_infection_seeking",
    "transmission_composite",
)


def displayed_ratio(high: float, low: float, dp: int = RATIO_DP) -> float:
    """Ratio of two already-rounded (displayed) values."""
    return round(high / low, dp)


def pathopolites_section(year: float) -> dict[str, Any]:
    rows = []
    for entry in pathopolites_gradient(year):
        env = entry["environment"]
        row: dict[str, Any] = {
            "environment": env,
            "emf_factor": ENVIRONMENTS[env].emf_factor,
            "pathopolites_index": round(entry["pathopolites_index"], INDEX_DP),
        }
        for dim in PATHOPOLITES_DIMENSIONS:
            row[dim] = round(entry[dim], INDEX_DP)
        row["moral_distress"] = round(entry["moral_distress"], INDEX_DP)
        rows.append(row)
    first, last = rows[0], rows[-1]
    ratios = {
        key: displayed_ratio(last[key], first[key])
        for key in ("pathopolites_index", *PATHOPOLITES_DIMENSIONS)
    }
    return {
        "precision": INDEX_DP,
        "rows": rows,
        "amish_to_urban_office_ratio": ratios,
    }


def political_section(year: float) -> dict[str, Any]:
    rows = []
    for env in ENV_ORDER:
        profile = environment_profile(env, year)
        ideology = profile["dominant_ideology"]
        rows.append({
            "environment": env,
            "emf_factor": ENVIRONMENTS[env].emf_factor,
            "biocap": round(profile["biocap"], INDEX_DP),
            "ideology": ideology["primary"],
            "ideology_label": IDEOLOGY_LABELS.get(
                ideology["primary"], ideology["primary"]
            ),
            "pathologization": round(ideology["pathologization"], INDEX_DP),
        })

    gradient = urban_rural_gradient(year)

    trajectory = []
    for traj_year in TRAJECTORY_YEARS:
        profile = environment_profile(TRAJECTORY_ENV, traj_year)
        ideology = profile["dominant_ideology"]
        trajectory.append({
            "year": traj_year,
            "ideology": ideology["primary"],
            "biocap": round(profile["biocap"], INDEX_DP),
            "pathologization": round(ideology["pathologization"], INDEX_DP),
        })

    return {
        "precision": INDEX_DP,
        "rows": rows,
        # urban_rural_gradient() spans rural..urban_office (Amish excluded).
        "polarization_index": round(gradient["polarization_index"], INDEX_DP),
        "polarization_environments": [
            p["environment"] for p in gradient["gradient"]
        ],
        "ideology_divergence": gradient["ideology_divergence"],
        "trajectory_environment": TRAJECTORY_ENV,
        "suburban_trajectory": trajectory,
    }


def rk_section(year: float) -> dict[str, Any]:
    rows = []
    for entry in rk_environment_gradient(year):
        row: dict[str, Any] = {
            "environment": entry["environment"],
            "rk_index": round(entry["rk_index"], SCORE_DP),
            "classification": entry["classification"],
        }
        for trait in RK_TRAITS:
            row[trait] = round(entry["traits"][trait], SCORE_DP)
        rows.append(row)
    return {"precision": SCORE_DP, "rows": rows}


def moral_sections(year: float) -> tuple[dict[str, Any], dict[str, Any], list[dict[str, Any]]]:
    """Moral-foundation breadth, moral distress, and collapse order."""
    threshold = inspect.signature(moral_breadth).parameters["threshold"].default
    breadth_rows = []
    distress_rows = []
    for env in ENV_ORDER:
        foundations = moral_foundations_profile(environment_biomarkers(env, year))
        breadth = moral_breadth(foundations)
        distress = moral_distress_index(foundations)
        breadth_rows.append({
            "environment": env,
            "active_count": breadth["active_count"],
            "total": breadth["total"],
            "breadth": breadth["breadth"],
            "binding_active": breadth["binding_active"],
            "binding_total": len(BINDING_FOUNDATIONS),
            "individualizing_active": breadth["individualizing_active"],
            "individualizing_total": len(INDIVIDUALIZING_FOUNDATIONS),
            "active_foundations": breadth["active_foundations"],
            "foundations": {
                name: round(foundations[name], INDEX_DP)
                for name in MORAL_FOUNDATION_FUNCTIONS
            },
        })
        distress_rows.append({
            "environment": env,
            "distress_index": round(distress["distress_index"], SCORE_DP),
            "harm_hyperactivation": round(
                distress["components"]["harm_hyperactivation"], SCORE_DP
            ),
            "anomie": round(distress["components"]["anomie"], SCORE_DP),
            "meaning_deficit": round(
                distress["components"]["meaning_deficit"], SCORE_DP
            ),
            "inactive_count": breadth["total"] - breadth["active_count"],
            "total": breadth["total"],
        })

    collapse_order = [
        {
            "rank": entry["rank"],
            "foundation": entry["foundation"],
            "binding": entry["binding"],
            "formula_type": entry["formula_type"],
            "collapse_environment": entry["collapse_environment"],
            "scores": {
                env: round(score, INDEX_DP)
                for env, score in entry["scores"].items()
            },
        }
        for entry in foundation_collapse_order(year)
    ]

    breadth_section = {"threshold": threshold, "rows": breadth_rows}
    distress_section = {"precision": SCORE_DP, "rows": distress_rows}
    return breadth_section, distress_section, collapse_order


def loyalty_collapse_section(year: float) -> dict[str, Any]:
    rows = []
    for analysis in loyalty_collapse_gradient(year):
        row: dict[str, Any] = {"environment": analysis["environment"]}
        for metric in LOYALTY_COLLAPSE_METRICS:
            row[metric] = round(analysis[metric], SCORE_DP)
        row["binding_active"] = analysis["binding_active"]
        row["individualizing_active"] = analysis["individualizing_active"]
        rows.append(row)
    return {"precision": SCORE_DP, "rows": rows}


def policy_vulnerability_section(year: float) -> dict[str, Any]:
    profiles = {
        env: policy_vulnerability_profile(environment_biomarkers(env, year))
        for env in ENV_ORDER
    }
    domains = []
    for domain, spec in POLICY_DOMAINS.items():
        domains.append({
            "domain": domain,
            "label": spec["label"],
            "driver": spec["driver"],
            "constraint_weights": dict(spec["constraint_weights"]),
            "vulnerability": {
                env: round(profiles[env][domain]["vulnerability"], SCORE_DP)
                for env in ENV_ORDER
            },
        })
    return {"precision": SCORE_DP, "domains": domains}


def iq_shredder_section(year: float) -> dict[str, Any]:
    rows = []
    for entry in iq_shredder_gradient(year):
        row: dict[str, Any] = {
            "environment": entry["environment"],
            "emf_factor": entry["emf_factor"],
        }
        for component in IQ_SHREDDER_COMPONENTS:
            row[component] = round(entry[component], INDEX_DP)
        row["biocap"] = round(entry["biocap"], INDEX_DP)
        row["rk_index"] = round(entry["rk_index"], INDEX_DP)
        rows.append(row)
    ratios = {
        "shredder_efficiency": displayed_ratio(
            rows[-1]["shredder_efficiency"], rows[0]["shredder_efficiency"]
        ),
    }
    return {
        "precision": INDEX_DP,
        "rows": rows,
        "amish_to_urban_office_ratio": ratios,
    }


def biomarker_section(year: float) -> dict[str, Any]:
    values = {
        env: {
            marker: round(value, INDEX_DP)
            for marker, value in environment_biomarkers(env, year).items()
        }
        for env in ENV_ORDER
    }
    amish, office = values["amish"], values["urban_office"]
    # CORT is the inverse marker (it rises with EMF), so it is reported as a
    # multiple rather than a decline.
    decline = {
        marker: round((1.0 - office[marker] / amish[marker]) * 100.0)
        for marker in BIOMARKERS
        if marker != "CORT"
    }
    return {
        "precision": INDEX_DP,
        "values": values,
        "decline_amish_to_urban_office_pct": decline,
        "cort_amish_to_urban_office_ratio": displayed_ratio(
            office["CORT"], amish["CORT"]
        ),
    }


def _gradient_section(
    entries: list[dict[str, Any]], columns: tuple[str, ...]
) -> dict[str, Any]:
    """Environment-keyed rows of ``columns`` at INDEX_DP, in ENV_ORDER."""
    by_env = {entry["environment"]: entry for entry in entries}
    rows = [
        {
            "environment": env,
            "emf_factor": ENVIRONMENTS[env].emf_factor,
            **{column: round(by_env[env][column], INDEX_DP) for column in columns},
        }
        for env in ENV_ORDER
    ]
    return {"precision": INDEX_DP, "rows": rows}


def signal_degradation_section(year: float) -> dict[str, Any]:
    return _gradient_section(signal_degradation_gradient(year), SIGNAL_DEGRADATION_COLUMNS)


def behavioral_sink_section(year: float) -> dict[str, Any]:
    return _gradient_section(behavioral_sink_gradient(year), BEHAVIORAL_SINK_COLUMNS)


def transmission_section(year: float) -> dict[str, Any]:
    return _gradient_section(civilizational_transmission_gradient(year), TRANSMISSION_COLUMNS)


def build(year: float = YEAR) -> dict[str, Any]:
    """Compute every civilization table the site shows, at ``year``."""
    breadth, distress, collapse_order = moral_sections(year)
    return {
        "metadata": {
            "generated": date.today().isoformat(),
            "generatedBy": "berm/export_civilization.py",
            "source": "berm.civilization.political_biology",
            "version": __version__,
            "year": year,
            "environment_order": list(ENV_ORDER),
            "rounding": {
                "index_tables_dp": INDEX_DP,
                "score_tables_dp": SCORE_DP,
                "ratios": (
                    "computed from the displayed (rounded) values, "
                    f"{RATIO_DP} decimal"
                ),
            },
        },
        "environments": {
            env: {
                "label": ENVIRONMENTS[env].label,
                "emf_factor": ENVIRONMENTS[env].emf_factor,
            }
            for env in ENV_ORDER
        },
        "pathopolites": pathopolites_section(year),
        "political": political_section(year),
        "rk_strategy": rk_section(year),
        "moral_breadth": breadth,
        "moral_distress": distress,
        "foundation_collapse_order": collapse_order,
        "loyalty_collapse": loyalty_collapse_section(year),
        "policy_vulnerability": policy_vulnerability_section(year),
        "iq_shredder": iq_shredder_section(year),
        "biomarkers": biomarker_section(year),
        "signal_degradation": signal_degradation_section(year),
        "behavioral_sink": behavioral_sink_section(year),
        "transmission": transmission_section(year),
    }


def write(payload: dict[str, Any], out_path: Path) -> Path:
    out_path.parent.mkdir(parents=True, exist_ok=True)
    out_path.write_text(
        json.dumps(payload, indent=2, ensure_ascii=False) + "\n",
        encoding="utf-8",
    )
    return out_path


def main(argv: list[str]) -> int:
    out = Path(argv[1]) if len(argv) > 1 else DEFAULT_OUT
    payload = build()
    write(payload, out)

    size_kb = out.stat().st_size / 1024
    sections = [key for key in payload if key != "metadata"]
    print(f"Wrote {out}")
    print(f"  {len(sections)} sections: {', '.join(sections)}")
    print(f"  Size: {size_kb:.1f} KB")

    pp = payload["pathopolites"]
    rk = payload["rk_strategy"]["rows"]
    sh = payload["iq_shredder"]["rows"]
    print(
        f"\n  pathopolites index: amish={pp['rows'][0]['pathopolites_index']}"
        f" urban_office={pp['rows'][-1]['pathopolites_index']}"
        f" ({pp['amish_to_urban_office_ratio']['pathopolites_index']}x)"
    )
    print(f"  polarization index: {payload['political']['polarization_index']}")
    print(f"  r/K index: amish={rk[0]['rk_index']} urban_office={rk[-1]['rk_index']}")
    print(
        f"  shredder efficiency: amish={sh[0]['shredder_efficiency']}"
        f" urban_office={sh[-1]['shredder_efficiency']}"
    )
    sig = payload["signal_degradation"]["rows"]
    sink = payload["behavioral_sink"]["rows"]
    print(
        f"  signal strength: amish={sig[0]['total_signal_strength']}"
        f" urban_office={sig[-1]['total_signal_strength']}"
    )
    print(
        f"  behavioral sink: amish={sink[0]['behavioral_sink']}"
        f" urban_office={sink[-1]['behavioral_sink']}"
    )
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv))
