"""Reproduce the planning prototype's two series from held CDC Table 5 HTML."""

from hashlib import sha256
from html.parser import HTMLParser
import json
from pathlib import Path
import re


class Rows(HTMLParser):
    def __init__(self):
        super().__init__()
        self.rows, self.row, self.cell = [], [], None

    def handle_starttag(self, tag, attrs):
        if tag == "tr":
            self.row = []
        if tag in ("td", "th"):
            self.cell = []

    def handle_data(self, text):
        if self.cell is not None:
            self.cell.append(text)

    def handle_endtag(self, tag):
        if tag in ("td", "th") and self.cell is not None:
            self.row.append(" ".join("".join(self.cell).split()))
            self.cell = None
        if tag == "tr":
            self.rows.append(self.row)


root = Path(__file__).resolve().parent
raw = (root / "cdc_db516_source.html").read_bytes()
parser = Rows()
parser.feed(raw.decode())
rows = [row for row in parser.rows if len(row) == 8 and re.search(r"(?:19|20)\d{2}–", row[0])]
assert len(rows) == 11
source_id = "cdc_nhanes_db516_table5"
data = {
    "schemaVersion": 1, "createdAt": "2026-09-08",
    "scope": "verified_published_survey_estimates", "interpolation": "none",
    "sources": [{
        "id": source_id, "title": "Gwira, Fryar & Gu (2024), NCHS Data Brief 516, Table 5",
        "url": "https://www.cdc.gov/nchs/products/databriefs/db516.htm",
        "doi": "https://doi.org/10.15620/cdc/165794",
        "locator": "Data table for Figure 5 (Table 5)",
        "publishedAt": "2024-11", "retrievedAt": "2026-09-08",
        "rawPath": "cdc_db516_source.html", "sha256": sha256(raw).hexdigest(), "bytes": len(raw),
        "license": "Public domain; source citation requested by NCHS",
        "extraction": "Original HTML table parsed; all 11 survey periods retained",
    }], "series": [],
}
for suffix, fi, en, column in (
    ("total", "Diabetes yhteensä, ikävakioitu", "Total diabetes, age-standardized", 2),
    ("diagnosed", "Diagnosoitu diabetes, ikävakioitu", "Diagnosed diabetes, age-standardized", 4),
):
    points = []
    for row in rows:
        years = [int(year) for year in re.findall(r"(?:19|20)\d{2}", row[0])]
        value, lower, upper = [float(number) for number in re.findall(r"\d+\.\d+", row[column])]
        assert len(years) == 2 and lower <= value <= upper
        period = "2017–March 2020" if years == [2017, 2020] else row[0]
        points.append({
            "period": period, "startYear": years[0], "endYear": years[1],
            "value": value, "lower": lower, "upper": upper,
            "standardError": float(row[column + 1]), "n": int(row[1].replace(",", "")),
            "sourceId": source_id, "observationType": "survey_estimate", "imputed": False,
        })
    data["series"].append({
        "id": f"us_diabetes_{suffix}_age_standardized", "label": {"fi": fi, "en": en},
        "geography": {"code": "USA", "name": {"en": "United States", "fi": "Yhdysvallat"}},
        "unit": "percent", "metric": "prevalence", "frequency": "survey_period",
        "population": {
            "fi": "USA:n vähintään 20-vuotias siviiliväestö laitosten ulkopuolella; raskaana olevat suljettu pois",
            "en": "US civilian noninstitutionalized adults aged 20+; pregnant participants excluded",
        },
        "standardization": {
            "fi": "Suora ikävakiointi USA:n vuoden 2000 väestöön: 20–39, 40–59 ja 60+.",
            "en": "Direct age standardization to the 2000 US Census population: 20–39, 40–59 and 60+.",
        },
        "definition": (
            "Diagnosed diabetes plus previously undiagnosed diabetes detected by fasting glucose >=126 mg/dL or HbA1c >=6.5%."
            if suffix == "total" else "Self-report of a clinician diabetes diagnosis other than during pregnancy."
        ),
        "uncertainty": "Published 95% confidence intervals",
        "sampleSize": "Unweighted n; published estimates use fasting sample weights",
        "points": points,
        "limitations": [
            {"fi": "Jaksot kuvaavat vaihtuvia väestöotoksia, eivät samojen henkilöiden seurantaa.",
             "en": "Periods are repeated population cross-sections, not follow-up of the same people."},
            {"fi": "Paastoglukoosin menetelmämuutokset on korjattu lähteen regressioyhtälöillä.",
             "en": "Fasting glucose method changes were adjusted with source regression equations."},
            {"fi": "Vuosien 2017–2020 piste päättyy maaliskuuhun 2020. Jaksoa ei pureta vuosihavainnoiksi.",
             "en": "The 2017–2020 period ends in March 2020. Period estimates are not split into annual observations."},
            {"fi": "Kokonaisdiabetes sisältää diagnosoidun diabeteksen: sarjoja ei lasketa yhteen.",
             "en": "Total diabetes includes diagnosed diabetes: do not add the series."},
        ],
    })
assert data["series"][0]["points"][0]["value"] == 9.7
assert data["series"][0]["points"][-1]["value"] == 14.3
assert data["series"][1]["points"][-1]["value"] == 10.1
(root / "verified_us_diabetes_series.json").write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n")
print("Verified 2 series, 22 period estimates and all published confidence intervals")
