"""Loaders and validators for the source and parameter registries.

The registries are the answer to "where did this number come from?". They are
CSV so that a change of provenance is visible in a pull-request diff: a
``proxy_flag`` flipping from True to False, or an ``evidence_grade`` rising
from SCENARIO to MEASURED, is exactly the kind of change that must be
reviewed by a human rather than buried in a binary blob.

Stdlib only.
"""

from __future__ import annotations

import csv
import datetime as _dt
import re
from dataclasses import dataclass
from functools import lru_cache
from pathlib import Path
from typing import Iterable

from berm.data.contracts import (
    AccessStatus,
    DataContractError,
    EvidenceGrade,
    MeasurementType,
    Violation,
    _ISO_DATE_RE,
    _SOURCE_ID_RE,
)

__all__ = [
    "REGISTRY_DIR",
    "SOURCE_REGISTRY_PATH",
    "PARAMETER_REGISTRY_PATH",
    "SourceRecord",
    "ParameterRecord",
    "load_source_registry",
    "load_parameter_registry",
    "known_source_ids",
    "validate_source_registry",
    "validate_parameter_registry",
    "SOURCE_REGISTRY_COLUMNS",
    "PARAMETER_REGISTRY_COLUMNS",
]

REGISTRY_DIR = Path(__file__).resolve().parent.parent.parent / "data" / "registry"
SOURCE_REGISTRY_PATH = REGISTRY_DIR / "source_registry.csv"
PARAMETER_REGISTRY_PATH = REGISTRY_DIR / "parameter_registry.csv"

SOURCE_REGISTRY_COLUMNS: tuple[str, ...] = (
    "source_id", "title", "publisher", "citation", "source_url", "license",
    "access_status", "retrieved_at", "checksum_sha256", "original_filename",
    "temporal_coverage", "geographic_coverage", "geographic_level", "variables",
    "known_limitations", "transform_pipeline", "used_in_active_prediction",
    "measurement_class", "notes",
)

PARAMETER_REGISTRY_COLUMNS: tuple[str, ...] = (
    "parameter_name", "value", "unit", "prior_or_range", "evidence_grade",
    "source_id", "scope", "active_model_version", "defined_in", "affects", "notes",
)

_SHA256_RE = re.compile(r"^[0-9a-f]{64}$")
_RANGE_RE = re.compile(r"^\[\s*-?[\d.eE+-]+\s*,\s*-?[\d.eE+-]+\s*\]$")

#: measurement_class values legal in the source registry. NOT_ACQUIRED marks a
#: source we have identified but do not hold, so nothing can be classified yet.
_LEGAL_MEASUREMENT_CLASSES: frozenset[str] = frozenset(
    {m.value for m in MeasurementType} | {"NOT_ACQUIRED"}
)


@dataclass(frozen=True)
class SourceRecord:
    source_id: str
    title: str
    publisher: str
    citation: str
    source_url: str
    license: str
    access_status: str
    retrieved_at: str
    checksum_sha256: str
    original_filename: str
    temporal_coverage: str
    geographic_coverage: str
    geographic_level: str
    variables: str
    known_limitations: str
    transform_pipeline: str
    used_in_active_prediction: str
    measurement_class: str
    notes: str

    @property
    def is_held(self) -> bool:
        """True when the artefact is actually on disk with a checksum."""
        return bool(self.checksum_sha256.strip())

    @property
    def feeds_prediction(self) -> bool:
        return self.used_in_active_prediction.strip().lower() in {"yes", "true", "1"}


@dataclass(frozen=True)
class ParameterRecord:
    parameter_name: str
    value: str
    unit: str
    prior_or_range: str
    evidence_grade: str
    source_id: str
    scope: str
    active_model_version: str
    defined_in: str
    affects: str
    notes: str

    @property
    def is_assumption(self) -> bool:
        return self.evidence_grade in {
            EvidenceGrade.SCENARIO.value,
            EvidenceGrade.UNIDENTIFIED.value,
        }


def _read_csv(path: Path, columns: tuple[str, ...]) -> list[dict[str, str]]:
    if not path.exists():
        raise FileNotFoundError(f"registry not found at {path}")
    with path.open(newline="", encoding="utf-8") as fh:
        reader = csv.DictReader(fh)
        header = tuple(reader.fieldnames or ())
        if header != columns:
            missing = [c for c in columns if c not in header]
            extra = [c for c in header if c not in columns]
            raise DataContractError(path.name, [Violation(
                -1, "header", "registry_header_mismatch",
                f"missing={missing or 'none'} unexpected={extra or 'none'} "
                f"order_ok={header[:len(columns)] == columns}",
            )])
        return [{k: (v or "").strip() for k, v in row.items()} for row in reader]


@lru_cache(maxsize=1)
def load_source_registry() -> dict[str, SourceRecord]:
    """Return the source registry keyed by source_id."""
    rows = _read_csv(SOURCE_REGISTRY_PATH, SOURCE_REGISTRY_COLUMNS)
    out: dict[str, SourceRecord] = {}
    for row in rows:
        rec = SourceRecord(**row)
        out[rec.source_id] = rec
    return out


@lru_cache(maxsize=1)
def load_parameter_registry() -> dict[str, ParameterRecord]:
    """Return the parameter registry keyed by parameter_name."""
    rows = _read_csv(PARAMETER_REGISTRY_PATH, PARAMETER_REGISTRY_COLUMNS)
    return {r["parameter_name"]: ParameterRecord(**r) for r in rows}


def known_source_ids() -> frozenset[str]:
    return frozenset(load_source_registry())


# --------------------------------------------------------------------------
# Registry validation
# --------------------------------------------------------------------------


def validate_source_registry(
    records: Iterable[SourceRecord] | None = None,
    *,
    today: _dt.date | None = None,
) -> list[Violation]:
    """Check internal consistency of the source registry."""
    recs = list(records if records is not None else load_source_registry().values())
    today = today or _dt.date.today()
    out: list[Violation] = []
    seen: set[str] = set()

    for i, r in enumerate(recs):
        def bad(col: str, rule: str, detail: str) -> None:
            out.append(Violation(i, col, rule, detail))

        if not _SOURCE_ID_RE.match(r.source_id):
            bad("source_id", "malformed_source_id",
                f"{r.source_id!r} must be UPPER_SNAKE, 3-64 chars")
        if r.source_id in seen:
            bad("source_id", "duplicate_source_id", f"{r.source_id!r} appears twice")
        seen.add(r.source_id)

        for col in ("title", "citation", "license", "known_limitations"):
            if not getattr(r, col):
                bad(col, "missing_provenance", "must not be empty")

        try:
            access = AccessStatus(r.access_status)
        except ValueError:
            bad("access_status", "unknown_access_status",
                f"{r.access_status!r} is not one of: "
                f"{', '.join(m.value for m in AccessStatus)}")
            access = None

        if r.measurement_class not in _LEGAL_MEASUREMENT_CLASSES:
            bad("measurement_class", "unknown_measurement_class",
                f"{r.measurement_class!r} is not one of: "
                f"{', '.join(sorted(_LEGAL_MEASUREMENT_CLASSES))}")

        if r.used_in_active_prediction.lower() not in {"yes", "no"}:
            bad("used_in_active_prediction", "malformed_flag",
                f"{r.used_in_active_prediction!r} must be 'yes' or 'no'")

        # A source we claim to hold must be reproducible: checksum + retrieval date.
        if access is AccessStatus.OPEN and r.original_filename:
            if not _SHA256_RE.match(r.checksum_sha256):
                bad("checksum_sha256", "missing_checksum",
                    f"{r.source_id} names a file {r.original_filename!r} "
                    "but carries no valid sha256")
            if not _ISO_DATE_RE.match(r.retrieved_at):
                bad("retrieved_at", "missing_retrieval_date",
                    f"{r.source_id} names a file but has no ISO retrieval date")
            elif _dt.date.fromisoformat(r.retrieved_at) > today:
                bad("retrieved_at", "future_retrieval",
                    f"{r.retrieved_at} is in the future")

        # A source we do not hold must not be described as an observation.
        if access in (AccessStatus.ACCESS_REQUIRED, AccessStatus.NOT_YET_ACQUIRED):
            if r.measurement_class in {MeasurementType.OBSERVED.value,
                                       MeasurementType.PROXY.value}:
                if not r.checksum_sha256:
                    bad("measurement_class", "unheld_source_classified",
                        f"{r.source_id} is {access.value} with no artefact on disk, "
                        f"so it cannot be classified {r.measurement_class}; "
                        "use NOT_ACQUIRED until it is held")
            if not r.notes:
                bad("notes", "missing_acquisition_note",
                    f"{r.source_id} is {access.value} and must document exactly "
                    "what has to be obtained")

    return out


def validate_parameter_registry(
    records: Iterable[ParameterRecord] | None = None,
) -> list[Violation]:
    """Check internal consistency of the parameter registry."""
    recs = list(records if records is not None else load_parameter_registry().values())
    sources = known_source_ids()
    out: list[Violation] = []
    seen: set[str] = set()

    for i, r in enumerate(recs):
        def bad(col: str, rule: str, detail: str) -> None:
            out.append(Violation(i, col, rule, detail))

        if not r.parameter_name:
            bad("parameter_name", "missing_name", "must not be empty")
        if r.parameter_name in seen:
            bad("parameter_name", "duplicate_parameter",
                f"{r.parameter_name!r} appears twice")
        seen.add(r.parameter_name)

        try:
            grade = EvidenceGrade(r.evidence_grade)
        except ValueError:
            bad("evidence_grade", "unknown_evidence_grade",
                f"{r.evidence_grade!r} is not one of: "
                f"{', '.join(m.value for m in EvidenceGrade)}")
            grade = None

        if not r.unit:
            bad("unit", "missing_unit", "every parameter must carry a unit")
        if not r.prior_or_range:
            bad("prior_or_range", "missing_range",
                "a parameter without a range cannot be varied or tested")
        elif not (_RANGE_RE.match(r.prior_or_range)
                  or r.prior_or_range.startswith("see ")):
            bad("prior_or_range", "malformed_range",
                f"{r.prior_or_range!r} must be '[lo, hi]' or 'see <file>:<line>'")

        if not r.source_id:
            bad("source_id", "missing_provenance", "must reference a registered source")
        elif r.source_id not in sources:
            bad("source_id", "unregistered_source",
                f"{r.source_id!r} is not in source_registry.csv")

        if not r.defined_in:
            bad("defined_in", "missing_code_location",
                "must name the file:line where the value lives")
        if not r.affects:
            bad("affects", "missing_effect",
                "must name what the parameter changes (E, D, R, ASFR or TFR)")
        if not r.scope:
            bad("scope", "missing_scope", "must state which geographies/years it applies to")
        if not r.active_model_version:
            bad("active_model_version", "missing_model_version",
                "must state which model version consumes it")

        # A MEASURED parameter must point at a real, held source.
        if grade is EvidenceGrade.MEASURED and r.source_id in sources:
            src = load_source_registry()[r.source_id]
            if src.measurement_class == MeasurementType.SCENARIO_PARAMETER.value:
                bad("evidence_grade", "measured_from_scenario_source",
                    f"{r.parameter_name} is graded MEASURED but its source "
                    f"{r.source_id} is a scenario placeholder")

        # An assumption must never claim an observational source.
        if grade in (EvidenceGrade.SCENARIO, EvidenceGrade.UNIDENTIFIED) \
                and r.source_id in sources:
            src = load_source_registry()[r.source_id]
            if src.measurement_class in {MeasurementType.OBSERVED.value,
                                         MeasurementType.PROXY.value}:
                bad("source_id", "assumption_claims_observation",
                    f"{r.parameter_name} is graded {r.evidence_grade} but points at "
                    f"{r.source_id}, which is registered as {src.measurement_class}")

    return out
