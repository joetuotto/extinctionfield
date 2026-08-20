import type { Metadata } from "next";
import Link from "next/link";
import CausalChain from "@/components/CausalChain";
import { WorldMap } from "@/components/WorldMap";
import { SentinelCascadeCompact } from "@/components/SentinelCascadeCompact";
import { ReferencesSummary } from "@/components/ReferencesSummary";
import type { Locale } from "@/lib/i18n";
import { LOCKED_PREDICTIONS, countryLabel } from "@/lib/predictions";
import { PredictionStatusBadge } from "@/components/PredictionStatusBadge";
import {
  FIELDSTATE_EVIDENCE_COUNT,
} from "@/lib/fieldstateEvidence";

const COPY = {
  en: {
    hero: "Extinction Field",
    kicker: "FieldState–ASFR v2 architecture · BERM v18 evidence and predictions",
    heroDeck: "A falsifiable research model testing whether electromagnetic field states contribute to the global decline in reproductive indicators — with locked predictions, a bounded evidence register, and the results that do not fit.",

    // Section 1: Something is happening
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

    // Section 2: One testable explanation
    s2Title: "One testable explanation",
    s2Lead: "The Bio-Electromagnetic Reproductive Model (BERM) proposes that specific electromagnetic field states contribute to components of reproductive capacity and, through age-specific fertility, to period TFR trends.",
    s2Layers: [
      { n: "01", title: "FieldState and Lindgren selection", text: "Background, ambient and personal field vectors, spectra, phase/coherence and envelope — not a national technology scalar." },
      { n: "02", title: "Organ-local transfer and memory", text: "Explicit organ transfer with receptor state, circadian context and reversible/persistent components." },
      { n: "03", title: "Reproductive capacity and the couple", text: "Male, female, barrier and implantation components combine as paired conception capacity." },
      { n: "04", title: "ASFR → TFR", text: "Age-specific fertility first, with demand, tempo and ART as separate terms; TFR is derived." },
    ],
    s2ProxyNote: "Mobile-subscription penetration is a technology-adoption timing proxy, not a measured FieldState or personal EMF dose.",

    teaserLabel: "LOCKED PREDICTIONS · TFR 2030",
    teaserNote: "Locked under BERM v18 and falsifiable: each will be compared against observed data in the stated year. Brackets show the one-at-a-time parameter sensitivity envelope, not a confidence interval.",

    // Section 3: Locked predictions
    s3Title: "Locked predictions",
    s3Lead: "These predictions were locked under the BERM v18 scalar-exposure architecture. FieldState–ASFR v2 does not yet publish its own predictions — it requires matched local field, biological-endpoint and couple panels.",
    s3Note: "When FieldState v2 predictions are ready, they will be published alongside v18 predictions for comparison.",

    // Section 4: What the model gets right — and wrong
    s4Title: "What the model gets right — and wrong",
    s4K8: "K8: 86% of placebo series show significantly worse hindcast fit than the EMF-inclusive model (LOOCV, 57 countries).",
    s4K10: "K10: the model out-predicts a null (flat-line) baseline in rolling 5-year backtests on held-out TFR data.",
    s4R2: "R² = calibration, not explanation. The model fits observed TFR trajectories but this does not establish causation — it establishes that the proposed mechanism is consistent with observed data.",
    s4Readiness: "Measurement readiness",
    s4ReadinessItems: [
      { tier: "Technology timing proxy", status: "available", desc: "Mobile subscriptions as timing proxy for 163 countries." },
      { tier: "Partial FieldState", status: "protocol defined", desc: "ANFR-type spatial RF measurements exist; organ transfer model not yet calibrated." },
      { tier: "Measurement-ready", status: "no countries yet", desc: "Requires matched FieldState, biological endpoints and couple panels." },
    ],
    s4Evidence: `Based on ${FIELDSTATE_EVIDENCE_COUNT} bounded study-to-node records across the causal route, plus 82+ peer-reviewed studies in the extended evidence register.`,

    // Above-fold impact grid
    impactGrid: [
      { icon: "📉", stat: "5.0 → 2.2", label: "Global TFR since 1960 — decline is accelerating" },
      { icon: "🔬", stat: "−62%", label: "Sperm concentration (Levine 2023)" },
      { icon: "💉", stat: "−1.2%/yr", label: "Testosterone decline, age-independent" },
      { icon: "🌍", stat: "49", label: "Countries below TFR 1.4" },
      { icon: "💰", stat: "$200B", label: "Korea's pronatalism → TFR dropped" },
    ],
    sentinelCta: "All sentinels",
    howTitle: "How the model works",

    // Navigation links
    methods: "Model specification",
    evidence: "Evidence register",
    predictions: "All predictions",
    explore: "Explore countries",
    sentinel: "Sentinel species",
    archive: "BERM v18 archive",

    // Map / diagram labels
    mapLabel: "FIGURE 01 · PUBLISHED TIME SERIES",
    mapTitle: "Published fertility series and technology timing",
    mapNote: "The map displays the published World Bank WDI TFR series and mobile subscriptions. The latter is a digital-technology timing proxy, not an EMF exposure or dose layer.",
    causalLabel: "FIGURE 02 · REGISTERED CAUSAL ROUTE",
    causalTitle: "A causal route with bounded evidence",
    causalNote: "The active route is FieldState → named intermediate and organ states → paired capacity, alongside explicit demand/tempo/ART inputs → ASFR → TFR. Studies support distinct links and endpoints; none of the current records is a TFR coefficient.",
  },
  fi: {
    hero: "Extinction Field",
    kicker: "FieldState–ASFR v2 -arkkitehtuuri · BERM v18 -evidenssi ja ennusteet",
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

    s2Title: "Yksi testattava selitys",
    s2Lead: "Bio-sähkömagneettinen lisääntymismalli (BERM) ehdottaa, että tietyt sähkömagneettiset kenttätilat vaikuttavat lisääntymiskyvyn osiin ja ikäkohtaisen hedelmällisyyden kautta periodin TFR-trendeihin.",
    s2Layers: [
      { n: "01", title: "FieldState ja Lindgren-valinta", text: "Taustan, ambientin ja henkilökohtaisen kentän vektorit, spektrit, vaihe/koherenssi ja verhokäyrä — ei kansallinen teknologiaskalaari." },
      { n: "02", title: "Elinkohtainen siirto ja muisti", text: "Eksplisiittinen elinsiirto reseptoritilalla, vuorokausikontekstilla ja palautuvilla/persistenteillä komponenteilla." },
      { n: "03", title: "Reproduktiivinen kapasiteetti ja pari", text: "Mies-, nais-, este- ja implantaatiokomponentit yhdistyvät paritetuksi conception-kapasiteetiksi." },
      { n: "04", title: "ASFR → TFR", text: "Ikäkohtainen hedelmällisyys ensin; kysyntä, tempo ja ART erillisinä termeinä; TFR johdetaan." },
    ],
    s2ProxyNote: "Mobiililiittymien penetraatio on teknologian käyttöönoton ajoitusproxy, ei mitattu FieldState tai henkilökohtainen EMF-annos.",

    teaserLabel: "LUKITUT ENNUSTEET · TFR 2030",
    teaserNote: "Lukittu BERM v18:lla ja falsifioitavissa: jokainen verrataan havaittuun dataan ilmoitettuna vuonna. Hakasulkeet näyttävät yksi-kerrallaan-parametriherkkyysalueen, eivät luottamusväliä.",

    s3Title: "Lukitut ennusteet",
    s3Lead: "Nämä ennusteet lukittiin BERM v18:n skalaarialtistusarkkitehtuurilla. FieldState–ASFR v2 ei vielä julkaise omia ennusteita — se tarvitsee kohdistetut paikalliset kenttä-, biologiset päätepiste- ja paripaneelit.",
    s3Note: "Kun FieldState v2 -ennusteet ovat valmiita, ne julkaistaan rinnakkain v18-ennusteiden kanssa vertailua varten.",

    s4Title: "Missä malli onnistuu — ja missä ei",
    s4K8: "K8: 86 % placebo-sarjoista antaa merkitsevästi huonomman hindcast-sovitteen kuin EMF-malli (LOOCV, 57 maata).",
    s4K10: "K10: malli ennustaa nollahypoteesia paremmin 5 vuoden liukuvissa takatestissä erillisellä TFR-datalla.",
    s4R2: "R² = kalibraatio, ei selitys. Malli sopii havaittuihin TFR-liikeratoihin, mutta se ei osoita kausaatiota — se osoittaa, että ehdotettu mekanismi on yhdenmukainen havaitun datan kanssa.",
    s4Readiness: "Mittaamisvalmius",
    s4ReadinessItems: [
      { tier: "Teknologian ajoitusproxy", status: "saatavilla", desc: "Mobiililiittymät ajoitusproxyna 163 maalle." },
      { tier: "Osittainen FieldState", status: "protokolla määritelty", desc: "ANFR-tyyppisiä alueellisia RF-mittauksia on olemassa; elinsiirtomallia ei ole vielä kalibroitu." },
      { tier: "Mittaamisvalmis", status: "ei yhtään maata", desc: "Vaatii kohdistetun FieldStaten, biologiset päätepisteet ja paripaneelit." },
    ],
    s4Evidence: `Perustuu ${FIELDSTATE_EVIDENCE_COUNT} rajattuun tutkimus–solmu-tietueeseen kausaalireitillä sekä 82+ vertaisarvioituun tutkimukseen laajennetussa evidenssirekisterissä.`,

    impactGrid: [
      { icon: "📉", stat: "5,0 → 2,2", label: "Globaali TFR vuodesta 1960 — lasku kiihtyy" },
      { icon: "🔬", stat: "−62 %", label: "Siittiökonsentraatio (Levine 2023)" },
      { icon: "💉", stat: "−1,2 %/v", label: "Testosteronilasku, ikäriippumaton" },
      { icon: "🌍", stat: "49", label: "Maata alle TFR 1,4" },
      { icon: "💰", stat: "200 mrd $", label: "Korean pronatalismi → TFR laski" },
    ],
    sentinelCta: "Kaikki sentinellit",
    howTitle: "Miten malli toimii",

    methods: "Mallin määrittely",
    evidence: "Evidenssirekisteri",
    predictions: "Kaikki ennusteet",
    explore: "Tutki maita",
    sentinel: "Sentinellilajit",
    archive: "BERM v18 -arkisto",

    mapLabel: "KUVIO 01 · JULKAISTU AIKASARJA",
    mapTitle: "Julkaistu hedelmällisyyssarja ja teknologian ajoitus",
    mapNote: "Kartta näyttää Maailmanpankin WDI:n julkaistun TFR-sarjan ja mobiililiittymät. Jälkimmäinen on digitaalisen teknologian ajoitusproksi, ei EMF-altistus- tai annoskerros.",
    causalLabel: "KUVIO 02 · REKISTERÖITY KAUSAALIREITTI",
    causalTitle: "Kausaalireitti ja rajattu evidenssi",
    causalNote: "Aktiivinen reitti on FieldState → nimetyt välitilat ja elinkohtaiset tilat → parikapasiteetti sekä eksplisiittiset kysyntä-/tempo-/ART-syötteet → ASFR → TFR. Tutkimukset tukevat erillisiä linkkejä ja päätepisteitä; mikään nykyisistä tietueista ei ole TFR-kerroin.",
  },
} as const;

const TFR_PREDICTIONS = LOCKED_PREDICTIONS.filter(
  (p) => p.metric === "TFR" || p.metric === "feedback_TFR"
);

/** Three headline 2030 country forecasts, shown as a teaser above the fold. */
const TEASER_IDS = ["kr-2030-tfr", "fi-2030-tfr", "us-2030-tfr"] as const;
const TEASER_PREDICTIONS = TEASER_IDS.map(
  (id) => LOCKED_PREDICTIONS.find((p) => p.id === id)!
).filter(Boolean);

const READINESS_COLORS: Record<string, string> = {
  available: "text-status-confirmed",
  saatavilla: "text-status-confirmed",
  "protocol defined": "text-status-partial",
  "protokolla määritelty": "text-status-partial",
  "no countries yet": "text-status-pending",
  "ei yhtään maata": "text-status-pending",
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (locale === "fi") {
    return {
      title: "Extinction Field – FieldState–ASFR-tutkimusmalli",
      description:
        "Mittaustietoinen tutkimusmalli kenttätilan, lisääntymispäätepisteiden ja ikäkohtaisen hedelmällisyyden hypoteesien testaamiseen.",
    };
  }
  return {
    title: "Extinction Field – FieldState–ASFR research model",
    description:
      "A measurement-aware research model for testing field-state, reproductive-endpoint and age-specific fertility hypotheses.",
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
      {/* Above-fold impact grid */}
      <section className="mb-12 max-w-4xl">
        <h2 className="editorial-section-heading mb-6">{d.s1Title}</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {d.impactGrid.map((item) => (
            <article key={item.stat} className="border border-card-border rounded-lg p-4">
              <span className="text-lg leading-none">{item.icon}</span>
              <p className="font-mono-num text-xl font-semibold text-accent mt-2 leading-tight">{item.stat}</p>
              <p className="text-xs text-foreground-muted mt-1 leading-snug">{item.label}</p>
            </article>
          ))}
        </div>
      </section>

      <header className="mb-16 max-w-4xl border-b border-card-border pb-9">
        <p className="editorial-kicker mb-4 text-accent">{d.kicker}</p>
        <h1 className="mb-5 text-5xl sm:text-6xl">{d.hero}</h1>
        <p className="editorial-deck">{d.heroDeck}</p>
      </header>

      {/* SECTION 1: Something is happening */}
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

      {/* Locked predictions — compact teaser */}
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

      {/* Transition to model explanation */}
      <div className="mb-16 max-w-4xl">
        <hr className="editorial-divider" />
        <h2 className="editorial-section-heading">{d.howTitle}</h2>
      </div>

      {/* SECTION 2: One testable explanation */}
      <section className="mb-16 border-t editorial-rule pt-6">
        <h2 className="editorial-section-heading mb-4">{d.s2Title}</h2>
        <p className="text-sm text-foreground-muted leading-relaxed mb-8 max-w-4xl">{d.s2Lead}</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 max-w-4xl">
          {d.s2Layers.map((layer) => (
            <article key={layer.n} className="border border-card-border rounded-lg p-5">
              <p className="font-mono-num text-xs text-accent mb-2">{layer.n}</p>
              <h3 className="text-sm font-semibold mb-2">{layer.title}</h3>
              <p className="text-xs text-foreground-muted leading-relaxed">{layer.text}</p>
            </article>
          ))}
        </div>

        <div className="max-w-4xl rounded-lg border border-status-partial/30 bg-status-partial/5 px-5 py-4">
          <p className="text-xs text-foreground-muted leading-relaxed">
            <span className="font-semibold text-status-partial mr-1.5">&#9888;</span>
            {d.s2ProxyNote}
          </p>
        </div>
      </section>

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

      {/* SECTION 3: Locked predictions */}
      <section className="mb-16 border-t editorial-rule pt-6">
        <h2 className="editorial-section-heading mb-4">{d.s3Title}</h2>
        <p className="text-sm text-foreground-muted leading-relaxed mb-6 max-w-4xl">{d.s3Lead}</p>

        <div className="overflow-x-auto mb-6">
          <table className="w-full text-sm border-collapse max-w-4xl">
            <thead>
              <tr className="border-b border-card-border text-left text-xs text-foreground-muted uppercase tracking-wider">
                <th className="py-3 pr-4">{activeLocale === "fi" ? "Maa" : "Country"}</th>
                <th className="py-3 pr-4">{activeLocale === "fi" ? "Vuosi" : "Year"}</th>
                <th className="py-3 pr-4 text-right">{activeLocale === "fi" ? "Ennuste" : "Prediction"}</th>
                <th className="py-3 pr-4 text-right">{activeLocale === "fi" ? "Herkkyys" : "Sensitivity"}</th>
                <th className="py-3 pr-4">{activeLocale === "fi" ? "Tila" : "Status"}</th>
                <th className="py-3 text-right">{activeLocale === "fi" ? "Versio" : "Version"}</th>
              </tr>
            </thead>
            <tbody>
              {TFR_PREDICTIONS.map((p) => (
                <tr key={p.id} className="border-b border-card-border/50 hover:bg-card-bg/50 transition-colors">
                  <td className="py-3 pr-4 font-medium">{countryLabel(p, activeLocale)}</td>
                  <td className="py-3 pr-4 font-mono-num text-foreground-muted">{p.year}</td>
                  <td className="py-3 pr-4 text-right font-mono-num font-semibold text-accent">{p.central.toFixed(2)}</td>
                  <td className="py-3 pr-4 text-right font-mono-num text-foreground-muted">[{p.ciLow.toFixed(2)} – {p.ciHigh.toFixed(2)}]</td>
                  <td className="py-3 pr-4"><PredictionStatusBadge status={p.status} locale={activeLocale} /></td>
                  <td className="py-3 text-right font-mono-num text-xs text-foreground-muted">{p.modelVersion}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="text-xs text-foreground-muted leading-relaxed max-w-4xl italic">{d.s3Note}</p>
      </section>

      {/* SECTION 4: What the model gets right — and wrong */}
      <section className="mb-16 border-t editorial-rule pt-6">
        <h2 className="editorial-section-heading mb-6">{d.s4Title}</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 max-w-4xl">
          <article className="border border-card-border rounded-lg p-5">
            <p className="font-mono-num text-xs text-accent mb-2">K8</p>
            <p className="text-xs text-foreground-muted leading-relaxed">{d.s4K8}</p>
          </article>
          <article className="border border-card-border rounded-lg p-5">
            <p className="font-mono-num text-xs text-accent mb-2">K10</p>
            <p className="text-xs text-foreground-muted leading-relaxed">{d.s4K10}</p>
          </article>
          <article className="border border-card-border rounded-lg p-5">
            <p className="font-mono-num text-xs text-accent mb-2">R²</p>
            <p className="text-xs text-foreground-muted leading-relaxed">{d.s4R2}</p>
          </article>
        </div>

        <div className="mb-8 max-w-4xl">
          <h3 className="text-sm font-semibold mb-4">{d.s4Readiness}</h3>
          <div className="grid grid-cols-1 gap-3">
            {d.s4ReadinessItems.map((item) => (
              <div
                key={item.tier}
                className="flex flex-col gap-1 border-t border-card-border py-3 sm:flex-row sm:items-start sm:gap-5"
              >
                <div className="sm:w-52 sm:shrink-0">
                  <p className="text-sm font-medium">{item.tier}</p>
                  <p className={`text-xs font-mono-num ${READINESS_COLORS[item.status] ?? "text-foreground-muted"}`}>{item.status}</p>
                </div>
                <p className="text-sm text-foreground-muted leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <p className="text-sm text-foreground-muted leading-relaxed max-w-4xl">{d.s4Evidence}</p>
      </section>

      {/* Reference database summary */}
      <section className="mb-16 max-w-4xl">
        <ReferencesSummary locale={activeLocale} />
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
                ? "FieldState–ASFR v2 -arkkitehtuuri, polkuhierarkia ja matemaattinen määrittely."
                : "FieldState–ASFR v2 architecture, pathway hierarchy and mathematical specification."}
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
                ? "Lukitut TFR-ennusteet BERM v18 -arkkitehtuurilla, vertailtavissa havaittuun dataan."
                : "Locked TFR predictions under the BERM v18 architecture, comparable against observed data."}
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
