"""Immutable acquisition and parsing for the global World Bank panel.

This module deliberately treats a World Bank download as a *source artefact*,
not as a cache.  A refresh gets a new release directory and a new manifest;
an existing release is never overwritten.  The resulting records retain the
indicator code, source identifier and measurement class needed by the global
panel builder.

The downloader covers the eight open World Development Indicators used by the
global BERM expansion.  It does not turn subscriptions into RF dose and it
does not supply any of the legacy military/broadcast scenario layers.

Example (creates a new immutable source batch)::

    python -m berm.data.global_download acquire --release-id wb_global_2026-08-19

The command writes only beneath ``data/raw/world_bank/<release-id>/`` plus its
manifest in ``data/raw/manifests/``.  Build the model-facing panel separately
with :mod:`berm.data.global_panel`.
"""

from __future__ import annotations

import argparse
import datetime as dt
import hashlib
import json
import re
from dataclasses import dataclass
from pathlib import Path
from typing import Any, Callable, Iterable, Mapping
from urllib.parse import parse_qs, urlencode, urlparse, urlunparse
from urllib.request import urlopen

from berm.data.contracts import MeasurementType

__all__ = [
    "DATA_DIR",
    "RAW_DIR",
    "MANIFEST_DIR",
    "WORLD_BANK_API",
    "IndicatorSpec",
    "INDICATORS",
    "WorldBankDownloadError",
    "WorldBankRelease",
    "acquire_world_bank_release",
    "load_world_bank_release",
    "parse_country_metadata",
    "parse_indicator_payload",
]


DATA_DIR = Path(__file__).resolve().parent.parent.parent / "data"
RAW_DIR = DATA_DIR / "raw"
MANIFEST_DIR = RAW_DIR / "manifests"
WORLD_BANK_API = "https://api.worldbank.org/v2"
PIPELINE_VERSION = "global_world_bank_acquire@v1.0.0"
RAW_FORMAT = "world_bank_v2_raw_bundle@v1"
_RELEASE_RE = re.compile(r"^[A-Za-z0-9][A-Za-z0-9._-]*$")


@dataclass(frozen=True)
class IndicatorSpec:
    """One World Development Indicator and its honest panel representation."""

    code: str
    field: str
    source_id: str
    unit: str
    measurement_type: str
    proxy_flag: bool
    title: str

    @property
    def source_url(self) -> str:
        return f"{WORLD_BANK_API}/country/all/indicator/{self.code}"

    @property
    def raw_filename(self) -> str:
        return f"{self.field}.json"


# ``measurement_type`` describes the source quantity, not a claim that it is
# equivalent to the latent construct in a BERM mechanism.  In particular,
# mobile/broadband/internet remain PROXY values throughout the pipeline.
INDICATORS: tuple[IndicatorSpec, ...] = (
    IndicatorSpec(
        "SP.DYN.TFRT.IN", "tfr", "WB_SP_DYN_TFRT_IN", "births_per_woman",
        MeasurementType.OBSERVED.value, False,
        "Fertility rate, total (births per woman)",
    ),
    IndicatorSpec(
        "SP.POP.TOTL", "population", "WB_SP_POP_TOTL", "persons",
        MeasurementType.OBSERVED.value, False, "Population, total",
    ),
    IndicatorSpec(
        "SP.URB.TOTL.IN.ZS", "urban_pct", "WB_SP_URB_TOTL_IN_ZS",
        "pct_population", MeasurementType.OBSERVED.value, False,
        "Urban population (% of total population)",
    ),
    IndicatorSpec(
        "IT.CEL.SETS.P2", "mobile_per_100", "WB_IT_CEL_SETS_P2",
        "subscriptions_per_100", MeasurementType.PROXY.value, True,
        "Mobile cellular subscriptions (per 100 people)",
    ),
    IndicatorSpec(
        "IT.NET.BBND.P2", "broadband_per_100", "WB_IT_NET_BBND_P2",
        "subscriptions_per_100", MeasurementType.PROXY.value, True,
        "Fixed broadband subscriptions (per 100 people)",
    ),
    IndicatorSpec(
        "IT.NET.USER.ZS", "internet_pct", "WB_IT_NET_USER_ZS",
        "pct_population", MeasurementType.PROXY.value, True,
        "Individuals using the Internet (% of population)",
    ),
    IndicatorSpec(
        "NY.GDP.PCAP.PP.CD", "gdp_ppp_per_capita", "WB_NY_GDP_PCAP_PP_CD",
        "current_international_dollars_per_person", MeasurementType.OBSERVED.value,
        False, "GDP per capita, PPP (current international $)",
    ),
    IndicatorSpec(
        "SP.DYN.CONU.ZS", "contraception_pct", "WB_SP_DYN_CONU_ZS",
        "pct_women_15_49", MeasurementType.OBSERVED.value, False,
        "Contraceptive prevalence, any method (% of women ages 15-49)",
    ),
)

_BY_FIELD = {spec.field: spec for spec in INDICATORS}
_BY_CODE = {spec.code: spec for spec in INDICATORS}


class WorldBankDownloadError(RuntimeError):
    """The World Bank API returned a malformed or unusable response."""


@dataclass(frozen=True)
class WorldBankRelease:
    """A parsed, country-filtered immutable World Bank release."""

    release_id: str
    release_dir: Path
    manifest_path: Path | None
    retrieved_at: str
    countries: Mapping[str, Mapping[str, Any]]
    observations: Mapping[str, Mapping[int, Mapping[str, Mapping[str, Any]]]]
    source_artifacts: Mapping[str, Mapping[str, Any]]


def _today() -> str:
    return dt.date.today().isoformat()


def _ensure_release_id(release_id: str) -> str:
    if not _RELEASE_RE.fullmatch(release_id):
        raise ValueError(
            "release_id must contain only letters, digits, '.', '_' or '-' "
            "and must not start with punctuation"
        )
    return release_id


def _canonical_bytes(value: Any) -> bytes:
    return (json.dumps(value, ensure_ascii=False, sort_keys=True, separators=(",", ":")) + "\n").encode("utf-8")


def _sha256(path: Path) -> str:
    digest = hashlib.sha256()
    with path.open("rb") as handle:
        for block in iter(lambda: handle.read(1024 * 1024), b""):
            digest.update(block)
    return digest.hexdigest()


def _relative_data_path(path: Path) -> str:
    """Use repository-relative paths in production, absolute/temp paths in tests."""
    try:
        return str(path.resolve().relative_to(DATA_DIR.resolve()))
    except ValueError:
        return str(path)


def _write_new_json(path: Path, value: Any) -> None:
    """Write one new artefact; silently replacing source bytes is forbidden."""
    if path.exists():
        raise FileExistsError(f"refusing to overwrite immutable source artefact: {path}")
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_bytes(_canonical_bytes(value))


def _with_query(url: str, **query: str | int) -> str:
    parsed = urlparse(url)
    existing = parse_qs(parsed.query)
    existing.update({key: [str(value)] for key, value in query.items()})
    return urlunparse(parsed._replace(query=urlencode(existing, doseq=True)))


def _default_fetch_json(url: str, timeout: float = 60.0) -> Any:
    """Fetch JSON, preferring certifi-backed ``requests`` when available.

    ``requests`` is already the project's optional ``data`` dependency and
    carries a CA bundle on installations where the platform Python keychain is
    incomplete.  The stdlib fallback keeps this module importable in the base
    package as well.
    """
    try:
        import requests
    except ImportError:  # pragma: no cover - exercised only without data extras
        with urlopen(url, timeout=timeout) as response:  # noqa: S310 - fixed HTTPS API
            return json.loads(response.read().decode("utf-8"))
    response = requests.get(url, timeout=timeout)
    response.raise_for_status()
    return response.json()


def _fetch_pages(
    base_url: str,
    *,
    fetch_json: Callable[[str], Any],
    per_page: int = 20_000,
) -> list[Any]:
    """Fetch all World Bank v2 pages, retaining each raw response unchanged."""
    pages: list[Any] = []
    page = 1
    while True:
        url = _with_query(base_url, format="json", per_page=per_page, page=page)
        payload = fetch_json(url)
        if not isinstance(payload, list) or len(payload) < 2:
            raise WorldBankDownloadError(
                f"World Bank response for {base_url!r} is not [metadata, records]"
            )
        metadata, records = payload[0], payload[1]
        if not isinstance(metadata, Mapping) or not isinstance(records, list):
            raise WorldBankDownloadError(
                f"World Bank response for {base_url!r} has invalid metadata/records"
            )
        pages.append(payload)
        total_pages = int(metadata.get("pages", 1) or 1)
        if page >= total_pages:
            return pages
        page += 1


def _raw_bundle(
    *,
    source_url: str,
    retrieved_at: str,
    pages: list[Any],
    kind: str,
    indicator: IndicatorSpec | None = None,
) -> dict[str, Any]:
    out: dict[str, Any] = {
        "format": RAW_FORMAT,
        "kind": kind,
        "source_url": source_url,
        "retrieved_at": retrieved_at,
        "pages": pages,
    }
    if indicator is not None:
        out["indicator_code"] = indicator.code
        out["field"] = indicator.field
        out["source_id"] = indicator.source_id
    return out


def acquire_world_bank_release(
    *,
    release_id: str | None = None,
    raw_dir: Path = RAW_DIR,
    manifest_dir: Path = MANIFEST_DIR,
    retrieved_at: str | None = None,
    fetch_json: Callable[[str], Any] | None = None,
) -> dict[str, Any]:
    """Acquire all eight indicators plus country metadata into a new release.

    ``fetch_json`` exists for deterministic tests.  It receives a fully formed
    URL and must return the decoded JSON payload from the World Bank v2 API.
    The raw response pages are stored in an envelope so pagination never loses
    source bytes or metadata.
    """
    retrieved_at = retrieved_at or _today()
    release_id = _ensure_release_id(release_id or f"wb_global_{retrieved_at}")
    release_dir = raw_dir / "world_bank" / release_id
    manifest_path = manifest_dir / f"{release_id}.manifest.json"
    if release_dir.exists() or manifest_path.exists():
        raise FileExistsError(
            f"release {release_id!r} already exists; choose a new release_id instead of overwriting it"
        )

    fetch = fetch_json or _default_fetch_json
    release_dir.mkdir(parents=True, exist_ok=False)
    files: list[dict[str, Any]] = []

    for spec in INDICATORS:
        pages = _fetch_pages(spec.source_url, fetch_json=fetch)
        path = release_dir / spec.raw_filename
        _write_new_json(
            path,
            _raw_bundle(
                source_url=spec.source_url,
                retrieved_at=retrieved_at,
                pages=pages,
                kind="indicator",
                indicator=spec,
            ),
        )
        files.append({
            "source_id": spec.source_id,
            "path": str(path.relative_to(raw_dir.parent)),
            "original_filename": path.name,
            "bytes": path.stat().st_size,
            "sha256": _sha256(path),
            "retrieved_at": retrieved_at,
            "note": (
                f"World Bank indicator {spec.code} ({spec.field}); raw paginated "
                "JSON responses retained without value transformation. "
                + ("This is a proxy, not an RF dose." if spec.proxy_flag else "")
            ).strip(),
        })

    country_url = f"{WORLD_BANK_API}/country"
    country_pages = _fetch_pages(country_url, fetch_json=fetch)
    country_path = release_dir / "country_metadata.json"
    _write_new_json(
        country_path,
        _raw_bundle(
            source_url=country_url,
            retrieved_at=retrieved_at,
            pages=country_pages,
            kind="country_metadata",
        ),
    )

    manifest = {
        "manifest_id": release_id,
        "description": "Immutable World Bank v2 JSON acquisition for the BERM global panel (eight indicators).",
        "retrieved_at": retrieved_at,
        "retrieval_method": "World Bank v2 JSON API, format=json, per_page=20000, all pages retained",
        "license": "CC-BY-4.0",
        "transform_pipeline_version": PIPELINE_VERSION,
        "files": files,
        "auxiliary_files": [{
            "path": str(country_path.relative_to(raw_dir.parent)),
            "original_filename": country_path.name,
            "bytes": country_path.stat().st_size,
            "sha256": _sha256(country_path),
            "retrieved_at": retrieved_at,
            "source_url": country_url,
            "note": (
                "World Bank country metadata used to retain only records where "
                "region.id != 'NA'. It is an auxiliary classification artefact, "
                "not a model observation source."
            ),
        }],
    }
    _write_new_json(manifest_path, manifest)
    return manifest


def _records_from_payload(payload: Any) -> Iterable[Mapping[str, Any]]:
    """Yield API records from a legacy single-page response or raw bundle."""
    if isinstance(payload, Mapping) and payload.get("format") == RAW_FORMAT:
        pages = payload.get("pages", [])
    elif isinstance(payload, list):
        pages = [payload]
    else:
        raise WorldBankDownloadError("unrecognised World Bank raw JSON structure")
    for page in pages:
        if not isinstance(page, list) or len(page) < 2 or not isinstance(page[1], list):
            raise WorldBankDownloadError("raw World Bank page is not [metadata, records]")
        for record in page[1]:
            if isinstance(record, Mapping):
                yield record


def parse_country_metadata(payload: Any) -> dict[str, dict[str, Any]]:
    """Return only authoritative World Bank country records.

    The API has more than three-letter aggregate codes, so code length is not a
    country test.  ``region.id != 'NA'`` is World Bank's own country/aggregate
    distinction and is the only filter used here.
    """
    countries: dict[str, dict[str, Any]] = {}
    for record in _records_from_payload(payload):
        iso3 = str(record.get("id") or record.get("iso3Code") or "").upper()
        region = record.get("region")
        if not re.fullmatch(r"[A-Z]{3}", iso3) or not isinstance(region, Mapping):
            continue
        if str(region.get("id") or "") == "NA":
            continue
        countries[iso3] = {
            "name": record.get("name"),
            "world_bank_id": record.get("iso2Code"),
            "region_id": region.get("id"),
            "region_name": region.get("value"),
            "income_level": (record.get("incomeLevel") or {}).get("id"),
            "lending_type": (record.get("lendingType") or {}).get("id"),
        }
    return dict(sorted(countries.items()))


def parse_indicator_payload(
    payload: Any,
    spec: IndicatorSpec,
    *,
    country_codes: set[str],
    raw_artifact: str,
    retrieved_at: str,
) -> dict[str, dict[int, dict[str, Any]]]:
    """Parse one source artefact without interpolating or filling values."""
    output: dict[str, dict[int, dict[str, Any]]] = {}
    for record in _records_from_payload(payload):
        iso3 = str(record.get("countryiso3code") or "").upper()
        if iso3 not in country_codes:
            continue
        raw_year = record.get("date")
        raw_value = record.get("value")
        try:
            year = int(raw_year)
            value = float(raw_value) if raw_value is not None else None
        except (TypeError, ValueError):
            continue
        if value is None:
            continue
        output.setdefault(iso3, {})[year] = {
            "value": value,
            "source_id": spec.source_id,
            "source_url": spec.source_url,
            "retrieved_at": retrieved_at,
            "unit": spec.unit,
            "measurement_type": spec.measurement_type,
            "proxy_flag": spec.proxy_flag,
            "raw_artifact": raw_artifact,
            "indicator_code": spec.code,
            "series_status": "REPORTED_BY_WORLD_BANK",
        }
    return output


def _read_json(path: Path) -> Any:
    with path.open(encoding="utf-8") as handle:
        return json.load(handle)


def load_world_bank_release(
    release_dir: Path,
    *,
    manifest_path: Path | None = None,
) -> WorldBankRelease:
    """Load a downloaded release and apply its metadata-based country filter."""
    release_dir = Path(release_dir)
    metadata_path = release_dir / "country_metadata.json"
    if not metadata_path.exists():
        raise FileNotFoundError(f"country metadata is required to filter aggregates: {metadata_path}")
    metadata_payload = _read_json(metadata_path)
    countries = parse_country_metadata(metadata_payload)
    if not countries:
        raise WorldBankDownloadError("country metadata produced no World Bank country records")

    retrieved_at = str(metadata_payload.get("retrieved_at", "")) if isinstance(metadata_payload, Mapping) else ""
    observations: dict[str, dict[int, dict[str, dict[str, Any]]]] = {}
    source_artifacts: dict[str, dict[str, Any]] = {}
    for spec in INDICATORS:
        path = release_dir / spec.raw_filename
        if not path.exists():
            raise FileNotFoundError(f"release missing required indicator artefact: {path}")
        payload = _read_json(path)
        source_retrieved_at = (
            str(payload.get("retrieved_at", retrieved_at))
            if isinstance(payload, Mapping) else retrieved_at
        )
        parsed = parse_indicator_payload(
            payload,
            spec,
            country_codes=set(countries),
            raw_artifact=_relative_data_path(path),
            retrieved_at=source_retrieved_at,
        )
        for iso3, by_year in parsed.items():
            for year, record in by_year.items():
                observations.setdefault(iso3, {}).setdefault(year, {})[spec.field] = record
        source_artifacts[spec.field] = {
            "source_id": spec.source_id,
            "indicator_code": spec.code,
            "source_url": spec.source_url,
            "raw_artifact": _relative_data_path(path),
            "sha256": _sha256(path),
            "retrieved_at": source_retrieved_at,
            "measurement_type": spec.measurement_type,
            "proxy_flag": spec.proxy_flag,
            "unit": spec.unit,
        }

    return WorldBankRelease(
        release_id=release_dir.name,
        release_dir=release_dir,
        manifest_path=Path(manifest_path) if manifest_path else None,
        retrieved_at=retrieved_at,
        countries=countries,
        observations=observations,
        source_artifacts=source_artifacts,
    )


def _cli() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    sub = parser.add_subparsers(dest="command", required=True)
    acquire = sub.add_parser("acquire", help="download an immutable eight-indicator World Bank release")
    acquire.add_argument("--release-id", help="new release identifier, e.g. wb_global_2026-08-19")
    args = parser.parse_args()
    if args.command == "acquire":
        manifest = acquire_world_bank_release(release_id=args.release_id)
        print(json.dumps({
            "manifest_id": manifest["manifest_id"],
            "files": len(manifest["files"]),
            "manifest": str(MANIFEST_DIR / f"{manifest['manifest_id']}.manifest.json"),
        }, indent=2))
    return 0


if __name__ == "__main__":  # pragma: no cover - CLI wiring
    raise SystemExit(_cli())
