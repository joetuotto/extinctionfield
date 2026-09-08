"use client";

import { useEffect, useId, useRef, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import Link from "next/link";
import { changeAtlasData, getChangeAtlasSeries, getChangeAtlasSource, getAtlasComparisonMetrics, type ChangeAtlasSeries } from "@/lib/change-atlas-data";
import { ATLAS_VIEWS, parseAtlasState, serializeAtlasState, type AtlasState, type AtlasQuestion } from "@/lib/change-atlas-state";
import { atlasText as t, atlasNumber as num, indexAtlasSeries, visibleAtlasPoints, atlasSelectionCsv, createAtlasSvg, atlasSvgToPng, downloadAtlasBlob } from "@/lib/change-atlas-display";
import { ChangeAtlasCharts, ChangeAtlasAgeHeatmap, getChangeAtlasYDomains } from "./ChangeAtlasCharts";
import { FieldReconstructionTimeline, fieldEventOptions, fieldOnsetYear } from "./FieldReconstructionTimeline";
import { BermAtlasScenario } from "./BermAtlasScenario";
import { TechnologyDriverPanel } from "./TechnologyDriverPanel";
import { BermEndpointPanel } from "./BermEndpointPanel";
import { selectAtlasTestosteroneSeries } from "@/lib/berm-endpoint-display";
import { fieldReconstruction, getReconstructionAnchors, getReconstructionSources, getReconstructionTracks } from "@/lib/field-reconstruction";
import styles from "./ChangeAtlas.module.css";

const COPY = {
  fi: {
    intro: "Seuraa, miten teknologinen ympäristö, ihmisten biologinen tila ja muiden lajien kehitys muuttuivat eri paikoissa. Valitse ilmiö ja maa. Yhteinen aikajana näyttää muutoksen, kenttärekonstruktio sen lähdehistorian ja BERM-näkymä ehdollisen vaikutusketjun.",
    questions: [
      ["Syntyvyys", "TFR, ikäryhmät ja lisääntymisen ajoitus"], ["Biologinen tila", "Hormonit ja aineistoon perustuva sairauskehitys"],
      ["Sentinellilajit", "Lajien runsaus ja seurantajaksojen erot"], ["Teknologinen ympäristö", "Omaksuminen, kenttämuodot ja päällekkäisyys"],
    ],
    views: { change: "Muutos", compare: "Maavertailu", ages: "Ikä ja syntyvyys", events: "Tapahtuma-aika", fields: "Kenttärekonstruktio", berm: "BERM-skenaario", sources: "Aineistot" },
    country: "Esimerkkimaa", from: "Alkuvuosi", to: "Loppuvuosi", year: "Yhteinen vuosivalinta", relative: "Vuotta tapahtumasta", window: "Vuosia ennen ja jälkeen", range: "Ajanjakso",
    actual: "Lähdekohtainen asteikko", indexed: "Indeksoi alkuvuoteen", unitMode: "Esitystapa", baselineMissing: "Yhteisestä alkuvuodesta puuttuu arvo tai arvo on nolla. Sarja näyttää siksi alkuperäiset yksikkönsä.",
    noData: "Tässä maassa ei vielä ole valitun ilmiön varmennettua sarjaa. Alla ovat käytössä olevat syntyvyys- ja teknologiasarjat.",
    lookUSA: "Avaa USA:n biologinen tila", lookUK: "Avaa UK:n perhosseuranta", source: "Lähde ja menetelmä", dataTitle: "Aineistojen kattavuus ja alkuperä", dataset: "Aineisto", coverage: "Sarjoja / arvoja", family: "Ilmiö",
    selection: "Valitun näkymän arvot (CSV)", json: "Näkymä ja lähdetiedot (JSON)", svg: "Kuva (SVG)", png: "Kuva (PNG)", share: "Kopioi näkymän linkki", copied: "Linkki kopioitu", failed: "Toiminto ei onnistunut. Voit kopioida näkymän osoitteen selaimesta.", saved: "Tiedosto tallennettu", working: "Valmistellaan kuvaa…", exportTitle: "Muutosatlas",
    version: "Aineistoversio 8.9.2026", otherVersion: "Linkki viittaa toiseen aineistoversioon. Näytössä on 8.9.2026 julkaistu aineisto; pisteitä ei vaihdeta huomaamatta.",
    sourceAll: "Lataa koko sarjarekisteri", historyAll: "Lataa kenttärekonstruktio", sourceCount: "Julkaistuja arvoja", periods: "Lähdearvot säilyttävät tutkimusjaksonsa ja ilmoitetun välityypin: luottamusväli, jakauman persentiilit tai keskivirhe. Havaintoviivat yhdistävät vain peräkkäiset havaintovuodet.",
    compareNote: "Vertailu käyttää samaa suuretta, yksikköä ja pystyakselia. Historialliset alue- ja perusjoukkoerot säilyvät: esimerkiksi Länsi-Saksan sarja ei kata samaa aluetta kuin nykyinen Saksa. Tarkista rajaukset lähdetiedoista, kun vertaat muutosten ajoitusta ja suuruutta.",
    metric: "Vertailusuure", tfr: "Kokonaishedelmällisyys (TFR)", mobile: "Mobiililiittymät / 100 asukasta",
    event: "Kohdistettava teknologiasukupolvi", eventNote: "Nollavuosi on lähteen dokumentoima vertailutapahtuma: avaaminen, käytöstä kertova havainto tai asennusohjelman vaihe. Maakohtainen lähderajaus kertoo, mitä vuosi tarkoittaa. Asteittainen leviäminen ja muut lähteet näkyvät kenttärekonstruktiossa.",
    noEvent: "Tälle maalle ei ole vielä dokumentoitua valitun sukupolven aloitusvuotta.",
    ageNote: "Väri näyttää kunkin ikäryhmän syntyvyysluvun. Tämä auttaa erottamaan ikäryhmittäisen muutoksen synnytysten siirtymisestä myöhemmäksi. Periodisarja ei ole kohortin lopullinen lapsiluku.",
    ageDetail: "Avaa ikäryhmien varsinaiset aikasarjat", ageRates: "Syntymää / 1 000 naista", cohortNote: "Kohorttilapsiluvut, lapsettomuus ja synnytysjärjestys liitetään jatkossa HFD:n omilla määritelmillä. WPP:n 15–49-vuotiaiden ASFR-summa ei tässä korvaa erillisen TFR-sarjan määritelmää.",
    chain: "Miten muutokset liittyvät BERM:iin", chainSteps: [
      ["01 · Lähdeympäristö", "Teknologia, käyttö, aaltomuoto ja paikallinen kohtaaminen."],
      ["02 · Vastaanotintila", "Orientaatio, vuorokausi ja vuodenaika, kudos ja aiempi historia."],
      ["03 · Biologinen vaste", "Reseptori-, kello-, hormoni- ja elintoiminnan ehdolliset siirtymät."],
      ["04 · Väestö ja laji", "Ikäkohtainen lisääntyminen, pari- ja käyttäytymistaso sekä lajikohtainen elinkierto."],
    ],
    observation: "Havaintokerros", estimate: "Lähteen julkaisema estimaatti", reported: "Raportoitu tilastotieto", sourcePeriod: "Valitun vuoden havainto", noPoint: "Ei havaintoa valitulle vuodelle", missingCI: "Epävarmuusväliä ei ole julkaistu tässä lähdetuotteessa.",
    scopeNote: "Valtakunnallinen teknologiatilasto kuvaa lähdeympäristön historiaa. Paikallinen fysikaalinen rekonstruktio tarvitsee myös sijainnin, spektrin, käyttörytmin, suunnan ja mittausolosuhteet.",
    methods: "Laskenta, tulkinta ja toistettavuus", methodText: "Havaintokerroksessa ei soviteta EMF-vaikutuskerrointa syntyvyyskäyrään. BERM-skenaariossa amplitudit, geometrinen projektio ja biologinen vaste ovat näkyviä oletuksia. Viiden maan historiaa voi verrata samoilla parametreilla ja tarkistaa, minkä oletuksen muuttaminen muuttaa tulosta.",
  },
  en: {
    intro: "Follow how technological environments, human biological state and other species changed across places. Choose a question and a country. A shared timeline shows change, field reconstruction supplies source history, and the BERM view opens the conditional response chain.",
    questions: [["Fertility", "TFR, age groups and reproductive timing"], ["Biological state", "Hormones and source-based disease trends"], ["Sentinel species", "Abundance and monitoring periods"], ["Technological environment", "Adoption, field forms and coexistence"]],
    views: { change: "Change", compare: "Countries", ages: "Age and fertility", events: "Event time", fields: "Field reconstruction", berm: "BERM scenario", sources: "Data sources" },
    country: "Example country", from: "Start year", to: "End year", year: "Shared year selection", relative: "Years from event", window: "Years before and after", range: "Time range",
    actual: "Series-specific scale", indexed: "Index to start year", unitMode: "Display", baselineMissing: "The common baseline is missing or zero. This series therefore retains its original units.",
    noData: "This country has no verified series for the selected question yet. Available fertility and technology series appear below.", lookUSA: "Open US biological state", lookUK: "Open UK butterfly monitoring",
    source: "Source and method", dataTitle: "Data coverage and provenance", dataset: "Dataset", coverage: "Series / values", family: "Question",
    selection: "View values (CSV)", json: "View and provenance (JSON)", svg: "Figure (SVG)", png: "Figure (PNG)", share: "Copy view link", copied: "Link copied", failed: "The action failed. You can copy the view address from your browser.", saved: "File saved", working: "Preparing figure…", exportTitle: "Change atlas",
    version: "Data edition 8 September 2026", otherVersion: "This link refers to another data edition. The view uses the published 8 September 2026 edition; values are not silently substituted.",
    sourceAll: "Download all series", historyAll: "Download field reconstruction", sourceCount: "Published values", periods: "Source values retain their study periods and interval type: confidence interval, distribution percentiles or standard error. Lines only connect consecutive observation years.",
    compareNote: "The comparison uses a common quantity, unit and vertical scale. Historical differences in geography and population remain: a West German series, for example, does not cover the same territory as present-day Germany. Check source scopes when comparing the timing and size of changes.",
    metric: "Comparison quantity", tfr: "Total fertility rate (TFR)", mobile: "Mobile subscriptions / 100 people", event: "Technology generation to align",
    eventNote: "Year zero is a documented reference event: launch, a record of operation, or a deployment milestone. The country-specific source scope explains what that year means. Gradual deployment and other sources remain visible in the reconstruction.", noEvent: "No documented onset for this generation is available for this country yet.",
    ageNote: "Colour shows fertility within each age group. This helps distinguish age-specific change from births shifting to later ages. A period series is not completed cohort fertility.", ageDetail: "Open age-group time series", ageRates: "Births / 1,000 women", cohortNote: "Completed cohort fertility, childlessness and birth order will be linked using HFD definitions. The WPP ASFR sum for ages 15–49 does not replace the definition of the separate TFR series here.",
    chain: "How changes connect through BERM", chainSteps: [["01 · Source environment", "Technology, use, waveform and local encounter."], ["02 · Receiver state", "Orientation, circadian and seasonal timing, tissue and history."], ["03 · Biological response", "Conditional receptor, clock, hormone and organ transitions."], ["04 · Population and species", "Age-specific reproduction, partnering and behaviour, and species life cycles."]],
    observation: "Observation layer", estimate: "Published source estimate", reported: "Reported statistics", sourcePeriod: "Observation for selected year", noPoint: "No observation for this year", missingCI: "This source product does not publish an uncertainty interval.",
    scopeNote: "National technology statistics describe source history. Local physical reconstruction also needs location, spectrum, duty cycle, direction and measurement conditions.",
    methods: "Calculation, interpretation and reproducibility", methodText: "The observation layer does not fit an EMF effect coefficient to the fertility curve. In the BERM scenario, amplitudes, geometric projection and biological response are explicit assumptions. Compare all five histories using common parameters and inspect which assumption changes the result.",
  },
};
const QUESTIONS: AtlasQuestion[] = ["fertility","health","ecology","technology"];

export function ChangeAtlas({ locale }: { locale: string }) {
  const c = locale === "fi" ? COPY.fi : COPY.en;
  const params = useSearchParams();
  const pathname = usePathname();
  const state = parseAtlasState(params);
  const id = useId();
  const figureRoot = useRef<HTMLDivElement>(null);
  const [sourceId,setSourceId] = useState<string | null>(null);
  const [feedback,setFeedback] = useState("");
  const sourcePanel=useRef<HTMLElement>(null);
  useEffect(()=>{if(sourceId)sourcePanel.current?.scrollIntoView({behavior:"smooth",block:"start"});},[sourceId]);
  const update = (patch: Partial<AtlasState>) => {
    // Another control can update history before the App Router rerenders us.
    const currentParams = new URLSearchParams(window.location.search);
    const next = { ...parseAtlasState(currentParams), ...patch };
    next.from = Math.min(2022,Math.max(1880,next.from)); next.to = Math.min(2023,Math.max(next.from+1,next.to));
    next.year = Math.min(next.to,Math.max(next.from,next.year));
    next.relative = Math.min(next.window,Math.max(-next.window,next.relative));
    if (next.baseline !== null && (next.baseline<next.from || next.baseline>next.to)) next.baseline=next.from;
    const p = serializeAtlasState(next,currentParams);
    window.history.replaceState(null,"",`${window.location.pathname}?${p}${window.location.hash}`);
    setSourceId(null); setFeedback("");
  };
  const country = changeAtlasData.countries.find(r=>r.id===state.country)!;
  const countrySeries = getChangeAtlasSeries(state.country);
  const testosteroneShown = params.get("show_t") !== "0";
  const testosteroneSeries = countrySeries.filter(s=>s.metric==="testosterone_total");
  const selectedTestosterone = selectAtlasTestosteroneSeries(countrySeries,params.get("hormone"));
  const updateExtra = (patch:Record<string,string>) => {
    const url=new URL(window.location.href);
    for(const [key,value] of Object.entries(patch))url.searchParams.set(key,value);
    window.history.replaceState(null,"",`${url.pathname}?${url.searchParams}${url.hash}`);
    setSourceId(null);setFeedback("");
  };
  const selectSeries = (all: ChangeAtlasSeries[]) => {
    const technology = all.filter(s=>s.datasetFamily==="technology");
    const tfr = all.filter(s=>s.metric==="tfr");
    const hormone = testosteroneShown && selectedTestosterone ? [selectedTestosterone] : [];
    const endpoints = all.filter(s=>s.datasetFamily===state.question && s.metric!=="tfr" && s.metric!=="asfr" && s.datasetFamily!=="technology");
    return [...tfr,...hormone,...endpoints,...technology];
  };
  const rawSeries = state.view==="compare" || state.view==="events"
    ? changeAtlasData.series.filter(s=>s.metric===state.metric)
    : state.view==="ages" ? countrySeries.filter(s=>s.metric==="asfr" || s.metric==="tfr") : state.view==="berm"?countrySeries.filter(s=>s.metric==="tfr"):state.view==="fields"?countrySeries.filter(s=>s.metric==="tfr"||s.datasetFamily==="technology"):selectSeries(countrySeries);
  const baseline=["change","compare"].includes(state.view)?state.baseline:null;
  const compareIndexUnavailable=state.view==="compare"&&baseline!==null&&rawSeries.some(s=>indexAtlasSeries(s,baseline)===null);
  const effectiveBaseline=compareIndexUnavailable?null:baseline;
  const displayed = rawSeries.map(s => effectiveBaseline !== null && (state.view==="compare" || s.datasetFamily!=="technology") ? indexAtlasSeries(s,effectiveBaseline) ?? s
    : s.valueScale==="log10" ? indexAtlasSeries(s,1976) ?? s : s);
  const visible = displayed.map(s=>({...s,points:visibleAtlasPoints(s,state.from,state.to)}));
  const sharedY = getChangeAtlasYDomains(visible);
  const gap = (state.question==="health" || state.question==="ecology") && !countrySeries.some(s=>s.datasetFamily===state.question || state.question==="health"&&s.datasetFamily==="hormone");
  const normalizationMissing = baseline !== null && rawSeries.filter(s=>state.view==="compare"||s.datasetFamily!=="technology").some(s=>indexAtlasSeries(s,baseline)===null);
  const sourceSeries = sourceId ? displayed.find(s=>s.id===sourceId) : undefined;
  const eventOptions = fieldEventOptions();
  const currentEvent = eventOptions.some(f=>f.id===state.eventFamily) ? state.eventFamily : eventOptions[0]?.id ?? "";
  const eventWindows=Object.fromEntries(changeAtlasData.countries.flatMap(c=>{const onset=fieldOnsetYear(c.id,currentEvent);return onset===null?[]:[[c.id,{onset,window:state.window}]];}));
  const exportSelection = () => {
    const driverState=JSON.parse(figureRoot.current?.querySelector("[data-technology-driver-state]")?.getAttribute("data-technology-driver-state")??"null") as {seriesIds?:string[]}|null;
    const keep=(s:ChangeAtlasSeries)=>!driverState||s.datasetFamily!=="technology"||driverState.seriesIds?.includes(s.id);
    return {raw:rawSeries.filter(keep),displayed:displayed.filter(keep),driverState};
  };
  const metadata = () => {const selected=exportSelection();return ({ edition: changeAtlasData.updatedAt, locale, selections: parseAtlasState(params), url: window.location.href,
    sourceIds: [...new Set(selected.raw.flatMap(s=>s.sourceIds))], sources: changeAtlasData.sources.filter(s=>selected.raw.some(r=>r.sourceIds.includes(s.id))),
    series: selected.raw, displayedSeries: selected.displayed, technologyDriverSelection:selected.driverState, observationLayer: true,
    fieldReconstruction: ["change","fields","berm"].includes(state.view)?fieldReconstruction:null,
    fieldSources: ["change","fields","berm"].includes(state.view)?getReconstructionSources(getReconstructionTracks(state.country).flatMap(t=>t.phases.flatMap(p=>p.sourceRefs))):[],
    scenario: JSON.parse(figureRoot.current?.querySelector("[data-berm-scenario]")?.getAttribute("data-berm-scenario") ?? "null"),
    endpointPrediction: JSON.parse(figureRoot.current?.querySelector("[data-berm-endpoint]")?.getAttribute("data-berm-endpoint") ?? "null") });};
  const exportAction = async (kind: "csv"|"json"|"svg"|"png"|"share") => {
    try {
      if (kind==="share") { const p=serializeAtlasState(state,new URLSearchParams(params.toString())); const url=new URL(`${pathname}?${p}`,window.location.origin); await navigator.clipboard.writeText(url.href);setFeedback(c.copied);return; }
      const filename=`berm-atlas-${state.country}-${state.view}-${state.from}-${state.to}`;
      if (kind==="csv") {const selected=exportSelection();downloadAtlasBlob(new Blob([atlasSelectionCsv(selected.displayed,selected.raw,state.from,state.to,locale,state.view==="events"?eventWindows:undefined)],{type:"text/csv;charset=utf-8"}),`${filename}.csv`);}
      if (kind==="json") downloadAtlasBlob(new Blob([JSON.stringify(metadata(),null,2)],{type:"application/json"}),`${filename}.json`);
      if (kind==="svg" || kind==="png") {
        setFeedback(c.working);
        const svg=createAtlasSvg(figureRoot.current!,`${c.exportTitle} · ${["compare","events"].includes(state.view)?(locale==="fi"?"Viisi esimerkkimaata":"Five example countries"):t(country.name,locale)} · ${c.views[state.view]}`,metadata());
        downloadAtlasBlob(kind==="svg"?new Blob([svg],{type:"image/svg+xml;charset=utf-8"}):await atlasSvgToPng(svg),`${filename}.${kind}`);
      }
      setFeedback(c.saved);
    } catch { setFeedback(c.failed); }
  };
  const insight = (() => {
    const s = countrySeries.find(s=>s.metric==="tfr");
    const points=s?visibleAtlasPoints(s,state.from,state.to):[];
    if(points.length<2)return "";
    const first=points[0], last=points[points.length-1], change=last.value-first.value;
    return locale==="fi" ? `${t(country.name,locale)}: TFR muuttui ${num(first.value,locale)}:stä (${first.year}) ${num(last.value,locale)}:een (${last.year}), muutos ${change>0?"+":""}${num(change,locale)} lasta naista kohti. Ikäryhmänäkymä näyttää, missä iässä muutos tapahtui.`
      : `${t(country.name,locale)}: TFR changed from ${num(first.value,locale)} (${first.year}) to ${num(last.value,locale)} (${last.year}), a change of ${change>0?"+":""}${num(change,locale)} children per woman. The age view shows where this change occurred.`;
  })();

  const hormoneInsight = (() => {
    if (!testosteroneShown || !selectedTestosterone) return "";
    const points=visibleAtlasPoints(selectedTestosterone,state.from,state.to);
    if(points.length<2)return "";
    const first=points[0],last=points[points.length-1], change=100*(last.value/first.value-1);
    const period=(p:typeof first)=>p.period?t(p.period,locale):String(p.year);
    const statistic=selectedTestosterone.statistic === "median" ? (locale==="fi"?"Mediaani":"Median") : (locale==="fi"?"Keskiarvo":"Mean");
    return `${t(selectedTestosterone.title,locale)}. ${statistic}: ${num(first.value,locale)} (${period(first)}) → ${num(last.value,locale)} ${t(selectedTestosterone.unitLabel,locale)} (${period(last)}), ${change>0?"+":""}${num(change,locale,1)} %. n = ${first.n ?? "?"} / ${last.n ?? "?"}. ${locale==="fi"?"Muutos koskee lähteen tutkimusryhmiä; ikäjakauma ja menetelmät on kuvattu lähdetiedoissa.":"The change describes the source study groups; age composition and assays are documented in the source details."}`;
  })();

  return <div className={styles.atlas}>
    <p className={styles.intro}>{c.intro}</p>
    {params.get("edition") && params.get("edition")!==changeAtlasData.updatedAt && <p role="status" className={styles.note}>{c.otherVersion}</p>}
    <div className={styles.questions} aria-label={locale==="fi"?"Tutkimuskysymys":"Research question"}>
      {QUESTIONS.map((q,i)=><button key={q} type="button" className={styles.question} aria-pressed={state.question===q} onClick={()=>update({question:q,view:"change"})}><strong>{c.questions[i][0]}</strong><span>{c.questions[i][1]}</span></button>)}
    </div>
    <div className={styles.controls}>
      {!["compare","events"].includes(state.view)&&<label>{c.country}<select value={state.country} onChange={e=>update({country:e.target.value as AtlasState["country"]})}>{changeAtlasData.countries.map(r=><option key={r.id} value={r.id}>{t(r.name,locale)}</option>)}</select></label>}
      {state.view!=="events" ? <><label>{c.from}<input type="number" min={1880} max={state.to-1} key={`from-${state.from}`} defaultValue={state.from} onBlur={e=>{if(e.target.value)update({from:Number(e.target.value)});}} onKeyDown={e=>{if(e.key==="Enter")e.currentTarget.blur();}} /></label><label>{c.to}<input type="number" min={state.from+1} max={2023} key={`to-${state.to}`} defaultValue={state.to} onBlur={e=>{if(e.target.value)update({to:Number(e.target.value)});}} onKeyDown={e=>{if(e.key==="Enter")e.currentTarget.blur();}} /></label></> : <label>{c.window}<select value={state.window} onChange={e=>update({window:Number(e.target.value)})}>{[5,10,15,20,25,30].map(y=><option key={y} value={y}>{y}</option>)}</select></label>}
      {["change","compare"].includes(state.view) && <label>{c.unitMode}<select value={state.baseline===null?"native":"index"} onChange={e=>update({baseline:e.target.value==="native"?null:state.from})}><option value="native">{c.actual}</option><option value="index">{c.indexed} ({state.from}=100)</option></select></label>}
    </div>
    <div className={styles.tabs} role="tablist" aria-label={locale==="fi"?"Tarkastelutapa":"Atlas view"}>
      {ATLAS_VIEWS.map((view,i)=><button key={view} id={`${id}-${view}-tab`} type="button" role="tab" aria-selected={state.view===view} aria-controls={`${id}-panel`} tabIndex={state.view===view?0:-1} onClick={()=>update({view})} onKeyDown={e=>{let n=i;if(e.key==="ArrowRight")n=(i+1)%ATLAS_VIEWS.length;else if(e.key==="ArrowLeft")n=(i+ATLAS_VIEWS.length-1)%ATLAS_VIEWS.length;else if(e.key==="Home")n=0;else if(e.key==="End")n=ATLAS_VIEWS.length-1;else return;e.preventDefault();update({view:ATLAS_VIEWS[n]});document.getElementById(`${id}-${ATLAS_VIEWS[n]}-tab`)?.focus();}}>{c.views[view]}</button>)}
    </div>
    {state.view!=="sources" && <div className={styles.year}><label htmlFor={`${id}-year`}>{state.view==="events"?c.relative:c.year}</label><input id={`${id}-year`} type="range" min={state.view==="events"?-state.window:state.from} max={state.view==="events"?state.window:state.to} step={1} value={state.view==="events"?Math.max(-state.window,Math.min(state.window,state.relative)):state.year} onChange={e=>update(state.view==="events"?{relative:Number(e.target.value)}:{year:Number(e.target.value)})}/><output htmlFor={`${id}-year`}>{state.view==="events"?(state.relative>0?"+":"")+state.relative:state.year}</output></div>}
    <div ref={figureRoot} id={`${id}-panel`} role="tabpanel" aria-labelledby={`${id}-${state.view}-tab`}>
      {state.view==="change" && <>
        <h2 className={styles.panelTitle}>{t(country.name,locale)} · {state.from}–{state.to}</h2>
        {insight && <p className={styles.insight}>{insight}</p>}
        {gap && <div className={styles.gap}><p className={styles.note}>{c.noData}</p><button className={styles.textButton} onClick={()=>update({country:state.question==="health"?"USA":"GBR"})}>{state.question==="health"?c.lookUSA:c.lookUK}</button></div>}
        {normalizationMissing && <p className={styles.note}>{c.baselineMissing}</p>}
        {displayed.some(s=>s.metric==="butterfly_abundance") && <p className={styles.note}>{locale==="fi"?"Perhoset näytetään suhteellisena runsautena: 1976 = 100, ellei yhteistä vertailuvuotta ole valittu. Molemmilla lajeilla on sama asteikko. Alkuperäiset log10-arvot ja muunnos säilyvät lähdetiedoissa ja viennissä.":"Butterflies use relative abundance: 1976 = 100 unless a common baseline is selected. Both species share the same scale. Source log10 values and the transformation remain available in provenance and export."}</p>}
        <div className={styles.biologySelection}>
          <label><input type="checkbox" checked={testosteroneShown} onChange={e=>updateExtra({show_t:e.target.checked?"1":"0"})}/>{locale==="fi"?"Näytä myös testosteroni":"Also show testosterone"}</label>
          {testosteroneShown && selectedTestosterone && <label>{locale==="fi"?"Testosteronin tutkimusryhmä":"Testosterone study population"}<select value={selectedTestosterone.id} onChange={e=>updateExtra({hormone:e.target.value})}>{testosteroneSeries.map(s=><option key={s.id} value={s.id}>{t(s.title,locale)}</option>)}</select></label>}
        </div>
        {testosteroneShown && !selectedTestosterone && <div className={styles.gap}><p className={styles.note}>{locale==="fi"?"Tälle maalle ei ole vielä tuotu vertailukelpoista testosteronisarjaa. Muiden maiden mittauksia voi tarkastella vaihtamalla maata.":"A comparable testosterone series has not yet been imported for this country. Change country to inspect available measurements."}</p><button className={styles.textButton} onClick={()=>update({country:"FIN"})}>{locale==="fi"?"Näytä Suomen testosteronihavainnot":"Show Finnish testosterone observations"}</button></div>}
        {hormoneInsight && <p className={styles.insight} data-hormone-change>{hormoneInsight}</p>}
        <BermEndpointPanel countryId={state.country} locale={locale} from={state.from} to={state.to} year={state.year} observations={displayed.filter(s=>s.datasetFamily!=="technology")} rawObservations={rawSeries.filter(s=>s.datasetFamily!=="technology")} indexYear={effectiveBaseline} onYearChange={year=>update({year})} onOpenSource={setSourceId}/>
        <p className={styles.note}>{c.periods}</p>
        <TechnologyDriverPanel countryId={state.country} locale={locale} from={state.from} to={state.to} year={state.year} onYearChange={year=>update({year})}/>
        <FieldReconstructionTimeline countryId={state.country} locale={locale} from={state.from} to={state.to} year={state.year} onYearChange={year=>update({year})} compact onExpand={()=>update({view:"fields"})}/>
      </>}
      {(state.view==="compare" || state.view==="events") && <>
        <h2 className={styles.panelTitle}>{c.views[state.view]}</h2><p className={styles.note}>{state.view==="events"?c.eventNote:c.compareNote}</p>
        <div className={styles.controls}><label>{c.metric}<select value={state.metric} onChange={e=>update({metric:e.target.value as AtlasState["metric"]})}>{getAtlasComparisonMetrics().map(m=><option key={m.metric} value={m.metric}>{t(m.title,locale)} · {m.countryCount}/5 {locale==="fi"?"maata":"countries"}</option>)}</select></label>
          {state.view==="events" && <label>{c.event}<select value={currentEvent} onChange={e=>update({eventFamily:e.target.value})}>{eventOptions.map(f=><option key={f.id} value={f.id}>{t(f.label,locale)}</option>)}</select></label>}
        </div>
        {normalizationMissing && state.view==="compare" && <p className={styles.note}>{locale==="fi"?"Yhteistä indeksivuotta ei voi käyttää kaikissa maissa: ainakin yksi arvo puuttuu tai on nolla. Kaikki viisi kuvaajaa näyttävät siksi alkuperäisen suureen samalla asteikolla.":"The common baseline is unavailable or zero in at least one country. All five charts therefore retain the original quantity on one shared scale."}</p>}
        <div className={styles.compare}>{changeAtlasData.countries.map(r=>{
          const onset=state.view==="events"?fieldOnsetYear(r.id,currentEvent):null;
          const series=displayed.filter(s=>s.countryId===r.id);
          if(state.view==="events" && onset===null)return <section key={r.id}><h3>{t(r.name,locale)}</h3><p className={styles.note}>{c.noEvent}</p></section>;
          if(!series.length)return <section key={r.id}><h3>{t(r.name,locale)}</h3><p className={styles.note}>{locale==="fi"?"Valitusta mittarista ei ole tämän maan aineistoa tässä koostessa.":"This collection has no series for this country and indicator."}</p></section>;
          const eventWindow=getReconstructionTracks(r.id).find(track=>track.familyId===currentEvent)?.scenarioWindows.filter(w=>w.kind==="onset").sort((a,b)=>a.earliestYear-b.earliestYear)[0];
          const eventAnchors=eventWindow?getReconstructionAnchors(eventWindow.anchorIds):[];
          const domain: [number,number] = onset===null?[state.from,state.to]:[onset-state.window,onset+state.window];
          const y=state.view==="events"?getChangeAtlasYDomains(displayed):sharedY;
          return <section key={r.id}><h3>{t(r.name,locale)}{onset!==null?` · ${onset} = 0`:""}</h3>{onset!==null&&<details className={styles.note}><summary>{locale==="fi"?"Vertailutapahtuma ja sen alue":"Reference event and its scope"}</summary>{eventAnchors.map(a=><div key={a.id}><p>{t(a.title,locale)} · {a.startYear}{a.endYear?`–${a.endYear}`:""}</p><p>{t(a.scope,locale)}</p>{getReconstructionSources(a.sourceRefs).map(s=><p key={s.id}><a href={s.url} target="_blank" rel="noreferrer">{s.title} ↗</a></p>)}</div>)}</details>}<ChangeAtlasCharts series={series} locale={locale} yearDomain={domain} selectedYear={onset===null?state.year:onset+state.relative} yearOffset={onset??undefined} onSelectYear={year=>update(onset===null?{year}:{relative:year-onset})} onOpenSource={setSourceId} yDomains={y}/></section>;
        })}</div>
      </>}
      {state.view==="ages" && <><h2 className={styles.panelTitle}>{t(country.name,locale)} · {c.views.ages}</h2><p className={styles.note}>{c.ageNote}</p>
        <ChangeAtlasAgeHeatmap series={countrySeries.filter(s=>s.metric==="asfr")} locale={locale} yearDomain={[state.from,state.to]} selectedYear={state.year} onSelectYear={year=>update({year})}/>
        <ChangeAtlasCharts series={countrySeries.filter(s=>s.metric==="tfr")} locale={locale} yearDomain={[state.from,state.to]} selectedYear={state.year} onSelectYear={year=>update({year})} onOpenSource={setSourceId}/>
        <details className={styles.details}><summary>{c.ageDetail}</summary><ChangeAtlasCharts series={countrySeries.filter(s=>s.metric==="asfr")} locale={locale} yearDomain={[state.from,state.to]} selectedYear={state.year} onSelectYear={year=>update({year})} onOpenSource={setSourceId} yDomains={getChangeAtlasYDomains(countrySeries.filter(s=>s.metric==="asfr"))}/></details><p className={styles.note}>{c.cohortNote}</p>
      </>}
      {state.view==="fields" && <><TechnologyDriverPanel countryId={state.country} locale={locale} from={state.from} to={state.to} year={state.year} onYearChange={year=>update({year})}/><FieldReconstructionTimeline countryId={state.country} locale={locale} from={state.from} to={state.to} year={state.year} onYearChange={year=>update({year})}/><ChangeAtlasCharts series={countrySeries.filter(s=>s.metric==="tfr")} locale={locale} yearDomain={[state.from,state.to]} selectedYear={state.year} onSelectYear={year=>update({year})} onOpenSource={setSourceId}/></>}
      {state.view==="berm" && <BermAtlasScenario countryId={state.country} locale={locale} from={state.from} to={state.to} year={state.year} onYearChange={year=>update({year})}/>}
      {state.view==="sources" && <>
        <h2 className={styles.panelTitle}>{c.dataTitle}</h2><p className={styles.note}>{c.version} · {changeAtlasData.series.length} {locale==="fi"?"sarjaa":"series"} · {num(changeAtlasData.series.reduce((sum,s)=>sum+s.points.length,0),locale,0)} {c.sourceCount.toLowerCase()}</p>
        <div className={styles.tableWrap}><table className={styles.table}><thead><tr><th>{c.country}</th><th>{c.coverage}</th><th>{c.family}</th></tr></thead><tbody>{changeAtlasData.countries.map(r=>{const ss=getChangeAtlasSeries(r.id);return <tr key={r.id}><th scope="row"><button className={styles.textButton} onClick={()=>update({country:r.id,view:"change"})}>{t(r.name,locale)}</button></th><td>{ss.length} / {ss.reduce((n,s)=>n+s.points.length,0)}</td><td>{[...new Set(ss.map(s=>s.datasetFamily))].map(f=>f==="fertility"?c.questions[0][0]:f==="technology"?c.questions[3][0]:f==="ecology"?c.questions[2][0]:c.questions[1][0]).join(" · ")}</td></tr>;})}</tbody></table></div>
        <div className={styles.actions}><a className={styles.textButton} href="/api/change-atlas" download>{c.sourceAll}</a><a className={styles.textButton} href="/api/field-reconstruction" download>{c.historyAll}</a><a className={styles.textButton} href="/api/technology-drivers" download>{locale==="fi"?"Kaikki teknologian lähdesarjat (JSON)":"All technology source series (JSON)"}</a></div>
        {changeAtlasData.sources.map(s=><section key={s.id} className={styles.source}><h3><a href={s.url} target="_blank" rel="noreferrer">{s.title} ↗</a></h3><p>{t(s.scope,locale)}</p><p>{s.license}</p>{s.attribution && <p>{s.attribution}</p>}<details><summary>{locale==="fi"?"Alkuperäistiedostot ja tarkistussummat":"Source files and checksums"}</summary>{s.artifacts.map(a=><p key={a.path}>{a.path}<br/><code>SHA256 {a.sha256}</code></p>)}</details></section>)}
      </>}
      {sourceSeries && <section ref={sourcePanel} className={styles.source} aria-live="polite"><h2 className={styles.panelTitle}>{c.source}: {t(sourceSeries.title,locale)}</h2><p>{sourceSeries.status==="estimate"?c.estimate:c.reported} · {t(sourceSeries.unitLabel,locale)}</p><p>{t(sourceSeries.population,locale)}</p><p>{t(sourceSeries.method,locale)}</p>
        {sourceSeries.limitations.map((l,i)=><p key={i}>{t(l,locale)}</p>)}
        {sourceSeries.sourceIds.map(ref=>{const source=getChangeAtlasSource(ref);return source?<div key={ref}><p><a href={source.url} target="_blank" rel="noreferrer">{source.title} ↗</a></p>{source.attribution&&<p>{source.attribution}</p>}</div>:null;})}
        <SourcePoint series={{...sourceSeries,points:visibleAtlasPoints(sourceSeries,state.view==="events"?(eventWindows[sourceSeries.countryId]?.onset??0)-state.window:state.from,state.view==="events"?(eventWindows[sourceSeries.countryId]?.onset??0)+state.window:state.to)}} year={state.view==="events"?(eventWindows[sourceSeries.countryId]?.onset??0)+state.relative:state.year} locale={locale}/>
      </section>}
      {state.view!=="sources" && changeAtlasData.gaps.filter(g=>g.countryIds.includes(state.country) && (state.question==="health"?(g.datasetFamily==="health"||g.datasetFamily==="hormone"):g.datasetFamily===state.question)).map((g,i)=><section className={styles.gap} key={i}><h3>{t(g.title,locale)}</h3><p className={styles.note}>{t(g.detail,locale)}</p></section>)}
    </div>
    <div className={styles.actions}>{(["share","csv","json","svg","png"] as const).map(kind=><button key={kind} onClick={()=>void exportAction(kind)} disabled={state.view==="sources"&&(kind==="svg"||kind==="png")}>{kind==="csv"?c.selection:kind==="share"?c.share:c[kind]}</button>)}<span role="status">{feedback}</span></div>
    <section className={styles.details}><h2 className={styles.panelTitle}>{c.chain}</h2><div className={styles.chain}>{["/evidence/technology","/evidence/response-conditions","/evidence/converging-patterns","/model/biological-coordination"].map((href,i)=><Link key={href} href={`/${locale}${href}`}><strong>{c.chainSteps[i][0]}</strong><span>{c.chainSteps[i][1]}</span></Link>)}</div><p className={styles.note}>{c.scopeNote}</p></section>
    <details className={styles.details}><summary>{c.methods}</summary><p className={styles.note}>{c.methodText}</p><p className={styles.note}><Link href={`/${locale}/model/math#lindgren`}>{locale==="fi"?"Lindgren-premissi ja BERM:n vasteoperaattori":"Lindgren premise and the BERM response operator"} →</Link></p></details>
  </div>;
}

function SourcePoint({series,year,locale}:{series:ChangeAtlasSeries;year:number;locale:string}) {
  const c=locale==="fi"?COPY.fi:COPY.en;
  const p=series.points.find(p=>series.frequency==="annual"?p.year===year:(p.startYear??p.year)<=year&&(p.endYear??p.year)>=year);
  return p?<div><p>{c.sourcePeriod}: {p.period?t(p.period,locale):p.year} · {num(p.value,locale)} {t(series.unitLabel,locale)}</p><p>{p.lower!==null&&p.upper!==null?`${p.intervalKind === "percentile_5_95" ? (locale==="fi"?"Jakauman 5.–95. persentiili":"Distribution 5th–95th percentile") : (locale==="fi"?"95 %:n luottamusväli":"95% confidence interval")}: ${num(p.lower,locale)}–${num(p.upper,locale)}`:p.standardError!==undefined?`${locale==="fi"?"Keskivirhe (SE)":"Standard error (SE)"}: ${num(p.standardError,locale)}`:c.missingCI}</p><p>{p.sourceLocator}</p></div>:<p>{c.noPoint}</p>;
}
