"""Public facade for the external-input FieldState ASFR/TFR route.

Unlike ``berm.model`` and ``berm.model_data_driven``, this route never
generates a national exposure history internally.  Callers provide age-specific
paired biological states and the separately measured/estimated demographic
terms.  It can use observed UN WPP ASFR as a reference base, but it does not
fit the target year to WPP.
"""

from __future__ import annotations

from typing import Mapping

from berm.biology.reproductive_state import CoupleReproductiveState
from berm.data import wpp
from berm.evidence_registry import evidence_summary, legacy_evidence_summary
from berm.outcomes.fieldstate_asfr import (
    FIELDSTATE_ASFR_VERSION,
    AgeSpecificFieldStateInput,
    FieldStateASFRProjection,
    project_fieldstate_asfr,
)


MODEL_VERSION = FIELDSTATE_ASFR_VERSION

_AGE_MIDPOINTS = {
    "15-19": 17,
    "20-24": 22,
    "25-29": 27,
    "30-34": 32,
    "35-39": 37,
    "40-44": 42,
    "45-49": 47,
}


def _by_group(
    name: str,
    values: Mapping[str, float] | None,
    *,
    default: float,
) -> dict[str, float]:
    if values is None:
        return {group: default for group in wpp.AGE_GROUPS}
    missing = set(wpp.AGE_GROUPS) - set(values)
    extra = set(values) - set(wpp.AGE_GROUPS)
    if missing or extra:
        raise ValueError(
            f"{name} must have exactly the standard age groups; "
            f"missing={sorted(missing)}, extra={sorted(extra)}"
        )
    return {group: float(values[group]) for group in wpp.AGE_GROUPS}


def _couples_by_group(
    name: str,
    values: Mapping[str, CoupleReproductiveState],
) -> dict[str, CoupleReproductiveState]:
    missing = set(wpp.AGE_GROUPS) - set(values)
    extra = set(values) - set(wpp.AGE_GROUPS)
    if missing or extra:
        raise ValueError(
            f"{name} must have exactly the standard age groups; "
            f"missing={sorted(missing)}, extra={sorted(extra)}"
        )
    result = {group: values[group] for group in wpp.AGE_GROUPS}
    if not all(isinstance(value, CoupleReproductiveState) for value in result.values()):
        raise TypeError(f"{name} values must be CoupleReproductiveState")
    return result


def project_wpp_fieldstate_asfr(
    *,
    geography_id: str,
    year: int,
    reference_year: int,
    reference_couples: Mapping[str, CoupleReproductiveState],
    target_couples: Mapping[str, CoupleReproductiveState],
    reference_demand_opportunity: Mapping[str, float] | None = None,
    target_demand_opportunity: Mapping[str, float] | None = None,
    reference_tempo: Mapping[str, float] | None = None,
    target_tempo: Mapping[str, float] | None = None,
    reference_art_live_birth_delivery: Mapping[str, float] | None = None,
    target_art_live_birth_delivery: Mapping[str, float] | None = None,
    input_provenance: Mapping[str, str] | None = None,
) -> dict:
    """Use observed WPP reference ASFR with explicit FieldState biological states.

    This is the entry point for the eventual train-only country/cohort hindcast:
    the caller builds states from a local FieldState panel up to each target
    year, provides non-biological factors independently, and holds the target
    WPP ASFR out for comparison.
    """
    reference = wpp.load_asfr(geography_id, reference_year)
    if reference is None:
        raise LookupError(
            f"no WPP ASFR for {geography_id} in reference year {reference_year}"
        )
    ref_couples = _couples_by_group("reference_couples", reference_couples)
    tgt_couples = _couples_by_group("target_couples", target_couples)
    ref_demand = _by_group("reference_demand_opportunity", reference_demand_opportunity, default=1.0)
    tgt_demand = _by_group("target_demand_opportunity", target_demand_opportunity, default=1.0)
    ref_tempo = _by_group("reference_tempo", reference_tempo, default=1.0)
    tgt_tempo = _by_group("target_tempo", target_tempo, default=1.0)
    ref_art = _by_group(
        "reference_art_live_birth_delivery", reference_art_live_birth_delivery, default=1.0
    )
    tgt_art = _by_group(
        "target_art_live_birth_delivery", target_art_live_birth_delivery, default=1.0
    )

    groups = tuple(
        AgeSpecificFieldStateInput(
            age_group=group,
            reference_asfr=reference["values"][index],
            reference_couple=ref_couples[group],
            target_couple=tgt_couples[group],
            reference_demand_opportunity=ref_demand[group],
            target_demand_opportunity=tgt_demand[group],
            reference_tempo=ref_tempo[group],
            target_tempo=tgt_tempo[group],
            reference_art_live_birth_delivery=ref_art[group],
            target_art_live_birth_delivery=tgt_art[group],
            birth_cohort=year - _AGE_MIDPOINTS[group],
            asfr_source_id=wpp.SOURCE_ID_ASFR,
            demand_source_id=(input_provenance or {}).get("demand_source_id", "UNSPECIFIED_DEMAND_SOURCE"),
            tempo_source_id=(input_provenance or {}).get("tempo_source_id", "UNSPECIFIED_TEMPO_SOURCE"),
            art_source_id=(input_provenance or {}).get("art_source_id", "UNSPECIFIED_ART_SOURCE"),
        )
        for index, group in enumerate(wpp.AGE_GROUPS)
    )
    projection = project_fieldstate_asfr(
        geography_id=geography_id,
        year=year,
        reference_year=reference_year,
        groups=groups,
        input_provenance={
            "asfr_source_id": wpp.SOURCE_ID_ASFR,
            "asfr_reference_status": reference["series_status"],
            "model_route": MODEL_VERSION,
            **dict(input_provenance or {}),
        },
    )
    return _as_public_result(projection, reference_series_status=reference["series_status"])


def _as_public_result(
    projection: FieldStateASFRProjection,
    *,
    reference_series_status: str | None = None,
) -> dict:
    """Attach model/evidence status without converting evidence into weights."""
    result = projection.as_dict()
    result.update({
        "route": MODEL_VERSION,
        "reference_series_status": reference_series_status,
        "active_chain": (
            "FieldState -> organ R/P memory -> male/female states -> paired "
            "couple capacity + demand/opportunity + tempo + ART/live-birth "
            "delivery -> ASFR -> TFR"
        ),
        "evidence_by_causal_node": evidence_summary(),
        "legacy_evidence_migration": legacy_evidence_summary(),
        "warnings": [
            "This route requires externally supplied local FieldState and paired biological states; it does not infer them from national mobile subscriptions.",
            "A STRUCTURAL_ONLY output is a transparent scenario calculation, not a calibrated causal estimate.",
            "Demand/opportunity, tempo and ART/live-birth delivery remain separate age-specific inputs.",
        ],
    })
    return result


__all__ = ["MODEL_VERSION", "project_wpp_fieldstate_asfr"]
