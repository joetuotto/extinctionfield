"use client";

const copy = {
  en: {
    eyebrow: "LEGACY_TIMING_PROXY",
    title: "Archived scalar hindcast",
    lead: "The former hindcast applied a scalar v17 proxy, calibrated at a late observation, backwards through the same country series. It is retained as method history only and is not shown as a BERM v17 validation result.",
    whyTitle: "Why the numeric display was withdrawn",
    points: [
      "Its inputs were technology-timing and assumed exposure proxies, not measured local FieldState or organ transfer.",
      "The scalar biological-capacity and TFR trajectories were modelled quantities rather than independently observed endpoints.",
      "Backward fitting from a late calibration point is not an externally locked forecast or an identification strategy.",
    ],
    nextTitle: "Required replacement",
    next: "A v2 temporal validation must lock FieldState measurements and biological/ASFR endpoints before evaluation, report the demand, tempo and ART paths separately, and compare against predefined demographic baselines.",
  },
  fi: {
    eyebrow: "LEGACY_TIMING_PROXY",
    title: "Arkistoitu skalaarinen hindcast",
    lead: "Aiempi hindcast sovelsi myöhäiseen havaintoon kalibroitua v17-skalaariproxya taaksepäin samaan maa-aikasarjaan. Se säilytetään vain menetelmähistoriana eikä sitä esitetä BERM v17:n validointituloksena.",
    whyTitle: "Miksi numeerinen näyttö poistettiin",
    points: [
      "Syötteinä oli teknologia-ajoituksen ja oletetun altistuksen proxeja, ei mitattua paikallista FieldStatea tai elinkohtaista siirtoa.",
      "Skalaariset biologisen kapasiteetin ja TFR:n trajektorit olivat mallinnettuja suureita, eivät riippumattomasti havaittuja päätepisteitä.",
      "Taaksepäin sovitus myöhäisestä kalibrointipisteestä ei ole ulkoisesti lukittu ennuste eikä identifikaatiostrategia.",
    ],
    nextTitle: "Vaadittu korvaava asetelma",
    next: "V2:n ajallisen validoinnin on lukittava FieldState-mittaukset ja biologiset/ASFR-päätepisteet ennen arviointia, raportoitava kysyntä-, tempo- ja ART-polut erikseen ja verrattava ennalta määriteltyihin demografisiin vertailuihin.",
  },
} as const;

export function HindcastValidation({ locale }: { locale: string }) {
  const d = locale === "fi" ? copy.fi : copy.en;
  return (
    <section id="hindcast" className="mb-14 max-w-4xl rounded-xl border border-status-partial/30 bg-status-partial/5 p-5">
      <p className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-status-partial">{d.eyebrow}</p>
      <h2 className="mb-2 text-xl font-semibold">{d.title}</h2>
      <p className="text-sm leading-relaxed text-foreground-muted">{d.lead}</p>

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <div className="rounded-lg border border-card-border bg-background p-4">
          <h3 className="mb-2 text-sm font-semibold">{d.whyTitle}</h3>
          <ul className="space-y-2 text-xs leading-relaxed text-foreground-muted">
            {d.points.map((point) => <li key={point}>{point}</li>)}
          </ul>
        </div>
        <div className="rounded-lg border border-card-border bg-background p-4">
          <h3 className="mb-2 text-sm font-semibold">{d.nextTitle}</h3>
          <p className="text-xs leading-relaxed text-foreground-muted">{d.next}</p>
        </div>
      </div>
    </section>
  );
}
