import { describe, expect, it } from "vitest";
import { adoptionValue, annualAdoptionSegments, canShowAdoptionShare, technologyAdoption } from "@/lib/technology-adoption";
import { technologyHistory } from "@/lib/technology-history";

describe("reported technology quantities", () => {
  it("uses the same year's denominator for shares rather than the final year's stock", () => {
    const ami = technologyAdoption.series.find((s) => s.id === "us_electricity_ami_meters")!;
    expect(canShowAdoptionShare(ami)).toBe(true);
    const first = ami.points[0];
    const last = ami.points.at(-1)!;
    expect(last.value).toBe(140491981);
    expect(adoptionValue(first, true)).toBeCloseTo(100 * first.value / first.denominator!.value);
    expect(adoptionValue(first, true)).not.toBeCloseTo(100 * first.value / last.denominator!.value);
    expect(adoptionValue(last, false)).toBe(140491981);
  });

  it("does not invent denominators or interpolate missing annual observations", () => {
    const ami = technologyAdoption.series.find((s) => s.id === "us_electricity_ami_meters")!;
    expect(annualAdoptionSegments(ami)).toHaveLength(9);
    expect(annualAdoptionSegments({ ...ami, points: ami.points.filter((p) => p.year !== 2019) })).toHaveLength(7);
    for (const s of technologyAdoption.series.filter((s) => s.frequency === "sparse")) {
      expect(annualAdoptionSegments(s)).toEqual([]);
      expect(canShowAdoptionShare(s)).toBe(false);
    }
    expect(() => adoptionValue({ ...ami.points[0], denominator: null }, true)).toThrow(RangeError);
  });

  it("resolves observations to canonical technologies and original, archived sources", () => {
    for (const series of technologyAdoption.series) {
      expect(technologyHistory.technologies.some((t) => t.id === series.technologyId)).toBe(true);
      for (const point of series.points) {
        const source = technologyAdoption.sources.find((s) => s.id === point.sourceId)!;
        expect(source.sha256).toMatch(/^[a-f0-9]{64}$/);
        expect(source.bytes).toBeGreaterThan(0);
        expect(point.imputed).toBe(false);
        expect(technologyHistory.sources.some((s) => s.url === source.url)).toBe(true);
      }
    }
    expect(technologyAdoption.scope).toBe("imported_technology_history");
    expect(technologyAdoption.exposureMapping).toBe("not_calibrated");
  });
});
