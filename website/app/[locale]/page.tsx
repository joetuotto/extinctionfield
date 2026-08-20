import type { Metadata } from "next";
import Link from "next/link";
import { TrendingDown, Microscope, TestTube, Globe2, Banknote } from "lucide-react";
import CausalChain from "@/components/CausalChain";
import { WorldMap } from "@/components/WorldMap";
import { SentinelCascadeCompact } from "@/components/SentinelCascadeCompact";
import type { Locale } from "@/lib/i18n";
import { LOCKED_PREDICTIONS, countryLabel } from "@/lib/predictions";

const IMPACT_ICONS = [TrendingDown, Microscope, TestTube, Globe2, Banknote] as const;

const COPY = {
  en: {
    hero: "Extinction Field",
    heroDeck: "A falsifiable research model testing whether electromagnetic field states contribute to the global decline in reproductive indicators — with locked predictions, a bounded evidence register, and the results that do not fit.",

    s1Title: "Something is happening",
    s1Lead: "Global reproductive indicators are declining across species and geographies. No single conventional explanation accounts for the breadth, simultaneity and cross-species convergence of these trends.",
    s1Facts: [
      { stat: "5.0 → 2.2", unit: "", text: "global TFR since 1960 (UN WPP 2024). The decline is not levelling off: the steepest falls are in the most recently industrialised, most connected populations." },
      { stat: "−62%", unit: "", text: "decline in sperm concentration since 1973 (Levine et al. 2017/2022 meta-regression; 42,935 men across 53 countries)." },
      { stat: "−1%", unit: "/year", text: "testosterone decline in Western males, age-adjusted (Travison et al. 2007; replicated in multiple populations)." },
      { stat: "49", unit: "countries", text: "below TFR 1.4 in the 2024 WPP revision — the largest cohort ever recorded beneath near-lowest-low fertility." },
      { stat: "$200bn", unit: "", text: "spent by South Korea on pronatalist incentives (2006–2024). TFR fell from 1.13 to 0.72 over the same period — the largest natural test of the economic-choice explanation, and it failed." },
      { stat: "Cross-species", unit: "", text: "parallel trends: bee colony losses, bird population declines and domestic animal semen quality changes track alongside human reproductive indicators." },
      { stat: "Cohort pattern", unit: "", text: "WPP 2024 ASFR shows younger cohorts with greater mobile-technology exposure have steeper fertility declines than older cohorts within the same country (N = 163; r = −0.67)." },
      { stat: "20/23", unit: "countries", text: "bee colony winter loss increase precedes human fertility decline by approximately 2 years (circular-shift p = 0.006, COLOSS panel). Bees and humans share the same electromagnetic environment but not the same cultural pressures." },
    ],

    teaserLabel: "LOCKED PREDICTIONS · TFR 2030",
    teaserNote: "Locked under BERM v18 and falsifiable: each will be compared against observed data in the stated year. Brackets show the one-at-a-time parameter sensitivity envelope, not a confidence interval.",

    impactGrid: [
      { stat: "5.0 → 2.2", label: "Global TFR since 1960 — decline is accelerating" },
      { stat: "−62%", label: "Sperm concentration (Levine 2023)" },
      { stat: "−1.2%/yr", label: "Testosterone decline, age-independent" },
      { stat: "49", label: "Countries below TFR 1.4" },
      { stat: "$200B", label: "Korea's pronatalism → TFR dropped" },
    ],
    sentinelCta: "All sentinels",
    howTitle: "How the model works",

    methods: "Model specification",
    evidence: "Evidence register",
    predictions: "All predictions",
    explore: "Explore countries",
    sentinel: "Sentinel species",

    mapLabel: "FIGURE 01 · PUBLISHED TIME SERIES",
    mapTitle: "Published fertility series and technology timing",
    mapNote: "The map displays the published World Bank WDI TFR series and mobile subscriptions. The latter is a digital-technology timing proxy, not an EMF exposure or dose layer.",
    causalLabel: "FIGURE 02 · REGISTERED CAUSAL ROUTE",
    causalTitle: "A causal route with bounded evidence",
    causalNote: "The active route is FieldState → named intermediate and organ states → paired capacity, alongside explicit demand/tempo/ART inputs → ASFR → TFR. Studies support distinct links and endpoints; none of the current records is a TFR coefficient.",
  },
  fi: {
    hero: "Extinction Field",
    heroDeck: "Falsifioitava tutkimusmalli, joka testaa vaikuttavatko sähkömagneettiset kenttätilat lisääntymisindikaattoreiden globaaliin laskuun — lukituilla ennusteilla, rajatulla evidenssirekisterillä ja niillä tuloksilla jotka eivät sovi.",

    s1Title: "Jotain tapahtuu",
    s1Lead: "Lisääntymisen indikaattorit laskevat globaalisti yli laji- ja maantieteellisten rajojen. Mikään yksittäinen tavanomainen selitys ei kata näiden trendien laajuutta, samanaikaisuutta ja lajienvälisyyttä.",
    s1Facts: [
      { stat: "5,0 → 2,2", unit: "", text: "globaali TFR vuodesta 1960 (YK WPP 2024). Lasku ei tasaannu: jyrkimmät pudotukset ovat viimeksi teollistuneissa, verkottuneimmissa väestöissä." },
      { stat: "−62 %", unit: "", text: "lasku siittiökonsentraatiossa vuodesta 1973 (Levine ym. 2017/2022; 42 935 miestä, 53 maata)." },
      { stat: "−1 %", unit: "/vuosi", text: "testosteronin lasku länsimaissa, ikävakioitu (Travison ym. 2007; replikoitu useissa populaatioissa)." },
      { stat: "49", unit: "maata", text: "alle TFR 1,4:n WPP 2024 -tarkistuksessa — suurin koskaan kirjattu kohortti lähes alimman matalan hedelmällisyyden alapuolella." },
      { stat: "200 mrd $", unit: "", text: "Etelä-Korean pronatalistisiin kannustimiin käyttämä summa (2006–2024). TFR laski samalla 1,13:sta 0,72:een — suurin luonnollinen testi taloudellisen valinnan selitykselle, ja se epäonnistui." },
      { stat: "Lajienvälinen", unit: "", text: "rinnakkaistrendi: mehiläisten pesäkuolemat, lintupopulaatioiden laskut ja tuotantoeläinten siemennesteen laadun muutokset seuraavat ihmisen indikaattoreita." },
      { stat: "Kohorttikuvio", unit: "", text: "WPP 2024 ASFR osoittaa, että nuoremmilla kohorteilla, joilla on suurempi mobiiliteknologia-altistus, hedelmällisyys laskee jyrkemmin kuin vanhemmilla kohorteilla samassa maassa (N = 163; r = −0,67)." },
      { stat: "20/23", unit: "maata", text: "mehiläispesien talvihäviön kasvu edeltää ihmisen hedelmällisyyden laskua noin 2 vuodella (circular-shift p = 0,006, COLOSS-paneeli). Mehiläiset ja ihmiset jakavat saman sähkömagneettisen ympäristön mutta eivät samoja kulttuurisia paineita." },
    ],

    teaserLabel: "LUKITUT ENNUSTEET · TFR 2030",
    teaserNote: "Lukittu BERM v18:lla ja falsifioitavissa: jokainen verrataan havaittuun dataan ilmoitettuna vuonna. Hakasulkeet näyttävät yksi-kerrallaan-parametriherkkyysalueen, eivät luottamusväliä.",

    impactGrid: [
      { stat: "5,0 → 2,2", label: "Globaali TFR vuodesta 1960 — lasku kiihtyy" },
      { stat: "−62 %", label: "Siittiökonsentraatio (Levine 2023)" },
      { stat: "−1,2 %/v", label: "Testosteronilasku, ikäriippumaton" },
      { stat: "49", label: "Maata alle TFR 1,4" },
      { stat: "200 mrd $", label: "Korean pronatalismi → TFR laski" },
    ],
    sentinelCta: "Kaikki sentinellit",
    howTitle: "Miten malli toimii",

    methods: "Mallin määrittely",
    evidence: "Evidenssirekisteri",
    predictions: "Kaikki ennusteet",
    explore: "Tutki maita",
    sentinel: "Sentinellilajit",

    mapLabel: "KUVIO 01 · JULKAISTU AIKASARJA",
    mapTitle: "Julkaistu hedelmällisyyssarja ja teknologian ajoitus",
    mapNote: "Kartta näyttää Maailmanpankin WDI:n julkaistun TFR-sarjan ja mobiililiittymät. Jälkimmäinen on digitaalisen teknologian ajoitusproksi, ei EMF-altistus- tai annoskerros.",
    causalLabel: "KUVIO 02 · REKISTERÖITY KAUSAALIREITTI",
    causalTitle: "Kausaalireitti ja rajattu evidenssi",
    causalNote: "Aktiivinen reitti on FieldState → nimetyt välitilat ja elinkohtaiset tilat → parikapasiteetti sekä eksplisiittiset kysyntä-/tempo-/ART-syötteet → ASFR → TFR. Tutkimukset tukevat erillisiä linkkejä ja päätepisteitä; mikään nykyisistä tietueista ei ole TFR-kerroin.",
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

  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      {/* Impact grid */}
      <section className="mb-12 max-w-4xl">
        <h2 className="editorial-section-heading mb-6">{d.s1Title}</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {d.impactGrid.map((item, i) => {
            const Icon = IMPACT_ICONS[i];
            return (
              <article key={item.stat} className="border border-card-border rounded-lg p-4">
                <Icon size={20} className="text-accent/60" strokeWidth={1.5} aria-hidden="true" />
                <p className="font-mono-num text-xl font-semibold text-accent mt-2 leading-tight">{item.stat}</p>
                <p className="text-xs text-foreground-muted mt-1 leading-snug">{item.label}</p>
              </article>
            );
          })}
        </div>
      </section>

      {/* Hero */}
      <header className="mb-16 max-w-4xl border-b border-card-border pb-9">
        <h1 className="mb-5 text-5xl sm:text-6xl">{d.hero}</h1>
        <p className="editorial-deck">{d.heroDeck}</p>
      </header>

      {/* Detailed facts */}
      <section className="mb-16 border-t editorial-rule pt-6">
        <h2 className="editorial-section-heading mb-4">{d.s1Title}</h2>
        <p className="text-sm text-foreground-muted leading-relaxed mb-8 max-w-4xl">{d.s1Lead}</p>
        <div className="grid grid-cols-1 gap-4 max-w-4xl">
          {d.s1Facts.map((fact) => {
            const isNumeric = /\d/.test(fact.stat);
            return (
              <article
                key={fact.text}
                className="flex flex-col gap-1 border-t border-card-border py-4 sm:flex-row sm:items-baseline sm:gap-5"
              >
                <div className="sm:w-40 sm:shrink-0 sm:text-right">
                  <span
                    className={
                      isNumeric
                        ? "font-mono-num text-2xl leading-none text-accent"
                        : "text-sm font-semibold uppercase tracking-wide text-accent"
                    }
                  >
                    {fact.stat}
                  </span>
                  {fact.unit && (
                    <span className="ml-1 text-xs text-foreground-muted">{fact.unit}</span>
                  )}
                </div>
                <p className="text-sm leading-relaxed text-foreground-muted">{fact.text}</p>
              </article>
            );
          })}
        </div>
      </section>

      {/* Sentinel cascade compact */}
      <section className="mb-16 max-w-4xl">
        <SentinelCascadeCompact locale={activeLocale} />
        <div className="mt-3 text-right">
          <Link
            href={`${prefix}/sentinel`}
            className="text-sm font-medium text-accent transition-colors hover:text-accent-hover"
          >
            {d.sentinelCta} →
          </Link>
        </div>
      </section>

      {/* Locked predictions teaser */}
      <section className="mb-16 max-w-4xl">
        <div className="rounded-lg border border-card-border bg-card-bg p-5">
          <div className="mb-4 flex flex-wrap items-baseline justify-between gap-3">
            <h2 className="editorial-kicker text-accent">{d.teaserLabel}</h2>
            <Link
              href={`${prefix}/predictions`}
              className="text-sm font-medium text-accent transition-colors hover:text-accent-hover"
            >
              {d.predictions} →
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {TEASER_PREDICTIONS.map((p) => (
              <div key={p.id} className="border-t border-card-border pt-3">
                <p className="text-sm font-medium">
                  {countryLabel(p, activeLocale)} {p.year}
                </p>
                <p className="mt-1">
                  <span className="font-mono-num text-2xl font-semibold leading-none text-accent">
                    {p.central.toFixed(2)}
                  </span>
                  <span className="ml-2 font-mono-num text-xs text-foreground-muted">
                    [{p.ciLow.toFixed(2)} – {p.ciHigh.toFixed(2)}]
                  </span>
                </p>
              </div>
            ))}
          </div>
          <p className="mt-4 text-xs leading-relaxed text-foreground-muted">{d.teaserNote}</p>
        </div>
      </section>

      {/* Transition */}
      <div className="mb-16 max-w-4xl">
        <hr className="editorial-divider" />
        <h2 className="editorial-section-heading">{d.howTitle}</h2>
      </div>

      {/* Causal route diagram */}
      <section className="mb-16 border-t editorial-rule pt-6">
        <figure className="data-figure overflow-hidden">
          <figcaption className="data-figure__caption">
            <p className="editorial-kicker text-accent">{d.causalLabel}</p>
            <p className="data-figure__title mt-1">{d.causalTitle}</p>
          </figcaption>
          <div className="overflow-x-auto p-1 md:p-3">
            <CausalChain locale={activeLocale} />
          </div>
          <p className="data-figure__note">{d.causalNote}</p>
        </figure>
      </section>

      {/* Map */}
      <section className="mb-16 border-t editorial-rule pt-6">
        <figure className="data-figure overflow-hidden">
          <figcaption className="data-figure__caption">
            <p className="editorial-kicker text-accent">{d.mapLabel}</p>
            <p className="data-figure__title mt-1">{d.mapTitle}</p>
          </figcaption>
          <WorldMap locale={activeLocale} />
          <p className="data-figure__note">{d.mapNote}</p>
        </figure>
      </section>

      {/* Navigation cards */}
      <section className="border-t border-card-border pt-8">
        <div className="grid gap-4 sm:grid-cols-3 mb-6">
          <Link
            href={`${prefix}/model`}
            className="group rounded-xl border border-card-border bg-card-bg p-5 transition-colors hover:border-accent/40"
          >
            <h3 className="text-sm font-semibold group-hover:text-accent transition-colors">{d.methods}</h3>
            <p className="mt-2 text-xs leading-relaxed text-foreground-muted">
              {activeLocale === "fi"
                ? "BERM-arkkitehtuuri, polkuhierarkia ja matemaattinen määrittely."
                : "BERM architecture, pathway hierarchy and mathematical specification."}
            </p>
            <p className="mt-3 text-xs font-medium text-accent">{activeLocale === "fi" ? "Avaa" : "Open"} →</p>
          </Link>
          <Link
            href={`${prefix}/evidence`}
            className="group rounded-xl border border-card-border bg-card-bg p-5 transition-colors hover:border-accent/40"
          >
            <h3 className="text-sm font-semibold group-hover:text-accent transition-colors">{d.evidence}</h3>
            <p className="mt-2 text-xs leading-relaxed text-foreground-muted">
              {activeLocale === "fi"
                ? "Rajatut tutkimus–solmu-tietueet kausaalireitillä ja laajennettu evidenssirekisteri."
                : "Bounded study-to-node records on the causal route and extended evidence registry."}
            </p>
            <p className="mt-3 text-xs font-medium text-accent">{activeLocale === "fi" ? "Avaa" : "Open"} →</p>
          </Link>
          <Link
            href={`${prefix}/predictions`}
            className="group rounded-xl border border-card-border bg-card-bg p-5 transition-colors hover:border-accent/40"
          >
            <h3 className="text-sm font-semibold group-hover:text-accent transition-colors">{d.predictions}</h3>
            <p className="mt-2 text-xs leading-relaxed text-foreground-muted">
              {activeLocale === "fi"
                ? "Lukitut TFR-ennusteet, vertailtavissa havaittuun dataan."
                : "Locked TFR predictions, comparable against observed data."}
            </p>
            <p className="mt-3 text-xs font-medium text-accent">{activeLocale === "fi" ? "Avaa" : "Open"} →</p>
          </Link>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link href={`${prefix}/explore`} className="inline-flex items-center border border-border px-5 py-2.5 text-sm font-medium text-foreground-muted transition-colors hover:text-foreground">{d.explore}</Link>
          <Link href={`${prefix}/sentinel`} className="inline-flex items-center border border-border px-5 py-2.5 text-sm font-medium text-foreground-muted transition-colors hover:text-foreground">{d.sentinel}</Link>
          <Link href={`${prefix}/predictions`} className="inline-flex items-center border border-border px-5 py-2.5 text-sm font-medium text-foreground-muted transition-colors hover:text-foreground">{d.predictions}</Link>
        </div>
      </section>
    </div>
  );
}
