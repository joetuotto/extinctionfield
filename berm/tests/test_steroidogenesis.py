"""Mass balance, matched hormonal context and non-inference of hidden damage."""

from dataclasses import replace
import json

import pytest

from berm.biology.causal_registry import CAUSAL_NODES
from berm.biology.cross_pathway_synthesis import EVIDENCE_SYNTHESIS_CLUSTERS
from berm.biology.reproductive_state import CoupleReproductiveState, FemaleReproductiveState, MaleReproductiveState
from berm.modulome.state import CellStateVector, GlutathionePool, ILLUSTRATIVE_STATE_KINETICS, advance_cell_state
from berm.modulome.steroidogenesis import (
    SteroidogenicContext, SteroidogenesisObservation,
    compare_steroidogenic_observations, steroidogenesis_structure,
)


def pool(gsh=100, gssg=5, **kwargs):
    return GlutathionePool(gsh, gssg, "umol/L", "cytosol", ("illustrative-assay",), basis="illustrative", **kwargs)


def observation(identifier, *, output=10, reserve=None, mode="LH_stimulated", challenge=None):
    return SteroidogenesisObservation(
        observation_id=identifier,
        context=SteroidogenicContext("illustrative Leydig assay", mode, "matched-protocol", challenge),
        hormone="progesterone", output_per_viable_cell=output,
        output_units="pmol/(10^6 viable cells*h)", compartment="culture medium",
        source_ids=("illustrative-assay",), evidence_kind="illustrative", study_design="illustrative",
        cell_state=None if reserve is None else CellStateVector(identifier, glutathione_pool=reserve),
    )


def compare(reference, target):
    return compare_steroidogenic_observations(reference, target, comparison_id="matched-comparison",
        output_margin=0.1, comparison_source_ids=("illustrative-matched-assay-margin",))


def test_oxidation_changes_ratio_and_preserves_glutathione_equivalents():
    before, after = pool(100, 5), pool(80, 15)
    assert before.equivalent_pool == after.equivalent_pool == 110
    assert before.ratio == 20
    assert after.ratio == pytest.approx(80 / 15)


def test_equal_ratios_do_not_imply_equal_absolute_reserves():
    full, depleted = pool(100, 5), pool(50, 2.5)
    assert full.ratio == depleted.ratio
    assert depleted.equivalent_pool == full.equivalent_pool / 2


def test_pool_records_units_compartment_and_sources_without_repair_mapping():
    state = CellStateVector("measured-state", glutathione_pool=pool())
    measurements = state.measurements_for("repair_capacity")
    assert measurements["glutathione_gsh"] == 100
    assert measurements["glutathione_gssg"] == 5
    assert measurements["glutathione_equivalent_pool"] == 110
    assert measurements["glutathione_ratio"] == 20
    assert state.repair_capacity == 1  # No invented reserve-to-capacity coefficient.
    assert state.damage_load == 0
    assert state.glutathione_pool.as_dict()["compartment"] == "cytosol"
    assert state.glutathione_pool.as_dict()["sourceIds"] == ["illustrative-assay"]


def test_zero_disulfide_stays_json_safe_and_does_not_invent_ratio():
    state = CellStateVector("reduced", glutathione_pool=pool(10, 0))
    assert state.glutathione_pool.ratio is None
    assert "glutathione_ratio" not in state.measurements
    json.dumps(state.glutathione_pool.as_dict(), allow_nan=False)


def test_existing_state_update_retains_or_explicitly_replaces_measured_pool():
    initial = CellStateVector("initial", glutathione_pool=pool())
    retained = advance_cell_state(initial, exposure_increment=0.2, kinetics=ILLUSTRATIVE_STATE_KINETICS)
    assert retained.glutathione_pool == initial.glutathione_pool
    assert retained.measurements["glutathione_equivalent_pool"] == 110
    updated = advance_cell_state(initial, exposure_increment=0.2, kinetics=ILLUSTRATIVE_STATE_KINETICS,
                                 glutathione_pool=pool(50, 2.5))
    assert updated.measurements["glutathione_equivalent_pool"] == 55
    assert updated.measurements["glutathione_ratio"] == 20


def test_declared_reserve_loss_can_coexist_with_preserved_stimulated_output():
    result = compare(observation("control", reserve=pool()), observation("depleted", reserve=pool(20, 1)))
    assert result["context"]["stimulationMode"] == "LH_stimulated"
    assert result["context"]["oxidantChallengeId"] is None
    assert result["withinDeclaredOutputMargin"] is True
    assert result["reserveLossWithOutputWithinMargin"] is True
    assert result["freePoolChange"] == -88
    assert result["damageInference"] == "not_inferred"
    assert result["fertilityTransfer"] is None


def test_normal_output_without_pool_measurement_does_not_become_hidden_damage():
    result = compare(observation("control"), observation("target"))
    assert result["withinDeclaredOutputMargin"] is True
    assert result["reserveStatus"] == "reserve_not_measured"
    assert result["freePoolChange"] is None
    assert result["reserveLossWithOutputWithinMargin"] is False
    assert result["damageInference"] == "not_inferred"


def test_basal_and_stimulated_changes_remain_separate_signed_observations():
    basal = compare(observation("basal-control", mode="basal", output=5),
                    observation("basal-treated", mode="basal", output=8))
    stimulated = compare(observation("stim-control", output=15), observation("stim-treated", output=10))
    assert basal["outputChangePerViableCell"] == 3
    assert stimulated["outputChangePerViableCell"] == -5
    with pytest.raises(ValueError, match="compare basal and stimulated"):
        compare(observation("basal", mode="basal"), observation("stimulated"))


def test_challenge_is_a_matching_condition_and_missing_output_stays_open():
    with pytest.raises(ValueError, match="challenge context"):
        compare(observation("none", challenge=None), observation("challenge", challenge="tBuOOH-protocol"))
    result = compare(observation("control", output=None), observation("target", output=None))
    assert result["outputChangePerViableCell"] is None
    assert result["withinDeclaredOutputMargin"] is None


def test_direct_local_steroidogenesis_edge_is_reciprocal_and_has_registered_synthesis():
    nodes = {node.id: node for node in CAUSAL_NODES}
    assert "MALE_STEROIDOGENESIS" in nodes["A_VGCC_ROS"].children
    assert "A_VGCC_ROS" in nodes["MALE_STEROIDOGENESIS"].parents
    assert "HPA_HPG" in nodes["MALE_STEROIDOGENESIS"].parents
    cluster = next(item for item in EVIDENCE_SYNTHESIS_CLUSTERS if item.id == "calcium-redox-steroidogenesis")
    assert cluster.claim_id == "claim.steroidogenesis.component-convergence"
    assert len(cluster.relation_ids) == 8


def test_structure_has_open_values_and_retains_empirical_conditions_without_forecast_mutation():
    pair = CoupleReproductiveState(MaleReproductiveState(), FemaleReproductiveState())
    before = pair.biological_capacity
    structure = steroidogenesis_structure()
    assert all(value is None for value in structure["openParameters"].values())
    assert structure["outputMappingPolicy"]["newCapacityMultiplier"] is None
    assert structure["outputMappingPolicy"]["historicalForecastsChanged"] is False
    assert structure["conditionalDirections"][0]["context"] == "MA-10; LH-stimulated progesterone"
    assert structure["conditionalDirections"][1]["basal"].startswith("increased")
    assert structure["conditionalDirections"][1]["LHStimulated"].startswith("decreased")
    assert pair.biological_capacity == before


@pytest.mark.parametrize("action", [
    lambda: pool(-1, 1),
    lambda: pool(float("nan"), 1),
    lambda: replace(pool(), units="relative peak intensity"),
    lambda: replace(pool(), source_ids=()),
    lambda: replace(pool(), compartment=""),
    lambda: CellStateVector("missing-units", measurements={"glutathione_gsh": 3}),
    lambda: CellStateVector("conflicting-mass", measurements={"glutathione_equivalent_pool": 9}, glutathione_pool=pool()),
    lambda: CellStateVector("conflicting-ratio", measurements={"glutathione_ratio": 3}, glutathione_pool=pool()),
    lambda: CellStateVector("undefined-ratio", measurements={"glutathione_ratio": 0}, glutathione_pool=pool(1, 0)),
    lambda: SteroidogenicContext("system", "basal", "protocol", None, 100, "ng/mL"),
    lambda: SteroidogenicContext("system", "LH_stimulated", "protocol", None, 100, None),
    lambda: replace(observation("serum"), output_units="ng/mL"),
    lambda: replace(observation("zero-cells"), viable_cell_count=0),
    lambda: compare(observation("gsh-a", reserve=pool()), observation("gsh-b", reserve=replace(pool(), compartment="mitochondria"))),
    lambda: compare(observation("progesterone"), replace(observation("testosterone"), hormone="testosterone")),
])
def test_invalid_or_incompatible_measurements_fail_explicitly(action):
    with pytest.raises(ValueError):
        action()
