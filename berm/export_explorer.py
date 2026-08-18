"""Generate explorer.json for the website Explorer page.

Usage:
  cd berm/
  python -m export_explorer

  OR from repo root:
  python berm/export_explorer.py

Reads: berm/berm/v16.py (model functions)
Writes: website/public/data/explorer.json
"""

import json
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent))

from berm.v16 import (
    calibrate_v16,
    v16_country_tfr,
    v16_ambient_annual,
    v16_personal_annual,
    v16_two_channel_cum_exposure,
    v16_adjusted_cumulative_exposure,
    v16_biological_capacity,
    v16_predicted_tfr,
    chi,
    emf_behavioral_factor_v3,
)
from berm.data.countries import (
    TECH_DIFFUSION,
    V12_ACTUAL_TFR_2024,
    HISTORICAL_TFR,
)

OBSERVED_TFR: dict[str, dict[int, float]] = {
    "Finland": {
        1960: 2.72, 1965: 2.47, 1970: 1.83, 1975: 1.69, 1980: 1.63,
        1985: 1.65, 1990: 1.78, 1995: 1.81, 2000: 1.73, 2005: 1.80,
        2010: 1.87, 2012: 1.80, 2015: 1.65, 2018: 1.41, 2020: 1.37,
        2022: 1.32, 2023: 1.26,
    },
    "SouthKorea": {
        1960: 6.16, 1965: 5.63, 1970: 4.53, 1975: 3.47, 1980: 2.83,
        1985: 1.67, 1990: 1.59, 1995: 1.65, 2000: 1.47, 2005: 1.08,
        2010: 1.23, 2012: 1.30, 2015: 1.24, 2018: 0.98, 2020: 0.84,
        2022: 0.78, 2023: 0.72,
    },
    "Japan": {
        1960: 2.00, 1965: 2.14, 1970: 2.13, 1975: 1.91, 1980: 1.75,
        1985: 1.76, 1990: 1.54, 1995: 1.42, 2000: 1.36, 2005: 1.26,
        2010: 1.39, 2012: 1.41, 2015: 1.45, 2018: 1.42, 2020: 1.33,
        2022: 1.26, 2023: 1.20,
    },
    "USA": {
        1960: 3.65, 1965: 2.91, 1970: 2.48, 1975: 1.77, 1980: 1.84,
        1985: 1.84, 1990: 2.08, 1995: 2.02, 2000: 2.06, 2005: 2.05,
        2010: 1.93, 2012: 1.88, 2015: 1.84, 2018: 1.73, 2020: 1.64,
        2022: 1.67, 2023: 1.64,
    },
    "Denmark": {
        1960: 2.57, 1965: 2.61, 1970: 1.95, 1975: 1.92, 1980: 1.55,
        1985: 1.45, 1990: 1.67, 1995: 1.80, 2000: 1.77, 2005: 1.80,
        2010: 1.87, 2012: 1.73, 2015: 1.71, 2018: 1.73, 2020: 1.68,
        2022: 1.55, 2023: 1.55,
    },
    "Germany": {
        1960: 2.37, 1970: 2.03, 1980: 1.56, 1990: 1.45, 2000: 1.38,
        2005: 1.34, 2010: 1.39, 2015: 1.50, 2018: 1.57, 2020: 1.53,
        2022: 1.46, 2023: 1.35,
    },
    "France": {
        1960: 2.73, 1970: 2.47, 1980: 1.95, 1990: 1.78, 2000: 1.89,
        2005: 1.94, 2010: 2.03, 2015: 1.96, 2018: 1.88, 2020: 1.83,
        2022: 1.80, 2023: 1.68,
    },
    "Sweden": {
        1960: 2.20, 1970: 1.92, 1980: 1.68, 1990: 2.13, 2000: 1.55,
        2005: 1.77, 2010: 1.98, 2015: 1.85, 2018: 1.76, 2020: 1.67,
        2022: 1.52, 2023: 1.45,
    },
    "Norway": {
        1960: 2.91, 1970: 2.50, 1980: 1.72, 1990: 1.93, 2000: 1.85,
        2005: 1.84, 2010: 1.95, 2015: 1.72, 2018: 1.56, 2020: 1.48,
        2022: 1.41, 2023: 1.34,
    },
    "Italy": {
        1960: 2.41, 1970: 2.42, 1980: 1.64, 1990: 1.33, 2000: 1.26,
        2005: 1.32, 2010: 1.46, 2015: 1.35, 2018: 1.29, 2020: 1.24,
        2022: 1.24, 2023: 1.24,
    },
    "Spain": {
        1960: 2.86, 1970: 2.90, 1980: 2.20, 1990: 1.36, 2000: 1.23,
        2005: 1.34, 2010: 1.37, 2015: 1.33, 2018: 1.26, 2020: 1.19,
        2022: 1.16, 2023: 1.16,
    },
    "Canada": {
        1960: 3.90, 1970: 2.33, 1980: 1.74, 1990: 1.83, 2000: 1.49,
        2005: 1.54, 2010: 1.63, 2015: 1.60, 2018: 1.50, 2020: 1.40,
        2022: 1.33, 2023: 1.26,
    },
    "Australia": {
        1960: 3.45, 1970: 2.86, 1980: 1.90, 1990: 1.91, 2000: 1.76,
        2005: 1.79, 2010: 1.89, 2015: 1.81, 2018: 1.74, 2020: 1.58,
        2022: 1.63, 2023: 1.51,
    },
    "China": {
        1960: 5.76, 1970: 5.81, 1980: 2.63, 1990: 2.17, 2000: 1.60,
        2005: 1.51, 2010: 1.18, 2015: 1.66, 2018: 1.55, 2020: 1.28,
        2022: 1.09, 2023: 1.09,
    },
    "Brazil": {
        1960: 6.15, 1970: 5.02, 1980: 4.07, 1990: 2.81, 2000: 2.32,
        2005: 1.99, 2010: 1.82, 2015: 1.74, 2018: 1.73, 2020: 1.65,
        2022: 1.65, 2023: 1.65,
    },
    "Mexico": {
        1960: 6.78, 1970: 6.72, 1980: 4.71, 1990: 3.36, 2000: 2.67,
        2005: 2.29, 2010: 2.28, 2015: 2.13, 2018: 2.04, 2020: 1.90,
        2022: 1.80, 2023: 1.80,
    },
    "India": {
        1960: 5.91, 1970: 5.49, 1980: 4.68, 1990: 3.87, 2000: 3.22,
        2005: 2.83, 2010: 2.50, 2015: 2.30, 2018: 2.17, 2020: 2.05,
        2022: 2.00, 2023: 2.00,
    },
    "Russia": {
        1960: 2.56, 1970: 2.00, 1980: 1.90, 1990: 1.89, 2000: 1.20,
        2005: 1.29, 2010: 1.57, 2015: 1.78, 2018: 1.58, 2020: 1.51,
        2022: 1.50, 2023: 1.50,
    },
    "Iran": {
        1960: 7.00, 1970: 6.57, 1980: 6.53, 1990: 4.78, 2000: 2.15,
        2005: 1.88, 2010: 1.88, 2015: 2.12, 2018: 2.14, 2020: 2.14,
        2022: 2.14, 2023: 2.14,
    },
    "Bangladesh": {
        1960: 6.69, 1970: 6.94, 1980: 6.13, 1990: 4.37, 2000: 3.08,
        2005: 2.57, 2010: 2.25, 2015: 2.05, 2018: 2.00, 2020: 1.95,
        2022: 1.95, 2023: 1.95,
    },
    "Nigeria": {
        1960: 6.35, 1970: 6.49, 1980: 6.76, 1990: 6.46, 2000: 5.97,
        2005: 5.83, 2010: 5.67, 2015: 5.49, 2018: 5.30, 2020: 5.20,
        2022: 5.20, 2023: 5.20,
    },
    "Niger": {
        1960: 7.58, 1970: 7.54, 1980: 7.71, 1990: 7.77, 2000: 7.65,
        2005: 7.56, 2010: 7.55, 2015: 7.30, 2018: 7.00, 2020: 6.89,
        2022: 6.80, 2023: 6.80,
    },
    "Ethiopia": {
        1960: 6.88, 1970: 6.77, 1980: 7.07, 1990: 7.07, 2000: 6.33,
        2005: 5.52, 2010: 4.84, 2015: 4.39, 2018: 4.20, 2020: 4.10,
        2022: 4.10, 2023: 4.10,
    },
    "Cuba": {
        1960: 4.17, 1970: 3.55, 1980: 1.67, 1990: 1.62, 2000: 1.64,
        2005: 1.51, 2010: 1.46, 2015: 1.72, 2018: 1.58, 2020: 1.50,
        2022: 1.45, 2023: 1.45,
    },
    "Myanmar": {
        1960: 6.06, 1970: 5.70, 1980: 4.72, 1990: 3.32, 2000: 2.56,
        2005: 2.35, 2010: 2.27, 2015: 2.22, 2018: 2.17, 2020: 2.10,
        2022: 2.10, 2023: 2.10,
    },
}

# Use all countries from the model's calibration set
EXPLORER_COUNTRIES = sorted(V12_ACTUAL_TFR_2024.keys())


def generate_country_data(country: str) -> dict:
    """Generate full timeseries data for one country using v16 model."""
    td = TECH_DIFFUSION.get(country)
    start_year = td.start if td else 1995

    years = list(range(1960, 2041))
    timeseries = []

    for year in years:
        row: dict = {"year": year}

        if year >= start_year:
            try:
                amb = v16_ambient_annual(country, year)
                pers = v16_personal_annual(country, year)
                chi_val = chi(amb)
                two_ch = amb + chi_val * pers
                cum = v16_adjusted_cumulative_exposure(country, year)
            except Exception:
                amb, pers, chi_val, two_ch, cum = 0.0, 0.0, 0.0, 0.0, 0.0
        else:
            amb, pers, chi_val, two_ch, cum = 0.0, 0.0, 0.0, 0.0, 0.0

        row["ambient"] = round(amb, 4)
        row["personal"] = round(pers, 4)
        row["chiValue"] = round(chi_val, 4)
        row["twoChannelTotal"] = round(two_ch, 4)
        row["cumulativeEMF"] = round(cum, 2)

        if cum > 0:
            try:
                biocap = v16_biological_capacity(cum, country, year)
                behav = emf_behavioral_factor_v3(cum)
            except Exception:
                biocap, behav = 6.5, 1.0
        else:
            biocap, behav = 6.5, 1.0

        row["biologicalCapacity"] = round(biocap, 3)
        row["behavioralFactor"] = round(behav, 4)

        try:
            report = v16_country_tfr(country, year)
            predicted_tfr = report["predicted_tfr"]
            native_tfr = report.get("native_tfr")
            ivf_share = report.get("ivf_share", 0.0)
        except Exception:
            predicted_tfr = biocap * behav
            native_tfr = None
            ivf_share = 0.0
        row["predictedTFR"] = round(predicted_tfr, 3)
        row["nativeTFR"] = round(native_tfr, 3) if native_tfr is not None else None
        row["ivfShare"] = round(ivf_share, 4)

        obs = OBSERVED_TFR.get(country, {})
        obs_val = obs.get(year)
        if obs_val is None and year == 2024:
            obs_val = V12_ACTUAL_TFR_2024.get(country)
        row["observedTFR"] = obs_val

        row["isForecast"] = year > 2024

        timeseries.append(row)

    obs_data = OBSERVED_TFR.get(country, {})
    latest_obs_year = max(obs_data.keys()) if obs_data else 2024
    latest_obs_val = obs_data.get(latest_obs_year, V12_ACTUAL_TFR_2024.get(country, 0))

    meta = {
        "country": country,
        "emfStartYear": start_year,
        "latestObservedTFR": {
            "year": latest_obs_year,
            "value": latest_obs_val,
        },
        "predictedTFR2030": round(
            next((r["predictedTFR"] for r in timeseries if r["year"] == 2030), 0), 3
        ),
        "predictedTFR2040": round(
            next((r["predictedTFR"] for r in timeseries if r["year"] == 2040), 0), 3
        ),
        "cumEMF2024": round(
            next((r["cumulativeEMF"] for r in timeseries if r["year"] == 2024), 0), 2
        ),
    }

    return {"meta": meta, "timeseries": timeseries}


def main():
    print("Calibrating v16 cultural rates...")
    calibrate_v16()

    output_dir = Path(__file__).parent.parent / "website" / "public" / "data"
    output_dir.mkdir(parents=True, exist_ok=True)

    all_countries = {}
    for country in EXPLORER_COUNTRIES:
        print(f"  {country}...", end=" ", flush=True)
        try:
            all_countries[country] = generate_country_data(country)
            tfr24 = next(
                (r["predictedTFR"] for r in all_countries[country]["timeseries"]
                 if r["year"] == 2024), 0
            )
            cum24 = all_countries[country]["meta"]["cumEMF2024"]
            print(f"TFR2024={tfr24:.2f}  cumEMF={cum24:.1f}")
        except Exception as e:
            print(f"ERROR: {e}")

    output_file = output_dir / "explorer.json"
    with open(output_file, "w") as f:
        json.dump(all_countries, f)

    print(f"\nWrote {len(all_countries)} countries to {output_file}")
    print(f"File size: {output_file.stat().st_size / 1024:.1f} KB")


if __name__ == "__main__":
    main()
