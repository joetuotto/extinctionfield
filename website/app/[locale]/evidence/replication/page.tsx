import type { Metadata } from "next";
import Link from "next/link";
import { FlaskConical } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";

/* ── Five confounds card data ── */
type Confound = {
  title: string;
  blackman: string;
  chi: string;
  labImpact: string;
  ref: string;
  level: "E" | "M";
  bermNote?: string;
};

const CONFOUNDS: Record<"en" | "fi", Confound[]> = {
  en: [
    {
      title: "Temperature Window (±1°C)",
      blackman:
        "Blackman 1991: Ca²⁺ efflux occurred at 36°C and 37°C but NOT at 35°C, 38°C, or 39°C. Direction depended on temperature trajectory.",
      chi: "χ_bio(T) — biological machinery operates within narrow thermal window. Outside 36–37°C, transduction chain cannot complete.",
      labImpact:
        "Labs at different temperatures get different results. Not a failure of the effect.",
      ref: "Blackman et al. 1991, Bioelectromagnetics 12:173–182",
      level: "E",
    },
    {
      title: "Geomagnetic Field Orientation",
      blackman:
        "Blackman 1990: DC–AC angle is critical for calcium release. Consistent with magnetic resonance-like mechanism.",
      chi: "χ(Ā_DC, θ) — radical pair mechanism is anisotropic.",
      labImpact:
        "Helsinki (inclination ~73°) vs Rome (~57°) get different results at same AC.",
      ref: "Blackman et al. 1990, Bioelectromagnetics 11:159–167",
      level: "E",
    },
    {
      title: "Geomagnetic Field Intensity",
      blackman:
        "Blackman: Normal (49.4 µT) vs reduced (19.0 µT) produced different calcium efflux.",
      chi: "χ(|Ā_DC|) — Lindgren's selection rule directly. Higher background → higher χ.",
      labImpact:
        "Near magnetic equator (~25 µT) weaker effects than Scandinavia (~50 µT).",
      ref: "Blackman et al., experiments at normal and reduced LGF",
      level: "E",
    },
    {
      title: "Laboratory Lighting (CRY Photocycle)",
      blackman:
        "Not directly from Blackman. CRY's radical pair requires blue light (Nießner 2014). Lab lighting determines CRY state.",
      chi: "χ_CRY(I_blue, λ) — different lab lighting puts CRY in different states.",
      labImpact:
        "Blue-rich (modern LED) vs warm (incandescent) → systematically different CRY states.",
      ref: "Nießner et al. 2014, J Exp Biol; Yap et al. 2025, Cells",
      level: "M",
      bermNote:
        "This is BERM's synthesis (M-level), not Blackman's direct finding.",
    },
    {
      title: "Developmental Frequency Imprinting",
      blackman:
        "Blackman 1985/1988: Chicken eggs in 60 Hz → hatchlings responded to 50 Hz but NOT 60 Hz.",
      chi: "χ_dev(f_history) — frequency response shaped by developmental exposure.",
      labImpact:
        "European (50 Hz) vs US (60 Hz) cell lines have different frequency sensitivity.",
      ref: "Blackman et al. 1985, Bioelectromagnetics 6:1–11",
      level: "E",
    },
  ],
  fi: [
    {
      title: "Lämpötilaikkuna (±1°C)",
      blackman:
        "Blackman 1991: Ca²⁺-effluksi tapahtui 36°C:ssa ja 37°C:ssa mutta EI 35°C:ssa, 38°C:ssa tai 39°C:ssa. Suunta riippui lämpötilaliikeradasta.",
      chi: "χ_bio(T) — biologinen koneisto toimii kapeassa lämpötilaikkunassa. 36–37°C:n ulkopuolella transduktioketju ei voi valmistua.",
      labImpact:
        "Eri lämpötiloissa toimivat laboratoriot saavat eri tuloksia. Ei ole efektin epäonnistuminen.",
      ref: "Blackman ym. 1991, Bioelectromagnetics 12:173–182",
      level: "E",
    },
    {
      title: "Geomagneettisen kentän suunta",
      blackman:
        "Blackman 1990: DC–AC-kulma on kriittinen kalsiumin vapautumiselle. Yhdenmukainen magneettiseen resonanssiin perustuvan mekanismin kanssa.",
      chi: "χ(Ā_DC, θ) — radikaaliparin mekanismi on anisotrooppinen.",
      labImpact:
        "Helsinki (inklinaatio ~73°) vs Rooma (~57°) saavat eri tuloksia samalla AC:lla.",
      ref: "Blackman ym. 1990, Bioelectromagnetics 11:159–167",
      level: "E",
    },
    {
      title: "Geomagneettisen kentän voimakkuus",
      blackman:
        "Blackman: Normaali (49,4 µT) vs vähennetty (19,0 µT) tuotti erilaisen kalsiumeffluksin.",
      chi: "χ(|Ā_DC|) — Lindgrenin valintaehto suoraan. Korkeampi tausta → korkeampi χ.",
      labImpact:
        "Lähellä magneettista päiväntasaajaa (~25 µT) heikommat vaikutukset kuin Skandinaviassa (~50 µT).",
      ref: "Blackman ym., kokeet normaalissa ja vähennetyssä LGF:ssä",
      level: "E",
    },
    {
      title: "Laboratoriovalaistus (CRY:n fotosykli)",
      blackman:
        "Ei suoraan Blackmanilta. CRY:n radikaalipari vaatii sinisen valon (Nießner 2014). Laboratoriovalaistus määrittää CRY:n tilan.",
      chi: "χ_CRY(I_blue, λ) — erilainen laboratoriovalaistus asettaa CRY:n eri tiloihin.",
      labImpact:
        "Sinirikas (moderni LED) vs lämmin (hehkulamppu) → systemaattisesti eri CRY-tilat.",
      ref: "Nießner ym. 2014, J Exp Biol; Yap ym. 2025, Cells",
      level: "M",
      bermNote:
        "Tämä on BERM:n synteesi (M-taso), ei Blackmanin suora löydös.",
    },
    {
      title: "Kehityksellinen taajuusleimautuminen",
      blackman:
        "Blackman 1985/1988: 60 Hz:ssä haudotut kananmunat → poikaset reagoivat 50 Hz:iin mutta EIVÄT 60 Hz:iin.",
      chi: "χ_dev(f_history) — taajuusvaste muovautuu kehityksellisen altistuksen mukaan.",
      labImpact:
        "Eurooppalaiset (50 Hz) vs yhdysvaltalaiset (60 Hz) solulinjat reagoivat eri taajuuksiin.",
      ref: "Blackman ym. 1985, Bioelectromagnetics 6:1–11",
      level: "E",
    },
  ],
};

/* ── Five-parameter standard items ── */
const STANDARD_ITEMS = {
  en: [
    "TISSUE TEMPERATURE — continuous monitoring, ±0.3°C precision",
    "LIGHTING SPECTRUM — 400–500 nm blue content, lux",
    "LOCAL GEOMAGNETIC FIELD — DC magnitude, declination, inclination",
    "AMBIENT EMF ENVIRONMENT — 50/60 Hz, WiFi, Faraday shielding",
    "DEVELOPMENTAL HISTORY — origin, culture history, power frequency",
  ],
  fi: [
    "KUDOSLÄMPÖTILA — jatkuva seuranta, ±0,3°C tarkkuus",
    "VALAISTUSSPEKTRI — 400–500 nm sininen sisältö, luxit",
    "PAIKALLINEN GEOMAGNEETTINEN KENTTÄ — DC-magnitudini, deklinaatio, inklinaatio",
    "YMPÄRISTÖN EMF — 50/60 Hz, WiFi, Faraday-suojaus",
    "KEHITYSHISTORIA — alkuperä, viljelyhistoria, verkkotaajuus",
  ],
};

/* ── Bilingual copy ── */
const COPY = {
  en: {
    title: "Resolution of the Replication Crisis",
    subtitle:
      "Why EMF biology seems inconsistent, Blackman's five confounds, and the five-parameter standard",
    backLink: "← Back to Evidence",
    seeAlso: "See also",
    evidencePortal: "Evidence register",
    modelPage: "BERM model",
    /* Section 1 */
    s1Title:
      "Why EMF Biology Seems Inconsistent — And Why It Isn’t",
    s1p1: "For fifty years, the central objection to non-thermal electromagnetic bioeffects has been inconsistency: ‘If the effect is real, why can’t laboratories reproduce it reliably?’",
    s1p2: "The answer was published between 1985 and 1991 by Carl Blackman at the US Environmental Protection Agency — but it was never synthesized into a unified framework. Blackman’s own experiments identified five variables that, when uncontrolled, produce apparently contradictory results from the SAME underlying phenomenon. When all five are controlled, the results are consistent.",
    s1p3: "BERM’s contribution is to recognize that these five variables are all instances of the same mathematical structure: Lindgren’s selection rule χ(Ā), applied at different scales. Each variable modulates the ‘background’ against which the biological system responds to EMF perturbation. Change the background, change the response — not because the effect is unreliable, but because it is multidimensionally sensitive.",
    /* Section 2 */
    s2Title: "The Five Confounds",
    s2BlackmanLabel: "Blackman finding",
    s2ChiLabel: "χ interpretation",
    s2LabLabel: "Lab impact",
    s2RefLabel: "Reference",
    /* Section 3 */
    s3Title: "Proposed: The Five-Parameter EMF Biology Standard",
    s3Note:
      "This standard does not claim any biological effect. It simply requires that the five variables Blackman demonstrated to be critical are documented.",
    /* Section 4 */
    s4Title: "How This Resolves the Apparent Contradiction",
    s4p1: "Lab A and Lab B are at different points in five-dimensional parameter space. When uncontrolled parameters differ, different results are EXPECTED, not anomalous. Blackman demonstrated this directly: the same researcher, with the same equipment, obtained enhancement, reduction, or null depending on temperature alone.",
    s4p2: "The replication crisis in EMF biology is not a crisis of the phenomenon — it is a crisis of experimental control. Once the five confounds are recognized and documented, apparent contradictions resolve into a consistent, multidimensional dose-response surface.",
    s4p3: "Lindgren’s χ(Ā) provides that framework: every confound is a background field (thermal, optical, magnetic, developmental) that modulates sensitivity via the same mathematical function.",
    /* Section 5 */
    s5Title: "Seven Moderators That Predict Study Outcomes",
    s5Lead: "Analysis of 600+ published EMF bioeffect studies across five endpoints (melatonin, sperm, sleep EEG, DNA damage, oxidative stress) reveals that ‘contradictory evidence’ is an artifact of seven uncontrolled moderators. Three are statistically significant, two are directly proven by RCTs, and two are quantified by specific studies.",
    s5StatsCaption: "Statistical results — chi-square tests of moderator × outcome association",
    s5ModeratorCol: "Moderator",
    s5PosYesCol: "Pos%/Yes",
    s5PosNoCol: "Pos%/No",
    s5MatrixCaption: "Five-endpoint moderator confirmation matrix",
    s5MatrixLegend: "✓✓ = confirmed by multiple studies or meta-analysis, ✓ = suggested by limited data, — = no data available",
    s5KeyFinding1Title: "58% of DNA damage below ICNIRP",
    s5KeyFinding1Body: "Weller 2025, 517 studies: the majority of DNA-damage-positive studies used exposures below ICNIRP limits.",
    s5KeyFinding2Title: "9-hour recovery window",
    s5KeyFinding2Body: "Ivancsits: DNA repair quantified — 9 hours of EMF-free recovery allows measurable DNA repair.",
    s5KeyFinding3Title: "Funding > quality",
    s5KeyFinding3Body: "Weller 2025: funding source predicts study results more strongly than study quality score.",
  },
  fi: {
    title: "Replikaatiokriisin ratkaisu",
    subtitle:
      "Miksi EMF-biologia vaikuttaa ristiriitaiselta, Blackmanin viisi sekoittavaa tekijää ja viiden parametrin standardi",
    backLink: "← Takaisin evidenssiin",
    seeAlso: "Katso myös",
    evidencePortal: "Evidenssirekisteri",
    modelPage: "BERM-malli",
    /* Section 1 */
    s1Title:
      "Miksi EMF-biologia vaikuttaa ristiriitaiselta — ja miksi se ei ole",
    s1p1: "Viisikymmentä vuotta keskeisin vastaargumentti ei-termisille sähkömagneettisille biovaikutuksille on ollut epäjohdonmukaisuus: ’Jos vaikutus on todellinen, miksi laboratoriot eivät pysty toistamaan sitä luotettavasti?’",
    s1p2: "Vastaus julkaistiin vuosina 1985–1991 Carl Blackmanin toimesta Yhdysvaltain ympäristönsuojeluvirastossa (EPA) — mutta sitä ei koskaan syntetisoitu yhtenäiseksi kehykseksi. Blackmanin omat kokeet tunnistivat viisi muuttujaa, jotka kontrolloimattomina tuottavat näennäisesti ristiriitaisia tuloksia SAMASTA taustailmiöstä. Kun kaikki viisi kontrolloidaan, tulokset ovat johdonmukaisia.",
    s1p3: "BERM:n panos on tunnistaa, että nämä viisi muuttujaa ovat kaikki saman matemaattisen rakenteen ilmentymyä: Lindgrenin valintaehto χ(Ā), sovellettuna eri skaaloissa. Kukin muuttuja moduloi ’taustaa’, jota vasten biologinen järjestelmä reagoi EMF-häiriöön. Muuta taustaa, muuta vastetta — ei siksi että vaikutus olisi epäluotettava, vaan koska se on moniulotteisesti herkkä.",
    /* Section 2 */
    s2Title: "Viisi sekoittavaa tekijää",
    s2BlackmanLabel: "Blackmanin löydös",
    s2ChiLabel: "χ-tulkinta",
    s2LabLabel: "Laboratoriovaikutus",
    s2RefLabel: "Viite",
    /* Section 3 */
    s3Title: "Ehdotus: Viiden parametrin EMF-biologian standardi",
    s3Note:
      "Tämä standardi ei väitä mitään biologista vaikutusta. Se ainoastaan edellyttää, että viisi muuttujaa, joiden kriittisyyden Blackman osoitti, dokumentoidaan.",
    /* Section 4 */
    s4Title: "Miten tämä ratkaisee näennäisen ristiriidan",
    s4p1: "Laboratorio A ja laboratorio B ovat eri pisteissä viisiulotteisessa parametriavaruudessa. Kun kontrolloimattomat parametrit eroavat, erilaiset tulokset ovat ODOTETTUJA, eivät poikkeavia. Blackman osoitti tämän suoraan: sama tutkija, samat laitteet, sai vahvistuksen, vähenemisen tai nollatuloksen pelkästään lämpötilasta riippuen.",
    s4p2: "EMF-biologian replikaatiokriisi ei ole ilmiön kriisi — se on kokeellisen kontrollin kriisi. Kun viisi sekoittavaa tekijää tunnistetaan ja dokumentoidaan, näennäiset ristiriidat ratkeavat johdonmukaiseksi, moniulotteiseksi annos-vastepinnaksi.",
    s4p3: "Lindgrenin χ(Ā) tarjoaa tuon kehyksen: jokainen sekoittava tekijä on taustakenttä (terminen, optinen, magneettinen, kehityksellinen), joka moduloi herkkyyttä saman matemaattisen funktion kautta.",
    /* Section 5 */
    s5Title: "Seitsemän moderaattoria jotka ennustavat tutkimustuloksia",
    s5Lead: "Analyysi yli 600 julkaistusta EMF-bioefektitutkimuksesta viidellä endpointilla (melatoniini, siittiöt, uni-EEG, DNA-vaurio, oksidatiivinen stressi) paljastaa, että 'ristiriitainen evidenssi' on seitsemän kontrolloimattoman moderaattorin artefakti. Kolme on tilastollisesti merkitseviä, kaksi on suoraan todistettu RCT-tasolla ja kaksi on kvantifioitu spesifisillä tutkimuksilla.",
    s5StatsCaption: "Tilastolliset tulokset — khiin neliö -testit moderaattori x tulosyhteys",
    s5ModeratorCol: "Moderaattori",
    s5PosYesCol: "Pos%/Kyllä",
    s5PosNoCol: "Pos%/Ei",
    s5MatrixCaption: "Viiden endpointin moderaattorivahvistusmatriisi",
    s5MatrixLegend: "✓✓ = vahvistettu useilla tutkimuksilla tai meta-analyysillä, ✓ = viitteitä rajallisesta datasta, — = ei dataa saatavilla",
    s5KeyFinding1Title: "58 % DNA-vauriosta ICNIRP:n alla",
    s5KeyFinding1Body: "Weller 2025, 517 tutkimusta: enemmistö DNA-vauriopositiivisista tutkimuksista käytti ICNIRP-rajojen alittavia altistuksia.",
    s5KeyFinding2Title: "9 tunnin palautumisikkuna",
    s5KeyFinding2Body: "Ivancsits: DNA-korjaus kvantifioitu — 9 tuntia EMF-vapaata palautumista mahdollistaa mitattavan DNA-korjauksen.",
    s5KeyFinding3Title: "Rahoitus > laatu",
    s5KeyFinding3Body: "Weller 2025: rahoituslähde ennustaa tutkimustuloksia vahvemmin kuin tutkimuksen laatupisteet.",
  },
};

const LEVEL_COLORS: Record<string, string> = {
  E: "border-green-500",
  M: "border-amber-500",
};

const LEVEL_BADGE_COLORS: Record<string, string> = {
  E: "bg-green-500/10 text-green-600 dark:text-green-400",
  M: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return locale === "fi"
    ? {
        title: "Replikaatiokriisin ratkaisu – Extinction Field",
        description: COPY.fi.subtitle,
      }
    : {
        title: "Resolution of the Replication Crisis – Extinction Field",
        description: COPY.en.subtitle,
      };
}

export default async function ReplicationPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const activeLocale = locale === "fi" ? "fi" : "en";
  const d = COPY[activeLocale];
  const confounds = CONFOUNDS[activeLocale];
  const standardItems = STANDARD_ITEMS[activeLocale];

  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <Link
        href={`/${locale}/evidence`}
        className="text-sm text-accent hover:underline mb-6 inline-block"
      >
        {d.backLink}
      </Link>

      <PageHeader icon={FlaskConical} title={d.title} subtitle={d.subtitle} />

      {/* ── Section 1: Why EMF Biology Seems Inconsistent ── */}
      <section className="mb-16 border-t editorial-rule pt-6">
        <article id="inconsistency" className="scroll-mt-24">
          <h3 className="text-lg font-semibold mb-4">
            <span className="font-mono-num text-xs text-accent mr-2">01</span>
            {d.s1Title}
          </h3>
          <p className="editorial-rail mb-4 text-[0.95rem] leading-relaxed text-foreground">
            {d.s1p1}
          </p>
          <div className="space-y-3 text-sm text-foreground-muted leading-relaxed">
            <p>{d.s1p2}</p>
            <p>{d.s1p3}</p>
          </div>
        </article>
      </section>

      {/* ── Section 2: The Five Confounds ── */}
      <section className="mb-16 border-t editorial-rule pt-6">
        <h3 className="text-lg font-semibold mb-6">
          <span className="font-mono-num text-xs text-accent mr-2">02</span>
          {d.s2Title}
        </h3>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {confounds.map((c, i) => (
            <div
              key={i}
              className={`border-l-4 ${LEVEL_COLORS[c.level]} rounded-r-lg bg-card p-5 space-y-3`}
            >
              <div className="flex items-start justify-between gap-2">
                <h4 className="font-bold text-foreground text-sm leading-tight">
                  {c.title}
                </h4>
                <span
                  className={`shrink-0 text-[0.65rem] font-semibold px-1.5 py-0.5 rounded ${LEVEL_BADGE_COLORS[c.level]}`}
                >
                  {c.level}
                </span>
              </div>

              {c.bermNote && (
                <p className="text-xs italic text-amber-600 dark:text-amber-400">
                  {c.bermNote}
                </p>
              )}

              <div>
                <p className="text-xs font-semibold text-foreground-muted uppercase tracking-wider mb-1">
                  {d.s2BlackmanLabel}
                </p>
                <p className="text-xs text-foreground-muted leading-relaxed">
                  {c.blackman}
                </p>
              </div>

              <div>
                <p className="text-xs font-semibold text-foreground-muted uppercase tracking-wider mb-1">
                  {d.s2ChiLabel}
                </p>
                <p className="text-xs text-foreground-muted leading-relaxed font-mono">
                  {c.chi}
                </p>
              </div>

              <div>
                <p className="text-xs font-semibold text-foreground-muted uppercase tracking-wider mb-1">
                  {d.s2LabLabel}
                </p>
                <p className="text-xs text-foreground-muted leading-relaxed">
                  {c.labImpact}
                </p>
              </div>

              <div>
                <p className="text-xs font-semibold text-foreground-muted uppercase tracking-wider mb-1">
                  {d.s2RefLabel}
                </p>
                <p className="text-xs text-foreground-muted leading-relaxed italic">
                  {c.ref}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Section 3: The Five-Parameter Standard ── */}
      <section className="mb-16 border-t editorial-rule pt-6">
        <h3 className="text-lg font-semibold mb-4">
          <span className="font-mono-num text-xs text-accent mr-2">03</span>
          {d.s3Title}
        </h3>

        <ol className="space-y-2 text-sm text-foreground-muted leading-relaxed max-w-4xl list-decimal list-inside">
          {standardItems.map((item, i) => (
            <li key={i} className="pl-1">
              <span className="font-medium text-foreground">
                {item.split(" — ")[0]}
              </span>
              {" — "}
              {item.split(" — ")[1]}
            </li>
          ))}
        </ol>

        <p className="mt-4 text-xs text-foreground-muted italic max-w-4xl">
          {d.s3Note}
        </p>
      </section>

      {/* ── Section 4: How This Resolves the Contradiction ── */}
      <section className="mb-16 border-t editorial-rule pt-6">
        <h3 className="text-lg font-semibold mb-4">
          <span className="font-mono-num text-xs text-accent mr-2">04</span>
          {d.s4Title}
        </h3>

        <div className="space-y-4 text-sm text-foreground-muted leading-relaxed max-w-4xl">
          <p className="editorial-rail text-[0.95rem] text-foreground">
            {d.s4p1}
          </p>
          <p>{d.s4p2}</p>
          <p>{d.s4p3}</p>
        </div>
      </section>

      {/* ── Section 5: Quantitative Moderator Analysis ── */}
      <section className="mb-16 border-t editorial-rule pt-6">
        <h3 className="text-lg font-semibold mb-4">
          <span className="font-mono-num text-xs text-accent mr-2">05</span>
          {d.s5Title}
        </h3>

        <p className="editorial-rail mb-6 text-[0.95rem] leading-relaxed text-foreground max-w-4xl">
          {d.s5Lead}
        </p>

        {/* Statistical results table */}
        <div className="rounded-xl border border-card-border bg-card p-5 mb-6 max-w-4xl overflow-x-auto">
          <p className="text-xs font-semibold text-foreground-muted uppercase tracking-wider mb-3">
            {d.s5StatsCaption}
          </p>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-card-border text-left">
                <th className="pb-2 pr-4 font-semibold text-foreground">{d.s5ModeratorCol}</th>
                <th className="pb-2 pr-4 font-semibold text-foreground text-right">{d.s5PosYesCol}</th>
                <th className="pb-2 pr-4 font-semibold text-foreground text-right">{d.s5PosNoCol}</th>
                <th className="pb-2 pr-4 font-semibold text-foreground text-right font-mono-num">&chi;&sup2;</th>
                <th className="pb-2 font-semibold text-foreground text-right font-mono-num">p</th>
              </tr>
            </thead>
            <tbody className="text-foreground-muted">
              <tr className="border-b border-card-border/50">
                <td className="py-2 pr-4">
                  {activeLocale === "fi"
                    ? "Laji/primaus (eläin=1)"
                    : "Species/priming (animal=1)"}
                </td>
                <td className="py-2 pr-4 text-right font-mono-num">92% (11/12)</td>
                <td className="py-2 pr-4 text-right font-mono-num">35% (6/17)</td>
                <td className="py-2 pr-4 text-right font-mono-num">9.4</td>
                <td className="py-2 text-right font-mono-num font-semibold text-green-600 dark:text-green-400">0.002</td>
              </tr>
              <tr className="border-b border-card-border/50">
                <td className="py-2 pr-4">
                  {activeLocale === "fi"
                    ? "Kesto (krooninen=1)"
                    : "Duration (chronic=1)"}
                </td>
                <td className="py-2 pr-4 text-right font-mono-num">92% (12/13)</td>
                <td className="py-2 pr-4 text-right font-mono-num">31% (5/16)</td>
                <td className="py-2 pr-4 text-right font-mono-num">10.8</td>
                <td className="py-2 text-right font-mono-num font-semibold text-green-600 dark:text-green-400">0.001</td>
              </tr>
              <tr>
                <td className="py-2 pr-4">
                  {activeLocale === "fi"
                    ? "Pulsaatio (=1)"
                    : "Pulsation (=1)"}
                </td>
                <td className="py-2 pr-4 text-right font-mono-num">88% (7/8)</td>
                <td className="py-2 pr-4 text-right font-mono-num">48% (10/21)</td>
                <td className="py-2 pr-4 text-right font-mono-num">3.9</td>
                <td className="py-2 text-right font-mono-num font-semibold text-amber-600 dark:text-amber-400">0.048</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Five-endpoint moderator matrix */}
        <div className="rounded-xl border border-card-border bg-card p-5 mb-6 max-w-4xl overflow-x-auto">
          <p className="text-xs font-semibold text-foreground-muted uppercase tracking-wider mb-3">
            {d.s5MatrixCaption}
          </p>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-card-border text-left">
                <th className="pb-2 pr-4 font-semibold text-foreground">{d.s5ModeratorCol}</th>
                <th className="pb-2 pr-2 font-semibold text-foreground text-center font-mono-num">MEL</th>
                <th className="pb-2 pr-2 font-semibold text-foreground text-center font-mono-num">SPERM</th>
                <th className="pb-2 pr-2 font-semibold text-foreground text-center font-mono-num">EEG</th>
                <th className="pb-2 pr-2 font-semibold text-foreground text-center font-mono-num">DNA</th>
                <th className="pb-2 font-semibold text-foreground text-center font-mono-num">OxS</th>
              </tr>
            </thead>
            <tbody className="text-foreground-muted">
              <tr className="border-b border-card-border/50">
                <td className="py-2 pr-4">{activeLocale === "fi" ? "Eläin > Ihminen" : "Animal > Human"}</td>
                <td className="py-2 pr-2 text-center">✓✓</td>
                <td className="py-2 pr-2 text-center">✓✓</td>
                <td className="py-2 pr-2 text-center">—</td>
                <td className="py-2 pr-2 text-center">✓✓</td>
                <td className="py-2 text-center">✓✓</td>
              </tr>
              <tr className="border-b border-card-border/50">
                <td className="py-2 pr-4">{activeLocale === "fi" ? "Krooninen > Akuutti" : "Chronic > Acute"}</td>
                <td className="py-2 pr-2 text-center">✓✓</td>
                <td className="py-2 pr-2 text-center">✓✓</td>
                <td className="py-2 pr-2 text-center">—</td>
                <td className="py-2 pr-2 text-center">✓✓</td>
                <td className="py-2 text-center">✓✓</td>
              </tr>
              <tr className="border-b border-card-border/50">
                <td className="py-2 pr-4">{activeLocale === "fi" ? "Pulsaatio > CW" : "Pulsed > CW"}</td>
                <td className="py-2 pr-2 text-center">—</td>
                <td className="py-2 pr-2 text-center">✓</td>
                <td className="py-2 pr-2 text-center">✓✓</td>
                <td className="py-2 pr-2 text-center">✓✓</td>
                <td className="py-2 text-center">—</td>
              </tr>
              <tr className="border-b border-card-border/50">
                <td className="py-2 pr-4">{activeLocale === "fi" ? "Genotyyppi" : "Genotype"}</td>
                <td className="py-2 pr-2 text-center">✓</td>
                <td className="py-2 pr-2 text-center">—</td>
                <td className="py-2 pr-2 text-center">✓✓</td>
                <td className="py-2 pr-2 text-center">—</td>
                <td className="py-2 text-center">—</td>
              </tr>
              <tr className="border-b border-card-border/50">
                <td className="py-2 pr-4">{activeLocale === "fi" ? "Vuodenaika" : "Season"}</td>
                <td className="py-2 pr-2 text-center">✓✓</td>
                <td className="py-2 pr-2 text-center">—</td>
                <td className="py-2 pr-2 text-center">—</td>
                <td className="py-2 pr-2 text-center">—</td>
                <td className="py-2 text-center">—</td>
              </tr>
              <tr className="border-b border-card-border/50">
                <td className="py-2 pr-4">{activeLocale === "fi" ? "Todellinen laite" : "Real device"}</td>
                <td className="py-2 pr-2 text-center">—</td>
                <td className="py-2 pr-2 text-center">—</td>
                <td className="py-2 pr-2 text-center">—</td>
                <td className="py-2 pr-2 text-center">✓✓</td>
                <td className="py-2 text-center">—</td>
              </tr>
              <tr className="border-b border-card-border/50">
                <td className="py-2 pr-4">{activeLocale === "fi" ? "Palautuminen" : "Recovery"}</td>
                <td className="py-2 pr-2 text-center">✓</td>
                <td className="py-2 pr-2 text-center">—</td>
                <td className="py-2 pr-2 text-center">—</td>
                <td className="py-2 pr-2 text-center">✓✓</td>
                <td className="py-2 text-center">—</td>
              </tr>
              <tr>
                <td className="py-2 pr-4">{activeLocale === "fi" ? "ICNIRP:n alla" : "Below ICNIRP"}</td>
                <td className="py-2 pr-2 text-center">—</td>
                <td className="py-2 pr-2 text-center">—</td>
                <td className="py-2 pr-2 text-center">—</td>
                <td className="py-2 pr-2 text-center">✓✓</td>
                <td className="py-2 text-center">—</td>
              </tr>
            </tbody>
          </table>
          <p className="mt-3 text-xs text-foreground-muted italic">{d.s5MatrixLegend}</p>
        </div>

        {/* Key finding boxes */}
        <div className="grid gap-4 md:grid-cols-3 max-w-4xl">
          <div className="border-l-4 border-amber-500 rounded-r-lg bg-card p-4 space-y-1">
            <h4 className="font-bold text-foreground text-sm">{d.s5KeyFinding1Title}</h4>
            <p className="text-xs text-foreground-muted leading-relaxed">{d.s5KeyFinding1Body}</p>
          </div>
          <div className="border-l-4 border-amber-500 rounded-r-lg bg-card p-4 space-y-1">
            <h4 className="font-bold text-foreground text-sm">{d.s5KeyFinding2Title}</h4>
            <p className="text-xs text-foreground-muted leading-relaxed">{d.s5KeyFinding2Body}</p>
          </div>
          <div className="border-l-4 border-amber-500 rounded-r-lg bg-card p-4 space-y-1">
            <h4 className="font-bold text-foreground text-sm">{d.s5KeyFinding3Title}</h4>
            <p className="text-xs text-foreground-muted leading-relaxed">{d.s5KeyFinding3Body}</p>
          </div>
        </div>
      </section>

      {/* ── See also navigation ── */}
      <section className="border-t editorial-rule pt-6">
        <h3 className="text-sm font-semibold text-foreground mb-3">
          {d.seeAlso}
        </h3>
        <div className="flex gap-6">
          <Link
            href={`/${locale}/evidence`}
            className="text-sm text-accent hover:underline"
          >
            {d.evidencePortal} &rarr;
          </Link>
          <Link
            href={`/${locale}/model`}
            className="text-sm text-accent hover:underline"
          >
            {d.modelPage} &rarr;
          </Link>
        </div>
      </section>
    </div>
  );
}
