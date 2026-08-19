import {
  Bird,
  Bug,
  Compass,
  Flower2,
  Radio,
  Sparkles,
  Waves,
} from "lucide-react";

type Locale = "en" | "fi";

type VisualStep = {
  eyebrow: string;
  title: string;
  detail: string;
  formula: string;
  tone: "observed" | "hypothesis";
};

const COPY: Record<Locale, {
  modelKicker: string;
  modelTitle: string;
  modelLead: string;
  observed: string;
  hypothesis: string;
  steps: readonly VisualStep[];
  keyTitle: string;
  keyLead: string;
  fields: readonly { icon: "static" | "elf" | "geo" | "rf"; label: string; value: string; endpoint: string; scope: string }[];
  tickKicker: string;
  tickTitle: string;
  tickLead: string;
  direct: string;
  open: string;
  directText: string;
  openText: string;
  boundaryLabel: string;
  boundaryText: string;
}> = {
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
    keyTitle: "A FieldState has several non-interchangeable signatures",
    keyLead: "The visual key prevents category errors: an observation in one field class is not silently reused as evidence in another.",
    fields: [
      { icon: "static", label: "Static interface", value: "E_DC · Q · ∇|E|²", endpoint: "force / attachment", scope: "physical transport" },
      { icon: "elf", label: "ELF waveform", value: "E_AC(f) · B(f) · dE/dt", endpoint: "landing / behaviour", scope: "matched endpoint" },
      { icon: "geo", label: "Geomagnetic cue", value: "B₀ · inclination · light", endpoint: "orientation", scope: "context-dependent signal" },
      { icon: "rf", label: "RF signature", value: "S(f, polarisation, time)", endpoint: "frequency window", scope: "spectrum-specific result" },
    ],
    tickKicker: "Evidence boundary · Ixodes / host interface",
    tickTitle: "What the tick experiment establishes — and what it does not",
    tickLead:
      "The direct result concerns a local, static host–vegetation interface. It must remain within that field class and endpoint; relative robustness and selection require their own measurements.",
    direct: "Direct physical evidence",
    open: "Next discriminating test",
    directText: "Calibrated static fields can alter short-range attraction and attachment in the tested tick system.",
    openText: "Compare response curves, feeding success and inherited traits across species and life stages under the same FieldState.",
    boundaryLabel: "Reading rule",
    boundaryText: "Static transport evidence is not interchangeable with RF/ELF response or population change.",
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
    keyTitle: "FieldStatella on useita ei-vaihdettavia allekirjoituksia",
    keyLead: "Visuaalinen avain estää luokkavirheen: yhdessä kenttäluokassa tehtyä havaintoa ei käytetä hiljaisesti toisen kenttäluokan näyttönä.",
    fields: [
      { icon: "static", label: "Staattinen rajapinta", value: "E_DC · Q · ∇|E|²", endpoint: "voima / kiinnittyminen", scope: "fysikaalinen kuljetus" },
      { icon: "elf", label: "ELF-aaltomuoto", value: "E_AC(f) · B(f) · dE/dt", endpoint: "laskeutuminen / käyttäytyminen", scope: "vastaava päätepiste" },
      { icon: "geo", label: "Geomagneettinen vihje", value: "B₀ · inklinaatio · valo", endpoint: "orientaatio", scope: "kontekstiriippuvainen signaali" },
      { icon: "rf", label: "RF-allekirjoitus", value: "S(f, polarisaatio, aika)", endpoint: "taajuusikkuna", scope: "spektrispesifi tulos" },
    ],
    tickKicker: "Näyttörajaus · Ixodes / isäntärajapinta",
    tickTitle: "Mitä punkkikoe osoittaa — ja mitä se ei osoita",
    tickLead:
      "Suora tulos koskee paikallista staattista isäntä–kasvillisuusrajapintaa. Se kuuluu tähän kenttäluokkaan ja päätepisteeseen; suhteellinen robustius ja valinta vaativat omat mittauksensa.",
    direct: "Suora fysikaalinen näyttö",
    open: "Seuraava erotteleva testi",
    directText: "Kalibroidut staattiset kentät voivat muuttaa lyhyen matkan vetoa ja kiinnittymistä tutkitussa punkkijärjestelmässä.",
    openText: "Vertaile vastekäyriä, ruokintamenestystä ja periytyviä piirteitä lajien ja elinvaiheiden välillä samassa FieldStatessa.",
    boundaryLabel: "Lukusääntö",
    boundaryText: "Staattisen kuljetuksen näyttö ei ole vaihdettavissa RF/ELF-vasteeseen tai populaatiomuutokseen.",
  },
};

function FieldIcon({ kind }: { kind: "static" | "elf" | "geo" | "rf" }) {
  const className = "h-4 w-4";
  if (kind === "static") return <Sparkles className={className} aria-hidden="true" />;
  if (kind === "elf") return <Waves className={className} aria-hidden="true" />;
  if (kind === "geo") return <Compass className={className} aria-hidden="true" />;
  return <Radio className={className} aria-hidden="true" />;
}

export function EcoCausalVisuals({ locale }: { locale: Locale }) {
  const d = COPY[locale];

  return (
    <section aria-labelledby="eco-causal-visual-title" className="mt-8 overflow-hidden rounded-2xl border border-card-border bg-card-bg">
      <div className="border-b border-card-border bg-[radial-gradient(ellipse_at_top_left,_var(--accent)_0%,_transparent_38%)] px-5 py-6 sm:px-7">
        <p className="text-[11px] font-semibold tracking-[0.16em] text-accent">{d.modelKicker}</p>
        <h2 id="eco-causal-visual-title" className="mt-2 max-w-3xl text-2xl font-semibold tracking-tight">
          {d.modelTitle}
        </h2>
        <p className="mt-3 max-w-4xl text-sm leading-relaxed text-foreground-muted">{d.modelLead}</p>
        <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-xs text-foreground-muted">
          <span className="inline-flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-status-confirmed" />{d.observed}</span>
          <span className="inline-flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-status-partial" />{d.hypothesis}</span>
        </div>
      </div>

      <div className="p-5 sm:p-7">
        <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-6 2xl:grid-cols-5" aria-label={d.modelTitle}>
          {d.steps.map((step, index) => (
            <li key={step.eyebrow} className={`min-w-0 lg:col-span-2 2xl:col-span-1 ${index === 3 ? "lg:col-start-2 2xl:col-start-auto" : ""}`}>
              <article className={`relative h-full rounded-xl border p-4 ${step.tone === "observed" ? "border-status-confirmed/35 bg-status-confirmed/[0.035]" : "border-dashed border-status-partial/45 bg-status-partial/[0.035]"}`}>
                <div className={`absolute inset-y-4 left-0 w-0.5 rounded-r ${step.tone === "observed" ? "bg-status-confirmed" : "bg-status-partial"}`} aria-hidden="true" />
                <p className="pl-2 text-[10px] font-semibold tracking-[0.13em] text-foreground-muted">{step.eyebrow}</p>
                <h3 className="mt-2 pl-2 text-sm font-semibold leading-snug">{step.title}</h3>
                <p className="mt-2 pl-2 text-sm leading-relaxed text-foreground-muted">{step.detail}</p>
                <p className={`mt-4 border-t pt-3 pl-2 font-mono-num text-xs ${step.tone === "observed" ? "border-status-confirmed/20 text-status-confirmed" : "border-status-partial/25 text-status-partial"}`}>{step.formula}</p>
              </article>
            </li>
          ))}
        </ol>

        <div className="mt-6 border-t border-card-border pt-5">
          <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-baseline">
            <h3 className="text-sm font-semibold">{d.keyTitle}</h3>
            <p className="max-w-2xl text-xs leading-relaxed text-foreground-muted">{d.keyLead}</p>
          </div>
          <div className="mt-4 grid gap-2 sm:grid-cols-2 xl:grid-cols-4">
            {d.fields.map((field) => (
              <div key={field.label} className="flex min-w-0 items-start gap-3 rounded-lg border border-card-border bg-background/35 px-3 py-3">
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-md bg-accent/10 text-accent">
                  <FieldIcon kind={field.icon} />
                </span>
                <div className="min-w-0">
                  <p className="text-xs font-medium">{field.label}</p>
                  <p className="mt-0.5 truncate font-mono-num text-[11px] text-foreground-muted">{field.value}</p>
                  <div className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-[10px] leading-none">
                    <span className="font-medium text-foreground-muted">{field.endpoint}</span>
                    <span className="text-foreground-muted/60">·</span>
                    <span className="text-accent">{field.scope}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function TickEvidenceBoundary({ locale }: { locale: Locale }) {
  const d = COPY[locale];

  return (
    <aside aria-labelledby="tick-evidence-boundary-title" className="mt-6 overflow-hidden rounded-2xl border border-card-border bg-card-bg">
      <div className="border-b border-card-border px-5 py-5 sm:px-7 sm:py-6">
        <div className="flex items-start gap-3">
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-accent/10 text-accent">
            <Bug className="h-4 w-4" aria-hidden="true" />
          </span>
          <div>
            <p className="text-[10px] font-semibold tracking-[0.14em] text-accent">{d.tickKicker}</p>
            <h3 id="tick-evidence-boundary-title" className="mt-1.5 text-lg font-semibold tracking-tight sm:text-xl">{d.tickTitle}</h3>
          </div>
        </div>
        <p className="mt-4 max-w-3xl text-sm leading-relaxed text-foreground-muted">{d.tickLead}</p>
      </div>

      <div className="grid divide-y divide-card-border md:grid-cols-2 md:divide-x md:divide-y-0">
        <div className="p-5 sm:p-6">
          <div className="flex items-center gap-2 text-status-confirmed">
            <span className="h-2 w-2 rounded-full bg-status-confirmed" aria-hidden="true" />
            <p className="text-[10px] font-semibold tracking-[0.14em]">{d.direct}</p>
          </div>
          <p className="mt-3 text-sm leading-relaxed text-foreground-muted">{d.directText}</p>
        </div>
        <div className="p-5 sm:p-6">
          <div className="flex items-center gap-2 text-status-partial">
            <span className="h-2 w-2 rounded-full bg-status-partial" aria-hidden="true" />
            <p className="text-[10px] font-semibold tracking-[0.14em]">{d.open}</p>
          </div>
          <p className="mt-3 text-sm leading-relaxed text-foreground-muted">{d.openText}</p>
        </div>
      </div>

      <div className="flex flex-col gap-2 border-t border-card-border bg-background/35 px-5 py-3 text-xs leading-relaxed text-foreground-muted sm:flex-row sm:items-baseline sm:gap-4 sm:px-7">
        <span className="shrink-0 font-semibold text-foreground">{d.boundaryLabel}</span>
        <span>{d.boundaryText}</span>
      </div>
    </aside>
  );
}

export function EcoSpeciesCueRow({ locale }: { locale: Locale }) {
  const labels = locale === "fi"
    ? ["pölyttäjä", "punkki / loinen", "muuttaja", "dispersoituja"]
    : ["pollinator", "tick / parasite", "migrant", "disperser"];
  const icons = [Flower2, Bug, Bird, Waves];

  return (
    <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-foreground-muted" aria-label={locale === "fi" ? "Esimerkkilajeja" : "Example organism systems"}>
      {labels.map((label, index) => {
        const Icon = icons[index];
        return <span key={label} className="inline-flex items-center gap-1.5 rounded-full border border-card-border bg-background/40 px-2.5 py-1.5"><Icon className="h-3.5 w-3.5 text-accent" aria-hidden="true" />{label}</span>;
      })}
    </div>
  );
}
