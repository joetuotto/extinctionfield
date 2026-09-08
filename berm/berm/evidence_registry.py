"""Machine-readable mechanism evidence for BERM and FieldState measurements.

``data/registry/source_registry.csv`` remains the provenance registry for
model input datasets.  This separate registry records biomedical and physics
studies used to justify *causal-node structure*.  A source-qualified record is
active non-numeric evidence: it constrains the graph, direction, field-feature
signature, life stage or memory family.  It never becomes an unexamined single
prediction parameter merely by being listed here.

FieldState records constrain the optional measurement interface.  They do not
make FieldState an alias or causal root of BERM.  They can constrain inputs to
BERM's conditional formal L2 operator but do not calibrate its tissue kernels.

Each record names the exact causal node(s), study system, field class,
directness and translation boundary.  This prevents, for example, an avian
orientation experiment from being displayed as direct evidence of a human TFR
coefficient, while retaining its strong relevance to the Lindgren vector/RPM
premise.

The historical 129-record bibliography is loaded through a separate migration
manifest below.  It remains queryable and source-anchored.  Semantic placement
and source qualification can make an individual legacy source an active broad
constraint or candidate prior; a legacy pathway label alone never creates a
numerical parameter or silently collapses uncertainty.
"""

from __future__ import annotations

from dataclasses import dataclass
from functools import lru_cache
import json
from pathlib import Path
from typing import Iterable, Mapping

from berm.biology.causal_registry import validate_causal_nodes


FIELDSTATE_EVIDENCE_VERSION = "fieldstate-evidence-v1"
EVIDENCE_PATH = (
    Path(__file__).resolve().parent.parent / "data" / "evidence" / "fieldstate_causal_evidence.json"
)
LEGACY_EVIDENCE_MIGRATION_VERSION = "legacy-reference-migration-v1"
LEGACY_EVIDENCE_MIGRATION_PATH = (
    Path(__file__).resolve().parent.parent
    / "data"
    / "evidence"
    / "legacy_reference_migration_v1.json"
)

_DIRECTNESS = frozenset({
    "PHYSICS_SIGNATURE",
    "MECHANISTIC_INTERMEDIATE",
    "REPRODUCTIVE_ENDPOINT",
    "ECOLOGICAL_ENDPOINT",
    "SYSTEMATIC_REVIEW",
    "POPULATION_DESCRIPTIVE",
})
_CALIBRATION_ROLES = frozenset({"STRUCTURAL_ONLY", "CONTEXT_ONLY"})
_LEGACY_EMPTY_NODE_STATUSES = frozenset({
    "CONTEXT_ONLY",
    "UNVERIFIED_CITATION",
    "OUTSIDE_ACTIVE_GRAPH",
    # A retracted source keeps no causal nodes: it is provenance, not evidence.
    "RETRACTED_2024",
})


def _nonempty(name: str, value: str) -> str:
    if not isinstance(value, str) or not value.strip():
        raise ValueError(f"{name} must be a non-empty string")
    return value.strip()


@dataclass(frozen=True)
class FieldStateEvidenceRecord:
    """One bounded study-to-causal-node assertion."""

    id: str
    citation: str
    url: str
    year: int
    study_type: str
    system: str
    field_class: str
    finding: str
    causal_nodes: tuple[str, ...]
    directness: str
    translation_scope: str
    calibration_role: str
    limitations: tuple[str, ...]
    pmid: str | None = None
    doi: str | None = None

    def __post_init__(self) -> None:
        for name in (
            "id",
            "citation",
            "url",
            "study_type",
            "system",
            "field_class",
            "finding",
            "translation_scope",
            "calibration_role",
        ):
            object.__setattr__(self, name, _nonempty(name, getattr(self, name)))
        if not self.url.startswith(("https://", "http://")):
            raise ValueError("url must be an http(s) URL")
        if isinstance(self.year, bool) or not 1900 <= int(self.year) <= 2100:
            raise ValueError("year must be an integer in [1900, 2100]")
        object.__setattr__(self, "year", int(self.year))
        object.__setattr__(self, "causal_nodes", validate_causal_nodes(self.causal_nodes))
        if self.directness not in _DIRECTNESS:
            raise ValueError(f"unknown directness {self.directness!r}")
        if self.calibration_role not in _CALIBRATION_ROLES:
            raise ValueError(f"unknown calibration_role {self.calibration_role!r}")
        limits = tuple(_nonempty("limitation", item) for item in self.limitations)
        if not limits:
            raise ValueError("limitations must contain at least one item")
        object.__setattr__(self, "limitations", limits)
        for name in ("pmid", "doi"):
            value = getattr(self, name)
            if value is not None:
                object.__setattr__(self, name, _nonempty(name, value))


@dataclass(frozen=True)
class LegacyEvidenceMigrationRecord:
    """One preserved, source-qualified legacy bibliography record.

    This object is intentionally distinct from :class:`FieldStateEvidenceRecord`.
    A migrated record retains provenance and a semantic placement decision.
    The evidence-constraint ledger can promote a source-qualified record to an
    active broad prior while preserving its legacy origin; it never makes one a
    numerical parameter by default. Empty ``canonical_nodes`` deliberately
    preserve discovery/context sources without inventing a causal edge.
    """

    legacy_id: str
    # ``None`` for records added after the archive snapshot (e.g. source-verified
    # CSLI sentinel panels); every archive-derived record keeps its 1-based index.
    legacy_source_record_index: int | None
    citation: Mapping[str, object]
    legacy_classification: Mapping[str, object]
    canonical_nodes: tuple[str, ...]
    model_domain: str
    evidence_role: str
    status: str
    source_status: str
    translation_scope: str
    limitations: tuple[str, ...]
    calibration_role: str
    canonical_evidence_id: str | None = None

    def __post_init__(self) -> None:
        for name in (
            "legacy_id",
            "model_domain",
            "evidence_role",
            "status",
            "source_status",
            "translation_scope",
            "calibration_role",
        ):
            object.__setattr__(self, name, _nonempty(name, getattr(self, name)))
        if self.legacy_source_record_index is not None:
            if isinstance(self.legacy_source_record_index, bool):
                raise ValueError("legacy_source_record_index must be a positive integer")
            try:
                source_index = int(self.legacy_source_record_index)
            except (TypeError, ValueError) as exc:
                raise ValueError("legacy_source_record_index must be a positive integer") from exc
            if source_index < 1 or source_index != self.legacy_source_record_index:
                raise ValueError("legacy_source_record_index must be a positive integer")
            object.__setattr__(self, "legacy_source_record_index", source_index)
        if not isinstance(self.citation, Mapping) or not _nonempty(
            "citation.title", str(self.citation.get("title", ""))
        ):
            raise ValueError("citation must contain a non-empty title")
        if not isinstance(self.legacy_classification, Mapping):
            raise ValueError("legacy_classification must be a mapping")
        nodes = tuple(self.canonical_nodes)
        if nodes:
            object.__setattr__(self, "canonical_nodes", validate_causal_nodes(nodes))
        elif self.status not in _LEGACY_EMPTY_NODE_STATUSES:
            raise ValueError(
                "empty canonical_nodes are only valid for explicit context/outside-graph statuses"
            )
        if self.calibration_role not in _CALIBRATION_ROLES:
            raise ValueError(f"unknown calibration_role {self.calibration_role!r}")
        limits = tuple(_nonempty("limitation", item) for item in self.limitations)
        if not limits:
            raise ValueError("limitations must contain at least one item")
        object.__setattr__(self, "limitations", limits)
        if self.canonical_evidence_id is not None:
            object.__setattr__(
                self,
                "canonical_evidence_id",
                _nonempty("canonical_evidence_id", self.canonical_evidence_id),
            )


def _record_from_dict(raw: dict) -> FieldStateEvidenceRecord:
    return FieldStateEvidenceRecord(
        id=raw["id"],
        citation=raw["citation"],
        url=raw["url"],
        year=raw["year"],
        study_type=raw["study_type"],
        system=raw["system"],
        field_class=raw["field_class"],
        finding=raw["finding"],
        causal_nodes=tuple(raw["causal_nodes"]),
        directness=raw["directness"],
        translation_scope=raw["translation_scope"],
        calibration_role=raw["calibration_role"],
        limitations=tuple(raw["limitations"]),
        pmid=raw.get("pmid"),
        doi=raw.get("doi"),
    )


def _legacy_record_from_dict(raw: dict) -> LegacyEvidenceMigrationRecord:
    return LegacyEvidenceMigrationRecord(
        legacy_id=raw["legacy_id"],
        legacy_source_record_index=raw.get("legacy_source_record_index"),
        citation=dict(raw["citation"]),
        legacy_classification=dict(raw["legacy_classification"]),
        canonical_nodes=tuple(raw.get("canonical_nodes", ())),
        model_domain=raw["model_domain"],
        evidence_role=raw["evidence_role"],
        status=raw["status"],
        source_status=raw["source_status"],
        translation_scope=raw["translation_scope"],
        limitations=tuple(raw["limitations"]),
        calibration_role=raw["calibration_role"],
        canonical_evidence_id=raw.get("canonical_evidence_id"),
    )


@lru_cache(maxsize=1)
def load_fieldstate_evidence() -> tuple[FieldStateEvidenceRecord, ...]:
    """Load the bounded evidence registry and reject inconsistent node IDs."""
    raw = json.loads(EVIDENCE_PATH.read_text(encoding="utf-8"))
    if raw.get("registry_version") != FIELDSTATE_EVIDENCE_VERSION:
        raise ValueError(
            f"expected registry_version {FIELDSTATE_EVIDENCE_VERSION!r}, "
            f"got {raw.get('registry_version')!r}"
        )
    records = tuple(_record_from_dict(record) for record in raw.get("records", ()))
    ids = tuple(record.id for record in records)
    if not records:
        raise ValueError("FieldState evidence registry is empty")
    if len(set(ids)) != len(ids):
        raise ValueError("FieldState evidence registry contains duplicate IDs")
    return records


@lru_cache(maxsize=1)
def load_legacy_evidence_migration() -> tuple[LegacyEvidenceMigrationRecord, ...]:
    """Load the preserved bibliography crosswalk without activating its records."""
    raw = json.loads(LEGACY_EVIDENCE_MIGRATION_PATH.read_text(encoding="utf-8"))
    if raw.get("migration_version") != LEGACY_EVIDENCE_MIGRATION_VERSION:
        raise ValueError(
            "expected legacy migration version "
            f"{LEGACY_EVIDENCE_MIGRATION_VERSION!r}, got {raw.get('migration_version')!r}"
        )
    records = tuple(_legacy_record_from_dict(record) for record in raw.get("records", ()))
    ids = tuple(record.legacy_id for record in records)
    if not records:
        raise ValueError("legacy evidence migration is empty")
    if len(set(ids)) != len(ids):
        raise ValueError("legacy evidence migration contains duplicate legacy IDs")
    active_ids = {record.id for record in load_fieldstate_evidence()}
    missing_aliases = {
        record.canonical_evidence_id
        for record in records
        if record.canonical_evidence_id is not None
        and record.canonical_evidence_id not in active_ids
    }
    if missing_aliases:
        raise ValueError(
            "legacy migration aliases missing active evidence records: "
            + ", ".join(sorted(missing_aliases))
        )
    return records


def evidence_for_node(node_id: str) -> tuple[FieldStateEvidenceRecord, ...]:
    """Return all records linked to a canonical causal node or legacy alias."""
    canonical = validate_causal_nodes((node_id,))[0]
    return tuple(record for record in load_fieldstate_evidence() if canonical in record.causal_nodes)


def evidence_summary(
    records: Iterable[FieldStateEvidenceRecord] | None = None,
) -> dict[str, dict[str, int]]:
    """Count records by directness for each semantic causal node."""
    selected = tuple(load_fieldstate_evidence() if records is None else records)
    output: dict[str, dict[str, int]] = {}
    for record in selected:
        for node in record.causal_nodes:
            by_directness = output.setdefault(node, {})
            by_directness[record.directness] = by_directness.get(record.directness, 0) + 1
    return {node: dict(sorted(counts.items())) for node, counts in sorted(output.items())}


def legacy_evidence_summary(
    records: Iterable[LegacyEvidenceMigrationRecord] | None = None,
) -> dict[str, object]:
    """Summarise retained legacy evidence without combining it with active weights."""
    selected = tuple(load_legacy_evidence_migration() if records is None else records)
    by_status: dict[str, int] = {}
    by_domain: dict[str, int] = {}
    for record in selected:
        by_status[record.status] = by_status.get(record.status, 0) + 1
        by_domain[record.model_domain] = by_domain.get(record.model_domain, 0) + 1
    return {
        "record_count": len(selected),
        "active_alias_count": sum(
            record.status == "SUPERSEDED_BY_ACTIVE_RECORD" for record in selected
        ),
        "by_status": dict(sorted(by_status.items())),
        "by_model_domain": dict(sorted(by_domain.items())),
        "interpretation": (
            "Preserved bibliography with source-by-source semantic placement. Individual "
            "records may be active broad priors after qualification; neither migration nor "
            "qualification creates a numerical FieldState or TFR coefficient by itself."
        ),
    }


__all__ = [
    "EVIDENCE_PATH",
    "FIELDSTATE_EVIDENCE_VERSION",
    "FieldStateEvidenceRecord",
    "LEGACY_EVIDENCE_MIGRATION_PATH",
    "LEGACY_EVIDENCE_MIGRATION_VERSION",
    "LegacyEvidenceMigrationRecord",
    "evidence_for_node",
    "evidence_summary",
    "legacy_evidence_summary",
    "load_fieldstate_evidence",
    "load_legacy_evidence_migration",
]
