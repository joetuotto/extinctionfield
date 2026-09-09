import { CombinedExposurePanel } from "@/components/CombinedExposurePanel";
import { SteroidogenesisIntegrationPanel } from "@/components/SteroidogenesisIntegrationPanel";
import { HormoneCompartments } from "@/components/HormoneCompartments";
import type { Metadata } from "next";
import Link from "next/link";
import { TrendingDown } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { CautionBox } from "@/components/CautionBox";
import { DerivedPrediction } from "@/components/DerivedPrediction";
import { CrossSpeciesGradient } from "@/components/CrossSpeciesGradient";
import { TestosteroneCalibrationUpdate } from "@/components/TestosteroneCalibrationUpdate";
import { pickCopy } from "@/lib/i18n";
import { ClaimRef } from "@/components/ClaimRef";
import { StudyCitation } from "@/components/StudyCitation";
import { MathBlock } from "@/components/MathBlock";

const COPY = {
  en: {
    title: "Testosterone: timing and the reproductive cascade",
    subtitle: "Measured testosterone changes precede later fertility declines in three documented cases. New hormone, behavior and conception data constrain the intermediate steps of BERM.",
    backLink: "← Back to Evidence",
    cautionText: "The timing result concerns specified later TFR decline episodes. Total T does not measure free or intratesticular hormone or receptor action. Hormone interventions constrain individual components; the full population transfer and environmental attribution remain open.",



    s3Title: "The LH–T diagnostic",
    s3Lead: "Santi et al. 2025 introduced a differential diagnostic based on simultaneous hormone trends:",
    s3Patterns: [
      { pattern: "T↓ + LH↓ · Hypothalamic", detail: "Reduced central stimulation is compatible with this pattern; simultaneous local steroidogenic limitations can still be present.", color: "blue" },
      { pattern: "T↓ + LH↑ · Testicular", detail: "Compensatory LH is compatible with limited testicular output. Calcium, redox, clock and substrate supply locate potential mechanisms; the hormone pattern alone does not identify their trigger.", color: "amber" },
    ],
    s3Observed: "T↓ with low LH is compatible with reduced central stimulation",
    s3Implication: "BERM includes both central regulation and local Leydig-cell capacity. T↓ with low or inappropriately normal LH is compatible with reduced central drive; it does not exclude concurrent calcium, redox, clock or cholesterol-supply limitations in the testis. A serum pair does not identify the environmental trigger or hormone use at the target.",

    s3bTitle: "Chemical vs EMF: the differential",
    s3bLead: "The following historical comparison describes candidate exposure patterns. The integrated BERM mechanism allows central and local effects for either exposure class; the rows are hypotheses to assess with matched measurements.",
    s3bRows: [
      { axis: "LH response", edc: "Central/local state dependent", emf: "Central/local state dependent" },
      { axis: "Dose geography", edc: "Tracks chemical industry and agriculture", emf: "Tracks electrification and wireless density" },
      { axis: "Cross-species pattern", edc: "Aquatic species near discharge sites", emf: "Gradient across all domestication levels" },
      { axis: "Temporal onset", edc: "Post-1960 (mass plastics)", emf: "Post-1920 (electrification); accelerating post-1990 (wireless)" },
    ],
    s3bConclusion: "The integrated mechanism adds a local EMF–steroidogenesis research branch to the central route. Chemical and physical perturbations can converge on shared calcium/redox and hormone-production machinery. Their contribution is separated by protocol, measured intermediate and timing; LH–T alone cannot assign it. SHBG, free T and receptor response remain further stages.",

    s4Title: "Cross-species gradient",
    s4Lead: "Seven species/population groups arranged by estimated cumulative EMF exposure show a dose-response relationship with reproductive decline:",
    s4Stat: "r = 0.84, p = 0.017, n = 7 species groups",
    s4Caveat: "Ecological correlation across species with heterogeneous decline measurements and EMF burden estimates. The species differ in body size, lifespan, generation time, and confounders. Consistent with but not proof of dose-response. This applies equally to conventional explanations.",

    s5Title: "Epistemological honesty",
    s5Points: ["Temporal precedence is documented in three specified cases; it does not estimate a common causal lag.", "The NHANES population association and low-T intervention effects describe different response ranges.", "Assay, age, sampling time, relationship state and study-family overlap must be preserved in calibration.", "The human hormone-to-TFR transfer and chronic EMF contribution remain open."],

    predictionText: "Next test: compare state-dependent hormone response curves and lag distributions on countries or periods withheld from fitting. Keep temporal precedence, predictive improvement and exposure attribution as separate tests.",
    predictionLink: "See predictions →",
    predictionHref: "/predictions",
  },
  fi: {
    title: "Testosteroni: ajoitus ja lisääntymiskaskadi",
    subtitle: "Mitattu testosteronin aleneminen edeltää myöhempää syntyvyyden laskua kolmessa dokumentoidussa tapauksessa. Uudet hormoni-, käyttäytymis- ja hedelmöittymisaineistot tarkentavat BERM:n välivaiheita.",
    backLink: "← Takaisin näyttöön",
    cautionText: "Ajoitustulos koskee nimettyjä myöhempiä TFR-laskuvaiheita. Kokonais-T ei mittaa vapaata tai kiveksen sisäistä hormonia eikä reseptorivaikutusta. Hormonikokeet rajaavat osavaikutuksia; koko väestötason siirto ja ympäristösyyn osoittaminen ovat avoimia.",



    s3Title: "LH–T-diagnostiikka",
    s3Lead: "Santi ym. 2025 esittivät erotusdiagnostiikan samanaikaisten hormonitrendien perusteella:",
    s3Patterns: [
      { pattern: "T↓ + LH↓ · Hypotalaaminen", detail: "Vähäinen keskinen stimulaatio sopii tähän kuvioon; paikallisia steroidogeneesin rajoitteita voi esiintyä samanaikaisesti.", color: "blue" },
      { pattern: "T↓ + LH↑ · Testikulaarinen", detail: "Kompensatorinen LH sopii rajalliseen kivestuotantoon. Kalsium, redox, kello ja substraattihuolto paikantavat mekanismiehdokkaita; hormonikuvio yksin ei yksilöi niiden laukaisijaa.", color: "amber" },
    ],
    s3Observed: "T↓ ja matala LH sopivat vähentyneeseen keskiseen stimulaatioon",
    s3Implication: "BERM sisältää sekä keskisen säätelyn että Leydig-solun paikallisen kapasiteetin. Matala T yhdessä matalan tai tilanteeseen nähden normaalin LH:n kanssa sopii vähäiseen keskiseen ohjaukseen; se ei sulje pois samanaikaisia kiveksen kalsium-, redox-, kello- tai kolesterolihuollon rajoitteita. Seerumipari ei yksilöi ympäristötekijää eikä hormonin käyttöä kohdekudoksessa.",

    s3bTitle: "Kemikaali vs EMF: erotusdiagnostiikka",
    s3bLead: "Seuraava historiallinen vertailu kuvaa ehdotettuja altistuskuvioita. Integroitu BERM sallii kummankin altistusluokan keskiset ja paikalliset vaikutukset; rivit ovat yhteensovitetuilla mittauksilla tarkasteltavia hypoteeseja.",
    s3bRows: [
      { axis: "LH-vaste", edc: "Riippuu keskisestä ja paikallisesta tilasta", emf: "Riippuu keskisestä ja paikallisesta tilasta" },
      { axis: "Annosmaantiede", edc: "Seuraa kemianteollisuutta ja maataloutta", emf: "Seuraa sähköistystä ja langattoman verkon tiheyttä" },
      { axis: "Lajien välinen kaava", edc: "Vesilajit päästölähteiden lähellä", emf: "Gradientti kaikilla domestikaatiotasoilla" },
      { axis: "Ajallinen alku", edc: "1960-luvun jälkeen (massamuovit)", emf: "1920-luvun jälkeen (sähköistys); kiihtyen 1990 jälkeen (langaton)" },
    ],
    s3bConclusion: "Integroitu mekanismi lisää keskisen reitin rinnalle paikallisen EMF–steroidogeneesin tutkimushaaran. Kemialliset ja fysikaaliset häiriöt voivat yhtyä samaan kalsium/redox- ja hormonituotantokoneistoon. Niiden osuus erotetaan protokollan, mitatun välivaiheen ja ajoituksen avulla; LH–T ei yksin määrää sitä. SHBG, vapaa T ja reseptorivaste ovat edelleen erillisiä vaiheita.",

    s4Title: "Lajien välinen gradientti",
    s4Lead: "Seitsemän lajia/populaatioryhmaa arvioidun kumulatiivisen EMF-altistuksen mukaan järjestettyinä osoittaa annosvastesuhdetta lisääntymisen laskuun:",
    s4Stat: "r = 0,84, p = 0,017, n = 7 lajiryhmaa",
    s4Caveat: "Ekologinen korrelaatio lajien välillä heterogeenisilla laskumittauksilla ja EMF-kuorma-arvioilla. Lajit eroavat ruumiinkoon, eliniän, sukupolven ajan ja sekoittavien tekijöiden suhteen. Yhdenmukainen mutta ei todiste annosvasteesta. Tämä koskee yhtä lailla konventionaalisia selityksiä.",

    s5Title: "Epistemologinen rehellisyys",
    s5Points: ["Ajallinen edeltäminen on dokumentoitu kolmessa nimetyssä tapauksessa; se ei estimoi yhteistä kausaalista viivettä.", "NHANESin väestöyhteys ja matalan T:n hoitovasteet kuvaavat eri vastealueita.", "Mittausmenetelmä, ikä, näytteenottoaika, parisuhdetila ja tutkimusperheiden päällekkäisyys säilytetään kalibroinnissa.", "Ihmisen hormoni–TFR-siirto ja kroonisen EMF:n osuus ovat avoimia."],

    predictionText: "Seuraava testi: vertaa lähtötilasta riippuvia hormonivastekäyriä ja viivejakaumia sovituksesta pois jätetyissä maissa tai ajanjaksoissa. Ajallinen edeltäminen, ennusteen paraneminen ja altistussyyn tunnistaminen testataan erikseen.",
    predictionLink: "Katso ennusteet →",
    predictionHref: "/predictions",
  },
  ja: {
    title: "テストステロン：時間的順序と生殖カスケード",
    subtitle: "3事例でテストステロン低下が後の出生率低下に先行します。新しいホルモン・行動・受胎データがBERMの中間段階を制約します。",
    backLink: "← エビデンスに戻る",
    cautionText: "時間的順序は特定の後期TFR低下局面に関する結果です。総Tは遊離T・精巣内T・受容体作用とは異なります。集団全体への移行と環境要因の特定は未解決です。",



    s3Title: "LH–T診断",
    s3Lead: "Santiら 2025年は同時ホルモントレンドに基づく鑑別診断を導入しました：",
    s3Patterns: [
      { pattern: "T↓ + LH↓ · 視床下部性", detail: "中枢刺激低下に整合しますが、局所ステロイド産生の制約は併存し得ます。", color: "blue" },
      { pattern: "T↓ + LH↑ · 精巣性", detail: "代償性LHは精巣産生の制約に整合します。カルシウム、酸化還元、時計、基質供給が機構候補を特定しますが、ホルモンパターンだけでは原因を決められません。", color: "amber" },
    ],
    s3Observed: "T低下と低LHは中枢刺激の減少と整合的",
    s3Implication: "BERMは中枢調節とライディッヒ細胞の局所能力の両方を含みます。低いTと低値または不適切な正常値のLHは中枢刺激低下に整合しますが、精巣のカルシウム、酸化還元、時計、コレステロール供給の制約との併存を除外しません。血中の二つの値だけでは環境要因や標的でのホルモン利用を特定できません。",

    s3bTitle: "化学物質 vs EMF：鑑別診断",
    s3bLead: "以下の歴史的比較は候補となる曝露パターンです。BERMは両曝露群の中枢・局所作用を許容し、各行は対応した測定で調べる仮説です。",
    s3bRows: [
      { axis: "LH反応", edc: "中枢・局所状態に依存", emf: "中枢・局所状態に依存" },
      { axis: "投与量地理学", edc: "化学工業と農業を追跡", emf: "電化と無線密度を追跡" },
      { axis: "種間パターン", edc: "排出地点近くの水生種", emf: "すべての家畜化レベルでグラディエント" },
      { axis: "時間的開始", edc: "1960年以降（大量プラスチック）", emf: "1920年以降（電化）；1990年以降加速（無線）" },
    ],
    s3bConclusion: "統合機構は中枢経路に加えて局所的な電磁場–ステロイド産生の研究経路を含みます。化学的・物理的摂動は共通のカルシウム、酸化還元、産生機構へ合流し得ます。寄与を分けるのは実験条件、中間測定、時間であり、LH–Tだけではありません。SHBG、遊離T、受容体応答はさらに別の段階です。",

    s4Title: "種間グラディエント",
    s4Lead: "推定累積EMF暴露で配列された7種/集団が生殖低下との用量反応関係を示しています：",
    s4Stat: "r = 0.84, p = 0.017, n = 7種グループ",
    s4Caveat: "異質な低下測定とEMF負荷推定を持つ種間の生態学的相関。種は体サイズ、寿命、世代時間、交絡因子が異なります。用量反応と整合しますが証明ではありません。これは従来の説明にも同様に当てはまります。",

    s5Title: "認識論的誠実さ",
    s5Points: ["3事例で先行が記録されていますが、共通の因果的遅延は推定していません。", "NHANESの集団関連と低T治療の効果は異なる反応範囲です。", "測定法・年齢・採取時刻・家族状態・研究の重複を考慮します。", "ヒトのホルモン–TFR伝達と慢性EMFの寄与は未解決です。"],

    predictionText: "次の検証：学習から除外した国や期間で状態依存の反応曲線と遅延分布を比較します。時間的先行、予測改善、曝露の原因特定を分けて検証します。",
    predictionLink: "予測を見る →",
    predictionHref: "/predictions",
  },
  fr: {
    title: "Testostérone : chronologie et cascade reproductive",
    subtitle: "Dans trois cas documentés, la baisse de testostérone précède une baisse ultérieure de fécondité. Les nouvelles données précisent les étapes intermédiaires de BERM.",
    backLink: "← Retour aux Évidences",
    cautionText: "La chronologie concerne des épisodes ultérieurs précis. La T totale ne mesure ni la T libre ou intratesticulaire, ni l’action des récepteurs. Le transfert à la population et l’attribution environnementale restent ouverts.",



    s3Title: "Diagnostic LH–T",
    s3Lead: "Santi et al. 2025 ont introduit un diagnostic différentiel basé sur les tendances hormonales simultanées :",
    s3Patterns: [
      { pattern: "T↓ + LH↓ · Hypothalamique", detail: "Ce profil est compatible avec une stimulation centrale réduite ; des limites stéroïdogènes locales peuvent coexister.", color: "blue" },
      { pattern: "T↓ + LH↑ · Testiculaire", detail: "Une LH compensatoire est compatible avec une production testiculaire limitée. Calcium, redox, horloge et substrat localisent des mécanismes possibles sans identifier le déclencheur par ce profil seul.", color: "amber" },
    ],
    s3Observed: "T basse et LH basse sont compatibles avec une stimulation centrale réduite",
    s3Implication: "BERM inclut la régulation centrale et la capacité locale des cellules de Leydig. Une T basse avec une LH basse ou inappropriément normale est compatible avec une stimulation centrale réduite, sans exclure des limites locales du calcium, du redox, de l’horloge ou du cholestérol. Deux valeurs sériques ne déterminent ni le déclencheur environnemental ni l’utilisation hormonale dans la cible.",

    s3bTitle: "Chimique vs EMF : le diagnostic différentiel",
    s3bLead: "Cette comparaison historique décrit des profils d’exposition candidats. BERM permet des effets centraux et locaux pour les deux classes ; ces lignes sont des hypothèses à examiner avec des mesures comparables.",
    s3bRows: [
      { axis: "Réponse LH", edc: "Selon l’état central et local", emf: "Selon l’état central et local" },
      { axis: "Géographie de dose", edc: "Suit l'industrie chimique et l'agriculture", emf: "Suit l'électrification et la densité sans fil" },
      { axis: "Schéma inter-espèces", edc: "Espèces aquatiques près des sites de rejet", emf: "Gradient à tous les niveaux de domestication" },
      { axis: "Début temporel", edc: "Après 1960 (plastiques de masse)", emf: "Après 1920 (électrification) ; accélération après 1990 (sans fil)" },
    ],
    s3bConclusion: "L’intégration ajoute une branche locale champ–stéroïdogenèse à la voie centrale. Perturbations chimiques et physiques peuvent converger sur la même machinerie calcique, redox et hormonale. Leurs contributions se distinguent par protocole, intermédiaire mesuré et temporalité ; LH–T seul ne les attribue pas. SHBG, T libre et réponse du récepteur restent d’autres étapes.",

    s4Title: "Gradient inter-espèces",
    s4Lead: "Sept espèces/groupes de population classés par exposition EMF cumulée montrent une relation dose-réponse :",
    s4Stat: "r = 0,84, p = 0,017, n = 7 groupes d'espèces",
    s4Caveat: "Corrélation écologique inter-espèces avec des mesures hétérogènes. Cohérent mais non probant. Cela s'applique tout autant aux explications conventionnelles.",

    s5Title: "Honnêteté épistémologique",
    s5Points: ["La précédence est documentée dans trois cas; elle ne mesure pas un délai causal commun.", "Les associations NHANES et les effets du traitement d’un déficit décrivent des plages de réponse différentes.", "La calibration conserve les différences de dosage, âge, horaire, situation familiale et famille d’étude.", "Le transfert hormonal vers le TFR et la contribution chronique des EMF restent ouverts."],

    predictionText: "Prochain test : comparer les réponses et délais dépendant de l’état sur des pays ou périodes exclus de l’ajustement. Tester séparément précédence, gain prédictif et attribution.",
    predictionLink: "Voir les prédictions →",
    predictionHref: "/predictions",
  },
  ko: {
    title: "테스토스테론: 시간적 순서와 생식 연쇄",
    subtitle: "세 사례에서 측정된 테스토스테론 감소가 이후 출산율 감소에 앞섭니다. 새 호르몬·행동·수태 자료가 BERM의 중간 단계를 제약합니다.",
    backLink: "← 증거로 돌아가기",
    cautionText: "시간적 순서는 특정한 후속 TFR 감소 구간에 관한 결과입니다. 총 T는 유리 T, 고환내 T, 수용체 작용과 다릅니다. 인구 전체 전달계수와 환경 원인 규명은 아직 미정입니다.",



    s3Title: "LH–T 진단",
    s3Lead: "Santi 등 2025년은 동시 호르몬 추세에 기반한 감별 진단을 도입했습니다:",
    s3Patterns: [
      { pattern: "T↓ + LH↓ · 시상하부성", detail: "중추 자극 감소와 일치하며 국소 스테로이드 생성 제한이 함께 있을 수 있습니다.", color: "blue" },
      { pattern: "T↓ + LH↑ · 고환성", detail: "보상성 LH는 제한된 고환 생산과 일치합니다. 칼슘, 산화환원, 시계 및 기질 공급은 후보 기전을 특정하지만 호르몬 양상만으로 유발 요인을 결정하지 않습니다.", color: "amber" },
    ],
    s3Observed: "낮은 T와 LH는 중추 자극 감소와 양립합니다",
    s3Implication: "BERM은 중추 조절과 라이디히 세포의 국소 능력을 모두 포함합니다. 낮은 T와 낮거나 부적절하게 정상인 LH는 중추 자극 감소와 일치하지만 칼슘, 산화환원, 시계 또는 콜레스테롤 공급 제한의 동시 존재를 배제하지 않습니다. 혈중 두 수치만으로 환경 요인이나 표적 호르몬 사용을 식별할 수 없습니다.",

    s3bTitle: "화학물질 vs EMF: 감별 진단",
    s3bLead: "다음 역사적 비교는 후보 노출 양상입니다. BERM은 두 노출 범주의 중추 및 국소 효과를 모두 허용하며 각 행은 맞춘 측정으로 검토할 가설입니다.",
    s3bRows: [
      { axis: "LH 반응", edc: "중추·국소 상태에 의존", emf: "중추·국소 상태에 의존" },
      { axis: "용량 지리학", edc: "화학 산업과 농업 추적", emf: "전기화와 무선 밀도 추적" },
      { axis: "종간 패턴", edc: "배출 지점 근처 수생 종", emf: "모든 가축화 수준에서 그래디언트" },
      { axis: "시간적 시작", edc: "1960년 이후 (대량 플라스틱)", emf: "1920년 이후 (전기화); 1990년 이후 가속 (무선)" },
    ],
    s3bConclusion: "통합 기전은 중추 경로에 국소 전자기장–스테로이드 생성 연구 경로를 더합니다. 화학적·물리적 교란은 공통 칼슘, 산화환원 및 호르몬 생산 체계로 수렴할 수 있습니다. 기여도는 프로토콜, 중간 측정, 시점으로 구분하며 LH–T만으로 귀속하지 않습니다. SHBG, 유리 T, 수용체 반응은 별도 단계입니다.",

    s4Title: "종간 그래디언트",
    s4Lead: "추정 누적 EMF 노출로 배열된 7개 종/집단이 생식 감소와의 용량-반응 관계를 보여줍니다:",
    s4Stat: "r = 0.84, p = 0.017, n = 7개 종 그룹",
    s4Caveat: "이질적인 감소 측정과 EMF 부하 추정을 가진 종간 생태학적 상관관계. 이는 기존 설명에도 동일하게 적용됩니다.",

    s5Title: "인식론적 정직",
    s5Points: ["세 사례의 선행은 공통 인과적 지연을 추정하지 않습니다.", "NHANES 인구 연관성과 낮은 T 치료 효과는 다른 반응 범위를 나타냅니다.", "검사법, 나이, 채혈 시각, 가족 상태와 연구 중복을 보존합니다.", "인간 호르몬–TFR 전달 및 만성 EMF 기여는 아직 미정입니다."],

    predictionText: "다음 검증: 적합에서 제외한 국가·기간에서 상태별 반응과 지연 분포를 비교합니다. 선행, 예측 개선, 노출 원인은 별도로 검증합니다.",
    predictionLink: "예측 보기 →",
    predictionHref: "/predictions",
  },
} as const;

const ATLAS_COPY = {
  en: {
    intro: "The data explorer includes two published NHANES periods (1988–1991 and 1999–2004), with fully adjusted testosterone means and confidence intervals. These estimates account for age, race/ethnicity, body size, smoking and alcohol; they describe an adjusted comparison rather than an annual population trajectory.",
    link: "Explore the US hormone and health data",
  },
  fi: {
    intro: "Dataselain sisältää kaksi julkaistua NHANES-jaksoa (1988–1991 ja 1999–2004), joiden testosteronikeskiarvot ja luottamusvälit on vakioitu iän, etnisyysryhmän, kehon koon, tupakoinnin ja alkoholin suhteen. Luvut kuvaavat vakioitua vertailua; vuosittaista väestökehitystä niistä ei muodosteta.",
    link: "Tutki USA:n hormoni- ja terveysaineistoa",
  },
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const d = pickCopy(COPY, locale);
  return { title: `${d.title} – Extinction Field`, description: d.subtitle };
}

export default async function TestosteronePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const d = pickCopy(COPY, locale);
  const atlas = pickCopy(ATLAS_COPY, locale);
  const prefix = `/${locale}`;

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 sm:py-20">
      <p className="mb-6">
        <a href={`${prefix}/evidence`} className="text-sm text-accent hover:underline">{d.backLink}</a>
      </p>

      <PageHeader icon={TrendingDown} title={d.title} subtitle={d.subtitle} />

      <TestosteroneCalibrationUpdate locale={locale} />

      <CombinedExposurePanel locale={locale} focus="hormones" />
      <SteroidogenesisIntegrationPanel locale={locale} focus="hormones" />

      <div className="mt-8">
        <CautionBox locale={locale}><p>{d.cautionText}</p></CautionBox>
      </div>
      <div className="mt-6 rounded-lg border border-border/50 p-4 text-sm">
        <p className="text-foreground-muted leading-relaxed">{atlas.intro}</p>
        <Link href={`${prefix}/explore?tab=atlas&question=health&country=USA`} className="mt-3 inline-block text-accent hover:underline">{atlas.link} →</Link>
      </div>

      <section className="mt-14 border-t editorial-rule pt-6">
        <h2 className="text-2xl font-semibold mb-4">
          {pickCopy({
            en: "What a total-testosterone assay can miss",
            fi: "Mitä kokonais-testosteronimittaus voi jättää piiloon",
            ja: "総テストステロン測定で見落とし得るもの",
            fr: "Ce qu’un dosage de testostérone totale peut manquer",
            ko: "총 테스토스테론 검사에서 놓칠 수 있는 것",
          }, locale)}
        </h2>
        <p className="text-foreground-muted mb-6 leading-relaxed">
          <ClaimRef claimId="claim.androgen.receptor-use-capacity">
            {pickCopy({
              en: "Hormone concentration and hormone action are different observables. BERM now follows the entire serial chain, so a stable total-T value cannot by itself rule out altered binding, delivery, receptor function or downstream signal use.",
              fi: "Hormonipitoisuus ja hormonivaikutus ovat eri havaittavia suureita. BERM seuraa nyt koko sarjallista ketjua, joten vakaa kokonais-T-arvo ei yksin sulje pois muuttunutta sitoutumista, kuljetusta, reseptoritoimintaa tai alavirran signaalinkäyttöä.",
              ja: "ホルモン濃度と作用は別の観測量です。BERMは直列連鎖全体を追跡するため、総Tが不変でも結合、送達、受容体、下流シグナルの変化を除外できません。",
              fr: "La concentration hormonale et l’action hormonale sont des observables distincts. Une T totale stable n’exclut donc pas une altération de la liaison, de la distribution, des récepteurs ou de la signalisation aval.",
              ko: "호르몬 농도와 작용은 서로 다른 관측량입니다. 총 T가 안정적이어도 결합, 전달, 수용체 기능 또는 하류 신호 사용 변화를 배제할 수 없습니다.",
            }, locale)}
          </ClaimRef>
        </p>
        <HormoneCompartments locale={locale} />
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="min-w-0 rounded-lg border border-border/50 p-5">
            <h3 className="font-medium mb-3">
              {pickCopy({ en: "1. Availability", fi: "1. Saatavuus", ja: "1. 利用可能性", fr: "1. Disponibilité", ko: "1. 가용성" }, locale)}
            </h3>
            <MathBlock tex="T_{\mathrm{tot}}=T_f+B_{\mathrm{SHBG}}\frac{T_f}{K_{\mathrm{SHBG}}+T_f}+B_{\mathrm{Alb}}\frac{T_f}{K_{\mathrm{Alb}}+T_f}" />
            <p className="mt-3 text-xs text-foreground-muted leading-relaxed">
              <ClaimRef claimId="claim.androgen.binding-availability">
                {pickCopy({
                  en: "SHBG and albumin change free-hormone availability at the same total concentration; intratesticular T is a separate compartment.",
                  fi: "SHBG ja albumiini muuttavat vapaan hormonin saatavuutta samalla kokonaispitoisuudella; intratestikulaarinen T on erillinen kompartimentti.",
                  ja: "SHBGとアルブミンは同じ総濃度でも遊離ホルモン量を変え、精巣内Tは別区画です。",
                  fr: "La SHBG et l’albumine modifient la fraction libre à T totale identique; la T intratesticulaire est un compartiment distinct.",
                  ko: "SHBG와 알부민은 같은 총 농도에서도 유리 호르몬을 바꾸며 고환내 T는 별도 구획입니다.",
                }, locale)}
              </ClaimRef>
            </p>
          </div>
          <div className="min-w-0 rounded-lg border border-border/50 p-5">
            <h3 className="font-medium mb-3">
              {pickCopy({ en: "2. Reception and use", fi: "2. Vastaanotto ja käyttö", ja: "2. 受容と利用", fr: "2. Réception et utilisation", ko: "2. 수용과 사용" }, locale)}
            </h3>
            <MathBlock tex="S_r=R_r\frac{T_f}{K_{d,r}+T_f}G_r,\qquad \mathrm{AEC}=\frac{\sum_r w_rS_r}{\sum_r w_r}" />
            <p className="mt-3 text-xs text-foreground-muted leading-relaxed">
              {pickCopy({
                en: "AR or ZIP9 abundance, affinity and post-receptor gain can change tissue action without a proportional serum total-T change.",
                fi: "AR:n tai ZIP9:n määrä, affiniteetti ja reseptorin jälkeinen vahvistus voivat muuttaa kudosvaikutusta ilman suhteellista seerumin kokonais-T-muutosta.",
                ja: "AR/ZIP9量、親和性、受容体後利得は、血清総Tの比例変化なしに組織作用を変え得ます。",
                fr: "L’abondance d’AR ou ZIP9, leur affinité et le gain post-récepteur peuvent modifier l’action tissulaire sans changement proportionnel de T totale.",
                ko: "AR 또는 ZIP9 양, 친화도, 수용체 후 이득은 혈청 총 T의 비례 변화 없이 조직 작용을 바꿀 수 있습니다.",
              }, locale)}
            </p>
          </div>
        </div>
        <div className="mt-5 rounded-lg border border-amber-500/30 bg-amber-500/5 p-4">
          <p className="text-sm text-foreground-muted leading-relaxed">
            {pickCopy({
              en: "Evidence boundary: SHBG/free-T physiology and Sertoli-cell AR necessity are established components. A 2605 MHz rat/Sertoli study directly implicated ZIP9 but did not show short-term sperm impairment; a randomized acute MRI study found no testosterone or SHBG change in 24 men. Human chronic EMF→androgen-use calibration remains open.",
              fi: "Näyttöraja: SHBG-/vapaa-T-fysiologia ja Sertoli-solun AR:n välttämättömyys ovat vakiintuneita osia. 2605 MHz:n rotta-/Sertoli-tutkimus liitti ZIP9:n suoraan vasteeseen, mutta ei osoittanut lyhyen aikavälin siittiöhaittaa; satunnaistettu akuutti MRI-tutkimus ei löytänyt testosteroni- tai SHBG-muutosta 24 miehellä. Ihmisen krooninen EMF→androgeeninkäyttökalibraatio on avoin.",
              ja: "証拠境界：SHBG/遊離T生理とSertoli細胞ARの必要性は確立した構成要素です。2605 MHzラット研究はZIP9を示しましたが短期精子障害はなく、24人の急性MRI試験ではT/SHBG変化がありませんでした。慢性ヒト校正は未解決です。",
              fr: "Limite des preuves : la physiologie SHBG/T libre et la nécessité de l’AR des cellules de Sertoli sont établies. Une étude rat/Sertoli à 2605 MHz implique ZIP9 sans atteinte spermatique à court terme; un essai IRM aigu chez 24 hommes n’a trouvé aucun changement de T ou SHBG. La calibration humaine chronique reste ouverte.",
              ko: "근거 경계: SHBG/유리 T 생리와 Sertoli 세포 AR 필요성은 확립된 구성 요소입니다. 2605 MHz 쥐 연구는 ZIP9를 연결했지만 단기 정자 손상은 없었고, 24명 급성 MRI 시험은 T/SHBG 변화를 찾지 못했습니다. 만성 인체 보정은 열려 있습니다.",
            }, locale)}
            {" "}<StudyCitation referenceId="narinx2022_free_testosterone" locale={locale} />{" · "}
            <StudyCitation referenceId="degendt2004_sertoli_ar" locale={locale} />{" · "}
            <StudyCitation referenceId="yu2023_zip9_rf_sertoli" locale={locale} />{" · "}
            <StudyCitation referenceId="mollerlokken2012_mri_hormones" locale={locale} />
          </p>
        </div>
      </section>

      {/* Section 3: LH-T Diagnostic */}
      <section className="mt-14 border-t editorial-rule pt-6">
        <h2 className="text-2xl font-semibold mb-4">{d.s3Title}</h2>
        <p className="text-foreground-muted mb-6">{d.s3Lead}</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          {d.s3Patterns.map((p) => (
            <div
              key={p.pattern}
              className={`rounded-lg border p-4 ${
                p.color === "blue"
                  ? "border-blue-500/30 bg-blue-500/5"
                  : "border-amber-500/30 bg-amber-500/5"
              }`}
            >
              <h3 className="font-mono font-semibold mb-2">{p.pattern}</h3>
              <p className="text-sm text-foreground-muted">{p.detail}</p>
            </div>
          ))}
        </div>
        <div className="rounded-lg bg-blue-500/10 border border-blue-500/30 p-4 mb-4">
          <p className="font-semibold">{d.s3Observed}</p>
        </div>
        <p className="text-sm text-foreground-muted">{d.s3Implication}</p>
      </section>

      {/* Section 3b: Chemical vs EMF */}
      {d.s3bRows && (
        <section className="mt-14 border-t editorial-rule pt-6">
          <h2 className="text-2xl font-semibold mb-4">{d.s3bTitle}</h2>
          <p className="text-foreground-muted mb-4">{d.s3bLead}</p>
          <div className="chart-scroll mb-4">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-card-border">
                  <th className="text-left py-2 pr-4 font-semibold"></th>
                  <th className="text-left py-2 pr-4 font-semibold text-status-partial">EDC</th>
                  <th className="text-left py-2 font-semibold text-accent">EMF</th>
                </tr>
              </thead>
              <tbody>
                {d.s3bRows.map((row: { axis: string; edc: string; emf: string }) => (
                  <tr key={row.axis} className="border-b border-card-border/50">
                    <td className="py-2 pr-4 font-medium">{row.axis}</td>
                    <td className="py-2 pr-4 text-foreground-muted">{row.edc}</td>
                    <td className="py-2 text-foreground-muted">{row.emf}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-sm text-foreground-muted">{d.s3bConclusion}</p>
        </section>
      )}

      {/* Section 4: Cross-Species Gradient */}
      <section className="mt-14 border-t editorial-rule pt-6">
        <h2 className="text-2xl font-semibold mb-4">{d.s4Title}</h2>
        <p className="text-foreground-muted mb-4">{d.s4Lead}</p>
        <div className="rounded-lg bg-accent/5 border border-accent/20 p-4 text-center mb-6">
          <p className="text-lg font-mono font-semibold">{d.s4Stat}</p>
        </div>
        <CrossSpeciesGradient />
        <div className="mt-4 rounded-lg border border-amber-500/30 bg-amber-500/5 p-3">
          <p className="text-sm text-foreground-muted">{d.s4Caveat}</p>
        </div>
      </section>

      {/* Section 5: Epistemological Honesty */}
      <section className="mt-14 border-t editorial-rule pt-6">
        <h2 className="text-2xl font-semibold mb-4">{d.s5Title}</h2>
        <ul className="space-y-2">
          {d.s5Points.map((point, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-foreground-muted">
              <span className="text-amber-500 mt-0.5 shrink-0">⚠</span>
              <span>{point}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Prediction */}
      <section className="mt-14 border-t editorial-rule pt-6">
        <DerivedPrediction>
          <p>{d.predictionText}</p>
          <a href={`${prefix}${d.predictionHref}`} className="text-sm text-accent hover:underline mt-2 inline-block">
            {d.predictionLink}
          </a>
        </DerivedPrediction>
      </section>
    </div>
  );
}
