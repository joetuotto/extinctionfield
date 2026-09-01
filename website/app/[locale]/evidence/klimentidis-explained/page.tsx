import type { Metadata } from "next";
import Link from "next/link";
import { FlaskConical } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { CautionBox } from "@/components/CautionBox";
import { DerivedPrediction } from "@/components/DerivedPrediction";
import { InlineReferenceText } from "@/components/InlineReferenceText";
import { pickCopy } from "@/lib/i18n";

const MECHANISM_COLORS: Record<string, string> = {
  amber: "border-l-4 border-amber-500",
  blue: "border-l-4 border-blue-500",
  red: "border-l-4 border-red-500",
};

const COPY = {
  en: {
    title: "Klimentidis Paradox Explained",
    subtitle:
      "Eight species gaining weight simultaneously, including lab animals on controlled diets. BERM identifies three EMF-mediated Ca²⁺ mechanisms that explain the cross-species obesity trend.",
    backLink: "← Back to Evidence",

    cautionText:
      "This page presents the mechanistic explanation for the Klimentidis cross-species obesity paradox. Each mechanism has been independently verified in peer-reviewed literature. The convergence hypothesis — that all three mechanisms are Ca²⁺-mediated and VGCC-dependent — generates specific testable predictions.",

    paradoxTitle: "The Paradox",
    paradoxLead:
      "In 2011, Klimentidis et al. documented that 8 species — including laboratory animals on strictly controlled diets — are all gaining weight over time (p=10⁻⁷). This eliminates diet and exercise as sole explanations. Something environmental is driving weight gain across ALL species with shared biology.",
    paradoxPoints: [
      "Laboratory primates (controlled diet, controlled exercise)",
      "Feral rats (different environment, no human food)",
      "Domestic cats and dogs (varied diets, varied activity)",
      "Each species analyzed independently — the trend is universal",
    ],

    mechanismsTitle: "Three Ca²⁺-mediated mechanisms",
    mechanismsLead:
      "BERM identifies three EMF-mediated pathways through the Ca²⁺ cascade that each independently promote weight gain. Together, they explain why the trend is cross-species: ALL species with VGCCs are affected.",
    mechanisms: [
      {
        name: "Brown Adipose Tissue (BAT) Suppression",
        id: "MECH-1",
        color: "amber",
        mechanism: "5G (3.5 GHz) → PRDM16 mRNA↓ + C/EBPβ mRNA↓ in brown adipose tissue",
        consequence:
          "BAT uses Ca²⁺ cycling (SERCA) for thermogenesis. Reduced PRDM16 → less BAT → reduced energy expenditure → weight gain on identical caloric intake",
        evidence: "[[ref:bat_5g_prdm16|PMC11942954]] (2025): Direct measurement of PRDM16 reduction from 5G exposure",
        status: "Experimentally confirmed",
      },
      {
        name: "β-Cell Insulin Dynamics Disruption",
        id: "MECH-2",
        color: "blue",
        mechanism: "Electric field → Ca²⁺ channels open in β-cells → insulin secretion WITHOUT glucose",
        consequence:
          "CaVγ4→CaMKII→MafA pathway: CaMKII dysregulation → β-cell identity loss → basal hyperinsulinemia → insulin resistance → weight gain",
        evidence: "[[ref:betacell_efield|PMID:32323041]] + [[ref:cavg4_camkii_mafa|PMC9030882]]: E-field insulin secretion + CaMKII→MafA pathway",
        status: "Experimentally confirmed",
      },
      {
        name: "HPA Axis Cortisol Elevation",
        id: "MECH-3",
        color: "red",
        mechanism: "EMF → HPA sensitization (NOT adaptation) → chronic cortisol elevation",
        consequence:
          "Cortisol → visceral fat deposition, insulin resistance, leptin resistance → metabolic syndrome → weight gain",
        evidence: "Klimek 2023 + Frontiers 2026: HPA sensitization + corticosterone elevation",
        status: "Experimentally confirmed",
      },
    ],

    resolutionTitle: "The Resolution",
    resolutionContent:
      "All three mechanisms are mediated through voltage-gated calcium channels (VGCCs). VGCCs are evolutionarily ancient — present in ALL vertebrates and most invertebrates. Any environmental factor that opens VGCCs would affect ALL species with these channels. This is exactly the Klimentidis pattern: cross-species weight gain driven by a ubiquitous environmental change (EMF exposure) acting on a conserved molecular target (VGCC).",
    resolutionKey:
      "The Klimentidis paradox is not paradoxical under BERM — it is predicted. Cross-species effects are the expected outcome of disrupting an evolutionarily conserved mechanism.",

    consequenceLabel: "Consequence",
    derivedPredictionText: "The mechanistic explanation of the Klimentidis paradox generates testable predictions covering BAT suppression, β-cell insulin dynamics, and HPA axis sensitization.",
    predictionLink: "See mechanistic chain predictions (KLIM-1, BAT-EMF-1, BETA-EMF-1–2)",
    predictionHref: "/predictions",
  },

  fi: {
    title: "Klimentidiksen paradoksi selitettynä",
    subtitle:
      "Kahdeksan lajia lihoo samanaikaisesti, mukaan lukien laboratorio-eläimet kontrolloiduilla dieeteillä. BERM tunnistaa kolme EMF-välitteistä Ca²⁺-mekanismia jotka selittävät lajienvälisen lihavuustrendin.",
    backLink: "← Takaisin näyttöön",

    cautionText:
      "Tämä sivu esittää mekanistisen selityksen Klimentidiksen lajienväliselle lihavuusparadoksille. Jokainen mekanismi on todennettu itsenäisesti vertaisarvioidussa kirjallisuudessa. Yhdentymishypoteesi — että kaikki kolme mekanismia ovat Ca²⁺-välitteisiä ja VGCC-riippuvaisia — tuottaa tarkkoja testattavia ennusteita.",

    paradoxTitle: "Paradoksi",
    paradoxLead:
      "Vuonna 2011 Klimentidis ym. dokumentoivat, että 8 lajia — mukaan lukien laboratorio-eläimet tiukasti kontrolloiduilla dieeteillä — lihovat kaikki ajan myötä (p=10⁻⁷). Tämä poistaa dieetin ja liikunnan ainoina selityksiinä. Jokin ympäristötekijä ajaa painonnousua KAIKISSA lajeissa joilla on yhteistä biologiaa.",
    paradoxPoints: [
      "Laboratorioapinat (kontrolloitu dieetti, kontrolloitu liikunta)",
      "Villit rotat (eri ympäristö, ei ihmisruokaa)",
      "Kotikissat ja -koirat (vaihtelevat dieetit, vaihteleva aktiivisuus)",
      "Jokainen laji analysoitu itsenäisesti — trendi on universaali",
    ],

    mechanismsTitle: "Kolme Ca²⁺-välitteistä mekanismia",
    mechanismsLead:
      "BERM tunnistaa kolme EMF-välitteistä reittiä Ca²⁺-kaskadin kautta, jotka kukin itsenäisesti edistävät painonnousua. Yhdessä ne selittävät miksi trendi on lajienvälinen: KAIKKI lajit joilla on VGCC:t ovat alttiita.",
    mechanisms: [
      {
        name: "Ruskean rasvakudoksen (BAT) suppressio",
        id: "MECH-1",
        color: "amber",
        mechanism: "5G (3,5 GHz) → PRDM16 mRNA↓ + C/EBPβ mRNA↓ ruskeassa rasvakudoksessa",
        consequence:
          "BAT käyttää Ca²⁺-syklausta (SERCA) termogeneesiin. Vähentynyt PRDM16 → vähemmän BAT:ia → alentunut energiankulutus → painonnousu identtisellä kalorimäärällä",
        evidence: "[[ref:bat_5g_prdm16|PMC11942954]] (2025): PRDM16-vähenemisen suora mittaus 5G-altistuksesta",
        status: "Kokeellisesti vahvistettu",
      },
      {
        name: "β-solun insuliinidynamiikan häiriö",
        id: "MECH-2",
        color: "blue",
        mechanism: "Sähkökenttä → Ca²⁺-kanavat avautuvat β-soluissa → insuliinin eritys ILMAN glukoosia",
        consequence:
          "CaVγ4→CaMKII→MafA-reitti: CaMKII:n dysregulaatio → β-solun identiteetin menetys → basaalinen hyperinsulinemia → insuliiniresistenssi → painonnousu",
        evidence: "[[ref:betacell_efield|PMID:32323041]] + [[ref:cavg4_camkii_mafa|PMC9030882]]: Sähkökenttä-insuliinieritys + CaMKII→MafA-reitti",
        status: "Kokeellisesti vahvistettu",
      },
      {
        name: "HPA-akselin kortisolinkohonnus",
        id: "MECH-3",
        color: "red",
        mechanism: "EMF → HPA-sensitisaatio (EI adaptaatio) → krooninen kortisolin kohonnus",
        consequence:
          "Kortisoli → viskeraalisen rasvan kertyminen, insuliiniresistenssi, leptiiniresistenssi → metabolinen oireyhtymä → painonnousu",
        evidence: "Klimek 2023 + Frontiers 2026: HPA-sensitisaatio + kortikosteronin kohonnus",
        status: "Kokeellisesti vahvistettu",
      },
    ],

    resolutionTitle: "Ratkaisu",
    resolutionContent:
      "Kaikki kolme mekanismia välittyvät jänniteohjattujen kalsiumkanavien (VGCC) kautta. VGCC:t ovat evoluutionaalisesti muinaisia — läsnä KAIKISSA selkärankaisissa ja useimmissa selkärangattomissa. Mikä tahansa ympäristötekijä joka avaa VGCC:t vaikuttaisi KAIKKIIN lajeihin joilla on nämä kanavat. Tämä on täsmälleen Klimentidiksen kuvio: lajienvälinen painonnousu jonka ajaa kaikkiallinen ympäristömuutos (EMF-altistus) joka vaikuttaa konservoituneeseen molekyylitason kohteeseen (VGCC).",
    resolutionKey:
      "Klimentidiksen paradoksi ei ole paradoksaalinen BERM:n alla — se on ennustettu. Lajienväliset vaikutukset ovat odotettavissa oleva tulos evoluutionaalisesti konservoituneen mekanismin häiriöstä.",

    consequenceLabel: "Seuraus",
    derivedPredictionText: "Klimentidiksen paradoksin mekanistinen selitys tuottaa testattavia ennusteita BAT-suppressiosta, β-solun insuliinidynamiikasta ja HPA-akselin sensitisaatiosta.",
    predictionLink: "Ks. mekanistisen ketjun ennusteet (KLIM-1, BAT-EMF-1, BETA-EMF-1–2)",
    predictionHref: "/predictions",
  },

  ja: {
    title: "Klimentidisパラドックスの解明",
    subtitle:
      "管理された食餌下の実験動物を含む8種が同時に体重増加。BERMは種間肥満傾向を説明する3つのEMF媒介Ca²⁺メカニズムを特定。",
    backLink: "← エビデンスに戻る",

    cautionText:
      "このページはKlimentidisの種間肥満パラドックスのメカニズム的説明を提示します。各メカニズムは査読済み文献で独立に検証されています。収束仮説――3つのメカニズムすべてがCa²⁺媒介でVGCC依存である――は特定の検証可能な予測を生成します。",

    paradoxTitle: "パラドックス",
    paradoxLead:
      "2011年、Klimentidisらは8種――厳密に管理された食餌下の実験動物を含む――がすべて経時的に体重増加していることを記録しました（p=10⁻⁷）。これは食餌と運動を唯一の説明として排除します。共通の生物学を持つすべての種において、何らかの環境要因が体重増加を駆動しています。",
    paradoxPoints: [
      "実験用霊長類（管理された食餌、管理された運動）",
      "野生ラット（異なる環境、人間の食物なし）",
      "飼い猫と飼い犬（様々な食餌、様々な活動量）",
      "各種は独立に分析――傾向は普遍的",
    ],

    mechanismsTitle: "3つのCa²⁺媒介メカニズム",
    mechanismsLead:
      "BERMはCa²⁺カスケードを介する3つのEMF媒介経路を特定し、それぞれが独立に体重増加を促進します。これらを合わせると、傾向が種を超えている理由を説明します：VGCCを持つすべての種が影響を受けます。",
    mechanisms: [
      {
        name: "褐色脂肪組織（BAT）抑制",
        id: "MECH-1",
        color: "amber",
        mechanism: "5G（3.5 GHz）→ 褐色脂肪組織のPRDM16 mRNA↓ + C/EBPβ mRNA↓",
        consequence:
          "BATはCa²⁺サイクリング（SERCA）を熱産生に利用。PRDM16減少 → BAT減少 → エネルギー消費減少 → 同一カロリー摂取での体重増加",
        evidence: "[[ref:bat_5g_prdm16|PMC11942954]]（2025）：5G曝露によるPRDM16減少の直接測定",
        status: "実験的に確認済み",
      },
      {
        name: "β細胞インスリン動態の撹乱",
        id: "MECH-2",
        color: "blue",
        mechanism: "電界 → β細胞のCa²⁺チャネル開口 → グルコースなしのインスリン分泌",
        consequence:
          "CaVγ4→CaMKII→MafA経路：CaMKII調節異常 → β細胞アイデンティティ喪失 → 基礎的高インスリン血症 → インスリン抵抗性 → 体重増加",
        evidence: "[[ref:betacell_efield|PMID:32323041]] + [[ref:cavg4_camkii_mafa|PMC9030882]]：電界インスリン分泌 + CaMKII→MafA経路",
        status: "実験的に確認済み",
      },
      {
        name: "HPA軸コルチゾール上昇",
        id: "MECH-3",
        color: "red",
        mechanism: "EMF → HPA感作（適応ではない）→ 慢性的コルチゾール上昇",
        consequence:
          "コルチゾール → 内臓脂肪蓄積、インスリン抵抗性、レプチン抵抗性 → メタボリックシンドローム → 体重増加",
        evidence: "Klimek 2023 + Frontiers 2026：HPA感作 + コルチコステロン上昇",
        status: "実験的に確認済み",
      },
    ],

    resolutionTitle: "解決",
    resolutionContent:
      "3つのメカニズムすべてが電位依存性カルシウムチャネル（VGCC）を介して媒介されます。VGCCは進化的に古く――すべての脊椎動物とほとんどの無脊椎動物に存在します。VGCCを開く環境要因は、これらのチャネルを持つすべての種に影響します。これはまさにKlimentidisのパターンです：保存された分子標的（VGCC）に作用する遍在的な環境変化（EMF曝露）によって駆動される種間体重増加。",
    resolutionKey:
      "KlimentidisパラドックスはBERMの下ではパラドックスではありません――それは予測されたものです。種間効果は、進化的に保存されたメカニズムの撹乱から期待される結果です。",

    consequenceLabel: "結果",
    derivedPredictionText: "Klimentidisパラドックスのメカニズム的説明は、BAT抑制、β細胞インスリン動態、HPA軸感作に関する検証可能な予測を生成します。",
    predictionLink: "メカニズム連鎖予測を参照（KLIM-1, BAT-EMF-1, BETA-EMF-1–2）",
    predictionHref: "/predictions",
  },

  fr: {
    title: "Le paradoxe de Klimentidis expliqué",
    subtitle:
      "Huit espèces prennent du poids simultanément, y compris des animaux de laboratoire sous régime contrôlé. BERM identifie trois mécanismes Ca²⁺ médiés par les EMF qui expliquent la tendance inter-espèces à l'obésité.",
    backLink: "← Retour aux preuves",

    cautionText:
      "Cette page présente l'explication mécanistique du paradoxe d'obésité inter-espèces de Klimentidis. Chaque mécanisme a été vérifié indépendamment dans la littérature évaluée par les pairs. L'hypothèse de convergence — selon laquelle les trois mécanismes sont médiés par Ca²⁺ et dépendants des VGCC — génère des prédictions testables spécifiques.",

    paradoxTitle: "Le paradoxe",
    paradoxLead:
      "En 2011, Klimentidis et al. ont documenté que 8 espèces — y compris des animaux de laboratoire sous régimes strictement contrôlés — prennent toutes du poids au fil du temps (p=10⁻⁷). Cela élimine le régime alimentaire et l'exercice comme seules explications. Un facteur environnemental entraîne la prise de poids chez TOUTES les espèces partageant une biologie commune.",
    paradoxPoints: [
      "Primates de laboratoire (alimentation contrôlée, exercice contrôlé)",
      "Rats sauvages (environnement différent, pas de nourriture humaine)",
      "Chats et chiens domestiques (alimentation variée, activité variée)",
      "Chaque espèce analysée indépendamment — la tendance est universelle",
    ],

    mechanismsTitle: "Trois mécanismes médiés par Ca²⁺",
    mechanismsLead:
      "BERM identifie trois voies médiées par les EMF à travers la cascade Ca²⁺ qui favorisent chacune indépendamment la prise de poids. Ensemble, elles expliquent pourquoi la tendance est inter-espèces : TOUTES les espèces possédant des VGCC sont affectées.",
    mechanisms: [
      {
        name: "Suppression du tissu adipeux brun (BAT)",
        id: "MECH-1",
        color: "amber",
        mechanism: "5G (3,5 GHz) → PRDM16 mRNA↓ + C/EBPβ mRNA↓ dans le tissu adipeux brun",
        consequence:
          "Le BAT utilise le cyclage Ca²⁺ (SERCA) pour la thermogenèse. PRDM16 réduit → moins de BAT → dépense énergétique réduite → prise de poids à apport calorique identique",
        evidence: "[[ref:bat_5g_prdm16|PMC11942954]] (2025) : Mesure directe de la réduction de PRDM16 par exposition 5G",
        status: "Confirmé expérimentalement",
      },
      {
        name: "Perturbation de la dynamique insulinique des cellules β",
        id: "MECH-2",
        color: "blue",
        mechanism: "Champ électrique → ouverture des canaux Ca²⁺ dans les cellules β → sécrétion d'insuline SANS glucose",
        consequence:
          "Voie CaVγ4→CaMKII→MafA : dérégulation de CaMKII → perte d'identité des cellules β → hyperinsulinémie basale → résistance à l'insuline → prise de poids",
        evidence: "[[ref:betacell_efield|PMID:32323041]] + [[ref:cavg4_camkii_mafa|PMC9030882]] : Sécrétion d'insuline par champ E + voie CaMKII→MafA",
        status: "Confirmé expérimentalement",
      },
      {
        name: "Élévation du cortisol par l'axe HPA",
        id: "MECH-3",
        color: "red",
        mechanism: "EMF → sensibilisation HPA (PAS d'adaptation) → élévation chronique du cortisol",
        consequence:
          "Cortisol → dépôt de graisse viscérale, résistance à l'insuline, résistance à la leptine → syndrome métabolique → prise de poids",
        evidence: "Klimek 2023 + Frontiers 2026 : Sensibilisation HPA + élévation de la corticostérone",
        status: "Confirmé expérimentalement",
      },
    ],

    resolutionTitle: "La résolution",
    resolutionContent:
      "Les trois mécanismes sont médiés par les canaux calciques voltage-dépendants (VGCC). Les VGCC sont évolutivement anciens — présents chez TOUS les vertébrés et la plupart des invertébrés. Tout facteur environnemental ouvrant les VGCC affecterait TOUTES les espèces possédant ces canaux. C'est exactement le schéma de Klimentidis : une prise de poids inter-espèces entraînée par un changement environnemental ubiquitaire (exposition aux EMF) agissant sur une cible moléculaire conservée (VGCC).",
    resolutionKey:
      "Le paradoxe de Klimentidis n'est pas paradoxal selon BERM — il est prédit. Les effets inter-espèces sont le résultat attendu de la perturbation d'un mécanisme évolutivement conservé.",

    consequenceLabel: "Conséquence",
    derivedPredictionText: "L'explication mécanistique du paradoxe de Klimentidis génère des prédictions testables concernant la suppression du BAT, la dynamique insulinique des cellules β et la sensibilisation de l'axe HPA.",
    predictionLink: "Voir les prédictions de la chaîne mécanistique (KLIM-1, BAT-EMF-1, BETA-EMF-1–2)",
    predictionHref: "/predictions",
  },

  ko: {
    title: "Klimentidis 패러독스 설명",
    subtitle:
      "통제된 식이 하의 실험동물을 포함한 8종이 동시에 체중 증가. BERM은 종간 비만 추세를 설명하는 3가지 EMF 매개 Ca²⁺ 메커니즘을 확인.",
    backLink: "← 증거로 돌아가기",

    cautionText:
      "이 페이지는 Klimentidis 종간 비만 패러독스의 메커니즘적 설명을 제시합니다. 각 메커니즘은 동료 심사를 거친 문헌에서 독립적으로 검증되었습니다. 수렴 가설 — 세 메커니즘 모두 Ca²⁺ 매개이며 VGCC 의존적이라는 것 — 은 특정 검증 가능한 예측을 생성합니다.",

    paradoxTitle: "패러독스",
    paradoxLead:
      "2011년 Klimentidis 등은 8종 — 엄격히 통제된 식이 하의 실험동물 포함 — 이 모두 시간이 지남에 따라 체중이 증가하고 있음을 기록했습니다(p=10⁻⁷). 이는 식이와 운동을 유일한 설명에서 배제합니다. 공유된 생물학을 가진 모든 종에서 어떤 환경 요인이 체중 증가를 유발하고 있습니다.",
    paradoxPoints: [
      "실험용 영장류 (통제된 식이, 통제된 운동)",
      "야생 쥐 (다른 환경, 인간 음식 없음)",
      "반려 고양이와 개 (다양한 식이, 다양한 활동량)",
      "각 종은 독립적으로 분석 — 추세는 보편적",
    ],

    mechanismsTitle: "세 가지 Ca²⁺ 매개 메커니즘",
    mechanismsLead:
      "BERM은 Ca²⁺ 캐스케이드를 통한 3가지 EMF 매개 경로를 확인하며, 각각 독립적으로 체중 증가를 촉진합니다. 이들을 합치면 추세가 왜 종간인지 설명합니다: VGCC를 가진 모든 종이 영향을 받습니다.",
    mechanisms: [
      {
        name: "갈색 지방 조직(BAT) 억제",
        id: "MECH-1",
        color: "amber",
        mechanism: "5G (3.5 GHz) → 갈색 지방 조직의 PRDM16 mRNA↓ + C/EBPβ mRNA↓",
        consequence:
          "BAT는 열 생성에 Ca²⁺ 순환(SERCA)을 사용. PRDM16 감소 → BAT 감소 → 에너지 소비 감소 → 동일 칼로리 섭취에서 체중 증가",
        evidence: "[[ref:bat_5g_prdm16|PMC11942954]] (2025): 5G 노출에 의한 PRDM16 감소 직접 측정",
        status: "실험적으로 확인됨",
      },
      {
        name: "β세포 인슐린 역학 교란",
        id: "MECH-2",
        color: "blue",
        mechanism: "전기장 → β세포의 Ca²⁺ 채널 개방 → 포도당 없이 인슐린 분비",
        consequence:
          "CaVγ4→CaMKII→MafA 경로: CaMKII 조절 이상 → β세포 정체성 상실 → 기저 고인슐린혈증 → 인슐린 저항성 → 체중 증가",
        evidence: "[[ref:betacell_efield|PMID:32323041]] + [[ref:cavg4_camkii_mafa|PMC9030882]]: 전기장 인슐린 분비 + CaMKII→MafA 경로",
        status: "실험적으로 확인됨",
      },
      {
        name: "HPA 축 코르티솔 상승",
        id: "MECH-3",
        color: "red",
        mechanism: "EMF → HPA 감작(적응이 아님) → 만성 코르티솔 상승",
        consequence:
          "코르티솔 → 내장 지방 축적, 인슐린 저항성, 렙틴 저항성 → 대사 증후군 → 체중 증가",
        evidence: "Klimek 2023 + Frontiers 2026: HPA 감작 + 코르티코스테론 상승",
        status: "실험적으로 확인됨",
      },
    ],

    resolutionTitle: "해결",
    resolutionContent:
      "세 메커니즘 모두 전압 의존성 칼슘 채널(VGCC)을 통해 매개됩니다. VGCC는 진화적으로 고대의 것으로 — 모든 척추동물과 대부분의 무척추동물에 존재합니다. VGCC를 여는 환경 요인은 이 채널을 가진 모든 종에 영향을 미칩니다. 이것이 바로 Klimentidis 패턴입니다: 보존된 분자 표적(VGCC)에 작용하는 편재하는 환경 변화(EMF 노출)에 의해 구동되는 종간 체중 증가.",
    resolutionKey:
      "Klimentidis 패러독스는 BERM 하에서 패러독스가 아닙니다 — 예측된 것입니다. 종간 효과는 진화적으로 보존된 메커니즘의 교란에서 예상되는 결과입니다.",

    consequenceLabel: "결과",
    derivedPredictionText: "Klimentidis 패러독스의 메커니즘적 설명은 BAT 억제, β세포 인슐린 역학, HPA 축 감작에 관한 검증 가능한 예측을 생성합니다.",
    predictionLink: "메커니즘 연쇄 예측 참조 (KLIM-1, BAT-EMF-1, BETA-EMF-1–2)",
    predictionHref: "/predictions",
  },
} as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const d = pickCopy(COPY, locale);
  return {
    title: `${d.title} – Extinction Field`,
    description: d.subtitle,
  };
}

export default async function KlimentidisExplainedPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const d = pickCopy(COPY, locale);
  const prefix = `/${locale}`;

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 sm:py-20">
      <p className="mb-6">
        <Link href={`${prefix}/evidence`} className="text-sm text-accent hover:underline">
          {d.backLink}
        </Link>
      </p>

      <PageHeader icon={FlaskConical} title={d.title} subtitle={d.subtitle} />

      <div className="mt-8">
        <CautionBox locale={locale}>
          <p>{d.cautionText}</p>
        </CautionBox>
      </div>

      {/* The Paradox */}
      <section className="mt-12">
        <h2 className="text-lg font-semibold mb-2">{d.paradoxTitle}</h2>
        <p className="text-sm text-foreground-muted leading-relaxed mb-4 max-w-3xl">{d.paradoxLead}</p>
        <div className="space-y-2">
          {d.paradoxPoints.map((point, i) => (
            <div key={i} className="flex gap-2 text-sm text-foreground-muted leading-relaxed">
              <span className="text-accent shrink-0 mt-0.5">{"→"}</span>
              <p>{point}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Three Ca2+-mediated mechanisms */}
      <section className="mt-14 border-t editorial-rule pt-6">
        <h2 className="text-lg font-semibold mb-2">{d.mechanismsTitle}</h2>
        <p className="text-sm text-foreground-muted leading-relaxed mb-6 max-w-3xl">{d.mechanismsLead}</p>
        <div className="space-y-4">
          {d.mechanisms.map((mech) => (
            <div key={mech.id} className={`rounded-xl border border-card-border bg-card-bg p-5 ${MECHANISM_COLORS[mech.color]}`}>
              <div className="flex items-start justify-between gap-3 mb-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-mono-num text-xs text-accent">{mech.id}</span>
                    <h3 className="font-semibold text-sm">{mech.name}</h3>
                  </div>
                  <p className="text-xs text-foreground-muted">{mech.mechanism}</p>
                </div>
                <span className="shrink-0 px-2 py-0.5 rounded-full text-[10px] font-bold border bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/30">
                  {mech.status}
                </span>
              </div>
              <div className="rounded border border-card-border/60 bg-background p-3 mb-3">
                <p className="text-xs font-semibold text-foreground-muted mb-1">
                  {d.consequenceLabel}
                </p>
                <p className="text-sm text-foreground-muted leading-relaxed">{mech.consequence}</p>
              </div>
              <p className="text-sm text-foreground-muted leading-relaxed mb-1"><InlineReferenceText text={mech.evidence} locale={locale} /></p>
            </div>
          ))}
        </div>
      </section>

      {/* The Resolution */}
      <section className="mt-14 border-t editorial-rule pt-6">
        <h2 className="text-lg font-semibold mb-2">{d.resolutionTitle}</h2>
        <p className="text-sm text-foreground-muted leading-relaxed mb-4 max-w-3xl">{d.resolutionContent}</p>
        <div className="rounded-lg border-2 border-accent/40 bg-accent/5 p-4">
          <p className="text-sm text-foreground leading-relaxed italic">{d.resolutionKey}</p>
        </div>
      </section>

      {/* Predictions link */}
      <section className="mt-14 border-t editorial-rule pt-6">
        <DerivedPrediction>
          <p className="text-sm leading-relaxed mb-3">
            {d.derivedPredictionText}
          </p>
          <Link href={`${prefix}${d.predictionHref}`} className="text-sm text-accent hover:underline">
            {d.predictionLink} {"→"}
          </Link>
        </DerivedPrediction>
      </section>
    </div>
  );
}
