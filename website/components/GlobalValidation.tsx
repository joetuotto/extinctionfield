"use client";

import { useEffect, useState } from "react";
import { GLOBAL_TIER_ORDER, type GlobalTier } from "@/lib/globalArtifacts";
import { pickCopy } from "@/lib/i18n";

interface PanelSummary {
  schema_version?: string;
  publication_type?: string;
  source_tiers?: {
    counts?: Partial<Record<GlobalTier, number>>;
  };
}

const copy = {
  en: {
    title: "Global panel data coverage",
    lead: "The published country panel documents the demographic and technology-timing data currently available for the BERM v17 research programme.",
    loading: "Loading panel metadata…",
    unavailable: "Panel metadata is unavailable. Please try again shortly.",
    artifact: "Publication format",
    schema: "Schema",
    tiers: "Coverage tiers in the published panel",
    countries: "countries",
    note: "Tier membership documents source coverage. FieldState availability, endpoints and effect estimates are recorded separately.",
    missing: "Next v2 data addition",
    missingText: "A national panel of measured FieldState inputs, traceable organ/couple endpoints and age-specific fertility outcomes collected on a compatible time axis.",
  },
  ja: {
    title: "グローバルパネルデータカバレッジ",
    lead: "公開された国別パネルは、BERM v17研究プログラムに現在利用可能な人口統計および技術タイミングデータを文書化する。",
    loading: "パネルメタデータを読み込み中…",
    unavailable: "パネルメタデータは利用できません。しばらくしてから再試行してください。",
    artifact: "公開形式",
    schema: "スキーマ",
    tiers: "公開パネルのカバレッジ層",
    countries: "カ国",
    note: "層メンバーシップはソースカバレッジを文書化する。FieldState利用可能性、エンドポイント、効果推定は別途記録される。",
    missing: "次のv2データ追加",
    missingText: "測定されたFieldState入力、追跡可能な臓器/カップルエンドポイント、互換性のある時間軸で収集された年齢別出生率成果の国別パネル。",
  },
  fr: {
    title: "Couverture des données du panel global",
    lead: "Le panel pays publié documente les données démographiques et de chronologie technologique actuellement disponibles pour le programme de recherche BERM v17.",
    loading: "Chargement des métadonnées du panel…",
    unavailable: "Les métadonnées du panel ne sont pas disponibles. Veuillez réessayer sous peu.",
    artifact: "Format de publication",
    schema: "Schéma",
    tiers: "Niveaux de couverture dans le panel publié",
    countries: "pays",
    note: "L'appartenance au niveau documente la couverture source. La disponibilité du FieldState, les points finaux et les estimations d'effet sont enregistrés séparément.",
    missing: "Prochaine addition de données v2",
    missingText: "Un panel national d'entrées FieldState mesurées, de points finaux organe/couple traçables et de résultats de fécondité par âge collectés sur un axe temporel compatible.",
  },
  ko: {
    title: "글로벌 패널 데이터 커버리지",
    lead: "공개된 국가 패널은 BERM v17 연구 프로그램에 현재 사용 가능한 인구통계 및 기술 타이밍 데이터를 문서화합니다.",
    loading: "패널 메타데이터 로딩 중…",
    unavailable: "패널 메타데이터를 사용할 수 없습니다. 잠시 후 다시 시도해 주세요.",
    artifact: "공개 형식",
    schema: "스키마",
    tiers: "공개 패널의 커버리지 층",
    countries: "개국",
    note: "층 멤버십은 소스 커버리지를 문서화합니다. FieldState 가용성, 종점 및 효과 추정은 별도로 기록됩니다.",
    missing: "다음 v2 데이터 추가",
    missingText: "측정된 FieldState 입력, 추적 가능한 장기/커플 종점, 호환 시간축에서 수집된 연령별 출산율 성과의 국가 패널.",
  },
  fi: {
    title: "Globaalin paneelin datakattavuus",
    lead: "Julkaistu maapaneeli dokumentoi BERM v17-tutkimusohjelmalle tällä hetkellä saatavilla olevan demografia- ja teknologia-ajoitusdatan.",
    loading: "Ladataan paneelin metatietoja…",
    unavailable: "Paneelin metatietoa ei ole saatavilla. Yritä hetken kuluttua uudelleen.",
    artifact: "Julkaisumuoto",
    schema: "Skeema",
    tiers: "Julkaistun paneelin kattavuustasot",
    countries: "maata",
    note: "Tasojäsenyys dokumentoi lähdekattavuutta. FieldState-saatavuus, päätepisteet ja vaikutusarviot kirjataan erikseen.",
    missing: "Seuraava v2-datalisäys",
    missingText: "Kansallinen paneeli mitatuista FieldState-syötteistä, jäljitettävistä elin-/paritason päätepisteistä ja ikäryhmäkohtaisista hedelmällisyystuloksista yhteensopivalla aika-akselilla.",
  },
} as const;

const TIER_LABELS: Record<string, Record<GlobalTier, string>> = {
  en: { core: "Core", extended: "Extended", global: "Global" },
  ja: { core: "コア", extended: "拡張", global: "グローバル" },
  fr: { core: "Core", extended: "Étendu", global: "Global" },
  ko: { core: "코어", extended: "확장", global: "글로벌" },
  fi: { core: "Ydin", extended: "Laajennettu", global: "Globaali" },
};

function tierLabel(tier: GlobalTier, locale: string) {
  const labels = pickCopy(TIER_LABELS, locale);
  return labels[tier];
}

/** Shows public-panel provenance and data coverage for the v2-facing surface. */
export function GlobalValidation({ locale }: { locale: string }) {
  const d = pickCopy(copy, locale);
  const [data, setData] = useState<PanelSummary | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    fetch("/data/global_panel_summary.json", { signal: controller.signal })
      .then(async (response) => {
        if (!response.ok) throw new Error("Global panel summary request failed");
        const summary = await response.json() as PanelSummary;
        if (!summary.source_tiers?.counts) throw new Error("Global panel summary schema is invalid");
        setData(summary);
      })
      .catch((error: unknown) => {
        if (error instanceof Error && error.name === "AbortError") return;
        setFailed(true);
      });
    return () => controller.abort();
  }, []);

  return (
    <section className="max-w-4xl rounded-xl border border-card-border bg-card-bg p-5 sm:p-6">
      <h3 className="text-base font-semibold">{d.title}</h3>
      <p className="mt-1 max-w-3xl text-sm leading-relaxed text-foreground-muted">{d.lead}</p>

      {failed ? (
        <p className="mt-5 rounded-lg border border-status-partial/30 bg-status-partial/5 p-3 text-sm text-foreground-muted">{d.unavailable}</p>
      ) : !data ? (
        <p className="mt-5 py-6 text-center text-sm text-foreground-muted">{d.loading}</p>
      ) : (
        <>
          <div className="mt-5 flex flex-wrap gap-x-5 gap-y-1 text-xs text-foreground-muted">
            {data.schema_version && <span>{d.schema}: <span className="font-mono-num">{data.schema_version}</span></span>}
            {data.publication_type && <span>{d.artifact}: <span className="font-mono-num">{data.publication_type}</span></span>}
          </div>
          <div className="mt-5">
            <h4 className="mb-3 text-sm font-semibold">{d.tiers}</h4>
            <div className="grid gap-3 sm:grid-cols-3">
              {GLOBAL_TIER_ORDER.map((tier) => (
                <div key={tier} className="rounded-lg border border-card-border bg-background p-3">
                  <p className="text-xs text-foreground-muted">{tierLabel(tier, locale)}</p>
                  <p className="mt-1 font-mono-num text-xl font-semibold">{data.source_tiers?.counts?.[tier] ?? 0}</p>
                  <p className="text-xs text-foreground-muted">{d.countries}</p>
                </div>
              ))}
            </div>
            <p className="mt-3 text-xs leading-relaxed text-foreground-muted">{d.note}</p>
          </div>
        </>
      )}

      <div className="mt-5 rounded-lg border border-blue-500/30 bg-blue-500/5 p-3">
        <p className="text-xs font-semibold uppercase tracking-wide text-foreground-muted">{d.missing}</p>
        <p className="mt-1 text-xs leading-relaxed text-foreground-muted">{d.missingText}</p>
      </div>
    </section>
  );
}
