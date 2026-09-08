"use client";

import { useState } from "react";
import { ArrowDown, ArrowRight, Check, FlaskConical, GitBranch, Layers, Radio } from "lucide-react";
import { StudyCitation } from "@/components/StudyCitation";
import { pickCopy } from "@/lib/i18n";
import { SteroidogenesisTranslationNotice } from "@/components/SteroidogenesisTranslationNotice";
import { STEROIDOGENESIS, filterSteroidogenesisStudies, steroidogenesisStudyLabel, steroidogenesisStateLabel, steroidogenesisText as tx, type SteroidogenesisStudy } from "@/lib/steroidogenesis";

const COPY = {
  en: {
    convergence: "Different interventions meet at a common production system",
    convergenceLead: "Follow the same measured intermediates across field protocols, component experiments and human tissue. Select a branch to see the studies that constrain it.",
    field: "Field experiment", component: "Component experiment", synthesis: "BERM synthesis",
    fieldInput: "Defined field protocol → measured cellular response",
    inputNote: "Calcium-related signalling, redox or hormone output in the experimental system",
    branchDirect: "CaMKI → NUR77 → StAR", branchDirectNote: "CaMKI cooperates with NUR77 in StAR transcription.",
    branchClock: "CaMKI / RORα → BMAL1 → steroidogenesis", branchClockNote: "The RORα–BMAL1 link joins local clock regulation to steroidogenic machinery.",
    branchSupply: "Autophagy → cholesterol supply", branchSupplyNote: "Cellular maintenance also makes the steroid precursor available.",
    convergenceOutput: "Available cholesterol + StAR-mediated transport → steroid production",
    reserve: "Redox reserve and calcium stores", reserveNote: "GSH, GSSG, ER calcium, stimulated mitochondrial calcium and ATP describe the state through which the signal passes.",
    graphNote: "These are converging branches assembled by BERM. The direct CaMKI–NUR77 and clock-related RORα–BMAL1 links retain their distinct proteins and experiments. CaMKI is distinct from CaMKII.",
    connections: "What the studies add when connected",
    studiesInSynthesis: "Studies in this synthesis",
    explorer: "Explore the experiments",
    intro: "Read the connection first, then its response conditions and finally its measured quantities. Filtering preserves each experiment’s identity and research family.",
    mechanism: "Biological mechanism", evidence: "Evidence kind", allMechanisms: "All mechanisms", allEvidence: "Field and component experiments",
    count: "{n} publications · {f} research families", countNote: "Family groupings identify shared research programmes. Publication counts are not counts of independent replications.",
    choose: "Choose a study", empty: "No studies match these filters.", reset: "Show all studies",
    stages: ["1. Structure", "2. Response directions", "3. Measured values"], stageLabel: "Depth of the study view",
    structureIntro: "Locate the experimental system and the measured biological connection.",
    directionIntro: "Read the intervention, starting conditions and endpoint together. Response direction belongs to those conditions.",
    valuesIntro: "Field settings describe the protocol. Biological measurements and reported findings describe the response. Each retains its own units and timing.",
    system: "Experimental system", finding: "Measured finding", intervention: "Intervention and causal localisation", scope: "Scope of the finding", family: "Research family", measured: "Measured variables", protocol: "Field protocol", noField: "This study investigates a biological component without a field intervention.",
    waveform: "Waveform", carrierFrequency: "Frequency", fieldStrength: "Reported field strength or SAR", duration: "Duration", data: "Data and source coverage", publication: "Source and corrections", notRecorded: "Not specified in this source summary", details: "Study details", familyNote: "Shared programme or experimental lineage; independence is not assumed.",
    designs: { field_protocol: "Field protocol", genetic: "Genetic intervention", pharmacological: "Pharmacological intervention", human_tissue: "Human tissue", clinical_intervention: "Human intervention", biochemical: "Biochemical experiment" },
  },
  fi: {
    convergence: "Eri interventiot kohtaavat samassa tuotantojärjestelmässä",
    convergenceLead: "Seuraa samoja mitattuja välivaiheita kenttäprotokollissa, komponenttikokeissa ja ihmiskudoksessa. Valitse haara nähdäksesi sitä rajaavat tutkimukset.",
    field: "Kenttäkoe", component: "Komponenttikoe", synthesis: "BERM-synteesi",
    fieldInput: "Määritelty kenttäprotokolla → mitattu soluvaste",
    inputNote: "Kalsiumiin liittyvä signalointi, redox tai hormonituotanto koejärjestelmässä",
    branchDirect: "CaMKI → NUR77 → StAR", branchDirectNote: "CaMKI toimii yhdessä NUR77:n kanssa StAR-transkriptiossa.",
    branchClock: "CaMKI / RORα → BMAL1 → steroidogeneesi", branchClockNote: "RORα–BMAL1-yhteys liittää paikallisen kellon steroidogeeniseen koneistoon.",
    branchSupply: "Autofagia → kolesterolihuolto", branchSupplyNote: "Solun ylläpito tekee myös steroidin lähtöaineen saatavaksi.",
    convergenceOutput: "Saatavilla oleva kolesteroli + StAR-kuljetus → steroidituotanto",
    reserve: "Redox-varanto ja kalsiumvarastot", reserveNote: "GSH, GSSG, ER-kalsium, stimuloitu mitokondriokalsium ja ATP kuvaavat tilaa, jonka läpi signaali kulkee.",
    graphNote: "BERM kokoaa nämä yhtyviksi haaroiksi. Suora CaMKI–NUR77-yhteys ja kelloon liittyvä RORα–BMAL1-yhteys säilyttävät omat proteiininsa ja kokeensa. CaMKI on eri kinaasi kuin CaMKII.",
    connections: "Mitä tutkimusten yhdistäminen lisää",
    studiesInSynthesis: "Synteesiin liittyvät tutkimukset",
    explorer: "Tutki kokeita",
    intro: "Lue ensin yhteys, sitten sen vaste-ehdot ja lopuksi mitatut suureet. Suodatus säilyttää jokaisen kokeen tunnisteen ja tutkimusperheen.",
    mechanism: "Biologinen mekanismi", evidence: "Näyttölaji", allMechanisms: "Kaikki mekanismit", allEvidence: "Kenttä- ja komponenttikokeet",
    count: "{n} julkaisua · {f} tutkimusperhettä", countNote: "Perheryhmittely tunnistaa yhteiset tutkimusohjelmat. Julkaisumäärä ei ole riippumattomien toistojen määrä.",
    choose: "Valitse tutkimus", empty: "Näillä suodattimilla ei löytynyt tutkimuksia.", reset: "Näytä kaikki tutkimukset",
    stages: ["1. Rakenne", "2. Vastesuunnat", "3. Mitatut arvot"], stageLabel: "Tutkimusnäkymän syvyys",
    structureIntro: "Paikanna koejärjestelmä ja mitattu biologinen yhteys.",
    directionIntro: "Lue interventio, lähtötilanne ja päätepiste yhdessä. Vasteen suunta kuuluu näihin olosuhteisiin.",
    valuesIntro: "Kenttäasetukset kuvaavat protokollaa. Biologiset mittaukset ja raportoidut löydökset kuvaavat vastetta. Kummankin yksiköt ja ajoitus säilyvät mukana.",
    system: "Koejärjestelmä", finding: "Mitattu löydös", intervention: "Interventio ja kausaalinen paikannus", scope: "Tuloksen soveltamisala", family: "Tutkimusperhe", measured: "Mitatut muuttujat", protocol: "Kenttäprotokolla", noField: "Tutkimus tarkastelee biologista komponenttia ilman kenttäinterventiota.",
    waveform: "Aaltomuoto", carrierFrequency: "Taajuus", fieldStrength: "Ilmoitettu kenttävoimakkuus tai SAR", duration: "Kesto", data: "Aineisto ja lähteen tarkistustaso", publication: "Lähde ja korjaukset", notRecorded: "Ei yksilöity tässä lähdekoosteessa", details: "Tutkimuksen tiedot", familyNote: "Yhteinen tutkimusohjelma tai kokeellinen jatkumo; riippumattomuutta ei oleteta.",
    designs: { field_protocol: "Kenttäprotokolla", genetic: "Geeni-interventio", pharmacological: "Lääkeinterventio", human_tissue: "Ihmiskudos", clinical_intervention: "Ihmisen interventiokoe", biochemical: "Biokemiallinen koe" },
  },
  ja: {
    convergence: "異なる介入が共通の産生系で出会う", convergenceLead: "電磁場実験、構成要素実験、ヒト組織で共通する測定中間段階をたどります。経路を選ぶと対応する研究を表示します。", field: "電磁場実験", component: "構成要素実験", synthesis: "BERMの統合推論",
    fieldInput: "定義された電磁場条件 → 測定された細胞応答", inputNote: "実験系におけるカルシウム関連信号、酸化還元、ホルモン産生",
    branchDirect: "CaMKI → NUR77 → StAR", branchDirectNote: "CaMKIはNUR77と協働しStAR転写を制御します。", branchClock: "CaMKI / RORα → BMAL1 → ステロイド産生", branchClockNote: "RORα–BMAL1は局所時計とステロイド産生機構を結びます。", branchSupply: "オートファジー → コレステロール供給", branchSupplyNote: "細胞維持はステロイドの原料も供給します。", convergenceOutput: "利用可能なコレステロール + StAR輸送 → ステロイド産生", reserve: "酸化還元予備能とカルシウム貯蔵", reserveNote: "GSH、GSSG、ERカルシウム、刺激時のミトコンドリアカルシウム、ATPが信号の通る状態を示します。", graphNote: "この合流構造はBERMの統合推論です。CaMKI–NUR77と時計関連のRORα–BMAL1はそれぞれのタンパク質と実験を保ちます。CaMKIとCaMKIIは異なる酵素です。",
    connections: "研究を結ぶことで得られる説明", studiesInSynthesis: "この統合に含まれる研究", explorer: "実験を調べる", intro: "まず関係、次に応答条件、最後に測定量を読みます。各実験と研究系列の識別は保持されます。", mechanism: "生物学的機構", evidence: "証拠の種類", allMechanisms: "すべての機構", allEvidence: "電磁場実験と構成要素実験", count: "{n}報 · {f}研究系列", countNote: "研究系列は共通する研究計画を示します。論文数は独立した追試の数ではありません。", choose: "研究を選択", empty: "条件に一致する研究がありません。", reset: "すべての研究を表示", stages: ["1. 構造", "2. 応答の方向", "3. 測定値"], stageLabel: "研究表示の深さ", structureIntro: "実験系と測定された生物学的関係を確認します。", directionIntro: "介入、初期状態、評価項目を一緒に読みます。応答方向はその条件に属します。", valuesIntro: "電磁場設定は実験条件を、生物学的測定と報告結果は応答を示します。各々の単位と時間を保持します。", system: "実験系", finding: "測定結果", intervention: "介入と因果段階の特定", scope: "結果の適用範囲", family: "研究系列", measured: "測定変数", protocol: "電磁場条件", noField: "この研究は電磁場介入を行わず生物学的構成要素を調べています。", waveform: "波形", carrierFrequency: "周波数", fieldStrength: "報告された場の強度またはSAR", duration: "時間", data: "データと資料確認範囲", publication: "原著と訂正", notRecorded: "この資料要約には記載なし", details: "研究詳細", familyNote: "共通の研究計画や実験系列を持ち、独立性は仮定しません。", designs: { field_protocol: "電磁場実験", genetic: "遺伝子介入", pharmacological: "薬物介入", human_tissue: "ヒト組織", clinical_intervention: "ヒト介入試験", biochemical: "生化学実験" },
  },
  fr: {
    convergence: "Des interventions différentes rejoignent un système de production commun", convergenceLead: "Suivez les intermédiaires mesurés dans les protocoles de champ, les expériences sur les composants et les tissus humains. Choisissez une branche pour afficher ses études.", field: "Expérience de champ", component: "Expérience sur un composant", synthesis: "Synthèse BERM",
    fieldInput: "Protocole de champ défini → réponse cellulaire mesurée", inputNote: "Signalisation calcique, redox ou production hormonale dans le système étudié", branchDirect: "CaMKI → NUR77 → StAR", branchDirectNote: "CaMKI coopère avec NUR77 dans la transcription de StAR.", branchClock: "CaMKI / RORα → BMAL1 → stéroïdogenèse", branchClockNote: "La liaison RORα–BMAL1 relie l’horloge locale à la machinerie stéroïdogène.", branchSupply: "Autophagie → apport en cholestérol", branchSupplyNote: "L’entretien cellulaire rend également le précurseur disponible.", convergenceOutput: "Cholestérol disponible + transport par StAR → production de stéroïdes", reserve: "Réserve redox et stocks de calcium", reserveNote: "GSH, GSSG, calcium du RE, calcium mitochondrial stimulé et ATP décrivent l’état traversé par le signal.", graphNote: "BERM assemble ces branches convergentes. CaMKI–NUR77 et RORα–BMAL1 conservent leurs protéines et expériences propres. CaMKI est distincte de CaMKII.",
    connections: "Ce qu’apporte la connexion des études", studiesInSynthesis: "Études de cette synthèse", explorer: "Explorer les expériences", intro: "Lisez d’abord la connexion, puis ses conditions de réponse et enfin les quantités mesurées. Les filtres préservent l’identité et la famille de chaque étude.", mechanism: "Mécanisme biologique", evidence: "Type de preuve", allMechanisms: "Tous les mécanismes", allEvidence: "Expériences de champ et de composants", count: "{n} publications · {f} familles de recherche", countNote: "Les familles identifient des programmes communs. Le nombre de publications ne représente pas le nombre de réplications indépendantes.", choose: "Choisir une étude", empty: "Aucune étude ne correspond aux filtres.", reset: "Afficher toutes les études", stages: ["1. Structure", "2. Sens des réponses", "3. Valeurs mesurées"], stageLabel: "Profondeur de la lecture", structureIntro: "Localiser le système expérimental et la connexion biologique mesurée.", directionIntro: "Lire ensemble l’intervention, l’état initial et le critère de jugement. Le sens de la réponse appartient à ces conditions.", valuesIntro: "Les paramètres du champ décrivent le protocole ; les mesures biologiques et résultats décrivent la réponse. Chacun conserve ses unités et son calendrier.", system: "Système expérimental", finding: "Résultat mesuré", intervention: "Intervention et localisation causale", scope: "Portée du résultat", family: "Famille de recherche", measured: "Variables mesurées", protocol: "Protocole de champ", noField: "Cette étude examine un composant biologique sans intervention de champ.", waveform: "Forme d’onde", carrierFrequency: "Fréquence", fieldStrength: "Intensité du champ ou DAS rapporté", duration: "Durée", data: "Données et portée de la vérification", publication: "Source et corrections", notRecorded: "Non précisé dans ce résumé", details: "Détails de l’étude", familyNote: "Programme ou lignée expérimentale communs ; l’indépendance n’est pas présumée.", designs: { field_protocol: "Protocole de champ", genetic: "Intervention génétique", pharmacological: "Intervention pharmacologique", human_tissue: "Tissu humain", clinical_intervention: "Intervention humaine", biochemical: "Expérience biochimique" },
  },
  ko: {
    convergence: "서로 다른 개입이 공통 생산 체계에서 만남", convergenceLead: "전자기장 조건, 구성 요소 실험, 인간 조직에서 공통으로 측정된 중간 단계를 살펴보세요. 경로를 선택하면 해당 연구가 표시됩니다.", field: "전자기장 실험", component: "구성 요소 실험", synthesis: "BERM 합성 추론",
    fieldInput: "정의된 전자기장 조건 → 측정된 세포 반응", inputNote: "실험계의 칼슘 관련 신호, 산화환원 또는 호르몬 생산", branchDirect: "CaMKI → NUR77 → StAR", branchDirectNote: "CaMKI는 NUR77과 협력하여 StAR 전사를 조절합니다.", branchClock: "CaMKI / RORα → BMAL1 → 스테로이드 생성", branchClockNote: "RORα–BMAL1은 국소 시계를 스테로이드 생성 기전에 연결합니다.", branchSupply: "자가포식 → 콜레스테롤 공급", branchSupplyNote: "세포 유지는 스테로이드 원료도 공급합니다.", convergenceOutput: "사용 가능한 콜레스테롤 + StAR 수송 → 스테로이드 생산", reserve: "산화환원 예비능과 칼슘 저장고", reserveNote: "GSH, GSSG, ER 칼슘, 자극 시 미토콘드리아 칼슘, ATP는 신호가 통과하는 상태를 나타냅니다.", graphNote: "이 합류 구조는 BERM의 합성 추론입니다. CaMKI–NUR77과 시계 관련 RORα–BMAL1은 각각의 단백질과 실험을 유지합니다. CaMKI와 CaMKII는 다른 효소입니다.",
    connections: "연구 연결이 더하는 설명", studiesInSynthesis: "이 합성에 포함된 연구", explorer: "실험 살펴보기", intro: "연결을 먼저 읽고, 반응 조건과 측정량을 차례로 확인하세요. 필터는 각 실험과 연구 계열의 정체성을 유지합니다.", mechanism: "생물학적 기전", evidence: "증거 유형", allMechanisms: "모든 기전", allEvidence: "전자기장 및 구성 요소 실험", count: "논문 {n}편 · 연구 계열 {f}개", countNote: "연구 계열은 공통 프로그램을 표시합니다. 논문 수는 독립적 재현 횟수가 아닙니다.", choose: "연구 선택", empty: "조건에 맞는 연구가 없습니다.", reset: "모든 연구 보기", stages: ["1. 구조", "2. 반응 방향", "3. 측정값"], stageLabel: "연구 보기 깊이", structureIntro: "실험계와 측정된 생물학적 연결을 확인합니다.", directionIntro: "개입, 초기 상태, 평가 지표를 함께 읽습니다. 반응 방향은 해당 조건에 속합니다.", valuesIntro: "장 설정은 실험 조건을, 생물학적 측정과 보고 결과는 반응을 설명합니다. 각각의 단위와 시간을 유지합니다.", system: "실험계", finding: "측정 결과", intervention: "개입과 인과 단계 확인", scope: "결과의 적용 범위", family: "연구 계열", measured: "측정 변수", protocol: "전자기장 조건", noField: "이 연구는 전자기장 개입 없이 생물학적 구성 요소를 조사합니다.", waveform: "파형", carrierFrequency: "주파수", fieldStrength: "보고된 장 세기 또는 SAR", duration: "기간", data: "데이터 및 자료 확인 범위", publication: "원문과 정정", notRecorded: "이 자료 요약에 명시되지 않음", details: "연구 상세", familyNote: "공통 연구 프로그램이나 실험 계열이며 독립성을 가정하지 않습니다.", designs: { field_protocol: "전자기장 조건", genetic: "유전자 개입", pharmacological: "약리학적 개입", human_tissue: "인간 조직", clinical_intervention: "인간 개입", biochemical: "생화학 실험" },
  },
} as const;

const control = "min-h-11 w-full rounded-lg border border-card-border bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50";
const chip = "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[0.7rem] font-semibold";
const fieldChip = `${chip} border-sky-500/30 bg-sky-500/8 text-sky-700 dark:text-sky-300`;
const componentChip = `${chip} border-emerald-500/30 bg-emerald-500/8 text-emerald-700 dark:text-emerald-300`;

export function SteroidogenesisEvidenceExplorer({ locale }: { locale: string }) {
  const d = pickCopy(COPY, locale);
  const [mechanism, setMechanism] = useState("all");
  const [kind, setKind] = useState("all");
  const [studyId, setStudyId] = useState(STEROIDOGENESIS.studies[0].id);
  const [stage, setStage] = useState(0);
  const studies = filterSteroidogenesisStudies(mechanism, kind);
  const selected = studies.find(study => study.id === studyId) ?? studies[0];
  const families = new Set(studies.map(study => study.familyId));
  const branch = (selectedMechanism: string) => { setMechanism(selectedMechanism); setKind("all"); };
  const branchCards = [
    { id: "calcium-signalling", title: d.branchDirect, text: d.branchDirectNote, refs: ["martin2008_camki_nur77"] },
    { id: "clock-steroidogenesis", title: d.branchClock, text: d.branchClockNote, refs: ["qin2018_camki_rora", "akashi2005_rora_bmal1"] },
    { id: "cholesterol-supply", title: d.branchSupply, text: d.branchSupplyNote, refs: ["gao2018_autophagy", "esmaeilian2023_autophagy"] },
  ];
  return <div className="min-w-0 space-y-14">
    <SteroidogenesisTranslationNotice locale={locale} />
    <section id="convergence" className="scroll-mt-28 space-y-5">
      <div><h2 className="editorial-section-heading">{d.convergence}</h2><p className="mt-3 max-w-4xl text-base leading-7 text-foreground-muted">{d.convergenceLead}</p></div>
      <figure className="rounded-xl border border-card-border bg-[var(--figure-bg)] p-4 sm:p-6">
        <div className="mb-5 flex flex-wrap gap-2"><span className={fieldChip}><Radio size={12} aria-hidden="true" />{d.field}</span><span className={componentChip}><FlaskConical size={12} aria-hidden="true" />{d.component}</span><span className={`${chip} border-amber-500/30 bg-amber-500/8 text-amber-700 dark:text-amber-300`}><GitBranch size={12} aria-hidden="true" />{d.synthesis}</span></div>
        <div className="rounded-lg border border-sky-500/30 bg-background p-4 text-center"><p className="font-semibold leading-6">{d.fieldInput}</p><p className="mt-2 text-xs leading-5 text-foreground-muted">{d.inputNote}</p><div className="mt-3 flex flex-wrap justify-center gap-4 text-xs"><StudyCitation referenceId="qin2018_camki_rora" locale={locale} /><StudyCitation referenceId="qin2019_ceo2_leydig" locale={locale} /><StudyCitation referenceId="miao2025_rf_metabolomics" locale={locale} /></div></div>
        <ArrowDown aria-hidden="true" size={22} className="mx-auto my-3 text-accent" />
        <div className="grid gap-3 md:grid-cols-3">{branchCards.map(card => <div key={card.id} className="min-w-0 rounded-lg border border-emerald-500/25 bg-background p-4"><a href="#study-explorer" onClick={() => branch(card.id)} className="group inline-flex items-start gap-2 text-sm font-semibold leading-6 text-accent hover:underline">{card.title}<ArrowRight size={14} className="mt-1 shrink-0" aria-hidden="true" /></a><p className="mt-3 text-sm leading-6 text-foreground-muted">{card.text}</p><div className="mt-3 flex flex-wrap gap-3 text-xs">{card.refs.map(referenceId => <StudyCitation key={referenceId} referenceId={referenceId} locale={locale} />)}</div></div>)}</div>
        <ArrowDown aria-hidden="true" size={22} className="mx-auto my-3 text-accent" />
        <div className="rounded-lg border border-amber-500/30 bg-amber-500/5 p-4 text-center text-base font-semibold leading-7">{d.convergenceOutput}</div>
        <div className="mt-4 rounded-lg border border-card-border bg-background p-4"><a href="#study-explorer" onClick={() => branch("redox-reserve")} className="inline-flex items-center gap-2 text-sm font-semibold text-accent hover:underline">{d.reserve}<ArrowRight size={14} aria-hidden="true" /></a><p className="mt-2 text-sm leading-6 text-foreground-muted">{d.reserveNote}</p></div>
        <figcaption className="mt-4 text-xs leading-6 text-foreground-muted">{d.graphNote}</figcaption>
      </figure>
    </section>

    <section className="space-y-5 border-t editorial-rule pt-8">
      <h2 className="editorial-section-heading">{d.connections}</h2>
      <div className="grid gap-4 lg:grid-cols-2">{STEROIDOGENESIS.syntheses.map(synthesis => <article key={synthesis.id} className="min-w-0 space-y-3 rounded-lg border border-card-border p-5">
        <span className={`${chip} border-amber-500/25 text-amber-700 dark:text-amber-300`}>{d.synthesis}</span>
        <h3 className="text-base font-semibold leading-6">{tx(synthesis.title, locale)}</h3>
        <p className="text-sm leading-6 text-foreground-muted">{tx(synthesis.body, locale)}</p>
        <div className="flex flex-wrap gap-2" aria-label={d.studiesInSynthesis}>{synthesis.studyIds.map(id => { const study = STEROIDOGENESIS.studies.find(item => item.id === id); return study ? <a key={id} href="#study-explorer" onClick={() => { setMechanism("all"); setKind("all"); setStudyId(id); }} className="rounded-md border border-card-border px-2 py-1 text-xs text-accent hover:border-accent/50">{steroidogenesisStudyLabel(study, locale)}</a> : null; })}</div>
      </article>)}</div>
    </section>

    <section id="study-explorer" className="scroll-mt-28 space-y-6 border-t editorial-rule pt-8">
      <div><h2 className="editorial-section-heading">{d.explorer}</h2><p className="mt-3 text-base leading-7 text-foreground-muted">{d.intro}</p></div>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="text-sm font-medium">{d.mechanism}<select className={`${control} mt-2`} value={mechanism} onChange={event => setMechanism(event.target.value)}><option value="all">{d.allMechanisms}</option>{STEROIDOGENESIS.mechanisms.map(item => <option value={item.id} key={item.id}>{tx(item.label, locale)}</option>)}</select></label>
        <label className="text-sm font-medium">{d.evidence}<select className={`${control} mt-2`} value={kind} onChange={event => setKind(event.target.value)}><option value="all">{d.allEvidence}</option><option value="field_experiment">{d.field}</option><option value="component_experiment">{d.component}</option></select></label>
      </div>
      <div><p role="status" className="text-sm font-semibold">{d.count.replace("{n}", String(studies.length)).replace("{f}", String(families.size))}</p><p className="mt-1 text-xs leading-5 text-foreground-muted">{d.countNote}</p></div>
      {!selected ? <div className="rounded-lg border border-card-border p-5"><p>{d.empty}</p><button type="button" onClick={() => { setMechanism("all"); setKind("all"); }} className="mt-3 min-h-11 text-sm font-medium text-accent hover:underline">{d.reset}</button></div> : <div className="grid items-start gap-5 lg:grid-cols-[minmax(13rem,0.8fr)_minmax(0,2fr)]">
        <div className="min-w-0">
          <label className="block text-sm font-medium lg:hidden">{d.choose}<select value={selected.id} onChange={event => setStudyId(event.target.value)} className={`${control} mt-2`}>{studies.map(study => <option key={study.id} value={study.id}>{steroidogenesisStudyLabel(study, locale)}</option>)}</select></label>
          <div className="hidden max-h-[42rem] space-y-2 overflow-y-auto pr-2 lg:block" role="group" aria-label={d.choose}>{studies.map(study => {
            const family = STEROIDOGENESIS.families.find(item => item.id === study.familyId);
            return <button type="button" key={study.id} onClick={() => setStudyId(study.id)} aria-pressed={selected.id === study.id} className={`block w-full rounded-lg border p-3 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 ${selected.id === study.id ? "border-accent bg-accent/5" : "border-card-border hover:border-accent/50"}`}>
              <span className="flex items-center justify-between gap-2 text-sm font-semibold">{steroidogenesisStudyLabel(study, locale)}{selected.id === study.id && <Check size={14} className="shrink-0 text-accent" aria-hidden="true" />}</span>
              <span className={`mt-2 ${study.evidenceKind === "field_experiment" ? fieldChip : componentChip}`}>{study.evidenceKind === "field_experiment" ? d.field : d.component}</span>
              <span className="mt-2 block text-[0.7rem] leading-5 text-foreground-muted">{d.family}: {family ? tx(family.label, locale) : d.familyNote}</span>
            </button>;
          })}</div>
        </div>
        <article className="min-w-0 overflow-hidden rounded-xl border border-card-border" data-study-id={selected.id} data-evidence-kind={selected.evidenceKind}>
          <div className="border-b border-card-border bg-[var(--figure-bg)] p-4 sm:p-6"><div className="mb-3 flex flex-wrap gap-2"><span className={selected.evidenceKind === "field_experiment" ? fieldChip : componentChip}>{selected.evidenceKind === "field_experiment" ? <Radio size={12} aria-hidden="true" /> : <FlaskConical size={12} aria-hidden="true" />}{selected.evidenceKind === "field_experiment" ? d.field : d.component}</span><span className={`${chip} border-card-border text-foreground-muted`}>{d.designs[selected.studyDesign as keyof typeof d.designs] ?? d.component}</span></div><h3 className="text-xl font-semibold" aria-live="polite">{steroidogenesisStudyLabel(selected, locale)}</h3><p className="mt-2 text-sm leading-6 text-foreground-muted">{tx(selected.system, locale)}</p></div>
          <div className="p-4 sm:p-6">
            <fieldset><legend className="sr-only">{d.stageLabel}</legend><div className="grid gap-2 sm:grid-cols-3">{d.stages.map((label, index) => <button type="button" key={label} onClick={() => setStage(index)} aria-pressed={stage === index} className={`min-h-11 rounded-lg border px-2 py-2 text-sm font-semibold leading-5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 ${stage === index ? "border-accent bg-accent/10 text-accent" : "border-card-border text-foreground-muted hover:border-accent/50"}`}>{label}</button>)}</div></fieldset>
            <p className="my-5 text-sm leading-6 text-foreground-muted">{[d.structureIntro, d.directionIntro, d.valuesIntro][stage]}</p>
            <StudyDetail study={selected} stage={stage} locale={locale} />
          </div>
        </article>
      </div>}
    </section>
  </div>;
}

function StudyDetail({ study, stage, locale }: { study: SteroidogenesisStudy; stage: number; locale: string }) {
  const d = pickCopy(COPY, locale);
  const family = STEROIDOGENESIS.families.find(item => item.id === study.familyId);
  const finding = <div><h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-accent">{d.finding}</h4><p className="text-sm leading-7">{tx(study.finding, locale)}</p></div>;
  const measurementNotes = [...new Set(study.measuredVariables.map(id => tx(STEROIDOGENESIS.states.find(state => state.id === id)!.description, locale)))];
  return <div className="space-y-6">
    {stage === 1 && <div><h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-foreground-muted">{d.intervention}</h4><p className="text-sm leading-7">{tx(study.intervention, locale)}</p></div>}
    {stage === 1 && finding}
    {stage === 2 && <>
      <div className="rounded-lg border border-card-border p-4"><h4 className="mb-3 text-sm font-semibold">{d.protocol}</h4>{study.fieldProtocol ? <dl className="space-y-3 text-sm">{(["waveform", "carrierFrequency", "fieldStrength", "duration"] as const).map(key => <div key={key} className="grid gap-1 sm:grid-cols-[10rem_1fr]"><dt className="text-foreground-muted">{d[key]}</dt><dd className="break-words leading-6">{study.fieldProtocol?.[key] || d.notRecorded}</dd></div>)}{study.fieldProtocol.notes && <div className="border-t border-card-border pt-3"><dt className="sr-only">{d.details}</dt><dd className="text-xs leading-6 text-foreground-muted">{tx(study.fieldProtocol.notes, locale)}</dd></div>}</dl> : <p className="text-sm leading-6 text-foreground-muted">{d.noField}</p>}</div>
      {finding}
      <div><h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-foreground-muted">{d.data}</h4><p className="text-sm leading-7 text-foreground-muted">{tx(study.dataAvailability, locale)}</p></div>
    </>}
    <div><h4 className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-foreground-muted"><Layers size={13} aria-hidden="true" />{d.measured}</h4><ul className="flex flex-wrap gap-2">{study.measuredVariables.map(id => <li key={id} className="rounded-md border border-card-border px-2 py-1 text-xs leading-5">{steroidogenesisStateLabel(id, locale)}</li>)}</ul>{stage === 0 && <div className="mt-3 space-y-2">{measurementNotes.map(note => <p key={note} className="text-sm leading-6 text-foreground-muted">{note}</p>)}</div>}</div>
    <div className="border-l-2 border-accent/50 pl-4"><h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-accent">{d.scope}</h4><p className="text-sm leading-7">{tx(study.scope, locale)}</p></div>
    <div className="border-t border-card-border pt-4"><h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-foreground-muted">{d.family}</h4><p className="text-sm font-medium">{family ? tx(family.label, locale) : d.familyNote}</p>{family && <p className="mt-2 text-xs leading-6 text-foreground-muted">{tx(family.notes, locale)}</p>}</div>
    <div className="border-t border-card-border pt-4"><h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-foreground-muted">{d.publication}</h4><div className="flex flex-wrap gap-3 text-sm"><StudyCitation referenceId={study.referenceId} locale={locale} />{study.correctionReferenceIds?.map(referenceId => <StudyCitation key={referenceId} referenceId={referenceId} locale={locale} />)}</div></div>
  </div>;
}
