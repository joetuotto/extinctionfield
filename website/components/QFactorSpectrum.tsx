"use client";

import { useState, useCallback } from "react";
import { pickCopy } from "@/lib/i18n";

const PATHWAYS = [
  {
    id: "brainstem",
    q: "Q → ∞",
    qNum: 100,
    gamma: "γ < 0",
    color: "#dc2626",
    en: {
      label: "Brainstem",
      condition: "SIDS / SUDEP",
      mechanism: "GABA excitatory (NKCC1 > KCC2) — no damping. Any resonant input amplifies without limit → fatal CSD to brainstem.",
      drug: "Bumetanide (NKCC1 block → restores inhibitory GABA)",
      outcome: "Fatal cardiorespiratory arrest",
    },
    ja: {
      label: "脳幹",
      condition: "SIDS / SUDEP",
      mechanism: "GABA興奮性（NKCC1 > KCC2）— 減衰なし。共振入力が無制限に増幅 → 脳幹への致死的CSD。",
      drug: "ブメタニド（NKCC1遮断 → 抑制性GABAを回復）",
      outcome: "致死的心肺停止",
    },
    fr: {
      label: "Tronc cérébral",
      condition: "SIDS / SUDEP",
      mechanism: "GABA excitateur (NKCC1 > KCC2) — pas d'amortissement. Toute entrée résonante s'amplifie sans limite → CSD fatal au tronc cérébral.",
      drug: "Bumétanide (bloc NKCC1 → restaure le GABA inhibiteur)",
      outcome: "Arrêt cardiorespiratoire fatal",
    },
    ko: {
      label: "뇌간",
      condition: "SIDS / SUDEP",
      mechanism: "GABA 흥분성 (NKCC1 > KCC2) — 감쇠 없음. 공진 입력이 무제한 증폭 → 뇌간으로의 치명적 CSD.",
      drug: "부메타니드 (NKCC1 차단 → 억제성 GABA 회복)",
      outcome: "치명적 심폐정지",
    },
    fi: {
      label: "Aivorunko",
      condition: "SIDS / SUDEP",
      mechanism: "GABA eksitatorinen (NKCC1 > KCC2) — ei vaimennusta. Mikä tahansa resonanssisyöte vahvistuu ilman rajaa → fataali CSD aivorunkoon.",
      drug: "Bumetanidi (NKCC1-salpaus → palauttaa inhibitorisen GABAn)",
      outcome: "Fataali sydänhengityspysähdys",
    },
  },
  {
    id: "thalamocortical",
    q: "Q ~ 20–50",
    qNum: 35,
    gamma: "γ low",
    color: "#ea580c",
    en: {
      label: "Thalamocortical",
      condition: "Absence epilepsy",
      mechanism: "Thalamic Cav3.2 (T-type) sleep spindle circuits generate 3 Hz spike-wave oscillation when damping is insufficient.",
      drug: "Ethosuximide (T-type Ca²⁺ channel block)",
      outcome: "Brief loss of consciousness, 3 Hz spike-wave",
    },
    ja: {
      label: "視床皮質",
      condition: "欠神てんかん",
      mechanism: "視床Cav3.2（T型）睡眠紡錘回路が減衰不足時に3Hzスパイク波振動を生成。",
      drug: "エトスクシミド（T型Ca²⁺チャネル遮断）",
      outcome: "短時間の意識消失、3Hzスパイク波",
    },
    fr: {
      label: "Thalamocortical",
      condition: "Épilepsie absence",
      mechanism: "Les circuits des fuseaux du sommeil thalamiques Cav3.2 (type T) génèrent une oscillation pointe-onde à 3 Hz lorsque l'amortissement est insuffisant.",
      drug: "Éthosuximide (bloc du canal Ca²⁺ de type T)",
      outcome: "Brève perte de conscience, pointe-onde 3 Hz",
    },
    ko: {
      label: "시상피질",
      condition: "결신 발작",
      mechanism: "시상 Cav3.2 (T형) 수면 방추 회로가 감쇠 부족 시 3Hz 극파 진동을 생성.",
      drug: "에토석시미드 (T형 Ca²⁺ 채널 차단)",
      outcome: "짧은 의식 소실, 3Hz 극파",
    },
    fi: {
      label: "Talamo-kortikaalinen",
      condition: "Poissaoloepilepsia",
      mechanism: "Talamuksen Cav3.2 (T-tyypin) unikäämipiirit tuottavat 3 Hz piikki-aalto-oskillaation kun vaimennus on riittämätön.",
      drug: "Etosuksimidi (T-tyypin Ca²⁺-kanavasalpaus)",
      outcome: "Lyhyt tajunnanmenetys, 3 Hz piikki-aalto",
    },
  },
  {
    id: "auditory",
    q: "Q ~ 15–30",
    qNum: 22,
    gamma: "γ low–moderate",
    color: "#f59e0b",
    en: {
      label: "Auditory pathway",
      condition: "Tinnitus",
      mechanism: "Cochlear hair cell Ca²⁺ overload → excitotoxic damage → central auditory cortex reorganization → phantom perception. α2δ-1 upregulation increases synaptic gain.",
      drug: "Gabapentin (α2δ-1 block → reduces aberrant synaptogenesis)",
      outcome: "Persistent phantom sound perception",
    },
    ja: {
      label: "聴覚経路",
      condition: "耳鳴り",
      mechanism: "蝸牛有毛細胞のCa²⁺過負荷 → 興奮毒性損傷 → 中枢聴覚皮質再編成 → 幻聴知覚。α2δ-1上方制御がシナプス利得を増加。",
      drug: "ガバペンチン（α2δ-1遮断 → 異常シナプス形成を抑制）",
      outcome: "持続的幻聴知覚",
    },
    fr: {
      label: "Voie auditive",
      condition: "Acouphènes",
      mechanism: "Surcharge Ca²⁺ des cellules ciliées cochléaires → dommages excitotoxiques → réorganisation du cortex auditif central → perception fantôme. La régulation à la hausse de α2δ-1 augmente le gain synaptique.",
      drug: "Gabapentine (bloc α2δ-1 → réduit la synaptogenèse aberrante)",
      outcome: "Perception sonore fantôme persistante",
    },
    ko: {
      label: "청각 경로",
      condition: "이명",
      mechanism: "와우 유모세포 Ca²⁺ 과부하 → 흥분독성 손상 → 중추 청각 피질 재조직화 → 환청 지각. α2δ-1 상향조절이 시냅스 이득 증가.",
      drug: "가바펜틴 (α2δ-1 차단 → 이상 시냅스 형성 감소)",
      outcome: "지속적 환청 지각",
    },
    fi: {
      label: "Kuuloreitti",
      condition: "Tinnitus",
      mechanism: "Simpukan karvasolun Ca²⁺-ylikuormitus → eksitotoksinen vaurio → keskuskuulokorteksin uudelleenjärjestäytyminen → haamuhavainto. α2δ-1-ylössäätely kasvattaa synaptista vahvistusta.",
      drug: "Gabapentiini (α2δ-1-salpaus → vähentää poikkeavaa synaptogeneesiä)",
      outcome: "Jatkuva haamuäänihavainto",
    },
  },
  {
    id: "spinal",
    q: "Q ~ 10–20",
    qNum: 15,
    gamma: "γ moderate",
    color: "#eab308",
    en: {
      label: "Spinal cord",
      condition: "Chronic pain",
      mechanism: "ELF upregulates α2δ-1 (CACNA2D1) in dorsal horn → excess excitatory synapses → central sensitization. Pain persists after tissue healing.",
      drug: "Pregabalin / Gabapentin (α2δ-1 block)",
      outcome: "Chronic neuropathic pain, allodynia",
    },
    ja: {
      label: "脊髄",
      condition: "慢性疼痛",
      mechanism: "ELFが後角のα2δ-1（CACNA2D1）を上方制御 → 過剰な興奮性シナプス → 中枢性感作。組織治癒後も疼痛が持続。",
      drug: "プレガバリン / ガバペンチン（α2δ-1遮断）",
      outcome: "慢性神経障害性疼痛、アロディニア",
    },
    fr: {
      label: "Moelle épinière",
      condition: "Douleur chronique",
      mechanism: "L'ELF régule à la hausse α2δ-1 (CACNA2D1) dans la corne dorsale → synapses excitatrices excessives → sensibilisation centrale. La douleur persiste après la guérison tissulaire.",
      drug: "Prégabaline / Gabapentine (bloc α2δ-1)",
      outcome: "Douleur neuropathique chronique, allodynie",
    },
    ko: {
      label: "척수",
      condition: "만성 통증",
      mechanism: "ELF가 후각의 α2δ-1 (CACNA2D1)을 상향조절 → 과잉 흥분성 시냅스 → 중추 감작. 조직 치유 후에도 통증 지속.",
      drug: "프레가발린 / 가바펜틴 (α2δ-1 차단)",
      outcome: "만성 신경병증성 통증, 이질통",
    },
    fi: {
      label: "Selkäydin",
      condition: "Krooninen kipu",
      mechanism: "ELF säätelee α2δ-1:tä (CACNA2D1) ylöspäin dorsaalisarvessa → ylimääräiset eksittatoriset synapsit → sentraalinen sensitisaatio. Kipu jatkuu kudoksen parantuessa.",
      drug: "Pregabaliini / Gabapentiini (α2δ-1-salpaus)",
      outcome: "Krooninen neuropaattinen kipu, allodynia",
    },
  },
  {
    id: "cortex",
    q: "Q ~ 8–15",
    qNum: 12,
    gamma: "γ moderate",
    color: "#84cc16",
    en: {
      label: "Cortex",
      condition: "ASD / ADHD",
      mechanism: "CACNA1C variants alter cortical E/I balance. ASD: excitation-dominant (social withdrawal). ADHD: prefrontal hypofunction (dopamine/Ca²⁺ interaction).",
      drug: "Bumetanide (ASD trials: NKCC1 → GABA switch); Methylphenidate (ADHD: DA → Ca²⁺ modulation)",
      outcome: "Neurodevelopmental spectrum",
    },
    ja: {
      label: "皮質",
      condition: "ASD / ADHD",
      mechanism: "CACNA1C変異体が皮質E/Iバランスを変化。ASD：興奮優位（社会的引きこもり）。ADHD：前頭前野機能低下（ドーパミン/Ca²⁺相互作用）。",
      drug: "ブメタニド（ASD試験：NKCC1 → GABAスイッチ）; メチルフェニデート（ADHD：DA → Ca²⁺調節）",
      outcome: "神経発達スペクトラム",
    },
    fr: {
      label: "Cortex",
      condition: "ASD / ADHD",
      mechanism: "Les variants CACNA1C altèrent l'équilibre E/I cortical. ASD : dominance excitatrice (retrait social). ADHD : hypofonction préfrontale (interaction dopamine/Ca²⁺).",
      drug: "Bumétanide (essais ASD : NKCC1 → commutation GABA) ; Méthylphénidate (ADHD : DA → modulation Ca²⁺)",
      outcome: "Spectre neurodéveloppemental",
    },
    ko: {
      label: "피질",
      condition: "ASD / ADHD",
      mechanism: "CACNA1C 변이체가 피질 E/I 균형을 변경. ASD: 흥분 우세 (사회적 위축). ADHD: 전전두엽 기능저하 (도파민/Ca²⁺ 상호작용).",
      drug: "부메타니드 (ASD 시험: NKCC1 → GABA 전환); 메틸페니데이트 (ADHD: DA → Ca²⁺ 조절)",
      outcome: "신경발달 스펙트럼",
    },
    fi: {
      label: "Korteksi",
      condition: "ASD / ADHD",
      mechanism: "CACNA1C-variantit muuttavat kortikaalista E/I-tasapainoa. ASD: eksitaatiodominantti (sosiaalinen vetäytyminen). ADHD: prefrontaalinen hypoaktiviteetti (dopamiini/Ca²⁺-vuorovaikutus).",
      drug: "Bumetanidi (ASD-tutkimukset: NKCC1 → GABA-kytkin); Metyylifenidaatti (ADHD: DA → Ca²⁺-modulaatio)",
      outcome: "Neurokehityksellinen spektri",
    },
  },
  {
    id: "meningeal",
    q: "Q ~ 5–15",
    qNum: 10,
    gamma: "γ moderate",
    color: "#22c55e",
    en: {
      label: "Meningeal / trigeminal",
      condition: "Migraine",
      mechanism: "CSD propagates across cortex at 3–5 mm/min → activates meningeal trigeminal afferents → CGRP release → vasodilation + headache. CACNA1A GoF (FHM1) lowers threshold.",
      drug: "Valproate, Topiramate (Q↓); CGRP antibodies (downstream block)",
      outcome: "Aura + trigeminal headache",
    },
    ja: {
      label: "髄膜 / 三叉神経",
      condition: "片頭痛",
      mechanism: "CSDが皮質を3-5 mm/分で伝播 → 髄膜三叉神経求心路を活性化 → CGRP放出 → 血管拡張 + 頭痛。CACNA1A GoF（FHM1）が閾値を低下。",
      drug: "バルプロ酸、トピラマート（Q低下）; CGRP抗体（下流遮断）",
      outcome: "前兆 + 三叉神経性頭痛",
    },
    fr: {
      label: "Méningé / trigéminal",
      condition: "Migraine",
      mechanism: "La CSD se propage à travers le cortex à 3-5 mm/min → active les afférences trigéminales méningées → libération de CGRP → vasodilatation + céphalée. CACNA1A GoF (FHM1) abaisse le seuil.",
      drug: "Valproate, Topiramate (Q↓) ; anticorps CGRP (bloc en aval)",
      outcome: "Aura + céphalée trigéminale",
    },
    ko: {
      label: "수막 / 삼차신경",
      condition: "편두통",
      mechanism: "CSD가 피질을 3-5 mm/분으로 전파 → 수막 삼차신경 구심로 활성화 → CGRP 방출 → 혈관확장 + 두통. CACNA1A GoF (FHM1)이 역치 저하.",
      drug: "발프로산, 토피라메이트 (Q 저하); CGRP 항체 (하류 차단)",
      outcome: "전조 + 삼차신경성 두통",
    },
    fi: {
      label: "Meningeaalinen / trigeminaalinen",
      condition: "Migreeni",
      mechanism: "CSD leviää aivokuorella 3–5 mm/min → aktivoi meningeaaliset trigeminaaliafferentit → CGRP-vapautuminen → vasodilataatio + päänsärky. CACNA1A GoF (FHM1) alentaa kynnystä.",
      drug: "Valproaatti, Topiramaatti (Q↓); CGRP-vasta-aineet (alavirtasalpaus)",
      outcome: "Aura + trigeminaalinen päänsärky",
    },
  },
  {
    id: "hypothalamic",
    q: "Q ~ 10–20",
    qNum: 15,
    gamma: "γ circadian",
    color: "#3b82f6",
    en: {
      label: "Hypothalamus / SCN",
      condition: "Cluster headache",
      mechanism: "SCN Ca²⁺ oscillation phase-locked to circadian cycle. Cav1.2 window current → trigeminal-autonomic activation. Attacks at 00–03 h with seasonal periodicity.",
      drug: "Verapamil (L-type block, first-line); Melatonin; Psilocybin (tryptamine reset)",
      outcome: "Unilateral trigeminal-autonomic attacks",
    },
    ja: {
      label: "視床下部 / SCN",
      condition: "群発頭痛",
      mechanism: "SCN Ca²⁺振動が概日周期に位相ロック。Cav1.2ウィンドウ電流 → 三叉神経-自律神経活性化。00-03時に季節性周期で発作。",
      drug: "ベラパミル（L型遮断、第一選択）; メラトニン; シロシビン（トリプタミンリセット）",
      outcome: "片側三叉神経-自律神経発作",
    },
    fr: {
      label: "Hypothalamus / SCN",
      condition: "Algie vasculaire de la face",
      mechanism: "L'oscillation Ca²⁺ du SCN est verrouillée en phase sur le cycle circadien. Courant de fenêtre Cav1.2 → activation trigémino-autonome. Attaques à 00-03 h avec périodicité saisonnière.",
      drug: "Vérapamil (bloc type L, première ligne) ; Mélatonine ; Psilocybine (réinitialisation tryptamine)",
      outcome: "Attaques trigémino-autonomes unilatérales",
    },
    ko: {
      label: "시상하부 / SCN",
      condition: "군발 두통",
      mechanism: "SCN Ca²⁺ 진동이 일주기 리듬에 위상 고정. Cav1.2 창 전류 → 삼차-자율신경 활성화. 00-03시에 계절성 주기로 발작.",
      drug: "베라파밀 (L형 차단, 1차); 멜라토닌; 실로시빈 (트립타민 리셋)",
      outcome: "편측 삼차-자율신경 발작",
    },
    fi: {
      label: "Hypotalamus / SCN",
      condition: "Klusteripäänsärky",
      mechanism: "SCN:n Ca²⁺-oskillaatio vaihelukittu vuorokausirytmiin. Cav1.2-ikkunavirta → trigeminaalis-autonominen aktivaatio. Kohtaukset klo 00–03, kausittainen periodisuus.",
      drug: "Verapamiili (L-tyypin salpaus, ensisijaislääke); Melatoniini; Psilosybiini (tryptamiiniresetti)",
      outcome: "Yksipuoliset trigeminaalis-autonomiset kohtaukset",
    },
  },
] as const;

const UI_COPY = {
  en: {
    title: "Q-Factor Spectrum",
    subtitle: "Seven neural pathways, one damped oscillator equation",
    equation: "Q = ω₀ / (2γ)",
    eqDesc: "where γ is the net GABAergic damping coefficient",
    selectPrompt: "Select a pathway to explore",
    mechanism: "Mechanism",
    treatment: "Ca²⁺-targeted treatment",
    outcome: "Clinical outcome",
    damping: "Damping",
    qFactor: "Q-factor",
    fatal: "Fatal",
    severe: "Severe",
    moderate: "Moderate",
    normal: "Normal",
    highQ: "High Q (underdamped)",
    lowQ: "Low Q (overdamped)",
  },
  ja: {
    title: "Q因子スペクトル",
    subtitle: "7つの神経経路、1つの減衰振動子方程式",
    equation: "Q = ω₀ / (2γ)",
    eqDesc: "ここでγはネットGABA作動性減衰係数",
    selectPrompt: "探索する経路を選択",
    mechanism: "メカニズム",
    treatment: "Ca²⁺標的治療",
    outcome: "臨床転帰",
    damping: "減衰",
    qFactor: "Q因子",
    fatal: "致死的",
    severe: "重度",
    moderate: "中等度",
    normal: "正常",
    highQ: "高Q（不足減衰）",
    lowQ: "低Q（過減衰）",
  },
  fr: {
    title: "Spectre du facteur Q",
    subtitle: "Sept voies neurales, une équation d'oscillateur amorti",
    equation: "Q = ω₀ / (2γ)",
    eqDesc: "où γ est le coefficient d'amortissement GABAergique net",
    selectPrompt: "Sélectionnez une voie à explorer",
    mechanism: "Mécanisme",
    treatment: "Traitement ciblé Ca²⁺",
    outcome: "Issue clinique",
    damping: "Amortissement",
    qFactor: "Facteur Q",
    fatal: "Fatal",
    severe: "Sévère",
    moderate: "Modéré",
    normal: "Normal",
    highQ: "Q élevé (sous-amorti)",
    lowQ: "Q faible (sur-amorti)",
  },
  ko: {
    title: "Q인자 스펙트럼",
    subtitle: "7개의 신경 경로, 하나의 감쇠 진동자 방정식",
    equation: "Q = ω₀ / (2γ)",
    eqDesc: "여기서 γ는 순 GABA성 감쇠 계수",
    selectPrompt: "탐색할 경로를 선택하세요",
    mechanism: "메커니즘",
    treatment: "Ca²⁺ 표적 치료",
    outcome: "임상 결과",
    damping: "감쇠",
    qFactor: "Q인자",
    fatal: "치명적",
    severe: "중증",
    moderate: "중등도",
    normal: "정상",
    highQ: "높은 Q (부족감쇠)",
    lowQ: "낮은 Q (과감쇠)",
  },
  fi: {
    title: "Q-tekijäspektri",
    subtitle: "Seitsemän hermorataa, yksi vaimennetun oskillaattorin yhtälö",
    equation: "Q = ω₀ / (2γ)",
    eqDesc: "missä γ on netto-GABAerginen vaimennuskerroin",
    selectPrompt: "Valitse hermorata tutkittavaksi",
    mechanism: "Mekanismi",
    treatment: "Ca²⁺-kohdistettu hoito",
    outcome: "Kliininen lopputulema",
    damping: "Vaimennus",
    qFactor: "Q-tekijä",
    fatal: "Fataali",
    severe: "Vakava",
    moderate: "Kohtalainen",
    normal: "Normaali",
    highQ: "Korkea Q (alivaimennettu)",
    lowQ: "Matala Q (ylivaimennettu)",
  },
} as const;

type PathwayCopy = (typeof PATHWAYS)[number]["en"];

function pickPathwayCopy(
  pathway: (typeof PATHWAYS)[number],
  locale: string,
): PathwayCopy {
  return (
    (pathway as unknown as Record<string, PathwayCopy>)[locale] ?? pathway.en
  );
}

export function QFactorSpectrum({ locale }: { locale: string }) {
  const [selected, setSelected] = useState<string | null>(null);
  const t = pickCopy(UI_COPY, locale);

  const handleSelect = useCallback((id: string) => {
    setSelected((prev) => (prev === id ? null : id));
  }, []);

  const selectedPathway = PATHWAYS.find((p) => p.id === selected);
  const selectedCopy = selectedPathway ? pickPathwayCopy(selectedPathway, locale) : undefined;

  return (
    <div className="rounded-2xl border border-card-border bg-card-bg overflow-hidden">
      <div className="p-6 sm:p-8" style={{ background: "#0f172a" }}>
        <h3 className="text-lg sm:text-xl font-semibold text-white mb-1">{t.title}</h3>
        <p className="text-sm text-white/60 mb-2">{t.subtitle}</p>
        <p className="font-mono text-sm text-blue-300 mb-1">{t.equation}</p>
        <p className="text-xs text-white/40">{t.eqDesc}</p>

        <div
          className="chart-surface mt-6 !border-white/10 !shadow-none"
          style={{
            background:
              "linear-gradient(145deg, rgba(30,41,59,0.82), rgba(15,23,42,0.96))",
          }}
        >
          <div className="chart-scroll">
            <svg
              viewBox="0 0 820 176"
              className="chart-svg min-w-[780px] w-full"
              role="img"
              aria-label={t.title}
            >
              <defs>
                <linearGradient id="qGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#dc2626" stopOpacity="0.34" />
                  <stop offset="30%" stopColor="#f59e0b" stopOpacity="0.24" />
                  <stop offset="70%" stopColor="#22c55e" stopOpacity="0.18" />
                  <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.12" />
                </linearGradient>
                <filter id="qGlow" x="-100%" y="-100%" width="300%" height="300%">
                  <feGaussianBlur stdDeviation="4" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              <line x1="60" y1="57" x2="760" y2="57" stroke="rgba(255,255,255,0.08)" />
              <rect
                x="60"
                y="68"
                width="700"
                height="44"
                rx="22"
                fill="url(#qGrad)"
                stroke="rgba(255,255,255,0.13)"
              />

              <text x="60" y="43" fill="rgba(255,255,255,0.55)" fontSize="10" fontFamily="monospace">
                {t.highQ}
              </text>
              <text x="760" y="43" fill="rgba(255,255,255,0.55)" fontSize="10" fontFamily="monospace" textAnchor="end">
                {t.lowQ}
              </text>

              <text x="80" y="139" fill="#f87171" fontSize="9" opacity="0.8">{t.fatal}</text>
              <text x="280" y="139" fill="#fbbf24" fontSize="9" opacity="0.8">{t.severe}</text>
              <text x="500" y="139" fill="#4ade80" fontSize="9" opacity="0.8">{t.moderate}</text>
              <text x="740" y="139" fill="#60a5fa" fontSize="9" opacity="0.8" textAnchor="end">{t.normal}</text>

              {PATHWAYS.map((p, i) => {
                const x = 80 + (i / (PATHWAYS.length - 1)) * 660;
                const isSelected = selected === p.id;
                const copy = pickPathwayCopy(p, locale);
                return (
                  <g
                    key={p.id}
                    onClick={() => handleSelect(p.id)}
                    style={{ cursor: "pointer" }}
                    role="button"
                    aria-label={`${copy.label}: ${copy.condition}`}
                    aria-pressed={isSelected}
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        handleSelect(p.id);
                      }
                    }}
                  >
                    <circle
                      cx={x}
                      cy="90"
                      r={isSelected ? 19 : 15}
                      fill={isSelected ? p.color : `${p.color}3d`}
                      stroke={p.color}
                      strokeWidth={isSelected ? 3 : 1.5}
                      filter={isSelected ? "url(#qGlow)" : undefined}
                      style={{ transition: "all 0.2s" }}
                    />
                    <text
                      x={x}
                      y="93"
                      textAnchor="middle"
                      fill="white"
                      fontSize="8"
                      fontWeight="bold"
                      style={{ pointerEvents: "none" }}
                    >
                      {p.q.replace("Q ", "").replace("Q→", "").replace("~ ", "")}
                    </text>
                    <text
                      x={x}
                      y="160"
                      textAnchor="middle"
                      fill={isSelected ? p.color : "rgba(255,255,255,0.42)"}
                      fontSize="9"
                      fontWeight="bold"
                      style={{ pointerEvents: "none", transition: "all 0.2s" }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </text>

                    {isSelected && (
                      <>
                        <line x1={x} y1="48" x2={x} y2="69" stroke={p.color} strokeWidth="1.5" strokeDasharray="3,3" />
                        <circle cx={x} cy="45" r="4" fill={p.color} />
                      </>
                    )}
                  </g>
                );
              })}
            </svg>
          </div>

          {!selectedPathway && (
            <p className="mb-3 text-center text-xs text-white/45">{t.selectPrompt}</p>
          )}

          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {PATHWAYS.map((p, i) => {
              const copy = pickPathwayCopy(p, locale);
              const isSelected = selected === p.id;

              return (
                <button
                  key={`legend-${p.id}`}
                  type="button"
                  aria-pressed={isSelected}
                  onClick={() => handleSelect(p.id)}
                  className="min-w-0 rounded-xl border px-3 py-2.5 text-left transition-colors hover:bg-white/[0.07] focus-visible:outline-2 focus-visible:outline-offset-2"
                  style={{
                    backgroundColor: isSelected ? `${p.color}18` : "rgba(255,255,255,0.025)",
                    borderColor: isSelected ? `${p.color}99` : "rgba(255,255,255,0.1)",
                    outlineColor: p.color,
                  }}
                >
                  <span className="flex min-w-0 items-start gap-2.5">
                    <span
                      className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full font-mono text-[9px] font-bold text-white"
                      style={{ backgroundColor: p.color }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="flex min-w-0 flex-wrap items-baseline justify-between gap-x-2 gap-y-0.5">
                        <span className="break-words text-xs font-semibold leading-snug text-white">
                          {copy.label}
                        </span>
                        <span className="shrink-0 font-mono text-[10px] text-white/50">{p.q}</span>
                      </span>
                      <span className="mt-0.5 block break-words text-[11px] leading-snug text-white/45">
                        {copy.condition}
                      </span>
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {selectedPathway && selectedCopy && (
        <div className="p-6 sm:p-8 border-t border-card-border space-y-4" style={{ borderColor: `${selectedPathway.color}30` }}>
          <div className="mb-2 flex flex-wrap items-start gap-3">
            <span
              className="mt-1 inline-block h-3 w-3 shrink-0 rounded-full"
              style={{ backgroundColor: selectedPathway.color }}
            />
            <h4 className="min-w-0 flex-1 basis-[14rem] break-words text-sm font-semibold leading-snug">
              {selectedCopy.label}: {selectedCopy.condition}
            </h4>
            <span className="shrink-0 rounded-full px-2 py-0.5 font-mono text-xs" style={{ backgroundColor: `${selectedPathway.color}15`, color: selectedPathway.color }}>
              {selectedPathway.q} · {selectedPathway.gamma}
            </span>
          </div>

          <div>
            <p className="text-xs font-medium text-foreground-muted uppercase tracking-wide mb-1">{t.mechanism}</p>
            <p className="text-sm leading-relaxed">{selectedCopy.mechanism}</p>
          </div>

          <div>
            <p className="text-xs font-medium text-foreground-muted uppercase tracking-wide mb-1">{t.treatment}</p>
            <p className="text-sm leading-relaxed text-accent">{selectedCopy.drug}</p>
          </div>

          <div>
            <p className="text-xs font-medium text-foreground-muted uppercase tracking-wide mb-1">{t.outcome}</p>
            <p className="text-sm leading-relaxed font-medium" style={{ color: selectedPathway.color }}>{selectedCopy.outcome}</p>
          </div>
        </div>
      )}
    </div>
  );
}
