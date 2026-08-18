"use client";

import {
  ComposedChart,
  Line,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  Area,
} from "recharts";

interface YearRow {
  year: number;
  predictedTFR: number;
  nativeTFR: number | null;
  observedTFR: number | null;
  isForecast: boolean;
}

interface Props {
  timeseries: YearRow[];
  country: string;
}

const DISPLAY_NAMES: Record<string, string> = {
  SouthKorea: "South Korea",
  USA: "United States",
};

export function FertilityChart({ timeseries, country }: Props) {
  const chartData = timeseries
    .filter((r) => r.year >= 1970 && r.year <= 2040)
    .map((r) => ({
      year: r.year,
      predicted: r.predictedTFR,
      native: r.nativeTFR,
      observed: r.observedTFR,
      forecastHigh: r.isForecast
        ? r.predictedTFR * 1.1
        : undefined,
      forecastLow: r.isForecast
        ? r.predictedTFR * 0.9
        : undefined,
    }));

  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">
        Total Fertility Rate &mdash;{" "}
        {DISPLAY_NAMES[country] || country}
      </h3>
      <ResponsiveContainer width="100%" height={400}>
        <ComposedChart
          data={chartData}
          margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
          <XAxis
            dataKey="year"
            stroke="var(--foreground-muted)"
            tick={{ fontSize: 12 }}
          />
          <YAxis
            stroke="var(--foreground-muted)"
            tick={{ fontSize: 12 }}
            domain={["auto", "auto"]}
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
            formatter={(value: number, name: string) => {
              if (name === "predicted")
                return [value?.toFixed(2), "BERM prediction"];
              if (name === "native")
                return [value?.toFixed(2), "Native TFR (excl. immigration)"];
              if (name === "observed")
                return [value?.toFixed(2), "Observed (World Bank)"];
              return [value, name];
            }}
          />

          <ReferenceLine
            y={2.1}
            stroke="#EF4444"
            strokeDasharray="5 5"
            strokeOpacity={0.5}
            label={{
              value: "Replacement (2.1)",
              position: "right",
              style: { fill: "#EF4444", fontSize: 11 },
            }}
          />

          <ReferenceLine
            x={2024}
            stroke="var(--foreground-muted)"
            strokeDasharray="3 3"
            strokeOpacity={0.5}
          />

          <Area
            dataKey="forecastHigh"
            stroke="none"
            fill="var(--accent)"
            fillOpacity={0.08}
          />
          <Area
            dataKey="forecastLow"
            stroke="none"
            fill="var(--background)"
            fillOpacity={1}
          />

          <Line
            type="monotone"
            dataKey="predicted"
            stroke="var(--accent)"
            strokeWidth={2}
            dot={false}
            name="predicted"
          />

          <Line
            type="monotone"
            dataKey="native"
            stroke="#F59E0B"
            strokeWidth={1.5}
            strokeDasharray="5 3"
            dot={false}
            name="native"
          />

          <Scatter
            dataKey="observed"
            fill="var(--foreground-muted)"
            name="observed"
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}
