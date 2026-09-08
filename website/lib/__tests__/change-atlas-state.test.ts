import { describe, it, expect } from "vitest";
import { parseAtlasState, serializeAtlasState, atlasCsvCell } from "../change-atlas-state";
describe("shareable atlas state", () => {
  it("round trips every selected dimension while preserving scenario parameters", () => {
    const params = new URLSearchParams("country=JPN&view=events&question=technology&from=1980&to=2015&year=2000&event=digital-3g&base=1990&metric=mobile_subscriptions&s_beta=0.2");
    const state = parseAtlasState(params);
    const serialized = serializeAtlasState(state, params);
    expect(parseAtlasState(serialized)).toEqual(state);
    expect(serialized.get("s_beta")).toBe("0.2");
    expect(serialized.get("edition")).toBe("2026-09-08");
  });
  it("bounds invalid dates and never accepts injected enum values", () => {
    const state = parseAtlasState(new URLSearchParams("country=ZZZ&from=2023&to=1900&year=-100&view=unknown&base=Infinity&event=bad%3Ctag%3E"));
    expect(state).toMatchObject({ country: "FIN", from: 2022, to: 2023, year: 2022, view: "change", baseline: 2022, eventFamily: "digital-2g" });
  });
  it("maps legacy source and sentinel links to useful atlas views", () => {
    expect(parseAtlasState(new URLSearchParams("tab=data")).view).toBe("sources");
    expect(parseAtlasState(new URLSearchParams("tab=sentinel"))).toMatchObject({ country: "GBR", question: "ecology" });
  });
  it("clamps initial event selection to the same window shown by the slider", () => {
    expect(parseAtlasState(new URLSearchParams("view=events&window=10&relative=30"))).toMatchObject({ window: 10, relative: 10 });
    expect(parseAtlasState(new URLSearchParams("view=events&window=5&relative=-30"))).toMatchObject({ window: 5, relative: -5 });
    expect(parseAtlasState(new URLSearchParams("view=events&window=15&relative=7"))).toMatchObject({ window: 15, relative: 7 });
  });
  it("escapes source strings and spreadsheet formula prefixes, preserving negative numbers", () => {
    expect(atlasCsvCell('a,"b"')).toBe('"a,""b"""');
    expect(atlasCsvCell("=WEBSERVICE(x)")).toBe('"\'=WEBSERVICE(x)"');
    expect(atlasCsvCell(-1.2)).toBe('"-1.2"');
  });
});
