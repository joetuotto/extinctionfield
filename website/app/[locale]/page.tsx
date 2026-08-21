import type { Metadata } from "next";
import Link from "next/link";
import { TrendingDown, Microscope, TestTube, Globe2, Banknote, Activity, Zap, ArrowRight } from "lucide-react";
import CausalChain from "@/components/CausalChain";
import { SentinelCascadeCompact } from "@/components/SentinelCascadeCompact";
import type { Locale } from "@/lib/i18n";
import { LOCKED_PREDICTIONS, countryLabel } from "@/lib/predictions";
import { LatestArticles } from "@/components/LatestArticles";

const IMPACT_ICONS = [TrendingDown, Microscope, TestTube, Globe2, Banknote, Activity, Zap] as const;

const COPY = {
  en: {
    hero: "Extinction Field",
    heroDeck: "A falsifiable research model testing whether electromagnetic field states contribute to the global decline in reproductive indicators — with locked predictions, a bounded evidence register, and the results that do not fit.",

    s1Title: "Something is happening",
    s1Lead: "Global reproductive indicators are declining across species and geographies. No single conventional explanation accounts for the breadth, simultaneity and cross-species convergence of these trends.",

    impactGrid: [
      { stat: "5.0 → 2.2", label: "Global TFR since 1960 — decline is accelerating" },
      { stat: "−62%", label: "Sperm concentration (Levine 2023)" },
      { stat: "−1.2%/yr", label: "Testosterone decline, age-independent" },
      { stat: "49", label: "Countries below TFR 1.4" },
      { stat: "$200B", label: "Korea's pronatalism → TFR dropped" },
      { stat: "24+", label: "Regulatory-approved device categories prove non-thermal EMF biological activity (DC to UV)" },
      { stat: "0 → 24/7", label: "The lighting transition replaced zero-IF sources with continuous kHz fields — unstudied" },
    ],

    teaserLabel: "LOCKED PREDICTIONS · TFR 2030",
    teaserNote: "Locked under BERM v18 and falsifiable: each will be compared against observed data in the stated year.",
    allPredictions: "All predictions",

    sentinelCta: "All sentinels",
    howTitle: "How the model works",
    causalLabel: "REGISTERED CAUSAL ROUTE",
    causalTitle: "A causal route with bounded evidence",
    causalNote: "The active route is FieldState → named intermediate and organ states → paired capacity, alongside explicit demand/tempo/ART inputs → ASFR → TFR. Studies support distinct links and endpoints; none of the current records is a TFR coefficient.",

    ctaModel: "Model specification",
    ctaEvidence: "Evidence register",
    ctaData: "Explore data",
  },
  fi: {
    hero: "Extinction Field",
    heroDeck: "Falsifioitava tutkimusmalli, joka testaa vaikuttavatko sähkömagneettiset kenttätilat lisääntymisindikaattoreiden globaaliin laskuun — lukituilla ennusteilla, rajatulla evidenssirekisterillä ja niillä tuloksilla jotka eivät sovi.",

    s1Title: "Jotain tapahtuu",
    s1Lead: "Lisääntymisen indikaattorit laskevat globaalisti yli laji- ja maantieteellisten rajojen. Mikään yksittäinen tavanomainen selitys ei kata näiden trendien laajuutta, samanaikaisuutta ja lajienvälisyyttä.",

    impactGrid: [
      { stat: "5,0 → 2,2", label: "Globaali TFR vuodesta 1960 — lasku kiihtyy" },
      { stat: "−62 %", label: "Siittiökonsentraatio (Levine 2023)" },
      { stat: "−1,2 %/v", label: "Testosteronilasku, ikäriippumaton" },
      { stat: "49", label: "Maata alle TFR 1,4" },
      { stat: "200 mrd $", label: "Korean pronatalismi → TFR laski" },
      { stat: "24+", label: "Regulaattorihyväksyttyä laitekategoriaa todistaa ei-termisen EMF:n biologisen aktiivisuuden (DC – UV)" },
      { stat: "0 → 24/7", label: "Valaistussiirtymä korvasi nolla-IF-lähteet jatkuvilla kHz-kentillä — tutkimatta" },
    ],

    teaserLabel: "LUKITUT ENNUSTEET · TFR 2030",
    teaserNote: "Lukittu BERM v18:lla ja falsifioitavissa: jokainen verrataan havaittuun dataan ilmoitettuna vuonna.",
    allPredictions: "Kaikki ennusteet",

    sentinelCta: "Kaikki sentinellit",
    howTitle: "Miten malli toimii",
    causalLabel: "REKISTERÖITY KAUSAALIREITTI",
    causalTitle: "Kausaalireitti ja rajattu evidenssi",
    causalNote: "Aktiivinen reitti on FieldState → nimetyt välitilat ja elinkohtaiset tilat → parikapasiteetti sekä eksplisiittiset kysyntä-/tempo-/ART-syötteet → ASFR → TFR. Tutkimukset tukevat erillisiä linkkejä ja päätepisteitä; mikään nykyisistä tietueista ei ole TFR-kerroin.",

    ctaModel: "Mallin määrittely",
    ctaEvidence: "Evidenssirekisteri",
    ctaData: "Tutki dataa",
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
    <div className="max-w-5xl mx-auto px-6">
      {/* ── Hero ── */}
      <header className="pt-20 pb-16 max-w-3xl">
        <h1 className="text-5xl sm:text-6xl mb-6">{d.hero}</h1>
        <p className="editorial-deck text-base sm:text-lg leading-relaxed">{d.heroDeck}</p>
      </header>

      {/* ── Key numbers ── */}
      <section className="pb-20">
        <h2 className="editorial-section-heading mb-3">{d.s1Title}</h2>
        <p className="text-sm text-foreground-muted leading-relaxed mb-8 max-w-3xl">{d.s1Lead}</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {d.impactGrid.map((item, i) => {
            const Icon = IMPACT_ICONS[i];
            return (
              <article key={item.stat} className="rounded-xl border border-card-border bg-card-bg p-5">
                <Icon size={22} className="text-accent/50 mb-3" strokeWidth={1.5} aria-hidden="true" />
                <p className="font-mono-num text-2xl font-semibold text-accent leading-tight">{item.stat}</p>
                <p className="text-[0.8125rem] text-foreground-muted mt-2 leading-snug">{item.label}</p>
              </article>
            );
          })}
        </div>
      </section>

      {/* ── Sentinel cascade ── */}
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

      {/* ── Featured article ── */}
      <LatestArticles locale={activeLocale} />

      {/* ── Locked predictions ── */}
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

      {/* ── Causal diagram ── */}
      <section className="pb-20">
        <h2 className="editorial-section-heading mb-8">{d.howTitle}</h2>
        <figure className="data-figure">
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

      {/* ── Quick links ── */}
      <section className="pb-16">
        <div className="flex flex-wrap gap-3">
          <Link
            href={`${prefix}/model`}
            className="inline-flex items-center gap-2 rounded-lg border border-card-border bg-card-bg px-5 py-3 text-sm font-medium transition-colors hover:border-accent/40 hover:text-accent"
          >
            {d.ctaModel} <ArrowRight size={14} />
          </Link>
          <Link
            href={`${prefix}/evidence`}
            className="inline-flex items-center gap-2 rounded-lg border border-card-border bg-card-bg px-5 py-3 text-sm font-medium transition-colors hover:border-accent/40 hover:text-accent"
          >
            {d.ctaEvidence} <ArrowRight size={14} />
          </Link>
          <Link
            href={`${prefix}/explore`}
            className="inline-flex items-center gap-2 rounded-lg border border-card-border bg-card-bg px-5 py-3 text-sm font-medium transition-colors hover:border-accent/40 hover:text-accent"
          >
            {d.ctaData} <ArrowRight size={14} />
          </Link>
        </div>
      </section>
    </div>
  );
}
