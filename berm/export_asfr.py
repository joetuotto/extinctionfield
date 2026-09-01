"""Export ASFR cohort model data as JSON for the website.

Generates asfr_cohort.json with:
- Per-country ASFR projections (2024-2050)
- Cohort comparison at age 28
- Youngest-cohort penalty analysis
"""

import json
import sys
import os

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "berm"))

from berm.data.asfr import WPP_ASFR, AGE_GROUPS, asfr_to_tfr, get_asfr
from berm.outcomes.asfr_model import predict_asfr, youngest_cohort_effect
from berm.outcomes.cohort_exposure import compare_cohorts
from berm.v16 import calibrate_v16

PROJECTION_YEARS = (2024, 2030, 2035, 2040, 2045, 2050)
COHORT_BIRTH_YEARS = (1965, 1975, 1985, 1995, 2005)


def main():
    calibrate_v16()

    countries = sorted(WPP_ASFR.keys())
    output = {
        "generated": "2026-08-19",
        "model_version": "v18.0-asfr",  # ASFR export version; public model is v17
        "age_groups": list(AGE_GROUPS),
        "projection_years": list(PROJECTION_YEARS),
        "countries": {},
    }

    for country in countries:
        ref_asfr = get_asfr(country, 2024)
        ref_tfr = asfr_to_tfr(ref_asfr)

        projections = {}
        for year in PROJECTION_YEARS:
            result = predict_asfr(country, year)
            projections[str(year)] = {
                "asfr": [round(v, 1) for v in result["predicted_asfr"]],
                "tfr": result["predicted_tfr"],
                "mab": result["mean_age_at_birth"],
                "cultural_shift": result["cultural_shift"],
                "ratios": [
                    round(g["bio_behav_ratio"], 3)
                    for g in result["age_groups"]
                ],
            }

        cohorts = compare_cohorts(country, birth_years=COHORT_BIRTH_YEARS)
        cohort_data = [
            {
                "birth_year": c["birth_year"],
                "eval_year": c["eval_year"],
                "cumEMF": round(c["adjusted_cumulative"], 1),
                "bioBehav": c["bio_behav"],
            }
            for c in cohorts
        ]

        penalties = {}
        for year in PROJECTION_YEARS:
            p = youngest_cohort_effect(country, year)
            penalties[str(year)] = round(p["cohort_penalty"], 3)

        output["countries"][country] = {
            "reference_asfr": [round(v, 1) for v in ref_asfr],
            "reference_tfr": round(ref_tfr, 3),
            "projections": projections,
            "cohort_comparison": cohort_data,
            "cohort_penalties": penalties,
        }

    script_dir = os.path.dirname(os.path.abspath(__file__))
    project_root = os.path.dirname(script_dir)
    out_path = os.path.join(
        project_root, "website", "public", "data", "asfr_cohort.json",
    )
    with open(out_path, "w") as f:
        json.dump(output, f, separators=(",", ":"))

    size_kb = os.path.getsize(out_path) / 1024
    print(f"Wrote {out_path}")
    print(f"  {len(countries)} countries, {len(PROJECTION_YEARS)} projection years")
    print(f"  Size: {size_kb:.0f} KB")

    sample = output["countries"]["USA"]
    print(f"\n  USA 2024: TFR={sample['reference_tfr']}")
    for yr in ["2030", "2040", "2050"]:
        p = sample["projections"][yr]
        print(f"  USA {yr}: TFR={p['tfr']}, MAB={p['mab']}, penalty={sample['cohort_penalties'][yr]}")


if __name__ == "__main__":
    main()
