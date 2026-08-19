interface Props {
  meta: {
    country: string;
    latestObservedTFR: { year: number; value: number };
  };
  locale?: "en" | "fi";
}

const DISPLAY_NAMES: Record<string, string> = {
  SouthKorea: "South Korea",
  USA: "United States",
};

export function CountryMetaCard({ meta, locale = "en" }: Props) {
  const isFinnish = locale === "fi";

  return (
    <div>
      <h2 className="mb-3 text-xl font-semibold">
        {DISPLAY_NAMES[meta.country] || meta.country}
      </h2>
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="rounded-lg border border-card-border bg-card-bg p-3">
          <p className="text-xs text-foreground-muted">
            {isFinnish ? "Julkaistun TFR-sarjan viimeisin arvo" : "Latest published TFR value"}
          </p>
          <p className="font-mono-num text-lg font-semibold">
            {meta.latestObservedTFR.value.toFixed(2)} ({meta.latestObservedTFR.year})
          </p>
        </div>
        <div className="rounded-lg border border-card-border bg-card-bg p-3">
          <p className="text-xs text-foreground-muted">{isFinnish ? "Datan tila" : "Data status"}</p>
          <p className="mt-1 text-sm font-semibold text-status-partial">
            {isFinnish ? "Kontekstisarjat saatavilla" : "Context series available"}
          </p>
          <p className="mt-1 text-xs leading-relaxed text-foreground-muted">
            {isFinnish
              ? "Maakohtaista FieldState-mittausta tai elinkohtaista tila-arviota ei ole vielä liitetty tähän näkymään."
              : "A country-specific FieldState measurement or organ-state estimate has not yet been joined to this view."}
          </p>
        </div>
      </div>
    </div>
  );
}
