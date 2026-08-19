type Locale = "en" | "fi";

type VisualStep = {
  eyebrow: string;
  title: string;
  detail: string;
  formula: string;
  tone: "observed" | "hypothesis";
};

const COPY: Record<
  Locale,
  {
    modelKicker: string;
    modelTitle: string;
    modelLead: string;
    observed: string;
    hypothesis: string;
    steps: readonly VisualStep[];
    keyKicker: string;
    keyTitle: string;
    keyLead: string;
    fields: readonly { label: string; value: string; endpoint: string; scope: string }[];
    tickKicker: string;
    tickTitle: string;
    tickLead: string;
    direct: string;
    directSource: string;
    open: string;
    directText: string;
    openText: string;
    boundaryLabel: string;
    boundaryText: string;
    systemsKicker: string;
    systemsLabel: string;
  }
> = {
  en: {
    modelKicker: "Causal reading guide",
    modelTitle: "One FieldState; different biological transfer functions",
    modelLead:
      "Read the model from left to right. The physical configuration is shared; sensing, transport and physiological transfer are species- and stage-specific. Solid steps summarize measured premises. The amber sequence is the explicitly testable ecological and evolutionary extension.",
    observed: "Measured premise",
    hypothesis: "Model-derived; test",
    steps: [
      {
        eyebrow: "01 · PHYSICAL INPUT",
        title: "FieldState",
        detail: "A configuration, not one generic dose: components, spectrum, geometry, reference and time.",
        formula: "E · B · Q · t",
        tone: "observed",
      },
      {
        eyebrow: "02 · SPECIES TRANSFER",
        title: "Different organisms read it differently",
        detail: "Morphology, sensory organs, size, hydration, life stage and habitat shape the local response.",
        formula: "Rᵢ = Hᵢ(FieldState)",
        tone: "observed",
      },
      {
        eyebrow: "03 · ECOLOGICAL EVENT",
        title: "Encounter, route or dispersal",
        detail: "The proximal endpoint can be a visit, attachment, navigation choice or colonisation event.",
        formula: "kᵢⱼ",
        tone: "observed",
      },
      {
        eyebrow: "04 · RELATIVE OUTCOME",
        title: "Ecological sorting",
        detail: "The relevant contrast is a relative change in realised fitness, not a claim of uniform sensitivity.",
        formula: "Wᵢ / Wⱼ",
        tone: "hypothesis",
      },
      {
        eyebrow: "05 · GENERATIONAL TEST",
        title: "Selection / evolution",
        detail: "Only repeated fitness differences acting on inherited variation can change a trait distribution.",
        formula: "P₍g+1₎(θ)",
        tone: "hypothesis",
      },
    ],
    keyKicker: "FieldState signature ledger",
    keyTitle: "A FieldState has several non-interchangeable signatures",
    keyLead:
      "The ledger prevents category errors: an observation in one field class is not silently reused as evidence in another.",
    fields: [
      { label: "Static interface", value: "E_DC · Q · ∇|E|²", endpoint: "force / attachment", scope: "physical transport" },
      { label: "ELF waveform", value: "E_AC(f) · B(f) · dE/dt", endpoint: "landing / behaviour", scope: "matched endpoint" },
      { label: "Geomagnetic cue", value: "B₀ · inclination · light", endpoint: "orientation", scope: "context-dependent signal" },
      { label: "RF signature", value: "S(f, polarisation, time)", endpoint: "frequency window", scope: "spectrum-specific result" },
    ],
    tickKicker: "Evidence boundary · Ixodes / host interface",
    tickTitle: "What the tick experiment establishes — and what it does not",
    tickLead:
      "The direct result concerns a local, static host–vegetation interface. It must remain within that field class and endpoint; relative robustness and selection require their own measurements.",
    direct: "Observed physical result",
    directSource: "England, Lihou & Robert (2023)",
    open: "Derived / testable extension",
    directText: "Calibrated static fields can alter short-range attraction and attachment in the tested tick system.",
    openText: "Compare response curves, feeding success and inherited traits across species and life stages under the same FieldState.",
    boundaryLabel: "Reading rule",
    boundaryText: "Static transport evidence is not interchangeable with RF/ELF response or population change.",
    systemsKicker: "Organism systems",
    systemsLabel: "Pollinator · tick / parasite · migrant · disperser",
  },
  fi: {
    modelKicker: "Kausaalinen lukutapa",
    modelTitle: "Yksi FieldState; erilaiset biologiset siirtofunktiot",
    modelLead:
      "Lue malli vasemmalta oikealle. Fysikaalinen konfiguraatio on yhteinen, mutta aistiminen, kuljetus ja fysiologinen siirto ovat laji- ja elinvaihekohtaisia. Yhtenäiset vaiheet tiivistävät mitatut premissit. Meripihkanvärinen jatko on eksplisiittisesti testattava ekologinen ja evolutiivinen laajennus.",
    observed: "Mitattu premissi",
    hypothesis: "Mallista johdettu; testattava",
    steps: [
      {
        eyebrow: "01 · FYSIKAALINEN SYÖTE",
        title: "FieldState",
        detail: "Konfiguraatio, ei yksi yleinen annos: komponentit, spektri, geometria, referenssi ja aika.",
        formula: "E · B · Q · t",
        tone: "observed",
      },
      {
        eyebrow: "02 · LAJIKOHTAINEN SIIRTO",
        title: "Eri eliöt lukevat sen eri tavoin",
        detail: "Morfologia, aistielimet, koko, kosteus, elinvaihe ja elinympäristö muovaavat paikallista vastetta.",
        formula: "Rᵢ = Hᵢ(FieldState)",
        tone: "observed",
      },
      {
        eyebrow: "03 · EKOLOGINEN TAPAHTUMA",
        title: "Kohtaaminen, reitti tai dispersaali",
        detail: "Läheinen päätepiste voi olla käynti, kiinnittyminen, navigointivalinta tai kolonisaatiotapahtuma.",
        formula: "kᵢⱼ",
        tone: "observed",
      },
      {
        eyebrow: "04 · SUHTEELLINEN TULOS",
        title: "Ekologinen lajittuminen",
        detail: "Olennainen kontrasti on muutos toteutuneessa suhteellisessa kelpoisuudessa, ei väite tasaisesta herkkyydestä.",
        formula: "Wᵢ / Wⱼ",
        tone: "hypothesis",
      },
      {
        eyebrow: "05 · SUKUPOLVITESTI",
        title: "Valinta / evoluutio",
        detail: "Vain periytyvään vaihteluun kohdistuva, toistuva kelpoisuusero voi muuttaa piirteen jakaumaa.",
        formula: "P₍g+1₎(θ)",
        tone: "hypothesis",
      },
    ],
    keyKicker: "FieldState-allekirjoitusten luettelo",
    keyTitle: "FieldStatella on useita ei-vaihdettavia allekirjoituksia",
    keyLead:
      "Luettelo estää luokkavirheen: yhdessä kenttäluokassa tehtyä havaintoa ei käytetä hiljaisesti toisen kenttäluokan näyttönä.",
    fields: [
      { label: "Staattinen rajapinta", value: "E_DC · Q · ∇|E|²", endpoint: "voima / kiinnittyminen", scope: "fysikaalinen kuljetus" },
      { label: "ELF-aaltomuoto", value: "E_AC(f) · B(f) · dE/dt", endpoint: "laskeutuminen / käyttäytyminen", scope: "vastaava päätepiste" },
      { label: "Geomagneettinen vihje", value: "B₀ · inklinaatio · valo", endpoint: "orientaatio", scope: "kontekstiriippuvainen signaali" },
      { label: "RF-allekirjoitus", value: "S(f, polarisaatio, aika)", endpoint: "taajuusikkuna", scope: "spektrispesifi tulos" },
    ],
    tickKicker: "Näyttörajaus · Ixodes / isäntärajapinta",
    tickTitle: "Mitä punkkikoe osoittaa — ja mitä se ei osoita",
    tickLead:
      "Suora tulos koskee paikallista staattista isäntä–kasvillisuusrajapintaa. Se kuuluu tähän kenttäluokkaan ja päätepisteeseen; suhteellinen robustius ja valinta vaativat omat mittauksensa.",
    direct: "Havaittu fysikaalinen tulos",
    directSource: "England, Lihou & Robert (2023)",
    open: "Johdettu / testattava laajennus",
    directText: "Kalibroidut staattiset kentät voivat muuttaa lyhyen matkan vetoa ja kiinnittymistä tutkitussa punkkijärjestelmässä.",
    openText: "Vertaile vastekäyriä, ruokintamenestystä ja periytyviä piirteitä lajien ja elinvaiheiden välillä samassa FieldStatessa.",
    boundaryLabel: "Lukusääntö",
    boundaryText: "Staattisen kuljetuksen näyttö ei ole vaihdettavissa RF/ELF-vasteeseen tai populaatiomuutokseen.",
    systemsKicker: "Eliöjärjestelmät",
    systemsLabel: "Pölyttäjä · punkki / loinen · muuttaja · dispersoituja",
  },
};

export function EcoCausalVisuals({ locale }: { locale: Locale }) {
  const d = COPY[locale];

  return (
    <section aria-labelledby="eco-causal-visual-title" className="mt-10 border-y border-card-border py-8 sm:py-10">
      <header className="max-w-4xl">
        <p className="editorial-kicker text-accent">{d.modelKicker}</p>
        <h2 id="eco-causal-visual-title" className="editorial-section-heading mt-3 text-[clamp(1.75rem,1.35rem+1vw,2.35rem)]">
          {d.modelTitle}
        </h2>
        <p className="editorial-deck mt-4">{d.modelLead}</p>
      </header>

      <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3 border-y border-card-border py-3 text-xs text-foreground-muted" aria-label={d.modelKicker}>
        <span className="inline-flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-status-confirmed" aria-hidden="true" />
          {d.observed}
        </span>
        <span className="inline-flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-status-partial" aria-hidden="true" />
          {d.hypothesis}
        </span>
      </div>

      <ol className="mt-7 grid gap-x-5 gap-y-7 sm:grid-cols-2 xl:grid-cols-5" aria-label={d.modelTitle}>
        {d.steps.map((step) => {
          const isObserved = step.tone === "observed";
          return (
            <li key={step.eyebrow} className="min-w-0 border-t border-card-border pt-4">
              <article className="flex h-full flex-col">
                <p className={`editorial-kicker ${isObserved ? "text-status-confirmed" : "text-status-partial"}`}>
                  {isObserved ? d.observed : d.hypothesis}
                </p>
                <p className="mt-2 font-mono-num text-[10px] font-semibold tracking-[0.12em] text-foreground-muted">{step.eyebrow}</p>
                <h3 className="mt-3 font-serif text-[1.05rem] font-semibold leading-snug tracking-[-0.012em] text-foreground">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-foreground-muted">{step.detail}</p>
                <p className={`mt-4 border-t border-card-border pt-3 font-mono-num text-xs ${isObserved ? "text-status-confirmed" : "text-status-partial"}`}>
                  {step.formula}
                </p>
              </article>
            </li>
          );
        })}
      </ol>

      <section aria-labelledby="fieldstate-signatures-title" className="mt-10 border-t border-card-border pt-7">
        <header className="max-w-4xl">
          <p className="editorial-kicker">{d.keyKicker}</p>
          <h3 id="fieldstate-signatures-title" className="mt-2 font-serif text-[1.25rem] font-semibold leading-tight tracking-[-0.016em] text-foreground">
            {d.keyTitle}
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-foreground-muted">{d.keyLead}</p>
        </header>
        <dl className="mt-5 grid gap-x-5 gap-y-4 sm:grid-cols-2 xl:grid-cols-4">
          {d.fields.map((field, index) => (
            <div key={field.label} className="border-t border-card-border pt-3">
              <dt className="flex items-baseline gap-2">
                <span className="font-mono-num text-[10px] font-semibold text-accent">0{index + 1}</span>
                <span className="text-xs font-semibold text-foreground">{field.label}</span>
              </dt>
              <dd className="mt-2 font-mono-num text-[11px] leading-5 text-foreground-muted">{field.value}</dd>
              <dd className="mt-2 text-[11px] leading-5 text-foreground-muted">
                <span className="font-medium text-foreground">{field.endpoint}</span>
                <span aria-hidden="true" className="mx-1.5 text-foreground-muted/60">·</span>
                <span>{field.scope}</span>
              </dd>
            </div>
          ))}
        </dl>
      </section>
    </section>
  );
}

export function TickEvidenceBoundary({ locale }: { locale: Locale }) {
  const d = COPY[locale];

  return (
    <aside aria-labelledby="tick-evidence-boundary-title" className="mt-8 border-y border-card-border py-7 sm:py-8">
      <header className="max-w-4xl">
        <p className="editorial-kicker text-accent">{d.tickKicker}</p>
        <h3 id="tick-evidence-boundary-title" className="mt-2 font-serif text-[1.45rem] font-semibold leading-tight tracking-[-0.018em] text-foreground sm:text-[1.7rem]">
          {d.tickTitle}
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-foreground-muted">{d.tickLead}</p>
      </header>

      <div className="mt-6 grid border-y border-card-border md:grid-cols-2">
        <section className="border-b border-card-border py-5 pr-0 md:border-r md:border-b-0 md:pr-7" aria-label={d.direct}>
          <div className="border-l-2 border-status-confirmed pl-4">
            <p className="editorial-kicker text-status-confirmed">{d.direct}</p>
            <p className="mt-3 text-sm leading-relaxed text-foreground-muted">{d.directText}</p>
            <p className="mt-3 text-[11px] font-medium text-foreground-muted">{d.directSource}</p>
          </div>
        </section>
        <section className="py-5 pl-0 md:pl-7" aria-label={d.open}>
          <div className="border-l-2 border-status-partial pl-4">
            <p className="editorial-kicker text-status-partial">{d.open}</p>
            <p className="mt-3 text-sm leading-relaxed text-foreground-muted">{d.openText}</p>
          </div>
        </section>
      </div>

      <p className="mt-5 border-l-2 border-accent pl-4 text-xs leading-5 text-foreground-muted">
        <span className="font-semibold text-foreground">{d.boundaryLabel}. </span>
        {d.boundaryText}
      </p>
    </aside>
  );
}

export function EcoSpeciesCueRow({ locale }: { locale: Locale }) {
  const d = COPY[locale];

  return (
    <p className="mt-5 text-xs leading-5 text-foreground-muted" aria-label={d.systemsKicker}>
      <span className="editorial-kicker mr-2 text-foreground">{d.systemsKicker}</span>
      {d.systemsLabel}
    </p>
  );
}
