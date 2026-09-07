"""Versioned JSON entry point: conditional modulome -> organ -> couple -> ASFR.

The payload supplies a local biological drive and named scenario coefficients.
This route cannot estimate an environmental dose or calibrate Lindgren's L2
bridge. The archived national v17 route remains a separate calculation.
"""
from __future__ import annotations

from dataclasses import asdict, replace
import math
from typing import Mapping

from berm.architecture import MODULOME_ASFR_ROUTE_ID
from berm.biology.coordination import HormoneReceptivityState
from berm.biology.reproductive_state import CoupleReproductiveState, FemaleReproductiveState, MaleReproductiveState
from berm.data.wpp import AGE_GROUPS
from berm.modulome._common import STRUCTURAL_ONLY, finite, nonempty, nonnegative, normalise_ids
from berm.modulome.calcium import CalciumCompartments, CalciumKinetics
from berm.biology.androgen_capacity import HormoneBindingState, ReceptorPathway
from berm.modulome.conditional_inputs import AndrogenOrganInput, retarded_driver_from_mapping
from berm.modulome.membrane import MembraneMachinery
from berm.modulome.state import CellStateVector, StateKinetics
from berm.modulome.reproductive_bridge import (
    CellProtocol, FunctionalEndpointMapping, ImplantationSupport, LocalHormoneSource, couple_from_modulome,
)
from berm.modulome.window import BiologicalDriver, StateDependentWindow, compare_windows
from berm.physics.field_state import SpectralBin
from berm.outcomes.fieldstate_asfr import AgeSpecificConditionalInput, project_conditional_asfr
from berm.outcomes.reproductive_waiting import CoupleWaitingState, WaitingHorizonComparison

SCHEMA_VERSION = 1


def _record(value, name):
    if not isinstance(value, Mapping):
        raise ValueError(f"{name} must be an object")
    return dict(value)


def _keys(value, allowed, name):
    unknown = set(value) - set(allowed)
    if unknown:
        raise ValueError(f"unknown {name} fields: {', '.join(sorted(unknown))}")


def _arm(raw):
    raw = _record(raw, "arm")
    _keys(raw, {"protocol", "endpoint", "base_couple", "hormone_timing", "timing_parameter_ids",
                "timing_evidence_ids", "implantation", "spectral", "androgen", "retarded_response"}, "arm")
    config = _record(raw["protocol"], "protocol")
    for key, cls in (("initial_state", CellStateVector), ("membrane", MembraneMachinery),
                     ("initial_calcium", CalciumCompartments), ("state_kinetics", StateKinetics),
                     ("calcium_kinetics", CalciumKinetics)):
        config[key] = cls(**_record(config[key], key))
    retarded_result = None
    if "retarded_response" in raw:
        if "driver" in config or "spectral" in raw:
            raise ValueError("retarded_response supplies the driver; omit protocol.driver and spectral")
        retarded_result = retarded_driver_from_mapping(raw["retarded_response"])
        if retarded_result["transfer"]["driver_units"] != config["driver_units"]:
            raise ValueError("retarded transfer driver_units must match protocol.driver_units")
        config["driver"] = retarded_result["driver"]
        # Validate collections before concatenation so strings cannot become IDs.
        config["coupling_parameter_ids"] = tuple(dict.fromkeys((
            *normalise_ids(config["coupling_parameter_ids"], "coupling_parameter_ids"),
            *retarded_result["parameter_ids"])))
    protocol = CellProtocol(**config)
    spectral_result = None
    if "spectral" in raw:
        spectrum = _record(raw["spectral"], "spectral")
        _keys(spectrum, {"driver_id", "bins", "provenance", "evidence_ids", "window",
                         "b0_tesla", "amplitude_gain", "parameter_ids"}, "spectral")
        driver = BiologicalDriver(spectrum["driver_id"], tuple(SpectralBin(**row) for row in spectrum["bins"]),
                                  spectrum["provenance"], evidence_ids=tuple(spectrum.get("evidence_ids", ())))
        window = StateDependentWindow(**spectrum["window"])
        comparison = compare_windows(window, (protocol.initial_state,), driver,
                                     b0_tesla=spectrum["b0_tesla"])[0]
        gain = nonnegative("amplitude_gain", spectrum["amplitude_gain"])
        if isinstance(spectrum["parameter_ids"], (str, bytes)):
            raise ValueError("spectral parameter_ids must be a collection")
        ids = tuple(spectrum["parameter_ids"])
        if not ids or any(not isinstance(value, str) or not value.strip() for value in ids):
            raise ValueError("spectral parameter_ids must identify the power-to-drive conversion")
        amplitude = finite("spectral drive amplitude", gain * math.sqrt(comparison.candidate_response_power))
        protocol = replace(protocol, driver=tuple(amplitude * value for value in protocol.driver),
                           coupling_parameter_ids=tuple(dict.fromkeys((*protocol.coupling_parameter_ids,
                                                                      *window.parameter_ids, *ids))))
        spectral_result = {**asdict(comparison), "amplitude_gain": gain,
                           "driver_amplitude": amplitude, "b0_tesla": spectrum["b0_tesla"],
                           "window_evaluation": "supplied measured initial state; not inferred from a technology label"}
    base = _record(raw.get("base_couple", {}), "base_couple")
    _keys(base, {"male", "female", "shared_household_biological_context", "pair_id", "field_state_status", "provenance"}, "base_couple")
    couple = CoupleReproductiveState(male=MaleReproductiveState(**base.pop("male", {})),
                                    female=FemaleReproductiveState(**base.pop("female", {})), **base)
    timing = HormoneReceptivityState(**raw["hormone_timing"]) if "hormone_timing" in raw else None
    implantation = None
    if "implantation" in raw:
        value = dict(raw["implantation"])
        value["sources"] = tuple(LocalHormoneSource(**source) for source in value["sources"])
        implantation = ImplantationSupport(**value)
    mapped, result = couple_from_modulome(
        base_couple=couple, protocol=protocol, endpoint=FunctionalEndpointMapping(**raw["endpoint"]),
        hormone_timing=timing, timing_parameter_ids=raw.get("timing_parameter_ids", ()),
        timing_evidence_ids=raw.get("timing_evidence_ids", ()), implantation=implantation)
    if "androgen" in raw:
        value = _record(raw["androgen"], "androgen")
        value["binding"] = HormoneBindingState(**_record(value["binding"], "binding"))
        value["pathways"] = tuple(ReceptorPathway(**_record(pathway, "pathway")) for pathway in value["pathways"])
        mapped, androgen = AndrogenOrganInput(**value).apply(mapped)
        result.update({"androgen": androgen, "conception_capacity": mapped.conception_capacity,
                       "live_birth_support": mapped.live_birth_support,
                       "biological_capacity": mapped.biological_capacity})
        result["parameter_ids"] = list(dict.fromkeys((*result["parameter_ids"], *androgen["parameter_ids"])))
        result["evidence_ids"] = list(dict.fromkeys((*result["evidence_ids"], *androgen["evidence_ids"])))
    if retarded_result is not None:
        result["retarded_response"] = retarded_result
        result["evidence_ids"] = list(dict.fromkeys((*result["evidence_ids"], *retarded_result["evidence_ids"])))
    if spectral_result is not None:
        result["spectral_window"] = spectral_result
        result["evidence_ids"] = list(dict.fromkeys((*result["evidence_ids"], *driver.evidence_ids, *window.evidence_ids)))
    return mapped, result


def project_modulome_scenario(payload: Mapping) -> dict:
    """Run the versioned, replayable scenario. Unknown fields fail explicitly."""
    raw = _record(payload, "scenario")
    _keys(raw, {"schema_version", "scenario_id", "geography_id", "year", "reference_year",
                "age_groups", "input_provenance", "comparison_country"}, "scenario")
    if raw.get("schema_version") != SCHEMA_VERSION or isinstance(raw.get("schema_version"), bool):
        raise ValueError("schema_version must be 1")
    scenario_id = nonempty("scenario_id", raw["scenario_id"])
    groups, runs, ids, evidence = [], [], [], []
    for row in raw["age_groups"]:
        row = _record(row, "age group")
        _keys(row, {"age_group", "reference_asfr", "asfr_source_id", "reference", "target",
                    "waiting", "demographic_ratios"}, "age group")
        reference, ref_run = _arm(row["reference"])
        target, target_run = _arm(row["target"])
        waiting = None
        if "waiting" in row:
            wait = _record(row["waiting"], "waiting")
            _keys(wait, {"reference_strata", "target_strata", "cycles", "parameter_ids", "evidence_ids", "starting_parity"}, "waiting")
            def strata(label, couple):
                return tuple(CoupleWaitingState(couple, **stratum) for stratum in wait[f"{label}_strata"])
            waiting = WaitingHorizonComparison(strata("reference", reference), strata("target", target),
                wait["cycles"], wait["parameter_ids"], wait.get("starting_parity", 0), wait.get("evidence_ids", ()))
            ids.extend(waiting.parameter_ids)
            evidence.extend(waiting.evidence_ids)
        ratios = _record(row.get("demographic_ratios", {}), "demographic_ratios")
        _keys(ratios, {"demand_opportunity", "tempo", "art_live_birth_delivery"}, "demographic_ratios")
        groups.append(AgeSpecificConditionalInput(
            age_group=row["age_group"], reference_asfr=row["reference_asfr"],
            asfr_source_id=row["asfr_source_id"], reference_couple=reference, target_couple=target,
            waiting_comparison=waiting,
            target_demand_opportunity=ratios.get("demand_opportunity", 1),
            target_tempo=ratios.get("tempo", 1),
            target_art_live_birth_delivery=ratios.get("art_live_birth_delivery", 1)))
        runs.append({"age_group": row["age_group"], "reference": ref_run, "target": target_run})
        for result in (ref_run, target_run):
            ids.extend(result["parameter_ids"])
            evidence.extend(result["evidence_ids"])
    projection = project_conditional_asfr(geography_id=raw["geography_id"], year=raw["year"],
        reference_year=raw["reference_year"], groups=groups, input_provenance=raw.get("input_provenance", {}))
    result = projection.as_dict()
    result.update({"schema_version": SCHEMA_VERSION, "scenario_id": scenario_id,
                   "route": MODULOME_ASFR_ROUTE_ID, "model_version": MODULOME_ASFR_ROUTE_ID,
                   "calibration_status": STRUCTURAL_ONLY, "l2_bridge_status": "OPEN",
                   "forecast_calibrated": False, "changes_archived_v17": False,
                   "parameter_ids": list(dict.fromkeys(ids)), "evidence_ids": list(dict.fromkeys(evidence)),
                   "mechanism_runs": runs,
                   "implemented_chain": "supplied local biological driver -> membrane/state/Ca -> named functional organ gate -> paired capacity or waiting ratio -> conditional ASFR -> TFR",
                   "interpretation": "Conditional scenario with explicit coefficients, not an environmental-dose estimate or a country forecast. The L2 geometry-to-driver bridge remains open. Imported biological evidence constrains its own components only."})
    return result
