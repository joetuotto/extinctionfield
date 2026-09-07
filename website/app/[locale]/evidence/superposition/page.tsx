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
    subtitle: "The catalogue records 172 combined-exposure studies. BERM tests whether non-additive findings are compatible with the restricted L1 geometric shape χ_geo(x); the studies do not identify the open normalization x=N(z) or a biological L2 coupling operator.",
    backLink: "← Back to Evidence",
    cautionText: "The superposition violation evidence comes primarily from ELF combination studies. Extension to RF combinations and to the geometric interpretation is BERM's synthesis (M-level), not established consensus.",

    s1Title: "The principle",
    s1Lead: "In standard electromagnetism, fields obey superposition. Lindgren's geodesic-deviation chain gives the signed directional response and the χ(q) formula at L1. Selecting q=|Ā| through a dimensionless Lorentz-to-Euclidean spatial/scalar projection is L2, and identifying a measured biological background with q remains open at L0→L2; geometry alone does not establish a non-additive biological response:",
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

    s4Title: "Connection to χ_geo(x)",
    s4Lead: "The χ_geo(q)=q/√(1+q²) formula is L1. The dimensionless coordinate q=|Ā|:=√κ·s comes from the declared L2 spatial/scalar projection; a measured background z instead needs an explicit candidate normalization q=N(z) at the open L0→L2 boundary:",
    s4Formula: "L1: χ_geo(x)=x/√(1+x²);  open L0→L2 candidate: x=N(z), R(z+δz)=R(z)+C_B·χ_geo(x)·δz+O(δz²)",
    s4Explain: "Empirical use does not change χ_geo's L1 provenance. The normalization N, biological coefficient C_B and response R remain open L2 identifications, while imported response mechanisms remain L3. Non-additivity is a discriminating pattern to test, not proof that this mapping or the Lindgren geometry generated an experimental result. This applies equally to conventional explanations.",

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
    subtitle: "Luettelo sisältää 172 yhdistelmäaltistustutkimusta. BERM testaa, ovatko ei-additiiviset löydökset yhteensopivia rajatun L1-geometriamuodon χ_geo(x) kanssa; tutkimukset eivät identifioi avointa normalisointia x=N(z) tai biologista L2-kytkentäoperaattoria.",
    backLink: "← Takaisin näyttöön",
    cautionText: "Superpositiorikkomuksen näyttö tulee pääasiassa ELF-yhdistelmätutkimuksista. Laajennus RF-yhdistelmiin ja geometriseen tulkintaan on BERMin synteesi (M-taso), ei vakiintunut konsensus.",

    s1Title: "Periaate",
    s1Lead: "Standardisähkömagnetismissa kentät noudattavat superpositiota. Lindgrenin geodeesipoikkeamaketju antaa etumerkillisen suunnatun vasteen ja χ(q)-kaavan L1-tasolla. Koordinaatin q=|Ā| valinta dimensiottomalla Lorentz→Euklidisella spatiaalinen/skalaari-projektiolla on L2, ja mitatun biologisen taustan samaistaminen q:hun on avoin L0→L2-askel; geometria yksin ei osoita ei-additiivista biologista vastetta:",
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

    s4Title: "Yhteys χ_geo(x):ään",
    s4Lead: "χ_geo(q)=q/√(1+q²)-kaava on L1. Dimensioton q=|Ā|:=√κ·s syntyy ilmoitetulla L2 spatiaalinen/skalaari-projektiolla; mitattu tausta z tarvitsee sen sijaan eksplisiittisen ehdokasnormalisoinnin q=N(z) avoimella L0→L2-rajalla:",
    s4Formula: "L1: χ_geo(x)=x/√(1+x²);  avoin L0→L2-ehdokas: x=N(z), R(z+δz)=R(z)+C_B·χ_geo(x)·δz+O(δz²)",
    s4Explain: "Empiirinen käyttö ei muuta χ_geo:n L1-provenienssia. Normalisointi N, biologinen kerroin C_B ja vaste R pysyvät avoimina L2-identifikaatioina, ja tuodut vastemekanismit säilyvät L3-tasolla. Ei-additiivisuus on erotteleva testikuvio, ei todiste siitä, että tämä kuvaus tai Lindgrenin geometria tuotti koetuloksen. Tämä koskee yhtä lailla konventionaalisia selityksiä.",

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
    subtitle: "172件の複合曝露研究を収録する。BERMは非加算的所見が限定されたL1幾何形状χ_geo(x)と整合するかを検証するが、研究だけで未解決の正規化x=N(z)や生物学的L2結合演算子が同定されるわけではない。",
    backLink: "← エビデンスに戻る",
    cautionText: "重ね合わせ破れの証拠は主にELF組み合わせ研究からのものです。RF組み合わせおよび幾何学的解釈への拡張はBERMの統合（Mレベル）であり、確立されたコンセンサスではありません。",

    s1Title: "原理",
    s1Lead: "標準電磁気学では場は重ね合わせに従う。Lindgrenの測地線偏差連鎖は符号付き方向応答とχ(q)式をL1で与える。無次元Lorentz→Euclid空間・スカラー射影でq=|Ā|を選ぶ操作はL2で、測定された生物学的背景をqへ同定することは未解決L0→L2である。幾何学だけでは非加算的生物応答は確立されない：",
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

    s4Title: "χ_geo(x)との接続",
    s4Lead: "χ_geo(q)=q/√(1+q²)式はL1である。無次元座標q=|Ā|:=√κ·sは宣言したL2空間・スカラー射影から得られ、測定背景zには未解決L0→L2境界で別の候補正規化q=N(z)が必要である：",
    s4Formula: "L1: χ_geo(x)=x/√(1+x²);  未解決L0→L2候補: x=N(z), R(z+δz)=R(z)+C_B·χ_geo(x)·δz+O(δz²)",
    s4Explain: "経験的利用はχ_geoのL1来歴を変えない。正規化N、生物学的係数C_B、応答Rの同定はL2に残り、導入された応答機構はL3に残る。非加算性は識別パターンであり、この写像やLindgren幾何学が実験結果を生んだ証明ではない。これは従来の説明にも同様に当てはまる。",

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
    subtitle: "Le catalogue recense 172 études d'expositions combinées. BERM teste si les résultats non additifs sont compatibles avec la forme géométrique restreinte χ_geo(x), dérivée en L1 ; ces études n'identifient ni la normalisation ouverte x=N(z), ni l'opérateur biologique L2.",
    backLink: "← Retour aux Preuves",
    cautionText: "Les preuves de violation de superposition proviennent principalement d'études de combinaison ELF. L'extension aux combinaisons RF et à l'interprétation géométrique est la synthèse de BERM (niveau M), pas un consensus établi.",

    s1Title: "Le principe",
    s1Lead: "En électromagnétisme standard, les champs obéissent à la superposition. La chaîne de déviation géodésique de Lindgren donne la réponse directionnelle signée et la formule χ(q) en L1. Choisir q=|Ā| par une projection spatiale/scalarie sans dimension de Lorentz vers Euclide est L2, et identifier un fond biologique mesuré à q reste ouvert en L0→L2 ; la géométrie seule n’établit pas une réponse biologique non additive :",
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

    s4Title: "Connexion avec χ_geo(x)",
    s4Lead: "La formule χ_geo(q)=q/√(1+q²) est L1. La coordonnée sans dimension q=|Ā|:=√κ·s vient de la projection spatiale/scalarie L2 déclarée ; un fond mesuré z exige plutôt une normalisation candidate explicite q=N(z) à la frontière L0→L2 ouverte :",
    s4Formula: "L1 : χ_geo(x)=x/√(1+x²) ; candidat L0→L2 ouvert : x=N(z), R(z+δz)=R(z)+C_B·χ_geo(x)·δz+O(δz²)",
    s4Explain: "L'usage empirique ne change pas la provenance L1 de χ_geo. La normalisation N, le coefficient biologique C_B et la réponse R restent des identifications L2 ouvertes, tandis que les mécanismes importés restent L3. La non-additivité est un motif discriminant, pas la preuve que cette application ou la géométrie de Lindgren a produit le résultat. Cela s'applique tout autant aux explications conventionnelles.",

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
    subtitle: "172건의 복합 노출 연구를 수록한다. BERM은 비가산 결과가 제한된 L1 기하 형태 χ_geo(x)와 양립하는지 검정하지만, 연구만으로 열린 정규화 x=N(z)나 생물학적 L2 결합 연산자가 식별되지는 않는다.",
    backLink: "← 증거로 돌아가기",
    cautionText: "중첩 위반 증거는 주로 ELF 조합 연구에서 비롯됩니다. RF 조합 및 기하학적 해석으로의 확장은 BERM의 종합(M 수준)이며, 확립된 합의가 아닙니다.",

    s1Title: "원리",
    s1Lead: "표준 전자기학에서 장은 중첩을 따른다. Lindgren 측지선 편차 연쇄는 부호 있는 방향 반응과 χ(q) 공식을 L1에서 준다. 무차원 Lorentz→Euclid 공간·스칼라 사영으로 q=|Ā|를 선택하는 것은 L2이고 측정된 생물학적 배경을 q와 동일시하는 것은 열린 L0→L2다. 기하학만으로 비가산 생물 반응이 확립되지는 않는다:",
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

    s4Title: "χ_geo(x)와의 연결",
    s4Lead: "χ_geo(q)=q/√(1+q²) 공식은 L1이다. 무차원 좌표 q=|Ā|:=√κ·s는 선언된 L2 공간·스칼라 사영에서 나오며, 측정 배경 z에는 열린 L0→L2 경계에서 별도의 후보 정규화 q=N(z)가 필요하다:",
    s4Formula: "L1: χ_geo(x)=x/√(1+x²);  열린 L0→L2 후보: x=N(z), R(z+δz)=R(z)+C_B·χ_geo(x)·δz+O(δz²)",
    s4Explain: "경험적 사용은 χ_geo의 L1 출처를 바꾸지 않는다. 정규화 N, 생물학적 계수 C_B와 반응 R의 식별은 열린 L2에 남고, 도입된 반응 메커니즘은 L3에 남는다. 비가산성은 판별 패턴이지 이 매핑이나 Lindgren 기하학이 실험 결과를 만들었다는 증거가 아니다. 이는 기존 설명에도 동일하게 적용된다.",

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
