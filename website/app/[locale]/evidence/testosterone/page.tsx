import type { Metadata } from "next";
import Link from "next/link";
import { TrendingDown } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { CautionBox } from "@/components/CautionBox";
import { DerivedPrediction } from "@/components/DerivedPrediction";
import { CrossSpeciesGradient } from "@/components/CrossSpeciesGradient";
import { TemporalTtoTFR } from "@/components/TemporalTtoTFR";
import { pickCopy } from "@/lib/i18n";

const COPY = {
  en: {
    title: "Testosterone: The Biological Clock",
    subtitle: "Population testosterone has declined ~1.2%/year since the 1980s. This secular trend is age-independent, geographically widespread, and temporally correlated with TFR decline at an 8-year lag. The LH+T pattern points to hypothalamic suppression, not testicular damage.",
    backLink: "← Back to Evidence",
    cautionText: "Testosterone secular decline is established, but its cause is debated (obesity, EDCs, lifestyle, EMF, or a combination). This page presents the T→TFR temporal correlation and the LH diagnostic as evidence lines consistent with BERM. Neither proves EMF causation.",

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
      { pattern: "T↓ + LH↓ = Hypothalamic", detail: "Both hormones declining simultaneously means the pituitary is NOT compensating. The suppression originates above the testis — at the hypothalamus or higher. Consistent with EMF→melatonin→GnRH pathway.", color: "blue" },
      { pattern: "T↓ + LH↑ = Testicular", detail: "T declining while LH rises means the pituitary IS compensating for testicular damage. Consistent with direct gonadal toxicity from EDCs (phthalates, BPA).", color: "amber" },
    ],
    s3Observed: "Observed population pattern: T↓ + LH↓ (hypothalamic)",
    s3Implication: "The observed pattern is inconsistent with EDC-mediated testicular damage as the primary mechanism and instead points to hypothalamic-level suppression — the level where EMF acts via melatonin and cryptochrome.",

    s3bTitle: "Chemical vs EMF: the differential",
    s3bLead: "EDCs and EMF both lower testosterone, but they leave different hormonal fingerprints:",
    s3bRows: [
      { axis: "LH response", edc: "LH rises (compensatory)", emf: "LH falls (central suppression)" },
      { axis: "Dose geography", edc: "Tracks chemical industry and agriculture", emf: "Tracks electrification and wireless density" },
      { axis: "Cross-species pattern", edc: "Aquatic species near discharge sites", emf: "Gradient across all domestication levels" },
      { axis: "Temporal onset", edc: "Post-1960 (mass plastics)", emf: "Post-1920 (electrification); accelerating post-1990 (wireless)" },
    ],
    s3bConclusion: "Both mechanisms likely contribute. The LH-T differential diagnostic is the cleanest discriminator: the observed population pattern (T↓ + LH↓) is hypothalamic, pointing to EMF as the dominant driver, not EDCs.",

    s4Title: "Cross-species gradient",
    s4Lead: "Seven species/population groups arranged by estimated cumulative EMF exposure show a dose-response relationship with reproductive decline:",
    s4Stat: "r = 0.84, p = 0.017, n = 7 species groups",
    s4Caveat: "Ecological correlation across species with heterogeneous decline measurements and EMF burden estimates. The species differ in body size, lifespan, generation time, and confounders. Consistent with but not proof of dose-response.",

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
    subtitle: "Väestön testosteronitaso on laskenut ~1,2 %/vuosi 1980-luvulta lähtien. Tämä sekulaaritrendi on iästä riippumaton, maantieteellisesti laaja-alainen ja ajallisesti korreloitu TFR:n laskun kanssa 8 vuoden viiveellä. LH+T-kaava osoittaa hypotalamuksen suppressioon, ei kivesten vaurioon.",
    backLink: "← Takaisin Evidenssiin",
    cautionText: "Testosteronin sekulaarilasku on vakiintunut, mutta sen syystä käydään keskustelua (lihavuus, EDC:t, elämäntavat, EMF tai yhdistelmä). Tämä sivu esittää T→TFR-ajallisen korrelaation ja LH-diagnostiikan BERM:n kanssa yhteensopivina todistelinjoina. Kumpikaan ei todista EMF-kausaalisuutta.",

    s1Title: "Sekulaarilasku",
    s1Lead: "Kolme riippumatonta aineistoa dokumentoivat saman kaavan yhdysvaltalaismiehillä:",
    s1Points: [
      { label: "AFHS-kohortti (Travison 2007)", detail: "638 ng/dL lähtötaso vuonna 1982. Iästä riippumaton lasku ~1,2 %/vuosi kolmessa tutkimusaallossa. Ei selity BMI:n, tupakoinnin tai oheissairauksien muutoksilla." },
      { label: "NHANES-poikkileikkaukset (Lokeshwar 2021)", detail: "Jatkunut lasku vuoteen 2016 kaikissa ikäryhmissä 15–39. Nuorilla miehillä (15–19) jyrkin suhteellinen pudotus." },
      { label: "Eurooppalainen vahvistus", detail: "Suomalaiset, tanskalaiset ja ranskalaiset varusmiestutkmukset osoittavat rinnakkaisia laskuja 1990-luvulta eteenpäin." },
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
      { pattern: "T↓ + LH↓ = Hypotalaaminen", detail: "Molempien hormonien samanaikainen lasku tarkoittaa, että aivolisake EI kompensoi. Suppressio syntyy kivesten yläpuolella — hypotalamuksessa tai ylempänä. Yhdenmukainen EMF→melatoniini→GnRH-polun kanssa.", color: "blue" },
      { pattern: "T↓ + LH↑ = Testikulaarinen", detail: "T laskee mutta LH nousee, mikä tarkoittaa aivolisakkeen kompensoivan kivevauriota. Yhdenmukainen suoran gonadaalisen toksisuuden kanssa EDC:istä (ftalaatit, BPA).", color: "amber" },
    ],
    s3Observed: "Havaittu väestökaava: T↓ + LH↓ (hypotalaaminen)",
    s3Implication: "Havaittu kaava on epäyhdenmukainen EDC-välitteisen kivevaurion kanssa ensisijaisena mekanismina ja osoittaa sen sijaan hypotalamustason suppressioon — tasolle, jossa EMF vaikuttaa melatoniinin ja kryptokromin kautta.",

    s3bTitle: "Kemikaali vs EMF: erotusdiagnostiikka",
    s3bLead: "EDC:t ja EMF molemmat laskevat testosteronia, mutta ne jättävät erilaiset hormonaaliset sormenjäljet:",
    s3bRows: [
      { axis: "LH-vaste", edc: "LH nousee (kompensatorinen)", emf: "LH laskee (sentraalinen suppressio)" },
      { axis: "Annosmaantiede", edc: "Seuraa kemianteollisuutta ja maataloutta", emf: "Seuraa sähköistystä ja langattoman verkon tiheyttä" },
      { axis: "Lajien välinen kaava", edc: "Vesilajit päästölähteiden lähellä", emf: "Gradientti kaikilla domestikaatiotasoilla" },
      { axis: "Ajallinen alku", edc: "1960-luvun jälkeen (massamuovit)", emf: "1920-luvun jälkeen (sähköistys); kiihtyen 1990 jälkeen (langaton)" },
    ],
    s3bConclusion: "Molemmat mekanismit todennäköisesti vaikuttavat. LH-T-erotusdiagnostiikka on puhtain erottelija: havaittu väestökaava (T↓ + LH↓) on hypotalaaminen, mikä osoittaa EMF:iin hallitsevana tekijänä, ei EDC:ihin.",

    s4Title: "Lajien välinen gradientti",
    s4Lead: "Seitsemän lajia/populaatioryhmaa arvioidun kumulatiivisen EMF-altistuksen mukaan järjestettyinä osoittaa annosvastesuhdetta lisääntymisen laskuun:",
    s4Stat: "r = 0,84, p = 0,017, n = 7 lajiryhmaa",
    s4Caveat: "Ekologinen korrelaatio lajien välillä heterogeenisilla laskumittauksilla ja EMF-kuorma-arvioilla. Lajit eroavat ruumiinkoon, eliniän, sukupolven ajan ja sekoittavien tekijöiden suhteen. Yhdenmukainen mutta ei todiste annosvasteesta.",

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
    subtitle: "人口テストステロンは1980年代以降年約−1.2%で低下しています。この長期トレンドは年齢に依存せず、地理的に広範囲で、TFR低下と8年のラグで時間的に相関しています。LH+Tパターンは視床下部抑制を示し、精巣損傷ではありません。",
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
      { pattern: "T↓ + LH↓ = 視床下部性", detail: "両ホルモンの同時低下は下垂体が代償していないことを意味します。抑制は精巣の上位—視床下部以上—で発生。EMF→メラトニン→GnRH経路と整合。", color: "blue" },
      { pattern: "T↓ + LH↑ = 精巣性", detail: "Tが低下しLHが上昇するのは、下垂体が精巣損傷を代償していることを意味します。EDC（フタル酸エステル、BPA）による直接的生殖腸毒性と整合。", color: "amber" },
    ],
    s3Observed: "観察された人口パターン: T↓ + LH↓ (視床下部性)",
    s3Implication: "観察されたパターンはEDC介在の精巣損傷が主要メカニズムであることと不整合で、代わりに視床下部レベルの抑制を示しています—EMFがメラトニンとクリプトクロムを介して作用するレベルです。",

    s3bTitle: "化学物質 vs EMF：鑑別診断",
    s3bLead: "EDCとEMFはどちらもテストステロンを低下させますが、異なるホルモン的指紋を残します：",
    s3bRows: [
      { axis: "LH反応", edc: "LH上昇（代償性）", emf: "LH低下（中枢性抑制）" },
      { axis: "投与量地理学", edc: "化学工業と農業を追跡", emf: "電化と無線密度を追跡" },
      { axis: "種間パターン", edc: "排出地点近くの水生種", emf: "すべての家畜化レベルでグラディエント" },
      { axis: "時間的開始", edc: "1960年以降（大量プラスチック）", emf: "1920年以降（電化）；1990年以降加速（無線）" },
    ],
    s3bConclusion: "両メカニズムが寄与している可能性が高い。LH-T鑑別診断が最も明確な識別子：観察された集団パターン（T↓ + LH↓）は視床下部性であり、EDCではなくEMFが主要因であることを示しています。",

    s4Title: "種間グラディエント",
    s4Lead: "推定累積EMF暴露で配列された7種/集団が生殖低下との用量反応関係を示しています：",
    s4Stat: "r = 0.84, p = 0.017, n = 7種グループ",
    s4Caveat: "異質な低下測定とEMF負荷推定を持つ種間の生態学的相関。種は体サイズ、寿命、世代時間、交絡因子が異なります。用量反応と整合しますが証明ではありません。",

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
    subtitle: "La testostérone de la population a diminué d'environ −1,2 %/an depuis les années 1980. Cette tendance séculaire est indépendante de l'âge, géographiquement répandue et temporellement corrélée avec la baisse du TFR avec un décalage de 8 ans.",
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
      { pattern: "T↓ + LH↓ = Hypothalamique", detail: "Le déclin simultané des deux hormones signifie que l'hypophyse ne compense PAS. Cohérent avec la voie EMF→mélatonine→GnRH.", color: "blue" },
      { pattern: "T↓ + LH↑ = Testiculaire", detail: "Le déclin de T avec une augmentation de LH indique des dommages testiculaires. Cohérent avec la toxicité gonadique directe des EDC.", color: "amber" },
    ],
    s3Observed: "Schéma observé : T↓ + LH↓ (hypothalamique)",
    s3Implication: "Le schéma observé est incompatible avec les dommages testiculaires médiés par les EDC et pointe vers une suppression au niveau hypothalamique.",

    s3bTitle: "Chimique vs EMF : le diagnostic différentiel",
    s3bLead: "Les EDC et les EMF diminuent tous deux la testostérone, mais laissent des empreintes hormonales différentes :",
    s3bRows: [
      { axis: "Réponse LH", edc: "LH augmente (compensatoire)", emf: "LH diminue (suppression centrale)" },
      { axis: "Géographie de dose", edc: "Suit l'industrie chimique et l'agriculture", emf: "Suit l'électrification et la densité sans fil" },
      { axis: "Schéma inter-espèces", edc: "Espèces aquatiques près des sites de rejet", emf: "Gradient à tous les niveaux de domestication" },
      { axis: "Début temporel", edc: "Après 1960 (plastiques de masse)", emf: "Après 1920 (électrification) ; accélération après 1990 (sans fil)" },
    ],
    s3bConclusion: "Les deux mécanismes contribuent probablement. Le diagnostic différentiel LH-T est le discriminateur le plus net : le schéma observé (T↓ + LH↓) est hypothalamique, pointant vers les EMF comme facteur dominant.",

    s4Title: "Gradient inter-espèces",
    s4Lead: "Sept espèces/groupes de population classés par exposition EMF cumulée montrent une relation dose-réponse :",
    s4Stat: "r = 0,84, p = 0,017, n = 7 groupes d'espèces",
    s4Caveat: "Corrélation écologique inter-espèces avec des mesures hétérogènes. Cohérent mais non probant.",

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
    subtitle: "인구 테스토스테론은 1980년대 이후 연간 약 -1.2%로 감소했습니다. 이 장기 추세는 나이에 독립적이며 TFR 감소와 8년 시차로 시간적 상관관계를 보입니다.",
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
      { pattern: "T↓ + LH↓ = 시상하부성", detail: "두 호르몬의 동시 감소는 뇌하수체가 보상하지 않음을 의미합니다. EMF→멜라토닌→GnRH 경로와 일치.", color: "blue" },
      { pattern: "T↓ + LH↑ = 고환성", detail: "T 감소와 LH 증가는 고환 손상에 대한 보상을 의미합니다. EDC에 의한 직접적 생식선 독성과 일치.", color: "amber" },
    ],
    s3Observed: "관찰된 인구 패턴: T↓ + LH↓ (시상하부성)",
    s3Implication: "관찰된 패턴은 EDC 매개 고환 손상과 불일치하며 시상하부 수준의 억제를 가리킵니다.",

    s3bTitle: "화학물질 vs EMF: 감별 진단",
    s3bLead: "EDC와 EMF 모두 테스토스테론을 감소시키지만 다른 호르몬 지문을 남깁니다:",
    s3bRows: [
      { axis: "LH 반응", edc: "LH 상승 (보상적)", emf: "LH 하강 (중추성 억제)" },
      { axis: "용량 지리학", edc: "화학 산업과 농업 추적", emf: "전기화와 무선 밀도 추적" },
      { axis: "종간 패턴", edc: "배출 지점 근처 수생 종", emf: "모든 가축화 수준에서 그래디언트" },
      { axis: "시간적 시작", edc: "1960년 이후 (대량 플라스틱)", emf: "1920년 이후 (전기화); 1990년 이후 가속 (무선)" },
    ],
    s3bConclusion: "두 메커니즘 모두 기여할 가능성이 높습니다. LH-T 감별 진단이 가장 명확한 식별자: 관찰된 집단 패턴 (T↓ + LH↓)은 시상하부성으로, EDC가 아닌 EMF가 주요 요인임을 가리킵니다.",

    s4Title: "종간 그래디언트",
    s4Lead: "추정 누적 EMF 노출로 배열된 7개 종/집단이 생식 감소와의 용량-반응 관계를 보여줍니다:",
    s4Stat: "r = 0.84, p = 0.017, n = 7개 종 그룹",
    s4Caveat: "이질적인 감소 측정과 EMF 부하 추정을 가진 종간 생태학적 상관관계.",

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

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const d = pickCopy(COPY, locale);
  return { title: `${d.title} – Extinction Field`, description: d.subtitle };
}

export default async function TestosteronePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const d = pickCopy(COPY, locale);
  const prefix = `/${locale}`;

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 sm:py-20">
      <p className="mb-6">
        <a href={`${prefix}/evidence`} className="text-sm text-accent hover:underline">{d.backLink}</a>
      </p>

      <PageHeader icon={TrendingDown} title={d.title} subtitle={d.subtitle} />

      <div className="mt-8">
        <CautionBox locale={locale}><p>{d.cautionText}</p></CautionBox>
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
          <div className="overflow-x-auto mb-4">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-card-border">
                  <th className="text-left py-2 pr-4 font-semibold"></th>
                  <th className="text-left py-2 pr-4 font-semibold text-amber-600 dark:text-amber-400">EDC</th>
                  <th className="text-left py-2 font-semibold text-blue-600 dark:text-blue-400">EMF</th>
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
