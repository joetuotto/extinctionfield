#!/usr/bin/env python3
"""Synchronize the website graph topology from Python's BERM registry.

The website owns translations and presentation groups.  Python owns semantic
node IDs and topology.  This exporter updates only the shared contract fields,
rebuilds typed edges, and preserves translated labels for existing nodes.
"""

from __future__ import annotations

import json
from pathlib import Path

from berm.biology.causal_registry import CAUSAL_NODES


REPO_ROOT = Path(__file__).resolve().parent.parent
GRAPH_PATH = REPO_ROOT / "website" / "data" / "causal-graph.json"

MEASUREMENT_INPUTS = {
    "TECHNOLOGY_TIMING_PROXY",
    "FIELDSTATE_VECTOR",
    "FIELDSTATE_ENVELOPE",
    "STATIC_TRIBO_INTERFACE",
    "FIELDSTATE_LOW_FREQUENCY_ELECTRIC",
}

NEW_LABELS = {
    "BERM_L2_BRIDGE": {
        "en": "Open geometry-to-observable coupling proposition",
        "fi": "Avoin geometriasta havaittavaan vasteeseen johtava kytkentäehdotus",
        "ja": "幾何学から観測量への未解決の結合命題",
        "fr": "Proposition ouverte de couplage géométrie–observable",
        "ko": "기하학-관측량 간 개방형 결합 명제",
    }
}


def _web_prediction_role(role: str) -> str:
    if role in {"observed_outcome"}:
        return "output"
    if role in {"derived_outcome"}:
        return "terminal"
    if role.endswith("input"):
        return "input"
    return "intermediate"


def _edge_kind(source: str, target: str) -> str:
    if source in MEASUREMENT_INPUTS and target == "BERM_L2_BRIDGE":
        return "inference_input"
    if source == "BERM_L2_BRIDGE":
        return "proposed_bridge"
    return "causal_model"


def build_graph(existing: dict) -> dict:
    existing_nodes = existing["nodes"]
    nodes: dict[str, dict] = {}
    for source in CAUSAL_NODES:
        current = dict(existing_nodes.get(source.id, {}))
        labels = dict(current.get("label", NEW_LABELS.get(source.id, {})))
        labels["en"] = source.label
        if source.id == "TECHNOLOGY_TIMING_PROXY":
            labels["fi"] = "Kansallinen teknologian ajoitusproxy (legacy-v17-vertailu)"
        current.update(
            {
                "id": source.id,
                "label": labels,
                "layer": source.layer,
                "parents": list(source.parents),
                "children": list(source.children),
                "calibration_status": source.calibration_status,
                "prediction_role": _web_prediction_role(source.prediction_role),
                "legacy_aliases": list(source.legacy_aliases),
            }
        )
        nodes[source.id] = current

    edges = []
    edge_number = 1
    for source in CAUSAL_NODES:
        for target in source.children:
            edges.append(
                {
                    "id": f"e{edge_number:02d}",
                    "from": source.id,
                    "to": target,
                    "kind": _edge_kind(source.id, target),
                }
            )
            edge_number += 1

    ui_groups = dict(existing["ui_groups"])
    ui_groups.pop("fieldstate", None)
    ui_groups = {
        "legacy-proxy": {
            "id": "legacy-proxy",
            "contains": ["TECHNOLOGY_TIMING_PROXY"],
            "ui_level": 0,
        },
        "fieldstate-measurement": {
            "id": "fieldstate-measurement",
            "contains": [
                "FIELDSTATE_VECTOR",
                "FIELDSTATE_ENVELOPE",
                "STATIC_TRIBO_INTERFACE",
                "FIELDSTATE_LOW_FREQUENCY_ELECTRIC",
            ],
            "ui_level": 0,
        },
        "berm-l2": {
            "id": "berm-l2",
            "contains": ["BERM_L2_BRIDGE"],
            "ui_level": 1,
        },
        **ui_groups,
    }

    return {
        "$schema": existing.get("$schema", "./causal-graph.schema.json"),
        "version": "2.0.0",
        "nodes": nodes,
        "edges": edges,
        "ui_groups": ui_groups,
    }


def main() -> None:
    existing = json.loads(GRAPH_PATH.read_text(encoding="utf-8"))
    graph = build_graph(existing)
    GRAPH_PATH.write_text(
        json.dumps(graph, ensure_ascii=False, indent=2) + "\n", encoding="utf-8"
    )
    print(
        f"Wrote {GRAPH_PATH}: {len(graph['nodes'])} nodes, "
        f"{len(graph['edges'])} typed edges, {len(graph['ui_groups'])} UI groups"
    )


if __name__ == "__main__":
    main()
