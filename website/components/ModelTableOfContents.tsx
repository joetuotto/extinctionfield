"use client";

import { useEffect, useState } from "react";
import { pickCopy } from "@/lib/i18n";

interface TocSection {
  id: string;
  label: string;
  num?: string;
}

interface TocGroup {
  title: string;
  sections: TocSection[];
}

const GROUPS: Record<string, TocGroup[]> = {
  en: [
    {
      title: "Lindgren physics",
      sections: [
        { id: "physics-to-biology", label: "From physics to biology" },
        { id: "solar-biological", label: "Solar-biological connection" },
      ],
    },
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
      title: "Lindgrenin fysiikka",
      sections: [
        { id: "physics-to-biology", label: "Fysiikasta biologiaan" },
        { id: "solar-biological", label: "Aurinko-biologinen yhteys" },
      ],
    },
    {
      title: "BERM v17",
      sections: [
        { id: "architecture", label: "Rajaus ja reunaehdot" },
        { id: "fieldstate-input", label: "FieldState-syöte" },
        { id: "static-interface", label: "Staattinen rajapinta" },
        { id: "causal-diagram", label: "Rekisteröity kausaalireitti" },
        { id: "organ-states", label: "Elintilat" },
        { id: "asfr-tfr", label: "ASFR → TFR" },
        { id: "testosterone-threshold", label: "T → TFR -kynnys" },
        { id: "causal-structure", label: "Kausaalirakenne" },
      ],
    },
    {
      title: "Modulomi",
      sections: [
        { id: "modulome", label: "7-tasoinen modulooma" },
      ],
    },
    {
      title: "Matemaattinen määrittely",
      sections: [
        { id: "premise", num: "§1", label: "Fysiikan premissi" },
        { id: "evo-calibration", num: "§1b", label: "Evolutiivinen kalibrointi" },
        { id: "three-channel-derivation", num: "§2b", label: "Kolmikanavajohtaminen" },
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
  ja: [
    {
      title: "リンドグレン物理学",
      sections: [
        { id: "physics-to-biology", label: "物理学から生物学へ" },
        { id: "solar-biological", label: "太陽-生物学的接続" },
      ],
    },
    {
      title: "BERM v17",
      sections: [
        { id: "architecture", label: "範囲と境界条件" },
        { id: "fieldstate-input", label: "FieldState入力" },
        { id: "static-interface", label: "静的インターフェース" },
        { id: "causal-diagram", label: "登録済み因果経路" },
        { id: "organ-states", label: "臓器状態" },
        { id: "asfr-tfr", label: "ASFR → TFR" },
        { id: "testosterone-threshold", label: "T → TFR閾値" },
        { id: "causal-structure", label: "因果構造" },
      ],
    },
    {
      title: "モジュローム",
      sections: [
        { id: "modulome", label: "12層モジュローム" },
      ],
    },
    {
      title: "数学的仕様",
      sections: [
        { id: "premise", num: "§1", label: "物理学的前提" },
        { id: "evo-calibration", num: "§1b", label: "進化的キャリブレーション" },
        { id: "three-channel-derivation", num: "§2b", label: "三チャネル導出" },
        { id: "fieldstate", num: "§2", label: "FieldState" },
        { id: "static-interface-math", num: "§3", label: "静的インターフェース" },
        { id: "organ-state", num: "§4", label: "臓器状態" },
        { id: "asfr", num: "§5", label: "ASFR → TFR" },
        { id: "cohort", num: "§6", label: "コホートシグナル" },
        { id: "gme", num: "§7", label: "GME / R42" },
        { id: "validation", num: "§8", label: "検証境界" },
      ],
    },
  ],
  fr: [
    {
      title: "Physique de Lindgren",
      sections: [
        { id: "physics-to-biology", label: "De la physique à la biologie" },
        { id: "solar-biological", label: "Connexion solaire-biologique" },
      ],
    },
    {
      title: "BERM v17",
      sections: [
        { id: "architecture", label: "Portée et limites" },
        { id: "fieldstate-input", label: "Entrée FieldState" },
        { id: "static-interface", label: "Interface statique" },
        { id: "causal-diagram", label: "Route causale enregistrée" },
        { id: "organ-states", label: "États des organes" },
        { id: "asfr-tfr", label: "ASFR → TFR" },
        { id: "testosterone-threshold", label: "Seuil T → TFR" },
        { id: "causal-structure", label: "Structure causale" },
      ],
    },
    {
      title: "Modulome",
      sections: [
        { id: "modulome", label: "Modulome à 12 couches" },
      ],
    },
    {
      title: "Spécification mathématique",
      sections: [
        { id: "premise", num: "§1", label: "Prémisse physique" },
        { id: "evo-calibration", num: "§1b", label: "Calibration évolutive" },
        { id: "three-channel-derivation", num: "§2b", label: "Dérivation à trois canaux" },
        { id: "fieldstate", num: "§2", label: "FieldState" },
        { id: "static-interface-math", num: "§3", label: "Interface statique" },
        { id: "organ-state", num: "§4", label: "État d'organe" },
        { id: "asfr", num: "§5", label: "ASFR → TFR" },
        { id: "cohort", num: "§6", label: "Signal de cohorte" },
        { id: "gme", num: "§7", label: "GME / R42" },
        { id: "validation", num: "§8", label: "Limite de validation" },
      ],
    },
  ],
  ko: [
    {
      title: "린드그렌 물리학",
      sections: [
        { id: "physics-to-biology", label: "물리학에서 생물학으로" },
        { id: "solar-biological", label: "태양-생물학적 연결" },
      ],
    },
    {
      title: "BERM v17",
      sections: [
        { id: "architecture", label: "범위와 경계 조건" },
        { id: "fieldstate-input", label: "FieldState 입력" },
        { id: "static-interface", label: "정적 인터페이스" },
        { id: "causal-diagram", label: "등록된 인과 경로" },
        { id: "organ-states", label: "장기 상태" },
        { id: "asfr-tfr", label: "ASFR → TFR" },
        { id: "testosterone-threshold", label: "T → TFR 임계값" },
        { id: "causal-structure", label: "인과 구조" },
      ],
    },
    {
      title: "모듈로옴",
      sections: [
        { id: "modulome", label: "12층 모듈로옴" },
      ],
    },
    {
      title: "수학적 명세",
      sections: [
        { id: "premise", num: "§1", label: "물리학적 전제" },
        { id: "evo-calibration", num: "§1b", label: "진화적 교정" },
        { id: "three-channel-derivation", num: "§2b", label: "3채널 도출" },
        { id: "fieldstate", num: "§2", label: "FieldState" },
        { id: "static-interface-math", num: "§3", label: "정적 인터페이스" },
        { id: "organ-state", num: "§4", label: "장기 상태" },
        { id: "asfr", num: "§5", label: "ASFR → TFR" },
        { id: "cohort", num: "§6", label: "코호트 신호" },
        { id: "gme", num: "§7", label: "GME / R42" },
        { id: "validation", num: "§8", label: "검증 경계" },
      ],
    },
  ],
};

export function ModelTableOfContents({ locale }: { locale: string }) {
  const groups = pickCopy(GROUPS, locale);
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
