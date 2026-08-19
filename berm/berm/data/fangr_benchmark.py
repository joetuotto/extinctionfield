"""Build an isolated UK FAnGR breeding-structure benchmark.

The DEFRA Farm Animal Genetic Resources (FAnGR) CSV is an annual UK breed
inventory.  It reports breeding-structure counts (for example dams, sires,
females and effective population size), not individual fertility, semen or RF
measurements.  It is therefore a provenance-locked benchmark only and never a
sentinel, CSLI or active-prediction input.
"""

from __future__ import annotations

import argparse
import csv
import hashlib
import io
import json
from collections import Counter
from dataclasses import dataclass
from pathlib import Path
from typing import Any, Mapping, Sequence

__all__ = [
    "PIPELINE_VERSION",
    "FANGR_BENCHMARK_SCHEMA_VERSION",
    "SOURCE_ID",
    "DEFAULT_OUTPUT_PATH",
    "DEFAULT_SUMMARY_PATH",
    "FangrBenchmarkArtifacts",
    "build_fangr_benchmark_artifacts",
    "write_fangr_benchmark_artifacts",
]


DATA_DIR = Path(__file__).resolve().parent.parent.parent / "data"
SOURCE_ID = "DEFRA_FANGR_BREED_INVENTORY"
SOURCE_URL = "https://www.gov.uk/government/statistics/uk-farm-animal-genetic-resources-fangr-breed-inventory-results"
SOURCE_LICENSE = "Open Government Licence v3.0"
SOURCE_PERIOD = "2000/2026"
MANIFEST_FILENAME = "defra_fangr_2026-08-19.manifest.json"
PIPELINE_VERSION = "fangr_breeding_structure@v1.0.0"
FANGR_BENCHMARK_SCHEMA_VERSION = "berm.fangr_uk_breed_population_annual@v1.0.0"
DEFAULT_OUTPUT_PATH = DATA_DIR / "processed" / "fangr_uk_breed_population_annual.csv"
DEFAULT_SUMMARY_PATH = DATA_DIR / "processed" / "fangr_uk_breed_population_annual_summary.json"

RAW_HEADER = (
    "",
    "species",
    "breed_name",
    "native",
    "nbs_at_risk_current",
    "bar_current",
    "zr_current",
    "year",
    "population_variable",
    "values",
)
OUTPUT_HEADER = (
    "source_id",
    "source_url",
    "license",
    "retrieved_at",
    "source_period",
    "analysis_status",
    "f1_f6_eligibility",
    "country_iso3",
    "geography_level",
    "species",
    "breed_name",
    "year",
    "population_variable",
    "source_value",
    "value_status",
    "native_current",
    "nbs_at_risk_current",
    "bar_current",
    "zr_current",
    "endpoint_status",
    "rf_status",
    "raw_artifact",
    "raw_artifact_sha256",
    "raw_record_key",
    "source_row_number",
    "transform_pipeline_version",
)
ANALYSIS_STATUS = "BENCHMARK_ONLY_NOT_SENTINEL"
F1_F6_ELIGIBILITY = "NOT_ELIGIBLE"
ENDPOINT_STATUS = "BREEDING_STRUCTURE_NOT_FERTILITY_OR_SEMEN_ENDPOINT"
RF_STATUS = "NOT_MEASURED"


@dataclass(frozen=True)
class FangrBenchmarkArtifacts:
    """Deterministic artefacts derived from one manifest-locked raw CSV."""

    rows: tuple[dict[str, str], ...]
    csv_bytes: bytes
    summary: dict[str, Any]


def _sha256_path(path: Path) -> str:
    digest = hashlib.sha256()
    with path.open("rb") as handle:
        for block in iter(lambda: handle.read(1024 * 1024), b""):
            digest.update(block)
    return digest.hexdigest()


def _relative(path: Path, data_dir: Path) -> str:
    try:
        return str(path.resolve().relative_to(data_dir.resolve()))
    except ValueError:
        return str(path)


def _load_manifest(path: Path) -> dict[str, Any]:
    with path.open(encoding="utf-8") as handle:
        manifest = json.load(handle)
    if not isinstance(manifest, dict) or not isinstance(manifest.get("files"), list):
        raise ValueError(f"invalid FAnGR manifest: {path}")
    return manifest


def _checked_raw(
    *, data_dir: Path, manifest_path: Path, raw_path: Path | None
) -> tuple[Path, Mapping[str, Any], Mapping[str, Any]]:
    manifest = _load_manifest(manifest_path)
    entries = [
        entry
        for entry in manifest["files"]
        if isinstance(entry, Mapping) and entry.get("source_id") == SOURCE_ID
    ]
    if len(entries) != 1:
        raise ValueError(f"expected one {SOURCE_ID} manifest entry, found {len(entries)}")
    entry = entries[0]
    selected = raw_path or data_dir / str(entry.get("path", ""))
    if not selected.exists():
        raise FileNotFoundError(f"held FAnGR raw CSV is missing: {selected}")
    if entry.get("path") != _relative(selected, data_dir):
        raise ValueError("FAnGR raw path does not match manifest")
    if selected.stat().st_size != entry.get("bytes"):
        raise ValueError("FAnGR raw byte size does not match manifest")
    actual_sha = _sha256_path(selected)
    if actual_sha != entry.get("sha256"):
        raise ValueError("FAnGR raw SHA-256 does not match manifest")
    return selected, manifest, entry


def _read_rows(path: Path) -> list[dict[str, str]]:
    with path.open(encoding="utf-8-sig", newline="") as handle:
        reader = csv.DictReader(handle)
        header = tuple(reader.fieldnames or ())
        if header != RAW_HEADER:
            raise ValueError(f"FAnGR header mismatch: expected {RAW_HEADER!r}, got {header!r}")
        rows = [{key: (value or "").strip() for key, value in row.items()} for row in reader]
    if not rows:
        raise ValueError("FAnGR raw CSV is empty")
    return rows


def _required(row: Mapping[str, str], field: str, row_number: int) -> str:
    value = row.get(field, "")
    if not value:
        raise ValueError(f"FAnGR row {row_number} lacks {field!r}")
    return value


def _valid_year(value: str, row_number: int) -> int:
    try:
        year = int(value)
    except ValueError as exc:
        raise ValueError(f"FAnGR row {row_number} has invalid year {value!r}") from exc
    if not 1900 <= year <= 2100:
        raise ValueError(f"FAnGR row {row_number} has out-of-range year {year}")
    return year


def _valid_value(value: str, row_number: int) -> str:
    if not value:
        return ""
    if not value.isdigit():
        raise ValueError(f"FAnGR row {row_number} has invalid integer value {value!r}")
    return value


def _csv_bytes(rows: Sequence[Mapping[str, str]]) -> bytes:
    buffer = io.StringIO(newline="")
    writer = csv.DictWriter(
        buffer, fieldnames=OUTPUT_HEADER, extrasaction="raise", lineterminator="\n"
    )
    writer.writeheader()
    for row in rows:
        writer.writerow({field: row.get(field, "") for field in OUTPUT_HEADER})
    return buffer.getvalue().encode("utf-8")


def _json_bytes(value: Mapping[str, Any]) -> bytes:
    return (json.dumps(value, sort_keys=True, separators=(",", ":")) + "\n").encode("utf-8")


def build_fangr_benchmark_artifacts(
    *,
    data_dir: Path = DATA_DIR,
    manifest_path: Path | None = None,
    raw_path: Path | None = None,
) -> FangrBenchmarkArtifacts:
    """Normalize every published row while preserving source missingness."""
    manifest_path = manifest_path or data_dir / "raw" / "manifests" / MANIFEST_FILENAME
    selected, manifest, entry = _checked_raw(
        data_dir=data_dir, manifest_path=manifest_path, raw_path=raw_path
    )
    raw_rows = _read_rows(selected)
    retrieved_at = str(entry.get("retrieved_at", manifest.get("retrieved_at", "")))
    raw_relative = _relative(selected, data_dir)
    raw_sha = str(entry["sha256"])
    rows: list[dict[str, str]] = []
    reported_series: Counter[tuple[str, str, str]] = Counter()
    for row_number, raw in enumerate(raw_rows, start=1):
        source_row_number = _required(raw, "", row_number)
        species = _required(raw, "species", row_number)
        breed = _required(raw, "breed_name", row_number)
        variable = _required(raw, "population_variable", row_number)
        year = _valid_year(_required(raw, "year", row_number), row_number)
        source_value = _valid_value(raw.get("values", ""), row_number)
        if source_value:
            reported_series[(species, breed, variable)] += 1
        rows.append(
            {
                "source_id": SOURCE_ID,
                "source_url": SOURCE_URL,
                "license": SOURCE_LICENSE,
                "retrieved_at": retrieved_at,
                "source_period": SOURCE_PERIOD,
                "analysis_status": ANALYSIS_STATUS,
                "f1_f6_eligibility": F1_F6_ELIGIBILITY,
                "country_iso3": "GBR",
                "geography_level": "COUNTRY",
                "species": species,
                "breed_name": breed,
                "year": str(year),
                "population_variable": variable,
                "source_value": source_value,
                "value_status": "REPORTED_NUMERIC" if source_value else "MISSING_IN_SOURCE",
                "native_current": raw["native"],
                "nbs_at_risk_current": raw["nbs_at_risk_current"],
                "bar_current": raw["bar_current"],
                "zr_current": raw["zr_current"],
                "endpoint_status": ENDPOINT_STATUS,
                "rf_status": RF_STATUS,
                "raw_artifact": raw_relative,
                "raw_artifact_sha256": raw_sha,
                "raw_record_key": f"{species}|{breed}|{year}|{variable}",
                "source_row_number": source_row_number,
                "transform_pipeline_version": PIPELINE_VERSION,
            }
        )
    reported_rows = sum(row["value_status"] == "REPORTED_NUMERIC" for row in rows)
    summary: dict[str, Any] = {
        "schema_version": FANGR_BENCHMARK_SCHEMA_VERSION,
        "transform_pipeline_version": PIPELINE_VERSION,
        "analysis_status": ANALYSIS_STATUS,
        "eligibility": {
            "f1_f6": F1_F6_ELIGIBILITY,
            "reason": "NO_INDIVIDUAL_FERTILITY_OR_SEMEN_ENDPOINT_AND_NO_RF_MEASUREMENT",
        },
        "source": {
            "source_id": SOURCE_ID,
            "source_url": SOURCE_URL,
            "license": SOURCE_LICENSE,
            "source_period": SOURCE_PERIOD,
            "retrieved_at": retrieved_at,
            "raw_artifact": raw_relative,
            "raw_artifact_sha256": raw_sha,
            "raw_bytes": selected.stat().st_size,
            "manifest_id": manifest.get("manifest_id"),
        },
        "row_counts": {
            "raw_rows": len(raw_rows),
            "normalized_rows": len(rows),
            "reported_numeric_rows": reported_rows,
            "missing_in_source_rows": len(rows) - reported_rows,
            "species": len({row["species"] for row in rows}),
            "breeds": len({(row["species"], row["breed_name"]) for row in rows}),
            "reported_series": len(reported_series),
            "reported_series_with_at_least_5_years": sum(
                count >= 5 for count in reported_series.values()
            ),
        },
        "coverage": {
            "year_min": min(int(row["year"]) for row in rows),
            "year_max": max(int(row["year"]) for row in rows),
            "population_variables": sorted({row["population_variable"] for row in rows}),
            "species": sorted({row["species"] for row in rows}),
        },
        "caveats": [
            "Annual national breed inventory, not an individual-level fertility, semen, litter-size or offspring-survival panel.",
            "Current source-status fields repeat across historical rows and are not historical annual classifications.",
            "Empty source values remain MISSING_IN_SOURCE; they are not zero-filled or interpolated.",
            "No RF/EMF measurement, RF proxy, animal-level location or matched confounder panel is present.",
        ],
    }
    return FangrBenchmarkArtifacts(rows=tuple(rows), csv_bytes=_csv_bytes(rows), summary=summary)


def _write_if_safe(path: Path, content: bytes, *, replace: bool) -> str:
    existed = path.exists()
    if existed:
        if path.read_bytes() == content:
            return "UNCHANGED_IDENTICAL"
        if not replace:
            raise FileExistsError(f"refusing to replace changed derived output without --replace: {path}")
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_bytes(content)
    return "REPLACED" if existed else "WRITTEN_NEW"


def write_fangr_benchmark_artifacts(
    artifacts: FangrBenchmarkArtifacts,
    *,
    output_path: Path = DEFAULT_OUTPUT_PATH,
    summary_path: Path = DEFAULT_SUMMARY_PATH,
    replace: bool = False,
) -> dict[str, str]:
    """Write new, byte-identical, or explicitly reviewed derived products."""
    return {
        "rows": _write_if_safe(output_path, artifacts.csv_bytes, replace=replace),
        "summary": _write_if_safe(summary_path, _json_bytes(artifacts.summary), replace=replace),
    }


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--replace", action="store_true")
    args = parser.parse_args()
    artifacts = build_fangr_benchmark_artifacts()
    result = write_fangr_benchmark_artifacts(artifacts, replace=args.replace)
    print(json.dumps({"status": result, "summary": artifacts.summary}, sort_keys=True))


if __name__ == "__main__":
    main()
