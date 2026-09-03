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
    "LINDGREN_METRIC_DRIVE": {
        "en": "Lindgren 2025 metric perturbation and quadratic mixing drive",
        "fi": "Lindgren 2025 -metriikkahäiriö ja neliöllinen sekoitusajuri",
        "ja": "Lindgren 2025 計量摂動と二次混合駆動",
        "fr": "Perturbation métrique et mélange quadratique de Lindgren 2025",
        "ko": "Lindgren 2025 계량 섭동 및 이차 혼합 구동",
    },
    "BERM_L2_BRIDGE": {
        "en": "Conditional metric-to-observable response operator",
        "fi": "Ehdollinen metriikasta havaittavaan johtava vasteoperaattori",
        "ja": "計量から観測量への条件付き応答演算子",
        "fr": "Opérateur conditionnel de réponse métrique–observable",
        "ko": "계량-관측량 조건부 응답 연산자",
    },
    "ANDROGEN_BINDING_AVAILABILITY": {
        "en": "SHBG/albumin binding and free or intratesticular androgen availability",
        "fi": "SHBG-/albumiinisitoutuminen sekä vapaan tai intratestikulaarisen androgeenin saatavuus",
        "ja": "SHBG・アルブミン結合と遊離・精巣内アンドロゲン利用可能性",
        "fr": "Liaison SHBG/albumine et disponibilité androgénique libre ou intratesticulaire",
        "ko": "SHBG/알부민 결합 및 유리·고환내 안드로겐 가용성",
    },
    "ANDROGEN_RECEPTOR_SIGNAL": {
        "en": "AR/ZIP9 occupancy and post-receptor androgen-use capacity",
        "fi": "AR-/ZIP9-miehitys ja reseptorin jälkeinen androgeeninkäyttökapasiteetti",
        "ja": "AR/ZIP9占有率と受容体後アンドロゲン利用能力",
        "fr": "Occupation AR/ZIP9 et capacité d’utilisation post-récepteur des androgènes",
        "ko": "AR/ZIP9 점유율 및 수용체 후 안드로겐 사용 능력",
    },
    "BIOBEHAVIORAL_WEIGHTING": {
        "en": "Population distribution of biologically constrained behavioural weighting",
        "fi": "Biologisesti rajoittuneen käyttäytymispainotuksen populaatiojakauma",
        "ja": "生物学的に制約された行動重み付けの集団分布",
        "fr": "Distribution populationnelle de la pondération comportementale biologiquement contrainte",
        "ko": "생물학적으로 제약된 행동 가중치의 집단 분포",
    },
    "NARRATIVE_ATTRIBUTION": {
        "en": "Accessible narrative attribution of a partly latent behavioural state",
        "fi": "Osittain latentin käyttäytymistilan saavutettava narratiiviattribuutio",
        "ja": "部分的に潜在的な行動状態のアクセス可能な物語的帰属",
        "fr": "Attribution narrative accessible d’un état comportemental partiellement latent",
        "ko": "부분적으로 잠재된 행동 상태의 접근 가능한 서사적 귀인",
    },
    "EPISTAPEGE_OBSERVABILITY_LOSS": {
        "en": "Epistapege: upstream biological state omitted from the explanatory data model",
        "fi": "Epistapege: biologinen ylävirran tila puuttuu selittävästä datamallista",
        "ja": "エピスタペゲ：説明データモデルから上流の生物学的状態が欠落",
        "fr": "Epistapege : état biologique amont omis du modèle explicatif",
        "ko": "에피스타페게: 설명 데이터 모델에서 상류 생물학적 상태 누락",
    },
    "INSTITUTIONAL_MODEL_REUSE": {
        "en": "Institutional reuse of downstream reports as initiating explanatory variables",
        "fi": "Alavirran raporttien institutionaalinen uudelleenkäyttö alkavina selitysmuuttujina",
        "ja": "下流の報告を開始説明変数として制度的に再利用",
        "fr": "Réutilisation institutionnelle des rapports aval comme variables explicatives initiales",
        "ko": "하류 보고를 시작 설명 변수로 제도적으로 재사용",
    },
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
    if source == "LINDGREN_METRIC_DRIVE" and target == "BERM_L2_BRIDGE":
        return "derived_geometry"
    if source == "BERM_L2_BRIDGE":
        return "conditional_response"
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
        "berm-theory": {
            "id": "berm-theory",
            "contains": ["LINDGREN_METRIC_DRIVE"],
            "ui_level": 0,
        },
        "berm-l2": {
            "id": "berm-l2",
            "contains": ["BERM_L2_BRIDGE"],
            "ui_level": 1,
        },
        **ui_groups,
    }
    ui_groups["male"] = {
        "id": "male",
        "contains": [
            "MALE_SPERM",
            "MALE_GERMLINE_RESERVE",
            "MALE_STEROIDOGENESIS",
            "ANDROGEN_BINDING_AVAILABILITY",
            "ANDROGEN_RECEPTOR_SIGNAL",
        ],
        "ui_level": 4,
    }
    ui_groups["civilization"] = {
        "id": "civilization",
        "contains": [
            "BIOBEHAVIORAL_WEIGHTING",
            "NARRATIVE_ATTRIBUTION",
            "EPISTAPEGE_OBSERVABILITY_LOSS",
            "INSTITUTIONAL_MODEL_REUSE",
        ],
        "ui_level": 5,
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
