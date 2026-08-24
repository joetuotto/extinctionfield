import type { Metadata } from "next";
import { CausalAtlas } from "@/components/CausalAtlas";

const COPY = {
  en: {
    title: "Causal Atlas",
    subtitle: "62 causal nodes across 8 stages — trace the pathways from environmental EMF channels to demographic and ecological outcomes.",
    instruction: "Scroll to zoom · Click nodes for details · Use Guided mode for a narrated walkthrough",
  },
  fi: {
    title: "Kausaaliatlas",
    subtitle: "62 kausaalisolmua 8 vaiheessa — seuraa polkuja ympäristön EMF-kanavista demografisiin ja ekologisiin seurauksiin.",
    instruction: "Vieritä zoomataksesi · Klikkaa solmuja yksityiskohtiin · Käytä Opastettu-tilaa opastetulle kierrokselle",
  },
} as const;

export const metadata: Metadata = {
  title: "Causal Atlas – BERM",
  description: "Interactive causal atlas of the Bio-Electromagnetic Reproductive Model",
};

export default async function MapPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const lang = locale === "fi" ? "fi" : "en";
  const d = COPY[lang];

  return (
    <main className="max-w-[1600px] mx-auto px-4 sm:px-6 py-8 sm:py-12">
      <header className="mb-6">
        <h1 className="font-serif text-3xl sm:text-4xl tracking-tight mb-3">{d.title}</h1>
        <p className="text-foreground-muted leading-relaxed max-w-2xl">{d.subtitle}</p>
        <p className="text-xs text-foreground-muted/50 mt-2 hidden md:block">{d.instruction}</p>
      </header>
      <CausalAtlas locale={lang} />
    </main>
  );
}
