"""Tests for the non-numeric v16/v17-to-FieldState semantic bridge."""

from __future__ import annotations

import pytest

from berm.biology.causal_registry import CAUSAL_NODES, canonical_node_id
from berm.biology.legacy_compat import (
    DEMOGRAPHIC_CONTEXT_ONLY,
    LEGACY_DIAGNOSTIC,
    LEGACY_NUMERICS_UNCHANGED,
    LEGACY_PATHWAY_BINDINGS,
    STRUCTURAL_ONLY,
    bindings_for_namespace,
    resolve_legacy_binding,
)


def test_c_and_f_are_resolved_only_with_a_legacy_namespace() -> None:
    """The historical C/F collision cannot silently choose the wrong biology."""
    current_c = resolve_legacy_binding("berm.biology.pathways.v17", "C")
    old_c = resolve_legacy_binding("berm.v16.intervention_catalogue", "C")
    current_f = resolve_legacy_binding("berm.biology.pathways.v17", "F")
    old_f = resolve_legacy_binding("berm.v16.intervention_catalogue", "F")

    assert current_c.canonical_nodes == ("BARRIER_BBB",)
    assert old_c.canonical_nodes == ("MELATONIN_REDOX",)
    assert current_f.canonical_nodes == ("BARRIER_BBB",)
    assert old_f.canonical_nodes == ("VMEM_MTOR",)

    with pytest.raises(KeyError, match="ambiguous"):
        canonical_node_id("C")
    with pytest.raises(KeyError, match="ambiguous"):
        canonical_node_id("F")


def test_new_semantic_mediator_nodes_are_resolvable_without_letter_aliases() -> None:
    assert canonical_node_id("MICROBIOME_OT") == "MICROBIOME_OT"
    assert canonical_node_id("MELATONIN_REDOX") == "MELATONIN_REDOX"
    assert canonical_node_id("BIOELECTRIC_DEVELOPMENT") == "BIOELECTRIC_DEVELOPMENT"


def test_every_binding_preserves_legacy_numerics_and_declares_interpretation() -> None:
    allowed = {STRUCTURAL_ONLY, LEGACY_DIAGNOSTIC, DEMOGRAPHIC_CONTEXT_ONLY}
    assert LEGACY_PATHWAY_BINDINGS
    for binding in LEGACY_PATHWAY_BINDINGS:
        assert binding.numeric_status == LEGACY_NUMERICS_UNCHANGED
        assert binding.interpretation_status in allowed
        assert binding.canonical_nodes
        assert binding.as_dict()["canonical_nodes"] == binding.canonical_nodes


def test_report_terms_are_annotated_but_not_promoted_to_v2_coefficients() -> None:
    mapping = resolve_legacy_binding("berm.v16.country_report", "epigenetic_factor")
    output = resolve_legacy_binding("berm.v16.country_report", "predicted_tfr")

    assert mapping.canonical_nodes == ("BIOELECTRIC_DEVELOPMENT",)
    assert mapping.interpretation_status == LEGACY_DIAGNOSTIC
    assert output.canonical_nodes == ("TFR",)
    assert output.interpretation_status == DEMOGRAPHIC_CONTEXT_ONLY


def test_unknown_source_or_key_fails_loudly() -> None:
    assert len(bindings_for_namespace("berm.biology.pathways.v17")) == 6
    with pytest.raises(KeyError, match="no semantic binding"):
        resolve_legacy_binding("berm.biology.pathways.v17", "G")
    with pytest.raises(KeyError, match="no semantic binding"):
        resolve_legacy_binding("unknown.route", "A")


def test_semantic_registry_edges_are_bidirectional_and_resolvable() -> None:
    """New semantic nodes cannot leave the causal registry structurally dangling."""
    nodes = {node.id: node for node in CAUSAL_NODES}
    for node in CAUSAL_NODES:
        for parent in node.parents:
            assert parent in nodes
            assert node.id in nodes[parent].children
        for child in node.children:
            assert child in nodes
            assert node.id in nodes[child].parents
