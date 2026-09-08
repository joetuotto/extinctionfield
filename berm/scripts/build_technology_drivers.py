#!/usr/bin/env python3
"""Offline technology-history import. No interpolation, field amplitude or endpoint fitting.

Run from any directory. --check compares the deterministic output without writing.
Primary table extracts and immutable downloads live in the documented analysis folder.
"""
from __future__ import annotations

import argparse
import hashlib
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
RAW = ROOT / "docs/analysis/BERM_muutosdataselain_2026-09-08/technology_drivers"
OUTPUT = ROOT / "website/data/technology-drivers.json"
EDITION = "2026-09-08"


def text(fi, en):
    return {"fi": fi, "en": en}


def artifact(path):
    path = Path(path)
    data = path.read_bytes()
    return {"path": str(path.relative_to(ROOT)), "sha256": hashlib.sha256(data).hexdigest(), "bytes": len(data)}


def build():
    adoption = json.loads((ROOT / "website/public/data/technology-adoption.json").read_text())
    reconstruction = json.loads((ROOT / "website/data/field-reconstruction.json").read_text())
    history = json.loads((ROOT / "website/data/technology-history.json").read_text())
    result = {"schemaVersion": 1, "edition": EDITION, "sources": [], "series": []}
    for source in adoption["sources"]:
        result["sources"].append({"id": source["id"], "title": source["title"], "url": source["url"], "license": "See original publisher terms; numerical source facts with attribution", "retrievedAt": source["retrievedAt"], "scope": text("Aiemmin tarkistettu teknologian omaksumisaineisto; alkuperäinen raakajulkaisu säilytetty.", "Previously checked technology adoption data; original raw publication retained."), "artifacts": [artifact(ROOT / source["rawPath"])]})
    for series in adoption["series"]:
        points = [{key: value for key, value in point.items() if key in {"year", "value", "sourceId", "sourceLocator", "imputed", "asOf", "denominator"} and value is not None} for point in series["points"]]
        out = {"id": series["id"], "countryId": {"WLD": "WORLD"}.get(series["geography"]["code"], series["geography"]["code"]), "familyId": "smart-metering" if series["technologyId"] == "smart-metering" else "power-conversion", "title": series["label"], "metric": series["id"].removeprefix("us_electricity_") if series["id"].startswith("us_electricity_") else series["id"], "unit": series["unit"], "unitLabel": {"meters": text("sähkömittaria", "electricity meters"), "percent": text("% sähkönkäyttöpaikoista", "% of electricity consumption sites"), "devices": text("ilmastointilaitetta", "air conditioners")}[series["unit"]], "scope": series["coverage"], "sourceIds": sorted({p["sourceId"] for p in points}), "points": points, "limitations": series["limitations"], "status": "estimate" if any(p["observationType"] == "reported_estimate" for p in series["points"]) else "reported"}
        if series["id"].startswith("us_electricity_"):
            out["driver"] = {"normalization": "ratio", "priority": 1 if "ami" in series["id"] else 2, "interpretation": text("Mittarityypin osuus saman vuoden kaikista sähkömittareista. Ajallinen omaksumisproksi; ei protokolla, lähetysteho tai paikallinen kenttä.", "Meter-type share of the same year's electricity meters. Temporal adoption proxy; not a protocol, transmitting power or local field.")}
        elif series["unit"] == "percent":
            out["driver"] = {"normalization": "percent", "priority": 1, "interpretation": text("Raportoitu prosenttiosuus jaettuna sadalla; yksittäinen havainto ei määritä käyttöönoton vuosikäyrää.", "Reported percentage divided by 100; one observation does not define an annual deployment trajectory.")}
        result["series"].append(out)

    wb_path = RAW / "worldbank_electricity.json"
    if wb_path.exists():
        source_id = "wdi-electricity-per-capita"
        result["sources"].append({"id": source_id, "title": "World Development Indicators: Electric power consumption (kWh per capita), EG.USE.ELEC.KH.PC", "url": "https://data.worldbank.org/indicator/EG.USE.ELEC.KH.PC", "license": "CC BY 4.0", "retrievedAt": EDITION, "publisher": "World Bank; underlying IEA energy statistics", "attribution": "World Bank, World Development Indicators; IEA Energy Statistics Data Browser", "scope": text("Kansallinen sähköntuotanto vähennettynä siirto-, jakelu- ja muuntohäviöillä sekä voimalaitosten omalla käytöllä, jaettuna väestöllä. Lähdeversio 13.7.2026.", "National power production less transmission, distribution and transformation losses and plant own use, divided by population. Source release 13 July 2026."), "artifacts": [artifact(wb_path), artifact(RAW / "worldbank_electricity_metadata.json")]})
        wb = json.loads(wb_path.read_text())
        for country in ["FIN", "USA", "GBR", "DEU", "JPN"]:
            points = sorted([{"year": int(row["date"]), "value": row["value"], "sourceId": source_id, "sourceLocator": f"WDI API v2, source 2, EG.USE.ELEC.KH.PC, {country}, {row['date']}; lastupdated={wb[0]['lastupdated']}", "imputed": False} for row in wb[1] if row["countryiso3code"] == country and row["value"] is not None and int(row["date"]) <= 2024], key=lambda row: row["year"])
            result["series"].append({"id": f"{country.lower()}_electricity_per_capita", "countryId": country, "familyId": "electric-grid", "title": text("Sähkönkulutus asukasta kohti", "Electric power consumption per person"), "metric": "electricity_consumption_per_capita", "unit": "kwh_per_capita", "unitLabel": text("kWh / asukas / vuosi", "kWh / person / year"), "scope": result["sources"][-1]["scope"], "sourceIds": [source_id], "points": points, "status": "reported", "limitations": [text("Kansallisen sähköjärjestelmän kuormitusproksi. Ei kotitalouden kulutus, paikallinen sähkö- tai magneettikenttä eikä biologinen annos.", "National electricity-system activity proxy. Not household consumption, local electric or magnetic field, or biological dose."), text("Nykyinen lähdeversio sisältää 1990–2024. Aikaisempia puuttuvia vuosia ei korvata nollilla.", "The current source release covers 1990–2024. Earlier missing years are not replaced with zero.")], "driver": {"normalization": "reference", "referenceValue": 10000, "referenceLabel": text("10 000 kWh / asukas / vuosi", "10,000 kWh / person / year"), "priority": 10, "interpretation": text("Yhteinen kiinteä yksiköttömäksi tekevä vertailuarvo kaikille maille; ei biologinen kynnys eikä kalibroitu kenttäamplitudi.", "Shared fixed dimensional reference for all countries; not a biological threshold or calibrated field amplitude.")}})

    # These snapshots already exist in the canonical source-history registry.
    # Start/end rollout intervals are not automatically observation dates.
    specs = [("us-electricity-1940", "usa_occupied_homes_electric_lighting", 1940), ("us-farm-access-1956", "usa_farms_electricity_access", 1956), ("gb-smart-2014", "gbr_cumulative_meter_installs_2014", 2014), ("jp-smart-2014-2021", "jpn_tepco_smart_meters_2021", 2021), ("gb-5g-coverage-2022", "gbr_ee_5g_coverage_2022", 2022)]
    for anchor_id, series_id, observed_year in specs:
        anchor = next(a for a in reconstruction["anchors"] if a["id"] == anchor_id)
        refs = []
        for ref in anchor["sourceRefs"]:
            namespace, original_id = ref.split(":", 1)
            source = next(s for s in (history if namespace == "history" else reconstruction)["sources"] if s["id"] == original_id)
            sid = "anchor-" + original_id
            if sid not in {s["id"] for s in result["sources"]}:
                result["sources"].append({"id": sid, "title": source["title"], "url": source["url"], "license": "See original publisher terms; source-linked numerical historical fact", "retrievedAt": source["accessed"], "publisher": source["publisher"], "scope": source["scope"], "artifacts": [artifact(ROOT / "website/data/field-reconstruction.json")], "attribution": "Previously verified canonical anchor; the artifact is the curated source-linked extraction, not an archived publisher page."})
            refs.append(sid)
        value = anchor["values"][0]
        is_percent = value["unit"] in {"%", "percent"}
        result["series"].append({"id": series_id, "countryId": anchor["countryIds"][0], "familyId": anchor["familyIds"][0], "title": value["label"], "metric": series_id, "unit": "percent" if is_percent else value["unit"], "unitLabel": text("% rajatusta perusjoukosta", "% of scoped population") if is_percent else text("sähkömittaria", "electricity meters"), "scope": value["denominator"], "sourceIds": refs, "points": [{"year": observed_year, "value": value["value"], "sourceId": refs[0], "sourceLocator": f"Canonical field-reconstruction anchor {anchor_id}; reported snapshot year {observed_year}, not rollout start year", "imputed": False}], "status": "estimate", "limitations": [anchor["scope"], text("Rajattu yksittäinen havainto; ei itsenäistä vuosittaista peittokäyrää eikä paikallista kenttämittausta.", "Scoped single observation; no independent annual coverage curve or local field measurement.")]})

    extracts = RAW / "primary_extract.json"
    if extracts.exists():
        extra = json.loads(extracts.read_text())
        result["sources"].extend(extra["sources"])
        result["series"].extend(extra["series"])
    result["sources"].sort(key=lambda row: row["id"])
    result["series"].sort(key=lambda row: (row["countryId"], row["familyId"], row["id"]))
    for collection in ["sources", "series"]:
        ids = [row["id"] for row in result[collection]]
        assert len(ids) == len(set(ids)), f"Duplicate {collection} ID"
    for series in result["series"]:
        years = [p["year"] for p in series["points"]]
        assert years and years == sorted(set(years))
        assert all(p["imputed"] is False for p in series["points"])
    return result


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--check", action="store_true")
    args = parser.parse_args()
    result = build()
    content = json.dumps(result, ensure_ascii=False, indent=2) + "\n"
    if args.check:
        if not OUTPUT.exists() or OUTPUT.read_text() != content:
            raise SystemExit("technology-drivers.json differs from offline source import")
    else:
        OUTPUT.write_text(content)
    print(f"{len(result['series'])} series, {sum(len(s['points']) for s in result['series'])} observations, {len(result['sources'])} sources")


if __name__ == "__main__":
    main()
