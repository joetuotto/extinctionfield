"""Tests for the isolated ANFR fixed-probe measured-RF layer."""

from __future__ import annotations

import csv
import hashlib
import io
import json
from pathlib import Path
from urllib.parse import parse_qs, urlparse

import pytest

from berm.data.anfr_rf import (
    ANFR_CKAN_PACKAGE_URL,
    ANFR_RESOURCE_ID,
    ANFR_SOURCE_ID,
    acquire_anfr_release,
    iter_anfr_rows,
    write_anfr_artifacts,
)
from berm.data.contracts import CANONICAL_TABLES, GeographyLevel, MeasurementType, validate_rows


FIELDS = (
    "_id", "id", "e_volt_par_metre", "date", "ville", "code_postal",
    "adresse", "numero", "latitude", "longitude",
)


def _page(rows: list[list[object]], *, total: int) -> bytes:
    records = io.StringIO(newline="")
    csv.writer(records).writerows(rows)
    return json.dumps(
        {
            "success": True,
            "result": {
                "resource_id": ANFR_RESOURCE_ID,
                "records_format": "csv",
                "total": total,
                "fields": [{"id": field} for field in FIELDS],
                "records": records.getvalue(),
            },
        },
        separators=(",", ":"),
    ).encode("utf-8")


def _metadata() -> bytes:
    return json.dumps(
        {
            "result": {
                "resources": [
                    {
                        "id": ANFR_RESOURCE_ID,
                        "format": "CSV",
                        "datastore_active": True,
                    }
                ]
            }
        },
        separators=(",", ":"),
    ).encode("utf-8")


def _fetcher(url: str) -> bytes:
    if url == ANFR_CKAN_PACKAGE_URL:
        return _metadata()
    parsed = urlparse(url)
    query = parse_qs(parsed.query)
    assert query["resource_id"] == [ANFR_RESOURCE_ID]
    assert query["records_format"] == ["csv"]
    offset = int(query["offset"][0])
    source_rows = [
        [1, 1, 2.99, "14/04/2021 03:06", "Le Haillan", 33185, "18 Rue Colbert", "Le-Haillan_01", 44.879311, -0.678703],
        [2, 2, 2.58, "14/04/2021 05:06", "Le Haillan", 33185, "18 Rue Colbert", "Le-Haillan_01", 44.879311, -0.678703],
        [3, 3, 1.25, "45253,04593", "Bordeaux", 33063, "1 Quai", "Bordeaux_01", 44.84044, -0.5805],
    ]
    return _page(source_rows[offset : offset + int(query["limit"][0])], total=len(source_rows))


def _acquire_fixture(tmp_path: Path) -> tuple[Path, Path, Path]:
    data_dir = tmp_path / "data"
    manifest = acquire_anfr_release(
        release_id="anfr_test_2026-08-19",
        data_dir=data_dir,
        retrieved_at="2026-08-19",
        page_size=2,
        fetch_bytes=_fetcher,
    )
    manifest_path = data_dir / "raw" / "manifests" / "anfr_test_2026-08-19.manifest.json"
    release_dir = data_dir / "raw" / "rf" / "anfr_test_2026-08-19"
    assert manifest_path.exists()
    assert release_dir.exists()
    assert manifest["record_count"] == 3
    return data_dir, manifest_path, release_dir


def test_anfr_contract_declares_an_isolated_measured_rf_grain():
    spec = CANONICAL_TABLES["measured_rf_site_time"]
    assert spec.grain == ("geography_id", "observation_datetime")
    assert spec.units == {"V_per_m"}
    assert {"probe_key", "biological_join_status", "causal_analysis_eligibility"} <= set(spec.extra_columns)


def test_acquire_freezes_every_api_page_and_never_overwrites(tmp_path):
    data_dir, manifest_path, release_dir = _acquire_fixture(tmp_path)
    manifest = json.loads(manifest_path.read_text(encoding="utf-8"))
    assert manifest["record_count"] == 3
    assert manifest["page_count"] == 2
    assert manifest["temporal_coverage"] == "2021/2023"
    assert manifest["scope_status"] == "MEASURED_AMBIENT_RF_NOT_JOINED_TO_BIOLOGY"
    assert [path.name for path in sorted(release_dir.glob("records_offset_*.json"))] == [
        "records_offset_0000000.json", "records_offset_0000002.json",
    ]
    for entry in manifest["files"]:
        path = data_dir / entry["path"]
        assert path.exists()
        assert hashlib.sha256(path.read_bytes()).hexdigest() == entry["sha256"]
    with pytest.raises(FileExistsError, match="already exists"):
        acquire_anfr_release(
            release_id="anfr_test_2026-08-19",
            data_dir=data_dir,
            retrieved_at="2026-08-19",
            page_size=2,
            fetch_bytes=_fetcher,
        )


def test_rows_preserve_measurement_and_block_biological_join(tmp_path):
    data_dir, manifest_path, release_dir = _acquire_fixture(tmp_path)
    rows = list(iter_anfr_rows(
        data_dir=data_dir,
        manifest_path=manifest_path,
        release_dir=release_dir,
    ))
    assert len(rows) == 3
    assert {row["source_id"] for row in rows} == {ANFR_SOURCE_ID}
    assert {row["geography_level"] for row in rows} == {GeographyLevel.SITE.value}
    assert {row["measurement_type"] for row in rows} == {MeasurementType.OBSERVED.value}
    assert {row["unit"] for row in rows} == {"V_per_m"}
    assert rows[0]["observation_datetime"] == "2021-04-14T03:06:00"
    assert rows[0]["datetime_timezone_status"] == "LOCAL_TIME_REPORTED_TIMEZONE_NOT_DECLARED"
    assert rows[2]["observation_datetime"].startswith("2023-11-23T01:06")
    assert rows[2]["datetime_parse_status"] == "EXCEL_1900_SERIAL_CONVERTED_FROM_PUBLISHED_VALUE"
    assert all(row["biological_join_status"] == "NOT_JOINED_TO_BIOLOGY" for row in rows)
    assert all(row["causal_analysis_eligibility"].startswith("NOT_ELIGIBLE") for row in rows)
    assert validate_rows(rows, "measured_rf_site_time", known_source_ids={ANFR_SOURCE_ID}) == []


def test_writer_is_deterministic_and_refuses_changed_replacement(tmp_path):
    data_dir, manifest_path, release_dir = _acquire_fixture(tmp_path)
    output = tmp_path / "out" / "anfr.csv"
    summary = tmp_path / "out" / "anfr-summary.json"
    artifact, status = write_anfr_artifacts(
        data_dir=data_dir,
        manifest_path=manifest_path,
        release_dir=release_dir,
        output_path=output,
        summary_path=summary,
    )
    assert status == {"csv": "WRITTEN_NEW", "summary": "WRITTEN_NEW"}
    assert artifact.row_count == 3
    assert artifact.site_count == 2
    assert artifact.source_period == "2021/2023"
    assert artifact.summary["datetime_parse_counts"] == {
        "EXCEL_1900_SERIAL_CONVERTED_FROM_PUBLISHED_VALUE": 1,
        "PUBLISHED_DMY_LOCAL_TIME": 2,
    }
    assert artifact.summary["status"] == "MEASURED_AMBIENT_RF_LAYER_NOT_JOINED_TO_BIOLOGY"
    assert all(value.startswith("BLOCKED") for value in artifact.summary["f_test_readiness"].values())
    assert len(list(csv.DictReader(output.open(encoding="utf-8", newline="")))) == 3
    same, repeat_status = write_anfr_artifacts(
        data_dir=data_dir,
        manifest_path=manifest_path,
        release_dir=release_dir,
        output_path=output,
        summary_path=summary,
    )
    assert same.csv_sha256 == artifact.csv_sha256
    assert repeat_status == {"csv": "UNCHANGED_IDENTICAL", "summary": "UNCHANGED_IDENTICAL"}
    output.write_text("review required\n", encoding="utf-8")
    with pytest.raises(FileExistsError, match="refusing to replace"):
        write_anfr_artifacts(
            data_dir=data_dir,
            manifest_path=manifest_path,
            release_dir=release_dir,
            output_path=output,
            summary_path=summary,
        )
