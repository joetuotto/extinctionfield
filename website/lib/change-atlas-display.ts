import type { ChangeAtlasSeries } from "./change-atlas-data";
import { atlasCsvCell } from "./change-atlas-state";

export function atlasText(value: { fi: string; en: string }, locale: string): string { return locale === "fi" ? value.fi : value.en; }
export function atlasNumber(value: number, locale: string, digits = 2): string {
  return new Intl.NumberFormat(locale === "fi" ? "fi-FI" : "en-GB", { maximumFractionDigits: digits }).format(value);
}
/** Exact observed baseline only; no nearest-year replacement or annual interpolation. */
export function indexAtlasSeries(series: ChangeAtlasSeries, baseline: number): ChangeAtlasSeries | null {
  if (series.frequency !== "annual") return null;
  const base = series.points.find(p => p.year === baseline);
  if (!base || (series.valueScale !== "log10" && base.value <= 0)) return null;
  const convert = (v: number) => series.valueScale === "log10" ? 100 * 10 ** (v - base.value) : 100 * v / base.value;
  return {
    ...series, valueScale: "linear", unit: "relative_index",
    unitLabel: { fi: `${baseline} = 100`, en: `${baseline} = 100` },
    method: { fi: `${series.method.fi} Näytön muunnos: ${series.valueScale === "log10" ? "100 × 10^(arvo − vertailuarvo)" : "100 × arvo / vertailuarvo"}, vertailuvuosi ${baseline}.`, en: `${series.method.en} Display transformation: ${series.valueScale === "log10" ? "100 × 10^(value − baseline value)" : "100 × value / baseline value"}, baseline year ${baseline}.` },
    points: series.points.map(p => ({ ...p, value: convert(p.value), lower: p.lower === null ? null : convert(p.lower), upper: p.upper === null ? null : convert(p.upper) })),
  };
}
export function visibleAtlasPoints(series: ChangeAtlasSeries, from: number, to: number) {
  return series.points.filter(p => (p.startYear ?? p.year) >= from && (p.endYear ?? p.year) <= to);
}
export interface AtlasEventWindow { onset: number; window: number }
export function atlasSelectionCsv(series: ChangeAtlasSeries[], originals: ChangeAtlasSeries[], from: number, to: number, locale: string, eventWindows?: Record<string, AtlasEventWindow>): string {
  const headers = ["series_id", "country", "metric", "dataset_family", "status", "year", "period_start", "period_end", "period", "display_value", "display_unit", "display_lower", "display_upper", "source_value", "source_unit", "source_lower", "source_upper", "source_scale", "n", "n_sites", "source_id", "source_locator", "method", "edition", "event_onset_year", "event_relative_year", "event_relative_start", "event_relative_end"];
  headers.push("statistic", "interval_kind", "source_standard_error", "collection_years_json", "collection_year_basis");
  const rows: unknown[][] = [headers];
  for (const s of series) {
    const event = eventWindows?.[s.countryId];
    // Countries without a documented event do not have a visible event-time chart.
    if (eventWindows && !event) continue;
    if (event && (!Number.isSafeInteger(event.onset) || !Number.isSafeInteger(event.window) || event.window < 0)) throw new RangeError("Invalid event export window");
    const original = originals.find(o => o.id === s.id);
    if (!original || original.unit === "relative_index") throw new Error(`Original source series required for export: ${s.id}`);
    const start = event ? event.onset - event.window : from;
    const end = event ? event.onset + event.window : to;
    for (const p of visibleAtlasPoints(s, start, end)) {
      const raw = original.points.find(o => o.year === p.year && o.sourceId === p.sourceId && o.sourceLocator === p.sourceLocator);
      if (!raw) throw new Error(`Original source observation required for export: ${s.id}/${p.year}`);
      rows.push([s.id,s.countryId,s.metric,s.datasetFamily,s.status,p.year,p.startYear ?? p.year,p.endYear ?? p.year,p.period ? atlasText(p.period,locale) : p.year,p.value,atlasText(s.unitLabel,locale),p.lower,p.upper,raw.value,original.unit,raw.lower,raw.upper,original.valueScale,p.n,p.nSites,p.sourceId,p.sourceLocator,atlasText(s.method,locale),"2026-09-08",event?.onset,event ? p.year-event.onset : null,event ? (p.startYear??p.year)-event.onset : null,event ? (p.endYear??p.year)-event.onset : null]);
      rows[rows.length-1].push(original.statistic, raw.intervalKind ?? (raw.lower !== null && raw.upper !== null ? "confidence_95" : "none"), raw.standardError, raw.collectionYears ? JSON.stringify(raw.collectionYears) : null, raw.collectionYearBasis);
    }
  }
  return "\uFEFF" + rows.map(r => r.map(atlasCsvCell).join(",")).join("\r\n");
}

export function downloadAtlasBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url; a.download = filename; document.body.append(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function exportRecord(value: unknown): Record<string, unknown> | null {
  return value !== null && typeof value === "object" && !Array.isArray(value) ? value as Record<string, unknown> : null;
}

/** Keep every character, including unbroken URLs, while using conservative fixed-width wrapping. */
function wrapExportText(value: string, columns: number): string[] {
  const lines: string[] = [];
  const cells = (character: string) => /\p{Mark}/u.test(character) ? 0
    : /[\u1100-\u115f\u2329\u232a\u2e80-\ua4cf\uac00-\ud7a3\uf900-\ufaff\ufe10-\ufe19\ufe30-\ufe6f\uff01-\uff60\uffe0-\uffe6]/u.test(character) || character.codePointAt(0)! >= 0x1f300 ? 2 : 1;
  for (const paragraph of value.split(/\r?\n/)) {
    const characters = Array.from(paragraph);
    while (characters.length) {
      let end = 0, used = 0, space = 0;
      while (end < characters.length && used + cells(characters[end]) <= columns) {
        used += cells(characters[end]);
        if (characters[end] === " ") space = end + 1;
        end += 1;
      }
      if (end === characters.length) break;
      const count = space > end / 3 ? space : end;
      lines.push(characters.splice(0, Math.max(1, count)).join(""));
    }
    lines.push(characters.join(""));
  }
  return lines;
}

function exportFooter(metadata: unknown, fi: boolean): string[] {
  const info = exportRecord(metadata) ?? {};
  const selection = exportRecord(info.selections) ?? info;
  const shown = (value: unknown) => value === undefined || value === null ? (fi ? "ei kirjattu" : "not recorded") : String(value);
  const lines = [
    `${fi ? "Aineistoversio" : "Data edition"}: ${shown(info.edition)}`,
    `${fi ? "Valittu maa" : "Selected country"}: ${shown(selection.country)} · ${fi ? "Näkymä" : "View"}: ${shown(selection.view)} · ${fi ? "Ajanjakso" : "Calendar range"}: ${shown(selection.from)}–${shown(selection.to)} · ${fi ? "Valittu vuosi" : "Selected year"}: ${shown(selection.year)}`,
    `${fi ? "Yhteinen vertailuvuosi" : "Shared baseline year"}: ${selection.baseline === null ? (fi ? "ei valittu" : "not selected") : shown(selection.baseline)}`,
  ];
  const fieldHistory = exportRecord(info.fieldReconstruction);
  const driverSelection=exportRecord(info.technologyDriverSelection);
  if(driverSelection)lines.push(`${fi?"Teknologian lähdeperhe":"Technology source family"}: ${shown(driverSelection.familyId)} · ${fi?"Lineaarinen välivuosikuva":"Linear intermediate-year layer"}: ${driverSelection.linearReconstruction?(fi?"näkyvissä; erillinen oletus":"shown; separate assumption"):(fi?"ei näytetä":"not shown")}`);
  if (fieldHistory) lines.push(`${fi ? "Teknologiahistorian versio" : "Technology-history edition"}: ${shown(fieldHistory.updatedAt)}`);
  if (selection.view === "events") lines.push(`${fi ? "Tapahtuma" : "Event"}: ${shown(selection.eventFamily)} · ${fi ? "Ikkuna" : "Window"}: ±${shown(selection.window)} ${fi ? "vuotta" : "years"} · ${fi ? "Valinta tapahtumasta" : "Selected event-relative year"}: ${shown(selection.relative)}`);
  const displayed = Array.isArray(info.displayedSeries) ? info.displayedSeries : [];
  const transformations = displayed.flatMap(value => {
    const series = exportRecord(value);
    const label = exportRecord(series?.unitLabel);
    return series?.unit === "relative_index" && label ? [`${shown(series.id)}: ${shown(label[fi ? "fi" : "en"])}`] : [];
  });
  if (transformations.length) lines.push(`${fi ? "Näytön indeksit" : "Display indices"}: ${transformations.join("; ")}`);

  let scenario = exportRecord(info.scenario);
  if (!scenario && typeof info.scenario === "string" && info.scenario.trim()) {
    try { scenario = exportRecord(JSON.parse(info.scenario)); }
    catch { /* Free-text assumptions also belong in the visible export. */ }
    if (!scenario) lines.push(`${fi ? "Skenaario-oletukset" : "Scenario assumptions"}: ${info.scenario}`);
  }
  if (scenario) {
    lines.push(fi ? "BERM-skenaario: ehdollinen herkkyyslaskelma, käyttäjän oletukset; biologinen kalibrointi avoin." : "BERM scenario: conditional sensitivity calculation, user assumptions; biological calibration remains open.");
    lines.push(`${fi ? "Muotoilu" : "Formulation"}: ${shown(scenario.formulation)} · ${fi ? "Skenaarion vertailuvuosi" : "Scenario baseline year"}: ${shown(scenario.baselineYear)} · ${fi ? "Normalisointi" : "Normalization"}: ${shown(scenario.normalization)}`);
    const parameters = exportRecord(scenario.parameters);
    if (parameters) {
      lines.push(`${fi ? "Parametrit" : "Parameters"}: ${Object.entries(parameters).filter(([, value]) => ["number", "string", "boolean"].includes(typeof value)).map(([key, value]) => `${key}=${String(value)}`).join("; ")}`);
      if (typeof parameters.lagYears === "number" && typeof parameters.memoryYears === "number") lines.push(fi
        ? `Yhtä suuret vuosipainot: viiveet ${parameters.lagYears}–${parameters.lagYears + parameters.memoryYears} vuotta, molemmat päät mukana (${parameters.memoryYears + 1} vuosinäytettä).`
        : `Uniform annual kernel: lags ${parameters.lagYears}–${parameters.lagYears + parameters.memoryYears} years inclusive (${parameters.memoryYears + 1} annual samples).`);
    }
    if (scenario.kind === "conditional_uncalibrated_BERM_sensitivity") lines.push(fi
      ? "Lisäsulku: suhteellinen kerroin exp(−β × vasteen muutos vertailuvuodesta) kohdistetaan kaikkiin ikäkohtaisiin syntyvyyslukuihin. Muu vastaanotintila ja ajoitus pidetään tässä kokeessa vakioina."
      : "Additional closure: exp(−β × response change from baseline) multiplies every age-specific fertility rate. Other receiver-state and timing factors are held fixed in this experiment.");
    if (typeof scenario.sourceWindowRule === "string") lines.push(`${fi ? "Käyttöjakso-oletus" : "Operating-window assumption"}: ${scenario.sourceWindowRule}`);
    if (scenario.inputMode === "source_quantity_profiles") lines.push(fi
      ? "Tilastoprofiilit: lähteiden määrät ohjaavat ajallista kehitystä. Katkoviiva/varjostus on rekonstruktion ajoitusvaihtelu, ei luottamusväli. Reuna-arvojen pitäminen ja lähdesuureen kenttämuunnos ovat erillisiä oletuksia."
      : "Statistical profiles: source quantities drive temporal change. Timing shading is a reconstruction sensitivity, not a confidence interval. Endpoint holding and source-to-field mapping are separate assumptions.");
    if (Array.isArray(scenario.sources)) {
      for (const value of scenario.sources) {
        const source = exportRecord(value);
        if (!source) continue;
        const windows = Array.isArray(source.windows) ? source.windows.map(exportRecord).filter(window => window !== null).map(window => `${shown(window.startYear)}–${shown(window.endYear)}`).join(", ") : `${shown(source.startYear)}–${shown(source.endYear)}`;
        lines.push(`${fi ? "Skenaariolähde" : "Scenario source"} ${shown(source.id)}: ${source.enabled === false ? (fi ? "pois käytöstä" : "disabled") : (fi ? "mukana" : "enabled")}; amplitude=${shown(source.amplitude)}; angleDegrees=${shown(source.angleDegrees)}; ${fi ? "jaksot" : "windows"}: ${windows}`);
        if(source.driverSeriesId){
          const scope=exportRecord(source.scope),reference=exportRecord(source.reference);
          lines.push(`${shown(source.driverSeriesId)} · ${fi?"Alue":"Scope"}: ${shown(scope?.[fi?"fi":"en"])} · ${fi?"Normalisointi":"Normalization"}: ${shown(reference?.[fi?"fi":"en"])} · ${fi?"Havaintovuodet":"Source years"}: ${Array.isArray(source.dataYears)?source.dataYears.join("–"):shown(source.dataYears)} · ${fi?"Muunnos":"Mapping"}: ${shown(source.profileTransform)} · ${fi?"Reunat":"Edges"}: ${shown(source.profileOutside)}`);
        }
      }
    }
  }
  const endpoint = exportRecord(info.endpointPrediction);
  if (endpoint) {
    const parameters=exportRecord(endpoint.parameters), result=exportRecord(endpoint.scenario), assumptions=exportRecord(result?.assumptions);
    const calibrated = endpoint.kind === "conditionally_calibrated_BERM_endpoints";
    lines.push(calibrated ? (fi ? "BERM: sarjakohtaisesti kalibroitu ehdollinen vastesulku. Sovitusjaksot ja myöhemmät vertailujaksot erotettu; lähteiden fysikaalinen ja kausaalinen kalibrointi avoin." : "BERM: series-specific calibrated conditional response closure. Calibration and later comparison periods are separated; physical and causal source calibration remain open.") : (fi ? "BERM: vuotuinen ja kertynyt vaste · ehdollinen ennuste; herkkyyksiä ei soviteta myöhempiin havaintoihin." : "BERM: annual and accumulated response · conditional prediction; gains are not fitted to later observations."));
    lines.push(`${fi ? "Näytetyt kanavat" : "Displayed channels"}: ${shown(endpoint.displayedModes)}; ${fi ? "Parametrit" : "Parameters"}: ${JSON.stringify(parameters)}`);
    lines.push(`U(t) = mean G(t−d), d = lag…lag+memory; C(t) = λ C(t−1) + U(t) × 1 yr; λ = 2^(−1/halfLife), λ = 0 if halfLife = 0. ${fi ? "Alkuhistoria" : "History origin"}: ${JSON.stringify(assumptions)}`);
    lines.push(fi ? "Lähdeprojektio G ja vuotuinen vaste U ovat normalisoituja. Kertymä C on projektiovuosissa; se ei ole yksilön mitattu elinikäinen annos." : "Source projection G and annual response U are normalized. State C uses projection-years, not measured individual lifetime dose.");
    if(!calibrated)lines.push(fi ? "Biologinen vaste: exp(−β × kanavan muutos lähtötilasta)." : "Biological response: exp(−β × channel change from baseline).");
    if(calibrated){
      const reference=exportRecord(endpoint.calibrationReference);
      lines.push(`${fi?"Lukittu kalibrointiviite":"Frozen calibration reference"}: ${JSON.stringify(reference?.parameters)}; ${shown(reference?.query)}`);
      lines.push(fi?"Y(t)=exp(logScale−β S(t)); β ja logScale lasketaan vain kalibrointiviitteestä ja pysyvät lukittuina syötteitä muutettaessa. Yksi efektiivinen kerroin kullekin kanavavaihtoehdolle. Kunkin tutkimusjakson malli aggregoidaan samalle jaksolle.":"Y(t)=exp(logScale−β S(t)); beta and logScale are estimated only from the calibration reference and stay frozen when inputs change. One effective gain per channel alternative. Each study's model value is aggregated over the same period.");
      lines.push(`${fi?"Ennusteen syötteitä muutettu kalibroinnista":"Prediction inputs changed since calibration"}: ${shown(endpoint.inputsChanged)}`);
      for(const value of Array.isArray(endpoint.calibrations)?endpoint.calibrations:[]){
        const entry=exportRecord(value),fit=exportRecord(entry?.fit),protocol=exportRecord(entry?.protocol),channels=exportRecord(fit?.channels);
        if(!entry||!fit)continue;
        lines.push(`${shown(entry.seriesId)}: ${fi?"kalibrointiraja":"calibration cutoff"} ${shown(entry.throughYear)}; ${fi?"ankkuri":"anchor"} ${JSON.stringify(fit.baseline)}; ${Array.isArray(fit.included)?fit.included.length:0} ${fi?"sovitusjaksoa":"calibration periods"}, ${Array.isArray(fit.heldOut)?fit.heldOut.length:0} ${fi?"myöhempää vertailujaksoa":"later comparison periods"}.`);
        if(channels)for(const [mode,value] of Object.entries(channels)){const c=exportRecord(value);if(c)lines.push(`${mode}: status=${shown(c.status)}; beta=${shown(c.beta)}; logScale=${shown(c.logScale)}; ${fi?"haku":"search"}=${JSON.stringify(c.search)}`);}
        if(protocol){const scope=exportRecord(protocol.scope);lines.push(`${shown(protocol.id)}: ${shown(scope?.[fi?"fi":"en"])}; ${fi?"sallitut jaksot":"eligible periods"}=${JSON.stringify(protocol.eligiblePeriods)}`);}
      }
      for(const value of Array.isArray(reference?.sources)?reference.sources:[]){const s=exportRecord(value);if(s){const scope=exportRecord(s.scope),normalization=exportRecord(s.reference);lines.push(`${fi?"Kalibroinnin lähdeprofiili":"Calibration source profile"}: ${shown(s.driverSeriesId)}; enabled=${shown(s.enabled)}; amplitude=${shown(s.amplitude)}; angleDegrees=${shown(s.angleDegrees)}; scope=${shown(scope?.[fi?"fi":"en"])}; normalization=${shown(normalization?.[fi?"fi":"en"])}; interpolation=${shown(s.profileMode)}; step=${shown(s.profileStep)}; transform=${shown(s.profileTransform)}; edges=${shown(s.profileOutside)}; windows=${JSON.stringify(s.windows)}`);}}
    }
    for (const value of Array.isArray(endpoint.notes) ? endpoint.notes : []) {
      const note=exportRecord(value); if(note)lines.push(`${shown(note.label)}: ${shown(note.note)}`);
    }
    for (const value of Array.isArray(endpoint.sources) ? endpoint.sources : []) {
      const s=exportRecord(value);if(!s)continue;
      const scope=exportRecord(s.scope),reference=exportRecord(s.reference);
      lines.push(`${fi?"Lähdeprofiili":"Source profile"}: ${shown(s.id)}; enabled=${shown(s.enabled)}; amplitude=${shown(s.amplitude)}; angleDegrees=${shown(s.angleDegrees)}; ${shown(scope?.[fi?"fi":"en"])}; ${shown(reference?.[fi?"fi":"en"])}; driver=${shown(s.driverSeriesId)}; interpolation=${shown(s.profileMode)}; step=${shown(s.profileStep)}; transform=${shown(s.profileTransform)}; edges=${shown(s.profileOutside)}; ${fi?"käyttöjaksot":"operating windows"}=${JSON.stringify(s.windows)}`);
    }
  }
  const sources = [
    ...(Array.isArray(info.sources) ? info.sources : []),
    ...(Array.isArray(info.fieldSources) ? info.fieldSources : []),
    ...(Array.isArray(scenario?.dataSources) ? scenario.dataSources : []),
    ...(Array.isArray(endpoint?.dataSources) ? endpoint.dataSources : []),
    ...(Array.isArray(endpoint?.calibrations) ? endpoint.calibrations.flatMap(value=>{const entry=exportRecord(value),protocol=exportRecord(entry?.protocol);return Array.isArray(protocol?.sources)?protocol.sources:[];}) : []),
  ].map(exportRecord).filter(source => source !== null);
  const seen = new Set<string>();
  if (sources.length) lines.push(fi ? "Lähteet" : "Sources");
  for (const source of sources) {
    const key = typeof source.url === "string" ? source.url : `${source.id}:${source.title}`;
    if (seen.has(key)) continue;
    seen.add(key);
    lines.push(`${seen.size}. ${shown(source.title)}${typeof source.url === "string" ? ` — ${source.url}` : ""}`);
    if (typeof source.attribution === "string" && source.attribution.trim()) lines.push(source.attribution);
    if (typeof source.license === "string" && source.license.trim()) lines.push(`${fi ? "Lisenssi" : "Licence"}: ${source.license}`);
  }
  return lines;
}

/** Standalone figure with resolved theme colours and embedded provenance/state. */
export function createAtlasSvg(root: HTMLElement, title: string, metadata: unknown): string {
  const ns = "http://www.w3.org/2000/svg";
  const outer = document.createElementNS(ns,"svg");
  const width = 1100;
  let top = 76;
  const bg = document.createElementNS(ns,"rect");
  const theme = getComputedStyle(root);
  const fi = exportRecord(metadata)?.locale === "fi" || root.closest("[lang]")?.getAttribute("lang")?.startsWith("fi");
  const appendWrapped = (parent: SVGElement, value: string, fontSize = 11) => {
    const element = document.createElementNS(ns, "text");
    element.setAttribute("x", "32"); element.setAttribute("y", String(top));
    element.setAttribute("font-size", String(fontSize)); element.setAttribute("font-family", "monospace");
    element.setAttribute("fill", theme.color);
    element.setAttributeNS("http://www.w3.org/XML/1998/namespace", "xml:space", "preserve");
    // Wide Unicode characters use two columns; long URLs are wrapped without dropping characters.
    const maxColumns = Math.floor((width - 64) / (fontSize * 0.7));
    const lines = wrapExportText(value, maxColumns);
    lines.forEach((line, index) => {
      const span = document.createElementNS(ns, "tspan");
      span.setAttribute("x", "32"); span.setAttribute("dy", index === 0 ? "0" : String(fontSize + 4));
      span.textContent = line; element.append(span);
    });
    parent.append(element); top += lines.length * (fontSize + 4) + 6;
  };
  bg.setAttribute("fill",theme.getPropertyValue("--background").trim() || "#fff");
  bg.setAttribute("width",String(width)); outer.append(bg);
  const heading = document.createElementNS(ns,"text");
  heading.setAttribute("x","32"); heading.setAttribute("y","35"); heading.setAttribute("font-size","20"); heading.setAttribute("font-family","sans-serif"); heading.setAttribute("fill",theme.color); heading.textContent = title; outer.append(heading);
  const meta = document.createElementNS(ns,"metadata"); meta.textContent = JSON.stringify(metadata); outer.append(meta);
  const caption = document.createElementNS(ns,"text");
  caption.setAttribute("x","32"); caption.setAttribute("y","58"); caption.setAttribute("font-size","12"); caption.setAttribute("font-family","sans-serif"); caption.setAttribute("fill",theme.color);
  caption.textContent = fi
    ? "Extinction Field · Lähteet ja näkymän asetukset kuvan alla; täydet lähdetiedot SVG-metatiedoissa"
    : "Extinction Field · Sources and view settings below; full provenance in SVG metadata"; outer.append(caption);
  const historyLegend=root.querySelector("[data-field-history-legend]");
  if(historyLegend){
    for(const item of historyLegend.children){
      const swatch=item.querySelector("i"); if(!swatch)continue;
      const square=document.createElementNS(ns,"rect"); square.setAttribute("x","32");square.setAttribute("y",String(top-9));square.setAttribute("width","12");square.setAttribute("height","9");square.setAttribute("fill",getComputedStyle(swatch).backgroundColor);square.setAttribute("stroke",theme.color);square.setAttribute("stroke-width","0.4");outer.append(square);
      const label=document.createElementNS(ns,"text");label.setAttribute("x","52");label.setAttribute("y",String(top));label.setAttribute("font-size","11");label.setAttribute("font-family","sans-serif");label.setAttribute("fill",theme.color);label.textContent=item.textContent;outer.append(label);top+=17;
    }
    top+=12;
  }
  let chartCount=0;
  for (const original of root.querySelectorAll<SVGSVGElement>("svg[data-atlas-export], [data-atlas-chart] svg, figure svg")) {
    if (original.closest("[hidden], details:not([open])")) continue;
    const box = original.viewBox.baseVal;
    const originalWidth = box.width || original.getBoundingClientRect().width;
    const originalHeight = box.height || original.getBoundingClientRect().height;
    if (!originalWidth || !originalHeight) continue;
    chartCount+=1;
    const clone = original.cloneNode(true) as SVGSVGElement;
    const nodes = [original,...original.querySelectorAll("*")];
    const copied = [clone,...clone.querySelectorAll("*")];
    nodes.forEach((node,i) => {
      const computed = getComputedStyle(node);
      for (const property of ["fill","stroke","stroke-width","stroke-dasharray","opacity","font-size","font-weight","font-family","color"]) (copied[i] as SVGElement).style.setProperty(property,computed.getPropertyValue(property));
    });
    const label = original.closest("figure")?.querySelector("figcaption")?.textContent?.trim() ?? original.querySelector("title")?.textContent ?? "";
    if (label) appendWrapped(outer, label, 13);
    const height = originalHeight / originalWidth * (width-64);
    clone.setAttribute("x","32"); clone.setAttribute("y",String(top)); clone.setAttribute("width",String(width-64)); clone.setAttribute("height",String(height)); clone.style.width = `${width-64}px`; clone.style.height = `${height}px`;
    outer.append(clone); top += height+30;
  }
  if (chartCount === 0) throw new Error("No charts in the current view");
  const footer = document.createElementNS(ns, "g");
  footer.setAttribute("data-atlas-export-footer", "true");
  const rule = document.createElementNS(ns, "line");
  rule.setAttribute("x1", "32"); rule.setAttribute("x2", String(width - 32));
  rule.setAttribute("y1", String(top)); rule.setAttribute("y2", String(top));
  rule.setAttribute("stroke", theme.color); rule.setAttribute("stroke-opacity", "0.25");
  footer.append(rule); top += 24;
  for (const paragraph of exportFooter(metadata, !!fi)) appendWrapped(footer, paragraph);
  outer.append(footer); top += 18;
  outer.setAttribute("viewBox",`0 0 ${width} ${top}`); outer.setAttribute("width",String(width)); outer.setAttribute("height",String(top)); bg.setAttribute("height",String(top));
  return new XMLSerializer().serializeToString(outer);
}
export async function atlasSvgToPng(svg: string): Promise<Blob> {
  const url = URL.createObjectURL(new Blob([svg],{type:"image/svg+xml;charset=utf-8"}));
  try {
    const img = new Image(); img.src = url; await img.decode();
    const canvas = document.createElement("canvas"); canvas.width=img.width;canvas.height=img.height;
    const context=canvas.getContext("2d"); if (!context) throw new Error("Canvas unavailable");
    context.drawImage(img,0,0);
    return await new Promise<Blob>((resolve,reject)=>canvas.toBlob(b=>b?resolve(b):reject(new Error("PNG unavailable")),"image/png"));
  } finally { URL.revokeObjectURL(url); }
}
