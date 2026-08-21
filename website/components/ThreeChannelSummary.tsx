import type { Locale } from "@/lib/i18n";

const COPY = {
  en: {
    emf: "EMF\nenvironment",
    elf: "ELF",
    elfSub: "Power grid · Lighting",
    elfMech: "Membrane\nvoltage",
    ifBand: "IF",
    ifSub: "Electronics · LED",
    ifMech: "Mitotic\ndisruption",
    rf: "RF",
    rfSub: "Base stations · Wi-Fi",
    rfMech: "Cryptochrome\n· melatonin",
    capacity: "Reproductive\ncapacity",
    tfr: "TFR",
  },
  fi: {
    emf: "EMF-\nympäristö",
    elf: "ELF",
    elfSub: "Sähköverkko · Valaistus",
    elfMech: "Kalvo-\njännite",
    ifBand: "IF",
    ifSub: "Elektroniikka · LED",
    ifMech: "Mitoosi-\nhäiriö",
    rf: "RF",
    rfSub: "Tukiasemat · Wi-Fi",
    rfMech: "Kryptokromi\n· melatoniini",
    capacity: "Lisääntymis-\nkapasiteetti",
    tfr: "TFR",
  },
} as const;

const C = {
  elf: "#F59E0B",
  if: "#8B5CF6",
  rf: "#3B82F6",
  node: "#6B7280",
  text: "var(--foreground, #111)",
  muted: "var(--foreground-muted, #666)",
  bg: "var(--card-bg, #fff)",
  border: "var(--card-border, #e5e7eb)",
};

function multiline(text: string, x: number, y: number, fontSize: number, fill: string, anchor: "start" | "middle" | "end" = "middle") {
  const lines = text.split("\n");
  const lineH = fontSize * 1.3;
  const startY = y - ((lines.length - 1) * lineH) / 2;
  return lines.map((line, i) => (
    <text
      key={i}
      x={x}
      y={startY + i * lineH}
      textAnchor={anchor}
      fill={fill}
      fontSize={fontSize}
      fontFamily="system-ui, -apple-system, sans-serif"
    >
      {line}
    </text>
  ));
}

export function ThreeChannelSummary({ locale = "en" }: { locale?: Locale }) {
  const d = COPY[locale];
  const W = 820;
  const H = 220;

  const col = { emf: 60, band: 200, mech: 380, cap: 560, tfr: 720 };
  const rows = { top: 50, mid: 110, bot: 170 };

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className="w-full"
      role="img"
      aria-label={locale === "fi" ? "Kolmikanavamekanismi" : "Three-channel mechanism"}
    >
      {/* EMF source node */}
      <rect x={col.emf - 45} y={rows.mid - 24} width={90} height={48} rx={8} fill={C.bg} stroke={C.border} strokeWidth={1.5} />
      {multiline(d.emf, col.emf, rows.mid, 11, C.text)}

      {/* Three bands */}
      {[
        { y: rows.top, color: C.elf, label: d.elf, sub: d.elfSub, mech: d.elfMech },
        { y: rows.mid, color: C.if, label: d.ifBand, sub: d.ifSub, mech: d.ifMech },
        { y: rows.bot, color: C.rf, label: d.rf, sub: d.rfSub, mech: d.rfMech },
      ].map((b) => (
        <g key={b.label}>
          {/* Arrow from EMF to band */}
          <line x1={col.emf + 45} y1={rows.mid} x2={col.band - 50} y2={b.y} stroke={b.color} strokeWidth={2} opacity={0.6} />
          <polygon points={`${col.band - 50},${b.y - 4} ${col.band - 42},${b.y} ${col.band - 50},${b.y + 4}`} fill={b.color} opacity={0.6} />

          {/* Band node */}
          <rect x={col.band - 40} y={b.y - 22} width={80} height={44} rx={8} fill={b.color} fillOpacity={0.12} stroke={b.color} strokeWidth={1.5} />
          <text x={col.band} y={b.y - 4} textAnchor="middle" fill={b.color} fontSize={13} fontWeight={700} fontFamily="system-ui, -apple-system, sans-serif">{b.label}</text>
          <text x={col.band} y={b.y + 12} textAnchor="middle" fill={C.muted} fontSize={8} fontFamily="system-ui, -apple-system, sans-serif">{b.sub}</text>

          {/* Arrow to mechanism */}
          <line x1={col.band + 40} y1={b.y} x2={col.mech - 52} y2={b.y} stroke={b.color} strokeWidth={1.5} opacity={0.5} />
          <polygon points={`${col.mech - 52},${b.y - 3} ${col.mech - 46},${b.y} ${col.mech - 52},${b.y + 3}`} fill={b.color} opacity={0.5} />

          {/* Mechanism node */}
          <rect x={col.mech - 45} y={b.y - 20} width={90} height={40} rx={6} fill={C.bg} stroke={b.color} strokeWidth={1} strokeDasharray="4 2" />
          {multiline(b.mech, col.mech, b.y, 10, C.text)}

          {/* Arrow to capacity */}
          <line x1={col.mech + 45} y1={b.y} x2={col.cap - 52} y2={rows.mid} stroke={C.node} strokeWidth={1} opacity={0.4} />
        </g>
      ))}

      {/* Capacity node */}
      <rect x={col.cap - 50} y={rows.mid - 24} width={100} height={48} rx={8} fill={C.bg} stroke={C.border} strokeWidth={1.5} />
      {multiline(d.capacity, col.cap, rows.mid, 11, C.text)}

      {/* Arrow to TFR */}
      <line x1={col.cap + 50} y1={rows.mid} x2={col.tfr - 30} y2={rows.mid} stroke={C.node} strokeWidth={2} opacity={0.5} />
      <polygon points={`${col.tfr - 30},${rows.mid - 4} ${col.tfr - 22},${rows.mid} ${col.tfr - 30},${rows.mid + 4}`} fill={C.node} opacity={0.5} />

      {/* TFR node */}
      <rect x={col.tfr - 20} y={rows.mid - 18} width={50} height={36} rx={8} fill="#22C55E" fillOpacity={0.15} stroke="#22C55E" strokeWidth={1.5} />
      <text x={col.tfr + 5} y={rows.mid + 5} textAnchor="middle" fill="#22C55E" fontSize={14} fontWeight={700} fontFamily="system-ui, -apple-system, sans-serif">{d.tfr}</text>
    </svg>
  );
}
