#!/usr/bin/env python3
"""Export replayable conditional examples from the SAME public Python route."""
from __future__ import annotations

import argparse
import json
from pathlib import Path

from berm.architecture import MODULOME_ASFR_ROUTE_ID
from berm.model_modulome_asfr import project_modulome_scenario
from berm.modulome.scenarios import illustrative_scenarios

ROOT = Path(__file__).resolve().parent.parent
OUTPUTS = (ROOT / "website/data/conditional-scenarios.json", ROOT / "website/public/data/conditional-scenarios.json")
EXPLORER_OUTPUT = ROOT / "website/data/conditional-scenario-explorer.json"


def build_payload():
    scenarios = illustrative_scenarios()
    for scenario in scenarios:
        scenario["result"] = project_modulome_scenario(scenario["input"])
    return {"schema_version": 1,
            "metadata": {"route": MODULOME_ASFR_ROUTE_ID, "calibration_status": "STRUCTURAL_ONLY",
                "l2_bridge_status": "OPEN", "forecast_calibrated": False,
                "input_origin": "illustrative synthetic inputs; not estimated from observations",
                "changes_archived_v17": False,
                "assumptions": {
                    "fi": ["Kaikki kertoimet ovat nimettyjä havainnollistavia syötteitä, eivät tutkimuksista estimoituja vaikutuskokoja.",
                           "Vertailun ASFR on kaikissa seitsemässä ikäryhmässä 100/1000. TFR 3,5 on laskuesimerkin lähtötaso.",
                           "Ajuri on paikallinen biologinen skenaariosyöte. Muunnos mitatusta sähkömagneettisesta kentästä ja L2-silta ovat avoimia.",
                           "Solun ja hormonien aika-asteikot ovat erillisiä. Niitä ei oleteta samanpituisiksi.",
                           "Odotusjakauma korvaa kapasiteettisuhteen. Se ei ole sellaisenaan kalenterivuoden syntymätodennäköisyys."],
                    "en": ["Every coefficient is a named illustrative input, not an effect size estimated from observations.",
                           "Reference ASFR is 100 per 1000 in all seven age groups. TFR 3.5 is an arithmetic example baseline.",
                           "The driver is a local biological scenario input. Conversion from a measured electromagnetic field and the L2 bridge remain open.",
                           "Cell and hormone time scales are separate; they are not assumed to have the same duration.",
                           "Waiting replaces the capacity ratio. It is not itself a calendar-year birth probability."]}},
            "scenarios": scenarios}


def build_explorer(payload):
    """Small UI projection; complete replay inputs stay in the downloadable file."""
    from copy import deepcopy
    result = {"schema_version": payload["schema_version"], "metadata": deepcopy(payload["metadata"]), "scenarios": []}
    shared = all(all(group[arm] == scenario["input"]["age_groups"][0][arm]
                     for group in scenario["input"]["age_groups"] for arm in ("reference", "target"))
                 for scenario in payload["scenarios"])
    result["metadata"].update({"trace_illustrated_age_group": "15-19", "other_groups_share_protocol": shared})
    for scenario in payload["scenarios"]:
        row = {key: deepcopy(scenario[key]) for key in ("id", "title", "description", "changed_inputs")}
        row["result"] = {key: deepcopy(scenario["result"][key]) for key in (
            "reference_tfr", "predicted_tfr", "age_groups", "parameter_ids", "evidence_ids",
            "route", "calibration_status", "l2_bridge_status", "forecast_calibrated")}
        row["result"]["mechanism_runs"] = deepcopy(scenario["result"]["mechanism_runs"][:1])
        result["scenarios"].append(row)
    return result


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--check", action="store_true", help="Check committed/exported data without writing")
    args = parser.parse_args()
    payload = build_payload()
    encoded = json.dumps(payload, ensure_ascii=False, indent=2, allow_nan=False) + "\n"
    explorer = json.dumps(build_explorer(payload), ensure_ascii=False, indent=2, allow_nan=False) + "\n"
    outputs = {**{path: encoded for path in OUTPUTS}, EXPLORER_OUTPUT: explorer}
    if args.check:
        stale = [str(path) for path, content in outputs.items() if not path.exists() or path.read_text() != content]
        if stale:
            parser.exit(1, "Stale conditional scenario exports: " + ", ".join(stale) + "\n")
    else:
        for path, content in outputs.items():
            path.parent.mkdir(parents=True, exist_ok=True)
            path.write_text(content)


if __name__ == "__main__":
    main()
