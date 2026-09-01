import type { Metadata } from "next";
import Link from "next/link";
import { BrainCircuit } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { CautionBox } from "@/components/CautionBox";
import { DerivedPrediction } from "@/components/DerivedPrediction";
import { pickCopy } from "@/lib/i18n";

const COPY = {
  en: {
    title: "Four Neurodegenerations: One Mechanism",
    subtitle:
      "Alzheimer's, multiple sclerosis, Parkinson's, and ALS each attack a different cell type through Ca²⁺-dependent mechanisms. Each has pharmacological validation through Ca²⁺-targeting drugs. Same cascade, four manifestations.",
    backLink: "← Back to Evidence",
    cautionText:
      "This page presents the Ca²⁺ connection across four neurodegenerative diseases. Each disease's Ca²⁺ mechanism is independently established. The unifying EMF connection remains a BERM hypothesis.",
    labels: { cellType: "Cell type", caMechanism: "mechanism", bermConnection: "BERM connection", protectiveDrug: "Protective drug", occupationalData: "Occupational data" },

    diseasesTitle: "The four diseases",
    diseases: [
      {
        name: "Alzheimer’s disease",
        cellType: "Hippocampus / cortex",
        caMechanism:
          "PGC + cortisol↑ + melatonin↓. Intracellular Ca²⁺ dysregulation is an EARLY event preceding amyloid accumulation. Ca²⁺ directs Aβ into toxic oligomers rather than harmless fibrils.",
        bermLayers: "VK14 (cortisol→hippocampus), VK3 (PGC→melatonin), S6",
        protectiveDrug:
          "Semaglutide (GLP-1R→Ca²⁺), melatonin",
      },
      {
        name: "Multiple sclerosis",
        cellType: "OPC / myelin",
        caMechanism:
          "Cav1.2 → OPC differentiation → myelination. L-type VGCC activity is required for oligodendrocyte precursor cells to differentiate and form myelin sheaths. Disrupted Cav1.2 timing → myelination failure.",
        bermLayers: "VK20",
        protectiveDrug:
          "— (but EMF-induced Cav1.2 dysregulation → myelination timing disruption)",
      },
      {
        name: "Parkinson’s disease",
        cellType: "SNpc DA neurons",
        caMechanism:
          "Cav1.3 → pacemaker activity. Cav1.3 drives autonomous pacemaking in substantia nigra pars compacta dopaminergic neurons. Ca²⁺ overload → mitochondrial stress → selective neuronal death.",
        bermLayers: "Cav1.3 drives autonomous pacemaking in SNpc neurons; Ca²⁺ overload → mitochondrial stress → death",
        protectiveDrug:
          "Isradipine (Cav1.3 blocker, neuroprotective in animal models)",
      },
      {
        name: "ALS",
        cellType: "Motor neurons",
        caMechanism:
          "Low Ca²⁺ buffering + Ca²⁺-permeable AMPA receptors. Motor neurons have unusually low calcium-buffering capacity, making them selectively vulnerable to Ca²⁺-permeable AMPA receptor activation.",
        bermLayers: "VK45",
        protectiveDrug:
          "Riluzole (indirect — Na⁺ block → glutamate↓ → Ca²⁺↓)",
        occupational: "Electrical workers OR 1.3–1.7",
      },
    ],

    commonTitle: "Common thread",
    commonPoints: [
      "All four diseases involve Ca²⁺ overload in specific cell types",
      "Each cell type has unique vulnerability: hippocampal neurons to cortisol-driven Ca²⁺, OPCs to Cav1.2 timing, SNpc neurons to Cav1.3 pacemaker load, motor neurons to AMPA-mediated Ca²⁺",
      "Pharmacological validation: drugs targeting the Ca²⁺ mechanism show benefit in each disease",
      "EMF provides a common environmental driver through the VGCC pathway",
    ],

    tableTitle: "Different cell types, same mechanism",
    tableHeaders: {
      disease: "Disease",
      cellType: "Cell Type",
      caMechanism: "Ca²⁺ Mechanism",
      protectiveDrug: "Protective Drug",
    },
    tableRows: [
      {
        disease: "Alzheimer’s",
        cellType: "Hippocampus / cortex",
        caMechanism: "PGC + cortisol↑ + melatonin↓",
        protectiveDrug: "Semaglutide, melatonin",
      },
      {
        disease: "Multiple sclerosis",
        cellType: "OPC / myelin",
        caMechanism: "Cav1.2 → OPC differentiation",
        protectiveDrug: "—",
      },
      {
        disease: "Parkinson’s",
        cellType: "SNpc DA neurons",
        caMechanism: "Cav1.3 pacemaker overload",
        protectiveDrug: "Isradipine",
      },
      {
        disease: "ALS",
        cellType: "Motor neurons",
        caMechanism: "Low buffering + Ca²⁺-permeable AMPA",
        protectiveDrug: "Riluzole (indirect)",
      },
    ],

    predictionText:
      "Prediction E-NEW-25: ALS incidence is elevated in occupations with high EMF exposure. Electrical workers show OR 1.3–1.7 for ALS across multiple epidemiological studies.",
    predictionLink: "See predictions →",
    predictionHref: "/predictions",
  },
  fi: {
    title: "Neljä neurodegeneraatiota: Yksi mekanismi",
    subtitle:
      "Alzheimerin tauti, MS-tauti, Parkinsonin tauti ja ALS hyökkäävät kukin eri solutyyppiin Ca²⁺-riippuvaisten mekanismien kautta. Jokaisella on farmakologinen todentaminen Ca²⁺-kohdentavien lääkkeiden kautta. Sama kaskadi, neljä ilmenemismuotoa.",
    backLink: "← Takaisin näyttöön",
    cautionText:
      "Tämä sivu esittää Ca²⁺-yhteyden neljän neurodegeneratiivisen sairauden välillä. Kunkin sairauden Ca²⁺-mekanismi on itsenäisesti vahvistettu. Yhdistävä EMF-yhteys on edelleen BERM-hypoteesi.",
    labels: { cellType: "Solutyyppi", caMechanism: "mekanismi", bermConnection: "BERM-yhteys", protectiveDrug: "Suojaava lääke", occupationalData: "Ammattidata" },

    diseasesTitle: "Neljä sairautta",
    diseases: [
      {
        name: "Alzheimerin tauti",
        cellType: "Hippokampus / aivokuori",
        caMechanism:
          "PGC + kortisoli↑ + melatoniini↓. Solunsisäinen Ca²⁺-dysregulaatio on VARHAINEN tapahtuma joka edeltää amyloidin kertymistä. Ca²⁺ ohjaa Aβ:n toksisiksi oligomeereiksi harmittomien fibrillien sijaan.",
        bermLayers: "VK14 (kortisoli→hippokampus), VK3 (PGC→melatoniini), S6",
        protectiveDrug:
          "Semaglutiidi (GLP-1R→Ca²⁺), melatoniini",
      },
      {
        name: "MS-tauti",
        cellType: "OPC / myeliini",
        caMechanism:
          "Cav1.2 → OPC-erilaistuminen → myelinaatio. L-tyypin VGCC-aktiivisuus vaaditaan oligodendrosyyttien esiastesolujen erilaistumiseen ja myeliinituppien muodostamiseen. Häiriintynyt Cav1.2-ajoitus → myelinaation epäonnistuminen.",
        bermLayers: "VK20",
        protectiveDrug:
          "— (mutta EMF-aiheutettu Cav1.2-dysregulaatio → myelinaation ajoitushäiriö)",
      },
      {
        name: "Parkinsonin tauti",
        cellType: "SNpc DA-neuronit",
        caMechanism:
          "Cav1.3 → tahdistinaktiivisuus. Cav1.3 ohjaa autonomista tahdistusta substantia nigra pars compactan dopaminergisissä neuroneissa. Ca²⁺-ylikuorma → mitokondriaalinen stressi → valikoiva neuronaalinen kuolema.",
        bermLayers: "Cav1.3 ohjaa autonomista tahdistusta SNpc-neuroneissa; Ca²⁺-ylikuorma → mitokondriaalinen stressi → kuolema",
        protectiveDrug:
          "Isradipiini (Cav1.3-salpaaja, neuroprotektiivinen eläinmalleissa)",
      },
      {
        name: "ALS",
        cellType: "Motoneuronit",
        caMechanism:
          "Matala Ca²⁺-puskurointikyky + Ca²⁺-läpäisevät AMPA-reseptorit. Motoneuroneilla on poikkeuksellisen matala kalsiumin puskurointikyky, mikä tekee niistä valikoivasti haavoittuvia Ca²⁺-läpäisevän AMPA-reseptorin aktivaatiolle.",
        bermLayers: "VK45",
        protectiveDrug:
          "Rilutsoli (epäsuora — Na⁺-esto → glutamaatti↓ → Ca²⁺↓)",
        occupational: "Sähkötyöntekijät OR 1,3–1,7",
      },
    ],

    commonTitle: "Yhteinen lanka",
    commonPoints: [
      "Kaikki neljä sairautta sisältävät Ca²⁺-ylikuorman spesifisissä solutyypeissä",
      "Jokaisella solutyypillä on ainutlaatuinen haavoittuvuus: hippokampuksen neuronit kortisolivälitteiselle Ca²⁺:lle, OPC:t Cav1.2-ajoitukselle, SNpc-neuronit Cav1.3-tahdistinkuormalle, motoneuronit AMPA-välitteiselle Ca²⁺:lle",
      "Farmakologinen todentaminen: Ca²⁺-mekanismiin kohdistuvat lääkkeet osoittavat hyötyä kussakin sairaudessa",
      "EMF tarjoaa yhteisen ympäristötekijän VGCC-reitin kautta",
    ],

    tableTitle: "Eri solutyypit, sama mekanismi",
    tableHeaders: {
      disease: "Sairaus",
      cellType: "Solutyyppi",
      caMechanism: "Ca²⁺-mekanismi",
      protectiveDrug: "Suojaava lääke",
    },
    tableRows: [
      {
        disease: "Alzheimer",
        cellType: "Hippokampus / aivokuori",
        caMechanism: "PGC + kortisoli↑ + melatoniini↓",
        protectiveDrug: "Semaglutiidi, melatoniini",
      },
      {
        disease: "MS-tauti",
        cellType: "OPC / myeliini",
        caMechanism: "Cav1.2 → OPC-erilaistuminen",
        protectiveDrug: "—",
      },
      {
        disease: "Parkinson",
        cellType: "SNpc DA-neuronit",
        caMechanism: "Cav1.3-tahdistinkuorma",
        protectiveDrug: "Isradipiini",
      },
      {
        disease: "ALS",
        cellType: "Motoneuronit",
        caMechanism: "Matala puskurointi + Ca²⁺-läpäisevä AMPA",
        protectiveDrug: "Rilutsoli (epäsuora)",
      },
    ],

    predictionText:
      "Ennuste E-NEW-25: ALS-ilmaantuvuus on kohonnut ammateissa joissa EMF-altistus on korkea. Sähkötyöntekijöillä OR 1,3–1,7 ALS:lle useissa epidemiologisissa tutkimuksissa.",
    predictionLink: "Ks. ennusteet →",
    predictionHref: "/predictions",
  },
  ja: {
    title: "四つの神経変性疾患：一つのメカニズム",
    subtitle:
      "アルツハイマー病、多発性硬化症、パーキンソン病、ALSはそれぞれ異なる細胞タイプをCa²⁺依存性メカニズムを通じて攻撃する。それぞれがCa²⁺標的薬による薬理学的検証を持つ。同じカスケード、四つの発現形。",
    backLink: "← エビデンスに戻る",
    cautionText:
      "このページは四つの神経変性疾患にわたるCa²⁺の関連性を提示する。各疾患のCa²⁺メカニズムは独立に確立されている。統一的なEMFの関連性はBERM仮説のままである。",
    labels: { cellType: "細胞タイプ", caMechanism: "メカニズム", bermConnection: "BERM接続", protectiveDrug: "保護薬", occupationalData: "職業データ" },

    diseasesTitle: "四つの疾患",
    diseases: [
      {
        name: "アルツハイマー病",
        cellType: "海馬 / 大脳皮質",
        caMechanism:
          "PGC + コルチゾール↑ + メラトニン↓。細胞内Ca²⁺調節異常はアミロイド蓄積に先行する初期事象である。Ca²⁺はAβを無害なフィブリルではなく毒性オリゴマーへ導く。",
        bermLayers: "VK14 (コルチゾール→海馬), VK3 (PGC→メラトニン), S6",
        protectiveDrug:
          "セマグルチド (GLP-1R→Ca²⁺)、メラトニン",
      },
      {
        name: "多発性硬化症",
        cellType: "OPC / ミエリン",
        caMechanism:
          "Cav1.2 → OPC分化 → ミエリン化。L型VGCC活性はオリゴデンドロサイト前駆細胞の分化とミエリン鞘形成に必要である。Cav1.2タイミングの乱れ → ミエリン化の失敗。",
        bermLayers: "VK20",
        protectiveDrug:
          "— (ただしEMF誘発性Cav1.2調節異常 → ミエリン化タイミング障害)",
      },
      {
        name: "パーキンソン病",
        cellType: "SNpc DAニューロン",
        caMechanism:
          "Cav1.3 → ペースメーカー活動。Cav1.3は黒質緻密部ドパミン作動性ニューロンの自律的ペースメーキングを駆動する。Ca²⁺過負荷 → ミトコンドリアストレス → 選択的神経細胞死。",
        bermLayers: "Cav1.3はSNpcニューロンの自律的ペースメーキングを駆動；Ca²⁺過負荷 → ミトコンドリアストレス → 細胞死",
        protectiveDrug:
          "イスラジピン (Cav1.3遮断薬、動物モデルで神経保護作用)",
      },
      {
        name: "ALS",
        cellType: "運動ニューロン",
        caMechanism:
          "低Ca²⁺緩衝能 + Ca²⁺透過性AMPA受容体。運動ニューロンは異常に低いカルシウム緩衝能力を持ち、Ca²⁺透過性AMPA受容体の活性化に対して選択的に脆弱となる。",
        bermLayers: "VK45",
        protectiveDrug:
          "リルゾール (間接的 — Na⁺遮断 → グルタミン酸↓ → Ca²⁺↓)",
        occupational: "電気作業者 OR 1.3–1.7",
      },
    ],

    commonTitle: "共通のスレッド",
    commonPoints: [
      "四つの疾患すべてが特定の細胞タイプにおけるCa²⁺過負荷を含む",
      "各細胞タイプは固有の脆弱性を持つ：海馬ニューロンはコルチゾール駆動性Ca²⁺に、OPCはCav1.2タイミングに、SNpcニューロンはCav1.3ペースメーカー負荷に、運動ニューロンはAMPA媒介性Ca²⁺に",
      "薬理学的検証：Ca²⁺メカニズムを標的とする薬剤が各疾患で有効性を示す",
      "EMFはVGCC経路を通じて共通の環境要因を提供する",
    ],

    tableTitle: "異なる細胞タイプ、同じメカニズム",
    tableHeaders: {
      disease: "疾患",
      cellType: "細胞タイプ",
      caMechanism: "Ca²⁺メカニズム",
      protectiveDrug: "保護薬",
    },
    tableRows: [
      {
        disease: "アルツハイマー",
        cellType: "海馬 / 大脳皮質",
        caMechanism: "PGC + コルチゾール↑ + メラトニン↓",
        protectiveDrug: "セマグルチド、メラトニン",
      },
      {
        disease: "多発性硬化症",
        cellType: "OPC / ミエリン",
        caMechanism: "Cav1.2 → OPC分化",
        protectiveDrug: "—",
      },
      {
        disease: "パーキンソン",
        cellType: "SNpc DAニューロン",
        caMechanism: "Cav1.3ペースメーカー過負荷",
        protectiveDrug: "イスラジピン",
      },
      {
        disease: "ALS",
        cellType: "運動ニューロン",
        caMechanism: "低緩衝能 + Ca²⁺透過性AMPA",
        protectiveDrug: "リルゾール (間接的)",
      },
    ],

    predictionText:
      "予測 E-NEW-25：ALS罹患率はEMF曝露の高い職業で上昇している。電気作業者は複数の疫学研究においてALSに対してOR 1.3–1.7を示す。",
    predictionLink: "予測を見る →",
    predictionHref: "/predictions",
  },
  fr: {
    title: "Quatre neurodégénérescences : un seul mécanisme",
    subtitle:
      "La maladie d'Alzheimer, la sclérose en plaques, la maladie de Parkinson et la SLA attaquent chacune un type cellulaire différent par des mécanismes dépendants du Ca²⁺. Chacune bénéficie d'une validation pharmacologique par des médicaments ciblant le Ca²⁺. Même cascade, quatre manifestations.",
    backLink: "← Retour aux preuves",
    cautionText:
      "Cette page présente la connexion Ca²⁺ entre quatre maladies neurodégénératives. Le mécanisme Ca²⁺ de chaque maladie est établi indépendamment. La connexion unificatrice avec les CEM reste une hypothèse BERM.",
    labels: { cellType: "Type cellulaire", caMechanism: "mécanisme", bermConnection: "Connexion BERM", protectiveDrug: "Médicament protecteur", occupationalData: "Données professionnelles" },

    diseasesTitle: "Les quatre maladies",
    diseases: [
      {
        name: "Maladie d'Alzheimer",
        cellType: "Hippocampe / cortex",
        caMechanism:
          "PGC + cortisol↑ + mélatonine↓. La dysrégulation intracellulaire du Ca²⁺ est un événement PRÉCOCE précédant l'accumulation d'amyloïde. Le Ca²⁺ dirige l'Aβ vers des oligomères toxiques plutôt que des fibrilles inoffensives.",
        bermLayers: "VK14 (cortisol→hippocampe), VK3 (PGC→mélatonine), S6",
        protectiveDrug:
          "Sémaglutide (GLP-1R→Ca²⁺), mélatonine",
      },
      {
        name: "Sclérose en plaques",
        cellType: "OPC / myéline",
        caMechanism:
          "Cav1.2 → différenciation OPC → myélinisation. L'activité VGCC de type L est requise pour la différenciation des cellules précurseurs d'oligodendrocytes et la formation des gaines de myéline. Perturbation du timing Cav1.2 → échec de la myélinisation.",
        bermLayers: "VK20",
        protectiveDrug:
          "— (mais la dysrégulation Cav1.2 induite par CEM → perturbation du timing de myélinisation)",
      },
      {
        name: "Maladie de Parkinson",
        cellType: "Neurones DA du SNpc",
        caMechanism:
          "Cav1.3 → activité pacemaker. Cav1.3 pilote le pacemaking autonome dans les neurones dopaminergiques de la substance noire pars compacta. Surcharge Ca²⁺ → stress mitochondrial → mort neuronale sélective.",
        bermLayers: "Cav1.3 pilote le pacemaking autonome dans les neurones SNpc ; surcharge Ca²⁺ → stress mitochondrial → mort",
        protectiveDrug:
          "Isradipine (bloqueur Cav1.3, neuroprotecteur dans les modèles animaux)",
      },
      {
        name: "SLA",
        cellType: "Motoneurones",
        caMechanism:
          "Faible tampon Ca²⁺ + récepteurs AMPA perméables au Ca²⁺. Les motoneurones ont une capacité de tamponnage calcique inhabituellement faible, les rendant sélectivement vulnérables à l'activation des récepteurs AMPA perméables au Ca²⁺.",
        bermLayers: "VK45",
        protectiveDrug:
          "Riluzole (indirect — blocage Na⁺ → glutamate↓ → Ca²⁺↓)",
        occupational: "Travailleurs du secteur électrique OR 1,3–1,7",
      },
    ],

    commonTitle: "Fil conducteur",
    commonPoints: [
      "Les quatre maladies impliquent une surcharge en Ca²⁺ dans des types cellulaires spécifiques",
      "Chaque type cellulaire a une vulnérabilité unique : les neurones hippocampiques au Ca²⁺ induit par le cortisol, les OPC au timing Cav1.2, les neurones SNpc à la charge pacemaker Cav1.3, les motoneurones au Ca²⁺ médié par AMPA",
      "Validation pharmacologique : les médicaments ciblant le mécanisme Ca²⁺ montrent un bénéfice dans chaque maladie",
      "Les CEM fournissent un facteur environnemental commun via la voie VGCC",
    ],

    tableTitle: "Différents types cellulaires, même mécanisme",
    tableHeaders: {
      disease: "Maladie",
      cellType: "Type cellulaire",
      caMechanism: "Mécanisme Ca²⁺",
      protectiveDrug: "Médicament protecteur",
    },
    tableRows: [
      {
        disease: "Alzheimer",
        cellType: "Hippocampe / cortex",
        caMechanism: "PGC + cortisol↑ + mélatonine↓",
        protectiveDrug: "Sémaglutide, mélatonine",
      },
      {
        disease: "Sclérose en plaques",
        cellType: "OPC / myéline",
        caMechanism: "Cav1.2 → différenciation OPC",
        protectiveDrug: "—",
      },
      {
        disease: "Parkinson",
        cellType: "Neurones DA du SNpc",
        caMechanism: "Surcharge pacemaker Cav1.3",
        protectiveDrug: "Isradipine",
      },
      {
        disease: "SLA",
        cellType: "Motoneurones",
        caMechanism: "Faible tampon + AMPA perméable au Ca²⁺",
        protectiveDrug: "Riluzole (indirect)",
      },
    ],

    predictionText:
      "Prédiction E-NEW-25 : l'incidence de la SLA est élevée dans les professions à forte exposition aux CEM. Les travailleurs du secteur électrique présentent un OR de 1,3–1,7 pour la SLA dans plusieurs études épidémiologiques.",
    predictionLink: "Voir les prédictions →",
    predictionHref: "/predictions",
  },
  ko: {
    title: "네 가지 신경퇴행성 질환: 하나의 메커니즘",
    subtitle:
      "알츠하이머병, 다발성 경화증, 파킨슨병, ALS는 각각 다른 세포 유형을 Ca²⁺ 의존성 메커니즘을 통해 공격한다. 각각은 Ca²⁺ 표적 약물을 통한 약리학적 검증을 가진다. 같은 캐스케이드, 네 가지 발현.",
    backLink: "← 증거로 돌아가기",
    cautionText:
      "이 페이지는 네 가지 신경퇴행성 질환에 걸친 Ca²⁺ 연관성을 제시한다. 각 질환의 Ca²⁺ 메커니즘은 독립적으로 확립되어 있다. 통합적 EMF 연관성은 BERM 가설로 남아 있다.",
    labels: { cellType: "세포 유형", caMechanism: "메커니즘", bermConnection: "BERM 연결", protectiveDrug: "보호 약물", occupationalData: "직업 데이터" },

    diseasesTitle: "네 가지 질환",
    diseases: [
      {
        name: "알츠하이머병",
        cellType: "해마 / 대뇌피질",
        caMechanism:
          "PGC + 코르티솔↑ + 멜라토닌↓. 세포 내 Ca²⁺ 조절 이상은 아밀로이드 축적에 선행하는 초기 사건이다. Ca²⁺는 Aβ를 무해한 피브릴이 아닌 독성 올리고머로 유도한다.",
        bermLayers: "VK14 (코르티솔→해마), VK3 (PGC→멜라토닌), S6",
        protectiveDrug:
          "세마글루타이드 (GLP-1R→Ca²⁺), 멜라토닌",
      },
      {
        name: "다발성 경화증",
        cellType: "OPC / 미엘린",
        caMechanism:
          "Cav1.2 → OPC 분화 → 미엘린화. L형 VGCC 활성은 희소돌기아교세포 전구 세포의 분화와 미엘린 수초 형성에 필요하다. Cav1.2 타이밍 교란 → 미엘린화 실패.",
        bermLayers: "VK20",
        protectiveDrug:
          "— (그러나 EMF 유도 Cav1.2 조절 이상 → 미엘린화 타이밍 장애)",
      },
      {
        name: "파킨슨병",
        cellType: "SNpc DA 뉴런",
        caMechanism:
          "Cav1.3 → 페이스메이커 활동. Cav1.3는 흑질 치밀부 도파민성 뉴런의 자율적 페이스메이킹을 구동한다. Ca²⁺ 과부하 → 미토콘드리아 스트레스 → 선택적 신경세포 사멸.",
        bermLayers: "Cav1.3는 SNpc 뉴런의 자율적 페이스메이킹을 구동; Ca²⁺ 과부하 → 미토콘드리아 스트레스 → 사멸",
        protectiveDrug:
          "이스라디핀 (Cav1.3 차단제, 동물 모델에서 신경보호 효과)",
      },
      {
        name: "ALS",
        cellType: "운동 뉴런",
        caMechanism:
          "낮은 Ca²⁺ 완충 능력 + Ca²⁺ 투과성 AMPA 수용체. 운동 뉴런은 비정상적으로 낮은 칼슘 완충 능력을 가져 Ca²⁺ 투과성 AMPA 수용체 활성화에 선택적으로 취약하다.",
        bermLayers: "VK45",
        protectiveDrug:
          "릴루졸 (간접적 — Na⁺ 차단 → 글루타메이트↓ → Ca²⁺↓)",
        occupational: "전기 작업자 OR 1.3–1.7",
      },
    ],

    commonTitle: "공통 맥락",
    commonPoints: [
      "네 가지 질환 모두 특정 세포 유형에서 Ca²⁺ 과부하를 포함한다",
      "각 세포 유형은 고유한 취약성을 가진다: 해마 뉴런은 코르티솔 유도 Ca²⁺에, OPC는 Cav1.2 타이밍에, SNpc 뉴런은 Cav1.3 페이스메이커 부하에, 운동 뉴런은 AMPA 매개 Ca²⁺에",
      "약리학적 검증: Ca²⁺ 메커니즘을 표적으로 하는 약물이 각 질환에서 효과를 보인다",
      "EMF는 VGCC 경로를 통해 공통 환경 요인을 제공한다",
    ],

    tableTitle: "다른 세포 유형, 같은 메커니즘",
    tableHeaders: {
      disease: "질환",
      cellType: "세포 유형",
      caMechanism: "Ca²⁺ 메커니즘",
      protectiveDrug: "보호 약물",
    },
    tableRows: [
      {
        disease: "알츠하이머",
        cellType: "해마 / 대뇌피질",
        caMechanism: "PGC + 코르티솔↑ + 멜라토닌↓",
        protectiveDrug: "세마글루타이드, 멜라토닌",
      },
      {
        disease: "다발성 경화증",
        cellType: "OPC / 미엘린",
        caMechanism: "Cav1.2 → OPC 분화",
        protectiveDrug: "—",
      },
      {
        disease: "파킨슨",
        cellType: "SNpc DA 뉴런",
        caMechanism: "Cav1.3 페이스메이커 과부하",
        protectiveDrug: "이스라디핀",
      },
      {
        disease: "ALS",
        cellType: "운동 뉴런",
        caMechanism: "낮은 완충 + Ca²⁺ 투과성 AMPA",
        protectiveDrug: "릴루졸 (간접적)",
      },
    ],

    predictionText:
      "예측 E-NEW-25: ALS 발병률은 높은 EMF 노출 직업에서 상승한다. 전기 작업자는 여러 역학 연구에서 ALS에 대해 OR 1.3–1.7을 보인다.",
    predictionLink: "예측 보기 →",
    predictionHref: "/predictions",
  },
} as const;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const d = pickCopy(COPY, locale);
  return { title: `${d.title} – Extinction Field`, description: d.subtitle };
}

export default async function FourNeurodegenerationsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const d = pickCopy(COPY, locale);
  const prefix = `/${locale}`;

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 sm:py-20">
      <p className="mb-6">
        <Link href={`${prefix}/evidence`} className="text-sm text-accent hover:underline">{d.backLink}</Link>
      </p>
      <PageHeader icon={BrainCircuit} title={d.title} subtitle={d.subtitle} />
      <div className="mt-8"><CautionBox locale={locale}><p>{d.cautionText}</p></CautionBox></div>

      {/* Section 1: The four diseases */}
      <section className="mt-12">
        <h2 className="text-lg font-semibold mb-4">{d.diseasesTitle}</h2>
        <div className="space-y-4">
          {d.diseases.map((disease, i) => (
            <div key={i} className="rounded-lg border border-green-500/20 bg-card-bg p-5">
              <h3 className="text-base font-semibold mb-3">{disease.name}</h3>
              <div className="space-y-2 text-sm text-foreground-muted leading-relaxed">
                <p>
                  <span className="font-medium text-foreground">{d.labels.cellType}:</span>{" "}
                  {disease.cellType}
                </p>
                <p>
                  <span className="font-medium text-foreground">Ca{"²⁺"} {d.labels.caMechanism}:</span>{" "}
                  {disease.caMechanism}
                </p>
                <p>
                  <span className="font-medium text-foreground">{d.labels.bermConnection}:</span>{" "}
                  {disease.bermLayers}
                </p>
                <p>
                  <span className="font-medium text-foreground">{d.labels.protectiveDrug}:</span>{" "}
                  {disease.protectiveDrug}
                </p>
                {"occupational" in disease && (
                  <p>
                    <span className="font-medium text-foreground">{d.labels.occupationalData}:</span>{" "}
                    {disease.occupational}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Section 2: Common thread */}
      <section className="mt-14 border-t editorial-rule pt-6">
        <h2 className="text-lg font-semibold mb-4">{d.commonTitle}</h2>
        <div className="space-y-2 mb-4">
          {d.commonPoints.map((point, i) => (
            <div key={i} className="flex gap-2 text-sm text-foreground-muted leading-relaxed">
              <span className="text-accent shrink-0">{"→"}</span><p>{point}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Section 3: Summary table */}
      <section className="mt-14 border-t editorial-rule pt-6">
        <h2 className="text-lg font-semibold mb-4">{d.tableTitle}</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-card-border text-left text-xs text-foreground-muted uppercase tracking-wider">
                <th className="py-2 pr-3">{d.tableHeaders.disease}</th>
                <th className="py-2 pr-3">{d.tableHeaders.cellType}</th>
                <th className="py-2 pr-3">{d.tableHeaders.caMechanism}</th>
                <th className="py-2">{d.tableHeaders.protectiveDrug}</th>
              </tr>
            </thead>
            <tbody>
              {d.tableRows.map((row, i) => (
                <tr key={i} className="border-b border-card-border/40">
                  <td className="py-2 pr-3 font-medium text-foreground">{row.disease}</td>
                  <td className="py-2 pr-3 text-foreground-muted">{row.cellType}</td>
                  <td className="py-2 pr-3 text-foreground-muted">{row.caMechanism}</td>
                  <td className="py-2 text-foreground-muted">{row.protectiveDrug}</td>
                </tr>
              ))}
            </tbody>
          </table>
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
