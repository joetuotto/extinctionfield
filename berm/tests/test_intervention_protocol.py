"""Discriminating protocol contracts, conservation and conditional-bridge tests."""
from copy import deepcopy
import json
import math
from pathlib import Path

import numpy as np
import pytest

from berm.modulome.intervention_examples import base_protocol, example_scenarios, port
from berm.modulome.intervention_protocol import COMPARTMENTS, run_factorial_protocol, run_intervention_protocol
from berm.modulome.photostate import CryptochromeIdentity, CryptochromeParameters, FlavinState, LightHistory, PhotonEvent, sequential_two_photon_yield


@pytest.fixture(scope="module")
def protocols():
    return {s["id"]: s["protocol"] for s in example_scenarios()}


@pytest.fixture(scope="module")
def results(protocols):
    return {key: run_factorial_protocol(p) for key, p in protocols.items()}


def arms(result):
    return {a["id"]: a for a in result["arms"]}


def value(a, key):
    return a["observables"][key]["value"]


def execute(p, field=True, drug=False):
    return run_intervention_protocol(p, field_enabled=field, intervention_enabled=drug)


def rate(p, **values):
    for key, val in values.items():
        p["parameters"][key]["value"] = val


def test_mt2_separates_resting_evoked_and_sodium_endpoints(results, protocols):
    a = arms(results["mt2"])
    assert len({value(x, "resting_bulk_ca") for x in a.values()}) == 1
    assert value(a["drug"], "evoked_bulk_ca_increment") > value(a["sham"], "evoked_bulk_ca_increment")
    assert value(a["field_drug"], "nav_current_final") - value(a["drug"], "nav_current_final") < value(a["field"], "nav_current_final") - value(a["sham"], "nav_current_final")
    antagonist = deepcopy(protocols["mt2"])
    antagonist["intervention"]["controls"]["mt2_activation"] = 0
    assert execute(antagonist, drug=True)["observables"] == a["field"]["observables"]


def test_ryr_and_cam_blockade_separate_release_from_downstream_brake(protocols):
    p = deepcopy(protocols["mt2"])
    agonist = execute(p, drug=True)
    p["intervention"]["controls"]["cam_brake_available"] = 0
    cam = execute(p, drug=True)
    assert value(cam, "evoked_bulk_ca_increment") == value(agonist, "evoked_bulk_ca_increment")
    assert value(cam, "nav_current_final") > value(agonist, "nav_current_final")
    p["intervention"]["controls"].update(cam_brake_available=1, ryr_available=0)
    ryr = execute(p, drug=True)
    assert all(row["evoked_er_release_flux"] == row["nav_brake"] == 0 for row in ryr["trace"])
    assert value(ryr, "evoked_bulk_ca_increment") < value(agonist, "evoked_bulk_ca_increment")
    assert value(ryr, "nav_current_final") == value(cam, "nav_current_final")


def test_same_bulk_peak_can_have_different_channel_local_growth_prediction():
    l = base_protocol("channel_selectivity")
    t = deepcopy(l)
    t["geometry"]["ports"] = [port("channel_gate:CaV3.2", .25, "probability")]
    for p in (l, t):
        rate(p, arrest_gain=.5)
    lr, tr = execute(l), execute(t)
    assert value(lr, "bulk_ca_peak") == pytest.approx(value(tr, "bulk_ca_peak"), abs=1e-12)
    assert value(tr, "growth_activity_final") < value(lr, "growth_activity_final")
    assert value(tr, "cell_cycle_arrest_final") > value(lr, "cell_cycle_arrest_final")
    rate(t, arrest_gain=0)
    assert value(execute(t), "growth_activity_final") == t["parameters"]["growth_baseline"]["value"]


def test_growth_state_retains_duration_information_after_matching_peak():
    p = base_protocol("channel_selectivity")
    p["geometry"]["ports"] = [port("channel_gate:CaV3.2", .25, "probability")]
    rate(p, arrest_gain=.5)
    short = execute(p)
    p["phases"][1]["duration_s"] *= 2
    long = execute(p)
    assert value(long, "cell_cycle_arrest_final") > value(short, "cell_cycle_arrest_final")
    assert value(long, "growth_activity_final") < value(short, "growth_activity_final")


def test_local_channel_signal_can_be_below_bulk_detection(results):
    a = arms(results["local_fast"])
    assert value(a["field"], "local_l_ca_peak") > value(a["sham"], "local_l_ca_peak")
    assert value(a["field"], "local_l_ca_peak") - value(a["sham"], "local_l_ca_peak") > value(a["field"], "bulk_measured_increment")
    assert value(a["field"], "erk_final") > value(a["sham"], "erk_final")
    assert not a["field"]["observables"]["bulk_measured_increment"]["detected"]


def test_fast_and_slow_buffers_share_affinity_but_differ_in_kinetics(results, protocols):
    fast, slow = (protocols[f"local_{name}"]["intervention"]["controls"] for name in ("fast", "slow"))
    assert fast["buffer_total"] == slow["buffer_total"]
    assert fast["buffer_off"] / fast["buffer_on"] == pytest.approx(slow["buffer_off"] / slow["buffer_on"])
    f, s = arms(results["local_fast"]), arms(results["local_slow"])
    assert value(f["field_drug"], "erk_early") < value(s["field_drug"], "erk_early")
    assert value(f["field_drug"], "erk_final") < value(s["field_drug"], "erk_final")
    early_ratio = value(s["field_drug"], "erk_early") / value(s["field"], "erk_early")
    sustained_ratio = value(s["field_drug"], "erk_final") / value(s["field"], "erk_final")
    assert 0 < early_ratio < sustained_ratio < 1
    assert sustained_ratio > .95  # late local route is largely spared in this declared synthetic case


def test_channel_knockdown_preserves_independent_current(results):
    a = arms(results["selectivity"])
    assert value(a["field_drug"], "current:CaV3.2") == 0
    assert value(a["field"], "current:CaV3.2") > 0
    assert value(a["field_drug"], "current:CaV1.2") == value(a["field"], "current:CaV1.2") > 0


def test_serca_pretreatment_changes_baseline_and_store_not_independent_current(results):
    a = arms(results["serca"])
    assert a["drug"]["baseline"]["bulk"] > a["sham"]["baseline"]["bulk"]
    assert a["drug"]["baseline"]["er"] < a["sham"]["baseline"]["er"]
    assert a["field"]["baseline"] == a["sham"]["baseline"]
    assert a["field_drug"]["baseline"] == a["drug"]["baseline"]
    contrasts = {c["endpoint"]: c for c in results["serca"]["contrasts"]}
    c = contrasts["evoked_bulk_ca_increment"]
    assert 0 < c["field_effect_with_drug"] < c["field_effect_without_drug"]
    assert value(a["field"], "current:CaV1.2") == value(a["field_drug"], "current:CaV1.2") > 0


def test_detector_saturation_is_separate_from_store_depletion(protocols):
    p = deepcopy(protocols["serca"])
    raw = execute(p, drug=True)
    p["observation"]["bulk_saturation"] = raw["baseline"]["bulk"] / 2
    saturated = execute(p, drug=True)
    assert value(saturated, "bulk_measured_increment") == 0
    assert value(saturated, "evoked_bulk_ca_increment") > 0
    assert saturated["final_state"] == raw["final_state"]


def test_lipid_synthesis_inhibition_and_exogenous_lte_have_opposed_predictions(results, protocols):
    a = arms(results["lipid"])
    assert value(a["field"], "current:CaV3.2") < value(a["sham"], "current:CaV3.2")
    assert value(a["field_drug"], "current:CaV3.2") == value(a["sham"], "current:CaV3.2")
    assert len({value(x, "current:CaV1.2") for x in a.values()}) == 1
    p = deepcopy(protocols["lipid"])
    for phase in p["phases"]:
        phase["controls"]["lte_infusion"] = .1
    rescue = execute(p, field=False, drug=True)
    assert value(rescue, "current:CaV3.2") < value(a["drug"], "current:CaV3.2")


def test_slow_density_is_not_single_channel_opening(results):
    a = arms(results["density"])
    assert value(a["field"], "density:CaV1.2") > value(a["sham"], "density:CaV1.2")
    assert value(a["field"], "density:CaV1.2") == value(a["field_drug"], "density:CaV1.2")
    assert value(a["field_drug"], "current:CaV1.2") == 0
    assert value(a["field"], "current:CaV1.2") / value(a["field"], "density:CaV1.2") == pytest.approx(value(a["sham"], "current:CaV1.2") / value(a["sham"], "density:CaV1.2"))


def test_cry_quantity_occupancy_and_reporter_endpoints_are_separate(results, protocols):
    a = arms(results["cry_fad"])
    assert value(a["drug"], "cry_total_final") > value(a["sham"], "cry_total_final")
    assert value(a["drug"], "photo_capacity_final") < value(a["sham"], "photo_capacity_final")
    assert value(a["drug"], "clock_period_final") > value(a["sham"], "clock_period_final")
    assert value(a["drug"], "clock_amplitude_final") < value(a["sham"], "clock_amplitude_final")
    p, final = protocols["cry_fad"], a["field_drug"]["trace"][-1]
    photo = p["photochemistry"]
    y = sequential_two_photon_yield(CryptochromeIdentity(**photo["identity"]),
        FlavinState(binding_occupancy=final["fad_occupancy"]),
        LightHistory(tuple(PhotonEvent(**event) for event in photo["initial_cell_light"])),
        parameters=CryptochromeParameters(**photo["parameters"])).sequential_yield
    assert final["photo_capacity"] == pytest.approx(final["cry_total"] * y)
    assert final["photo_capacity"] != pytest.approx(final["cry_total"] * y * final["fad_occupancy"])


def test_cell_free_probe_light_does_not_rewrite_cry_state(results, protocols):
    a = arms(results["probe_light"])
    assert value(a["field_drug"], "drug_active_final") < value(a["field"], "drug_active_final")
    assert value(a["field_drug"], "current:CaV1.2") > value(a["field"], "current:CaV1.2")
    assert value(a["field_drug"], "photo_capacity_final") == value(a["field"], "photo_capacity_final")
    p = deepcopy(protocols["probe_light"])
    rate(p, drug_photo_rate=0)
    assert execute(p, drug=True)["observables"] == a["field"]["observables"]


def test_coq_sites_are_distinguishable_and_have_one_damage_source(results, protocols):
    t, r, repair = (arms(results[f"coq_{site}"]) for site in ("transduction", "redox", "repair"))
    assert value(t["field_drug"], "evoked_bulk_ca_increment") < value(t["field"], "evoked_bulk_ca_increment")
    assert value(r["field_drug"], "evoked_bulk_ca_increment") == value(r["field"], "evoked_bulk_ca_increment")
    assert value(repair["field_drug"], "evoked_bulk_ca_increment") == value(repair["field"], "evoked_bulk_ca_increment")
    for a in (t, r, repair):
        assert value(a["field_drug"], "damage_final") < value(a["field"], "damage_final")
    assert r["field_drug"]["trace"][-1]["damage_production"] < r["field"]["trace"][-1]["damage_production"]
    assert repair["field_drug"]["trace"][-1]["damage_production"] == repair["field"]["trace"][-1]["damage_production"]
    p = deepcopy(protocols["coq_redox"])
    rate(p, mito_uptake=0)
    output = execute(p)
    assert all(row["damage_production"] == 0 for row in output["trace"])
    expected = p["initial_state"]["damage"] * math.exp(-.1 * .5 * sum(x["duration_s"] for x in p["phases"]))
    assert value(output, "damage_final") == pytest.approx(expected)
    audit = t["field_drug"]["bridge_trace"][-1]["ports"]["er_release_rate"]
    assert audit["raw_port_value"] * audit["intervention_factor"] == audit["effective_port_value"] == audit["port_value"]
    assert audit["intervention_factor"] == 1 - protocols["coq_transduction"]["intervention"]["controls"]["coq_strength"]


def test_calcium_amount_is_conserved_across_compartments_and_buffer(protocols):
    p = deepcopy(protocols["local_fast"])
    for channel in p["channels"]:
        channel["single_channel_flux"] = 0
    rate(p, serca=.2, er_leak=.02, mito_uptake=.1, resting_influx=0, extrusion=0)
    output = execute(p, drug=True)
    pools = (*COMPARTMENTS, "buffer_l", "buffer_t", "buffer_bulk")
    assert sum(output["final_state"][key] for key in pools) == pytest.approx(sum(p["initial_state"][key] for key in pools), abs=1e-12)


def test_signed_transfer_reduces_gate_without_abs_or_clip():
    p = base_protocol("channel_selectivity")
    p["channels"][0]["open_baseline"] = .5
    p["geometry"]["ports"][0]["gain"] = -.25
    sham, field = execute(p, field=False), execute(p)
    assert value(field, "current:CaV1.2") < value(sham, "current:CaV1.2")
    assert field["bridge_trace"][-1]["ports"]["channel_gate:CaV1.2"]["port_value"] < 0
    p["geometry"]["ports"][0]["gain"] = -10
    with pytest.raises(ValueError, match="channel opening"):
        execute(p)


def test_exact_geometry_and_kernel_are_executed_and_shared_across_arms(results, protocols, monkeypatch):
    import berm.modulome.intervention_protocol as module
    original_metric, original_contract = module.metric_perturbation, module.contract_retarded_response
    calls = {"metric": 0, "contract": 0}
    def metric(*args, **kwargs):
        calls["metric"] += 1
        return original_metric(*args, **kwargs)
    def contract(*args, **kwargs):
        calls["contract"] += 1
        return original_contract(*args, **kwargs)
    monkeypatch.setattr(module, "metric_perturbation", metric)
    monkeypatch.setattr(module, "contract_retarded_response", contract)
    p = deepcopy(protocols["local_slow"])
    output = execute(p)
    assert calls["metric"] > 100 and calls["contract"] > 100
    a0, ext, scale = np.array(p["geometry"]["background"]), np.array(p["phases"][-1]["external"]), p["geometry"]["coupling_scale"]
    expected = scale * (np.outer(a0, ext) + np.outer(ext, a0) + np.outer(ext, ext))
    np.testing.assert_allclose(output["bridge_trace"][-1]["delta_metric"], expected)
    a = arms(results["mt2"])
    assert a["field"]["bridge_trace"] == a["field_drug"]["bridge_trace"]


def test_zero_kernel_eliminates_field_contrasts_but_preserves_drug_main_effect(protocols):
    p = deepcopy(protocols["mt2"])
    p["geometry"]["ports"][0]["kernel_history"] = np.zeros((1, 4, 4)).tolist()
    result = run_factorial_protocol(p)
    assert all(c["field_effect_with_drug"] == c["field_effect_without_drug"] == c["interaction"] == 0 for c in result["contrasts"])
    a = arms(result)
    assert value(a["drug"], "evoked_bulk_ca_increment") > value(a["sham"], "evoked_bulk_ca_increment")


def test_retarded_port_depends_on_history_after_field_turns_off():
    p = base_protocol("channel_selectivity")
    p["phases"] = [p["phases"][1]]
    p["phases"][0]["duration_s"] = .02
    tail = deepcopy(p["phases"][0])
    tail.update(id="after", external=[0, 0, 0, 0])
    p["phases"].append(tail)
    p["observation"]["early_time_s"] = .02
    entry = p["geometry"]["ports"][0]
    kernel = entry["kernel_history"][0]
    entry["kernel_history"] = [np.zeros((4, 4)).tolist(), kernel]
    entry["lag_weights"] = [1., 1.]
    output = execute(p)
    assert output["bridge_trace"][0]["ports"][entry["id"]]["port_value"] == 0
    assert output["bridge_trace"][1]["ports"][entry["id"]]["port_value"] > 0


def test_timed_drug_light_and_washout_do_not_anticipate_events(protocols):
    p = deepcopy(protocols["probe_light"])
    p["phases"] = [p["phases"][1]]
    p["phases"][0]["solution_light"] = [{"wavelength_nm": 380, "photon_flux": 2, "duration_s": 1, "delay_before_s": 2}]
    output = execute(p)
    assert all(row["drug_active"] == 10 for row in output["trace"] if row["time_s"] < 1.99)
    assert output["trace"][-1]["drug_active"] < 10
    p["phases"][0]["solution_light"] = []
    wash = deepcopy(p["phases"][0])
    wash.update(id="wash", duration_s=1, drug_exchange={"retained_fraction": 0, "added_concentration": 0})
    p["phases"].append(wash)
    output = execute(p)
    assert output["trace"][-1]["drug_active"] == 0
    assert output["trace"][-1]["channel_currents"]["CaV1.2"] > output["trace"][0]["channel_currents"]["CaV1.2"]


def test_cell_light_is_elapsed_history_not_future_dose():
    p = base_protocol("cry_fad_competition")
    p["photochemistry"]["initial_cell_light"] = []
    p["phases"] = [p["phases"][1]]
    p["phases"][0]["cell_light"] = [{"wavelength_nm": 450, "photon_flux": 2, "duration_s": 1, "delay_before_s": 1},
                                      {"wavelength_nm": 530, "photon_flux": 2, "duration_s": 1, "delay_before_s": .1}]
    result = execute(p)
    assert all(row["photo_capacity"] == 0 for row in result["trace"] if row["time_s"] < 2.1)
    assert result["trace"][-1]["photo_capacity"] > 0
    p["phases"][0]["cell_light"][-1]["photon_flux"] *= 10
    future_changed = execute(p)
    assert result["trace"][:100] == future_changed["trace"][:100]


def test_splitting_contiguous_identical_light_is_not_a_second_photon_epoch():
    p = base_protocol("cry_fad_competition")
    p["photochemistry"]["initial_cell_light"] = []
    p["phases"] = [p["phases"][1]]
    p["phases"][0]["cell_light"] = [{"wavelength_nm": 450, "photon_flux": 2, "duration_s": 2}]
    whole = execute(p)
    p["phases"][0]["cell_light"] = [{"wavelength_nm": 450, "photon_flux": 2, "duration_s": 1},
                                      {"wavelength_nm": 450, "photon_flux": 2, "duration_s": 1}]
    split = execute(p)
    assert [r["photo_capacity"] for r in whole["trace"]] == [r["photo_capacity"] for r in split["trace"]]
    first = deepcopy(p["phases"][0])
    first.update(id="first", duration_s=1, cell_light=p["phases"][0]["cell_light"][:1])
    second = deepcopy(first)
    second.update(id="second", duration_s=3)
    p["phases"] = [first, second]
    across_phases = execute(p)
    assert [r["photo_capacity"] for r in whole["trace"]] == [r["photo_capacity"] for r in across_phases["trace"]]


@pytest.mark.parametrize("invalid", ["empty_tensor", "bad_units", "bad_rate_unit", "duplicate_port", "duplicate_channel", "unknown_target", "empty_parameters", "nonfinite", "negative_density", "out_of_time", "late_pretreat", "unstable_buffer", "future_light", "unknown_phase", "coq_unspecified"])
def test_invalid_inputs_fail_explicitly(invalid):
    p = base_protocol("test")
    if invalid == "empty_tensor": p["geometry"]["ports"][0]["kernel_history"] = [[]]
    if invalid == "bad_units": p["geometry"]["ports"][0]["output_unit"] = "concentration"
    if invalid == "bad_rate_unit": p["parameters"]["er_leak"]["unit"] = "bananas"
    if invalid == "duplicate_port": p["geometry"]["ports"].append(deepcopy(p["geometry"]["ports"][0]))
    if invalid == "duplicate_channel": p["channels"].append(deepcopy(p["channels"][0]))
    if invalid == "unknown_target": p["intervention"]["controls"]["channel_blocks"] = {"unknown": 1}
    if invalid == "empty_parameters": p["geometry"]["ports"][0]["parameter_ids"] = []
    if invalid == "nonfinite": p["parameters"]["serca"]["value"] = float("inf")
    if invalid == "negative_density": p["channels"][0]["density"] = -1
    if invalid == "out_of_time": p["observation"]["early_time_s"] = 100
    if invalid == "late_pretreat": p["phases"].reverse()
    if invalid == "unstable_buffer": p["intervention"]["controls"].update(buffer_total=10, buffer_on=1e6)
    if invalid == "future_light": p["phases"][0]["cell_light"] = [{"wavelength_nm": 400, "photon_flux": 1, "duration_s": 20}]
    if invalid == "unknown_phase": p["intervention"]["phase_overrides"] = {"not_a_phase": {"controls": {}}}
    if invalid == "coq_unspecified": p["intervention"]["controls"]["coq_strength"] = .5
    with pytest.raises(ValueError):
        execute(p, drug=True)


def test_protocol_inputs_are_not_mutated(protocols):
    p = deepcopy(protocols["mt2"])
    original = deepcopy(p)
    execute(p, drug=True)
    assert p == original


@pytest.mark.parametrize("name,endpoint", [("mt2", "nav_current_final"), ("serca", "evoked_bulk_ca_increment"), ("local_fast", "erk_final")])
def test_smaller_steps_converge_for_distinct_protocol_kinetics(protocols, name, endpoint):
    p = deepcopy(protocols[name])
    values = []
    for dt in (.02, .01, .005):
        p["dt_s"] = dt
        values.append(value(execute(p, drug=True), endpoint))
    assert abs(values[2] - values[1]) < abs(values[1] - values[0])
    assert abs(values[2] - values[1]) < .01 * max(abs(values[2]), 1e-8)


def test_factorial_contrast_overflow_is_rejected(monkeypatch):
    import berm.modulome.intervention_protocol as module
    values = iter((-1e308, 1e308, 0, 0))
    def arm(*args, **kwargs):
        return {"observables": {"signed": {"value": next(values), "unit": "response"}}, "parameter_ids": [], "evidence_ids": []}
    monkeypatch.setattr(module, "run_intervention_protocol", arm)
    with pytest.raises(ValueError, match="finite"):
        module.run_factorial_protocol({})


def test_export_covers_profiles_and_keeps_replay_provenance_separate_from_study_data():
    root = Path(__file__).resolve().parents[2]
    payload = json.loads((root / "website/data/intervention-scenarios.json").read_text())
    registry = json.loads((root / "berm/data/evidence/intervention_profiles_v1.json").read_text())
    assert {s["profile_id"] for s in payload["scenarios"]} == {p["id"] for p in registry["profiles"]}
    assert payload["metadata"]["asfr_mapping"] is None
    assert payload["metadata"]["physical_identification_status"] == "OPEN"
    for s in payload["scenarios"]:
        assert s["reference_ids"]
        assert s["result"]["changes_archived_v17"] is False
        assert s["result"]["evidence_ids"] == []  # no coefficient provenance falsely borrowed from a paper
        assert all(p["basis"] == "SYNTHETIC" for p in s["protocol"]["parameters"].values())
        assert set(s["result"]["arms"][0]["observables"]) <= set(payload["metadata"]["observable_labels"])
        for a in s["result"]["arms"]:
            assert a["parameter_ids"] and len(a["trace"]) <= 62
        for contrast in s["result"]["contrasts"]:
            assert contrast["interaction"] == pytest.approx(contrast["field_effect_with_drug"] - contrast["field_effect_without_drug"])
    assert (root / "website/data/intervention-scenarios.json").read_bytes() == (root / "website/public/data/intervention-scenarios.json").read_bytes()
