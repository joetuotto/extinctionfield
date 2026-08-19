"""Audit and normalize the *held* spatial context in the MUST-B ZIP.

The EU Pollinator Hub catalogue for MUSTB76.0.0 advertises nine relational
parts.  The public ``Download entire dataset`` ZIP acquired on 2026-08-19
contains only two data CSVs: seven apiary-site coordinates and 453 botanical
survey-polygon coordinates.  It does not contain the portal-listed hive,
management, inspection, laboratory, pesticide, resource, or observation
tables.  This module deliberately preserves that distinction.

It creates two standalone spatial-context tables and an availability summary.
They are useful only to locate the held study context; they are not a bee
health endpoint, a biological covariate panel, an RF measurement, a proxy for
RF, or an eligible input to CSLI / causal analysis.

Run from ``berm/`` with::

    python -m berm.data.mustb_normalize

Raw bytes are never changed.  A changed derived output requires ``--replace``.
"""

from __future__ import annotations

import argparse
import csv
import hashlib
import io
import json
import zipfile
from dataclasses import dataclass
from pathlib import Path
from typing import Any, Mapping, Sequence

from berm.data.mustb_download import MUSTB_SOURCE_ID

__all__ = [
    "PIPELINE_VERSION",
    "MUSTB_SPATIAL_CONTEXT_SCHEMA_VERSION",
    "SOURCE_ID",
    "DEFAULT_SITE_OUTPUT_PATH",
    "DEFAULT_POLYGON_OUTPUT_PATH",
    "DEFAULT_SUMMARY_PATH",
    "MustbSpatialContextArtifacts",
    "build_mustb_spatial_context_artifacts",
    "write_mustb_spatial_context_artifacts",
]


DATA_DIR = Path(__file__).resolve().parent.parent.parent / "data"
SOURCE_ID = MUSTB_SOURCE_ID
SOURCE_URL = "https://app.pollinatorhub.eu/dataset-discovery/MUSTB76.0.0"
SOURCE_LICENSE = "CC-BY-4.0"
SOURCE_PERIOD = "2019/2020"
MANIFEST_FILENAME = "mustb_2026-08-19.manifest.json"
RAW_RELATIVE_PATH = Path("raw/pollinator_hub/mustb_2026-08-19/must-b.zip")
PIPELINE_VERSION = "mustb_spatial_context@v1.0.0"
MUSTB_SPATIAL_CONTEXT_SCHEMA_VERSION = "berm.mustb_spatial_context@v1.0.0"

DEFAULT_SITE_OUTPUT_PATH = DATA_DIR / "processed" / "mustb_apiary_site_context.csv"
DEFAULT_POLYGON_OUTPUT_PATH = DATA_DIR / "processed" / "mustb_botanical_survey_polygon_context.csv"
DEFAULT_SUMMARY_PATH = DATA_DIR / "processed" / "mustb_spatial_context_availability.json"

SITE_MEMBER = "MUSTB76.STSCR130.0/euph_000012_mustb_table_01_sites_coord.csv"
POLYGON_MEMBER = "MUSTB76.PLYGN131.0/euph_000012_mustb_table_02_polygons_coord.csv"
SITE_HEADERS = ("siteNo", "siteName", "country", "UTMCoordinates")
POLYGON_HEADERS = ("siteNo", "UniquePolyID", "Area", "UTMCoordinatesOfCentroid")

# These counts are catalogue metadata, not observations held in this checkout.
# Keeping them alongside the archive inventory makes the missingness visible
# rather than silently treating a 12-member ZIP as the advertised full release.
PORTAL_TABLES: tuple[dict[str, object], ...] = (
    {"part_id": "STSCR130", "label": "site coordinates", "portal_record_count": 7, "member": SITE_MEMBER},
    {"part_id": "PLYGN131", "label": "botanical survey polygon coordinates", "portal_record_count": 453, "member": POLYGON_MEMBER},
    {"part_id": "TBLPS132", "label": "pesticide applications", "portal_record_count": 1, "member": None},
    {"part_id": "TBLRS133", "label": "botanical-survey resource-providing units", "portal_record_count": 6866, "member": None},
    {"part_id": "TBLHV134", "label": "hive/colony master list", "portal_record_count": 80, "member": None},
    {"part_id": "TBLVC135", "label": "colony management diary", "portal_record_count": 1781, "member": None},
    {"part_id": "TBLVC136", "label": "colony inspections", "portal_record_count": 435964, "member": None},
    {"part_id": "TBLVS137", "label": "SSD2 laboratory results", "portal_record_count": 1861, "member": None},
    {"part_id": "TBLVB138", "label": "observation-colony records", "portal_record_count": 769, "member": None},
)

SITE_HEADER = (
    "source_id", "source_url", "license", "retrieved_at", "source_period",
    "site_no", "site_name", "country_iso2", "utm_coordinates",
    "context_type", "row_date_status", "biological_endpoint_status",
    "biological_covariate_status", "rf_status", "csli_eligibility",
    "causal_join_eligibility", "raw_member", "raw_record_key",
)
POLYGON_HEADER = (
    "source_id", "source_url", "license", "retrieved_at", "source_period",
    "site_no", "polygon_id", "area_source_value", "area_unit_status",
    "utm_coordinates_of_centroid", "context_type", "row_date_status",
    "biological_endpoint_status", "biological_covariate_status", "rf_status",
    "csli_eligibility", "causal_join_eligibility", "raw_member", "raw_record_key",
)


@dataclass(frozen=True)
class MustbSpatialContextArtifacts:
    """Deterministic, limited-scope artifacts derived from one held archive."""

    site_rows: tuple[dict[str, str], ...]
    polygon_rows: tuple[dict[str, str], ...]
    site_csv_bytes: bytes
    polygon_csv_bytes: bytes
    summary: dict[str, Any]


def _canonical_json_bytes(value: Any) -> bytes:
    return (json.dumps(value, ensure_ascii=False, sort_keys=True, separators=(",", ":")) + "\n").encode("utf-8")


def _sha256_path(path: Path) -> str:
    digest = hashlib.sha256()
    with path.open("rb") as handle:
        for block in iter(lambda: handle.read(1024 * 1024), b""):
            digest.update(block)
    return digest.hexdigest()


def _data_relative(path: Path, data_dir: Path) -> str:
    try:
        return str(path.resolve().relative_to(data_dir.resolve()))
    except ValueError:
        return str(path)


def _default_manifest_path(data_dir: Path) -> Path:
    return data_dir / "raw" / "manifests" / MANIFEST_FILENAME


def _load_manifest(path: Path) -> dict[str, Any]:
    with path.open(encoding="utf-8") as handle:
        value = json.load(handle)
    if not isinstance(value, dict) or not isinstance(value.get("files"), list):
        raise ValueError(f"invalid MUST-B manifest: {path}")
    return value


def _checked_archive(*, data_dir: Path, manifest_path: Path, archive_path: Path | None) -> tuple[Path, Mapping[str, Any], Mapping[str, Any]]:
    manifest = _load_manifest(manifest_path)
    entries = [
        entry for entry in manifest["files"]
        if isinstance(entry, Mapping) and entry.get("source_id") == SOURCE_ID
    ]
    if len(entries) != 1:
        raise ValueError(f"expected exactly one MUST-B source entry in {manifest_path}, got {len(entries)}")
    entry = entries[0]
    raw_path = archive_path or data_dir / str(entry.get("path", ""))
    if not raw_path.exists():
        raise FileNotFoundError(f"held MUST-B archive is missing: {raw_path}")
    if entry.get("path") != _data_relative(raw_path, data_dir):
        raise ValueError(f"MUST-B manifest path mismatch: {entry.get('path')!r} != {_data_relative(raw_path, data_dir)!r}")
    actual_sha = _sha256_path(raw_path)
    if actual_sha != entry.get("sha256"):
        raise ValueError(f"MUST-B raw checksum mismatch: manifest={entry.get('sha256')!r} actual={actual_sha!r}")
    if raw_path.stat().st_size != entry.get("bytes"):
        raise ValueError(f"MUST-B raw byte-size mismatch: manifest={entry.get('bytes')!r} actual={raw_path.stat().st_size!r}")
    return raw_path, manifest, entry


def _read_member(archive: zipfile.ZipFile, member: str, expected_headers: tuple[str, ...]) -> list[dict[str, str]]:
    try:
        with archive.open(member) as binary:
            text = io.TextIOWrapper(binary, encoding="utf-8-sig", newline="")
            reader = csv.DictReader(text)
            headers = tuple(reader.fieldnames or ())
            if headers != expected_headers:
                raise ValueError(f"MUST-B member {member} header mismatch: expected {expected_headers!r}, got {headers!r}")
            rows = [{key: (value or "").strip() for key, value in row.items()} for row in reader]
    except KeyError as exc:
        raise ValueError(f"MUST-B archive does not contain required held member {member}") from exc
    if not rows:
        raise ValueError(f"MUST-B member {member} is empty")
    return rows


def _csv_bytes(rows: Sequence[Mapping[str, str]], header: tuple[str, ...]) -> bytes:
    buffer = io.StringIO(newline="")
    writer = csv.DictWriter(buffer, fieldnames=header, extrasaction="raise", lineterminator="\n")
    writer.writeheader()
    for row in rows:
        writer.writerow({name: row.get(name, "") for name in header})
    return buffer.getvalue().encode("utf-8")


def _presence_inventory(*, names: set[str], held_counts: Mapping[str, int]) -> list[dict[str, object]]:
    inventory: list[dict[str, object]] = []
    for table in PORTAL_TABLES:
        member = table["member"]
        held = isinstance(member, str) and member in names
        inventory.append({
            "part_id": table["part_id"],
            "portal_label": table["label"],
            "portal_record_count": table["portal_record_count"],
            "archive_status": "HELD" if held else "NOT_PRESENT_IN_HELD_ARCHIVE",
            "held_member": member if held else None,
            "held_record_count": held_counts.get(str(table["part_id"])) if held else None,
        })
    return inventory


def build_mustb_spatial_context_artifacts(
    *,
    data_dir: Path = DATA_DIR,
    manifest_path: Path | None = None,
    archive_path: Path | None = None,
    site_output_path: Path = DEFAULT_SITE_OUTPUT_PATH,
    polygon_output_path: Path = DEFAULT_POLYGON_OUTPUT_PATH,
) -> MustbSpatialContextArtifacts:
    """Build the honest held-archive subset and an explicit missingness audit."""
    manifest_path = manifest_path or _default_manifest_path(data_dir)
    raw_path, manifest, entry = _checked_archive(
        data_dir=data_dir, manifest_path=manifest_path, archive_path=archive_path
    )
    try:
        with zipfile.ZipFile(raw_path) as archive:
            names = {info.filename for info in archive.infolist() if not info.is_dir()}
            site_raw = _read_member(archive, SITE_MEMBER, SITE_HEADERS)
            polygon_raw = _read_member(archive, POLYGON_MEMBER, POLYGON_HEADERS)
    except zipfile.BadZipFile as exc:
        raise ValueError(f"MUST-B held source is not a ZIP: {raw_path}") from exc

    retrieved_at = str(entry.get("retrieved_at", manifest.get("retrieved_at", "")))
    common = {
        "source_id": SOURCE_ID,
        "source_url": SOURCE_URL,
        "license": SOURCE_LICENSE,
        "retrieved_at": retrieved_at,
        "source_period": SOURCE_PERIOD,
        "row_date_status": "NOT_PRESENT_IN_HELD_TABLE",
        "biological_endpoint_status": "NOT_HELD_IN_ARCHIVE",
        "biological_covariate_status": "NOT_HELD_IN_ARCHIVE",
        "rf_status": "NOT_MEASURED",
        "csli_eligibility": "INELIGIBLE_NO_BIOLOGICAL_ENDPOINT_OR_RF",
        "causal_join_eligibility": "INELIGIBLE_NO_OUTCOME_OR_RF",
    }
    site_rows = tuple({
        **common,
        "site_no": row["siteNo"],
        "site_name": row["siteName"],
        "country_iso2": row["country"],
        "utm_coordinates": row["UTMCoordinates"],
        "context_type": "APIARY_SITE_COORDINATE",
        "raw_member": SITE_MEMBER,
        "raw_record_key": row["siteNo"],
    } for row in site_raw)
    polygon_rows = tuple({
        **common,
        "site_no": row["siteNo"],
        "polygon_id": row["UniquePolyID"],
        "area_source_value": row["Area"],
        "area_unit_status": "NOT_STATED_IN_HELD_CSV",
        "utm_coordinates_of_centroid": row["UTMCoordinatesOfCentroid"],
        "context_type": "BOTANICAL_SURVEY_POLYGON_COORDINATE",
        "raw_member": POLYGON_MEMBER,
        "raw_record_key": row["UniquePolyID"],
    } for row in polygon_raw)
    site_csv_bytes = _csv_bytes(site_rows, SITE_HEADER)
    polygon_csv_bytes = _csv_bytes(polygon_rows, POLYGON_HEADER)
    inventory = _presence_inventory(
        names=names,
        held_counts={"STSCR130": len(site_rows), "PLYGN131": len(polygon_rows)},
    )
    summary: dict[str, Any] = {
        "schema_version": MUSTB_SPATIAL_CONTEXT_SCHEMA_VERSION,
        "pipeline_version": PIPELINE_VERSION,
        "status": "PARTIAL_SPATIAL_CONTEXT_ONLY_NOT_SENTINEL_ENDPOINT_OR_CSLI_ELIGIBLE",
        "source": {
            "source_id": SOURCE_ID,
            "source_url": SOURCE_URL,
            "license": SOURCE_LICENSE,
            "source_period": SOURCE_PERIOD,
            "retrieved_at": retrieved_at,
        },
        "raw_archive": {
            "path": _data_relative(raw_path, data_dir),
            "bytes": raw_path.stat().st_size,
            "sha256": _sha256_path(raw_path),
            "manifest_id": manifest.get("manifest_id"),
            "archive_member_count": len(names),
            "portal_catalogue_complete": False,
        },
        "held_spatial_context": {
            "apiary_site_row_count": len(site_rows),
            "apiary_site_ids": sorted({row["site_no"] for row in site_rows}, key=lambda value: int(value)),
            "country_iso2": sorted({row["country_iso2"] for row in site_rows}),
            "botanical_survey_polygon_row_count": len(polygon_rows),
            "site_artifact": {
                "path": _data_relative(site_output_path, data_dir),
                "sha256": hashlib.sha256(site_csv_bytes).hexdigest(),
            },
            "polygon_artifact": {
                "path": _data_relative(polygon_output_path, data_dir),
                "sha256": hashlib.sha256(polygon_csv_bytes).hexdigest(),
            },
        },
        "portal_catalogue_vs_held_archive": inventory,
        "endpoint_and_covariate_missingness": {
            "colony_health_or_reproductive_endpoint": "NOT_HELD_IN_ARCHIVE",
            "hive_identity_or_colony_linkage": "NOT_HELD_IN_ARCHIVE",
            "management_events": "NOT_HELD_IN_ARCHIVE",
            "laboratory_results": "NOT_HELD_IN_ARCHIVE",
            "pesticide_application_records": "NOT_HELD_IN_ARCHIVE",
            "resource_providing_plant_records": "NOT_HELD_IN_ARCHIVE",
            "observation_dates": "NOT_PRESENT_IN_HELD_TABLE",
            "rf_exposure_or_dosimetry": "NOT_MEASURED",
        },
        "explicit_nonuses": [
            "not a biological endpoint or covariate panel in the held archive",
            "not an RF-exposure dataset or RF proxy",
            "not eligible for CSLI, F1-F6, or a BERM causal join",
            "not temporally joinable at row level because held tables contain no observation dates",
            "not a basis for inferring flower resources from polygon geometry alone",
        ],
        "acquisition_next_step": (
            "Acquire and checksum each portal part 132-138 separately from its public raw-download "
            "endpoint, verify its schema and linkage keys, then register it as a new immutable release "
            "before treating it as a biological covariate or endpoint."
        ),
    }
    return MustbSpatialContextArtifacts(
        site_rows=site_rows,
        polygon_rows=polygon_rows,
        site_csv_bytes=site_csv_bytes,
        polygon_csv_bytes=polygon_csv_bytes,
        summary=summary,
    )


def _write_if_safe(path: Path, payload: bytes, *, replace: bool) -> str:
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


def write_mustb_spatial_context_artifacts(
    artifacts: MustbSpatialContextArtifacts,
    *,
    site_output_path: Path = DEFAULT_SITE_OUTPUT_PATH,
    polygon_output_path: Path = DEFAULT_POLYGON_OUTPUT_PATH,
    summary_path: Path = DEFAULT_SUMMARY_PATH,
    replace: bool = False,
) -> dict[str, str]:
    """Write context outputs only; raw MUST-B bytes are never touched."""
    return {
        "sites": _write_if_safe(site_output_path, artifacts.site_csv_bytes, replace=replace),
        "polygons": _write_if_safe(polygon_output_path, artifacts.polygon_csv_bytes, replace=replace),
        "summary": _write_if_safe(summary_path, _canonical_json_bytes(artifacts.summary), replace=replace),
    }


def main(argv: Sequence[str] | None = None) -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--archive", type=Path, default=None)
    parser.add_argument("--manifest", type=Path, default=None)
    parser.add_argument("--site-output", type=Path, default=DEFAULT_SITE_OUTPUT_PATH)
    parser.add_argument("--polygon-output", type=Path, default=DEFAULT_POLYGON_OUTPUT_PATH)
    parser.add_argument("--summary", type=Path, default=DEFAULT_SUMMARY_PATH)
    parser.add_argument("--replace", action="store_true", help="replace a changed derived output after review")
    args = parser.parse_args(argv)
    artifacts = build_mustb_spatial_context_artifacts(
        archive_path=args.archive,
        manifest_path=args.manifest,
        site_output_path=args.site_output,
        polygon_output_path=args.polygon_output,
    )
    statuses = write_mustb_spatial_context_artifacts(
        artifacts,
        site_output_path=args.site_output,
        polygon_output_path=args.polygon_output,
        summary_path=args.summary,
        replace=args.replace,
    )
    print(json.dumps({"sites": len(artifacts.site_rows), "polygons": len(artifacts.polygon_rows), "write": statuses}, sort_keys=True))
    return 0


if __name__ == "__main__":  # pragma: no cover - CLI integration
    raise SystemExit(main())
