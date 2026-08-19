"""Tests for the UN WPP 2024 ASFR/TFR pipeline.

The central test here is the accounting identity `TFR = 5 * sum(ASFR) / 1000`.
It is a genuine test rather than a tautology because the two sides are ingested
from two different WPP files: the ASFR product from the fertility-by-age release
and the TFR product from the demographic-indicators release. Neither is derived
from the other.
"""

from __future__ import annotations

import csv
import statistics

import pytest

from berm.data.contracts import MeasurementType, validate_rows
from berm.data import wpp

pytestmark = pytest.mark.skipif(
    not (wpp.OUT_ASFR.exists() and wpp.OUT_TFR.exists()),
    reason="canonical WPP products absent; run `python -m berm.data.wpp ingest`",
)


@pytest.fixture(scope="module")
def geographies():
    return wpp.available_geographies()


@pytest.fixture(scope="module")
def accounting(geographies):
    out = []
    for g in geographies:
        for year in range(1950, 2101):
            rec = wpp.asfr_tfr_accounting(g, year)
            if rec is not None:
                out.append(rec)
    return out


class TestCoverage:
    def test_revision_is_recorded(self):
        assert wpp.WPP_REVISION == "WPP2024"
        assert wpp.coverage()["wpp_revision"] == "WPP2024"

    def test_covers_the_full_wpp_horizon(self):
        cov = wpp.coverage()
        assert cov["year_min"] == 1950
        assert cov["year_max"] == 2100

    def test_covers_every_country_berm_models(self):
        from berm.data.loader import _BERM_TO_ISO3

        available = set(wpp.available_geographies())
        missing = sorted(set(_BERM_TO_ISO3.values()) - available)
        assert not missing, f"BERM countries absent from the WPP product: {missing}"

    def test_seven_reproductive_age_groups(self):
        assert wpp.AGE_GROUPS == (
            "15-19", "20-24", "25-29", "30-34", "35-39", "40-44", "45-49",
        )


class TestAccountingIdentity:
    """TFR = 5 * sum(ASFR) / 1000, checked against WPP's independently published TFR."""

    def test_typical_residual_is_below_one_percent(self, accounting):
        rel = [abs(a["relative_residual"]) for a in accounting]
        mean = statistics.mean(rel)
        assert mean < 0.01, (
            f"mean absolute relative residual {mean:.2%} exceeds 1%; the ASFR "
            f"product no longer reproduces WPP's own TFR"
        )

    def test_almost_every_country_year_is_within_two_percent(self, accounting):
        rel = [abs(a["relative_residual"]) for a in accounting]
        share_ok = sum(1 for e in rel if e <= 0.02) / len(rel)
        assert share_ok > 0.98, (
            f"only {share_ok:.2%} of country-years fall within 2% of published TFR"
        )

    def test_no_country_year_is_wildly_off(self, accounting):
        worst = max(accounting, key=lambda a: abs(a["relative_residual"]))
        assert abs(worst["relative_residual"]) < 0.10, (
            f"{worst['geography_id']} {worst['year']} residual "
            f"{worst['relative_residual']:.2%}"
        )

    def test_residual_skews_negative_because_10_14_and_50_54_are_excluded(self, accounting):
        negative = sum(1 for a in accounting if a["absolute_residual"] < 0)
        assert negative / len(accounting) > 0.5, (
            "the 15-49 product should sum to slightly less than WPP's TFR, which "
            "also counts the 10-14 and 50-54 groups"
        )

    def test_a_large_country_reconciles_closely(self):
        for iso3 in ("FIN", "USA", "IND", "NGA", "JPN"):
            acc = wpp.asfr_tfr_accounting(iso3, 2023)
            assert acc is not None, f"{iso3} 2023 missing"
            assert abs(acc["relative_residual"]) < 0.02, (
                f"{iso3} 2023 residual {acc['relative_residual']:.2%}"
            )

    def test_accounting_reports_rather_than_absorbs(self):
        acc = wpp.asfr_tfr_accounting("FIN", 2023)
        assert set(acc) >= {
            "tfr_from_asfr", "tfr_published", "absolute_residual",
            "relative_residual", "series_status", "note",
        }
        assert acc["tfr_from_asfr"] != acc["tfr_published"], (
            "a residual of exactly zero would mean one side was derived from the "
            "other, which would make the identity a tautology"
        )


class TestEstimateVersusProjection:
    def test_estimates_and_projections_split_at_2023(self):
        assert wpp.load_asfr("FIN", 2023)["series_status"] == "ESTIMATE"
        assert wpp.load_asfr("FIN", 2024)["series_status"] == "PROJECTION_MEDIUM"

    def test_estimates_are_observed_and_projections_are_derived(self):
        rows = {}
        with wpp.OUT_ASFR.open(newline="", encoding="utf-8") as fh:
            for r in csv.DictReader(fh):
                if r["geography_id"] != "FIN":
                    continue
                rows[int(r["year"])] = r
                if len(rows) > 200:
                    break
        assert rows[2000]["measurement_type"] == MeasurementType.OBSERVED.value
        assert rows[2050]["measurement_type"] == MeasurementType.DERIVED.value

    def test_projection_years_carry_the_published_interval(self):
        rec = wpp.load_asfr("FIN", 2050)
        lows = [lo for lo, _ in rec["uncertainty"]]
        assert all(lo is not None for lo in lows), (
            "WPP publishes 95% prediction intervals for projection years; "
            "they must be carried through, not dropped"
        )

    def test_estimate_years_have_no_invented_interval(self):
        rec = wpp.load_asfr("FIN", 2000)
        assert all(lo is None and hi is None for lo, hi in rec["uncertainty"]), (
            "WPP publishes no interval for estimate years; none may be invented"
        )

    def test_published_interval_brackets_the_central_value(self):
        rec = wpp.load_asfr("FIN", 2050)
        for value, (lo, hi) in zip(rec["values"], rec["uncertainty"]):
            assert lo <= value <= hi, f"{value} outside [{lo}, {hi}]"


class TestReadInterface:
    def test_load_asfr_single_age_group(self):
        rec = wpp.load_asfr("FIN", 2023, "25-29")
        assert rec["age_group"] == "25-29"
        assert rec["unit"] == "births_per_1000_women"
        assert rec["is_proxy"] is False
        assert rec["value"] > 0

    def test_load_asfr_all_groups_in_canonical_order(self):
        rec = wpp.load_asfr("FIN", 2023)
        assert rec["age_groups"] == wpp.AGE_GROUPS
        assert len(rec["values"]) == 7

    def test_load_asfr_series_is_contiguous_and_ordered(self):
        series = wpp.load_asfr_series("FIN", 2000, 2010)
        assert [r["year"] for r in series] == list(range(2000, 2011))

    def test_missing_geography_returns_none_rather_than_guessing(self):
        assert wpp.load_asfr("ZZZ", 2023) is None
        assert wpp.load_tfr("ZZZ", 2023) is None

    def test_missing_year_is_not_interpolated(self):
        """The legacy table silently interpolated between sparse years."""
        assert wpp.load_asfr("FIN", 2101) is None
        assert wpp.load_asfr("FIN", 1949) is None

    def test_every_record_carries_provenance(self):
        for rec in (wpp.load_asfr("FIN", 2023),
                    wpp.load_asfr("FIN", 2023, "25-29"),
                    wpp.load_tfr("FIN", 2023)):
            assert rec["source_id"].startswith("UN_WPP_2024")
            assert rec["wpp_revision"] == "WPP2024"
            assert rec["is_proxy"] is False

    def test_asfr_to_tfr_accepts_tuple_or_record(self):
        rec = wpp.load_asfr("FIN", 2023)
        assert wpp.asfr_to_tfr(rec) == pytest.approx(wpp.asfr_to_tfr(rec["values"]))

    def test_asfr_to_tfr_rejects_wrong_arity(self):
        with pytest.raises(ValueError, match="expected 7 age groups"):
            wpp.asfr_to_tfr((1.0, 2.0, 3.0))


class TestProductsSatisfyTheirContracts:
    def _sample(self, path, n=400):
        with path.open(newline="", encoding="utf-8") as fh:
            rows = []
            for i, r in enumerate(csv.DictReader(fh)):
                if i % 97 == 0:
                    for key in ("uncertainty_lower", "uncertainty_upper",
                                "birth_cohort"):
                        if r[key] == "":
                            r[key] = None
                    r["proxy_flag"] = r["proxy_flag"] == "True"
                    r["imputation_flag"] = r["imputation_flag"] == "True"
                    rows.append(r)
                if len(rows) >= n:
                    break
        return rows

    def test_asfr_product_rows_are_contract_clean(self):
        v = validate_rows(self._sample(wpp.OUT_ASFR),
                          "fertility_asfr_region_age_year")
        assert v == [], "\n".join(str(x) for x in v[:15])

    def test_tfr_product_rows_are_contract_clean(self):
        v = validate_rows(self._sample(wpp.OUT_TFR),
                          "fertility_tfr_region_year")
        assert v == [], "\n".join(str(x) for x in v[:15])


class TestLegacyComparisonIsReportedNotHidden:
    """Rule: differences between the old and new route are reported, never absorbed."""

    def test_legacy_table_is_left_untouched(self):
        from berm.data.asfr import WPP_ASFR

        assert len(WPP_ASFR) == 57, (
            "the legacy hand-typed table must remain in place unmodified until "
            "the ASFR route has been migrated and validated in parallel"
        )

    def test_legacy_and_wpp_diverge_substantially(self):
        """Documents the size of the divergence found in the audit.

        If this ever starts failing because the divergence shrank, the legacy
        table was edited, and finding A-1 needs revisiting.
        """
        from berm.data.asfr import WPP_ASFR, asfr_to_tfr as legacy_to_tfr
        from berm.data.loader import _BERM_TO_ISO3

        diffs = []
        for country, years in WPP_ASFR.items():
            iso3 = _BERM_TO_ISO3.get(country)
            if not iso3:
                continue
            for year, legacy in years.items():
                new = wpp.load_asfr(iso3, year)
                if new is None:
                    continue
                a, b = legacy_to_tfr(legacy), wpp.asfr_to_tfr(new)
                diffs.append((b - a) / b)

        assert len(diffs) > 200, "not enough overlap to compare"
        mean_abs = statistics.mean(abs(d) for d in diffs)
        assert mean_abs > 0.15, (
            f"legacy table now differs from WPP by only {mean_abs:.1%}; "
            f"audit finding A-1 assumed roughly 26% and should be re-checked"
        )
        share_low = sum(1 for d in diffs if d > 0) / len(diffs)
        assert share_low > 0.8, (
            f"the legacy table understated fertility in {share_low:.0%} of "
            f"country-years; a one-directional error was the evidence that it "
            f"was not a WPP extract"
        )


class TestActivePredictionUnaffected:
    def test_importing_wpp_does_not_change_the_active_prediction(self):
        """Rule 10: the active prediction's default output must not move."""
        from berm.model import predict_country_year

        result = predict_country_year("Finland", 2030)
        assert result["predicted_tfr"] == pytest.approx(1.3209, abs=1e-4)
        assert result["biological_tfr"] == pytest.approx(1.1954, abs=1e-4)
