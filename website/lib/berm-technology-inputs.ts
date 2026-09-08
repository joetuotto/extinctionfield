import { technologyDriversData, type TechnologyDriverSeries } from "./technology-drivers-data";
import { changeAtlasBaseData } from "./change-atlas-data";
import { fieldReconstruction, getReconstructionOperatingWindows } from "./field-reconstruction";
import { evaluateScenarioSource, type ScenarioSource } from "./berm-atlas-scenario";

type Text = { fi: string; en: string };
export interface TechnologyInputChoice {
  id: string; familyId: string; title: Text; scope: Text; unitLabel: Text;
  reference: Text; interpretation: Text; sourceIds: string[];
  points: {year:number;value:number}[]; priority: number;
}
export type TechnologyTiming = "linear" | "early" | "late";
export interface TechnologyScenarioInput extends ScenarioSource {
  driverSeriesId: string; familyId: string; title: Text; scope: Text; reference: Text;
  interpretation: Text; sourceIds: string[]; dataYears: [number,number];
  temporalScopeBasis: "historical-component" | "observed-period";
  singleObservation: boolean;
  /** Explicit permission to use a snapshot as a temporal scenario assumption. */
  singleObservationOptIn: boolean;
}

function normalizedDriver(series: TechnologyDriverSeries): TechnologyInputChoice | null {
  const driver=series.driver;
  if(!driver)return null;
  const points=series.points.flatMap(point=>{
    const denominator=driver.normalization==="percent"?100:driver.normalization==="reference"?driver.referenceValue:point.denominator?.value;
    if(!denominator||denominator<=0)return [];
    return [{year:point.year,value:point.value/denominator}];
  });
  if(!points.length)return null;
  return {id:series.id,familyId:series.familyId,title:series.title,scope:series.scope,unitLabel:series.unitLabel,
    reference:driver.referenceLabel??(driver.normalization==="percent"?{fi:"100 % lähteen perusjoukosta",en:"100% of the source population"}:{fi:"Lähteen ilmoittama nimittäjä",en:"Source-reported denominator"}),
    interpretation:driver.interpretation,sourceIds:series.sourceIds.map(id=>`driver:${id}`),points,priority:driver.priority??10};
}

/** These are alternative indicators within a family, never additive counts of the same devices. */
export function getTechnologyInputChoices(countryId:string):TechnologyInputChoice[] {
  const choices=technologyDriversData.series.filter(s=>s.countryId===countryId).map(normalizedDriver).filter((s):s is TechnologyInputChoice=>s!==null);
  const mobile=changeAtlasBaseData.series.find(s=>s.countryId===countryId&&s.metric==="mobile_subscriptions");
  if(mobile)choices.push({id:mobile.id,familyId:"cellular-total",title:mobile.title,scope:mobile.population,unitLabel:mobile.unitLabel,
    reference:{fi:"100 liittymää / 100 asukasta",en:"100 subscriptions / 100 people"},
    interpretation:{fi:"Kaikkien sukupolvien liittymätiheys. Normalisointi ei kerro laitteen tehoa, käyttöaikaa tai väestön altistumisosuutta.",en:"Subscription density across generations. Normalization does not determine device power, duty cycle or the exposed share of the population."},
    sourceIds:mobile.sourceIds,points:mobile.points.map(p=>({year:p.year,value:p.value/100})),priority:0});
  return choices.sort((a,b)=>a.priority-b.priority||a.id.localeCompare(b.id));
}

/** Explicit source-quantity → effective potential-mode hypothesis; no TFR fitting occurs here. */
export function buildTechnologyScenarioSources(countryId:string,params:Pick<URLSearchParams,"get">,timing?:TechnologyTiming):TechnologyScenarioInput[] {
  const allChoices=getTechnologyInputChoices(countryId);
  const choices=params.get("s_shared")==="1"?allChoices.filter(s=>s.familyId==="cellular-total"||s.id.endsWith("_electricity_per_capita")):allChoices;
  const families=[...new Set(choices.map(s=>s.familyId))];
  const off=new Set((params.get("s_off")??"").split(","));
  const mapping=params.get("s_mapping")==="linear"?"linear":"sqrt";
  const interpolation=timing??(params.get("s_timing")==="early"?"early":params.get("s_timing")==="late"?"late":"linear");
  const outside=params.get("s_edges")==="unknown"?"unknown":"hold";
  const generations=params.get("s_mobile")==="generations";
  return families.flatMap(familyId=>{
    if(familyId==="cellular-total"&&generations||/^mobile-|^digital-2g$|^analog-cellular$/.test(familyId)&&!generations)return [];
    const candidates=choices.filter(s=>s.familyId===familyId);
    const selected=candidates.find(s=>s.id===params.get(`s_driver_${familyId}`))??candidates[0];
    const first=selected.points[0].year,last=selected.points.at(-1)!.year;
    const history=familyId==="cellular-total"?[]:getReconstructionOperatingWindows(countryId,familyId);
    // Preserve documented operational gaps. No new launch date is inferred from a first statistical record.
    const windows=history.length?history.map(w=>({...w,endYear:Math.min(2023,w.endYear)})).filter(w=>w.startYear<=w.endYear)
      :[{startYear:first,endYear:Math.min(2023,last)}].filter(w=>w.startYear<=w.endYear);
    if(!windows.length)return [];
    const numeric=(key:string,fallback:number,max:number)=>{const v=params.get(key);return v!==null&&v.trim()!==""&&Number.isFinite(Number(v))&&Number(v)>=0&&Number(v)<=max?Number(v):fallback;};
    return [{id:familyId,familyId,driverSeriesId:selected.id,title:selected.title,scope:selected.scope,reference:selected.reference,
      interpretation:selected.interpretation,sourceIds:selected.sourceIds,dataYears:[first,last] as [number,number],
      temporalScopeBasis:history.length?"historical-component":"observed-period",
      singleObservation:selected.points.length===1,
      singleObservationOptIn:params.get(`s_single_${familyId}`)==="1",
      startYear:windows[0].startYear,endYear:windows.at(-1)!.endYear,windows,
      amplitude:numeric(`s_amp_${familyId}`,.25,2),angleDegrees:numeric(`s_angle_${familyId}`,0,180),enabled:!off.has(familyId)&&(selected.points.length>1||params.get(`s_single_${familyId}`)==="1"),
      profile:selected.points,profileMode:interpolation==="linear"?"linear":"step",profileStep:interpolation==="early"?"next":"previous",
      profileTransform:mapping,profileOutside:outside} satisfies TechnologyScenarioInput];
  });
}

export function technologyInputCoverage(countryId:string,sources:TechnologyScenarioInput[],year:number) {
  return fieldReconstruction.families.map(f=>{
    const input=sources.find(s=>s.familyId===f.id);
    const track=fieldReconstruction.tracks.find(t=>t.countryId===countryId&&t.familyId===f.id);
    return {familyId:f.id,label:f.label,inputId:input?.driverSeriesId??null,
      basis:input?evaluateScenarioSource(input,year,0).basis:track?.phases.length?"history-only":"unresolved",
      enabled:input?.enabled??false};
  });
}
