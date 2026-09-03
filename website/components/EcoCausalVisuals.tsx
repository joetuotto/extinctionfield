import { pickCopy } from "@/lib/i18n";
import { StudyCitation } from "@/components/StudyCitation";

type Locale = "en" | "fi" | "ja" | "fr" | "ko";

type VisualStep = {
  eyebrow: string;
  title: string;
  detail: string;
  formula: string;
  tone: "observed" | "hypothesis";
};

const COPY: Record<
  Locale,
  {
    modelKicker: string;
    modelTitle: string;
    modelLead: string;
    observed: string;
    hypothesis: string;
    steps: readonly VisualStep[];
    keyKicker: string;
    keyTitle: string;
    keyLead: string;
    fields: readonly { label: string; value: string; endpoint: string; scope: string }[];
    tickKicker: string;
    tickTitle: string;
    tickLead: string;
    direct: string;
    directSource: string;
    open: string;
    directText: string;
    openText: string;
    boundaryLabel: string;
    boundaryText: string;
    systemsKicker: string;
    systemsLabel: string;
  }
> = {
  en: {
    modelKicker: "Causal reading guide",
    modelTitle: "BERM candidate mappings from one measured FieldState",
    modelLead:
      "Read this BERM candidate chain from left to right. FieldState supplies the measurement record. The L2 response form is conditional on stated coupling assumptions, while sensing, transport and physiological transfer require species- and stage-specific tissue kernels and calibration. Solid steps summarize measured premises. The amber sequence is the explicitly testable ecological and evolutionary extension.",
    observed: "Measured premise",
    hypothesis: "BERM hypothesis; L2 operator open",
    steps: [
      {
        eyebrow: "01 · PHYSICAL INPUT",
        title: "FieldState",
        detail: "A configuration, not one generic dose: components, spectrum, geometry, reference and time.",
        formula: "E · B · Q · t",
        tone: "observed",
      },
      {
        eyebrow: "02 · SPECIES TRANSFER",
        title: "Different organisms read it differently",
        detail: "Morphology, sensory organs, size, hydration, life stage and habitat shape the local response.",
        formula: "Rᵢ = Hᵢ(FieldState)",
        tone: "observed",
      },
      {
        eyebrow: "03 · ECOLOGICAL EVENT",
        title: "Encounter, route or dispersal",
        detail: "The proximal endpoint can be a visit, attachment, navigation choice or colonisation event.",
        formula: "kᵢⱼ",
        tone: "observed",
      },
      {
        eyebrow: "04 · RELATIVE OUTCOME",
        title: "Ecological sorting",
        detail: "The relevant contrast is a relative change in realised fitness, not a claim of uniform sensitivity.",
        formula: "Wᵢ / Wⱼ",
        tone: "hypothesis",
      },
      {
        eyebrow: "05 · GENERATIONAL TEST",
        title: "Selection / evolution",
        detail: "Only repeated fitness differences acting on inherited variation can change a trait distribution.",
        formula: "P₍g+1₎(θ)",
        tone: "hypothesis",
      },
    ],
    keyKicker: "FieldState signature ledger",
    keyTitle: "A FieldState has several non-interchangeable signatures",
    keyLead:
      "The ledger prevents category errors: an observation in one field class is not silently reused as evidence in another.",
    fields: [
      { label: "Static interface", value: "E_DC · Q · ∇|E|²", endpoint: "force / attachment", scope: "physical transport" },
      { label: "ELF waveform", value: "E_AC(f) · B(f) · dE/dt", endpoint: "landing / behaviour", scope: "matched endpoint" },
      { label: "Geomagnetic cue", value: "B₀ · inclination · light", endpoint: "orientation", scope: "context-dependent signal" },
      { label: "RF signature", value: "S(f, polarisation, time)", endpoint: "frequency window", scope: "spectrum-specific result" },
    ],
    tickKicker: "Evidence boundary · Ixodes / host interface",
    tickTitle: "What the tick experiment establishes — and what it does not",
    tickLead:
      "The direct result concerns a local, static host–vegetation interface. It must remain within that field class and endpoint; relative robustness and selection require their own measurements.",
    direct: "Observed physical result",
    directSource: "England, Lihou & Robert (2023)",
    open: "Derived / testable extension",
    directText: "Calibrated static fields can alter short-range attraction and attachment in the tested tick system.",
    openText: "Compare response curves, feeding success and inherited traits across species and life stages under the same FieldState.",
    boundaryLabel: "Reading rule",
    boundaryText: "Static transport evidence is not interchangeable with RF/ELF response or population change.",
    systemsKicker: "Organism systems",
    systemsLabel: "Pollinator · tick / parasite · migrant · disperser",
  },
  fi: {
    modelKicker: "Kausaalinen lukutapa",
    modelTitle: "BERM:n ehdokaskuvaukset yhdestä mitatusta FieldStatesta",
    modelLead:
      "Lue tämä BERM:n ehdokasketju vasemmalta oikealle. FieldState tuottaa mittaustietueen; aistiminen, kuljetus ja fysiologinen siirto ovat avoimen L2-sillan laji- ja elinvaihekohtaisia ehdokaskuvauksia. Yhtenäiset vaiheet tiivistävät mitatut premissit. Meripihkanvärinen jatko on nimenomaisesti testattava ekologinen ja evolutiivinen laajennus.",
    observed: "Mitattu premissi",
    hypothesis: "BERM-hypoteesi; L2-operaattori avoin",
    steps: [
      {
        eyebrow: "01 · FYSIKAALINEN SYÖTE",
        title: "FieldState",
        detail: "Konfiguraatio, ei yksi yleinen annos: komponentit, spektri, geometria, referenssi ja aika.",
        formula: "E · B · Q · t",
        tone: "observed",
      },
      {
        eyebrow: "02 · LAJIKOHTAINEN SIIRTO",
        title: "Eri eliöt lukevat sen eri tavoin",
        detail: "Morfologia, aistielimet, koko, kosteus, elinvaihe ja elinympäristö muovaavat paikallista vastetta.",
        formula: "Rᵢ = Hᵢ(FieldState)",
        tone: "observed",
      },
      {
        eyebrow: "03 · EKOLOGINEN TAPAHTUMA",
        title: "Kohtaaminen, reitti tai dispersaali",
        detail: "Läheinen päätepiste voi olla käynti, kiinnittyminen, navigointivalinta tai kolonisaatiotapahtuma.",
        formula: "kᵢⱼ",
        tone: "observed",
      },
      {
        eyebrow: "04 · SUHTEELLINEN TULOS",
        title: "Ekologinen lajittuminen",
        detail: "Olennainen kontrasti on muutos toteutuneessa suhteellisessa kelpoisuudessa, ei väite tasaisesta herkkyydestä.",
        formula: "Wᵢ / Wⱼ",
        tone: "hypothesis",
      },
      {
        eyebrow: "05 · SUKUPOLVITESTI",
        title: "Valinta / evoluutio",
        detail: "Vain periytyvään vaihteluun kohdistuva, toistuva kelpoisuusero voi muuttaa piirteen jakaumaa.",
        formula: "P₍g+1₎(θ)",
        tone: "hypothesis",
      },
    ],
    keyKicker: "FieldState-allekirjoitusten luettelo",
    keyTitle: "FieldStatella on useita ei-vaihdettavia allekirjoituksia",
    keyLead:
      "Luettelo estää luokkavirheen: yhdessä kenttäluokassa tehtyä havaintoa ei käytetä hiljaisesti toisen kenttäluokan näyttönä.",
    fields: [
      { label: "Staattinen rajapinta", value: "E_DC · Q · ∇|E|²", endpoint: "voima / kiinnittyminen", scope: "fysikaalinen kuljetus" },
      { label: "ELF-aaltomuoto", value: "E_AC(f) · B(f) · dE/dt", endpoint: "laskeutuminen / käyttäytyminen", scope: "vastaava päätepiste" },
      { label: "Geomagneettinen vihje", value: "B₀ · inklinaatio · valo", endpoint: "orientaatio", scope: "kontekstiriippuvainen signaali" },
      { label: "RF-allekirjoitus", value: "S(f, polarisaatio, aika)", endpoint: "taajuusikkuna", scope: "spektritarkka tulos" },
    ],
    tickKicker: "Näyttörajaus · Ixodes / isäntärajapinta",
    tickTitle: "Mitä punkkikoe osoittaa — ja mitä se ei osoita",
    tickLead:
      "Suora tulos koskee paikallista staattista isäntä–kasvillisuusrajapintaa. Se kuuluu tähän kenttäluokkaan ja päätepisteeseen; suhteellinen robustius ja valinta vaativat omat mittauksensa.",
    direct: "Havaittu fysikaalinen tulos",
    directSource: "England, Lihou & Robert (2023)",
    open: "Johdettu / testattava laajennus",
    directText: "Kalibroidut staattiset kentät voivat muuttaa lyhyen matkan vetoa ja kiinnittymistä tutkitussa punkkijärjestelmässä.",
    openText: "Vertaile vastekäyriä, ruokintamenestystä ja periytyviä piirteitä lajien ja elinvaiheiden välillä samassa FieldStatessa.",
    boundaryLabel: "Lukusääntö",
    boundaryText: "Staattisen kuljetuksen näyttö ei ole vaihdettavissa RF/ELF-vasteeseen tai populaatiomuutokseen.",
    systemsKicker: "Eliöjärjestelmät",
    systemsLabel: "Pölyttäjä · punkki / loinen · muuttaja · dispersoituja",
  },
  ja: {
    modelKicker: "因果的読み方ガイド",
    modelTitle: "測定FieldStateからのBERM候補写像",
    modelLead:
      "このBERM候補連鎖を左から右に読みます。FieldStateは測定記録を提供し、感知・輸送・生理学的伝達は、開いたL2橋を越える種・発達段階別の候補写像です。実線のステップは測定された前提を要約しています。琥珀色のシーケンスは、明示的に検証可能な生態学的・進化的拡張です。",
    observed: "測定された前提",
    hypothesis: "BERM仮説; L2演算子は未確定",
    steps: [
      {
        eyebrow: "01 · 物理的入力",
        title: "FieldState",
        detail: "一般的な線量ではなく構成: 成分、スペクトル、幾何学、基準、時間。",
        formula: "E · B · Q · t",
        tone: "observed",
      },
      {
        eyebrow: "02 · 種固有の伝達",
        title: "異なる生物は異なる読み取りをする",
        detail: "形態・感覚器官・サイズ・水分量・発達段階・生息環境が局所応答を形成する。",
        formula: "Rᵢ = Hᵢ(FieldState)",
        tone: "observed",
      },
      {
        eyebrow: "03 · 生態学的事象",
        title: "遭遇・経路・分散",
        detail: "近位エンドポイントは、訪問・付着・ナビゲーション選択・定着事象でありうる。",
        formula: "kᵢⱼ",
        tone: "observed",
      },
      {
        eyebrow: "04 · 相対的結果",
        title: "生態学的選別",
        detail: "関連する対比は実現適応度の相対的変化であり、均一な感受性の主張ではない。",
        formula: "Wᵢ / Wⱼ",
        tone: "hypothesis",
      },
      {
        eyebrow: "05 · 世代テスト",
        title: "選択 / 進化",
        detail: "遺伝的変異に作用する反復的な適応度差のみが形質分布を変えることができる。",
        formula: "P₍g+1₎(θ)",
        tone: "hypothesis",
      },
    ],
    keyKicker: "FieldStateシグネチャ台帳",
    keyTitle: "FieldStateには複数の互換不能なシグネチャがある",
    keyLead:
      "台帳はカテゴリーエラーを防ぐ: あるフィールドクラスでの観察を、別のフィールドクラスの証拠として暗黙的に再利用することはない。",
    fields: [
      { label: "静電界面", value: "E_DC · Q · ∇|E|²", endpoint: "力 / 付着", scope: "物理的輸送" },
      { label: "ELF波形", value: "E_AC(f) · B(f) · dE/dt", endpoint: "着地 / 行動", scope: "対応エンドポイント" },
      { label: "地磁気手がかり", value: "B₀ · 傾斜角 · 光", endpoint: "方位決定", scope: "文脈依存シグナル" },
      { label: "RFシグネチャ", value: "S(f, 偏波, 時間)", endpoint: "周波数窓", scope: "スペクトル固有の結果" },
    ],
    tickKicker: "証拠境界 · Ixodes / 宿主界面",
    tickTitle: "ダニ実験が確立するもの — そして確立しないもの",
    tickLead:
      "直接的結果は局所的な静電的宿主–植生界面に関するものである。そのフィールドクラスとエンドポイントに留まるべきであり、相対的堅牢性と選択には独自の測定が必要である。",
    direct: "観測された物理的結果",
    directSource: "England, Lihou & Robert (2023)",
    open: "導出 / 検証可能な拡張",
    directText: "校正された静電場は、試験されたダニシステムにおいて短距離の誘引と付着を変化させることができる。",
    openText: "同一のFieldStateの下で、種および発達段階間の応答曲線・摂食成功・遺伝的形質を比較する。",
    boundaryLabel: "読み取り規則",
    boundaryText: "静電輸送の証拠は、RF/ELF応答や個体群変動と互換ではない。",
    systemsKicker: "生物システム",
    systemsLabel: "花粉媒介者 · ダニ / 寄生者 · 渡り · 分散者",
  },
  fr: {
    modelKicker: "Guide de lecture causale",
    modelTitle: "Mappings candidats BERM depuis un FieldState mesure",
    modelLead:
      "Lire cette chaine candidate BERM de gauche a droite. FieldState fournit l'enregistrement de mesure. La forme L2 est conditionnelle ; la détection, le transport et le transfert physiologique exigent des noyaux et calibrations propres à l'espèce et au stade. La séquence ambre est l'extension écologique et évolutive testable.",
    observed: "Premisse mesuree",
    hypothesis: "Hypothèse BERM ; opérateur L2 conditionnel, noyau ouvert",
    steps: [
      {
        eyebrow: "01 · ENTREE PHYSIQUE",
        title: "FieldState",
        detail: "Une configuration, non une dose generique : composants, spectre, geometrie, reference et temps.",
        formula: "E · B · Q · t",
        tone: "observed",
      },
      {
        eyebrow: "02 · TRANSFERT ESPECE",
        title: "Differents organismes le lisent differemment",
        detail: "La morphologie, les organes sensoriels, la taille, l'hydratation, le stade et l'habitat faconnent la reponse locale.",
        formula: "Rᵢ = Hᵢ(FieldState)",
        tone: "observed",
      },
      {
        eyebrow: "03 · EVENEMENT ECOLOGIQUE",
        title: "Rencontre, route ou dispersion",
        detail: "Le point final proximal peut etre une visite, une fixation, un choix de navigation ou un evenement de colonisation.",
        formula: "kᵢⱼ",
        tone: "observed",
      },
      {
        eyebrow: "04 · RESULTAT RELATIF",
        title: "Tri ecologique",
        detail: "Le contraste pertinent est un changement relatif de la fitness realisee, et non une affirmation de sensibilite uniforme.",
        formula: "Wᵢ / Wⱼ",
        tone: "hypothesis",
      },
      {
        eyebrow: "05 · TEST GENERATIONNEL",
        title: "Selection / evolution",
        detail: "Seules des differences de fitness repetees agissant sur la variation heritee peuvent modifier la distribution d'un trait.",
        formula: "P₍g+1₎(θ)",
        tone: "hypothesis",
      },
    ],
    keyKicker: "Registre de signatures FieldState",
    keyTitle: "Un FieldState possede plusieurs signatures non interchangeables",
    keyLead:
      "Le registre previent les erreurs de categorie : une observation dans une classe de champ n'est pas reutilisee silencieusement comme preuve dans une autre.",
    fields: [
      { label: "Interface statique", value: "E_DC · Q · ∇|E|²", endpoint: "force / fixation", scope: "transport physique" },
      { label: "Forme d'onde ELF", value: "E_AC(f) · B(f) · dE/dt", endpoint: "atterrissage / comportement", scope: "point final associe" },
      { label: "Indice geomagnetique", value: "B₀ · inclinaison · lumiere", endpoint: "orientation", scope: "signal dependant du contexte" },
      { label: "Signature RF", value: "S(f, polarisation, temps)", endpoint: "fenetre de frequence", scope: "resultat specifique au spectre" },
    ],
    tickKicker: "Frontiere de preuve · interface Ixodes / hote",
    tickTitle: "Ce que l'experience sur les tiques etablit — et ce qu'elle n'etablit pas",
    tickLead:
      "Le resultat direct concerne une interface hote–vegetation statique locale. Il doit rester dans cette classe de champ et ce point final ; la robustesse relative et la selection necessitent leurs propres mesures.",
    direct: "Resultat physique observe",
    directSource: "England, Lihou & Robert (2023)",
    open: "Extension derivee / testable",
    directText: "Des champs statiques calibres peuvent modifier l'attraction a courte portee et la fixation dans le systeme de tiques etudie.",
    openText: "Comparer les courbes de reponse, le succes alimentaire et les traits herites entre especes et stades sous le meme FieldState.",
    boundaryLabel: "Regle de lecture",
    boundaryText: "Les preuves de transport statique ne sont pas interchangeables avec la reponse RF/ELF ou le changement de population.",
    systemsKicker: "Systemes d'organismes",
    systemsLabel: "Pollinisateur · tique / parasite · migrateur · disperseur",
  },
  ko: {
    modelKicker: "인과적 읽기 가이드",
    modelTitle: "측정된 FieldState에서 시작하는 BERM 후보 매핑",
    modelLead:
      "이 BERM 후보 연쇄를 왼쪽에서 오른쪽으로 읽으십시오. FieldState는 측정 기록을 제공하며, 감지·수송·생리학적 전달은 열린 L2 다리를 지나는 종·발달 단계별 후보 매핑입니다. 실선 단계는 측정된 전제를 요약합니다. 호박색 시퀀스는 명시적으로 검증 가능한 생태학적 및 진화적 확장입니다.",
    observed: "측정된 전제",
    hypothesis: "BERM 가설; L2 연산자 미확정",
    steps: [
      {
        eyebrow: "01 · 물리적 입력",
        title: "FieldState",
        detail: "일반적 선량이 아닌 구성: 구성 요소, 스펙트럼, 기하학, 기준 및 시간.",
        formula: "E · B · Q · t",
        tone: "observed",
      },
      {
        eyebrow: "02 · 종별 전달",
        title: "다른 생물은 다르게 읽는다",
        detail: "형태, 감각 기관, 크기, 수분, 발달 단계 및 서식지가 국소 반응을 형성한다.",
        formula: "Rᵢ = Hᵢ(FieldState)",
        tone: "observed",
      },
      {
        eyebrow: "03 · 생태학적 사건",
        title: "조우, 경로 또는 분산",
        detail: "근위 종점은 방문, 부착, 탐색 선택 또는 정착 사건일 수 있다.",
        formula: "kᵢⱼ",
        tone: "observed",
      },
      {
        eyebrow: "04 · 상대적 결과",
        title: "생태학적 선별",
        detail: "관련된 대비는 실현 적합도의 상대적 변화이며, 균일한 감수성 주장이 아니다.",
        formula: "Wᵢ / Wⱼ",
        tone: "hypothesis",
      },
      {
        eyebrow: "05 · 세대 테스트",
        title: "선택 / 진화",
        detail: "유전적 변이에 작용하는 반복적인 적합도 차이만이 형질 분포를 변화시킬 수 있다.",
        formula: "P₍g+1₎(θ)",
        tone: "hypothesis",
      },
    ],
    keyKicker: "FieldState 서명 원장",
    keyTitle: "FieldState에는 여러 비호환 서명이 있다",
    keyLead:
      "원장은 범주 오류를 방지합니다: 한 필드 클래스의 관찰은 다른 필드 클래스의 증거로 암묵적으로 재사용되지 않습니다.",
    fields: [
      { label: "정전 계면", value: "E_DC · Q · ∇|E|²", endpoint: "힘 / 부착", scope: "물리적 수송" },
      { label: "ELF 파형", value: "E_AC(f) · B(f) · dE/dt", endpoint: "착지 / 행동", scope: "대응 종점" },
      { label: "지자기 단서", value: "B₀ · 경사각 · 광", endpoint: "방위 결정", scope: "맥락 의존 신호" },
      { label: "RF 서명", value: "S(f, 편파, 시간)", endpoint: "주파수 창", scope: "스펙트럼 특이적 결과" },
    ],
    tickKicker: "증거 경계 · Ixodes / 숙주 계면",
    tickTitle: "진드기 실험이 확립하는 것 — 그리고 확립하지 않는 것",
    tickLead:
      "직접적 결과는 국소적 정전적 숙주-식생 계면에 관한 것이다. 해당 필드 클래스와 종점 내에 머물러야 하며, 상대적 견고성과 선택에는 자체 측정이 필요하다.",
    direct: "관측된 물리적 결과",
    directSource: "England, Lihou & Robert (2023)",
    open: "도출 / 검증 가능한 확장",
    directText: "교정된 정전장은 시험된 진드기 시스템에서 단거리 유인 및 부착을 변화시킬 수 있다.",
    openText: "동일한 FieldState 하에서 종과 발달 단계 간의 반응 곡선, 섭식 성공 및 유전적 형질을 비교한다.",
    boundaryLabel: "읽기 규칙",
    boundaryText: "정전 수송 증거는 RF/ELF 반응이나 개체군 변화와 호환되지 않는다.",
    systemsKicker: "생물 시스템",
    systemsLabel: "수분매개자 · 진드기 / 기생자 · 이동자 · 분산자",
  },
};

export function EcoCausalVisuals({ locale }: { locale: string }) {
  const d = pickCopy(COPY, locale);

  return (
    <section aria-labelledby="eco-causal-visual-title" className="mt-10 border-y border-card-border py-8 sm:py-10">
      <header className="max-w-4xl">
        <p className="editorial-kicker text-accent">{d.modelKicker}</p>
        <h2 id="eco-causal-visual-title" className="editorial-section-heading mt-3 text-[clamp(1.75rem,1.35rem+1vw,2.35rem)]">
          {d.modelTitle}
        </h2>
        <p className="editorial-deck mt-4">{d.modelLead}</p>
      </header>

      <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3 border-y border-card-border py-3 text-xs text-foreground-muted" aria-label={d.modelKicker}>
        <span className="inline-flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-status-confirmed" aria-hidden="true" />
          {d.observed}
        </span>
        <span className="inline-flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-status-partial" aria-hidden="true" />
          {d.hypothesis}
        </span>
      </div>

      <ol className="mt-7 grid gap-x-5 gap-y-7 sm:grid-cols-2 xl:grid-cols-5" aria-label={d.modelTitle}>
        {d.steps.map((step) => {
          const isObserved = step.tone === "observed";
          return (
            <li key={step.eyebrow} className="min-w-0 border-t border-card-border pt-4">
              <article className="flex h-full flex-col">
                <p className={`editorial-kicker ${isObserved ? "text-status-confirmed" : "text-status-partial"}`}>
                  {isObserved ? d.observed : d.hypothesis}
                </p>
                <p className="mt-2 font-mono-num text-[10px] font-semibold tracking-[0.12em] text-foreground-muted">{step.eyebrow}</p>
                <h3 className="mt-3 font-serif text-[1.05rem] font-semibold leading-snug tracking-[-0.012em] text-foreground">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-foreground-muted">{step.detail}</p>
                <p className={`mt-4 border-t border-card-border pt-3 font-mono-num text-xs ${isObserved ? "text-status-confirmed" : "text-status-partial"}`}>
                  {step.formula}
                </p>
              </article>
            </li>
          );
        })}
      </ol>

      <section aria-labelledby="fieldstate-signatures-title" className="mt-10 border-t border-card-border pt-7">
        <header className="max-w-4xl">
          <p className="editorial-kicker">{d.keyKicker}</p>
          <h3 id="fieldstate-signatures-title" className="mt-2 font-serif text-[1.25rem] font-semibold leading-tight tracking-[-0.016em] text-foreground">
            {d.keyTitle}
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-foreground-muted">{d.keyLead}</p>
        </header>
        <dl className="mt-5 grid gap-x-5 gap-y-4 sm:grid-cols-2 xl:grid-cols-4">
          {d.fields.map((field, index) => (
            <div key={field.label} className="border-t border-card-border pt-3">
              <dt className="flex items-baseline gap-2">
                <span className="font-mono-num text-[10px] font-semibold text-accent">0{index + 1}</span>
                <span className="text-xs font-semibold text-foreground">{field.label}</span>
              </dt>
              <dd className="mt-2 font-mono-num text-[11px] leading-5 text-foreground-muted">{field.value}</dd>
              <dd className="mt-2 text-[11px] leading-5 text-foreground-muted">
                <span className="font-medium text-foreground">{field.endpoint}</span>
                <span aria-hidden="true" className="mx-1.5 text-foreground-muted/60">·</span>
                <span>{field.scope}</span>
              </dd>
            </div>
          ))}
        </dl>
      </section>
    </section>
  );
}

export function TickEvidenceBoundary({ locale }: { locale: string }) {
  const d = pickCopy(COPY, locale);

  return (
    <aside aria-labelledby="tick-evidence-boundary-title" className="mt-8 border-y border-card-border py-7 sm:py-8">
      <header className="max-w-4xl">
        <p className="editorial-kicker text-accent">{d.tickKicker}</p>
        <h3 id="tick-evidence-boundary-title" className="mt-2 font-serif text-[1.45rem] font-semibold leading-tight tracking-[-0.018em] text-foreground sm:text-[1.7rem]">
          {d.tickTitle}
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-foreground-muted">{d.tickLead}</p>
      </header>

      <div className="mt-6 grid border-y border-card-border md:grid-cols-2">
        <section className="border-b border-card-border py-5 pr-0 md:border-r md:border-b-0 md:pr-7" aria-label={d.direct}>
          <div className="border-l-2 border-status-confirmed pl-4">
            <p className="editorial-kicker text-status-confirmed">{d.direct}</p>
            <p className="mt-3 text-sm leading-relaxed text-foreground-muted">{d.directText}</p>
            <p className="mt-3 text-[11px] font-medium text-foreground-muted">
              <StudyCitation
                referenceId="england_2023_ticks"
                locale={locale}
                label={d.directSource}
              />
            </p>
          </div>
        </section>
        <section className="py-5 pl-0 md:pl-7" aria-label={d.open}>
          <div className="border-l-2 border-status-partial pl-4">
            <p className="editorial-kicker text-status-partial">{d.open}</p>
            <p className="mt-3 text-sm leading-relaxed text-foreground-muted">{d.openText}</p>
          </div>
        </section>
      </div>

      <p className="mt-5 border-l-2 border-accent pl-4 text-xs leading-5 text-foreground-muted">
        <span className="font-semibold text-foreground">{d.boundaryLabel}. </span>
        {d.boundaryText}
      </p>
    </aside>
  );
}

export function EcoSpeciesCueRow({ locale }: { locale: string }) {
  const d = pickCopy(COPY, locale);

  return (
    <p className="mt-5 text-xs leading-5 text-foreground-muted" aria-label={d.systemsKicker}>
      <span className="editorial-kicker mr-2 text-foreground">{d.systemsKicker}</span>
      {d.systemsLabel}
    </p>
  );
}
