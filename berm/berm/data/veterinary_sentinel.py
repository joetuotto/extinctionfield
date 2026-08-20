"""Deterministic ingest for held, open veterinary sentinel releases.

This module currently supports exactly one deliberately isolated release:
Fielding's 2025 Goa free-roaming-dog sterilisation RCT.  It preserves two
source-reported reproductive *counts* at site-by-survey-time grain:

* puppies observed on a multi-route survey; and
* lactating adult females observed on a multi-route survey.

The release has ten anonymised sites in five intervention/control pairs and
does not contain RF dosimetry or re-identifiable coordinates.  It is therefore
not a direct CSLI table, exposure proxy or F1--F6 coefficient dataset.  It is
nevertheless an active veterinary endpoint and protocol-context layer: it
preserves a directly observed reproductive-population outcome, its response
definition, intervention structure and relevant source covariates for the
wider species/endpoint evidence map.  It cannot by itself identify an
RF/FieldState effect or a human transfer coefficient.

The raw files are acquired manually into ``data/raw/`` and registered in a
versioned manifest.  This module never contacts the network and refuses to use
raw bytes whose recorded checksum does not match.

Run from ``berm/`` with::

    python -m berm.data.veterinary_sentinel

Derived output is fail-closed: use ``--replace`` only when deliberately
rebuilding a changed output.  Raw source artefacts and manifests are never
written by this module.
"""

from __future__ import annotations

import argparse
import csv
import hashlib
import io
import json
from collections import Counter
from dataclasses import dataclass
from datetime import datetime
from pathlib import Path
from typing import Any, Iterable, Mapping, Sequence

from berm.data.contracts import GeographyLevel, MeasurementType, Sex, validate_rows
from berm.data.registry import known_source_ids

__all__ = [
    "PIPELINE_VERSION",
    "VETERINARY_SENTINEL_SCHEMA_VERSION",
    "SOURCE_ID",
    "DEFAULT_OUTPUT_PATH",
    "DEFAULT_SUMMARY_PATH",
    "VeterinarySentinelArtifacts",
    "normalize_fielding_goa_rows",
    "build_fielding_goa_artifacts",
    "write_fielding_goa_artifacts",
]


DATA_DIR = Path(__file__).resolve().parent.parent.parent / "data"
RAW_RELEASE_DIRNAME = "fielding_2025_goa_rct"
MANIFEST_FILENAME = "fielding_goa_2026-08-19.manifest.json"
AGE_FILENAME = "SummedSiteCountsByAge_R2_14.csv"
LACTATION_FILENAME = "SummedSiteCountsLact_R2_14.csv"
README_FILENAME = "README_ImpactsPaper.txt"

SOURCE_ID = "FIELDING_2025_GOA_DOG_RCT"
SOURCE_URL = "https://doi.org/10.7488/ds/7919"
SOURCE_LICENSE = "CC-BY-4.0"
SOURCE_PERIOD = "2020/2023"
RETRIEVED_AT = "2026-08-19"
PIPELINE_VERSION = "fielding_goa_vet_ingest@v1.0.0"
VETERINARY_SENTINEL_SCHEMA_VERSION = "berm.veterinary_sentinel_species_site_time@v1.0.0"

DEFAULT_OUTPUT_PATH = DATA_DIR / "processed" / "veterinary_sentinel_species_site_time.csv"
DEFAULT_SUMMARY_PATH = DATA_DIR / "processed" / "veterinary_sentinel_species_site_time_summary.json"

EXTRA_COLUMNS: tuple[str, ...] = (
    "species",
    "endpoint",
    "observation_datetime",
    "raw_record_key",
    "survey_round",
    "survey_order",
    "survey_session",
    "sampling_effort_route_km",
    "adult_count",
    "adult_female_count",
    "site_type",
    "site_pair",
    "days_post_intervention",
    "rain_proportion",
    "monsoon_flag",
    "dog_density_source_value",
    "dog_density_source_transform",
    "dog_density_scale_factor",
    "rf_status",
    "geography_match_status",
    "quality_flags",
    "provenance",
    "missingness",
)
CANONICAL_COLUMNS: tuple[str, ...] = (
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
    "birth_cohort",
    "value",
    "unit",
    "measurement_type",
    "proxy_flag",
    "imputation_flag",
    "uncertainty_lower",
    "uncertainty_upper",
    "transform_pipeline_version",
)
CSV_HEADER: tuple[str, ...] = CANONICAL_COLUMNS + EXTRA_COLUMNS


@dataclass(frozen=True)
class VeterinarySentinelArtifacts:
    """A deterministic in-memory build ready for safe writing."""

    rows: tuple[dict[str, Any], ...]
    csv_bytes: bytes
    summary: dict[str, Any]


def _canonical_json(value: Any) -> str:
    return json.dumps(value, ensure_ascii=False, sort_keys=True, separators=(",", ":"))


def _canonical_json_bytes(value: Any) -> bytes:
    return (_canonical_json(value) + "\n").encode("utf-8")


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


def _release_dir(data_dir: Path) -> Path:
    return data_dir / "raw" / "veterinary" / RAW_RELEASE_DIRNAME


def _default_manifest_path(data_dir: Path) -> Path:
    return data_dir / "raw" / "manifests" / MANIFEST_FILENAME


def _load_manifest(path: Path) -> dict[str, Any]:
    with path.open(encoding="utf-8") as handle:
        manifest = json.load(handle)
    if not isinstance(manifest, dict) or not isinstance(manifest.get("files"), list):
        raise ValueError(f"invalid Fielding manifest: {path}")
    return manifest


def _manifest_entries(manifest: Mapping[str, Any]) -> dict[str, Mapping[str, Any]]:
    entries: dict[str, Mapping[str, Any]] = {}
    for entry in manifest["files"]:
        if not isinstance(entry, Mapping):
            raise ValueError("Fielding manifest contains a non-object file entry")
        path = entry.get("path")
        if not isinstance(path, str) or not path:
            raise ValueError("Fielding manifest has a file entry without path")
        if path in entries:
            raise ValueError(f"Fielding manifest has duplicate path {path!r}")
        entries[path] = entry
    return entries


def _checked_raw_files(
    *,
    data_dir: Path,
    manifest_path: Path,
) -> tuple[dict[str, Path], dict[str, Mapping[str, Any]]]:
    """Return the three required raw files after manifest checksum verification."""
    manifest = _load_manifest(manifest_path)
    entries = _manifest_entries(manifest)
    release_dir = _release_dir(data_dir)
    expected_names = (README_FILENAME, AGE_FILENAME, LACTATION_FILENAME)
    paths: dict[str, Path] = {}
    selected: dict[str, Mapping[str, Any]] = {}

    for name in expected_names:
        path = release_dir / name
        relative = _data_relative(path, data_dir)
        entry = entries.get(relative)
        if entry is None:
            raise ValueError(f"Fielding manifest has no entry for {relative}")
        if entry.get("source_id") != SOURCE_ID:
            raise ValueError(f"Fielding manifest source_id mismatch for {relative}")
        if not path.exists():
            raise FileNotFoundError(
                f"held Fielding source artefact is missing: {path}; "
                "download the exact manifest release before ingesting"
            )
        actual_sha = _sha256_path(path)
        if actual_sha != entry.get("sha256"):
            raise ValueError(
                f"Fielding raw checksum mismatch for {relative}: "
                f"manifest={entry.get('sha256')!r} actual={actual_sha!r}"
            )
        if path.stat().st_size != entry.get("bytes"):
            raise ValueError(
                f"Fielding raw byte-size mismatch for {relative}: "
                f"manifest={entry.get('bytes')!r} actual={path.stat().st_size!r}"
            )
        paths[name] = path
        selected[name] = entry
    return paths, selected


def _read_csv(path: Path) -> list[dict[str, str]]:
    with path.open(newline="", encoding="utf-8") as handle:
        rows = list(csv.DictReader(handle))
    if not rows:
        raise ValueError(f"Fielding raw table is empty: {path}")
    return rows


def _required(record: Mapping[str, str], name: str, *, record_id: str) -> str:
    value = record.get(name, "")
    if value is None or not str(value).strip():
        raise ValueError(f"Fielding source row {record_id!r} is missing {name!r}")
    return str(value).strip()


def _count(record: Mapping[str, str], name: str, *, record_id: str) -> int:
    raw = _required(record, name, record_id=record_id)
    try:
        value = float(raw)
    except ValueError as exc:
        raise ValueError(f"Fielding source row {record_id!r} has nonnumeric {name!r}: {raw!r}") from exc
    if value < 0 or not value.is_integer():
        raise ValueError(f"Fielding source row {record_id!r} has invalid count {name!r}: {raw!r}")
    return int(value)


def _number(record: Mapping[str, str], name: str, *, record_id: str) -> float:
    raw = _required(record, name, record_id=record_id)
    try:
        value = float(raw)
    except ValueError as exc:
        raise ValueError(f"Fielding source row {record_id!r} has nonnumeric {name!r}: {raw!r}") from exc
    if value != value or value in (float("inf"), float("-inf")):
        raise ValueError(f"Fielding source row {record_id!r} has non-finite {name!r}: {raw!r}")
    return value


def _source_datetime(record: Mapping[str, str], field: str, *, record_id: str) -> tuple[str, int]:
    raw = _required(record, field, record_id=record_id)
    try:
        parsed = datetime.fromisoformat(raw.replace("Z", "+00:00"))
    except ValueError as exc:
        raise ValueError(f"Fielding source row {record_id!r} has invalid {field!r}: {raw!r}") from exc
    return raw, parsed.year


def _site_id(record: Mapping[str, str], *, record_id: str) -> str:
    raw = _required(record, "study_site", record_id=record_id)
    try:
        number = int(raw)
    except ValueError as exc:
        raise ValueError(f"Fielding source row {record_id!r} has invalid study_site {raw!r}") from exc
    if number < 1:
        raise ValueError(f"Fielding source row {record_id!r} has invalid study_site {raw!r}")
    return f"IND-GOA-S{number:02d}"


def _row(
    *,
    endpoint: str,
    value: int,
    sex: str,
    source_record: Mapping[str, str],
    observation_datetime: str,
    year: int,
    raw_entry: Mapping[str, Any],
    raw_path: Path,
    data_dir: Path,
    adult_count: int | None,
    adult_female_count: int | None,
    dog_density_value: float,
    dog_density_transform: str,
    dog_density_scale_factor: float | None,
) -> dict[str, Any]:
    record_id = _required(source_record, "rpt_id", record_id="unknown")
    raw_relative = _data_relative(raw_path, data_dir)
    route_km = _number(source_record, "routeKM", record_id=record_id)
    rain = _number(source_record, "rain", record_id=record_id)
    monsoon = _count(source_record, "monsoon", record_id=record_id)
    if monsoon not in {0, 1}:
        raise ValueError(f"Fielding source row {record_id!r} has nonbinary monsoon {monsoon!r}")
    flags = [
        "SOURCE_REPORTED_MULTI_ROUTE_SURVEY_COUNT",
        "ANONYMISED_SITE_CODE",
        "NO_RF_DOSIMETRY_OR_VALIDATED_RF_PROXY",
        "INTERVENTION_AND_CONTROL_DESIGN",
    ]
    return {
        "source_id": SOURCE_ID,
        "source_url": SOURCE_URL,
        "license": SOURCE_LICENSE,
        "retrieved_at": RETRIEVED_AT,
        "source_period": SOURCE_PERIOD,
        "geography_id": _site_id(source_record, record_id=record_id),
        "geography_level": GeographyLevel.SITE.value,
        "year": year,
        "sex": sex,
        "age_group": "ALL",
        "birth_cohort": "",
        "value": value,
        "unit": "count",
        "measurement_type": MeasurementType.OBSERVED.value,
        "proxy_flag": False,
        "imputation_flag": False,
        "uncertainty_lower": "",
        "uncertainty_upper": "",
        "transform_pipeline_version": PIPELINE_VERSION,
        "species": "Canis_lupus_familiaris",
        "endpoint": endpoint,
        "observation_datetime": observation_datetime,
        "raw_record_key": f"rpt_id:{record_id}:{endpoint}",
        "survey_round": _required(source_record, "round", record_id=record_id),
        "survey_order": _required(source_record, "order", record_id=record_id),
        "survey_session": _required(source_record, "am_pm", record_id=record_id),
        "sampling_effort_route_km": route_km,
        "adult_count": "" if adult_count is None else adult_count,
        "adult_female_count": "" if adult_female_count is None else adult_female_count,
        "site_type": _required(source_record, "SiteType", record_id=record_id),
        "site_pair": _required(source_record, "SitePair", record_id=record_id),
        "days_post_intervention": _number(source_record, "daysPost", record_id=record_id),
        "rain_proportion": rain,
        "monsoon_flag": bool(monsoon),
        "dog_density_source_value": dog_density_value,
        "dog_density_source_transform": dog_density_transform,
        "dog_density_scale_factor": "" if dog_density_scale_factor is None else dog_density_scale_factor,
        "rf_status": "NOT_MEASURED",
        "geography_match_status": "ANONYMISED_SITE_NO_EXTERNAL_RF_OR_HUMAN_JOIN",
        "quality_flags": flags,
        "provenance": {
            "dataset_doi": "10.7488/ds/7919",
            "dataset_landing_page": SOURCE_URL,
            "raw_artifact": raw_relative,
            "raw_artifact_sha256": raw_entry["sha256"],
            "publisher_reported_md5": raw_entry["publisher_reported_md5"],
            "raw_record_key": f"rpt_id:{record_id}",
            "source_column": "puppy" if endpoint == "puppy_count" else "ssLact",
        },
        "missingness": {
            "status": "OBSERVED_SOURCE_VALUE",
            "rf_dosimetry": "NOT_COLLECTED_BY_SOURCE",
            "coordinates": "WITHHELD_OR_ANONYMISED_BY_SOURCE",
            "human_matched_outcome": "NOT_PRESENT",
        },
    }


def normalize_fielding_goa_rows(
    *,
    data_dir: Path = DATA_DIR,
    manifest_path: Path | None = None,
) -> tuple[dict[str, Any], ...]:
    """Load checksum-verified raw files into direct-observation rows only."""
    manifest_path = manifest_path or _default_manifest_path(data_dir)
    paths, entries = _checked_raw_files(data_dir=data_dir, manifest_path=manifest_path)
    age_rows = _read_csv(paths[AGE_FILENAME])
    lactation_rows = _read_csv(paths[LACTATION_FILENAME])

    def keyed(rows: Iterable[dict[str, str]], table: str) -> dict[str, dict[str, str]]:
        out: dict[str, dict[str, str]] = {}
        for row in rows:
            key = _required(row, "rpt_id", record_id=f"{table}:unknown")
            if key in out:
                raise ValueError(f"Fielding {table} has duplicate rpt_id {key!r}")
            out[key] = row
        return out

    age_by_id = keyed(age_rows, "age")
    lactation_by_id = keyed(lactation_rows, "lactation")
    if set(age_by_id) != set(lactation_by_id):
        only_age = sorted(set(age_by_id) - set(lactation_by_id), key=int)[:5]
        only_lactation = sorted(set(lactation_by_id) - set(age_by_id), key=int)[:5]
        raise ValueError(
            "Fielding source tables have different survey record sets: "
            f"age_only={only_age} lactation_only={only_lactation}"
        )

    rows: list[dict[str, Any]] = []
    fields_to_agree = ("study_site", "am_pm", "round", "order", "SiteType", "SitePair", "routeKM", "daysPost")
    for record_id in sorted(age_by_id, key=int):
        age = age_by_id[record_id]
        lactation = lactation_by_id[record_id]
        age_datetime, age_year = _source_datetime(age, "first_survey", record_id=record_id)
        lactation_datetime, lactation_year = _source_datetime(lactation, "date", record_id=record_id)
        if age_datetime != lactation_datetime or age_year != lactation_year:
            raise ValueError(f"Fielding rpt_id {record_id!r} has mismatched survey datetimes")
        for field in fields_to_agree:
            if _required(age, field, record_id=record_id) != _required(lactation, field, record_id=record_id):
                raise ValueError(f"Fielding rpt_id {record_id!r} disagrees across tables on {field!r}")

        puppy_count = _count(age, "puppy", record_id=record_id)
        adult_count = _count(age, "adult", record_id=record_id)
        lactating_count = _count(lactation, "ssLact", record_id=record_id)
        female_total = _count(lactation, "ssTotal", record_id=record_id)
        if lactating_count > female_total:
            raise ValueError(f"Fielding rpt_id {record_id!r} has lactating count above adult female count")
        age_density = _number(age, "dog_dens_km2area", record_id=record_id)
        lactation_density = _number(lactation, "dog_dens_scl", record_id=record_id)
        lactation_density_factor = _number(lactation, "dog_dens_scl_factor", record_id=record_id)

        rows.append(_row(
            endpoint="puppy_count",
            value=puppy_count,
            sex=Sex.NA.value,
            source_record=age,
            observation_datetime=age_datetime,
            year=age_year,
            raw_entry=entries[AGE_FILENAME],
            raw_path=paths[AGE_FILENAME],
            data_dir=data_dir,
            adult_count=adult_count,
            adult_female_count=None,
            dog_density_value=age_density,
            dog_density_transform="SOURCE_REPORTED_DOGS_PER_KM2AREA",
            dog_density_scale_factor=None,
        ))
        rows.append(_row(
            endpoint="lactating_female_count",
            value=lactating_count,
            sex=Sex.FEMALE.value,
            source_record=lactation,
            observation_datetime=lactation_datetime,
            year=lactation_year,
            raw_entry=entries[LACTATION_FILENAME],
            raw_path=paths[LACTATION_FILENAME],
            data_dir=data_dir,
            adult_count=None,
            adult_female_count=female_total,
            dog_density_value=lactation_density,
            dog_density_transform="SOURCE_REPORTED_SCALED_DENSITY",
            dog_density_scale_factor=lactation_density_factor,
        ))

    violations = validate_rows(
        rows,
        "veterinary_sentinel_species_site_time",
        known_source_ids=known_source_ids(),
    )
    if violations:
        joined = "\n  ".join(str(v) for v in violations[:20])
        raise ValueError(f"Fielding canonical rows violate the data contract:\n  {joined}")
    return tuple(rows)


def _csv_bytes(rows: Sequence[Mapping[str, Any]]) -> bytes:
    buffer = io.StringIO(newline="")
    writer = csv.DictWriter(buffer, fieldnames=CSV_HEADER, extrasaction="raise", lineterminator="\n")
    writer.writeheader()
    for row in rows:
        serialized: dict[str, Any] = {}
        for field in CSV_HEADER:
            value = row.get(field, "")
            serialized[field] = _canonical_json(value) if isinstance(value, (dict, list)) else value
        writer.writerow(serialized)
    return buffer.getvalue().encode("utf-8")


def build_fielding_goa_artifacts(
    *,
    data_dir: Path = DATA_DIR,
    manifest_path: Path | None = None,
    output_path: Path = DEFAULT_OUTPUT_PATH,
) -> VeterinarySentinelArtifacts:
    """Build a deterministic canonical CSV and machine-readable scope summary."""
    rows = normalize_fielding_goa_rows(data_dir=data_dir, manifest_path=manifest_path)
    csv_bytes = _csv_bytes(rows)
    endpoint_counts = Counter(row["endpoint"] for row in rows)
    year_counts = Counter(str(row["year"]) for row in rows)
    sites = sorted({row["geography_id"] for row in rows})
    pairs = sorted({row["site_pair"] for row in rows}, key=int)
    summary = {
        "schema_version": VETERINARY_SENTINEL_SCHEMA_VERSION,
        "pipeline_version": PIPELINE_VERSION,
        "status": "CONTEXT_ONLY_NOT_CSLI_ELIGIBLE",
        "evidence_status": "ACTIVE_VETERINARY_ENDPOINT_AND_PROTOCOL_CONTEXT_NOT_DIRECT_FIELDSTATE_CALIBRATION",
        "evidence_roles": [
            "species-specific reproductive-population endpoint definition",
            "veterinary outcome and intervention-design constraint",
            "cross-species endpoint/protocol context",
        ],
        "source": {
            "source_id": SOURCE_ID,
            "source_url": SOURCE_URL,
            "citation": (
                "Fielding HR. 2025. Managing free-roaming domestic dog populations "
                "using surgical sterilisation: a randomised controlled trial, 2020-2023 "
                "[dataset]. University of Edinburgh. doi:10.7488/ds/7919"
            ),
            "license": SOURCE_LICENSE,
            "source_period": SOURCE_PERIOD,
        },
        "canonical_artifact": {
            "path": _data_relative(output_path, data_dir),
            "row_count": len(rows),
            "sha256": hashlib.sha256(csv_bytes).hexdigest(),
            "grain": ["anonymised_site", "survey_datetime", "species", "endpoint"],
            "measurement_type": MeasurementType.OBSERVED.value,
            "units": ["count"],
        },
        "coverage": {
            "site_count": len(sites),
            "site_ids": sites,
            "matched_control_intervention_pairs": pairs,
            "survey_record_count_per_endpoint": len(rows) // 2,
            "endpoint_counts": dict(sorted(endpoint_counts.items())),
            "year_counts_by_endpoint": {
                endpoint: dict(sorted(Counter(
                    str(row["year"]) for row in rows if row["endpoint"] == endpoint
                ).items()))
                for endpoint in sorted(endpoint_counts)
            },
            "year_counts_all_rows": dict(sorted(year_counts.items())),
            "endpoints": {
                "puppy_count": "Direct observed puppy count; adult count and route-km sampling effort retained.",
                "lactating_female_count": "Direct observed lactating adult-female count; adult-female count retained.",
            },
        },
        "available_covariates": [
            "site_type_control_or_intervention",
            "matched_site_pair",
            "days_post_intervention",
            "rain_proportion",
            "monsoon_flag",
            "route_km_sampling_effort",
            "source_reported_dog_density",
        ],
        "explicit_nonuses": [
            "not a semen-quality, cryptorchidism, litter-size, or individual fertility dataset",
            "not a country-year panel",
            "not an RF-exposure dataset or RF proxy",
            "not geographically joinable to external RF measurements because study-site locations are anonymised",
            "not comparable to human reproductive outcomes without a newly designed matched study",
        ],
        "f_test_readiness": {
            "F1": {"status": "BLOCKED", "missing": ["matched human biomarker panel", "dog semen endpoint", "external region identity"]},
            "F2": {"status": "BLOCKED", "missing": ["matched human biomarker panel", "regional social covariates", "external region identity"]},
            "F3": {"status": "BLOCKED", "missing": ["numeric bull/boar comparison panel", "matched human biomarker panel"]},
            "F4": {"status": "BLOCKED", "missing": ["dog and livestock RF dosimetry", "comparable semen endpoints"]},
            "F5": {"status": "BLOCKED", "missing": ["multi-region dog semen time series", "external region identities"]},
            "F6": {"status": "BLOCKED", "missing": ["matched chemical covariates", "RF dosimetry", "external region identities"]},
        },
        "readiness_scope": (
            "F1-F6 statuses describe only direct sentinel-to-human endpoint "
            "calibration. They do not erase this source's veterinary endpoint and "
            "study-design information from the evidence map."
        ),
    }
    return VeterinarySentinelArtifacts(rows=rows, csv_bytes=csv_bytes, summary=summary)


def _write_if_safe(path: Path, payload: bytes, *, replace: bool) -> str:
    existed = path.exists()
    if existed:
        existing = path.read_bytes()
        if existing == payload:
            return "UNCHANGED_IDENTICAL"
        if not replace:
            raise FileExistsError(
                f"refusing to replace changed derived output {path}; pass --replace after review"
            )
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_bytes(payload)
    return "REPLACED" if existed else "WRITTEN_NEW"


def write_fielding_goa_artifacts(
    artifacts: VeterinarySentinelArtifacts,
    *,
    output_path: Path = DEFAULT_OUTPUT_PATH,
    summary_path: Path = DEFAULT_SUMMARY_PATH,
    replace: bool = False,
) -> dict[str, str]:
    """Write a matched derived CSV and summary without ever changing raw bytes."""
    csv_status = _write_if_safe(output_path, artifacts.csv_bytes, replace=replace)
    summary_status = _write_if_safe(summary_path, _canonical_json_bytes(artifacts.summary), replace=replace)
    return {"csv": csv_status, "summary": summary_status}


def main(argv: Sequence[str] | None = None) -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--output", type=Path, default=DEFAULT_OUTPUT_PATH)
    parser.add_argument("--summary", type=Path, default=DEFAULT_SUMMARY_PATH)
    parser.add_argument("--replace", action="store_true", help="replace a changed derived output after review")
    args = parser.parse_args(argv)
    artifacts = build_fielding_goa_artifacts(output_path=args.output)
    statuses = write_fielding_goa_artifacts(
        artifacts,
        output_path=args.output,
        summary_path=args.summary,
        replace=args.replace,
    )
    print(_canonical_json({"rows": len(artifacts.rows), "write": statuses}))
    return 0


if __name__ == "__main__":  # pragma: no cover - command-line entry point
    raise SystemExit(main())
