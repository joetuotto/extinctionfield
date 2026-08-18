import { LOCKED_PREDICTIONS } from "@/lib/predictions";
import type { LockedPrediction, PredictionVersion } from "@/lib/types";
import type { Metadata } from "next";
import type { Locale } from "@/lib/i18n";

const t = {
  en: {
    title: "Prediction Registry",
    subtitle:
      "Each prediction below is locked: timestamped, versioned, and immutable. When observed data becomes available, predictions are scored as confirmed (observed value within CI), refuted (outside CI), or partial.",
    pending: "Pending",
    confirmed: "Confirmed",
    refuted: "Refuted",
    partial: "Partial",
    targetYear: "Target year",
    locked: "Locked",
    model: "Model",
    gitSha: "Git SHA",
    immutability:
      "CI is locked at first version. If future observations fall outside the confidence interval, the model is falsified.",
    versionHistory: "Version history",
    methodology:
      "Methodology: Confidence intervals are derived from the BERM model using Monte Carlo simulation over parameter uncertainty. CI bounds are locked at the first version and never widened. Central estimates may be updated when the model structure improves (documented transparently in version history). Predictions are evaluated against official statistical sources (UN, World Bank, national statistics offices).",
  },
  fi: {
    title: "Ennusterekisteri",
    subtitle:
      "Jokainen alla oleva ennuste on lukittu: aikaleimatttu, versioitu ja muuttumaton. Kun havaintodata tulee saataville, ennusteet pisteytetään vahvistetuiksi (havaittu arvo luottamusvälin sisällä), kumotuiksi (välin ulkopuolella) tai osittaisiksi.",
    pending: "Odottaa",
    confirmed: "Vahvistettu",
    refuted: "Kumottu",
    partial: "Osittainen",
    targetYear: "Tavoitevuosi",
    locked: "Lukittu",
    model: "Malli",
    gitSha: "Git SHA",
    immutability:
      "Luottamusväli lukitaan ensimmäisessä versiossa. Jos tulevat havainnot jäävät luottamusvälin ulkopuolelle, malli falsifioidaan.",
    versionHistory: "Versiohistoria",
    methodology:
      "Menetelmä: Luottamusvälit johdetaan BERM-mallista Monte Carlo -simulaatiolla parametriepävarmuuden yli. Luottamusvälin rajat lukitaan ensimmäisessä versiossa eikä niitä laajenneta. Keskiarvioita voidaan päivittää mallirakenteen parantuessa (dokumentoidaan läpinäkyvästi versiohistoriassa). Ennusteita arvioidaan virallisia tilastolähteitä vasten (YK, Maailmanpankki, kansalliset tilastovirastot).",
  },
} as const;

const statusLabels = {
  en: { pending: "Pending", confirmed: "Confirmed", refuted: "Refuted", partial: "Partial" },
  fi: { pending: "Odottaa", confirmed: "Vahvistettu", refuted: "Kumottu", partial: "Osittainen" },
} as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return locale === "fi"
    ? {
        title: "Ennusterekisteri - Extinction Field",
        description:
          "Lukitut, falsifioitavat ennusteet BERM-mallista. Jokainen ennuste on aikaleimatttu eikä sitä voi muokata.",
      }
    : {
        title: "Prediction Registry - Extinction Field",
        description:
          "Locked, falsifiable predictions from the BERM model. Each prediction is timestamped and cannot be modified.",
      };
}

function StatusBadge({
  status,
  locale,
}: {
  status: LockedPrediction["status"];
  locale: string;
}) {
  const styles: Record<LockedPrediction["status"], string> = {
    pending: "bg-status-pending/20 text-status-pending",
    confirmed: "bg-status-confirmed/20 text-status-confirmed",
    refuted: "bg-status-refuted/20 text-status-refuted",
    partial: "bg-status-partial/20 text-status-partial",
  };
  const labels = locale === "fi" ? statusLabels.fi : statusLabels.en;

  return (
    <span
      className={`inline-block text-xs font-medium px-2 py-0.5 rounded ${styles[status]}`}
    >
      {labels[status]}
    </span>
  );
}

function CIBar({
  ciLow,
  ciHigh,
  central,
  min,
  max,
}: {
  ciLow: number;
  ciHigh: number;
  central: number;
  min: number;
  max: number;
}) {
  const range = max - min;
  if (range <= 0) return null;

  const leftPct = ((ciLow - min) / range) * 100;
  const widthPct = ((ciHigh - ciLow) / range) * 100;
  const centerPct = ((central - min) / range) * 100;

  return (
    <div className="relative w-full h-3 bg-ci-bar-bg rounded-full mt-3">
      <div
        className="absolute top-0 h-full bg-ci-bar-fill/40 rounded-full"
        style={{ left: `${leftPct}%`, width: `${widthPct}%` }}
      />
      <div
        className="absolute top-0 h-full w-0.5 bg-ci-bar-center rounded-full"
        style={{ left: `${centerPct}%` }}
      />
      <div className="flex justify-between mt-1.5 text-[10px] text-foreground-muted font-mono-num">
        <span>{min.toFixed(min < 10 ? 2 : 0)}</span>
        <span>{max.toFixed(max < 10 ? 2 : 0)}</span>
      </div>
    </div>
  );
}

function PredictionCard({
  prediction,
  locale,
}: {
  prediction: LockedPrediction;
  locale: string;
}) {
  const d = locale === "fi" ? t.fi : t.en;
  const range = prediction.ciHigh - prediction.ciLow;
  const barMin = Math.max(0, prediction.ciLow - range * 0.5);
  const barMax = prediction.ciHigh + range * 0.5;

  return (
    <div className="border border-card-border bg-card-bg rounded-lg p-6 flex flex-col">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-base font-semibold">
            {prediction.countryLabel}
          </h3>
          <p className="text-sm text-foreground-muted">
            {prediction.metricLabel}
          </p>
        </div>
        <StatusBadge status={prediction.status} locale={locale} />
      </div>

      <div className="mb-2">
        <span className="text-3xl font-bold font-mono-num">
          {prediction.central.toFixed(2)}
        </span>
        <span className="text-sm text-foreground-muted ml-2">
          {prediction.unit}
        </span>
      </div>

      <p className="text-sm text-foreground-muted font-mono-num">
        95% CI [{prediction.ciLow.toFixed(2)}, {prediction.ciHigh.toFixed(2)}]
      </p>

      <CIBar
        ciLow={prediction.ciLow}
        ciHigh={prediction.ciHigh}
        central={prediction.central}
        min={barMin}
        max={barMax}
      />

      <div className="mt-auto pt-4 border-t border-border text-xs text-foreground-muted space-y-1">
        <div className="flex justify-between">
          <span>{d.targetYear}</span>
          <span className="font-mono-num">{prediction.year}</span>
        </div>
        <div className="flex justify-between">
          <span>{d.locked}</span>
          <span className="font-mono-num">{prediction.lockedDate}</span>
        </div>
        <div className="flex justify-between">
          <span>{d.model}</span>
          <span className="font-mono-num">{prediction.modelVersion}</span>
        </div>
        {prediction.gitSha && (
          <div className="flex justify-between">
            <span>{d.gitSha}</span>
            <span className="font-mono-num">{prediction.gitSha}</span>
          </div>
        )}
      </div>

      {/* Version history */}
      {prediction.history && prediction.history.length > 1 && (
        <div className="mt-3 pt-3 border-t border-border">
          <p className="text-[10px] font-semibold text-foreground-muted mb-1.5">
            {d.versionHistory}
          </p>
          <div className="space-y-1.5">
            {prediction.history.map((v: PredictionVersion) => (
              <div
                key={v.version}
                className="text-[10px] text-foreground-muted"
              >
                <span className="font-mono-num font-medium">
                  {v.version}
                </span>
                {" "}
                <span className="font-mono-num">{v.central.toFixed(2)}</span>
                <span className="ml-1 text-foreground-muted/60">
                  [{v.ci[0].toFixed(2)}, {v.ci[1].toFixed(2)}]
                </span>
                {v.changeReason !== "initial lock" && (
                  <span className="block mt-0.5 italic text-foreground-muted/70 leading-tight">
                    {v.changeReason}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      <p className="mt-3 text-[10px] text-foreground-muted italic">
        {d.immutability}
      </p>
    </div>
  );
}

export default async function PredictionsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const d = locale === "fi" ? t.fi : t.en;

  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <header className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight mb-3">{d.title}</h1>
        <p className="text-foreground-muted max-w-2xl leading-relaxed">
          {d.subtitle}
        </p>
      </header>

      <div className="flex flex-wrap gap-4 mb-8 text-xs text-foreground-muted">
        <div className="flex items-center gap-1.5">
          <span className="inline-block w-2.5 h-2.5 rounded-full bg-status-pending" />
          {d.pending}
        </div>
        <div className="flex items-center gap-1.5">
          <span className="inline-block w-2.5 h-2.5 rounded-full bg-status-confirmed" />
          {d.confirmed}
        </div>
        <div className="flex items-center gap-1.5">
          <span className="inline-block w-2.5 h-2.5 rounded-full bg-status-refuted" />
          {d.refuted}
        </div>
        <div className="flex items-center gap-1.5">
          <span className="inline-block w-2.5 h-2.5 rounded-full bg-status-partial" />
          {d.partial}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {LOCKED_PREDICTIONS.map((prediction) => (
          <PredictionCard
            key={prediction.id}
            prediction={prediction}
            locale={locale}
          />
        ))}
      </div>

      <section className="mt-12 border-t border-border pt-8">
        <p className="text-xs text-foreground-muted leading-relaxed max-w-3xl">
          {d.methodology}
        </p>
      </section>
    </div>
  );
}
