"use client";

const COPY = {
  en: {
    title: "CaMKII: The Convergence Molecule",
    subtitle:
      "One molecule explains why obesity, diabetes, infertility, and sleep disorders all increase simultaneously",
    center: "CaMKII",
    centerSub: "Ca²⁺/calmodulin-dependent\nprotein kinase II",
    upstream: "EMF → VGCC → Ca²⁺",
    targets: [
      {
        label: "Cav3.2\nthreshold ↓",
        effect: "EMF sensitivity\nINCREASES",
        color: "#EF4444",
      },
      {
        label: "UCP1\ntranscription ↓",
        effect: "BAT thermo-\ngenesis ↓",
        color: "#F97316",
      },
      {
        label: "StAR\nexpression ↓",
        effect: "Testosterone ↓",
        color: "#EAB308",
      },
      {
        label: "β-cell\nCa²⁺ dynamics ↓",
        effect: "Insulin\nresistance",
        color: "#22C55E",
      },
      {
        label: "L-cell\nGLP-1 ↓",
        effect: "Incretin\ndisruption",
        color: "#3B82F6",
      },
    ],
    outcome: "METABOLIC SYNDROME\n+ PROGRESSIVE SENSITIZATION",
    caveat:
      "Epistemic note: CaMKII convergence is IDENTIFIED from independent literature but not yet experimentally tested as an integrated EMF mechanism. Each pathway is verified separately; the integrated test (EMF → CaMKII → all five targets simultaneously) is a prediction, not established fact. Evidence level: M.",
    targetRows: [
      {
        pathway: "EMF sensitivity",
        role: "Shifts Cav3.2 activation threshold to more negative potentials",
        source: "PMC9913649 (2023)",
      },
      {
        pathway: "BAT thermogenesis",
        role: "UCP1 transcription via CREB phosphorylation",
        source: "BAT physiology reviews",
      },
      {
        pathway: "Testosterone",
        role: "StAR expression in Leydig cells",
        source: "Endocrine literature",
      },
      {
        pathway: "Insulin secretion",
        role: "VDCC phosphorylation in β-cells",
        source: "PMC3556522 (Bhatt 2012)",
      },
      {
        pathway: "GLP-1 secretion",
        role: "α2δ-1 modulation in intestinal L-cells",
        source: "AJP-GI 2024 (Harada)",
      },
    ],
    colPathway: "Pathway",
    colRole: "CaMKII role",
    colSource: "Source",
  },
  fi: {
    title: "CaMKII: konvergenssimolekyyli",
    subtitle:
      "Yksi molekyyli selittää miksi lihavuus, diabetes, hedelmättömyys ja unihäiriöt lisääntyvät samanaikaisesti",
    center: "CaMKII",
    centerSub: "Ca²⁺/kalmoduliini-riippuvainen\nproteiinikinaasi II",
    upstream: "EMF → VGCC → Ca²⁺",
    targets: [
      {
        label: "Cav3.2\nkynnys ↓",
        effect: "EMF-herkkyys\nKASVAA",
        color: "#EF4444",
      },
      {
        label: "UCP1\ntranskriptio ↓",
        effect: "BAT-termo-\ngeneesi ↓",
        color: "#F97316",
      },
      {
        label: "StAR\nekspressio ↓",
        effect: "Testosteroni ↓",
        color: "#EAB308",
      },
      {
        label: "β-solun\nCa²⁺-dynamiikka ↓",
        effect: "Insuliini-\nresistenssi",
        color: "#22C55E",
      },
      {
        label: "L-solun\nGLP-1 ↓",
        effect: "Inkretiini-\nhäiriö",
        color: "#3B82F6",
      },
    ],
    outcome: "METABOLINEN SYNDROOMA\n+ PROGRESSIIVINEN HERKISTYMINEN",
    caveat:
      "Episteeminen huomio: CaMKII-konvergenssi on TUNNISTETTU itsenäisestä kirjallisuudesta mutta ei vielä kokeellisesti testattu integroituna EMF-mekanismina. Jokainen reitti on verifioitu erikseen; integroitu koe (EMF → CaMKII → kaikki viisi kohdetta samanaikaisesti) on ennuste, ei vahvistettu fakta. Evidenssitaso: M.",
    targetRows: [
      {
        pathway: "EMF-herkkyys",
        role: "Siirtää Cav3.2-aktivaatiokynnystä negatiivisemmaksi",
        source: "PMC9913649 (2023)",
      },
      {
        pathway: "BAT-termogeneesi",
        role: "UCP1-transkriptio CREB-fosforylaation kautta",
        source: "BAT-fysiologiakatsaukset",
      },
      {
        pathway: "Testosteroni",
        role: "StAR-ekspressio Leydigin soluissa",
        source: "Endokrinologinen kirjallisuus",
      },
      {
        pathway: "Insuliinieritys",
        role: "VDCC-fosforylaatio β-soluissa",
        source: "PMC3556522 (Bhatt 2012)",
      },
      {
        pathway: "GLP-1-eritys",
        role: "α2δ-1-modulaatio suoliston L-soluissa",
        source: "AJP-GI 2024 (Harada)",
      },
    ],
    colPathway: "Reitti",
    colRole: "CaMKII:n rooli",
    colSource: "Lähde",
  },
};

const W = 700;
const H = 420;
const CX = W / 2;
const CY = 140;
const R_CENTER = 42;
const TARGET_Y = 280;
const EFFECT_Y = 370;

function multiline(
  text: string,
  x: number,
  y: number,
  opts: { fontSize?: number; fill?: string; anchor?: string; weight?: number } = {},
) {
  const lines = text.split("\n");
  const fs = opts.fontSize ?? 10;
  const lh = fs * 1.3;
  const startY = y - ((lines.length - 1) * lh) / 2;
  return (
    <text
      x={x}
      y={startY}
      textAnchor={(opts.anchor as "middle" | "start" | "end") ?? "middle"}
      fill={opts.fill ?? "var(--foreground)"}
      fontSize={fs}
      fontWeight={opts.weight ?? 400}
    >
      {lines.map((line, i) => (
        <tspan key={i} x={x} dy={i === 0 ? 0 : lh}>
          {line}
        </tspan>
      ))}
    </text>
  );
}

export function CaMKIIConvergenceDiagram({ locale }: { locale: string }) {
  const t = locale === "fi" ? COPY.fi : COPY.en;
  const N = t.targets.length;
  const spacing = (W - 100) / (N - 1);
  const startX = 50;

  return (
    <div className="overflow-x-auto">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="w-full min-w-[500px]"
        role="img"
        aria-label={t.title}
      >
        {/* Upstream arrow */}
        {multiline(t.upstream, CX, 28, {
          fontSize: 11,
          fill: "var(--foreground-muted)",
          weight: 600,
        })}
        <line
          x1={CX}
          y1={42}
          x2={CX}
          y2={CY - R_CENTER - 6}
          stroke="var(--foreground-muted)"
          strokeWidth={1.5}
          markerEnd="url(#arrowMuted)"
        />

        {/* Central CaMKII circle */}
        <circle
          cx={CX}
          cy={CY}
          r={R_CENTER}
          fill="var(--card-bg)"
          stroke="#8B5CF6"
          strokeWidth={2.5}
        />
        {multiline(t.center, CX, CY - 6, {
          fontSize: 13,
          fill: "#8B5CF6",
          weight: 700,
        })}
        <text
          x={CX}
          y={CY + 14}
          textAnchor="middle"
          fill="var(--foreground-muted)"
          fontSize={6.5}
        >
          {t.centerSub.split("\n").map((line, i) => (
            <tspan key={i} x={CX} dy={i === 0 ? 0 : 9}>
              {line}
            </tspan>
          ))}
        </text>

        {/* Fan-out lines from center to targets */}
        {t.targets.map((tgt, i) => {
          const tx = startX + i * spacing;
          return (
            <g key={i}>
              <line
                x1={CX}
                y1={CY + R_CENTER}
                x2={tx}
                y2={TARGET_Y - 20}
                stroke={tgt.color}
                strokeWidth={1.5}
                markerEnd={`url(#arrow${i})`}
              />
              {/* Target box */}
              <rect
                x={tx - 48}
                y={TARGET_Y - 20}
                width={96}
                height={36}
                rx={6}
                fill="var(--card-bg)"
                stroke={tgt.color}
                strokeWidth={1.5}
              />
              {multiline(tgt.label, tx, TARGET_Y - 1, {
                fontSize: 9,
                fill: "var(--foreground)",
                weight: 500,
              })}
              {/* Effect label below */}
              <line
                x1={tx}
                y1={TARGET_Y + 16}
                x2={tx}
                y2={EFFECT_Y - 16}
                stroke={tgt.color}
                strokeWidth={1}
                strokeDasharray="3 2"
              />
              {multiline(tgt.effect, tx, EFFECT_Y - 2, {
                fontSize: 8,
                fill: tgt.color,
                weight: 600,
              })}
            </g>
          );
        })}

        {/* Arrow markers */}
        <defs>
          <marker
            id="arrowMuted"
            viewBox="0 0 10 10"
            refX={8}
            refY={5}
            markerWidth={6}
            markerHeight={6}
            orient="auto-start-reverse"
          >
            <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--foreground-muted)" />
          </marker>
          {t.targets.map((tgt, i) => (
            <marker
              key={i}
              id={`arrow${i}`}
              viewBox="0 0 10 10"
              refX={8}
              refY={5}
              markerWidth={6}
              markerHeight={6}
              orient="auto-start-reverse"
            >
              <path d="M 0 0 L 10 5 L 0 10 z" fill={tgt.color} />
            </marker>
          ))}
        </defs>
      </svg>
    </div>
  );
}
