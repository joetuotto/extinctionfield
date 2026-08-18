"use client";

import {
  ComposedChart,
  Line,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

interface Props {
  timeseries: {
    year: number;
    ambient: number;
    personal: number;
    cumulativeEMF: number;
    chiValue: number;
    twoChannelTotal: number;
  }[];
  country: string;
}

const DISPLAY_NAMES: Record<string, string> = {
  SouthKorea: "South Korea",
  USA: "United States",
};

export function ExposureChart({ timeseries, country }: Props) {
  const chartData = timeseries
    .filter((r) => r.year >= 1980 && r.year <= 2040)
    .map((r) => ({
      year: r.year,
      ambient: r.ambient,
      chiPersonal: +(r.chiValue * r.personal).toFixed(4),
      cumulative: r.cumulativeEMF,
    }));

  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">
        EMF Exposure History &mdash; {DISPLAY_NAMES[country] || country}
      </h3>

      <div className="mb-6">
        <p className="text-xs text-foreground-muted mb-2">
          Annual exposure (ambient + &#967; &times; personal)
        </p>
        <ResponsiveContainer width="100%" height={200}>
          <ComposedChart
            data={chartData}
            margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
            <XAxis
              dataKey="year"
              stroke="var(--foreground-muted)"
              tick={{ fontSize: 11 }}
            />
            <YAxis
              stroke="var(--foreground-muted)"
              tick={{ fontSize: 11 }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "var(--card-bg)",
                border: "1px solid var(--card-border)",
                borderRadius: "8px",
                color: "var(--foreground)",
                fontSize: "12px",
              }}
              formatter={(value: number, name: string) => {
                const labels: Record<string, string> = {
                  ambient: "Ambient",
                  chiPersonal: "χ × Personal",
                };
                return [value?.toFixed(3), labels[name] || name];
              }}
            />
            <Area
              type="monotone"
              dataKey="ambient"
              stackId="1"
              fill="var(--accent)"
              fillOpacity={0.3}
              stroke="var(--accent)"
              name="ambient"
            />
            <Area
              type="monotone"
              dataKey="chiPersonal"
              stackId="1"
              fill="#10B981"
              fillOpacity={0.3}
              stroke="#10B981"
              name="chiPersonal"
            />
            <Legend
              wrapperStyle={{ fontSize: "11px" }}
              formatter={(value: string) => {
                const labels: Record<string, string> = {
                  ambient: "Ambient",
                  chiPersonal: "χ × Personal",
                };
                return labels[value] || value;
              }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      <div>
        <p className="text-xs text-foreground-muted mb-2">
          Cumulative EMF exposure (weighted sum since start)
        </p>
        <ResponsiveContainer width="100%" height={200}>
          <ComposedChart
            data={chartData}
            margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
            <XAxis
              dataKey="year"
              stroke="var(--foreground-muted)"
              tick={{ fontSize: 11 }}
            />
            <YAxis
              stroke="var(--foreground-muted)"
              tick={{ fontSize: 11 }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "var(--card-bg)",
                border: "1px solid var(--card-border)",
                borderRadius: "8px",
                color: "var(--foreground)",
                fontSize: "12px",
              }}
              formatter={(value: number) => [
                value?.toFixed(1),
                "Cumulative EMF",
              ]}
            />
            <Line
              type="monotone"
              dataKey="cumulative"
              stroke="#F59E0B"
              strokeWidth={2}
              dot={false}
              name="Cumulative EMF"
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
