"""Immutable acquisition and normalization of ANFR autonomous RF probes.

The French Agence nationale des fréquences (ANFR) publishes repeated readings
from fixed autonomous probes.  Each source record supplies a field strength in
V/m, a local date/time and a fixed-probe location.  This makes it a useful
*measured ambient-RF layer*, not a personal dose and not a biological study.

The source is deliberately kept separate from BERM's exposure proxies and all
sentinel products.  In particular, this module never interpolates, spatially
joins, aggregates to a country-year, or relates an ANFR reading to a fertility
or animal endpoint.  A later study must first define a biological panel whose
location, time, measurement geometry and confounders genuinely match these
readings.

ANFR's historic direct CSV URL is not stable.  The supported public Data4Citizen
API is therefore frozen page-by-page: every publisher response is retained
unchanged in a release directory and checksummed in an immutable manifest.

Run from ``berm/``::

    python -m berm.data.anfr_rf acquire --release-id anfr_autonomous_probes_2026-08-19
    python -m berm.data.anfr_rf normalize

The raw release and generated measurement table are gitignored; the manifest,
code, schema and documentation are versioned.  A changed artifact is never
silently replaced.
"""

from __future__ import annotations

import argparse
import csv
import datetime as dt
import hashlib
import io
import json
import os
import re
import tempfile
from dataclasses import dataclass
from pathlib import Path
from typing import Any, Callable, Iterator, Mapping, Sequence
from urllib.parse import urlencode
from urllib.request import urlopen

from berm.data.contracts import GeographyLevel, MeasurementType, Sex


__all__ = [
    "ANFR_API_URL",
    "ANFR_CKAN_PACKAGE_URL",
    "ANFR_RESOURCE_ID",
    "ANFR_SOURCE_ID",
    "ANFR_RF_SCHEMA_VERSION",
    "DEFAULT_OUTPUT_PATH",
    "DEFAULT_SUMMARY_PATH",
    "MANIFEST_FILENAME",
    "PIPELINE_VERSION",
    "AnfrRfError",
    "AnfrRfArtifacts",
    "acquire_anfr_release",
    "iter_anfr_rows",
    "write_anfr_artifacts",
]


DATA_DIR = Path(__file__).resolve().parent.parent.parent / "data"
RAW_DIR = DATA_DIR / "raw"
MANIFEST_DIR = RAW_DIR / "manifests"
ANFR_SOURCE_ID = "ANFR_AUTONOMOUS_RF_PROBES"
ANFR_RESOURCE_ID = "bba1ee58-333f-4bde-84c3-0ab14145acc3"
ANFR_API_URL = "https://data.anfr.fr/d4c/api/records/2.0/search/"
ANFR_CKAN_PACKAGE_URL = (
    "https://data-backoffice.anfr.fr/api/3/action/package_show?"
    "id=28d187a3-1e67-4aa6-970e-e787db97aa99"
)
ANFR_LANDING_URL = "https://data.anfr.fr/visualisation?id=mesures-sondes-autonomes"
ANFR_LICENSE = "Licence Ouverte v2.0 (Etalab)"
DEFAULT_PAGE_SIZE = 100_000
DEFAULT_RELEASE_ID = "anfr_autonomous_probes_2026-08-19"
MANIFEST_FILENAME = f"{DEFAULT_RELEASE_ID}.manifest.json"
PIPELINE_VERSION = "anfr_autonomous_probes@v1.0.0"
ANFR_RF_SCHEMA_VERSION = "berm.measured_rf_site_time@v1.0.0"
DEFAULT_OUTPUT_PATH = DATA_DIR / "processed" / "anfr_autonomous_probes_site_time.csv"
DEFAULT_SUMMARY_PATH = DATA_DIR / "processed" / "anfr_autonomous_probes_summary.json"

_RELEASE_RE = re.compile(r"^[A-Za-z0-9][A-Za-z0-9._-]*$")
_EXPECTED_FIELDS = (
    "_id",
    "id",
    "e_volt_par_metre",
    "date",
    "ville",
    "code_postal",
    "adresse",
    "numero",
    "latitude",
    "longitude",
)
_OUTPUT_FIELDS = (
    "source_id",
    "source_url",
    "license",
    "retrieved_at",
    "source_period",
    "geography_id",
    "geography_level",
    "year",
    "sex",
    "age_group",
    "value",
    "unit",
    "measurement_type",
    "proxy_flag",
    "imputation_flag",
    "transform_pipeline_version",
    "observation_datetime",
    "source_local_datetime",
    "datetime_timezone_status",
    "datetime_parse_status",
    "probe_key",
    "city",
    "postal_code",
    "address_as_published",
    "latitude",
    "longitude",
    "measurement_geometry_status",
    "personal_dose_status",
    "biological_join_status",
    "causal_analysis_eligibility",
    "raw_record_key",
)


class AnfrRfError(RuntimeError):
    """Raised when the public ANFR response cannot be frozen or parsed safely."""


@dataclass(frozen=True)
class AnfrRfArtifacts:
    """Digest and readiness metadata for a streamed normalized RF table."""

    row_count: int
    csv_sha256: str
    source_period: str
    site_count: int
    summary: dict[str, Any]


def _today() -> str:
    return dt.date.today().isoformat()


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


def _relative_to_data(path: Path, data_dir: Path) -> str:
    return str(path.resolve().relative_to(data_dir.resolve()))


def _release_id(value: str) -> str:
    if not _RELEASE_RE.fullmatch(value):
        raise ValueError(
            "release_id must contain only letters, digits, '.', '_' or '-' "
            "and must not start with punctuation"
        )
    return value


def _fetch_bytes(url: str, timeout: float = 300.0) -> bytes:
    """Fetch an approved public HTTPS response with the runtime CA bundle.

    ``requests`` uses the bundled CA chain available in research environments
    where the stdlib's macOS certificate store may be incomplete.  The stdlib
    path remains a dependency-free fallback.
    """
    try:
        import requests
    except ImportError:  # pragma: no cover - base-Python fallback
        with urlopen(url, timeout=timeout) as response:  # noqa: S310 -- fixed HTTPS source
            return response.read()
    response = requests.get(url, timeout=timeout)
    response.raise_for_status()
    return response.content


def _page_url(*, offset: int, limit: int) -> str:
    return f"{ANFR_API_URL}?{urlencode({
        'resource_id': ANFR_RESOURCE_ID,
        'limit': limit,
        'offset': offset,
        'records_format': 'csv',
    })}"


def _parse_api_response(payload: bytes, *, require_total: bool) -> tuple[Mapping[str, Any], list[list[str]]]:
    try:
        value = json.loads(payload.decode("utf-8"))
    except (UnicodeDecodeError, json.JSONDecodeError) as exc:
        raise AnfrRfError("ANFR API response is not valid UTF-8 JSON") from exc
    if not isinstance(value, Mapping) or value.get("success") is not True:
        raise AnfrRfError(f"ANFR API reported an unsuccessful response: {value!r}")
    result = value.get("result")
    if not isinstance(result, Mapping):
        raise AnfrRfError("ANFR API response lacks a result object")
    if result.get("resource_id") != ANFR_RESOURCE_ID:
        raise AnfrRfError("ANFR API response identifies an unexpected resource")
    if result.get("records_format") != "csv":
        raise AnfrRfError("ANFR API did not return the requested CSV records format")
    if require_total and not isinstance(result.get("total"), int):
        raise AnfrRfError("first ANFR API page does not declare the record total")
    fields = result.get("fields")
    field_ids = tuple(field.get("id") for field in fields if isinstance(field, Mapping)) if isinstance(fields, list) else ()
    if field_ids != _EXPECTED_FIELDS:
        raise AnfrRfError(f"ANFR API field order changed: {field_ids!r}")
    records = result.get("records")
    if not isinstance(records, str):
        raise AnfrRfError("ANFR API CSV records are not a string")
    parsed = list(csv.reader(io.StringIO(records)))
    if any(len(row) != len(_EXPECTED_FIELDS) for row in parsed):
        raise AnfrRfError("ANFR API emitted an incomplete CSV record")
    return result, parsed


def _parse_source_datetime(value: str) -> tuple[dt.datetime, str]:
    """Parse either ANFR's published text time or its visible Excel serial.

    Most source rows use ``DD/MM/YYYY HH:MM``.  A later contiguous batch
    exposes the same Excel datetimes as decimal-comma serials (for example
    ``45253,04593``).  Rather than discarding those observed readings or
    pretending the representation never changed, the conversion is explicit
    on every affected normalized row.  The 1899-12-30 epoch is Excel's standard
    1900-date-system epoch after its historical leap-year offset.
    """
    text = value.strip()
    try:
        return dt.datetime.strptime(text, "%d/%m/%Y %H:%M"), "PUBLISHED_DMY_LOCAL_TIME"
    except ValueError:
        pass
    if not re.fullmatch(r"\d+(?:[,.]\d+)?", text):
        raise AnfrRfError(f"ANFR source date is neither text nor Excel serial: {value!r}")
    try:
        serial = float(text.replace(",", "."))
    except ValueError as exc:  # pragma: no cover - guarded by the regex
        raise AnfrRfError(f"ANFR Excel serial cannot be parsed: {value!r}") from exc
    if not 20_000 <= serial <= 80_000:
        raise AnfrRfError(f"ANFR Excel serial is outside the supported date range: {value!r}")
    return (
        dt.datetime(1899, 12, 30) + dt.timedelta(days=serial),
        "EXCEL_1900_SERIAL_CONVERTED_FROM_PUBLISHED_VALUE",
    )


def _year_bounds(rows: Sequence[Sequence[str]]) -> tuple[int, int]:
    years: list[int] = []
    for row in rows:
        years.append(_parse_source_datetime(row[3])[0].year)
    if not years:
        raise AnfrRfError("ANFR page contains no measurements")
    return min(years), max(years)


def _manifest_entry(path: Path, *, data_dir: Path, retrieved_at: str, note: str) -> dict[str, object]:
    return {
        "source_id": ANFR_SOURCE_ID,
        "path": _relative_to_data(path, data_dir),
        "original_filename": path.name,
        "bytes": path.stat().st_size,
        "sha256": _sha256_path(path),
        "retrieved_at": retrieved_at,
        "note": note,
    }


def acquire_anfr_release(
    *,
    release_id: str | None = None,
    data_dir: Path = DATA_DIR,
    manifest_dir: Path | None = None,
    retrieved_at: str | None = None,
    page_size: int = DEFAULT_PAGE_SIZE,
    fetch_bytes: Callable[[str], bytes] | None = None,
) -> dict[str, object]:
    """Freeze every page of one ANFR DataStore release without rewriting it.

    The API's direct CSV download URL is not stable.  This function retains its
    metadata response and exact paginated response bytes instead.  It creates a
    manifest only after the complete record count has been acquired.
    """
    retrieved_at = retrieved_at or _today()
    release_id = _release_id(release_id or f"anfr_autonomous_probes_{retrieved_at}")
    if not isinstance(page_size, int) or not 1 <= page_size <= DEFAULT_PAGE_SIZE:
        raise ValueError(f"page_size must be an integer from 1 to {DEFAULT_PAGE_SIZE}")
    manifest_dir = manifest_dir or data_dir / "raw" / "manifests"
    raw_root = data_dir / "raw" / "rf"
    release_dir = raw_root / release_id
    manifest_path = manifest_dir / f"{release_id}.manifest.json"
    if release_dir.exists() or manifest_path.exists():
        raise FileExistsError(
            f"release {release_id!r} already exists; use a new release id instead of overwriting it"
        )

    fetch = fetch_bytes or _fetch_bytes
    # Complete all network validation in a visible partial directory.  It is
    # never referenced by a manifest and cannot be mistaken for a valid source.
    raw_root.mkdir(parents=True, exist_ok=True)
    partial_dir = raw_root / f".{release_id}.partial"
    if partial_dir.exists():
        raise FileExistsError(f"partial ANFR acquisition already exists: {partial_dir}")
    partial_dir.mkdir()
    try:
        metadata_bytes = fetch(ANFR_CKAN_PACKAGE_URL)
        try:
            metadata = json.loads(metadata_bytes.decode("utf-8"))
            resource_rows = metadata["result"]["resources"]
            resource = next(row for row in resource_rows if row.get("id") == ANFR_RESOURCE_ID)
        except (KeyError, StopIteration, TypeError, UnicodeDecodeError, json.JSONDecodeError) as exc:
            raise AnfrRfError("ANFR CKAN metadata does not describe the expected resource") from exc
        if resource.get("format") != "CSV" or resource.get("datastore_active") is not True:
            raise AnfrRfError("ANFR resource is no longer an active CSV DataStore")

        metadata_path = partial_dir / "ckan_package_show.json"
        metadata_path.write_bytes(metadata_bytes)
        page_count = 0
        expected_total: int | None = None
        min_year: int | None = None
        max_year: int | None = None
        offset = 0
        while expected_total is None or offset < expected_total:
            payload = fetch(_page_url(offset=offset, limit=page_size))
            result, rows = _parse_api_response(payload, require_total=offset == 0)
            if expected_total is None:
                expected_total = int(result["total"])
                if expected_total <= 0:
                    raise AnfrRfError("ANFR API declared no records")
            if not rows:
                raise AnfrRfError(f"ANFR API returned no records at offset {offset}")
            if len(rows) > page_size or offset + len(rows) > expected_total:
                raise AnfrRfError("ANFR API page size is inconsistent with its declared total")
            lower, upper = _year_bounds(rows)
            min_year = lower if min_year is None else min(min_year, lower)
            max_year = upper if max_year is None else max(max_year, upper)
            page_path = partial_dir / f"records_offset_{offset:07d}.json"
            page_path.write_bytes(payload)
            page_count += 1
            offset += len(rows)
        if offset != expected_total or min_year is None or max_year is None:
            raise AnfrRfError("ANFR acquisition stopped before the declared record total")

        manifest_dir.mkdir(parents=True, exist_ok=True)
        # Rename first: until this point a failure leaves only an explicitly
        # partial directory, not a manifest that claims the bytes exist.
        partial_dir.rename(release_dir)
        metadata_path = release_dir / "ckan_package_show.json"
        files = [
            _manifest_entry(
                metadata_path,
                data_dir=data_dir,
                retrieved_at=retrieved_at,
                note="Exact public CKAN package_show metadata response used to identify the active DataStore resource and licence.",
            )
        ]
        files.extend(
            _manifest_entry(
                path,
                data_dir=data_dir,
                retrieved_at=retrieved_at,
                note=(
                    "Exact publisher Data4Citizen API response page; records_format=csv, "
                    "retained unchanged before normalization."
                ),
            )
            for path in sorted(release_dir.glob("records_offset_*.json"))
        )
        manifest: dict[str, object] = {
            "manifest_id": release_id,
            "description": (
                "Immutable ANFR autonomous fixed-probe ambient RF measurements. "
                "Measured RF layer only; never joined to biology or used for causal analysis."
            ),
            "retrieved_at": retrieved_at,
            "retrieval_method": (
                "Stored exact public ANFR CKAN metadata and Data4Citizen API responses "
                "page-by-page because the direct CSV URL is not stable."
            ),
            "source_landing_url": ANFR_LANDING_URL,
            "license": ANFR_LICENSE,
            "transform_pipeline_version": PIPELINE_VERSION,
            "resource_id": ANFR_RESOURCE_ID,
            "record_count": expected_total,
            "page_size": page_size,
            "page_count": page_count,
            "temporal_coverage": f"{min_year}/{max_year}",
            "fields": list(_EXPECTED_FIELDS),
            "files": files,
            "scope_status": "MEASURED_AMBIENT_RF_NOT_JOINED_TO_BIOLOGY",
        }
        manifest_path.write_bytes(_canonical_json_bytes(manifest))
        return manifest
    except Exception:
        # Keep recoverable source evidence only if someone explicitly wants to
        # inspect a failed transfer.  The leading dot plus lack of manifest makes
        # it unambiguously ineligible for every downstream reader.
        raise


def _load_manifest(path: Path) -> Mapping[str, Any]:
    try:
        value = json.loads(path.read_text(encoding="utf-8"))
    except (OSError, json.JSONDecodeError) as exc:
        raise AnfrRfError(f"invalid ANFR manifest: {path}") from exc
    if not isinstance(value, Mapping) or value.get("resource_id") != ANFR_RESOURCE_ID:
        raise AnfrRfError(f"manifest does not identify the ANFR autonomous-probe resource: {path}")
    if not isinstance(value.get("files"), list) or not isinstance(value.get("temporal_coverage"), str):
        raise AnfrRfError(f"ANFR manifest is incomplete: {path}")
    return value


def _checked_response_pages(
    *, data_dir: Path,
    manifest_path: Path,
    release_dir: Path | None,
) -> tuple[Mapping[str, Any], list[Path]]:
    manifest = _load_manifest(manifest_path)
    raw_release = release_dir or data_dir / "raw" / "rf" / str(manifest["manifest_id"])
    if not raw_release.exists():
        raise FileNotFoundError(f"held ANFR raw release is missing: {raw_release}")
    file_entries = manifest["files"]
    pages: list[Path] = []
    for entry in file_entries:
        if not isinstance(entry, Mapping):
            raise AnfrRfError("ANFR manifest contains a malformed file entry")
        raw_path = data_dir / str(entry.get("path", ""))
        if not raw_path.exists():
            raise FileNotFoundError(f"ANFR raw file is missing: {raw_path}")
        if _relative_to_data(raw_path, data_dir) != entry.get("path"):
            raise AnfrRfError(f"ANFR manifest path mismatch: {entry.get('path')!r}")
        if raw_path.stat().st_size != entry.get("bytes") or _sha256_path(raw_path) != entry.get("sha256"):
            raise AnfrRfError(f"ANFR raw file checksum or size mismatch: {raw_path}")
        if raw_path.name.startswith("records_offset_"):
            pages.append(raw_path)
    if len(pages) != manifest.get("page_count"):
        raise AnfrRfError("ANFR manifest page count does not match held response pages")
    return manifest, sorted(pages)


def _site_id(probe_key: str, latitude: str, longitude: str) -> str:
    material = f"{probe_key}|{latitude}|{longitude}".encode("utf-8")
    return f"FRA-ANFR-{hashlib.sha256(material).hexdigest()[:12].upper()}"


def _row_from_source(values: Sequence[str], *, retrieved_at: str, source_period: str) -> dict[str, object]:
    record = dict(zip(_EXPECTED_FIELDS, values, strict=True))
    try:
        local_datetime, datetime_parse_status = _parse_source_datetime(record["date"])
        field_strength = float(record["e_volt_par_metre"])
        latitude = float(record["latitude"])
        longitude = float(record["longitude"])
    except (TypeError, ValueError) as exc:
        raise AnfrRfError(f"ANFR record has an invalid value: {record!r}") from exc
    if field_strength < 0 or not -90 <= latitude <= 90 or not -180 <= longitude <= 180:
        raise AnfrRfError(f"ANFR record is outside physical/geographic bounds: {record!r}")
    probe_key = record["numero"].strip()
    if not probe_key:
        raise AnfrRfError(f"ANFR record lacks a fixed-probe key: {record!r}")
    return {
        "source_id": ANFR_SOURCE_ID,
        "source_url": ANFR_LANDING_URL,
        "license": ANFR_LICENSE,
        "retrieved_at": retrieved_at,
        "source_period": source_period,
        "geography_id": _site_id(probe_key, record["latitude"], record["longitude"]),
        "geography_level": GeographyLevel.SITE.value,
        "year": local_datetime.year,
        "sex": Sex.NA.value,
        "age_group": "NA",
        "value": field_strength,
        "unit": "V_per_m",
        "measurement_type": MeasurementType.OBSERVED.value,
        "proxy_flag": False,
        "imputation_flag": False,
        "transform_pipeline_version": PIPELINE_VERSION,
        "observation_datetime": local_datetime.strftime("%Y-%m-%dT%H:%M:00"),
        "source_local_datetime": record["date"],
        "datetime_timezone_status": "LOCAL_TIME_REPORTED_TIMEZONE_NOT_DECLARED",
        "datetime_parse_status": datetime_parse_status,
        "probe_key": probe_key,
        "city": record["ville"],
        "postal_code": record["code_postal"],
        "address_as_published": record["adresse"],
        "latitude": latitude,
        "longitude": longitude,
        "measurement_geometry_status": "FIXED_AUTONOMOUS_PROBE_AMBIENT_FIELD_AS_PUBLISHED",
        "personal_dose_status": "NOT_A_PERSONAL_OR_ORGANISM_DOSE",
        "biological_join_status": "NOT_JOINED_TO_BIOLOGY",
        "causal_analysis_eligibility": "NOT_ELIGIBLE_NO_PRE_SPECIFIED_MATCHED_BIOLOGICAL_PANEL",
        "raw_record_key": f"anfr:{record['id']}",
    }


def iter_anfr_rows(
    *,
    data_dir: Path = DATA_DIR,
    manifest_path: Path | None = None,
    release_dir: Path | None = None,
) -> Iterator[dict[str, object]]:
    """Yield validated source-faithful measurement rows from a held release."""
    manifest_path = manifest_path or data_dir / "raw" / "manifests" / MANIFEST_FILENAME
    manifest, pages = _checked_response_pages(
        data_dir=data_dir,
        manifest_path=manifest_path,
        release_dir=release_dir,
    )
    count = 0
    for path in pages:
        result, parsed = _parse_api_response(path.read_bytes(), require_total=False)
        del result
        for values in parsed:
            count += 1
            yield _row_from_source(
                values,
                retrieved_at=str(manifest["retrieved_at"]),
                source_period=str(manifest["temporal_coverage"]),
            )
    if count != manifest.get("record_count"):
        raise AnfrRfError(
            f"ANFR held record count mismatch: manifest={manifest.get('record_count')!r} actual={count}"
        )


def _write_bytes_safely(path: Path, payload: bytes, *, replace: bool) -> str:
    if path.exists():
        if path.read_bytes() == payload:
            return "UNCHANGED_IDENTICAL"
        if not replace:
            raise FileExistsError(f"refusing to replace changed derived output {path}; pass --replace after review")
        status = "REPLACED"
    else:
        status = "WRITTEN_NEW"
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_bytes(payload)
    return status


def write_anfr_artifacts(
    *,
    data_dir: Path = DATA_DIR,
    manifest_path: Path | None = None,
    release_dir: Path | None = None,
    output_path: Path = DEFAULT_OUTPUT_PATH,
    summary_path: Path = DEFAULT_SUMMARY_PATH,
    replace: bool = False,
) -> tuple[AnfrRfArtifacts, dict[str, str]]:
    """Stream a canonical measured-RF table and a fail-closed readiness summary."""
    output_path.parent.mkdir(parents=True, exist_ok=True)
    fd, temp_name = tempfile.mkstemp(prefix=f".{output_path.stem}.", suffix=".tmp", dir=output_path.parent)
    os.close(fd)
    temp_path = Path(temp_name)
    digest = hashlib.sha256()
    row_count = 0
    site_ids: set[str] = set()
    years: set[int] = set()
    datetime_parse_counts: dict[str, int] = {}
    try:
        with temp_path.open("w", encoding="utf-8", newline="") as handle:
            header = ",".join(_OUTPUT_FIELDS) + "\r\n"
            handle.write(header)
            digest.update(header.encode("utf-8"))
            for row in iter_anfr_rows(
                data_dir=data_dir,
                manifest_path=manifest_path,
                release_dir=release_dir,
            ):
                line_buffer = io.StringIO(newline="")
                line_writer = csv.DictWriter(line_buffer, fieldnames=_OUTPUT_FIELDS, extrasaction="raise")
                line_writer.writerow(row)
                line = line_buffer.getvalue()
                handle.write(line)
                digest.update(line.encode("utf-8"))
                row_count += 1
                site_ids.add(str(row["geography_id"]))
                years.add(int(row["year"]))
                parse_status = str(row["datetime_parse_status"])
                datetime_parse_counts[parse_status] = datetime_parse_counts.get(parse_status, 0) + 1
        if not years:
            raise AnfrRfError("ANFR normalization produced no rows")
        source_period = f"{min(years)}/{max(years)}"
        summary = {
            "schema_version": ANFR_RF_SCHEMA_VERSION,
            "pipeline_version": PIPELINE_VERSION,
            "status": "MEASURED_AMBIENT_RF_LAYER_NOT_JOINED_TO_BIOLOGY",
            "evidence_status": "ACTIVE_MEASURED_FIELDSTATE_COMPONENT_PENDING_DIRECT_ENDPOINT_CALIBRATION",
            "evidence_roles": [
                "measured ambient-RF likelihood/scale anchor",
                "local, mobility-weighted and local-area FieldState input",
                "species/organ transfer and posterior-predictive signature input",
            ],
            "source_id": ANFR_SOURCE_ID,
            "source_url": ANFR_LANDING_URL,
            "measurement_unit": "V_per_m",
            "measurement_type": "OBSERVED",
            "row_count": row_count,
            "site_count": len(site_ids),
            "temporal_coverage": source_period,
            "datetime_parse_counts": dict(sorted(datetime_parse_counts.items())),
            "canonical_artifact": {
                "path": str(output_path),
                "sha256": digest.hexdigest(),
            },
            "explicit_limitations": [
                "Fixed-probe ambient field strength is not individual, animal or personal RF dose.",
                "Source timestamps are retained as local times because the published API does not declare a timezone.",
                "Rows exposed by the source as Excel serial dates retain their original value and an explicit conversion status.",
                "No fertility, semen, veterinary or ecological endpoint is joined by this pipeline.",
                "No spatial interpolation, country-year aggregation, lag selection or causal effect estimate is performed.",
            ],
            "f_test_readiness": {
                f"F{i}": "BLOCKED_NO_PRE_SPECIFIED_MATCHED_BIOLOGICAL_PANEL" for i in range(1, 7)
            },
            "readiness_scope": (
                "F1-F6 statuses apply only to the pre-specified direct "
                "sentinel-to-human endpoint criteria, not to the measured RF layer's "
                "FieldState or transfer-evidence role."
            ),
        }
        artifact = AnfrRfArtifacts(
            row_count=row_count,
            csv_sha256=digest.hexdigest(),
            source_period=source_period,
            site_count=len(site_ids),
            summary=summary,
        )
        if output_path.exists():
            if _sha256_path(output_path) == artifact.csv_sha256:
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
        summary_status = _write_bytes_safely(
            summary_path,
            _canonical_json_bytes(summary),
            replace=replace,
        )
        return artifact, {"csv": csv_status, "summary": summary_status}
    finally:
        if temp_path.exists():
            temp_path.unlink()


def _main(argv: list[str] | None = None) -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    sub = parser.add_subparsers(dest="command", required=True)
    acquire = sub.add_parser("acquire", help="freeze a complete ANFR DataStore release")
    acquire.add_argument("--release-id", default=None)
    acquire.add_argument("--page-size", type=int, default=DEFAULT_PAGE_SIZE)
    acquire.add_argument("--retrieved-at", default=None)
    normalize = sub.add_parser("normalize", help="stream a held release into the isolated RF table")
    normalize.add_argument("--replace", action="store_true")
    args = parser.parse_args(argv)
    if args.command == "acquire":
        result = acquire_anfr_release(
            release_id=args.release_id,
            page_size=args.page_size,
            retrieved_at=args.retrieved_at,
        )
        print(json.dumps(result, ensure_ascii=False, indent=2))
        return 0
    if args.command == "normalize":
        artifact, status = write_anfr_artifacts(replace=args.replace)
        print(json.dumps({"status": status, "summary": artifact.summary}, ensure_ascii=False, indent=2))
        return 0
    raise AssertionError(f"unhandled command {args.command!r}")


if __name__ == "__main__":  # pragma: no cover - CLI integration
    raise SystemExit(_main())
