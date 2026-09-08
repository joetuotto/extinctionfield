import Link from "next/link";
import { pickCopy } from "@/lib/i18n";
import { getHistorySources, getLocalizedText, getTechnologyEvents } from "@/lib/technology-history";

// Policy milestones concern products placed on the market, not the installed lamp stock.
const MILESTONES = getTechnologyEvents("indoor-lighting").filter((event) => event.id.startsWith("lighting-policy-"));

const COPY = {
  en: {
    title: "Lighting transition: selected policy milestones",
    subtitle: "EU and US market rules changed at different times. Replacing the installed lighting stock takes longer.",
    dateNote: "The EU milestones shown took effect on 1 September. Requirements applied to the defined product categories, not every lamp or every existing installation.",
    salesTitle: "Sales and installed stock answer different questions",
    salesNote: "The IEA series covers global residential lighting sales and distinguishes historical values from a Net Zero scenario. It does not measure the share of all installed lighting or local electromagnetic exposure.",
    salesLink: "IEA: residential lighting sales, 2010–2030",
    responseNote: "For BERM comparisons, add local replacement dates and operating hours, and record optical light separately from driver-electronics fields. A biological response window then needs its own calibrated model.",
    historyLink: "Explore regional technology history",
  },
  fi: {
    title: "Valaistussiirtymä: valittuja sääntelyn vaiheita",
    subtitle: "EU:n ja Yhdysvaltojen markkinasäännöt muuttuivat eri aikaan. Asennetun valaistuskannan vaihtuminen vie pidempään.",
    dateNote: "Näytetyt EU-vaiheet tulivat voimaan 1. syyskuuta. Vaatimukset koskivat määriteltyjä tuoteryhmiä, eivät jokaista lamppua tai olemassa olevaa asennusta.",
    salesTitle: "Myynti ja asennettu kanta vastaavat eri kysymyksiin",
    salesNote: "IEA:n sarja koskee maailman kotitalousvalaistuksen myyntiä ja erottaa historialliset luvut Net Zero -skenaariosta. Se ei mittaa osuutta kaikesta asennetusta valaistuksesta tai paikallista sähkömagneettista altistusta.",
    salesLink: "IEA: kotitalousvalaistuksen myynti 2010–2030",
    responseNote: "BERM-vertailuun lisätään paikalliset vaihtopäivät ja käyttötunnit, ja optinen valo kirjataan erikseen ohjauselektroniikan kentistä. Biologinen vasteikkuna tarvitsee tämän jälkeen oman kalibroidun mallinsa.",
    historyLink: "Tutki alueellista teknologiahistoriaa",
  },
};

export function LightingTransitionTimeline({ locale }: { locale: string }) {
  const d = pickCopy(COPY, locale);
  const xOf = (year: number) => 36 + ((year - 2009) / 14) * 708;

  return (
    <figure className="chart-surface mb-10" aria-label={d.title}>
      <div className="chart-surface__header">
        <div className="max-w-3xl">
          <h3 className="text-base font-semibold">{d.title}</h3>
          <p className="mt-2 text-xs leading-relaxed text-foreground-muted">{d.subtitle}</p>
        </div>
      </div>
      <div className="chart-scroll">
        <svg viewBox="0 0 780 130" className="chart-svg min-w-[600px] w-full" role="img" aria-label={d.title}>
          <line x1="36" y1="78" x2="744" y2="78" className="chart-axis-line" />
          {MILESTONES.map((event, index) => (
            <g key={event.startYear}>
              <title>{`${event.startYear}: ${getLocalizedText(event.title, locale)}`}</title>
              <line x1={xOf(event.startYear)} y1={30 + (index % 2) * 20} x2={xOf(event.startYear)} y2="78" stroke="var(--color-accent)" strokeOpacity="0.45" />
              <circle cx={xOf(event.startYear)} cy={30 + (index % 2) * 20} r="11" fill="var(--color-card-bg)" stroke="var(--color-accent)" />
              <text x={xOf(event.startYear)} y={34 + (index % 2) * 20} textAnchor="middle" fontSize="11" fill="var(--color-accent)">{index + 1}</text>
            </g>
          ))}
          {[2009, 2012, 2015, 2018, 2021, 2023].map((year) => (
            <g key={year}>
              <line x1={xOf(year)} y1="78" x2={xOf(year)} y2="84" className="chart-axis-line" />
              <text x={xOf(year)} y="103" textAnchor="middle" fontSize="11" fill="var(--color-foreground-muted)">{year}</text>
            </g>
          ))}
        </svg>
      </div>
      <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {MILESTONES.map((event, index) => {
          const source = getHistorySources(event.sourceIds)[0];
          return <li key={event.startYear} className="rounded-lg border border-card-border p-3">
            <p className="font-mono text-xs text-accent"><span aria-hidden="true">{index + 1} · </span>{event.startYear}</p>
            <p className="mt-2 text-xs leading-relaxed">{getLocalizedText(event.title, locale)}</p>
            <a className="mt-2 inline-block text-[11px] text-accent underline underline-offset-4" href={source.url}>{source.publisher}</a>
          </li>;
        })}
      </ol>
      <figcaption className="mt-4 text-xs leading-relaxed text-foreground-muted">{d.dateNote}</figcaption>
      <div className="mt-5 border-t border-card-border pt-4">
        <h4 className="text-sm font-semibold">{d.salesTitle}</h4>
        <p className="mt-2 max-w-3xl text-xs leading-relaxed text-foreground-muted">{d.salesNote}</p>
        <a className="mt-2 inline-block text-xs text-accent underline underline-offset-4" href="https://www.iea.org/data-and-statistics/charts/global-residential-lighting-sales-share-by-technology-in-the-net-zero-scenario-2010-2030">{d.salesLink}</a>
        <p className="mt-4 max-w-3xl text-xs leading-relaxed text-foreground-muted">{d.responseNote}</p>
        <Link className="mt-3 inline-block text-xs font-medium text-accent" href={`/${locale}/evidence/technology`}>{d.historyLink} →</Link>
      </div>
    </figure>
  );
}
