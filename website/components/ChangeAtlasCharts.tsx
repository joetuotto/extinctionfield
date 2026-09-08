"use client";

import { useEffect, useId, useRef, useState, type KeyboardEvent, type MouseEvent, type ReactNode } from "react";
import { scaleLinear } from "d3";
import type { ChangeAtlasPoint, ChangeAtlasSeries } from "@/lib/change-atlas-data";
import styles from "./ChangeAtlasCharts.module.css";

type Domain = readonly [number, number];
export type ChangeAtlasYDomains = Record<string, Domain>;

export interface ChangeAtlasPredictionLine {
  id: string;
  label: { fi: string; en: string };
  points: { year: number; value: number | null }[];
  mode: "annual" | "accumulated" | "combined";
  /** Describes the fit boundary; channel identity remains in mode. */
  calibration?: { throughYear: number; anchorStartYear: number; label: { fi: string; en: string } };
}

export interface ChangeAtlasPredictionOverlay {
  lines: ChangeAtlasPredictionLine[];
  note: { fi: string; en: string };
  /** Must match the displayed observation unit, including any index transformation. */
  unit: ChangeAtlasSeries["unit"];
}

export interface ChangeAtlasChartsProps {
  series: ChangeAtlasSeries[];
  locale: string;
  yearDomain: Domain;
  selectedYear: number;
  onSelectYear?: (year: number) => void;
  onOpenSource?: (seriesId: string) => void;
  yDomains?: ChangeAtlasYDomains;
  overlaysBySeriesId?: Record<string, ChangeAtlasPredictionOverlay>;
  /** Relabels the axis only; observations and yearDomain retain calendar years. */
  yearOffset?: number;
}

const COPY = {
  fi: {
    noData: "Ei havaintoa tällä rajauksella", source: "Lähde ja menetelmä", year: "Vuosi",
    relativeYear: "Vuotta tapahtumasta", noPoint: "Ei havaintoa", sites: "seurantapaikkaa", sample: "otos",
    interval: "Ilmoitettu epävarmuusväli", confidence: "95 %:n luottamusväli", percentile: "5.–95. persentiili (jakaumaväli)", standardError: "Keskivirhe (SE)", standardErrorBounds: "Keskivirhe (±1 SE)", log: "Alkuperäinen log10-asteikko",
    observation: "Lähdehavainto", prediction: "BERM: ehdollinen ennuste", noPrediction: "Ei laskettua arvoa", mismatch: "Ennustetta ei piirretä: sen yksikkö poikkeaa havaintosarjasta.",
    median: "Mediaani", arithmetic_mean: "Keskiarvo", adjusted_mean: "Vakioitu keskiarvo", vertical: "Pystyjana", modelGap: "Katkos tarkoittaa puuttuvaa laskettua arvoa.",
    fitted: "Kalibrointijakso", afterFit: "Sovituksen jälkeinen ehdollinen ennuste", backcast: "Takaisinlaskenta ennen ankkuria", cutoff: "Sovitus päättyy", anchor: "Ankkuri",
    annual: "Viiva yhdistää vain peräkkäisten vuosien arvot.",
    periods: "Vaakajana on tutkimusjakso. Mukana ovat kokonaan aikarajaukseen mahtuvat jaksot. Pystyjanan merkitys ilmoitetaan sarjakohtaisesti.",
    interaction: "Valitse vuosi kuvaajasta tai vuosivalitsimella. Nuolinäppäimet vaihtavat vuotta; Home ja End siirtyvät rajauksen päihin.",
    heatmap: "Syntyvyys iän ja vuoden mukaan", age: "Ikäryhmä", low: "Pieni", high: "Suuri",
    heatmapNote: "Väri kuvaa saman yksikön arvoa kaikissa ikäryhmissä. Tyhjä solu tarkoittaa puuttuvaa havaintoa.",
  },
  en: {
    noData: "No observations in this range", source: "Source and method", year: "Year",
    relativeYear: "Years from event", noPoint: "No observation", sites: "monitoring sites", sample: "sample",
    interval: "Reported uncertainty interval", confidence: "95% confidence interval", percentile: "5th–95th percentile (distribution interval)", standardError: "Standard error (SE)", standardErrorBounds: "Standard error (±1 SE)", log: "Original log10 scale",
    observation: "Source observation", prediction: "BERM: conditional prediction", noPrediction: "No computed value", mismatch: "Prediction omitted: its unit differs from the observation series.",
    median: "Median", arithmetic_mean: "Mean", adjusted_mean: "Adjusted mean", vertical: "Vertical bar", modelGap: "A gap indicates a missing computed value.",
    fitted: "Calibration period", afterFit: "Conditional prediction after calibration", backcast: "Backcast before the anchor", cutoff: "Fit through", anchor: "Anchor",
    annual: "Lines connect consecutive annual values only.",
    periods: "Horizontal bars show survey periods. Only complete periods within the time range are included. The meaning of vertical bars is stated for each series.",
    interaction: "Choose a year on the chart or with the year selector. Arrow keys change the year; Home and End move to the range limits.",
    heatmap: "Fertility by age and year", age: "Age group", low: "Low", high: "High",
    heatmapNote: "Colour uses the same unit and scale for all ages. Empty cells indicate missing observations.",
  },
};
const LEFT = 60;
const RIGHT = 16;
const TOP = 14;
const BOTTOM = 146;
const HEIGHT = 190;
/** Shared geometry for observation and derived-input lanes; units remain independent. */
export const ATLAS_PLOT_LAYOUT = { LEFT, RIGHT, TOP, BOTTOM, HEIGHT } as const;

function text(value: { fi: string; en: string }, locale: string) {
  return locale === "fi" ? value.fi || value.en : value.en;
}

function format(value: number, locale: string) {
  return new Intl.NumberFormat(locale === "fi" ? "fi-FI" : "en-GB", { maximumFractionDigits: 2 }).format(value);
}

function validDomain(domain: Domain): Domain {
  return Number.isFinite(domain[0]) && Number.isFinite(domain[1]) && domain[1] > domain[0]
    ? domain : [Number.isFinite(domain[0]) ? domain[0] - 0.5 : 0, Number.isFinite(domain[0]) ? domain[0] + 0.5 : 1];
}

function domainKey(series: ChangeAtlasSeries) {
  return `${series.metric}|${series.unit}|${series.valueScale}`;
}

/** Supply all compared series and overlays to retain identical vertical scales across charts. */
export function getChangeAtlasYDomains(series: ChangeAtlasSeries[], overlaysBySeriesId?: Record<string, ChangeAtlasPredictionOverlay>, yearDomain?: Domain): ChangeAtlasYDomains {
  const groups = new Map<string, number[]>();
  for (const entry of series) {
    const values = groups.get(domainKey(entry)) ?? [];
    for (const point of entry.points) {
      for (const value of [point.value, ...(hasInterval(point) ? [point.lower, point.upper] : [])]) {
        if (value !== null && Number.isFinite(value)) values.push(value);
      }
    }
    const overlay = overlaysBySeriesId?.[entry.id];
    if (overlay?.unit === entry.unit) for (const line of overlay.lines) {
      for (const point of line.points) {
        if (Number.isFinite(point.year) && point.value !== null && Number.isFinite(point.value)
          && (!yearDomain || point.year >= yearDomain[0] && point.year <= yearDomain[1])) values.push(point.value);
      }
    }
    groups.set(domainKey(entry), values);
  }
  return Object.fromEntries([...groups].map(([key, values]) => {
    if (!values.length) return [key, [0, 1]];
    const low = Math.min(...values);
    const high = Math.max(...values);
    const pad = Math.max((high - low) * 0.1, Math.abs(high) * 0.025, 0.05);
    return [key, [low >= 0 ? Math.max(0, low - pad) : low - pad, high + pad]];
  }));
}

function hasInterval(point: ChangeAtlasPoint) {
  return point.intervalKind !== "none" && point.lower !== null && point.upper !== null
    && Number.isFinite(point.lower) && Number.isFinite(point.upper) && point.lower <= point.upper;
}

function intervalLabel(point: ChangeAtlasPoint, locale: string) {
  const c = locale === "fi" ? COPY.fi : COPY.en;
  return point.intervalKind === "percentile_5_95" ? c.percentile : point.intervalKind === "confidence_95" ? c.confidence
    : point.intervalKind === "standard_error" ? c.standardErrorBounds : c.interval;
}

function visiblePoints(series: ChangeAtlasSeries, domain: Domain) {
  return series.points.filter((point) => Number.isFinite(point.value) && (series.frequency === "survey_period"
    ? (point.startYear ?? point.year) >= domain[0] && (point.endYear ?? point.year) <= domain[1]
    : point.year >= domain[0] && point.year <= domain[1])).sort((a, b) => a.year - b.year);
}

function matchesYear(series: ChangeAtlasSeries, point: ChangeAtlasPoint, year: number) {
  return series.frequency === "survey_period"
    ? (point.startYear ?? point.year) <= year && (point.endYear ?? point.year) >= year
    : point.year === year;
}

function periodLabel(point: ChangeAtlasPoint, locale: string) {
  return point.period ? text(point.period, locale) : point.startYear !== undefined && point.endYear !== undefined
    ? `${point.startYear}–${point.endYear}` : String(point.year);
}

function pointDescription(series: ChangeAtlasSeries, point: ChangeAtlasPoint, locale: string, offset?: number) {
  const c = locale === "fi" ? COPY.fi : COPY.en;
  const interval = hasInterval(point)
    ? `; ${intervalLabel(point, locale)}: ${format(point.lower!, locale)}–${format(point.upper!, locale)}`
    : point.intervalKind !== "none" && point.standardError !== undefined && Number.isFinite(point.standardError)
      ? `; ${c.standardError}: ${format(point.standardError, locale)}` : "";
  const n = point.nSites !== undefined ? `; ${point.nSites} ${c.sites}` : point.n !== undefined ? `; ${c.sample}: ${point.n}` : "";
  const relative = offset !== undefined ? ` (${c.relativeYear}: ${format(point.year - offset, locale)})` : "";
  return `${periodLabel(point, locale)}${relative}: ${series.statistic ? `${c[series.statistic]} ` : ""}${format(point.value, locale)} ${text(series.unitLabel, locale)}${interval}${n}`;
}

/** Annual computed values retain null and absent-year gaps without becoming observations. */
export function splitAtlasAnnualPoints(points: { year: number; value: number | null }[], domain: Domain) {
  const segments: { year: number; value: number }[][] = [];
  let current: { year: number; value: number }[] = [];
  for (const point of [...points].filter((point) => Number.isFinite(point.year) && point.year >= domain[0] && point.year <= domain[1]).sort((a, b) => a.year - b.year)) {
    if (point.value === null || !Number.isFinite(point.value)) { current = []; continue; }
    if (!current.length || current.at(-1)!.year !== point.year - 1) { current = []; segments.push(current); }
    current.push({ year: point.year, value: point.value });
  }
  return segments;
}

type PredictionRole = "prediction" | "fitted" | "after-fit" | "backcast";

function calibrationFor(line: ChangeAtlasPredictionLine) {
  const c = line.calibration;
  return c && Number.isSafeInteger(c.throughYear) && Number.isSafeInteger(c.anchorStartYear)
    && c.anchorStartYear <= c.throughYear ? c : undefined;
}

function predictionRole(line: ChangeAtlasPredictionLine, year: number): PredictionRole {
  const c = calibrationFor(line);
  return !c ? "prediction" : year < c.anchorStartYear ? "backcast" : year <= c.throughYear ? "fitted" : "after-fit";
}

function roleLabel(role: PredictionRole, locale: string) {
  const c = locale === "fi" ? COPY.fi : COPY.en;
  return role === "backcast" ? c.backcast : role === "fitted" ? c.fitted : role === "after-fit" ? c.afterFit : c.prediction;
}

function predictionClass(role: PredictionRole) {
  return role === "fitted" ? styles.fittedCurve : role === "backcast" ? styles.backcastCurve : styles.predictionCurve;
}

function styledPredictionSegments(line: ChangeAtlasPredictionLine, domain: Domain) {
  const result: { role: PredictionRole; points: { year: number; value: number }[] }[] = [];
  for (const segment of splitAtlasAnnualPoints(line.points, domain)) {
    if (segment.length === 1) { result.push({ role: predictionRole(line, segment[0].year), points: segment }); continue; }
    let current: typeof result[number] | undefined;
    for (let i = 1; i < segment.length; i++) {
      // Sharing the existing boundary point keeps the curve continuous without inventing a new value.
      const role = predictionRole(line, (segment[i - 1].year + segment[i].year) / 2);
      if (!current || current.role !== role) { current = { role, points: [segment[i - 1]] }; result.push(current); }
      current.points.push(segment[i]);
    }
  }
  return result;
}

function predictionColor(mode: ChangeAtlasPredictionLine["mode"]) {
  return mode === "annual" ? "var(--chart-series-6)" : mode === "accumulated" ? "var(--chart-series-3)" : "var(--chart-series-4)";
}

/** Text remains inside the exported SVG; wrap without dropping any words. */
function wrapText(value: string, width: number) {
  const capacity = Math.max(8, Math.floor(width / 6));
  const lines: string[] = [];
  let line = "";
  for (const word of value.split(/\s+/).filter(Boolean)) {
    if (line && line.length + word.length + 1 > capacity) { lines.push(line); line = ""; }
    if (word.length > capacity) {
      if (line) { lines.push(line); line = ""; }
      for (let i = 0; i < word.length; i += capacity) {
        const part = word.slice(i, i + capacity);
        if (part.length === capacity) lines.push(part); else line = part;
      }
    } else line = line ? `${line} ${word}` : word;
  }
  if (line) lines.push(line);
  return lines;
}

function useChartWidth(contentVersion = 0) {
  const ref = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(600);
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const update = () => {
      const measured = element.getBoundingClientRect().width;
      if (measured > 0) setWidth(Math.max(100, Math.round(measured)));
    };
    update();
    if (typeof ResizeObserver === "undefined") return;
    const observer = new ResizeObserver(update);
    observer.observe(element);
    return () => observer.disconnect();
  }, [contentVersion]);
  return { ref, width };
}

function yearTicks(domain: Domain, width: number) {
  const ticks = scaleLinear().domain([...domain]).ticks(width < 450 ? 3 : 6).filter(Number.isInteger);
  if(domain[0]===domain[1])return [domain[0]];
  const x=scaleLinear().domain([...domain]).range([LEFT,width-RIGHT]);
  const visible=[domain[0]];
  for(const tick of ticks){
    // The first/last label extends into the plot; reserve its real pixel space.
    if(tick>domain[0]&&tick<domain[1]&&x(tick)-x(domain[0])>=44&&x(domain[1])-x(tick)>=44&&x(tick)-x(visible.at(-1)!)>=40)visible.push(tick);
  }
  return [...visible,domain[1]];
}

function PlotControl({ children, width, yearDomain, selectedYear, onSelectYear, label, descriptionId }: {
  children: ReactNode; width: number; yearDomain: Domain; selectedYear: number;
  onSelectYear?: (year: number) => void; label: string; descriptionId: string;
}) {
  if (!onSelectYear) return <div className={styles.plot}>{children}</div>;
  const select = (year: number) => onSelectYear(Math.max(Math.ceil(yearDomain[0]), Math.min(Math.floor(yearDomain[1]), Math.round(year))));
  const click = (event: MouseEvent<HTMLButtonElement>) => {
    if (event.detail === 0) return; // Keyboard selection uses the shared year, never a synthetic pointer position.
    const bounds = event.currentTarget.getBoundingClientRect();
    if (!bounds.width) return;
    const position = (event.clientX - bounds.left) / bounds.width * width;
    const fraction = (position - LEFT) / Math.max(1, width - LEFT - RIGHT);
    select(yearDomain[0] + Math.max(0, Math.min(1, fraction)) * (yearDomain[1] - yearDomain[0]));
  };
  const key = (event: KeyboardEvent<HTMLButtonElement>) => {
    const year = event.key === "ArrowRight" || event.key === "ArrowUp" ? selectedYear + 1
      : event.key === "ArrowLeft" || event.key === "ArrowDown" ? selectedYear - 1
        : event.key === "Home" ? yearDomain[0] : event.key === "End" ? yearDomain[1] : null;
    if (year !== null) { event.preventDefault(); select(year); }
  };
  return <button type="button" className={styles.plotButton} aria-label={label} aria-describedby={descriptionId} onClick={click} onKeyDown={key}>{children}</button>;
}

export { PlotControl as AtlasPlotControl, useChartWidth as useAtlasChartWidth, yearTicks as atlasYearTicks, validDomain as validAtlasDomain, wrapText as wrapAtlasSvgText };

function Lane({ entry, locale, yearDomain, selectedYear, onSelectYear, onOpenSource, yDomain, yearOffset, overlaysBySeriesId }: Omit<ChangeAtlasChartsProps, "series" | "yDomains"> & {
  entry: ChangeAtlasSeries; yDomain: Domain;
}) {
  const id = useId();
  const { ref, width } = useChartWidth();
  const c = locale === "fi" ? COPY.fi : COPY.en;
  const points = visiblePoints(entry, yearDomain);
  const selected = points.filter((point) => matchesYear(entry, point, selectedYear));
  const requestedOverlay = overlaysBySeriesId?.[entry.id];
  const overlay = requestedOverlay?.unit === entry.unit ? requestedOverlay : undefined;
  const calibrations = overlay?.lines.flatMap(line => { const calibration = calibrationFor(line); return calibration ? [calibration] : []; }) ?? [];
  const cutoffs = [...new Set(calibrations.map(calibration => calibration.throughYear))].sort((a, b) => a - b);
  const calibrationNotes = [...new Set(calibrations.map(calibration => `${text(calibration.label, locale)} · ${c.anchor}: ${calibration.anchorStartYear} · ${c.cutoff}: ${calibration.throughYear}`))];
  const selectedPredictions = overlay?.lines.map((line) => {
    const point = line.points.find((point) => point.year === selectedYear && point.year >= yearDomain[0] && point.year <= yearDomain[1]);
    const value = point?.value !== null && point?.value !== undefined && Number.isFinite(point.value) ? point.value : null;
    const relative = yearOffset === undefined ? "" : ` (${c.relativeYear}: ${format(selectedYear - yearOffset, locale)})`;
    const role = predictionRole(line, selectedYear);
    return { line, role, description: `${c.prediction} · ${text(line.label, locale)}${role !== "prediction" ? ` · ${roleLabel(role, locale)}` : ""} · ${selectedYear}${relative}: ${value === null ? c.noPrediction : `${format(value, locale)} ${text(entry.unitLabel, locale)}`}` };
  }) ?? [];
  const x = scaleLinear().domain([...validDomain(yearDomain)]).range([LEFT, width - RIGHT]);
  const y = scaleLinear().domain([...validDomain(yDomain)]).range([BOTTOM, TOP]);
  const title = `${text(entry.title, locale)}, ${yearDomain[0]}–${yearDomain[1]}${overlay ? ` · ${c.prediction}` : ""}`;
  const intervalLabels = [...new Set(points.filter(hasInterval).map((point) => intervalLabel(point, locale)))];
  const observationLegend = `${c.observation}${entry.statistic ? ` · ${c[entry.statistic]}` : ""} · ${text(entry.unitLabel, locale)}${intervalLabels.length ? `. ${c.vertical}: ${intervalLabels.join("; ")}` : ""}`;
  const description = [text(entry.unitLabel, locale), entry.frequency === "annual" ? c.annual : c.periods,
    observationLegend, ...selected.map((point) => pointDescription(entry, point, locale, yearOffset)),
    ...selectedPredictions.map((point) => point.description), ...calibrationNotes,
    ...(calibrations.length ? [c.fitted, c.afterFit, c.backcast] : []),
    ...(overlay ? [text(overlay.note, locale), c.modelGap] : []), requestedOverlay && !overlay ? c.mismatch : ""].filter(Boolean).join(". ");
  const segments: ChangeAtlasPoint[][] = [];
  if (entry.frequency === "annual") {
    for (const point of points) {
      const previous = segments.at(-1);
      if (previous?.at(-1)?.year === point.year - 1) previous.push(point);
      else segments.push([point]);
    }
  }
  const color = entry.datasetFamily === "ecology" ? "var(--chart-series-3)" : entry.datasetFamily === "health" || entry.datasetFamily === "hormone" ? "var(--chart-series-2)" : "var(--chart-series-1)";
  const annotations: { label: string; color?: string; prediction?: boolean; role?: PredictionRole }[] = [];
  if (overlay || intervalLabels.length || entry.statistic) annotations.push({ label: observationLegend, color });
  if (overlay) {
    overlay.lines.forEach((line) => annotations.push({ label: `${c.prediction} · ${text(line.label, locale)}`, color: predictionColor(line.mode), prediction: true, role: calibrationFor(line) ? "fitted" : "prediction" }));
    if (calibrations.length) {
      (["fitted", "after-fit", "backcast"] as const).forEach(role => annotations.push({ label: roleLabel(role, locale), color: "var(--foreground-muted)", prediction: true, role }));
      calibrationNotes.forEach(label => annotations.push({ label }));
    }
    annotations.push({ label: `${text(overlay.note, locale)} ${c.modelGap}` });
  }
  if (requestedOverlay && !overlay) annotations.push({ label: c.mismatch });
  let annotationY = HEIGHT + 12;
  const annotationRows = annotations.map((annotation) => {
    const lines = wrapText(annotation.label, width - (annotation.color ? 70 : 30));
    const row = { ...annotation, lines, y: annotationY };
    annotationY += lines.length * 14 + 5;
    return row;
  });
  const height = annotationRows.length ? annotationY + 7 : HEIGHT;
  return <figure className={styles.lane} aria-labelledby={`${id}-caption`} data-series-id={entry.id} data-y-domain={y.domain().join(",")}>
    <figcaption className={styles.heading}>
      <div><strong id={`${id}-caption`}>{text(entry.title, locale)}</strong><span className={styles.unit}>{text(entry.unitLabel, locale)}{entry.valueScale === "log10" ? ` · ${c.log}` : ""}</span></div>
      {onOpenSource && <button type="button" className={styles.source} onClick={() => onOpenSource(entry.id)}>{c.source}</button>}
    </figcaption>
    <div className={styles.selected} data-selected-series={entry.id}>
      {selected.length ? selected.map((point) => <span key={`${point.year}-${point.sourceLocator}`}>{pointDescription(entry, point, locale, yearOffset)}</span>) : <span>{selectedYear} · {c.noPoint}</span>}
    </div>
    {selectedPredictions.length > 0 && <div className={styles.predictionSelected} data-selected-predictions={entry.id}>
      {selectedPredictions.map(({ line, role, description }) => <span key={line.id} data-selected-prediction={line.id} data-prediction-role={role}>{description}</span>)}
    </div>}
    <div ref={ref} className={styles.chartWidth}>
      <PlotControl width={width} yearDomain={yearDomain} selectedYear={selectedYear} onSelectYear={onSelectYear} label={`${title}. ${c.year}: ${selectedYear}`} descriptionId={`${id}-interaction`}>
        <svg className={styles.svg} viewBox={`0 0 ${width} ${height}`} width="100%" height={height} role="img" aria-labelledby={`${id}-title`} aria-describedby={`${id}-description`}>
          <title id={`${id}-title`}>{title}</title><desc id={`${id}-description`}>{description}</desc>
          <defs><clipPath id={`${id}-clip`}><rect x={LEFT - 4} y={TOP - 4} width={width - LEFT - RIGHT + 8} height={BOTTOM - TOP + 8} /></clipPath></defs>
          {y.ticks(3).map((tick) => <g key={tick} className={styles.axis}>
            <line x1={LEFT} x2={width - RIGHT} y1={y(tick)} y2={y(tick)} className={styles.grid} />
            <text x={LEFT - 8} y={y(tick) + 4} textAnchor="end">{format(tick, locale)}</text>
          </g>)}
          <g clipPath={`url(#${id}-clip)`} style={{ color }}>
            {segments.filter((segment) => segment.length > 1).map((segment) => <path key={segment[0].year} data-annual-segment={`${segment[0].year}:${segment.at(-1)!.year}`} className={styles.curve} d={segment.map((point, i) => `${i ? "L" : "M"}${x(point.year)},${y(point.value)}`).join(" ")} />)}
            {overlay?.lines.map((line) => <g key={line.id} data-prediction-line={line.id} data-prediction-mode={line.mode} style={{ color: predictionColor(line.mode) }}>
              <title>{`${c.prediction} · ${text(line.label, locale)} · ${text(entry.unitLabel, locale)}`}</title>
              {styledPredictionSegments(line, yearDomain).map(({ points: segment, role }, index) => <path key={index} data-prediction-segment={`${segment[0].year}:${segment.at(-1)!.year}`} data-prediction-role={role} className={predictionClass(role)}
                d={segment.length === 1 ? `M${x(segment[0].year) - 3},${y(segment[0].value)} L${x(segment[0].year) + 3},${y(segment[0].value)}` : segment.map((point, i) => `${i ? "L" : "M"}${x(point.year)},${y(point.value)}`).join(" ")} />)}
            </g>)}
            {points.map((point) => {
              const selectedPoint = matchesYear(entry, point, selectedYear);
              const interval = hasInterval(point);
              return <g key={`${point.year}-${point.sourceLocator}`} data-point-year={point.year}>
                <title>{pointDescription(entry, point, locale, yearOffset)}</title>
                {entry.frequency === "survey_period" && <line data-period-bar={`${point.startYear ?? point.year}:${point.endYear ?? point.year}`} className={styles.interval} style={{ strokeWidth: selectedPoint ? 3 : 1.5 }} x1={x(point.startYear ?? point.year)} x2={x(point.endYear ?? point.year)} y1={y(point.value)} y2={y(point.value)} />}
                {interval && <g data-interval-kind={point.intervalKind ?? "reported"} data-uncertainty-interval={point.intervalKind !== "percentile_5_95" || undefined} data-distribution-interval={point.intervalKind === "percentile_5_95" || undefined} className={styles.interval}>
                  <line x1={x(point.year)} x2={x(point.year)} y1={y(point.lower!)} y2={y(point.upper!)} />
                  {[point.lower!, point.upper!].map((bound, i) => <line key={i} x1={x(point.year) - 3} x2={x(point.year) + 3} y1={y(bound)} y2={y(bound)} />)}
                </g>}
                <circle className={styles.point} cx={x(point.year)} cy={y(point.value)} r={selectedPoint ? 4.5 : entry.frequency === "survey_period" ? 3 : 2} data-selected-point={selectedPoint || undefined} />
              </g>;
            })}
            {selectedYear >= yearDomain[0] && selectedYear <= yearDomain[1] && <line data-year-cursor={selectedYear} className={styles.cursor} x1={x(selectedYear)} x2={x(selectedYear)} y1={TOP} y2={BOTTOM} />}
          </g>
          {cutoffs.filter(cutoff => cutoff >= yearDomain[0] && cutoff <= yearDomain[1]).map((cutoff, index) => {
            const rightAligned = x(cutoff) > width / 2;
            return <g key={cutoff} data-calibration-cutoff={cutoff}>
              <line className={styles.calibrationCutoff} x1={x(cutoff)} x2={x(cutoff)} y1={TOP} y2={BOTTOM} />
              <text className={styles.cutoffLabel} x={x(cutoff) + (rightAligned ? -5 : 5)} y={TOP + 10 + index * 13} textAnchor={rightAligned ? "end" : "start"}>{`${c.cutoff}: ${cutoff}`}</text>
            </g>;
          })}
          {yearTicks(yearDomain, width).map((year, index, ticks) => <text className={styles.axis} data-axis-year={year} key={year} x={x(year)} y={BOTTOM + 21} textAnchor={index === 0 ? "start" : index === ticks.length - 1 ? "end" : "middle"}>{yearOffset === undefined ? year : year - yearOffset}</text>)}
          <text className={styles.axisLabel} x={(LEFT + width - RIGHT) / 2} y={HEIGHT - 3} textAnchor="middle">{yearOffset === undefined ? c.year : c.relativeYear}</text>
          {annotationRows.map((row, index) => <g key={index} data-chart-legend={row.prediction ? "prediction" : row.color ? "observation" : "note"} data-calibration-role={row.role}>
            {row.color && <line x1={12} x2={42} y1={row.y - 4} y2={row.y - 4} className={row.prediction ? predictionClass(row.role ?? "prediction") : styles.curve} style={{ color: row.color }} />}
            <text className={styles.svgNote} x={row.color ? 52 : 12} y={row.y}>{row.lines.map((line, lineIndex) => <tspan key={lineIndex} x={row.color ? 52 : 12} dy={lineIndex ? 14 : 0}>{`${line}${lineIndex < row.lines.length - 1 ? " " : ""}`}</tspan>)}</text>
          </g>)}
        </svg>
      </PlotControl>
    </div>
    {!points.length && <p className={styles.note}>{c.noData}</p>}
    <span id={`${id}-interaction`} className={styles.srOnly}>{c.interaction}</span>
  </figure>;
}

export function ChangeAtlasCharts(props: ChangeAtlasChartsProps) {
  const c = props.locale === "fi" ? COPY.fi : COPY.en;
  const computedDomains = getChangeAtlasYDomains(props.series, props.overlaysBySeriesId, props.yearDomain);
  const domains = { ...computedDomains, ...props.yDomains };
  // A caller's shared domain remains a minimum extent: predictions must never be silently clipped.
  for (const entry of props.series) {
    if (props.overlaysBySeriesId?.[entry.id]?.unit !== entry.unit) continue;
    const key = domainKey(entry);
    const shared = validDomain(domains[key]);
    const computed = computedDomains[key];
    domains[key] = [Math.min(shared[0], computed[0]), Math.max(shared[1], computed[1])];
  }
  if (!props.series.length) return <p className={styles.note}>{c.noData}</p>;
  return <div className={styles.charts}>
    {props.series.map((entry) => <Lane key={entry.id} {...props} entry={entry} yDomain={domains[domainKey(entry)] ?? [0, 1]} />)}
    <p className={styles.note}>{[props.series.some((entry) => entry.frequency === "annual") ? c.annual : "", props.series.some((entry) => entry.frequency === "survey_period") ? c.periods : ""].filter(Boolean).join(" ")}</p>
  </div>;
}

export function ChangeAtlasAgeHeatmap(props: Omit<ChangeAtlasChartsProps, "yDomains" | "onOpenSource" | "overlaysBySeriesId">) {
  const id = useId();
  const { locale, yearDomain, selectedYear, onSelectYear, yearOffset } = props;
  const c = locale === "fi" ? COPY.fi : COPY.en;
  const series = props.series.filter((entry) => entry.metric === "asfr" && entry.ageGroup && entry.frequency === "annual").sort((a, b) => Number.parseInt(a.ageGroup!) - Number.parseInt(b.ageGroup!));
  // A heatmap is one population and unit. Parent country comparisons use separate instances.
  const first = series[0];
  const rows = first ? series.filter((entry) => entry.countryId === first.countryId && entry.unit === first.unit && entry.valueScale === first.valueScale) : [];
  const { ref, width } = useChartWidth(rows.length);
  const points = rows.flatMap((entry) => visiblePoints(entry, yearDomain));
  const max = Math.max(1, ...points.map((point) => point.value));
  const x = scaleLinear().domain([...validDomain(yearDomain)]).range([LEFT, width - RIGHT]);
  const cellWidth = x(yearDomain[0] + 1) - x(yearDomain[0]);
  const rowHeight = 29;
  const bottom = TOP + rows.length * rowHeight;
  const title = `${c.heatmap}, ${yearDomain[0]}–${yearDomain[1]}`;
  const unit = first ? text(first.unitLabel, locale) : "";
  const description = `${unit}. ${c.heatmapNote}`;
  if (!rows.length) return <p className={styles.note}>{c.noData}</p>;
  return <figure className={styles.lane} aria-labelledby={`${id}-caption`}>
    <figcaption id={`${id}-caption`} className={styles.heading}><strong>{c.heatmap}</strong><span className={styles.unit}>{unit}</span></figcaption>
    <div ref={ref} className={styles.chartWidth}>
      <PlotControl width={width} yearDomain={yearDomain} selectedYear={selectedYear} onSelectYear={onSelectYear} label={`${title}. ${c.year}: ${selectedYear}`} descriptionId={`${id}-interaction`}>
        <svg className={styles.svg} viewBox={`0 0 ${width} ${bottom + 30}`} width="100%" height={bottom + 30} role="img" aria-labelledby={`${id}-title`} aria-describedby={`${id}-description`}>
          <title id={`${id}-title`}>{title}</title><desc id={`${id}-description`}>{description}</desc>
          <defs><clipPath id={`${id}-clip`}><rect x={LEFT} y={TOP - 2} width={width - LEFT - RIGHT} height={bottom - TOP + 4} /></clipPath></defs>
          {rows.map((entry, index) => <g key={entry.id}>
            <text className={styles.axis} x={LEFT - 8} y={TOP + index * rowHeight + 19} textAnchor="end">{entry.ageGroup}</text>
            <rect x={LEFT} y={TOP + index * rowHeight} width={width - LEFT - RIGHT} height={rowHeight - 2} className={styles.emptyCell} />
            {visiblePoints(entry, yearDomain).map((point) => <rect key={point.year} clipPath={`url(#${id}-clip)`} data-heatmap-year={point.year} data-age-group={entry.ageGroup} data-heatmap-value={point.value} x={x(point.year - 0.5)} y={TOP + index * rowHeight} width={Math.max(0, cellWidth - 0.6)} height={rowHeight - 2} fill="var(--chart-series-1)" fillOpacity={0.12 + Math.max(0, point.value) / max * 0.88}>
              <title>{`${entry.ageGroup}: ${pointDescription(entry, point, locale, yearOffset)}`}</title>
            </rect>)}
          </g>)}
          {selectedYear >= yearDomain[0] && selectedYear <= yearDomain[1] && <rect data-year-cursor={selectedYear} clipPath={`url(#${id}-clip)`} x={x(selectedYear - 0.5)} y={TOP - 1} width={cellWidth} height={bottom - TOP} className={styles.selectedColumn} />}
          {yearTicks(yearDomain, width).map((year, index, ticks) => <text className={styles.axis} key={year} x={x(year)} y={bottom + 19} textAnchor={index === 0 ? "start" : index === ticks.length - 1 ? "end" : "middle"}>{yearOffset === undefined ? year : year - yearOffset}</text>)}
        </svg>
      </PlotControl>
    </div>
    <div className={styles.legend}><span>{c.low}: 0</span><span className={styles.legendScale} aria-hidden="true" /><span>{c.high}: {format(max, locale)}</span></div>
    <table className={styles.selectedTable}>
      <caption>{`${c.year}: ${selectedYear} · ${unit}`}</caption>
      <thead><tr><th scope="col">{c.age}</th><th scope="col">{unit}</th></tr></thead>
      <tbody>{rows.map((entry) => {
        const point = visiblePoints(entry, yearDomain).find((candidate) => candidate.year === selectedYear);
        return <tr key={entry.id}><th scope="row">{entry.ageGroup}</th><td>{point ? format(point.value, locale) : c.noPoint}</td></tr>;
      })}</tbody>
    </table>
    <p className={styles.note}>{c.heatmapNote}</p><span id={`${id}-interaction`} className={styles.srOnly}>{c.interaction}</span>
  </figure>;
}
