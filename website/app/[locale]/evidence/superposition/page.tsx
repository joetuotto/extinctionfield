import type { Metadata } from "next";
import { Layers } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { CautionBox } from "@/components/CautionBox";
import { DerivedPrediction } from "@/components/DerivedPrediction";
import { InlineReferenceText } from "@/components/InlineReferenceText";
import { pickCopy } from "@/lib/i18n";

const COPY = {
  en: {
    title: "Superposition Violation",
    subtitle: "The catalogue records 172 combined-exposure studies. BERM tests whether non-additive findings follow a shared background-dependent closure; they do not by themselves demonstrate Lindgren geometry or a biological coupling operator.",
    backLink: "← Back to Evidence",
    cautionText: "The superposition violation evidence comes primarily from ELF combination studies. Extension to RF combinations and to the geometric interpretation is BERM's synthesis (M-level), not established consensus.",

    s1Title: "The principle",
    s1Lead: "In standard electromagnetism, fields obey superposition. Lindgren's ansatz changes the geometric description. Its quadratic term produces exact mixing terms, and a response-operator form follows conditionally under explicit matter–metric and linear-response assumptions. Biological detectability and non-additive endpoint response still depend on an uncalibrated tissue kernel:",
    s1Formula: "R(A₁ + A₂) ≠ R(A₁) + R(A₂)",
    s1Explain: "This means the biological effect of two simultaneous EMF sources cannot be predicted from their individual effects alone. The interaction term — the part that superposition misses — is often larger than either individual effect.",

    s2Title: "Evidence from combined exposures",
    s2Lead: "A systematic review of 172 studies examined biological effects of combined EMF and chemical/physical exposures ([[ref:juutilainen2006_superposition|Juutilainen et al. 2006]]):",
    s2Findings: [
      { label: "Co-carcinogenesis", detail: "ELF fields enhanced the effects of known carcinogens in 43 of 58 studies (74%). The enhancement was not predicted by either agent alone — it required co-exposure." },
      { label: "Genotoxicity amplification", detail: "Combined ELF + chemical exposure produced DNA damage exceeding the sum of individual effects in multiple cell lines and in vivo models." },
      { label: "Dose-response non-linearity", detail: "The combined effect was not simply additive — at some dose combinations the interaction was synergistic (greater than sum), at others antagonistic (less than sum)." },
      { label: "Window effects", detail: "The superposition violation was strongest at specific frequency/amplitude combinations ('biological windows'), consistent with the Adey-Blackman resonance windows documented elsewhere in BERM." },
    ],
    s2Stat: "74% of co-carcinogenesis studies show enhancement beyond individual effects",

    s3Title: "Why this matters for real-world exposure",
    s3Lead: "Laboratory EMF studies typically test single-frequency, single-source exposures. Real-world environments contain 5–12 simultaneous EMF sources spanning 10 orders of magnitude in frequency. The superposition violation explains a central puzzle in EMF research:",
    s3Points: [
      { q: "Why do single-frequency studies often fail to replicate?", a: "Because the effect depends on the background field configuration. A 50 Hz study in a lab with different ambient RF than another lab is not a replication — it is a different experiment." },
      { q: "Why are real-world health correlations stronger than lab predictions?", a: "Because multi-source environments produce interaction effects that single-source studies cannot capture." },
      { q: "Why does the Amish exception exist?", a: "The Amish have zero technology layers — no superposition interaction. Their biological response to the geomagnetic background alone is the 'R(A₁)' reference state." },
    ],

    s4Title: "Connection to χ(Ā)",
    s4Lead: "The superposition violation is mathematically related to the χ selection rule. When background field Ā is present, the perturbation δA acts on the existing geometry:",
    s4Formula: "R(Ā + δA) = R(Ā) + χ(Ā) · δA + O(δA²)",
    s4Explain: "In BERM's proposed closure, χ(Ā) makes response depend on background Ā. Non-additivity is therefore a discriminating pattern to test, not proof that the closure or Lindgren geometry generated an experimental result.",

    s5Title: "Epistemological honesty",
    s5Points: [
      "The 172-study review is primarily ELF + chemical combinations, not multi-frequency EMF",
      "The geometric interpretation (metric non-linearity) is BERM's framework, not the original authors'",
      "True multi-frequency EMF interaction studies are rare — most evidence is from co-exposure paradigms",
      "The connection between co-carcinogenesis and fertility effects is mechanistic inference, not direct evidence",
    ],

    predictionText: "Prediction SUPER-1: A controlled study comparing single-frequency vs. multi-frequency EMF exposure on sperm parameters will show that multi-frequency effects exceed the sum of single-frequency effects, with the interaction term scaling with total source count.",
    predictionLink: "See predictions →",
    predictionHref: "/predictions",
  },
  fi: {
    title: "Superpositiorikkomus",
    subtitle: "Luettelo sisältää 172 yhdistelmäaltistustutkimusta. BERM testaa, noudattavatko ei-additiiviset löydökset yhteistä taustariippuvaista sulkeumaa; ne eivät itsessään osoita Lindgrenin geometriaa tai biologista kytkentäoperaattoria.",
    backLink: "← Takaisin näyttöön",
    cautionText: "Superpositiorikkomuksen näyttö tulee pääasiassa ELF-yhdistelmätutkimuksista. Laajennus RF-yhdistelmiin ja geometriseen tulkintaan on BERMin synteesi (M-taso), ei vakiintunut konsensus.",

    s1Title: "Periaate",
    s1Lead: "Standardisähkömagnetismissa kentät noudattavat superpositiota. Lindgrenin ansatz muuttaa geometrista kuvausta: sen neliöllinen termi tuottaa täsmälliset sekoitustermit, ja eksplisiittisillä aine–metriikka- ja lineaarivasteoletuksilla seuraa ehdollinen vasteoperaattorimuoto. Biologinen havaittavuus ja päätepisteen ei-additiivisuus riippuvat silti kalibroimattomasta kudosytimestä:",
    s1Formula: "R(A₁ + A₂) ≠ R(A₁) + R(A₂)",
    s1Explain: "Tämä tarkoittaa, että kahden samanaikaisen EMF-lähteen biologista vaikutusta ei voida ennustaa pelkästään niiden yksittäisistä vaikutuksista. Vuorovaikutustermi — osa, jonka superpositio ohittaa — on usein suurempi kuin kumpikin yksittäinen vaikutus.",

    s2Title: "Näyttö yhdistetyistä altistuksista",
    s2Lead: "172 tutkimuksen systemaattinen katsaus tarkasteli yhdistettyjen EMF- ja kemiallisten/fyysisten altistusten biologisia vaikutuksia ([[ref:juutilainen2006_superposition|Juutilainen ym. 2006]]):",
    s2Findings: [
      { label: "Yhteiskarsinogeenisuus", detail: "ELF-kentät vahvistivat tunnettujen karsinogeenien vaikutuksia 43:ssa 58 tutkimuksesta (74 %). Vahvistusta ei ennustettu kummallakaan aineella yksin — se vaati yhteisaltistuksen." },
      { label: "Genotoksisuuden vahvistuminen", detail: "Yhdistetty ELF + kemiallinen altistus tuotti DNA-vaurioita, jotka ylittivät yksittäisten vaikutusten summan useissa solulinjoissa ja in vivo -malleissa." },
      { label: "Annos-vasteen epälineaarisuus", detail: "Yhdistetty vaikutus ei ollut pelkästään additiivinen — joissakin annosyhdistelmissä vuorovaikutus oli synergistinen (summaa suurempi), toisissa antagonistinen (summaa pienempi)." },
      { label: "Ikkunavaikutukset", detail: "Superpositiorikkomus oli voimakkain tietyissä taajuus/amplitudi-yhdistelmissä ('biologiset ikkunat'), yhteensopivasti BERMissä dokumentoitujen Adey-Blackman-resonanssi-ikkunoiden kanssa." },
    ],
    s2Stat: "74 % yhteiskarsinogeenisuustutkimuksista osoittaa vahvistusta yksittäisten vaikutusten yli",

    s3Title: "Miksi tällä on merkitystä tosielämän altistukselle",
    s3Lead: "Laboratoriossa EMF-tutkimukset testaavat tyypillisesti yksitaajuisia, yksittäisen lähteen altistuksia. Tosielämän ympäristöissä on 5–12 samanaikaista EMF-lähdettä 10 suuruusluokan taajuusalueella. Superpositiorikkomus selittää keskeisen pulman EMF-tutkimuksessa:",
    s3Points: [
      { q: "Miksi yksitaajuiset tutkimukset eivät usein replikoidu?", a: "Koska vaikutus riippuu taustakentän konfiguraatiosta. 50 Hz -tutkimus laboratoriossa, jossa on erilainen ympäristön RF kuin toisessa laboratoriossa, ei ole replikaatio — se on eri koe." },
      { q: "Miksi tosielämän terveyskorrelaatiot ovat vahvempia kuin laboratorioennusteet?", a: "Koska monilähteiset ympäristöt tuottavat vuorovaikutusvaikutuksia, joita yksittäisen lähteen tutkimukset eivät pysty vangitsemaan." },
      { q: "Miksi amish-poikkeus on olemassa?", a: "Amisheilla on nolla teknologiakerrosta — ei superpositiovuorovaikutusta. Heidän biologinen vasteensa pelkkään geomagneettiseen taustaan on 'R(A₁)'-referenssitila." },
    ],

    s4Title: "Yhteys χ(Ā):hen",
    s4Lead: "Superpositiorikkomus on matemaattisesti yhteydessä χ-valintasääntöön. Kun taustakenttä Ā on läsnä, häiriö δA vaikuttaa olemassa olevaan geometriaan:",
    s4Formula: "R(Ā + δA) = R(Ā) + χ(Ā) · δA + O(δA²)",
    s4Explain: "BERM:n ehdotetussa sulkeumassa χ(Ā) tekee vasteesta taustariippuvaisen. Ei-additiivisuus on siksi erotteleva testikuvio, ei todiste siitä, että sulkeuma tai Lindgrenin geometria tuotti koetuloksen.",

    s5Title: "Epistemologinen rehellisyys",
    s5Points: [
      "172 tutkimuksen katsaus kattaa pääasiassa ELF + kemialliset yhdistelmät, ei monitaajuisia EMF-yhdistelmiä",
      "Geometrinen tulkinta (metrinen epälineaarisuus) on BERMin kehys, ei alkuperäisten tekijöiden",
      "Varsinaiset monitaajuiset EMF-vuorovaikutustutkimukset ovat harvinaisia — suurin osa näytöstä on yhteisaltistusparadigmoista",
      "Yhteys yhteiskarsinogeenisuuden ja hedelmällisyysvaikutusten välillä on mekanistinen päättely, ei suora todiste",
    ],

    predictionText: "Ennuste SUPER-1: Kontrolloitu tutkimus, joka vertaa yksitaajuista vs. monitaajuista EMF-altistusta siittiöparametreihin, osoittaa että monitaajuiset vaikutukset ylittävät yksitaajuisten vaikutusten summan, ja vuorovaikutustermi skaalautuu lähteiden kokonaismäärän mukaan.",
    predictionLink: "Katso ennusteet →",
    predictionHref: "/predictions",
  },
  ja: {
    title: "重ね合わせの破れ",
    subtitle: "172件の複合曝露研究を収録する。BERMは非加算的所見が共通の背景依存閉包に従うかを検証するが、所見だけでLindgren幾何学や生物学的結合演算子が実証されるわけではない。",
    backLink: "← エビデンスに戻る",
    cautionText: "重ね合わせ破れの証拠は主にELF組み合わせ研究からのものです。RF組み合わせおよび幾何学的解釈への拡張はBERMの統合（Mレベル）であり、確立されたコンセンサスではありません。",

    s1Title: "原理",
    s1Lead: "標準電磁気学では場は重ね合わせに従う。Lindgrenアンザッツの二次項は厳密な混合項を生み、明示的な物質–計量・線形応答仮定から条件付き応答演算子形が得られる。生物学的検出と非加算的エンドポイントは未校正の組織カーネルに依存する：",
    s1Formula: "R(A₁ + A₂) ≠ R(A₁) + R(A₂)",
    s1Explain: "これは、2つの同時EMFソースの生物学的効果を個別の効果のみから予測できないことを意味します。相互作用項 — 重ね合わせが見逃す部分 — は、個別の効果よりも大きいことが多いです。",

    s2Title: "複合曝露からの証拠",
    s2Lead: "172件の研究のシステマティックレビューが、複合EMFおよび化学的/物理的曝露の生物学的効果を検討しました（[[ref:juutilainen2006_superposition|Juutilainen et al. 2006]]）：",
    s2Findings: [
      { label: "共発がん性", detail: "ELF場は58件中43件（74%）の研究で既知の発がん物質の効果を増強しました。この増強はどちらの物質単独でも予測されず、共曝露を必要としました。" },
      { label: "遺伝毒性の増幅", detail: "複合ELF+化学的曝露は、複数の細胞株およびin vivoモデルで個別効果の合計を超えるDNA損傷を生じました。" },
      { label: "用量反応の非線形性", detail: "複合効果は単純な加算ではなく — 一部の用量組み合わせでは相乗的（合計より大きい）、他では拮抗的（合計より小さい）でした。" },
      { label: "ウィンドウ効果", detail: "重ね合わせ破れは特定の周波数/振幅の組み合わせ（「生物学的ウィンドウ」）で最も強く、BERMで文書化されたAdey-Blackman共鳴ウィンドウと一致しています。" },
    ],
    s2Stat: "共発がん性研究の74%が個別効果を超える増強を示す",

    s3Title: "実世界の曝露にとってなぜ重要か",
    s3Lead: "実験室のEMF研究は通常、単一周波数・単一ソースの曝露をテストします。実世界の環境には、10桁の周波数範囲にわたる5〜12の同時EMFソースが含まれています。重ね合わせ破れはEMF研究の中心的な謎を説明します：",
    s3Points: [
      { q: "なぜ単一周波数の研究はしばしば再現されないのか？", a: "効果が背景場の構成に依存するためです。別のRF環境を持つ実験室での50Hz研究は再現ではなく — 異なる実験です。" },
      { q: "なぜ実世界の健康相関は実験室の予測より強いのか？", a: "多ソース環境が単一ソース研究では捕捉できない相互作用効果を生むためです。" },
      { q: "なぜアーミッシュの例外が存在するのか？", a: "アーミッシュはゼロ技術層 — 重ね合わせ相互作用なし。地磁気背景のみに対する生物学的応答がR(A₁)参照状態です。" },
    ],

    s4Title: "χ(Ā)との接続",
    s4Lead: "重ね合わせ破れはχ選択則と数学的に関連しています。背景場Āが存在する場合、摂動δAは既存の幾何学に作用します：",
    s4Formula: "R(Ā + δA) = R(Ā) + χ(Ā) · δA + O(δA²)",
    s4Explain: "BERMの提案閉包ではχ(Ā)が応答を背景依存にする。非加算性は識別パターンであり、閉包やLindgren幾何学が実験結果を生んだ証明ではない。",

    s5Title: "認識論的誠実さ",
    s5Points: [
      "172件のレビューは主にELF+化学的組み合わせであり、多周波数EMFではない",
      "幾何学的解釈（計量非線形性）はBERMのフレームワークであり、原著者のものではない",
      "真の多周波数EMF相互作用研究は希少 — 証拠の大部分は共曝露パラダイムから",
      "共発がん性と生殖能力効果の間の接続は機構的推論であり、直接的証拠ではない",
    ],

    predictionText: "予測 SUPER-1: 精子パラメータに対する単一周波数vs多周波数EMF曝露を比較する対照研究は、多周波数効果が単一周波数効果の合計を超え、相互作用項がソースの総数に比例してスケールすることを示すでしょう。",
    predictionLink: "予測を見る →",
    predictionHref: "/predictions",
  },
  fr: {
    title: "Violation de la superposition",
    subtitle: "Le catalogue recense 172 études d'expositions combinées. BERM teste si les résultats non additifs suivent une fermeture commune dépendante du fond ; ils ne démontrent pas à eux seuls la géométrie de Lindgren ni un opérateur biologique.",
    backLink: "← Retour aux Preuves",
    cautionText: "Les preuves de violation de superposition proviennent principalement d'études de combinaison ELF. L'extension aux combinaisons RF et à l'interprétation géométrique est la synthèse de BERM (niveau M), pas un consensus établi.",

    s1Title: "Le principe",
    s1Lead: "En électromagnétisme standard, les champs obéissent à la superposition. Le terme quadratique de l'ansatz de Lindgren produit des termes de mélange exacts et une forme d'opérateur conditionnelle suit d'hypothèses explicites matière–métrique et réponse linéaire. La détection biologique et la non-additivité dépendent d'un noyau tissulaire non calibré :",
    s1Formula: "R(A₁ + A₂) ≠ R(A₁) + R(A₂)",
    s1Explain: "Cela signifie que l'effet biologique de deux sources EMF simultanées ne peut pas être prédit à partir de leurs effets individuels seuls. Le terme d'interaction — la partie que la superposition manque — est souvent plus grand que chaque effet individuel.",

    s2Title: "Preuves des expositions combinées",
    s2Lead: "Une revue systématique de 172 études a examiné les effets biologiques des expositions EMF et chimiques/physiques combinées ([[ref:juutilainen2006_superposition|Juutilainen et al. 2006]]) :",
    s2Findings: [
      { label: "Co-carcinogenèse", detail: "Les champs ELF ont renforcé les effets de carcinogènes connus dans 43 des 58 études (74 %). Le renforcement n'a pas été prédit par l'un ou l'autre agent seul — il nécessitait une co-exposition." },
      { label: "Amplification de la génotoxicité", detail: "L'exposition combinée ELF + chimique a produit des dommages à l'ADN dépassant la somme des effets individuels dans plusieurs lignées cellulaires et modèles in vivo." },
      { label: "Non-linéarité dose-réponse", detail: "L'effet combiné n'était pas simplement additif — à certaines combinaisons de doses, l'interaction était synergique (supérieure à la somme), à d'autres antagoniste (inférieure à la somme)." },
      { label: "Effets de fenêtre", detail: "La violation de superposition était la plus forte à certaines combinaisons fréquence/amplitude (« fenêtres biologiques »), en accord avec les fenêtres de résonance Adey-Blackman documentées ailleurs dans BERM." },
    ],
    s2Stat: "74 % des études de co-carcinogenèse montrent un renforcement au-delà des effets individuels",

    s3Title: "Pourquoi c'est important pour l'exposition réelle",
    s3Lead: "Les études EMF en laboratoire testent typiquement des expositions à fréquence unique et source unique. Les environnements réels contiennent 5 à 12 sources EMF simultanées couvrant 10 ordres de grandeur en fréquence. La violation de superposition explique un puzzle central de la recherche EMF :",
    s3Points: [
      { q: "Pourquoi les études mono-fréquence échouent-elles souvent à se répliquer ?", a: "Parce que l'effet dépend de la configuration du champ de fond. Une étude à 50 Hz dans un laboratoire avec un RF ambiant différent d'un autre laboratoire n'est pas une réplication — c'est une expérience différente." },
      { q: "Pourquoi les corrélations sanitaires réelles sont-elles plus fortes que les prédictions de laboratoire ?", a: "Parce que les environnements multi-sources produisent des effets d'interaction que les études mono-source ne peuvent pas capturer." },
      { q: "Pourquoi l'exception Amish existe-t-elle ?", a: "Les Amish ont zéro couche technologique — pas d'interaction de superposition. Leur réponse biologique au seul fond géomagnétique est l'état de référence R(A₁)." },
    ],

    s4Title: "Connexion avec χ(Ā)",
    s4Lead: "La violation de superposition est mathématiquement liée à la règle de sélection χ. Quand le champ de fond Ā est présent, la perturbation δA agit sur la géométrie existante :",
    s4Formula: "R(Ā + δA) = R(Ā) + χ(Ā) · δA + O(δA²)",
    s4Explain: "Dans la fermeture proposée par BERM, χ(Ā) rend la réponse dépendante du fond. La non-additivité est donc un motif discriminant à tester, pas la preuve que la fermeture ou la géométrie de Lindgren a produit le résultat.",

    s5Title: "Honnêteté épistémologique",
    s5Points: [
      "La revue de 172 études porte principalement sur les combinaisons ELF + chimiques, pas sur les EMF multi-fréquences",
      "L'interprétation géométrique (non-linéarité métrique) est le cadre de BERM, pas celui des auteurs originaux",
      "Les véritables études d'interaction EMF multi-fréquences sont rares — la plupart des preuves proviennent de paradigmes de co-exposition",
      "Le lien entre co-carcinogenèse et effets sur la fertilité est une inférence mécanistique, pas une preuve directe",
    ],

    predictionText: "Prédiction SUPER-1 : Une étude contrôlée comparant l'exposition EMF mono-fréquence vs multi-fréquence sur les paramètres spermatiques montrera que les effets multi-fréquences dépassent la somme des effets mono-fréquences, le terme d'interaction augmentant avec le nombre total de sources.",
    predictionLink: "Voir les prédictions →",
    predictionHref: "/predictions",
  },
  ko: {
    title: "중첩 위반",
    subtitle: "172건의 복합 노출 연구를 수록한다. BERM은 비가산 결과가 공통 배경 의존 폐쇄를 따르는지 검증하지만, 그 결과만으로 Lindgren 기하학이나 생물학적 결합 연산자가 입증되지는 않는다.",
    backLink: "← 증거로 돌아가기",
    cautionText: "중첩 위반 증거는 주로 ELF 조합 연구에서 비롯됩니다. RF 조합 및 기하학적 해석으로의 확장은 BERM의 종합(M 수준)이며, 확립된 합의가 아닙니다.",

    s1Title: "원리",
    s1Lead: "표준 전자기학에서 장은 중첩을 따른다. Lindgren 가정의 이차항은 정확한 혼합항을 만들고 명시적 물질–메트릭 및 선형반응 가정에서 조건부 반응 연산자 형태가 따른다. 생물학적 검출과 비가산 종점 반응은 미보정 조직 커널에 달려 있다:",
    s1Formula: "R(A₁ + A₂) ≠ R(A₁) + R(A₂)",
    s1Explain: "이는 두 개의 동시 EMF 소스의 생물학적 효과를 개별 효과만으로 예측할 수 없음을 의미합니다. 상호 작용 항 — 중첩이 놓치는 부분 — 은 종종 어느 한 개별 효과보다 큽니다.",

    s2Title: "복합 노출의 증거",
    s2Lead: "172건의 연구에 대한 체계적 리뷰가 복합 EMF 및 화학적/물리적 노출의 생물학적 효과를 검토했습니다 ([[ref:juutilainen2006_superposition|Juutilainen et al. 2006]]):",
    s2Findings: [
      { label: "공동 발암성", detail: "ELF 장은 58건 중 43건(74%)의 연구에서 알려진 발암 물질의 효과를 강화했습니다. 이 강화는 어느 물질 단독으로도 예측되지 않았으며 — 공동 노출이 필요했습니다." },
      { label: "유전독성 증폭", detail: "복합 ELF + 화학적 노출은 여러 세포주 및 in vivo 모델에서 개별 효과의 합을 초과하는 DNA 손상을 생성했습니다." },
      { label: "용량-반응 비선형성", detail: "복합 효과는 단순히 가산적이 아니었으며 — 일부 용량 조합에서는 상승적(합보다 큰), 다른 조합에서는 길항적(합보다 작은)이었습니다." },
      { label: "창 효과", detail: "중첩 위반은 특정 주파수/진폭 조합('생물학적 창')에서 가장 강했으며, BERM에서 문서화된 Adey-Blackman 공명 창과 일치합니다." },
    ],
    s2Stat: "공동 발암성 연구의 74%가 개별 효과를 초과하는 강화를 보임",

    s3Title: "실제 노출에 왜 중요한가",
    s3Lead: "실험실 EMF 연구는 일반적으로 단일 주파수, 단일 소스 노출을 테스트합니다. 실제 환경에는 주파수에서 10자릿수에 걸치는 5-12개의 동시 EMF 소스가 포함됩니다. 중첩 위반은 EMF 연구의 핵심 퍼즐을 설명합니다:",
    s3Points: [
      { q: "왜 단일 주파수 연구는 종종 재현되지 않는가?", a: "효과가 배경장 구성에 의존하기 때문입니다. 다른 주변 RF를 가진 실험실에서의 50Hz 연구는 재현이 아닙니다 — 다른 실험입니다." },
      { q: "왜 실제 건강 상관관계가 실험실 예측보다 강한가?", a: "다중 소스 환경이 단일 소스 연구로는 포착할 수 없는 상호 작용 효과를 생성하기 때문입니다." },
      { q: "왜 아미쉬 예외가 존재하는가?", a: "아미쉬는 기술 계층이 제로 — 중첩 상호 작용이 없습니다. 지자기 배경만에 대한 생물학적 반응이 R(A₁) 기준 상태입니다." },
    ],

    s4Title: "χ(Ā)와의 연결",
    s4Lead: "중첩 위반은 χ 선택 규칙과 수학적으로 관련됩니다. 배경장 Ā가 존재할 때, 섭동 δA는 기존 기하학에 작용합니다:",
    s4Formula: "R(Ā + δA) = R(Ā) + χ(Ā) · δA + O(δA²)",
    s4Explain: "BERM의 제안 폐쇄에서 χ(Ā)는 반응을 배경 의존적으로 만든다. 비가산성은 판별할 시험 패턴이지 폐쇄나 Lindgren 기하학이 결과를 만들었다는 증거가 아니다.",

    s5Title: "인식론적 정직",
    s5Points: [
      "172건 리뷰는 주로 ELF + 화학적 조합이며, 다중 주파수 EMF가 아님",
      "기하학적 해석(계량 비선형성)은 BERM의 프레임워크이며, 원저자의 것이 아님",
      "진정한 다중 주파수 EMF 상호 작용 연구는 드물며 — 대부분의 증거는 공동 노출 패러다임에서 비롯",
      "공동 발암성과 생식 능력 효과 사이의 연결은 메커니즘적 추론이며, 직접적 증거가 아님",
    ],

    predictionText: "예측 SUPER-1: 정자 매개변수에 대한 단일 주파수 vs 다중 주파수 EMF 노출을 비교하는 대조 연구는 다중 주파수 효과가 단일 주파수 효과의 합을 초과하고, 상호 작용 항이 총 소스 수에 비례하여 스케일링됨을 보여줄 것입니다.",
    predictionLink: "예측 보기 →",
    predictionHref: "/predictions",
  },
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const d = pickCopy(COPY, locale);
  return { title: `${d.title} – Extinction Field`, description: d.subtitle };
}

export default async function SuperpositionPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const d = pickCopy(COPY, locale);
  const prefix = `/${locale}`;

  const cite = (text: string) => (
    <InlineReferenceText text={text} locale={locale} />
  );

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 sm:py-20">
      <p className="mb-6">
        <a href={`${prefix}/evidence`} className="text-sm text-accent hover:underline">{d.backLink}</a>
      </p>

      <PageHeader icon={Layers} title={d.title} subtitle={d.subtitle} />

      <div className="mt-8">
        <CautionBox locale={locale}><p>{d.cautionText}</p></CautionBox>
      </div>

      {/* Section 1: The Principle */}
      <section className="mt-10">
        <h2 className="text-2xl font-semibold mb-4">{d.s1Title}</h2>
        <p className="text-foreground-muted mb-4">{d.s1Lead}</p>
        <div className="my-4 px-4 py-3 bg-background-secondary rounded-lg overflow-x-auto">
          <code className="text-sm font-mono-num whitespace-nowrap">{d.s1Formula}</code>
        </div>
        <p className="text-foreground-muted">{d.s1Explain}</p>
      </section>

      {/* Section 2: Evidence */}
      <section className="mt-10">
        <h2 className="text-2xl font-semibold mb-4">{d.s2Title}</h2>
        <p className="text-foreground-muted mb-6">{cite(d.s2Lead)}</p>
        <div className="space-y-4">
          {d.s2Findings.map((f) => (
            <div key={f.label} className="rounded-lg border border-border/50 p-4">
              <h3 className="font-medium mb-1">{f.label}</h3>
              <p className="text-sm text-foreground-muted">{f.detail}</p>
            </div>
          ))}
        </div>
        <div className="mt-6 rounded-lg bg-accent/5 border border-accent/20 p-4 text-center">
          <p className="text-lg font-mono font-semibold">{d.s2Stat}</p>
        </div>
      </section>

      {/* Section 3: Real-world implications */}
      <section className="mt-10">
        <h2 className="text-2xl font-semibold mb-4">{d.s3Title}</h2>
        <p className="text-foreground-muted mb-6">{d.s3Lead}</p>
        <div className="space-y-4">
          {d.s3Points.map((p) => (
            <div key={p.q} className="rounded-lg border border-border/50 p-4">
              <h3 className="font-medium mb-1 text-accent">{p.q}</h3>
              <p className="text-sm text-foreground-muted">{p.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Section 4: Connection to χ */}
      <section className="mt-10">
        <h2 className="text-2xl font-semibold mb-4">{d.s4Title}</h2>
        <p className="text-foreground-muted mb-4">{d.s4Lead}</p>
        <div className="my-4 px-4 py-3 bg-background-secondary rounded-lg overflow-x-auto">
          <code className="text-sm font-mono-num whitespace-nowrap">{d.s4Formula}</code>
        </div>
        <p className="text-foreground-muted">{d.s4Explain}</p>
      </section>

      {/* Section 5: Epistemic honesty */}
      <section className="mt-10">
        <h2 className="text-2xl font-semibold mb-4">{d.s5Title}</h2>
        <ul className="space-y-2 text-sm text-foreground-muted">
          {d.s5Points.map((p) => (
            <li key={p} className="flex gap-2">
              <span className="text-amber-500 mt-0.5 shrink-0">⚠</span>
              <span>{p}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Prediction */}
      <div className="mt-10">
        <DerivedPrediction locale={locale}>
          <p className="text-sm leading-relaxed mb-3">{d.predictionText}</p>
          <a href={`${prefix}${d.predictionHref}`} className="text-sm text-accent hover:underline">{d.predictionLink}</a>
        </DerivedPrediction>
      </div>
    </div>
  );
}
