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


def test_python_and_website_share_the_exact_architecture_contract() -> None:
    website = json.loads(WEB_MANIFEST.read_text(encoding="utf-8"))

    assert website == architecture_manifest()


def test_versions_have_distinct_namespaces_and_roles() -> None:
    manifest = architecture_manifest()

    assert berm.__version__ == PACKAGE_VERSION == "0.19.0"
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
    fieldstate = architecture_manifest()["measurementModules"]["fieldState"]

    assert fieldstate["role"] == "measurement_observation_estimation"
    assert fieldstate["isModelAlias"] is False
    assert fieldstate["isCausalRoot"] is False
    assert fieldstate["publishesLockedForecasts"] is True


def test_lindgren_to_observable_bridge_remains_explicitly_open() -> None:
    theory = architecture_manifest()["theory"]

    assert theory["formulation"] == "2025-weyl-gme"
    assert theory["l2BridgeStatus"] == L2_BRIDGE_STATUS == "open"
    assert "not been derived" in theory["l2BridgeMeaning"]
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


def test_measurements_and_proxy_enter_only_through_open_l2_bridge() -> None:
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
            assert edge["kind"] == "proposed_bridge"


def test_conditional_asfr_types_are_canonical_and_legacy_function_is_a_wrapper() -> (
    None
):
    assert AgeSpecificFieldStateInput is AgeSpecificConditionalInput
    assert FieldStateASFRProjection is ConditionalASFRProjection
    assert project_fieldstate_asfr is not project_conditional_asfr
