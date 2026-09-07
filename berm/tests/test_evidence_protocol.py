"""Bias-resistant evidence-search and verification bundle contracts."""

from __future__ import annotations

from copy import deepcopy
import json

import pytest

from berm.evidence_protocol import (
    EvidenceProtocolValidationError,
    REQUIRED_BIAS_DOMAINS,
    protocol_digest_sha256,
    validate_evaluation_bundle,
)
from export_dkc_framework import load_evaluation_bundle


def _risk_of_bias() -> dict:
    return {
        domain: {
            "judgement": "LOW",
            "rationale": f"Prespecified low-risk assessment for {domain}",
            "direction": "UNPREDICTABLE",
        }
        for domain in REQUIRED_BIAS_DOMAINS
    }


def valid_bundle() -> dict:
    point_ids = [f"V{number}" for number in range(1, 11)]
    protocol = {
        "protocolId": "dkc-v1-v10-independent-audit",
        "version": "1.0.0",
        "researchQuestion": "Do the locked V1-V10 criteria pass under symmetric evaluation?",
        "registrationUri": "https://osf.io/example-registration/",
        "registeredAt": "2026-09-01T10:00:00+03:00",
        "lockedAt": "2026-09-01T10:05:00+03:00",
        "plannedVerificationPoints": point_ids,
        "eligibility": {
            "inclusionCriteria": ["Reports one of the registered V1-V10 outcomes"],
            "exclusionCriteria": ["No extractable registered outcome"],
            "criteriaLockedBeforeScreening": True,
        },
        "informationSources": [
            {
                "id": "pubmed",
                "name": "PubMed",
                "sourceType": "bibliographic_database",
                "independenceGroup": "biomedical-index",
                "rationale": "Primary biomedical report discovery",
            },
            {
                "id": "osf",
                "name": "OSF Registries",
                "sourceType": "trial_or_protocol_registry",
                "independenceGroup": "prospective-registries",
                "rationale": "Registered and unpublished protocol discovery",
            },
        ],
        "searchStrategies": [
            {
                "id": "q-pubmed",
                "sourceId": "pubmed",
                "exactQuery": "(electromagnetic OR radiofrequency) AND registered outcome",
                "directionAgnostic": True,
                "verificationPointIds": point_ids,
            },
            {
                "id": "q-osf",
                "sourceId": "osf",
                "exactQuery": "electromagnetic registered outcome",
                "directionAgnostic": True,
                "verificationPointIds": point_ids,
            },
        ],
        "searchStrategyReview": {
            "peerReviewed": True,
            "reviewerRole": "Independent information specialist",
            "responseDocumented": "All comments and resulting query changes archived",
        },
        "screening": {
            "reviewerCount": 2,
            "independent": True,
            "outcomeBlindEligibility": True,
            "conflictResolution": "Third-reviewer adjudication",
        },
        "dataExtraction": {
            "studyIsUnit": True,
            "doubleVerified": True,
            "fields": [
                "exposure_or_predictor",
                "comparator",
                "outcome",
                "effect_estimate",
                "uncertainty",
                "funding",
                "conflicts",
                "preregistration",
            ],
        },
        "analysisPlan": {
            "modelPredictions": {
                "BERM": "Use the locked V-point criterion without post-hoc changes",
                "CONVENTIONAL": "Evaluate the same endpoint under the named alternative",
                "NULL": "No registered contrast",
            },
            "sameDecisionThresholdsForAllModels": True,
            "missingDataPlan": "Report missingness and run complete-case sensitivity analysis",
            "multiplicityPlan": "Report all V-points and control the prespecified family",
            "stoppingRule": "Stop only after all registered sources and updates are searched",
            "sensitivityAnalyses": ["Exclude high-risk studies"],
        },
        "biasPolicy": {
            "sameDomainsForAllModels": True,
            "directionOnlyWithJustification": True,
            "domains": list(REQUIRED_BIAS_DOMAINS),
        },
        "automation": {
            "used": True,
            "humanVerifiesAllExclusionsAndExtractions": True,
        },
    }
    protocol["protocolDigestSha256"] = protocol_digest_sha256(protocol)
    digest = protocol["protocolDigestSha256"]
    return {
        "schemaVersion": 1,
        "protocol": protocol,
        "execution": {
            "protocolDigestSha256": digest,
            "startedAt": "2026-09-02T09:00:00+03:00",
            "searchLog": [
                {
                    "strategyId": "q-pubmed",
                    "executedAt": "2026-09-02T09:01:00+03:00",
                    "recordsFound": 2,
                    "exportDigestSha256": "a" * 64,
                },
                {
                    "strategyId": "q-osf",
                    "executedAt": "2026-09-02T09:02:00+03:00",
                    "recordsFound": 1,
                    "exportDigestSha256": "b" * 64,
                },
            ],
            "flow": {
                "identified": 3,
                "duplicatesRemoved": 1,
                "screened": 2,
                "fullTextAssessed": 2,
                "included": 1,
            },
            "protocolDeviations": [],
            "studyDecisions": [
                {
                    "studyId": "study-1",
                    "reportIds": ["doi:10.0000/example"],
                    "decision": "INCLUDE",
                    "verificationPointIds": point_ids,
                    "designType": "mixed registered evidence synthesis",
                    "riskOfBiasTool": "RoB 2 or ROBINS-I selected by result design",
                    "evidenceDirectionByVerificationPoint": {
                        identifier: "MIXED" for identifier in point_ids
                    },
                    "riskOfBiasByVerificationPoint": {
                        identifier: _risk_of_bias() for identifier in point_ids
                    },
                    "funding": "Public funding",
                    "conflicts": "None reported",
                    "publicationStatus": "published",
                    "extractionVerifiedBySecondReviewer": True,
                    "riskOfBias": _risk_of_bias(),
                },
                {
                    "studyId": "study-2",
                    "reportIds": ["registry:example-2"],
                    "decision": "EXCLUDE",
                    "exclusionReason": "No extractable registered outcome",
                },
            ],
        },
        "outcomes": {
            identifier: {
                "result": "PASS",
                "reason": f"Registered criterion met for {identifier}",
                "criterionPreSpecified": True,
                "evidenceStudyIds": ["study-1"],
                "bermPrediction": f"Locked BERM prediction for {identifier}",
                "conventionalPrediction": f"Locked conventional prediction for {identifier}",
                "nullPrediction": f"Locked null prediction for {identifier}",
                "modelComparison": "NON_DISCRIMINATING",
                "discriminatingPower": "NONE",
                "effectEstimate": "registered estimate",
                "uncertainty": "registered confidence interval",
                "counterevidenceSearched": True,
                "riskOfBiasIntegrated": True,
                "analysisArtifactSha256": "c" * 64,
                "robustnessChecks": ["Exclude high-risk studies"],
                "protocolDeviationIds": [],
            }
            for identifier in point_ids
        },
    }


def _redigest(bundle: dict) -> None:
    digest = protocol_digest_sha256(bundle["protocol"])
    bundle["protocol"]["protocolDigestSha256"] = digest
    bundle["execution"]["protocolDigestSha256"] = digest


def test_complete_bundle_produces_content_bound_protocol_audit() -> None:
    audited = validate_evaluation_bundle(valid_bundle())
    assert audited.protocol_audit.passed is True
    assert audited.protocol_audit.evaluated_point_ids == tuple(
        f"V{number}" for number in range(1, 11)
    )
    assert audited.summary["identifiedRecords"] == 3
    assert audited.summary["includedStudies"] == 1
    assert all(outcome.passed for outcome in audited.outcomes.values())


def test_protocol_digest_detects_post_lock_changes() -> None:
    bundle = valid_bundle()
    bundle["protocol"]["analysisPlan"]["stoppingRule"] = (
        "Stop after a favourable result"
    )
    with pytest.raises(EvidenceProtocolValidationError, match="digest mismatch"):
        validate_evaluation_bundle(bundle)


def test_search_cannot_start_before_protocol_lock() -> None:
    bundle = valid_bundle()
    bundle["execution"]["startedAt"] = "2026-08-31T09:00:00+03:00"
    with pytest.raises(EvidenceProtocolValidationError, match="must not precede"):
        validate_evaluation_bundle(bundle)


def test_every_registered_direction_agnostic_search_must_be_logged() -> None:
    bundle = valid_bundle()
    bundle["execution"]["searchLog"].pop()
    bundle["execution"]["flow"] = {
        "identified": 2,
        "duplicatesRemoved": 0,
        "screened": 2,
        "fullTextAssessed": 2,
        "included": 1,
    }
    with pytest.raises(
        EvidenceProtocolValidationError, match="missing registered strategy"
    ):
        validate_evaluation_bundle(bundle)


def test_directional_search_and_single_reviewer_screening_are_rejected() -> None:
    bundle = valid_bundle()
    bundle["protocol"]["searchStrategies"][0]["directionAgnostic"] = False
    _redigest(bundle)
    with pytest.raises(EvidenceProtocolValidationError, match="directionAgnostic"):
        validate_evaluation_bundle(bundle)

    bundle = valid_bundle()
    bundle["protocol"]["screening"]["reviewerCount"] = 1
    _redigest(bundle)
    with pytest.raises(EvidenceProtocolValidationError, match="reviewerCount"):
        validate_evaluation_bundle(bundle)


def test_model_comparison_and_bias_domains_must_be_symmetric() -> None:
    bundle = valid_bundle()
    del bundle["protocol"]["analysisPlan"]["modelPredictions"]["CONVENTIONAL"]
    _redigest(bundle)
    with pytest.raises(EvidenceProtocolValidationError, match="CONVENTIONAL"):
        validate_evaluation_bundle(bundle)

    bundle = valid_bundle()
    del bundle["execution"]["studyDecisions"][0]["riskOfBiasByVerificationPoint"]["V1"][
        "confounding"
    ]
    with pytest.raises(EvidenceProtocolValidationError, match="confounding"):
        validate_evaluation_bundle(bundle)


def test_exclusions_and_pass_results_require_auditable_reasons_and_evidence() -> None:
    bundle = valid_bundle()
    bundle["execution"]["studyDecisions"][1]["exclusionReason"] = ""
    with pytest.raises(EvidenceProtocolValidationError, match="exclusionReason"):
        validate_evaluation_bundle(bundle)

    bundle = valid_bundle()
    bundle["outcomes"]["V1"]["evidenceStudyIds"] = []
    with pytest.raises(EvidenceProtocolValidationError, match="PASS result requires"):
        validate_evaluation_bundle(bundle)


def test_prisma_flow_counts_must_reconcile() -> None:
    bundle = deepcopy(valid_bundle())
    bundle["execution"]["flow"]["screened"] = 3
    with pytest.raises(
        EvidenceProtocolValidationError, match="identified - duplicatesRemoved"
    ):
        validate_evaluation_bundle(bundle)


def test_publication_loader_rejects_legacy_unstructured_pass_file(tmp_path) -> None:
    legacy = tmp_path / "legacy-outcomes.json"
    legacy.write_text(
        json.dumps({"V1": {"result": "PASS", "reason": "favourable"}}),
        encoding="utf-8",
    )
    with pytest.raises(EvidenceProtocolValidationError, match="schemaVersion"):
        load_evaluation_bundle(legacy)


def test_publication_loader_returns_only_a_validated_bundle(tmp_path) -> None:
    path = tmp_path / "evaluation-bundle.json"
    path.write_text(json.dumps(valid_bundle()), encoding="utf-8")
    audited = load_evaluation_bundle(path)
    assert audited.protocol_audit.passed is True
    assert audited.outcomes["V1"].passed is True
