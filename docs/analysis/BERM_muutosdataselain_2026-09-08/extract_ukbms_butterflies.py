#!/usr/bin/env python3
"""Reproduce the UKBMS prototype subset from the retained, checksum-verified CSV.

Run without arguments to check the existing JSON; --write regenerates it.
--download refreshes the retained CSV only after verifying the expected SHA-256.
The source ZIP is dynamically packaged, so its historical digest is descriptive;
the CSV digest is the reproducibility check. No app data or code is changed.
"""
from __future__ import annotations

import argparse
import copy
import csv
import hashlib
import io
import json
from pathlib import Path
import subprocess
import zipfile

BASE = Path(__file__).resolve().parent
SOURCE_PATH = BASE / "source" / "ukbmscollatedindices2024.csv"
OUTPUT_PATH = BASE / "ukbms_butterflies_1976_2024.json"
METADATA = {'id': 'ukbms-uk-two-butterflies-1976-2024',
 'retrievedAt': '2026-09-08',
 'source': {'title': 'United Kingdom Butterfly Monitoring Scheme: collated indices 2024',
            'doi': '10.5285/a70d8b0b-0ef5-484e-8195-42bcfd818229',
            'url': 'https://catalogue.ceh.ac.uk/id/a70d8b0b-0ef5-484e-8195-42bcfd818229',
            'downloadUrl': 'https://data-package.ceh.ac.uk/data/a70d8b0b-0ef5-484e-8195-42bcfd818229.zip',
            'archiveMember': 'data/ukbmscollatedindices2024.csv',
            'archiveSha256': '5c27b79ff6c28638d61b41d15639a456bd57399bc93416f6b3dbefa2731ef075',
            'csvSha256': 'a0c2bdfa5e4129a67523b18d607a8d35e6d7770837902144e47aeda5172a0af1',
            'documentationMember': 'supporting-documents/ukbms_collated_indices_2024.docx',
            'exactLocator': 'CSV rows selected by COUNTRY=UK and SPECIES_CODE in {84,2}; row '
                            'numbers below are 1-based and include the header',
            'citation': 'Botham, M.S.; Middlebrook, I.; Heywood, J.; Harrower, C.A.; Milborrow, '
                        'J.; Roy, D.B. (2025). United Kingdom Butterfly Monitoring Scheme: '
                        'collated indices 2024. NERC EDS Environmental Information Data Centre. '
                        'https://doi.org/10.5285/a70d8b0b-0ef5-484e-8195-42bcfd818229',
            'license': 'Open Government Licence with UKBMS attribution',
            'attribution': 'Contains UK Butterfly Monitoring Scheme (UKBMS) data © copyright and '
                           'database right Butterfly Conservation, the UK Centre for Ecology & '
                           'Hydrology, British Trust for Ornithology, and the Joint Nature '
                           'Conservation Committee.'},
 'geography': {'countryCode': 'GBR',
               'sourceLabel': 'UK',
               'scope': 'United Kingdom, national collated index; not a fixed local population'},
 'metric': {'name': 'Species-specific annual collated abundance index',
            'unit': 'log10 collated index',
            'sourceColumn': 'COLLATED_INDEX',
            'indexBase': {'type': 'whole-series log10 centring',
                          'meanLog10Index': 2,
                          'description': 'Source series is centred so its mean log10 index is 2; '
                                         'no fixed reference year of 100.'},
            'observationType': 'Published model-derived annual estimate from butterfly monitoring '
                               'counts; not a direct census',
            'uncertainty': 'No standard errors or confidence interval columns are provided in this '
                           'CSV. Null does not mean zero uncertainty.',
            'effort': 'N_SITES is the annual count of contributing sites, not individuals or '
                      'visits. The monitoring sample changes over time.'},
 'displayTransform': {'name': 'Relative abundance, 1976 = 100',
                      'formula': '100 * 10 ** (value_t - value_1976)',
                      'baselineYear': 1976,
                      'isDerived': True,
                      'interpretation': 'Within-species relative abundance. Do not divide the '
                                        'log10 values or call this a species-loss or '
                                        'reproductive-decline percentage. Derived numbers are '
                                        'rounded to 6 decimals and source values are retained.',
                      'yearOnYearPercentFormula': '100 * (10 ** (value_t - value_previous_year) - '
                                                  '1), only for consecutive years'},
 'selectionNote': 'Two named butterfly species provide a compact browser demonstration with '
                  'contrasting histories. This subset is not an aggregate UK butterfly indicator '
                  'and was not selected by a technology-association statistic.',
 'series': []}


def verify_csv(raw: bytes) -> None:
    actual = hashlib.sha256(raw).hexdigest()
    expected = METADATA["source"]["csvSha256"]
    if actual != expected:
        raise ValueError(f"Source CSV differs from the audited edition: {actual} != {expected}")


def extract(raw: bytes) -> dict:
    verify_csv(raw)
    rows = list(csv.DictReader(io.StringIO(raw.decode("utf-8"))))
    result = copy.deepcopy(METADATA)
    for code, finnish in [("84", "neitoperhonen"), ("2", "nokkosperhonen")]:
        selected = [(i + 2, r) for i, r in enumerate(rows)
                    if r["COUNTRY"] == "UK" and r["SPECIES_CODE"] == code]
        if [int(r["YEAR"]) for _, r in selected] != list(range(1976, 2025)):
            raise ValueError(f"Unexpected annual coverage for species {code}")
        baseline = float(selected[0][1]["COLLATED_INDEX"])
        points = []
        for source_row, row in selected:
            value = float(row["COLLATED_INDEX"])
            points.append({
                "year": int(row["YEAR"]), "value": value,
                "lower": None, "upper": None,
                "nSites": int(row["N_SITES"]),
                "relativeIndex1976": round(100 * 10 ** (value - baseline), 6),
                "sourceCsvRow": source_row,
            })
        result["series"].append({
            "id": "ukbms-uk-" + code, "speciesCode": code,
            "speciesScientific": selected[0][1]["SPECIES"],
            "speciesEnglish": selected[0][1]["COMMON_NAME"],
            "speciesFinnish": finnish,
            "taxonomicScope": "single butterfly species",
            "yearStart": 1976, "yearEnd": 2024, "points": points,
        })
    return result


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--write", action="store_true", help="Regenerate the prototype JSON")
    parser.add_argument("--download", action="store_true", help="Download and verify the source CSV")
    args = parser.parse_args()
    if args.download:
        archive = subprocess.check_output([
            "curl", "--fail", "--location", "--silent", "--show-error",
            METADATA["source"]["downloadUrl"],
        ])
        with zipfile.ZipFile(io.BytesIO(archive)) as package:
            raw = package.read(METADATA["source"]["archiveMember"])
        verify_csv(raw)
        SOURCE_PATH.parent.mkdir(parents=True, exist_ok=True)
        SOURCE_PATH.write_bytes(raw)
    result = extract(SOURCE_PATH.read_bytes())
    if args.write:
        OUTPUT_PATH.write_text(json.dumps(result, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
        print(f"Regenerated {OUTPUT_PATH.name}: 98 annual points.")
    else:
        existing = json.loads(OUTPUT_PATH.read_text(encoding="utf-8"))
        if result != existing:
            raise ValueError("Stored JSON does not match the source extraction")
        print("Verified source SHA-256 and all 98 annual values, site counts, row locators and transforms.")


if __name__ == "__main__":
    main()
