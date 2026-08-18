"""Export model predictions as JSON for the website.

Generates country exposure histories, TFR trajectories, and
prediction metadata from the v17 model.
"""

from __future__ import annotations

import json
import math

from berm.model import predict_country_year
from berm.data.countries import COUNTRY_PARAMS, HISTORICAL_TFR
from berm.biology.pathways import total_effect


def country_trajectory(
    country: str,
    start_year: int = 2000,
    end_year: int = 2035,
) -> dict:
    """Generate full prediction trajectory for a country."""
    obs_dict = dict(HISTORICAL_TFR.get(country, []))
    years = list(range(start_year, end_year + 1))
    trajectory = []

    for yr in years:
        r = predict_country_year(country, yr)
        entry = {
            "year": yr,
            "ambient": round(r["ambient_emf"], 4),
            "personal": round(r["personal_emf"], 4),
            "combined": round(r["combined_emf"], 4),
            "predicted_tfr": round(r["predicted_tfr"], 3),
            "bio_sigmoid_tfr": round(r["bio_sigmoid_tfr"], 3),
            "cultural_component": round(r["cultural_component"], 1),
            "ivf_share": round(r["ivf_share"], 3),
            "biological_tfr": round(r["biological_tfr"], 3),
            "mobile_pen": round(r["mobile_pen"], 3),
        }
        if yr in obs_dict:
            entry["observed_tfr"] = obs_dict[yr]
        trajectory.append(entry)

    return {
        "country": country,
        "trajectory": trajectory,
    }


def export_all_countries(
    start_year: int = 2000,
    end_year: int = 2035,
) -> list[dict]:
    """Export trajectories for all countries with parameters."""
    results = []
    for country in sorted(COUNTRY_PARAMS.keys()):
        results.append(country_trajectory(country, start_year, end_year))
    return results


def export_json(output_path: str, start_year: int = 2000, end_year: int = 2035) -> None:
    """Write all country predictions to a JSON file."""
    data = export_all_countries(start_year, end_year)
    with open(output_path, "w") as f:
        json.dump(data, f, indent=2)
    print(f"Exported {len(data)} countries to {output_path}")


if __name__ == "__main__":
    import sys
    output = sys.argv[1] if len(sys.argv) > 1 else "predictions.json"
    export_json(output)
