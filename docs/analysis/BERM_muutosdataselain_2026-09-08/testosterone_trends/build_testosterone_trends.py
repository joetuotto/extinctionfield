#!/usr/bin/env python3
"""Offline publication-table extraction. Never fit, interpolate or extrapolate T."""
import argparse
import hashlib
import json
from pathlib import Path

HERE = Path(__file__).resolve().parent
ROOT = HERE.parents[3]
OUTPUT = ROOT / "website/data/testosterone-trends.json"


def text(fi, en):
    return {"fi": fi, "en": en}


def eligible_survey_years(survey_years, birth_start, birth_end, age_group):
    """Completed age permits collection year minus birth year, or that minus one."""
    age_min, age_max = map(int, age_group.split("-"))
    return [year for year in survey_years if any(
        age_min <= year - birth - birthday_offset <= age_max
        for birth in range(birth_start, birth_end + 1) for birthday_offset in (0, 1))]


def source(raw, filename, title, scope):
    path = HERE / filename
    data = path.read_bytes()
    return {"id": raw["sourceId"], "title": title, "doi": raw["doi"], "url": raw["sourceUrl"],
            "readCopyUrl": raw["readCopyUrl"], "retrievedAt": raw["retrievedAt"],
            "sourceType": "primary_publication", "readingLevel": raw["readingLevel"], "scope": scope,
            **({"surveyYears": raw["surveyYears"]} if "surveyYears" in raw else {}),
            "license": "Published numerical facts with attribution; no open licence asserted for article text.",
            "artifacts": [{"path": str(path.relative_to(ROOT)), "bytes": len(data), "sha256": hashlib.sha256(data).hexdigest()}]}


def fin_point(raw, cell):
    if "birthCohortStart" in cell:
        years = eligible_survey_years(raw["surveyYears"], cell["birthCohortStart"], cell["birthCohortEnd"], cell["ageGroup"])
        if len(years) != 1:
            raise ValueError(f"Not a unique calendar-year mapping: {cell['id']}: {years}")
        basis = "unique-survey-age-cohort-intersection"
    else:
        years, basis = cell["collectionYears"], cell["collectionYearBasis"]
    result = {"year": (min(years) + max(years) + 1) // 2, "startYear": min(years), "endYear": max(years),
              "collectionYears": years, "collectionYearBasis": basis,
              "value": cell["value"], "lower": cell["lower"], "upper": cell["upper"], "n": cell["n"],
              "intervalKind": "percentile_5_95", "sourceId": raw["sourceId"], "sourceCellId": cell["id"],
              "sourceLocator": f"Table 1, p. 228; age {cell['ageGroup']}; cell {cell['id']}; median (5th–95th percentiles)", "imputed": False}
    for key in ("birthCohortStart", "birthCohortEnd"):
        if key in cell:
            result[key] = cell[key]
    return result


def build():
    fin = json.loads((HERE / "perheentupa2013_table1_facts.json").read_text())
    us = json.loads((HERE / "lokeshwar2021_table1_facts.json").read_text())
    cells = {c["id"]: c for c in fin["cells"]}
    fin_common = {
        "countryId": "FIN", "datasetFamily": "hormone", "metric": "testosterone_total", "unit": "nmol_per_l",
        "unitLabel": text("nmol/l", "nmol/L"), "status": "estimate", "frequency": "survey_period", "valueScale": "linear",
        "statistic": "median", "sourceIds": [fin["sourceId"]],
        "population": text("FINRISK-seeruminäytteiden suomalaiset miehet; erilliset poikkileikkausotokset, eivät samojen miesten seuranta.",
                           "Finnish men in FINRISK serum samples; separate cross-sectional samples, not repeated measurements of the same men."),
        "adjustment": text("Taulukon ikä- ja syntymäkohorttisolujen mediaanit; ei BMI-vakioituja mediaaneja. Paperin erillinen regressio huomioi iän ja BMI:n.",
                           "Age/birth-cohort cell medians, not BMI-adjusted medians. The paper's separate regression accounts for age and BMI."),
        "assay": text("DELFIA-fluoroimmunomääritys; näytteet analysoitiin samalla kaudella eri vuosien näytteet sekoittaen. Virka-ajan näytteet, vähintään 4 h paasto, säilytys −20 °C.",
                      "DELFIA fluoroimmunoassay; samples from different surveys mixed in contemporaneous assay runs. Office-hours sampling, at least 4 h fasting, storage at −20 °C."),
        "comparability": text("Sama julkaistu ikäluokka ja analyysimenetelmä; ikäjakauman, otoskoon, keräysajan ja säilytysajan erot säilyvät.",
                              "Same published age bin and assay; differences in age distribution, sample size, collection time and storage duration remain."),
        "limitations": [text("Välit ovat yksilöjakauman 5.–95. persentiilit, eivät mediaanin luottamusvälit.", "Intervals are the 5th–95th percentiles of the individual distribution, not confidence intervals for the median."),
                        text("Kohorttierot eivät yksin tunnista EMF-vaikutusta tai erota ikä-, periodi- ja kohorttimekanismeja.", "Cohort contrasts alone do not identify an EMF effect or separate age, period and cohort mechanisms.")],
    }
    older = {**fin_common, "id": "fi-finrisk-testosterone-60-69", "ageGroup": "60-69", "preferredForCountry": True,
             "title": text("Kokonaistestosteroni, FINRISK 60–69-vuotiaat", "Total testosterone, FINRISK ages 60–69"),
             "points": [fin_point(fin, cells[key]) for key in ("age60-earlier", "age60-later")],
             "limitations": fin_common["limitations"] + [text("Abstraktissa esitetty kohorttivertailu: n = 130 ja 23. Sama ikäluokka ei tarkoita samaa ikäjakaumaa; tuoreimman kohortin otos on pieni.", "The abstract's cohort contrast: n = 130 and 23. The same age bin does not imply identical age distributions; the later cohort cell is small."),
                text("Keräysvuodet 1977 ja 2002 on päätelty julkaistujen keräysvuosien, ikäluokan ja syntymäkohortin yksikäsitteisestä leikkauksesta; taulukko ei itse ole kalenterivuositaulukko.", "Collection years 1977 and 2002 follow uniquely from the published survey years, age bin and birth cohort; the table itself is not arranged by calendar year.")]}
    younger = {**fin_common, "id": "fi-finrisk-testosterone-25-29", "ageGroup": "25-29", "preferredForCountry": False,
               "title": text("Kokonaistestosteroni, FINRISK 25–29-vuotiaat", "Total testosterone, FINRISK ages 25–29"),
               "points": [fin_point(fin, cells[key]) for key in ("age25-earlier", "age25-later")],
               "limitations": fin_common["limitations"] + [text("Varhaista solua ei erotella vuosille 1972 ja 1977. Ajanjakso rajaa mahdolliset varhaiset tutkimusvuodet; jakson keskelle sijoitettu merkki on vain piirron sijainti.", "The earlier cell is not disaggregated between 1972 and 1977. The interval bounds possible earlier survey years; the marker at the interval midpoint is only a plotting position."),
                   text("Yhdistetty mediaani ei ole vuosimediaanien aritmeettinen keskiarvo. Tätä varhaista pistettä ei käytetä yksivuotisen mallivasteen ankkurina.", "A pooled median is not an arithmetic mean of annual medians. This early point cannot anchor a single-year model response.")]}
    usa = {"id": "us-nhanes-testosterone-15-39", "countryId": "USA", "datasetFamily": "hormone", "metric": "testosterone_total",
           "title": text("Kokonaistestosteroni, NHANES 15–39-vuotiaat", "Total testosterone, NHANES ages 15–39"),
           "unit": "ng_per_dl", "unitLabel": text("ng/dl", "ng/dL"), "ageGroup": "15-39", "status": "estimate",
           "frequency": "survey_period", "valueScale": "linear", "statistic": "arithmetic_mean", "preferredForCountry": True,
           "population": text("NHANES: 4 045 yhdysvaltalaista 15–39-vuotiasta miestä viidessä otoksessa; aamun 06–10 verinäytteet.",
                              "NHANES: 4,045 US males aged 15–39 across five samples; blood collection at 06:00–10:00."),
           "adjustment": text("Taulukon 1 kuvailevat otospainotetut keskiarvot. Monimuuttujavakioidut regressioerot ovat taulukossa 2 eikä niitä käytetä tämän sarjan tasoina.",
                              "Table 1 descriptive survey-weighted means. Multivariable-adjusted regression differences are in Table 2 and are not used as levels in this series."),
           "assay": text("Julkaisun mukaan 1999–2004 biotiini–streptavidiini-immunomääritys, 2011–12 isotooppilaimennus/LC ja 2013→HPLC-MS. Menetelmien vaihtumista ei harmonisoida tässä uudelleen.",
                         "The paper reports biotin–streptavidin assay in 1999–2004, isotope dilution/LC in 2011–12 and HPLC-MS from 2013. Assay changes are not re-harmonized here."),
           "comparability": text("Sama laaja ikäraja; otoskoostumus ja määritysmenetelmä vaihtuvat. Havainto on varhaisjaksoja alempi myöhemmissä jaksoissa, mutta ei laske jokaisessa peräkkäisessä jaksossa.",
                                 "Same broad age range; sample composition and assays change. Later periods are lower than early periods, but successive cycles do not decline monotonically."),
           "sourceIds": [us["sourceId"]],
           "limitations": [text("Ilmoitettu keskivirhe säilyy SE:nä. 95 %:n luottamusväliä ei johdeta tai nimetä lähteen raportoimaksi.", "Reported standard errors remain SEs. No 95% confidence interval is derived or labelled as source-reported."),
                           text("Sarja ei ole ikä/BMI-vakioitu, eikä sitä yhdistetä Nyanten laajasti vakioituun yli 20-vuotiaiden sarjaan tai siirretä Suomen miehille.", "This is not an age/BMI-adjusted series; it is not joined to Nyante's fully adjusted age-20+ series or transferred to Finnish men."),
                           text("Menetelmävaihdot ja muuttuva otos säilyvät tulkintarajoina; sarja ei yksin tunnista laskun syytä.", "Assay changes and changing samples remain interpretation limits; the series alone does not identify the cause of decline.")],
           "points": [{**cell, "year": (cell["startYear"] + cell["endYear"] + 1) // 2,
                       "collectionYears": list(range(cell["startYear"], cell["endYear"] + 1)), "collectionYearBasis": "reported-survey-period",
                       "intervalKind": "standard_error", "sourceId": us["sourceId"],
                       "sourceLocator": f"Table 1; {cell['startYear']}–{cell['endYear']}; Mean T, ng/dl ± SE; n in column header", "imputed": False}
                      for cell in us["cells"]]}
    return {"schemaVersion": 1, "updatedAt": "2026-09-08", "preferredSeriesByCountry": {"FIN": older["id"], "USA": usa["id"]},
            "sources": [source(fin, "perheentupa2013_table1_facts.json", "Perheentupa et al. (2013), Table 1", text("FINRISK-ikä–syntymäkohorttisolut; mediaanit ja jakauman persentiilit.", "FINRISK age/birth-cohort cells; medians and distribution percentiles.")),
                        source(us, "lokeshwar2021_table1_facts.json", "Lokeshwar et al. (2021; online 2020), Table 1", text("NHANES 15–39-vuotiaiden viisi kuvailevaa jaksoarviota; menetelmävaihdot säilyvät.", "Five descriptive NHANES period estimates for ages 15–39; assay changes remain."))],
            "series": [older, younger, usa], "coverageGaps": [{"countryId": country, "reason": text("Tähän rajattuun poimintaan ei varmennettu vertailukelpoista numeerista trendisarjaa. Ei väitettä ilmiön puuttumisesta.", "No comparable numerical trend series was verified for this bounded extraction. This does not imply absence of a trend.")} for country in ("GBR", "DEU", "JPN")]}


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--check", action="store_true")
    args = parser.parse_args()
    output = json.dumps(build(), indent=2, ensure_ascii=False) + "\n"
    if args.check:
        if not OUTPUT.exists() or OUTPUT.read_text() != output:
            raise SystemExit("Testosterone trend data differs from the checked source extraction")
    else:
        OUTPUT.write_text(output)
    print("3 series / 9 published values / 2 source tables; no interpolation or extrapolation")
