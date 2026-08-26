"use client";

import { VGCC_GENE_FAMILY } from "@/lib/vgccGeneFamily";

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
} as const;

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
  const d = locale === "fi" ? COPY.fi : COPY.en;
  const genes = VGCC_GENE_FAMILY;

  return (
    <div className="mt-8">
      <div className="overflow-x-auto">
        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="w-full max-w-[900px]"
          style={{ minWidth: 640 }}
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
                    locale === "fi" ? dis.fi : dis.en;
                  /* Truncate long labels */
                  const shortLabel =
                    label.length > 40 ? label.slice(0, 37) + "..." : label;
                  const textAnchor =
                    dx < CX - 50 ? "end" : dx > CX + 50 ? "start" : "middle";

                  return (
                    <g key={j}>
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
                      {/* Disease label */}
                      <text
                        x={dx + (textAnchor === "end" ? -6 : textAnchor === "start" ? 6 : 0)}
                        y={dy + 4}
                        textAnchor={textAnchor}
                        fontSize={8}
                        fill="currentColor"
                        opacity={0.7}
                      >
                        {shortLabel}
                      </text>
                    </g>
                  );
                })}
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
}
