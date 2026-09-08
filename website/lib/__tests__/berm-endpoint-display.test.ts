import { describe, expect, it } from "vitest";
import { endpointDisplayValue, parseBermEndpointDisplay, selectAtlasTestosteroneSeries } from "../berm-endpoint-display";
import { getChangeAtlasSeries, type ChangeAtlasSeries } from "../change-atlas-data";
import { DEFAULT_BERM_ENDPOINT_PARAMETERS, validateBermEndpointParameters } from "../berm-endpoint-scenario";
import { indexAtlasSeries } from "../change-atlas-display";

describe("endpoint display controls preserve model and source boundaries", () => {
  it("starts with the fixed historical origin and exposes the two illustrative gains independently", () => {
    const parsed = parseBermEndpointDisplay(new URLSearchParams());
    expect(parsed.parameters).toEqual(DEFAULT_BERM_ENDPOINT_PARAMETERS);
    expect(parsed).toMatchObject({ enabled: false, compareChannels: false, fertilityBaselineYear: 1950 });
    expect(validateBermEndpointParameters(parsed.parameters)).toBe(true);
    const explicit = parseBermEndpointDisplay(new URLSearchParams("forecast=1&ep_compare=1&ep_mode=annual&ep_betaF=-0.3&ep_betaT=0.6&ep_halfLife=0&ep_initial=unknown"));
    expect(explicit).toMatchObject({ enabled: true, compareChannels: true,
      parameters: { mode: "annual", betaF: -0.3, betaT: 0.6, halfLifeYears: 0, initialStock: null, historyStartYear: 1880 } });
  });

  it("honours the explicit fertility gain over legacy beta without using either for testosterone", () => {
    const legacy = parseBermEndpointDisplay(new URLSearchParams("s_beta=0.7&s_lagYears=7&s_memoryYears=2"));
    expect(legacy.parameters).toMatchObject({ betaF: 0.7, betaT: 0.15, lagYears: 7, memoryYears: 2 });
    const separate = parseBermEndpointDisplay(new URLSearchParams("s_beta=0.7&ep_betaF=0&ep_betaT=-0.4"));
    expect(separate.parameters).toMatchObject({ betaF: 0, betaT: -0.4 });
    expect(separate.parameters).not.toHaveProperty("beta");
  });

  it("rejects nonfinite, unsupported, out-of-range and fractional baseline inputs", () => {
    const invalid = parseBermEndpointDisplay(new URLSearchParams("ep_mode=unknown&ep_betaF=Infinity&ep_betaT=-2&ep_halfLife=-1&ep_annualWeight=NaN&ep_historyWeight=2&ep_initialStock=999&ep_baseF=1950.5&forecast=true&ep_compare=true"));
    expect(invalid.parameters).toEqual(DEFAULT_BERM_ENDPOINT_PARAMETERS);
    expect(invalid).toMatchObject({ fertilityBaselineYear: 1950, enabled: false, compareChannels: false });
    expect(parseBermEndpointDisplay(new URLSearchParams("ep_betaF=%20&ep_initialStock=-3&ep_baseF=1977")).parameters)
      .toMatchObject({ betaF: 0.15, initialStock: -3 });
  });

  it("does not let view, year, country or a spurious origin query reset model history", () => {
    const full = parseBermEndpointDisplay(new URLSearchParams("from=1950&to=2023&year=2002&country=FIN&ep_baseF=1977&ep_mode=accumulated"));
    const cropped = parseBermEndpointDisplay(new URLSearchParams("from=2000&to=2010&year=2002&country=USA&ep_baseF=1977&ep_mode=accumulated&historyStartYear=2000"));
    expect(cropped).toEqual(full);
    expect(cropped.parameters.historyStartYear).toBe(1880);
  });

  it("selects a requested hormone series only from the supplied country's hormone observations", () => {
    const fin = getChangeAtlasSeries("FIN");
    expect(selectAtlasTestosteroneSeries(fin, null)?.id).toBe("fi-finrisk-testosterone-60-69");
    expect(selectAtlasTestosteroneSeries(fin, "fi-finrisk-testosterone-25-29")?.id).toBe("fi-finrisk-testosterone-25-29");
    expect(selectAtlasTestosteroneSeries(fin, "fin-tfr")?.metric).toBe("testosterone_total");
    expect(selectAtlasTestosteroneSeries(fin, "us-nhanes-testosterone-15-39")?.countryId).toBe("FIN");
    expect(selectAtlasTestosteroneSeries(getChangeAtlasSeries("DEU"), null)).toBeUndefined();
  });

  it("uses exactly the source observation's index denominator without re-anchoring the BERM model", () => {
    const raw = getChangeAtlasSeries("FIN", "tfr")[0];
    const base = raw.points.find(point => point.year === 2000)!.value;
    const shown = indexAtlasSeries(raw, 2000)!;
    expect(endpointDisplayValue(base * 0.8, raw, shown, 2000)).toBeCloseTo(80);
    expect(endpointDisplayValue(base * 0.8, raw, raw, null)).toBeCloseTo(base * 0.8);
    expect(endpointDisplayValue(null, raw, shown, 2000)).toBeNull();
    expect(endpointDisplayValue(1, raw, shown, 1880)).toBeNull();
    const zero: ChangeAtlasSeries = { ...raw, points: [{ ...raw.points[0], year: 2000, value: 0 }] };
    expect(endpointDisplayValue(1, zero, shown, 2000)).toBeNull();
  });

  it("does not fabricate an annual index anchor or a cross-unit conversion for hormone periods", () => {
    const hormone = getChangeAtlasSeries("USA", "testosterone_total").find(s => s.testosteroneTrendId)!;
    const indexed: ChangeAtlasSeries = { ...hormone, unit: "relative_index" };
    expect(endpointDisplayValue(500, hormone, indexed, 1999)).toBeNull();
    expect(endpointDisplayValue(500, hormone, { ...hormone, unit: "nmol_per_l" }, null)).toBeNull();
    expect(endpointDisplayValue(500, hormone, hormone, null)).toBe(500);
  });

  it("keeps nonfinite inputs and an overflowing index transformation unavailable", () => {
    const raw = getChangeAtlasSeries("FIN", "tfr")[0];
    const shown = indexAtlasSeries(raw, 2000)!;
    expect(endpointDisplayValue(1e307, raw, shown, 2000)).toBeNull();
    expect(endpointDisplayValue(Infinity, raw, raw, null)).toBeNull();
    expect(endpointDisplayValue(NaN, raw, shown, 2000)).toBeNull();
  });
});
