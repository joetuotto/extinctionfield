"use client";

import { ASFRCohortPhase } from "./ASFRCohortPhase";
import { GlobalValidation } from "./GlobalValidation";

export function StatisticalValidation({ locale }: { locale: string }) {
  const fi = locale === "fi";
  const d = fi
    ? {
        title: "Tilastollinen tila ja validointiraja",
        lead: "BERM v17 erottaa kuvailevan ajastuskuvion, biologisen päätepisteen ja väestövaikutuksen. Validointitila kertoo, mitä aktiivisen reitin testaamiseen tarvitaan.",
        criteriaTitle: "Mitä v2-validointi edellyttää",
        criteria: [
          "Ennalta määritetty, mitattu FieldState: B₀, spektri/PSD, vaihe/koherenssi, sijainti, elinsiirto ja provenienssi.",
          "Rekisteröity elinkohtainen päätepiste ja parametrit, joiden suora soveltamisala on näkyvissä.",
          "Paritila sekä ikäryhmäkohtainen ASFR, erikseen raportoiduilla kysyntä-, tempo- ja ART-termeillä.",
          "Ulkoisesti lukittu ajallinen ennuste tai replikaatio; TFR johdetaan vasta ASFR:stä.",
        ],
      }
    : {
        title: "Statistical status and validation boundary",
        lead: "BERM v17 separates a descriptive timing pattern, a biological endpoint and a population effect. The validation status states what is required to test the active route.",
        criteriaTitle: "What v2 validation requires",
        criteria: [
          "A pre-specified measured FieldState: B₀, spectrum/PSD, phase/coherence, position, organ transfer and provenance.",
          "A registered organ-specific endpoint and parameters with visible directness and translation scope.",
          "Couple state plus age-specific ASFR, with demand, tempo and ART terms reported separately.",
          "An externally locked temporal prediction or replication; TFR is derived only after ASFR.",
        ],
      };

  return (
    <section id="statistical-validation" className="mb-14">
      <header className="mb-7 max-w-3xl">
        <p className="text-xs uppercase tracking-[0.15em] text-accent font-semibold mb-2">BERM v17</p>
        <h2 className="text-xl font-semibold mb-2">{d.title}</h2>
        <p className="text-sm text-foreground-muted leading-relaxed">{d.lead}</p>
      </header>

      <ASFRCohortPhase locale={locale} />

      <section className="mb-10 max-w-4xl">
        <h3 className="text-base font-semibold mb-3">{d.criteriaTitle}</h3>
        <ol className="grid gap-3 sm:grid-cols-2">
          {d.criteria.map((item, index) => (
            <li key={item} className="rounded-lg border border-card-border bg-card-bg p-4 text-sm text-foreground-muted leading-relaxed">
              <span className="mr-2 font-mono-num text-accent">0{index + 1}</span>{item}
            </li>
          ))}
        </ol>
      </section>

      <GlobalValidation locale={locale} />
    </section>
  );
}
