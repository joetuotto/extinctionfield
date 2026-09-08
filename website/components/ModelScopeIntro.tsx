import { pickCopy } from "@/lib/i18n";

const COPY = {
  en: {
    title: "One model, from physical conditions to civilization",
    lead: "BERM explains how electromagnetic conditions, acting through biological receivers and their changing state, propagate into endocrine coordination, neural function, motivation and action. Interactions among individuals then produce population patterns, institutions and long-term civilizational dynamics.",
    logic: "The same biological state helps determine both what a person can do and what feels rewarding, effortful or worth pursuing. Deliberation, expressed reasons and learning belong to this process and feed back into later choices. The model follows these links through shared state variables, timing, distributions and interaction.",
    scope: "The explanatory model spans this whole chain. Its reproductive calculations are specific applications: they connect organ function, couple outcomes and demographic terms to age-specific fertility and TFR. FieldState supplies measurements and estimates of the upstream physical state. The physics section identifies the Lindgren premise, its geometric consequences and the explicit receiving bridge used to continue into biology.",
  },
  fi: {
    title: "Yksi malli fysikaalisista oloista sivilisaatioon",
    lead: "BERM selittää, miten sähkömagneettiset olosuhteet välittyvät biologisten vastaanottimien ja niiden muuttuvan tilan kautta hormonien koordinaatioon, hermoston toimintaan, motivaatioon ja tekoihin. Yksilöiden vuorovaikutuksesta muodostuvat väestökehitys, instituutiot ja sivilisaation pitkä dynamiikka.",
    logic: "Sama biologinen tila osallistuu sekä toimintakyvyn että koetun palkitsevuuden, vaivan ja tavoiteltavuuden muodostumiseen. Harkinta, ilmaistut perustelut ja oppiminen kuuluvat tähän prosessiin ja vaikuttavat myöhempiin valintoihin. Malli seuraa näitä yhteyksiä yhteisten tilamuuttujien, ajoituksen, jakaumien ja vuorovaikutuksen kautta.",
    scope: "Selitysmalli kattaa koko tämän ketjun. Lisääntymisen laskentareitit ovat sen yksittäisiä sovelluksia: ne yhdistävät elinten toiminnan, paripäätepisteet ja demografiset tekijät ikäkohtaisiin hedelmällisyyslukuihin ja TFR:ään. FieldState tuottaa mittauksia ja arvioita ketjun fysikaalisesta lähtötilasta. Fysiikka-osio nimeää Lindgren-premissin, sen geometriset seuraukset ja eksplisiittisen vastaanottokytkennän, jonka kautta kuvaus jatkuu biologiaan.",
  },
  ja: {
    title: "物理的条件から文明まで、一つのモデル",
    lead: "BERMは、電磁的条件が生物学的な受容体とその状態を通じて、内分泌の協調、神経機能、動機、行動へと伝わる過程を説明します。個人間の相互作用から、人口動態、制度、文明の長期的な変化が形成されます。",
    logic: "同じ生物学的状態が、行動する能力と、報酬・労力・目標の主観的な価値の両方に関わります。熟考、表明された理由、学習もこの過程の一部であり、その後の選択に作用します。モデルは、共通の状態変数、時間関係、分布、相互作用を通じてこれらのつながりを追います。",
    scope: "説明モデルはこの連鎖全体を扱います。生殖の計算経路はその個別の応用であり、臓器機能、カップルの結果、人口学的要因を年齢別出生率とTFRに結び付けます。FieldStateは上流の物理状態の測定と推定を担います。物理学の節ではLindgrenの前提、その幾何学的帰結、生物学へ進むための明示的な受容結合を示します。",
  },
  fr: {
    title: "Un modèle, des conditions physiques à la civilisation",
    lead: "BERM explique comment les conditions électromagnétiques se propagent, par les récepteurs biologiques et leur état, vers la coordination endocrine, le fonctionnement neural, la motivation et l’action. Les interactions entre individus produisent ensuite les évolutions démographiques, les institutions et la dynamique des civilisations.",
    logic: "Un même état biologique contribue à déterminer la capacité d’agir et ce qui paraît gratifiant, coûteux en effort ou désirable. La délibération, les raisons exprimées et l’apprentissage appartiennent à ce processus et influencent les choix suivants. Le modèle suit ces liens à travers des variables d’état communes, leur temporalité, leurs distributions et leurs interactions.",
    scope: "Le modèle explicatif couvre toute cette chaîne. Les calculs reproductifs en sont des applications particulières : ils relient la fonction des organes, les résultats du couple et les facteurs démographiques aux taux de fécondité par âge et à l’ISF. FieldState fournit les mesures et estimations de l’état physique en amont. La section Physique présente la prémisse de Lindgren, ses conséquences géométriques et le couplage récepteur explicite permettant de poursuivre vers la biologie.",
  },
  ko: {
    title: "물리적 조건에서 문명까지 이어지는 하나의 모델",
    lead: "BERM은 전자기 조건이 생물학적 수용체와 그 상태를 통해 내분비 조정, 신경 기능, 동기와 행동으로 전달되는 과정을 설명합니다. 개인 간 상호작용은 인구 변화, 제도와 문명의 장기 역학을 형성합니다.",
    logic: "동일한 생물학적 상태는 행동 능력과 보상, 노력, 목표의 주관적 가치 형성에 함께 관여합니다. 숙고, 표현된 이유와 학습도 이 과정의 일부이며 이후 선택에 되먹임을 줍니다. 모델은 공통 상태 변수, 시간 관계, 분포와 상호작용을 통해 이러한 연결을 추적합니다.",
    scope: "설명 모델은 이 전체 사슬을 다룹니다. 생식 계산 경로는 그중 특정 응용으로, 장기 기능, 커플의 결과와 인구학적 요인을 연령별 출산율 및 TFR에 연결합니다. FieldState는 상위 물리 상태의 측정과 추정을 제공합니다. 물리학 절은 Lindgren 전제, 기하학적 귀결, 생물학으로 이어지는 명시적 수용 결합을 제시합니다.",
  },
};

export function ModelScopeIntro({ locale }: { locale: string }) {
  const d = pickCopy(COPY, locale);
  return (
    <section id="model-scope" className="my-8 max-w-3xl space-y-4">
      <h2 className="text-xl font-semibold">{d.title}</h2>
      <p className="text-base leading-relaxed">{d.lead}</p>
      <p className="text-sm leading-relaxed text-foreground-muted">{d.logic}</p>
      <p className="text-sm leading-relaxed text-foreground-muted">{d.scope}</p>
    </section>
  );
}
