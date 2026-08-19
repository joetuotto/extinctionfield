import Link from "next/link";
import CausalChain from "@/components/CausalChain";
import { FieldStateStatus } from "@/components/FieldStateStatus";
import { WorldMap } from "@/components/WorldMap";
import type { Locale } from "@/lib/i18n";
import {
  FIELDSTATE_EVIDENCE_COUNT,
} from "@/lib/fieldstateEvidence";

const COPY = {
  en: {
    hero: "Extinction Field",
    lead: "BERM is a measurement-aware research model for testing whether specific electromagnetic field states contribute to components of reproductive capacity and, through age-specific fertility, to period fertility trends.",
    scopeTitle: "What the model does — and does not yet do",
    scope: [
      "It separates a physical FieldState from organ-local transfer, biological endpoints, the couple and demographic terms. A national technology series is not treated as an EMF dose.",
      "It treats Lindgren-derived background, vector, geometry and timing effects as testable upstream hypotheses. They are not population-effect estimates.",
      "It does not presently publish FieldState–ASFR-v2 country TFR forecasts: matched local field, biological-endpoint and couple panels are still required.",
    ],
    mapTitle: "Published fertility series and technology timing",
    mapLead: "The map displays the published World Bank WDI TFR series and mobile subscriptions. The latter is a digital-technology timing proxy, not an EMF exposure or dose layer. The separate v2 demographic route uses WPP ASFR with its own provenance.",
    evidenceTitle: "A causal route with bounded evidence",
    evidenceLead: "The active route is FieldState → named intermediate and organ states → paired capacity, alongside explicit demand/tempo/ART inputs → ASFR → TFR. Studies support distinct links and endpoints; none of the current records is a TFR coefficient.",
    evidenceCount: `${FIELDSTATE_EVIDENCE_COUNT} bounded study-to-node records`,
    evidenceCountNote: "Each record states its field class, directness, translation scope and limitation. The evidence register provides the corresponding source detail.",
    cohortTitle: "A cohort-pattern result worth testing",
    cohortLead: "WPP 2024 ASFR paired with World Bank/ITU subscriptions shows a versioned, reproducible descriptive young-versus-older cohort timing pattern (N = 163; r = −0.66645 for 2000–2023). It motivates a future preregistered FieldState study; it is neither a physical exposure estimate nor a causal result.",
    nextTitle: "Current research priorities",
    next: [
      "Build reproducible FieldState panels: B₀ vector, spectrum/PSD, local geometry, circadian context and measurement provenance.",
      "Join those panels to registered male, female and barrier endpoints before estimating an organ response.",
      "Model ASFR first, retaining demand, tempo, ART and partner/household covariance; derive TFR only afterwards.",
    ],
    methods: "Model specification",
    evidence: "Evidence register",
    data: "Data and measurement status",
    archive: "Research archive",
  },
  fi: {
    hero: "Extinction Field",
    lead: "BERM on mittaustietoinen tutkimusmalli, jolla testataan, voivatko tietyt sähkömagneettiset kenttätilat vaikuttaa lisääntymiskyvyn osiin ja ikäryhmäkohtaisen hedelmällisyyden kautta periodihedelmällisyyteen.",
    scopeTitle: "Mitä malli tekee — ja mitä se ei vielä tee",
    scope: [
      "Se erottaa fysikaalisen FieldState-tilan, elinkohtaisen siirron, biologiset päätepisteet, parin ja demografiset tekijät. Kansallista teknologiasarjaa ei käsitellä EMF-annoksena.",
      "Lindgrenistä johdetut tausta-, vektori-, geometria- ja ajoitusvaikutukset ovat testattavia upstream-hypoteeseja, eivät väestövaikutuksen estimaatteja.",
      "Malli ei toistaiseksi julkaise FieldState–ASFR-v2-maakohtaisia TFR-ennusteita: tarvitaan vielä yhteen sovitettuja paikallisia kenttä-, biologisia päätepiste- ja paripaneeleja.",
    ],
    mapTitle: "Julkaistu hedelmällisyyssarja ja teknologian ajoitus",
    mapLead: "Kartta näyttää Maailmanpankin WDI:n julkaistun TFR-sarjan ja mobiililiittymät. Jälkimmäinen on digitaalisen teknologian ajoitusproksi, ei EMF-altistus- tai annoskerros. V2:n erillinen demografinen reitti käyttää WPP:n ASFR:ää omalla provenienssillaan.",
    evidenceTitle: "Kausaalireitti ja rajattu evidenssi",
    evidenceLead: "Aktiivinen reitti on FieldState → nimetyt välitilat ja elinkohtaiset tilat → parikapasiteetti sekä eksplisiittiset kysyntä-/tempo-/ART-syötteet → ASFR → TFR. Tutkimukset tukevat erillisiä linkkejä ja päätepisteitä; mikään nykyisistä tietueista ei ole TFR-kerroin.",
    evidenceCount: `${FIELDSTATE_EVIDENCE_COUNT} rajattua tutkimus–solmu-tietuetta`,
    evidenceCountNote: "Jokainen tietue kertoo kenttäluokan, suoruuden, tulkintarajan ja rajoituksen. Evidenssirekisteri tarjoaa vastaavat lähdetiedot.",
    cohortTitle: "Testaamisen arvoinen kohorttikuvio",
    cohortLead: "WPP 2024:n ASFR yhdessä Maailmanpankin/ITU:n mobiililiittymien kanssa näyttää versionoidun, toistettavan kuvailevan nuorten ja vanhempien kohorttien ajoituskuvion (N = 163; r = −0,66645 vuosina 2000–2023). Se motivoi tulevaa ennakkorekisteröityä FieldState-tutkimusta; se ei ole fysikaalinen altistusarvio eikä kausaalitulos.",
    nextTitle: "Tutkimuksen nykyiset prioriteetit",
    next: [
      "Rakennetaan toistettavat FieldState-paneelit: B₀-vektori, spektri/PSD, paikallinen geometria, vuorokausikonteksti ja mittausprovenienssi.",
      "Yhdistetään paneelit rekisteröityihin mies-, nais- ja este-päätepisteisiin ennen elinvasteen estimointia.",
      "Mallinnetaan ensin ASFR, säilyttäen kysyntä, tempo, ART sekä puoliso-/kotitalouskovarianssi; TFR johdetaan vasta sen jälkeen.",
    ],
    methods: "Mallin määrittely",
    evidence: "Evidenssirekisteri",
    data: "Data ja mittaustila",
    archive: "Tutkimusarkisto",
  },
} as const;

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const activeLocale: Locale = locale === "fi" ? "fi" : "en";
  const d = COPY[activeLocale];
  const prefix = `/${activeLocale}`;
  const figureLabels = activeLocale === "fi"
    ? { map: "KUVIO 01 · JULKAISTU AIKASARJA", causal: "KUVIO 02 · REKISTERÖITY KAUSAALIREITTI" }
    : { map: "FIGURE 01 · PUBLISHED TIME SERIES", causal: "FIGURE 02 · REGISTERED CAUSAL ROUTE" };

  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <header className="mb-16 max-w-4xl border-b border-card-border pb-9">
        <p className="editorial-kicker mb-4 text-accent">FieldState–ASFR v2</p>
        <h1 className="mb-5 text-5xl sm:text-6xl">{d.hero}</h1>
        <p className="editorial-deck text-[1.08rem] sm:text-[1.14rem]">{d.lead}</p>
      </header>

      <section className="mb-16 border-t editorial-rule pt-6">
        <h2 className="editorial-section-heading mb-6">{d.scopeTitle}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 md:divide-x md:divide-card-border">
          {d.scope.map((item, index) => (
            <article key={item} className="border-t border-card-border py-5 md:border-t-0 md:px-5 first:md:pl-0 last:md:pr-0">
              <p className="font-mono-num text-xs text-accent mb-3">0{index + 1}</p>
              <p className="text-sm text-foreground-muted leading-relaxed">{item}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mb-16">
        <FieldStateStatus locale={activeLocale} />
      </section>

      <section className="mb-16 border-t editorial-rule pt-6">
        <figure className="data-figure overflow-hidden">
          <figcaption className="data-figure__caption">
            <p className="editorial-kicker text-accent">{figureLabels.map}</p>
            <p className="data-figure__title mt-1">{d.mapTitle}</p>
          </figcaption>
          <WorldMap locale={activeLocale} />
          <p className="data-figure__note">{d.mapLead}</p>
        </figure>
      </section>

      <section className="mb-16 border-t editorial-rule pt-6">
        <figure className="data-figure overflow-hidden">
          <figcaption className="data-figure__caption">
            <p className="editorial-kicker text-accent">{figureLabels.causal}</p>
            <p className="data-figure__title mt-1">{d.evidenceTitle}</p>
          </figcaption>
          <div className="overflow-x-auto p-1 md:p-3">
          <CausalChain locale={activeLocale} />
          </div>
          <p className="data-figure__note">{d.evidenceLead}</p>
        </figure>
        <Link href={`${prefix}/references`} className="editorial-rail mt-5 block py-1 transition-colors hover:text-accent">
          <p className="font-semibold text-foreground">{d.evidenceCount}</p>
          <p className="text-sm text-foreground-muted mt-1">{d.evidenceCountNote}</p>
        </Link>
      </section>

      <section className="mb-16 grid grid-cols-1 gap-8 border-t editorial-rule pt-6 lg:grid-cols-2 lg:divide-x lg:divide-card-border">
        <article className="lg:pr-8">
          <h2 className="editorial-section-heading mb-4">{d.cohortTitle}</h2>
          <p className="text-sm text-foreground-muted leading-relaxed">{d.cohortLead}</p>
        </article>
        <article className="lg:pl-8">
          <h2 className="editorial-section-heading mb-4">{d.nextTitle}</h2>
          <ol className="space-y-3">
            {d.next.map((item, index) => <li key={item} className="flex gap-3 text-sm text-foreground-muted leading-relaxed"><span className="font-mono-num text-accent">{index + 1}.</span>{item}</li>)}
          </ol>
        </article>
      </section>

      <section className="flex flex-wrap gap-3 border-t border-card-border pt-6">
        <Link href={`${prefix}/model`} className="inline-flex items-center bg-accent px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-accent-hover">{d.methods}</Link>
        <Link href={`${prefix}/evidence`} className="inline-flex items-center border border-border px-5 py-2.5 text-sm font-medium text-foreground-muted transition-colors hover:text-foreground">{d.evidence}</Link>
        <Link href={`${prefix}/data`} className="inline-flex items-center border border-border px-5 py-2.5 text-sm font-medium text-foreground-muted transition-colors hover:text-foreground">{d.data}</Link>
        <Link href={`${prefix}/predictions`} className="inline-flex items-center border border-border px-5 py-2.5 text-sm font-medium text-foreground-muted transition-colors hover:text-foreground">{d.archive}</Link>
      </section>
    </div>
  );
}
