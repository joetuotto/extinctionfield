"use client";

import { useEffect, useState } from "react";

interface Premise {
  id: string;
  text: string;
  type: string;
}

interface KeyResult {
  [key: string]: unknown;
}

interface FalsificationTest {
  id: string;
  title: string;
  prediction: string;
  falsification: string;
  data_status: string;
  runnable: boolean;
  premises: Premise[];
  status: string;
  result_summary?: string;
  falsified?: boolean;
  key_result?: KeyResult;
}

interface FalsificationMatrix {
  test: string;
  criterion: string;
  scope: string;
}

interface FalsificationData {
  version: string;
  generated_at: string;
  tests_run: number;
  tests_total: number;
  tests: FalsificationTest[];
  falsification_matrix: FalsificationMatrix[];
}

const COPY = {
  en: {
    title: "Falsification tests v19.1",
    lead: "Temporal identification replaces the spatially-blocked F1–F6 tests. Each test exploits variation in technology adoption timing across countries — exogenous variation that does not require co-located RF measurement and biological response.",
    summary: "Summary",
    ran: "Ran",
    consistent: "Consistent",
    falsified: "Falsified",
    pending: "Awaiting data",
    prediction: "Prediction",
    result: "Result",
    falsificationCriterion: "Falsification criterion",
    premises: "Premises",
    dataStatus: "Data",
    matrixTitle: "Falsification matrix",
    matrixTest: "Test",
    matrixCriterion: "If this is true…",
    matrixScope: "…this is refuted",
    loading: "Loading falsification tests…",
    error: "Falsification tests could not be loaded.",
    source: "Test manifest",
    statusRan: "Ran",
    statusPending: "Pending",
    statusConsistent: "Consistent",
    testsRun: "tests ran",
    testsTotal: "total",
    noFalsified: "none falsified",
    version: "Version",
    premiseTypes: {
      K: "Known",
      E: "Empirical",
      T: "Theoretical",
      C: "Causal model",
      "M|C": "Model/Causal",
      logical: "Logical",
    } as Record<string, string>,
    dataStatuses: {
      AVAILABLE: "Available",
      PARTIAL: "Partial",
      REQUIRES_COLLECTION: "Requires collection",
      WPP_2024: "WPP 2024",
      PUBLISHED_LITERATURE: "Published literature",
      LITERATURE_VALUES: "Literature values",
      ANFR_2026: "ANFR 2026",
    } as Record<string, string>,
  },
  fi: {
    title: "Falsifikaatiotestit v19.1",
    lead: "Temporaalinen identifikaatio korvaa spatiaalisesti estetyt F1–F6-testit. Kukin testi hyödyntää teknologian käyttöönoton ajoituksen vaihtelua maiden välillä — eksogeenista vaihtelua, joka ei vaadi samanaikaista RF-mittausta ja biologista vastetta.",
    summary: "Yhteenveto",
    ran: "Ajettu",
    consistent: "Yhteensopiva",
    falsified: "Falsifioitu",
    pending: "Odottaa dataa",
    prediction: "Ennuste",
    result: "Tulos",
    falsificationCriterion: "Falsifikaatiokriteeri",
    premises: "Premissit",
    dataStatus: "Data",
    matrixTitle: "Falsifikaatiomatriisi",
    matrixTest: "Testi",
    matrixCriterion: "Jos tämä pätee…",
    matrixScope: "…tämä kumoutuu",
    loading: "Ladataan falsifikaatiotestejä…",
    error: "Falsifikaatiotestejä ei voitu ladata.",
    source: "Testimanifesti",
    statusRan: "Ajettu",
    statusPending: "Odottaa",
    statusConsistent: "Yhteensopiva",
    testsRun: "testiä ajettu",
    testsTotal: "yhteensä",
    noFalsified: "yhtään ei falsifioitu",
    version: "Versio",
    premiseTypes: {
      K: "Tunnettu",
      E: "Empiirinen",
      T: "Teoreettinen",
      C: "Kausaalimalli",
      "M|C": "Malli/Kausaali",
      logical: "Looginen",
    } as Record<string, string>,
    dataStatuses: {
      AVAILABLE: "Saatavilla",
      PARTIAL: "Osittainen",
      REQUIRES_COLLECTION: "Vaatii keruun",
      WPP_2024: "WPP 2024",
      PUBLISHED_LITERATURE: "Julkaistu kirjallisuus",
      LITERATURE_VALUES: "Kirjallisuusarvot",
      ANFR_2026: "ANFR 2026",
    } as Record<string, string>,
  },
} as const;

function StatusBadge({ status, falsified, locale }: { status: string; falsified?: boolean; locale: string }) {
  const d = locale === "fi" ? COPY.fi : COPY.en;

  if (status === "RAN" && falsified === false) {
    return (
      <span className="inline-flex items-center gap-1.5 text-xs font-medium text-status-confirmed">
        <span className="w-1.5 h-1.5 rounded-full bg-status-confirmed" />
        {d.statusConsistent}
      </span>
    );
  }
  if (status === "RAN" && falsified === true) {
    return (
      <span className="inline-flex items-center gap-1.5 text-xs font-medium text-red-500">
        <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
        {d.falsified}
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5 text-xs font-medium text-status-partial">
      <span className="w-1.5 h-1.5 rounded-full bg-status-partial" />
      {d.statusPending}
    </span>
  );
}

function formatKeyResult(test: FalsificationTest, locale: string): string | null {
  const kr = test.key_result;
  if (!kr) return null;

  if (test.id === "T1") {
    const did = kr.did_estimate as number;
    const euN = kr.eu_n as number;
    const ctrlN = kr.ctrl_n as number;
    return locale === "fi"
      ? `DID = ${did.toFixed(5)} TFR/v · ${euN} EU-maata vs ${ctrlN} kontrollimaata`
      : `DID = ${did.toFixed(5)} TFR/yr · ${euN} EU vs ${ctrlN} control countries`;
  }
  if (test.id === "T3") {
    return locale === "fi"
      ? "M2 ennustaa oikein, M1 ei voi — erotteleva testi"
      : "M2 predicts correctly, M1 cannot — discriminating test";
  }
  if (test.id === "T7") {
    const median = kr.ambient_median_v_m as number;
    const exceeds = kr.n_exceeds as number;
    const total = kr.n_total as number;
    return locale === "fi"
      ? `Ambient ${median} V/m ylittää terapeuttisen ${exceeds}/${total} vertailussa (tDCS: 2,2×)`
      : `Ambient ${median} V/m exceeds therapeutic in ${exceeds}/${total} (tDCS: 2.2×)`;
  }
  return null;
}

export function FalsificationTestsV19({ locale }: { locale: string }) {
  const [data, setData] = useState<FalsificationData | null>(null);
  const [failed, setFailed] = useState(false);
  const d = locale === "fi" ? COPY.fi : COPY.en;

  useEffect(() => {
    let cancelled = false;
    fetch("/data/falsification_v19_1.json")
      .then((r) => {
        if (!r.ok) throw new Error(`${r.status}`);
        return r.json();
      })
      .then((payload: FalsificationData) => {
        if (!cancelled) setData(payload);
      })
      .catch(() => {
        if (!cancelled) setFailed(true);
      });
    return () => { cancelled = true; };
  }, []);

  if (failed) return <p className="text-sm text-status-partial">{d.error}</p>;
  if (!data) return <p className="text-sm text-foreground-muted">{d.loading}</p>;

  const ranTests = data.tests.filter((t) => t.status === "RAN");
  const consistentCount = ranTests.filter((t) => t.falsified === false).length;
  const falsifiedCount = ranTests.filter((t) => t.falsified === true).length;

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-2">{d.title}</h3>
        <p className="text-sm leading-relaxed text-foreground-muted max-w-3xl">{d.lead}</p>
      </div>

      {/* Summary bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="rounded-lg border border-card-border bg-card-bg p-3 text-center">
          <p className="font-mono-num text-2xl font-semibold text-accent">{data.tests_run}/{data.tests_total}</p>
          <p className="text-xs text-foreground-muted mt-1">{d.testsRun}</p>
        </div>
        <div className="rounded-lg border border-status-confirmed/30 bg-status-confirmed/5 p-3 text-center">
          <p className="font-mono-num text-2xl font-semibold text-status-confirmed">{consistentCount}</p>
          <p className="text-xs text-foreground-muted mt-1">{d.consistent}</p>
        </div>
        <div className="rounded-lg border border-card-border bg-card-bg p-3 text-center">
          <p className="font-mono-num text-2xl font-semibold text-foreground-muted">{falsifiedCount}</p>
          <p className="text-xs text-foreground-muted mt-1">{d.falsified}</p>
        </div>
        <div className="rounded-lg border border-status-partial/30 bg-status-partial/5 p-3 text-center">
          <p className="font-mono-num text-2xl font-semibold text-status-partial">{data.tests_total - data.tests_run}</p>
          <p className="text-xs text-foreground-muted mt-1">{d.pending}</p>
        </div>
      </div>

      {/* Test cards */}
      <div className="space-y-3">
        {data.tests.map((test) => {
          const keyResult = formatKeyResult(test, locale);
          return (
            <article key={test.id} className="border border-card-border rounded-lg p-4">
              <div className="flex items-start gap-3">
                <span className="font-mono-num text-foreground-muted shrink-0 text-sm font-semibold">{test.id}</span>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
                    <h5 className="text-sm font-medium">{test.title}</h5>
                    <StatusBadge status={test.status} falsified={test.falsified} locale={locale} />
                  </div>

                  <p className="mt-2 text-sm leading-relaxed text-foreground-muted">
                    <span className="font-medium text-foreground">{d.prediction}:</span>{" "}
                    {test.prediction}
                  </p>

                  {keyResult && (
                    <div className="mt-2 rounded border border-status-confirmed/20 bg-status-confirmed/5 px-3 py-2">
                      <p className="text-xs font-mono-num text-status-confirmed">{keyResult}</p>
                    </div>
                  )}

                  {test.result_summary && (
                    <p className="mt-2 text-xs leading-relaxed text-foreground-muted">{test.result_summary}</p>
                  )}

                  <p className="mt-2 text-xs text-foreground-muted">
                    <span className="font-medium">{d.falsificationCriterion}:</span>{" "}
                    <span className="text-status-partial">{test.falsification}</span>
                  </p>

                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {test.premises.map((p) => (
                      <span
                        key={`${test.id}-${p.id}`}
                        className="inline-flex items-center gap-1 rounded-full border border-card-border px-2 py-0.5 text-[10px] text-foreground-muted"
                        title={p.text}
                      >
                        <span className="font-medium">{p.id}</span>
                        <span className="text-foreground-muted/60">
                          [{d.premiseTypes[p.type] ?? p.type}]
                        </span>
                      </span>
                    ))}
                    <span className="inline-flex items-center rounded-full border border-card-border px-2 py-0.5 text-[10px] text-foreground-muted">
                      {d.dataStatus}: {d.dataStatuses[test.data_status] ?? test.data_status}
                    </span>
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {/* Falsification matrix */}
      <details className="group">
        <summary className="cursor-pointer text-sm font-semibold text-foreground hover:text-accent transition-colors">
          {d.matrixTitle}
          <span className="ml-1 text-foreground-muted group-open:rotate-90 inline-block transition-transform">▸</span>
        </summary>
        <div className="mt-3 overflow-x-auto">
          <table className="w-full text-xs border-collapse">
            <thead>
              <tr className="border-b border-card-border">
                <th className="text-left py-2 pr-3 font-semibold text-foreground-muted">{d.matrixTest}</th>
                <th className="text-left py-2 pr-3 font-semibold text-foreground-muted">{d.matrixCriterion}</th>
                <th className="text-left py-2 font-semibold text-foreground-muted">{d.matrixScope}</th>
              </tr>
            </thead>
            <tbody>
              {data.falsification_matrix.map((row, i) => (
                <tr key={i} className="border-b border-card-border/50">
                  <td className="py-2 pr-3 font-mono-num text-foreground-muted">{row.test}</td>
                  <td className="py-2 pr-3 text-status-partial">{row.criterion}</td>
                  <td className="py-2 font-medium">{row.scope}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </details>

      <div className="flex items-center gap-4 text-xs text-foreground-muted">
        <span>{d.version}: {data.version}</span>
        <a href="/data/falsification_v19_1.json" className="text-accent hover:underline">
          {d.source} (JSON) →
        </a>
      </div>
    </div>
  );
}
