"""Cross-runtime contract tests for the BERM/FieldState boundary."""

from __future__ import annotations

import json
from pathlib import Path

import berm
from berm.architecture import (
    CONDITIONAL_ASFR_ROUTE_ID,
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

    assert berm.__version__ == PACKAGE_VERSION == "0.20.0"
    assert PUBLIC_MODEL_VERSION == "v17"
    assert FIELDSTATE_SPEC_VERSION == "v2"
    assert manifest["routes"]["conditionalAsfr"]["id"] == CONDITIONAL_ASFR_ROUTE_ID
    assert len({PACKAGE_VERSION, PUBLIC_MODEL_VERSION, FIELDSTATE_SPEC_VERSION}) == 3


def test_fieldstate_is_measurement_not_model_or_causal_root() -> None:
    fieldstate = architecture_manifest()["measurementModules"]["fieldState"]

    assert fieldstate["role"] == "measurement_observation_estimation"
    assert fieldstate["isModelAlias"] is False
    assert fieldstate["isCausalRoot"] is False
    assert fieldstate["publishesLockedForecasts"] is False


def test_lindgren_to_observable_bridge_is_formal_but_calibration_remains_open() -> None:
    theory = architecture_manifest()["theory"]

    assert theory["formulation"] == "2025-weyl-gme"
    assert theory["l2BridgeStatus"] == L2_BRIDGE_STATUS == "conditional_formal_operator"
    assert theory["calibrationStatus"] == "open"
    assert "tissue response kernels" in theory["l2BridgeMeaning"]


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
