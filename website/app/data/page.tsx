import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Data Sources - Extinction Field",
  description:
    "All data sources used in the BERM model: exposure indices, RF measurements, fertility outcomes, and biomarker references.",
};

/* ── helpers ── */

function SectionCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`border border-card-border bg-card-bg rounded-lg p-6 ${className}`}
    >
      {children}
    </div>
  );
}

function ProviderBadge({ label, color }: { label: string; color: string }) {
  return (
    <span
      className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium whitespace-nowrap"
      style={{
        backgroundColor: `${color}18`,
        color,
        border: `1px solid ${color}40`,
      }}
    >
      {label}
    </span>
  );
}

function DataSourceCard({
  id,
  name,
  provider,
  providerColor,
  description,
  coverage,
  frequency,
  url,
  urlNote,
}: {
  id?: string;
  name: string;
  provider: string;
  providerColor: string;
  description: string;
  coverage: string;
  frequency: string;
  url?: string;
  urlNote?: string;
}) {
  return (
    <SectionCard>
      <div className="flex items-start justify-between gap-3 mb-3">
        <div>
          {id && (
            <p className="text-xs font-mono-num text-foreground-muted mb-1">
              {id}
            </p>
          )}
          <h3 className="text-base font-semibold leading-snug">{name}</h3>
        </div>
        <ProviderBadge label={provider} color={providerColor} />
      </div>
      <p className="text-sm text-foreground-muted leading-relaxed mb-4">
        {description}
      </p>
      <div className="flex flex-wrap gap-x-6 gap-y-1 text-xs text-foreground-muted mb-4">
        <span>
          <strong className="text-foreground">Coverage:</strong> {coverage}
        </span>
        <span>
          <strong className="text-foreground">Frequency:</strong> {frequency}
        </span>
      </div>
      {url && (
        <a
          href={url.startsWith("http") ? url : `https://${url}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-border text-foreground-muted hover:text-foreground hover:border-foreground-muted text-xs font-medium rounded-md transition-colors"
        >
          {url.replace(/^https?:\/\//, "")}
          {urlNote && (
            <span className="text-foreground-muted ml-1">({urlNote})</span>
          )}
          <svg
            className="w-3 h-3 flex-shrink-0"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3"
            />
          </svg>
        </a>
      )}
    </SectionCard>
  );
}

/* ── page ── */

export default function DataPage() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      {/* Header */}
      <header className="mb-12">
        <h1 className="text-3xl font-bold tracking-tight mb-3">
          Data Sources
        </h1>
        <p className="text-foreground-muted max-w-2xl leading-relaxed">
          Every dataset used in the BERM model is either open-access or publicly
          cited. This page documents each source, its provider, coverage, and
          update cadence so that any researcher can reproduce our results from
          scratch.
        </p>
      </header>

      {/* ── Primary exposure data ── */}
      <section className="mb-14">
        <h2 className="text-xl font-semibold mb-2">
          Primary exposure data
        </h2>
        <p className="text-sm text-foreground-muted mb-6 max-w-3xl leading-relaxed">
          Country-level indices of mobile infrastructure and connectivity used as
          the main EMF exposure proxy in the model.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <DataSourceCard
            id="D1"
            name="Mobile Cellular Subscriptions"
            provider="ITU / World Bank"
            providerColor="#3b82f6"
            description="Mobile cellular subscriptions per 100 inhabitants. The primary proxy for population-level RF exposure intensity in BERM."
            coverage="200+ countries, 1990 -- present"
            frequency="Annual"
            url="https://data.worldbank.org"
          />
          <DataSourceCard
            id="D2"
            name="Mobile Connectivity Index"
            provider="GSMA Intelligence"
            providerColor="#8b5cf6"
            description="Composite index measuring infrastructure deployment, affordability, consumer readiness, and content availability. Used to weight exposure estimates across markets."
            coverage="170 countries"
            frequency="Annual"
            url="https://gsma.com/mobilefordevelopment/mci"
            urlNote="requires registration"
          />
        </div>
      </section>

      {/* ── RF measurement data ── */}
      <section className="mb-14">
        <h2 className="text-xl font-semibold mb-2">
          RF measurement data
        </h2>
        <p className="text-sm text-foreground-muted mb-6 max-w-3xl leading-relaxed">
          Directly measured ambient radiofrequency field strengths from national
          regulators. Used for model validation and calibration against the
          subscription-based proxy.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <DataSourceCard
            id="D3"
            name="National RF Field Strength Surveys"
            provider="Various regulators"
            providerColor="#f59e0b"
            description="Measured ambient RF levels in V/m from national spectrum authorities including ARPANSA (Australia), SSM (Sweden), and BfS (Germany)."
            coverage="Varies by country"
            frequency="Periodic"
          />
          <DataSourceCard
            id="D4"
            name="Connected Nations Reports"
            provider="Ofcom"
            providerColor="#10b981"
            description="100-metre grid resolution coverage and signal strength data for mobile networks. Provides ground-truth RF exposure levels for UK calibration."
            coverage="United Kingdom"
            frequency="Annual"
            url="https://ofcom.org.uk"
          />
        </div>
      </section>

      {/* ── Infrastructure data ── */}
      <section className="mb-14">
        <h2 className="text-xl font-semibold mb-2">
          Infrastructure data
        </h2>
        <p className="text-sm text-foreground-muted mb-6 max-w-3xl leading-relaxed">
          Tower and antenna registrations used to model geographic exposure
          gradients within countries.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <DataSourceCard
            id="O4"
            name="Antenna Structure Registration"
            provider="US FCC"
            providerColor="#ef4444"
            description="Registered antenna structures including tower locations, heights, and types. Used for spatial exposure modelling in the United States."
            coverage="United States"
            frequency="Continuously updated"
            url="https://fcc.gov/asr"
          />
        </div>
      </section>

      {/* ── Outcome data (TFR) ── */}
      <section className="mb-14">
        <h2 className="text-xl font-semibold mb-2">
          Outcome data (TFR)
        </h2>
        <p className="text-sm text-foreground-muted mb-6 max-w-3xl leading-relaxed">
          Total fertility rate and vital statistics used as the dependent
          variable in BERM calibration and prediction evaluation.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <DataSourceCard
            name="World Population Prospects"
            provider="UN DESA"
            providerColor="#3b82f6"
            description="Comprehensive demographic estimates and projections including total fertility rate by country. The primary TFR reference dataset for BERM."
            coverage="All countries"
            frequency="Biennial"
            url="https://population.un.org"
          />
          <DataSourceCard
            name="Fertility Rate (World Bank)"
            provider="World Bank"
            providerColor="#3b82f6"
            description="Crude birth rate and total fertility rate sourced from UN Population Division and national statistics. Used as a cross-check against WPP estimates."
            coverage="200+ countries"
            frequency="Annual"
            url="https://data.worldbank.org"
          />
          <DataSourceCard
            name="National Statistics Offices"
            provider="Various"
            providerColor="#f59e0b"
            description="Country-specific vital statistics from agencies like Statistics Finland (Tilastokeskus), KOSIS (South Korea), and ONS (UK). Used for high-frequency sub-annual fertility tracking."
            coverage="Country-specific"
            frequency="Quarterly to annual"
          />
        </div>
      </section>

      {/* ── Biomarker reference data ── */}
      <section className="mb-14">
        <h2 className="text-xl font-semibold mb-2">
          Biomarker reference data
        </h2>
        <p className="text-sm text-foreground-muted mb-6 max-w-3xl leading-relaxed">
          Meta-analyses and reference standards for human reproductive
          biomarkers. Used to calibrate the biological capacity layer of the
          model.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <DataSourceCard
            name="Sperm Concentration Trends Meta-analysis"
            provider="Levine et al. 2017"
            providerColor="#8b5cf6"
            description="Systematic review and meta-regression of sperm concentration trends from 1973 to 2011. Covers 42,935 men across 185 studies. Foundational dataset for the biological capacity decline curve."
            coverage="42,935 men, 185 studies"
            frequency="Published 2017"
          />
          <DataSourceCard
            name="WHO Semen Analysis Reference Values"
            provider="WHO (6th ed.)"
            providerColor="#10b981"
            description="Clinical reference ranges for semen parameters (concentration, motility, morphology). 6th edition published 2021. Used to define the normal-range boundaries in BERM."
            coverage="Global clinical standard"
            frequency="Published 2021"
          />
        </div>
      </section>

      {/* ── Data pipeline ── */}
      <section className="mb-14">
        <h2 className="text-xl font-semibold mb-4">
          Data pipeline
        </h2>
        <SectionCard>
          <p className="text-sm text-foreground-muted leading-relaxed mb-4">
            Raw datasets flow through a standardized pipeline before entering the
            model:
          </p>
          <div className="flex flex-wrap items-center gap-2 text-sm mb-4">
            <span className="px-3 py-1.5 bg-background-secondary rounded-md font-medium">
              Raw data
            </span>
            <span className="text-foreground-muted">&rarr;</span>
            <span className="px-3 py-1.5 bg-background-secondary rounded-md font-mono-num text-xs">
              berm/berm/data/
            </span>
            <span className="text-foreground-muted">&rarr;</span>
            <span className="px-3 py-1.5 bg-background-secondary rounded-md font-medium">
              Standardized format
            </span>
            <span className="text-foreground-muted">&rarr;</span>
            <span className="px-3 py-1.5 bg-background-secondary rounded-md font-medium">
              Model input
            </span>
          </div>
          <p className="text-sm text-foreground-muted leading-relaxed">
            Python loaders in{" "}
            <code className="font-mono-num text-foreground">berm/berm/data/</code>{" "}
            handle fetching, caching, and normalization. The ITU/World Bank loader
            is already implemented: it fetches from the World Bank API with local
            caching and rate-limit handling. Each loader produces a consistent
            country-year panel format that the model consumes directly.
          </p>
        </SectionCard>
      </section>

      {/* ── Licensing ── */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">
          Licensing
        </h2>
        <SectionCard>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
            <div>
              <p className="font-medium mb-1">Data</p>
              <p className="text-foreground-muted leading-relaxed">
                All datasets used are either open-access or cited with permission
                under their respective licenses.
              </p>
            </div>
            <div>
              <p className="font-medium mb-1">Model code</p>
              <p className="text-foreground-muted leading-relaxed">
                MIT License -- free to use, modify, and distribute with
                attribution.
              </p>
            </div>
            <div>
              <p className="font-medium mb-1">Documentation</p>
              <p className="text-foreground-muted leading-relaxed">
                CC BY-4.0 -- share and adapt with appropriate credit.
              </p>
            </div>
          </div>
        </SectionCard>
      </section>

      {/* Epistemic note */}
      <section className="mt-8">
        <p className="text-xs text-foreground-muted leading-relaxed max-w-3xl">
          Data availability note: Some sources (particularly GSMA MCI) require
          registration. Where data access is restricted, we document the source
          and methodology so that researchers with access can reproduce the
          analysis. All model outputs can be reproduced using only the open-access
          sources (D1, TFR).
        </p>
      </section>
    </div>
  );
}
