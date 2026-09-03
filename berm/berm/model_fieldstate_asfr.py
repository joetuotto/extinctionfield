"""Compatibility facade for BERM's conditional ASFR/TFR calculator.

Unlike ``berm.model`` and ``berm.model_data_driven``, this route generates no
exposure history and consumes no FieldState observation.  Callers provide
age-specific paired biological states and separately measured or estimated
demographic terms.  It can use observed UN WPP ASFR as a reference base, but
does not fit the target year to WPP.

The module name is retained for import compatibility.  New callers should use
``project_wpp_conditional_asfr`` and the route ID from ``berm.architecture``.
"""

from __future__ import annotations

from typing import Mapping

from berm.biology.reproductive_state import CoupleReproductiveState
from berm.data import wpp
from berm.evidence_registry import evidence_summary, legacy_evidence_summary
from berm.evidence_constraints import evidence_constraint_summary
from berm.architecture import CONDITIONAL_ASFR_ROUTE_ID, FIELDSTATE_SPEC_VERSION
from berm.outcomes.fieldstate_asfr import (
    AgeSpecificConditionalInput,
    ConditionalASFRProjection,
    project_conditional_asfr,
)


MODEL_VERSION = CONDITIONAL_ASFR_ROUTE_ID

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


def project_wpp_conditional_asfr(
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
    """Use observed WPP reference ASFR with supplied biological states.

    This is a conditional scenario entry point.  A caller may eventually build
    the supplied states from a separately calibrated local measurement panel,
    but this function neither requires nor performs that mapping.  The target
    WPP ASFR remains held out for comparison.
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
        AgeSpecificConditionalInput(
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
    projection = project_conditional_asfr(
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
    projection: ConditionalASFRProjection,
    *,
    reference_series_status: str | None = None,
) -> dict:
    """Attach model/evidence status without converting evidence into weights."""
    result = projection.as_dict()
    result.update({
        "route": MODEL_VERSION,
        "reference_series_status": reference_series_status,
        "implemented_chain": (
            "externally supplied paired biological states + demand/opportunity + "
            "tempo + ART/live-birth delivery -> ASFR -> TFR"
        ),
        "theoretical_chain": (
            "Lindgren 2025 premise -> geometric consequence -> OPEN BERM L2 bridge -> "
            "molecular/receptor response -> biology -> aggregate outcome"
        ),
        "active_chain": (
            "externally supplied paired biological states + demand/opportunity + "
            "tempo + ART/live-birth delivery -> ASFR -> TFR"
        ),
        "fieldstate_measurement": {
            "spec_version": FIELDSTATE_SPEC_VERSION,
            "role": "optional measurement/observation input to a future calibrated bridge",
            "accepted_by_this_function": False,
            "causal_root": False,
        },
        "evidence_by_causal_node": evidence_summary(),
        "legacy_evidence_migration": legacy_evidence_summary(),
        "evidence_constraint_ledger": evidence_constraint_summary(),
        "warnings": [
            "This route requires externally supplied paired biological states; it does not infer them from FieldState observations or national mobile subscriptions.",
            "A STRUCTURAL_ONLY output is a transparent, evidence-constrained scenario calculation rather than a narrow locally calibrated causal estimate; it is not a zero-evidence or zero-effect label.",
            "Demand/opportunity, tempo and ART/live-birth delivery remain separate age-specific inputs.",
        ],
    })
    return result


def project_wpp_fieldstate_asfr(**kwargs) -> dict:
    """Deprecated compatibility alias for :func:`project_wpp_conditional_asfr`."""

    return project_wpp_conditional_asfr(**kwargs)


__all__ = [
    "MODEL_VERSION",
    "project_wpp_conditional_asfr",
    "project_wpp_fieldstate_asfr",
]
