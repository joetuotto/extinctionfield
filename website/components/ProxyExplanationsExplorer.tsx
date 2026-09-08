"use client";

import { useId, useState } from "react";
import { InlineReferenceText } from "@/components/InlineReferenceText";
import { pickCopy } from "@/lib/i18n";
import { PROXY_EXPLANATIONS } from "@/lib/proxyExplanationsData";

const COPY = {
  en: {
    select: "Explore an explanatory variable",
    hint: "Select a variable to see why it can track the changing field environment, what it may conceal, and what BERM adds to the explanation.",
    correlation: "Why can they change together?",
    masking: "What can remain hidden?",
    contribution: "What does the BERM explanation add?",
    evidence: "Connection to the evidence",
    scope: "The relationships below describe proposed causal roles. They are not a claim that every variable has a measured correlation with EMF, or that their independent effects disappear.",
  },
  fi: {
    select: "Tutki proxiselittäjää",
    hint: "Valitse selittäjä: näet, miksi se voi seurata kenttäympäristön muutosta, mitä sen taakse voi jäädä ja mitä BERM lisää selitykseen.",
    correlation: "Miksi ne voivat muuttua yhdessä?",
    masking: "Mikä voi jäädä piiloon?",
    contribution: "Mitä BERM lisää selitykseen?",
    evidence: "Yhteys tutkimusnäyttöön",
    scope: "Alla kuvataan muuttujien ehdotettuja kausaalisia rooleja. Kaikille ei oleteta mitattua EMF-korrelaatiota, eivätkä muuttujien omat vaikutukset katoa.",
  },
};

export function ProxyExplanationsExplorer({ locale }: { locale: string }) {
  const c = pickCopy(COPY, locale);
  const [selected, setSelected] = useState(PROXY_EXPLANATIONS[0].id);
  const id = useId();
  const active = PROXY_EXPLANATIONS.find((item) => item.id === selected) ?? PROXY_EXPLANATIONS[0];
  const entry = pickCopy({ en: active.en, fi: active.fi }, locale);
  const rows = [
    [c.correlation, entry.correlation],
    [c.masking, entry.masking],
    [c.contribution, entry.contribution],
  ];

  return (
    <div className="min-w-0 space-y-5">
      <div className="space-y-2">
        <h3 id={`${id}-title`} className="font-serif text-2xl">{c.select}</h3>
        <p className="text-base leading-relaxed text-foreground-muted">{c.hint}</p>
      </div>
      <div role="group" aria-labelledby={`${id}-title`} className="grid grid-cols-1 gap-2 min-[360px]:grid-cols-2">
        {PROXY_EXPLANATIONS.map((item, index) => {
          const text = pickCopy({ en: item.en, fi: item.fi }, locale);
          const chosen = selected === item.id;
          return <button key={item.id} type="button" aria-pressed={chosen} aria-controls={`${id}-detail`} onClick={() => setSelected(item.id)}
            className={`flex min-h-12 items-start gap-3 rounded-lg border p-3 text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${chosen ? "border-accent bg-accent/10 text-accent" : "border-card-border bg-background hover:border-accent/60"}`}>
            <span aria-hidden="true" className="pt-0.5 font-mono text-xs text-foreground-muted">{String(index + 1).padStart(2, "0")}</span>
            <span className="text-sm font-semibold leading-snug">{text.label}</span>
          </button>;
        })}
      </div>
      <div id={`${id}-detail`} className="rounded-xl border border-accent/30 bg-[var(--figure-bg)] p-4 sm:p-6">
        <div aria-live="polite" aria-atomic="true" className="space-y-2 border-b border-card-border pb-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-accent">{entry.role}</p>
          <h4 className="font-serif text-xl leading-snug sm:text-2xl">{entry.label}</h4>
        </div>
        <dl className="divide-y divide-card-border">
          {rows.map(([title, text]) => <div key={title} className="space-y-2 py-5">
            <dt className="text-sm font-semibold">{title}</dt>
            <dd className="text-base leading-relaxed text-foreground-muted"><InlineReferenceText text={text} locale={locale} /></dd>
          </div>)}
        </dl>
        <div className="space-y-2 border-t border-card-border pt-5">
          <p className="text-sm font-semibold">{c.evidence}</p>
          <p className="text-sm leading-relaxed text-foreground-muted"><InlineReferenceText text={entry.evidence} locale={locale} /></p>
        </div>
      </div>
      <p className="text-sm leading-relaxed text-foreground-muted">{c.scope}</p>
    </div>
  );
}
