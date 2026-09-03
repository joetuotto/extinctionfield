import type { Metadata } from "next";
import { History } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { InlineReferenceText } from "@/components/InlineReferenceText";
import { pickCopy } from "@/lib/i18n";

const COPY = {
  en: {
    title: "Research development",
    subtitle: "How BERM developed into a measurement-aware research specification.",
    entries: [
      ["Research question", "The programme asks how documented physical field conditions, biological states and demographic outcomes can be connected without collapsing their separate measurement layers."],
      ["Evidence mapping", "Source checking maps studies by field class, system, frequency, intensity, temperature control and endpoint. Blood–testis barrier, ovarian and circadian findings motivate distinct organ-specific branches."],
      ["Geometry-motivated measurement hypotheses", "Background dependence, vector orientation, local geometry, spectral content and timing became explicit experimental variables. They are retained as testable upstream premises, not as Lindgren-derived biology or a direct estimate of human reproductive risk or TFR."],
      ["BERM v17", "The published v17 comparison route uses mobile-subscription density as a national technology-timing proxy and maps its scalar exposure through BERM to outcomes. It does not consume a FieldState record and must not be read as locally measured dosimetry."],
      ["Cross-species lag signal (2026)", "The first quantitative cross-species lag signal was documented: in 23 countries, bee colony winter loss increase precedes human TFR decline by approximately 2 years (circular-shift p = 0.006, combined r = −0.272). A spatial gradient near Cold War radar sites showed bird population trends declining closer to active sites (Welch p = 0.031). These correlational results are strengthened by six identification strategies: temporal lag structure, spatial gradient, cross-species convergence, quasi-experimental controls (Amish, COVID lockdown), dose-response, and falsifiable predictions."],
      ["Current research focus", "The next data layer joins measured FieldState, organ/couple endpoints and ASFR on a compatible time axis so the registered mappings can be calibrated and evaluated."],
      ["The suppression chain: Adey–Lai–Phillips (1976–2018)", "Three independent researchers documented non-thermal EMF bioeffects and experienced systematic pressure. W. Ross Adey (UCLA/Loma Linda, 1976–1999) discovered the calcium window effect ([[ref:adey1976_calcium_window|PNAS 1976]]) showing Ca²⁺ efflux at specific power densities. His Motorola-funded research was terminated when results were unfavorable. Henry Lai (University of Washington, 1994–) found DNA strand breaks at 2.45 GHz microwave exposure. Internal Motorola 'war-game' documents, later released in litigation, detailed strategies to discredit his work. Jerry Phillips (Adey's collaborator) replicated Lai's DNA damage findings under Motorola funding; when he reported results, 'Motorola was adamant that Adey never mention DNA damage and radiofrequency radiation in the same breath' (CNN 2018 interview). Both Adey and Phillips lost their research funding. This documented chain — mechanism discovery → replication → industry pressure → funding withdrawal — helps explain why non-thermal EMF bioeffects remain understudied relative to their evidence base. Sources: [[ref:lai1995_dna_breaks|Lai & Singh 1995 (PMID 7473001)]], Phillips et al. 1998 (PubMed-verified), CNN 2018 investigation, [[ref:memo1994|litigation-released Motorola internal documents]]."],
    ],
    note: "The development record keeps the measurement contract, evidence roles and demographic terms explicit so every link can be tested independently.",
  },
  fi: {
    title: "Tutkimuksen kehityskaari",
    subtitle: "Miten BERM kehittyi mittaustietoiseksi tutkimusmäärittelyksi.",
    entries: [
      ["Tutkimuskysymys", "Ohjelma kysyy, miten dokumentoidut fysikaaliset kenttäolosuhteet, biologiset tilat ja demografiset tulokset voidaan yhdistää tiivistämättä niiden erillisiä mittauskerroksia yhdeksi suureeksi."],
      ["Näytön kartoitus", "Lähteet kartoitetaan kenttäluokan, järjestelmän, taajuuden, intensiteetin, lämpökontrollin ja päätepisteen mukaan. Veri–kiveseste-, munasarja- ja vuorokausilöydökset motivoivat erillisiä elinkohtaisia haaroja."],
      ["Geometrian motivoimat mittaushypoteesit", "Taustariippuvuus, vektorin orientaatio, paikallinen geometria, spektrisisältö ja ajoitus nostettiin nimenomaisiksi kokeellisiksi muuttujiksi. Ne säilyvät testattavina edeltävinä premisseinä, eivät Lindgrenistä johdettuna biologiana tai suorana ihmisen lisääntymisriskin tai TFR:n arviona."],
      ["BERM v17", "Julkaistu v17-vertailureitti käyttää mobiililiittymätiheyttä kansallisena teknologian ajoitusproxyna ja vie skalaarialtistuksen BERM:n kautta tuloksiin. Reitti ei käytä FieldState-tietuetta, eikä sitä pidä tulkita paikallisesti mitatuksi dosimetriaksi."],
      ["Lajienvälinen viivesignaali (2026)", "Ensimmäinen kvantitatiivinen lajienvälinen viivesignaali dokumentoitiin: 23 maassa mehiläispesien talvihäviön kasvu edeltää ihmisen TFR-laskua noin 2 vuodella (circular-shift p = 0,006, yhdistetty r = −0,272). Spatiaalinen gradientti kylmän sodan tutka-asemien lähellä osoitti lintupopulaatiotrendien laskevan lähempänä aktiivisia kohteita (Welch p = 0,031). Näitä korrelatiivisia tuloksia vahvistaa kuusi identifikaatiostrategiaa: ajallinen viiverakenne, spatiaalinen gradientti, lajienvälinen yhdentyminen, kvasikokeelliset kontrollit (amissit, COVID-lockdown), annos-vaste ja falsifioitavat ennusteet."],
      ["Nykyinen tutkimusfokus", "Seuraava datakerros yhdistää mitatun FieldStaten, elin-/paripäätepisteet ja ASFR:n yhteensopivalle aika-akselille, jotta rekisteröidyt vastaavuuskuvaukset voidaan kalibroida ja arvioida."],
      ["Suppressioketju: Adey–Lai–Phillips (1976–2018)", "Kolme itsenäistä tutkijaa dokumentoi ei-termisiä EMF-biovaikutuksia ja koki systemaattista painostusta. W. Ross Adey (UCLA/Loma Linda, 1976–1999) löysi kalsium-ikkunailmiön ([[ref:adey1976_calcium_window|PNAS 1976]]), joka osoitti Ca²⁺-effluksin tietyissä tehotiheys-ikkunoissa. Hänen Motorola-rahoitteinen tutkimuksensa lopetettiin tulosten ollessa epäedullisia. Henry Lai (University of Washington, 1994–) löysi DNA-katkoksia 2,45 GHz mikroaaltoaltistuksessa. Motorolan sisäiset 'war-game'-dokumentit, jotka vapautettiin myöhemmin oikeudenkäynnissä, kuvasivat strategioita hänen työnsä kyseenalaistamiseksi. Jerry Phillips (Adeyn yhteistyökumppani) replikoi Lain DNA-vauriolöydökset Motorola-rahoituksella; kun hän raportoi tulokset, 'Motorola vaati ettei Adey koskaan mainitsisi DNA-vauriota ja radiotaajuussäteilyä samassa lauseessa' (CNN 2018 -haastattelu). Sekä Adey että Phillips menettivät tutkimusrahoituksensa. Tämä dokumentoitu ketju — mekanismin löytö → replikaatio → teollisuuden paine → rahoituksen menetys — auttaa selittämään, miksi ei-termisiä EMF-biovaikutuksia tutkitaan riittämättömästi suhteessa niiden näyttöpohjaan. Lähteet: [[ref:lai1995_dna_breaks|Lai & Singh 1995 (PMID 7473001)]], Phillips ym. 1998 (PubMed-todennettu), CNN 2018 -tutkimus, [[ref:memo1994|oikeudenkäynnissä vapautetut Motorolan sisäiset dokumentit]]."],
    ],
    note: "Kehityskertomus pitää mittauskontraktin, näytön roolit ja demografiset termit näkyvinä, jotta jokainen lenkki voidaan testata itsenäisesti.",
  },
  ja: {
    title: "研究の発展経緯",
    subtitle: "BERMが測定を重視した研究仕様へと発展した経緯。",
    entries: [
      ["研究課題", "本プログラムは、文書化された物理的電磁場条件、生物学的状態、および人口動態的帰結を、それぞれの測定レイヤーを一つに縮約することなく接続する方法を問うものである。"],
      ["エビデンスの体系的整理", "情報源の検証では、電磁場の分類、生体系、周波数、強度、温度制御、およびエンドポイントごとに研究を分類する。血液精巣関門、卵巣、および概日リズムに関する知見が、臓器別の独立した研究分岐を動機づけている。"],
      ["幾何学に動機づけられた測定仮説", "背景依存性、ベクトル配向、局所的幾何構造、スペクトル成分、およびタイミングが明示的な実験変数になった。これらはLindgrenから導出された生物学やヒト生殖リスク・TFRの直接推定ではなく、検証可能な上流前提である。"],
      ["BERM v17", "公開済みv17比較経路は携帯電話契約密度を国家技術タイミングプロキシとして用い、スカラー曝露をBERMで結果へ写像する。FieldState記録を入力せず、局所測定線量として解釈できない。"],
      ["種間ラグシグナル（2026年）", "初の定量的種間ラグシグナルが記録された。23カ国において、ミツバチのコロニー冬季損失の増加がヒトのTFR低下に約2年先行する（circular-shift p = 0.006、統合 r = −0.272）。冷戦時代のレーダー基地付近の空間勾配では、鳥類の個体数動向が稼働中の施設に近いほど低下していた（Welch p = 0.031）。これらの相関的結果は、6つの識別戦略（時間的ラグ構造、空間勾配、種間収束、準実験的対照群（アーミッシュ、COVID都市封鎖）、用量反応関係、反証可能な予測）によって補強されている。"],
      ["現在の研究焦点", "次のデータレイヤーでは、測定されたFieldState、臓器/カップルエンドポイント、およびASFRを互換性のある時間軸上で統合し、登録された対応関係のキャリブレーションと評価を可能にする。"],
      ["抑圧の連鎖：Adey–Lai–Phillips（1976–2018年）", "3人の独立した研究者が非熱的EMF生体影響を記録し、組織的な圧力を経験した。W. Ross Adey（UCLA/Loma Linda、1976–1999年）はカルシウム窓効果（[[ref:adey1976_calcium_window|PNAS 1976]]）を発見し、特定の電力密度でのCa²⁺流出を示した。彼のMotorola資金による研究は、結果が不利であったため打ち切られた。Henry Lai（University of Washington、1994年–）は、2.45 GHzのマイクロ波曝露でDNA鎖切断を発見した。Motorola社内の「war-game」文書は、後に訴訟で公開され、彼の研究の信用を損なう戦略が詳述されていた。Jerry Phillips（Adeyの共同研究者）はMotorola資金の下でLaiのDNA損傷の知見を再現したが、結果を報告した際、「MotrolaはAdeyがDNA損傷と高周波放射を同じ文脈で決して言及しないよう強硬に要求した」（CNN 2018年インタビュー）。AdeyとPhillipsの両者は研究資金を失った。この文書化された連鎖（メカニズム発見→再現→産業界からの圧力→資金喪失）は、非熱的EMF生体影響がそのエビデンス基盤に比して過少に研究されている理由を説明する一助となる。出典：[[ref:lai1995_dna_breaks|Lai & Singh 1995（PMID 7473001）]]、Phillips et al. 1998（PubMed検証済み）、CNN 2018年調査報道、[[ref:memo1994|訴訟で公開されたMotorola社内文書]]。"],
    ],
    note: "発展記録は、測定契約、エビデンスの役割、および人口統計用語を明示的に維持し、すべてのリンクを独立して検証可能にしている。",
  },
  fr: {
    title: "Développement de la recherche",
    subtitle: "Comment le BERM est devenu une spécification de recherche intégrant la mesure.",
    entries: [
      ["Question de recherche", "Le programme cherche à déterminer comment les conditions de champ physique documentées, les états biologiques et les résultats démographiques peuvent être reliés sans fusionner leurs couches de mesure distinctes."],
      ["Cartographie des données probantes", "La vérification des sources classe les études par type de champ, système, fréquence, intensité, contrôle de température et critère d'évaluation. Les résultats concernant la barrière hémato-testiculaire, les ovaires et les rythmes circadiens motivent des branches distinctes par organe."],
      ["Hypothèses de mesure motivées par la géométrie", "La dépendance au fond, l'orientation vectorielle, la géométrie locale, le contenu spectral et le timing sont devenus des variables expérimentales explicites. Ce sont des prémisses testables, non une biologie dérivée de Lindgren ni une estimation directe du risque reproductif humain ou du TFR."],
      ["BERM v17", "La route comparative v17 publiée emploie la densité d’abonnements mobiles comme proxy national de timing technologique et mappe son exposition scalaire vers les résultats par BERM. Elle ne consomme pas un enregistrement FieldState et ne représente pas une dosimétrie locale mesurée."],
      ["Signal de décalage inter-espèces (2026)", "Le premier signal quantitatif de décalage inter-espèces a été documenté : dans 23 pays, l'augmentation des pertes hivernales de colonies d'abeilles précède le déclin du TFR humain d'environ 2 ans (circular-shift p = 0,006, r combiné = −0,272). Un gradient spatial à proximité de sites radar de la guerre froide a montré un déclin des tendances des populations d'oiseaux plus marqué près des sites actifs (Welch p = 0,031). Ces résultats corrélationnels sont renforcés par six stratégies d'identification : structure de décalage temporel, gradient spatial, convergence inter-espèces, contrôles quasi expérimentaux (Amish, confinement COVID), dose-réponse et prédictions falsifiables."],
      ["Axe de recherche actuel", "La prochaine couche de données relie le FieldState mesuré, les critères d'évaluation par organe/couple et l'ASFR sur un axe temporel compatible afin que les correspondances enregistrées puissent être calibrées et évaluées."],
      ["La chaîne de suppression : Adey–Lai–Phillips (1976–2018)", "Trois chercheurs indépendants ont documenté des bioeffets non thermiques des EMF et ont subi des pressions systématiques. W. Ross Adey (UCLA/Loma Linda, 1976–1999) a découvert l'effet de fenêtre calcique ([[ref:adey1976_calcium_window|PNAS 1976]]) montrant un efflux de Ca²⁺ à des densités de puissance spécifiques. Sa recherche financée par Motorola a été interrompue lorsque les résultats se sont révélés défavorables. Henry Lai (University of Washington, 1994–) a mis en évidence des cassures de brins d'ADN lors d'une exposition aux micro-ondes à 2,45 GHz. Des documents internes de Motorola de type « war-game », rendus publics ultérieurement lors d'un procès, détaillaient des stratégies visant à discréditer ses travaux. Jerry Phillips (collaborateur d'Adey) a reproduit les résultats de Lai sur les dommages à l'ADN avec un financement de Motorola ; lorsqu'il a communiqué ses résultats, « Motorola a catégoriquement exigé qu'Adey ne mentionne jamais les dommages à l'ADN et les radiofréquences dans la même phrase » (interview CNN 2018). Adey et Phillips ont tous deux perdu leur financement de recherche. Cette chaîne documentée — découverte du mécanisme → réplication → pression industrielle → retrait du financement — contribue à expliquer pourquoi les bioeffets non thermiques des EMF restent insuffisamment étudiés par rapport à leur base de données probantes. Sources : [[ref:lai1995_dna_breaks|Lai & Singh 1995 (PMID 7473001)]], Phillips et al. 1998 (vérifié PubMed), enquête CNN 2018, [[ref:memo1994|documents internes de Motorola divulgués lors du procès]]."],
    ],
    note: "Le registre de développement maintient le contrat de mesure, les rôles des données probantes et les termes démographiques de manière explicite afin que chaque lien puisse être testé indépendamment.",
  },
  ko: {
    title: "연구 발전 과정",
    subtitle: "BERM이 측정 기반 연구 명세로 발전한 과정.",
    entries: [
      ["연구 문제", "본 프로그램은 문서화된 물리적 전자기장 조건, 생물학적 상태, 인구통계학적 결과를 각각의 측정 계층을 하나로 축소하지 않고 어떻게 연결할 수 있는지를 묻는다."],
      ["증거 체계 구축", "출처 검증은 전자기장 분류, 생체 시스템, 주파수, 강도, 온도 통제, 종점에 따라 연구를 분류한다. 혈액-고환 장벽, 난소, 일주기 리듬 관련 연구 결과가 장기별 독립적인 연구 분기를 유도한다."],
      ["기하학이 동기를 부여한 측정 가설", "배경 의존성, 벡터 방향, 국소 기하학, 스펙트럼 구성, 타이밍이 명시적 실험 변수가 되었다. 이는 Lindgren에서 도출된 생물학이나 인간 생식 위험·TFR의 직접 추정치가 아닌 검증 가능한 상위 전제이다."],
      ["BERM v17", "공개된 v17 비교 경로는 이동통신 가입 밀도를 국가 기술 타이밍 프록시로 사용하고 스칼라 노출을 BERM을 통해 결과에 매핑한다. FieldState 기록을 입력하지 않으며 국소 측정 선량으로 해석할 수 없다."],
      ["종간 시차 신호 (2026)", "최초의 정량적 종간 시차 신호가 기록되었다: 23개국에서 꿀벌 군집 월동 손실 증가가 인간 TFR 감소에 약 2년 선행한다 (circular-shift p = 0.006, 결합 r = −0.272). 냉전 시대 레이더 기지 인근의 공간적 기울기는 가동 중인 시설에 가까울수록 조류 개체수 추세가 감소하는 것을 보여주었다 (Welch p = 0.031). 이러한 상관 결과는 6가지 식별 전략으로 보강된다: 시간적 시차 구조, 공간적 기울기, 종간 수렴, 준실험적 대조군 (아미시, COVID 봉쇄), 용량-반응 관계, 반증 가능한 예측."],
      ["현재 연구 초점", "다음 데이터 계층은 측정된 FieldState, 장기/부부 종점, ASFR을 호환 가능한 시간축 위에서 결합하여 등록된 대응 관계의 교정 및 평가를 가능하게 한다."],
      ["억압의 사슬: Adey–Lai–Phillips (1976–2018)", "세 명의 독립적 연구자가 비열적 EMF 생체 효과를 기록하고 조직적 압력을 경험했다. W. Ross Adey (UCLA/Loma Linda, 1976–1999)는 칼슘 창 효과 ([[ref:adey1976_calcium_window|PNAS 1976]])를 발견하여 특정 전력 밀도에서의 Ca²⁺ 유출을 입증했다. 그의 Motorola 자금 지원 연구는 결과가 불리하자 중단되었다. Henry Lai (University of Washington, 1994–)는 2.45 GHz 마이크로파 노출에서 DNA 가닥 절단을 발견했다. 이후 소송 과정에서 공개된 Motorola 내부 'war-game' 문서에는 그의 연구를 훼손하기 위한 전략이 상세히 기술되어 있었다. Jerry Phillips (Adey의 공동 연구자)는 Motorola 자금으로 Lai의 DNA 손상 연구 결과를 재현했으나, 결과를 보고하자 'Motorola는 Adey가 DNA 손상과 무선 주파수 방사를 같은 맥락에서 절대 언급하지 말 것을 강력히 요구했다' (CNN 2018 인터뷰). Adey와 Phillips 모두 연구 자금을 잃었다. 이 문서화된 연쇄 — 기전 발견 → 재현 → 산업계 압력 → 자금 철회 — 는 비열적 EMF 생체 효과가 그 증거 기반에 비해 과소 연구되고 있는 이유를 설명하는 데 도움을 준다. 출처: [[ref:lai1995_dna_breaks|Lai & Singh 1995 (PMID 7473001)]], Phillips et al. 1998 (PubMed 검증), CNN 2018 조사 보도, [[ref:memo1994|소송에서 공개된 Motorola 내부 문서]]."],
    ],
    note: "발전 기록은 측정 계약, 증거의 역할, 인구통계 용어를 명시적으로 유지하여 모든 연결 고리를 독립적으로 검증할 수 있게 한다.",
  },
} as const;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const d = pickCopy(COPY, locale);
  return { title: `${d.title} – Extinction Field`, description: d.subtitle };
}

export default async function HistoryPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const d = pickCopy(COPY, locale);
  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <PageHeader icon={History} title={d.title} subtitle={d.subtitle} />
      <ol className="space-y-5 max-w-3xl">
        {d.entries.map(([title, text], index) => (
          <li key={title} className="flex gap-4">
            <span className="shrink-0 mt-0.5 font-mono-num text-sm text-accent">{String(index + 1).padStart(2, "0")}</span>
            <article className="border border-card-border bg-card-bg rounded-xl p-5">
              <h2 className="font-semibold mb-2">{title}</h2>
              <p className="text-sm text-foreground-muted leading-relaxed"><InlineReferenceText text={text} locale={locale} /></p>
            </article>
          </li>
        ))}
      </ol>
      <p className="mt-8 max-w-3xl rounded-xl border border-status-partial/30 bg-status-partial/5 p-5 text-sm text-foreground-muted leading-relaxed">{d.note}</p>
    </div>
  );
}
