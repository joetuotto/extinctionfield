"use client";

import { useState } from "react";
import cohortData from "@/lib/cohortAsfr.json";

interface CohortPoint {
  ageGroup: string;
  asfr: number;
  yearsObserved: number;
  window: number[];
}

const COUNTRIES = cohortData.countries as Record<string, Record<string, CohortPoint[]>>;
const [OLDER, YOUNGER] = cohortData.cohorts as [number, number];

function countryName(iso3: string, locale: string) {
  // Two-letter codes are what Intl understands; the map data is ISO3-keyed.
  const iso2: Record<string, string> = {
    AUT: "AT", BEL: "BE", BRA: "BR", CHE: "CH", CZE: "CZ", DEU: "DE", DNK: "DK",
    DZA: "DZ", ESP: "ES", EST: "EE", FIN: "FI", FRA: "FR", IRL: "IE", ISR: "IL",
    ITA: "IT", JPN: "JP", KOR: "KR", LVA: "LV", MKD: "MK", NOR: "NO", POL: "PL",
    SVK: "SK", SVN: "SI", SWE: "SE", UKR: "UA", USA: "US",
  };
  try {
    return new Intl.DisplayNames([locale], { type: "region" }).of(iso2[iso3] ?? iso3) ?? iso3;
  } catch {
    return iso3;
  }
}

function Chart({
  compact,
  fi,
  older,
  younger,
}: {
  compact: boolean;
  fi: boolean;
  older: CohortPoint[];
  younger: CohortPoint[];
}) {
  const groups = older.map((p) => p.ageGroup);
  const youngerBy = new Map(younger.map((p) => [p.ageGroup, p]));

  const W = compact ? 360 : 560;
  const H = compact ? 250 : 240;
  const pad = compact
    ? { top: 16, right: 12, bottom: 44, left: 34 }
    : { top: 18, right: 16, bottom: 42, left: 42 };
  const cw = W - pad.left - pad.right;
  const ch = H - pad.top - pad.bottom;
  const font = 11;

  const max = Math.max(...older.map((p) => p.asfr), ...younger.map((p) => p.asfr)) * 1.1;
  const sy = (v: number) => pad.top + ch - (v / max) * ch;

  const slot = cw / groups.length;
  const barW = Math.min((slot - 8) / 2, compact ? 16 : 22);

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
          ? `Ikäkohtainen hedelmällisyys ikäryhmittäin: ${OLDER}- ja ${YOUNGER}-syntyneet kohortit`
          : `Age-specific fertility by age group for the ${OLDER} and ${YOUNGER} birth cohorts`
      }
    >
      <line
        x1={pad.left}
        y1={pad.top + ch}
        x2={W - pad.right}
        y2={pad.top + ch}
        className="chart-axis-line"
        strokeWidth={1}
      />
      <text
        x={pad.left - 5}
        y={pad.top + 8}
        fill="var(--foreground-muted)"
        fontSize={font}
        textAnchor="end"
        fontFamily="var(--font-mono)"
      >
        {Math.round(max)}
      </text>
      <text
        x={pad.left - 5}
        y={pad.top + ch}
        fill="var(--foreground-muted)"
        fontSize={font}
        textAnchor="end"
        fontFamily="var(--font-mono)"
      >
        0
      </text>

      {groups.map((group, i) => {
        const o = older[i];
        const y = youngerBy.get(group);
        const cx = pad.left + slot * i + slot / 2;
        const change = y ? ((y.asfr - o.asfr) / o.asfr) * 100 : null;
        return (
          <g key={group}>
            <rect
              x={cx - barW - 1}
              y={sy(o.asfr)}
              width={barW}
              height={pad.top + ch - sy(o.asfr)}
              fill="var(--foreground-muted)"
              opacity={0.55}
              rx={2}
            >
              <title>
                {fi
                  ? `${OLDER}-syntyneet, ${group}: ${o.asfr} synnytystä / 1000 naista (${o.window[0]}–${o.window[1]})`
                  : `${OLDER} cohort, ${group}: ${o.asfr} births per 1000 women (${o.window[0]}–${o.window[1]})`}
              </title>
            </rect>
            {y && (
              <rect
                x={cx + 1}
                y={sy(y.asfr)}
                width={barW}
                height={pad.top + ch - sy(y.asfr)}
                fill="var(--accent)"
                rx={2}
              >
                <title>
                  {fi
                    ? `${YOUNGER}-syntyneet, ${group}: ${y.asfr} synnytystä / 1000 naista (${y.window[0]}–${y.window[1]}), muutos ${change!.toFixed(0)} %`
                    : `${YOUNGER} cohort, ${group}: ${y.asfr} births per 1000 women (${y.window[0]}–${y.window[1]}), change ${change!.toFixed(0)}%`}
                </title>
              </rect>
            )}
            <text
              x={cx}
              y={pad.top + ch + 14}
              fill="var(--foreground-muted)"
              fontSize={font}
              textAnchor="middle"
              fontFamily="var(--font-mono)"
            >
              {group}
            </text>
            {change !== null && (
              <text
                x={cx}
                y={Math.min(sy(o.asfr), sy(y!.asfr)) - 5}
                fill={change < 0 ? "var(--accent)" : "var(--status-partial)"}
                fontSize={font - 1}
                textAnchor="middle"
                fontFamily="var(--font-mono)"
                paintOrder="stroke"
                stroke="var(--figure-bg)"
                strokeWidth={3}
                strokeLinejoin="round"
              >
                {change > 0 ? "+" : ""}
                {change.toFixed(0)}%
              </text>
            )}
          </g>
        );
      })}

      <text
        x={pad.left + cw / 2}
        y={H - 6}
        fill="var(--foreground-muted)"
        fontSize={font + 1}
        textAnchor="middle"
      >
        {fi ? "Äidin ikäryhmä" : "Mother's age group"}
      </text>
    </svg>
  );
}

export function CohortAsfrProfile({ locale = "en" }: { locale?: string }) {
  const fi = locale === "fi";
  const [iso3, setIso3] = useState("FIN");
  const profiles = COUNTRIES[iso3];
  const older = profiles?.[String(OLDER)] ?? [];
  const younger = profiles?.[String(YOUNGER)] ?? [];
  if (!older.length) return null;

  const shared = younger.length ? younger[younger.length - 1].ageGroup : null;
  const options = Object.keys(COUNTRIES)
    .map((code) => ({ code, name: countryName(code, locale) }))
    .sort((a, b) => a.name.localeCompare(b.name, locale));

  return (
    <section className="chart-surface">
      <div className="chart-surface__header">
        <div className="min-w-0 flex-1">
          <h3 className="text-lg font-semibold">
            {fi
              ? "Sama ikä, eri kohortti"
              : "Same age, different cohort"}
          </h3>
          <p className="mt-1 text-sm text-foreground-muted">
            {fi
              ? `Ikäkohtainen hedelmällisyys, kun ${OLDER}- ja ${YOUNGER}-syntyneet kohortit olivat samassa ikäryhmässä.`
              : `Age-specific fertility when the ${OLDER} and ${YOUNGER} birth cohorts were in the same age group.`}
          </p>
        </div>
        <label className="min-w-0 max-w-full text-xs text-foreground-muted">
          <span className="sr-only">{fi ? "Valitse maa" : "Select country"}</span>
          <select
            value={iso3}
            onChange={(e) => setIso3(e.target.value)}
            className="min-h-9 w-full max-w-full rounded-md border border-card-border bg-background px-2.5 py-1.5 text-xs text-foreground sm:w-auto"
          >
            {options.map((o) => (
              <option key={o.code} value={o.code}>
                {o.name}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="chart-scroll sm:hidden">
        <Chart compact fi={fi} older={older} younger={younger} />
      </div>
      <div className="chart-scroll hidden sm:block">
        <Chart compact={false} fi={fi} older={older} younger={younger} />
      </div>

      <ul className="chart-legend mt-3">
        <li className="chart-key">
          <span className="chart-key__swatch bg-foreground-muted opacity-55" />
          {fi ? `${OLDER}-syntyneet` : `${OLDER} cohort`}
        </li>
        <li className="chart-key">
          <span className="chart-key__swatch bg-accent" />
          {fi ? `${YOUNGER}-syntyneet` : `${YOUNGER} cohort`}
        </li>
        <li className="chart-key font-mono-num">
          {fi ? "synnytystä / 1000 naista" : "births per 1000 women"}
        </li>
      </ul>

      <p className="mt-2 text-xs leading-relaxed text-foreground-muted">
        {fi
          ? `${YOUNGER}-syntyneet ovat ehtineet vasta ikäryhmään ${shared ?? "—"}, joten vanhemmat ikäryhmät puuttuvat: kuva ei ole valmis kohorttivertailu vaan sen alkuosa. Kunkin ryhmän arvo on WPP 2024:n havaintovuosien keskiarvo siltä ajalta, jolloin kohortti oli kyseisessä ikäryhmässä; projektiovuosia ei käytetä. Ero on kuvaileva eikä osoita syytä.`
          : `The ${YOUNGER} cohort has only reached the ${shared ?? "—"} group, so the older groups are missing: this is the beginning of a cohort comparison, not a completed one. Each value is the mean of WPP 2024 estimate years while that cohort occupied the age group; projection years are excluded. The difference is descriptive and does not establish a cause.`}
      </p>
    </section>
  );
}
