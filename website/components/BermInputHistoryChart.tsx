"use client";

import { useId } from "react";
import { scaleLinear } from "d3";
import type { BermEndpointHistoryPoint } from "@/lib/berm-endpoint-scenario";
import {
  ATLAS_PLOT_LAYOUT, AtlasPlotControl, atlasYearTicks, splitAtlasAnnualPoints,
  useAtlasChartWidth, validAtlasDomain, wrapAtlasSvgText,
} from "./ChangeAtlasCharts";
import styles from "./ChangeAtlasCharts.module.css";

export interface BermInputHistoryChartProps {
  history: BermEndpointHistoryPoint[];
  locale: string;
  from: number;
  to: number;
  year: number;
  onYearChange?: (year: number) => void;
  /** G is unlagged; U and C are always shown in their own native units. */
  showG?: boolean;
}

type InputKey = "geometry" | "annual" | "accumulated";
type Domain = readonly [number, number];
const { LEFT, RIGHT, TOP, BOTTOM, HEIGHT } = ATLAS_PLOT_LAYOUT;
const COPY = {
  fi: {
    geometry: "G(t) · Saman vuoden lähdeprojektio", annual: "U(t) · Viiveellinen vuosivaste", accumulated: "C(t) · Kertynyt projektiotila",
    projection: "normalisoitu projektio", projectionYears: "normalisoitu projektio × vuosi", derived: "BERM:n laskettu syöte",
    note: "Ehdollinen laskelma valitusta lähdehistoriasta. Puuttuvat vuodet katkaisevat viivan.",
    noValue: "Ei laskettua arvoa", noData: "Tälle rajaukselle ei ole laskettuja arvoja.", year: "Vuosi",
    interaction: "Valitse vuosi kuvaajasta tai yhteisellä vuosivalitsimella. Nuolinäppäimet vaihtavat vuotta; Home ja End siirtyvät rajauksen päihin.",
  },
  en: {
    geometry: "G(t) · Same-year source projection", annual: "U(t) · Delayed annual response", accumulated: "C(t) · Retained projection state",
    projection: "normalized projection", projectionYears: "normalized projection × year", derived: "BERM computed input",
    note: "Conditional calculation from the selected source history. Missing years break the line.",
    noValue: "No computed value", noData: "No computed values in this range.", year: "Year",
    interaction: "Choose a year on the chart or with the shared year selector. Arrow keys change the year; Home and End move to the range limits.",
  },
};

function number(value: number, locale: string) {
  return new Intl.NumberFormat(locale === "fi" ? "fi-FI" : "en-GB", { maximumSignificantDigits: 4 }).format(value);
}

function extent(values: (number | null)[]): Domain {
  const finite = values.filter((value): value is number => value !== null && Number.isFinite(value));
  if (!finite.length) return [0, 1];
  const low = Math.min(0, ...finite), high = Math.max(0, ...finite);
  const pad = Math.max((high - low) * 0.08, 0.001);
  return [low < 0 ? low - pad : 0, high + pad];
}

function InputLane({ input, history, locale, from, to, year, onYearChange, yDomain }: BermInputHistoryChartProps & { input: InputKey; yDomain: Domain }) {
  const id = useId();
  const { ref, width } = useAtlasChartWidth();
  const c = locale === "fi" ? COPY.fi : COPY.en;
  const domain: Domain = [from, to];
  const points = history.map(point => ({ year: point.year, value: point[input] }));
  const segments = splitAtlasAnnualPoints(points, domain);
  const selected = points.find(point => point.year === year && year >= from && year <= to);
  const value = selected?.value !== undefined && selected.value !== null && Number.isFinite(selected.value) ? selected.value : null;
  const unit = input === "accumulated" ? c.projectionYears : c.projection;
  const unitId = input === "accumulated" ? "normalized-projection-years" : "normalized-projection";
  const selectedText = `${c.year} ${year}: ${value === null ? c.noValue : `${number(value, locale)} ${unit}`}`;
  const title = `${c[input]}, ${from}–${to}`;
  const description = `${c.derived}. ${unit}. ${c.note} ${selectedText}`;
  const note = wrapAtlasSvgText(`${c[input]} · ${c.derived} · ${unit}. ${c.note}`, width - 28);
  const height = HEIGHT + note.length * 14 + 20;
  const x = scaleLinear().domain([...validAtlasDomain(domain)]).range([LEFT, width - RIGHT]);
  const y = scaleLinear().domain([...validAtlasDomain(yDomain)]).range([BOTTOM, TOP]);
  const color = input === "geometry" ? "var(--chart-series-4)" : input === "annual" ? "var(--chart-series-1)" : "var(--chart-series-3)";
  return <figure className={styles.lane} data-berm-input={input} data-input-unit={unitId} data-y-domain={y.domain().join(",")} aria-labelledby={`${id}-caption`}>
    <figcaption className={styles.heading}><div><strong id={`${id}-caption`}>{c[input]}</strong><span className={styles.unit}>{`${c.derived} · ${unit}`}</span></div></figcaption>
    <div className={styles.selected} data-selected-input={input}>{selectedText}</div>
    <div ref={ref} className={styles.chartWidth}>
      <AtlasPlotControl width={width} yearDomain={domain} selectedYear={year} onSelectYear={onYearChange} label={`${title}. ${c.year}: ${year}`} descriptionId={`${id}-interaction`}>
        <svg className={styles.svg} data-berm-input-svg={input} width="100%" height={height} viewBox={`0 0 ${width} ${height}`} role="img" aria-labelledby={`${id}-title`} aria-describedby={`${id}-description`}>
          <title id={`${id}-title`}>{title}</title><desc id={`${id}-description`}>{description}</desc>
          <defs><clipPath id={`${id}-clip`}><rect x={LEFT - 4} y={TOP - 4} width={width - LEFT - RIGHT + 8} height={BOTTOM - TOP + 8} /></clipPath></defs>
          {y.ticks(3).map(tick => <g className={styles.axis} key={tick}><line className={styles.grid} x1={LEFT} x2={width - RIGHT} y1={y(tick)} y2={y(tick)} /><text x={LEFT - 8} y={y(tick) + 4} textAnchor="end">{number(tick, locale)}</text></g>)}
          <g clipPath={`url(#${id}-clip)`} style={{ color }}>
            {segments.map((segment, index) => <path key={index} className={styles.curve} data-derived-segment={`${segment[0].year}:${segment.at(-1)!.year}`}
              d={segment.length === 1 ? `M${x(segment[0].year) - 3},${y(segment[0].value)} L${x(segment[0].year) + 3},${y(segment[0].value)}` : segment.map((point, i) => `${i ? "L" : "M"}${x(point.year)},${y(point.value)}`).join(" ")} />)}
            {year >= from && year <= to && <line data-year-cursor={year} className={styles.cursor} x1={x(year)} x2={x(year)} y1={TOP} y2={BOTTOM} />}
          </g>
          {atlasYearTicks(domain, width).map((tick, index, ticks) => <text className={styles.axis} data-axis-year={tick} key={tick} x={x(tick)} y={BOTTOM + 21} textAnchor={index === 0 ? "start" : index === ticks.length - 1 ? "end" : "middle"}>{tick}</text>)}
          <text className={styles.axisLabel} x={(LEFT + width - RIGHT) / 2} y={HEIGHT - 3} textAnchor="middle">{c.year}</text>
          <text className={styles.svgNote} x={12} y={HEIGHT + 14} data-input-legend={input}>{note.map((line, index) => <tspan key={index} x={12} dy={index ? 14 : 0}>{`${line}${index < note.length - 1 ? " " : ""}`}</tspan>)}</text>
        </svg>
      </AtlasPlotControl>
    </div>
    {!segments.length && <p className={styles.note}>{c.noData}</p>}
    <span id={`${id}-interaction`} className={styles.srOnly}>{c.interaction}</span>
  </figure>;
}

/** Calculated source-state history is deliberately independent of the observation registry. */
export function BermInputHistoryChart(props: BermInputHistoryChartProps) {
  const inputs: InputKey[] = props.showG ? ["geometry", "annual", "accumulated"] : ["annual", "accumulated"];
  const history = props.history.filter(point => Number.isSafeInteger(point.year) && point.year >= props.from && point.year <= props.to).sort((a, b) => a.year - b.year);
  const projectionDomain = extent(history.flatMap(point => props.showG ? [point.geometry, point.annual] : [point.annual]));
  const accumulatedDomain = extent(history.map(point => point.accumulated));
  const metadata = { kind: "BERM-derived-input-history", from: props.from, to: props.to, displayedInputs: inputs,
    units: { geometry: "normalized-projection", annual: "normalized-projection", accumulated: "normalized-projection-years" },
    points: history.map(point => ({ year: point.year, geometry: point.geometry, annual: point.annual, accumulated: point.accumulated })) };
  return <div className={styles.charts} data-berm-input-history={JSON.stringify(metadata)}>
    {inputs.map(input => <InputLane key={input} {...props} history={history} input={input} yDomain={input === "accumulated" ? accumulatedDomain : projectionDomain} />)}
  </div>;
}
