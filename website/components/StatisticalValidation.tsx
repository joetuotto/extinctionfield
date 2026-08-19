"use client";

import { ASFRCohortPhase } from "./ASFRCohortPhase";
import { GlobalValidation } from "./GlobalValidation";

export function StatisticalValidation({ locale }: { locale: string }) {
  const fi = locale === "fi";
  const d = fi
    ? {
        title: "Tilastollinen tila ja validointiraja",
        lead: "FieldState–ASFR-v2 erottaa kuvailevan ajastuskuvion, biologisen päätepisteen ja väestövaikutuksen. Nykyinen sivu ei esitä vanhoja skalaari- tai kalibrointituloksia v2:n validointina.",
        archivedTitle: "Arkistoitu v17-diagnostiikka",
        archived: "V17:n poikkileikkaus-, hindcast- ja käyttöönottotestit käyttivät mobiililiittymiä ja urbaanistumisen kaltaisia teknologia-ajoitusprokseja. Ne ovat menetelmähistoriaa, eivät paikallista FieldStatea tai FieldState–ASFR-v2:n ennustevalidointia. Julkaistussa globaalissa ydinvertailussa v17 ei johdonmukaisesti voittanut demografista nollamallia.",
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
        lead: "FieldState–ASFR-v2 separates a descriptive timing pattern, a biological endpoint and a population effect. This page does not present prior scalar or calibration results as v2 validation.",
        archivedTitle: "Archived v17 diagnostics",
        archived: "The v17 cross-sectional, hindcast and rollout tests used mobile subscriptions and technology-timing proxies such as urbanisation. They are method history, not local FieldState or FieldState–ASFR-v2 forecast validation. In the released global core comparisons, v17 did not consistently outperform the demographic null.",
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
        <p className="text-xs uppercase tracking-[0.15em] text-accent font-semibold mb-2">FieldState–ASFR v2</p>
        <h2 className="text-xl font-semibold mb-2">{d.title}</h2>
        <p className="text-sm text-foreground-muted leading-relaxed">{d.lead}</p>
      </header>

      <ASFRCohortPhase locale={locale} />

      <section className="mb-10 rounded-xl border border-status-partial/30 bg-status-partial/5 p-5 max-w-4xl">
        <h3 className="text-base font-semibold mb-2">{d.archivedTitle}</h3>
        <p className="text-sm text-foreground-muted leading-relaxed">{d.archived}</p>
      </section>

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
