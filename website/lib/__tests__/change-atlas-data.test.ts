import { createHash } from "node:crypto";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import {
  changeAtlasData, changeAtlasBaseData, getChangeAtlasSeries, getChangeAtlasSource, validateChangeAtlasData,
  type ChangeAtlasData,
} from "@/lib/change-atlas-data";
import { testosteroneTrendsData } from "@/lib/testosterone-trends-data";

const clone = (): ChangeAtlasData => structuredClone(changeAtlasData);
const countries = ["FIN", "USA", "GBR", "DEU", "JPN"];
const ages = ["15-19", "20-24", "25-29", "30-34", "35-39", "40-44", "45-49"];

describe("verified change-atlas source integration", () => {
  it("validates the released five-country catalogue and its source references", () => {
    expect(validateChangeAtlasData(changeAtlasData)).toEqual([]);
    expect(changeAtlasData.countries.map(c => c.id)).toEqual(countries);
    expect(changeAtlasData.countries.find(c => c.id === "GBR")?.name).toEqual({ fi: "Yhdistynyt kuningaskunta", en: "United Kingdom" });
    expect(changeAtlasBaseData.series).toHaveLength(50);
    expect(changeAtlasBaseData.sources).toHaveLength(6);
    expect(changeAtlasBaseData.series.reduce((n, s) => n + s.points.length, 0)).toBe(3339);
    expect(changeAtlasData.series).toHaveLength(83);
    expect(changeAtlasData.series.reduce((n, s) => n + s.points.length, 0)).toBe(4144);
    expect(changeAtlasData.sources).toHaveLength(23);
    for(const country of countries)expect(getChangeAtlasSeries(country).some(s=>s.technologyFamilyId==="electric-grid"&&s.points.length>1)).toBe(true);
  });

  it("retains all 1950–2023 WPP histories with seven age groups and no projections", () => {
    const years = Array.from({ length: 74 }, (_, i) => 1950 + i);
    for (const country of countries) {
      const fertility = getChangeAtlasSeries(country).filter(s => s.datasetFamily === "fertility");
      expect(fertility).toHaveLength(8);
      expect(fertility.filter(s => s.metric === "asfr").map(s => s.ageGroup)).toEqual(ages);
      for (const s of fertility) {
        expect(s.points.map(p => p.year)).toEqual(years);
        expect(s.points.every(p => p.imputed === false && p.sourceLocator.includes("Variant=Medium"))).toBe(true);
        expect(s.status).toBe("estimate");
      }
    }
    expect(getChangeAtlasSeries("FIN", "tfr")[0].points[0].value).toBe(3.1526);
    expect(getChangeAtlasSeries("USA", "tfr")[0].points.at(-1)?.value).toBe(1.6236);
    expect(getChangeAtlasSeries("JPN", "asfr").find(s => s.ageGroup === "30-34")?.points.at(-1)?.value).toBe(90.167);
  });

  it("preserves actual mobile gaps, reported zeroes and ratios above 100", () => {
    const mobile = getChangeAtlasSeries("USA", "mobile_subscriptions")[0];
    expect(mobile.points).toHaveLength(49);
    expect(mobile.points.find(p => p.year === 1960)?.value).toBe(0);
    expect(mobile.points.some(p => [1961, 1981, 1982, 1983].includes(p.year))).toBe(false);
    expect(mobile.points.at(-1)?.value).toBeGreaterThan(100);
    expect(mobile.unit).toBe("subscriptions_per_100_people");
    expect(mobile.status).toBe("reported");
    expect(getChangeAtlasSeries("FIN", "mobile_subscriptions")[0].points).toHaveLength(52);
  });

  it("retains CDC survey intervals, confidence intervals and sample sizes without annualizing", () => {
    const [total, diagnosed] = getChangeAtlasSeries("USA", "diabetes_prevalence");
    expect(total.frequency).toBe("survey_period");
    expect(total.points).toHaveLength(11);
    expect(diagnosed.points).toHaveLength(11);
    expect(total.points[0]).toMatchObject({ year: 1999.5, startYear: 1999, endYear: 2000, value: 9.7, lower: 7.6, upper: 12.1, n: 1739 });
    expect(total.points[9]).toMatchObject({ year: 2018.5, startYear: 2017, endYear: 2020, value: 14.8, n: 3757 });
    expect(total.points[9].period?.en).toContain("March 2020");
    expect(total.points[10]).toMatchObject({ year: 2022, startYear: 2021, endYear: 2023, value: 14.3, lower: 12.1, upper: 16.7, n: 2938 });
    expect(diagnosed.points[10].value).toBe(10.1);
    expect(getChangeAtlasSeries("FIN", "diabetes_prevalence")).toEqual([]);
  });

  it("retains all 98 UKBMS source points and their log scale, including 2024 outside the default view", () => {
    const butterflies = getChangeAtlasSeries("GBR", "butterfly_abundance");
    expect(butterflies).toHaveLength(2);
    for (const s of butterflies) {
      expect(s.points).toHaveLength(49);
      expect(s.points[0].year).toBe(1976);
      expect(s.points.at(-1)?.year).toBe(2024);
      expect(s.valueScale).toBe("log10");
      expect(s.points.every(p => p.lower === null && p.upper === null && p.nSites && p.n === undefined)).toBe(true);
    }
    expect(butterflies[0].points[0]).toMatchObject({ value: 1.8, nSites: 37 });
    expect(butterflies[0].points.at(-1)).toMatchObject({ value: 1.9, nSites: 3020 });
    expect(getChangeAtlasSource(butterflies[0].sourceIds[0])?.attribution).toBeTruthy();
    expect(changeAtlasData.defaultRange.endYear).toBe(2023);
  });

  it("holds exact artifact hashes and byte counts for available source snapshots", () => {
    const root = path.resolve(process.cwd(), "..");
    let checked = 0;
    for (const source of changeAtlasData.sources) for (const artifact of source.artifacts) {
      const file = path.join(root, artifact.path);
      // Large WPP/WB downloads are hydrated separately; their checked-in manifests remain required.
      if (!existsSync(file) && artifact.path.startsWith("berm/data/raw/") && !artifact.path.includes("/manifests/")) continue;
      expect(existsSync(file), artifact.path).toBe(true);
      const content = readFileSync(file);
      expect(content.byteLength, artifact.path).toBe(artifact.bytes);
      expect(createHash("sha256").update(content).digest("hex"), artifact.path).toBe(artifact.sha256);
      checked++;
    }
    expect(checked).toBeGreaterThanOrEqual(7);
  });

  it("preserves the earlier fully adjusted NHANES release separately from newly added populations", () => {
    const hormones = changeAtlasData.series.filter(s => s.datasetFamily === "hormone");
    expect(hormones).toHaveLength(4);
    const legacy = hormones.find(s => s.id === "us-nhanes-testosterone-fully-adjusted")!;
    expect(legacy).toEqual(changeAtlasBaseData.series.find(s => s.id === legacy.id));
    expect(legacy.unit).toBe("ng_per_ml");
    expect(legacy.frequency).toBe("survey_period");
    expect(legacy.title.en).toContain("fully adjusted");
    expect(legacy.points).toHaveLength(2);
    expect(legacy.points[0]).toMatchObject({ year: 1989.5, startYear: 1988, endYear: 1991, value: 5.37, lower: 5.2, upper: 5.53, n: 1413 });
    expect(legacy.points[1]).toMatchObject({ year: 2001.5, startYear: 1999, endYear: 2004, value: 5.34, lower: 5.16, upper: 5.52, n: 902 });
    expect(getChangeAtlasSeries("FIN", "testosterone_total")).toHaveLength(2);
    expect(getChangeAtlasSeries("USA", "testosterone_total")).toHaveLength(2);
    for (const country of ["GBR", "DEU", "JPN"]) expect(getChangeAtlasSeries(country, "testosterone_total")).toEqual([]);
    expect(getChangeAtlasSeries("unknown")).toEqual([]);
    expect(getChangeAtlasSource("unknown")).toBeUndefined();
  });

  it("retains every registered native testosterone value, source cell and collection-year boundary", () => {
    const before = JSON.stringify(testosteroneTrendsData);
    const adapted = changeAtlasData.series.filter(s => s.testosteroneTrendId);
    expect(adapted).toHaveLength(3);
    expect(adapted.flatMap(s => s.points)).toHaveLength(9);
    for (const original of testosteroneTrendsData.series) {
      const entry = adapted.find(s => s.testosteroneTrendId === original.id)!;
      expect(entry).toMatchObject({ id: original.id, countryId: original.countryId, unit: original.unit,
        unitLabel: original.unitLabel, ageGroup: original.ageGroup, statistic: original.statistic,
        frequency: "survey_period", valueScale: "linear", population: original.population });
      expect(entry.sourceIds).toEqual(original.sourceIds.map(id => `hormone:${id}`));
      expect(entry.points).toHaveLength(original.points.length);
      original.points.forEach((point, index) => expect(entry.points[index]).toMatchObject({
        ...point, year: (point.startYear + point.endYear) / 2, lower: point.lower ?? null, upper: point.upper ?? null,
        sourceId: `hormone:${point.sourceId}`, imputed: false,
      }));
      for (const locale of ["fi", "en"] as const) {
        expect(entry.method[locale]).toContain(original.adjustment[locale]);
        expect(entry.method[locale]).toContain(original.assay[locale]);
        expect(entry.method[locale]).toContain(original.comparability[locale]);
      }
      for (const id of original.sourceIds) {
        const source = testosteroneTrendsData.sources.find(s => s.id === id)!;
        expect(getChangeAtlasSource(`hormone:${id}`)).toMatchObject({ ...source, id: `hormone:${id}` });
      }
    }
    expect(JSON.stringify(testosteroneTrendsData)).toBe(before);
  });

  it("uses true plot midpoints without turning pooled Finnish or US survey periods into annual observations", () => {
    const younger = getChangeAtlasSeries("FIN", "testosterone_total").find(s => s.ageGroup === "25-29")!;
    expect(younger.points[0]).toMatchObject({ year: 1974.5, startYear: 1972, endYear: 1977, collectionYears: [1972, 1977], collectionYearBasis: "early-surveys-not-disaggregated", value: 26.4 });
    expect(younger.points[0].collectionYears).not.toContain(1974.5);
    expect(younger.points[0].period).toEqual({ fi: "1972–1977", en: "1972–1977" });
    const usa = getChangeAtlasSeries("USA", "testosterone_total").find(s => s.testosteroneTrendId)!;
    expect(usa.points.map(p => p.year)).toEqual([1999.5, 2003.5, 2011.5, 2013.5, 2015.5]);
    expect(usa.points).toHaveLength(5);
    expect(usa.points.some(p => p.year === 2007)).toBe(false);
    for (const entry of changeAtlasData.series.filter(s => s.testosteroneTrendId)) {
      expect(entry.frequency).toBe("survey_period");
      for (const point of entry.points) expect(point.year).toBe((point.startYear! + point.endYear!) / 2);
    }
  });

  it("keeps median population percentiles distinct from standard errors and confidence intervals", () => {
    const fin = getChangeAtlasSeries("FIN", "testosterone_total");
    expect(fin.every(s => s.statistic === "median" && s.unit === "nmol_per_l")).toBe(true);
    expect(fin.flatMap(s => s.points).every(p => p.intervalKind === "percentile_5_95" && p.lower !== null && p.upper !== null && p.standardError === undefined)).toBe(true);
    expect(fin.find(s => s.ageGroup === "60-69")!.points[0]).toMatchObject({ value: 21.9, lower: 10.3, upper: 40.9, n: 130 });
    const usa = getChangeAtlasSeries("USA", "testosterone_total").find(s => s.testosteroneTrendId)!;
    expect(usa.statistic).toBe("arithmetic_mean");
    expect(usa.unit).toBe("ng_per_dl");
    expect(usa.points.map(p => p.standardError)).toEqual([21.01, 17.23, 7.7, 7.19, 10.03]);
    expect(usa.points.every(p => p.intervalKind === "standard_error" && p.lower === null && p.upper === null)).toBe(true);
    expect(usa.points.map(p => p.value)).toEqual([605.39, 567.44, 424.96, 431.76, 451.22]);
    expect(usa.points.reduce((sum, p) => sum + p.n!, 0)).toBe(4045);
  });
});

describe("change-atlas provenance and boundary rejection", () => {
  it.each([
    ["unknown source", (d: ChangeAtlasData) => { d.series[0].points[0].sourceId = "missing"; }, /Unknown point source/],
    ["wrong series source", (d: ChangeAtlasData) => { d.series[0].points[0].sourceId = "wpp2024-asfr"; }, /Unknown point source/],
    ["projected WPP year", (d: ChangeAtlasData) => { d.series[0].points.at(-1)!.year = 2024; }, /WPP projection/],
    ["imputed point", (d: ChangeAtlasData) => { Object.assign(d.series[0].points[0], { imputed: true }); }, /Imputed point/],
    ["duplicate year", (d: ChangeAtlasData) => { d.series[0].points[1].year = 1950; }, /Unordered/],
    ["invalid ASFR age", (d: ChangeAtlasData) => { d.series.find(s => s.metric === "asfr")!.ageGroup = "20-29"; }, /ASFR age/],
    ["partial confidence interval", (d: ChangeAtlasData) => { d.series.find(s => s.metric === "diabetes_prevalence")!.points[0].lower = null; }, /Invalid interval/],
    ["broken survey midpoint", (d: ChangeAtlasData) => { d.series.find(s => s.metric === "diabetes_prevalence")!.points[0].year = 1999; }, /survey period/],
    ["reversed survey interval", (d: ChangeAtlasData) => { d.series.find(s => s.metric === "diabetes_prevalence")!.points[0].startYear = 2002; }, /survey period/],
    ["invalid percentage", (d: ChangeAtlasData) => { d.series.find(s => s.metric === "diabetes_prevalence")!.points[0].value = 101; }, /Percentage exceeds/],
    ["mislabelled log values", (d: ChangeAtlasData) => { d.series.find(s => s.metric === "butterfly_abundance")!.valueScale = "linear"; }, /value scale/],
  ] as const)("rejects %s", (_name, mutate, expected) => {
    const data = clone();
    mutate(data);
    expect(validateChangeAtlasData(data).join("\n")).toMatch(expected);
  });

  it.each(["nmol_per_l", "ng_per_dl"] as const)("accepts native %s only through a matching registered testosterone trend", unit => {
    const data = clone();
    const entry = data.series.find(s => s.unit === unit)!;
    expect(entry.testosteroneTrendId).toBeTruthy();
    expect(validateChangeAtlasData(data)).toEqual([]);
    delete entry.testosteroneTrendId;
    expect(validateChangeAtlasData(data).join("\n")).toMatch(/Metric\/family\/unit mismatch/);
    entry.testosteroneTrendId = "unregistered-testosterone-source";
    expect(validateChangeAtlasData(data).join("\n")).toMatch(/Metric\/family\/unit mismatch/);
  });

  it.each([
    ["registered trend with the wrong country", (d: ChangeAtlasData) => { d.series.find(s => s.testosteroneTrendId)!.countryId = "JPN"; }],
    ["registered trend with the wrong native unit", (d: ChangeAtlasData) => { d.series.find(s => s.testosteroneTrendId)!.unit = "ng_per_dl"; }],
    ["known but unrelated source substituted for a registered trend", (d: ChangeAtlasData) => {
      const entry = d.series.find(s => s.testosteroneTrendId)!;
      entry.sourceIds = ["wpp2024-tfr"];
      entry.points.forEach(p => { p.sourceId = "wpp2024-tfr"; });
    }],
    ["percentiles relabelled as confidence intervals", (d: ChangeAtlasData) => { d.series.find(s => s.testosteroneTrendId)!.points[0].intervalKind = "confidence_95"; }],
    ["median relabelled as an arithmetic mean", (d: ChangeAtlasData) => { d.series.find(s => s.testosteroneTrendId)!.statistic = "arithmetic_mean"; }],
    ["invented confidence bounds for a source reporting only SE", (d: ChangeAtlasData) => {
      const point = d.series.find(s => s.unit === "ng_per_dl")!.points[0];
      point.lower = point.value - 1.96 * point.standardError!;
      point.upper = point.value + 1.96 * point.standardError!;
      point.intervalKind = "confidence_95";
    }],
    ["rounded period midpoint masquerading as an exact midpoint", (d: ChangeAtlasData) => { d.series.find(s => s.unit === "ng_per_dl")!.points[0].year = 2000; }],
    ["pooled Finnish median collapsed to one invented collection year", (d: ChangeAtlasData) => {
      const point = d.series.find(s => s.id === "fi-finrisk-testosterone-25-29")!.points[0];
      Object.assign(point, { year: 1975, startYear: 1975, endYear: 1975, collectionYears: [1975] });
    }],
  ] as const)("rejects %s", (_name, mutate) => {
    const data = clone();
    mutate(data);
    expect(validateChangeAtlasData(data).length).toBeGreaterThan(0);
  });

  it("returns errors rather than throwing on malformed input", () => {
    for (const input of [null, [], {}, { schemaVersion: 1, countries: [null], sources: [null], series: [null], gaps: [null] }]) {
      expect(validateChangeAtlasData(input).length).toBeGreaterThan(0);
    }
  });
});
