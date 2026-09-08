import { describe, expect, it } from "vitest";
import { buildTechnologyScenarioSources, getTechnologyInputChoices } from "../berm-technology-inputs";
import { DEFAULT_BERM_ATLAS_PARAMETERS, evaluateScenarioSource, runBermAtlasScenarioDetailed } from "../berm-atlas-scenario";
import { getChangeAtlasSource, changeAtlasData } from "../change-atlas-data";

describe("technology observations entering the BERM scenario",()=>{
  it.each(["FIN","USA","GBR","DEU","JPN"])("uses changing observed profiles instead of generic launch ramps in %s",country=>{
    const sources=buildTechnologyScenarioSources(country,new URLSearchParams());
    expect(sources.some(s=>s.familyId==="electric-grid")).toBe(true);
    expect(sources.some(s=>s.familyId==="cellular-total")).toBe(true);
    expect(new Set(sources.map(s=>s.familyId)).size).toBe(sources.length);
    expect(sources.every(s=>s.profile&&s.profile.length>0)).toBe(true);
    const result=runBermAtlasScenarioDetailed(sources,DEFAULT_BERM_ATLAS_PARAMETERS,1950,2023,1950);
    expect(result.coverage.legacyRampSourceIds).toEqual([]);
    expect(result.points).toHaveLength(74);
    expect(result.points.every(p=>Number.isFinite(p.multiplier))).toBe(true);
    for(const source of sources)for(const id of source.sourceIds)expect(getChangeAtlasSource(id)).toBeDefined();
  });
  it("retains Finnish electricity growth after the 1882 opening rather than flattening it before 1950",()=>{
    const source=buildTechnologyScenarioSources("FIN",new URLSearchParams()).find(s=>s.familyId==="electric-grid")!;
    expect(source.driverSeriesId).toBe("fin_electricity_consumption_gwh");
    expect(evaluateScenarioSource(source,1980,8).value).toBeGreaterThan(evaluateScenarioSource(source,1960,8).value!);
    expect(evaluateScenarioSource(source,2000,30)).toEqual(evaluateScenarioSource(source,2000,0));
  });
  it("selects AMI or AMR as alternative indicators and retains observed replacement",()=>{
    const choices=getTechnologyInputChoices("USA").filter(s=>s.familyId==="smart-metering");
    expect(choices.map(s=>s.id)).toEqual(expect.arrayContaining(["us_electricity_ami_meters","us_electricity_amr_meters"]));
    const selected=buildTechnologyScenarioSources("USA",new URLSearchParams("s_driver_smart-metering=us_electricity_amr_meters")).filter(s=>s.familyId==="smart-metering");
    expect(selected).toHaveLength(1);
    expect(selected[0].profile![0].value).toBeGreaterThan(selected[0].profile!.at(-1)!.value);
  });
  it("keeps boundary holding explicit and normalizes invalid URL choices consistently",()=>{
    const sources=buildTechnologyScenarioSources("FIN",new URLSearchParams("s_timing=invalid&s_mapping=invalid"));
    expect(sources.every(s=>s.profileMode==="linear"&&s.profileTransform==="sqrt"&&s.profileOutside==="hold")).toBe(true);
    const grid=sources.find(s=>s.familyId==="electric-grid")!;
    expect(evaluateScenarioSource(grid,1950,8).basis).toBe("assumed-hold");
    const strict=buildTechnologyScenarioSources("FIN",new URLSearchParams("s_edges=unknown"));
    expect(()=>runBermAtlasScenarioDetailed(strict,DEFAULT_BERM_ATLAS_PARAMETERS,1950,2023,1950)).toThrow(/Missing source profile/);
  });
  it("does not infer a Finnish meter rollout from the single 2017 snapshot",()=>{
    const base=buildTechnologyScenarioSources("FIN",new URLSearchParams()).find(s=>s.familyId==="smart-metering")!;
    expect(base.singleObservation).toBe(true);
    expect(base.enabled).toBe(false);
    const explicit=buildTechnologyScenarioSources("FIN",new URLSearchParams("s_single_smart-metering=1")).find(s=>s.familyId==="smart-metering")!;
    expect(explicit.enabled).toBe(true);
  });
  it("never adds the total mobile series once generation-specific representation is selected",()=>{
    const sources=buildTechnologyScenarioSources("GBR",new URLSearchParams("s_mobile=generations"));
    expect(sources.some(s=>s.familyId==="cellular-total")).toBe(false);
  });
  it("does not change the observation catalogue when timing or biological assumptions change",()=>{
    const original=JSON.stringify(changeAtlasData);
    for(const timing of ["linear","early","late"] as const){
      const sources=buildTechnologyScenarioSources("USA",new URLSearchParams(),timing);
      runBermAtlasScenarioDetailed(sources,{...DEFAULT_BERM_ATLAS_PARAMETERS,beta:0},1950,2023,1950);
    }
    expect(JSON.stringify(changeAtlasData)).toBe(original);
  });
});
