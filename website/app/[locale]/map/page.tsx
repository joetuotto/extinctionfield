import type { Metadata } from "next";
import { CausalAtlas } from "@/components/CausalAtlas";
import { NODES, ALL_STAGES, t, type Locale } from "@/lib/causalAtlasData";

const COPY = {
  en: {
    title: "Causal Atlas",
    subtitle: "63 causal nodes across 8 stages — trace the pathways from environmental EMF channels to demographic and ecological outcomes.",
  },
  fi: {
    title: "Kausaaliatlas",
    subtitle: "63 kausaalisolmua 8 vaiheessa — seuraa polkuja ympäristön EMF-kanavista demografisiin ja ekologisiin seurauksiin.",
  },
} as const;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const lang: Locale = locale === "fi" ? "fi" : "en";
  const alt = lang === "fi" ? "en" : "fi";
  const d = COPY[lang];
  return {
    title: `${d.title} – Extinction Field`,
    description: d.subtitle,
    alternates: {
      canonical: `https://extinctionfield.com/${lang}/map`,
      languages: { [alt]: `https://extinctionfield.com/${alt}/map` },
    },
  };
}

function SSRFallback({ lang }: { lang: Locale }) {
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
                    {detail?.mechanism && <span className="text-gray-500"> — {detail.mechanism}</span>}
                    {node.detail?.link && (
                      <a href={`/${lang}${node.detail.link}`} className="ml-2 text-blue-400 hover:underline">
                        {lang === "fi" ? "Lue lisää" : "Read more"}
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
  const d = COPY[lang];

  return (
    <section className="max-w-[1600px] mx-auto px-4 sm:px-6 py-8 sm:py-12" aria-labelledby="atlas-title">
      <header className="mb-6">
        <h1 id="atlas-title" className="font-serif text-3xl sm:text-4xl tracking-tight mb-3">{d.title}</h1>
        <p className="text-foreground-muted leading-relaxed max-w-2xl">{d.subtitle}</p>
      </header>
      <CausalAtlas locale={lang} />
      <noscript>
        <SSRFallback lang={lang} />
      </noscript>
    </section>
  );
}
