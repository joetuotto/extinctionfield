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
  CHAIN_EPISTEMIC_LABELS_EN,
  CHAIN_EPISTEMIC_LABELS_FI,
} from "@/lib/epistemicConstants";
import type { EpistemicLevel } from "@/lib/types";
import { pickCopy } from "@/lib/i18n";
import { StudyCitation } from "@/components/StudyCitation";

const COPY = {
  en: {
    title: "Evolutionary Origins: The Northern Package",
    subtitle: "How co-selection of blue eyes, lactose tolerance, and cattle husbandry created the population most sensitive to EMF — and why that population's fertility declined first",
    backLink: "← Back to Evidence",
    section1Title: "One Function, Five Scales",
    section1Intro: "The χ (chi) function appears at every biological scale from molecule to population. At each scale it encodes the same logic: a background variable must be non-zero for a perturbation to have effect. The function χ(B) = 0 when B = 0, and approaches 1 as B increases. This is the selection rule that BERM proposes as the unifying mechanism across all five scales.",
    section2Title: "The Northern Package",
    section2Intro: [
      "Three traits co-selected in Northern European populations between 10,000 and 6,000 years ago: blue eyes (OCA2), lactose tolerance (LCT), and cattle husbandry. The conventional explanation treats each as an independent adaptation — blue eyes for vitamin D synthesis, lactose tolerance for calcium absorption, cattle for food security.",
      "BERM proposes these three traits optimize a single molecular system: cryptochrome. Blue eyes maximize photon delivery to CRY1 in retinal blue cones (optical χ). Lactose tolerance ensures year-round riboflavin (B2) supply via dairy, providing the FAD chromophore that CRY requires (molecular χ). Cattle husbandry is the cultural adaptation that sustains B2 supply through Northern winters when foraging and solar synthesis fail.",
      "If correct, the Northern Package represents the strongest biological amplifier of EMF sensitivity in any human population — and explains why Northern Europe was both the first region to electrify and the first below replacement fertility.",
    ],
    section3Title: "Four Historical Phases",
    section3Intro: "The interaction between biological χ values (evolved) and environmental χ values (technological) creates a four-phase historical pattern that maps onto observed fertility transitions.",
    section4Title: "Population χ Profiles",
    section4Intro: "Each population has a characteristic χ profile determined by its biology (optical, molecular) and environment. The combination produces distinct fertility trajectories.",
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
    section5Intro: "Five predictions derived from the nested χ model. Each is designed to be falsifiable within its stated timeframe.",
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
    epistemicText: "This page presents an L*-level synthesis. The individual observations are well-established: OCA2/LCT co-selection timing (E), CRY photocycle requirements (E), iris transmission differences (M|C), B2-FAD-CRY stability chain (E), population TFR differences (C). The synthesis — that these traits form a coherent amplifier of EMF sensitivity — is an L*-level testable hypothesis. The population χ values are rough estimates. The historical narrative is explanatory, not predictive. The CRY-mediated interpretation of co-selection should be presented as an extension of the vitamin D hypothesis, not a replacement.",
    levelLabel: "Evidence level",
  },
  fi: {
    title: "Evoluution alkuperät: Pohjoinen paketti",
    subtitle: "Miten sinisilmäisyyden, laktoosinsietokyvyn ja karjankasvatuksen koselektio loi EMF:lle herkimmän populaation — ja miksi sen hedelmällisyys laski ensimmäisenä",
    backLink: "← Takaisin evidenssiin",
    section1Title: "Yksi funktio, viisi skaalaa",
    section1Intro: "χ (khi) -funktio esiintyy jokaisella biologisella skaalalla molekyylistä populaatioon. Jokaisella skaalalla se koodaa saman logiikan: taustamuuttujan on oltava nollasta poikkeava, jotta häiriö voi vaikuttaa. Funktio χ(B) = 0 kun B = 0, ja lähestyy 1:tä B:n kasvaessa. Tämä on valintasääntö jonka BERM ehdottaa yhdistäväksi mekanismiksi kaikilla viidellä skaalalla.",
    section2Title: "Pohjoinen paketti",
    section2Intro: [
      "Kolme piirrettä koselektoitui Pohjois-Euroopan populaatioissa 10 000–6 000 vuotta sitten: siniset silmät (OCA2), laktoosinsietokyky (LCT) ja karjankasvatus. Perinteinen selitys käsittelee kutakin itsenäisenä adaptaationa — sinisiä silmiä D-vitamiinisynteesille, laktoosinsietokykyä kalsiumin imeytymiselle, karjaa ruokaturvalle.",
      "BERM ehdottaa, että nämä kolme piirrettä optimoivat yhden molekyläärisen järjestelmän: kryptokromin. Siniset silmät maksimoivat fotonien pääsyn CRY1:lle verkkokalvon sinisissä tapeissa (optinen χ). Laktoosinsietokyky varmistaa ympärivuotisen riboflaviinin (B2) saannin maitotuotteiden kautta, tarjoten FAD-kromoforin jota CRY vaatii (molekulaarinen χ). Karjankasvatus on kulttuurinen adaptaatio, joka ylläpitää B2-saantia pohjoisen talvien läpi kun keräily ja auringon synteesi eivät riitä.",
      "Jos tämä pitää paikkansa, Pohjoinen paketti edustaa voimakkainta biologista EMF-herkkyyden vahvistinta missään ihmispopulaatiossa — ja selittää, miksi Pohjois-Eurooppa sekä sähköistyi ensimmäisenä että laski ensimmäisenä alle uusiutumistason hedelmällisyyden.",
    ],
    section3Title: "Neljä historiallista vaihetta",
    section3Intro: "Biologisten χ-arvojen (kehittyneiden) ja ympäristön χ-arvojen (teknologisten) vuorovaikutus luo neljävaiheisen historiallisen kaavan joka heijastuu havaittuihin hedelmällisyyssiirtymiin.",
    section4Title: "Populaatioiden χ-profiilit",
    section4Intro: "Jokaisella populaatiolla on ominainen χ-profiili jonka määräävät sen biologia (optinen, molekulaarinen) ja ympäristö. Yhdistelmä tuottaa erilaiset hedelmällisyyskehityskulut.",
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
    section5Intro: "Viisi ennustetta jotka on johdettu sisäkkäisestä χ-mallista. Jokainen on suunniteltu falsifioitavaksi ilmoitetulla aikavälillä.",
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
      verification: "Verifiointi",
    },
    epistemicTitle: "Episteeminen tila",
    epistemicText: "Tämä sivu esittää L*-tason synteesin. Yksittäiset havainnot ovat vakiintuneita: OCA2/LCT-koselektio-ajoitus (E), CRY:n fotosyklivaatimukset (E), iiriksen transmissioerot (M|C), B2-FAD-CRY-stabiiliusketju (E), populaatioiden TFR-erot (C). Synteesi — että nämä piirteet muodostavat yhtenäisen EMF-herkkyyden vahvistimen — on L*-tason testattava hypoteesi. Populaatioiden χ-arvot ovat karkeita arvioita. Historiallinen narratiivi on selittävä, ei ennustava. CRY-välitteinen koselektiotulkinta tulisi esittää D-vitamiinihypoteesin laajennuksena, ei vaihtoehtona.",
    levelLabel: "Evidenssitaso",
  },
  ja: {
    title: "進化の起源：ノーザンパッケージ",
    subtitle: "青い目、乳糖耐性、牧畜の共選択がいかにしてEMFに最も敏感な集団を生み出したか — そしてなぜその集団の出生率が最初に低下したのか",
    backLink: "← エビデンスに戻る",
    section1Title: "1つの関数、5つのスケール",
    section1Intro: "χ（カイ）関数は分子から集団まであらゆる生物学的スケールに現れる。各スケールで同じ論理をコードする：摂動が効果を持つためには背景変数がゼロでない必要がある。関数χ(B) = 0（B = 0のとき）で、Bが増加するにつれて1に近づく。これはBERMが5つのスケールすべてにわたる統一メカニズムとして提案する選択則である。",
    section2Title: "ノーザンパッケージ",
    section2Intro: [
      "1万年から6千年前に北ヨーロッパの集団で3つの形質が共選択された：青い目(OCA2)、乳糖耐性(LCT)、牧畜。従来の説明はそれぞれを独立した適応として扱う — 青い目はビタミンD合成、乳糖耐性はカルシウム吸収、牧畜は食料安全保障のため。",
      "BERMはこれら3つの形質が単一の分子システムであるクリプトクロムを最適化すると提案する。青い目は網膜青色錐体のCRY1への光子送達を最大化する（光学的χ）。乳糖耐性は乳製品を通じた年間を通じたリボフラビン(B2)供給を確保し、CRYが必要とするFAD発色団を提供する（分子的χ）。牧畜は採集と太陽合成が不十分な北の冬を通じてB2供給を維持する文化的適応である。",
      "これが正しければ、ノーザンパッケージはヒトのいかなる集団においてもEMF感受性の最も強力な生物学的増幅器を表す — そしてなぜ北ヨーロッパが最初に電化し、最初に人口置換水準以下の出生率に達したのかを説明する。",
    ],
    section3Title: "4つの歴史的段階",
    section3Intro: "生物学的χ値（進化した）と環境χ値（技術的）の相互作用は、観察された出生率転換に対応する4段階の歴史的パターンを生み出す。",
    section4Title: "集団χプロファイル",
    section4Intro: "各集団はその生物学（光学的、分子的）と環境によって決定される特徴的なχプロファイルを持つ。その組み合わせが異なる出生率軌跡を生み出す。",
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
    section5Intro: "入れ子型χモデルから導出された5つの予測。それぞれが規定の期間内に反証可能なように設計されている。",
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
    epistemicText: "このページはL*レベルの統合を提示する。個々の観察は確立されている：OCA2/LCT共選択タイミング(E)、CRY光サイクル要件(E)、虹彩透過差(M|C)、B2-FAD-CRY安定性チェーン(E)、集団TFR差(C)。統合 — これらの形質がEMF感受性の一貫した増幅器を形成するということ — はL*レベルの検証可能な仮説である。集団χ値は概算である。歴史的ナラティブは説明的であり、予測的ではない。共選択のCRY媒介解釈はビタミンD仮説の拡張として提示されるべきであり、代替としてではない。",
    levelLabel: "エビデンスレベル",
  },
  fr: {
    title: "Origines evolutives : le package nordique",
    subtitle: "Comment la co-selection des yeux bleus, de la tolerance au lactose et de l'elevage bovin a cree la population la plus sensible aux EMF — et pourquoi la fertilite de cette population a decline en premier",
    backLink: "← Retour aux preuves",
    section1Title: "Une fonction, cinq echelles",
    section1Intro: "La fonction χ (chi) apparait a chaque echelle biologique, de la molecule a la population. A chaque echelle, elle code la meme logique : une variable de fond doit etre non nulle pour qu'une perturbation ait un effet. La fonction χ(B) = 0 quand B = 0, et approche 1 a mesure que B augmente. C'est la regle de selection que BERM propose comme mecanisme unificateur a travers les cinq echelles.",
    section2Title: "Le package nordique",
    section2Intro: [
      "Trois traits ont ete co-selectionnes dans les populations d'Europe du Nord entre 10 000 et 6 000 ans : les yeux bleus (OCA2), la tolerance au lactose (LCT) et l'elevage bovin. L'explication conventionnelle traite chacun comme une adaptation independante — les yeux bleus pour la synthese de vitamine D, la tolerance au lactose pour l'absorption du calcium, le betail pour la securite alimentaire.",
      "BERM propose que ces trois traits optimisent un seul systeme moleculaire : le cryptochrome. Les yeux bleus maximisent la delivrance de photons au CRY1 dans les cones bleus retiniens (χ optique). La tolerance au lactose assure un apport annuel en riboflavine (B2) via les produits laitiers, fournissant le chromophore FAD que CRY necessite (χ moleculaire). L'elevage bovin est l'adaptation culturelle qui maintient l'apport en B2 pendant les hivers nordiques lorsque la cueillette et la synthese solaire sont insuffisantes.",
      "Si c'est correct, le package nordique represente le plus puissant amplificateur biologique de la sensibilite aux EMF dans toute population humaine — et explique pourquoi l'Europe du Nord a ete a la fois la premiere region a s'electrifier et la premiere en dessous du seuil de remplacement de la fertilite.",
    ],
    section3Title: "Quatre phases historiques",
    section3Intro: "L'interaction entre les valeurs biologiques de χ (evoluees) et les valeurs environnementales de χ (technologiques) cree un schema historique en quatre phases qui correspond aux transitions de fertilite observees.",
    section4Title: "Profils χ des populations",
    section4Intro: "Chaque population possede un profil χ caracteristique determine par sa biologie (optique, moleculaire) et son environnement. La combinaison produit des trajectoires de fertilite distinctes.",
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
    section5Intro: "Cinq predictions derivees du modele χ imbrique. Chacune est concue pour etre falsifiable dans le delai indique.",
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
    epistemicText: "Cette page presente une synthese de niveau L*. Les observations individuelles sont bien etablies : chronologie de co-selection OCA2/LCT (E), exigences du photocycle CRY (E), differences de transmission de l'iris (M|C), chaine de stabilite B2-FAD-CRY (E), differences de TFR entre populations (C). La synthese — que ces traits forment un amplificateur coherent de la sensibilite aux EMF — est une hypothese testable de niveau L*. Les valeurs χ des populations sont des estimations approximatives. Le recit historique est explicatif, pas predictif. L'interpretation CRY de la co-selection devrait etre presentee comme une extension de l'hypothese de la vitamine D, pas comme un remplacement.",
    levelLabel: "Niveau de preuve",
  },
  ko: {
    title: "진화적 기원: 노던 패키지",
    subtitle: "파란 눈, 유당 내성, 소 사육의 공동선택이 어떻게 EMF에 가장 민감한 집단을 만들었는가 — 그리고 왜 그 집단의 출산율이 가장 먼저 감소했는가",
    backLink: "← 근거로 돌아가기",
    section1Title: "하나의 함수, 다섯 개의 스케일",
    section1Intro: "χ(카이) 함수는 분자에서 집단까지 모든 생물학적 스케일에 나타난다. 각 스케일에서 동일한 논리를 코딩한다: 교란이 효과를 가지려면 배경 변수가 0이 아니어야 한다. 함수 χ(B) = 0(B = 0일 때)이며, B가 증가함에 따라 1에 접근한다. 이것이 BERM이 다섯 개의 모든 스케일에 걸친 통합 메커니즘으로 제안하는 선택 규칙이다.",
    section2Title: "노던 패키지",
    section2Intro: [
      "1만 년에서 6천 년 전 사이에 북유럽 집단에서 세 가지 형질이 공동선택되었다: 파란 눈(OCA2), 유당 내성(LCT), 소 사육. 기존 설명은 각각을 독립적 적응으로 다룬다 — 파란 눈은 비타민 D 합성, 유당 내성은 칼슘 흡수, 소는 식량 안보를 위해.",
      "BERM은 이 세 가지 형질이 단일 분자 시스템인 크립토크롬을 최적화한다고 제안한다. 파란 눈은 망막 청색 원추세포의 CRY1으로의 광자 전달을 극대화한다(광학적 χ). 유당 내성은 유제품을 통한 연중 리보플라빈(B2) 공급을 보장하여 CRY가 필요로 하는 FAD 발색단을 제공한다(분자적 χ). 소 사육은 채집과 태양 합성이 부족한 북방 겨울 동안 B2 공급을 유지하는 문화적 적응이다.",
      "이것이 맞다면, 노던 패키지는 인류 집단 중 EMF 감수성의 가장 강력한 생물학적 증폭기를 나타내며 — 왜 북유럽이 가장 먼저 전기화되고 가장 먼저 대체출산율 이하로 떨어졌는지를 설명한다.",
    ],
    section3Title: "네 가지 역사적 단계",
    section3Intro: "생물학적 χ값(진화된)과 환경적 χ값(기술적)의 상호작용은 관찰된 출산율 전환에 대응하는 4단계 역사적 패턴을 만든다.",
    section4Title: "집단 χ 프로파일",
    section4Intro: "각 집단은 생물학(광학적, 분자적)과 환경에 의해 결정되는 특성적 χ 프로파일을 가진다. 이 조합이 서로 다른 출산율 궤적을 만든다.",
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
    section5Intro: "중첩 χ 모델에서 도출된 다섯 가지 예측. 각각은 명시된 기간 내에 반증 가능하도록 설계되었다.",
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
    epistemicText: "이 페이지는 L* 수준의 종합을 제시한다. 개별 관찰은 확립되어 있다: OCA2/LCT 공동선택 타이밍(E), CRY 광주기 요건(E), 홍채 투과 차이(M|C), B2-FAD-CRY 안정성 체인(E), 집단 TFR 차이(C). 종합 — 이 형질들이 EMF 감수성의 일관된 증폭기를 형성한다는 것 — 은 L* 수준의 검증 가능한 가설이다. 집단 χ값은 대략적 추정치이다. 역사적 서사는 설명적이며 예측적이지 않다. 공동선택의 CRY 매개 해석은 비타민 D 가설의 확장으로 제시되어야 하며, 대체로 제시되어서는 안 된다.",
    levelLabel: "근거 수준",
  },
} as const;

function EpistemicBadge({ level, isFi }: { level: string; isFi: boolean }) {
  const color = CHAIN_EPISTEMIC_COLORS[level as EpistemicLevel] ?? "#6B7280";
  const labels = isFi ? CHAIN_EPISTEMIC_LABELS_FI : CHAIN_EPISTEMIC_LABELS_EN;
  const label = labels[level as EpistemicLevel] ?? level;
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
  const isFi = locale === "fi";
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
                    {isFi ? scale.label_fi : scale.label_en}
                  </h3>
                  <EpistemicBadge level={scale.level} isFi={isFi} />
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <tbody>
                      <tr className="border-b border-card-border/40">
                        <td className="py-2 pr-3 font-semibold text-foreground-muted w-32">{d.scaleHeaders.background}</td>
                        <td className="py-2 text-foreground">{isFi ? scale.background_fi : scale.background_en}</td>
                      </tr>
                      <tr className="border-b border-card-border/40">
                        <td className="py-2 pr-3 font-semibold text-foreground-muted">{d.scaleHeaders.perturbation}</td>
                        <td className="py-2 text-foreground">{isFi ? scale.perturbation_fi : scale.perturbation_en}</td>
                      </tr>
                      <tr className="border-b border-card-border/40">
                        <td className="py-2 pr-3 font-semibold text-foreground-muted">{d.scaleHeaders.expression}</td>
                        <td className="py-2 text-foreground font-mono text-xs">{scale.chi_expression}</td>
                      </tr>
                      <tr className="border-b border-card-border/40">
                        <td className="py-2 pr-3 font-semibold text-foreground-muted">{d.scaleHeaders.atZero}</td>
                        <td className="py-2 text-foreground-muted">{isFi ? scale.at_zero_fi : scale.at_zero_en}</td>
                      </tr>
                      <tr className="border-b border-card-border/40">
                        <td className="py-2 pr-3 font-semibold text-foreground-muted">{d.scaleHeaders.atMax}</td>
                        <td className="py-2 text-foreground">{isFi ? scale.at_max_fi : scale.at_max_en}</td>
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
                    <td className="py-3 pr-3 font-medium text-foreground">{isFi ? trait.trait_fi : trait.trait_en}</td>
                    <td className="py-3 pr-3 text-foreground-muted font-mono text-xs">{trait.gene}</td>
                    <td className="py-3 pr-3 text-foreground-muted text-xs leading-relaxed">{isFi ? trait.mechanism_fi : trait.mechanism_en}</td>
                    <td className="py-3 pr-3 text-foreground-muted text-xs leading-relaxed">{isFi ? trait.cry_link_fi : trait.cry_link_en}</td>
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
                  {isFi ? phase.title_fi : phase.title_en}
                </h3>
              </div>
              <p className="text-sm text-foreground-muted leading-relaxed">
                {isFi ? phase.description_fi : phase.description_en}
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
                  <td className="py-3 pr-3 font-medium text-foreground">{isFi ? p.label_fi : p.label_en}</td>
                  <td className="py-3 pr-3 font-mono text-xs text-foreground">{p.chi_env}</td>
                  <td className="py-3 pr-3 font-mono text-xs text-foreground">{p.chi_optical}</td>
                  <td className="py-3 pr-3 font-mono text-xs text-foreground">{p.chi_molecular}</td>
                  <td className="py-3 pr-3 text-foreground-muted text-xs">{p.dominant_pathway}</td>
                  <td className="py-3 pr-3 font-mono text-xs font-semibold text-foreground">{p.observed_tfr}</td>
                  <td className="py-3 pr-3 text-foreground-muted text-xs leading-relaxed">{isFi ? p.status_fi : p.status_en}</td>
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
                  {isFi ? pred.title_fi : pred.title_en}
                </h3>
                <div className="flex max-w-full flex-wrap items-center gap-2 sm:shrink-0">
                  <span className="text-xs text-foreground-muted">{pred.timeframe}</span>
                  <EpistemicBadge level={pred.level} isFi={isFi} />
                </div>
              </div>

              <div className="space-y-3">
                <div className="rounded border border-card-border/60 bg-background p-3">
                  <p className="text-xs font-semibold uppercase tracking-wider text-accent mb-1">
                    {d.predictionHeaders.test}
                  </p>
                  <p className="text-sm text-foreground-muted leading-relaxed">
                    {isFi ? pred.test_fi : pred.test_en}
                  </p>
                </div>

                <div className="rounded border border-status-partial/30 bg-status-partial/5 p-3">
                  <p className="text-xs font-semibold uppercase tracking-wider text-status-partial mb-1">
                    {d.predictionHeaders.falsification}
                  </p>
                  <p className="text-sm text-foreground-muted leading-relaxed">
                    {isFi ? pred.falsification_fi : pred.falsification_en}
                  </p>
                </div>
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
