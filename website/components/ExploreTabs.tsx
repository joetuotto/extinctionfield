"use client";
import { Suspense } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import dynamic from "next/dynamic";
import { ChangeAtlas } from "./ChangeAtlas";

const WorldMap=dynamic(()=>import("./WorldMap").then(m=>m.WorldMap));
const GlobalDataExplorer=dynamic(()=>import("./GlobalDataExplorer").then(m=>m.GlobalDataExplorer));
const DataSourcesContent=dynamic(()=>import("./DataSourcesContent").then(m=>m.DataSourcesContent));
const ThresholdExplorer=dynamic(()=>import("./ThresholdExplorer").then(m=>m.ThresholdExplorer));
const SentinelExplorer=dynamic(()=>import("./SentinelExplorer").then(m=>m.SentinelExplorer));
const CivilizationTimeline=dynamic(()=>import("./CivilizationTimeline").then(m=>m.CivilizationTimeline));
const NaturalEMVisualization=dynamic(()=>import("./NaturalEMVisualization").then(m=>m.NaturalEMVisualization));
const SolarExplorer=dynamic(()=>import("./SolarExplorer").then(m=>m.SolarExplorer));
const DkcExplorer=dynamic(()=>import("./DkcExplorer").then(m=>m.DkcExplorer));
const TOOLS = [
  ["atlas","Muutosatlas","Change atlas"], ["global","Kaikkien maiden alkuperäispaneeli","All-country source panel"],
  ["map","Maailmankartta","World map"], ["catalogue","Muut aineistot ja lataukset","Other datasets and downloads"],
  ["threshold","Aiempi T→TFR-skenaariolaskuri","Earlier T→TFR scenario calculator"], ["sentinel-tests","Sentinellien testiasetelmat","Sentinel study designs"],
  ["naturalEM","Luonnollinen kenttäympäristö","Natural field environment"], ["solar","Auringon geometrinen tarkastelu","Solar geometry"],
  ["dkc","DKC-tarkastelu","DKC explorer"], ["civilizations","Historialliset sivilisaatioskenaariot","Historical civilization scenarios"],
] as const;
function ExploreTabsInner({locale}:{locale:string}) {
  const params=useSearchParams(),pathname=usePathname();
  const selected=params.get("tab");
  const active=TOOLS.some(t=>t[0]===selected)?selected!:"atlas";
  const change=(tab:string)=>{const p=new URLSearchParams(params.toString());p.set("tab",tab);window.history.replaceState(null,"",`${pathname}?${p}`);};
  return <>
    {active!=="atlas" && <button type="button" className="mb-6 text-sm text-accent hover:underline" onClick={()=>change("atlas")}>{locale==="fi"?"← Palaa muutosatlakseen":"← Return to the change atlas"}</button>}
    {active==="atlas" && <ChangeAtlas locale={locale}/>}
    {active==="map" && <WorldMap locale={locale}/>}
    {active==="global" && <GlobalDataExplorer locale={locale}/>}
    {active==="catalogue" && <DataSourcesContent locale={locale}/>}
    {active==="threshold" && <ThresholdExplorer locale={locale}/>}
    {active==="sentinel-tests" && <SentinelExplorer locale={locale}/>}
    {active==="civilizations" && <CivilizationTimeline locale={locale}/>}
    {active==="naturalEM" && <NaturalEMVisualization locale={locale}/>}
    {active==="solar" && <SolarExplorer locale={locale}/>}
    {active==="dkc" && <DkcExplorer locale={locale}/>}
    <details className="border-t border-border mt-10 pt-5" open={active!=="atlas"}><summary className="text-sm font-medium cursor-pointer">{locale==="fi"?"Muut aineistot ja erikoistyökalut":"Other datasets and specialist tools"}</summary><label className="block text-sm text-foreground-muted mt-4">{locale==="fi"?"Avaa työkalu":"Open a tool"}<select aria-label={locale==="fi"?"Erikoistyökalu":"Specialist tool"} value={active} onChange={e=>change(e.target.value)} className="block max-w-full mt-2 border border-border rounded-md bg-background text-foreground p-2">{TOOLS.map(t=><option key={t[0]} value={t[0]}>{locale==="fi"?t[1]:t[2]}</option>)}</select></label></details>
  </>;
}
export function ExploreTabs({locale}:{locale:string}) {
  return <Suspense fallback={<p className="text-sm text-foreground-muted">{locale==="fi"?"Ladataan muutosatlasta…":"Loading the change atlas…"}</p>}><ExploreTabsInner locale={locale}/></Suspense>;
}
