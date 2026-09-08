import { SteroidogenesisIntegrationPanel } from "@/components/SteroidogenesisIntegrationPanel";
import { HormoneCompartments } from "@/components/HormoneCompartments";
import type { Metadata } from "next";
import Link from "next/link";
import { TrendingDown } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { CautionBox } from "@/components/CautionBox";
import { DerivedPrediction } from "@/components/DerivedPrediction";
import { CrossSpeciesGradient } from "@/components/CrossSpeciesGradient";
import { TemporalTtoTFR } from "@/components/TemporalTtoTFR";
import { pickCopy } from "@/lib/i18n";
import { ClaimRef } from "@/components/ClaimRef";
import { StudyCitation } from "@/components/StudyCitation";
import { MathBlock } from "@/components/MathBlock";

const COPY = {
  en: {
    title: "Testosterone: The Biological Clock",
    subtitle: "Population studies document secular testosterone declines in several cohorts. BERM links central hormonal regulation with local Leydig-cell calcium, redox, clock and cholesterol-supply mechanisms, then follows hormone availability and tissue response into reproductive function.",
    backLink: "← Back to Evidence",
    cautionText: "Testosterone secular decline is reported in several cohorts, but its magnitude and cause remain debated. Total-T assays also do not measure binding, free or intratesticular hormone, AR/ZIP9 function or post-receptor signalling. The T→TFR and LH patterns are hypothesis-generating; neither proves EMF causation.",

    s1Title: "The secular decline",
    s1Lead: "Three independent datasets document the same pattern in US males:",
    s1Points: [
      { label: "AFHS cohort (Travison 2007)", detail: "638 ng/dL baseline in 1982. Age-independent decline of ~1.2%/year across three exam waves. Not explained by BMI, smoking, or comorbidity changes." },
      { label: "NHANES cross-sections (Lokeshwar 2021)", detail: "Continued decline through 2016 across all age groups 15–39. Young men (15–19) showed the steepest proportional drop." },
      { label: "European confirmation", detail: "Finnish, Danish, and French military conscript studies show parallel declines from the 1990s onward." },
    ],
    s1Stat: "USA trajectory: 638 → ~380 ng/dL (1982–2024), −1.2%/year age-independent",

    s2Title: "T → TFR temporal lag",
    s2Lead: "When USA testosterone is lagged 8 years against TFR, the fit is striking:",
    s2Stat: "R² = 0.97 (USA 2007–2024, lag = 8 years)",
    s2Detail: "The transfer function TFR = 0.00544 × T − 0.745 predicts the post-2007 TFR decline trajectory. The 8-year lag is biologically plausible: it represents the time from testosterone decline in young men to peak fertility impact in their late 20s–30s.",
    s2Caveat: "This is a within-country temporal correlation calibrated on the same data window. Out-of-sample validation requires other countries with harmonised longitudinal T data.",

    s3Title: "The LH–T diagnostic",
    s3Lead: "Santi et al. 2025 introduced a differential diagnostic based on simultaneous hormone trends:",
    s3Patterns: [
      { pattern: "T↓ + LH↓ = Hypothalamic", detail: "Reduced central stimulation is compatible with this pattern; simultaneous local steroidogenic limitations can still be present.", color: "blue" },
      { pattern: "T↓ + LH↑ = Testicular", detail: "Compensatory LH is compatible with limited testicular output. Calcium, redox, clock and substrate supply locate potential mechanisms; the hormone pattern alone does not identify their trigger.", color: "amber" },
    ],
    s3Observed: "Observed population pattern: T↓ + LH↓ (hypothalamic)",
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
    s5Points: [
      "The T→TFR model is calibrated AND validated on the same USA window — this inflates the R²",
      "Cross-sectional country-level T data is heterogeneous (different assays, ages, years)",
      "The 1.2%/year decline rate comes primarily from one US cohort study",
      "Other causes (obesity epidemic, metabolic syndrome, sleep disruption) are not excluded",
      "The cross-species gradient uses rough EMF burden estimates, not measured doses",
    ],

    predictionText: "Prediction T-1: Countries with earlier/steeper electrification will show earlier T decline onset, and the T→TFR lag will be consistent across populations with harmonised T data.",
    predictionLink: "See predictions →",
    predictionHref: "/predictions",
  },
  fi: {
    title: "Testosteroni: Biologinen kello",
    subtitle: "Väestötutkimukset dokumentoivat testosteronin pitkäaikaista laskua useissa kohorteissa. BERM yhdistää keskisen hormonisäätelyn Leydig-solujen paikalliseen kalsium-, redox-, kello- ja kolesterolihuoltoon ja seuraa hormonin saatavuutta sekä kudosvastetta lisääntymistoimintaan.",
    backLink: "← Takaisin näyttöön",
    cautionText: "Testosteronin pitkäaikaislaskua raportoidaan useissa kohorteissa, mutta sen suuruudesta ja syystä kiistellään. Kokonais-T-mittaus ei myöskään mittaa sitoutumista, vapaata tai intratestikulaarista hormonia, AR-/ZIP9-toimintaa eikä reseptorin jälkeistä signalointia. T→TFR- ja LH-kuviot tuottavat hypoteeseja; kumpikaan ei todista EMF-kausaalisuutta.",

    s1Title: "Pitkäaikaislasku",
    s1Lead: "Kolme riippumatonta aineistoa dokumentoivat saman kaavan yhdysvaltalaismiehillä:",
    s1Points: [
      { label: "AFHS-kohortti (Travison 2007)", detail: "638 ng/dL lähtötaso vuonna 1982. Iästä riippumaton lasku ~1,2 %/vuosi kolmessa tutkimusaallossa. Ei selity BMI:n, tupakoinnin tai oheissairauksien muutoksilla." },
      { label: "NHANES-poikkileikkaukset (Lokeshwar 2021)", detail: "Jatkunut lasku vuoteen 2016 kaikissa ikäryhmissä 15–39. Nuorilla miehillä (15–19) jyrkin suhteellinen pudotus." },
      { label: "Eurooppalainen vahvistus", detail: "Suomalaiset, tanskalaiset ja ranskalaiset varusmiestutkimukset osoittavat rinnakkaisia laskuja 1990-luvulta eteenpäin." },
    ],
    s1Stat: "USA:n kehityskulku: 638 → ~380 ng/dL (1982–2024), −1,2 %/vuosi iästä riippumaton",

    s2Title: "T → TFR -ajallinen viive",
    s2Lead: "Kun USA:n testosteronia viivästetään 8 vuotta TFR:n suhteen, yhteensopivuus on huomattava:",
    s2Stat: "R² = 0,97 (USA 2007–2024, viive = 8 vuotta)",
    s2Detail: "Siirtofunktio TFR = 0,00544 × T − 0,745 ennustaa vuoden 2007 jälkeisen TFR-laskun kehityskulun. 8 vuoden viive on biologisesti uskottava: se edustaa aikaa nuorten miesten testosteronilaskusta heidän huippuhedelmallisyysvaikutukseensa 20–30-vuotiaina.",
    s2Caveat: "Tämä on maan sisäinen ajallinen korrelaatio, joka on kalibroitu samalla data-ikkunalla. Otoksen ulkopuolinen validointi vaatii muita maita harmonisoidulla pitkättäisellä T-datalla.",

    s3Title: "LH–T-diagnostiikka",
    s3Lead: "Santi ym. 2025 esittivät erotusdiagnostiikan samanaikaisten hormonitrendien perusteella:",
    s3Patterns: [
      { pattern: "T↓ + LH↓ = Hypotalaaminen", detail: "Vähäinen keskinen stimulaatio sopii tähän kuvioon; paikallisia steroidogeneesin rajoitteita voi esiintyä samanaikaisesti.", color: "blue" },
      { pattern: "T↓ + LH↑ = Testikulaarinen", detail: "Kompensatorinen LH sopii rajalliseen kivestuotantoon. Kalsium, redox, kello ja substraattihuolto paikantavat mekanismiehdokkaita; hormonikuvio yksin ei yksilöi niiden laukaisijaa.", color: "amber" },
    ],
    s3Observed: "Havaittu väestökaava: T↓ + LH↓ (hypotalaaminen)",
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
    s5Points: [
      "T→TFR-malli on kalibroitu JA validoitu samalla USA-ikkunalla — tämä paisuttaa R²:ta",
      "Poikkileikkauksen maatason T-data on heterogeenistä (eri määritysmenetelmät, iät, vuodet)",
      "1,2 %/vuoden laskunopeus tulee ensisijaisesti yhdestä yhdysvaltalaisesta kohorttitutkimuksesta",
      "Muita syitä (lihavuusepidemia, metabolinen oireyhtymä, uniongelmat) ei ole suljettu pois",
      "Lajien välinen gradientti käyttää karkeita EMF-kuorma-arvioita, ei mitattuja annoksia",
    ],

    predictionText: "Ennuste T-1: Maissa, joissa sähköistys tapahtui aikaisemmin/jyrkemmin, T-lasku alkoi aikaisemmin, ja T→TFR-viive on yhdenmukainen populaatioissa harmonisoidulla T-datalla.",
    predictionLink: "Katso ennusteet →",
    predictionHref: "/predictions",
  },
  ja: {
    title: "テストステロン：生物学的時計",
    subtitle: "複数の集団研究はテストステロンの長期的低下を記録しています。BERMは中枢のホルモン調節とライディッヒ細胞のカルシウム、酸化還元、時計、コレステロール供給を結び、ホルモン利用可能性と組織応答から生殖機能まで追跡します。",
    backLink: "← エビデンスに戻る",
    cautionText: "テストステロンの長期的低下は確立されていますが、その原因は議論中です（肥満、EDC、生活習慣、EMF、または組み合わせ）。このページはT→TFRの時間的相関とLH診断をBERMと整合する証拠として提示します。どちらもEMFの因果関係を証明するものではありません。",

    s1Title: "長期的低下",
    s1Lead: "3つの独立したデータセットが米国男性で同じパターンを文書化しています：",
    s1Points: [
      { label: "AFHSコホート (Travison 2007)", detail: "1982年のベースライン638 ng/dL。3回の検査波で年齢非依存の低下約−1.2%/年。BMI、喚煙、併存疾患の変化では説明できません。" },
      { label: "NHANES横断面 (Lokeshwar 2021)", detail: "2016年まで全年齢層15〜39歳で継続的に低下。若い男性（15〜19歳）で最も急な比例的低下。" },
      { label: "欧州の確認", detail: "フィンランド、デンマーク、フランスの徴兵研究が1990年代以降の並行的低下を示しています。" },
    ],
    s1Stat: "USAの軌跡: 638 → ~380 ng/dL (1982–2024), −1.2%/年 年齢非依存",

    s2Title: "T → TFR 時間的ラグ",
    s2Lead: "USAのテストステロンをTFRに対して8年ラグさせると、適合が注目に値します：",
    s2Stat: "R² = 0.97 (USA 2007–2024, ラグ = 8年)",
    s2Detail: "転送関数 TFR = 0.00544 × T − 0.745 は2007年以降のTFR低下軌跡を予測します。8年のラグは生物学的にもっともらしい：若い男性のテストステロン低下から20代後半〜30代の生殖力ピークへの影響までの時間を表します。",
    s2Caveat: "これは同じデータウィンドウでキャリブレーションされた国内の時間的相関です。サンプル外検証には、調和された縦断的Tデータを持つ他の国が必要です。",

    s3Title: "LH–T診断",
    s3Lead: "Santiら 2025年は同時ホルモントレンドに基づく鑑別診断を導入しました：",
    s3Patterns: [
      { pattern: "T↓ + LH↓ = 視床下部性", detail: "中枢刺激低下に整合しますが、局所ステロイド産生の制約は併存し得ます。", color: "blue" },
      { pattern: "T↓ + LH↑ = 精巣性", detail: "代償性LHは精巣産生の制約に整合します。カルシウム、酸化還元、時計、基質供給が機構候補を特定しますが、ホルモンパターンだけでは原因を決められません。", color: "amber" },
    ],
    s3Observed: "観察された人口パターン: T↓ + LH↓ (視床下部性)",
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
    s5Points: [
      "T→TFRモデルは同じUSAウィンドウでキャリブレーションと検証が行われている—これはR²を過大評価する",
      "横断的な国レベルTデータは異質（異なるアッセイ、年齢、年）",
      "1.2%/年の低下率は主に1つの米国コホート研究から",
      "他の原因（肥満流行、メタボリックシンドローム、睡眠障害）は除外されていない",
      "種間グラディエントは大まかなEMF負荷推定を使用、測定線量ではない",
    ],

    predictionText: "予測 T-1: 電化が早い/急な国ではT低下の開始が早く、T→TFRラグは調和されたTデータを持つ集団間で一貫する。",
    predictionLink: "予測を見る →",
    predictionHref: "/predictions",
  },
  fr: {
    title: "Testostérone : L'horloge biologique",
    subtitle: "Des études de population documentent un déclin séculaire de la testostérone dans plusieurs cohortes. BERM relie la régulation hormonale centrale au calcium, au redox, à l’horloge et à l’approvisionnement en cholestérol des cellules de Leydig, puis suit la disponibilité hormonale et la réponse tissulaire jusqu’à la fonction reproductive.",
    backLink: "← Retour aux Évidences",
    cautionText: "Le déclin séculaire de la testostérone est établi, mais sa cause est débattue. Cette page présente la corrélation temporelle T→TFR et le diagnostic LH comme lignes d'évidence cohérentes avec BERM. Ni l'une ni l'autre ne prouve la causalité EMF.",

    s1Title: "Le déclin séculaire",
    s1Lead: "Trois jeux de données indépendants documentent le même schéma chez les hommes américains :",
    s1Points: [
      { label: "Cohorte AFHS (Travison 2007)", detail: "Base de 638 ng/dL en 1982. Déclin indépendant de l'âge d'environ −1,2 %/an sur trois vagues d'examen." },
      { label: "Coupes transversales NHANES (Lokeshwar 2021)", detail: "Déclin continu jusqu'en 2016 dans tous les groupes d'âge 15–39 ans." },
      { label: "Confirmation européenne", detail: "Les études de conscrits finlandais, danois et français montrent des déclins parallèles depuis les années 1990." },
    ],
    s1Stat: "Trajectoire USA : 638 → ~380 ng/dL (1982–2024), −1,2 %/an indépendant de l'âge",

    s2Title: "Décalage temporel T → TFR",
    s2Lead: "Quand la testostérone USA est décalée de 8 ans par rapport au TFR, l'ajustement est remarquable :",
    s2Stat: "R² = 0,97 (USA 2007–2024, décalage = 8 ans)",
    s2Detail: "La fonction de transfert TFR = 0,00544 × T − 0,745 prédit la trajectoire de déclin du TFR après 2007.",
    s2Caveat: "Corrélation temporelle intra-pays calibrée sur la même fenêtre de données. La validation hors échantillon nécessite d'autres pays.",

    s3Title: "Diagnostic LH–T",
    s3Lead: "Santi et al. 2025 ont introduit un diagnostic différentiel basé sur les tendances hormonales simultanées :",
    s3Patterns: [
      { pattern: "T↓ + LH↓ = Hypothalamique", detail: "Ce profil est compatible avec une stimulation centrale réduite ; des limites stéroïdogènes locales peuvent coexister.", color: "blue" },
      { pattern: "T↓ + LH↑ = Testiculaire", detail: "Une LH compensatoire est compatible avec une production testiculaire limitée. Calcium, redox, horloge et substrat localisent des mécanismes possibles sans identifier le déclencheur par ce profil seul.", color: "amber" },
    ],
    s3Observed: "Schéma observé : T↓ + LH↓ (hypothalamique)",
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
    s5Points: [
      "Le modèle T→TFR est calibré ET validé sur la même fenêtre USA",
      "Les données T par pays sont hétérogènes (différents dosages, âges, années)",
      "Le taux de déclin de 1,2 %/an provient principalement d'une seule étude de cohorte américaine",
      "D'autres causes (obésité, syndrome métabolique, perturbation du sommeil) ne sont pas exclues",
      "Le gradient inter-espèces utilise des estimations approximatives de la charge EMF",
    ],

    predictionText: "Prédiction T-1 : Les pays à électrification plus précoce montreront un début plus précoce du déclin de T.",
    predictionLink: "Voir les prédictions →",
    predictionHref: "/predictions",
  },
  ko: {
    title: "테스토스테론: 생물학적 시계",
    subtitle: "여러 인구 코호트는 테스토스테론의 장기적 감소를 기록합니다. BERM은 중추 호르몬 조절을 라이디히 세포의 칼슘, 산화환원, 시계 및 콜레스테롤 공급과 연결하고 호르몬 가용성과 조직 반응에서 생식 기능까지 추적합니다.",
    backLink: "← 증거로 돌아가기",
    cautionText: "테스토스테론의 장기적 감소는 확립되었지만 그 원인은 논의 중입니다. 이 페이지는 T→TFR 시간적 상관관계와 LH 진단을 BERM과 일치하는 증거로 제시합니다.",

    s1Title: "장기적 감소",
    s1Lead: "세 가지 독립 데이터셋이 미국 남성에서 같은 패턴을 문서화합니다:",
    s1Points: [
      { label: "AFHS 코호트 (Travison 2007)", detail: "1982년 기준 638 ng/dL. 3차 검사에서 나이 독립적 감소 약 -1.2%/년." },
      { label: "NHANES 횟단면 (Lokeshwar 2021)", detail: "2016년까지 모든 연령대 15-39세에서 지속적 감소." },
      { label: "유럽 확인", detail: "핀란드, 덴마크, 프랑스 징병 연구가 1990년대 이후 병행 감소를 보여줍니다." },
    ],
    s1Stat: "USA 궤적: 638 → ~380 ng/dL (1982–2024), -1.2%/년 나이 독립적",

    s2Title: "T → TFR 시간적 시차",
    s2Lead: "USA 테스토스테론을 TFR에 대해 8년 시차를 주면:",
    s2Stat: "R² = 0.97 (USA 2007–2024, 시차 = 8년)",
    s2Detail: "전달 함수 TFR = 0.00544 × T − 0.745는 2007년 이후 TFR 감소 궤적을 예측합니다.",
    s2Caveat: "같은 데이터 창에서 보정된 국내 시간적 상관관계입니다.",

    s3Title: "LH–T 진단",
    s3Lead: "Santi 등 2025년은 동시 호르몬 추세에 기반한 감별 진단을 도입했습니다:",
    s3Patterns: [
      { pattern: "T↓ + LH↓ = 시상하부성", detail: "중추 자극 감소와 일치하며 국소 스테로이드 생성 제한이 함께 있을 수 있습니다.", color: "blue" },
      { pattern: "T↓ + LH↑ = 고환성", detail: "보상성 LH는 제한된 고환 생산과 일치합니다. 칼슘, 산화환원, 시계 및 기질 공급은 후보 기전을 특정하지만 호르몬 양상만으로 유발 요인을 결정하지 않습니다.", color: "amber" },
    ],
    s3Observed: "관찰된 인구 패턴: T↓ + LH↓ (시상하부성)",
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
    s5Points: [
      "T→TFR 모델은 같은 USA 창에서 보정 및 검증됨 — R²를 과대평가",
      "횟단면 국가별 T 데이터는 이질적 (다른 분석법, 나이, 연도)",
      "1.2%/년 감소율은 주로 하나의 미국 코호트 연구에서 유래",
      "다른 원인 (비만 유행, 대사증후군, 수면 장애)은 배제되지 않음",
      "종간 그래디언트는 대략적인 EMF 부하 추정 사용",
    ],

    predictionText: "예측 T-1: 전기화가 더 이른/급격한 국가는 T 감소 시작이 더 빠르고 T→TFR 시차가 일관될 것입니다.",
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

      <SteroidogenesisIntegrationPanel locale={locale} focus="hormones" />

      <div className="mt-8">
        <CautionBox locale={locale}><p>{d.cautionText}</p></CautionBox>
      </div>
      <div className="mt-6 rounded-lg border border-border/50 p-4 text-sm">
        <p className="text-foreground-muted leading-relaxed">{atlas.intro}</p>
        <Link href={`${prefix}/explore?tab=atlas&question=health&country=USA`} className="mt-3 inline-block text-accent hover:underline">{atlas.link} →</Link>
      </div>

      {/* Section 1: Secular Decline */}
      <section className="mt-10">
        <h2 className="text-2xl font-semibold mb-4">{d.s1Title}</h2>
        <p className="text-foreground-muted mb-6">{d.s1Lead}</p>
        <div className="space-y-4">
          {d.s1Points.map((p) => (
            <div key={p.label} className="rounded-lg border border-border/50 p-4">
              <h3 className="font-medium mb-1">{p.label}</h3>
              <p className="text-sm text-foreground-muted">{p.detail}</p>
            </div>
          ))}
        </div>
        <div className="mt-6 rounded-lg bg-accent/5 border border-accent/20 p-4 text-center">
          <p className="text-lg font-mono font-semibold">{d.s1Stat}</p>
        </div>
      </section>

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

      {/* Section 2: T → TFR Temporal Lag */}
      <section className="mt-14 border-t editorial-rule pt-6">
        <h2 className="text-2xl font-semibold mb-4">{d.s2Title}</h2>
        <p className="text-foreground-muted mb-4">{d.s2Lead}</p>
        <div className="rounded-lg bg-accent/5 border border-accent/20 p-4 text-center mb-6">
          <p className="text-2xl font-mono font-bold">{d.s2Stat}</p>
        </div>
        <TemporalTtoTFR locale={locale} />
        <p className="mt-6 text-sm text-foreground-muted">{d.s2Detail}</p>
        <div className="mt-4 rounded-lg border border-amber-500/30 bg-amber-500/5 p-3">
          <p className="text-sm text-foreground-muted">{d.s2Caveat}</p>
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
