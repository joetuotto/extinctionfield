import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Zap, Building2, Shield, Globe, UserX } from "lucide-react";
import { pickCopy } from "@/lib/i18n";

const COPY = {
  en: {
    title: "Civilization",
    subtitle:
      "What happens to a society when the hormonal substrate of both sexes changes simultaneously?",
    heroLead:
      "Testosterone, estrogen, dopamine, cortisol, oxytocin, and melatonin are not just medical terms. They are the biological infrastructure of motivation, trust, bonding, sleep, reproduction, and cognition. When electromagnetic fields disrupt the calcium channels that regulate these hormones, the effects propagate from molecules to cells to organs to individuals to families to institutions.",
    heroTrail:
      "This section traces that propagation — from seven randomized controlled trials to population-level behavioral data to the dynamics of civilizational change.",
    readingGuide: "Reading path",
    readingGuideDesc:
      "The argument builds in five stages. Each page is self-contained but the causal chain runs left to right.",

    pathopege: "Pathopege",
    pathopegeGreek: "pathos + pege — source of the disease",
    pathopegeDesc:
      "The root mechanism: EMF disrupts voltage-gated calcium channels, triggering sex-specific hormonal cascades. The Triple Lock in men. The cortisol-oxytocin-ovarian triad in women. The shared pathway, the diverging consequences.",

    patopolis: "Patopolis",
    patopolisGreek: "pathos + polis — the pathological city",
    patopolisDesc:
      "What the mechanism produces at scale: pair-bonding collapse, fertility decline, institutional decay, dopaminergic capture, time-preference shifts. Twelve testable predictions and fourteen civilization-level projections. The compound effects that transform individual hormonal disruption into societal transformation.",

    patokratia: "Patokratia",
    patokratiaGreek: "pathos + kratos — pathological governance",
    patokratiaDesc:
      "Political values as biomarker outputs. Haidt's moral foundations mapped to endocrine substrates. r/K reproductive strategy as EMF phenotype. In-group loyalty collapse and the rise of pathological universalism. Why certain policies become popular precisely as the biological capacity for resistance degrades.",

    patopoliteia: "Patopoliteia",
    patopoliteiaGreek: "pathos + politeia — pathological civilization",
    patopoliteiaDesc:
      "The longest lens: biological carrying capacity across five millennia. Solar cycles and empire lifespans. Cultural energy as hormonal surplus. The pattern that connects ancient collapses to the modern decline — and what the 210-year Suess cycle predicts for the next phase.",

    pathopolites: "Pathopolites",
    pathopolitesGreek: "pathos + polites — the pathological citizen",
    pathopolitesDesc:
      "The individual whose civic identity is built around vulnerability, trauma, or biological incapacity. Six measurable dimensions — from victimhood identity to moral compensation — mapped to endocrine substrates. Not a character flaw but a phenotypic output of electromagnetic environment.",

    levelLabel: "Level III — Consequences",
    modelLink: "Read the mechanism",
    evidenceLink: "Explore the evidence",
    predictionsLink: "See all predictions",
    readMore: "Read",
  },
  fi: {
    title: "Sivilisaatio",
    subtitle:
      "Mitä tapahtuu yhteiskunnalle, kun molempien sukupuolten hormonaalinen substraatti muuttuu samanaikaisesti?",
    heroLead:
      "Testosteroni, estrogeeni, dopamiini, kortisoli, oksitosiini ja melatoniini eivät ole pelkkiä lääketieteellisiä termejä. Ne ovat motivaation, luottamuksen, kiintymyksen, unen, lisääntymisen ja kognition biologinen infrastruktuuri. Kun sähkömagneettiset kentät häiritsevät näitä hormoneja säätelevien kalsiumkanavien toimintaa, vaikutukset etenevät molekyyleistä soluihin, elimiin, yksilöihin, perheisiin ja instituutioihin.",
    heroTrail:
      "Tämä osio jäljittää tuon etenemisen — seitsemästä satunnaistetusta kontrolloidusta tutkimuksesta väestötason käyttäytymisdataan ja sivilisaatiomuutoksen dynamiikkaan.",
    readingGuide: "Lukupolku",
    readingGuideDesc:
      "Argumentti rakentuu viidessä vaiheessa. Jokainen sivu on itsenäinen, mutta kausaaliketju kulkee vasemmalta oikealle.",

    pathopege: "Pathopege",
    pathopegeGreek: "pathos + pege — sairauden lähde",
    pathopegeDesc:
      "Juurimekanismi: EMF häiritsee jänniteohjattuja kalsiumkanavia ja käynnistää sukupuolispesifiset hormonaaliset kaskaadit. Kolmoislukon mekanismi miehillä. Kortisoli-oksitosiini-ovariaalitriade naisilla. Yhteinen reitti, eriävät seuraukset.",

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

    levelLabel: "Taso III — Seuraukset",
    modelLink: "Lue mekanismi",
    evidenceLink: "Tutki näyttöä",
    predictionsLink: "Katso kaikki ennusteet",
    readMore: "Lue",
  },
  ja: {
    title: "文明",
    subtitle:
      "両性のホルモン基盤が同時に変化するとき、社会に何が起こるのか？",
    heroLead:
      "テストステロン、エストロゲン、ドーパミン、コルチゾール、オキシトシン、メラトニンは単なる医学用語ではありません。それらはモチベーション、信頼、絆、睡眠、生殖、認知の生物学的インフラストラクチャーです。電磁場がこれらのホルモンを調節するカルシウムチャネルを乱すと、影響は分子から細胞、臓器、個人、家族、制度へと伝播します。",
    heroTrail:
      "このセクションはその伝播を追跡します — 7つのランダム化比較試験から人口レベルの行動データ、そして文明変動のダイナミクスへ。",
    readingGuide: "読書経路",
    readingGuideDesc:
      "議論は5段階で構築されます。各ページは独立していますが、因果連鎖は左から右へ流れます。",

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

    levelLabel: "レベルIII — 結果",
    modelLink: "メカニズムを読む",
    evidenceLink: "証拠を探る",
    predictionsLink: "すべての予測を見る",
    readMore: "読む",
  },
  fr: {
    title: "Civilisation",
    subtitle:
      "Que se passe-t-il quand le substrat hormonal des deux sexes change simultanement ?",
    heroLead:
      "Testosterone, estrogene, dopamine, cortisol, ocytocine et melatonine ne sont pas de simples termes medicaux. Ce sont les infrastructures biologiques de la motivation, de la confiance, du lien, du sommeil, de la reproduction et de la cognition.",
    heroTrail:
      "Cette section retrace cette propagation — des essais cliniques aux donnees comportementales de population et a la dynamique du changement civilisationnel.",
    readingGuide: "Parcours de lecture",
    readingGuideDesc:
      "L'argument se construit en cinq etapes. Chaque page est autonome, mais la chaine causale se lit de gauche a droite.",

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

    levelLabel: "Niveau III — Consequences",
    modelLink: "Lire le mecanisme",
    evidenceLink: "Explorer les preuves",
    predictionsLink: "Voir toutes les predictions",
    readMore: "Lire",
  },
  ko: {
    title: "문명",
    subtitle:
      "양성의 호르몬 기질이 동시에 변화할 때 사회에 무슨 일이 일어나는가?",
    heroLead:
      "테스토스테론, 에스트로겐, 도파민, 코르티솔, 옥시토신, 멜라토닌은 단순한 의학 용어가 아닙니다. 이것들은 동기, 신뢰, 유대, 수면, 생식, 인지의 생물학적 인프라입니다.",
    heroTrail:
      "이 섹션은 그 전파를 추적합니다 — 7개의 무작위 대조 시험에서 인구 수준의 행동 데이터, 그리고 문명 변동의 역학으로.",
    readingGuide: "독서 경로",
    readingGuideDesc:
      "논증은 5단계로 구축됩니다. 각 페이지는 독립적이지만 인과 사슬은 왼쪽에서 오른쪽으로 흐릅니다.",

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

    levelLabel: "레벨 III — 결과",
    modelLink: "메커니즘 읽기",
    evidenceLink: "증거 탐색",
    predictionsLink: "모든 예측 보기",
    readMore: "읽기",
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
] as const;

const COLORS: Record<string, { border: string; bg: string; text: string; icon: string }> = {
  amber: { border: "border-amber-500/30", bg: "bg-amber-500/5", text: "text-amber-500", icon: "text-amber-500" },
  blue: { border: "border-blue-500/30", bg: "bg-blue-500/5", text: "text-blue-500", icon: "text-blue-500" },
  red: { border: "border-red-500/30", bg: "bg-red-500/5", text: "text-red-500", icon: "text-red-500" },
  purple: { border: "border-purple-500/30", bg: "bg-purple-500/5", text: "text-purple-500", icon: "text-purple-500" },
  rose: { border: "border-rose-500/30", bg: "bg-rose-500/5", text: "text-rose-500", icon: "text-rose-500" },
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
