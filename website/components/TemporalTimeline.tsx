"use client";

import { useState, useMemo } from "react";

interface TimelineEvent {
  year: number;
  label: string;
  color: string;
}

interface Props {
  emfLabel: string;
  declineLabel: string;
  emfEvents: TimelineEvent[];
  declineEvents: TimelineEvent[];
  yearLabel: string;
}

const YEAR_MIN = 1950;
const YEAR_MAX = 2025;
const SVG_W = 900;
const SVG_H = 400;
const MARGIN_L = 40;
const MARGIN_R = 30;
const AXIS_Y = 190;

function yearToX(year: number): number {
  return (
    MARGIN_L +
    ((year - YEAR_MIN) / (YEAR_MAX - YEAR_MIN)) * (SVG_W - MARGIN_L - MARGIN_R)
  );
}

export default function TemporalTimeline({
  emfLabel,
  declineLabel,
  emfEvents,
  declineEvents,
  yearLabel,
}: Props) {
  const [selectedYear, setSelectedYear] = useState(2025);

  const cursorX = useMemo(() => yearToX(selectedYear), [selectedYear]);

  return (
    <div className="space-y-2">
      <div className="overflow-x-auto">
        <svg
          viewBox={`0 0 ${SVG_W} ${SVG_H}`}
          xmlns="http://www.w3.org/2000/svg"
          style={{ width: "100%", height: "auto", minWidth: 600 }}
        >
          {/* Axis line */}
          <line
            x1={MARGIN_L}
            y1={AXIS_Y}
            x2={SVG_W - MARGIN_R}
            y2={AXIS_Y}
            stroke="var(--border)"
            strokeWidth={2}
          />

          {/* Decade ticks */}
          {[1950, 1960, 1970, 1980, 1990, 2000, 2010, 2020].map((yr) => {
            const x = yearToX(yr);
            return (
              <g key={yr}>
                <line
                  x1={x}
                  y1={AXIS_Y - 4}
                  x2={x}
                  y2={AXIS_Y + 4}
                  stroke="var(--foreground-muted)"
                  strokeWidth={1}
                />
                <text
                  x={x}
                  y={AXIS_Y + 18}
                  fill="var(--foreground-muted)"
                  fontSize={10}
                  textAnchor="middle"
                  fontFamily="ui-monospace, monospace"
                >
                  {yr}
                </text>
              </g>
            );
          })}

          {/* Labels */}
          <text
            x={MARGIN_L}
            y={24}
            fill="var(--accent)"
            fontSize={11}
            fontWeight={600}
            fontFamily="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
          >
            {emfLabel}
          </text>
          <text
            x={MARGIN_L}
            y={AXIS_Y + 50}
            fill="var(--status-refuted)"
            fontSize={11}
            fontWeight={600}
            fontFamily="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
          >
            {declineLabel}
          </text>

          {/* EMF events (above axis) */}
          {emfEvents.map((ev, i) => {
            const x = yearToX(ev.year);
            const active = ev.year <= selectedYear;
            const yOffset = 36 + (i % 4) * 26;
            return (
              <g
                key={`emf-${i}`}
                opacity={active ? 1 : 0.2}
                style={{ transition: "opacity 0.2s" }}
              >
                <line
                  x1={x}
                  y1={AXIS_Y - 6}
                  x2={x}
                  y2={yOffset + 8}
                  stroke={ev.color}
                  strokeWidth={1}
                  strokeDasharray="3 2"
                />
                <circle cx={x} cy={AXIS_Y - 6} r={4} fill={ev.color} />
                <text
                  x={x}
                  y={yOffset}
                  fill={ev.color}
                  fontSize={9}
                  textAnchor="middle"
                  fontFamily="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
                >
                  {ev.label}
                </text>
              </g>
            );
          })}

          {/* Decline events (below axis) */}
          {declineEvents.map((ev, i) => {
            const x = yearToX(ev.year);
            const active = ev.year <= selectedYear;
            const yOffset = AXIS_Y + 66 + (i % 3) * 34;
            return (
              <g
                key={`dec-${i}`}
                opacity={active ? 1 : 0.2}
                style={{ transition: "opacity 0.2s" }}
              >
                <line
                  x1={x}
                  y1={AXIS_Y + 6}
                  x2={x}
                  y2={yOffset - 14}
                  stroke={ev.color}
                  strokeWidth={1}
                  strokeDasharray="3 2"
                />
                <circle cx={x} cy={AXIS_Y + 6} r={4} fill={ev.color} />
                <text
                  x={x}
                  y={yOffset}
                  fill={ev.color}
                  fontSize={9}
                  textAnchor="middle"
                  fontFamily="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
                >
                  {ev.label}
                </text>
              </g>
            );
          })}

          {/* Cursor line */}
          <line
            x1={cursorX}
            y1={30}
            x2={cursorX}
            y2={SVG_H - 10}
            stroke="var(--foreground)"
            strokeWidth={1.5}
            opacity={0.6}
            strokeDasharray="6 3"
          />
          <text
            x={cursorX}
            y={SVG_H - 2}
            fill="var(--foreground)"
            fontSize={12}
            fontWeight={700}
            textAnchor="middle"
            fontFamily="ui-monospace, monospace"
          >
            {selectedYear}
          </text>
        </svg>
      </div>

      {/* Slider */}
      <div className="flex items-center gap-3 px-2">
        <span className="text-xs text-foreground-muted font-mono">{YEAR_MIN}</span>
        <input
          type="range"
          min={YEAR_MIN}
          max={YEAR_MAX}
          value={selectedYear}
          onChange={(e) => setSelectedYear(Number(e.target.value))}
          className="flex-1 accent-accent"
          aria-label={yearLabel}
        />
        <span className="text-xs text-foreground-muted font-mono">{YEAR_MAX}</span>
      </div>
    </div>
  );
}
