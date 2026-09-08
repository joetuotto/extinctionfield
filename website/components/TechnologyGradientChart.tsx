import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { pickCopy } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n";

const COPY = {
  en: {
    title: "How to compare technology and fertility",
    status: "BERM hypothesis · comparison design",
    intro: "A biological explanation becomes more informative when measured field histories are compared within the same population and period.",
    comparisons: [
      { title: "Before and after", detail: "Follow the same population across a documented installation or removal, with a comparable population where the technology did not change." },
      { title: "Different rollout dates", detail: "Compare regions and birth cohorts using local operating histories, measured fields and the same fertility measure." },
      { title: "Different technology practices", detail: "Community comparisons need measured exposure and adjustment for family formation, contraception, selection and other living conditions." },
    ],
    prediction: "Conditional BERM prediction: if a field change alters reproductive biology, its timing and the affected cohorts should help explain later fertility differences. The response direction, size and lag require calibration.",
    note: "This is a study design, not a fitted technology–fertility relationship. A national fertility rate and a community’s family size are different measures.",
    sources: "Explore source histories",
    communities: "Community evidence and limitations",
  },
  fi: {
    title: "Miten teknologiaa ja hedelmällisyyttä verrataan",
    status: "BERM-hypoteesi · vertailuasetelma",
    intro: "Biologisen selityksen arvio tarkentuu, kun mitattuja kenttähistorioita verrataan samassa väestössä ja samana ajanjaksona.",
    comparisons: [
      { title: "Ennen ja jälkeen", detail: "Seurataan samaa väestöä dokumentoidun asennuksen tai poiston yli ja rinnalla vertailuväestöä, jonka teknologia ei muuttunut." },
      { title: "Eri käyttöönottoajat", detail: "Verrataan alueita ja syntymäkohortteja paikallisten käyttöaikojen, kenttämittausten ja saman hedelmällisyysmittarin avulla." },
      { title: "Erilaiset teknologiakäytännöt", detail: "Yhteisövertailu tarvitsee mitatun altistuksen sekä perheenmuodostuksen, ehkäisyn, valikoitumisen ja muiden elinolojen huomioinnin." },
    ],
    prediction: "BERM:n ehdollinen ennuste: jos kenttämuutos muuttaa lisääntymisbiologiaa, muutoksen ajoituksen ja altistuneiden kohorttien pitäisi auttaa selittämään myöhempiä hedelmällisyyseroja. Vasteen suunta, koko ja viive tarvitsevat kalibroinnin.",
    note: "Tämä on tutkimusasetelma, ei sovitettu teknologia–hedelmällisyysyhteys. Kansallinen kokonaishedelmällisyysluku ja yhteisön lapsiluku ovat eri mittareita.",
    sources: "Tutki lähteiden historiaa",
    communities: "Yhteisövertailujen näyttö ja rajat",
  },
};

/** A qualitative comparison design. No numerical adoption score is implied. */
export function TechnologyGradientChart({ locale }: { locale: Locale }) {
  const d = pickCopy(COPY, locale);

  return (
    <figure className="data-figure my-12" aria-label={d.title}>
      <div className="space-y-5 p-5 sm:p-7">
        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-accent">{d.status}</p>
          <h3 className="text-lg font-semibold">{d.title}</h3>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-foreground-muted">{d.intro}</p>
        </div>
        <ol className="grid gap-3 md:grid-cols-3">
          {d.comparisons.map((comparison, index) => (
            <li key={comparison.title} className="rounded-xl border border-card-border bg-card-bg/60 p-4">
              <span className="font-mono text-xs text-accent" aria-hidden="true">0{index + 1}</span>
              <h4 className="mt-2 text-sm font-semibold">{comparison.title}</h4>
              <p className="mt-2 text-xs leading-relaxed text-foreground-muted">{comparison.detail}</p>
            </li>
          ))}
        </ol>
        <p className="border-l-2 border-accent/50 pl-4 text-sm leading-relaxed">{d.prediction}</p>
        <div className="flex flex-wrap gap-x-6 gap-y-3 text-xs font-medium text-accent">
          <Link href={`/${locale}/evidence/technology`} className="inline-flex items-center gap-1.5">{d.sources}<ArrowRight size={13} /></Link>
          <Link href={`/${locale}/evidence/amish-control`} className="inline-flex items-center gap-1.5">{d.communities}<ArrowRight size={13} /></Link>
        </div>
      </div>
      <figcaption className="data-figure__note px-5 pb-5 text-xs leading-relaxed sm:px-7">{d.note}</figcaption>
    </figure>
  );
}
