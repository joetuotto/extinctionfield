"use client";

import Link from "next/link";
import { LOCKED_PREDICTIONS } from "@/lib/predictions";
import series from "@/lib/sentinelCascadeSeries.json";

/** Prediction records key countries by name; the map keys them by ISO3. */
const ISO3_TO_PREDICTION_COUNTRY: Record<string, string> = {
  FIN: "Finland",
  KOR: "SouthKorea",
  USA: "USA",
  JPN: "Japan",
  BRA: "Brazil",
};

const SENTINEL_PANEL = new Set(series.panel);

interface Props {
  iso3: string;
  name: string;
  tfr: Record<string, number>;
  mobile: Record<string, number>;
  locale: string;
}

interface Series {
  year: number;
  value: number;
}

function toSeries(record: Record<string, number>): Series[] {
  return Object.entries(record)
    .map(([year, value]) => ({ year: Number(year), value }))
    .filter((p) => Number.isFinite(p.year) && Number.isFinite(p.value))
    .sort((a, b) => a.year - b.year);
}

function Chart({
  compact,
  fi,
  tfr,
  mobile,
  prediction,
}: {
  compact: boolean;
  fi: boolean;
  tfr: Series[];
  mobile: Series[];
  prediction: (typeof LOCKED_PREDICTIONS)[number] | undefined;
}) {
  const W = compact ? 360 : 560;
  const H = compact ? 210 : 200;
  const pad = compact
    ? { top: 16, right: 34, bottom: 34, left: 34 }
    : { top: 16, right: 44, bottom: 32, left: 40 };
  const cw = W - pad.left - pad.right;
  const ch = H - pad.top - pad.bottom;
  const font = 11;

  const lastYear = tfr.length ? tfr[tfr.length - 1].year : 2024;
  const xMin = 1960;
  const xMax = Math.max(lastYear, prediction?.year ?? lastYear);
  const sx = (y: number) => pad.left + ((y - xMin) / (xMax - xMin)) * cw;

  const tfrMax = Math.max(...tfr.map((p) => p.value), prediction?.ciHigh ?? 0, 1) * 1.1;
  const syTfr = (v: number) => pad.top + ch - (v / tfrMax) * ch;
  const mobileMax = Math.max(...mobile.map((p) => p.value), 1) * 1.1;
  const syMobile = (v: number) => pad.top + ch - (v / mobileMax) * ch;

  const path = (points: Series[], sy: (v: number) => number) =>
    points
      .map((p, i) => `${i === 0 ? "M" : "L"} ${sx(p.year).toFixed(1)} ${sy(p.value).toFixed(1)}`)
      .join(" ");

  const xTicks = compact ? [1960, 1990, 2020] : [1960, 1980, 2000, 2020];
  const lastTfr = tfr.length ? tfr[tfr.length - 1] : null;

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className={
        compact
          ? "chart-svg h-auto w-full min-w-[360px]"
          : "chart-svg mx-auto h-auto w-full min-w-[560px] max-w-[560px]"
      }
      role="img"
      aria-label={
        fi
          ? "TFR-aikasarja ja mobiililiittymien penetraatio"
          : "TFR time series with mobile subscription penetration"
      }
    >
      {/* baseline only — no background grid */}
      <line
        x1={pad.left}
        y1={pad.top + ch}
        x2={W - pad.right}
        y2={pad.top + ch}
        className="chart-axis-line"
        strokeWidth={1}
      />
      {xTicks.map((t) => (
        <text
          key={t}
          x={sx(t)}
          y={pad.top + ch + 15}
          fill="var(--foreground-muted)"
          fontSize={font}
          textAnchor="middle"
          fontFamily="var(--font-mono)"
        >
          {t}
        </text>
      ))}

      {/* replacement level, the reference the reader actually needs */}
      <line
        x1={pad.left}
        y1={syTfr(2.1)}
        x2={W - pad.right}
        y2={syTfr(2.1)}
        stroke="var(--foreground-muted)"
        strokeWidth={1}
        strokeDasharray="3,4"
        opacity={0.4}
      />
      <text
        x={pad.left + 2}
        y={syTfr(2.1) - 4}
        fill="var(--foreground-muted)"
        fontSize={font - 1}
        opacity={0.8}
        paintOrder="stroke"
        stroke="var(--figure-bg)"
        strokeWidth={3}
        strokeLinejoin="round"
      >
        2.1
      </text>

      {mobile.length > 1 && (
        <path d={path(mobile, syMobile)} fill="none" stroke="var(--status-partial)" strokeWidth={1.5}
          strokeLinecap="round" strokeLinejoin="round" opacity={0.75} />
      )}
      {tfr.length > 1 && (
        <path d={path(tfr, syTfr)} fill="none" stroke="var(--accent)" strokeWidth={2}
          strokeLinecap="round" strokeLinejoin="round" />
      )}

      {/* locked prediction: sensitivity envelope, then the central value */}
      {prediction && lastTfr && (
        <g>
          <title>
            {`${prediction.year}: ${prediction.central.toFixed(2)} [${prediction.ciLow.toFixed(2)}–${prediction.ciHigh.toFixed(2)}] · ${prediction.modelVersion}`}
          </title>
          <line
            x1={sx(lastTfr.year)}
            y1={syTfr(lastTfr.value)}
            x2={sx(prediction.year)}
            y2={syTfr(prediction.central)}
            stroke="var(--accent)"
            strokeWidth={1.5}
            strokeDasharray="5,4"
            opacity={0.7}
          />
          <line
            x1={sx(prediction.year)}
            y1={syTfr(prediction.ciLow)}
            x2={sx(prediction.year)}
            y2={syTfr(prediction.ciHigh)}
            stroke="var(--status-confirmed)"
            strokeWidth={1}
            opacity={0.7}
          />
          <path
            d={`M ${sx(prediction.year)} ${syTfr(prediction.central) - 5} L ${sx(prediction.year) + 5} ${syTfr(prediction.central)} L ${sx(prediction.year)} ${syTfr(prediction.central) + 5} L ${sx(prediction.year) - 5} ${syTfr(prediction.central)} Z`}
            fill="var(--status-confirmed)"
          />
        </g>
      )}

      {/* axis values: TFR on the left, mobile on the right */}
      <text x={pad.left - 5} y={pad.top + 8} fill="var(--accent)" fontSize={font} textAnchor="end" fontFamily="var(--font-mono)">
        {tfrMax.toFixed(1)}
      </text>
      <text x={pad.left - 5} y={pad.top + ch} fill="var(--accent)" fontSize={font} textAnchor="end" fontFamily="var(--font-mono)">
        0
      </text>
      <text x={W - pad.right + 5} y={pad.top + 8} fill="var(--status-partial)" fontSize={font} fontFamily="var(--font-mono)">
        {mobileMax.toFixed(0)}
      </text>
      <text x={W - pad.right + 5} y={pad.top + ch} fill="var(--status-partial)" fontSize={font} fontFamily="var(--font-mono)">
        0
      </text>
    </svg>
  );
}

export function CountryDetailPanel({ iso3, name, tfr, mobile, locale }: Props) {
  const fi = locale === "fi";
  const tfrSeries = toSeries(tfr);
  const mobileSeries = toSeries(mobile);
  const predictionCountry = ISO3_TO_PREDICTION_COUNTRY[iso3];
  const prediction = LOCKED_PREDICTIONS.find(
    (p) => p.country === predictionCountry && p.metric === "TFR",
  );
  const inSentinelPanel = SENTINEL_PANEL.has(iso3);
  const latest = tfrSeries.length ? tfrSeries[tfrSeries.length - 1] : null;
  const latestMobile = mobileSeries.length ? mobileSeries[mobileSeries.length - 1] : null;

  if (!tfrSeries.length && !mobileSeries.length) {
    return (
      <div className="rounded-lg border border-card-border bg-card-bg p-4 text-sm text-foreground-muted">
        {fi ? `${name}: ei julkaistua sarjaa.` : `${name}: no published series.`}
      </div>
    );
  }

  return (
    <section className="chart-surface">
      <div className="chart-surface__header">
        <h3 className="min-w-0 text-base font-semibold">{name}</h3>
        {latest && (
          <span className="font-mono-num text-sm text-accent">
            TFR {latest.value.toFixed(2)}{" "}
            <span className="text-foreground-muted">({latest.year})</span>
          </span>
        )}
        {latestMobile && (
          <span className="font-mono-num text-xs text-status-partial">
            {fi ? "mobiili" : "mobile"} {latestMobile.value.toFixed(0)}/100{" "}
            <span className="text-foreground-muted">({latestMobile.year})</span>
          </span>
        )}
      </div>

      <div className="chart-scroll sm:hidden">
        <Chart compact fi={fi} tfr={tfrSeries} mobile={mobileSeries} prediction={prediction} />
      </div>
      <div className="chart-scroll hidden sm:block">
        <Chart compact={false} fi={fi} tfr={tfrSeries} mobile={mobileSeries} prediction={prediction} />
      </div>

      <ul className="chart-legend mt-2">
        <li className="chart-key">
          <span className="h-0.5 w-3 shrink-0 bg-accent" />
          {fi ? "TFR (Maailmanpankki)" : "TFR (World Bank)"}
        </li>
        <li className="chart-key">
          <span className="h-0.5 w-3 shrink-0 bg-status-partial" />
          {fi ? "Mobiililiittymät / 100" : "Mobile subscriptions / 100"}
        </li>
        {prediction && (
          <li className="chart-key">
            <span className="h-2 w-2 shrink-0 rotate-45 bg-status-confirmed" />
            {fi ? "Lukittu ennuste" : "Locked prediction"} {prediction.year}:{" "}
            <span className="font-mono-num">
              {prediction.central.toFixed(2)} [{prediction.ciLow.toFixed(2)}–{prediction.ciHigh.toFixed(2)}]
            </span>{" "}
            <span className="font-mono-num">{prediction.modelVersion}</span>
          </li>
        )}
      </ul>

      <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs">
        {prediction && (
          <Link href={`/${locale}/predictions`} className="text-accent hover:underline">
            {fi ? "Ennusteen tausta →" : "Prediction detail →"}
          </Link>
        )}
        {inSentinelPanel && (
          <Link href={`/${locale}/sentinel`} className="text-accent hover:underline">
            {fi ? "Mukana 23 maan sentinellipaneelissa →" : "In the 23-country sentinel panel →"}
          </Link>
        )}
        <Link href={`/${locale}/evidence`} className="text-foreground-muted hover:text-foreground">
          {fi ? "Näyttörekisteri →" : "Evidence register →"}
        </Link>
      </div>

      <p className="mt-2 text-xs leading-relaxed text-foreground-muted">
        {fi
          ? "Mobiililiittymätiheys on yhdistelmäproksi sähkömagneettiselle ympäristölle, ei mitattu EMF-altistus. Ennuste on lukittu BERM v17:lla; hakasulkeet ovat parametriherkkyysalue, eivät luottamusväli."
          : "Mobile subscription density is a composite proxy for the electromagnetic environment, not measured EMF exposure. The prediction is locked under BERM v17; brackets are a parameter sensitivity envelope, not a confidence interval."}
      </p>
    </section>
  );
}
