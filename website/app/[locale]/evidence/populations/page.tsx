import type { Metadata } from "next";
import Link from "next/link";
import { Users } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import {
  LOW_EMF_POPULATIONS,
  MODERN_COMPARISONS,
  CASCADE_COMPARISON,
  MYOPIA_GRADIENT,
} from "@/lib/populationData";

const COPY = {
  en: {
    title: "Natural Control Groups",
    subtitle:
      "Nine low-EMF populations compared to modern populations across seven health metrics. The Tsimane–Mosetén gradient, myopia dose-response, and BERM cascade test.",
    backLink: "← Back to Evidence",
    warningTitle: "Massive confounders",
    warningText:
      "Every population listed below differs from modern societies in diet, exercise, community structure, chemical exposure, and genetics. None of this is proof that EMF causes disease. It is a consistency check: do low-EMF populations show the health patterns BERM predicts? If they did not, BERM would be falsified. That they do is necessary but not sufficient.",
    s1Kicker: "SECTION 1",
    s1Title: "Why These Populations Matter",
    s1Text: [
      "BERM predicts that populations with near-zero anthropogenic EMF exposure should exhibit: high fertility (TFR > 4), low cardiovascular disease, low dementia, low obesity, low T2D, and low depression. These are not cherry-picked outcomes — they are the direct predictions of the seven disease cascades in the model.",
      "We cannot run a controlled experiment removing EMF from a modern city. But populations that never adopted electricity or personal technology provide a natural baseline. If the model is wrong, at least some of these populations should show modern disease patterns. None do.",
    ],
    s2Kicker: "SECTION 2",
    s2Title: "Population Comparison",
    tableHeaders: {
      population: "Population",
      location: "Location",
      emf: "EMF Level",
      tfr: "TFR",
      cvd: "CVD",
      dementia: "Dementia",
      obesity: "Obesity",
      t2d: "T2D",
      cancer: "Cancer",
      depression: "Depression",
    },
    s3Kicker: "SECTION 3",
    s3Title: "Tsimane → Mosetén → Modern Gradient",
    s3Text: [
      "This is the strongest single piece of population-level evidence for BERM. The Tsimane and Mosetén share genetic ancestry, geographic region, and base subsistence patterns. They differ primarily in degree of modernization: the Mosetén have more technology, more medicine, more infrastructure.",
      "On every measured health variable, the Mosetén fall BETWEEN Tsimane and Western populations. This is a dose-response gradient that controls for genetics — the most common confounder objection.",
    ],
    gradientLabels: [
      {
        name: "Tsimane",
        chi: "χ_env = 0",
        desc: "No electricity, no phones, no modern technology",
        health: "Lowest CVD ever recorded. Dementia 1.2%. Brain atrophy 70% slower.",
      },
      {
        name: "Mosetén",
        chi: "χ_env > 0",
        desc: "Shared ancestry with Tsimane but more technology and infrastructure",
        health: "CVD low. Dementia intermediate. Brain atrophy intermediate.",
      },
      {
        name: "Modern (USA)",
        chi: "χ_env = high",
        desc: "Full electrification, smartphones, dense RF environment",
        health: "CVD high. Dementia 8–11%. Obesity 42%. TFR 1.66.",
      },
    ],
    gradientPunchline:
      "Same genes. Same region. Same base diet. Different technology. Different health. On every variable.",
    s4Kicker: "SECTION 4",
    s4Title: "Myopia Gradient",
    s4Text: [
      "Myopia prevalence follows a five-level gradient that tracks technology adoption, not genetics. This is measured by refractometry — an objective physical measurement, not self-report.",
      "The COVID-19 pandemic provided a temporal test: screen time increased dramatically during lockdowns, and a corresponding spike in childhood myopia was observed globally (meta-analyses report 1.5–3× increase in progression). This is consistent with the RF/screen-light channel in BERM’s three-channel model.",
    ],
    myopiaHeaders: { region: "Region", prevalence: "Myopia Prevalence", tech: "Technology Level" },
    s5Kicker: "SECTION 5",
    s5Title: "BERM Cascade Test",
    s5Text:
      "BERM predicts 16 disease cascades where VGCC-mediated Ca²⁺ dysregulation produces specific pathologies. For each cascade, we ask: do low-EMF populations show lower prevalence? Of 16 cascades, 11 are confirmed consistent (69%), 5 have no data, and 0 are contradicted.",
    cascadeHeaders: {
      cascade: "Cascade",
      lowEmf: "Low-EMF",
      modern: "Modern",
      mechanism: "BERM Mechanism",
      status: "Status",
    },
    cascadeSummary: "11/16 confirmed · 5/16 no data · 0/16 contradicted",
    s6Kicker: "SECTION 6",
    s6Title: "What This Does NOT Prove",
    s6Text: [
      "Every population above differs from modern societies in multiple ways simultaneously. Confounders include:",
    ],
    confounders: [
      "Diet — more whole foods, less processed sugar, different macronutrient ratios",
      "Exercise — Hadza walk ~17,000 steps/day vs USA ~4,000",
      "Community structure — extended families, social support, less isolation",
      "Chemical exposure — no pesticides, no microplastics, no industrial pollution",
      "Genetics — population-specific adaptations over millennia",
    ],
    s6Text2: [
      "This evidence is CONSISTENCY with BERM, not proof of it. Any of the confounders above could explain some or all of the observed differences. The Tsimane→Mosetén gradient is the strongest argument because it controls for genetics and geography, isolating technology adoption as the primary variable.",
      "To move from consistency to evidence, we need prospective studies in populations where EMF is the primary variable that changes. Two are proposed below.",
    ],
    proposedStudies: [
      {
        id: "DIFF-1",
        title: "AGD Measurement: Tsimane vs Urban Trinidadian Neonates",
        desc: "Anogenital distance (AGD) is a marker of prenatal androgen exposure and is reduced by endocrine disruptors. BERM predicts EMF-mediated testosterone suppression would reduce AGD. Comparing Tsimane neonates (zero EMF) with urban Trinidadian neonates (high EMF, similar latitude and genetic admixture) would test this prediction.",
      },
      {
        id: "AMISH-1",
        title: "Amish TFR vs Distance to Nearest Urban Area",
        desc: "The Amish reject personal technology but live surrounded by ambient EMF from nearby cities. If ambient exposure matters, Amish communities closer to urban centers should have lower TFR than remote ones. This is testable with existing demographic data and geospatial analysis.",
      },
    ],
    proposedTitle: "Proposed Studies",
    navPredictions: "Predictions →",
    navModel: "Model Specification →",
  },
  fi: {
    title: "Luonnolliset kontrolliryhmät",
    subtitle:
      "Yhdeksän matalan EMF:n populaatiota verrattuna moderneihin väestöihin seitsemässä terveysmittarissa. Tsimane–Mosetén-gradientti, likitaitteisuuden annos-vaste ja BERM-kaskaditesti.",
    backLink: "← Takaisin evidenssiin",
    warningTitle: "Massiiviset sekoittavat tekijät",
    warningText:
      "Jokainen alla listattu populaatio eroaa moderneista yhteiskunnista ruokavalion, liikunnan, yhteisörakenteen, kemikaalialtistuksen ja genetiikan osalta. Mikään tästä ei todista, että EMF aiheuttaa sairauksia. Kyseessä on yhteensopivuustarkistus: osoittavatko matalan EMF:n populaatiot BERM:n ennustamat terveyskuviot? Jos eivät osoittaisi, BERM olisi falsifioitu. Se, että osoittavat, on välttämätöntä mutta ei riittävää.",
    s1Kicker: "OSIO 1",
    s1Title: "Miksi nämä populaatiot ovat merkityksellisiä",
    s1Text: [
      "BERM ennustaa, että populaatioilla, joiden antropogeeninen EMF-altistus on lähes nolla, tulisi olla: korkea hedelmällisyys (TFR > 4), matala sydän- ja verisuonitauti, matala dementia, matala obesiteetti, matala T2D ja matala masennus. Nämä eivät ole valikoituja tuloksia — ne ovat mallin seitsemän tautikaskadin suorat ennusteet.",
      "Emme voi tehdä kontrolloitua koetta poistamalla EMF:n modernista kaupungista. Mutta populaatiot, jotka eivät koskaan omaksuneet sähköä tai henkilökohtaista teknologiaa, tarjoavat luonnollisen lähtötason. Jos malli on väärässä, ainakin joidenkin näiden populaatioiden pitäisi osoittaa moderneja tautikuvioita. Yksikään ei osoita.",
    ],
    s2Kicker: "OSIO 2",
    s2Title: "Populaatiovertailu",
    tableHeaders: {
      population: "Populaatio",
      location: "Sijainti",
      emf: "EMF-taso",
      tfr: "TFR",
      cvd: "CVD",
      dementia: "Dementia",
      obesity: "Obesiteetti",
      t2d: "T2D",
      cancer: "Syöpä",
      depression: "Masennus",
    },
    s3Kicker: "OSIO 3",
    s3Title: "Tsimane → Mosetén → Moderni -gradientti",
    s3Text: [
      "Tämä on vahvin yksittäinen populaatiotason evidenssi BERM:lle. Tsimane ja Mosetén jakavat geneettisen taustan, maantieteellisen alueen ja peruselinkeinon. He eroavat ensisijaisesti modernisaation asteessa: Moseténilla on enemmän teknologiaa, enemmän lääketiedettä, enemmän infrastruktuuria.",
      "Jokaisessa mitatussa terveysmuuttujassa Mosetén sijoittuu Tsimanen ja länsimaisten populaatioiden VÄLIIN. Tämä on annos-vastegradientti, joka kontrolloi genetiikkaa — yleisin sekoittava tekijä -vastaväitteen.",
    ],
    gradientLabels: [
      {
        name: "Tsimane",
        chi: "χ_env = 0",
        desc: "Ei sähköä, ei puhelimia, ei modernia teknologiaa",
        health: "Matalin CVD koskaan mitattu. Dementia 1,2 %. Aivoatrofia 70 % hitaampi.",
      },
      {
        name: "Mosetén",
        chi: "χ_env > 0",
        desc: "Jaettu syntyperä Tsimanen kanssa mutta enemmän teknologiaa ja infrastruktuuria",
        health: "CVD matala. Dementia keskitaso. Aivoatrofia keskitaso.",
      },
      {
        name: "Moderni (USA)",
        chi: "χ_env = korkea",
        desc: "Täysi sähköistys, älypuhelimet, tiheä RF-ympäristö",
        health: "CVD korkea. Dementia 8–11 %. Obesiteetti 42 %. TFR 1,66.",
      },
    ],
    gradientPunchline:
      "Samat geenit. Sama alue. Sama perusruokavalio. Eri teknologia. Eri terveys. Jokaisessa muuttujassa.",
    s4Kicker: "OSIO 4",
    s4Title: "Likitaitteisuusgradientti",
    s4Text: [
      "Likitaitteisuuden esiintyvyys seuraa viisitasoista gradienttia, joka seuraa teknologian omaksumista, ei genetiikkaa. Tämä mitataan refraktometrialla — objektiivinen fysikaalinen mittaus, ei itseraportointi.",
      "COVID-19-pandemia tarjosi ajallisen testin: ruutuaika kasvoi dramaattisesti lockdownien aikana, ja vastaava piikki lasten likitaitteisuudessa havaittiin maailmanlaajuisesti (meta-analyysit raportoivat 1,5–3× etenemisen kasvu). Tämä on yhdenmukainen BERM:n kolmikanavamallin RF/ruutuvalokanavan kanssa.",
    ],
    myopiaHeaders: { region: "Alue", prevalence: "Likitaitteisuus", tech: "Teknologiataso" },
    s5Kicker: "OSIO 5",
    s5Title: "BERM-kaskaditesti",
    s5Text:
      "BERM ennustaa 16 tautikaskadia, joissa VGCC-välitteinen Ca²⁺-dysregulaatio tuottaa spesifisiä patologioita. Jokaiselle kaskadille kysymme: osoittavatko matalan EMF:n populaatiot matalampaa esiintyvyyttä? 16 kaskadista 11 on vahvistettu yhteensopivaksi (69 %), 5:stä ei ole dataa ja 0 on ristiriidassa.",
    cascadeHeaders: {
      cascade: "Kaskadi",
      lowEmf: "Matala EMF",
      modern: "Moderni",
      mechanism: "BERM-mekanismi",
      status: "Tila",
    },
    cascadeSummary: "11/16 vahvistettu · 5/16 ei dataa · 0/16 ristiriidassa",
    s6Kicker: "OSIO 6",
    s6Title: "Mitä tämä EI todista",
    s6Text: [
      "Jokainen yllä oleva populaatio eroaa moderneista yhteiskunnista useilla tavoilla samanaikaisesti. Sekoittavia tekijöitä ovat:",
    ],
    confounders: [
      "Ruokavalio — enemmän kokonaisia ruokia, vähemmän prosessoitua sokeria, erilaiset makroravinnesuhteet",
      "Liikunta — Hadza kävelee ~17 000 askelta/vrk vs USA ~4 000",
      "Yhteisörakenne — suurperheitä, sosiaalinen tuki, vähemmän eristäytymistä",
      "Kemikaalialtistus — ei torjunta-aineita, ei mikromuoveja, ei teollisuussaasteita",
      "Genetiikka — populaatiospesifisiä adaptaatioita vuosituhansien ajalta",
    ],
    s6Text2: [
      "Tämä evidenssi on YHTEENSOPIVUUTTA BERM:n kanssa, ei sen todistusta. Mikä tahansa yllä olevista sekoittavista tekijöistä voisi selittää osan tai kaikki havaitut erot. Tsimane→Mosetén-gradientti on vahvin argumentti, koska se kontrolloi genetiikkaa ja maantiedettä, eristäen teknologian omaksumisen ensisijaiseksi muuttujaksi.",
      "Siirtyäksemme yhteensopivuudesta evidenssiin tarvitsemme prospektiivisia tutkimuksia populaatioissa, joissa EMF on ensisijainen muuttuva tekijä. Kaksi ehdotetaan alla.",
    ],
    proposedStudies: [
      {
        id: "DIFF-1",
        title: "AGD-mittaus: Tsimane vs kaupunkimaiset trinidadilaiset vastasyntyneet",
        desc: "Anogenitaalinen etäisyys (AGD) on prenataalisen androgeenialtistuksen markkeri ja endokriinihäiritsijät pienentävät sitä. BERM ennustaa, että EMF-välitteinen testosteronin suppressio pienentäisi AGD:tä. Tsimanen vastasyntyneiden (nolla-EMF) vertaaminen kaupunkimaisten trinidadilaisten vastasyntyneiden (korkea EMF, vastaava leveysaste ja geneettinen sekoittuminen) kanssa testaisi tätä ennustetta.",
      },
      {
        id: "AMISH-1",
        title: "Amissien TFR vs etäisyys lähimpään kaupunkialueeseen",
        desc: "Amissit hylkäävät henkilökohtaisen teknologian mutta elävät läheisten kaupunkien ambientin EMF:n ympäröiminä. Jos ambient-altistus merkitsee, kaupunkikeskustojen lähellä olevien amissiyhteisöjen TFR:n tulisi olla matalampi kuin syrjäisten. Tämä on testattavissa olemassa olevalla demografisella datalla ja geospatiaalisella analyysillä.",
      },
    ],
    proposedTitle: "Ehdotetut tutkimukset",
    navPredictions: "Ennusteet →",
    navModel: "Mallispesifikaatio →",
  },
} as const;

/* --- Helpers --- */

function cellColor(value: string, isModern: boolean): string {
  if (isModern) return "text-red-500 dark:text-red-400";
  if (value === "?") return "text-foreground-muted/50";
  return "text-green-600 dark:text-green-400";
}

function techBar(level: number): string {
  const filled = "█".repeat(level);
  const empty = "░".repeat(5 - level);
  return filled + empty;
}

/* --- Metadata --- */

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

/* --- Page --- */

export default async function PopulationsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const isFi = locale === "fi";
  const d = isFi ? COPY.fi : COPY.en;

  const confirmed = CASCADE_COMPARISON.filter((c) => c.confirmed === true).length;
  const noData = CASCADE_COMPARISON.filter((c) => c.confirmed === null).length;
  const contradicted = CASCADE_COMPARISON.filter((c) => c.confirmed === false).length;

  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <Link
        href={`/${locale}/evidence`}
        className="text-sm text-accent hover:underline mb-6 inline-block"
      >
        {d.backLink}
      </Link>

      <PageHeader icon={Users} title={d.title} subtitle={d.subtitle} />

      {/* Warning box */}
      <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 p-5 mb-12">
        <h3 className="font-semibold text-amber-800 dark:text-amber-300 mb-2">
          {d.warningTitle}
        </h3>
        <p className="text-sm text-amber-800 dark:text-amber-300 leading-relaxed">
          {d.warningText}
        </p>
      </div>

      {/* Section 1: Why these populations matter */}
      <section className="mb-16 border-t editorial-rule pt-6">
        <p className="editorial-kicker text-accent mb-2">{d.s1Kicker}</p>
        <h2 className="editorial-section-heading mb-4">{d.s1Title}</h2>
        <div className="space-y-3 text-sm text-foreground-muted leading-relaxed max-w-4xl">
          {d.s1Text.map((p, i) => (
            <p key={i} className={i === 0 ? "editorial-rail text-[0.95rem] text-foreground" : ""}>
              {p}
            </p>
          ))}
        </div>
      </section>

      {/* Section 2: Population comparison table */}
      <section className="mb-16 border-t editorial-rule pt-6">
        <p className="editorial-kicker text-accent mb-2">{d.s2Kicker}</p>
        <h2 className="editorial-section-heading mb-4">{d.s2Title}</h2>
        <div className="rounded-xl border border-card-border bg-card-bg p-5">
          <div className="overflow-x-auto">
            <table className="w-full text-xs border-collapse whitespace-nowrap">
              <thead>
                <tr className="border-b border-card-border text-left uppercase tracking-wider text-foreground-muted">
                  <th className="py-2 pr-3 sticky left-0 bg-card-bg z-10">{d.tableHeaders.population}</th>
                  <th className="py-2 pr-3">{d.tableHeaders.location}</th>
                  <th className="py-2 pr-3">{d.tableHeaders.emf}</th>
                  <th className="py-2 pr-3">{d.tableHeaders.tfr}</th>
                  <th className="py-2 pr-3">{d.tableHeaders.cvd}</th>
                  <th className="py-2 pr-3">{d.tableHeaders.dementia}</th>
                  <th className="py-2 pr-3">{d.tableHeaders.obesity}</th>
                  <th className="py-2 pr-3">{d.tableHeaders.t2d}</th>
                  <th className="py-2 pr-3">{d.tableHeaders.cancer}</th>
                  <th className="py-2">{d.tableHeaders.depression}</th>
                </tr>
              </thead>
              <tbody>
                {LOW_EMF_POPULATIONS.map((pop) => (
                  <tr key={pop.id} className="border-b border-card-border/40">
                    <td className="py-2 pr-3 font-semibold text-foreground sticky left-0 bg-card-bg z-10">
                      {isFi ? pop.nameFi : pop.nameEn}
                    </td>
                    <td className="py-2 pr-3 text-foreground-muted">{pop.location}</td>
                    <td className="py-2 pr-3">
                      <span className="inline-block rounded-full px-2 py-0.5 text-xs font-semibold bg-green-500/10 text-green-600 dark:text-green-400">
                        {isFi ? pop.emfLabelFi : pop.emfLabelEn}
                      </span>
                    </td>
                    <td className={`py-2 pr-3 font-mono-num ${cellColor(pop.health.tfr ?? "?", false)}`}>
                      {pop.health.tfr ?? "?"}
                    </td>
                    <td className={`py-2 pr-3 ${cellColor(pop.health.cvd, false)}`}>{pop.health.cvd}</td>
                    <td className={`py-2 pr-3 ${cellColor(pop.health.dementia, false)}`}>{pop.health.dementia}</td>
                    <td className={`py-2 pr-3 ${cellColor(pop.health.obesity, false)}`}>{pop.health.obesity}</td>
                    <td className={`py-2 pr-3 ${cellColor(pop.health.t2d, false)}`}>{pop.health.t2d}</td>
                    <td className={`py-2 pr-3 ${cellColor(pop.health.cancer, false)}`}>{pop.health.cancer}</td>
                    <td className={`py-2 ${cellColor(pop.health.depression, false)}`}>{pop.health.depression}</td>
                  </tr>
                ))}
                {/* Separator */}
                <tr>
                  <td colSpan={10} className="py-1">
                    <div className="border-t-2 border-dashed border-card-border" />
                  </td>
                </tr>
                {/* Modern comparisons */}
                {MODERN_COMPARISONS.map((pop) => (
                  <tr key={pop.id} className="border-b border-card-border/40 bg-red-500/5">
                    <td className="py-2 pr-3 font-semibold text-foreground sticky left-0 bg-red-500/5 z-10">
                      {isFi ? pop.nameFi : pop.nameEn}
                    </td>
                    <td className="py-2 pr-3 text-foreground-muted">—</td>
                    <td className="py-2 pr-3">
                      <span className="inline-block rounded-full px-2 py-0.5 text-xs font-semibold bg-red-500/10 text-red-500 dark:text-red-400">
                        {isFi ? pop.emfLabelFi : pop.emfLabelEn}
                      </span>
                    </td>
                    <td className={`py-2 pr-3 font-mono-num ${cellColor(pop.health.tfr ?? "?", true)}`}>
                      {pop.health.tfr ?? "?"}
                    </td>
                    <td className={`py-2 pr-3 ${cellColor(pop.health.cvd, true)}`}>{pop.health.cvd}</td>
                    <td className={`py-2 pr-3 ${cellColor(pop.health.dementia, true)}`}>{pop.health.dementia}</td>
                    <td className={`py-2 pr-3 ${cellColor(pop.health.obesity, true)}`}>{pop.health.obesity}</td>
                    <td className={`py-2 pr-3 ${cellColor(pop.health.t2d, true)}`}>{pop.health.t2d}</td>
                    <td className={`py-2 pr-3 ${cellColor(pop.health.cancer, true)}`}>{pop.health.cancer}</td>
                    <td className={`py-2 ${cellColor(pop.health.depression, true)}`}>{pop.health.depression}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Section 3: Tsimane -> Moseten -> Modern gradient */}
      <section className="mb-16 border-t editorial-rule pt-6">
        <p className="editorial-kicker text-accent mb-2">{d.s3Kicker}</p>
        <h2 className="editorial-section-heading mb-4">{d.s3Title}</h2>
        <div className="space-y-3 text-sm text-foreground-muted leading-relaxed max-w-4xl mb-8">
          {d.s3Text.map((p, i) => (
            <p key={i} className={i === 0 ? "editorial-rail text-[0.95rem] text-foreground" : ""}>
              {p}
            </p>
          ))}
        </div>

        {/* Gradient visualization */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {d.gradientLabels.map((step, i) => {
            const colors = [
              "border-green-500/40 bg-green-500/5",
              "border-amber-500/40 bg-amber-500/5",
              "border-red-500/40 bg-red-500/5",
            ];
            const dotColors = [
              "bg-green-500",
              "bg-amber-500",
              "bg-red-500",
            ];
            return (
              <div key={i} className={`rounded-xl border ${colors[i]} p-5 relative`}>
                {i < 2 && (
                  <div className="hidden md:block absolute -right-4 top-1/2 -translate-y-1/2 z-10 text-foreground-muted text-lg">
                    →
                  </div>
                )}
                <div className="flex items-center gap-2 mb-3">
                  <div className={`w-3 h-3 rounded-full ${dotColors[i]}`} />
                  <h3 className="font-semibold text-foreground">{step.name}</h3>
                </div>
                <p className="font-mono-num text-xs text-accent mb-2">{step.chi}</p>
                <p className="text-xs text-foreground-muted mb-3">{step.desc}</p>
                <p className="text-xs font-medium text-foreground">{step.health}</p>
              </div>
            );
          })}
        </div>
        <p className="text-sm font-semibold text-foreground italic text-center">
          {d.gradientPunchline}
        </p>
      </section>

      {/* Section 4: Myopia gradient */}
      <section className="mb-16 border-t editorial-rule pt-6">
        <p className="editorial-kicker text-accent mb-2">{d.s4Kicker}</p>
        <h2 className="editorial-section-heading mb-4">{d.s4Title}</h2>
        <div className="space-y-3 text-sm text-foreground-muted leading-relaxed max-w-4xl mb-8">
          {d.s4Text.map((p, i) => (
            <p key={i} className={i === 0 ? "editorial-rail text-[0.95rem] text-foreground" : ""}>
              {p}
            </p>
          ))}
        </div>

        <div className="rounded-xl border border-card-border bg-card-bg p-5">
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-card-border text-left text-xs text-foreground-muted uppercase tracking-wider">
                  <th className="py-2 pr-3">{d.myopiaHeaders.region}</th>
                  <th className="py-2 pr-3">{d.myopiaHeaders.prevalence}</th>
                  <th className="py-2">{d.myopiaHeaders.tech}</th>
                </tr>
              </thead>
              <tbody>
                {MYOPIA_GRADIENT.map((row, i) => (
                  <tr key={i} className="border-b border-card-border/40">
                    <td className="py-2 pr-3 font-medium text-foreground">
                      {isFi ? row.regionFi : row.regionEn}
                    </td>
                    <td className="py-2 pr-3 font-mono-num text-foreground">{row.prevalence}</td>
                    <td className="py-2 font-mono-num text-xs tracking-widest text-accent">
                      {techBar(row.techLevel)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Section 5: BERM cascade test */}
      <section className="mb-16 border-t editorial-rule pt-6">
        <p className="editorial-kicker text-accent mb-2">{d.s5Kicker}</p>
        <h2 className="editorial-section-heading mb-4">{d.s5Title}</h2>
        <p className="text-sm text-foreground-muted leading-relaxed max-w-4xl mb-6">
          {d.s5Text}
        </p>

        <div className="rounded-xl border border-card-border bg-card-bg p-5 mb-4">
          <div className="overflow-x-auto">
            <table className="w-full text-xs border-collapse whitespace-nowrap">
              <thead>
                <tr className="border-b border-card-border text-left uppercase tracking-wider text-foreground-muted">
                  <th className="py-2 pr-3">{d.cascadeHeaders.cascade}</th>
                  <th className="py-2 pr-3">{d.cascadeHeaders.lowEmf}</th>
                  <th className="py-2 pr-3">{d.cascadeHeaders.modern}</th>
                  <th className="py-2 pr-3">{d.cascadeHeaders.mechanism}</th>
                  <th className="py-2 text-center">{d.cascadeHeaders.status}</th>
                </tr>
              </thead>
              <tbody>
                {CASCADE_COMPARISON.map((row, i) => (
                  <tr key={i} className="border-b border-card-border/40">
                    <td className="py-2 pr-3 font-medium text-foreground">
                      {isFi ? row.cascadeFi : row.cascadeEn}
                    </td>
                    <td className="py-2 pr-3 text-green-600 dark:text-green-400">{row.lowEmf}</td>
                    <td className="py-2 pr-3 text-red-500 dark:text-red-400">{row.modern}</td>
                    <td className="py-2 pr-3 font-mono-num text-foreground-muted text-xs">{row.bermPredicts}</td>
                    <td className="py-2 text-center text-base">
                      {row.confirmed === true && (
                        <span className="text-green-600 dark:text-green-400" title="Confirmed">{"✓"}</span>
                      )}
                      {row.confirmed === null && (
                        <span className="text-foreground-muted/50" title="No data">?</span>
                      )}
                      {row.confirmed === false && (
                        <span className="text-red-500 dark:text-red-400" title="Contradicted">{"✗"}</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <p className="text-sm font-semibold text-foreground text-center font-mono-num">
          {d.cascadeSummary}
        </p>
      </section>

      {/* Section 6: What this does NOT prove */}
      <section className="mb-16 border-t editorial-rule pt-6">
        <p className="editorial-kicker text-accent mb-2">{d.s6Kicker}</p>
        <h2 className="editorial-section-heading mb-4">{d.s6Title}</h2>
        <div className="space-y-3 text-sm text-foreground-muted leading-relaxed max-w-4xl">
          {d.s6Text.map((p, i) => (
            <p key={i} className={i === 0 ? "editorial-rail text-[0.95rem] text-foreground" : ""}>
              {p}
            </p>
          ))}
        </div>
        <ul className="list-disc list-inside text-sm text-foreground-muted leading-relaxed mt-3 mb-6 space-y-1">
          {d.confounders.map((c, i) => (
            <li key={i}>{c}</li>
          ))}
        </ul>
        <div className="space-y-3 text-sm text-foreground-muted leading-relaxed max-w-4xl mb-8">
          {d.s6Text2.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>

        {/* Proposed studies */}
        <h3 className="font-semibold text-foreground mb-4">{d.proposedTitle}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {d.proposedStudies.map((study) => (
            <div key={study.id} className="rounded-xl border border-card-border bg-card-bg p-5">
              <span className="font-mono-num text-xs text-accent">{study.id}</span>
              <h4 className="font-semibold text-foreground mt-1 mb-2 text-sm">{study.title}</h4>
              <p className="text-xs text-foreground-muted leading-relaxed">{study.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom navigation */}
      <section className="mt-16">
        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            href={`/${locale}/predictions`}
            className="rounded-lg border border-accent/20 bg-card-bg px-4 py-3 text-accent hover:underline font-semibold text-sm"
          >
            {d.navPredictions}
          </Link>
          <Link
            href={`/${locale}/model`}
            className="rounded-lg border border-accent/20 bg-card-bg px-4 py-3 text-accent hover:underline font-semibold text-sm"
          >
            {d.navModel}
          </Link>
        </div>
      </section>
    </div>
  );
}
