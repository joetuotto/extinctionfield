import Image from "next/image";
import { ArrowUpRight, Sparkles } from "lucide-react";

type Locale = "en" | "fi";

const COPY = {
  en: {
    eyebrow: "FieldState spotlight · Ixodes host encounter",
    title: "A mechanism image, not a claim of immunity",
    lead:
      "At the host–vegetation interface, a local static-electric gradient can create an attraction force on a polarizable tick. This makes the tick a useful BERM–Eco example of a species-specific transfer function.",
    resultLabel: "Observed in the reported apparatus",
    resultValue: "15 / 20",
    resultText: "live nymphs fully lifted at +750 V across a 3 mm air gap",
    resultContext: "0 / 20 at 0 V · median lift time 0.79 s",
    host: "Host + reference geometry",
    interface: "Local EDC / ∇(E²) interface",
    tick: "Tick encounter / attachment",
    caption:
      "Conceptual visualisation of the host–vegetation interface; field lines are illustrative and not to scale.",
    source: "Direct mechanism evidence: England, Lihou & Robert (2023)",
    link: "Read source",
  },
  fi: {
    eyebrow: "FieldState-esimerkki · Ixodes-isäntäkohtaaminen",
    title: "Mekanismikuva, ei väite immuunisuudesta",
    lead:
      "Isännän ja kasvillisuuden rajapinnassa paikallinen staattisen sähkökentän gradientti voi synnyttää polarisoituvaan punkkiin vetovoiman. Siksi punkki on BERM–Eco:ssa hyödyllinen esimerkki lajikohtaisesta siirtofunktiosta.",
    resultLabel: "Havaittu raportoidussa koejärjestelyssä",
    resultValue: "15 / 20",
    resultText: "elävää nymfiä nousi kokonaan +750 V:n ja 3 mm:n ilmaraon asetelmassa",
    resultContext: "0 / 20 0 V:ssa · nousun mediaaniaika 0,79 s",
    host: "Isäntä + referenssigeometria",
    interface: "Paikallinen EDC / ∇(E²) -rajapinta",
    tick: "Punkin kohtaaminen / kiinnittyminen",
    caption:
      "Käsitteellinen visualisointi isäntä–kasvillisuusrajapinnasta; kenttäviivat ovat havainnollistavia eivätkä mittakaavassa.",
    source: "Suora mekanisminäyttö: England, Lihou & Robert (2023)",
    link: "Avaa lähde",
  },
} as const;

export function EcoTickHero({ locale }: { locale: Locale }) {
  const d = COPY[locale];

  return (
    <figure
      aria-labelledby="eco-tick-hero-title"
      className="mb-12 overflow-hidden rounded-2xl border border-sky-400/20 bg-slate-950 shadow-[0_28px_80px_-42px_rgba(14,165,233,0.75)]"
    >
      <div className="relative min-h-[540px] sm:min-h-[600px]">
        <Image
          src="/images/eco-tick-fieldstate-hero.png"
          alt={
            locale === "fi"
              ? "Punkki ruohonkorsella ja nisäkkään turkki; niiden välissä havainnollistavat sähköstaattiset kenttäviivat."
              : "A tick on a blade of grass and mammal fur, with illustrative electrostatic field lines between them."
          }
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 1024px"
          className="object-cover object-center"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[linear-gradient(90deg,rgba(2,12,27,0.93)_0%,rgba(2,12,27,0.6)_46%,rgba(2,12,27,0.08)_78%),linear-gradient(0deg,rgba(2,12,27,0.92)_0%,rgba(2,12,27,0)_52%)]"
        />

        <div className="relative z-10 flex min-h-[540px] flex-col justify-between p-6 sm:min-h-[600px] sm:p-9">
          <div className="max-w-xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-sky-300/30 bg-slate-950/55 px-3 py-1 text-xs font-medium tracking-[0.12em] text-sky-100 uppercase backdrop-blur-sm">
              <Sparkles size={13} aria-hidden="true" />
              {d.eyebrow}
            </div>
            <h2
              id="eco-tick-hero-title"
              className="max-w-lg text-2xl font-semibold tracking-tight text-white sm:text-3xl"
            >
              {d.title}
            </h2>
            <p className="mt-3 max-w-xl text-sm leading-6 text-slate-200 sm:text-base">
              {d.lead}
            </p>
            <div className="mt-5 max-w-md rounded-xl border border-sky-200/20 bg-slate-950/65 p-3.5 backdrop-blur-sm">
              <span className="block text-[10px] font-semibold tracking-[0.14em] text-sky-300 uppercase">
                {d.resultLabel}
              </span>
              <div className="mt-1.5 flex items-baseline gap-3">
                <strong className="font-mono-num text-3xl tracking-tight text-white">{d.resultValue}</strong>
                <span className="text-xs leading-5 text-slate-200">{d.resultText}</span>
              </div>
              <p className="mt-1 text-[11px] text-slate-400">{d.resultContext}</p>
            </div>
          </div>

          <div className="grid gap-2 text-xs text-slate-100 sm:grid-cols-3 sm:gap-3">
            <div className="rounded-lg border border-slate-200/15 bg-slate-950/65 p-3 backdrop-blur-sm">
              <span className="block text-[10px] font-semibold tracking-[0.14em] text-sky-300 uppercase">01</span>
              <span className="mt-1 block font-medium">{d.host}</span>
            </div>
            <div className="rounded-lg border border-sky-200/20 bg-sky-950/45 p-3 backdrop-blur-sm">
              <span className="block text-[10px] font-semibold tracking-[0.14em] text-sky-300 uppercase">02</span>
              <span className="mt-1 block font-medium">{d.interface}</span>
            </div>
            <div className="rounded-lg border border-amber-200/20 bg-amber-950/30 p-3 backdrop-blur-sm">
              <span className="block text-[10px] font-semibold tracking-[0.14em] text-amber-300 uppercase">03</span>
              <span className="mt-1 block font-medium">{d.tick}</span>
            </div>
          </div>
        </div>
      </div>

      <figcaption className="grid gap-3 border-t border-slate-100/10 bg-slate-950/95 px-6 py-4 text-xs leading-5 text-slate-300 sm:grid-cols-[1fr_auto] sm:items-center sm:px-9">
        <p>{d.caption}</p>
        <a
          href="https://doi.org/10.1016/j.cub.2023.06.021"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 font-medium text-sky-300 transition hover:text-sky-100"
        >
          {d.source} <ArrowUpRight size={14} aria-hidden="true" />
          <span className="sr-only">— {d.link}</span>
        </a>
      </figcaption>
    </figure>
  );
}
