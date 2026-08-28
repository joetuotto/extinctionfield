import { Download, FileJson2, FileSpreadsheet } from "lucide-react";
import { pickCopy } from "@/lib/i18n";

const copy = {
  en: {
    title: "Public country-panel artefacts",
    description:
      "Download the no-imputation country-year table and its coverage metadata. They expose source fields and tier membership; they do not represent measured FieldState, a biological endpoint panel or a set of future TFR predictions.",
    core: "Coverage tiers are descriptive data-governance labels, not model scores or v2 validation results.",
    summary: "Panel coverage summary (JSON)",
    summaryDetail: "Publication metadata, coverage, source-panel identity, and field availability.",
    csvPanel: "Country-year panel (CSV)",
    csvPanelDetail: "Flattened no-imputation table for spreadsheet and statistical workflows.",
    download: "Download",
  },
  ja: {
    title: "公開国別パネルアーティファクト",
    description:
      "補完なしの国別年次テーブルとそのカバレッジメタデータをダウンロード。ソースフィールドと層メンバーシップを公開するが、測定されたFieldState、生物学的エンドポイントパネル、将来のTFR予測セットではない。",
    core: "カバレッジ層は記述的なデータガバナンスラベルであり、モデルスコアやv2検証結果ではない。",
    summary: "パネルカバレッジサマリー（JSON）",
    summaryDetail: "公開メタデータ、カバレッジ、ソースパネルID、フィールド利用可能性。",
    csvPanel: "国別年次パネル（CSV）",
    csvPanelDetail: "スプレッドシートおよび統計ワークフロー向けのフラット化された補完なしテーブル。",
    download: "ダウンロード",
  },
  fr: {
    title: "Artefacts publics du panel pays",
    description:
      "Téléchargez le tableau pays-année sans imputation et ses métadonnées de couverture. Ils exposent les champs source et l'appartenance aux niveaux ; ils ne représentent pas un FieldState mesuré, un panel de points finaux biologiques ou un ensemble de prédictions TFR futures.",
    core: "Les niveaux de couverture sont des étiquettes descriptives de gouvernance des données, pas des scores de modèle ni des résultats de validation v2.",
    summary: "Résumé de couverture du panel (JSON)",
    summaryDetail: "Métadonnées de publication, couverture, identité du panel source et disponibilité des champs.",
    csvPanel: "Panel pays-année (CSV)",
    csvPanelDetail: "Tableau aplati sans imputation pour les flux de travail tableur et statistiques.",
    download: "Télécharger",
  },
  ko: {
    title: "공개 국가 패널 아티팩트",
    description:
      "보정 없는 국가-연도 테이블과 커버리지 메타데이터를 다운로드합니다. 소스 필드와 층 멤버십을 공개하며, 측정된 FieldState, 생물학적 종점 패널 또는 미래 TFR 예측 세트가 아닙니다.",
    core: "커버리지 층은 기술적 데이터 거버넌스 라벨이며, 모델 점수나 v2 검증 결과가 아닙니다.",
    summary: "패널 커버리지 요약 (JSON)",
    summaryDetail: "공개 메타데이터, 커버리지, 소스 패널 ID, 필드 가용성.",
    csvPanel: "국가-연도 패널 (CSV)",
    csvPanelDetail: "스프레드시트 및 통계 워크플로를 위한 보정 없는 플랫 테이블.",
    download: "다운로드",
  },
  fi: {
    title: "Julkiset maa–vuosi-paneelin artefaktit",
    description:
      "Lataa ilman imputointia julkaistu maa–vuosi-taulukko ja sen kattavuusmetatiedot. Ne avaavat lähdekentät ja tasojäsenyyden; ne eivät ole mitattu FieldState, biologinen päätepistepaneeli eivätkä tulevien TFR-ennusteiden joukko.",
    core: "Kattavuustasot ovat kuvailevia datahallinnan merkintöjä, eivät mallipisteitä tai v2-validointituloksia.",
    summary: "Paneelin kattavuusyhteenveto (JSON)",
    summaryDetail: "Julkaisumetadatat, kattavuus, lähdepaneelin tunniste ja kenttien saatavuus.",
    csvPanel: "Maa–vuosi-paneeli (CSV)",
    csvPanelDetail: "Litteä, ilman imputointia julkaistu taulukko laskentataulukko- ja tilastotyöhön.",
    download: "Lataa",
  },
} as const;

export function GlobalDataDownloads({ locale }: { locale: string }) {
  const d = pickCopy(copy, locale);
  const files = [
    {
      href: "/data/global_panel_summary.json",
      title: d.summary,
      detail: d.summaryDetail,
      icon: FileJson2,
    },
    {
      href: "/data/global_panel.csv",
      title: d.csvPanel,
      detail: d.csvPanelDetail,
      icon: FileSpreadsheet,
    },
  ];

  return (
    <section className="mb-14">
      <h2 className="text-xl font-semibold mb-2">{d.title}</h2>
      <p className="max-w-3xl text-sm leading-relaxed text-foreground-muted">{d.description}</p>
      <p className="mt-3 max-w-3xl rounded-lg border border-accent/25 bg-accent/5 p-3 text-xs leading-relaxed text-foreground-muted">
        {d.core}
      </p>
      <div className="mt-4 grid gap-3 md:grid-cols-2">
        {files.map(({ href, title, detail, icon: Icon }) => (
          <a
            key={href}
            href={href}
            download
            className="group rounded-lg border border-card-border bg-card-bg p-4 transition-colors hover:border-accent/50 hover:bg-accent/5"
          >
            <div className="flex items-start justify-between gap-3">
              <Icon size={18} className="mt-0.5 text-accent" aria-hidden="true" />
              <Download size={16} className="text-foreground-muted transition-colors group-hover:text-accent" aria-hidden="true" />
            </div>
            <h3 className="mt-4 text-sm font-semibold">{title}</h3>
            <p className="mt-1 text-xs leading-relaxed text-foreground-muted">{detail}</p>
            <span className="mt-4 inline-block text-xs font-medium text-accent">{d.download} →</span>
          </a>
        ))}
      </div>
    </section>
  );
}
