"""Leakage-controlled rolling validation for the global hierarchical BERM tier.

This is an additive validation path.  It does not alter, reload, or replace
the locked Core-51 historical result in :mod:`berm.stats.rolling_backtest`.
For every tier/cutoff it fits a single pooled ridge demand model strictly on
the train interval, then scores only later observed TFR rows.  Observed
post-cutoff mobile/urban/covariate values make the resulting quantity a
*conditional hindcast*, which is named explicitly in the exported artifact.

The two models are matched:

* BERM: ``pure external bioCap × behav × pooled covariate demand``
* M0: pooled covariate-only ridge on the exact same eligible rows

There are no country fitted rates, country intercepts, or country residuals
inside either predictor.  Country residuals are evaluation outputs only.
"""

from __future__ import annotations

from collections import Counter
from collections.abc import Iterable, Mapping, Sequence
from dataclasses import asdict, dataclass, is_dataclass
import argparse
import json
import math
from pathlib import Path
from statistics import median
from typing import Any

from berm.stats.hierarchical import (
    DEFAULT_RIDGE_ALPHA,
    FittedGlobalModels,
    GlobalDataCoverageError,
    GlobalPanelRow,
    GlobalPanels,
    fit_paired_global_models,
    load_global_panel,
    observed_outcome_eligible,
)


GLOBAL_BACKTEST_VERSION = "global-tiered-backtest-1"
GLOBAL_VALIDATION_SCHEMA = "global_validation-1"
DEFAULT_TIER_TRAIN_STARTS: Mapping[str, int] = {
    "Core-51": 1990,
    "Extended": 1990,
    "Global": 2000,
}
DEFAULT_TIER_TRAIN_ENDS: Mapping[str, tuple[int, ...]] = {
    "Core-51": (2000, 2005, 2010),
    "Extended": (2000, 2005, 2010),
    "Global": (2005, 2010),
}
DEFAULT_END_YEAR = 2024
_REPO_ROOT = Path(__file__).resolve().parents[3]
DEFAULT_CORE51_ARTIFACT = _REPO_ROOT / "website" / "public" / "data" / "rolling_backtest.json"


@dataclass(frozen=True)
class GlobalErrorMetrics:
    """Metrics on a common set of country-year rows."""

    rmse: float | None
    mae: float | None
    bias: float | None
    max_abs_error: float | None
    n: int


@dataclass(frozen=True)
class CountryGlobalBacktest:
    """All matched post-cutoff rows and scorecards for one ISO3 country."""

    country_iso3: str
    train_end: int
    test_start: int
    test_end_requested: int
    berm: GlobalErrorMetrics
    m0: GlobalErrorMetrics
    berm_wins: bool | None
    coverage: Mapping[str, Any]
    rows: tuple[Mapping[str, Any], ...]


@dataclass(frozen=True)
class GlobalEvaluation:
    """Aggregate and per-country scorecard for a frozen pair of models."""

    train_end: int
    test_start: int
    test_end_requested: int
    berm: GlobalErrorMetrics
    m0: GlobalErrorMetrics
    median_country_berm_rmse: float | None
    median_country_m0_rmse: float | None
    berm_wins: int
    m0_wins_or_ties: int
    n_countries_with_scored_rows: int
    per_country: Mapping[str, CountryGlobalBacktest]
    input_coverage: Mapping[str, Any]
    conditional_hindcast: bool = True


@dataclass(frozen=True)
class CountryHeldOutValidation:
    """Country-held-out prediction scores; held-out country never enters fit."""

    train_start: int
    train_end: int
    test_start: int
    test_end_requested: int
    aggregate_berm: GlobalErrorMetrics
    aggregate_m0: GlobalErrorMetrics
    per_country: Mapping[str, CountryGlobalBacktest]
    failed_holds: Mapping[str, str]
    conditional_hindcast: bool = True


@dataclass(frozen=True)
class IsraelResidualVisibility:
    """An explicit Israel residual extract, including absence as a result."""

    available: bool
    country_iso3: str
    n: int
    berm_rmse: float | None
    m0_rmse: float | None
    berm_bias: float | None
    m0_bias: float | None
    rows: tuple[Mapping[str, Any], ...]
    note: str


@dataclass(frozen=True)
class TierScenarioResult:
    """One tier and one outer temporal cutoff."""

    tier: str
    train_start: int
    train_end: int
    test_start: int
    test_end_requested: int
    n_tier_countries: int
    models: Mapping[str, Any]
    evaluation: GlobalEvaluation
    country_held_out: CountryHeldOutValidation | None
    israel_residual: IsraelResidualVisibility
    conditional_hindcast: bool = True


@dataclass(frozen=True)
class TieredBacktestResult:
    """Versioned result for Core-51-addition, Extended, and Global tiers."""

    version: str
    conditional_hindcast: bool
    outcome_policy: Mapping[str, Any]
    tier_membership: Mapping[str, tuple[str, ...]]
    scenarios: Mapping[str, Mapping[str, TierScenarioResult]]
    notes: tuple[str, ...]


def load_published_core51_iso3(
    artifact_path: str | Path = DEFAULT_CORE51_ARTIFACT,
) -> frozenset[str]:
    """Read the actual locked Core-51 ISO3 set from its published artifact.

    No illustrative prompt list is used.  The artifact's ``panel.panels``
    mapping is the source of truth, and this helper does not mutate it.
    """
    path = Path(artifact_path)
    try:
        payload = json.loads(path.read_text(encoding="utf-8"))
    except OSError as exc:
        raise FileNotFoundError(f"published Core-51 artifact not found: {path}") from exc
    except json.JSONDecodeError as exc:
        raise ValueError(f"published Core-51 artifact is invalid JSON: {path}") from exc
    panels = payload.get("panel", {}).get("panels", {})
    if not isinstance(panels, Mapping):
        raise ValueError("published Core-51 artifact has no panel.panels mapping")
    iso3s = {
        str(record.get("iso3", "")).upper()
        for record in panels.values()
        if isinstance(record, Mapping)
        and len(str(record.get("iso3", "")).upper()) == 3
    }
    if not iso3s:
        raise ValueError("published Core-51 artifact contains no valid ISO3 codes")
    return frozenset(iso3s)


def classify_global_tiers(
    panels: GlobalPanels,
    *,
    core51_artifact_path: str | Path = DEFAULT_CORE51_ARTIFACT,
) -> Mapping[str, tuple[str, ...]]:
    """Derive coverage-only Extended/Global memberships from a loaded panel.

    This fallback mirrors the documented thresholds and reads no TFR values
    for parameter fitting.  It is useful when the Session-2 data exporter did
    not include a ``cohorts`` block.  Existing explicit cohort membership can
    be supplied directly to :func:`run_tiered_backtest` instead.
    """
    core = load_published_core51_iso3(core51_artifact_path)
    extended: list[str] = []
    global_set: list[str] = []
    for iso3, country_panel in sorted(panels.items()):
        tfr_1990 = sum(
            observed_outcome_eligible(row)
            for year, row in country_panel.items()
            if 1990 <= year <= 2024
        )
        mobile_1990 = sum(
            _exposure_input_present(row, "mobile_per_100")
            for year, row in country_panel.items()
            if 1990 <= year <= 2024
        )
        urban_1990 = sum(
            _exposure_input_present(row, "urban_pct")
            for year, row in country_panel.items()
            if 1990 <= year <= 2024
        )
        gdp_1990 = sum(
            _field_present(row, "gdp_ppp_per_capita")
            for year, row in country_panel.items()
            if 1990 <= year <= 2024
        )
        if tfr_1990 >= 25 and mobile_1990 >= 20 and urban_1990 >= 25 and gdp_1990 >= 20:
            extended.append(iso3)

        tfr_2000 = sum(
            observed_outcome_eligible(row)
            for year, row in country_panel.items()
            if 2000 <= year <= 2024
        )
        mobile_2000 = sum(
            _exposure_input_present(row, "mobile_per_100")
            for year, row in country_panel.items()
            if 2000 <= year <= 2024
        )
        if tfr_2000 >= 15 and mobile_2000 >= 15:
            global_set.append(iso3)

    available = set(panels)
    return {
        "Core-51": tuple(sorted(core & available)),
        "Extended": tuple(extended),
        "Global": tuple(global_set),
    }


def run_tiered_backtest(
    panels: GlobalPanels | Mapping[str, Any],
    *,
    tier_membership: Mapping[str, Iterable[str]] | None = None,
    core51_artifact_path: str | Path = DEFAULT_CORE51_ARTIFACT,
    train_starts: Mapping[str, int] | None = None,
    train_ends: Mapping[str, Sequence[int]] | None = None,
    end_year: int = DEFAULT_END_YEAR,
    alpha: float = DEFAULT_RIDGE_ALPHA,
    memory_window_years: int | None = None,
    include_country_held_out: bool = True,
) -> TieredBacktestResult:
    """Run the additive three-tier pooled-ridge rolling backtest.

    The function accepts explicit membership from the Session-2 classifier. If
    absent, it derives coverage-only memberships and derives Core-51 strictly
    from the published artifact.  It never rewrites that artifact or calls
    the legacy Core-51 fitting code.
    """
    normalized = _normalize_panels(panels)
    resolved_membership = (
        _normalize_membership(tier_membership, available=set(normalized))
        if tier_membership is not None
        else classify_global_tiers(normalized, core51_artifact_path=core51_artifact_path)
    )
    resolved_starts = {**DEFAULT_TIER_TRAIN_STARTS, **dict(train_starts or {})}
    resolved_ends = {**DEFAULT_TIER_TRAIN_ENDS, **dict(train_ends or {})}
    scenarios: dict[str, dict[str, TierScenarioResult]] = {}
    for tier in ("Core-51", "Extended", "Global"):
        countries = tuple(resolved_membership.get(tier, ()))
        if not countries:
            scenarios[tier] = {}
            continue
        if tier not in resolved_starts or tier not in resolved_ends:
            raise ValueError(f"missing train schedule for tier {tier}")
        tier_panels = {iso3: normalized[iso3] for iso3 in countries if iso3 in normalized}
        results: dict[str, TierScenarioResult] = {}
        for train_end in resolved_ends[tier]:
            result = run_tier_scenario(
                tier,
                tier_panels,
                train_start=resolved_starts[tier],
                train_end=int(train_end),
                end_year=end_year,
                alpha=alpha,
                memory_window_years=memory_window_years,
                include_country_held_out=include_country_held_out,
            )
            results[f"train_{resolved_starts[tier]}_{train_end}"] = result
        scenarios[tier] = results
    return TieredBacktestResult(
        version=GLOBAL_BACKTEST_VERSION,
        conditional_hindcast=True,
        outcome_policy={
            "scored_outcomes": "positive non-projection rows only",
            "wpp_2024_plus": "not scored; treated as projection/DERIVED",
            "world_bank_fallback": "may be scored only when source/type does not mark projection",
            "post_cutoff_covariates": "observed inputs used only for conditional hindcast prediction",
        },
        tier_membership={tier: tuple(values) for tier, values in resolved_membership.items()},
        scenarios=scenarios,
        notes=(
            "Core-51 published backtest remains locked and unchanged; Core-51 here is an additive pooled-ridge analysis.",
            "No country-specific rate, intercept, or residual is fitted in BERM or M0.",
            "M0 and BERM are scored on identical rows that satisfy the external BERM exposure contract.",
        ),
    )


def run_tier_scenario(
    tier: str,
    panels: GlobalPanels | Mapping[str, Any],
    *,
    train_start: int,
    train_end: int,
    end_year: int = DEFAULT_END_YEAR,
    alpha: float = DEFAULT_RIDGE_ALPHA,
    memory_window_years: int | None = None,
    include_country_held_out: bool = True,
) -> TierScenarioResult:
    """Fit/evaluate one tier cutoff and optionally run strict country LOOCV."""
    normalized = _normalize_panels(panels)
    if not normalized:
        raise GlobalDataCoverageError("tier scenario requires at least one country")
    models = fit_paired_global_models(
        normalized,
        train_start=train_start,
        train_end=train_end,
        alpha=alpha,
        memory_window_years=memory_window_years,
    )
    evaluation = evaluate_global_models(
        models,
        normalized,
        test_start=train_end + 1,
        test_end=end_year,
    )
    held_out = (
        country_held_out_validation(
            normalized,
            train_start=train_start,
            train_end=train_end,
            test_end=end_year,
            alpha=alpha,
            memory_window_years=memory_window_years,
        )
        if include_country_held_out and len(normalized) >= 2
        else None
    )
    return TierScenarioResult(
        tier=tier,
        train_start=train_start,
        train_end=train_end,
        test_start=train_end + 1,
        test_end_requested=end_year,
        n_tier_countries=len(normalized),
        models=_model_summary(models),
        evaluation=evaluation,
        country_held_out=held_out,
        israel_residual=israel_residual_visibility(evaluation.per_country),
    )


def evaluate_global_models(
    models: FittedGlobalModels,
    panels: GlobalPanels | Mapping[str, Any],
    *,
    test_start: int,
    test_end: int,
) -> GlobalEvaluation:
    """Score BERM and matched M0 on the same post-cutoff observed rows."""
    normalized = _normalize_panels(panels)
    if test_start <= models.berm._require_state().train_end:
        raise ValueError("test_start must be strictly after the fitted train_end")
    berm_errors: list[float] = []
    m0_errors: list[float] = []
    per_country: dict[str, CountryGlobalBacktest] = {}
    outcome_sources: Counter[str] = Counter()
    exposure_statuses: Counter[str] = Counter()
    covariate_imputation: Counter[str] = Counter()
    skipped: Counter[str] = Counter()

    for iso3 in sorted(normalized):
        country_result, country_input = _evaluate_country(
            models,
            iso3,
            normalized[iso3],
            test_start=test_start,
            test_end=test_end,
        )
        per_country[iso3] = country_result
        for row in country_result.rows:
            berm_errors.append(float(row["berm_residual"]))
            m0_errors.append(float(row["m0_residual"]))
        outcome_sources.update(country_input["outcome_sources"])
        exposure_statuses.update(country_input["exposure_statuses"])
        covariate_imputation.update(country_input["covariate_imputation"])
        skipped.update(country_input["skipped"])

    country_berm = [
        result.berm.rmse for result in per_country.values() if result.berm.rmse is not None
    ]
    country_m0 = [
        result.m0.rmse for result in per_country.values() if result.m0.rmse is not None
    ]
    berm_wins = sum(result.berm_wins is True for result in per_country.values())
    m0_wins_or_ties = sum(result.berm_wins is False for result in per_country.values())
    return GlobalEvaluation(
        train_end=models.berm._require_state().train_end,
        test_start=test_start,
        test_end_requested=test_end,
        berm=_error_metrics(berm_errors),
        m0=_error_metrics(m0_errors),
        median_country_berm_rmse=None if not country_berm else float(median(country_berm)),
        median_country_m0_rmse=None if not country_m0 else float(median(country_m0)),
        berm_wins=berm_wins,
        m0_wins_or_ties=m0_wins_or_ties,
        n_countries_with_scored_rows=len(country_berm),
        per_country=per_country,
        input_coverage={
            "outcome_sources": dict(sorted(outcome_sources.items())),
            "post_cutoff_exposure_statuses": dict(sorted(exposure_statuses.items())),
            "post_cutoff_covariate_train_median_imputations": dict(
                sorted(covariate_imputation.items())
            ),
            "skipped_rows_by_reason": dict(sorted(skipped.items())),
            "matched_row_rule": "BERM and M0 scored only where both predictions and an eligible observed TFR exist.",
        },
    )


def country_held_out_validation(
    panels: GlobalPanels | Mapping[str, Any],
    *,
    train_start: int,
    train_end: int,
    test_end: int = DEFAULT_END_YEAR,
    alpha: float = DEFAULT_RIDGE_ALPHA,
    memory_window_years: int | None = None,
) -> CountryHeldOutValidation:
    """Leave one country out of all fit/imputation/scaling calculations at a time."""
    normalized = _normalize_panels(panels)
    if len(normalized) < 2:
        raise ValueError("country-held-out validation needs at least two countries")
    results: dict[str, CountryGlobalBacktest] = {}
    failed: dict[str, str] = {}
    all_berm: list[float] = []
    all_m0: list[float] = []
    for held_out in sorted(normalized):
        training = {iso3: rows for iso3, rows in normalized.items() if iso3 != held_out}
        try:
            models = fit_paired_global_models(
                training,
                train_start=train_start,
                train_end=train_end,
                alpha=alpha,
                memory_window_years=memory_window_years,
            )
            result, _ = _evaluate_country(
                models,
                held_out,
                normalized[held_out],
                test_start=train_end + 1,
                test_end=test_end,
            )
        except (GlobalDataCoverageError, ValueError) as exc:
            failed[held_out] = str(exc)
            continue
        results[held_out] = result
        all_berm.extend(float(row["berm_residual"]) for row in result.rows)
        all_m0.extend(float(row["m0_residual"]) for row in result.rows)
    return CountryHeldOutValidation(
        train_start=train_start,
        train_end=train_end,
        test_start=train_end + 1,
        test_end_requested=test_end,
        aggregate_berm=_error_metrics(all_berm),
        aggregate_m0=_error_metrics(all_m0),
        per_country=results,
        failed_holds=dict(sorted(failed.items())),
    )


def israel_residual_visibility(
    country_results: Mapping[str, CountryGlobalBacktest],
) -> IsraelResidualVisibility:
    """Extract Israel's residuals rather than hiding a difficult case in an average."""
    result = country_results.get("ISR")
    if result is None:
        return IsraelResidualVisibility(
            available=False,
            country_iso3="ISR",
            n=0,
            berm_rmse=None,
            m0_rmse=None,
            berm_bias=None,
            m0_bias=None,
            rows=(),
            note="Israel (ISR) is not present in this tier or has no reportable result.",
        )
    return IsraelResidualVisibility(
        available=result.berm.n > 0,
        country_iso3="ISR",
        n=result.berm.n,
        berm_rmse=result.berm.rmse,
        m0_rmse=result.m0.rmse,
        berm_bias=result.berm.bias,
        m0_bias=result.m0.bias,
        rows=result.rows,
        note=(
            "Israel is reported separately because its residual is a direct model diagnostic; "
            "it is not calibrated away."
        ),
    )


def export_tiered_backtest(
    result: TieredBacktestResult,
    path: str | Path,
    *,
    include_full_details: bool = False,
) -> dict[str, Any]:
    """Write a compact website-facing JSON artifact without hidden state.

    The top-level envelope is intentionally flat enough for the public site to
    render directly: ``tiers`` uses lower-case tier names and ``scenarios`` is
    a one-level mapping with aggregate BERM/M0 metrics.  Per-country score
    cards, coverage, and Israel rows are retained in compact ``details``;
    setting ``include_full_details=True`` additionally embeds all raw rows for
    an archival/research export (which is substantially larger and not the
    normal website asset).
    """
    payload = website_validation_envelope(result, include_full_details=include_full_details)
    output = Path(path)
    output.parent.mkdir(parents=True, exist_ok=True)
    output.write_text(json.dumps(payload, indent=2, sort_keys=True) + "\n", encoding="utf-8")
    return payload


def website_validation_envelope(
    result: TieredBacktestResult,
    *,
    include_full_details: bool = False,
) -> dict[str, Any]:
    """Convert a rich result object into the stable public validation schema."""
    tiers = {
        "core": {
            "name": "Core-51",
            "members": list(result.tier_membership.get("Core-51", ())),
            "membership_locked": True,
        },
        "extended": {
            "name": "Extended",
            "members": list(result.tier_membership.get("Extended", ())),
        },
        "global": {
            "name": "Global",
            "members": list(result.tier_membership.get("Global", ())),
        },
    }
    memberships: dict[str, list[str]] = {}
    for website_tier, details in tiers.items():
        for iso3 in details["members"]:
            memberships.setdefault(iso3, []).append(website_tier)

    flat_scenarios: dict[str, Any] = {}
    compact_details: dict[str, Any] = {}
    for tier, tier_scenarios in result.scenarios.items():
        for scenario_key, scenario in tier_scenarios.items():
            key = f"{tier}/{scenario_key}"
            flat_scenarios[key] = _website_scenario_summary(scenario, name=key)
            compact_details[key] = _compact_scenario_details(scenario)

    payload: dict[str, Any] = {
        "schema_version": GLOBAL_VALIDATION_SCHEMA,
        "version": result.version,
        "locked": False,
        "status": "conditional_hindcast",
        "conditional_hindcast": result.conditional_hindcast,
        "outcome_policy": _json_ready(result.outcome_policy),
        "tiers": tiers,
        "country_memberships": dict(sorted(memberships.items())),
        "scenarios": flat_scenarios,
        "details": {
            "notes": list(result.notes),
            "scenarios": compact_details,
            "full_row_export_included": include_full_details,
        },
    }
    if include_full_details:
        payload["full_result"] = _json_ready(result)
    return payload


def run_and_export_tiered_backtest(
    panel_source: str | Path | Mapping[str, Any],
    output_path: str | Path,
    **kwargs: Any,
) -> TieredBacktestResult:
    """Convenience runner for a Session-1/2 global panel and website artifact."""
    panels = load_global_panel(panel_source)
    result = run_tiered_backtest(panels, **kwargs)
    export_tiered_backtest(result, output_path)
    return result


def _evaluate_country(
    models: FittedGlobalModels,
    iso3: str,
    country_panel: Mapping[int, GlobalPanelRow],
    *,
    test_start: int,
    test_end: int,
) -> tuple[CountryGlobalBacktest, Mapping[str, Counter[str]]]:
    rows: list[Mapping[str, Any]] = []
    berm_errors: list[float] = []
    m0_errors: list[float] = []
    candidate_rows = 0
    eligible_outcomes = 0
    skipped: Counter[str] = Counter()
    outcome_sources: Counter[str] = Counter()
    exposure_statuses: Counter[str] = Counter()
    covariate_imputation: Counter[str] = Counter()
    for year in range(test_start, test_end + 1):
        row = country_panel.get(year)
        if row is None:
            skipped["missing_country_year_row"] += 1
            continue
        candidate_rows += 1
        if not observed_outcome_eligible(row):
            skipped[_outcome_reason(row)] += 1
            continue
        eligible_outcomes += 1
        try:
            berm_prediction = models.berm.predict_from_panel(iso3, country_panel, year)
            # M0 does not read exposure, but is deliberately evaluated only
            # after BERM succeeded so both models see the exact same rows.
            m0_prediction = models.m0.predict_from_panel(iso3, country_panel, year)
        except GlobalDataCoverageError as exc:
            skipped[_prediction_coverage_reason(exc)] += 1
            continue
        assert row.tfr is not None
        berm_residual = berm_prediction.predicted_tfr - row.tfr
        m0_residual = m0_prediction.predicted_tfr - row.tfr
        berm_errors.append(berm_residual)
        m0_errors.append(m0_residual)
        rows.append(
            {
                "country_iso3": iso3,
                "year": year,
                "observed_tfr": row.tfr,
                "tfr_source": row.tfr_source,
                "tfr_measurement_type": row.tfr_measurement_type,
                "berm_predicted_tfr": berm_prediction.predicted_tfr,
                "m0_predicted_tfr": m0_prediction.predicted_tfr,
                "berm_residual": berm_residual,
                "m0_residual": m0_residual,
                "berm_biological_response": berm_prediction.biological_response,
                "berm_demand": berm_prediction.covariate_component,
                "m0_covariate_component": m0_prediction.covariate_component,
                "berm_imputed_features": list(berm_prediction.imputed_features),
                "m0_imputed_features": list(m0_prediction.imputed_features),
                "conditional_hindcast": True,
                "outcome_used_for_prediction": False,
                "future_input_provenance": berm_prediction.future_inputs_used,
            }
        )
        outcome_sources[_source_label(row.tfr_source)] += 1
        exposure = berm_prediction.future_inputs_used["exposure"]
        exposure_statuses[f"mobile:{exposure['mobile_status']}"] += 1
        exposure_statuses[f"urban:{exposure['urban_status']}"] += 1
        covariate_imputation.update(berm_prediction.imputed_features)

    berm = _error_metrics(berm_errors)
    m0 = _error_metrics(m0_errors)
    wins = None if berm.n == 0 else berm.rmse is not None and m0.rmse is not None and berm.rmse < m0.rmse
    return (
        CountryGlobalBacktest(
            country_iso3=iso3,
            train_end=models.berm._require_state().train_end,
            test_start=test_start,
            test_end_requested=test_end,
            berm=berm,
            m0=m0,
            berm_wins=wins,
            coverage={
                "candidate_test_rows": candidate_rows,
                "eligible_observed_outcomes": eligible_outcomes,
                "matched_scored_rows": len(rows),
                "skipped_rows_by_reason": dict(sorted(skipped.items())),
                "berm_train_median_imputations": dict(sorted(Counter(
                    feature for row_data in rows for feature in row_data["berm_imputed_features"]
                ).items())),
            },
            rows=tuple(rows),
        ),
        {
            "outcome_sources": outcome_sources,
            "exposure_statuses": exposure_statuses,
            "covariate_imputation": covariate_imputation,
            "skipped": skipped,
        },
    )


def _error_metrics(errors: Sequence[float]) -> GlobalErrorMetrics:
    if not errors:
        return GlobalErrorMetrics(rmse=None, mae=None, bias=None, max_abs_error=None, n=0)
    return GlobalErrorMetrics(
        rmse=math.sqrt(sum(error * error for error in errors) / len(errors)),
        mae=sum(abs(error) for error in errors) / len(errors),
        bias=sum(errors) / len(errors),
        max_abs_error=max(abs(error) for error in errors),
        n=len(errors),
    )


def _model_summary(models: FittedGlobalModels) -> Mapping[str, Any]:
    berm_state = models.berm._require_state()
    m0_state = models.m0._require_state()
    return {
        "berm": {
            "model_kind": "global_pooled_ridge_times_external_bio_behavior",
            "response_definition": berm_state.response_definition,
            "demand_betas_standardized": dict(berm_state.demand_betas),
            "feature_transform": _json_ready(berm_state.feature_transform),
        },
        "m0": {
            "model_kind": "global_pooled_ridge_covariates_only",
            "response_definition": m0_state.response_definition,
            "betas_standardized": dict(m0_state.demand_betas),
            "feature_transform": _json_ready(m0_state.feature_transform),
        },
        "training_eligibility": _json_ready(models.training_eligibility),
        "country_fitted_effects": "none",
    }


def _website_scenario_summary(scenario: TierScenarioResult, *, name: str) -> Mapping[str, Any]:
    """Return exactly the flat fields the public validation parser consumes."""
    evaluation = scenario.evaluation
    return {
        "name": name,
        "tier": scenario.tier,
        "train_start": scenario.train_start,
        "train_end": scenario.train_end,
        "test_start": scenario.test_start,
        "test_end": scenario.test_end_requested,
        "country_count": scenario.n_tier_countries,
        "countries_scored": evaluation.n_countries_with_scored_rows,
        "status": "conditional_hindcast",
        "aggregate_berm": _json_ready(evaluation.berm),
        "aggregate_m0": _json_ready(evaluation.m0),
        "median_country_berm_rmse": evaluation.median_country_berm_rmse,
        "median_country_m0_rmse": evaluation.median_country_m0_rmse,
        "berm_wins": evaluation.berm_wins,
        "m0_wins_or_ties": evaluation.m0_wins_or_ties,
    }


def _compact_scenario_details(scenario: TierScenarioResult) -> Mapping[str, Any]:
    """Preserve audit-relevant detail without repeating bulky row provenance."""
    evaluation = scenario.evaluation
    per_country = {
        iso3: {
            "berm": _json_ready(result.berm),
            "m0": _json_ready(result.m0),
            "berm_wins": result.berm_wins,
            "coverage": _json_ready(result.coverage),
        }
        for iso3, result in evaluation.per_country.items()
    }
    held_out: Mapping[str, Any] | None = None
    if scenario.country_held_out is not None:
        held_out = {
            "aggregate_berm": _json_ready(scenario.country_held_out.aggregate_berm),
            "aggregate_m0": _json_ready(scenario.country_held_out.aggregate_m0),
            "failed_holds": dict(scenario.country_held_out.failed_holds),
            "per_country": {
                iso3: {
                    "berm": _json_ready(result.berm),
                    "m0": _json_ready(result.m0),
                    "berm_wins": result.berm_wins,
                    "coverage": _json_ready(result.coverage),
                }
                for iso3, result in scenario.country_held_out.per_country.items()
            },
        }
    return {
        "models": _json_ready(scenario.models),
        "training_and_test_coverage": _json_ready(evaluation.input_coverage),
        "per_country": per_country,
        "country_held_out": held_out,
        "israel_residual": _compact_israel(scenario.israel_residual),
    }


def _compact_israel(value: IsraelResidualVisibility) -> Mapping[str, Any]:
    """Keep Israel's actual residual series visible in the compact artifact."""
    return {
        "available": value.available,
        "country_iso3": value.country_iso3,
        "n": value.n,
        "berm_rmse": value.berm_rmse,
        "m0_rmse": value.m0_rmse,
        "berm_bias": value.berm_bias,
        "m0_bias": value.m0_bias,
        "note": value.note,
        "rows": [
            {
                key: row[key]
                for key in (
                    "country_iso3",
                    "year",
                    "observed_tfr",
                    "tfr_source",
                    "tfr_measurement_type",
                    "berm_predicted_tfr",
                    "m0_predicted_tfr",
                    "berm_residual",
                    "m0_residual",
                    "conditional_hindcast",
                )
                if key in row
            }
            for row in value.rows
        ],
    }


def _normalize_panels(panels: GlobalPanels | Mapping[str, Any]) -> dict[str, dict[int, GlobalPanelRow]]:
    if not isinstance(panels, Mapping):
        raise ValueError("global panels must be a mapping")
    # ``load_global_panel`` already accepts raw mappings.  Avoid serializing a
    # dataclass panel just to parse it again.
    for country_rows in panels.values():
        if isinstance(country_rows, Mapping):
            for row in country_rows.values():
                if isinstance(row, GlobalPanelRow):
                    return {
                        str(iso3).upper(): {int(year): value for year, value in rows.items()}
                        for iso3, rows in panels.items()
                    }
            break
    return load_global_panel(panels)


def _normalize_membership(
    membership: Mapping[str, Iterable[str]],
    *,
    available: set[str],
) -> Mapping[str, tuple[str, ...]]:
    aliases = {
        "core": "Core-51",
        "core51": "Core-51",
        "core-51": "Core-51",
        "extended": "Extended",
        "global": "Global",
    }
    resolved: dict[str, tuple[str, ...]] = {"Core-51": (), "Extended": (), "Global": ()}
    for raw_tier, raw_countries in membership.items():
        tier = aliases.get(str(raw_tier).casefold())
        if tier is None:
            continue
        if isinstance(raw_countries, Mapping):
            # The Session-2 artifact stores e.g. ``{"count": 192,
            # "members": ["ABW", ...]}``; accepting it here lets the CLI
            # consume that audited membership directly.
            raw_countries = raw_countries.get(
                "members", raw_countries.get("countries", ())
            )
        resolved[tier] = tuple(
            sorted({str(country).upper() for country in raw_countries} & available)
        )
    return resolved


def _field_present(row: GlobalPanelRow, field: str) -> bool:
    value = getattr(row, field, None)
    return value is not None and math.isfinite(value)


def _exposure_input_present(row: GlobalPanelRow, field: str) -> bool:
    value = getattr(row, field, None)
    if value is None or not math.isfinite(value) or value < 0:
        return False
    status = _panel_field_status(row, field)
    return not any(token in status for token in ("unavailable", "missing", "outside", "extrapolat", "imputed"))


def _panel_field_status(row: GlobalPanelRow, field: str) -> str:
    metadata = (row.field_provenance or {}).get(field)
    if isinstance(metadata, Mapping):
        return str(metadata.get("status", metadata.get("availability", "provided_without_status"))).casefold()
    if isinstance(metadata, str):
        return metadata.casefold()
    missing = (row.missingness or {}).get(field)
    if missing is True:
        return "missing_source"
    return "provided_without_status"


def _outcome_reason(row: GlobalPanelRow) -> str:
    if row.tfr is None or row.tfr <= 0:
        return "missing_or_invalid_tfr"
    measurement = (row.tfr_measurement_type or "").casefold()
    if any(token in measurement for token in ("projection", "derived", "forecast", "extrapolat")):
        return "non_observed_tfr_measurement_type"
    if "wpp" in (row.tfr_source or "").casefold() and row.year >= 2024:
        return "wpp_2024_plus_projection"
    return "ineligible_tfr"


def _prediction_coverage_reason(error: GlobalDataCoverageError) -> str:
    text = str(error).casefold()
    if "mobile" in text or "urban" in text:
        return "missing_or_unavailable_external_exposure"
    if "source row" in text:
        return "missing_exposure_history_row"
    return "prediction_input_coverage_error"


def _source_label(value: str | None) -> str:
    return value if value else "unspecified_source"


def _json_ready(value: Any) -> Any:
    if is_dataclass(value):
        return _json_ready(asdict(value))
    if isinstance(value, Mapping):
        return {str(key): _json_ready(item) for key, item in value.items()}
    if isinstance(value, tuple | list):
        return [_json_ready(item) for item in value]
    if isinstance(value, Path):
        return str(value)
    if isinstance(value, float) and not math.isfinite(value):
        return None
    return value


def _load_membership_from_panel_payload(path: str | Path) -> Mapping[str, Iterable[str]] | None:
    """Read optional ``cohorts``/``tiers`` metadata without changing the panel."""
    try:
        payload = json.loads(Path(path).read_text(encoding="utf-8"))
    except (OSError, json.JSONDecodeError):
        return None
    if not isinstance(payload, Mapping):
        return None
    if any(key.casefold() in {"core", "core-51", "extended", "global"} for key in payload):
        return payload
    for key in ("cohorts", "tiers", "tier_membership"):
        candidate = payload.get(key)
        if isinstance(candidate, Mapping):
            return candidate
    metadata = payload.get("metadata")
    if isinstance(metadata, Mapping):
        for key in ("cohorts", "tiers", "tier_membership"):
            candidate = metadata.get(key)
            if isinstance(candidate, Mapping):
                return candidate
    return None


def main(argv: Sequence[str] | None = None) -> int:
    """CLI: read global panel JSON, run tiers, and export one website artifact."""
    parser = argparse.ArgumentParser(description="Run global hierarchical BERM backtests")
    parser.add_argument("--panel", required=True, help="all_countries_panel.json from the global data route")
    parser.add_argument("--output", required=True, help="JSON artifact to write")
    parser.add_argument("--core51-artifact", default=str(DEFAULT_CORE51_ARTIFACT))
    parser.add_argument(
        "--tiers",
        "--tier-membership",
        dest="tier_membership",
        help=(
            "optional cohort_tiers.json from Session 2; defaults to a sibling "
            "cohort_tiers.json when present, otherwise derives coverage-only tiers"
        ),
    )
    parser.add_argument("--end-year", type=int, default=DEFAULT_END_YEAR)
    parser.add_argument("--alpha", type=float, default=DEFAULT_RIDGE_ALPHA)
    parser.add_argument("--memory-window-years", type=int)
    parser.add_argument("--no-country-loocv", action="store_true")
    args = parser.parse_args(argv)

    panels = load_global_panel(args.panel)
    membership_path = args.tier_membership
    if membership_path is None:
        sibling = Path(args.panel).with_name("cohort_tiers.json")
        membership_path = str(sibling) if sibling.is_file() else args.panel
    membership = _load_membership_from_panel_payload(membership_path)
    result = run_tiered_backtest(
        panels,
        tier_membership=membership,
        core51_artifact_path=args.core51_artifact,
        end_year=args.end_year,
        alpha=args.alpha,
        memory_window_years=args.memory_window_years,
        include_country_held_out=not args.no_country_loocv,
    )
    payload = export_tiered_backtest(result, args.output)
    total_scenarios = sum(len(tier) for tier in result.scenarios.values())
    print(
        f"Wrote {args.output}: {total_scenarios} tier scenarios; "
        f"{sum(len(values) for values in result.tier_membership.values())} tier memberships."
    )
    # Keep payload referenced so static analyzers do not mistake export for a
    # write-only side effect; the return code is deliberately conventional.
    del payload
    return 0


if __name__ == "__main__":  # pragma: no cover - CLI entrypoint
    raise SystemExit(main())


__all__ = [
    "CountryGlobalBacktest",
    "CountryHeldOutValidation",
    "DEFAULT_CORE51_ARTIFACT",
    "DEFAULT_END_YEAR",
    "DEFAULT_TIER_TRAIN_ENDS",
    "DEFAULT_TIER_TRAIN_STARTS",
    "GLOBAL_BACKTEST_VERSION",
    "GLOBAL_VALIDATION_SCHEMA",
    "GlobalErrorMetrics",
    "GlobalEvaluation",
    "IsraelResidualVisibility",
    "TierScenarioResult",
    "TieredBacktestResult",
    "classify_global_tiers",
    "country_held_out_validation",
    "evaluate_global_models",
    "export_tiered_backtest",
    "israel_residual_visibility",
    "load_published_core51_iso3",
    "main",
    "run_and_export_tiered_backtest",
    "run_tier_scenario",
    "run_tiered_backtest",
    "website_validation_envelope",
]
