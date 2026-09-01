import { pickCopy } from "@/lib/i18n";

const COPY = {
  en: {
    kicker: "THREE-CHANNEL MECHANISM",
    title: "ELF · IF · RF — three frequency channels, three biological routes",
    emf: "EMF\nenvironment",
    elf: "ELF",
    elfRange: "< 300 Hz",
    elfSub: "Power grid · Lighting",
    elfMech: "VGCC / Ca²⁺",
    elfMechSub: "Membrane\nvoltage",
    ifBand: "IF",
    ifRange: "300 Hz – 10 MHz",
    ifSub: "LED drivers · SMPS",
    ifMech: "Mitotic\ndisruption",
    ifMechSub: "Spindle\nforces",
    rf: "RF",
    rfRange: "> 10 MHz",
    rfSub: "Base stations · Wi-Fi",
    rfMech: "CRY / RPM",
    rfMechSub: "Melatonin\nsuppression",
    capacity: "Reproductive\ncapacity",
    tfr: "TFR",
    footer: "Mobile subscription density serves as composite proxy for the entire electromagnetic environment. The model decomposes three independent channels — ELF (power grid, lighting), IF (switching electronics, LED), RF (base stations, Wi-Fi, radar) — cryptochrome-melatonin signalling, calcium-ion influx through membrane voltage, and paired-formation to reproductive capacity.",
    ariaLabel: "Three-channel mechanism",
  },
  fi: {
    kicker: "KOLMIKANAVAMEKANISMI",
    title: "ELF · IF · RF — kolme taajuuskaistaa, kolme biologista reittiä",
    emf: "EMF-\nympäristö",
    elf: "ELF",
    elfRange: "< 300 Hz",
    elfSub: "Sähköverkko · Valaistus",
    elfMech: "VGCC / Ca²⁺",
    elfMechSub: "Kalvo-\njännite",
    ifBand: "IF",
    ifRange: "300 Hz – 10 MHz",
    ifSub: "LED-hakkurit · SMPS",
    ifMech: "Mitoosi-\nhäiriö",
    ifMechSub: "Sukkulan\nvoimat",
    rf: "RF",
    rfRange: "> 10 MHz",
    rfSub: "Tukiasemat · Wi-Fi",
    rfMech: "CRY / RPM",
    rfMechSub: "Melatoniini-\nsuppressio",
    capacity: "Lisääntymis-\nkapasiteetti",
    tfr: "TFR",
    footer: "Matkapuhelinliittymätiheys on yhdistelmäproksi koko sähkömagneettiselle ympäristölle. Malli jäljittää kolme itsenäistä kanavaa — ELF (sähköverkko, valaistus), IF (kytkentäelektroniikka, LED-väkyntä), RF (tukiasemat, Wi-Fi, tutka) — kryptokromi-melatoniinisignaloinnin, kalsiumioni-sisäänvirtauksen kalvojännitteen kautta ja pariutumisen lisääntymiskapasiteettiin.",
    ariaLabel: "Kolmikanavamekanismi",
  },
  ja: {
    kicker: "3チャネルメカニズム",
    title: "ELF · IF · RF — 3つの周波数チャネル、3つの生物学的経路",
    emf: "EMF\n環境",
    elf: "ELF",
    elfRange: "< 300 Hz",
    elfSub: "送電網 · 照明",
    elfMech: "VGCC / Ca²⁺",
    elfMechSub: "膜\n電位",
    ifBand: "IF",
    ifRange: "300 Hz – 10 MHz",
    ifSub: "LEDドライバー · SMPS",
    ifMech: "有糸分裂\n障害",
    ifMechSub: "紡錘体\n力",
    rf: "RF",
    rfRange: "> 10 MHz",
    rfSub: "基地局 · Wi-Fi",
    rfMech: "CRY / RPM",
    rfMechSub: "メラトニン\n抑制",
    capacity: "生殖\n能力",
    tfr: "TFR",
    footer: "携帯電話加入密度は、電磁環境全体の複合プロキシとして機能します。モデルは、ELF（電力網・照明）、IF（スイッチング電子機器・LED）、RF（基地局・Wi-Fi・レーダー）の3つの独立チャネルを、生殖能力に至る生物学的経路として分解します。",
    ariaLabel: "3チャネルメカニズム",
  },
  fr: {
    kicker: "MÉCANISME À TROIS CANAUX",
    title: "ELF · IF · RF — trois canaux de fréquence, trois voies biologiques",
    emf: "Environnement\nEMF",
    elf: "ELF",
    elfRange: "< 300 Hz",
    elfSub: "Réseau électrique · Éclairage",
    elfMech: "VGCC / Ca²⁺",
    elfMechSub: "Tension\nmembranaire",
    ifBand: "IF",
    ifRange: "300 Hz – 10 MHz",
    ifSub: "Drivers LED · SMPS",
    ifMech: "Perturbation\nmitotique",
    ifMechSub: "Forces du\nfuseau",
    rf: "RF",
    rfRange: "> 10 MHz",
    rfSub: "Stations de base · Wi-Fi",
    rfMech: "CRY / RPM",
    rfMechSub: "Suppression de\nla mélatonine",
    capacity: "Capacité\nreproductive",
    tfr: "TFR",
    footer: "La densité des abonnements mobiles sert de proxy composite pour l’ensemble de l’environnement électromagnétique. Le modèle décompose trois canaux indépendants — ELF (réseau électrique, éclairage), IF (électronique de commutation, LED), RF (stations de base, Wi-Fi, radar) — en voies biologiques menant à la capacité reproductive.",
    ariaLabel: "Mécanisme à trois canaux",
  },
  ko: {
    kicker: "3채널 메커니즘",
    title: "ELF · IF · RF — 3개의 주파수 채널, 3개의 생물학적 경로",
    emf: "EMF\n환경",
    elf: "ELF",
    elfRange: "< 300 Hz",
    elfSub: "전력망 · 조명",
    elfMech: "VGCC / Ca²⁺",
    elfMechSub: "막\n전압",
    ifBand: "IF",
    ifRange: "300 Hz – 10 MHz",
    ifSub: "LED 드라이버 · SMPS",
    ifMech: "유사분열\n교란",
    ifMechSub: "방추사\n힘",
    rf: "RF",
    rfRange: "> 10 MHz",
    rfSub: "기지국 · Wi-Fi",
    rfMech: "CRY / RPM",
    rfMechSub: "멜라토닌\n억제",
    capacity: "생식\n능력",
    tfr: "TFR",
    footer: "이동통신 가입 밀도는 전체 전자기 환경의 복합 프록시로 사용됩니다. 모델은 ELF(전력망·조명), IF(스위칭 전자장치·LED), RF(기지국·Wi-Fi·레이더)의 세 독립 채널을 생식 능력으로 이어지는 생물학적 경로로 분해합니다.",
    ariaLabel: "3채널 메커니즘",
  },
} as const;

const COLORS = {
  elf: { main: "#F59E0B", bg: "rgba(245,158,11,0.10)", border: "rgba(245,158,11,0.35)" },
  if: { main: "#8B5CF6", bg: "rgba(139,92,246,0.10)", border: "rgba(139,92,246,0.35)" },
  rf: { main: "#3B82F6", bg: "rgba(59,130,246,0.10)", border: "rgba(59,130,246,0.35)" },
};

const WEIGHTS = { elf: "5%", if: "60%", rf: "35%" };

function multiline(
  text: string,
  x: number,
  y: number,
  fontSize: number,
  fill: string,
  opts?: { anchor?: "start" | "middle" | "end"; weight?: number | string },
) {
  const lines = text.split("\n");
  const lineH = fontSize * 1.35;
  const startY = y - ((lines.length - 1) * lineH) / 2;
  return lines.map((line, i) => (
    <text
      key={i}
      x={x}
      y={startY + i * lineH}
      textAnchor={opts?.anchor ?? "middle"}
      fill={fill}
      fontSize={fontSize}
      fontWeight={opts?.weight ?? 400}
         >
      {line}
    </text>
  ));
}

function Arrow({ x1, y1, x2, y2, color, width = 1.5 }: { x1: number; y1: number; x2: number; y2: number; color: string; width?: number }) {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const len = Math.sqrt(dx * dx + dy * dy);
  const ux = dx / len;
  const uy = dy / len;
  const headLen = 7;
  const headW = 4;
  const tipX = x2;
  const tipY = y2;
  const baseX = x2 - ux * headLen;
  const baseY = y2 - uy * headLen;
  const perpX = -uy;
  const perpY = ux;

  return (
    <g>
      <line x1={x1} y1={y1} x2={baseX} y2={baseY} stroke={color} strokeWidth={width} opacity={0.55} />
      <polygon
        points={`${tipX},${tipY} ${baseX + perpX * headW},${baseY + perpY * headW} ${baseX - perpX * headW},${baseY - perpY * headW}`}
        fill={color}
        opacity={0.55}
      />
    </g>
  );
}

export function ThreeChannelSummary({ locale = "en" }: { locale?: string }) {
  const d = pickCopy(COPY, locale);
  const W = 900;
  const H = 300;

  const col = { emf: 65, band: 230, mech: 460, cap: 650, tfr: 820 };
  const rows = { top: 52, mid: 150, bot: 248 };
  const nodeH = 72;
  const bandW = 120;
  const mechW = 110;

  const channels = [
    { key: "elf" as const, y: rows.top, label: d.elf, range: d.elfRange, sub: d.elfSub, mech: d.elfMech, mechSub: d.elfMechSub, c: COLORS.elf, w: WEIGHTS.elf },
    { key: "if" as const, y: rows.mid, label: d.ifBand, range: d.ifRange, sub: d.ifSub, mech: d.ifMech, mechSub: d.ifMechSub, c: COLORS.if, w: WEIGHTS.if },
    { key: "rf" as const, y: rows.bot, label: d.rf, range: d.rfRange, sub: d.rfSub, mech: d.rfMech, mechSub: d.rfMechSub, c: COLORS.rf, w: WEIGHTS.rf },
  ];

  return (
    <div className="chart-scroll w-full">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="chart-svg w-full"
        style={{ minWidth: 760 }}
        role="img"
        aria-label={d.ariaLabel}
      >
        {/* EMF source node */}
        <rect x={col.emf - 50} y={rows.mid - nodeH / 2} width={100} height={nodeH} rx={12} fill="var(--card-bg, #fff)" stroke="var(--card-border, #d1d5db)" strokeWidth={1.5} />
        {multiline(d.emf, col.emf, rows.mid, 13, "var(--foreground, #111)", { weight: 600 })}

        {channels.map((ch) => (
          <g key={ch.key}>
            {/* Arrow from EMF to band */}
            <Arrow x1={col.emf + 50} y1={rows.mid} x2={col.band - bandW / 2 - 2} y2={ch.y} color={ch.c.main} width={2} />

            {/* Band node — colored accent left bar + card */}
            <rect x={col.band - bandW / 2} y={ch.y - nodeH / 2} width={bandW} height={nodeH} rx={10} fill={ch.c.bg} stroke={ch.c.border} strokeWidth={1.5} />
            <rect x={col.band - bandW / 2} y={ch.y - nodeH / 2} width={5} height={nodeH} rx={2.5} fill={ch.c.main} opacity={0.85} />

            {/* Band label */}
            <text x={col.band + 4} y={ch.y - 12} textAnchor="middle" fill={ch.c.main} fontSize={15} fontWeight={700} fontFamily="system-ui, -apple-system, sans-serif">
              {ch.label}
            </text>
            {/* Frequency range */}
            <text x={col.band + 4} y={ch.y + 3} textAnchor="middle" fill={ch.c.main} fontSize={11} fontWeight={500} fontFamily="system-ui, -apple-system, sans-serif" opacity={0.8}>
              {ch.range}
            </text>
            {/* Sources */}
            <text x={col.band + 4} y={ch.y + 17} textAnchor="middle" fill="var(--foreground-muted, #666)" fontSize={11} fontFamily="system-ui, -apple-system, sans-serif">
              {ch.sub}
            </text>

            {/* Weight badge */}
            <rect x={col.band + bandW / 2 - 30} y={ch.y - nodeH / 2 - 1} width={31} height={16} rx={8} fill={ch.c.main} opacity={0.18} />
            <text x={col.band + bandW / 2 - 14.5} y={ch.y - nodeH / 2 + 11} textAnchor="middle" fill={ch.c.main} fontSize={11} fontWeight={700} fontFamily="system-ui, -apple-system, sans-serif">
              w={ch.w}
            </text>

            {/* Arrow to mechanism */}
            <Arrow x1={col.band + bandW / 2 + 2} y1={ch.y} x2={col.mech - mechW / 2 - 2} y2={ch.y} color={ch.c.main} width={1.5} />

            {/* Mechanism node */}
            <rect x={col.mech - mechW / 2} y={ch.y - nodeH / 2} width={mechW} height={nodeH} rx={10} fill="var(--card-bg, #fff)" stroke={ch.c.main} strokeWidth={1} strokeDasharray="6 3" opacity={0.9} />
            {multiline(ch.mech, col.mech, ch.y - 14, 12, "var(--foreground, #111)", { weight: 600 })}
            {multiline(ch.mechSub, col.mech, ch.y + 19, 10, "var(--foreground-muted, #666)")}

            {/* Arrow to capacity */}
            <Arrow x1={col.mech + mechW / 2 + 2} y1={ch.y} x2={col.cap - 56} y2={rows.mid} color="var(--foreground-muted, #888)" width={1} />
          </g>
        ))}

        {/* Capacity node */}
        <rect x={col.cap - 55} y={rows.mid - nodeH / 2} width={110} height={nodeH} rx={12} fill="var(--card-bg, #fff)" stroke="var(--card-border, #d1d5db)" strokeWidth={1.5} />
        {multiline(d.capacity, col.cap, rows.mid, 13, "var(--foreground, #111)", { weight: 600 })}

        {/* Arrow to TFR */}
        <Arrow x1={col.cap + 55} y1={rows.mid} x2={col.tfr - 28} y2={rows.mid} color="#16A34A" width={2.5} />

        {/* TFR node — accent circle */}
        <circle cx={col.tfr} cy={rows.mid} r={26} fill="#16A34A" fillOpacity={0.12} stroke="#16A34A" strokeWidth={2} />
        <text x={col.tfr} y={rows.mid + 5} textAnchor="middle" fill="#16A34A" fontSize={16} fontWeight={700} fontFamily="system-ui, -apple-system, sans-serif">
          {d.tfr}
        </text>
      </svg>
    </div>
  );
}
