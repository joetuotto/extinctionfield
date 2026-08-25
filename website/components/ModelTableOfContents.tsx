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

const GROUPS: Record<"en" | "fi", TocGroup[]> = {
  en: [
    {
      title: "BERM v17",
      sections: [
        { id: "architecture", label: "Scope and boundaries" },
        { id: "fieldstate-input", label: "FieldState input" },
        { id: "static-interface", label: "Static interface" },
        { id: "causal-diagram", label: "Registered causal route" },
        { id: "organ-states", label: "Organ states" },
        { id: "asfr-tfr", label: "ASFR → TFR" },
        { id: "testosterone-threshold", label: "T → TFR threshold" },
        { id: "causal-structure", label: "Causal structure" },
      ],
    },
    {
      title: "Modulome",
      sections: [
        { id: "modulome", label: "12-layer modulome" },
      ],
    },
    {
      title: "Mathematical specification",
      sections: [
        { id: "premise", num: "§1", label: "Physics premise" },
        { id: "evo-calibration", num: "§1b", label: "Evolutionary calibration" },
        { id: "three-channel-derivation", num: "§2b", label: "Three-channel derivation" },
        { id: "fieldstate", num: "§2", label: "FieldState" },
        { id: "static-interface-math", num: "§3", label: "Static interface" },
        { id: "organ-state", num: "§4", label: "Organ state" },
        { id: "asfr", num: "§5", label: "ASFR → TFR" },
        { id: "cohort", num: "§6", label: "Cohort signal" },
        { id: "gme", num: "§7", label: "GME / R42" },
        { id: "validation", num: "§8", label: "Validation boundary" },
      ],
    },
  ],
  fi: [
    {
      title: "BERM v17",
      sections: [
        { id: "architecture", label: "Rajaus ja reunaehdot" },
        { id: "fieldstate-input", label: "FieldState-syöte" },
        { id: "static-interface", label: "Staattinen rajapinta" },
        { id: "causal-diagram", label: "Rekisteröity kausaalireitti" },
        { id: "organ-states", label: "Elintilat" },
        { id: "asfr-tfr", label: "ASFR → TFR" },
        { id: "testosterone-threshold", label: "T → TFR -kynnös" },
        { id: "causal-structure", label: "Kausaalirakenne" },
      ],
    },
    {
      title: "Modulooma",
      sections: [
        { id: "modulome", label: "7-tasoinen modulooma" },
      ],
    },
    {
      title: "Matemaattinen määrittely",
      sections: [
        { id: "premise", num: "§1", label: "Fysiikan premissi" },
        { id: "evo-calibration", num: "§1b", label: "Evoluutionäärinen kalibraatio" },
        { id: "three-channel-derivation", num: "§2b", label: "Kolmikanavajohdannainen" },
        { id: "fieldstate", num: "§2", label: "FieldState" },
        { id: "static-interface-math", num: "§3", label: "Staattinen rajapinta" },
        { id: "organ-state", num: "§4", label: "Elintila" },
        { id: "asfr", num: "§5", label: "ASFR → TFR" },
        { id: "cohort", num: "§6", label: "Kohorttisignaali" },
        { id: "gme", num: "§7", label: "GME / R42" },
        { id: "validation", num: "§8", label: "Validaatioraja" },
      ],
    },
  ],
};

export function ModelTableOfContents({ locale }: { locale: string }) {
  const groups = GROUPS[locale === "fi" ? "fi" : "en"];
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const allIds = [...new Set(groups.flatMap((group) => group.sections.map((section) => section.id)))];
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActiveId(visible[0].target.id);
      },
      { rootMargin: "-80px 0px -60% 0px", threshold: 0 },
    );

    allIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });
    return () => observer.disconnect();
  }, [groups]);

  return (
    <nav className="hidden lg:block sticky top-20 w-56 shrink-0 self-start max-h-[calc(100vh-6rem)] overflow-y-auto">
      {groups.map((group) => (
        <div key={group.title} className="mb-5">
          <p className="text-xs font-semibold uppercase tracking-wider text-foreground-muted/60 mb-2">{group.title}</p>
          <ul className="space-y-1 text-sm border-l border-card-border pl-3">
            {group.sections.map((section) => (
              <li key={`${group.title}-${section.id}`}>
                <a
                  href={`#${section.id}`}
                  className={`block leading-snug transition-colors ${activeId === section.id ? "text-accent font-medium" : "text-foreground-muted hover:text-accent"}`}
                >
                  {section.num && <span className="text-xs text-foreground-muted/60 mr-1">{section.num}</span>}
                  {section.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </nav>
  );
}
