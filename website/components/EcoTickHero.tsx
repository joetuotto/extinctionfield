import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

type Locale = "en" | "fi";

const COPY = {
  en: {
    eyebrow: "FieldState spotlight · Ixodes host encounter",
    title: "A mechanism image, not a claim of immunity",
    lead:
      "At the host–vegetation interface, a local static-electric gradient can create an attraction force on a polarizable tick. This makes the tick a useful BERM–Eco example of a species-specific transfer function.",
    evidenceLabel: "Direct mechanism evidence",
    resultValue: "15 / 20",
    resultText: "live nymphs fully lifted in the reported apparatus",
    voltageLabel: "Applied potential",
    voltageValue: "+750 V",
    gapLabel: "Air gap",
    gapValue: "3 mm",
    contextLabel: "Reported comparison",
    resultContext: "0 / 20 at 0 V · median lift time 0.79 s",
    sequenceLabel: "What the experiment isolates",
    host: "Host + reference geometry",
    interface: "Local EDC / ∇(E²) interface",
    tick: "Tick encounter / attachment",
    caption:
      "Conceptual visualisation of the host–vegetation interface; field lines are illustrative and not to scale.",
    source: "England, Lihou & Robert (2023)",
    link: "Read source",
  },
  fi: {
    eyebrow: "FieldState-esimerkki · Ixodes-isäntäkohtaaminen",
    title: "Mekanismikuva, ei väite immuunisuudesta",
    lead:
      "Isännän ja kasvillisuuden rajapinnassa paikallinen staattisen sähkökentän gradientti voi synnyttää polarisoituvaan punkkiin vetovoiman. Siksi punkki on BERM–Eco:ssa hyödyllinen esimerkki lajikohtaisesta siirtofunktiosta.",
    evidenceLabel: "Suora mekanisminäyttö",
    resultValue: "15 / 20",
    resultText: "elävää nymfiä nousi kokonaan raportoidussa koejärjestelyssä",
    voltageLabel: "Asetettu potentiaali",
    voltageValue: "+750 V",
    gapLabel: "Ilmarako",
    gapValue: "3 mm",
    contextLabel: "Raportoitu vertailu",
    resultContext: "0 / 20 0 V:ssa · nousun mediaaniaika 0,79 s",
    sequenceLabel: "Mitä koe eristää",
    host: "Isäntä + referenssigeometria",
    interface: "Paikallinen EDC / ∇(E²) -rajapinta",
    tick: "Punkin kohtaaminen / kiinnittyminen",
    caption:
      "Käsitteellinen visualisointi isäntä–kasvillisuusrajapinnasta; kenttäviivat ovat havainnollistavia eivätkä mittakaavassa.",
    source: "England, Lihou & Robert (2023)",
    link: "Avaa lähde",
  },
} as const;

/**
 * The image carries the physical intuition. Its evidence, scope and study
 * conditions live in a separate editorial panel so neither competes visually.
 */
export function EcoTickHero({ locale }: { locale: Locale }) {
  const d = COPY[locale];

  return (
    <figure
      aria-labelledby="eco-tick-hero-title"
      className="mb-12 overflow-hidden rounded-[1.35rem] border border-card-border bg-card-bg shadow-[0_24px_70px_-48px_rgba(15,23,42,0.55)]"
    >
      <div className="grid lg:min-h-[470px] lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)]">
        <div className="order-2 flex flex-col px-6 py-7 sm:px-9 sm:py-8 lg:order-1 lg:py-9">
          <div>
            <p className="flex items-center gap-2 text-[11px] font-semibold tracking-[0.14em] text-accent uppercase">
              <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-accent" />
              {d.eyebrow}
            </p>
            <h2
              id="eco-tick-hero-title"
              className="mt-3 max-w-xl text-2xl font-semibold tracking-tight text-foreground sm:text-[1.75rem]"
            >
              {d.title}
            </h2>
            <p className="mt-3 max-w-xl text-[0.95rem] leading-7 text-foreground-muted">
              {d.lead}
            </p>
          </div>

          <aside className="mt-7 border-t border-card-border pt-5">
            <p className="text-[11px] font-semibold tracking-[0.14em] text-status-confirmed uppercase">
              {d.evidenceLabel}
            </p>
            <div className="mt-3 flex items-end gap-3">
              <strong className="font-mono-num shrink-0 text-[2.2rem] font-semibold leading-none tracking-[-0.06em] text-foreground">
                {d.resultValue}
              </strong>
              <span className="mb-0.5 max-w-[13rem] text-xs leading-5 text-foreground-muted">
                {d.resultText}
              </span>
            </div>
            <dl className="mt-5 grid grid-cols-2 gap-3 border-t border-card-border pt-4">
              <div>
                <dt className="text-[10px] font-semibold tracking-[0.12em] text-foreground-muted uppercase">
                  {d.voltageLabel}
                </dt>
                <dd className="mt-1 text-sm font-semibold text-foreground">{d.voltageValue}</dd>
              </div>
              <div className="border-l border-card-border pl-3">
                <dt className="text-[10px] font-semibold tracking-[0.12em] text-foreground-muted uppercase">
                  {d.gapLabel}
                </dt>
                <dd className="mt-1 text-sm font-semibold text-foreground">{d.gapValue}</dd>
              </div>
            </dl>
            <p className="mt-4 border-l-2 border-status-partial pl-3 text-xs leading-5 text-foreground-muted">
              <span className="block text-[10px] font-semibold tracking-[0.12em] text-status-partial uppercase">
                {d.contextLabel}
              </span>
              <span className="mt-1 block">{d.resultContext}</span>
            </p>
          </aside>
        </div>

        <div className="relative order-1 aspect-video overflow-hidden border-b border-card-border bg-slate-950 lg:order-2 lg:aspect-auto lg:border-b-0 lg:border-l">
          <Image
            src="/images/eco-tick-fieldstate-hero.png"
            alt={
              locale === "fi"
                ? "Punkki ruohonkorsella ja nisäkkään turkki; niiden välissä havainnollistavat sähköstaattiset kenttäviivat."
                : "A tick on a blade of grass and mammal fur, with illustrative electrostatic field lines between them."
            }
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 560px"
            className="object-cover object-[45%_50%]"
          />
        </div>
      </div>

      <div className="border-t border-card-border px-6 py-5 sm:px-9">
        <p className="text-[10px] font-semibold tracking-[0.14em] text-foreground-muted uppercase">
          {d.sequenceLabel}
        </p>
        <ol className="mt-3 grid gap-3 sm:grid-cols-3">
          {[
            ["01", d.host],
            ["02", d.interface],
            ["03", d.tick],
          ].map(([number, label], index) => (
            <li
              key={number}
              className="flex min-w-0 items-center gap-3 rounded-lg border border-card-border bg-background-secondary/35 px-3.5 py-3"
            >
              <span
                className={
                  index === 1
                    ? "font-mono-num text-xs font-semibold text-accent"
                    : index === 2
                      ? "font-mono-num text-xs font-semibold text-status-partial"
                      : "font-mono-num text-xs font-semibold text-foreground-muted"
                }
              >
                {number}
              </span>
              <span className="text-xs font-medium leading-5 text-foreground">{label}</span>
            </li>
          ))}
        </ol>
      </div>

      <figcaption className="grid gap-3 border-t border-card-border bg-background-secondary/35 px-6 py-4 text-xs leading-5 text-foreground-muted sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center sm:px-9">
        <p>{d.caption}</p>
        <a
          href="https://doi.org/10.1016/j.cub.2023.06.021"
          target="_blank"
          rel="noreferrer"
          className="inline-flex shrink-0 items-center gap-1.5 font-medium text-accent transition-colors hover:text-accent-hover"
        >
          <span>{d.source}</span>
          <ArrowUpRight size={14} aria-hidden="true" />
          <span className="sr-only">— {d.link}</span>
        </a>
      </figcaption>
    </figure>
  );
}
