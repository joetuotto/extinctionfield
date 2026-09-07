import type { Metadata } from "next";
import { Dna } from "lucide-react";
import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import {
  CHI_SCALES,
  NORTHERN_TRAITS,
  HISTORICAL_PHASES,
  POPULATION_PROFILES,
  EVOLUTION_PREDICTIONS,
} from "@/lib/evolutionData";
import {
  CHAIN_EPISTEMIC_COLORS,
  getChainEpistemicLabel,
} from "@/lib/epistemicConstants";
import type { EpistemicLevel } from "@/lib/types";
import { pickCopy, pickField } from "@/lib/i18n";
import { StudyCitation } from "@/components/StudyCitation";

const COPY = {
  en: {
    title: "Evolutionary Origins: The Northern Package",
    subtitle: "How co-selection of blue eyes, lactose tolerance, and cattle husbandry created the population most sensitive to EMF — and why that population's fertility declined first",
    backLink: "← Back to Evidence",
    section1Title: "One Function, Five Scales",
    section1Intro: "The geodesic-deviation chain gives the signed directional response and the algebraic χ_geo(q)=q/√(1+q²) formula at L1. Choosing q=|Ā| through a dimensionless, collinear Lorentz-to-Euclidean spatial/scalar projection is L2. Every thermal, optical, molecular, environmental or population variable z needs its own declared q=N(z) at the open L0→L2 boundary; named biological responses are imported L3 components.",
    section2Title: "The Northern Package",
    section2Intro: [
      "Three traits co-selected in Northern European populations between 10,000 and 6,000 years ago: blue eyes (OCA2), lactose tolerance (LCT), and cattle husbandry. The conventional explanation treats each as an independent adaptation — blue eyes for vitamin D synthesis, lactose tolerance for calcium absorption, cattle for food security.",
      "BERM proposes these three traits optimize a single molecular system: cryptochrome. Blue eyes maximize photon delivery to CRY1 in retinal blue cones (optical χ). Lactose tolerance ensures year-round riboflavin (B2) supply via dairy, providing the FAD chromophore that CRY requires (molecular χ). Cattle husbandry is the cultural adaptation that sustains B2 supply through Northern winters when foraging and solar synthesis fail.",
      "If correct, the Northern Package represents the strongest biological amplifier of EMF sensitivity in any human population — and explains why Northern Europe was both the first region to electrify and the first below replacement fertility.",
    ],
    section3Title: "Four Historical Phases",
    section3Intro: "The candidate interaction between L2-mapped biological χ values and L2-mapped environmental χ values creates a four-phase historical pattern to compare with observed fertility transitions. These mappings do not alter the underlying function's L1 status.",
    section4Title: "Population χ Profiles",
    section4Intro: "Each listed population profile combines rough L2 candidate mappings for biology (optical, molecular) and environment with imported L3 mechanisms. The resulting fertility trajectories are model outputs, not new geometric derivations.",
    profileHeaders: {
      population: "Population",
      chiEnv: "χ_env",
      chiOptical: "χ_optical",
      chiMolecular: "χ_molecular",
      pathway: "Dominant pathway",
      tfr: "Observed TFR",
      status: "Status",
    },
    section5Title: "Testable Predictions",
    section5Intro: "Twenty conditional predictions propagated through the L1 χ shape, open L2 mappings and imported L3 components. Each is designed to be falsifiable within its stated timeframe; an empirical intermediate does not reclassify the L1 derivation.",
    predictionHeaders: {
      test: "Test",
      falsification: "Falsification criterion",
      timeframe: "Timeframe",
    },
    traitHeaders: {
      trait: "Trait",
      gene: "Gene",
      mechanism: "Mechanism",
      cryLink: "CRY link",
    },
    scaleHeaders: {
      scale: "Scale",
      background: "Background (B)",
      perturbation: "Perturbation",
      expression: "χ expression",
      atZero: "At B = 0",
      atMax: "At B = max",
      verification: "Verification",
    },
    epistemicTitle: "Epistemic Status",
    epistemicText: "At the geometric layer, the χ_geo(q)=q/√(1+q²) formula is always L1, while choosing the positive spatial magnitude q=|Ā| is L2. The table's measured variables z require open L0→L2 normalizations q=N(z); χ_optical, χ_molecular and χ_pop are separately named imported L3 candidates. Evidence labels stay component-specific.",
    levelLabel: "Evidence level",
  },
  fi: {
    title: "Evoluution alkuperät: Pohjoinen paketti",
    subtitle: "Miten sinisilmäisyyden, laktoosinsietokyvyn ja karjankasvatuksen koselektio loi EMF:lle herkimmän populaation — ja miksi sen hedelmällisyys laski ensimmäisenä",
    backLink: "← Takaisin näyttöön",
    section1Title: "Yksi funktio, viisi skaalaa",
    section1Intro: "Geodeesipoikkeamaketju antaa etumerkillisen suunnatun vasteen ja algebrallisen χ_geo(q)=q/√(1+q²)-kaavan L1-tasolla. Koordinaatin q=|Ā| valinta dimensiottomalla, kollineaarisella Lorentz→Euklidisella spatiaalinen/skalaari-projektiolla on L2. Jokainen terminen, optinen, molekulaarinen, ympäristö- tai populaatiomuuttuja z tarvitsee oman q=N(z)-normalisointinsa avoimella L0→L2-rajalla; nimetyt biologiset vasteet ovat tuotuja L3-komponentteja.",
    section2Title: "Pohjoinen paketti",
    section2Intro: [
      "Kolme piirrettä koselektoitui Pohjois-Euroopan populaatioissa 10 000–6 000 vuotta sitten: siniset silmät (OCA2), laktoosinsietokyky (LCT) ja karjankasvatus. Perinteinen selitys käsittelee kutakin itsenäisenä adaptaationa — sinisiä silmiä D-vitamiinisynteesille, laktoosinsietokykyä kalsiumin imeytymiselle, karjaa ruokaturvalle.",
      "BERM ehdottaa, että nämä kolme piirrettä optimoivat yhden molekyläärisen järjestelmän: kryptokromin. Siniset silmät maksimoivat fotonien pääsyn CRY1:lle verkkokalvon sinisissä tapeissa (optinen χ). Laktoosinsietokyky varmistaa ympärivuotisen riboflaviinin (B2) saannin maitotuotteiden kautta, tarjoten FAD-kromoforin jota CRY vaatii (molekulaarinen χ). Karjankasvatus on kulttuurinen adaptaatio, joka ylläpitää B2-saantia pohjoisen talvien läpi kun keräily ja auringon synteesi eivät riitä.",
      "Jos tämä pitää paikkansa, Pohjoinen paketti edustaa voimakkainta biologista EMF-herkkyyden vahvistinta missään ihmispopulaatiossa — ja selittää, miksi Pohjois-Eurooppa sekä sähköistyi ensimmäisenä että laski ensimmäisenä alle uusiutumistason hedelmällisyyden.",
    ],
    section3Title: "Neljä historiallista vaihetta",
    section3Intro: "L2-tasolle kuvattujen biologisten χ-arvojen ja L2-tasolle kuvattujen ympäristön χ-arvojen ehdokasvuorovaikutus luo nelivaiheisen historiallisen kaavan, jota verrataan havaittuihin hedelmällisyyssiirtymiin. Nämä kuvaukset eivät muuta funktion L1-statusta.",
    section4Title: "Populaatioiden χ-profiilit",
    section4Intro: "Kukin esitetty populaatioprofiili yhdistää biologian (optisen ja molekulaarisen) ja ympäristön karkeita L2-ehdokaskuvauksia tuotuihin L3-mekanismeihin. Syntyvät hedelmällisyyskehityskulut ovat mallin tuloksia, eivät uusia geometrisia johtoja.",
    profileHeaders: {
      population: "Populaatio",
      chiEnv: "χ_env",
      chiOptical: "χ_optinen",
      chiMolecular: "χ_molekulaarinen",
      pathway: "Hallitseva polku",
      tfr: "Havaittu TFR",
      status: "Tila",
    },
    section5Title: "Testattavat ennusteet",
    section5Intro: "Kaksikymmentä ehdollista ennustetta, jotka on propagoitu L1-χ-muodon, avoimien L2-kuvausten ja tuotujen L3-komponenttien läpi. Jokainen on falsifioitavissa ilmoitetulla aikavälillä; empiirinen väliaskel ei luokittele L1-johtoa uudelleen.",
    predictionHeaders: {
      test: "Testi",
      falsification: "Falsifikaatiokriteeri",
      timeframe: "Aikaväli",
    },
    traitHeaders: {
      trait: "Piirre",
      gene: "Geeni",
      mechanism: "Mekanismi",
      cryLink: "CRY-yhteys",
    },
    scaleHeaders: {
      scale: "Skaala",
      background: "Tausta (B)",
      perturbation: "Häiriö",
      expression: "χ-lauseke",
      atZero: "Kun B = 0",
      atMax: "Kun B = maks",
      verification: "Todentaminen",
    },
    epistemicTitle: "Episteeminen tila",
    epistemicText: "Geometriatasolla χ_geo(q)=q/√(1+q²)-kaava on aina L1, kun taas positiivisen spatiaalisen itseisarvon q=|Ā| valinta on L2. Taulukon mitatut muuttujat z vaativat avoimet L0→L2-normalisoinnit q=N(z); χ_optical, χ_molecular ja χ_pop ovat erikseen nimettyjä tuotuja L3-ehdokkaita. Näyttömerkinnät säilyvät komponenttikohtaisina.",
    levelLabel: "Näyttötaso",
  },
  ja: {
    title: "進化の起源：ノーザンパッケージ",
    subtitle: "青い目、乳糖耐性、牧畜の共選択がいかにしてEMFに最も敏感な集団を生み出したか — そしてなぜその集団の出生率が最初に低下したのか",
    backLink: "← エビデンスに戻る",
    section1Title: "1つの関数、5つのスケール",
    section1Intro: "測地線偏差の連鎖は符号付き方向応答と代数式χ_geo(q)=q/√(1+q²)をL1で与える。無次元・共線Lorentz→Euclid空間・スカラー射影によるq=|Ā|の選択はL2である。熱・光・分子・環境・集団の各変数zには未解決L0→L2境界で固有のq=N(z)が必要で、名称付き生物応答は導入L3要素である。",
    section2Title: "ノーザンパッケージ",
    section2Intro: [
      "1万年から6千年前に北ヨーロッパの集団で3つの形質が共選択された：青い目(OCA2)、乳糖耐性(LCT)、牧畜。従来の説明はそれぞれを独立した適応として扱う — 青い目はビタミンD合成、乳糖耐性はカルシウム吸収、牧畜は食料安全保障のため。",
      "BERMはこれら3つの形質が単一の分子システムであるクリプトクロムを最適化すると提案する。青い目は網膜青色錐体のCRY1への光子送達を最大化する（光学的χ）。乳糖耐性は乳製品を通じた年間を通じたリボフラビン(B2)供給を確保し、CRYが必要とするFAD発色団を提供する（分子的χ）。牧畜は採集と太陽合成が不十分な北の冬を通じてB2供給を維持する文化的適応である。",
      "これが正しければ、ノーザンパッケージはヒトのいかなる集団においてもEMF感受性の最も強力な生物学的増幅器を表す — そしてなぜ北ヨーロッパが最初に電化し、最初に人口置換水準以下の出生率に達したのかを説明する。",
    ],
    section3Title: "4つの歴史的段階",
    section3Intro: "L2に写像された生物学的χ値と環境χ値の候補相互作用は、観察された出生率転換と比較する4段階の歴史的パターンを生む。これらの写像は関数のL1地位を変えない。",
    section4Title: "集団χプロファイル",
    section4Intro: "各集団プロファイルは、生物学（光学・分子）と環境の概算L2候補写像を、導入されたL3機構と組み合わせる。得られる出生率軌跡はモデル出力であり、新たな幾何学的導出ではない。",
    profileHeaders: {
      population: "集団",
      chiEnv: "χ_env",
      chiOptical: "χ_optical",
      chiMolecular: "χ_molecular",
      pathway: "優勢経路",
      tfr: "観測TFR",
      status: "状態",
    },
    section5Title: "検証可能な予測",
    section5Intro: "L1のχ形状、未解決L2写像、導入L3要素を通して伝播した20の条件付き予測。各予測は規定期間内に反証可能であり、経験的中間段階がL1導出を再分類することはない。",
    predictionHeaders: {
      test: "検証",
      falsification: "反証基準",
      timeframe: "期間",
    },
    traitHeaders: {
      trait: "形質",
      gene: "遺伝子",
      mechanism: "メカニズム",
      cryLink: "CRYリンク",
    },
    scaleHeaders: {
      scale: "スケール",
      background: "背景 (B)",
      perturbation: "摂動",
      expression: "χ式",
      atZero: "B = 0のとき",
      atMax: "B = maxのとき",
      verification: "検証",
    },
    epistemicTitle: "認識論的状態",
    epistemicText: "幾何学層ではχ_geo(q)=q/√(1+q²)式は常にL1で、正の空間量q=|Ā|の選択はL2である。表の測定変数zには未解決L0→L2正規化q=N(z)が必要で、χ_optical、χ_molecular、χ_popは別名の導入L3候補である。証拠ラベルは構成要素ごとに保持される。",
    levelLabel: "エビデンスレベル",
  },
  fr: {
    title: "Origines evolutives : le package nordique",
    subtitle: "Comment la co-selection des yeux bleus, de la tolerance au lactose et de l'elevage bovin a cree la population la plus sensible aux EMF — et pourquoi la fertilite de cette population a decline en premier",
    backLink: "← Retour aux preuves",
    section1Title: "Une fonction, cinq echelles",
    section1Intro: "La chaîne de déviation géodésique donne la réponse directionnelle signée et la formule algébrique χ_geo(q)=q/√(1+q²) en L1. Choisir q=|Ā| par une projection spatiale/scalarie sans dimension et colinéaire de Lorentz vers Euclide est L2. Chaque variable thermique, optique, moléculaire, environnementale ou démographique z exige son propre q=N(z) à la frontière L0→L2 ouverte ; les réponses biologiques nommées sont L3 importées.",
    section2Title: "Le package nordique",
    section2Intro: [
      "Trois traits ont ete co-selectionnes dans les populations d'Europe du Nord entre 10 000 et 6 000 ans : les yeux bleus (OCA2), la tolerance au lactose (LCT) et l'elevage bovin. L'explication conventionnelle traite chacun comme une adaptation independante — les yeux bleus pour la synthese de vitamine D, la tolerance au lactose pour l'absorption du calcium, le betail pour la securite alimentaire.",
      "BERM propose que ces trois traits optimisent un seul systeme moleculaire : le cryptochrome. Les yeux bleus maximisent la delivrance de photons au CRY1 dans les cones bleus retiniens (χ optique). La tolerance au lactose assure un apport annuel en riboflavine (B2) via les produits laitiers, fournissant le chromophore FAD que CRY necessite (χ moleculaire). L'elevage bovin est l'adaptation culturelle qui maintient l'apport en B2 pendant les hivers nordiques lorsque la cueillette et la synthese solaire sont insuffisantes.",
      "Si c'est correct, le package nordique represente le plus puissant amplificateur biologique de la sensibilite aux EMF dans toute population humaine — et explique pourquoi l'Europe du Nord a ete a la fois la premiere region a s'electrifier et la premiere en dessous du seuil de remplacement de la fertilite.",
    ],
    section3Title: "Quatre phases historiques",
    section3Intro: "L'interaction candidate entre valeurs biologiques et environnementales de χ appliquées en L2 produit un schéma historique en quatre phases à comparer aux transitions de fertilité observées. Ces applications ne changent pas le statut L1 de la fonction.",
    section4Title: "Profils χ des populations",
    section4Intro: "Chaque profil de population combine des applications candidates L2 approximatives de la biologie (optique, moléculaire) et de l'environnement avec des mécanismes L3 importés. Les trajectoires de fertilité obtenues sont des sorties du modèle, pas de nouvelles dérivations géométriques.",
    profileHeaders: {
      population: "Population",
      chiEnv: "χ_env",
      chiOptical: "χ_optique",
      chiMolecular: "χ_moleculaire",
      pathway: "Voie dominante",
      tfr: "TFR observe",
      status: "Statut",
    },
    section5Title: "Predictions testables",
    section5Intro: "Vingt prédictions conditionnelles propagées par la forme χ L1, les applications L2 ouvertes et les éléments L3 importés. Chacune est falsifiable dans le délai indiqué ; une étape empirique intermédiaire ne requalifie pas la dérivation L1.",
    predictionHeaders: {
      test: "Test",
      falsification: "Critere de falsification",
      timeframe: "Delai",
    },
    traitHeaders: {
      trait: "Trait",
      gene: "Gene",
      mechanism: "Mecanisme",
      cryLink: "Lien CRY",
    },
    scaleHeaders: {
      scale: "Echelle",
      background: "Arriere-plan (B)",
      perturbation: "Perturbation",
      expression: "Expression χ",
      atZero: "A B = 0",
      atMax: "A B = max",
      verification: "Verification",
    },
    epistemicTitle: "Statut epistemique",
    epistemicText: "Au niveau géométrique, la formule χ_geo(q)=q/√(1+q²) est toujours L1, tandis que le choix de la norme spatiale positive q=|Ā| est L2. Les variables mesurées z exigent des normalisations L0→L2 ouvertes q=N(z) ; χ_optical, χ_molecular et χ_pop sont des candidats L3 importés distincts. Les labels de preuve restent propres aux composants.",
    levelLabel: "Niveau de preuve",
  },
  ko: {
    title: "진화적 기원: 노던 패키지",
    subtitle: "파란 눈, 유당 내성, 소 사육의 공동선택이 어떻게 EMF에 가장 민감한 집단을 만들었는가 — 그리고 왜 그 집단의 출산율이 가장 먼저 감소했는가",
    backLink: "← 근거로 돌아가기",
    section1Title: "하나의 함수, 다섯 개의 스케일",
    section1Intro: "측지선 편차 연쇄는 부호 있는 방향 반응과 대수식 χ_geo(q)=q/√(1+q²)를 L1에서 준다. 무차원·공선 Lorentz→Euclid 공간·스칼라 사영으로 q=|Ā|를 선택하는 것은 L2다. 열·광학·분자·환경·집단 변수 z에는 열린 L0→L2 경계에서 고유한 q=N(z)가 필요하며, 명명된 생물 반응은 도입 L3 구성요소다.",
    section2Title: "노던 패키지",
    section2Intro: [
      "1만 년에서 6천 년 전 사이에 북유럽 집단에서 세 가지 형질이 공동선택되었다: 파란 눈(OCA2), 유당 내성(LCT), 소 사육. 기존 설명은 각각을 독립적 적응으로 다룬다 — 파란 눈은 비타민 D 합성, 유당 내성은 칼슘 흡수, 소는 식량 안보를 위해.",
      "BERM은 이 세 가지 형질이 단일 분자 시스템인 크립토크롬을 최적화한다고 제안한다. 파란 눈은 망막 청색 원추세포의 CRY1으로의 광자 전달을 극대화한다(광학적 χ). 유당 내성은 유제품을 통한 연중 리보플라빈(B2) 공급을 보장하여 CRY가 필요로 하는 FAD 발색단을 제공한다(분자적 χ). 소 사육은 채집과 태양 합성이 부족한 북방 겨울 동안 B2 공급을 유지하는 문화적 적응이다.",
      "이것이 맞다면, 노던 패키지는 인류 집단 중 EMF 감수성의 가장 강력한 생물학적 증폭기를 나타내며 — 왜 북유럽이 가장 먼저 전기화되고 가장 먼저 대체출산율 이하로 떨어졌는지를 설명한다.",
    ],
    section3Title: "네 가지 역사적 단계",
    section3Intro: "L2로 매핑된 생물학적 χ값과 환경적 χ값의 후보 상호작용은 관찰된 출산율 전환과 비교할 4단계 역사 패턴을 만든다. 이러한 매핑은 함수의 L1 지위를 바꾸지 않는다.",
    section4Title: "집단 χ 프로파일",
    section4Intro: "각 집단 프로파일은 생물학(광학·분자)과 환경의 대략적인 L2 후보 매핑을 도입된 L3 메커니즘과 결합한다. 그 출산율 궤적은 모델 출력이지 새로운 기하학적 도출이 아니다.",
    profileHeaders: {
      population: "집단",
      chiEnv: "χ_env",
      chiOptical: "χ_optical",
      chiMolecular: "χ_molecular",
      pathway: "우세 경로",
      tfr: "관측 TFR",
      status: "상태",
    },
    section5Title: "검증 가능한 예측",
    section5Intro: "L1 χ 형태, 열린 L2 매핑, 도입된 L3 구성요소를 통해 전파된 스무 가지 조건부 예측. 각각은 명시된 기간 내에 반증 가능하며, 경험적 중간 단계가 L1 도출을 재분류하지 않는다.",
    predictionHeaders: {
      test: "검증",
      falsification: "반증 기준",
      timeframe: "기간",
    },
    traitHeaders: {
      trait: "형질",
      gene: "유전자",
      mechanism: "메커니즘",
      cryLink: "CRY 연결",
    },
    scaleHeaders: {
      scale: "스케일",
      background: "배경 (B)",
      perturbation: "교란",
      expression: "χ 식",
      atZero: "B = 0일 때",
      atMax: "B = max일 때",
      verification: "검증",
    },
    epistemicTitle: "인식론적 상태",
    epistemicText: "기하학 층에서 χ_geo(q)=q/√(1+q²) 공식은 항상 L1이고 양의 공간 크기 q=|Ā| 선택은 L2다. 표의 측정 변수 z에는 열린 L0→L2 정규화 q=N(z)가 필요하며 χ_optical·χ_molecular·χ_pop은 별도 명칭의 도입 L3 후보다. 증거 표지는 구성요소별로 유지된다.",
    levelLabel: "근거 수준",
  },
} as const;

function EpistemicBadge({ level, locale }: { level: string; locale: string }) {
  const color = CHAIN_EPISTEMIC_COLORS[level as EpistemicLevel] ?? "#6B7280";
  const label = getChainEpistemicLabel(level as EpistemicLevel, locale);
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold"
      style={{ backgroundColor: `${color}20`, color, border: `1px solid ${color}40` }}
    >
      {level} — {label}
    </span>
  );
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const d = pickCopy(COPY, locale);
  return { title: `${d.title} – Extinction Field`, description: d.subtitle };
}

export default async function EvolutionPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const d = pickCopy(COPY, locale);

  return (
    <div className="max-w-4xl mx-auto overflow-x-clip px-6 py-16">
      <Link href={`/${locale}/evidence`} className="text-sm text-accent hover:underline mb-6 inline-block">
        {d.backLink}
      </Link>

      <PageHeader icon={Dna} title={d.title} subtitle={d.subtitle} />

      {/* Section 1: One Function, Five Scales */}
      <section className="mb-16">
        <h2 className="editorial-section-heading mb-6">{d.section1Title}</h2>
        <p className="text-[0.95rem] leading-relaxed text-foreground max-w-3xl mb-8">
          {d.section1Intro}
        </p>

        <div className="space-y-4">
          {CHI_SCALES.map((scale, i) => {
            return (
              <article
                key={scale.id}
                className="rounded-lg border border-card-border bg-card-bg p-5"
              >
                <div className="mb-3 flex flex-col items-start gap-3 sm:flex-row sm:justify-between sm:gap-4">
                  <h3 className="min-w-0 text-lg font-semibold">
                    <span className="font-mono-num text-xs text-accent mr-2">{i + 1}</span>
                    {pickField(scale, "label", locale)}
                  </h3>
                  <EpistemicBadge level={scale.level} locale={locale} />
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <tbody>
                      <tr className="border-b border-card-border/40">
                        <td className="py-2 pr-3 font-semibold text-foreground-muted w-32">{d.scaleHeaders.background}</td>
                        <td className="py-2 text-foreground">{pickField(scale, "background", locale)}</td>
                      </tr>
                      <tr className="border-b border-card-border/40">
                        <td className="py-2 pr-3 font-semibold text-foreground-muted">{d.scaleHeaders.perturbation}</td>
                        <td className="py-2 text-foreground">{pickField(scale, "perturbation", locale)}</td>
                      </tr>
                      <tr className="border-b border-card-border/40">
                        <td className="py-2 pr-3 font-semibold text-foreground-muted">{d.scaleHeaders.expression}</td>
                        <td className="py-2 text-foreground text-xs">
                          <div className="font-mono">{scale.chi_expression}</div>
                          <div className="mt-1 font-mono text-[10px] text-foreground-muted">
                            χ_geo: {scale.chi_derivation_status} · N(·): {scale.coordinate_mapping_status}
                          </div>
                        </td>
                      </tr>
                      <tr className="border-b border-card-border/40">
                        <td className="py-2 pr-3 font-semibold text-foreground-muted">{d.scaleHeaders.atZero}</td>
                        <td className="py-2 text-foreground-muted">{pickField(scale, "at_zero", locale)}</td>
                      </tr>
                      <tr className="border-b border-card-border/40">
                        <td className="py-2 pr-3 font-semibold text-foreground-muted">{d.scaleHeaders.atMax}</td>
                        <td className="py-2 text-foreground">{pickField(scale, "at_max", locale)}</td>
                      </tr>
                      <tr>
                        <td className="py-2 pr-3 font-semibold text-foreground-muted">{d.scaleHeaders.verification}</td>
                        <td className="py-2 text-foreground-muted text-xs">
                          {scale.referenceIds?.length
                            ? scale.referenceIds.map((referenceId, index) => (
                                <span key={referenceId}>
                                  {index > 0 ? ", " : null}
                                  <StudyCitation referenceId={referenceId} locale={locale} />
                                </span>
                              ))
                            : scale.verification}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* Section 2: The Northern Package */}
      <section className="mb-16 border-t editorial-rule pt-6">
        <h2 className="editorial-section-heading mb-6">{d.section2Title}</h2>
        <div className="space-y-4 text-[0.95rem] leading-relaxed text-foreground max-w-3xl mb-8">
          {d.section2Intro.map((paragraph, i) => (
            <p key={i} className={i === 2 ? "font-semibold" : ""}>{paragraph}</p>
          ))}
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-card-border text-left text-xs text-foreground-muted uppercase tracking-wider">
                <th className="py-2 pr-3">{d.traitHeaders.trait}</th>
                <th className="py-2 pr-3">{d.traitHeaders.gene}</th>
                <th className="py-2 pr-3">{d.traitHeaders.mechanism}</th>
                <th className="py-2 pr-3">{d.traitHeaders.cryLink}</th>
                <th className="py-2 w-16">{d.levelLabel}</th>
              </tr>
            </thead>
            <tbody>
              {NORTHERN_TRAITS.map((trait) => {
                const traitColor = CHAIN_EPISTEMIC_COLORS[trait.level as EpistemicLevel] ?? "#6B7280";
                return (
                  <tr key={trait.id} className="border-b border-card-border/40">
                    <td className="py-3 pr-3 font-medium text-foreground">{pickField(trait, "trait", locale)}</td>
                    <td className="py-3 pr-3 text-foreground-muted font-mono text-xs">{trait.gene}</td>
                    <td className="py-3 pr-3 text-foreground-muted text-xs leading-relaxed">{pickField(trait, "mechanism", locale)}</td>
                    <td className="py-3 pr-3 text-foreground-muted text-xs leading-relaxed">{pickField(trait, "cry_link", locale)}</td>
                    <td className="py-3">
                      <span className="rounded-full px-1.5 py-0.5 text-xs font-semibold" style={{ backgroundColor: `${traitColor}20`, color: traitColor }}>
                        {trait.level}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      {/* Section 3: Four Historical Phases */}
      <section className="mb-16 border-t editorial-rule pt-6">
        <h2 className="editorial-section-heading mb-6">{d.section3Title}</h2>
        <p className="text-[0.95rem] leading-relaxed text-foreground max-w-3xl mb-8">
          {d.section3Intro}
        </p>

        <div className="space-y-4">
          {HISTORICAL_PHASES.map((phase) => (
            <article
              key={phase.id}
              className="rounded-lg border border-card-border bg-card-bg p-5"
            >
              <div className="flex items-start gap-4 mb-2">
                <span className="shrink-0 font-mono-num text-xs text-accent bg-accent/10 rounded-full px-2.5 py-1">
                  {phase.period}
                </span>
                <h3 className="text-base font-semibold text-foreground">
                  {pickField(phase, "title", locale)}
                </h3>
              </div>
              <p className="text-sm text-foreground-muted leading-relaxed">
                {pickField(phase, "description", locale)}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* Section 4: Population χ Profiles */}
      <section className="mb-16 border-t editorial-rule pt-6">
        <h2 className="editorial-section-heading mb-6">{d.section4Title}</h2>
        <p className="text-[0.95rem] leading-relaxed text-foreground max-w-3xl mb-8">
          {d.section4Intro}
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-card-border text-left text-xs text-foreground-muted uppercase tracking-wider">
                <th className="py-2 pr-3">{d.profileHeaders.population}</th>
                <th className="py-2 pr-3">{d.profileHeaders.chiEnv}</th>
                <th className="py-2 pr-3">{d.profileHeaders.chiOptical}</th>
                <th className="py-2 pr-3">{d.profileHeaders.chiMolecular}</th>
                <th className="py-2 pr-3">{d.profileHeaders.pathway}</th>
                <th className="py-2 pr-3">{d.profileHeaders.tfr}</th>
                <th className="py-2 pr-3">{d.profileHeaders.status}</th>
              </tr>
            </thead>
            <tbody>
              {POPULATION_PROFILES.map((p) => (
                <tr key={p.id} className="border-b border-card-border/40">
                  <td className="py-3 pr-3 font-medium text-foreground">{pickField(p, "label", locale)}</td>
                  <td className="py-3 pr-3 font-mono text-xs text-foreground">{p.chi_env}</td>
                  <td className="py-3 pr-3 font-mono text-xs text-foreground">{p.chi_optical}</td>
                  <td className="py-3 pr-3 font-mono text-xs text-foreground">{p.chi_molecular}</td>
                  <td className="py-3 pr-3 text-foreground-muted text-xs">{p.dominant_pathway}</td>
                  <td className="py-3 pr-3 font-mono text-xs font-semibold text-foreground">{p.observed_tfr}</td>
                  <td className="py-3 pr-3 text-foreground-muted text-xs leading-relaxed">{pickField(p, "status", locale)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Section 5: Testable Predictions */}
      <section className="mb-16 border-t editorial-rule pt-6">
        <h2 className="editorial-section-heading mb-6">{d.section5Title}</h2>
        <p className="text-[0.95rem] leading-relaxed text-foreground max-w-3xl mb-8">
          {d.section5Intro}
        </p>

        <div className="space-y-6">
          {EVOLUTION_PREDICTIONS.map((pred) => (
            <article
              key={pred.id}
              className="rounded-lg border border-card-border bg-card-bg p-5"
            >
              <div className="mb-3 flex flex-col items-start gap-3 sm:flex-row sm:justify-between">
                <h3 className="min-w-0 font-semibold text-sm">
                  <span className="font-mono-num text-xs text-accent mr-2">{pred.code}</span>
                  {pickField(pred, "title", locale)}
                </h3>
                <div className="flex max-w-full flex-wrap items-center gap-2 sm:shrink-0">
                  <span className="text-xs text-foreground-muted">{pred.timeframe}</span>
                  <EpistemicBadge level={pred.level} locale={locale} />
                </div>
              </div>

              <div className="space-y-3">
                <div className="rounded border border-card-border/60 bg-background p-3">
                  <p className="text-xs font-semibold uppercase tracking-wider text-accent mb-1">
                    {d.predictionHeaders.test}
                  </p>
                  <p className="text-sm text-foreground-muted leading-relaxed">
                    {pickField(pred, "test", locale)}
                  </p>
                </div>

                {pickField(pred, "falsification", locale) && (
                  <div className="rounded border border-status-partial/30 bg-status-partial/5 p-3">
                    <p className="text-xs font-semibold uppercase tracking-wider text-status-partial mb-1">
                      {d.predictionHeaders.falsification}
                    </p>
                    <p className="text-sm text-foreground-muted leading-relaxed">
                      {pickField(pred, "falsification", locale)}
                    </p>
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Epistemic note */}
      <div className="rounded-xl border border-status-partial/30 bg-status-partial/5 p-5">
        <h3 className="font-semibold mb-2">{d.epistemicTitle}</h3>
        <p className="text-sm text-foreground-muted leading-relaxed">{d.epistemicText}</p>
      </div>
    </div>
  );
}
