import { StudyCitation } from "@/components/StudyCitation";
import { pickCopy } from "@/lib/i18n";

const COPY = {
  fi: {
    badge: "Mitattu havaintokynnys · Kursawe 2021",
    title: "Kenttien yhdistelmä muuttaa havaintokynnystä",
    lead: "Kiinteän vaihtokentän rinnalla kentän tietoiseen havaitsemiseen liittyvä DC-kynnys oli alempi. Palkit näyttävät tutkimuksen keskimääräiset kynnykset eri protokollissa.",
    labels: ["Staattinen kenttä (DC)", "Vaihtokenttä (50 Hz AC)", "Yhdistelmä: DC-komponentti"],
    fixedAC: "Lisäksi kiinteä 50 Hz AC: 4 kV/m.",
    hybridScope: "Palkki näyttää vain DC-komponentin, ei yhdistelmän kokonaiskenttää tai RMS-arvoa.",
    scale: "Palkin kuvaama kenttäkomponentti, kV/m",
    sample: "Kynnysarvo määritettävissä",
    caption: "Kaksoissokkoutettu koe, 203 osallistujaa; signaalinilmaisuteoriaan perustuvat keskiarvot 50 %:n suhteellisessa kosteudessa (taulukko 3). Osajoukot eroavat, koska jokaiselle osallistujalle ei saatu kynnysarvoa kaikissa protokollissa. Päätemuuttuja on tietoinen sähkökentän havaitseminen, ei gonadivaurio.",
    source: "Kursawe ym. (2021), taulukko 3",
  },
  en: {
    badge: "Measured detection threshold · Kursawe 2021",
    title: "Combining fields changes the detection threshold",
    lead: "Alongside a fixed alternating field, the DC threshold for conscious field detection was lower. The bars show the study’s mean thresholds under different protocols.",
    labels: ["Static field (DC)", "Alternating field (50 Hz AC)", "Combined: DC component"],
    fixedAC: "Plus a fixed 50 Hz AC field: 4 kV/m.",
    hybridScope: "The bar shows only the DC component, not the combined total field or RMS value.",
    scale: "Field component shown by the bar, kV/m",
    sample: "Threshold could be determined",
    caption: "Double-blind experiment, 203 participants; signal-detection mean thresholds at 50% relative humidity (Table 3). Subsets differ because a threshold could not be determined for every participant under every protocol. The endpoint is conscious electric-field detection, not gonadal injury.",
    source: "Kursawe et al. (2021), Table 3",
  },
  ja: {}, fr: {}, ko: {},
};

// Published Table 3 means; hybrid value is its DC component only.
const THRESHOLDS = [
  { id: "dc", mean: 18.69, n: 165 },
  { id: "ac-50hz", mean: 14.16, n: 175 },
  { id: "hybrid-dc", mean: 6.76, n: 168 },
] as const;

export function CombinedFieldThresholdFigure({ locale }: { locale: string }) {
  const c = pickCopy({ en: COPY.en, fi: COPY.fi }, locale);
  const number = (value: number) => value.toFixed(2).replace(".", locale === "fi" ? "," : ".");
  return <figure id="combined-field-thresholds" aria-label={c.title} className="my-8 min-w-0 rounded-xl border border-card-border bg-figure-bg p-5 sm:p-7">
    <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-accent">{c.badge}</p>
    <h3 className="font-serif text-2xl leading-snug">{c.title}</h3>
    <p className="mt-3 text-base leading-7 text-foreground-muted">{c.lead}</p>
    <dl className="mt-6 space-y-6">
      {THRESHOLDS.map((row, index) => <div key={row.id} data-threshold-protocol={row.id} className="min-w-0">
        <dt className="text-base font-semibold leading-6">{c.labels[index]}</dt>
        <dd className="mt-1">
          <div className="mb-2 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
            <span className="font-mono text-lg tabular-nums">{number(row.mean)} kV/m</span>
            <span className="text-xs leading-5 text-foreground-muted" title={c.sample}>n = {row.n}</span>
          </div>
          <svg viewBox="0 0 20 1.3" preserveAspectRatio="none" aria-hidden="true" focusable="false" className="block h-5 w-full overflow-visible">
            <rect x="0" y="0" width="20" height="1.3" fill="var(--foreground-muted)" opacity="0.1" />
            {[5, 10, 15].map(tick => <line key={tick} x1={tick} x2={tick} y1="0" y2="1.3" stroke="var(--foreground-muted)" strokeOpacity="0.2" strokeWidth="0.04" />)}
            <rect data-threshold-bar="" x="0" y="0.15" width={row.mean} height="1" fill={index === 2 ? "var(--chart-series-2)" : "var(--chart-series-1)"} />
          </svg>
          {index === 2 && <div className="mt-3 space-y-1 text-sm leading-6">
            <p className="font-semibold">{c.fixedAC}</p>
            <p className="text-foreground-muted">{c.hybridScope}</p>
          </div>}
        </dd>
      </div>)}
    </dl>
    <div className="mt-3 text-xs leading-5 text-foreground-muted" aria-hidden="true">
      <div className="flex justify-between font-mono tabular-nums">{[0, 5, 10, 15, 20].map(tick => <span key={tick}>{tick}</span>)}</div>
      <p className="mt-1">{c.scale}</p>
    </div>
    <figcaption className="mt-6 space-y-3 border-t border-card-border pt-4 text-sm leading-6 text-foreground-muted">
      <p>{c.caption}</p>
      <StudyCitation referenceId="kursawe2021_combined_fields" locale={locale} label={c.source} />
    </figcaption>
  </figure>;
}
