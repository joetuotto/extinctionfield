"""Tests for the lightweight public global-panel publication transform."""

from __future__ import annotations

import csv
import hashlib
import json

import pytest

from berm.data.cohorts import TIER_SCHEMA_VERSION
from berm.data.global_panel import GLOBAL_PANEL_SCHEMA_VERSION
from berm.data.global_public_export import (
    PUBLIC_EXPORT_SCHEMA_VERSION,
    build_public_export,
    write_public_export,
)


def _write_inputs(tmp_path):
    panel = {
        "schema_version": GLOBAL_PANEL_SCHEMA_VERSION,
        "generated_at": "2026-08-19",
        "year_range": {"start": 2023, "end": 2024},
        "coverage": {"country_count": 1},
        "countries": {
            "FIN": {
                "country_name": "Finland",
                "years": {
                    "2023": {
                        "tfr": 1.4,
                        "tfr_source": "UN_WPP_2024_TFR",
                        "tfr_measurement_type": "OBSERVED",
                        "tfr_series_status": "ESTIMATE",
                        "mobile_per_100": 0.0,
                        "urban_pct": 80.0,
                        "gdp_ppp_per_capita": 50_000.0,
                        "contraception_pct": None,
                        "missingness": {
                            "tfr": "AVAILABLE",
                            "mobile_per_100": "AVAILABLE",
                            "urban_pct": "AVAILABLE",
                            "gdp_ppp_per_capita": "AVAILABLE",
                            "contraception_pct": "not_reported_by_source_for_country_year",
                        },
                        "field_provenance": {
                            "mobile_per_100": {
                                "status": "AVAILABLE",
                                "source_url": "https://not-exported.example/raw",
                            },
                        },
                    },
                },
            },
        },
    }
    tiers = {
        "schema_version": TIER_SCHEMA_VERSION,
        "generated_at": "2026-08-19",
        "core": {"count": 51},
        "extended": {"count": 192},
        "global": {"count": 204},
        "country_memberships": {"FIN": {"memberships": ["Core-51", "Extended", "Global"]}},
    }
    panel_path = tmp_path / "panel.json"
    tier_path = tmp_path / "tiers.json"
    panel_path.write_text(json.dumps(panel), encoding="utf-8")
    tier_path.write_text(json.dumps(tiers), encoding="utf-8")
    return panel_path, tier_path


def test_public_export_is_flat_source_labelled_and_does_not_impute(tmp_path):
    panel_path, tier_path = _write_inputs(tmp_path)
    csv_bytes, summary = build_public_export(
        panel_path=panel_path,
        tier_path=tier_path,
        csv_output_path=tmp_path / "global_panel.csv",
    )
    rows = list(csv.DictReader(csv_bytes.decode("utf-8").splitlines()))
    assert len(rows) == 1
    row = rows[0]
    assert row["country_iso3"] == "FIN"
    assert row["mobile_per_100"] == "0.0"
    assert row["mobile_per_100_availability"] == "AVAILABLE"
    assert row["contraception_pct"] == ""
    assert row["contraception_pct_availability"] == "not_reported_by_source_for_country_year"
    assert row["tier_memberships"] == "Core-51|Extended|Global"
    assert "not-exported.example" not in csv_bytes.decode("utf-8")
    assert summary["schema_version"] == PUBLIC_EXPORT_SCHEMA_VERSION
    assert summary["no_imputation"] is True
    assert summary["source_tiers"]["counts"] == {"core": 51, "extended": 192, "global": 204}


def test_public_export_write_is_idempotent_and_changed_output_requires_replace(tmp_path):
    panel_path, tier_path = _write_inputs(tmp_path)
    csv_path = tmp_path / "global_panel.csv"
    summary_path = tmp_path / "global_panel_summary.json"
    csv_bytes, summary = build_public_export(
        panel_path=panel_path,
        tier_path=tier_path,
        csv_output_path=csv_path,
    )
    first = write_public_export(csv_bytes, summary, csv_output_path=csv_path, summary_output_path=summary_path)
    assert first["csv"]["status"] == "WRITTEN_NEW"
    again = write_public_export(csv_bytes, summary, csv_output_path=csv_path, summary_output_path=summary_path)
    assert again["csv"]["status"] == "UNCHANGED_IDENTICAL"

    changed_csv = csv_bytes.replace(b"Finland", b"Changed")
    with pytest.raises(FileExistsError, match="refusing to overwrite"):
        changed_summary = dict(summary)
        changed_summary["public_csv"] = {**summary["public_csv"], "sha256": hashlib.sha256(changed_csv).hexdigest()}
        write_public_export(changed_csv, changed_summary, csv_output_path=csv_path, summary_output_path=summary_path)
    changed_summary = dict(summary)
    changed_summary["public_csv"] = {**summary["public_csv"], "sha256": hashlib.sha256(changed_csv).hexdigest()}
    replaced = write_public_export(
        changed_csv,
        changed_summary,
        csv_output_path=csv_path,
        summary_output_path=summary_path,
        replace=True,
    )
    assert replaced["csv"]["status"] == "REPLACED_EXPLICITLY"
