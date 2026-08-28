"use client";

import { VGCC_GENE_FAMILY } from "@/lib/vgccGeneFamily";
import { pickCopy } from "@/lib/i18n";

const COPY = {
  en: {
    hub: "VGCC Gene Family",
    hubSub: "Ca²⁺ channel",
    diseases: "Diseases",
  },
  fi: {
    hub: "VGCC-geeniperhe",
    hubSub: "Ca²⁺-kanava",
    diseases: "Sairaudet",
  },
  ja: {
    hub: "VGCC遺伝子ファミリー",
    hubSub: "Ca²⁺チャネル",
    diseases: "疾患",
  },
  fr: {
    hub: "Famille de gènes VGCC",
    hubSub: "Canal Ca²⁺",
    diseases: "Maladies",
  },
  ko: {
    hub: "VGCC 유전자 패밀리",
    hubSub: "Ca²⁺ 채널",
    diseases: "질환",
  },
};

const GENE_COLORS: Record<string, string> = {
  cacna1c: "#EF4444",
  cacna1d: "#8B5CF6",
  cacna1a: "#3B82F6",
  cacna1g: "#10B981",
  cacna1h: "#F59E0B",
  cacna1i: "#EC4899",
};

/* Layout constants */
const W = 900;
const H = 620;
const CX = W / 2;
const CY = H / 2;
const HUB_R = 60;
const NODE_RX = 72;
const NODE_RY = 28;
const ORBIT = 200;

/* Adjusted angles for better spacing */
const NODE_ANGLES = [-110, -50, -170, 130, 180, 50];

function polarXY(angleDeg: number, radius: number): [number, number] {
  const rad = (angleDeg * Math.PI) / 180;
  return [CX + radius * Math.cos(rad), CY + radius * Math.sin(rad)];
}

export function VGCCGeneFamilyDiagram({ locale }: { locale: string }) {
  const d = pickCopy(COPY, locale);
  const genes = VGCC_GENE_FAMILY;

  return (
    <div className="mt-8">
      <div className="chart-surface">
      <div className="chart-scroll">
        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="chart-svg w-full max-w-[900px]"
          style={{ minWidth: 680 }}
          role="img"
          aria-label={d.hub}
        >
          <style>{`
            .vgcc-node { transition: opacity 0.2s ease; }
            .vgcc-node:hover { opacity: 1 !important; }
            .vgcc-spoke { transition: stroke-opacity 0.2s ease; }
            .vgcc-node:hover ~ .vgcc-spoke { stroke-opacity: 0.3; }
          `}</style>

          {/* Central hub */}
          <circle
            cx={CX}
            cy={CY}
            r={HUB_R}
            fill="currentColor"
            opacity={0.06}
            stroke="currentColor"
            strokeOpacity={0.25}
            strokeWidth={2}
          />
          <text
            x={CX}
            y={CY - 8}
            textAnchor="middle"
            fontSize={12}
            fontWeight={700}
            fill="currentColor"
          >
            {d.hub}
          </text>
          <text
            x={CX}
            y={CY + 10}
            textAnchor="middle"
            fontSize={10}
            fill="currentColor"
            opacity={0.6}
          >
            {d.hubSub}
          </text>

          {/* Gene nodes + spokes + disease labels */}
          {genes.map((gene, i) => {
            const angle = NODE_ANGLES[i];
            const [nx, ny] = polarXY(angle, ORBIT);
            const color = GENE_COLORS[gene.id] ?? "#6B7280";

            /* Disease label positions: fan out from gene node */
            const diseases = gene.diseases;
            const diseaseRadius = 80;
            const diseaseSpread = 24;
            const diseaseStartAngle = angle - ((diseases.length - 1) * diseaseSpread) / 2;

            return (
              <g key={gene.id} className="vgcc-node" opacity={0.9}>
                {/* Spoke line from hub to node */}
                <line
                  x1={CX}
                  y1={CY}
                  x2={nx}
                  y2={ny}
                  stroke={color}
                  strokeWidth={2}
                  strokeOpacity={0.3}
                  className="vgcc-spoke"
                />

                {/* Gene node ellipse */}
                <ellipse
                  cx={nx}
                  cy={ny}
                  rx={NODE_RX}
                  ry={NODE_RY}
                  fill={color}
                  opacity={0.15}
                  stroke={color}
                  strokeWidth={1.5}
                  strokeOpacity={0.6}
                />

                {/* Gene name */}
                <text
                  x={nx}
                  y={ny - 6}
                  textAnchor="middle"
                  fontSize={11}
                  fontWeight={700}
                  fill={color}
                >
                  {gene.gene}
                </text>

                {/* Protein + type label */}
                <text
                  x={nx}
                  y={ny + 10}
                  textAnchor="middle"
                  fontSize={9}
                  fill="currentColor"
                  opacity={0.7}
                >
                  {gene.protein} ({gene.type})
                </text>

                {/* Disease labels fanning out */}
                {diseases.map((dis, j) => {
                  const dAngle = diseaseStartAngle + j * diseaseSpread;
                  const [dx, dy] = polarXY(dAngle, ORBIT + diseaseRadius);
                  const label =
                    dis[locale] ?? dis.en;
                  return (
                    <g key={j}>
                      <title>{label}</title>
                      {/* Thin line from node to disease */}
                      <line
                        x1={nx}
                        y1={ny}
                        x2={dx}
                        y2={dy}
                        stroke={color}
                        strokeWidth={0.8}
                        strokeOpacity={0.2}
                        strokeDasharray="3 2"
                      />
                      {/* Small dot */}
                      <circle cx={dx} cy={dy} r={2.5} fill={color} opacity={0.5} />
                    </g>
                  );
                })}
              </g>
            );
          })}
        </svg>
      </div>

      <div className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-3" aria-label={d.diseases}>
        {genes.map((gene) => {
          const color = GENE_COLORS[gene.id] ?? "#6B7280";
          return (
            <article
              key={`${gene.id}-diseases`}
              className="rounded-lg border border-card-border bg-background/55 p-3"
              style={{ borderInlineStartColor: color, borderInlineStartWidth: 3 }}
            >
              <h4 className="font-mono-num text-xs font-bold" style={{ color }}>{gene.gene}</h4>
              <p className="mt-0.5 text-[10px] text-foreground-muted">{gene.protein} · {gene.type}</p>
              <ul className="mt-2 space-y-1 text-[11px] leading-snug text-foreground-muted">
                {gene.diseases.map((disease, index) => (
                  <li key={index} className="flex gap-1.5">
                    <span aria-hidden="true" style={{ color }}>•</span>
                    <span>{disease[locale] ?? disease.en}</span>
                  </li>
                ))}
              </ul>
            </article>
          );
        })}
      </div>
      </div>
    </div>
  );
}
