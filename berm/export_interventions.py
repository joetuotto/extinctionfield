#!/usr/bin/env python3
"""Export synthetic, replayable four-arm pharmacology protocol comparisons."""
from __future__ import annotations

import argparse
from copy import deepcopy
import json
from pathlib import Path

from berm.modulome.intervention_examples import example_scenarios
from berm.modulome.intervention_protocol import ROUTE, run_factorial_protocol

ROOT = Path(__file__).resolve().parent.parent
OUTPUTS = (ROOT / "website/data/intervention-scenarios.json", ROOT / "website/public/data/intervention-scenarios.json")
REGISTRY = ROOT / "berm/data/evidence/intervention_profiles_v1.json"
LABELS = {
    "resting_bulk_ca": ("Calcium before measurement", "Ca ennen mittausta"),
    "bulk_ca_peak": ("Whole-cell calcium peak", "Koko solun Ca-huippu"),
    "evoked_bulk_ca_increment": ("Calcium rise from own baseline", "Ca-nousu omasta lähtötasosta"),
    "local_l_ca_peak": ("L-channel local calcium peak", "L-kanavan paikallinen Ca-huippu"),
    "local_t_ca_peak": ("T-channel local calcium peak", "T-kanavan paikallinen Ca-huippu"),
    "er_ca_final": ("Calcium remaining in ER store", "ER-varastossa jäljellä oleva Ca"),
    "erk_early": ("Early ERK response", "Varhainen ERK-vaste"),
    "erk_final": ("Sustained ERK response", "Pitkäkestoinen ERK-vaste"),
    "cell_cycle_arrest_final": ("Conditional cell-cycle arrest", "Ehdollinen solusyklin pysähtyminen"),
    "growth_activity_final": ("Conditional growth activity", "Ehdollinen kasvuaktiivisuus"),
    "nav_current_final": ("Sodium current", "Natriumvirta"),
    "damage_final": ("Remaining modeled damage", "Jäljellä oleva mallinnettu vaurio"),
    "cry_total_final": ("Total CRY protein", "CRY-proteiinin kokonaismäärä"),
    "photo_capacity_final": ("Photoactive CRY pool", "Fotoaktiivinen CRY-osuus"),
    "cry_field_response_final": ("Conditional CRY field response", "Ehdollinen CRY-kenttävaste"),
    "clock_period_final": ("Clock period", "Kellon jakso"),
    "clock_amplitude_final": ("Clock-reporter amplitude", "Kelloreporterin amplitudi"),
    "drug_active_final": ("Active probe concentration", "Aktiivisen koettimen pitoisuus"),
    "bulk_measured_increment": ("Measured whole-cell calcium increment", "Mitattu koko solun Ca-lisävaste"),
    "current:CaV1.2": ("L-channel influx", "L-kanavan sisäänvirtaus"),
    "current:CaV3.2": ("T-channel influx", "T-kanavan sisäänvirtaus"),
    "density:CaV1.2": ("Total L-channel density", "L-kanavien kokonaismäärä"),
    "density:CaV3.2": ("Total T-channel density", "T-kanavien kokonaismäärä"),
}
ARM_LABELS = {"sham": {"en": "Sham", "fi": "Valealtistus"},
              "field": {"en": "Field", "fi": "Kenttä"},
              "drug": {"en": "Intervention", "fi": "Interventio"},
              "field_drug": {"en": "Field + intervention", "fi": "Kenttä + interventio"}}
TRACE_ENDPOINTS = {
    "bulk_ca_peak": "bulk_ca", "evoked_bulk_ca_increment": "bulk_ca",
    "bulk_measured_increment": "bulk_ca", "local_l_ca_peak": "local_l_ca", "local_t_ca_peak": "local_t_ca",
    "er_ca_final": "er_ca", "erk_early": "erk_fast", "erk_final": "erk_slow", "nav_current_final": "nav_current",
    "cell_cycle_arrest_final": "cell_cycle_arrest", "growth_activity_final": "growth_activity",
    "damage_final": "damage", "cry_total_final": "cry_total", "photo_capacity_final": "photo_capacity",
    "cry_field_response_final": "cry_field_response", "clock_period_final": "clock_period",
    "clock_amplitude_final": "clock_amplitude", "drug_active_final": "drug_active",
    "current:CaV1.2": "channel_currents.CaV1.2", "current:CaV3.2": "channel_currents.CaV3.2",
    "density:CaV1.2": "channel_densities.CaV1.2", "density:CaV3.2": "channel_densities.CaV3.2",
}


def _sample_indices(rows, limit=61):
    count = min(limit, len(rows))
    result = {round(i * (len(rows) - 1) / max(1, count - 1)) for i in range(count)}
    result.update(i for i in range(1, len(rows)) if rows[i]["phase"] != rows[i - 1]["phase"])
    result.update({0, len(rows) - 1})
    return sorted(result)


def build_payload():
    registry = json.loads(REGISTRY.read_text()) if REGISTRY.exists() else {}
    records = registry.get("profiles", registry.get("intervention_profiles", [])) if isinstance(registry, dict) else registry
    profiles = {r["id"]: r for r in records}
    scenarios = example_scenarios()
    for scenario in scenarios:
        result = run_factorial_protocol(scenario["protocol"])
        bridge_trace = {}
        for arm in result["arms"]:
            indices = _sample_indices(arm["trace"])
            bridge_indices = sorted({0, len(arm["trace"]) - 1,
                next(i for i, row in enumerate(arm["trace"]) if row["phase"] == "measurement")})
            bridge_trace[arm["id"]] = [{"time_s": arm["trace"][i]["time_s"], **arm["bridge_trace"][i]} for i in bridge_indices]
            arm["trace"] = [arm["trace"][i] for i in indices]
            arm["label"] = ARM_LABELS[arm["id"]]
            del arm["bridge_trace"]
        result["bridge_trace"] = bridge_trace
        scenario["result"] = result
        profile = profiles.get(scenario["profile_id"], {})
        scenario["reference_ids"] = deepcopy(profile.get("referenceIds", []))
        scenario["claim_ids"] = deepcopy(profile.get("claimIds", []))
        scenario["evidence_link_semantics"] = "Component-source links motivate the mechanism; synthetic coefficients are not fitted from these sources."
    return {"schema_version": 1, "metadata": {
        "route": ROUTE, "calibration_status": "STRUCTURAL_ONLY", "empirical_validation_status": "NOT_FITTED_OR_OUT_OF_SAMPLE_TESTED",
        "operator_form_status": "CONDITIONAL_FORMAL_OPERATOR", "physical_identification_status": "OPEN",
        "l1_geometry_status": "DERIVED_FROM_STATED_2025_PREMISE", "coupling_status": "CONDITIONAL_MINIMAL_MATTER_COUPLING",
        "tissue_kernel_status": "CALLER_SUPPLIED", "gauge_scale_sign_status": "OPEN", "asfr_mapping": None,
        "input_origin": "synthetic illustrative parameters", "changes_archived_v17": False,
        "observable_labels": {key: {"en": value[0], "fi": value[1]} for key, value in LABELS.items()},
        "observable_trace_keys": TRACE_ENDPOINTS,
        "trace_sampling": "At most 62 biological points and 3 bridge examples per arm, including measurement boundary; all observables calculated at full integration resolution. Replay inputs are included.",
        "assumptions": {
            "fi": ["Laskuesimerkit ovat synteettisiä. Ne eivät toista lähdekokeiden annoksia, vaikutuskokoja tai aika-asteikkoja.",
                   "Kaikki neljä haaraa käyttävät samaa geometriaa, vastetensoria ja biologisia kertoimia. Vain ilmoitetut kenttä- ja interventiosyötteet vaihtuvat.",
                   "Lähtötaso mitataan vasta esikäsittelyn jälkeen. Koko solun havaintoraja ja kyllästyminen erotetaan biologisista tiloista.",
                   "Kenttäoperaattorin fysikaalinen identifiointi ja ihmisen päätepistekalibrointi ovat avoimia. Solukokeita ei muunneta ASFR/TFR-ennusteeksi.",
                   "CRY:n sitoutumisaste sisältyy fotosykliin kerran; vauriolla on yksi mitokondriokuormasta tuleva tuotantotermi.",
                   "Mikroalueen kenttäportti ja CRY–FAD-kilpailun kenttävaste ovat ehdollisia jatkohypoteeseja. CoQ:n kolme vaikutuspaikkaa ovat vaihtoehtoisia."],
            "en": ["These synthetic calculations do not reproduce the doses, effect sizes or timescales of source experiments.",
                   "All four arms use the same geometry, response kernel and biological coefficients; only declared field and intervention inputs change.",
                   "Baseline is measured after pretreatment. Whole-cell detection limits and saturation are distinct from biological states.",
                   "Physical identification of the field operator and human endpoint calibration remain open. Cell observables are not converted into ASFR/TFR predictions.",
                   "CRY occupancy enters the photocycle once; damage has one production term from mitochondrial stress.",
                   "The microdomain field port and CRY–FAD competition field response are conditional extensions. CoQ action sites are alternatives."]}},
        "scenarios": scenarios}


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--check", action="store_true")
    args = parser.parse_args()
    encoded = json.dumps(build_payload(), ensure_ascii=False, indent=2, allow_nan=False) + "\n"
    if args.check:
        stale = [str(path) for path in OUTPUTS if not path.exists() or path.read_text() != encoded]
        if stale:
            parser.exit(1, "Stale intervention exports: " + ", ".join(stale) + "\n")
    else:
        for path in OUTPUTS:
            path.parent.mkdir(parents=True, exist_ok=True)
            path.write_text(encoded)


if __name__ == "__main__":
    main()
