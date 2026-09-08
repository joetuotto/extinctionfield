"use client";

import { useId } from "react";
import { DEFAULT_BERM_ENDPOINT_PARAMETERS, runBermEndpointScenario, type BermEndpointHistoryPoint } from "@/lib/berm-endpoint-scenario";
import { ATLAS_PLOT_LAYOUT, AtlasPlotControl, atlasYearTicks, useAtlasChartWidth, validAtlasDomain } from "./ChangeAtlasCharts";
import styles from "./AtlasReadingGuide.module.css";

/** Deliberately synthetic source histories, separate from the country's inputs
 * and endpoint calibration. Reuse BERM's actual G → U → C implementation.
 * Cropping never changes the integration origin or creates a new initial stock. */
export function buildAtlasMemoryExample(from = 1880, to = 2023) {
  if (!Number.isInteger(from) || !Number.isInteger(to) || from < 1880 || to > 2023 || from > to) {
    throw new RangeError("The illustration covers calendar years 1880–2023");
  }
  const parameters = { ...DEFAULT_BERM_ENDPOINT_PARAMETERS, background: 0, coherence: 0, meanFraction: 0,
    rampYears: 0, lagYears: 3, memoryYears: 5, halfLifeYears: 20, historyStartYear: 1880, initialStock: 0,
    betaF: 0, betaT: 0 };
  const run = (startYear: number) => runBermEndpointScenario([{
    id: `illustration-${startYear}`, startYear, endYear: 2023,
    enabled: true, amplitude: 1, angleDegrees: 0,
    profile: [{ year: startYear, value: 1 }, { year: 2023, value: 1 }], profileMode: "step",
  }], parameters, from, to);
  return { early: run(1950), late: run(2000) };
}

const COPY = {
  fi: {
    guide: "Näin luet kuvaajia", observed: "Havainto", fitted: "Sovitusjakso", cutoff: "Sovitusraja", predicted: "Ehdollinen ennuste",
    key: "Piste tai tutkimusjakso tulee lähteestä. Yhtenäinen malliviiva on sovitusjaksolla, katkoviiva sen jälkeen. Pystyraja näyttää viimeisen sovitukseen käytetyn vuoden.",
    caveat: "Syötteiden muutos säilyttää lukitun vastekertoimen. Ennustekäyrä ei ole uusi havainto.",
    summary: "Miksi sama nykytila voi sisältää eri historian?",
    example: "Laskettu esimerkki, ei valitun maan aineisto",
    intro: "A:n vakiosyöte alkaa 1950 ja B:n 2000. Molempien G on 1 vuodesta 2000 ja U vuodesta 2008. Aiempi aloitus säilyy C:ssä.",
    early: "A · alku 1950", late: "B · alku 2000", year: "Yhteinen vuosi", noValue: "Ei laskettua arvoa",
    geometry: "G · vuoden lähdeprojektio", annual: "U · viiveellinen vuotuinen komponentti", accumulated: "C · säilynyt historia",
    projection: "normalisoitu projektio", years: "normalisoitu projektio × vuosi", scale: "A ja B samalla asteikolla",
    interaction: "Valitse vuosi. Sama kalenterivuosi kohdistaa G:n, U:n, C:n ja atlaksen havainnot.",
    assumptions: "Esimerkkioletukset: yksi normalisoitu potentiaalikomponentti, nollatausta, kiinteä suunta, hetkellinen aloitus. G = a². U on G:n tasapainoinen keskiarvo 3–8 vuotta aiemmasta. C(t) = 2^(−1/20) C(t−1) + U(t) × 1 vuosi. Kertymä aloitetaan arvosta C(1879) = 0; ennen lähteen alkua syöte on tässä esimerkissä 0. Aikarajaus ei nollaa historiaa.",
    boundary: "G käyttää valittua geometrian projektiota; U ja C käyttävät BERM:n ehdollisia viive- ja muistisulkuja. Niiden esimerkkiasteikko ja 20 vuoden puoliintumisaika eivät ole kudoskalibraatio. Havainne ei laske ihmisen biomarkkeria eikä muuta atlaksen ennustetta.",
  },
  en: {
    guide: "How to read the charts", observed: "Observation", fitted: "Calibration period", cutoff: "Fit boundary", predicted: "Conditional prediction",
    key: "A point or survey period comes from a source. A solid model line lies within the calibration period; a dashed line follows it. The vertical boundary marks the last year used for fitting.",
    caveat: "Changing inputs keeps the response gain locked. A prediction curve is not a new observation.",
    summary: "How can the same present state retain different histories?",
    example: "Computed example, separate from the selected country's data",
    intro: "A's constant input begins in 1950 and B's in 2000. Both have G = 1 from 2000 and U = 1 from 2008. The earlier start remains in C.",
    early: "A · starts 1950", late: "B · starts 2000", year: "Shared year", noValue: "No computed value",
    geometry: "G · this year's source projection", annual: "U · delayed annual component", accumulated: "C · retained history",
    projection: "normalized projection", years: "normalized projection × year", scale: "A and B share a scale",
    interaction: "Choose a year. The same calendar year aligns G, U, C and the atlas observations.",
    assumptions: "Example assumptions: one normalized potential component, zero background, fixed direction and instant onset. G = a². U is the equally weighted mean of G from 3–8 years earlier. C(t) = 2^(−1/20) C(t−1) + U(t) × 1 year. Retention starts at C(1879) = 0; input before each source's onset is 0 in this example. Cropping does not reset the history.",
    boundary: "G uses a selected geometric projection; U and C use BERM's conditional delay and memory closures. Their illustrative scale and 20-year half-life are not tissue calibration. This example computes no human biomarker and does not change the atlas prediction.",
  },
};

type Input = "geometry" | "annual" | "accumulated";
const INPUTS: Input[] = ["geometry", "annual", "accumulated"];
const { LEFT, RIGHT } = ATLAS_PLOT_LAYOUT;

export function AtlasReadingGuide({ locale, from, to, year, onYearChange }: {
  locale: string; from: number; to: number; year: number; onYearChange?: (year: number) => void;
}) {
  const c = locale === "fi" ? COPY.fi : COPY.en, id = useId();
  const { ref, width } = useAtlasChartWidth();
  const start = Math.max(1880, from), end = Math.min(2023, to);
  const example = buildAtlasMemoryExample(start, end);
  const domain = validAtlasDomain([start, end]);
  const x = (date: number) => LEFT + (date - domain[0]) / (domain[1] - domain[0]) * (width - LEFT - RIGHT);
  const format = (value: number | null | undefined) => value === null || value === undefined ? c.noValue
    : new Intl.NumberFormat(locale === "fi" ? "fi-FI" : "en-GB", { maximumFractionDigits: 2 }).format(value);
  const current = { early: example.early.history.find(p => p.year === year), late: example.late.history.find(p => p.year === year) };

  return <aside className={styles.guide} aria-label={c.guide} data-atlas-reading-guide>
    <div className={styles.legend}>
      <span><i className={styles.observation} aria-hidden="true" />{c.observed}</span>
      <span><i className={styles.fitted} aria-hidden="true" />{c.fitted}</span>
      <span><i className={styles.cutoff} aria-hidden="true" />{c.cutoff}</span>
      <span><i className={styles.predicted} aria-hidden="true" />{c.predicted}</span>
    </div>
    <p className={styles.key}>{c.key} {c.caveat}</p>
    <details className={styles.details}>
      <summary>{c.summary}</summary>
      <div className={styles.example} ref={ref} data-memory-example="synthetic" data-integration-origin="1880">
        <p className={styles.kicker}>{c.example}</p>
        <p className={styles.intro}>{c.intro}</p>
        <div className={styles.historyLegend}>
          <span><i className={styles.earlySwatch} aria-hidden="true" />{c.early}</span>
          <span><i className={styles.lateSwatch} aria-hidden="true" />{c.late}</span>
        </div>
        <p id={`${id}-interaction`} className={styles.instruction}>{c.interaction}</p>
        {onYearChange && <label className={styles.yearControl}>
          <span>{c.year} <strong>{year}</strong></span>
          <input type="range" min={start} max={end} step={1} value={year} aria-label={c.year}
            onChange={event => onYearChange(Number(event.target.value))} />
        </label>}
        {INPUTS.map(input => {
          // G and U have the same native unit; C has a separate projection-year scale.
          const upper = input === "accumulated" ? Math.max(1, ...example.early.history.map(p => p.accumulated ?? 0), ...example.late.history.map(p => p.accumulated ?? 0)) : 1;
          const y = (value: number) => 75 - value / upper * 66;
          const path = (points: BermEndpointHistoryPoint[]) => points.map((point, i) => `${i ? "L" : "M"}${x(point.year).toFixed(2)},${y(point[input]!).toFixed(2)}`).join(" ");
          const unit = input === "accumulated" ? c.years : c.projection;
          return <div className={styles.lane} key={input} data-memory-input={input} data-y-domain={`0:${upper}`}>
            <div className={styles.laneHeading}><strong>{c[input]}</strong><span>{unit}</span></div>
            <div className={styles.values} data-memory-values={input} data-selected-year={year}>
              <span>{year}: A <b>{format(current.early?.[input])}</b></span><span>B <b>{format(current.late?.[input])}</b></span>
            </div>
            <AtlasPlotControl width={width} yearDomain={[start, end]} selectedYear={year} onSelectYear={onYearChange}
              label={`${c[input]} · ${c.year} ${year}`} descriptionId={`${id}-interaction`}>
              <svg viewBox={`0 0 ${width} 82`} className={styles.plot} aria-hidden="true">
                <line x1={LEFT} y1={75} x2={width - RIGHT} y2={75} className={styles.axis} />
                <line x1={LEFT} y1={9} x2={width - RIGHT} y2={9} className={styles.grid} />
                <path d={path(example.early.points)} className={styles.earlyCurve} />
                <path d={path(example.late.points)} className={styles.lateCurve} />
                {year >= start && year <= end && <line x1={x(year)} x2={x(year)} y1={3} y2={79} className={styles.cursor} data-year-cursor={year} />}
              </svg>
            </AtlasPlotControl>
            <div className={styles.ticks} aria-hidden="true">
              {atlasYearTicks([start, end], width).map(tick => <span key={tick} style={{ left: `${x(tick) / width * 100}%` }}>{tick}</span>)}
            </div>
            <p className={styles.scale}>{c.scale}: 0–{format(upper)}</p>
          </div>;
        })}
        <p className={styles.assumptions}>{c.assumptions}</p>
        <p className={styles.boundary}>{c.boundary}</p>
      </div>
    </details>
  </aside>;
}
