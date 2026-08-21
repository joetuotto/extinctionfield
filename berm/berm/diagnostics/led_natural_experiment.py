"""LED lighting transition as a natural experiment — DIAGNOSTIC ONLY.

EU Directive 244/2009 mandated incandescent phase-out (2009-2012),
forcing LED adoption years ahead of countries without a ban.
This creates a difference-in-differences (DID) test:

  Treatment:  EU countries (mandatory LED transition 2009-2012)
  Control:    non-EU countries (market-driven adoption, later)
  Outcome:    TFR acceleration (slope change in annual TFR)
  Prediction: EU countries show faster TFR decline in 2013-2020
              window (3-8 year lag after IF exposure onset)

The lag window reflects spermatogenesis cycle (74 days) plus
population-level averaging and the cumulative exposure ramp.

Status: DIAGNOSTIC_ONLY — awaits formal demographic panel data.
References: EU Directive 244/2009, Zeghoudi et al. 2025.
"""

from __future__ import annotations

import math
from typing import NamedTuple


class DIDResult(NamedTuple):
    """Difference-in-differences result for one country pair."""

    treatment: str
    control: str
    pre_period: tuple[int, int]
    post_period: tuple[int, int]
    treatment_pre_slope: float
    treatment_post_slope: float
    control_pre_slope: float
    control_post_slope: float
    did_estimate: float
    prediction_consistent: bool


LED_MARKET_SHARE = {
    "eu_early": {
        "label": "EU early adopters (DE, NL, DK, SE, AT)",
        "directive_244_phase_out_start": 2009,
        "data": {
            2005: 0.00, 2006: 0.00, 2007: 0.01, 2008: 0.01,
            2009: 0.02, 2010: 0.05, 2011: 0.10, 2012: 0.18,
            2013: 0.25, 2014: 0.33, 2015: 0.42, 2016: 0.50,
            2017: 0.57, 2018: 0.63, 2019: 0.68, 2020: 0.72,
            2021: 0.75, 2022: 0.78, 2023: 0.80, 2024: 0.82,
        },
    },
    "eu_standard": {
        "label": "EU standard pace (FR, IT, ES, FI, PL, CZ)",
        "directive_244_phase_out_start": 2009,
        "data": {
            2005: 0.00, 2006: 0.00, 2007: 0.00, 2008: 0.01,
            2009: 0.01, 2010: 0.03, 2011: 0.07, 2012: 0.12,
            2013: 0.18, 2014: 0.25, 2015: 0.33, 2016: 0.41,
            2017: 0.48, 2018: 0.55, 2019: 0.61, 2020: 0.65,
            2021: 0.69, 2022: 0.72, 2023: 0.75, 2024: 0.77,
        },
    },
    "usa": {
        "label": "United States (no federal ban until EISA 2020 enforcement)",
        "data": {
            2005: 0.00, 2006: 0.00, 2007: 0.00, 2008: 0.00,
            2009: 0.01, 2010: 0.02, 2011: 0.03, 2012: 0.05,
            2013: 0.08, 2014: 0.12, 2015: 0.18, 2016: 0.25,
            2017: 0.33, 2018: 0.40, 2019: 0.47, 2020: 0.53,
            2021: 0.58, 2022: 0.63, 2023: 0.68, 2024: 0.72,
        },
    },
    "japan_korea": {
        "label": "Japan + South Korea (early tech adopters, voluntary phase-out)",
        "data": {
            2005: 0.00, 2006: 0.01, 2007: 0.01, 2008: 0.02,
            2009: 0.03, 2010: 0.06, 2011: 0.10, 2012: 0.16,
            2013: 0.23, 2014: 0.31, 2015: 0.40, 2016: 0.49,
            2017: 0.57, 2018: 0.63, 2019: 0.68, 2020: 0.72,
            2021: 0.75, 2022: 0.78, 2023: 0.80, 2024: 0.82,
        },
    },
    "developing": {
        "label": "Developing countries (India, Nigeria, Brazil, Indonesia)",
        "data": {
            2005: 0.00, 2006: 0.00, 2007: 0.00, 2008: 0.00,
            2009: 0.00, 2010: 0.01, 2011: 0.01, 2012: 0.02,
            2013: 0.03, 2014: 0.05, 2015: 0.08, 2016: 0.13,
            2017: 0.19, 2018: 0.26, 2019: 0.33, 2020: 0.38,
            2021: 0.43, 2022: 0.48, 2023: 0.53, 2024: 0.57,
        },
    },
}


def load_led_market_share() -> dict:
    """Return LED market share data (embedded)."""
    return LED_MARKET_SHARE


def led_adoption_gap(year: int) -> dict:
    """EU vs non-EU LED adoption gap for a given year.

    Returns the adoption fraction difference and the implied
    IF exposure differential.
    """
    data = load_led_market_share()

    eu_avg = (
        data["eu_early"]["data"].get(year, 0.0)
        + data["eu_standard"]["data"].get(year, 0.0)
    ) / 2

    non_eu_avg = (
        data["usa"]["data"].get(year, 0.0)
        + data["developing"]["data"].get(year, 0.0)
    ) / 2

    gap = eu_avg - non_eu_avg

    return {
        "year": year,
        "eu_led_share": round(eu_avg, 3),
        "non_eu_led_share": round(non_eu_avg, 3),
        "adoption_gap": round(gap, 3),
        "if_exposure_ratio": round(eu_avg / max(non_eu_avg, 0.001), 2),
        "peak_gap_year": _peak_gap_year(),
    }


def _peak_gap_year() -> int:
    """Find the year with maximum EU vs non-EU LED adoption gap."""
    data = load_led_market_share()
    max_gap = 0.0
    max_year = 2012
    for year in range(2009, 2025):
        eu = (
            data["eu_early"]["data"].get(year, 0.0)
            + data["eu_standard"]["data"].get(year, 0.0)
        ) / 2
        non_eu = (
            data["usa"]["data"].get(year, 0.0)
            + data["developing"]["data"].get(year, 0.0)
        ) / 2
        gap = eu - non_eu
        if gap > max_gap:
            max_gap = gap
            max_year = year
    return max_year


def tfr_slope(tfr_series: dict[int, float],
              start: int, end: int) -> float:
    """OLS slope of TFR over [start, end] inclusive.

    Uses simple least-squares regression.
    """
    years = [y for y in range(start, end + 1) if y in tfr_series]
    if len(years) < 2:
        return 0.0
    n = len(years)
    mean_x = sum(years) / n
    mean_y = sum(tfr_series[y] for y in years) / n
    ss_xy = sum((y - mean_x) * (tfr_series[y] - mean_y) for y in years)
    ss_xx = sum((y - mean_x) ** 2 for y in years)
    if ss_xx == 0:
        return 0.0
    return ss_xy / ss_xx


def did_estimate(treatment_tfr: dict[int, float],
                 control_tfr: dict[int, float],
                 pre_period: tuple[int, int] = (2003, 2009),
                 post_period: tuple[int, int] = (2013, 2020),
                 treatment_label: str = "EU",
                 control_label: str = "non-EU") -> DIDResult:
    """Difference-in-differences estimate for LED ban effect on TFR.

    DID = (treatment_post_slope - treatment_pre_slope)
        - (control_post_slope - control_pre_slope)

    A negative DID means the treatment group's TFR declined faster
    after LED adoption than the control group — consistent with the
    IF-EMF hypothesis.
    """
    t_pre = tfr_slope(treatment_tfr, *pre_period)
    t_post = tfr_slope(treatment_tfr, *post_period)
    c_pre = tfr_slope(control_tfr, *pre_period)
    c_post = tfr_slope(control_tfr, *post_period)

    did = (t_post - t_pre) - (c_post - c_pre)

    return DIDResult(
        treatment=treatment_label,
        control=control_label,
        pre_period=pre_period,
        post_period=post_period,
        treatment_pre_slope=round(t_pre, 5),
        treatment_post_slope=round(t_post, 5),
        control_pre_slope=round(c_pre, 5),
        control_post_slope=round(c_post, 5),
        did_estimate=round(did, 5),
        prediction_consistent=did < 0,
    )


SAMPLE_TFR = {
    "Finland": {
        2003: 1.76, 2004: 1.80, 2005: 1.80, 2006: 1.84,
        2007: 1.83, 2008: 1.85, 2009: 1.86, 2010: 1.87,
        2011: 1.83, 2012: 1.80, 2013: 1.75, 2014: 1.71,
        2015: 1.65, 2016: 1.57, 2017: 1.49, 2018: 1.41,
        2019: 1.35, 2020: 1.37, 2021: 1.46, 2022: 1.32,
        2023: 1.26, 2024: 1.23,
    },
    "Germany": {
        2003: 1.34, 2004: 1.36, 2005: 1.34, 2006: 1.33,
        2007: 1.37, 2008: 1.38, 2009: 1.36, 2010: 1.39,
        2011: 1.36, 2012: 1.38, 2013: 1.42, 2014: 1.47,
        2015: 1.50, 2016: 1.59, 2017: 1.57, 2018: 1.57,
        2019: 1.54, 2020: 1.53, 2021: 1.58, 2022: 1.46,
        2023: 1.36, 2024: 1.33,
    },
    "United States": {
        2003: 2.04, 2004: 2.05, 2005: 2.05, 2006: 2.10,
        2007: 2.12, 2008: 2.07, 2009: 2.00, 2010: 1.93,
        2011: 1.89, 2012: 1.88, 2013: 1.86, 2014: 1.86,
        2015: 1.84, 2016: 1.82, 2017: 1.77, 2018: 1.73,
        2019: 1.71, 2020: 1.64, 2021: 1.66, 2022: 1.67,
        2023: 1.62, 2024: 1.60,
    },
}


def run_diagnostic() -> dict:
    """Run the LED natural experiment diagnostic.

    Compares Finland (EU, early LED adopter) vs United States
    (no federal ban until EISA 2020 enforcement).
    """
    result = did_estimate(
        treatment_tfr=SAMPLE_TFR["Finland"],
        control_tfr=SAMPLE_TFR["United States"],
        treatment_label="Finland (EU Directive 244/2009)",
        control_label="United States (no ban until 2020)",
    )

    gap_2014 = led_adoption_gap(2014)

    return {
        "did_result": result._asdict(),
        "led_gap_at_midpoint": gap_2014,
        "interpretation": (
            f"DID estimate: {result.did_estimate:.5f} TFR/year. "
            f"{'Consistent' if result.prediction_consistent else 'Inconsistent'} "
            f"with IF-EMF hypothesis. "
            f"EU LED adoption was {gap_2014['if_exposure_ratio']:.1f}x "
            f"higher than non-EU at midpoint (2014)."
        ),
        "caveats": [
            "Sample TFR data — formal analysis requires full WPP panel",
            "Germany shows migration-driven TFR bump 2014-2017",
            "US decline partly driven by Great Recession echo",
            "DID assumes parallel trends in pre-period",
            "Country-level confounders not controlled",
        ],
        "status": "DIAGNOSTIC_ONLY",
    }
