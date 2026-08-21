import type { Metadata } from "next";
import { CausalMap } from "@/components/CausalMap";

const COPY = {
  en: {
    title: "Causal Map",
    subtitle: "49 nodes across 7 levels — from environmental EMF channels to demographic and ecological outcomes. Click any node for mechanism details.",
    instruction: "Scroll to zoom. Click nodes for details.",
  },
  fi: {
    title: "Kausaalikartta",
    subtitle: "49 solmua 7 tasolla — ympäristön EMF-kanavista demografisiin ja ekologisiin seurauksiin. Klikkaa solmua mekanismin yksityiskohtiin.",
    instruction: "Vieritä zoomataksesi. Klikkaa solmua yksityiskohtiin.",
  },
} as const;

export const metadata: Metadata = {
  title: "Causal Map – BERM v19",
  description: "Interactive causal map of the Bio-Electromagnetic Reproductive Model",
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
    <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      <header className="mb-8">
        <h1 className="font-serif text-3xl sm:text-4xl tracking-tight mb-3">{d.title}</h1>
        <p className="text-foreground-muted leading-relaxed max-w-2xl">{d.subtitle}</p>
        <p className="text-xs text-foreground-muted/50 mt-2 hidden md:block">{d.instruction}</p>
      </header>
      <CausalMap locale={lang} />
    </main>
  );
}
