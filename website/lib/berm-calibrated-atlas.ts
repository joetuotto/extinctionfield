import type { ChangeAtlasSeries } from "./change-atlas-data";
import { getChangeAtlasSeries, getChangeAtlasSource } from "./change-atlas-data";
import { BERM_ENDPOINT_MODES, runBermEndpointScenario } from "./berm-endpoint-scenario";
import { calibrateBermEndpoint, predictCalibratedBermEndpoint } from "./berm-endpoint-calibration";
import { getBermBiomarkerCalibrationProtocol } from "./berm-biomarker-calibration-protocols";
import { parseBermCalibrationDisplay } from "./berm-calibration-display";
import { parseBermEndpointDisplay } from "./berm-endpoint-display";
import { applyBermScenarioToAsfr } from "./berm-atlas-scenario";
import { buildTechnologyScenarioSources } from "./berm-technology-inputs";

/** Build the reference fit and current-input prediction without using the visible date crop. */
export function buildBermCalibratedAtlas(query:string,countryId:string,rawObservations:ChangeAtlasSeries[]) {

    if(new URLSearchParams(query).get("forecast")!=="1")return null;
    try {
      const currentParams=new URLSearchParams(query), currentSettings=parseBermEndpointDisplay(currentParams), selected=parseBermCalibrationDisplay(currentParams);
      const sources=buildTechnologyScenarioSources(countryId,currentParams);
      const referenceSources=buildTechnologyScenarioSources(countryId,selected.referenceParams);
      const scenario=runBermEndpointScenario(sources,currentSettings.parameters,1880,2023);
      const reference=runBermEndpointScenario(referenceSources,selected.reference.parameters,1880,2023);
      const baseYear=selected.reference.fertilityBaselineYear;
      const asfrSeries=getChangeAtlasSeries(countryId,"asfr");
      const asfr=asfrSeries.map(s=>({ageGroup:s.ageGroup!,points:s.points}));
      const asfrBaseline=applyBermScenarioToAsfr(asfr,[{year:baseYear,multiplier:1}],baseYear);
      const calibrations=rawObservations.filter(s=>s.metric==="tfr"||s.metric==="testosterone_total").map(series=>{
        const protocol=series.metric==="testosterone_total"?getBermBiomarkerCalibrationProtocol(series.id):undefined;
        const throughYear=series.metric==="tfr"?selected.throughF:selected.throughT??protocol?.defaultThroughYear??2000;
        const fit=calibrateBermEndpoint(reference,series,{
          throughYear,
          eligiblePeriods:series.metric==="testosterone_total"?protocol?.eligiblePeriods??[]:undefined,
          baselineOverride:series.metric==="tfr"?(asfrBaseline.baselineTfr!==null?{
            value:asfrBaseline.baselineTfr,period:{startYear:baseYear,endYear:baseYear,label:`${baseYear} ASFR 15–49`},sourceId:asfrSeries[0]?.points.find(p=>p.year===baseYear)?.sourceId??"",
          }:null):undefined,
        });
        const prediction=predictCalibratedBermEndpoint(scenario,fit);
        const asfrPrediction=series.metric==="tfr"?prediction.points.map(p=>({year:p.year,channels:Object.fromEntries(BERM_ENDPOINT_MODES.map(mode=>[mode,(asfrBaseline.points[0]?.asfr??[]).map(a=>{
          const value=p.channels[mode].multiplier===null||a.baseline===null?null:a.baseline*p.channels[mode].multiplier!;
          return {ageGroup:a.ageGroup,baseline:a.baseline,value:value!==null&&Number.isFinite(value)?value:null};
        })]))})):null;
        return {seriesId:series.id,protocol,throughYear,fit,prediction,asfrPrediction};
      });
      const sourceIds=[...new Set([...sources,...referenceSources,...rawObservations,...asfrSeries].flatMap(s=>s.sourceIds))];
      const dataSources=sourceIds.flatMap(id=>{const source=getChangeAtlasSource(id);return source?[source]:[];});
      const inputsChanged=JSON.stringify(sources)!==JSON.stringify(referenceSources)||scenario.history.some((p,i)=>p.geometry!==reference.history[i]?.geometry||p.annual!==reference.history[i]?.annual||p.accumulated!==reference.history[i]?.accumulated||BERM_ENDPOINT_MODES.some(mode=>p.channels[mode]!==reference.history[i]?.channels[mode]));
      return {scenario,reference,sources,referenceSources,calibrations,dataSources,inputsChanged,error:""};
    }catch(error){return {scenario:null,reference:null,sources:[],referenceSources:[],calibrations:[],dataSources:[],inputsChanged:false,error:error instanceof Error?error.message:"Calculation unavailable"};}

}
