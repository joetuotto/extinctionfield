"""Read-only provenance check of existing BERM proxy tables; no dose inference.

Run from any directory with Python 3.10+ (standard library for repo CSVs).
This reproduces descriptive statistics from the current CSV bytes. It does not
refit the historical nonlinear model or reproduce its reported LOOCV result.
Optional --belmin-data-dir DIR reads the publication's downloaded panel_elec.csv
and panel_elec_MCF.csv and reproduces Table 1 using NumPy and pandas.
"""

import argparse
from collections import Counter
import csv
import hashlib
import json
import math
from pathlib import Path
import statistics


ROOT = Path(__file__).resolve().parents[3]


def read_csv(relative_path):
    path = ROOT / relative_path
    with path.open(newline="", encoding="utf-8") as handle:
        rows = list(csv.DictReader(handle))
    return rows, hashlib.sha256(path.read_bytes()).hexdigest()


def reproduce_belmin(data_dir):
    import numpy as np
    import pandas as pd

    controls = ["mean_educ_years", "urban_rate", "GDP_PPP_pc",
                "mean_age_marriage", "total_number_deaths_per_10000"]
    specifications = {
        "M1": ("panel_elec.csv", ["elec_rate"]),
        "M2": ("panel_elec_MCF.csv", ["modern_cooking_fuel_rate"]),
        "M3": ("panel_elec_MCF.csv", ["elec_rate", "modern_cooking_fuel_rate"]),
        "M4": ("panel_elec_MCF.csv", ["high_access_rate"]),
    }
    results = {}
    for label, (filename, energy_columns) in specifications.items():
        path = data_dir / filename
        frame = pd.read_csv(path)
        # Same non-imputed rows and complete cases as the original R/plm code.
        frame = frame.loc[frame["impute"] == False].copy()  # noqa: E712
        variables = energy_columns + controls
        frame = frame.dropna(subset=variables + ["TFR", "year_group_5", "region_name_harmonized"])
        x = pd.concat([
            frame[variables],
            pd.get_dummies(frame["year_group_5"], prefix="period", drop_first=True, dtype=float),
        ], axis=1)
        group = frame["region_name_harmonized"]
        # Region-within transformation; five-year period indicators remain.
        x = x - x.groupby(group).transform("mean")
        y = frame["TFR"] - frame["TFR"].groupby(group).transform("mean")
        matrix, outcome = x.to_numpy(float), y.to_numpy(float)
        beta = np.linalg.lstsq(matrix, outcome, rcond=None)[0]
        residual = outcome - matrix @ beta
        bread = np.linalg.inv(matrix.T @ matrix)
        meat = np.zeros((matrix.shape[1], matrix.shape[1]))
        for region in group.unique():
            mask = (group == region).to_numpy()
            score = matrix[mask].T @ residual[mask]
            meat += np.outer(score, score)
        # HC0 clustered sandwich, matching vcovHC(type='HC0', cluster='group').
        standard_error = np.sqrt(np.diag(bread @ meat @ bread))
        within_r2 = float(1 - residual @ residual / (outcome @ outcome))
        n, k = matrix.shape
        # Author's calc_adj_rsq convention, not an alternative FE df correction.
        adjusted_r2 = 1 - (1 - within_r2) * (n - 1) / (n - (k + 1))
        results[label] = {
            "source_file": filename,
            "sha256": hashlib.sha256(path.read_bytes()).hexdigest(),
            "n": n,
            "regions": int(group.nunique()),
            "countries": int(frame["country_code"].nunique()),
            "energy_coefficients": {
                column: {"beta": float(beta[i]), "cluster_hc0_se": float(standard_error[i])}
                for i, column in enumerate(energy_columns)
            },
            "within_r2": within_r2,
            "authors_adjusted_r2_before_rounding": adjusted_r2,
            "authors_adjusted_r2_rounded": round(adjusted_r2, 2),
        }
    return results


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--belmin-data-dir", type=Path)
    arguments = parser.parse_args()
    rows, digest = read_csv("website/public/data/cross_section_manifest.csv")
    y = [float(row["tfr_observed_2022"]) for row in rows]
    statistics_by_column = {}
    for column in ("total_electricity_kwh_capita", "broadband_per_100", "emf_index"):
        x = [float(row[column]) for row in rows]
        r = statistics.correlation(x, y)
        statistics_by_column[column] = {"n": len(y), "pearson_r": r, "ols_with_intercept_r2": r * r}
    prediction = [float(row["tfr_predicted"]) for row in rows]
    sse = sum((actual - fitted) ** 2 for actual, fitted in zip(y, prediction))
    sst = sum((actual - statistics.mean(y)) ** 2 for actual in y)
    index_error = max(
        abs(float(row["emf_index"]) - (
            0.60 * min(float(row["total_electricity_kwh_capita"]) / 8500, 1)
            + 0.40 * min(float(row["broadband_per_100"]) / 47, 1)
        )) for row in rows
    )
    panel, panel_digest = read_csv("website/public/data/global_panel.csv")
    complete_columns = ("tfr", "mobile_per_100", "urban_pct", "gdp_ppp_per_capita")
    # Conditional algebra only: the attachment's sample and models are unknown.
    r_y_emf = -math.sqrt(0.394)
    r_y_edu = -math.sqrt(0.343)
    r_emf_edu = 0.85
    partial_emf = (r_y_emf - r_y_edu * r_emf_edu) / math.sqrt((1 - r_y_edu**2) * (1 - r_emf_edu**2))
    partial_edu = (r_y_edu - r_y_emf * r_emf_edu) / math.sqrt((1 - r_y_emf**2) * (1 - r_emf_edu**2))
    output = {
        "cross_section_manifest": {
            "sha256": digest,
            "rows": len(rows),
            "physical_emf_measurement": False,
            "descriptive_statistics": statistics_by_column,
            "stored_prediction_r2_1_minus_sse_over_sst": 1 - sse / sst,
            "stored_prediction_rmse": math.sqrt(sse / len(y)),
            "reconstructed_index_max_absolute_difference": index_error,
            "columns_absent_for_claimed_multivariable_models": [
                column for column in ("education", "urbanization", "GDP")
                if column not in rows[0]
            ],
        },
        "global_panel": {
            "sha256": panel_digest,
            "rows": len(panel),
            "countries_and_areas": len({row["country_iso3"] for row in panel}),
            "year_min": min(int(row["year"]) for row in panel),
            "year_max": max(int(row["year"]) for row in panel),
            "tfr_series_status_counts": dict(Counter(row["tfr_series_status"] for row in panel)),
            "complete_2022_rows_tfr_mobile_urban_gdp": sum(
                row["year"] == "2022" and all(row[column] for column in complete_columns)
                for row in panel
            ),
            "education_column_present": "education_years_female" in panel[0],
            "physical_emf_measurement": False,
        },
        "attachment_conditional_algebra_not_empirical_results": {
            "r2_ratio": 0.394 / 0.433,
            "common_r2": 0.394 + 0.433 - 0.448,
            "unique_emf_r2": 0.448 - 0.433,
            "unique_three_proxies_r2": 0.448 - 0.394,
            "pair_r2_implied_by_partial_emf_minus_037": 0.343 + 0.37**2 * (1 - 0.343),
            "pair_r2_implied_by_partial_edu_minus_025": 0.394 + 0.25**2 * (1 - 0.394),
            "partial_emf_given_claimed_simple_r2_and_correlation_085": partial_emf,
            "partial_edu_given_claimed_simple_r2_and_correlation_085": partial_edu,
        },
    }
    if arguments.belmin_data_dir:
        output["belmin_table_1_reproduction"] = reproduce_belmin(arguments.belmin_data_dir)
    print(json.dumps(output, ensure_ascii=False, indent=2))


if __name__ == "__main__":
    main()
