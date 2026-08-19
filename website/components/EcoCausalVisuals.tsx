import {
  ArrowDown,
  ArrowRight,
  Bird,
  Bug,
  Compass,
  Flower2,
  GitBranch,
  Leaf,
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
  host: string;
  interface: string;
  tick: string;
  direct: string;
  open: string;
  directText: string;
  openText: string;
  schematic: string;
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
    tickKicker: "Focal example · Ixodes / host interface",
    tickTitle: "A tick demonstrates a local mechanism — not a universal shield",
    tickLead:
      "The compelling feature of the tick example is its precision: a host, vegetation and short air gap define a measurable static interface. The experimental result is passive electrostatic attraction. Relative robustness and selection are the next measurements, not hidden assumptions.",
    host: "Host surface",
    interface: "Measured air-gap interface",
    tick: "Tick / attachment endpoint",
    direct: "Direct physical evidence",
    open: "Next discriminating test",
    directText: "Calibrated static fields can alter short-range attraction and attachment in the tested tick system.",
    openText: "Compare response curves, feeding success and inherited traits across species and life stages under the same FieldState.",
    schematic: "Schematic geometry — not to scale and not a dose estimate",
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
    tickKicker: "Nosto · Ixodes / isäntärajapinta",
    tickTitle: "Punkki osoittaa paikallisen mekanismin — ei yleistä suojakilpeä",
    tickLead:
      "Punkkiesimerkin vahvuus on täsmällisyys: isäntä, kasvillisuus ja lyhyt ilmarako määrittävät mitattavan staattisen rajapinnan. Kokeellinen tulos on passiivinen sähköstaattinen veto. Suhteellinen robustius ja valinta ovat seuraavat mitattavat asiat, eivät piilooletuksia.",
    host: "Isännän pinta",
    interface: "Mitattu ilmarakorajapinta",
    tick: "Punkki / kiinnittymispäätepiste",
    direct: "Suora fysikaalinen näyttö",
    open: "Seuraava erotteleva testi",
    directText: "Kalibroidut staattiset kentät voivat muuttaa lyhyen matkan vetoa ja kiinnittymistä tutkitussa punkkijärjestelmässä.",
    openText: "Vertaile vastekäyriä, ruokintamenestystä ja periytyviä piirteitä lajien ja elinvaiheiden välillä samassa FieldStatessa.",
    schematic: "Kaaviomainen geometria — ei mittakaavassa eikä annosarvio",
  },
};

function FieldIcon({ kind }: { kind: "static" | "elf" | "geo" | "rf" }) {
  const className = "h-4 w-4";
  if (kind === "static") return <Sparkles className={className} aria-hidden="true" />;
  if (kind === "elf") return <Waves className={className} aria-hidden="true" />;
  if (kind === "geo") return <Compass className={className} aria-hidden="true" />;
  return <Radio className={className} aria-hidden="true" />;
}

function StepArrow({ hypothesis }: { hypothesis: boolean }) {
  return (
    <div className="flex shrink-0 items-center justify-center text-foreground-muted" aria-hidden="true">
      <ArrowRight className={hypothesis ? "hidden h-5 w-5 text-status-partial lg:block" : "hidden h-5 w-5 lg:block"} strokeWidth={1.45} />
      <ArrowDown className={hypothesis ? "h-5 w-5 text-status-partial lg:hidden" : "h-5 w-5 lg:hidden"} strokeWidth={1.45} />
    </div>
  );
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
        <ol className="flex flex-col gap-3 lg:flex-row lg:items-stretch lg:gap-2" aria-label={d.modelTitle}>
          {d.steps.map((step, index) => (
            <li key={step.eyebrow} className="contents">
              <article className={`relative min-w-0 flex-1 rounded-xl border p-4 ${step.tone === "observed" ? "border-status-confirmed/35 bg-status-confirmed/[0.035]" : "border-dashed border-status-partial/45 bg-status-partial/[0.035]"}`}>
                <div className={`absolute inset-y-4 left-0 w-0.5 rounded-r ${step.tone === "observed" ? "bg-status-confirmed" : "bg-status-partial"}`} aria-hidden="true" />
                <p className="pl-2 text-[10px] font-semibold tracking-[0.13em] text-foreground-muted">{step.eyebrow}</p>
                <h3 className="mt-2 pl-2 text-sm font-semibold leading-snug">{step.title}</h3>
                <p className="mt-2 pl-2 text-sm leading-relaxed text-foreground-muted">{step.detail}</p>
                <p className={`mt-4 border-t pt-3 pl-2 font-mono-num text-xs ${step.tone === "observed" ? "border-status-confirmed/20 text-status-confirmed" : "border-status-partial/25 text-status-partial"}`}>{step.formula}</p>
              </article>
              {index < d.steps.length - 1 && <StepArrow hypothesis={d.steps[index + 1].tone === "hypothesis"} />}
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

export function TickFocalFrame({ locale }: { locale: Locale }) {
  const d = COPY[locale];
  const prefix = locale === "fi" ? "tick-fi" : "tick-en";

  return (
    <div className="mt-6 overflow-hidden rounded-2xl border border-card-border bg-card-bg">
      <div className="grid lg:grid-cols-[1.1fr_0.9fr]">
        <div className="relative min-h-[270px] border-b border-card-border p-5 lg:border-r lg:border-b-0 sm:p-6">
          <div className="absolute inset-0 opacity-[0.34]" aria-hidden="true" style={{ backgroundImage: "linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)", backgroundSize: "28px 28px" }} />
          <div className="relative">
            <p className="text-[10px] font-semibold tracking-[0.14em] text-accent">{d.tickKicker}</p>
            <svg className="mt-3 h-auto w-full" viewBox="0 0 680 242" role="img" aria-labelledby={`${prefix}-title ${prefix}-desc`}>
              <title id={`${prefix}-title`}>{d.tickTitle}</title>
              <desc id={`${prefix}-desc`}>{d.schematic}</desc>
              <defs>
                <linearGradient id={`${prefix}-host`} x1="0" x2="1" y1="0" y2="1">
                  <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.28" />
                  <stop offset="100%" stopColor="var(--accent)" stopOpacity="0.07" />
                </linearGradient>
                <marker id={`${prefix}-arrow`} viewBox="0 0 10 8" refX="8" refY="4" markerWidth="6" markerHeight="6" orient="auto">
                  <path d="M 0 0 L 10 4 L 0 8 z" fill="var(--accent)" />
                </marker>
              </defs>

              <path d="M 16 207 C 140 184, 260 218, 382 202 S 566 215, 664 191" fill="none" stroke="var(--status-confirmed)" strokeOpacity="0.68" strokeWidth="2" />
              <path d="M 55 207 l 8 -27 M 68 205 l 16 -23 M 101 202 l 8 -24 M 550 207 l -8 -23 M 573 205 l 16 -27 M 606 202 l 7 -21" stroke="var(--status-confirmed)" strokeOpacity="0.55" strokeWidth="2" strokeLinecap="round" />

              <path d="M 45 77 C 105 30, 228 44, 278 104 C 301 132, 285 179, 230 188 C 151 201, 64 174, 35 132 C 20 109, 24 93, 45 77 Z" fill={`url(#${prefix}-host)`} stroke="var(--accent)" strokeOpacity="0.62" strokeWidth="1.5" />
              <path d="M 70 104 C 128 66, 219 81, 254 119" fill="none" stroke="var(--foreground)" strokeOpacity="0.38" strokeWidth="1" strokeDasharray="4 5" />
              <text x="58" y="64" fill="var(--foreground)" fontSize="13" fontWeight="600">{d.host}</text>
              <text x="58" y="82" fill="var(--foreground-muted)" fontSize="11">Q · reference · surface geometry</text>

              <path d="M 274 104 C 353 60, 410 70, 471 118" fill="none" stroke="var(--accent)" strokeOpacity="0.36" strokeWidth="1.3" />
              <path d="M 273 132 C 351 91, 415 101, 474 145" fill="none" stroke="var(--accent)" strokeOpacity="0.58" strokeWidth="1.55" markerEnd={`url(#${prefix}-arrow)`} />
              <path d="M 278 164 C 350 139, 412 147, 465 171" fill="none" stroke="var(--accent)" strokeOpacity="0.3" strokeWidth="1.1" />
              <text x="313" y="57" fill="var(--accent)" fontSize="12" fontWeight="600">E(r,t) · ∇E²</text>
              <text x="313" y="74" fill="var(--foreground-muted)" fontSize="11">{d.interface}</text>

              <g transform="translate(502 140)" fill="none" stroke="var(--foreground)" strokeLinecap="round" strokeLinejoin="round">
                <ellipse cx="0" cy="10" rx="20" ry="26" fill="var(--card-bg)" strokeWidth="2" />
                <circle cx="0" cy="-16" r="10" fill="var(--card-bg)" strokeWidth="2" />
                <path d="M -13 0 L -37 -14 M -17 13 L -47 7 M -15 28 L -39 39 M 13 0 L 37 -14 M 17 13 L 47 7 M 15 28 L 39 39" strokeWidth="2" />
              </g>
              <text x="476" y="209" fill="var(--foreground)" fontSize="13" fontWeight="600">{d.tick}</text>
              <text x="476" y="226" fill="var(--foreground-muted)" fontSize="11">Rᵢ(FieldState)</text>
              <text x="16" y="234" fill="var(--foreground-muted)" fontSize="10">{d.schematic}</text>
            </svg>
          </div>
        </div>

        <div className="flex flex-col justify-center p-5 sm:p-7">
          <h3 className="text-xl font-semibold tracking-tight">{d.tickTitle}</h3>
          <p className="mt-3 text-sm leading-relaxed text-foreground-muted">{d.tickLead}</p>
          <div className="mt-5 space-y-3">
            <div className="border-l-2 border-status-confirmed pl-4">
              <p className="text-[10px] font-semibold tracking-[0.14em] text-status-confirmed">{d.direct}</p>
              <p className="mt-1 text-sm leading-relaxed text-foreground-muted">{d.directText}</p>
            </div>
            <div className="border-l-2 border-status-partial pl-4">
              <p className="text-[10px] font-semibold tracking-[0.14em] text-status-partial">{d.open}</p>
              <p className="mt-1 text-sm leading-relaxed text-foreground-muted">{d.openText}</p>
            </div>
          </div>
          <div className="mt-5 flex items-center gap-3 border-t border-card-border pt-4 text-xs text-foreground-muted">
            <span className="grid h-8 w-8 place-items-center rounded-md bg-accent/10 text-accent"><Bug className="h-4 w-4" aria-hidden="true" /></span>
            <span className="grid h-8 w-8 place-items-center rounded-md bg-status-confirmed/10 text-status-confirmed"><Leaf className="h-4 w-4" aria-hidden="true" /></span>
            <span className="grid h-8 w-8 place-items-center rounded-md bg-status-partial/10 text-status-partial"><GitBranch className="h-4 w-4" aria-hidden="true" /></span>
            <span>{locale === "fi" ? "fysiikka → kohtaaminen → mahdollinen valinta" : "physics → encounter → possible selection"}</span>
          </div>
        </div>
      </div>
    </div>
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
