"use client";

import { useState } from "react";

interface EMFLayer {
  id: string;
  nameEn: string;
  nameFi: string;
  color: string;
  startYear: number;
  freqEn: string;
  freqFi: string;
  driverEn: string;
  driverFi: string;
  channelEn: string;
  channelFi: string;
}

const LAYERS: EMFLayer[] = [
  {
    id: "military",
    nameEn: "Military radar",
    nameFi: "Sotilastutka",
    color: "#4a6741",
    startYear: 1950,
    freqEn: "1–10 GHz (S/X-band)",
    freqFi: "1–10 GHz (S/X-kaista)",
    driverEn: "Cold War",
    driverFi: "Kylmä sota",
    channelEn: "Ambient (base perimeter)",
    channelFi: "Ambient (tukikohta-alue)",
  },
  {
    id: "weather_radar",
    nameEn: "Weather radar",
    nameFi: "Säätutka",
    color: "#2196F3",
    startYear: 1988,
    freqEn: "2.7–5.6 GHz (S/C-band)",
    freqFi: "2,7–5,6 GHz (S/C-kaista)",
    driverEn: "NEXRAD / EU Doppler networks",
    driverFi: "NEXRAD / EU Doppler-verkostot",
    channelEn: "Ambient (landscape, 24/7)",
    channelFi: "Ambient (maisema, 24/7)",
  },
  {
    id: "telecom",
    nameEn: "Mobile networks",
    nameFi: "Matkapuhelinverkot",
    color: "#FF5722",
    startYear: 1991,
    freqEn: "700 MHz–3.5 GHz (2G–5G)",
    freqFi: "700 MHz–3,5 GHz (2G–5G)",
    driverEn: "Telecommunications",
    driverFi: "Televiestintä",
    channelEn: "Ambient + Personal",
    channelFi: "Ambient + Henkilökohtainen",
  },
  {
    id: "wifi",
    nameEn: "Wi-Fi",
    nameFi: "Wi-Fi",
    color: "#E91E63",
    startYear: 1999,
    freqEn: "2.4 / 5 / 6 GHz",
    freqFi: "2,4 / 5 / 6 GHz",
    driverEn: "Internet access",
    driverFi: "Internet-yhteys",
    channelEn: "Ambient (indoor) + Personal",
    channelFi: "Ambient (sisätila) + Henkilökohtainen",
  },
  {
    id: "display",
    nameEn: "Display transition",
    nameFi: "Näyttösiirtymä",
    color: "#9C27B0",
    startYear: 2005,
    freqEn: "2.4/5 GHz (Wi-Fi) + PWM kHz",
    freqFi: "2,4/5 GHz (Wi-Fi) + PWM kHz",
    driverEn: "CRT → LCD/LED + streaming",
    driverFi: "CRT → LCD/LED + suoratoisto",
    channelEn: "Personal (bedroom proximity)",
    channelFi: "Henkilökohtainen (makuuhuoneläheisyys)",
  },
  {
    id: "smart_meters",
    nameEn: "Smart meters",
    nameFi: "Älymittarit",
    color: "#00BCD4",
    startYear: 2005,
    freqEn: "900 MHz / 2.4 GHz (mesh)",
    freqFi: "900 MHz / 2,4 GHz (mesh)",
    driverEn: "Grid modernization",
    driverFi: "Sähköverkon modernisointi",
    channelEn: "Ambient (home exterior)",
    channelFi: "Ambient (kodin ulkopuoli)",
  },
  {
    id: "indoor_led",
    nameEn: "Indoor LED lighting",
    nameFi: "Sisä-LED-valaistus",
    color: "#FFC107",
    startYear: 2009,
    freqEn: "20–200 kHz (SMPS) + harmonics",
    freqFi: "20–200 kHz (hakkuri) + harmoniset",
    driverEn: "EU Directive 2009/125/EC",
    driverFi: "EU-direktiivi 2009/125/EC",
    channelEn: "Ambient (indoor, every room)",
    channelFi: "Ambient (sisätila, joka huone)",
  },
  {
    id: "solar",
    nameEn: "Solar inverters",
    nameFi: "Aurinkoinvertterit",
    color: "#FFEB3B",
    startYear: 2010,
    freqEn: "20–100 kHz (MPPT switching)",
    freqFi: "20–100 kHz (MPPT-kytkentä)",
    driverEn: "Renewable energy policy",
    driverFi: "Uusiutuvan energian politiikka",
    channelEn: "Ambient (rooftop/neighborhood)",
    channelFi: "Ambient (katto/naapurusto)",
  },
  {
    id: "street_led",
    nameEn: "Street LED lighting",
    nameFi: "LED-katuvalaistus",
    color: "#FF9800",
    startYear: 2012,
    freqEn: "kHz (driver) + LoRa/4G (smart control)",
    freqFi: "kHz (hakkuri) + LoRa/4G (älyohjaus)",
    driverEn: "Municipal energy savings",
    driverFi: "Kuntien energiansäästö",
    channelEn: "Ambient (outdoor, nocturnal)",
    channelFi: "Ambient (ulkotila, yöllinen)",
  },
  {
    id: "iot",
    nameEn: "IoT devices",
    nameFi: "IoT-laitteet",
    color: "#795548",
    startYear: 2014,
    freqEn: "BLE / Zigbee / LoRa / NB-IoT",
    freqFi: "BLE / Zigbee / LoRa / NB-IoT",
    driverEn: "Smart home / Industry 4.0",
    driverFi: "Älykoti / Teollisuus 4.0",
    channelEn: "Ambient + Personal",
    channelFi: "Ambient + Henkilökohtainen",
  },
  {
    id: "adas",
    nameEn: "ADAS automotive radar",
    nameFi: "ADAS-ajoneuvotutka",
    color: "#607D8B",
    startYear: 2015,
    freqEn: "24 / 77 GHz (mmWave)",
    freqFi: "24 / 77 GHz (mmWave)",
    driverEn: "Vehicle safety regulations",
    driverFi: "Ajoneuvoturvallisuus",
    channelEn: "Ambient (road corridor)",
    channelFi: "Ambient (tiekäytävä)",
  },
  {
    id: "wind",
    nameEn: "Wind turbines",
    nameFi: "Tuuliturbiinit",
    color: "#8BC34A",
    startYear: 2000,
    freqEn: "ELF (blade pass) + kHz (inverter)",
    freqFi: "ELF (lavanohitus) + kHz (invertteri)",
    driverEn: "Renewable energy policy",
    driverFi: "Uusiutuvan energian politiikka",
    channelEn: "Ambient (rural corridors)",
    channelFi: "Ambient (maaseutukäytävät)",
  },
];

const SENTINEL_SPECIES = [
  { id: "aphid", nameEn: "Aphid", nameFi: "Kirva", icon: "🦟" },
  { id: "bee", nameEn: "Bee", nameFi: "Mehiläinen", icon: "🐝" },
  { id: "moth", nameEn: "Moth", nameFi: "Yöperhonen", icon: "🦋" },
  { id: "bird", nameEn: "Bird", nameFi: "Lintu", icon: "🐦" },
  { id: "bat", nameEn: "Bat", nameFi: "Lepakko", icon: "🦇" },
  { id: "toad", nameEn: "Toad", nameFi: "Rupikonna", icon: "🐸" },
];

type Relevance = 3 | 2 | 1 | 0;

const ALIGNMENT: Record<string, Record<string, Relevance>> = {
  military:      { aphid: 0, bee: 0, moth: 0, bird: 1, bat: 1, toad: 0 },
  weather_radar: { aphid: 1, bee: 2, moth: 2, bird: 2, bat: 3, toad: 1 },
  telecom:       { aphid: 2, bee: 3, moth: 2, bird: 3, bat: 3, toad: 2 },
  wifi:          { aphid: 1, bee: 2, moth: 1, bird: 2, bat: 2, toad: 1 },
  display:       { aphid: 0, bee: 0, moth: 0, bird: 0, bat: 0, toad: 0 },
  smart_meters:  { aphid: 1, bee: 1, moth: 1, bird: 1, bat: 1, toad: 0 },
  indoor_led:    { aphid: 0, bee: 0, moth: 1, bird: 0, bat: 0, toad: 0 },
  solar:         { aphid: 0, bee: 1, moth: 0, bird: 0, bat: 0, toad: 0 },
  street_led:    { aphid: 1, bee: 1, moth: 3, bird: 2, bat: 2, toad: 1 },
  iot:           { aphid: 0, bee: 1, moth: 0, bird: 1, bat: 1, toad: 0 },
  adas:          { aphid: 0, bee: 0, moth: 0, bird: 0, bat: 1, toad: 0 },
  wind:          { aphid: 0, bee: 0, moth: 0, bird: 2, bat: 3, toad: 0 },
};

const SENTINEL_EVENTS = [
  { year: 1989, labelEn: "Hallmann insect data begins", labelFi: "Hallmannin hyönteisdata alkaa" },
  { year: 1997, labelEn: "NEXRAD complete", labelFi: "NEXRAD valmis" },
  { year: 2006, labelEn: "WNS bat crisis", labelFi: "WNS-lepakkokriisi" },
  { year: 2009, labelEn: "EU incandescent ban", labelFi: "EU:n hehkulamppukielto" },
  { year: 2017, labelEn: "Hallmann: −76% insect biomass", labelFi: "Hallmann: −76 % hyönteisbiomassa" },
  { year: 2026, labelEn: "Lindecke: bat compass disrupted", labelFi: "Lindecke: lepakkokompassi häiriintynyt" },
];

const RELEVANCE_DOTS: Record<Relevance, string> = {
  3: "●●●",
  2: "●●",
  1: "●",
  0: "○",
};

const RELEVANCE_COLORS: Record<Relevance, string> = {
  3: "text-red-400",
  2: "text-amber-400",
  1: "text-blue-400",
  0: "text-foreground-muted/30",
};

const COPY = {
  en: {
    title: "Technology Layers",
    subtitle: "12 independent EMF technology layers, each with its own driver, frequency profile, and deployment timeline. Orthogonal instruments improve the model's ability to distinguish biological effects from economic confounders.",
    timelineTitle: "EMF Layer Deployment Timeline",
    timelineNote: "Each band shows when a technology layer entered the ambient environment. Sentinel events (▼) mark key ecological observations.",
    matrixTitle: "Layer × Sentinel Alignment",
    matrixNote: "Relevance of each EMF layer to each sentinel species. ●●● = strong mechanistic + observational link. ●● = moderate. ● = weak. ○ = no known link.",
    layer: "Layer",
    freq: "Frequency",
    driver: "Driver",
    channel: "Channel",
    sentinelEvents: "Sentinel events",
    showAll: "Show all",
    hideAll: "Hide all",
    orthoTitle: "Why orthogonal layers matter",
    orthoP1: "When all technology layers correlate with GDP (economic development drives them all), a two-layer model cannot distinguish biological causation from economic confounding. Twelve layers with ten different drivers — energy policy, vehicle safety, municipal decisions, Cold War legacy — create natural experiments where some layers are present and others absent.",
    orthoP2: "If insect decline tracks weather radar deployment (energy-policy-independent, 1988 start) but not smart meter deployment (energy-policy-dependent, 2005 start), the model gains discriminative power. Each orthogonal instrument narrows the space of plausible alternative explanations.",
  },
  fi: {
    title: "Teknologiakerrokset",
    subtitle: "12 itsenäistä EMF-teknologiakerrosta, joista jokaisella on oma ajurinsa, taajuusprofiilinsa ja käyttöönottoaikataulunsa. Ortogonaaliset instrumentit parantavat mallin kykyä erottaa biologiset vaikutukset taloudellisista sekoittajista.",
    timelineTitle: "EMF-kerrosten käyttöönottoaikajana",
    timelineNote: "Jokainen nauha osoittaa milloin teknologiakerros tuli ympäristöön. Sentinellitapahtumat (▼) merkitsevät keskeisiä ekologisia havaintoja.",
    matrixTitle: "Kerros × Sentinelli -kohdistus",
    matrixNote: "Kunkin EMF-kerroksen relevanssi kullekin sentinellilajille. ●●● = vahva mekanistinen + havaintopohjainen yhteys. ●● = kohtalainen. ● = heikko. ○ = ei tunnettua yhteyttä.",
    layer: "Kerros",
    freq: "Taajuus",
    driver: "Ajuri",
    channel: "Kanava",
    sentinelEvents: "Sentinellitapahtumat",
    showAll: "Näytä kaikki",
    hideAll: "Piilota kaikki",
    orthoTitle: "Miksi ortogonaaliset kerrokset ovat tärkeitä",
    orthoP1: "Kun kaikki teknologiakerrokset korreloivat BKT:n kanssa (taloudellinen kehitys ajaa niitä kaikkia), kahden kerroksen malli ei pysty erottamaan biologista kausaatiota taloudellisesta sekoittajasta. Kaksitoista kerrosta kymmenellä eri ajurilla — energiapolitiikka, ajoneuvoturvallisuus, kuntapäätökset, kylmän sodan perintö — luovat luonnollisia kokeita joissa jotkut kerrokset ovat läsnä ja toiset puuttuvat.",
    orthoP2: "Jos hyönteiskato seuraa säätutkien käyttöönottoa (energiapolitiikasta riippumaton, alku 1988) mutta ei älymittareiden käyttöönottoa (energiapolitiikasta riippuvainen, alku 2005), malli saa diskriminointivoimaa. Jokainen ortogonaalinen instrumentti kaventaa uskottavien vaihtoehtoisten selitysten joukkoa.",
  },
} as const;

function RelevanceCell({ level }: { level: Relevance }) {
  return (
    <span className={`font-mono text-xs ${RELEVANCE_COLORS[level]}`}>
      {RELEVANCE_DOTS[level]}
    </span>
  );
}

export function LayersExplorer({ locale }: { locale: string }) {
  const fi = locale === "fi";
  const d = fi ? COPY.fi : COPY.en;
  const [visible, setVisible] = useState<Set<string>>(
    () => new Set(LAYERS.map((l) => l.id)),
  );

  const toggleLayer = (id: string) => {
    setVisible((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const minYear = 1950;
  const maxYear = 2030;
  const span = maxYear - minYear;

  const rowH = 28;
  const topPad = 20;
  const labelW = 145;
  const chartW = 560;
  const rightPad = 10;
  const totalW = labelW + chartW + rightPad;
  const layerRows = LAYERS.filter((l) => visible.has(l.id));
  const chartH = layerRows.length * rowH;
  const eventH = 50;
  const totalH = topPad + chartH + eventH + 30;

  const xForYear = (y: number) => labelW + ((y - minYear) / span) * chartW;

  return (
    <div className="space-y-10">
      {/* Header */}
      <div>
        <h2 className="text-xl font-semibold mb-2">{d.title}</h2>
        <p className="text-sm text-foreground-muted leading-relaxed max-w-3xl">
          {d.subtitle}
        </p>
      </div>

      {/* Timeline */}
      <section className="rounded-xl border border-card-border bg-card-bg p-5 sm:p-6">
        <h3 className="text-lg font-semibold mb-1">{d.timelineTitle}</h3>
        <p className="text-sm text-foreground-muted mb-4">{d.timelineNote}</p>

        {/* Layer toggles */}
        <div className="flex flex-wrap gap-2 mb-4">
          {LAYERS.map((l) => (
            <button
              key={l.id}
              onClick={() => toggleLayer(l.id)}
              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium border transition-colors ${
                visible.has(l.id)
                  ? "border-current opacity-100"
                  : "border-card-border opacity-40"
              }`}
              style={{ color: l.color }}
            >
              <span
                className="w-2.5 h-2.5 rounded-sm"
                style={{ backgroundColor: l.color, opacity: visible.has(l.id) ? 1 : 0.3 }}
              />
              {fi ? l.nameFi : l.nameEn}
            </button>
          ))}
          <button
            onClick={() => setVisible(new Set(LAYERS.map((l) => l.id)))}
            className="text-xs text-foreground-muted hover:text-foreground px-2 py-1"
          >
            {d.showAll}
          </button>
          <button
            onClick={() => setVisible(new Set())}
            className="text-xs text-foreground-muted hover:text-foreground px-2 py-1"
          >
            {d.hideAll}
          </button>
        </div>

        {/* SVG Timeline */}
        <div className="overflow-x-auto">
          <svg
            viewBox={`0 0 ${totalW} ${totalH}`}
            className="w-full min-w-[600px]"
            role="img"
            aria-label={d.timelineTitle}
          >
            {/* Decade grid lines */}
            {[1950, 1960, 1970, 1980, 1990, 2000, 2010, 2020, 2030].map((yr) => (
              <g key={yr}>
                <line
                  x1={xForYear(yr)} y1={topPad}
                  x2={xForYear(yr)} y2={topPad + chartH}
                  stroke="var(--card-border)" strokeWidth={1} strokeDasharray="3,4"
                />
                <text
                  x={xForYear(yr)} y={topPad + chartH + eventH + 20}
                  fill="var(--foreground-muted)" fontSize={10} textAnchor="middle"
                  fontFamily="var(--font-mono)"
                >
                  {yr}
                </text>
              </g>
            ))}

            {/* Layer bands */}
            {layerRows.map((layer, i) => {
              const y = topPad + i * rowH;
              const x1 = xForYear(layer.startYear);
              const x2 = xForYear(maxYear);
              return (
                <g key={layer.id}>
                  <title>
                    {fi ? layer.nameFi : layer.nameEn}: {layer.startYear}–
                    {"\n"}{fi ? layer.freqFi : layer.freqEn}
                    {"\n"}{fi ? layer.driverFi : layer.driverEn}
                  </title>
                  {/* Label */}
                  <text
                    x={labelW - 8} y={y + rowH / 2}
                    fill={layer.color} fontSize={10.5}
                    textAnchor="end" dominantBaseline="middle"
                    fontWeight="600"
                  >
                    {fi ? layer.nameFi : layer.nameEn}
                  </text>
                  {/* Band background */}
                  <rect
                    x={x1} y={y + 3}
                    width={x2 - x1} height={rowH - 6}
                    fill={layer.color} opacity={0.15} rx={3}
                  />
                  {/* Band solid start */}
                  <rect
                    x={x1} y={y + 3}
                    width={Math.min(x2 - x1, 4)} height={rowH - 6}
                    fill={layer.color} opacity={0.7} rx={2}
                  />
                  {/* Start year label */}
                  <text
                    x={x1 + 8} y={y + rowH / 2}
                    fill={layer.color} fontSize={8.5}
                    dominantBaseline="middle" opacity={0.8}
                  >
                    {layer.startYear}
                  </text>
                </g>
              );
            })}

            {/* Sentinel events */}
            {SENTINEL_EVENTS.map((evt, i) => {
              const x = xForYear(evt.year);
              const y = topPad + chartH + 8;
              return (
                <g key={i}>
                  <title>{fi ? evt.labelFi : evt.labelEn} ({evt.year})</title>
                  <line
                    x1={x} y1={topPad} x2={x} y2={topPad + chartH}
                    stroke="#ef4444" strokeWidth={0.8} strokeDasharray="2,3"
                    opacity={0.5}
                  />
                  <text
                    x={x} y={y}
                    fill="#ef4444" fontSize={10} textAnchor="middle"
                  >
                    ▼
                  </text>
                  <text
                    x={x} y={y + 14}
                    fill="var(--foreground-muted)" fontSize={7.5} textAnchor="middle"
                  >
                    {evt.year}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>
      </section>

      {/* Sentinel Alignment Matrix */}
      <section className="rounded-xl border border-card-border bg-card-bg p-5 sm:p-6">
        <h3 className="text-lg font-semibold mb-1">{d.matrixTitle}</h3>
        <p className="text-sm text-foreground-muted mb-4">{d.matrixNote}</p>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left text-foreground-muted">
                <th className="py-2 pr-4 font-medium">{d.layer}</th>
                <th className="py-2 pr-4 font-medium text-xs">{d.freq}</th>
                {SENTINEL_SPECIES.map((sp) => (
                  <th key={sp.id} className="py-2 px-2 font-medium text-center whitespace-nowrap">
                    <span className="mr-1">{sp.icon}</span>
                    <span className="text-xs">{fi ? sp.nameFi : sp.nameEn}</span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {LAYERS.map((layer) => (
                <tr key={layer.id} className="border-b border-card-border last:border-0">
                  <td className="py-2 pr-4 whitespace-nowrap">
                    <span className="inline-block w-2 h-2 rounded-sm mr-2" style={{ backgroundColor: layer.color }} />
                    <span className="font-medium text-xs">{fi ? layer.nameFi : layer.nameEn}</span>
                  </td>
                  <td className="py-2 pr-4 text-foreground-muted text-xs whitespace-nowrap">
                    {fi ? layer.freqFi : layer.freqEn}
                  </td>
                  {SENTINEL_SPECIES.map((sp) => (
                    <td key={sp.id} className="py-2 px-2 text-center">
                      <RelevanceCell level={ALIGNMENT[layer.id]?.[sp.id] ?? 0} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Orthogonal instruments explanation */}
      <section className="rounded-xl border border-card-border bg-card-bg p-5 sm:p-6">
        <h3 className="text-lg font-semibold mb-3">{d.orthoTitle}</h3>
        <p className="text-sm text-foreground-muted leading-relaxed mb-3">
          {d.orthoP1}
        </p>
        <p className="text-sm text-foreground-muted leading-relaxed">
          {d.orthoP2}
        </p>
      </section>
    </div>
  );
}
