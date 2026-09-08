"""Replayable, conditional pharmacology protocols with separate response ports.

Exact Lindgren delta-g -> caller-supplied retarded kernels -> named signed
ports -> compartment/mediator dynamics -> cell observables. No ASFR mapping
or fitted coefficient is installed. All rates and observation links are input.
Calcium is integrated as amounts with explicit compartment volumes; changing
one channel never deletes another channel. Drug effects act on states/targets,
not on an extra final outcome multiplier.
"""
from __future__ import annotations

from copy import deepcopy
import math
from typing import Mapping

import numpy as np

from berm.modulome._common import finite, nonempty, nonnegative, normalise_ids, unit_interval
from berm.modulome.photostate import (
    CryptochromeIdentity, CryptochromeParameters, FlavinState, LightHistory,
    PhotonEvent, sequential_two_photon_yield,
)
from berm.physics.lindgren_response import (
    metric_perturbation, contract_retarded_response, interaction_contrasts,
)

ROUTE = "berm-intervention-protocol-v1"
COMPARTMENTS = ("local_l", "local_t", "bulk", "er", "mito")
PARAMETER_NAMES = frozenset({
    "diffusion_l", "diffusion_t", "serca", "er_capacity", "er_leak", "er_evoked",
    "mito_uptake", "mito_efflux", "extrusion", "resting_influx",
    "mt2_store_gain", "nav_brake_gain", "nav_brake_decay", "nav_baseline",
    "aa_baseline", "aa_conversion", "aa_clearance", "lte_clearance", "lte_inhibition_k",
    "erk_activation", "erk_decay", "erk_slow_rate", "erk_half",
    "erk_bulk_activation", "erk_bulk_half", "erk_bulk_decay", "erk_bulk_adaptation", "erk_bulk_recovery",
    "arrest_gain", "arrest_half", "arrest_recovery", "growth_baseline",
    "mito_stress_gain", "damage_gain", "repair_rate", "coq_repair_gain",
    "cry_synthesis", "cry_degradation", "fad_free", "fad_kd", "kl001_kd",
    "cry_stabilization_gain", "clock_reference_cry", "clock_period_baseline",
    "clock_period_gain", "clock_amplitude_baseline", "clock_amplitude_gain",
    "drug_photo_rate", "drug_photo_peak_nm", "drug_photo_width_nm", "drug_clearance", "channel_drug_kd",
})
PARAMETER_UNITS = {
    **{k: "volume/s" for k in ("diffusion_l", "diffusion_t", "serca", "mito_uptake", "extrusion")},
    **{k: "1/s" for k in ("er_leak", "er_evoked", "mito_efflux", "nav_brake_decay", "aa_conversion", "aa_clearance", "lte_clearance",
                            "erk_decay", "erk_slow_rate", "erk_bulk_decay", "erk_bulk_adaptation", "erk_bulk_recovery", "arrest_recovery", "repair_rate", "cry_degradation", "drug_clearance")},
    **{k: "concentration" for k in ("er_capacity", "lte_inhibition_k", "erk_half", "erk_bulk_half", "arrest_half", "fad_free", "fad_kd", "kl001_kd", "channel_drug_kd")},
    **{k: "dimensionless" for k in ("mt2_store_gain", "coq_repair_gain", "cry_stabilization_gain")},
    "resting_influx": "amount/s", "nav_brake_gain": "1/concentration", "nav_baseline": "current", "aa_baseline": "concentration/s",
    "erk_activation": "relative ERK/s", "erk_bulk_activation": "relative ERK/s", "arrest_gain": "relative arrest/s", "growth_baseline": "relative growth activity",
    "mito_stress_gain": "stress/concentration", "damage_gain": "damage/stress/s", "cry_synthesis": "protein/s", "clock_reference_cry": "protein",
    "clock_period_baseline": "hour", "clock_period_gain": "hour/protein", "clock_amplitude_baseline": "reporter", "clock_amplitude_gain": "1/protein",
    "drug_photo_rate": "1/photon-dose", "drug_photo_peak_nm": "nm", "drug_photo_width_nm": "nm",
}
CONTROL_NAMES = frozenset({
    "depolarization", "mt2_activation", "serca_available", "aa_synthesis_available",
    "lte_synthesis_available", "lte_infusion", "buffer_total", "buffer_on", "buffer_off",
    "coq_strength", "coq_action_site", "channel_blocks", "channel_knockdowns", "photo_drug_channels", "cry_ligand_available",
    "ryr_available", "cam_brake_available",
})
PORT_UNITS = {"er_release_rate": "1/s", "nav_current": "current",
              "aa_production": "concentration/s", "cry_response": "response/protein"}
STATE_NAMES = frozenset({*COMPARTMENTS, "buffer_l", "buffer_t", "buffer_bulk", "nav_brake", "aa", "lte4", "erk_bulk", "erk_bulk_available",
                         "erk_fast", "erk_slow", "cell_cycle_arrest", "damage", "repair_capacity", "cry_total", "drug_active"})


def _keys(value, names, label):
    if not isinstance(value, Mapping) or set(value) != set(names):
        raise ValueError(f"{label} must contain exactly {', '.join(sorted(names))}")


def _ids(values, label):
    result = normalise_ids(values, label)
    if not result:
        raise ValueError(f"{label} must identify supplied parameters")
    return result


def _positive(label, value):
    result = nonnegative(label, value)
    if result == 0:
        raise ValueError(f"{label} must be positive")
    return result


def _light(events):
    if not isinstance(events, (list, tuple)):
        raise ValueError("light events must be a sequence")
    return tuple(PhotonEvent(**event) for event in events)


def _scheduled(events, offset=0.0):
    """Place ordered episodes on a clock; delays precede each episode."""
    result, cursor = [], offset
    for event in events:
        start = cursor + event.delay_before_s
        result.append((start, start + event.duration_s, event))
        cursor = start + event.duration_s
    return result, cursor


def _prefix_light(schedule, until):
    """A partial episode remains ONE episode when re-evaluating the photocycle."""
    events, end_previous = [], 0.0
    for start, end, event in schedule:
        if start >= until:
            break
        duration = max(0, min(end, until) - start)
        gap = max(0, start - end_previous)
        # Merely splitting one illumination episode must not manufacture a
        # second sequential-photon epoch in the imported discrete photocycle.
        if events and math.isclose(gap, 0, abs_tol=1e-12) and events[-1].wavelength_nm == event.wavelength_nm and events[-1].photon_flux == event.photon_flux:
            previous = events.pop()
            events.append(PhotonEvent(event.wavelength_nm, event.photon_flux,
                                     previous.duration_s + duration, previous.delay_before_s))
        else:
            events.append(PhotonEvent(event.wavelength_nm, event.photon_flux, duration, gap))
        end_previous = min(end, until)
    return tuple(events)


def _interval_light(schedule, start_time, end_time):
    return tuple(PhotonEvent(event.wavelength_nm, event.photon_flux,
                            min(end, end_time) - max(start, start_time))
                 for start, end, event in schedule
                 if min(end, end_time) > max(start, start_time))


def _relax(value, production, loss, dt):
    """Exact update for a nonnegative pool with constant per-step production."""
    value, production, loss = (nonnegative("pool", value), nonnegative("production", production),
                               nonnegative("loss", loss))
    return finite("pool update", value + production * dt if loss == 0 else
                  value * math.exp(-loss * dt) + production * -math.expm1(-loss * dt) / loss)


def _ports(geometry, external, histories):
    """Use the same exact geometry and registered kernels for every arm."""
    delta = metric_perturbation(geometry["background"], external, coupling_scale=geometry["coupling_scale"])
    histories.append(delta)
    outputs, audit = {}, {}
    for port in geometry["ports"]:
        count = len(port["kernel_history"])
        lagged = [histories[-1 - lag] if lag < len(histories) else np.zeros_like(delta)
                  for lag in range(count)]
        response = contract_retarded_response(port["kernel_history"], lagged,
                                               lag_weights=port["lag_weights"])
        value = finite("signed port", port["baseline"] + port["gain"] * response.total)
        outputs[port["id"]] = value
        audit[port["id"]] = {"signed_response": response.total, "port_value": value,
                              "raw_port_value": value, "effective_port_value": value, "intervention_factor": 1.0,
                              "lag_contributions": list(response.lag_contributions),
                              "unit": port["output_unit"]}
    return outputs, {"delta_metric": delta.tolist(), "ports": audit}


def _validated(raw):
    _keys(raw, {"schema_version", "protocol_id", "profile_id", "dt_s", "volumes", "parameters",
                "initial_state", "channels", "geometry", "phases", "intervention",
                "photochemistry", "observation", "provenance", "units", "input_provenance"}, "protocol")
    p = deepcopy(raw)
    if p["schema_version"] != 1 or isinstance(p["schema_version"], bool):
        raise ValueError("schema_version must be 1")
    for key in ("protocol_id", "profile_id", "provenance"):
        nonempty(key, p[key])
    p["dt_s"] = _positive("dt_s", p["dt_s"])
    _keys(p["volumes"], COMPARTMENTS, "volumes")
    p["volumes"] = {k: _positive(f"volume {k}", v) for k, v in p["volumes"].items()}
    _keys(p["parameters"], PARAMETER_NAMES, "parameters")
    _keys(p["units"], {"calcium_amount", "volume", "concentration", "time", "photon_dose", "channel_density"}, "units")
    for name, unit in p["units"].items():
        nonempty(name, unit)
    if p["units"]["time"] != "s":
        raise ValueError("protocol time must be in seconds")
    _keys(p["input_provenance"], {"initial_state", "volumes", "phases", "observation"}, "input_provenance")
    ids, evidence, rates = [], [], {}
    for name, values in p["input_provenance"].items():
        ids.extend(_ids(values, f"{name} parameter_ids"))
    for key, record in p["parameters"].items():
        _keys(record, {"value", "unit", "parameter_id", "basis", "evidence_ids"}, f"parameter {key}")
        rates[key] = nonnegative(key, record["value"])
        if record["unit"] != PARAMETER_UNITS[key]:
            raise ValueError(f"{key} requires unit {PARAMETER_UNITS[key]}; convert values before entering the protocol")
        ids.append(nonempty("parameter_id", record["parameter_id"]))
        if record["basis"] not in {"SYNTHETIC", "ASSUMPTION", "MEASURED", "FITTED_COMPONENT"}:
            raise ValueError("invalid parameter basis")
        evidence.extend(normalise_ids(record["evidence_ids"], "evidence_ids"))
    for key in ("er_capacity", "lte_inhibition_k", "erk_half", "erk_bulk_half", "arrest_half", "fad_kd", "kl001_kd", "drug_photo_width_nm", "channel_drug_kd"):
        _positive(key, rates[key])
    _keys(p["initial_state"], STATE_NAMES, "initial_state")
    p["initial_state"] = {k: nonnegative(k, v) for k, v in p["initial_state"].items()}
    unit_interval("repair_capacity", p["initial_state"]["repair_capacity"])
    unit_interval("erk_bulk_available", p["initial_state"]["erk_bulk_available"])
    if not p["channels"]:
        raise ValueError("channels cannot be empty")
    channel_ids = []
    for channel in p["channels"]:
        _keys(channel, {"id", "family", "compartment", "density", "open_baseline", "open_evoked",
                        "single_channel_flux", "synthesis", "degradation", "parameter_ids"}, "channel")
        channel_ids.append(nonempty("channel id", channel["id"]))
        if channel["family"] not in {"L", "T", "N"} or channel["compartment"] not in {"local_l", "local_t"}:
            raise ValueError("channel family or compartment is unsupported")
        for key in ("density", "single_channel_flux", "synthesis", "degradation"):
            channel[key] = nonnegative(key, channel[key])
        for key in ("open_baseline", "open_evoked"):
            channel[key] = unit_interval(key, channel[key])
        ids.extend(_ids(channel["parameter_ids"], "channel parameter_ids"))
    if len(set(channel_ids)) != len(channel_ids):
        raise ValueError("channel IDs must be unique")
    g = p["geometry"]
    _keys(g, {"background", "coupling_scale", "potential_unit", "coupling_unit", "parameter_ids",
              "prehistory", "ports"}, "geometry")
    if g["prehistory"] != "ZERO_DELTA_METRIC":
        raise ValueError("this protocol requires explicitly declared zero perturbation prehistory")
    nonempty("potential_unit", g["potential_unit"])
    nonempty("coupling_unit", g["coupling_unit"])
    ids.extend(_ids(g["parameter_ids"], "geometry parameter_ids"))
    metric_perturbation(g["background"], [0] * len(g["background"]), coupling_scale=g["coupling_scale"])
    port_ids = []
    if not g["ports"]:
        raise ValueError("at least one explicit response port is required")
    for port in g["ports"]:
        _keys(port, {"id", "kernel_history", "lag_weights", "lag_weight_unit", "response_unit",
                     "output_unit", "baseline", "gain", "parameter_ids", "provenance"}, "port")
        key = nonempty("port id", port["id"])
        allowed = {**PORT_UNITS, **{f"channel_gate:{name}": "probability" for name in channel_ids},
                   **{f"channel_synthesis:{name}": "density/s" for name in channel_ids}}
        if key not in allowed or port["output_unit"] != allowed[key]:
            raise ValueError(f"unknown port or wrong output_unit: {key}")
        port_ids.append(key)
        for name in ("baseline", "gain"):
            port[name] = finite(name, port[name])
        for name in ("response_unit", "lag_weight_unit", "provenance"):
            nonempty(name, port[name])
        ids.extend(_ids(port["parameter_ids"], "port parameter_ids"))
        n = len(g["background"])
        shape = np.asarray(port["kernel_history"]).shape
        if len(shape) != 3 or shape[1:] != (n, n):
            raise ValueError("kernel axes must match the supplied metric dimension")
        if any(nonnegative("lag weight", w) < 0 for w in port["lag_weights"]):
            raise ValueError("invalid lag weight")
        if not any(port["lag_weights"]):
            raise ValueError("lag quadrature must have positive total weight")
        contract_retarded_response(port["kernel_history"], np.zeros(shape), lag_weights=port["lag_weights"])
    if len(set(port_ids)) != len(port_ids):
        raise ValueError("response port IDs must be unique")
    seen_measurement, total_steps, measurement_duration = False, 0, 0.0
    phase_ids = []
    for phase in p["phases"]:
        phase.setdefault("drug_exchange", {"retained_fraction": 1.0, "added_concentration": 0.0})
        _keys(phase, {"id", "role", "duration_s", "external", "controls", "cell_light", "solution_light", "drug_exchange"}, "phase")
        phase_ids.append(nonempty("phase id", phase["id"]))
        if phase["role"] not in {"pretreatment", "measurement"}:
            raise ValueError("invalid phase role")
        if seen_measurement and phase["role"] == "pretreatment":
            raise ValueError("pretreatment must precede measurement")
        seen_measurement |= phase["role"] == "measurement"
        phase["duration_s"] = _positive("duration_s", phase["duration_s"])
        steps = phase["duration_s"] / p["dt_s"]
        if not math.isclose(steps, round(steps), rel_tol=0, abs_tol=1e-9):
            raise ValueError("phase duration must be a whole number of time steps")
        total_steps += round(steps)
        if phase["role"] == "measurement":
            measurement_duration += phase["duration_s"]
        _validate_exchange(phase["drug_exchange"])
        metric_perturbation(g["background"], phase["external"], coupling_scale=g["coupling_scale"])
        _validate_controls(phase["controls"], channel_ids)
        for key in ("cell_light", "solution_light"):
            if _scheduled(_light(phase[key]))[1] > phase["duration_s"] + 1e-12:
                raise ValueError("phase illumination must fit inside its duration")
    if not seen_measurement or total_steps > 2_000_000:
        raise ValueError("protocol needs measurement phases and at most 2,000,000 time steps")
    if len(set(phase_ids)) != len(phase_ids):
        raise ValueError("phase IDs must be unique")
    intervention = p["intervention"]
    intervention.setdefault("phase_overrides", {})
    _keys(intervention, {"controls", "initial_state", "solution_prelight", "parameter_ids", "description", "phase_overrides"}, "intervention")
    if set(intervention["controls"]) - CONTROL_NAMES or set(intervention["initial_state"]) - STATE_NAMES:
        raise ValueError("unknown intervention target")
    for phase in p["phases"]:
        overrides = intervention["phase_overrides"].get(phase["id"], {})
        if set(overrides) - {"controls", "drug_exchange"}:
            raise ValueError("phase intervention must target controls or drug_exchange")
        _validate_controls({**phase["controls"], **intervention["controls"], **overrides.get("controls", {})}, channel_ids)
        if "drug_exchange" in overrides:
            _validate_exchange(overrides["drug_exchange"])
    if set(intervention["phase_overrides"]) - set(phase_ids):
        raise ValueError("intervention phase override must name an existing phase")
    for k, v in intervention["initial_state"].items():
        intervention["initial_state"][k] = nonnegative(k, v)
    if "repair_capacity" in intervention["initial_state"]:
        unit_interval("repair_capacity", intervention["initial_state"]["repair_capacity"])
    if "erk_bulk_available" in intervention["initial_state"]:
        unit_interval("erk_bulk_available", intervention["initial_state"]["erk_bulk_available"])
    _light(intervention["solution_prelight"])
    ids.extend(_ids(intervention["parameter_ids"], "intervention parameter_ids"))
    nonempty("intervention description", intervention["description"])
    photo = p["photochemistry"]
    _keys(photo, {"identity", "parameters", "initial_cell_light"}, "photochemistry")
    identity, photo_parameters = CryptochromeIdentity(**photo["identity"]), CryptochromeParameters(**photo["parameters"])
    if identity.key != photo_parameters.identity_key:
        raise ValueError("photochemistry parameters must match the CRY subtype")
    _light(photo["initial_cell_light"])
    ids.extend(photo_parameters.parameter_ids); evidence.extend(photo_parameters.evidence_ids)
    _keys(p["observation"], {"calcium_unit", "bulk_detection_limit", "bulk_saturation", "early_time_s"}, "observation")
    nonempty("calcium_unit", p["observation"]["calcium_unit"])
    p["observation"]["bulk_detection_limit"] = nonnegative("bulk_detection_limit", p["observation"]["bulk_detection_limit"])
    p["observation"]["bulk_saturation"] = _positive("bulk_saturation", p["observation"]["bulk_saturation"])
    p["observation"]["early_time_s"] = nonnegative("early_time_s", p["observation"]["early_time_s"])
    if p["observation"]["early_time_s"] > measurement_duration:
        raise ValueError("early_time_s must lie within the measurement interval")
    return p, rates, list(dict.fromkeys(ids)), list(dict.fromkeys(evidence))


def _validate_exchange(exchange):
    _keys(exchange, {"retained_fraction", "added_concentration"}, "drug_exchange")
    exchange["retained_fraction"] = unit_interval("retained_fraction", exchange["retained_fraction"])
    exchange["added_concentration"] = nonnegative("added_concentration", exchange["added_concentration"])


def _validate_controls(c, channels):
    _keys(c, CONTROL_NAMES, "controls")
    for key in ("depolarization", "mt2_activation", "serca_available", "aa_synthesis_available",
                "lte_synthesis_available", "coq_strength", "cry_ligand_available", "ryr_available", "cam_brake_available"):
        c[key] = unit_interval(key, c[key])
    for key in ("lte_infusion", "buffer_total", "buffer_on", "buffer_off"):
        c[key] = nonnegative(key, c[key])
    if c["coq_action_site"] not in {"none", "transduction", "redox", "repair"}:
        raise ValueError("choose one CoQ action-site hypothesis")
    if c["coq_action_site"] == "none" and c["coq_strength"] != 0:
        raise ValueError("CoQ strength needs an explicit action-site hypothesis")
    for key in ("channel_blocks", "channel_knockdowns", "photo_drug_channels"):
        if not isinstance(c[key], Mapping) or set(c[key]) - set(channels):
            raise ValueError("channel interventions must name existing channels")
        for name, value in c[key].items():
            c[key][name] = unit_interval(key, value)


def _photo_decay(active, events, k):
    dose = math.fsum(event.dose * math.exp(-0.5 * ((event.wavelength_nm - k["drug_photo_peak_nm"])
                     / k["drug_photo_width_nm"]) ** 2) for event in events)
    return active * math.exp(-k["drug_photo_rate"] * dose)


def run_intervention_protocol(raw: Mapping, *, field_enabled: bool, intervention_enabled: bool) -> dict:
    """Execute one arm, including its actual pretreatment and measurement baseline."""
    if not isinstance(field_enabled, bool) or not isinstance(intervention_enabled, bool):
        raise ValueError("arm flags must be booleans")
    p, k, ids, evidence = _validated(raw)
    dt, volumes = p["dt_s"], p["volumes"]
    s = dict(p["initial_state"])
    if intervention_enabled:
        s.update(p["intervention"]["initial_state"])
        s["drug_active"] = _photo_decay(s["drug_active"], _light(p["intervention"]["solution_prelight"]), k)
    density = {ch["id"]: ch["density"] for ch in p["channels"]}
    history, rows, bridge, elapsed, elapsed_steps = [], [], [], 0.0, 0
    cell_schedule, cell_origin = _scheduled(_light(p["photochemistry"]["initial_cell_light"]))
    identity = CryptochromeIdentity(**p["photochemistry"]["identity"])
    photo_parameters = CryptochromeParameters(**p["photochemistry"]["parameters"])
    baseline = None
    for phase in p["phases"]:
        overrides = p["intervention"]["phase_overrides"].get(phase["id"], {}) if intervention_enabled else {}
        c = {**phase["controls"], **(p["intervention"]["controls"] if intervention_enabled else {}),
             **overrides.get("controls", {})}
        _validate_controls(c, [ch["id"] for ch in p["channels"]])
        exchange = overrides.get("drug_exchange", phase["drug_exchange"])
        s["drug_active"] = finite("drug exchange", s["drug_active"] * exchange["retained_fraction"] + exchange["added_concentration"])
        if phase["role"] == "measurement" and baseline is None:
            baseline = {name: s[name] / volumes[name] for name in COMPARTMENTS}
            baseline.update({"time_s": elapsed, "er_amount": s["er"], "damage": s["damage"]})
        cell_schedule.extend(_scheduled(_light(phase["cell_light"]), cell_origin + elapsed)[0])
        solution_schedule = _scheduled(_light(phase["solution_light"]))[0]
        for step in range(round(phase["duration_s"] / dt)):
            s["drug_active"] = _photo_decay(s["drug_active"],
                _interval_light(solution_schedule, step * dt, (step + 1) * dt), k)
            external = phase["external"] if field_enabled else [0.0] * len(p["geometry"]["background"])
            ports, bridge_row = _ports(p["geometry"], external, history)
            if c["coq_action_site"] == "transduction":
                ports = {name: value * (1 - c["coq_strength"]) for name, value in ports.items()}
                for name, value in ports.items():
                    bridge_row["ports"][name].update(port_value=value, effective_port_value=value,
                                                     intervention_factor=1 - c["coq_strength"])
            bridge.append(bridge_row)
            concentration = {name: s[name] / volumes[name] for name in COMPARTMENTS}
            delta = dict.fromkeys(COMPARTMENTS, 0.0)
            currents = {}
            for ch in p["channels"]:
                name = ch["id"]
                synthesis = nonnegative("channel synthesis", ch["synthesis"] + ports.get(f"channel_synthesis:{name}", 0))
                density[name] = _relax(density[name], synthesis, ch["degradation"], dt)
                opening = unit_interval("channel opening", ch["open_baseline"] + c["depolarization"]
                                        * ch["open_evoked"] + ports.get(f"channel_gate:{name}", 0))
                available = (1 - c["channel_blocks"].get(name, 0)) * (1 - c["channel_knockdowns"].get(name, 0))
                if ch["family"] == "T":
                    available /= 1 + s["lte4"] / k["lte_inhibition_k"]
                # Separate a declared constant block from a concentration-
                # dependent photoactive probe. The latter needs its own Kd.
                occupancy = s["drug_active"] / (k["channel_drug_kd"] + s["drug_active"])
                available *= 1 - c["photo_drug_channels"].get(name, 0) * occupancy
                current = finite("channel influx", density[name] * opening * available * ch["single_channel_flux"])
                currents[name] = current
                delta[ch["compartment"]] += current
            def transfer(source, target, flux):
                delta[source] -= flux
                delta[target] += flux
            for local, rate in (("local_l", "diffusion_l"), ("local_t", "diffusion_t")):
                transfer(local, "bulk", k[rate] * (concentration[local] - concentration["bulk"]))
            evoked_release = c["ryr_available"] * k["er_evoked"] * c["depolarization"] * (1 + k["mt2_store_gain"] * c["mt2_activation"])
            evoked_release_flux = evoked_release * s["er"]
            release_rate = nonnegative("ER release rate", k["er_leak"] + evoked_release + ports.get("er_release_rate", 0))
            release = release_rate * s["er"]
            uptake = k["serca"] * c["serca_available"] * concentration["bulk"] * max(0, 1 - concentration["er"] / k["er_capacity"])
            transfer("er", "bulk", release - uptake)
            transfer("bulk", "mito", k["mito_uptake"] * concentration["bulk"] - k["mito_efflux"] * s["mito"])
            delta["bulk"] += k["resting_influx"] - k["extrusion"] * concentration["bulk"]
            buffer_updates = {}
            for local, bound in (("local_l", "buffer_l"), ("local_t", "buffer_t"), ("bulk", "buffer_bulk")):
                total = c["buffer_total"] * volumes[local]
                if s[bound] > total + 1e-12:
                    raise ValueError("buffer removal requires an explicit bound-calcium washout protocol")
                binding = c["buffer_on"] * concentration[local] * (total - s[bound]) - c["buffer_off"] * s[bound]
                delta[local] -= binding
                buffer_updates[bound] = s[bound] + dt * binding
                if buffer_updates[bound] < -1e-12 or buffer_updates[bound] > total + 1e-12:
                    raise ValueError("buffer kinetics need a smaller dt_s")
            next_amounts = {name: finite("calcium amount", s[name] + dt * delta[name]) for name in COMPARTMENTS}
            if any(value < -1e-12 for value in next_amounts.values()):
                raise ValueError("negative calcium amount; reduce dt_s for the declared kinetics")
            # Only remove floating point noise after validating the domain.
            s.update({key: max(0.0, value) for key, value in next_amounts.items()})
            s.update({key: max(0.0, value) for key, value in buffer_updates.items()})
            s["nav_brake"] = _relax(s["nav_brake"], k["nav_brake_gain"] * c["cam_brake_available"] * c["mt2_activation"]
                                    * evoked_release_flux / volumes["er"], k["nav_brake_decay"], dt)
            aa_prod = nonnegative("AA production", k["aa_baseline"] + ports.get("aa_production", 0)) * c["aa_synthesis_available"]
            lte_prod = k["aa_conversion"] * s["aa"] * c["lte_synthesis_available"] + c["lte_infusion"]
            s["aa"] = _relax(s["aa"], aa_prod, k["aa_clearance"] + k["aa_conversion"] * c["lte_synthesis_available"], dt)
            s["lte4"] = _relax(s["lte4"], lte_prod, k["lte_clearance"], dt)
            local = s["local_l"] / volumes["local_l"]
            erk_drive = k["erk_activation"] * local / (k["erk_half"] + local)
            s["erk_fast"] = _relax(s["erk_fast"], erk_drive, k["erk_decay"], dt)
            s["erk_slow"] = _relax(s["erk_slow"], k["erk_slow_rate"] * s["erk_fast"], k["erk_slow_rate"], dt)
            # A separate, adapting bulk-sensitive early component. Recovery
            # acts between depolarizations; the sustained local branch does
            # not inherit this bulk gate. These are explicit closure rates.
            bulk = s["bulk"] / volumes["bulk"]
            bulk_drive = k["erk_bulk_activation"] * bulk / (k["erk_bulk_half"] + bulk) * c["depolarization"] * s["erk_bulk_available"]
            recovery = k["erk_bulk_recovery"] * (1 - c["depolarization"])
            s["erk_bulk_available"] = _relax(s["erk_bulk_available"], recovery,
                recovery + k["erk_bulk_adaptation"] * c["depolarization"], dt)
            s["erk_bulk"] = _relax(s["erk_bulk"], bulk_drive, k["erk_bulk_decay"], dt)
            local_t = s["local_t"] / volumes["local_t"]
            s["cell_cycle_arrest"] = _relax(s["cell_cycle_arrest"],
                k["arrest_gain"] * local_t / (k["arrest_half"] + local_t), k["arrest_recovery"], dt)
            stress = k["mito_stress_gain"] * s["mito"] / volumes["mito"]
            if c["coq_action_site"] == "redox":
                stress *= 1 - c["coq_strength"]
            repair = k["repair_rate"] * s["repair_capacity"]
            if c["coq_action_site"] == "repair":
                repair *= 1 + k["coq_repair_gain"] * c["coq_strength"]
            s["damage"] = _relax(s["damage"], k["damage_gain"] * stress, repair, dt)
            # Sole damage-production path: no second direct driver -> D term.
            s["drug_active"] = _relax(s["drug_active"], 0, k["drug_clearance"], dt)
            ligand_ratio = c["cry_ligand_available"] * s["drug_active"] / k["kl001_kd"]
            fad_ratio = k["fad_free"] / k["fad_kd"]
            fad_occupancy = fad_ratio / (1 + fad_ratio + ligand_ratio)
            drug_occupancy = ligand_ratio / (1 + fad_ratio + ligand_ratio)
            s["cry_total"] = _relax(s["cry_total"], k["cry_synthesis"], k["cry_degradation"] / (1 + k["cry_stabilization_gain"] * drug_occupancy), dt)
            photo_yield = sequential_two_photon_yield(identity, FlavinState(binding_occupancy=fad_occupancy),
                          LightHistory(_prefix_light(cell_schedule, cell_origin + elapsed + dt),
                                       "protocol-cell-light"), parameters=photo_parameters).sequential_yield
            photo_capacity = s["cry_total"] * photo_yield  # occupancy is already in photo_yield
            cry_delta = s["cry_total"] - k["clock_reference_cry"]
            amplitude_denominator = _positive("clock amplitude denominator", 1 + k["clock_amplitude_gain"] * cry_delta)
            elapsed_steps += 1
            elapsed = elapsed_steps * dt
            rows.append({"time_s": elapsed, "phase": phase["role"], "phase_id": phase["id"],
                **{f"{name}_ca": s[name] / volumes[name] for name in COMPARTMENTS},
                "nav_current": nonnegative("nav current", k["nav_baseline"] + ports.get("nav_current", 0) / (1 + s["nav_brake"])),
                "erk_fast": s["erk_fast"] + s["erk_bulk"], "erk_local_fast": s["erk_fast"],
                "erk_bulk": s["erk_bulk"], "erk_slow": s["erk_slow"], "aa": s["aa"], "lte4": s["lte4"],
                "evoked_er_release_flux": evoked_release_flux, "nav_brake": s["nav_brake"],
                "cell_cycle_arrest": s["cell_cycle_arrest"], "growth_activity": k["growth_baseline"] / (1 + s["cell_cycle_arrest"]),
                "damage": s["damage"], "damage_production": k["damage_gain"] * stress,
                "damage_clearance_rate": repair, "mitochondrial_stress": stress, "drug_active": s["drug_active"],
                "cry_total": s["cry_total"], "fad_occupancy": fad_occupancy, "photo_capacity": photo_capacity,
                "cry_field_response": ports.get("cry_response", 0) * photo_capacity,
                "clock_period": _positive("clock period", k["clock_period_baseline"] + k["clock_period_gain"] * cry_delta),
                "clock_amplitude": k["clock_amplitude_baseline"] / amplitude_denominator,
                "channel_currents": dict(currents), "channel_densities": dict(density)})
    measured = [row for row in rows if row["phase"] == "measurement"]
    calcium_unit = p["observation"]["calcium_unit"]
    def obs(value, unit):
        return {"value": finite("observable", value), "unit": unit}
    peak = max(row["bulk_ca"] for row in measured)
    bulk_increment = peak - baseline["bulk"]
    early_index = min(range(len(measured)), key=lambda i: abs(measured[i]["time_s"] - baseline["time_s"] - p["observation"]["early_time_s"]))
    observables = {
        "resting_bulk_ca": obs(baseline["bulk"], calcium_unit),
        "bulk_ca_peak": obs(peak, calcium_unit), "evoked_bulk_ca_increment": obs(bulk_increment, calcium_unit),
        "local_l_ca_peak": obs(max(r["local_l_ca"] for r in measured), calcium_unit),
        "local_t_ca_peak": obs(max(r["local_t_ca"] for r in measured), calcium_unit),
        "er_ca_final": obs(measured[-1]["er_ca"], calcium_unit),
        "erk_early": obs(measured[early_index]["erk_fast"], "relative ERK"),
        "erk_final": obs(measured[-1]["erk_slow"], "relative ERK"),
        "cell_cycle_arrest_final": obs(s["cell_cycle_arrest"], "relative arrest"),
        "growth_activity_final": obs(measured[-1]["growth_activity"], "relative growth activity"),
        "nav_current_final": obs(measured[-1]["nav_current"], "current"),
        "damage_final": obs(s["damage"], "damage"), "cry_total_final": obs(s["cry_total"], "protein"),
        "photo_capacity_final": obs(measured[-1]["photo_capacity"], "protein"),
        "cry_field_response_final": obs(measured[-1]["cry_field_response"], "response"),
        "clock_period_final": obs(measured[-1]["clock_period"], "hour"),
        "clock_amplitude_final": obs(measured[-1]["clock_amplitude"], "reporter"),
        "drug_active_final": obs(s["drug_active"], "concentration"),
    }
    for name in density:
        observables[f"current:{name}"] = obs(measured[-1]["channel_currents"][name], "amount/s")
        observables[f"density:{name}"] = obs(density[name], "density")
    saturated_peak = min(peak, p["observation"]["bulk_saturation"])
    saturated_baseline = min(baseline["bulk"], p["observation"]["bulk_saturation"])
    observables["bulk_measured_increment"] = {**obs(saturated_peak - saturated_baseline, calcium_unit),
        "detected": abs(saturated_peak - saturated_baseline) >= p["observation"]["bulk_detection_limit"],
        "detection_limit": p["observation"]["bulk_detection_limit"], "saturation": p["observation"]["bulk_saturation"]}
    return {"route": ROUTE, "profile_id": p["profile_id"], "protocol_id": p["protocol_id"],
            "field_enabled": field_enabled, "intervention_enabled": intervention_enabled,
            "baseline": baseline, "observables": observables, "trace": rows,
            "final_state": {**s, "channel_densities": density}, "bridge_trace": bridge,
            "parameter_ids": ids, "evidence_ids": evidence, "calibration_status": "STRUCTURAL_ONLY",
            "operator_form_status": "CONDITIONAL_FORMAL_OPERATOR", "physical_identification_status": "OPEN",
            "closures": {
                "geometry": "Exact metric perturbation under the stated 2025 premise; minimal matter coupling is conditional; kernel, gauge, scale, sign and tissue identification remain caller-supplied/open.",
                "photochemistry": "Quasi-equilibrium factorization: present FAD occupancy multiplies a shared ordered-light redox distribution. This is not a ligand-exchange photocycle and does not identify cellular FAD-displacement kinetics.",
                "clock_outputs": "Synthetic affine period and reciprocal reporter-amplitude projections of CRY abundance; no circadian phase oscillator or empirical fit.",
                "erk_outputs": "Early observation sums local and adapting bulk components; sustained observation projects the local slow state. Mapping these projections to experimental pERK assays remains open.",
                "growth_output": "Optional T-local time-integrating arrest state with reciprocal growth-activity projection; inactive when arrest_gain=0. Not a measured growth curve or fertility mapping.",
                "pool_units": "Calcium and bound buffer states are amounts; concentrations are amount/declared volume. The two local and one bulk buffers share the declared on/off kinetics. Kinetic parameter units and IDs are explicit protocol inputs.",
                "damage_source": "Only mitochondrial stress produces damage. CoQ transduction/redox/repair are mutually exclusive intervention hypotheses."},
            "changes_archived_v17": False, "asfr_mapping": None}


def run_factorial_protocol(raw: Mapping) -> dict:
    """Four matched arms; the same physical kernels and biological rates in each."""
    arms = []
    for name, field, drug in (("sham", False, False), ("field", True, False),
                              ("drug", False, True), ("field_drug", True, True)):
        arms.append({"id": name, **run_intervention_protocol(raw, field_enabled=field, intervention_enabled=drug)})
    contrasts = []
    for key in arms[0]["observables"]:
        values = [arm["observables"][key] for arm in arms]
        if len({value["unit"] for value in values}) != 1:
            raise ValueError("factorial contrasts require the same observable units")
        y0, yf, yd, yfd = (value["value"] for value in values)
        contrasts.append({"endpoint": key, "unit": values[0]["unit"],
            "field_effect_without_drug": finite("field contrast", yf - y0),
            "field_effect_with_drug": finite("intervention field contrast", yfd - yd),
            "interaction": finite("additive interaction", interaction_contrasts(y0, yf, yd, yfd).additive),
            "status": "SYNTHETIC_FOUR_ARM_CONTRAST"})
    return {"arms": arms, "contrasts": contrasts, "route": ROUTE,
            "parameter_ids": arms[0]["parameter_ids"], "evidence_ids": arms[0]["evidence_ids"],
            "calibration_status": "STRUCTURAL_ONLY", "physical_identification_status": "OPEN",
            "changes_archived_v17": False, "asfr_mapping": None}
