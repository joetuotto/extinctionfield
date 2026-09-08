import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import {
  testosteroneTrendsData, getTestosteroneTrendSeries, getTestosteroneTrendSource,
  validateTestosteroneTrendsData, type TestosteroneTrendsData,
} from "@/lib/testosterone-trends-data";

const clone = (): TestosteroneTrendsData => structuredClone(testosteroneTrendsData);

describe("published testosterone trends", () => {
  it("validates three separately scoped series and nine reported table values", () => {
    expect(validateTestosteroneTrendsData(testosteroneTrendsData)).toEqual([]);
    expect(testosteroneTrendsData.series).toHaveLength(3);
    expect(testosteroneTrendsData.series.flatMap(s => s.points)).toHaveLength(9);
    expect(testosteroneTrendsData.sources).toHaveLength(2);
    expect(getTestosteroneTrendSeries("FIN")).toHaveLength(2);
    expect(getTestosteroneTrendSeries("USA")).toHaveLength(1);
    for (const country of ["GBR", "DEU", "JPN"]) expect(getTestosteroneTrendSeries(country)).toEqual([]);
    expect(testosteroneTrendsData.preferredSeriesByCountry.FIN).toBe("fi-finrisk-testosterone-60-69");
  });

  it("keeps Finnish medians and distribution percentiles distinct from confidence intervals", () => {
    const older = getTestosteroneTrendSeries("FIN")[0];
    expect(older.unit).toBe("nmol_per_l");
    expect(older.statistic).toBe("median");
    expect(older.points.map(p => [p.startYear, p.endYear, p.value, p.lower, p.upper, p.n])).toEqual([
      [1977, 1977, 21.9, 10.3, 40.9, 130], [2002, 2002, 13.8, 7.7, 27.8, 23],
    ]);
    expect(older.points.every(p => p.intervalKind === "percentile_5_95" && p.standardError === undefined)).toBe(true);
    expect(older.points[0].birthCohortStart).toBe(1913);
    expect(older.points[1].birthCohortStart).toBe(1942);
    expect(getTestosteroneTrendSource(older.sourceIds[0])?.surveyYears).toEqual([1972, 1977, 2002]);
    expect(older.points.every(p => p.collectionYearBasis === "unique-survey-age-cohort-intersection")).toBe(true);
  });

  it("does not turn the two possible early Finnish survey years into a midpoint observation", () => {
    const younger = getTestosteroneTrendSeries("FIN")[1];
    expect(younger.points.map(p => [p.value, p.lower, p.upper, p.n])).toEqual([[26.4, 15.1, 44, 289], [19.1, 8.7, 27.3, 63]]);
    expect(younger.points[0]).toMatchObject({ year: 1975, startYear: 1972, endYear: 1977, collectionYears: [1972, 1977], collectionYearBasis: "early-surveys-not-disaggregated" });
    expect(younger.points[0].collectionYears).not.toContain(1975);
    expect(younger.points[0].birthCohortStart).toBeUndefined();
    expect(younger.points[1].collectionYears).toEqual([2002]);
  });

  it("preserves five NHANES weighted means, gaps, SEs and the later increase", () => {
    const usa = getTestosteroneTrendSeries("USA")[0];
    expect(usa.statistic).toBe("arithmetic_mean");
    expect(usa.unit).toBe("ng_per_dl");
    expect(usa.points.map(p => [p.startYear, p.endYear, p.value, p.standardError, p.n])).toEqual([
      [1999, 2000, 605.39, 21.01, 207], [2003, 2004, 567.44, 17.23, 237],
      [2011, 2012, 424.96, 7.7, 1192], [2013, 2014, 431.76, 7.19, 1241], [2015, 2016, 451.22, 10.03, 1168],
    ]);
    expect(usa.points.reduce((n, p) => n + p.n, 0)).toBe(4045);
    expect(usa.points.every(p => p.intervalKind === "standard_error" && p.lower === undefined && p.upper === undefined)).toBe(true);
    expect(usa.points.at(-1)!.value).toBeGreaterThan(usa.points[2].value);
    expect(usa.points.flatMap(p => p.collectionYears)).not.toContain(2007);
  });

  it("keeps exact source-fact hashes, table locators and published cell values", () => {
    const root = path.resolve(process.cwd(), "..");
    for (const source of testosteroneTrendsData.sources) {
      expect(source.doi).toMatch(/^10\./);
      expect(source.readingLevel).toContain("original");
      for (const artifact of source.artifacts) {
        const bytes = readFileSync(path.join(root, artifact.path));
        expect(bytes.byteLength).toBe(artifact.bytes);
        expect(createHash("sha256").update(bytes).digest("hex")).toBe(artifact.sha256);
        const facts = JSON.parse(bytes.toString()) as { cells: { id?: string; value: number; startYear?: number }[] };
        for (const point of testosteroneTrendsData.series.flatMap(s => s.points).filter(p => p.sourceId === source.id)) {
          expect(point.sourceLocator).toContain("Table 1");
          const cell = facts.cells.find(c => point.sourceCellId ? c.id === point.sourceCellId : c.startYear === point.startYear);
          expect(cell?.value).toBe(point.value);
        }
      }
    }
  });

  it("rejects broken provenance, projections and fabricated uncertainty", () => {
    const unknown = clone(); unknown.series[0].points[0].sourceId = "missing-source";
    expect(validateTestosteroneTrendsData(unknown).some(e => e.includes("unknown point source"))).toBe(true);
    const future = clone(); Object.assign(future.series[2].points[4], { year: 2028, startYear: 2027, endYear: 2028, collectionYears: [2027, 2028] });
    expect(validateTestosteroneTrendsData(future).some(e => e.includes("projected period"))).toBe(true);
    const imputed = clone(); Object.assign(imputed.series[0].points[0], { imputed: true });
    expect(validateTestosteroneTrendsData(imputed).some(e => e.includes("imputed values"))).toBe(true);
    const ci = clone(); Object.assign(ci.series[0].points[0], { intervalKind: "confidence_95" });
    expect(validateTestosteroneTrendsData(ci).some(e => e.includes("not confidence intervals"))).toBe(true);
    const bounds = clone(); Object.assign(bounds.series[2].points[0], { lower: 564.21, upper: 646.57 });
    expect(validateTestosteroneTrendsData(bounds).some(e => e.includes("invented bounds"))).toBe(true);
  });

  it("rejects an apparently exact Finnish year that the age/cohort intersection does not imply", () => {
    const wrong = clone();
    Object.assign(wrong.series[0].points[0], { year: 1972, startYear: 1972, endYear: 1972, collectionYears: [1972] });
    expect(validateTestosteroneTrendsData(wrong).some(e => e.includes("not uniquely implied"))).toBe(true);
    const collapsed = clone();
    Object.assign(collapsed.series[1].points[0], { startYear: 1975, endYear: 1975, collectionYears: [1975] });
    expect(validateTestosteroneTrendsData(collapsed).some(e => e.includes("preserve pooled median years"))).toBe(true);
    const reversed = clone(); reversed.series[2].points[0].endYear = 1998;
    expect(validateTestosteroneTrendsData(reversed).some(e => e.includes("invalid, overlapping or projected period"))).toBe(true);
  });
});
