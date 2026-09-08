"use client";

import { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { BERM_ENDPOINT_MODES, runBermEndpointScenario, applyBermEndpointToAsfr, applyBermEndpointToTestosterone, type BermEndpointMode } from "@/lib/berm-endpoint-scenario";
import { buildTechnologyScenarioSources } from "@/lib/berm-technology-inputs";
import { parseBermEndpointDisplay, endpointDisplayValue } from "@/lib/berm-endpoint-display";
import { getChangeAtlasSeries, getChangeAtlasSource, type ChangeAtlasSeries } from "@/lib/change-atlas-data";
import { atlasText as text, atlasNumber as num, downloadAtlasBlob } from "@/lib/change-atlas-display";
import { atlasCsvCell } from "@/lib/change-atlas-state";
import { ChangeAtlasCharts, type ChangeAtlasPredictionOverlay } from "./ChangeAtlasCharts";
import styles from "./ChangeAtlas.module.css";
import { BermCalibratedEndpointPanel } from "./BermCalibratedEndpointPanel";

const LABELS = {
  annual: { fi: "BERM · vuotuinen vaste", en: "BERM · annual response" },
  accumulated: { fi: "BERM · kertynyt vaste", en: "BERM · accumulated response" },
  combined: { fi: "BERM · yhteisvaikutus", en: "BERM · combined response" },
};

export interface BermEndpointPanelProps {
  countryId: string; locale: string; from: number; to: number; year: number;
  observations: ChangeAtlasSeries[]; rawObservations: ChangeAtlasSeries[]; indexYear: number | null;
  onYearChange: (year: number) => void; onOpenSource: (seriesId: string) => void;
}

export function BermEndpointPanel(props: BermEndpointPanelProps) {
  const params=useSearchParams();
  return params.get("ep_fit") === "manual" ? <BermIllustrativeEndpointPanel {...props}/> : <BermCalibratedEndpointPanel {...props}/>;
}

function BermIllustrativeEndpointPanel({ countryId, locale, from, to, year, observations, rawObservations, indexYear, onYearChange, onOpenSource }: BermEndpointPanelProps) {
  const fi = locale === "fi", params = useSearchParams(), query = params.toString();
  const display = parseBermEndpointDisplay(params);
  const update = (patch: Record<string, string | null>) => {
    const url = new URL(window.location.href);
    for (const [key, value] of Object.entries(patch)) { if (value === null) url.searchParams.delete(key); else url.searchParams.set(key, value); }
    window.history.replaceState(null, "", `${url.pathname}?${url.searchParams}${url.hash}`);
  };
  const model = useMemo(() => {
    if (!display.enabled) return null;
    try {
      const p = new URLSearchParams(query), settings = parseBermEndpointDisplay(p);
      const sources = buildTechnologyScenarioSources(countryId, p);
      // Calculate through the complete atlas history, including a source-period anchor
      // beyond a cropped view. Cropping does not change either state or calibration.
      const scenario = runBermEndpointScenario(sources, settings.parameters, 1880, 2023);
      const fertility = applyBermEndpointToAsfr(scenario, getChangeAtlasSeries(countryId, "asfr").map(s => ({ ageGroup: s.ageGroup!, points: s.points })), settings.fertilityBaselineYear);
      const testosterone = rawObservations.filter(s => s.metric === "testosterone_total").map(series => {
        const baseline = series.points.find(p => p.value > 0 && (series.statistic !== "median" || (p.startYear ?? p.year) === (p.endYear ?? p.year)));
        return { seriesId: series.id, result: baseline ? applyBermEndpointToTestosterone(scenario, {
          value: baseline.value, unit: series.unit, sourceId: baseline.sourceId,
          statistic: series.statistic === "median" ? "median" : "arithmetic_mean",
          period: { startYear: baseline.startYear ?? baseline.year, endYear: baseline.endYear ?? baseline.year,
            label: baseline.period ? text(baseline.period, locale) : String(baseline.year) },
        }) : null };
      });
      const dataSources = [...new Set(sources.flatMap(s => s.sourceIds))].flatMap(id => { const source = getChangeAtlasSource(id); return source ? [source] : []; });
      return { scenario, sources, fertility, testosterone, dataSources, error: "" };
    } catch (error) { return { error: error instanceof Error ? error.message : "Calculation unavailable", scenario: null, sources: [], fertility: null, testosterone: [], dataSources: [] }; }
  }, [query, countryId, rawObservations, display.enabled, locale]);
  const modes: BermEndpointMode[] = display.compareChannels ? [...BERM_ENDPOINT_MODES] : [display.parameters.mode];
  const overlays: Record<string, ChangeAtlasPredictionOverlay> = {};
  const notes: { id: string; label: string; note: string }[] = [];
  if (model?.scenario) for (const shown of observations) {
    const raw = rawObservations.find(s => s.id === shown.id)!;
    const t = model.testosterone.find(s => s.seriesId === shown.id)?.result;
    let note = "";
    if (shown.metric === "tfr") note = fi ? `Ehdollinen ennuste. Lähtötaso: vuoden ${display.fertilityBaselineYear} ASFR-ikäryhmät 15–49; aiemmat vuodet ovat takaisinlaskentaa. Muu lisääntymisen tila pidetään vakiona.` : `Conditional prediction. Anchor: ${display.fertilityBaselineYear} ASFRs at ages 15–49; earlier years are backcasts. Other reproductive state is held fixed.`;
    else if (shown.metric === "testosterone_total") note = t ? (fi ? `Ehdollinen ennuste. Lähtötaso: ${t.baseline.period.label}, ${num(t.baseline.value, locale)} ${text(raw.unitLabel, locale)}. ${raw.statistic === "median" ? "Ankkuri on tämän ikäryhmän mediaani." : "Monivuotisen ankkurin kalenterivuosia painotetaan yhtä paljon."} Aiempi käyrä on takaisinlaskentaa.` : `Conditional prediction. Anchor: ${t.baseline.period.label}, ${num(t.baseline.value, locale)} ${text(raw.unitLabel, locale)}. ${raw.statistic === "median" ? "The anchor is this age group's median." : "Calendar years in a multi-year anchor have equal weights."} Earlier values are backcasts.`) : (fi ? "Ennusteen taso jää avoimeksi: valitussa mediaaniaineistossa ei ole yksiselitteiseen mittausvuoteen sidottua lähtöarvoa." : "Prediction level remains open: this median series has no baseline tied to a single collection year.");
    else continue;
    const lines = modes.map(mode => ({ id: `${shown.id}:${mode}`, mode, label: LABELS[mode], points: model.scenario!.points.filter(p => p.year >= from && p.year <= to).map(point => {
      const value = shown.metric === "tfr" ? model.fertility?.points.find(p => p.year === point.year)?.channels[mode].tfr ?? null : t?.points.find(p => p.year === point.year)?.channels[mode].value ?? null;
      return { year: point.year, value: endpointDisplayValue(value, raw, shown, indexYear) };
    }) }));
    overlays[shown.id] = { unit: shown.unit, lines, note: { fi: note, en: note } };
    notes.push({ id: shown.id, label: text(shown.title, locale), note });
  }
  const selected = model?.scenario?.history.find(p => p.year === year);
  const metadata = model ? { kind: "conditional_BERM_annual_and_accumulated_endpoints", model: "BERM", formulation: "2025-weyl-gme", parameters: display.parameters,
    countryId, visibleRange: { from, to }, selectedYear: year, fertilityBaselineYear: display.fertilityBaselineYear,
    displayedModes: modes, sources: model.sources, dataSources: model.dataSources, scenario: model.scenario,
    fertility: model.fertility, testosterone: model.testosterone, error: model.error, overlays, notes } : null;
  const download = () => {
    if (!metadata || !model?.scenario) return;
    const rows: unknown[][] = [["kind", "country", "series", "year", "channel", "value", "unit", "source_projection_G", "annual_response_U", "accumulated_state_C", "status", "parameters_json", "baseline_json", "source_profiles_json", "history_assumptions_json", "year_coverage_json", "endpoint_source_ids_json"]];
    for (const shown of observations) {
      const overlay = overlays[shown.id]; if (!overlay) continue;
      for (const line of overlay.lines) for (const point of line.points) {
        const input = model.scenario.history.find(p => p.year === point.year);
        const anchor = shown.metric === "tfr" ? { year: display.fertilityBaselineYear, asfrAges: "15–49" } : model.testosterone.find(t => t.seriesId === shown.id)?.result?.baseline;
        rows.push([metadata.kind, countryId, shown.id, point.year, line.mode, point.value, shown.unit, input?.geometry, input?.annual, input?.accumulated,
          point.value === null ? "unavailable" : "conditional_prediction", JSON.stringify(display.parameters), JSON.stringify(anchor ?? null),
          JSON.stringify(model.sources), JSON.stringify(model.scenario.assumptions), JSON.stringify(model.scenario.coverage.byYear.find(p => p.year === point.year)), JSON.stringify(shown.sourceIds)]);
      }
    }
    downloadAtlasBlob(new Blob(["\uFEFF" + rows.map(r => r.map(atlasCsvCell).join(",")).join("\r\n")], { type: "text/csv;charset=utf-8" }), `berm-annual-accumulated-${countryId}-${from}-${to}.csv`);
  };
  return <section data-berm-endpoint={metadata ? JSON.stringify(metadata) : undefined}>
    <div className={styles.predictionSwitch}>
      <label><input type="checkbox" checked={display.enabled} onChange={e => update({ forecast: e.target.checked ? "1" : "0" })} />{fi ? "Näytä BERM-ennuste havaintojen rinnalla" : "Show BERM prediction alongside observations"}</label>
      <p>{fi ? "Vuotuinen vaste ja aiemmasta lähdehistoriasta säilyvä kertymä. Ennusteen oletukset ja lähtöarvot ovat avattavissa." : "Annual response and a retained state from earlier source history. Prediction assumptions and anchors can be inspected."}</p>
    </div>
    {display.enabled && <>
      <div className={styles.controls}><label>{fi?"Vastekertoimen määritys":"Response-gain estimation"}<select value="manual" onChange={()=>update({ep_fit:"data"})}><option value="data">{fi?"Kalibroi tutkimusaineistoon":"Calibrate to study observations"}</option><option value="manual">{fi?"Käsin asetettu herkkyys":"Manually selected sensitivity"}</option></select></label></div>
      <div className={styles.predictionModes} aria-label={fi ? "Ennusteen vaikutuskanava" : "Prediction channel"}>
        {BERM_ENDPOINT_MODES.map(mode => <button type="button" key={mode} aria-pressed={display.parameters.mode === mode} onClick={() => update({ ep_mode: mode })}>{text(LABELS[mode], locale).replace("BERM · ", "")}</button>)}
        <label><input type="checkbox" checked={display.compareChannels} onChange={e => update({ ep_compare: e.target.checked ? "1" : "0" })} />{fi ? "Vertaa kaikkia kolmea" : "Compare all three"}</label>
      </div>
      <p className={styles.note}>{fi ? "Katkoviiva on BERM:n ehdollinen ennuste valituilla kenttä- ja vasteoletuksilla. Teknologiatilastoista muodostettu syöte ei vielä määritä paikallista EMF-annosta. Kertoimia ei soviteta myöhempiin havaintoihin." : "Dashed curves are conditional BERM predictions under the selected field and response assumptions. Technology-based inputs do not yet identify a local EMF dose. Gains are not fitted to later observations."}</p>
      {model?.scenario && <p className={styles.note}><strong>{fi ? "Ennusteen lähdeprofiilit: " : "Prediction source profiles: "}</strong>{model.sources.filter(s=>s.enabled).map(s=>text(s.title,locale)).join(" · ") || (fi ? "kaikki poistettu laskennasta" : "all excluded from calculation")}. {fi ? "Laskennan lähdevalinnat ja painot löytyvät alta ennusteen asetuksista." : "Calculation source choices and weights are listed in the prediction settings below."}</p>}
      {model?.error && <p role="alert" className={styles.note}>{fi ? "Ennustetta ei voi laskea näillä oletuksilla: " : "The prediction cannot be calculated under these assumptions: "}{model.error}</p>}
      {model?.scenario && !model.scenario.coverage.known && <p className={styles.note}>{fi ? "Osasta aiempaa historiaa puuttuu syöte. Tuntematon kertymä jättää sitä tarvitsevan ennustekäyrän avoimeksi; vuotuinen kanava voi silti olla laskettavissa." : "Parts of the earlier source history are unknown. Predictions requiring that accumulated state remain open; the annual channel can still have support."}</p>}
      <details className={styles.details}><summary>{fi ? "Säädä ennusteen oletuksia ja tarkista lähdehistoria" : "Adjust prediction assumptions and inspect source history"}</summary>
        <p className={styles.note}>{fi ? "Laskenta alkaa aina vuodesta 1880. Näkyvän aikavälin vaihtaminen ei aloita kertymää uudelleen. Kertymä kuvaa valittujen lähteiden mallinnettua historiaa; se ei ole yksilön elinaikainen mitattu annos." : "Integration always begins in 1880. Changing the visible date range does not restart accumulation. The retained state represents the selected sources' modelled history, not an individual's measured lifetime dose."}</p>
        <div className={styles.scenarioControls}>
          {[
            { key: "ep_halfLife", value: display.parameters.halfLifeYears, min: 0, max: 100, step: 1, label: fi ? "Kertymän puoliintumisaika · vuotta" : "Retention half-life · years" },
            { key: "ep_betaF", value: display.parameters.betaF, min: -1, max: 1, step: .05, label: fi ? "Syntyvyyden herkkyys βF" : "Fertility sensitivity βF" },
            { key: "ep_betaT", value: display.parameters.betaT, min: -1, max: 1, step: .05, label: fi ? "Testosteronin herkkyys βT" : "Testosterone sensitivity βT" },
            { key: "ep_annualWeight", value: display.parameters.annualWeight, min: 0, max: 3, step: .1, label: fi ? "Vuotuisen kanavan paino" : "Annual channel weight" },
            { key: "ep_historyWeight", value: display.parameters.historyWeight, min: 0, max: .5, step: .01, label: fi ? "Kertymäkanavan paino · 1/vuosi" : "History channel weight · 1/year" },
            { key: "s_lagYears", value: display.parameters.lagYears, min: 0, max: 30, step: 1, label: fi ? "Vasteviive · vuotta" : "Response delay · years" },
          ].map(control => <label key={control.key}>{control.label}<output>{num(control.value, locale)}</output><input aria-label={control.label} type="range" min={control.min} max={control.max} step={control.step} value={control.value} onChange={e => update({ [control.key]: e.target.value })} /></label>)}
        </div>
        <div className={styles.controls}>
          <label>{fi ? "Aikasarjojen ulkopuolinen lähdetieto" : "Source data beyond observation years"}<select value={params.get("s_edges") === "unknown" ? "unknown" : "hold"} onChange={e => update({ s_edges: e.target.value })}><option value="hold">{fi ? "Lähimmän arvon pitäminen · oletus" : "Hold nearest endpoint · assumption"}</option><option value="unknown">{fi ? "Jätä tuntemattomaksi" : "Leave unknown"}</option></select></label>
          <label>{fi ? "Kertymä ennen vuotta 1880" : "Retained state before 1880"}<select value={display.parameters.initialStock === null ? "unknown" : "assumed"} onChange={e => update({ ep_initial: e.target.value })}><option value="assumed">{fi ? "Oletettu alkutila" : "Assumed initial state"}</option><option value="unknown">{fi ? "Tuntematon" : "Unknown"}</option></select></label>
          {display.parameters.initialStock !== null && <label>{fi ? "Alkutilan arvo · oletus" : "Initial state value · assumption"}<input type="number" min={-100} max={100} step={1} value={display.parameters.initialStock} onChange={e => update({ ep_initialStock: e.target.value })} /></label>}
          <label>{fi ? "TFR:n lähtövuosi" : "TFR anchor year"}<input type="number" min={1950} max={2023} step={1} value={display.fertilityBaselineYear} onChange={e => update({ ep_baseF: e.target.value })} /></label>
        </div>
        <p className={styles.note}>{fi ? "βF ja βT ovat erillisiä havainnollistavia herkkyyksiä. Mallin geometrinen projektio, biologinen kytkentä, palautuminen ja ihmisvaikutuksen suuruus tarvitsevat erillisen kalibroinnin. Testosteroni- ja TFR-käyrä käyttävät tässä omia vastesulkujaan; niitä ei kytketä toisiinsa oletetulla hedelmällisyyskertoimella." : "βF and βT are separate illustrative gains. Geometry projection, biological coupling, recovery and human effect sizes need separate calibration. Testosterone and TFR have their own response closures here, with no assumed fertility conversion between them."}</p>
        <p className={styles.note}>G(t) = E[eᵘeᵛΔgᵤᵥ] · U(t) = mean₍d = lag … lag+memory₎ G(t−d) · C(t) = λ C(t−1) + U(t) × 1 yr; λ = 2^(−1/halfLife), λ = 0 {fi ? "kun halfLife = 0" : "when halfLife = 0"}.</p>
        <p className={styles.note}>{fi ? `Vuosi ${year}: lähdeprojektio G = ${selected?.geometry == null ? "avoin" : num(selected.geometry, locale, 3)}, viiveellinen vuosivaste U = ${selected?.annual == null ? "avoin" : num(selected.annual, locale, 3)}, säilyvä kertymä C = ${selected?.accumulated == null ? "avoin" : num(selected.accumulated, locale, 3)}.` : `Year ${year}: source projection G = ${selected?.geometry == null ? "unknown" : num(selected.geometry, locale, 3)}, delayed annual response U = ${selected?.annual == null ? "unknown" : num(selected.annual, locale, 3)}, retained state C = ${selected?.accumulated == null ? "unknown" : num(selected.accumulated, locale, 3)}.`}</p>
        <p className={styles.note}>{fi ? "G ja U ovat normalisoidun projektion yksiköissä; C projektiovuosissa. Kertymäkanavan paino muuntaa ne samaan vastesulkuun. Vuotuinen kanava käyttää yllä näkyvää viivettä ja " : "G and U use normalized projection units; C uses projection-years. History weight maps them into the response closure. The annual channel uses the displayed delay and "}{display.parameters.memoryYears + 1}{fi ? " vuosinäytteen keskiarvoa." : " equally weighted annual samples."}</p>
        {model?.sources.map(source => <p key={source.id} className={styles.note}>{text(source.title, locale)} · {source.enabled ? (fi ? "mukana" : "included") : (fi ? "pois" : "excluded")} · b = {source.amplitude} · {text(source.scope, locale)} · {text(source.reference, locale)}</p>)}
        <button type="button" className={styles.textButton} onClick={() => update({ view: "berm" })}>{fi ? "Avaa lähdekohtaiset kenttäasetukset" : "Open source-specific field settings"}</button>
        <p className={styles.note}>{fi ? "Lähdeasetukset avautuvat erilliseen BERM-skenaarioon, jonka oma kuvaaja tarkastelee lyhyttä vastemuistia. Palaa Muutos-näkymään nähdäksesi tässä määritellyn vuotuisen ja kertyneen vasteen yhdessä." : "Source settings open in the separate BERM scenario, whose own chart examines short response memory. Return to Change to see the annual and accumulated response defined here together."}</p>
      </details>
    </>}
    <ChangeAtlasCharts series={observations} locale={locale} yearDomain={[from, to]} selectedYear={year} onSelectYear={onYearChange} onOpenSource={onOpenSource} overlaysBySeriesId={overlays} />
    {display.enabled && model?.scenario && <button type="button" className={styles.textButton} onClick={download}>{fi ? "Lataa ennustekäyrät sekä vuotuinen ja kertynyt tila (CSV)" : "Download predictions, annual response and retained state (CSV)"}</button>}
  </section>;
}
