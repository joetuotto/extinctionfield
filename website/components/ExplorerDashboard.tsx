"use client";

import { useState, useEffect } from "react";
import { CountrySelector } from "./CountrySelector";
import { ExposureChart } from "./ExposureChart";
import { BiologyChart } from "./BiologyChart";
import { FertilityChart } from "./FertilityChart";
import { CountryMetaCard } from "./CountryMetaCard";

type Tab = "exposure" | "biology" | "fertility";

interface YearRow {
  year: number;
  ambient: number;
  personal: number;
  chiValue: number;
  twoChannelTotal: number;
  cumulativeEMF: number;
  biologicalCapacity: number;
  behavioralFactor: number;
  predictedTFR: number;
  nativeTFR: number | null;
  ivfShare: number;
  observedTFR: number | null;
  isForecast: boolean;
}

interface CountryMeta {
  country: string;
  emfStartYear: number;
  latestObservedTFR: { year: number; value: number };
  predictedTFR2030: number;
  predictedTFR2040: number;
  cumEMF2024: number;
}

interface CountryData {
  meta: CountryMeta;
  timeseries: YearRow[];
}

interface ExplorerData {
  [country: string]: CountryData;
}

export function ExplorerDashboard() {
  const [data, setData] = useState<ExplorerData | null>(null);
  const [selectedCountry, setSelectedCountry] = useState("Finland");
  const [activeTab, setActiveTab] = useState<Tab>("fertility");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/data/explorer.json")
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((d) => {
        setData(d);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="text-center py-20 text-foreground-muted">
        Loading model data...
      </div>
    );
  }
  if (error || !data) {
    return (
      <div className="text-center py-20 text-status-refuted">
        Failed to load data{error ? `: ${error}` : ""}
      </div>
    );
  }

  const countryData = data[selectedCountry];
  if (!countryData) {
    return (
      <div className="text-status-refuted">
        Country not found: {selectedCountry}
      </div>
    );
  }

  const countries = Object.keys(data).sort();
  const tabs: { key: Tab; label: string }[] = [
    { key: "exposure", label: "EMF Exposure" },
    { key: "biology", label: "Biological Impact" },
    { key: "fertility", label: "Fertility (TFR)" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="lg:w-1/3">
          <CountrySelector
            countries={countries}
            selected={selectedCountry}
            onSelect={setSelectedCountry}
          />
        </div>
        <div className="lg:w-2/3">
          <CountryMetaCard meta={countryData.meta} />
        </div>
      </div>

      <div className="flex gap-1 bg-card-bg border border-card-border rounded-lg p-1">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              activeTab === tab.key
                ? "bg-accent text-white"
                : "text-foreground-muted hover:text-foreground hover:bg-background-secondary"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="bg-card-bg border border-card-border rounded-xl p-4 lg:p-6 min-h-[400px]">
        {activeTab === "exposure" && (
          <ExposureChart
            timeseries={countryData.timeseries}
            country={selectedCountry}
          />
        )}
        {activeTab === "biology" && (
          <BiologyChart
            timeseries={countryData.timeseries}
            country={selectedCountry}
          />
        )}
        {activeTab === "fertility" && (
          <FertilityChart
            timeseries={countryData.timeseries}
            country={selectedCountry}
          />
        )}
      </div>

      <p className="text-xs text-foreground-muted text-center max-w-3xl mx-auto">
        All values are model outputs from BERM v18. Observed TFR from World
        Bank. Gray dots = observed data. Blue line = model prediction. Shaded
        area after 2024 = forecast with approximate &plusmn;10% visual
        uncertainty band. The model is calibrated at 2024 &mdash; predicted and
        observed TFR match at that point by construction.
      </p>
    </div>
  );
}
