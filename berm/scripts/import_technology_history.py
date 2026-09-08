#!/usr/bin/env python3
"""Reproduce the bounded adoption release offline, or acquire a new release.

Default: verify every held source byte and rebuild the public JSON. ``--check``
compares without writing. ``refresh`` requires a new directory and does not
overwrite the held release or the website output. PDF acquisition uses Poppler's
pdftotext; offline builds need only Python's standard library and held text.
"""

from __future__ import annotations

import argparse
from datetime import date
import hashlib
from html.parser import HTMLParser
import json
from pathlib import Path
import re
import shutil
import ssl
import subprocess
import sys
import tempfile
from typing import Any
import urllib.request

ROOT = Path(__file__).resolve().parents[2]
sys.path.insert(0, str(ROOT / "berm"))
from berm.data.technology_history import DEFAULT_PATH, validate_history  # noqa: E402

DEFAULT_RELEASE = ROOT / "berm/data/raw/technology_history_2026-09-08"


def canonical_bytes(value: Any) -> bytes:
    return (json.dumps(value, ensure_ascii=False, indent=2) + "\n").encode("utf-8")


def normalize(text: str) -> str:
    return " ".join(text.replace("\u00ad", "").split())


class TextParser(HTMLParser):
    def __init__(self) -> None:
        super().__init__(convert_charrefs=True)
        self.parts: list[str] = []
        self.ignored = 0

    def handle_starttag(self, tag: str, attrs: list) -> None:
        if tag in {"script", "style"}:
            self.ignored += 1

    def handle_endtag(self, tag: str) -> None:
        if tag in {"script", "style"} and self.ignored:
            self.ignored -= 1

    def handle_data(self, data: str) -> None:
        if not self.ignored:
            self.parts.append(data)


class TableParser(HTMLParser):
    def __init__(self) -> None:
        super().__init__(convert_charrefs=True)
        self.rows: list[list[str]] = []
        self.row: list[str] | None = None
        self.cell: list[str] | None = None

    def handle_starttag(self, tag: str, attrs: list) -> None:
        if tag == "tr":
            self.row = []
        elif tag in {"td", "th"}:
            self.cell = []

    def handle_endtag(self, tag: str) -> None:
        if tag in {"td", "th"} and self.cell is not None:
            if self.row is not None:
                self.row.append(normalize("".join(self.cell)))
            self.cell = None
        elif tag == "tr" and self.row is not None:
            self.rows.append(self.row)
            self.row = None

    def handle_data(self, data: str) -> None:
        if self.cell is not None:
            self.cell.append(data)


def parse_eia(html: str) -> dict[str, dict[int, list[int]]]:
    """Read all 40 source rows and verify both axes of the original table."""
    parser = TableParser()
    parser.feed(html)
    categories = {
        "Automated Meter Reading (AMR)": "amr",
        "Advanced Metering Infrastructure (AMI)": "ami",
        "Standard (non-AMR/AMI) Meters": "standard",
        "Total Number of Meters": "total",
    }
    groups: dict[str, dict[int, list[int]]] = {v: {} for v in categories.values()}
    group = None
    header_seen = False
    for row in parser.rows:
        if row == ["Year", "Residential", "Commercial", "Industrial", "Transportation", "Total"]:
            header_seen = True
        if len(row) == 1 and row[0] in categories:
            group = categories[row[0]]
        elif group and len(row) == 6 and re.fullmatch(r"\d{4}", row[0]):
            year = int(row[0])
            if year in groups[group]:
                raise ValueError(f"duplicate EIA {group} year {year}")
            if not all(re.fullmatch(r"\d{1,3}(,\d{3})*|\d+", v) for v in row[1:]):
                raise ValueError("invalid EIA count")
            values = [int(v.replace(",", "")) for v in row[1:]]
            if sum(values[:4]) != values[4]:
                raise ValueError(f"EIA sector sum mismatch: {group} {year}")
            groups[group][year] = values
    if not header_seen:
        raise ValueError("EIA table header changed")
    years = set(range(2015, 2025))
    if any(set(rows) != years for rows in groups.values()):
        raise ValueError("EIA release must contain exactly years 2015–2024 in all four groups")
    for year in years:
        for column in range(5):
            if sum(groups[g][year][column] for g in ("ami", "amr", "standard")) != groups["total"][year][column]:
                raise ValueError(f"EIA technology sum mismatch: {year} column {column}")
    return groups


def verified_files(release_dir: Path, manifest: dict) -> dict[str, bytes]:
    files = {}
    for source in manifest["sources"]:
        for entry in source["files"]:
            name = entry["name"]
            if Path(name).name != name:
                raise ValueError("source filename must be local to its release")
            raw = (release_dir / name).read_bytes()
            if len(raw) != entry["bytes"] or hashlib.sha256(raw).hexdigest() != entry["sha256"]:
                raise ValueError(f"source checksum mismatch: {name}")
            files[name] = raw
    return files


def source_text(source: dict, files: dict[str, bytes]) -> str:
    text = files[source["textFile"]].decode("utf-8")
    if source["textFile"].endswith(".html"):
        parser = TextParser()
        parser.feed(text)
        text = " ".join(parser.parts)
    return normalize(text)


def point(year: int, value: float, source_id: str, locator: str,
          *, estimate: bool = False, rounded: bool = False,
          as_of: str | None = None, denominator: dict | None = None) -> dict:
    return {
        "year": year, "asOf": as_of, "value": value, "denominator": denominator,
        "observationType": "reported_estimate" if estimate else "reported_count",
        "precision": "rounded" if rounded else "integer", "sourceId": source_id,
        "sourceLocator": locator, "imputed": False,
    }


def build_artifact(release_dir: Path = DEFAULT_RELEASE) -> dict:
    manifest = json.loads((release_dir / "manifest.json").read_text(encoding="utf-8"))
    files = verified_files(release_dir, manifest)
    source_by_id = {s["id"]: s for s in manifest["sources"]}
    catalogue = json.loads(files["catalogue.json"])
    series = catalogue["series"]
    eia = parse_eia(files["eia_metering.html"].decode("utf-8"))
    for item in series:
        if item["id"] in {"us_electricity_ami_meters", "us_electricity_amr_meters"}:
            group = "ami" if "_ami_" in item["id"] else "amr"
            item["points"] = [point(
                year, counts[4], "adoption_eia_metering_2024",
                f"Table 10.05; {group.upper()}; {year}; Total column",
                denominator={"value": eia["total"][year][4], "unit": "meters",
                             "population": {"en": "All electricity meters in the same EIA table and year",
                                            "fi": "Saman EIA-taulukon kaikki sähkömittarit kyseisenä vuonna"}},
            ) for year, counts in sorted(eia[group].items())]
        else:
            item["points"] = []
            for extraction in item.pop("extractions"):
                text = source_text(source_by_id[extraction["sourceId"]], files)
                matches = re.findall(extraction["pattern"], text)
                if len(matches) != 1:
                    raise ValueError(f"expected one source match: {item['id']} ({len(matches)})")
                value = float(matches[0].replace(",", ".")) * extraction["scale"]
                if value.is_integer():
                    value = int(value)
                item["points"].append(point(
                    extraction["year"], value, extraction["sourceId"], extraction["locator"],
                    estimate=extraction["estimate"], rounded=True, as_of=extraction["asOf"],
                ))
    public_sources = []
    for source in manifest["sources"]:
        if source["id"] == "curated_catalogue":
            continue
        raw = source["files"][0]
        public_sources.append({
            "id": source["id"], "title": source["title"], "url": source["url"],
            "publishedAt": source["publishedAt"], "retrievedAt": manifest["retrievedAt"],
            "referenceId": source.get("referenceId"),
            "rawPath": f"berm/data/raw/{manifest['releaseId']}/{raw['name']}",
            "sha256": raw["sha256"], "bytes": raw["bytes"],
            "readingLevel": source["readingLevel"],
        })
    result = {
        "schemaVersion": 1, "releaseId": manifest["releaseId"],
        "generatedFromManifest": f"berm/data/raw/{manifest['releaseId']}/manifest.json",
        "scope": "imported_technology_history", "exposureMapping": "not_calibrated",
        "interpolation": "none", "sources": public_sources,
        "series": series, "existingDatasets": catalogue["existingDatasets"],
        "dataGaps": catalogue["dataGaps"],
    }
    validate_history(result)
    return result


def refresh_release(destination: Path, retrieved_at: str, ca_file: str | None = None) -> None:
    """Acquire and validate new bytes; existing releases remain immutable."""
    if destination.exists():
        raise FileExistsError(f"release already exists: {destination}")
    if date.fromisoformat(retrieved_at).isoformat() != retrieved_at:
        raise ValueError("retrieval date must be YYYY-MM-DD")
    manifest = json.loads((DEFAULT_RELEASE / "manifest.json").read_text(encoding="utf-8"))
    manifest["releaseId"] = destination.name
    manifest["retrievedAt"] = retrieved_at
    context = ssl.create_default_context(cafile=ca_file)
    destination.parent.mkdir(parents=True, exist_ok=True)
    with tempfile.TemporaryDirectory(prefix=".technology-history-", dir=destination.parent) as temp:
        staging = Path(temp)
        for source in manifest["sources"]:
            raw_name = source["files"][0]["name"]
            if source["id"] == "curated_catalogue":
                shutil.copyfile(DEFAULT_RELEASE / raw_name, staging / raw_name)
            else:
                request = urllib.request.Request(source["downloadUrl"], headers={
                    "User-Agent": "BERM-technology-history-importer/1.0",
                })
                with urllib.request.urlopen(request, context=context, timeout=45) as response:
                    raw = response.read(15_000_001)
                if len(raw) > 15_000_000:
                    raise ValueError("source exceeds bounded release size")
                (staging / raw_name).write_bytes(raw)
                if raw_name.endswith(".pdf"):
                    subprocess.run(["pdftotext", "-layout", str(staging / raw_name),
                                    str(staging / source["textFile"])], check=True)
            for entry in source["files"]:
                raw = (staging / entry["name"]).read_bytes()
                entry.update(bytes=len(raw), sha256=hashlib.sha256(raw).hexdigest())
        (staging / "manifest.json").write_bytes(canonical_bytes(manifest))
        build_artifact(staging)
        staging.rename(destination)


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("command", nargs="?", default="build", choices=("build", "refresh"))
    parser.add_argument("--release-dir", type=Path, default=DEFAULT_RELEASE)
    parser.add_argument("--output", type=Path, default=DEFAULT_PATH)
    parser.add_argument("--check", action="store_true")
    parser.add_argument("--retrieved-at")
    parser.add_argument("--ca-file")
    args = parser.parse_args()
    if args.command == "refresh":
        if not args.retrieved_at or args.release_dir == DEFAULT_RELEASE:
            parser.error("refresh requires --retrieved-at YYYY-MM-DD and a new --release-dir")
        refresh_release(args.release_dir, args.retrieved_at, args.ca_file)
        print(f"Acquired {args.release_dir}; public output unchanged")
        return
    data = build_artifact(args.release_dir)
    output = canonical_bytes(data)
    if args.check:
        if not args.output.exists() or args.output.read_bytes() != output:
            raise SystemExit("technology-adoption.json differs from the verified source build")
    else:
        args.output.parent.mkdir(parents=True, exist_ok=True)
        args.output.write_bytes(output)
    count = sum(len(s["points"]) for s in data["series"])
    print(f"{'Verified' if args.check else 'Built'} {len(data['series'])} series / {count} points / {len(data['sources'])} sources")


if __name__ == "__main__":
    main()
