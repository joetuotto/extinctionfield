import { describe, expect, it } from "vitest";
import {
  getHistorySources,
  getLocalizedText,
  getTechnologyById,
  getTechnologyEvents,
  queryHistoryEvents,
  queryTechnologies,
  technologyHistory,
  validateTechnologyHistory,
} from "../technology-history";

const copy = () => structuredClone(technologyHistory);

describe("technology history provenance contract", () => {
  it("validates the bilingual canonical registry and covers all existing profile families", () => {
    expect(validateTechnologyHistory(technologyHistory)).toEqual([]);
    // Protect the previous public coverage while adding the broader inventory.
    const existingProfileIds = [
      "electric-grid", "wifi", "mobile-1g-2g", "mobile-4g", "mobile-5g",
      "indoor-lighting", "electric-vehicles", "induction-cooking", "bluetooth",
      "base-stations", "data-centres", "street-lighting", "wireless-charging",
      "satellite-communications",
    ];
    expect(existingProfileIds.every((id) => getTechnologyById(id))).toBe(true);
    expect(technologyHistory.groups.every((group) => queryTechnologies({ group: group.id }).length > 0)).toBe(true);
  });

  it("retains pre-cellular histories and real source removals", () => {
    expect(getTechnologyEvents("vlf-radio").some((event) => event.startYear < 1950)).toBe(true);
    expect(getTechnologyEvents("cathodic-protection").some((event) => event.startYear === 1824)).toBe(true);
    expect(queryHistoryEvents({ technologyId: "radio-navigation", kind: "shutdown" }).map((event) => event.startYear)).toEqual([1997, 2010, 2015]);
    expect(queryHistoryEvents({ technologyId: "electric-fishing", kind: "shutdown" }).some((event) => event.startYear === 2021)).toBe(true);
    expect(queryHistoryEvents({ technologyId: "mobile-3g", kind: "shutdown" })[0].endYear).toBe(2024);
  });

  it("keeps reported stock, sales and card counts separate from rollouts", () => {
    for (const id of ["global-cooling-stock-2017", "electric-two-wheel-sales-2024", "offgrid-sales-2024", "polyester-production-2024", "suica-ten-million-2004"]) {
      const event = technologyHistory.events.find((entry) => entry.id === id)!;
      expect(event.kind).toBe("measurement");
      expect(event.values?.every((value) => value.unit && value.denominator.en && value.denominator.fi)).toBe(true);
    }
    const linky = technologyHistory.events.find((event) => event.id === "france-linky-2015-2021")!;
    expect(linky.values?.[0].value).toBe(34_300_000);
    expect(linky.endYear).toBe(2021);
    expect(linky.values?.[0].denominator.en).toContain("Enedis");
  });

  it("keeps household lighting policy dates separate from installed stock and street lighting", () => {
    const policyEvents = technologyHistory.events.filter((event) => event.id.startsWith("lighting-policy-"));
    expect(policyEvents.map((event) => event.startYear)).toEqual([2009, 2010, 2011, 2012, 2018, 2023]);
    for (const event of policyEvents) {
      expect(event.kind).toBe("standard");
      expect(event.technologyIds).toEqual(["indoor-lighting"]);
      expect(getHistorySources(event.sourceIds).every((source) => source.kind === "regulation")).toBe(true);
      expect(event.values?.some((value) => value.unit === "%")).not.toBe(true);
    }
  });

  it("rejects orphan references, duplicate identifiers and empty event provenance", () => {
    const orphan = copy();
    orphan.events[0].sourceIds = ["not-a-source"];
    orphan.technologies[0].sourceIds = ["not-a-source"];
    orphan.events[1].technologyIds = ["not-a-technology"];
    expect(validateTechnologyHistory(orphan).filter((error) => error.includes("unknown reference"))).toHaveLength(3);
    const duplicate = copy();
    duplicate.technologies.push(duplicate.technologies[0]);
    expect(validateTechnologyHistory(duplicate).some((error) => error.includes("duplicate ID"))).toBe(true);
    const unsourced = copy();
    unsourced.events[0].sourceIds = [];
    expect(validateTechnologyHistory(unsourced).some((error) => error.includes("at least one reference"))).toBe(true);
  });

  it("rejects incomplete translations, unsafe links and impossible dates", () => {
    const invalid = copy();
    invalid.technologies[0].historyGap.fi = " ";
    invalid.sources[0].url = "javascript:alert(1)";
    invalid.sources[1].accessed = "2026-02-31";
    invalid.sources[2].accessed = "2027-01-01";
    invalid.events[0].endYear = invalid.events[0].startYear - 1;
    const errors = validateTechnologyHistory(invalid);
    expect(errors.some((error) => error.includes("complete en and fi"))).toBe(true);
    expect(errors.some((error) => error.includes("HTTPS"))).toBe(true);
    expect(errors.filter((error) => error.includes(".accessed"))).toHaveLength(2);
    expect(errors.some((error) => error.includes("endYear"))).toBe(true);
    expect(validateTechnologyHistory({ ...technologyHistory, events: [null] }).some((error) => error.includes("expected an object"))).toBe(true);
  });

  it("rejects quantities without units or denominators", () => {
    const invalid = copy();
    const value = invalid.events.find((event) => event.values?.length)?.values?.[0];
    expect(value).toBeDefined();
    value!.unit = "";
    value!.denominator.en = "";
    value!.value = Number.NaN;
    const errors = validateTechnologyHistory(invalid);
    expect(errors.some((error) => error.includes("explicit unit"))).toBe(true);
    expect(errors.some((error) => error.includes("denominator"))).toBe(true);
    expect(errors.some((error) => error.includes("finite number"))).toBe(true);
  });
});

describe("technology history queries", () => {
  it("supports Finnish searches with diacritic folding and English fallback", () => {
    expect(queryTechnologies({ search: "sahkoaidat", locale: "fi" }).map((technology) => technology.id)).toEqual(["electric-fences"]);
    expect(queryTechnologies({ search: "electrolysis", group: "industry" }).map((technology) => technology.id)).toContain("electrolysis");
    expect(queryTechnologies({ search: "electrolysis", group: "home" })).toEqual([]);
    expect(getLocalizedText({ en: "Field", fi: "Kenttä" }, "ja")).toBe("Field");
  });

  it("filters interval overlaps, point events and combined geographic constraints", () => {
    const duringRollout = queryHistoryEvents({ technologyId: "smart-metering", regionId: "france", fromYear: 2019, toYear: 2019 });
    expect(duringRollout.map((event) => event.id)).toContain("france-linky-2015-2021");
    expect(duringRollout.map((event) => event.id)).not.toContain("linky-field-measurements-2016");
    const later = queryHistoryEvents({ technologyId: "vlf-radio", fromYear: 1925, toYear: 1925 });
    expect(later).toEqual([]); // A launch point is not an implied persistent exposure interval.
    expect(queryHistoryEvents({ technologyId: "missing-id" })).toEqual([]);
    expect(queryHistoryEvents({ fromYear: 2020, toYear: 2010 })).toEqual([]);
    const sorted = queryHistoryEvents();
    expect(sorted.map((event) => event.startYear)).toEqual(sorted.map((event) => event.startYear).sort((a, b) => a - b));
  });

  it("resolves real source IDs once without pretending unknown IDs are valid", () => {
    expect(getHistorySources(["cre-linky", "cre-linky", "missing"]).map((source) => source.id)).toEqual(["cre-linky"]);
    expect(getHistorySources(["cre-linky"])[0].url).toContain("cre.fr/");
    expect(getTechnologyById("not-a-technology")).toBeUndefined();
  });
});
