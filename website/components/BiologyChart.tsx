"use client";

import {
  ComposedChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  ReferenceLine,
} from "recharts";

interface Props {
  timeseries: {
    year: number;
    biologicalCapacity: number;
    behavioralFactor: number;
    cumulativeEMF: number;
  }[];
  country: string;
}

const DISPLAY_NAMES: Record<string, string> = {
  SouthKorea: "South Korea",
  USA: "United States",
};

export function BiologyChart({ timeseries, country }: Props) {
  const chartData = timeseries
    .filter((r) => r.year >= 1970 && r.year <= 2040)
    .map((r) => ({
      year: r.year,
      bioCap: r.biologicalCapacity,
      behav: r.behavioralFactor,
      bioPotential: +(r.biologicalCapacity * r.behavioralFactor).toFixed(3),
    }));

  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">
        Biological Impact &mdash; {DISPLAY_NAMES[country] || country}
      </h3>
      <p className="text-xs text-foreground-muted mb-4">
        Biological capacity (max potential TFR given EMF exposure) and behavioral
        factor (endocrine-mediated motivation). Their product is the biological
        potential before cultural factors.
      </p>
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
            domain={[0, 7]}
            label={{
              value: "Value",
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
            formatter={(value, name) => {
              const labels: Record<string, string> = {
                bioCap: "Biological capacity",
                behav: "Behavioral factor",
                bioPotential: "Bio × Behav",
              };
              return [Number(value).toFixed(3), labels[String(name)] || String(name)];
            }}
          />
          <Legend
            wrapperStyle={{ fontSize: "12px" }}
            formatter={(value: string) => {
              const labels: Record<string, string> = {
                bioCap: "Biological capacity",
                behav: "Behavioral factor",
                bioPotential: "Bio × Behav",
              };
              return labels[value] || value;
            }}
          />

          <ReferenceLine
            y={6.5}
            stroke="var(--foreground-muted)"
            strokeDasharray="5 5"
            strokeOpacity={0.3}
            label={{
              value: "Pre-EMF baseline (6.5)",
              position: "right",
              style: { fill: "var(--foreground-muted)", fontSize: 10 },
            }}
          />

          <Line
            type="monotone"
            dataKey="bioCap"
            stroke="var(--accent)"
            strokeWidth={2}
            dot={false}
            name="bioCap"
          />
          <Line
            type="monotone"
            dataKey="behav"
            stroke="#10B981"
            strokeWidth={2}
            dot={false}
            name="behav"
          />
          <Line
            type="monotone"
            dataKey="bioPotential"
            stroke="#F59E0B"
            strokeWidth={2}
            dot={false}
            strokeDasharray="5 5"
            name="bioPotential"
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}
