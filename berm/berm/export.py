"""Export model predictions as JSON for the website.

Generates country exposure histories, TFR trajectories, and
prediction metadata from both the community sigmoid model and
the v16/v17 decomposed biological capacity pipeline.
"""

from __future__ import annotations

import json
import math

from berm.model import predict_country_year
from berm.data.countries import COUNTRY_PARAMS, HISTORICAL_TFR, V12_ACTUAL_TFR_2024
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


# === v16/v17 decomposed pipeline export ===

def v16_country_trajectory(
    country: str,
    start_year: int = 2000,
    end_year: int = 2035,
) -> dict:
    """Generate v16 decomposed trajectory with extended diagnostics.

    cum_emf is a cumulative-exposure proxy derived from device-adoption
    curves, not a FieldState measurement. It drives the v16/v17 sigmoid
    but is not comparable to the bounded FieldState measurement spec.
    """
    from berm.v16 import (
        calibrate_v16,
        v16_adjusted_cumulative_exposure,
        v16_biological_capacity,
        emf_behavioral_factor_v3,
        v16_true_cultural_rate,
        predict_tfr_extended,
    )

    calibrate_v16()
    obs_dict = dict(HISTORICAL_TFR.get(country, []))
    years = list(range(start_year, end_year + 1))
    timeseries = []

    for yr in years:
        ext = predict_tfr_extended(country, yr)
        adj_cum = v16_adjusted_cumulative_exposure(country, yr)
        bio_cap = v16_biological_capacity(adj_cum, country, yr)
        behav = emf_behavioral_factor_v3(adj_cum)

        entry = {
            "year": yr,
            "predicted_tfr": round(ext["predicted_tfr"], 3),
            "native_tfr": ext["native_tfr"],
            "biological_tfr": ext["biological_tfr"],
            "biological_native_tfr": ext["biological_native_tfr"],
            "ivf_share": ext["ivf_share"],
            "immigration_buffer": ext["immigration_buffer"],
            "immigration_buffer_pct": ext["immigration_buffer_pct"],
            "cum_emf": round(adj_cum, 1),
            "biocap": round(bio_cap, 3),
            "behav": round(behav, 3),
            "is_forecast": yr > 2024,
        }
        if yr in obs_dict:
            entry["observed_tfr"] = obs_dict[yr]
        timeseries.append(entry)

    meta_ext = predict_tfr_extended(country, 2024)
    meta_2030 = predict_tfr_extended(country, 2030)

    return {
        country: {
            "meta": {
                "country": country,
                "predicted_tfr_2030": round(meta_2030["predicted_tfr"], 2),
                "native_tfr_2024": meta_ext["native_tfr"],
                "biological_native_tfr_2024": meta_ext["biological_native_tfr"],
                "ivf_share_2024": meta_ext["ivf_share"],
                "immigration_buffer_pct": meta_ext["immigration_buffer_pct"],
            },
            "timeseries": timeseries,
        }
    }


def export_v16_all_countries(
    start_year: int = 2000,
    end_year: int = 2035,
) -> dict:
    """Export v16 decomposed trajectories for all calibrated countries."""
    result = {}
    for country in sorted(V12_ACTUAL_TFR_2024.keys()):
        result.update(v16_country_trajectory(country, start_year, end_year))
    return result


def export_v16_json(
    output_path: str,
    start_year: int = 2000,
    end_year: int = 2035,
) -> None:
    """Write v16 decomposed predictions to a JSON file."""
    data = export_v16_all_countries(start_year, end_year)
    with open(output_path, "w") as f:
        json.dump(data, f, indent=2)
    print(f"Exported {len(data)} countries (v16) to {output_path}")


if __name__ == "__main__":
    import sys
    output = sys.argv[1] if len(sys.argv) > 1 else "predictions.json"
    if "--v16" in sys.argv:
        export_v16_json(output)
    else:
        export_json(output)
