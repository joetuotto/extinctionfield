import type { Metadata } from "next";
import Link from "next/link";
import { TrendingDown, Microscope, TestTube, Globe2, Banknote, Moon, ArrowRight, Shield, Dna } from "lucide-react";
import { ThreeChannelSummary } from "@/components/ThreeChannelSummary";
import { SentinelCascadeCompact } from "@/components/SentinelCascadeCompact";
import { TheraBionicProof } from "@/components/TheraBionicProof";
import { BradfordHillCard } from "@/components/BradfordHillCard";
import { FinlandLagChart } from "@/components/FinlandLagChart";
import { ThreePhaseIndicator } from "@/components/ThreePhaseIndicator";
import { SixFactorSummary } from "@/components/SixFactorSummary";
import type { Locale } from "@/lib/i18n";
import { LOCKED_PREDICTIONS, countryLabel } from "@/lib/predictions";
import { LatestArticles } from "@/components/LatestArticles";
import { Sparkline } from "@/components/SparklineCard";
import { readFileSync } from "fs";
import { join } from "path";

const SPARKLINE_ICONS = [TrendingDown, Microscope, TestTube, Globe2, Banknote, Moon] as const;

function getReferenceCount(): number {
  const file = join(process.cwd(), "public/data/references_full.json");
  const data = JSON.parse(readFileSync(file, "utf-8")) as { references: unknown[] };
  return data.references.length;
}

function getFalsificationStats() {
  try {
    const raw = readFileSync(join(process.cwd(), "public/data/falsification_v19_1.json"), "utf-8");
    const data = JSON.parse(raw);
    const tests = data.tests || [];
    const total = tests.length;
    const ran = tests.filter((t: { status: string }) => t.status === "RAN").length;
    const falsified = tests.filter((t: { falsified?: boolean }) => t.falsified === true).length;
    const consistent = ran - falsified;
    const pending = total - ran;
    return { total, ran, consistent, falsified, pending };
  } catch {
    return { total: 7, ran: 3, consistent: 3, falsified: 0, pending: 4 };
  }
}

const SPARKLINE_DATA = [
  [5.0, 4.9, 4.5, 4.1, 3.7, 3.5, 3.2, 2.9, 2.7, 2.6, 2.5, 2.4, 2.3, 2.2],
  [101, 96, 89, 83, 77, 70, 62, 55, 49, 42],
  [100, 97, 93, 90, 87, 83, 80],
  [0, 2, 5, 10, 18, 15, 20, 35, 49],
  [1.47, 1.08, 1.23, 1.24, 0.84, 0.72],
  [6.9, 6.8, 6.7, 6.5, 6.3, 6.1, 6.1, 6.1],
];

const COPY = {
  en: {
    heroTitle: "Something is happening to fertility",
    heroDeck: "Human sperm counts, testosterone and birth rates are falling worldwide. Bee colonies, bird populations and amphibians are declining on the same timeline. No single conventional explanation accounts for the breadth, simultaneity and cross-species convergence of these trends.",
    whatIsThis: "This site documents the Bio-Electromagnetic Reproductive Model (BERM) — a falsifiable research model that investigates whether non-thermal electromagnetic field exposure contributes to global fertility decline. BERM traces three frequency channels (ELF, IF, RF) through established biophysical mechanisms to reproductive endpoints. Every claim is bounded by epistemic level, every prediction is locked with a falsification criterion, and every negative finding is catalogued. This is not advocacy — it is an open research framework designed to be tested and, if wrong, to fail visibly.",

    s1Title: "THE NUMBERS",

    impactGrid: [
      { stat: "5.0 → 2.2", label: "Global TFR since 1960 — decline is accelerating" },
      { stat: "−62%", label: "Sperm concentration (Levine 2023, 223 studies)" },
      { stat: "−1.2%/yr", label: "Testosterone decline, age-independent (Travison 2007)" },
      { stat: "49", label: "Countries below replacement TFR 1.4" },
      { stat: "$200B", label: "Korea pronatalism spending → TFR still dropped to 0.72" },
      { stat: "TFR 6.1 vs 1.66", label: "Amish vs US fertility — communities without smartphones" },
    ],

    sentinelCta: "All sentinels",

    paradoxLabel: "CROSS-SECTIONAL DISCOVERY v17.1",
    paradoxTitle: "The mobile phone paradox",
    paradoxText: "Across 54 countries, residential electricity consumption is the strongest predictor of fertility decline (RMSE 0.533). Mobile phone subscriptions — the information device — are the weakest (RMSE 1.053). If the mechanism were 'information → choices', the information device should predict best. It doesn't. The infrastructure variable predicts best — consistent with a physical exposure mechanism.",
    paradoxStat1: "LOOCV RMSE",
    paradoxVal1: "0.522",
    paradoxStat2: "R²",
    paradoxVal2: "0.851",
    paradoxStat3: "Countries within 0.5",
    paradoxVal3: "74%",
    paradoxCta: "Cross-sectional formula",

    howTitle: "How the model works",
    causalLabel: "THREE-CHANNEL MECHANISM",
    causalTitle: "ELF · IF · RF — three frequency bands, three biological pathways",
    causalNote: "Mobile subscription density is a composite proxy for the overall electromagnetic environment. The model traces three independent channels — ELF (power grid, lighting), IF (switching electronics, LED flicker), RF (base stations, Wi-Fi, radar) — through cryptochrome disruption, calcium signaling and membrane voltage to paired reproductive capacity.",

    npLabel: "EVOLUTIONARY ORIGINS",
    npTitle: "The Northern Package",
    npText: "Why did Northern Europe fall below replacement fertility first? BERM proposes that the same co-selection that optimised cryptochrome sensitivity — blue eyes (OCA2), lactose tolerance (LCT), and cattle husbandry — created the population most coupled to electromagnetic fields. The nested χ model formalises this: each population carries a biological χ profile that modulates the EMF-fertility relationship at five scales, from molecular to demographic.",
    npCta: "Evidence: evolutionary origins",

    warningLabel: "PREDICTIVE POWER",
    warningTitle: "The 35-year warning",
    warningNarrative: "Finland's testosterone levels began declining in the 1970s. For 40 years, fertility remained stable. Then it collapsed: from 1.87 children per woman (2010) to 1.26 (2024) — a 33% drop in fifteen years. The testosterone data could have predicted this 15 years in advance. The same data now points to the United States reaching the same threshold around 2030.",
    warningCaveat: "Testosterone decline rates are age-independent secular trends documented in peer-reviewed longitudinal studies across five countries. TFR projections assume continuation of current rates. The threshold model is calibrated against Finland and South Korea; other country projections are extrapolations.",
    warningReadMore: "Read the full threshold model specification",

    teaserLabel: "LOCKED PREDICTIONS · TFR 2030",
    teaserNote: "Locked under BERM v17 and falsifiable: each will be compared against observed data in the stated year.",
    allPredictions: "All predictions",

    falsTitle: "FALSIFICATION STATUS",
    falsRan: "ran",
    falsConsistent: "consistent",
    falsFalsified: "falsified",
    falsPending: "pending",
    falsCta: "Test details",

    epistemicNote: (n: number) => `BERM v17 is a falsifiable research model, not a certainty. ${n} peer-reviewed references across 11 independent research domains. 24+ regulatory-validated non-thermal mechanisms. Cross-sectional formula: LOOCV RMSE 0.522, 74% of countries within 0.5 children of prediction. Residential electricity consumption outperforms GDP as a TFR predictor by 21%. Locked predictions with dates and confidence intervals. If the predictions fail, the model is wrong.`,
    epistemicStats: "Hindcast K₈ = 0.81 · K₁₀ = 0.71 · Cross-sectional RMSE = 0.522",
    epistemicAuthor: "Otto Juote · MSc Biomedicine, Bioscience and Society (LSE) · Independent research",

    ctaModel: "Model specification",
    ctaEvidence: "Evidence register",
    ctaData: "Explore data",
    ctaMath: "Mathematics",
  },
  fi: {
    heroTitle: "Jotain tapahtuu hedelmällisyydelle",
    heroDeck: "Ihmisen siittiömäärät, testosteroni ja syntyvyys laskevat maailmanlaajuisesti. Mehiläisyhdyskunnat, lintupopulaatiot ja sammakkoeläimet vähenevät samalla aikajanalla. Mikään yksittäinen tavanomainen selitys ei kata näiden trendien laajuutta, samanaikaisuutta ja lajienvälisyyttä.",
    whatIsThis: "Tämä sivusto dokumentoi Bio-Electromagnetic Reproductive Model (BERM) -tutkimusmallin — falsifioitavan tutkimuskehikon, joka tutkii vaikuttaako ei-terminen sähkömagneettinen kenttäaltistus globaaliin hedelmällisyyden laskuun. BERM jäljittää kolme taajuuskanavaa (ELF, IF, RF) tunnettujen biofysikaalisten mekanismien kautta lisääntymisen päätepisteisiin. Jokainen väite on rajattu episteemisellä tasolla, jokainen ennuste on lukittu kumoamisehdolla, ja jokainen negatiivinen löydös on katalogissa. Tämä ei ole kannanotto — se on avoin tutkimuskehys, joka on suunniteltu testattavaksi ja, jos väärässä, epäonnistumaan näkyvästi.",

    s1Title: "LUVUT",

    impactGrid: [
      { stat: "5,0 → 2,2", label: "Globaali TFR vuodesta 1960 — lasku kiihtyy" },
      { stat: "−62 %", label: "Siittiökonsentraatio (Levine 2023, 223 tutkimusta)" },
      { stat: "−1,2 %/v", label: "Testosteronilasku, ikäriippumaton (Travison 2007)" },
      { stat: "49", label: "Maata alle korvaavuustason TFR 1,4" },
      { stat: "200 mrd $", label: "Korean pronatalismi → TFR silti 0,72" },
      { stat: "TFR 6,1 vs 1,66", label: "Amissit vs USA — yhteisöt ilman älypuhelimia" },
    ],

    sentinelCta: "Kaikki sentinellit",

    paradoxLabel: "POIKKILEIKKAUSLÖYDÖS v17.1",
    paradoxTitle: "Matkapuhelinparadoksi",
    paradoxText: "54 maan aineistossa asumisen sähkönkulutus on vahvin yksittäinen hedelmällisyyslaskun ennustaja (RMSE 0,533). Matkapuhelintilaukset — tietolaite — ovat heikoin (RMSE 1,053). Jos mekanismi olisi 'tieto → valinnat', tietolaitteen pitäisi ennustaa parhaiten. Ei ennusta. Infrastruktuurimuuttuja ennustaa parhaiten — yhdenmukaista fyysisen altistusmekanismin kanssa.",
    paradoxStat1: "LOOCV RMSE",
    paradoxVal1: "0,522",
    paradoxStat2: "R²",
    paradoxVal2: "0,851",
    paradoxStat3: "Maat 0,5 sisällä",
    paradoxVal3: "74 %",
    paradoxCta: "Poikkileikkauskaava",

    howTitle: "Miten malli toimii",
    causalLabel: "KOLMIKANAVAMEKANISMI",
    causalTitle: "ELF · IF · RF — kolme taajuuskaistaa, kolme biologista reittiä",
    causalNote: "Matkapuhelinliittymätiheys on yhdistelmäproksi koko sähkömagneettiselle ympäristölle. Malli jäljittää kolme itsenäistä kanavaa — ELF (sähköverkko, valaistus), IF (kytkentäelektroniikka, LED-välkyntä), RF (tukiasemat, Wi-Fi, tutka) — kryptokromihäiriön, kalsiumsignaloinnin ja kalvojännitteen kautta pariutumisen lisääntymiskapasiteettiin.",

    npLabel: "EVOLUUTION ALKUPERÄT",
    npTitle: "Pohjoinen paketti",
    npText: "Miksi Pohjois-Eurooppa laski ensimmäisenä korvaavuustason hedelmällisyyden alle? BERM ehdottaa, että sama koselektio joka optimoi kryptokromiherkkyyden — siniset silmät (OCA2), laktoosinsietokyky (LCT) ja karjankasvatus — loi populaation, joka on voimakkaimmin kytketty sähkömagneettisiin kenttiin. Sisäkkäinen χ-malli formalisoi tämän: jokaisella populaatiolla on biologinen χ-profiili, joka moduloi EMF-hedelmällisyyssuhdetta viidessä skaalassa, molekulaarisesta demografiseen.",
    npCta: "Evidenssi: evoluution alkuperät",

    warningLabel: "ENNUSTUSVOIMA",
    warningTitle: "35 vuoden varoitus",
    warningNarrative: "Suomen testosteronitasot alkoivat laskea 1970-luvulla. 40 vuoden ajan hedelmällisyys pysyi vakaana. Sitten se romahti: 1,87 lasta naista kohden (2010) → 1,26 (2024) — 33 %:n pudotus viidessätoista vuodessa. Testosteronidata olisi ennustanut tämän 15 vuotta etukäteen. Sama data ennustaa nyt Yhdysvalloille samaa noin vuodelle 2030.",
    warningCaveat: "Testosteronin laskuvauhdit ovat ikäriippumattomia sekulaaritrendejä jotka on dokumentoitu vertaisarvioiduissa pitkittäistutkimuksissa viidessä maassa. TFR-ennusteet olettavat nykyisten vauhtien jatkumisen. Kynnösmalli on kalibroitu Suomen ja Etelä-Korean datalla; muiden maiden ennusteet ovat ekstrapolointeja.",
    warningReadMore: "Lue koko kynnösmallin spesifikaatio",

    teaserLabel: "LUKITUT ENNUSTEET · TFR 2030",
    teaserNote: "Lukittu BERM v17:lla ja falsifioitavissa: jokainen verrataan havaittuun dataan ilmoitettuna vuonna.",
    allPredictions: "Kaikki ennusteet",

    falsTitle: "FALSIFIKAATIOTILANNE",
    falsRan: "ajettu",
    falsConsistent: "yhteensopiva",
    falsFalsified: "falsifioitu",
    falsPending: "odottaa",
    falsCta: "Testien yksityiskohdat",

    epistemicNote: (n: number) => `BERM v17 on falsifioitava tutkimusmalli, ei varmuus. ${n} vertaisarvioitua viitettä 11 riippumattomalta tutkimusalalta. 24+ regulatiivisesti validoitua ei-termistä mekanismia. Poikkileikkauskaava: LOOCV RMSE 0,522, 74 % maista 0,5 lapsen sisällä ennusteesta. Asumisen sähkönkulutus ylittää BKT:n TFR-ennustajana 21 %. Lukitut ennusteet päivämäärineen ja luottamusväleineen. Jos ennusteet epäonnistuvat, malli on väärässä.`,
    epistemicStats: "Hindcast K₈ = 0,81 · K₁₀ = 0,71 · Poikkileikkaus-RMSE = 0,522",
    epistemicAuthor: "Otto Juote · MSc Biomedicine, Bioscience and Society (LSE) · Itsenäinen tutkimus",

    ctaModel: "Mallin määrittely",
    ctaEvidence: "Evidenssirekisteri",
    ctaData: "Tutki dataa",
    ctaMath: "Matematiikka",
  },
} as const;

const TEASER_IDS = ["kr-2030-tfr", "fi-2030-tfr", "us-2030-tfr"] as const;
const TEASER_PREDICTIONS = TEASER_IDS.map(
  (id) => LOCKED_PREDICTIONS.find((p) => p.id === id)!
).filter(Boolean);

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (locale === "fi") {
    return {
      title: "Extinction Field – BERM-tutkimusmalli",
      description:
        "Falsifioitava tutkimusmalli sähkömagneettisten kenttätilojen ja lisääntymiskyvyn yhteyden testaamiseen.",
    };
  }
  return {
    title: "Extinction Field – BERM research model",
    description:
      "A falsifiable research model testing whether electromagnetic field states contribute to the global decline in reproductive indicators.",
  };
}

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const activeLocale: Locale = locale === "fi" ? "fi" : "en";
  const d = COPY[activeLocale];
  const prefix = `/${activeLocale}`;
  const fals = getFalsificationStats();

  return (
    <div className="max-w-5xl mx-auto px-6">
      {/* ── 1. Hero ── */}
      <header className="pt-16 pb-10 max-w-3xl">
        <h1 className="text-4xl sm:text-5xl font-serif font-semibold tracking-[-0.02em] leading-[1.15] mb-5">
          {d.heroTitle}
        </h1>
        <p className="text-base sm:text-lg leading-relaxed text-foreground-muted">{d.heroDeck}</p>
        <p className="text-sm leading-relaxed text-foreground-muted mt-4 border-l-2 border-accent/30 pl-4">{d.whatIsThis}</p>
      </header>

      {/* ── 2. Sparkline fact cards ── */}
      <section className="pb-20">
        <h2 className="editorial-kicker text-accent mb-6">{d.s1Title}</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {d.impactGrid.map((item, i) => {
            const Icon = SPARKLINE_ICONS[i];
            return (
              <article key={item.stat} className="rounded-xl border border-card-border bg-card-bg p-5 flex flex-col">
                <Icon size={22} className="text-accent/50 mb-3" strokeWidth={1.5} aria-hidden="true" />
                <p className="font-mono-num text-2xl font-semibold text-accent leading-tight">{item.stat}</p>
                <p className="text-[0.8125rem] text-foreground-muted mt-2 leading-snug flex-1">{item.label}</p>
                <Sparkline data={SPARKLINE_DATA[i]} index={i} />
              </article>
            );
          })}
        </div>
      </section>

      {/* ── 2b. Mobile phone paradox ── */}
      <section className="pb-20">
        <div className="rounded-xl border border-accent/20 bg-card-bg p-6 sm:p-8">
          <p className="editorial-kicker text-accent mb-2">{d.paradoxLabel}</p>
          <h2 className="text-xl sm:text-2xl font-semibold mb-3">{d.paradoxTitle}</h2>
          <p className="text-sm text-foreground-muted leading-relaxed max-w-3xl mb-5">{d.paradoxText}</p>
          <div className="grid grid-cols-3 gap-4 mb-5 max-w-md">
            <div>
              <p className="font-mono-num text-2xl font-semibold text-accent">{d.paradoxVal1}</p>
              <p className="text-xs text-foreground-muted mt-1">{d.paradoxStat1}</p>
            </div>
            <div>
              <p className="font-mono-num text-2xl font-semibold text-accent">{d.paradoxVal2}</p>
              <p className="text-xs text-foreground-muted mt-1">{d.paradoxStat2}</p>
            </div>
            <div>
              <p className="font-mono-num text-2xl font-semibold text-accent">{d.paradoxVal3}</p>
              <p className="text-xs text-foreground-muted mt-1">{d.paradoxStat3}</p>
            </div>
          </div>
          <Link
            href={`${prefix}/mathematics#cross-sectional`}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-accent transition-colors hover:text-accent-hover"
          >
            {d.paradoxCta} <ArrowRight size={14} />
          </Link>
        </div>
      </section>

      {/* ── 3. Sentinel cascade ── */}
      <section className="pb-20">
        <SentinelCascadeCompact locale={activeLocale} />
        <div className="mt-4 text-right">
          <Link
            href={`${prefix}/sentinel`}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-accent transition-colors hover:text-accent-hover"
          >
            {d.sentinelCta} <ArrowRight size={14} />
          </Link>
        </div>
      </section>

      {/* ── 4. How the model works ── */}
      <section className="pb-20">
        <h2 className="editorial-section-heading mb-8">{d.howTitle}</h2>
        <figure className="data-figure">
          <figcaption className="data-figure__caption">
            <p className="editorial-kicker text-accent">{d.causalLabel}</p>
            <p className="data-figure__title mt-1">{d.causalTitle}</p>
          </figcaption>
          <div className="overflow-x-auto p-1 md:p-3">
            <ThreeChannelSummary locale={activeLocale} />
          </div>
          <p className="data-figure__note">{d.causalNote}</p>
        </figure>
      </section>

      {/* ── 4b. Northern Package ── */}
      <section className="pb-20">
        <div className="rounded-xl border border-card-border bg-card-bg p-6 sm:p-8">
          <div className="flex items-start gap-4">
            <Dna size={28} className="text-accent/60 shrink-0 mt-1" strokeWidth={1.5} aria-hidden="true" />
            <div>
              <h2 className="editorial-kicker text-accent mb-3">{d.npLabel}</h2>
              <p className="font-semibold mb-2">{d.npTitle}</p>
              <p className="text-sm sm:text-[0.9375rem] leading-relaxed text-foreground-muted">{d.npText}</p>
              <Link
                href={`${prefix}/evidence/evolution`}
                className="inline-flex items-center gap-1.5 text-sm font-medium text-accent transition-colors hover:text-accent-hover mt-4"
              >
                {d.npCta} <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── 4c. TheraBionic clinical validation ── */}
      <TheraBionicProof locale={activeLocale} prefix={prefix} />

      {/* ── 4d. Bradford Hill criteria ── */}
      <BradfordHillCard locale={activeLocale} prefix={prefix} />

      {/* ── 4e. The 35-Year Warning ── */}
      <section className="pb-20">
        <div className="max-w-4xl">
          <p className="editorial-kicker text-accent mb-2">{d.warningLabel}</p>
          <h2 className="text-xl sm:text-2xl font-semibold mb-6">{d.warningTitle}</h2>
          <FinlandLagChart locale={activeLocale} />
          <p className="text-sm text-foreground-muted leading-relaxed mt-6 mb-6 max-w-3xl">{d.warningNarrative}</p>
          <ThreePhaseIndicator locale={activeLocale} />
          <SixFactorSummary locale={activeLocale} />
          <p className="text-xs text-foreground-muted mt-4 max-w-3xl leading-relaxed">{d.warningCaveat}</p>
          <Link
            href={`${prefix}/model#testosterone-threshold`}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-accent transition-colors hover:text-accent-hover mt-4"
          >
            {d.warningReadMore} <ArrowRight size={14} />
          </Link>
        </div>
      </section>

      {/* ── 5. Locked predictions ── */}
      <section className="pb-20">
        <div className="rounded-xl border border-card-border bg-card-bg p-6 sm:p-8">
          <div className="flex flex-wrap items-baseline justify-between gap-4 mb-6">
            <h2 className="editorial-kicker text-accent">{d.teaserLabel}</h2>
            <Link
              href={`${prefix}/predictions`}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-accent transition-colors hover:text-accent-hover"
            >
              {d.allPredictions} <ArrowRight size={14} />
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {TEASER_PREDICTIONS.map((p) => (
              <div key={p.id} className="border-t border-card-border pt-4">
                <p className="text-sm font-medium mb-2">
                  {countryLabel(p, activeLocale)} {p.year}
                </p>
                <p>
                  <span className="font-mono-num text-3xl font-semibold leading-none text-accent">
                    {p.central.toFixed(2)}
                  </span>
                  <span className="ml-2 font-mono-num text-sm text-foreground-muted">
                    [{p.ciLow.toFixed(2)} – {p.ciHigh.toFixed(2)}]
                  </span>
                </p>
              </div>
            ))}
          </div>
          <p className="mt-6 text-sm leading-relaxed text-foreground-muted">{d.teaserNote}</p>
        </div>
      </section>

      {/* ── 7. Featured articles ── */}
      <LatestArticles locale={activeLocale} />

      {/* ── 8. Falsification status ── */}
      <section className="pb-20">
        <div className="rounded-xl border border-card-border bg-card-bg p-5 sm:p-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Shield size={20} className="text-accent/60 shrink-0" strokeWidth={1.5} aria-hidden="true" />
              <h2 className="editorial-kicker text-accent">{d.falsTitle}</h2>
            </div>
            <Link
              href={`${prefix}/model#falsification`}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-accent transition-colors hover:text-accent-hover"
            >
              {d.falsCta} <ArrowRight size={14} />
            </Link>
          </div>
          <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm">
            <span><span className="font-mono-num font-semibold text-accent">{fals.total}</span> tests</span>
            <span><span className="font-mono-num font-semibold text-accent">{fals.ran}</span> {d.falsRan}</span>
            <span><span className="font-mono-num font-semibold text-green-500">{fals.consistent}</span> {d.falsConsistent}</span>
            <span><span className="font-mono-num font-semibold text-red-500">{fals.falsified}</span> {d.falsFalsified}</span>
            <span><span className="font-mono-num font-semibold text-foreground-muted">{fals.pending}</span> {d.falsPending}</span>
          </div>
        </div>
      </section>

      {/* ── 9. Quick links ── */}
      <section className="pb-10">
        <div className="flex flex-wrap gap-3">
          {[
            { href: `${prefix}/model`, label: d.ctaModel },
            { href: `${prefix}/evidence`, label: d.ctaEvidence },
            { href: `${prefix}/explore`, label: d.ctaData },
            { href: `${prefix}/mathematics`, label: d.ctaMath },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="inline-flex items-center gap-2 rounded-lg border border-card-border bg-card-bg px-5 py-3 text-sm font-medium transition-colors hover:border-accent/40 hover:text-accent"
            >
              {link.label} <ArrowRight size={14} />
            </Link>
          ))}
        </div>
      </section>

      {/* ── 10. Epistemic footer ── */}
      <footer className="pb-16 border-t border-card-border pt-8">
        <p className="text-sm leading-relaxed text-foreground-muted max-w-3xl">{d.epistemicNote(getReferenceCount())}</p>
        <p className="font-mono-num text-xs text-foreground-muted/60 mt-3">{d.epistemicStats}</p>
        <p className="text-xs text-foreground-muted/40 mt-2">{d.epistemicAuthor}</p>
      </footer>
    </div>
  );
}
