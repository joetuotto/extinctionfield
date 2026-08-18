"use client";

import { useEffect, useState } from "react";

interface TocSection {
  id: string;
  label: string;
  num?: string;
}

interface TocGroup {
  title: string;
  sections: TocSection[];
}

const GROUPS = {
  en: [
    {
      title: "Model",
      sections: [
        { id: "architecture", label: "Three-level architecture" },
        { id: "causal-diagram", label: "Causal pathway diagram" },
        { id: "chi-coupling", label: "Chi coupling equation" },
        { id: "two-channel-model", label: "Two-channel model" },
        { id: "recovery", label: "Five-layer recovery" },
        { id: "compensation", label: "Compensation mechanism" },
        { id: "mtor", label: "mTOR convergence" },
      ],
    },
    {
      title: "Mathematical Foundation",
      sections: [
        { id: "lindgren", num: "§1", label: "Lindgren geometry" },
        { id: "chi", num: "§2", label: "Selection rule χ(Ā)" },
        { id: "two-channel", num: "§3", label: "Two-channel model" },
        { id: "biocap", num: "§4", label: "Biological capacity" },
        { id: "behavioral", num: "§5", label: "Behavioral factor" },
        { id: "cultural", num: "§6", label: "Cultural / compensation" },
        { id: "jacobian", num: "§7", label: "Jacobian" },
        { id: "locked", num: "§8", label: "Locked predictions" },
        { id: "falsification", num: "§9", label: "Falsification conditions" },
        { id: "pharmacological", num: "§10", label: "Pharmacological validation" },
        { id: "individual-susceptibility", num: "§11", label: "Individual susceptibility" },
      ],
    },
  ],
  fi: [
    {
      title: "Malli",
      sections: [
        { id: "architecture", label: "Kolmitasoinen arkkitehtuuri" },
        { id: "causal-diagram", label: "Kausaalireittikaavio" },
        { id: "chi-coupling", label: "Chi-kytkentäyhtälö" },
        { id: "two-channel-model", label: "Kaksikanavamalli" },
        { id: "recovery", label: "Viisikerroksinen palautumismalli" },
        { id: "compensation", label: "Kompensaatiomekanismi" },
        { id: "mtor", label: "mTOR-konvergenssi" },
      ],
    },
    {
      title: "Matemaattinen perusta",
      sections: [
        { id: "lindgren", num: "§1", label: "Lindgrenin geometria" },
        { id: "chi", num: "§2", label: "Valintaehto χ(Ā)" },
        { id: "two-channel", num: "§3", label: "Kaksikanavamalli" },
        { id: "biocap", num: "§4", label: "Biologinen kapasiteetti" },
        { id: "behavioral", num: "§5", label: "Käyttäytymistekijä" },
        { id: "cultural", num: "§6", label: "Kulttuuri / kompensaatio" },
        { id: "jacobian", num: "§7", label: "Jakobiaani" },
        { id: "locked", num: "§8", label: "Lukitut ennusteet" },
        { id: "falsification", num: "§9", label: "Falsifiointiehdot" },
        { id: "pharmacological", num: "§10", label: "Farmakologinen validointi" },
        { id: "individual-susceptibility", num: "§11", label: "Yksilöllinen herkkyys" },
      ],
    },
  ],
} as const;

export function ModelTableOfContents({ locale }: { locale: string }) {
  const groups: TocGroup[] = locale === "fi" ? GROUPS.fi as unknown as TocGroup[] : GROUPS.en as unknown as TocGroup[];
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const allIds = groups.flatMap((g) => g.sections.map((s) => s.id));
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: "-80px 0px -60% 0px", threshold: 0 }
    );

    allIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [groups]);

  return (
    <nav className="hidden lg:block sticky top-20 w-52 shrink-0 self-start max-h-[calc(100vh-6rem)] overflow-y-auto">
      {groups.map((group) => (
        <div key={group.title} className="mb-5">
          <p className="text-xs font-semibold uppercase tracking-wider text-foreground-muted/60 mb-2">
            {group.title}
          </p>
          <ul className="space-y-1 text-sm border-l border-card-border pl-3">
            {group.sections.map((s) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  className={`block leading-snug transition-colors ${
                    activeId === s.id
                      ? "text-accent font-medium"
                      : "text-foreground-muted hover:text-accent"
                  }`}
                >
                  {s.num && (
                    <span className="text-xs text-foreground-muted/60 mr-1">
                      {s.num}
                    </span>
                  )}
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </nav>
  );
}
