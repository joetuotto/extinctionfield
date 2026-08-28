import {
  FIELDSTATE_EVIDENCE_COUNT,
} from "@/lib/evidence";
import { pickCopy } from "@/lib/i18n";
type Status = "TECHNOLOGY_TIMING_PROXY" | "PARTIAL_FIELD_STATE" | "MEASUREMENT_READY_FIELD_STATE";

interface StatusDefinition {
  readonly id: Status;
  readonly title: string;
  readonly description: string;
  readonly use: string;
  readonly tone: "pending" | "partial" | "confirmed";
}

interface Layer {
  readonly index: string;
  readonly title: string;
  readonly description: string;
}

const COPY: Record<string, {
  title: string;
  lead: string;
  layersTitle: string;
  statusTitle: string;
  useLabel: string;
  readinessNote: string;
  evidenceNote: string;
  identityTitle: string;
  identityDescription: string;
  identityNote: string;
  cohortTitle: string;
  cohortResult: string;
  cohortDescription: string;
  cohortSource: string;
  layers: readonly Layer[];
  statuses: readonly StatusDefinition[];
}> = {
  en: {
    title: "BERM v17: measurement status",
    lead:
      "The v2 route keeps physical field state, organ transfer, biological capacity and demography distinct. It does not convert technology uptake or mobile subscriptions into a local dose, biological endpoint or TFR coefficient.",
    layersTitle: "Four observable layers",
    statusTitle: "Input completeness is explicit",
    useLabel: "Permitted use",
    readinessNote:
      "Measurement-ready means that all named physical inputs are documented. It does not mean a biological effect, a causal estimate or an outcome coefficient has been established.",
    evidenceNote: `${FIELDSTATE_EVIDENCE_COUNT} bounded study-to-node records support parts of the route. Each remains structural or contextual evidence, never a direct TFR slope.`,
    identityTitle: "ASFR first; TFR is a derived identity",
    identityDescription:
      "The route projects age-specific fertility rates before summing them. Demand/opportunity, tempo and ART/live-birth delivery remain separate inputs rather than hidden biological terms.",
    identityNote:
      "The factor 5 represents five-year age groups (15–19 through 45–49); the equation does not identify any cause of a change in TFR.",
    cohortTitle: "Current cohort signal: timing proxy only",
    cohortResult: "UN WPP 2024 ASFR + World Bank/ITU mobile subscriptions, 2000–2023: N = 163; r = -0.66645.",
    cohortDescription:
      "This is an ecological, descriptive age-cohort timing-proxy result. Mobile subscriptions are not physical FieldState, organ dose or a causal exposure estimate; the result is not a TFR coefficient.",
    cohortSource: "Sources: UN World Population Prospects 2024 ASFR; World Bank/ITU mobile subscriptions.",
    layers: [
      {
        index: "01",
        title: "FieldState and Lindgren selection",
        description:
          "Keep normalised background, ambient and personal vectors separate, with B0, phase/coherence and envelope or beat PSD retained rather than collapsed into one national scalar.",
      },
      {
        index: "02",
        title: "Organ-local transfer and memory",
        description:
          "An explicit organ transfer Tₒ, receptor state and circadian context feed organ-specific reversible (R) and persistent (P) states. Registered evidence and parameter IDs are required for increments.",
      },
      {
        index: "03",
        title: "Reproductive capacity and the couple",
        description:
          "Male, female, barrier and implantation components remain separate before they are combined as a paired conception/live-birth capacity. No national average is silently treated as a couple state.",
      },
      {
        index: "04",
        title: "Age-specific fertility and demographic terms",
        description:
          "The biological ratio, demand/opportunity, tempo and ART/live-birth delivery ratios are reported separately for each age group before TFR is derived.",
      },
    ],
    statuses: [
      {
        id: "TECHNOLOGY_TIMING_PROXY",
        title: "Technology-timing proxy",
        description:
          "A national technology series can describe the timing of digital-environment diffusion. It is distinct from a locally measured FieldState and organ transfer.",
        use: "Descriptive timing and cohort-signature analysis only; never local dose or endpoint calibration.",
        tone: "pending",
      },
      {
        id: "PARTIAL_FIELD_STATE",
        title: "Partial FieldState",
        description:
          "Some physical components are measured, but one or more required inputs are absent: normalisation calibration, B0 vector, organ transfer, envelope/beat PSD, circadian context, phase/coherence or provenance.",
        use: "Diagnostic data-gap reporting and protocol development; not endpoint calibration.",
        tone: "partial",
      },
      {
        id: "MEASUREMENT_READY_FIELD_STATE",
        title: "Measurement-ready FieldState",
        description:
          "All named physical inputs are documented: calibration, measured B0 vector, non-identity organ transfer, PSD, circadian context, phase/coherence and measurement provenance.",
        use: "Eligible for organ-endpoint calibration only when an endpoint join and pre-specified mapping are also present.",
        tone: "confirmed",
      },
    ],
  },
  ja: {
    title: "BERM v17：測定ステータス",
    lead:
      "v2ルートは物理的場の状態、臓器移行、生物学的能力、人口統計を区別する。技術普及やモバイル加入を局所線量、生物学的エンドポイント、TFR係数に変換しない。",
    layersTitle: "4つの観測可能な層",
    statusTitle: "入力の完全性は明示的",
    useLabel: "許可された使用",
    readinessNote:
      "測定準備完了とは、すべての名前付き物理入力が文書化されていることを意味する。生物学的効果、因果推定、または結果係数が確立されたことを意味しない。",
    evidenceNote: `${FIELDSTATE_EVIDENCE_COUNT}の限定的な研究-ノード記録がルートの一部を支持する。各記録は構造的または文脈的証拠であり、直接的なTFR傾きではない。`,
    identityTitle: "ASFRが先; TFRは導出された恒等式",
    identityDescription:
      "ルートは年齢別出生率を投影してから合計する。需要/機会、テンポ、ART/出生分娩は隠れた生物学的項ではなく別々の入力として残る。",
    identityNote:
      "係数5は5年年齢グループ（15-19歳から45-49歳）を表す; 方程式はTFR変化の原因を特定しない。",
    cohortTitle: "現在のコホートシグナル：タイミングプロキシのみ",
    cohortResult: "UN WPP 2024 ASFR + World Bank/ITUモバイル加入、2000-2023: N = 163; r = -0.66645。",
    cohortDescription:
      "これは生態学的、記述的な年齢コホートタイミングプロキシの結果である。モバイル加入は物理的FieldState、臓器線量、因果的曝露推定ではない; 結果はTFR係数ではない。",
    cohortSource: "出典：UN World Population Prospects 2024 ASFR; World Bank/ITUモバイル加入。",
    layers: [
      {
        index: "01",
        title: "FieldStateとLindgren選択",
        description:
          "正規化されたバックグラウンド、環境、個人ベクトルを分離し、B0、位相/コヒーレンス、エンベロープまたはビートPSDを1つの国家スカラーに圧縮せず保持する。",
      },
      {
        index: "02",
        title: "臓器局所移行と記憶",
        description:
          "明示的な臓器移行To、受容体状態、概日文脈が臓器特異的な可逆(R)および持続(P)状態を供給する。増分には登録された証拠とパラメータIDが必要。",
      },
      {
        index: "03",
        title: "生殖能力とカップル",
        description:
          "男性、女性、バリア、着床コンポーネントはペアの受胎/出生能力として組み合わされる前に分離されたまま。国家平均はカップル状態として暗黙に扱われない。",
      },
      {
        index: "04",
        title: "年齢別出生率と人口統計的項",
        description:
          "生物学的比率、需要/機会、テンポ、ART/出生分娩比率はTFRが導出される前に各年齢グループごとに別々に報告される。",
      },
    ],
    statuses: [
      {
        id: "TECHNOLOGY_TIMING_PROXY",
        title: "技術タイミングプロキシ",
        description:
          "国家技術系列はデジタル環境普及のタイミングを記述できる。局所的に測定されたFieldStateと臓器移行とは異なる。",
        use: "記述的タイミングとコホートシグナル分析のみ; 局所線量やエンドポイント較正には使用不可。",
        tone: "pending",
      },
      {
        id: "PARTIAL_FIELD_STATE",
        title: "部分的FieldState",
        description:
          "一部の物理コンポーネントは測定されているが、1つ以上の必要な入力が欠如：正規化較正、B0ベクトル、臓器移行、エンベロープ/ビートPSD、概日文脈、位相/コヒーレンス、来歴。",
        use: "診断的データギャップ報告とプロトコル開発; エンドポイント較正には不可。",
        tone: "partial",
      },
      {
        id: "MEASUREMENT_READY_FIELD_STATE",
        title: "測定準備完了FieldState",
        description:
          "すべての名前付き物理入力が文書化済み：較正、測定B0ベクトル、非恒等臓器移行、PSD、概日文脈、位相/コヒーレンス、測定来歴。",
        use: "エンドポイント結合と事前指定マッピングも存在する場合のみ、臓器エンドポイント較正に適格。",
        tone: "confirmed",
      },
    ],
  },
  fr: {
    title: "BERM v17 : statut de mesure",
    lead:
      "La route v2 maintient l'état physique du champ, le transfert organique, la capacité biologique et la démographie distincts. Elle ne convertit pas l'adoption technologique ou les abonnements mobiles en dose locale, point final biologique ou coefficient TFR.",
    layersTitle: "Quatre couches observables",
    statusTitle: "La complétude des entrées est explicite",
    useLabel: "Utilisation autorisée",
    readinessNote:
      "Prêt pour la mesure signifie que toutes les entrées physiques nommées sont documentées. Cela ne signifie pas qu'un effet biologique, une estimation causale ou un coefficient de résultat a été établi.",
    evidenceNote: `${FIELDSTATE_EVIDENCE_COUNT} enregistrements bornés étude-nœud soutiennent des parties de la route. Chacun reste une preuve structurelle ou contextuelle, jamais une pente TFR directe.`,
    identityTitle: "ASFR d'abord ; le TFR est une identité dérivée",
    identityDescription:
      "La route projette les taux de fécondité par âge avant de les additionner. La demande/opportunité, le tempo et la livraison ART/naissance vivante restent des entrées séparées plutôt que des termes biologiques cachés.",
    identityNote:
      "Le facteur 5 représente les groupes d'âge quinquennaux (15-19 à 45-49) ; l'équation n'identifie aucune cause de changement du TFR.",
    cohortTitle: "Signal de cohorte actuel : proxy temporel uniquement",
    cohortResult: "UN WPP 2024 ASFR + abonnements mobiles World Bank/ITU, 2000-2023 : N = 163 ; r = -0,66645.",
    cohortDescription:
      "C'est un résultat écologique, descriptif de proxy temporel de cohorte d'âge. Les abonnements mobiles ne sont pas le FieldState physique, la dose organique ou une estimation d'exposition causale ; le résultat n'est pas un coefficient TFR.",
    cohortSource: "Sources : UN World Population Prospects 2024 ASFR ; abonnements mobiles World Bank/ITU.",
    layers: [
      {
        index: "01",
        title: "FieldState et sélection de Lindgren",
        description:
          "Maintenir les vecteurs de fond, ambiants et personnels normalisés séparés, avec B0, phase/cohérence et PSD d'enveloppe ou de battement conservés plutôt que réduits à un scalaire national unique.",
      },
      {
        index: "02",
        title: "Transfert et mémoire spécifiques à l'organe",
        description:
          "Un transfert organique explicite To, l'état du récepteur et le contexte circadien alimentent des états réversibles (R) et persistants (P) spécifiques à l'organe. Les incréments nécessitent une preuve enregistrée et des ID de paramètres.",
      },
      {
        index: "03",
        title: "Capacité reproductive et couple",
        description:
          "Les composantes masculine, féminine, de barrière et d'implantation restent séparées avant d'être combinées en capacité de conception/naissance vivante du couple. Aucune moyenne nationale n'est traitée silencieusement comme un état de couple.",
      },
      {
        index: "04",
        title: "Fécondité par âge et termes démographiques",
        description:
          "Le ratio biologique, demande/opportunité, tempo et ratios de livraison ART/naissance vivante sont rapportés séparément pour chaque groupe d'âge avant que le TFR ne soit dérivé.",
      },
    ],
    statuses: [
      {
        id: "TECHNOLOGY_TIMING_PROXY",
        title: "Proxy temporel technologique",
        description:
          "Une série technologique nationale peut décrire le calendrier de diffusion de l'environnement numérique. Elle est distincte d'un FieldState mesuré localement et du transfert organique.",
        use: "Analyse descriptive de calendrier et de signature de cohorte uniquement ; jamais pour une dose locale ou un calibrage de point final.",
        tone: "pending",
      },
      {
        id: "PARTIAL_FIELD_STATE",
        title: "FieldState partiel",
        description:
          "Certaines composantes physiques sont mesurées, mais une ou plusieurs entrées requises sont absentes : calibrage de normalisation, vecteur B0, transfert organique, PSD d'enveloppe/battement, contexte circadien, phase/cohérence ou provenance.",
        use: "Rapport de lacunes de données diagnostiques et développement de protocole ; pas de calibrage de point final.",
        tone: "partial",
      },
      {
        id: "MEASUREMENT_READY_FIELD_STATE",
        title: "FieldState prêt pour la mesure",
        description:
          "Toutes les entrées physiques nommées sont documentées : calibrage, vecteur B0 mesuré, transfert organique non-identité, PSD, contexte circadien, phase/cohérence et provenance de mesure.",
        use: "Éligible au calibrage de point final organique uniquement lorsqu'une jonction de point final et un mapping pré-spécifié sont également présents.",
        tone: "confirmed",
      },
    ],
  },
  ko: {
    title: "BERM v17: 측정 상태",
    lead:
      "v2 경로는 물리적 장 상태, 장기 전달, 생물학적 능력, 인구통계를 구별한다. 기술 채택이나 모바일 가입을 지역 선량, 생물학적 종점, TFR 계수로 변환하지 않는다.",
    layersTitle: "4개의 관측 가능한 층",
    statusTitle: "입력 완전성은 명시적",
    useLabel: "허용된 사용",
    readinessNote:
      "측정 준비 완료란 모든 명명된 물리적 입력이 문서화되었음을 의미한다. 생물학적 효과, 인과 추정 또는 결과 계수가 확립되었음을 의미하지 않는다.",
    evidenceNote: `${FIELDSTATE_EVIDENCE_COUNT}개의 한정된 연구-노드 기록이 경로의 일부를 지원한다. 각각은 구조적 또는 맥락적 증거이며, 직접적인 TFR 기울기가 아니다.`,
    identityTitle: "ASFR 우선; TFR은 도출된 항등식",
    identityDescription:
      "경로는 연령별 출산율을 투영한 후 합산한다. 수요/기회, 템포, ART/출생 분만은 숨겨진 생물학적 항이 아닌 별도의 입력으로 남는다.",
    identityNote:
      "계수 5는 5년 연령 그룹(15-19세부터 45-49세)을 나타낸다; 방정식은 TFR 변화의 원인을 식별하지 않는다.",
    cohortTitle: "현재 코호트 신호: 타이밍 프록시만",
    cohortResult: "UN WPP 2024 ASFR + World Bank/ITU 모바일 가입, 2000-2023: N = 163; r = -0.66645.",
    cohortDescription:
      "이것은 생태학적, 기술적 연령 코호트 타이밍 프록시 결과이다. 모바일 가입은 물리적 FieldState, 장기 선량, 인과적 노출 추정이 아니다; 결과는 TFR 계수가 아니다.",
    cohortSource: "출처: UN World Population Prospects 2024 ASFR; World Bank/ITU 모바일 가입.",
    layers: [
      {
        index: "01",
        title: "FieldState와 Lindgren 선택",
        description:
          "정규화된 배경, 환경, 개인 벡터를 분리하고, B0, 위상/코히어런스, 엔벨로프 또는 비트 PSD를 하나의 국가 스칼라로 압축하지 않고 유지한다.",
      },
      {
        index: "02",
        title: "장기 국소 전달과 기억",
        description:
          "명시적 장기 전달 To, 수용체 상태, 일주기 맥락이 장기 특이적 가역(R) 및 지속(P) 상태를 공급한다. 증분에는 등록된 증거와 매개변수 ID가 필요하다.",
      },
      {
        index: "03",
        title: "생식 능력과 커플",
        description:
          "남성, 여성, 장벽, 착상 요소는 쌍의 수태/출생 능력으로 결합되기 전에 분리 유지된다. 국가 평균이 커플 상태로 암묵적으로 취급되지 않는다.",
      },
      {
        index: "04",
        title: "연령별 출산율과 인구통계적 항",
        description:
          "생물학적 비율, 수요/기회, 템포, ART/출생 분만 비율은 TFR이 도출되기 전에 각 연령 그룹별로 별도 보고된다.",
      },
    ],
    statuses: [
      {
        id: "TECHNOLOGY_TIMING_PROXY",
        title: "기술 타이밍 프록시",
        description:
          "국가 기술 시리즈는 디지털 환경 확산의 타이밍을 기술할 수 있다. 국소적으로 측정된 FieldState 및 장기 전달과는 다르다.",
        use: "기술적 타이밍과 코호트 신호 분석에만 사용; 국소 선량이나 종점 보정에는 사용 불가.",
        tone: "pending",
      },
      {
        id: "PARTIAL_FIELD_STATE",
        title: "부분적 FieldState",
        description:
          "일부 물리적 요소가 측정되었지만, 하나 이상의 필요 입력이 부재: 정규화 보정, B0 벡터, 장기 전달, 엔벨로프/비트 PSD, 일주기 맥락, 위상/코히어런스 또는 출처.",
        use: "진단적 데이터 갭 보고 및 프로토콜 개발; 종점 보정에는 불가.",
        tone: "partial",
      },
      {
        id: "MEASUREMENT_READY_FIELD_STATE",
        title: "측정 준비 완료 FieldState",
        description:
          "모든 명명된 물리적 입력이 문서화됨: 보정, 측정된 B0 벡터, 비항등 장기 전달, PSD, 일주기 맥락, 위상/코히어런스, 측정 출처.",
        use: "종점 결합과 사전 지정 매핑이 함께 존재할 때만 장기 종점 보정에 적격.",
        tone: "confirmed",
      },
    ],
  },
  fi: {
    title: "BERM v17: mittaustila",
    lead:
      "V2-reitti pitää fysikaalisen kenttätilan, elinkohtaisen siirron, biologisen kapasiteetin ja demografian erillisinä. Se ei muunna teknologian käyttöönottoa tai mobiililiittymiä paikalliseksi annokseksi, biologiseksi päätepisteeksi tai TFR-kertoimeksi.",
    layersTitle: "Neljä havaittavaa kerrosta",
    statusTitle: "Syötteen täydellisyys ilmoitetaan eksplisiittisesti",
    useLabel: "Sallittu käyttö",
    readinessNote:
      "Mittausvalmis tarkoittaa, että kaikki nimetyt fysikaaliset syötteet on dokumentoitu. Se ei tarkoita, että biologinen vaikutus, kausaaliarvio tai tuloskerroin olisi osoitettu.",
    evidenceNote: `${FIELDSTATE_EVIDENCE_COUNT} rajattua tutkimus–solmu-tietuetta tukee reitin osia. Jokainen on rakenteellista tai kontekstuaalista evidenssiä, ei suora TFR-kulmakerroin.`,
    identityTitle: "ASFR ensin; TFR on johdettu identiteetti",
    identityDescription:
      "Reitti projisoi ensin ikäkohtaiset hedelmällisyysluvut ja summaa ne vasta sitten. Kysyntä/mahdollisuus, tempo ja ART-syntymätoimitus säilyvät erillisinä syötteinä eivätkä piiloudu biologisiksi termeiksi.",
    identityNote:
      "Kerroin 5 kuvaa viisivuotisikäryhmiä (15–19 … 45–49); yhtälö ei tunnista TFR-muutoksen syytä.",
    cohortTitle: "Nykyinen kohorttisignaali: vain ajoitusproxy",
    cohortResult: "UN WPP 2024 ASFR + World Bank/ITU:n mobiililiittymät, 2000–2023: N = 163; r = -0.66645.",
    cohortDescription:
      "Tulos on ekologinen, kuvaileva ikäkohortin ajoitusproxyn tulos. Mobiililiittymät eivät ole fyysinen FieldState, elinannos tai kausaalinen altistusarvio; tulos ei ole TFR-kerroin.",
    cohortSource: "Lähteet: UN World Population Prospects 2024 ASFR; World Bank/ITU:n mobiililiittymät.",
    layers: [
      {
        index: "01",
        title: "FieldState ja Lindgren-valinta",
        description:
          "Säilytä normalisoidut tausta-, ambient- ja henkilökohtaiset vektorit erillään sekä B0, vaihe/koherenssi ja verhokäyrän tai beat-signaalin PSD; niitä ei tiivistetä yhdeksi kansalliseksi skalaariksi.",
      },
      {
        index: "02",
        title: "Elinkohtainen siirto ja muisti",
        description:
          "Eksplisiittinen elinkohtainen siirto Tₒ, reseptoritila ja vuorokausikonteksti syöttävät elinkohtaisia palautuvia (R) ja persistenttejä (P) tiloja. Incrementit vaativat rekisteröidyn evidenssin ja parametri-ID:n.",
      },
      {
        index: "03",
        title: "Reproduktiivinen kapasiteetti ja pari",
        description:
          "Mies-, nais-, este- ja implantaatio-osat pysyvät erillään ennen niiden yhdistämistä parin hedelmöitys-/syntymäkapasiteetiksi. Kansallista keskiarvoa ei käsitellä hiljaisesti paritilana.",
      },
      {
        index: "04",
        title: "Ikäkohtainen hedelmällisyys ja demografiset termit",
        description:
          "Biologinen suhde, kysyntä/mahdollisuus, tempo sekä ART-syntymätoimitussuhteet raportoidaan ikäryhmittäin ennen kuin TFR johdetaan.",
      },
    ],
    statuses: [
      {
        id: "TECHNOLOGY_TIMING_PROXY",
        title: "Teknologian ajoitusproxy",
        description:
          "Kansallinen teknologiasarja voi kuvata digitaalisen ympäristön leviämisen ajoitusta. Se on eri asia kuin paikallisesti mitattu FieldState ja elinkohtainen siirto.",
        use: "Vain kuvailevaan ajoitus- ja kohorttisignaalin analyysiin; ei paikalliseksi annokseksi eikä päätepistekalibrointiin.",
        tone: "pending",
      },
      {
        id: "PARTIAL_FIELD_STATE",
        title: "Osittainen FieldState",
        description:
          "Osa fysikaalisista komponenteista on mitattu, mutta yksi tai useampi vaadittu syöte puuttuu: normalisointikalibrointi, B0-vektori, elinkohtainen siirto, verhokäyrä-/beat-PSD, vuorokausikonteksti, vaihe/koherenssi tai provenienssi.",
        use: "Diagnostiseen data-aukkoraportointiin ja protokollan kehittämiseen; ei päätepistekalibrointiin.",
        tone: "partial",
      },
      {
        id: "MEASUREMENT_READY_FIELD_STATE",
        title: "Mittausvalmis FieldState",
        description:
          "Kaikki nimetyt fysikaaliset syötteet on dokumentoitu: kalibrointi, mitattu B0-vektori, ei-identtinen elinkohtainen siirto, PSD, vuorokausikonteksti, vaihe/koherenssi ja mittausprovenienssi.",
        use: "Sopii elinpäätepisteen kalibrointiin vain, kun mukana ovat myös päätepisteliitos ja ennalta määritelty vastaavuuskuvaus.",
        tone: "confirmed",
      },
    ],
  },
};

function statusClasses(tone: StatusDefinition["tone"]) {
  switch (tone) {
    case "partial":
      return "border-status-partial";
    case "confirmed":
      return "border-status-confirmed";
    default:
      return "border-status-pending";
  }
}

/**
 * A static, locale-aware status card for the BERM v17 input
 * contract. It intentionally displays no numerical FieldState → TFR result.
 */
export function FieldStateStatus({ locale }: { locale: string }) {
  const d = pickCopy(COPY, locale);

  return (
    <section className="mb-12 border-y border-card-border py-7 sm:py-9">
      <header className="max-w-4xl">
        <p className="editorial-kicker text-accent">BERM v17</p>
        <h2 className="editorial-section-heading mt-2">{d.title}</h2>
        <p className="editorial-deck mt-3">{d.lead}</p>
      </header>

      <section className="mt-8 border-t border-card-border pt-5" aria-labelledby="fieldstate-layers-title">
        <h3 id="fieldstate-layers-title" className="editorial-kicker text-foreground">{d.layersTitle}</h3>
        <ol className="mt-4 grid gap-x-7 gap-y-5 lg:grid-cols-2">
          {d.layers.map((layer) => (
            <li key={layer.index} className="border-t border-card-border pt-4">
              <div className="flex gap-4">
                <span className="font-mono-num text-xs text-accent">{layer.index}</span>
                <div>
                  <h4 className="text-sm font-medium">{layer.title}</h4>
                  <p className="mt-1 text-sm leading-relaxed text-foreground-muted">{layer.description}</p>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-9 border-t border-card-border pt-5" aria-labelledby="fieldstate-completeness-title">
        <h3 id="fieldstate-completeness-title" className="editorial-kicker text-foreground">{d.statusTitle}</h3>
        <div className="mt-4 grid gap-x-7 gap-y-6 lg:grid-cols-3">
          {d.statuses.map((status) => (
            <article key={status.id} className={`border-l-2 pl-4 ${statusClasses(status.tone)}`}>
              <h4 className="text-sm font-semibold text-foreground">{status.title}</h4>
              <p className="mt-2 text-sm leading-relaxed text-foreground-muted">{status.description}</p>
              <div className="mt-4 border-t border-card-border pt-3 text-xs leading-relaxed text-foreground-muted">
                <span className="font-medium text-foreground">{d.useLabel}: </span>{status.use}
              </div>
            </article>
          ))}
        </div>
        <div className="editorial-rail mt-6 max-w-4xl text-xs leading-relaxed text-foreground-muted">
          <p>{d.readinessNote}</p>
          <p className="mt-2">{d.evidenceNote}</p>
        </div>
      </section>

      <section className="mt-9 grid gap-7 border-t border-card-border pt-5 lg:grid-cols-[1.1fr_0.9fr] lg:divide-x lg:divide-card-border">
        <article className="lg:pr-7">
          <h3 className="font-serif text-[1.1rem] font-semibold leading-snug tracking-[-0.014em]">{d.identityTitle}</h3>
          <p className="mt-2 text-sm leading-relaxed text-foreground-muted">{d.identityDescription}</p>
          <p className="mt-4 overflow-x-auto border-y border-card-border px-3 py-3 font-mono-num text-sm text-foreground">
            TFR₍c,t₎ = (5 / 1000) × Σ₍g=15–19…45–49₎ ASFR₍c,g,t₎
          </p>
          <p className="mt-2 text-xs leading-relaxed text-foreground-muted">{d.identityNote}</p>
        </article>

        <article className="border-l-2 border-status-partial pl-4 lg:pl-7">
          <h3 className="font-serif text-[1.1rem] font-semibold leading-snug tracking-[-0.014em]">{d.cohortTitle}</h3>
          <p className="mt-3 font-mono-num text-sm font-semibold text-foreground">{d.cohortResult}</p>
          <p className="mt-2 text-sm leading-relaxed text-foreground-muted">{d.cohortDescription}</p>
          <p className="mt-3 text-xs leading-relaxed text-foreground-muted">{d.cohortSource}</p>
        </article>
      </section>
    </section>
  );
}
