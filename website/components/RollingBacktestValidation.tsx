"use client";

const copy = {
  en: {
    eyebrow: "LEGACY_TIMING_PROXY",
    title: "Archived temporal-proxy diagnostics",
    lead: "The released v17 train/test artifacts are not BERM v19 validation. They combine observed later technology-adoption covariates with a legacy scalar model; therefore they are conditional historical diagnostics, not prospective exposure or TFR forecasts.",
    limits: [
      "Mobile subscriptions describe technology adoption timing, not RF exposure, a FieldState vector, or biological dose.",
      "The later covariates are observed inputs to a conditional hindcast; they were not prospectively locked before the later period.",
      "Published aggregate comparisons are descriptive and do not identify a causal field effect or a v2 TFR parameter.",
    ],
  },
  fi: {
    eyebrow: "LEGACY_TIMING_PROXY",
    title: "Arkistoidut ajalliset proxy-diagnostiikat",
    lead: "Julkaistut v17-opetus/testi-artefaktit eivät ole BERM v19:n validointia. Ne yhdistävät myöhemmin havaitut teknologiakäyttöönoton kovariaatit vanhaan skalaarimalliin; siksi ne ovat ehdollisia historiallisia diagnostiikkoja, eivät prospektiivisia altistus- tai TFR-ennusteita.",
    limits: [
      "Mobiililiittymät kuvaavat teknologiakäyttöönoton ajoitusta, eivät RF-altistusta, FieldState-vektoria tai biologista annosta.",
      "Myöhemmät kovariaatit ovat ehdollisen hindcastin havaittuja syötteitä; niitä ei lukittu prospektiivisesti ennen myöhempää jaksoa.",
      "Julkaistut aggregaattivertailut ovat kuvailevia eivätkä identifioi kausaalista kenttävaikutusta tai v2:n TFR-parametria.",
    ],
  },
} as const;

export function RollingBacktestValidation({ locale }: { locale: string }) {
  const d = locale === "fi" ? copy.fi : copy.en;
  return (
    <section className="mb-10 max-w-4xl rounded-xl border border-status-partial/30 bg-status-partial/5 p-5">
      <p className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-status-partial">{d.eyebrow}</p>
      <h3 className="mb-2 text-base font-semibold">{d.title}</h3>
      <p className="text-sm leading-relaxed text-foreground-muted">{d.lead}</p>
      <ul className="mt-4 space-y-2 text-xs leading-relaxed text-foreground-muted">
        {d.limits.map((limit) => <li key={limit} className="border-l-2 border-card-border pl-3">{limit}</li>)}
      </ul>
    </section>
  );
}
