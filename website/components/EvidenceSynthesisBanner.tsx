import Link from "next/link";

const COPY = {
  en: {
    eyebrow: "Cross-source synthesis",
    text: "This branch participates in a wider BERM pattern: independent methods converge on the same biological control points.",
    link: "See the seven converging patterns",
  },
  fi: {
    eyebrow: "Lähteidenvälinen synteesi",
    text: "Tämä haara kuuluu laajempaan BERM-patterniin: riippumattomat menetelmät konvergoivat samoihin biologisiin säätöpisteisiin.",
    link: "Katso seitsemän konvergoivaa patternia",
  },
} as const;

export function EvidenceSynthesisBanner({ locale }: { locale: string }) {
  const d = locale === "fi" ? COPY.fi : COPY.en;

  return (
    <aside className="mb-12 rounded-xl border border-accent/30 bg-accent/5 p-5">
      <p className="text-[0.68rem] font-semibold uppercase tracking-wider text-accent">{d.eyebrow}</p>
      <p className="mt-2 text-sm leading-relaxed text-foreground-muted">{d.text}</p>
      <Link href={`/${locale}/evidence/converging-patterns`} className="mt-3 inline-block text-sm font-medium text-accent hover:underline">
        {d.link} →
      </Link>
    </aside>
  );
}
