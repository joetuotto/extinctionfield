"use client";

export function ExplorerDashboard({ locale = "en" }: { locale?: string }) {
  const fi = locale === "fi";
  const copy = fi
    ? {
        title: "Maadatan tulkintakehys",
        lead: "Julkaistut TFR-sarjat ja mobiililiittymät auttavat tarkastelemaan demografista kehitystä ja teknologian käyttöönoton ajoitusta maittain.",
        cards: [
          ["Demografinen sarja", "TFR on periodinen väestömittari. Ikäryhmäkohtainen ASFR on v2:n ensisijainen demografinen päätepiste."],
          ["Teknologian ajoitus", "Mobiililiittymät kuvaavat käyttöönoton ajoitusta. Ne eivät ole paikallinen RF-mittaus, elinkohtainen siirto tai annos."],
          ["V2-maa-arvio", "Se edellyttää dokumentoitua FieldStatea, elin- ja paritason päätepisteitä sekä ASFR-kalibrointia samalla aika–paikka-akselilla."],
          ["Poikkileikkausennuste v19.1", "TFR ≈ 4,11 × exp(−54,0 × EMF_eff) + 1,55. EMF_eff yhdistää asumisen sähkönkulutuksen (ELF) ja laajakaistan (RF) sähkön saatavuudella korjattuna. LOOCV RMSE 0,522."],
        ],
      }
    : {
        title: "Country-data interpretation",
        lead: "Published TFR series and mobile subscriptions help inspect demographic change and the timing of technology adoption across countries.",
        cards: [
          ["Demographic series", "TFR is a period population measure. Age-specific fertility (ASFR) is the primary demographic endpoint in v2."],
          ["Technology timing", "Mobile subscriptions describe adoption timing. They are not a local RF measurement, organ transfer or dose."],
          ["A v2 country estimate", "It requires documented FieldState, organ and couple endpoints, and ASFR calibration on the same time–place axis."],
          ["Cross-sectional prediction v19.1", "TFR ≈ 4.11 × exp(−54.0 × EMF_eff) + 1.55. EMF_eff combines residential electricity (ELF) and broadband (RF), adjusted by electricity access. LOOCV RMSE 0.522."],
        ],
      };

  return (
    <section className="border border-card-border bg-card-bg rounded-xl p-6 max-w-4xl">
      <h2 className="text-xl font-semibold mb-3">{copy.title}</h2>
      <p className="text-sm text-foreground-muted leading-relaxed">{copy.lead}</p>
      <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {copy.cards.map(([title, text]) => (
          <article key={title} className="rounded-lg border border-card-border bg-background p-4">
            <h3 className="text-sm font-semibold">{title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-foreground-muted">{text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
