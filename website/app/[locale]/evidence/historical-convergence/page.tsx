import type { Metadata } from "next";
import Link from "next/link";
import { GitMerge } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { pickCopy } from "@/lib/i18n";

/* ---------- Observer data ---------- */

interface Observer {
  name: string;
  year: string;
  observation: string;
  bermMatch: string;
  confidence: "Very High" | "High" | "Moderate" | "Low-Moderate";
}

const OBSERVERS_EN: Observer[] = [
  {
    name: "Ibn Khaldun",
    year: "1377",
    observation: "Asabiya (group cohesion) decays in 3–4 generations",
    bermMatch: "Oxytocin decline reduces social bonding",
    confidence: "Moderate",
  },
  {
    name: "Giambattista Vico",
    year: "1725",
    observation: "Recurring cycle of three ages (gods/heroes/men)",
    bermMatch: "Solar Suess cycle drives biological oscillation",
    confidence: "Low-Moderate",
  },
  {
    name: "Oswald Spengler",
    year: "1918",
    observation: "Organic lifecycle of civilizations with inevitable decline",
    bermMatch: "BioCap integral shows monotonic depletion under EM load",
    confidence: "Moderate",
  },
  {
    name: "Arnold Toynbee",
    year: "1934–61",
    observation: "Challenge-and-response across 21 civilizations",
    bermMatch: "BioCap determines response capacity to challenges",
    confidence: "Moderate",
  },
  {
    name: "Pitirim Sorokin",
    year: "1937",
    observation: "Sensate/ideational culture cycles; late sensate = materialism",
    bermMatch: "Dopamine/BDNF decline shifts culture toward sensory stimulation",
    confidence: "Low-Moderate",
  },
  {
    name: "John Bagot Glubb",
    year: "1978",
    observation: "250-year empire cycle, 6 stages, frivolity in decline",
    bermMatch: "Suess cycle + biological inertia ≈ 250 years",
    confidence: "High",
  },
  {
    name: "Joseph Tainter",
    year: "1988",
    observation: "Diminishing returns on complexity",
    bermMatch: "Cognitive (BDNF) decline reduces capacity to manage complexity",
    confidence: "Moderate",
  },
  {
    name: "Peter Turchin",
    year: "2003",
    observation: "80–100 year secular cycles, elite overproduction",
    bermMatch: "Gleissberg cycle (~88yr) modulates within-empire oscillations",
    confidence: "Moderate",
  },
  {
    name: "Jonathan Haidt",
    year: "2024",
    observation: "Smartphone generation mental health crisis",
    bermMatch: "RF/IF exposure via devices disrupts developing neurochemistry",
    confidence: "High",
  },
  {
    name: "Shanna Swan",
    year: "2021",
    observation: "Sperm count halving since 1973, accelerating",
    bermMatch: "Core BERM prediction; cumulative EM exposure drives reproductive decline",
    confidence: "Very High",
  },
  {
    name: "Jean Twenge",
    year: "2017",
    observation: "iGen depression/anxiety spike coincides with smartphone adoption",
    bermMatch: "RF-driven cortisol elevation + melatonin suppression",
    confidence: "High",
  },
];

const OBSERVERS_FI: Observer[] = [
  {
    name: "Ibn Khaldun",
    year: "1377",
    observation: "Asabiya (ryhmäkoheesio) rapautuu 3–4 sukupolvessa",
    bermMatch: "Oksitosiinin lasku heikentää sosiaalista sitoutumista",
    confidence: "Moderate",
  },
  {
    name: "Giambattista Vico",
    year: "1725",
    observation: "Toistuva kolmen aikakauden sykli (jumalat/sankarit/ihmiset)",
    bermMatch: "Auringon Suess-sykli ohjaa biologista vaihtelua",
    confidence: "Low-Moderate",
  },
  {
    name: "Oswald Spengler",
    year: "1918",
    observation: "Sivilisaatioiden orgaaninen elinkaari vääjäämättömällä taantumalla",
    bermMatch: "BioCap-integraali osoittaa monotonista ehtymistä EM-kuorman alla",
    confidence: "Moderate",
  },
  {
    name: "Arnold Toynbee",
    year: "1934–61",
    observation: "Haaste ja vastaus 21 sivilisaation yli",
    bermMatch: "BioCap määrittää vastekyvyn haasteisiin",
    confidence: "Moderate",
  },
  {
    name: "Pitirim Sorokin",
    year: "1937",
    observation: "Sensorinen/ideaalinen kulttuurisykli; myöhäinen sensorinen = materialismi",
    bermMatch: "Dopamiinin/BDNF:n lasku siirtää kulttuuria aististimuluksen suuntaan",
    confidence: "Low-Moderate",
  },
  {
    name: "John Bagot Glubb",
    year: "1978",
    observation: "250 vuoden imperiumisykli, 6 vaihetta, kevytmielisyys rappiossa",
    bermMatch: "Suess-sykli + biologinen inertia ≈ 250 vuotta",
    confidence: "High",
  },
  {
    name: "Joseph Tainter",
    year: "1988",
    observation: "Kompleksisuuden vähenevät tuotot",
    bermMatch: "Kognitiivinen (BDNF) lasku heikentää kykyä hallita kompleksisuutta",
    confidence: "Moderate",
  },
  {
    name: "Peter Turchin",
    year: "2003",
    observation: "80–100 vuoden pitkäaikaissyklit, eliitin ylituotanto",
    bermMatch: "Gleissberg-sykli (~88v) säätelee imperiumin sisäisiä oskillaatioita",
    confidence: "Moderate",
  },
  {
    name: "Jonathan Haidt",
    year: "2024",
    observation: "Älypuhelinsukupolven mielenterveyskriisi",
    bermMatch: "RF/IF-altistus laitteista häiritsee kehittyvää neurokemiaa",
    confidence: "High",
  },
  {
    name: "Shanna Swan",
    year: "2021",
    observation: "Siittiöluku puolittunut vuodesta 1973, kiihtyen",
    bermMatch: "BERM:n ydinennuste; kumulatiivinen EM-altistus ajaa lisääntymisen laskua",
    confidence: "Very High",
  },
  {
    name: "Jean Twenge",
    year: "2017",
    observation: "iGen-masennus/ahdistuspiikki osuu älypuhelinten yleistymiseen",
    bermMatch: "RF-välitteinen kortisolin nousu + melatoniinin suppressio",
    confidence: "High",
  },
];

/* ---------- COPY ---------- */

const COPY = {
  en: {
    title: "Historical Convergence",
    subtitle:
      "Eleven independent observers across six centuries converged on the same civilizational decline patterns. BERM provides a biological mechanism for what they observed.",
    backLink: "← Back to Evidence",
    epistemicTitle: "Pattern-matching, not proof",
    epistemicText:
      "This page maps historical observations onto BERM mechanisms. The fit is suggestive but does not constitute evidence of causation. These thinkers did not have BERM in mind; the pattern-matching is retrospective. Confidence ratings reflect the specificity of the mechanism match, not the quality of the original observation.",
    summaryKicker: "CONVERGENCE",
    summaryTitle: "Why 11 independent thinkers matter",
    summaryText: [
      "From Ibn Khaldun in 1377 to Jonathan Haidt in 2024, scholars across different centuries, disciplines, and methodologies have independently observed the same core phenomenon: civilizations follow predictable trajectories of vigor, complexity, and decline. None had access to the others’ biological framing. None proposed a shared mechanism.",
      "BERM offers a candidate unifying mechanism: cumulative electromagnetic exposure drives neurochemical and hormonal depletion (testosterone, oxytocin, BDNF, melatonin, dopamine) that progressively reduces a civilization’s biological capacity for social cohesion, cognitive complexity, reproductive output, and adaptive response.",
      "The convergence is remarkable not because any single match is strong, but because the pattern repeats across independent observations spanning 647 years. If BERM is wrong, this convergence is coincidental. If BERM is right, these observers were each describing a different facet of the same biological process.",
    ],
    tableKicker: "THE 11 OBSERVERS",
    tableTitle: "Convergence Table",
    colObserver: "Observer",
    colYear: "Year",
    colObservation: "Key Observation",
    colMechanism: "BERM Mechanism Match",
    colConfidence: "Confidence",
    confidenceLabels: {
      "Very High": "Very High",
      High: "High",
      Moderate: "Moderate",
      "Low-Moderate": "Low-Moderate",
    } as Record<string, string>,
    synthesisKicker: "SYNTHESIS",
    synthesisTitle: "What the convergence suggests",
    synthesisPoints: [
      "Historical cycle length (≈250 years per Glubb) matches the Suess solar cycle plus biological inertia lag",
      "Within-cycle oscillations (80–100 years per Turchin) match the Gleissberg cycle modulation window",
      "Late-stage behavioral signatures (Sorokin’s sensate excess, Glubb’s frivolity, Tainter’s complexity collapse) are consistent with dopamine/BDNF depletion profiles",
      "The modern acceleration (Haidt, Swan, Twenge) correlates with exponential growth in RF/IF exposure since ~2007",
      "The reproductive decline (Swan) is BERM’s core falsifiable prediction and the most tightly matched observation",
    ],
    synthesisNote:
      "None of the above constitutes evidence. The convergence is a pattern worth investigating, not a conclusion. The testable claims are in the predictions section.",
    navPredictions: "Predictions →",
    navModel: "Model Specification →",
    navEvidence: "Evidence overview →",
  },
  fi: {
    title: "Historiallinen yhdentyminen",
    subtitle:
      "Yksitoista itsenäistä havainnoijaa kuuden vuosisadan ajalta yhtyvät samoihin sivilisaation taantumakuvioihin. BERM tarjoaa biologisen mekanismin heidän havainnoilleen.",
    backLink: "← Takaisin näyttöön",
    epistemicTitle: "Kuvioiden tunnistamista, ei todistusta",
    epistemicText:
      "Tämä sivu yhdistää historialliset havainnot BERM-mekanismeihin. Yhteensopivuus on viitteellinen mutta ei muodosta kausaalinäyttöä. Nämä ajattelijat eivät tunteneet BERM:iä; kuvioiden tunnistaminen on retrospektiivistä. Luotettavuusarviot heijastavat mekanismivastaavuuden spesifisyyttä, eivät alkuperäisen havainnon laatua.",
    summaryKicker: "KONVERGENSSI",
    summaryTitle: "Miksi 11 itsenäistä ajattelijaa merkitsee",
    summaryText: [
      "Ibn Khaldunista vuonna 1377 Jonathan Haidtiin vuonna 2024, eri vuosisatojen, tieteenalojen ja metodologioiden tutkijat ovat itsenäisesti havainnoineet saman ydinilmiön: sivilisaatiot seuraavat ennustettavia elinvoiman, kompleksisuuden ja taantumisen kehityskulkuja. Kenelläkään ei ollut pääsyä toistensa biologiseen viitekehykseen. Kukaan ei ehdottanut jaettua mekanismia.",
      "BERM tarjoaa ehdokkaan yhdistäväksi mekanismiksi: kumulatiivinen sähkömagneettinen altistus ajaa neurokemiallista ja hormonaalista ehtymistä (testosteroni, oksitosiini, BDNF, melatoniini, dopamiini), joka asteittain heikentää sivilisaation biologista kapasiteettia sosiaaliseen koheesioon, kognitiiviseen kompleksisuuteen, lisääntymiskykyyn liittyvään tuotantoon ja adaptiiviseen vasteeseen.",
      "Yhdentyminen on merkittävä ei siksi, että yksittäinen vastaavuus olisi vahva, vaan koska kuvio toistuu itsenäisissä havainnoissa 647 vuoden ajanjaksolla. Jos BERM on väärässä, tämä yhdentyminen on satunnainen. Jos BERM on oikeassa, nämä havainnoijat kukin kuvasivat eri puolta samasta biologisesta prosessista.",
    ],
    tableKicker: "11 HAVAINNOIJAA",
    tableTitle: "Yhdentyminentaulukko",
    colObserver: "Havainnoija",
    colYear: "Vuosi",
    colObservation: "Avainhavainto",
    colMechanism: "BERM-mekanismivastaavuus",
    colConfidence: "Luotettavuus",
    confidenceLabels: {
      "Very High": "Erittäin korkea",
      High: "Korkea",
      Moderate: "Kohtalainen",
      "Low-Moderate": "Matala-kohtalainen",
    } as Record<string, string>,
    synthesisKicker: "SYNTEESI",
    synthesisTitle: "Mihin yhdentyminen viittaa",
    synthesisPoints: [
      "Historiallisten syklien pituus (≈250 vuotta Glubbin mukaan) vastaa auringon Suess-sykliä plus biologista inertiaa",
      "Syklin sisäiset vaihtelut (80–100 vuotta Turchinin mukaan) vastaavat Gleissberg-syklin modulaatioikkunaa",
      "Myöhäisvaiheen käyttäytymispiirteet (Sorokinin sensorinen ylilyönti, Glubbin kevytmielisyys, Tainterin kompleksisuuden romahdus) ovat yhdenmukaisia dopamiini/BDNF-ehtymisprofiilien kanssa",
      "Moderni kiihtyminen (Haidt, Swan, Twenge) korreloi RF/IF-altistuksen eksponentiaalisen kasvun kanssa noin vuodesta 2007",
      "Lisääntymiskykyyn liittyvä lasku (Swan) on BERM:n ydin-falsifioitava ennuste ja tiukimmin vastaava havainto",
    ],
    synthesisNote:
      "Mikään edellä mainitusta ei muodosta näyttöä. Yhdentyminen on tutkimisen arvoinen kuvio, ei johtopäätös. Testattavat väitteet ovat ennusteosiossa.",
    navPredictions: "Ennusteet →",
    navModel: "Mallispesifikaatio →",
    navEvidence: "Näytön yleiskatsaus →",
  },
} as const;

/* ---------- Helpers ---------- */

function confidenceBadge(
  level: Observer["confidence"],
  labels: Record<string, string>
): { bg: string; text: string; label: string } {
  switch (level) {
    case "Very High":
      return {
        bg: "bg-emerald-500/15",
        text: "text-status-confirmed",
        label: labels["Very High"] ?? level,
      };
    case "High":
      return {
        bg: "bg-blue-500/15",
        text: "text-accent",
        label: labels["High"] ?? level,
      };
    case "Moderate":
      return {
        bg: "bg-amber-500/15",
        text: "text-status-partial",
        label: labels["Moderate"] ?? level,
      };
    case "Low-Moderate":
      return {
        bg: "bg-orange-500/15",
        text: "text-status-partial",
        label: labels["Low-Moderate"] ?? level,
      };
  }
}

/* ---------- Metadata ---------- */

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const d = pickCopy(COPY, locale);
  return {
    title: `${d.title} – Extinction Field`,
    description: d.subtitle,
  };
}

/* ---------- Page ---------- */

export default async function HistoricalConvergencePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const d = pickCopy(COPY, locale);
  const observers = locale === "fi" ? OBSERVERS_FI : OBSERVERS_EN;

  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <Link
        href={`/${locale}/evidence`}
        className="text-sm text-accent hover:underline mb-6 inline-block"
      >
        {d.backLink}
      </Link>

      <PageHeader icon={GitMerge} title={d.title} subtitle={d.subtitle} />

      {/* Epistemic banner */}
      <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 p-5 mb-12">
        <h3 className="font-semibold text-status-partial mb-2">
          {d.epistemicTitle}
        </h3>
        <p className="text-sm text-status-partial leading-relaxed">
          {d.epistemicText}
        </p>
      </div>

      {/* Convergence summary */}
      <section className="mb-16 border-t editorial-rule pt-6">
        <p className="editorial-kicker text-accent mb-2">{d.summaryKicker}</p>
        <h2 className="editorial-section-heading mb-4">{d.summaryTitle}</h2>
        <div className="space-y-3 text-sm text-foreground-muted leading-relaxed max-w-4xl">
          {d.summaryText.map((p, i) => (
            <p
              key={i}
              className={
                i === 0
                  ? "editorial-rail text-[0.95rem] text-foreground"
                  : ""
              }
            >
              {p}
            </p>
          ))}
        </div>

        {/* Quick stat */}
        <div className="mt-8 grid grid-cols-1 gap-2 max-w-xl sm:grid-cols-3 sm:gap-4">
          <div className="rounded-lg border border-card-border bg-card-bg p-4 text-center">
            <p className="text-2xl font-bold text-accent">11</p>
            <p className="text-xs text-foreground-muted mt-1">
              {locale === "fi" ? "Itsenäistä havainnoijaa" : "Independent observers"}
            </p>
          </div>
          <div className="rounded-lg border border-card-border bg-card-bg p-4 text-center">
            <p className="text-2xl font-bold text-accent">647</p>
            <p className="text-xs text-foreground-muted mt-1">
              {locale === "fi" ? "Vuotta" : "Years spanned"}
            </p>
          </div>
          <div className="rounded-lg border border-card-border bg-card-bg p-4 text-center">
            <p className="text-2xl font-bold text-accent">6</p>
            <p className="text-xs text-foreground-muted mt-1">
              {locale === "fi" ? "Tieteenalaa" : "Disciplines"}
            </p>
          </div>
        </div>
      </section>

      {/* Observer table */}
      <section className="mb-16 border-t editorial-rule pt-6">
        <p className="editorial-kicker text-accent mb-2">{d.tableKicker}</p>
        <h2 className="editorial-section-heading mb-4">{d.tableTitle}</h2>
        <div className="rounded-xl border border-card-border bg-card-bg p-3 sm:p-5">
          <div className="chart-scroll">
            <table className="w-full min-w-[720px] text-sm border-collapse">
              <thead>
                <tr className="border-b border-card-border text-left text-xs uppercase tracking-wider text-foreground-muted">
                  <th className="py-2 pr-3">{d.colObserver}</th>
                  <th className="py-2 pr-3">{d.colYear}</th>
                  <th className="py-2 pr-3">{d.colObservation}</th>
                  <th className="py-2 pr-3">{d.colMechanism}</th>
                  <th className="py-2 pr-3">{d.colConfidence}</th>
                </tr>
              </thead>
              <tbody>
                {observers.map((o, i) => {
                  const badge = confidenceBadge(o.confidence, d.confidenceLabels);
                  return (
                    <tr
                      key={i}
                      className="border-b border-card-border/50 last:border-0"
                    >
                      <td className="py-3 pr-3 font-semibold text-foreground whitespace-nowrap">
                        {o.name}
                      </td>
                      <td className="py-3 pr-3 font-mono text-foreground-muted whitespace-nowrap">
                        {o.year}
                      </td>
                      <td className="py-3 pr-3 text-foreground-muted leading-snug">
                        {o.observation}
                      </td>
                      <td className="py-3 pr-3 text-foreground-muted leading-snug">
                        {o.bermMatch}
                      </td>
                      <td className="py-3 pr-3 whitespace-nowrap">
                        <span
                          className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${badge.bg} ${badge.text}`}
                        >
                          {badge.label}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Synthesis */}
      <section className="mb-16 border-t editorial-rule pt-6">
        <p className="editorial-kicker text-accent mb-2">
          {d.synthesisKicker}
        </p>
        <h2 className="editorial-section-heading mb-4">{d.synthesisTitle}</h2>
        <ul className="space-y-3 max-w-4xl">
          {d.synthesisPoints.map((point, i) => (
            <li
              key={i}
              className="flex items-start gap-3 text-sm text-foreground-muted leading-relaxed"
            >
              <span className="mt-0.5 font-mono text-accent shrink-0">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span>{point}</span>
            </li>
          ))}
        </ul>
        <div className="mt-6 rounded-lg border border-card-border bg-card-bg p-4">
          <p className="text-sm text-foreground-muted italic leading-relaxed">
            {d.synthesisNote}
          </p>
        </div>
      </section>

      {/* Navigation */}
      <div className="flex flex-wrap gap-4 border-t editorial-rule pt-6">
        <Link
          href={`/${locale}/predictions`}
          className="text-sm text-accent hover:underline"
        >
          {d.navPredictions}
        </Link>
        <Link
          href={`/${locale}/model`}
          className="text-sm text-accent hover:underline"
        >
          {d.navModel}
        </Link>
        <Link
          href={`/${locale}/evidence`}
          className="text-sm text-accent hover:underline"
        >
          {d.navEvidence}
        </Link>
      </div>
    </div>
  );
}
