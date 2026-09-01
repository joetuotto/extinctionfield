import type { Metadata } from "next";
import Link from "next/link";
import { Brain } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { CitationLink } from "@/components/CitationLink";
import { pickCopy } from "@/lib/i18n";

const COPY = {
  en: {
    title: "Hypothalamus (Arcuate Nucleus)",
    subtitle:
      "VGCC-mediated Ca²⁺ signaling in ARC glia and neurons: selective amplification of hunger signaling",
    backLink: "← Back to Modulome",

    /* --- SECTION 1: Channel Profile --- */
    s1SectionTitle: "Arcuate Nucleus as EMF Target",

    /* 01 Channel Profile */
    channelProfile: "Channel Profile",
    channel: "Channel",
    gene: "Gene",
    cellType: "Cell type",
    function: "Function",
    level: "Evidence level",
    channelVal: "VGCC (glia + neurons)",
    geneVal: "CACNA1C / CACNA1H (multiple subtypes)",
    cellTypeVal: "ARC astrocytes (glia), AgRP/NPY neurons, POMC neurons",
    functionVal:
      "Appetite regulation via glial Ca²⁺ → neuronal excitation in arcuate nucleus",
    levelVal: "E",

    /* 02 Mechanism */
    s2Title: "Appetite Regulation Mechanism",
    s2Chain:
      "EMF → VGCC activation → Ca²⁺ ↑ in ARC glia → AgRP/NPY neuron excitation → hunger signal ↑",
    s2p1:
      "The arcuate nucleus (ARC) of the hypothalamus is the brain's primary appetite regulation center. It contains two opposing neuronal populations: AgRP/NPY neurons (orexigenic — promote hunger) and POMC neurons (anorexigenic — promote satiety). Both populations are modulated by surrounding astrocytes (glia) through Ca²⁺-dependent signaling.",
    s2p2:
      "Ca²⁺ activation of ARC glia selectively excites AgRP/NPY neurons, increasing appetite drive. POMC neurons receive balanced excitatory and inhibitory input from the same glial Ca²⁺ signal, resulting in no net change in satiety signaling. The result is a selective amplification of hunger signaling without a corresponding increase in satiety — a net shift toward increased food intake.",
    s2p3:
      "This asymmetry is critical: EMF-induced VGCC activation in ARC glia does not simply increase all hypothalamic activity. It specifically tips the hunger/satiety balance toward hunger by preferentially exciting the orexigenic pathway. The hypothalamus integrates energy homeostasis through this glia-neuron Ca²⁺ signaling network, making it a specific target for EMF-induced metabolic disruption.",

    /* --- SECTION 2: Evidence --- */
    s2SectionTitle: "Key Evidence",

    /* 03 Chen 2016 */
    s3Title: "Chen et al. 2016 (eLife)",
    s3p1:
      "Chen et al. (2016) demonstrated the direct Ca²⁺ → appetite link in vivo. Using optogenetic and chemogenetic tools in mice, they showed that activation of astrocytes in the medial basal hypothalamus (which includes the ARC) directly modulated feeding behavior through Ca²⁺-dependent mechanisms. This study provides the mechanistic foundation: glial Ca²⁺ signaling in the hypothalamus is sufficient to alter appetite.",
    s3p2:
      "Yang et al. (2015) further showed that astrocyte stimulation in the medial basal hypothalamus reduced ghrelin-evoked food intake via adenosine A1 receptors (A1R). This demonstrates bidirectional glial control of appetite — the direction depends on which signaling pathways are engaged. The BERM mechanism predicts that EMF-induced Ca²⁺ elevation preferentially engages the excitatory (hunger-promoting) pathway via AgRP/NPY neurons.",

    /* 04 Alshammari 2022 */
    s4Title: "Alshammari 2022 (PMC8777647)",
    s4p1:
      "Alshammari (2022) documented RF-EMF effects on food intake in humans, providing epidemiological evidence for the EMF → appetite link. This study connects the mechanistic pathway (VGCC → Ca²⁺ → ARC glia → appetite) to observable human outcomes.",

    /* --- SECTION 3: Clinical Parallel --- */
    s3SectionTitle: "Clinical Parallel & Context",

    /* 05 GLP-1 / Ozempic */
    s5Title: "GLP-1 Agonists (Semaglutide / Ozempic)",
    s5p1:
      "GLP-1 receptor agonists such as semaglutide (Ozempic/Wegovy) suppress appetite by acting on the same arcuate nucleus target. GLP-1 agonists reduce AgRP/NPY neuron activity and enhance POMC neuron signaling — the exact opposite direction to the EMF-induced Ca²⁺ effect described above.",
    s5p2:
      "This pharmacological parallel is significant: the same neural circuit that GLP-1 agonists therapeutically suppress is the circuit that EMF-induced Ca²⁺ elevation may chronically activate. Same target, opposite direction. The clinical success of GLP-1 agonists in reducing appetite and body weight validates the ARC as a critical node in appetite regulation and confirms that modulating this circuit produces substantial metabolic effects.",

    /* 06 Multifactorial caveat */
    s6Title: "Multifactorial Context",
    s6p1:
      "Obesity is a multifactorial condition driven by genetics, diet composition, physical activity, gut microbiome, socioeconomic factors, sleep patterns, stress, and endocrine disruptors. The BERM framework identifies EMF-induced hypothalamic Ca²⁺ dysregulation as ONE contributing factor — not the sole cause.",
    s6Points: [
      "The hypothalamus is a TARGET of EMF-induced Ca²⁺ changes, contributing to appetite dysregulation as one factor among many",
      "Population-level obesity trends have multiple drivers; EMF exposure may act as a previously unrecognized amplifier of hunger signaling",
      "The mechanism is specific and testable: VGCC → Ca²⁺ → ARC glia → AgRP/NPY → appetite, with evidence level E (direct Ca²⁺ → appetite verified in vivo)",
      "This does not replace established obesity risk factors — it adds a mechanistically grounded, VGCC-mediated pathway to the existing multifactorial model",
    ],

    /* References */
    references: "Key References",
    refs: [
      {
        id: "chen-2016-elife-ca-appetite",
        citation: "Chen et al. 2016 (eLife)",
        referenceId: "chen2016_glia",
        finding:
          "Demonstrated direct Ca²⁺ → appetite link in vivo. Astrocyte activation in medial basal hypothalamus modulated feeding behavior through Ca²⁺-dependent mechanisms in mice.",
      },
      {
        id: "alshammari-2022-rf-emf-food-intake",
        citation: "Alshammari 2022 (PMC8777647)",
        referenceId: "alshammari2022",
        finding:
          "RF-EMF effects on food intake documented in humans, connecting the VGCC → Ca²⁺ → appetite mechanistic pathway to observable human outcomes.",
      },
      {
        id: "yang-2015-astrocyte-ghrelin",
        citation: "Yang et al. 2015",
        referenceId: "yang2015_astro",
        finding:
          "Astrocyte stimulation in medial basal hypothalamus reduced ghrelin-evoked food intake via adenosine A1R, demonstrating bidirectional glial control of appetite in the hypothalamus.",
      },
    ],

    clinicalParallelLabel: "Clinical parallel",

    /* See also */
    seeAlso: "See also",
    modulomeOverview: "Modulome overview",
    brainModulome: "Brain modulome",
    pancreasModulome: "Pancreas modulome",
    modelPage: "Model — CaMKII convergence",
  },
  fi: {
    title: "Hypotalamus (nucleus arcuatus)",
    subtitle:
      "VGCC-välitteinen Ca²⁺-signalointi ARC:n glia- ja hermosoluissa: nälänsignaloinnin selektiivinen vahvistuminen",
    backLink: "← Takaisin moduloomiin",

    /* --- OSIO 1: Kanavaprofiili --- */
    s1SectionTitle: "Nucleus arcuatus EMF-kohteena",

    /* 01 Kanavaprofiili */
    channelProfile: "Kanavaprofiili",
    channel: "Kanava",
    gene: "Geeni",
    cellType: "Solutyyppi",
    function: "Toiminto",
    level: "Näyttötaso",
    channelVal: "VGCC (glia + hermosolut)",
    geneVal: "CACNA1C / CACNA1H (useita alatyyppejä)",
    cellTypeVal: "ARC:n astrosyytit (glia), AgRP/NPY-neuronit, POMC-neuronit",
    functionVal:
      "Ruokahalun säätely gliaalisen Ca²⁺-signaloinnin kautta nucleus arcuatuksessa",
    levelVal: "E",

    /* 02 Mekanismi */
    s2Title: "Ruokahalun säätelymekanismi",
    s2Chain:
      "EMF → VGCC-aktivaatio → Ca²⁺ ↑ ARC:n gliassa → AgRP/NPY-neuronien eksitaatio → nälänsignaali ↑",
    s2p1:
      "Hypotalamuksen nucleus arcuatus (ARC) on aivojen ensisijainen ruokahalun säätelykeskus. Se sisältää kaksi vastakkaista neuronipopulaatiota: AgRP/NPY-neuronit (oreksigeeniset — lisäävät nälkää) ja POMC-neuronit (anoreksigeeniset — edistävät kylläisyyttä). Molempia populaatioita säätelevät ympäröivät astrosyytit (glia) Ca²⁺-riippuvaisen signaloinnin kautta.",
    s2p2:
      "ARC:n glian Ca²⁺-aktivaatio eksitoi selektiivisesti AgRP/NPY-neuroneja, lisäten ruokahalun ajuria. POMC-neuronit saavat tasapainotetun eksitatorisen ja inhibitorisen syötteen samasta gliaalisesta Ca²⁺-signaalista, mikä ei tuota nettovaikutusta kylläisyyssignalointiin. Tuloksena on nälänsignaloinnin selektiivinen vahvistuminen ilman vastaavaa kylläisyyden lisäystä — nettosiirtymä kohti lisääntynyttä ravinnonsaantia.",
    s2p3:
      "Tämä asymmetria on kriittinen: EMF-aiheutettu VGCC-aktivaatio ARC:n gliassa ei yksinkertaisesti lisää kaikkea hypotalamuksen aktiivisuutta. Se kallistaa nälän/kylläisyyden tasapainon erityisesti nälän suuntaan eksitoimalla preferentiaalisesti oreksigeenistä reittiä. Hypotalamus integroi energiahomeostaasia tämän glia-neuroni Ca²⁺-signalointiverkoston kautta, mikä tekee siitä tarkan kohteen EMF-indusoidulle metaboliselle häiriölle.",

    /* --- OSIO 2: Näyttö --- */
    s2SectionTitle: "Keskeinen näyttö",

    /* 03 Chen 2016 */
    s3Title: "Chen ym. 2016 (eLife)",
    s3p1:
      "Chen ym. (2016) osoittivat suoran Ca²⁺ → ruokahalu -yhteyden in vivo. Käyttäen optogeneettisiä ja kemogeneettisiä työkaluja hiirissä he näyttivät, että astrosyyttien aktivaatio mediaalisessa basaalihypotalamuksessa (joka sisältää ARC:n) säätelee suoraan syömiskäyttäytymistä Ca²⁺-riippuvaisten mekanismien kautta. Tämä tutkimus tarjoaa mekanistisen perustan: gliaalinen Ca²⁺-signalointi hypotalamuksessa riittää muuttamaan ruokahalua.",
    s3p2:
      "Yang ym. (2015) osoittivat lisäksi, että astrosyyttistimulaatio mediaalisessa basaalihypotalamuksessa vähensi greliinin laukaisemaa ravinnonsaantia adenosiini A1 -reseptorien (A1R) kautta. Tämä osoittaa glian kaksisuuntaisen ruokahalun säätelyn — suunta riippuu siitä, mitkä signalointireitit aktivoituvat. BERM-mekanismi ennustaa, että EMF-aiheutettu Ca²⁺-nousu aktivoi preferentiaalisesti eksitatorisen (nälkää edistävän) reitin AgRP/NPY-neuronien kautta.",

    /* 04 Alshammari 2022 */
    s4Title: "Alshammari 2022 (PMC8777647)",
    s4p1:
      "Alshammari (2022) dokumentoi RF-EMF:n vaikutukset ravinnonsaantiin ihmisillä, tarjoten epidemiologisen näytön EMF → ruokahalu -yhteydelle. Tämä tutkimus yhdistää mekanistisen reitin (VGCC → Ca²⁺ → ARC:n glia → ruokahalu) havaittaviin ihmisvasteisiin.",

    /* --- OSIO 3: Kliininen rinnakkaisuus & konteksti --- */
    s3SectionTitle: "Kliininen rinnakkaisuus ja konteksti",

    /* 05 GLP-1 / Ozempic */
    s5Title: "GLP-1-agonistit (semaglutiidi / Ozempic)",
    s5p1:
      "GLP-1-reseptoriagonistit kuten semaglutiidi (Ozempic/Wegovy) hillitsevät ruokahalua vaikuttamalla samaan nucleus arcuatus -kohteeseen. GLP-1-agonistit vähentävät AgRP/NPY-neuronien aktiivisuutta ja tehostavat POMC-neuronien signalointia — täsmälleen päinvastainen suunta kuin yllä kuvattu EMF-aiheutettu Ca²⁺-vaikutus.",
    s5p2:
      "Tämä farmakologinen rinnakkaisuus on merkittävä: sama hermopiiri, jota GLP-1-agonistit terapeuttisesti vaimentavat, on piiri jonka EMF-aiheutettu Ca²⁺-nousu voi kroonisesti aktivoida. Sama kohde, vastakkainen suunta. GLP-1-agonistien kliininen menestys ruokahalun ja painon vähentämisessä validoi ARC:n kriittiisenä solmuna ruokahalun säätelyssä ja vahvistaa, että tämän piirin modulointi tuottaa merkittäviä metabolisia vaikutuksia.",

    /* 06 Monitekijäinen konteksti */
    s6Title: "Monitekijäinen konteksti",
    s6p1:
      "Lihavuus on monitekijäinen tila, jota ohjaavat genetiikka, ruokavalion koostumus, fyysinen aktiivisuus, suolistomikrobiomi, sosioekonomiset tekijät, unitottumukset, stressi ja endokriiniset häiriötekijät. BERM-kehys tunnistaa EMF-indusoidun hypotalamuksen Ca²⁺-dysregulaation YHTENÄ myötävaikuttavana tekijänä — ei ainoana syynä.",
    s6Points: [
      "Hypotalamus on EMF-aiheutettujen Ca²⁺-muutosten KOHDE, joka myötävaikuttaa ruokahalun dysregulaatioon yhtenä tekijänä monien joukossa",
      "Väestötason lihavuustrendeillä on useita ajureita; EMF-altistus voi toimia aiemmin tunnistamattomana nälänsignaloinnin vahvistajana",
      "Mekanismi on tarkka ja testattava: VGCC → Ca²⁺ → ARC:n glia → AgRP/NPY → ruokahalu, näyttötasolla E (suora Ca²⁺ → ruokahalu vahvistettu in vivo)",
      "Tämä ei korvaa vakiintuneita lihavuuden riskitekijöitä — se lisää mekanistisesti perustellun, VGCC-välitteisen reitin olemassa olevaan monitekijäiseen malliin",
    ],

    /* Viitteet */
    references: "Keskeiset viitteet",
    refs: [
      {
        id: "chen-2016-elife-ca-appetite",
        citation: "Chen ym. 2016 (eLife)",
        referenceId: "chen2016_glia",
        finding:
          "Osoitti suoran Ca²⁺ → ruokahalu -yhteyden in vivo. Astrosyyttien aktivaatio mediaalisessa basaalihypotalamuksessa säätelee syömiskäyttäytymistä Ca²⁺-riippuvaisten mekanismien kautta hiirissä.",
      },
      {
        id: "alshammari-2022-rf-emf-food-intake",
        citation: "Alshammari 2022 (PMC8777647)",
        referenceId: "alshammari2022",
        finding:
          "RF-EMF:n vaikutukset ravinnonsaantiin dokumentoitu ihmisillä, yhdistäen VGCC → Ca²⁺ → ruokahalu -mekanistisen reitin havaittaviin ihmisvasteisiin.",
      },
      {
        id: "yang-2015-astrocyte-ghrelin",
        citation: "Yang ym. 2015",
        referenceId: "yang2015_astro",
        finding:
          "Astrosyyttistimulaatio mediaalisessa basaalihypotalamuksessa vähensi greliinin laukaisemaa ravinnonsaantia adenosiini A1R:n kautta, osoittaen glian kaksisuuntaisen ruokahalun säätelyn hypotalamuksessa.",
      },
    ],

    clinicalParallelLabel: "Kliininen rinnakkaisuus",

    /* Katso myös */
    seeAlso: "Katso myös",
    modulomeOverview: "Moduloomin yleiskatsaus",
    brainModulome: "Aivojen moduloomi",
    pancreasModulome: "Haiman moduloomi",
    modelPage: "Malli — CaMKII-yhdentyminen",
  },
  ja: {
    title: "視床下部（弓状核）",
    subtitle:
      "ARC グリアおよびニューロンにおけるVGCC媒介Ca²⁺シグナリング：空腹シグナルの選択的増幅",
    backLink: "← モジュロームに戻る",

    s1SectionTitle: "EMF標的としての弓状核",

    channelProfile: "チャネルプロファイル",
    channel: "チャネル",
    gene: "遺伝子",
    cellType: "細胞種",
    function: "機能",
    level: "エビデンスレベル",
    channelVal: "VGCC（グリア + ニューロン）",
    geneVal: "CACNA1C / CACNA1H（複数サブタイプ）",
    cellTypeVal: "ARCアストロサイト（グリア）、AgRP/NPYニューロン、POMCニューロン",
    functionVal:
      "弓状核におけるグリアCa²⁺ → 神経興奮を介した食欲調節",
    levelVal: "E",

    s2Title: "食欲調節メカニズム",
    s2Chain:
      "EMF → VGCC活性化 → ARCグリアのCa²⁺ ↑ → AgRP/NPYニューロン興奮 → 空腹シグナル ↑",
    s2p1:
      "視床下部の弓状核（ARC）は脳の主要な食欲調節センターである。2つの対立するニューロン集団を含む：AgRP/NPYニューロン（食欲促進性——空腹を促進）とPOMCニューロン（食欲抑制性——満腹を促進）。両集団はCa²⁺依存性シグナリングを通じて周囲のアストロサイト（グリア）により調節される。",
    s2p2:
      "ARCグリアのCa²⁺活性化はAgRP/NPYニューロンを選択的に興奮させ、食欲駆動を増加させる。POMCニューロンは同一のグリアCa²⁺シグナルから均衡した興奮性・抑制性入力を受け、満腹シグナリングの正味変化は生じない。結果は、対応する満腹増加を伴わない空腹シグナリングの選択的増幅——食物摂取増加への正味シフトである。",
    s2p3:
      "この非対称性は重要である：ARCグリアにおけるEMF誘導VGCC活性化は単に視床下部全体の活動を増加させるのではない。食欲促進経路を優先的に興奮させることで空腹/満腹バランスを特異的に空腹側に傾ける。視床下部はこのグリア-ニューロンCa²⁺シグナリングネットワークを通じてエネルギー恒常性を統合しており、EMF誘導代謝障害の特異的標的となる。",

    s2SectionTitle: "主要エビデンス",

    s3Title: "Chen et al. 2016（eLife）",
    s3p1:
      "Chen et al.（2016）はin vivoで直接的Ca²⁺ → 食欲の連関を実証した。マウスで光遺伝学的・化学遺伝学的ツールを用いて、内側基底視床下部（ARCを含む）のアストロサイト活性化がCa²⁺依存メカニズムを通じて摂食行動を直接調節することを示した。この研究はメカニズム的基盤を提供する：視床下部におけるグリアCa²⁺シグナリングは食欲を変化させるのに十分である。",
    s3p2:
      "Yang et al.（2015）はさらに、内側基底視床下部のアストロサイト刺激がアデノシンA1受容体（A1R）を介してグレリン誘発食物摂取を減少させることを示した。これはグリアによる食欲の双方向制御を実証する——方向はどのシグナリング経路が関与するかに依存する。BERMメカニズムはEMF誘導Ca²⁺上昇がAgRP/NPYニューロンを介した興奮性（空腹促進）経路を優先的に活性化すると予測する。",

    s4Title: "Alshammari 2022（PMC8777647）",
    s4p1:
      "Alshammari（2022）はヒトにおけるRF-EMFの食物摂取への影響を記録し、EMF → 食欲連関の疫学的エビデンスを提供した。この研究はメカニズム経路（VGCC → Ca²⁺ → ARCグリア → 食欲）を観察可能なヒトの結果に結びつける。",

    s3SectionTitle: "臨床的平行と文脈",

    s5Title: "GLP-1アゴニスト（セマグルチド / Ozempic）",
    s5p1:
      "セマグルチド（Ozempic/Wegovy）などのGLP-1受容体アゴニストは同じ弓状核標的に作用して食欲を抑制する。GLP-1アゴニストはAgRP/NPYニューロン活動を減少させPOMCニューロンシグナリングを増強する——上述のEMF誘導Ca²⁺効果と正確に逆方向。",
    s5p2:
      "この薬理学的平行は重要である：GLP-1アゴニストが治療的に抑制する同じ神経回路は、EMF誘導Ca²⁺上昇が慢性的に活性化する可能性のある回路である。同じ標的、逆方向。GLP-1アゴニストの食欲・体重減少における臨床的成功はARCを食欲調節の重要ノードとして検証し、この回路の調節が実質的な代謝効果を産出することを確認する。",

    s6Title: "多因子的文脈",
    s6p1:
      "肥満は遺伝、食事組成、身体活動、腸内細菌叢、社会経済的要因、睡眠パターン、ストレス、内分泌撹乱物質により駆動される多因子的状態である。BERMフレームワークはEMF誘導視床下部Ca²⁺調節異常を一つの寄与因子として同定する——唯一の原因ではない。",
    s6Points: [
      "視床下部はEMF誘導Ca²⁺変化の標的であり、多くの要因の一つとして食欲調節異常に寄与する",
      "集団レベルの肥満傾向には複数の駆動因子がある；EMF曝露はこれまで認識されていなかった空腹シグナリング増幅器として作用しうる",
      "メカニズムは特異的で検証可能：VGCC → Ca²⁺ → ARCグリア → AgRP/NPY → 食欲、エビデンスレベルE（直接的Ca²⁺ → 食欲がin vivoで検証済み）",
      "これは確立された肥満リスク因子を置き換えない——既存の多因子モデルにメカニズム的に根拠のあるVGCC媒介経路を追加する",
    ],

    references: "主要参考文献",
    refs: [
      {
        id: "chen-2016-elife-ca-appetite",
        citation: "Chen et al. 2016 (eLife)",
        referenceId: "chen2016_glia",
        finding:
          "in vivoで直接的Ca²⁺ → 食欲の連関を実証。マウスにおいて内側基底視床下部のアストロサイト活性化がCa²⁺依存メカニズムを通じて摂食行動を調節。",
      },
      {
        id: "alshammari-2022-rf-emf-food-intake",
        citation: "Alshammari 2022 (PMC8777647)",
        referenceId: "alshammari2022",
        finding:
          "ヒトにおけるRF-EMFの食物摂取への影響を記録し、VGCC → Ca²⁺ → 食欲のメカニズム経路を観察可能なヒトの結果に結びつけた。",
      },
      {
        id: "yang-2015-astrocyte-ghrelin",
        citation: "Yang et al. 2015",
        referenceId: "yang2015_astro",
        finding:
          "内側基底視床下部のアストロサイト刺激がアデノシンA1Rを介してグレリン誘発食物摂取を減少させ、視床下部におけるグリアの双方向食欲制御を実証。",
      },
    ],

    clinicalParallelLabel: "臨床的平行",

    seeAlso: "関連ページ",
    modulomeOverview: "モジュローム概要",
    brainModulome: "脳モジュローム",
    pancreasModulome: "膵臓モジュローム",
    modelPage: "モデル — CaMKII収束",
  },
  fr: {
    title: "Hypothalamus (noyau arque)",
    subtitle:
      "Signalisation Ca²⁺ mediee par VGCC dans les cellules gliales et neurones de l'ARC : amplification selective du signal de faim",
    backLink: "← Retour au modulome",

    s1SectionTitle: "Noyau arque comme cible des CEM",

    channelProfile: "Profil du canal",
    channel: "Canal",
    gene: "Gene",
    cellType: "Type cellulaire",
    function: "Fonction",
    level: "Niveau de preuve",
    channelVal: "VGCC (glie + neurones)",
    geneVal: "CACNA1C / CACNA1H (sous-types multiples)",
    cellTypeVal: "Astrocytes de l'ARC (glie), neurones AgRP/NPY, neurones POMC",
    functionVal:
      "Regulation de l'appetit via Ca²⁺ glial → excitation neuronale dans le noyau arque",
    levelVal: "E",

    s2Title: "Mecanisme de regulation de l'appetit",
    s2Chain:
      "CEM → activation VGCC → Ca²⁺ ↑ dans la glie ARC → excitation des neurones AgRP/NPY → signal de faim ↑",
    s2p1:
      "Le noyau arque (ARC) de l'hypothalamus est le centre primaire de regulation de l'appetit du cerveau. Il contient deux populations neuronales opposees : les neurones AgRP/NPY (orexigenes — favorisent la faim) et les neurones POMC (anorexigenes — favorisent la satiete). Les deux populations sont modulees par les astrocytes environnants (glie) via la signalisation dependante du Ca²⁺.",
    s2p2:
      "L'activation Ca²⁺ de la glie ARC excite selectivement les neurones AgRP/NPY, augmentant la pulsion appetitive. Les neurones POMC recoivent une entree excitatrice et inhibitrice equilibree du meme signal Ca²⁺ glial, n'entrainant aucun changement net dans la signalisation de satiete. Le resultat est une amplification selective du signal de faim sans augmentation correspondante de la satiete — un deplacement net vers une augmentation de l'apport alimentaire.",
    s2p3:
      "Cette asymetrie est critique : l'activation VGCC induite par les CEM dans la glie ARC n'augmente pas simplement toute l'activite hypothalamique. Elle fait specifiquement pencher la balance faim/satiete vers la faim en excitant preferentiellement la voie orexigene. L'hypothalamus integre l'homeostasie energetique a travers ce reseau de signalisation Ca²⁺ glie-neurone, en faisant une cible specifique pour la perturbation metabolique induite par les CEM.",

    s2SectionTitle: "Preuves cles",

    s3Title: "Chen et al. 2016 (eLife)",
    s3p1:
      "Chen et al. (2016) ont demontre le lien direct Ca²⁺ → appetit in vivo. En utilisant des outils optogenetiques et chemogenetiques chez la souris, ils ont montre que l'activation des astrocytes dans l'hypothalamus basal medial (qui inclut l'ARC) modulait directement le comportement alimentaire par des mecanismes dependants du Ca²⁺. Cette etude fournit le fondement mecanistique : la signalisation Ca²⁺ gliale dans l'hypothalamus suffit a modifier l'appetit.",
    s3p2:
      "Yang et al. (2015) ont en outre montre que la stimulation astrocytaire dans l'hypothalamus basal medial reduisait la prise alimentaire evoquee par la ghreline via les recepteurs a adenosine A1 (A1R). Cela demontre le controle glial bidirectionnel de l'appetit — la direction depend des voies de signalisation engagees. Le mecanisme BERM predit que l'elevation de Ca²⁺ induite par les CEM engage preferentiellement la voie excitatrice (promotrice de faim) via les neurones AgRP/NPY.",

    s4Title: "Alshammari 2022 (PMC8777647)",
    s4p1:
      "Alshammari (2022) a documente les effets RF-CEM sur l'apport alimentaire chez l'humain, fournissant des preuves epidemiologiques du lien CEM → appetit. Cette etude connecte la voie mecanistique (VGCC → Ca²⁺ → glie ARC → appetit) a des resultats humains observables.",

    s3SectionTitle: "Parallele clinique et contexte",

    s5Title: "Agonistes GLP-1 (semaglutide / Ozempic)",
    s5p1:
      "Les agonistes des recepteurs GLP-1 tels que le semaglutide (Ozempic/Wegovy) suppriment l'appetit en agissant sur la meme cible du noyau arque. Les agonistes GLP-1 reduisent l'activite des neurones AgRP/NPY et renforcent la signalisation des neurones POMC — la direction exactement opposee a l'effet Ca²⁺ induit par les CEM decrit ci-dessus.",
    s5p2:
      "Ce parallele pharmacologique est significatif : le meme circuit neuronal que les agonistes GLP-1 suppriment therapeutiquement est le circuit que l'elevation de Ca²⁺ induite par les CEM pourrait activer chroniquement. Meme cible, direction opposee. Le succes clinique des agonistes GLP-1 dans la reduction de l'appetit et du poids corporel valide l'ARC comme noeud critique dans la regulation de l'appetit et confirme que la modulation de ce circuit produit des effets metaboliques substantiels.",

    s6Title: "Contexte multifactoriel",
    s6p1:
      "L'obesite est une condition multifactorielle entrainee par la genetique, la composition du regime, l'activite physique, le microbiome intestinal, les facteurs socio-economiques, les habitudes de sommeil, le stress et les perturbateurs endocriniens. Le cadre BERM identifie la dysregulation Ca²⁺ hypothalamique induite par les CEM comme UN facteur contributif — pas la seule cause.",
    s6Points: [
      "L'hypothalamus est une CIBLE des changements Ca²⁺ induits par les CEM, contribuant a la dysregulation de l'appetit comme un facteur parmi d'autres",
      "Les tendances d'obesite au niveau de la population ont de multiples moteurs ; l'exposition aux CEM pourrait agir comme un amplificateur du signal de faim non reconnu auparavant",
      "Le mecanisme est specifique et testable : VGCC → Ca²⁺ → glie ARC → AgRP/NPY → appetit, avec un niveau de preuve E (Ca²⁺ direct → appetit verifie in vivo)",
      "Cela ne remplace pas les facteurs de risque d'obesite etablis — cela ajoute une voie mediee par VGCC, fondee mecanistiquement, au modele multifactoriel existant",
    ],

    references: "References cles",
    refs: [
      {
        id: "chen-2016-elife-ca-appetite",
        citation: "Chen et al. 2016 (eLife)",
        referenceId: "chen2016_glia",
        finding:
          "A demontre le lien direct Ca²⁺ → appetit in vivo. L'activation astrocytaire dans l'hypothalamus basal medial a module le comportement alimentaire par des mecanismes dependants du Ca²⁺ chez la souris.",
      },
      {
        id: "alshammari-2022-rf-emf-food-intake",
        citation: "Alshammari 2022 (PMC8777647)",
        referenceId: "alshammari2022",
        finding:
          "Effets RF-CEM sur l'apport alimentaire documentes chez l'humain, connectant la voie mecanistique VGCC → Ca²⁺ → appetit a des resultats humains observables.",
      },
      {
        id: "yang-2015-astrocyte-ghrelin",
        citation: "Yang et al. 2015",
        referenceId: "yang2015_astro",
        finding:
          "La stimulation astrocytaire dans l'hypothalamus basal medial a reduit la prise alimentaire evoquee par la ghreline via A1R, demontrant le controle glial bidirectionnel de l'appetit dans l'hypothalamus.",
      },
    ],

    clinicalParallelLabel: "Parallele clinique",

    seeAlso: "Voir aussi",
    modulomeOverview: "Apercu du modulome",
    brainModulome: "Modulome cerebral",
    pancreasModulome: "Modulome pancreatique",
    modelPage: "Modele — convergence CaMKII",
  },
  ko: {
    title: "시상하부 (궁상핵)",
    subtitle:
      "ARC 신경교세포 및 뉴런의 VGCC 매개 Ca²⁺ 신호전달: 배고픔 신호의 선택적 증폭",
    backLink: "← 모듈롬으로 돌아가기",

    s1SectionTitle: "EMF 표적으로서의 궁상핵",

    channelProfile: "채널 프로파일",
    channel: "채널",
    gene: "유전자",
    cellType: "세포 유형",
    function: "기능",
    level: "근거 수준",
    channelVal: "VGCC (신경교 + 뉴런)",
    geneVal: "CACNA1C / CACNA1H (다중 하위유형)",
    cellTypeVal: "ARC 성상세포(신경교), AgRP/NPY 뉴런, POMC 뉴런",
    functionVal:
      "궁상핵에서 신경교 Ca²⁺ → 뉴런 흥분을 통한 식욕 조절",
    levelVal: "E",

    s2Title: "식욕 조절 메커니즘",
    s2Chain:
      "EMF → VGCC 활성화 → ARC 신경교의 Ca²⁺ ↑ → AgRP/NPY 뉴런 흥분 → 배고픔 신호 ↑",
    s2p1:
      "시상하부의 궁상핵(ARC)은 뇌의 주요 식욕 조절 센터이다. 두 개의 대립하는 뉴런 집단을 포함한다: AgRP/NPY 뉴런(식욕 촉진성 — 배고픔 촉진)과 POMC 뉴런(식욕 억제성 — 포만감 촉진). 두 집단 모두 Ca²⁺ 의존성 신호전달을 통해 주변 성상세포(신경교)에 의해 조절된다.",
    s2p2:
      "ARC 신경교의 Ca²⁺ 활성화는 AgRP/NPY 뉴런을 선택적으로 흥분시켜 식욕 구동을 증가시킨다. POMC 뉴런은 동일한 신경교 Ca²⁺ 신호에서 균형 잡힌 흥분성 및 억제성 입력을 받아 포만 신호전달의 순 변화가 없다. 결과는 대응하는 포만감 증가 없이 배고픔 신호의 선택적 증폭 — 식품 섭취 증가를 향한 순 이동이다.",
    s2p3:
      "이 비대칭성은 중요하다: ARC 신경교에서의 EMF 유도 VGCC 활성화는 단순히 모든 시상하부 활동을 증가시키지 않는다. 식욕 촉진 경로를 우선적으로 흥분시켜 배고픔/포만 균형을 특이적으로 배고픔 쪽으로 기울인다. 시상하부는 이 신경교-뉴런 Ca²⁺ 신호전달 네트워크를 통해 에너지 항상성을 통합하여 EMF 유도 대사 교란의 특이적 표적이 된다.",

    s2SectionTitle: "핵심 근거",

    s3Title: "Chen et al. 2016 (eLife)",
    s3p1:
      "Chen et al.(2016)은 in vivo에서 직접적 Ca²⁺ → 식욕 연관을 입증했다. 마우스에서 광유전학적 및 화학유전학적 도구를 사용하여 내측 기저 시상하부(ARC 포함)의 성상세포 활성화가 Ca²⁺ 의존 메커니즘을 통해 섭식 행동을 직접 조절함을 보여주었다. 이 연구는 메커니즘적 기초를 제공한다: 시상하부에서의 신경교 Ca²⁺ 신호전달은 식욕을 변화시키기에 충분하다.",
    s3p2:
      "Yang et al.(2015)은 추가로 내측 기저 시상하부의 성상세포 자극이 아데노신 A1 수용체(A1R)를 통해 그렐린 유발 식품 섭취를 감소시킴을 보여주었다. 이는 신경교에 의한 식욕의 양방향 제어를 입증한다 — 방향은 어떤 신호전달 경로가 관여하는지에 따라 달라진다. BERM 메커니즘은 EMF 유도 Ca²⁺ 상승이 AgRP/NPY 뉴런을 통해 흥분성(배고픔 촉진) 경로를 우선적으로 활성화한다고 예측한다.",

    s4Title: "Alshammari 2022 (PMC8777647)",
    s4p1:
      "Alshammari(2022)는 인간에서 RF-EMF의 식품 섭취에 대한 영향을 기록하여 EMF → 식욕 연관에 대한 역학적 근거를 제공했다. 이 연구는 메커니즘 경로(VGCC → Ca²⁺ → ARC 신경교 → 식욕)를 관찰 가능한 인간 결과에 연결한다.",

    s3SectionTitle: "임상적 병행과 맥락",

    s5Title: "GLP-1 작용제 (세마글루타이드 / Ozempic)",
    s5p1:
      "세마글루타이드(Ozempic/Wegovy)와 같은 GLP-1 수용체 작용제는 동일한 궁상핵 표적에 작용하여 식욕을 억제한다. GLP-1 작용제는 AgRP/NPY 뉴런 활동을 감소시키고 POMC 뉴런 신호전달을 강화한다 — 위에서 설명한 EMF 유도 Ca²⁺ 효과와 정확히 반대 방향.",
    s5p2:
      "이 약리학적 병행은 중요하다: GLP-1 작용제가 치료적으로 억제하는 동일한 신경 회로가 EMF 유도 Ca²⁺ 상승이 만성적으로 활성화할 수 있는 회로이다. 같은 표적, 반대 방향. GLP-1 작용제의 식욕 및 체중 감소에서의 임상적 성공은 ARC를 식욕 조절의 중요 노드로 검증하고 이 회로의 조절이 실질적인 대사 효과를 산출함을 확인한다.",

    s6Title: "다요인적 맥락",
    s6p1:
      "비만은 유전, 식이 구성, 신체 활동, 장내 미생물군, 사회경제적 요인, 수면 패턴, 스트레스, 내분비 교란물질에 의해 구동되는 다요인적 상태이다. BERM 프레임워크는 EMF 유도 시상하부 Ca²⁺ 조절이상을 하나의 기여 요인으로 식별한다 — 유일한 원인이 아니다.",
    s6Points: [
      "시상하부는 EMF 유도 Ca²⁺ 변화의 표적이며, 여러 요인 중 하나로서 식욕 조절이상에 기여한다",
      "집단 수준의 비만 추세에는 다중 동인이 있다; EMF 노출은 이전에 인식되지 않은 배고픔 신호 증폭기로 작용할 수 있다",
      "메커니즘은 특이적이고 검증 가능하다: VGCC → Ca²⁺ → ARC 신경교 → AgRP/NPY → 식욕, 근거 수준 E(직접적 Ca²⁺ → 식욕이 in vivo에서 검증됨)",
      "이것은 확립된 비만 위험 요인을 대체하지 않는다 — 기존 다요인 모델에 메커니즘적 근거를 가진 VGCC 매개 경로를 추가한다",
    ],

    references: "주요 참고문헌",
    refs: [
      {
        id: "chen-2016-elife-ca-appetite",
        citation: "Chen et al. 2016 (eLife)",
        referenceId: "chen2016_glia",
        finding:
          "in vivo에서 직접적 Ca²⁺ → 식욕 연관 입증. 마우스에서 내측 기저 시상하부의 성상세포 활성화가 Ca²⁺ 의존 메커니즘을 통해 섭식 행동을 조절.",
      },
      {
        id: "alshammari-2022-rf-emf-food-intake",
        citation: "Alshammari 2022 (PMC8777647)",
        referenceId: "alshammari2022",
        finding:
          "인간에서 RF-EMF의 식품 섭취 영향 기록, VGCC → Ca²⁺ → 식욕의 메커니즘 경로를 관찰 가능한 인간 결과에 연결.",
      },
      {
        id: "yang-2015-astrocyte-ghrelin",
        citation: "Yang et al. 2015",
        referenceId: "yang2015_astro",
        finding:
          "내측 기저 시상하부의 성상세포 자극이 아데노신 A1R을 통해 그렐린 유발 식품 섭취를 감소시켜 시상하부에서 신경교의 양방향 식욕 제어를 입증.",
      },
    ],

    clinicalParallelLabel: "임상적 병행",

    seeAlso: "관련 페이지",
    modulomeOverview: "모듈롬 개요",
    brainModulome: "뇌 모듈롬",
    pancreasModulome: "췌장 모듈롬",
    modelPage: "모델 — CaMKII 수렴",
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const d = pickCopy(COPY, locale);
  return {
    title: `${d.title} – Modulome – Extinction Field`,
    description: d.subtitle,
  };
}

export default async function HypothalamusPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const d = pickCopy(COPY, locale);

  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <Link
        href={`/${locale}/modulome`}
        className="text-sm text-accent hover:underline mb-6 inline-block"
      >
        {d.backLink}
      </Link>

      <PageHeader icon={Brain} title={d.title} subtitle={d.subtitle} />

      {/* ===============================================
          SECTION 1 -- Arcuate Nucleus as EMF Target
          =============================================== */}
      <div className="mb-4 mt-12">
        <h2 className="text-xl font-bold text-foreground tracking-tight">
          {d.s1SectionTitle}
        </h2>
        <div className="h-px bg-accent/30 mt-2" />
      </div>

      {/* 01 -- Channel Profile */}
      <section className="mb-16 border-t editorial-rule pt-6">
        <h3 className="text-lg font-semibold mb-4">
          <span className="font-mono-num text-xs text-accent mr-2">01</span>
          {d.channelProfile}
        </h3>
        <div className="bg-card rounded-lg border border-card-border p-5 space-y-3">
          <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm">
            <span className="text-foreground-muted">{d.channel}</span>
            <span className="text-foreground font-medium">{d.channelVal}</span>
            <span className="text-foreground-muted">{d.gene}</span>
            <span className="text-foreground font-medium font-mono text-xs">
              {d.geneVal}
            </span>
            <span className="text-foreground-muted">{d.cellType}</span>
            <span className="text-foreground font-medium">{d.cellTypeVal}</span>
            <span className="text-foreground-muted">{d.function}</span>
            <span className="text-foreground font-medium">{d.functionVal}</span>
            <span className="text-foreground-muted">{d.level}</span>
            <span className="text-foreground font-medium">
              <span className="text-[0.65rem] font-semibold px-1.5 py-0.5 rounded bg-green-500/10 text-green-600 dark:text-green-400">
                {d.levelVal}
              </span>
            </span>
          </div>
        </div>
      </section>

      {/* 02 -- Appetite Regulation Mechanism */}
      <section className="mb-16 border-t editorial-rule pt-6">
        <h3 className="text-lg font-semibold mb-4">
          <span className="font-mono-num text-xs text-accent mr-2">02</span>
          {d.s2Title}
        </h3>

        <div className="bg-card rounded-lg border border-card-border p-5 mb-6">
          <p className="font-mono text-sm text-accent leading-relaxed text-center">
            {d.s2Chain}
          </p>
        </div>

        <div className="space-y-4 text-sm text-foreground-muted leading-relaxed max-w-4xl">
          <p className="editorial-rail text-[0.95rem] text-foreground">
            {d.s2p1}
          </p>
          <p>{d.s2p2}</p>
          <div className="border-l-4 border-accent/40 rounded-r-lg bg-card p-5">
            <p className="text-sm text-foreground-muted leading-relaxed">
              {d.s2p3}
            </p>
          </div>
        </div>
      </section>

      {/* ===============================================
          SECTION 2 -- Key Evidence
          =============================================== */}
      <div className="mb-4 mt-12">
        <h2 className="text-xl font-bold text-foreground tracking-tight">
          {d.s2SectionTitle}
        </h2>
        <div className="h-px bg-accent/30 mt-2" />
      </div>

      {/* 03 -- Chen et al. 2016 */}
      <section className="mb-16 border-t editorial-rule pt-6">
        <h3 className="text-lg font-semibold mb-4">
          <span className="font-mono-num text-xs text-accent mr-2">03</span>
          {d.s3Title}
        </h3>
        <div className="space-y-4 text-sm text-foreground-muted leading-relaxed max-w-4xl">
          <p className="editorial-rail text-[0.95rem] text-foreground">
            {d.s3p1}
          </p>
          <p>{d.s3p2}</p>
        </div>
      </section>

      {/* 04 -- Alshammari 2022 */}
      <section className="mb-16 border-t editorial-rule pt-6">
        <h3 className="text-lg font-semibold mb-4">
          <span className="font-mono-num text-xs text-accent mr-2">04</span>
          {d.s4Title}
        </h3>
        <div className="border-l-4 border-accent/40 rounded-r-lg bg-card p-5">
          <p className="text-sm text-foreground-muted leading-relaxed">
            {d.s4p1}
          </p>
        </div>
      </section>

      {/* ===============================================
          SECTION 3 -- Clinical Parallel & Context
          =============================================== */}
      <div className="mb-4 mt-12">
        <h2 className="text-xl font-bold text-foreground tracking-tight">
          {d.s3SectionTitle}
        </h2>
        <div className="h-px bg-accent/30 mt-2" />
      </div>

      {/* 05 -- GLP-1 / Ozempic */}
      <section className="mb-16 border-t editorial-rule pt-6">
        <h3 className="text-lg font-semibold mb-4">
          <span className="font-mono-num text-xs text-accent mr-2">05</span>
          {d.s5Title}
        </h3>
        <div className="space-y-4 text-sm text-foreground-muted leading-relaxed max-w-4xl">
          <p className="editorial-rail text-[0.95rem] text-foreground">
            {d.s5p1}
          </p>
          <div className="rounded-lg bg-blue-500/10 border border-blue-500/20 p-5">
            <p className="text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-2">
              {d.clinicalParallelLabel}
            </p>
            <p className="text-sm text-foreground-muted leading-relaxed">
              {d.s5p2}
            </p>
          </div>
        </div>
      </section>

      {/* 06 -- Multifactorial Context */}
      <section className="mb-16 border-t editorial-rule pt-6">
        <h3 className="text-lg font-semibold mb-4">
          <span className="font-mono-num text-xs text-accent mr-2">06</span>
          {d.s6Title}
        </h3>

        <p className="text-sm text-foreground-muted leading-relaxed max-w-4xl mb-4">
          {d.s6p1}
        </p>

        <div className="rounded-lg bg-amber-500/10 border border-amber-500/20 p-5">
          <ul className="space-y-3 text-sm text-foreground-muted leading-relaxed">
            {d.s6Points.map((point, i) => (
              <li key={i} className="pl-1 flex gap-2">
                <span className="text-accent shrink-0">*</span>
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* References */}
      <section className="mb-16 border-t editorial-rule pt-6">
        <h3 className="text-sm font-semibold text-foreground mb-4">
          {d.references}
        </h3>
        <div className="space-y-3">
          {d.refs.map((ref) => (
            <div
              key={ref.id}
              className="bg-card rounded-lg border border-card-border p-4"
            >
              <p className="text-xs font-semibold text-accent mb-1">
                <CitationLink referenceId={ref.referenceId} locale={locale} citation={ref.citation} />
              </p>
              <p className="text-xs text-foreground-muted leading-relaxed">
                {ref.finding}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* See also */}
      <section className="border-t editorial-rule pt-6">
        <h3 className="text-sm font-semibold text-foreground mb-3">
          {d.seeAlso}
        </h3>
        <div className="flex gap-6 flex-wrap">
          <Link
            href={`/${locale}/modulome`}
            className="text-sm text-accent hover:underline"
          >
            {d.modulomeOverview} &rarr;
          </Link>
          <Link
            href={`/${locale}/modulome/brain`}
            className="text-sm text-accent hover:underline"
          >
            {d.brainModulome} &rarr;
          </Link>
          <Link
            href={`/${locale}/modulome/pancreas`}
            className="text-sm text-accent hover:underline"
          >
            {d.pancreasModulome} &rarr;
          </Link>
          <Link
            href={`/${locale}/model#camkii-convergence`}
            className="text-sm text-accent hover:underline"
          >
            {d.modelPage} &rarr;
          </Link>
        </div>
      </section>
    </div>
  );
}
