"""Illustrative inputs for the executable conditional route, never fitted data."""
from copy import deepcopy
from dataclasses import asdict

from berm.data.wpp import AGE_GROUPS
from berm.modulome.calcium import ILLUSTRATIVE_CALCIUM_KINETICS
from berm.modulome.state import ILLUSTRATIVE_STATE_KINETICS


def illustrative_arm():
    return {
        "protocol": {
            "protocol_id": "illustrative-cell-protocol-v1",
            "driver": [0.4] * 20 + [0.0] * 20,
            "driver_units": "illustrative local biological drive units",
            "driver_provenance": "Synthetic shape comparison, not a measured EMF protocol",
            "dt_s": 0.1, "kinetics_interval_s": 0.1, "state_increment_gain": 1.0,
            "coupling_parameter_ids": ["illustrative-drive-to-state-0.1s-v1"],
            "initial_state": {"state_id": "illustrative-cell-v1", "receptor_readiness": 1.0,
                              "repair_capacity": 0.3, "damage_load": 0.4},
            "membrane": {"machinery_id": "illustrative-membrane-v1", "channel_density": 0.8,
                         "complex_integrity": 0.9, "localisation_fidelity": 1.0, "lipid_order": 0.9},
            "initial_calcium": {"cytosol": 0.05, "er_store": 1.0, "mitochondrial": 0.0},
            "state_kinetics": asdict(ILLUSTRATIVE_STATE_KINETICS),
            "calcium_kinetics": asdict(ILLUSTRATIVE_CALCIUM_KINETICS),
        },
        "endpoint": {"endpoint_id": "illustrative-oocyte-function-window-v1",
                     "component": "oocyte_redox_quality", "coefficients": {"calcium_final": 1.0, "damage_load": 1.0},
                     "intercept": 0.0, "optimum": 0.0, "width": 0.4,
                     "coordinate_units": "illustrative assay coordinate",
                     "parameter_ids": ["illustrative-functional-window-v1"], "evidence_ids": []},
        "base_couple": {"male": {}, "female": {}},
    }


def scenario_input(scenario_id, reference=None, target=None):
    reference = illustrative_arm() if reference is None else reference
    target = deepcopy(reference) if target is None else target
    return {"schema_version": 1, "scenario_id": scenario_id, "geography_id": "SYNTHETIC",
            "year": 2026, "reference_year": 2026,
            "input_provenance": {"origin": "illustrative explicit inputs; no empirical calibration",
                                 "asfr": "synthetic 100 births per 1000 in every age group; TFR 3.5 is arithmetic only"},
            "age_groups": [{"age_group": age, "reference_asfr": 100.0,
                            "asfr_source_id": "SYNTHETIC_FLAT_ASFR_NOT_WPP",
                            "reference": deepcopy(reference), "target": deepcopy(target)} for age in AGE_GROUPS]}


def illustrative_scenarios():
    rows = []
    def add(key, title_fi, title_en, desc_fi, desc_en, before, after, changes):
        rows.append({"id": key, "title": {"fi": title_fi, "en": title_en},
                     "description": {"fi": desc_fi, "en": desc_en},
                     "changed_inputs": changes, "input": scenario_input(key, before, after)})
    def change(key, fi, en, ref, target, units):
        return {"key": key, "label": {"fi": fi, "en": en}, "reference": ref, "target": target, "units": units}
    baseline = illustrative_arm()
    delayed = deepcopy(baseline)
    delayed["protocol"]["driver"] = list(reversed(baseline["protocol"]["driver"]))
    add("equal-energy-timing", "Sama energia, eri ajoitus", "Same energy, different timing",
        "Sama ajurin aikaintegraali annetaan alussa tai lopussa. Ca²⁺ ja palautuminen säilyttävät tapahtumajärjestyksen.",
        "The same driver integral is applied early or late. Calcium and recovery retain the event order.", baseline, delayed,
        [change("driver_timing", "Pulssin sijainti", "Pulse timing", "0–2 s", "2–4 s", "seconds")])
    aligned, shifted = deepcopy(baseline), deepcopy(baseline)
    hormone = {"signal_mean": 1.0, "signal_amplitude": 0.8, "receptivity_mean": 1.0,
               "receptivity_amplitude": 0.8, "lag_radians": 0.0, "signal_units": "illustrative concentration"}
    for arm in (aligned, shifted):
        arm["hormone_timing"] = deepcopy(hormone)
        arm["timing_parameter_ids"] = ["illustrative-harmonic-overlap-v1"]
    shifted["hormone_timing"]["lag_radians"] = 3.141592653589793
    add("hormone-phase", "Sama hormonikeskiarvo, eri vaihe", "Same hormone mean, different phase",
        "Pitoisuuden keskiarvo pysyy samana; kudoksen vastaanottavuuden vaihe muuttuu.",
        "The mean concentration is unchanged; tissue receptivity changes phase.", aligned, shifted,
        [change("hormone_lag", "Vaihe-ero", "Phase lag", 0.0, 3.141592653589793, "radians")])
    repair_baseline = deepcopy(baseline)
    repair_baseline["protocol"]["driver"] = [0.0] * 8
    repaired = deepcopy(repair_baseline)
    repaired["protocol"]["initial_state"]["repair_capacity"] = 0.8
    add("repair-capacity", "Korjauskapasiteetti", "Repair capacity",
        "Vain lähtötilan korjauskapasiteetti muuttuu. Vaurio ja vastaanottovalmius raportoidaan erikseen.",
        "Only initial repair capacity changes. Damage and receptor readiness are reported separately.", repair_baseline, repaired,
        [change("repair_capacity", "Korjauskapasiteetti", "Repair capacity", 0.3, 0.8, "relative state")])
    add("waiting-heterogeneity", "Sama keskiarvo, erilainen odotusjakauma", "Same mean, different waiting distribution",
        "Parien lähtökohtainen keskimääräinen onnistumistodennäköisyys on sama, mutta jakauman häntä pitenee.",
        "Pairs have the same mean initial conception probability, but the mixture develops a longer waiting tail.", baseline, baseline,
        [change("probability_strata", "Yrityskohtaiset lähtötodennäköisyydet", "Reference cycle probabilities", [0.2], [0.1, 0.3], "probability")])
    for group in rows[-1]["input"]["age_groups"]:
        group["waiting"] = {"reference_strata": [{"reference_cycle_conception_probability": 0.2, "weight": 1}],
                            "target_strata": [{"reference_cycle_conception_probability": 0.1, "weight": 1},
                                               {"reference_cycle_conception_probability": 0.3, "weight": 1}],
                            "cycles": 12, "parameter_ids": ["illustrative-waiting-to-ASFR-v1"], "evidence_ids": []}
    return rows
