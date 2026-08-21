"""Age-specific ASFR/TFR projection for the FieldState biological route.

This is a new, parallel ``berm-v19`` route.  It does not modify the
active v17 community-sigmoid model or the WPP/v16 data-driven route.

The model preserves the demographic identity rather than fitting a direct
country-level EMF-to-TFR curve:

    ASFR(age, year)
        = observed/reference ASFR
        * biological couple-capacity ratio
        * demand/opportunity ratio
        * tempo ratio
        * ART/live-birth delivery ratio

    TFR = 5 * sum(ASFR) / 1000

The FieldState chain provides only the biological couple-capacity ratio.  The
other terms remain explicit so delayed childbearing, family intentions,
partnering, contraception, policy and ART are not silently recoded as biology.
"""

from __future__ import annotations

from dataclasses import dataclass, field
import math
from typing import Iterable, Mapping

from berm.biology.reproductive_state import (
    ENDPOINT_CALIBRATED,
    STRUCTURAL_ONLY,
    CoupleReproductiveState,
)
from berm.data.wpp import AGE_GROUPS, asfr_to_tfr


FIELDSTATE_ASFR_VERSION = "berm-v19"


def _finite(name: str, value: float) -> float:
    if isinstance(value, bool):
        raise ValueError(f"{name} must be a finite number, not a boolean")
    try:
        resolved = float(value)
    except (TypeError, ValueError) as exc:
        raise ValueError(f"{name} must be a finite number") from exc
    if not math.isfinite(resolved):
        raise ValueError(f"{name} must be a finite number")
    return resolved


def _positive(name: str, value: float, *, allow_zero: bool = False) -> float:
    resolved = _finite(name, value)
    if resolved < 0.0 or (resolved == 0.0 and not allow_zero):
        qualifier = "non-negative" if allow_zero else "positive"
        raise ValueError(f"{name} must be {qualifier}")
    return resolved


def _nonempty(name: str, value: str) -> str:
    if not isinstance(value, str) or not value.strip():
        raise ValueError(f"{name} must be a non-empty string")
    return value.strip()


@dataclass(frozen=True)
class AgeSpecificFieldStateInput:
    """One age group in a reference-to-target FieldState ASFR bridge.

    The reference ASFR must come from a named observed product (normally UN
    WPP).  The target/reference states are paired biological capacity states,
    not country-average male and female factors.  Inputs need not be fully
    calibrated to inspect an explicit structural scenario; the resulting
    projection then remains labelled ``STRUCTURAL_ONLY``.
    """

    age_group: str
    reference_asfr: float
    reference_couple: CoupleReproductiveState
    target_couple: CoupleReproductiveState
    reference_demand_opportunity: float = 1.0
    target_demand_opportunity: float = 1.0
    reference_tempo: float = 1.0
    target_tempo: float = 1.0
    reference_art_live_birth_delivery: float = 1.0
    target_art_live_birth_delivery: float = 1.0
    birth_cohort: int | None = None
    asfr_source_id: str = "UNSPECIFIED_ASFR_SOURCE"
    demand_source_id: str = "UNSPECIFIED_DEMAND_SOURCE"
    tempo_source_id: str = "UNSPECIFIED_TEMPO_SOURCE"
    art_source_id: str = "UNSPECIFIED_ART_SOURCE"

    def __post_init__(self) -> None:
        if self.age_group not in AGE_GROUPS:
            allowed = ", ".join(AGE_GROUPS)
            raise ValueError(f"age_group must be one of: {allowed}")
        object.__setattr__(
            self, "reference_asfr", _positive("reference_asfr", self.reference_asfr, allow_zero=True)
        )
        if not isinstance(self.reference_couple, CoupleReproductiveState):
            raise TypeError("reference_couple must be a CoupleReproductiveState")
        if not isinstance(self.target_couple, CoupleReproductiveState):
            raise TypeError("target_couple must be a CoupleReproductiveState")
        for name in (
            "reference_demand_opportunity",
            "target_demand_opportunity",
            "reference_tempo",
            "target_tempo",
            "reference_art_live_birth_delivery",
            "target_art_live_birth_delivery",
        ):
            object.__setattr__(self, name, _positive(name, getattr(self, name)))
        if self.birth_cohort is not None:
            if isinstance(self.birth_cohort, bool) or int(self.birth_cohort) != self.birth_cohort:
                raise ValueError("birth_cohort must be an integer or None")
            object.__setattr__(self, "birth_cohort", int(self.birth_cohort))
        for name in (
            "asfr_source_id",
            "demand_source_id",
            "tempo_source_id",
            "art_source_id",
        ):
            object.__setattr__(self, name, _nonempty(name, getattr(self, name)))

    @property
    def biological_ratio(self) -> float:
        denominator = self.reference_couple.biological_capacity
        if denominator <= 0.0:
            raise ValueError(
                f"reference couple biological_capacity for {self.age_group} must be > 0"
            )
        return self.target_couple.biological_capacity / denominator

    @property
    def demand_opportunity_ratio(self) -> float:
        return self.target_demand_opportunity / self.reference_demand_opportunity

    @property
    def tempo_ratio(self) -> float:
        return self.target_tempo / self.reference_tempo

    @property
    def art_live_birth_delivery_ratio(self) -> float:
        return self.target_art_live_birth_delivery / self.reference_art_live_birth_delivery

    @property
    def total_ratio(self) -> float:
        return (
            self.biological_ratio
            * self.demand_opportunity_ratio
            * self.tempo_ratio
            * self.art_live_birth_delivery_ratio
        )

    @property
    def predicted_asfr(self) -> float:
        return self.reference_asfr * self.total_ratio

    @property
    def calibration_status(self) -> str:
        return (
            ENDPOINT_CALIBRATED
            if (
                self.reference_couple.calibration_status == ENDPOINT_CALIBRATED
                and self.target_couple.calibration_status == ENDPOINT_CALIBRATED
            )
            else STRUCTURAL_ONLY
        )


@dataclass(frozen=True)
class FieldStateASFRProjection:
    """A serialisable ASFR/TFR result with term-by-term provenance."""

    model_version: str
    geography_id: str
    year: int
    reference_year: int
    groups: tuple[AgeSpecificFieldStateInput, ...]
    input_provenance: Mapping[str, str] = field(default_factory=dict)

    def __post_init__(self) -> None:
        object.__setattr__(self, "model_version", _nonempty("model_version", self.model_version))
        object.__setattr__(self, "geography_id", _nonempty("geography_id", self.geography_id))
        for name in ("year", "reference_year"):
            value = getattr(self, name)
            if isinstance(value, bool) or int(value) != value:
                raise ValueError(f"{name} must be an integer")
            object.__setattr__(self, name, int(value))
        groups = tuple(self.groups)
        if len(groups) != len(AGE_GROUPS):
            raise ValueError(
                f"groups must include exactly {len(AGE_GROUPS)} standard ASFR groups"
            )
        if not all(isinstance(group, AgeSpecificFieldStateInput) for group in groups):
            raise TypeError("groups must contain AgeSpecificFieldStateInput values")
        actual = tuple(group.age_group for group in groups)
        if actual != AGE_GROUPS:
            raise ValueError(
                "groups must follow canonical WPP age order: " + ", ".join(AGE_GROUPS)
            )
        object.__setattr__(self, "groups", groups)
        if not isinstance(self.input_provenance, Mapping):
            raise ValueError("input_provenance must be a mapping")

    @property
    def predicted_asfr(self) -> tuple[float, ...]:
        return tuple(group.predicted_asfr for group in self.groups)

    @property
    def reference_asfr(self) -> tuple[float, ...]:
        return tuple(group.reference_asfr for group in self.groups)

    @property
    def predicted_tfr(self) -> float:
        return asfr_to_tfr(self.predicted_asfr)

    @property
    def reference_tfr(self) -> float:
        return asfr_to_tfr(self.reference_asfr)

    @property
    def calibration_status(self) -> str:
        return (
            ENDPOINT_CALIBRATED
            if all(group.calibration_status == ENDPOINT_CALIBRATED for group in self.groups)
            else STRUCTURAL_ONLY
        )

    def as_dict(self) -> dict:
        """Return outputs without erasing biology/demand/tempo/ART separation."""
        return {
            "model_version": self.model_version,
            "geography_id": self.geography_id,
            "year": self.year,
            "reference_year": self.reference_year,
            "calibration_status": self.calibration_status,
            "predicted_tfr": self.predicted_tfr,
            "reference_tfr": self.reference_tfr,
            "predicted_asfr": self.predicted_asfr,
            "reference_asfr": self.reference_asfr,
            "age_groups": [
                {
                    "age_group": group.age_group,
                    "birth_cohort": group.birth_cohort,
                    "reference_asfr": group.reference_asfr,
                    "predicted_asfr": group.predicted_asfr,
                    "biological_ratio": group.biological_ratio,
                    "demand_opportunity_ratio": group.demand_opportunity_ratio,
                    "tempo_ratio": group.tempo_ratio,
                    "art_live_birth_delivery_ratio": group.art_live_birth_delivery_ratio,
                    "total_ratio": group.total_ratio,
                    "calibration_status": group.calibration_status,
                    "field_state_status": {
                        "reference": group.reference_couple.field_state_status,
                        "target": group.target_couple.field_state_status,
                    },
                    "sources": {
                        "asfr": group.asfr_source_id,
                        "demand": group.demand_source_id,
                        "tempo": group.tempo_source_id,
                        "art": group.art_source_id,
                    },
                }
                for group in self.groups
            ],
            "input_provenance": dict(self.input_provenance),
            "interpretation": (
                "A FieldState biological-capacity bridge. It does not convert a national "
                "technology proxy into organ dose, and it keeps demand/opportunity, tempo "
                "and ART/live-birth delivery separate from biology."
            ),
        }


def project_fieldstate_asfr(
    *,
    geography_id: str,
    year: int,
    reference_year: int,
    groups: Iterable[AgeSpecificFieldStateInput],
    input_provenance: Mapping[str, str] | None = None,
) -> FieldStateASFRProjection:
    """Project standard 5-year ASFR groups, then derive TFR by identity."""
    return FieldStateASFRProjection(
        model_version=FIELDSTATE_ASFR_VERSION,
        geography_id=geography_id,
        year=year,
        reference_year=reference_year,
        groups=tuple(groups),
        input_provenance=dict(input_provenance or {}),
    )


__all__ = [
    "FIELDSTATE_ASFR_VERSION",
    "AgeSpecificFieldStateInput",
    "FieldStateASFRProjection",
    "project_fieldstate_asfr",
]
