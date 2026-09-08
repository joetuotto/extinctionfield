"use client";

import { useId, useState, type KeyboardEvent } from "react";
import Link from "next/link";
import { Search, ArrowRight, ChevronDown, ExternalLink } from "lucide-react";
import { pickCopy } from "@/lib/i18n";
import { technologyHistory, getLocalizedText, getTechnologyById, getTechnologyEvents, getHistorySources, queryTechnologies, queryHistoryEvents } from "@/lib/technology-history";
import { TechnologyAdoptionChart } from "@/components/TechnologyAdoptionChart";
import { technologyAdoption } from "@/lib/technology-adoption";

const COPY = {
  en: {
    title: "Explore the technological environment", intro: "Start with an environment, then open a technology to see its physical signature, regional history and sources.",
    catalogue: "Technologies", history: "Regional history", data: "Adoption data", sources: "Sources and coverage",
    all: "All environments", search: "Find a technology or historical event", searchHint: "For example: Linky, fence, radar…",
    region: "Region", everyRegion: "All regions", period: "Period", everyPeriod: "All periods", early: "Before 1900", industrial: "1900–1979", digital: "1980–1999", recent: "Since 2000",
    kind: "Event type", everyKind: "All types", launch: "First documented use", deployment: "Deployment", measurement: "Measurement / report", shutdown: "Shutdown", standard: "Standard / policy",
    physical: "What the source produces", relevance: "What it adds to BERM", seasonal: "Place, season and use", gap: "What the history still needs",
    anchors: "Documented history", noAnchors: "A family has been identified; a source-verified regional adoption event is still to be added.",
    reading: "Source scope", sourceLinks: "Sources", noSources: "Source integration for this family is still open.", linkedData: "Related data",
    count: "technology families", eventCount: "documented events", empty: "No matches for this combination.", reset: "Clear filters", more: "Show more events",
    historyIntro: "Each entry belongs to its stated place and event type. An introduction, a deployment interval, a reported measurement and a shutdown mean different things.",
    timelineNote: "The horizontal axis locates events in time. Bar length represents the documented interval, not field strength, adoption share or continuous operation.",
    sourceIntro: "Sources are attached to the claim they support. An operator's history documents its own network; a field measurement applies to its recorded devices and conditions.",
    coverage: "Coverage of this selection", noAnnual: "A dated event does not fill the years between observations. Device counts, subscribers, sales, installed stock and measured fields retain their own units and populations.",
    updated: "Reviewed", records: "source records", full: "Open the complete history and data", selected: "Selected environment", detail: "Technology details",
    sourceData: "Historical records (JSON)", observationsData: "Adoption observations (JSON)", sourceDownload: "Download the underlying records",
    existing: "Other datasets already in the model", gaps: "The next data links to complete", proxy: "Indirect indicator", measurementData: "Physical measurements", scenario: "Scenario estimates",
    browse: "Browse environment", moreTechnologies: "Show more technologies",
  },
  fi: {
    title: "Tutki teknologista ympäristöä", intro: "Aloita ympäristöstä ja avaa sitten teknologia: näet sen fysikaalisen luonteen, alueellisen historian ja lähteet.",
    catalogue: "Teknologiat", history: "Alueellinen historia", data: "Omaksumistiedot", sources: "Lähteet ja kattavuus",
    all: "Kaikki ympäristöt", search: "Hae teknologiaa tai historiallista tapahtumaa", searchHint: "Esimerkiksi Linky, aita, tutka…",
    region: "Alue", everyRegion: "Kaikki alueet", period: "Ajanjakso", everyPeriod: "Kaikki ajanjaksot", early: "Ennen vuotta 1900", industrial: "1900–1979", digital: "1980–1999", recent: "Vuodesta 2000",
    kind: "Tapahtumatyyppi", everyKind: "Kaikki tyypit", launch: "Dokumentoitu käyttöönotto", deployment: "Käyttöönotto-ohjelma", measurement: "Mittaus / raportti", shutdown: "Poistuminen", standard: "Standardi / sääntely",
    physical: "Millaisen lähteen tekniikka muodostaa", relevance: "Mitä se tuo BERM:iin", seasonal: "Paikka, vuodenaika ja käyttö", gap: "Mitä historiatietoihin vielä tarvitaan",
    anchors: "Dokumentoitu historia", noAnchors: "Lähdeperhe on tunnistettu; lähteellä varmennettu alueellinen omaksumistapahtuma odottaa täydentämistä.",
    reading: "Lähteen kattavuus", sourceLinks: "Lähteet", noSources: "Tämän lähdeperheen aineistojen liittäminen on vielä avoinna.", linkedData: "Liittyvät aineistot",
    count: "teknologiaperhettä", eventCount: "dokumentoitua tapahtumaa", empty: "Tällä rajauksella ei löytynyt tuloksia.", reset: "Tyhjennä rajaukset", more: "Näytä lisää tapahtumia",
    historyIntro: "Jokainen tapahtuma koskee nimettyä paikkaa ja tapahtumatyyppiä. Ensikäyttö, asennusohjelma, mittaustieto ja käytöstä poistuminen kertovat eri asioista.",
    timelineNote: "Vaaka-akseli paikantaa tapahtumat ajassa. Janan pituus kuvaa dokumentoitua ajanjaksoa, ei kentän voimakkuutta, omaksumisosuutta tai jatkuvaa käyttöä.",
    sourceIntro: "Lähteet on liitetty siihen tietoon, jota ne tukevat. Operaattorin historia kuvaa sen omaa verkkoa; kenttämittaus koskee siinä tutkittuja laitteita ja olosuhteita.",
    coverage: "Rajauksen kattavuus", noAnnual: "Vuosiluku ei täytä havaintojen välisiä vuosia. Laitemäärä, liittymät, myynti, käytössä oleva kanta ja kenttämittaus säilyttävät omat yksikkönsä ja perusjoukkonsa.",
    updated: "Tarkistettu", records: "lähdetietuetta", full: "Avaa koko historia ja aineistot", selected: "Valittu ympäristö", detail: "Teknologian tiedot",
    sourceData: "Historialliset tietueet (JSON)", observationsData: "Omaksumishavainnot (JSON)", sourceDownload: "Lataa taustalla olevat tietueet",
    existing: "Muut mallissa olevat aineistot", gaps: "Seuraavaksi täydennettävät aineistoyhteydet", proxy: "Välillinen indikaattori", measurementData: "Fysikaaliset mittaukset", scenario: "Skenaarioarviot",
    browse: "Tutki ympäristöä", moreTechnologies: "Näytä lisää teknologioita",
  },
};

const TABS = ["catalogue", "history", "data", "sources"] as const;
type Tab = typeof TABS[number];
const PERIODS: Record<string, [number | undefined, number | undefined]> = {
  all: [undefined, undefined], early: [undefined, 1899], industrial: [1900, 1979], digital: [1980, 1999], recent: [2000, undefined],
};
const inputClass = "rounded-lg border border-card-border bg-card-bg p-2.5 text-sm text-foreground w-full";

export function TechnologyHistoryExplorer({ locale, compact = false, initialTab = "catalogue" }: { locale: string; compact?: boolean; initialTab?: Tab }) {
  const d = pickCopy(COPY, locale);
  const id = useId();
  const [tab, setTab] = useState<Tab>(initialTab);
  const [group, setGroup] = useState("");
  const [search, setSearch] = useState("");
  const [region, setRegion] = useState("");
  const [period, setPeriod] = useState("all");
  const [kind, setKind] = useState("");
  const [limit, setLimit] = useState(12);
  const [technologyLimit, setTechnologyLimit] = useState(12);
  const text = (value: { en: string; fi: string }) => getLocalizedText(value, locale);
  const query = search.trim().toLocaleLowerCase(locale);
  const technologies = queryTechnologies({ group: group || undefined }).filter((tech) => {
    if (!query) return true;
    const events = getTechnologyEvents(tech.id);
    return [text(tech.name), text(tech.summary), text(tech.physicalProfile), ...events.map((event) => `${text(event.title)} ${text(event.description)} ${text(event.region.name)}`)].join(" ").toLocaleLowerCase(locale).includes(query);
  });
  const technologyIds = new Set(technologies.map((tech) => tech.id));
  const [fromYear, toYear] = PERIODS[period];
  const events = queryHistoryEvents({ group: group || undefined, regionId: region || undefined, fromYear, toYear })
    .filter((event) => {
      if (kind && event.kind !== kind) return false;
      if (!query) return true;
      const names = event.technologyIds.map((technologyId) => getTechnologyById(technologyId)).filter((technology) => technology !== undefined).map((technology) => text(technology.name));
      return [text(event.title), text(event.description), text(event.region.name), event.location ? text(event.location) : "", ...names].join(" ").toLocaleLowerCase(locale).includes(query);
    });
  const allRegions = [...new Map(technologyHistory.events.map((event) => [event.region.id, event.region])).values()].sort((a, b) => text(a.name).localeCompare(text(b.name), locale));
  const selectedSources = getHistorySources([...new Set([...technologies.flatMap((tech) => tech.sourceIds), ...events.flatMap((event) => event.sourceIds)])]);
  const showOverview = !group && !query;
  const displayedTechnologies = technologies.slice(0, compact ? 4 : technologyLimit);
  const reset = () => { setGroup(""); setSearch(""); setRegion(""); setPeriod("all"); setKind(""); setLimit(12); };

  function moveTab(event: KeyboardEvent<HTMLButtonElement>, current: number) {
    let next = current;
    if (event.key === "ArrowRight") next = (current + 1) % TABS.length;
    else if (event.key === "ArrowLeft") next = (current + TABS.length - 1) % TABS.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = TABS.length - 1;
    else return;
    event.preventDefault();
    setTab(TABS[next]);
    document.getElementById(`${id}-tab-${TABS[next]}`)?.focus();
  }

  return <div className="space-y-6" data-testid="technology-history-explorer">
    {!compact && <div role="tablist" aria-label={d.title} className="flex flex-wrap gap-1 border-b border-card-border pb-2">
      {TABS.map((key, index) => <button key={key} id={`${id}-tab-${key}`} role="tab" type="button" aria-selected={tab === key}
        aria-controls={`${id}-panel-${key}`} tabIndex={tab === key ? 0 : -1} onKeyDown={(event) => moveTab(event, index)} onClick={() => setTab(key)}
        className={`rounded-lg px-3 py-2.5 sm:px-4 text-sm font-medium transition-colors ${tab === key ? "bg-accent/10 text-accent" : "text-foreground-muted hover:bg-background-secondary"}`}>{d[key]}</button>)}
    </div>}

    {(compact || tab !== "data") && <div className="space-y-4">
      <div className="flex flex-wrap gap-2" aria-label={d.selected}>
        {[{ id: "", name: { en: COPY.en.all, fi: COPY.fi.all } }, ...technologyHistory.groups].map((item) => <button key={item.id} type="button"
          aria-pressed={group === item.id} onClick={() => { setGroup(item.id); setLimit(12); setTechnologyLimit(12); }}
          className={`rounded-full border px-3 py-2 text-xs font-medium ${group === item.id ? "border-accent bg-accent/10 text-accent" : "border-card-border text-foreground-muted hover:text-foreground"}`}>{text(item.name)}</button>)}
      </div>
      {!compact && <label className="block text-xs font-medium" htmlFor={`${id}-search`}>
        {d.search}<span className="relative block mt-2"><Search aria-hidden="true" className="absolute left-3 top-3 text-foreground-muted" size={16} />
          <input id={`${id}-search`} type="search" className={`${inputClass} pl-9`} placeholder={d.searchHint} value={search} onChange={(event) => { setSearch(event.target.value); setLimit(12); setTechnologyLimit(12); }} />
        </span>
      </label>}
    </div>}

    {!compact && TABS.filter((key) => key !== tab).map((key) => <div key={key} id={`${id}-panel-${key}`} role="tabpanel" aria-labelledby={`${id}-tab-${key}`} hidden />)}
    <div id={`${id}-panel-${compact ? initialTab : tab}`} role={compact ? undefined : "tabpanel"} aria-labelledby={compact ? undefined : `${id}-tab-${tab}`}>
      {(compact || tab === "catalogue") && <div>
        <div className="flex flex-wrap items-baseline justify-between gap-2 mb-4">
          <p className="text-xs text-foreground-muted" role="status">{technologies.length} {d.count}</p>
          {!compact && <p className="text-xs text-foreground-muted">{d.updated}: {technologyHistory.updatedAt}</p>}
        </div>
        {showOverview ? <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">{technologyHistory.groups.map((item) => <button key={item.id} type="button" onClick={() => setGroup(item.id)} aria-label={`${d.browse}: ${text(item.name)}`} className="rounded-xl border border-card-border bg-card-bg p-5 text-left hover:border-accent/60 transition-colors">
          <span className="flex items-center justify-between gap-2"><span className="text-sm font-semibold">{text(item.name)}</span><ArrowRight size={15} className="text-accent shrink-0" aria-hidden="true" /></span>
          <span className="block text-xs leading-relaxed text-foreground-muted mt-2">{text(item.summary)}</span>
          <span className="block text-xs text-accent mt-4">{technologyHistory.technologies.filter((tech) => tech.group === item.id).length} {d.count}</span>
        </button>)}</div> : <div className="divide-y divide-card-border border-y border-card-border">
          {displayedTechnologies.map((tech) => <details key={tech.id} className="group py-1" name={`${id}-technology`}>
            <summary className="cursor-pointer list-none flex items-start gap-3 py-4">
              <ChevronDown size={17} className="shrink-0 mt-1 text-accent transition-transform group-open:rotate-180" aria-hidden="true" />
              <span className="min-w-0"><span className="block font-semibold text-sm">{text(tech.name)}</span>
                <span className="block mt-1 text-sm text-foreground-muted leading-relaxed">{text(tech.summary)}</span></span>
            </summary>
            <div className="pb-6 pl-0 sm:pl-7 space-y-5">
              <dl className="grid md:grid-cols-2 gap-x-7 gap-y-5 text-sm">
                {[[d.physical, tech.physicalProfile], [d.seasonal, tech.seasonality], [d.relevance, tech.bermRelevance], [d.gap, tech.historyGap]].map(([label, value]) => <div key={label as string}>
                  <dt className="font-medium mb-1">{label as string}</dt><dd className="text-foreground-muted leading-relaxed">{text(value as { en: string; fi: string })}</dd>
                </div>)}
              </dl>
              <div className="border-l-2 border-accent/30 pl-4">
                <h4 className="text-xs font-semibold mb-2">{d.anchors}</h4>
                {getTechnologyEvents(tech.id).length === 0 ? <p className="text-xs text-foreground-muted">{d.noAnchors}</p> : <ul className="space-y-3">
                  {getTechnologyEvents(tech.id).map((event) => <li key={event.id} className="text-xs leading-relaxed">
                    <p><span className="tabular-nums font-semibold">{event.startYear}{event.endYear && event.endYear !== event.startYear ? `–${event.endYear}` : ""}</span> · {text(event.region.name)} · {d[event.kind]}</p>
                    <p className="mt-1 text-foreground-muted">{text(event.description)}</p>
                    <HistorySources sourceIds={event.sourceIds} locale={locale} />
                  </li>)}
                </ul>}
              </div>
              {(tech.dataLinks?.length ?? 0) > 0 && <div><h4 className="text-xs font-semibold mb-2">{d.linkedData}</h4><ul className="text-xs space-y-2">{tech.dataLinks!.map((link) => <li key={link.id}><a href={link.url} className="text-accent hover:underline">{text(link.label)}</a><p className="text-foreground-muted mt-1">{text(link.scope)}</p></li>)}</ul></div>}
              {tech.sourceIds.length > 0 && <div><h4 className="text-xs font-semibold">{d.sourceLinks}</h4><HistorySources sourceIds={tech.sourceIds} locale={locale} /></div>}
            </div>
          </details>)}
        </div>}
        {!compact && !showOverview && technologies.length > technologyLimit && <button type="button" className="mt-4 rounded-lg border border-card-border px-4 py-2 text-sm" onClick={() => setTechnologyLimit(technologyLimit + 12)}>{d.moreTechnologies} ({technologies.length - technologyLimit})</button>}
        {technologies.length === 0 && <EmptyState message={d.empty} reset={d.reset} onReset={reset} />}
        {compact && <Link href={`/${locale}/evidence/technology#explorer`} className="inline-flex items-center gap-2 mt-5 text-sm text-accent hover:underline">{d.full}<ArrowRight size={15} /></Link>}
      </div>}

      {!compact && tab === "history" && <div className="space-y-5">
        <p className="text-sm text-foreground-muted leading-relaxed max-w-3xl">{d.historyIntro}</p>
        <div className="grid gap-3 sm:grid-cols-3">
          <label className="text-xs font-medium">{d.region}<select className={`${inputClass} mt-2`} value={region} onChange={(event) => { setRegion(event.target.value); setLimit(12); }}><option value="">{d.everyRegion}</option>{allRegions.map((item) => <option key={item.id} value={item.id}>{text(item.name)}</option>)}</select></label>
          <label className="text-xs font-medium">{d.period}<select className={`${inputClass} mt-2`} value={period} onChange={(event) => { setPeriod(event.target.value); setLimit(12); }}><option value="all">{d.everyPeriod}</option>{["early", "industrial", "digital", "recent"].map((key) => <option key={key} value={key}>{d[key as keyof typeof d]}</option>)}</select></label>
          <label className="text-xs font-medium">{d.kind}<select className={`${inputClass} mt-2`} value={kind} onChange={(event) => { setKind(event.target.value); setLimit(12); }}><option value="">{d.everyKind}</option>{["launch", "deployment", "measurement", "shutdown", "standard"].map((key) => <option key={key} value={key}>{d[key as keyof typeof d]}</option>)}</select></label>
        </div>
        <p className="text-xs text-foreground-muted" role="status">{events.length} {d.eventCount}</p>
        {events.length > 0 ? <>
          <HistoryTimeline events={events.slice(0, limit)} domainEvents={events} locale={locale} />
          {events.length > limit && <button type="button" onClick={() => setLimit(limit + 12)} className="rounded-lg border border-card-border px-4 py-2 text-sm hover:border-accent">{d.more} ({events.length - limit})</button>}
        </> : <EmptyState message={d.empty} reset={d.reset} onReset={reset} />}
      </div>}

      {!compact && tab === "data" && <TechnologyAdoptionChart locale={locale} />}

      {!compact && tab === "sources" && <div className="space-y-5">
        <p className="text-sm text-foreground-muted leading-relaxed max-w-3xl">{d.sourceIntro}</p>
        <div className="rounded-xl border border-card-border bg-card-bg p-5">
          <h3 className="text-sm font-semibold">{d.coverage}</h3>
          <p className="mt-2 text-sm">{technologies.length} {d.count} · {selectedSources.length} {d.records}</p>
          <p className="text-xs leading-relaxed text-foreground-muted mt-3">{d.noAnnual}</p>
        </div>
        <div className="text-xs space-y-2"><p className="font-medium">{d.sourceDownload}</p><a href="/api/technology-history" download className="text-accent hover:underline mr-4">{d.sourceData}</a><a href="/data/technology-adoption.json" download className="text-accent hover:underline">{d.observationsData}</a></div>
        <details className="rounded-xl border border-card-border p-4"><summary className="cursor-pointer font-medium text-sm">{d.existing}</summary><ul className="space-y-4 mt-4">{technologyAdoption.existingDatasets.map((dataset) => <li key={dataset.id} className="text-xs leading-relaxed"><a href={dataset.url} className="font-medium text-accent hover:underline">{text(dataset.label)}</a><span className="block mt-1">{dataset.kind === "measurement" ? d.measurementData : d[dataset.kind]}</span><p className="mt-1 text-foreground-muted">{text(dataset.scope)}</p></li>)}</ul></details>
        <details className="rounded-xl border border-card-border p-4"><summary className="cursor-pointer font-medium text-sm">{d.gaps}</summary><ul className="space-y-4 mt-4">{technologyAdoption.dataGaps.filter((gap) => technologyIds.has(gap.technologyId)).map((gap) => <li key={gap.id} className="text-xs leading-relaxed"><p className="font-medium">{text(gap.label)}</p><p className="mt-1 text-foreground-muted">{text(gap.needed)}</p></li>)}</ul></details>
        <ul className="divide-y divide-card-border">{selectedSources.map((source) => <li key={source.id} className="py-4 text-sm">
          <a href={source.url} target="_blank" rel="noreferrer" className="font-medium text-accent hover:underline">{source.title}<ExternalLink className="inline ml-1" size={12} aria-hidden="true" /></a>
          <p className="text-xs text-foreground-muted mt-1">{source.publisher} · {d.updated}: {source.accessed}</p>
          <p className="text-xs text-foreground-muted mt-2 leading-relaxed">{text(source.scope)}</p>
        </li>)}</ul>
        {selectedSources.length === 0 && <p className="text-sm text-foreground-muted">{d.noSources}</p>}
      </div>}
    </div>
  </div>;
}

function EmptyState({ message, reset, onReset }: { message: string; reset: string; onReset: () => void }) {
  return <div className="rounded-xl border border-card-border p-6 text-sm"><p>{message}</p><button type="button" className="mt-3 text-accent hover:underline" onClick={onReset}>{reset}</button></div>;
}

function HistorySources({ sourceIds, locale }: { sourceIds: string[]; locale: string }) {
  return <p className="mt-2 text-xs leading-relaxed">{getHistorySources(sourceIds).map((source, i) => <span key={source.id}>
    {i > 0 ? " · " : ""}<a href={source.url} target="_blank" rel="noreferrer" title={getLocalizedText(source.scope, locale)} className="text-accent hover:underline">{source.publisher}: {source.title}</a>
  </span>)}</p>;
}

function HistoryTimeline({ events, domainEvents, locale }: { events: typeof technologyHistory.events; domainEvents: typeof technologyHistory.events; locale: string }) {
  const d = pickCopy(COPY, locale);
  const start = Math.min(...domainEvents.map((event) => event.startYear));
  const end = Math.max(start + 1, ...domainEvents.map((event) => event.endYear ?? event.startYear));
  const x = (year: number) => (year - start) / (end - start) * 100;
  return <div>
    <figure className="rounded-xl border border-card-border bg-card-bg p-4 mb-5">
      <figcaption className="text-xs leading-relaxed text-foreground-muted">{d.timelineNote}</figcaption>
    </figure>
    <div className="sm:ml-[8.25rem] px-4 mb-4" aria-hidden="true"><div className="relative h-7 border-t border-card-border">
      {[start, Math.round((start + end) / 2), end].filter((value, i, all) => all.indexOf(value) === i).map((year) => <span key={year} className="absolute top-1 -translate-x-1/2 text-xs tabular-nums text-foreground-muted" style={{ left: `${x(year)}%` }}>{year}</span>)}
    </div></div>
    <ol className="divide-y divide-card-border">{events.map((event) => <li key={event.id} className="py-5 first:pt-0">
      <div className="grid sm:grid-cols-[7rem_1fr] gap-2 sm:gap-5">
        <div><p className="tabular-nums text-lg font-semibold">{event.startYear}{event.endYear && event.endYear !== event.startYear ? `–${event.endYear}` : ""}</p><p className="text-xs text-accent mt-1">{d[event.kind]}</p></div>
        <div>
          <h3 className="text-sm font-semibold">{getLocalizedText(event.title, locale)}</h3>
          <p className="text-xs text-foreground-muted mt-1">{getLocalizedText(event.region.name, locale)}{event.location ? ` · ${getLocalizedText(event.location, locale)}` : ""}</p>
          <div className="px-4 my-3" aria-hidden="true"><div className="relative h-2 border-t border-card-border">
            {event.endYear !== undefined && event.endYear > event.startYear && <span className="absolute -top-px h-0.5 bg-accent" style={{ left: `${x(event.startYear)}%`, width: `${x(event.endYear) - x(event.startYear)}%` }} />}
            <span className={`absolute -top-1 h-2 w-2 -translate-x-1/2 rounded-full ${event.kind === "shutdown" ? "bg-foreground-muted" : "bg-accent"}`} style={{ left: `${x(event.startYear)}%` }} />
            {event.endYear !== undefined && event.endYear > event.startYear && <span className="absolute -top-1 h-2 w-2 -translate-x-1/2 rounded-full bg-accent" style={{ left: `${x(event.endYear)}%` }} />}
          </div></div>
          <p className="text-sm text-foreground-muted leading-relaxed">{getLocalizedText(event.description, locale)}</p>
          <HistorySources sourceIds={event.sourceIds} locale={locale} />
        </div>
      </div>
    </li>)}</ol>
  </div>;
}
