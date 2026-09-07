"""Registry and cross-runtime mirror tests for the DKC candidate route."""

from __future__ import annotations

from hashlib import sha256
import json
from pathlib import Path

import pytest

from berm.architecture import DKC_CANDIDATE_ROUTE_ID
from berm.dkc_registry import (
    VerificationGateFailure,
    VerificationOutcome,
    VerificationProtocolAudit,
    dkc_framework_registry,
    evaluate_verification_gate,
    require_verification_gate_for_publication,
)
from berm.evidence_protocol import AuditedEvaluationBundle
from export_dkc_framework import export_registry_for_publication


ROOT = Path(__file__).resolve().parents[2]


def passing_protocol_audit(*, point_count: int = 10) -> VerificationProtocolAudit:
    return VerificationProtocolAudit(
        protocol_id="test-locked-protocol",
        protocol_digest_sha256="a" * 64,
        evaluated_point_ids=tuple(f"V{number}" for number in range(1, point_count + 1)),
        protocolLockedBeforeSearch=True,
        completeSearchLog=True,
        eligibilityPrespecified=True,
        independentDualScreening=True,
        symmetricModelComparison=True,
        nullAndContradictoryEvidenceSearched=True,
        riskOfBiasComplete=True,
        exclusionsReasoned=True,
        protocolDeviationsDisclosed=True,
    )


def test_registry_ids_are_complete_and_unique() -> None:
    registry = dkc_framework_registry()
    assert registry["routeId"] == DKC_CANDIDATE_ROUTE_ID
    assert [item["id"] for item in registry["refinements"]] == [
        f"T{number}" for number in range(1, 13)
    ]
    assert [item["id"] for item in registry["predictions"]] == [
        f"F{number}" for number in range(1, 10)
    ]
    assert [item["id"] for item in registry["verificationPoints"]] == [
        f"V{number}" for number in range(1, 26)
    ]
    assert [item["id"] for item in registry["endpointTests"]] == [
        f"E{number}" for number in range(1, 7)
    ]
    assert [item["id"] for item in registry["internalTests"]] == [
        f"S{number}" for number in range(0, 7)
    ]
    assert [item["id"] for item in registry["tensorTests"]] == [
        "F_T1",
        "F_T2",
        "F_T3",
        "F_T4",
        "F_T5",
    ]
    assert all(
        item["epistemicStatus"].startswith("L3_") for item in registry["refinements"]
    )


def test_candidate_route_has_independently_locked_falsifiable_forecasts() -> None:
    status = dkc_framework_registry()["status"]
    assert status["calculationEnabled"] is True
    assert status["candidateOutputsEnabled"] is True
    assert status["l2Bridge"] == "OPEN"
    assert status["fieldStateCalibrated"] is True
    assert status["fieldStateCalibrationScope"] == (
        "CALIBRATION_PIPELINE_IMPLEMENTED_AND_PRODUCES_VALUES"
    )
    assert status["refinedM4CurrentDataStatus"] == "NOT_IDENTIFIABLE_WITH_CURRENT_DATA"
    assert status["supportsUncalibratedExecution"] is True
    assert status["publishesLockedForecasts"] is True
    predictions = dkc_framework_registry()["predictions"]
    assert all(item["locked"] for item in predictions)
    assert all(item["status"] == "LOCKED_FALSIFIABLE_FORECAST" for item in predictions)
    for item in predictions:
        assert item["mathematicalForm"]
        assert item["numericValue"]
        assert item["timeHorizon"]
        assert item["falsificationCriterion"]
        locked_payload = {
            key: item[key]
            for key in (
                "id",
                "statement",
                "test",
                "timing",
                "mathematicalForm",
                "numericValue",
                "timeHorizon",
                "falsificationCriterion",
                "lockRevision",
            )
        }
        lock_payload = json.dumps(
            locked_payload,
            ensure_ascii=False,
            sort_keys=True,
            separators=(",", ":"),
        )
        assert (
            item["lockDigestSha256"] == sha256(lock_payload.encode("utf-8")).hexdigest()
        )


def test_tensor_derivation_keeps_conditions_and_maxwell_assumptions_visible() -> None:
    derivation = dkc_framework_registry()["derivation"]
    assert "remains directional" in derivation["L1Conditions"]
    assert "Bianchi alone" in derivation["maxwellCaveat"]
    assert "EXPLICIT BRIDGE" in derivation["L2"]
    assert "geodesic-deviation" in derivation["selectionRule"]
    assert "biological closure" not in derivation["selectionRule"]
    assert derivation["provenancePolicy"] == "componentwise_no_weakest_link_collapse"
    assert derivation["spatialScalarReduction"] == {
        "conditions": "dimensionless, collinear and spacelike",
        "reductionStatus": "L2_EXPLICIT_BRIDGE",
        "directedDerivativeToMagnitude": "D_u volume -> |A_bar| -> chi(|A_bar|)",
        "observableIdentificationStatus": "L2_OPEN",
        "derivedCoefficientStatus": "L1_ALWAYS",
    }
    chain = derivation["formalThreeElementChain"]
    assert chain["implemented"] is True
    assert chain["requiresAll"] is True
    assert chain["epistemicStatus"] == "L1_DERIVED_FORMULAS"
    assert chain["gateStatus"] == "CONDITIONAL_INPUT_CONTRACT"
    assert chain["derivedStatusPreserved"] is True
    assert chain["actionPremise"] == "S=integral sqrt(-det g) R d^4x"
    assert chain["parallelActionPremises"] == [
        "EINSTEIN_HILBERT_WITH_LEVI_CIVITA_CURVATURE",
        "WEYL_METRIC_GRADIENT_HARMONIC_GME",
    ]
    assert chain["variationalEquation"] == "delta S/delta A_mu=0"
    assert "branch-selected numerical full-action" in chain["variationalResidual"]
    assert "R_outer=kappa R_GME" in chain["variationalResidual"]
    assert chain["fullEulerLagrangeRequired"] is True
    assert chain["fullEulerLagrangeEvidence"] == (
        "CONTENT_BOUND_NUMERICAL_RESIDUAL_AND_STRUCTURED_ATTESTATION_REQUIRED"
    )
    assert chain["inputProvenanceBinding"] == "NUMERIC_INPUT_BUNDLE_SHA256"
    assert chain["ehResidualComputation"] == (
        "FROM_SUPPLIED_POTENTIAL_AND_SUPPLIED_SYMMETRIC_EINSTEIN_TENSOR"
    )
    assert chain["metricCompatibilityCondition"] == "nabla^LC_sigma g_mu_nu=0"
    assert chain["weylSemimetricityCondition"] == (
        "tilde_nabla_sigma g_mu_nu=2 phi_sigma g_mu_nu"
    )
    assert chain["weylChecks"] == [
        "levi_civita_metric_compatibility",
        "semimetricity",
        "connection_reconstruction",
        "torsion_free",
    ]
    assert chain["bianchiChecks"] == [
        "levi_civita_contracted_identity",
        "field_definition_F_equals_dA",
        "same_field_derivative_attestation",
        "homogeneous_dF",
    ]
    assert chain["acceptanceAssertion"] == (
        "variational_check AND weyl_check AND bianchi_check"
    )
    assert chain["residualAcceptance"] == (
        "PER_RESIDUAL_ATOL_PLUS_RTOL_TIMES_REFERENCE_SCALE"
    )
    assert chain["elements"] == [
        "variational_harmonic_metric_gme",
        "weyl_semimetricity_and_connection",
        "bianchi_contracted_identity_and_homogeneous_df",
    ]
    assert set(chain["unitTests"]) == {
        "variational",
        "weyl",
        "leviCivitaMetricCompatibility",
        "bianchi",
    }
    assert chain["passMeaning"] == (
        "conditional_input_contract_not_independent_proof_or_physical_confirmation"
    )


def test_empirical_inputs_do_not_erase_l1_derived_status() -> None:
    registry = dkc_framework_registry()
    assert registry["status"]["epistemicStatusPolicy"] == (
        "COMPONENTWISE_NO_WEAKEST_LINK_COLLAPSE"
    )
    assert registry["status"]["derivedStatusPreserved"] is True
    tensor_tests = {item["id"]: item for item in registry["tensorTests"]}
    assert all(item["implemented"] is True for item in tensor_tests.values())
    assert tensor_tests["F_T4"]["status"] == (
        "L1_DERIVED_STRUCTURE_WITH_L3_EMPIRICAL_PARAMETERS"
    )
    assert tensor_tests["F_T5"]["status"] == (
        "L1_DERIVED_STRUCTURE_WITH_L3_EMPIRICAL_PARAMETERS"
    )
    assert tensor_tests["F_T2"]["formula"].endswith("approaches 1")
    assert "44.1 MHz" in tensor_tests["F_T4"]["formula"]


def test_verification_gate_reports_every_point_and_blocks_missing_critical() -> None:
    result = evaluate_verification_gate({})
    assert [item["id"] for item in result["points"]] == [
        f"V{number}" for number in range(1, 26)
    ]
    assert all(item["result"] == "FAIL" for item in result["points"])
    assert all(item["reason"] == "MISSING_EVALUATION" for item in result["points"])
    assert result["publicationAllowed"] is False
    assert result["criticalFailures"] == [f"V{number}" for number in range(1, 11)]
    assert result["missingEvaluations"] == [f"V{number}" for number in range(1, 26)]
    assert result["protocolAudit"]["reason"] == "MISSING_PROTOCOL_AUDIT"
    assert result["publicationBlockers"] == [
        *(f"V{number}" for number in range(1, 11)),
        "PROTOCOL_AUDIT",
    ]


def test_verification_gate_requires_all_critical_points_but_reports_noncritical() -> (
    None
):
    outcomes = {
        f"V{number}": VerificationOutcome(True, f"evidence-{number}")
        for number in range(1, 11)
    }
    result = evaluate_verification_gate(outcomes)
    assert result["publicationAllowed"] is False
    assert result["publicationBlockers"] == ["PROTOCOL_AUDIT"]
    with pytest.raises(VerificationGateFailure, match="PROTOCOL_AUDIT"):
        require_verification_gate_for_publication(outcomes)

    audit = passing_protocol_audit()
    result = evaluate_verification_gate(outcomes, protocol_audit=audit)
    assert result["publicationAllowed"] is True
    assert result["allPointsPassed"] is False
    assert result["criticalFailures"] == []
    assert result["missingEvaluations"] == [f"V{number}" for number in range(11, 26)]
    assert result["protocolAudit"]["passed"] is True
    assert (
        require_verification_gate_for_publication(outcomes, protocol_audit=audit)
        == result
    )

    outcomes["V10"] = VerificationOutcome(False, "registered contrast failed")
    blocked = evaluate_verification_gate(outcomes, protocol_audit=audit)
    assert blocked["publicationAllowed"] is False
    assert blocked["criticalFailures"] == ["V10"]
    with pytest.raises(VerificationGateFailure, match="V10") as error:
        require_verification_gate_for_publication(outcomes, protocol_audit=audit)
    assert error.value.result == blocked


def test_verification_gate_rejects_unknown_or_unexplained_results() -> None:
    with pytest.raises(ValueError, match="reason must be a non-empty string"):
        VerificationOutcome(True, " ")
    with pytest.raises(ValueError, match="unknown verification point"):
        evaluate_verification_gate({"V26": VerificationOutcome(True, "evidence")})
    with pytest.raises(ValueError, match="must be a VerificationOutcome"):
        evaluate_verification_gate({"V1": True})  # type: ignore[dict-item]


def test_publication_export_entrypoint_is_blocked_by_a_critical_failure(
    tmp_path: Path,
) -> None:
    output = tmp_path / "dkc-framework.json"
    evaluation_bundle = AuditedEvaluationBundle({}, passing_protocol_audit(), {})
    with pytest.raises(VerificationGateFailure, match="V1"):
        export_registry_for_publication(evaluation_bundle, outputs=(output,))
    assert not output.exists()


def test_publication_export_records_the_release_evaluation(tmp_path: Path) -> None:
    outcomes = {
        f"V{number}": VerificationOutcome(True, f"evidence-{number}")
        for number in range(1, 11)
    }
    audit = passing_protocol_audit()
    evaluation_bundle = AuditedEvaluationBundle(
        outcomes,
        audit,
        {
            "protocolId": audit.protocol_id,
            "protocolDigestSha256": audit.protocol_digest_sha256,
        },
    )
    output = tmp_path / "dkc-framework.json"
    assert export_registry_for_publication(evaluation_bundle, outputs=(output,)) == (
        output,
    )
    registry = json.loads(output.read_text(encoding="utf-8"))
    gate = registry["verificationGate"]
    assert gate["releaseAuthorized"] is True
    assert gate["releaseEvaluation"]["publicationAllowed"] is True
    assert gate["releaseEvaluation"]["criticalFailures"] == []
    assert gate["releaseEvaluation"]["protocolAudit"]["passed"] is True
    assert gate["evaluationBundleSummary"]["protocolId"] == audit.protocol_id


def test_registry_exposes_programmatic_v1_v25_gate() -> None:
    registry = dkc_framework_registry()
    gate = registry["verificationGate"]
    assert gate["implemented"] is True
    assert gate["enforcementFunction"] == "require_verification_gate_for_publication"
    assert gate["pointIds"] == [f"V{number}" for number in range(1, 26)]
    assert gate["criticalPointIds"] == [f"V{number}" for number in range(1, 11)]
    assert gate["publicationRule"] == ("all(V1..V10 == PASS) AND protocolAudit.passed")
    assert gate["unstructuredPassPolicy"] == "REJECT"
    assert gate["defaultEvaluation"]["publicationAllowed"] is False
    assert gate["defaultEvaluation"]["protocolAudit"]["passed"] is False
    assert all(point["gateImplemented"] for point in registry["verificationPoints"])


def test_website_mirrors_equal_the_python_registry() -> None:
    expected = dkc_framework_registry()
    for relative in (
        "website/data/dkc-framework.json",
        "website/public/data/dkc-framework.json",
    ):
        actual = json.loads((ROOT / relative).read_text(encoding="utf-8"))
        assert actual == expected
