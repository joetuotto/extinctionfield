import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { execFileSync } from "node:child_process";
import { describe, expect, it } from "vitest";
import { getTechnologyDriverCoverage, getTechnologyDriverSeries, getTechnologyDriverSource, getTechnologyDriverValue, technologyDriversData, validateTechnologyDrivers } from "../technology-drivers-data";

const series = (id: string) => technologyDriversData.series.find(row => row.id === id)!;

describe("source-based quantitative technology histories", () => {
  it("validates all source, family, scope and normalization contracts", () => {
    expect(validateTechnologyDrivers(technologyDriversData)).toEqual([]);
    for (const country of ["FIN", "USA", "GBR", "DEU", "JPN"]) {
      expect(getTechnologyDriverSeries(country).some(row => row.points.some(point => point.year < 1970))).toBe(true);
      expect(getTechnologyDriverCoverage(country)).toHaveLength(13);
    }
    expect(getTechnologyDriverSeries("missing")).toEqual([]);
    expect(getTechnologyDriverSource("missing")).toBeUndefined();
  });

  it("reproduces the published registry offline and verifies frozen source artifacts", () => {
    const root = resolve(process.cwd(), "..");
    expect(execFileSync("python3", [resolve(root, "berm/scripts/build_technology_drivers.py"), "--check"], { encoding: "utf8" })).toContain("observations");
    for (const source of technologyDriversData.sources) for (const artifact of source.artifacts) {
      const bytes = readFileSync(resolve(root, artifact.path));
      expect(bytes.length, artifact.path).toBe(artifact.bytes);
      expect(createHash("sha256").update(bytes).digest("hex"), artifact.path).toBe(artifact.sha256);
    }
  });

  it("keeps observed declines rather than constructing monotone rollout curves", () => {
    const amr = series("us_electricity_amr_meters");
    expect(amr.points[0].value).toBe(47604211);
    expect(amr.points.at(-1)!.value).toBe(19250287);
    const tv = series("jpn_monochrome_tv_general");
    expect(tv.points.find(row => row.year === 1968)?.value).toBe(96.4);
    expect(tv.points.at(-1)!.value).toBe(17.4);
  });

  it("retains real Finnish electricity consumption before cellular deployment", () => {
    const fin = series("fin_electricity_consumption_gwh");
    expect(fin.points).toHaveLength(65);
    expect(fin.points[0]).toMatchObject({ year: 1960, value: 8789, imputed: false });
    expect(fin.points.at(-1)).toMatchObject({ year: 2024, value: 83053 });
    expect(fin.unit).toBe("gwh");
    expect(fin.scope.en).toContain("total electricity consumption");
    expect(fin.driver?.referenceValue).toBe(100000);
  });

  it("uses a shared fixed per-person reference rather than each country's maximum", () => {
    const rows = technologyDriversData.series.filter(row => row.metric === "electricity_consumption_per_capita");
    expect(rows).toHaveLength(5);
    for (const row of rows) {
      expect(row.driver).toMatchObject({ normalization: "reference", referenceValue: 10000 });
      expect(row.points[0].year).toBe(1990);
      expect(row.points.at(-1)?.year).toBe(2024);
      expect(getTechnologyDriverValue(row, 1989, true)).toBeNull();
    }
  });

  it("imports complete US annual residential sales and footnoted UK calendar years", () => {
    const us = series("usa_residential_electricity_sales");
    expect(us.points).toHaveLength(76);
    expect(us.points[0]).toMatchObject({ year: 1949, value: 66791.968 });
    expect(us.points.at(-1)).toMatchObject({ year: 2024, value: 1482873.586 });
    expect(us.unit).toBe("gwh");
    const uk = series("gbr_domestic_electricity_consumption");
    expect(uk.points.find(point => point.year === 1986)?.value).toBe(91830);
    expect(uk.points.filter(point => point.year === 1987)).toHaveLength(1);
    expect(uk.points.find(point => point.year === 1987)?.value).toBe(93250);
    expect(uk.points.filter(point => point.year >= 1961 && point.year <= 1964)).toEqual([]);
  });

  it("keeps operator counts, installation snapshots and historical denominators distinct", () => {
    expect(series("jpn_tepco_smart_meters_2021").points).toHaveLength(1);
    expect(series("jpn_tepco_smart_meters_2021").points[0]).toMatchObject({ year: 2021, value: 28400000 });
    expect(series("jpn_tepco_smart_meters_2021").scope.en).toContain("TEPCO");
    expect(series("gbr_cumulative_meter_installs_2014").points[0].value).toBe(452860);
    expect(series("gbr_domestic_electricity_smart_mode").points.find(row => row.year === 2014)?.value).toBe(400645);
    const ami = series("us_electricity_ami_meters");
    expect(ami.points[0].denominator?.value).toBe(150813765);
    expect(ami.points.at(-1)?.denominator?.value).toBe(168085999);
    expect(series("usa_farms_electricity_access").scope.en).toContain("farms");
    expect(series("usa_occupied_homes_electric_lighting").scope.en).toContain("housing units");
  });

  it("keeps Japanese urban/non-farm and general populations as separate source series", () => {
    const urban = series("jpn_monochrome_tv_urban_nonfarm");
    const general = series("jpn_monochrome_tv_general");
    expect(urban.points.at(-1)?.year).toBe(1963);
    expect(general.points[0].year).toBe(1964);
    expect(getTechnologyDriverValue(urban, 1964, true)).toBeNull();
    expect(general.scope.en).toContain("two or more");
    for (const row of technologyDriversData.series.filter(row => row.id.startsWith("jpn_air_conditioner"))) expect(row.driver).toBeUndefined();
  });

  it("preserves the West German survey scope and sparse benchmark dates", () => {
    const west = series("deu_west_tv_ownership");
    expect(west.points.map(row => [row.year, row.value])).toEqual([[1962, 34], [1969, 73], [1973, 87]]);
    expect(west.scope.en).toContain("not the territory of reunified Germany");
    expect(getTechnologyDriverValue(west, 1965)).toBeNull();
    expect(getTechnologyDriverValue(west, 1965, true)).toMatchObject({ kind: "interpolated", leftYear: 1962, rightYear: 1969 });
    expect(getTechnologyDriverValue(west, 1962, true)?.kind).toBe("observed");
    expect(getTechnologyDriverValue(west, 1961, true)).toBeNull();
    expect(getTechnologyDriverValue(west, 1974, true)).toBeNull();
    expect(west.points).toHaveLength(3);
  });

  it("classifies selected-range coverage without calling sparse anchors an annual series", () => {
    expect(getTechnologyDriverCoverage("DEU", 1950, 1980).find(row => row.familyId === "terrestrial-tv")).toMatchObject({ status: "anchors", pointCount: 3, firstYear: 1962, lastYear: 1973 });
    expect(getTechnologyDriverCoverage("FIN", 1950, 2023).find(row => row.familyId === "electric-grid")?.status).toBe("series");
    expect(getTechnologyDriverCoverage("FIN", 2017, 2017).find(row => row.familyId === "smart-metering")?.status).toBe("anchors");
    expect(getTechnologyDriverCoverage("FIN", 1950, 1960).find(row => row.familyId === "smart-metering")?.status).toBe("open");
    expect(() => getTechnologyDriverCoverage("FIN", 2020, 2000)).toThrow(RangeError);
  });

  it("rejects missing ratio denominators, invented observations and unnamed references", () => {
    const changed = structuredClone(technologyDriversData);
    const ami = changed.series.find(row => row.id === "us_electricity_ami_meters")!;
    delete ami.points[0].denominator;
    ami.points[1].year = ami.points[0].year;
    const reference = changed.series.find(row => row.driver?.normalization === "reference")!;
    reference.driver!.referenceValue = 0;
    const errors = validateTechnologyDrivers(changed);
    expect(errors.some(error => error.includes("Ratio normalization"))).toBe(true);
    expect(errors.some(error => error.includes("unique and ordered"))).toBe(true);
    expect(errors.some(error => error.includes("Positive named reference"))).toBe(true);
  });
});
