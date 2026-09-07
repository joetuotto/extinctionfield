"use client";

import { useState } from "react";
import coordination from "@/data/biological-coordination.json";
import { pickCopy } from "@/lib/i18n";

const COPY = {
  en: {
    title: "Explore timing, recovery and individual differences",
    intro: "These examples show the mathematical consequences of declared inputs. Values are normalised illustrations, with no fitted environmental field effect or clinical prediction. Changing a selection compares the model’s precomputed scenarios.",
    hormoneTitle: "Signal and receiving window",
    hormoneText: "Hold the average hormone signal and average receptivity fixed. Shift only their relative phase and inspect the resulting mean functional response.",
    hormoneOptions: ["Aligned", "6-hour phase difference", "12-hour phase difference"],
    hormoneLabel: "Hormone–receptor phase relation",
    hormone: "Hormone signal",
    receptivity: "Receptivity",
    product: "Functional response",
    hour: "Hours in the illustrative cycle",
    normalised: "Normalised value",
    responseMean: "Mean functional response",
    relative: "Relative to aligned response",
    fixedMeans: "Fixed means: hormone {h}; receptivity {s}. Each amplitude is {a}. The example period is {t} hours.",
    recoveryTitle: "Repeated pulses and recovery",
    recoveryText: "The same increment is delivered repeatedly. The interval between events determines how much of the earlier trace remains when the next pulse arrives. Both charts show the same number of pulses; their elapsed times differ.",
    recoveryOptions: ["Frequent: interval 0.1 τ", "Spaced: interval 3 τ"],
    recoveryLabel: "Pulse interval relative to recovery time",
    tau: "Elapsed time / recovery time τ",
    memory: "Stored trace",
    steady: "Long-run level just after a pulse",
    increment: "Increment per pulse",
    recoveryNote: "τ denotes the declared recovery time. This illustration isolates retention and decay; a separate receptor-readiness process is needed to represent an optimal interval or adaptation.",
    waitingTitle: "The same mean, different waiting-time tails",
    waitingText: "Compare a uniform population with a mixed population whose initial mean per-cycle conception probability is the same. Probabilities remain fixed for each group, and all couples are assumed to keep trying.",
    waitingOptions: ["Everyone: 20% per cycle", "Half: 10%; half: 30%"],
    waitingLabel: "Distribution of per-cycle probabilities",
    cycle: "Trying cycle",
    conceived: "Cumulative conception probability",
    afterCycles: "Conceived by cycle {n}",
    stillWaiting: "Still waiting after cycle {n}",
    nextCycle: "Next-cycle chance among those still waiting",
    waitingNote: "The endpoint is first conception. Pregnancy continuation and live birth require subsequent gates. The declining conditional chance in the mixed group comes from the changing composition of couples still waiting.",
    table: "Show the values",
    input: "Scenario",
    download: "Download the example inputs and results (JSON) →",
  },
  fi: {
    title: "Tarkastele ajoitusta, palautumista ja yksilöeroja",
    intro: "Esimerkit näyttävät ilmoitettujen syötteiden matemaattisia seurauksia. Arvot ovat normalisoituja havainnollistuksia ilman sovitettua ympäristökentän vaikutusta tai kliinistä ennustetta. Valinnan muuttaminen vertailee mallista laskettuja tilanteita.",
    hormoneTitle: "Signaali ja vastaanottoikkuna",
    hormoneText: "Pidä hormonisignaalin ja vastaanottavuuden keskiarvot samoina. Siirrä vain niiden keskinäistä vaihetta ja tarkastele toiminnallisen vasteen keskiarvoa.",
    hormoneOptions: ["Samassa vaiheessa", "6 tunnin vaihe-ero", "12 tunnin vaihe-ero"],
    hormoneLabel: "Hormonin ja reseptorin vaihesuhde",
    hormone: "Hormonisignaali",
    receptivity: "Vastaanottavuus",
    product: "Toiminnallinen vaste",
    hour: "Havainnollistavan kierron tunnit",
    normalised: "Normalisoitu arvo",
    responseMean: "Toiminnallisen vasteen keskiarvo",
    relative: "Suhteessa samanvaiheiseen vasteeseen",
    fixedMeans: "Vakiokeskiarvot: hormoni {h}, vastaanottavuus {s}. Kumpikin amplitudi on {a}. Esimerkin jakso on {t} tuntia.",
    recoveryTitle: "Toistuvat pulssit ja palautuminen",
    recoveryText: "Sama lisäys annetaan toistuvasti. Tapahtumien välinen aika määrää, kuinka paljon aiempaa jälkeä on jäljellä seuraavan pulssin saapuessa. Molemmissa kuvaajissa on sama määrä pulsseja; kulunut aika on erilainen.",
    recoveryOptions: ["Tiheä: väli 0,1 τ", "Harva: väli 3 τ"],
    recoveryLabel: "Pulssiväli suhteessa palautumisaikaan",
    tau: "Kulunut aika / palautumisaika τ",
    memory: "Tallentunut jälki",
    steady: "Pitkän ajan taso heti pulssin jälkeen",
    increment: "Yhden pulssin lisäys",
    recoveryNote: "τ tarkoittaa valittua palautumisaikaa. Esimerkki erittelee säilymisen ja vaimenemisen; optimaalisen pulssivälin tai adaptaation kuvaaminen tarvitsee lisäksi vastaanottovalmiuden prosessin.",
    waitingTitle: "Sama keskiarvo, erilaiset odotusajan hännät",
    waitingText: "Vertaa tasaista populaatiota sekapopulaatioon, jonka alkuperäinen kiertokohtainen raskauden alkamisen keskitodennäköisyys on sama. Ryhmien todennäköisyydet säilyvät vakioina, ja kaikkien parien oletetaan jatkavan yrittämistä.",
    waitingOptions: ["Kaikilla 20 % kierrossa", "Puolella 10 %, puolella 30 %"],
    waitingLabel: "Kiertokohtaisten todennäköisyyksien jakauma",
    cycle: "Yrityskierto",
    conceived: "Kumulatiivinen raskauden alkamisen todennäköisyys",
    afterCycles: "Raskaus alkanut kiertoon {n} mennessä",
    stillWaiting: "Yhä odottavien osuus kierron {n} jälkeen",
    nextCycle: "Seuraavan kierron mahdollisuus yhä odottavilla",
    waitingNote: "Päätepiste on ensimmäisen raskauden alkaminen. Raskauden jatkuminen ja elävänä syntyminen tarvitsevat seuraavat portit. Sekaryhmän pienenevä ehdollinen mahdollisuus syntyy yhä odottavien parien muuttuvasta koostumuksesta.",
    table: "Näytä arvot",
    input: "Tilanne",
    download: "Lataa esimerkkien syötteet ja tulokset (JSON) →",
  },
  ja: {}, fr: {}, ko: {},
} as const;

type PlotSeries = { label: string; color: string; dashed?: boolean; points: { x: number; y: number }[] };

function CurvePlot({ series, xMax, yMax, xLabel, yLabel, title, percentage = false }: {
  series: PlotSeries[]; xMax: number; yMax: number; xLabel: string; yLabel: string; title: string; percentage?: boolean;
}) {
  const left = 48;
  const right = 580;
  const top = 16;
  const bottom = 215;
  return (
    <figure className="my-5 min-w-0">
      <p className="mb-1 text-xs text-foreground-muted">{yLabel}</p>
      <svg viewBox="0 0 600 244" role="img" aria-label={title} className="block h-auto w-full">
        <title>{title}</title>
        {[0, 0.5, 1].map((fraction) => <g key={fraction}>
          <line x1={left} x2={right} y1={bottom - fraction * (bottom - top)} y2={bottom - fraction * (bottom - top)} stroke="currentColor" opacity="0.12" />
          <text x={left - 8} y={bottom - fraction * (bottom - top) + 5} textAnchor="end" fill="currentColor" opacity="0.65" fontSize="15">{percentage ? `${Math.round(fraction * yMax * 100)}%` : (fraction * yMax).toFixed(yMax > 5 ? 0 : 1)}</text>
        </g>)}
        {[0, 0.5, 1].map((fraction) => <text key={fraction} x={left + fraction * (right - left)} y={238} textAnchor="middle" fill="currentColor" opacity="0.65" fontSize="15">{Number((fraction * xMax).toFixed(2))}</text>)}
        {series.map((line) => <polyline key={line.label} points={line.points.map(({ x, y }) => `${left + x / xMax * (right - left)},${bottom - y / yMax * (bottom - top)}`).join(" ")} fill="none" stroke={line.color} strokeWidth="2.8" strokeDasharray={line.dashed ? "7 5" : undefined} strokeLinejoin="round" />)}
      </svg>
      <figcaption className="mt-1 text-center text-xs text-foreground-muted">{xLabel}</figcaption>
      <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-xs">
        {series.map((line) => <span key={line.label} className="inline-flex items-center gap-2"><span className="inline-block w-5 border-t-[3px]" style={{ borderColor: line.color, borderTopStyle: line.dashed ? "dashed" : "solid" }} />{line.label}</span>)}
      </div>
    </figure>
  );
}

function ScenarioChoice({ label, options, selected, onSelect }: { label: string; options: readonly string[]; selected: number; onSelect: (index: number) => void }) {
  return <fieldset className="mt-5">
    <legend className="mb-2 text-xs font-medium text-foreground-muted">{label}</legend>
    <div className="flex flex-wrap gap-2">{options.map((option, index) => <button key={option} type="button" aria-pressed={selected === index} onClick={() => onSelect(index)} className={`rounded-md border px-3 py-2 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 ${selected === index ? "border-accent bg-accent/10 font-medium text-accent" : "border-card-border text-foreground-muted hover:border-accent/50"}`}>{option}</button>)}</div>
  </fieldset>;
}

function Result({ label, value }: { label: string; value: string }) {
  return <div><dt className="text-xs leading-relaxed text-foreground-muted">{label}</dt><dd className="mt-1 text-xl font-semibold tabular-nums">{value}</dd></div>;
}

export function BiologicalCoordinationExplorer({ locale }: { locale: string }) {
  const d = pickCopy(COPY, locale) as typeof COPY.en;
  const [hormoneIndex, setHormoneIndex] = useState(0);
  const [recoveryIndex, setRecoveryIndex] = useState(0);
  const [waitingIndex, setWaitingIndex] = useState(0);
  const hormone = coordination.hormoneTiming.scenarios[hormoneIndex];
  const recovery = coordination.recovery.scenarios[recoveryIndex];
  const waiting = coordination.waiting.scenarios[waitingIndex];
  const finalWaiting = waiting.cumulativeByCycle[waiting.cumulativeByCycle.length - 1];
  const number = (value: number, digits = 3) => new Intl.NumberFormat(locale, { maximumFractionDigits: digits }).format(value);
  const percent = (value: number) => new Intl.NumberFormat(locale, { style: "percent", minimumFractionDigits: 1, maximumFractionDigits: 1 }).format(value);
  const box = "rounded-xl border border-card-border bg-card-bg p-5 sm:p-7";
  return <section id="coordination-explorer" className="scroll-mt-24 space-y-6 border-t editorial-rule pt-7">
    <h2 className="editorial-section-heading">{d.title}</h2>
    <p className="max-w-3xl text-sm leading-relaxed text-foreground-muted">{d.intro}</p>
    <div className={box}>
      <h3 className="text-lg font-semibold">{d.hormoneTitle}</h3>
      <p className="mt-2 text-sm leading-relaxed text-foreground-muted">{d.hormoneText}</p>
      <ScenarioChoice label={d.hormoneLabel} options={d.hormoneOptions} selected={hormoneIndex} onSelect={setHormoneIndex} />
      <CurvePlot xMax={coordination.hormoneTiming.periodHours} yMax={2.5} xLabel={d.hour} yLabel={d.normalised} title={`${d.hormoneTitle}: ${d.hormoneOptions[hormoneIndex]}`} series={[
        { label: d.hormone, color: "#3682cc", dashed: true, points: hormone.series.map((point) => ({ x: point.hour, y: point.hormone })) },
        { label: d.receptivity, color: "#c68124", dashed: true, points: hormone.series.map((point) => ({ x: point.hour, y: point.receptivity })) },
        { label: d.product, color: "#369775", points: hormone.series.map((point) => ({ x: point.hour, y: point.instantResponse })) },
      ]} />
      <dl aria-live="polite" className="grid gap-5 border-t border-card-border pt-4 sm:grid-cols-2">
        <Result label={d.responseMean} value={number(hormone.averageResponse)} />
        <Result label={d.relative} value={percent(hormone.relativeResponse)} />
      </dl>
      <p className="mt-4 text-xs leading-relaxed text-foreground-muted">{d.fixedMeans.replace("{h}", number(coordination.hormoneTiming.signalMean)).replace("{s}", number(coordination.hormoneTiming.receptivityMean)).replace("{a}", number(coordination.hormoneTiming.signalAmplitude)).replace("{t}", number(coordination.hormoneTiming.periodHours))}</p>
    </div>
    <div className={box}>
      <h3 className="text-lg font-semibold">{d.recoveryTitle}</h3>
      <p className="mt-2 text-sm leading-relaxed text-foreground-muted">{d.recoveryText}</p>
      <ScenarioChoice label={d.recoveryLabel} options={d.recoveryOptions} selected={recoveryIndex} onSelect={setRecoveryIndex} />
      <CurvePlot xMax={recovery.points[recovery.points.length - 1].timeOverTau} yMax={12} xLabel={d.tau} yLabel={d.memory} title={`${d.recoveryTitle}: ${d.recoveryOptions[recoveryIndex]}`} series={[{ label: d.memory, color: "#a272c4", points: recovery.points.map((point) => ({ x: point.timeOverTau, y: point.level })) }]} />
      <dl aria-live="polite" className="grid gap-5 border-t border-card-border pt-4 sm:grid-cols-2">
        <Result label={d.steady} value={number(recovery.steadyPostPulse)} />
        <Result label={d.increment} value={number(coordination.recovery.pulseIncrement)} />
      </dl>
      <p className="mt-4 text-xs leading-relaxed text-foreground-muted">{d.recoveryNote}</p>
    </div>
    <div className={box}>
      <h3 className="text-lg font-semibold">{d.waitingTitle}</h3>
      <p className="mt-2 text-sm leading-relaxed text-foreground-muted">{d.waitingText}</p>
      <ScenarioChoice label={d.waitingLabel} options={d.waitingOptions} selected={waitingIndex} onSelect={setWaitingIndex} />
      <CurvePlot xMax={coordination.waiting.maxCycles} yMax={1} percentage xLabel={d.cycle} yLabel={d.conceived} title={`${d.waitingTitle}: ${d.waitingOptions[waitingIndex]}`} series={coordination.waiting.scenarios.map((scenario, index) => ({ label: d.waitingOptions[index], color: index === 0 ? "#3682cc" : "#c68124", dashed: index !== waitingIndex, points: scenario.cumulativeByCycle.map((point) => ({ x: point.cycle, y: point.probability })) }))} />
      <dl aria-live="polite" className="grid gap-5 border-t border-card-border pt-4 sm:grid-cols-3">
        <Result label={d.afterCycles.replace("{n}", String(finalWaiting.cycle))} value={percent(finalWaiting.probability)} />
        <Result label={d.stillWaiting.replace("{n}", String(finalWaiting.cycle))} value={percent(finalWaiting.remainingShare)} />
        <Result label={d.nextCycle} value={percent(finalWaiting.conditionalProbability)} />
      </dl>
      <p className="mt-4 text-xs leading-relaxed text-foreground-muted">{d.waitingNote}</p>
      <details className="mt-5 text-sm">
        <summary className="cursor-pointer text-accent">{d.table}</summary>
        <div className="mt-3 overflow-x-auto"><table className="w-full text-left text-xs">
          <caption className="mb-2 text-left text-foreground-muted">{d.waitingOptions[waitingIndex]}</caption>
          <thead><tr className="border-b border-card-border"><th scope="col" className="py-2 pr-3">{d.cycle}</th><th scope="col" className="py-2 pr-3">{d.conceived}</th><th scope="col" className="py-2">{d.nextCycle}</th></tr></thead>
          <tbody>{waiting.cumulativeByCycle.map((point) => <tr key={point.cycle} className="border-b border-card-border/50"><th scope="row" className="py-2 pr-3 font-normal">{point.cycle}</th><td className="py-2 pr-3 tabular-nums">{percent(point.probability)}</td><td className="py-2 tabular-nums">{percent(point.conditionalProbability)}</td></tr>)}</tbody>
        </table></div>
      </details>
    </div>
    <a href="/data/biological-coordination.json" download className="inline-block text-sm text-accent hover:underline">{d.download}</a>
  </section>;
}
