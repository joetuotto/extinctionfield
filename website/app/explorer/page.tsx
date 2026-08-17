"use client";

import { useState } from "react";
import { COUNTRIES } from "@/lib/countries";
import type { CountryData } from "@/lib/countries";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  LineChart,
  Line,
  ComposedChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

/* ─── Chart palette ─── */
const COLORS = {
  ambient: "#3B82F6",
  personal: "#8B5CF6",
  combined: "#F59E0B",
  ros: "#EF4444",
  sdf: "#F97316",
  motility: "#22C55E",
  concentration: "#06B6D4",
  observed: "#ededed",
  predicted: "#3B82F6",
  ciArea: "rgba(59, 130, 246, 0.15)",
};

const GRID_COLOR = "#262626";
const AXIS_TICK = "#a3a3a3";
const TOOLTIP_BG = "#1a1a1a";
const TOOLTIP_BORDER = "#333333";

/* ─── Shared axis/grid props ─── */
function sharedAxisProps(dataKey: string) {
  return {
    dataKey,
    tick: { fill: AXIS_TICK, fontSize: 12 },
    tickLine: { stroke: GRID_COLOR },
    axisLine: { stroke: GRID_COLOR },
  } as const;
}

/* ─── Custom tooltip ─── */
function ChartTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: { name: string; value: number; color: string }[];
  label?: string | number;
}) {
  if (!active || !payload?.length) return null;
  return (
    <div
      className="rounded-lg px-3 py-2 text-xs shadow-lg border"
      style={{
        backgroundColor: TOOLTIP_BG,
        borderColor: TOOLTIP_BORDER,
        color: "#ededed",
      }}
    >
      <p className="font-medium mb-1 font-mono-num">{label}</p>
      {payload.map((entry) => (
        <div key={entry.name} className="flex items-center gap-2">
          <span
            className="inline-block w-2 h-2 rounded-full"
            style={{ backgroundColor: entry.color }}
          />
          <span className="text-foreground-muted">{entry.name}:</span>
          <span className="font-mono-num font-medium">
            {typeof entry.value === "number" ? entry.value.toFixed(2) : entry.value}
          </span>
        </div>
      ))}
    </div>
  );
}

/* ─── Tab definitions ─── */
type TabId = "exposure" | "biomarkers" | "tfr";

const TABS: { id: TabId; label: string }[] = [
  { id: "exposure", label: "Exposure" },
  { id: "biomarkers", label: "Biomarkers" },
  { id: "tfr", label: "TFR" },
];

/* ─── Exposure chart ─── */
function ExposureChart({ data }: { data: CountryData["exposureHistory"] }) {
  return (
    <ResponsiveContainer width="100%" height={420}>
      <AreaChart data={data} margin={{ top: 8, right: 16, bottom: 8, left: 0 }}>
        <CartesianGrid stroke={GRID_COLOR} strokeDasharray="3 3" />
        <XAxis {...sharedAxisProps("year")} />
        <YAxis
          tick={{ fill: AXIS_TICK, fontSize: 12 }}
          tickLine={{ stroke: GRID_COLOR }}
          axisLine={{ stroke: GRID_COLOR }}
          label={{
            value: "V/m",
            angle: -90,
            position: "insideLeft",
            fill: AXIS_TICK,
            fontSize: 12,
            dx: -4,
          }}
        />
        <Tooltip content={<ChartTooltip />} />
        <Area
          type="monotone"
          dataKey="ambient"
          name="Ambient EMF"
          stackId="1"
          stroke={COLORS.ambient}
          fill={COLORS.ambient}
          fillOpacity={0.3}
        />
        <Area
          type="monotone"
          dataKey="personal"
          name="Personal EMF"
          stackId="1"
          stroke={COLORS.personal}
          fill={COLORS.personal}
          fillOpacity={0.3}
        />
        <Legend
          wrapperStyle={{ paddingTop: 12, fontSize: 12, color: AXIS_TICK }}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}

/* ─── Biomarkers chart ─── */
function BiomarkersChart({ data }: { data: CountryData["biomarkers"] }) {
  return (
    <ResponsiveContainer width="100%" height={420}>
      <LineChart data={data} margin={{ top: 8, right: 16, bottom: 8, left: 0 }}>
        <CartesianGrid stroke={GRID_COLOR} strokeDasharray="3 3" />
        <XAxis {...sharedAxisProps("year")} />
        <YAxis
          tick={{ fill: AXIS_TICK, fontSize: 12 }}
          tickLine={{ stroke: GRID_COLOR }}
          axisLine={{ stroke: GRID_COLOR }}
        />
        <Tooltip content={<ChartTooltip />} />
        <Line
          type="monotone"
          dataKey="ros"
          name="ROS (relative)"
          stroke={COLORS.ros}
          strokeWidth={2}
          dot={false}
        />
        <Line
          type="monotone"
          dataKey="sdf"
          name="SDF (%)"
          stroke={COLORS.sdf}
          strokeWidth={2}
          dot={false}
        />
        <Line
          type="monotone"
          dataKey="motility"
          name="Motility (%)"
          stroke={COLORS.motility}
          strokeWidth={2}
          dot={false}
        />
        <Line
          type="monotone"
          dataKey="concentration"
          name="Concentration (idx)"
          stroke={COLORS.concentration}
          strokeWidth={2}
          dot={false}
        />
        <Legend
          wrapperStyle={{ paddingTop: 12, fontSize: 12, color: AXIS_TICK }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}

/* ─── TFR chart ─── */
function TFRChart({ data }: { data: CountryData["tfrHistory"] }) {
  /* Filter observed to only years with actual data (> 0) */
  const chartData = data.map((d) => ({
    ...d,
    observed: d.observed > 0 ? d.observed : undefined,
  }));

  return (
    <ResponsiveContainer width="100%" height={420}>
      <ComposedChart
        data={chartData}
        margin={{ top: 8, right: 16, bottom: 8, left: 0 }}
      >
        <CartesianGrid stroke={GRID_COLOR} strokeDasharray="3 3" />
        <XAxis {...sharedAxisProps("year")} />
        <YAxis
          tick={{ fill: AXIS_TICK, fontSize: 12 }}
          tickLine={{ stroke: GRID_COLOR }}
          axisLine={{ stroke: GRID_COLOR }}
          label={{
            value: "TFR",
            angle: -90,
            position: "insideLeft",
            fill: AXIS_TICK,
            fontSize: 12,
            dx: -4,
          }}
        />
        <Tooltip content={<ChartTooltip />} />
        {/* CI band */}
        <Area
          type="monotone"
          dataKey="ciHigh"
          name="CI High"
          stroke="none"
          fill={COLORS.ciArea}
          fillOpacity={1}
          legendType="none"
        />
        <Area
          type="monotone"
          dataKey="ciLow"
          name="CI Low"
          stroke="none"
          fill="var(--background, #0a0a0a)"
          fillOpacity={1}
          legendType="none"
        />
        {/* Predicted TFR */}
        <Line
          type="monotone"
          dataKey="predicted"
          name="Predicted TFR"
          stroke={COLORS.predicted}
          strokeWidth={2}
          strokeDasharray="6 3"
          dot={false}
        />
        {/* Observed TFR */}
        <Line
          type="monotone"
          dataKey="observed"
          name="Observed TFR"
          stroke={COLORS.observed}
          strokeWidth={2.5}
          dot={{ r: 2.5, fill: COLORS.observed }}
          connectNulls={false}
        />
        <Legend
          wrapperStyle={{ paddingTop: 12, fontSize: 12, color: AXIS_TICK }}
        />
      </ComposedChart>
    </ResponsiveContainer>
  );
}

/* ─── Summary table ─── */
function SummaryTable({ country }: { country: CountryData }) {
  const tfr2030 = country.tfrHistory.find((d) => d.year === 2030);
  const rows = [
    { label: "Current TFR (2024)", value: country.tfr2024.toFixed(2) },
    {
      label: "Mobile per 100 (2024)",
      value: country.mobilePerHundred2024.toString(),
    },
    {
      label: "Predicted TFR (2030)",
      value: tfr2030 ? tfr2030.predicted.toFixed(2) : "--",
    },
    { label: "Model version", value: "v17.0" },
  ];

  return (
    <div className="mt-6 border border-card-border rounded-lg overflow-hidden">
      <table className="w-full text-sm">
        <tbody>
          {rows.map((row) => (
            <tr key={row.label} className="border-b border-border last:border-b-0">
              <td className="px-4 py-2.5 text-foreground-muted">{row.label}</td>
              <td className="px-4 py-2.5 text-right font-mono-num font-medium">
                {row.value}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ════════════════════════════════════════════════════════
   Explorer page
   ════════════════════════════════════════════════════════ */

export default function ExplorerPage() {
  const [selectedCode, setSelectedCode] = useState(COUNTRIES[0].code);
  const [activeTab, setActiveTab] = useState<TabId>("exposure");

  const country = COUNTRIES.find((c) => c.code === selectedCode) ?? COUNTRIES[0];

  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      {/* Header */}
      <header className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight mb-3">Explorer</h1>
        <p className="text-foreground-muted max-w-2xl leading-relaxed">
          Select a country to view its EMF exposure history, reproductive
          biomarker trajectories, and total fertility rate predictions from the
          BERM model.
        </p>
      </header>

      {/* Country selector */}
      <div className="mb-8">
        <label
          htmlFor="country-select"
          className="block text-sm text-foreground-muted mb-2"
        >
          Country
        </label>
        <select
          id="country-select"
          value={selectedCode}
          onChange={(e) => setSelectedCode(e.target.value)}
          className="w-full max-w-xs px-3 py-2 rounded-lg border border-card-border bg-card-bg text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-accent"
        >
          {COUNTRIES.map((c) => (
            <option key={c.code} value={c.code}>
              {c.name} ({c.region})
            </option>
          ))}
        </select>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-border mb-6">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2.5 text-sm font-medium transition-colors relative ${
              activeTab === tab.id
                ? "text-accent"
                : "text-foreground-muted hover:text-foreground"
            }`}
          >
            {tab.label}
            {activeTab === tab.id && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent rounded-t" />
            )}
          </button>
        ))}
      </div>

      {/* Chart area */}
      <div className="border border-card-border bg-card-bg rounded-lg p-4 md:p-6">
        <h2 className="text-lg font-semibold mb-1">{country.name}</h2>
        <p className="text-xs text-foreground-muted mb-4">
          {activeTab === "exposure" &&
            "RF-EMF ambient and personal exposure estimates (V/m)"}
          {activeTab === "biomarkers" &&
            "Modeled reproductive biomarker trajectories (indexed to baseline)"}
          {activeTab === "tfr" &&
            "Observed vs. BERM-predicted total fertility rate"}
        </p>

        {activeTab === "exposure" && (
          <ExposureChart data={country.exposureHistory} />
        )}
        {activeTab === "biomarkers" && (
          <BiomarkersChart data={country.biomarkers} />
        )}
        {activeTab === "tfr" && <TFRChart data={country.tfrHistory} />}
      </div>

      {/* Summary table */}
      <SummaryTable country={country} />

      {/* Methodology note */}
      <section className="mt-8 border-t border-border pt-6">
        <p className="text-xs text-foreground-muted leading-relaxed max-w-3xl">
          Data sources: Mobile penetration from ITU/World Bank. TFR observed
          values from UN World Population Prospects and national statistics
          offices. Biomarker trajectories are modeled estimates from BERM v17.0
          calibrated to published meta-analyses. Exposure estimates combine
          infrastructure density models with device-usage surveys. Shaded
          regions on the TFR chart indicate the 95% confidence interval of
          model predictions.
        </p>
      </section>
    </div>
  );
}
