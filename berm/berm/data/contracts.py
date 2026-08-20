"""Canonical data contracts for BERM data products.

Every observation that enters a canonical data product carries provenance.
A row without a resolvable source, unit, geography and measurement type is
rejected at load time rather than silently entering the model.

The three measurement classes are kept strictly separate and must never be
merged, averaged or displayed together without their label:

    OBSERVED            a measured quantity from a cited dataset
    PROXY               a measured quantity standing in for the quantity of
                        interest (e.g. mobile subscriptions for RF dose)
    SCENARIO_PARAMETER  an assumption chosen by the modeller
    DERIVED             computed from other canonical rows by a named pipeline

This module has no third-party dependencies. The DataFrame validator accepts
any object exposing ``.columns`` and ``.itertuples`` (pandas satisfies this)
but pandas is imported lazily and only where a frame is actually passed.
"""

from __future__ import annotations

import datetime as _dt
import re
from dataclasses import dataclass, field
from enum import Enum
from typing import Any, Iterable, Iterator, Sequence

__all__ = [
    "MeasurementType",
    "GeographyLevel",
    "Sex",
    "EvidenceGrade",
    "AccessStatus",
    "DataContractError",
    "Violation",
    "CANONICAL_COLUMNS",
    "REQUIRED_COLUMNS",
    "CANONICAL_TABLES",
    "TableSpec",
    "validate_row",
    "validate_rows",
    "validate_frame",
    "AGE_GROUPS_5Y",
]


# --------------------------------------------------------------------------
# Vocabularies
# --------------------------------------------------------------------------


class MeasurementType(str, Enum):
    """How a value came to exist. Never mix these without the label."""

    OBSERVED = "OBSERVED"
    PROXY = "PROXY"
    SCENARIO_PARAMETER = "SCENARIO_PARAMETER"
    DERIVED = "DERIVED"


class GeographyLevel(str, Enum):
    GLOBAL = "GLOBAL"
    SUPRANATIONAL = "SUPRANATIONAL"
    COUNTRY = "COUNTRY"
    SUBNATIONAL1 = "SUBNATIONAL1"
    METRO = "METRO"
    GRID = "GRID"
    SITE = "SITE"


class Sex(str, Enum):
    FEMALE = "FEMALE"
    MALE = "MALE"
    BOTH = "BOTH"
    NA = "NA"


class EvidenceGrade(str, Enum):
    """Grade attached to every entry in the parameter registry."""

    MEASURED = "MEASURED"
    ESTIMATED = "ESTIMATED"
    SCENARIO = "SCENARIO"
    UNIDENTIFIED = "UNIDENTIFIED"


class AccessStatus(str, Enum):
    OPEN = "OPEN"
    ACCESS_REQUIRED = "ACCESS_REQUIRED"
    NOT_YET_ACQUIRED = "NOT_YET_ACQUIRED"


AGE_GROUPS_5Y: tuple[str, ...] = (
    "15-19", "20-24", "25-29", "30-34", "35-39", "40-44", "45-49",
)

#: Age groups legal in a canonical table, including the aggregate marker.
_LEGAL_AGE_GROUPS: frozenset[str] = frozenset(
    AGE_GROUPS_5Y
    + ("0-4", "5-9", "10-14", "50-54", "ALL", "15-49", "NA")
)

#: Supranational / non-ISO geography codes we explicitly allow.
_SUPRANATIONAL_CODES: frozenset[str] = frozenset({
    "WLD", "EUU", "EUR", "OECD", "SSF", "EAS", "LCN", "MEA", "SAS", "NAC",
})

_ISO3_RE = re.compile(r"^[A-Z]{3}$")
_SUBNAT_RE = re.compile(r"^[A-Z]{3}-[A-Z0-9]{1,6}$")
_ISO_DATE_RE = re.compile(r"^\d{4}-\d{2}-\d{2}$")
_SOURCE_PERIOD_RE = re.compile(r"^\d{4}(-\d{2})?(/\d{4}(-\d{2})?)?$")
_SOURCE_ID_RE = re.compile(r"^[A-Z][A-Z0-9_]{2,63}$")
_PIPELINE_VERSION_RE = re.compile(r"^[a-z0-9][a-z0-9._-]*@v\d+\.\d+\.\d+$")

MIN_YEAR = 1900
MAX_YEAR = 2100


# --------------------------------------------------------------------------
# Column contract
# --------------------------------------------------------------------------


@dataclass(frozen=True)
class ColumnSpec:
    name: str
    required: bool
    description: str


CANONICAL_COLUMNS: tuple[ColumnSpec, ...] = (
    ColumnSpec("source_id", True, "Stable key into source_registry"),
    ColumnSpec("source_url", True, "Retrieval URL, or ACCESS_REQUIRED marker"),
    ColumnSpec("license", True, "Licence / terms of use of the source"),
    ColumnSpec("retrieved_at", True, "ISO date the value was pulled"),
    ColumnSpec("source_period", True, "Period the source itself reports, YYYY or YYYY/YYYY"),
    ColumnSpec("geography_id", True, "ISO-3166 alpha-3, ISO-3166-2, or registered code"),
    ColumnSpec("geography_level", True, "GeographyLevel member"),
    ColumnSpec("year", True, "Calendar year the value refers to"),
    ColumnSpec("sex", True, "Sex member; NA when not stratified"),
    ColumnSpec("age_group", True, "5-year band, or ALL / NA"),
    ColumnSpec("birth_cohort", False, "Birth year or band, when the row is cohort-indexed"),
    ColumnSpec("value", True, "The number"),
    ColumnSpec("unit", True, "Unit string from the table's unit vocabulary"),
    ColumnSpec("measurement_type", True, "MeasurementType member"),
    ColumnSpec("proxy_flag", True, "True iff the value stands in for the target quantity"),
    ColumnSpec("imputation_flag", True, "True iff the value was filled rather than reported"),
    ColumnSpec("uncertainty_lower", False, "Lower bound, same unit as value"),
    ColumnSpec("uncertainty_upper", False, "Upper bound, same unit as value"),
    ColumnSpec("transform_pipeline_version", True, "name@vMAJOR.MINOR.PATCH of the producing pipeline"),
)

REQUIRED_COLUMNS: tuple[str, ...] = tuple(c.name for c in CANONICAL_COLUMNS if c.required)
ALL_COLUMNS: tuple[str, ...] = tuple(c.name for c in CANONICAL_COLUMNS)


@dataclass(frozen=True)
class TableSpec:
    """A canonical data product: its identity, units and required stratifiers."""

    name: str
    grain: tuple[str, ...]
    units: frozenset[str]
    description: str
    requires_age: bool = False
    requires_sex: bool = False
    extra_columns: tuple[str, ...] = field(default_factory=tuple)


def _t(name: str, grain: Sequence[str], units: Iterable[str], desc: str, **kw: Any) -> TableSpec:
    return TableSpec(name=name, grain=tuple(grain), units=frozenset(units), description=desc, **kw)


#: The canonical data products. A table not listed here cannot be validated,
#: which is deliberate: adding a product is an explicit, reviewable act.
CANONICAL_TABLES: dict[str, TableSpec] = {
    t.name: t
    for t in (
        _t(
            "exposure_ambient_region_year",
            ["geography_id", "year"],
            ["subscriptions_per_100", "pct_population", "V_per_m", "index_0_1", "sites_per_km2"],
            "Infrastructure-derived ambient RF exposure proxies by region and year.",
        ),
        _t(
            "exposure_personal_age_sex_country_year",
            ["geography_id", "year", "sex", "age_group"],
            ["hours_per_day", "fraction", "index_0_1"],
            "Device-proximity exposure by age and sex. Never inferred from national subscriptions.",
            requires_age=True,
            requires_sex=True,
        ),
        _t(
            "exposure_night_age_sex_country_year",
            ["geography_id", "year", "sex", "age_group"],
            ["hours_per_night", "fraction", "prevalence"],
            "Night-time device proximity and use.",
            requires_age=True,
            requires_sex=True,
        ),
        _t(
            "cohort_developmental_exposure",
            ["geography_id", "birth_cohort", "age_group"],
            ["index_0_1", "weighted_cumulative"],
            "Developmental-window weighted cumulative exposure. DERIVED from the exposure panels.",
            requires_age=True,
        ),
        _t(
            "fertility_asfr_region_age_year",
            ["geography_id", "year", "age_group"],
            ["births_per_1000_women"],
            "Age-specific fertility rates.",
            requires_age=True,
        ),
        _t(
            "fertility_tfr_region_year",
            ["geography_id", "year"],
            ["births_per_woman"],
            "Total fertility rate as published by the source. Kept separate from the "
            "ASFR product because it has a different grain, and because the identity "
            "TFR = 5*sum(ASFR)/1000 is only a test if the two sides are ingested "
            "independently rather than one being derived from the other.",
        ),
        _t(
            "fertility_parity_progression",
            ["geography_id", "year", "age_group"],
            ["probability", "years", "births_per_woman"],
            "Parity progression ratios, birth intervals, age at first/last birth, completed fertility.",
            requires_age=True,
        ),
        _t(
            "fertility_ttp_and_loss",
            ["geography_id", "year", "age_group"],
            ["months", "probability", "prevalence", "per_1000_pregnancies"],
            "Time-to-pregnancy, infertility prevalence, miscarriage and stillbirth.",
            requires_age=True,
        ),
        _t(
            "art_outcomes_age_year",
            ["geography_id", "year", "age_group"],
            ["cycles", "cycles_per_million_women", "probability", "count", "oocytes"],
            "ART demand and outcome as its own observation layer, not a TFR correction factor.",
            requires_age=True,
        ),
        _t(
            "culture_demand_age_country_year",
            ["geography_id", "year", "age_group"],
            ["children", "fraction", "prevalence", "rate_per_1000", "years", "index_0_1"],
            "Fertility intentions, ideal family size, contraception, union formation, policy.",
            requires_age=True,
        ),
        _t(
            "migration_generation_fertility",
            ["geography_id", "year", "age_group"],
            ["births_per_1000_women", "births_per_woman", "fraction", "years"],
            "Fertility by origin, arrival cohort, generation and duration of residence.",
            requires_age=True,
            extra_columns=("origin_geography_id", "generation", "arrival_year", "duration_years"),
        ),
        _t(
            "biomarker_cohort",
            ["geography_id", "year", "sex", "age_group"],
            ["million_per_ml", "pct_motile", "pct_normal_morphology", "pct_dna_fragmentation",
             "ng_per_dl", "pmol_per_l"],
            "Human reproductive biomarkers.",
            requires_age=True,
            requires_sex=True,
        ),
        _t(
            "sentinel_species_region_year",
            ["geography_id", "year", "species", "endpoint"],
            ["pct_loss", "pct_motile", "pct_normal_morphology", "million_per_ml",
             "million_total", "index_base_100", "per_1000", "count", "cm2"],
            "Non-human sentinel endpoints, one row per species-endpoint-region-year.",
            extra_columns=("species", "endpoint"),
        ),
        _t(
            "veterinary_sentinel_species_site_time",
            ["geography_id", "observation_datetime", "species", "endpoint"],
            ["count"],
            "Veterinary sentinel counts at anonymised study-site and survey-time grain. "
            "This is deliberately separate from annual CSLI inputs: the source may "
            "have repeated within-year observations, non-geocodable sites, or an "
            "intervention that makes a country-year causal join inappropriate.",
            extra_columns=("species", "endpoint", "observation_datetime", "raw_record_key"),
        ),
        _t(
            "measured_rf_site_time",
            ["geography_id", "observation_datetime"],
            ["V_per_m"],
            "Measured ambient RF field-strength readings at a fixed probe and local time. "
            "This is not a personal/organism dose; it remains explicitly distinguishable "
            "from biological endpoints while serving as an active FieldState component. "
            "A pre-specified direct endpoint calibration additionally requires a documented "
            "organism/organ transfer and temporal-spatial match.",
            extra_columns=(
                "observation_datetime",
                "source_local_datetime",
                "datetime_timezone_status",
                "probe_key",
                "latitude",
                "longitude",
                "measurement_geometry_status",
                "personal_dose_status",
                "biological_join_status",
                "causal_analysis_eligibility",
                "raw_record_key",
            ),
        ),
    )
}


# --------------------------------------------------------------------------
# Violations
# --------------------------------------------------------------------------


@dataclass(frozen=True)
class Violation:
    row: int
    column: str
    rule: str
    detail: str

    def __str__(self) -> str:  # pragma: no cover - formatting only
        return f"row {self.row}, column {self.column!r}: {self.rule} — {self.detail}"


class DataContractError(ValueError):
    """Raised when a canonical table violates its contract."""

    def __init__(self, table: str, violations: Sequence[Violation]):
        self.table = table
        self.violations = list(violations)
        shown = "\n  ".join(str(v) for v in self.violations[:25])
        more = "" if len(self.violations) <= 25 else f"\n  … and {len(self.violations) - 25} more"
        super().__init__(
            f"{len(self.violations)} contract violation(s) in {table!r}:\n  {shown}{more}"
        )


# --------------------------------------------------------------------------
# Row-level validation
# --------------------------------------------------------------------------


def _is_missing(v: Any) -> bool:
    if v is None:
        return True
    if isinstance(v, str) and v.strip() == "":
        return True
    # NaN without importing numpy/pandas
    return isinstance(v, float) and v != v


def _as_bool(v: Any) -> bool | None:
    if isinstance(v, bool):
        return v
    if isinstance(v, str):
        low = v.strip().lower()
        if low in {"true", "1", "yes"}:
            return True
        if low in {"false", "0", "no"}:
            return False
    if v in (0, 1):
        return bool(v)
    return None


def _check_enum(val: Any, enum_cls: type[Enum]) -> str | None:
    try:
        enum_cls(val)
    except (ValueError, KeyError):
        allowed = ", ".join(m.value for m in enum_cls)  # type: ignore[attr-defined]
        return f"{val!r} is not one of: {allowed}"
    return None


def validate_row(
    row: dict[str, Any],
    spec: TableSpec,
    *,
    index: int = 0,
    known_source_ids: frozenset[str] | None = None,
    today: _dt.date | None = None,
) -> list[Violation]:
    """Validate one canonical observation. Returns all violations, never raises."""
    out: list[Violation] = []
    today = today or _dt.date.today()

    def bad(col: str, rule: str, detail: str) -> None:
        out.append(Violation(index, col, rule, detail))

    # --- presence of required provenance ---------------------------------
    for col in REQUIRED_COLUMNS:
        if col not in row or _is_missing(row[col]):
            bad(col, "missing_provenance", "required column is absent or empty")

    # --- source identity --------------------------------------------------
    sid = row.get("source_id")
    if not _is_missing(sid):
        if not _SOURCE_ID_RE.match(str(sid)):
            bad("source_id", "malformed_source_id",
                f"{sid!r} must be UPPER_SNAKE, 3-64 chars, starting with a letter")
        elif known_source_ids is not None and str(sid) not in known_source_ids:
            bad("source_id", "unregistered_source",
                f"{sid!r} is not in source_registry")

    url = row.get("source_url")
    if not _is_missing(url):
        s = str(url)
        if not (s.startswith(("http://", "https://", "doi:"))
                or s == AccessStatus.ACCESS_REQUIRED.value):
            bad("source_url", "malformed_url",
                f"{s!r} must be http(s)://…, doi:…, or the literal ACCESS_REQUIRED")

    # --- time -------------------------------------------------------------
    ra = row.get("retrieved_at")
    if not _is_missing(ra):
        s = str(ra)[:10]
        if not _ISO_DATE_RE.match(s):
            bad("retrieved_at", "malformed_date", f"{ra!r} is not an ISO YYYY-MM-DD date")
        else:
            try:
                d = _dt.date.fromisoformat(s)
                if d > today:
                    bad("retrieved_at", "future_retrieval",
                        f"{s} is in the future relative to {today.isoformat()}")
            except ValueError:
                bad("retrieved_at", "malformed_date", f"{ra!r} is not a valid calendar date")

    sp = row.get("source_period")
    if not _is_missing(sp) and not _SOURCE_PERIOD_RE.match(str(sp)):
        bad("source_period", "malformed_period",
            f"{sp!r} must be YYYY, YYYY-MM, or YYYY/YYYY")

    yr = row.get("year")
    if not _is_missing(yr):
        try:
            y = int(yr)
            if not (MIN_YEAR <= y <= MAX_YEAR):
                bad("year", "year_out_of_range", f"{y} outside [{MIN_YEAR}, {MAX_YEAR}]")
            if not _is_missing(sp):
                m = re.match(r"^(\d{4})", str(sp))
                if m:
                    start = int(m.group(1))
                    end_m = re.search(r"/(\d{4})", str(sp))
                    end = int(end_m.group(1)) if end_m else start
                    if not (start <= y <= max(end, start)):
                        bad("year", "year_outside_source_period",
                            f"year {y} is not inside source_period {sp!r}")
        except (TypeError, ValueError):
            bad("year", "malformed_year", f"{yr!r} is not an integer")

    # --- geography --------------------------------------------------------
    lvl_raw = row.get("geography_level")
    lvl_err = None if _is_missing(lvl_raw) else _check_enum(lvl_raw, GeographyLevel)
    if lvl_err:
        bad("geography_level", "unknown_geography_level", lvl_err)

    gid = row.get("geography_id")
    if not _is_missing(gid) and not lvl_err and not _is_missing(lvl_raw):
        g = str(gid)
        lvl = GeographyLevel(lvl_raw)
        if lvl is GeographyLevel.COUNTRY:
            if not _ISO3_RE.match(g):
                bad("geography_id", "invalid_geocode",
                    f"{g!r} is not an ISO-3166 alpha-3 code, required at COUNTRY level")
        elif lvl is GeographyLevel.SUPRANATIONAL:
            if g not in _SUPRANATIONAL_CODES:
                bad("geography_id", "invalid_geocode",
                    f"{g!r} is not a registered supranational code "
                    f"({', '.join(sorted(_SUPRANATIONAL_CODES))})")
        elif lvl in (GeographyLevel.SUBNATIONAL1, GeographyLevel.METRO):
            if not _SUBNAT_RE.match(g):
                bad("geography_id", "invalid_geocode",
                    f"{g!r} must be ISO-3166-2 style, e.g. 'GBR-SCT'")
        elif lvl is GeographyLevel.GLOBAL and g != "WLD":
            bad("geography_id", "invalid_geocode", f"GLOBAL level requires 'WLD', got {g!r}")

    # --- stratifiers ------------------------------------------------------
    sex = row.get("sex")
    if not _is_missing(sex):
        err = _check_enum(sex, Sex)
        if err:
            bad("sex", "unknown_sex", err)
        elif spec.requires_sex and Sex(sex) is Sex.NA:
            bad("sex", "missing_stratifier",
                f"table {spec.name!r} is sex-stratified; NA is not acceptable")

    ag = row.get("age_group")
    if not _is_missing(ag):
        if str(ag) not in _LEGAL_AGE_GROUPS:
            bad("age_group", "unknown_age_group",
                f"{ag!r} is not one of: {', '.join(sorted(_LEGAL_AGE_GROUPS))}")
        elif spec.requires_age and str(ag) in {"ALL", "NA"}:
            bad("age_group", "missing_stratifier",
                f"table {spec.name!r} is age-stratified; {ag!r} is not acceptable")

    bc = row.get("birth_cohort")
    if not _is_missing(bc):
        try:
            b = int(bc)
            if not (MIN_YEAR - 50 <= b <= MAX_YEAR):
                bad("birth_cohort", "cohort_out_of_range", f"{b} is implausible")
            elif not _is_missing(yr):
                try:
                    age_implied = int(yr) - b
                    if age_implied < 0:
                        bad("birth_cohort", "cohort_after_observation",
                            f"birth_cohort {b} is after observation year {yr}")
                except (TypeError, ValueError):
                    pass
        except (TypeError, ValueError):
            bad("birth_cohort", "malformed_cohort", f"{bc!r} is not an integer year")

    # --- value, unit, uncertainty ----------------------------------------
    val = row.get("value")
    if not _is_missing(val):
        try:
            v = float(val)
            if v != v or v in (float("inf"), float("-inf")):
                bad("value", "non_finite_value", f"{val!r} is not finite")
        except (TypeError, ValueError):
            bad("value", "malformed_value", f"{val!r} is not numeric")
            v = None
    else:
        v = None

    unit = row.get("unit")
    if not _is_missing(unit) and str(unit) not in spec.units:
        bad("unit", "unknown_unit",
            f"{unit!r} is not in the unit vocabulary of {spec.name!r} "
            f"({', '.join(sorted(spec.units))})")

    lo, hi = row.get("uncertainty_lower"), row.get("uncertainty_upper")
    have_lo, have_hi = not _is_missing(lo), not _is_missing(hi)
    if have_lo != have_hi:
        bad("uncertainty_lower" if have_hi else "uncertainty_upper",
            "one_sided_uncertainty",
            "uncertainty_lower and uncertainty_upper must be given together or not at all")
    if have_lo and have_hi:
        try:
            flo, fhi = float(lo), float(hi)
            if flo > fhi:
                bad("uncertainty_lower", "inverted_interval", f"lower {flo} > upper {fhi}")
            elif v is not None and not (flo <= v <= fhi):
                bad("value", "value_outside_interval",
                    f"value {v} is outside [{flo}, {fhi}]")
        except (TypeError, ValueError):
            bad("uncertainty_lower", "malformed_uncertainty",
                f"({lo!r}, {hi!r}) are not both numeric")

    # --- measurement type and flags --------------------------------------
    mt_raw = row.get("measurement_type")
    mt_err = None if _is_missing(mt_raw) else _check_enum(mt_raw, MeasurementType)
    if mt_err:
        bad("measurement_type", "unknown_measurement_type", mt_err)

    pf = _as_bool(row.get("proxy_flag"))
    if "proxy_flag" in row and not _is_missing(row["proxy_flag"]) and pf is None:
        bad("proxy_flag", "malformed_flag", f"{row['proxy_flag']!r} is not boolean")
    imp = _as_bool(row.get("imputation_flag"))
    if "imputation_flag" in row and not _is_missing(row["imputation_flag"]) and imp is None:
        bad("imputation_flag", "malformed_flag", f"{row['imputation_flag']!r} is not boolean")

    if not mt_err and not _is_missing(mt_raw) and pf is not None:
        mt = MeasurementType(mt_raw)
        if mt is MeasurementType.PROXY and not pf:
            bad("proxy_flag", "proxy_flag_inconsistent",
                "measurement_type is PROXY but proxy_flag is False")
        if mt is MeasurementType.OBSERVED and pf:
            bad("proxy_flag", "proxy_flag_inconsistent",
                "measurement_type is OBSERVED but proxy_flag is True; "
                "a value standing in for another quantity is a PROXY")
        if mt is MeasurementType.SCENARIO_PARAMETER:
            if not _is_missing(url) and str(url).startswith(("http", "doi:")):
                # A scenario parameter may cite a justification, but it must not
                # claim to be a retrieved observation.
                pass
            if have_lo is False:
                bad("uncertainty_lower", "scenario_without_range",
                    "SCENARIO_PARAMETER rows must carry an explicit range; "
                    "an assumption without a range cannot be tested")

    # --- pipeline version -------------------------------------------------
    tpv = row.get("transform_pipeline_version")
    if not _is_missing(tpv) and not _PIPELINE_VERSION_RE.match(str(tpv)):
        bad("transform_pipeline_version", "malformed_pipeline_version",
            f"{tpv!r} must look like 'name@v1.0.0'")

    if imp and _is_missing(tpv):
        bad("transform_pipeline_version", "imputation_without_pipeline",
            "imputation_flag is True but no pipeline version records how")

    return out


def validate_rows(
    rows: Iterable[dict[str, Any]],
    table: str,
    *,
    known_source_ids: frozenset[str] | None = None,
    today: _dt.date | None = None,
) -> list[Violation]:
    """Validate an iterable of dict rows against a named canonical table."""
    spec = CANONICAL_TABLES.get(table)
    if spec is None:
        raise KeyError(
            f"{table!r} is not a canonical data product. Known: "
            f"{', '.join(sorted(CANONICAL_TABLES))}"
        )
    violations: list[Violation] = []
    for i, row in enumerate(rows):
        violations.extend(
            validate_row(row, spec, index=i,
                         known_source_ids=known_source_ids, today=today)
        )
    return violations


def _frame_to_dicts(df: Any) -> Iterator[dict[str, Any]]:
    for rec in df.to_dict(orient="records"):
        yield rec


def validate_frame(
    df: Any,
    table: str,
    *,
    known_source_ids: frozenset[str] | None = None,
    today: _dt.date | None = None,
    raise_on_error: bool = True,
) -> list[Violation]:
    """Validate a DataFrame against a canonical table contract.

    Raises DataContractError when ``raise_on_error`` and any violation is found,
    including duplicate rows at the table's declared grain.
    """
    spec = CANONICAL_TABLES.get(table)
    if spec is None:
        raise KeyError(
            f"{table!r} is not a canonical data product. Known: "
            f"{', '.join(sorted(CANONICAL_TABLES))}"
        )

    violations: list[Violation] = []
    cols = set(map(str, df.columns))
    missing = [c for c in REQUIRED_COLUMNS if c not in cols]
    for c in missing:
        violations.append(Violation(-1, c, "missing_column",
                                    f"canonical column absent from {table!r}"))
    for c in spec.extra_columns:
        if c not in cols:
            violations.append(Violation(-1, c, "missing_column",
                                        f"column required by {table!r} is absent"))

    if not missing:
        violations.extend(
            validate_rows(_frame_to_dicts(df), table,
                          known_source_ids=known_source_ids, today=today)
        )
        grain = [g for g in spec.grain if g in cols]
        if len(grain) == len(spec.grain) and len(df) > 0:
            dup_mask = df.duplicated(subset=grain, keep=False)
            for i in [int(x) for x in dup_mask[dup_mask].index[:50]]:
                violations.append(Violation(
                    i, "+".join(grain), "duplicate_grain",
                    f"more than one row at the declared grain of {table!r}",
                ))

    if violations and raise_on_error:
        raise DataContractError(table, violations)
    return violations
