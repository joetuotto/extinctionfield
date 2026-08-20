"""
CSLI empirical results — two panels.

Panel 1 (discovery): 31 countries, mixed bee-loss sources, optimal lag ~5yr.
Panel 2 (source-verified): 23 countries, COLOSS-only, optimal lag ~2yr.

Panel 2 supersedes Panel 1 for the bee→TFR lag estimate.

Status: [C] correlational — not peer-reviewed.
"""

from __future__ import annotations

CSLI_31_COUNTRY_RESULTS: dict = {
    "panel_size": 31,
    "berm_direction": 23,
    "anti_direction": 8,
    "binomial_p": 0.005337,
    "mean_r": -0.205,
    "median_r": -0.242,
    "pooled_r": -0.15,
    "bayesian_posterior_negative": 0.996,
    "optimal_lag_years": 5,
    "lag_range_years": (3, 7),
    "delta_robust_loose": "24/31",
    "delta_robust_strict": "22/29",
    "regional": {
        "Americas": {"berm": 4, "total": 4},
        "AsiaPacific": {"berm": 6, "total": 6},
        "Europe": {"berm": 13, "total": 21},
    },
    "status": "C",
    "prior_status": "O",
    "date": "2026-08-19",
    "note": "Superseded by CSLI_COLOSS_23 for lag estimate",
}

CSLI_COLOSS_23: dict = {
    "panel_size": 23,
    "source": "COLOSS annual reports, source-verified",
    "berm_direction": 20,
    "anti_direction": 3,
    "pooled_r": -0.272,
    "circular_shift_p": 0.006,
    "bonferroni_p_8lag": 0.046,
    "optimal_lag_years": 2,
    "lag_range_years": (1, 3),
    "regional": {
        "Americas": {"berm": 4, "total": 4},
        "AsiaPacific": {"berm": 6, "total": 6},
        "Europe": {"berm": 13, "total": 21},
    },
    "replication": ["World Bank TFR", "WPP 2024 TFR"],
    "status": "C",
    "date": "2026-08-20",
}
