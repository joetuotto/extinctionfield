"""Create a lightweight public export from the global BERM source panel.

``all_countries_panel.json`` intentionally retains field-level provenance for
research use.  It is too large for a browser fetch, so this module produces a
flat, no-imputation CSV plus a compact manifest-like JSON summary.  It is a
one-way publication transform: values are copied exactly or left blank, and
availability labels are copied from the source panel rather than inferred from
truthiness (a reported zero mobile value is available).

Typical use::

    python -m berm.data.global_public_export

The default targets are ``website/public/data/global_panel.csv`` and
``website/public/data/global_panel_summary.json``.  Existing outputs are
accepted only if byte-identical; a changed source requires the explicit
``--replace`` flag so a publication refresh cannot happen silently.
"""

from __future__ import annotations

import argparse
import csv
import hashlib
import io
import json
from pathlib import Path
from typing import Any, Mapping

from berm.data.cohorts import DEFAULT_TIER_PATH, TIER_SCHEMA_VERSION
from berm.data.global_panel import DEFAULT_PANEL_PATH, load_global_panel

__all__ = [
    "PUBLIC_EXPORT_SCHEMA_VERSION",
    "PUBLIC_CSV_COLUMNS",
    "DEFAULT_PUBLIC_CSV_PATH",
    "DEFAULT_PUBLIC_SUMMARY_PATH",
    "build_public_export",
    "write_public_export",
]


DATA_DIR = Path(__file__).resolve().parent.parent.parent / "data"
REPO_ROOT = DATA_DIR.parent.parent
PUBLIC_DATA_DIR = REPO_ROOT / "website" / "public" / "data"
DEFAULT_PUBLIC_CSV_PATH = PUBLIC_DATA_DIR / "global_panel.csv"
DEFAULT_PUBLIC_SUMMARY_PATH = PUBLIC_DATA_DIR / "global_panel_summary.json"
PUBLIC_EXPORT_SCHEMA_VERSION = "berm.global_public_export@v1.0.0"
_PUBLIC_FIELDS = (
    "tfr",
    "mobile_per_100",
    "urban_pct",
    "gdp_ppp_per_capita",
    "contraception_pct",
)
PUBLIC_CSV_COLUMNS: tuple[str, ...] = (
    "country_iso3",
    "country_name",
    "year",
    "tfr",
    "tfr_source",
    "tfr_measurement_type",
    "tfr_series_status",
    "mobile_per_100",
    "urban_pct",
    "gdp_ppp_per_capita",
    "contraception_pct",
    "tier_memberships",
    "tier_membership_status",
    "tfr_availability",
    "mobile_per_100_availability",
    "urban_pct_availability",
    "gdp_ppp_per_capita_availability",
    "contraception_pct_availability",
)


def _sha256_path(path: Path) -> str:
    digest = hashlib.sha256()
    with path.open("rb") as handle:
        for block in iter(lambda: handle.read(1024 * 1024), b""):
            digest.update(block)
    return digest.hexdigest()


def _sha256_bytes(value: bytes) -> str:
    return hashlib.sha256(value).hexdigest()


def _repo_relative(path: Path) -> str:
    try:
        return str(path.resolve().relative_to(REPO_ROOT.resolve()))
    except ValueError:
        return str(path)


def _canonical_json_bytes(value: Any) -> bytes:
    return (json.dumps(value, ensure_ascii=False, sort_keys=True, separators=(",", ":")) + "\n").encode("utf-8")


def _load_tiers(path: Path) -> dict[str, Any]:
    with path.open(encoding="utf-8") as handle:
        tiers = json.load(handle)
    if tiers.get("schema_version") != TIER_SCHEMA_VERSION:
        raise ValueError(f"unsupported tier schema {tiers.get('schema_version')!r} in {path}")
    if not isinstance(tiers.get("country_memberships"), Mapping):
        raise ValueError(f"tier artifact has no country_memberships mapping: {path}")
    return tiers


def _availability(row: Mapping[str, Any], field: str) -> str:
    """Expose the source's status, never a value-derived invented status."""
    missingness = row.get("missingness")
    if isinstance(missingness, Mapping) and field in missingness:
        status = missingness[field]
        return str(status) if status is not None else "MISSING_UNSPECIFIED"
    provenance = row.get("field_provenance")
    if isinstance(provenance, Mapping):
        field_provenance = provenance.get(field)
        if isinstance(field_provenance, Mapping) and field_provenance.get("status") is not None:
            return str(field_provenance["status"])
    return "AVAILABLE" if row.get(field) is not None else "MISSING_UNSPECIFIED"


def _csv_text(rows: list[dict[str, Any]]) -> bytes:
    handle = io.StringIO(newline="")
    writer = csv.DictWriter(handle, fieldnames=PUBLIC_CSV_COLUMNS, lineterminator="\n")
    writer.writeheader()
    writer.writerows(rows)
    return handle.getvalue().encode("utf-8")


def build_public_export(
    *,
    panel_path: Path = DEFAULT_PANEL_PATH,
    tier_path: Path = DEFAULT_TIER_PATH,
    csv_output_path: Path = DEFAULT_PUBLIC_CSV_PATH,
) -> tuple[bytes, dict[str, Any]]:
    """Flatten a source panel to exact public rows and a compact summary object."""
    panel_path = Path(panel_path)
    tier_path = Path(tier_path)
    panel = load_global_panel(panel_path)
    tiers = _load_tiers(tier_path)
    memberships = tiers["country_memberships"]
    rows: list[dict[str, Any]] = []
    availability_counts = {field: {"AVAILABLE": 0, "MISSING": 0, "OTHER": 0} for field in _PUBLIC_FIELDS}

    for iso3, country in sorted(panel["countries"].items()):
        country_name = country.get("country_name")
        years = country.get("years")
        if not isinstance(years, Mapping):
            raise ValueError(f"country {iso3} has no years mapping in {panel_path}")
        membership = memberships.get(iso3, {})
        labels = membership.get("memberships", []) if isinstance(membership, Mapping) else []
        labels = [str(label) for label in labels] if isinstance(labels, list) else []
        for year_text, row in sorted(years.items(), key=lambda item: int(item[0])):
            if not isinstance(row, Mapping):
                raise ValueError(f"country {iso3} year {year_text} is not an object")
            record: dict[str, Any] = {
                "country_iso3": iso3,
                "country_name": country_name or "",
                "year": int(year_text),
                "tfr": row.get("tfr", ""),
                "tfr_source": row.get("tfr_source", ""),
                "tfr_measurement_type": row.get("tfr_measurement_type", ""),
                "tfr_series_status": row.get("tfr_series_status", ""),
                "mobile_per_100": row.get("mobile_per_100", ""),
                "urban_pct": row.get("urban_pct", ""),
                "gdp_ppp_per_capita": row.get("gdp_ppp_per_capita", ""),
                "contraception_pct": row.get("contraception_pct", ""),
                "tier_memberships": "|".join(labels),
                "tier_membership_status": "ASSIGNED" if labels else "UNASSIGNED",
            }
            for field in _PUBLIC_FIELDS:
                status = _availability(row, field)
                record[f"{field}_availability"] = status
                # The source may state a detailed reason such as
                # ``not_reported_by_source_for_country_year``.  It is still a
                # missing public value, not a third data state.
                bucket = "AVAILABLE" if status == "AVAILABLE" else "MISSING"
                availability_counts[field][bucket] += 1
            rows.append(record)

    csv_bytes = _csv_text(rows)
    tier_counts = {
        name: int((tiers.get(name) or {}).get("count", 0))
        for name in ("core", "extended", "global")
    }
    summary = {
        "schema_version": PUBLIC_EXPORT_SCHEMA_VERSION,
        "publication_type": "flat_no_imputation_country_year_export",
        "source_panel": {
            "path": _repo_relative(panel_path),
            "sha256": _sha256_path(panel_path),
            "schema_version": panel.get("schema_version"),
            "generated_at": panel.get("generated_at"),
        },
        "source_tiers": {
            "path": _repo_relative(tier_path),
            "sha256": _sha256_path(tier_path),
            "schema_version": tiers.get("schema_version"),
            "generated_at": tiers.get("generated_at"),
            "counts": tier_counts,
        },
        "public_csv": {
            "path": _repo_relative(Path(csv_output_path)),
            "sha256": _sha256_bytes(csv_bytes),
            "rows": len(rows),
            "columns": list(PUBLIC_CSV_COLUMNS),
            "year_range": panel.get("year_range"),
        },
        "coverage": panel.get("coverage"),
        "public_field_availability": availability_counts,
        "no_imputation": True,
        "notes": [
            "Values are copied exactly from the provenance-rich research panel or left blank.",
            "Availability columns are source labels; a literal zero remains AVAILABLE.",
            "Mobile, broadband and internet source measures remain proxies and are not RF dose estimates.",
            "This export contains no military/broadcast scenario layer and no model-validation result.",
        ],
    }
    return csv_bytes, summary


def _write_one(path: Path, payload: bytes, *, replace: bool) -> str:
    if path.exists():
        if path.read_bytes() == payload:
            return "UNCHANGED_IDENTICAL"
        if not replace:
            raise FileExistsError(
                f"refusing to overwrite public export {path}; rerun with replace=True after review"
            )
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_bytes(payload)
    return "REPLACED_EXPLICITLY" if replace else "WRITTEN_NEW"


def write_public_export(
    csv_bytes: bytes,
    summary: Mapping[str, Any],
    *,
    csv_output_path: Path = DEFAULT_PUBLIC_CSV_PATH,
    summary_output_path: Path = DEFAULT_PUBLIC_SUMMARY_PATH,
    replace: bool = False,
) -> dict[str, Any]:
    """Publish the two paired lightweight artefacts with explicit replacement."""
    recorded_csv_hash = (summary.get("public_csv") or {}).get("sha256")
    actual_csv_hash = _sha256_bytes(csv_bytes)
    if recorded_csv_hash != actual_csv_hash:
        raise ValueError(
            "public export summary does not describe the supplied CSV bytes; rebuild the pair together"
        )
    summary_bytes = _canonical_json_bytes(summary)
    # Validate both targets before writing either one, avoiding a half-refreshed
    # pair when only one old file differs.
    for path, payload in ((Path(csv_output_path), csv_bytes), (Path(summary_output_path), summary_bytes)):
        if path.exists() and path.read_bytes() != payload and not replace:
            raise FileExistsError(
                f"refusing to overwrite public export {path}; rerun with replace=True after review"
            )
    csv_status = _write_one(Path(csv_output_path), csv_bytes, replace=replace)
    summary_status = _write_one(Path(summary_output_path), summary_bytes, replace=replace)
    return {
        "csv": {"path": str(csv_output_path), "status": csv_status, "sha256": actual_csv_hash},
        "summary": {"path": str(summary_output_path), "status": summary_status, "sha256": _sha256_bytes(summary_bytes)},
    }


def _cli() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--panel", type=Path, default=DEFAULT_PANEL_PATH)
    parser.add_argument("--tiers", type=Path, default=DEFAULT_TIER_PATH)
    parser.add_argument("--csv-output", type=Path, default=DEFAULT_PUBLIC_CSV_PATH)
    parser.add_argument("--summary-output", type=Path, default=DEFAULT_PUBLIC_SUMMARY_PATH)
    parser.add_argument("--replace", action="store_true", help="explicitly replace changed derived public outputs")
    args = parser.parse_args()
    csv_bytes, summary = build_public_export(
        panel_path=args.panel,
        tier_path=args.tiers,
        csv_output_path=args.csv_output,
    )
    print(json.dumps(write_public_export(
        csv_bytes,
        summary,
        csv_output_path=args.csv_output,
        summary_output_path=args.summary_output,
        replace=args.replace,
    ), indent=2, sort_keys=True))
    return 0


if __name__ == "__main__":  # pragma: no cover - CLI wiring
    raise SystemExit(_cli())
