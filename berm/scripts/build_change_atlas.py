#!/usr/bin/env python3
"""Build the bounded change atlas from held primary sources; no network or imputation.

Run with --check for byte-identical verification. WPP raw files are hydrated by
the existing WPP acquisition; the output never includes its projection years.
"""

from __future__ import annotations

import argparse
import csv
import gzip
import hashlib
from html.parser import HTMLParser
import json
from pathlib import Path
import re

ROOT = Path(__file__).resolve().parents[2]
DATA = ROOT / "berm/data"
AUDIT = ROOT / "docs/analysis/BERM_muutosdataselain_2026-09-08"
OUTPUT = ROOT / "website/data/change-atlas.json"
COUNTRIES = [("FIN", "Suomi", "Finland"), ("USA", "Yhdysvallat", "United States"),
             ("GBR", "Yhdistynyt kuningaskunta", "United Kingdom"), ("DEU", "Saksa", "Germany"),
             ("JPN", "Japani", "Japan")]
COUNTRY_IDS = {country[0] for country in COUNTRIES}
AGES = ("15-19", "20-24", "25-29", "30-34", "35-39", "40-44", "45-49")


def text(fi: str, en: str) -> dict:
    return {"fi": fi, "en": en}


def read_json(path: Path) -> dict:
    return json.loads(path.read_text(encoding="utf-8"))


def artifact(path: Path, expected: str | None = None) -> dict:
    payload = path.read_bytes()
    digest = hashlib.sha256(payload).hexdigest()
    if expected and digest != expected:
        raise ValueError(f"Source checksum mismatch: {path}")
    return {"path": str(path.relative_to(ROOT)), "sha256": digest, "bytes": len(payload)}


def point(year: int | float, value: float, source_id: str, locator: str, **extra) -> dict:
    return {"year": year, "value": value, "lower": None, "upper": None,
            "sourceId": source_id, "sourceLocator": locator, "imputed": False, **extra}


def series(sid: str, country: str, family: str, metric: str, title: dict, unit: str,
           unit_label: dict, population: dict, source_id: str, method: dict,
           limitations: list[dict], points: list[dict], **extra) -> dict:
    return {"id": sid, "countryId": country, "datasetFamily": family, "metric": metric,
            "title": title, "unit": unit, "unitLabel": unit_label, "status": "estimate",
            "frequency": "annual", "valueScale": "linear", "population": population,
            "sourceIds": [source_id], "method": method, "limitations": limitations,
            "points": sorted(points, key=lambda p: p["year"]), **extra}


def wpp_data() -> tuple[list[dict], list[dict]]:
    manifest_path = DATA / "raw/manifests/wpp2024_2026-08-19.manifest.json"
    manifest = read_json(manifest_path)
    files = {f["source_id"]: f for f in manifest["files"]}
    sources, output = [], []
    source_ids = {"tfr": "wpp2024-tfr", "asfr": "wpp2024-asfr"}
    for metric, original_id in [("tfr", "UN_WPP_2024_TFR"), ("asfr", "UN_WPP_2024_ASFR")]:
        record = files[original_id]
        raw_path = DATA / record["path"]
        sid = source_ids[metric]
        sources.append({
            "id": sid, "title": f"UN World Population Prospects 2024 — {metric.upper()}",
            "url": "https://population.un.org/wpp/", "license": manifest["license"],
            "retrievedAt": record["retrieved_at"],
            "scope": text("UN:n historialliset väestöarviot 1950–2023; tulevaisuusprojektiot on rajattu pois.",
                          "Published UN population estimates for 1950–2023; projections are excluded."),
            "artifacts": [artifact(raw_path, record["sha256"]), artifact(manifest_path)],
        })
        values: dict[tuple[str, str], list[dict]] = {}
        with gzip.open(raw_path, "rt", encoding="utf-8-sig", newline="") as handle:
            for row_number, row in enumerate(csv.DictReader(handle), 2):
                country = row.get("ISO3_code")
                if country not in COUNTRY_IDS or row.get("LocTypeName") != "Country/Area":
                    continue
                year = int(row["Time"])
                if not 1950 <= year <= 2023 or row["Variant"] != "Medium":
                    continue
                age = row["AgeGrp"] if metric == "asfr" else "all"
                if metric == "asfr" and age not in AGES:
                    continue
                value = row[metric.upper()]
                if value in ("", "NA"):
                    continue
                values.setdefault((country, age), []).append(point(
                    year, float(value), sid,
                    f"{raw_path.name}; CSV row {row_number}; ISO3={country}; Time={year}; "
                    f"Variant=Medium; " + (f"AgeGrp={age}; ASFR" if metric == "asfr" else "TFR")))
        for country, _, _ in COUNTRIES:
            for age in AGES if metric == "asfr" else ("all",):
                points = values[(country, age)]
                if sorted(p["year"] for p in points) != list(range(1950, 2024)):
                    raise ValueError(f"Unexpected WPP history coverage: {country}/{metric}/{age}")
                if metric == "tfr":
                    title = text("Kokonaishedelmällisyysluku", "Total fertility rate")
                    unit, label = "births_per_woman", text("lasta / nainen", "births / woman")
                    population = text("Periodinen synteettinen hedelmällisyysluku; ei yhden kohortin lopullinen lapsiluku.",
                                      "Period synthetic fertility rate, not a birth cohort's completed family size.")
                    extra = {}
                else:
                    title = text(f"Ikäryhmän {age} hedelmällisyys", f"Fertility at ages {age}")
                    unit, label = "births_per_1000_women", text("syntymää / 1 000 naista", "births / 1,000 women")
                    population = text(f"Ikäryhmän {age} naiset samassa maassa ja vuodessa.",
                                      f"Women aged {age} in the same country and year.")
                    extra = {"ageGroup": age}
                output.append(series(
                    f"{country.lower()}-{metric}" + (f"-{age}" if metric == "asfr" else ""),
                    country, "fertility", metric, title, unit, label, population, sid,
                    text("Suora poiminta WPP2024-julkaisusta; julkaistut estimaatit, ei BERM-sovitus.",
                         "Direct WPP2024 extraction; published estimates, not a BERM fit."),
                    [text("Aikasarja kuvaa väestöä. Yksittäinen arvo ei erottele hedelmällisyyden biologisia ja yhteiskunnallisia syitä.",
                          "A population series. A value alone does not distinguish biological and social causes of fertility.")],
                    points, **extra))
    return sources, output


def mobile_data() -> tuple[dict, list[dict]]:
    manifest_path = DATA / "raw/manifests/wb_global_2026-08-19.manifest.json"
    manifest = read_json(manifest_path)
    record = next(f for f in manifest["files"] if f["source_id"] == "WB_IT_CEL_SETS_P2")
    path = DATA / record["path"]
    source_id = "wb-itu-mobile-subscriptions"
    source = {
        "id": source_id, "title": "ITU / World Bank — Mobile cellular subscriptions (IT.CEL.SETS.P2)",
        "url": "https://data.worldbank.org/indicator/IT.CEL.SETS.P2", "license": manifest["license"],
        "retrievedAt": record["retrieved_at"],
        "scope": text("Liittymiä 100 asukasta kohti, ei käyttäjiä, lähettimiä tai RF-annosta. Luku voi ylittää 100.",
                      "Subscriptions per 100 people, not users, transmitters or RF dose. Values can exceed 100."),
        "artifacts": [artifact(path, record["sha256"]), artifact(manifest_path)],
    }
    values: dict[str, list[dict]] = {country: [] for country in COUNTRY_IDS}
    raw = read_json(path)
    if raw["indicator_code"] != "IT.CEL.SETS.P2":
        raise ValueError("Unexpected mobile indicator")
    for page_index, page in enumerate(raw["pages"], 1):
        for row_index, row in enumerate(page[1], 1):
            country, year = row["countryiso3code"], int(row["date"])
            if country not in COUNTRY_IDS or not 1950 <= year <= 2023 or row["value"] is None:
                continue
            values[country].append(point(year, row["value"], source_id,
                f"mobile_per_100.json; page {page_index}; record {row_index}; {country}; {year}; IT.CEL.SETS.P2"))
    output = [series(
        f"{country.lower()}-mobile-subscriptions", country, "technology", "mobile_subscriptions",
        text("Matkapuhelinliittymät", "Mobile subscriptions"), "subscriptions_per_100_people",
        text("liittymää / 100 asukasta", "subscriptions / 100 people"),
        text("Maan matkapuhelinliittymät suhteessa väestöön.", "Country subscriptions divided by its population."),
        source_id, text("Lähteen raportoidut vuosiarvot; puuttuvia arvoja ei täytetä.",
                        "Annual source-reported values; missing values are not filled."),
        [source["scope"], text("Liittymämäärä ei erittele verkkosukupolvia, liikennemäärää, lähetystehoa tai käyttöaikaa.",
                               "Counts do not resolve network generations, traffic, transmit power or use time.")],
        values[country], status="reported") for country, _, _ in COUNTRIES]
    return source, output


class TableRows(HTMLParser):
    def __init__(self):
        super().__init__()
        self.rows, self.row, self.cell = [], [], None

    def handle_starttag(self, tag, attrs):
        if tag == "tr":
            self.row = []
        if tag in ("td", "th"):
            self.cell = []

    def handle_data(self, value):
        if self.cell is not None:
            self.cell.append(value)

    def handle_endtag(self, tag):
        if tag in ("td", "th") and self.cell is not None:
            self.row.append(" ".join("".join(self.cell).split()))
            self.cell = None
        if tag == "tr":
            self.rows.append(self.row)


def diabetes_data() -> tuple[dict, list[dict]]:
    verified_path = AUDIT / "verified_us_diabetes_series.json"
    verified = read_json(verified_path)
    original = verified["sources"][0]
    html_path = AUDIT / original["rawPath"]
    source = {"id": original["id"], "title": original["title"], "url": original["url"],
              "license": original["license"], "retrievedAt": original["retrievedAt"],
              "scope": text("NHANES-otosarviot, vähintään 20-vuotiaat; ikävakiointi USA:n vuoden 2000 väestöön.",
                            "NHANES survey estimates, adults 20+; age-standardized to the 2000 US population."),
              "artifacts": [artifact(html_path, original["sha256"]), artifact(verified_path)]}
    parser = TableRows()
    parser.feed(html_path.read_text())
    rows = [r for r in parser.rows if len(r) == 8 and re.search(r"(?:19|20)\d{2}–", r[0])]
    if len(rows) != 11:
        raise ValueError("Unexpected CDC Table 5 coverage")
    output = []
    for original_series, column in zip(verified["series"], (2, 4)):
        points = []
        for row, checked in zip(rows, original_series["points"]):
            years = [int(x) for x in re.findall(r"(?:19|20)\d{2}", row[0])]
            value, lower, upper = map(float, re.findall(r"\d+\.\d+", row[column]))
            n, se = int(row[1].replace(",", "")), float(row[column + 1])
            if ([value, lower, upper, n, se] != [checked[k] for k in (
                    "value", "lower", "upper", "n", "standardError")]
                    or years != [checked["startYear"], checked["endYear"]]):
                raise ValueError("CDC verified point differs from original HTML")
            period = checked["period"]
            fi = period.replace("March", "maaliskuu").replace("August", "elokuu")
            points.append(point((years[0] + years[1]) / 2, value, source["id"],
                f"Table 5; {row[0]}; " + ("total diabetes" if column == 2 else "diagnosed diabetes"),
                lower=lower, upper=upper, n=n, standardError=se,
                startYear=years[0], endYear=years[1], period=text(fi, period)))
        output.append(series(
            original_series["id"].replace("_", "-"), "USA", "health", "diabetes_prevalence",
            original_series["label"], "percent", text("% aikuisista", "% of adults"),
            original_series["population"], source["id"], original_series["standardization"],
            original_series["limitations"], points, frequency="survey_period"))
    return source, output


def butterfly_data() -> tuple[dict, list[dict]]:
    path = AUDIT / "ukbms_butterflies_1976_2024.json"
    verified = read_json(path)
    original = verified["source"]
    csv_path = AUDIT / "source/ukbmscollatedindices2024.csv"
    source = {"id": "ukbms-collated-2024", "title": original["title"], "url": original["url"],
              "license": original["license"], "attribution": original["attribution"],
              "retrievedAt": verified["retrievedAt"],
              "scope": text("Kaksi UK:n lajikohtaista seurantamallin vuosiarviota; eivät kaikkien perhosten yhteisindeksi.",
                            "Two UK species-specific monitoring model estimates, not an all-butterfly index."),
              "artifacts": [artifact(csv_path, original["csvSha256"]), artifact(path)]}
    with csv_path.open(newline="") as handle:
        rows = list(csv.DictReader(handle))
    output = []
    for original_series in verified["series"]:
        points = []
        for checked in original_series["points"]:
            row = rows[checked["sourceCsvRow"] - 2]
            if (row["COUNTRY"] != "UK" or row["SPECIES_CODE"] != original_series["speciesCode"]
                    or int(row["YEAR"]) != checked["year"]
                    or float(row["COLLATED_INDEX"]) != checked["value"]
                    or int(row["N_SITES"]) != checked["nSites"]):
                raise ValueError("UKBMS verified point differs from original CSV")
            points.append(point(checked["year"], checked["value"], source["id"],
                f"ukbmscollatedindices2024.csv; row {checked['sourceCsvRow']}; COUNTRY=UK; "
                f"SPECIES_CODE={original_series['speciesCode']}", nSites=checked["nSites"]))
        if len(points) != 49:
            raise ValueError("UKBMS must retain all 49 source years")
        output.append(series(
            original_series["id"], "GBR", "ecology", "butterfly_abundance",
            text(original_series["speciesFinnish"].capitalize(), original_series["speciesEnglish"]),
            "log10_index", text("log₁₀-runsausindeksi", "log₁₀ abundance index"),
            text("UKBMS:n UK-kooste, vuosittain vaihtuva seurantapaikkojen joukko.",
                 "UKBMS UK collation; the set of contributing sites changes by year."),
            source["id"], text("Julkaistu log10-indeksi. Suhteellinen muutos lasketaan 10-potenssin kautta.",
                               "Published log10 index. Relative change uses exponentiation by 10."),
            [source["scope"], text("N tarkoittaa seurantapaikkoja. Lähde-CSV ei sisällä luottamusvälejä.",
                                   "N denotes contributing sites. The source CSV supplies no confidence intervals.")],
            points, valueScale="log10", species={"scientific": original_series["speciesScientific"],
                "fi": original_series["speciesFinnish"], "en": original_series["speciesEnglish"]}))
    return source, output


def testosterone_data() -> tuple[dict, list[dict]]:
    path = AUDIT / "source/nyante2012_table2_testosterone.json"
    extracted = read_json(path)
    row = extracted["row"]
    if (row != ["Testosterone (ng/ml)", "5.37", "5.20, 5.53", "5.34", "5.16, 5.52", "−0.03", "0.75"]
            or extracted["periods"] != [[1988, 1991], [1999, 2004]]
            or extracted["sampleSizes"] != [1413, 902]):
        raise ValueError("Review changed Nyante Table 2 extraction before importing")
    source = {
        "id": "nyante2012-nhanes-table2", "title": "Nyante et al. (2012) — NHANES testosterone, Table 2",
        "url": extracted["publisherUrl"],
        "license": "Published numerical facts with attribution; no open licence asserted for article text",
        "retrievedAt": extracted["retrievedAt"], "artifacts": [artifact(path)],
        "scope": text("Kaksi julkaistua otospainotettua ja monimuuttujavakioitua keskiarvoa; ei vuosittaista raakaa hormonitrendiä.",
                      "Two published survey-weighted, multivariable-adjusted means, not an annual unadjusted hormone trend."),
    }
    points = []
    for index, (start, end) in enumerate(extracted["periods"]):
        lower, upper = map(float, row[2 + index * 2].split(", "))
        points.append(point((start + end) / 2, float(row[1 + index * 2]), source["id"],
            f"Table 2; total testosterone; {start}–{end}; fully adjusted arithmetic mean; n from Table 1",
            lower=lower, upper=upper, n=extracted["sampleSizes"][index], startYear=start, endYear=end,
            period=text(f"{start}–{end}", f"{start}–{end}")))
    return source, [series(
        "us-nhanes-testosterone-fully-adjusted", "USA", "hormone", "testosterone_total",
        text("Kokonaistestosteroni, laajasti vakioitu NHANES", "Total testosterone, fully adjusted NHANES"),
        "ng_per_ml", text("ng/ml", "ng/mL"),
        text("NHANES: vähintään 20-vuotiaat aamuverinäytteen antaneet ei-latinalaisamerikkalaiset valkoiset ja mustat sekä meksikolaisamerikkalaiset miehet.",
             "NHANES morning-examination men aged 20+, non-Hispanic white, non-Hispanic black or Mexican-American."),
        source["id"],
        text("Julkaisun otospainotettu aritmeettinen keskiarvo, vakioitu iän, etnisyysryhmän, BMI:n, vyötärön, tupakoinnin ja alkoholin suhteen. Sama laboratorio ja Elecsys 2010 -menetelmä; 95 %:n luottamusväli.",
             "Published survey-weighted arithmetic mean adjusted for age, race/ethnicity, BMI, waist, smoking and alcohol. Same laboratory and Elecsys 2010 assay; 95% confidence interval."),
        [source["scope"],
         text("Vakiointi muuttaa kysymystä. Pelkän iän ja etnisyysryhmän huomioiva analyysi ilmoitti laskun; sen lisätaulukon tarkkoja lukuja ei ole tässä varmennettu.",
              "Adjustment changes the question. The age/race-only analysis reported a decline; its supplementary numerical estimates have not been verified here."),
         text("Kaksi toistettua väestöotosta. Kokonaistestosteroni ei mittaa suoraan kudoksen androgeenikapasiteettia, reseptoritilaa tai EMF-vaikutusta.",
              "Two repeated population samples. Total testosterone does not directly measure tissue androgen capacity, receptor state or an EMF effect.")],
        points, frequency="survey_period")]


def build() -> dict:
    sources, output = wpp_data()
    for source, records in (mobile_data(), diabetes_data(), butterfly_data(), testosterone_data()):
        sources.append(source)
        output.extend(records)
    return {
        "schemaVersion": 1, "updatedAt": "2026-09-08",
        "defaultRange": {"startYear": 1950, "endYear": 2023},
        "countries": [{"id": code, "name": text(fi, en)} for code, fi, en in COUNTRIES],
        "sources": sources, "series": output,
        "gaps": [{
            "countryIds": [code for code, _, _ in COUNTRIES], "datasetFamily": "hormone",
            "title": text("Testosteronin pitkäaikainen havaintokattavuus", "Long-term observed testosterone coverage"),
            "detail": text("USA:sta mukana kaksi tutkimuksen laajasti vakioitua NHANES-jaksoa. Kattava kansallinen hormonihistoria, vähemmän vakioitu rinnakkaissarja ja muiden maiden vastaavat aineistot puuttuvat. Vanhoja interpoloituja käyriä ei tuoda havaintoina.",
                           "The US has two published fully adjusted NHANES periods. A comprehensive national hormone history, a minimally adjusted companion series and equivalent other-country data are missing. Legacy interpolated curves are not imported as observations."),
        }, {
            "countryIds": ["FIN", "GBR", "DEU", "JPN"], "datasetFamily": "health",
            "title": text("Muiden maiden sairaussarjat", "Disease series for the other countries"),
            "detail": text("Tarvitaan vertailukelpoiset sairausmääritelmät, ikävakiointi, alkuperäinen taulukko ja epävarmuusrajat.",
                           "Comparable disease definitions, age standardization, original source tables and uncertainty are required."),
        }, {
            "countryIds": ["FIN", "USA", "DEU", "JPN"], "datasetFamily": "ecology",
            "title": text("Alueen ekologiset seurantasarjat", "Regional ecological monitoring series"),
            "detail": text("UK:n perhosindeksejä ei siirretä muiden maiden havainnoiksi. Paikalliset seurantaverkot tuodaan omilla peittotiedoillaan.",
                           "UK butterfly indices are not transferred to other countries. Local networks require their own coverage metadata."),
        }],
    }


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--check", action="store_true")
    args = parser.parse_args()
    data = build()
    payload = (json.dumps(data, ensure_ascii=False, indent=2) + "\n").encode()
    if args.check:
        if not OUTPUT.exists() or OUTPUT.read_bytes() != payload:
            raise SystemExit("Change atlas differs from the held source extraction; rebuild after review")
    else:
        OUTPUT.write_bytes(payload)
    print(f"{'Verified' if args.check else 'Built'} {len(data['series'])} series / "
          f"{sum(len(s['points']) for s in data['series'])} points / {len(data['sources'])} sources")


if __name__ == "__main__":
    main()
