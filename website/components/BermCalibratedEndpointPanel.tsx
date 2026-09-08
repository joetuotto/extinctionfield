"use client";

import { useSyncExternalStore } from "react";
import { buildBermCalibratedAtlas } from "@/lib/berm-calibrated-atlas";
import { useSearchParams } from "next/navigation";
import { BERM_ENDPOINT_MODES, type BermEndpointMode } from "@/lib/berm-endpoint-scenario";
import { calibrationInputQuery, parseBermCalibrationDisplay } from "@/lib/berm-calibration-display";
import { parseBermEndpointDisplay, endpointDisplayValue } from "@/lib/berm-endpoint-display";
import { getTechnologyInputChoices } from "@/lib/berm-technology-inputs";
import { atlasText as text, atlasNumber as num, downloadAtlasBlob } from "@/lib/change-atlas-display";
import { atlasCsvCell } from "@/lib/change-atlas-state";
import { ChangeAtlasCharts, type ChangeAtlasPredictionOverlay } from "./ChangeAtlasCharts";
import { BermInputHistoryChart } from "./BermInputHistoryChart";
import { AtlasReadingGuide } from "./AtlasReadingGuide";
import type { BermEndpointPanelProps } from "./BermEndpointPanel";
import styles from "./ChangeAtlas.module.css";

const inputParameters=(parameters:ReturnType<typeof parseBermEndpointDisplay>["parameters"])=>Object.fromEntries(Object.entries(parameters).filter(([key])=>key!=="betaF"&&key!=="betaT"));

const LABELS = {
  annual:{fi:"Vuotuinen vaste",en:"Annual response"},
  accumulated:{fi:"Kertynyt vaste",en:"Accumulated response"},
  combined:{fi:"Yhteisvaikutus",en:"Combined response"},
};
const STATUS:Record<string,{fi:string;en:string}> = {
  calibrated:{fi:"Vastekerroin kalibroitu",en:"Response gain calibrated"},
  "insufficient-points":{fi:"Liian vähän vertailukelpoisia havaintoja",en:"Insufficient compatible observations"},
  "no-information":{fi:"Syötteen vaihtelu ei tunnista vastekerrointa",en:"Input variation does not identify the gain"},
  "unknown-history":{fi:"Tarvittava lähdehistoria on tuntematon",en:"Required source history is unknown"},
  "unsupported-statistic":{fi:"Tutkimusjakson tunnusluvun muunnos on avoin",en:"The study statistic's aggregation is unresolved"},
  nonfinite:{fi:"Laskenta ylittää numeerisen esitysalueen",en:"The calculation exceeds the numerical range"},
  "search-bound":{fi:"Ratkaisu osuu haun rajaan",en:"The solution reaches a search boundary"},
  "non-identifiable":{fi:"Aineisto sallii useita vastekertoimia",en:"The data permit multiple response gains"},
};

const subscribeHydration = () => () => {};
const clientHydrationSnapshot = () => true;
const serverHydrationSnapshot = () => false;

/** The numerical optimizer and exp/pow may differ slightly between JS engines.
 * Server HTML and the first hydration render therefore contain observations only.
 * The complete calibrated presentation mounts after hydration, in one engine;
 * neither the scientific values nor their exported metadata are rounded. */
export function BermCalibratedEndpointPanel(props:BermEndpointPanelProps) {
  const hydrated = useSyncExternalStore(subscribeHydration, clientHydrationSnapshot, serverHydrationSnapshot);
  if (hydrated) return <BermCalibratedEndpointReady {...props} />;
  return <section data-berm-calibration-pending>
    <p role="status" className={styles.note}>{props.locale === "fi" ? "Ladataan BERM-laskentaa…" : "Loading BERM calculation…"}</p>
    <ChangeAtlasCharts series={props.observations} locale={props.locale} yearDomain={[props.from,props.to]} selectedYear={props.year} onSelectYear={props.onYearChange} onOpenSource={props.onOpenSource} />
  </section>;
}

/** The fit reference stays fixed when the reader changes the prediction's inputs. */
function BermCalibratedEndpointReady({countryId,locale,from,to,year,observations,rawObservations,indexYear,onYearChange,onOpenSource}:BermEndpointPanelProps) {
  const fi=locale==="fi", params=useSearchParams(), query=params.toString();
  const display=parseBermEndpointDisplay(params), selection=parseBermCalibrationDisplay(new URLSearchParams(query));
  const update=(patch:Record<string,string|null>)=>{
    const url=new URL(window.location.href);
    for(const [key,value] of Object.entries(patch)){if(value===null)url.searchParams.delete(key);else url.searchParams.set(key,value);}
    window.history.replaceState(null,"",`${url.pathname}?${url.searchParams}${url.hash}`);
  };
  const result=buildBermCalibratedAtlas(query,countryId,rawObservations);
  const modes:BermEndpointMode[]=display.compareChannels?[...BERM_ENDPOINT_MODES]:[display.parameters.mode];
  const overlays:Record<string,ChangeAtlasPredictionOverlay>={};
  const notes:{id:string;label:string;note:string}[]=[];
  for(const shown of observations){
    const entry=result?.calibrations.find(c=>c.seriesId===shown.id),raw=rawObservations.find(s=>s.id===shown.id);
    if(!entry||!raw)continue;
    const anchor=entry.fit.baseline?.period;
    const calibrated=entry.fit.channels[display.parameters.mode].status === "calibrated";
    let note=!calibrated ? (fi ? "Kalibrointi ei ole käytettävissä valitulle kanavalle: " + text(STATUS[entry.fit.channels[display.parameters.mode].status] ?? {fi:"Avoin vastekerroin",en:"Open response gain"},locale) + ". Alkuperäiset havainnot säilyvät näkyvissä." : "Calibration is unavailable for this channel: " + text(STATUS[entry.fit.channels[display.parameters.mode].status] ?? {fi:"Avoin vastekerroin",en:"Open response gain"},locale) + ". Original observations remain visible.") : fi
      ? `BERM:n aineistoon kalibroitu vastesulku. Kalibrointi päättyy ${entry.throughYear}; ${entry.fit.included.length} käytettyä havaintojaksoa, ${entry.fit.heldOut.length} myöhempää vertailujaksoa. Aiempi käyrä on takaisinlaskentaa. Muu vastaanottajantila pidetään vakiona. ${entry.protocol?text(entry.protocol.scope,locale):"TFR muodostetaan vuoden "+selection.reference.fertilityBaselineYear+" ASFR-ikäryhmistä 15–49."}`
      : `BERM response closure calibrated to observations. Calibration ends in ${entry.throughYear}; ${entry.fit.included.length} calibration periods, ${entry.fit.heldOut.length} later comparison periods. Earlier values are backcasts. Other receiver state is held fixed. ${entry.protocol?text(entry.protocol.scope,locale):"TFR is aggregated from "+selection.reference.fertilityBaselineYear+" ASFRs at ages 15–49."}`;
    if (calibrated && result?.inputsChanged) note += fi
      ? " Näytetyn käyrän syötteitä on muutettu kalibrointiviitteestä; lukittu vastekerroin ja lähtötaso säilyvät myös kalibrointijakson vuosina."
      : " The displayed curve uses inputs changed from the calibration reference; its gain and intercept remain frozen, including during the calibration period.";
    notes.push({id:shown.id,label:text(shown.title,locale),note});
    overlays[shown.id]={unit:shown.unit,note:{fi:note,en:note},lines:modes.map(mode=>({
      id:`${shown.id}:${mode}`,mode,label:LABELS[mode],
      calibration:entry.fit.channels[mode].status==="calibrated"?{throughYear:entry.throughYear,anchorStartYear:anchor?.startYear??entry.throughYear,label:{fi:`Kalibrointi ≤ ${entry.throughYear}`,en:`Calibration ≤ ${entry.throughYear}`}}:undefined,
      points:entry.prediction.points.filter(p=>p.year>=from&&p.year<=to).map(p=>({year:p.year,value:endpointDisplayValue(p.channels[mode].value,raw,shown,indexYear)})),
    }))};
  }
  const metadata=result?{kind:"conditionally_calibrated_BERM_endpoints",model:"BERM",formulation:"2025-weyl-gme",countryId,selectedYear:year,visibleRange:{from,to},
    parameters:inputParameters(display.parameters),displayedModes:modes,scenario:result.scenario?{...result.scenario,parameters:inputParameters(result.scenario.parameters)}:null,sources:result.sources,dataSources:result.dataSources,
    calibrationReference:{query:selection.referenceQuery,parameters:inputParameters(selection.reference.parameters),sources:result.referenceSources},
    calibrations:result.calibrations,inputsChanged:result.inputsChanged,overlays,notes,error:result.error,
    physicalIdentification:"open",calibrationScope:"one signed effective endpoint gain per fixed BERM channel; no joint field or tissue calibration",receiverState:"held fixed; no annual measured receiver-state series available",
  }:null;
  const download=()=>{
    if(!result?.scenario||!metadata)return;
    const rows:unknown[][]=[["kind","country","series","year","channel","role","time_role","calculation_role","inputs_changed","value","unit","beta","log_scale","calibration_through","G","U","C","current_parameters_json","calibration_reference_json","calibration_json","source_records_json","biomarker_protocol_json"]];
    for(const shown of observations){const entry=result.calibrations.find(c=>c.seriesId===shown.id),overlay=overlays[shown.id];if(!entry||!overlay)continue;
      for(const line of overlay.lines)for(const p of line.points){const state=result.scenario.history.find(s=>s.year===p.year),fit=entry.fit.channels[line.mode];
        const timeRole=p.year<(entry.fit.baseline?.period.startYear??-Infinity)?"backcast":p.year<=entry.throughYear?"calibration-period":"post-calibration-prediction";
        const calculationRole=p.value===null?"unavailable":result.inputsChanged?"changed-input-prediction":timeRole;
        rows.push([metadata.kind,countryId,shown.id,p.year,line.mode,calculationRole,timeRole,calculationRole,result.inputsChanged,p.value,shown.unit,fit.beta,fit.logScale,entry.throughYear,state?.geometry,state?.annual,state?.accumulated,JSON.stringify(inputParameters(display.parameters)),JSON.stringify(metadata.calibrationReference),JSON.stringify(entry.fit)]);
        rows[rows.length-1].push(JSON.stringify(result.dataSources),JSON.stringify(entry.protocol??null));
      }
    }
    downloadAtlasBlob(new Blob(["\uFEFF"+rows.map(r=>r.map(atlasCsvCell).join(",")).join("\r\n")],{type:"text/csv;charset=utf-8"}),`berm-calibrated-${countryId}-${from}-${to}.csv`);
  };
  const choices=getTechnologyInputChoices(countryId);
  const toggleSource=(id:string,checked:boolean,single:boolean)=>{
    const current=new URLSearchParams(window.location.search),off=new Set((current.get("s_off")??"").split(",").filter(Boolean));
    if(checked)off.delete(id);else off.add(id);
    update({s_off:[...off].join(","),...(single?{[`s_single_${id}`]:checked?"1":"0"}:{})});
  };
  return <section data-berm-endpoint={metadata?JSON.stringify(metadata):undefined}>
    <div className={styles.predictionSwitch}>
      <label><input type="checkbox" checked={display.enabled} onChange={e=>update({forecast:e.target.checked?"1":"0"})}/>{fi?"Näytä BERM-ennuste havaintojen rinnalla":"Show BERM prediction alongside observations"}</label>
      <p>{fi?"Sarjakohtainen kalibrointi, lukittu vastekerroin ja vuosittain muuttuva lähdehistoria. Kuvaaja erottaa kalibrointijakson ja sen jälkeisen ennusteen.":"Series-specific calibration, a locked response gain and source histories that change each year. The chart distinguishes the calibration period from the subsequent prediction."}</p>
    </div>
    {display.enabled&&<>
      <div className={styles.predictionModes}>
        {BERM_ENDPOINT_MODES.map(mode=><button key={mode} type="button" aria-pressed={display.parameters.mode===mode} onClick={()=>update({ep_mode:mode})}>{text(LABELS[mode],locale)}</button>)}
        <label><input type="checkbox" checked={display.compareChannels} onChange={e=>update({ep_compare:e.target.checked?"1":"0"})}/>{fi?"Vertaa kaikkia kolmea":"Compare all three"}</label>
      </div>
      <p className={styles.note}>{fi?"Valitusta Lindgren-geometriasta laskettu lähdeprojektio etenee BERM:n ehdollisen viiveellisen vasteen ja kertymän kautta biomarkkeriin. Kukin kanavavaihtoehto kalibroidaan erikseen yhdellä efektiivisellä vastekertoimella; lähteiden fysikaalinen mittakaava ja muu vastaanottajantila ovat kalibroinnissa kiinnitettyjä oletuksia.":"The source projection calculated from the selected Lindgren geometry passes through BERM's conditional delayed response and retained state to the biomarker. Each channel alternative is calibrated separately with one effective response gain; physical source scale and other receiver state are fixed assumptions during calibration."}</p>
      {result?.error&&<p role="alert" className={styles.note}>{result.error}</p>}
      {result?.inputsChanged&&<p className={styles.insight} data-fixed-calibration>{fi?"Nykyiset syöteasetukset poikkeavat kalibroinnin lähtötilasta. Käyrä käyttää edelleen lukittua vastekerrointa: näet asetusten muutoksen vaikutuksen ilman uutta sovitusta.":"Current inputs differ from the calibration reference. The curve retains the locked gain, showing the effect of changed settings without refitting."}</p>}
      <div className={styles.calibrationCards}>{result?.calibrations.map(entry=>{
        const source=rawObservations.find(s=>s.id===entry.seriesId)!,fit=entry.fit.channels[display.parameters.mode];
        return <article key={entry.seriesId} data-calibration-summary={entry.seriesId}>
          <strong>{text(source.title,locale)}</strong>
          <p>{text(LABELS[display.parameters.mode],locale)} · {text(STATUS[fit.status]??{fi:fit.status,en:fit.status},locale)}{fit.beta!==null?` · β = ${num(fit.beta,locale,5)}`:""}</p>
          <p>{fi?`${entry.fit.included.length} kalibrointihavaintoa · ${entry.fit.heldOut.length} myöhempää vertailuhavaintoa · raja ${entry.throughYear}`:`${entry.fit.included.length} calibration observations · ${entry.fit.heldOut.length} later comparisons · cutoff ${entry.throughYear}`}</p>
          {entry.fit.heldOut.length===0&&<p>{fi?"Samoihin havaintoihin sovitettu osuus kuvaa kalibrointia; riippumatonta ennusteosuvuutta ei ole vielä mitattu.":"The fitted portion describes calibration to these observations; independent predictive performance has not yet been measured."}</p>}
        </article>;
      })}</div>
      <details className={styles.details}><summary>{fi?"Kalibroinnin aineisto, parametrit ja havaintojaksot":"Calibration data, parameters and observation periods"}</summary>
        <div className={styles.controls}>
          <label>{fi?"Vastekertoimen määritys":"Response-gain estimation"}<select value="data" onChange={()=>update({ep_fit:"manual"})}><option value="data">{fi?"Kalibroi tutkimusaineistoon":"Calibrate to study observations"}</option><option value="manual">{fi?"Käsin asetettu herkkyys":"Manually selected sensitivity"}</option></select></label>
          <label>{fi?"TFR: kalibroinnin viimeinen vuosi":"TFR: last calibration year"}<input type="number" min={1950} max={2023} defaultValue={selection.throughF} key={`fitF-${selection.throughF}`} onBlur={e=>update({ep_throughF:e.target.value})}/></label>
          {rawObservations.some(s=>s.metric==="testosterone_total")&&<label>{fi?"Testosteroni: kalibroinnin viimeinen vuosi":"Testosterone: last calibration year"}<input type="number" min={1950} max={2023} defaultValue={selection.throughT??result?.calibrations.find(c=>c.protocol)?.throughYear??2002} key={`fitT-${countryId}-${selection.throughT}-${rawObservations.find(s=>s.metric==="testosterone_total")?.id}`} onBlur={e=>update({ep_throughT:e.target.value})}/></label>}
        </div>
        <p className={styles.note}>{fi?"Kalibroinnin lähde- ja vasteasetukset ovat lukittuja. Alla tehtävät muutokset vaikuttavat ennusteeseen. Tämä painike arvioi vastekertoimet uudelleen nykyisillä asetuksilla ja tallentaa uuden lähtötilan näkymän linkkiin.":"Calibration source and response settings are frozen. Changes below affect the prediction. This button re-estimates gains under the current settings and saves the new reference in the view link."}</p>
        <button type="button" className={styles.textButton} onClick={()=>update({ep_reference:calibrationInputQuery(new URLSearchParams(window.location.search))})}>{fi?"Kalibroi uudelleen nykyisillä lähtöasetuksilla":"Recalibrate using current input settings"}</button>
        {result?.calibrations.map(entry=><section key={entry.seriesId} className={styles.source}>
          <h3>{text(rawObservations.find(s=>s.id===entry.seriesId)!.title,locale)}</h3>
          <p>{fi?"Kalibroitu lähtötaso":"Calibrated baseline"}: {entry.fit.baseline?`${entry.fit.baseline.period.label} · ${num(entry.fit.baseline.value,locale)}`:(fi?"puuttuu":"missing")}. {BERM_ENDPOINT_MODES.map(mode=>`${text(LABELS[mode],locale)}: β=${entry.fit.channels[mode].beta===null?"—":num(entry.fit.channels[mode].beta!,locale,5)}`).join(" · ")}</p>
          {entry.protocol&&<><p>{text(entry.protocol.scope,locale)}</p>{entry.protocol.limitations.map((p,i)=><p key={i}>{text(p,locale)}</p>)}{entry.protocol.excludedPeriods.map(p=><p key={p.startYear}>{p.startYear}–{p.endYear}: {text(p.reason,locale)}</p>)}{entry.protocol.sources.map(s=><p key={s.id}><a href={s.url} target="_blank" rel="noreferrer">{s.title} ↗</a></p>)}</>}
          <p className={styles.note}>{fi?"Sovitus minimoi tutkimusjaksojen logaritmisen suhteellisen virheen samalla jaksopainolla. Mediaanin jakaumapersentiileistä tai julkaistusta SE:stä ei muodosteta kalibroinnin luottamusväliä. Viive, puoliintumisaika ja kanavien painosuhde pysyvät erillisinä oletuksina.":"Fitting minimizes squared log-relative errors with equal study-period weights. Median distribution percentiles or reported SEs are not converted to calibration confidence intervals. Delay, retention half-life and the channel weight ratio remain separate assumptions."}</p>
          <div className={styles.tableWrap}><table className={styles.table} data-calibration-periods={entry.seriesId}><caption>{fi?"Tutkimusjakson havainto ja samalle jaksolle laskettu malliarvo":"Study-period observation and model value aggregated over the same period"}</caption><thead><tr><th>{fi?"Jakso":"Period"}</th><th>{fi?"Rooli":"Role"}</th><th>{fi?"Havainto":"Observed"}</th><th>{fi?"Kalibroinnin lähtömalli":"Calibration reference"}</th><th>{fi?"Nykyinen ennuste":"Current prediction"}</th></tr></thead><tbody>{entry.fit.channels[display.parameters.mode].periodPredictions.map((p,i)=><tr key={p.observation.id}><td>{p.startYear===p.endYear?p.startYear:`${p.startYear}–${p.endYear}`}</td><td>{p.role==="calibration"?(fi?"Kalibrointi":"Calibration"):(fi?"Myöhempi vertailu":"Later comparison")}</td><td>{num(p.observed,locale)}</td><td>{p.predicted===null?"—":num(p.predicted,locale)}</td><td>{entry.prediction.periodPredictions[display.parameters.mode][i]?.predicted==null?"—":num(entry.prediction.periodPredictions[display.parameters.mode][i].predicted!,locale)}</td></tr>)}</tbody></table></div>
          <p>{fi?"Kuvaileva keskivirhe alkuperäisessä yksikössä (RMSE)":"Descriptive root mean squared error in the native unit (RMSE)"}: {fi?"kalibrointi":"calibration"} {entry.fit.channels[display.parameters.mode].trainingMetrics.nativeRMSE===null?"—":num(entry.fit.channels[display.parameters.mode].trainingMetrics.nativeRMSE!,locale,3)}; {fi?"myöhempi vertailu":"later comparison"} {entry.fit.channels[display.parameters.mode].holdoutMetrics.nativeRMSE===null?"—":num(entry.fit.channels[display.parameters.mode].holdoutMetrics.nativeRMSE!,locale,3)}.</p>
        </section>)}
      </details>
      <details className={styles.details}><summary>{fi?"Muuta ennusteen kenttä- ja vasteasetuksia":"Change field and response inputs for the prediction"}</summary>
        <p className={styles.note}>{fi?"Lukittu vastekerroin säilyy. Vuosi 1880 on kertymän kiinteä alkukohta; kuvaajan rajaus ei nollaa sitä. BMI:n, unen, reseptoritoiminnan ja hormonisäätelyn vuotuisia havaintosarjoja ei ole tässä aineistossa, joten muu vastaanottajantila pysyy vakiona.":"The calibrated gain stays fixed. Accumulation begins in 1880, independently of the displayed date range. This dataset has no annual BMI, sleep, receptor-function or endocrine-regulation records, so other receiver state is held fixed."}</p>
        <div className={styles.scenarioControls}>{[
          {key:"s_background",value:display.parameters.background,min:0,max:3,step:.1,fi:"Taustan projektio",en:"Background projection"},
          {key:"s_coherence",value:display.parameters.coherence,min:0,max:1,step:.05,fi:"Lähdemoodien korrelaatio",en:"Source-mode correlation"},
          {key:"s_meanFraction",value:display.parameters.meanFraction,min:-1,max:1,step:.05,fi:"Keskikomponentin osuus",en:"Mean-component fraction"},
          {key:"s_lagYears",value:display.parameters.lagYears,min:0,max:30,step:1,fi:"Vasteviive · vuotta",en:"Response delay · years"},
          {key:"s_memoryYears",value:display.parameters.memoryYears,min:0,max:30,step:1,fi:"Vuosivasteen muistijakso · vuotta",en:"Annual response memory · years"},
          {key:"ep_halfLife",value:display.parameters.halfLifeYears,min:0,max:100,step:1,fi:"Kertymän puoliintumisaika · vuotta",en:"Retention half-life · years"},
          {key:"ep_annualWeight",value:display.parameters.annualWeight,min:0,max:3,step:.1,fi:"Vuotuisen kanavan paino",en:"Annual channel weight"},
          {key:"ep_historyWeight",value:display.parameters.historyWeight,min:0,max:.5,step:.01,fi:"Kertymäkanavan paino · 1/vuosi",en:"History channel weight · 1/year"},
        ].map(c=><label key={c.key}>{fi?c.fi:c.en}<output>{num(c.value,locale)}</output><input type="range" aria-label={fi?c.fi:c.en} min={c.min} max={c.max} step={c.step} value={c.value} onChange={e=>update({[c.key]:e.target.value})}/></label>)}</div>
        <div className={styles.controls}>
          <label>{fi?"Puuttuvat reunavuodet":"Missing boundary years"}<select value={params.get("s_edges")==="unknown"?"unknown":"hold"} onChange={e=>update({s_edges:e.target.value})}><option value="hold">{fi?"Pidä lähin lähdearvo · oletus":"Hold nearest source value · assumption"}</option><option value="unknown">{fi?"Tuntematon":"Unknown"}</option></select></label>
          <label>{fi?"Kertymän alkutila":"Initial retained state"}<select value={display.parameters.initialStock===null?"unknown":"assumed"} onChange={e=>update({ep_initial:e.target.value})}><option value="assumed">{fi?"Oletettu arvo":"Assumed value"}</option><option value="unknown">{fi?"Tuntematon":"Unknown"}</option></select></label>
          {display.parameters.initialStock!==null&&<label>{fi?"Alkutilan arvo":"Initial state value"}<input type="number" min={-100} max={100} value={display.parameters.initialStock} onChange={e=>update({ep_initialStock:e.target.value})}/></label>}
        </div>
        {result?.sources.map(s=><div key={s.id} className={styles.scenarioSource}>
          <label><input type="checkbox" checked={s.enabled} onChange={e=>toggleSource(s.id,e.target.checked,s.singleObservation)}/>{text(s.title,locale)}</label>
          <label>{fi?"Lähdesarja":"Source series"}<select value={s.driverSeriesId} onChange={e=>update({[`s_driver_${s.id}`]:e.target.value})}>{choices.filter(c=>c.familyId===s.familyId).map(c=><option key={c.id} value={c.id}>{text(c.title,locale)}</option>)}</select></label>
          <label>{fi?"Oletettu kytkentäamplitudi":"Assumed coupling amplitude"}<output>{s.amplitude}</output><input aria-label={`${text(s.title,locale)} · amplitude`} type="range" min={0} max={2} step={.05} value={s.amplitude} onChange={e=>update({[`s_amp_${s.id}`]:e.target.value})}/></label>
          <label>{fi?"Suunta · astetta":"Direction · degrees"}<output>{s.angleDegrees}</output><input aria-label={`${text(s.title,locale)} · angle`} type="range" min={0} max={180} step={5} value={s.angleDegrees} onChange={e=>update({[`s_angle_${s.id}`]:e.target.value})}/></label>
        </div>)}
      </details>
    </>}
    {display.enabled && <AtlasReadingGuide locale={locale} from={from} to={to} year={year} onYearChange={onYearChange} />}
    <ChangeAtlasCharts series={observations} locale={locale} yearDomain={[from,to]} selectedYear={year} onSelectYear={onYearChange} onOpenSource={onOpenSource} overlaysBySeriesId={overlays}/>
    {display.enabled&&result?.scenario&&<>
      <div className={styles.predictionModes}><label><input type="checkbox" checked={selection.showInputHistory} onChange={e=>update({ep_inputs:e.target.checked?"1":"0"})}/>{fi?"Näytä saman vuosivalinnan lähdeprojektio, vuosivaste ja kertymä":"Show source projection, annual response and retained history for the same years"}</label></div>
      {selection.showInputHistory&&<BermInputHistoryChart history={result.scenario.history} locale={locale} from={from} to={to} year={year} onYearChange={onYearChange} showG/>}
      <button type="button" className={styles.textButton} onClick={download}>{fi?"Lataa kalibroitu ennuste ja sen laskentaperusteet (CSV)":"Download calibrated predictions and their calculation basis (CSV)"}</button>
    </>}
  </section>;
}
