"""Fail-closed ANFR ambient-RF feature bridge for a future FieldState panel.

ANFR's autonomous probes measure one published ambient field-strength magnitude
(``V/m``) at a fixed location and a source-local timestamp.  Those readings are
valuable *measured inputs*, but they are not a normalized vector, a personal or
organism channel, organ transfer, spectral measurement, or a biological
endpoint.  Consequently this module deliberately emits a ``PARTIAL_FIELD_STATE``
feature product rather than constructing :class:`~berm.physics.field_state.FieldState`.

The bridge does three narrow jobs:

* locks the already-normalized ANFR artifact to its source summary and raw
  release manifest;
* aggregates only repeated readings from the same fixed probe within one
  published calendar day, retaining magnitude statistics and observed-time
  bounds; and
* writes an immutable provenance manifest whose status cannot be upgraded by
  this code path.

It never creates a vector orientation, normalization, personal exposure,
dosimetry transfer, spectrum, phase/coherence relation, biological join,
lag, or outcome coefficient.  A future study can add those independently and
then assemble a genuine local FieldState panel; it must not relabel this
ambient-only product as measurement-ready.
"""

from __future__ import annotations

import argparse
import csv
import datetime as dt
import hashlib
import io
import json
import math
import os
import tempfile
from dataclasses import dataclass
from pathlib import Path
from typing import Any, Iterator, Mapping, NoReturn

from berm.data.anfr_rf import (
    ANFR_RF_SCHEMA_VERSION,
    ANFR_SOURCE_ID,
    DEFAULT_OUTPUT_PATH as DEFAULT_ANFR_INPUT_PATH,
    DEFAULT_SUMMARY_PATH as DEFAULT_ANFR_SOURCE_SUMMARY_PATH,
    MANIFEST_FILENAME as DEFAULT_ANFR_MANIFEST_FILENAME,
)


__all__ = [
    "ANFR_FIELDSTATE_BRIDGE_SCHEMA_VERSION",
    "ANFR_FIELDSTATE_BRIDGE_STATUS",
    "DEFAULT_BRIDGE_MANIFEST_PATH",
    "DEFAULT_BRIDGE_OUTPUT_PATH",
    "AnfrFieldStateBridgeArtifacts",
    "AnfrFieldStateBridgeError",
    "AnfrFieldStateFeature",
    "AnfrFieldStateSourceLock",
    "iter_anfr_fieldstate_features",
    "load_anfr_fieldstate_source_lock",
    "write_anfr_fieldstate_bridge",
]


DATA_DIR = Path(__file__).resolve().parent.parent.parent / "data"
DEFAULT_ANFR_MANIFEST_PATH = (
    DATA_DIR / "raw" / "manifests" / DEFAULT_ANFR_MANIFEST_FILENAME
)
DEFAULT_BRIDGE_OUTPUT_PATH = DATA_DIR / "processed" / "anfr_fieldstate_feature_day.csv"
DEFAULT_BRIDGE_MANIFEST_PATH = (
    DATA_DIR / "processed" / "anfr_fieldstate_feature_day.manifest.json"
)

PIPELINE_VERSION = "anfr_fieldstate_bridge@v1.0.0"
ANFR_FIELDSTATE_BRIDGE_SCHEMA_VERSION = "berm.anfr_fieldstate_feature_day@v1.0.0"
ANFR_FIELDSTATE_BRIDGE_STATUS = "PARTIAL_FIELD_STATE"
ANFR_FIELDSTATE_BRIDGE_ELIGIBILITY = (
    "NOT_ELIGIBLE_AMBIENT_ONLY_NO_MATCHED_BIOLOGICAL_PANEL"
)
ANFR_FIELDSTATE_AGGREGATION_ID = "ANFR_PUBLISHED_CALENDAR_DAY_V1"

_REQUIRED_SOURCE_COLUMNS = frozenset(
    {
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
    }
)

_PRESENT_COMPONENTS = (
    "measured_ambient_field_magnitude_v_per_m",
    "fixed_probe_geolocation",
    "published_local_timestamp_timezone_undeclared",
    "manifest_locked_source_provenance",
)

# This vocabulary overlaps with FieldState completeness where applicable, and
# records the additional biological-panel requirements explicitly.  It is
# serialized on every row so a downstream join cannot erase the missing state.
_MISSING_COMPONENTS = (
    "field_normalisation_calibration",
    "ambient_vector_orientation_and_polarization",
    "measured_background_vector",
    "personal_exposure_channel",
    "organ_receptor_specification",
    "organ_transfer",
    "measured_envelope_or_beat_psd",
    "circadian_context",
    "phase_and_coherence",
    "matched_biological_endpoint",
)

_OUTPUT_FIELDS = (
    "bridge_id",
    "source_id",
    "source_manifest_id",
    "source_manifest_sha256",
    "source_summary_sha256",
    "source_artifact_sha256",
    "bridge_schema_version",
    "transform_pipeline_version",
    "aggregation_id",
    "country",
    "geography_id",
    "geography_level",
    "probe_key",
    "latitude",
    "longitude",
    "published_day",
    "time_window_start",
    "time_window_end",
    "first_observation_datetime",
    "last_observation_datetime",
    "datetime_timezone_status",
    "source_row_count",
    "ambient_v_per_m_mean",
    "ambient_v_per_m_rms",
    "ambient_v_per_m_stddev",
    "ambient_v_per_m_min",
    "ambient_v_per_m_max",
    "measurement_geometry_status",
    "personal_dose_status",
    "biological_join_status",
    "fieldstate_status",
    "measurement_ready",
    "fieldstate_components_present",
    "fieldstate_components_missing",
    "fieldstate_core_eligibility",
    "biological_join_eligibility",
)


class AnfrFieldStateBridgeError(RuntimeError):
    """Raised when a source lock or ambient-only bridge boundary is violated."""


def _canonical_json_bytes(value: Any) -> bytes:
    return (
        json.dumps(value, ensure_ascii=False, sort_keys=True, separators=(",", ":"))
        + "\n"
    ).encode("utf-8")


def _sha256_path(path: Path) -> str:
    digest = hashlib.sha256()
    with path.open("rb") as handle:
        for block in iter(lambda: handle.read(1024 * 1024), b""):
            digest.update(block)
    return digest.hexdigest()


def _load_mapping(path: Path, *, label: str) -> Mapping[str, Any]:
    try:
        value = json.loads(path.read_text(encoding="utf-8"))
    except (OSError, json.JSONDecodeError) as exc:
        raise AnfrFieldStateBridgeError(f"invalid {label}: {path}") from exc
    if not isinstance(value, Mapping):
        raise AnfrFieldStateBridgeError(f"{label} must be a JSON object: {path}")
    return value


def _require_equal(
    mapping: Mapping[str, Any], key: str, expected: object, *, label: str
) -> None:
    if mapping.get(key) != expected:
        raise AnfrFieldStateBridgeError(
            f"{label} has unexpected {key}: {mapping.get(key)!r} (expected {expected!r})"
        )


def _nonempty_text(value: object, *, label: str) -> str:
    if not isinstance(value, str) or not value.strip():
        raise AnfrFieldStateBridgeError(f"{label} must be a non-empty string")
    return value.strip()


def _finite_nonnegative(value: object, *, label: str) -> float:
    if isinstance(value, bool):
        raise AnfrFieldStateBridgeError(f"{label} must be a finite non-negative number")
    try:
        result = float(value)
    except (TypeError, ValueError) as exc:
        raise AnfrFieldStateBridgeError(
            f"{label} must be a finite non-negative number"
        ) from exc
    if not math.isfinite(result) or result < 0.0:
        raise AnfrFieldStateBridgeError(f"{label} must be a finite non-negative number")
    return result


def _finite(value: object, *, label: str) -> float:
    if isinstance(value, bool):
        raise AnfrFieldStateBridgeError(f"{label} must be a finite number")
    try:
        result = float(value)
    except (TypeError, ValueError) as exc:
        raise AnfrFieldStateBridgeError(f"{label} must be a finite number") from exc
    if not math.isfinite(result):
        raise AnfrFieldStateBridgeError(f"{label} must be a finite number")
    return result


def _parse_unzoned_datetime(value: object, *, label: str) -> dt.datetime:
    text = _nonempty_text(value, label=label)
    try:
        parsed = dt.datetime.fromisoformat(text)
    except ValueError as exc:
        raise AnfrFieldStateBridgeError(f"{label} is not ISO-8601: {text!r}") from exc
    if parsed.tzinfo is not None:
        raise AnfrFieldStateBridgeError(
            f"{label} must remain source-local without an assumed timezone: {text!r}"
        )
    return parsed


@dataclass(frozen=True)
class AnfrFieldStateSourceLock:
    """Checksums tying a bridge run to one exact ANFR normalization release."""

    source_manifest_id: str
    source_manifest_sha256: str
    source_summary_sha256: str
    source_artifact_sha256: str
    source_row_count: int
    source_period: str


@dataclass(frozen=True)
class AnfrFieldStateFeature:
    """One site-day ambient-RF feature, intentionally short of FieldState input.

    ``ambient_v_per_m_*`` are magnitude statistics on ANFR's published fixed
    probe readings.  They are never vector components or biological doses.
    """

    bridge_id: str
    source: AnfrFieldStateSourceLock
    geography_id: str
    probe_key: str
    latitude: float
    longitude: float
    published_day: dt.date
    first_observation: dt.datetime
    last_observation: dt.datetime
    source_row_count: int
    ambient_mean: float
    ambient_rms: float
    ambient_stddev: float
    ambient_min: float
    ambient_max: float
    measurement_geometry_status: str

    @property
    def fieldstate_status(self) -> str:
        """The status is intentionally fixed at the ambient-only boundary."""
        return ANFR_FIELDSTATE_BRIDGE_STATUS

    @property
    def measurement_ready(self) -> bool:
        """ANFR alone never satisfies the complete local FieldState contract."""
        return False

    def as_row(self) -> dict[str, object]:
        """Return the declared feature-product schema without hidden conversion."""
        day_start = dt.datetime.combine(self.published_day, dt.time.min)
        day_end = day_start + dt.timedelta(days=1)
        return {
            "bridge_id": self.bridge_id,
            "source_id": ANFR_SOURCE_ID,
            "source_manifest_id": self.source.source_manifest_id,
            "source_manifest_sha256": self.source.source_manifest_sha256,
            "source_summary_sha256": self.source.source_summary_sha256,
            "source_artifact_sha256": self.source.source_artifact_sha256,
            "bridge_schema_version": ANFR_FIELDSTATE_BRIDGE_SCHEMA_VERSION,
            "transform_pipeline_version": PIPELINE_VERSION,
            "aggregation_id": ANFR_FIELDSTATE_AGGREGATION_ID,
            "country": "FRA",
            "geography_id": self.geography_id,
            "geography_level": "SITE",
            "probe_key": self.probe_key,
            "latitude": self.latitude,
            "longitude": self.longitude,
            "published_day": self.published_day.isoformat(),
            "time_window_start": day_start.isoformat(timespec="seconds"),
            "time_window_end": day_end.isoformat(timespec="seconds"),
            "first_observation_datetime": self.first_observation.isoformat(
                timespec="seconds"
            ),
            "last_observation_datetime": self.last_observation.isoformat(
                timespec="seconds"
            ),
            "datetime_timezone_status": "LOCAL_TIME_REPORTED_TIMEZONE_NOT_DECLARED",
            "source_row_count": self.source_row_count,
            "ambient_v_per_m_mean": self.ambient_mean,
            "ambient_v_per_m_rms": self.ambient_rms,
            "ambient_v_per_m_stddev": self.ambient_stddev,
            "ambient_v_per_m_min": self.ambient_min,
            "ambient_v_per_m_max": self.ambient_max,
            "measurement_geometry_status": self.measurement_geometry_status,
            "personal_dose_status": "NOT_A_PERSONAL_OR_ORGANISM_DOSE",
            "biological_join_status": "NOT_JOINED_TO_BIOLOGY",
            "fieldstate_status": self.fieldstate_status,
            "measurement_ready": False,
            "fieldstate_components_present": json.dumps(
                _PRESENT_COMPONENTS, separators=(",", ":")
            ),
            "fieldstate_components_missing": json.dumps(
                _MISSING_COMPONENTS, separators=(",", ":")
            ),
            "fieldstate_core_eligibility": ANFR_FIELDSTATE_BRIDGE_ELIGIBILITY,
            "biological_join_eligibility": ANFR_FIELDSTATE_BRIDGE_ELIGIBILITY,
        }

    def require_measurement_ready_fieldstate(self) -> NoReturn:
        """Prevent a consumer from treating an ambient-only record as FieldState.

        This is a deliberate hard boundary, rather than a boolean callers can
        forget to inspect.  The caller must supply and validate the named
        missing components in a new, study-specific assembly step.
        """
        raise AnfrFieldStateBridgeError(
            "ANFR fixed-probe ambient magnitude cannot instantiate a measurement-ready "
            "FieldState; required components remain: " + ", ".join(_MISSING_COMPONENTS)
        )


@dataclass
class _SiteDayAccumulator:
    geography_id: str
    probe_key: str
    latitude: float
    longitude: float
    published_day: dt.date
    first_observation: dt.datetime
    last_observation: dt.datetime
    measurement_geometry_status: str
    source_row_count: int = 0
    total: float = 0.0
    total_squared: float = 0.0
    minimum: float = math.inf
    maximum: float = -math.inf

    def add(
        self, *, value: float, observed_at: dt.datetime, row: Mapping[str, object]
    ) -> None:
        if (
            _nonempty_text(row.get("probe_key"), label="probe_key") != self.probe_key
            or _finite(row.get("latitude"), label="latitude") != self.latitude
            or _finite(row.get("longitude"), label="longitude") != self.longitude
            or _nonempty_text(
                row.get("measurement_geometry_status"),
                label="measurement_geometry_status",
            )
            != self.measurement_geometry_status
        ):
            raise AnfrFieldStateBridgeError(
                "one ANFR geography_id/day changes fixed-probe metadata; refusing to aggregate"
            )
        self.source_row_count += 1
        self.total += value
        self.total_squared += value * value
        self.minimum = min(self.minimum, value)
        self.maximum = max(self.maximum, value)
        self.first_observation = min(self.first_observation, observed_at)
        self.last_observation = max(self.last_observation, observed_at)

    def feature(self, source: AnfrFieldStateSourceLock) -> AnfrFieldStateFeature:
        if self.source_row_count < 1:
            raise AssertionError(
                "a bridge accumulator must contain an ANFR observation"
            )
        mean = self.total / self.source_row_count
        rms = math.sqrt(self.total_squared / self.source_row_count)
        variance = max(0.0, self.total_squared / self.source_row_count - mean * mean)
        bridge_id = (
            f"anfr-fieldstate:{self.geography_id}:{self.published_day.isoformat()}"
        )
        return AnfrFieldStateFeature(
            bridge_id=bridge_id,
            source=source,
            geography_id=self.geography_id,
            probe_key=self.probe_key,
            latitude=self.latitude,
            longitude=self.longitude,
            published_day=self.published_day,
            first_observation=self.first_observation,
            last_observation=self.last_observation,
            source_row_count=self.source_row_count,
            ambient_mean=mean,
            ambient_rms=rms,
            ambient_stddev=math.sqrt(variance),
            ambient_min=self.minimum,
            ambient_max=self.maximum,
            measurement_geometry_status=self.measurement_geometry_status,
        )


def load_anfr_fieldstate_source_lock(
    *,
    source_csv_path: Path = DEFAULT_ANFR_INPUT_PATH,
    source_summary_path: Path = DEFAULT_ANFR_SOURCE_SUMMARY_PATH,
    source_manifest_path: Path = DEFAULT_ANFR_MANIFEST_PATH,
) -> AnfrFieldStateSourceLock:
    """Verify the exact source artifact before any FieldState-feature parsing.

    The source CSV checksum is checked against the existing normalized ANFR
    summary.  The source summary and raw-release manifest hashes are then
    carried into every derived bridge row and its output manifest.
    """
    if not source_csv_path.is_file():
        raise FileNotFoundError(f"ANFR normalized input is missing: {source_csv_path}")
    summary = _load_mapping(source_summary_path, label="ANFR source summary")
    raw_manifest = _load_mapping(
        source_manifest_path, label="ANFR raw-release manifest"
    )

    _require_equal(
        summary, "schema_version", ANFR_RF_SCHEMA_VERSION, label="ANFR source summary"
    )
    _require_equal(summary, "source_id", ANFR_SOURCE_ID, label="ANFR source summary")
    _require_equal(
        summary,
        "status",
        "MEASURED_AMBIENT_RF_LAYER_NOT_JOINED_TO_BIOLOGY",
        label="ANFR source summary",
    )
    _require_equal(
        raw_manifest,
        "scope_status",
        "MEASURED_AMBIENT_RF_NOT_JOINED_TO_BIOLOGY",
        label="ANFR raw-release manifest",
    )
    _require_equal(
        raw_manifest,
        "record_count",
        summary.get("row_count"),
        label="ANFR raw-release manifest",
    )

    artifact = summary.get("canonical_artifact")
    if not isinstance(artifact, Mapping):
        raise AnfrFieldStateBridgeError("ANFR source summary lacks canonical_artifact")
    expected_csv_sha256 = _nonempty_text(
        artifact.get("sha256"), label="canonical_artifact.sha256"
    )
    actual_csv_sha256 = _sha256_path(source_csv_path)
    if actual_csv_sha256 != expected_csv_sha256:
        raise AnfrFieldStateBridgeError(
            "ANFR normalized input checksum differs from its locked source summary"
        )

    source_manifest_id = _nonempty_text(
        raw_manifest.get("manifest_id"), label="manifest_id"
    )
    source_period = _nonempty_text(
        summary.get("temporal_coverage"), label="temporal_coverage"
    )
    source_row_count = raw_manifest.get("record_count")
    if (
        isinstance(source_row_count, bool)
        or not isinstance(source_row_count, int)
        or source_row_count < 1
    ):
        raise AnfrFieldStateBridgeError(
            "ANFR raw-release manifest record_count must be a positive integer"
        )
    return AnfrFieldStateSourceLock(
        source_manifest_id=source_manifest_id,
        source_manifest_sha256=_sha256_path(source_manifest_path),
        source_summary_sha256=_sha256_path(source_summary_path),
        source_artifact_sha256=actual_csv_sha256,
        source_row_count=source_row_count,
        source_period=source_period,
    )


def _validated_source_row(
    row: Mapping[str, object],
) -> tuple[str, str, float, float, float, dt.datetime, str]:
    _require_equal(row, "source_id", ANFR_SOURCE_ID, label="ANFR bridge input row")
    _require_equal(row, "geography_level", "SITE", label="ANFR bridge input row")
    _require_equal(row, "unit", "V_per_m", label="ANFR bridge input row")
    _require_equal(row, "measurement_type", "OBSERVED", label="ANFR bridge input row")
    _require_equal(
        row,
        "datetime_timezone_status",
        "LOCAL_TIME_REPORTED_TIMEZONE_NOT_DECLARED",
        label="ANFR bridge input row",
    )
    _require_equal(
        row,
        "personal_dose_status",
        "NOT_A_PERSONAL_OR_ORGANISM_DOSE",
        label="ANFR bridge input row",
    )
    _require_equal(
        row,
        "biological_join_status",
        "NOT_JOINED_TO_BIOLOGY",
        label="ANFR bridge input row",
    )
    _require_equal(
        row,
        "causal_analysis_eligibility",
        "NOT_ELIGIBLE_NO_PRE_SPECIFIED_MATCHED_BIOLOGICAL_PANEL",
        label="ANFR bridge input row",
    )
    geography_id = _nonempty_text(row.get("geography_id"), label="geography_id")
    probe_key = _nonempty_text(row.get("probe_key"), label="probe_key")
    _nonempty_text(row.get("raw_record_key"), label="raw_record_key")
    latitude = _finite(row.get("latitude"), label="latitude")
    longitude = _finite(row.get("longitude"), label="longitude")
    if not -90.0 <= latitude <= 90.0 or not -180.0 <= longitude <= 180.0:
        raise AnfrFieldStateBridgeError(
            "ANFR bridge input row has an invalid fixed-probe coordinate"
        )
    observed_at = _parse_unzoned_datetime(
        row.get("observation_datetime"), label="observation_datetime"
    )
    year_value = row.get("year")
    try:
        parsed_year = int(str(year_value))
    except ValueError as exc:
        raise AnfrFieldStateBridgeError(
            "ANFR bridge input row has an invalid year"
        ) from exc
    if parsed_year != observed_at.year:
        raise AnfrFieldStateBridgeError(
            "ANFR bridge input row year does not equal its published observation year"
        )
    return (
        geography_id,
        probe_key,
        latitude,
        longitude,
        _finite_nonnegative(row.get("value"), label="value"),
        observed_at,
        _nonempty_text(
            row.get("measurement_geometry_status"), label="measurement_geometry_status"
        ),
    )


def _iter_features_from_locked_source(
    *, source_csv_path: Path, source: AnfrFieldStateSourceLock
) -> Iterator[AnfrFieldStateFeature]:
    """Aggregate exact source rows at ``fixed probe × published calendar day``.

    The ANFR source does not declare a timezone.  The day is therefore merely
    a reproducible source-calendar bucket, not a biological circadian or
    personal-exposure interval.
    """
    accumulators: dict[tuple[str, dt.date], _SiteDayAccumulator] = {}
    source_rows_seen = 0
    with source_csv_path.open(encoding="utf-8", newline="") as handle:
        reader = csv.DictReader(handle)
        if reader.fieldnames is None:
            raise AnfrFieldStateBridgeError("ANFR normalized input has no CSV header")
        missing_columns = _REQUIRED_SOURCE_COLUMNS - set(reader.fieldnames)
        if missing_columns:
            raise AnfrFieldStateBridgeError(
                "ANFR normalized input lacks required columns: "
                + ", ".join(sorted(missing_columns))
            )
        for row in reader:
            source_rows_seen += 1
            (
                geography_id,
                probe_key,
                latitude,
                longitude,
                value,
                observed_at,
                geometry_status,
            ) = _validated_source_row(row)
            key = (geography_id, observed_at.date())
            accumulator = accumulators.get(key)
            if accumulator is None:
                accumulator = _SiteDayAccumulator(
                    geography_id=geography_id,
                    probe_key=probe_key,
                    latitude=latitude,
                    longitude=longitude,
                    published_day=observed_at.date(),
                    first_observation=observed_at,
                    last_observation=observed_at,
                    measurement_geometry_status=geometry_status,
                )
                accumulators[key] = accumulator
            accumulator.add(value=value, observed_at=observed_at, row=row)
    if source_rows_seen != source.source_row_count:
        raise AnfrFieldStateBridgeError(
            "ANFR normalized input row count differs from its locked raw-release manifest"
        )
    for key in sorted(accumulators):
        yield accumulators[key].feature(source)


def iter_anfr_fieldstate_features(
    *,
    source_csv_path: Path = DEFAULT_ANFR_INPUT_PATH,
    source_summary_path: Path = DEFAULT_ANFR_SOURCE_SUMMARY_PATH,
    source_manifest_path: Path = DEFAULT_ANFR_MANIFEST_PATH,
) -> Iterator[AnfrFieldStateFeature]:
    """Yield deterministic ambient-only FieldState feature candidates.

    The function verifies checksums before parsing.  It is intentionally not
    an adapter to :class:`~berm.physics.field_state.FieldState`.
    """
    source = load_anfr_fieldstate_source_lock(
        source_csv_path=source_csv_path,
        source_summary_path=source_summary_path,
        source_manifest_path=source_manifest_path,
    )
    yield from _iter_features_from_locked_source(
        source_csv_path=source_csv_path, source=source
    )


def _write_bytes_safely(path: Path, payload: bytes, *, replace: bool) -> str:
    if path.exists():
        if path.read_bytes() == payload:
            return "UNCHANGED_IDENTICAL"
        if not replace:
            raise FileExistsError(
                f"refusing to replace changed derived output {path}; pass --replace after review"
            )
        status = "REPLACED"
    else:
        status = "WRITTEN_NEW"
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_bytes(payload)
    return status


@dataclass(frozen=True)
class AnfrFieldStateBridgeArtifacts:
    """The deterministic artifact metadata returned by the bridge writer."""

    row_count: int
    csv_sha256: str
    site_count: int
    source: AnfrFieldStateSourceLock
    manifest: Mapping[str, Any]


def write_anfr_fieldstate_bridge(
    *,
    source_csv_path: Path = DEFAULT_ANFR_INPUT_PATH,
    source_summary_path: Path = DEFAULT_ANFR_SOURCE_SUMMARY_PATH,
    source_manifest_path: Path = DEFAULT_ANFR_MANIFEST_PATH,
    output_path: Path = DEFAULT_BRIDGE_OUTPUT_PATH,
    manifest_path: Path = DEFAULT_BRIDGE_MANIFEST_PATH,
    replace: bool = False,
) -> tuple[AnfrFieldStateBridgeArtifacts, dict[str, str]]:
    """Write a manifest-locked site-day ambient feature product.

    No caller-provided status option exists.  The output status is fixed to
    ``PARTIAL_FIELD_STATE`` and the output manifest records every component
    still absent from a genuine FieldState or biological panel.
    """
    source = load_anfr_fieldstate_source_lock(
        source_csv_path=source_csv_path,
        source_summary_path=source_summary_path,
        source_manifest_path=source_manifest_path,
    )
    output_path.parent.mkdir(parents=True, exist_ok=True)
    file_descriptor, temp_name = tempfile.mkstemp(
        prefix=f".{output_path.stem}.", suffix=".tmp", dir=output_path.parent
    )
    os.close(file_descriptor)
    temp_path = Path(temp_name)
    digest = hashlib.sha256()
    row_count = 0
    site_ids: set[str] = set()
    try:
        with temp_path.open("w", encoding="utf-8", newline="") as handle:
            line_buffer = io.StringIO(newline="")
            line_writer = csv.DictWriter(
                line_buffer,
                fieldnames=_OUTPUT_FIELDS,
                extrasaction="raise",
                lineterminator="\r\n",
            )
            line_writer.writeheader()
            header = line_buffer.getvalue()
            handle.write(header)
            digest.update(header.encode("utf-8"))
            for feature in _iter_features_from_locked_source(
                source_csv_path=source_csv_path, source=source
            ):
                line_buffer.seek(0)
                line_buffer.truncate(0)
                line_writer.writerow(feature.as_row())
                line = line_buffer.getvalue()
                handle.write(line)
                digest.update(line.encode("utf-8"))
                row_count += 1
                site_ids.add(feature.geography_id)
        if row_count < 1:
            raise AnfrFieldStateBridgeError(
                "ANFR FieldState bridge produced no site-day features"
            )
        artifact_sha256 = digest.hexdigest()
        manifest: dict[str, Any] = {
            "schema_version": ANFR_FIELDSTATE_BRIDGE_SCHEMA_VERSION,
            "pipeline_version": PIPELINE_VERSION,
            "status": ANFR_FIELDSTATE_BRIDGE_STATUS,
            "measurement_ready": False,
            "source": {
                "source_id": ANFR_SOURCE_ID,
                "source_manifest_id": source.source_manifest_id,
                "source_manifest_sha256": source.source_manifest_sha256,
                "source_summary_sha256": source.source_summary_sha256,
                "source_artifact_sha256": source.source_artifact_sha256,
                "source_row_count": source.source_row_count,
                "source_period": source.source_period,
            },
            "aggregation": {
                "aggregation_id": ANFR_FIELDSTATE_AGGREGATION_ID,
                "grain": "fixed_probe_x_published_calendar_day",
                "time_basis": "PUBLISHED_LOCAL_TIME_TIMEZONE_UNDECLARED",
                "statistics": [
                    "mean",
                    "rms",
                    "population_stddev",
                    "minimum",
                    "maximum",
                ],
                "no_spatial_interpolation": True,
                "no_country_year_aggregation": True,
            },
            "fieldstate_components_present": list(_PRESENT_COMPONENTS),
            "fieldstate_components_missing": list(_MISSING_COMPONENTS),
            "eligibility": {
                "fieldstate_core": ANFR_FIELDSTATE_BRIDGE_ELIGIBILITY,
                "biological_join": ANFR_FIELDSTATE_BRIDGE_ELIGIBILITY,
                "causal_analysis": ANFR_FIELDSTATE_BRIDGE_ELIGIBILITY,
            },
            "output": {
                "path": str(output_path),
                "sha256": artifact_sha256,
                "row_count": row_count,
                "site_count": len(site_ids),
            },
            "limitations": [
                "ANFR reports a fixed-probe ambient field-strength magnitude, not a personal or organism dose.",
                "A V/m magnitude is not converted into a normalized FieldState vector or biological dose.",
                "Published timestamps remain source-local because ANFR does not declare a timezone.",
                "No organ transfer, spectrum, phase/coherence, personal channel, receptor state, or biological endpoint is supplied.",
                "No spatial interpolation, country-year aggregation, lag selection, parameter fitting, or outcome prediction is performed.",
            ],
        }
        artifacts = AnfrFieldStateBridgeArtifacts(
            row_count=row_count,
            csv_sha256=artifact_sha256,
            site_count=len(site_ids),
            source=source,
            manifest=manifest,
        )
        if output_path.exists():
            if _sha256_path(output_path) == artifact_sha256:
                temp_path.unlink()
                csv_status = "UNCHANGED_IDENTICAL"
            elif not replace:
                raise FileExistsError(
                    f"refusing to replace changed derived output {output_path}; pass --replace after review"
                )
            else:
                os.replace(temp_path, output_path)
                csv_status = "REPLACED"
        else:
            os.replace(temp_path, output_path)
            csv_status = "WRITTEN_NEW"
        manifest_status = _write_bytes_safely(
            manifest_path, _canonical_json_bytes(manifest), replace=replace
        )
        return artifacts, {"csv": csv_status, "manifest": manifest_status}
    finally:
        if temp_path.exists():
            temp_path.unlink()


def _main(argv: list[str] | None = None) -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--replace", action="store_true")
    parser.add_argument("--output", type=Path, default=DEFAULT_BRIDGE_OUTPUT_PATH)
    parser.add_argument("--manifest", type=Path, default=DEFAULT_BRIDGE_MANIFEST_PATH)
    args = parser.parse_args(argv)
    artifacts, status = write_anfr_fieldstate_bridge(
        output_path=args.output, manifest_path=args.manifest, replace=args.replace
    )
    print(
        json.dumps(
            {
                "status": status,
                "row_count": artifacts.row_count,
                "site_count": artifacts.site_count,
                "csv_sha256": artifacts.csv_sha256,
                "fieldstate_status": ANFR_FIELDSTATE_BRIDGE_STATUS,
            },
            ensure_ascii=False,
            indent=2,
        )
    )
    return 0


if __name__ == "__main__":  # pragma: no cover - CLI integration
    raise SystemExit(_main())
