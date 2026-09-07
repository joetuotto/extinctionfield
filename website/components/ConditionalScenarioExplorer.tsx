"use client";

import { useState } from "react";
import data from "@/data/conditional-scenario-explorer.json";

const COPY = {
  fi: {
    title: "Mekanismista väestölaskentaan", lead: "Vertaa, miten ajoitus, vastaanottavuus, korjaus ja parien väliset erot kulkevat saman laskentaketjun läpi. Valitse yksi muutos kerrallaan.",
    boundary: "Havainnollistava malli: syötteet ja siirtokertoimet ovat valittuja esimerkkejä. Luvut eivät ole mitattuja kenttävaikutuksia tai maakohtaisia ennusteita.",
    choose: "Valitse vertailu", reference: "Vertailutila", target: "Muutettu tila", input: "Muutettava syöte", units: "Yksikkö",
    trace: "Solun tapahtumakulku", time: "Aika (s)", traceNote: "Kuva näyttää ensimmäisen ikäryhmän esimerkkiprotokollan. Kaikissa seitsemässä ryhmässä käytetään tässä samoja solusyötteitä. Hormonivaihe ja odotusjakauma vaikuttavat myöhemmissä vaiheissa, joten solukäyrät voivat pysyä samoina.",
    calcium: "Soluliman Ca²⁺", repair_capacity: "Korjauskapasiteetti", damage_load: "Vauriokuorma", receptor_readiness: "Vastaanottovalmius",
    chartUnits: "Mallin suhteelliset tilayksiköt", endpoint: "Toiminnallinen portti", endpointNote: "Solutila muunnetaan toiminnaksi erikseen valitulla vasteikkunalla. Sen kerroin tarvitsee oman havaintokalibroinnin.",
    relative: "Ehdollinen muutos", tfr: "Laskuesimerkin TFR", tfrNote: "Lähtö-ASFR on jokaisessa ryhmässä 100 syntymää tuhatta naista kohti vuodessa. TFR 3,5 on tästä laskettu synteettinen vertailutaso.",
    ageTable: "Ikäkohtainen laskentajälki", age: "Ikäryhmä", assumptions: "Oletukset ja soveltamisrajat", download: "Lataa kaikki syötteet ja laskentatulokset (JSON)",
    valueNote: "ASFR: syntymiä tuhatta naista kohti vuodessa. TFR lasketaan viiden vuoden ikäryhmistä. Odotusjakauman suhde on ehdollinen skenaario-oletus; se ei yksin kuvaa kalenterivuoden syntymätodennäköisyyttä.",
    seconds: "sekuntia", radians: "radiaania", probability: "todennäköisyys", relativeState: "suhteellinen tila", cellGate: "Solun toiminnallinen kerroin", pairGate: "Parin biologinen kapasiteetti", populationRatio: "Väestölaskennan biologinen suhde", populationNote: "Tässä suhteessa on mukana mahdollinen odotusjakauma. Jakauman muutos voi vaikuttaa tulokseen, vaikka yksittäisen esimerkkiparin kapasiteetti pysyy samana.",
  },
  en: {
    title: "From mechanism to population arithmetic", lead: "Compare how timing, receptivity, repair and differences between couples pass through the same computational chain. Select one change at a time.",
    boundary: "Illustrative model: inputs and transfer coefficients are chosen examples. The numbers are not measured field effects or country forecasts.",
    choose: "Choose a comparison", reference: "Reference state", target: "Changed state", input: "Changed input", units: "Unit",
    trace: "Cell time course", time: "Time (s)", traceNote: "The chart shows the example protocol for the first age group. All seven groups use the same cell inputs here. Hormone phase and waiting distributions act at later stages, so cell traces may remain unchanged.",
    calcium: "Cytosolic Ca²⁺", repair_capacity: "Repair capacity", damage_load: "Damage load", receptor_readiness: "Receptor readiness",
    chartUnits: "Relative model state units", endpoint: "Functional gate", endpointNote: "Cell state is mapped to function through a separately chosen response window. Its coefficient requires its own observational calibration.",
    relative: "Conditional change", tfr: "Example TFR", tfrNote: "Reference ASFR is 100 births per thousand women per year in every age group. TFR 3.5 is the resulting synthetic comparison baseline.",
    ageTable: "Age-specific calculation", age: "Age group", assumptions: "Assumptions and scope", download: "Download all inputs and results (JSON)",
    valueNote: "ASFR: births per thousand women per year. TFR uses five-year age groups. The waiting-distribution ratio is a conditional scenario assumption; it does not by itself describe calendar-year birth probability.",
    seconds: "seconds", radians: "radians", probability: "probability", relativeState: "relative state", cellGate: "Cell functional factor", pairGate: "Couple biological capacity", populationRatio: "Population biological ratio", populationNote: "This ratio includes the optional waiting distribution. A distributional change can affect the result even when the individual example couple's capacity is unchanged.",
  },
};
type TraceKey = "calcium" | "repair_capacity" | "damage_load" | "receptor_readiness";
const traceKeys: TraceKey[] = ["calcium", "repair_capacity", "damage_load", "receptor_readiness"];

export function ConditionalScenarioExplorer({ locale }: { locale: string }) {
  const lang = locale === "fi" ? "fi" : "en";
  const copy = COPY[lang];
  const [selectedId, setSelectedId] = useState(data.scenarios[0].id);
  const [traceKey, setTraceKey] = useState<TraceKey>("calcium");
  const scenario = data.scenarios.find(item => item.id === selectedId) ?? data.scenarios[0];
  const result = scenario.result;
  const run = result.mechanism_runs[0];
  const traces = [run.reference.trace, run.target.trace];
  const maxTime = Math.max(...traces.flat().map(point => point.time_s));
  const maxValue = Math.max(0.01, ...traces.flat().map(point => point[traceKey])) * 1.08;
  const points = traces.map(trace => trace.map(point => `${52 + point.time_s / maxTime * 402},${205 - point[traceKey] / maxValue * 165}`).join(" "));
  const format = (value: number, digits = 3) => new Intl.NumberFormat(locale, { maximumFractionDigits: digits }).format(value);
  const inputValue = (value: string | number | number[]) => Array.isArray(value) ? value.map(item => format(item)).join("; ") : typeof value === "number" ? format(value) : value;
  const unit = (value: string) => ({ seconds: copy.seconds, radians: copy.radians, probability: copy.probability, "relative state": copy.relativeState }[value] ?? value);
  const relative = 100 * (result.predicted_tfr / result.reference_tfr - 1);

  return <section id="conditional-scenarios" className="scroll-mt-24 space-y-5 rounded-xl border border-border bg-surface p-4 sm:p-6" aria-labelledby="conditional-scenarios-title">
    <div><h2 id="conditional-scenarios-title" className="font-serif text-2xl">{copy.title}</h2><p className="mt-2 text-sm leading-relaxed text-foreground-muted">{copy.lead}</p></div>
    <p className="rounded-lg border border-amber-500/25 bg-amber-500/5 p-3 text-sm leading-relaxed">{copy.boundary}</p>
    <label className="block text-sm font-medium">{copy.choose}<select className="mt-2 block min-h-11 w-full rounded-lg border border-border bg-background px-3" value={scenario.id} onChange={event => setSelectedId(event.target.value)}>
      {data.scenarios.map(item => <option key={item.id} value={item.id}>{item.title[lang]}</option>)}
    </select></label>
    <p className="text-sm leading-relaxed text-foreground-muted" aria-live="polite">{scenario.description[lang]}</p>
    <div className="overflow-x-auto"><table className="w-full text-left text-xs sm:text-sm"><thead><tr className="border-b border-border"><th className="p-2">{copy.input}</th><th className="p-2">{copy.reference}</th><th className="p-2">{copy.target}</th></tr></thead><tbody>
      {scenario.changed_inputs.map(input => <tr key={input.key} className="border-b border-border"><th scope="row" className="p-2 font-medium">{input.label[lang]}<span className="mt-1 block text-xs font-normal text-foreground-muted">{unit(input.units)}</span></th><td className="p-2">{inputValue(input.reference)}</td><td className="p-2">{inputValue(input.target)}</td></tr>)}
    </tbody></table></div>

    <div className="space-y-3">
      <h3 className="text-base font-semibold">{copy.trace}</h3>
      <div className="flex flex-wrap gap-2" role="group" aria-label={copy.trace}>{traceKeys.map(key => <button key={key} type="button" className={`min-h-11 rounded-lg border px-3 text-xs ${key === traceKey ? "border-blue-400 bg-blue-500/10" : "border-border"}`} aria-pressed={key === traceKey} onClick={() => setTraceKey(key)}>{copy[key]}</button>)}</div>
      <p className="text-xs text-foreground-muted">{copy.chartUnits}</p>
      <svg viewBox="0 0 480 260" className="w-full" role="img" aria-label={`${copy.trace}: ${copy[traceKey]}`}>
        <title>{copy[traceKey]}</title>
        <desc>{copy.traceNote}</desc>
        {[0, 0.5, 1].map(ratio => <g key={ratio}><line x1="52" y1={205 - ratio * 165} x2="454" y2={205 - ratio * 165} stroke="currentColor" opacity="0.12" /><text x="42" y={209 - ratio * 165} textAnchor="end" fontSize="16" fill="currentColor">{format(ratio * maxValue, 2)}</text></g>)}
        <polyline points={points[0]} fill="none" stroke="#60a5fa" strokeWidth="3" />
        <polyline points={points[1]} fill="none" stroke="#fb923c" strokeWidth="3" strokeDasharray="7 4" />
        <text x="52" y="227" fontSize="16" fill="currentColor">0</text><text x="454" y="227" textAnchor="end" fontSize="16" fill="currentColor">{format(maxTime, 1)}</text><text x="253" y="252" textAnchor="middle" fontSize="16" fill="currentColor">{copy.time}</text>
      </svg>
      <div className="flex flex-wrap gap-4 text-xs"><span className="text-blue-400">━ {copy.reference}</span><span className="text-orange-400">┄ {copy.target}</span></div>
      <p className="text-xs leading-relaxed text-foreground-muted">{copy.traceNote}</p>
      <table className="w-full text-left text-xs"><thead><tr className="border-b border-border"><th className="p-2">{copy[traceKey]}</th><th className="p-2">{copy.reference}</th><th className="p-2">{copy.target}</th></tr></thead><tbody><tr><th className="p-2 font-normal">{format(maxTime, 1)} s</th><td className="p-2">{format(traces[0].at(-1)![traceKey])}</td><td className="p-2">{format(traces[1].at(-1)![traceKey])}</td></tr></tbody></table>
    </div>

    <div className="space-y-2 border-t border-border pt-4"><h3 className="font-semibold">{copy.endpoint}</h3><p className="text-xs leading-relaxed text-foreground-muted">{copy.endpointNote}</p><div className="grid gap-2 text-sm" data-testid="scenario-functional-gate"><p>{copy.cellGate}: <span className="font-mono">{format(run.reference.functional_endpoint.factor)} → {format(run.target.functional_endpoint.factor)}</span></p><p>{copy.pairGate}: <span className="font-mono">{format(run.reference.biological_capacity)} → {format(run.target.biological_capacity)}</span></p><p>{copy.populationRatio}: <span className="font-mono">{format(result.age_groups[0].biological_ratio)}</span></p></div><p className="text-xs leading-relaxed text-foreground-muted">{copy.populationNote}</p></div>
    <div className="grid gap-3 sm:grid-cols-3" data-testid="scenario-result">
      <div className="rounded-lg border border-border p-3"><p className="text-xs text-foreground-muted">{copy.tfr} · {copy.reference}</p><p className="mt-1 text-2xl tabular-nums">{format(result.reference_tfr)}</p></div>
      <div className="rounded-lg border border-border p-3"><p className="text-xs text-foreground-muted">{copy.tfr} · {copy.target}</p><p className="mt-1 text-2xl tabular-nums">{format(result.predicted_tfr)}</p></div>
      <div className="rounded-lg border border-border p-3"><p className="text-xs text-foreground-muted">{copy.relative}</p><p className="mt-1 text-2xl tabular-nums">{relative > 0 ? "+" : ""}{format(relative, 2)} %</p></div>
    </div>
    <p className="text-xs leading-relaxed text-foreground-muted">{copy.tfrNote}</p>
    <details className="rounded-lg border border-border px-3"><summary className="min-h-11 cursor-pointer content-center text-sm">{copy.ageTable}</summary><div className="overflow-x-auto"><table className="w-full text-left text-xs"><thead><tr><th className="p-2">{copy.age}</th><th className="p-2">{copy.reference}</th><th className="p-2">{copy.target}</th></tr></thead><tbody>{result.age_groups.map(group => <tr key={group.age_group} className="border-t border-border"><th scope="row" className="p-2 font-medium">{group.age_group}</th><td className="p-2">{format(group.reference_asfr)}</td><td className="p-2">{format(group.predicted_asfr)}</td></tr>)}</tbody></table></div><p className="py-3 text-xs leading-relaxed text-foreground-muted">{copy.valueNote}</p></details>
    <details className="rounded-lg border border-border px-3"><summary className="min-h-11 cursor-pointer content-center text-sm">{copy.assumptions}</summary><ul className="mb-3 ml-4 list-disc space-y-2 text-xs leading-relaxed text-foreground-muted">{data.metadata.assumptions[lang].map(assumption => <li key={assumption}>{assumption}</li>)}</ul></details>
    <a className="inline-flex min-h-11 items-center text-xs text-accent hover:underline" href="/data/conditional-scenarios.json" download>{copy.download}</a>
  </section>;
}
