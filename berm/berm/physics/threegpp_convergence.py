"""3GPP TS 24.008 eDRX/PTW timing convergence with R42 biological window.

Analyses whether standardized telecom power-saving timing values
coincidentally fall in the biological frequency window where
Zandieh et al. (2025) observed frequency-specific cell responses.

This is a DOCUMENTATION module: it does not change TFR predictions.
"""

from __future__ import annotations

# 3GPP TS 24.008 eDRX cycle values: T = 2^k × 10.24s, k = 1..10
EDRX_CYCLES_SECONDS: list[float] = [
    20.48, 40.96, 81.92, 163.84, 327.68,
    655.36, 1310.72, 2621.44, 5242.88, 10485.76,
]

# PTW (Paging Time Window) values: n × 2.56s, n = 1..16
PTW_VALUES_SECONDS: list[float] = [
    2.56, 5.12, 7.68, 10.24, 12.80, 15.36, 17.92, 20.48,
    23.04, 25.60, 28.16, 30.72, 33.28, 35.84, 38.40, 40.96,
]

# DRX cycle within PTW
DRX_CYCLES_SECONDS: list[float] = [0.32, 0.64, 1.28, 2.56]

R42_CENTER_HZ = 0.030
R42_LOW_HZ = 0.02045
R42_HIGH_HZ = 0.03955


def edrx_r42_analysis() -> dict:
    """Analyse which eDRX/PTW values produce fundamentals inside R42."""
    results: dict = {
        "edrx_in_r42": [],
        "ptw_in_r42": [],
        "edrx_harmonics_in_r42": [],
    }

    for T in EDRX_CYCLES_SECONDS:
        f1 = 1.0 / T
        if R42_LOW_HZ <= f1 <= R42_HIGH_HZ:
            results["edrx_in_r42"].append({
                "T_s": T,
                "f1_mHz": round(f1 * 1000, 3),
                "deviation_pct": round(
                    abs(f1 - R42_CENTER_HZ) / R42_CENTER_HZ * 100, 2
                ),
            })
        for n in range(2, 10):
            fn = n / T
            if R42_LOW_HZ <= fn <= R42_HIGH_HZ:
                results["edrx_harmonics_in_r42"].append({
                    "T_s": T,
                    "harmonic": n,
                    "fn_mHz": round(fn * 1000, 3),
                    "deviation_pct": round(
                        abs(fn - R42_CENTER_HZ) / R42_CENTER_HZ * 100, 2
                    ),
                })

    for ptw in PTW_VALUES_SECONDS:
        f1 = 1.0 / ptw
        if R42_LOW_HZ <= f1 <= R42_HIGH_HZ:
            results["ptw_in_r42"].append({
                "PTW_s": ptw,
                "f1_mHz": round(f1 * 1000, 3),
                "deviation_pct": round(
                    abs(f1 - R42_CENTER_HZ) / R42_CENTER_HZ * 100, 2
                ),
            })

    ptw_hits = results["ptw_in_r42"]
    results["summary"] = {
        "edrx_total": len(EDRX_CYCLES_SECONDS),
        "edrx_fundamental_in_r42": len(results["edrx_in_r42"]),
        "edrx_harmonics_in_r42": len(results["edrx_harmonics_in_r42"]),
        "ptw_total": len(PTW_VALUES_SECONDS),
        "ptw_in_r42": len(ptw_hits),
        "ptw_fraction_in_r42": round(
            len(ptw_hits) / len(PTW_VALUES_SECONDS), 4
        ),
        "closest_ptw_deviation_pct": (
            round(min(r["deviation_pct"] for r in ptw_hits), 2)
            if ptw_hits
            else None
        ),
    }

    return results


def convergence_significance() -> dict:
    """Estimate statistical significance of the 3GPP-R42 convergence.

    Null hypothesis: PTW values are arbitrary and R42 window is
    at a random location on the frequency axis.
    """
    r42_width_mHz = (R42_HIGH_HZ - R42_LOW_HZ) * 1000
    freq_min_mHz = 1000.0 / PTW_VALUES_SECONDS[-1]
    freq_max_mHz = 1000.0 / PTW_VALUES_SECONDS[0]
    freq_range_mHz = freq_max_mHz - freq_min_mHz
    n_ptw = len(PTW_VALUES_SECONDS)

    p_single_band = r42_width_mHz / freq_range_mHz
    # Precise hit: within 0.5% of R42 center
    precise_window_mHz = 2 * 0.005 * R42_CENTER_HZ * 1000
    p_single_precise = precise_window_mHz / freq_range_mHz

    p_any_band = 1 - (1 - p_single_band) ** n_ptw
    p_any_precise = 1 - (1 - p_single_precise) ** n_ptw

    return {
        "r42_width_mHz": round(r42_width_mHz, 1),
        "freq_range_mHz": round(freq_range_mHz, 1),
        "n_ptw": n_ptw,
        "p_single_band": round(p_single_band, 4),
        "p_any_band": round(p_any_band, 4),
        "p_single_precise": round(p_single_precise, 6),
        "p_any_precise": round(p_any_precise, 4),
        "significant_005": p_any_precise < 0.05,
        "note": (
            "Simplified calculation. Real analysis should account for: "
            "(1) PTW values are not random (n × 2.56s), "
            "(2) R42 window is not at a random location (derived from biology), "
            "(3) both are discrete series. "
            "R43 experiment is the only way to distinguish coincidence from mechanism."
        ),
    }
