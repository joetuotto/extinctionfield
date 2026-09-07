"use client";

import { useState } from "react";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { pickCopy } from "@/lib/i18n";
import { StudyCitation } from "@/components/StudyCitation";
import { MECHANISM_CARDS, pickCardText, type MechanismCard } from "@/lib/modulome/stateModel";
import { getIntervention, interventionHref, interventionText } from "@/lib/interventions";

const COPY = {
  en: {
    fields: {
      exposure: "Exposure",
      receptor: "Receptor",
      baseline_state: "Baseline state",
      proximal_response: "Proximal response",
      propagation: "Propagation",
      memory: "Memory",
      functional_consequence: "Functional consequence",
      mechanism_bounding: "Mechanism bounding",
    },
    hints: {
      exposure: "Local E/B, waveform, background field, temperature, light where relevant",
      receptor: "Protein, isoform, complex, compartment",
      baseline_state: "The biological state measured before exposure",
      proximal_response: "The first observable change and its latency",
      propagation: "Intracellular route, medium-borne message, or tissue interaction",
      memory: "Persistence and recovery",
      functional_consequence: "Protection, disturbance or altered capability at a named endpoint",
      mechanism_bounding: "What a deletion, restoration or other intervention changed",
    },
    layers: "Layers",
    sources: "Sources",
    module: "Model module",
    interventions: "Related intervention experiments",
    open: "Open the card",
    lead:
      "Every mechanism card answers the same eight questions, so two mechanisms can be compared without rereading their prose. The eighth field is the one that makes a card more than a summary: a card that states no intervention result cannot bound its own mechanism.",
  },
  fi: {
    fields: {
      exposure: "Altiste",
      receptor: "Vastaanotin",
      baseline_state: "Lähtötila",
      proximal_response: "Lähivaste",
      propagation: "Välittyminen",
      memory: "Muisti",
      functional_consequence: "Toiminnallinen seuraus",
      mechanism_bounding: "Mekanismin rajaus",
    },
    hints: {
      exposure: "Paikallinen E/B, aaltomuoto, taustakenttä, lämpötila ja tarvittaessa valo",
      receptor: "Proteiini, proteiinimuoto, kompleksi ja soluosasto",
      baseline_state: "Ennen altistusta mitattu biologinen tila",
      proximal_response: "Ensimmäinen havaittava muutos ja sen viive",
      propagation: "Solunsisäinen reitti, nestevälitteinen viesti tai kudosvuorovaikutus",
      memory: "Vasteen säilyminen ja palautuminen",
      functional_consequence: "Suoja, häiriö tai muuttunut toimintakyky nimetyssä päätepisteessä",
      mechanism_bounding: "Mitä geenin poisto, palautus tai muu interventio muutti",
    },
    layers: "Kerrokset",
    sources: "Lähteet",
    module: "Mallimoduuli",
    interventions: "Liittyvät interventiokokeet",
    open: "Avaa kortti",
    lead:
      "Jokainen mekanismikortti vastaa samaan kahdeksaan kysymykseen, joten kahta mekanismia voi verrata lukematta niiden tekstiä uudelleen. Kahdeksas kenttä tekee kortista muutakin kuin tiivistelmän: kortti, joka ei kerro interventiotulosta, ei voi rajata omaa mekanismiaan.",
  },
};

const FIELD_KEYS = [
  "exposure",
  "receptor",
  "baseline_state",
  "proximal_response",
  "propagation",
  "memory",
  "functional_consequence",
  "mechanism_bounding",
] as const;

type FieldKey = (typeof FIELD_KEYS)[number];

const LEVEL_BADGE: Record<string, string> = {
  E: "bg-green-500/10 text-green-600 dark:text-green-400",
  M: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  C: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
  "M|C": "bg-violet-500/10 text-violet-600 dark:text-violet-400",
};

export function ModulomeMechanismCards({ locale }: { locale: string }) {
  const d = pickCopy(COPY, locale);
  const [open, setOpen] = useState<string | null>(MECHANISM_CARDS[0]?.cardId ?? null);

  return (
    <div>
      <p className="text-sm text-foreground-muted leading-relaxed mb-6 max-w-3xl">{d.lead}</p>

      <div className="space-y-2">
        {MECHANISM_CARDS.map((card: MechanismCard) => {
          const isOpen = open === card.cardId;
          return (
            <div key={card.cardId} className="rounded-lg bg-card border border-card-border">
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : card.cardId)}
                className="w-full flex items-center gap-3 px-4 py-3 text-left"
                aria-expanded={isOpen}
              >
                <ChevronRight
                  size={16}
                  className={`shrink-0 text-foreground-muted transition-transform duration-200 ${isOpen ? "rotate-90" : ""}`}
                />
                <span className="font-semibold text-sm text-foreground flex-1 min-w-0">
                  {pickCardText(card.title, locale)}
                </span>
                <span className="hidden sm:inline font-mono-num text-[0.65rem] text-foreground-muted">
                  {d.layers} {card.layers.join(", ")}
                </span>
                <span
                  className={`shrink-0 text-[0.65rem] font-semibold px-1.5 py-0.5 rounded ${LEVEL_BADGE[card.epistemicLevel] ?? LEVEL_BADGE.M}`}
                >
                  {card.epistemicLevel}
                </span>
              </button>

              {isOpen && (
                <div className="px-4 pb-4 pl-[3.25rem] space-y-3">
                  <dl className="grid gap-3 sm:grid-cols-2">
                    {FIELD_KEYS.map((key: FieldKey) => (
                      <div key={key} className="rounded-lg border border-card-border bg-background-secondary p-3">
                        <dt className="text-xs font-semibold text-foreground uppercase tracking-wider">
                          {d.fields[key]}
                        </dt>
                        <p className="text-[0.68rem] text-foreground-muted/80 mt-0.5 mb-1.5 leading-snug">
                          {d.hints[key]}
                        </p>
                        <dd className="text-xs text-foreground-muted leading-relaxed">
                          {pickCardText(card[key], locale)}
                        </dd>
                      </div>
                    ))}
                  </dl>

                  {card.interventionProfileIds.length > 0 && (
                    <nav aria-label={d.interventions} className="flex flex-wrap gap-2 text-xs">
                      <span className="w-full font-semibold">{d.interventions}</span>
                      {card.interventionProfileIds.map(id => {
                        const profile = getIntervention(id);
                        return profile ? (
                          <Link key={id} href={interventionHref(locale, id)} className="underline underline-offset-2">
                            {interventionText(profile.title, locale)}
                          </Link>
                        ) : null;
                      })}
                    </nav>
                  )}

                  <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1 text-xs text-foreground-muted">
                    <span className="font-semibold text-foreground">{d.sources}:</span>
                    {card.referenceIds.map((referenceId) => (
                      <StudyCitation key={referenceId} referenceId={referenceId} locale={locale} />
                    ))}
                    <span className="font-mono text-[0.7rem] opacity-80">
                      {d.module}: {card.implementingModules.join(", ")}
                    </span>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
