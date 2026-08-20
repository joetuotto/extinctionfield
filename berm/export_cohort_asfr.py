#!/usr/bin/env python3
"""Export age-specific fertility by birth cohort for the cohort-signal figure.

A birth cohort's fertility at a given age group is the ASFR observed while that
cohort occupied it: the 1970 cohort's 25-29 rate is the mean of ASFR(25-29)
over 1995-1999. Only WPP estimate years are used — projections are excluded, so
the younger cohort simply stops where observation stops rather than being
extended by a model.

Usage:  python3 export_cohort_asfr.py [output.json]
"""

from __future__ import annotations

import csv
import json
import statistics
import sys
from pathlib import Path

DATA = (
    Path(__file__).resolve().parent
    / "data"
    / "processed"
    / "fertility_asfr_region_age_year.csv"
)
DEFAULT_OUT = (
    Path(__file__).resolve().parent.parent / "website" / "lib" / "cohortAsfr.json"
)

AGE_GROUPS = ["15-19", "20-24", "25-29", "30-34", "35-39", "40-44", "45-49"]
AGE_START = {group: int(group.split("-")[0]) for group in AGE_GROUPS}

# Pre-mobile childbearing years vs the cohort that came of age with mobile
# telephony. 1990 is the youngest cohort with a complete 30-34 window.
COHORTS = [1970, 1990]

# A cohort's rate for an age group is reported only when most of its five-year
# window is observed, so a half-covered group never reads as a real difference.
MIN_YEARS_IN_GROUP = 3

# Countries carried by the rest of the site: the COLOSS sentinel panel plus the
# countries that hold a locked TFR prediction.
COUNTRIES = [
    "AUT", "BEL", "BRA", "CHE", "CZE", "DEU", "DNK", "DZA", "ESP", "EST",
    "FIN", "FRA", "IRL", "ISR", "ITA", "JPN", "KOR", "LVA", "MKD", "NOR",
    "POL", "SVK", "SVN", "SWE", "UKR", "USA",
]


def load_asfr() -> dict[str, dict[int, dict[str, float]]]:
    """iso3 -> year -> age group -> births per 1000 women (estimate years)."""
    wanted = set(COUNTRIES)
    out: dict[str, dict[int, dict[str, float]]] = {}
    with open(DATA, newline="") as handle:
        for row in csv.DictReader(handle):
            if row["geography_level"] != "COUNTRY":
                continue
            iso3 = row["geography_id"]
            if iso3 not in wanted:
                continue
            if row["series_status"] != "ESTIMATE":
                continue
            year = int(row["year"])
            out.setdefault(iso3, {}).setdefault(year, {})[row["age_group"]] = float(
                row["value"]
            )
    return out


def cohort_profile(
    by_year: dict[int, dict[str, float]], birth_year: int
) -> list[dict[str, object]]:
    profile = []
    for group in AGE_GROUPS:
        start = birth_year + AGE_START[group]
        values = [
            by_year[year][group]
            for year in range(start, start + 5)
            if year in by_year and group in by_year[year]
        ]
        if len(values) < MIN_YEARS_IN_GROUP:
            continue
        profile.append(
            {
                "ageGroup": group,
                "asfr": round(statistics.mean(values), 2),
                "yearsObserved": len(values),
                "window": [start, start + 4],
            }
        )
    return profile


def build() -> dict:
    asfr = load_asfr()
    countries = {}
    for iso3 in COUNTRIES:
        by_year = asfr.get(iso3)
        if not by_year:
            continue
        profiles = {
            str(cohort): cohort_profile(by_year, cohort) for cohort in COHORTS
        }
        # Only keep countries where both cohorts share at least three groups.
        shared = set(p["ageGroup"] for p in profiles[str(COHORTS[0])]) & set(
            p["ageGroup"] for p in profiles[str(COHORTS[1])]
        )
        if len(shared) < 3:
            continue
        countries[iso3] = profiles
    return {
        "generatedBy": "berm/export_cohort_asfr.py",
        "source": "UN WPP 2024 age-specific fertility, estimate years only",
        "cohorts": COHORTS,
        "ageGroups": AGE_GROUPS,
        "minYearsInGroup": MIN_YEARS_IN_GROUP,
        "countries": countries,
    }


def main(argv: list[str]) -> int:
    out = Path(argv[1]) if len(argv) > 1 else DEFAULT_OUT
    payload = build()
    out.write_text(json.dumps(payload, indent=2) + "\n", encoding="utf-8")
    sample = payload["countries"].get("FIN", {})
    for cohort, profile in sample.items():
        groups = ", ".join(f"{p['ageGroup']}={p['asfr']}" for p in profile)
        print(f"FIN {cohort}: {groups}")
    print(f"{len(payload['countries'])} countries -> {out}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main(sys.argv))
