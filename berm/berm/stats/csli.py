"""Cross-Species Lag Invariance (CSLI) statistical framework.

Tests whether the same local environmental shock produces a
biologically-ordered lag cascade across sentinel species:

    EMF change → Sentinel change → Human biomarker → Human fertility
         T_E          T_S              T_H               T_F

Golden signature: T_E < T_S < T_H < T_F and the inter-species
lags Δ_S and Δ_H are INVARIANT across regions.

This module is a narrow, direct numerical diagnostic — results are reported
transparently regardless of whether they support or refute the hypothesis.
Its readiness status does not decide whether a source remains active in the
wider BERM evidence ledger for topology, direction, lag, transfer or
posterior-predictive signatures.
"""

from __future__ import annotations

import json
from pathlib import Path
from typing import Any

import numpy as np

from berm.stats.csli_readiness import (
    CSLIInput,
    blocked_result,
    current_source_blocked_result,
    unpack_input,
    validate_pair_contract,
)

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
        series = {}
        for k, v in values.items():
            if v is None:
                continue
            if isinstance(v, dict):
                loss = v.get("loss_pct")
                if loss is None:
                    continue
                year = _parse_winter_year(k)
                series[year] = float(loss)
            elif isinstance(v, (int, float)):
                year = _parse_winter_year(k)
                series[year] = float(v)
        if series:
            result[country] = series
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

def _estimate_lag_kernel_unchecked(
    outcome_data: dict[str, dict[int, float]],
    emf_data: dict[str, dict[int, float]],
    max_lag: int = 15,
    n_spline_knots: int = 5,
) -> dict[str, Any]:
    """Internal numerical kernel estimator after readiness validation.

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
            required_exposure_years = set(range(year - max_lag, year + 1))
            if not required_exposure_years.issubset(emf_years):
                continue

            spline_components = []
            for k in range(n_basis):
                wce_k = 0.0
                for lag in range(max_lag + 1):
                    basis_val = _bspline_basis(float(lag), k, knots, degree)
                    # This function is deliberately reached only after a
                    # complete calendar-year lag window was verified.  Never
                    # turn an unavailable exposure into a zero exposure.
                    emf_val = emf_data[country][year - lag]
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


def _unpack_pair_inputs(
    outcome_data: CSLIInput | dict[str, dict[int, float]],
    exposure_data: CSLIInput | dict[str, dict[int, float]],
    readiness: dict[str, Any] | None,
) -> tuple[dict[str, dict[int, float]], dict[str, dict[int, float]], dict[str, Any] | None]:
    """Extract values and one analysis-level readiness contract.

    ``CSLIInput`` may carry the full pair-level contract.  Passing bare
    mappings remains supported only to return a structured ineligibility
    result; it cannot enable calculation.
    """

    outcome_values, outcome_contract = unpack_input(outcome_data)
    exposure_values, exposure_contract = unpack_input(exposure_data)
    if readiness is None:
        readiness = dict(outcome_contract or exposure_contract) if (outcome_contract or exposure_contract) else None
    elif outcome_contract is not None or exposure_contract is not None:
        raise ValueError("Pass readiness either in CSLIInput or as readiness=, not both")
    return dict(outcome_values), dict(exposure_values), readiness


def estimate_lag_kernel(
    outcome_data: CSLIInput | dict[str, dict[int, float]],
    emf_data: CSLIInput | dict[str, dict[int, float]],
    max_lag: int = 15,
    n_spline_knots: int = 5,
    *,
    readiness: dict[str, Any] | None = None,
) -> dict[str, Any]:
    """Public, fail-closed lag-kernel entry point.

    The caller must supply a ``csli-readiness/v1`` contract that verifies the
    outcome endpoint, exact geography, measured RF exposure, annual calendar
    coverage and required covariates.  This is the v1 criterion for a direct
    CSLI statistic, not a requirement for FieldState-aware discovery or
    mobility/catchment-aware transfer inference elsewhere in BERM.  Current
    repository sentinel inputs do not meet that direct-CSLI contract and
    return ``NOT_ELIGIBLE`` without numeric lag results.
    """

    outcomes, exposure, readiness = _unpack_pair_inputs(outcome_data, emf_data, readiness)
    blocked = validate_pair_contract(
        outcomes,
        exposure,
        readiness,
        max_lag=max_lag,
        analysis="lag_kernel",
    )
    if blocked is not None:
        return blocked
    result = _estimate_lag_kernel_unchecked(outcomes, exposure, max_lag, n_spline_knots)
    # A contract can pass the structural checks yet have too little data for a
    # fitted spline.  Preserve the fail-closed public envelope in that case.
    if "error" in result:
        return blocked_result(
            "lag_kernel",
            [{"code": "INSUFFICIENT_ELIGIBLE_ROWS", "message": result["error"]}],
            readiness={"max_lag_years": max_lag},
            status="BLOCKED",
        )
    return {"status": "ELIGIBLE", "analysis": "lag_kernel", **result}


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


def _cross_species_lag_comparison_unchecked(
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
        result = _estimate_lag_kernel_unchecked(sentinel_data[species], emf_data)
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


def cross_species_lag_comparison(
    sentinel_data: dict[str, CSLIInput | dict[str, dict[int, float]]],
    emf_data: CSLIInput | dict[str, dict[int, float]],
    *,
    readiness_by_species: dict[str, dict[str, Any]] | None = None,
    cross_species_contract: dict[str, Any] | None = None,
) -> dict[str, Any]:
    """Public, fail-closed cross-species comparison.

    A ranked cascade has stronger requirements than a single association: each
    species needs an eligible pair contract *and* the comparison needs a
    verified shared geography/time shock, endpoint orientation, and a locked
    ordering rule.  The legacy collections do not satisfy these requirements.
    """

    if readiness_by_species is None:
        return blocked_result(
            "cross_species_lag_comparison",
            [{
                "code": "INPUT_METADATA_REQUIRED",
                "message": "Each species needs a verified CSLI pair contract before cross-species lag comparison.",
            }],
        )
    if not isinstance(cross_species_contract, dict) or not all(
        cross_species_contract.get(key) is True
        for key in ("verified_shared_geography_time", "endpoint_orientation_verified", "ordering_rule_locked")
    ):
        return blocked_result(
            "cross_species_lag_comparison",
            [{
                "code": "CROSS_SPECIES_ALIGNMENT_UNVERIFIED",
                "message": "A cascade requires verified shared geography/time, endpoint orientation, and a pre-specified ordering rule.",
            }],
        )

    exposure_values, exposure_contract = unpack_input(emf_data)
    blocked_reasons: list[dict[str, Any]] = []
    eligible_panel: dict[str, dict[str, dict[int, float]]] = {}
    for species, outcome_input in sentinel_data.items():
        outcome_values, embedded_contract = unpack_input(outcome_input)
        contract = readiness_by_species.get(species)
        if contract is None and embedded_contract is not None:
            contract = dict(embedded_contract)
        if contract is None and exposure_contract is not None:
            contract = dict(exposure_contract)
        gate = validate_pair_contract(
            outcome_values,
            exposure_values,
            contract,
            max_lag=15,
            analysis=f"cross_species_lag_comparison:{species}",
        )
        if gate is not None:
            blocked_reasons.extend(gate["reasons"])
        else:
            eligible_panel[species] = dict(outcome_values)
    if blocked_reasons:
        return blocked_result("cross_species_lag_comparison", blocked_reasons)

    result = _cross_species_lag_comparison_unchecked(eligible_panel, dict(exposure_values))
    if "error" in result:
        return blocked_result(
            "cross_species_lag_comparison",
            [{"code": "INSUFFICIENT_ELIGIBLE_SPECIES", "message": result["error"]}],
            status="BLOCKED",
        )
    return {"status": "ELIGIBLE", "analysis": "cross_species_lag_comparison", **result}


# ─── Lag-invariance test ───────────────────────────────────────────

def _lag_invariance_unchecked(
    species: str,
    sentinel_data: dict[str, dict[int, float]],
    emf_data: dict[str, dict[int, float]],
    max_lag: int = 10,
) -> dict[str, Any]:
    """Internal annual-calendar implementation after readiness validation.

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
        if len(sent_years) < 5:
            continue

        best_lag = 0
        best_corr = 0.0
        best_n_pairs = 0
        for lag in range(max_lag + 1):
            pairs = [
                (sentinel_data[iso3][year], emf_data[iso3][year - lag])
                for year in sent_years
                if year - lag in emf_data[iso3]
            ]
            if len(pairs) < 5:
                continue
            s = np.array([pair[0] for pair in pairs])
            e = np.array([pair[1] for pair in pairs])
            corr_matrix = np.corrcoef(s, e)
            corr = corr_matrix[0, 1]
            if abs(corr) > abs(best_corr):
                best_corr = corr
                best_lag = lag
                best_n_pairs = len(pairs)

        country_lags[iso3] = {
            "best_lag": best_lag,
            "best_corr": round(float(best_corr), 3),
            "n_years": best_n_pairs,
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


def lag_invariance_test(
    species: str,
    sentinel_data: CSLIInput | dict[str, dict[int, float]],
    emf_data: CSLIInput | dict[str, dict[int, float]],
    max_lag: int = 10,
    *,
    readiness: dict[str, Any] | None = None,
) -> dict[str, Any]:
    """Public, fail-closed country-lag invariance diagnostic.

    The numerical routine aligns each pair by its actual calendar year, never
    by its position in a sparse observation array.  It is unavailable unless
    the input contract verifies annual, exact-geography data.
    """

    outcomes, exposure, readiness = _unpack_pair_inputs(sentinel_data, emf_data, readiness)
    blocked = validate_pair_contract(
        outcomes,
        exposure,
        readiness,
        max_lag=max_lag,
        analysis="lag_invariance",
    )
    if blocked is not None:
        return blocked
    result = _lag_invariance_unchecked(species, outcomes, exposure, max_lag)
    if "error" in result:
        return blocked_result(
            "lag_invariance",
            [{"code": "INSUFFICIENT_ELIGIBLE_COUNTRIES", "message": result["error"]}],
            status="BLOCKED",
        )
    return {"status": "ELIGIBLE", "analysis": "lag_invariance", **result}


# ─── Biological scaling law ───────────────────────────────────────

def _test_biological_scaling_unchecked(
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


def test_biological_scaling(
    observed_lags: dict[str, float],
    *,
    readiness: dict[str, Any] | None = None,
) -> dict[str, Any]:
    """Public fail-closed scaling check for independently validated lags.

    A regression over model-derived lag point estimates is not evidence of a
    biological scaling law.  Only a versioned set of externally validated lag
    estimates, with uncertainty and a pre-specified direction, may reach the
    internal numerical routine.
    """

    if not isinstance(readiness, dict) or not all(
        readiness.get(key) is True
        for key in ("lag_estimates_independently_validated", "uncertainty_available", "direction_pre_specified")
    ):
        return blocked_result(
            "biological_scaling",
            [{
                "code": "VALIDATED_LAG_ESTIMATES_REQUIRED",
                "message": "Biological scaling requires independently validated lag estimates with uncertainty and a pre-specified directional hypothesis.",
            }],
        )
    result = _test_biological_scaling_unchecked(observed_lags)
    if "error" in result:
        return blocked_result(
            "biological_scaling",
            [{"code": "INSUFFICIENT_ELIGIBLE_SPECIES", "message": result["error"]}],
            status="BLOCKED",
        )
    if result["slope"] <= 0:
        return blocked_result(
            "biological_scaling",
            [{
                "code": "SCALING_DIRECTION_INCONSISTENT",
                "message": "The fitted slope is not in the pre-specified positive direction; no biological scaling result is reported.",
            }],
            status="BLOCKED",
        )
    return {"status": "ELIGIBLE", "analysis": "biological_scaling", **result}


# ─── Latent common shock ──────────────────────────────────────────

def _latent_common_shock_unchecked(
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


def latent_common_shock(
    sentinel_panel: dict[str, dict[str, dict[int, float]]],
    emf_data: dict[str, dict[int, float]],
    tfr_data: dict[str, dict[int, float]],
    *,
    readiness: dict[str, Any] | None = None,
) -> dict[str, Any]:
    """Retired public PCA shortcut for a latent common-shock claim.

    The previous routine pooled sparse, heterogeneous observations and compared
    an intercept-only model with models containing a PCA score.  That is not a
    cultural or causal comparison, and cannot safely be converted into a
    public result by adding a few flags.  Keep the numerical implementation
    above private for method development only; a future public implementation
    must use a preregistered dynamic panel with country/time effects, matched
    measured exposure and covariates, and held-out scoring.
    """

    del sentinel_panel, emf_data, tfr_data, readiness
    return blocked_result(
        "latent_common_shock",
        [{
            "code": "LEGACY_LATENT_SHOCK_METHOD_RETIRED",
            "message": "The legacy PCA/intercept comparison is not an eligible causal or common-shock test. A verified dynamic-panel protocol is required.",
        }],
        status="BLOCKED",
    )


# ─── Prospective test ─────────────────────────────────────────────

def _prospective_sentinel_test_unchecked(
    sentinel_data: dict[str, dict[int, float]],
    tfr_data: dict[str, dict[int, float]],
    emf_data: dict[str, dict[int, float]],
) -> dict[str, Any]:
    """Legacy numerical routine retained for internal method comparison only.

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


def prospective_sentinel_test(
    sentinel_data: CSLIInput | dict[str, dict[int, float]],
    tfr_data: CSLIInput | dict[str, dict[int, float]],
    emf_data: CSLIInput | dict[str, dict[int, float]],
    *,
    readiness: dict[str, Any] | None = None,
) -> dict[str, Any]:
    """Retire the legacy leave-country-out lag routine from public use.

    It previously estimated each holdout country's ``actual_lag`` from its
    complete observed series, used no temporal holdout, and reported
    ``mean ± 2σ`` as a 95% interval.  It also only filtered on ``emf_data``
    without using it in the calculation.  This is not a prospective test.
    """

    del sentinel_data, tfr_data, emf_data, readiness
    return blocked_result(
        "prospective_sentinel_test",
        [{
            "code": "LEGACY_PROSPECTIVE_METHOD_RETIRED",
            "message": "The legacy country-holdout lag routine is not prospective and cannot produce a hit rate or confidence interval. A frozen temporal protocol is required.",
        }],
        status="BLOCKED",
    )


def generate_locked_prediction(
    training_countries: list[str],
    target_country: str,
    sentinel_change_year: int,
    mu_delta: float,
    sigma_delta: float,
) -> dict[str, Any]:
    """Disable legacy CSLI prediction locks until an eligible protocol exists."""

    del training_countries, target_country, sentinel_change_year, mu_delta, sigma_delta
    return blocked_result(
        "locked_sentinel_prediction",
        [{
            "code": "LOCKED_PREDICTION_DISABLED",
            "message": "Current CSLI sources and the retired lag method cannot support a locked prediction. Require a versioned eligible input artifact and a frozen temporal validation protocol.",
        }],
        status="BLOCKED",
    )


# ─── Public readiness artifact ─────────────────────────────────────

def current_csli_readiness() -> dict[str, Any]:
    """Return a non-numeric readiness report for the current source snapshot."""

    return current_source_blocked_result("current_csli_diagnostic")


def export_current_csli_readiness(path: str | Path) -> dict[str, Any]:
    """Write the safe replacement artifact at an explicitly requested path.

    The function never overwrites a path implicitly.  Its result intentionally
    contains no lag, correlation, hit-rate, interval, PCA, or model-score
    fields, so downstream renderers cannot mistake direct-CSLI readiness for a
    numeric result.  The artifact explicitly preserves the distinction between
    this narrow readiness status and the source's wider evidence role.
    """

    artifact = current_csli_readiness()
    target = Path(path)
    target.parent.mkdir(parents=True, exist_ok=True)
    target.write_text(json.dumps(artifact, indent=2, sort_keys=True) + "\n")
    return artifact


def print_full_csli_diagnostic() -> dict[str, Any]:
    """Print the current direct-CSLI readiness gate; numerical diagnostics are retired."""

    result = current_csli_readiness()
    print("=" * 70)
    print("CSLI DIRECT DIAGNOSTIC: BLOCKED PENDING ELIGIBLE SENTINEL PANEL")
    print("=" * 70)
    for reason in result["reasons"]:
        print(f"  - [{reason['code']}] {reason['message']}")
    print(
        "No lag, correlation, confidence interval, LOOCV, or locked prediction "
        "is reported for the direct-CSLI statistic."
    )
    return result


def main(argv: list[str] | None = None) -> int:
    """Emit only the fail-closed readiness artifact for the current sources."""

    import argparse

    parser = argparse.ArgumentParser(description="CSLI readiness gate")
    parser.add_argument(
        "--export-readiness",
        type=Path,
        help="Explicit output path for the non-numeric CSLI readiness JSON artifact.",
    )
    args = parser.parse_args(argv)
    if args.export_readiness:
        export_current_csli_readiness(args.export_readiness)
    else:
        print_full_csli_diagnostic()
    return 0


if __name__ == "__main__":  # pragma: no cover - command-line wrapper
    raise SystemExit(main())
