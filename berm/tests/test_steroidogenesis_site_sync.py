"""The research catalog and model structure must survive the site export."""

from copy import deepcopy
import json

import pytest

from export_steroidogenesis import CATALOG, OUTPUTS, build_steroidogenesis_export, serialized_export
from berm.biology.cross_pathway_synthesis import EVIDENCE_SYNTHESIS_CLUSTERS
from berm.modulome.steroidogenesis import steroidogenesis_structure


def fixture_catalog():
    return {
        "version": "fixture-v1", "modelOwner": "BERM", "stagePolicy": {"currentStage": 1},
        "studies": [{"id": "component", "referenceId": "fixture-ref", "familyId": "family",
                     "evidenceKind": "component_experiment", "studyDesign": "genetic"}],
        "syntheses": [{"id": "synthesis", "studyIds": ["component"]}],
        "states": [{"id": "glutathione-equivalent-pool"}],
        "families": [{"id": "family", "independenceVerified": False}],
        "copy": {"en": {"title": "Fixture"}, "fi": {"title": "Koetietue"}},
    }


def test_export_retains_catalog_and_adds_only_computed_structure(tmp_path):
    catalog = fixture_catalog()
    path = tmp_path / "catalog.json"
    path.write_text(json.dumps(catalog), encoding="utf-8")
    exported = build_steroidogenesis_export(path)
    assert {key: value for key, value in exported.items() if key != "modelStructure"} == catalog
    assert exported["modelStructure"] == steroidogenesis_structure()
    assert serialized_export(path) == serialized_export(path)
    assert all(value is None for value in exported["modelStructure"]["openParameters"].values())


@pytest.mark.parametrize("mutation", [
    lambda catalog: catalog["studies"].append(deepcopy(catalog["studies"][0])),
    lambda catalog: catalog["studies"][0].update(familyId="missing"),
    lambda catalog: catalog["studies"][0].update(evidenceKind="synthesis"),
    lambda catalog: catalog["syntheses"][0].update(studyIds=["missing"]),
])
def test_export_rejects_broken_ids_and_evidence_type_collapse(tmp_path, mutation):
    catalog = fixture_catalog()
    mutation(catalog)
    path = tmp_path / "invalid.json"
    path.write_text(json.dumps(catalog), encoding="utf-8")
    with pytest.raises(ValueError):
        build_steroidogenesis_export(path)


def test_both_site_mirrors_match_the_canonical_catalog_and_model():
    expected = serialized_export()
    for path in OUTPUTS:
        assert path.read_text(encoding="utf-8") == expected
    catalog = json.loads(CATALOG.read_text(encoding="utf-8"))
    exported = json.loads(expected)
    assert exported["studies"] == catalog["studies"]
    assert exported["syntheses"] == catalog["syntheses"]
    assert exported["families"] == catalog["families"]
    assert exported["copy"] == catalog["copy"]


def test_model_synthesis_relations_resolve_to_registered_component_claim():
    cluster = next(item for item in EVIDENCE_SYNTHESIS_CLUSTERS if item.id == "calcium-redox-steroidogenesis")
    from pathlib import Path
    claims = json.loads((Path(__file__).resolve().parents[2] / "website/data/claims.json").read_text(encoding="utf-8"))
    relations = {row["id"]: row for row in claims["evidence_relations"]}
    assert set(cluster.relation_ids) <= set(relations)
    assert all(relations[identifier]["claimId"] == cluster.claim_id for identifier in cluster.relation_ids)
