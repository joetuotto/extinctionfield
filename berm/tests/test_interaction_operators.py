"""Structural tests: known networks, host loss, provenance and valid domains."""

from dataclasses import replace

import pytest

from berm.interactions import (
    ENDPOINT_CALIBRATED, STRUCTURAL_ONLY, EcologicalState, EncounterEdge,
    InstitutionParameters, InteractionProvenance, SocialNetwork, SocialState,
    advance_ecological_state, advance_institution_stock, advance_social_state,
    social_stability,
)


def provenance(name="test-shape", **kwargs):
    return InteractionProvenance(
        context="Synthetic unit-test coefficients, not empirical estimates",
        parameter_ids=(name,), evidence_ids=(), **kwargs,
    )


def network(weights=((0, 0), (1, 0)), beta=0.5):
    return SocialNetwork(("a", "b"), weights, beta, 1, "day", provenance())


def social_state():
    return SocialState(("a", "b"), (2, 0), 0, "contribution points", provenance("initial"))


def ecological_state(host=10, parasite=2, response=1):
    return EcologicalState(
        "initial", ("host", "parasite"), (host, parasite), (response, 1),
        (("measured_B", 50, "microtesla"),), 0, "day", "individuals", provenance("observed-state"),
    )


def edge():
    return EncounterEdge(
        "host-use", "parasite", "host", 0.01, 1, -1,
        lambda state: state.functional_response[0], provenance("test-encounter-closure"),
    )


def eco_step(state, edges=None, dt=1, deaths=(0, 0.1)):
    return advance_ecological_state(state, (edge(),) if edges is None else edges,
                                    (0, 0), deaths, dt, "next", provenance("test-rates"))


def test_directed_social_impulse_travels_then_decays_without_reinjection():
    first = advance_social_state(social_state(), network(), (0, 0), provenance("input"))
    assert first.direct_contribution == (0, 0)
    assert first.propagated_contribution == (0, 1)
    assert first.state.deviations == (0, 1)
    second = advance_social_state(first.state, network(), (0, 0), provenance("input"))
    assert second.state.deviations == (0, 0)
    assert second.state.step_index == 2


def test_social_constant_input_converges_to_analytic_equilibrium():
    net = network(((0, 1), (1, 0)), 0.5)
    state = replace(social_state(), deviations=(0, 0))
    for _ in range(60):
        state = advance_social_state(state, net, (1, 0), provenance()).state
    # Solve a = 1 + .5 b; b = .5 a.
    assert state.deviations == pytest.approx((4 / 3, 2 / 3))


@pytest.mark.parametrize("beta,expected", [(0.9, True), (1.0, False), (1.1, False), (-1.1, False)])
def test_stability_uses_spectral_radius_including_negative_eigenvalues(beta, expected):
    result = social_stability(network(((0, 1), (1, 0)), beta))
    assert result.spectral_radius == pytest.approx(abs(beta))
    assert result.asymptotically_stable is expected


def test_large_transient_gain_is_not_mistaken_for_asymptotic_instability():
    # Nilpotent directed network: row-sum > 1 but all eigenvalues are zero.
    assert social_stability(network(((0, 10), (0, 0)), 1)).asymptotically_stable


def test_social_preserves_signed_outcomes_and_rejects_node_misalignment():
    result = advance_social_state(social_state(), network(), (-3, 0), provenance())
    assert result.state.deviations == (-3, 1)
    with pytest.raises(ValueError, match="node order"):
        advance_social_state(replace(social_state(), node_ids=("b", "a")), network(), (0, 0), provenance())


def test_component_observation_never_upgrades_composed_hypothesis():
    measured = InteractionProvenance("Measured component only", ("fit",), ("study",), ENDPOINT_CALIBRATED, "OBSERVATION")
    state = replace(social_state(), provenance=measured)
    result = advance_social_state(state, network(), (0, 0), measured).state.provenance
    assert result.calibration_status == STRUCTURAL_ONLY
    assert result.basis == "SYNTHETIC_INFERENCE"
    assert set(result.input_bases) == {"HYPOTHESIS", "OBSERVATION"}
    assert result.evidence_ids == ("study",)
    assert set(result.parameter_ids) == {"fit", "test-shape"}


def test_institution_stock_separates_retention_actions_and_withdrawal():
    coefficients = InstitutionParameters(0.9, 2, (1, 0.5), "actions", "stock", 1, "day", provenance())
    result = advance_institution_stock(10, (2, 4), 1, coefficients, provenance("state"))
    assert (result.retained_stock, result.contribution, result.withdrawal, result.next_stock) == (9, 8, 1, 16)
    decayed = advance_institution_stock(result.next_stock, (0, 0), 0, coefficients, result.provenance)
    assert decayed.next_stock == pytest.approx(14.4)
    with pytest.raises(ValueError, match="next_stock"):
        advance_institution_stock(1, (0, 0), 2, coefficients, provenance())
    with pytest.raises(ValueError, match="non-negative"):
        advance_institution_stock(1, (-1, 0), 0, coefficients, provenance())


def test_host_absence_removes_parasite_recruitment_and_allows_parasite_decline():
    with_host = eco_step(ecological_state())
    no_host = eco_step(ecological_state(host=0))
    assert with_host.encounters[0].successful_encounters == pytest.approx(0.2)
    assert with_host.state.abundance == pytest.approx((9.8, 2))
    assert no_host.encounters[0].successful_encounters == 0
    assert no_host.state.abundance == pytest.approx((0, 1.8))


def test_response_and_context_change_encounters_without_technology_or_species_constants():
    full = eco_step(ecological_state(response=1))
    weakened = eco_step(ecological_state(response=0.25))
    assert weakened.encounters[0].successful_encounters == pytest.approx(full.encounters[0].successful_encounters / 4)
    contextual = replace(edge(), modifier=lambda state: dict((k, v) for k, v, _ in state.environment)["measured_B"] / 50)
    baseline = eco_step(ecological_state(), (contextual,))
    changed = eco_step(replace(ecological_state(), environment=(("measured_B", 25, "microtesla"),)), (contextual,))
    assert changed.encounters[0].successful_encounters == pytest.approx(baseline.encounters[0].successful_encounters / 2)


def test_caller_can_supply_harmful_source_outcome_no_universal_parasite_benefit():
    harmful = replace(edge(), source_yield=-1, target_yield=0)
    result = eco_step(ecological_state(), (harmful,))
    assert result.state.abundance == pytest.approx((10, 1.6))


def test_ecological_edges_use_simultaneous_snapshot_and_count_each_change_once():
    forward = edge()
    reverse = EncounterEdge("reverse", "host", "parasite", 0.02, 0.5, -0.5,
                            lambda state: state.abundance[1] / 2, provenance("reverse"))
    a = eco_step(ecological_state(), (forward, reverse), deaths=(0, 0))
    b = eco_step(ecological_state(), (reverse, forward), deaths=(0, 0))
    assert a.state.abundance == pytest.approx(b.state.abundance)
    assert sum(a.state.abundance) == pytest.approx(12)
    assert a.state.time == 1
    assert a.state.provenance.calibration_status == STRUCTURAL_ONLY


def test_ecological_zero_edges_gives_intrinsic_dynamics():
    result = eco_step(ecological_state(), (), dt=0.5)
    assert result.state.abundance == pytest.approx((10, 1.9))
    assert result.interaction_change == (0, 0)


@pytest.mark.parametrize("bad", [-1, float("nan"), float("inf")])
def test_invalid_encounter_modifier_rejected(bad):
    with pytest.raises(ValueError):
        eco_step(ecological_state(), (replace(edge(), modifier=lambda state: bad),))


def test_infeasible_ecological_step_raises_instead_of_clipping_or_creating_population():
    with pytest.raises(ValueError, match="reduce dt"):
        eco_step(ecological_state(), dt=20, deaths=(1, 1))
    with pytest.raises(ValueError, match="endpoint"):
        eco_step(ecological_state(), (replace(edge(), target="missing"),))
    with pytest.raises(ValueError, match="unique"):
        eco_step(ecological_state(), (edge(), edge()))


def test_coefficients_and_claimed_calibration_require_provenance():
    no_parameters = InteractionProvenance("Unspecified", (), ())
    with pytest.raises(ValueError, match="parameter IDs"):
        replace(network(), provenance=no_parameters)
    with pytest.raises(ValueError, match="parameter and evidence"):
        InteractionProvenance("Not fitted", ("p",), (), ENDPOINT_CALIBRATED)
    with pytest.raises(ValueError, match="square"):
        replace(network(), weights=((0, 1),))
    with pytest.raises(ValueError, match="finite"):
        replace(network(), beta=float("nan"))
