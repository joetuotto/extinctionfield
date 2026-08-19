"use client";

import { useMemo, useState } from "react";
import {
  causalNodeLabels,
  FIELDSTATE_EVIDENCE,
  type FieldStateDirectness,
} from "@/lib/fieldstateEvidence";

const DIRECTNESS: FieldStateDirectness[] = [
  "PHYSICS_SIGNATURE",
  "MECHANISTIC_INTERMEDIATE",
  "REPRODUCTIVE_ENDPOINT",
  "ECOLOGICAL_ENDPOINT",
  "SYSTEMATIC_REVIEW",
  "POPULATION_DESCRIPTIVE",
];

const LABELS = {
  en: {
    search: "Search citation, system, endpoint or node…",
    filter: "Evidence role",
    all: "All roles",
    result: (shown: number, total: number) => `${shown} / ${total} bounded records`,
    noResults: "No records match the current search.",
    clear: "Clear filters",
    roles: {
      PHYSICS_SIGNATURE: "Physics signature",
      MECHANISTIC_INTERMEDIATE: "Mechanistic intermediate",
      REPRODUCTIVE_ENDPOINT: "Reproductive endpoint",
      ECOLOGICAL_ENDPOINT: "Ecological endpoint",
      SYSTEMATIC_REVIEW: "Systematic review",
      POPULATION_DESCRIPTIVE: "Population descriptive",
    },
  },
  fi: {
    search: "Hae viitteellä, järjestelmällä, päätepisteellä tai solmulla…",
    filter: "Evidenssin rooli",
    all: "Kaikki roolit",
    result: (shown: number, total: number) => `${shown} / ${total} rajattua tietuetta`,
    noResults: "Hakua vastaavia tietueita ei löydy.",
    clear: "Tyhjennä suodattimet",
    roles: {
      PHYSICS_SIGNATURE: "Fysiikan allekirjoitus",
      MECHANISTIC_INTERMEDIATE: "Mekanistinen välivaihe",
      REPRODUCTIVE_ENDPOINT: "Lisääntymisen päätepiste",
      ECOLOGICAL_ENDPOINT: "Ekologinen päätepiste",
      SYSTEMATIC_REVIEW: "Systemaattinen katsaus",
      POPULATION_DESCRIPTIVE: "Väestötason kuvaileva",
    },
  },
} as const;

/** Searchable primary v2 register. It intentionally does not read legacy A–F data. */
export function ReferenceDatabase({ locale }: { locale: string }) {
  const d = locale === "fi" ? LABELS.fi : LABELS.en;
  const [search, setSearch] = useState("");
  const [role, setRole] = useState<"" | FieldStateDirectness>("");
  const result = useMemo(() => {
    const term = search.trim().toLowerCase();
    return FIELDSTATE_EVIDENCE.filter((record) => {
      if (role && record.directness !== role) return false;
      if (!term) return true;
      return [
        record.citation,
        record.studyType,
        record.system,
        record.fieldClass,
        record.finding,
        record.scope,
        ...record.causalNodes,
      ].join(" ").toLowerCase().includes(term);
    });
  }, [role, search]);
  const hasFilters = Boolean(search || role);

  return (
    <section>
      <div className="flex flex-col sm:flex-row gap-3 mb-5">
        <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder={d.search} className="min-w-0 flex-1 px-4 py-2.5 bg-card-bg border border-card-border rounded-lg text-sm text-foreground placeholder:text-foreground-muted focus:outline-none focus:border-accent" />
        <select value={role} onChange={(event) => setRole(event.target.value as "" | FieldStateDirectness)} className="px-3 py-2.5 bg-card-bg border border-card-border rounded-lg text-sm text-foreground-muted focus:outline-none focus:border-accent">
          <option value="">{d.filter}: {d.all}</option>
          {DIRECTNESS.map((value) => <option value={value} key={value}>{d.roles[value]}</option>)}
        </select>
      </div>
      <div className="flex items-center justify-between gap-3 mb-5 text-sm text-foreground-muted">
        <p>{d.result(result.length, FIELDSTATE_EVIDENCE.length)}</p>
        {hasFilters && <button type="button" onClick={() => { setSearch(""); setRole(""); }} className="text-accent hover:underline">{d.clear}</button>}
      </div>
      {!result.length ? <p className="border border-card-border rounded-lg p-6 text-sm text-foreground-muted">{d.noResults}</p> : (
        <div className="space-y-3">
          {result.map((record) => (
            <article key={record.id} className="border border-card-border bg-card-bg rounded-lg p-4">
              <div className="flex flex-wrap gap-x-3 gap-y-1 items-baseline justify-between">
                <h2 className="font-medium">{record.citation}</h2>
                <span className="font-mono-num text-xs text-foreground-muted">{record.year}</span>
              </div>
              <p className="mt-1 text-xs text-accent">{d.roles[record.directness]}</p>
              <p className="mt-3 text-sm leading-relaxed text-foreground-muted">{record.finding}</p>
              <p className="mt-3 text-xs leading-relaxed text-foreground-muted"><span className="font-medium text-foreground">{causalNodeLabels(record.causalNodes, locale === "fi" ? "fi" : "en").join(" · ")}</span> · {record.scope}</p>
              <a href={record.url} target="_blank" rel="noopener noreferrer" className="inline-block mt-3 text-xs text-accent hover:underline">DOI / source ↗</a>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
