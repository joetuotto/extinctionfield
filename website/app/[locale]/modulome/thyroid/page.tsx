import type { Metadata } from "next";
import Link from "next/link";
import { Thermometer } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { CitationLink } from "@/components/CitationLink";
import { pickCopy } from "@/lib/i18n";

const COPY = {
  en: {
    title: "Thyroid",
    subtitle:
      "Anterior neck = direct phone exposure — HPT axis disruption via pituitary thyrotroph Cav3",
    backLink: "← Back to Modulome",

    s1SectionTitle: "HPT Axis and Thyroid Channels",

    channelProfile: "Channel Profile",
    channel: "Channel",
    gene: "Gene",
    cellType: "Cell type",
    function: "Function",
    level: "Evidence level",
    channelVal: "Cav3 (T-type)",
    geneVal: "CACNA1G/H/I",
    cellTypeVal: "Pituitary thyrotroph → TSH → Thyrocyte",
    functionVal: "TSH secretion — controls thyroid hormone synthesis (T3/T4)",
    levelVal: "M|C",

    s2Title: "HPT Axis Mechanism",
    s2p1:
      "Thyroid hormone production is governed by the hypothalamic-pituitary-thyroid (HPT) axis. The hypothalamus releases TRH (thyrotropin-releasing hormone), which stimulates pituitary thyrotrophs to secrete TSH (thyroid-stimulating hormone). TSH then drives the thyroid gland to produce T3 and T4 — the hormones that regulate metabolic rate, growth, and development throughout the body.",
    s2p2:
      "Pituitary thyrotrophs use Cav3 T-type voltage-gated calcium channels for TSH secretion. This is the same channel class used by gonadotrophs for LH/FSH release — making the pituitary a shared vulnerability node where EMF can simultaneously disrupt reproductive and thyroid axes through identical Cav3 perturbation.",
    s2p3:
      "EMF → Cav3 perturbation in thyrotrophs → TSH dysregulation → thyroid dysfunction. Because TSH controls the entire thyroid hormone cascade, even small perturbations at the pituitary level amplify downstream into clinically significant thyroid dysfunction.",

    s3Title: "Pituitary Exposure — Outside the Blood-Brain Barrier",
    s3Text:
      "The anterior pituitary sits outside the blood-brain barrier. Unlike neurons within the central nervous system, pituitary thyrotrophs are directly exposed to circulating blood — and to whatever electromagnetic field intensities reach the bloodstream. This means EMF does not need to penetrate the BBB to affect thyroid regulation. The pituitary is an unshielded endocrine control node, making Cav3-dependent hormone secretion (TSH, LH, FSH, GH) directly vulnerable to EMF perturbation.",

    s2SectionTitle: "Anterior Neck Exposure",

    s4Title: "Phone Proximity Physics",
    s4p1:
      "The thyroid gland sits in the anterior neck — directly adjacent to where mobile phones are held during voice calls. In the phone-at-ear position, the thyroid is within 5–10cm of the RF emission source. The inverse-square law dictates that EMF power density is inversely proportional to the square of distance: at 5cm, the field intensity at the thyroid is 4× higher than at 10cm.",
    s4p2:
      "This makes the thyroid one of the most directly phone-exposed endocrine organs in the body. Unlike the pituitary (which receives EMF through the skull) or the gonads (which are typically 30+ cm from the phone), the thyroid faces near-field RF exposure during every voice call with minimal tissue shielding.",

    s5Title: "Epidemiological Context",
    s5Stats: [
      "Hypothyroidism is rising globally, with prevalence highest in women (5:1 female-to-male ratio)",
      "Hashimoto's thyroiditis (autoimmune) is the most common cause of hypothyroidism in iodine-sufficient countries",
      "Thyroid cancer incidence has increased approximately 3× since the 1980s — paralleling global mobile phone adoption",
      "Autoimmune thyroid disease involves the Ca²⁺-calcineurin-NFAT pathway in T-cells — the same pathway as BERM cascade #10",
    ],

    s3SectionTitle: "Evidence and Predictions",

    s6Title: "EMF–Thyroid Evidence Chain",
    s6Chain:
      "EMF → Cav3 perturbation (thyrotroph) → TSH dysregulation → T3/T4 imbalance → thyroid dysfunction",
    s6p1:
      "Pituitary Cav3 T-type channels are well-established in endocrine physiology. The same mechanism that governs gonadotroph LH pulsatility (BERM pituitary modulome) operates in thyrotrophs for TSH secretion. Systematic review evidence (F1000Research) identified five observational studies linking EMF exposure to hypothyroidism. Workers with more than 33 hours per month of phone use showed lower TSH levels.",
    s6p2:
      "Both hypothyroidism and hyperthyroidism reduce fertility — creating a direct link between thyroid disruption and total fertility rate decline. The thyroid connects to the BERM reproductive pathway through the pituitary hub: the same Cav3 perturbation that disrupts LH/FSH simultaneously disrupts TSH, making thyroid dysfunction a parallel consequence of the central BERM mechanism.",

    s7Title: "BERM Predictions",
    s7Text:
      "The BERM framework generates two specific, testable predictions for the thyroid modulome:",
    s7Predictions: [
      {
        id: "THYROID-1",
        text: "Mobile phone users show altered TSH levels compared to non-users when controlling for iodine intake, age, sex, and autoimmune status. The effect is dose-dependent on daily call duration and years of use.",
        discriminating: true,
      },
      {
        id: "THYROID-2",
        text: "Thyroid cancer incidence correlates with cumulative mobile phone use (years of use × daily call duration) after controlling for detection bias from increased screening. The correlation is specific to papillary thyroid carcinoma, the subtype most associated with the anterior neck exposure zone.",
        discriminating: true,
      },
    ],

    references: "Key References",
    refs: [
      {
        id: "f1000-emf-thyroid-review",
        citation: "F1000Research — Systematic Review",
        referenceId: "thyroid-sysrev-2024",
        finding:
          "Five observational studies found associations between EMF exposure and hypothyroidism. Occupational phone use exceeding 33 hours per month was associated with lower TSH levels.",
      },
      {
        id: "pituitary-cav3-thyrotroph",
        citation: "Endocrine Reviews — Pituitary Ion Channels",
        referenceId: "ijms2026-hpg",
        finding:
          "T-type (Cav3) calcium channels mediate hormone secretion in pituitary thyrotrophs and gonadotrophs. Cav3 perturbation alters pulsatile TSH and LH release patterns.",
      },
    ],

    seeAlso: "See also",
    pituitaryModulome: "Pituitary modulome",
    predictionsPage: "Predictions — THYROID-1/2",
    evidencePage: "Evidence register",
    discriminatingBadge: "Discriminating",
    allPredictions: "All predictions →",
  },
  fi: {
    title: "Kilpirauhanen",
    subtitle:
      "Kaulan etuosa = suora puhelinaltistus — HPT-akselin häiriö aivolisakkeen tyreotrooppi-Cav3:n kautta",
    backLink: "← Takaisin moduloomiin",

    s1SectionTitle: "HPT-akseli ja kilpirauhaskanavat",

    channelProfile: "Kanavaprofiili",
    channel: "Kanava",
    gene: "Geeni",
    cellType: "Solutyyppi",
    function: "Toiminto",
    level: "Evidenssitaso",
    channelVal: "Cav3 (T-tyyppi)",
    geneVal: "CACNA1G/H/I",
    cellTypeVal: "Aivolisäkkeen tyreotrooppi → TSH → Tyreosyytti",
    functionVal: "TSH-eritys — ohjaa kilpirauhashormonien synteesiä (T3/T4)",
    levelVal: "M|C",

    s2Title: "HPT-akselin mekanismi",
    s2p1:
      "Kilpirauhashormonien tuotantoa ohjaa hypotalamus–aivolisäke–kilpirauhanen (HPT) -akseli. Hypotalamus vapauttaa TRH:ta (tyreotropiinia vapauttava hormoni), joka stimuloi aivolisäkkeen tyreotrooppeja erittämään TSH:ta (kilpirauhasta stimuloiva hormoni). TSH puolestaan ohjaa kilpirauhasta tuottamaan T3:a ja T4:ää — hormoneja jotka säätelevät aineenvaihduntanopeutta, kasvua ja kehitystä koko kehossa.",
    s2p2:
      "Aivolisäkkeen tyreotrooppeja käyttävät Cav3-tyypin T-tyypin jänniteohjattuja kalsiumkanavia TSH:n eritykseen. Kyseessä on sama kanavaluokka jota gonadotrooppisolut käyttävät LH/FSH-vapautukseen — mikä tekee aivolisäkkeestä jaetun haavoittuvuussolmun, jossa EMF voi samanaikaisesti häiritä lisääntymis- ja kilpirauhasakseleja identtisen Cav3-häiriön kautta.",
    s2p3:
      "EMF → Cav3-häiriö tyreotrooppissa → TSH:n säätelyn häiriö → kilpirauhasen toimintahäiriö. Koska TSH ohjaa koko kilpirauhashormonikaskadia, pienetkin häiriöt aivolisäketasolla vahvistuvat alavirrassa kliinisesti merkittäväksi kilpirauhasen toimintahäiriöksi.",

    s3Title: "Aivolisäkkeen altistus — veri-aivoesteen ulkopuolella",
    s3Text:
      "Aivolisäkkeen etuosa sijaitsee veri-aivoesteen ulkopuolella. Toisin kuin keskushermoston neuronit, aivolisäkkeen tyreotrooppeja ovat suoraan altistuneet verenkierrolle — ja verenkierron tavoittamille sähkömagneettisille kentille. Tämä tarkoittaa ettei EMF:n tarvitse läpäistä veri-aivoestettä vaikuttaakseen kilpirauhasen säätelyyn. Aivolisäke on suojaamaton endokriininen ohjaussolmu, mikä tekee Cav3-riippuvaisesta hormonierityksestä (TSH, LH, FSH, GH) suoraan haavoittuvan EMF-häiriöille.",

    s2SectionTitle: "Kaulan etuosan altistus",

    s4Title: "Puhelimen läheisyysfysiikka",
    s4p1:
      "Kilpirauhanen sijaitsee kaulan etuosassa — suoraan puhelimen pidätyskohdan vieressä puheluiden aikana. Korvalla pidettäessä kilpirauhanen on 5–10cm etäisyydellä RF-säteilylähteestä. Käänteisen neliölain mukaan EMF:n tehontiheys on kääntäen verrannollinen etäisyyden neliöön: 5cm etäisyydellä kenttävoimakkuus kilpirauhasessa on 4× suurempi kuin 10cm etäisyydellä.",
    s4p2:
      "Tämä tekee kilpirauhasesta yhden suorimmin puhelinaltistuksen alaisista endokriinisistä elimistä. Toisin kuin aivolisäke (joka vastaanottaa EMF:n kallon läpi) tai sukurauhaset (tyypillisesti 30+ cm puhelimesta), kilpirauhanen kohtaa lähikentän RF-altistuksen jokaisen puhelun aikana minimaalisella kudossuojauksella.",

    s5Title: "Epidemiologinen konteksti",
    s5Stats: [
      "Kilpirauhasen vajaatoiminta yleistyy maailmanlaajuisesti, esiintyvyys suurinta naisilla (5:1 nainen:mies-suhde)",
      "Hashimoton tyreoidiitti (autoimmuuni) on yleisin kilpirauhasen vajaatoiminnan syy jodiriittoisissa maissa",
      "Kilpirauhassyövän ilmaantuvuus on noin kolminkertaistunut 1980-luvulta — rinnakkain matkapuhelinten yleistymisen kanssa",
      "Autoimmuuni kilpirauhassairaus käyttää Ca²⁺-kalsineuriini-NFAT-reittiä T-soluissa — sama reitti kuin BERM-kaskadissa #10",
    ],

    s3SectionTitle: "Evidenssi ja ennusteet",

    s6Title: "EMF–kilpirauhanen-evidenssiketju",
    s6Chain:
      "EMF → Cav3-häiriö (tyreotrooppi) → TSH:n säätelyn häiriö → T3/T4-epätasapaino → kilpirauhasen toimintahäiriö",
    s6p1:
      "Aivolisäkkeen Cav3-tyypin T-kanavat ovat vakiintuneet endokriinisessa fysiologiassa. Sama mekanismi joka ohjaa gonadotrooppien LH-pulsseja (BERM aivolisäke-moduloomi) toimii tyreotrooppissa TSH-erityksessä. Systemaattisen katsauksen evidenssi (F1000Research) tunnisti viisi havainnointitutkimusta jotka yhdistävät EMF-altistuksen kilpirauhasen vajaatoimintaan. Työntekijöillä joiden puhelinkäyttö ylitti 33 tuntia kuukaudessa havaittiin matalammat TSH-tasot.",
    s6p2:
      "Sekä kilpirauhasen vajaatoiminta että liikatoiminta heikentävät hedelmällisyyttä — luoden suoran yhteyden kilpirauhasen häiriöiden ja kokonaishedelmällisyysluvun laskun välille. Kilpirauhanen kytkeytyy BERM:n lisääntymisreittiin aivolisäkehubin kautta: sama Cav3-häiriö joka häiritsee LH/FSH:ta häiritsee samanaikaisesti TSH:ta, mikä tekee kilpirauhasen toimintahäiriöstä rinnakkaisen seurauksen keskeisestä BERM-mekanismista.",

    s7Title: "BERM-ennusteet",
    s7Text:
      "BERM-kehys tuottaa kaksi spesifistä, testattavaa ennustetta kilpirauhasen moduloomille:",
    s7Predictions: [
      {
        id: "THYROID-1",
        text: "Matkapuhelimen käyttäjillä on muuttuneet TSH-tasot verrattuna ei-käyttäjiin kun jodinsaanti, ikä, sukupuoli ja autoimmuunitila kontrolloidaan. Vaikutus on annosriippuvainen päivittäisestä puhelun kestosta ja käyttövuosista.",
        discriminating: true,
      },
      {
        id: "THYROID-2",
        text: "Kilpirauhassyövän ilmaantuvuus korreloi kumulatiivisen matkapuhelinkäytön kanssa (käyttövuodet × päivittäinen puheluaika) toteamisharhan kontrolloinnin jälkeen. Korrelaatio on spesifinen papillaariselle kilpirauhassyövälle, alatyypille joka liittyy eniten kaulan etuosan altistusvyöhykkeeseen.",
        discriminating: true,
      },
    ],

    references: "Keskeiset viitteet",
    refs: [
      {
        id: "f1000-emf-thyroid-review",
        citation: "F1000Research — Systemaattinen katsaus",
        referenceId: "thyroid-sysrev-2024",
        finding:
          "Viisi havainnointitutkimusta löysi yhteyksiä EMF-altistuksen ja kilpirauhasen vajaatoiminnan välillä. Yli 33 tuntia kuukaudessa ammatillista puhelinkäyttöä yhdistettiin matalampiin TSH-tasoihin.",
      },
      {
        id: "pituitary-cav3-thyrotroph",
        citation: "Endocrine Reviews — Aivolisäkkeen ionikanavat",
        referenceId: "ijms2026-hpg",
        finding:
          "T-tyypin (Cav3) kalsiumkanavat välittävät hormonien eritystä aivolisäkkeen tyreotrooppissa ja gonadotrooppissa. Cav3-häiriö muuttaa pulssimaista TSH- ja LH-eritystä.",
      },
    ],

    seeAlso: "Katso myös",
    pituitaryModulome: "Aivolisäkkeen moduloomi",
    predictionsPage: "Ennusteet — THYROID-1/2",
    evidencePage: "Evidenssirekisteri",
    discriminatingBadge: "Erotteleva",
    allPredictions: "Kaikki ennusteet →",
  },
  ja: {
    title: "甲状腺",
    subtitle:
      "前頸部 = 携帯電話の直接曝露 — 下垂体サイロトロフCav3を介したHPT軸障害",
    backLink: "← モジュロームに戻る",

    s1SectionTitle: "HPT軸と甲状腺チャネル",

    channelProfile: "チャネルプロファイル",
    channel: "チャネル",
    gene: "遺伝子",
    cellType: "細胞型",
    function: "機能",
    level: "エビデンスレベル",
    channelVal: "Cav3 (T-type)",
    geneVal: "CACNA1G/H/I",
    cellTypeVal: "下垂体サイロトロフ → TSH → 甲状腺細胞",
    functionVal: "TSH分泌 — 甲状腺ホルモン合成 (T3/T4) を制御",
    levelVal: "M|C",

    s2Title: "HPT軸メカニズム",
    s2p1:
      "甲状腺ホルモン産生は視床下部-下垂体-甲状腺 (HPT) 軸によって支配される。視床下部がTRH (甲状腺刺激ホルモン放出ホルモン) を放出し、下垂体サイロトロフを刺激してTSH (甲状腺刺激ホルモン) を分泌させる。TSHは甲状腺にT3とT4 — 全身の代謝率、成長、発達を調節するホルモン — の産生を駆動する。",
    s2p2:
      "下垂体サイロトロフはTSH分泌にCav3 T型電位依存性カルシウムチャネルを使用する。これはゴナドトロフがLH/FSH放出に使用するのと同じチャネルクラスであり、下垂体をEMFが同一のCav3摂動を通じて生殖軸と甲状腺軸を同時に障害しうる共有脆弱性ノードとしている。",
    s2p3:
      "EMF → サイロトロフにおけるCav3摂動 → TSH調節異常 → 甲状腺機能障害。TSHが甲状腺ホルモンカスケード全体を制御するため、下垂体レベルでのわずかな摂動でさえ下流で臨床的に重大な甲状腺機能障害に増幅される。",

    s3Title: "下垂体曝露 — 血液脳関門外",
    s3Text:
      "前葉下垂体は血液脳関門の外側に位置する。中枢神経系内のニューロンとは異なり、下垂体サイロトロフは循環血液に直接曝露されている — そして血流に到達するあらゆる電磁場強度にも。これはEMFが甲状腺調節に影響を与えるためにBBBを貫通する必要がないことを意味する。下垂体はシールドされていない内分泌制御ノードであり、Cav3依存性ホルモン分泌 (TSH, LH, FSH, GH) がEMF摂動に直接脆弱である。",

    s2SectionTitle: "前頸部曝露",

    s4Title: "携帯電話近接物理学",
    s4p1:
      "甲状腺は前頸部に位置する — 音声通話中に携帯電話を保持する位置に直接隣接している。耳に当てた位置では、甲状腺はRF放射源から5–10cmの距離にある。逆二乗則により、EMF出力密度は距離の二乗に反比例する：5cmでの甲状腺における場の強度は10cmの4倍である。",
    s4p2:
      "これにより甲状腺は体内で最も直接的に携帯電話曝露を受ける内分泌器官の一つとなる。下垂体 (頭蓋骨を通してEMFを受ける) や生殖腺 (通常電話から30cm以上) とは異なり、甲状腺は最小限の組織シールドで全ての音声通話中に近接場RF曝露に直面する。",

    s5Title: "疫学的コンテキスト",
    s5Stats: [
      "甲状腺機能低下症は世界的に増加しており、女性で最も高い有病率 (女性対男性比5:1)",
      "橋本甲状腺炎 (自己免疫性) はヨード充足国における甲状腺機能低下症の最も一般的な原因である",
      "甲状腺がんの発生率は1980年代以降約3倍に増加 — 世界的な携帯電話普及と並行",
      "自己免疫性甲状腺疾患はT細胞におけるCa2+-カルシニューリン-NFAT経路を使用 — BERMカスケード#10と同じ経路",
    ],

    s3SectionTitle: "エビデンスと予測",

    s6Title: "EMF-甲状腺エビデンスチェーン",
    s6Chain:
      "EMF → Cav3 perturbation (thyrotroph) → TSH dysregulation → T3/T4 imbalance → thyroid dysfunction",
    s6p1:
      "下垂体Cav3 T型チャネルは内分泌生理学で確立されている。ゴナドトロフのLH拍動性を支配するのと同じメカニズム (BERM下垂体モジュローム) がサイロトロフでTSH分泌に作動する。系統的レビューエビデンス (F1000Research) は、EMF曝露と甲状腺機能低下症を結びつける5つの観察研究を特定した。月33時間以上の電話使用の労働者でTSHレベルの低下が示された。",
    s6p2:
      "甲状腺機能低下症と甲状腺機能亢進症の両方が生殖能力を低下させる — 甲状腺障害と合計特殊出生率低下の直接的リンクを作る。甲状腺は下垂体ハブを通じてBERM生殖経路に接続する：LH/FSHを障害するのと同じCav3摂動がTSHを同時に障害し、甲状腺機能障害を中心的BERMメカニズムの並行的結果とする。",

    s7Title: "BERM予測",
    s7Text:
      "BERMフレームワークは甲状腺モジュロームに対して2つの具体的かつ検証可能な予測を生成する：",
    s7Predictions: [
      {
        id: "THYROID-1",
        text: "携帯電話利用者はヨード摂取、年齢、性別、自己免疫状態を制御した上で非利用者と比較してTSHレベルの変化を示す。効果は1日の通話時間と使用年数に用量依存的である。",
        discriminating: true,
      },
      {
        id: "THYROID-2",
        text: "甲状腺がん発生率はスクリーニング増加による検出バイアスを制御した後、累積携帯電話使用量 (使用年数 × 1日の通話時間) と相関する。相関は前頸部曝露ゾーンに最も関連するサブタイプである乳頭状甲状腺がんに特異的である。",
        discriminating: true,
      },
    ],

    references: "主要な参考文献",
    refs: [
      {
        id: "f1000-emf-thyroid-review",
        citation: "F1000Research — Systematic Review",
        referenceId: "thyroid-sysrev-2024",
        finding:
          "5つの観察研究がEMF曝露と甲状腺機能低下症の間の関連を発見。月33時間を超える職業的電話使用がTSHレベルの低下と関連。",
      },
      {
        id: "pituitary-cav3-thyrotroph",
        citation: "Endocrine Reviews — Pituitary Ion Channels",
        referenceId: "ijms2026-hpg",
        finding:
          "T型 (Cav3) カルシウムチャネルが下垂体サイロトロフおよびゴナドトロフにおけるホルモン分泌を媒介。Cav3摂動が拍動性TSHおよびLH放出パターンを変化させる。",
      },
    ],

    seeAlso: "関連項目",
    pituitaryModulome: "下垂体モジュローム",
    predictionsPage: "予測 — THYROID-1/2",
    evidencePage: "エビデンス登録",
    discriminatingBadge: "弁別的",
    allPredictions: "全ての予測 →",
  },
  fr: {
    title: "Thyroide",
    subtitle:
      "Cou anterieur = exposition directe au telephone — perturbation de l'axe HPT via les thyreotrophes hypophysaires Cav3",
    backLink: "← Retour au Modulome",

    s1SectionTitle: "Axe HPT et canaux thyroidiens",

    channelProfile: "Profil des canaux",
    channel: "Canal",
    gene: "Gene",
    cellType: "Type cellulaire",
    function: "Fonction",
    level: "Niveau de preuve",
    channelVal: "Cav3 (T-type)",
    geneVal: "CACNA1G/H/I",
    cellTypeVal: "Thyreotrophe hypophysaire → TSH → Thyrocyte",
    functionVal: "Secretion de TSH — controle la synthese des hormones thyroidiennes (T3/T4)",
    levelVal: "M|C",

    s2Title: "Mecanisme de l'axe HPT",
    s2p1:
      "La production d'hormones thyroidiennes est regie par l'axe hypothalamo-hypophyso-thyroidien (HPT). L'hypothalamus libere la TRH (hormone de liberation de la thyrotropine), qui stimule les thyreotrophes hypophysaires a secreter la TSH (hormone stimulant la thyroide). La TSH entraine ensuite la glande thyroide a produire T3 et T4 — les hormones qui regulent le taux metabolique, la croissance et le developpement dans tout le corps.",
    s2p2:
      "Les thyreotrophes hypophysaires utilisent des canaux calciques voltage-dependants Cav3 de type T pour la secretion de TSH. C'est la meme classe de canaux utilisee par les gonadotrophes pour la liberation de LH/FSH — faisant de l'hypophyse un noeud de vulnerabilite partage ou les EMF peuvent simultanement perturber les axes reproducteur et thyroidien par une perturbation identique de Cav3.",
    s2p3:
      "EMF → perturbation de Cav3 dans les thyreotrophes → dysregulation de TSH → dysfonction thyroidienne. Comme la TSH controle l'ensemble de la cascade hormonale thyroidienne, meme de petites perturbations au niveau hypophysaire s'amplifient en aval en dysfonctionnement thyroidien cliniquement significatif.",

    s3Title: "Exposition hypophysaire — en dehors de la barriere hemato-encephalique",
    s3Text:
      "L'hypophyse anterieure se situe en dehors de la barriere hemato-encephalique. Contrairement aux neurones du systeme nerveux central, les thyreotrophes hypophysaires sont directement exposes au sang circulant — et a toutes les intensites de champ electromagnetique qui atteignent la circulation sanguine. Cela signifie que les EMF n'ont pas besoin de penetrer la BHE pour affecter la regulation thyroidienne. L'hypophyse est un noeud de controle endocrinien non protege, rendant la secretion hormonale dependante de Cav3 (TSH, LH, FSH, GH) directement vulnerable a la perturbation par les EMF.",

    s2SectionTitle: "Exposition du cou anterieur",

    s4Title: "Physique de la proximite du telephone",
    s4p1:
      "La glande thyroide est situee dans le cou anterieur — directement adjacente a l'endroit ou les telephones mobiles sont tenus pendant les appels vocaux. En position telephone-a-l'oreille, la thyroide est a 5–10 cm de la source d'emission RF. La loi de l'inverse du carre dicte que la densite de puissance EMF est inversement proportionnelle au carre de la distance : a 5 cm, l'intensite du champ au niveau de la thyroide est 4 fois superieure a celle a 10 cm.",
    s4p2:
      "Cela fait de la thyroide l'un des organes endocriniens les plus directement exposes au telephone dans le corps. Contrairement a l'hypophyse (qui recoit les EMF a travers le crane) ou aux gonades (typiquement a plus de 30 cm du telephone), la thyroide fait face a une exposition RF en champ proche pendant chaque appel vocal avec un blindage tissulaire minimal.",

    s5Title: "Contexte epidemiologique",
    s5Stats: [
      "L'hypothyroidie augmente globalement, avec la prevalence la plus elevee chez les femmes (ratio femme/homme de 5:1)",
      "La thyroidite de Hashimoto (auto-immune) est la cause la plus frequente d'hypothyroidie dans les pays suffisants en iode",
      "L'incidence du cancer de la thyroide a augmente d'environ 3 fois depuis les annees 1980 — en parallele avec l'adoption mondiale du telephone mobile",
      "La maladie thyroidienne auto-immune implique la voie Ca2+-calcineurine-NFAT dans les cellules T — la meme voie que la cascade BERM #10",
    ],

    s3SectionTitle: "Preuves et predictions",

    s6Title: "Chaine de preuves EMF-thyroide",
    s6Chain:
      "EMF → Cav3 perturbation (thyrotroph) → TSH dysregulation → T3/T4 imbalance → thyroid dysfunction",
    s6p1:
      "Les canaux Cav3 de type T hypophysaires sont bien etablis en physiologie endocrinienne. Le meme mecanisme qui regit la pulsatilite de la LH des gonadotrophes (modulome hypophysaire BERM) opere dans les thyreotrophes pour la secretion de TSH. Les preuves de revue systematique (F1000Research) ont identifie cinq etudes observationnelles reliant l'exposition aux EMF a l'hypothyroidie. Les travailleurs avec plus de 33 heures par mois d'utilisation du telephone avaient des niveaux de TSH plus bas.",
    s6p2:
      "L'hypothyroidie et l'hyperthyroidie reduisent toutes deux la fertilite — creant un lien direct entre la perturbation thyroidienne et le declin du taux de fecondite total. La thyroide se connecte a la voie reproductive BERM via le hub hypophysaire : la meme perturbation de Cav3 qui perturbe LH/FSH perturbe simultanement TSH, faisant de la dysfonction thyroidienne une consequence parallele du mecanisme central BERM.",

    s7Title: "Predictions BERM",
    s7Text:
      "Le cadre BERM genere deux predictions specifiques et testables pour le modulome thyroidien :",
    s7Predictions: [
      {
        id: "THYROID-1",
        text: "Les utilisateurs de telephone mobile montrent des niveaux de TSH alteres par rapport aux non-utilisateurs en controlant l'apport en iode, l'age, le sexe et le statut auto-immun. L'effet est dose-dependant de la duree quotidienne d'appel et des annees d'utilisation.",
        discriminating: true,
      },
      {
        id: "THYROID-2",
        text: "L'incidence du cancer de la thyroide est correlee a l'utilisation cumulative du telephone mobile (annees d'utilisation × duree quotidienne d'appel) apres controle du biais de detection lie au depistage accru. La correlation est specifique au carcinome papillaire de la thyroide, le sous-type le plus associe a la zone d'exposition du cou anterieur.",
        discriminating: true,
      },
    ],

    references: "References cles",
    refs: [
      {
        id: "f1000-emf-thyroid-review",
        citation: "F1000Research — Systematic Review",
        referenceId: "thyroid-sysrev-2024",
        finding:
          "Cinq etudes observationnelles ont trouve des associations entre l'exposition aux EMF et l'hypothyroidie. L'utilisation professionnelle du telephone depassant 33 heures par mois etait associee a des niveaux de TSH plus bas.",
      },
      {
        id: "pituitary-cav3-thyrotroph",
        citation: "Endocrine Reviews — Pituitary Ion Channels",
        referenceId: "ijms2026-hpg",
        finding:
          "Les canaux calciques de type T (Cav3) medient la secretion hormonale dans les thyreotrophes et gonadotrophes hypophysaires. La perturbation de Cav3 altere les profils de secretion pulsatile de TSH et LH.",
      },
    ],

    seeAlso: "Voir aussi",
    pituitaryModulome: "Modulome hypophysaire",
    predictionsPage: "Predictions — THYROID-1/2",
    evidencePage: "Registre des preuves",
    discriminatingBadge: "Discriminant",
    allPredictions: "Toutes les predictions →",
  },
  ko: {
    title: "갑상선",
    subtitle:
      "전경부 = 직접적인 휴대폰 노출 — 뇌하수체 갑상선자극세포 Cav3를 통한 HPT 축 교란",
    backLink: "← 모듈롬으로 돌아가기",

    s1SectionTitle: "HPT 축과 갑상선 채널",

    channelProfile: "채널 프로파일",
    channel: "채널",
    gene: "유전자",
    cellType: "세포 유형",
    function: "기능",
    level: "증거 수준",
    channelVal: "Cav3 (T-type)",
    geneVal: "CACNA1G/H/I",
    cellTypeVal: "뇌하수체 갑상선자극세포 → TSH → 갑상선세포",
    functionVal: "TSH 분비 — 갑상선 호르몬 합성 (T3/T4) 제어",
    levelVal: "M|C",

    s2Title: "HPT 축 메커니즘",
    s2p1:
      "갑상선 호르몬 생산은 시상하부-뇌하수체-갑상선 (HPT) 축에 의해 지배된다. 시상하부가 TRH (갑상선자극호르몬방출호르몬)를 방출하여 뇌하수체 갑상선자극세포를 자극해 TSH (갑상선자극호르몬)를 분비하게 한다. TSH는 갑상선이 T3와 T4 — 전신의 대사율, 성장, 발달을 조절하는 호르몬 — 를 생산하도록 유도한다.",
    s2p2:
      "뇌하수체 갑상선자극세포는 TSH 분비에 Cav3 T형 전압 의존성 칼슘 채널을 사용한다. 이것은 성선자극세포가 LH/FSH 방출에 사용하는 것과 동일한 채널 클래스로, 뇌하수체를 EMF가 동일한 Cav3 교란을 통해 생식축과 갑상선축을 동시에 교란할 수 있는 공유 취약성 노드로 만든다.",
    s2p3:
      "EMF → 갑상선자극세포에서의 Cav3 교란 → TSH 조절장애 → 갑상선 기능장애. TSH가 전체 갑상선 호르몬 캐스케이드를 제어하기 때문에, 뇌하수체 수준에서의 작은 교란도 하류에서 임상적으로 유의한 갑상선 기능장애로 증폭된다.",

    s3Title: "뇌하수체 노출 — 혈액뇌장벽 외부",
    s3Text:
      "전엽 뇌하수체는 혈액뇌장벽 외부에 위치한다. 중추신경계 내의 뉴런과 달리 뇌하수체 갑상선자극세포는 순환 혈액에 직접 노출된다 — 그리고 혈류에 도달하는 모든 전자기장 강도에도. 이것은 EMF가 갑상선 조절에 영향을 미치기 위해 BBB를 관통할 필요가 없음을 의미한다. 뇌하수체는 차폐되지 않은 내분비 제어 노드로, Cav3 의존 호르몬 분비 (TSH, LH, FSH, GH)가 EMF 교란에 직접 취약하다.",

    s2SectionTitle: "전경부 노출",

    s4Title: "휴대폰 근접 물리학",
    s4p1:
      "갑상선은 전경부에 위치한다 — 음성 통화 중 휴대폰을 들고 있는 위치에 직접 인접한다. 귀에 대고 있는 위치에서 갑상선은 RF 방출원으로부터 5–10cm 거리에 있다. 역제곱 법칙에 의해 EMF 전력밀도는 거리의 제곱에 반비례한다: 5cm에서 갑상선의 장 강도는 10cm의 4배이다.",
    s4p2:
      "이것은 갑상선을 체내에서 가장 직접적으로 휴대폰 노출을 받는 내분비 기관 중 하나로 만든다. 뇌하수체 (두개골을 통해 EMF 수신)나 생식선 (일반적으로 전화에서 30cm 이상)과 달리, 갑상선은 최소한의 조직 차폐로 모든 음성 통화 중 근접장 RF 노출에 직면한다.",

    s5Title: "역학적 맥락",
    s5Stats: [
      "갑상선기능저하증이 전 세계적으로 증가하고 있으며, 여성에서 가장 높은 유병률 (여성 대 남성 비율 5:1)",
      "하시모토 갑상선염 (자가면역)은 요오드 충분 국가에서 갑상선기능저하증의 가장 흔한 원인이다",
      "갑상선암 발생률이 1980년대 이후 약 3배 증가 — 전 세계 휴대전화 보급과 병행",
      "자가면역 갑상선 질환은 T세포에서 Ca2+-칼시뉴린-NFAT 경로를 사용 — BERM 캐스케이드 #10과 동일한 경로",
    ],

    s3SectionTitle: "증거 및 예측",

    s6Title: "EMF-갑상선 증거 체인",
    s6Chain:
      "EMF → Cav3 perturbation (thyrotroph) → TSH dysregulation → T3/T4 imbalance → thyroid dysfunction",
    s6p1:
      "뇌하수체 Cav3 T형 채널은 내분비 생리학에서 잘 확립되어 있다. 성선자극세포의 LH 박동성을 지배하는 동일한 메커니즘 (BERM 뇌하수체 모듈롬)이 갑상선자극세포에서 TSH 분비에 작동한다. 체계적 검토 증거 (F1000Research)는 EMF 노출과 갑상선기능저하증을 연결하는 5개의 관찰 연구를 확인했다. 월 33시간 이상 전화 사용 근로자에서 TSH 수준이 낮게 나타났다.",
    s6p2:
      "갑상선기능저하증과 갑상선기능항진증 모두 생식력을 감소시킨다 — 갑상선 교란과 합계출산율 감소 사이에 직접적 연결을 만든다. 갑상선은 뇌하수체 허브를 통해 BERM 생식 경로에 연결된다: LH/FSH를 교란하는 동일한 Cav3 교란이 동시에 TSH를 교란하여, 갑상선 기능장애를 중심 BERM 메커니즘의 병행적 결과로 만든다.",

    s7Title: "BERM 예측",
    s7Text:
      "BERM 프레임워크는 갑상선 모듈롬에 대해 두 가지 구체적이고 검증 가능한 예측을 생성한다:",
    s7Predictions: [
      {
        id: "THYROID-1",
        text: "휴대전화 사용자는 요오드 섭취, 나이, 성별, 자가면역 상태를 통제한 후 비사용자와 비교하여 변화된 TSH 수준을 보인다. 효과는 일일 통화 시간과 사용 연수에 용량 의존적이다.",
        discriminating: true,
      },
      {
        id: "THYROID-2",
        text: "갑상선암 발생률은 스크리닝 증가에 의한 검출 편향을 통제한 후 누적 휴대전화 사용량 (사용 연수 × 일일 통화 시간)과 상관관계가 있다. 상관관계는 전경부 노출 구역과 가장 관련된 하위 유형인 유두상 갑상선 암종에 특이적이다.",
        discriminating: true,
      },
    ],

    references: "주요 참고문헌",
    refs: [
      {
        id: "f1000-emf-thyroid-review",
        citation: "F1000Research — Systematic Review",
        referenceId: "thyroid-sysrev-2024",
        finding:
          "5개의 관찰 연구가 EMF 노출과 갑상선기능저하증 사이의 연관성을 발견. 월 33시간을 초과하는 직업적 전화 사용이 낮은 TSH 수준과 관련.",
      },
      {
        id: "pituitary-cav3-thyrotroph",
        citation: "Endocrine Reviews — Pituitary Ion Channels",
        referenceId: "ijms2026-hpg",
        finding:
          "T형 (Cav3) 칼슘 채널이 뇌하수체 갑상선자극세포 및 성선자극세포에서 호르몬 분비를 매개. Cav3 교란이 박동성 TSH 및 LH 방출 패턴을 변화시킨다.",
      },
    ],

    seeAlso: "참고 항목",
    pituitaryModulome: "뇌하수체 모듈롬",
    predictionsPage: "예측 — THYROID-1/2",
    evidencePage: "증거 등록부",
    discriminatingBadge: "변별적",
    allPredictions: "모든 예측 →",
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

export default async function ThyroidPage({
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

      <PageHeader icon={Thermometer} title={d.title} subtitle={d.subtitle} />

      <div className="mb-4 mt-12">
        <h2 className="text-xl font-bold text-foreground tracking-tight">
          {d.s1SectionTitle}
        </h2>
        <div className="h-px bg-accent/30 mt-2" />
      </div>

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
              <span className="text-[0.65rem] font-semibold px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-600 dark:text-amber-400">
                {d.levelVal}
              </span>
            </span>
          </div>
        </div>
      </section>

      <section className="mb-16 border-t editorial-rule pt-6">
        <h3 className="text-lg font-semibold mb-4">
          <span className="font-mono-num text-xs text-accent mr-2">02</span>
          {d.s2Title}
        </h3>
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

      <section className="mb-16 border-t editorial-rule pt-6">
        <h3 className="text-lg font-semibold mb-4">
          <span className="font-mono-num text-xs text-accent mr-2">03</span>
          {d.s3Title}
        </h3>
        <div className="rounded-lg bg-amber-500/10 border border-amber-500/20 p-5">
          <p className="text-sm text-foreground-muted leading-relaxed">
            {d.s3Text}
          </p>
        </div>
      </section>

      <div className="mb-4 mt-12">
        <h2 className="text-xl font-bold text-foreground tracking-tight">
          {d.s2SectionTitle}
        </h2>
        <div className="h-px bg-accent/30 mt-2" />
      </div>

      <section className="mb-16 border-t editorial-rule pt-6">
        <h3 className="text-lg font-semibold mb-4">
          <span className="font-mono-num text-xs text-accent mr-2">04</span>
          {d.s4Title}
        </h3>
        <div className="space-y-4 text-sm text-foreground-muted leading-relaxed max-w-4xl">
          <p className="editorial-rail text-[0.95rem] text-foreground">
            {d.s4p1}
          </p>
          <p>{d.s4p2}</p>
        </div>
      </section>

      <section className="mb-16 border-t editorial-rule pt-6">
        <h3 className="text-lg font-semibold mb-4">
          <span className="font-mono-num text-xs text-accent mr-2">05</span>
          {d.s5Title}
        </h3>
        <ul className="space-y-3 text-sm text-foreground-muted leading-relaxed max-w-4xl">
          {d.s5Stats.map((stat, i) => (
            <li key={i} className="pl-1 flex gap-2">
              <span className="text-accent shrink-0">*</span>
              <span>{stat}</span>
            </li>
          ))}
        </ul>
      </section>

      <div className="mb-4 mt-12">
        <h2 className="text-xl font-bold text-foreground tracking-tight">
          {d.s3SectionTitle}
        </h2>
        <div className="h-px bg-accent/30 mt-2" />
      </div>

      <section className="mb-16 border-t editorial-rule pt-6">
        <h3 className="text-lg font-semibold mb-4">
          <span className="font-mono-num text-xs text-accent mr-2">06</span>
          {d.s6Title}
        </h3>

        <div className="bg-card rounded-lg border border-card-border p-5 mb-6">
          <p className="font-mono text-sm text-accent leading-relaxed text-center">
            {d.s6Chain}
          </p>
        </div>

        <div className="space-y-4 text-sm text-foreground-muted leading-relaxed max-w-4xl">
          <p className="editorial-rail text-[0.95rem] text-foreground">
            {d.s6p1}
          </p>
          <p>{d.s6p2}</p>
        </div>
      </section>

      <section className="mb-16 border-t editorial-rule pt-6">
        <h3 className="text-lg font-semibold mb-4">
          <span className="font-mono-num text-xs text-accent mr-2">07</span>
          {d.s7Title}
        </h3>

        <p className="text-sm text-foreground-muted leading-relaxed max-w-4xl mb-6">
          {d.s7Text}
        </p>

        <div className="space-y-4">
          {d.s7Predictions.map((pred) => (
            <div
              key={pred.id}
              className="border-l-4 border-green-500 rounded-r-lg bg-card p-4"
            >
              <div className="flex items-start justify-between gap-2 mb-2">
                <span className="font-mono-num text-xs font-bold text-accent">
                  {pred.id}
                </span>
                {pred.discriminating && (
                  <span className="shrink-0 text-[0.65rem] font-semibold px-1.5 py-0.5 rounded bg-green-500/10 text-green-600 dark:text-green-400">
                    {d.discriminatingBadge}
                  </span>
                )}
              </div>
              <p className="text-sm text-foreground-muted leading-relaxed">
                {pred.text}
              </p>
            </div>
          ))}
          <Link
            href={`/${locale}/predictions`}
            className="text-xs text-accent hover:underline mt-2 inline-block"
          >
            {d.allPredictions}
          </Link>
        </div>
      </section>

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

      <section className="border-t editorial-rule pt-6">
        <h3 className="text-sm font-semibold text-foreground mb-3">
          {d.seeAlso}
        </h3>
        <div className="flex gap-6 flex-wrap">
          <Link
            href={`/${locale}/modulome/pituitary`}
            className="text-sm text-accent hover:underline"
          >
            {d.pituitaryModulome} &rarr;
          </Link>
          <Link
            href={`/${locale}/predictions`}
            className="text-sm text-accent hover:underline"
          >
            {d.predictionsPage} &rarr;
          </Link>
          <Link
            href={`/${locale}/evidence`}
            className="text-sm text-accent hover:underline"
          >
            {d.evidencePage} &rarr;
          </Link>
        </div>
      </section>
    </div>
  );
}
