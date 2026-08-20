"""Build a manifest-locked IFCE/SIRE equine breeding benchmark panel.

The Institut français du cheval et de l'équitation (IFCE) publishes three
annual French aggregate tables through data.gouv.fr: mares covered, equid
births, and active stallions.  This module preserves every raw field and keeps
the three measures in long form.  In particular, it never divides births by
mares or joins the tables: the location semantics differ between the source
tables (stationing department versus breeding-place department).

It is a reproducibility and future-modelling benchmark, not a direct
RF/EMF-exposure dataset, CSLI coefficient input or standalone causal effect
estimate.  Its separately preserved annual breeding and birth measures can
nevertheless inform equine endpoint definitions, ecological/historical
signatures and transfer hypotheses after an explicit FieldState/covariate
crosswalk; the module deliberately does not manufacture that crosswalk or
silently join its incompatible geography semantics.

Run from ``berm/`` with::

    python -m berm.data.ifce_sire_equine_benchmark
"""

from __future__ import annotations

import argparse
import csv
import hashlib
import io
import json
from dataclasses import dataclass
from pathlib import Path
from typing import Any, Mapping, Sequence

__all__ = [
    "ANALYSIS_STATUS",
    "COUNTRY_ISO3",
    "DEFAULT_OUTPUT_PATH",
    "DEFAULT_SUMMARY_PATH",
    "F1_F6_ELIGIBILITY",
    "IFCE_SIRE_EQUINE_BENCHMARK_SCHEMA_VERSION",
    "PANEL_HEADER",
    "PIPELINE_VERSION",
    "RAW_TABLE_SPECS",
    "SOURCE_ID",
    "IfceSireEquineBenchmarkArtifacts",
    "build_ifce_sire_equine_benchmark_artifacts",
    "normalize_equid_breeding_panel",
    "validate_raw_inputs",
    "write_ifce_sire_equine_benchmark_artifacts",
]


DATA_DIR = Path(__file__).resolve().parent.parent.parent / "data"
RAW_RELEASE_DIRNAME = "ifce_sire_2026-08-19"
MANIFEST_FILENAME = "ifce_sire_equine_breeding_2026-08-19.manifest.json"

SOURCE_ID = "IFCE_SIRE_EQUINE_BREEDING_PANEL"
SOURCE_LICENSE = "Licence Ouverte / Open Licence 2.0"
RETRIEVED_AT = "2026-08-19"
SOURCE_PERIOD = "2008/2024"
COUNTRY_ISO3 = "FRA"
PUBLISHER = "Institut français du cheval et de l'équitation (IFCE) / SIRE"
PIPELINE_VERSION = "ifce_sire_equine_benchmark@v1.0.0"
IFCE_SIRE_EQUINE_BENCHMARK_SCHEMA_VERSION = (
    "berm.ifce_sire_equine_breeding_panel@v1.0.0"
)

ANALYSIS_STATUS = "BENCHMARK_ONLY_NOT_SENTINEL"
F1_F6_ELIGIBILITY = "NOT_ELIGIBLE"
SOURCE_ENCODING = "ISO-8859-1"
PYTHON_SOURCE_ENCODING = "iso-8859-1"

DEFAULT_OUTPUT_PATH = DATA_DIR / "processed" / "ifce_sire_equid_breeding_panel.csv"
DEFAULT_SUMMARY_PATH = (
    DATA_DIR / "processed" / "ifce_sire_equid_breeding_panel_summary.json"
)


@dataclass(frozen=True)
class RawTableSpec:
    """Immutable description of one IFCE source table and its exact fields."""

    filename: str
    metric: str
    metric_definition: str
    geography_semantics: str
    source_url: str
    landing_page: str
    header: tuple[str, ...]
    year_field: str
    department_field: str
    region_field: str
    breed_field: str
    equine_type_field: str
    value_field: str
    expected_rows: int
    expected_department_count: int


RAW_TABLE_SPECS: tuple[RawTableSpec, ...] = (
    RawTableSpec(
        filename="juments_saillies.csv",
        metric="mares_bred_count",
        metric_definition=(
            "Source-reported number of mares covered (NB JUMENTS SAILLIES); "
            "not a pregnancy, conception, live-birth, or fertility-rate measure."
        ),
        geography_semantics="DEPARTEMENT_STATIONNEMENT",
        source_url=(
            "https://www.data.gouv.fr/api/1/datasets/r/"
            "b273d4e1-0c53-4e11-ae1c-fa2f75de4562"
        ),
        landing_page=(
            "https://www.data.gouv.fr/datasets/"
            "nombre-de-juments-saillies-en-france-572970"
        ),
        header=(
            "ANNEE DE MONTE",
            "CODE DEPARTEMENT STATIONNEMENT",
            "CODE REGION DE STATIONNEMENT",
            "RACE DU PRODUIT",
            "TYPE DU PRODUIT",
            "NB JUMENTS SAILLIES",
        ),
        year_field="ANNEE DE MONTE",
        department_field="CODE DEPARTEMENT STATIONNEMENT",
        region_field="CODE REGION DE STATIONNEMENT",
        breed_field="RACE DU PRODUIT",
        equine_type_field="TYPE DU PRODUIT",
        value_field="NB JUMENTS SAILLIES",
        expected_rows=40911,
        expected_department_count=102,
    ),
    RawTableSpec(
        filename="naissances.csv",
        metric="births_count",
        metric_definition=(
            "Source-reported number of equid births (NB); not linked in this "
            "product to a prior covering cohort or a fertility-rate denominator."
        ),
        geography_semantics="DEPARTEMENT_LIEU_ELEVAGE",
        source_url=(
            "https://www.data.gouv.fr/api/1/datasets/r/"
            "9b2cac00-f43d-4d66-b0fc-86fb60d3d381"
        ),
        landing_page=(
            "https://www.data.gouv.fr/datasets/"
            "nombre-de-naissances-d-equides-en-france-30378678"
        ),
        header=(
            "ANNEEDENAISSANCE",
            "NUMDEPARTEMENTLIEUELEVAGE",
            "CODEREGIONELEVAGE",
            "CODERACEPRODUIT",
            "TYPEEQUIDEPRODUIT",
            "NB",
        ),
        year_field="ANNEEDENAISSANCE",
        department_field="NUMDEPARTEMENTLIEUELEVAGE",
        region_field="CODEREGIONELEVAGE",
        breed_field="CODERACEPRODUIT",
        equine_type_field="TYPEEQUIDEPRODUIT",
        value_field="NB",
        expected_rows=43464,
        expected_department_count=103,
    ),
    RawTableSpec(
        filename="etalons_actifs.csv",
        metric="active_stallions_count",
        metric_definition=(
            "Source-reported number of active stallions (NBETALON); not a semen "
            "quality, service-count, conception, or fertility-rate measure."
        ),
        geography_semantics="DEPARTEMENT_STATIONNEMENT",
        source_url=(
            "https://www.data.gouv.fr/api/1/datasets/r/"
            "6d9e32ce-a56e-4ec6-865d-0db3b20cc5df"
        ),
        landing_page=(
            "https://www.data.gouv.fr/datasets/"
            "nombre-d-etalons-en-activite-en-france-572975"
        ),
        header=(
            "ANNEEDEMONTE",
            "NUMDEPARTEMENTSTATIONNEMENT",
            "CODEREGIONSTATIONNEMENT",
            "RACEETALON",
            "TYPEEQUIDEETALON",
            "NBETALON",
        ),
        year_field="ANNEEDEMONTE",
        department_field="NUMDEPARTEMENTSTATIONNEMENT",
        region_field="CODEREGIONSTATIONNEMENT",
        breed_field="RACEETALON",
        equine_type_field="TYPEEQUIDEETALON",
        value_field="NBETALON",
        expected_rows=29851,
        expected_department_count=99,
    ),
)

BASE_QUALITY_FLAGS = (
    ANALYSIS_STATUS,
    "AGGREGATED_DEPARTEMENT_YEAR_BREED_TYPE",
    "METRIC_SPECIFIC_GEOGRAPHY_SEMANTICS",
    "NO_DERIVED_BIRTHS_PER_MARE_RATE",
    "NO_ENVIRONMENTAL_OR_CHEMICAL_COVARIATES",
    "NO_EXTERNAL_RF_JOIN",
    "NO_RF_DOSIMETRY",
    "RACE_FIELDS_NOT_HARMONIZED",
)

PANEL_HEADER: tuple[str, ...] = (
    "source_id",
    "source_url",
    "source_landing_page",
    "publisher",
    "license",
    "retrieved_at",
    "source_period",
    "analysis_status",
    "f1_f6_eligibility",
    "country_iso3",
    "geography_level",
    "species_scope",
    "metric",
    "metric_definition",
    "source_geography_semantics",
    "year",
    "department_code",
    "region_code",
    "breed_source_value",
    "equine_type_source_value",
    "value_count",
    "source_field_year",
    "source_field_department",
    "source_field_region",
    "source_field_breed",
    "source_field_equine_type",
    "source_field_value",
    "raw_header_json",
    "raw_source_fields_json",
    "source_encoding",
    "raw_artifact",
    "raw_artifact_sha256",
    "raw_record_key",
    "quality_flags",
    "transform_pipeline_version",
)


@dataclass(frozen=True)
class IfceSireEquineBenchmarkArtifacts:
    """Deterministic outputs ready for fail-closed writing."""

    panel_rows: tuple[dict[str, Any], ...]
    panel_csv_bytes: bytes
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
    return data_dir / "raw" / "equine" / RAW_RELEASE_DIRNAME


def _default_manifest_path(data_dir: Path) -> Path:
    return data_dir / "raw" / "manifests" / MANIFEST_FILENAME


def _load_manifest(path: Path) -> dict[str, Any]:
    with path.open(encoding="utf-8") as handle:
        manifest = json.load(handle)
    if not isinstance(manifest, dict) or not isinstance(manifest.get("files"), list):
        raise ValueError(f"invalid IFCE/SIRE benchmark manifest: {path}")
    expected_id = "ifce_sire_equine_breeding_2026-08-19"
    if manifest.get("manifest_id") != expected_id:
        raise ValueError(f"unexpected IFCE/SIRE manifest identifier: {path}")
    return manifest


def _manifest_entries(manifest: Mapping[str, Any]) -> dict[str, Mapping[str, Any]]:
    entries: dict[str, Mapping[str, Any]] = {}
    for entry in manifest["files"]:
        if not isinstance(entry, Mapping):
            raise ValueError("IFCE/SIRE manifest contains a non-object file entry")
        path = entry.get("path")
        if not isinstance(path, str) or not path:
            raise ValueError("IFCE/SIRE manifest has a file entry without path")
        if path in entries:
            raise ValueError(f"IFCE/SIRE manifest has duplicate path {path!r}")
        entries[path] = entry
    return entries


def _read_csv(path: Path, expected_header: Sequence[str]) -> list[dict[str, str]]:
    """Read exactly the declared source encoding and header, without mutation."""

    with path.open(newline="", encoding=PYTHON_SOURCE_ENCODING, errors="strict") as handle:
        reader = csv.DictReader(handle)
        header = tuple(reader.fieldnames or ())
        if header != tuple(expected_header):
            raise ValueError(
                f"unexpected header in {path.name}: expected {tuple(expected_header)!r}, "
                f"got {header!r}"
            )
        rows = [dict(row) for row in reader]
    if not rows:
        raise ValueError(f"raw table is empty: {path}")
    if any(None in row for row in rows):
        raise ValueError(f"raw table has extra unheaded columns: {path}")
    return rows


def _checked_raw_tables(
    *,
    data_dir: Path,
    manifest_path: Path,
) -> tuple[dict[str, list[dict[str, str]]], dict[str, Any]]:
    """Load exact raw CSVs only after manifest, byte, header and count checks."""

    manifest = _load_manifest(manifest_path)
    if manifest.get("license") != SOURCE_LICENSE:
        raise ValueError("IFCE/SIRE manifest licence does not match the pinned source licence")
    entries = _manifest_entries(manifest)
    tables: dict[str, list[dict[str, str]]] = {}
    files: dict[str, dict[str, Any]] = {}
    for spec in RAW_TABLE_SPECS:
        path = _release_dir(data_dir) / spec.filename
        relative_path = _data_relative(path, data_dir)
        entry = entries.get(relative_path)
        if entry is None:
            raise ValueError(f"manifest has no entry for {relative_path}")
        if entry.get("source_id") != SOURCE_ID:
            raise ValueError(f"manifest source_id mismatch for {relative_path}")
        if entry.get("source_url") != spec.source_url:
            raise ValueError(f"manifest source_url mismatch for {relative_path}")
        if entry.get("landing_page") != spec.landing_page:
            raise ValueError(f"manifest landing_page mismatch for {relative_path}")
        if entry.get("source_encoding") != SOURCE_ENCODING:
            raise ValueError(f"manifest source_encoding mismatch for {relative_path}")
        if entry.get("raw_data_rows") != spec.expected_rows:
            raise ValueError(f"manifest raw_data_rows mismatch for {relative_path}")
        if not path.exists():
            raise FileNotFoundError(
                f"held IFCE/SIRE source artefact is missing: {path}; download the "
                "exact manifest release before building the benchmark"
            )
        actual_sha = _sha256_path(path)
        if actual_sha != entry.get("sha256"):
            raise ValueError(
                f"raw checksum mismatch for {relative_path}: "
                f"manifest={entry.get('sha256')!r} actual={actual_sha!r}"
            )
        actual_bytes = path.stat().st_size
        if actual_bytes != entry.get("bytes"):
            raise ValueError(
                f"raw byte-size mismatch for {relative_path}: "
                f"manifest={entry.get('bytes')!r} actual={actual_bytes!r}"
            )
        rows = _read_csv(path, spec.header)
        if len(rows) != spec.expected_rows:
            raise ValueError(
                f"raw row-count mismatch for {relative_path}: "
                f"expected={spec.expected_rows!r} actual={len(rows)!r}"
            )
        tables[spec.filename] = rows
        files[spec.filename] = {
            "path": path,
            "relative_path": relative_path,
            "sha256": actual_sha,
            "bytes": actual_bytes,
        }
    return tables, {
        "manifest_id": manifest["manifest_id"],
        "manifest_path": _data_relative(manifest_path, data_dir),
        "files": files,
    }


def _required(row: Mapping[str, str], field: str, *, record_id: str) -> str:
    value = row.get(field)
    if value is None or not value.strip():
        raise ValueError(f"{record_id} is missing {field!r}")
    return value.strip()


def _year(row: Mapping[str, str], field: str, *, record_id: str) -> int:
    raw = _required(row, field, record_id=record_id)
    if len(raw) != 4 or not raw.isascii() or not raw.isdigit():
        raise ValueError(f"{record_id} has invalid year {field!r}: {raw!r}")
    value = int(raw)
    if not 1900 <= value <= 2100:
        raise ValueError(f"{record_id} has out-of-range year {field!r}: {raw!r}")
    return value


def _nonnegative_integer(row: Mapping[str, str], field: str, *, record_id: str) -> int:
    raw = _required(row, field, record_id=record_id)
    if not raw.isascii() or not raw.isdigit():
        raise ValueError(f"{record_id} has noninteger {field!r}: {raw!r}")
    value = int(raw)
    if value < 0:
        raise ValueError(f"{record_id} has negative {field!r}: {raw!r}")
    return value


def _quality_flags(spec: RawTableSpec) -> str:
    location_flag = (
        "BREEDING_PLACE_DEPARTMENT_GEOGRAPHY"
        if spec.geography_semantics == "DEPARTEMENT_LIEU_ELEVAGE"
        else "STATIONING_DEPARTMENT_GEOGRAPHY"
    )
    return _canonical_json(sorted(set(BASE_QUALITY_FLAGS).union({location_flag})))


def _raw_table_dimensions(
    tables: Mapping[str, Sequence[Mapping[str, str]]],
) -> dict[str, dict[str, Any]]:
    dimensions: dict[str, dict[str, Any]] = {}
    for spec in RAW_TABLE_SPECS:
        rows = tables[spec.filename]
        years = {
            _year(row, spec.year_field, record_id=f"{spec.filename}:{number}")
            for number, row in enumerate(rows, start=2)
        }
        departments = {
            _required(row, spec.department_field, record_id=f"{spec.filename}:{number}")
            for number, row in enumerate(rows, start=2)
        }
        for number, row in enumerate(rows, start=2):
            record_id = f"{spec.filename}:{number}"
            _required(row, spec.region_field, record_id=record_id)
            _required(row, spec.breed_field, record_id=record_id)
            _required(row, spec.equine_type_field, record_id=record_id)
            _nonnegative_integer(row, spec.value_field, record_id=record_id)
        expected_years = set(range(2008, 2025))
        if years != expected_years:
            raise ValueError(
                f"unexpected year coverage in {spec.filename}: "
                f"expected={sorted(expected_years)!r} actual={sorted(years)!r}"
            )
        if len(departments) != spec.expected_department_count:
            raise ValueError(
                f"unexpected department count in {spec.filename}: "
                f"expected={spec.expected_department_count!r} actual={len(departments)!r}"
            )
        dimensions[spec.metric] = {
            "raw_rows": len(rows),
            "year_min": min(years),
            "year_max": max(years),
            "year_count": len(years),
            "department_count": len(departments),
        }
    return dimensions


def validate_raw_inputs(
    *,
    data_dir: Path = DATA_DIR,
    manifest_path: Path | None = None,
) -> dict[str, Any]:
    """Validate raw artefacts, decoding, schema and frozen source dimensions."""

    manifest_path = manifest_path or _default_manifest_path(data_dir)
    tables, raw_info = _checked_raw_tables(data_dir=data_dir, manifest_path=manifest_path)
    dimensions = _raw_table_dimensions(tables)
    return {
        "manifest_id": raw_info["manifest_id"],
        "files": {
            filename: {
                "path": raw_info["files"][filename]["relative_path"],
                "bytes": raw_info["files"][filename]["bytes"],
                "sha256": raw_info["files"][filename]["sha256"],
            }
            for filename in sorted(raw_info["files"])
        },
        "dimensions_by_metric": dimensions,
        "total_raw_rows": sum(item["raw_rows"] for item in dimensions.values()),
    }


def _panel_rows(
    tables: Mapping[str, Sequence[Mapping[str, str]]],
    raw_info: Mapping[str, Any],
) -> tuple[dict[str, Any], ...]:
    output: list[dict[str, Any]] = []
    for spec in RAW_TABLE_SPECS:
        file_info = raw_info["files"][spec.filename]
        raw_header_json = _canonical_json(list(spec.header))
        quality_flags = _quality_flags(spec)
        for row_number, raw_row in enumerate(tables[spec.filename], start=2):
            record_id = f"{spec.filename}:{row_number}"
            # The raw JSON retains the original source field names and values.
            raw_source_fields = {field: raw_row[field] for field in spec.header}
            row = {
                "source_id": SOURCE_ID,
                "source_url": spec.source_url,
                "source_landing_page": spec.landing_page,
                "publisher": PUBLISHER,
                "license": SOURCE_LICENSE,
                "retrieved_at": RETRIEVED_AT,
                "source_period": SOURCE_PERIOD,
                "analysis_status": ANALYSIS_STATUS,
                "f1_f6_eligibility": F1_F6_ELIGIBILITY,
                "country_iso3": COUNTRY_ISO3,
                "geography_level": "SUBNATIONAL1",
                "species_scope": "Equidae_as_reported_by_IFCE_SIRE",
                "metric": spec.metric,
                "metric_definition": spec.metric_definition,
                "source_geography_semantics": spec.geography_semantics,
                "year": _year(raw_row, spec.year_field, record_id=record_id),
                "department_code": _required(
                    raw_row, spec.department_field, record_id=record_id
                ),
                "region_code": _required(raw_row, spec.region_field, record_id=record_id),
                "breed_source_value": _required(raw_row, spec.breed_field, record_id=record_id),
                "equine_type_source_value": _required(
                    raw_row, spec.equine_type_field, record_id=record_id
                ),
                "value_count": _nonnegative_integer(
                    raw_row, spec.value_field, record_id=record_id
                ),
                "source_field_year": spec.year_field,
                "source_field_department": spec.department_field,
                "source_field_region": spec.region_field,
                "source_field_breed": spec.breed_field,
                "source_field_equine_type": spec.equine_type_field,
                "source_field_value": spec.value_field,
                "raw_header_json": raw_header_json,
                "raw_source_fields_json": _canonical_json(raw_source_fields),
                "source_encoding": SOURCE_ENCODING,
                "raw_artifact": file_info["relative_path"],
                "raw_artifact_sha256": file_info["sha256"],
                "raw_record_key": record_id,
                "quality_flags": quality_flags,
                "transform_pipeline_version": PIPELINE_VERSION,
            }
            output.append(row)
    output.sort(
        key=lambda row: (
            str(row["metric"]),
            int(row["year"]),
            str(row["department_code"]),
            str(row["region_code"]),
            str(row["equine_type_source_value"]),
            str(row["breed_source_value"]),
            str(row["raw_record_key"]),
        )
    )
    return tuple(output)


def normalize_equid_breeding_panel(
    *,
    data_dir: Path = DATA_DIR,
    manifest_path: Path | None = None,
) -> tuple[dict[str, Any], ...]:
    """Return the long-form panel, without cross-table joins or rate derivation."""

    manifest_path = manifest_path or _default_manifest_path(data_dir)
    tables, raw_info = _checked_raw_tables(data_dir=data_dir, manifest_path=manifest_path)
    _raw_table_dimensions(tables)
    return _panel_rows(tables, raw_info)


def _csv_bytes(rows: Sequence[Mapping[str, Any]]) -> bytes:
    stream = io.StringIO(newline="")
    writer = csv.DictWriter(
        stream,
        fieldnames=PANEL_HEADER,
        extrasaction="raise",
        lineterminator="\n",
    )
    writer.writeheader()
    for row in rows:
        if set(row) != set(PANEL_HEADER):
            raise ValueError("IFCE/SIRE panel row does not match the declared output schema")
        writer.writerow(row)
    return stream.getvalue().encode("utf-8")


def build_ifce_sire_equine_benchmark_artifacts(
    *,
    data_dir: Path = DATA_DIR,
    manifest_path: Path | None = None,
) -> IfceSireEquineBenchmarkArtifacts:
    """Build provenance-rich deterministic outputs without writing any files."""

    manifest_path = manifest_path or _default_manifest_path(data_dir)
    tables, raw_info = _checked_raw_tables(data_dir=data_dir, manifest_path=manifest_path)
    dimensions = _raw_table_dimensions(tables)
    panel_rows = _panel_rows(tables, raw_info)
    counts_by_metric = {
        spec.metric: sum(row["metric"] == spec.metric for row in panel_rows)
        for spec in RAW_TABLE_SPECS
    }
    if counts_by_metric != {spec.metric: spec.expected_rows for spec in RAW_TABLE_SPECS}:
        raise ValueError(
            "IFCE/SIRE normalized row counts do not equal manifest-locked raw counts: "
            f"{counts_by_metric!r}"
        )
    summary = {
        "schema_version": IFCE_SIRE_EQUINE_BENCHMARK_SCHEMA_VERSION,
        "pipeline_version": PIPELINE_VERSION,
        "analysis_status": ANALYSIS_STATUS,
        "eligibility": {
            "f1_f6": F1_F6_ELIGIBILITY,
            "reason_codes": [
                "AGGREGATED_DEPARTEMENT_YEAR_BREED_TYPE",
                "METRIC_SPECIFIC_GEOGRAPHY_SEMANTICS",
                "NO_ENVIRONMENTAL_OR_CHEMICAL_COVARIATES",
                "NO_EXTERNAL_RF_JOIN",
                "NO_RF_DOSIMETRY",
            ],
        },
        "evidence_status": "ACTIVE_EQUINE_ENDPOINT_AND_HISTORICAL_SIGNATURE_CONTEXT_NOT_DIRECT_F1_F6_CALIBRATION",
        "evidence_roles": [
            "equine breeding/birth endpoint-definition context",
            "department-year ecological and historical signature candidate",
            "transfer-prior context after an explicit FieldState/covariate crosswalk",
        ],
        "source": {
            "source_id": SOURCE_ID,
            "publisher": PUBLISHER,
            "license": SOURCE_LICENSE,
            "retrieved_at": RETRIEVED_AT,
            "source_period": SOURCE_PERIOD,
            "country_iso3": COUNTRY_ISO3,
            "source_encoding": SOURCE_ENCODING,
        },
        "raw_integrity": {
            "manifest_id": raw_info["manifest_id"],
            "manifest_path": raw_info["manifest_path"],
            "files": [
                {
                    "filename": spec.filename,
                    "path": raw_info["files"][spec.filename]["relative_path"],
                    "bytes": raw_info["files"][spec.filename]["bytes"],
                    "sha256": raw_info["files"][spec.filename]["sha256"],
                    "source_url": spec.source_url,
                    "source_landing_page": spec.landing_page,
                    "source_encoding": SOURCE_ENCODING,
                }
                for spec in RAW_TABLE_SPECS
            ],
        },
        "row_counts": {
            "raw_total": sum(item["raw_rows"] for item in dimensions.values()),
            "normalized_panel_rows": len(panel_rows),
            "by_metric": counts_by_metric,
        },
        "coverage_by_metric": {
            spec.metric: {
                **dimensions[spec.metric],
                "geography_semantics": spec.geography_semantics,
                "source_fields": {
                    "year": spec.year_field,
                    "department": spec.department_field,
                    "region": spec.region_field,
                    "breed": spec.breed_field,
                    "equine_type": spec.equine_type_field,
                    "value": spec.value_field,
                },
            }
            for spec in RAW_TABLE_SPECS
        },
        "output": {
            "row_schema": list(PANEL_HEADER),
            "encoding": "UTF-8",
            "form": "long_metric_specific_rows_no_cross_table_join",
        },
        "limitations": [
            "No RF/EMF measurement, dosimetry, validated exposure proxy, or external RF join is present.",
            "No environmental, chemical, disease, management, individual-animal, semen, conception, or pregnancy-loss covariates are present.",
            "Mares covered and active stallions use stationing-department geography; births use breeding-place-department geography.",
            "Breed labels and type labels remain source values; no cross-table breed harmonisation is asserted.",
            "The panel intentionally does not derive births-per-mare, conception, pregnancy, or fertility rates.",
        ],
    }
    return IfceSireEquineBenchmarkArtifacts(
        panel_rows=panel_rows,
        panel_csv_bytes=_csv_bytes(panel_rows),
        summary=summary,
    )


def _preflight_write(path: Path, payload: bytes, *, replace: bool) -> str:
    """Return an allowed write status without changing a file."""

    existed = path.exists()
    if existed:
        existing = path.read_bytes()
        if existing == payload:
            return "UNCHANGED_IDENTICAL"
        if not replace:
            raise FileExistsError(
                f"refusing to overwrite differing IFCE/SIRE benchmark output: {path}; "
                "pass replace=True only after reviewing the change"
            )
    return "REPLACED" if existed else "WRITTEN_NEW"


def _write_preflighted(path: Path, payload: bytes, *, status: str) -> dict[str, str]:
    """Commit a preflighted payload; identical files are intentionally untouched."""

    if status == "UNCHANGED_IDENTICAL":
        return {"path": str(path), "status": status}
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_bytes(payload)
    return {"path": str(path), "status": status}


def write_ifce_sire_equine_benchmark_artifacts(
    artifacts: IfceSireEquineBenchmarkArtifacts,
    *,
    output_path: Path = DEFAULT_OUTPUT_PATH,
    summary_path: Path = DEFAULT_SUMMARY_PATH,
    replace: bool = False,
) -> dict[str, dict[str, str]]:
    """Write deterministic outputs without silently replacing different files."""

    summary_payload = _canonical_json_bytes(artifacts.summary)
    # Check both paths before either is changed, so a collision cannot leave a
    # newly written panel paired with a stale or incompatible summary.
    panel_status = _preflight_write(output_path, artifacts.panel_csv_bytes, replace=replace)
    summary_status = _preflight_write(summary_path, summary_payload, replace=replace)
    panel_result = _write_preflighted(
        output_path, artifacts.panel_csv_bytes, status=panel_status
    )
    summary_result = _write_preflighted(
        summary_path,
        summary_payload,
        status=summary_status,
    )
    return {"panel": panel_result, "summary": summary_result}


def main(argv: Sequence[str] | None = None) -> int:
    parser = argparse.ArgumentParser(
        description="Build the isolated IFCE/SIRE equine breeding benchmark panel."
    )
    parser.add_argument(
        "--replace",
        action="store_true",
        help="replace a differing derived output after review; raw files are never written",
    )
    args = parser.parse_args(argv)
    artifacts = build_ifce_sire_equine_benchmark_artifacts()
    results = write_ifce_sire_equine_benchmark_artifacts(artifacts, replace=args.replace)
    print(_canonical_json({"row_counts": artifacts.summary["row_counts"], "writes": results}))
    return 0


if __name__ == "__main__":  # pragma: no cover - exercised through main()
    raise SystemExit(main())
