import type { Metadata } from "next";
import Link from "next/link";
import { Zap } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { pickCopy } from "@/lib/i18n";
import { CitationLink } from "@/components/CitationLink";
import { InlineReferenceText } from "@/components/InlineReferenceText";
import { StudyCitation } from "@/components/StudyCitation";

const COPY = {
  en: {
    title: "Pain Pathways (DRG)",
    subtitle:
      "Cav3.2 T-type calcium channels in dorsal root ganglion nociceptors",
    backLink: "← Back to Modulome",

    /* --- SECTION 1: Cav3.2 — The Primary Pain Channel --- */
    s1SectionTitle: "Cav3.2 — The Primary Pain Channel",

    channelProfile: "Channel Profile",
    channel: "Channel",
    cellType: "Cell type",
    function: "Function",
    level: "Evidence level",
    cav3Subtype: "Cav3.2 (CACNA1H) — dominant T-type in DRG",
    cellTypeVal: "Nociceptors (dorsal root ganglion)",
    functionVal: "Peripheral pain sensing, neuronal excitability",
    levelVal: "M|C",

    s1Points: [
      "Cav3.2 (CACNA1H) is the dominant T-type calcium channel in DRG nociceptors — it controls neuronal excitability at the peripheral pain sensing level ([[ref:cav32-chronic-pain-2021|Snutch & Bhargava 2021]]).",
      "Cav3.2 expression and activity are significantly upregulated in both inflammatory and neuropathic pain models.",
      "T-type channel blockers are effective analgesics in multiple pain models, confirming the causal role of these channels in pain signaling.",
      "This is the same Cav3.2 channel that BERM identifies as the pathway-A transduction step — the channel sits at a bifurcation point where ~10% are open at resting potential (window current).",
    ],

    /* --- SECTION 2: Sex Differences in Pain --- */
    s2SectionTitle: "Sex Differences in Pain",

    s2Points: [
      "[[ref:brain-2026-cav32-human-drg|Brain (Oxford) 2026]]: functional Cav3.2 expression in human DRG neurons shows sex differences.",
      "Female DRG neurons show more prominent Cav3.2 currents.",
      "This aligns with the well-documented clinical observation that chronic pain conditions disproportionately affect women.",
      "From the BERM perspective: if EMF perturbs Cav3.2 in DRG neurons, the sex-differential expression predicts stronger EMF-pain sensitization in females.",
    ],
    s2EpidemicNote:
      "Chronic pain epidemic: hundreds of millions affected globally. This is one of the largest unresolved medical challenges worldwide.",

    /* --- SECTION 3: EMF and Pain Sensitization --- */
    s3SectionTitle: "EMF and Pain Sensitization",

    s3Mechanism: "Mechanism chain",
    s3MechanismText:
      "EMF → Cav3.2 perturbation in DRG → Ca²⁺ influx ↑ → neuronal excitability ↑ → pain threshold ↓",

    s3UnifyingTitle: "Unifying mechanism",
    s3UnifyingText:
      "The same T-type bifurcation mechanism that operates in Leydig cells (fertility) and thalamocortical neurons (sleep) operates in DRG nociceptors (pain). This is NOT a separate hypothesis — it is the same biophysical mechanism in a different cell type.",

    s3WarningLabel: "Sensitive topic — methodological note",
    s3Warning:
      "Chronic pain affects hundreds of millions of people. The mechanism described here is a MECHANISTIC FINDING from the BERM framework — NOT a treatment recommendation. Do NOT present this as medical advice. Patients should consult their healthcare providers regarding pain management.",

    s3PredTitle: "Key prediction",
    s3Pred: {
      id: "PAIN-1",
      text: "Cav3.2 blocker attenuates EMF-induced pain sensitization in animal model. This is testable in existing neuropathic pain models by adding an EMF exposure arm and comparing Cav3.2 blocker efficacy with and without EMF.",
      discriminating: true,
    },

    s3TheraBionic: "TheraBionic connection",
    s3TheraBionicText:
      "The TheraBionic device — FDA-approved for hepatocellular carcinoma — targets Cav3.2 channels with non-thermal EMF. This confirms that Cav3.2 responds to non-thermal EMF at therapeutic levels, providing independent validation that the channel is an EMF transducer.",

    /* References */
    refsTitle: "Key references",
    refs: [
      {
        id: "cav32-chronic-pain-2021",
        label: "Cav3.2 in chronic pain (2021)",
      },
      {
        id: "brain-2026-cav32-human-drg",
        label: "Brain 2026: Cav3.2 sex differences in human DRG",
      },
      {
        id: "therabionic-ebioMedicine-2019",
        label: "TheraBionic — eBioMedicine (2019)",
      },
    ],

    /* See also */
    seeAlso: "See also",
    brainModulome: "Brain modulome",
    predictionsPage: "Predictions — PAIN-1",
    evidencePage: "Evidence register",

    /* Keys for inline labels */
    keyEvidenceLabel: "Key Evidence",
    sexDiffLabel: "Sex-Differential Expression",
    discriminatingLabel: "Discriminating",
    allPredictionsLabel: "All predictions →",
  },
  fi: {
    title: "Kipureitit (DRG)",
    subtitle:
      "Cav3.2 T-tyypin kalsiumkanavat selkäytimen takajuuren ganglion nosiseptoreissa",
    backLink: "← Takaisin moduloomiin",

    /* --- OSIO 1: Cav3.2 — Ensisijainen kipukanava --- */
    s1SectionTitle: "Cav3.2 — Ensisijainen kipukanava",

    channelProfile: "Kanavaprofiili",
    channel: "Kanava",
    cellType: "Solutyyppi",
    function: "Toiminto",
    level: "Näyttötaso",
    cav3Subtype: "Cav3.2 (CACNA1H) — hallitseva T-tyyppi DRG:ssä",
    cellTypeVal: "Nosiseptorit (selkäytimen takajuuren gangliot)",
    functionVal: "Perifeerinen kipuaistimus, hermosolun ärtyvyys",
    levelVal: "M|C",

    s1Points: [
      "Cav3.2 (CACNA1H) on hallitseva T-tyypin kalsiumkanava DRG-nosiseptoreissa — se kontrolloi hermosolun ärtyvyyttä perifeerisellä kipuaistimuksen tasolla ([[ref:cav32-chronic-pain-2021|Snutch & Bhargava 2021]]).",
      "Cav3.2-ekspressio ja -aktiivisuus ovat merkittävästi ylössäädeltyjä sekä tulehduksellisissa että neuropaattisissa kipumalleissa.",
      "T-tyypin kanavien salpaajat ovat tehokkaita analgeetteja useissa kipumalleissa, mikä vahvistaa näiden kanavien kausaalisen roolin kipusignaloinnissa.",
      "Tämä on sama Cav3.2-kanava, jonka BERM tunnistaa ENSISIJAISEKSI EMF-TRANSDUSERIKSI — kanava on bifurkaatiopisteessä, jossa ~10 % on auki lepokalvopotentiaalissa (ikkuna-virta).",
    ],

    /* --- OSIO 2: Sukupuolierot kivussa --- */
    s2SectionTitle: "Sukupuolierot kivussa",

    s2Points: [
      "[[ref:brain-2026-cav32-human-drg|Brain (Oxford) 2026]]: funktionaalinen Cav3.2-ekspressio ihmisen DRG-neuroneissa osoittaa sukupuolieroja.",
      "Naisten DRG-neuronit osoittavat voimakkaampia Cav3.2-virtoja.",
      "Tämä on linjassa hyvin dokumentoidun kliinisen havainnon kanssa, että krooniset kiputilat vaikuttavat suhteettomasti naisiin.",
      "BERM-näkökulmasta: jos EMF häiritsee Cav3.2:ta DRG-neuroneissa, sukupuolisidonnainen ekspressioero ennustaa voimakkaampaa EMF-kipuherkistymistä naisilla.",
    ],
    s2EpidemicNote:
      "Krooninen kipuepidemia: satoja miljoonia ihmisiä kärsii maailmanlaajuisesti. Tämä on yksi suurimmista ratkaisemattomista lääketieteellisistä haasteista.",

    /* --- OSIO 3: EMF ja kipuherkistyminen --- */
    s3SectionTitle: "EMF ja kipuherkistyminen",

    s3Mechanism: "Mekanismiketju",
    s3MechanismText:
      "EMF → Cav3.2-häiriö DRG:ssä → Ca²⁺-virtaus ↑ → hermosolun ärtyvyys ↑ → kipukynnys ↓",

    s3UnifyingTitle: "Yhdistävä mekanismi",
    s3UnifyingText:
      "Sama T-tyypin bifurkaatiomekanismi, joka toimii Leydigin soluissa (hedelmällisyys) ja talamokortikaalissa neuroneissa (uni), toimii DRG-nosiseptoreissa (kipu). Tämä EI ole erillinen hypoteesi — se on sama biofysikaalinen mekanismi eri solutyypissä.",

    s3WarningLabel: "Herkkä aihe — metodologinen huomautus",
    s3Warning:
      "Krooninen kipu vaikuttaa satoihin miljooniin ihmisiin. Tässä kuvattu mekanismi on MEKANISTINEN LÖYDÖS BERM-kehyksestä — EI hoitosuositus. ÄLÄ esitä tätä lääketieteellisenä neuvona. Potilaiden tulee konsultoida terveydenhuollon ammattilaisiaan kivunhoidon suhteen.",

    s3PredTitle: "Keskeinen ennuste",
    s3Pred: {
      id: "PAIN-1",
      text: "Cav3.2-salpaaja vaimentaa EMF-aiheutettua kipuherkistymistä eläinmallissa. Tämä on testattavissa olemassa olevissa neuropaattisissa kipumalleissa lisäämällä EMF-altistusryhmä ja vertaamalla Cav3.2-salpaajan tehoa EMF-altistuksen kanssa ja ilman.",
      discriminating: true,
    },

    s3TheraBionic: "TheraBionic-yhteys",
    s3TheraBionicText:
      "TheraBionic-laite — FDA-hyväksytty hepatosellulaariseen karsinoomaan — kohdistuu Cav3.2-kanaviin ei-termisellä EMF:llä. Tämä vahvistaa, että Cav3.2 reagoi ei-termiseen EMF:ään terapeuttisilla tasoilla, tarjoten riippumattoman todentamisen kanavan roolista EMF-transduserina.",

    /* Viitteet */
    refsTitle: "Keskeiset viitteet",
    refs: [
      {
        id: "cav32-chronic-pain-2021",
        label: "Cav3.2 kroonisessa kivussa (2021)",
      },
      {
        id: "brain-2026-cav32-human-drg",
        label: "Brain 2026: Cav3.2 sukupuolierot ihmisen DRG:ssä",
      },
      {
        id: "therabionic-ebioMedicine-2019",
        label: "TheraBionic — eBioMedicine (2019)",
      },
    ],

    /* Katso myös */
    seeAlso: "Katso myös",
    brainModulome: "Aivojen moduloomi",
    predictionsPage: "Ennusteet — PAIN-1",
    evidencePage: "Näyttörekisteri",

    keyEvidenceLabel: "Keskeinen näyttö",
    sexDiffLabel: "Sukupuolisidonnainen ekspressio",
    discriminatingLabel: "Erotteleva",
    allPredictionsLabel: "Kaikki ennusteet →",
  },
  ja: {
    title: "疼痛経路 (DRG)",
    subtitle:
      "後根神経節の侵害受容器におけるCav3.2 T型カルシウムチャネル",
    backLink: "← Modulomeに戻る",

    s1SectionTitle: "Cav3.2 — 主要な疼痛チャネル",

    channelProfile: "チャネルプロファイル",
    channel: "チャネル",
    cellType: "細胞型",
    function: "機能",
    level: "エビデンスレベル",
    cav3Subtype: "Cav3.2 (CACNA1H) — DRGにおける主要T型",
    cellTypeVal: "侵害受容器（後根神経節）",
    functionVal: "末梢痛覚、神経興奮性",
    levelVal: "M|C",

    s1Points: [
      "Cav3.2 (CACNA1H) はDRG侵害受容器における主要なT型カルシウムチャネルであり、末梢痛覚レベルで神経興奮性を制御する（[[ref:cav32-chronic-pain-2021|Snutch & Bhargava 2021]]）。",
      "Cav3.2の発現と活性は、炎症性および神経障害性疼痛モデルの両方で著しく上方制御される。",
      "T型チャネル遮断薬は複数の疼痛モデルで有効な鎮痛薬であり、疼痛シグナル伝達におけるこれらのチャネルの因果的役割を確認している。",
      "これはBERMが主要なEMFトランスデューサーと同定する同じCav3.2チャネルである。このチャネルは静止膜電位で約10%が開いている（ウィンドウ電流）分岐点に位置する。",
    ],

    s2SectionTitle: "疼痛における性差",

    s2Points: [
      "[[ref:brain-2026-cav32-human-drg|Brain (Oxford) 2026]]: ヒトDRGニューロンにおける機能的Cav3.2発現に性差がある。",
      "女性のDRGニューロンはより顕著なCav3.2電流を示す。",
      "これは、慢性疼痛疾患が女性に不均衡に影響するという十分に文書化された臨床観察と一致する。",
      "BERMの観点から：EMFがDRGニューロンのCav3.2を撹乱する場合、性差のある発現は女性においてより強いEMF疼痛感作を予測する。",
    ],
    s2EpidemicNote:
      "慢性疼痛の流行：世界中で数億人が罹患。これは世界で最大の未解決の医学的課題の一つである。",

    s3SectionTitle: "EMFと疼痛感作",

    s3Mechanism: "メカニズムチェーン",
    s3MechanismText:
      "EMF → DRGにおけるCav3.2撹乱 → Ca²⁺流入↑ → 神経興奮性↑ → 疼痛閾値↓",

    s3UnifyingTitle: "統一メカニズム",
    s3UnifyingText:
      "Leydig細胞（生殖能力）と視床皮質ニューロン（睡眠）で働くものと同じT型分岐メカニズムが、DRG侵害受容器（疼痛）でも働く。これは別個の仮説ではなく、異なる細胞型における同じ生物物理学的メカニズムである。",

    s3WarningLabel: "デリケートなトピック — 方法論的注記",
    s3Warning:
      "慢性疼痛は数億人に影響する。ここで説明するメカニズムはBERMフレームワークによる機序的知見であり、治療推奨ではない。医療上の助言として提示してはならない。患者は疼痛管理について医療従事者に相談すべきである。",

    s3PredTitle: "主要予測",
    s3Pred: {
      id: "PAIN-1",
      text: "Cav3.2遮断薬が動物モデルにおけるEMF誘発疼痛感作を減弱させる。これは既存の神経障害性疼痛モデルにEMF曝露群を追加し、EMFの有無でCav3.2遮断薬の有効性を比較することで検証可能である。",
      discriminating: true,
    },

    s3TheraBionic: "TheraBionicとの関連",
    s3TheraBionicText:
      "肝細胞癌に対してFDA承認されたTheraBionic装置は、非熱性EMFでCav3.2チャネルを標的とする。これはCav3.2が治療レベルの非熱性EMFに応答することを確認し、このチャネルがEMFトランスデューサーであることを独立に検証する。",

    refsTitle: "主要参考文献",
    refs: [
      {
        id: "cav32-chronic-pain-2021",
        label: "慢性疼痛におけるCav3.2 (2021)",
      },
      {
        id: "brain-2026-cav32-human-drg",
        label: "Brain 2026: ヒトDRGにおけるCav3.2の性差",
      },
      {
        id: "therabionic-ebioMedicine-2019",
        label: "TheraBionic — eBioMedicine (2019)",
      },
    ],

    seeAlso: "関連項目",
    brainModulome: "脳モジュローム",
    predictionsPage: "予測 — PAIN-1",
    evidencePage: "エビデンスレジスター",

    keyEvidenceLabel: "主要エビデンス",
    sexDiffLabel: "性差のある発現",
    discriminatingLabel: "弁別的",
    allPredictionsLabel: "すべての予測 →",
  },
  fr: {
    title: "Voies de la douleur (DRG)",
    subtitle:
      "Canaux calciques Cav3.2 de type T dans les nocicepteurs du ganglion rachidien dorsal",
    backLink: "← Retour au Modulome",

    s1SectionTitle: "Cav3.2 — Le canal principal de la douleur",

    channelProfile: "Profil du canal",
    channel: "Canal",
    cellType: "Type cellulaire",
    function: "Fonction",
    level: "Niveau de preuve",
    cav3Subtype: "Cav3.2 (CACNA1H) — type T dominant dans le DRG",
    cellTypeVal: "Nocicepteurs (ganglion rachidien dorsal)",
    functionVal: "Perception de la douleur peripherique, excitabilite neuronale",
    levelVal: "M|C",

    s1Points: [
      "Cav3.2 (CACNA1H) est le canal calcique de type T dominant dans les nocicepteurs du DRG — il controle l'excitabilite neuronale au niveau de la perception peripherique de la douleur ([[ref:cav32-chronic-pain-2021|Snutch & Bhargava 2021]]).",
      "L'expression et l'activite de Cav3.2 sont significativement surregulees dans les modeles de douleur inflammatoire et neuropathique.",
      "Les bloqueurs des canaux de type T sont des analgesiques efficaces dans de multiples modeles de douleur, confirmant le role causal de ces canaux dans la signalisation de la douleur.",
      "C'est le meme canal Cav3.2 que BERM identifie comme le TRANSDUCTEUR EMF PRINCIPAL — le canal se trouve a un point de bifurcation ou environ 10 % sont ouverts au potentiel de repos (courant de fenetre).",
    ],

    s2SectionTitle: "Differences sexuelles dans la douleur",

    s2Points: [
      "[[ref:brain-2026-cav32-human-drg|Brain (Oxford) 2026]] : l'expression fonctionnelle de Cav3.2 dans les neurones DRG humains montre des differences sexuelles.",
      "Les neurones DRG feminins presentent des courants Cav3.2 plus prominents.",
      "Cela correspond a l'observation clinique bien documentee selon laquelle les conditions de douleur chronique affectent de maniere disproportionnee les femmes.",
      "Du point de vue BERM : si les EMF perturbent Cav3.2 dans les neurones DRG, l'expression differentielle selon le sexe predit une sensibilisation EMF-douleur plus forte chez les femmes.",
    ],
    s2EpidemicNote:
      "Epidemie de douleur chronique : des centaines de millions de personnes touchees dans le monde. C'est l'un des plus grands defis medicaux non resolus a l'echelle mondiale.",

    s3SectionTitle: "EMF et sensibilisation a la douleur",

    s3Mechanism: "Chaine mecanistique",
    s3MechanismText:
      "EMF → perturbation de Cav3.2 dans le DRG → influx Ca²⁺ ↑ → excitabilite neuronale ↑ → seuil de douleur ↓",

    s3UnifyingTitle: "Mecanisme unificateur",
    s3UnifyingText:
      "Le meme mecanisme de bifurcation de type T qui opere dans les cellules de Leydig (fertilite) et les neurones thalamocorticaux (sommeil) opere dans les nocicepteurs du DRG (douleur). Ce n'est PAS une hypothese distincte — c'est le meme mecanisme biophysique dans un autre type cellulaire.",

    s3WarningLabel: "Sujet sensible — note methodologique",
    s3Warning:
      "La douleur chronique affecte des centaines de millions de personnes. Le mecanisme decrit ici est une DECOUVERTE MECANISTIQUE du cadre BERM — PAS une recommandation de traitement. Ne PAS le presenter comme un avis medical. Les patients doivent consulter leurs professionnels de sante pour la prise en charge de la douleur.",

    s3PredTitle: "Prediction cle",
    s3Pred: {
      id: "PAIN-1",
      text: "Un bloqueur de Cav3.2 attenue la sensibilisation a la douleur induite par les EMF dans un modele animal. Ceci est testable dans les modeles de douleur neuropathique existants en ajoutant un bras d'exposition aux EMF et en comparant l'efficacite du bloqueur Cav3.2 avec et sans EMF.",
      discriminating: true,
    },

    s3TheraBionic: "Connexion TheraBionic",
    s3TheraBionicText:
      "Le dispositif TheraBionic — approuve par la FDA pour le carcinome hepatocellulaire — cible les canaux Cav3.2 avec des EMF non thermiques. Cela confirme que Cav3.2 repond aux EMF non thermiques a des niveaux therapeutiques et fournit une validation independante du role du canal comme transducteur EMF.",

    refsTitle: "References cles",
    refs: [
      {
        id: "cav32-chronic-pain-2021",
        label: "Cav3.2 dans la douleur chronique (2021)",
      },
      {
        id: "brain-2026-cav32-human-drg",
        label: "Brain 2026 : differences sexuelles de Cav3.2 dans le DRG humain",
      },
      {
        id: "therabionic-ebioMedicine-2019",
        label: "TheraBionic — eBioMedicine (2019)",
      },
    ],

    seeAlso: "Voir aussi",
    brainModulome: "Modulome cerebral",
    predictionsPage: "Predictions — PAIN-1",
    evidencePage: "Registre des preuves",

    keyEvidenceLabel: "Preuves cles",
    sexDiffLabel: "Expression differentielle selon le sexe",
    discriminatingLabel: "Discriminant",
    allPredictionsLabel: "Toutes les predictions →",
  },
  ko: {
    title: "통증 경로 (DRG)",
    subtitle:
      "후근 신경절 통각수용기의 Cav3.2 T형 칼슘 채널",
    backLink: "← Modulome으로 돌아가기",

    s1SectionTitle: "Cav3.2 — 주요 통증 채널",

    channelProfile: "채널 프로필",
    channel: "채널",
    cellType: "세포 유형",
    function: "기능",
    level: "증거 수준",
    cav3Subtype: "Cav3.2 (CACNA1H) — DRG의 주요 T형",
    cellTypeVal: "통각수용기 (후근 신경절)",
    functionVal: "말초 통각, 신경 흥분성",
    levelVal: "M|C",

    s1Points: [
      "Cav3.2 (CACNA1H)는 DRG 통각수용기의 주요 T형 칼슘 채널로, 말초 통각 수준에서 신경 흥분성을 제어한다([[ref:cav32-chronic-pain-2021|Snutch & Bhargava 2021]]).",
      "Cav3.2 발현과 활성은 염증성 및 신경병성 통증 모델 모두에서 유의하게 상향 조절된다.",
      "T형 채널 차단제는 여러 통증 모델에서 효과적인 진통제로, 통증 신호 전달에서 이 채널들의 인과적 역할을 확인해 준다.",
      "이는 BERM이 주요 EMF 변환기로 식별하는 동일한 Cav3.2 채널이다. 이 채널은 안정막 전위에서 약 10%가 열려 있는(창 전류) 분기점에 위치한다.",
    ],

    s2SectionTitle: "통증의 성차",

    s2Points: [
      "[[ref:brain-2026-cav32-human-drg|Brain (Oxford) 2026]]: 인간 DRG 뉴런에서의 기능적 Cav3.2 발현이 성차를 보인다.",
      "여성 DRG 뉴런은 더 두드러진 Cav3.2 전류를 보인다.",
      "이는 만성 통증 질환이 여성에게 불균형적으로 영향을 미친다는 잘 문서화된 임상 관찰과 일치한다.",
      "BERM 관점에서: EMF가 DRG 뉴런의 Cav3.2를 교란시키면, 성별에 따른 발현 차이는 여성에서 더 강한 EMF-통증 감작을 예측한다.",
    ],
    s2EpidemicNote:
      "만성 통증 유행: 전 세계적으로 수억 명이 영향을 받고 있다. 이것은 세계에서 가장 큰 미해결 의학적 과제 중 하나이다.",

    s3SectionTitle: "EMF와 통증 감작",

    s3Mechanism: "메커니즘 사슬",
    s3MechanismText:
      "EMF → DRG에서 Cav3.2 교란 → Ca²⁺ 유입↑ → 신경 흥분성↑ → 통증 역치↓",

    s3UnifyingTitle: "통합 메커니즘",
    s3UnifyingText:
      "Leydig 세포(생식력)와 시상피질 뉴런(수면)에서 작동하는 동일한 T형 분기 메커니즘이 DRG 통각수용기(통증)에서도 작동한다. 이는 별개의 가설이 아니라 다른 세포 유형에서 작동하는 동일한 생물물리학적 메커니즘이다.",

    s3WarningLabel: "민감한 주제 — 방법론적 참고",
    s3Warning:
      "만성 통증은 수억 명에게 영향을 미친다. 여기서 설명하는 메커니즘은 BERM 프레임워크의 기전적 발견이며 치료 권고가 아니다. 의학적 조언으로 제시해서는 안 된다. 환자는 통증 관리에 대해 의료진과 상담해야 한다.",

    s3PredTitle: "핵심 예측",
    s3Pred: {
      id: "PAIN-1",
      text: "Cav3.2 차단제가 동물 모델에서 EMF 유도 통증 감작을 감소시킨다. 이것은 기존 신경병성 통증 모델에 EMF 노출군을 추가하고 EMF 유무에 따른 Cav3.2 차단제 효능을 비교하여 검증 가능하다.",
      discriminating: true,
    },

    s3TheraBionic: "TheraBionic 연결",
    s3TheraBionicText:
      "간세포암에 대해 FDA 승인을 받은 TheraBionic 장치는 비열성 EMF로 Cav3.2 채널을 표적으로 한다. 이는 Cav3.2가 치료 수준의 비열성 EMF에 반응함을 확인하며, 이 채널이 EMF 변환기라는 독립적 검증을 제공한다.",

    refsTitle: "주요 참고문헌",
    refs: [
      {
        id: "cav32-chronic-pain-2021",
        label: "만성 통증에서의 Cav3.2 (2021)",
      },
      {
        id: "brain-2026-cav32-human-drg",
        label: "Brain 2026: 인간 DRG에서의 Cav3.2 성차",
      },
      {
        id: "therabionic-ebioMedicine-2019",
        label: "TheraBionic — eBioMedicine (2019)",
      },
    ],

    seeAlso: "관련 항목",
    brainModulome: "뇌 모듈로옴",
    predictionsPage: "예측 — PAIN-1",
    evidencePage: "증거 레지스터",

    keyEvidenceLabel: "주요 증거",
    sexDiffLabel: "성별 차등 발현",
    discriminatingLabel: "변별적",
    allPredictionsLabel: "모든 예측 →",
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

export default async function PainPage({
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

      <PageHeader icon={Zap} title={d.title} subtitle={d.subtitle} />

      {/* ===================================================
          SECTION 1 -- Cav3.2: The Primary Pain Channel
          =================================================== */}
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
            <span className="text-foreground font-medium">{d.cav3Subtype}</span>
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

      {/* 02 -- Key Evidence */}
      <section className="mb-16 border-t editorial-rule pt-6">
        <h3 className="text-lg font-semibold mb-4">
          <span className="font-mono-num text-xs text-accent mr-2">02</span>
          {d.keyEvidenceLabel}
        </h3>
        <ul className="space-y-3 text-sm text-foreground-muted leading-relaxed max-w-4xl">
          {d.s1Points.map((point, i) => (
            <li key={i} className="pl-1 flex gap-2">
              <span className="text-accent shrink-0">*</span>
              <span><InlineReferenceText text={point} locale={locale} /></span>
            </li>
          ))}
        </ul>
      </section>

      {/* ===================================================
          SECTION 2 -- Sex Differences in Pain
          =================================================== */}
      <div className="mb-4 mt-12">
        <h2 className="text-xl font-bold text-foreground tracking-tight">
          {d.s2SectionTitle}
        </h2>
        <div className="h-px bg-accent/30 mt-2" />
      </div>

      {/* 03 -- Sex-Differential Expression */}
      <section className="mb-16 border-t editorial-rule pt-6">
        <h3 className="text-lg font-semibold mb-4">
          <span className="font-mono-num text-xs text-accent mr-2">03</span>
          {d.sexDiffLabel}
        </h3>
        <ul className="space-y-3 text-sm text-foreground-muted leading-relaxed max-w-4xl mb-6">
          {d.s2Points.map((point, i) => (
            <li key={i} className="pl-1 flex gap-2">
              <span className="text-accent shrink-0">*</span>
              <span><InlineReferenceText text={point} locale={locale} /></span>
            </li>
          ))}
        </ul>
        <div className="border-l-4 border-accent/40 rounded-r-lg bg-card p-5">
          <p className="text-sm text-foreground-muted leading-relaxed">
            {d.s2EpidemicNote}
          </p>
        </div>
      </section>

      {/* ===================================================
          SECTION 3 -- EMF and Pain Sensitization
          =================================================== */}
      <div className="mb-4 mt-12">
        <h2 className="text-xl font-bold text-foreground tracking-tight">
          {d.s3SectionTitle}
        </h2>
        <div className="h-px bg-accent/30 mt-2" />
      </div>

      {/* 04 -- Mechanism Chain */}
      <section className="mb-16 border-t editorial-rule pt-6">
        <h3 className="text-lg font-semibold mb-4">
          <span className="font-mono-num text-xs text-accent mr-2">04</span>
          {d.s3Mechanism}
        </h3>
        <div className="bg-card rounded-lg border border-card-border p-5">
          <p className="text-sm text-foreground font-mono leading-relaxed tracking-wide">
            {d.s3MechanismText}
          </p>
        </div>
      </section>

      {/* 05 -- Unifying Mechanism */}
      <section className="mb-16 border-t editorial-rule pt-6">
        <h3 className="text-lg font-semibold mb-4">
          <span className="font-mono-num text-xs text-accent mr-2">05</span>
          {d.s3UnifyingTitle}
        </h3>
        <div className="border-l-4 border-accent/40 rounded-r-lg bg-card p-5">
          <p className="text-sm text-foreground-muted leading-relaxed">
            {d.s3UnifyingText}
          </p>
        </div>
      </section>

      {/* Sensitive topic warning */}
      <section className="mb-16">
        <div className="rounded-lg bg-amber-500/10 border border-amber-500/20 p-5">
          <p className="text-xs font-semibold text-amber-600 dark:text-amber-400 uppercase tracking-wider mb-2">
            {d.s3WarningLabel}
          </p>
          <p className="text-sm text-foreground-muted leading-relaxed">
            {d.s3Warning}
          </p>
        </div>
      </section>

      {/* 06 -- Key Prediction */}
      <section className="mb-16 border-t editorial-rule pt-6">
        <h3 className="text-lg font-semibold mb-4">
          <span className="font-mono-num text-xs text-accent mr-2">06</span>
          {d.s3PredTitle}
        </h3>
        <div className="border-l-4 border-green-500 rounded-r-lg bg-card p-4">
          <div className="flex items-start justify-between gap-2 mb-2">
            <span className="font-mono-num text-xs font-bold text-accent">
              {d.s3Pred.id}
            </span>
            {d.s3Pred.discriminating && (
              <span className="shrink-0 text-[0.65rem] font-semibold px-1.5 py-0.5 rounded bg-green-500/10 text-green-600 dark:text-green-400">
                {d.discriminatingLabel}
              </span>
            )}
          </div>
          <p className="text-sm text-foreground-muted leading-relaxed">
            {d.s3Pred.text}
          </p>
          <Link
            href={`/${locale}/predictions`}
            className="text-xs text-accent hover:underline mt-2 inline-block"
          >
            {d.allPredictionsLabel}
          </Link>
        </div>
      </section>

      {/* 07 -- TheraBionic */}
      <section className="mb-16 border-t editorial-rule pt-6">
        <h3 className="text-lg font-semibold mb-4">
          <span className="font-mono-num text-xs text-accent mr-2">07</span>
          <StudyCitation
            referenceId="therabionic-ebioMedicine-2019"
            locale={locale}
            label={d.s3TheraBionic}
          />
        </h3>
        <p className="text-sm text-foreground-muted leading-relaxed max-w-4xl">
          {d.s3TheraBionicText}
        </p>
      </section>

      {/* Key references */}
      <section className="mb-16 border-t editorial-rule pt-6">
        <h3 className="text-sm font-semibold text-foreground mb-3">
          {d.refsTitle}
        </h3>
        <ul className="space-y-1">
          {d.refs.map((ref) => (
            <li key={ref.id} className="text-sm text-foreground-muted">
              <CitationLink
                referenceId={ref.id}
                locale={locale}
                citation={ref.label}
              />
            </li>
          ))}
        </ul>
      </section>

      {/* See also */}
      <section className="border-t editorial-rule pt-6">
        <h3 className="text-sm font-semibold text-foreground mb-3">
          {d.seeAlso}
        </h3>
        <div className="flex gap-6 flex-wrap">
          <Link
            href={`/${locale}/modulome/brain`}
            className="text-sm text-accent hover:underline"
          >
            {d.brainModulome} &rarr;
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
