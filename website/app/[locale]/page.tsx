import Link from "next/link";
import CausalChain from "@/components/CausalChain";
import { WorldMap } from "@/components/WorldMap";
import { SentinelCascadeCompact } from "@/components/SentinelCascadeCompact";
import { ReferencesSummary } from "@/components/ReferencesSummary";
import type { Locale } from "@/lib/i18n";
import { LOCKED_PREDICTIONS } from "@/lib/predictions";
import {
  FIELDSTATE_EVIDENCE_COUNT,
} from "@/lib/fieldstateEvidence";

const COPY = {
  en: {
    hero: "Extinction Field",
    kicker: "FieldState–ASFR v2 architecture · BERM v18 evidence and predictions",

    // Section 1: Something is happening
    s1Title: "Something is happening",
    s1Lead: "Global reproductive indicators are declining across species and geographies. No single conventional explanation accounts for the breadth, simultaneity and cross-species convergence of these trends.",
    s1Facts: [
      { stat: "49", unit: "countries", text: "below TFR 1.4 in the 2024 WPP revision — the largest cohort ever recorded beneath near-lowest-low fertility." },
      { stat: "−62%", unit: "", text: "decline in sperm concentration since 1973 (Levine et al. 2017/2022 meta-regression; 42,935 men across 53 countries)." },
      { stat: "−1%", unit: "/year", text: "testosterone decline in Western males, age-adjusted (Travison et al. 2007; replicated in multiple populations)." },
      { stat: "Cross-species", unit: "", text: "parallel trends: bee colony losses, bird population declines and domestic animal semen quality changes track alongside human reproductive indicators." },
      { stat: "Cohort", unit: "pattern", text: "WPP 2024 ASFR shows younger cohorts with greater mobile-technology exposure have steeper fertility declines than older cohorts within the same country (N = 163; r = −0.67)." },
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

    s1Title: "Jotain tapahtuu",
    s1Lead: "Lisääntymisen indikaattorit laskevat globaalisti yli laji- ja maantieteellisten rajojen. Mikään yksittäinen tavanomainen selitys ei kata näiden trendien laajuutta, samanaikaisuutta ja lajienvälisyyttä.",
    s1Facts: [
      { stat: "49", unit: "maata", text: "alle TFR 1,4:n WPP 2024 -tarkistuksessa — suurin koskaan kirjattu kohortti lähes alimman matalan hedelmällisyyden alapuolella." },
      { stat: "−62 %", unit: "", text: "lasku siittiökonsentraatiossa vuodesta 1973 (Levine ym. 2017/2022; 42 935 miestä, 53 maata)." },
      { stat: "−1 %", unit: "/vuosi", text: "testosteronin lasku länsimaissa, ikävakioitu (Travison ym. 2007; replikoitu useissa populaatioissa)." },
      { stat: "Lajien-", unit: "välinen", text: "rinnakkaistrendi: mehiläisten pesäkuolemat, lintupopulaatioiden laskut ja tuotantoeläinten siemennesteen laadun muutokset seuraavat ihmisen indikaattoreita." },
      { stat: "Kohortti-", unit: "kuvio", text: "WPP 2024 ASFR osoittaa, että nuoremmilla kohorteilla, joilla on suurempi mobiiliteknologia-altistus, hedelmällisyys laskee jyrkemmin kuin vanhemmilla kohorteilla samassa maassa (N = 163; r = −0,67)." },
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

const READINESS_COLORS: Record<string, string> = {
  available: "text-status-confirmed",
  saatavilla: "text-status-confirmed",
  "protocol defined": "text-status-partial",
  "protokolla määritelty": "text-status-partial",
  "no countries yet": "text-status-pending",
  "ei yhtään maata": "text-status-pending",
};

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
      <header className="mb-16 max-w-4xl border-b border-card-border pb-9">
        <p className="editorial-kicker mb-4 text-accent">{d.kicker}</p>
        <h1 className="mb-5 text-5xl sm:text-6xl">{d.hero}</h1>
      </header>

      {/* SECTION 1: Something is happening */}
      <section className="mb-16 border-t editorial-rule pt-6">
        <h2 className="editorial-section-heading mb-4">{d.s1Title}</h2>
        <p className="text-sm text-foreground-muted leading-relaxed mb-8 max-w-4xl">{d.s1Lead}</p>
        <div className="grid grid-cols-1 gap-4 max-w-4xl">
          {d.s1Facts.map((fact) => (
            <article key={fact.text} className="flex gap-4 border-t border-card-border py-4">
              <div className="shrink-0 w-24">
                <span className="font-mono-num text-2xl text-accent leading-none">{fact.stat}</span>
                {fact.unit && <span className="text-xs text-foreground-muted ml-1">{fact.unit}</span>}
              </div>
              <p className="text-sm text-foreground-muted leading-relaxed">{fact.text}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Sentinel cascade compact */}
      <section className="mb-16 max-w-4xl">
        <SentinelCascadeCompact locale={activeLocale} />
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
                <th className="py-3 pr-4 text-right">{activeLocale === "fi" ? "Luottamusväli" : "Sensitivity"}</th>
                <th className="py-3 text-right">{activeLocale === "fi" ? "Versio" : "Version"}</th>
              </tr>
            </thead>
            <tbody>
              {TFR_PREDICTIONS.map((p) => (
                <tr key={p.id} className="border-b border-card-border/50 hover:bg-card-bg/50 transition-colors">
                  <td className="py-3 pr-4 font-medium">{p.countryLabel}</td>
                  <td className="py-3 pr-4 font-mono-num text-foreground-muted">{p.year}</td>
                  <td className="py-3 pr-4 text-right font-mono-num font-semibold text-accent">{p.central.toFixed(2)}</td>
                  <td className="py-3 pr-4 text-right font-mono-num text-foreground-muted">[{p.ciLow.toFixed(2)} – {p.ciHigh.toFixed(2)}]</td>
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
              <div key={item.tier} className="flex items-start gap-4 border-t border-card-border py-3">
                <div className="shrink-0 w-48">
                  <p className="text-sm font-medium">{item.tier}</p>
                  <p className={`text-xs font-mono-num ${READINESS_COLORS[item.status] ?? "text-foreground-muted"}`}>{item.status}</p>
                </div>
                <p className="text-xs text-foreground-muted leading-relaxed">{item.desc}</p>
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

      {/* Navigation links */}
      <section className="flex flex-wrap gap-3 border-t border-card-border pt-6">
        <Link href={`${prefix}/model`} className="inline-flex items-center bg-accent px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-accent-hover">{d.methods}</Link>
        <Link href={`${prefix}/evidence`} className="inline-flex items-center border border-border px-5 py-2.5 text-sm font-medium text-foreground-muted transition-colors hover:text-foreground">{d.evidence}</Link>
        <Link href={`${prefix}/predictions`} className="inline-flex items-center border border-border px-5 py-2.5 text-sm font-medium text-foreground-muted transition-colors hover:text-foreground">{d.predictions}</Link>
        <Link href={`${prefix}/explore`} className="inline-flex items-center border border-border px-5 py-2.5 text-sm font-medium text-foreground-muted transition-colors hover:text-foreground">{d.explore}</Link>
        <Link href={`${prefix}/sentinel`} className="inline-flex items-center border border-border px-5 py-2.5 text-sm font-medium text-foreground-muted transition-colors hover:text-foreground">{d.sentinel}</Link>
        <Link href={`${prefix}/berm-v18`} className="inline-flex items-center border border-border/50 px-5 py-2.5 text-xs font-medium text-foreground-muted/60 transition-colors hover:text-foreground-muted">{d.archive}</Link>
      </section>
    </div>
  );
}
