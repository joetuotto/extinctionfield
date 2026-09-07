"use client";

import { useId, useState } from "react";
import { pickCopy } from "@/lib/i18n";

interface Factors {
  sar: number;
  vgcc: number;
  modulation: number;
}

const TECHNOLOGIES = [
  {
    id: "am",
    label: "AM",
    frequency: "0.5–1.6 MHz",
    modulationEn: "Continuous AM",
    modulationFi: "Jatkuva AM",
  },
  {
    id: "fm",
    label: "FM",
    frequency: "88–108 MHz",
    modulationEn: "Continuous FM",
    modulationFi: "Jatkuva FM",
  },
  {
    id: "gsm900",
    label: "GSM900",
    frequency: "900 MHz",
    modulationEn: "217 Hz TDMA pulse",
    modulationFi: "217 Hz:n TDMA-pulssi",
  },
  {
    id: "gsm1800",
    label: "GSM1800",
    frequency: "1,800 MHz",
    modulationEn: "217 Hz TDMA pulse",
    modulationFi: "217 Hz:n TDMA-pulssi",
  },
  {
    id: "umts",
    label: "UMTS",
    frequency: "2,100 MHz",
    modulationEn: "CDMA, near-continuous",
    modulationFi: "CDMA, lähes jatkuva",
  },
  {
    id: "lte",
    label: "LTE",
    frequency: "700–2,600 MHz",
    modulationEn: "OFDM, 1 ms subframe",
    modulationFi: "OFDM, 1 ms:n alikehys",
  },
  {
    id: "5g-nr",
    label: "5G NR",
    frequency: "3.5 GHz / mmWave",
    modulationEn: "OFDM and eDRX",
    modulationFi: "OFDM ja eDRX",
  },
  {
    id: "wifi",
    label: "Wi-Fi",
    frequency: "2.4 / 5 GHz",
    modulationEn: "Bursty",
    modulationFi: "Purskeinen",
  },
] as const;

type TechnologyId = (typeof TECHNOLOGIES)[number]["id"];

/**
 * These are UI starting points copied or interpolated from the supplied
 * implementation note. They are deliberately not exported as model data.
 */
const ILLUSTRATIVE_DEFAULTS: Record<TechnologyId, Factors> = {
  am: { sar: 0.65, vgcc: 0.55, modulation: 0.3 },
  fm: { sar: 0.9, vgcc: 0.3, modulation: 0.2 },
  gsm900: { sar: 0.45, vgcc: 0.8, modulation: 1 },
  gsm1800: { sar: 0.35, vgcc: 0.72, modulation: 1 },
  umts: { sar: 0.3, vgcc: 0.65, modulation: 0.5 },
  lte: { sar: 0.28, vgcc: 0.6, modulation: 0.7 },
  "5g-nr": { sar: 0.18, vgcc: 0.52, modulation: 0.7 },
  wifi: { sar: 0.22, vgcc: 0.58, modulation: 0.4 },
};

const EN = {
  title: "Frequency-weight scenario explorer",
  intro:
    "Explore how three bounded candidate factors combine multiplicatively. This is a transparent arithmetic sandbox, not a dosimetry result or evidence of biological effect.",
  status: "Epistemic status",
  scenario: "ILLUSTRATIVE_SCENARIO",
  openL2: "L2: OPEN",
  imported: "IMPORTED_CANDIDATE_FACTORS",
  boundary:
    "SAR_norm, VGCC_coupling, and MOD_envelope are imported candidate factors. Their product is not derived from Lindgren geometry. The starting values are illustrative, not measured, estimated, or calibrated values.",
  technology: "Technology",
  frequency: "Carrier / band",
  modulation: "Modulation description",
  factors: "Adjust all three factors",
  sar: "Normalized SAR candidate",
  sarShort: "SAR_norm",
  vgcc: "VGCC coupling candidate",
  vgccShort: "VGCC_coupling",
  envelope: "Envelope-modulation candidate",
  envelopeShort: "MOD_envelope",
  result: "Composite scenario weight",
  formula: "Multiplicative candidate formula",
  comparison: "Technology comparison",
  comparisonNote:
    "Every row uses editable illustrative inputs. Selecting a row opens its three factors above.",
  select: "Edit",
  selected: "Selected",
  reset: "Reset illustrative values",
  resetHint: "Reset restores all eight profiles to their illustrative starting points.",
  zeroToOne: "Range 0 to 1",
};

type Copy = typeof EN;

const FI: Copy = {
  title: "Taajuuspainon skenaariotutkija",
  intro:
    "Tutki, miten kolme rajattua ehdokastekijää yhdistyy kertolaskuna. Tämä on läpinäkyvä laskennallinen hiekkalaatikko, ei dosimetriatulos eikä näyttö biologisesta vaikutuksesta.",
  status: "Episteeminen tila",
  scenario: "ILLUSTRATIVE_SCENARIO",
  openL2: "L2: OPEN",
  imported: "IMPORTED_CANDIDATE_FACTORS",
  boundary:
    "SAR_norm, VGCC_coupling ja MOD_envelope ovat tuotuja ehdokastekijöitä. Niiden tuloa ei ole johdettu Lindgrenin geometriasta. Lähtöarvot ovat havainnollistavia, eivät mitattuja, estimoituja tai kalibroituja arvoja.",
  technology: "Teknologia",
  frequency: "Kantotaajuus / kaista",
  modulation: "Modulaation kuvaus",
  factors: "Säädä kaikkia kolmea tekijää",
  sar: "Normalisoidun SAR:n ehdokas",
  sarShort: "SAR_norm",
  vgcc: "VGCC-kytkennän ehdokas",
  vgccShort: "VGCC_coupling",
  envelope: "Verhokäyrämodulaation ehdokas",
  envelopeShort: "MOD_envelope",
  result: "Yhdistetty skenaariopaino",
  formula: "Multiplikatiivinen ehdokaskaava",
  comparison: "Teknologioiden vertailu",
  comparisonNote:
    "Jokainen rivi käyttää muokattavia havainnollistavia syötteitä. Valitse rivi avataksesi sen kolme tekijää ylle.",
  select: "Muokkaa",
  selected: "Valittu",
  reset: "Palauta havainnollistavat arvot",
  resetHint: "Palautus asettaa kaikki kahdeksan profiilia havainnollistaviin lähtöarvoihinsa.",
  zeroToOne: "Vaihteluväli 0–1",
};

const COPY: Record<string, Partial<Copy>> = {
  en: EN,
  fi: FI,
  ja: {},
  fr: {},
  ko: {},
};

function freshDefaults(): Record<TechnologyId, Factors> {
  return Object.fromEntries(
    TECHNOLOGIES.map(({ id }) => [id, { ...ILLUSTRATIVE_DEFAULTS[id] }]),
  ) as Record<TechnologyId, Factors>;
}

function product({ sar, vgcc, modulation }: Factors): number {
  return sar * vgcc * modulation;
}

function FactorSlider({
  id,
  label,
  symbol,
  value,
  onChange,
  rangeLabel,
}: {
  id: string;
  label: string;
  symbol: string;
  value: number;
  onChange: (value: number) => void;
  rangeLabel: string;
}) {
  return (
    <div className="rounded-lg border p-3" style={{ borderColor: "var(--border)" }}>
      <div className="mb-2 flex items-start justify-between gap-3">
        <label htmlFor={id} className="text-sm font-medium">
          {label}
          <span
            className="mt-0.5 block font-mono text-xs font-normal"
            style={{ color: "var(--foreground-muted)" }}
          >
            {symbol}
          </span>
        </label>
        <output htmlFor={id} className="font-mono text-base tabular-nums">
          {value.toFixed(2)}
        </output>
      </div>
      <input
        id={id}
        className="w-full accent-[var(--accent)]"
        type="range"
        min={0}
        max={1}
        step={0.01}
        value={value}
        aria-valuetext={`${value.toFixed(2)}; ${rangeLabel}`}
        onChange={(event) => onChange(Number(event.currentTarget.value))}
      />
    </div>
  );
}

function WeightBar({
  value,
  label,
  emphasized = false,
}: {
  value: number;
  label: string;
  emphasized?: boolean;
}) {
  const percentage = value * 100;
  return (
    <div
      className={`h-3 overflow-hidden rounded-full ${emphasized ? "ring-1 ring-[var(--accent)]" : ""}`}
      style={{ background: "color-mix(in srgb, var(--foreground-muted) 18%, transparent)" }}
      role="progressbar"
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={1}
      aria-valuenow={Number(value.toFixed(4))}
      aria-valuetext={value.toFixed(3)}
    >
      <div
        className="h-full rounded-full transition-[width] duration-200 motion-reduce:transition-none"
        style={{
          width: `${percentage}%`,
          background: emphasized ? "var(--accent)" : "var(--chart-series-3)",
        }}
      />
    </div>
  );
}

export function FrequencyWeightsExplorer({ locale }: { locale: string }) {
  const t = pickCopy(COPY, locale) as Copy;
  const id = useId();
  const [selectedId, setSelectedId] = useState<TechnologyId>("gsm900");
  const [profiles, setProfiles] = useState<Record<TechnologyId, Factors>>(
    freshDefaults,
  );

  const selectedTechnology = TECHNOLOGIES.find(
    (technology) => technology.id === selectedId,
  )!;
  const selectedFactors = profiles[selectedId];
  const selectedWeight = product(selectedFactors);
  const isFinnish = locale === "fi";

  function updateFactor(key: keyof Factors, value: number) {
    setProfiles((current) => ({
      ...current,
      [selectedId]: { ...current[selectedId], [key]: value },
    }));
  }

  function reset() {
    setProfiles(freshDefaults());
  }

  return (
    <section className="space-y-6" aria-labelledby={`${id}-title`}>
      <header>
        <h2 id={`${id}-title`} className="text-xl font-semibold">
          {t.title}
        </h2>
        <p className="mt-2 max-w-3xl text-sm" style={{ color: "var(--foreground-muted)" }}>
          {t.intro}
        </p>
      </header>

      <aside
        className="rounded-xl border p-4"
        style={{
          borderColor: "var(--chart-series-2)",
          background: "color-mix(in srgb, var(--chart-series-2) 8%, transparent)",
        }}
        aria-labelledby={`${id}-status`}
      >
        <p id={`${id}-status`} className="text-xs font-semibold uppercase tracking-[0.12em]">
          {t.status}
        </p>
        <div className="mt-2 flex flex-wrap gap-2">
          {[t.scenario, t.openL2, t.imported].map((item) => (
            <span
              key={item}
              className="rounded-full border px-2.5 py-1 font-mono text-xs"
              style={{ borderColor: "var(--border)" }}
            >
              {item}
            </span>
          ))}
        </div>
        <p className="mt-3 max-w-4xl text-sm" style={{ color: "var(--foreground-muted)" }}>
          {t.boundary}
        </p>
      </aside>

      <div className="grid gap-4 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        <div
          className="rounded-xl border p-4"
          style={{ borderColor: "var(--border)", background: "var(--background-secondary)" }}
        >
          <label htmlFor={`${id}-technology`} className="text-sm font-semibold">
            {t.technology}
          </label>
          <select
            id={`${id}-technology`}
            className="mt-2 w-full rounded-lg border bg-transparent px-3 py-2 text-sm"
            style={{ borderColor: "var(--border)" }}
            value={selectedId}
            onChange={(event) => setSelectedId(event.currentTarget.value as TechnologyId)}
          >
            {TECHNOLOGIES.map((technology) => (
              <option key={technology.id} value={technology.id}>
                {technology.label}
              </option>
            ))}
          </select>

          <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
            <div>
              <dt style={{ color: "var(--foreground-muted)" }}>{t.frequency}</dt>
              <dd className="mt-1 font-mono">{selectedTechnology.frequency}</dd>
            </div>
            <div>
              <dt style={{ color: "var(--foreground-muted)" }}>{t.modulation}</dt>
              <dd className="mt-1">
                {isFinnish
                  ? selectedTechnology.modulationFi
                  : selectedTechnology.modulationEn}
              </dd>
            </div>
          </dl>
        </div>

        <div
          className="rounded-xl border p-4"
          style={{ borderColor: "var(--border)", background: "var(--background-secondary)" }}
        >
          <p className="text-sm font-semibold">{t.formula}</p>
          <p className="mt-3 overflow-x-auto whitespace-nowrap font-mono text-sm sm:text-base">
            w_L = SAR_norm × VGCC_coupling × MOD_envelope
          </p>
          <p className="mt-3 font-mono text-xs" style={{ color: "var(--foreground-muted)" }}>
            {selectedFactors.sar.toFixed(2)} × {selectedFactors.vgcc.toFixed(2)} ×{" "}
            {selectedFactors.modulation.toFixed(2)} = {selectedWeight.toFixed(3)}
          </p>
        </div>
      </div>

      <fieldset>
        <legend className="mb-3 text-base font-semibold">{t.factors}</legend>
        <div className="grid gap-3 md:grid-cols-3">
          <FactorSlider
            id={`${id}-sar`}
            label={t.sar}
            symbol={t.sarShort}
            value={selectedFactors.sar}
            rangeLabel={t.zeroToOne}
            onChange={(value) => updateFactor("sar", value)}
          />
          <FactorSlider
            id={`${id}-vgcc`}
            label={t.vgcc}
            symbol={t.vgccShort}
            value={selectedFactors.vgcc}
            rangeLabel={t.zeroToOne}
            onChange={(value) => updateFactor("vgcc", value)}
          />
          <FactorSlider
            id={`${id}-modulation`}
            label={t.envelope}
            symbol={t.envelopeShort}
            value={selectedFactors.modulation}
            rangeLabel={t.zeroToOne}
            onChange={(value) => updateFactor("modulation", value)}
          />
        </div>
      </fieldset>

      <div
        className="rounded-xl border p-4"
        style={{ borderColor: "var(--accent)" }}
        aria-live="polite"
      >
        <div className="flex items-baseline justify-between gap-4">
          <div>
            <p className="text-sm font-semibold">{t.result}</p>
            <p className="mt-1 text-xs font-mono" style={{ color: "var(--foreground-muted)" }}>
              {t.scenario} · {selectedTechnology.label}
            </p>
          </div>
          <output className="font-mono text-3xl font-semibold tabular-nums">
            {selectedWeight.toFixed(3)}
          </output>
        </div>
        <div className="mt-4">
          <WeightBar
            value={selectedWeight}
            label={`${selectedTechnology.label} ${t.result}: ${selectedWeight.toFixed(3)}`}
            emphasized
          />
        </div>
      </div>

      <div>
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h3 className="font-semibold">{t.comparison}</h3>
            <p className="mt-1 max-w-2xl text-sm" style={{ color: "var(--foreground-muted)" }}>
              {t.comparisonNote}
            </p>
            <p className="mt-1 font-mono text-xs">{t.scenario}</p>
          </div>
          <button
            type="button"
            className="rounded-lg border px-3 py-2 text-sm font-medium hover:bg-[var(--background-secondary)]"
            style={{ borderColor: "var(--border)" }}
            onClick={reset}
            title={t.resetHint}
          >
            {t.reset}
          </button>
        </div>

        <ul className="mt-4 space-y-2">
          {TECHNOLOGIES.map((technology) => {
            const value = product(profiles[technology.id]);
            const selected = technology.id === selectedId;
            return (
              <li key={technology.id}>
                <button
                  type="button"
                  className="grid w-full grid-cols-[7rem_minmax(0,1fr)_4rem] items-center gap-3 rounded-lg border px-3 py-3 text-left transition-colors hover:bg-[var(--background-secondary)] sm:grid-cols-[8rem_8rem_minmax(0,1fr)_4rem]"
                  style={{
                    borderColor: selected ? "var(--accent)" : "var(--border)",
                    background: selected
                      ? "color-mix(in srgb, var(--accent) 7%, transparent)"
                      : undefined,
                  }}
                  aria-pressed={selected}
                  onClick={() => setSelectedId(technology.id)}
                >
                  <span className="font-medium">{technology.label}</span>
                  <span
                    className="hidden font-mono text-xs sm:block"
                    style={{ color: "var(--foreground-muted)" }}
                  >
                    {technology.frequency}
                  </span>
                  <WeightBar
                    value={value}
                    label={`${technology.label} ${t.result}: ${value.toFixed(3)}`}
                    emphasized={selected}
                  />
                  <span className="text-right font-mono text-sm tabular-nums">
                    {value.toFixed(3)}
                    <span className="sr-only"> · {selected ? t.selected : t.select}</span>
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
