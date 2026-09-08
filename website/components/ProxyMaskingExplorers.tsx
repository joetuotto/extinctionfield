"use client";

import { useId, useState, type ReactNode } from "react";
import { pickCopy } from "@/lib/i18n";
import { StudyCitation } from "@/components/StudyCitation";

const COPY = {
  en: {
    illustration: "Illustrative",
    measured: "Measured data · men",
    chainTitle: "Where does the explanation begin?",
    chainIntro: "An observed behaviour can explain an outcome while its own origin remains outside the analysis. Reveal the earlier steps proposed by BERM.",
    reveal: "Show the earlier steps",
    hide: "Show the measured explanation only",
    chainNodes: [
      { title: "Physical input", detail: "Local fields, their timing and physical structure." },
      { title: "Receiving biology", detail: "A conditional response shaped by the receiver’s state and history." },
      { title: "Behaviour", detail: "In this example, the animal eats more than before." },
      { title: "Observed outcome", detail: "The animal gains weight." },
    ],
    chainShort: "The immediate explanation is that increased eating leads to weight gain. What changed the eating behaviour remains open.",
    chainFull: "The earlier steps show BERM’s proposed conditional chain. The physical-to-biological bridge remains open; the diagram does not establish this whole chain empirically.",
    chainCaption: "A downstream explanation can be valid and still leave an upstream contribution unidentified. Arrows represent the proposed ordering, not measured effect sizes.",
    receiverTitle: "Same cue, different reception",
    receiverIntro: "Keep the cue fixed and change only the receiving state. Compare the strength and timing of the resulting response.",
    receiverOptions: ["Reference state", "Weaker response", "Later response"],
    receiverResults: [
      "The reference state gives a relatively strong, early response.",
      "The cue stays the same; the response is smaller at the same time.",
      "The cue stays the same; a response of the same size arrives later.",
    ],
    receiverLabel: "Receiving state",
    cue: "Unchanged cue",
    response: "Response",
    time: "Elapsed time",
    selected: "Selected state",
    reference: "Reference state",
    receiverCaption: "Both axes are unitless. These chosen curves illustrate reception, not a fitted biological response. A state can reflect timing, prior light exposure or receptor availability; no particular field exposure is assigned to it.",
    interactionTitle: "A chemical effect can depend on the receiving state",
    interactionIntro: "Follow the chemical input along the horizontal axis. Change the context to see how the same input can produce a different response.",
    interactionOptions: ["Reference context", "Stronger effect", "Weaker effect"],
    interactionResults: [
      "In the reference context, response increases along the reference curve.",
      "In this illustrative context, the same chemical input has a larger effect.",
      "In this illustrative context, the same chemical input has a smaller effect.",
    ],
    interactionLabel: "Receiving or field context",
    chemical: "Chemical input",
    interactionCaption: "Both axes are unitless. The contexts stand for possible differences in receiving or field state, with no assigned environmental dose. The curves illustrate conditional effects; they do not imply that all chemical–field combinations amplify one another.",
    activityTitle: "Two activity measures, opposite group order",
    activityIntro: "Compare the order of the two groups in each panel. One measure asks why people exercise; the other records how much they move. Each has its own scale.",
    exercise: "Intentional exercise for health",
    exerciseUnit: "Share reporting this activity (%)",
    steps: "Daily steps",
    stepsUnit: "Age-adjusted mean steps/day",
    amish: "Amish men",
    comparison: "Non-Amish men",
    exerciseSummary: "Amish men: 21%; non-Amish men: 46.9%.",
    stepsSummary: "Amish men: 11,447 steps per day; non-Amish men: 7,605 steps per day.",
    activityCaption: "A question about exercise purpose can miss movement built into everyday life. These observations demonstrate a measurement distinction; the study did not identify an EMF cause.",
    activitySource: "Source: Katz et al. (2012), Journal of Community Health",
  },
  fi: {
    illustration: "Havainnollistus",
    measured: "Mitattu aineisto · miehet",
    chainTitle: "Mistä selitys alkaa?",
    chainIntro: "Havaittu käyttäytyminen voi selittää lopputulosta, vaikka sen oma alkuperä jää tarkastelun ulkopuolelle. Näytä BERM:n ehdottamat aiemmat vaiheet.",
    reveal: "Näytä aiemmat vaiheet",
    hide: "Näytä vain mitattu selitys",
    chainNodes: [
      { title: "Fysikaalinen syöte", detail: "Paikalliset kentät, niiden ajoitus ja fysikaalinen rakenne." },
      { title: "Vastaanottava biologia", detail: "Ehdollinen vaste, jota vastaanottajan tila ja historia muovaavat." },
      { title: "Käyttäytyminen", detail: "Esimerkissä eläin syö aikaisempaa enemmän." },
      { title: "Havaittu seuraus", detail: "Eläimen paino nousee." },
    ],
    chainShort: "Lähiselitys on, että lisääntynyt syöminen johtaa painon nousuun. Se, mikä muutti syömistä, jää avoimeksi.",
    chainFull: "Aiemmat vaiheet näyttävät BERM:n ehdottaman ehdollisen ketjun. Fysiikan ja biologian välinen liitos on avoin; kaavio ei osoita koko ketjua empiirisesti.",
    chainCaption: "Myöhemmän vaiheen selitys voi olla pätevä, vaikka aiemman tekijän osuus jää tunnistamatta. Nuolet kuvaavat ehdotettua järjestystä, eivät mitattuja vaikutuskokoja.",
    receiverTitle: "Sama vihje, erilainen vastaanotto",
    receiverIntro: "Pidä vihje samana ja muuta vain vastaanottajan tilaa. Vertaa syntyvän vasteen voimakkuutta ja ajoitusta.",
    receiverOptions: ["Vertailutila", "Heikompi vaste", "Myöhempi vaste"],
    receiverResults: [
      "Vertailutilassa vaste on suhteellisen voimakas ja varhainen.",
      "Vihje pysyy samana; vaste pienenee mutta ajoitus säilyy.",
      "Vihje pysyy samana; yhtä suuri vaste syntyy myöhemmin.",
    ],
    receiverLabel: "Vastaanottajan tila",
    cue: "Muuttumaton vihje",
    response: "Vaste",
    time: "Kulunut aika",
    selected: "Valittu tila",
    reference: "Vertailutila",
    receiverCaption: "Molemmat akselit ovat yksiköttömiä. Valitut käyrät havainnollistavat vastaanottoa, eivät sovitettua biologista vastetta. Tilaan voivat liittyä ajoitus, aiempi valoaltistus tai reseptorien saatavuus; sitä ei kytketä tiettyyn kenttäaltistukseen.",
    interactionTitle: "Kemiallinen vaikutus voi riippua vastaanottajan tilasta",
    interactionIntro: "Seuraa kemiallista syötettä vaaka-akselilla. Vaihda olosuhdetta ja tarkastele, miten sama syöte voi tuottaa erilaisen vasteen.",
    interactionOptions: ["Vertailutilanne", "Voimistuva vaikutus", "Vaimentuva vaikutus"],
    interactionResults: [
      "Vertailutilanteessa vaste kasvaa vertailukäyrän mukaisesti.",
      "Tässä havainnollistavassa tilanteessa sama kemiallinen syöte vaikuttaa voimakkaammin.",
      "Tässä havainnollistavassa tilanteessa sama kemiallinen syöte vaikuttaa heikommin.",
    ],
    interactionLabel: "Vastaanottajan tai kentän tila",
    chemical: "Kemiallinen syöte",
    interactionCaption: "Molemmat akselit ovat yksiköttömiä. Tilanteet edustavat mahdollisia eroja vastaanottajan tai kentän tilassa ilman määritettyä ympäristöannosta. Käyrät havainnollistavat ehdollisia vaikutuksia; kaikki kemikaali–kenttäyhdistelmät eivät välttämättä vahvista toisiaan.",
    activityTitle: "Kaksi aktiivisuusmittaria, vastakkainen ryhmäjärjestys",
    activityIntro: "Vertaa ryhmien järjestystä kummassakin kuvaajassa. Toinen mittari kysyy liikkumisen tarkoitusta, toinen mittaa liikkeen määrää. Kummallakin on oma asteikkonsa.",
    exercise: "Tarkoituksellinen terveysliikunta",
    exerciseUnit: "Toimintaa ilmoittaneiden osuus (%)",
    steps: "Päivittäiset askeleet",
    stepsUnit: "Ikävakioitu keskiarvo, askelta/vrk",
    amish: "Amish-miehet",
    comparison: "Muut miehet",
    exerciseSummary: "Amish-miehet: 21 %; muut miehet: 46,9 %.",
    stepsSummary: "Amish-miehet: 11 447 askelta päivässä; muut miehet: 7 605 askelta päivässä.",
    activityCaption: "Liikunnan tarkoitusta kysyvä mittari voi ohittaa arkeen sisältyvän liikkeen. Havainnot osoittavat mittarien välisen eron; tutkimus ei tunnistanut EMF-syytä.",
    activitySource: "Lähde: Katz ym. (2012), Journal of Community Health",
  },
};

type Props = { locale: string };
const BLUE = "var(--chart-series-1)";
const AMBER = "var(--chart-series-2)";
const MUTED = "var(--foreground-muted)";
const AXIS = "var(--chart-axis)";
const GRID = "var(--chart-grid)";

function Figure({ title, intro, badge, children, caption }: {
  title: string; intro: string; badge: string; children: ReactNode; caption: ReactNode;
}) {
  const id = useId();
  return (
    <figure aria-labelledby={id} className="my-6 min-w-0 space-y-5 rounded-xl border border-border bg-[var(--figure-bg)] p-4 sm:p-6">
      <div className="space-y-2">
        <span className="text-xs font-semibold uppercase tracking-wider text-foreground-muted">{badge}</span>
        <h3 id={id} className="font-serif text-xl leading-snug sm:text-2xl">{title}</h3>
        <p className="text-base leading-relaxed text-foreground-muted">{intro}</p>
      </div>
      {children}
      <figcaption className="border-t border-border pt-4 text-base leading-relaxed text-foreground-muted">{caption}</figcaption>
    </figure>
  );
}

function Options({ label, options, selected, onSelect }: {
  label: string; options: string[]; selected: number; onSelect: (index: number) => void;
}) {
  return (
    <div role="group" aria-label={label} className="flex flex-wrap gap-2">
      {options.map((option, index) => (
        <button key={option} type="button" aria-pressed={selected === index} onClick={() => onSelect(index)}
          className={`min-h-11 rounded-lg border px-3 py-2 text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background ${selected === index ? "border-accent bg-accent/10 text-accent" : "border-border bg-background text-foreground hover:border-accent"}`}>
          {option}
        </button>
      ))}
    </div>
  );
}

function Key({ label, color, dashed = false }: { label: string; color: string; dashed?: boolean }) {
  return <span className="inline-flex items-center gap-2 text-sm text-foreground-muted"><span aria-hidden="true" style={{ borderColor: color, borderTopStyle: dashed ? "dashed" : "solid" }} className="w-6 shrink-0 border-t-[3px]" />{label}</span>;
}

export function MaskingChainDiagram({ locale }: Props) {
  const c = pickCopy(COPY, locale);
  const [expanded, setExpanded] = useState(false);
  const id = useId();
  const start = expanded ? 0 : 2;
  return (
    <Figure title={c.chainTitle} intro={c.chainIntro} badge={c.illustration} caption={c.chainCaption}>
      <button type="button" aria-pressed={expanded} aria-expanded={expanded} aria-controls={id} onClick={() => setExpanded(!expanded)}
        className="min-h-11 self-start rounded-lg border border-accent bg-accent/10 px-4 py-2 text-sm font-medium text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent">
        {expanded ? c.hide : c.reveal}
      </button>
      <ol id={id} start={start + 1} className="space-y-6">
        {c.chainNodes.slice(start).map((node, index) => (
          <li key={node.title} className={`relative grid gap-2 rounded-lg border p-4 sm:grid-cols-[12rem_minmax(0,1fr)] sm:items-center sm:gap-5 ${start + index < 2 ? "border-dashed border-accent/60 bg-accent/5" : "border-border bg-background"}`}>
            <div className="mb-2 flex items-center gap-3">
              <span aria-hidden="true" className="flex size-7 shrink-0 items-center justify-center rounded-full border border-border text-sm tabular-nums text-foreground-muted">{start + index + 1}</span>
              <h4 className="font-semibold leading-snug">{node.title}</h4>
              {start + index < 3 && <span aria-hidden="true" className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-lg leading-6 text-foreground-muted">↓</span>}
            </div>
            <p className="text-base leading-relaxed text-foreground-muted">{node.detail}</p>
          </li>
        ))}
      </ol>
      <p aria-live="polite" className="text-base leading-relaxed">{expanded ? c.chainFull : c.chainShort}</p>
    </Figure>
  );
}

// Coordinates are chosen for explanation only; they are not experimental data.
function curvePoints(value: (x: number) => number) {
  return Array.from({ length: 121 }, (_, i) => {
    const x = i / 120;
    return `${(36 + 268 * x).toFixed(2)},${(168 - 130 * value(x)).toFixed(2)}`;
  }).join(" ");
}

function Plot({ title, description, badge, xLabel, yLabel, children }: {
  title: string; description: string; badge: string; xLabel: string; yLabel: string; children: ReactNode;
}) {
  const id = useId();
  return (
    <svg viewBox="0 0 320 216" role="img" aria-labelledby={`${id}-title`} aria-describedby={`${id}-desc`} className="mx-auto block w-full max-w-xl overflow-visible" style={{ fontFamily: "inherit" }}>
      <title id={`${id}-title`}>{title}</title>
      <desc id={`${id}-desc`}>{description}</desc>
      <g fill={MUTED} fontSize="13">
        <text x="36" y="18">{yLabel}</text>
        <text x="304" y="18" textAnchor="end" fontSize="11">{badge}</text>
        <text x="26" y="172" textAnchor="end">0</text>
        <text x="26" y="42" textAnchor="end">1</text>
        <text x="36" y="187" textAnchor="middle">0</text>
        <text x="304" y="187" textAnchor="middle">1</text>
        <text x="170" y="208" textAnchor="middle" fontSize="14">{xLabel}</text>
      </g>
      <path d="M36 38H304 M36 103H304" stroke={GRID} fill="none" />
      <path d="M36 38V168H304" stroke={AXIS} fill="none" />
      {children}
    </svg>
  );
}

export function ReceiverStateExplorer({ locale }: Props) {
  const c = pickCopy(COPY, locale);
  const [state, setState] = useState(0);
  const response = (x: number, selected: number) => {
    if (x < 0.18) return 0;
    const elapsed = x - 0.18;
    const riseTime = selected === 2 ? 0.36 : 0.16;
    const amplitude = selected === 1 ? 0.3 : 0.8;
    return amplitude * (elapsed / riseTime) ** 3 * Math.exp(3 * (1 - elapsed / riseTime));
  };
  return (
    <Figure title={c.receiverTitle} intro={c.receiverIntro} badge={c.illustration} caption={c.receiverCaption}>
      <Options label={c.receiverLabel} options={c.receiverOptions} selected={state} onSelect={setState} />
      <Plot title={`${c.receiverTitle}: ${c.receiverOptions[state]}`} description={`${c.cue}. ${c.receiverResults[state]} ${c.receiverCaption}`} badge={c.illustration} xLabel={c.time} yLabel={c.response}>
        <path data-cue="fixed" d="M36 168H78V64H84V168H304" fill="none" stroke={AMBER} strokeWidth="2" />
        {state !== 0 && <polyline points={curvePoints((x) => response(x, 0))} fill="none" stroke={MUTED} strokeWidth="2" strokeDasharray="5 5" />}
        <polyline data-curve="response" points={curvePoints((x) => response(x, state))} fill="none" stroke={BLUE} strokeWidth="3" strokeLinejoin="round" />
      </Plot>
      <div className="flex flex-wrap gap-x-5 gap-y-2"><Key label={c.cue} color={AMBER} /><Key label={c.selected} color={BLUE} />{state !== 0 && <Key label={c.reference} color={MUTED} dashed />}</div>
      <p aria-live="polite" className="text-base leading-relaxed">{c.receiverResults[state]}</p>
    </Figure>
  );
}

export function InteractionExplorer({ locale }: Props) {
  const c = pickCopy(COPY, locale);
  const [state, setState] = useState(0);
  const effect = (x: number, selected: number) => 0.06 + [0.55, 0.85, 0.25][selected] * x ** 1.3;
  return (
    <Figure title={c.interactionTitle} intro={c.interactionIntro} badge={c.illustration} caption={c.interactionCaption}>
      <Options label={c.interactionLabel} options={c.interactionOptions} selected={state} onSelect={setState} />
      <Plot title={`${c.interactionTitle}: ${c.interactionOptions[state]}`} description={`${c.interactionResults[state]} ${c.interactionCaption}`} badge={c.illustration} xLabel={c.chemical} yLabel={c.response}>
        {state !== 0 && <polyline points={curvePoints((x) => effect(x, 0))} fill="none" stroke={MUTED} strokeWidth="2" strokeDasharray="5 5" />}
        <polyline data-curve="chemical-response" points={curvePoints((x) => effect(x, state))} fill="none" stroke={BLUE} strokeWidth="3" strokeLinejoin="round" />
      </Plot>
      <div className="flex flex-wrap gap-x-5 gap-y-2"><Key label={c.selected} color={BLUE} />{state !== 0 && <Key label={c.reference} color={MUTED} dashed />}</div>
      <p aria-live="polite" className="text-base leading-relaxed">{c.interactionResults[state]}</p>
    </Figure>
  );
}

function ActivityPanel({ title, unit, labels, values, maximum, percentage, summary, locale }: {
  title: string; unit: string; labels: string[]; values: number[]; maximum: number; percentage: boolean; summary: string; locale: string;
}) {
  const id = useId();
  const format = new Intl.NumberFormat(locale === "fi" ? "fi-FI" : "en-US", { maximumFractionDigits: 1 });
  return (
    <div className="min-w-0 rounded-lg border border-border bg-background p-4">
      <h4 className="font-semibold leading-snug">{title}</h4>
      <p className="mt-1 text-sm text-foreground-muted">{unit}</p>
      <svg viewBox="0 0 320 194" role="img" aria-labelledby={`${id}-title`} aria-describedby={`${id}-desc`} className="mt-4 block w-full" style={{ fontFamily: "inherit" }}>
        <title id={`${id}-title`}>{title}</title>
        <desc id={`${id}-desc`}>{summary} {unit}. 0–{format.format(maximum)}.</desc>
        {[0, 0.5, 1].map((fraction) => <line key={fraction} x1={8 + 304 * fraction} y1="26" x2={8 + 304 * fraction} y2="164" stroke={GRID} />)}
        {values.map((value, index) => (
          <g key={labels[index]}>
            <text x="8" y={18 + index * 78} fill={MUTED} fontSize="16">{labels[index]}</text>
            <text x="312" y={18 + index * 78} textAnchor="end" fill="var(--foreground)" fontSize="16" fontWeight="600">{format.format(value)}{percentage ? " %" : ""}</text>
            <rect x="8" y={30 + index * 78} width={304 * value / maximum} height="28" rx="3" fill={index === 0 ? BLUE : AMBER} />
          </g>
        ))}
        <line x1="8" x2="312" y1="164" y2="164" stroke={AXIS} />
        {[0, 0.5, 1].map((fraction) => <text key={fraction} x={8 + 304 * fraction} y="187" textAnchor={fraction === 0 ? "start" : fraction === 1 ? "end" : "middle"} fill={MUTED} fontSize="14">{format.format(maximum * fraction)}{percentage ? " %" : ""}</text>)}
      </svg>
    </div>
  );
}

export function ActivityProxyChart({ locale }: Props) {
  const c = pickCopy(COPY, locale);
  return (
    <Figure title={c.activityTitle} intro={c.activityIntro} badge={c.measured} caption={<>{c.activityCaption}<span className="mt-2 block"><StudyCitation referenceId="katz2012_amish_activity" locale={locale} label={c.activitySource} /></span></>}>
      <div className="grid min-w-0 gap-4 md:grid-cols-2">
        <ActivityPanel title={c.exercise} unit={c.exerciseUnit} labels={[c.amish, c.comparison]} values={[21, 46.9]} maximum={100} percentage summary={c.exerciseSummary} locale={locale} />
        <ActivityPanel title={c.steps} unit={c.stepsUnit} labels={[c.amish, c.comparison]} values={[11447, 7605]} maximum={12000} percentage={false} summary={c.stepsSummary} locale={locale} />
      </div>
    </Figure>
  );
}
