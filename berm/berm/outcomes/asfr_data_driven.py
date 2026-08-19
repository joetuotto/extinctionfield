"""ASFR prediction on the acquired UN WPP 2024 base.

This is the parallel counterpart to ``berm/outcomes/asfr_model.py``. The model
machinery is deliberately identical: the same cohort bio-behavioural factors and
the same cultural rate. Only the *data* changes — the age-specific base rates
come from the ingested WPP 2024 release rather than the hand-typed table, which
misses WPP by a mean 26.2% on implied TFR.

Nothing here alters the legacy route or the active prediction. The two run side
by side so their differences can be reported rather than absorbed.

Two deliberate differences from the legacy route beyond the data source:

**The reference year is 2023, not 2024.** WPP 2024 reports estimates through 2023
and projections from 2024. Anchoring the model on a projection would mean
calibrating observed fertility against a UN model output.

**A missing geography-year is an error, not an interpolation.** The legacy
``get_asfr`` silently interpolated between sparse hand-typed years.
"""

from __future__ import annotations

from functools import lru_cache

from berm.data import wpp
from berm.data.loader import _BERM_TO_ISO3, _ISO3_TO_BERM
from berm.data.wpp import AGE_GROUPS
from berm.outcomes.cohort_exposure import (
    cohort_behavioral_factor,
    cohort_bio_behav,
    cohort_bio_capacity,
    cohort_cumulative_emf,
)
from berm.v16 import calibrate_v16, v16_true_cultural_rate

__all__ = [
    "DEFAULT_REFERENCE_YEAR",
    "resolve_geography",
    "predict_asfr_data_driven",
    "predict_asfr_series_data_driven",
    "compare_asfr_routes",
]

#: Last year for which WPP 2024 publishes estimates rather than projections.
DEFAULT_REFERENCE_YEAR = 2023

_AGE_MIDPOINTS: dict[str, int] = {
    g: (int(g.split("-")[0]) + int(g.split("-")[1])) // 2 for g in AGE_GROUPS
}


def resolve_geography(geography: str) -> tuple[str, str]:
    """Accept an ISO3 code or a BERM country name; return ``(iso3, berm_name)``.

    The exposure and biology machinery is keyed by BERM country name, the WPP
    products by ISO3. Both are needed, and a geography that cannot be resolved to
    both is rejected rather than silently half-handled.
    """
    if geography in _ISO3_TO_BERM:
        return geography, _ISO3_TO_BERM[geography]
    if geography in _BERM_TO_ISO3:
        return _BERM_TO_ISO3[geography], geography
    raise KeyError(
        f"{geography!r} resolves to neither an ISO3 code nor a BERM country name. "
        f"Known ISO3 codes: {len(_ISO3_TO_BERM)}."
    )


@lru_cache(maxsize=256)
def _reference_bio_behav(berm_name: str, reference_year: int) -> tuple[float, ...]:
    """Cohort bio-behavioural factor for each age group at the reference year.

    The observed reference ASFR already contains whatever EMF effect exists at
    that date, so this is the denominator against which future years are scaled.
    """
    calibrate_v16()
    return tuple(
        cohort_bio_behav(berm_name, reference_year - _AGE_MIDPOINTS[g], _AGE_MIDPOINTS[g])
        for g in AGE_GROUPS
    )


def predict_asfr_data_driven(
    geography: str,
    year: int,
    reference_year: int = DEFAULT_REFERENCE_YEAR,
) -> dict:
    """Predict age-specific fertility rates from the WPP 2024 base.

    Method, unchanged from the legacy route apart from the data source:

    1. Take observed ASFR at ``reference_year`` from the WPP product.
    2. For each age group, compute that birth cohort's bio-behavioural factor.
    3. Scale by ``bio_behav(target) / bio_behav(reference)`` and the cultural shift.

    Raises ``LookupError`` when the reference or target data is absent. This
    route never invents a base rate.
    """
    iso3, berm_name = resolve_geography(geography)
    calibrate_v16()

    ref = wpp.load_asfr(iso3, reference_year)
    if ref is None:
        raise LookupError(
            f"no WPP ASFR for {iso3} at reference year {reference_year}; "
            "run `python -m berm.data.wpp ingest` or pick a covered year"
        )

    warnings: list[str] = []
    if ref["series_status"] != "ESTIMATE":
        warnings.append(
            f"reference year {reference_year} is a WPP {ref['series_status']}, "
            "so the model is anchored on a projection rather than an estimate"
        )

    ref_bb = _reference_bio_behav(berm_name, reference_year)
    denom = v16_true_cultural_rate(berm_name, reference_year)
    cult_shift = (
        v16_true_cultural_rate(berm_name, year) / denom if denom else 1.0
    )
    if not denom:
        warnings.append(
            f"cultural rate at {reference_year} is zero for {berm_name}; "
            "cultural shift forced to 1.0"
        )

    groups = []
    for i, group in enumerate(AGE_GROUPS):
        mid_age = _AGE_MIDPOINTS[group]
        birth_year = year - mid_age
        bb_target = cohort_bio_behav(berm_name, birth_year, mid_age)
        bb_ref = ref_bb[i]
        ratio = bb_target / bb_ref if bb_ref > 1e-3 else 1.0
        if bb_ref <= 1e-3:
            warnings.append(
                f"reference bio_behav for {group} is ~0; ratio forced to 1.0"
            )
        base = ref["values"][i]
        groups.append({
            "age_group": group,
            "mid_age": mid_age,
            "birth_cohort": birth_year,
            "reference_asfr": base,
            "predicted_asfr": max(0.0, base * ratio * cult_shift),
            "bio_behav_ratio": ratio,
            "bio_behav_target": bb_target,
            "bio_behav_reference": bb_ref,
            "cumulative_emf": cohort_cumulative_emf(berm_name, birth_year, mid_age),
        })

    predicted = tuple(g["predicted_asfr"] for g in groups)

    return {
        "geography_id": iso3,
        "berm_country": berm_name,
        "year": year,
        "reference_year": reference_year,
        "reference_series_status": ref["series_status"],
        "age_groups": groups,
        "predicted_asfr": predicted,
        "predicted_tfr": wpp.asfr_to_tfr(predicted),
        "reference_asfr": ref["values"],
        "reference_tfr": wpp.asfr_to_tfr(ref["values"]),
        "cultural_shift": cult_shift,
        "source_id": wpp.SOURCE_ID_ASFR,
        "wpp_revision": wpp.WPP_REVISION,
        "warnings": warnings,
    }


def predict_asfr_series_data_driven(
    geography: str,
    start_year: int,
    end_year: int,
    step: int = 1,
    reference_year: int = DEFAULT_REFERENCE_YEAR,
) -> list[dict]:
    return [
        predict_asfr_data_driven(geography, y, reference_year)
        for y in range(start_year, end_year + 1, step)
    ]


def compare_asfr_routes(geography: str, year: int) -> dict | None:
    """Run the legacy and data-driven ASFR routes side by side.

    Returns ``None`` when the legacy route has no data for the geography, which
    is itself informative: the legacy table covers 57 countries, the WPP product
    covers 237.
    """
    from berm.outcomes.asfr_model import predict_asfr as predict_asfr_legacy

    iso3, berm_name = resolve_geography(geography)

    legacy = predict_asfr_legacy(berm_name, year)
    if "error" in legacy:
        return None
    new = predict_asfr_data_driven(geography, year)

    lt, nt = legacy["predicted_tfr"], new["predicted_tfr"]
    per_group = []
    for i, group in enumerate(AGE_GROUPS):
        lo = legacy["age_groups"][i]["predicted_asfr"]
        hi = new["age_groups"][i]["predicted_asfr"]
        per_group.append({
            "age_group": group,
            "legacy_asfr": lo,
            "data_driven_asfr": hi,
            "absolute_difference": hi - lo,
            "relative_difference": (hi - lo) / hi if hi else None,
        })

    return {
        "geography_id": iso3,
        "berm_country": berm_name,
        "year": year,
        "legacy_tfr": lt,
        "data_driven_tfr": nt,
        "absolute_difference": nt - lt,
        "relative_difference": (nt - lt) / nt if nt else None,
        "per_age_group": per_group,
        "legacy_reference_year": legacy["reference_year"],
        "data_driven_reference_year": new["reference_year"],
        "note": (
            "Both routes use identical model machinery. The difference is the "
            "ASFR base: the legacy route reads the hand-typed table in "
            "berm/data/asfr.py, this one reads the ingested WPP 2024 release."
        ),
    }
