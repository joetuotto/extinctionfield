"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface Criterion {
  id: string;
  name_en: string;
  name_fi: string;
  berm: number;
  tobacco: number;
  bpa: number;
  strongest_en: string;
  strongest_fi: string;
}

const CRITERIA: Criterion[] = [
  {
    id: "strength",
    name_en: "Strength of Association",
    name_fi: "Yhteyden voimakkuus",
    berm: 3, tobacco: 5, bpa: 3,
    strongest_en: "Shift work MetS OR 2.17 + CCB 264k HR 0.79–0.83 + Klimentidis p=1.2×10⁻⁷ + Levine −51.6% sperm",
    strongest_fi: "Vuorotyö MetS OR 2,17 + CCB 264k HR 0,79–0,83 + Klimentidis p=1,2×10⁻⁷ + Levine −51,6 % siittiöt",
  },
  {
    id: "consistency",
    name_en: "Consistency",
    name_fi: "Johdonmukaisuus",
    berm: 4, tobacco: 4, bpa: 4,
    strongest_en: "Replication 'contradiction' explained: 4 uncontrolled moderators predict positive vs. null results",
    strongest_fi: "Replikaation 'ristiriita' selitetty: 4 kontrolloimatonta moderaattoria ennustavat positiivisen vs. nollatuloksen",
  },
  {
    id: "specificity",
    name_en: "Specificity",
    name_fi: "Spesifisyys",
    berm: 2, tobacco: 2, bpa: 2,
    strongest_en: "Technology-specific: different frequency → different organ → different health outcome",
    strongest_fi: "Teknologiakohtainen: eri taajuus → eri elin → eri terveysvaikutus",
  },
  {
    id: "temporality",
    name_en: "Temporality",
    name_fi: "Ajallinen järjestys",
    berm: 4, tobacco: 5, bpa: 3,
    strongest_en: "5 specific technology–health pairs, each with 0–5 year lag",
    strongest_fi: "5 spesifiä teknologia–terveys-paria, kukin 0–5 vuoden viiveellä",
  },
  {
    id: "gradient",
    name_en: "Biological Gradient",
    name_fi: "Annos-vaste",
    berm: 4, tobacco: 4, bpa: 3,
    strongest_en: "3D gradient: layer count × priming duration × recovery time",
    strongest_fi: "3D-gradientti: kerrosten lukumäärä × priming-kesto × palautumisaika",
  },
  {
    id: "plausibility",
    name_en: "Biological Plausibility",
    name_fi: "Biologinen uskottavuus",
    berm: 5, tobacco: 2, bpa: 4,
    strongest_en: "Schwan equation + Cav3 structure + FDA-approved TheraBionic",
    strongest_fi: "Schwanin yhtälö + Cav3-rakenne + FDA-hyväksytty TheraBionic",
  },
  {
    id: "coherence",
    name_en: "Coherence",
    name_fi: "Koherenssi",
    berm: 4, tobacco: 4, bpa: 3,
    strongest_en: "Explains 5 anomalies that conventional explanations cannot (layered model)",
    strongest_fi: "Selittää 5 anomaliaa joita konventionaaliset selitykset eivät (kerrostumamalli)",
  },
  {
    id: "experiment",
    name_en: "Experimental Evidence",
    name_fi: "Kokeellinen näyttö",
    berm: 4, tobacco: 3, bpa: 4,
    strongest_en: "TheraBionic (FDA, human) + Faraday bedroom intervention testable + shift worker EMF-free night",
    strongest_fi: "TheraBionic (FDA, ihminen) + Faraday-makuuhuone-interventio testattavissa + vuorotyöntekijöiden EMF-vapaa yö",
  },
  {
    id: "analogy",
    name_en: "Analogy",
    name_fi: "Analogia",
    berm: 5, tobacco: 3, bpa: 3,
    strongest_en: "TTFields + LED-SMPS at same frequency + EU forced every home lamp to emit IF",
    strongest_fi: "TTFields + LED-SMPS samalla taajuudella + EU pakotti jokaisen kodin lampun tuottamaan IF:ää",
  },
];

const COPY = {
  en: {
    kicker: "BRADFORD HILL CRITERIA",
    title: "Does this meet scientific standards for causation?",
    subtitle:
      "Bradford Hill's nine criteria (1965) are the established framework for evaluating whether an observed association is causal. Here is how BERM compares to two exposures that are now accepted as causal — at the time they were accepted.",
    criterion: "Criterion",
    tobacco: "Tobacco '65",
    total: "Total",
    strongestEvidence: "Strongest evidence",
    explanation:
      "BERM scores higher overall than both tobacco (at the time of the Surgeon General's report) and bisphenol A (at the time regulatory action began). Its strongest areas are biological plausibility (the mechanism is known at atomic resolution and FDA-validated) and analogy (four independent parallel lines of evidence). Its weakest area is specificity — but this is a predicted feature of calcium biology, not a model failure.",
    disclaimer:
      "These scores represent our assessment. Readers are encouraged to evaluate each criterion independently.",
    cta: "Read the full Bradford Hill analysis",
    tapHint: "Tap a criterion to see the strongest evidence",
  },
  fi: {
    kicker: "BRADFORD HILL -KRITEERIT",
    title: "Täyttääkö tämä tieteelliset kausaalisuuskriteerit?",
    subtitle:
      "Bradford Hillin yhdeksän kriteeriä (1965) ovat epidemiologian vakiintunut kehys kausaalisen yhteyden arviointiin. Näin BERM vertautuu kahteen nykyisin kausaaliseksi hyväksyttyyn altistukseen — niiden hyväksymishetkellä.",
    criterion: "Kriteeri",
    tobacco: "Tupakka '65",
    total: "Yhteensä",
    strongestEvidence: "Vahvin todiste",
    explanation:
      "BERM saa korkeamman kokonaispistemäärän kuin tupakka (Surgeon Generalin raportin aikaan) ja bisfenoli A (regulatorisen toiminnan alkaessa). Sen vahvimmat alueet ovat biologinen uskottavuus (mekanismi tunnetaan atomitasolla ja on FDA-validoitu) ja analogia (neljä itsenäistä rinnakkaista todistelinjaa). Sen heikoin alue on spesifisyys — mutta tämä on kalsiumbiologian ennustettu ominaisuus, ei mallin epäonnistuminen.",
    disclaimer:
      "Nämä pisteet ovat meidän arviomme. Lukijoita kannustetaan arvioimaan jokainen kriteeri itsenäisesti.",
    cta: "Lue koko Bradford Hill -analyysi",
    tapHint: "Napauta kriteeriä nähdäksesi vahvimman todisteen",
  },
} as const;

function ScoreDots({ score }: { score: number }) {
  return (
    <div className="flex gap-0.5 justify-center">
      {[1, 2, 3, 4, 5].map((i) => (
        <div
          key={i}
          className={`w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full ${
            i <= score ? "bg-accent" : "bg-foreground-muted/20"
          }`}
        />
      ))}
    </div>
  );
}

function TotalScore({ scores }: { scores: number[] }) {
  const total = scores.reduce((a, b) => a + b, 0);
  return (
    <span className="font-mono-num text-lg font-semibold">
      {total}
      <span className="text-foreground-muted font-normal text-sm">/45</span>
    </span>
  );
}

export function BradfordHillCard({ locale, prefix }: { locale: string; prefix: string }) {
  const [expanded, setExpanded] = useState<string | null>(null);
  const d = locale === "fi" ? COPY.fi : COPY.en;
  const fi = locale === "fi";

  return (
    <section className="pb-20">
      <div className="rounded-xl border border-card-border bg-card-bg p-6 sm:p-8">
        <p className="editorial-kicker text-accent mb-2">{d.kicker}</p>
        <h2 className="text-xl font-semibold mb-2">{d.title}</h2>
        <p className="text-sm text-foreground-muted leading-relaxed mb-6 max-w-3xl">{d.subtitle}</p>

        <div className="overflow-x-auto">
          <div className="min-w-[420px]">
            <div className="grid grid-cols-[1fr_70px_70px_70px] sm:grid-cols-[1fr_80px_80px_80px] gap-1 mb-1 px-3 text-xs text-foreground-muted">
              <div>{d.criterion}</div>
              <div className="text-center font-semibold text-accent">BERM</div>
              <div className="text-center">{d.tobacco}</div>
              <div className="text-center">Bisphenol A</div>
            </div>

            <div className="space-y-0.5">
              {CRITERIA.map((c) => (
                <div key={c.id}>
                  <button
                    onClick={() => setExpanded(expanded === c.id ? null : c.id)}
                    className={`w-full grid grid-cols-[1fr_70px_70px_70px] sm:grid-cols-[1fr_80px_80px_80px] gap-1 items-center px-3 py-2.5 rounded-lg transition-colors text-left ${
                      expanded === c.id
                        ? "bg-accent/5 border border-accent/20"
                        : "hover:bg-card-bg/80 border border-transparent"
                    }`}
                  >
                    <span className="text-sm font-medium">{fi ? c.name_fi : c.name_en}</span>
                    <ScoreDots score={c.berm} />
                    <ScoreDots score={c.tobacco} />
                    <ScoreDots score={c.bpa} />
                  </button>
                  {expanded === c.id && (
                    <div className="mx-3 mb-1 p-3 rounded-lg bg-background border border-card-border text-sm text-foreground-muted">
                      <span className="font-semibold text-foreground">{d.strongestEvidence}: </span>
                      {fi ? c.strongest_fi : c.strongest_en}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-[1fr_70px_70px_70px] sm:grid-cols-[1fr_80px_80px_80px] gap-1 mt-3 pt-3 border-t border-card-border px-3">
              <div className="text-sm font-semibold">{d.total}</div>
              <div className="text-center"><TotalScore scores={CRITERIA.map((c) => c.berm)} /></div>
              <div className="text-center"><TotalScore scores={CRITERIA.map((c) => c.tobacco)} /></div>
              <div className="text-center"><TotalScore scores={CRITERIA.map((c) => c.bpa)} /></div>
            </div>
          </div>
        </div>

        <p className="text-sm text-foreground-muted leading-relaxed mt-5 max-w-3xl">{d.explanation}</p>
        <p className="text-xs text-foreground-muted/60 italic mt-2">{d.disclaimer}</p>
        <p className="text-xs text-foreground-muted/50 mt-1">{d.tapHint}</p>

        <Link
          href={`${prefix}/evidence#bradford-hill`}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-accent transition-colors hover:text-accent-hover mt-4"
        >
          {d.cta} <ArrowRight size={14} />
        </Link>
      </div>
    </section>
  );
}
