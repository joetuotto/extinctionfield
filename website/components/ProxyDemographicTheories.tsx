"use client";

import { useId, useState } from "react";
import { InlineReferenceText } from "@/components/InlineReferenceText";
import { pickCopy } from "@/lib/i18n";
import { DEMOGRAPHIC_GROUPS, DEMOGRAPHIC_THEORIES, type DemographicGroupId } from "@/lib/proxyDemographyData";

const COPY = {
  en: {
    title: "23 explanations, four places in the chain",
    intro: "Choose a group, then open an explanation. The groups identify its main role; a factor can participate in several pathways.",
    observation: "What the explanation captures",
    derivation: "What BERM derives",
    evidence: "Connection to the evidence",
    link: "See this part of the causal chain",
    count: "explanations",
  },
  fi: {
    title: "23 selitystä, neljä paikkaa ketjussa",
    intro: "Valitse ryhmä ja avaa selitys. Ryhmät osoittavat pääroolin; sama tekijä voi osallistua useaan vaikutusreittiin.",
    observation: "Mitä selitys tavoittaa?",
    derivation: "Mitä BERM johtaa?",
    evidence: "Yhteys tutkimusnäyttöön",
    link: "Katso tämä osa vaikutusketjua",
    count: "selitystä",
  },
};

export function ProxyDemographicTheories({ locale }: { locale: string }) {
  const c = pickCopy(COPY, locale);
  const id = useId();
  const [selected, setSelected] = useState<DemographicGroupId>("infrastructure");
  const [opened, setOpened] = useState<string | null>("demographic-transition");
  const activeGroup = DEMOGRAPHIC_GROUPS.find((group) => group.id === selected)!;
  const groupCopy = pickCopy({ en: activeGroup.en, fi: activeGroup.fi }, locale);
  return <div className="min-w-0 space-y-5 border-t border-card-border pt-7">
    <h3 id={`${id}-title`} className="font-serif text-2xl">{c.title}</h3>
    <p className="leading-relaxed text-foreground-muted">{c.intro}</p>
    <div role="group" aria-labelledby={`${id}-title`} className="grid grid-cols-1 gap-2 sm:grid-cols-2">
      {DEMOGRAPHIC_GROUPS.map((group, index) => {
        const text = pickCopy({ en: group.en, fi: group.fi }, locale);
        const count = DEMOGRAPHIC_THEORIES.filter((item) => item.group === group.id).length;
        return <button key={group.id} type="button" aria-pressed={selected === group.id} aria-controls={`${id}-${group.id}`} onClick={() => {
          setSelected(group.id);
          setOpened(DEMOGRAPHIC_THEORIES.find((item) => item.group === group.id)!.id);
        }} className={`min-h-16 rounded-lg border px-4 py-3 text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${selected === group.id ? "border-accent bg-accent/10" : "border-card-border hover:border-accent/60"}`}>
          <span className="mb-1 block text-xs text-accent">{String(index + 1).padStart(2, "0")} · {count} {c.count}</span>
          <span className="block text-sm font-semibold">{text.title}</span>
        </button>;
      })}
    </div>
    <p aria-live="polite" aria-atomic="true" className="text-sm font-semibold text-accent">{groupCopy.question}</p>
    {DEMOGRAPHIC_GROUPS.map((group) => <div key={group.id} id={`${id}-${group.id}`} hidden={selected !== group.id}>
      <div className="divide-y divide-card-border rounded-lg border border-card-border px-4 sm:px-5">
        {DEMOGRAPHIC_THEORIES.filter((item) => item.group === group.id).map((item) => {
          const text = pickCopy({ en: item.en, fi: item.fi }, locale);
          const expanded = opened === item.id;
          return <div key={item.id}>
            <h4><button id={`${id}-${item.id}-label`} type="button" aria-expanded={expanded} aria-controls={`${id}-${item.id}-body`} onClick={() => setOpened(expanded ? null : item.id)} className="flex min-h-14 w-full items-center justify-between gap-4 py-4 text-left text-base font-semibold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent">
              <span>{text.title}</span><span aria-hidden="true" className="shrink-0 text-xl font-normal text-accent">{expanded ? "−" : "+"}</span>
            </button></h4>
            <div id={`${id}-${item.id}-body`} role="region" aria-labelledby={`${id}-${item.id}-label`} hidden={!expanded} className="pb-5">
              <dl className="space-y-4">
                {[[c.observation, text.observation], [c.derivation, text.derivation], [c.evidence, text.evidence]].map(([label, body]) => <div key={label} className="space-y-1.5">
                  <dt className="text-xs font-semibold text-accent">{label}</dt>
                  <dd className="text-sm leading-relaxed text-foreground-muted"><InlineReferenceText text={body} locale={locale} /></dd>
                </div>)}
              </dl>
              <a href={`#${item.anchor}`} className="mt-4 inline-block text-sm text-accent underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent">{c.link}</a>
            </div>
          </div>;
        })}
      </div>
    </div>)}
  </div>;
}
