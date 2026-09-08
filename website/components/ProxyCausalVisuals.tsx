"use client";

import { useId, useState, type ReactNode } from "react";
import { pickCopy } from "@/lib/i18n";

const COPY = {
  en: {
    badge: "Causal illustration",
    curveTitle: "Similar curves can conceal different causal paths",
    curveIntro: "The outcome and its proxy move together. Show BERM’s field pathway, then switch the causal case: the same curves can have different explanations.",
    caseLabel: "Causal case",
    cases: ["Shared change", "Intermediate step"],
    reveal: "Show BERM’s field pathway",
    hide: "Hide BERM’s field pathway",
    outcome: "Outcome",
    proxies: ["Proxy: technology use", "Proxy: sleep or appetite"],
    field: "BERM’s field pathway",
    progress: "Illustrative progression",
    value: "Relative value",
    unitless: "Both axes are unitless.",
    curveDescription: "Chosen curves show a similar progression in the outcome and its proxy. Their shape stays fixed when the causal case changes.",
    hiddenStatus: "The outcome and proxy are visible. BERM’s field pathway is hidden.",
    shownStatus: "BERM’s field pathway is now visible alongside the unchanged outcome and proxy.",
    chainTitle: "The causal structure behind the curves",
    technology: "Technological development",
    proxyBranch: "Proxy branch",
    fieldBranch: "Field branch",
    technologyProxy: "Technology-use indicator",
    receiving: "Receiving biology",
    intermediary: "Sleep or appetite",
    conditional: "Conditional biological link",
    parallel: "Moves alongside the field branch; no EMF → proxy arrow is assumed in this case.",
    observedAssociation: "The proxy and outcome change together. This association alone does not identify what links them.",
    commonSummary: "In this BERM pathway, technological development changes the proxy and the field in parallel. The effect passes through field → reception → outcome. The proxy follows the outcome while leaving its biological origin unidentified.",
    mediatorSummary: "In BERM’s field → reception → sleep or appetite → outcome pathway, the intermediate step transmits part of the field effect. Explaining the outcome through that step alone leaves its origin outside the analysis.",
    curveCaption: "The curve values are chosen to illustrate BERM’s causal premises. Both axes are unitless; this is not historical data or a fitted dose–response curve. The two cases distinguish a correlated proxy from an intermediate that transmits the effect.",
    levelsTitle: "From separate explanations to a shared structure",
    levelsIntro: "Compare the same observation levels in two views. BERM connects them through defined component mechanisms, while each level retains its own measurements.",
    views: ["Separate proximate explanations", "BERM’s connecting structure"],
    viewLabel: "Explanatory structure",
    separateDescription: "Five observation levels are displayed separately, each with its own proxy or observation. This view leaves their relationships open.",
    connectedDescription: "Lindgren’s 2025 geometry is connected through BERM’s conditional receiving biology to hormonal and sensory processes, behaviour and population or ecological-community outcomes. A later feedback path returns to the environment.",
    observation: "Proxy or observation",
    levels: [
      { title: "Physical environment", detail: "Local fields, their timing and physical structure.", proxy: "Technology use or electricity use" },
      { title: "Receiving biology", detail: "State, timing, availability and prior exposure.", proxy: "A clock-phase or protein measurement" },
      { title: "Hormonal or sensory process", detail: "Signal reception and the resulting functional response.", proxy: "Hormone concentration or sensory performance" },
      { title: "Behaviour", detail: "Eating, movement, caregiving or a reported choice.", proxy: "Diet, exercise or reported reasons" },
      { title: "Population or ecological community", detail: "Outcomes accumulated across individuals and time.", proxy: "Birth rates, abundance or community composition" },
    ],
    geometryTitle: "Lindgren 2025: geometry",
    geometryDetail: "A geometric perturbation provides BERM’s physical starting point.",
    geometryTag: "Derived geometry",
    receivingTag: "Conditional BERM bridge",
    biologyTag: "Imported empirical biology",
    assemblyTag: "Conditional composition",
    calibrationTag: "Open endpoint calibration",
    feedbackTitle: "Feedback into the later environment",
    feedbackText: "Behaviour, technology use and ecological change can reshape subsequent conditions. This is a later feedback path, not a cause of an earlier exposure.",
    feedbackDestination: "Subsequent physical and social environment",
    separateSummary: "Each proximate explanation covers its own stage. Their separation leaves the causes of their changes and the connections between levels unresolved.",
    connectedSummary: "BERM connects the levels through receiving biology, signalling and aggregation across individuals. Reusing these specified mechanisms explains the relationships that the separate view leaves open.",
    parsimony: "Parsimony here means reusing specified component mechanisms, not fitting every outcome with one free coefficient.",
    uncertainty: "Four distinct categories remain: Lindgren-derived geometry; imported empirical biology; BERM’s conditional mechanisms; and open calibration gaps. Lindgren’s geometric result does not itself derive a biological response.",
  },
  fi: {
    badge: "Kausaalinen havainnollistus",
    curveTitle: "Samanlaiset käyrät voivat peittää erilaiset syyketjut",
    curveIntro: "Seuraus ja sitä kuvaava proksi muuttuvat rinnakkain. Näytä BERM:n kenttähaara ja vaihda sitten kausaalista tapausta: samat käyrät voivat saada erilaisen selityksen.",
    caseLabel: "Kausaalinen tapaus",
    cases: ["Yhteinen muutos", "Välivaihe"],
    reveal: "Näytä BERM:n kenttähaara",
    hide: "Piilota BERM:n kenttähaara",
    outcome: "Seuraus",
    proxies: ["Proksi: teknologian käyttö", "Proksi: uni tai ruokahalu"],
    field: "BERM:n kenttähaara",
    progress: "Havainnollistava etenemä",
    value: "Suhteellinen arvo",
    unitless: "Molemmat akselit ovat yksiköttömiä.",
    curveDescription: "Valitut käyrät näyttävät seurauksen ja proksin samankaltaisen etenemisen. Niiden muoto säilyy, kun kausaalinen tapaus vaihtuu.",
    hiddenStatus: "Seuraus ja proksi näkyvät. BERM:n kenttähaara on piilossa.",
    shownStatus: "BERM:n kenttähaara näkyy nyt muuttumattomien seurauksen ja proksin rinnalla.",
    chainTitle: "Käyrien taustalla oleva syyrakenne",
    technology: "Teknologinen kehitys",
    proxyBranch: "Proksihaara",
    fieldBranch: "Kenttähaara",
    technologyProxy: "Teknologian käytön mittari",
    receiving: "Vastaanottava biologia",
    intermediary: "Uni tai ruokahalu",
    conditional: "Ehdollinen biologinen liitos",
    parallel: "Muuttuu kenttähaaran rinnalla; tässä tapauksessa ei oleteta nuolta EMF → proksi.",
    observedAssociation: "Proksi ja seuraus muuttuvat yhdessä. Yhteys ei yksin tunnista niitä yhdistävää tekijää.",
    commonSummary: "Tässä BERM:n reitissä teknologinen kehitys muuttaa proksia ja kenttää rinnakkain. Vaikutus kulkee ketjua kenttä → vastaanotto → seuraus. Proksi seuraa lopputulosta ja jättää sen biologisen alkuperän tunnistamatta.",
    mediatorSummary: "BERM:n ketjussa kenttä → vastaanotto → uni tai ruokahalu → seuraus välivaihe välittää osan kenttävaikutuksesta. Lopputuloksen selittäminen pelkällä välivaiheella jättää sen alkuperän tarkastelun ulkopuolelle.",
    curveCaption: "Käyrien arvot havainnollistavat BERM:n kausaalisia premissejä. Molemmat akselit ovat yksiköttömiä; kyseessä ei ole historiallinen aineisto tai sovitettu annos–vastekäyrä. Tapaukset erottavat korreloivan proksin vaikutusta välittävästä vaiheesta.",
    levelsTitle: "Erillisistä selityksistä yhteiseen rakenteeseen",
    levelsIntro: "Vertaa samoja havaintotasoja kahdessa näkymässä. BERM yhdistää ne määriteltyjen osamekanismien kautta, ja kullakin tasolla säilyvät omat mittarinsa.",
    views: ["Erilliset lähiselitykset", "BERM:n yhdistävä rakenne"],
    viewLabel: "Selitysrakenne",
    separateDescription: "Viisi havaintotasoa esitetään erillisinä, kullakin oma proksi tai havainto. Niiden keskinäiset yhteydet jäävät tässä näkymässä avoimiksi.",
    connectedDescription: "Lindgrenin vuoden 2025 geometria liittyy BERM:n ehdollisen vastaanottavan biologian kautta hormoni- ja aistiprosesseihin, käyttäytymiseen sekä populaation tai eliöyhteisön seurauksiin. Myöhempi palautereitti suuntautuu ympäristöön.",
    observation: "Proksi tai havainto",
    levels: [
      { title: "Fysikaalinen ympäristö", detail: "Paikalliset kentät, niiden ajoitus ja fysikaalinen rakenne.", proxy: "Teknologian tai sähkön käyttö" },
      { title: "Vastaanottava biologia", detail: "Tila, ajoitus, saatavuus ja aiempi altistus.", proxy: "Kellovaiheen tai proteiinin mittaus" },
      { title: "Hormoni- tai aistiprosessi", detail: "Signaalin vastaanotto ja siitä syntyvä toiminnallinen vaste.", proxy: "Hormonipitoisuus tai aistisuoritus" },
      { title: "Käyttäytyminen", detail: "Syöminen, liikkuminen, hoiva tai kerrottu valinta.", proxy: "Ruokavalio, liikunta tai kerrotut syyt" },
      { title: "Populaatio tai eliöyhteisö", detail: "Yksilöiden ja ajan yli kertyvät seuraukset.", proxy: "Syntyvyys, runsaus tai yhteisön koostumus" },
    ],
    geometryTitle: "Lindgren 2025: geometria",
    geometryDetail: "Geometrinen perturbaatio antaa BERM:n fysikaalisen lähtökohdan.",
    geometryTag: "Johdettu geometria",
    receivingTag: "Ehdollinen BERM-liitos",
    biologyTag: "Tuotu empiirinen biologia",
    assemblyTag: "Ehdollinen kokoaminen",
    calibrationTag: "Avoin päätepistekalibrointi",
    feedbackTitle: "Palaute myöhempään ympäristöön",
    feedbackText: "Käyttäytyminen, teknologian käyttö ja ekologinen muutos voivat muovata seuraavia olosuhteita. Tämä on myöhempi palautereitti, ei aiemman altistuksen syy.",
    feedbackDestination: "Myöhempi fysikaalinen ja sosiaalinen ympäristö",
    separateSummary: "Kukin lähiselitys kattaa oman vaiheensa. Niiden erillisyys jättää niiden muutosten syyt ja tasojen väliset yhteydet avaamatta.",
    connectedSummary: "BERM yhdistää tasot vastaanottobiologian, signaloinnin ja yksilövasteiden kertymisen kautta. Näiden määriteltyjen mekanismien käyttö avaa suhteet, jotka erillinen näkymä jättää selittämättä.",
    parsimony: "Parsimonia tarkoittaa tässä määriteltyjen osamekanismien uudelleenkäyttöä, ei kaikkien seurausten sovittamista yhdellä vapaalla kertoimella.",
    uncertainty: "Neljä luokkaa pysyvät erillisinä: Lindgrenistä johdettu geometria, tuotu empiirinen biologia, BERM:n ehdolliset mekanismit ja avoimet kalibrointiaukot. Lindgrenin geometrinen tulos ei itsessään johda biologista vastetta.",
  },
};

type Props = { locale: string };
type Copy = typeof COPY.en;
const BLUE = "var(--chart-series-1)";
const AMBER = "var(--chart-series-2)";
const INK = "var(--foreground)";
const MUTED = "var(--foreground-muted)";
const CONTROL = "min-h-11 rounded-lg border px-3 py-2 text-sm font-medium leading-snug focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background";

function Choice({ label, options, value, onChange }: { label: string; options: string[]; value: number; onChange: (value: number) => void }) {
  return <div role="group" aria-label={label} className="flex flex-wrap gap-2">
    {options.map((option, index) => <button key={option} type="button" aria-pressed={value === index} onClick={() => onChange(index)} className={`${CONTROL} ${value === index ? "border-accent bg-accent/10 text-accent" : "border-border bg-background text-foreground hover:border-accent"}`}>{option}</button>)}
  </div>;
}

function Node({ children, tone = "neutral", detail }: { children: ReactNode; tone?: "neutral" | "proxy" | "field"; detail?: string }) {
  return <div className="min-w-0 rounded-lg border bg-background p-3" style={{ borderColor: tone === "proxy" ? AMBER : tone === "field" ? BLUE : "var(--border)" }}>
    <p className="text-base font-medium leading-snug">{children}</p>
    {detail && <p className="mt-1 text-sm leading-relaxed text-foreground-muted">{detail}</p>}
  </div>;
}

function Arrow({ label }: { label?: string }) {
  return <div className="flex min-h-8 items-center justify-center gap-2 py-1 text-foreground-muted">
    <span aria-hidden="true" className="text-xl leading-none">↓</span>
    {label && <span className="max-w-[13rem] text-sm leading-snug">{label}</span>}
  </div>;
}

function Key({ label, color, pattern }: { label: string; color: string; pattern: "solid" | "dashed" | "dotted" }) {
  return <span className="inline-flex items-center gap-2 text-sm leading-snug text-foreground-muted"><span aria-hidden="true" className="w-7 shrink-0 border-t-[3px]" style={{ borderColor: color, borderTopStyle: pattern }} />{label}</span>;
}

// These coordinates illustrate overlapping trends; no empirical fit is implied.
function points(series: "outcome" | "proxy" | "field") {
  return Array.from({ length: 101 }, (_, i) => {
    const x = i / 100;
    const bend = Math.sin(2 * Math.PI * x);
    const value = series === "outcome" ? 0.17 + 0.57 * x + 0.065 * bend
      : series === "proxy" ? 0.2 + 0.53 * x + 0.065 * Math.sin(2 * Math.PI * x + 0.36)
        : 0.1 + 0.72 * x + 0.035 * Math.sin(2 * Math.PI * x + 0.7);
    return `${(36 + 268 * x).toFixed(2)},${(171 - 132 * value).toFixed(2)}`;
  }).join(" ");
}

function CausalChain({ copy: c, mode, showField }: { copy: Copy; mode: number; showField: boolean }) {
  const id = useId();
  return <div aria-labelledby={id} className="space-y-3 rounded-lg border border-border bg-background/50 p-3 sm:p-4">
    <h4 id={id} className="text-base font-semibold">{c.chainTitle}</h4>
    {mode === 0 ? <>
      <Node>{c.technology}</Node>
      <div className={`grid gap-4 ${showField ? "sm:grid-cols-2" : ""}`}>
        <div role="group" aria-label={c.proxyBranch}>
          <Arrow />
          <Node tone="proxy">{c.technologyProxy}</Node>
          <p className="mt-3 text-sm leading-relaxed text-foreground-muted">{showField ? c.parallel : c.observedAssociation}</p>
          {!showField && <div className="mt-3"><Node>{c.outcome}</Node></div>}
        </div>
        {showField && <div role="group" aria-label={c.fieldBranch}>
          <Arrow />
          <Node tone="field">{c.field}</Node>
          <Arrow label={c.conditional} />
          <Node>{c.receiving}</Node>
          <Arrow />
          <Node>{c.outcome}</Node>
        </div>}
      </div>
    </> : <div>
      {showField && <>
        <Node tone="field">{c.field}</Node>
        <Arrow label={c.conditional} />
        <Node>{c.receiving}</Node>
        <Arrow />
      </>}
      <Node tone="proxy">{c.intermediary}</Node>
      <Arrow />
      <Node>{c.outcome}</Node>
    </div>}
    <p className="text-base leading-relaxed text-foreground-muted">{mode === 0 ? c.commonSummary : c.mediatorSummary}</p>
  </div>;
}

export function ProxyMaskingCurveExplorer({ locale }: Props) {
  const c = pickCopy(COPY, locale);
  const [mode, setMode] = useState(0);
  const [showField, setShowField] = useState(false);
  const id = useId();
  return <figure aria-labelledby={`${id}-heading`} aria-describedby={`${id}-caption`} className="my-6 min-w-0 space-y-5 rounded-xl border border-border bg-[var(--figure-bg)] p-4 sm:p-6">
    <div className="space-y-2">
      <p className="text-xs font-semibold uppercase tracking-wider text-foreground-muted">{c.badge}</p>
      <h3 id={`${id}-heading`} className="font-serif text-xl leading-snug sm:text-2xl">{c.curveTitle}</h3>
      <p className="text-base leading-relaxed text-foreground-muted">{c.curveIntro}</p>
    </div>
    <Choice label={c.caseLabel} options={c.cases} value={mode} onChange={setMode} />
    <button type="button" aria-pressed={showField} aria-controls={`${id}-plot ${id}-chain`} onClick={() => setShowField(!showField)} className={`${CONTROL} border-accent bg-accent/10 text-accent`}>{showField ? c.hide : c.reveal}</button>
    <svg id={`${id}-plot`} viewBox="0 0 320 224" role="img" aria-labelledby={`${id}-title`} aria-describedby={`${id}-desc`} className="mx-auto block w-full max-w-xl" style={{ fontFamily: "inherit" }}>
      <title id={`${id}-title`}>{`${c.curveTitle}: ${c.cases[mode]}`}</title>
      <desc id={`${id}-desc`}>{`${c.curveDescription} ${showField ? c.shownStatus : c.hiddenStatus} ${c.unitless}`}</desc>
      <g fill={MUTED} fontSize="14">
        <text x="36" y="20">{c.value}</text>
        <text x="25" y="43" textAnchor="end">1</text>
        <text x="25" y="176" textAnchor="end">0</text>
        <text x="36" y="192" textAnchor="middle">0</text>
        <text x="304" y="192" textAnchor="middle">1</text>
        <text x="170" y="216" textAnchor="middle">{c.progress}</text>
      </g>
      <path d="M36 39H304 M36 105H304" stroke="var(--chart-grid)" fill="none" />
      <path d="M36 39V171H304" stroke="var(--chart-axis)" fill="none" />
      <polyline data-curve="outcome" points={points("outcome")} fill="none" stroke={INK} strokeWidth="3.2" strokeLinejoin="round" />
      <polyline data-curve="proxy" points={points("proxy")} fill="none" stroke={AMBER} strokeWidth="3" strokeDasharray="7 4" strokeLinejoin="round" />
      {showField && <polyline data-curve="field" points={points("field")} fill="none" stroke={BLUE} strokeWidth="3" strokeDasharray="2 5" strokeLinecap="round" strokeLinejoin="round" />}
    </svg>
    <div className="flex flex-wrap gap-x-5 gap-y-3">
      <Key label={c.outcome} color={INK} pattern="solid" />
      <Key label={c.proxies[mode]} color={AMBER} pattern="dashed" />
      {showField && <Key label={c.field} color={BLUE} pattern="dotted" />}
    </div>
    <p className="text-sm text-foreground-muted">{c.unitless}</p>
    <p aria-live="polite" className="text-base leading-relaxed">{showField ? c.shownStatus : c.hiddenStatus}</p>
    <div id={`${id}-chain`}><CausalChain copy={c} mode={mode} showField={showField} /></div>
    <figcaption id={`${id}-caption`} className="border-t border-border pt-4 text-base leading-relaxed text-foreground-muted">{c.curveCaption}</figcaption>
  </figure>;
}

export function ExplanatoryLevelsDiagram({ locale }: Props) {
  const c = pickCopy(COPY, locale);
  const [view, setView] = useState(0);
  const connected = view === 1;
  const id = useId();
  const tags = [c.geometryTag, c.receivingTag, c.biologyTag, c.assemblyTag, c.calibrationTag];
  return <figure aria-labelledby={`${id}-heading`} aria-describedby={`${id}-description ${id}-caption`} className="my-6 min-w-0 space-y-5 rounded-xl border border-border bg-[var(--figure-bg)] p-4 sm:p-6">
    <div className="space-y-2">
      <p className="text-xs font-semibold uppercase tracking-wider text-foreground-muted">{c.badge}</p>
      <h3 id={`${id}-heading`} className="font-serif text-xl leading-snug sm:text-2xl">{c.levelsTitle}</h3>
      <p className="text-base leading-relaxed text-foreground-muted">{c.levelsIntro}</p>
    </div>
    <Choice label={c.viewLabel} options={c.views} value={view} onChange={setView} />
    <p id={`${id}-description`} className="sr-only">{connected ? c.connectedDescription : c.separateDescription}</p>
    <ol className={connected ? "space-y-0" : "space-y-3"}>
      {c.levels.map((level, index) => <li key={level.title} data-level={index}>
        {connected && index > 0 && <Arrow label={index === 1 ? c.conditional : undefined} />}
        <div className={`grid min-w-0 gap-3 rounded-lg border bg-background p-4 sm:grid-cols-[minmax(0,1fr)_minmax(0,0.8fr)] ${connected && index === 1 ? "border-dashed border-accent" : "border-border"}`}>
          <div className="min-w-0">
            {connected && <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-accent">{tags[index]}</p>}
            <h4 className="text-base font-semibold leading-snug">{connected && index === 0 ? c.geometryTitle : level.title}</h4>
            <p className="mt-1 text-sm leading-relaxed text-foreground-muted">{connected && index === 0 ? c.geometryDetail : level.detail}</p>
          </div>
          <div className="min-w-0 border-l-2 pl-3" style={{ borderColor: AMBER }}>
            <p className="text-xs font-medium text-foreground-muted">{c.observation}</p>
            <p className="mt-1 text-base leading-snug">{level.proxy}</p>
          </div>
        </div>
      </li>)}
    </ol>
    {connected && <div data-feedback="later-environment" className="rounded-lg border border-dashed border-accent/60 bg-accent/5 p-4">
      <h4 className="text-base font-semibold">{c.feedbackTitle}</h4>
      <p className="mt-2 text-base leading-relaxed text-foreground-muted">{c.feedbackText}</p>
      <Arrow />
      <p className="text-base font-medium">{c.feedbackDestination}</p>
    </div>}
    <p aria-live="polite" className="text-base leading-relaxed">{connected ? c.connectedSummary : c.separateSummary}</p>
    <figcaption id={`${id}-caption`} className="space-y-3 border-t border-border pt-4 text-base leading-relaxed text-foreground-muted">
      <p className="font-medium text-foreground">{c.parsimony}</p>
      <p>{c.uncertainty}</p>
    </figcaption>
  </figure>;
}
