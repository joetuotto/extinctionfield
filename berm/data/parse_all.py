"""BERM Data Pipeline — parse raw data sources into standardised CSVs.

Run once after downloading raw data (or when sources update).

Sources:
  - World Bank API (JSON): mobile, broadband, internet, urban, TFR
  - All CC BY-4.0

Output:
  processed/*.csv   — standardised country×year tables
  berm/*.json       — BERM-specific parameters and website data
"""

from __future__ import annotations

import json
import os
from pathlib import Path

import pandas as pd

DATA_DIR = Path(__file__).parent
RAW_DIR = DATA_DIR / "raw"
PROC_DIR = DATA_DIR / "processed"
BERM_DIR = DATA_DIR / "berm"

ISO3_TO_BERM: dict[str, str] = {
    # Original 25 countries
    "FIN": "Finland", "KOR": "SouthKorea", "JPN": "Japan",
    "USA": "USA", "DEU": "Germany", "FRA": "France",
    "GBR": "UK", "ITA": "Italy", "ESP": "Spain",
    "CHN": "China", "IND": "India", "BRA": "Brazil",
    "NGA": "Nigeria", "NER": "Niger", "IRN": "Iran",
    "ISR": "Israel", "AUS": "Australia", "CAN": "Canada",
    "MEX": "Mexico", "SWE": "Sweden", "NOR": "Norway",
    "DNK": "Denmark", "RUS": "Russia", "CUB": "Cuba",
    "MMR": "Myanmar", "BGD": "Bangladesh", "ETH": "Ethiopia",
    # Expansion to 50
    "TUR": "Turkey", "EGY": "Egypt", "IDN": "Indonesia",
    "THA": "Thailand", "VNM": "Vietnam", "POL": "Poland",
    "ROU": "Romania", "UKR": "Ukraine", "KAZ": "Kazakhstan",
    "UZB": "Uzbekistan", "KHM": "Cambodia", "MYS": "Malaysia",
    "DZA": "Algeria", "MAR": "Morocco", "GHA": "Ghana",
    "KEN": "Kenya", "MOZ": "Mozambique", "NPL": "Nepal",
    "LKA": "SriLanka", "COL": "Colombia", "PER": "Peru",
    "CHL": "Chile", "ARG": "Argentina", "TZA": "Tanzania",
    "COD": "DRCongo", "ZAF": "SouthAfrica", "SAU": "SaudiArabia",
    "ARE": "UAE", "SGP": "Singapore", "PHL": "Philippines",
}

BERM_TO_ISO3 = {v: k for k, v in ISO3_TO_BERM.items()}

# World Bank uses ISO2 in its API responses; map ISO3→ISO2 for lookups
ISO3_TO_ISO2: dict[str, str] = {
    "FIN": "FI", "KOR": "KR", "JPN": "JP", "USA": "US", "DEU": "DE",
    "FRA": "FR", "GBR": "GB", "ITA": "IT", "ESP": "ES", "CHN": "CN",
    "IND": "IN", "BRA": "BR", "NGA": "NG", "NER": "NE", "IRN": "IR",
    "ISR": "IL", "AUS": "AU", "CAN": "CA", "MEX": "MX", "SWE": "SE",
    "NOR": "NO", "DNK": "DK", "RUS": "RU", "CUB": "CU", "MMR": "MM",
    "BGD": "BD", "ETH": "ET", "TUR": "TR", "EGY": "EG", "IDN": "ID",
    "THA": "TH", "VNM": "VN", "POL": "PL", "ROU": "RO", "UKR": "UA",
    "KAZ": "KZ", "UZB": "UZ", "KHM": "KH", "MYS": "MY", "DZA": "DZ",
    "MAR": "MA", "GHA": "GH", "KEN": "KE", "MOZ": "MZ", "NPL": "NP",
    "LKA": "LK", "COL": "CO", "PER": "PE", "CHL": "CL", "ARG": "AR",
    "TZA": "TZ", "COD": "CD", "ZAF": "ZA", "SAU": "SA", "ARE": "AE",
    "SGP": "SG", "PHL": "PH",
}


def parse_worldbank_json(filename: str, value_name: str) -> pd.DataFrame:
    """Parse World Bank JSON API response into standardised DataFrame."""
    path = RAW_DIR / filename
    with open(path) as f:
        data = json.load(f)

    if not isinstance(data, list) or len(data) < 2:
        raise ValueError(f"Unexpected JSON structure in {filename}")

    records = []
    for r in data[1]:
        if r["value"] is None:
            continue
        iso2 = r["countryiso3code"]  # WB calls this "countryiso3code" but it's ISO3
        records.append({
            "country_iso3": iso2,
            "year": int(r["date"]),
            value_name: float(r["value"]),
        })

    df = pd.DataFrame(records)
    # Filter to only 3-letter country codes (exclude aggregates like "WLD", "EAS")
    df = df[df["country_iso3"].str.len() == 3]
    df = df.sort_values(["country_iso3", "year"]).reset_index(drop=True)
    return df


def parse_tfr() -> pd.DataFrame:
    """Parse TFR from World Bank API."""
    df = parse_worldbank_json("wb_tfr.json", "tfr")
    out = PROC_DIR / "tfr_by_country_year.csv"
    df.to_csv(out, index=False)
    print(f"TFR: {len(df):,} rows, {df['country_iso3'].nunique()} countries, "
          f"{df['year'].min()}-{df['year'].max()}")
    return df


def parse_mobile() -> pd.DataFrame:
    """Parse mobile cellular subscriptions per 100."""
    df = parse_worldbank_json("wb_mobile.json", "subs_per_100")
    out = PROC_DIR / "mobile_by_country_year.csv"
    df.to_csv(out, index=False)
    print(f"Mobile: {len(df):,} rows, {df['country_iso3'].nunique()} countries, "
          f"{df['year'].min()}-{df['year'].max()}")
    return df


def parse_broadband() -> pd.DataFrame:
    """Parse fixed broadband subscriptions per 100."""
    df = parse_worldbank_json("wb_broadband.json", "broadband_per_100")
    out = PROC_DIR / "broadband_by_country_year.csv"
    df.to_csv(out, index=False)
    print(f"Broadband: {len(df):,} rows, {df['country_iso3'].nunique()} countries")
    return df


def parse_internet() -> pd.DataFrame:
    """Parse individuals using internet (%)."""
    df = parse_worldbank_json("wb_internet.json", "internet_pct")
    out = PROC_DIR / "internet_by_country_year.csv"
    df.to_csv(out, index=False)
    print(f"Internet: {len(df):,} rows, {df['country_iso3'].nunique()} countries")
    return df


def parse_urban() -> pd.DataFrame:
    """Parse urban population (%)."""
    df = parse_worldbank_json("wb_urban.json", "urban_pct")
    out = PROC_DIR / "urban_by_country_year.csv"
    df.to_csv(out, index=False)
    print(f"Urban: {len(df):,} rows, {df['country_iso3'].nunique()} countries")
    return df


def _find_threshold_year(series: pd.DataFrame, col: str, threshold: float) -> int | None:
    """Find first year where column exceeds threshold."""
    above = series[series[col] > threshold]
    return int(above["year"].min()) if len(above) > 0 else None


def generate_tech_diffusion(
    mobile_df: pd.DataFrame,
    internet_df: pd.DataFrame,
    broadband_df: pd.DataFrame,
) -> dict:
    """Generate TECH_DIFFUSION parameters from World Bank data.

    For each BERM country, estimates:
      start: year mobile penetration first exceeded 5/100 (meaningful adoption)
      half: year mobile penetration first exceeded 50/100
      year_3g: estimated from internet penetration exceeding 10%
      year_4g: estimated from broadband exceeding 10/100 or internet > 50%
      year_5g: estimated heuristically (advanced countries ~2019-2020, others later)

    Original 25 countries retain manual values in countries.py;
    these auto values are starting points for expansion countries.
    """
    tech_diff: dict[str, dict] = {}

    for iso3, berm_name in ISO3_TO_BERM.items():
        mob = mobile_df[mobile_df["country_iso3"] == iso3].sort_values("year")
        inet = internet_df[internet_df["country_iso3"] == iso3].sort_values("year")
        bb = broadband_df[broadband_df["country_iso3"] == iso3].sort_values("year")

        if len(mob) == 0:
            continue

        start = _find_threshold_year(mob, "subs_per_100", 5) or 2005
        half = _find_threshold_year(mob, "subs_per_100", 50) or start + 10
        saturation = _find_threshold_year(mob, "subs_per_100", 100) or 2025

        year_3g = _find_threshold_year(inet, "internet_pct", 10) or half + 2
        year_4g = _find_threshold_year(inet, "internet_pct", 50) or year_3g + 5
        if len(bb) > 0:
            bb_10 = _find_threshold_year(bb, "broadband_per_100", 10)
            if bb_10 and bb_10 < year_4g:
                year_4g = bb_10

        # 5G heuristic: advanced economies ~2019-2020, others scale by 4G lag
        base_5g = 2020
        lag = max(0, year_4g - 2012)
        year_5g = base_5g + lag

        latest = mob.iloc[-1]
        current = float(latest["subs_per_100"])

        tech_diff[berm_name] = {
            "iso3": iso3,
            "start": start,
            "half": half,
            "saturation": saturation,
            "year_3g": year_3g,
            "year_4g": year_4g,
            "year_5g": year_5g,
            "current_mobile_per_100": round(current, 1),
            "latest_year": int(latest["year"]),
        }

    return tech_diff


def generate_map_json(tfr_df: pd.DataFrame, mobile_df: pd.DataFrame) -> None:
    """Generate world map JSON for the website."""
    map_data: dict[str, dict] = {}

    for iso3 in tfr_df["country_iso3"].unique():
        country_tfr = tfr_df[tfr_df["country_iso3"] == iso3]
        country_mobile = mobile_df[mobile_df["country_iso3"] == iso3]

        tfr_by_year = {
            int(row["year"]): round(float(row["tfr"]), 3)
            for _, row in country_tfr.iterrows()
        }
        mobile_by_year = {
            int(row["year"]): round(float(row["subs_per_100"]), 1)
            for _, row in country_mobile.iterrows()
        } if len(country_mobile) > 0 else {}

        berm_name = ISO3_TO_BERM.get(iso3)

        map_data[iso3] = {
            "tfr": tfr_by_year,
            "mobile": mobile_by_year,
            "berm_country": berm_name,
        }

    out = BERM_DIR / "map_data.json"
    with open(out, "w") as f:
        json.dump(map_data, f, separators=(",", ":"))

    print(f"Map JSON: {len(map_data)} countries, {os.path.getsize(out) // 1024} KB")


def print_berm_coverage(tfr_df: pd.DataFrame, mobile_df: pd.DataFrame) -> None:
    """Print coverage summary for BERM countries."""
    print("\nBERM country coverage:")
    print(f"{'Country':<15} {'ISO3':<5} {'TFR rows':<10} {'TFR range':<15} {'Mobile rows':<12} {'Latest mobile':<15}")
    print("-" * 75)

    for iso3, berm_name in sorted(ISO3_TO_BERM.items(), key=lambda x: x[1]):
        tfr_rows = tfr_df[tfr_df["country_iso3"] == iso3]
        mob_rows = mobile_df[mobile_df["country_iso3"] == iso3]

        tfr_range = f"{tfr_rows['year'].min()}-{tfr_rows['year'].max()}" if len(tfr_rows) > 0 else "MISSING"
        latest_mob = f"{mob_rows.iloc[-1]['subs_per_100']:.1f}/100" if len(mob_rows) > 0 else "MISSING"

        print(f"{berm_name:<15} {iso3:<5} {len(tfr_rows):<10} {tfr_range:<15} {len(mob_rows):<12} {latest_mob:<15}")


if __name__ == "__main__":
    PROC_DIR.mkdir(parents=True, exist_ok=True)
    BERM_DIR.mkdir(parents=True, exist_ok=True)

    print("=" * 60)
    print("BERM Data Pipeline")
    print("=" * 60)

    # 1. Parse all indicators
    tfr_df = parse_tfr()
    mobile_df = parse_mobile()
    broadband_df = parse_broadband()
    internet_df = parse_internet()
    urban_df = parse_urban()

    # 2. Generate TECH_DIFFUSION from mobile + internet + broadband data
    tech_diff = generate_tech_diffusion(mobile_df, internet_df, broadband_df)
    tech_out = BERM_DIR / "country_params.json"
    with open(tech_out, "w") as f:
        json.dump(tech_diff, f, indent=2)
    print(f"\nTECH_DIFFUSION: {len(tech_diff)} countries")

    # 3. Generate map JSON
    generate_map_json(tfr_df, mobile_df)

    # 4. Coverage summary
    print_berm_coverage(tfr_df, mobile_df)

    # 5. File sizes
    print("\nOutput files:")
    for d in [PROC_DIR, BERM_DIR]:
        for f in sorted(d.iterdir()):
            if f.is_file():
                print(f"  {f.relative_to(DATA_DIR)} ({f.stat().st_size // 1024} KB)")
