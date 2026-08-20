"""Tests for the manifest-locked ANFR ambient-only FieldState feature bridge."""

from __future__ import annotations

import csv
import hashlib
import json
from pathlib import Path

import pytest

from berm.data.anfr_fieldstate import (
    ANFR_FIELDSTATE_BRIDGE_STATUS,
    AnfrFieldStateBridgeError,
    iter_anfr_fieldstate_features,
    load_anfr_fieldstate_source_lock,
    write_anfr_fieldstate_bridge,
)
from berm.data.anfr_rf import ANFR_RF_SCHEMA_VERSION, ANFR_SOURCE_ID


_SOURCE_COLUMNS = (
    "source_id",
    "geography_id",
    "geography_level",
    "year",
    "value",
    "unit",
    "measurement_type",
    "observation_datetime",
    "datetime_timezone_status",
    "probe_key",
    "latitude",
    "longitude",
    "measurement_geometry_status",
    "personal_dose_status",
    "biological_join_status",
    "causal_analysis_eligibility",
    "raw_record_key",
)


def _sha256(path: Path) -> str:
    return hashlib.sha256(path.read_bytes()).hexdigest()


def _row(
    *,
    geography_id: str,
    probe_key: str,
    observed_at: str,
    value: float,
    raw_record_key: str,
    biological_join_status: str = "NOT_JOINED_TO_BIOLOGY",
) -> dict[str, object]:
    return {
        "source_id": ANFR_SOURCE_ID,
        "geography_id": geography_id,
        "geography_level": "SITE",
        "year": observed_at[:4],
        "value": value,
        "unit": "V_per_m",
        "measurement_type": "OBSERVED",
        "observation_datetime": observed_at,
        "datetime_timezone_status": "LOCAL_TIME_REPORTED_TIMEZONE_NOT_DECLARED",
        "probe_key": probe_key,
        "latitude": 44.879311 if geography_id.endswith("A") else 43.6045,
        "longitude": -0.678703 if geography_id.endswith("A") else 1.444,
        "measurement_geometry_status": "FIXED_AUTONOMOUS_PROBE_AMBIENT_FIELD_AS_PUBLISHED",
        "personal_dose_status": "NOT_A_PERSONAL_OR_ORGANISM_DOSE",
        "biological_join_status": biological_join_status,
        "causal_analysis_eligibility": "NOT_ELIGIBLE_NO_PRE_SPECIFIED_MATCHED_BIOLOGICAL_PANEL",
        "raw_record_key": raw_record_key,
    }


def _locked_source(
    tmp_path: Path, *, biological_join_status: str = "NOT_JOINED_TO_BIOLOGY"
) -> tuple[Path, Path, Path]:
    source_csv = tmp_path / "anfr.csv"
    rows = [
        _row(
            geography_id="FRA-ANFR-A",
            probe_key="probe-A",
            observed_at="2021-04-14T03:06:00",
            value=2.0,
            raw_record_key="anfr:1",
            biological_join_status=biological_join_status,
        ),
        _row(
            geography_id="FRA-ANFR-A",
            probe_key="probe-A",
            observed_at="2021-04-14T05:06:00",
            value=4.0,
            raw_record_key="anfr:2",
            biological_join_status=biological_join_status,
        ),
        _row(
            geography_id="FRA-ANFR-A",
            probe_key="probe-A",
            observed_at="2021-04-15T01:06:00",
            value=1.0,
            raw_record_key="anfr:3",
            biological_join_status=biological_join_status,
        ),
        _row(
            geography_id="FRA-ANFR-B",
            probe_key="probe-B",
            observed_at="2021-04-14T02:06:00",
            value=3.0,
            raw_record_key="anfr:4",
            biological_join_status=biological_join_status,
        ),
    ]
    with source_csv.open("w", encoding="utf-8", newline="") as handle:
        writer = csv.DictWriter(
            handle, fieldnames=_SOURCE_COLUMNS, lineterminator="\r\n"
        )
        writer.writeheader()
        writer.writerows(rows)

    summary_path = tmp_path / "anfr-summary.json"
    summary_path.write_text(
        json.dumps(
            {
                "schema_version": ANFR_RF_SCHEMA_VERSION,
                "source_id": ANFR_SOURCE_ID,
                "status": "MEASURED_AMBIENT_RF_LAYER_NOT_JOINED_TO_BIOLOGY",
                "row_count": len(rows),
                "temporal_coverage": "2021/2021",
                "canonical_artifact": {
                    "path": str(source_csv),
                    "sha256": _sha256(source_csv),
                },
            },
            sort_keys=True,
        ),
        encoding="utf-8",
    )
    manifest_path = tmp_path / "anfr.manifest.json"
    manifest_path.write_text(
        json.dumps(
            {
                "manifest_id": "anfr_fixture_2026-08-20",
                "scope_status": "MEASURED_AMBIENT_RF_NOT_JOINED_TO_BIOLOGY",
                "record_count": len(rows),
            },
            sort_keys=True,
        ),
        encoding="utf-8",
    )
    return source_csv, summary_path, manifest_path


def test_bridge_aggregates_only_same_probe_and_published_day_with_source_locks(
    tmp_path: Path,
) -> None:
    source_csv, summary_path, source_manifest = _locked_source(tmp_path)

    source = load_anfr_fieldstate_source_lock(
        source_csv_path=source_csv,
        source_summary_path=summary_path,
        source_manifest_path=source_manifest,
    )
    features = list(
        iter_anfr_fieldstate_features(
            source_csv_path=source_csv,
            source_summary_path=summary_path,
            source_manifest_path=source_manifest,
        )
    )

    assert source.source_row_count == 4
    assert len(features) == 3
    first = features[0]
    assert first.bridge_id == "anfr-fieldstate:FRA-ANFR-A:2021-04-14"
    assert first.source == source
    assert first.source.source_artifact_sha256 == _sha256(source_csv)
    assert first.source_row_count == 2
    assert first.ambient_mean == pytest.approx(3.0)
    assert first.ambient_rms == pytest.approx((10.0) ** 0.5)
    assert first.ambient_stddev == pytest.approx(1.0)
    assert first.ambient_min == pytest.approx(2.0)
    assert first.ambient_max == pytest.approx(4.0)
    assert first.latitude == pytest.approx(44.879311)
    assert first.longitude == pytest.approx(-0.678703)
    assert first.fieldstate_status == ANFR_FIELDSTATE_BRIDGE_STATUS
    assert not first.measurement_ready
    row = first.as_row()
    assert row["time_window_start"] == "2021-04-14T00:00:00"
    assert row["time_window_end"] == "2021-04-15T00:00:00"
    assert row["biological_join_status"] == "NOT_JOINED_TO_BIOLOGY"
    assert row["measurement_ready"] is False
    assert (
        "ambient_vector_orientation_and_polarization"
        in row["fieldstate_components_missing"]
    )


def test_bridge_has_a_hard_boundary_against_measurement_ready_fieldstate(
    tmp_path: Path,
) -> None:
    source_csv, summary_path, source_manifest = _locked_source(tmp_path)
    feature = next(
        iter_anfr_fieldstate_features(
            source_csv_path=source_csv,
            source_summary_path=summary_path,
            source_manifest_path=source_manifest,
        )
    )

    with pytest.raises(AnfrFieldStateBridgeError, match="cannot instantiate"):
        feature.require_measurement_ready_fieldstate()


def test_writer_keeps_partial_status_in_every_output_and_refuses_changed_replacement(
    tmp_path: Path,
) -> None:
    source_csv, summary_path, source_manifest = _locked_source(tmp_path)
    output_path = tmp_path / "bridge.csv"
    manifest_path = tmp_path / "bridge.manifest.json"

    artifact, status = write_anfr_fieldstate_bridge(
        source_csv_path=source_csv,
        source_summary_path=summary_path,
        source_manifest_path=source_manifest,
        output_path=output_path,
        manifest_path=manifest_path,
    )
    rows = list(csv.DictReader(output_path.open(encoding="utf-8", newline="")))
    manifest = json.loads(manifest_path.read_text(encoding="utf-8"))

    assert status == {"csv": "WRITTEN_NEW", "manifest": "WRITTEN_NEW"}
    assert artifact.row_count == 3
    assert artifact.site_count == 2
    assert {row["fieldstate_status"] for row in rows} == {ANFR_FIELDSTATE_BRIDGE_STATUS}
    assert {row["measurement_ready"] for row in rows} == {"False"}
    assert all("MEASUREMENT_READY_FIELD_STATE" not in row.values() for row in rows)
    assert manifest["status"] == ANFR_FIELDSTATE_BRIDGE_STATUS
    assert manifest["measurement_ready"] is False
    assert manifest["output"]["sha256"] == _sha256(output_path)
    assert manifest["source"]["source_artifact_sha256"] == _sha256(source_csv)

    repeated, repeated_status = write_anfr_fieldstate_bridge(
        source_csv_path=source_csv,
        source_summary_path=summary_path,
        source_manifest_path=source_manifest,
        output_path=output_path,
        manifest_path=manifest_path,
    )
    assert repeated.csv_sha256 == artifact.csv_sha256
    assert repeated_status == {
        "csv": "UNCHANGED_IDENTICAL",
        "manifest": "UNCHANGED_IDENTICAL",
    }

    output_path.write_text("review required\n", encoding="utf-8")
    with pytest.raises(FileExistsError, match="refusing to replace"):
        write_anfr_fieldstate_bridge(
            source_csv_path=source_csv,
            source_summary_path=summary_path,
            source_manifest_path=source_manifest,
            output_path=output_path,
            manifest_path=manifest_path,
        )


def test_bridge_rejects_checksum_change_before_parsing(tmp_path: Path) -> None:
    source_csv, summary_path, source_manifest = _locked_source(tmp_path)
    source_csv.write_text("changed after locking\n", encoding="utf-8")

    with pytest.raises(AnfrFieldStateBridgeError, match="checksum"):
        list(
            iter_anfr_fieldstate_features(
                source_csv_path=source_csv,
                source_summary_path=summary_path,
                source_manifest_path=source_manifest,
            )
        )


def test_bridge_rejects_a_source_row_that_claims_a_biological_join(
    tmp_path: Path,
) -> None:
    source_csv, summary_path, source_manifest = _locked_source(
        tmp_path, biological_join_status="JOINED_TO_BIOLOGY"
    )

    with pytest.raises(AnfrFieldStateBridgeError, match="biological_join_status"):
        list(
            iter_anfr_fieldstate_features(
                source_csv_path=source_csv,
                source_summary_path=summary_path,
                source_manifest_path=source_manifest,
            )
        )
