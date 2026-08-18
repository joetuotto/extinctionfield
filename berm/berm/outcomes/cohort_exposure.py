"""Cohort-specific cumulative EMF exposure at each reproductive age.

For a woman born in year B who is age A in evaluation year Y = B + A,
her cumulative EMF exposure integrates ambient + personal EMF from
birth (or EMF start year) to age A, weighted by age-specific
vulnerability (v16.vulnerability_by_age).

This module connects the v16/v17 exposure pipeline to age-specific
fertility rates: each 5-year age group in a given calendar year
corresponds to a different birth cohort with different lifetime
EMF accumulation.
"""

from __future__ import annotations

import math

from berm.v16 import (
    v16_ambient_annual,
    v16_personal_annual,
    chi,
    vulnerability_by_age,
    v17_layer_retention,
    _exposure_start_year,
    v11_biological_capacity,
    v16_biological_capacity,
    emf_behavioral_factor_v3,
    occupational_emf_multiplier,
    v17_cry_effect,
    v17_melatonin_suppression,
    v17_ovulation_vgic,
    v17_sperm_ca2_fecundity,
    v17_male_bio_cap,
)


def cohort_cumulative_emf(
    country: str,
    birth_year: int,
    age: int,
) -> float:
    """Raw cumulative EMF for a cohort born in birth_year, evaluated at age.

    Sums annual two-channel exposure (ambient + chi*personal) from
    EMF start year to birth_year + age, weighted by vulnerability_by_age.
    """
    eval_year = birth_year + age
    start = _exposure_start_year(country)
    total = 0.0
    for y in range(max(start, birth_year - 1), eval_year + 1):
        cohort_age = y - birth_year
        amb = v16_ambient_annual(country, y)
        pers = v16_personal_annual(country, y)
        annual = amb + chi(amb) * pers
        vuln = vulnerability_by_age(cohort_age)
        total += annual * vuln
    return total


def cohort_cumulative_with_retention(
    country: str,
    birth_year: int,
    age: int,
) -> float:
    """Cumulative EMF with 5-layer retention decay for a specific cohort.

    Like cohort_cumulative_emf but applies v17 layer retention:
    older exposures partially recover.
    """
    eval_year = birth_year + age
    start = _exposure_start_year(country)
    total = 0.0
    for y in range(max(start, birth_year - 1), eval_year + 1):
        cohort_age = y - birth_year
        amb = v16_ambient_annual(country, y)
        pers = v16_personal_annual(country, y)
        annual = amb + chi(amb) * pers
        vuln = vulnerability_by_age(cohort_age)
        ret = v17_layer_retention(eval_year - y)
        total += annual * vuln * ret
    return total


def _normalize_cohort_cum(raw_cum: float, country: str, eval_year: int) -> float:
    """Normalize cohort cumulative to the scale used by v16 model parameters.

    The v16 model's b parameter (in v11_biological_capacity) was calibrated
    against v16_adjusted_cumulative_exposure. We normalize so that for a
    standard cohort (age 28 at eval_year), the cohort-weighted value maps
    to approximately the same scale.
    """
    from berm.v16 import v16_adjusted_cumulative_exposure
    ref_adj = v16_adjusted_cumulative_exposure(country, eval_year)
    ref_raw = cohort_cumulative_emf(country, eval_year - 28, 28)
    if ref_raw < 0.01:
        return raw_cum
    return raw_cum * (ref_adj / ref_raw)


def cohort_bio_capacity(
    country: str,
    birth_year: int,
    age: int,
) -> float:
    """Biological capacity for a specific birth cohort at a given age.

    Uses the cohort's own cumulative EMF (not the population average)
    to compute biological capacity through the full v16 pipeline.
    """
    eval_year = birth_year + age
    raw_cum = cohort_cumulative_emf(country, birth_year, age)
    adj_cum = _normalize_cohort_cum(raw_cum, country, eval_year)
    occ = occupational_emf_multiplier(country, eval_year)
    adj_cum *= occ
    return v16_biological_capacity(adj_cum, country, eval_year)


def cohort_behavioral_factor(
    country: str,
    birth_year: int,
    age: int,
) -> float:
    """Behavioral factor for a specific birth cohort at a given age."""
    eval_year = birth_year + age
    raw_cum = cohort_cumulative_emf(country, birth_year, age)
    adj_cum = _normalize_cohort_cum(raw_cum, country, eval_year)
    occ = occupational_emf_multiplier(country, eval_year)
    adj_cum *= occ
    return emf_behavioral_factor_v3(adj_cum)


def cohort_bio_behav(
    country: str,
    birth_year: int,
    age: int,
) -> float:
    """Combined biological * behavioral factor for a cohort."""
    return (
        cohort_bio_capacity(country, birth_year, age)
        * cohort_behavioral_factor(country, birth_year, age)
    )


def cohort_profile(
    country: str,
    birth_year: int,
    ages: tuple[int, ...] = (17, 22, 27, 32, 37, 42, 47),
) -> list[dict]:
    """Compute exposure and bio capacity profile across reproductive ages.

    Default ages correspond to midpoints of the 7 standard ASFR age groups.
    Returns a list of dicts with age, eval_year, cumulative EMF,
    bio_capacity, behavioral, and bio_behav for each age.
    """
    results = []
    for age in ages:
        eval_year = birth_year + age
        raw_cum = cohort_cumulative_emf(country, birth_year, age)
        adj_cum = _normalize_cohort_cum(raw_cum, country, eval_year)
        occ = occupational_emf_multiplier(country, eval_year)
        adj_cum_occ = adj_cum * occ
        bio = v16_biological_capacity(adj_cum_occ, country, eval_year)
        behav = emf_behavioral_factor_v3(adj_cum_occ)
        results.append({
            "age": age,
            "eval_year": eval_year,
            "cumulative_emf_raw": round(raw_cum, 4),
            "adjusted_cumulative": round(adj_cum_occ, 4),
            "bio_capacity": round(bio, 4),
            "behavioral": round(behav, 4),
            "bio_behav": round(bio * behav, 4),
        })
    return results


def compare_cohorts(
    country: str,
    birth_years: tuple[int, ...] = (1965, 1975, 1985, 1995, 2005),
    eval_age: int = 28,
) -> list[dict]:
    """Compare different birth cohorts at the same reproductive age.

    Shows how EMF exposure and bio capacity differ for women who reach
    age eval_age in different calendar years.
    """
    results = []
    for by in birth_years:
        eval_year = by + eval_age
        raw_cum = cohort_cumulative_emf(country, by, eval_age)
        adj_cum = _normalize_cohort_cum(raw_cum, country, eval_year)
        occ = occupational_emf_multiplier(country, eval_year)
        adj_cum_occ = adj_cum * occ
        bio = v16_biological_capacity(adj_cum_occ, country, eval_year)
        behav = emf_behavioral_factor_v3(adj_cum_occ)
        results.append({
            "birth_year": by,
            "eval_year": eval_year,
            "age": eval_age,
            "cumulative_emf_raw": round(raw_cum, 4),
            "adjusted_cumulative": round(adj_cum_occ, 4),
            "bio_capacity": round(bio, 4),
            "behavioral": round(behav, 4),
            "bio_behav": round(bio * behav, 4),
        })
    return results
