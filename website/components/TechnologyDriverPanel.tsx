"use client";

import { useEffect, useId, useRef, useState, type KeyboardEvent, type MouseEvent } from "react";
import { scaleLinear } from "d3";
import { changeAtlasData, getChangeAtlasSeries, getChangeAtlasSource, type ChangeAtlasPoint, type ChangeAtlasSeries } from "@/lib/change-atlas-data";
import { atlasNumber, atlasText, downloadAtlasBlob, visibleAtlasPoints } from "@/lib/change-atlas-display";
import { atlasCsvCell } from "@/lib/change-atlas-state";
import { fieldReconstruction, getReconstructionSources, getReconstructionTracks } from "@/lib/field-reconstruction";
import { getTechnologyDriverCoverage } from "@/lib/technology-drivers-data";
import styles from "./TechnologyDriverPanel.module.css";

export interface TechnologyDriverPanelProps {
  countryId: string;
  locale: string;
  from: number;
  to: number;
  year: number;
  onYearChange: (year: number) => void;
}

const COPY = {
  fi: {
    title: "Teknologian määrällinen muutos", intro: "Sähköverkko, lähetysjärjestelmät, mobiili ja muut lähdeperheet samalla aikajanalla. Jokainen sarja säilyttää oman yksikkönsä ja alueellisen rajauksensa. Teknologian levinneisyys on BERM:n ajallista lähtöaineistoa; paikallinen kenttä ja sen kytkentä eliöön edellyttävät erillistä rekonstruktiota.",
    family: "Lähdeperhe", all: "Kaikki lähdeperheet", mobileTotal: "Mobiili, kaikki sukupolvet", unassigned: "Muu määrällinen teknologiasarja",
    reconstruct: "Näytä lineaarinen rekonstruktio puuttuvien vuosien yli", reconstructionNote: "Katkoviiva olettaa tasaisen muutoksen lähdepisteiden välillä. Se ei lisää havaintoja eikä jatka sarjaa ensimmäistä tai viimeistä lähdepistettä pidemmälle.",
    observed: "Lähdehavainto", annual: "Peräkkäiset vuosiarvot", reconstructed: "Lineaarinen rekonstruktio", noObservation: "Ei lähdehavaintoa", noReconstruction: "Ei rekonstruoitavaa väliä", noData: "Tällä aikarajauksella ei ole lähdehavaintoja.",
    legend: "Pisteet ovat lähdearvoja. Yhtenäinen viiva yhdistää peräkkäiset havaintovuodet; katkoviiva on valinnainen lineaarinen rekonstruktio. Asteikot ovat sarjakohtaisia.",
    year: "Vuosi", interval: "Ilmoitettu epävarmuusväli", bounds: "Lähdevuodet", scope: "Alue ja perusjoukko", source: "Lähde", sourceRows: "Lähdepisteet, menetelmä ja rajaukset", locator: "Tarkka lähdekohta", value: "Arvo", denominator: "Nimittäjä", missing: "Ei ilmoitettu", method: "Menetelmä",
    coverage: "Lähdeperheiden kattavuus", coverageNote: "Taulukko koskee valittua maata ja aikarajausta. Mobiililiittymien kokonaismäärä ei täytä sukupolvikohtaisten sarjojen aukkoja. Avoin kohta kertoo tämän aineistokoosteen puutteesta. Aikasarjaksi luokitellussa sarjassa on vähintään kolme havaintovuotta ja yksi peräkkäinen vuosipari; myös siinä voi olla aukkoja.",
    status: "Aineisto", years: "Pisteet ja ajanjakso", show: "Näytä", series: "Aikasarja", anchors: "Pisteankkurit", history: "Vain historia", open: "Avoin", events: "Dokumentoidut tapahtumat", historyOnly: "Tässä valinnassa on historiallista ajoitusta, mutta ei piirrettävää määrällistä sarjaa.",
    exportCsv: "Vie näkyvät lähdepisteet CSV", exportJson: "Vie näkyvät lähdepisteet JSON", exported: "Lähdepisteet viety", exportNote: "Viennit sisältävät alkuperäisarvot, lähdekohdat ja valitun aikarajauksen. Katkoviivan välivuosia ei tallenneta havaintoina.",
    interaction: "Valitse vuosi napsauttamalla kuvaajaa. Nuolinäppäimet vaihtavat vuotta; Home ja End siirtyvät aikarajauksen päihin.",
  },
  en: {
    title: "Quantitative technology change", intro: "Electricity networks, broadcasting, mobile systems and other source families share one timeline. Each series retains its own unit and geographical scope. Technology uptake supplies timing information to BERM; local fields and their coupling to organisms require a separate reconstruction.",
    family: "Source family", all: "All source families", mobileTotal: "Mobile, all generations", unassigned: "Other quantitative technology series",
    reconstruct: "Show linear reconstruction across missing years", reconstructionNote: "The dashed line assumes uniform change between source points. It adds no observations and does not extend the series before its first or after its last source point.",
    observed: "Source observation", annual: "Consecutive annual values", reconstructed: "Linear reconstruction", noObservation: "No source observation", noReconstruction: "No interval to reconstruct", noData: "No source observations in this time range.",
    legend: "Points are source values. Solid lines connect consecutive observed years; dashed lines are optional linear reconstructions. Each series has its own scale.",
    year: "Year", interval: "Reported uncertainty interval", bounds: "Source years", scope: "Area and population", source: "Source", sourceRows: "Source points, method and limitations", locator: "Exact source location", value: "Value", denominator: "Denominator", missing: "Not reported", method: "Method",
    coverage: "Coverage by source family", coverageNote: "The table covers the selected country and time range. Total mobile subscriptions do not fill gaps in generation-specific series. An open entry identifies a gap in this data collection. The time-series category requires at least three observed years including one consecutive pair; such series can still contain gaps.",
    status: "Data", years: "Points and period", show: "Show", series: "Time series", anchors: "Point anchors", history: "History only", open: "Open", events: "Documented events", historyOnly: "This selection has historical timing but no quantitative series to plot.",
    exportCsv: "Export visible source points as CSV", exportJson: "Export visible source points as JSON", exported: "Source points exported", exportNote: "Exports retain original values, source locations and the selected time range. Reconstructed intermediate years are not stored as observations.",
    interaction: "Choose a year by clicking the chart. Arrow keys change the year; Home and End move to the time-range limits.",
  },
};
type Copy = typeof COPY.en | typeof COPY.fi;
const LEFT = 60, RIGHT = 16, TOP = 12, BOTTOM = 134, HEIGHT = 208;

function familyId(series: ChangeAtlasSeries) { return series.technologyFamilyId ?? (series.metric === "mobile_subscriptions" ? "cellular-total" : "unassigned"); }
function allPoints(series: ChangeAtlasSeries) { return series.points.filter(p => Number.isFinite(p.value) && Number.isFinite(p.year)).slice().sort((a, b) => a.year - b.year); }
function annualSegments(points: ChangeAtlasPoint[]) {
  const segments: ChangeAtlasPoint[][] = [];
  for (const point of points) {
    const previous = segments.at(-1);
    if (previous?.at(-1)?.year === point.year - 1) previous.push(point);
    else segments.push([point]);
  }
  return segments.filter(segment => segment.length > 1);
}
function sourceInterval(points: ChangeAtlasPoint[], year: number) {
  const right = points.findIndex(point => point.year > year);
  if (right < 1 || points.some(point => point.year === year)) return null;
  const a = points[right - 1], b = points[right];
  return { value: a.value + (b.value - a.value) * (year - a.year) / (b.year - a.year), from: a.year, to: b.year };
}
function nativeValue(value: number, locale: string) {
  return new Intl.NumberFormat(locale === "fi" ? "fi-FI" : "en-GB", { maximumFractionDigits: 20 }).format(value);
}
function denominatorText(value: unknown, locale: string, missing: string): string {
  if (typeof value === "number") return atlasNumber(value, locale);
  if (typeof value === "string") return value;
  if (value && typeof value === "object" && "fi" in value && "en" in value && typeof value.fi === "string" && typeof value.en === "string") return atlasText({ fi: value.fi, en: value.en }, locale);
  if (value && typeof value === "object" && "value" in value && "unit" in value && typeof value.value === "number" && typeof value.unit === "string") {
    const population = "population" in value ? denominatorText(value.population, locale, "") : "";
    return `${nativeValue(value.value, locale)} ${value.unit}${population ? ` · ${population}` : ""}`;
  }
  return missing;
}

function sourcePointsCsv(series: ChangeAtlasSeries[], from: number, to: number, locale: string) {
  const rows: unknown[][] = [["series_id", "country", "family_id", "year", "source_value", "source_unit", "source_unit_label", "lower", "upper", "denominator", "scope", "source_id", "source_title", "source_url", "source_locator", "method", "edition"]];
  for (const entry of series) for (const point of visibleAtlasPoints(entry, from, to)) {
    const source = getChangeAtlasSource(point.sourceId);
    rows.push([entry.id, entry.countryId, familyId(entry), point.year, point.value, entry.unit.replace(/^technology_unit_/, ""), atlasText(entry.unitLabel, locale), point.lower, point.upper,
      typeof point.denominator === "object" ? JSON.stringify(point.denominator) : point.denominator,
      atlasText(entry.population, locale), point.sourceId, source?.title, source?.url, point.sourceLocator, atlasText(entry.method, locale), changeAtlasData.updatedAt]);
  }
  return "\uFEFF" + rows.map(row => row.map(atlasCsvCell).join(",")).join("\r\n");
}

function DriverLane({ series, locale, from, to, year, onYearChange, width, reconstruct }: TechnologyDriverPanelProps & { series: ChangeAtlasSeries; width: number; reconstruct: boolean }) {
  const id = useId();
  const c = locale === "fi" ? COPY.fi : COPY.en;
  const all = allPoints(series);
  const points = all.filter(p => p.year >= from && p.year <= to);
  const selected = points.find(p => p.year === year);
  const estimate = reconstruct && year >= from && year <= to ? sourceInterval(all, year) : null;
  const gaps = reconstruct ? all.slice(1).flatMap((b, index) => {
    const a = all[index];
    if (b.year - a.year <= 1 || a.year >= to || b.year <= from) return [];
    const start = Math.max(from, a.year), end = Math.min(to, b.year);
    const at = (yr: number) => a.value + (b.value - a.value) * (yr - a.year) / (b.year - a.year);
    return [{ a, b, start, end, startValue: at(start), endValue: at(end) }];
  }) : [];
  // A toggle changes only the reconstruction layer, never the native-unit scale.
  const domainValues = all.flatMap(p => [p.value, p.lower, p.upper].filter((v): v is number => v !== null && Number.isFinite(v)));
  const low = Math.min(...domainValues), high = Math.max(...domainValues);
  const pad = Math.max((high - low) * 0.1, Math.abs(high) * 0.025, 0.05);
  const yDomain = domainValues.length ? [low >= 0 ? Math.max(0, low - pad) : low - pad, high + pad] : [0, 1];
  const x = scaleLinear().domain(from === to ? [from - 0.5, to + 0.5] : [from, to]).range([LEFT, Math.max(LEFT + 1, width - RIGHT)]);
  const y = scaleLinear().domain(yDomain).range([BOTTOM, TOP]);
  const unit = atlasText(series.unitLabel, locale), title = atlasText(series.title, locale);
  const caption = `${title} · ${unit} · ${from}–${to}`;
  const pointLabel = (p: ChangeAtlasPoint) => `${p.year}: ${nativeValue(p.value, locale)} ${unit}${p.lower !== null && p.upper !== null ? `; ${c.interval}: ${nativeValue(p.lower, locale)}–${nativeValue(p.upper, locale)}` : ""}`;
  const select = (value: number) => onYearChange(Math.max(from, Math.min(to, Math.round(value))));
  const onClick = (event: MouseEvent<HTMLButtonElement>) => {
    if (event.detail === 0) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    if (!bounds.width) return;
    select(x.invert((event.clientX - bounds.left) / bounds.width * width));
  };
  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    const value = event.key === "ArrowLeft" || event.key === "ArrowDown" ? year - 1
      : event.key === "ArrowRight" || event.key === "ArrowUp" ? year + 1
        : event.key === "Home" ? from : event.key === "End" ? to : null;
    if (value !== null) { event.preventDefault(); select(value); }
  };
  const tickYears = [...new Set([from, ...x.ticks(width < 460 ? 3 : 6).filter(tick => Number.isInteger(tick) && tick > from && tick < to), to])]
    .filter((tick, i, ticks) => i === 0 || i === ticks.length - 1 || Math.min(tick - from, to - tick) > (to - from) * 0.07);
  return <figure className={styles.lane} aria-labelledby={`${id}-caption`} data-driver-series={series.id} data-y-domain={yDomain.join(",")}>
    <figcaption id={`${id}-caption`} className={styles.laneTitle}><strong>{title}</strong><span>{unit}</span></figcaption>
    <p className={styles.scope}>{c.scope}: {atlasText(series.population, locale)}</p>
    <div className={styles.readout} data-driver-readout={series.id} aria-live="polite">
      <span>{selected ? `${c.observed} · ${pointLabel(selected)}` : `${year} · ${c.noObservation}`}</span>
      {estimate && <span data-driver-estimate={year}>{c.reconstructed}: {nativeValue(estimate.value, locale)} {unit} ({c.bounds.toLowerCase()} {estimate.from}–{estimate.to})</span>}
    </div>
    <button type="button" className={styles.plot} onClick={onClick} onKeyDown={onKeyDown} aria-label={`${caption}. ${c.year}: ${year}`} aria-describedby={`${id}-interaction`}>
      <svg data-atlas-export="technology-driver" className={styles.svg} viewBox={`0 0 ${width} ${HEIGHT}`} width="100%" height={HEIGHT} role="img" aria-labelledby={`${id}-title`} aria-describedby={`${id}-desc`}>
        <title id={`${id}-title`}>{caption}</title><desc id={`${id}-desc`}>{`${c.legend} ${c.scope}: ${atlasText(series.population, locale)}`}</desc>
        <defs><clipPath id={`${id}-clip`}><rect x={LEFT - 4} y={TOP - 4} width={Math.max(1, width - LEFT - RIGHT + 8)} height={BOTTOM - TOP + 8} /></clipPath></defs>
        {y.ticks(3).map(tick => <g key={tick}><line className={styles.grid} x1={LEFT} x2={Math.max(LEFT + 1, width - RIGHT)} y1={y(tick)} y2={y(tick)} /><text className={styles.axis} x={LEFT - 8} y={y(tick) + 4} textAnchor="end">{new Intl.NumberFormat(locale === "fi" ? "fi-FI" : "en-GB", { maximumSignificantDigits: 3, notation: Math.abs(tick) >= 1e6 ? "compact" : "standard" }).format(tick)}</text></g>)}
        <g clipPath={`url(#${id}-clip)`}>
          {annualSegments(points).map(segment => <path key={segment[0].year} data-driver-annual={`${segment[0].year}:${segment.at(-1)!.year}`} className={styles.annualLine} d={segment.map((p, i) => `${i ? "L" : "M"}${x(p.year)},${y(p.value)}`).join(" ")} />)}
          {gaps.map(gap => <line key={`${gap.a.year}:${gap.b.year}`} data-driver-reconstruction={`${gap.a.year}:${gap.b.year}`} className={styles.reconstructionLine} x1={x(gap.start)} x2={x(gap.end)} y1={y(gap.startValue)} y2={y(gap.endValue)}><title>{`${c.reconstructed} · ${gap.a.year}–${gap.b.year}`}</title></line>)}
          {points.map(p => <g key={`${p.year}:${p.sourceLocator}`} data-driver-observation={p.year}>
            <title>{`${pointLabel(p)}; ${p.sourceLocator}`}</title>
            {p.lower !== null && p.upper !== null && p.lower <= p.upper && <g className={styles.interval} data-driver-interval={p.year}><line x1={x(p.year)} x2={x(p.year)} y1={y(p.lower)} y2={y(p.upper)} />{[p.lower, p.upper].map((bound, i) => <line key={i} x1={x(p.year) - 3} x2={x(p.year) + 3} y1={y(bound)} y2={y(bound)} />)}</g>}
            <circle className={styles.point} cx={x(p.year)} cy={y(p.value)} r={p.year === year ? 4 : 2.5} />
          </g>)}
          {year >= from && year <= to && <line className={styles.cursor} data-driver-cursor={year} x1={x(year)} x2={x(year)} y1={TOP} y2={BOTTOM} />}
        </g>
        {tickYears.map((tick, i, ticks) => <text className={styles.axis} key={tick} data-driver-axis-year={tick} x={x(tick)} y={BOTTOM + 20} textAnchor={i === 0 ? "start" : i === ticks.length - 1 ? "end" : "middle"}>{tick}</text>)}
        <text className={styles.axis} x={(LEFT + width - RIGHT) / 2} y={BOTTOM + 36} textAnchor="middle">{c.year}</text>
        <circle className={styles.point} cx={LEFT + 3} cy={HEIGHT - 20} r={2.5} /><text className={styles.axis} x={LEFT + 13} y={HEIGHT - 16}>{c.observed}</text>
        {reconstruct && <><line className={styles.reconstructionLine} x1={LEFT} x2={LEFT + 12} y1={HEIGHT - 5} y2={HEIGHT - 5} /><text className={styles.axis} x={LEFT + 17} y={HEIGHT - 1}>{c.reconstructed}</text></>}
      </svg>
    </button>
    <span id={`${id}-interaction`} className={styles.srOnly}>{c.interaction}</span>
    {!points.length && <p className={styles.note}>{c.noData}</p>}
    <div className={styles.sources}>{series.sourceIds.map(sourceId => {
      const source = getChangeAtlasSource(sourceId);
      return source ? <a key={sourceId} href={source.url} target="_blank" rel="noreferrer">{source.title} ↗</a> : null;
    })}</div>
    <details className={styles.details}><summary>{c.sourceRows}</summary>
      <p className={styles.note}>{c.method}: {atlasText(series.method, locale)}</p>
      {series.limitations.map((limitation, i) => <p key={i} className={styles.note}>{atlasText(limitation, locale)}</p>)}
      {points.length > 0 && <div className={styles.tableWrap}><table className={styles.table}>
        <caption>{`${title} · ${unit} · ${from}–${to}`}</caption>
        <thead><tr><th scope="col">{c.year}</th><th scope="col">{c.value}</th><th scope="col">{c.interval}</th><th scope="col">{c.denominator}</th><th scope="col">{c.locator}</th></tr></thead>
        <tbody>{points.map(p => <tr key={`${p.year}:${p.sourceLocator}`}><th scope="row">{p.year}</th><td>{nativeValue(p.value, locale)}</td><td>{p.lower !== null && p.upper !== null ? `${nativeValue(p.lower, locale)}–${nativeValue(p.upper, locale)}` : c.missing}</td><td>{denominatorText(p.denominator, locale, c.missing)}</td><td>{getChangeAtlasSource(p.sourceId) ? <a href={getChangeAtlasSource(p.sourceId)!.url} target="_blank" rel="noreferrer">{p.sourceLocator}</a> : p.sourceLocator}</td></tr>)}</tbody>
      </table></div>}
    </details>
  </figure>;
}

export function TechnologyDriverPanel({ countryId, locale, from, to, year, onYearChange }: TechnologyDriverPanelProps) {
  const c: Copy = locale === "fi" ? COPY.fi : COPY.en;
  const id = useId();
  const all = getChangeAtlasSeries(countryId).filter(s => s.datasetFamily === "technology");
  const available = all.filter(series => visibleAtlasPoints(series, from, to).length);
  const firstSeries = available[0] ?? all[0];
  const defaultFamily = available.some(series => familyId(series) === "electric-grid") ? "electric-grid" : firstSeries ? familyId(firstSeries) : "electric-grid";
  const [selectedFamily, setSelectedFamily] = useState(defaultFamily);
  const [reconstruct, setReconstruct] = useState(false);
  const [exported, setExported] = useState(false);
  const [width, setWidth] = useState(600);
  const container = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const element = container.current;
    if (!element) return;
    const update = () => { const measured = element.getBoundingClientRect().width; if (measured > 0) setWidth(Math.max(160, Math.round(measured))); };
    update();
    if (typeof ResizeObserver === "undefined") return;
    const observer = new ResizeObserver(update); observer.observe(element); return () => observer.disconnect();
  }, []);
  useEffect(() => {
    const restore = () => {
      const params = new URLSearchParams(window.location.search);
      const requested = params.get("t_family");
      const valid = requested === "all" || requested === "cellular-total" || requested === "unassigned" || fieldReconstruction.families.some(family => family.id === requested);
      setSelectedFamily(valid && requested ? requested : defaultFamily);
      setReconstruct(params.get("t_interpolate") === "1");
    };
    restore(); window.addEventListener("popstate", restore); return () => window.removeEventListener("popstate", restore);
  }, [defaultFamily]);
  const updateDisplay = (family: string, interpolate: boolean) => {
    setSelectedFamily(family); setReconstruct(interpolate); setExported(false);
    const url = new URL(window.location.href);
    url.searchParams.set("t_family", family); url.searchParams.set("t_interpolate", interpolate ? "1" : "0");
    window.history.replaceState(window.history.state, "", `${url.pathname}${url.search}${url.hash}`);
  };
  const families = [...fieldReconstruction.families.map(f => ({ id: f.id, title: atlasText(f.label, locale) })),
    ...[...new Set([...all.map(familyId), selectedFamily])].filter(value => value !== "all" && !fieldReconstruction.families.some(f => f.id === value)).map(value => ({ id: value, title: value === "cellular-total" ? c.mobileTotal : c.unassigned }))];
  const selected = selectedFamily === "all" ? all : all.filter(s => familyId(s) === selectedFamily);
  const tracks = getReconstructionTracks(countryId);
  const coverage = getTechnologyDriverCoverage(countryId, from, to).map(row => {
    const family = fieldReconstruction.families.find(family => family.id === row.familyId)!;
    const anchors = fieldReconstruction.anchors.filter(a => a.countryIds.includes(countryId as typeof a.countryIds[number]) && a.familyIds.includes(family.id) && a.startYear >= from && (a.endYear ?? a.startYear) <= to);
    return { ...row, family, anchors };
  });
  const selectedCoverage = coverage.find(row => row.family.id === selectedFamily);
  const selectionSources = [...new Set(selected.flatMap(s => s.sourceIds))].flatMap(sourceId => { const source = getChangeAtlasSource(sourceId); return source ? [source] : []; });
  const exportPoints = (format: "csv" | "json") => {
    const payload = format === "csv" ? sourcePointsCsv(selected, from, to, locale) : JSON.stringify({
      edition: changeAtlasData.updatedAt, countryId, from, to, familyId: selectedFamily,
      observationLayer: true, display: { linearReconstruction: reconstruct, note: c.exportNote },
      series: selected.map(s => ({ ...s, sourceUnit: s.unit.replace(/^technology_unit_/, ""), points: visibleAtlasPoints(s, from, to) })), sources: selectionSources,
    }, null, 2);
    downloadAtlasBlob(new Blob([payload], { type: format === "csv" ? "text/csv;charset=utf-8" : "application/json;charset=utf-8" }), `technology-${countryId}-${from}-${to}.${format}`);
    setExported(true);
  };
  return <section className={styles.panel} aria-labelledby={`${id}-heading`} data-technology-drivers data-technology-driver-state={JSON.stringify({ countryId, from, to, year, familyId: selectedFamily, linearReconstruction: reconstruct, seriesIds: selected.map(series => series.id), sourceIds: selectionSources.map(source => source.id) })}>
    <h2 id={`${id}-heading`} className={styles.heading}>{c.title}</h2><p className={styles.intro}>{c.intro}</p>
    <details className={styles.coverage}><summary>{c.coverage} · {fieldReconstruction.families.length}</summary>
      <p className={styles.note}>{c.coverageNote}</p>
      <div className={styles.tableWrap}><table className={styles.table}>
        <caption>{`${countryId} · ${from}–${to}`}</caption>
        <thead><tr><th scope="col">{c.family}</th><th scope="col">{c.status}</th><th scope="col">{c.years}</th></tr></thead>
        <tbody>{coverage.map(row => {
          return <tr key={row.family.id} data-driver-coverage={row.family.id}><th scope="row"><button type="button" aria-pressed={selectedFamily === row.family.id} onClick={() => updateDisplay(row.family.id, reconstruct)}>{atlasText(row.family.label, locale)}</button></th><td>{c[row.status]}</td><td>{row.pointCount ? `${row.pointCount} · ${row.firstYear}${row.lastYear !== row.firstYear ? `–${row.lastYear}` : ""}` : "—"}</td></tr>;
        })}</tbody>
      </table></div>
    </details>
    <div className={styles.controls}>
      <label htmlFor={`${id}-family`}>{c.family}<select id={`${id}-family`} value={selectedFamily} onChange={event => updateDisplay(event.target.value, reconstruct)}><option value="all">{c.all}</option>{families.map(family => <option key={family.id} value={family.id}>{family.title}</option>)}</select></label>
      <label className={styles.checkbox}><input type="checkbox" checked={reconstruct} onChange={event => updateDisplay(selectedFamily, event.target.checked)} />{c.reconstruct}</label>
    </div>
    <p className={styles.note}>{c.legend}</p>{reconstruct && <p className={styles.note}>{c.reconstructionNote}</p>}
    <div ref={container} className={styles.chartContainer}>
      {families.filter(family => selected.some(s => familyId(s) === family.id)).map(family => <section key={family.id} className={styles.group} aria-label={family.title}>
        <h3 className={styles.groupHeading}>{family.title}</h3>
        {selected.filter(s => familyId(s) === family.id).map(series => <DriverLane key={series.id} {...{ series, countryId, locale, from, to, year, onYearChange, width, reconstruct }} />)}
      </section>)}
    </div>
    {!selected.length && <p className={styles.note}>{selectedCoverage?.status === "history" || selectedCoverage?.status === "anchors" ? c.historyOnly : c.noData}</p>}
    {selectedCoverage && <div className={styles.historyContext}>
      {selectedCoverage.anchors.length > 0 && <><h3 className={styles.groupHeading}>{c.events}</h3>{selectedCoverage.anchors.map(anchor => <div key={anchor.id} className={styles.anchor}>
        <button type="button" className={styles.textButton} onClick={() => onYearChange(Math.max(from, Math.min(to, anchor.startYear)))}>{anchor.startYear}{anchor.endYear ? `–${anchor.endYear}` : ""} · {atlasText(anchor.title, locale)}</button>
        <p className={styles.note}>{atlasText(anchor.scope, locale)}</p>
        {anchor.values?.map((value, index) => <p key={index} className={styles.note}>{atlasText(value.label, locale)}: {nativeValue(value.value, locale)} {value.unit} · {atlasText(value.denominator, locale)}</p>)}
        <div className={styles.sources}>{getReconstructionSources(anchor.sourceRefs).map(source => <a key={source.id} href={source.url} target="_blank" rel="noreferrer">{source.title} ↗</a>)}</div>
      </div>)}</>}
      {tracks.find(track => track.familyId === selectedFamily) && <p className={styles.note}>{atlasText(tracks.find(track => track.familyId === selectedFamily)!.gap, locale)}</p>}
    </div>}
    <div className={styles.exports}><button type="button" onClick={() => exportPoints("csv")} disabled={!selected.some(s => visibleAtlasPoints(s, from, to).length)}>{c.exportCsv}</button><button type="button" onClick={() => exportPoints("json")} disabled={!selected.some(s => visibleAtlasPoints(s, from, to).length)}>{c.exportJson}</button><span role="status">{exported ? c.exported : ""}</span></div>
    <p className={styles.note}>{c.exportNote}</p>
  </section>;
}
