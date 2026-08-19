"""Tests for the isolated Fernández-López boar seminology benchmark."""

from __future__ import annotations

import csv
import hashlib
import io
import json
from collections import Counter
from pathlib import Path

import pytest

from berm.data.registry import load_source_registry
from berm.data.seminology_benchmark import (
    ANALYSIS_STATUS,
    EJACULATE_HEADER,
    EVENT_HEADER,
    F1_F6_ELIGIBILITY,
    FERTILITY_FILENAME,
    SOURCE_ID,
    SPERM_FILENAME,
    SeminologyBenchmarkArtifacts,
    build_seminology_benchmark_artifacts,
    normalize_insemination_events,
    summarize_ejaculates,
    validate_raw_inputs,
    write_seminology_benchmark_artifacts,
)


REPO_ROOT = Path(__file__).resolve().parents[2]
RAW_DIR = (
    REPO_ROOT
    / "berm"
    / "data"
    / "raw"
    / "veterinary"
    / "fernandez_lopez_2022_sperm_move_v5"
)


def test_raw_release_is_manifest_locked_with_expected_dimensions():
    result = validate_raw_inputs()
    assert result["manifest_id"] == "fernandez_lopez_2022_sperm_move_v5_2026-08-19"
    assert result["raw_fertility_rows"] == 221
    assert result["raw_sperm_cell_rows"] == 98020
    assert result["boar_count"] == 17
    assert result["sperm_ejaculate_count"] == 36
    assert result["fertility_ejaculate_count"] == 34
    assert result["motile_cell_rows"] == 69170
    assert result["nonmotile_cell_rows"] == 28850
    assert result["files"][FERTILITY_FILENAME] == {
        "path": "raw/veterinary/fernandez_lopez_2022_sperm_move_v5/fertility_data.csv",
        "bytes": 16023,
        "sha256": "2fab5d6a49e15aba781598f80a4b39817683fa1b6f369336d935777d7a70b348",
    }
    assert result["files"][SPERM_FILENAME] == {
        "path": "raw/veterinary/fernandez_lopez_2022_sperm_move_v5/sperm_data.csv",
        "bytes": 5045129,
        "sha256": "68c3bd13659f521b9e02c1f26639826d21a5e3c93d564aaf910095261660fd38",
    }


def test_events_preserve_direct_observations_and_refuse_sentinel_status():
    rows = normalize_insemination_events()
    assert len(rows) == 221
    assert len({row["event_id"] for row in rows}) == 221
    assert len({row["boar_id"] for row in rows}) == 17
    assert min(row["insemination_date"] for row in rows) == "2017-03-07"
    assert max(row["insemination_date"] for row in rows) == "2017-06-29"
    assert {row["source_id"] for row in rows} == {SOURCE_ID}
    assert {row["analysis_status"] for row in rows} == {ANALYSIS_STATUS}
    assert {row["f1_f6_eligibility"] for row in rows} == {F1_F6_ELIGIBILITY}
    assert {row["measurement_type"] for row in rows} == {"OBSERVED"}
    assert all(row["proxy_flag"] is False for row in rows)
    assert all(row["imputation_flag"] is False for row in rows)
    assert all(
        json.loads(row["quality_flags"]) == [
            "BENCHMARK_ONLY_NOT_SENTINEL",
            "FOUR_MONTH_WINDOW",
            "NO_ENVIRONMENTAL_COVARIATES",
            "NO_RF_DOSIMETRY",
            "SELECTION_TRUNCATED_MINIMUM_SEMEN_QUALITY",
            "SINGLE_SITE",
            "UNRESOLVED_OUTCOME_DEFINITION",
        ]
        for row in rows
    )
    assert {row["outcome_definition_status"] for row in rows} == {
        "UNRESOLVED_METADATA_PREGNANCY_VS_ARTICLE_FARROWING_RATE"
    }
    assert all(row["dead_born"] + row["alive_born"] == row["total_born"] for row in rows)


def test_ejaculate_summary_retains_nonmotile_cells_and_unmatched_ejaculates():
    rows = summarize_ejaculates()
    assert len(rows) == 36
    assert len({row["ejaculate_key"] for row in rows}) == 36
    assert sum(row["sperm_cell_rows"] for row in rows) == 98020
    assert sum(row["motile_cell_rows"] for row in rows) == 69170
    assert sum(row["nonmotile_cell_rows"] for row in rows) == 28850
    assert sum(row["fertility_event_rows"] for row in rows) == 221
    assert Counter(row["fertility_event_rows"] == 0 for row in rows) == {
        False: 34,
        True: 2,
    }
    unmatched = [row for row in rows if row["fertility_event_rows"] == 0]
    assert [row["ejaculate_key"] for row in unmatched] == [
        "Boar 14|14017",
        "Boar 14|14022",
    ]
    assert all("NO_MATCHING_FERTILITY_EVENTS" in json.loads(row["quality_flags"])
               for row in unmatched)
    matched = [row for row in rows if row["fertility_event_rows"] > 0]
    assert all(row["success_rate_as_deposited"] is not None for row in matched)
    assert all(row["area_mean_um2"] is not None for row in rows)
    assert all(row["vcl_mean_um_s"] is not None for row in rows)


def test_build_and_write_are_deterministic_preserve_raw_and_fail_closed(tmp_path):
    raw_paths = [RAW_DIR / FERTILITY_FILENAME, RAW_DIR / SPERM_FILENAME]
    before = {path: hashlib.sha256(path.read_bytes()).hexdigest() for path in raw_paths}
    first = build_seminology_benchmark_artifacts()
    second = build_seminology_benchmark_artifacts()
    assert first.event_csv_bytes == second.event_csv_bytes
    assert first.ejaculate_csv_bytes == second.ejaculate_csv_bytes
    assert first.summary == second.summary
    assert first.summary["analysis_status"] == ANALYSIS_STATUS
    assert first.summary["eligibility"]["f1_f6"] == F1_F6_ELIGIBILITY
    assert first.summary["row_counts"] == {
        "raw_fertility_rows": 221,
        "raw_sperm_cell_rows": 98020,
        "boar_count": 17,
        "sperm_ejaculate_count": 36,
        "fertility_ejaculate_count": 34,
        "motile_cell_rows": 69170,
        "nonmotile_cell_rows": 28850,
        "normalized_insemination_event_rows": 221,
        "normalized_ejaculate_summary_rows": 36,
        "ejaculates_with_fertility_events": 34,
        "ejaculates_without_fertility_events": 2,
    }

    event_output = tmp_path / "seminology_boar_insemination_events.csv"
    ejaculate_output = tmp_path / "seminology_boar_ejaculate_summary.csv"
    summary_output = tmp_path / "seminology_boar_benchmark_summary.json"
    first_write = write_seminology_benchmark_artifacts(
        first,
        event_output_path=event_output,
        ejaculate_output_path=ejaculate_output,
        summary_path=summary_output,
    )
    assert {entry["status"] for entry in first_write.values()} == {"WRITTEN_NEW"}
    second_write = write_seminology_benchmark_artifacts(
        second,
        event_output_path=event_output,
        ejaculate_output_path=ejaculate_output,
        summary_path=summary_output,
    )
    assert {entry["status"] for entry in second_write.values()} == {"UNCHANGED_IDENTICAL"}
    event_rows = list(csv.DictReader(io.StringIO(event_output.read_text(encoding="utf-8"))))
    ejaculate_rows = list(csv.DictReader(io.StringIO(ejaculate_output.read_text(encoding="utf-8"))))
    assert tuple(event_rows[0]) == EVENT_HEADER
    assert tuple(ejaculate_rows[0]) == EJACULATE_HEADER
    assert len(event_rows) == 221
    assert len(ejaculate_rows) == 36
    assert json.loads(summary_output.read_text(encoding="utf-8")) == first.summary

    changed = SeminologyBenchmarkArtifacts(
        event_rows=first.event_rows,
        ejaculate_rows=first.ejaculate_rows,
        event_csv_bytes=b"changed\n",
        ejaculate_csv_bytes=first.ejaculate_csv_bytes,
        summary=first.summary,
    )
    with pytest.raises(FileExistsError, match="refusing to overwrite"):
        write_seminology_benchmark_artifacts(
            changed,
            event_output_path=event_output,
            ejaculate_output_path=ejaculate_output,
            summary_path=summary_output,
        )
    after = {path: hashlib.sha256(path.read_bytes()).hexdigest() for path in raw_paths}
    assert after == before


def test_registry_and_schema_mark_the_release_as_benchmark_only():
    record = load_source_registry()[SOURCE_ID]
    assert record.access_status == "OPEN"
    assert record.measurement_class == "OBSERVED"
    assert record.feeds_prediction is False
    assert record.checksum_sha256 == (
        "68c3bd13659f521b9e02c1f26639826d21a5e3c93d564aaf910095261660fd38"
    )
    assert "NOT_ELIGIBLE for F1--F6" in record.notes
    schema_path = (
        REPO_ROOT
        / "berm"
        / "data"
        / "schemas"
        / "seminology_boar_benchmark.schema.json"
    )
    schema = json.loads(schema_path.read_text(encoding="utf-8"))
    assert schema["properties"]["analysis_status"]["const"] == ANALYSIS_STATUS
    assert schema["properties"]["eligibility"]["properties"]["f1_f6"]["const"] == (
        F1_F6_ELIGIBILITY
    )
    module_path = REPO_ROOT / "berm" / "berm" / "data" / "seminology_benchmark.py"
    module_text = module_path.read_text(encoding="utf-8")
    assert "from berm.data.sentinel_normalize import" not in module_text
    assert "from berm.stats.csli import" not in module_text
