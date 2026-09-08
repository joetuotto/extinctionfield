"use client";

import { useId, useState } from "react";
import { StudyCitation } from "@/components/StudyCitation";
import { pickCopy } from "@/lib/i18n";

const COPY = {
  en: {
    processTitle: "A wish becomes a birth through several conditions",
    processBadge: "Process illustration · BERM’s conditional synthesis",
    processLead: "Receiving state enters two different branches: motivation and reproductive capacity. Practical opportunities and interventions enter at their own points in the process.",
    receiver: "Field input → receiving state",
    receiverScope: "BERM’s conditional biological link",
    branches: [
      { title: "Motivation", text: "Relates to wanting a child and beginning an attempt." },
      { title: "Reproductive capacity", text: "Relates to establishing and sustaining a pregnancy." },
    ],
    stages: [
      { title: "Wanting a child", text: "Experienced desire, expectation and goals.", input: "Motivational state" },
      { title: "Conditions and timing", text: "Practical opportunities, demands and the chosen time.", input: "Resources and policy" },
      { title: "Attempt or treatment", text: "Trying to conceive or undertaking fertility treatment.", input: "Contraception and treatment" },
      { title: "Pregnancy and birth", text: "Conception, pregnancy progression and a live birth.", input: "Biological capacity" },
    ],
    controls: "Highlight a part of the process",
    choices: [
      { label: "Timing", text: "Timing changes when an attempt takes place and how much reproductive time remains. It connects decisions with age-dependent biological conditions." },
      { label: "Conditions", text: "Income, care services and flexibility change practical opportunities, demands and timing. Their effects enter a process that also includes motivation and biological capacity." },
      { label: "Capacity", text: "In BERM’s receiving-state pathway, the same biological state affects motivation and capacity through distinct mechanisms. Wanting a child does not itself determine whether a pregnancy begins or continues." },
      { label: "Treatment", text: "Treatment acts on specified stages and can compensate for particular constraints. A successful outcome after assistance does not measure how the unassisted pathway would have functioned." },
    ],
    conclusion: "Changing one condition does not restore every condition in the chain.",
    processCaption: "This illustrates a pathway from wanting a child to a birth; pregnancies can also begin without prior intention. Contraception affects pregnancy occurrence, and resources also affect demands and timing. Selection only highlights a pathway. BERM’s historical field contribution remains to be calibrated.",
    chartTitle: "Earlier expectations and later family size",
    chartBadge: "Measured follow-up · the same individuals",
    chartLead: "Personal expected family size at about age 24 compared with the same person’s number of children at ages 41–50 in 2006. US NLSY79 follow-up; percentages weighted with 2006 sampling weights.",
    groups: ["Women", "Men"],
    categories: ["Fewer than expected", "As many as expected", "More than expected"],
    sample: "Sample",
    expectation: "Expected family size includes children already born plus the additional children the person expected to have. Birth cohorts: 1957–1964.",
    chartCaption: "An expectation alone does not determine the later outcome. This comparison does not identify how much of the difference reflects changing goals, practical constraints or biological capacity; it does not measure an EMF effect.",
    source: "Morgan & Rackin 2010 · Table 2A",
  },
  fi: {
    processTitle: "Toive toteutuu syntymäksi useiden ehtojen kautta",
    processBadge: "Prosessihavainnollistus · BERM:n ehdollinen synteesi",
    processLead: "Vastaanottotila liittyy kahteen eri haaraan: motivaatioon ja lisääntymiskykyyn. Käytännön mahdollisuudet ja interventiot tulevat mukaan omissa kohdissaan.",
    receiver: "Kenttäsyöte → vastaanottotila",
    receiverScope: "BERM:n ehdollinen biologinen liitos",
    branches: [
      { title: "Motivaatio", text: "Liittyy lapsitoiveeseen ja yrityksen aloittamiseen." },
      { title: "Lisääntymiskyky", text: "Liittyy raskauden alkamiseen ja jatkumiseen." },
    ],
    stages: [
      { title: "Lapsitoive", text: "Koettu halu, odotus ja tavoite.", input: "Motivaatiotila" },
      { title: "Edellytykset ja ajoitus", text: "Käytännön mahdollisuudet, kuormitus ja valittu ajankohta.", input: "Resurssit ja politiikka" },
      { title: "Yritys tai hoito", text: "Raskauden yrittäminen tai lisääntymishoito.", input: "Ehkäisy ja hoidot" },
      { title: "Raskaus ja syntymä", text: "Raskauden alkaminen, eteneminen ja elävänä syntyminen.", input: "Biologinen kapasiteetti" },
    ],
    controls: "Korosta prosessin kohtaa",
    choices: [
      { label: "Ajoitus", text: "Ajoitus muuttaa yrityksen ajankohtaa ja jäljellä olevaa lisääntymisaikaa. Se yhdistää päätökset iästä riippuviin biologisiin ehtoihin." },
      { label: "Edellytykset", text: "Toimeentulo, hoivapalvelut ja joustot muuttavat käytännön mahdollisuuksia, kuormitusta ja ajoitusta. Niiden vaikutus tulee prosessiin, johon kuuluvat myös motivaatio ja biologinen kapasiteetti." },
      { label: "Kapasiteetti", text: "BERM:n vastaanottotilan kautta kulkevassa reitissä sama biologinen tila vaikuttaa motivaatioon ja kapasiteettiin eri mekanismien kautta. Lapsitoive ei itsessään määrää raskauden alkamista tai jatkumista." },
      { label: "Hoito", text: "Hoito vaikuttaa nimettyihin vaiheisiin ja voi kompensoida tiettyjä rajoitteita. Avun jälkeen onnistunut lopputulos ei mittaa sitä, miten avustamaton reitti olisi toiminut." },
    ],
    conclusion: "Yhden edellytyksen muuttaminen ei palauta kaikkia ketjun edellytyksiä.",
    processCaption: "Kuva havainnollistaa lapsitoiveen toteutumisen reittiä; raskaus voi alkaa myös suunnittelematta. Ehkäisy vaikuttaa raskauden alkamiseen, ja resurssit myös kuormitukseen ja ajoitukseen. Valinta vain korostaa reittiä. BERM:n historiallisen kenttäosuuden kalibrointi on avoin.",
    chartTitle: "Aiempi odotus ja myöhempi lapsiluku",
    chartBadge: "Mitattu seuranta · samat ihmiset",
    chartLead: "Oma odotettu lapsiluku noin 24-vuotiaana verrattuna saman henkilön lapsilukuun 41–50-vuotiaana vuonna 2006. Yhdysvaltain NLSY79-seuranta; vuoden 2006 otospainoilla painotetut osuudet.",
    groups: ["Naiset", "Miehet"],
    categories: ["Vähemmän kuin odotettu", "Yhtä monta kuin odotettu", "Enemmän kuin odotettu"],
    sample: "Otos",
    expectation: "Odotettuun lapsilukuun sisältyvät jo syntyneet lapset ja vastaajan odottamat tulevat lapset. Syntymäkohortit: 1957–1964.",
    chartCaption: "Odotus ei yksin määrää myöhempää toteutumaa. Tämä vertailu ei yksilöi muuttuneiden tavoitteiden, käytännön esteiden tai biologisen kapasiteetin osuutta erosta; se ei mittaa EMF-vaikutusta.",
    source: "Morgan & Rackin 2010 · taulukko 2A",
  },
};

const STEPS = ["desire", "conditions", "attempt", "outcome"] as const;
const HIGHLIGHTED_STEPS = [[1, 2], [1, 2], [0, 3], [2, 3]];
const COLORS = ["var(--chart-series-1)", "var(--chart-series-2)", "var(--chart-series-4)"];
// Morgan & Rackin (2010), Table 2A; percentages weighted by 2006 sample weights.
const OUTCOMES = [
  { n: 3783, values: [34.9, 43.4, 21.7] },
  { n: 3584, values: [42.8, 34.2, 23.0] },
];
const PANEL = "min-w-0 space-y-5 rounded-xl border border-card-border bg-[var(--figure-bg)] p-4 sm:p-6";
const PROSE = "text-base leading-relaxed text-foreground-muted";
type Props = { locale: string };

function percentage(value: number, locale: string) {
  return `${value.toFixed(1).replace(".", locale === "fi" ? "," : ".")} %`;
}

export function ProxyDemographicProcess({ locale }: Props) {
  const c = pickCopy(COPY, locale);
  const id = useId();
  const [selected, setSelected] = useState(0);
  return (
    <figure id="demographic-process" aria-labelledby={`${id}-title`} aria-describedby={`${id}-caption`} className={PANEL}>
      <div className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-wide text-accent">{c.processBadge}</p>
        <h3 id={`${id}-title`} className="font-serif text-2xl leading-snug">{c.processTitle}</h3>
        <p className={PROSE}>{c.processLead}</p>
      </div>

      <div className="space-y-3" aria-label={c.receiverScope} role="group">
        <div className="space-y-1 border-l-2 border-accent bg-background p-4">
          <p className="text-sm text-foreground-muted">{c.receiverScope}</p>
          <p className="text-base font-semibold">{c.receiver}</p>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          {c.branches.map((branch, index) => (
            <div key={branch.title} className={`flex gap-3 border-t-2 p-3 ${selected === 2 ? "border-accent bg-accent/5" : "border-card-border"}`}>
              <span aria-hidden="true" className="text-lg text-accent">↓</span>
              <div className="min-w-0 space-y-1">
                <p className="text-base font-semibold">{branch.title}</p>
                <p className="text-sm leading-relaxed text-foreground-muted">{branch.text}</p>
                <p className="text-xs font-medium text-accent"><span aria-hidden="true">↳ </span>{c.stages[index === 0 ? 0 : 3].title}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div role="group" aria-label={c.controls} className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        {c.choices.map((choice, index) => (
          <button key={choice.label} type="button" aria-pressed={selected === index} aria-controls={`${id}-focus`} onClick={() => setSelected(index)}
            className={`min-h-11 rounded-lg border px-3 py-2 text-sm font-medium focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${selected === index ? "border-accent bg-accent/10 text-accent" : "border-card-border bg-background hover:border-accent/60"}`}>
            {choice.label}
          </button>
        ))}
      </div>

      <ol className="grid gap-8 md:grid-cols-4 md:gap-5">
        {c.stages.map((stage, index) => {
          const emphasized = HIGHLIGHTED_STEPS[selected].includes(index);
          return (
            <li key={stage.title} data-process-step={STEPS[index]} data-emphasized={emphasized} className={`relative min-w-0 space-y-3 rounded-lg border p-3 ${emphasized ? "border-accent bg-accent/5" : "border-card-border bg-background"}`}>
              <h4 className="break-words text-base font-semibold leading-snug">{stage.title}</h4>
              <p className="text-sm leading-relaxed text-foreground-muted">{stage.text}</p>
              <p className="border-t border-card-border pt-3 text-xs font-medium leading-relaxed text-accent">{stage.input}</p>
              {index < c.stages.length - 1 && <span aria-hidden="true" className="absolute -bottom-7 left-1/2 -translate-x-1/2 text-lg text-foreground-muted md:-right-[1.05rem] md:bottom-auto md:left-auto md:top-1/2 md:-translate-y-1/2 md:translate-x-0"><span className="md:hidden">↓</span><span className="hidden md:inline">→</span></span>}
            </li>
          );
        })}
      </ol>
      <div id={`${id}-focus`} aria-live="polite" aria-atomic="true" className="space-y-2 border-l-2 border-accent pl-4">
        <p className="text-sm font-semibold">{c.choices[selected].label}</p>
        <p className={PROSE}>{c.choices[selected].text}</p>
      </div>
      <p className="font-serif text-xl leading-relaxed">{c.conclusion}</p>
      <figcaption id={`${id}-caption`} className="border-t border-card-border pt-4 text-sm leading-relaxed text-foreground-muted">{c.processCaption}</figcaption>
    </figure>
  );
}

export function ProxyIntentionOutcomeChart({ locale }: Props) {
  const c = pickCopy(COPY, locale);
  const id = useId();
  return (
    <figure id="demographic-intention-outcomes" aria-labelledby={`${id}-title`} aria-describedby={`${id}-caption`} className={PANEL}>
      <div className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-wide text-accent">{c.chartBadge}</p>
        <h3 id={`${id}-title`} className="font-serif text-2xl leading-snug">{c.chartTitle}</h3>
        <p className={PROSE}>{c.chartLead}</p>
      </div>
      <div className="space-y-7">
        {OUTCOMES.map((row, groupIndex) => {
          const rowId = `${id}-${groupIndex}`;
          const description = c.categories.map((category, index) => `${category}: ${percentage(row.values[index], locale)}`).join("; ");
          return (
            <section key={c.groups[groupIndex]} aria-labelledby={`${rowId}-heading`} className="min-w-0 space-y-3">
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <h4 id={`${rowId}-heading`} className="text-base font-semibold">{c.groups[groupIndex]}</h4>
                <p className="text-sm tabular-nums text-foreground-muted">{c.sample}: n = {String(row.n).replace(/\B(?=(\d{3})+(?!\d))/g, " ")}</p>
              </div>
              <svg role="img" aria-labelledby={`${rowId}-svg-title`} aria-describedby={`${rowId}-svg-desc`} viewBox="0 0 100 5" preserveAspectRatio="none" className="block h-6 w-full overflow-hidden rounded-sm">
                <title id={`${rowId}-svg-title`}>{c.groups[groupIndex]}</title>
                <desc id={`${rowId}-svg-desc`}>{description}</desc>
                {row.values.map((value, index) => <rect key={c.categories[index]} x={row.values.slice(0, index).reduce((sum, part) => sum + part, 0)} y={0} width={value} height={5} fill={COLORS[index]} />)}
              </svg>
              <dl className="grid gap-2 min-[420px]:grid-cols-3">
                {c.categories.map((category, index) => (
                  <div key={category} className="flex items-baseline justify-between gap-4 min-[420px]:block">
                    <dt className="flex items-baseline gap-2 text-sm leading-relaxed text-foreground-muted"><span aria-hidden="true" className="inline-block size-2 shrink-0 rounded-sm" style={{ backgroundColor: COLORS[index] }} />{category}</dt>
                    <dd className="shrink-0 text-base font-semibold tabular-nums min-[420px]:mt-1 min-[420px]:pl-4">{percentage(row.values[index], locale)}</dd>
                  </div>
                ))}
              </dl>
            </section>
          );
        })}
      </div>
      <p className="text-sm leading-relaxed text-foreground-muted">{c.expectation}</p>
      <figcaption id={`${id}-caption`} className="space-y-3 border-t border-card-border pt-4">
        <p className={PROSE}>{c.chartCaption}</p>
        <StudyCitation referenceId="morgan2010_intentions_realization" locale={locale} label={c.source} />
      </figcaption>
    </figure>
  );
}
