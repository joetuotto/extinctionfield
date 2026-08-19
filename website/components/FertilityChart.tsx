"use client";

import {
  CartesianGrid,
  Line,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  LineChart,
} from "recharts";

interface YearRow {
  year: number;
  observedTFR: number | null;
}

interface Props {
  timeseries: YearRow[];
  country: string;
  locale?: "en" | "fi";
}

const DISPLAY_NAMES: Record<string, string> = {
  SouthKorea: "South Korea",
  USA: "United States",
};

export function FertilityChart({ timeseries, country, locale = "en" }: Props) {
  const isFinnish = locale === "fi";
  const chartData = timeseries
    .filter((row) => row.year <= 2024 && typeof row.observedTFR === "number")
    .map((row) => ({ year: row.year, observed: row.observedTFR }));

  return (
    <div>
      <h3 className="mb-2 text-lg font-semibold">
        {isFinnish ? "Julkaistu kokonaishedelmällisyysluku" : "Published total fertility rate"} — {DISPLAY_NAMES[country] || country}
      </h3>
      <p className="mb-4 max-w-3xl text-xs leading-relaxed text-foreground-muted">
        {isFinnish
          ? "Kaavio näyttää vain paketoidun demografisen lähdesarjan julkaistut arvot. TFR on periodimittari, ei biologinen päätepiste eikä FieldState–ASFR-v2:n maaennuste."
          : "This chart shows only published values from the bundled demographic source series. TFR is a period measure, not a biological endpoint or a FieldState–ASFR-v2 country forecast."}
      </p>
      <ResponsiveContainer width="100%" height={360}>
        <LineChart data={chartData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
          <XAxis dataKey="year" stroke="var(--foreground-muted)" tick={{ fontSize: 12 }} />
          <YAxis
            stroke="var(--foreground-muted)"
            tick={{ fontSize: 12 }}
            domain={[0, "auto"]}
            label={{
              value: "TFR",
              angle: -90,
              position: "insideLeft",
              style: { fill: "var(--foreground-muted)", fontSize: 12 },
            }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "var(--card-bg)",
              border: "1px solid var(--card-border)",
              borderRadius: "8px",
              color: "var(--foreground)",
              fontSize: "13px",
            }}
            formatter={(value) => [
              typeof value === "number"
                ? value.toFixed(2)
                : Array.isArray(value)
                  ? value.join(", ")
                  : value ?? "",
              isFinnish ? "Julkaistu TFR" : "Published TFR",
            ]}
          />
          <ReferenceLine
            y={2.1}
            stroke="#EF4444"
            strokeDasharray="5 5"
            strokeOpacity={0.5}
            label={{
              value: isFinnish ? "Uusiutumistaso (2,1)" : "Replacement (2.1)",
              position: "right",
              style: { fill: "#EF4444", fontSize: 11 },
            }}
          />
          <Line
            type="monotone"
            dataKey="observed"
            stroke="var(--accent)"
            strokeWidth={2.25}
            dot={false}
            name="observed"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
