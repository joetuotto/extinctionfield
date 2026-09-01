"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { InlineReferenceText } from "@/components/InlineReferenceText";
import { pickCopy } from "@/lib/i18n";

interface Criterion {
  id: string;
  name: Record<string, string>;
  berm: number;
  tobacco: number;
  bpa: number;
  strongest: Record<string, string>;
}

const CRITERIA: Criterion[] = [
  {
    id: "strength",
    name: { en: "Strength of Association", fi: "Yhteyden voimakkuus", ja: "関連の強さ", fr: "Force de l'association", ko: "관련의 강도" },
    berm: 3, tobacco: 5, bpa: 3,
    strongest: { en: "Shift work MetS OR 2.17 + CCB 264k HR 0.79–0.83 + Klimentidis p=1.2×10⁻⁷ + Levine −51.6% sperm", fi: "Vuorotyö MetS OR 2,17 + CCB 264k HR 0,79–0,83 + Klimentidis p=1,2×10⁻⁷ + Levine −51,6 % siittiöt", ja: "交代勤務 MetS OR 2.17 + CCB 264k HR 0.79–0.83 + Klimentidis p=1.2×10⁻⁷ + Levine −51.6%精子", fr: "Travail posté MetS OR 2,17 + CCB 264k HR 0,79–0,83 + Klimentidis p=1,2×10⁻⁷ + Levine −51,6 % spermatozoïdes", ko: "교대근무 MetS OR 2.17 + CCB 264k HR 0.79–0.83 + Klimentidis p=1.2×10⁻⁷ + Levine −51.6% 정자" },
  },
  {
    id: "consistency",
    name: { en: "Consistency", fi: "Johdonmukaisuus", ja: "一貫性", fr: "Cohérence des résultats", ko: "일관성" },
    berm: 4, tobacco: 4, bpa: 4,
    strongest: { en: "Replication contradiction RESOLVED: 3 moderators predict outcomes (species p=0.002, duration p=0.001, pulsation p=0.048). 92% chronic animal studies positive. Validated by [[ref:weller2025_dna|Weller 2025]] (n=517).", fi: "Replikaatioristiriita RATKAISTU: 3 moderaattoria ennustavat tuloksia (laji p=0,002, kesto p=0,001, pulsaatio p=0,048). 92 % kroonisista eläintutkimuksista positiivisia. Validoitu [[ref:weller2025_dna|Weller 2025]] (n=517).", ja: "再現性の矛盾は解決：3つの調節因子が結果を予測する（種 p=0.002、期間 p=0.001、パルス p=0.048）。慢性動物研究の92%が陽性。[[ref:weller2025_dna|Weller 2025]]（n=517）により検証済み。", fr: "Contradiction de réplication RÉSOLUE : 3 modérateurs prédisent les résultats (espèce p=0,002, durée p=0,001, pulsation p=0,048). 92 % des études animales chroniques sont positives. Validé par [[ref:weller2025_dna|Weller 2025]] (n=517).", ko: "재현성 모순 해결: 3개 조절인자가 결과를 예측한다(종 p=0.002, 기간 p=0.001, 펄스 p=0.048). 만성 동물 연구의 92%가 양성이다. [[ref:weller2025_dna|Weller 2025]](n=517)로 검증되었다." },
  },
  {
    id: "specificity",
    name: { en: "Specificity", fi: "Kohdentuvuus", ja: "特異性", fr: "Spécificité", ko: "특이성" },
    berm: 2, tobacco: 2, bpa: 2,
    strongest: { en: "Technology-specific: different frequency → different organ → different health outcome", fi: "Teknologiakohtainen: eri taajuus → eri elin → eri terveysvaikutus", ja: "技術特異的：異なる周波数 → 異なる臓器 → 異なる健康影響", fr: "Spécifique à la technologie : fréquence différente → organe différent → effet sanitaire différent", ko: "기술 특이적: 다른 주파수 → 다른 장기 → 다른 건강 결과" },
  },
  {
    id: "temporality",
    name: { en: "Temporality", fi: "Ajallinen järjestys", ja: "時間的先行性", fr: "Temporalité", ko: "시간적 선행성" },
    berm: 4, tobacco: 5, bpa: 3,
    strongest: { en: "5 specific technology–health pairs, each with 0–5 year lag", fi: "5 spesifiä teknologia–terveys-paria, kukin 0–5 vuoden viiveellä", ja: "5つの特定の技術-健康ペア、それぞれ0〜5年の遅延", fr: "5 paires technologie–santé spécifiques, chacune avec un décalage de 0 à 5 ans", ko: "5개의 특정 기술-건강 쌍, 각각 0~5년의 지연" },
  },
  {
    id: "gradient",
    name: { en: "Biological Gradient", fi: "Annos-vaste", ja: "生物学的勾配", fr: "Gradient biologique", ko: "생물학적 용량-반응" },
    berm: 4, tobacco: 4, bpa: 3,
    strongest: { en: "3D gradient: layer count × priming duration × recovery time", fi: "3D-gradientti: kerrosten lukumäärä × priming-kesto × palautumisaika", ja: "3D勾配：層数 × プライミング期間 × 回復時間", fr: "Gradient 3D : nombre de couches × durée d'amorçage × temps de récupération", ko: "3D 기울기: 층 수 × 프라이밍 기간 × 회복 시간" },
  },
  {
    id: "plausibility",
    name: { en: "Biological Plausibility", fi: "Biologinen uskottavuus", ja: "生物学的妥当性", fr: "Plausibilité biologique", ko: "생물학적 타당성" },
    berm: 5, tobacco: 2, bpa: 4,
    strongest: { en: "Schwan equation + Cav3 structure + FDA-approved TheraBionic", fi: "Schwanin yhtälö + Cav3-rakenne + FDA-hyväksytty TheraBionic", ja: "Schwan方程式 + Cav3構造 + FDA承認TheraBionic", fr: "Équation de Schwan + structure Cav3 + TheraBionic approuvé FDA", ko: "Schwan 방정식 + Cav3 구조 + FDA 승인 TheraBionic" },
  },
  {
    id: "coherence",
    name: { en: "Coherence", fi: "Koherenssi", ja: "整合性", fr: "Cohérence", ko: "정합성" },
    berm: 4, tobacco: 4, bpa: 3,
    strongest: { en: "Explains 5 anomalies that conventional explanations cannot (layered model)", fi: "Selittää 5 anomaliaa joita konventionaaliset selitykset eivät (kerrostumamalli)", ja: "従来の説明では不可能な5つの異常を説明（階層モデル）", fr: "Explique 5 anomalies que les explications conventionnelles ne peuvent pas (modèle en couches)", ko: "기존 설명으로는 불가능한 5가지 이상 현상을 설명(계층 모델)" },
  },
  {
    id: "experiment",
    name: { en: "Experimental Evidence", fi: "Kokeellinen näyttö", ja: "実験的証拠", fr: "Preuves expérimentales", ko: "실험적 증거" },
    berm: 4, tobacco: 3, bpa: 4,
    strongest: { en: "TheraBionic (FDA, human) + Faraday bedroom intervention testable + shift worker EMF-free night", fi: "TheraBionic (FDA, ihminen) + Faraday-makuuhuone-interventio testattavissa + vuorotyöntekijöiden EMF-vapaa yö", ja: "TheraBionic（FDA、ヒト）+ ファラデー寝室介入テスト可能 + 交代勤務者のEMFフリー夜間", fr: "TheraBionic (FDA, humain) + intervention chambre de Faraday testable + nuit sans EMF pour travailleurs postés", ko: "TheraBionic(FDA, 인체) + 패러데이 침실 개입 테스트 가능 + 교대근무자 EMF 차단 야간" },
  },
  {
    id: "analogy",
    name: { en: "Analogy", fi: "Analogia", ja: "類推", fr: "Analogie", ko: "유추" },
    berm: 5, tobacco: 3, bpa: 3,
    strongest: { en: "TTFields + LED-SMPS at same frequency + EU forced every home lamp to emit IF", fi: "TTFields + LED-SMPS samalla taajuudella + EU pakotti jokaisen kodin lampun tuottamaan IF:ää", ja: "TTFields + 同一周波数のLED-SMPS + EUがすべての家庭用ランプにIF放射を義務化", fr: "TTFields + LED-SMPS à la même fréquence + l'UE a forcé chaque lampe domestique à émettre des IF", ko: "TTFields + 동일 주파수의 LED-SMPS + EU가 모든 가정용 램프에 IF 방출을 강제" },
  },
];

const COPY = {
  en: {
    kicker: "BRADFORD HILL CRITERIA",
    title: "Does this meet scientific standards for causation?",
    subtitle:
      "[[ref:bradford-hill-1965|Bradford Hill's nine criteria (1965)]] are the established framework for evaluating whether an observed association is causal. Here is how BERM compares to two exposures that are now accepted as causal — at the time they were accepted.",
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
      "[[ref:bradford-hill-1965|Bradford Hillin yhdeksän kriteeriä (1965)]] ovat epidemiologian vakiintunut kehys kausaalisen yhteyden arviointiin. Näin BERM vertautuu kahteen nykyisin kausaaliseksi hyväksyttyyn altistukseen — niiden hyväksymishetkellä.",
    criterion: "Kriteeri",
    tobacco: "Tupakka '65",
    total: "Yhteensä",
    strongestEvidence: "Vahvin todiste",
    explanation:
      "BERM saa korkeamman kokonaispistemäärän kuin tupakka (Surgeon Generalin raportin aikaan) ja bisfenoli A (regulatorisen toiminnan alkaessa). Sen vahvimmat alueet ovat biologinen uskottavuus (mekanismi tunnetaan atomitasolla ja on FDA-validoitu) ja analogia (neljä itsenäistä rinnakkaista todistelinjaa). Sen heikoin alue on kohdentuvuus — mutta tämä on kalsiumbiologian ennustettu ominaisuus, ei mallin epäonnistuminen.",
    disclaimer:
      "Nämä pisteet ovat meidän arviomme. Lukijoita kannustetaan arvioimaan jokainen kriteeri itsenäisesti.",
    cta: "Lue koko Bradford Hill -analyysi",
    tapHint: "Napauta kriteeriä nähdäksesi vahvimman todisteen",
  },
  ja: {
    kicker: "ブラッドフォード・ヒル基準",
    title: "これは因果関係の科学的基準を満たすか？",
    subtitle:
      "[[ref:bradford-hill-1965|ブラッドフォード・ヒルの9基準（1965）]]は、観察された関連が因果的かどうかを評価する確立された枠組みです。BERMを、現在では因果的と認められている2つの曝露について、それらが認められた当時の状態と比較します。",
    criterion: "基準",
    tobacco: "タバコ '65",
    total: "合計",
    strongestEvidence: "最も強い証拠",
    explanation:
      "BERMは、タバコ（公衆衛生局長官報告書の時点）とビスフェノールA（規制措置開始時点）の両方よりも高い総合スコアを獲得しています。最も強い分野は生物学的妥当性（メカニズムが原子分解能で既知でありFDA検証済み）と類推（4つの独立した並行証拠ライン）です。最も弱い分野は特異性ですが、これはカルシウム生物学の予測された特徴であり、モデルの失敗ではありません。",
    disclaimer:
      "これらのスコアは当方の評価です。読者には各基準を独立して評価されることをお勧めします。",
    cta: "ブラッドフォード・ヒル分析の全文を読む",
    tapHint: "基準をタップして最も強い証拠を表示",
  },
  fr: {
    kicker: "CRITÈRES DE BRADFORD HILL",
    title: "Cela satisfait-il les standards scientifiques de causalité ?",
    subtitle:
      "Les [[ref:bradford-hill-1965|neuf critères de Bradford Hill (1965)]] constituent le cadre établi pour évaluer si une association observée est causale. Voici comment le BERM se compare à deux expositions aujourd'hui reconnues comme causales — au moment où elles ont été acceptées.",
    criterion: "Critère",
    tobacco: "Tabac '65",
    total: "Total",
    strongestEvidence: "Preuve la plus forte",
    explanation:
      "Le BERM obtient un score global plus élevé que le tabac (au moment du rapport du Surgeon General) et le bisphénol A (au début des mesures réglementaires). Ses domaines les plus forts sont la plausibilité biologique (le mécanisme est connu à résolution atomique et validé par la FDA) et l'analogie (quatre lignes de preuves parallèles indépendantes). Son domaine le plus faible est la spécificité — mais il s'agit d'une caractéristique prédite de la biologie du calcium, et non d'un échec du modèle.",
    disclaimer:
      "Ces scores représentent notre évaluation. Les lecteurs sont encouragés à évaluer chaque critère indépendamment.",
    cta: "Lire l'analyse complète de Bradford Hill",
    tapHint: "Appuyez sur un critère pour voir la preuve la plus forte",
  },
  ko: {
    kicker: "브래드포드 힐 기준",
    title: "이것이 인과관계의 과학적 기준을 충족하는가?",
    subtitle:
      "[[ref:bradford-hill-1965|Bradford Hill의 9가지 기준(1965)]]은 관찰된 연관성이 인과적인지 평가하는 확립된 프레임워크입니다. BERM을 현재 인과적으로 인정되는 두 노출이 인정되던 당시의 상태와 비교합니다.",
    criterion: "기준",
    tobacco: "담배 '65",
    total: "합계",
    strongestEvidence: "가장 강력한 증거",
    explanation:
      "BERM은 담배(공중보건국장 보고서 시점)와 비스페놀 A(규제 조치 시작 시점) 모두보다 높은 종합 점수를 받았습니다. 가장 강한 영역은 생물학적 타당성(메커니즘이 원자 수준 해상도로 알려져 있고 FDA 검증됨)과 유추(4개의 독립적 병렬 증거 라인)입니다. 가장 약한 영역은 특이성이지만, 이는 칼슘 생물학의 예측된 특성이며 모델의 실패가 아닙니다.",
    disclaimer:
      "이 점수는 당사의 평가입니다. 독자들이 각 기준을 독립적으로 평가하시기를 권합니다.",
    cta: "브래드포드 힐 분석 전문 읽기",
    tapHint: "기준을 탭하여 가장 강력한 증거 보기",
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
  const d = pickCopy(COPY, locale);

  return (
    <section className="pb-20">
      <div className="rounded-xl border border-card-border bg-card-bg p-6 sm:p-8">
        <p className="editorial-kicker text-accent mb-2">{d.kicker}</p>
        <h2 className="text-xl font-semibold mb-2">{d.title}</h2>
        <p className="text-sm text-foreground-muted leading-relaxed mb-6 max-w-3xl"><InlineReferenceText text={d.subtitle} locale={locale} /></p>

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
                    <span className="text-sm font-medium">{pickCopy(c.name, locale)}</span>
                    <ScoreDots score={c.berm} />
                    <ScoreDots score={c.tobacco} />
                    <ScoreDots score={c.bpa} />
                  </button>
                  {expanded === c.id && (
                    <div className="mx-3 mb-1 p-3 rounded-lg bg-background border border-card-border text-sm text-foreground-muted">
                      <span className="font-semibold text-foreground">{d.strongestEvidence}: </span>
                      <InlineReferenceText text={pickCopy(c.strongest, locale)} locale={locale} />
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
