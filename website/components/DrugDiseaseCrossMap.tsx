"use client";

import { useState, useCallback } from "react";
import { pickCopy } from "@/lib/i18n";

interface DrugRow {
  id: string;
  drug: string;
  target: string;
  diseases: string[];
}

const DRUGS: DrugRow[] = [
  { id: "ccb", drug: "CCBs (nifedipine)", target: "Cav1.2 (L-type)", diseases: ["hypertension", "preterm", "preeclampsia", "migraine", "angina"] },
  { id: "verapamil", drug: "Verapamil", target: "Cav1.2 (use-dep.)", diseases: ["t1d", "cluster", "arrhythmia", "hypertension", "migraine"] },
  { id: "isradipine", drug: "Isradipine", target: "Cav1.3 (L-type)", diseases: ["parkinsons", "hypertension"] },
  { id: "ethosuximide", drug: "Ethosuximide", target: "Cav3.x (T-type)", diseases: ["absence_epilepsy"] },
  { id: "gabapentinoid", drug: "Gabapentin/Pregabalin", target: "α2δ-1 (CACNA2D1)", diseases: ["chronic_pain", "epilepsy", "migraine", "anxiety", "tinnitus"] },
  { id: "nimodipine", drug: "Nimodipine", target: "Cav1.2 (CNS)", diseases: ["vasospasm", "alzheimers"] },
  { id: "lithium", drug: "Lithium", target: "GSK-3β → CRY", diseases: ["bipolar", "suicide_prev", "alzheimers", "cluster"] },
  { id: "melatonin", drug: "Melatonin", target: "MT1/MT2 → Ca²⁺↓", diseases: ["insomnia", "cluster", "oxidative_stress"] },
  { id: "semaglutide", drug: "Semaglutide (GLP-1)", target: "GLP-1R → Ca²⁺-ERK", diseases: ["t2d", "obesity", "alzheimers", "cvd", "nash", "ckd"] },
  { id: "psilocybin", drug: "Psilocybin", target: "5-HT2A → Ca²⁺ burst", diseases: ["cluster", "depression", "ptsd", "ocd"] },
  { id: "caffeine", drug: "Caffeine", target: "A₁ → VGCC mod.", diseases: ["parkinsons", "alzheimers", "apnea"] },
  { id: "riluzole", drug: "Riluzole", target: "Na⁺/Ca²⁺ → Glu↓", diseases: ["als"] },
  { id: "coq10", drug: "CoQ10", target: "Mito ETC + ROS↓", diseases: ["male_infertility", "oxidative_stress", "migraine"] },
  { id: "bumetanide", drug: "Bumetanide", target: "NKCC1 → Cl⁻ switch", diseases: ["neonatal_seizures", "asd"] },
];

const DISEASES: { id: string; en: string; fi: string }[] = [
  { id: "hypertension", en: "Hypertension", fi: "Verenpainetauti" },
  { id: "t1d", en: "Type 1 diabetes", fi: "Tyypin 1 diabetes" },
  { id: "t2d", en: "Type 2 diabetes", fi: "Tyypin 2 diabetes" },
  { id: "obesity", en: "Obesity", fi: "Lihavuus" },
  { id: "preterm", en: "Preterm labor", fi: "Ennenaikainen synnytys" },
  { id: "preeclampsia", en: "Pre-eclampsia", fi: "Pre-eklampsia" },
  { id: "cluster", en: "Cluster headache", fi: "Klusteripäänsärky" },
  { id: "migraine", en: "Migraine", fi: "Migreeni" },
  { id: "epilepsy", en: "Epilepsy", fi: "Epilepsia" },
  { id: "absence_epilepsy", en: "Absence epilepsy", fi: "Poissaoloepilepsia" },
  { id: "neonatal_seizures", en: "Neonatal seizures", fi: "Vastasyntyneen kohtaukset" },
  { id: "chronic_pain", en: "Chronic pain", fi: "Krooninen kipu" },
  { id: "tinnitus", en: "Tinnitus", fi: "Tinnitus" },
  { id: "alzheimers", en: "Alzheimer's", fi: "Alzheimer" },
  { id: "parkinsons", en: "Parkinson's", fi: "Parkinson" },
  { id: "als", en: "ALS", fi: "ALS" },
  { id: "asd", en: "Autism (ASD)", fi: "Autismi (ASD)" },
  { id: "depression", en: "Depression", fi: "Masennus" },
  { id: "bipolar", en: "Bipolar disorder", fi: "Kaksisuuntainen" },
  { id: "anxiety", en: "Anxiety", fi: "Ahdistus" },
  { id: "ptsd", en: "PTSD", fi: "PTSD" },
  { id: "ocd", en: "OCD", fi: "OCD" },
  { id: "insomnia", en: "Insomnia", fi: "Unettomuus" },
  { id: "cvd", en: "CVD", fi: "Sydänsairaus" },
  { id: "nash", en: "NASH", fi: "NASH" },
  { id: "ckd", en: "CKD", fi: "Munuaistauti" },
  { id: "male_infertility", en: "Male infertility", fi: "Miehen hedelmättömyys" },
  { id: "oxidative_stress", en: "Oxidative stress", fi: "Oksidatiivinen stressi" },
  { id: "vasospasm", en: "Cerebral vasospasm", fi: "Aivoverisuonispasmi" },
  { id: "angina", en: "Angina", fi: "Angina" },
  { id: "arrhythmia", en: "Arrhythmia", fi: "Rytmihäiriö" },
  { id: "suicide_prev", en: "Suicide prevention", fi: "Itsemurhien ehkäisy" },
  { id: "apnea", en: "Apnea", fi: "Apnea" },
];

const UI_COPY = {
  en: { title: "Drug–disease cross-map", subtitle: "Each drug’s Ca²⁺ target and the conditions it treats. Hover over a drug or disease to highlight connections.", drug: "Drug", target: "Ca²⁺ target", connections: "connections" },
  fi: { title: "Lääke–sairaus-ristikartta", subtitle: "Jokaisen lääkkeen Ca²⁺-kohde ja sen hoitamat tilat. Osoita lääkettä tai sairautta nähdäksesi yhteydet.", drug: "Lääke", target: "Ca²⁺-kohde", connections: "yhteydet" },
  ja: { title: "薬物–疾患クロスマップ", subtitle: "各薬物のCa²⁺標的とその治療対象疾患。薬物または疾患にホバーして接続を確認。", drug: "薬物", target: "Ca²⁺標的", connections: "接続" },
  fr: { title: "Carte croisée médicament–maladie", subtitle: "La cible Ca²⁺ de chaque médicament et les pathologies qu’il traite. Survolez un médicament ou une maladie pour mettre en évidence les connexions.", drug: "Médicament", target: "Cible Ca²⁺", connections: "connexions" },
  ko: { title: "약물-질환 교차 맵", subtitle: "각 약물의 Ca²⁺ 표적과 치료 대상 질환. 약물 또는 질환 위에 마우스를 올려 연결을 확인하세요.", drug: "약물", target: "Ca²⁺ 표적", connections: "연결" },
} as const;

export function DrugDiseaseCrossMap({ locale }: { locale: string }) {
  const [hoveredDrug, setHoveredDrug] = useState<string | null>(null);
  const [hoveredDisease, setHoveredDisease] = useState<string | null>(null);
  const lang = locale === "fi" ? "fi" : "en";

  const activeDrugsFromDisease = hoveredDisease
    ? DRUGS.filter((d) => d.diseases.includes(hoveredDisease)).map((d) => d.id)
    : [];

  const handleDrugEnter = useCallback((id: string) => { setHoveredDrug(id); setHoveredDisease(null); }, []);
  const handleDiseaseEnter = useCallback((id: string) => { setHoveredDisease(id); setHoveredDrug(null); }, []);
  const handleLeave = useCallback(() => { setHoveredDrug(null); setHoveredDisease(null); }, []);

  const usedDiseases = DISEASES.filter((d) => DRUGS.some((dr) => dr.diseases.includes(d.id)));

  const t = pickCopy(UI_COPY, locale);

  return (
    <div className="mt-10">
      <h3 className="text-lg font-semibold mb-1">{t.title}</h3>
      <p className="text-sm text-foreground-muted mb-6 max-w-3xl">{t.subtitle}</p>

      <div className="overflow-x-auto -mx-6 px-6">
        <table className="text-xs w-full border-collapse min-w-[800px]">
          <thead>
            <tr>
              <th className="text-left p-2 sticky left-0 bg-background z-10 font-medium text-foreground-muted">{t.drug}</th>
              <th className="text-left p-2 font-medium text-foreground-muted">{t.target}</th>
              {usedDiseases.map((d) => (
                <th
                  key={d.id}
                  className="p-1 text-center font-normal"
                  style={{
                    color: hoveredDisease === d.id ? "var(--accent)" : undefined,
                    fontWeight: hoveredDisease === d.id ? 600 : undefined,
                  }}
                  onMouseEnter={() => handleDiseaseEnter(d.id)}
                  onMouseLeave={handleLeave}
                >
                  <span className="writing-mode-vertical inline-block" style={{ writingMode: "vertical-rl", transform: "rotate(180deg)", maxHeight: "5rem" }}>
                    {d[lang]}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {DRUGS.map((drug) => {
              const isHighlightedRow = hoveredDrug === drug.id || activeDrugsFromDisease.includes(drug.id);
              return (
                <tr
                  key={drug.id}
                  onMouseEnter={() => handleDrugEnter(drug.id)}
                  onMouseLeave={handleLeave}
                  className="transition-colors"
                  style={{ backgroundColor: isHighlightedRow ? "var(--accent-bg, rgba(59,130,246,0.06))" : undefined }}
                >
                  <td className="p-2 font-medium sticky left-0 bg-background z-10 whitespace-nowrap" style={{ color: isHighlightedRow ? "var(--accent)" : undefined }}>
                    {drug.drug}
                  </td>
                  <td className="p-2 text-foreground-muted font-mono whitespace-nowrap">{drug.target}</td>
                  {usedDiseases.map((d) => {
                    const hasConnection = drug.diseases.includes(d.id);
                    const isActive =
                      (hoveredDrug === drug.id && hasConnection) ||
                      (hoveredDisease === d.id && hasConnection);
                    return (
                      <td key={d.id} className="p-1 text-center">
                        {hasConnection ? (
                          <span
                            className="inline-block w-4 h-4 rounded-sm transition-all"
                            style={{
                              backgroundColor: isActive ? "#3b82f6" : "rgba(59,130,246,0.15)",
                              transform: isActive ? "scale(1.3)" : "scale(1)",
                            }}
                          />
                        ) : (
                          <span className="inline-block w-4 h-4 rounded-sm" style={{ backgroundColor: "rgba(128,128,128,0.05)" }} />
                        )}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
