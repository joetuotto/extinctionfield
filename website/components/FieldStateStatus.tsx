import {
  FIELDSTATE_EVIDENCE_COUNT,
} from "@/lib/fieldstateEvidence";

type Locale = "en" | "fi";
type Status = "TECHNOLOGY_TIMING_PROXY" | "PARTIAL_FIELD_STATE" | "MEASUREMENT_READY_FIELD_STATE";

interface StatusDefinition {
  readonly id: Status;
  readonly title: string;
  readonly description: string;
  readonly use: string;
  readonly tone: "pending" | "partial" | "confirmed";
}

interface Layer {
  readonly index: string;
  readonly title: string;
  readonly description: string;
}

const COPY: Record<Locale, {
  title: string;
  lead: string;
  layersTitle: string;
  statusTitle: string;
  useLabel: string;
  readinessNote: string;
  evidenceNote: string;
  identityTitle: string;
  identityDescription: string;
  identityNote: string;
  cohortTitle: string;
  cohortResult: string;
  cohortDescription: string;
  cohortSource: string;
  layers: readonly Layer[];
  statuses: readonly StatusDefinition[];
}> = {
  en: {
    title: "FieldState–ASFR v2: measurement status",
    lead:
      "The v2 route keeps physical field state, organ transfer, biological capacity and demography distinct. It does not convert technology uptake or mobile subscriptions into a local dose, biological endpoint or TFR coefficient.",
    layersTitle: "Four observable layers",
    statusTitle: "Input completeness is explicit",
    useLabel: "Permitted use",
    readinessNote:
      "Measurement-ready means that all named physical inputs are documented. It does not mean a biological effect, a causal estimate or an outcome coefficient has been established.",
    evidenceNote: `${FIELDSTATE_EVIDENCE_COUNT} bounded study-to-node records support parts of the route. Each remains structural or contextual evidence, never a direct TFR slope.`,
    identityTitle: "ASFR first; TFR is a derived identity",
    identityDescription:
      "The route projects age-specific fertility rates before summing them. Demand/opportunity, tempo and ART/live-birth delivery remain separate inputs rather than hidden biological terms.",
    identityNote:
      "The factor 5 represents five-year age groups (15–19 through 45–49); the equation does not identify any cause of a change in TFR.",
    cohortTitle: "Current cohort signal: timing proxy only",
    cohortResult: "UN WPP 2024 ASFR + World Bank/ITU mobile subscriptions, 2000–2023: N = 163; r = -0.66645.",
    cohortDescription:
      "This is an ecological, descriptive age-cohort timing-proxy result. Mobile subscriptions are not physical FieldState, organ dose or a causal exposure estimate; the result is not a TFR coefficient.",
    cohortSource: "Sources: UN World Population Prospects 2024 ASFR; World Bank/ITU mobile subscriptions.",
    layers: [
      {
        index: "01",
        title: "FieldState and Lindgren selection",
        description:
          "Keep normalised background, ambient and personal vectors separate, with B0, phase/coherence and envelope or beat PSD retained rather than collapsed into one national scalar.",
      },
      {
        index: "02",
        title: "Organ-local transfer and memory",
        description:
          "An explicit organ transfer Tₒ, receptor state and circadian context feed organ-specific reversible (R) and persistent (P) states. Registered evidence and parameter IDs are required for increments.",
      },
      {
        index: "03",
        title: "Reproductive capacity and the couple",
        description:
          "Male, female, barrier and implantation components remain separate before they are combined as a paired conception/live-birth capacity. No national average is silently treated as a couple state.",
      },
      {
        index: "04",
        title: "Age-specific fertility and demographic terms",
        description:
          "The biological ratio, demand/opportunity, tempo and ART/live-birth delivery ratios are reported separately for each age group before TFR is derived.",
      },
    ],
    statuses: [
      {
        id: "TECHNOLOGY_TIMING_PROXY",
        title: "Technology-timing proxy",
        description:
          "A national technology series can describe the timing of digital-environment diffusion. It is distinct from a locally measured FieldState and organ transfer.",
        use: "Descriptive timing and cohort-signature analysis only; never local dose or endpoint calibration.",
        tone: "pending",
      },
      {
        id: "PARTIAL_FIELD_STATE",
        title: "Partial FieldState",
        description:
          "Some physical components are measured, but one or more required inputs are absent: normalisation calibration, B0 vector, organ transfer, envelope/beat PSD, circadian context, phase/coherence or provenance.",
        use: "Diagnostic data-gap reporting and protocol development; not endpoint calibration.",
        tone: "partial",
      },
      {
        id: "MEASUREMENT_READY_FIELD_STATE",
        title: "Measurement-ready FieldState",
        description:
          "All named physical inputs are documented: calibration, measured B0 vector, non-identity organ transfer, PSD, circadian context, phase/coherence and measurement provenance.",
        use: "Eligible for organ-endpoint calibration only when an endpoint join and pre-specified mapping are also present.",
        tone: "confirmed",
      },
    ],
  },
  fi: {
    title: "FieldState–ASFR v2: mittaustila",
    lead:
      "V2-reitti pitää fysikaalisen kenttätilan, elinsiirron, biologisen kapasiteetin ja demografian erillisinä. Se ei muunna teknologian käyttöönottoa tai mobiililiittymiä paikalliseksi annokseksi, biologiseksi päätepisteeksi tai TFR-kertoimeksi.",
    layersTitle: "Neljä havaittavaa kerrosta",
    statusTitle: "Syötteen täydellisyys ilmoitetaan eksplisiittisesti",
    useLabel: "Sallittu käyttö",
    readinessNote:
      "Mittaamisvalmis tarkoittaa, että kaikki nimetyt fysikaaliset syötteet on dokumentoitu. Se ei tarkoita, että biologinen vaikutus, kausaaliarvio tai tuloskerroin olisi osoitettu.",
    evidenceNote: `${FIELDSTATE_EVIDENCE_COUNT} rajattua tutkimus–solmu-tietuetta tukee reitin osia. Jokainen on rakenteellista tai kontekstuaalista evidenssiä, ei suora TFR-kulmakerroin.`,
    identityTitle: "ASFR ensin; TFR on johdettu identiteetti",
    identityDescription:
      "Reitti projisoi ensin ikäkohtaiset hedelmällisyysluvut ja summaa ne vasta sitten. Kysyntä/mahdollisuus, tempo ja ART/live-birth-delivery säilyvät erillisinä syötteinä eivätkä piiloudu biologisiksi termeiksi.",
    identityNote:
      "Kerroin 5 kuvaa viisivuotisikäryhmiä (15–19 … 45–49); yhtälö ei tunnista TFR-muutoksen syytä.",
    cohortTitle: "Nykyinen kohorttisignaali: vain ajoitusproxy",
    cohortResult: "UN WPP 2024 ASFR + World Bank/ITU:n mobiililiittymät, 2000–2023: N = 163; r = -0.66645.",
    cohortDescription:
      "Tulos on ekologinen, kuvaileva ikäkohortin ajoitusproxyn tulos. Mobiililiittymät eivät ole fyysinen FieldState, elinannos tai kausaalinen altistusarvio; tulos ei ole TFR-kerroin.",
    cohortSource: "Lähteet: UN World Population Prospects 2024 ASFR; World Bank/ITU:n mobiililiittymät.",
    layers: [
      {
        index: "01",
        title: "FieldState ja Lindgren-valinta",
        description:
          "Säilytä normalisoidut tausta-, ambient- ja henkilökohtaiset vektorit erillään sekä B0, vaihe/koherenssi ja verhokäyrän tai beat-signaalin PSD; niitä ei tiivistetä yhdeksi kansalliseksi skalaariksi.",
      },
      {
        index: "02",
        title: "Elinkohtainen siirto ja muisti",
        description:
          "Eksplisiittinen elinsiirto Tₒ, reseptoritila ja vuorokausikonteksti syöttävät elinkohtaisia palautuvia (R) ja persistenttejä (P) tiloja. Incrementit vaativat rekisteröidyn evidenssin ja parametri-ID:n.",
      },
      {
        index: "03",
        title: "Reproduktiivinen kapasiteetti ja pari",
        description:
          "Mies-, nais-, este- ja implantaatio-osat pysyvät erillään ennen niiden yhdistämistä parin conception/live-birth-kapasiteetiksi. Kansallista keskiarvoa ei käsitellä hiljaisesti paritilana.",
      },
      {
        index: "04",
        title: "Ikäkohtainen hedelmällisyys ja demografiset termit",
        description:
          "Biologinen suhde, kysyntä/mahdollisuus, tempo sekä ART/live-birth-delivery-suhteet raportoidaan ikäryhmittäin ennen kuin TFR johdetaan.",
      },
    ],
    statuses: [
      {
        id: "TECHNOLOGY_TIMING_PROXY",
        title: "Teknologian ajoitusproxy",
        description:
          "Kansallinen teknologiasarja voi kuvata digitaalisen ympäristön leviämisen ajoitusta. Se on eri asia kuin paikallisesti mitattu FieldState ja elinsiirto.",
        use: "Vain kuvailevaan ajoitus- ja kohorttisignaalin analyysiin; ei paikalliseksi annokseksi eikä päätepistekalibrointiin.",
        tone: "pending",
      },
      {
        id: "PARTIAL_FIELD_STATE",
        title: "Osittainen FieldState",
        description:
          "Osa fysikaalisista komponenteista on mitattu, mutta yksi tai useampi vaadittu syöte puuttuu: normalisointikalibrointi, B0-vektori, elinsiirto, verhokäyrä-/beat-PSD, vuorokausikonteksti, vaihe/koherenssi tai provenienssi.",
        use: "Diagnostiseen data-aukkoraportointiin ja protokollan kehittämiseen; ei päätepistekalibrointiin.",
        tone: "partial",
      },
      {
        id: "MEASUREMENT_READY_FIELD_STATE",
        title: "Mittaamisvalmis FieldState",
        description:
          "Kaikki nimetyt fysikaaliset syötteet on dokumentoitu: kalibrointi, mitattu B0-vektori, ei-identtinen elinsiirto, PSD, vuorokausikonteksti, vaihe/koherenssi ja mittausprovenienssi.",
        use: "Sopii elinpäätepisteen kalibrointiin vain, kun mukana ovat myös endpoint-join ja ennalta määritelty mapping.",
        tone: "confirmed",
      },
    ],
  },
};

function statusClasses(tone: StatusDefinition["tone"]) {
  switch (tone) {
    case "partial":
      return "border-status-partial";
    case "confirmed":
      return "border-status-confirmed";
    default:
      return "border-status-pending";
  }
}

/**
 * A static, locale-aware status card for the FieldState–ASFR v2 input
 * contract. It intentionally displays no numerical FieldState → TFR result.
 */
export function FieldStateStatus({ locale }: { locale: string }) {
  const language: Locale = locale === "fi" ? "fi" : "en";
  const d = COPY[language];

  return (
    <section className="mb-12 border-y border-card-border py-7 sm:py-9">
      <header className="max-w-4xl">
        <p className="editorial-kicker text-accent">FieldState–ASFR v2</p>
        <h2 className="editorial-section-heading mt-2">{d.title}</h2>
        <p className="editorial-deck mt-3">{d.lead}</p>
      </header>

      <section className="mt-8 border-t border-card-border pt-5" aria-labelledby="fieldstate-layers-title">
        <h3 id="fieldstate-layers-title" className="editorial-kicker text-foreground">{d.layersTitle}</h3>
        <ol className="mt-4 grid gap-x-7 gap-y-5 lg:grid-cols-2">
          {d.layers.map((layer) => (
            <li key={layer.index} className="border-t border-card-border pt-4">
              <div className="flex gap-4">
                <span className="font-mono-num text-xs text-accent">{layer.index}</span>
                <div>
                  <h4 className="text-sm font-medium">{layer.title}</h4>
                  <p className="mt-1 text-sm leading-relaxed text-foreground-muted">{layer.description}</p>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-9 border-t border-card-border pt-5" aria-labelledby="fieldstate-completeness-title">
        <h3 id="fieldstate-completeness-title" className="editorial-kicker text-foreground">{d.statusTitle}</h3>
        <div className="mt-4 grid gap-x-7 gap-y-6 lg:grid-cols-3">
          {d.statuses.map((status) => (
            <article key={status.id} className={`border-l-2 pl-4 ${statusClasses(status.tone)}`}>
              <h4 className="text-sm font-semibold text-foreground">{status.title}</h4>
              <p className="mt-2 text-sm leading-relaxed text-foreground-muted">{status.description}</p>
              <div className="mt-4 border-t border-card-border pt-3 text-xs leading-relaxed text-foreground-muted">
                <span className="font-medium text-foreground">{d.useLabel}: </span>{status.use}
              </div>
            </article>
          ))}
        </div>
        <div className="editorial-rail mt-6 max-w-4xl text-xs leading-relaxed text-foreground-muted">
          <p>{d.readinessNote}</p>
          <p className="mt-2">{d.evidenceNote}</p>
        </div>
      </section>

      <section className="mt-9 grid gap-7 border-t border-card-border pt-5 lg:grid-cols-[1.1fr_0.9fr] lg:divide-x lg:divide-card-border">
        <article className="lg:pr-7">
          <h3 className="font-serif text-[1.1rem] font-semibold leading-snug tracking-[-0.014em]">{d.identityTitle}</h3>
          <p className="mt-2 text-sm leading-relaxed text-foreground-muted">{d.identityDescription}</p>
          <p className="mt-4 overflow-x-auto border-y border-card-border px-3 py-3 font-mono-num text-sm text-foreground">
            TFR₍c,t₎ = (5 / 1000) × Σ₍g=15–19…45–49₎ ASFR₍c,g,t₎
          </p>
          <p className="mt-2 text-xs leading-relaxed text-foreground-muted">{d.identityNote}</p>
        </article>

        <article className="border-l-2 border-status-partial pl-4 lg:pl-7">
          <h3 className="font-serif text-[1.1rem] font-semibold leading-snug tracking-[-0.014em]">{d.cohortTitle}</h3>
          <p className="mt-3 font-mono-num text-sm font-semibold text-foreground">{d.cohortResult}</p>
          <p className="mt-2 text-sm leading-relaxed text-foreground-muted">{d.cohortDescription}</p>
          <p className="mt-3 text-xs leading-relaxed text-foreground-muted">{d.cohortSource}</p>
        </article>
      </section>
    </section>
  );
}
