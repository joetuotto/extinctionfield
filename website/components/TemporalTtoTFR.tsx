import observations from "@/public/data/testosterone-calibration/chronology.json";
import { pickCopy } from "@/lib/i18n";
import { StudyCitation } from "@/components/StudyCitation";

const COPY = {
  en: {
    hormone: "Lower T: observation-window end", peak: "Later TFR peak", decline: "TFR decline begins",
    countries: { FIN: "Finland", USA: "United States · MMAS", ISR: "Israel" },
    notes: {
      FIN: "Age-group and birth-cohort comparisons in samples collected in 1972, 1977 and 2002. The preliminary report appeared in 2006 and was archived in 2008; the journal article followed in 2013.",
      USA: "Table 3: 500 → 444 ng/dL in 1987–89 versus 1995–97, at comparable median ages of 65 and 64. Regional, older men compared with a later national fertility trend.",
      ISR: "All 30 age-specific means for ages 20–49 are lower in 2013–15 than in 2006–09. Values digitized from Figure 1A; clinical samples, four observation windows.",
    },
    method: "A later decline episode is a post-2000 local TFR peak followed by at least three annual decreases and a lower value five years later. The three dates also agree across alternative fertility sources. This descriptive comparison used previously seen data; it is not a prospective forecast.",
    caveat: "The spaces between these dates are calendar gaps between observation windows, not estimates of a common biological lag. Age groups within one window are not independent time points.",
    download: "Download the timing assessment, including qualified and non-supporting cases",
  },
  fi: {
    hormone: "Alempi T: näytejakson loppu", peak: "Myöhempi TFR-huippu", decline: "TFR-lasku alkaa",
    countries: { FIN: "Suomi", USA: "Yhdysvallat · MMAS", ISR: "Israel" },
    notes: {
      FIN: "Ikä- ja syntymäkohorttien vertailut vuosina 1972, 1977 ja 2002 kerätyissä näytteissä. Alustava raportti ilmestyi 2006 ja arkistoitiin 2008; lehtiartikkeli julkaistiin 2013.",
      USA: "Taulukko 3: 500 → 444 ng/dL vuosina 1987–89 ja 1995–97, mediaani-iät 65 ja 64 vuotta. Alueellista, vanhempien miesten aineistoa verrataan myöhempään kansalliseen syntyvyyteen.",
      ISR: "Kaikki 30 ikäkohtaista keskiarvoa ikävälillä 20–49 ovat alempia 2013–15 kuin 2006–09. Arvot on poimittu alkuperäiskuvasta 1A; kliininen aineisto, neljä mittausjaksoa.",
    },
    method: "Myöhempi laskuvaihe tarkoittaa vuoden 2000 jälkeistä paikallista TFR-huippua, jota seuraa vähintään kolme vuosittaista laskua ja alempi taso viiden vuoden kuluttua. Kolmen tapauksen ajoitus säilyy myös vaihtoehtoisissa syntyvyyslähteissä. Kuvailevassa vertailussa oli jo nähty aiempaa dataa; kyse ei ole ennakkoon annetusta ennusteesta.",
    caveat: "Päivämäärien välit ovat havaintoikkunoiden kalenterieroja, eivät yhteisen biologisen viiveen estimaatteja. Saman mittausjakson ikäryhmät eivät ole riippumattomia ajankohtia.",
    download: "Lataa ajoitusarvio, myös ehdolliset ja ei-tukevat tapaukset",
  },
};

/** Published observation windows, never synthetic annual hormone measurements. */
export function TemporalTtoTFR({ locale = "en" }: { locale?: string }) {
  const d = pickCopy(COPY, locale);
  return (
    <div className="space-y-4" data-calibration="temporal-precedence-v13">
      {observations.cases.map(row => {
        const country = row.country as keyof typeof d.countries;
        return (
          <article key={row.country} className="rounded-xl border border-card-border bg-card-bg p-5">
            <h3 className="mb-4 text-lg font-semibold">{d.countries[country]}</h3>
            <ol className="grid gap-4 border-l-2 border-accent/30 pl-4 sm:grid-cols-3 sm:border-l-0 sm:border-t-2 sm:pl-0 sm:pt-4">
              {[
                [d.hormone, row.hormoneDocumentedBy],
                [d.peak, row.tfrPeak],
                [d.decline, row.firstTfrDecrease],
              ].map(([label, year]) => (
                <li key={label}>
                  <p className="text-xs text-foreground-muted">{label}</p>
                  <p className="mt-1 text-2xl font-semibold tabular-nums">{year}</p>
                </li>
              ))}
            </ol>
            <p className="mt-4 text-sm leading-relaxed text-foreground-muted">{d.notes[country]}</p>
            <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-xs">
              {row.referenceIds.map(id => <StudyCitation key={id} referenceId={id} locale={locale} />)}
            </div>
          </article>
        );
      })}
      <p className="text-sm leading-relaxed text-foreground-muted">{d.caveat}</p>
      <p className="text-xs leading-relaxed text-foreground-muted">{d.method}{" "}<StudyCitation referenceId="nations2024" locale={locale} label="UN WPP 2024" /></p>
      <a className="inline-block text-sm text-accent underline underline-offset-4" href="/data/testosterone-calibration/temporal_precedence_assessment.csv" download>{d.download}</a>
    </div>
  );
}
