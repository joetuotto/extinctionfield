import type { LockedPrediction } from "@/lib/types";
import { countryLabel } from "@/lib/predictions";
import predictionSeries from "@/lib/predictionSeries.json";

const SERIES = predictionSeries.series as Record<string, { year: number; tfr: number }[]>;

/**
 * One locked TFR forecast against the published series it will be judged by.
 * The observed line stops where the data stops; everything to the right of it
 * is the forecast, drawn as an envelope so the reader sees what would count
 * as a miss before the observation exists.
 */
export function PredictionTrack({
  prediction,
  locale,
}: {
  prediction: LockedPrediction;
  locale: string;
}) {
  const fi = locale === "fi";
  const observed = SERIES[prediction.country] ?? [];
  if (observed.length < 2) return null;

  const W = 260;
  const H = 150;
  const pad = { top: 14, right: 14, bottom: 26, left: 30 };
  const cw = W - pad.left - pad.right;
  const ch = H - pad.top - pad.bottom;

  const last = observed[observed.length - 1];
  const xMin = observed[0].year;
  const xMax = prediction.year;
  const sx = (y: number) => pad.left + ((y - xMin) / (xMax - xMin)) * cw;

  const values = [...observed.map((p) => p.tfr), prediction.ciLow, prediction.ciHigh];
  if (prediction.actual !== undefined) values.push(prediction.actual);
  const yMin = Math.min(...values) * 0.9;
  const yMax = Math.max(...values) * 1.06;
  const sy = (v: number) => pad.top + ch - ((v - yMin) / (yMax - yMin)) * ch;

  const observedPath = observed
    .map((p, i) => `${i === 0 ? "M" : "L"} ${sx(p.year).toFixed(1)} ${sy(p.tfr).toFixed(1)}`)
    .join(" ");

  // The envelope opens from the last observation to the locked bounds.
  const envelope = [
    `M ${sx(last.year).toFixed(1)} ${sy(last.tfr).toFixed(1)}`,
    `L ${sx(prediction.year).toFixed(1)} ${sy(prediction.ciHigh).toFixed(1)}`,
    `L ${sx(prediction.year).toFixed(1)} ${sy(prediction.ciLow).toFixed(1)}`,
    "Z",
  ].join(" ");

  const inEnvelope =
    prediction.actual !== undefined &&
    prediction.actual >= prediction.ciLow &&
    prediction.actual <= prediction.ciHigh;

  const xTicks = [xMin, Math.round((xMin + xMax) / 2), xMax];
  // The forecast line approaches from above when the prediction falls, so the
  // value sits on whichever side of the point the line does not occupy.
  const labelBelow = prediction.central < last.tfr;

  return (
    <figure className="rounded-lg border border-card-border bg-card-bg p-4">
      <figcaption className="mb-1 flex items-baseline justify-between gap-2">
        <span className="text-sm font-medium">{countryLabel(prediction, locale)}</span>
        <span className="font-mono-num text-xs text-foreground-muted">{prediction.year}</span>
      </figcaption>

      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="w-full"
        role="img"
        aria-label={
          fi
            ? `${countryLabel(prediction, locale)}: havaittu TFR ${xMin}–${last.year} ja lukittu ennuste ${prediction.year} (${prediction.central.toFixed(2)}, herkkyysalue ${prediction.ciLow.toFixed(2)}–${prediction.ciHigh.toFixed(2)})`
            : `${countryLabel(prediction, locale)}: observed TFR ${xMin}–${last.year} and the locked ${prediction.year} prediction (${prediction.central.toFixed(2)}, sensitivity ${prediction.ciLow.toFixed(2)}–${prediction.ciHigh.toFixed(2)})`
        }
      >
        <line
          x1={pad.left}
          y1={pad.top + ch}
          x2={W - pad.right}
          y2={pad.top + ch}
          stroke="var(--card-border)"
          strokeWidth={1}
        />
        {xTicks.map((t) => (
          <text
            key={t}
            x={sx(t)}
            y={pad.top + ch + 14}
            fill="var(--foreground-muted)"
            fontSize={9}
            textAnchor="middle"
            fontFamily="var(--font-mono)"
          >
            {t}
          </text>
        ))}
        {[yMin, yMax].map((v, i) => (
          <text
            key={i}
            x={pad.left - 4}
            y={sy(v) + (i === 0 ? -2 : 8)}
            fill="var(--foreground-muted)"
            fontSize={9}
            textAnchor="end"
            fontFamily="var(--font-mono)"
          >
            {v.toFixed(1)}
          </text>
        ))}

        <path d={envelope} fill="var(--accent)" opacity={0.12} />
        <line
          x1={sx(last.year)}
          y1={sy(last.tfr)}
          x2={sx(prediction.year)}
          y2={sy(prediction.central)}
          stroke="var(--accent)"
          strokeWidth={1.5}
          strokeDasharray="5,4"
        />
        <path d={observedPath} fill="none" stroke="var(--foreground-muted)" strokeWidth={1.5} />

        {/* the locked central value */}
        <circle cx={sx(prediction.year)} cy={sy(prediction.central)} r={3} fill="var(--accent)" />
        <text
          x={sx(prediction.year) - 6}
          y={sy(prediction.central) + (labelBelow ? 14 : -8)}
          fill="var(--accent)"
          fontSize={11}
          textAnchor="end"
          fontWeight={600}
          fontFamily="var(--font-mono)"
          // Knocks the forecast line out from behind the value.
          stroke="var(--card-bg)"
          strokeWidth={3}
          paintOrder="stroke"
        >
          {prediction.central.toFixed(2)}
        </text>

        {/* The observed value, once it exists. Its absence is stated in the
            caption below rather than as a label that would not fit here. */}
        {prediction.actual !== undefined && (
          <path
            d={`M ${sx(prediction.year)} ${sy(prediction.actual) - 6} L ${sx(prediction.year) + 6} ${sy(prediction.actual)} L ${sx(prediction.year)} ${sy(prediction.actual) + 6} L ${sx(prediction.year) - 6} ${sy(prediction.actual)} Z`}
            fill={inEnvelope ? "var(--status-confirmed)" : "var(--status-refuted)"}
          />
        )}
      </svg>

      <p className="mt-1 font-mono-num text-xs text-foreground-muted">
        {prediction.central.toFixed(2)} [{prediction.ciLow.toFixed(2)}–{prediction.ciHigh.toFixed(2)}] ·{" "}
        {prediction.modelVersion}
      </p>
      <p className="mt-0.5 text-xs text-foreground-muted">
        {prediction.actual !== undefined
          ? `${fi ? "Havaittu" : "Observed"} ${prediction.actual.toFixed(2)} — ${
              inEnvelope
                ? fi ? "alueen sisällä" : "inside the envelope"
                : fi ? "alueen ulkopuolella" : "outside the envelope"
            }`
          : fi
            ? `Havainto ${prediction.year} on julkaisematta.`
            : `The ${prediction.year} observation is not published yet.`}
      </p>
    </figure>
  );
}
