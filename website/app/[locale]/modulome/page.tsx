import type { Metadata } from "next";
import Link from "next/link";
import { Layers } from "lucide-react";
import { pickCopy } from "@/lib/i18n";
import { PageHeader } from "@/components/PageHeader";
import { LayerStack } from "@/components/modulome/LayerStack";
import { ModulomeLayers } from "@/components/ModulomeLayers";
import { MODULOME_LAYERS } from "@/lib/modulome/layers";
import { ORGAN_PROFILES } from "@/lib/modulome/organs";
import { FERTILITY_ROUTES } from "@/lib/modulome/routes";

/* ── Bilingual copy ── */
const COPY = {
  en: {
    title: "EMF Modulome",
    subtitle:
      "Systematic mapping of electromagnetic susceptibility across the human body",
    /* Section 1: Hero */
    heroHeading: "THE HUMAN BODY AS AN ELECTROMAGNETIC SYSTEM",
    heroBody:
      "Every cell maintains voltage, every mitochondrion sustains \u0394\u03A8m, every barrier guards a gradient, every gland secretes via Ca\u00B2\u207A-dependent exocytosis, every heartbeat is paced by VGCCs. The EMF Modulome maps this: 12 layers, 10 target organs, 4 independent routes.",
    /* Section 2: Terminology */
    termHeading: "What is the EMF Modulome?",
    termBody:
      "The EMF Modulome is BERM\u2019s systematic mapping of electromagnetic susceptibility across the human body, analogous to how the genome maps genetic information and the proteome maps protein expression.",
    /* Section 3: Twelve Layers */
    layersHeading: "Twelve Layers",
    layersSubtitle:
      "From molecular spin physics to population-level patterns \u2014 each layer modulates \u03C7",
    /* Section 4: Routes */
    routesHeading: "Four Independent Routes",
    routesMechanism: "Mechanism",
    routesBlocked: "Blocked by",
    routesOrgans: "Organ links",
    /* Section 5: Organs */
    organsHeading: "Twelve Target Organs",
    organCav3: "Cav3 subtype",
    organLevel: "Level",
    organView: "View organ profile",
    organComingSoon: "Coming soon",
    /* Section 6: Population */
    popHeading: "Population \u03C7 Profiles",
    popBody:
      "Each population occupies a unique position in \u03C7-space, determined by its combination of genetic variants (OCA2, LCT, CACNA1C), dietary patterns (B2, \u03C9-3 from dairy/fish), and environmental exposure (electrification history, latitude, urbanization). These profiles predict differential susceptibility to EMF effects and are testable against the 54-country fertility dataset.",
    popLink: "Explore evolution & population data",
    /* Section 7: Predictions */
    predHeading: "Testable Predictions",
    predIntro:
      "The Modulome generates specific, falsifiable predictions. Seven representative MOD-level predictions:",
    predictions: [
      "MOD-001: T-type Ca\u00B2\u207A channel blockers (ethosuximide) will attenuate RF-EMF effects on testosterone in Leydig cells.",
      "MOD-002: Populations with higher dairy consumption (B2 source) will show slower fertility decline rates.",
      "MOD-003: HRV reduction will precede measurable hormonal changes in chronic EMF exposure.",
      "MOD-004: Blue-eyed individuals (higher CRY sensitivity) will show stronger circadian disruption from evening screen use.",
      "MOD-005: Pituitary gonadotroph LH pulse frequency will be directly modulable by specific EMF frequencies.",
      "MOD-006: Mitochondrial age (measured by ΔΨm) will correlate with EMF susceptibility within the same cell type.",
      "MOD-007: EMF-induced sperm DNA methylation changes are detectable in occupationally exposed men and include VGCC-related gene loci (CACNA1C, CACNA1G). Preprint support: Research Square 2025 (radar-exposed men).",
    ],
    predLink: "Full predictions register",
    /* Navigation */
    seeAlso: "See also",
    modelPage: "BERM model",
    evidencePage: "Evidence register",
  },
  fi: {
    title: "EMF-modulomi",
    subtitle:
      "S\u00E4hk\u00F6magneettisen herkkyyden systemaattinen kartoitus ihmiskehossa",
    /* Section 1: Hero */
    heroHeading: "IHMISKEHO S\u00C4HK\u00D6MAGNEETTISENA J\u00C4RJESTELM\u00C4N\u00C4",
    heroBody:
      "Jokainen solu yll\u00E4pit\u00E4\u00E4 j\u00E4nnitett\u00E4, jokainen mitokondrio yll\u00E4pit\u00E4\u00E4 \u0394\u03A8m:\u00E4\u00E4, jokainen este vartioi gradienttia, jokainen rauhanen erittää Ca\u00B2\u207A-riippuvaisen eksosytoosin kautta, jokainen sy\u00E4menlyönti tahdistetaan VGCC:ill\u00E4. EMF-modulomi kartoittaa t\u00E4m\u00E4n: 12 kerrosta, 10 kohde-elint\u00E4, 4 itsenäistä reittiä.",
    /* Section 2: Terminology */
    termHeading: "Mik\u00E4 on EMF-modulomi?",
    termBody:
      "EMF-modulomi on BERM:n systemaattinen kartoitus s\u00E4hk\u00F6magneettisesta herkkyydest\u00E4 ihmiskehossa, analoginen sille miten genomi kartoittaa geneettist\u00E4 informaatiota ja proteomi proteiinien ilmentymist\u00E4.",
    /* Section 3: Twelve Layers */
    layersHeading: "Kaksitoista kerrosta",
    layersSubtitle:
      "Molekulaarisesta spinfysiikasta populaatiotason malleihin \u2014 kukin kerros moduloi \u03C7:\u00E4",
    /* Section 4: Routes */
    routesHeading: "Nelj\u00E4 itsen\u00E4ist\u00E4 reitti\u00E4",
    routesMechanism: "Mekanismi",
    routesBlocked: "Estet\u00E4\u00E4n",
    routesOrgans: "Elinlinkit",
    /* Section 5: Organs */
    organsHeading: "Kaksitoista kohde-elint\u00E4",
    organCav3: "Cav3-alatyyppi",
    organLevel: "Taso",
    organView: "N\u00E4yt\u00E4 elinprofiili",
    organComingSoon: "Tulossa pian",
    /* Section 6: Population */
    popHeading: "Populaation \u03C7-profiilit",
    popBody:
      "Kukin populaatio sijaitsee ainutlaatuisessa pisteess\u00E4 \u03C7-avaruudessa, m\u00E4\u00E4ritettyn\u00E4 sen geneettisten varianttien (OCA2, LCT, CACNA1C), ravitsemusmallien (B2, \u03C9-3 maidosta/kalasta) ja ymp\u00E4rist\u00F6altistuksen (s\u00E4hk\u00F6istymishistoria, leveysaste, kaupungistuminen) yhdistelm\u00E4ll\u00E4. N\u00E4m\u00E4 profiilit ennustavat erilaista herkkyyttä EMF-vaikutuksille ja ovat testattavissa 54 maan fertiliteettiaineistoa vasten.",
    popLink: "Tutustu evoluutio- ja populaatiodataan",
    /* Section 7: Predictions */
    predHeading: "Testattavat ennusteet",
    predIntro:
      "Modulomi tuottaa spesifisi\u00E4, falsifioitavia ennusteita. Seitsem\u00E4n edustavaa MOD-tason ennustetta:",
    predictions: [
      "MOD-001: T-tyypin Ca\u00B2\u207A-kanavasalpaajat (etosuksimidi) vaimentavat RF-EMF:n vaikutuksia testosteroniin Leydigin soluissa.",
      "MOD-002: Populaatiot, joilla on korkeampi maitotuotteiden kulutus (B2-l\u00E4hde), osoittavat hitaampaa fertiliteetin laskua.",
      "MOD-003: HRV:n lasku edelt\u00E4\u00E4 mitattavia hormonaalisia muutoksia kroonisessa EMF-altistuksessa.",
      "MOD-004: Sinisilm\u00E4iset yksil\u00F6t (korkeampi CRY-herkkyys) osoittavat voimakkaampaa sirkadiaanista h\u00E4iri\u00F6t\u00E4 iltaisesta n\u00E4ytt\u00F6k\u00E4yt\u00F6st\u00E4.",
      "MOD-005: Aivolisäkkeen gonadotroopin LH-pulssitaajuus on suoraan moduloitavissa tietyill\u00E4 EMF-taajuuksilla.",
      "MOD-006: Mitokondrion ik\u00E4 (mitattuna \u0394\u03A8m:ll\u00E4) korreloi EMF-herkkyyden kanssa saman solutyypin sis\u00E4ll\u00E4.",
      "MOD-007: EMF-indusoidut siitti\u00F6iden DNA-metylaatiomuutokset ovat havaittavissa ammatillisesti altistuneilla miehill\u00E4 ja sis\u00E4lt\u00E4v\u00E4t VGCC-geenilokuksia (CACNA1C, CACNA1G). Preprint-tuki: Research Square 2025 (tutkalle altistuneet miehet).",
    ],
    predLink: "T\u00E4ydellinen ennusterekisteri",
    /* Navigation */
    seeAlso: "Katso my\u00F6s",
    modelPage: "BERM-malli",
    evidencePage: "Evidenssirekisteri",
  },
  ja: {
    title: "EMFモジュローム",
    subtitle:
      "人体全体にわたる電磁感受性の体系的マッピング",
    /* Section 1: Hero */
    heroHeading: "電磁システムとしての人体",
    heroBody:
      "すべての細胞は電圧を維持し、すべてのミトコンドリアはΔΨmを維持し、すべてのバリアは勾配を守り、すべての腺はCa²⁺依存性エキソサイトーシスを介して分泌し、すべての心拍はVGCCによって調律される。EMFモジュロームはこれをマッピングする：12層、10の標的臓器、4つの独立経路。",
    /* Section 2: Terminology */
    termHeading: "EMFモジュロームとは？",
    termBody:
      "EMFモジュロームは、ゲノムが遺伝情報をマッピングし、プロテオームがタンパク質発現をマッピングするのと同様に、人体全体にわたる電磁感受性のBERMによる体系的マッピングである。",
    /* Section 3: Twelve Layers */
    layersHeading: "12の層",
    layersSubtitle:
      "分子スピン物理学から集団レベルのパターンまで — 各層はχを変調する",
    /* Section 4: Routes */
    routesHeading: "4つの独立経路",
    routesMechanism: "メカニズム",
    routesBlocked: "阻害因子",
    routesOrgans: "臓器リンク",
    /* Section 5: Organs */
    organsHeading: "12の標的臓器",
    organCav3: "Cav3サブタイプ",
    organLevel: "レベル",
    organView: "臓器プロファイルを表示",
    organComingSoon: "近日公開",
    /* Section 6: Population */
    popHeading: "集団χプロファイル",
    popBody:
      "各集団は、遺伝的変異（OCA2、LCT、CACNA1C）、食事パターン（乳製品・魚由来のB2、ω-3）、環境曝露（電化の歴史、緯度、都市化）の組み合わせによって決定されるχ空間内の固有の位置を占める。これらのプロファイルはEMF効果に対する差異的感受性を予測し、54カ国の出生率データセットに対して検証可能である。",
    popLink: "進化と集団データを探る",
    /* Section 7: Predictions */
    predHeading: "検証可能な予測",
    predIntro:
      "モジュロームは特定の反証可能な予測を生成する。7つの代表的なMODレベル予測：",
    predictions: [
      "MOD-001: T型Ca²⁺チャネル遮断薬（エトスクシミド）は、ライディッヒ細胞におけるRF-EMFのテストステロンへの影響を減弱させる。",
      "MOD-002: 乳製品消費量が多い集団（B2源）は、出生率低下がより緩やかである。",
      "MOD-003: 慢性EMF曝露において、HRVの低下は測定可能なホルモン変化に先行する。",
      "MOD-004: 青い目の個人（CRY感受性が高い）は、夕方のスクリーン使用による概日リズム障害がより強い。",
      "MOD-005: 下垂体ゴナドトロフのLHパルス頻度は、特定のEMF周波数によって直接変調可能である。",
      "MOD-006: ミトコンドリア年齢（ΔΨmで測定）は、同一細胞型内でEMF感受性と相関する。",
      "MOD-007: EMF誘発性の精子DNAメチル化変化は、職業的に曝露された男性で検出可能であり、VGCC関連遺伝子座（CACNA1C、CACNA1G）を含む。プレプリントサポート：Research Square 2025（レーダー曝露男性）。",
    ],
    predLink: "完全な予測レジスター",
    /* Navigation */
    seeAlso: "関連項目",
    modelPage: "BERMモデル",
    evidencePage: "エビデンスレジスター",
  },
  fr: {
    title: "Modulome EMF",
    subtitle:
      "Cartographie systématique de la susceptibilité électromagnétique dans le corps humain",
    /* Section 1: Hero */
    heroHeading: "LE CORPS HUMAIN COMME SYSTÈME ÉLECTROMAGNÉTIQUE",
    heroBody:
      "Chaque cellule maintient une tension, chaque mitochondrie soutient ΔΨm, chaque barrière protège un gradient, chaque glande sécrète par exocytose Ca²⁺-dépendante, chaque battement cardiaque est cadencé par les VGCC. Le Modulome EMF cartographie ceci : 12 couches, 10 organes cibles, 4 voies indépendantes.",
    /* Section 2: Terminology */
    termHeading: "Qu'est-ce que le Modulome EMF ?",
    termBody:
      "Le Modulome EMF est la cartographie systématique par BERM de la susceptibilité électromagnétique dans le corps humain, analogue à la façon dont le génome cartographie l'information génétique et le protéome cartographie l'expression protéique.",
    /* Section 3: Twelve Layers */
    layersHeading: "Douze couches",
    layersSubtitle:
      "De la physique du spin moléculaire aux tendances au niveau populationnel — chaque couche module χ",
    /* Section 4: Routes */
    routesHeading: "Quatre voies indépendantes",
    routesMechanism: "Mécanisme",
    routesBlocked: "Bloqué par",
    routesOrgans: "Liens d'organes",
    /* Section 5: Organs */
    organsHeading: "Douze organes cibles",
    organCav3: "Sous-type Cav3",
    organLevel: "Niveau",
    organView: "Voir le profil d'organe",
    organComingSoon: "Bientôt disponible",
    /* Section 6: Population */
    popHeading: "Profils χ de population",
    popBody:
      "Chaque population occupe une position unique dans l'espace χ, déterminée par sa combinaison de variantes génétiques (OCA2, LCT, CACNA1C), de schémas alimentaires (B2, ω-3 provenant des produits laitiers/du poisson) et d'exposition environnementale (historique d'électrification, latitude, urbanisation). Ces profils prédisent une susceptibilité différentielle aux effets des EMF et sont testables par rapport au jeu de données de fécondité de 54 pays.",
    popLink: "Explorer les données d'évolution et de population",
    /* Section 7: Predictions */
    predHeading: "Prédictions testables",
    predIntro:
      "Le Modulome génère des prédictions spécifiques et falsifiables. Sept prédictions représentatives de niveau MOD :",
    predictions: [
      "MOD-001 : Les bloqueurs des canaux Ca²⁺ de type T (éthosuximide) atténueront les effets du RF-EMF sur la testostérone dans les cellules de Leydig.",
      "MOD-002 : Les populations ayant une consommation laitière plus élevée (source de B2) montreront des taux de déclin de la fécondité plus lents.",
      "MOD-003 : La réduction de la VFC précédera les changements hormonaux mesurables lors d'une exposition chronique aux EMF.",
      "MOD-004 : Les individus aux yeux bleus (sensibilité CRY plus élevée) montreront une perturbation circadienne plus forte liée à l'utilisation d'écrans en soirée.",
      "MOD-005 : La fréquence des impulsions de LH des gonadotrophes hypophysaires sera directement modulable par des fréquences EMF spécifiques.",
      "MOD-006 : L'âge mitochondrial (mesuré par ΔΨm) corrélera avec la susceptibilité aux EMF au sein du même type cellulaire.",
      "MOD-007 : Les changements de méthylation de l'ADN spermatique induits par les EMF sont détectables chez les hommes exposés professionnellement et incluent des loci géniques liés aux VGCC (CACNA1C, CACNA1G). Soutien de preprint : Research Square 2025 (hommes exposés au radar).",
    ],
    predLink: "Registre complet des prédictions",
    /* Navigation */
    seeAlso: "Voir aussi",
    modelPage: "Modèle BERM",
    evidencePage: "Registre des preuves",
  },
  ko: {
    title: "EMF 모듈롬",
    subtitle:
      "인체 전반에 걸친 전자기 감수성의 체계적 매핑",
    /* Section 1: Hero */
    heroHeading: "전자기 시스템으로서의 인체",
    heroBody:
      "모든 세포는 전압을 유지하고, 모든 미토콘드리아는 ΔΨm을 유지하며, 모든 장벽은 기울기를 보호하고, 모든 분비선은 Ca²⁺ 의존성 세포외배출을 통해 분비하며, 모든 심박은 VGCC에 의해 조율된다. EMF 모듈롬은 이를 매핑한다: 12개 층, 10개 표적 기관, 4개 독립 경로.",
    /* Section 2: Terminology */
    termHeading: "EMF 모듈롬이란?",
    termBody:
      "EMF 모듈롬은 게놈이 유전 정보를, 프로테옴이 단백질 발현을 매핑하는 것과 유사하게, 인체 전반에 걸친 전자기 감수성에 대한 BERM의 체계적 매핑이다.",
    /* Section 3: Twelve Layers */
    layersHeading: "12개 층",
    layersSubtitle:
      "분자 스핀 물리학에서 집단 수준 패턴까지 — 각 층은 χ를 조절한다",
    /* Section 4: Routes */
    routesHeading: "4개 독립 경로",
    routesMechanism: "메커니즘",
    routesBlocked: "차단 인자",
    routesOrgans: "기관 연결",
    /* Section 5: Organs */
    organsHeading: "12개 표적 기관",
    organCav3: "Cav3 하위유형",
    organLevel: "수준",
    organView: "기관 프로파일 보기",
    organComingSoon: "준비 중",
    /* Section 6: Population */
    popHeading: "집단 χ 프로파일",
    popBody:
      "각 집단은 유전적 변이(OCA2, LCT, CACNA1C), 식이 패턴(유제품·어류 유래 B2, ω-3), 환경 노출(전기화 역사, 위도, 도시화)의 조합에 의해 결정되는 χ 공간 내 고유한 위치를 차지한다. 이러한 프로파일은 EMF 효과에 대한 차별적 감수성을 예측하며, 54개국 출산율 데이터셋에 대해 검증 가능하다.",
    popLink: "진화 및 집단 데이터 탐색",
    /* Section 7: Predictions */
    predHeading: "검증 가능한 예측",
    predIntro:
      "모듈롬은 구체적이고 반증 가능한 예측을 생성한다. 7개의 대표적인 MOD 수준 예측:",
    predictions: [
      "MOD-001: T형 Ca²⁺ 채널 차단제(에토숙시미드)는 라이디히 세포에서 RF-EMF의 테스토스테론에 대한 영향을 감쇠시킨다.",
      "MOD-002: 유제품 소비가 높은 집단(B2 공급원)은 출산율 감소 속도가 더 느리다.",
      "MOD-003: 만성 EMF 노출에서 HRV 감소는 측정 가능한 호르몬 변화에 선행한다.",
      "MOD-004: 파란 눈을 가진 개인(CRY 감수성이 높음)은 저녁 스크린 사용으로 인한 일주기 리듬 장애가 더 강하게 나타난다.",
      "MOD-005: 뇌하수체 생식선자극세포의 LH 펄스 빈도는 특정 EMF 주파수에 의해 직접 조절 가능하다.",
      "MOD-006: 미토콘드리아 연령(ΔΨm으로 측정)은 동일 세포 유형 내에서 EMF 감수성과 상관관계가 있다.",
      "MOD-007: EMF 유발 정자 DNA 메틸화 변화는 직업적으로 노출된 남성에서 검출 가능하며, VGCC 관련 유전자 좌위(CACNA1C, CACNA1G)를 포함한다. 프리프린트 지원: Research Square 2025 (레이더 노출 남성).",
    ],
    predLink: "전체 예측 레지스터",
    /* Navigation */
    seeAlso: "참고 항목",
    modelPage: "BERM 모델",
    evidencePage: "증거 레지스터",
  },
};

const LEVEL_BADGE: Record<string, string> = {
  E: "bg-green-500/10 text-green-600 dark:text-green-400",
  M: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  C: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
  "M|C": "bg-amber-500/10 text-amber-600 dark:text-amber-400",
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const d = pickCopy(COPY, locale);
  return {
    title: `${d.title} \u2013 Extinction Field`,
    description: d.subtitle,
  };
}

export default async function ModulomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const d = pickCopy(COPY, locale);
  const l = locale;

  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <PageHeader icon={Layers} title={d.title} subtitle={d.subtitle} />

      {/* ── 01 Hero ── */}
      <section className="mb-16 border-t editorial-rule pt-6">
        <h2 className="text-lg font-semibold mb-4 tracking-wide">
          {d.heroHeading}
        </h2>
        <p className="editorial-rail text-[0.95rem] leading-relaxed text-foreground max-w-4xl">
          {d.heroBody}
        </p>
      </section>

      {/* ── 02 Terminology note ── */}
      <section className="mb-16">
        <div className="rounded-lg border border-card-border bg-card p-5 max-w-3xl">
          <h3 className="text-sm font-bold text-foreground mb-2">
            {d.termHeading}
          </h3>
          <p className="text-sm text-foreground-muted leading-relaxed">
            {d.termBody}
          </p>
        </div>
      </section>

      {/* ── 03 Twelve Layers ── */}
      <section className="mb-16 border-t editorial-rule pt-6">
        <h3 className="text-lg font-semibold mb-1">
          <span className="font-mono-num text-xs text-accent mr-2">03</span>
          {d.layersHeading}
        </h3>
        <p className="text-sm text-foreground-muted mb-6">{d.layersSubtitle}</p>

        <LayerStack layers={MODULOME_LAYERS} locale={l} />

        <div className="mt-10">
          <ModulomeLayers locale={l} />
        </div>
      </section>

      {/* ── 04 Four Independent Routes ── */}
      <section className="mb-16 border-t editorial-rule pt-6">
        <h3 className="text-lg font-semibold mb-6">
          <span className="font-mono-num text-xs text-accent mr-2">04</span>
          {d.routesHeading}
        </h3>

        <div className="grid gap-5 sm:grid-cols-2">
          {FERTILITY_ROUTES.map((route) => {
            const name = l === "fi" ? route.nameFi : l === "ja" ? route.nameJa : l === "fr" ? route.nameFr : l === "ko" ? route.nameKo : route.nameEn;
            const mechanism =
              l === "fi" ? route.mechanismFi : l === "ja" ? route.mechanismJa : l === "fr" ? route.mechanismFr : l === "ko" ? route.mechanismKo : route.mechanismEn;
            const blocked =
              l === "fi" ? route.blockedByFi : l === "ja" ? route.blockedByJa : l === "fr" ? route.blockedByFr : l === "ko" ? route.blockedByKo : route.blockedByEn;

            return (
              <div
                key={route.id}
                className="rounded-lg bg-card border border-card-border p-5 space-y-3"
                style={{ borderLeftWidth: 4, borderLeftColor: route.color }}
              >
                <div className="flex items-start justify-between gap-2">
                  <h4 className="font-bold text-foreground text-sm leading-tight">
                    {name}
                  </h4>
                  {route.isNew && (
                    <span className="shrink-0 text-[0.6rem] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-accent/10 text-accent">
                      {l === "fi" ? "UUSI" : l === "fr" ? "NOUVEAU" : "NEW"}
                    </span>
                  )}
                </div>

                <div>
                  <p className="text-xs font-semibold text-foreground-muted uppercase tracking-wider mb-1">
                    {d.routesMechanism}
                  </p>
                  <p className="text-xs text-foreground-muted leading-relaxed">
                    {mechanism}
                  </p>
                </div>

                <div>
                  <p className="text-xs font-semibold text-foreground-muted uppercase tracking-wider mb-1">
                    {d.routesBlocked}
                  </p>
                  <p className="text-xs text-foreground-muted leading-relaxed">
                    {blocked}
                  </p>
                </div>

                <div>
                  <p className="text-xs font-semibold text-foreground-muted uppercase tracking-wider mb-1">
                    {d.routesOrgans}
                  </p>
                  <p className="text-xs text-foreground-muted leading-relaxed font-mono">
                    {route.organLinks.join(", ")}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── 05 Eight Target Organs ── */}
      <section className="mb-16 border-t editorial-rule pt-6">
        <h3 className="text-lg font-semibold mb-6">
          <span className="font-mono-num text-xs text-accent mr-2">05</span>
          {d.organsHeading}
        </h3>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {ORGAN_PROFILES.map((organ) => {
            const name = l === "fi" ? organ.nameFi : l === "ja" ? organ.nameJa : l === "fr" ? organ.nameFr : l === "ko" ? organ.nameKo : organ.nameEn;
            const summary = l === "fi" ? organ.summaryFi : l === "ja" ? organ.summaryJa : l === "fr" ? organ.summaryFr : l === "ko" ? organ.summaryKo : organ.summaryEn;

            return (
              <div
                key={organ.id}
                className="rounded-lg bg-card border border-card-border p-5 space-y-3"
                style={{ borderTopWidth: 4, borderTopColor: organ.color }}
              >
                <div className="flex items-start justify-between gap-2">
                  <h4 className="font-bold text-foreground text-sm">
                    {name}
                  </h4>
                  <span
                    className={`shrink-0 text-[0.65rem] font-semibold px-1.5 py-0.5 rounded ${LEVEL_BADGE[organ.level] ?? LEVEL_BADGE.M}`}
                  >
                    {organ.level}
                  </span>
                </div>

                <p className="text-xs text-foreground-muted leading-relaxed">
                  {summary}
                </p>

                <div>
                  <p className="text-xs font-semibold text-foreground-muted uppercase tracking-wider mb-1">
                    {d.organCav3}
                  </p>
                  <p className="text-xs text-foreground-muted font-mono">
                    {organ.cav3Subtype}
                  </p>
                </div>

                {organ.ready ? (
                  <Link
                    href={`/${locale}${organ.subpage}`}
                    className="inline-block text-xs text-accent hover:underline"
                  >
                    {d.organView} &rarr;
                  </Link>
                ) : (
                  <span className="inline-block text-xs text-foreground-muted italic">
                    {d.organComingSoon}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* ── 06 Population chi Profiles ── */}
      <section className="mb-16 border-t editorial-rule pt-6">
        <h3 className="text-lg font-semibold mb-4">
          <span className="font-mono-num text-xs text-accent mr-2">06</span>
          {d.popHeading}
        </h3>

        <p className="text-sm text-foreground-muted leading-relaxed max-w-4xl mb-4">
          {d.popBody}
        </p>

        <Link
          href={`/${locale}/evidence/evolution`}
          className="text-sm text-accent hover:underline"
        >
          {d.popLink} &rarr;
        </Link>
      </section>

      {/* ── 07 Testable Predictions ── */}
      <section className="mb-16 border-t editorial-rule pt-6">
        <h3 className="text-lg font-semibold mb-4">
          <span className="font-mono-num text-xs text-accent mr-2">07</span>
          {d.predHeading}
        </h3>

        <p className="text-sm text-foreground-muted mb-4">{d.predIntro}</p>

        <ul className="space-y-2 text-sm text-foreground-muted leading-relaxed max-w-4xl">
          {d.predictions.map((pred, i) => (
            <li key={i} className="pl-1 flex gap-2">
              <span className="shrink-0 text-accent font-mono text-xs mt-0.5">
                {"\u2022"}
              </span>
              <span>{pred}</span>
            </li>
          ))}
        </ul>

        <Link
          href={`/${locale}/predictions`}
          className="inline-block mt-4 text-sm text-accent hover:underline"
        >
          {d.predLink} &rarr;
        </Link>
      </section>

      {/* ── See also ── */}
      <section className="border-t editorial-rule pt-6">
        <h3 className="text-sm font-semibold text-foreground mb-3">
          {d.seeAlso}
        </h3>
        <div className="flex gap-6">
          <Link
            href={`/${locale}/model`}
            className="text-sm text-accent hover:underline"
          >
            {d.modelPage} &rarr;
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
