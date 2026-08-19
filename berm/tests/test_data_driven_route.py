"""Tests for the parallel data-driven prediction route.

Two things are being protected here. First, that the data-driven route actually
runs on the acquired WPP base and reports what it rests on. Second, and more
important, that it does not disturb the legacy route: the active prediction's
default output must not move (working rule 10), and the hand-typed ASFR table
must stay in place (working rule 5).
"""

from __future__ import annotations

import pytest

from berm.data import wpp

pytestmark = pytest.mark.skipif(
    not (wpp.OUT_ASFR.exists() and wpp.OUT_TFR.exists()),
    reason="canonical WPP products absent; run `python -m berm.data.wpp ingest`",
)

from berm.model_data_driven import (  # noqa: E402
    EXPOSURE_SCENARIOS,
    MODEL_VERSION,
    PATCHABLE_PARAMETERS,
    UNVARIABLE_PARAMETERS,
    compare_routes,
    diagnostic_mechanisms,
    parameter_sensitivity,
    predict_country_year_data_driven,
    predict_country_year_legacy,
    predict_data_driven,
)
from berm.outcomes.asfr_data_driven import (  # noqa: E402
    DEFAULT_REFERENCE_YEAR,
    compare_asfr_routes,
    predict_asfr_data_driven,
    resolve_geography,
)


@pytest.fixture(scope="module")
def result():
    return predict_data_driven(
        geography="FIN",
        year=2030,
        model_version="reserve-asfr-v1",
        exposure_scenario="observed_plus_projection",
    )


class TestLegacyRouteIsUndisturbed:
    """The strongest requirement: adding a route must move nothing."""

    def test_active_prediction_default_output_unchanged(self):
        r = predict_country_year_legacy("Finland", 2030)
        assert r["predicted_tfr"] == pytest.approx(1.3209, abs=1e-4)
        assert r["biological_tfr"] == pytest.approx(1.1954, abs=1e-4)

    def test_active_prediction_unchanged_after_data_driven_call(self):
        """Sensitivity analysis patches v16 globals; it must restore them."""
        before = predict_country_year_legacy("Finland", 2030)["predicted_tfr"]
        predict_data_driven(geography="FIN", year=2035)
        after = predict_country_year_legacy("Finland", 2030)["predicted_tfr"]
        assert after == pytest.approx(before, abs=1e-9)

    def test_v16_module_constants_are_restored_after_sensitivity(self):
        import berm.v16 as v16

        before = {a: getattr(v16, a) for a in PATCHABLE_PARAMETERS.values()}
        parameter_sensitivity("FIN", 2030)
        after = {a: getattr(v16, a) for a in PATCHABLE_PARAMETERS.values()}
        assert before == after

    def test_legacy_asfr_table_still_present_and_unmodified(self):
        from berm.data.asfr import WPP_ASFR

        assert len(WPP_ASFR) == 57
        assert WPP_ASFR["Finland"][2024] == (4.0, 22.0, 55.0, 72.0, 42.0, 10.0, 0.5)

    def test_legacy_asfr_route_still_works(self):
        from berm.outcomes.asfr_model import predict_asfr

        assert predict_asfr("Finland", 2030)["predicted_tfr"] > 0


class TestGeographyResolution:
    def test_accepts_iso3(self):
        assert resolve_geography("FIN") == ("FIN", "Finland")

    def test_accepts_berm_name(self):
        assert resolve_geography("Finland") == ("FIN", "Finland")

    def test_rejects_unknown(self):
        with pytest.raises(KeyError, match="neither an ISO3 code nor"):
            resolve_geography("Atlantis")


class TestAsfrBase:
    def test_reference_year_is_an_estimate_not_a_projection(self):
        assert DEFAULT_REFERENCE_YEAR == 2023
        rec = predict_asfr_data_driven("FIN", 2030)
        assert rec["reference_series_status"] == "ESTIMATE"

    def test_base_rates_come_from_wpp_not_the_legacy_table(self):
        rec = predict_asfr_data_driven("FIN", 2030)
        published = wpp.load_asfr("FIN", DEFAULT_REFERENCE_YEAR)
        assert rec["reference_asfr"] == published["values"]
        assert rec["source_id"] == wpp.SOURCE_ID_ASFR
        assert rec["wpp_revision"] == "WPP2024"

    def test_tfr_is_the_sum_of_predicted_asfr(self):
        rec = predict_asfr_data_driven("FIN", 2030)
        assert rec["predicted_tfr"] == pytest.approx(
            5.0 * sum(rec["predicted_asfr"]) / 1000.0
        )

    def test_seven_age_groups_with_birth_cohorts(self):
        rec = predict_asfr_data_driven("FIN", 2030)
        assert len(rec["age_groups"]) == 7
        for g in rec["age_groups"]:
            assert g["birth_cohort"] == 2030 - g["mid_age"]

    def test_missing_geography_raises_rather_than_guessing(self):
        with pytest.raises(KeyError):
            predict_asfr_data_driven("ZZZ", 2030)

    def test_missing_reference_year_raises(self):
        with pytest.raises(LookupError, match="no WPP ASFR"):
            predict_asfr_data_driven("FIN", 2030, reference_year=1800)

    def test_works_for_every_berm_country(self):
        from berm.data.loader import _BERM_TO_ISO3

        failures = []
        for berm_name, iso3 in sorted(_BERM_TO_ISO3.items()):
            try:
                rec = predict_asfr_data_driven(iso3, 2030)
                if not (0.0 <= rec["predicted_tfr"] < 12.0):
                    failures.append(f"{iso3}: implausible TFR {rec['predicted_tfr']}")
            except Exception as exc:  # noqa: BLE001
                failures.append(f"{iso3}: {type(exc).__name__}: {exc}")
        assert not failures, "\n".join(failures)


class TestReturnedContract:
    def test_returns_every_required_field(self, result):
        assert set(result) >= {
            "prediction", "uncertainty_interval", "input_provenance",
            "assumptions", "active_mechanisms", "diagnostic_mechanisms_excluded",
            "data_coverage", "warnings",
        }

    def test_prediction_states_its_derivation(self, result):
        p = result["prediction"]
        assert p["model_version"] == MODEL_VERSION
        assert p["geography_id"] == "FIN"
        assert p["tfr"] == pytest.approx(5.0 * sum(p["asfr"]) / 1000.0)
        assert "5 * sum(ASFR)" in p["derivation"]

    def test_rejects_unknown_model_version(self):
        with pytest.raises(ValueError, match="unknown model_version"):
            predict_data_driven(geography="FIN", year=2030, model_version="nope")

    def test_rejects_unknown_exposure_scenario(self):
        with pytest.raises(ValueError, match="unknown exposure_scenario"):
            predict_data_driven(geography="FIN", year=2030, exposure_scenario="nope")

    def test_exposure_scenarios_are_declared(self):
        assert "observed_plus_projection" in EXPOSURE_SCENARIOS


class TestProvenanceIsHonest:
    def test_asfr_base_is_labelled_observed_and_not_a_proxy(self, result):
        base = result["input_provenance"]["asfr_base"]
        assert base["measurement_type"] == "OBSERVED"
        assert base["is_proxy"] is False
        assert len(base["checksum_sha256"]) == 64
        assert base["citation"]

    def test_exposure_is_labelled_a_scenario_parameter_and_a_proxy(self, result):
        exp = result["input_provenance"]["exposure"]
        assert exp["measurement_type"] == "SCENARIO_PARAMETER"
        assert exp["is_proxy"] is True, (
            "the exposure route is still a hardcoded curve; labelling it an "
            "observation would be the exact failure this architecture exists to "
            "prevent"
        )

    def test_cultural_rate_is_disclosed_as_fitted_per_country(self, result):
        cult = result["input_provenance"]["cultural_rate"]
        assert "one free parameter per observation" in cult["detail"]

    def test_assumption_share_is_reported(self, result):
        a = result["assumptions"]
        assert a["parameters_in_active_model"] > 40
        assert 0.5 < a["assumed_share"] <= 1.0
        assert set(a["by_evidence_grade"]) <= {
            "MEASURED", "ESTIMATED", "SCENARIO", "UNIDENTIFIED"
        }


class TestMechanismSeparation:
    def test_diagnostic_mechanisms_are_read_from_the_source(self):
        names = diagnostic_mechanisms()
        assert "vagal_oxytocin_pathway" in names
        assert "endogenous_ssri_model" in names
        assert "sempou_mtor_effect" in names

    def test_active_mechanism_is_not_listed_as_diagnostic(self):
        assert "emf_behavioral_factor_v3" not in diagnostic_mechanisms()

    def test_no_mechanism_is_both_active_and_excluded(self, result):
        assert not (set(result["active_mechanisms"])
                    & set(result["diagnostic_mechanisms_excluded"]))


class TestUncertainty:
    def test_interval_brackets_the_central_prediction(self, result):
        lo, hi = result["uncertainty_interval"]
        assert lo <= result["prediction"]["tfr"] <= hi

    def test_interval_is_not_claimed_to_be_a_confidence_interval(self, result):
        detail = result["uncertainty_detail"]
        assert detail["is_confidence_interval"] is False
        assert detail["method"] == "one_at_a_time_envelope"

    def test_unvariable_parameters_are_disclosed(self, result):
        not_varied = result["uncertainty_detail"]["parameters_not_variable"]
        assert "bio_capacity.b" in not_varied, (
            "the most consequential parameter cannot be varied; concealing that "
            "would make the interval look more informative than it is"
        )
        assert set(not_varied) == set(UNVARIABLE_PARAMETERS)

    def test_every_varied_parameter_is_registered_with_a_range(self):
        from berm.data.registry import load_parameter_registry

        registry = load_parameter_registry()
        for name in PATCHABLE_PARAMETERS:
            assert name in registry, f"{name} is varied but not registered"
            assert registry[name].prior_or_range.startswith("[")

    def test_warnings_state_that_the_interval_understates_uncertainty(self, result):
        assert any("UNDERSTATES" in w for w in result["warnings"])

    def test_sensitivity_ranks_parameters_by_swing(self):
        s = parameter_sensitivity("FIN", 2030)
        swings = [p["swing"] for p in s["per_parameter"]]
        assert swings == sorted(swings, reverse=True)


class TestDataCoverageAndBenchmark:
    def test_reports_wpp_benchmark_without_claiming_it_validates_berm(self, result):
        bench = result["data_coverage"]["wpp_benchmark"]
        assert bench["wpp_series_status"] == "PROJECTION_MEDIUM"
        assert "not a BERM output" in bench["note"]

    def test_benchmark_interval_brackets_the_wpp_medium(self, result):
        bench = result["data_coverage"]["wpp_benchmark"]
        lo, hi = bench["wpp_95pi_tfr"]
        assert lo <= bench["wpp_medium_tfr"] <= hi

    def test_coverage_reports_the_geography_count(self, result):
        assert result["data_coverage"]["geographies_in_asfr_product"] == 237


class TestRouteComparisonIsReported:
    def test_routes_are_compared_not_merged(self):
        c = compare_routes("FIN", 2030)
        assert c["legacy_tfr"] != c["data_driven_tfr"]
        assert c["absolute_difference"] == pytest.approx(
            c["data_driven_tfr"] - c["legacy_tfr"]
        )

    def test_comparison_warns_that_engine_and_data_both_differ(self):
        c = compare_routes("FIN", 2030)
        assert "not attributable to the data source alone" in c["note"]

    def test_asfr_level_comparison_isolates_the_data_source(self):
        """Engine held fixed, only the ASFR base differs."""
        c = compare_asfr_routes("FIN", 2030)
        assert c is not None
        assert len(c["per_age_group"]) == 7
        assert c["legacy_tfr"] != c["data_driven_tfr"]

    def test_asfr_comparison_covers_every_legacy_country(self):
        from berm.data.asfr import WPP_ASFR

        missing = [
            c for c in sorted(WPP_ASFR)
            if compare_asfr_routes(c, 2030) is None
        ]
        assert not missing, f"no comparison available for: {missing}"


class TestDefectsSurfacedByParallelValidation:
    """Findings the side-by-side run exposed in the legacy route.

    These tests do not assert that the legacy behaviour is correct. They pin its
    current extent so that it cannot spread unnoticed, and so that a fix is
    visible as a deliberate test change. See audit finding A-15.
    """

    KNOWN_ZERO_CLAMPED = {"Singapore"}

    def test_legacy_zero_clamp_has_not_spread(self):
        """`max(0.0, sigmoid + cultural)` can drive a prediction to a hard zero."""
        from berm.data.asfr import WPP_ASFR

        clamped = {
            country
            for country in WPP_ASFR
            for year in (2030, 2040, 2050)
            if predict_country_year_legacy(country, year)["predicted_tfr"] <= 1e-3
        }
        assert clamped == self.KNOWN_ZERO_CLAMPED, (
            f"the set of countries the legacy route clamps to zero TFR changed: "
            f"{sorted(clamped)}. A zero here is an artefact of the additive "
            f"cultural term exceeding the biological signal, not a prediction."
        )

    def test_legacy_prediction_is_time_invariant_where_exposure_saturates(self):
        """Ambient EMF saturates at the tanh ceiling, freezing the prediction."""
        years = (2030, 2040, 2050)
        emf = {predict_country_year_legacy("Singapore", y)["combined_emf"]
               for y in years}
        tfr = {predict_country_year_legacy("Singapore", y)["predicted_tfr"]
               for y in years}
        assert emf == {2.0}, "expected saturated exposure at the ceiling"
        assert len(tfr) == 1, (
            "a saturated exposure makes the legacy prediction constant across "
            "decades; this is a property of the ceiling, not of demography"
        )

    def test_data_driven_route_does_not_clamp_to_zero(self):
        from berm.data.asfr import WPP_ASFR

        zeros = [
            country for country in sorted(WPP_ASFR)
            if predict_asfr_data_driven(country, 2030)["predicted_tfr"] <= 1e-3
        ]
        assert not zeros, (
            f"the data-driven route produced a zero TFR for {zeros}; it scales an "
            f"observed base multiplicatively and should never reach a hard zero"
        )
