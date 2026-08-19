"""Fail-closed protocol for a future sentinel-leading fertility hindcast.

This module deliberately does *not* estimate an EMF coefficient or predict a
TFR value. Its job is to make the future calibration exercise auditable before
a matched panel exists. It prevents a tempting but invalid shortcut: selecting
FieldState, memory, species-response, or lag parameters because they improve a
historical TFR fit.

Only the final demographic evaluation may read ASFR/TFR, and only after the
upstream parameters and lead-lag rules have been locked. Legacy model numerics
are not imported or changed here.
"""

from __future__ import annotations

from dataclasses import dataclass
from typing import Iterable, Literal, Mapping


SENTINEL_HINDCAST_PROTOCOL_VERSION = "sentinel-hindcast-protocol-v1"
MEASUREMENT_READY_FIELD_STATE = "MEASUREMENT_READY_FIELD_STATE"

InputRole = Literal[
    "FIELDSTATE",
    "SENTINEL_ENDPOINT",
    "HUMAN_BIOMARKER",
    "CONFOUNDER",
    "DEMOGRAPHIC_BASELINE",
    "TARGET_DEMOGRAPHIC_OUTCOME",
]
MatchLevel = Literal["EXACT_SITE", "PREDEFINED_CATCHMENT", "SUBNATIONAL"]
_LEGAL_INPUT_ROLES: frozenset[str] = frozenset({
    "FIELDSTATE",
    "SENTINEL_ENDPOINT",
    "HUMAN_BIOMARKER",
    "CONFOUNDER",
    "DEMOGRAPHIC_BASELINE",
    "TARGET_DEMOGRAPHIC_OUTCOME",
})
_LEGAL_MATCH_LEVELS: frozenset[str] = frozenset({
    "EXACT_SITE", "PREDEFINED_CATCHMENT", "SUBNATIONAL",
})

# These tables may be used only in the distinct demographic-baseline or
# evaluation stages. They cannot tune FieldState, organ-memory, sentinel, or
# lag parameters.
UPSTREAM_FORBIDDEN_TABLES: frozenset[str] = frozenset({
    "fertility_asfr_region_age_year",
    "fertility_tfr_region_year",
    "fertility_parity_progression",
    "culture_demand_age_country_year",
    "migration_generation_fertility",
    "art_outcomes_age_year",
})

TARGET_OUTCOME_TABLES: frozenset[str] = frozenset({
    "fertility_asfr_region_age_year",
    "fertility_tfr_region_year",
})


@dataclass(frozen=True)
class ProtocolViolation:
    """A transparent reason why a proposed sentinel hindcast cannot run."""

    code: str
    message: str
    subject: str


@dataclass(frozen=True)
class InputAsset:
    """One immutable input registered before calibration.

    ``geography_ids`` and the inclusive calendar range make an intended join
    inspectable. They do not replace the coordinate/catchment crosswalk, which
    is named explicitly in :class:`GeoTemporalMatch`.
    """

    asset_id: str
    table: str
    role: InputRole
    source_ids: tuple[str, ...]
    manifest_sha256: str
    geography_ids: tuple[str, ...]
    start_year: int
    end_year: int
    measurement_type: str
    fieldstate_status: str | None = None

    def __post_init__(self) -> None:
        for name in ("asset_id", "table", "manifest_sha256", "measurement_type"):
            value = getattr(self, name)
            if not isinstance(value, str) or not value.strip():
                raise ValueError(f"{name} must be a non-empty string")
        if len(self.manifest_sha256) != 64 or any(
            character not in "0123456789abcdef" for character in self.manifest_sha256
        ):
            raise ValueError("manifest_sha256 must be a lowercase SHA-256 digest")
        if self.role not in _LEGAL_INPUT_ROLES:
            raise ValueError(f"unknown input role: {self.role!r}")
        if not self.source_ids or any(
            not isinstance(value, str) or not value.strip() for value in self.source_ids
        ):
            raise ValueError("source_ids must contain at least one non-empty identifier")
        if len(set(self.source_ids)) != len(self.source_ids):
            raise ValueError("source_ids must not contain duplicates")
        if not self.geography_ids or any(
            not isinstance(value, str) or not value.strip() for value in self.geography_ids
        ):
            raise ValueError("geography_ids must contain at least one non-empty identifier")
        if len(set(self.geography_ids)) != len(self.geography_ids):
            raise ValueError("geography_ids must not contain duplicates")
        if not 1900 <= self.start_year <= self.end_year <= 2100:
            raise ValueError("asset calendar range must be within 1900..2100")


@dataclass(frozen=True)
class GeoTemporalMatch:
    """A pre-specified local sentinel--human biology matching rule."""

    match_id: str
    geography_id: str
    start_year: int
    end_year: int
    match_level: MatchLevel
    fieldstate_asset_id: str
    sentinel_asset_id: str
    human_biomarker_asset_id: str
    confounder_asset_ids: tuple[str, ...]
    geography_crosswalk_id: str
    time_window_rule_id: str
    endpoint_definition_id: str

    def __post_init__(self) -> None:
        for name in (
            "match_id",
            "geography_id",
            "fieldstate_asset_id",
            "sentinel_asset_id",
            "human_biomarker_asset_id",
            "geography_crosswalk_id",
            "time_window_rule_id",
            "endpoint_definition_id",
        ):
            value = getattr(self, name)
            if not isinstance(value, str) or not value.strip():
                raise ValueError(f"{name} must be a non-empty string")
        if not 1900 <= self.start_year <= self.end_year <= 2100:
            raise ValueError("match calendar range must be within 1900..2100")
        if self.match_level not in _LEGAL_MATCH_LEVELS:
            raise ValueError(f"unknown match_level: {self.match_level!r}")
        if not self.confounder_asset_ids:
            raise ValueError("a match must name at least one confounder asset")
        if len(set(self.confounder_asset_ids)) != len(self.confounder_asset_ids):
            raise ValueError("confounder_asset_ids must not contain duplicates")


@dataclass(frozen=True)
class LeadLagRule:
    """A biological lead window locked without demographic outcome fitting."""

    lag_id: str
    sentinel_endpoint: str
    human_endpoint: str
    minimum_lead_years: float
    maximum_lead_years: float
    biological_basis_asset_ids: tuple[str, ...]
    calibration_target: str
    locked_before_outcome_unblinding: bool

    def __post_init__(self) -> None:
        for name in ("lag_id", "sentinel_endpoint", "human_endpoint", "calibration_target"):
            value = getattr(self, name)
            if not isinstance(value, str) or not value.strip():
                raise ValueError(f"{name} must be a non-empty string")
        if not 0.0 < self.minimum_lead_years <= self.maximum_lead_years:
            raise ValueError("lead window must be positive and ordered")
        if not self.biological_basis_asset_ids:
            raise ValueError("a lag rule needs at least one biological basis asset")
        if len(set(self.biological_basis_asset_ids)) != len(self.biological_basis_asset_ids):
            raise ValueError("biological_basis_asset_ids must not contain duplicates")


@dataclass(frozen=True)
class ParameterFamily:
    """One identifiable upstream parameter family.

    FieldState normalisation, a biological response slope, and memory retention
    can otherwise trade off multiplicatively. Each family therefore names one
    fixed/measured scale anchor and only pre-outcome calibration assets.
    """

    family_id: str
    target_node: str
    parameter_ids: tuple[str, ...]
    scale_anchor_parameter_id: str
    calibration_asset_ids: tuple[str, ...]

    def __post_init__(self) -> None:
        for name in ("family_id", "target_node", "scale_anchor_parameter_id"):
            value = getattr(self, name)
            if not isinstance(value, str) or not value.strip():
                raise ValueError(f"{name} must be a non-empty string")
        if not self.parameter_ids:
            raise ValueError("parameter_ids must not be empty")
        if len(set(self.parameter_ids)) != len(self.parameter_ids):
            raise ValueError("parameter_ids must not contain duplicates")
        if self.scale_anchor_parameter_id not in self.parameter_ids:
            raise ValueError("scale_anchor_parameter_id must be one of parameter_ids")
        if not self.calibration_asset_ids:
            raise ValueError("calibration_asset_ids must not be empty")
        if len(set(self.calibration_asset_ids)) != len(self.calibration_asset_ids):
            raise ValueError("calibration_asset_ids must not contain duplicates")


@dataclass(frozen=True)
class SentinelHindcastPlan:
    """One pre-registered train--lock--holdout declaration."""

    protocol_id: str
    calibration_end_year: int
    lock_year: int
    forecast_origin_year: int
    target_start_year: int
    target_end_year: int
    upstream_asset_ids: tuple[str, ...]
    demographic_baseline_asset_ids: tuple[str, ...]
    target_outcome_asset_id: str
    parameter_families: tuple[ParameterFamily, ...]
    lead_lag_rules: tuple[LeadLagRule, ...]
    matches: tuple[GeoTemporalMatch, ...]
    calibration_geography_ids: tuple[str, ...]
    geographic_holdout_ids: tuple[str, ...]

    def __post_init__(self) -> None:
        if not isinstance(self.protocol_id, str) or not self.protocol_id.strip():
            raise ValueError("protocol_id must be a non-empty string")
        if not 1900 <= self.calibration_end_year <= self.lock_year <= self.forecast_origin_year <= 2100:
            raise ValueError("calibration_end_year <= lock_year <= forecast_origin_year is required")
        if not self.forecast_origin_year < self.target_start_year <= self.target_end_year <= 2100:
            raise ValueError("target years must begin strictly after the forecast origin")
        for name in (
            "upstream_asset_ids",
            "demographic_baseline_asset_ids",
            "parameter_families",
            "lead_lag_rules",
            "matches",
            "calibration_geography_ids",
            "geographic_holdout_ids",
        ):
            if not getattr(self, name):
                raise ValueError(f"{name} must not be empty")
        if set(self.calibration_geography_ids) & set(self.geographic_holdout_ids):
            raise ValueError("geographic holdouts must not overlap calibration geographies")


@dataclass(frozen=True)
class ProtocolReadiness:
    """Current public readiness state, distinct from a fitted result."""

    version: str
    status: Literal["BLOCKED", "READY"]
    blockers: tuple[ProtocolViolation, ...]
    required_outputs: tuple[str, ...]


def _asset_map(assets: Iterable[InputAsset]) -> tuple[dict[str, InputAsset], list[ProtocolViolation]]:
    result: dict[str, InputAsset] = {}
    violations: list[ProtocolViolation] = []
    for asset in assets:
        if asset.asset_id in result:
            violations.append(ProtocolViolation(
                "DUPLICATE_ASSET_ID", "An input asset ID appears more than once.", asset.asset_id,
            ))
        result[asset.asset_id] = asset
    return result, violations


def _missing_asset(asset_id: str, known: Mapping[str, InputAsset], subject: str) -> ProtocolViolation | None:
    if asset_id not in known:
        return ProtocolViolation(
            "UNKNOWN_ASSET", "The protocol references an input asset that is not registered.", subject,
        )
    return None


def _check_match(match: GeoTemporalMatch, assets: Mapping[str, InputAsset]) -> list[ProtocolViolation]:
    violations: list[ProtocolViolation] = []
    required = {
        match.fieldstate_asset_id: "FIELDSTATE",
        match.sentinel_asset_id: "SENTINEL_ENDPOINT",
        match.human_biomarker_asset_id: "HUMAN_BIOMARKER",
    }
    for asset_id, expected_role in required.items():
        missing = _missing_asset(asset_id, assets, match.match_id)
        if missing is not None:
            violations.append(missing)
            continue
        asset = assets[asset_id]
        if asset.role != expected_role:
            violations.append(ProtocolViolation(
                "MATCH_ROLE_MISMATCH",
                f"{asset_id} must have role {expected_role}, not {asset.role}.",
                match.match_id,
            ))
        if asset.measurement_type != "OBSERVED":
            violations.append(ProtocolViolation(
                "MATCH_REQUIRES_OBSERVED_INPUT",
                "A causal matched panel cannot use a proxy or scenario input.",
                match.match_id,
            ))
        if match.geography_id not in asset.geography_ids:
            violations.append(ProtocolViolation(
                "GEOGRAPHY_NOT_SHARED_BY_MATCHED_ASSETS",
                "The declared geography is absent from one matched input asset.",
                match.match_id,
            ))
        if match.start_year < asset.start_year or match.end_year > asset.end_year:
            violations.append(ProtocolViolation(
                "TIME_NOT_SHARED_BY_MATCHED_ASSETS",
                "The declared match interval is outside one input asset's observed coverage.",
                match.match_id,
            ))
    fieldstate = assets.get(match.fieldstate_asset_id)
    if fieldstate is not None and fieldstate.fieldstate_status != MEASUREMENT_READY_FIELD_STATE:
        violations.append(ProtocolViolation(
            "FIELDSTATE_NOT_MEASUREMENT_READY",
            "A matched causal panel requires MEASUREMENT_READY_FIELD_STATE, not an ambient-only layer or proxy.",
            match.match_id,
        ))
    for asset_id in match.confounder_asset_ids:
        missing = _missing_asset(asset_id, assets, match.match_id)
        if missing is not None:
            violations.append(missing)
        elif assets[asset_id].role != "CONFOUNDER":
            violations.append(ProtocolViolation(
                "CONFOUNDER_ROLE_MISMATCH",
                "Every declared confounder asset must have role CONFOUNDER.",
                match.match_id,
            ))
    return violations


def validate_sentinel_hindcast_plan(
    plan: SentinelHindcastPlan,
    assets: Iterable[InputAsset],
) -> tuple[ProtocolViolation, ...]:
    """Validate a declaration without fitting a numerical model.

    FieldState, organ-memory, species-response, and lag parameters must be
    calibrated upstream of ASFR/TFR. Declared matched inputs must also share
    their geography and observed interval across physics, sentinel, and human
    biomarker data.
    """
    known, violations = _asset_map(assets)

    for asset_id in plan.upstream_asset_ids:
        missing = _missing_asset(asset_id, known, plan.protocol_id)
        if missing is not None:
            violations.append(missing)
            continue
        asset = known[asset_id]
        if asset.role in {"TARGET_DEMOGRAPHIC_OUTCOME", "DEMOGRAPHIC_BASELINE"} or asset.table in UPSTREAM_FORBIDDEN_TABLES:
            violations.append(ProtocolViolation(
                "UPSTREAM_DEMOGRAPHIC_OUTCOME_FORBIDDEN",
                "ASFR/TFR, demand, tempo, parity, migration and ART inputs cannot tune upstream FieldState/biology parameters.",
                asset_id,
            ))
        if asset.end_year > plan.calibration_end_year:
            violations.append(ProtocolViolation(
                "UPSTREAM_INPUT_AFTER_CALIBRATION_END",
                "An upstream calibration input extends beyond the declared calibration end year.",
                asset_id,
            ))

    for family in plan.parameter_families:
        for asset_id in family.calibration_asset_ids:
            missing = _missing_asset(asset_id, known, family.family_id)
            if missing is not None:
                violations.append(missing)
            elif asset_id not in plan.upstream_asset_ids:
                violations.append(ProtocolViolation(
                    "PARAMETER_FAMILY_USES_NON_UPSTREAM_ASSET",
                    "Every upstream parameter family must use only registered upstream assets.",
                    family.family_id,
                ))

    for rule in plan.lead_lag_rules:
        if rule.calibration_target != "HUMAN_BIOLOGICAL_ENDPOINT":
            violations.append(ProtocolViolation(
                "LAG_CALIBRATED_TO_DEMOGRAPHIC_OUTCOME",
                "A sentinel lead-lag must be calibrated to a human biological endpoint, never ASFR or TFR.",
                rule.lag_id,
            ))
        if not rule.locked_before_outcome_unblinding:
            violations.append(ProtocolViolation(
                "LAG_NOT_LOCKED_BEFORE_OUTCOME_UNBLINDING",
                "The lead-lag rule must be locked before ASFR/TFR evaluation is unblinded.",
                rule.lag_id,
            ))
        for asset_id in rule.biological_basis_asset_ids:
            missing = _missing_asset(asset_id, known, rule.lag_id)
            if missing is not None:
                violations.append(missing)
            elif asset_id not in plan.upstream_asset_ids:
                violations.append(ProtocolViolation(
                    "LAG_RULE_USES_NON_UPSTREAM_ASSET",
                    "Lag evidence must be registered in the upstream biological calibration set.",
                    rule.lag_id,
                ))

    for match in plan.matches:
        violations.extend(_check_match(match, known))
        for asset_id in (
            match.fieldstate_asset_id,
            match.sentinel_asset_id,
            match.human_biomarker_asset_id,
            *match.confounder_asset_ids,
        ):
            if asset_id in known and asset_id not in plan.upstream_asset_ids:
                violations.append(ProtocolViolation(
                    "MATCH_USES_NON_UPSTREAM_ASSET",
                    "Physics, sentinel, human biomarker and match confounder assets must all be registered upstream of the lock.",
                    match.match_id,
                ))

    for asset_id in plan.demographic_baseline_asset_ids:
        missing = _missing_asset(asset_id, known, plan.protocol_id)
        if missing is not None:
            violations.append(missing)
        elif known[asset_id].role != "DEMOGRAPHIC_BASELINE":
            violations.append(ProtocolViolation(
                "DEMOGRAPHIC_BASELINE_ROLE_MISMATCH",
                "A baseline asset must be labeled DEMOGRAPHIC_BASELINE and remain outside upstream calibration.",
                asset_id,
            ))

    target = known.get(plan.target_outcome_asset_id)
    if target is None:
        violations.append(ProtocolViolation(
            "UNKNOWN_TARGET_OUTCOME_ASSET", "The target ASFR/TFR asset is not registered.", plan.protocol_id,
        ))
    else:
        if target.role != "TARGET_DEMOGRAPHIC_OUTCOME" or target.table not in TARGET_OUTCOME_TABLES:
            violations.append(ProtocolViolation(
                "TARGET_OUTCOME_ROLE_MISMATCH",
                "The outcome asset must be explicitly labeled TARGET_DEMOGRAPHIC_OUTCOME and be ASFR or TFR.",
                target.asset_id,
            ))
        if target.start_year > plan.target_start_year or target.end_year < plan.target_end_year:
            violations.append(ProtocolViolation(
                "TARGET_OUTCOME_COVERAGE_INSUFFICIENT",
                "The outcome asset does not cover the full declared holdout interval.",
                target.asset_id,
            ))
        if target.asset_id in plan.upstream_asset_ids:
            violations.append(ProtocolViolation(
                "TARGET_OUTCOME_LEAKS_UPSTREAM",
                "The target ASFR/TFR asset cannot be an upstream calibration input.",
                target.asset_id,
            ))

    return tuple(violations)


def current_sentinel_hindcast_readiness() -> ProtocolReadiness:
    """State repository readiness without inventing a fitted run."""
    blockers = (
        ProtocolViolation(
            "G3_MATCHED_RF_BIOLOGY_ABSENT",
            "ANFR is a measured fixed-probe ambient layer, but no biological panel shares its pre-specified site/time geometry.",
            "measured_rf_site_time",
        ),
        ProtocolViolation(
            "G5_MULTIREGION_SENTINEL_ABSENT",
            "The held dog source is one digitised site and cannot identify a cross-geography sentinel lead.",
            "sentinel_species_region_year",
        ),
        ProtocolViolation(
            "G7_OBSERVED_HUMAN_BIOMARKER_ABSENT",
            "The held country sperm series is reconstructed and cannot calibrate a sentinel-to-human biological mapping.",
            "biomarker_cohort",
        ),
        ProtocolViolation(
            "G8_MATCHED_SUBNATIONAL_OUTCOME_ABSENT",
            "No compatible subnational ASFR/TFR panel is held for a spatially matched transport hindcast.",
            "fertility_asfr_region_age_year",
        ),
        ProtocolViolation(
            "G4_PARITY_TEMPO_SEPARATION_ABSENT",
            "Parity and timing data are required to distinguish biological capacity from postponement in the final demographic layer.",
            "fertility_parity_progression",
        ),
    )
    return ProtocolReadiness(
        version=SENTINEL_HINDCAST_PROTOCOL_VERSION,
        status="BLOCKED",
        blockers=blockers,
        required_outputs=(
            "manifest-locked matched FieldState/sentinel/human-biomarker panel",
            "upstream-only parameter lock with scale anchors and uncertainty intervals",
            "as-of forecast ledger with lead-lag rule and input vintages",
            "post-lock ASFR/TFR scorecard against the same rows as the demographic baseline",
        ),
    )


__all__ = [
    "InputAsset",
    "GeoTemporalMatch",
    "LeadLagRule",
    "MEASUREMENT_READY_FIELD_STATE",
    "ParameterFamily",
    "ProtocolReadiness",
    "ProtocolViolation",
    "SENTINEL_HINDCAST_PROTOCOL_VERSION",
    "SentinelHindcastPlan",
    "TARGET_OUTCOME_TABLES",
    "UPSTREAM_FORBIDDEN_TABLES",
    "current_sentinel_hindcast_readiness",
    "validate_sentinel_hindcast_plan",
]
