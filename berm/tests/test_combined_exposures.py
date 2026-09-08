"""Co-exposure joins retain units, factor identity and descriptive scope."""

from dataclasses import replace
import json

import pytest

from berm.biology import (
    CombinedExposureContext, ExposureTiming, FactorialEndpointObservation,
    HormoneClearanceObservation, MedicationAgent, MedicationContext,
    ProtocolMeasurement, RFDeviceProtocol, combined_exposures_structure,
    matched_interaction_contrast,
)
from berm.biology.androgen_capacity import HormoneBindingState
from berm.biology.reproductive_state import (
    CoupleReproductiveState, FemaleReproductiveState, MaleReproductiveState,
)
from berm.modulome.state import CellStateVector, GlutathionePool
from berm.modulome.steroidogenesis import (
    SteroidogenesisObservation, SteroidogenicContext, steroidogenesis_structure,
)
from berm.physics.static_tribo_interface import (
    InterfaceConditions, StaticMeasurement, StaticTriboelectricInterface,
)


WINDOW = ExposureTiming("protocol exposure onset", 0, 3600)
BASE = {"contraceptive_state": "no-drug-protocol", "material_interface": "interface-a",
        "rf_device_protocol": "sham-protocol"}
FACTORS = ("material_interface", "rf_device_protocol")


def observation(identifier, mean, **level_changes):
    return FactorialEndpointObservation(
        observation_id=identifier, factor_levels={**BASE, **level_changes},
        endpoint="tracer uptake", units="pmol/10^6 viable cells", compartment="assay cells",
        timing=WINDOW, matching_context_id="illustrative-matched-assay",
        evidence_kind="illustrative", mean=mean, source_ids=("illustrative-fixture",),
    )


def cells(joint=17):
    return (
        observation("00", 10),
        observation("10", 12, material_interface="interface-b"),
        observation("01", 13, rf_device_protocol="rf-protocol"),
        observation("11", joint, material_interface="interface-b", rf_device_protocol="rf-protocol"),
    )


def contrast(group):
    return matched_interaction_contrast(*group, factors=FACTORS, comparison_id="fixture-contrast")


@pytest.mark.parametrize("joint,expected", [(17, 2), (15, 0), (14, -1)])
def test_all_additive_interaction_directions_remain_descriptive(joint, expected):
    result = contrast(cells(joint))
    assert result["contrast"] == expected
    assert result["heldFixed"] == {"contraceptive_state": "no-drug-protocol"}
    assert result["synergyStatus"] is None
    assert result["statisticalSignificance"] is None
    assert result["humanEndpointTransfer"] is None
    assert result["interpretationKind"] == "descriptive_additive_mean_contrast"
    assert result["evidenceKind"] == "illustrative"
    assert result["sourceIds"] == ["illustrative-fixture"]
    json.dumps(result, allow_nan=False)


def test_declared_endpoint_rescaling_rescales_contrast_without_changing_scope():
    original = cells()
    rescaled = [replace(cell, mean=cell.mean * 1000, units="fmol/10^6 viable cells") for cell in original]
    assert contrast(rescaled)["contrast"] == 1000 * contrast(original)["contrast"]
    assert contrast(rescaled)["units"] == "fmol/10^6 viable cells"


def test_missing_mean_is_unknown_rather_than_zero_or_negative_evidence():
    group = list(cells())
    group[3] = replace(group[3], mean=None)
    result = contrast(group)
    assert result["contrast"] is None
    assert result["cellMeans"]["Y11"] is None
    assert result["synergyStatus"] is None


@pytest.mark.parametrize("changed", [
    {"endpoint": "DNA damage"}, {"units": "relative signal"},
    {"compartment": "serum"}, {"timing": ExposureTiming("protocol exposure onset", 0, 7200)},
    {"timing": ExposureTiming("medication onset", 0, 3600)},
    {"matching_context_id": "other-assay"}, {"evidence_kind": "field_experiment"},
])
def test_incompatible_assay_windows_units_and_evidence_cannot_be_pooled(changed):
    group = list(cells())
    group[3] = replace(group[3], **changed)
    with pytest.raises(ValueError, match="identical"):
        contrast(group)


def test_third_factor_confounding_and_misordered_cells_are_rejected():
    group = list(cells())
    group[3] = replace(group[3], factor_levels={**group[3].factor_levels,
                                             "contraceptive_state": "active-drug"})
    with pytest.raises(ValueError, match="third factor fixed"):
        contrast(group)
    a, b, c, d = cells()
    with pytest.raises(ValueError, match="2x2"):
        contrast((a, c, b, d))


def test_interaction_is_not_a_fourth_factor_and_each_factor_needs_two_levels():
    with pytest.raises(ValueError, match="exactly the three"):
        replace(cells()[0], factor_levels={**BASE, "material_times_rf": "on"})
    a, b, c, d = cells()
    with pytest.raises(ValueError, match="two distinct levels"):
        contrast((a, b, c, replace(d, factor_levels=BASE)))
    with pytest.raises(ValueError, match="two distinct registered"):
        matched_interaction_contrast(a, b, c, d, factors=(FACTORS[0], FACTORS[0]), comparison_id="bad")
    with pytest.raises(ValueError, match="distinct observation"):
        contrast((a, b, c, replace(d, observation_id=a.observation_id)))


def test_factorial_mapping_is_immutable_and_not_aliased_to_callers_dict():
    levels = dict(BASE)
    record = replace(cells()[0], factor_levels=levels)
    levels["material_interface"] = "unregistered-change"
    assert record.factor_levels["material_interface"] == "interface-a"
    with pytest.raises(TypeError):
        record.factor_levels["material_interface"] = "mutated"


def context():
    state = CellStateVector("shared-state", glutathione_pool=GlutathionePool(
        100, 5, "umol/L", "cytosol", ("illustrative-fixture",), basis="illustrative"))
    material = InterfaceConditions(("fixture fabric", "skin"), "interface-a")
    production = SteroidogenesisObservation(
        observation_id="local-production", context=SteroidogenicContext(
            "illustrative Leydig assay", "LH_stimulated", "stimulation-a", None),
        hormone="testosterone", output_per_viable_cell=10,
        output_units="pmol/(10^6 viable cells*h)", compartment="medium",
        source_ids=("illustrative-fixture",), evidence_kind="illustrative", study_design="illustrative",
        cell_state=state,
    )
    return CombinedExposureContext(
        context_id="joined-record", medication=MedicationContext(
            "no-drug-protocol", "none", (), "no medication in this protocol", WINDOW),
        material=material, rf_device=RFDeviceProtocol("sham-protocol", "sham", (), "sham", WINDOW),
        static_interface=StaticTriboelectricInterface(material, (
            StaticMeasurement("potential_difference", 7, "V", "potential-1", reference="fixture electrode"),)),
        receiver_state=state, production=production,
        binding=HormoneBindingState(20, 30, 600, 1, 1000), binding_units="nmol/L",
        clearance=HormoneClearanceObservation("testosterone", None, "L/h", "systemic", WINDOW,
                                               ("illustrative-fixture",)),
    )


def test_public_context_reuses_state_production_binding_and_interface_without_new_gate():
    joined = context()
    assert joined.factor_levels == BASE
    assert joined.production.cell_state is joined.receiver_state
    assert joined.static_interface.conditions is joined.material
    assert joined.binding.free_testosterone < joined.binding.total_testosterone
    assert joined.production.output_per_viable_cell == 10
    assert joined.clearance.value is None
    assert not hasattr(joined, "capacity_multiplier")
    changed = replace(joined, binding=replace(joined.binding, shbg_binding_sites=80))
    assert changed.binding.free_testosterone < joined.binding.free_testosterone
    assert changed.production is joined.production
    assert changed.clearance is joined.clearance


def test_conflicting_duplicate_receiver_record_and_wrong_interface_are_rejected():
    joined = context()
    with pytest.raises(ValueError, match="same state record"):
        replace(joined, receiver_state=replace(joined.receiver_state, state_id="other-state"))
    with pytest.raises(ValueError, match="material conditions"):
        replace(joined, material=replace(joined.material, relative_humidity=0.8))
    with pytest.raises(ValueError, match="binding_units"):
        replace(joined, binding_units=None)


def test_medication_history_is_named_not_a_boolean_gain_and_unknown_dose_stays_none():
    agent = MedicationAgent("named ingredient", "progestin", None, None, "oral")
    medication = MedicationContext("drug-a", "prior", (agent,), "daily for the registered interval",
                                   ExposureTiming("RF onset", -86400, -3600))
    assert medication.agents[0].dose is None
    assert medication.timing.end_s < 0
    with pytest.raises(ValueError, match="exposure_state"):
        replace(medication, exposure_state=True)
    with pytest.raises(ValueError, match="named agents"):
        replace(medication, agents=())
    with pytest.raises(ValueError, match="both None"):
        replace(agent, dose=1)
    with pytest.raises(ValueError, match="boolean"):
        replace(agent, dose=True, dose_units="mg")


def permeability():
    return ProtocolMeasurement("chemical-assay", "chemical_permeability_ratio", 2, "1", "skin sample",
        "assay-a", WINDOW, ("illustrative-fixture",), chemical="named tracer", comparator_id="unexposed-sample")


def test_chemical_permeability_is_recorded_without_becoming_e_field_or_sar():
    measured = permeability()
    joined = replace(context(), chemical_measurements=(measured,))
    assert joined.chemical_measurements[0].quantity == "chemical_permeability_ratio"
    assert joined.static_interface.measurements[0].value == 7
    with pytest.raises(ValueError, match="quantity and units"):
        replace(measured, quantity="electric_field")
    with pytest.raises(ValueError, match="electric_field or sar"):
        replace(joined.rf_device, measurements=(measured,))
    with pytest.raises(ValueError, match="comparator_id"):
        replace(measured, comparator_id=None)
    with pytest.raises(ValueError, match="chemical"):
        replace(measured, chemical=None)


def test_rf_protocol_retains_spectrum_modulation_measurement_site_and_timing():
    sar = ProtocolMeasurement("sar-a", "sar", 1, "W/kg", "sample volume", "dosimetry-a", WINDOW,
                              ("illustrative-fixture",))
    protocol = RFDeviceProtocol("rf-a", "exposed", (1.8e9,), "registered pulse sequence", WINDOW, (sar,))
    assert protocol.carrier_frequencies_hz == (1.8e9,)
    assert protocol.measurements[0].site == "sample volume"
    assert protocol.timing == WINDOW


@pytest.mark.parametrize("action", [
    lambda: ExposureTiming("reference", 10, 0),
    lambda: ExposureTiming("reference", 0, float("inf")),
    lambda: replace(permeability(), value=float("nan")),
    lambda: replace(permeability(), source_ids="not-a-sequence"),
    lambda: replace(permeability(), source_ids=()),
    lambda: replace(context().clearance, units="nmol/L"),
    lambda: replace(context().rf_device, carrier_frequencies_hz=(0,)),
    lambda: replace(cells()[0], mean=True),
])
def test_invalid_scales_identifiers_and_nonfinite_records_fail(action):
    with pytest.raises(ValueError):
        action()


def test_structure_is_exportable_open_and_reuses_the_existing_capacity_policy():
    pair = CoupleReproductiveState(MaleReproductiveState(), FemaleReproductiveState())
    before = pair.biological_capacity
    result = combined_exposures_structure()
    assert result["model"] == "BERM"
    assert len(result["factors"]) == 3
    assert result["measurementContract"]["fieldStateRole"] == "optional_physical_measurement_input_only"
    assert all(value is None for value in result["openCalibration"].values())
    assert result["hormoneStages"]["capacityPolicy"] == steroidogenesis_structure()["outputMappingPolicy"]
    assert result["predictionPolicy"]["newCapacityMultiplier"] is None
    assert result["predictionPolicy"]["historicalForecastsChanged"] is False
    assert result["interactions"]["materialByRF"]["independentFactor"] is False
    assert pair.biological_capacity == before
    json.dumps(result, allow_nan=False)
    result["openCalibration"]["physicalScale"] = 99
    assert combined_exposures_structure()["openCalibration"]["physicalScale"] is None
