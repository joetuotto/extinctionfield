"use client";
import { useEffect, useId, useRef, useState } from "react";
import { scaleLinear } from "d3";
import { fieldReconstruction, getReconstructionTracks, getReconstructionCell, getReconstructionSources, getReconstructionAnchors, reconstructionStageLabels, type ReconstructionStage, type ReconstructionCountryId } from "@/lib/field-reconstruction";
import { atlasText as t } from "@/lib/change-atlas-display";
import { useTechnologyDisplay } from "@/lib/use-technology-display";
import styles from "./ChangeAtlas.module.css";
import { SourceEnvironmentIllustration } from "./SourceEnvironmentIllustration";

export function fieldEventOptions() {
  return fieldReconstruction.families.filter(f=>fieldReconstruction.tracks.some(track=>track.familyId===f.id && track.scenarioWindows.some(w=>w.kind==="onset")));
}
export function fieldOnsetYear(countryId: string, familyId: string): number | null {
  const window = getReconstructionTracks(countryId).find(t=>t.familyId===familyId)?.scenarioWindows.filter(w=>w.kind==="onset").sort((a,b)=>a.earliestYear-b.earliestYear)[0];
  return window?.earliestYear ?? null;
}
export const FIELD_STAGE_COLORS: Record<ReconstructionStage|"unknown",string> = {
  documented:"var(--chart-series-1)", expansion:"var(--chart-series-2)", mixed:"var(--chart-series-4)", retired:"var(--foreground-muted)", unknown:"var(--background-secondary)",
};
interface Props { countryId: ReconstructionCountryId; locale: string; from: number; to: number; year: number; onYearChange:(year:number)=>void; compact?:boolean; onExpand?:()=>void; }
export function FieldReconstructionTimeline({countryId,locale,from,to,year,onYearChange,compact=false,onExpand}:Props) {
  const fi=locale==="fi";
  const all=getReconstructionTracks(countryId);
  const tracks=compact?all.filter(track=>track.familyId.includes("mobile")||track.familyId.includes("grid")||track.familyId==="digital-2g"||track.familyId==="analog-cellular").slice(0,6):all;
  const { family: selected, update: updateTechnologyDisplay } = useTechnologyDisplay();
  const selectFamily = (family: string) => updateTechnologyDisplay({ family });
  const [width,setWidth]=useState(700);
  const container=useRef<HTMLDivElement>(null);
  const id=useId();
  useEffect(()=>{if(!container.current || typeof ResizeObserver==="undefined")return;const ro=new ResizeObserver(entries=>{const w=entries[0]?.contentRect.width;if(w>0)setWidth(w);});ro.observe(container.current);return()=>ro.disconnect();},[]);
  const x=scaleLinear().domain([from,to]).range([60,Math.max(80,width-16)]);
  const tickYears=x.ticks(width<500?4:8).filter(Number.isInteger);
  const fallbackFamily = selected === "cellular-total" ? "digital-2g" : "electric-grid";
  const family=fieldReconstruction.families.find(f=>f.id===selected) ?? fieldReconstruction.families.find(f=>f.id===fallbackFamily);
  const cell=family?getReconstructionCell(countryId,family.id,year):null;
  const country=fieldReconstruction.countries.find(r=>r.id===countryId)!;
  return <section ref={container}>
    <h2 className={styles.panelTitle}>{fi?(compact?"Lähdeympäristö samalla aikajanalla":"Historiallinen kenttäympäristö"):(compact?"Source environment on the same timeline":"Historical field environment")}</h2>
    <p className={styles.note}>{compact?(fi?"Rinnakkaiset radat näyttävät teknologiasukupolvien ajallisen päällekkäisyyden. Väri kuvaa historian vaihetta.":"Parallel rows show the coexistence of technology generations. Colour describes a historical stage."):t(fieldReconstruction.boundary.phaseMeaning,locale)}</p>
    {!compact && <p className={styles.note}>{t(country.scope,locale)}</p>}
    <div className={styles.fieldLegend} data-field-history-legend>{(["documented","expansion","mixed","retired","unknown"] as const).map(stage=><span key={stage}><i aria-hidden="true" style={{background:FIELD_STAGE_COLORS[stage],border:stage==="unknown"?"1px dashed var(--border)":undefined}}/>{t(reconstructionStageLabels[stage],locale)}</span>)}</div>
    <div className={styles.fieldRows}>{tracks.map((track,index)=>{
      const f=fieldReconstruction.families.find(f=>f.id===track.familyId)!;
      const atYear=getReconstructionCell(countryId,f.id,year);
      const phases=track.phases.filter(p=>p.endYear>=from&&p.startYear<=to);
      const h=index===tracks.length-1?48:23;
      return <div key={f.id} className={styles.fieldRow}>
        <div className={styles.fieldHeading}><button type="button" onClick={()=>{selectFamily(f.id);if(compact)onExpand?.();}} aria-expanded={family?.id===f.id&&!compact}>{t(f.label,locale)}</button><span>{year} · {t(reconstructionStageLabels[atYear.stage],locale)}</span></div>
        <svg data-atlas-export="field-history" className={styles.fieldPlot} width={width} height={h} viewBox={`0 0 ${width} ${h}`} role="img" aria-label={`${t(f.label,locale)} ${from}–${to}`}>
          <title>{`${t(f.label,locale)} · ${t(country.name,locale)} · ${from}–${to}`}</title>
          <desc>{`${fi?"Nimetyt historiavaiheet, ei kentän voimakkuus":"Named historical stages, not field strength"}. ${t(track.gap,locale)}`}</desc>
          <defs><pattern id={`${id}-${f.id}-unknown`} width="6" height="6" patternUnits="userSpaceOnUse"><path d="M0,6L6,0" stroke="var(--border)" strokeWidth="1"/></pattern></defs>
          <rect x={x(from)} y={1} width={x(to)-x(from)} height={15} fill={`url(#${id}-${f.id}-unknown)`}/>
          {phases.map((p,i)=><rect key={i} x={x(Math.max(from,p.startYear))} y={1} width={Math.max(2,x(Math.min(to,p.endYear+.9))-x(Math.max(from,p.startYear)))} height={15} rx={1} fill={FIELD_STAGE_COLORS[p.stage]} opacity={p.stage==="retired"?.35:.8} stroke={p.basis==="reconstruction"?"var(--foreground)":"none"} strokeDasharray={p.basis==="reconstruction"?"3 3":undefined} strokeWidth={.5}><title>{`${p.startYear}–${p.endYear} · ${t(reconstructionStageLabels[p.stage],locale)} · ${t(p.note,locale)}`}</title></rect>)}
          <line x1={x(year)} x2={x(year)} y1={0} y2={20} stroke="var(--foreground)" strokeWidth={1.5}/>
          {index===tracks.length-1 && tickYears.map(y=><text key={y} x={x(y)} y={37} fill="var(--foreground-muted)" textAnchor="middle" fontSize={11}>{y}</text>)}
        </svg>
      </div>;
    })}</div>
    {compact ? <button className={styles.textButton} onClick={onExpand}>{fi?"Avaa kaikki lähteet, kenttämuodot ja historiaperusteet →":"Open all sources, field forms and historical evidence →"}</button> : <>
      {family && selected !== family.id && <p className={styles.note} data-field-selection-fallback={selected}>{fi
        ? `Teknologiapaneelin valinta ei määrittele yhtä kuvattavaa lähdeperhettä. Havainne näyttää esimerkkinä: ${t(family.label,locale)}. Kuvan lähdevalinta rajaa myös teknologiapaneelin.`
        : `The technology-panel selection does not specify a single source family to illustrate. The example shows: ${t(family.label,locale)}. Selecting a family in the illustration also filters the technology panel.`}</p>}
      {family&&cell&&<SourceEnvironmentIllustration locale={locale} countryId={countryId} year={year} familyId={family.id} onFamilyChange={selectFamily} compact />}
      <details className={styles.details}><summary>{fi?"Avaa maan dokumentoidut tapahtumat ja lähteet":"Open documented country events and sources"}</summary>
        {getReconstructionAnchors([...new Set(all.flatMap(track=>track.phases.flatMap(p=>p.anchorIds)))]).sort((a,b)=>a.startYear-b.startYear).map(a=><section className={styles.source} key={a.id}><h3><button className={styles.textButton} onClick={()=>onYearChange(Math.max(from,Math.min(to,a.startYear)))}>{a.startYear}{a.endYear?`–${a.endYear}`:""} · {t(a.title,locale)}</button></h3><p>{t(a.scope,locale)}</p>{getReconstructionSources(a.sourceRefs).map(s=><p key={s.id}><a href={s.url} target="_blank" rel="noreferrer">{s.title} ↗</a></p>)}</section>)}
      </details>
      <p className={styles.note}>{fi?"Katkoviiva rajaa rekonstruoidun jatkumisjakson. Avoin historia ei tarkoita kentän puuttumista. Vuosi on lähdehistorian tarkkuus; laitteen pulssit ja vuorokausirytmi kuvataan erikseen.":"Dashed outlines mark reconstructed continuation intervals. Unresolved history does not mean absence of fields. Years describe historical timing; pulses and daily duty cycles are described separately."}</p>
    </>}
  </section>;
}
