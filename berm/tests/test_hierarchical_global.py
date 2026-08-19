"""Contracts for the train-only global hierarchical BERM route."""

from __future__ import annotations

from dataclasses import replace
import json

import pytest

from berm.stats.global_backtest import (
    country_held_out_validation,
    evaluate_global_models,
    export_tiered_backtest,
    israel_residual_visibility,
    load_published_core51_iso3,
    run_tier_scenario,
    run_tiered_backtest,
)
from berm.stats.hierarchical import (
    GlobalDataCoverageError,
    GlobalPanelRow,
    HierarchicalBERM,
    annual_external_exposure,
    fit_paired_global_models,
    load_global_panel,
    observed_outcome_eligible,
    pure_external_bio_behavior,
)


def _row(iso3: str, year: int, *, offset: float = 0.0) -> GlobalPanelRow:
    elapsed = year - 2000
    return GlobalPanelRow(
        country_iso3=iso3,
        year=year,
        tfr=3.5 + offset - 0.045 * elapsed,
        tfr_source="World Bank fallback",
        tfr_measurement_type="observed",
        mobile_per_100=5.0 + 4.0 * elapsed + offset,
        urban_pct=35.0 + 0.8 * elapsed + offset,
        gdp_ppp_per_capita=4_000.0 + 900.0 * elapsed + 250.0 * offset,
        contraception_pct=25.0 + 1.2 * elapsed,
        education_years_female=6.0 + 0.12 * elapsed,
        religiosity_pct=75.0 - 0.3 * elapsed,
        immigrant_share=2.0 + 0.1 * elapsed,
        ivf_share=None if iso3 == "ZZZ" and year % 2 else 0.01 + 0.001 * elapsed,
        field_provenance={
            "mobile_per_100": {"status": "observed"},
            "urban_pct": {"status": "observed"},
            "gdp_ppp_per_capita": {"status": "observed"},
        },
        missingness={"ivf_share": iso3 == "ZZZ" and year % 2 == 1},
    )


@pytest.fixture
def panels() -> dict[str, dict[int, GlobalPanelRow]]:
    offsets = {"AAA": 0.0, "BBB": -0.2, "ISR": 0.35, "ZZZ": 0.6}
    return {
        iso3: {year: _row(iso3, year, offset=offset) for year in range(2000, 2016)}
        for iso3, offset in offsets.items()
    }


def _replace_rows(
    panels: dict[str, dict[int, GlobalPanelRow]],
    iso3: str,
    replacements: dict[int, GlobalPanelRow],
) -> dict[str, dict[int, GlobalPanelRow]]:
    changed = {country: dict(rows) for country, rows in panels.items()}
    changed[iso3].update(replacements)
    return changed


def test_loader_accepts_canonical_panel_and_preserves_provenance():
    raw = {
        "schema_version": "fixture",
        "countries": {
            "FIN": {
                "years": {
                    "2000": {
                        "tfr": {"value": 1.7, "source": "WPP"},
                        "tfr_measurement_type": "observed",
                        "mobile_per_100": 72.0,
                        "urban_pct": 61.0,
                        "gdp_ppp_per_capita": 30_000.0,
                        "contraception_pct": 75.0,
                        "field_provenance": {
                            "mobile_per_100": {"status": "interpolated", "lower_year": 1999, "upper_year": 2001},
                            "urban_pct": {"status": "observed"},
                        },
                    }
                }
            }
        },
    }
    parsed = load_global_panel(raw)
    row = parsed["FIN"][2000]
    assert row.tfr == 1.7
    assert row.tfr_source == "WPP"
    assert row.field_provenance["mobile_per_100"]["status"] == "interpolated"
    assert annual_external_exposure(row).mobile_status == "interpolated"


def test_global_exposure_has_no_legacy_country_layers_and_rejects_extrapolation(panels):
    exposure = annual_external_exposure(panels["AAA"][2005])
    assert exposure.pretelecom_layers["military_ambient"]["value"] == 0.0
    assert exposure.pretelecom_layers["military_ambient"]["classification"] == "SCENARIO_PARAMETER/default_zero"
    assert exposure.total == pytest.approx(
        exposure.ambient + exposure.chi * exposure.personal
    )

    bad = replace(
        panels["AAA"][2005],
        field_provenance={
            "mobile_per_100": {"status": "extrapolated"},
            "urban_pct": {"status": "observed"},
        },
    )
    with pytest.raises(GlobalDataCoverageError, match="mobile_per_100"):
        annual_external_exposure(bad)


def test_pure_response_does_not_depend_on_country_parameters(monkeypatch):
    import berm.v16

    def forbidden(*args, **kwargs):
        raise AssertionError("country nutrition lookup must not be called")

    monkeypatch.setattr(berm.v16, "v12_nutrition_modifier", forbidden)
    assert pure_external_bio_behavior(10.0) > 0.0


def test_fit_is_invariant_to_post_cutoff_tfr_exposure_and_covariates(panels):
    fitted = fit_paired_global_models(panels, train_start=2000, train_end=2010)
    replacements = {}
    for year in range(2011, 2016):
        source = panels["AAA"][year]
        replacements[year] = replace(
            source,
            tfr=9.9,
            mobile_per_100=999.0,
            urban_pct=99.0,
            gdp_ppp_per_capita=999_999.0,
            contraception_pct=99.0,
        )
    changed = _replace_rows(panels, "AAA", replacements)
    re_fitted = fit_paired_global_models(changed, train_start=2000, train_end=2010)

    assert fitted.berm.state == re_fitted.berm.state
    assert fitted.m0.state == re_fitted.m0.state


def test_prediction_never_reads_its_observed_tfr_and_future_missing_covariate_uses_train_median(panels):
    model = HierarchicalBERM().fit(panels, train_start=2000, train_end=2010)
    baseline = model.predict("AAA", 2012, panels)
    changed_target = _replace_rows(
        panels, "AAA", {2012: replace(panels["AAA"][2012], tfr=9.5)}
    )
    assert model.predict("AAA", 2012, changed_target) == baseline

    missing_future = _replace_rows(
        panels,
        "AAA",
        {
            2012: replace(
                panels["AAA"][2012],
                ivf_share=None,
                missingness={"ivf_share": True},
            )
        },
    )
    prediction = model.predict("AAA", 2012, missing_future)
    assert "ivf_share" in prediction.imputed_features
    assert prediction.conditional_hindcast
    assert not prediction.outcome_used_for_prediction


def test_m0_has_same_rows_but_does_not_read_mobile_at_prediction(panels):
    models = fit_paired_global_models(panels, train_start=2000, train_end=2010)
    baseline_berm = models.berm.predict("AAA", 2012, panels)
    baseline_m0 = models.m0.predict("AAA", 2012, panels)
    changed = _replace_rows(
        panels,
        "AAA",
        {2012: replace(panels["AAA"][2012], mobile_per_100=999.0)},
    )
    assert models.berm.predict("AAA", 2012, changed).predicted_tfr != pytest.approx(
        baseline_berm.predicted_tfr
    )
    assert models.m0.predict("AAA", 2012, changed) == baseline_m0


def test_evaluation_is_matched_and_wpp_2024_is_not_scored(panels):
    panels["AAA"][2015] = replace(
        panels["AAA"][2015],
        year=2015,
        tfr_source="WPP 2024 revision",
        tfr_measurement_type="projection",
    )
    models = fit_paired_global_models(panels, train_start=2000, train_end=2010)
    evaluation = evaluate_global_models(models, panels, test_start=2011, test_end=2015)
    country = evaluation.per_country["AAA"]
    assert country.berm.n == country.m0.n == 4
    assert country.coverage["skipped_rows_by_reason"]["non_observed_tfr_measurement_type"] == 1
    assert evaluation.berm.n == evaluation.m0.n


def test_country_held_out_fit_does_not_use_held_out_train_tfr_or_covariates(panels):
    baseline = country_held_out_validation(
        panels, train_start=2000, train_end=2010, test_end=2015
    )
    replacements = {}
    for year in range(2000, 2011):
        source = panels["ISR"][year]
        replacements[year] = replace(
            source,
            tfr=9.9,
            gdp_ppp_per_capita=999_999.0,
            contraception_pct=99.0,
        )
    changed = _replace_rows(panels, "ISR", replacements)
    re_run = country_held_out_validation(
        changed, train_start=2000, train_end=2010, test_end=2015
    )
    baseline_rows = baseline.per_country["ISR"].rows
    changed_rows = re_run.per_country["ISR"].rows
    assert [row["berm_predicted_tfr"] for row in baseline_rows] == [
        row["berm_predicted_tfr"] for row in changed_rows
    ]
    assert [row["m0_predicted_tfr"] for row in baseline_rows] == [
        row["m0_predicted_tfr"] for row in changed_rows
    ]


def test_israel_visibility_and_json_export_have_coverage_and_imputation(panels, tmp_path):
    scenario = run_tier_scenario(
        "Global",
        panels,
        train_start=2000,
        train_end=2010,
        end_year=2015,
        include_country_held_out=True,
    )
    israel = israel_residual_visibility(scenario.evaluation.per_country)
    assert israel.available
    assert israel.n == 5
    assert all("berm_residual" in row for row in israel.rows)

    result = run_tiered_backtest(
        panels,
        tier_membership={"Global": panels.keys()},
        train_starts={"Global": 2000},
        train_ends={"Global": (2010,)},
        end_year=2015,
        include_country_held_out=False,
    )
    output = tmp_path / "global_backtest.json"
    payload = export_tiered_backtest(result, output)
    saved = json.loads(output.read_text(encoding="utf-8"))
    scenario_payload = saved["scenarios"]["Global/train_2000_2010"]
    assert payload["conditional_hindcast"]
    assert payload["tiers"]["global"]["members"] == sorted(panels)
    assert scenario_payload["aggregate_berm"]["rmse"] is not None
    details = saved["details"]["scenarios"]["Global/train_2000_2010"]
    assert details["models"]["country_fitted_effects"] == "none"
    assert "post_cutoff_exposure_statuses" in details["training_and_test_coverage"]


def test_published_core51_is_derived_from_artifact_not_prompt_list(tmp_path):
    artifact = tmp_path / "rolling_backtest.json"
    artifact.write_text(
        json.dumps(
            {
                "panel": {
                    "panels": {
                        "Alpha": {"iso3": "AAA"},
                        "Israel": {"iso3": "ISR"},
                    }
                }
            }
        ),
        encoding="utf-8",
    )
    assert load_published_core51_iso3(artifact) == frozenset({"AAA", "ISR"})


def test_wpp_2024_is_projection_even_without_explicit_measurement_type():
    row = _row("AAA", 2024)
    projected = replace(row, tfr_source="UN WPP 2024")
    wb_fallback = replace(row, tfr_source="World Bank fallback")
    assert not observed_outcome_eligible(projected)
    assert observed_outcome_eligible(wb_fallback)
