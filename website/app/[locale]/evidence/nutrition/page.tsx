import type { Metadata } from "next";
import { Apple } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import Link from "next/link";
import {
  EVIDENCE_CARDS,
  NUTRITIONAL_MODULATORS,
  EPISTEMIC_LEVELS,
} from "@/lib/eyeColorData";
import { CHAIN_EPISTEMIC_COLORS } from "@/lib/epistemicConstants";
import { pickCopy, pickField } from "@/lib/i18n";
import { StudyCitation } from "@/components/StudyCitation";
import { InlineReferenceText } from "@/components/InlineReferenceText";

const NUTRITION_CARD_IDS = [
  "hirano2017-fad-cry",
  "sherrard2025-cry2-trpc1",
  "bartoelke2025",
  "majewska2025",
  "lamia2009",
  "b2_fertility_consolidated",
];

const COPY = {
  en: {
    title: "Nutritional CRY Modulation",
    subtitle: "How B2, omega fatty acids, and fasting dynamics control cryptochrome function",
    backLink: "← Back to Evidence",
    section1Title: "The Nutritional Gate",
    section1: [
      "Cryptochrome cannot function without its chromophore. The protein is an antenna, but FAD — a derivative of vitamin B2 (riboflavin) — is the molecule that actually absorbs blue light and initiates the radical pair. Without FAD, cryptochrome exists as a hollow shell: present but magnetically blind.",
      "This creates a simple but profound prediction: populations with vitamin B2 deficiency should show impaired cryptochrome-dependent functions, including circadian rhythm stability, melatonin production, and (if BERM is correct) magnetoreception-mediated reproductive timing.",
      "The evidence for this nutritional gate comes from multiple independent lines of research. [[ref:hirano2017|Hirano et al. (2017)]] showed that FAD directly stabilizes CRY proteins in mouse liver. The Sherrard laboratory ([[ref:yap2025|Yap et al. 2025]]) demonstrated that depleting cellular FAD eliminates magnetic field directional selectivity entirely. [[ref:lamia2009|Lamia et al. (2009)]] revealed that the fasting sensor AMPK actively degrades CRY1, creating an apparent paradox. And [[ref:majewska2025|Majewska et al. (2025)]] showed that CRY orientation on membranes — essential for directional sensing — depends on lipid composition.",
      "Together, these findings define three nutritional control points for pathway B: (1) B2/FAD availability for chromophore loading, (2) membrane lipid composition for CRY orientation, and (3) AMPK-mediated CRY turnover rate during fasting.",
    ],
    section2Title: "Key Evidence",
    section3Title: "Nutritional Modulators",
    section3Sub: "Four factors that control CRY function through distinct mechanisms.",
    section4Title: "The Fasting Paradox",
    section4: [
      "There is an apparent contradiction in the evidence. AMPK, the cell's nutrient sensor that activates during fasting, phosphorylates CRY1 and targets it for degradation ([[ref:lamia2009|Lamia et al. 2009, Science]]). Yet the only study showing human magnetoreception used starved subjects ([[ref:chae2019|Chae 2019]]). If fasting destroys the very protein that senses magnetic fields, how can fasting enhance magnetoreception?",
      "The resolution lies in CRY quality versus quantity. Fasting does degrade old CRY molecules via the AMPK-Ser71-FBXL3 pathway. But fasting simultaneously increases the pool of oxidized flavoproteins via fatty acid beta-oxidation — meaning more FAD is available. When the cell synthesizes replacement CRY molecules, they are loaded with fresh FAD chromophore more efficiently. The net result: fewer CRY molecules, but each one is better equipped for magnetoreception.",
      "This predicts an inverted-U dose-response: short fasting (4-12h) improves CRY quality; extended fasting (>24h) depletes the protein pool below functional threshold. B2 supplementation should shift the peak rightward.",
      "The fasting paradox resolution is an L*-level hypothesis. The individual biochemical steps are each E-level established facts. The synthesis has not been directly tested.",
    ],
    section5Title: "The China B2 Case",
    section5: [
      "China presents a striking ecological correlation. The Chinese National Health Survey (CNHS 2015-2017) found >90% B2 inadequacy across the population. China simultaneously has the world's steepest TFR decline. While this is ecological correlation — not causal proof — the mechanism is clear: B2 → FAD → CRY stability → pathway B function.",
      "[[ref:wacker2000|Wacker et al. (2000)]] found that B2-deficient mothers had 4.7× higher preeclampsia risk (OR 4.7, CI 1.8-12.2). IVF clinic data shows B2 supplementation improves embryo quality metrics. These are independent lines converging on the same biochemical bottleneck.",
      "If B2 supplementation in a high-deficiency population improved CRY-dependent circadian markers, it would be strong evidence for the nutritional modulation hypothesis. This is prediction NUT-2.",
    ],
    section6Title: "Predictions",
    section6Lead: "Three testable predictions derived from the nutritional CRY modulation hypothesis.",
    predictions: [
      {
        id: "NUT-1",
        title: "B2 supplementation improves circadian resilience to nighttime EMF",
        text: "RCT: B2 supplementation (25mg/day × 8 weeks) vs placebo in subjects with poor sleep quality and high nighttime EMF exposure. B2 group should show faster melatonin onset and better sleep efficiency because FAD-replete CRY is more resistant to EMF-induced disruption.",
        timeline: "Testable within 3-6 months (RCT, N=60)",
        falsification: "No difference in melatonin onset latency or sleep metrics between B2 and placebo groups",
      },
      {
        id: "NUT-2",
        title: "B2 deficiency × EMF interaction in 54-country regression",
        text: "Add population-level B2 adequacy as a control variable to the 54-country EMF-TFR regression model. Prediction: B2-deficient countries show STRONGER EMF-TFR association because CRY is more vulnerable when FAD-depleted. The interaction term (EMF × B2_deficiency) should be negative and significant.",
        timeline: "Testable immediately (existing data + B2 surveys from ~30 countries)",
        falsification: "No significant EMF × B2 interaction term, or interaction is positive",
      },
      {
        id: "NUT-3",
        title: "Fasting duration predicts magnetoreceptive sensitivity (inverted U)",
        text: "Replicate Chae 2019 food orientation paradigm with graded fasting durations (4h, 8h, 12h, 16h, 24h). Prediction: inverted-U dose-response with peak sensitivity at 8-16h. B2 supplementation (25mg) shifts peak rightward. Brown-eyed subjects show lower overall sensitivity but same curve shape.",
        timeline: "Testable within 2-4 months (behavioral, N=40 per duration)",
        falsification: "Monotonic increase (no decline at 24h), or no fasting effect, or B2 does not shift the peak",
      },
    ],
    epistemicTitle: "Epistemic Status",
    epistemicText: "This page presents a testable hypothesis (L*-level). The individual biochemical mechanisms are experimentally confirmed (E-level): FAD stabilizes CRY ([[ref:hirano2017|Hirano 2017]]), FAD is required for magnetic sensitivity ([[ref:yap2025|Yap 2025]]), AMPK degrades CRY1 ([[ref:lamia2009|Lamia 2009]]), CRY orientation depends on membrane composition ([[ref:majewska2025|Majewska 2025]]). The synthesis — that nutritional status systematically modulates pathway B effectiveness at the population level — has not been directly tested. The China B2 correlation is ecological, not causal.",
    seeAlso: "See also",
    eyesLink: "Eye Color & Magnetoreception →",
    predictionsLink: "Locked Predictions (NUT-1, NUT-2, NUT-3) →",
    levelLabel: "Evidence level",
    bermRelevance: "BERM relevance",
    nutrientHeaders: {
      nutrient: "Nutrient",
      target: "Target in CRY chain",
      deficiency: "Deficiency effect",
      source: "Key source",
      level: "Level",
    },
    predictionHeaders: {
      timeline: "Timeline",
      falsification: "Falsification criterion",
    },
  },
  fi: {
    title: "Ravitsemuksellinen CRY-modulaatio",
    subtitle: "Miten B2, omega-rasvahapot ja paastodynamiikka kontrolloivat kryptokromin toimintaa",
    backLink: "← Takaisin näyttöön",
    section1Title: "Ravitsemuksellinen portti",
    section1: [
      "Kryptokromi ei voi toimia ilman kromoforinsa. Proteiini on antenni, mutta FAD — B2-vitamiinin (riboflaviinin) johdannainen — on molekyyli joka varsinaisesti absorboi sinistä valoa ja käynnistää radikaaliparin. Ilman FAD:ia kryptokromi on ontto kuori: läsnä mutta magneettisesti sokea.",
      "Tämä luo yksinkertaisen mutta syvällisen ennusteen: populaatioilla joilla on B2-vitamiinipuutos tulisi olla heikentyneitä kryptokromiriippuvaisia toimintoja, mukaan lukien vuorokausirytmin stabiilisuus, melatoniinituotanto ja (jos BERM on oikeassa) magnetoreseptiovälitteinen lisääntymisajoitus.",
      "Näyttö tästä ravitsemuksellisesta portista tulee useista itsenäisistä tutkimuslinjoista. [[ref:hirano2017|Hirano ym. (2017)]] osoittivat, että FAD suoraan stabiloi CRY-proteiineja hiiren maksassa. Sherrard-laboratorio ([[ref:yap2025|Yap ym. 2025]]) osoitti, että solun FAD:n poistaminen poistaa magneettikentän suuntaerottelukyvyn täysin. [[ref:lamia2009|Lamia ym. (2009)]] paljastivat, että paastosensori AMPK aktiivisesti hajottaa CRY1:n, luoden ilmeisen paradoksin. Ja [[ref:majewska2025|Majewska ym. (2025)]] osoittivat, että CRY:n orientaatio kalvoilla — välttämätön suuntakohtaiselle aistimukselle — riippuu lipidikoostumuksesta.",
      "Yhdessä nämä löydökset määrittelevät kolme ravitsemuksellista ohjauspistettä polku B:lle: (1) B2/FAD-saatavuus kromoforin lataamista varten, (2) kalvon lipidikoostumus CRY:n orientaatiota varten, ja (3) AMPK-välitteinen CRY:n turnover-nopeus paastossa.",
    ],
    section2Title: "Avainlöydös",
    section3Title: "Ravitsemukselliset modulaattorit",
    section3Sub: "Neljä tekijää, jotka kontrolloivat CRY-toimintaa eri mekanismein.",
    section4Title: "Paastoparadoksi",
    section4: [
      "Näytössä on ilmeinen ristiriita. AMPK, solun ravintosensori, joka aktivoituu paastossa, fosforyloi CRY1:n ja kohdistaa sen hajotettavaksi ([[ref:lamia2009|Lamia ym. 2009, Science]]). Kuitenkin ainoa ihmisen magnetoreseptiota osoittanut tutkimus käytti nälkiintyneitä koehenkilöitä ([[ref:chae2019|Chae 2019]]). Jos paasto tuhoaa juuri sen proteiinin, joka aistii magneettikenttiä, miten paasto voi tehostaa magnetoreseptiota?",
      "Ratkaisu piilee CRY:n laadussa verrattuna määrään. Paasto hajottaa vanhoja CRY-molekyylejä AMPK-Ser71-FBXL3-reitin kautta. Mutta paasto lisää samanaikaisesti hapettuneiden flavoproteiinien poolia rasvahappojen beta-oksidaation kautta — mikä tarkoittaa enemmän FAD:ia saatavilla. Kun solu syntetisoi korvaavia CRY-molekyylejä, ne ladataan tuoreella FAD-kromoforilla tehokkaammin. Nettotulos: vähemmän CRY-molekyylejä, mutta jokainen on paremmin varustettu magnetoreseptioon.",
      "Tämä ennustaa käänteisen U-annosvasteen: lyhyt paasto (4-12t) parantaa CRY:n laatua; pitkitetty paasto (>24t) ehdyttää proteiinipoolin alle toiminnallisen kynnyksen. B2-lisä siirtää huippua oikealle.",
      "Paastoparadoksin ratkaisu on L*-tason hypoteesi. Yksittäiset biokemialliset vaiheet ovat kukin E-tason vahvistettuja faktoja. Synteesi ei ole suoraan testattu.",
    ],
    section5Title: "Kiinan B2-tapaus",
    section5: [
      "Kiina tarjoaa hätkähdyttävän ekologisen korrelaation. Kiinan kansallinen terveystutkimus (CNHS 2015-2017) löysi >90 % B2-puutoksen väestössä. Kiinassa on samanaikaisesti maailman jyrkin TFR-lasku. Vaikka tämä on ekologinen korrelaatio — ei kausaalinen todiste — mekanismi on selvä: B2 → FAD → CRY-stabiilisuus → polku B:n toiminta.",
      "[[ref:wacker2000|Wacker ym. (2000)]] havaitsivat, että B2-puutteisilla äideillä oli 4,7-kertainen pre-eklampsian riski (OR 4,7, CI 1,8-12,2). IVF-klinikoiden data osoittaa B2-lisän parantavan alkionlaatumittareita. Nämä ovat itsenäisiä näyttölinjoja jotka yhtyvät samaan biokemialliseen pullonkaulaan.",
      "Jos B2-lisä korkean puutoksen populaatiossa parantaisi CRY-riippuvaisia sirkadiaanisia markkereita, se olisi vahvaa näyttöä ravitsemuksellisen modulaation hypoteesille. Tämä on ennuste NUT-2.",
    ],
    section6Title: "Ennusteet",
    section6Lead: "Kolme testattavaa ennustetta jotka johdetaan ravitsemuksellisesta CRY-modulaatiohypoteesista.",
    predictions: [
      {
        id: "NUT-1",
        title: "B2-lisä parantaa sirkadiaanista resilienssiä yölliselle EMF-altistukselle",
        text: "RCT: B2-lisä (25mg/pv × 8 viikkoa) vs. lumevalmiste henkilöillä joilla huono unenlaatu ja korkea yöllinen EMF-altistus. B2-ryhmällä tulisi olla nopeampi melatoniinin alku ja parempi unen tehokkuus koska FAD-rikas CRY on vastustuskykyisempi EMF-häiriölle.",
        timeline: "Testattavissa 3-6 kuukaudessa (RCT, N=60)",
        falsification: "Ei eroa melatoniinin alkamisviiveessä tai unimittareissa B2- ja lumelääkeryhmien välillä",
      },
      {
        id: "NUT-2",
        title: "B2-puutos × EMF -interaktio 54 maan regressiossa",
        text: "Lisää väestötason B2-riittävyys kontrollimuuttujaksi 54 maan EMF-TFR-regressiomalliin. Ennuste: B2-puutteisissa maissa on VAHVEMPI EMF-TFR-assosiaatio koska CRY on haavoittuvampi FAD-köyhänä. Interaktiotermin (EMF × B2_puutos) tulisi olla negatiivinen ja merkitsevä.",
        timeline: "Testattavissa välittömästi (olemassa oleva data + B2-tutkimuksia ~30 maasta)",
        falsification: "Ei merkitsevää EMF × B2 -interaktiotermiä, tai interaktio on positiivinen",
      },
      {
        id: "NUT-3",
        title: "Paaston kesto ennustaa magnetoreseptiivistä herkkyyttä (käänteinen U)",
        text: "Toista Chae 2019 ruokaorientaatioasetelma asteittaisilla paastoajoilla (4t, 8t, 12t, 16t, 24t). Ennuste: käänteinen U-annosvaste huipulla 8-16t. B2-lisä (25mg) siirtää huippua oikealle. Ruskesilmäisillä koehenkilöillä matalampi kokonaisherkkys mutta sama käyrän muoto.",
        timeline: "Testattavissa 2-4 kuukaudessa (käyttäytymiskoe, N=40 per kesto)",
        falsification: "Monotoninen kasvu (ei laskua 24t kohdalla), tai ei paastovaikutusta, tai B2 ei siirrä huippua",
      },
    ],
    epistemicTitle: "Episteeminen tila",
    epistemicText: "Tämä sivu esittää testattavan hypoteesin (L*-taso). Yksittäiset biokemialliset mekanismit ovat kokeellisesti vahvistettuja (E-taso): FAD stabiloi CRY:tä ([[ref:hirano2017|Hirano 2017]]), FAD vaaditaan magneettiseen herkkyyteen ([[ref:yap2025|Yap 2025]]), AMPK hajottaa CRY1:n ([[ref:lamia2009|Lamia 2009]]), CRY:n orientaatio riippuu kalvokoostumuksesta ([[ref:majewska2025|Majewska 2025]]). Synteesi — että ravitsemustila systemaattisesti säätelee polku B:n tehokkuutta väestötasolla — ei ole suoraan testattu. Kiinan B2-korrelaatio on ekologinen, ei kausaalinen.",
    seeAlso: "Katso myös",
    eyesLink: "Silmien väri ja magnetoreseptio →",
    predictionsLink: "Lukitut ennusteet (NUT-1, NUT-2, NUT-3) →",
    levelLabel: "Näyttötaso",
    bermRelevance: "BERM-merkitys",
    nutrientHeaders: {
      nutrient: "Ravintoaine",
      target: "Kohde CRY-ketjussa",
      deficiency: "Puutosvaikutus",
      source: "Avainlähde",
      level: "Taso",
    },
    predictionHeaders: {
      timeline: "Aikataulu",
      falsification: "Falsifikaatiokriteeri",
    },
  },
  ja: {
    title: "栄養によるCRY調節",
    subtitle: "B2、omega脂肪酸、断食のダイナミクスがcryptochrome機能をどのように制御するか",
    backLink: "← エビデンスに戻る",
    section1Title: "栄養の門",
    section1: [
      "Cryptochromeはchromophoreなしでは機能できない。タンパク質はアンテナだが、FAD――ビタミンB2（riboflavin）の誘導体――が実際に青色光を吸収しradical pairを開始する分子である。FADなしでは、cryptochromeは空の殻として存在する：存在するが磁気的に盲目である。",
      "これは単純だが深遠な予測を生む：ビタミンB2欠乏の集団ではcryptochrome依存的機能が障害されるはずであり、概日リズムの安定性、melatonin産生、そして（BERMが正しければ）磁気受容を介した生殖タイミングが含まれる。",
      "この栄養の門に関するエビデンスは複数の独立した研究ラインから得られている。[[ref:hirano2017|Hirano et al. (2017)]] はFADがマウス肝臓でCRYタンパク質を直接安定化することを示した。Sherrardの研究室 ([[ref:yap2025|Yap et al. 2025]]) は細胞のFADを枯渇させると磁場の方向選択性が完全に消失することを実証した。[[ref:lamia2009|Lamia et al. (2009)]] は断食センサーAMPKがCRY1を能動的に分解し見かけ上のパラドックスを生むことを明らかにした。そして[[ref:majewska2025|Majewska et al. (2025)]] は方向感知に不可欠な膜上でのCRYの配向が脂質組成に依存することを示した。",
      "これらの発見を合わせると、経路Bの3つの栄養制御点が定義される：(1) chromophore装填のためのB2/FAD利用可能性、(2) CRY配向のための膜脂質組成、(3) 断食時のAMPK媒介CRY代謝回転速度。",
    ],
    section2Title: "主要エビデンス",
    section3Title: "栄養モジュレーター",
    section3Sub: "異なるメカニズムでCRY機能を制御する4つの要因。",
    section4Title: "断食パラドックス",
    section4: [
      "エビデンスには明らかな矛盾がある。細胞の栄養センサーであり断食時に活性化するAMPKは、CRY1をリン酸化して分解標的とする ([[ref:lamia2009|Lamia et al. 2009, Science]])。しかし、ヒトの磁気受容を示した唯一の研究は絶食した被験者を用いた ([[ref:chae2019|Chae 2019]])。断食が磁場を感知するまさにそのタンパク質を破壊するなら、どうして磁気受容を強化できるのか？",
      "解決はCRYの質と量の違いにある。断食はAMPK-Ser71-FBXL3経路を介して古いCRY分子を分解する。しかし断食は同時に脂肪酸のbeta酸化を通じて酸化flavoproteinのプールを増加させる――つまりより多くのFADが利用可能になる。細胞が代替CRY分子を合成する際、新鮮なFAD chromophoreがより効率的に装填される。正味の結果：より少ないCRY分子だが、それぞれが磁気受容により良く装備されている。",
      "これは逆U字型の用量反応を予測する：短時間の断食（4-12時間）はCRYの質を改善する；長時間の断食（>24時間）はタンパク質プールを機能的閾値以下に枯渇させる。B2補充はピークを右にシフトさせるはずである。",
      "断食パラドックスの解決はL*レベルの仮説である。個々の生化学的ステップはそれぞれEレベルの確立された事実である。この統合は直接テストされていない。",
    ],
    section5Title: "中国のB2事例",
    section5: [
      "中国は顕著な生態学的相関を示す。中国国民健康調査（CNHS 2015-2017）は、人口全体で90%超のB2不足を認めた。中国では同時に世界で最も急なTFR低下が起きている。これは生態学的相関であって因果的証明ではないが、メカニズムは明確である：B2 → FAD → CRY安定性 → 経路Bの機能。",
      "[[ref:wacker2000|Wacker et al. (2000)]] は、B2欠乏の母親では子癇前症リスクが4.7倍高いことを認めた (OR 4.7, CI 1.8-12.2)。IVFクリニックのデータはB2補充が胚品質指標を改善することを示す。これらは同じ生化学的ボトルネックに収束する独立したエビデンスラインである。",
      "高欠乏集団でのB2補充がCRY依存的な概日マーカーを改善するならば、栄養調節仮説の強いエビデンスとなる。これは予測NUT-2である。",
    ],
    section6Title: "予測",
    section6Lead: "栄養CRY調節仮説から導出された3つのテスト可能な予測。",
    predictions: [
      {
        id: "NUT-1",
        title: "B2補充は夜間EMFに対する概日レジリエンスを改善する",
        text: "RCT：睡眠の質が悪く夜間EMF曝露が高い被験者でB2補充 (25mg/日 x 8週) vs placebo。B2群はFADが充足したCRYがEMF誘発性撹乱に対してより耐性があるため、melatonin onset潜時の短縮と睡眠効率の改善を示すはずである。",
        timeline: "3-6ヶ月以内にテスト可能 (RCT, N=60)",
        falsification: "B2群とplacebo群の間でmelatonin onset潜時や睡眠指標に差がない",
      },
      {
        id: "NUT-2",
        title: "54カ国回帰におけるB2欠乏 x EMF交互作用",
        text: "54カ国EMF-TFR回帰モデルに集団レベルのB2充足度を制御変数として追加する。予測：B2欠乏国はFAD枯渇時にCRYがより脆弱であるため、より強いEMF-TFR関連を示す。交互作用項 (EMF x B2_deficiency) は負で有意であるはずである。",
        timeline: "即座にテスト可能（既存データ + 約30カ国のB2調査）",
        falsification: "有意なEMF x B2交互作用項がない、または交互作用が正",
      },
      {
        id: "NUT-3",
        title: "断食時間が磁気受容感受性を予測する（逆U字型）",
        text: "段階的な断食時間 (4h, 8h, 12h, 16h, 24h) でChae 2019の食物指向パラダイムを再現する。予測：8-16hにピークを持つ逆U字型の用量反応。B2補充 (25mg) がピークを右にシフトする。褐色眼の被験者は全体的感受性が低いが同じカーブ形状を示す。",
        timeline: "2-4ヶ月以内にテスト可能（行動実験、各時間N=40）",
        falsification: "単調増加（24hで低下なし）、断食効果なし、またはB2がピークをシフトしない",
      },
    ],
    epistemicTitle: "認識論的ステータス",
    epistemicText: "このページはテスト可能な仮説（L*レベル）を提示する。個々の生化学的メカニズムは実験的に確認されている（Eレベル）：FADはCRYを安定化する ([[ref:hirano2017|Hirano 2017]])、FADは磁気感受性に必要である ([[ref:yap2025|Yap 2025]])、AMPKはCRY1を分解する ([[ref:lamia2009|Lamia 2009]])、CRYの配向は膜組成に依存する ([[ref:majewska2025|Majewska 2025]])。栄養状態が集団レベルで経路Bの有効性を体系的に調節するという統合は直接テストされていない。中国のB2相関は生態学的であり、因果的ではない。",
    seeAlso: "関連項目",
    eyesLink: "目の色と磁気受容 →",
    predictionsLink: "ロックされた予測 (NUT-1, NUT-2, NUT-3) →",
    levelLabel: "エビデンスレベル",
    bermRelevance: "BERM関連性",
    nutrientHeaders: {
      nutrient: "栄養素",
      target: "CRYチェーンの標的",
      deficiency: "欠乏効果",
      source: "主要出典",
      level: "レベル",
    },
    predictionHeaders: {
      timeline: "タイムライン",
      falsification: "反証基準",
    },
  },
  fr: {
    title: "Modulation nutritionnelle de CRY",
    subtitle: "Comment la B2, les acides gras omega et la dynamique du jeune controlent la fonction du cryptochrome",
    backLink: "← Retour aux preuves",
    section1Title: "La porte nutritionnelle",
    section1: [
      "Le cryptochrome ne peut fonctionner sans son chromophore. La proteine est une antenne, mais le FAD -- un derive de la vitamine B2 (riboflavine) -- est la molecule qui absorbe reellement la lumiere bleue et initie la paire de radicaux. Sans FAD, le cryptochrome existe comme une coquille vide : present mais magnetiquement aveugle.",
      "Cela cree une prediction simple mais profonde : les populations deficientes en vitamine B2 devraient montrer des fonctions alterees dependantes du cryptochrome, y compris la stabilite du rythme circadien, la production de melatonine et (si BERM est correct) le calendrier reproductif medie par la magnetoreception.",
      "Les preuves de cette porte nutritionnelle proviennent de multiples lignes de recherche independantes. [[ref:hirano2017|Hirano et al. (2017)]] ont montre que le FAD stabilise directement les proteines CRY dans le foie de souris. Le laboratoire Sherrard ([[ref:yap2025|Yap et al. 2025]]) a demontre que l'epuisement du FAD cellulaire elimine completement la selectivite directionnelle du champ magnetique. [[ref:lamia2009|Lamia et al. (2009)]] ont revele que le capteur de jeune AMPK degrade activement CRY1, creant un paradoxe apparent. Et [[ref:majewska2025|Majewska et al. (2025)]] ont montre que l'orientation de CRY sur les membranes -- essentielle pour la detection directionnelle -- depend de la composition lipidique.",
      "Ensemble, ces resultats definissent trois points de controle nutritionnel pour la voie B : (1) la disponibilite en B2/FAD pour le chargement du chromophore, (2) la composition lipidique membranaire pour l'orientation de CRY, et (3) le taux de renouvellement de CRY medie par AMPK pendant le jeune.",
    ],
    section2Title: "Preuves cles",
    section3Title: "Modulateurs nutritionnels",
    section3Sub: "Quatre facteurs qui controlent la fonction de CRY par des mecanismes distincts.",
    section4Title: "Le paradoxe du jeune",
    section4: [
      "Il y a une contradiction apparente dans les preuves. AMPK, le capteur nutritionnel de la cellule qui s'active pendant le jeune, phosphoryle CRY1 et le cible pour la degradation ([[ref:lamia2009|Lamia et al. 2009, Science]]). Pourtant, la seule etude montrant une magnetoreception humaine a utilise des sujets a jeun ([[ref:chae2019|Chae 2019]]). Si le jeune detruit la proteine meme qui detecte les champs magnetiques, comment peut-il ameliorer la magnetoreception ?",
      "La resolution reside dans la qualite versus la quantite de CRY. Le jeune degrade effectivement les anciennes molecules de CRY via la voie AMPK-Ser71-FBXL3. Mais le jeune augmente simultanement le pool de flavoproteines oxydees via la beta-oxydation des acides gras -- ce qui signifie que plus de FAD est disponible. Lorsque la cellule synthetise des molecules de CRY de remplacement, elles sont chargees en chromophore FAD frais plus efficacement. Le resultat net : moins de molecules de CRY, mais chacune est mieux equipee pour la magnetoreception.",
      "Cela predit une reponse dose-effet en U inverse : un jeune court (4-12h) ameliore la qualite de CRY ; un jeune prolonge (>24h) epuise le pool proteique en dessous du seuil fonctionnel. La supplementation en B2 devrait decaler le pic vers la droite.",
      "La resolution du paradoxe du jeune est une hypothese de niveau L*. Les etapes biochimiques individuelles sont chacune des faits etablis de niveau E. La synthese n'a pas ete directement testee.",
    ],
    section5Title: "Le cas de la B2 en Chine",
    section5: [
      "La Chine presente une correlation ecologique frappante. L'Enquete nationale de sante chinoise (CNHS 2015-2017) a constate une insuffisance en B2 de plus de 90 % dans la population. La Chine connait simultanement la baisse de TFR la plus forte au monde. Bien qu'il s'agisse d'une correlation ecologique — pas d'une preuve causale — le mecanisme est clair : B2 → FAD → stabilite de CRY → fonction de la voie B.",
      "[[ref:wacker2000|Wacker et al. (2000)]] ont constate que les meres deficientes en B2 avaient un risque de pre-eclampsie 4,7 fois plus eleve (OR 4,7, IC 1,8-12,2). Les donnees de cliniques de FIV montrent que la supplementation en B2 ameliore les indicateurs de qualite embryonnaire. Ce sont des lignes de preuve independantes qui convergent vers le meme goulot d'etranglement biochimique.",
      "Si la supplementation en B2 dans une population a forte deficience ameliorait les marqueurs circadiens dependants de CRY, cela constituerait une preuve solide de l'hypothese de modulation nutritionnelle. C'est la prediction NUT-2.",
    ],
    section6Title: "Predictions",
    section6Lead: "Trois predictions testables derivees de l'hypothese de modulation nutritionnelle de CRY.",
    predictions: [
      {
        id: "NUT-1",
        title: "La supplementation en B2 ameliore la resilience circadienne face aux EMF nocturnes",
        text: "ECR : supplementation en B2 (25mg/jour x 8 semaines) vs placebo chez des sujets ayant une mauvaise qualite de sommeil et une exposition nocturne elevee aux EMF. Le groupe B2 devrait montrer un debut de melatonine plus rapide et une meilleure efficacite du sommeil car le CRY replete en FAD est plus resistant aux perturbations induites par les EMF.",
        timeline: "Testable en 3-6 mois (ECR, N=60)",
        falsification: "Aucune difference dans la latence d'apparition de la melatonine ou les mesures du sommeil entre les groupes B2 et placebo",
      },
      {
        id: "NUT-2",
        title: "Interaction deficience en B2 x EMF dans la regression de 54 pays",
        text: "Ajouter l'adequation en B2 au niveau de la population comme variable de controle au modele de regression EMF-TFR de 54 pays. Prediction : les pays deficients en B2 montrent une association EMF-TFR PLUS FORTE car le CRY est plus vulnerable quand le FAD est epuise. Le terme d'interaction (EMF x B2_deficiency) devrait etre negatif et significatif.",
        timeline: "Testable immediatement (donnees existantes + enquetes B2 d'environ 30 pays)",
        falsification: "Pas de terme d'interaction EMF x B2 significatif, ou interaction positive",
      },
      {
        id: "NUT-3",
        title: "La duree du jeune predit la sensibilite magnetoreceptive (U inverse)",
        text: "Reproduire le paradigme d'orientation alimentaire de Chae 2019 avec des durees de jeune graduees (4h, 8h, 12h, 16h, 24h). Prediction : reponse dose-effet en U inverse avec un pic de sensibilite a 8-16h. La supplementation en B2 (25mg) decale le pic vers la droite. Les sujets aux yeux bruns montrent une sensibilite globale plus faible mais la meme forme de courbe.",
        timeline: "Testable en 2-4 mois (comportemental, N=40 par duree)",
        falsification: "Augmentation monotone (pas de declin a 24h), ou pas d'effet du jeune, ou la B2 ne decale pas le pic",
      },
    ],
    epistemicTitle: "Statut epistemique",
    epistemicText: "Cette page presente une hypothese testable (niveau L*). Les mecanismes biochimiques individuels sont confirmes experimentalement (niveau E) : le FAD stabilise CRY ([[ref:hirano2017|Hirano 2017]]), le FAD est necessaire a la sensibilite magnetique ([[ref:yap2025|Yap 2025]]), AMPK degrade CRY1 ([[ref:lamia2009|Lamia 2009]]), l'orientation de CRY depend de la composition membranaire ([[ref:majewska2025|Majewska 2025]]). La synthese — selon laquelle l'etat nutritionnel module systematiquement l'efficacite de la voie B au niveau de la population — n'a pas ete directement testee. La correlation chinoise avec la B2 est ecologique, pas causale.",
    seeAlso: "Voir aussi",
    eyesLink: "Couleur des yeux et magnetoreception →",
    predictionsLink: "Predictions verrouillees (NUT-1, NUT-2, NUT-3) →",
    levelLabel: "Niveau de preuve",
    bermRelevance: "Pertinence BERM",
    nutrientHeaders: {
      nutrient: "Nutriment",
      target: "Cible dans la chaine CRY",
      deficiency: "Effet de la carence",
      source: "Source cle",
      level: "Niveau",
    },
    predictionHeaders: {
      timeline: "Calendrier",
      falsification: "Critere de falsification",
    },
  },
  ko: {
    title: "영양에 의한 CRY 조절",
    subtitle: "B2, omega 지방산, 단식 역학이 cryptochrome 기능을 어떻게 제어하는가",
    backLink: "← 증거로 돌아가기",
    section1Title: "영양의 문",
    section1: [
      "Cryptochrome은 chromophore 없이는 기능할 수 없다. 단백질은 안테나이지만, FAD -- 비타민 B2(riboflavin)의 유도체 -- 가 실제로 청색광을 흡수하고 radical pair를 시작하는 분자이다. FAD 없이 cryptochrome은 빈 껍데기로 존재한다: 존재하지만 자기적으로 맹목이다.",
      "이것은 단순하지만 심오한 예측을 만든다: 비타민 B2 결핍 인구는 일주기 리듬 안정성, melatonin 생산, 그리고 (BERM이 옳다면) 자기수용 매개 생식 타이밍을 포함한 cryptochrome 의존 기능의 장애를 보여야 한다.",
      "이 영양의 문에 대한 증거는 여러 독립적인 연구 라인에서 나온다. [[ref:hirano2017|Hirano et al. (2017)]]은 FAD가 마우스 간에서 CRY 단백질을 직접 안정화시킨다는 것을 보여주었다. Sherrard 연구실 ([[ref:yap2025|Yap et al. 2025]])은 세포 FAD를 고갈시키면 자기장 방향 선택성이 완전히 제거됨을 입증했다. [[ref:lamia2009|Lamia et al. (2009)]]은 단식 센서 AMPK가 CRY1을 능동적으로 분해하여 명백한 역설을 만든다는 것을 밝혔다. 그리고 [[ref:majewska2025|Majewska et al. (2025)]]은 방향 감지에 필수적인 막에서의 CRY 배향이 지질 조성에 의존함을 보여주었다.",
      "이러한 발견들을 종합하면 경로 B의 3가지 영양 제어점이 정의된다: (1) chromophore 장전을 위한 B2/FAD 가용성, (2) CRY 배향을 위한 막 지질 조성, (3) 단식 중 AMPK 매개 CRY 대사회전 속도.",
    ],
    section2Title: "주요 증거",
    section3Title: "영양 조절자",
    section3Sub: "서로 다른 메커니즘으로 CRY 기능을 제어하는 4가지 요인.",
    section4Title: "단식 역설",
    section4: [
      "증거에 명백한 모순이 있다. 단식 시 활성화되는 세포의 영양 센서인 AMPK는 CRY1을 인산화하여 분해 표적으로 삼는다 ([[ref:lamia2009|Lamia et al. 2009, Science]]). 그러나 인간의 자기수용을 보여준 유일한 연구는 굶은 피험자를 사용했다 ([[ref:chae2019|Chae 2019]]). 단식이 자기장을 감지하는 바로 그 단백질을 파괴한다면 어떻게 자기수용을 향상시킬 수 있는가?",
      "해결은 CRY의 질 대 양의 차이에 있다. 단식은 AMPK-Ser71-FBXL3 경로를 통해 오래된 CRY 분자를 분해한다. 그러나 단식은 동시에 지방산 beta 산화를 통해 산화된 flavoprotein 풀을 증가시킨다 -- 즉 더 많은 FAD가 이용 가능해진다. 세포가 대체 CRY 분자를 합성할 때, 신선한 FAD chromophore가 더 효율적으로 장전된다. 순 결과: 더 적은 CRY 분자이지만 각각이 자기수용에 더 잘 장비된다.",
      "이것은 역 U자형 용량-반응을 예측한다: 짧은 단식 (4-12시간)은 CRY 품질을 개선한다; 연장된 단식 (>24시간)은 단백질 풀을 기능적 역치 아래로 고갈시킨다. B2 보충은 피크를 오른쪽으로 이동시켜야 한다.",
      "단식 역설의 해결은 L* 수준의 가설이다. 개별 생화학적 단계는 각각 E 수준의 확립된 사실이다. 이 종합은 직접 테스트되지 않았다.",
    ],
    section5Title: "중국 B2 사례",
    section5: [
      "중국은 두드러진 생태학적 상관관계를 보여준다. 중국 국민건강조사(CNHS 2015-2017)는 인구 전반에서 90% 이상의 B2 부족을 발견했다. 중국은 동시에 세계에서 가장 가파른 TFR 감소를 보인다. 이는 생태학적 상관관계이지 인과적 증거는 아니지만, 메커니즘은 명확하다: B2 → FAD → CRY 안정성 → 경로 B 기능.",
      "[[ref:wacker2000|Wacker et al. (2000)]]은 B2 결핍 어머니가 4.7배 더 높은 전자간증 위험을 보였다고 보고했다 (OR 4.7, CI 1.8-12.2). IVF 클리닉 데이터는 B2 보충이 배아 품질 지표를 개선함을 보여준다. 이는 동일한 생화학적 병목으로 수렴하는 독립적인 증거선이다.",
      "고결핍 인구에서 B2 보충이 CRY 의존적 일주기 마커를 개선한다면, 영양 조절 가설의 강력한 증거가 될 것이다. 이것이 예측 NUT-2이다.",
    ],
    section6Title: "예측",
    section6Lead: "영양 CRY 조절 가설에서 도출된 3가지 테스트 가능한 예측.",
    predictions: [
      {
        id: "NUT-1",
        title: "B2 보충이 야간 EMF에 대한 일주기 회복력을 개선한다",
        text: "RCT: 수면의 질이 나쁘고 야간 EMF 노출이 높은 피험자에서 B2 보충 (25mg/일 x 8주) vs placebo. FAD가 충족된 CRY가 EMF 유발 교란에 더 저항력이 있으므로 B2 그룹은 더 빠른 melatonin onset과 더 나은 수면 효율을 보여야 한다.",
        timeline: "3-6개월 내 테스트 가능 (RCT, N=60)",
        falsification: "B2 그룹과 placebo 그룹 간 melatonin onset 잠복기 또는 수면 지표에 차이 없음",
      },
      {
        id: "NUT-2",
        title: "54개국 회귀에서 B2 결핍 x EMF 상호작용",
        text: "54개국 EMF-TFR 회귀 모델에 인구 수준 B2 충족도를 통제 변수로 추가한다. 예측: B2 결핍 국가는 FAD 고갈 시 CRY가 더 취약하므로 더 강한 EMF-TFR 연관을 보인다. 상호작용 항 (EMF x B2_deficiency)은 음수이고 유의해야 한다.",
        timeline: "즉시 테스트 가능 (기존 데이터 + 약 30개국 B2 조사)",
        falsification: "유의한 EMF x B2 상호작용 항 없음, 또는 상호작용이 양수",
      },
      {
        id: "NUT-3",
        title: "단식 시간이 자기수용 감수성을 예측한다 (역 U자형)",
        text: "단계적 단식 시간 (4h, 8h, 12h, 16h, 24h)으로 Chae 2019 음식 방향 패러다임을 재현한다. 예측: 8-16h에서 피크를 가진 역 U자형 용량 반응. B2 보충 (25mg)이 피크를 오른쪽으로 이동시킨다. 갈색 눈 피험자는 전체 감수성은 낮지만 동일한 곡선 형태를 보인다.",
        timeline: "2-4개월 내 테스트 가능 (행동 실험, 시간당 N=40)",
        falsification: "단조 증가 (24h에서 감소 없음), 단식 효과 없음, 또는 B2가 피크를 이동시키지 않음",
      },
    ],
    epistemicTitle: "인식론적 상태",
    epistemicText: "이 페이지는 테스트 가능한 가설 (L* 수준)을 제시한다. 개별 생화학적 메커니즘은 실험적으로 확인되었다(E 수준): FAD는 CRY를 안정화하고 ([[ref:hirano2017|Hirano 2017]]), FAD는 자기 민감성에 필요하며 ([[ref:yap2025|Yap 2025]]), AMPK는 CRY1을 분해하고 ([[ref:lamia2009|Lamia 2009]]), CRY 배향은 막 조성에 의존한다 ([[ref:majewska2025|Majewska 2025]]). 영양 상태가 인구 수준에서 경로 B의 효과를 체계적으로 조절한다는 종합은 직접 테스트되지 않았다. 중국 B2 상관관계는 생태학적이며 인과적이지 않다.",
    seeAlso: "관련 항목",
    eyesLink: "눈 색깔과 자기수용 →",
    predictionsLink: "잠긴 예측 (NUT-1, NUT-2, NUT-3) →",
    levelLabel: "증거 수준",
    bermRelevance: "BERM 관련성",
    nutrientHeaders: {
      nutrient: "영양소",
      target: "CRY 체인의 표적",
      deficiency: "결핍 효과",
      source: "주요 출처",
      level: "수준",
    },
    predictionHeaders: {
      timeline: "타임라인",
      falsification: "반증 기준",
    },
  },
} as const;

const NUTRIENT_CARDS = EVIDENCE_CARDS.filter((c) =>
  NUTRITION_CARD_IDS.includes(c.id)
);

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

export default async function NutritionPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const d = pickCopy(COPY, locale);

  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <Link
        href={`/${locale}/evidence`}
        className="text-sm text-accent hover:underline mb-6 inline-block"
      >
        {d.backLink}
      </Link>

      <PageHeader icon={Apple} title={d.title} subtitle={d.subtitle} />

      {/* Section 1: The Nutritional Gate */}
      <section className="mb-16">
        <h2 className="editorial-section-heading mb-6">{d.section1Title}</h2>
        <div className="space-y-4 text-[0.95rem] leading-relaxed text-foreground max-w-3xl">
          {d.section1.map((paragraph, i) => (
            <p key={i}>
              <InlineReferenceText text={paragraph} locale={locale} />
            </p>
          ))}
        </div>
      </section>

      {/* Section 2: Key Evidence */}
      <section className="mb-16 border-t editorial-rule pt-6">
        <h2 className="editorial-section-heading mb-6">{d.section2Title}</h2>
        <div className="space-y-6">
          {NUTRIENT_CARDS.map((card, i) => {
            const levelColor =
              CHAIN_EPISTEMIC_COLORS[
                card.level as keyof typeof CHAIN_EPISTEMIC_COLORS
              ] ?? "#6B7280";
            const levelInfo = EPISTEMIC_LEVELS[card.level];
            return (
              <article
                key={card.id}
                className="rounded-lg border border-card-border bg-card-bg p-5"
              >
                <div className="flex items-start gap-4">
                  <span className="text-sm font-mono text-foreground-muted mt-0.5 shrink-0">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-foreground">
                      {pickField(card, "title", locale)}
                    </h3>
                    <p
                      className="text-xs font-medium mt-1 px-2 py-0.5 rounded-full inline-block"
                      style={{
                        color: levelColor,
                        backgroundColor: `${levelColor}15`,
                      }}
                    >
                      {card.level}
                      {levelInfo &&
                        ` — ${pickField(levelInfo, "label", locale)}`}
                    </p>
                    <p className="text-sm text-foreground-muted mt-2">
                      {card.referenceId ? (
                        <StudyCitation
                          referenceId={card.referenceId}
                          locale={locale}
                          label={`${card.authors} (${card.year}). ${card.journal}.`}
                        />
                      ) : (
                        <>
                          {card.authors} ({card.year}). <em>{card.journal}</em>
                          {card.doi && <>. DOI: {card.doi}</>}
                        </>
                      )}
                    </p>
                    <p className="text-sm text-foreground-muted mt-1">
                      <span className="text-xs font-medium">
                        {d.levelLabel}: {card.level}
                      </span>
                    </p>
                    <p className="mt-3 text-sm text-foreground leading-relaxed">
                      {pickField(card, "finding", locale)}
                    </p>
                    {(card.berm_relevance_en || card.berm_relevance_fi) && (
                      <>
                        <p className="mt-2 text-xs font-semibold text-accent uppercase tracking-wider">
                          {d.bermRelevance}
                        </p>
                        <p className="text-sm text-foreground-muted leading-relaxed">
                          {pickField(card, "berm_relevance", locale)}
                        </p>
                      </>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* Section 3: Nutritional Modulators Table */}
      <section className="mb-16 border-t editorial-rule pt-6">
        <h2 className="editorial-section-heading mb-2">{d.section3Title}</h2>
        <p className="text-sm text-foreground-muted mb-6">{d.section3Sub}</p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-card-border">
                <th className="text-left p-3 font-semibold text-foreground">
                  {d.nutrientHeaders.nutrient}
                </th>
                <th className="text-left p-3 font-semibold text-foreground">
                  {d.nutrientHeaders.target}
                </th>
                <th className="text-left p-3 font-semibold text-foreground">
                  {d.nutrientHeaders.deficiency}
                </th>
                <th className="text-left p-3 font-semibold text-foreground">
                  {d.nutrientHeaders.source}
                </th>
              </tr>
            </thead>
            <tbody>
              {NUTRITIONAL_MODULATORS.map((mod) => (
                <tr
                  key={mod.nutrient}
                  className="border-b border-card-border/50"
                >
                  <td className="p-3 font-medium text-foreground whitespace-nowrap">
                    {mod.nutrient}
                  </td>
                  <td className="p-3 text-foreground-muted">{mod.target}</td>
                  <td className="p-3 text-foreground-muted">
                    {pickField(mod, "deficiency_effect", locale)}
                  </td>
                  <td className="p-3 text-foreground-muted whitespace-nowrap">
                    {mod.referenceIds?.length
                      ? mod.referenceIds.map((referenceId, index) => (
                          <span key={referenceId}>
                            {index > 0 ? ", " : null}
                            <StudyCitation referenceId={referenceId} locale={locale} />
                          </span>
                        ))
                      : mod.key_source}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Section 4: The Fasting Paradox */}
      <section className="mb-16 border-t editorial-rule pt-6">
        <h2 className="editorial-section-heading mb-6">{d.section4Title}</h2>
        <div className="space-y-4 text-[0.95rem] leading-relaxed text-foreground max-w-3xl">
          {d.section4.map((paragraph, i) => (
            <p key={i}>
              <InlineReferenceText text={paragraph} locale={locale} />
            </p>
          ))}
        </div>
      </section>

      {/* Section 5: China B2 Case */}
      <section className="mb-16 border-t editorial-rule pt-6">
        <h2 className="editorial-section-heading mb-6">{d.section5Title}</h2>
        <div className="space-y-4 text-[0.95rem] leading-relaxed text-foreground max-w-3xl">
          {d.section5.map((paragraph, i) => (
            <p key={i}>
              <InlineReferenceText text={paragraph} locale={locale} />
            </p>
          ))}
        </div>
      </section>

      {/* Section 6: Predictions */}
      <section className="mb-16 border-t editorial-rule pt-6">
        <h2 className="editorial-section-heading mb-2">{d.section6Title}</h2>
        <p className="text-sm text-foreground-muted mb-6 max-w-3xl">
          {d.section6Lead}
        </p>
        <div className="space-y-6">
          {d.predictions.map((pred) => (
            <article
              key={pred.id}
              className="rounded-lg border border-card-border bg-card-bg p-5"
            >
              <h3 className="font-semibold text-foreground">
                <span className="text-accent font-mono text-sm mr-2">
                  {pred.id}
                </span>
                {pred.title}
              </h3>
              <p className="text-xs font-medium mt-1 px-2 py-0.5 rounded-full inline-block text-amber-500 bg-amber-500/10">
                LOCKED — awaiting test
              </p>
              <p className="mt-3 text-sm text-foreground leading-relaxed">
                {pred.text}
              </p>
              <p className="mt-2 text-sm text-foreground-muted">
                <span className="font-semibold text-xs">
                  {d.predictionHeaders.timeline}:
                </span>{" "}
                {pred.timeline}
              </p>
              <p className="mt-1 text-sm text-foreground-muted">
                <span className="font-semibold text-xs">
                  {d.predictionHeaders.falsification}:
                </span>{" "}
                {pred.falsification}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* Epistemic Status */}
      <div className="text-sm text-foreground-muted border-t editorial-rule pt-6 mb-16 max-w-3xl">
        <h2 className="font-semibold text-foreground mb-2">
          {d.epistemicTitle}
        </h2>
        <p className="leading-relaxed">
          <InlineReferenceText text={d.epistemicText} locale={locale} />
        </p>
      </div>

      {/* See Also */}
      <div className="flex flex-col sm:flex-row gap-3">
        <Link
          href={`/${locale}/evidence/eyes`}
          className="rounded-lg border border-accent/20 bg-card-bg px-4 py-3 text-accent hover:underline font-semibold text-sm"
        >
          {d.eyesLink}
        </Link>
        <Link
          href={`/${locale}/predictions`}
          className="rounded-lg border border-accent/20 bg-card-bg px-4 py-3 text-accent hover:underline font-semibold text-sm"
        >
          {d.predictionsLink}
        </Link>
      </div>
    </div>
  );
}
