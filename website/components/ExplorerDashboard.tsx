"use client";

/**
 * The former dashboard rendered a scalar v17 scenario as if it were a
 * dosimetry-backed country forecast.  Retain a visible archive entry point
 * instead of mixing that artefact with the FieldState–ASFR-v2 route.
 */
export function ExplorerDashboard({ locale = "en" }: { locale?: string }) {
  const fi = locale === "fi";
  const copy = fi
    ? {
        title: "Arkistoitu v17-proksiskenaario",
        lead: "Tämän näkymän aiemmat maa-, biologia- ja TFR-käyrät perustuivat skalaariin ambient + χ(ambient) × personal sekä siihen johdettuihin kumulatiivisiin suureisiin. Syötteet eivät ole mitattua paikallista FieldStatea, elinsiirtoa tai annosta.",
        kept: "Arkistoon on jätetty ainoastaan menetelmähistoria. Sitä ei käytetä FieldState–ASFR-v2:n altistus-, biologisen kapasiteetin- tai TFR-ennusteena.",
        next: "V2-käyttöliittymä avataan vasta, kun maakohtaiseen aikapaneeliin voidaan liittää dokumentoitu FieldState, elinkohtainen vaste, paritila ja ASFR-tulos.",
      }
    : {
        title: "Archived v17 proxy scenario",
        lead: "The former country, biology and TFR curves were generated from the scalar ambient + χ(ambient) × personal and derived cumulative quantities. Those inputs are not measured local FieldState, organ transfer or dose.",
        kept: "Only the method history is retained in the archive. It is not used as a FieldState–ASFR-v2 exposure, biological-capacity or TFR forecast.",
        next: "A v2 explorer will open only after a country-time panel can join documented FieldState, organ endpoint, couple state and ASFR outcome data.",
      };

  return (
    <section className="border border-status-partial/30 bg-status-partial/5 rounded-xl p-6 max-w-3xl">
      <p className="text-xs uppercase tracking-[0.16em] font-semibold text-status-partial mb-2">LEGACY_TIMING_PROXY</p>
      <h2 className="text-xl font-semibold mb-3">{copy.title}</h2>
      <p className="text-sm text-foreground-muted leading-relaxed">{copy.lead}</p>
      <div className="mt-4 pt-4 border-t border-card-border space-y-3 text-sm text-foreground-muted leading-relaxed">
        <p>{copy.kept}</p>
        <p>{copy.next}</p>
      </div>
    </section>
  );
}
