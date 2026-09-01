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
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { Locale } from "./i18n";

type Labels = Record<Locale, string>;

export interface NavRoute {
  href: string;
  labels: Labels;
  icon: LucideIcon;
  descs?: Labels;
  badge?: string;
  children?: NavRoute[];
}

export const NAV_ROUTES: NavRoute[] = [
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
          en: "Complete derivation from Lindgren geometry to TFR",
          fi: "Täydellinen derivaatio Lindgren-geometriasta TFR:ään",
          ja: "リンドグレン幾何学からTFRへの完全な導出",
          fr: "Dérivation complète de la géométrie de Lindgren au TFR",
          ko: "린드그렌 기하학에서 TFR까지의 완전한 유도",
        },
      },
    ],
  },
  {
    href: "/civilization",
    labels: { en: "Civilization", fi: "Sivilisaatio", ja: "文明", fr: "Civilisation", ko: "문명" },
    icon: Landmark,
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
          en: "531 peer-reviewed sources",
          fi: "531 vertaisarvioitua lähdettä",
          ja: "531件の査読済み文献",
          fr: "531 sources évaluées par des pairs",
          ko: "531개의 동료심사 출처",
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

export interface ExploreTab {
  key: "map" | "country" | "global" | "sentinel" | "data" | "layers" | "threshold" | "civilizations" | "naturalEM";
  labels: Labels;
  icon: LucideIcon;
}

export const EXPLORE_TABS: ExploreTab[] = [
  { key: "map", labels: { en: "Map", fi: "Kartta", ja: "地図", fr: "Carte", ko: "지도" }, icon: Map },
  { key: "country", labels: { en: "Country", fi: "Maa", ja: "国別", fr: "Pays", ko: "국가" }, icon: ChartLine },
  { key: "global", labels: { en: "Global", fi: "Globaali", ja: "グローバル", fr: "Mondial", ko: "글로벌" }, icon: Globe2 },
  { key: "threshold", labels: { en: "T→TFR", fi: "T→TFR", ja: "T→TFR", fr: "T→TFR", ko: "T→TFR" }, icon: Activity },
  { key: "sentinel", labels: { en: "Sentinel", fi: "Indikaattorit", ja: "指標種", fr: "Sentinelles", ko: "감시종" }, icon: Leaf },
  { key: "data", labels: { en: "Aineisto", fi: "Aineisto", ja: "データ", fr: "Données", ko: "데이터" }, icon: Database },
  { key: "layers", labels: { en: "Layers", fi: "Kerrokset", ja: "レイヤー", fr: "Couches", ko: "레이어" }, icon: Layers },
  { key: "civilizations", labels: { en: "Civilizations", fi: "Sivilisaatiot", ja: "文明", fr: "Civilisations", ko: "문명" }, icon: Landmark },
  { key: "naturalEM", labels: { en: "Natural EM", fi: "Luonnollinen EM", ja: "自然EM", fr: "EM naturel", ko: "자연 EM" }, icon: Radio },
];

export function getExploreTabs(locale: string) {
  const key = (locale === "fi" || locale === "ja" || locale === "fr" || locale === "ko") ? locale as Locale : "en";
  return EXPLORE_TABS.map((tab) => ({
    key: tab.key,
    label: tab.labels[key],
    icon: tab.icon,
  }));
}
