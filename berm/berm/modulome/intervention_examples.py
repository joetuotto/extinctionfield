"""Explicit synthetic inputs for mechanistically discriminating protocol examples.

These numbers demonstrate mathematical behavior, not the doses, effect sizes,
time constants or uncertainty of the cited experiments. They cannot be fitted
by treating four arms as four separately adjustable response gains.
"""
from __future__ import annotations

from copy import deepcopy

from berm.modulome.intervention_protocol import PARAMETER_NAMES, STATE_NAMES


def _parameter(name, value, unit):
    return {"value": value, "unit": unit, "parameter_id": f"illustrative.intervention.{name}.v1",
            "basis": "SYNTHETIC", "evidence_ids": []}


def port(name, gain, unit):
    return {"id": name, "kernel_history": [[[1.0, 0.0, 0.0, 0.0], [0.0, 0.0, 0.0, 0.0], [0.0, 0.0, 0.0, 0.0], [0.0, 0.0, 0.0, 0.0]]],
            "lag_weights": [1.0], "lag_weight_unit": "dimensionless quadrature",
            "response_unit": "synthetic response", "output_unit": unit,
            "baseline": 0.0, "gain": gain,
            "parameter_ids": [f"illustrative.intervention.transfer.{name}.v1"],
            "provenance": "Synthetic signed affine transfer; kernel, sign and physical scale are caller assumptions."}


def controls():
    return {"depolarization": 0.0, "mt2_activation": 0.0, "serca_available": 1.0,
            "aa_synthesis_available": 1.0, "lte_synthesis_available": 1.0, "lte_infusion": 0.0,
            "buffer_total": 0.0, "buffer_on": 0.0, "buffer_off": 0.0,
            "coq_strength": 0.0, "coq_action_site": "none", "channel_blocks": {},
            "channel_knockdowns": {}, "photo_drug_channels": {}, "cry_ligand_available": 0.0,
            "ryr_available": 1.0, "cam_brake_available": 1.0}


def base_protocol(profile_id, protocol_id=None):
    """A complete, replayable input, including every otherwise inactive rate."""
    rates = {
        "diffusion_l": (.02, "volume/s"), "diffusion_t": (.02, "volume/s"),
        "serca": (.2, "volume/s"), "er_capacity": (2, "concentration"),
        "er_leak": (.02, "1/s"), "er_evoked": (0, "1/s"),
        "mito_uptake": (.01, "volume/s"), "mito_efflux": (.05, "1/s"),
        "extrusion": (.02, "volume/s"), "resting_influx": (0, "amount/s"),
        "mt2_store_gain": (2, "dimensionless"), "nav_brake_gain": (2, "1/concentration"),
        "nav_brake_decay": (.3, "1/s"), "nav_baseline": (1, "current"),
        "aa_baseline": (0, "concentration/s"), "aa_conversion": (1, "1/s"),
        "aa_clearance": (.1, "1/s"), "lte_clearance": (.2, "1/s"),
        "lte_inhibition_k": (.05, "concentration"), "erk_activation": (1, "relative ERK/s"),
        "erk_decay": (1, "1/s"), "erk_slow_rate": (.2, "1/s"), "erk_half": (.03, "concentration"),
        "erk_bulk_activation": (2, "relative ERK/s"), "erk_bulk_half": (.005, "concentration"),
        "erk_bulk_decay": (2, "1/s"), "erk_bulk_adaptation": (.8, "1/s"), "erk_bulk_recovery": (.2, "1/s"),
        "arrest_gain": (0, "relative arrest/s"), "arrest_half": (.03, "concentration"),
        "arrest_recovery": (.1, "1/s"), "growth_baseline": (1, "relative growth activity"),
        "mito_stress_gain": (1, "stress/concentration"), "damage_gain": (.5, "damage/stress/s"),
        "repair_rate": (.1, "1/s"), "coq_repair_gain": (2, "dimensionless"),
        "cry_synthesis": (.05, "protein/s"), "cry_degradation": (.05, "1/s"),
        "fad_free": (1, "concentration"), "fad_kd": (1, "concentration"),
        "kl001_kd": (1, "concentration"), "cry_stabilization_gain": (4, "dimensionless"),
        "clock_reference_cry": (1, "protein"), "clock_period_baseline": (24, "hour"),
        "clock_period_gain": (1, "hour/protein"), "clock_amplitude_baseline": (1, "reporter"),
        "clock_amplitude_gain": (.5, "1/protein"), "drug_photo_rate": (1, "1/photon-dose"),
        "drug_photo_peak_nm": (380, "nm"), "drug_photo_width_nm": (30, "nm"),
        "drug_clearance": (0, "1/s"), "channel_drug_kd": (1, "concentration"),
    }
    assert set(rates) == PARAMETER_NAMES
    state = dict.fromkeys(sorted(STATE_NAMES), 0.0)
    state.update(local_l=.0002, local_t=.0002, bulk=.1, er=1.0,
                 damage=.1, repair_capacity=.5, cry_total=1.0, erk_bulk_available=1.0)
    channels = [{"id": name, "family": family, "compartment": compartment,
                 "density": 1.0, "open_baseline": 0.0, "open_evoked": .1,
                 "single_channel_flux": .01, "synthesis": 0.0, "degradation": 0.0,
                 "parameter_ids": [f"illustrative.intervention.channel.{name}.v1"]}
                for name, family, compartment in (("CaV1.2", "L", "local_l"), ("CaV3.2", "T", "local_t"))]
    return {
        "schema_version": 1, "profile_id": profile_id, "protocol_id": protocol_id or profile_id,
        "units": {"calcium_amount": "synthetic amount", "volume": "synthetic volume",
                  "concentration": "synthetic amount/synthetic volume", "time": "s",
                  "photon_dose": "synthetic photon dose", "channel_density": "synthetic density"},
        "input_provenance": {name: [f"illustrative.intervention.{profile_id}.{name}.v1"]
                             for name in ("initial_state", "volumes", "phases", "observation")},
        "dt_s": .02, "volumes": {"local_l": .02, "local_t": .02, "bulk": 10., "er": 1., "mito": 1.},
        "parameters": {name: _parameter(name, *value) for name, value in rates.items()},
        "initial_state": state, "channels": channels,
        "geometry": {"background": [1., 0., 0., 0.], "coupling_scale": 1.,
                     "potential_unit": "synthetic potential", "coupling_unit": "1/(synthetic potential)^2",
                     "parameter_ids": ["illustrative.intervention.geometry.v1"],
                     "prehistory": "ZERO_DELTA_METRIC",
                     "ports": [port("channel_gate:CaV1.2", .25, "probability")]},
        "phases": [{"id": "pretreat", "role": "pretreatment", "duration_s": 2., "external": [0., 0., 0., 0.],
                    "controls": controls(), "cell_light": [], "solution_light": []},
                   {"id": "challenge", "role": "measurement", "duration_s": 4., "external": [.2, 0., 0., 0.],
                    "controls": controls(), "cell_light": [], "solution_light": []}],
        "intervention": {"controls": {}, "initial_state": {}, "solution_prelight": [],
                         "parameter_ids": [f"illustrative.intervention.{profile_id}.protocol.v1"],
                         "description": "Explicit synthetic intervention; unchanged parameters across four arms."},
        "photochemistry": {
            "identity": {"subtype": "CRY2", "isoform": "full_length", "compartment": "nuclear", "species": "human"},
            "parameters": {"identity_key": "human:CRY2", "first_step_peak_nm": 450., "first_step_width_nm": 35.,
                "second_step_peak_nm": 530., "second_step_width_nm": 45., "intermediate_lifetime_s": 1.,
                "first_step_quantum_yield": .18, "second_step_quantum_yield": .12,
                "parameter_ids": ["illustrative.intervention.cry2-photocycle.v1"], "evidence_ids": [],
                "calibration_status": "STRUCTURAL_ONLY"},
            "initial_cell_light": [{"wavelength_nm": 450., "photon_flux": 2., "duration_s": 1., "delay_before_s": 0.},
                                   {"wavelength_nm": 530., "photon_flux": 2., "duration_s": 1., "delay_before_s": .1}]},
        "observation": {"calcium_unit": "synthetic concentration", "bulk_detection_limit": .01,
                        "bulk_saturation": 10., "early_time_s": .5},
        "provenance": "All coefficients and doses are explicit synthetic illustration inputs, not fitted experimental estimates."
    }


def _rate(p, **values):
    for name, value in values.items():
        p["parameters"][name]["value"] = value


def _description(id_, p, en, fi, detail_en, detail_fi, changed, endpoints):
    return {"id": id_, "profile_id": p["profile_id"], "title": {"en": en, "fi": fi},
            "description": {"en": detail_en, "fi": detail_fi}, "changed_inputs": changed,
            "highlight_endpoints": endpoints, "protocol": p}


def _change(key, en, fi, reference, target, units="relative"):
    return {"key": key, "label": {"en": en, "fi": fi}, "reference": reference, "target": target, "units": units}


def example_scenarios():
    cases = []
    p = base_protocol("mt2_brake")
    p["geometry"]["ports"] = [port("nav_current", 1., "current")]
    _rate(p, er_evoked=.1)
    p["phases"][1]["controls"]["depolarization"] = 1.
    p["intervention"]["controls"]["mt2_activation"] = .8
    cases.append(_description("mt2", p, "More evoked calcium, smaller sodium-current response", "Suurempi Ca-vaste, pienempi Na-virtamuutos",
        "A synthetic MT2-dependent store release activates a brake on the incremental sodium-current response. Resting calcium and evoked calcium are separate endpoints; these are not the rat-study doses.",
        "Synteettinen MT2-riippuvainen varastovapautus aktivoi natriumvirran lisävastetta hillitsevän palautteen. Lepo-Ca ja evokoitu Ca ovat eri päätepisteitä; annokset eivät ole rottakokeen annoksia.",
        [_change("mt2_activation", "MT2 activation", "MT2-aktivaatio", 0, .8)],
        ["resting_bulk_ca", "evoked_bulk_ca_increment", "nav_current_final"]))

    for kind, on, off in (("fast", 5., .5), ("slow", .005, .0005)):
        p = base_protocol("local_ltype_erk", f"local_{kind}")
        _rate(p, er_leak=0, serca=0, mito_uptake=0, extrusion=0)
        p["phases"][1]["controls"]["depolarization"] = 1.
        p["intervention"]["controls"].update(buffer_total=5., buffer_on=on, buffer_off=off)
        cases.append(_description(f"local_{kind}", p, f"Local signal and {kind} buffer", f"Paikallinen signaali ja {'nopea' if kind == 'fast' else 'hidas'} puskuri",
            "A small L-channel microdomain changes ERK while the bulk change stays below the declared detector threshold. Fast and slow examples share buffer capacity and equilibrium affinity. The source experiment used GLP-1, not a field; the field port is a conditional extension.",
            "L-kanavan pieni mikroalue muuttaa ERK-vastetta, vaikka koko solun muutos jää ilmoitetun mittausrajan alle. Nopealla ja hitaalla puskurilla on sama kapasiteetti ja tasapainoaffiniteetti. Lähdekoe käytti GLP-1:tä, ei kenttää; kenttäportti on ehdollinen jatko.",
            [_change("buffer_total", "Buffer capacity", "Puskurikapasiteetti", 0, 5, "concentration"),
             _change("buffer_on", "Association rate", "Sitoutumisnopeus", 0, on, "1/concentration/s"),
             _change("buffer_off", "Dissociation rate", "Irtoamisnopeus", 0, off, "1/s")],
            ["local_l_ca_peak", "bulk_measured_increment", "erk_early", "erk_final"]))

    p = base_protocol("channel_selectivity")
    _rate(p, arrest_gain=.5)
    p["geometry"]["ports"].append(port("channel_gate:CaV3.2", .25, "probability"))
    p["intervention"]["controls"]["channel_knockdowns"] = {"CaV3.2": 1.}
    cases.append(_description("selectivity", p, "CaV3.2 loss preserves the L-channel route", "CaV3.2-poisto säilyttää L-kanavareitin",
        "The T-channel availability is removed; the independent L-channel current remains. Target necessity does not identify the first physical sensor.",
        "T-kanavan toiminnallinen saatavuus poistetaan; riippumaton L-kanavan virta säilyy. Kohteen välttämättömyys ei tunnista ensimmäistä fysikaalista vastaanotinta.",
        [_change("channel_knockdowns.CaV3.2", "CaV3.2 knockdown", "CaV3.2-vaimennus", 0, 1)],
        ["current:CaV1.2", "current:CaV3.2", "local_t_ca_peak", "growth_activity_final"]))

    p = base_protocol("lipid_ttype_inhibition")
    for channel in p["channels"]:
        channel["open_baseline"] = .2
    p["geometry"]["ports"] = [port("aa_production", .2, "concentration/s")]
    p["intervention"]["controls"]["aa_synthesis_available"] = 0.
    cases.append(_description("lipid", p, "Lipid mediation can reduce T-channel current", "Lipidivälitys voi pienentää T-kanavan virtaa",
        "A positive AA-production port becomes a negative T-current change through LTE4. Blocking AA production removes that change without changing L-channel gating.",
        "Positiivinen AA-tuotannon portti muuttuu LTE4:n kautta T-virran vähenemiseksi. AA-tuotannon esto poistaa muutoksen muuttamatta L-kanavan portittumista.",
        [_change("aa_synthesis_available", "AA synthesis available", "AA-tuotannon saatavuus", 1, 0)],
        ["current:CaV3.2", "current:CaV1.2"]))

    p = base_protocol("channel_density_store_history", "serca_pretreatment")
    p["phases"][0]["duration_s"] = 20.
    _rate(p, er_leak=.15, serca=10., er_capacity=2., extrusion=0, mito_uptake=0)
    p["geometry"]["ports"] = [port("er_release_rate", .25, "1/s"), port("channel_gate:CaV1.2", .25, "probability")]
    p["intervention"]["controls"]["serca_available"] = 0.
    cases.append(_description("serca", p, "Pretreatment changes the store and baseline", "Esikäsittely muuttaa varastoa ja lähtötasoa",
        "SERCA inhibition is applied before baseline measurement. A depleted store reduces the store-dependent field increment; an independent membrane current remains. Detector saturation is a separate input.",
        "SERCA-esto alkaa ennen lähtömittausta. Tyhjentynyt varasto pienentää varastoriippuvaista kentän lisävastetta; riippumaton kalvovirta säilyy. Mittarin kyllästyminen on erillinen syöte.",
        [_change("serca_available", "SERCA availability during pretreatment", "SERCA:n saatavuus esikäsittelyssä", 1, 0)],
        ["resting_bulk_ca", "er_ca_final", "evoked_bulk_ca_increment", "current:CaV1.2"]))

    p = base_protocol("channel_density_store_history", "channel_density")
    p["phases"][0].update(duration_s=20., external=[.2, 0., 0., 0.])
    p["phases"][1]["controls"]["depolarization"] = 1.
    p["geometry"]["ports"] = [port("channel_synthesis:CaV1.2", .03, "density/s")]
    p["intervention"]["controls"]["channel_blocks"] = {"CaV1.2": 1.}
    cases.append(_description("density", p, "Slow channel abundance, unchanged opening rule", "Hidas kanavamäärä, sama portittumissääntö",
        "Synthetic channel synthesis changes total channel density over time while the per-channel opening probability is held fixed. A channel blocker removes current, not the accumulated channel population. Time is illustrative, not a fitted 24–72-hour effect.",
        "Synteettinen kanavasynteesi muuttaa kokonaismäärää ajan myötä yksittäiskanavan avautumistodennäköisyyden pysyessä samana. Salpaaja poistaa virran, ei kertynyttä kanavapopulaatiota. Aika havainnollistaa rakennetta, ei sovitettua 24–72 tunnin vaikutusta.",
        [_change("channel_blocks.CaV1.2", "L-channel block", "L-kanavasalpaus", 0, 1)],
        ["density:CaV1.2", "current:CaV1.2"]))

    p = base_protocol("cry_fad_competition")
    p["phases"][0]["duration_s"] = 20.
    p["geometry"]["ports"] = [port("cry_response", 1., "response/protein")]
    p["intervention"]["initial_state"]["drug_active"] = 10.
    p["intervention"]["controls"]["cry_ligand_available"] = 1.
    cases.append(_description("cry_fad", p, "More CRY protein need not mean more photoactive CRY", "CRY-määrä ei yksin määrää fotoaktiivista osuutta",
        "A declared competitive-binding hypothesis stabilizes CRY while reducing FAD occupancy. The existing ordered photocycle includes occupancy once. Clock period and reporter amplitude are separate outputs. Cellular FAD displacement and a field response are conditional, not measured by the KL001 studies.",
        "Ilmoitettu kilpailevan sitoutumisen hypoteesi vakauttaa CRY:tä ja pienentää FAD:n sitoutumisastetta. Nykyinen järjestysriippuvainen fotosykli laskee sitoutumisasteen kerran. Kellon jakso ja reporterin amplitudi ovat eri tuloksia. Solun FAD-syrjäytyminen ja kenttävaste ovat ehdollisia, eivät KL001-tutkimusten mittauksia.",
        [_change("initial_state.drug_active", "Active competing ligand", "Aktiivinen kilpaileva ligandi", 0, 10, "concentration"),
         _change("cry_ligand_available", "CRY-pocket targeting", "CRY-taskun kohdistus", 0, 1)],
        ["cry_total_final", "photo_capacity_final", "cry_field_response_final", "clock_period_final", "clock_amplitude_final"]))

    p = base_protocol("drug_photochemistry")
    p["initial_state"]["drug_active"] = 10.
    for phase in p["phases"]:
        phase["controls"]["photo_drug_channels"] = {"CaV1.2": 1.}
    p["intervention"]["solution_prelight"] = [{"wavelength_nm": 380., "photon_flux": 2., "duration_s": 2., "delay_before_s": 0.}]
    cases.append(_description("probe_light", p, "Illuminate the probe solution before it reaches cells", "Koetinliuos valaistaan ennen solukontaktia",
        "All arms contain the channel probe; the intervention is cell-free solution preillumination. It alters active probe concentration while cell light and CRY binding remain identical. The four-arm drug flag denotes this protocol intervention.",
        "Kaikissa haaroissa on kanavakoetin; interventio on soluttoman liuoksen esivalaistus. Se muuttaa aktiivista koetinpitoisuutta solun valon ja CRY-sitoutumisen pysyessä samoina. Neljän haaran lääketunnus tarkoittaa tätä protokollainterventiota.",
        [_change("solution_prelight", "Cell-free photon dose", "Soluttoman liuoksen fotoniannos", 0, 4, "synthetic photon dose")],
        ["drug_active_final", "current:CaV1.2", "photo_capacity_final"]))

    for site in ("transduction", "redox", "repair"):
        p = base_protocol("coq10_response", f"coq_{site}")
        p["phases"][1]["duration_s"] = 12.
        p["geometry"]["ports"] = [port("er_release_rate", .25, "1/s")]
        _rate(p, mito_uptake=1., damage_gain=5.)
        p["intervention"]["controls"].update(coq_action_site=site, coq_strength=.6)
        cases.append(_description(f"coq_{site}", p, f"CoQ hypothesis: {site}", f"CoQ-hypoteesi: {dict(transduction='alkuvälitys', redox='redox-kuorma', repair='korjaus')[site]}",
            "One action-site hypothesis is selected per run. Damage is produced only through the mitochondrial stress path; no second direct field-damage term is added. Protective outcomes alone cannot locate the action site.",
            "Ajossa valitaan yksi vaikutuspaikkahypoteesi. Vauriota tuottaa vain mitokondrion kuormitusreitti; toista suoraa kenttä–vaurio-termiä ei lisätä. Suojaava lopputulos ei yksin paikanna vaikutuskohtaa.",
            [_change("coq_action_site", "Action site", "Vaikutuspaikka", "none", site, "hypothesis"),
             _change("coq_strength", "Declared intervention strength", "Ilmoitettu intervention voimakkuus", 0, .6)],
            ["evoked_bulk_ca_increment", "damage_final"]))
    return deepcopy(cases)
