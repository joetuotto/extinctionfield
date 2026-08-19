interface Props {
  country: string;
  locale?: "en" | "fi";
}

const DISPLAY_NAMES: Record<string, string> = {
  SouthKorea: "South Korea",
  USA: "United States",
};

export function ExposureChart({ country, locale = "en" }: Props) {
  const isFinnish = locale === "fi";

  return (
    <div className="max-w-3xl">
      <h3 className="mb-2 text-lg font-semibold">
        {isFinnish ? "Maadatan saatavuus" : "Country-data availability"} — {DISPLAY_NAMES[country] || country}
      </h3>
      <p className="text-sm leading-relaxed text-foreground-muted">
        {isFinnish
          ? "Julkaistut demografiset sarjat ja teknologian ajoitus ovat saatavilla maavertailuun. FieldState–ASFR-v2:n maakohtainen analyysi edellyttää lisäksi dokumentoituja paikallisia kenttä- ja päätepistesyötteitä."
          : "Published demographic series and technology timing are available for country comparison. A country-level FieldState–ASFR-v2 analysis additionally requires documented local field and endpoint inputs."}
      </p>

      <div className="mt-5 grid gap-3 sm:grid-cols-3">
        {[
          [
            isFinnish ? "Säilytetty" : "Retained",
            isFinnish ? "Julkaistu TFR-sarja" : "Published TFR series",
          ],
          [
            isFinnish ? "Ajoitusproxy" : "Timing proxy",
            isFinnish ? "Mobiililiittymät / 100 asukasta" : "Mobile subscriptions / 100 people",
          ],
          [
            isFinnish ? "Tarvitaan v2:een" : "Required for v2",
            isFinnish ? "Mitattu FieldState + ASFR-päätepisteet" : "Measured FieldState + ASFR endpoints",
          ],
        ].map(([label, value]) => (
          <div key={label} className="rounded-lg border border-card-border bg-background p-3">
            <p className="text-xs text-foreground-muted">{label}</p>
            <p className="mt-1 text-sm font-medium leading-snug">{value}</p>
          </div>
        ))}
      </div>

      <p className="mt-5 rounded-lg border border-blue-500/30 bg-blue-500/5 p-3 text-xs leading-relaxed text-foreground-muted">
        {isFinnish
          ? "Mobiililiittymät ovat teknologiakäyttöönoton ajoitusproxy. Niitä ei tulkita RF-altistukseksi, biologiaksi tai kausaaliseksi vaikutukseksi."
          : "Mobile subscriptions are a technology-adoption timing proxy. They are not interpreted as RF exposure, biology, or a causal effect."}
      </p>
    </div>
  );
}
