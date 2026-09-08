"""Behavior, opportunity, capacity and care remain separate in BERM's closure."""

from dataclasses import replace
import importlib.util
import json
from pathlib import Path

import pytest

from berm.architecture import architecture_manifest
from berm.biology.causal_registry import CAUSAL_NODES, get_causal_node
from berm.biology.reproductive_regulation import (
    CareRecipientAmount, CaregivingAllocation, ConditionalReproductiveBranch,
    RegulationObservation, ReproductiveRegulationProfile,
    compose_reproductive_realization, reproductive_regulation_structure,
)
from berm.civilization.epistapege import EPISTAPEGE_TRANSITIONS
from berm.interactions import InteractionProvenance


ROOT = Path(__file__).resolve().parents[2]


def provenance(*, calibrated=False):
    return InteractionProvenance(
        context="synthetic common stratum and one observation window",
        parameter_ids=("parameter.test.conditional-probabilities",),
        evidence_ids=("evidence.test.fixture",),
        basis="HYPOTHESIS",
        calibration_status="ENDPOINT_CALIBRATED" if calibrated else "STRUCTURAL_ONLY",
    )


def profile(**updates):
    values = dict(
        context_id="stratum.window.1", biological_state_id="state.1",
        social_context_id="social.1", learning_history_id="learning.1",
        species="Homo sapiens", sex="named couple stratum",
        life_stage="reproductive age", observation_window="one declared cycle",
        observations=(RegulationObservation("sexual_motivation", "desire", 2, "score"),),
        provenance=provenance(),
    )
    values.update(updates)
    return ReproductiveRegulationProfile(**values)


def branch(condition, encounter=0.8, conception=0.4, delivery=0.9, **updates):
    values = dict(
        context_id="stratum.window.1", intention_condition=condition,
        encounter_probability=encounter, conception_given_encounter=conception,
        live_birth_given_conception=delivery, provenance=provenance(),
    )
    values.update(updates)
    return ConditionalReproductiveBranch(**values)


def test_no_intention_does_not_remove_unplanned_conceptions_or_births():
    result = compose_reproductive_realization(
        profile(), intention_probability=0,
        planned=branch("intention"), unplanned=branch("no_intention", 0.2, 0.3, 0.8),
    )
    assert result.planned_encounter_probability == 0
    assert result.unplanned_encounter_probability == pytest.approx(0.2)
    assert result.conception_probability == pytest.approx(0.06)
    assert result.live_birth_probability == pytest.approx(0.048)


def test_chain_rule_preserves_different_capacity_and_delivery_in_each_stratum():
    result = compose_reproductive_realization(
        profile(), intention_probability=0.25,
        planned=branch("intention", 0.8, 0.4, 0.9),
        unplanned=branch("no_intention", 0.2, 0.3, 0.8),
    )
    assert result.encounter_probability == pytest.approx(0.25 * 0.8 + 0.75 * 0.2)
    assert result.planned_live_birth_probability == pytest.approx(0.25 * 0.8 * 0.4 * 0.9)
    assert result.unplanned_live_birth_probability == pytest.approx(0.75 * 0.2 * 0.3 * 0.8)
    assert 0 <= result.live_birth_probability <= result.conception_probability <= result.encounter_probability <= 1


def test_external_opportunity_and_biological_capacity_are_distinct_gates():
    closed = compose_reproductive_realization(
        profile(), intention_probability=1,
        planned=branch("intention", encounter=0, conception=1, delivery=1),
        unplanned=branch("no_intention"),
    )
    capacity_limited = compose_reproductive_realization(
        profile(), intention_probability=1,
        planned=branch("intention", encounter=1, conception=0, delivery=1),
        unplanned=branch("no_intention"),
    )
    assert closed.encounter_probability == 0
    assert capacity_limited.encounter_probability == 1
    assert closed.live_birth_probability == capacity_limited.live_birth_probability == 0


def test_care_can_increase_without_imputing_displacement_or_changing_birth_probability():
    care = CaregivingAllocation((CareRecipientAmount("own-child", 3), CareRecipientAmount("other-child", 1)), "hours/day")
    more_care = CaregivingAllocation((CareRecipientAmount("own-child", 3), CareRecipientAmount("other-child", 2)), "hours/day")
    assert care.total_amount == 4
    assert more_care.total_amount == 5
    options = dict(intention_probability=0.2, planned=branch("intention"), unplanned=branch("no_intention"))
    first = compose_reproductive_realization(profile(caregiving=care), **options)
    second = compose_reproductive_realization(profile(caregiving=more_care), **options)
    assert first == second
    # A profile is a set of measured outputs, not eight imputed syndrome scores.
    assert len(profile(caregiving=care).observations) == 1


def test_calibrated_components_cannot_upgrade_composition_or_close_l2():
    result = compose_reproductive_realization(
        profile(provenance=provenance(calibrated=True)), intention_probability=0.3,
        planned=branch("intention", provenance=provenance(calibrated=True)),
        unplanned=branch("no_intention", provenance=provenance(calibrated=True)),
    )
    assert result.provenance.basis == "SYNTHETIC_INFERENCE"
    assert result.provenance.calibration_status == "STRUCTURAL_ONLY"
    assert result.provenance.l2_bridge_status == "OPEN"
    assert result.provenance.evidence_ids == ("evidence.test.fixture",)
    with pytest.raises(ValueError, match="upstream L2"):
        replace(provenance(), l2_bridge_status="CALIBRATED")


@pytest.mark.parametrize("invalid", [-0.1, 1.1, float("nan"), float("inf"), True])
def test_invalid_probabilities_are_rejected_without_clipping(invalid):
    with pytest.raises(ValueError):
        branch("intention", encounter=invalid)
    with pytest.raises(ValueError):
        compose_reproductive_realization(
            profile(), intention_probability=invalid,
            planned=branch("intention"), unplanned=branch("no_intention"),
        )


def test_mismatched_contexts_or_nonexclusive_intention_branches_fail():
    for invalid in (
        branch("no_intention", context_id="other-population-or-window"),
        branch("intention"),
    ):
        with pytest.raises(ValueError):
            compose_reproductive_realization(
                profile(), intention_probability=0.5,
                planned=branch("intention"), unplanned=invalid,
            )


def test_profile_requires_explicit_context_and_meaningful_measurements():
    with pytest.raises(ValueError):
        profile(biological_state_id="")
    with pytest.raises(ValueError):
        RegulationObservation("syndrome-score", "score", 0.4, "normalized")
    with pytest.raises(ValueError):
        profile(observations=(RegulationObservation("stress", "cortisol", 1, "nmol/L"),) * 2)
    with pytest.raises(ValueError):
        CaregivingAllocation((CareRecipientAmount("child", 1), CareRecipientAmount("child", 2)), "hours")
    with pytest.raises(ValueError):
        CareRecipientAmount("child", -1)
    with pytest.raises(ValueError):
        CaregivingAllocation((CareRecipientAmount("child", 1),), "")


def test_canonical_graph_has_parallel_realization_capacity_and_care_without_epistapege_cycle():
    nodes = {node.id: node for node in CAUSAL_NODES}
    assert nodes["DEMAND_OPPORTUNITY"].parents == (
        "INDIVIDUAL_BEHAVIORAL_RESPONSE", "REPRODUCTIVE_OPPORTUNITY",
    )
    assert nodes["REPRODUCTIVE_OPPORTUNITY"].parents == ()
    assert "DEMAND_OPPORTUNITY" in nodes["INDIVIDUAL_BEHAVIORAL_RESPONSE"].children
    assert {"INDIVIDUAL_BEHAVIORAL_RESPONSE", "CAREGIVING_ALLOCATION"} <= set(nodes["HORMONE_TARGET_RESPONSE"].children)
    assert {"COUPLE_FECUNDABILITY", "DEMAND_OPPORTUNITY"} <= set(nodes["ASFR"].parents)
    assert nodes["CAREGIVING_ALLOCATION"].children == ()  # next-time feedback is separate
    assert nodes["INSTITUTIONAL_MODEL_REUSE"].children == ()
    assert EPISTAPEGE_TRANSITIONS[-1].target == "INSTITUTIONAL_MODEL_REUSE"
    assert get_causal_node("demand/opportunity").id == "DEMAND_OPPORTUNITY"

    visited, pending = set(), set()
    def visit(node_id):
        assert node_id not in pending, f"same-time cycle at {node_id}"
        if node_id in visited:
            return
        pending.add(node_id)
        for child in nodes[node_id].children:
            assert node_id in nodes[child].parents
            visit(child)
        pending.remove(node_id)
        visited.add(node_id)
    for node_id in nodes:
        visit(node_id)


def test_structure_matches_architecture_and_only_declares_existing_causal_links():
    structure = reproductive_regulation_structure()
    assert architecture_manifest()["reproductiveRegulation"] == structure
    assert len(structure["axes"]) == 8
    assert structure["realizationPolicy"]["preservesUnplannedPregnancies"] is True
    assert structure["realizationPolicy"]["independenceAssumed"] is False
    assert structure["predictionPolicy"] == {
        "newTfrCoefficient": False, "modifiesArchivedForecasts": False,
        "multipliesBehavioralFactorV21": False, "localConditionalCompositionOnly": True,
    }
    for route in structure["branches"].values():
        for left, right in zip(route, route[1:]):
            assert right in get_causal_node(left).children
    structure["axes"].clear()
    assert len(reproductive_regulation_structure()["axes"]) == 8


def test_graph_export_is_idempotent_and_preserves_existing_edge_identifiers():
    spec = importlib.util.spec_from_file_location("regulation_graph_export", ROOT / "berm/export_causal_graph.py")
    exporter = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(exporter)
    existing = json.loads((ROOT / "website/data/causal-graph.json").read_text())
    generated = exporter.build_graph(existing)
    assert generated == existing
    assert exporter.build_graph(generated) == generated
    old_edge_ids = {(edge["from"], edge["to"]): edge["id"] for edge in existing["edges"]}
    assert {(edge["from"], edge["to"]): edge["id"] for edge in generated["edges"]} == old_edge_ids
    assert "REPRODUCTIVE_OPPORTUNITY" in generated["ui_groups"]["demographic-inputs"]["contains"]
    assert "CAREGIVING_ALLOCATION" in generated["ui_groups"]["civilization"]["contains"]
    for node_id in ("DEMAND_OPPORTUNITY", "REPRODUCTIVE_OPPORTUNITY", "CAREGIVING_ALLOCATION"):
        assert set(generated["nodes"][node_id]["label"]) == {"en", "fi", "ja", "fr", "ko"}
