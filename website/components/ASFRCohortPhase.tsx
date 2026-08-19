"use client";

/** The old component displayed uncalibrated v17 ASFR projections. */
export function ASFRCohortPhase({ locale }: { locale: string }) {
  const fi = locale === "fi";
  const d = fi
    ? {
        eyebrow: "TECHNOLOGY_TIMING_PROXY_NOT_FIELDSTATE",
        title: "ASFR-kohorttireitin valmiustila",
        lead: "V2 ei julkaise ikäryhmäkohtaisia maaennusteita ennen kuin samalle kohortti–aika-akselille voidaan yhdistää mitattu FieldState, elinkohtainen biologinen päätepiste, paritila ja ASFR.",
        result: "Kuvaileva löydös: WPP 2024 ASFR + Maailmanpankin/ITU:n mobiililiittymät, 2000–2023, N = 163, Pearson r = −0,66645 nuori–vanha-kohorttien ajoitusproksin ja ASFR-muutoksen välillä.",
        boundary: "Tulos ei ole FieldState, altistusannos, biologinen vaikutusarvio eikä TFR-kerroin. Alue-, tulo- ja väestörakenne ovat olennaisia vaihtoehtoisia selityksiä.",
        next: "Seuraava analyysi: esirekisteröity matched-panel, jossa FieldState ja biomarkkerit kerätään ennen ASFR-päätepisteen arviointia.",
      }
    : {
        eyebrow: "TECHNOLOGY_TIMING_PROXY_NOT_FIELDSTATE",
        title: "ASFR cohort-route readiness",
        lead: "V2 does not publish age-specific country forecasts until measured FieldState, an organ-specific biological endpoint, couple state and ASFR can be joined on the same cohort-time axis.",
        result: "Descriptive finding: WPP 2024 ASFR + World Bank/ITU mobile subscriptions, 2000–2023, N = 163, Pearson r = −0.66645 between a young-minus-older cohort timing proxy and ASFR change.",
        boundary: "The result is not FieldState, exposure dose, a biological effect estimate or a TFR coefficient. Region, income and demographic structure remain material alternative explanations.",
        next: "Next analysis: a preregistered matched panel collecting FieldState and biomarkers before evaluating the ASFR endpoint.",
      };
  return (
    <section className="mb-10 border border-status-partial/30 bg-status-partial/5 rounded-xl p-6 max-w-4xl">
      <p className="text-xs uppercase tracking-[0.14em] text-status-partial font-semibold mb-3">{d.eyebrow}</p>
      <h3 className="text-lg font-semibold mb-3">{d.title}</h3>
      <p className="text-sm text-foreground-muted leading-relaxed">{d.lead}</p>
      <div className="mt-4 grid gap-3 text-sm leading-relaxed">
        <p className="border-l-2 border-accent pl-3 text-foreground-muted">{d.result}</p>
        <p className="border-l-2 border-status-refuted/70 pl-3 text-foreground-muted">{d.boundary}</p>
        <p className="border-l-2 border-card-border pl-3 text-foreground-muted">{d.next}</p>
      </div>
    </section>
  );
}
