"""Mechanism integration, replayable JSON, direction and no-double-counting tests."""
from copy import deepcopy
from dataclasses import replace
import importlib.util
import json
import math
from pathlib import Path
import subprocess
import sys

import pytest

from berm.biology.reproductive_state import CoupleReproductiveState, FemaleReproductiveState, MaleReproductiveState
from berm.data.wpp import AGE_GROUPS
from berm.model import predict_country_year
from berm.model_fieldstate_asfr import project_wpp_conditional_asfr
from berm.model_modulome_asfr import _arm, project_modulome_scenario
from berm.modulome.reproductive_bridge import ImplantationSupport, LocalHormoneSource
from berm.modulome.scenarios import illustrative_arm, illustrative_scenarios, scenario_input
from berm.outcomes.reproductive_waiting import CoupleWaitingState, WaitingHorizonComparison

ROOT = Path(__file__).resolve().parents[2]


def test_same_integrated_driver_with_different_order_changes_function_and_asfr():
    row = illustrative_scenarios()[0]
    before, after = row["input"]["age_groups"][0]["reference"], row["input"]["age_groups"][0]["target"]
    assert sum(before["protocol"]["driver"]) == sum(after["protocol"]["driver"])
    result = project_modulome_scenario(row["input"])
    traces = result["mechanism_runs"][0]
    assert traces["reference"]["features"]["calcium_final"] != pytest.approx(traces["target"]["features"]["calcium_final"])
    assert result["predicted_tfr"] != pytest.approx(result["reference_tfr"])
    assert result["predicted_tfr"] == pytest.approx(5 * sum(result["predicted_asfr"]) / 1000)


def test_same_hormone_mean_different_phase_changes_exact_timing_ratio():
    row = illustrative_scenarios()[1]
    result = project_modulome_scenario(row["input"])
    assert result["predicted_tfr"] / result["reference_tfr"] == pytest.approx((1 - 0.5 * 0.8**2) / (1 + 0.5 * 0.8**2))
    run = result["mechanism_runs"][0]
    assert run["reference"]["features"] == run["target"]["features"]
    assert run["reference"]["hormone_timing"]["hormone_timing"]["signal_mean"] == run["target"]["hormone_timing"]["hormone_timing"]["signal_mean"]


def test_repair_capacity_preserves_readiness_damage_distinction():
    result = project_modulome_scenario(illustrative_scenarios()[2]["input"])
    run = result["mechanism_runs"][0]
    assert run["target"]["features"]["damage_load"] < run["reference"]["features"]["damage_load"]
    assert run["target"]["features"]["receptor_readiness"] == run["reference"]["features"]["receptor_readiness"]
    assert result["predicted_tfr"] > result["reference_tfr"]


def test_same_increment_can_improve_or_impair_function_around_registered_optimum():
    before, after = illustrative_arm(), illustrative_arm()
    after["protocol"]["driver"] = list(reversed(before["protocol"]["driver"]))
    _, ref = _arm(before)
    _, tgt = _arm(after)
    ref_coordinate = ref["functional_endpoint"]["coordinate"]
    tgt_coordinate = tgt["functional_endpoint"]["coordinate"]
    before["endpoint"]["optimum"] = after["endpoint"]["optimum"] = ref_coordinate
    harm = project_modulome_scenario(scenario_input("harm", before, after))
    before["endpoint"]["optimum"] = after["endpoint"]["optimum"] = tgt_coordinate
    benefit = project_modulome_scenario(scenario_input("benefit", before, after))
    assert harm["predicted_tfr"] < harm["reference_tfr"]
    assert benefit["predicted_tfr"] > benefit["reference_tfr"]


def test_membrane_intervention_and_dynamic_readiness_reach_calcium():
    active = illustrative_arm()
    active["protocol"]["initial_calcium"]["cytosol"] = 0
    blocked = deepcopy(active)
    blocked["protocol"]["membrane"]["channel_density"] = 0
    _, on = _arm(active)
    _, off = _arm(blocked)
    assert on["features"]["calcium_peak"] > 0
    assert off["features"]["calcium_peak"] == 0
    assert off["features"]["store_cycling"] == 0
    assert on["trace"][1]["effective_readiness_before_step"] < on["trace"][0]["effective_readiness_before_step"]


def test_endpoint_and_timing_replace_gates_and_refuse_duplicate_manual_factors():
    value = illustrative_arm()
    value["base_couple"]["female"]["oocyte_redox_quality"] = 0.8
    with pytest.raises(ValueError, match="replaces oocyte"):
        _arm(value)
    value = illustrative_scenarios()[1]["input"]["age_groups"][0]["target"]
    value["base_couple"]["female"]["ovulatory_clock_gate"] = 0.8
    with pytest.raises(ValueError, match="timing replaces"):
        _arm(value)


def test_local_ovarian_output_compensates_before_implantation_gate():
    left = LocalHormoneSource("left", 1, 0.5, 0, 1)
    right = LocalHormoneSource("right", 1, 0.5, 0, 1)
    model = ImplantationSupport((left, right), 1, 0, 0, 0.8, "relative progesterone", ("supplied-local-threshold",))
    assert model.as_dict()["factor"] == 1
    assert replace(model, sources=(left, replace(right, available_fraction=0))).as_dict()["factor"] == 1
    assert replace(model, sources=(replace(left, available_fraction=0), replace(right, available_fraction=0))).as_dict()["factor"] == 0
    arm = illustrative_arm()
    arm["implantation"] = {"sources": [{"source_id": "left", "mean": 0.4, "amplitude": 0, "phase_radians": 0, "available_fraction": 1}],
        "receptivity_mean": 1, "receptivity_amplitude": 0, "receptivity_phase_radians": 0,
        "required_response": 0.8, "signal_units": "relative progesterone", "parameter_ids": ["local-test"]}
    coupled, result = _arm(arm)
    assert coupled.live_birth_support == pytest.approx(0.5)
    assert result["biological_capacity"] == pytest.approx(result["conception_capacity"] * 0.5)


def test_spectral_b0_window_drives_same_route_without_replacing_locked_window():
    before = illustrative_arm()
    before["spectral"] = {"driver_id": "test-25hz", "bins": [{"frequency_hz": 25.2, "power_density": 1, "bandwidth_hz": 1}],
        "provenance": "synthetic spectral intervention", "b0_tesla": 0,
        "amplitude_gain": 1, "parameter_ids": ["supplied-power-amplitude"],
        "window": {"window_id": "test-window", "centre_hz": 25.2, "sigma_hz": 2,
                   "b0_coefficient_hz_per_tesla": 100000, "parameter_ids": ["supplied-window"]}}
    after = deepcopy(before)
    after["spectral"]["b0_tesla"] = 50e-6
    _, ref = _arm(before)
    _, target = _arm(after)
    assert ref["spectral_window"]["locked_response_power"] == target["spectral_window"]["locked_response_power"]
    assert ref["spectral_window"]["candidate_response_power"] > target["spectral_window"]["candidate_response_power"]
    assert ref["features"]["calcium_peak"] > target["features"]["calcium_peak"]
    assert "supplied-window" in target["parameter_ids"]


def test_wpp_waiting_comparison_replaces_capacity_and_keeps_demography(monkeypatch):
    couple = CoupleReproductiveState(MaleReproductiveState(), FemaleReproductiveState())
    altered = replace(couple, female=FemaleReproductiveState(ovarian_reserve=0.1))
    waiting = WaitingHorizonComparison((CoupleWaitingState(couple, 0.2),), (CoupleWaitingState(couple, 0.1),), 12, ("waiting-adapter",))
    monkeypatch.setattr("berm.model_fieldstate_asfr.wpp.load_asfr", lambda *args: {"values": [100] * 7, "series_status": "TEST"})
    result = project_wpp_conditional_asfr(geography_id="SYNTHETIC", year=2026, reference_year=2025,
        reference_couples=dict.fromkeys(AGE_GROUPS, couple), target_couples=dict.fromkeys(AGE_GROUPS, altered),
        waiting_comparisons=dict.fromkeys(AGE_GROUPS, waiting), target_tempo=dict.fromkeys(AGE_GROUPS, 1.1))
    assert result["predicted_tfr"] == pytest.approx(3.5 * waiting.biological_ratio * 1.1)
    assert all(row["biological_mapping"]["parameter_ids"] == ["waiting-adapter"] for row in result["age_groups"])
    with pytest.raises(ValueError, match="unknown age"):
        project_wpp_conditional_asfr(geography_id="X", year=2026, reference_year=2025,
            reference_couples={}, target_couples={}, waiting_comparisons={"20-30": waiting})


def test_replay_does_not_mutate_inputs_or_upgrade_component_calibration():
    payload = scenario_input("replay")
    for row in payload["age_groups"]:
        for arm in ("reference", "target"):
            for item in ("initial_state", "membrane", "state_kinetics", "calcium_kinetics"):
                row[arm]["protocol"][item]["calibration_status"] = "ENDPOINT_CALIBRATED"
    saved = deepcopy(payload)
    result = project_modulome_scenario(payload)
    assert payload == saved
    assert result["calibration_status"] == "STRUCTURAL_ONLY"
    assert result["l2_bridge_status"] == "OPEN"
    assert result["forecast_calibrated"] is False
    assert json.loads(json.dumps(result, allow_nan=False))["scenario_id"] == "replay"


@pytest.mark.parametrize("mutation,match", [
    (lambda p: p.update(schema_version=2), "schema_version"),
    (lambda p: p.update(country_effect=0.5), "unknown scenario"),
    (lambda p: p["age_groups"][0]["reference"]["protocol"].update(dt_s=1), "kinetics_interval_s"),
    (lambda p: p["age_groups"][0]["reference"]["endpoint"].update(coefficients={"5g": 1}), "unknown functional"),
    (lambda p: p["age_groups"][0]["reference"]["protocol"].update(driver=[float("nan")]), "finite"),
    (lambda p: p["age_groups"][0]["reference"]["protocol"].update(coupling_parameter_ids="accidental-string"), "collection"),
    (lambda p: p["age_groups"][0]["reference"]["endpoint"].update(evidence_ids="accidental-string"), "collection"),
])
def test_invalid_or_implicit_mappings_fail(mutation, match):
    payload = scenario_input("invalid")
    mutation(payload)
    with pytest.raises(ValueError, match=match):
        project_modulome_scenario(payload)


def test_cli_can_select_scenario_and_legacy_numbers_stay_locked(tmp_path):
    assert predict_country_year("Finland", 2030)["predicted_tfr"] == 1.3209357069197134
    path = tmp_path / "scenario.json"
    path.write_text(json.dumps(scenario_input("cli")))
    cli = subprocess.run([sys.executable, "-m", "berm.cli", "predict", "SYNTHETIC", "2026",
                          "--route", "modulome", "--scenario", str(path)], capture_output=True, text=True)
    assert cli.returncode == 0, cli.stderr
    result = json.loads(cli.stdout)
    assert result["route"] == "berm-modulome-conditional-asfr-v1"
    assert result["changes_archived_v17"] is False
    assert result["predicted_tfr"] == 3.5


def test_hormone_mapping_requires_its_own_parameter_id_collection():
    arm = illustrative_scenarios()[1]["input"]["age_groups"][0]["target"]
    arm["timing_parameter_ids"] = "not-a-list"
    with pytest.raises(ValueError, match="collection"):
        _arm(arm)


def test_export_is_derived_from_route_and_lightweight_projection():
    spec = importlib.util.spec_from_file_location("conditional_export", ROOT / "berm/export_conditional_scenarios.py")
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    payload = module.build_payload()
    light = module.build_explorer(payload)
    assert light["metadata"]["other_groups_share_protocol"] is True
    for full, short in zip(payload["scenarios"], light["scenarios"]):
        assert full["result"] == project_modulome_scenario(full["input"])
        assert short["result"]["mechanism_runs"] == full["result"]["mechanism_runs"][:1]
        assert short["result"]["age_groups"] == full["result"]["age_groups"]
    for path in module.OUTPUTS:
        assert json.loads(path.read_text()) == json.loads(json.dumps(payload))
    assert json.loads(module.EXPLORER_OUTPUT.read_text()) == json.loads(json.dumps(light))
