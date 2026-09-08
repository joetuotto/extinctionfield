import {
  House,
  Map,
  GitBranch,
  Layers,
  Leaf,
  Target,
  Info,
  ChartLine,
  Database,
  Globe2,
  ShieldQuestion,
  BookOpen,
  Radio,
  Sigma,
  Network,
  Activity,
  FileText,
  Bug,
  FlaskConical,
  Pill,
  Dna,
  Landmark,
  Scale,
  Zap,
  Building2,
  Shield,
  Globe,
  UserX,
  Sun,
  BrainCircuit,
  Braces,
  Atom,
  Brain,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { Locale } from "./i18n";
import { REFERENCE_TOTAL } from "./referenceIndex";

type Labels = Record<Locale, string>;

export interface NavRoute {
  href: string;
  labels: Labels;
  icon: LucideIcon;
  descs?: Labels;
  badge?: string;
  children?: NavRoute[];
}

// Keep the established destinations and their multilingual descriptions together.
// NAV_ROUTES below assigns them to the explanation-level reading order.
const ROUTE_CATALOG: NavRoute[] = [
  {
    href: "",
    labels: { en: "Home", fi: "Etusivu", ja: "ホーム", fr: "Accueil", ko: "홈" },
    icon: House,
  },
  {
    href: "/model",
    labels: { en: "Model", fi: "Malli", ja: "モデル", fr: "Modèle", ko: "모델" },
    icon: GitBranch,
    children: [
      {
        href: "/model",
        labels: { en: "Overview", fi: "Yleiskatsaus", ja: "概要", fr: "Vue d'ensemble", ko: "개요" },
        icon: GitBranch,
        descs: {
          en: "Three-level architecture, five routes, disease cascades",
          fi: "Kolmitasoarkkitehtuuri, viisi reittiä, sairauskaskadit",
          ja: "3レベルアーキテクチャ、5つの経路、疾病カスケード",
          fr: "Architecture à trois niveaux, cinq voies, cascades pathologiques",
          ko: "3단계 아키텍처, 5개 경로, 질병 캐스케이드",
        },
      },
      {
        href: "/model/biological-coordination",
        labels: { en: "Biological Coordination", fi: "Biologinen koordinaatio", ja: "生物学的協調", fr: "Coordination biologique", ko: "생물학적 조정" },
        icon: Activity,
        descs: {
          en: "Receptor state, tissue timing, memory and successful encounters",
          fi: "Vastaanottajatila, kudosten ajoitus, muisti ja onnistuvat kohtaamiset",
          ja: "受容体の状態、組織のタイミング、記憶、出会いの成立",
          fr: "État des récepteurs, synchronisation des tissus, mémoire et rencontres réussies",
          ko: "수용체 상태, 조직의 타이밍, 기억 및 성공적인 만남",
        },
      },
      {
        href: "/modulome",
        labels: { en: "Modulome", fi: "Modulomi", ja: "モジュローム", fr: "Modulome", ko: "모듈롬" },
        icon: Activity,
        descs: {
          en: "12 layers, 12 target organs, 4 routes",
          fi: "12 kerrosta, 12 kohde-elintä, 4 reittiä",
          ja: "12層、12標的臓器、4経路",
          fr: "12 couches, 12 organes cibles, 4 voies",
          ko: "12개 층, 12개 표적 장기, 4개 경로",
        },
      },
      {
        href: "/map",
        labels: { en: "Causal Map", fi: "Kausaalikartta", ja: "因果マップ", fr: "Carte causale", ko: "인과 지도" },
        icon: Network,
        descs: {
          en: "Interactive causal chain from physics to TFR",
          fi: "Vuorovaikutteinen kausaaliketju fysiikasta TFR:ään",
          ja: "物理学からTFRへのインタラクティブな因果連鎖",
          fr: "Chaîne causale interactive de la physique au TFR",
          ko: "물리학에서 TFR까지의 인터랙티브 인과 사슬",
        },
      },
      {
        href: "/model#vgcc-gene-family",
        labels: { en: "VGCC Gene Family", fi: "VGCC-geeniperhe", ja: "VGCC遺伝子ファミリー", fr: "Famille de gènes VGCC", ko: "VGCC 유전자 패밀리" },
        icon: Dna,
        descs: {
          en: "Six genes, six disease clusters",
          fi: "Kuusi geeniä, kuusi sairausklusteria",
          ja: "6つの遺伝子、6つの疾病クラスター",
          fr: "Six gènes, six groupes de maladies",
          ko: "6개의 유전자, 6개의 질병 클러스터",
        },
      },
      {
        href: "/model#testosterone-threshold",
        labels: { en: "T→TFR Threshold", fi: "T→TFR-kynnys", ja: "T→TFR閾値", fr: "Seuil T→TFR", ko: "T→TFR 임계값" },
        icon: ChartLine,
        descs: {
          en: "Why testosterone predicts fertility collapse",
          fi: "Miksi testosteroni ennustaa syntyvyysromahduksen",
          ja: "テストステロンがなぜ出生率崩壊を予測するのか",
          fr: "Pourquoi la testostérone prédit l'effondrement de la fertilité",
          ko: "테스토스테론이 왜 출산율 붕괴를 예측하는가",
        },
      },
      {
        href: "/model/q-factor",
        labels: { en: "Q-Factor Spectrum", fi: "Q-tekijäspektri", ja: "Q因子スペクトラム", fr: "Spectre Q-facteur", ko: "Q인자 스펙트럼" },
        icon: Activity,
        descs: {
          en: "Seven neural pathways, one damped oscillator",
          fi: "Seitsemän hermorataa, yksi vaimennettu oskillaattori",
          ja: "7つの神経経路、1つの減衰振動子",
          fr: "Sept voies neurales, un oscillateur amorti",
          ko: "7개의 신경 경로, 하나의 감쇠 진동자",
        },
        badge: "NEW",
      },
      {
        href: "/model#camkii-convergence",
        labels: { en: "CaMKII Convergence", fi: "CaMKII-yhdentyminen", ja: "CaMKII収束", fr: "Convergence CaMKII", ko: "CaMKII 수렴" },
        icon: Activity,
        descs: {
          en: "One molecule, five disease cascades",
          fi: "Yksi molekyyli, viisi sairauskaskadia",
          ja: "1つの分子、5つの疾病カスケード",
          fr: "Une molécule, cinq cascades pathologiques",
          ko: "하나의 분자, 다섯 가지 질병 캐스케이드",
        },
      },
      {
        href: "/model/math",
        labels: { en: "Mathematics", fi: "Matematiikka", ja: "数学", fr: "Mathématiques", ko: "수학" },
        icon: Sigma,
        descs: {
          en: "Lindgren premise, derived geometry, conditional L2 response, and open calibration",
          fi: "Lindgren-premissi, johdettu geometria, ehdollinen L2-vaste ja avoin kalibrointi",
          ja: "リンドグレン前提、導出された幾何学、条件付きL2応答、未校正の組織応答",
          fr: "Prémisse de Lindgren, géométrie dérivée, réponse L2 conditionnelle et calibration ouverte",
          ko: "린드그렌 전제, 도출된 기하학, 조건부 L2 반응 및 미보정 조직 반응",
        },
      },
      {
        href: "/model/tensor-derivation",
        labels: { en: "Tensor Derivation", fi: "Tensorijohto", ja: "テンソル導出", fr: "Dérivation tensorielle", ko: "텐서 유도" },
        icon: Braces,
        descs: {
          en: "Variational GME, Weyl semimetry, Bianchi identity, and open L2",
          fi: "Variaatio-GME, Weyl-semimetrisyys, Bianchi-identiteetti ja avoin L2",
          ja: "変分GME、ワイル半計量性、ビアンキ恒等式、未解決のL2",
          fr: "GME variationnelle, semi-métricité de Weyl, identité de Bianchi et L2 ouvert",
          ko: "변분 GME, 바일 반계량성, 비앙키 항등식, 개방형 L2",
        },
      },
      {
        href: "/model/frequency-weights",
        labels: { en: "Frequency Weights", fi: "Taajuuspainot", ja: "周波数重み", fr: "Pondérations fréquentielles", ko: "주파수 가중치" },
        icon: Radio,
        descs: {
          en: "Inspectable imported candidate factors with an open L2 bridge",
          fi: "Tarkastettavat tuodut ehdokastekijät ja avoin L2-silta",
          ja: "検査可能な導入候補因子と未解決のL2橋渡し",
          fr: "Facteurs candidats importés et inspectables avec un pont L2 ouvert",
          ko: "검토 가능한 도입 후보 요인과 개방형 L2 연결",
        },
      },
      {
        href: "/model/dual-kernel",
        labels: { en: "Dual-Kernel Convolution", fi: "Kaksoisydinkonvoluutio", ja: "二重カーネル畳み込み", fr: "Convolution à double noyau", ko: "이중 커널 합성곱" },
        icon: Activity,
        descs: {
          en: "Candidate memory kernels, Hill response, and locked F1–F9 tests",
          fi: "Ehdokasmuistiytimet, Hill-vaste ja lukitut F1–F9-testit",
          ja: "候補記憶カーネル、Hill応答、固定済みF1–F9テスト",
          fr: "Noyaux candidats, réponse de Hill et tests F1–F9 verrouillés",
          ko: "후보 기억 커널, Hill 반응, 잠긴 F1–F9 테스트",
        },
      },
      {
        href: "/model/comparison",
        labels: { en: "Model Comparison", fi: "Mallivertailu", ja: "モデル比較", fr: "Comparaison des modèles", ko: "모델 비교" },
        icon: Scale,
        descs: {
          en: "Pre-specified M0–M4 BIC and holdout comparison contract",
          fi: "Ennalta määritelty M0–M4 BIC- ja holdout-vertailusopimus",
          ja: "事前指定されたM0–M4のBICおよびホールドアウト比較契約",
          fr: "Contrat prédéfini de comparaison M0–M4 par BIC et holdout",
          ko: "사전 지정된 M0–M4 BIC 및 홀드아웃 비교 계약",
        },
      },
    ],
  },
  {
    href: "/measurement/fieldstate",
    labels: { en: "Measurement", fi: "Mittaus", ja: "測定", fr: "Mesure", ko: "측정" },
    icon: Radio,
    children: [
      {
        href: "/measurement/fieldstate",
        labels: { en: "FieldState specification", fi: "FieldState-määrittely", ja: "FieldState仕様", fr: "Spécification FieldState", ko: "FieldState 사양" },
        icon: Radio,
        descs: {
          en: "Optional local-field measurement and estimation module for BERM",
          fi: "BERM:n valinnainen paikallisen kentän mittaus- ja estimointimoduuli",
          ja: "BERM用の任意の局所場測定・推定モジュール",
          fr: "Module facultatif de mesure et d’estimation du champ local pour BERM",
          ko: "BERM용 선택적 국소장 측정·추정 모듈",
        },
      },
      {
        href: "/measurement/fieldstate/math",
        labels: { en: "Measurement mathematics", fi: "Mittausmatematiikka", ja: "測定の数学", fr: "Mathématiques de mesure", ko: "측정 수학" },
        icon: Sigma,
        descs: {
          en: "Vector, spectrum, transfer and provenance requirements",
          fi: "Vektori-, spektri-, siirto- ja provenienssivaatimukset",
          ja: "ベクトル、スペクトル、伝達、来歴の要件",
          fr: "Exigences de vecteur, spectre, transfert et provenance",
          ko: "벡터·스펙트럼·전달·출처 요건",
        },
      },
    ],
  },
  {
    href: "/civilization",
    labels: { en: "Civilization", fi: "Sivilisaatio", ja: "文明", fr: "Civilisation", ko: "문명" },
    icon: Landmark,
    children: [
      {
        href: "/civilization",
        labels: { en: "Overview", fi: "Yleiskatsaus", ja: "概要", fr: "Vue d'ensemble", ko: "개요" },
        icon: Landmark,
        descs: {
          en: "Seven-stage reading path including the Epistapege observability branch",
          fi: "Seitsemänvaiheinen lukupolku, mukaan lukien Epistapegen havaittavuushaara",
          ja: "エピスタペゲ観測可能性分岐を含む7段階の読書経路",
          fr: "Parcours en sept étapes incluant la branche d’observabilité Epistapege",
          ko: "에피스타페게 관측 가능성 분기를 포함한 7단계 읽기 경로",
        },
      },
      {
        href: "/civilization/pathopege",
        labels: { en: "Pathopege", fi: "Pathopege", ja: "パトペゲ", fr: "Pathopege", ko: "파토페게" },
        icon: Zap,
        descs: {
          en: "pathos + pege — source of the disease",
          fi: "pathos + pege — sairauden lähde",
          ja: "pathos + pege — 病の源",
          fr: "pathos + pege — source de la maladie",
          ko: "pathos + pege — 질병의 근원",
        },
      },
      {
        href: "/civilization/epistapege",
        labels: { en: "Epistapege", fi: "Epistapege", ja: "エピスタペゲ", fr: "Epistapege", ko: "에피스타페게" },
        icon: BrainCircuit,
        descs: {
          en: "episteme + pege — structural loss of causal observability",
          fi: "episteme + pege — kausaalisen havaittavuuden rakenteellinen menetys",
          ja: "episteme + pege — 因果的観測可能性の構造的喪失",
          fr: "episteme + pege — perte structurelle d’observabilité causale",
          ko: "episteme + pege — 인과 관측 가능성의 구조적 상실",
        },
        badge: "NEW",
      },
      {
        href: "/civilization/patopolis",
        labels: { en: "Patopolis", fi: "Patopolis", ja: "パトポリス", fr: "Patopolis", ko: "파토폴리스" },
        icon: Building2,
        descs: {
          en: "pathos + polis — the pathological city",
          fi: "pathos + polis — patologinen kaupunki",
          ja: "pathos + polis — 病理的都市",
          fr: "pathos + polis — la cité pathologique",
          ko: "pathos + polis — 병리적 도시",
        },
      },
      {
        href: "/civilization/patokratia",
        labels: { en: "Patokratia", fi: "Patokratia", ja: "パトクラティア", fr: "Patokratia", ko: "파토크라티아" },
        icon: Shield,
        descs: {
          en: "pathos + kratos — pathological governance",
          fi: "pathos + kratos — patologinen hallinto",
          ja: "pathos + kratos — 病理的統治",
          fr: "pathos + kratos — gouvernance pathologique",
          ko: "pathos + kratos — 병리적 통치",
        },
      },
      {
        href: "/civilization/patopoliteia",
        labels: { en: "Patopoliteia", fi: "Patopoliteia", ja: "パトポリテイア", fr: "Patopoliteia", ko: "파토폴리테이아" },
        icon: Globe,
        descs: {
          en: "pathos + politeia — pathological civilization",
          fi: "pathos + politeia — patologinen sivilisaatio",
          ja: "pathos + politeia — 病理的文明",
          fr: "pathos + politeia — civilisation pathologique",
          ko: "pathos + politeia — 병리적 문명",
        },
      },
      {
        href: "/civilization/pathopolites",
        labels: { en: "Pathopolites", fi: "Pathopolites", ja: "パトポリテース", fr: "Pathopolites", ko: "파토폴리테스" },
        icon: UserX,
        descs: {
          en: "pathos + polites — the pathological citizen",
          fi: "pathos + polites — patologinen kansalainen",
          ja: "pathos + polites — 病理的市民",
          fr: "pathos + polites — le citoyen pathologique",
          ko: "pathos + polites — 병리적 시민",
        },
      },
      {
        href: "/civilization/patokinesis",
        labels: { en: "Patokinesis", fi: "Patokinesis", ja: "パトキネシス", fr: "Patokinesis", ko: "파토키네시스" },
        icon: Radio,
        descs: {
          en: "pathos + kinesis — the pathology that moves",
          fi: "pathos + kinesis — patologia joka liikkuu",
          ja: "pathos + kinesis — 移動する病理",
          fr: "pathos + kinesis — la pathologie qui se déplace",
          ko: "pathos + kinesis — 이동하는 병리",
        },
      },
    ],
  },
  {
    href: "/evidence",
    labels: { en: "Evidence", fi: "Näyttö", ja: "エビデンス", fr: "Preuves", ko: "증거" },
    icon: Layers,
    children: [
      {
        href: "/evidence",
        labels: { en: "Overview", fi: "Yleiskatsaus", ja: "概要", fr: "Vue d'ensemble", ko: "개요" },
        icon: Layers,
        descs: {
          en: "Study-by-study evidence register",
          fi: "Tutkimuskohtainen näyttörekisteri",
          ja: "研究別エビデンスレジスター",
          fr: "Registre de preuves étude par étude",
          ko: "연구별 증거 레지스터",
        },
      },
      {
        href: "/evidence/response-conditions",
        labels: { en: "Response Conditions", fi: "Vaste-ehdot", ja: "応答条件", fr: "Conditions de réponse", ko: "반응 조건" },
        icon: Activity,
        descs: {
          en: "Phase, coherence, timing, receptor state and channel interactions",
          fi: "Vaihe, koherenssi, ajoitus, reseptoritila ja kanavavuorovaikutukset",
          ja: "位相、コヒーレンス、タイミング、受容体状態、チャネル相互作用",
          fr: "Phase, cohérence, temporalité, état du récepteur et interactions",
          ko: "위상, 결맞음, 타이밍, 수용체 상태 및 채널 상호작용",
        },
        badge: "NEW",
      },
      {
        href: "/explore",
        labels: { en: "Data Explorer", fi: "Data-selain", ja: "データエクスプローラー", fr: "Explorateur de données", ko: "데이터 탐색기" },
        icon: Database,
        descs: {
          en: "Interactive maps, charts, and country data",
          fi: "Interaktiiviset kartat, kuvaajat ja maadata",
          ja: "インタラクティブな地図、グラフ、国別データ",
          fr: "Cartes interactives, graphiques et données par pays",
          ko: "인터랙티브 지도, 차트 및 국가 데이터",
        },
      },
      {
        href: "/evidence/pharmacology",
        labels: { en: "Pharmacological Evidence", fi: "Farmakologinen näyttö", ja: "薬理学的エビデンス", fr: "Preuves pharmacologiques", ko: "약리학적 증거" },
        icon: Pill,
        descs: {
          en: "14 drug classes converging on BERM pathways",
          fi: "14 lääkeryhmää yhtyvät BERM-reiteillä",
          ja: "BERM経路に収束する14の薬物クラス",
          fr: "14 classes de médicaments convergent sur les voies BERM",
          ko: "BERM 경로에 수렴하는 14가지 약물 클래스",
        },
      },
      {
        href: "/evidence/timothy-experiment",
        labels: { en: "Timothy Syndrome", fi: "Timothyn oireyhtymä", ja: "ティモシー症候群", fr: "Syndrome de Timothy", ko: "티모시 증후군" },
        icon: Dna,
        descs: {
          en: "CACNA1C gain-of-function — nature's experiment",
          fi: "CACNA1C gain-of-function — luonnon kokeilu",
          ja: "CACNA1C機能獲得 — 自然の実験",
          fr: "CACNA1C gain-of-function — l'expérience de la nature",
          ko: "CACNA1C 기능 획득 — 자연의 실험",
        },
        badge: "NEW",
      },
      {
        href: "/evidence/populations",
        labels: { en: "Populations", fi: "Väestöryhmät", ja: "集団", fr: "Populations", ko: "인구 집단" },
        icon: Globe2,
        descs: {
          en: "Nine low-EMF communities vs modern",
          fi: "Yhdeksän matala-EMF-yhteisöä vs moderni",
          ja: "9つの低EMFコミュニティ vs 現代",
          fr: "Neuf communautés à faible CEM vs modernes",
          ko: "9개의 저EMF 커뮤니티 vs 현대",
        },
      },
      {
        href: "/evidence/evolution",
        labels: { en: "Evolutionary Origins", fi: "Evolutiiviset juuret", ja: "進化的起源", fr: "Origines évolutives", ko: "진화적 기원" },
        icon: FlaskConical,
        descs: {
          en: "The Northern Package hypothesis",
          fi: "Pohjoisen paketin hypoteesi",
          ja: "ノーザンパッケージ仮説",
          fr: "L'hypothèse du package nordique",
          ko: "북부 패키지 가설",
        },
      },
      {
        href: "/evidence/replication",
        labels: { en: "Replication Crisis", fi: "Toistettavuuskriisi", ja: "再現性の危機", fr: "Crise de la réplication", ko: "재현성 위기" },
        icon: FlaskConical,
        descs: {
          en: "Blackman's five confounds and the five-parameter standard",
          fi: "Blackmanin viisi sekoittavaa tekijää ja viiden parametrin standardi",
          ja: "ブラックマンの5つの交絡因子と5パラメータ標準",
          fr: "Les cinq facteurs de confusion de Blackman et le standard à cinq paramètres",
          ko: "블랙먼의 5가지 교란 요인과 5-파라미터 표준",
        },
      },
      {
        href: "/evidence/technology",
        labels: { en: "Technology Profiles", fi: "Teknologiaprofiilit", ja: "テクノロジープロファイル", fr: "Profils technologiques", ko: "기술 프로필" },
        icon: Radio,
        descs: {
          en: "14 technology profiles, ELF priming, superadditivity model",
          fi: "14 teknologiaprofiilia, ELF-priming, superadditiivisuusmalli",
          ja: "14のテクノロジープロファイル、ELFプライミング、超加法モデル",
          fr: "14 profils technologiques, amorçage ELF, modèle de superadditivité",
          ko: "14개의 기술 프로필, ELF 프라이밍, 초가법 모델",
        },
      },
      {
        href: "/sentinel",
        labels: { en: "Sentinel Species", fi: "Indikaattorilajit", ja: "指標種", fr: "Espèces sentinelles", ko: "감시 종" },
        icon: Bug,
        descs: {
          en: "Bee, bird, and amphibian decline patterns",
          fi: "Mehiläisten, lintujen ja sammakkoeläinten laskumallit",
          ja: "ハチ、鳥類、両生類の減少パターン",
          fr: "Schémas de déclin des abeilles, oiseaux et amphibiens",
          ko: "꿀벌, 조류, 양서류 감소 패턴",
        },
      },
      {
        href: "/objections",
        labels: { en: "Criticism & Responses", fi: "Kritiikki ja vastaukset", ja: "批判と回答", fr: "Critiques et réponses", ko: "비판과 답변" },
        icon: ShieldQuestion,
        descs: {
          en: "Counterarguments and our responses",
          fi: "Vastaväitteet ja vastauksemme",
          ja: "反論と我々の回答",
          fr: "Contre-arguments et nos réponses",
          ko: "반론과 우리의 답변",
        },
      },
      {
        href: "/references",
        labels: { en: "All References", fi: "Kaikki lähteet", ja: "全参考文献", fr: "Toutes les références", ko: "모든 참고문헌" },
        icon: BookOpen,
        descs: {
          en: `${REFERENCE_TOTAL} registered sources`,
          fi: `${REFERENCE_TOTAL} rekisteröityä lähdettä`,
          ja: `${REFERENCE_TOTAL}件の登録済み文献`,
          fr: `${REFERENCE_TOTAL} sources enregistrées`,
          ko: `${REFERENCE_TOTAL}개의 등록된 출처`,
        },
      },
    ],
  },
  {
    href: "/epistemology",
    labels: { en: "Epistemology", fi: "Epistemologia", ja: "認識論", fr: "Épistémologie", ko: "인식론" },
    icon: Scale,
  },
  {
    href: "/predictions",
    labels: { en: "Predictions", fi: "Ennusteet", ja: "予測", fr: "Prédictions", ko: "예측" },
    icon: Target,
  },
  {
    href: "/articles",
    labels: { en: "Articles", fi: "Artikkelit", ja: "論文", fr: "Articles", ko: "논문" },
    icon: FileText,
  },
  {
    href: "/about",
    labels: { en: "About", fi: "Tietoa", ja: "概要", fr: "À propos", ko: "소개" },
    icon: Info,
  },
];

const ROUTE_BY_HREF = new globalThis.Map(
  ROUTE_CATALOG.flatMap((route) => [route, ...(route.children ?? [])])
    .map((route) => [route.href, route] as const),
);

function existingRoute(href: string): NavRoute {
  const route = ROUTE_BY_HREF.get(href);
  if (!route) throw new Error(`Unknown navigation destination: ${href}`);
  return { ...route, children: undefined };
}

const OVERVIEW_LABELS: Labels = {
  en: "Overview", fi: "Yleiskatsaus", ja: "概要", fr: "Vue d'ensemble", ko: "개요",
};

export const ABOUT_ROUTES: NavRoute[] = [
  { ...existingRoute("/about"), labels: OVERVIEW_LABELS },
  existingRoute("/epistemology"),
  {
    href: "/about/history", icon: BookOpen,
    labels: { en: "History", fi: "Historia", ja: "歴史", fr: "Histoire", ko: "역사" },
  },
  {
    href: "/about/replication", icon: FlaskConical,
    labels: { en: "Replication", fi: "Replikaatio", ja: "再現性", fr: "Réplication", ko: "재현" },
  },
  {
    href: "/about/measurement", icon: Radio,
    labels: { en: "Measurement guide", fi: "Mittausohje", ja: "測定ガイド", fr: "Guide de mesure", ko: "측정 안내" },
  },
  {
    href: "/about/objections", icon: ShieldQuestion,
    labels: { en: "Objections", fi: "Vastaväitteet", ja: "反論", fr: "Objections", ko: "반론" },
  },
];

export const NAV_ROUTES: NavRoute[] = [
  {
    href: "/model", icon: GitBranch,
    labels: { en: "Model", fi: "Malli", ja: "モデル", fr: "Modèle", ko: "모델" },
    children: [existingRoute("/model"), existingRoute("/map")],
  },
  {
    href: "/physics", icon: Atom,
    labels: { en: "Physics", fi: "Fysiikka", ja: "物理学", fr: "Physique", ko: "물리학" },
    children: [
      {
        href: "/physics", icon: Atom, labels: OVERVIEW_LABELS,
        descs: {
          en: "Physical premise, field geometry and biological coupling",
          fi: "Fysikaalinen premissi, kentän geometria ja biologinen kytkentä",
          ja: "物理的前提、場の幾何学、生物学的結合",
          fr: "Prémisse physique, géométrie du champ et couplage biologique",
          ko: "물리적 전제, 장의 기하학 및 생물학적 결합",
        },
      },
      existingRoute("/model/math"),
      existingRoute("/model/tensor-derivation"),
      existingRoute("/model/frequency-weights"),
    ],
  },
  {
    href: "/biology", icon: Dna,
    labels: { en: "Biology", fi: "Biologia", ja: "生物学", fr: "Biologie", ko: "생물학" },
    children: [
      {
        href: "/biology", icon: Dna, labels: OVERVIEW_LABELS,
        descs: {
          en: "From receptors and cells to hormones and the organism",
          fi: "Vastaanottimista ja soluista hormoneihin ja elimistöön",
          ja: "受容体と細胞からホルモンと生体へ",
          fr: "Des récepteurs et des cellules aux hormones et à l’organisme",
          ko: "수용체와 세포에서 호르몬과 유기체까지",
        },
      },
      existingRoute("/modulome"),
      existingRoute("/model/biological-coordination"),
      existingRoute("/model#vgcc-gene-family"),
      existingRoute("/model#camkii-convergence"),
      existingRoute("/model#testosterone-threshold"),
      existingRoute("/model/q-factor"),
      existingRoute("/model/dual-kernel"),
      existingRoute("/sentinel"),
    ],
  },
  {
    href: "/behavior", icon: Brain,
    labels: { en: "Behavior", fi: "Käyttäytyminen", ja: "行動", fr: "Comportement", ko: "행동" },
    children: [{
      href: "/behavior", icon: Brain,
      labels: { en: "From biology to action", fi: "Biologiasta haluun ja toimintaan", ja: "生物学から行動へ", fr: "De la biologie à l’action", ko: "생물학에서 행동으로" },
      descs: {
        en: "Motivation, valuation, decisions, explanations and interaction",
        fi: "Motivaatio, arvottaminen, päätökset, perustelut ja vuorovaikutus",
        ja: "動機、価値評価、意思決定、理由づけ、相互作用",
        fr: "Motivation, évaluation, décisions, justifications et interaction",
        ko: "동기, 가치 평가, 결정, 이유 설명 및 상호작용",
      },
    },
    {
      href: "/behavior#valuation", icon: Brain,
      labels: { en: "State and experienced value", fi: "Tila ja koettu arvo", ja: "状態と感じられる価値", fr: "État et valeur ressentie", ko: "상태와 경험하는 가치" },
    },
    {
      href: "/behavior#desire", icon: Activity,
      labels: { en: "Desire, attachment and care", fi: "Halu, kiintymys ja hoiva", ja: "欲求、愛着、養育", fr: "Désir, attachement et soin", ko: "욕구, 애착 및 돌봄" },
    },
    {
      href: "/behavior#learning", icon: ChartLine,
      labels: { en: "Time and learning", fi: "Aika ja oppiminen", ja: "時間と学習", fr: "Temps et apprentissage", ko: "시간과 학습" },
    },
    {
      href: "/behavior#reasons", icon: BookOpen,
      labels: { en: "Decision and explanation", fi: "Päätös ja perustelu", ja: "意思決定と理由づけ", fr: "Décision et justification", ko: "결정과 이유 설명" },
    },
    {
      href: "/behavior#social", icon: Network,
      labels: { en: "Social action", fi: "Sosiaalinen toiminta", ja: "社会的行動", fr: "Action sociale", ko: "사회적 행동" },
    },
    {
      href: "/behavior#joint-action", icon: Globe2,
      labels: { en: "From individuals to joint action", fi: "Yksilöstä yhteiseen toimintaan", ja: "個人から共同行動へ", fr: "De l’individu à l’action commune", ko: "개인에서 공동 행동으로" },
    }],
  },
  {
    href: "/civilization", icon: Landmark,
    labels: { en: "Civilization", fi: "Sivilisaatio", ja: "文明", fr: "Civilisation", ko: "문명" },
    children: [
      existingRoute("/civilization"),
      existingRoute("/civilization/pathopege"),
      existingRoute("/civilization/pathopolites"),
      existingRoute("/civilization/epistapege"),
      existingRoute("/civilization/patokinesis"),
      existingRoute("/civilization/patopolis"),
      existingRoute("/civilization/patokratia"),
      existingRoute("/civilization/patopoliteia"),
    ],
  },
  {
    href: "/evidence/convergence", icon: Layers,
    labels: { en: "Evidence", fi: "Näyttö", ja: "エビデンス", fr: "Preuves", ko: "증거" },
    children: [
      {
        href: "/evidence/convergence", icon: Network,
        labels: { en: "Evidence overview", fi: "Näytön kokonaiskuva", ja: "エビデンスの全体像", fr: "Vue d’ensemble des preuves", ko: "증거 개관" },
        descs: {
          en: "Research convergence from physics to civilization",
          fi: "Tutkimusten konvergenssi fysiikasta sivilisaatioon",
          ja: "物理学から文明までの研究の収束",
          fr: "Convergence des recherches de la physique à la civilisation",
          ko: "물리학에서 문명까지 연구 결과의 수렴",
        },
      },
      {
        ...existingRoute("/evidence"),
        labels: { en: "Evidence register", fi: "Näyttörekisteri", ja: "エビデンスレジスター", fr: "Registre des preuves", ko: "증거 레지스터" },
      },
      existingRoute("/evidence/response-conditions"),
      existingRoute("/evidence/pharmacology"),
      existingRoute("/evidence/timothy-experiment"),
      existingRoute("/evidence/populations"),
      existingRoute("/evidence/evolution"),
      existingRoute("/evidence/technology"),
      existingRoute("/explore"),
      {
        href: "/data", icon: Database,
        labels: { en: "Data sources", fi: "Tietolähteet", ja: "データソース", fr: "Sources de données", ko: "데이터 출처" },
      },
      existingRoute("/measurement/fieldstate"),
      existingRoute("/measurement/fieldstate/math"),
      existingRoute("/predictions"),
      existingRoute("/model/comparison"),
      existingRoute("/evidence/replication"),
      existingRoute("/articles"),
      existingRoute("/references"),
      existingRoute("/objections"),
    ],
  },
  {
    ...existingRoute("/about"),
    children: ABOUT_ROUTES,
  },
];

/** Normalize both locale-prefixed URLs and model-relative paths. */
function navPath(pathname: string): string {
  const path = pathname.split(/[?#]/, 1)[0].replace(/\/+$/, "");
  return path.replace(/^\/(en|fi|ja|fr|ko)(?=\/|$)/, "") || "/";
}

/**
 * A page has one owning section, even when its original URL is under /model.
 * Anchor links are reading shortcuts; they never claim the containing page.
 * Longest segment-boundary match assigns detail pages to their nearest owner.
 */
export function getActiveNavSection(pathname: string): string | null {
  const path = navPath(pathname);
  let owner: string | null = null;
  let longest = -1;
  for (const section of NAV_ROUTES) {
    for (const route of [section, ...(section.children ?? [])]) {
      if (route.href.includes("#") || route.href.includes("?")) continue;
      const candidate = navPath(route.href);
      if ((path === candidate || path.startsWith(`${candidate}/`)) && candidate.length > longest) {
        owner = section.href;
        longest = candidate.length;
      }
    }
  }
  return owner;
}

/** aria-current="page" belongs only to the page link, never its anchor shortcuts. */
export function isNavPageCurrent(pathname: string, href: string): boolean {
  return !/[?#]/.test(href) && navPath(pathname) === navPath(href);
}

export interface ResolvedNavRoute {
  href: string;
  label: string;
  icon: LucideIcon;
  desc?: string;
  badge?: string;
  children?: ResolvedNavRoute[];
}

function resolve(locale: string): (route: NavRoute) => ResolvedNavRoute {
  const key = (locale === "fi" || locale === "ja" || locale === "fr" || locale === "ko") ? locale as Locale : "en";
  return (route) => ({
    href: route.href,
    label: route.labels[key],
    icon: route.icon,
    desc: route.descs?.[key],
    badge: route.badge,
    children: route.children?.map(resolve(locale)),
  });
}

export function getNavRoutes(locale: string): ResolvedNavRoute[] {
  return NAV_ROUTES.map(resolve(locale));
}

export function getAboutRoutes(locale: string): ResolvedNavRoute[] {
  return ABOUT_ROUTES.map(resolve(locale));
}

export function getHomeRoute(locale: string): ResolvedNavRoute {
  return resolve(locale)(existingRoute(""));
}

export interface ExploreTab {
  key: "map" | "country" | "global" | "sentinel" | "data" | "layers" | "threshold" | "civilizations" | "naturalEM" | "solar" | "dkc";
  labels: Labels;
  icon: LucideIcon;
}

export const EXPLORE_TABS: ExploreTab[] = [
  { key: "map", labels: { en: "Map", fi: "Kartta", ja: "地図", fr: "Carte", ko: "지도" }, icon: Map },
  { key: "country", labels: { en: "Country", fi: "Maa", ja: "国別", fr: "Pays", ko: "국가" }, icon: ChartLine },
  { key: "global", labels: { en: "Global", fi: "Globaali", ja: "グローバル", fr: "Mondial", ko: "글로벌" }, icon: Globe2 },
  { key: "threshold", labels: { en: "T→TFR", fi: "T→TFR", ja: "T→TFR", fr: "T→TFR", ko: "T→TFR" }, icon: Activity },
  { key: "sentinel", labels: { en: "Sentinel", fi: "Indikaattorit", ja: "指標種", fr: "Sentinelles", ko: "감시종" }, icon: Leaf },
  { key: "data", labels: { en: "Data", fi: "Aineisto", ja: "データ", fr: "Données", ko: "데이터" }, icon: Database },
  { key: "layers", labels: { en: "Layers", fi: "Kerrokset", ja: "レイヤー", fr: "Couches", ko: "레이어" }, icon: Layers },
  { key: "civilizations", labels: { en: "Civilizations", fi: "Sivilisaatiot", ja: "文明", fr: "Civilisations", ko: "문명" }, icon: Landmark },
  { key: "naturalEM", labels: { en: "Natural EM", fi: "Luonnollinen EM", ja: "自然EM", fr: "EM naturel", ko: "자연 EM" }, icon: Radio },
  { key: "solar", labels: { en: "Solar χ", fi: "Aurinko-χ", ja: "太陽χ", fr: "Solaire χ", ko: "태양 χ" }, icon: Sun },
  { key: "dkc", labels: { en: "DKC", fi: "DKC", ja: "DKC", fr: "DKC", ko: "DKC" }, icon: Activity },
];

export function getExploreTabs(locale: string) {
  const key = (locale === "fi" || locale === "ja" || locale === "fr" || locale === "ko") ? locale as Locale : "en";
  return EXPLORE_TABS.map((tab) => ({
    key: tab.key,
    label: tab.labels[key],
    icon: tab.icon,
  }));
}
