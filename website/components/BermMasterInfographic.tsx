import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { pickCopy } from "@/lib/i18n";

const COPY = {
  en: {
    title: "From technology history to biological response",
    status: "BERM · conceptual overview",
    intro: "Technologies create different field environments. BERM asks how their geometry and timing could couple to living systems.",
    sources: ["Power grids and transport", "Broadcasting and radar", "Mobile networks and local radio", "Lighting and displays", "Industrial power electronics", "Soil, water and electrode circuits"],
    sourceLabel: "Examples of source families",
    steps: [
      { title: "Physical environment", detail: "Source, waveform, orientation, distance and operating history." },
      { title: "Conditional BERM response", detail: "Geometry → tissue coupling → molecular and organ response. The biological bridge requires calibration." },
      { title: "Organisms and populations", detail: "Reproduction, movement and survival, connected through explicit aggregation and time lags." },
    ],
    note: "Schematic: the boxes have no numerical weight. Source counts do not measure exposure, and shared timelines do not establish a biological effect.",
    history: "Explore sourced technology history",
    model: "Explore the BERM model",
    evidence: "Biological evidence",
  },
  fi: {
    title: "Teknologiahistoriasta biologiseen vasteeseen",
    status: "BERM · käsitteellinen yleiskuva",
    intro: "Teknologiat muodostavat erilaisia kenttäympäristöjä. BERM tutkii, miten niiden geometria ja ajoitus voisivat kytkeytyä eläviin järjestelmiin.",
    sources: ["Sähköverkot ja liikenne", "Yleisradio ja tutkat", "Mobiiliverkot ja lähiradiot", "Valaistus ja näytöt", "Teollisuuden tehoelektroniikka", "Maaperän ja veden virtapiirit"],
    sourceLabel: "Esimerkkejä lähdeperheistä",
    steps: [
      { title: "Fysikaalinen ympäristö", detail: "Lähde, aaltomuoto, suunta, etäisyys ja käyttöhistoria." },
      { title: "BERM:n ehdollinen vaste", detail: "Geometria → kudoskytkentä → molekyyli- ja elinvaste. Biologinen silta tarvitsee kalibroinnin." },
      { title: "Eliöt ja populaatiot", detail: "Lisääntyminen, liikkuminen ja selviytyminen yhdistetään eksplisiittisillä aggregoinneilla ja viiveillä." },
    ],
    note: "Kaaviokuva: laatikoilla ei ole numeerista painoa. Lähteiden määrä ei mittaa altistusta, eikä yhteinen aikajana osoita biologista vaikutusta.",
    history: "Tutki lähteistettyä teknologiahistoriaa",
    model: "Tutustu BERM-malliin",
    evidence: "Biologinen tutkimusnäyttö",
  },
};

/** Conceptual source-to-response map, deliberately without invented time series. */
export function BermMasterInfographic({ locale = "en" }: { locale?: string }) {
  const d = pickCopy(COPY, locale);

  return (
    <figure className="mb-14 overflow-hidden rounded-2xl border border-card-border bg-card-bg/40" aria-label={d.title}>
      <div className="p-5 sm:p-8">
        <p className="text-xs font-semibold uppercase tracking-wide text-accent">{d.status}</p>
        <h2 className="mt-3 max-w-2xl font-serif text-2xl leading-tight sm:text-3xl">{d.title}</h2>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-foreground-muted">{d.intro}</p>
        <ul className="mt-6 grid grid-cols-2 gap-2 lg:grid-cols-3" aria-label={d.sourceLabel}>
          {d.sources.map((source) => (
            <li key={source} className="rounded-lg border border-card-border bg-background/40 px-3 py-3 text-xs font-medium">{source}</li>
          ))}
        </ul>
        <div className="my-4 flex justify-center text-accent" aria-hidden="true"><ArrowRight className="rotate-90" size={20} /></div>
        <ol className="grid gap-3 md:grid-cols-3">
          {d.steps.map((step, index) => (
            <li key={step.title} className={`rounded-xl border p-4 ${index === 1 ? "border-accent/40 bg-accent/5" : "border-card-border"}`}>
              <p className="font-mono text-xs text-accent" aria-hidden="true">0{index + 1}</p>
              <h3 className="mt-2 text-sm font-semibold">{step.title}</h3>
              <p className="mt-2 text-xs leading-relaxed text-foreground-muted">{step.detail}</p>
            </li>
          ))}
        </ol>
        <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3 text-xs font-medium text-accent">
          <Link className="inline-flex items-center gap-1.5" href={`/${locale}/evidence/technology`}>{d.history}<ArrowRight size={13} /></Link>
          <Link className="inline-flex items-center gap-1.5" href={`/${locale}/model`}>{d.model}<ArrowRight size={13} /></Link>
          <Link className="inline-flex items-center gap-1.5" href={`/${locale}/evidence`}>{d.evidence}<ArrowRight size={13} /></Link>
        </div>
      </div>
      <figcaption className="border-t border-card-border px-5 py-4 text-xs leading-relaxed text-foreground-muted sm:px-8">{d.note}</figcaption>
    </figure>
  );
}
