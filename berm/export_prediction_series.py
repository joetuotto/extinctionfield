#!/usr/bin/env python3
"""Export the observed TFR series behind each locked TFR prediction.

The predictions page charts a locked forecast against what has actually been
published, so each chart needs the observed series for its country up to the
latest available year. Only the countries that carry a locked TFR prediction
are exported, keeping the client bundle small.

Usage:  python3 export_prediction_series.py [output.json]
"""

from __future__ import annotations

import json
import sys
from pathlib import Path

from berm.stats.csli import load_tfr_data

DEFAULT_OUT = (
    Path(__file__).resolve().parent.parent
    / "website"
    / "lib"
    / "predictionSeries.json"
)

# Keys match LockedPrediction.country in website/lib/predictions.ts.
PREDICTION_COUNTRIES = {
    "Finland": "FIN",
    "SouthKorea": "KOR",
    "USA": "USA",
    "Japan": "JPN",
    "Brazil": "BRA",
    "Global": "WLD",
}

FIRST_YEAR = 1990


def build() -> dict:
    tfr = load_tfr_data()
    series = {}
    for name, iso3 in PREDICTION_COUNTRIES.items():
        if iso3 not in tfr:
            continue
        series[name] = [
            {"year": year, "tfr": round(value, 4)}
            for year, value in sorted(tfr[iso3].items())
            if year >= FIRST_YEAR
        ]
    return {
        "generatedBy": "berm/export_prediction_series.py",
        "source": "World Bank WDI published TFR series",
        "firstYear": FIRST_YEAR,
        "series": series,
    }


def main(argv: list[str]) -> int:
    out = Path(argv[1]) if len(argv) > 1 else DEFAULT_OUT
    payload = build()
    out.write_text(json.dumps(payload, indent=2) + "\n", encoding="utf-8")
    for name, points in payload["series"].items():
        print(f"{name:12s} {points[0]['year']}–{points[-1]['year']}  last {points[-1]['tfr']}")
    print(f"wrote {out}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main(sys.argv))
