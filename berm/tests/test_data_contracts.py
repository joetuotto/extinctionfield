"""Contract tests for canonical BERM data products.

The point of these tests is that a wrong unit, a wrong year, a bad geocode or a
missing provenance field is a hard error, not a silent value that reaches the
model. Each test states one way the contract can be violated and asserts that
the violation is caught by name.
"""

from __future__ import annotations

import datetime as dt

import pytest

from berm.data.contracts import (
    CANONICAL_TABLES,
    DataContractError,
    GeographyLevel,
    MeasurementType,
    REQUIRED_COLUMNS,
    Sex,
    validate_frame,
    validate_rows,
)

TODAY = dt.date(2026, 1, 1)


def good_row(**overrides) -> dict:
    """A minimal, fully-provenanced OBSERVED row for the ASFR product."""
    row = {
        "source_id": "UN_WPP_2024_ASFR",
        "source_url": "https://population.un.org/wpp/",
        "license": "CC-BY-3.0-IGO",
        "retrieved_at": "2025-08-18",
        "source_period": "2024",
        "geography_id": "FIN",
        "geography_level": GeographyLevel.COUNTRY.value,
        "year": 2024,
        "sex": Sex.FEMALE.value,
        "age_group": "25-29",
        "birth_cohort": 1997,
        "value": 55.0,
        "unit": "births_per_1000_women",
        "measurement_type": MeasurementType.OBSERVED.value,
        "proxy_flag": False,
        "imputation_flag": False,
        "uncertainty_lower": 52.0,
        "uncertainty_upper": 58.0,
        "transform_pipeline_version": "wpp_ingest@v1.0.0",
    }
    row.update(overrides)
    return row


def rules(rows, table="fertility_asfr_region_age_year") -> set[str]:
    return {v.rule for v in validate_rows(rows, table, today=TODAY)}


class TestHappyPath:
    def test_valid_row_has_no_violations(self):
        assert validate_rows([good_row()], "fertility_asfr_region_age_year",
                             today=TODAY) == []

    def test_all_canonical_tables_are_declared(self):
        expected = {
            "exposure_ambient_region_year",
            "exposure_personal_age_sex_country_year",
            "exposure_night_age_sex_country_year",
            "cohort_developmental_exposure",
            "fertility_asfr_region_age_year",
            "fertility_parity_progression",
            "fertility_ttp_and_loss",
            "art_outcomes_age_year",
            "culture_demand_age_country_year",
            "migration_generation_fertility",
            "biomarker_cohort",
            "sentinel_species_region_year",
        }
        assert expected <= set(CANONICAL_TABLES)

    def test_unknown_table_is_rejected(self):
        with pytest.raises(KeyError, match="not a canonical data product"):
            validate_rows([good_row()], "table_that_does_not_exist")

    def test_every_table_declares_units_and_grain(self):
        for name, spec in CANONICAL_TABLES.items():
            assert spec.units, f"{name} declares no unit vocabulary"
            assert spec.grain, f"{name} declares no grain"
            assert spec.description, f"{name} has no description"


class TestMissingProvenance:
    @pytest.mark.parametrize("column", REQUIRED_COLUMNS)
    def test_each_required_column_is_enforced(self, column):
        row = good_row()
        row.pop(column)
        assert "missing_provenance" in rules([row])

    def test_empty_string_counts_as_missing(self):
        assert "missing_provenance" in rules([good_row(license="")])

    def test_unregistered_source_is_rejected(self):
        v = validate_rows([good_row(source_id="MADE_UP_SOURCE")],
                          "fertility_asfr_region_age_year",
                          known_source_ids=frozenset({"UN_WPP_2024_ASFR"}),
                          today=TODAY)
        assert {x.rule for x in v} == {"unregistered_source"}

    def test_malformed_source_id_is_rejected(self):
        assert "malformed_source_id" in rules([good_row(source_id="lowercase")])

    def test_url_must_be_http_doi_or_access_required(self):
        assert "malformed_url" in rules([good_row(source_url="ftp://example.org")])
        assert "malformed_url" not in rules([good_row(source_url="doi:10.1000/x")])
        assert "malformed_url" not in rules([good_row(source_url="ACCESS_REQUIRED")])


class TestWrongUnit:
    def test_unit_outside_table_vocabulary_is_rejected(self):
        assert "unknown_unit" in rules([good_row(unit="births_per_woman")])

    def test_unit_from_another_table_is_rejected(self):
        # hours_per_day is legal for the personal-exposure table, never for ASFR.
        assert "unknown_unit" in rules([good_row(unit="hours_per_day")])

    def test_correct_unit_for_that_table_passes(self):
        row = good_row(
            unit="hours_per_day", value=3.0, source_id="BERM_SCENARIO_V17",
            measurement_type=MeasurementType.SCENARIO_PARAMETER.value,
            uncertainty_lower=1.0, uncertainty_upper=6.0,
        )
        assert "unknown_unit" not in rules([row],
                                           "exposure_personal_age_sex_country_year")


class TestWrongTime:
    def test_year_outside_supported_range(self):
        assert "year_out_of_range" in rules([good_row(year=1750, source_period="1750")])

    def test_year_must_fall_inside_source_period(self):
        assert "year_outside_source_period" in rules(
            [good_row(year=2024, source_period="2010")]
        )

    def test_year_inside_a_span_is_accepted(self):
        assert "year_outside_source_period" not in rules(
            [good_row(year=2019, source_period="2018/2020", birth_cohort=1992)]
        )

    def test_future_retrieval_date_is_rejected(self):
        assert "future_retrieval" in rules([good_row(retrieved_at="2030-01-01")])

    def test_malformed_retrieval_date_is_rejected(self):
        assert "malformed_date" in rules([good_row(retrieved_at="18/08/2025")])

    def test_impossible_calendar_date_is_rejected(self):
        assert "malformed_date" in rules([good_row(retrieved_at="2025-02-30")])

    def test_malformed_source_period_is_rejected(self):
        assert "malformed_period" in rules([good_row(source_period="mid-2020s")])

    def test_birth_cohort_cannot_follow_the_observation(self):
        assert "cohort_after_observation" in rules([good_row(birth_cohort=2030)])


class TestInvalidGeocode:
    def test_country_level_requires_iso3(self):
        assert "invalid_geocode" in rules([good_row(geography_id="Finland")])
        assert "invalid_geocode" in rules([good_row(geography_id="FI")])

    def test_subnational_requires_iso3166_2_style(self):
        row = good_row(geography_id="SCT",
                       geography_level=GeographyLevel.SUBNATIONAL1.value)
        assert "invalid_geocode" in rules([row])
        ok = good_row(geography_id="GBR-SCT",
                      geography_level=GeographyLevel.SUBNATIONAL1.value)
        assert "invalid_geocode" not in rules([ok])

    def test_unregistered_supranational_code_is_rejected(self):
        row = good_row(geography_id="NORDICS",
                       geography_level=GeographyLevel.SUPRANATIONAL.value)
        assert "invalid_geocode" in rules([row])

    def test_unknown_geography_level_is_rejected(self):
        assert "unknown_geography_level" in rules([good_row(geography_level="NATION")])


class TestMeasurementTypeIntegrity:
    def test_proxy_must_carry_proxy_flag(self):
        row = good_row(measurement_type=MeasurementType.PROXY.value, proxy_flag=False)
        assert "proxy_flag_inconsistent" in rules([row])

    def test_observed_must_not_carry_proxy_flag(self):
        row = good_row(measurement_type=MeasurementType.OBSERVED.value, proxy_flag=True)
        assert "proxy_flag_inconsistent" in rules([row])

    def test_scenario_parameter_must_declare_a_range(self):
        row = good_row(
            measurement_type=MeasurementType.SCENARIO_PARAMETER.value,
            uncertainty_lower=None, uncertainty_upper=None,
        )
        assert "scenario_without_range" in rules([row])

    def test_unknown_measurement_type_is_rejected(self):
        assert "unknown_measurement_type" in rules([good_row(measurement_type="GUESS")])

    def test_measurement_types_are_exactly_the_four_classes(self):
        assert {m.value for m in MeasurementType} == {
            "OBSERVED", "PROXY", "SCENARIO_PARAMETER", "DERIVED"
        }


class TestUncertainty:
    def test_one_sided_interval_is_rejected(self):
        assert "one_sided_uncertainty" in rules(
            [good_row(uncertainty_upper=None)]
        )

    def test_inverted_interval_is_rejected(self):
        assert "inverted_interval" in rules(
            [good_row(uncertainty_lower=58.0, uncertainty_upper=52.0)]
        )

    def test_value_outside_its_own_interval_is_rejected(self):
        assert "value_outside_interval" in rules([good_row(value=99.0)])

    def test_non_numeric_value_is_rejected(self):
        assert "malformed_value" in rules([good_row(value="fifty-five")])

    def test_nan_value_is_rejected(self):
        assert "non_finite_value" in rules([good_row(value=float("nan"))]) or \
               "missing_provenance" in rules([good_row(value=float("nan"))])


class TestStratifiers:
    def test_age_stratified_table_rejects_all(self):
        assert "missing_stratifier" in rules([good_row(age_group="ALL")])

    def test_sex_stratified_table_rejects_na(self):
        row = good_row(sex=Sex.NA.value, unit="hours_per_day", value=3.0)
        assert "missing_stratifier" in rules(
            [row], "exposure_personal_age_sex_country_year"
        )

    def test_unknown_age_group_is_rejected(self):
        assert "unknown_age_group" in rules([good_row(age_group="25-30")])


class TestImputationAndPipeline:
    def test_imputation_requires_a_pipeline_version(self):
        row = good_row(imputation_flag=True)
        row.pop("transform_pipeline_version")
        assert "imputation_without_pipeline" in rules([row])

    def test_malformed_pipeline_version_is_rejected(self):
        assert "malformed_pipeline_version" in rules(
            [good_row(transform_pipeline_version="v1")]
        )
        assert "malformed_pipeline_version" not in rules(
            [good_row(transform_pipeline_version="wpp_ingest@v1.2.3")]
        )


class TestFrameValidation:
    def test_missing_column_is_reported_and_raises(self):
        pd = pytest.importorskip("pandas")
        df = pd.DataFrame([{k: v for k, v in good_row().items() if k != "unit"}])
        with pytest.raises(DataContractError) as exc:
            validate_frame(df, "fertility_asfr_region_age_year", today=TODAY)
        assert any(v.rule == "missing_column" for v in exc.value.violations)

    def test_duplicate_grain_is_rejected(self):
        pd = pytest.importorskip("pandas")
        df = pd.DataFrame([good_row(), good_row()])
        with pytest.raises(DataContractError) as exc:
            validate_frame(df, "fertility_asfr_region_age_year", today=TODAY)
        assert any(v.rule == "duplicate_grain" for v in exc.value.violations)

    def test_clean_frame_passes(self):
        pd = pytest.importorskip("pandas")
        df = pd.DataFrame([
            good_row(age_group="25-29", birth_cohort=1997),
            good_row(age_group="30-34", birth_cohort=1992, value=72.0,
                     uncertainty_lower=68.0, uncertainty_upper=76.0),
        ])
        assert validate_frame(df, "fertility_asfr_region_age_year",
                              today=TODAY) == []

    def test_raise_on_error_false_returns_violations(self):
        pd = pytest.importorskip("pandas")
        df = pd.DataFrame([good_row(geography_id="Finland")])
        v = validate_frame(df, "fertility_asfr_region_age_year",
                           today=TODAY, raise_on_error=False)
        assert [x.rule for x in v] == ["invalid_geocode"]

    def test_error_message_names_the_table_and_counts(self):
        pd = pytest.importorskip("pandas")
        df = pd.DataFrame([good_row(geography_id="Finland", unit="wrong_unit")])
        with pytest.raises(DataContractError, match="fertility_asfr_region_age_year"):
            validate_frame(df, "fertility_asfr_region_age_year", today=TODAY)
