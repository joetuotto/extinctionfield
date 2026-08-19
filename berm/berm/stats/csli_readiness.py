"""Fail-closed input contracts for CSLI analyses.

CSLI is only interpretable when the biological outcome, exposure, geography and
confounder data are all aligned at verified calendar-year resolution.  This
module deliberately does *not* infer that status from a numeric time series:
an annual-looking dictionary can still contain reconstructed values, an
incompatible geography, or a mobile-subscription proxy rather than a measured
RF exposure.

Public CSLI entry points therefore require an explicit metadata contract.  The
contract is intentionally small and JSON serialisable so a normalisation
pipeline can attach its version and input hash to an analysis artifact.

Example metadata::

    {
        "schema_version": "csli-readiness/v1",
        "artifact_version": "2026-08-19",
        "artifact_sha256": "…",
        "outcome": {
            "measurement_status": "OBSERVED",
            "endpoint_valid_for_csli": True,
            "verified_calendar_year_coverage": True,
            "geography_level": "region",
            "geography_match_status": "EXACT",
        },
        "exposure": {
            "measurement_status": "OBSERVED",
            "measured_rf": True,
            "verified_calendar_year_coverage": True,
            "geography_level": "region",
            "geography_match_status": "EXACT",
        },
        "covariates": {
            "complete_for_analysis": True,
            "required_fields": ["chemical_exposure", "weather"],
        },
    }

The current repository sentinel files do not provide this contract.  That is
intentional: callers must receive a structured ``NOT_ELIGIBLE`` result rather
than a numerical lag, confidence interval, or apparent validation score.
"""

from __future__ import annotations

from collections.abc import Mapping
from dataclasses import dataclass
from typing import Any


READINESS_SCHEMA_VERSION = "csli-readiness/v1"


@dataclass(frozen=True)
class CSLIInput:
    """Numeric values plus the explicit evidence contract required by CSLI.

    ``values`` uses the legacy ``{geography_id: {calendar_year: value}}``
    shape.  It is retained only as a compact in-memory representation; all
    provenance and eligibility information belongs in ``metadata``.
    """

    values: Mapping[str, Mapping[int, float]]
    metadata: Mapping[str, Any]


def blocked_result(
    analysis: str,
    reasons: list[dict[str, Any]],
    *,
    status: str = "NOT_ELIGIBLE",
    readiness: Mapping[str, Any] | None = None,
) -> dict[str, Any]:
    """Return the sole public result shape for an ineligible CSLI analysis."""

    return {
        "status": status,
        "analysis": analysis,
        "reasons": reasons,
        "readiness": {
            "schema_version": READINESS_SCHEMA_VERSION,
            "eligible": False,
            **dict(readiness or {}),
        },
    }


def unpack_input(
    data: CSLIInput | Mapping[str, Mapping[int, float]],
    metadata: Mapping[str, Any] | None = None,
) -> tuple[Mapping[str, Mapping[int, float]], Mapping[str, Any] | None]:
    """Accept a contract-carrying input or a legacy numeric mapping.

    A bare mapping is deliberately accepted only so the caller can be told it
    is missing the contract.  It is never silently eligible.
    """

    if isinstance(data, CSLIInput):
        if metadata is not None:
            raise ValueError("Pass metadata either in CSLIInput or as metadata=, not both")
        return data.values, data.metadata
    return data, metadata


def _reason(code: str, message: str, **details: Any) -> dict[str, Any]:
    result: dict[str, Any] = {"code": code, "message": message}
    if details:
        result["details"] = details
    return result


def validate_pair_contract(
    outcome: Mapping[str, Mapping[int, float]],
    exposure: Mapping[str, Mapping[int, float]],
    metadata: Mapping[str, Any] | None,
    *,
    max_lag: int,
    analysis: str,
    require_covariates: bool = True,
) -> dict[str, Any] | None:
    """Validate the metadata and calendar alignment for a lag-style analysis.

    Returns ``None`` only for an explicitly verified, exactly joined, annual
    input with usable complete lag windows.  It never imputes an exposure and
    never turns row positions into years.
    """

    if metadata is None:
        return blocked_result(
            analysis,
            [_reason(
                "INPUT_METADATA_REQUIRED",
                "A verified CSLI readiness contract is required; bare numeric series are not eligible.",
            )],
            readiness={"max_lag_years": max_lag},
        )

    reasons: list[dict[str, Any]] = []
    if metadata.get("schema_version") != READINESS_SCHEMA_VERSION:
        reasons.append(_reason(
            "READINESS_SCHEMA_UNVERIFIED",
            "metadata.schema_version must equal the supported CSLI readiness schema.",
            received=metadata.get("schema_version"),
            required=READINESS_SCHEMA_VERSION,
        ))

    outcome_meta = metadata.get("outcome")
    exposure_meta = metadata.get("exposure")
    covariate_meta = metadata.get("covariates")
    if not isinstance(outcome_meta, Mapping):
        reasons.append(_reason("OUTCOME_METADATA_REQUIRED", "Outcome provenance and endpoint metadata are required."))
        outcome_meta = {}
    if not isinstance(exposure_meta, Mapping):
        reasons.append(_reason("EXPOSURE_METADATA_REQUIRED", "Exposure provenance and measurement metadata are required."))
        exposure_meta = {}
    if require_covariates and not isinstance(covariate_meta, Mapping):
        reasons.append(_reason("COVARIATE_METADATA_REQUIRED", "Confounder coverage metadata is required."))
        covariate_meta = {}

    if outcome_meta.get("measurement_status") != "OBSERVED":
        reasons.append(_reason(
            "OUTCOME_NOT_VERIFIED_OBSERVED",
            "The outcome must be a verified observed endpoint, not reconstructed, projected, or qualitative.",
            received=outcome_meta.get("measurement_status"),
        ))
    if outcome_meta.get("endpoint_valid_for_csli") is not True:
        reasons.append(_reason(
            "OUTCOME_ENDPOINT_INVALID",
            "The outcome metadata must explicitly mark the endpoint valid for the requested CSLI claim.",
        ))
    if outcome_meta.get("verified_calendar_year_coverage") is not True:
        reasons.append(_reason(
            "OUTCOME_CALENDAR_COVERAGE_UNVERIFIED",
            "Outcome coverage must be verified at calendar-year resolution.",
        ))

    if exposure_meta.get("measurement_status") != "OBSERVED":
        reasons.append(_reason(
            "EXPOSURE_NOT_VERIFIED_OBSERVED",
            "The exposure must be a verified observed measurement.",
            received=exposure_meta.get("measurement_status"),
        ))
    if exposure_meta.get("measured_rf") is not True:
        reasons.append(_reason(
            "MEASURED_RF_REQUIRED",
            "Mobile subscriptions or a hand-assigned exposure rank are not RF dosimetry.",
        ))
    if exposure_meta.get("verified_calendar_year_coverage") is not True:
        reasons.append(_reason(
            "EXPOSURE_CALENDAR_COVERAGE_UNVERIFIED",
            "Exposure coverage must be verified at calendar-year resolution.",
        ))

    outcome_level = outcome_meta.get("geography_level")
    exposure_level = exposure_meta.get("geography_level")
    if not outcome_level or not exposure_level or outcome_level != exposure_level:
        reasons.append(_reason(
            "GEOGRAPHY_LEVEL_INCOMPATIBLE",
            "Outcome and exposure must use the same verified geography level.",
            outcome_geography_level=outcome_level,
            exposure_geography_level=exposure_level,
        ))
    if outcome_meta.get("geography_match_status") != "EXACT" or exposure_meta.get("geography_match_status") != "EXACT":
        reasons.append(_reason(
            "GEOGRAPHY_MATCH_UNVERIFIED",
            "Outcome and exposure joins must be explicitly marked EXACT; national proxies cannot stand in for subnational observations.",
        ))

    if require_covariates:
        if covariate_meta.get("complete_for_analysis") is not True:
            reasons.append(_reason(
                "COVARIATE_COVERAGE_INCOMPLETE",
                "Required endpoint-specific confounder coverage is not verified complete.",
            ))
        if not covariate_meta.get("required_fields"):
            reasons.append(_reason(
                "COVARIATE_FIELDS_UNSPECIFIED",
                "The analysis must name the confounder fields it requires.",
            ))

    shared_geographies = sorted(set(outcome) & set(exposure))
    complete_lag_rows = 0
    incomplete_lag_rows = 0
    irregular_outcome_gaps: dict[str, list[int]] = {}
    for geography in shared_geographies:
        outcome_years = sorted(outcome[geography])
        exposure_years = set(exposure[geography])
        gaps = [
            later
            for earlier, later in zip(outcome_years, outcome_years[1:])
            if later - earlier != 1
        ]
        if gaps:
            irregular_outcome_gaps[geography] = gaps
        for year in outcome_years:
            # Outcome dates before a complete history starts are unavailable by
            # design.  Later missing interior exposure years are a hard block.
            needed = set(range(year - max_lag, year + 1))
            if needed.issubset(exposure_years):
                complete_lag_rows += 1
            elif year - max_lag >= min(exposure_years, default=year + 1):
                incomplete_lag_rows += 1

    if not shared_geographies:
        reasons.append(_reason("NO_SHARED_GEOGRAPHY", "Outcome and exposure have no shared geography identifiers."))
    if irregular_outcome_gaps:
        reasons.append(_reason(
            "IRREGULAR_OUTCOME_CALENDAR",
            "Lag positions cannot be interpreted as years when observed outcome dates have gaps.",
            affected_geographies=sorted(irregular_outcome_gaps),
        ))
    if incomplete_lag_rows:
        reasons.append(_reason(
            "MISSING_EXPOSURE_LAG_HISTORY",
            "At least one in-range outcome year lacks an observed exposure value in its required lag window; zero-fill is prohibited.",
            incomplete_rows=incomplete_lag_rows,
        ))
    if complete_lag_rows == 0:
        reasons.append(_reason(
            "NO_COMPLETE_LAG_WINDOWS",
            "No outcome row has a fully observed calendar-year exposure history for the requested lag window.",
            max_lag_years=max_lag,
        ))

    readiness = {
        "artifact_version": metadata.get("artifact_version"),
        "artifact_sha256": metadata.get("artifact_sha256"),
        "max_lag_years": max_lag,
        "shared_geographies": len(shared_geographies),
        "complete_lag_rows": complete_lag_rows,
        "incomplete_lag_rows": incomplete_lag_rows,
        "irregular_outcome_geographies": len(irregular_outcome_gaps),
    }
    if reasons:
        return blocked_result(analysis, reasons, readiness=readiness)
    return None


def current_source_blocked_result(analysis: str) -> dict[str, Any]:
    """Describe why the repository's current sentinel sources cannot be run.

    This is a deliberately factual readiness report for public diagnostic
    entrypoints.  It does not inspect values to manufacture an apparent lag.
    """

    return blocked_result(
        analysis,
        [
            _reason(
                "MEASURED_RF_REQUIRED",
                "No current sentinel source contains matched RF dosimetry or an eligible measured RF exposure series.",
            ),
            _reason(
                "BEE_ENDPOINT_NOT_REPRODUCTIVE",
                "COLOSS provides winter colony loss, not a reproductive endpoint, and mixes survey protocols.",
            ),
            _reason(
                "BIRD_ENDPOINT_IRREGULAR_ABUNDANCE_INDEX",
                "Bird data are irregularly spaced, mixed population indices rather than a reproductive endpoint.",
            ),
            _reason(
                "SPERM_SERIES_RECONSTRUCTED",
                "Country sperm values are reconstructed study midpoints, not an observed country-year panel.",
            ),
            _reason(
                "DOG_PANEL_UNMATCHED",
                "The dog series is one figure-digitized institutional population with no matched regional human panel or RF measurement.",
            ),
            _reason(
                "LIVESTOCK_PANEL_UNAVAILABLE",
                "The livestock file contains qualitative summaries and citations, not a numeric region-year control panel.",
            ),
            _reason(
                "COVARIATE_COVERAGE_INCOMPLETE",
                "Required chemical, pathogen, weather, management, and other endpoint-specific covariates are not matched to the current sources.",
            ),
        ],
        status="BLOCKED",
        readiness={
            "source_snapshot": "repository_current_sentinel_sources",
            "required_schema": READINESS_SCHEMA_VERSION,
        },
    )
