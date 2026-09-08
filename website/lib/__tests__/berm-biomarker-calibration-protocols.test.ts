import { describe, expect, it } from "vitest";
import { changeAtlasData } from "../change-atlas-data";
import { BERM_BIOMARKER_CALIBRATION_PROTOCOLS, getBermBiomarkerCalibrationProtocol } from "../berm-biomarker-calibration-protocols";

describe("source-bounded BERM biomarker calibration protocols", () => {
  it("resolves all four protocols to exact existing observation periods", () => {
    expect(BERM_BIOMARKER_CALIBRATION_PROTOCOLS).toHaveLength(4);
    expect(new Set(BERM_BIOMARKER_CALIBRATION_PROTOCOLS.map(p => p.seriesId)).size).toBe(4);
    for (const protocol of BERM_BIOMARKER_CALIBRATION_PROTOCOLS) {
      const series = changeAtlasData.series.find(s => s.id === protocol.seriesId)!;
      expect(series).toBeDefined();
      expect(series.countryId).toBe(protocol.countryId);
      expect(series.metric).toBe(protocol.biomarker);
      const periods = [...protocol.eligiblePeriods, ...protocol.excludedPeriods];
      expect(periods).toHaveLength(series.points.length);
      for (const period of periods) expect(series.points.filter(point => point.startYear === period.startYear && point.endYear === period.endYear)).toHaveLength(1);
      expect(new Set(periods.map(p => `${p.startYear}:${p.endYear}`)).size).toBe(periods.length);
      expect(protocol.defaultThroughYear).toBe(Math.max(...protocol.eligiblePeriods.map(p => p.endYear)));
      expect(protocol.eligiblePeriods).toContainEqual(protocol.anchorPeriod);
    }
    expect(getBermBiomarkerCalibrationProtocol("unverified-series")).toBeUndefined();
  });

  it("allows the exact Finnish age-60–69 medians while leaving the pooled young-male median outside calibration", () => {
    const older = getBermBiomarkerCalibrationProtocol("fi-finrisk-testosterone-60-69")!;
    expect(older.status).toBe("eligible");
    expect(older.statistic).toBe("median");
    expect(older.eligiblePeriods).toEqual([{ startYear: 1977, endYear: 1977 }, { startYear: 2002, endYear: 2002 }]);
    expect(older.limitations.some(l => l.en.includes("age distribution"))).toBe(true);
    const younger = getBermBiomarkerCalibrationProtocol("fi-finrisk-testosterone-25-29")!;
    expect(younger.status).toBe("insufficient-compatible-periods");
    expect(younger.eligiblePeriods).toEqual([{ startYear: 2002, endYear: 2002 }]);
    expect(younger.excludedPeriods[0]).toMatchObject({ startYear: 1972, endYear: 1977 });
    expect(younger.excludedPeriods[0].reason.en).toContain("pooled median");
  });

  it("restricts Lokeshwar to the two compatible later assay periods and does not invent a 2011 correction", () => {
    const protocol = getBermBiomarkerCalibrationProtocol("us-nhanes-testosterone-15-39")!;
    expect(protocol.eligiblePeriods).toEqual([{ startYear: 2013, endYear: 2014 }, { startYear: 2015, endYear: 2016 }]);
    expect(protocol.anchorPeriod).toEqual({ startYear: 2013, endYear: 2014 });
    expect(protocol.excludedPeriods.map(p => p.startYear)).toEqual([1999, 2003, 2011]);
    expect(protocol.excludedPeriods[2].reason.en).toContain("correction status");
    expect(protocol.sources.map(s => s.url)).toContain("https://wwwn.cdc.gov/Nchs/Data/Nhanes/Public/2013/DataFiles/TST_H.htm");
    expect(protocol.sources.map(s => s.url)).toContain("https://wwwn.cdc.gov/Nchs/Data/Nhanes/Public/2015/DataFiles/TST_I.htm");
    expect(protocol.limitations.some(l => l.en.includes("later value is higher"))).toBe(true);
  });

  it("retains Nyante's adjusted two-period scope independently of the younger NHANES sample", () => {
    const protocol = getBermBiomarkerCalibrationProtocol("us-nhanes-testosterone-fully-adjusted")!;
    expect(protocol.statistic).toBe("adjusted_mean");
    expect(protocol.eligiblePeriods).toEqual([{ startYear: 1988, endYear: 1991 }, { startYear: 1999, endYear: 2004 }]);
    expect(protocol.excludedPeriods).toEqual([]);
    expect(protocol.scope.en).toContain("same assay and multivariable adjustment");
    expect(protocol.limitations.some(l => l.en.includes("Do not pool"))).toBe(true);
  });

  it("identifies only one conditional gain and does not claim independent validation or inferred confidence intervals", () => {
    for (const protocol of BERM_BIOMARKER_CALIBRATION_PROTOCOLS) {
      expect(protocol.fitParameterIds).toEqual(["betaT"]);
      expect(protocol.uncertaintyUse).toBe("display-only");
      expect(protocol.independentHoldout).toBe(false);
      expect(protocol.status === "eligible").toBe(protocol.eligiblePeriods.length >= 2);
      for (const source of protocol.sources) {
        expect(source.url).toMatch(/^https:\/\//);
        expect(source.verification.fi.length).toBeGreaterThan(20);
        expect(source.verification.en.length).toBeGreaterThan(20);
      }
    }
  });
});
