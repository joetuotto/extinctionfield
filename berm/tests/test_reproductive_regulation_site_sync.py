"""Regression gates for evidence identity, shared data and structural scope."""

from copy import deepcopy
import json

import pytest

from export_reproductive_regulation import (
    CATALOG, OUTPUTS, ROOT, build_reproductive_regulation_export, serialized_export,
)


def test_catalog_is_preserved_exactly_in_both_site_mirrors():
    catalog = json.loads(CATALOG.read_text())
    assert build_reproductive_regulation_export() == catalog
    expected = serialized_export()
    assert CATALOG.read_text() == expected
    assert all(path.read_text() == expected for path in OUTPUTS)


@pytest.mark.parametrize("mutation", [
    lambda data: data["studies"][0].update(evidenceKind="field_experiment"),
    lambda data: data["stagePolicy"].update(fieldAttribution="validated"),
    lambda data: data["stagePolicy"].update(quantitativeCalibration="complete"),
    lambda data: data["studies"][0].update(datasetIds=["missing-dataset"]),
    lambda data: data["studies"][0].update(familyId="missing-family"),
    lambda data: data["studies"][0].update(branches=["guessed-branch"]),
    lambda data: data["studies"][0].update(correctionReferenceIds=["missing-correction"]),
    lambda data: data["syntheses"][0].update(status="component_experiment"),
    lambda data: data["syntheses"][0].update(studyIds=["missing-study"]),
    lambda data: data["syntheses"][0].update(referenceIds=[]),
    lambda data: data["studies"].append(deepcopy(data["studies"][0])),
    lambda data: data["variableLabels"]["lh"].update(fi=""),
    lambda data: data["existingDatasets"][0].update(yearBasis="unspecified"),
])
def test_export_rejects_lost_provenance_and_upstream_evidence_promotion(tmp_path, mutation):
    data = json.loads(CATALOG.read_text())
    mutation(data)
    path = tmp_path / "invalid.json"
    path.write_text(json.dumps(data))
    with pytest.raises(ValueError):
        build_reproductive_regulation_export(path)


def test_shared_cohorts_are_not_presented_as_independent_data():
    data = build_reproductive_regulation_export()
    studies = {row["id"]: row for row in data["studies"]}
    assert studies["study.gettler2011"]["datasetIds"] == studies["study.gettler2013"]["datasetIds"]
    assert studies["study.gettler2011"]["familyId"] == studies["study.gettler2013"]["familyId"]
    assert len(studies["study.edwards2025"]["datasetIds"]) == 2
    assert "toor2020" in " ".join(studies["study.edwards2025"]["datasetIds"])
    assert studies["study.mills2023"]["familyId"] == studies["study.thurston2022"]["familyId"]
    assert studies["study.mills2023"]["datasetIds"] != studies["study.thurston2022"]["datasetIds"]
    assert studies["study.hoskova2022"]["correctionReferenceIds"] == ["hoskova2022_correction"]


def test_syntheses_resolve_to_draft_claims_and_structural_component_relations():
    data = build_reproductive_regulation_export()
    registry = json.loads((ROOT / "website/data/claims.json").read_text())
    claims = {row["id"]: row for row in registry["claims"]}
    graph = json.loads((ROOT / "website/data/causal-graph.json").read_text())
    for synthesis in data["syntheses"]:
        claim = claims[synthesis["claimId"]]
        assert claim["lifecycle"] == "draft"
        assert set(synthesis["nodeIds"]) <= set(graph["nodes"])
        relations = [row for row in registry["evidence_relations"] if row["claimId"] == claim["id"]]
        assert {row["referenceId"] for row in relations} == set(synthesis["referenceIds"])
        for relation in relations:
            assert relation["calibrationRole"] == "structural_only"
            assert relation["provenance"]["studyFamilyIds"]
            assert relation["provenance"]["datasetIds"]
            assert relation["provenance"]["status"] == "partial"
        assessment = next(row for row in registry["epistemic_assessments"] if row["claimId"] == claim["id"])
        assert assessment["level"] == "L*"
        assert assessment["compatibility"] == "incomplete"


def test_westbrook_2020_records_share_one_dataset_identifier():
    registry = json.loads((ROOT / "website/data/claims.json").read_text())
    relations = [row for row in registry["evidence_relations"] if row["referenceId"] == "westbrook2020_dopamine_effort"]
    assert len(relations) >= 2
    assert all(row["provenance"]["datasetFamilyIds"] == ["dataset.westbrook2020_dopamine_effort"] for row in relations)
    assert all(row["provenance"]["datasetIds"] == ["dataset.westbrook2020_dopamine_effort"] for row in relations)
