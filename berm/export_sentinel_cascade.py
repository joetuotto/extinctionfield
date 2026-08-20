#!/usr/bin/env python3
"""Export the bee -> TFR lag series behind the sentinel cascade figure.

The panel selection reproduces the published CSLI_COLOSS_23 result exactly:
countries with a COLOSS winter-loss series long enough for four annual
changes, correlated against the TFR annual change at a two-year lag give
23 countries with 20 in the BERM direction.

The published pooled r (-0.272) is a separate within-country pooling and is
carried through from berm.stats.csli_empirical rather than recomputed here,
so the figure never invents its own effect size.

Usage:  python3 export_sentinel_cascade.py [output.json]
"""

from __future__ import annotations

import json
import statistics
import sys
from pathlib import Path

from berm.stats.csli import load_bee_data, load_tfr_data
from berm.stats.csli_empirical import CSLI_COLOSS_23

DEFAULT_OUT = (
    Path(__file__).resolve().parent.parent
    / "website"
    / "lib"
    / "sentinelCascadeSeries.json"
)

MIN_ANNUAL_CHANGES = 4
MAX_LAG = 5
# A pooled annual mean is only meaningful when most of the panel reports that
# year; single-country years would otherwise read as a panel-wide movement.
MIN_COUNTRIES_PER_YEAR = 10


def annual_changes(series: dict[int, float]) -> dict[int, float]:
    return {y: series[y] - series[y - 1] for y in sorted(series) if y - 1 in series}


def pearson(xs: list[float], ys: list[float]) -> float | None:
    n = len(xs)
    if n < 3:
        return None
    mx, my = sum(xs) / n, sum(ys) / n
    vx = sum((x - mx) ** 2 for x in xs)
    vy = sum((y - my) ** 2 for y in ys)
    if vx == 0 or vy == 0:
        return None
    cov = sum((x - mx) * (y - my) for x, y in zip(xs, ys))
    return cov / (vx**0.5 * vy**0.5)


def build() -> dict:
    bee_raw, tfr_raw = load_bee_data(), load_tfr_data()
    bee = {c: annual_changes(s) for c, s in bee_raw.items()}
    tfr = {c: annual_changes(s) for c, s in tfr_raw.items()}

    panel = sorted(
        c
        for c in bee
        if c in tfr and len(bee[c]) >= MIN_ANNUAL_CHANGES
    )

    lag_profile = []
    for lag in range(MAX_LAG + 1):
        rs = []
        for c in panel:
            years = [y for y in sorted(bee[c]) if y + lag in tfr[c]]
            r = pearson([bee[c][y] for y in years], [tfr[c][y + lag] for y in years])
            if r is not None:
                rs.append(r)
        lag_profile.append(
            {
                "lag": lag,
                "meanR": round(statistics.mean(rs), 4),
                "bermDirection": sum(1 for r in rs if r < 0),
                "countries": len(rs),
            }
        )

    def pooled(source: dict[str, dict[int, float]], lo: int, hi: int):
        by_year: dict[int, list[float]] = {}
        for c in panel:
            for year, value in source[c].items():
                if lo <= year <= hi:
                    by_year.setdefault(year, []).append(value)
        return [
            {
                "year": year,
                "mean": round(statistics.mean(values), 4),
                "countries": len(values),
            }
            for year, values in sorted(by_year.items())
            if len(values) >= MIN_COUNTRIES_PER_YEAR
        ]

    bee_series = pooled(bee, 2010, 2024)
    span = (bee_series[0]["year"], bee_series[-1]["year"] + MAX_LAG)
    tfr_series = pooled(tfr, span[0], span[1])

    by_country = {}
    for c in panel:
        by_country[c] = {
            "bee": [{"year": y, "value": round(v, 3)} for y, v in sorted(bee[c].items())],
            "tfr": [
                {"year": y, "value": round(v, 4)}
                for y, v in sorted(tfr[c].items())
                if span[0] <= y <= span[1]
            ],
        }

    return {
        "generatedBy": "berm/export_sentinel_cascade.py",
        "panel": panel,
        "panelSize": len(panel),
        "beeSeries": bee_series,
        "tfrSeries": tfr_series,
        "lagProfile": lag_profile,
        "byCountry": by_country,
        "published": {
            "pooledR": CSLI_COLOSS_23["pooled_r"],
            "circularShiftP": CSLI_COLOSS_23["circular_shift_p"],
            "bermDirection": CSLI_COLOSS_23["berm_direction"],
            "panelSize": CSLI_COLOSS_23["panel_size"],
            "optimalLagYears": CSLI_COLOSS_23["optimal_lag_years"],
            "note": (
                "pooled_r and circular_shift_p come from the within-country "
                "pooled analysis, which controls for level differences between "
                "countries. The pooled annual means drawn in the figure remove "
                "those differences and therefore correlate differently."
            ),
        },
    }


def main(argv: list[str]) -> int:
    out = Path(argv[1]) if len(argv) > 1 else DEFAULT_OUT
    payload = build()
    out.write_text(json.dumps(payload, indent=2) + "\n", encoding="utf-8")
    print(f"panel: {payload['panelSize']} countries")
    for entry in payload["lagProfile"]:
        print(
            f"  lag {entry['lag']}: mean r = {entry['meanR']:+.3f}, "
            f"BERM direction {entry['bermDirection']}/{entry['countries']}"
        )
    print(f"bee series years: {[e['year'] for e in payload['beeSeries']]}")
    print(f"wrote {out}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main(sys.argv))
