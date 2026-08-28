import type { Metadata } from "next";
import Link from "next/link";
import { Users } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { CautionBox } from "@/components/CautionBox";
import { DerivedPrediction } from "@/components/DerivedPrediction";
import { InlineReferenceText } from "@/components/InlineReferenceText";
import { StudyCitation } from "@/components/StudyCitation";
import { pickCopy } from "@/lib/i18n";

const COPY = {
  en: {
    title: "Amish: The Missing Control Group",
    subtitle: "Old Order Amish have minimal electricity, no personal electronics, and dramatically lower rates of every BERM-predicted condition: obesity -89%, T2D -75%, hypertension -66%, cancer -40%. However, massive lifestyle confounders (diet, exercise, smoking, community) make direct attribution impossible. The critical test is the Amish-Mennonite EMF gradient.",
    backLink: "← Back to Evidence",
    cautionText: "This page presents Amish health data as a natural experiment. The health differences are real and well-documented, but lifestyle confounders are massive. This analysis explicitly acknowledges that Amish data alone CANNOT prove EMF causation. The gradient test is needed.",

    dataTitle: "The data",
    dataCards: [
      { stat: "Obesity: -89%", detail: "Compared to US average ([[ref:amish_health_stat|STAT 2025]]). Old Order Amish obesity prevalence is dramatically lower than the general US population despite similar genetic background." },
      { stat: "Type 2 Diabetes: -75%", detail: "[[ref:amish_review|Anderson & Potts 2022]] review of 126 studies. Amish T2D rates are approximately one-quarter of the US average." },
      { stat: "Hypertension: -66%", detail: "Amish hypertension rates are roughly one-third of the general US population, consistent across multiple community studies." },
      { stat: "Cancer: -40%", detail: "Overall cancer incidence is approximately 40% lower in Amish populations. Some cancers (lung, cervical) are even more dramatically reduced." },
    ],

    confounderTitle: "The confounders",
    confounderLead: "These differences are real — but honest analysis demands acknowledging the massive lifestyle confounders.",
    confounderCards: [
      { factor: "Physical activity", detail: "Amish are far more physically active: 10,000–18,000 steps/day vs ~4,000 for average Americans. Farming, walking, manual labor are daily norms. This alone could explain substantial metabolic differences." },
      { factor: "Diet", detail: "Less processed food, more home-grown produce, less refined sugar. Amish diets are closer to pre-industrial patterns. Dietary differences are a well-established driver of metabolic health." },
      { factor: "Smoking", detail: "Very low smoking rates in Amish communities. This directly reduces cancer, cardiovascular disease, and respiratory conditions. A major confounder for cancer and hypertension data." },
      { factor: "Community", detail: "Strong social bonds, low social isolation, multigenerational households, shared purpose. Social connectedness is independently associated with lower mortality, better mental health, and reduced chronic disease." },
    ],

    crossTitle: "Cross-validation: Why lifestyle alone may be insufficient",
    crossLead: "Independent lines of evidence reduce — but do not eliminate — the lifestyle-only explanation.",
    crossCards: [
      { source: "Klimentidis et al.", referenceId: "klimentidis2010", detail: "8 species gaining weight in controlled environments (p=10⁻⁷). Lab animals with fixed diets and exercise are also gaining weight. Diet and exercise alone cannot explain this cross-species trend." },
      { source: "Mazur et al.", referenceId: "mazur2013", detail: "Weight-stable men still show testosterone decline. If obesity were the sole driver of T decline, weight-stable men should have stable T. They do not." },
      { source: "Santi et al.", referenceId: "santi2025", detail: "LH + T declining after controlling for BMI. The decline persists even when body mass is statistically removed. Something beyond weight is driving hormonal changes." },
    ],
    crossConclusion: "These independent lines REDUCE the lifestyle-only explanation. They do not prove EMF causation, but they establish that lifestyle factors alone are insufficient to explain all observed trends.",

    gradientTitle: "The critical test: Amish-Mennonite EMF gradient",
    gradientSteps: [
      "Old Order Amish (no electricity) → lowest EMF exposure",
      "Conservative Amish (some electricity, limited electronics) → low EMF exposure",
      "Mennonite (modern technology, full electricity) → moderate EMF exposure",
      "General US population → highest EMF exposure",
    ],
    gradientBody: "SAME religion, similar genetics, graduated EMF exposure. These four groups share cultural roots, religious values, and substantial genetic overlap — but differ systematically in electromagnetic field exposure. If disease rates follow the EMF gradient even within this cultural continuum, EMF becomes an independent factor that cannot be explained by diet, exercise, or community alone.",
    gradientConclusion: "This is BERM's most important proposed population test. It is the single study design most likely to separate EMF effects from lifestyle confounders. It has not been conducted.",

    predictionText: "Prediction E-NEW-37: Disease rates across the Amish–Mennonite gradient correlate with EMF exposure levels after controlling for diet, exercise, and other lifestyle factors.",
    predictionLink: "See predictions →",
    predictionHref: "/predictions",
  },
  fi: {
    title: "Amish: Puuttuva kontrolliryhmä",
    subtitle: "Vanhan järjestyksen amishilla on minimaalinen sähkönkäyttö, ei henkilökohtaista elektroniikkaa, ja dramaattisesti alhaisemmat esiintyvyydet jokaisessa BERM:n ennustamassa tilassa: lihavuus -89 %, T2D -75 %, verenpainetauti -66 %, syöpä -40 %. Massiiviset elämäntapamuuttujat (ruokavalio, liikunta, tupakointi, yhteisö) tekevät suoran attribuution mahdottomaksi. Kriittinen testi on amish–mennoniittigradientti.",
    backLink: "← Takaisin Evidenssiin",
    cautionText: "Tämä sivu esittää amish-terveysdata luonnollisena kokeena. Terveyserot ovat todellisia ja hyvin dokumentoituja, mutta elämäntapamuuttujat ovat massiivisia. Tämä analyysi tunnustaa nimenomaisesti, että amish-data yksinään EI VOI todistaa EMF-kausaatiota. Gradienttitesti tarvitaan.",

    dataTitle: "Data",
    dataCards: [
      { stat: "Lihavuus: -89 %", detail: "Verrattuna Yhdysvaltain keskiarvoon ([[ref:amish_health_stat|STAT 2025]]). Vanhan järjestyksen amishien lihavuuden esiintyvyys on dramaattisesti alhaisempi kuin yleisväestöllä vastaavasta geneettisestä taustasta huolimatta." },
      { stat: "Tyypin 2 diabetes: -75 %", detail: "[[ref:amish_review|Anderson & Potts 2022]], 126 tutkimuksen katsaus. Amishien T2D-esiintyvyys on noin neljäsosa Yhdysvaltain keskiarvosta." },
      { stat: "Verenpainetauti: -66 %", detail: "Amishien verenpainetaudin esiintyvyys on noin kolmasosa yleisväestöstä, johdonmukainen useissa yhteisötutkimuksissa." },
      { stat: "Syöpä: -40 %", detail: "Kokonaissyöpäilmaantuvuus on noin 40 % alhaisempi amish-väestössä. Jotkut syövät (keuhko, kohdunkaula) ovat vielä dramaattisemmin vähentyneet." },
    ],

    confounderTitle: "Sekoittavat tekijät",
    confounderLead: "Nämä erot ovat todellisia — mutta rehellinen analyysi vaatii massiivisten elämäntapamuuttujien tunnustamista.",
    confounderCards: [
      { factor: "Fyysinen aktiivisuus", detail: "Amishit ovat huomattavasti fyysisesti aktiivisempia: 10 000–18 000 askelta/päivä vs. ~4 000 keskivertoamerikkalaisella. Maanviljely, kävely ja ruumiillinen työ ovat päivittäisiä normeja. Tämä yksinään voisi selittää merkittävät metaboliset erot." },
      { factor: "Ruokavalio", detail: "Vähemmän prosessoitua ruokaa, enemmän kotikasvatettuja tuotteita, vähemmän puhdistettua sokeria. Amishien ruokavalio on lähempänä esiteollisia malleja. Ruokavalion erot ovat vakiintunut metabolisen terveyden ajuri." },
      { factor: "Tupakointi", detail: "Erittäin alhaiset tupakointiprosentit amish-yhteisöissä. Tämä vähentää suoraan syöpää, syddn- ja verisuonitauteja sekä hengitystieoireita. Merkittävä sekoittava tekijä syöpä- ja verenpainedatalle." },
      { factor: "Yhteisö", detail: "Vahvat sosiaaliset siteet, vähäinen sosiaalinen eristäytyminen, monisukupolviset kotitaloudet, jaettu tarkoitus. Sosiaalinen yhteys on itsenäisesti yhdistetty alhaisempaan kuolleisuuteen, parempaan mielenterveyteen ja vähentyneisiin kroonisiin sairauksiin." },
    ],

    crossTitle: "Ristiinvalidointi: Miksi elämäntapa yksin ei ehkä riitä",
    crossLead: "Riippumattomat todistuslinjat vähentävät — mutta eivät poista — pelkän elämäntavan selitystä.",
    crossCards: [
      { source: "Klimentidis ym.", referenceId: "klimentidis2010", detail: "8 lajia lihoo kontrolloiduissa ympäristöissä (p=10⁻⁷). Laboratorioeläimet kiinteällä ruokavaliolla ja liikunnalla lihovat myös. Ruokavalio ja liikunta yksin eivät voi selittää tätä lajienvälistä trendiä." },
      { source: "Mazur ym.", referenceId: "mazur2013", detail: "Painoltaan vakaiden miesten testosteroni laskee silti. Jos lihavuus olisi ainoa T-laskun ajuri, painoltaan vakailla miehillä pitäisi olla vakaa T. Näin ei ole." },
      { source: "Santi ym.", referenceId: "santi2025", detail: "LH + T laskevat BMI:n kontrolloinnin jälkeen. Lasku jatkuu, vaikka kehon massa poistetaan tilastollisesti. Jokin painon ulkopuolinen tekijä ajaa hormonaalisia muutoksia." },
    ],
    crossConclusion: "Nämä riippumattomat todistuslinjat VÄHENTÄVÄT pelkän elämäntavan selitystä. Ne eivät todista EMF-kausaatiota, mutta ne osoittavat, että elämäntapatekijät yksinään eivät riitä selittämään kaikkia havaittuja trendejä.",

    gradientTitle: "Kriittinen testi: Amish–mennoniittigradientti",
    gradientSteps: [
      "Vanhan järjestyksen amish (ei sähköä) → alhaisin EMF-altistus",
      "Konservatiivinen amish (jonkin verran sähköä, rajattu elektroniikka) → matala EMF-altistus",
      "Mennoniitti (moderni teknologia, täysi sähkö) → kohtalainen EMF-altistus",
      "Yhdysvaltain yleisväestö → korkein EMF-altistus",
    ],
    gradientBody: "SAMA uskonto, samanlainen genetiikka, portaittainen EMF-altistus. Nämä neljä ryhmää jakavat kulttuuriset juuret, uskonnolliset arvot ja merkittävän geneettisen päällekkäisyyden — mutta eroavat systemaattisesti sähkömagneettisen kentän altistuksessa. Jos sairausasteet seuraavat EMF-gradienttia tämän kulttuurisen jatkumon sisällä, EMF:stä tulee itsenäinen tekijä, jota ei voida selittää ruokavaliolla, liikunnalla tai yhteisöllä yksinään.",
    gradientConclusion: "Tämä on BERM:n tärkein ehdotettu väestötutkimus. Se on yksittäinen tutkimusasetelma, joka todennäköisimmin erottaa EMF-vaikutukset elämäntapamuuttujista. Sitä ei ole toteutettu.",

    predictionText: "Ennuste E-NEW-37: Sairausasteet amish–mennoniittigradientin yli korreloivat EMF-altistustasojen kanssa ruokavalion, liikunnan ja muiden elämäntapatekijöiden kontrolloinnin jälkeen.",
    predictionLink: "Ks. ennusteet →",
    predictionHref: "/predictions",
  },
  ja: {
    title: "Amish：欠落した対照群",
    subtitle: "Old Order Amishは電気使用が最小限で、個人用電子機器を持たず、BERMが予測するすべての疾患で劇的に低い罹患率を示す：肥満-89%、T2D-75%、高血圧-66%、癌-40%。しかし、大規模な生活様式交絡因子（食事、運動、喫煙、コミュニティ）が直接的帰属を不可能にする。決定的テストはAmish-Mennonite EMF勾配である。",
    backLink: "← エビデンスに戻る",
    cautionText: "このページはAmishの健康データを自然実験として提示する。健康差は実在し十分に文書化されているが、生活様式交絡因子は大規模である。この分析はAmishデータだけではEMF因果関係を証明できないことを明示的に認める。勾配テストが必要である。",

    dataTitle: "データ",
    dataCards: [
      { stat: "肥満：-89%", detail: "米国平均との比較（[[ref:amish_health_stat|STAT 2025]]）。Old Order Amishの肥満有病率は、類似の遺伝的背景にもかかわらず、一般米国人口より劇的に低い。" },
      { stat: "2型糖尿病：-75%", detail: "[[ref:amish_review|Anderson & Potts 2022]]、126件の研究レビュー。AmishのT2D率は米国平均の約4分の1である。" },
      { stat: "高血圧：-66%", detail: "Amishの高血圧率は一般米国人口の約3分の1であり、複数のコミュニティ研究で一貫している。" },
      { stat: "癌：-40%", detail: "全体の癌発生率はAmish集団で約40%低い。一部の癌（肺、子宮頸部）はさらに劇的に減少している。" },
    ],

    confounderTitle: "交絡因子",
    confounderLead: "これらの差は実在する――しかし誠実な分析は大規模な生活様式交絡因子の認識を要求する。",
    confounderCards: [
      { factor: "身体活動", detail: "Amishは遥かに身体的に活動的である：1日10,000〜18,000歩 vs 平均的アメリカ人の約4,000歩。農業、徒歩、肉体労働が日常的規範である。これだけで相当な代謝差を説明できる可能性がある。" },
      { factor: "食事", detail: "加工食品が少なく、自家栽培の農産物が多く、精製糖が少ない。Amishの食事は産業革命以前のパターンに近い。食事の違いは代謝的健康の確立された要因である。" },
      { factor: "喫煙", detail: "Amishコミュニティでは非常に低い喫煙率。これは癌、心血管疾患、呼吸器疾患を直接的に減少させる。癌と高血圧データの主要な交絡因子。" },
      { factor: "コミュニティ", detail: "強い社会的絆、低い社会的孤立、多世代世帯、共有された目的。社会的つながりは低い死亡率、より良い精神的健康、慢性疾患の減少と独立して関連している。" },
    ],

    crossTitle: "交差検証：なぜ生活様式だけでは不十分かもしれないか",
    crossLead: "独立したエビデンスラインが、生活様式のみの説明を減少させる――ただし排除はしない。",
    crossCards: [
      { source: "Klimentidis et al.", referenceId: "klimentidis2010", detail: "管理された環境で8種が体重増加（p=10⁻⁷）。固定された食事と運動の実験動物も体重が増加している。食事と運動だけではこの種間トレンドを説明できない。" },
      { source: "Mazur et al.", referenceId: "mazur2013", detail: "体重安定の男性でもテストステロン低下を示す。肥満がT低下の唯一の原因なら、体重安定の男性はTが安定しているはずである。そうではない。" },
      { source: "Santi et al.", referenceId: "santi2025", detail: "BMI制御後もLH + Tが低下。体重を統計的に除外しても低下は持続する。体重以外の何かがホルモン変化を駆動している。" },
    ],
    crossConclusion: "これらの独立したエビデンスラインは生活様式のみの説明を減少させる。EMF因果関係を証明はしないが、生活様式要因だけでは観察されたすべてのトレンドを説明するのに不十分であることを確立する。",

    gradientTitle: "決定的テスト：Amish-Mennonite EMF勾配",
    gradientSteps: [
      "Old Order Amish（電気なし）→ 最低EMF曝露",
      "保守的Amish（若干の電気、限定的電子機器）→ 低EMF曝露",
      "Mennonite（現代技術、完全な電気）→ 中程度のEMF曝露",
      "米国一般人口 → 最高EMF曝露",
    ],
    gradientBody: "同一の宗教、類似の遺伝学、段階的EMF曝露。これら4つのグループは文化的ルーツ、宗教的価値観、および相当な遺伝的重複を共有する――しかし電磁場曝露において体系的に異なる。この文化的連続体の中で疾患率がEMF勾配に従うなら、EMFは食事、運動、またはコミュニティだけでは説明できない独立した要因となる。",
    gradientConclusion: "これはBERMの最も重要な提案された集団テストである。EMF効果を生活様式交絡因子から分離する可能性が最も高い単一の研究デザインである。まだ実施されていない。",

    predictionText: "予測 E-NEW-37：Amish-Mennonite勾配全体の疾患率は、食事、運動、その他の生活様式要因を制御した後、EMF曝露レベルと相関する。",
    predictionLink: "予測を見る →",
    predictionHref: "/predictions",
  },
  fr: {
    title: "Amish : le groupe témoin manquant",
    subtitle: "Les Amish Old Order ont une utilisation minimale de l'électricité, aucun appareil électronique personnel et des taux considérablement plus bas pour chaque condition prédite par BERM : obésité -89 %, DT2 -75 %, hypertension -66 %, cancer -40 %. Cependant, d'importants facteurs de confusion liés au mode de vie (alimentation, exercice, tabagisme, communauté) rendent l'attribution directe impossible. Le test critique est le gradient EMF Amish-Mennonite.",
    backLink: "← Retour aux preuves",
    cautionText: "Cette page présente les données sanitaires Amish comme une expérience naturelle. Les différences de santé sont réelles et bien documentées, mais les facteurs de confusion liés au mode de vie sont considérables. Cette analyse reconnaît explicitement que les données Amish seules NE PEUVENT PAS prouver la causalité EMF. Le test de gradient est nécessaire.",

    dataTitle: "Les données",
    dataCards: [
      { stat: "Obésité : -89 %", detail: "Par rapport à la moyenne américaine ([[ref:amish_health_stat|STAT 2025]]). La prévalence de l'obésité chez les Amish Old Order est considérablement plus basse que dans la population générale malgré un bagage génétique similaire." },
      { stat: "Diabète de type 2 : -75 %", detail: "[[ref:amish_review|Anderson & Potts 2022]], revue de 126 études. Les taux de DT2 chez les Amish sont environ un quart de la moyenne américaine." },
      { stat: "Hypertension : -66 %", detail: "Les taux d'hypertension chez les Amish sont environ un tiers de la population générale, cohérent à travers plusieurs études communautaires." },
      { stat: "Cancer : -40 %", detail: "L'incidence globale du cancer est environ 40 % plus basse dans les populations Amish. Certains cancers (poumon, col utérin) sont encore plus réduits." },
    ],

    confounderTitle: "Les facteurs de confusion",
    confounderLead: "Ces différences sont réelles — mais une analyse honnête exige de reconnaître les facteurs de confusion massifs liés au mode de vie.",
    confounderCards: [
      { factor: "Activité physique", detail: "Les Amish sont bien plus actifs physiquement : 10 000–18 000 pas/jour vs environ 4 000 pour l'Américain moyen. L'agriculture, la marche et le travail manuel sont des normes quotidiennes. Cela seul pourrait expliquer des différences métaboliques substantielles." },
      { factor: "Alimentation", detail: "Moins d'aliments transformés, plus de produits du jardin, moins de sucre raffiné. L'alimentation Amish est plus proche des schémas pré-industriels. Les différences alimentaires sont un facteur établi de santé métabolique." },
      { factor: "Tabagisme", detail: "Taux de tabagisme très bas dans les communautés Amish. Cela réduit directement le cancer, les maladies cardiovasculaires et les affections respiratoires. Facteur de confusion majeur pour les données sur le cancer et l'hypertension." },
      { factor: "Communauté", detail: "Liens sociaux forts, faible isolement social, ménages multigénérationnels, but partagé. La connectivité sociale est indépendamment associée à une mortalité plus basse, une meilleure santé mentale et une réduction des maladies chroniques." },
    ],

    crossTitle: "Validation croisée : pourquoi le mode de vie seul pourrait être insuffisant",
    crossLead: "Des lignes de preuve indépendantes réduisent — mais n'éliminent pas — l'explication par le mode de vie seul.",
    crossCards: [
      { source: "Klimentidis et al.", referenceId: "klimentidis2010", detail: "8 espèces prenant du poids dans des environnements contrôlés (p=10⁻⁷). Les animaux de laboratoire avec des régimes et exercices fixes grossissent aussi. L'alimentation et l'exercice seuls ne peuvent expliquer cette tendance inter-espèces." },
      { source: "Mazur et al.", referenceId: "mazur2013", detail: "Les hommes à poids stable montrent encore un déclin de la testostérone. Si l'obésité était le seul facteur du déclin de T, les hommes à poids stable devraient avoir un T stable. Ce n'est pas le cas." },
      { source: "Santi et al.", referenceId: "santi2025", detail: "LH + T déclinent après contrôle de l'IMC. Le déclin persiste même lorsque la masse corporelle est statistiquement retirée. Quelque chose au-delà du poids entraîne des changements hormonaux." },
    ],
    crossConclusion: "Ces lignes de preuve indépendantes RÉDUISENT l'explication par le mode de vie seul. Elles ne prouvent pas la causalité EMF, mais elles établissent que les facteurs de mode de vie seuls sont insuffisants pour expliquer toutes les tendances observées.",

    gradientTitle: "Le test critique : gradient EMF Amish–Mennonite",
    gradientSteps: [
      "Amish Old Order (pas d'électricité) → exposition EMF la plus faible",
      "Amish conservateurs (un peu d'électricité, électronique limitée) → exposition EMF faible",
      "Mennonite (technologie moderne, pleine électricité) → exposition EMF modérée",
      "Population générale américaine → exposition EMF la plus élevée",
    ],
    gradientBody: "MÊME religion, génétique similaire, exposition EMF graduée. Ces quatre groupes partagent des racines culturelles, des valeurs religieuses et un chevauchement génétique substantiel — mais diffèrent systématiquement dans l'exposition aux champs électromagnétiques. Si les taux de maladie suivent le gradient EMF même au sein de ce continuum culturel, l'EMF devient un facteur indépendant qui ne peut être expliqué par l'alimentation, l'exercice ou la communauté seuls.",
    gradientConclusion: "C'est le test de population le plus important proposé par BERM. C'est le design d'étude unique le plus susceptible de séparer les effets EMF des facteurs de confusion liés au mode de vie. Il n'a pas été mené.",

    predictionText: "Prédiction E-NEW-37 : les taux de maladie à travers le gradient Amish–Mennonite corrèlent avec les niveaux d'exposition EMF après contrôle de l'alimentation, de l'exercice et d'autres facteurs de mode de vie.",
    predictionLink: "Voir les prédictions →",
    predictionHref: "/predictions",
  },
  ko: {
    title: "Amish: 누락된 대조군",
    subtitle: "Old Order Amish는 전기 사용이 최소이고, 개인 전자기기가 없으며, BERM이 예측하는 모든 질환에서 극적으로 낮은 유병률을 보인다: 비만 -89%, T2D -75%, 고혈압 -66%, 암 -40%. 그러나 대규모 생활양식 교란변수(식이, 운동, 흡연, 공동체)가 직접적 귀속을 불가능하게 만든다. 결정적 시험은 Amish-Mennonite EMF 기울기이다.",
    backLink: "← 증거로 돌아가기",
    cautionText: "이 페이지는 Amish 건강 데이터를 자연 실험으로 제시한다. 건강 차이는 실재하며 잘 문서화되어 있지만, 생활양식 교란변수는 대규모이다. 이 분석은 Amish 데이터만으로는 EMF 인과관계를 증명할 수 없음을 명시적으로 인정한다. 기울기 시험이 필요하다.",

    dataTitle: "데이터",
    dataCards: [
      { stat: "비만: -89%", detail: "미국 평균과 비교([[ref:amish_health_stat|STAT 2025]]). Old Order Amish의 비만 유병률은 유사한 유전적 배경에도 불구하고 일반 미국 인구보다 극적으로 낮다." },
      { stat: "2형 당뇨병: -75%", detail: "[[ref:amish_review|Anderson & Potts 2022]], 126개 연구 리뷰. Amish의 T2D 비율은 미국 평균의 약 4분의 1이다." },
      { stat: "고혈압: -66%", detail: "Amish의 고혈압 비율은 일반 미국 인구의 약 3분의 1로, 여러 커뮤니티 연구에서 일관적이다." },
      { stat: "암: -40%", detail: "전체 암 발생률은 Amish 인구에서 약 40% 낮다. 일부 암(폐, 자궁경부)은 더욱 극적으로 감소했다." },
    ],

    confounderTitle: "교란변수",
    confounderLead: "이러한 차이는 실재한다 — 그러나 정직한 분석은 대규모 생활양식 교란변수를 인정할 것을 요구한다.",
    confounderCards: [
      { factor: "신체 활동", detail: "Amish는 훨씬 더 신체적으로 활동적이다: 하루 10,000~18,000보 vs 평균 미국인의 약 4,000보. 농업, 도보, 육체노동이 일상적 규범이다. 이것만으로도 상당한 대사 차이를 설명할 수 있다." },
      { factor: "식이", detail: "가공식품이 적고, 자가 재배 농산물이 많으며, 정제당이 적다. Amish의 식이는 산업화 이전 패턴에 더 가깝다. 식이 차이는 대사 건강의 확립된 요인이다." },
      { factor: "흡연", detail: "Amish 공동체에서 매우 낮은 흡연률. 이것은 암, 심혈관 질환, 호흡기 질환을 직접적으로 감소시킨다. 암 및 고혈압 데이터의 주요 교란변수." },
      { factor: "공동체", detail: "강한 사회적 유대, 낮은 사회적 고립, 다세대 가구, 공유된 목적. 사회적 연결은 낮은 사망률, 더 나은 정신 건강, 만성 질환 감소와 독립적으로 관련된다." },
    ],

    crossTitle: "교차 검증: 왜 생활양식만으로는 불충분할 수 있는가",
    crossLead: "독립적 증거 라인이 생활양식만의 설명을 감소시킨다 — 그러나 제거하지는 않는다.",
    crossCards: [
      { source: "Klimentidis et al.", referenceId: "klimentidis2010", detail: "통제된 환경에서 8종이 체중 증가(p=10⁻⁷). 고정된 식이와 운동의 실험실 동물도 체중이 증가하고 있다. 식이와 운동만으로는 이 종간 추세를 설명할 수 없다." },
      { source: "Mazur et al.", referenceId: "mazur2013", detail: "체중이 안정적인 남성도 여전히 테스토스테론 감소를 보인다. 비만이 T 감소의 유일한 원인이라면, 체중 안정 남성은 T가 안정적이어야 한다. 그렇지 않다." },
      { source: "Santi et al.", referenceId: "santi2025", detail: "BMI 통제 후에도 LH + T가 감소. 체질량을 통계적으로 제거해도 감소가 지속된다. 체중 이외의 무언가가 호르몬 변화를 구동한다." },
    ],
    crossConclusion: "이러한 독립적 증거 라인은 생활양식만의 설명을 감소시킨다. EMF 인과관계를 증명하지는 않지만, 생활양식 요인만으로는 관찰된 모든 추세를 설명하기에 불충분함을 확립한다.",

    gradientTitle: "결정적 시험: Amish-Mennonite EMF 기울기",
    gradientSteps: [
      "Old Order Amish (전기 없음) → 최저 EMF 노출",
      "보수적 Amish (약간의 전기, 제한된 전자기기) → 낮은 EMF 노출",
      "Mennonite (현대 기술, 완전한 전기) → 중간 EMF 노출",
      "미국 일반 인구 → 최고 EMF 노출",
    ],
    gradientBody: "동일한 종교, 유사한 유전학, 단계적 EMF 노출. 이 네 그룹은 문화적 뿌리, 종교적 가치관, 상당한 유전적 중복을 공유하지만 — 전자기장 노출에서 체계적으로 다르다. 이 문화적 연속체 내에서 질병률이 EMF 기울기를 따른다면, EMF는 식이, 운동 또는 공동체만으로는 설명할 수 없는 독립적 요인이 된다.",
    gradientConclusion: "이것은 BERM이 제안한 가장 중요한 인구 시험이다. EMF 효과를 생활양식 교란변수로부터 분리할 가능성이 가장 높은 단일 연구 설계이다. 아직 수행되지 않았다.",

    predictionText: "예측 E-NEW-37: Amish-Mennonite 기울기 전체의 질병률은 식이, 운동 및 기타 생활양식 요인을 통제한 후 EMF 노출 수준과 상관관계를 보인다.",
    predictionLink: "예측 보기 →",
    predictionHref: "/predictions",
  },
} as const;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const d = pickCopy(COPY, locale);
  return { title: `${d.title} – Extinction Field`, description: d.subtitle };
}

export default async function AmishControlPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const d = pickCopy(COPY, locale);
  const prefix = `/${locale}`;

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 sm:py-20">
      <p className="mb-6">
        <Link href={`${prefix}/evidence`} className="text-sm text-accent hover:underline">{d.backLink}</Link>
      </p>
      <PageHeader icon={Users} title={d.title} subtitle={d.subtitle} />
      <div className="mt-8"><CautionBox locale={locale}><p>{d.cautionText}</p></CautionBox></div>

      {/* Section 1: The data — green cards */}
      <section className="mt-12">
        <h2 className="text-lg font-semibold mb-4">{d.dataTitle}</h2>
        <div className="space-y-3">
          {d.dataCards.map((c, i) => (
            <div key={i} className="rounded-lg border border-green-500/20 bg-green-500/5 p-4">
              <p className="text-sm font-semibold mb-1">{c.stat}</p>
              <p className="text-sm text-foreground-muted leading-relaxed"><InlineReferenceText text={c.detail} locale={locale} /></p>
            </div>
          ))}
        </div>
      </section>

      {/* Section 2: The confounders — amber cards */}
      <section className="mt-14 border-t editorial-rule pt-6">
        <h2 className="text-lg font-semibold mb-2">{d.confounderTitle}</h2>
        <p className="text-sm text-foreground-muted leading-relaxed mb-4 max-w-3xl">{d.confounderLead}</p>
        <div className="space-y-3">
          {d.confounderCards.map((c, i) => (
            <div key={i} className="rounded-lg border border-amber-500/20 bg-amber-500/5 p-4">
              <p className="text-sm font-semibold mb-1">{c.factor}</p>
              <p className="text-sm text-foreground-muted leading-relaxed">{c.detail}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Section 3: Cross-validation */}
      <section className="mt-14 border-t editorial-rule pt-6">
        <h2 className="text-lg font-semibold mb-2">{d.crossTitle}</h2>
        <p className="text-sm text-foreground-muted leading-relaxed mb-4 max-w-3xl">{d.crossLead}</p>
        <div className="space-y-3">
          {d.crossCards.map((c, i) => (
            <div key={i} className="rounded-lg border border-card-border bg-card-bg p-4">
              <p className="text-sm font-semibold mb-1">
                <StudyCitation referenceId={c.referenceId} locale={locale} label={c.source} />
              </p>
              <p className="text-sm text-foreground-muted leading-relaxed">{c.detail}</p>
            </div>
          ))}
        </div>
        <div className="mt-4 rounded-lg border border-accent/20 bg-accent/5 p-4">
          <p className="text-sm leading-relaxed text-foreground-muted">{d.crossConclusion}</p>
        </div>
      </section>

      {/* Section 4: The critical test — red-bordered card */}
      <section className="mt-14 border-t editorial-rule pt-6">
        <h2 className="text-lg font-semibold mb-4">{d.gradientTitle}</h2>
        <div className="rounded-lg border-2 border-red-500/30 bg-red-500/5 p-5">
          <div className="space-y-1.5 mb-4">
            {d.gradientSteps.map((s, i) => (
              <div key={i} className="flex gap-2 text-sm text-foreground-muted leading-relaxed">
                <span className="text-red-400 shrink-0">{i + 1}.</span><p>{s}</p>
              </div>
            ))}
          </div>
          <p className="text-sm text-foreground-muted leading-relaxed mb-3">{d.gradientBody}</p>
          <p className="text-sm font-semibold leading-relaxed">{d.gradientConclusion}</p>
        </div>
      </section>

      {/* DerivedPrediction */}
      <section className="mt-14 border-t editorial-rule pt-6">
        <DerivedPrediction>
          <p className="text-sm leading-relaxed mb-3">{d.predictionText}</p>
          <Link href={`${prefix}${d.predictionHref}`} className="text-sm text-accent hover:underline">{d.predictionLink}</Link>
        </DerivedPrediction>
      </section>
    </div>
  );
}
