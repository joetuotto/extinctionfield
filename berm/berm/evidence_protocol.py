"""Auditable, symmetric evidence-search protocol for DKC verification.

This module validates method and provenance, not scientific truth.  A bundle
may contain PASS results only after its protocol was content-locked before the
first search, every planned query was logged, eligibility was screened without
seeing outcome direction, both competing and null models were specified, and
all included results received the same risk-of-bias treatment.

The protocol deliberately keeps three decisions separate:

* whether a registered V-point criterion was met;
* whether the result discriminates BERM from conventional or null models; and
* whether the complete release gate may authorize publication.

No one of these decisions is allowed to stand in for another.
"""

from __future__ import annotations

from copy import deepcopy
from dataclasses import dataclass
from datetime import datetime
from hashlib import sha256
import json
import re
from typing import Mapping, Sequence

from berm.dkc_registry import (
    VERIFICATION_POINTS,
    VerificationOutcome,
    VerificationProtocolAudit,
)


SCHEMA_VERSION = 1

REQUIRED_BIAS_DOMAINS = (
    "selection",
    "exposure_measurement",
    "outcome_measurement",
    "confounding",
    "missing_data",
    "selective_reporting",
    "funding_conflicts",
)

REQUIRED_EXTRACTION_FIELDS = (
    "exposure_or_predictor",
    "comparator",
    "outcome",
    "effect_estimate",
    "uncertainty",
    "funding",
    "conflicts",
    "preregistration",
)

ALLOWED_SOURCE_TYPES = {
    "bibliographic_database",
    "trial_or_protocol_registry",
    "primary_data_repository",
    "official_statistics",
    "regulatory_or_grey_literature",
    "citation_chaining",
}

ALLOWED_RISK_JUDGEMENTS = {
    "LOW",
    "SOME_CONCERNS",
    "HIGH",
    "NO_INFORMATION",
}

ALLOWED_BIAS_DIRECTIONS = {
    "TOWARD_NULL",
    "AWAY_FROM_NULL",
    "FAVOURS_REGISTERED_CLAIM",
    "FAVOURS_ALTERNATIVE",
    "UNPREDICTABLE",
}

ALLOWED_EVIDENCE_DIRECTIONS = {
    "SUPPORTS_REGISTERED_CLAIM",
    "CONTRADICTS_REGISTERED_CLAIM",
    "NULL_OR_INCONCLUSIVE",
    "MIXED",
}

ALLOWED_MODEL_COMPARISONS = {
    "BERM_BETTER",
    "CONVENTIONAL_BETTER",
    "NULL_BETTER",
    "NON_DISCRIMINATING",
    "INCONCLUSIVE",
}

ALLOWED_DISCRIMINATING_POWER = {"HIGH", "MODERATE", "LOW", "NONE"}

_SHA256_PATTERN = re.compile(r"^[0-9a-f]{64}$")


class EvidenceProtocolValidationError(ValueError):
    """Raised when an evidence bundle is incomplete, mutable or asymmetric."""


@dataclass(frozen=True)
class AuditedEvaluationBundle:
    """Validated outcomes together with their independent method audit."""

    outcomes: Mapping[str, VerificationOutcome]
    protocol_audit: VerificationProtocolAudit
    summary: Mapping[str, object]


def _fail(path: str, message: str) -> None:
    raise EvidenceProtocolValidationError(f"{path}: {message}")


def _mapping(value: object, path: str) -> Mapping[str, object]:
    if not isinstance(value, Mapping):
        _fail(path, "must be an object")
    return value


def _sequence(value: object, path: str) -> Sequence[object]:
    if isinstance(value, (str, bytes)) or not isinstance(value, Sequence):
        _fail(path, "must be an array")
    return value


def _text(value: object, path: str) -> str:
    if not isinstance(value, str) or not value.strip():
        _fail(path, "must be a non-empty string")
    return value.strip()


def _true(value: object, path: str) -> None:
    if value is not True:
        _fail(path, "must be true")


def _integer(value: object, path: str, *, minimum: int = 0) -> int:
    if type(value) is not int or value < minimum:
        _fail(path, f"must be an integer >= {minimum}")
    return value


def _timestamp(value: object, path: str) -> datetime:
    raw = _text(value, path)
    try:
        parsed = datetime.fromisoformat(raw.replace("Z", "+00:00"))
    except ValueError as error:
        raise EvidenceProtocolValidationError(
            f"{path}: must be an ISO-8601 timestamp"
        ) from error
    if parsed.tzinfo is None:
        _fail(path, "must include a timezone")
    return parsed


def _sha256(value: object, path: str) -> str:
    digest = _text(value, path).lower()
    if not _SHA256_PATTERN.fullmatch(digest):
        _fail(path, "must be a SHA-256 hex digest")
    return digest


def _unique_texts(value: object, path: str) -> tuple[str, ...]:
    items = tuple(
        _text(item, f"{path}[{index}]")
        for index, item in enumerate(_sequence(value, path))
    )
    if not items:
        _fail(path, "must not be empty")
    if len(set(items)) != len(items):
        _fail(path, "must contain unique values")
    return items


def protocol_digest_sha256(protocol: Mapping[str, object]) -> str:
    """Return the canonical digest, excluding the digest field itself."""

    canonical = deepcopy(dict(protocol))
    canonical.pop("protocolDigestSha256", None)
    payload = json.dumps(
        canonical,
        ensure_ascii=False,
        sort_keys=True,
        separators=(",", ":"),
    )
    return sha256(payload.encode("utf-8")).hexdigest()


def _validate_protocol(
    protocol: Mapping[str, object], known_point_ids: set[str]
) -> tuple[str, str, datetime, tuple[str, ...], dict[str, set[str]]]:
    protocol_id = _text(protocol.get("protocolId"), "protocol.protocolId")
    _text(protocol.get("version"), "protocol.version")
    _text(protocol.get("researchQuestion"), "protocol.researchQuestion")
    _text(protocol.get("registrationUri"), "protocol.registrationUri")
    registered_at = _timestamp(protocol.get("registeredAt"), "protocol.registeredAt")
    locked_at = _timestamp(protocol.get("lockedAt"), "protocol.lockedAt")
    if registered_at > locked_at:
        _fail("protocol.registeredAt", "must not be later than protocol.lockedAt")
    supplied_digest = _sha256(
        protocol.get("protocolDigestSha256"),
        "protocol.protocolDigestSha256",
    )
    expected_digest = protocol_digest_sha256(protocol)
    if supplied_digest != expected_digest:
        _fail(
            "protocol.protocolDigestSha256",
            f"digest mismatch; expected {expected_digest}",
        )

    planned_point_ids = _unique_texts(
        protocol.get("plannedVerificationPoints"),
        "protocol.plannedVerificationPoints",
    )
    unknown_points = sorted(set(planned_point_ids) - known_point_ids)
    if unknown_points:
        _fail(
            "protocol.plannedVerificationPoints",
            "unknown V-point(s): " + ", ".join(unknown_points),
        )

    eligibility = _mapping(protocol.get("eligibility"), "protocol.eligibility")
    _unique_texts(
        eligibility.get("inclusionCriteria"), "protocol.eligibility.inclusionCriteria"
    )
    _unique_texts(
        eligibility.get("exclusionCriteria"), "protocol.eligibility.exclusionCriteria"
    )
    _true(
        eligibility.get("criteriaLockedBeforeScreening"),
        "protocol.eligibility.criteriaLockedBeforeScreening",
    )

    sources = _sequence(
        protocol.get("informationSources"), "protocol.informationSources"
    )
    if len(sources) < 2:
        _fail(
            "protocol.informationSources",
            "must contain at least two independent source systems",
        )
    source_ids: set[str] = set()
    source_types: set[str] = set()
    source_independence_groups: set[str] = set()
    for index, raw_source in enumerate(sources):
        path = f"protocol.informationSources[{index}]"
        source = _mapping(raw_source, path)
        source_id = _text(source.get("id"), f"{path}.id")
        if source_id in source_ids:
            _fail(f"{path}.id", "must be unique")
        source_ids.add(source_id)
        _text(source.get("name"), f"{path}.name")
        source_type = _text(source.get("sourceType"), f"{path}.sourceType")
        if source_type not in ALLOWED_SOURCE_TYPES:
            _fail(f"{path}.sourceType", "is not an allowed source type")
        source_types.add(source_type)
        source_independence_groups.add(
            _text(source.get("independenceGroup"), f"{path}.independenceGroup")
        )
        _text(source.get("rationale"), f"{path}.rationale")
    if len(source_independence_groups) < 2:
        _fail(
            "protocol.informationSources",
            "must contain at least two declared independence groups",
        )
    if "bibliographic_database" not in source_types:
        _fail("protocol.informationSources", "must include a bibliographic database")
    if not source_types.intersection(
        {"trial_or_protocol_registry", "primary_data_repository", "official_statistics"}
    ):
        _fail(
            "protocol.informationSources",
            "must include a registry, primary-data repository or official-statistics source",
        )

    strategies = _sequence(
        protocol.get("searchStrategies"), "protocol.searchStrategies"
    )
    strategy_ids: set[str] = set()
    strategy_points: dict[str, set[str]] = {}
    for index, raw_strategy in enumerate(strategies):
        path = f"protocol.searchStrategies[{index}]"
        strategy = _mapping(raw_strategy, path)
        strategy_id = _text(strategy.get("id"), f"{path}.id")
        if strategy_id in strategy_ids:
            _fail(f"{path}.id", "must be unique")
        strategy_ids.add(strategy_id)
        source_id = _text(strategy.get("sourceId"), f"{path}.sourceId")
        if source_id not in source_ids:
            _fail(f"{path}.sourceId", "does not reference an information source")
        _text(strategy.get("exactQuery"), f"{path}.exactQuery")
        _true(strategy.get("directionAgnostic"), f"{path}.directionAgnostic")
        point_ids = set(
            _unique_texts(
                strategy.get("verificationPointIds"),
                f"{path}.verificationPointIds",
            )
        )
        if not point_ids.issubset(planned_point_ids):
            _fail(f"{path}.verificationPointIds", "contains an unplanned V-point")
        strategy_points[strategy_id] = point_ids
    covered_points = (
        set().union(*strategy_points.values()) if strategy_points else set()
    )
    uncovered_points = sorted(set(planned_point_ids) - covered_points)
    if uncovered_points:
        _fail(
            "protocol.searchStrategies",
            "no registered search covers: " + ", ".join(uncovered_points),
        )

    search_review = _mapping(
        protocol.get("searchStrategyReview"), "protocol.searchStrategyReview"
    )
    _true(
        search_review.get("peerReviewed"), "protocol.searchStrategyReview.peerReviewed"
    )
    _text(
        search_review.get("reviewerRole"), "protocol.searchStrategyReview.reviewerRole"
    )
    _text(
        search_review.get("responseDocumented"),
        "protocol.searchStrategyReview.responseDocumented",
    )

    screening = _mapping(protocol.get("screening"), "protocol.screening")
    if (
        _integer(
            screening.get("reviewerCount"),
            "protocol.screening.reviewerCount",
            minimum=2,
        )
        < 2
    ):
        _fail("protocol.screening.reviewerCount", "must be at least two")
    _true(screening.get("independent"), "protocol.screening.independent")
    _true(
        screening.get("outcomeBlindEligibility"),
        "protocol.screening.outcomeBlindEligibility",
    )
    _text(screening.get("conflictResolution"), "protocol.screening.conflictResolution")

    extraction = _mapping(protocol.get("dataExtraction"), "protocol.dataExtraction")
    _true(extraction.get("studyIsUnit"), "protocol.dataExtraction.studyIsUnit")
    _true(extraction.get("doubleVerified"), "protocol.dataExtraction.doubleVerified")
    fields = set(
        _unique_texts(extraction.get("fields"), "protocol.dataExtraction.fields")
    )
    missing_fields = sorted(set(REQUIRED_EXTRACTION_FIELDS) - fields)
    if missing_fields:
        _fail("protocol.dataExtraction.fields", "missing: " + ", ".join(missing_fields))

    analysis = _mapping(protocol.get("analysisPlan"), "protocol.analysisPlan")
    models = _mapping(
        analysis.get("modelPredictions"), "protocol.analysisPlan.modelPredictions"
    )
    for model in ("BERM", "CONVENTIONAL", "NULL"):
        _text(models.get(model), f"protocol.analysisPlan.modelPredictions.{model}")
    _true(
        analysis.get("sameDecisionThresholdsForAllModels"),
        "protocol.analysisPlan.sameDecisionThresholdsForAllModels",
    )
    _text(analysis.get("missingDataPlan"), "protocol.analysisPlan.missingDataPlan")
    _text(analysis.get("multiplicityPlan"), "protocol.analysisPlan.multiplicityPlan")
    _text(analysis.get("stoppingRule"), "protocol.analysisPlan.stoppingRule")
    _unique_texts(
        analysis.get("sensitivityAnalyses"),
        "protocol.analysisPlan.sensitivityAnalyses",
    )

    bias_policy = _mapping(protocol.get("biasPolicy"), "protocol.biasPolicy")
    _true(
        bias_policy.get("sameDomainsForAllModels"),
        "protocol.biasPolicy.sameDomainsForAllModels",
    )
    _true(
        bias_policy.get("directionOnlyWithJustification"),
        "protocol.biasPolicy.directionOnlyWithJustification",
    )
    domains = set(
        _unique_texts(bias_policy.get("domains"), "protocol.biasPolicy.domains")
    )
    missing_domains = sorted(set(REQUIRED_BIAS_DOMAINS) - domains)
    if missing_domains:
        _fail("protocol.biasPolicy.domains", "missing: " + ", ".join(missing_domains))

    automation = _mapping(protocol.get("automation"), "protocol.automation")
    if type(automation.get("used")) is not bool:
        _fail("protocol.automation.used", "must be boolean")
    _true(
        automation.get("humanVerifiesAllExclusionsAndExtractions"),
        "protocol.automation.humanVerifiesAllExclusionsAndExtractions",
    )

    return protocol_id, supplied_digest, locked_at, planned_point_ids, strategy_points


def _validate_bias_assessment(value: object, path: str) -> None:
    assessment = _mapping(value, path)
    for domain in REQUIRED_BIAS_DOMAINS:
        domain_path = f"{path}.{domain}"
        item = _mapping(assessment.get(domain), domain_path)
        judgement = _text(item.get("judgement"), f"{domain_path}.judgement")
        if judgement not in ALLOWED_RISK_JUDGEMENTS:
            _fail(f"{domain_path}.judgement", "is not an allowed judgement")
        _text(item.get("rationale"), f"{domain_path}.rationale")
        direction = _text(item.get("direction"), f"{domain_path}.direction")
        if direction not in ALLOWED_BIAS_DIRECTIONS:
            _fail(f"{domain_path}.direction", "is not an allowed direction")


def validate_evaluation_bundle(raw: Mapping[str, object]) -> AuditedEvaluationBundle:
    """Validate a complete search/execution/outcome bundle.

    Validation is intentionally strict.  Missing information fails closed and
    is never converted into favourable evidence or a release authorization.
    """

    bundle = _mapping(raw, "bundle")
    if bundle.get("schemaVersion") != SCHEMA_VERSION:
        _fail("schemaVersion", f"must equal {SCHEMA_VERSION}")
    known_point_ids = {row[0] for row in VERIFICATION_POINTS}
    protocol = _mapping(bundle.get("protocol"), "protocol")
    (
        protocol_id,
        protocol_digest,
        locked_at,
        planned_point_ids,
        strategy_points,
    ) = _validate_protocol(protocol, known_point_ids)

    execution = _mapping(bundle.get("execution"), "execution")
    if (
        _sha256(execution.get("protocolDigestSha256"), "execution.protocolDigestSha256")
        != protocol_digest
    ):
        _fail("execution.protocolDigestSha256", "does not match the locked protocol")
    started_at = _timestamp(execution.get("startedAt"), "execution.startedAt")
    if started_at < locked_at:
        _fail("execution.startedAt", "must not precede protocol.lockedAt")

    logs = _sequence(execution.get("searchLog"), "execution.searchLog")
    logged_strategy_ids: set[str] = set()
    total_hits = 0
    for index, raw_log in enumerate(logs):
        path = f"execution.searchLog[{index}]"
        log = _mapping(raw_log, path)
        strategy_id = _text(log.get("strategyId"), f"{path}.strategyId")
        if strategy_id not in strategy_points:
            _fail(f"{path}.strategyId", "does not reference a registered strategy")
        if strategy_id in logged_strategy_ids:
            _fail(f"{path}.strategyId", "must appear exactly once")
        logged_strategy_ids.add(strategy_id)
        executed_at = _timestamp(log.get("executedAt"), f"{path}.executedAt")
        if executed_at < locked_at:
            _fail(f"{path}.executedAt", "must not precede protocol.lockedAt")
        total_hits += _integer(log.get("recordsFound"), f"{path}.recordsFound")
        _sha256(log.get("exportDigestSha256"), f"{path}.exportDigestSha256")
    missing_logs = sorted(set(strategy_points) - logged_strategy_ids)
    if missing_logs:
        _fail(
            "execution.searchLog",
            "missing registered strategy log(s): " + ", ".join(missing_logs),
        )

    flow = _mapping(execution.get("flow"), "execution.flow")
    identified = _integer(flow.get("identified"), "execution.flow.identified")
    duplicates_removed = _integer(
        flow.get("duplicatesRemoved"), "execution.flow.duplicatesRemoved"
    )
    screened = _integer(flow.get("screened"), "execution.flow.screened")
    full_text = _integer(
        flow.get("fullTextAssessed"), "execution.flow.fullTextAssessed"
    )
    included = _integer(flow.get("included"), "execution.flow.included")
    if identified != total_hits:
        _fail(
            "execution.flow.identified", "must equal the sum of search-log recordsFound"
        )
    if screened != identified - duplicates_removed:
        _fail("execution.flow.screened", "must equal identified - duplicatesRemoved")
    if not 0 <= included <= full_text <= screened:
        _fail(
            "execution.flow",
            "must satisfy 0 <= included <= fullTextAssessed <= screened",
        )

    deviations = _sequence(
        execution.get("protocolDeviations"), "execution.protocolDeviations"
    )
    deviation_ids: set[str] = set()
    for index, raw_deviation in enumerate(deviations):
        path = f"execution.protocolDeviations[{index}]"
        deviation = _mapping(raw_deviation, path)
        deviation_id = _text(deviation.get("id"), f"{path}.id")
        if deviation_id in deviation_ids:
            _fail(f"{path}.id", "must be unique")
        deviation_ids.add(deviation_id)
        _text(deviation.get("description"), f"{path}.description")
        _text(deviation.get("reason"), f"{path}.reason")
        _text(deviation.get("impactAssessment"), f"{path}.impactAssessment")

    studies = _sequence(execution.get("studyDecisions"), "execution.studyDecisions")
    study_by_id: dict[str, Mapping[str, object]] = {}
    included_study_ids: set[str] = set()
    for index, raw_study in enumerate(studies):
        path = f"execution.studyDecisions[{index}]"
        study = _mapping(raw_study, path)
        study_id = _text(study.get("studyId"), f"{path}.studyId")
        if study_id in study_by_id:
            _fail(
                f"{path}.studyId",
                "must be unique; combine multiple reports under one study",
            )
        study_by_id[study_id] = study
        _unique_texts(study.get("reportIds"), f"{path}.reportIds")
        decision = _text(study.get("decision"), f"{path}.decision")
        if decision not in {"INCLUDE", "EXCLUDE"}:
            _fail(f"{path}.decision", "must be INCLUDE or EXCLUDE")
        if decision == "EXCLUDE":
            _text(study.get("exclusionReason"), f"{path}.exclusionReason")
            continue
        included_study_ids.add(study_id)
        point_ids = set(
            _unique_texts(
                study.get("verificationPointIds"), f"{path}.verificationPointIds"
            )
        )
        if not point_ids.issubset(planned_point_ids):
            _fail(f"{path}.verificationPointIds", "contains an unplanned V-point")
        _text(study.get("designType"), f"{path}.designType")
        _text(study.get("riskOfBiasTool"), f"{path}.riskOfBiasTool")
        directions = _mapping(
            study.get("evidenceDirectionByVerificationPoint"),
            f"{path}.evidenceDirectionByVerificationPoint",
        )
        risk_by_point = _mapping(
            study.get("riskOfBiasByVerificationPoint"),
            f"{path}.riskOfBiasByVerificationPoint",
        )
        if set(directions) != point_ids:
            _fail(
                f"{path}.evidenceDirectionByVerificationPoint",
                "must contain exactly the study's verificationPointIds",
            )
        if set(risk_by_point) != point_ids:
            _fail(
                f"{path}.riskOfBiasByVerificationPoint",
                "must contain exactly the study's verificationPointIds",
            )
        for point_id in point_ids:
            direction = _text(
                directions.get(point_id),
                f"{path}.evidenceDirectionByVerificationPoint.{point_id}",
            )
            if direction not in ALLOWED_EVIDENCE_DIRECTIONS:
                _fail(
                    f"{path}.evidenceDirectionByVerificationPoint.{point_id}",
                    "is not an allowed direction",
                )
            _validate_bias_assessment(
                risk_by_point.get(point_id),
                f"{path}.riskOfBiasByVerificationPoint.{point_id}",
            )
        _text(study.get("funding"), f"{path}.funding")
        _text(study.get("conflicts"), f"{path}.conflicts")
        _text(study.get("publicationStatus"), f"{path}.publicationStatus")
        _true(
            study.get("extractionVerifiedBySecondReviewer"),
            f"{path}.extractionVerifiedBySecondReviewer",
        )
    if len(included_study_ids) != included:
        _fail(
            "execution.flow.included",
            "must equal the number of INCLUDE study decisions",
        )

    raw_outcomes = _mapping(bundle.get("outcomes"), "outcomes")
    outcomes: dict[str, VerificationOutcome] = {}
    for identifier, raw_outcome in raw_outcomes.items():
        if identifier not in known_point_ids:
            _fail("outcomes", f"contains unknown V-point {identifier}")
        if identifier not in planned_point_ids:
            _fail(f"outcomes.{identifier}", "was not registered in the protocol")
        path = f"outcomes.{identifier}"
        outcome = _mapping(raw_outcome, path)
        result = _text(outcome.get("result"), f"{path}.result")
        if result not in {"PASS", "FAIL"}:
            _fail(f"{path}.result", "must be PASS or FAIL")
        reason = _text(outcome.get("reason"), f"{path}.reason")
        _true(outcome.get("criterionPreSpecified"), f"{path}.criterionPreSpecified")
        evidence_ids = tuple(
            _text(item, f"{path}.evidenceStudyIds[{index}]")
            for index, item in enumerate(
                _sequence(outcome.get("evidenceStudyIds"), f"{path}.evidenceStudyIds")
            )
        )
        if len(set(evidence_ids)) != len(evidence_ids):
            _fail(f"{path}.evidenceStudyIds", "must contain unique values")
        if result == "PASS" and not evidence_ids:
            _fail(
                f"{path}.evidenceStudyIds", "a PASS result requires included evidence"
            )
        for study_id in evidence_ids:
            if study_id not in included_study_ids:
                _fail(
                    f"{path}.evidenceStudyIds", f"{study_id} is not an included study"
                )
            study_points = set(
                _sequence(
                    study_by_id[study_id].get("verificationPointIds"),
                    f"studyDecisions.{study_id}.verificationPointIds",
                )
            )
            if identifier not in study_points:
                _fail(
                    f"{path}.evidenceStudyIds",
                    f"{study_id} was not extracted for {identifier}",
                )
        for prediction in (
            "bermPrediction",
            "conventionalPrediction",
            "nullPrediction",
        ):
            _text(outcome.get(prediction), f"{path}.{prediction}")
        comparison = _text(outcome.get("modelComparison"), f"{path}.modelComparison")
        if comparison not in ALLOWED_MODEL_COMPARISONS:
            _fail(f"{path}.modelComparison", "is not an allowed comparison")
        power = _text(outcome.get("discriminatingPower"), f"{path}.discriminatingPower")
        if power not in ALLOWED_DISCRIMINATING_POWER:
            _fail(f"{path}.discriminatingPower", "is not an allowed value")
        _text(outcome.get("effectEstimate"), f"{path}.effectEstimate")
        _text(outcome.get("uncertainty"), f"{path}.uncertainty")
        _true(outcome.get("counterevidenceSearched"), f"{path}.counterevidenceSearched")
        _true(outcome.get("riskOfBiasIntegrated"), f"{path}.riskOfBiasIntegrated")
        _sha256(outcome.get("analysisArtifactSha256"), f"{path}.analysisArtifactSha256")
        _unique_texts(outcome.get("robustnessChecks"), f"{path}.robustnessChecks")
        outcome_deviations = tuple(
            _text(item, f"{path}.protocolDeviationIds[{index}]")
            for index, item in enumerate(
                _sequence(
                    outcome.get("protocolDeviationIds"), f"{path}.protocolDeviationIds"
                )
            )
        )
        unknown_deviations = sorted(set(outcome_deviations) - deviation_ids)
        if unknown_deviations:
            _fail(
                f"{path}.protocolDeviationIds",
                "unknown: " + ", ".join(unknown_deviations),
            )
        outcomes[identifier] = VerificationOutcome(result == "PASS", reason)

    evaluated_point_ids = tuple(
        identifier
        for identifier, _level, _claim, _test in VERIFICATION_POINTS
        if identifier in outcomes
    )
    audit = VerificationProtocolAudit(
        protocol_id=protocol_id,
        protocol_digest_sha256=protocol_digest,
        evaluated_point_ids=evaluated_point_ids,
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
    summary = {
        "schemaVersion": SCHEMA_VERSION,
        "protocolId": protocol_id,
        "protocolDigestSha256": protocol_digest,
        "plannedPointIds": list(planned_point_ids),
        "evaluatedPointIds": list(evaluated_point_ids),
        "identifiedRecords": identified,
        "includedStudies": included,
        "protocolDeviationCount": len(deviation_ids),
    }
    return AuditedEvaluationBundle(outcomes, audit, summary)


__all__ = [
    "ALLOWED_BIAS_DIRECTIONS",
    "ALLOWED_DISCRIMINATING_POWER",
    "ALLOWED_EVIDENCE_DIRECTIONS",
    "ALLOWED_MODEL_COMPARISONS",
    "ALLOWED_RISK_JUDGEMENTS",
    "ALLOWED_SOURCE_TYPES",
    "AuditedEvaluationBundle",
    "EvidenceProtocolValidationError",
    "REQUIRED_BIAS_DOMAINS",
    "REQUIRED_EXTRACTION_FIELDS",
    "SCHEMA_VERSION",
    "protocol_digest_sha256",
    "validate_evaluation_bundle",
]
