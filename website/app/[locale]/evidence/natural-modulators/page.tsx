import type { Metadata } from "next";
import Link from "next/link";
import { Leaf } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { CautionBox } from "@/components/CautionBox";
import { DerivedPrediction } from "@/components/DerivedPrediction";
import { pickCopy } from "@/lib/i18n";

const COPY = {
  en: {
    title: "Five Natural Ca²⁺ Modulators",
    subtitle: "Five natural substances modulate the same Ca²⁺ cascade that BERM identifies as EMF’s primary biological pathway. All five are declining in the modern environment — simultaneously — while EMF exposure increases. This convergent loss creates a civilization-level vulnerability.",
    backLink: "← Back to Evidence",
    cautionText: "This page discusses five natural substances with Ca²⁺-modulating properties. Each substance’s individual mechanism is well-established. The combined framework linking their simultaneous decline to EMF vulnerability is a BERM synthesis.",

    modulatorsTitle: "The five modulators",
    modulators: [
      {
        name: "Vitamin D",
        mechanism: "VDR→CACNA1C/1D mRNA↓ = genomic VGCC downregulation.",
        trend: "DEFICIENCY INCREASING (indoor lifestyle, sunscreen). ~40% globally deficient.",
        status: "10th BERM moderator (VK50).",
      },
      {
        name: "Melatonin",
        mechanism: "Antioxidant + SIRT1 + telomerase + BBB protection + estrogen counterbalance.",
        trend: "SUPPRESSED (EMF + LED blue light + shift work).",
        status: "Central to BERM since VK2.",
      },
      {
        name: "Magnesium",
        mechanism: "Direct Ca²⁺ antagonist at multiple channel types = nature’s channel blocker.",
        trend: "DECREASING (processed food, depleted soil, filtered water).",
        status: "Known Ca²⁺ antagonist.",
      },
      {
        name: "Lithium (trace)",
        mechanism: "GSK-3β inhibition + CaMKII modulation + BDNF↑ + circadian stabilization.",
        trend: "DISAPPEARING (modern water filtration removes trace lithium). Dementia↓ and suicide↓ at population level (VK54).",
        status: "Trace lithium in water correlates with lower dementia and suicide rates.",
      },
      {
        name: "Caffeine",
        mechanism: "A2A antagonism → DA neuron protection + anti-neuroinflammation + Ca²⁺ modulation.",
        trend: "ONLY ONE INCREASING. May be compensatory — the one natural modulator humans are self-medicating with.",
        status: "The exception that may prove the rule.",
      },
    ],

    convergentTitle: "The convergent loss",
    convergentPoints: [
      "Four of five natural Ca²⁺ modulators are DECLINING simultaneously.",
      "While the Ca²⁺-disrupting agent (EMF) is INCREASING.",
      "= Fivefold vulnerability shift: less protection + more disruption.",
      "This is not a coincidence — it’s a civilization-level metabolic shift.",
      "Caffeine as the exception: the one modulator humans actively seek out may represent unconscious self-medication.",
    ],

    testableTitle: "Testable framework",
    testableLead: "Each modulator’s effect on EMF biomarkers is independently verifiable.",
    testablePoints: [
      "Each modulator’s effect on EMF biomarkers is independently testable.",
      "Combined modulator score could predict individual EMF vulnerability.",
      "Population-level modulator decline + EMF increase should predict disease trends.",
    ],

    predictionText: "Prediction E-NEW-28: Vitamin D repletion in deficient individuals reduces VGCC expression and attenuates EMF-induced Ca²⁺ influx. Prediction E-NEW-35: Populations with higher trace lithium in water show lower prevalence of EMF-associated neurodegenerative conditions.",
    predictionLink: "See final layer predictions →",
    predictionHref: "/predictions",
  },
  fi: {
    title: "Viisi luonnollista Ca²⁺-modulaattoria",
    subtitle: "Viisi luonnollista ainetta säätelee samaa Ca²⁺-kaskadia, jonka BERM tunnistaa EMF:n ensisijaiseksi biologiseksi reitiksi. Kaikki viisi ovat vähenemässä modernissa ympäristössä — samanaikaisesti — samalla kun EMF-altistus kasvaa. Tämä yhdensuuntainen menetys luo sivilisaatiotason haavoittuvuuden.",
    backLink: "← Takaisin näyttöön",
    cautionText: "Tämä sivu käsittelee viittä luonnollista ainetta, joilla on Ca²⁺-moduloivia ominaisuuksia. Kunkin aineen yksittäinen mekanismi on vakiintunut. Yhdistetty viitekehys, joka linkittää niiden samanaikaisen vähenemisen EMF-haavoittuvuuteen, on BERM-synteesi.",

    modulatorsTitle: "Viisi modulaattoria",
    modulators: [
      {
        name: "D-vitamiini",
        mechanism: "VDR→CACNA1C/1D-mRNA↓ = genominen VGCC-alassäätely.",
        trend: "PUUTOS LISÄÄNTYY (sisäelämäntyyli, aurinkovoide). ~40 % maailmanlaajuisesti puutteellinen.",
        status: "BERM:n 10. moderaattori (VK50).",
      },
      {
        name: "Melatoniini",
        mechanism: "Antioksidantti + SIRT1 + telomeraasi + BBB-suoja + estrogeenin vastapaino.",
        trend: "TUKAHDUTETTUNA (EMF + LED-sinivalo + vuorotyö).",
        status: "Keskeinen BERM:ssä VK2:sta lähtien.",
      },
      {
        name: "Magnesium",
        mechanism: "Suora Ca²⁺-antagonisti useissa kanavatyypeissä = luonnon kanavasalpaaja.",
        trend: "VÄHENEMÄSSÄ (prosessoitu ruoka, köyhtynyt maaperä, suodatettu vesi).",
        status: "Tunnettu Ca²⁺-antagonisti.",
      },
      {
        name: "Litium (hivenaineena)",
        mechanism: "GSK-3β-inhibitio + CaMKII-modulaatio + BDNF↑ + vuorokausirytmin stabilointi.",
        trend: "KATOAMASSA (moderni veden suodatus poistaa hivelitiumin). Dementia↓ ja itsemurha↓ väestötasolla (VK54).",
        status: "Hivelitium vedessä korreloi matalamman dementian ja itsemurhien kanssa.",
      },
      {
        name: "Kofeiini",
        mechanism: "A2A-antagonismi → DA-neuronien suojaus + anti-neuroinflam­maatio + Ca²⁺-modulaatio.",
        trend: "AINOA KASVUSSA. Saattaa olla kompensoivaa — ainoa luonnollinen modulaattori, jolla ihmiset itselääkitsevät.",
        status: "Poikkeus, joka saattaa todistaa säännön.",
      },
    ],

    convergentTitle: "Yhdensuuntainen menetys",
    convergentPoints: [
      "Neljä viidestä luonnollisesta Ca²⁺-modulaattorista VÄHENEE samanaikaisesti.",
      "Samalla kun Ca²⁺-häiritsevä tekijä (EMF) LISÄÄNTYY.",
      "= Viisinkertainen haavoittuvuusmuutos: vähemmän suojaa + enemmän häiriötä.",
      "Tämä ei ole sattumaa — se on sivilisaatiotason metabolinen muutos.",
      "Kofeiini poikkeuksena: ainoa modulaattori, jota ihmiset aktiivisesti hakevat, saattaa edustaa tiedostamatonta itselääkitystä.",
    ],

    testableTitle: "Testattava viitekehys",
    testableLead: "Kunkin modulaattorin vaikutus EMF-biomarkkereihin on itsenäisesti todennettavissa.",
    testablePoints: [
      "Kunkin modulaattorin vaikutus EMF-biomarkkereihin on itsenäisesti testattavissa.",
      "Yhdistetty modulaattoripistemäärä voisi ennustaa yksilöllistä EMF-haavoittuvuutta.",
      "Väestötason modulaattorien väheneminen + EMF:n kasvu pitäisi ennustaa sairaus­trendejä.",
    ],

    predictionText: "Ennuste E-NEW-28: D-vitamiinin täydennys puutostilaisilla yksilöillä vähentää VGCC-ekspressiota ja vaimentaa EMF-aiheutettua Ca²⁺-sisäänvirtausta. Ennuste E-NEW-35: Väestöillä, joilla on enemmän hivelitiumia vedessä, on matalampi EMF-liitteisten neurodegeneratiivisten tilojen esiintyvyys.",
    predictionLink: "Ks. viimeisten kerrosten ennusteet →",
    predictionHref: "/predictions",
  },
  ja: {
    title: "5つの天然Ca²⁺調節因子",
    subtitle: "5つの天然物質がBERMがEMFの主要生物学的経路として特定する同じCa²⁺カスケードを調節します。5つすべてが現代環境で同時に減少しており、EMF曝露は増加しています。この収束的喪失は文明レベルの脆弱性を生み出します。",
    backLink: "← エビデンスに戻る",
    cautionText: "このページではCa²⁺調節特性を持つ5つの天然物質を議論します。各物質の個別のメカニズムは確立されています。それらの同時的な減少をEMF脆弱性に結びつける統合的枠組みはBERM統合です。",

    modulatorsTitle: "5つの調節因子",
    modulators: [
      {
        name: "ビタミンD",
        mechanism: "VDR→CACNA1C/1D mRNA↓ = ゲノムレベルのVGCC下方制御。",
        trend: "欠乏が増加中（室内型生活様式、日焼け止め）。全世界で約40%が欠乏。",
        status: "BERMの第10の調節因子（VK50）。",
      },
      {
        name: "メラトニン",
        mechanism: "抗酸化物質 + SIRT1 + テロメラーゼ + BBB保護 + エストロゲン対抗。",
        trend: "抑制されている（EMF + LED青色光 + シフトワーク）。",
        status: "VK2以来BERMの中心。",
      },
      {
        name: "マグネシウム",
        mechanism: "複数のチャネルタイプにおける直接的Ca²⁺拮抗物質 = 自然のチャネルブロッカー。",
        trend: "減少中（加工食品、枯渇した土壌、ろ過水）。",
        status: "既知のCa²⁺拮抗物質。",
      },
      {
        name: "リチウム（微量）",
        mechanism: "GSK-3β阻害 + CaMKII調節 + BDNF↑ + 概日リズム安定化。",
        trend: "消失中（現代の浄水処理が微量リチウムを除去）。人口レベルで認知症↓および自殺↓（VK54）。",
        status: "水中の微量リチウムは認知症および自殺率の低下と相関。",
      },
      {
        name: "カフェイン",
        mechanism: "A2A拮抗 → DAニューロン保護 + 抗神経炎症 + Ca²⁺調節。",
        trend: "唯一増加中。代償的かもしれない — 人間が自己投薬している唯一の天然調節因子。",
        status: "規則を証明する例外かもしれない。",
      },
    ],

    convergentTitle: "収束的喪失",
    convergentPoints: [
      "5つの天然Ca²⁺調節因子のうち4つが同時に減少している。",
      "Ca²⁺撹乱因子（EMF）は増加している。",
      "= 5倍の脆弱性シフト：保護の減少 + 撹乱の増加。",
      "これは偶然ではない — 文明レベルの代謝シフトである。",
      "例外としてのカフェイン：人間が能動的に求める唯一の調節因子は無意識の自己投薬を表しているかもしれない。",
    ],

    testableTitle: "検証可能な枠組み",
    testableLead: "各調節因子のEMFバイオマーカーへの効果は独立して検証可能です。",
    testablePoints: [
      "各調節因子のEMFバイオマーカーへの効果は独立して検証可能です。",
      "統合調節因子スコアにより個人のEMF脆弱性を予測できる可能性があります。",
      "人口レベルの調節因子減少 + EMF増加は疾病トレンドを予測するはずです。",
    ],

    predictionText: "予測E-NEW-28：欠乏状態の個人におけるビタミンD補充はVGCC発現を低下させ、EMF誘発Ca²⁺流入を減弱させる。予測E-NEW-35：水中の微量リチウムが高い集団は、EMF関連の神経変性状態の有病率がより低い。",
    predictionLink: "最終層の予測を見る →",
    predictionHref: "/predictions",
  },
  fr: {
    title: "Cinq modulateurs naturels de Ca²⁺",
    subtitle: "Cinq substances naturelles modulent la même cascade de Ca²⁺ que le BERM identifie comme la voie biologique principale de l'EMF. Toutes les cinq diminuent dans l'environnement moderne — simultanément — tandis que l'exposition aux EMF augmente. Cette perte convergente crée une vulnérabilité à l'échelle de la civilisation.",
    backLink: "← Retour aux preuves",
    cautionText: "Cette page discute de cinq substances naturelles aux propriétés modulatrices du Ca²⁺. Le mécanisme individuel de chaque substance est bien établi. Le cadre combiné reliant leur déclin simultané à la vulnérabilité aux EMF est une synthèse BERM.",

    modulatorsTitle: "Les cinq modulateurs",
    modulators: [
      {
        name: "Vitamine D",
        mechanism: "VDR→ARNm CACNA1C/1D↓ = régulation négative génomique des VGCC.",
        trend: "CARENCE EN AUGMENTATION (mode de vie intérieur, crème solaire). ~40 % mondialement carencés.",
        status: "10e modérateur du BERM (VK50).",
      },
      {
        name: "Mélatonine",
        mechanism: "Antioxydant + SIRT1 + télomérase + protection de la BHE + contrebalance œstrogénique.",
        trend: "SUPPRIMÉE (EMF + lumière bleue LED + travail posté).",
        status: "Centrale dans le BERM depuis VK2.",
      },
      {
        name: "Magnésium",
        mechanism: "Antagoniste direct du Ca²⁺ sur plusieurs types de canaux = bloqueur de canaux naturel.",
        trend: "EN DIMINUTION (aliments transformés, sol appauvri, eau filtrée).",
        status: "Antagoniste du Ca²⁺ connu.",
      },
      {
        name: "Lithium (traces)",
        mechanism: "Inhibition de GSK-3β + modulation de CaMKII + BDNF↑ + stabilisation circadienne.",
        trend: "EN DISPARITION (la filtration moderne de l'eau élimine le lithium à l'état de traces). Démence↓ et suicide↓ au niveau populationnel (VK54).",
        status: "Le lithium à l'état de traces dans l'eau est corrélé avec des taux plus bas de démence et de suicide.",
      },
      {
        name: "Caféine",
        mechanism: "Antagonisme A2A → protection des neurones DA + anti-neuroinflammation + modulation du Ca²⁺.",
        trend: "LA SEULE EN AUGMENTATION. Pourrait être compensatoire — le seul modulateur naturel avec lequel les humains s'automédiquent.",
        status: "L'exception qui pourrait confirmer la règle.",
      },
    ],

    convergentTitle: "La perte convergente",
    convergentPoints: [
      "Quatre des cinq modulateurs naturels de Ca²⁺ DIMINUENT simultanément.",
      "Tandis que l'agent perturbateur du Ca²⁺ (EMF) AUGMENTE.",
      "= Changement quintuple de vulnérabilité : moins de protection + plus de perturbation.",
      "Ce n'est pas une coïncidence — c'est un changement métabolique à l'échelle de la civilisation.",
      "La caféine comme exception : le seul modulateur que les humains recherchent activement pourrait représenter une automédication inconsciente.",
    ],

    testableTitle: "Cadre testable",
    testableLead: "L'effet de chaque modulateur sur les biomarqueurs EMF est vérifiable indépendamment.",
    testablePoints: [
      "L'effet de chaque modulateur sur les biomarqueurs EMF est testable indépendamment.",
      "Un score de modulateur combiné pourrait prédire la vulnérabilité individuelle aux EMF.",
      "Le déclin des modulateurs au niveau de la population + l'augmentation de l'EMF devrait prédire les tendances des maladies.",
    ],

    predictionText: "Prédiction E-NEW-28 : la réplétion en vitamine D chez les individus carencés réduit l'expression des VGCC et atténue l'influx de Ca²⁺ induit par les EMF. Prédiction E-NEW-35 : les populations ayant un taux plus élevé de lithium à l'état de traces dans l'eau présentent une prévalence plus faible des conditions neurodégénératives associées aux EMF.",
    predictionLink: "Voir les prédictions de la couche finale →",
    predictionHref: "/predictions",
  },
  ko: {
    title: "다섯 가지 천연 Ca²⁺ 조절인자",
    subtitle: "다섯 가지 천연 물질이 BERM이 EMF의 주요 생물학적 경로로 식별하는 동일한 Ca²⁺ 캐스케이드를 조절합니다. 다섯 가지 모두 현대 환경에서 동시에 감소하고 있으며 EMF 노출은 증가하고 있습니다. 이 수렴적 손실은 문명 수준의 취약성을 만듭니다.",
    backLink: "← 증거로 돌아가기",
    cautionText: "이 페이지는 Ca²⁺ 조절 특성을 가진 다섯 가지 천연 물질을 논의합니다. 각 물질의 개별 메커니즘은 확립되어 있습니다. 그들의 동시적 감소를 EMF 취약성과 연결하는 통합 프레임워크는 BERM 통합입니다.",

    modulatorsTitle: "다섯 가지 조절인자",
    modulators: [
      {
        name: "비타민 D",
        mechanism: "VDR→CACNA1C/1D mRNA↓ = 게놈 수준 VGCC 하향 조절.",
        trend: "결핍 증가 중(실내 생활 방식, 자외선 차단제). 전 세계적으로 약 40% 결핍.",
        status: "BERM의 10번째 조절인자(VK50).",
      },
      {
        name: "멜라토닌",
        mechanism: "항산화제 + SIRT1 + 텔로머라제 + BBB 보호 + 에스트로겐 균형.",
        trend: "억제됨(EMF + LED 블루라이트 + 교대 근무).",
        status: "VK2 이후 BERM의 중심.",
      },
      {
        name: "마그네슘",
        mechanism: "여러 채널 유형에서의 직접적 Ca²⁺ 길항제 = 자연의 채널 차단제.",
        trend: "감소 중(가공 식품, 고갈된 토양, 여과수).",
        status: "알려진 Ca²⁺ 길항제.",
      },
      {
        name: "리튬(미량)",
        mechanism: "GSK-3β 억제 + CaMKII 조절 + BDNF↑ + 일주기 리듬 안정화.",
        trend: "소실 중(현대 정수 처리가 미량 리튬 제거). 인구 수준에서 치매↓ 및 자살↓(VK54).",
        status: "수돗물의 미량 리튬은 낮은 치매 및 자살률과 상관.",
      },
      {
        name: "카페인",
        mechanism: "A2A 길항 → DA 뉴런 보호 + 항신경염증 + Ca²⁺ 조절.",
        trend: "유일하게 증가 중. 보상적일 수 있음 — 인간이 자가 투약하는 유일한 천연 조절인자.",
        status: "규칙을 증명하는 예외일 수 있음.",
      },
    ],

    convergentTitle: "수렴적 손실",
    convergentPoints: [
      "다섯 가지 천연 Ca²⁺ 조절인자 중 네 가지가 동시에 감소하고 있다.",
      "Ca²⁺ 교란 인자(EMF)는 증가하고 있다.",
      "= 5배의 취약성 변화: 보호 감소 + 교란 증가.",
      "이것은 우연이 아니다 — 문명 수준의 대사적 전환이다.",
      "예외로서의 카페인: 인간이 적극적으로 찾는 유일한 조절인자는 무의식적 자가 투약을 나타낼 수 있다.",
    ],

    testableTitle: "검증 가능한 프레임워크",
    testableLead: "각 조절인자의 EMF 바이오마커에 대한 효과는 독립적으로 검증 가능합니다.",
    testablePoints: [
      "각 조절인자의 EMF 바이오마커에 대한 효과는 독립적으로 검증 가능합니다.",
      "통합 조절인자 점수로 개인의 EMF 취약성을 예측할 수 있습니다.",
      "인구 수준의 조절인자 감소 + EMF 증가는 질병 추세를 예측해야 합니다.",
    ],

    predictionText: "예측 E-NEW-28: 결핍 상태의 개인에서 비타민 D 보충은 VGCC 발현을 감소시키고 EMF 유도 Ca²⁺ 유입을 감쇠시킨다. 예측 E-NEW-35: 수돗물의 미량 리튬이 더 높은 인구는 EMF 관련 신경변성 질환의 유병률이 더 낮다.",
    predictionLink: "최종 계층 예측 보기 →",
    predictionHref: "/predictions",
  },
} as const;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const d = pickCopy(COPY, locale);
  return { title: `${d.title} – Extinction Field`, description: d.subtitle };
}

export default async function NaturalModulatorsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const d = pickCopy(COPY, locale);
  const prefix = `/${locale}`;

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 sm:py-20">
      <p className="mb-6">
        <Link href={`${prefix}/evidence`} className="text-sm text-accent hover:underline">{d.backLink}</Link>
      </p>
      <PageHeader icon={Leaf} title={d.title} subtitle={d.subtitle} />
      <div className="mt-8"><CautionBox locale={locale}><p>{d.cautionText}</p></CautionBox></div>

      {/* The five modulators */}
      <section className="mt-12">
        <h2 className="text-lg font-semibold mb-2">{d.modulatorsTitle}</h2>
        <div className="space-y-3">
          {d.modulators.map((m, i) => (
            <div key={i} className="rounded-lg border border-green-500/20 bg-green-500/5 p-4">
              <p className="text-sm font-semibold mb-1">{m.name}</p>
              <p className="text-sm text-foreground-muted leading-relaxed mb-1">{m.mechanism}</p>
              <p className="text-sm text-foreground-muted leading-relaxed mb-1"><span className="font-medium">Trend:</span> {m.trend}</p>
              <p className="text-xs text-foreground-muted italic">{m.status}</p>
            </div>
          ))}
        </div>
      </section>

      {/* The convergent loss */}
      <section className="mt-14 border-t editorial-rule pt-6">
        <h2 className="text-lg font-semibold mb-4">{d.convergentTitle}</h2>
        <div className="rounded-lg border border-amber-500/20 bg-amber-500/5 p-5">
          <div className="space-y-2">
            {d.convergentPoints.map((point, i) => (
              <div key={i} className="flex gap-2 text-sm text-foreground-muted leading-relaxed">
                <span className="text-amber-500 shrink-0">{"→"}</span><p>{point}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testable framework */}
      <section className="mt-14 border-t editorial-rule pt-6">
        <h2 className="text-lg font-semibold mb-2">{d.testableTitle}</h2>
        <p className="text-sm text-foreground-muted leading-relaxed mb-4 max-w-3xl">{d.testableLead}</p>
        <div className="space-y-3">
          {d.testablePoints.map((point, i) => (
            <div key={i} className="rounded-lg border border-card-border bg-card-bg p-4">
              <p className="text-sm text-foreground-muted leading-relaxed">{point}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Derived predictions */}
      <section className="mt-14 border-t editorial-rule pt-6">
        <DerivedPrediction locale={locale}>
          <p className="text-sm leading-relaxed mb-3">{d.predictionText}</p>
          <Link href={`${prefix}${d.predictionHref}`} className="text-sm text-accent hover:underline">{d.predictionLink}</Link>
        </DerivedPrediction>
      </section>
    </div>
  );
}
