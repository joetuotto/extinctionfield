"""Safety tests for the fail-closed CSLI public interface.

The legacy numeric routines remain private method-development helpers.  These
tests assert that public APIs cannot convert sparse/reconstructed inputs into
apparently quantitative evidence.
"""

from __future__ import annotations

import json
from pathlib import Path

from berm.stats.csli import (
    _parse_winter_year,
    cross_species_lag_comparison,
    current_csli_readiness,
    estimate_lag_kernel,
    export_current_csli_readiness,
    generate_locked_prediction,
    lag_invariance_test,
    latent_common_shock,
    load_bee_data,
    load_bird_data,
    load_emf_data,
    load_sperm_data,
    load_tfr_data,
    print_full_csli_diagnostic,
    prospective_sentinel_test,
    test_biological_scaling as biological_scaling,
)


NUMERIC_EVIDENCE_FIELDS = {
    "lag_weights",
    "mean_lag",
    "peak_lag",
    "r_squared",
    "cv",
    "hit_rate",
    "ci_95",
    "predictions",
    "model_comparison",
    "first_pc_explains",
}


def assert_no_numeric_evidence(result: dict) -> None:
    assert not (NUMERIC_EVIDENCE_FIELDS & result.keys())


def eligible_contract() -> dict:
    """Minimal explicit contract for a synthetic, fully observed panel."""

    return {
        "schema_version": "csli-readiness/v1",
        "artifact_version": "fixture-v1",
        "artifact_sha256": "fixture-sha256",
        "outcome": {
            "measurement_status": "OBSERVED",
            "endpoint_valid_for_csli": True,
            "verified_calendar_year_coverage": True,
            "geography_level": "region",
            "geography_match_status": "EXACT",
        },
        "exposure": {
            "measurement_status": "OBSERVED",
            "measured_rf": True,
            "verified_calendar_year_coverage": True,
            "geography_level": "region",
            "geography_match_status": "EXACT",
        },
        "covariates": {
            "complete_for_analysis": True,
            "required_fields": ["chemical_exposure", "weather"],
        },
    }


def annual_fixture() -> tuple[dict[str, dict[int, float]], dict[str, dict[int, float]]]:
    years = range(1998, 2012)
    exposure = {
        "AAA": {year: float(year - 1997) for year in years},
        "BBB": {year: float((year - 1997) * 2) for year in years},
    }
    outcome = {
        "AAA": {year: float(year - 1998) for year in range(2000, 2012)},
        "BBB": {year: float((year - 1998) * 1.5) for year in range(2000, 2012)},
    }
    return outcome, exposure


class TestParseWinterYear:
    def test_standard(self):
        assert _parse_winter_year("2015-16") == 2016

    def test_century_boundary(self):
        assert _parse_winter_year("1999-00") == 2000


class TestCurrentSourcesAreBlocked:
    def test_current_raw_loaders_remain_readable(self):
        assert load_bee_data()
        assert load_bird_data()
        assert load_sperm_data()
        assert load_emf_data()
        assert load_tfr_data()

    def test_bare_current_sources_cannot_produce_lag_weights(self):
        result = estimate_lag_kernel(load_bee_data(), load_emf_data())
        assert result["status"] == "NOT_ELIGIBLE"
        assert result["analysis"] == "lag_kernel"
        assert result["reasons"][0]["code"] == "INPUT_METADATA_REQUIRED"
        assert_no_numeric_evidence(result)

    def test_current_cross_species_and_invariance_are_blocked(self):
        sentinel = {
            "bees": load_bee_data(),
            "birds": load_bird_data(),
            "human_sperm": load_sperm_data(),
        }
        comparison = cross_species_lag_comparison(sentinel, load_emf_data())
        invariance = lag_invariance_test("birds", load_bird_data(), load_emf_data())
        assert comparison["status"] == "NOT_ELIGIBLE"
        assert invariance["status"] == "NOT_ELIGIBLE"
        assert_no_numeric_evidence(comparison)
        assert_no_numeric_evidence(invariance)

    def test_current_common_shock_and_prospective_paths_are_retired(self):
        shock = latent_common_shock(
            {"bees": load_bee_data(), "birds": load_bird_data()},
            load_emf_data(),
            load_tfr_data(),
        )
        prospective = prospective_sentinel_test(load_bee_data(), load_tfr_data(), load_emf_data())
        locked = generate_locked_prediction(["AAA"], "BBB", 2030, 2.0, 1.0)
        assert shock["status"] == "BLOCKED"
        assert prospective["status"] == "BLOCKED"
        assert locked["status"] == "BLOCKED"
        assert_no_numeric_evidence(shock)
        assert_no_numeric_evidence(prospective)
        assert_no_numeric_evidence(locked)

    def test_current_readiness_report_states_concrete_data_blockers(self, capsys):
        result = current_csli_readiness()
        codes = {reason["code"] for reason in result["reasons"]}
        assert result["status"] == "BLOCKED"
        assert {"MEASURED_RF_REQUIRED", "SPERM_SERIES_RECONSTRUCTED", "DOG_PANEL_UNMATCHED"} <= codes
        printed = print_full_csli_diagnostic()
        assert printed == result
        assert "No lag, correlation, confidence interval" in capsys.readouterr().out


class TestLagReadinessAndLeakageProtection:
    def test_verified_annual_fixture_can_use_public_kernel(self):
        outcome, exposure = annual_fixture()
        result = estimate_lag_kernel(
            outcome,
            exposure,
            max_lag=2,
            n_spline_knots=2,
            readiness=eligible_contract(),
        )
        assert result["status"] == "ELIGIBLE"
        assert result["analysis"] == "lag_kernel"
        assert result["readiness"] if "readiness" in result else True
        assert len(result["lag_weights"]) == 3

    def test_missing_internal_exposure_is_blocked_not_zero_filled(self):
        outcome, exposure = annual_fixture()
        del exposure["AAA"][2004]
        result = estimate_lag_kernel(
            outcome,
            exposure,
            max_lag=2,
            n_spline_knots=2,
            readiness=eligible_contract(),
        )
        codes = {reason["code"] for reason in result["reasons"]}
        assert result["status"] == "NOT_ELIGIBLE"
        assert "MISSING_EXPOSURE_LAG_HISTORY" in codes
        assert_no_numeric_evidence(result)

    def test_sparse_observation_positions_cannot_be_called_year_lags(self):
        outcome, exposure = annual_fixture()
        del outcome["AAA"][2004]
        result = lag_invariance_test(
            "fixture",
            outcome,
            exposure,
            max_lag=2,
            readiness=eligible_contract(),
        )
        codes = {reason["code"] for reason in result["reasons"]}
        assert result["status"] == "NOT_ELIGIBLE"
        assert "IRREGULAR_OUTCOME_CALENDAR" in codes
        assert_no_numeric_evidence(result)

    def test_mobile_like_or_reconstructed_metadata_cannot_be_asserted_eligible(self):
        outcome, exposure = annual_fixture()
        contract = eligible_contract()
        contract["exposure"]["measured_rf"] = False
        contract["outcome"]["measurement_status"] = "RECONSTRUCTED"
        result = estimate_lag_kernel(outcome, exposure, max_lag=2, readiness=contract)
        codes = {reason["code"] for reason in result["reasons"]}
        assert {"MEASURED_RF_REQUIRED", "OUTCOME_NOT_VERIFIED_OBSERVED"} <= codes
        assert_no_numeric_evidence(result)

    def test_biological_scaling_requires_validated_lag_artifact(self):
        result = biological_scaling({"bees": 1.0, "birds": 2.0, "human_tfr": 4.0})
        assert result["status"] == "NOT_ELIGIBLE"
        assert_no_numeric_evidence(result)


class TestReadinessArtifact:
    def test_export_has_no_legacy_numeric_fields(self, tmp_path: Path):
        target = tmp_path / "csli_readiness.json"
        result = export_current_csli_readiness(target)
        assert result["status"] == "BLOCKED"
        assert json.loads(target.read_text()) == result
        assert_no_numeric_evidence(result)

    def test_legacy_website_artifact_is_withdrawn_stub(self):
        """The legacy public artifact must be absent or an explicit WITHDRAWN stub.

        The stub was deleted from the website in a05a3a7 ("data cleanup");
        absence satisfies the withdrawal requirement. If the file ever returns,
        it must not carry numeric evidence.
        """
        artifact = Path(__file__).resolve().parents[2] / "website" / "public" / "data" / "csli_results.json"
        if not artifact.exists():
            return
        payload = json.loads(artifact.read_text())
        assert payload["status"] == "WITHDRAWN"
        assert payload["replacement"] == "/data/sentinel_readiness.json"
        assert_no_numeric_evidence(payload)
