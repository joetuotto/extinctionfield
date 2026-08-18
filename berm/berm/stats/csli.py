"""Cross-Species Lag Invariance (CSLI) statistical framework.

Tests whether the same local environmental shock produces a
biologically-ordered lag cascade across sentinel species:

    EMF change → Sentinel change → Human biomarker → Human fertility
         T_E          T_S              T_H               T_F

Golden signature: T_E < T_S < T_H < T_F and the inter-species
lags Δ_S and Δ_H are INVARIANT across regions.

This module is DIAGNOSTIC ONLY — results are reported transparently
regardless of whether they support or refute the hypothesis.
"""

from __future__ import annotations

import json
from pathlib import Path
from typing import Any

import numpy as np

DATA_DIR = Path(__file__).resolve().parents[2] / "data"
SENTINEL_DIR = DATA_DIR / "sentinel"


# ─── Data loaders ───────────────────────────────────────────────────

def _parse_winter_year(winter_str: str) -> int:
    """'2015-16' → 2016 (end year as measurement point)."""
    parts = winter_str.split("-")
    if len(parts) == 2:
        start = int(parts[0])
        end = int(parts[1])
        if end < 100:
            end += (start // 100) * 100
            if end <= start:
                end += 100
        return end
    return int(winter_str)


def load_bee_data() -> dict[str, dict[int, float]]:
    """Load COLOSS winter loss data as {country_iso3: {year: loss_%}}."""
    path = SENTINEL_DIR / "coloss_winter_loss.json"
    raw = json.loads(path.read_text())
    result = {}
    for country, values in raw["data"].items():
        iso3 = values.get("iso3", country[:3].upper())
        series = {}
        for k, v in values.items():
            if k == "iso3" or v is None:
                continue
            year = _parse_winter_year(k)
            series[year] = float(v)
        if series:
            result[iso3] = series
    return result


def load_bird_data() -> dict[str, dict[int, float]]:
    """Load bird population index as {country_iso3: {year: index}}."""
    path = SENTINEL_DIR / "bird_index.json"
    raw = json.loads(path.read_text())
    result = {}
    for country, values in raw["data"].items():
        iso3 = values.get("iso3", country[:3].upper())
        series = {}
        for k, v in values.items():
            if k in ("iso3", "type") or v is None:
                continue
            series[int(k)] = float(v)
        if series:
            result[iso3] = series
    return result


def load_sperm_data() -> dict[str, dict[int, float]]:
    """Load sperm concentration as {country_iso3: {year: M/mL}}."""
    path = SENTINEL_DIR / "sperm_by_country.json"
    raw = json.loads(path.read_text())
    result = {}
    for country, values in raw["data"].items():
        iso3 = values.get("iso3", country[:3].upper())
        series = {}
        for k, v in values.items():
            if k == "iso3" or v is None:
                continue
            series[int(k)] = float(v)
        if series:
            result[iso3] = series
    return result


def load_emf_data() -> dict[str, dict[int, float]]:
    """Load mobile subscriptions per 100 as EMF proxy."""
    import csv

    path = DATA_DIR / "processed" / "mobile_by_country_year.csv"
    result: dict[str, dict[int, float]] = {}
    with open(path) as f:
        reader = csv.DictReader(f)
        for row in reader:
            iso3 = row["country_iso3"]
            year = int(row["year"])
            val = float(row["subs_per_100"])
            result.setdefault(iso3, {})[year] = val
    return result


def load_tfr_data() -> dict[str, dict[int, float]]:
    """Load TFR by country-year."""
    import csv

    path = DATA_DIR / "processed" / "tfr_by_country_year.csv"
    result: dict[str, dict[int, float]] = {}
    with open(path) as f:
        reader = csv.DictReader(f)
        for row in reader:
            iso3 = row["country_iso3"]
            year = int(row["year"])
            val = float(row["tfr"])
            result.setdefault(iso3, {})[year] = val
    return result


# ─── B-spline utilities ────────────────────────────────────────────

def _bspline_basis(lag: float, k: int, knots: np.ndarray,
                   degree: int = 3) -> float:
    """Evaluate k-th B-spline basis function at given lag."""
    from scipy.interpolate import BSpline as SciBSpline

    n_basis = len(knots) + degree - 1
    if k >= n_basis:
        return 0.0

    augmented_knots = np.concatenate([
        np.full(degree, knots[0]),
        knots,
        np.full(degree, knots[-1]),
    ])

    coeffs = np.zeros(n_basis)
    if k < len(coeffs):
        coeffs[k] = 1.0

    try:
        spline = SciBSpline(augmented_knots, coeffs, degree)
        val = float(spline(lag))
        return val
    except Exception:
        return 0.0


# ─── Lag-kernel estimation ──────────────────────────────────────────

def estimate_lag_kernel(
    outcome_data: dict[str, dict[int, float]],
    emf_data: dict[str, dict[int, float]],
    max_lag: int = 15,
    n_spline_knots: int = 5,
) -> dict[str, Any]:
    """Estimate lag-kernel w(l) for one sentinel species.

    outcome_data: {country_iso3: {year: value}}
    emf_data: {country_iso3: {year: emf_proxy}}
    max_lag: maximum lag in years
    n_spline_knots: number of B-spline knots

    Returns estimated weights w(0)..w(max_lag) and diagnostics.
    """
    knots = np.linspace(0, max_lag, n_spline_knots)
    degree = 3
    n_basis = len(knots) + degree - 1

    X_list: list[list[float]] = []
    Y_list: list[float] = []

    countries = set(outcome_data.keys()) & set(emf_data.keys())

    for country in sorted(countries):
        out_years = set(outcome_data[country].keys())
        emf_years = set(emf_data[country].keys())
        years = sorted(out_years & emf_years)

        for year in years:
            min_emf_year = min(emf_years) if emf_years else year
            if year - max_lag < min_emf_year:
                continue

            spline_components = []
            for k in range(n_basis):
                wce_k = 0.0
                for lag in range(max_lag + 1):
                    basis_val = _bspline_basis(float(lag), k, knots, degree)
                    emf_val = emf_data[country].get(year - lag, 0.0)
                    wce_k += basis_val * emf_val
                spline_components.append(wce_k)

            X_list.append(spline_components)
            Y_list.append(outcome_data[country][year])

    if len(Y_list) < n_basis + 1:
        return {
            "error": f"Too few observations ({len(Y_list)}) for {n_basis} basis functions",
            "n_observations": len(Y_list),
            "n_countries": len(countries),
        }

    X = np.array(X_list)
    Y = np.array(Y_list)

    theta, residuals, rank, sv = np.linalg.lstsq(X, Y, rcond=None)

    lag_weights = np.zeros(max_lag + 1)
    for lag in range(max_lag + 1):
        for k in range(n_basis):
            lag_weights[lag] += theta[k] * _bspline_basis(
                float(lag), k, knots, degree
            )

    abs_sum = np.sum(np.abs(lag_weights))
    if abs_sum > 0:
        lag_weights_norm = lag_weights / abs_sum
    else:
        lag_weights_norm = lag_weights

    mean_lag = float(np.sum(np.arange(max_lag + 1) * np.abs(lag_weights_norm)))
    peak_lag = int(np.argmax(np.abs(lag_weights_norm)))

    Y_pred = X @ theta
    ss_res = float(np.sum((Y - Y_pred) ** 2))
    ss_tot = float(np.sum((Y - np.mean(Y)) ** 2))
    r_squared = 1.0 - ss_res / ss_tot if ss_tot > 0 else 0.0

    return {
        "lag_weights": lag_weights_norm.tolist(),
        "lag_weights_raw": lag_weights.tolist(),
        "mean_lag": round(mean_lag, 2),
        "peak_lag": peak_lag,
        "n_countries": len(countries),
        "n_observations": len(Y_list),
        "r_squared": round(r_squared, 4),
        "theta": theta.tolist(),
    }


# ─── Cross-species lag comparison ──────────────────────────────────

SPECIES_BIOLOGY = {
    "bees": {
        "description": "Bees (short lifecycle, high ambient exposure)",
        "generation_time_days": 42,
        "reproductive_cycle_days": 21,
        "expected_lag_years": 0.5,
    },
    "birds": {
        "description": "Birds (RPM/CRY, medium lifecycle)",
        "generation_time_days": 365,
        "reproductive_cycle_days": 180,
        "expected_lag_years": 2.0,
    },
    "human_sperm": {
        "description": "Human sperm (74d spermatogenesis)",
        "generation_time_days": 74,
        "reproductive_cycle_days": 74,
        "expected_lag_years": 0.5,
    },
    "human_tfr": {
        "description": "Human TFR (biology + behavior + decision)",
        "generation_time_days": 365 * 28,
        "reproductive_cycle_days": 365,
        "expected_lag_years": 4.0,
    },
}


def cross_species_lag_comparison(
    sentinel_data: dict[str, dict[str, dict[int, float]]],
    emf_data: dict[str, dict[int, float]],
) -> dict[str, Any]:
    """Compare lag-kernels across species.

    sentinel_data: {species_name: {country_iso3: {year: value}}}
    emf_data: {country_iso3: {year: emf_proxy}}

    Tests whether inter-species lag ordering matches biological prediction.
    """
    results: dict[str, Any] = {}

    for species, biology in SPECIES_BIOLOGY.items():
        if species not in sentinel_data:
            continue
        result = estimate_lag_kernel(sentinel_data[species], emf_data)
        results[species] = {
            **result,
            "description": biology["description"],
            "expected_lag": biology["expected_lag_years"],
        }

    if len(results) < 2:
        return {"error": "Need at least 2 species for comparison", "results": results}

    species_with_lags = [
        (s, r["mean_lag"], r.get("expected_lag", 0))
        for s, r in results.items()
        if "error" not in r
    ]
    species_with_lags.sort(key=lambda x: x[1])

    expected_order = ["bees", "human_sperm", "birds", "human_tfr"]
    actual_order = [s for s, _, _ in species_with_lags]

    from scipy.stats import spearmanr

    expected_ranks = []
    for s in actual_order:
        if s in expected_order:
            expected_ranks.append(expected_order.index(s))
        else:
            expected_ranks.append(len(expected_order))
    actual_ranks = list(range(len(actual_order)))

    if len(expected_ranks) >= 3:
        rho, p_value = spearmanr(expected_ranks, actual_ranks)
    else:
        rho, p_value = float("nan"), float("nan")

    return {
        "species_results": results,
        "lag_order": [(s, ml, el) for s, ml, el in species_with_lags],
        "spearman_rho": round(float(rho), 3) if not np.isnan(rho) else None,
        "spearman_p": round(float(p_value), 4) if not np.isnan(p_value) else None,
        "order_matches_biology": bool(rho > 0.8 and p_value < 0.05)
        if not np.isnan(rho)
        else None,
    }


# ─── Lag-invariance test ───────────────────────────────────────────

def lag_invariance_test(
    species: str,
    sentinel_data: dict[str, dict[int, float]],
    emf_data: dict[str, dict[int, float]],
    max_lag: int = 10,
) -> dict[str, Any]:
    """Test whether lag is constant across countries for one species.

    Estimates Δ_r for each country separately and tests:
    σ_Δ << μ_Δ (small dispersion relative to mean).

    CV < 0.3 → strong invariance
    CV 0.3-0.5 → moderate invariance
    CV > 0.5 → weak invariance
    """
    country_lags: dict[str, dict[str, Any]] = {}

    for iso3 in sorted(sentinel_data.keys()):
        if iso3 not in emf_data:
            continue

        sent_years = sorted(sentinel_data[iso3].keys())
        emf_years = sorted(emf_data[iso3].keys())
        common_years = sorted(set(sent_years) & set(emf_years))

        if len(common_years) < 8:
            continue

        sentinel_ts = np.array([sentinel_data[iso3][y] for y in common_years])
        emf_ts = np.array([emf_data[iso3][y] for y in common_years])

        best_lag = 0
        best_corr = 0.0
        for lag in range(0, min(max_lag + 1, len(common_years) - 4)):
            s = sentinel_ts[lag:]
            e = emf_ts[: len(s)]
            if len(s) < 5:
                continue
            corr_matrix = np.corrcoef(s, e)
            corr = corr_matrix[0, 1]
            if abs(corr) > abs(best_corr):
                best_corr = corr
                best_lag = lag

        country_lags[iso3] = {
            "best_lag": best_lag,
            "best_corr": round(float(best_corr), 3),
            "n_years": len(common_years),
        }

    if len(country_lags) < 3:
        return {
            "error": f"Too few countries ({len(country_lags)}) for invariance test",
            "species": species,
        }

    lags = np.array([v["best_lag"] for v in country_lags.values()])
    mu = float(np.mean(lags))
    sigma = float(np.std(lags))
    cv = sigma / mu if mu > 0 else float("inf")

    if cv < 0.3:
        assessment = "STRONG invariance (CV < 0.3)"
    elif cv < 0.5:
        assessment = "MODERATE invariance (CV 0.3-0.5)"
    else:
        assessment = "WEAK invariance (CV > 0.5)"

    return {
        "species": species,
        "country_lags": country_lags,
        "mu_lag": round(mu, 2),
        "sigma_lag": round(sigma, 2),
        "cv": round(cv, 3),
        "n_countries": len(country_lags),
        "assessment": assessment,
    }


# ─── Biological scaling law ───────────────────────────────────────

def test_biological_scaling(
    observed_lags: dict[str, float],
) -> dict[str, Any]:
    """Test whether lag scales with log(generation_time).

    L_s = α + β × log(generation_time_s) + ε

    If β > 0 and R² high, lag follows biological scaling law.
    """
    bio_data = []
    for species, biology in SPECIES_BIOLOGY.items():
        if species in observed_lags:
            bio_data.append(
                {
                    "species": species,
                    "log_gen_time": np.log(biology["generation_time_days"]),
                    "observed_lag": observed_lags[species],
                    "expected_lag": biology["expected_lag_years"],
                }
            )

    if len(bio_data) < 3:
        return {"error": f"Too few species ({len(bio_data)}) for scaling test"}

    x = np.array([d["log_gen_time"] for d in bio_data])
    y = np.array([d["observed_lag"] for d in bio_data])

    coeffs = np.polyfit(x, y, 1)
    slope, intercept = coeffs[0], coeffs[1]

    y_pred = slope * x + intercept
    ss_res = float(np.sum((y - y_pred) ** 2))
    ss_tot = float(np.sum((y - np.mean(y)) ** 2))
    r_squared = 1.0 - ss_res / ss_tot if ss_tot > 0 else 0.0

    return {
        "intercept": round(float(intercept), 3),
        "slope": round(float(slope), 3),
        "r_squared": round(r_squared, 4),
        "n_species": len(bio_data),
        "species_data": bio_data,
        "follows_scaling": r_squared > 0.7,
        "formula": f"L = {intercept:.2f} + {slope:.2f} × log(gen_time_days)",
    }


# ─── Latent common shock ──────────────────────────────────────────

def latent_common_shock(
    sentinel_panel: dict[str, dict[str, dict[int, float]]],
    emf_data: dict[str, dict[int, float]],
    tfr_data: dict[str, dict[int, float]],
) -> dict[str, Any]:
    """Extract latent common environmental shock H(r,t).

    Three competing models:
    M_C: Cultural — sentinels explained separately (no common H)
    M_E: Environmental — common H but no EMF assumption
    M_BERM: EMF — H = θ × EMF + u

    If M_E > M_C: common environmental factor is real
    If M_BERM > M_E: EMF explains it best
    """
    # Find countries present in all datasets
    all_countries = set()
    for species_data in sentinel_panel.values():
        if not all_countries:
            all_countries = set(species_data.keys())
        else:
            all_countries &= set(species_data.keys())
    all_countries &= set(emf_data.keys()) & set(tfr_data.keys())

    if len(all_countries) < 5:
        return {
            "error": f"Too few countries ({len(all_countries)}) with all sentinel + EMF + TFR data",
            "available_countries": sorted(all_countries),
        }

    # Build panel: for each (country, year), stack sentinel values
    species_list = sorted(sentinel_panel.keys())
    panel_rows: list[dict] = []

    for iso3 in sorted(all_countries):
        # Find common years across all sentinels for this country
        year_sets = [
            set(sentinel_panel[sp][iso3].keys())
            for sp in species_list
            if iso3 in sentinel_panel[sp]
        ]
        if not year_sets:
            continue
        common_years = sorted(set.intersection(*year_sets))

        # Also need EMF and TFR for these years
        common_years = [
            y
            for y in common_years
            if y in emf_data.get(iso3, {}) and y in tfr_data.get(iso3, {})
        ]

        for year in common_years:
            row = {"iso3": iso3, "year": year}
            for sp in species_list:
                row[sp] = sentinel_panel[sp][iso3][year]
            row["emf"] = emf_data[iso3][year]
            row["tfr"] = tfr_data[iso3][year]
            panel_rows.append(row)

    if len(panel_rows) < 10:
        return {
            "error": f"Too few panel observations ({len(panel_rows)})",
            "n_countries": len(all_countries),
        }

    # PCA on sentinel columns to extract H(r,t)
    sentinel_matrix = np.array(
        [[row[sp] for sp in species_list] for row in panel_rows]
    )

    # Standardize
    means = sentinel_matrix.mean(axis=0)
    stds = sentinel_matrix.std(axis=0)
    stds[stds == 0] = 1.0
    sentinel_std = (sentinel_matrix - means) / stds

    # PCA via SVD
    U, S, Vt = np.linalg.svd(sentinel_std, full_matrices=False)
    variance_explained = (S ** 2) / np.sum(S ** 2)

    # H = first principal component scores
    H = U[:, 0] * S[0]

    # Model comparison
    tfr_vec = np.array([row["tfr"] for row in panel_rows])
    emf_vec = np.array([row["emf"] for row in panel_rows])

    # M_C: TFR ~ 1 (intercept only, no biological shock)
    ss_tot_tfr = float(np.sum((tfr_vec - np.mean(tfr_vec)) ** 2))
    r2_mc = 0.0

    # M_E: TFR ~ H (common biological shock)
    X_me = np.column_stack([np.ones(len(H)), H])
    theta_me, _, _, _ = np.linalg.lstsq(X_me, tfr_vec, rcond=None)
    tfr_pred_me = X_me @ theta_me
    ss_res_me = float(np.sum((tfr_vec - tfr_pred_me) ** 2))
    r2_me = 1.0 - ss_res_me / ss_tot_tfr if ss_tot_tfr > 0 else 0.0

    # M_BERM: TFR ~ H + EMF
    X_mb = np.column_stack([np.ones(len(H)), H, emf_vec])
    theta_mb, _, _, _ = np.linalg.lstsq(X_mb, tfr_vec, rcond=None)
    tfr_pred_mb = X_mb @ theta_mb
    ss_res_mb = float(np.sum((tfr_vec - tfr_pred_mb) ** 2))
    r2_mb = 1.0 - ss_res_mb / ss_tot_tfr if ss_tot_tfr > 0 else 0.0

    # H ~ EMF correlation
    h_emf_corr = float(np.corrcoef(H, emf_vec)[0, 1])

    # BIC comparison (lower = better)
    n = len(tfr_vec)
    bic_mc = n * np.log(ss_tot_tfr / n) + 1 * np.log(n)
    bic_me = n * np.log(ss_res_me / n) + 2 * np.log(n) if ss_res_me > 0 else float("inf")
    bic_mb = n * np.log(ss_res_mb / n) + 3 * np.log(n) if ss_res_mb > 0 else float("inf")

    return {
        "n_countries": len(all_countries),
        "n_observations": len(panel_rows),
        "species_in_panel": species_list,
        "pca_variance_explained": [round(float(v), 4) for v in variance_explained[:3]],
        "first_pc_explains": round(float(variance_explained[0]), 4),
        "model_comparison": {
            "M_C_intercept_only": {"r2": round(r2_mc, 4), "bic": round(float(bic_mc), 1)},
            "M_E_common_shock": {"r2": round(r2_me, 4), "bic": round(float(bic_me), 1)},
            "M_BERM_emf_shock": {"r2": round(r2_mb, 4), "bic": round(float(bic_mb), 1)},
        },
        "H_emf_correlation": round(h_emf_corr, 4),
        "common_shock_real": r2_me > r2_mc + 0.05,
        "emf_explains_shock": r2_mb > r2_me + 0.02 and h_emf_corr < -0.3,
        "caveats": [
            "PCA extracts statistical, not causal, common factors",
            "Short overlapping time series limit power",
            "Multiple confounders affect all sentinel species independently",
            "EMF proxy (mobile subs) correlates with general development",
        ],
    }


# ─── Prospective test ─────────────────────────────────────────────

def prospective_sentinel_test(
    sentinel_data: dict[str, dict[int, float]],
    tfr_data: dict[str, dict[int, float]],
    emf_data: dict[str, dict[int, float]],
) -> dict[str, Any]:
    """Leave-one-country-out sentinel prediction.

    For each holdout country:
    1. Learn Δ (sentinel→TFR lag) from training countries
    2. Observe sentinel change in holdout
    3. Predict TFR change timing
    4. Compare to actual
    """
    common_countries = sorted(
        set(sentinel_data.keys()) & set(tfr_data.keys()) & set(emf_data.keys())
    )

    if len(common_countries) < 4:
        return {"error": f"Need ≥4 countries, have {len(common_countries)}"}

    # Estimate per-country lag: cross-correlation sentinel vs TFR
    country_lags: dict[str, int] = {}
    for iso3 in common_countries:
        sent_years = sorted(sentinel_data[iso3].keys())
        tfr_years = sorted(tfr_data[iso3].keys())
        common_years = sorted(set(sent_years) & set(tfr_years))
        if len(common_years) < 5:
            continue

        sent = np.array([sentinel_data[iso3][y] for y in common_years])
        tfr = np.array([tfr_data[iso3][y] for y in common_years])

        best_lag = 0
        best_corr = 0.0
        for lag in range(0, min(8, len(common_years) - 3)):
            s = sent[: len(sent) - lag] if lag > 0 else sent
            t = tfr[lag:]
            min_len = min(len(s), len(t))
            if min_len < 4:
                continue
            corr = float(np.corrcoef(s[:min_len], t[:min_len])[0, 1])
            if abs(corr) > abs(best_corr):
                best_corr = corr
                best_lag = lag

        country_lags[iso3] = best_lag

    if len(country_lags) < 4:
        return {"error": "Too few countries with sufficient data"}

    # Leave-one-out predictions
    predictions = []
    for holdout in sorted(country_lags.keys()):
        train_lags = [v for k, v in country_lags.items() if k != holdout]
        mu_delta = float(np.mean(train_lags))
        sigma_delta = float(np.std(train_lags))

        predicted_lag = mu_delta
        ci_low = mu_delta - 2 * sigma_delta
        ci_high = mu_delta + 2 * sigma_delta
        actual_lag = country_lags[holdout]
        hit = ci_low <= actual_lag <= ci_high

        predictions.append(
            {
                "holdout": holdout,
                "predicted_lag": round(predicted_lag, 1),
                "ci_95": (round(ci_low, 1), round(ci_high, 1)),
                "actual_lag": actual_lag,
                "hit": hit,
            }
        )

    hit_rate = sum(1 for p in predictions if p["hit"]) / len(predictions)

    return {
        "n_countries": len(country_lags),
        "predictions": predictions,
        "hit_rate": round(hit_rate, 3),
        "overall_mu_delta": round(float(np.mean(list(country_lags.values()))), 2),
        "overall_sigma_delta": round(
            float(np.std(list(country_lags.values()))), 2
        ),
    }


def generate_locked_prediction(
    training_countries: list[str],
    target_country: str,
    sentinel_change_year: int,
    mu_delta: float,
    sigma_delta: float,
) -> dict[str, Any]:
    """Generate a locked prediction for the Predictions page."""
    return {
        "prediction_type": "sentinel_cascade",
        "training_countries": training_countries,
        "target_country": target_country,
        "sentinel_change_year": sentinel_change_year,
        "predicted_tfr_change_year": round(sentinel_change_year + mu_delta, 1),
        "ci_95": (
            round(sentinel_change_year + mu_delta - 2 * sigma_delta, 1),
            round(sentinel_change_year + mu_delta + 2 * sigma_delta, 1),
        ),
        "locked_date": "2026-08-18",
        "model_version": "v18.0",
        "status": "LOCKED - awaiting verification",
    }


# ─── Diagnostic printer ───────────────────────────────────────────

def print_full_csli_diagnostic() -> None:
    """Run and print full CSLI diagnostic."""
    print("=" * 70)
    print("CROSS-SPECIES LAG INVARIANCE (CSLI) DIAGNOSTIC")
    print("=" * 70)
    print()

    # Load data
    print("Loading data...")
    bees = load_bee_data()
    birds = load_bird_data()
    sperm = load_sperm_data()
    emf = load_emf_data()
    tfr = load_tfr_data()
    print(f"  Bees: {len(bees)} countries")
    print(f"  Birds: {len(birds)} countries")
    print(f"  Sperm: {len(sperm)} countries")
    print(f"  EMF: {len(emf)} countries")
    print(f"  TFR: {len(tfr)} countries")
    print()

    # Cross-species lag comparison
    print("CROSS-SPECIES LAG COMPARISON")
    print("-" * 70)
    sentinel_panel = {
        "bees": bees,
        "birds": birds,
        "human_sperm": sperm,
        "human_tfr": tfr,
    }
    comparison = cross_species_lag_comparison(sentinel_panel, emf)

    if "error" not in comparison:
        print(f"{'Species':30s} {'Mean lag':>10s} {'Expected':>10s} {'N obs':>8s} {'R²':>8s}")
        print("-" * 70)
        for species, ml, el in comparison["lag_order"]:
            r = comparison["species_results"][species]
            n = r.get("n_observations", "?")
            r2 = r.get("r_squared", "?")
            print(f"  {species:28s} {ml:9.1f}y {el:9.1f}y {str(n):>7s} {str(r2):>7s}")
        print()
        print(f"  Spearman ρ = {comparison['spearman_rho']}, p = {comparison['spearman_p']}")
        if comparison["order_matches_biology"]:
            print("  -> Lag order matches biological prediction")
        else:
            print("  -> Lag order does NOT match biological prediction")
    else:
        print(f"  Error: {comparison['error']}")
    print()

    # Lag invariance for each species
    print("LAG INVARIANCE TESTS")
    print("-" * 70)
    for species_name, species_data in [
        ("bees", bees),
        ("birds", birds),
        ("human_sperm", sperm),
    ]:
        inv = lag_invariance_test(species_name, species_data, emf)
        if "error" not in inv:
            print(f"  {species_name}: μ={inv['mu_lag']:.1f}y, σ={inv['sigma_lag']:.1f}y, "
                  f"CV={inv['cv']:.3f} ({inv['n_countries']} countries)")
            print(f"    -> {inv['assessment']}")
        else:
            print(f"  {species_name}: {inv['error']}")
    print()

    # Biological scaling
    print("BIOLOGICAL SCALING LAW")
    print("-" * 70)
    if "error" not in comparison and comparison.get("species_results"):
        observed = {
            s: r["mean_lag"]
            for s, r in comparison["species_results"].items()
            if "error" not in r
        }
        scaling = test_biological_scaling(observed)
        if "error" not in scaling:
            print(f"  {scaling['formula']}")
            print(f"  R² = {scaling['r_squared']}")
            if scaling["follows_scaling"]:
                print("  -> Lag follows biological scaling law")
            else:
                print("  -> Lag does NOT follow biological scaling law")
        else:
            print(f"  {scaling['error']}")
    print()

    # Latent common shock
    print("LATENT COMMON SHOCK ANALYSIS")
    print("-" * 70)
    shock = latent_common_shock(sentinel_panel, emf, tfr)
    if "error" not in shock:
        print(f"  Panel: {shock['n_countries']} countries, {shock['n_observations']} obs")
        print(f"  PC1 explains {shock['first_pc_explains']:.1%} of sentinel variance")
        print(f"  H-EMF correlation: {shock['H_emf_correlation']:.3f}")
        print()
        print(f"  {'Model':25s} {'R²':>8s} {'BIC':>10s}")
        for name, vals in shock["model_comparison"].items():
            print(f"  {name:25s} {vals['r2']:7.4f} {vals['bic']:9.1f}")
        print()
        if shock["common_shock_real"]:
            print("  -> Common environmental shock IS real (M_E > M_C)")
        else:
            print("  -> Common environmental shock NOT confirmed")
        if shock["emf_explains_shock"]:
            print("  -> EMF explains the common shock (M_BERM > M_E)")
        else:
            print("  -> EMF does NOT clearly explain the common shock")
    else:
        print(f"  {shock['error']}")
    print()

    # Prospective test
    print("PROSPECTIVE SENTINEL TEST (Leave-one-country-out)")
    print("-" * 70)
    prosp = prospective_sentinel_test(bees, tfr, emf)
    if "error" not in prosp:
        print(f"  Countries: {prosp['n_countries']}")
        print(f"  Overall Δ: {prosp['overall_mu_delta']:.1f} ± {prosp['overall_sigma_delta']:.1f} years")
        print(f"  Hit rate: {prosp['hit_rate']:.1%}")
        print()
        for p in prosp["predictions"]:
            marker = "HIT" if p["hit"] else "MISS"
            print(f"  {p['holdout']:6s}: pred={p['predicted_lag']:.1f} "
                  f"({p['ci_95'][0]:.1f}-{p['ci_95'][1]:.1f}), "
                  f"actual={p['actual_lag']}, [{marker}]")
    else:
        print(f"  {prosp['error']}")
    print()

    print("CAVEATS")
    print("-" * 70)
    caveats = [
        "COLOSS data collected from publications, not verified against original databases",
        "Bee winter loss has major confounders: Varroa, neonicotinoids, climate, husbandry",
        "Cross-correlation ≠ causation; lag invariance is stronger but still not causal proof",
        "Sentinel data time series are short (most <20 years)",
        "Biological scaling law is a hypothesis, not a fact",
        "Prospective predictions require YEARS to verify (Δ ≈ 4yr → test in 2030)",
        "EMF proxy (mobile subs/100) correlates with general economic development",
    ]
    for c in caveats:
        print(f"  - {c}")
