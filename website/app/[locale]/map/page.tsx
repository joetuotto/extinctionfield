import type { Metadata } from "next";
import { CausalAtlas } from "@/components/CausalAtlas";
import { InlineReferenceText } from "@/components/InlineReferenceText";
import { NODES, ALL_STAGES, t } from "@/lib/causalAtlasData";
import { pickCopy } from "@/lib/i18n";
import type { Locale } from "@/lib/causalMapData";

const COPY = {
  en: {
    title: "BERM hypothesis atlas",
    subtitle: "Explore BERM's proposed multiscale routes and their evidence labels from environmental EMF channels to demographic and ecological outcomes.",
    boundaryTitle: "How to read this atlas",
    boundary: "This is a detailed map of BERM hypotheses and imported biological evidence, not a second model and not a chain derived from FieldState. FieldState is an optional measurement module outside this atlas. Lindgren's 2025 metric is a theory premise; the geometry-to-observable L2 operator remains open, so arrows across that boundary are testable BERM propositions rather than derived effects.",
    readMore: "Read more",
  },
  fi: {
    title: "BERM-hypoteesiatlas",
    subtitle: "Tutki BERM:n ehdottamia monitasoreittejä ja niiden näyttömerkintöjä ympäristön EMF-kanavista demografisiin ja ekologisiin seurauksiin.",
    boundaryTitle: "Näin atlasta luetaan",
    boundary: "Tämä on BERM-hypoteesien ja muualta tuodun biologisen näytön yksityiskohtainen kartta, ei toinen malli eikä FieldStatesta johdettu ketju. FieldState on atlasrakenteen ulkopuolinen valinnainen mittausmoduuli. Lindgrenin vuoden 2025 metriikka on teoriapremissi; geometriasta havaittavaan vasteeseen johtava L2-operaattori on avoin, joten rajan ylittävät nuolet ovat testattavia BERM-propositioita eivätkä johdettuja vaikutuksia.",
    readMore: "Lue lisää",
  },
  ja: {
    title: "BERM仮説アトラス",
    subtitle: "環境EMFチャネルから人口統計学的・生態学的アウトカムまで、BERMが提案する多層経路と証拠ラベルを示します。",
    boundaryTitle: "このアトラスの読み方",
    boundary: "これはBERM仮説と外部の生物学的証拠の詳細図であり、第二のモデルでもFieldStateから導出された連鎖でもありません。FieldStateは別の任意測定モジュールです。Lindgrenの2025年計量は理論上の前提であり、幾何学から観測量へのL2演算子は未解決です。その境界を越える矢印は、導出済み効果ではなく検証可能なBERM命題です。",
    readMore: "詳しく見る",
  },
  fr: {
    title: "Atlas des hypothèses BERM",
    subtitle: "Explorez les voies multiniveaux proposées par BERM et leurs étiquettes de preuve, des canaux EMF aux résultats démographiques et écologiques.",
    boundaryTitle: "Comment lire cet atlas",
    boundary: "Il s'agit d'une carte détaillée des hypothèses BERM et des données biologiques importées, et non d'un second modèle ni d'une chaîne dérivée de FieldState. FieldState est un module de mesure facultatif distinct. La métrique de Lindgren (2025) est une prémisse théorique ; l'opérateur L2 reliant la géométrie à un observable reste ouvert. Les flèches franchissant cette limite sont donc des propositions BERM testables, pas des effets dérivés.",
    readMore: "En savoir plus",
  },
  ko: {
    title: "BERM 가설 아틀라스",
    subtitle: "환경 EMF 채널에서 인구통계·생태 결과까지 BERM이 제안하는 다층 경로와 증거 표지를 살펴봅니다.",
    boundaryTitle: "이 아틀라스를 읽는 방법",
    boundary: "이것은 BERM 가설과 외부 생물학적 증거의 상세 지도이지, 두 번째 모델이나 FieldState에서 도출된 연쇄가 아닙니다. FieldState는 별도의 선택적 측정 모듈입니다. Lindgren의 2025 계량은 이론 전제이며 기하학에서 관측량으로 가는 L2 연산자는 아직 열려 있습니다. 그 경계를 넘는 화살표는 도출된 효과가 아니라 검증 가능한 BERM 명제입니다.",
    readMore: "자세히 보기",
  },
} as const;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const d = pickCopy(COPY, locale);
  return {
    title: `${d.title} – Extinction Field`,
    description: d.subtitle,
    alternates: {
      canonical: `https://extinctionfield.com/${locale}/map`,
    },
  };
}

function SSRFallback({ lang, pageLocale }: { lang: Locale; pageLocale: string }) {
  const d = pickCopy(COPY, pageLocale);
  return (
    <div className="mt-8 space-y-6" id="atlas-fallback">
      {ALL_STAGES.map((stage) => {
        const stageNodes = NODES.filter((n) => {
          const lvl = n.level;
          const s = stage.id;
          if (s === "sources") return lvl <= 0;
          if (s === "modulation") return lvl === 1;
          if (s === "mechanisms") return lvl === 2;
          if (s === "tissue") return lvl === 3;
          if (s === "disease") return lvl === 4;
          if (s === "demographic") return lvl === 5;
          if (s === "ecology") return lvl === 6;
          return false;
        });
        if (stageNodes.length === 0) return null;
        return (
          <details key={stage.id} className="border border-white/10 rounded-lg bg-[#0e0e22]">
            <summary className="px-4 py-3 cursor-pointer text-sm font-semibold" style={{ color: stage.accent }}>
              {t(stage.label, lang)} ({stageNodes.length})
            </summary>
            <ul className="px-4 pb-4 space-y-2">
              {stageNodes.map((node) => {
                const detail = node.detail?.[lang];
                return (
                  <li key={node.id} className="text-xs text-gray-300">
                    <strong>{t(node.label, lang)}</strong>
                    {detail?.mechanism && (
                      <span className="text-gray-500">
                        {" — "}
                        <InlineReferenceText text={detail.mechanism} locale={pageLocale} />
                      </span>
                    )}
                    {node.detail?.link && (
                      <a href={`/${pageLocale}${node.detail.link}`} className="ml-2 text-blue-400 hover:underline">
                        {d.readMore}
                      </a>
                    )}
                  </li>
                );
              })}
            </ul>
          </details>
        );
      })}
    </div>
  );
}

export default async function MapPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const lang: Locale = locale === "fi" ? "fi" : "en";
  const d = pickCopy(COPY, locale);

  return (
    <section className="max-w-[1600px] mx-auto px-4 sm:px-6 py-8 sm:py-12" aria-labelledby="atlas-title">
      <header className="mb-6">
        <h1 id="atlas-title" className="font-serif text-3xl sm:text-4xl tracking-tight mb-3">{d.title}</h1>
        <p className="text-foreground-muted leading-relaxed max-w-2xl">{d.subtitle}</p>
      </header>
      <aside className="mb-6 max-w-4xl rounded-lg border border-status-partial/30 bg-status-partial/5 px-4 py-3">
        <h2 className="text-sm font-semibold text-status-partial">{d.boundaryTitle}</h2>
        <p className="mt-1 text-sm leading-relaxed text-foreground-muted">{d.boundary}</p>
      </aside>
      <CausalAtlas locale={lang} />
      <noscript>
        <SSRFallback lang={lang} pageLocale={locale} />
      </noscript>
    </section>
  );
}
