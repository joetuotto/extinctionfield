"use client";

import { useId, useState } from "react";
import { pickCopy } from "@/lib/i18n";
import {
  adoptionValue, annualAdoptionSegments, canShowAdoptionShare,
  technologyAdoption, type AdoptionSeries,
} from "@/lib/technology-adoption";
import { getLocalizedText } from "@/lib/technology-history";

const COPY = {
  en: {
    title: "Reported adoption and installed stock", select: "Choose a data series", count: "Reported quantity", share: "Share of all meters",
    intro: "Compare the history of one defined quantity at a time. The points show source reports; each series retains its own area, unit and population.",
    countNote: "These are technology statistics. Local field strength and biological response require the source's operating state, position and receiver.",
    annual: "Lines join consecutive annual reports only. Gaps remain unconnected.", sparse: "Only reported points are shown. No adoption curve is inferred between them.",
    table: "Read the values and their sources", year: "Year / reporting date", value: "Reported value", denominator: "Denominator", source: "Source",
    missing: "Not reported", estimated: "Reported estimate", counted: "Reported count", population: "Coverage", limits: "How to read this series",
    meters: "million meters", devices: "million devices", percent: "%", download: "Download data and provenance (JSON)",
    rawMeters: "meters", rawDevices: "devices",
  },
  fi: {
    title: "Raportoitu käyttöönotto ja laitekanta", select: "Valitse aikasarja", count: "Raportoitu määrä", share: "Osuus kaikista mittareista",
    intro: "Tarkastele yhden määritellyn suureen historiaa kerrallaan. Pisteet ovat lähteiden raportoimia tietoja; jokaisella sarjalla on oma alue, yksikkö ja perusjoukko.",
    countNote: "Nämä ovat teknologiatilastoja. Paikallinen kenttä ja biologinen vaste tarvitsevat lisäksi lähteen käyttötilan, sijainnin ja vastaanottimen.",
    annual: "Viivat yhdistävät vain peräkkäisten vuosien raportit. Aineiston aukot jäävät näkyviin.", sparse: "Kuvassa ovat vain raportoidut pisteet. Niiden välille ei oleteta omaksumiskäyrää.",
    table: "Katso luvut ja niiden lähteet", year: "Vuosi / raportointiajankohta", value: "Raportoitu arvo", denominator: "Nimittäjä", source: "Lähde",
    missing: "Ei raportoitu", estimated: "Raportoitu arvio", counted: "Raportoitu määrä", population: "Kattavuus", limits: "Sarjan tulkinta",
    meters: "miljoonaa mittaria", devices: "miljoonaa laitetta", percent: "%", download: "Lataa aineisto ja lähdetiedot (JSON)",
    rawMeters: "mittaria", rawDevices: "laitetta",
  },
};

export function TechnologyAdoptionChart({ locale }: { locale: string }) {
  const d = pickCopy(COPY, locale);
  const [selectedId, setSelectedId] = useState(technologyAdoption.series[0].id);
  const [share, setShare] = useState(false);
  const series = technologyAdoption.series.find((s) => s.id === selectedId)!;
  return <section aria-label={d.title} className="space-y-5">
    <p className="text-sm text-foreground-muted leading-relaxed max-w-3xl">{d.intro}</p>
    <label className="block text-sm font-medium">
      {d.select}
      <select className="mt-2 block w-full rounded-lg border border-card-border bg-card-bg p-3 text-foreground" value={selectedId}
        onChange={(event) => { setSelectedId(event.target.value); setShare(false); }}>
        {technologyAdoption.series.map((s) => <option key={s.id} value={s.id}>{getLocalizedText(s.label, locale)}</option>)}
      </select>
    </label>
    {canShowAdoptionShare(series) && <div className="flex flex-wrap gap-2" aria-label={d.value}>
      {[false, true].map((value) => <button key={String(value)} type="button" aria-pressed={share === value}
        onClick={() => setShare(value)} className={`rounded-full border px-4 py-2 text-xs ${share === value ? "border-accent bg-accent/10 text-accent" : "border-card-border"}`}>
        {value ? d.share : d.count}
      </button>)}
    </div>}
    <AdoptionFigure series={series} share={share && canShowAdoptionShare(series)} locale={locale} />
    <div className="border-l-2 border-accent/50 pl-4 text-sm leading-relaxed">
      <p className="font-medium">{d.population}: {getLocalizedText(series.geography.name, locale)}</p>
      <p className="text-foreground-muted mt-1">{getLocalizedText(series.coverage, locale)}</p>
    </div>
    <details className="rounded-xl border border-card-border p-4">
      <summary className="cursor-pointer font-medium text-sm">{d.table}</summary>
      <div className="overflow-x-auto mt-4">
        <table className="w-full text-left text-xs">
          <caption className="sr-only">{getLocalizedText(series.label, locale)}</caption>
          <thead><tr>{[d.year, `${d.value} (${series.unit === "percent" ? "%" : series.unit === "meters" ? d.rawMeters : d.rawDevices})`, ...(share ? [`${d.share} (%)`] : []), d.denominator, d.source].map((h) => <th key={h} scope="col" className="p-2 border-b border-card-border">{h}</th>)}</tr></thead>
          <tbody>{series.points.map((point) => {
            const source = technologyAdoption.sources.find((s) => s.id === point.sourceId)!;
            return <tr key={`${point.year}-${point.asOf}`}>
              <th scope="row" className="p-2 align-top whitespace-nowrap">{point.asOf ?? point.year}</th>
              <td className="p-2 align-top tabular-nums">{new Intl.NumberFormat(locale).format(point.value)}{series.unit === "percent" ? " %" : ""}
                <span className="block text-foreground-muted">{point.observationType === "reported_estimate" ? d.estimated : d.counted}</span></td>
              {share && <td className="p-2 align-top tabular-nums">{new Intl.NumberFormat(locale, { maximumFractionDigits: 2 }).format(adoptionValue(point, true))} %</td>}
              <td className="p-2 align-top">{point.denominator ? <>{new Intl.NumberFormat(locale).format(point.denominator.value)}<span className="block text-foreground-muted">{getLocalizedText(point.denominator.population, locale)}</span></> : d.missing}</td>
              <td className="p-2 align-top min-w-44"><a href={source.url} target="_blank" rel="noreferrer" className="text-accent underline decoration-accent/30 underline-offset-2">{source.title}</a><span className="block mt-1 text-foreground-muted">{point.sourceLocator}</span></td>
            </tr>;
          })}</tbody>
        </table>
      </div>
    </details>
    <div className="text-xs text-foreground-muted leading-relaxed space-y-2">
      <p className="font-semibold text-foreground">{d.limits}</p>
      {series.limitations.map((item) => <p key={item.en}>{getLocalizedText(item, locale)}</p>)}
      <p>{d.countNote}</p>
      <a href="/data/technology-adoption.json" download className="inline-block text-accent hover:underline">{d.download}</a>
    </div>
  </section>;
}

function AdoptionFigure({ series, share, locale }: { series: AdoptionSeries; share: boolean; locale: string }) {
  const d = pickCopy(COPY, locale);
  const id = useId();
  const points = [...series.points].sort((a, b) => a.year - b.year);
  const percent = share || series.unit === "percent";
  const divisor = percent ? 1 : 1_000_000;
  const values = points.map((p) => adoptionValue(p, share) / divisor);
  const max = percent ? 100 : Math.max(1, Math.ceil(Math.max(...values) / 5) * 5);
  const first = points[0].year;
  const last = points[points.length - 1].year;
  const minYear = first === last ? first - 1 : first;
  const maxYear = first === last ? last + 1 : last;
  const x = (year: number) => 70 + (year - minYear) / (maxYear - minYear) * 620;
  const y = (value: number) => 245 - value / max * 195;
  const nf = new Intl.NumberFormat(locale, { maximumFractionDigits: 2 });
  const unit = percent ? d.percent : d[series.unit];
  // Keep SVG metadata as single strings so SSR and browser-parsed text nodes agree.
  const accessibleTitle = `${getLocalizedText(series.label, locale)} (${unit})`;
  const accessibleDescription = `${points.map((p, i) => `${p.year}: ${nf.format(values[i])} ${unit}`).join("; ")}. ${series.frequency === "annual" ? d.annual : d.sparse}`;
  const sources = technologyAdoption.sources.filter((s) => points.some((p) => p.sourceId === s.id));
  const years = [...new Set(points.map((p) => p.year))];
  return <figure className="rounded-xl border border-card-border bg-card-bg p-3 sm:p-5">
    <div className="flex flex-wrap items-baseline justify-between gap-2 mb-2">
      <h3 className="font-semibold text-sm">{getLocalizedText(series.label, locale)}</h3>
      <span className="text-xs text-foreground-muted">{unit}</span>
    </div>
    <div className="overflow-x-auto">
      <svg viewBox="0 0 730 290" className="w-full" role="img" aria-labelledby={`${id}-title ${id}-desc`}>
        <title id={`${id}-title`}>{accessibleTitle}</title>
        <desc id={`${id}-desc`}>{accessibleDescription}</desc>
        {[0, 1, 2, 3, 4].map((i) => <g key={i}>
          <line x1="70" x2="690" y1={y(max * i / 4)} y2={y(max * i / 4)} stroke="var(--chart-grid)" />
          <text x="59" y={y(max * i / 4) + 4} textAnchor="end" fill="var(--foreground-muted)" className="text-[22px] sm:text-[11px]">{nf.format(max * i / 4)}</text>
        </g>)}
        {annualAdoptionSegments(series).map(([a, b]) => <line key={a.year} x1={x(a.year)} x2={x(b.year)}
          y1={y(adoptionValue(a, share) / divisor)} y2={y(adoptionValue(b, share) / divisor)} stroke="var(--chart-series-1)" strokeWidth="2" />)}
        {points.map((p, i) => <g key={`${p.year}-${p.asOf}`}>
          <circle cx={x(p.year)} cy={y(values[i])} r="5.5" fill="var(--chart-series-1)"><title>{`${p.asOf ?? p.year}: ${nf.format(values[i])} ${unit}`}</title></circle>
          {(points.length <= 3 || i === 0 || i === points.length - 1) && <text x={x(p.year)} y={y(values[i]) - 16} textAnchor="middle" className="text-[23px] sm:text-[12px]" fontWeight="600" fill="var(--foreground)">{nf.format(values[i])}</text>}
        </g>)}
        {years.filter((_, i) => years.length < 7 || i % 3 === 0 || i === years.length - 1).map((year) => <text key={year} x={x(year)} y="274" textAnchor="middle" className="text-[22px] sm:text-[11px]" fill="var(--foreground-muted)">{year}</text>)}
      </svg>
    </div>
    <figcaption className="mt-2 text-xs text-foreground-muted leading-relaxed">
      <p>{series.frequency === "annual" ? d.annual : d.sparse}</p>
      <p className="mt-2">{d.source}: {sources.map((s, i) => <span key={s.id}>{i > 0 ? "; " : ""}<a href={s.url} target="_blank" rel="noreferrer" className="text-accent hover:underline">{s.title}</a></span>)}</p>
    </figcaption>
  </figure>;
}
