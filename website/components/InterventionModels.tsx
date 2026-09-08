"use client";

import { useEffect, useState } from "react";
import { interventionText as tx, parseInterventionScenarios, traceValue, type InterventionScenarios } from "@/lib/interventions";

const COPY = {
  fi: { open: "Avaa laskentaesimerkit", title: "Ehdollinen laskentaesimerkki", note: "Synteettiset syötteet ja kertoimet. Nämä luvut eivät ole tutkimusten mittauspisteitä tai sovitettuja vaikutuskokoja; ne eivät tuota ihmisen hedelmällisyysennustetta.", loading: "Ladataan laskentaesimerkkejä…", error: "Laskentaesimerkkejä ei voitu ladata tai tarkistaa. Tutkimusprofiilin voi edelleen lukea yllä.", retry: "Yritä uudelleen", choose: "Valitse laskentaesimerkki", endpoint: "Valitse havaintosuure", input: "Muuttuva syöte", reference: "Ilman interventiota", target: "Interventiolla", unit: "Yksikkö", arms: "Neljä synteettistä koehaaraa", value: "Päätepisteen arvo", curve: "Mallinnetun tilan aikasarja", curveNote: "Käyrä näyttää tilan absoluuttisen arvon, josta päätepiste lasketaan. Pystylinja merkitsee esikäsittelyn jälkeistä lähtömittausta. Havaintoraja ja mittarin kyllästyminen vaikuttavat havaintomalliin erikseen.", time: "Aika (s)", noCurve: "Tälle päätepisteelle näytetään haarakohtaiset arvot; erillistä aikasarjaa ei ole.", contrast: "Synteettinen interaktiokontrasti", without: "Kenttävaikutus ilman interventiota", with: "Kenttävaikutus interventiolla", interaction: "Näiden erotus", assumptions: "Oletukset ja toistettavuus", download: "Lataa protokollat, syötteet ja tulokset (JSON)", none: "Tälle profiilille ei ole ladatussa aineistossa laskentaesimerkkiä.", undetected: "Alle havaintorajan", parameters: "Esimerkin parametrien tunnisteet" },
  en: { open: "Open model examples", title: "Conditional model example", note: "Synthetic inputs and coefficients. These values are not study measurements or fitted effect sizes and do not produce a human fertility forecast.", loading: "Loading model examples…", error: "The model examples could not be loaded or verified. The study profile remains available above.", retry: "Try again", choose: "Choose a model example", endpoint: "Choose an observable", input: "Changed input", reference: "Without intervention", target: "With intervention", unit: "Unit", arms: "Four synthetic experimental arms", value: "Endpoint value", curve: "Modeled state time course", curveNote: "The curve shows the absolute state used to calculate the endpoint. The vertical line marks baseline after pretreatment. Detection limits and indicator saturation apply separately in the observation model.", time: "Time (s)", noCurve: "Arm-specific values are shown for this endpoint; no separate time course is available.", contrast: "Synthetic interaction contrast", without: "Field effect without intervention", with: "Field effect with intervention", interaction: "Difference between effects", assumptions: "Assumptions and reproducibility", download: "Download protocols, inputs and results (JSON)", none: "The loaded data contains no model example for this profile.", undetected: "Below detection limit", parameters: "Illustrative parameter identifiers" },
};
const control = "min-h-11 rounded-lg border border-border bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400";
const colors = ["#60a5fa", "#fb923c", "#34d399", "#c084fc"];
const dashes = ["", "7 4", "2 3", "10 3 2 3"];

export function InterventionModels({ profileId, locale }: { profileId: string; locale: string }) {
  const lang = locale === "fi" ? "fi" : "en";
  const copy = COPY[lang];
  const [request, setRequest] = useState(0);
  const [data, setData] = useState<InterventionScenarios | null>(null);
  const [failed, setFailed] = useState(false);
  const [scenarioId, setScenarioId] = useState("");
  const [endpointSelection, setEndpointSelection] = useState({ scenarioId: "", id: "" });
  useEffect(() => {
    if (!request) return;
    const controller = new AbortController();
    fetch("/data/intervention-scenarios.json", { signal: controller.signal }).then(response => {
      if (!response.ok) throw new Error("Example download failed");
      return response.json();
    }).then(value => { if (!controller.signal.aborted) setData(parseInterventionScenarios(value)); }).catch(() => { if (!controller.signal.aborted) setFailed(true); });
    return () => controller.abort();
  }, [request]);
  const start = () => { setFailed(false); setRequest(n => n + 1); };
  if (!request) return <div className="space-y-3 border-t border-border pt-4"><p className="text-sm text-foreground-muted">{copy.note}</p><button type="button" className={control} onClick={start}>{copy.open}</button></div>;
  if (failed) return <div role="alert" className="space-y-3 rounded-lg border border-border p-4"><p>{copy.error}</p><button type="button" className={control} onClick={start}>{copy.retry}</button></div>;
  if (!data) return <p role="status">{copy.loading}</p>;
  const available = data.scenarios.filter(scenario => scenario.profile_id === profileId);
  const scenario = available.find(scenario => scenario.id === scenarioId) ?? available[0];
  if (!scenario) return <p>{copy.none}</p>;
  const endpoints = [...new Set([...scenario.highlight_endpoints, ...Object.keys(scenario.result.arms[0].observables)])];
  const endpoint = endpointSelection.scenarioId === scenario.id && endpoints.includes(endpointSelection.id) ? endpointSelection.id : (scenario.highlight_endpoints.find(key => data.metadata.observable_trace_keys[key]) ?? scenario.highlight_endpoints[0]);
  const result = scenario.result;
  const label = data.metadata.observable_labels[endpoint];
  const unit = result.arms[0].observables[endpoint].unit;
  const format = (value: number) => new Intl.NumberFormat(locale, { maximumSignificantDigits: 5 }).format(value);
  const contrast = result.contrasts.find(item => item.endpoint === endpoint);
  const traceKey = data.metadata.observable_trace_keys[endpoint];
  const traces = result.arms.map(arm => arm.trace.flatMap(point => {
    const value = traceKey ? traceValue(point, traceKey) : undefined;
    return value === undefined ? [] : [{ time: point.time_s as number, value }];
  }));
  const values = traces.flat();
  const minTime = Math.min(0, ...values.map(point => point.time));
  const maxTime = Math.max(1e-9, ...values.map(point => point.time));
  const low = Math.min(0, ...values.map(point => point.value));
  const high = Math.max(low + 1e-9, ...values.map(point => point.value));
  const range = high - low;
  const x = (value: number) => 65 + (value - minTime) / (maxTime - minTime) * 485;
  const y = (value: number) => 225 - (value - low) / range * 175;
  return <div className="space-y-4 rounded-xl border border-amber-500/30 p-4" data-testid="intervention-model">
    <h3 className="text-lg font-semibold">{copy.title}</h3><p className="rounded-lg bg-amber-500/5 p-3 text-sm leading-relaxed">{copy.note}</p>
    <label className="block text-sm font-medium">{copy.choose}<select className={`${control} mt-2 block w-full`} value={scenario.id} onChange={event => setScenarioId(event.target.value)}>{available.map(item => <option key={item.id} value={item.id}>{tx(item.title, locale)}</option>)}</select></label>
    <p className="text-sm leading-relaxed text-foreground-muted">{tx(scenario.description, locale)}</p>
    <div className="overflow-x-auto"><table className="w-full text-left text-xs"><thead><tr className="border-b border-border"><th className="p-2">{copy.input}</th><th className="p-2">{copy.reference}</th><th className="p-2">{copy.target}</th></tr></thead><tbody>{scenario.changed_inputs.map(input => <tr key={input.key} className="border-b border-border"><th scope="row" className="p-2 font-medium">{tx(input.label, locale)}<span className="block font-normal text-foreground-muted">{input.units}</span></th><td className="p-2">{typeof input.reference === "number" ? format(input.reference) : input.reference}</td><td className="p-2">{typeof input.target === "number" ? format(input.target) : input.target}</td></tr>)}</tbody></table></div>
    <label className="block text-sm font-medium">{copy.endpoint}<select className={`${control} mt-2 block w-full`} value={endpoint} onChange={event => setEndpointSelection({ scenarioId: scenario.id, id: event.target.value })}>{endpoints.map(key => <option key={key} value={key}>{tx(data.metadata.observable_labels[key], locale)}</option>)}</select></label>
    <p className="text-xs text-foreground-muted">{copy.unit}: {unit}</p>
    <div className="overflow-x-auto"><table className="w-full text-left text-sm"><caption className="pb-2 text-left font-medium">{copy.arms}: {tx(label, locale)}</caption><thead><tr className="border-b border-border"><th className="p-2">{copy.arms}</th><th className="p-2">{copy.value}</th></tr></thead><tbody>{result.arms.map((arm, index) => <tr className="border-b border-border" key={arm.id}><th scope="row" className="p-2 font-medium"><span style={{ color: colors[index] }}>{["━", "┄", "┈", "┅"][index]} </span>{tx(arm.label, locale)}</th><td className="p-2 tabular-nums">{format(arm.observables[endpoint].value)}{arm.observables[endpoint].detected === false && <span className="ml-2 text-xs text-foreground-muted">({copy.undetected})</span>}</td></tr>)}</tbody></table></div>
    {values.length > 0 ? <div><h4 className="font-semibold">{copy.curve}</h4><p className="mt-2 text-xs leading-relaxed text-foreground-muted">{copy.curveNote}</p><svg viewBox="0 0 580 275" className="mt-3 w-full" role="img" aria-label={`${copy.curve}: ${tx(label, locale)}`}><title>{copy.curve}: {tx(label, locale)}</title><desc>{copy.note} {copy.curveNote}</desc>{[0, 0.5, 1].map(ratio => <g key={ratio}><line x1="65" x2="550" y1={y(low + ratio * range)} y2={y(low + ratio * range)} stroke="currentColor" opacity="0.15" /><text x="58" y={y(low + ratio * range) + 5} textAnchor="end" fontSize="14" fill="currentColor">{format(low + ratio * range)}</text></g>)}<line x1={x(result.arms[0].baseline.time_s)} x2={x(result.arms[0].baseline.time_s)} y1="45" y2="225" stroke="currentColor" opacity="0.5" strokeDasharray="3 5" />{traces.map((trace, index) => <polyline key={result.arms[index].id} points={trace.map(point => `${x(point.time)},${y(point.value)}`).join(" ")} fill="none" stroke={colors[index]} strokeWidth="2.8" strokeDasharray={dashes[index]} />)}<text x="65" y="246" fontSize="14" fill="currentColor">{format(minTime)}</text><text x="550" y="246" fontSize="14" textAnchor="end" fill="currentColor">{format(maxTime)}</text><text x="305" y="270" fontSize="15" textAnchor="middle" fill="currentColor">{copy.time}</text></svg></div> : <p className="text-xs text-foreground-muted">{copy.noCurve}</p>}
    {contrast && <div className="space-y-2" data-testid="intervention-model-contrast"><h4 className="font-semibold">{copy.contrast}</h4><dl className="grid gap-3 text-sm sm:grid-cols-3">{[[copy.without, contrast.field_effect_without_drug], [copy.with, contrast.field_effect_with_drug], [copy.interaction, contrast.interaction]].map(([label, value]) => <div key={label as string} className="rounded-lg border border-border p-3"><dt className="text-xs text-foreground-muted">{label}</dt><dd className="mt-2 tabular-nums">{format(value as number)}</dd></div>)}</dl></div>}
    <details className="rounded-lg border border-border px-3"><summary className="min-h-11 cursor-pointer content-center text-sm font-medium">{copy.assumptions}</summary><ul className="mb-3 ml-5 list-disc space-y-2 text-xs leading-relaxed">{data.metadata.assumptions[lang].map(item => <li key={item}>{item}</li>)}</ul><details className="mb-3"><summary className="min-h-11 cursor-pointer content-center text-xs">{copy.parameters}</summary><ul className="space-y-1 break-all text-xs text-foreground-muted">{result.parameter_ids.map(id => <li key={id}>{id}</li>)}</ul></details></details>
    <a className="inline-flex min-h-11 items-center text-sm text-accent hover:underline" href="/data/intervention-scenarios.json" download>{copy.download}</a>
  </div>;
}
