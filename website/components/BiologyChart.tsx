interface Props {
  country: string;
  locale?: "en" | "fi";
}

/**
 * Kept as a safe placeholder for old routes that imported this component.
 * The archived numeric biological-capacity series is deliberately not drawn.
 */
export function BiologyChart({ country, locale = "en" }: Props) {
  const isFinnish = locale === "fi";
  return (
    <div className="max-w-3xl">
      <h3 className="mb-2 text-lg font-semibold">
        {isFinnish ? "Biologisen tilan mittausvalmius" : "Biological-state measurement readiness"} — {country}
      </h3>
      <p className="text-sm leading-relaxed text-foreground-muted">
        {isFinnish
          ? "BERM v19 ei käytä yhtä maakohtaista “biologisen kapasiteetin” käyrää. Se erottaa mies-, nais- ja paritason tilat sekä niiden palautuvat ja pysyvät komponentit. Näille suureille ei ole vielä maakohtaista, kalibroitua paneelia."
          : "BERM v19 does not use one country-level “biological capacity” curve. It separates male, female, and couple states and their reversible and persistent components. A country-level calibrated panel for these quantities is not yet available."}
      </p>
      <div className="mt-5 grid gap-3 sm:grid-cols-3">
        {[
          isFinnish ? "FieldState-vektori" : "FieldState vector",
          isFinnish ? "Elinkohtainen tila" : "Organ-specific state",
          isFinnish ? "ASFR-päätepisteet" : "ASFR endpoints",
        ].map((item) => (
          <div key={item} className="rounded-lg border border-card-border bg-background p-3 text-sm">
            <p className="font-medium">{item}</p>
            <p className="mt-1 text-xs text-foreground-muted">
              {isFinnish ? "Mittaus- ja kalibrointia vaaditaan" : "Measurement and calibration required"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
