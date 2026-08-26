"use client";

import { useState, useCallback, useRef, useMemo } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Locale } from "@/lib/i18n";

const YRS = [1880,1900,1920,1940,1950,1960,1970,1980,1990,1995,2000,2005,2010,2015,2020,2025] as const;

const LAYERS = [
  { id:"grid",  en:"Power grid",        fi:"Sähköverkko",      color:"#1a3354", v:[0,3,8,12,14,15,15,15,15,15,15,15,15,15,15,15] },
  { id:"radio", en:"Radio · Radar",     fi:"Radio · Tutka",    color:"#1e4470", v:[0,0,0.5,4,6,8,8,8,8,8,8,8,8,8,8,8] },
  { id:"crt",   en:"CRT · Fluorescent", fi:"CRT · Loisteputki",color:"#255690", v:[0,0,0,0,2,5,8,11,12,12,12,12,12,12,12,12] },
  { id:"cell",  en:"Cellular",          fi:"Matkapuhelin",     color:"#2d6cb5", v:[0,0,0,0,0,0,0,0,3,8,15,20,25,25,25,25] },
  { id:"wifi",  en:"WiFi · LED · IoT",  fi:"WiFi · LED · IoT", color:"#3b82f6", v:[0,0,0,0,0,0,0,0,0,0,0,2,10,22,35,40] },
];

const EPIDEMICS = [
  { id:"sperm",      en:"Sperm decline",   fi:"Siittiökato",       color:"#f97316", v:[0,0,0,0,0,0,5,15,30,38,48,55,62,70,78,85],  lyr:1982 },
  { id:"obesity",    en:"Obesity",          fi:"Lihavuus",          color:"#ef4444", v:[2,3,3,4,5,8,12,18,35,48,60,68,78,88,95,100], lyr:1992 },
  { id:"t2d",        en:"Type 2 diabetes",  fi:"Tyypin 2 diabetes", color:"#f59e0b", v:[1,1,2,2,2,3,5,8,18,25,38,52,65,80,92,100],  lyr:2000 },
  { id:"autism",     en:"Autism spectrum",   fi:"Autismikirjo",      color:"#a855f7", v:[1,1,1,1,1,2,2,3,8,12,22,38,58,75,90,100],   lyr:2009 },
  { id:"depression", en:"Teen depression",  fi:"Nuorten masennus",  color:"#ec4899", v:[1,1,1,1,1,1,2,3,5,8,12,18,35,58,82,100],    lyr:2016 },
];

const SENTINELS = [
  { year:1989, en:"Golden Toad",     fi:"Kultasammakko", icon:"\u{1F438}" },
  { year:2007, en:"Colony Collapse", fi:"Mehiläiskato",   icon:"\u{1F41D}" },
  { year:2017, en:"Krefeld −75%",fi:"Krefeld −75%",icon:"\u{1F997}" },
];

const COPY = {
  en: {
    emfLabel: "CUMULATIVE EMF ENVIRONMENT",
    healthLabel: "HEALTH EPIDEMICS",
    thesis: "Five technology layers. Five health epidemics. One mechanism.",
    cta: "Explore the model",
    stat1: "88%", stat1Label: "chronic animal studies positive",
    stat2: "58%", stat2Label: "DNA damage below ICNIRP limit",
    stat3: "9 h", stat3Label: "EMF-free recovery window",
    koreaLabel: "South Korea",
    koreaDetail: "5 EMF layers · highest tech density",
    amishLabel: "Old Order Amish",
    amishDetail: "Minimal EMF exposure",
    vs: "vs",
    tfrLabel: "TFR",
  },
  fi: {
    emfLabel: "KUMULATIIVINEN EMF-YMPÄRISTÖ",
    healthLabel: "TERVEYSEPIDEMIAT",
    thesis: "Viisi teknologiakerrosta. Viisi terveysepidemaa. Yksi mekanismi.",
    cta: "Tutustu malliin",
    stat1: "88 %", stat1Label: "kroonisista eläinkokeista positiivisia",
    stat2: "58 %", stat2Label: "DNA-vauriosta alle ICNIRP-rajan",
    stat3: "9 h", stat3Label: "EMF-vapaa palautumisikkuna",
    koreaLabel: "Etelä-Korea",
    koreaDetail: "5 EMF-kerrosta · korkein teknologiatiheys",
    amishLabel: "Amish-yhteisö",
    amishDetail: "Minimaalinen EMF-altistus",
    vs: "vs",
    tfrLabel: "TFR",
  },
} as const;

const W = 1000, H = 560;
const CL = 60, CR = 940;
const AXIS = 270;
const ET = 30;
const HB = 510;

function xOf(yr: number) { return CL + ((yr - 1880) / 145) * (CR - CL); }
function emfY(v: number) { return AXIS - (v / 100) * (AXIS - ET); }
function hlthY(v: number) { return AXIS + (v / 100) * (HB - AXIS); }

function lerp(yr: number, vals: readonly number[]): number {
  if (yr <= YRS[0]) return vals[0];
  if (yr >= YRS[YRS.length - 1]) return vals[vals.length - 1];
  for (let i = 0; i < YRS.length - 1; i++) {
    if (yr >= YRS[i] && yr <= YRS[i + 1]) {
      const t = (yr - YRS[i]) / (YRS[i + 1] - YRS[i]);
      return vals[i] + t * (vals[i + 1] - vals[i]);
    }
  }
  return vals[vals.length - 1];
}

function smooth(pts: [number, number][]): string {
  if (pts.length < 2) return "";
  let d = `M${pts[0][0].toFixed(1)},${pts[0][1].toFixed(1)}`;
  for (let i = 1; i < pts.length; i++) {
    const mx = ((pts[i - 1][0] + pts[i][0]) / 2).toFixed(1);
    d += ` C${mx},${pts[i - 1][1].toFixed(1)} ${mx},${pts[i][1].toFixed(1)} ${pts[i][0].toFixed(1)},${pts[i][1].toFixed(1)}`;
  }
  return d;
}

function smoothReverse(pts: [number, number][]): string {
  const rev = [...pts].reverse();
  let d = `L${rev[0][0].toFixed(1)},${rev[0][1].toFixed(1)}`;
  for (let i = 1; i < rev.length; i++) {
    const mx = ((rev[i - 1][0] + rev[i][0]) / 2).toFixed(1);
    d += ` C${mx},${rev[i - 1][1].toFixed(1)} ${mx},${rev[i][1].toFixed(1)} ${rev[i][0].toFixed(1)},${rev[i][1].toFixed(1)}`;
  }
  return d;
}

export function BermMasterInfographic({ locale = "en" }: { locale?: Locale }) {
  const t = COPY[locale];
  const svgRef = useRef<SVGSVGElement>(null);
  const [hoverYr, setHoverYr] = useState<number | null>(null);

  const stacked = useMemo(() =>
    YRS.map((_, yi) => {
      let cum = 0;
      return LAYERS.map(l => { cum += l.v[yi]; return cum; });
    })
  , []);

  const emfPaths = useMemo(() =>
    LAYERS.map((layer, li) => {
      const top: [number, number][] = YRS.map((yr, yi) => [xOf(yr), emfY(stacked[yi][li])]);
      const bot: [number, number][] = YRS.map((yr, yi) => [xOf(yr), emfY(li > 0 ? stacked[yi][li - 1] : 0)]);
      return { ...layer, d: `${smooth(top)} ${smoothReverse(bot)} Z` };
    })
  , [stacked]);

  const healthPaths = useMemo(() =>
    EPIDEMICS.map(ep => {
      const pts: [number, number][] = YRS.map((yr, yi) => [xOf(yr), hlthY(ep.v[yi])]);
      const line = smooth(pts);
      const area = `${line} L${pts[pts.length - 1][0].toFixed(1)},${AXIS} L${pts[0][0].toFixed(1)},${AXIS} Z`;
      return { ...ep, line, area };
    })
  , []);

  const layerLabels = useMemo(() => {
    const last = YRS.length - 1;
    return LAYERS.map((l, li) => {
      const topY = emfY(stacked[last][li]);
      const botY = emfY(li > 0 ? stacked[last][li - 1] : 0);
      return { label: locale === "fi" ? l.fi : l.en, y: (topY + botY) / 2, h: botY - topY };
    });
  }, [stacked, locale]);

  const onMove = useCallback((e: React.MouseEvent<SVGSVGElement>) => {
    const svg = svgRef.current;
    if (!svg) return;
    const r = svg.getBoundingClientRect();
    const sx = ((e.clientX - r.left) / r.width) * W;
    const yr = 1880 + ((sx - CL) / (CR - CL)) * 145;
    setHoverYr(yr >= 1880 && yr <= 2025 ? Math.round(yr) : null);
  }, []);

  const hoverX = hoverYr !== null ? xOf(hoverYr) : 0;
  const hoverEmf = hoverYr !== null ? Math.round(LAYERS.reduce((s, l) => s + lerp(hoverYr, l.v), 0)) : 0;

  return (
    <section
      className="-mx-6 sm:mx-0 sm:rounded-2xl overflow-x-auto sm:overflow-hidden mb-14 mt-0 sm:mt-8"
      style={{ background: "linear-gradient(180deg, #060a16 0%, #0b1020 45%, #0b1020 55%, #060a16 100%)" }}
    >
      <svg
        ref={svgRef}
        viewBox={`0 0 ${W} ${H}`}
        className="w-full"
        style={{ minWidth: "min(540px, 100%)" }}
        role="img"
        aria-label={locale === "fi" ? "BERM-mallin peilikuvainfograafi: EMF-kuorma nousee, terveysindikaattorit laskevat" : "BERM mirror infographic: EMF load rises as health indicators decline"}
        onMouseMove={onMove}
        onMouseLeave={() => setHoverYr(null)}
      >
        {/* EMF section label */}
        <text x={CL} y={20} fill="#60a5fa" fontSize={10} fontWeight={600} letterSpacing="0.1em" opacity={0.5}>
          {t.emfLabel}
        </text>

        {/* EMF stacked areas */}
        {emfPaths.map(l => (
          <path key={l.id} d={l.d} fill={l.color} opacity={0.85} />
        ))}

        {/* Layer labels at right edge */}
        {layerLabels.map((l, i) =>
          l.h > 18 ? (
            <text key={i} x={CR - 8} y={l.y + 4} textAnchor="end" fill="rgba(255,255,255,0.6)" fontSize={11} fontWeight={500}>
              {l.label}
            </text>
          ) : null
        )}

        {/* Center axis */}
        <line x1={CL} y1={AXIS} x2={CR} y2={AXIS} stroke="rgba(255,255,255,0.1)" strokeWidth={1} />

        {/* Decade ticks */}
        {[1900, 1920, 1940, 1960, 1980, 2000, 2020].map(yr => (
          <g key={yr}>
            <line x1={xOf(yr)} y1={AXIS - 4} x2={xOf(yr)} y2={AXIS + 4} stroke="rgba(255,255,255,0.18)" />
            <text x={xOf(yr)} y={AXIS + 18} textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize={11}>
              {yr}
            </text>
          </g>
        ))}

        {/* Health epidemic fills + lines */}
        {healthPaths.map(ep => (
          <g key={ep.id}>
            <path d={ep.area} fill={ep.color} opacity={0.10} />
            <path d={ep.line} fill="none" stroke={ep.color} strokeWidth={4} opacity={0.2} />
            <path d={ep.line} fill="none" stroke={ep.color} strokeWidth={2.5} opacity={0.8} />
          </g>
        ))}

        {/* Health curve labels */}
        {healthPaths.map(ep => {
          const lv = lerp(ep.lyr, ep.v);
          return (
            <text
              key={`lbl-${ep.id}`}
              x={xOf(ep.lyr)}
              y={hlthY(lv) - 8}
              textAnchor="middle"
              fill={ep.color}
              fontSize={11}
              fontWeight={600}
              opacity={0.9}
            >
              {locale === "fi" ? ep.fi : ep.en}
            </text>
          );
        })}

        {/* Health section label */}
        <text x={CL} y={AXIS + 40} fill="rgba(239,68,68,0.4)" fontSize={10} fontWeight={600} letterSpacing="0.1em">
          {t.healthLabel}
        </text>

        {/* Sentinel markers */}
        {SENTINELS.map(s => (
          <g key={s.year}>
            <circle cx={xOf(s.year)} cy={AXIS} r={10} fill="rgba(34,197,94,0.1)" />
            <text x={xOf(s.year)} y={AXIS + 5} textAnchor="middle" fontSize={13}>
              {s.icon}
            </text>
          </g>
        ))}

        {/* Hover crosshair */}
        {hoverYr !== null && (
          <g style={{ pointerEvents: "none" }}>
            <line x1={hoverX} y1={ET} x2={hoverX} y2={HB} stroke="rgba(255,255,255,0.2)" strokeWidth={1} strokeDasharray="3 2" />
            <rect x={hoverX - 22} y={AXIS - 10} width={44} height={20} rx={10} fill="rgba(255,255,255,0.1)" />
            <text x={hoverX} y={AXIS + 4} textAnchor="middle" fill="white" fontSize={11} fontWeight={700}>
              {hoverYr}
            </text>
            <text x={hoverX} y={ET + 14} textAnchor="middle" fill="#60a5fa" fontSize={10} fontWeight={600}>
              EMF {hoverEmf}%
            </text>
            {EPIDEMICS.map(ep => {
              const v = lerp(hoverYr, ep.v);
              return (
                <circle key={ep.id} cx={hoverX} cy={hlthY(v)} r={4} fill={ep.color} stroke="#0b1020" strokeWidth={1.5} />
              );
            })}
            {SENTINELS.filter(s => Math.abs(s.year - hoverYr) <= 3).map(s => (
              <text key={`sh-${s.year}`} x={hoverX} y={AXIS + 34} textAnchor="middle" fill="#22c55e" fontSize={10} fontWeight={500}>
                {s.year} · {locale === "fi" ? s.fi : s.en}
              </text>
            ))}
          </g>
        )}
      </svg>

      {/* Below-chart content */}
      <div className="px-6 pb-10 pt-2 space-y-6 max-w-3xl mx-auto">
        <h1 className="text-center text-lg sm:text-xl lg:text-2xl font-serif text-white/90 tracking-tight leading-snug">
          {t.thesis}
        </h1>

        {/* Korea vs Amish */}
        <div className="flex items-center justify-center gap-8 sm:gap-14">
          <div className="text-center">
            <p className="font-mono text-3xl sm:text-4xl font-bold" style={{ color: "#ef4444" }}>0.72</p>
            <p className="text-sm text-white/70 mt-1">{t.koreaLabel}</p>
            <p className="text-xs text-white/40 mt-0.5">{t.koreaDetail}</p>
          </div>
          <div className="flex flex-col items-center gap-0.5">
            <span className="text-[10px] uppercase tracking-widest text-white/25">{t.tfrLabel}</span>
            <span className="text-sm text-white/40">{t.vs}</span>
          </div>
          <div className="text-center">
            <p className="font-mono text-3xl sm:text-4xl font-bold" style={{ color: "#22c55e" }}>6.1</p>
            <p className="text-sm text-white/70 mt-1">{t.amishLabel}</p>
            <p className="text-xs text-white/40 mt-0.5">{t.amishDetail}</p>
          </div>
        </div>

        {/* Key stats */}
        <div className="flex items-center justify-center gap-8 sm:gap-12">
          <div className="text-center">
            <p className="font-mono text-2xl sm:text-3xl font-bold" style={{ color: "#3b82f6" }}>{t.stat1}</p>
            <p className="text-xs text-white/50 mt-1 max-w-[8rem]">{t.stat1Label}</p>
          </div>
          <div className="text-center">
            <p className="font-mono text-2xl sm:text-3xl font-bold" style={{ color: "#ef4444" }}>{t.stat2}</p>
            <p className="text-xs text-white/50 mt-1 max-w-[8rem]">{t.stat2Label}</p>
          </div>
          <div className="text-center">
            <p className="font-mono text-2xl sm:text-3xl font-bold" style={{ color: "#f59e0b" }}>{t.stat3}</p>
            <p className="text-xs text-white/50 mt-1 max-w-[8rem]">{t.stat3Label}</p>
          </div>
        </div>

        <div className="text-center">
          <Link
            href={`/${locale}/model`}
            className="inline-flex items-center gap-2 text-sm font-medium transition-colors hover:brightness-125"
            style={{ color: "#60a5fa" }}
          >
            {t.cta} <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}
