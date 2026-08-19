import Link from "next/link";
import CausalChain from "@/components/CausalChain";
import { FieldStateStatus } from "@/components/FieldStateStatus";
import { WorldMap } from "@/components/WorldMap";
import type { Locale } from "@/lib/i18n";
import {
  FIELDSTATE_EVIDENCE_COUNT,
  LEGACY_EVIDENCE_MIGRATION,
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
    evidenceCountNote: `Each record states its field class, directness, translation scope and limitation. A further ${LEGACY_EVIDENCE_MIGRATION.recordCount}-record bibliography is preserved in a source-qualified migration layer.`,
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
    archive: "Archived v17 scenario registry",
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
    evidenceCountNote: `Jokainen tietue kertoo kenttäluokan, suoruuden, tulkintarajan ja rajoituksen. Lisäksi ${LEGACY_EVIDENCE_MIGRATION.recordCount} tietueen bibliografia säilyy lähdekohtaisessa siirtokerroksessa.`,
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
    archive: "Arkistoitu v17-skenaariorekisteri",
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

  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <header className="mb-12 max-w-4xl">
        <p className="text-xs uppercase tracking-[0.18em] text-accent font-semibold mb-3">FieldState–ASFR v2</p>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">{d.hero}</h1>
        <p className="text-lg md:text-xl text-foreground-muted leading-relaxed">{d.lead}</p>
      </header>

      <section className="mb-16">
        <h2 className="text-2xl font-bold tracking-tight mb-5">{d.scopeTitle}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {d.scope.map((item, index) => (
            <div key={item} className="border border-card-border bg-card-bg rounded-lg p-5">
              <p className="font-mono-num text-xs text-accent mb-3">0{index + 1}</p>
              <p className="text-sm text-foreground-muted leading-relaxed">{item}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-16">
        <FieldStateStatus locale={activeLocale} />
      </section>

      <section className="mb-16">
        <h2 className="text-2xl font-bold tracking-tight mb-3">{d.mapTitle}</h2>
        <p className="text-sm text-foreground-muted max-w-3xl mb-5 leading-relaxed">{d.mapLead}</p>
        <div className="border border-card-border bg-card-bg rounded-lg overflow-hidden min-h-[320px]">
          <WorldMap locale={activeLocale} />
        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-2xl font-bold tracking-tight mb-3">{d.evidenceTitle}</h2>
        <p className="text-sm text-foreground-muted max-w-3xl mb-5 leading-relaxed">{d.evidenceLead}</p>
        <div className="border border-card-border bg-card-bg rounded-lg p-4 md:p-6 overflow-x-auto">
          <CausalChain locale={activeLocale} />
        </div>
        <Link href={`${prefix}/references`} className="block mt-4 border border-accent/20 bg-accent/5 hover:bg-accent/10 rounded-lg px-5 py-4 transition-colors">
          <p className="font-semibold">{d.evidenceCount}</p>
          <p className="text-sm text-foreground-muted mt-1">{d.evidenceCountNote}</p>
        </Link>
      </section>

      <section className="mb-16 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="border border-card-border bg-card-bg rounded-lg p-6">
          <h2 className="text-xl font-bold tracking-tight mb-3">{d.cohortTitle}</h2>
          <p className="text-sm text-foreground-muted leading-relaxed">{d.cohortLead}</p>
        </div>
        <div className="border border-card-border bg-card-bg rounded-lg p-6">
          <h2 className="text-xl font-bold tracking-tight mb-3">{d.nextTitle}</h2>
          <ol className="space-y-3">
            {d.next.map((item, index) => <li key={item} className="flex gap-3 text-sm text-foreground-muted leading-relaxed"><span className="font-mono-num text-accent">{index + 1}.</span>{item}</li>)}
          </ol>
        </div>
      </section>

      <section className="flex flex-wrap gap-3">
        <Link href={`${prefix}/model`} className="inline-flex items-center px-5 py-2.5 bg-accent hover:bg-accent-hover text-white text-sm font-medium rounded-lg transition-colors">{d.methods}</Link>
        <Link href={`${prefix}/evidence`} className="inline-flex items-center px-5 py-2.5 border border-border text-foreground-muted hover:text-foreground text-sm font-medium rounded-lg transition-colors">{d.evidence}</Link>
        <Link href={`${prefix}/data`} className="inline-flex items-center px-5 py-2.5 border border-border text-foreground-muted hover:text-foreground text-sm font-medium rounded-lg transition-colors">{d.data}</Link>
        <Link href={`${prefix}/predictions`} className="inline-flex items-center px-5 py-2.5 border border-border text-foreground-muted hover:text-foreground text-sm font-medium rounded-lg transition-colors">{d.archive}</Link>
      </section>
    </div>
  );
}
