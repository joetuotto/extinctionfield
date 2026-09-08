"""Read-only, source-linked technology histories at BERM's input boundary.

Counts and coverage are imported historical records. They are not local E/B,
potential, dose, tissue sensitivity or an input coefficient for a forecast.
Missing years remain missing: this adapter never interpolates or extrapolates.
"""

from __future__ import annotations

import json
import math
import re
from dataclasses import dataclass
from datetime import date
from pathlib import Path
from typing import Any


REPOSITORY_ROOT = Path(__file__).resolve().parents[3]
DEFAULT_PATH = REPOSITORY_ROOT / "website/public/data/technology-adoption.json"
DEFAULT_CATALOGUE_PATH = REPOSITORY_ROOT / "website/data/technology-history.json"


def validate_history(data: dict[str, Any]) -> None:
    """Reject ambiguous units, duplicate years and implicit model conversions."""
    if (data.get("schemaVersion") != 1
            or data.get("scope") != "imported_technology_history"
            or data.get("exposureMapping") != "not_calibrated"
            or data.get("interpolation") != "none"):
        raise ValueError("unsupported technology history contract")
    sources = data.get("sources", [])
    source_ids = {s["id"] for s in sources}
    if len(source_ids) != len(sources):
        raise ValueError("duplicate history source")
    series_ids: set[str] = set()
    for series in data.get("series", []):
        sid = series["id"]
        if sid in series_ids:
            raise ValueError("duplicate history series")
        series_ids.add(sid)
        if series["unit"] not in {"meters", "percent", "devices"}:
            raise ValueError("history unit is not a technology count or share")
        if series["frequency"] not in {"annual", "sparse"}:
            raise ValueError("invalid history frequency")
        years: list[int] = []
        for point in series["points"]:
            year, value = point["year"], point["value"]
            if isinstance(year, bool) or not isinstance(year, int):
                raise ValueError("history year must be an integer")
            if (isinstance(value, bool) or not isinstance(value, (int, float))
                    or not math.isfinite(value) or value < 0):
                raise ValueError("history value must be finite and nonnegative")
            if series["unit"] == "percent" and value > 100:
                raise ValueError("percentage exceeds 100")
            if point["sourceId"] not in source_ids:
                raise ValueError("unknown history source")
            if point.get("imputed") is not False:
                raise ValueError("imputed history points are not supported")
            if point["observationType"] not in {"reported_count", "reported_estimate"}:
                raise ValueError("unsupported history observation type")
            if point["precision"] not in {"integer", "rounded"}:
                raise ValueError("unsupported history precision")
            if point["precision"] == "integer" and int(value) != value:
                raise ValueError("non-integer count with integer precision")
            denominator = point["denominator"]
            if denominator is not None:
                dv = denominator["value"]
                if (isinstance(dv, bool) or not isinstance(dv, (int, float))
                        or not math.isfinite(dv) or dv <= 0):
                    raise ValueError("invalid denominator")
                if denominator["unit"] != series["unit"] or value > dv:
                    raise ValueError("denominator does not match count population")
            years.append(year)
        if years != sorted(set(years)):
            raise ValueError("history years must be sorted and unique")


@dataclass(frozen=True)
class HistoricalRecord:
    series_id: str
    technology_id: str
    geography_code: str
    year: int
    as_of: str | None
    value: float
    unit: str
    source_id: str
    source_url: str
    source_locator: str
    observation_type: str
    precision: str
    denominator_value: float | None
    denominator_unit: str | None
    denominator_population: str | None
    population: str
    imputed: bool = False


@dataclass(frozen=True)
class TechnologyHistory:
    release_id: str
    records: tuple[HistoricalRecord, ...]

    def select(self, *, technology_id: str | None = None,
               geography_code: str | None = None,
               series_id: str | None = None) -> tuple[HistoricalRecord, ...]:
        return tuple(r for r in self.records
                     if (technology_id is None or r.technology_id == technology_id)
                     and (geography_code is None or r.geography_code == geography_code)
                     and (series_id is None or r.series_id == series_id))

    def at(self, series_id: str, year: int) -> HistoricalRecord | None:
        """Return a recorded year, or None; never carry a sparse value forward."""
        return next((r for r in self.records
                     if r.series_id == series_id and r.year == year), None)


def load_history(path: Path | str = DEFAULT_PATH) -> TechnologyHistory:
    data = json.loads(Path(path).read_text(encoding="utf-8"))
    validate_history(data)
    sources = {s["id"]: s for s in data["sources"]}
    records = []
    for series in data["series"]:
        for point in series["points"]:
            denominator = point["denominator"]
            records.append(HistoricalRecord(
                series_id=series["id"], technology_id=series["technologyId"],
                geography_code=series["geography"]["code"], year=point["year"],
                as_of=point["asOf"], value=point["value"], unit=series["unit"],
                source_id=point["sourceId"], source_url=sources[point["sourceId"]]["url"],
                source_locator=point["sourceLocator"],
                observation_type=point["observationType"], precision=point["precision"],
                denominator_value=denominator["value"] if denominator else None,
                denominator_unit=denominator["unit"] if denominator else None,
                denominator_population=denominator["population"]["en"] if denominator else None,
                population=series["coverage"]["en"],
            ))
    return TechnologyHistory(data["releaseId"], tuple(records))


@dataclass(frozen=True)
class CatalogueText:
    en: str
    fi: str


@dataclass(frozen=True)
class CatalogueBoundary:
    geometry: CatalogueText
    conditional_response: CatalogueText
    empirical_input: CatalogueText
    calibration_gap: CatalogueText


@dataclass(frozen=True)
class CatalogueGroup:
    id: str
    name: CatalogueText
    summary: CatalogueText


@dataclass(frozen=True)
class CatalogueSource:
    id: str
    url: str
    title: str
    publisher: str
    accessed: str
    kind: str
    scope: CatalogueText


@dataclass(frozen=True)
class CatalogueDataLink:
    id: str
    label: CatalogueText
    url: str
    kind: str
    scope: CatalogueText


@dataclass(frozen=True)
class CatalogueTechnology:
    id: str
    group: str
    name: CatalogueText
    summary: CatalogueText
    physical_profile: CatalogueText
    history_gap: CatalogueText
    berm_relevance: CatalogueText
    seasonality: CatalogueText
    source_ids: tuple[str, ...]
    data_links: tuple[CatalogueDataLink, ...]


@dataclass(frozen=True)
class CatalogueRegion:
    id: str
    name: CatalogueText


@dataclass(frozen=True)
class CatalogueQuantity:
    value: float
    unit: str
    denominator: CatalogueText
    label: CatalogueText


@dataclass(frozen=True)
class CatalogueEvent:
    id: str
    technology_ids: tuple[str, ...]
    region: CatalogueRegion
    start_year: int
    end_year: int | None
    kind: str
    title: CatalogueText
    description: CatalogueText
    source_ids: tuple[str, ...]
    location: CatalogueText | None
    values: tuple[CatalogueQuantity, ...]


@dataclass(frozen=True)
class TechnologyCatalogue:
    schema_version: int
    updated_at: str
    boundary: CatalogueBoundary
    groups: tuple[CatalogueGroup, ...]
    sources: tuple[CatalogueSource, ...]
    technologies: tuple[CatalogueTechnology, ...]
    events: tuple[CatalogueEvent, ...]

    def events_for(self, technology_id: str, region_id: str | None = None,
                   start_year: int | None = None,
                   end_year: int | None = None) -> tuple[CatalogueEvent, ...]:
        """Inclusive interval overlap; point events never imply ongoing exposure.

        Recorded intervals are returned unchanged, not expanded into annual
        observations. An empty result means no matching record, not zero use.
        """
        for year in (start_year, end_year):
            if year is not None and (isinstance(year, bool) or not isinstance(year, int)):
                raise ValueError("query year must be an integer")
        if start_year is not None and end_year is not None and start_year > end_year:
            return ()
        return tuple(e for e in self.events
                     if technology_id in e.technology_ids
                     and (region_id is None or e.region.id == region_id)
                     and (start_year is None or (e.end_year or e.start_year) >= start_year)
                     and (end_year is None or e.start_year <= end_year))

    def sources_for(self, event: CatalogueEvent) -> tuple[CatalogueSource, ...]:
        """Resolve exact source records in the event's original reference order."""
        sources = {source.id: source for source in self.sources}
        return tuple(sources[sid] for sid in event.source_ids)


def _catalogue_text(value: Any) -> CatalogueText:
    if not isinstance(value, dict) or any(
            not isinstance(value.get(lang), str) or not value[lang].strip()
            for lang in ("en", "fi")):
        raise ValueError("catalogue text requires complete en and fi values")
    return CatalogueText(value["en"], value["fi"])


def _catalogue_ids(rows: Any, category: str) -> set[str]:
    if not isinstance(rows, list):
        raise ValueError(f"catalogue {category} must be an array")
    ids: set[str] = set()
    for row in rows:
        rid = row.get("id") if isinstance(row, dict) else None
        if not isinstance(rid, str) or not re.fullmatch(r"[a-z0-9]+(?:-[a-z0-9]+)*", rid):
            raise ValueError(f"invalid catalogue {category} ID")
        if rid in ids:
            raise ValueError(f"duplicate catalogue {category} ID: {rid}")
        ids.add(rid)
    return ids


def _catalogue_refs(value: Any, known: set[str], required: bool = True) -> tuple[str, ...]:
    if (not isinstance(value, list) or (required and not value)
            or any(not isinstance(ref, str) or ref not in known for ref in value)):
        raise ValueError("unknown or missing catalogue reference")
    if len(set(value)) != len(value):
        raise ValueError("duplicate catalogue reference")
    return tuple(value)


def _read_catalogue(data: dict[str, Any]) -> TechnologyCatalogue:
    if data.get("schemaVersion") != 1 or isinstance(data.get("schemaVersion"), bool):
        raise ValueError("unsupported catalogue schema version")
    updated = date.fromisoformat(data["updatedAt"])
    if updated.isoformat() != data["updatedAt"]:
        raise ValueError("catalogue update requires ISO date")
    boundary = data["boundary"]
    boundaries = CatalogueBoundary(*(_catalogue_text(boundary[key]) for key in (
        "geometry", "conditionalResponse", "empiricalInput", "calibrationGap")))
    group_ids = _catalogue_ids(data["groups"], "group")
    source_ids = _catalogue_ids(data["sources"], "source")
    technology_ids = _catalogue_ids(data["technologies"], "technology")
    _catalogue_ids(data["events"], "event")
    groups = tuple(CatalogueGroup(g["id"], _catalogue_text(g["name"]),
                                  _catalogue_text(g["summary"])) for g in data["groups"])
    sources = []
    source_kinds = {"primary-study", "official-statistics", "official-history", "operator-report",
                    "manufacturer-history", "technical-standard", "regulation", "historical-research"}
    for row in data["sources"]:
        accessed = date.fromisoformat(row["accessed"])
        if accessed.isoformat() != row["accessed"] or accessed > updated:
            raise ValueError("catalogue source access date exceeds update or is not ISO")
        if (not isinstance(row["url"], str) or not row["url"].startswith("https://")
                or row["kind"] not in source_kinds
                or any(not isinstance(row[k], str) or not row[k].strip()
                       for k in ("title", "publisher"))):
            raise ValueError("invalid catalogue source provenance")
        sources.append(CatalogueSource(row["id"], row["url"], row["title"], row["publisher"],
                                       row["accessed"], row["kind"], _catalogue_text(row["scope"])))
    technologies = []
    for row in data["technologies"]:
        if row["group"] not in group_ids:
            raise ValueError("unknown catalogue group")
        links = []
        link_ids: set[str] = set()
        for link in row.get("dataLinks", []):
            if (not isinstance(link["id"], str) or not link["id"] or link["id"] in link_ids
                    or link["kind"] not in {"adoption", "measurement", "proxy", "scenario"}
                    or not isinstance(link["url"], str)
                    or not (link["url"].startswith("https://")
                            or re.fullmatch(r"/(?!/)[a-zA-Z0-9/_?=.#%-]+", link["url"]))):
                raise ValueError("invalid catalogue data link")
            link_ids.add(link["id"])
            links.append(CatalogueDataLink(link["id"], _catalogue_text(link["label"]),
                                          link["url"], link["kind"], _catalogue_text(link["scope"])))
        technologies.append(CatalogueTechnology(
            row["id"], row["group"], *(_catalogue_text(row[key]) for key in (
                "name", "summary", "physicalProfile", "historyGap", "bermRelevance", "seasonality")),
            _catalogue_refs(row["sourceIds"], source_ids, required=False), tuple(links)))
    events = []
    region_names: dict[str, CatalogueText] = {}
    previous_year = 0
    for row in data["events"]:
        start, end = row["startYear"], row.get("endYear")
        for year in (start, end if end is not None else start):
            if isinstance(year, bool) or not isinstance(year, int) or not 1000 <= year <= updated.year:
                raise ValueError("catalogue event requires a historical integer year")
        if (end is not None and end < start) or start < previous_year:
            raise ValueError("catalogue event year order is invalid")
        previous_year = start
        region = row["region"]
        _catalogue_ids([region], "region")
        region_name = _catalogue_text(region["name"])
        if region["id"] in region_names and region_names[region["id"]] != region_name:
            raise ValueError("inconsistent catalogue region name")
        region_names[region["id"]] = region_name
        if row["kind"] not in {"launch", "deployment", "measurement", "shutdown", "standard"}:
            raise ValueError("invalid catalogue event kind")
        quantities = []
        for quantity in row.get("values", []):
            value, unit = quantity["value"], quantity["unit"]
            if (isinstance(value, bool) or not isinstance(value, (int, float))
                    or not math.isfinite(value)):
                raise ValueError("catalogue quantity must be finite")
            if not isinstance(unit, str) or not unit.strip():
                raise ValueError("catalogue quantity requires an explicit unit")
            if unit in {"%", "percent"} and not 0 <= value <= 100:
                raise ValueError("catalogue percentage must be in 0–100")
            quantities.append(CatalogueQuantity(value, unit, _catalogue_text(quantity["denominator"]),
                                                _catalogue_text(quantity["label"])))
        events.append(CatalogueEvent(
            row["id"], _catalogue_refs(row["technologyIds"], technology_ids),
            CatalogueRegion(region["id"], region_name), start, end, row["kind"],
            _catalogue_text(row["title"]), _catalogue_text(row["description"]),
            _catalogue_refs(row["sourceIds"], source_ids),
            _catalogue_text(row["location"]) if "location" in row else None, tuple(quantities)))
    return TechnologyCatalogue(1, data["updatedAt"], boundaries, groups, tuple(sources),
                               tuple(technologies), tuple(events))


def load_catalogue(path: Path | str = DEFAULT_CATALOGUE_PATH) -> TechnologyCatalogue:
    """Read the same canonical source/event catalogue used by the website.

    This exposes historical observations and their stated boundaries; neither
    technology association nor event quantity implies a physical or tissue dose.
    """
    data = json.loads(Path(path).read_text(encoding="utf-8"))
    if not isinstance(data, dict):
        raise ValueError("catalogue must be a JSON object")
    try:
        return _read_catalogue(data)
    except (KeyError, TypeError) as exc:
        raise ValueError(f"invalid catalogue structure: {exc}") from exc
