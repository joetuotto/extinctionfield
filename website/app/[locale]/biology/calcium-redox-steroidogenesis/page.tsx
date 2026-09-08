import type { Metadata } from "next";
import Link from "next/link";
import { Activity, ArrowRight } from "lucide-react";
import { ClaimRef } from "@/components/ClaimRef";
import { InlineReferenceText } from "@/components/InlineReferenceText";
import { MathBlock } from "@/components/MathBlock";
import { ModelReadingPath } from "@/components/ModelReadingPath";
import { PageHeader } from "@/components/PageHeader";
import { TranslationNotice } from "@/components/TranslationNotice";
import { SteroidogenesisEvidenceExplorer } from "@/components/SteroidogenesisEvidenceExplorer";
import { SteroidogenesisTranslationNotice } from "@/components/SteroidogenesisTranslationNotice";
import { StudyCitation } from "@/components/StudyCitation";
import { STEROIDOGENESIS, steroidogenesisText as tx } from "@/lib/steroidogenesis";
import { pickCopy } from "@/lib/i18n";

const COPY = {
  en: {
    geneticsTitle: "Genes locate the calcium stores, reserve and cholesterol gate",
    genetics: "RYR2-related CPVT combines patient insulin/glucose measurements with mutant-mouse experiments linking ER calcium leak to reduced stimulated mitochondrial calcium uptake, ATP and insulin secretion. Darier disease links SERCA2 dysfunction to glutathione reserve and stress adaptation. Human STAR mutations locate mitochondrial cholesterol transport as a requirement for adrenal and gonadal steroidogenesis. BERM connects these systems through the named intermediates: store content, stimulated calcium, energy, reserve and substrate transport. The disease interventions retain their biological scope. [[ref:santulli2015_ryr2|Santulli 2015]]; [[ref:harmon2026_darier|Harmon 2026]]; [[ref:lin1995_star|Lin 1995]].",
    title: "Calcium, redox and hormone production",
    subtitle: "Field experiments, genetic interventions and human tissue converge on the machinery that supplies cholesterol and produces steroid hormones.",
    lead: "The same cell has to receive a signal, preserve a usable reserve and move cholesterol into steroid production. Calcium, redox chemistry, the local clock and autophagy participate in this shared work. Their measured connections give BERM a concrete route from tissue state to local hormone capacity.",
    back: "Biology overview",
    fieldClaim: "Named field protocols have measured calcium-related, redox or steroidogenic responses. Each finding retains its waveform, experimental system, intervention and endpoint.",
    componentClaim: "Genetic, pharmacological and substrate-bypass experiments locate causal dependencies in the same biological machinery. BERM connects those dependencies through shared measured intermediates.",
    premiseTitle: "Where the physical premise enters",
    premise: "Under [[ref:lindgren2025|Lindgren’s 2025]] metric ansatz and BERM’s declared scale κ, splitting the potential into background A₀ and perturbation a gives the tensor expression below. BERM’s conditional receiving operator Ξ connects this geometry to a named biological input in tissue state S. The downstream studies constrain the biological transitions; tissue coupling, physical scale and human response calibration retain their separate roles.",
    derivationLink: "Follow the physical derivation",
    reserveTitle: "A reserve can change before present output does",
    reserve: "Miao measured reduced glutathione pools in TM3 Leydig cells under continuous RF exposure. Chen reduced glutathione experimentally in MA-10 cells: LH-stimulated progesterone production was preserved before an additional oxidative challenge revealed lower steroidogenic capacity. These separate systems meet at a measured reserve variable. [[ref:miao2025_rf_metabolomics|Miao 2025]]; [[ref:chen2010_glutathione|Chen 2010]].",
    reserveMeasure: "The free glutathione-equivalent pool is Gₜ = [GSH] + 2[GSSG]. Oxidation from GSH to GSSG alone preserves that pool. Absolute pool size, the GSH/GSSG ratio, current ROS and accumulated damage therefore remain distinct measurements. A single concentration does not measure synthesis flow.",
    reserveImplication: "BERM’s reserve-masking synthesis asks whether measured reserve changes alter a later challenge response while the usual output marker remains similar. It specifies the reserve and the challenge, so a normal hormone result alone does not establish hidden impairment.",
    reserveLink: "Follow the reserve and proxy connection",
    outputTitle: "From local production to the whole organism",
    output: "Autophagy interventions link cellular maintenance to cholesterol supply and sex-steroid production, including in human ovary and testis tissue. A testosterone trial in older men with low testosterone and low desire then anchors a hormone-to-behaviour connection through sexual activity and desire. [[ref:gao2018_autophagy|Gao 2018]]; [[ref:esmaeilian2023_autophagy|Esmaeilian 2023]]; [[ref:cunningham2016_testosterone_sexual_function|Cunningham 2016]].",
    outputScope: "The composed route continues through hormone availability, tissue response, motivation, opportunities and reproductive function. Direct effects on germ cells remain a parallel branch. Each shared production defect is carried forward once, with age, tissue and study conditions attached to its evidence.",
    stagesClaim: "The synthesis first fixes the structure, then the conditions governing response direction, and finally study-specific values. Existing protocols and measurements constrain each stage; quantitative transfer between tissues and into population outcomes requires its own evidence.",
    dataTitle: "Existing data for these biological stages",
    dataLead: "The available resources localise cell states and molecular responses. A genetic or observational dataset retains that study design when it is connected to a field experiment.",
    next: "Continue through the model",
    links: ["Receptor state and timing", "Testosterone evidence", "Intervention studies", "Reserve and proxy masking", "From biology to behaviour"],
  },
  fi: {
    geneticsTitle: "Geenit paikantavat kalsiumvaraston, varannon ja kolesteroliportin",
    genetics: "RYR2:een liittyvä CPVT-tutkimus yhdistää potilaiden insuliini- ja glukoosimittaukset mutanttihiirikokeisiin, joissa ER-kalsiumvuoto liittyi heikentyneeseen stimuloituun mitokondriokalsiumin ottoon, ATP:hen ja insuliinieritykseen. Darierin tauti yhdistää SERCA2-häiriön glutationivarannon ja stressiin sopeutumisen muutoksiin. Ihmisen STAR-mutaatiot paikantavat mitokondrion kolesterolikuljetuksen lisämunuaisen ja gonadien steroidogeneesin edellytykseksi. BERM yhdistää järjestelmät nimetyillä välivaiheilla: varastosisältö, stimuloitu kalsium, energia, varanto ja substraattikuljetus. Sairausinterventiot säilyttävät oman biologisen koealansa. [[ref:santulli2015_ryr2|Santulli 2015]]; [[ref:harmon2026_darier|Harmon 2026]]; [[ref:lin1995_star|Lin 1995]].",
    title: "Kalsium, redox ja hormonituotanto",
    subtitle: "Kenttäkokeet, geeni-interventiot ja ihmiskudosnäyttö yhtyvät koneistoon, joka huolehtii kolesterolista ja tuottaa steroidihormoneja.",
    lead: "Saman solun on vastaanotettava signaali, säilytettävä käyttökelpoinen varanto ja siirrettävä kolesteroli steroidituotantoon. Kalsium, redox-kemia, paikallinen kello ja autofagia osallistuvat tähän yhteiseen toimintaan. Niiden mitatut yhteydet antavat BERM:lle konkreettisen reitin kudostilasta paikalliseen hormonikapasiteettiin.",
    back: "Biologian yleiskatsaus",
    fieldClaim: "Nimetyissä kenttäprotokollissa on mitattu kalsiumiin liittyviä, redox- tai steroidogeenisiä vasteita. Jokainen löydös säilyttää aaltomuotonsa, koejärjestelmänsä, interventionsa ja päätepisteensä.",
    componentClaim: "Geeni-, lääke- ja substraattiohituskokeet paikantavat saman biologisen koneiston kausaalisia riippuvuuksia. BERM yhdistää niitä yhteisten mitattujen välivaiheiden kautta.",
    premiseTitle: "Mistä fysikaalinen premissi tulee ketjuun",
    premise: "[[ref:lindgren2025|Lindgrenin vuoden 2025]] metriikka-ansatzilla ja BERM:n nimetyllä skaalalla κ potentiaalin jakaminen taustaan A₀ ja häiriöön a tuottaa alla olevan tensorimuodon. BERM:n ehdollinen vastaanotto-operaattori Ξ yhdistää geometrian nimettyyn biologiseen syötteeseen kudostilassa S. Myöhempien vaiheiden tutkimukset rajaavat biologisia siirtymiä; kudoskytkentä, fysikaalinen mittakaava ja ihmisen vastekalibrointi säilyttävät omat tehtävänsä.",
    derivationLink: "Seuraa fysikaalista johtoa",
    reserveTitle: "Varanto voi muuttua ennen senhetkistä tuotantoa",
    reserve: "Miao mittasi pienentyneitä glutationipooleja TM3-Leydig-soluissa jatkuvassa RF-altistuksessa. Chen vähensi glutationia kokeellisesti MA-10-soluissa: LH-stimuloitu progesteronituotanto säilyi ennen kuin lisäoksidanttihaaste paljasti heikentyneen steroidogeenisen kapasiteetin. Erilliset solujärjestelmät kohtaavat mitatussa varantomuuttujassa. [[ref:miao2025_rf_metabolomics|Miao 2025]]; [[ref:chen2010_glutathione|Chen 2010]].",
    reserveMeasure: "Vapaa glutationiekvivalenttien pooli on Gₜ = [GSH] + 2[GSSG]. Pelkkä GSH:n hapettuminen GSSG:ksi säilyttää tämän poolin. Absoluuttinen varanto, GSH/GSSG-suhde, hetkellinen ROS ja kertynyt vaurio ovat siksi erillisiä mittauksia. Yksittäinen pitoisuus ei mittaa synteesivirtaa.",
    reserveImplication: "BERM:n varannon peittymistä kuvaava synteesi kysyy, muuttaako mitattu varantomuutos myöhempää haastetta samalla, kun tavallinen tuotantomittari säilyy samankaltaisena. Varanto ja haaste nimetään, joten normaali hormonitulos yksin ei osoita piilevää haittaa.",
    reserveLink: "Seuraa varannon ja proksin yhteyttä",
    outputTitle: "Paikallisesta tuotannosta koko eliöön",
    output: "Autofagiainterventiot yhdistävät solun ylläpidon kolesterolihuoltoon ja sukupuolisteroidien tuotantoon myös ihmisen munasarja- ja kiveskudoksessa. Testosteronikoe iäkkäillä miehillä, joilla oli matala testosteroni ja vähäinen halu, ankkuroi edelleen hormonin ja käyttäytymisen yhteyttä seksuaalisen aktiivisuuden ja halun kautta. [[ref:gao2018_autophagy|Gao 2018]]; [[ref:esmaeilian2023_autophagy|Esmaeilian 2023]]; [[ref:cunningham2016_testosterone_sexual_function|Cunningham 2016]].",
    outputScope: "Koostettu reitti jatkuu hormonin saatavuuden, kudosvasteen, motivaation, mahdollisuuksien ja lisääntymistoiminnan kautta. Suora sukusoluvaikutus säilyy rinnakkaishaarana. Sama tuotantopuute kuljetetaan eteenpäin kerran, ja ikä, kudos sekä koeolosuhteet säilyvät näytön yhteydessä.",
    stagesClaim: "Synteesi määrittää ensin rakenteen, sitten vastesuunnan ehdot ja lopuksi tutkimuskohtaiset arvot. Olemassa olevat protokollat ja mittaukset rajaavat jokaista vaihetta; määrällinen siirto kudosten välillä ja väestötuloksiin tarvitsee oman aineistonsa.",
    dataTitle: "Olemassa olevat aineistot biologisten vaiheiden tutkimiseen",
    dataLead: "Saatavilla olevat aineistot paikantavat solutiloja ja molekyylivasteita. Geeni- tai havainnointiaineisto säilyttää oman tutkimusasetelmansa, kun se yhdistetään kenttäkokeeseen.",
    next: "Jatka mallin ketjussa",
    links: ["Vastaanottajatila ja ajoitus", "Testosteronievidenssi", "Interventiotutkimukset", "Varanto ja proksin peittävä vaikutus", "Biologiasta käyttäytymiseen"],
  },
  ja: {
    geneticsTitle: "遺伝子がカルシウム貯蔵、予備能、コレステロール段階を特定する",
    genetics: "RYR2関連CPVT研究は患者のインスリン・グルコース測定と変異マウス実験を組み合わせます。マウスではERカルシウム漏出が刺激時のミトコンドリアカルシウム取込み・ATP・インスリン分泌の低下と結ばれます。Darier病はSERCA2障害をグルタチオン予備能とストレス適応に結びます。ヒトSTAR変異は副腎・性腺ステロイド産生に必要なミトコンドリアへのコレステロール輸送を特定します。BERMは貯蔵量、刺激時カルシウム、エネルギー、予備能、基質輸送を介してつなぎ、疾患研究の範囲を保持します。[[ref:santulli2015_ryr2|Santulli 2015]]；[[ref:harmon2026_darier|Harmon 2026]]；[[ref:lin1995_star|Lin 1995]]。",
    title: "カルシウム、酸化還元とホルモン産生", subtitle: "電磁場実験、遺伝子介入、ヒト組織の証拠が、コレステロール供給とステロイド産生の機構で合流します。",
    lead: "一つの細胞が信号を受け取り、利用できる予備能を保ち、コレステロールをステロイド産生へ運ぶ必要があります。カルシウム、酸化還元化学、局所時計、オートファジーはこの共通の働きを担います。測定された関係は、組織状態から局所的ホルモン産生能力への具体的な経路をBERMに与えます。", back: "生物学の概要",
    fieldClaim: "特定の電磁場条件下で、カルシウム関連、酸化還元、ステロイド産生の応答が測定されています。各結果は波形、実験系、介入、評価項目を保持します。",
    componentClaim: "遺伝子、薬物、基質による迂回実験は同じ生物学的機構の因果依存性を特定します。BERMは共通の測定された中間段階を通じてそれらを結びます。",
    premiseTitle: "物理的前提が入る位置", premise: "[[ref:lindgren2025|Lindgrenの2025年]]計量仮定とBERMで明示した尺度κのもとで、ポテンシャルを背景A₀と摂動aに分けると下のテンソル式が得られます。条件付き受容演算子Ξは幾何学を組織状態Sにおける生物学的入力に結びます。下流研究は生物学的遷移を制約し、組織結合、物理尺度、ヒト応答の較正は別に扱います。", derivationLink: "物理的導出を見る",
    reserveTitle: "現在の産生より先に予備能が変わる", reserve: "Miaoは連続RF曝露下のTM3ライディッヒ細胞でグルタチオン量の減少を測定しました。ChenのMA-10細胞ではグルタチオン減少後もLH刺激によるプロゲステロン産生は維持され、追加の酸化負荷でステロイド産生能力の低下が現れました。別々の細胞系を測定された予備能で結びます。[[ref:miao2025_rf_metabolomics|Miao 2025]]；[[ref:chen2010_glutathione|Chen 2010]]。",
    reserveMeasure: "遊離グルタチオン当量はGₜ = [GSH] + 2[GSSG]です。GSHからGSSGへの酸化だけでは総当量は減りません。絶対量、GSH/GSSG比、現在のROS、蓄積損傷は別々に測定します。一時点の濃度は合成流量を示しません。",
    reserveImplication: "BERMは通常の産生指標が似ていても、測定された予備能の変化が後の負荷応答を変えるかを問います。予備能と負荷を特定するため、正常なホルモン値だけで隠れた障害があるとは判断しません。", reserveLink: "予備能と代理指標の関係を見る",
    outputTitle: "局所産生から個体全体へ", output: "オートファジー介入はヒト卵巣・精巣組織でも細胞維持、コレステロール供給、性ステロイド産生を結びます。低テストステロンと低い性欲を持つ高齢男性の試験は、ホルモン介入と性的活動・欲求を結びます。[[ref:gao2018_autophagy|Gao 2018]]；[[ref:esmaeilian2023_autophagy|Esmaeilian 2023]]；[[ref:cunningham2016_testosterone_sexual_function|Cunningham 2016]]。",
    outputScope: "統合経路はホルモン利用可能性、組織応答、動機、機会、生殖機能へ続きます。生殖細胞への直接作用は並行経路です。同じ産生障害は一度だけ伝播させ、年齢、組織、実験条件を証拠に付随させます。",
    stagesClaim: "まず構造、次に応答方向の条件、最後に研究固有の値を示します。既存の条件と測定が各段階を制約し、組織間や集団への定量的変換には対応する証拠が必要です。",
    dataTitle: "既存のデータ", dataLead: "データは細胞状態と分子応答を特定します。遺伝子・観察研究のデータは、電磁場実験と結ぶ際も元の研究計画を保持します。", next: "モデルをたどる", links: ["受容状態とタイミング", "テストステロンの証拠", "介入研究", "予備能と代理指標", "生物学から行動へ"],
  },
  fr: {
    geneticsTitle: "Les gènes localisent les stocks calciques, la réserve et le transport du cholestérol",
    genetics: "Les études de CPVT liées à RYR2 combinent les mesures d’insuline et de glucose des patients avec des expériences chez la souris mutante reliant fuite calcique du RE et diminution du calcium mitochondrial stimulé, de l’ATP et de la sécrétion d’insuline. La maladie de Darier relie SERCA2 à la réserve de glutathion et à l’adaptation au stress. Les mutations STAR humaines identifient le transport mitochondrial du cholestérol comme nécessaire à la stéroïdogenèse surrénalienne et gonadique. BERM relie ces systèmes par leurs intermédiaires nommés : contenu des stocks, calcium stimulé, énergie, réserve et transport du substrat. Chaque intervention conserve sa portée biologique. [[ref:santulli2015_ryr2|Santulli 2015]] ; [[ref:harmon2026_darier|Harmon 2026]] ; [[ref:lin1995_star|Lin 1995]].",
    title: "Calcium, redox et production hormonale", subtitle: "Expériences de champ, interventions génétiques et tissus humains convergent vers l’approvisionnement en cholestérol et la stéroïdogenèse.",
    lead: "La même cellule doit recevoir un signal, préserver une réserve utilisable et acheminer le cholestérol vers la production de stéroïdes. Calcium, chimie redox, horloge locale et autophagie participent à ce travail commun. Leurs relations mesurées donnent à BERM une voie concrète de l’état tissulaire à la capacité hormonale locale.", back: "Vue d’ensemble de la biologie",
    fieldClaim: "Des protocoles de champ définis ont mesuré des réponses calciques, redox ou stéroïdogènes. Chaque résultat conserve sa forme d’onde, son système expérimental, son intervention et son critère de jugement.",
    componentClaim: "Les interventions génétiques, pharmacologiques et de contournement par substrat localisent les dépendances causales de la même machinerie. BERM les relie par des intermédiaires mesurés communs.",
    premiseTitle: "Où intervient la prémisse physique", premise: "Selon l’ansatz métrique de [[ref:lindgren2025|Lindgren 2025]] et l’échelle κ déclarée par BERM, la séparation du potentiel en fond A₀ et perturbation a donne le tenseur ci-dessous. L’opérateur récepteur conditionnel Ξ relie cette géométrie à une entrée biologique dans l’état tissulaire S. Les études en aval contraignent les transitions biologiques ; le couplage tissulaire, l’échelle physique et la calibration humaine gardent leurs rôles propres.", derivationLink: "Suivre la dérivation physique",
    reserveTitle: "Une réserve peut changer avant la production actuelle", reserve: "Miao a mesuré des pools de glutathion réduits dans des cellules de Leydig TM3 sous exposition RF continue. Chen a réduit le glutathion dans des cellules MA-10 : la production de progestérone stimulée par la LH restait préservée avant qu’une charge oxydante supplémentaire révèle une capacité stéroïdogène réduite. Ces systèmes distincts se rejoignent par une réserve mesurée. [[ref:miao2025_rf_metabolomics|Miao 2025]] ; [[ref:chen2010_glutathione|Chen 2010]].",
    reserveMeasure: "Le pool d’équivalents glutathion libres vaut Gₜ = [GSH] + 2[GSSG]. L’oxydation de GSH en GSSG conserve ce pool. Taille absolue, rapport GSH/GSSG, ROS actuels et lésions accumulées restent des mesures distinctes. Une concentration isolée ne mesure pas le flux de synthèse.",
    reserveImplication: "La synthèse BERM examine si une réserve mesurée modifie la réponse à une charge ultérieure alors que le marqueur de production reste similaire. Réserve et charge sont précisées : un résultat hormonal normal ne suffit pas à établir une altération cachée.", reserveLink: "Suivre le lien entre réserve et proxy",
    outputTitle: "De la production locale à l’organisme", output: "Les interventions sur l’autophagie relient entretien cellulaire, cholestérol et production de stéroïdes sexuels, y compris dans les tissus ovariens et testiculaires humains. Un essai chez des hommes âgés ayant une testostérone et un désir faibles relie ensuite l’intervention hormonale à l’activité et au désir sexuels. [[ref:gao2018_autophagy|Gao 2018]] ; [[ref:esmaeilian2023_autophagy|Esmaeilian 2023]] ; [[ref:cunningham2016_testosterone_sexual_function|Cunningham 2016]].",
    outputScope: "La voie composée continue par la disponibilité hormonale, la réponse tissulaire, la motivation, les possibilités et la fonction reproductive. Les effets directs sur les cellules germinales forment une branche parallèle. Un défaut commun de production est propagé une seule fois, en conservant âge, tissu et conditions d’étude.",
    stagesClaim: "La synthèse fixe d’abord la structure, puis les conditions du sens de la réponse et enfin les valeurs propres à chaque étude. Protocoles et mesures contraignent chaque étape ; le transfert quantitatif entre tissus et vers la population nécessite ses propres preuves.",
    dataTitle: "Données existantes pour ces étapes biologiques", dataLead: "Les ressources localisent les états cellulaires et les réponses moléculaires. Une étude génétique ou observationnelle conserve son plan lorsqu’elle est reliée à une expérience de champ.", next: "Poursuivre dans le modèle", links: ["État récepteur et timing", "Preuves sur la testostérone", "Études d’intervention", "Réserve et masquage par proxy", "De la biologie au comportement"],
  },
  ko: {
    geneticsTitle: "유전자가 칼슘 저장고, 예비능, 콜레스테롤 단계를 확인",
    genetics: "RYR2 관련 CPVT 연구는 환자의 인슐린·포도당 측정과 돌연변이 생쥐 실험을 결합합니다. 생쥐에서는 ER 칼슘 누출이 자극 시 미토콘드리아 칼슘 흡수·ATP·인슐린 분비 저하와 연결됩니다. 다리에병은 SERCA2 기능 이상을 글루타티온 예비능과 스트레스 적응에 연결합니다. 인간 STAR 변이는 미토콘드리아 콜레스테롤 수송이 부신과 생식샘의 스테로이드 생성에 필요함을 확인합니다. BERM은 저장량, 자극 시 칼슘, 에너지, 예비능, 기질 수송이라는 중간 단계를 통해 연결하며 각 질환 연구의 생물학적 범위를 유지합니다. [[ref:santulli2015_ryr2|Santulli 2015]]; [[ref:harmon2026_darier|Harmon 2026]]; [[ref:lin1995_star|Lin 1995]].",
    title: "칼슘, 산화환원과 호르몬 생산", subtitle: "전자기장 실험, 유전자 개입, 인간 조직의 증거가 콜레스테롤 공급과 스테로이드 생산 기전에서 만납니다.",
    lead: "하나의 세포가 신호를 받고, 사용 가능한 예비능을 유지하고, 콜레스테롤을 스테로이드 생산으로 운반해야 합니다. 칼슘, 산화환원 화학, 국소 시계, 자가포식은 이 공통 작업에 참여합니다. 측정된 연결은 BERM에 조직 상태에서 국소 호르몬 생산 능력으로 이어지는 구체적 경로를 제공합니다.", back: "생물학 개요",
    fieldClaim: "정의된 전자기장 조건에서 칼슘 관련, 산화환원 또는 스테로이드 생성 반응이 측정되었습니다. 각 결과는 파형, 실험계, 개입, 평가 지표를 유지합니다.",
    componentClaim: "유전적·약리학적·기질 우회 실험은 같은 생물학적 기전의 인과 의존성을 밝힙니다. BERM은 공통으로 측정된 중간 단계를 통해 이들을 연결합니다.",
    premiseTitle: "물리적 전제가 들어오는 지점", premise: "[[ref:lindgren2025|Lindgren의 2025년]] 계량 가정과 BERM이 명시한 척도 κ에서 퍼텐셜을 배경 A₀와 교란 a로 나누면 아래 텐서식이 나옵니다. 조건부 수용 연산자 Ξ는 이를 조직 상태 S의 생물학적 입력과 연결합니다. 후속 연구는 생물학적 전이를 제한하며, 조직 결합·물리적 척도·인간 반응 보정은 별도로 다룹니다.", derivationLink: "물리적 도출 보기",
    reserveTitle: "현재 생산에 앞서 예비능이 변할 수 있음", reserve: "Miao는 연속 RF 노출 TM3 라이디히 세포에서 감소한 글루타티온 풀을 측정했습니다. Chen의 MA-10 세포에서는 글루타티온 감소 후에도 LH 자극 프로게스테론 생산이 유지되었으나 추가 산화 부하에서 스테로이드 생성 능력 저하가 드러났습니다. 서로 다른 세포계는 측정된 예비능 변수를 통해 만납니다. [[ref:miao2025_rf_metabolomics|Miao 2025]]; [[ref:chen2010_glutathione|Chen 2010]].",
    reserveMeasure: "유리 글루타티온 당량은 Gₜ = [GSH] + 2[GSSG]입니다. GSH에서 GSSG로의 산화만으로는 이 풀이 감소하지 않습니다. 절대량, GSH/GSSG 비율, 현재 ROS, 축적 손상은 별도 측정입니다. 한 시점의 농도는 합성 유량을 나타내지 않습니다.",
    reserveImplication: "BERM은 통상적 생산 지표가 비슷하게 유지되더라도 측정된 예비능 변화가 이후 부하 반응을 바꾸는지 묻습니다. 예비능과 부하를 명시하므로 정상 호르몬 결과만으로 숨은 장애가 있다고 판단하지 않습니다.", reserveLink: "예비능과 대리 지표의 연결 보기",
    outputTitle: "국소 생산에서 유기체 전체로", output: "자가포식 개입은 인간 난소와 고환 조직에서도 세포 유지, 콜레스테롤 공급, 성 스테로이드 생산을 연결합니다. 테스토스테론과 성욕이 낮은 고령 남성의 시험은 호르몬 개입을 성적 활동 및 욕구와 연결합니다. [[ref:gao2018_autophagy|Gao 2018]]; [[ref:esmaeilian2023_autophagy|Esmaeilian 2023]]; [[ref:cunningham2016_testosterone_sexual_function|Cunningham 2016]].",
    outputScope: "합성 경로는 호르몬 가용성, 조직 반응, 동기, 기회, 생식 기능으로 이어집니다. 생식 세포에 대한 직접 효과는 병렬 경로입니다. 같은 생산 결함은 한 번만 전달하며 나이, 조직, 연구 조건을 증거에 함께 유지합니다.",
    stagesClaim: "먼저 구조, 다음으로 반응 방향의 조건, 마지막으로 연구별 값을 정합니다. 기존 조건과 측정이 각 단계를 제한하며, 조직 간 또는 인구 수준으로의 정량적 전환에는 해당 증거가 필요합니다.",
    dataTitle: "생물학적 단계를 위한 기존 데이터", dataLead: "자료는 세포 상태와 분자 반응의 위치를 밝힙니다. 유전적·관찰 자료는 전자기장 실험과 연결할 때도 원래 연구 설계를 유지합니다.", next: "모델 계속 살펴보기", links: ["수용 상태와 시점", "테스토스테론 증거", "개입 연구", "예비능과 대리 지표", "생물학에서 행동으로"],
  },
} as const;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const d = pickCopy(COPY, locale);
  return { title: `${d.title} – Extinction Field`, description: d.subtitle };
}

export default async function CalciumRedoxSteroidogenesisPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const d = pickCopy(COPY, locale);
  const p = (text: string) => <p className="text-base leading-7 text-foreground-muted"><InlineReferenceText text={text} locale={locale} /></p>;
  return <article>
    <TranslationNotice copy={COPY} locale={locale} />
    <div className="mx-auto max-w-6xl px-6 py-10 sm:py-14">
      <div className="mb-8 border-b editorial-rule pb-5"><ModelReadingPath locale={locale} current="biology" /><Link href={`/${locale}/biology`} className="mt-4 inline-block text-xs text-accent hover:underline">← {d.back}</Link></div>
      <PageHeader icon={Activity} title={d.title} subtitle={d.subtitle} />
      <p className="mb-8 max-w-4xl text-lg leading-8 sm:text-xl">{d.lead}</p>
      <div className="mb-9 grid gap-4 md:grid-cols-2">
        <p className="rounded-lg border border-sky-500/25 bg-sky-500/5 p-5 text-sm leading-6"><ClaimRef claimId="claim.steroidogenesis.field-protocols">{d.fieldClaim}</ClaimRef></p>
        <p className="rounded-lg border border-emerald-500/25 bg-emerald-500/5 p-5 text-sm leading-6"><ClaimRef claimId="claim.steroidogenesis.component-convergence">{d.componentClaim}</ClaimRef></p>
      </div>
      <details className="mb-12 rounded-lg border border-card-border p-4 sm:p-6">
        <summary className="cursor-pointer font-semibold">{d.premiseTitle}</summary>
        <div className="mt-4 space-y-4">{p(d.premise)}<MathBlock tex={String.raw`\Delta g_{\mu\nu}=\kappa\left(A_{0\mu}a_\nu+a_\mu A_{0\nu}+a_\mu a_\nu\right),\qquad r_i=\Xi_i[S](\Delta g)`} /><Link href={`/${locale}/model/tensor-derivation`} className="inline-flex min-h-11 items-center gap-2 text-sm text-accent hover:underline">{d.derivationLink}<ArrowRight size={15} aria-hidden="true" /></Link></div>
      </details>
      <SteroidogenesisEvidenceExplorer locale={locale} />
      <section id="redox-reserve" className="mt-14 scroll-mt-28 space-y-5 border-t editorial-rule pt-8">
        <h2 className="editorial-section-heading">{d.reserveTitle}</h2>{p(d.reserve)}{p(d.reserveMeasure)}
        <p className="border-l-2 border-accent pl-4 text-base leading-7"><ClaimRef claimId="claim.steroidogenesis.reserve-masking">{d.reserveImplication}</ClaimRef></p>
        <Link href={`/${locale}/model/proxy-masking#redox-reserve-masking`} className="inline-flex min-h-11 items-center gap-2 text-sm text-accent hover:underline">{d.reserveLink}<ArrowRight size={15} aria-hidden="true" /></Link>
      </section>
      <section id="genetic-localisation" className="mt-14 scroll-mt-28 space-y-5 border-t editorial-rule pt-8"><h2 className="editorial-section-heading">{d.geneticsTitle}</h2>{p(d.genetics)}</section>
      <section id="organism-output" className="mt-14 scroll-mt-28 space-y-5 border-t editorial-rule pt-8">
        <h2 className="editorial-section-heading">{d.outputTitle}</h2>{p(d.output)}{p(d.outputScope)}
        <p className="border-l-2 border-accent pl-4 text-base leading-7"><ClaimRef claimId="claim.steroidogenesis.staged-integration">{d.stagesClaim}</ClaimRef></p>
      </section>
      <section className="mt-14 space-y-5 border-t editorial-rule pt-8">
        <h2 className="editorial-section-heading">{d.dataTitle}</h2>{p(d.dataLead)}
        <SteroidogenesisTranslationNotice locale={locale} section="dataResources" />
        <div className="grid gap-4 md:grid-cols-2">{STEROIDOGENESIS.dataResources.map(resource => <div key={resource.id} className="rounded-lg border border-card-border p-5">
          <h3 className="mb-3 text-base font-semibold"><a href={resource.url} target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">{tx(resource.title, locale)} ↗</a></h3>
          <p className="text-sm leading-6 text-foreground-muted">{tx(resource.description, locale)}</p>
          <div className="mt-3 text-xs"><StudyCitation referenceId={resource.referenceId} locale={locale} /></div>
        </div>)}</div>
      </section>
      <nav aria-label={d.next} className="mt-14 border-t editorial-rule pt-8"><h2 className="editorial-section-heading mb-4">{d.next}</h2><div className="flex flex-wrap gap-x-6 gap-y-3">{["/model/biological-coordination", "/evidence/testosterone", "/evidence/pharmacology", "/model/proxy-masking#redox-reserve-masking", "/behavior"].map((href, index) => <Link key={href} href={`/${locale}${href}`} className="text-sm text-accent hover:underline">{d.links[index]} →</Link>)}</div></nav>
    </div>
  </article>;
}
