"use client";

const COPY = {
  en: {
    title: "Seven Causal Channels",
    subtitle:
      "Seven VGCC-dependent pathways converging on neurodevelopment",
    source: ["EMF → VGCC", "Ca²⁺ disruption"],
    target: ["Neurodevelopmental", "outcomes"],
    channels: [
      { name: "Fetal Leydig Cav3 → StAR → T↓", effect: "Testosterone" },
      { name: "Brain aromatase CYP19", effect: "Brain T/E₂ ratio" },
      { name: "Pituitary gonadotroph Cav3", effect: "FSH/LH pulsatility" },
      { name: "OT/AVP system", effect: "Social cognition" },
      { name: "PFC Cav1.2 + Cav3", effect: "Executive function" },
      { name: "Melatonin → puberty", effect: "Puberty timing" },
      { name: "Insular cortex", effect: "Body representation" },
    ],
  },
  fi: {
    title: "Seitsemän kausaalikanavaa",
    subtitle:
      "Seitsemän VGCC-riippuvaista reittiä jotka konvergoivat neurokehitykseen",
    source: ["EMF → VGCC", "Ca²⁺-häiriö"],
    target: ["Neurokehitykselliset", "seuraukset"],
    channels: [
      { name: "Sikiön Leydig Cav3 → StAR → T↓", effect: "Testosteroni" },
      { name: "Aivojen aromataasi CYP19", effect: "Aivojen T/E₂-suhde" },
      { name: "Aivolisäkkeen gonadotrofi Cav3", effect: "FSH/LH-pulssaus" },
      { name: "OT/AVP-järjestelmä", effect: "Sosiaalinen kognitio" },
      { name: "PFC Cav1.2 + Cav3", effect: "Toiminnanohjaus" },
      { name: "Melatoniini → puberteetti", effect: "Puberteetin ajoitus" },
      { name: "Insulaarinen korteksi", effect: "Kehorepresentaatio" },
    ],
  },
} as const;

const COLORS = [
  "#EF4444", // 1 red
  "#8B5CF6", // 2 purple
  "#6366F1", // 3 indigo
  "#EC4899", // 4 pink
  "#F59E0B", // 5 amber
  "#10B981", // 6 emerald
  "#3B82F6", // 7 blue
];

const W = 800;
const H = 420;
const CHANNEL_H = 40;
const CHANNEL_GAP = 8;
const CHANNEL_COUNT = 7;
const TOTAL_H = CHANNEL_COUNT * CHANNEL_H + (CHANNEL_COUNT - 1) * CHANNEL_GAP;
const CH_START_Y = (H - TOTAL_H) / 2;
const CENTER_Y = H / 2;

const SRC_X = 10;
const SRC_W = 110;
const SRC_H = 110;
const SRC_Y = CENTER_Y - SRC_H / 2;
const SRC_RIGHT = SRC_X + SRC_W;

const TGT_W = 190;
const TGT_X = W - TGT_W - 10;
const TGT_H = 110;
const TGT_Y = CENTER_Y - TGT_H / 2;

const CH_X = SRC_RIGHT + 40;
const CH_W = TGT_X - CH_X - 40;
const CH_RIGHT = CH_X + CH_W;

const FAN_OUT_MID = (SRC_RIGHT + CH_X) / 2;
const FAN_IN_MID = (CH_RIGHT + TGT_X) / 2;

export function SevenChannelDiagram({ locale }: { locale: string }) {
  const d = locale === "fi" ? COPY.fi : COPY.en;

  return (
    <div className="mt-8">
      <h4 className="text-base font-semibold mb-2">{d.title}</h4>
      <p className="text-xs text-foreground-muted mb-4">{d.subtitle}</p>

      <div className="overflow-x-auto">
        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="w-full max-w-[800px]"
          style={{ minWidth: 600 }}
          role="img"
          aria-label={d.title}
        >
          <style>{`
            .seven-ch-band { transition: opacity 0.2s ease; }
            .seven-ch-band:hover { opacity: 1 !important; }
          `}</style>

          {/* Source box */}
          <rect
            x={SRC_X}
            y={SRC_Y}
            width={SRC_W}
            height={SRC_H}
            rx={10}
            fill="currentColor"
            opacity={0.06}
            stroke="currentColor"
            strokeOpacity={0.2}
            strokeWidth={1.5}
          />
          <text
            x={SRC_X + SRC_W / 2}
            y={CENTER_Y - 8}
            textAnchor="middle"
            fontSize={11}
            fontWeight={700}
            fill="currentColor"
          >
            {d.source[0]}
          </text>
          <text
            x={SRC_X + SRC_W / 2}
            y={CENTER_Y + 10}
            textAnchor="middle"
            fontSize={10}
            fill="currentColor"
            opacity={0.7}
          >
            {d.source[1]}
          </text>

          {/* Target box */}
          <rect
            x={TGT_X}
            y={TGT_Y}
            width={TGT_W}
            height={TGT_H}
            rx={10}
            fill="currentColor"
            opacity={0.06}
            stroke="currentColor"
            strokeOpacity={0.2}
            strokeWidth={1.5}
          />
          <text
            x={TGT_X + TGT_W / 2}
            y={CENTER_Y - 8}
            textAnchor="middle"
            fontSize={11}
            fontWeight={700}
            fill="currentColor"
          >
            {d.target[0]}
          </text>
          <text
            x={TGT_X + TGT_W / 2}
            y={CENTER_Y + 10}
            textAnchor="middle"
            fontSize={10}
            fill="currentColor"
            opacity={0.7}
          >
            {d.target[1]}
          </text>

          {/* Channel bands */}
          {d.channels.map((ch, i) => {
            const bandY = CH_START_Y + i * (CHANNEL_H + CHANNEL_GAP);
            const cy = bandY + CHANNEL_H / 2;
            const color = COLORS[i];

            return (
              <g key={i} className="seven-ch-band" opacity={0.85}>
                {/* Fan-out curve: source -> channel */}
                <path
                  d={`M ${SRC_RIGHT},${CENTER_Y} C ${FAN_OUT_MID},${CENTER_Y} ${FAN_OUT_MID},${cy} ${CH_X},${cy}`}
                  fill="none"
                  stroke={color}
                  strokeWidth={1.5}
                  opacity={0.4}
                />

                {/* Band background */}
                <rect
                  x={CH_X}
                  y={bandY}
                  width={CH_W}
                  height={CHANNEL_H}
                  rx={6}
                  fill={color}
                  opacity={0.12}
                />

                {/* Left accent strip */}
                <rect
                  x={CH_X}
                  y={bandY}
                  width={4}
                  height={CHANNEL_H}
                  rx={2}
                  fill={color}
                  opacity={0.7}
                />

                {/* Number badge */}
                <circle
                  cx={CH_X + 18}
                  cy={cy}
                  r={10}
                  fill={color}
                  opacity={0.2}
                />
                <text
                  x={CH_X + 18}
                  y={cy + 4}
                  textAnchor="middle"
                  fontSize={11}
                  fontWeight={700}
                  fill={color}
                >
                  {i + 1}
                </text>

                {/* Channel mechanism name */}
                <text
                  x={CH_X + 35}
                  y={bandY + 17}
                  fontSize={10}
                  fontWeight={600}
                  fill="currentColor"
                >
                  {ch.name}
                </text>

                {/* Downstream effect */}
                <text
                  x={CH_X + 35}
                  y={bandY + 31}
                  fontSize={9}
                  fill={color}
                  opacity={0.9}
                >
                  {"→"} {ch.effect}
                </text>

                {/* Fan-in curve: channel -> target */}
                <path
                  d={`M ${CH_RIGHT},${cy} C ${FAN_IN_MID},${cy} ${FAN_IN_MID},${CENTER_Y} ${TGT_X},${CENTER_Y}`}
                  fill="none"
                  stroke={color}
                  strokeWidth={1.5}
                  opacity={0.4}
                />
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
}
