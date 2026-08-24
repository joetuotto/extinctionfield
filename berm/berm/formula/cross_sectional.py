"""
Cross-sectional TFR prediction from EMF proxies.
Based on 54-country formula discovery (2026-08-21).
"""

import math


def emf_index(residential_kwh: float, broadband_per100: float,
              w_elf: float = 0.60, w_rf: float = 0.40) -> float:
    elf = min(1.0, residential_kwh / 8500)
    rf = min(1.0, broadband_per100 / 47)
    return w_elf * elf + w_rf * rf


def emf_index_three_channel(residential_kwh: float, broadband_per100: float,
                            led_market_share: float,
                            w_elf: float = 0.50, w_if: float = 0.15,
                            w_rf: float = 0.35) -> float:
    elf = min(1.0, residential_kwh / 8500)
    if_ch = min(1.0, max(0.0, led_market_share))
    rf = min(1.0, broadband_per100 / 47)
    return w_elf * elf + w_if * if_ch + w_rf * rf


def emf_effective(residential_kwh: float, broadband_per100: float,
                  electricity_access_pct: float) -> float:
    idx = emf_index(residential_kwh, broadband_per100)
    return idx * (electricity_access_pct / 100)


def predict_tfr_cross_sectional(residential_kwh: float,
                                broadband_per100: float,
                                electricity_access_pct: float = 100,
                                a: float = 4.11,
                                b: float = 54.0,
                                c: float = 1.55) -> dict:
    emf_eff = emf_effective(residential_kwh, broadband_per100,
                            electricity_access_pct)
    predicted = a * math.exp(-b * emf_eff) + c

    return {
        "predicted_tfr": round(predicted, 3),
        "emf_index": round(emf_index(residential_kwh, broadband_per100), 4),
        "emf_effective": round(emf_eff, 4),
        "elf_component": round(min(1.0, residential_kwh / 8500), 4),
        "rf_component": round(min(1.0, broadband_per100 / 47), 4),
        "access_adjustment": round(electricity_access_pct / 100, 3),
        "baseline_tfr": round(a + c, 2),
        "floor_tfr": round(c, 2),
        "model": "BERM v19.1 cross-sectional",
        "caveat": (
            "Cross-sectional only (no time dimension). "
            "ELF-GDP collinearity r=0.87. "
            "Discriminating evidence from sentinel species, "
            "natural experiments, and populations without electricity."
        ),
    }


def electrified_tfr(national_tfr: float,
                    electricity_access_pct: float,
                    unelectrified_tfr: float = 6.5) -> dict:
    access = electricity_access_pct / 100
    if access < 0.05:
        return {"error": "Access too low for reliable estimation"}

    elec_tfr = (national_tfr - (1 - access) * unelectrified_tfr) / access
    elec_tfr = max(0.5, elec_tfr)

    return {
        "national_tfr": national_tfr,
        "electricity_access": electricity_access_pct,
        "electrified_tfr": round(elec_tfr, 2),
        "unelectrified_tfr": unelectrified_tfr,
        "emf_suppression": round(unelectrified_tfr - elec_tfr, 2),
    }
