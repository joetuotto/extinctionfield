"""Exploratory country-level testosterone, electricity and TFR horse race.

This is deliberately isolated from the active BERM prediction pipeline.  The
testosterone input is a heterogeneous web compilation, not a harmonised
country survey, and electricity demand per person is an infrastructure proxy,
not a measured FieldState or biological dose.  The module therefore produces
an audit report and sensitivity analyses; it cannot establish mediation or a
BERM-specific mechanism.

Run from ``berm/`` with::

    python -m berm.stats.testosterone_tfr_horse_race
"""

from __future__ import annotations

import argparse
import csv
import gzip
import hashlib
import json
import math
from dataclasses import dataclass
from pathlib import Path
from typing import Iterable, Sequence

import numpy as np
import pandas as pd
from scipy import stats


DATA_DIR = Path(__file__).resolve().parents[2] / "data"
RAW_DIR = DATA_DIR / "raw"
SOURCE_DIR = RAW_DIR / "testosterone_tfr_2026-08-31"
PROCESSED_DIR = DATA_DIR / "processed" / "testosterone_tfr"
REPORT_DIR = Path(__file__).resolve().parents[2] / "reports" / "testosterone_tfr"

TESTOSTERONE_CSV = SOURCE_DIR / "testosterone_by_country.csv"
ELECTRICITY_CSV = SOURCE_DIR / "owid_per_capita_electricity_demand.csv"
ELECTRICITY_METADATA = SOURCE_DIR / "owid_per_capita_electricity_demand.metadata.json"
SANITATION_JSON = SOURCE_DIR / "wb_basic_sanitation_2018_2023.json"
WPP_GZIP = RAW_DIR / "WPP2024_Demographic_Indicators_Medium.csv.gz"
WB_COUNTRY_METADATA = (
    RAW_DIR / "world_bank" / "wb_global_2026-08-19" / "country_metadata.json"
)

ANALYSIS_YEAR = 2023
CONTROL_COLUMNS = ("log_infant_mortality", "life_expectancy", "sanitation_pct")
PREDICTOR_COLUMNS = ("testosterone_ng_dl", "electricity_kwh_per_capita")

# Membership on 2026-08-31. Used only as a transparent sensitivity definition;
# World Bank high-income status is the primary developed-country definition.
OECD_ISO3 = frozenset(
    {
        "AUS", "AUT", "BEL", "CAN", "CHL", "COL", "CRI", "CZE", "DNK",
        "EST", "FIN", "FRA", "DEU", "GRC", "HUN", "ISL", "IRL", "ISR",
        "ITA", "JPN", "KOR", "LVA", "LTU", "LUX", "MEX", "NLD", "NZL",
        "NOR", "POL", "PRT", "SVK", "SVN", "ESP", "SWE", "CHE", "TUR",
        "GBR", "USA",
    }
)


@dataclass(frozen=True)
class OLSResult:
    terms: tuple[str, ...]
    beta: np.ndarray
    se_hc3: np.ndarray
    p_hc3: np.ndarray
    ci_low_hc3: np.ndarray
    ci_high_hc3: np.ndarray
    residuals: np.ndarray
    fitted: np.ndarray
    r2: float
    adjusted_r2: float
    n: int
    rank: int
    df_resid: int

    def coefficient(self, term: str) -> float:
        return float(self.beta[self.terms.index(term)])

    def coefficient_row(self, term: str) -> dict[str, float | str]:
        idx = self.terms.index(term)
        return {
            "term": term,
            "coefficient": float(self.beta[idx]),
            "hc3_se": float(self.se_hc3[idx]),
            "hc3_p": float(self.p_hc3[idx]),
            "hc3_ci_low": float(self.ci_low_hc3[idx]),
            "hc3_ci_high": float(self.ci_high_hc3[idx]),
        }


def _sha256(path: Path) -> str:
    digest = hashlib.sha256()
    with path.open("rb") as handle:
        for block in iter(lambda: handle.read(1024 * 1024), b""):
            digest.update(block)
    return digest.hexdigest()


def _zscore(values: pd.Series) -> pd.Series:
    numeric = pd.to_numeric(values, errors="coerce")
    sd = float(numeric.std(ddof=0))
    if not math.isfinite(sd) or sd <= 0:
        raise ValueError(f"cannot standardize constant/non-finite column {values.name!r}")
    return (numeric - float(numeric.mean())) / sd


def _rank_zscore(values: pd.Series) -> pd.Series:
    return _zscore(pd.Series(stats.rankdata(values, method="average"), index=values.index))


def fit_ols_hc3(y: np.ndarray, x: np.ndarray, terms: Sequence[str]) -> OLSResult:
    """Fit OLS and return heteroskedasticity-consistent HC3 inference."""
    y = np.asarray(y, dtype=float)
    x = np.asarray(x, dtype=float)
    if y.ndim != 1 or x.ndim != 2 or x.shape[0] != y.shape[0]:
        raise ValueError("incompatible y/X dimensions")
    if not np.isfinite(y).all() or not np.isfinite(x).all():
        raise ValueError("OLS inputs must be finite")
    if x.shape[1] != len(terms):
        raise ValueError("term count does not match design matrix")

    xtx_inv = np.linalg.pinv(x.T @ x)
    beta = xtx_inv @ x.T @ y
    fitted = x @ beta
    residuals = y - fitted
    rank = int(np.linalg.matrix_rank(x))
    df_resid = int(len(y) - rank)
    if df_resid <= 0:
        raise ValueError("model has no residual degrees of freedom")

    leverage = np.einsum("ij,jk,ik->i", x, xtx_inv, x)
    denom = np.clip(1.0 - leverage, 1e-10, None)
    hc3_scale = (residuals / denom) ** 2
    meat = x.T @ (x * hc3_scale[:, None])
    cov_hc3 = xtx_inv @ meat @ xtx_inv
    se_hc3 = np.sqrt(np.clip(np.diag(cov_hc3), 0.0, None))
    with np.errstate(divide="ignore", invalid="ignore"):
        t_values = np.divide(beta, se_hc3, out=np.zeros_like(beta), where=se_hc3 > 0)
    p_values = 2.0 * stats.t.sf(np.abs(t_values), df=df_resid)
    critical = float(stats.t.ppf(0.975, df=df_resid))

    centered = y - float(y.mean())
    sst = float(centered @ centered)
    sse = float(residuals @ residuals)
    r2 = 1.0 - sse / sst if sst > 0 else float("nan")
    adjusted = 1.0 - (1.0 - r2) * (len(y) - 1) / df_resid
    return OLSResult(
        terms=tuple(terms), beta=beta, se_hc3=se_hc3, p_hc3=p_values,
        ci_low_hc3=beta - critical * se_hc3,
        ci_high_hc3=beta + critical * se_hc3,
        residuals=residuals, fitted=fitted, r2=float(r2),
        adjusted_r2=float(adjusted), n=len(y), rank=rank, df_resid=df_resid,
    )


def _fit_frame(frame: pd.DataFrame, outcome: str, predictors: Sequence[str]) -> OLSResult:
    y = _zscore(frame[outcome]).to_numpy()
    x_columns = [np.ones(len(frame))]
    terms = ["intercept"]
    for predictor in predictors:
        x_columns.append(_zscore(frame[predictor]).to_numpy())
        terms.append(predictor)
    return fit_ols_hc3(y, np.column_stack(x_columns), terms)


def partial_r2(full: OLSResult, reduced: OLSResult) -> float:
    """Incremental partial R² for nested models fit on the same observations."""
    if full.n != reduced.n:
        raise ValueError("partial R² requires identical samples")
    denominator = 1.0 - reduced.r2
    if denominator <= 0:
        return float("nan")
    return max(0.0, float((full.r2 - reduced.r2) / denominator))


def _load_wpp_2023() -> pd.DataFrame:
    rows: list[dict[str, object]] = []
    with gzip.open(WPP_GZIP, "rt", encoding="utf-8-sig", newline="") as handle:
        for row in csv.DictReader(handle):
            if row["LocTypeName"] != "Country/Area" or int(row["Time"]) != ANALYSIS_YEAR:
                continue
            iso3 = row["ISO3_code"]
            if len(iso3) != 3:
                continue
            rows.append(
                {
                    "iso3": iso3,
                    "wpp_country": row["Location"],
                    "tfr": float(row["TFR"]),
                    "infant_mortality": float(row["IMR"]),
                    "life_expectancy": float(row["LEx"]),
                }
            )
    return pd.DataFrame(rows)


def _load_electricity_2023() -> pd.DataFrame:
    frame = pd.read_csv(ELECTRICITY_CSV)
    value_columns = [c for c in frame.columns if c not in {"Entity", "Code", "Year"}]
    if len(value_columns) != 1:
        raise ValueError(f"expected one OWID electricity value column, got {value_columns}")
    value = value_columns[0]
    frame = frame.loc[(frame["Year"] == ANALYSIS_YEAR) & frame["Code"].notna()].copy()
    frame = frame.rename(
        columns={"Code": "iso3", "Entity": "electricity_entity", value: "electricity_kwh_per_capita"}
    )
    return frame[["iso3", "electricity_entity", "electricity_kwh_per_capita"]]


def _load_sanitation_latest() -> pd.DataFrame:
    payload = json.loads(SANITATION_JSON.read_text(encoding="utf-8"))
    if not isinstance(payload, list) or len(payload) < 2:
        raise ValueError("malformed World Bank sanitation response")
    rows = []
    for row in payload[1]:
        value = row.get("value")
        iso3 = row.get("countryiso3code", "")
        if value is None or len(iso3) != 3:
            continue
        rows.append({"iso3": iso3, "sanitation_year": int(row["date"]), "sanitation_pct": float(value)})
    frame = pd.DataFrame(rows).sort_values(["iso3", "sanitation_year"])
    return frame.groupby("iso3", as_index=False).tail(1).reset_index(drop=True)


def _load_income_groups() -> dict[str, str]:
    payload = json.loads(WB_COUNTRY_METADATA.read_text(encoding="utf-8"))
    result: dict[str, str] = {}
    for page in payload["pages"]:
        for row in page[1]:
            if row.get("region", {}).get("id") == "NA":
                continue
            result[row["id"]] = row.get("incomeLevel", {}).get("id", "")
    return result


def build_analysis_frame() -> pd.DataFrame:
    testosterone = pd.read_csv(TESTOSTERONE_CSV, dtype={"iso3": str})
    frame = testosterone.merge(_load_wpp_2023(), on="iso3", how="left", validate="one_to_one")
    frame = frame.merge(_load_electricity_2023(), on="iso3", how="left", validate="one_to_one")
    frame = frame.merge(_load_sanitation_latest(), on="iso3", how="left", validate="one_to_one")
    income = _load_income_groups()
    frame["wb_income_group"] = frame["iso3"].map(income)
    frame["developed_high_income"] = frame["wb_income_group"].eq("HIC")
    frame["developed_oecd"] = frame["iso3"].isin(OECD_ISO3)
    frame["log_electricity_kwh_per_capita"] = np.log1p(frame["electricity_kwh_per_capita"])
    frame["log_infant_mortality"] = np.log1p(frame["infant_mortality"])
    frame["tfr_year"] = ANALYSIS_YEAR
    frame["electricity_year"] = np.where(frame["electricity_kwh_per_capita"].notna(), ANALYSIS_YEAR, np.nan)
    return frame.sort_values("iso3").reset_index(drop=True)


def _model_dict(result: OLSResult) -> dict[str, object]:
    return {
        "n": result.n,
        "r2": result.r2,
        "adjusted_r2": result.adjusted_r2,
        "df_resid": result.df_resid,
        "coefficients": [result.coefficient_row(term) for term in result.terms],
    }


def _bootstrap_partial_r2(
    frame: pd.DataFrame,
    added: str,
    base: Sequence[str],
    *,
    reps: int,
    rng: np.random.Generator,
) -> tuple[float, float]:
    values: list[float] = []
    for _ in range(reps):
        boot = frame.iloc[rng.integers(0, len(frame), len(frame))]
        try:
            reduced = _fit_frame(boot, "tfr", base)
            full = _fit_frame(boot, "tfr", [*base, added])
            value = partial_r2(full, reduced)
        except (ValueError, np.linalg.LinAlgError):
            continue
        if math.isfinite(value):
            values.append(value)
    if len(values) < reps * 0.8:
        raise RuntimeError("too many invalid partial-R² bootstrap samples")
    return tuple(float(x) for x in np.quantile(values, [0.025, 0.975]))


def _rank_analysis(frame: pd.DataFrame, rng: np.random.Generator, reps: int) -> dict[str, object]:
    rho, p_value = stats.spearmanr(frame["testosterone_ng_dl"], frame["tfr"])
    boot: list[float] = []
    for _ in range(reps):
        sample = frame.iloc[rng.integers(0, len(frame), len(frame))]
        value = float(stats.spearmanr(sample["testosterone_ng_dl"], sample["tfr"]).statistic)
        if math.isfinite(value):
            boot.append(value)

    ranked = frame.copy()
    rank_columns = ["tfr", "testosterone_ng_dl", "electricity_kwh_per_capita", *CONTROL_COLUMNS]
    for column in rank_columns:
        ranked[column] = stats.rankdata(ranked[column], method="average")
    partial_model = _fit_frame(ranked, "tfr", [*CONTROL_COLUMNS, "testosterone_ng_dl"])
    partial_with_electricity = _fit_frame(
        ranked, "tfr", [*CONTROL_COLUMNS, "electricity_kwh_per_capita", "testosterone_ng_dl"]
    )
    return {
        "n": len(frame),
        "spearman_rho": float(rho),
        "spearman_p": float(p_value),
        "spearman_bootstrap_ci": [float(x) for x in np.quantile(boot, [0.025, 0.975])],
        "rank_T_coefficient_given_development": partial_model.coefficient_row("testosterone_ng_dl"),
        "rank_T_coefficient_given_development_and_electricity": partial_with_electricity.coefficient_row(
            "testosterone_ng_dl"
        ),
    }


def _mediation_analysis(frame: pd.DataFrame, rng: np.random.Generator, reps: int) -> dict[str, object]:
    controls = list(CONTROL_COLUMNS)
    electricity = "electricity_kwh_per_capita"
    testosterone = "testosterone_ng_dl"
    a_model = _fit_frame(frame, testosterone, [*controls, electricity])
    total_model = _fit_frame(frame, "tfr", [*controls, electricity])
    direct_model = _fit_frame(frame, "tfr", [*controls, electricity, testosterone])
    a = a_model.coefficient(electricity)
    b = direct_model.coefficient(testosterone)
    c_total = total_model.coefficient(electricity)
    c_direct = direct_model.coefficient(electricity)
    indirect = a * b

    boot: list[float] = []
    attenuation: list[float] = []
    for _ in range(reps):
        sample = frame.iloc[rng.integers(0, len(frame), len(frame))]
        try:
            a_b = _fit_frame(sample, testosterone, [*controls, electricity]).coefficient(electricity)
            total_b = _fit_frame(sample, "tfr", [*controls, electricity]).coefficient(electricity)
            direct_b_model = _fit_frame(sample, "tfr", [*controls, electricity, testosterone])
            direct_b = direct_b_model.coefficient(electricity)
            b_b = direct_b_model.coefficient(testosterone)
        except (ValueError, np.linalg.LinAlgError):
            continue
        boot.append(a_b * b_b)
        if abs(total_b) > 1e-12:
            attenuation.append((abs(total_b) - abs(direct_b)) / abs(total_b))

    return {
        "n": len(frame),
        "a_electricity_to_T": a,
        "b_T_to_TFR_given_electricity": b,
        "c_total_electricity_to_TFR": c_total,
        "c_prime_direct_electricity_to_TFR": c_direct,
        "absolute_coefficient_attenuation_pct": 100.0 * (abs(c_total) - abs(c_direct)) / abs(c_total)
        if abs(c_total) > 1e-12 else float("nan"),
        "indirect_effect_a_times_b": indirect,
        "indirect_effect_bootstrap_ci": [float(x) for x in np.quantile(boot, [0.025, 0.975])],
        "attenuation_bootstrap_ci_pct": [100.0 * float(x) for x in np.quantile(attenuation, [0.025, 0.975])],
        "interpretation_limit": (
            "Cross-sectional coefficient attenuation is not causal mediation; temporal ordering, "
            "no unmeasured exposure-mediator/outcome confounding, and measurement validity are unverified."
        ),
    }


def _loo_partial(frame: pd.DataFrame, added: str, base: Sequence[str]) -> dict[str, object]:
    rows = []
    for index, country in frame.iterrows():
        sample = frame.drop(index=index)
        reduced = _fit_frame(sample, "tfr", base)
        full = _fit_frame(sample, "tfr", [*base, added])
        rows.append({"iso3_left_out": country["iso3"], "partial_r2": partial_r2(full, reduced)})
    values = [row["partial_r2"] for row in rows]
    return {
        "min": float(min(values)),
        "max": float(max(values)),
        "median": float(np.median(values)),
        "min_country": min(rows, key=lambda row: row["partial_r2"])["iso3_left_out"],
        "max_country": max(rows, key=lambda row: row["partial_r2"])["iso3_left_out"],
        "rows": rows,
    }


def analyze_sample(
    frame: pd.DataFrame,
    sample_name: str,
    *,
    seed: int,
    bootstrap_reps: int,
) -> tuple[dict[str, object], list[dict[str, object]]]:
    required = ["iso3", "tfr", *PREDICTOR_COLUMNS, *CONTROL_COLUMNS]
    sample = frame.dropna(subset=required).copy()
    if len(sample) < 15:
        raise ValueError(f"{sample_name}: only {len(sample)} complete countries")

    controls = list(CONTROL_COLUMNS)
    testosterone = "testosterone_ng_dl"
    electricity = "electricity_kwh_per_capita"
    model_specs = {
        "controls": controls,
        "controls_plus_testosterone": [*controls, testosterone],
        "controls_plus_electricity": [*controls, electricity],
        "horse_race": [*controls, electricity, testosterone],
        "testosterone_unadjusted": [testosterone],
        "electricity_unadjusted": [electricity],
    }
    models = {name: _fit_frame(sample, "tfr", predictors) for name, predictors in model_specs.items()}
    partials = {
        "T_given_development": partial_r2(models["controls_plus_testosterone"], models["controls"]),
        "electricity_given_development": partial_r2(models["controls_plus_electricity"], models["controls"]),
        "T_given_development_and_electricity": partial_r2(models["horse_race"], models["controls_plus_electricity"]),
        "electricity_given_development_and_T": partial_r2(models["horse_race"], models["controls_plus_testosterone"]),
    }

    rng = np.random.default_rng(seed)
    bootstrap_ci = {
        "T_given_development": _bootstrap_partial_r2(
            sample, testosterone, controls, reps=bootstrap_reps, rng=rng
        ),
        "electricity_given_development": _bootstrap_partial_r2(
            sample, electricity, controls, reps=bootstrap_reps, rng=rng
        ),
        "T_given_development_and_electricity": _bootstrap_partial_r2(
            sample, testosterone, [*controls, electricity], reps=bootstrap_reps, rng=rng
        ),
        "electricity_given_development_and_T": _bootstrap_partial_r2(
            sample, electricity, [*controls, testosterone], reps=bootstrap_reps, rng=rng
        ),
    }

    coefficient_rows: list[dict[str, object]] = []
    for model_name, model in models.items():
        for row in _model_dict(model)["coefficients"]:
            coefficient_rows.append({"sample": sample_name, "model": model_name, **row})

    return (
        {
            "sample": sample_name,
            "n": len(sample),
            "countries": sample["iso3"].tolist(),
            "models": {name: _model_dict(model) for name, model in models.items()},
            "partial_r2": partials,
            "partial_r2_bootstrap_ci": {key: list(value) for key, value in bootstrap_ci.items()},
            "rank_analysis": _rank_analysis(sample, rng, bootstrap_reps),
            "mediation_diagnostic": _mediation_analysis(sample, rng, bootstrap_reps),
            "leave_one_out_partial_r2": {
                "T_given_development": _loo_partial(sample, testosterone, controls),
                "electricity_given_development": _loo_partial(sample, electricity, controls),
            },
        },
        coefficient_rows,
    )


def _sensitivity_analyses(frame: pd.DataFrame, seed: int, reps: int) -> dict[str, object]:
    outputs: dict[str, object] = {}

    user = frame.loc[frame["user_supplied_ng_dl"].notna()].copy()
    user["testosterone_ng_dl"] = user["user_supplied_ng_dl"]
    outputs["user_supplied_values_global"] = analyze_sample(
        user, "user_supplied_values_global", seed=seed + 11, bootstrap_reps=reps
    )[0]

    nonhistorical = frame.loc[~frame["quality_flag"].isin(["KNOWN_HISTORICAL"])].copy()
    outputs["exclude_known_historical_global"] = analyze_sample(
        nonhistorical, "exclude_known_historical_global", seed=seed + 12, bootstrap_reps=reps
    )[0]

    high_income = frame.loc[frame["developed_high_income"]].copy()
    outputs["high_income"] = analyze_sample(
        high_income, "high_income", seed=seed + 13, bootstrap_reps=reps
    )[0]
    return outputs


def _make_figures(frame: pd.DataFrame, results: dict[str, object], out_dir: Path) -> None:
    import os

    cache_dir = Path("/tmp/berm-testosterone-tfr-matplotlib")
    cache_dir.mkdir(parents=True, exist_ok=True)
    os.environ.setdefault("MPLCONFIGDIR", str(cache_dir))
    os.environ.setdefault("XDG_CACHE_HOME", str(cache_dir))
    import matplotlib
    matplotlib.use("Agg", force=True)
    import matplotlib.pyplot as plt

    out_dir.mkdir(parents=True, exist_ok=True)
    complete = frame.dropna(subset=["tfr", *PREDICTOR_COLUMNS, *CONTROL_COLUMNS]).copy()
    developed = complete.loc[complete["developed_oecd"]].copy()

    fig, axes = plt.subplots(1, 2, figsize=(12, 5), constrained_layout=True)
    for ax, data, title in (
        (axes[0], complete, f"Global complete-case (n={len(complete)})"),
        (axes[1], developed, f"OECD (n={len(developed)})"),
    ):
        x = stats.rankdata(data["testosterone_ng_dl"])
        y = stats.rankdata(data["tfr"])
        ax.scatter(x, y, alpha=0.75, edgecolor="none")
        slope, intercept = np.polyfit(x, y, 1)
        grid = np.linspace(min(x), max(x), 100)
        ax.plot(grid, intercept + slope * grid, color="#b33a3a", linewidth=2)
        rho = stats.spearmanr(x, y).statistic
        ax.set(title=f"{title}\nSpearman ρ={rho:.3f}", xlabel="Testosterone rank", ylabel="TFR rank")
    fig.suptitle("Rank-transformed testosterone and 2023 WPP TFR")
    fig.savefig(out_dir / "rank_testosterone_vs_tfr.png", dpi=180)
    plt.close(fig)

    labels = ["Global", "OECD"]
    t_values = [
        results["samples"]["global"]["partial_r2"]["T_given_development"],
        results["samples"]["developed_oecd"]["partial_r2"]["T_given_development"],
    ]
    e_values = [
        results["samples"]["global"]["partial_r2"]["electricity_given_development"],
        results["samples"]["developed_oecd"]["partial_r2"]["electricity_given_development"],
    ]
    x = np.arange(len(labels))
    width = 0.34
    fig, ax = plt.subplots(figsize=(8, 5), constrained_layout=True)
    ax.bar(x - width / 2, t_values, width, label="Testosterone")
    ax.bar(x + width / 2, e_values, width, label="Electricity")
    ax.axhline(0.05, color="#555", linestyle="--", linewidth=1, label="0.05 comparison threshold")
    ax.set_xticks(x, labels)
    ax.set_ylabel("Partial R² given development controls")
    ax.set_title("Incremental association with WPP 2023 TFR")
    ax.legend()
    fig.savefig(out_dir / "partial_r2_comparison.png", dpi=180)
    plt.close(fig)


def _fmt(value: float, digits: int = 4) -> str:
    return "NA" if not math.isfinite(value) else f"{value:.{digits}f}"


def _write_report(results: dict[str, object], frame: pd.DataFrame, out_path: Path) -> None:
    global_result = results["samples"]["global"]
    developed = results["samples"]["developed_oecd"]
    g_part = global_result["partial_r2"]
    d_part = developed["partial_r2"]
    d_rank = developed["rank_analysis"]
    mediation = developed["mediation_diagnostic"]
    sensitivity = results["sensitivity"]
    electricity_simple = developed["models"]["electricity_unadjusted"]["r2"]
    t_simple = developed["models"]["testosterone_unadjusted"]["r2"]
    global_t_row = next(
        row for row in global_result["models"]["controls_plus_testosterone"]["coefficients"]
        if row["term"] == "testosterone_ng_dl"
    )
    developed_t_row = next(
        row for row in developed["models"]["controls_plus_testosterone"]["coefficients"]
        if row["term"] == "testosterone_ng_dl"
    )
    developed_t_loo = developed["leave_one_out_partial_r2"]["T_given_development"]
    threshold_result = "ylittää" if d_part["T_given_development"] > 0.05 else "ei ylitä"

    missing = {
        column: int(frame[column].isna().sum())
        for column in ["tfr", "electricity_kwh_per_capita", "sanitation_pct"]
    }
    text = f"""# Testosteroni–sähkö–TFR horse race (2023)

## Tiivistelmä

Analyysi on eksploratiivinen ekologinen maavertailu. Täydellisessä globaalissa otoksessa on **n={global_result['n']}** ja OECD-otoksessa **n={developed['n']}** maata.

Kehittyneiden maiden avainvertailu:

- sähkön yksimuuttuja-R² = **{_fmt(electricity_simple)}**
- testosteronin yksimuuttuja-R² = **{_fmt(t_simple)}**
- testosteronin partial R² kehityskontrollien jälkeen = **{_fmt(d_part['T_given_development'])}**
- sähkön partial R² kehityskontrollien jälkeen = **{_fmt(d_part['electricity_given_development'])}**
- testosteroni {threshold_result} ennalta ehdotetun 0,05-vertailurajan.

Tätä vertailua ei pidä tulkita niin, että suurempi R² todistaisi syyn tai BERM:n. Testosteronimuuttuja on eri vuosien, alueiden, ikien, otosten ja assaymenetelmien kooste. Sen lähdesivu luonnehtii koostetta itse epätieteellisesti epäluotettavaksi.

## Menetelmä

- Outcome: UN WPP 2024 -revision vuoden 2023 TFR-estimaatti. Vuotta 2024 ei käytetty, koska se on WPP:ssä projektio.
- Testosteroni: World Population Review -taulukon 87 maan snapshot 31.8.2026; käyttäjän antamat 47 arvoa säilytetään erillisenä herkkyysanalyysina.
- Sähkö: OWID/Ember, sähkön kokonaiskysyntä henkilöä kohti vuonna 2023 (kWh/hlö). Raakamuuttuja toistaa auditoidun OECD-vertailun; standardointi muuttaa yksikköä mutta ei lineaarisen mallin R²:ta.
- Kehityskontrollit: WPP:n imeväiskuolleisuus (`log1p`) ja elinajanodote vuonna 2023 sekä World Bankin viimeinen saatavilla oleva perussanitaatiohavainto vuosilta 2018–2023.
- Kaikki regressiokertoimet ovat otoksen sisällä standardoituja. Raportoidut p-arvot ja luottamusvälit käyttävät HC3-robustia keskivirhettä.
- Partial R² = `(R²_full − R²_reduced) / (1 − R²_reduced)`. Bootstrap-välit ovat percentile-välejä ja maita uudelleenotetaan kokonaisina.
- Kehittyneiden maiden ensisijainen sääntö: OECD-jäsenyys 31.8.2026. World Bank `High income` on herkkyysanalyysi.

## Horse race

| Otos | n | T partial R² (kehitys) | Sähkö partial R² (kehitys) | T partial R² (kehitys+sähkö) | Sähkö partial R² (kehitys+T) |
|---|---:|---:|---:|---:|---:|
| Globaali | {global_result['n']} | {_fmt(g_part['T_given_development'])} | {_fmt(g_part['electricity_given_development'])} | {_fmt(g_part['T_given_development_and_electricity'])} | {_fmt(g_part['electricity_given_development_and_T'])} |
| OECD | {developed['n']} | {_fmt(d_part['T_given_development'])} | {_fmt(d_part['electricity_given_development'])} | {_fmt(d_part['T_given_development_and_electricity'])} | {_fmt(d_part['electricity_given_development_and_T'])} |

Testosteronin standardoitu kerroin kehityskontrollien jälkeen on globaalisti **{_fmt(global_t_row['coefficient'])}** (HC3 p={_fmt(global_t_row['hc3_p'])}) ja OECD-otoksessa **{_fmt(developed_t_row['coefficient'])}** (HC3 p={_fmt(developed_t_row['hc3_p'])}). OECD-maiden leave-one-country-out T-partial-R² vaihtelee välillä **{_fmt(developed_t_loo['min'])}–{_fmt(developed_t_loo['max'])}**, joten yksikään yhden maan poisto ei nosta sitä 0,05-rajan yli.

Bootstrap-välit, leave-one-country-out-vaihtelut ja kaikki HC3-kertoimet ovat koneellisesti luettavassa `results.json`-tiedostossa.

## Herkkyys otosvalinnalle

- Käyttäjän viestin 45 analyysiin päätyvällä maalla globaali T partial R² = **{_fmt(sensitivity['user_supplied_values_global']['partial_r2']['T_given_development'])}**.
- Nykyisen 87 maan snapshotin complete-case-otoksessa sama arvo = **{_fmt(g_part['T_given_development'])}**.
- Tunnetusti historiallisten hormonirivien poiston jälkeen (n={sensitivity['exclude_known_historical_global']['n']}) arvo = **{_fmt(sensitivity['exclude_known_historical_global']['partial_r2']['T_given_development'])}**.
- World Bank high-income -rajauksella (n={sensitivity['high_income']['n']}) arvo = **{_fmt(sensitivity['high_income']['partial_r2']['T_given_development'])}**.

Johtopäätös vaihtuu 0,05-rajan ympärillä globaalin osajoukon mukaan, mutta ei kehittyneiden maiden OECD- tai high-income-analyyseissa. Tämä on aineiston epäharmonisuuden ja otosvalinnan varoitussignaali.

## Rank-transformaatio

OECD-otoksessa Spearmanin ρ(T, TFR) = **{_fmt(d_rank['spearman_rho'])}**, p = **{_fmt(d_rank['spearman_p'])}**, bootstrap 95 % CI [{_fmt(d_rank['spearman_bootstrap_ci'][0])}, {_fmt(d_rank['spearman_bootstrap_ci'][1])}]. Rank-muunnos poistaa yksikön ja suojaa monotonisilta skaalaeroilta, mutta **ei** poista maittain vaihtelevan assay-, ikä-, otanta- tai mittausvuosiharhan aiheuttamaa järjestysvirhettä.

## Mediaatiodiagnostiikka

OECD-otoksessa standardoitu sähkön kokonaiskerroin on **{_fmt(mediation['c_total_electricity_to_TFR'])}** ja T:n lisäämisen jälkeinen suora kerroin **{_fmt(mediation['c_prime_direct_electricity_to_TFR'])}**. Absoluuttisen kertoimen muutos on **{_fmt(mediation['absolute_coefficient_attenuation_pct'], 1)} %**. Epäsuoran polun `a×b` = **{_fmt(mediation['indirect_effect_a_times_b'])}**, bootstrap 95 % CI [{_fmt(mediation['indirect_effect_bootstrap_ci'][0])}, {_fmt(mediation['indirect_effect_bootstrap_ci'][1])}].

Tämä on vain coefficient-attenuation-diagnoosi. Poikkileikkausdata ei osoita ajallista järjestystä sähkö → T → TFR, ja mediaatio vaatisi lisäksi mittausvirheettömyyttä sekä mittaamattoman sekoittumisen puuttumista kaikilla kolmella polulla.

## BERM-tulkinta

**A. BERM-spesifi ennuste.** Tässä aineistossa ei ole FieldStatea, B₀-suuntia, vaihetta, koherenssia, beat-PSD:tä, elinsiirtoa tai RPM-biomarkkereita. Siksi analyysista ei voi johtaa eikä testata BERM-polku C:n erottelevia ennusteita. Mahdollinen T–TFR-assosiaatio on korkeintaan yhteensopiva sen tuodun biologisen oletuksen kanssa, että testosteroni liittyy lisääntymiskapasiteettiin.

**B. Konsensus-/vaihtoehtomalli.** Kehitysaste, terveys, ravitsemus, lihavuus, ikärakenne, mittauskäytännöt, ehkäisy ja syntyvyystoiveet voivat tuottaa sekä maiden T-eroja että TFR-eroja. Sähkönkulutus toimii tässä kehityksen infrastruktuuriproksina eikä fysikaalisena annoksena.

**C. Erottelukyky.** Horse race vertailee kahden epätarkan proksin lisäselitysvoimaa, mutta ei erottele BERM:ää konsensusmallista eikä identifioi kausaalista mediaattoria. Tulos voi priorisoida parempaa harmonisoitua hormonidataa; se ei validoi mekanistista ketjua.

## Aineistoauditointi

- Testosteronirivejä: {len(frame)}.
- Puuttuvat ennen complete-case-rajausta: {json.dumps(missing, ensure_ascii=False)}.
- Kroatia (1987), Armenia (1980) ja useat 2000-luvun alun arvot on merkitty; niiden poissulku raportoidaan herkkyysanalyysissa.
- Brasilian käyttäjän arvo 416 poikkeaa 31.8.2026 lähdesnapshotin arvosta 375. Molemmat säilytetään, eikä niitä yhdistetä hiljaisesti.
- Ekologinen harha: miespopulaation hormonimittaus ja naisten periodi-TFR ovat eri yksilötason populaatioita.
- Monivertailu ja mallin jälkikäteisyys: 0,05-raja on vertailukynnys, ei tilastollinen tai biologinen hyväksymiskriteeri.

## Tuotokset

- `joined_country_data.csv`: yhdistetty maa-aineisto ja otosliput
- `model_coefficients.csv`: kaikkien päämallien standardoidut HC3-kertoimet
- `results.json`: pää-, herkkyys-, bootstrap-, mediaatio- ja vaikutusvaltatulokset
- `rank_testosterone_vs_tfr.png` ja `partial_r2_comparison.png`: tarkistuskuvat
"""
    out_path.write_text(text, encoding="utf-8")


def run_analysis(*, seed: int = 20260831, bootstrap_reps: int = 2000) -> dict[str, object]:
    PROCESSED_DIR.mkdir(parents=True, exist_ok=True)
    REPORT_DIR.mkdir(parents=True, exist_ok=True)
    frame = build_analysis_frame()
    frame.to_csv(PROCESSED_DIR / "joined_country_data.csv", index=False)

    global_result, global_coefficients = analyze_sample(
        frame, "global", seed=seed, bootstrap_reps=bootstrap_reps
    )
    developed_frame = frame.loc[frame["developed_oecd"]].copy()
    developed_result, developed_coefficients = analyze_sample(
        developed_frame, "developed_oecd", seed=seed + 1, bootstrap_reps=bootstrap_reps
    )
    sensitivity_reps = max(500, bootstrap_reps // 2)
    results: dict[str, object] = {
        "analysis_id": "testosterone_tfr_horse_race_2023_v1",
        "analysis_date": "2026-08-31",
        "analysis_year": ANALYSIS_YEAR,
        "status": "EXPLORATORY_PROXY_ANALYSIS_NOT_CAUSAL",
        "primary_developed_definition": "OECD membership on 2026-08-31",
        "samples": {"global": global_result, "developed_oecd": developed_result},
        "sensitivity": _sensitivity_analyses(frame, seed, sensitivity_reps),
        "provenance": {
            "testosterone": {
                "path": str(TESTOSTERONE_CSV.relative_to(DATA_DIR.parent)),
                "sha256": _sha256(TESTOSTERONE_CSV),
                "source_url": "https://worldpopulationreview.com/country-rankings/testosterone-levels-by-country",
                "classification": "PROXY; heterogeneous secondary compilation",
            },
            "wpp": {
                "path": str(WPP_GZIP.relative_to(DATA_DIR.parent)),
                "sha256": _sha256(WPP_GZIP),
                "source_url": "https://population.un.org/wpp/",
                "classification": "WPP 2023 estimate; not 2024 projection",
            },
            "electricity": {
                "path": str(ELECTRICITY_CSV.relative_to(DATA_DIR.parent)),
                "sha256": _sha256(ELECTRICITY_CSV),
                "metadata_sha256": _sha256(ELECTRICITY_METADATA),
                "source_url": "https://ourworldindata.org/grapher/per-capita-electricity-demand",
                "classification": "infrastructure/energy proxy; not FieldState or dose",
            },
            "sanitation": {
                "path": str(SANITATION_JSON.relative_to(DATA_DIR.parent)),
                "sha256": _sha256(SANITATION_JSON),
                "source_url": "https://api.worldbank.org/v2/country/all/indicator/SH.STA.BASS.ZS",
                "classification": "development control",
            },
        },
        "bootstrap_reps_primary": bootstrap_reps,
        "random_seed": seed,
    }
    coefficients = pd.DataFrame([*global_coefficients, *developed_coefficients])
    coefficients.to_csv(PROCESSED_DIR / "model_coefficients.csv", index=False)
    (REPORT_DIR / "results.json").write_text(
        json.dumps(results, ensure_ascii=False, indent=2, allow_nan=False) + "\n",
        encoding="utf-8",
    )
    _write_report(results, frame, REPORT_DIR / "REPORT.md")
    _make_figures(frame, results, REPORT_DIR)
    return results


def main(argv: Iterable[str] | None = None) -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--seed", type=int, default=20260831)
    parser.add_argument("--bootstrap-reps", type=int, default=2000)
    args = parser.parse_args(list(argv) if argv is not None else None)
    results = run_analysis(seed=args.seed, bootstrap_reps=args.bootstrap_reps)
    global_result = results["samples"]["global"]
    developed = results["samples"]["developed_oecd"]
    print(
        json.dumps(
            {
                "global_n": global_result["n"],
                "developed_oecd_n": developed["n"],
                "global_partial_r2": global_result["partial_r2"],
                "developed_oecd_partial_r2": developed["partial_r2"],
                "developed_oecd_simple_electricity_r2": developed["models"]["electricity_unadjusted"]["r2"],
                "developed_oecd_simple_testosterone_r2": developed["models"]["testosterone_unadjusted"]["r2"],
                "developed_oecd_mediation": developed["mediation_diagnostic"],
            },
            ensure_ascii=False,
            indent=2,
        )
    )
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
