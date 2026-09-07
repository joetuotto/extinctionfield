#!/usr/bin/env python3
"""Export the modulome state model to the website data files.

Every number the modulome figures show is computed here from
``berm.modulome`` rather than typed into the page, so a change in the model
moves the site and a drift between them fails ``tests/test_modulome_site_sync.py``.

Shape-only parameter sets are exported with their parameter ids, so a figure
that illustrates a form can never be read as an estimate from a dataset.
"""

from __future__ import annotations

import json
from pathlib import Path

from berm.modulome import (
    ILLUSTRATIVE_CALCIUM_KINETICS,
    ILLUSTRATIVE_STATE_KINETICS,
    LOCKED_COMPARISON_WINDOW,
    MODULOME_VERSION,
    BiologicalDriver,
    CalciumCompartments,
    CellStateVector,
    CoupledFeedbackLoop,
    CryptochromeIdentity,
    FlavinState,
    PhotonEvent,
    PolarityMachinery,
    PolarityState,
    StateDependentWindow,
    cards_manifest,
    chronic_shift_series,
    compare_windows,
    galvanotaxis_response,
    incremental_response,
    light_history,
    sequential_two_photon_yield,
    simulate_calcium,
    simulate_state_trajectory,
)
from berm.modulome.feedback import POSITIVE_FEEDBACK_IS_NOT_IRREVERSIBILITY
from berm.physics.field_state import SpectralBin

ROOT = Path(__file__).resolve().parents[1]
OUTPUTS = (
    ROOT / "website" / "data" / "modulome-state.json",
    ROOT / "website" / "public" / "data" / "modulome-state.json",
)

STATE_KINETICS = ILLUSTRATIVE_STATE_KINETICS
CALCIUM_KINETICS = ILLUSTRATIVE_CALCIUM_KINETICS


def _round(value: float, digits: int = 5) -> float:
    """Round for the site payload; ``+ 0.0`` keeps a blocked arm at plain zero."""
    return round(float(value), digits) + 0.0


def state_triad_figure() -> dict[str, object]:
    """Readiness, repair and damage over a repeated-exposure schedule."""
    initial = CellStateVector(
        state_id="modulome-demo",
        receptor_readiness=1.0,
        repair_capacity=0.55,
        damage_load=0.0,
        passage_number=8,
        differentiation_state="myotube",
    )
    schedule = (1.0,) * 14 + (0.0,) * 14
    trajectory = simulate_state_trajectory(
        initial, exposure_schedule=schedule, kinetics=STATE_KINETICS
    )
    probe = tuple(
        incremental_response(state, exposure_increment=1.0, kinetics=STATE_KINETICS)
        for state in trajectory
    )

    # Two cells with the same probe response reached by different routes.
    baseline = CellStateVector(state_id="baseline", receptor_readiness=1.0, repair_capacity=0.5)
    repaired = CellStateVector(state_id="repaired", receptor_readiness=1.0, repair_capacity=0.9)
    matched_readiness = (1.0 - STATE_KINETICS.repair_rate * repaired.repair_capacity) / (
        1.0 - STATE_KINETICS.repair_rate * baseline.repair_capacity
    )
    desensitised = CellStateVector(
        state_id="desensitised",
        receptor_readiness=matched_readiness,
        repair_capacity=baseline.repair_capacity,
    )
    shifted = CellStateVector(
        state_id="baseline-shifted",
        receptor_readiness=1.0,
        repair_capacity=baseline.repair_capacity,
        damage_load=0.6,
    )

    def _probe(state: CellStateVector) -> float:
        return incremental_response(state, exposure_increment=1.0, kinetics=STATE_KINETICS)

    return {
        "parameterIds": list(STATE_KINETICS.parameter_ids),
        "calibrationStatus": STATE_KINETICS.calibration_status,
        "exposureSchedule": [_round(value, 3) for value in schedule],
        "series": {
            "receptorReadiness": [_round(s.receptor_readiness) for s in trajectory],
            "repairCapacity": [_round(s.repair_capacity) for s in trajectory],
            "damageLoad": [_round(s.damage_load) for s in trajectory],
            "probeResponse": [_round(value) for value in probe],
        },
        "sameResponseDifferentState": [
            {
                "stateId": state.state_id,
                "receptorReadiness": _round(state.receptor_readiness),
                "repairCapacity": _round(state.repair_capacity),
                "damageLoad": _round(state.damage_load),
                "probeResponse": _round(_probe(state)),
            }
            for state in (baseline, repaired, desensitised, shifted)
        ],
        "discriminatingMeasurements": [
            "absolute_baseline_levels",
            "recovery_curve_after_exposure",
            "challenge_tolerance_at_matched_baseline",
        ],
    }


def calcium_figure() -> dict[str, object]:
    """Intact circulation against the two blocked store arms."""
    exposure = (1.0,) * 20 + (0.0,) * 60
    arms = {
        "intact": CALCIUM_KINETICS,
        "ryrBlocked": CALCIUM_KINETICS.without_ryr_release(),
        "sercaBlocked": CALCIUM_KINETICS.without_serca_uptake(),
        "mcuBlocked": CALCIUM_KINETICS.without_mcu_uptake(),
    }
    traces = {}
    for name, kinetics in arms.items():
        trace = simulate_calcium(
            CalciumCompartments(cytosol=0.05, er_store=1.0),
            kinetics=kinetics,
            exposure=exposure,
            dt_s=0.1,
            receptor_readiness=1.0,
            early_window_s=3.0,
            trace_id=f"modulome-{name}",
        )
        traces[name] = {
            "cytosol": [_round(value, 4) for value in trace.cytosol],
            "erStore": [_round(value, 4) for value in trace.er_store],
            "mitochondrial": [_round(value, 4) for value in trace.mitochondrial],
            "summary": {
                "firstCalciumResponse": _round(trace.summary.first_calcium_response, 4),
                "timeToFirstPeakS": _round(trace.summary.time_to_first_peak_s, 3),
                "storeChange": _round(trace.summary.store_change, 4),
                "mitochondrialResponse": _round(trace.summary.mitochondrial_response, 4),
                "cumulativeStoreCycling": _round(trace.summary.cumulative_store_cycling, 4),
                "lateMembraneCurrentChange": _round(
                    trace.summary.late_membrane_current_change, 4
                ),
            },
        }

    store_states = []
    for label, load in (("loaded", 1.4), ("reference", 1.0), ("depleted", 0.3)):
        trace = simulate_calcium(
            CalciumCompartments(cytosol=0.05, er_store=load),
            kinetics=CALCIUM_KINETICS,
            exposure=exposure,
            dt_s=0.1,
            early_window_s=3.0,
            trace_id=f"store-{label}",
        )
        store_states.append(
            {
                "label": label,
                "erLoad": load,
                "firstCalciumResponse": _round(trace.summary.first_calcium_response, 4),
                "lateMembraneCurrentChange": _round(
                    trace.summary.late_membrane_current_change, 4
                ),
            }
        )

    return {
        "parameterIds": list(CALCIUM_KINETICS.parameter_ids),
        "calibrationStatus": CALCIUM_KINETICS.calibration_status,
        "dtSeconds": 0.1,
        "exposureSteps": len([value for value in exposure if value > 0.0]),
        "timesSeconds": [_round(index * 0.1, 3) for index in range(len(exposure) + 1)],
        "arms": traces,
        "sameChannelDifferentStore": store_states,
    }


def _driver() -> BiologicalDriver:
    """A biological driver spectrum: named by the driver, not by a technology."""
    centres = [10.0 + 2.0 * index for index in range(21)]
    peak, width = 27.5, 6.0
    bins = tuple(
        SpectralBin(
            frequency_hz=frequency,
            power_density=round(
                1.0 * pow(2.718281828459045, -0.5 * ((frequency - peak) / width) ** 2), 6
            ),
            bandwidth_hz=2.0,
        )
        for frequency in centres
    )
    return BiologicalDriver(
        driver_id="calcium-store-cycling-envelope",
        bins=bins,
        provenance="declared candidate driver envelope for the modulome figure",
    )


def window_figure() -> dict[str, object]:
    """The locked window against the state-dependent candidate."""
    window = StateDependentWindow(
        window_id="state-dependent-candidate",
        centre_hz=25.2,
        sigma_hz=2.0,
        parameter_ids=("modulome.window.illustrative-shape-v1",),
        state_coefficients={"er_calcium_load": 0.18, "resting_membrane_potential": 0.10},
        width_coefficients={"membrane_order": -0.40},
        reference_measurements={
            "er_calcium_load": 1.0,
            "resting_membrane_potential": 0.0,
            "membrane_order": 0.5,
        },
    )
    states = [
        CellStateVector(
            state_id="loaded-store",
            measurements={"er_calcium_load": 1.4, "membrane_order": 0.65},
        ),
        CellStateVector(
            state_id="reference",
            measurements={"er_calcium_load": 1.0, "membrane_order": 0.5},
        ),
        CellStateVector(
            state_id="depleted-store",
            measurements={"er_calcium_load": 0.4, "membrane_order": 0.35},
        ),
    ]
    driver = _driver()
    comparisons = compare_windows(window, states, driver)

    frequencies = [_round(6.0 + 0.5 * index, 2) for index in range(101)]
    curves = []
    for state, comparison in zip(states, comparisons):
        resolved = window.resolve(state)
        curves.append(
            {
                "stateId": state.state_id,
                "centreHz": _round(resolved.center_hz, 4),
                "sigmaHz": _round(resolved.sigma_hz, 4),
                "responsePower": _round(comparison.candidate_response_power, 5),
                "ratioToLocked": _round(comparison.ratio, 5),
                "weights": [_round(resolved.weight(f), 5) for f in frequencies],
                "measurements": {
                    key: _round(value, 4) for key, value in state.measurements.items()
                },
            }
        )

    return {
        "parameterIds": list(window.parameter_ids),
        "calibrationStatus": window.calibration_status,
        "frequenciesHz": frequencies,
        "lockedWindow": {
            "windowId": LOCKED_COMPARISON_WINDOW.window_id,
            "centreHz": LOCKED_COMPARISON_WINDOW.center_hz,
            "sigmaHz": LOCKED_COMPARISON_WINDOW.sigma_hz,
            "responsePower": _round(comparisons[0].locked_response_power, 5),
            "weights": [
                _round(LOCKED_COMPARISON_WINDOW.weight(f), 5) for f in frequencies
            ],
        },
        "driver": {
            "driverId": driver.driver_id,
            "provenance": driver.provenance,
            "totalPower": _round(driver.total_power, 5),
            "bins": [
                {
                    "frequencyHz": item.frequency_hz,
                    "powerDensity": _round(item.power_density, 5),
                    "bandwidthHz": item.bandwidth_hz,
                }
                for item in driver.bins
            ],
        },
        "candidates": curves,
    }


def photon_sequence_figure() -> dict[str, object]:
    """Equal total dose, different order and delay."""
    identity = CryptochromeIdentity(subtype="CRY1", species="human", compartment="nucleus")
    flavin = FlavinState()
    delays = [_round(0.0 + 0.25 * index, 3) for index in range(33)]
    forward, reverse = [], []
    for delay in delays:
        blue_then_green = light_history(
            (
                PhotonEvent(wavelength_nm=450.0, photon_flux=1.0, duration_s=1.5),
                PhotonEvent(
                    wavelength_nm=540.0, photon_flux=1.0, duration_s=1.5, delay_before_s=delay
                ),
            ),
            history_id=f"blue-green-{delay}",
        )
        green_then_blue = blue_then_green.reversed_order()
        forward.append(
            _round(sequential_two_photon_yield(identity, flavin, blue_then_green).sequential_yield)
        )
        reverse.append(
            _round(sequential_two_photon_yield(identity, flavin, green_then_blue).sequential_yield)
        )
    reference = light_history(
        (
            PhotonEvent(wavelength_nm=450.0, photon_flux=1.0, duration_s=1.5),
            PhotonEvent(wavelength_nm=540.0, photon_flux=1.0, duration_s=1.5),
        )
    )
    return {
        "identityKey": identity.key,
        "parameterIds": list(
            sequential_two_photon_yield(identity, flavin, reference).parameter_ids
        ),
        "totalDose": _round(reference.total_dose, 4),
        "delaysSeconds": delays,
        "blueThenGreen": forward,
        "greenThenBlue": reverse,
        "registeredSubtypes": ["human:CRY1", "human:CRY2", "erithacus_rubecula:CRY1"],
    }


def polarity_figure() -> dict[str, object]:
    """Directedness and speed across field magnitude, per intervention arm."""
    machinery = PolarityMachinery(
        machinery_id="galvanotaxis-reference", evidence_ids=("nakajima2015", "zhao2006_wound_ef")
    )
    state = PolarityState(state_id="polarised", intrinsic_motility=0.9)
    fields = [0.0, 25.0, 50.0, 100.0, 200.0, 400.0, 800.0]
    arms = {
        "intact": machinery,
        "kcnj15Silenced": machinery.silenced("kcnj15"),
        "polyamineDepleted": machinery.silenced("polyamines"),
        "pi3kGammaLoss": machinery.silenced("pi3k_gamma"),
        "ptenLoss": machinery.silenced("pten"),
    }
    series = {}
    for name, arm in arms.items():
        responses = [
            galvanotaxis_response(arm, state, field_mv_per_mm=field) for field in fields
        ]
        series[name] = {
            "directedness": [_round(item.directedness) for item in responses],
            "migrationSpeed": [_round(item.migration_speed) for item in responses],
            "directionalError": [_round(item.directional_error) for item in responses],
        }
    return {
        "fieldsMvPerMm": fields,
        "screenFieldMvPerMm": 200.0,
        "arms": series,
    }


def feedback_figure() -> dict[str, object]:
    """Stability margin and recovery time along a chronic-exposure axis."""
    loop = CoupledFeedbackLoop(
        loop_id="barrier-hormone",
        a=1.0,
        b=0.20,
        c=1.0,
        d=0.20,
        r_x=0.50,
        r_y=0.40,
        x_label="barrier_disturbance",
        y_label="hormonal_disturbance",
        parameter_ids=("modulome.feedback.illustrative-shape-v1",),
    )
    steps = 13
    gains = tuple(1.0 + 0.20 * index for index in range(steps))
    recoveries = tuple(1.0 - 0.03 * index for index in range(steps))
    series = chronic_shift_series(loop, gain_factors=gains, recovery_factors=recoveries)
    return {
        "parameterIds": list(loop.parameter_ids),
        "base": {
            "a": loop.a,
            "b": loop.b,
            "c": loop.c,
            "d": loop.d,
            "rX": loop.r_x,
            "rY": loop.r_y,
            "xLabel": loop.x_label,
            "yLabel": loop.y_label,
        },
        "gainFactors": [_round(value, 3) for value in gains],
        "recoveryFactors": [_round(value, 3) for value in recoveries],
        "series": [
            {
                "mutualGainProduct": _round(item.mutual_gain_product),
                "recoveryProduct": _round(item.recovery_product),
                "stabilityMargin": _round(item.stability_margin),
                "isStable": item.is_stable,
                "slowestRecoveryTime": (
                    None
                    if item.slowest_recovery_time is None
                    else _round(item.slowest_recovery_time, 4)
                ),
            }
            for item in series
        ],
        "irreversibilityNote": POSITIVE_FEEDBACK_IS_NOT_IRREVERSIBILITY,
    }


def build_manifest() -> dict[str, object]:
    manifest = cards_manifest()
    return {
        "modulomeVersion": MODULOME_VERSION,
        "generatedBy": "berm/export_modulome.py",
        "cardFields": manifest["cardFields"],
        "cards": manifest["cards"],
        "figures": {
            "stateTriad": state_triad_figure(),
            "calcium": calcium_figure(),
            "window": window_figure(),
            "photonSequence": photon_sequence_figure(),
            "polarity": polarity_figure(),
            "feedback": feedback_figure(),
        },
    }


def main() -> None:
    payload = json.dumps(build_manifest(), ensure_ascii=False, indent=2) + "\n"
    for path in OUTPUTS:
        path.parent.mkdir(parents=True, exist_ok=True)
        path.write_text(payload, encoding="utf-8")
        print(f"wrote {path.relative_to(ROOT)}")


if __name__ == "__main__":
    main()
