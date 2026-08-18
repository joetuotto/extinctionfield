interface Props {
  meta: {
    country: string;
    emfStartYear: number;
    latestObservedTFR: { year: number; value: number };
    predictedTFR2030: number;
    predictedTFR2040: number;
    cumEMF2024: number;
  };
}

const DISPLAY_NAMES: Record<string, string> = {
  SouthKorea: "South Korea",
  USA: "United States",
};

export function CountryMetaCard({ meta }: Props) {
  const stats = [
    {
      label: "Latest observed TFR",
      value: `${meta.latestObservedTFR.value} (${meta.latestObservedTFR.year})`,
    },
    { label: "Predicted TFR 2030", value: meta.predictedTFR2030.toFixed(2) },
    { label: "Predicted TFR 2040", value: meta.predictedTFR2040.toFixed(2) },
    { label: "Cumulative EMF (2024)", value: meta.cumEMF2024.toFixed(1) },
    { label: "EMF history starts", value: meta.emfStartYear.toString() },
  ];

  return (
    <div>
      <h2 className="text-xl font-semibold mb-3">
        {DISPLAY_NAMES[meta.country] || meta.country}
      </h2>
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
        {stats.map((s) => (
          <div
            key={s.label}
            className="bg-card-bg border border-card-border rounded-lg p-3"
          >
            <p className="text-xs text-foreground-muted">{s.label}</p>
            <p className="text-lg font-semibold font-mono-num">{s.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
