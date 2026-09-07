"""Merge invariants at signed response, androgen and ASFR composition boundaries."""
from copy import deepcopy

import pytest

from berm.biology.reproductive_state import BarrierState, MaleReproductiveState
from berm.model_modulome_asfr import _arm, project_modulome_scenario
from berm.modulome.conditional_inputs import SignedResponseTransfer
from berm.modulome.scenarios import illustrative_arm, scenario_input


def androgen_input(total=1):
    return {
        "binding": {"total_testosterone": total, "shbg_binding_sites": 0,
                    "albumin_binding_sites": 0, "shbg_dissociation_constant": 1,
                    "albumin_dissociation_constant": 1},
        "pathways": [{"name": "AR", "abundance": 1, "dissociation_constant": 1}],
        "pathway_weights": [1], "concentration_units": "synthetic concentration unit",
        "provenance": "analytic fixture; not an empirical human coefficient",
        "parameter_ids": ["fixture-androgen-binding-receptor"],
        "evidence_ids": ["fixture-no-empirical-calibration"],
    }


def response_input():
    # Each cell time step has one lag and a 2x2 tensor. Contractions are -1, +1.
    return {
        "kernel_histories": [[[[1, 0], [0, 0]]], [[[1, 0], [0, 0]]]],
        "delta_metric_histories": [[[[-1, 0], [0, 0]]], [[[1, 0], [0, 0]]]],
        "lag_weights": [1], "lag_weight_units": "second",
        "kernel_provenance": "synthetic signed kernel with units response/(metric second)",
        "kernel_parameter_ids": ["fixture-signed-kernel"],
        "transfer": {"transfer_id": "fixture-affine", "response_units": "synthetic response",
                     "driver_units": "relative local biological drive", "baseline": 2, "gain": 1,
                     "provenance": "explicit synthetic response-to-drive conversion",
                     "parameter_ids": ["fixture-signed-transfer"], "evidence_ids": []},
    }


def test_appended_androgen_gate_preserves_v1_positional_constructor():
    male = MaleReproductiveState(0.9, BarrierState("BTB"), 0.8, 0.7, 0.6, 0.5)
    assert male.sperm_output == 0.7
    assert male.sperm_function == 0.6
    assert male.sperm_dna_integrity == 0.5
    assert male.androgen_effective_capacity == 1
    assert male.conception_capacity == pytest.approx(0.9 * 0.8 * 0.7 * 0.6 * 0.5)


def test_androgen_supply_binding_receptor_enters_asfr_exactly_once():
    reference, target = illustrative_arm(), illustrative_arm()
    reference["androgen"], target["androgen"] = androgen_input(1), androgen_input(3)
    raw = scenario_input("androgen", reference, target)
    saved = deepcopy(raw)
    result = project_modulome_scenario(raw)
    assert raw == saved
    assert result["predicted_tfr"] == pytest.approx(result["reference_tfr"] * 1.5)
    run = result["mechanism_runs"][0]
    assert run["reference"]["androgen"]["effective_capacity"] == pytest.approx(0.5)
    assert run["target"]["androgen"]["effective_capacity"] == pytest.approx(0.75)
    assert "fixture-androgen-binding-receptor" in result["parameter_ids"]
    assert "fixture-no-empirical-calibration" in result["evidence_ids"]
    assert result["forecast_calibrated"] is False


@pytest.mark.parametrize("gate", ["steroidogenic_support", "androgen_effective_capacity"])
def test_androgen_rejects_a_second_manual_production_or_capacity_gate(gate):
    arm = illustrative_arm()
    arm["androgen"] = androgen_input()
    arm["base_couple"].setdefault("male", {})[gate] = 0.8
    with pytest.raises(ValueError, match="leave .* at 1"):
        _arm(arm)


def test_androgen_waiting_ratio_is_not_multiplied_by_capacity_again():
    ref, target = illustrative_arm(), illustrative_arm()
    ref["androgen"], target["androgen"] = androgen_input(1), androgen_input(3)
    payload = scenario_input("androgen-waiting", ref, target)
    for row in payload["age_groups"]:
        row["waiting"] = {"reference_strata": [{"reference_cycle_conception_probability": 0.2}],
                          "target_strata": [{"reference_cycle_conception_probability": 0.2}],
                          "cycles": 12, "parameter_ids": ["fixture-waiting"]}
    result = project_modulome_scenario(payload)
    # More than one cycle makes the waiting-probability ratio strictly less
    # than the one-cycle 0.75/0.5 capacity ratio; an extra multiplier fails.
    assert 1 < result["predicted_tfr"] / result["reference_tfr"] < 1.5
    ref_couple, _ = _arm(ref)
    target_couple, _ = _arm(target)
    expected_ratio = ((1 - (1 - 0.2 * target_couple.conception_capacity) ** 12)
                      / (1 - (1 - 0.2 * ref_couple.conception_capacity) ** 12))
    assert result["predicted_tfr"] / result["reference_tfr"] == pytest.approx(expected_ratio)


def test_signed_response_is_retained_and_explicitly_converted_without_clipping():
    arm = illustrative_arm()
    arm["protocol"].pop("driver")
    arm["retarded_response"] = response_input()
    arm["retarded_response"]["transfer"]["driver_units"] = arm["protocol"]["driver_units"]
    saved = deepcopy(arm)
    _, result = _arm(arm)
    assert arm == saved
    assert result["retarded_response"]["signed_response"] == [-1, 1]
    assert [row["driver"] for row in result["trace"]] == [1, 3]
    assert "fixture-signed-transfer" in result["parameter_ids"]
    assert "fixture-signed-kernel" in result["parameter_ids"]
    transfer = SignedResponseTransfer(**arm["retarded_response"]["transfer"])
    assert transfer.apply([-1, 1]) == (1, 3)
    reversed_gain = SignedResponseTransfer(**{**arm["retarded_response"]["transfer"], "gain": -1})
    assert reversed_gain.apply([-1, 1]) == (3, 1)
    with pytest.raises(ValueError, match="negative"):
        transfer.apply([-3])


def test_retarded_response_cannot_silently_override_another_driver():
    arm = illustrative_arm()
    arm["retarded_response"] = response_input()
    with pytest.raises(ValueError, match="omit protocol.driver"):
        _arm(arm)
    arm["protocol"].pop("driver")
    arm["retarded_response"]["transfer"]["driver_units"] = "incompatible units"
    with pytest.raises(ValueError, match="driver_units"):
        _arm(arm)


def test_retarded_kernel_requires_its_own_parameter_provenance():
    arm = illustrative_arm()
    arm["protocol"].pop("driver")
    arm["retarded_response"] = response_input()
    arm["retarded_response"]["kernel_parameter_ids"] = []
    with pytest.raises(ValueError, match="kernel_parameter_ids"):
        _arm(arm)


def test_empty_tensor_history_cannot_become_a_baseline_only_driver():
    arm = illustrative_arm()
    arm["protocol"].pop("driver")
    arm["retarded_response"] = response_input()
    arm["retarded_response"]["kernel_histories"] = [[[[]]]]
    arm["retarded_response"]["delta_metric_histories"] = [[[[]]]]
    with pytest.raises(ValueError, match="non-empty"):
        _arm(arm)


@pytest.mark.parametrize("field,value", [("parameter_ids", []), ("parameter_ids", "not-a-collection"),
                                         ("concentration_units", ""), ("pathway_weights", [])])
def test_androgen_mapping_requires_explicit_units_and_parameter_provenance(field, value):
    arm = illustrative_arm()
    arm["androgen"] = {**androgen_input(), field: value}
    with pytest.raises(ValueError):
        _arm(arm)
