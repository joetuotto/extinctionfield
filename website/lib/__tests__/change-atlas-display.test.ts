import { describe, expect, it } from "vitest";
import { getChangeAtlasSeries, getChangeAtlasSource, type ChangeAtlasSeries } from "../change-atlas-data";
import { atlasSelectionCsv, createAtlasSvg, indexAtlasSeries, visibleAtlasPoints } from "../change-atlas-display";
import { DEFAULT_BERM_ENDPOINT_PARAMETERS, runBermEndpointScenario } from "../berm-endpoint-scenario";
import { buildBermCalibratedAtlas } from "../berm-calibrated-atlas";

function sourceSeries(overrides: Partial<ChangeAtlasSeries> = {}): ChangeAtlasSeries {
  return {
    id: "ukbms-example", countryId: "GBR", datasetFamily: "ecology", metric: "butterfly_abundance",
    title: { fi: "Perhosen runsaus", en: "Butterfly abundance" },
    unit: "log10_index", unitLabel: { fi: "log10-indeksi", en: "log10 index" }, valueScale: "log10",
    status: "estimate", frequency: "annual", population: { fi: "UK", en: "UK" },
    sourceIds: ["ukbms"], method: { fi: "Alkuperäinen indeksi", en: "Original index" }, limitations: [],
    points: [
      { year: 1976, value: 1.8, lower: null, upper: null, nSites: 37, sourceId: "ukbms", sourceLocator: "CSV row 3780", imputed: false },
      { year: 1977, value: 1.7, lower: 1.6, upper: 1.8, nSites: 62, sourceId: "ukbms", sourceLocator: "CSV row 3781", imputed: false },
      { year: 1979, value: 1.9, lower: null, upper: null, nSites: 89, sourceId: "ukbms", sourceLocator: "CSV row 3783", imputed: false },
    ], ...overrides,
  };
}

/** The fixtures have no embedded line breaks; keep quoted commas and escaped quotes intact. */
function csvRecords(csv: string) {
  const rows = csv.replace(/^\uFEFF/, "").split("\r\n").map((line) => [...line.matchAll(/"((?:[^"]|"")*)"/g)].map((match) => match[1].replaceAll('""', '"')));
  return rows.slice(1).map((row) => Object.fromEntries(rows[0].map((key, i) => [key, row[i]])));
}

describe("atlas display transformations retain source meaning", () => {
  it("converts a log10 abundance difference exponentially, without dividing log values", () => {
    const derived = indexAtlasSeries(sourceSeries(), 1976)!;
    expect(derived.points[0].value).toBe(100);
    expect(derived.points[1].value).toBeCloseTo(79.43282347);
    expect(derived.points[2].value).toBeCloseTo(125.89254118);
    expect(derived.unit).toBe("relative_index");
    expect(derived.valueScale).toBe("linear");
    expect(derived.unitLabel.en).toBe("1976 = 100");
    expect(derived.method.en).toContain("100 × 10^(value − baseline value)");
  });

  it("rescales reported interval endpoints while retaining missing intervals and sample definitions", () => {
    const derived = indexAtlasSeries(sourceSeries(), 1976)!;
    expect(derived.points[0].lower).toBeNull();
    expect(derived.points[0].upper).toBeNull();
    expect(derived.points[1].lower).toBeCloseTo(63.09573445);
    expect(derived.points[1].upper).toBe(100);
    expect(derived.points[1].nSites).toBe(62);
    expect(derived.points[1].n).toBeUndefined();
  });

  it("requires the exact baseline year and preserves annual gaps", () => {
    expect(indexAtlasSeries(sourceSeries(), 1978)).toBeNull();
    const derived = indexAtlasSeries(sourceSeries(), 1976)!;
    expect(derived.points.map((point) => point.year)).toEqual([1976, 1977, 1979]);
    expect(derived.points.every((point) => point.imputed === false)).toBe(true);
  });

  it("accepts zero and negative log10 baselines, but rejects nonpositive linear baselines", () => {
    const points = sourceSeries().points;
    for (const value of [0, -1]) {
      const input = sourceSeries({ points: [{ ...points[0], value }, { ...points[1], value: value + 1 }] });
      expect(indexAtlasSeries(input, 1976)!.points[1].value).toBe(1000);
      expect(indexAtlasSeries({ ...input, valueScale: "linear", unit: "births_per_woman" }, 1976)).toBeNull();
    }
  });

  it("uses ordinary ratios for linear units and never rewrites the source object", () => {
    const input = sourceSeries({ valueScale: "linear", unit: "births_per_woman" });
    const before = structuredClone(input);
    const derived = indexAtlasSeries(input, 1976)!;
    expect(derived.points[1].value).toBeCloseTo(100 * 1.7 / 1.8);
    expect(derived.method.en).toContain("100 × value / baseline value");
    expect(input).toEqual(before);
    expect(derived.points).not.toBe(input.points);
    expect(derived.points[0].sourceLocator).toBe(input.points[0].sourceLocator);
  });

  it("does not turn a multiyear survey estimate into a baseline-year observation", () => {
    const input = sourceSeries({ frequency: "survey_period", points: [{ ...sourceSeries().points[0], year: 1976.5, startYear: 1976, endYear: 1977 }] });
    expect(indexAtlasSeries(input, 1976)).toBeNull();
    expect(indexAtlasSeries(input, 1976.5)).toBeNull();
    expect(visibleAtlasPoints(input, 1977, 1979)).toEqual([]);
    expect(visibleAtlasPoints(input, 1976, 1979)).toHaveLength(1);
  });
});

describe("atlas CSV export preserves observation provenance", () => {
  it("exports Finnish medians and their distribution percentiles without relabelling them as confidence intervals", () => {
    const original = getChangeAtlasSeries("FIN", "testosterone_total").find(s => s.id === "fi-finrisk-testosterone-60-69")!;
    const rows = csvRecords(atlasSelectionCsv([original], [original], 1950, 2023, "fi"));
    expect(rows).toHaveLength(2);
    expect(rows[0]).toMatchObject({
      country: "FIN", statistic: "median", interval_kind: "percentile_5_95", source_standard_error: "",
      year: "1977", period_start: "1977", period_end: "1977", collection_years_json: "[1977]",
      collection_year_basis: "unique-survey-age-cohort-intersection", source_value: "21.9", source_unit: "nmol_per_l",
      source_lower: "10.3", source_upper: "40.9", display_lower: "10.3", display_upper: "40.9", n: "130",
    });
    expect(rows[1]).toMatchObject({ source_value: "13.8", source_lower: "7.7", source_upper: "27.8", n: "23", collection_years_json: "[2002]" });
    expect(rows.every(row => row.interval_kind !== "confidence_95")).toBe(true);
  });

  it("preserves the Finnish pooled median's two collection years without turning its plotting midpoint into a survey", () => {
    const original = getChangeAtlasSeries("FIN", "testosterone_total").find(s => s.id === "fi-finrisk-testosterone-25-29")!;
    const rows = csvRecords(atlasSelectionCsv([original], [original], 1972, 1977, "en"));
    expect(rows).toHaveLength(1);
    expect(rows[0]).toMatchObject({ statistic: "median", year: "1974.5", period_start: "1972", period_end: "1977", collection_years_json: "[1972,1977]", collection_year_basis: "early-surveys-not-disaggregated", source_value: "26.4", interval_kind: "percentile_5_95" });
    expect(JSON.parse(rows[0].collection_years_json)).not.toContain(Number(rows[0].year));
    // A cropped view must not export a pooled observation whose period starts outside it.
    expect(csvRecords(atlasSelectionCsv([original], [original], 1973, 1977, "en"))).toEqual([]);
  });

  it("exports reported US standard errors with empty interval bounds rather than fabricating confidence intervals", () => {
    const original = getChangeAtlasSeries("USA", "testosterone_total").find(s => s.id === "us-nhanes-testosterone-15-39")!;
    const rows = csvRecords(atlasSelectionCsv([original], [original], 1999, 2016, "en"));
    expect(rows).toHaveLength(5);
    expect(rows.map(row => [row.source_value, row.source_standard_error])).toEqual([
      ["605.39", "21.01"], ["567.44", "17.23"], ["424.96", "7.7"], ["431.76", "7.19"], ["451.22", "10.03"],
    ]);
    for (const row of rows) expect(row).toMatchObject({ statistic: "arithmetic_mean", interval_kind: "standard_error", source_lower: "", source_upper: "", display_lower: "", display_upper: "", collection_year_basis: "reported-survey-period" });
    expect(rows[0]).toMatchObject({ year: "1999.5", period_start: "1999", period_end: "2000", collection_years_json: "[1999,2000]", source_unit: "ng_per_dl" });
    expect(rows.map(row => row.year)).not.toContain("2007.5");
  });

  it("exports displayed values beside original values, original scale and exact source rows", () => {
    const original = sourceSeries();
    const displayed = indexAtlasSeries(original, 1976)!;
    const csv = atlasSelectionCsv([displayed], [original], 1976, 1977, "en");
    const rows = csvRecords(csv);
    expect(csv.startsWith("\uFEFF")).toBe(true);
    expect(rows).toHaveLength(2);
    expect(rows[0]).toMatchObject({ display_value: "100", display_unit: "1976 = 100", source_value: "1.8", source_unit: "log10_index", source_scale: "log10", source_id: "ukbms", source_locator: "CSV row 3780", n_sites: "37", n: "", source_lower: "", source_upper: "" });
    expect(Number(rows[1].display_value)).toBeCloseTo(79.43282347);
    expect(rows[1].source_value).toBe("1.7");
    expect(rows[1].source_lower).toBe("1.6");
    expect(rows[1].source_upper).toBe("1.8");
    expect(Number(rows[1].display_lower)).toBeCloseTo(63.09573445);
    expect(rows[1].method).toContain("baseline year 1976");
  });

  it("retains survey periods as single rows rather than emitting annual estimates", () => {
    const original = sourceSeries({ frequency: "survey_period", points: [{ ...sourceSeries().points[0], year: 1976.5, startYear: 1976, endYear: 1977, period: { fi: "elo 1976–elo 1977", en: "August 1976–August 1977" }, n: 900, nSites: undefined }] });
    const rows = csvRecords(atlasSelectionCsv([original], [original], 1976, 1979, "fi"));
    expect(rows).toHaveLength(1);
    expect(rows[0]).toMatchObject({ year: "1976.5", period_start: "1976", period_end: "1977", period: "elo 1976–elo 1977", n: "900", n_sites: "" });
  });

  it("retains quoted source text and numeric decimal points in Finnish exports", () => {
    const original = sourceSeries({ method: { fi: 'Julkaistu taulukko, "alkuperäinen"', en: "Published table" } });
    const rows = csvRecords(atlasSelectionCsv([original], [original], 1976, 1976, "fi"));
    expect(rows[0].source_value).toBe("1.8");
    expect(rows[0].method).toBe('Julkaistu taulukko, "alkuperäinen"');
  });

  it("requires original source records rather than relabelling displayed values as raw data", () => {
    const original = sourceSeries();
    const displayed = indexAtlasSeries(original, 1976)!;
    expect(() => atlasSelectionCsv([displayed], [], 1976, 1979, "en")).toThrow(/Original source series/);
    expect(() => atlasSelectionCsv([displayed], [displayed], 1976, 1979, "en")).toThrow(/Original source series/);
    expect(() => atlasSelectionCsv([displayed], [{ ...original, points: original.points.slice(0, 1) }], 1976, 1979, "en")).toThrow(/Original source observation/);
    expect(() => atlasSelectionCsv([displayed], [{ ...original, points: original.points.map(p => ({ ...p, sourceLocator: "another edition" })) }], 1976, 1979, "en")).toThrow(/Original source observation/);
  });

  it("exports each country's visible event window with calendar and relative years", () => {
    const uk = sourceSeries();
    const us = sourceSeries({ id: "us-example", countryId: "USA" });
    const withoutEvent = sourceSeries({ id: "jp-example", countryId: "JPN" });
    const all = [uk, us, withoutEvent];
    const rows = csvRecords(atlasSelectionCsv(all, all, 2000, 2001, "en", {
      GBR: { onset: 1976, window: 1 }, USA: { onset: 1979, window: 0 },
    }));
    expect(rows).toHaveLength(3);
    expect(rows.map(row => [row.country, row.year, row.event_onset_year, row.event_relative_year])).toEqual([
      ["GBR", "1976", "1976", "0"], ["GBR", "1977", "1976", "1"], ["USA", "1979", "1979", "0"],
    ]);
    expect(csvRecords(atlasSelectionCsv(all, [], 1976, 1979, "en", {}))).toEqual([]);
  });

  it("preserves full survey periods and their relative bounds in event exports", () => {
    const original = sourceSeries({ frequency: "survey_period", points: [{ ...sourceSeries().points[0], year: 1976.5, startYear: 1976, endYear: 1977, period: { fi: "1976–1977", en: "1976–1977" } }] });
    const rows = csvRecords(atlasSelectionCsv([original], [original], 2000, 2001, "en", { GBR: { onset: 1977, window: 1 } }));
    expect(rows).toHaveLength(1);
    expect(rows[0]).toMatchObject({ year: "1976.5", period_start: "1976", period_end: "1977", event_relative_year: "-0.5", event_relative_start: "-1", event_relative_end: "0" });
    expect(csvRecords(atlasSelectionCsv([original], [original], 2000, 2001, "en", { GBR: { onset: 1977, window: 0 } }))).toEqual([]);
  });

  it("rejects invalid event windows instead of exporting an unintended time range", () => {
    const original = sourceSeries();
    for (const event of [{ onset: NaN, window: 5 }, { onset: 1976, window: -1 }, { onset: 1976, window: 0.5 }]) {
      expect(() => atlasSelectionCsv([original], [original], 1976, 1979, "en", { GBR: event })).toThrow(RangeError);
    }
    expect(csvRecords(atlasSelectionCsv([original], [original], 1976, 1976, "en"))[0].event_onset_year).toBe("");
  });
});

describe("atlas figure export follows visible disclosure state", () => {
  it("includes open figures but excludes hidden and collapsed charts", () => {
    const root = document.createElement("div");
    const chart = (label: string) => `<figure><figcaption>${label}</figcaption><svg viewBox="0 0 600 190"><title>${label}</title><circle cx="20" cy="20" r="3" /></svg></figure>`;
    root.innerHTML = `${chart("Visible annual series")}<details><summary>More</summary>${chart("Collapsed age series")}</details><details open><summary>Open</summary>${chart("Expanded age series")}</details><div hidden>${chart("Hidden figure")}</div>`;
    document.body.append(root);
    try {
      const svg = createAtlasSvg(root, "Selected view", { country: "FIN" });
      expect(svg).toContain("Visible annual series");
      expect(svg).toContain("Expanded age series");
      expect(svg).not.toContain("Collapsed age series");
      expect(svg).not.toContain("Hidden figure");
      const exported = new DOMParser().parseFromString(svg, "image/svg+xml");
      expect(exported.querySelector("parsererror")).toBeNull();
      expect(JSON.parse(exported.querySelector("metadata")!.textContent!)).toEqual({ country: "FIN" });
    } finally { root.remove(); }
  });

  it("reports no visible charts when all figures are collapsed", () => {
    const root = document.createElement("div");
    root.innerHTML = '<details><summary>More</summary><figure><svg viewBox="0 0 600 190"><title>Hidden series</title></svg></figure></details>';
    expect(() => createAtlasSvg(root, "View", {})).toThrow("No charts in the current view");
  });
});

/** Parse the actual standalone artifact; the footer is rasterized with the charts in PNG. */
function exportedFigure(metadata: unknown, lang = "en") {
  const root = document.createElement("div");
  root.lang = lang;
  root.style.color = "rgb(25, 35, 45)";
  root.innerHTML = '<figure><figcaption>Annual observations</figcaption><svg viewBox="0 0 600 190"><title>Observed values</title><circle cx="20" cy="20" r="3" /></svg></figure>';
  document.body.append(root);
  try {
    const svg = createAtlasSvg(root, "Atlas & sources", metadata);
    const parsed = new DOMParser().parseFromString(svg, "image/svg+xml");
    expect(parsed.querySelector("parsererror")).toBeNull();
    return parsed;
  } finally { root.remove(); }
}

describe("atlas image export retains visible provenance", () => {
  it.each(["en", "fi"] as const)("prints actual locked calibration gains, periods, reference inputs and protocol links in the %s image footer", locale => {
    const observations = getChangeAtlasSeries("USA").filter(series => series.metric === "tfr" || series.id === "us-nhanes-testosterone-15-39");
    const referenceQuery = "ep_halfLife=17&s_lagYears=2&s_memoryYears=4&s_amp_electric-grid=0.6&s_angle_electric-grid=30";
    const query = new URLSearchParams({ forecast: "1", ep_reference: referenceQuery, ep_halfLife: "9", "s_amp_electric-grid": "1.1", ep_throughF: "2000", ep_throughT: "2016" });
    const result = buildBermCalibratedAtlas(query.toString(), "USA", observations);
    expect(result?.error).toBe("");
    if (!result?.scenario || !result.reference) throw new Error("Expected a real calibration and reference scenario");
    expect(result.inputsChanged).toBe(true);
    expect(result.calibrations).toHaveLength(2);
    const inputParameters = (parameters: typeof DEFAULT_BERM_ENDPOINT_PARAMETERS) => Object.fromEntries(Object.entries(parameters).filter(([key]) => key !== "betaF" && key !== "betaT"));
    const endpointPrediction = {
      kind: "conditionally_calibrated_BERM_endpoints", model: "BERM", formulation: "2025-weyl-gme", countryId: "USA",
      parameters: inputParameters(result.scenario.parameters), displayedModes: ["annual", "accumulated", "combined"],
      scenario: { ...result.scenario, parameters: inputParameters(result.scenario.parameters) },
      sources: result.sources, dataSources: result.dataSources,
      calibrationReference: { query: referenceQuery, parameters: inputParameters(result.reference.parameters), sources: result.referenceSources },
      calibrations: result.calibrations, inputsChanged: result.inputsChanged,
    };
    const metadata = { edition: "2026-09-08", locale, selections: { country: "USA", view: "change", from: 1950, to: 2023, year: 2016, baseline: null },
      sources: observations.flatMap(series => series.sourceIds.map(id => getChangeAtlasSource(id)!)), endpointPrediction };
    const parsed = exportedFigure(metadata, locale);
    const embedded = JSON.parse(parsed.querySelector("metadata")!.textContent!);
    expect(embedded.endpointPrediction).toEqual(JSON.parse(JSON.stringify(endpointPrediction)));
    const footer = parsed.querySelector('[data-atlas-export-footer="true"]')!;
    const text = footer.textContent!;
    expect(text).toContain(locale === "fi" ? "sarjakohtaisesti kalibroitu ehdollinen vastesulku" : "series-specific calibrated conditional response closure");
    expect(text).not.toContain("gains are not fitted");
    expect(text).not.toContain("herkkyyksiä ei soviteta");
    expect(text).not.toContain("channel change from baseline");
    expect(text).not.toContain("kanavan muutos lähtötilasta");
    expect(text).toContain("Y(t)=exp(logScale−β S(t))");
    expect(text).toContain(JSON.stringify(endpointPrediction.parameters));
    expect(text).toContain(JSON.stringify(endpointPrediction.calibrationReference.parameters));
    expect(text).toContain(referenceQuery);
    expect(text).toContain(`${locale === "fi" ? "Ennusteen syötteitä muutettu kalibroinnista" : "Prediction inputs changed since calibration"}: true`);
    expect(text).toContain(JSON.stringify(result.scenario.assumptions));
    for (const entry of result.calibrations) {
      expect(text).toContain(`${entry.seriesId}: ${locale === "fi" ? "kalibrointiraja" : "calibration cutoff"} ${entry.throughYear}`);
      expect(text).toContain(`${entry.fit.included.length} ${locale === "fi" ? "sovitusjaksoa" : "calibration periods"}, ${entry.fit.heldOut.length} ${locale === "fi" ? "myöhempää vertailujaksoa" : "later comparison periods"}`);
      expect(text).toContain(JSON.stringify(entry.fit.baseline));
      for (const fit of Object.values(entry.fit.channels)) {
        expect(fit.status).toBe("calibrated");
        expect(text).toContain(`beta=${fit.beta}; logScale=${fit.logScale}`);
        expect(text).toContain(JSON.stringify(fit.search));
      }
      if (entry.protocol) {
        expect(text).toContain(entry.protocol.id);
        expect(text).toContain(entry.protocol.scope[locale]);
        expect(text).toContain(JSON.stringify(entry.protocol.eligiblePeriods));
        for (const source of entry.protocol.sources) {
          const canonicalCitation = [...metadata.sources, ...result.dataSources].find(candidate => candidate.url === source.url);
          expect(text).toContain(canonicalCitation?.title ?? source.title);
          expect(text).toContain(source.url);
        }
      }
    }
    expect(result.calibrations.find(entry => entry.seriesId === "usa-tfr")!.fit.heldOut).toHaveLength(23);
    for (const source of result.referenceSources) {
      expect(text).toContain(`${locale === "fi" ? "Kalibroinnin lähdeprofiili" : "Calibration source profile"}: ${source.driverSeriesId}; enabled=${source.enabled}; amplitude=${source.amplitude}; angleDegrees=${source.angleDegrees}`);
      expect(text).toContain(`transform=${source.profileTransform}; edges=${source.profileOutside}; windows=${JSON.stringify(source.windows)}`);
    }
    expect(text).toContain("amplitude=0.6; angleDegrees=30");
    expect(text).toContain("amplitude=1.1;");
    const last = [...footer.querySelectorAll("text")].at(-1)!;
    const lastBaseline = Number(last.getAttribute("y")) + 15 * (last.querySelectorAll("tspan").length - 1);
    expect(Number(parsed.documentElement.getAttribute("height"))).toBeGreaterThan(lastBaseline + 10);
  });

  it.each(["en", "fi"])("prints the full endpoint experiment, unknown initial stock, source mappings and anchors in the %s figure footer", (locale) => {
    const parameters = {
      ...DEFAULT_BERM_ENDPOINT_PARAMETERS, initialStock: null, historyStartYear: 1880,
      coherence: 0.2, halfLifeYears: 17, annualWeight: 0.7, historyWeight: 0.03,
      betaF: 0.12, betaT: -0.08,
    };
    const sources = [{
      id: "smart-metering", driverSeriesId: "fixture-meter-share", enabled: true, amplitude: 0.4, angleDegrees: 35,
      startYear: 1880, endYear: 2023, windows: [{ startYear: 1880, endYear: 1939 }, { startYear: 1946, endYear: 2023 }],
      profile: [{ year: 1900, value: 0.1 }, { year: 2000, value: 0.8 }], profileMode: "step" as const, profileStep: "previous" as const,
      profileTransform: "sqrt" as const, profileOutside: "hold" as const,
      scope: { fi: "Mittariosuus lähteen rajatussa perusjoukossa", en: "Meter share in the source-defined population" },
      reference: { fi: "Normalisointi: 100 % perusjoukon mittareista", en: "Normalization: 100% of population meters" },
    }, {
      id: "single-year-fixture", driverSeriesId: "fixture-single-year", enabled: false, amplitude: 0.25, angleDegrees: 90,
      startYear: 2000, endYear: 2000, windows: [{ startYear: 2000, endYear: 2000 }],
      profile: [{ year: 2000, value: 0.2 }], profileMode: "linear" as const, profileStep: "previous" as const,
      profileTransform: "sqrt" as const, profileOutside: "unknown" as const,
      scope: { fi: "Yksi havaintovuosi", en: "One observation year" },
      reference: { fi: "Normalisointi: julkaistu nimittäjä", en: "Normalization: published denominator" },
    }];
    const scenario = runBermEndpointScenario(sources, parameters, 1950, 2023);
    const hormone = getChangeAtlasSeries("FIN", "testosterone_total").find(s => s.id === "fi-finrisk-testosterone-60-69")!;
    const hormoneSource = getChangeAtlasSource(hormone.sourceIds[0])!;
    const notes = [{
      id: hormone.id, label: hormone.title[locale as "fi" | "en"],
      note: locale === "fi" ? "Ankkuri: 1977, mediaani 21,9 nmol/l; aiemmat vuodet ovat takaisinlaskentaa." : "Anchor: 1977, median 21.9 nmol/L; earlier values are backcasts.",
    }];
    const endpointPrediction = {
      kind: "conditional_BERM_annual_and_accumulated_endpoints", model: "BERM", formulation: "2025-weyl-gme",
      parameters, countryId: "FIN", displayedModes: ["annual", "accumulated", "combined"], scenario, sources, notes,
      dataSources: [{ id: "fixture-source", title: "EIA metering source for export fixture", url: "https://www.eia.gov/electricity/annual/html/epa_10_05.html" }],
    };
    const metadata = { edition: "2026-09-08", locale, sources: [hormoneSource], endpointPrediction };
    const parsed = exportedFigure(metadata, locale);
    const embedded = JSON.parse(parsed.querySelector("metadata")!.textContent!);
    expect(embedded.endpointPrediction).toEqual(endpointPrediction);
    expect(embedded.endpointPrediction.parameters.initialStock).toBeNull();
    expect(embedded.endpointPrediction.scenario.assumptions).toMatchObject({ initialStockYear: 1879, initialStock: null, prehistory: "unknown", historyStartYear: 1880 });
    // Everything below is checked in rendered text, which also survives SVG → PNG.
    const footer = parsed.querySelector('[data-atlas-export-footer="true"]')!;
    const text = footer.textContent!;
    expect(text).toContain(JSON.stringify(parameters));
    expect(text).toContain(JSON.stringify(scenario.assumptions));
    expect(text).toContain('"initialStock":null');
    expect(text).not.toContain('"initialStock":0');
    expect(text).toContain("annual,accumulated,combined");
    expect(text).toContain("C(t) = λ C(t−1) + U(t) × 1 yr");
    for (const source of sources) {
      for (const expected of [source.id, `enabled=${source.enabled}`, `amplitude=${source.amplitude}`, `angleDegrees=${source.angleDegrees}`, source.scope[locale as "fi" | "en"], source.reference[locale as "fi" | "en"], `transform=${source.profileTransform}`, `edges=${source.profileOutside}`, JSON.stringify(source.windows)]) expect(text).toContain(expected);
    }
    expect(text).toContain(notes[0].label);
    expect(text).toContain(notes[0].note);
    for (const source of [hormoneSource, ...endpointPrediction.dataSources]) {
      expect(text).toContain(source.title);
      expect(text).toContain(source.url);
    }
    const last = [...footer.querySelectorAll("text")].at(-1)!;
    const finalBaseline = Number(last.getAttribute("y")) + 15 * (last.querySelectorAll("tspan").length - 1);
    expect(Number(parsed.documentElement.getAttribute("height"))).toBeGreaterThan(finalBaseline + 10);
  });

  it("prints settings, data and selected history sources with full wrapped URLs and attribution", () => {
    const url = `https://example.org/original/${"a-long-source-locator-".repeat(18)}?country=GBR&edition=2024`;
    const metadata = {
      edition: "2026-09-08", selections: { country: "GBR", view: "events", from: 1950, to: 2023, year: 1980, baseline: 1976, eventFamily: "digital-2g", window: 20, relative: -3 },
      displayedSeries: [{ id: "ukbms-example", unit: "relative_index", unitLabel: { fi: "1976 = 100", en: "1976 = 100" } }],
      fieldReconstruction: { updatedAt: "2026-09-07" },
      sources: [{ id: "butterflies", title: "Abundance <index> & monitored sites", url, attribution: "© Original data providers; retain full attribution.", license: "CC BY 4.0" }],
      fieldSources: [{ id: "history", title: "Original broadcasting chronology", url: "https://example.org/history?region=GBR&year=1946" }, { id: "duplicate", title: "Duplicate source", url }],
    };
    const parsed = exportedFigure(metadata);
    const footer = parsed.querySelector('[data-atlas-export-footer="true"]')!;
    expect(footer).not.toBeNull();
    const text = footer.textContent!;
    for (const expected of ["Data edition: 2026-09-08", "Selected country: GBR", "View: events", "Calendar range: 1950–2023", "Selected year: 1980", "Shared baseline year: 1976", "Technology-history edition: 2026-09-07", "Event: digital-2g", "Window: ±20 years", "Selected event-relative year: -3", "ukbms-example: 1976 = 100", metadata.sources[0].title, url, metadata.sources[0].attribution, "Licence: CC BY 4.0", metadata.fieldSources[0].title, metadata.fieldSources[0].url]) expect(text).toContain(expected);
    expect(text).not.toContain("Duplicate source");
    const citation = [...footer.querySelectorAll("text")].find(node => node.textContent!.includes(url))!;
    expect(citation.querySelectorAll("tspan").length).toBeGreaterThan(3);
    expect(citation.textContent).toBe(`1. ${metadata.sources[0].title} — ${url}`);
    expect(parsed.documentElement.textContent).toContain("Sources and view settings below; full provenance in SVG metadata");
    expect(JSON.parse(parsed.querySelector("metadata")!.textContent!)).toEqual(metadata);
    // The canvas contains the last footer line, rather than clipping it below the figures.
    const last = [...footer.querySelectorAll("text")].at(-1)!;
    const lastBaseline = Number(last.getAttribute("y")) + 15 * (last.querySelectorAll("tspan").length - 1);
    expect(Number(parsed.documentElement.getAttribute("height"))).toBeGreaterThan(lastBaseline + 10);
    expect(parsed.documentElement.getAttribute("viewBox")).toBe(`0 0 1100 ${parsed.documentElement.getAttribute("height")}`);
  });

  it.each(["object", "json"])("makes %s scenario assumptions visible while retaining computed points in metadata", (encoding) => {
    const scenario = {
      kind: "conditional_uncalibrated_BERM_sensitivity", formulation: "2025-weyl-gme", normalization: "kappa=1; e=(0,1,0,0)", baselineYear: 1950,
      parameters: { background: 1, coherence: 0.2, meanFraction: 0, rampYears: 8, lagYears: 3, memoryYears: 5, beta: 0.15 },
      sourceWindowRule: "Known operating windows only; ramp restarts after a documented interruption.",
      sources: [{ id: "broadcast-tv", enabled: true, amplitude: 0.5, angleDegrees: 90, startYear: 1936, endYear: 2024, windows: [{ startYear: 1936, endYear: 1939 }, { startYear: 1946, endYear: 2024 }] }],
      points: [{ year: 1950, sourceLocator: "full-computed-point-only-in-metadata", value: 0 }],
    };
    const metadata = { edition: "2026-09-08", scenario: encoding === "json" ? JSON.stringify(scenario) : scenario };
    const parsed = exportedFigure(metadata);
    const text = parsed.querySelector('[data-atlas-export-footer="true"]')!.textContent!;
    for (const expected of ["conditional sensitivity calculation", "biological calibration remains open", "2025-weyl-gme", "Scenario baseline year: 1950", "kappa=1; e=(0,1,0,0)", "rampYears=8", "coherence=0.2", "beta=0.15", "lags 3–8 years inclusive (6 annual samples)", "exp(−β × response change from baseline)", "every age-specific fertility rate", scenario.sourceWindowRule, "broadcast-tv: enabled; amplitude=0.5; angleDegrees=90; windows: 1936–1939, 1946–2024"]) expect(text).toContain(expected);
    expect(text).not.toContain("full-computed-point-only-in-metadata");
    expect(JSON.parse(parsed.querySelector("metadata")!.textContent!)).toEqual(metadata);
  });

  it("preserves free-text scenario assumptions and selects Finnish from the enclosing document", () => {
    const assumptions = 'A = 0.5; käyttäjän ehto <kokeilu> & toinen ehto.';
    const parsed = exportedFigure({ edition: "2026-09-08", selections: { country: "FIN", view: "berm", baseline: null }, scenario: assumptions }, "fi-FI");
    const text = parsed.querySelector('[data-atlas-export-footer="true"]')!.textContent!;
    expect(text).toContain("Aineistoversio: 2026-09-08");
    expect(text).toContain("Valittu maa: FIN");
    expect(text).toContain("Yhteinen vertailuvuosi: ei valittu");
    expect(text).toContain(`Skenaario-oletukset: ${assumptions}`);
    expect(parsed.documentElement.textContent).toContain("Lähteet ja näkymän asetukset kuvan alla");
  });

  it("wraps wide-character citations without dropping characters or using ellipses", () => {
    const title = "日本の原資料".repeat(35);
    const parsed = exportedFigure({ sources: [{ title, url: "https://example.jp/original" }] });
    const citation = [...parsed.querySelectorAll('[data-atlas-export-footer="true"] text')].find(node => node.textContent!.includes(title))!;
    expect(citation.textContent).toBe(`1. ${title} — https://example.jp/original`);
    expect(citation.querySelectorAll("tspan").length).toBeGreaterThan(3);
    expect([...citation.querySelectorAll("tspan")].every(node => Array.from(node.textContent!).filter(char => /[日本の原資料]/u.test(char)).length <= 67)).toBe(true);
  });
});
