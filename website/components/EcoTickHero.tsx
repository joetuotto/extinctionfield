import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

type Locale = "en" | "fi";

const COPY = {
  en: {
    figure: "Figure 1 · Ixodes / host interface",
    title: "A local electrostatic route to host encounter",
    lead:
      "This figure separates a reported observation from its mechanism illustration. At the host–vegetation interface, a local static-electric gradient can create an attraction force on a polarizable tick.",
    observedLabel: "Observed result",
    resultValue: "15 / 20",
    resultText: "live nymphs fully lifted in the reported apparatus",
    studyFrameLabel: "Reported study frame",
    voltageLabel: "Applied potential",
    voltageValue: "+750 V",
    gapLabel: "Air gap",
    gapValue: "3 mm",
    contextLabel: "Reported comparison",
    resultContext: "0 / 20 at 0 V · median lift time 0.79 s",
    sequenceLabel: "Mechanism route isolated in the study",
    host: "Host + reference geometry",
    interface: "Local EDC / ∇(E²) interface",
    tick: "Tick encounter / attachment",
    illustrationLabel: "Mechanism illustration",
    captionLabel: "Interpretation",
    caption:
      "Conceptual reconstruction of a local host–vegetation interface. Geometry and field lines are illustrative, not to scale and not a field measurement.",
    provenanceLabel: "Evidence provenance",
    sourcePrefix: "Mechanism and reported lift result:",
    source: "England, Lihou & Robert (2023)",
    illustration:
      "Image: BERM–Eco illustration; it is not an experimental photograph or a quantitative field map.",
    link: "Read source",
  },
  fi: {
    figure: "Kuva 1 · Ixodes / isäntärajapinta",
    title: "Paikallinen sähköstaattinen reitti isäntäkohtaamiseen",
    lead:
      "Kuva erottaa raportoidun havainnon sen mekanismikuvasta. Isännän ja kasvillisuuden rajapinnassa paikallinen staattisen sähkökentän gradientti voi synnyttää polarisoituvaan punkkiin vetovoiman.",
    observedLabel: "Havaittu tulos",
    resultValue: "15 / 20",
    resultText: "elävää nymfiä nousi kokonaan raportoidussa koejärjestelyssä",
    studyFrameLabel: "Raportoitu koeasetelma",
    voltageLabel: "Asetettu potentiaali",
    voltageValue: "+750 V",
    gapLabel: "Ilmarako",
    gapValue: "3 mm",
    contextLabel: "Raportoitu vertailu",
    resultContext: "0 / 20 0 V:ssa · nousun mediaaniaika 0,79 s",
    sequenceLabel: "Kokeessa eristetty mekanismireitti",
    host: "Isäntä + referenssigeometria",
    interface: "Paikallinen EDC / ∇(E²) -rajapinta",
    tick: "Punkin kohtaaminen / kiinnittyminen",
    illustrationLabel: "Mekanismikuva",
    captionLabel: "Tulkinta",
    caption:
      "Käsitteellinen rekonstruktio paikallisesta isäntä–kasvillisuusrajapinnasta. Geometria ja kenttäviivat ovat havainnollistavia, eivät mittakaavassa eivätkä kenttämittaus.",
    provenanceLabel: "Näytön lähde ja kuvan alkuperä",
    sourcePrefix: "Mekanismi ja raportoitu nostotulos:",
    source: "England, Lihou & Robert (2023)",
    illustration:
      "Kuva: BERM–Eco-havainnollistus; se ei ole kokeellinen valokuva eikä kvantitatiivinen kenttäkartta.",
    link: "Avaa lähde",
  },
} as const;

/**
 * Evidence, illustration and provenance intentionally live in separate
 * editorial zones. The image therefore cannot be mistaken for a data panel.
 */
export function EcoTickHero({ locale }: { locale: Locale }) {
  const d = COPY[locale];

  return (
    <figure
      aria-labelledby="eco-tick-hero-title"
      className="mb-14 overflow-hidden border-y border-card-border bg-card-bg shadow-[0_20px_60px_-52px_rgba(15,23,42,0.65)] sm:border"
    >
      <div className="grid lg:min-h-[500px] lg:grid-cols-[minmax(0,0.94fr)_minmax(0,1.06fr)]">
        <div className="order-2 flex flex-col px-6 py-8 sm:px-9 sm:py-10 lg:order-1 lg:px-10">
          <div>
            <p className="editorial-kicker text-accent">{d.figure}</p>
            <h2
              id="eco-tick-hero-title"
              className="editorial-section-heading mt-3 max-w-xl text-[clamp(1.85rem,1.3rem+1.5vw,2.65rem)]"
            >
              {d.title}
            </h2>
            <p className="editorial-deck mt-4 max-w-xl">{d.lead}</p>
          </div>

          <section aria-label={d.observedLabel} className="mt-8 border-y editorial-rule py-5">
            <p className="editorial-kicker text-status-confirmed">{d.observedLabel}</p>
            <div className="mt-3 flex items-end gap-4">
              <strong className="font-mono-num shrink-0 text-[2.55rem] font-semibold leading-none tracking-[-0.065em] text-foreground">
                {d.resultValue}
              </strong>
              <span className="mb-0.5 max-w-[15rem] text-xs leading-5 text-foreground-muted">
                {d.resultText}
              </span>
            </div>
          </section>

          <dl className="mt-5 grid grid-cols-2 gap-x-7 gap-y-4" aria-label={d.studyFrameLabel}>
            <div>
              <dt className="editorial-kicker">{d.voltageLabel}</dt>
              <dd className="mt-1 font-mono-num text-sm font-semibold text-foreground">{d.voltageValue}</dd>
            </div>
            <div>
              <dt className="editorial-kicker">{d.gapLabel}</dt>
              <dd className="mt-1 font-mono-num text-sm font-semibold text-foreground">{d.gapValue}</dd>
            </div>
          </dl>
          <p className="mt-5 border-l-2 border-status-partial pl-3 text-xs leading-5 text-foreground-muted">
            <span className="editorial-kicker block text-status-partial">{d.contextLabel}</span>
            <span className="mt-1 block">{d.resultContext}</span>
          </p>
        </div>

        <div className="relative order-1 aspect-[16/10] overflow-hidden border-b border-card-border bg-slate-950 lg:order-2 lg:aspect-auto lg:border-b-0 lg:border-l">
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
            className="object-cover object-[26%_50%]"
          />
        </div>
      </div>

      <div className="border-t border-card-border px-6 py-5 sm:px-9 lg:px-10">
        <p className="editorial-kicker">{d.sequenceLabel}</p>
        <ol className="mt-3 grid gap-x-6 gap-y-3 sm:grid-cols-3">
          {[
            ["01", d.host],
            ["02", d.interface],
            ["03", d.tick],
          ].map(([number, label], index) => (
            <li key={number} className="border-t border-card-border pt-3">
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
              <span className="mt-1 block text-xs font-medium leading-5 text-foreground">{label}</span>
            </li>
          ))}
        </ol>
      </div>

      <figcaption className="grid gap-5 border-t border-card-border bg-figure-caption-bg px-6 py-5 sm:grid-cols-[minmax(0,1.15fr)_minmax(16rem,0.85fr)] sm:px-9 lg:px-10">
        <div>
          <p className="editorial-kicker">{d.illustrationLabel}</p>
          <p className="mt-2 text-xs leading-5 text-foreground-muted">
            <span className="font-semibold text-foreground">{d.captionLabel}. </span>
            {d.caption}
          </p>
        </div>
        <div className="border-t border-card-border pt-4 sm:border-t-0 sm:border-l sm:pl-5 sm:pt-0">
          <p className="editorial-kicker">{d.provenanceLabel}</p>
          <p className="mt-2 text-xs leading-5 text-foreground-muted">
            {d.sourcePrefix}{" "}
            <a
              href="https://doi.org/10.1016/j.cub.2023.06.021"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 font-medium text-accent transition-colors hover:text-accent-hover"
            >
              <span>{d.source}</span>
              <ArrowUpRight size={13} aria-hidden="true" />
              <span className="sr-only">— {d.link}</span>
            </a>
          </p>
          <p className="mt-2 text-[11px] leading-4 text-foreground-muted">{d.illustration}</p>
        </div>
      </figcaption>
    </figure>
  );
}
