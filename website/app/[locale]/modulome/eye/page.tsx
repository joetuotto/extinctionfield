import type { Metadata } from "next";
import Link from "next/link";
import { Eye } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";

const COPY = {
  en: {
    title: "Your Eyes Are Electromagnetic Sensors",
    subtitle:
      "CRY1 in blue cone outer segments, CRY2 in retinal ganglion cells, FAD chromophore — the eye as a dual magnetoreceptive organ",
    backLink: "← Back to Modulome",

    /* 01 Hero + Anatomy */
    s1Title: "Anatomy of Retinal Magnetoreception",
    s1p1:
      "The human retina contains two distinct cryptochrome systems. Bartolke et al. (2025, FASEB Journal) demonstrated that full-length CRY1 protein localizes exclusively to the outer segments of short-wavelength-sensitive blue cone photoreceptors in human, bonobo, and gorilla retinas. This placement far from nuclei suggests a non-circadian, phototransductive function. The stacked membrane lamellae of cone outer segments provide the structural order required for oriented radical pair magnetoreception.",
    s1p2:
      "CRY2 operates in retinal ganglion cells as part of the circadian light input pathway to the suprachiasmatic nucleus (SCN). Yap et al. (2025, Cells) showed that CRY2 physically interacts with TRPC1, forming a complex that co-translocates to the nucleus after pulsed electromagnetic field exposure. The FAD chromophore is required for both systems: without FAD, CRY proteins are unstable and magnetically insensitive.",
    s1p3:
      "This dual CRY architecture means the eye operates two parallel electromagnetic sensing channels: CRY1 in blue cones for directional magnetoreception, and CRY2 in ganglion cells for circadian-magnetic integration.",

    /* 02 Channel Profile */
    s2Title: "Channel Profile",
    s2Channels: [
      {
        name: "CRY1 (blue cone outer segments)",
        function: "Sensory magnetoreception",
        mechanism: "Radical pair mechanism (RPM) in stacked membrane lamellae",
        evidence: "Bartolke 2025 (FASEB J) — C-terminal antibody, human/bonobo/gorilla",
      },
      {
        name: "CRY2 (retinal ganglion cells)",
        function: "Circadian-magnetic integration",
        mechanism: "Forms physical complex with TRPC1 (Yap 2025), co-translocates to nucleus",
        evidence: "Yap 2025 (Cells) — CRY2-TRPC1 interaction, FAD-dependent",
      },
      {
        name: "FAD chromophore",
        function: "Radical pair substrate for both CRY systems",
        mechanism: "Blue light excites FAD → FADH• semiquinone → magnetically sensitive radical pair",
        evidence: "Hirano 2017 (Cell Reports) — B2 depletion → CRY degradation",
      },
    ],
    s2Convergence:
      "Dual-band convergence: optical blue light (∼450 nm) activates the CRY photocycle, while RF/ELF electromagnetic fields modulate the radical pair spin dynamics. Both channels converge on the same FAD-dependent radical pair intermediate.",

    /* 03 Mechanism Chain */
    s3Title: "Mechanism Chain",
    s3Chain:
      "Blue light → CRY → FAD• radical pair → RPM spin dynamics → circadian disruption → melatonin ↓ → HPG axis ↓",
    s3Iris:
      "Iris pigmentation modulates the entire chain at its entry point. Blue eyes transmit approximately 100× more blue light to the retina than brown eyes (Higuchi 2007: 89% vs 73% melatonin suppression under identical 1000 lux exposure). This is not a small effect — it is a nearly 2-fold difference in the gain of the entire downstream cascade.",
    s3Green:
      "Green eyes occupy a unique position: their lipochrome pigment acts as a bandpass filter transmitting the 450–570 nm CRY operational band while reducing UV and extreme blue that cause over-reduction of the semiquinone (Niessner 2014). This may optimize CRY stability over CRY activation — favoring circadian robustness over raw magnetoreceptive sensitivity.",

    /* 04 Evidence */
    s4Title: "Key Evidence",
    s4Studies: [
      {
        citation: "Bartolke et al. (FASEB J)",
        year: 2025,
        finding: "Full-length CRY1 in human blue cone outer segments. C-terminal antibody distinguishes full-length from truncated forms. QuantumBirds consortium.",
        level: "E",
      },
      {
        citation: "Chae et al. (PLOS ONE)",
        year: 2019,
        finding: "Starved men (n=20) oriented toward geomagnetic food direction (P<0.001). Effect required blue light (<500 nm). Women (n=21) showed no significant orientation.",
        level: "M|C",
      },
      {
        citation: "Higuchi et al. (Am J Physiol)",
        year: 2007,
        finding: "Light-eyed Caucasians: 89% melatonin suppression vs 73% for dark-eyed Asians under identical 1000 lux, 2h exposure. Iris pigmentation modulates non-visual pathway.",
        level: "M|C",
      },
      {
        citation: "Ritz et al. (Nature)",
        year: 2004,
        finding: "RF magnetic field (1.315 MHz, 470 nT) disrupted magnetic compass orientation in European robins. First evidence that biological magnetoreception uses radical pair mechanism.",
        level: "E",
      },
      {
        citation: "Yap et al. (Cells)",
        year: 2025,
        finding: "CRY2-TRPC1 physical complex. FAD depletion (RFK silencing) abolished both PEMF responsiveness and magnetic directional selectivity. Dark growth had same effect.",
        level: "E",
      },
      {
        citation: "Niessner et al. (J Exp Biol)",
        year: 2014,
        finding: "CRY photocycle: oxidized absorbs UV/blue (≤500 nm), semiquinone additionally absorbs green (≤570 nm). Green light maintains but cannot initiate CRY activation.",
        level: "E",
      },
    ],

    /* 05 Lindgren Analysis */
    s5Title: "Lindgren Analysis",
    s5p1:
      "The eye satisfies all six Lindgren criteria for EMF sensitivity. The selection function χ_eye depends on three primary modulators:",
    s5Criteria: [
      "Iris pigmentation — modulates photon flux to CRY (blue ≈ 100×, green ≈ 30×, brown ≈ 1×)",
      "FAD/B2 nutritional status — determines CRY protein stability and radical pair formation capacity",
      "Ambient light spectrum — blue content determines CRY activation state; darkness = magnetically blind",
    ],
    s5p2:
      "χ_eye = f(iris_pigmentation, FAD_status, I_blue). A blue-eyed, B2-replete individual under blue-rich lighting has maximum χ_eye. A brown-eyed, B2-deficient individual in darkness has minimum χ_eye. This is why EMF-eye studies produce inconsistent results: they do not control for the three dominant modulators.",

    /* 06 Predictions */
    s6Title: "Predictions",
    s6Predictions: [
      {
        id: "EYE-1",
        text: "Blue-eyed men outperform green-eyed men in geomagnetic orientation tasks under identical blue light conditions (replicate Chae 2019 with eye color grouping).",
        discriminating: true,
      },
      {
        id: "EYE-2",
        text: "Green-eyed women show more stable 24h melatonin profiles than blue-eyed women (lower CV in melatonin rhythm amplitude).",
        discriminating: true,
      },
      {
        id: "EYE-3",
        text: "B2 supplementation (25 mg/day) improves circadian resilience to nighttime EMF in subjects with high screen use and poor sleep quality.",
        discriminating: true,
      },
    ],

    seeAlso: "See also",
    modulomeOverview: "Modulome overview",
    evidencePortal: "Evidence register",
    citationLabel: "Citation",
    yearLabel: "Year",
    findingLabel: "Finding",
    levelLabel: "Level",
    channelLabel: "Channel",
    functionLabel: "Function",
    mechanismLabel: "Mechanism",
    evidenceLabel: "Evidence",
  },
  fi: {
    title: "Silmasi ovat sahkomagneettisia sensoreita",
    subtitle:
      "CRY1 sinisten tappisolujen ulkosegmenteissa, CRY2 verkkokalvon gangliosoluissa, FAD-kromofori — silma kaksoismagneettireseptiiivisena elimena",
    backLink: "← Takaisin moduloomiin",

    s1Title: "Verkkokalvon magnetoreseption anatomia",
    s1p1:
      "Ihmisen verkkokalvo sisaltaa kaksi erillistaa kryptokromijarjestelmaa. Bartolke ym. (2025, FASEB Journal) osoittivat, etta tayspitkaa CRY1-proteiinia esiintyy yksinomaan lyhytaaltoherkissa sinisten tappisolujen ulkosegmenteissa ihmisen, bonobon ja gorillan verkkokalvoilla. Tama sijainti kaukana tumista viittaa ei-sirkadiaaniseen, fototransduktiiviseen toimintaan. Tappisolujen ulkosegmenttien pinotut kalvolamellit tarjoavat orientoituneelle radikaaliparin magnetoreseptiolle tarvittavan rakenteellisen jarjestyksen.",
    s1p2:
      "CRY2 toimii verkkokalvon gangliosoluissa osana sirkadiaanista valosyotereittia suprakiasmaattiseen tumakkeeseen (SCN). Yap ym. (2025, Cells) osoittivat, etta CRY2 muodostaa fyysisen interaktion TRPC1:n kanssa, ja kompleksi siirtyy yhdessa tumaan pulssisahkomagneettisen kenttan altistuksen jalkeen. FAD-kromofori vaaditaan molemmissa jarjestelmissa: ilman FAD:ta CRY-proteiinit ovat epastabiileja ja magneettisesti epaherkkia.",
    s1p3:
      "Tama kaksoiskryptokromiarkkitehtuuri tarkoittaa, etta silma kayttaa kahta rinnakkaista sahkomagneettista aistikanavaa: CRY1 sinisissatapeissa suuntakohtaiseen magnetoreseptioon ja CRY2 gangliosoluissa sirkadiaaniseen magneettiseen integraatioon.",

    s2Title: "Kanavaprofiiili",
    s2Channels: [
      {
        name: "CRY1 (sinisten tappisolujen ulkosegmentit)",
        function: "Sensorinen magnetoreseptio",
        mechanism: "Radikaaliparin mekanismi (RPM) pinotuissa kalvolamelleissa",
        evidence: "Bartolke 2025 (FASEB J) — C-terminaalivasta-aine, ihminen/bonobo/gorilla",
      },
      {
        name: "CRY2 (verkkokalvon gangliosolut)",
        function: "Sirkadiaaninen magneettinen integraatio",
        mechanism: "Muodostaa fyysisen kompleksin TRPC1:n kanssa (Yap 2025), siirtyy tumaan",
        evidence: "Yap 2025 (Cells) — CRY2-TRPC1-interaktio, FAD-riippuvainen",
      },
      {
        name: "FAD-kromofori",
        function: "Radikaaliparin substraatti molemmille CRY-jarjestelmille",
        mechanism: "Sininen valo virittaa FAD:n → FADH•-semikinoni → magneettisesti herkka radikaalipari",
        evidence: "Hirano 2017 (Cell Reports) — B2-puutos → CRY-degradaatio",
      },
    ],
    s2Convergence:
      "Kaksikaistakohdennus: optinen sininen valo (∼450 nm) aktivoi CRY-fotosyklin, kun taas RF/ELF-sahkomagneettiset kentat moduloivat radikaaliparin spindynamiikkaa. Molemmat kanavat konvergoivat samaan FAD-riippuvaiseen radikaaliparin valitilaan.",

    s3Title: "Mekanismiketju",
    s3Chain:
      "Sininen valo → CRY → FAD•-radikaalipari → RPM-spindynamiikka → sirkadiaaninen hairio → melatoniini ↓ → HPG-akseli ↓",
    s3Iris:
      "Iiriksen pigmentaatio moduloi koko ketjun syottopisteessa. Siniset silmat paastavat noin 100× enemman sinista valoa verkkokalvolle kuin ruskeat silmat (Higuchi 2007: 89 % vs 73 % melatoniinisuppressio identtisessa 1000 luksin altistuksessa). Tama ei ole pieni efekti — se on lahes kaksinkertainen ero koko alavirran kaskadin vahvistuksessa.",
    s3Green:
      "Vihreat silmat ovat ainutlaatuisessa asemassa: niiden lipokromipigmentti toimii kaistanpaaastosuodattimena, joka paastaa 450–570 nm CRY:n operointikaistan samalla vahentaen UV:ta ja aarimmaaista sinista, joka aiheuttaa semikinoni yliredusointia (Niessner 2014). Tama voi optimoida CRY-stabiilisuuden CRY-aktivaation sijaan — suosien sirkadiaanista robustisuutta raaan magnetoreseptiivisen herkkyyden sijaan.",

    s4Title: "Keskeinene evidenssi",
    s4Studies: [
      {
        citation: "Bartolke ym. (FASEB J)",
        year: 2025,
        finding: "Tayspitkaa CRY1 ihmisen sinisten tappisolujen ulkosegmenteissa. C-terminaalivasta-aine erottaa tayspitkaan katkaistusta. QuantumBirds-konsortio.",
        level: "E",
      },
      {
        citation: "Chae ym. (PLOS ONE)",
        year: 2019,
        finding: "Nalkiintyneet miehet (n=20) orientoituivat kohti geomagneettista ruokasuuntaa (P<0,001). Vaikutus vaati sinista valoa (<500 nm). Naiset (n=21) eivat osoittaneet merkitsevaa orientaatiota.",
        level: "M|C",
      },
      {
        citation: "Higuchi ym. (Am J Physiol)",
        year: 2007,
        finding: "Vaaleasilmaiset kaukaasialaiset: 89 % melatoniinisuppressio vs 73 % tummasilmaisilla aasialaisilla identtisessa 1000 luksin 2h altistuksessa.",
        level: "M|C",
      },
      {
        citation: "Ritz ym. (Nature)",
        year: 2004,
        finding: "RF-magneettikentta (1,315 MHz, 470 nT) hairitsi punarintojen magneettista kompassiorientaatiota. Ensimmainen evidenssi radikaaliparin mekanismista.",
        level: "E",
      },
      {
        citation: "Yap ym. (Cells)",
        year: 2025,
        finding: "CRY2-TRPC1-fyysinen kompleksi. FAD-puutos (RFK-hiljennys) kumosi seka PEMF-vasteen etta magneettisen suuntaerottelun. Pimea tuotti saman vaikutuksen.",
        level: "E",
      },
      {
        citation: "Niessner ym. (J Exp Biol)",
        year: 2014,
        finding: "CRY-fotosykli: hapettunut absorboi UV/sinista (≤500 nm), semikinoni lisaksi vihreaa (≤570 nm). Vihrea valo yllapitaa mutta ei voi kaynnistaa CRY-aktivaatiota.",
        level: "E",
      },
    ],

    s5Title: "Lindgren-analyysi",
    s5p1:
      "Silma tayttaa kaikki kuusi Lindgrenin kriteeria EMF-herkkyydelle. Valintafunktio χ_eye riippuu kolmesta paamodulaattorista:",
    s5Criteria: [
      "Iiriksen pigmentaatio — moduloi fotonivuota CRY:lle (sininen ≈ 100×, vihrea ≈ 30×, ruskea ≈ 1×)",
      "FAD/B2-ravitsemustila — maaraa CRY-proteiinin stabiilisuuden ja radikaaliparin muodostuskyvyn",
      "Ympariston valospektri — sininen sisalto maaraa CRY:n aktivaatiotilan; pimeys = magneettisesti sokea",
    ],
    s5p2:
      "χ_eye = f(iiris_pigmentaatio, FAD_tila, I_sininen). Sinisilmainen, B2-rikas henkiloo sinisessa valossa omaa maksimaalisen χ_eye:n. Ruskesilmainen, B2-puutteinen henkiloo pimeassa omaa minimaalisen χ_eye:n. Tama selittaa miksi EMF-silmatutkimukset tuottavat ristiriitaisia tuloksia: ne eivat kontrolloi kolmea dominoivaa modulaattoria.",

    s6Title: "Ennusteet",
    s6Predictions: [
      {
        id: "EYE-1",
        text: "Sinisilmaiset miehet suoriutuvat vihreasilmaisia paremmin geomagneettisissa orientaatiotehtavissa identtisissa sinisen valon olosuhteissa (toista Chae 2019 silmanvariryhmittelylla).",
        discriminating: true,
      },
      {
        id: "EYE-2",
        text: "Vihreasilmaisilla naisilla on vakaampi 24h melatoniiniprofiili kuin sinisilmaisilla (pienempi CV melatoniinirytmin amplitudissa).",
        discriminating: true,
      },
      {
        id: "EYE-3",
        text: "B2-lisa (25 mg/pv) parantaa sirkadiaanista resilienssia yolliselle EMF-altistukselle henkiloilla joilla on runsas ruutuaika ja huono unenlaatu.",
        discriminating: true,
      },
    ],

    seeAlso: "Katso myos",
    modulomeOverview: "Moduloomin yleiskatsaus",
    evidencePortal: "Evidenssirekisteri",
    citationLabel: "Viite",
    yearLabel: "Vuosi",
    findingLabel: "Loydos",
    levelLabel: "Taso",
    channelLabel: "Kanava",
    functionLabel: "Toiminto",
    mechanismLabel: "Mekanismi",
    evidenceLabel: "Evidenssi",
  },
};

const LEVEL_BADGE: Record<string, string> = {
  E: "bg-green-500/10 text-green-600 dark:text-green-400",
  "M|C": "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  C: "bg-orange-500/10 text-orange-600 dark:text-orange-400",
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const d = locale === "fi" ? COPY.fi : COPY.en;
  return {
    title: `${d.title} – Extinction Field`,
    description: d.subtitle,
  };
}

export default async function EyePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const activeLocale = locale === "fi" ? "fi" : "en";
  const d = COPY[activeLocale];

  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <Link
        href={`/${locale}/modulome`}
        className="text-sm text-accent hover:underline mb-6 inline-block"
      >
        {d.backLink}
      </Link>

      <PageHeader icon={Eye} title={d.title} subtitle={d.subtitle} />

      {/* 01 — Hero + Anatomy */}
      <section className="mb-16 border-t editorial-rule pt-6">
        <article id="anatomy" className="scroll-mt-24">
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

      {/* 02 — Channel Profile */}
      <section className="mb-16 border-t editorial-rule pt-6">
        <h3 className="text-lg font-semibold mb-6">
          <span className="font-mono-num text-xs text-accent mr-2">02</span>
          {d.s2Title}
        </h3>

        <div className="grid gap-6 md:grid-cols-3">
          {d.s2Channels.map((ch, i) => (
            <div
              key={i}
              className="border-l-4 border-accent/40 rounded-r-lg bg-card p-5 space-y-3"
            >
              <h4 className="font-bold text-foreground text-sm leading-tight">
                {ch.name}
              </h4>
              <div>
                <p className="text-xs font-semibold text-foreground-muted uppercase tracking-wider mb-1">
                  {d.functionLabel}
                </p>
                <p className="text-xs text-foreground-muted leading-relaxed">
                  {ch.function}
                </p>
              </div>
              <div>
                <p className="text-xs font-semibold text-foreground-muted uppercase tracking-wider mb-1">
                  {d.mechanismLabel}
                </p>
                <p className="text-xs text-foreground-muted leading-relaxed">
                  {ch.mechanism}
                </p>
              </div>
              <div>
                <p className="text-xs font-semibold text-foreground-muted uppercase tracking-wider mb-1">
                  {d.evidenceLabel}
                </p>
                <p className="text-xs text-foreground-muted leading-relaxed italic">
                  {ch.evidence}
                </p>
              </div>
            </div>
          ))}
        </div>

        <p className="mt-6 text-sm text-foreground-muted leading-relaxed max-w-4xl border-l-2 border-accent/20 pl-3">
          {d.s2Convergence}
        </p>
      </section>

      {/* 03 — Mechanism Chain */}
      <section className="mb-16 border-t editorial-rule pt-6">
        <h3 className="text-lg font-semibold mb-4">
          <span className="font-mono-num text-xs text-accent mr-2">03</span>
          {d.s3Title}
        </h3>

        <div className="bg-card rounded-lg border border-card-border p-5 mb-6">
          <p className="font-mono text-sm text-accent leading-relaxed text-center">
            {d.s3Chain}
          </p>
        </div>

        <div className="space-y-4 text-sm text-foreground-muted leading-relaxed max-w-4xl">
          <p className="editorial-rail text-[0.95rem] text-foreground">
            {d.s3Iris}
          </p>
          <p>{d.s3Green}</p>
        </div>
      </section>

      {/* 04 — Evidence */}
      <section className="mb-16 border-t editorial-rule pt-6">
        <h3 className="text-lg font-semibold mb-6">
          <span className="font-mono-num text-xs text-accent mr-2">04</span>
          {d.s4Title}
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-card-border text-left text-xs text-foreground-muted uppercase tracking-wider">
                <th className="py-2 pr-3">{d.citationLabel}</th>
                <th className="py-2 pr-3 w-16">{d.yearLabel}</th>
                <th className="py-2 pr-3">{d.findingLabel}</th>
                <th className="py-2 w-14">{d.levelLabel}</th>
              </tr>
            </thead>
            <tbody>
              {d.s4Studies.map((s) => (
                <tr
                  key={`${s.citation}-${s.year}`}
                  className="border-b border-card-border/40"
                >
                  <td className="py-2 pr-3 font-medium text-foreground">
                    {s.citation}
                  </td>
                  <td className="py-2 pr-3 font-mono-num text-foreground-muted">
                    {s.year}
                  </td>
                  <td className="py-2 pr-3 text-foreground-muted">
                    {s.finding}
                  </td>
                  <td className="py-2">
                    <span
                      className={`text-[0.65rem] font-semibold px-1.5 py-0.5 rounded ${LEVEL_BADGE[s.level] ?? ""}`}
                    >
                      {s.level}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* 05 — Lindgren Analysis */}
      <section className="mb-16 border-t editorial-rule pt-6">
        <h3 className="text-lg font-semibold mb-4">
          <span className="font-mono-num text-xs text-accent mr-2">05</span>
          {d.s5Title}
        </h3>

        <p className="text-sm text-foreground-muted leading-relaxed mb-4 max-w-4xl">
          {d.s5p1}
        </p>

        <ol className="space-y-2 text-sm text-foreground-muted leading-relaxed max-w-4xl list-decimal list-inside mb-6">
          {d.s5Criteria.map((c, i) => (
            <li key={i} className="pl-1">
              <span className="font-medium text-foreground">
                {c.split(" — ")[0]}
              </span>
              {" — "}
              {c.split(" — ")[1]}
            </li>
          ))}
        </ol>

        <div className="bg-card rounded-lg border border-card-border p-5">
          <p className="font-mono text-xs text-foreground-muted leading-relaxed">
            {d.s5p2}
          </p>
        </div>
      </section>

      {/* 06 — Predictions */}
      <section className="mb-16 border-t editorial-rule pt-6">
        <h3 className="text-lg font-semibold mb-6">
          <span className="font-mono-num text-xs text-accent mr-2">06</span>
          {d.s6Title}
        </h3>

        <div className="space-y-4">
          {d.s6Predictions.map((p) => (
            <div
              key={p.id}
              className="border-l-4 border-green-500 rounded-r-lg bg-card p-4"
            >
              <div className="flex items-start justify-between gap-2 mb-2">
                <span className="font-mono-num text-xs font-bold text-accent">
                  {p.id}
                </span>
                {p.discriminating && (
                  <span className="shrink-0 text-[0.65rem] font-semibold px-1.5 py-0.5 rounded bg-green-500/10 text-green-600 dark:text-green-400">
                    {activeLocale === "fi" ? "Erotteleva" : "Discriminating"}
                  </span>
                )}
              </div>
              <p className="text-sm text-foreground-muted leading-relaxed">
                {p.text}
              </p>
              <Link
                href={`/${locale}/predictions`}
                className="text-xs text-accent hover:underline mt-2 inline-block"
              >
                {activeLocale === "fi"
                  ? "Kaikki ennusteet →"
                  : "All predictions →"}
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* See also */}
      <section className="border-t editorial-rule pt-6">
        <h3 className="text-sm font-semibold text-foreground mb-3">
          {d.seeAlso}
        </h3>
        <div className="flex gap-6">
          <Link
            href={`/${locale}/modulome`}
            className="text-sm text-accent hover:underline"
          >
            {d.modulomeOverview} &rarr;
          </Link>
          <Link
            href={`/${locale}/evidence`}
            className="text-sm text-accent hover:underline"
          >
            {d.evidencePortal} &rarr;
          </Link>
        </div>
      </section>
    </div>
  );
}
