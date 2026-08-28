"use client";

import { useEffect, useState } from "react";
import { pickCopy } from "@/lib/i18n";

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
  ja: {
    title: "反証テスト v19.1",
    lead: "時間的識別が空間的に制約されたF1〜F6テストに代わります。各テストは技術導入タイミングの国間差異を利用します — RF測定と生物学的応答の同時観測を必要としない外生的変動です。",
    summary: "概要",
    ran: "実行済み",
    consistent: "整合的",
    falsified: "反証",
    pending: "データ待ち",
    prediction: "予測",
    result: "結果",
    falsificationCriterion: "反証基準",
    premises: "前提",
    dataStatus: "データ",
    matrixTitle: "反証マトリクス",
    matrixTest: "テスト",
    matrixCriterion: "これが真の場合…",
    matrixScope: "…これが否定される",
    loading: "反証テストを読み込み中…",
    error: "反証テストを読み込めませんでした。",
    source: "テストマニフェスト",
    statusRan: "実行済み",
    statusPending: "保留中",
    statusConsistent: "整合的",
    testsRun: "件実行",
    testsTotal: "合計",
    noFalsified: "反証なし",
    version: "バージョン",
    premiseTypes: {
      K: "既知",
      E: "実証的",
      T: "理論的",
      C: "因果モデル",
      "M|C": "モデル/因果",
      logical: "論理的",
    } as Record<string, string>,
    dataStatuses: {
      AVAILABLE: "利用可能",
      PARTIAL: "部分的",
      REQUIRES_COLLECTION: "収集が必要",
      WPP_2024: "WPP 2024",
      PUBLISHED_LITERATURE: "公刊文献",
      LITERATURE_VALUES: "文献値",
      ANFR_2026: "ANFR 2026",
    } as Record<string, string>,
  },
  fr: {
    title: "Tests de falsification v19.1",
    lead: "L'identification temporelle remplace les tests F1–F6 bloqués spatialement. Chaque test exploite la variation du calendrier d'adoption technologique entre les pays — une variation exogène qui ne nécessite pas de mesure RF colocalisée et de réponse biologique.",
    summary: "Résumé",
    ran: "Exécuté",
    consistent: "Cohérent",
    falsified: "Falsifié",
    pending: "En attente de données",
    prediction: "Prédiction",
    result: "Résultat",
    falsificationCriterion: "Critère de falsification",
    premises: "Prémisses",
    dataStatus: "Données",
    matrixTitle: "Matrice de falsification",
    matrixTest: "Test",
    matrixCriterion: "Si ceci est vrai…",
    matrixScope: "…ceci est réfuté",
    loading: "Chargement des tests de falsification…",
    error: "Les tests de falsification n'ont pas pu être chargés.",
    source: "Manifeste de test",
    statusRan: "Exécuté",
    statusPending: "En attente",
    statusConsistent: "Cohérent",
    testsRun: "tests exécutés",
    testsTotal: "total",
    noFalsified: "aucun falsifié",
    version: "Version",
    premiseTypes: {
      K: "Connu",
      E: "Empirique",
      T: "Théorique",
      C: "Modèle causal",
      "M|C": "Modèle/Causal",
      logical: "Logique",
    } as Record<string, string>,
    dataStatuses: {
      AVAILABLE: "Disponible",
      PARTIAL: "Partiel",
      REQUIRES_COLLECTION: "Collecte requise",
      WPP_2024: "WPP 2024",
      PUBLISHED_LITERATURE: "Littérature publiée",
      LITERATURE_VALUES: "Valeurs de la littérature",
      ANFR_2026: "ANFR 2026",
    } as Record<string, string>,
  },
  ko: {
    title: "반증 테스트 v19.1",
    lead: "시간적 식별이 공간적으로 제한된 F1–F6 테스트를 대체합니다. 각 테스트는 국가 간 기술 도입 시기의 변동을 활용합니다 — RF 측정과 생물학적 반응의 동시 관측이 필요 없는 외생적 변동입니다.",
    summary: "요약",
    ran: "실행됨",
    consistent: "일관됨",
    falsified: "반증됨",
    pending: "데이터 대기 중",
    prediction: "예측",
    result: "결과",
    falsificationCriterion: "반증 기준",
    premises: "전제",
    dataStatus: "데이터",
    matrixTitle: "반증 매트릭스",
    matrixTest: "테스트",
    matrixCriterion: "이것이 참이면…",
    matrixScope: "…이것이 반박됨",
    loading: "반증 테스트 로딩 중…",
    error: "반증 테스트를 불러올 수 없습니다.",
    source: "테스트 매니페스트",
    statusRan: "실행됨",
    statusPending: "대기 중",
    statusConsistent: "일관됨",
    testsRun: "건 실행",
    testsTotal: "합계",
    noFalsified: "반증 없음",
    version: "버전",
    premiseTypes: {
      K: "알려진",
      E: "실증적",
      T: "이론적",
      C: "인과 모델",
      "M|C": "모델/인과",
      logical: "논리적",
    } as Record<string, string>,
    dataStatuses: {
      AVAILABLE: "이용 가능",
      PARTIAL: "부분적",
      REQUIRES_COLLECTION: "수집 필요",
      WPP_2024: "WPP 2024",
      PUBLISHED_LITERATURE: "출판 문헌",
      LITERATURE_VALUES: "문헌 값",
      ANFR_2026: "ANFR 2026",
    } as Record<string, string>,
  },
} as const;

function StatusBadge({ status, falsified, locale }: { status: string; falsified?: boolean; locale: string }) {
  const d = pickCopy(COPY, locale);

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

const KEY_RESULT_TEMPLATES = {
  T1: {
    en: (did: string, euN: number, ctrlN: number) => `DID = ${did} TFR/yr · ${euN} EU vs ${ctrlN} control countries`,
    fi: (did: string, euN: number, ctrlN: number) => `DID = ${did} TFR/v · ${euN} EU-maata vs ${ctrlN} kontrollimaata`,
    ja: (did: string, euN: number, ctrlN: number) => `DID = ${did} TFR/年 · EU ${euN}カ国 vs 対照 ${ctrlN}カ国`,
    fr: (did: string, euN: number, ctrlN: number) => `DID = ${did} TFR/an · ${euN} pays UE vs ${ctrlN} pays témoins`,
    ko: (did: string, euN: number, ctrlN: number) => `DID = ${did} TFR/년 · EU ${euN}개국 vs 대조 ${ctrlN}개국`,
  },
  T3: {
    en: "M2 predicts correctly, M1 cannot — discriminating test",
    fi: "M2 ennustaa oikein, M1 ei voi — erotteleva testi",
    ja: "M2は正しく予測、M1は不可 — 弁別テスト",
    fr: "M2 prédit correctement, M1 ne le peut pas — test discriminant",
    ko: "M2는 올바르게 예측, M1은 불가 — 판별 테스트",
  },
  T7: {
    en: (median: number, exceeds: number, total: number) => `Ambient ${median} V/m exceeds therapeutic in ${exceeds}/${total} (tDCS: 2.2×)`,
    fi: (median: number, exceeds: number, total: number) => `Ambient ${median} V/m ylittää terapeuttisen ${exceeds}/${total} vertailussa (tDCS: 2,2×)`,
    ja: (median: number, exceeds: number, total: number) => `環境値 ${median} V/m が治療閾値を超過 ${exceeds}/${total} (tDCS: 2.2倍)`,
    fr: (median: number, exceeds: number, total: number) => `Ambiant ${median} V/m dépasse le seuil thérapeutique dans ${exceeds}/${total} (tDCS : 2,2×)`,
    ko: (median: number, exceeds: number, total: number) => `환경값 ${median} V/m이 치료 임계값 초과 ${exceeds}/${total} (tDCS: 2.2배)`,
  },
} as const;

function formatKeyResult(test: FalsificationTest, locale: string): string | null {
  const kr = test.key_result;
  if (!kr) return null;
  const loc = (locale in KEY_RESULT_TEMPLATES.T3 ? locale : "en") as keyof typeof KEY_RESULT_TEMPLATES.T3;

  if (test.id === "T1") {
    const did = (kr.did_estimate as number).toFixed(5);
    const euN = kr.eu_n as number;
    const ctrlN = kr.ctrl_n as number;
    return KEY_RESULT_TEMPLATES.T1[loc](did, euN, ctrlN);
  }
  if (test.id === "T3") {
    return KEY_RESULT_TEMPLATES.T3[loc];
  }
  if (test.id === "T7") {
    const median = kr.ambient_median_v_m as number;
    const exceeds = kr.n_exceeds as number;
    const total = kr.n_total as number;
    return KEY_RESULT_TEMPLATES.T7[loc](median, exceeds, total);
  }
  return null;
}

export function FalsificationTestsV19({ locale }: { locale: string }) {
  const [data, setData] = useState<FalsificationData | null>(null);
  const [failed, setFailed] = useState(false);
  const d = pickCopy(COPY, locale);

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
