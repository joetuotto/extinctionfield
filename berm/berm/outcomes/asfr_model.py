"""ASFR cohort prediction model.

Decomposes TFR into age-specific fertility rates (ASFR) and projects
each age group forward using cohort-specific EMF exposure.

The key insight: BERM's aggregate TFR prediction treats all women of
reproductive age as a single pool. But younger cohorts (born 1995+)
grew up with smartphones and high ambient EMF during critical
developmental windows, accumulating more vulnerability-weighted
exposure than older cohorts. The ASFR model reveals this structure:
- 35-39 age group in 2030 (born 1991-1995): moderate childhood EMF
- 25-29 age group in 2030 (born 2001-2005): high childhood EMF
- 15-19 age group in 2030 (born 2011-2015): maximal childhood EMF

TFR = 5 * sum(ASFR_age_group) / 1000, where each ASFR is modulated
by the cohort's bio_behav factor relative to a reference.
"""

from __future__ import annotations

from berm.data.asfr import (
    AGE_GROUPS,
    WPP_ASFR,
    get_asfr,
    asfr_to_tfr,
    age_group_midpoint,
    mean_age_at_birth,
)
from berm.outcomes.cohort_exposure import (
    cohort_bio_behav,
    cohort_bio_capacity,
    cohort_behavioral_factor,
    cohort_cumulative_emf,
    cohort_profile,
)
from berm.v16 import (
    calibrate_v16,
    v16_predicted_tfr,
    v16_true_cultural_rate,
    _exposure_start_year,
)


_REFERENCE_BIO_BEHAV: dict[str, dict[str, float]] = {}


def _ensure_calibrated():
    calibrate_v16()


def _reference_bio_behav(country: str) -> dict[str, float]:
    """Compute reference bio_behav for each age group at 2024 (calibration year).

    This anchors the ASFR model: the 2024 observed ASFR already reflects
    EMF effects. We compute bio_behav for each 2024 cohort and use it
    as the denominator when projecting future years.
    """
    if country in _REFERENCE_BIO_BEHAV:
        return _REFERENCE_BIO_BEHAV[country]

    ref = {}
    for group in AGE_GROUPS:
        mid_age = int(age_group_midpoint(group))
        birth_year = 2024 - mid_age
        bb = cohort_bio_behav(country, birth_year, mid_age)
        ref[group] = bb

    _REFERENCE_BIO_BEHAV[country] = ref
    return ref


def predict_asfr(
    country: str,
    year: int,
    reference_year: int = 2024,
) -> dict:
    """Predict age-specific fertility rates for a country-year.

    Method:
    1. Get observed ASFR at reference_year (2024)
    2. For each age group, compute the birth cohort's bio_behav
    3. Ratio = bio_behav(target) / bio_behav(reference)
    4. Predicted ASFR = observed ASFR * ratio * cultural_shift

    Returns dict with per-group ASFR, predicted TFR, and diagnostics.
    """
    _ensure_calibrated()

    ref_asfr = get_asfr(country, reference_year)
    if ref_asfr is None:
        return {"error": f"No ASFR data for {country}"}

    ref_bb = _reference_bio_behav(country)

    cult_shift = (
        v16_true_cultural_rate(country, year)
        / v16_true_cultural_rate(country, reference_year)
    )

    predicted_groups = []
    for i, group in enumerate(AGE_GROUPS):
        mid_age = int(age_group_midpoint(group))
        birth_year = year - mid_age

        bb_target = cohort_bio_behav(country, birth_year, mid_age)
        bb_ref = ref_bb[group]

        if bb_ref > 0.001:
            ratio = bb_target / bb_ref
        else:
            ratio = 1.0

        base_asfr = ref_asfr[i]
        pred_asfr = max(0.0, base_asfr * ratio * cult_shift)

        predicted_groups.append({
            "age_group": group,
            "mid_age": mid_age,
            "birth_year": birth_year,
            "reference_asfr": round(base_asfr, 1),
            "predicted_asfr": round(pred_asfr, 1),
            "bio_behav_ratio": round(ratio, 4),
            "bio_behav_target": round(bb_target, 4),
            "bio_behav_reference": round(bb_ref, 4),
        })

    pred_rates = tuple(g["predicted_asfr"] for g in predicted_groups)
    pred_tfr = asfr_to_tfr(pred_rates)

    ref_rates = tuple(g["reference_asfr"] for g in predicted_groups)
    ref_tfr = asfr_to_tfr(ref_rates)

    v16_tfr = v16_predicted_tfr(country, year)

    mab = mean_age_at_birth(pred_rates)

    return {
        "country": country,
        "year": year,
        "reference_year": reference_year,
        "age_groups": predicted_groups,
        "predicted_asfr": pred_rates,
        "predicted_tfr": round(pred_tfr, 3),
        "reference_tfr": round(ref_tfr, 3),
        "v16_tfr": round(v16_tfr, 3),
        "cultural_shift": round(cult_shift, 4),
        "mean_age_at_birth": round(mab, 1),
    }


def predict_asfr_timeseries(
    country: str,
    start_year: int = 2024,
    end_year: int = 2050,
    step: int = 5,
) -> list[dict]:
    """Generate ASFR predictions across a range of years."""
    _ensure_calibrated()
    results = []
    for year in range(start_year, end_year + 1, step):
        results.append(predict_asfr(country, year))
    return results


def cohort_fertility_trajectory(
    country: str,
    birth_year: int,
) -> dict:
    """Track a single birth cohort through its reproductive years.

    Shows how one cohort's fertility rates evolve as they age through
    each 5-year group: the 1995 cohort is 15-19 in 2010-2014,
    20-24 in 2015-2019, etc.
    """
    _ensure_calibrated()

    trajectory = []
    for i, group in enumerate(AGE_GROUPS):
        mid_age = int(age_group_midpoint(group))
        eval_year = birth_year + mid_age

        observed = get_asfr(country, eval_year)
        obs_rate = observed[i] if observed else None

        bb = cohort_bio_behav(country, birth_year, mid_age)
        bio = cohort_bio_capacity(country, birth_year, mid_age)
        behav = cohort_behavioral_factor(country, birth_year, mid_age)
        cum_emf = cohort_cumulative_emf(country, birth_year, mid_age)

        trajectory.append({
            "age_group": group,
            "mid_age": mid_age,
            "eval_year": eval_year,
            "observed_asfr": round(obs_rate, 1) if obs_rate is not None else None,
            "cumulative_emf": round(cum_emf, 2),
            "bio_capacity": round(bio, 4),
            "behavioral": round(behav, 4),
            "bio_behav": round(bb, 4),
        })

    return {
        "country": country,
        "birth_year": birth_year,
        "trajectory": trajectory,
    }


def youngest_cohort_effect(
    country: str,
    year: int = 2035,
) -> dict:
    """Quantify the 'youngest cohort penalty': how much more affected
    are the youngest reproductive cohorts compared to the oldest.

    In a given calendar year, the 15-19 age group was born ~17 years ago
    (grew up with full smartphone EMF), while the 45-49 group was born
    ~47 years ago (childhood largely pre-smartphone).
    """
    _ensure_calibrated()

    groups = []
    for group in AGE_GROUPS:
        mid_age = int(age_group_midpoint(group))
        birth_year = year - mid_age
        bb = cohort_bio_behav(country, birth_year, mid_age)
        groups.append({
            "age_group": group,
            "birth_year": birth_year,
            "bio_behav": round(bb, 4),
        })

    youngest_bb = groups[0]["bio_behav"]
    oldest_bb = groups[-1]["bio_behav"]
    penalty = 1.0 - (youngest_bb / oldest_bb) if oldest_bb > 0 else 0.0

    return {
        "country": country,
        "year": year,
        "groups": groups,
        "youngest_bio_behav": youngest_bb,
        "oldest_bio_behav": oldest_bb,
        "cohort_penalty": round(penalty, 4),
        "interpretation": (
            f"In {year}, the youngest reproductive cohort (born {groups[0]['birth_year']}) "
            f"has {penalty*100:.1f}% lower bio-behavioral capacity than the oldest "
            f"cohort (born {groups[-1]['birth_year']}), due to greater lifetime EMF exposure "
            f"during critical developmental windows."
        ),
    }


def asfr_country_report(
    country: str,
    projection_years: tuple[int, ...] = (2024, 2030, 2035, 2040, 2050),
    cohort_birth_years: tuple[int, ...] = (1970, 1980, 1990, 2000, 2010),
) -> dict:
    """Comprehensive ASFR report for a country.

    Includes:
    - ASFR projections for multiple years
    - Cohort comparisons at age 28
    - Youngest-cohort penalty analysis
    - Cohort fertility trajectories
    """
    _ensure_calibrated()

    projections = {
        yr: predict_asfr(country, yr)
        for yr in projection_years
    }

    from berm.outcomes.cohort_exposure import compare_cohorts
    cohort_comparison = compare_cohorts(
        country,
        birth_years=cohort_birth_years,
    )

    penalties = {
        yr: youngest_cohort_effect(country, yr)
        for yr in projection_years
        if yr >= 2024
    }

    trajectories = {
        by: cohort_fertility_trajectory(country, by)
        for by in cohort_birth_years
    }

    return {
        "country": country,
        "projections": projections,
        "cohort_comparison": cohort_comparison,
        "youngest_cohort_penalties": penalties,
        "cohort_trajectories": trajectories,
    }
