"""Tests for the WPP-first, provenance-rich global annual panel."""

from __future__ import annotations

import csv
from pathlib import Path

import pytest

from berm.data.global_download import WorldBankRelease
from berm.data.global_panel import (
    GLOBAL_PANEL_SCHEMA_VERSION,
    build_global_panel,
    load_global_panel,
    write_global_panel,
)


def _wpp_csv(path):
    header = (
        "source_id", "geography_id", "year", "value", "source_url", "retrieved_at",
        "unit", "measurement_type", "proxy_flag", "series_status", "wpp_revision", "wpp_variant",
    )
    rows = [
        ("UN_WPP_2024_TFR", "FIN", 2023, 1.4, "https://wpp.example", "2026-08-19", "births_per_woman", "OBSERVED", "False", "ESTIMATE", "WPP2024", "Medium"),
        ("UN_WPP_2024_TFR", "FIN", 2024, 1.5, "https://wpp.example", "2026-08-19", "births_per_woman", "DERIVED", "False", "PROJECTION_MEDIUM", "WPP2024", "Medium"),
        ("UN_WPP_2024_TFR", "SWE", 2024, 1.6, "https://wpp.example", "2026-08-19", "births_per_woman", "DERIVED", "False", "PROJECTION_MEDIUM", "WPP2024", "Medium"),
    ]
    with path.open("w", newline="", encoding="utf-8") as handle:
        writer = csv.writer(handle)
        writer.writerow(header)
        writer.writerows(rows)


def _wb_observation(value, source_id, measurement_type="OBSERVED", proxy_flag=False):
    return {
        "value": value,
        "source_id": source_id,
        "source_url": "https://wb.example",
        "retrieved_at": "2026-08-19",
        "unit": "unit",
        "measurement_type": measurement_type,
        "proxy_flag": proxy_flag,
        "raw_artifact": "raw/world_bank/test/value.json",
        "indicator_code": "TEST",
        "series_status": "REPORTED_BY_WORLD_BANK",
    }


def _release():
    return WorldBankRelease(
        release_id="wb_test",
        release_dir=Path(__file__),  # only serialised as a harmless external test path
        manifest_path=None,
        retrieved_at="2026-08-19",
        countries={"FIN": {"name": "Finland", "region_id": "ECS", "income_level": "HIC"}},
        observations={
            "FIN": {
                2023: {
                    "tfr": _wb_observation(9.9, "WB_SP_DYN_TFRT_IN"),
                    "mobile_per_100": _wb_observation(0.0, "WB_IT_CEL_SETS_P2", "PROXY", True),
                    "urban_pct": _wb_observation(80.0, "WB_SP_URB_TOTL_IN_ZS"),
                    "gdp_ppp_per_capita": _wb_observation(50_000.0, "WB_NY_GDP_PCAP_PP_CD"),
                    "contraception_pct": _wb_observation(70.0, "WB_SP_DYN_CONU_ZS"),
                },
                2024: {"tfr": _wb_observation(1.7, "WB_SP_DYN_TFRT_IN")},
            },
        },
        source_artifacts={},
    )


def test_wpp_estimate_wins_but_wb_is_documented_fallback(tmp_path):
    wpp_path = tmp_path / "wpp.csv"
    _wpp_csv(wpp_path)
    result = build_global_panel(_release(), wpp_tfr_path=wpp_path, start_year=2023, end_year=2024)
    assert result.panel["schema_version"] == GLOBAL_PANEL_SCHEMA_VERSION

    fin_2023 = result.panel["countries"]["FIN"]["years"]["2023"]
    assert fin_2023["tfr"] == pytest.approx(1.4)
    assert fin_2023["tfr_source"] == "UN_WPP_2024_TFR"
    assert fin_2023["tfr_selection_rule"] == "WPP_ESTIMATE_PREFERRED"
    assert fin_2023["mobile_per_100"] == 0.0  # reported zero, not missing
    assert fin_2023["missingness"]["mobile_per_100"] == "AVAILABLE"
    assert fin_2023["field_provenance"]["mobile_per_100"]["proxy_flag"] is True

    fin_2024 = result.panel["countries"]["FIN"]["years"]["2024"]
    assert fin_2024["tfr"] == pytest.approx(1.7)
    assert fin_2024["tfr_source"] == "WB_SP_DYN_TFRT_IN"
    assert fin_2024["tfr_selection_rule"] == "WORLD_BANK_FALLBACK_WHEN_WPP_ESTIMATE_ABSENT"

    swe_2024 = result.panel["countries"]["SWE"]["years"]["2024"]
    assert swe_2024["tfr"] == pytest.approx(1.6)
    assert swe_2024["tfr_measurement_type"] == "DERIVED"
    assert swe_2024["tfr_series_status"] == "PROJECTION_MEDIUM"
    assert swe_2024["field_provenance"]["gdp_ppp_per_capita"]["status"] == "MISSING"
    assert "legacy_military_broadcast" in result.panel["scenario_boundary"]


def test_global_panel_write_is_idempotent_but_never_replaces_different_data(tmp_path):
    wpp_path = tmp_path / "wpp.csv"
    _wpp_csv(wpp_path)
    result = build_global_panel(_release(), wpp_tfr_path=wpp_path, start_year=2023, end_year=2024)
    out = tmp_path / "all_countries_panel.json"
    assert write_global_panel(result, output_path=out)["status"] == "WRITTEN_NEW"
    assert write_global_panel(result, output_path=out)["status"] == "UNCHANGED_IDENTICAL"
    assert load_global_panel(out)["countries"]["FIN"]["years"]["2023"]["tfr"] == pytest.approx(1.4)

    changed = dict(result.panel)
    changed["generated_at"] = "different"
    with pytest.raises(FileExistsError, match="refusing to overwrite"):
        write_global_panel(changed, output_path=out)
