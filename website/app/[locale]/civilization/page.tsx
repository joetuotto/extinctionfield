import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Zap, Building2, Shield, Globe, UserX, Radio } from "lucide-react";
import { pickCopy } from "@/lib/i18n";

const COPY = {
  en: {
    title: "Civilization",
    subtitle:
      "What happens to a society when the hormonal substrate of both sexes changes simultaneously?",
    heroLead:
      "BERM treats testosterone, estrogen, dopamine, cortisol, oxytocin and melatonin as biological substrates of motivation, trust, bonding, sleep, reproduction and cognition. Its reductionist working hypothesis is that, if electromagnetic conditions shift these systems through the proposed pathways, population distributions can propagate from molecular and organ states to behavioural and institutional outcomes.",
    heroTrail:
      "This section derives that proposed propagation inside BERM and identifies the empirical links required to test it, from hormone–behaviour experiments to population-level distributions and civilizational outcomes.",
    readingGuide: "Reading path",
    readingGuideDesc:
      "The argument builds in six stages. Each page is self-contained but the causal chain runs left to right.",

    pathopege: "Pathopege",
    pathopegeGreek: "pathos + pege — source of the disease",
    pathopegeDesc:
      "The root mechanism: EMF disrupts cryptochrome/melatonin signalling and voltage-gated calcium channels, triggering sex-specific hormonal cascades. The Triple Lock in men. The cortisol-oxytocin-ovarian triad in women. The shared pathway, the diverging consequences.",

    patopolis: "Patopolis",
    patopolisGreek: "pathos + polis — the pathological city",
    patopolisDesc:
      "What the mechanism produces at scale: pair-bonding collapse, fertility decline, institutional decay, dopaminergic capture, time-preference shifts. Twelve predictions with matching observations and fourteen falsifiable civilization-level predictions. The compound effects that transform individual hormonal disruption into societal transformation.",

    patokratia: "Patokratia",
    patokratiaGreek: "pathos + kratos — pathological governance",
    patokratiaDesc:
      "Political values as biomarker outputs. Haidt's moral foundations mapped to endocrine substrates. r/K reproductive strategy as EMF phenotype. In-group loyalty collapse and the rise of pathological universalism. Why certain policies become popular precisely as the biological capacity for resistance degrades.",

    patopoliteia: "Patopoliteia",
    patopoliteiaGreek: "pathos + politeia — pathological civilization",
    patopoliteiaDesc:
      "The longest lens: biological carrying capacity across five millennia. Solar cycles and empire lifespans. Cultural energy as hormonal surplus. The pattern that connects ancient collapses to the modern decline — and what the 208-year Suess cycle predicts for the next phase.",

    pathopolites: "Pathopolites",
    pathopolitesGreek: "pathos + polites — the pathological citizen",
    pathopolitesDesc:
      "The individual whose civic identity is built around vulnerability, trauma, or biological incapacity. Six measurable dimensions — from victimhood identity to moral compensation — mapped to endocrine substrates. Not a character flaw but a phenotypic output of electromagnetic environment.",

    patokinesis: "Patokinesis",
    patokinesisGreek: "pathos + kinesis — the pathology that moves",
    patokinesisDesc:
      "How hormonal disruption degrades the physical signals of mate quality — morphological, dynamic, and cryptic — and how the degraded majority actively predates on the healthy remainder. The Calhoun behavioral sink in human civilization: normative predation, institutional capture, and sterilization contagion.",

    levelLabel: "Level III — Consequences",
    modelLink: "Read the mechanism",
    evidenceLink: "Explore the evidence",
    predictionsLink: "See all predictions",
    readMore: "Read",
    epistemicTitle: "Epistemic note",
    epistemicBody: "This is a BERM derivation, not a FieldState result. Peer-reviewed findings constrain several separate hormone–behaviour links, but the geometry-to-observable L2 bridge and multiple population-scale effect mappings remain open. The full multiscale chain is therefore a model hypothesis, not an established mechanism.",
    epistemicBody2: "Within the reductionist hypothesis, a shift in the population distribution of biological states may generate a shift in aggregate political behaviour without claiming that every individual changes identically. The inference is one-way and distributional: a group-level political outcome alone cannot be used to diagnose an individual’s hormone state.",
  },
  fi: {
    title: "Sivilisaatio",
    subtitle:
      "Mitä tapahtuu yhteiskunnalle, kun molempien sukupuolten hormonaalinen substraatti muuttuu samanaikaisesti?",
    heroLead:
      "BERM käsittelee testosteronia, estrogeenia, dopamiinia, kortisolia, oksitosiinia ja melatoniinia motivaation, luottamuksen, kiintymyksen, unen, lisääntymisen ja kognition biologisina substraatteina. Sen reduktionistinen työhypoteesi on, että jos sähkömagneettiset olosuhteet siirtävät näitä järjestelmiä ehdotettujen reittien kautta, populaatiojakaumien muutos voi edetä molekyyli- ja elintiloista käyttäytymis- ja instituutiotuloksiin.",
    heroTrail:
      "Tämä osio johtaa ehdotetun etenemisen BERM:n sisällä ja nimeää sen testaamiseen tarvittavat empiiriset lenkit hormonien ja käyttäytymisen kokeista populaatiojakaumiin ja sivilisaatiotuloksiin.",
    readingGuide: "Lukupolku",
    readingGuideDesc:
      "Argumentti rakentuu kuudessa vaiheessa. Jokainen sivu on itsenäinen, mutta kausaaliketju kulkee vasemmalta oikealle.",

    pathopege: "Pathopege",
    pathopegeGreek: "pathos + pege — sairauden lähde",
    pathopegeDesc:
      "Juurimekanismi: EMF häiritsee kryptokromi/melatoniinisignalointia ja jänniteohjattuja kalsiumkanavia ja käynnistää sukupuolispesifiset hormonaaliset kaskaadit. Kolmoislukon mekanismi miehillä. Kortisoli-oksitosiini-ovariaalitriade naisilla. Yhteinen reitti, eriävät seuraukset.",

    patopolis: "Patopolis",
    patopolisGreek: "pathos + polis — patologinen kaupunki",
    patopolisDesc:
      "Mitä mekanismi tuottaa väestötasolla: parisuhteen romahdus, hedelmällisyyden lasku, institutionaalinen rappio, dopaminerginen kaappaus, aikapreferenssin muutokset. Kaksitoista testattavaa ennustetta ja neljätoista sivilisaatiotason projektiota.",

    patokratia: "Patokratia",
    patokratiaGreek: "pathos + kratos — patologinen hallinto",
    patokratiaDesc:
      "Poliittiset arvot biomarkkerituotoksina. Haidtin moraaliperusteet kartoitettuna endokriinisiin substraatteihin. r/K-lisääntymisstrategia EMF-fenotyyppinä. Sisäryhmälojaalisuuden romahdus ja patologisen universalismin nousu.",

    patopoliteia: "Patopoliteia",
    patopoliteiaGreek: "pathos + politeia — patologinen sivilisaatio",
    patopoliteiaDesc:
      "Pisin linssi: biologinen kantokyky viiden vuosituhannen aikana. Aurinkojaksojen ja imperiumien eliniät. Kulttuurinen energia hormonaalisena ylijäämänä. Kaava, joka yhdistää muinaiset romahdukset moderniin rappeutumiseen.",

    pathopolites: "Pathopolites",
    pathopolitesGreek: "pathos + polites — patologinen kansalainen",
    pathopolitesDesc:
      "Yksilö, jonka kansalaisidentiteetti rakentuu haavoittuvuuden, trauman tai biologisen kyvyttömyyden ympärille. Kuusi mitattavaa ulottuvuutta — uhri-identiteetistä moraaliseen kompensointiin — kartoitettuna endokriinisiin substraatteihin.",

    patokinesis: "Patokinesis",
    patokinesisGreek: "pathos + kinesis — patologia joka liikkuu",
    patokinesisDesc:
      "Miten hormonihäiriö rappeuttaa fyysisen parinvalinta-arvon signaalit — morfologiset, dynaamiset ja kryptiset — ja miten rappeutunut enemmistö predatoi aktiivisesti tervettä jäännöstä. Calhounin käyttäytymisvalu ihmissivilisaatiossa.",

    levelLabel: "Taso III — Seuraukset",
    modelLink: "Lue mekanismi",
    evidenceLink: "Tutki näyttöä",
    predictionsLink: "Katso kaikki ennusteet",
    readMore: "Lue",
    epistemicTitle: "Episteeminen huomautus",
    epistemicBody: "Tämä on BERM-johdanto, ei FieldState-tulos. Vertaisarvioitu näyttö rajaa useita erillisiä hormoni–käyttäytymislenkkejä, mutta geometriasta havaittavaan suureeseen johtava L2-silta ja useat populaatiotason vaikutuskuvaukset ovat avoimia. Koko monitasoinen ketju on siksi mallihypoteesi, ei todennettu mekanismi.",
    epistemicBody2: "Reduktionistisen hypoteesin sisällä biologisten tilojen populaatiojakauman siirtymä voi tuottaa muutoksen poliittisen käyttäytymisen aggregaattijakaumaan ilman oletusta, että jokainen yksilö muuttuu samoin. Päättely on yksisuuntainen ja jakaumatasoinen: ryhmätason poliittisesta tuloksesta ei yksin voi diagnosoida yksilön hormonitilaa.",
  },
  ja: {
    title: "文明",
    subtitle:
      "両性のホルモン基盤が同時に変化するとき、社会に何が起こるのか？",
    heroLead:
      "BERMはこれらのホルモンを動機、信頼、絆、睡眠、生殖、認知の生物学的基質として扱います。その還元主義的作業仮説は、電磁条件が提案経路を通じてこれらの系を変えるなら、集団分布の変化が分子・臓器状態から行動・制度結果へ伝播し得るというものです。",
    heroTrail:
      "本節はBERM内でその伝播を導出し、ホルモン–行動実験から集団分布と文明結果まで、検証に必要なリンクを示します。",
    readingGuide: "読書経路",
    readingGuideDesc:
      "議論は6段階で構築されます。各ページは独立していますが、因果連鎖は左から右へ流れます。",

    pathopege: "パトペゲ",
    pathopegeGreek: "pathos + pege — 病の源",
    pathopegeDesc:
      "根本メカニズム：EMFが電位依存性カルシウムチャネルを乱し、性特異的なホルモンカスケードを引き起こす。",

    patopolis: "パトポリス",
    patopolisGreek: "pathos + polis — 病理的都市",
    patopolisDesc:
      "メカニズムがスケールで生み出すもの：ペアボンディングの崩壊、出生率低下、制度的衰退、ドーパミン的捕獲。",

    patokratia: "パトクラティア",
    patokratiaGreek: "pathos + kratos — 病理的統治",
    patokratiaDesc:
      "バイオマーカー出力としての政治的価値観。ハイトの道徳基盤を内分泌基質にマッピング。",

    patopoliteia: "パトポリテイア",
    patopoliteiaGreek: "pathos + politeia — 病理的文明",
    patopoliteiaDesc:
      "最も長いレンズ：5千年にわたる生物学的収容力。太陽周期と帝国の寿命。",

    pathopolites: "パトポリテース",
    pathopolitesGreek: "pathos + polites — 病理的市民",
    pathopolitesDesc:
      "脆弱性、トラウマ、生物学的無能力を中心にアイデンティティを構築する市民。6つの測定可能な次元。",

    patokinesis: "パトキネシス",
    patokinesisGreek: "pathos + kinesis — 移動する病理",
    patokinesisDesc:
      "ホルモン障害が配偶者の質のシグナルをどう劣化させ、劣化した多数派がどう健全な残余を捕食するか。",

    levelLabel: "レベルIII — 結果",
    modelLink: "メカニズムを読む",
    evidenceLink: "証拠を探る",
    predictionsLink: "すべての予測を見る",
    readMore: "読む",
    epistemicTitle: "認識論的注記",
    epistemicBody: "これはBERMの導出であり、FieldStateの結果ではありません。複数のホルモン–行動リンクには研究上の制約がありますが、幾何学から観測量へのL2ブリッジと複数の集団効果写像は未解決です。多尺度連鎖全体はモデル仮説であり、確立した機構ではありません。",
    epistemicBody2: "仮説内では生物状態の集団分布変化から政治行動の集約分布変化を導けますが、全個人が同じように変わるとは仮定しません。逆に、集団政治結果だけから個人のホルモン状態を診断することはできません。",
  },
  fr: {
    title: "Civilisation",
    subtitle:
      "Que se passe-t-il quand le substrat hormonal des deux sexes change simultanement ?",
    heroLead:
      "BERM traite ces hormones comme des substrats biologiques de la motivation, de la confiance, du lien, du sommeil, de la reproduction et de la cognition. Son hypothèse réductionniste est qu’un déplacement de ces systèmes par les voies proposées peut propager un changement de distribution des états moléculaires et organiques vers les comportements et les institutions.",
    heroTrail:
      "Cette section dérive cette propagation proposée dans BERM et identifie les liens empiriques nécessaires pour la tester, des expériences hormone–comportement aux distributions populationnelles et aux résultats civilisationnels.",
    readingGuide: "Parcours de lecture",
    readingGuideDesc:
      "L'argument se construit en six etapes. Chaque page est autonome, mais la chaine causale se lit de gauche a droite.",

    pathopege: "Pathopege",
    pathopegeGreek: "pathos + pege — source de la maladie",
    pathopegeDesc:
      "Le mecanisme racine : les CEM perturbent les canaux calciques voltage-dependants, declenchant des cascades hormonales specifiques au sexe.",

    patopolis: "Patopolis",
    patopolisGreek: "pathos + polis — la cite pathologique",
    patopolisDesc:
      "Ce que le mecanisme produit a l'echelle : effondrement des liens, declin de la fertilite, decadence institutionnelle, capture dopaminergique.",

    patokratia: "Patokratia",
    patokratiaGreek: "pathos + kratos — gouvernance pathologique",
    patokratiaDesc:
      "Les valeurs politiques comme sorties de biomarqueurs. Les fondations morales de Haidt cartographiees sur les substrats endocriniens.",

    patopoliteia: "Patopoliteia",
    patopoliteiaGreek: "pathos + politeia — civilisation pathologique",
    patopoliteiaDesc:
      "Le regard le plus long : capacite de charge biologique sur cinq millenaires. Cycles solaires et durees de vie des empires.",

    pathopolites: "Pathopolites",
    pathopolitesGreek: "pathos + polites — le citoyen pathologique",
    pathopolitesDesc:
      "L'individu dont l'identite civique est construite autour de la vulnerabilite, du traumatisme ou de l'incapacite biologique. Six dimensions mesurables.",

    patokinesis: "Patokinesis",
    patokinesisGreek: "pathos + kinesis — la pathologie qui se deplace",
    patokinesisDesc:
      "Comment la perturbation hormonale degrade les signaux de qualite de partenaire et comment la majorite degradee predatera le reste sain.",

    levelLabel: "Niveau III — Consequences",
    modelLink: "Lire le mecanisme",
    evidenceLink: "Explorer les preuves",
    predictionsLink: "Voir toutes les predictions",
    readMore: "Lire",
    epistemicTitle: "Note épistémique",
    epistemicBody: "Il s’agit d’une dérivation BERM, pas d’un résultat FieldState. Plusieurs liens hormone–comportement sont contraints par la littérature, mais le pont L2 géométrie–observable et plusieurs mappages d’effets populationnels restent ouverts. La chaîne multi-échelle complète est une hypothèse du modèle, non un mécanisme établi.",
    epistemicBody2: "Dans l’hypothèse réductionniste, un déplacement de la distribution populationnelle des états biologiques peut produire un déplacement du comportement politique agrégé sans supposer que chaque individu change pareillement. Le résultat politique du groupe ne permet pas, à lui seul, de diagnostiquer l’état hormonal d’un individu.",
  },
  ko: {
    title: "문명",
    subtitle:
      "양성의 호르몬 기질이 동시에 변화할 때 사회에 무슨 일이 일어나는가?",
    heroLead:
      "BERM은 이러한 호르몬을 동기, 신뢰, 유대, 수면, 생식 및 인지의 생물학적 기질로 취급합니다. 환원주의적 작업 가설은 전자기 조건이 제안된 경로를 통해 이 체계를 이동시키면 집단 분포의 변화가 분자·장기 상태에서 행동·제도 결과로 전파될 수 있다는 것입니다.",
    heroTrail:
      "이 절은 BERM 안에서 제안된 전파를 도출하고 호르몬–행동 실험부터 집단 분포와 문명 결과까지 검증에 필요한 연결을 제시합니다.",
    readingGuide: "독서 경로",
    readingGuideDesc:
      "논증은 6단계로 구축됩니다. 각 페이지는 독립적이지만 인과 사슬은 왼쪽에서 오른쪽으로 흐릅니다.",

    pathopege: "파토페게",
    pathopegeGreek: "pathos + pege — 질병의 근원",
    pathopegeDesc:
      "근본 메커니즘: EMF가 전압 의존성 칼슘 채널을 교란하여 성별 특이적 호르몬 캐스케이드를 유발합니다.",

    patopolis: "파토폴리스",
    patopolisGreek: "pathos + polis — 병리적 도시",
    patopolisDesc:
      "메커니즘이 규모에서 생산하는 것: 쌍결합 붕괴, 출산율 감소, 제도적 쇠퇴, 도파민적 포획.",

    patokratia: "파토크라티아",
    patokratiaGreek: "pathos + kratos — 병리적 통치",
    patokratiaDesc:
      "바이오마커 출력으로서의 정치적 가치. 하이트의 도덕적 기초를 내분비 기질에 매핑.",

    patopoliteia: "파토폴리테이아",
    patopoliteiaGreek: "pathos + politeia — 병리적 문명",
    patopoliteiaDesc:
      "가장 긴 렌즈: 5천 년에 걸친 생물학적 수용 능력. 태양 주기와 제국의 수명.",

    pathopolites: "파토폴리테스",
    pathopolitesGreek: "pathos + polites — 병리적 시민",
    pathopolitesDesc:
      "취약성, 트라우마 또는 생물학적 무능력을 중심으로 정체성을 구축하는 시민. 6가지 측정 가능한 차원.",

    patokinesis: "파토키네시스",
    patokinesisGreek: "pathos + kinesis — 이동하는 병리",
    patokinesisDesc:
      "호르몬 교란이 배우자 품질 신호를 어떻게 열화시키고, 열화된 다수가 건강한 나머지를 어떻게 포식하는가.",

    levelLabel: "레벨 III — 결과",
    modelLink: "메커니즘 읽기",
    evidenceLink: "증거 탐색",
    predictionsLink: "모든 예측 보기",
    readMore: "읽기",
    epistemicTitle: "인식론적 주석",
    epistemicBody: "이는 FieldState 결과가 아니라 BERM 도출입니다. 여러 호르몬–행동 연결은 연구로 제약되지만 기하학–관측량 L2 브리지와 여러 집단 효과 매핑은 열려 있습니다. 전체 다중 규모 사슬은 모델 가설이지 확립된 메커니즘이 아닙니다.",
    epistemicBody2: "환원주의 가설 안에서 생물학적 상태의 집단 분포 이동은 모든 개인이 동일하게 변한다고 가정하지 않고도 집계 정치 행동의 이동을 만들 수 있습니다. 반대로 집단 정치 결과만으로 개인의 호르몬 상태를 진단할 수 없습니다.",
  },
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const meta: Record<string, { title: string; description: string }> = {
    en: {
      title: "Why Civilizations Rise and Fall | BERM",
      description: "A biological hypothesis for civilizational cycles: how electromagnetic infrastructure may drive the pattern of rise and decline observed across five millennia.",
    },
    fi: {
      title: "Miksi sivilisaatiot nousevat ja kaatuvat | BERM",
      description: "Biologinen hypoteesi sivilisaatioiden sykleille: miten sähkömagneettinen infrastruktuuri voi ohjata viiden vuosituhannen aikana havaittua nousun ja rappion kaavaa.",
    },
    ja: {
      title: "文明はなぜ興亡するのか | BERM",
      description: "文明のサイクルに関する生物学的仮説：電磁インフラが5千年にわたる興亡パターンをどのように駆動しうるか。",
    },
    fr: {
      title: "Pourquoi les civilisations montent et tombent | BERM",
      description: "Une hypothese biologique pour les cycles civilisationnels : comment l'infrastructure electromagnetique pourrait piloter le schema d'ascension et de declin observe sur cinq millenaires.",
    },
    ko: {
      title: "문명은 왜 흥망하는가 | BERM",
      description: "문명 주기에 대한 생물학적 가설: 전자기 인프라가 5천 년에 걸친 흥망 패턴을 어떻게 구동할 수 있는지.",
    },
  };
  const m = meta[locale] || meta.en;
  return {
    title: m.title,
    description: m.description,
    openGraph: {
      title: m.title,
      description: m.description,
    },
  };
}

const PAGES = [
  { key: "pathopege", href: "pathopege", icon: Zap, color: "amber" },
  { key: "patopolis", href: "patopolis", icon: Building2, color: "blue" },
  { key: "patokratia", href: "patokratia", icon: Shield, color: "red" },
  { key: "patopoliteia", href: "patopoliteia", icon: Globe, color: "purple" },
  { key: "pathopolites", href: "pathopolites", icon: UserX, color: "rose" },
  { key: "patokinesis", href: "patokinesis", icon: Radio, color: "teal" },
] as const;

const COLORS: Record<string, { border: string; bg: string; text: string; icon: string }> = {
  amber: { border: "border-amber-500/30", bg: "bg-amber-500/5", text: "text-amber-500", icon: "text-amber-500" },
  blue: { border: "border-blue-500/30", bg: "bg-blue-500/5", text: "text-blue-500", icon: "text-blue-500" },
  red: { border: "border-red-500/30", bg: "bg-red-500/5", text: "text-red-500", icon: "text-red-500" },
  purple: { border: "border-purple-500/30", bg: "bg-purple-500/5", text: "text-purple-500", icon: "text-purple-500" },
  rose: { border: "border-rose-500/30", bg: "bg-rose-500/5", text: "text-rose-500", icon: "text-rose-500" },
  teal: { border: "border-teal-500/30", bg: "bg-teal-500/5", text: "text-teal-500", icon: "text-teal-500" },
};

export default async function CivilizationPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const d = pickCopy(COPY, locale);

  return (
    <main id="main-content">
      <div className="max-w-5xl mx-auto px-6">
        {/* Hero */}
        <header className="relative -mx-6 overflow-hidden rounded-b-2xl sm:rounded-2xl sm:mx-0 mt-0 sm:mt-8 mb-14">
          <div className="relative h-[340px] sm:h-[440px] lg:h-[550px]">
            <Image
              src="/images/spengler-seasons.jpg"
              alt="Four allegorical figures representing civilizational seasons — spring, summer, autumn, winter"
              fill
              priority
              className="object-cover object-center"
              sizes="(max-width: 1024px) 100vw, 1024px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
            <div className="relative z-10 flex flex-col justify-end h-full p-6 sm:p-10 lg:p-14">
              <p className="text-white/50 text-xs font-medium tracking-[0.2em] uppercase mb-3">
                {d.levelLabel}
              </p>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-semibold tracking-[-0.02em] leading-[1.12] mb-4 text-white drop-shadow-lg">
                {d.title}
              </h1>
              <p className="text-base sm:text-lg leading-relaxed text-white/80 max-w-2xl drop-shadow">
                {d.subtitle}
              </p>
            </div>
          </div>
        </header>

        {/* Lead */}
        <section className="mb-16 max-w-3xl">
          <p className="text-lg sm:text-xl leading-relaxed text-foreground/80 mb-5 first-letter:text-4xl first-letter:font-serif first-letter:font-bold first-letter:float-left first-letter:mr-2 first-letter:mt-1 first-letter:leading-none">
            {d.heroLead}
          </p>
          <p className="text-base leading-relaxed text-foreground-muted">
            {d.heroTrail}
          </p>
        </section>

        {/* Epistemic note */}
        {d.epistemicTitle && (
        <section className="mb-16 max-w-3xl border border-foreground/10 rounded-xl p-6 bg-foreground/[0.02]">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-foreground/50 mb-3">{d.epistemicTitle}</h2>
          <p className="text-sm leading-relaxed text-foreground/70 mb-3">{d.epistemicBody}</p>
          <p className="text-sm leading-relaxed text-foreground/70">{d.epistemicBody2}</p>
        </section>
        )}

        {/* Reading path */}
        <section className="mb-20">
          <h2 className="text-2xl font-bold mb-2">{d.readingGuide}</h2>
          <p className="text-muted-foreground mb-10 max-w-2xl">{d.readingGuideDesc}</p>

          <div className="grid gap-6 sm:grid-cols-2">
            {PAGES.map(({ key, href, icon: Icon, color }, i) => {
              const c = COLORS[color];
              const title = d[key as keyof typeof d] as string;
              const greek = d[`${key}Greek` as keyof typeof d] as string;
              const desc = d[`${key}Desc` as keyof typeof d] as string;
              return (
                <Link
                  key={key}
                  href={`/${locale}/civilization/${href}`}
                  className={`group relative rounded-xl border ${c.border} ${c.bg} p-6 transition-all hover:shadow-lg hover:scale-[1.01]`}
                >
                  <div className="flex items-start gap-3 mb-3">
                    <span className={`text-xs font-mono ${c.text} opacity-60`}>{i + 1}</span>
                    <Icon className={`w-5 h-5 ${c.icon} mt-0.5 shrink-0`} />
                    <div>
                      <h3 className="text-lg font-semibold">{title}</h3>
                      <p className="text-xs text-muted-foreground italic">{greek}</p>
                    </div>
                  </div>
                  <p className="text-sm leading-relaxed text-foreground/70 mb-4">{desc}</p>
                  <span className={`inline-flex items-center gap-1 text-sm font-medium ${c.text} group-hover:gap-2 transition-all`}>
                    {d.readMore} <ArrowRight className="w-4 h-4" />
                  </span>
                </Link>
              );
            })}
          </div>
        </section>

        {/* Bottom nav */}
        <footer className="border-t border-foreground/10 pt-8 pb-16 flex flex-wrap gap-6 text-sm">
          <Link href={`/${locale}/model`} className="text-foreground/60 hover:text-foreground transition-colors">
            {d.modelLink} →
          </Link>
          <Link href={`/${locale}/evidence`} className="text-foreground/60 hover:text-foreground transition-colors">
            {d.evidenceLink} →
          </Link>
          <Link href={`/${locale}/predictions`} className="text-foreground/60 hover:text-foreground transition-colors">
            {d.predictionsLink} →
          </Link>
        </footer>
      </div>
    </main>
  );
}
