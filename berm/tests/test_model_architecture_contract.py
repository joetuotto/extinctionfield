"""Cross-runtime contract tests for the BERM/FieldState boundary."""

from __future__ import annotations

import json
from pathlib import Path

import berm
from berm.architecture import (
    CONDITIONAL_ASFR_ROUTE_ID,
    DKC_CANDIDATE_ROUTE_ID,
    FIELDSTATE_SPEC_VERSION,
    L2_BRIDGE_STATUS,
    PACKAGE_VERSION,
    PUBLIC_MODEL_VERSION,
    architecture_manifest,
)
from berm.biology.causal_registry import CAUSAL_NODES
from berm.outcomes.fieldstate_asfr import (
    AgeSpecificConditionalInput,
    AgeSpecificFieldStateInput,
    ConditionalASFRProjection,
    FieldStateASFRProjection,
    project_conditional_asfr,
    project_fieldstate_asfr,
)


REPO_ROOT = Path(__file__).resolve().parents[2]
WEB_MANIFEST = REPO_ROOT / "website" / "data" / "model-architecture.json"
WEB_GRAPH = REPO_ROOT / "website" / "data" / "causal-graph.json"


def test_public_copy_does_not_promote_fieldstate_to_a_causal_operator() -> None:
    """Guard against recurring copy drift from the architecture contract."""

    public_sources = [
        REPO_ROOT / "website" / "app",
        REPO_ROOT / "website" / "components",
        REPO_ROOT / "website" / "data" / "claims.json",
        REPO_ROOT / "berm" / "berm",
    ]
    forbidden = (
        "FieldState activates",
        "FieldState-modulated membrane",
        "FieldState-dependent fitness",
        "difference in physical FieldState changes",
        "FieldStatea mitattavana mahdollisena moderaattorina",
        "FieldState-riippuvainen kelpoisuus",
        "FieldState calibre modifie",
        "fitness dependante du FieldState",
        "FieldState依存的適応度",
        "FieldState 의존적 적합도",
    )

    for root in public_sources:
        paths = [root] if root.is_file() else root.rglob("*")
        for path in paths:
            if path.is_file() and path.suffix in {".json", ".py", ".ts", ".tsx"}:
                text = path.read_text(encoding="utf-8")
                for phrase in forbidden:
                    assert phrase not in text, f"FieldState boundary drift in {path}: {phrase}"


def test_python_and_website_share_the_exact_architecture_contract() -> None:
    website = json.loads(WEB_MANIFEST.read_text(encoding="utf-8"))

    assert website == architecture_manifest()


def test_versions_have_distinct_namespaces_and_roles() -> None:
    manifest = architecture_manifest()

    assert berm.__version__ == PACKAGE_VERSION == "0.22.0"
    assert PUBLIC_MODEL_VERSION == "v17"
    assert FIELDSTATE_SPEC_VERSION == "v2"
    assert manifest["routes"]["conditionalAsfr"]["id"] == CONDITIONAL_ASFR_ROUTE_ID
    assert manifest["routes"]["lindgrenDkc"] == {
        "id": DKC_CANDIDATE_ROUTE_ID,
        "role": "candidate_scenario_and_validation",
        "calculationEnabled": True,
        "candidateOutputsEnabled": True,
        "inputKind": (
            "national_technology_timing_proxy_or_caller_supplied_normalized_state"
        ),
        "fieldStateCalibrated": True,
        "fieldStateCalibrationScope": (
            "CALIBRATION_PIPELINE_IMPLEMENTED_AND_PRODUCES_VALUES"
        ),
        "refinedM4CurrentDataStatus": "NOT_IDENTIFIABLE_WITH_CURRENT_DATA",
        "supportsUncalibratedExecution": True,
        "requiresOpenL2Bridge": True,
        "publishesLockedForecasts": True,
    }
    assert len({PACKAGE_VERSION, PUBLIC_MODEL_VERSION, FIELDSTATE_SPEC_VERSION}) == 3


def test_fieldstate_is_measurement_not_model_or_causal_root() -> None:
    manifest = architecture_manifest()
    fieldstate = manifest["measurementModules"]["fieldState"]

    assert manifest["model"]["id"] == "berm"
    assert manifest["model"]["role"] == "explanatory_derivational_prediction_model"
    assert manifest["theory"]["fieldStateRole"] == "optional_measurement_input_only"
    assert fieldstate["role"] == "measurement_observation_estimation"
    assert fieldstate["isModelAlias"] is False
    assert fieldstate["isCausalRoot"] is False
    assert fieldstate["publishesLockedForecasts"] is False
    assert fieldstate["canonicalRoute"] == "/measurement/fieldstate"


def test_epistapege_is_a_qualitative_berm_extension_not_a_fieldstate_result() -> None:
    extension = architecture_manifest()["civilizationExtensions"]["epistapege"]

    assert extension["canonicalRoute"] == "/civilization/epistapege"
    assert extension["status"] == "open_testable_extension"
    assert extension["publishesNumericPredictions"] is False
    assert extension["fieldStateRole"] == "optional_physical_measurement_input_only"


def test_lindgren_to_observable_bridge_is_formal_but_calibration_remains_open() -> None:
    theory = architecture_manifest()["theory"]

    assert theory["formulation"] == "2025-weyl-gme"
    assert theory["l2BridgeStatus"] == L2_BRIDGE_STATUS == "conditional_formal_operator"
    assert theory["l2BridgeStatusScope"] == "operator_form_only"
    parts = theory["bridgeComponents"]
    assert {key: value["status"] for key, value in parts.items()} == {
        "geometry": "L1_DERIVED",
        "responseOperator": "CONDITIONAL_FORMAL_OPERATOR",
        "physicalIdentification": "OPEN",
        "tissueKernel": "CALLER_SUPPLIED_UNCALIBRATED",
        "endpointCalibration": "OPEN",
    }
    assert parts["responseOperator"]["assumptions"] == [
        "minimal_matter_metric_coupling", "retarded_response_expansion",
    ]
    assert parts["physicalIdentification"]["unresolved"] == ["gauge_prescription", "physical_coupling_scale"]
    assert theory["calibrationStatus"] == "open"
    assert "tissue response kernels" in theory["l2BridgeMeaning"]
    assert "orientation" in theory["responseStateArguments"]
    assert "coherence" in theory["responseStateArguments"]
    assert "temperature_trajectory" in theory["responseStateArguments"]
    assert "do not validate" in theory["responseEvidenceRole"]
    assert theory["epistemicStatusPolicy"] == "componentwise_no_weakest_link_collapse"
    assert theory["derivedStatusPreserved"] is True
    derivation = theory["formalDerivation"]
    assert derivation["implemented"] is True
    assert derivation["epistemicStatus"] == "L1_DERIVED_FORMULAS"
    assert derivation["gateStatus"] == "CONDITIONAL_INPUT_CONTRACT"
    assert derivation["derivedStatusPreserved"] is True
    assert derivation["requiresAllElements"] is True
    assert derivation["bianchiAloneSufficient"] is False
    assert derivation["actionPremise"] == "S=integral sqrt(-det g) R d^4x"
    assert derivation["fullEulerLagrangeRequired"] is True
    assert derivation["fullEulerLagrangeEvidence"] == (
        "CONTENT_BOUND_NUMERICAL_RESIDUAL_AND_STRUCTURED_ATTESTATION_REQUIRED"
    )
    assert derivation["inputProvenanceBinding"] == "NUMERIC_INPUT_BUNDLE_SHA256"
    assert derivation["ehResidualComputation"] == (
        "FROM_SUPPLIED_POTENTIAL_AND_SUPPLIED_SYMMETRIC_EINSTEIN_TENSOR"
    )
    assert derivation["weylChecks"] == [
        "levi_civita_metric_compatibility",
        "semimetricity",
        "connection_reconstruction",
        "torsion_free",
    ]
    assert derivation["metricCompatibilityCondition"] == ("nabla^LC_sigma g_mu_nu=0")
    assert derivation["bianchiChecks"] == [
        "levi_civita_contracted_identity",
        "field_definition_F_equals_dA",
        "same_field_derivative_attestation",
        "homogeneous_dF",
    ]
    assert derivation["residualAcceptance"] == (
        "PER_RESIDUAL_ATOL_PLUS_RTOL_TIMES_REFERENCE_SCALE"
    )
    assert derivation["variationalEquation"] == "delta S/delta A_mu=0"
    assert derivation["acceptanceAssertion"] == (
        "variational_check AND weyl_check AND bianchi_check"
    )
    assert derivation["requiredElements"] == [
        "variational_harmonic_metric_gme",
        "weyl_semimetricity_and_connection",
        "bianchi_contracted_identity_and_homogeneous_df",
    ]


def test_merge_preserves_modulome_and_archived_route_boundaries() -> None:
    routes = architecture_manifest()["routes"]
    assert routes["modulomeAsfr"]["preservesArchivedV17"] is True
    assert routes["modulomeAsfr"]["calibrationStatus"] == "STRUCTURAL_ONLY"
    assert routes["modulomeAsfr"]["fieldStateCalibrated"] is False
    assert routes["modulomeAsfr"]["publishesLockedForecasts"] is False
    assert routes["prediction"]["fieldStateCalibrated"] is False
    assert routes["diagnostic"]["publishesLockedForecasts"] is False


def test_civilization_aggregation_is_forward_only_and_explicitly_persistent() -> None:
    aggregation = architecture_manifest()["civilizationExtensions"]["forwardAggregation"]

    assert aggregation["role"] == "individual_probability_to_population_distribution"
    assert aggregation["reverseEcologicalInferenceAllowed"] is False
    assert "P(Y=p | z,x)" in aggregation["operator"]
    assert "retention" in aggregation["institutionalMemory"]


def test_compositional_evidence_layer_is_berm_owned_and_cross_runtime() -> None:
    synthesis = architecture_manifest()["evidenceSynthesis"]

    assert synthesis["role"] == "berm_compositional_evidence_layer"
    assert synthesis["fieldStateRole"] == "optional_physical_measurement_input_only"
    assert len(synthesis["clusters"]) == 7
    assert {item["id"] for item in synthesis["clusters"]} == {
        "joint-endocrine-gate",
        "cry-clock-hpg-serial-bridge",
        "pharmacological-target-triangulation",
        "protocol-state-heterogeneity",
        "vmem-calcium-mtor-interface",
        "conserved-cross-species-prior",
        "graded-susceptibility-continuum",
    }


def test_python_and_website_causal_topology_match_exactly() -> None:
    graph = json.loads(WEB_GRAPH.read_text(encoding="utf-8"))
    python_nodes = {node.id: node for node in CAUSAL_NODES}

    assert set(graph["nodes"]) == set(python_nodes)
    for node_id, node in python_nodes.items():
        web = graph["nodes"][node_id]
        assert web["parents"] == list(node.parents)
        assert web["children"] == list(node.children)
        assert web["layer"] == node.layer
        assert web["calibration_status"] == node.calibration_status


def test_measurements_and_proxy_enter_only_through_conditional_l2_operator() -> None:
    graph = json.loads(WEB_GRAPH.read_text(encoding="utf-8"))
    measurement_inputs = {
        "TECHNOLOGY_TIMING_PROXY",
        "FIELDSTATE_VECTOR",
        "FIELDSTATE_ENVELOPE",
        "STATIC_TRIBO_INTERFACE",
        "FIELDSTATE_LOW_FREQUENCY_ELECTRIC",
    }

    for edge in graph["edges"]:
        if edge["from"] in measurement_inputs:
            assert edge["to"] == "BERM_L2_BRIDGE"
            assert edge["kind"] == "inference_input"
        if edge["from"] == "BERM_L2_BRIDGE":
            assert edge["kind"] == "conditional_response"
        if edge["from"] == "LINDGREN_METRIC_DRIVE":
            assert edge["to"] == "BERM_L2_BRIDGE"
            assert edge["kind"] == "derived_geometry"


def test_conditional_asfr_types_are_canonical_and_legacy_function_is_a_wrapper() -> None:
    assert AgeSpecificFieldStateInput is AgeSpecificConditionalInput
    assert FieldStateASFRProjection is ConditionalASFRProjection
    assert project_fieldstate_asfr is not project_conditional_asfr
