"""Contract tests for the modulome state extension."""

from __future__ import annotations

import math

import pytest

from berm.modulome import (
    ILLUSTRATIVE_CALCIUM_KINETICS,
    ILLUSTRATIVE_STATE_KINETICS,
    LOCKED_COMPARISON_WINDOW,
    MECHANISM_CARDS,
    STATE_MEASUREMENT_VOCABULARY,
    BiologicalDriver,
    CalciumCompartments,
    CellStateVector,
    CoupledFeedbackLoop,
    CryptochromeIdentity,
    FlavinRedoxState,
    FlavinState,
    MembraneMachinery,
    PhotonEvent,
    PolarityMachinery,
    PolarityState,
    StateDependentWindow,
    TissueEnvironment,
    TransferMode,
    attribute_reduced_response,
    bystander_transfer,
    cards_for_layer,
    cards_manifest,
    chronic_shift_series,
    compare_windows,
    galvanotaxis_response,
    immune_functional_response,
    incremental_response,
    irreversibility_requirements,
    light_history,
    require_subtype_parameters,
    sequential_two_photon_yield,
    simulate_calcium,
    simulate_state_trajectory,
    transfer_machinery,
    validate_mechanism_cards,
)
from berm.modulome.cards import CARD_FIELDS
from berm.physics.field_state import SpectralBin


# --- state: three quantities, separately attributable ------------------------


def test_state_rejects_a_measurement_outside_the_vocabulary():
    with pytest.raises(ValueError, match="not a registered cell-state measurement"):
        CellStateVector(state_id="s", measurements={"publication_year": 2026.0})


def test_state_measurements_are_grouped_by_coordinate():
    state = CellStateVector(
        state_id="s",
        measurements={"autophagic_flux": 1.2, "channel_current_density": 0.8, "dna_damage": 0.1},
    )
    assert set(state.measurements_for("repair_capacity")) == {"autophagic_flux"}
    assert set(state.measurements_for("receptor_readiness")) == {"channel_current_density"}
    assert set(state.measurements_for("damage_load")) == {"dna_damage"}


def test_declared_history_replaces_the_publication_year():
    without = CellStateVector(state_id="s")
    with_history = CellStateVector(
        state_id="s", passage_number=12, differentiation_state="myotube"
    )
    assert not without.history_is_declared
    assert with_history.history_is_declared


def test_strengthened_repair_and_weakened_receptor_are_separated():
    kinetics = ILLUSTRATIVE_STATE_KINETICS
    baseline = CellStateVector(state_id="baseline", receptor_readiness=1.0, repair_capacity=0.5)
    repaired = CellStateVector(state_id="repaired", receptor_readiness=1.0, repair_capacity=0.9)
    # Readiness that reproduces the repaired cell's probe response exactly.
    matched_readiness = (1.0 - kinetics.repair_rate * repaired.repair_capacity) / (
        1.0 - kinetics.repair_rate * baseline.repair_capacity
    )
    desensitised = CellStateVector(
        state_id="desensitised",
        receptor_readiness=matched_readiness,
        repair_capacity=baseline.repair_capacity,
    )

    via_repair = attribute_reduced_response(
        baseline, repaired, probe_exposure=1.0, kinetics=kinetics
    )
    via_receptor = attribute_reduced_response(
        baseline, desensitised, probe_exposure=1.0, kinetics=kinetics
    )

    # The probe response alone cannot tell the two cells apart at all.
    assert via_repair.response_after == pytest.approx(via_receptor.response_after)
    assert via_repair.reduced and via_receptor.reduced
    assert via_repair.dominant_explanation == "repair_strengthened"
    assert via_receptor.dominant_explanation == "receptor_weakened"
    assert (
        via_repair.discriminating_measurements == via_receptor.discriminating_measurements
    )


def test_repeated_exposure_builds_repair_capacity_and_bounded_damage():
    initial = CellStateVector(state_id="c2c12", receptor_readiness=1.0, repair_capacity=0.55)
    trajectory = simulate_state_trajectory(
        initial, exposure_schedule=(1.0,) * 12, kinetics=ILLUSTRATIVE_STATE_KINETICS
    )
    assert trajectory[-1].repair_capacity > initial.repair_capacity
    assert trajectory[-1].damage_load > 0.0
    assert incremental_response(
        trajectory[-1], exposure_increment=1.0, kinetics=ILLUSTRATIVE_STATE_KINETICS
    ) < incremental_response(
        initial, exposure_increment=1.0, kinetics=ILLUSTRATIVE_STATE_KINETICS
    )
    assert len(trajectory[-1].prior_exposure_ids) == 12


# --- membrane: transferable machinery ---------------------------------------


def _donor() -> MembraneMachinery:
    return MembraneMachinery(
        machinery_id="c2c12-donor",
        channel_density=0.9,
        complex_integrity=0.9,
        localisation_fidelity=0.9,
        lipid_order=0.9,
        channel_ids=("TRPC1",),
        evidence_ids=("kurth2020",),
    )


def test_channel_count_alone_is_not_receptor_competence():
    intact = _donor()
    delocalised = MembraneMachinery(
        machinery_id="delocalised",
        channel_density=0.9,
        complex_integrity=0.9,
        localisation_fidelity=0.0,
        lipid_order=0.9,
        channel_ids=("TRPC1",),
    )
    assert delocalised.channel_density == intact.channel_density
    assert delocalised.receptor_competence == 0.0


def test_silenced_donor_transfers_no_competence_and_mode_stays_visible():
    donor = _donor()
    silenced = donor.without_channel("TRPC1")
    recipient = MembraneMachinery(
        machinery_id="recipient-silenced",
        channel_density=0.0,
        complex_integrity=0.0,
        localisation_fidelity=0.8,
        lipid_order=0.8,
    )

    restored = transfer_machinery(
        donor, recipient, mode=TransferMode.PREPARED_VESICLE, delivered_fraction=0.5
    )
    null_arm = transfer_machinery(
        silenced, recipient, mode=TransferMode.PREPARED_VESICLE, delivered_fraction=0.5
    )
    tissue_hypothesis = transfer_machinery(
        donor, recipient, mode=TransferMode.NATIVE_TISSUE, delivered_fraction=0.5
    )

    assert restored.restored and 0.0 < restored.recovered_fraction < 1.0
    assert not null_arm.restored
    assert restored.is_observed_design
    assert not tissue_hypothesis.is_observed_design


# --- calcium: three phases, bounded by the store interventions --------------


def _calcium_trace(kinetics, er_store=1.0, readiness=1.0):
    return simulate_calcium(
        CalciumCompartments(cytosol=0.05, er_store=er_store),
        kinetics=kinetics,
        exposure=(1.0,) * 20 + (0.0,) * 40,
        dt_s=0.1,
        receptor_readiness=readiness,
        early_window_s=3.0,
        trace_id="test",
    )


def test_blocking_either_store_arm_removes_the_late_current_change():
    intact = _calcium_trace(ILLUSTRATIVE_CALCIUM_KINETICS)
    no_release = _calcium_trace(ILLUSTRATIVE_CALCIUM_KINETICS.without_ryr_release())
    no_uptake = _calcium_trace(ILLUSTRATIVE_CALCIUM_KINETICS.without_serca_uptake())

    assert intact.summary.late_membrane_current_change < 0.0
    assert no_release.summary.late_membrane_current_change == 0.0
    assert no_uptake.summary.late_membrane_current_change == 0.0
    # The first calcium response survives both interventions.
    assert no_release.summary.first_calcium_response > 0.0
    assert no_uptake.summary.first_calcium_response > 0.0


def test_same_channel_expression_different_state_gives_a_different_response():
    full_store = _calcium_trace(ILLUSTRATIVE_CALCIUM_KINETICS, er_store=1.2)
    depleted_store = _calcium_trace(ILLUSTRATIVE_CALCIUM_KINETICS, er_store=0.2)
    assert full_store.summary.first_calcium_response > depleted_store.summary.first_calcium_response
    assert full_store.summary.cumulative_store_cycling > depleted_store.summary.cumulative_store_cycling


def test_mitochondrial_uptake_is_reported_separately():
    intact = _calcium_trace(ILLUSTRATIVE_CALCIUM_KINETICS)
    no_mcu = _calcium_trace(ILLUSTRATIVE_CALCIUM_KINETICS.without_mcu_uptake())
    assert intact.summary.mitochondrial_response > 0.0
    assert no_mcu.summary.mitochondrial_response == 0.0


# --- photostate: order and delay, per subtype --------------------------------


def test_no_shared_cryptochrome_coefficient():
    with pytest.raises(KeyError, match="no registered photochemistry"):
        require_subtype_parameters(CryptochromeIdentity(subtype="CRY4", species="gallus"))
    assert require_subtype_parameters(
        CryptochromeIdentity(subtype="CRY1", species="human")
    ).identity_key == "human:CRY1"


def test_same_total_dose_different_order_gives_a_different_state():
    identity = CryptochromeIdentity(subtype="CRY1", species="human", compartment="nucleus")
    flavin = FlavinState(redox_state=FlavinRedoxState.OXIDISED, binding_occupancy=1.0)
    blue_then_green = light_history(
        (
            PhotonEvent(wavelength_nm=450.0, photon_flux=1.0, duration_s=1.0),
            PhotonEvent(wavelength_nm=540.0, photon_flux=1.0, duration_s=1.0, delay_before_s=0.2),
        ),
        history_id="blue-then-green",
    )
    green_then_blue = blue_then_green.reversed_order()

    forward = sequential_two_photon_yield(identity, flavin, blue_then_green)
    reverse = sequential_two_photon_yield(identity, flavin, green_then_blue)

    assert blue_then_green.total_dose == pytest.approx(green_then_blue.total_dose)
    assert forward.sequential_yield > reverse.sequential_yield
    assert forward.order_sensitive


def test_a_longer_delay_lowers_the_sequential_yield():
    identity = CryptochromeIdentity(subtype="CRY1", species="human")
    flavin = FlavinState()
    short = light_history(
        (
            PhotonEvent(wavelength_nm=450.0, photon_flux=1.0, duration_s=1.0),
            PhotonEvent(wavelength_nm=540.0, photon_flux=1.0, duration_s=1.0, delay_before_s=0.1),
        ),
        history_id="short-delay",
    )
    long = light_history(
        (
            PhotonEvent(wavelength_nm=450.0, photon_flux=1.0, duration_s=1.0),
            PhotonEvent(wavelength_nm=540.0, photon_flux=1.0, duration_s=1.0, delay_before_s=8.0),
        ),
        history_id="long-delay",
    )
    assert (
        sequential_two_photon_yield(identity, flavin, short).sequential_yield
        > sequential_two_photon_yield(identity, flavin, long).sequential_yield
    )


def test_flavin_occupancy_scales_the_response():
    identity = CryptochromeIdentity(subtype="CRY2", species="human")
    history = light_history(
        (
            PhotonEvent(wavelength_nm=450.0, photon_flux=1.0, duration_s=2.0),
            PhotonEvent(wavelength_nm=530.0, photon_flux=1.0, duration_s=2.0),
        )
    )
    full = sequential_two_photon_yield(identity, FlavinState(binding_occupancy=1.0), history)
    half = sequential_two_photon_yield(identity, FlavinState(binding_occupancy=0.5), history)
    assert half.sequential_yield == pytest.approx(full.sequential_yield * 0.5)


# --- polarity: alive, motile, misdirected ------------------------------------


def test_silencing_the_sensor_removes_direction_but_not_motility():
    machinery = PolarityMachinery(machinery_id="cornea", evidence_ids=("nakajima2015",))
    state = PolarityState(state_id="polarised", intrinsic_motility=0.9)

    intact = galvanotaxis_response(machinery, state, field_mv_per_mm=200.0)
    silenced = galvanotaxis_response(
        machinery.silenced("kcnj15"), state, field_mv_per_mm=200.0
    )

    assert intact.directedness > 0.0
    assert silenced.directedness == 0.0
    assert silenced.migration_speed == intact.migration_speed
    assert silenced.viable_but_misdirected


def test_polyamine_and_polarity_arms_change_the_response():
    machinery = PolarityMachinery(machinery_id="cornea")
    state = PolarityState(state_id="polarised")
    intact = galvanotaxis_response(machinery, state, field_mv_per_mm=200.0)
    for component in ("polyamines", "pi3k_gamma", "pten"):
        arm = galvanotaxis_response(
            machinery.silenced(component), state, field_mv_per_mm=200.0
        )
        assert arm.directedness < intact.directedness


def test_directedness_saturates_with_field_magnitude():
    machinery = PolarityMachinery(machinery_id="cornea")
    state = PolarityState(state_id="polarised")
    weak = galvanotaxis_response(machinery, state, field_mv_per_mm=10.0)
    strong = galvanotaxis_response(machinery, state, field_mv_per_mm=2000.0)
    assert weak.directedness < strong.directedness < 1.0


# --- tissue: message and function --------------------------------------------


def test_medium_can_carry_a_protective_effect_to_unexposed_cells():
    environment = TissueEnvironment(
        environment_id="sh-sy5y", cell_density=2.0, evidence_ids=("zeni2021",)
    )
    response = bystander_transfer(
        environment,
        donor_response=1.0,
        transfer_efficiency=0.6,
        recipient_gain=-0.4,
        functional_endpoint="oxidative DNA damage after a chemical challenge",
    )
    assert response.direction == "protective"
    assert response.recipient_change < 0.0


def test_an_immune_signal_requires_a_named_function():
    environment = TissueEnvironment(environment_id="macrophage", cell_density=1.0)
    with pytest.raises(ValueError, match="functional_endpoint"):
        immune_functional_response(
            environment,
            channel_id="TRPC1",
            channel_activity=1.0,
            signalling_gain=1.0,
            functional_gain=1.0,
            functional_endpoint="   ",
            exposure=1.0,
        )


def test_blocking_the_channel_removes_signal_and_function_together():
    environment = TissueEnvironment(environment_id="macrophage", cell_density=1.0)
    kwargs = dict(
        channel_id="TRPC1",
        signalling_gain=1.0,
        functional_gain=0.8,
        functional_endpoint="phagocytosis of co-cultured target cells",
        exposure=1.0,
    )
    intact = immune_functional_response(environment, channel_activity=1.0, **kwargs)
    blocked = immune_functional_response(environment, channel_activity=0.0, **kwargs)
    assert intact.signalling_change > 0.0 and intact.functional_change > 0.0
    assert blocked.signalling_change == 0.0 and blocked.functional_change == 0.0
    assert blocked.abolished_by_channel_block


# --- window: the state enters, the technology name does not ------------------


def _driver() -> BiologicalDriver:
    return BiologicalDriver(
        driver_id="calcium-store-cycling-envelope",
        bins=tuple(
            SpectralBin(frequency_hz=f, power_density=1.0, bandwidth_hz=1.0)
            for f in (10.0, 20.0, 25.0, 30.0, 40.0)
        ),
        provenance="synthetic driver spectrum for the window contract test",
    )


def _window() -> StateDependentWindow:
    return StateDependentWindow(
        window_id="state-dependent-candidate",
        centre_hz=25.2,
        sigma_hz=2.0,
        parameter_ids=("modulome.window.illustrative-shape-v1",),
        state_coefficients={"er_calcium_load": 0.20},
        width_coefficients={"membrane_order": -0.30},
        reference_measurements={"er_calcium_load": 1.0, "membrane_order": 0.5},
    )


def test_a_window_coefficient_cannot_be_keyed_on_a_technology():
    with pytest.raises(ValueError, match="never on a technology"):
        StateDependentWindow(
            window_id="bad",
            centre_hz=25.2,
            sigma_hz=2.0,
            parameter_ids=("p",),
            state_coefficients={"5g_nr": 1.0},
        )


def test_the_locked_window_is_unchanged_and_state_independent():
    driver = _driver()
    states = [
        CellStateVector(state_id="loaded", measurements={"er_calcium_load": 1.4}),
        CellStateVector(state_id="depleted", measurements={"er_calcium_load": 0.4}),
    ]
    comparisons = compare_windows(_window(), states, driver)

    assert LOCKED_COMPARISON_WINDOW.center_hz == 25.2
    assert comparisons[0].locked_response_power == pytest.approx(
        comparisons[1].locked_response_power
    )
    assert comparisons[0].candidate_centre_hz != comparisons[1].candidate_centre_hz
    assert comparisons[0].candidate_response_power != comparisons[1].candidate_response_power


def test_every_state_coefficient_key_is_a_registered_measurement():
    window = _window()
    for key in (*window.state_coefficients, *window.width_coefficients):
        assert key in STATE_MEASUREMENT_VOCABULARY


# --- feedback: stability, slowing, and what irreversibility would need -------


def _loop(b: float, d: float, r_x: float = 0.5, r_y: float = 0.4) -> CoupledFeedbackLoop:
    return CoupledFeedbackLoop(
        loop_id="barrier-hormone", a=1.0, b=b, c=1.0, d=d, r_x=r_x, r_y=r_y
    )


def test_stability_condition_is_the_product_comparison():
    stable = _loop(b=0.2, d=0.3).stability()
    unstable = _loop(b=0.8, d=0.8).stability()

    assert stable.is_stable
    assert stable.mutual_gain_product < stable.recovery_product
    assert not unstable.is_stable
    assert unstable.mutual_gain_product > unstable.recovery_product


def test_recovery_slows_as_the_loop_approaches_the_boundary():
    far = _loop(b=0.1, d=0.1).stability()
    near = _loop(b=0.44, d=0.44).stability()
    assert far.slowest_recovery_time is not None and near.slowest_recovery_time is not None
    assert near.slowest_recovery_time > far.slowest_recovery_time
    assert near.stability_margin < far.stability_margin


def test_chronic_shift_series_crosses_the_boundary_once():
    series = chronic_shift_series(
        _loop(b=0.2, d=0.2),
        gain_factors=(1.0, 1.5, 2.0, 2.5, 3.0, 3.5),
        recovery_factors=(1.0, 0.95, 0.9, 0.85, 0.8, 0.75),
    )
    assert series[0].is_stable
    assert not series[-1].is_stable
    margins = [item.stability_margin for item in series]
    assert margins == sorted(margins, reverse=True)


def test_equilibrium_is_defined_only_inside_the_stable_region():
    stable = _loop(b=0.2, d=0.3).equilibrium(1.0)
    unstable = _loop(b=0.8, d=0.8).equilibrium(1.0)
    assert stable.exists and math.isfinite(stable.x_star)
    assert not unstable.exists


def test_positive_feedback_alone_does_not_establish_irreversibility():
    requirements = irreversibility_requirements(_loop(b=0.2, d=0.3))
    assert any("stable region" in item for item in requirements)
    assert any("nonlinearity" in item for item in requirements)


# --- cards: one structure, every card bounded --------------------------------


def test_every_card_carries_all_eight_fields_in_both_languages():
    for card in validate_mechanism_cards():
        for name in CARD_FIELDS:
            value = getattr(card, name)
            assert value.en and value.fi
        assert card.reference_ids
        assert card.layers


def test_cards_cover_the_named_extension_areas():
    ids = {card.card_id for card in MECHANISM_CARDS}
    assert {
        "card.membrane-machinery-transfer",
        "card.calcium-compartment-cycle",
        "card.adaptation-memory",
        "card.flavin-state-and-light-history",
        "card.directional-information",
        "card.medium-borne-message",
        "card.immune-functional-endpoint",
    } <= ids


def test_cards_are_indexable_by_layer_and_serialisable():
    assert cards_for_layer(2)
    manifest = cards_manifest()
    assert manifest["cardFields"] == list(CARD_FIELDS)
    assert len(manifest["cards"]) == len(MECHANISM_CARDS)
    assert all(card["title"]["fi"] for card in manifest["cards"])


def test_a_card_must_name_at_least_one_source():
    card = MECHANISM_CARDS[0]
    with pytest.raises(ValueError, match="reference_ids"):
        type(card)(
            card_id="card.no-source",
            title=card.title,
            exposure=card.exposure,
            receptor=card.receptor,
            baseline_state=card.baseline_state,
            proximal_response=card.proximal_response,
            propagation=card.propagation,
            memory=card.memory,
            functional_consequence=card.functional_consequence,
            mechanism_bounding=card.mechanism_bounding,
            layers=(1,),
            reference_ids=(),
            epistemic_level="E",
        )
