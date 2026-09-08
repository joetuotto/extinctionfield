import { describe, expect, it } from "vitest";
import {
  buildReconstructionTimeline, fieldReconstruction, getReconstructionCell,
  getReconstructionOperatingWindows, getReconstructionSources, getReconstructionTracks, validateFieldReconstruction,
} from "../field-reconstruction";

const copy = () => structuredClone(fieldReconstruction);

describe("historical source-environment reconstruction", () => {
  it("validates five countries, every family/gap and all provenance", () => {
    expect(validateFieldReconstruction(fieldReconstruction)).toEqual([]);
    for (const country of fieldReconstruction.countries) {
      expect(getReconstructionTracks(country.id)).toHaveLength(fieldReconstruction.families.length);
    }
    for (const anchor of fieldReconstruction.anchors) {
      expect(getReconstructionSources(anchor.sourceRefs)).toHaveLength(anchor.sourceRefs.length);
    }
  });

  it("keeps undocumented history unknown instead of assigning a zero dose or a launch year", () => {
    const cell = getReconstructionCell("FIN", "wifi", 2000);
    expect(cell.stage).toBe("unknown");
    expect(cell.phase).toBeNull();
    expect(cell.sourceRefs).toEqual([]);
    expect(cell).not.toHaveProperty("value");
    expect(getReconstructionCell("USA", "analog-cellular", 2015).stage).toBe("unknown");
    expect(getReconstructionCell("JPN", "analog-cellular", 2005).stage).toBe("unknown");
  });

  it("preserves actual source removals and independent overlapping families", () => {
    expect(getReconstructionCell("GBR", "terrestrial-tv", 1940).stage).toBe("retired");
    expect(getReconstructionCell("GBR", "radio-broadcast", 1940).stage).toBe("mixed");
    expect(getReconstructionCell("GBR", "terrestrial-tv", 1946).stage).not.toBe("retired");
    expect(getReconstructionCell("FIN", "analog-cellular", 2003).stage).toBe("retired");
    expect(getReconstructionCell("FIN", "digital-2g", 2003).stage).toBe("mixed");
    expect(getReconstructionCell("DEU", "mobile-3g", 2022).stage).toBe("retired");
    expect(getReconstructionCell("DEU", "mobile-4g", 2022).stage).toBe("mixed");
  });

  it("does not convert a legal deadline or a partial operator shutdown into nationwide source absence", () => {
    const amps = getReconstructionCell("USA", "analog-cellular", 2008);
    expect(amps.phase?.scopeKind).toBe("market-policy");
    expect(amps.stage).not.toBe("retired");
    expect(getReconstructionCell("GBR", "mobile-3g", 2024).stage).toBe("mixed");
    expect(getReconstructionCell("FIN", "mobile-3g", 2023).stage).toBe("mixed");
    expect(getReconstructionCell("FIN", "mobile-3g", 2024).stage).toBe("mixed");
    expect(getReconstructionCell("JPN", "digital-2g", 2013).note.en).toContain("DOCOMO");
  });

  it("retains country, operator and denominator differences instead of harmonising them silently", () => {
    const usTv = fieldReconstruction.anchors.find((row) => row.id === "us-tv-1950")!;
    expect(usTv.values?.[0].denominator.en).toContain("excludes Alaska/Hawaii");
    const tepco = fieldReconstruction.anchors.find((row) => row.id === "jp-smart-2014-2021")!;
    expect(tepco.values?.[0].denominator.en).toContain("TEPCO");
    const finNmt = fieldReconstruction.anchors.find((row) => row.id === "fin-nmt-1982")!;
    expect(finNmt.startYear).toBe(1982);
    expect(getReconstructionCell("FIN", "analog-cellular", 1981).stage).toBe("unknown");
    expect(getReconstructionCell("FIN", "mobile-4g", 2010).phase?.endYear).toBe(2011);
  });

  it("keeps lighting rules separate from measured adoption and model scenario onset windows", () => {
    const lighting = getReconstructionTracks("FIN").find((row) => row.familyId === "lighting-drivers")!;
    expect(lighting.phases.every((phase) => phase.scopeKind === "market-policy")).toBe(true);
    expect(lighting.scenarioWindows).toEqual([]);
    const metering = getReconstructionTracks("JPN").find((row) => row.familyId === "smart-metering")!;
    expect(metering.scenarioWindows[0]).toMatchObject({ earliestYear: 2014, latestYear: 2021 });
    expect(metering.scenarioWindows[0]).not.toHaveProperty("amplitude");
  });

  it("queries inclusive calendar years without interpolation and respects selected families", () => {
    const rows = buildReconstructionTimeline({ countryId: "FIN", fromYear: 1981, toYear: 1983, familyIds: ["analog-cellular"] });
    expect(rows).toHaveLength(1);
    expect(rows[0].cells.map((cell) => [cell.year, cell.stage])).toEqual([[1981, "unknown"], [1982, "documented"], [1983, "mixed"]]);
    expect(buildReconstructionTimeline({ countryId: "FIN", fromYear: 2000, toYear: 2000, familyIds: [] })).toEqual([]);
    expect(() => getReconstructionCell("FIN", "wifi", 2000.5)).toThrow(RangeError);
    expect(() => buildReconstructionTimeline({ countryId: "FIN", fromYear: 2024, toYear: 1900 })).toThrow(RangeError);
    expect(() => buildReconstructionTimeline({ countryId: "FIN", fromYear: 1000, toYear: 2024 })).toThrow(RangeError);
  });

  it("keeps operating-window interruptions and unresolved endings instead of extending to the present", () => {
    expect(getReconstructionOperatingWindows("GBR", "terrestrial-tv")).toEqual([
      { startYear: 1936, endYear: 1939 }, { startYear: 1946, endYear: 2024 },
    ]);
    expect(getReconstructionOperatingWindows("JPN", "analog-cellular")).toEqual([{ startYear: 1979, endYear: 1993 }]);
    expect(getReconstructionOperatingWindows("USA", "analog-cellular")).toEqual([{ startYear: 1983, endYear: 2007 }]);
    expect(getReconstructionOperatingWindows("USA", "digital-2g")).toEqual([{ startYear: 1996, endYear: 2001 }]);
    expect(getReconstructionOperatingWindows("FIN", "lighting-drivers")).toEqual([]);
    expect(getReconstructionOperatingWindows("FIN", "wifi")).toEqual([]);
  });

  it("keeps partial shutdown years explicit and includes reported adoption without assigning an onset", () => {
    expect(getReconstructionOperatingWindows("FIN", "analog-cellular")).toEqual([{ startYear: 1982, endYear: 2002 }]);
    expect(getReconstructionOperatingWindows("GBR", "analog-cellular")).toEqual([{ startYear: 1985, endYear: 2001 }]);
    expect(getReconstructionOperatingWindows("DEU", "mobile-3g")).toEqual([{ startYear: 2004, endYear: 2021 }]);
    expect(getReconstructionOperatingWindows("GBR", "smart-metering")).toEqual([{ startYear: 2012, endYear: 2024 }]);
    expect(getReconstructionCell("GBR", "analog-cellular", 2001).note.en).toContain("partial-year");
    expect(getReconstructionCell("GBR", "analog-cellular", 2002).stage).toBe("retired");
  });

  it("rejects overlapping intervals, orphan sources and geographic cross-linking", () => {
    const invalid = copy();
    invalid.tracks[0].phases[1].startYear = invalid.tracks[0].phases[0].endYear;
    invalid.tracks[0].phases[0].sourceRefs = ["reconstruction:missing"];
    invalid.tracks[0].phases[0].anchorIds = ["us-grid-1882"];
    expect(validateFieldReconstruction(invalid)).toEqual(expect.arrayContaining([
      expect.stringContaining("overlapping"), expect.stringContaining("unknown reference"), expect.stringContaining("scope mismatch"),
    ]));
  });

  it("rejects scenario windows detached from events and altered canonical event dates", () => {
    const invalid = copy();
    invalid.tracks.find((row) => row.scenarioWindows.length)!.scenarioWindows[0].earliestYear -= 10;
    invalid.anchors.find((row) => row.canonicalEventId)!.startYear += 1;
    const errors = validateFieldReconstruction(invalid);
    expect(errors.some((error) => error.includes("bounds must match"))).toBe(true);
    expect(errors.some((error) => error.includes("canonical event dates changed"))).toBe(true);
  });

  it("rejects unlabeled numeric denominators, missing translations and missing country-family gaps", () => {
    const invalid = copy();
    invalid.anchors.find((row) => row.values?.length)!.values![0].denominator.fi = "";
    invalid.families[0].morphology.waveform.fi = "";
    invalid.tracks.pop();
    const errors = validateFieldReconstruction(invalid);
    expect(errors.filter((error) => error.includes("en and fi required"))).toHaveLength(2);
    expect(errors.some((error) => error.includes("explicit track or gap"))).toBe(true);
  });

  it("rejects inserting field-amplitude values into historical phases", () => {
    const invalid = copy();
    Object.assign(invalid.tracks[0].phases[0], { amplitude: 0.7 });
    expect(validateFieldReconstruction(invalid).some((error) => error.includes("do not belong in historical phases"))).toBe(true);
  });
});
