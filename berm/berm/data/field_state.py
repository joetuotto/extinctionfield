"""Indexed observation contract for local FieldState panels.

The FieldState physics class represents one local calculation input.  This
module makes its analysis grain explicit so a national proxy cannot be joined
silently to an organ endpoint:

    country / area / setting / cohort / sex / life-stage / organ / time.

It is intentionally separate from the canonical country-year observation
tables because a physical field panel has finer spatial and temporal grain and
includes vectors, spectra, phase and organ transfer metadata.
"""

from __future__ import annotations

from dataclasses import dataclass
from typing import Iterable, Mapping

from berm.physics.field_state import FieldState, ReceptorState, TransferMatrix


FIELDSTATE_OBSERVATION_VERSION = "fieldstate-observation-v1"


def _nonempty(name: str, value: str) -> str:
    if not isinstance(value, str) or not value.strip():
        raise ValueError(f"{name} must be a non-empty string")
    return value.strip()


@dataclass(frozen=True)
class FieldStateObservation:
    """One time-indexed, organ-local FieldState observation/derivation.

    ``source_ids`` must name the physical input datasets or the declared proxy
    source.  The FieldState completeness status remains the authoritative
    statement about whether the record is measurement-ready.
    """

    observation_id: str
    time_id: str
    state: FieldState
    receptor: ReceptorState
    transfer: TransferMatrix
    source_ids: tuple[str, ...]
    endpoint_join_id: str | None = None
    provenance: Mapping[str, str] | None = None

    def __post_init__(self) -> None:
        object.__setattr__(self, "observation_id", _nonempty("observation_id", self.observation_id))
        object.__setattr__(self, "time_id", _nonempty("time_id", self.time_id))
        if not isinstance(self.state, FieldState):
            raise TypeError("state must be a FieldState")
        if not isinstance(self.receptor, ReceptorState):
            raise TypeError("receptor must be a ReceptorState")
        if not isinstance(self.transfer, TransferMatrix):
            raise TypeError("transfer must be a TransferMatrix")
        if self.state.country is None or self.state.year is None:
            raise ValueError("state.country and state.year are required for an indexed observation")
        if self.state.biological_sex is None or self.state.cohort_id is None:
            raise ValueError("state.biological_sex and state.cohort_id are required")
        if self.state.setting is None:
            raise ValueError("state.setting is required (for example household or workplace)")
        sources = tuple(_nonempty("source_id", source) for source in self.source_ids)
        if not sources:
            raise ValueError("source_ids must contain at least one identifier")
        if len(set(sources)) != len(sources):
            raise ValueError("source_ids contains duplicate identifiers")
        object.__setattr__(self, "source_ids", sources)
        if self.endpoint_join_id is not None:
            object.__setattr__(self, "endpoint_join_id", _nonempty("endpoint_join_id", self.endpoint_join_id))
        if self.provenance is not None and not isinstance(self.provenance, Mapping):
            raise ValueError("provenance must be a mapping")

    @property
    def key(self) -> tuple[str, str | None, str, str | int, str, str | None, str, str]:
        """The required FieldState analysis grain, including the local time ID."""
        return (
            self.state.country or "",
            self.state.area,
            self.state.setting or "",
            self.state.cohort_id if self.state.cohort_id is not None else "",
            self.state.biological_sex or "",
            self.state.life_stage,
            self.receptor.organ,
            self.time_id,
        )


def validate_fieldstate_panel(
    observations: Iterable[FieldStateObservation],
) -> tuple[FieldStateObservation, ...]:
    """Fail for duplicate local observations rather than averaging them silently."""
    rows = tuple(observations)
    if not rows:
        raise ValueError("FieldState panel must contain at least one observation")
    if not all(isinstance(row, FieldStateObservation) for row in rows):
        raise TypeError("observations must contain FieldStateObservation values")
    keys = tuple(row.key for row in rows)
    duplicate = next((key for key in keys if keys.count(key) > 1), None)
    if duplicate is not None:
        raise ValueError(f"duplicate FieldState observation key: {duplicate!r}")
    return rows


__all__ = [
    "FIELDSTATE_OBSERVATION_VERSION",
    "FieldStateObservation",
    "validate_fieldstate_panel",
]
