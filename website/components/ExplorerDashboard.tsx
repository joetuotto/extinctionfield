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
          ["Poikkileikkausennuste v17.1", "TFR ≈ 4,11 × exp(−54,0 × EMF_eff) + 1,55. EMF_eff yhdistää asumisen sähkönkulutuksen (ELF) ja laajakaistan (RF) sähkön saatavuudella korjattuna. LOOCV RMSE 0,522 (n = 54, sd = 1,35). Taitoarvo 0,61 (= 1 − RMSE/sd; 61 % parannus keskiarvoennustajaan). R² = 0,851 kuvastaa sähköistyskynnystä, ei EMF-tarkkaa vaikutusta."],
          ["Nimetyt L3-vasteprofiilit", "χ_env, χ_optical ja χ_molecular ovat erillisiä tuotuja L3-ehdokkaita, eivät L1-χ_geo-kertoimen käyttötapoja. Niiden populaatiopainot ja yhteys mitattuun altistukseen vaativat avoimen L2-sillan ja empiirisen kalibroinnin."],
          ["Testosteronin ajoitus", "Mitattu lasku edeltää myöhempää TFR-laskuvaihetta Suomessa, USA:n MMAS-vertailussa ja Israelissa. v13/v14-aineisto rajaa ajoitusta ja kaskadin osia; yhteistä kausaalista viivettä ei ole estimoitu."],
        ],
      }
    : {
        title: "Country-data interpretation",
        lead: "Published TFR series and mobile subscriptions help inspect demographic change and the timing of technology adoption across countries.",
        cards: [
          ["Demographic series", "TFR is a period population measure. Age-specific fertility (ASFR) is the primary demographic endpoint in v2."],
          ["Technology timing", "Mobile subscriptions describe adoption timing. They are not a local RF measurement, organ transfer or dose."],
          ["A v2 country estimate", "It requires documented FieldState, organ and couple endpoints, and ASFR calibration on the same time–place axis."],
          ["Cross-sectional prediction v17.1", "TFR ≈ 4.11 × exp(−54.0 × EMF_eff) + 1.55. EMF_eff combines residential electricity (ELF) and broadband (RF), adjusted by electricity access. LOOCV RMSE 0.522 (n = 54, sd = 1.35). Skill score 0.61 (= 1 − RMSE/sd; 61% improvement over mean predictor). R² = 0.851 reflects the electrification threshold, not EMF-specific effect."],
          ["Named L3 response profiles", "χ_env, χ_optical and χ_molecular are separate imported L3 candidates, not applications of the L1 χ_geo coefficient. Their population weights and connection to measured exposure require the open L2 bridge and empirical calibration."],
          ["Testosterone timing", "Measured declines precede later TFR decline episodes in Finland, the US MMAS comparison and Israel. The v13/v14 evidence constrains chronology and cascade components; a common causal lag is not yet estimated."],
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
