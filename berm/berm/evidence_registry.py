"""Machine-readable mechanism evidence for the FieldState ASFR route.

``data/registry/source_registry.csv`` remains the provenance registry for
model input datasets.  This separate registry records biomedical and physics
studies used to justify *causal-node structure*.  A paper in this file never
becomes an active prediction parameter merely by being listed here.

Each record names the exact causal node(s), study system, field class,
directness and translation boundary.  This prevents, for example, an avian
orientation experiment from being displayed as direct evidence of a human TFR
coefficient, while retaining its strong relevance to the Lindgren vector/RPM
premise.
"""

from __future__ import annotations

from dataclasses import dataclass
from functools import lru_cache
import json
from pathlib import Path
from typing import Iterable

from berm.biology.causal_registry import validate_causal_nodes


FIELDSTATE_EVIDENCE_VERSION = "fieldstate-evidence-v1"
EVIDENCE_PATH = (
    Path(__file__).resolve().parent.parent / "data" / "evidence" / "fieldstate_causal_evidence.json"
)

_DIRECTNESS = frozenset({
    "PHYSICS_SIGNATURE",
    "MECHANISTIC_INTERMEDIATE",
    "REPRODUCTIVE_ENDPOINT",
    "SYSTEMATIC_REVIEW",
    "POPULATION_DESCRIPTIVE",
})
_CALIBRATION_ROLES = frozenset({"STRUCTURAL_ONLY", "CONTEXT_ONLY"})


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


__all__ = [
    "EVIDENCE_PATH",
    "FIELDSTATE_EVIDENCE_VERSION",
    "FieldStateEvidenceRecord",
    "evidence_for_node",
    "evidence_summary",
    "load_fieldstate_evidence",
]
