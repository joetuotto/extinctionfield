"use client";

import { useState, useCallback, useRef, useMemo } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { pickCopy } from "@/lib/i18n";


const YRS = [1880,1900,1920,1940,1950,1960,1970,1980,1990,1995,2000,2005,2010,2015,2020,2025] as const;

const LAYERS = [
  { id:"grid",  en:"Power grid",        fi:"Sähköverkko",       ja:"送電網",           fr:"Reseau electrique",  ko:"전력망",          color:"#1a3354", v:[0,3,8,12,14,15,15,15,15,15,15,15,15,15,15,15] },
  { id:"radio", en:"Radio · Radar",     fi:"Radio · Tutka",     ja:"ラジオ · レーダー", fr:"Radio · Radar",      ko:"라디오 · 레이더", color:"#1e4470", v:[0,0,0.5,4,6,8,8,8,8,8,8,8,8,8,8,8] },
  { id:"crt",   en:"CRT · Fluorescent", fi:"CRT · Loisteputki", ja:"CRT · 蛍光灯",     fr:"CRT · Fluorescent",  ko:"CRT · 형광등",   color:"#255690", v:[0,0,0,0,2,5,8,11,12,12,12,12,12,12,12,12] },
  { id:"cell",  en:"Cellular",          fi:"Matkapuhelin",      ja:"携帯電話",          fr:"Cellulaire",         ko:"휴대전화",        color:"#2d6cb5", v:[0,0,0,0,0,0,0,0,3,8,15,20,25,25,25,25] },
  { id:"wifi",  en:"WiFi · LED · IoT",  fi:"WiFi · LED · IoT",  ja:"WiFi · LED · IoT", fr:"WiFi · LED · IoT",   ko:"WiFi · LED · IoT",color:"#3b82f6", v:[0,0,0,0,0,0,0,0,0,0,0,2,10,22,35,40] },
];

const EPIDEMICS = [
  { id:"sperm",      en:"Sperm decline",   fi:"Siittiökato",       ja:"精子減少",         fr:"Declin spermatique",  ko:"정자 감소",       color:"#f97316", v:[0,0,0,0,0,0,5,15,30,38,48,55,62,70,78,85],  lyr:1982, labelDy: 0 },
  { id:"obesity",    en:"Obesity",          fi:"Lihavuus",          ja:"肥満",             fr:"Obesite",             ko:"비만",            color:"#ef4444", v:[2,3,3,4,5,8,12,18,35,48,60,68,78,88,95,100], lyr:1992, labelDy: -18 },
  { id:"t2d",        en:"Type 2 diabetes",  fi:"Tyypin 2 diabetes", ja:"2型糖尿病",        fr:"Diabete de type 2",   ko:"제2형 당뇨병",    color:"#f59e0b", v:[1,1,2,2,2,3,5,8,18,25,38,52,65,80,92,100],  lyr:2000, labelDy: 10 },
  { id:"autism",     en:"Autism spectrum",   fi:"Autismikirjo",      ja:"自閉スペクトラム", fr:"Spectre autistique",  ko:"자폐 스펙트럼",   color:"#a855f7", v:[1,1,1,1,1,2,2,3,8,12,22,38,58,75,90,100],   lyr:2009, labelDy: -8 },
  { id:"depression", en:"Teen depression",  fi:"Nuorten masennus",  ja:"若者のうつ病",     fr:"Depression ado",      ko:"청소년 우울증",   color:"#ec4899", v:[1,1,1,1,1,1,2,3,5,8,12,18,35,58,82,100],    lyr:2016, labelDy: 8 },
];

const SENTINELS = [
  { year:1989, en:"Golden Toad",     fi:"Kultasammakko",  ja:"オウゴンヒキガエル",  fr:"Crapaud dore",         ko:"황금두꺼비",     icon:"\u{1F438}" },
  { year:2007, en:"Colony Collapse", fi:"Mehiläiskato",    ja:"蜂群崩壊",            fr:"Effondrement colonies",ko:"군집붕괴",       icon:"\u{1F41D}" },
  { year:2017, en:"Krefeld −75%",    fi:"Krefeld −75%",   ja:"クレーフェルト −75%",  fr:"Krefeld −75%",         ko:"크레펠트 −75%", icon:"\u{1F997}" },
];

const COPY = {
  en: {
    ariaLabel: "BERM mirror infographic: EMF load rises as health indicators decline",
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
    ariaLabel: "BERM-mallin peilikuvainfograafi: EMF-kuorma nousee, terveysindikaattorit laskevat",
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
  ja: {
    ariaLabel: "BERMミラーインフォグラフィック：EMF負荷の増加と健康指標の低下",
    emfLabel: "累積EMF環境",
    healthLabel: "健康疫病",
    thesis: "5つの技術層。5つの健康疫病。1つのメカニズム。",
    cta: "モデルを探索",
    stat1: "88%", stat1Label: "慢性動物実験で陽性",
    stat2: "58%", stat2Label: "ICNIRP基準値以下でDNA損傷",
    stat3: "9時間", stat3Label: "EMFフリー回復時間",
    koreaLabel: "韓国",
    koreaDetail: "5つのEMF層 · 最高の技術密度",
    amishLabel: "旧派アーミッシュ",
    amishDetail: "最小限のEMF曝露",
    vs: "vs",
    tfrLabel: "TFR",
  },
  fr: {
    ariaLabel: "Infographie miroir BERM : la charge EMF augmente tandis que les indicateurs de sante declinent",
    emfLabel: "ENVIRONNEMENT EMF CUMULATIF",
    healthLabel: "EPIDEMIES DE SANTE",
    thesis: "Cinq couches technologiques. Cinq epidemies de sante. Un mecanisme.",
    cta: "Explorer le modele",
    stat1: "88 %", stat1Label: "études animales chroniques positives",
    stat2: "58 %", stat2Label: "dommages ADN sous la limite ICNIRP",
    stat3: "9 h", stat3Label: "fenêtre de récupération sans EMF",
    koreaLabel: "Corée du Sud",
    koreaDetail: "5 couches EMF · densité technologique maximale",
    amishLabel: "Amish traditionnels",
    amishDetail: "Exposition EMF minimale",
    vs: "vs",
    tfrLabel: "TFR",
  },
  ko: {
    ariaLabel: "BERM 미러 인포그래픽: EMF 부하가 증가하고 건강 지표가 하락",
    emfLabel: "누적 EMF 환경",
    healthLabel: "건강 유행병",
    thesis: "5개의 기술 계층. 5개의 건강 유행병. 하나의 메커니즘.",
    cta: "모델 탐색",
    stat1: "88%", stat1Label: "만성 동물 연구에서 양성",
    stat2: "58%", stat2Label: "ICNIRP 기준 이하에서 DNA 손상",
    stat3: "9시간", stat3Label: "EMF 없는 회복 시간",
    koreaLabel: "대한민국",
    koreaDetail: "5개 EMF 계층 · 최고 기술 밀도",
    amishLabel: "구파 아미시",
    amishDetail: "최소한의 EMF 노출",
    vs: "vs",
    tfrLabel: "TFR",
  },
} as const;

const W = 1000, H = 560;
const CL = 60, CR = 940;
const AXIS = 270;
const ET = 30;
const HB = 510;

/** Pick a locale-keyed string from an object that has en/fi/ja/fr/ko fields. */
function pickName(item: Record<string, unknown>, locale: string): string {
  return (item[locale] as string) ?? (item.en as string);
}

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

export function BermMasterInfographic({ locale = "en" }: { locale?: string }) {
  const t = pickCopy(COPY, locale);
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
      return { label: pickName(l, locale), y: (topY + botY) / 2, h: botY - topY };
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
      className="chart-scroll -mx-6 mb-14 mt-0 border-y border-card-border sm:mx-0 sm:rounded-2xl sm:border"
      style={{ background: "var(--figure-bg)" }}
    >
      <svg
        ref={svgRef}
        viewBox={`0 0 ${W} ${H}`}
        className="chart-svg w-full"
        style={{ minWidth: 720 }}
        role="img"
        aria-label={t.ariaLabel}
        onMouseMove={onMove}
        onMouseLeave={() => setHoverYr(null)}
      >
        {/* EMF section label */}
        <text x={CL} y={20} fill="var(--accent)" fontSize={10} fontWeight={600} letterSpacing="0.1em" opacity={0.75}>
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
        <line x1={CL} y1={AXIS} x2={CR} y2={AXIS} stroke="var(--chart-grid)" strokeWidth={1} />

        {/* Decade ticks */}
        {[1900, 1920, 1940, 1960, 1980, 2000, 2020].map(yr => (
          <g key={yr}>
            <line x1={xOf(yr)} y1={AXIS - 4} x2={xOf(yr)} y2={AXIS + 4} stroke="var(--chart-axis)" />
            <text x={xOf(yr)} y={AXIS + 18} textAnchor="middle" fill="var(--foreground-muted)" fontSize={11}>
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
          const pointX = xOf(ep.lyr);
          const pointY = hlthY(lv);
          const labelY = pointY - 8 + ep.labelDy;
          return (
            <g key={`lbl-${ep.id}`}>
              {ep.labelDy !== 0 && (
                <path
                  d={`M ${pointX} ${pointY - 3} L ${pointX} ${labelY + 4}`}
                  fill="none"
                  stroke={ep.color}
                  strokeWidth={1}
                  strokeDasharray="2 3"
                  opacity={0.55}
                />
              )}
              <text
                x={pointX}
                y={labelY}
                textAnchor="middle"
                fill={ep.color}
                fontSize={11}
                fontWeight={650}
                opacity={0.95}
                stroke="var(--figure-bg)"
                strokeWidth={3}
                paintOrder="stroke"
              >
                {pickName(ep, locale)}
              </text>
            </g>
          );
        })}

        {/* Health section label */}
        <text x={CL} y={AXIS + 40} fill="var(--status-refuted)" opacity={0.7} fontSize={10} fontWeight={600} letterSpacing="0.1em">
          {t.healthLabel}
        </text>

        {/* Sentinel markers */}
        {SENTINELS.map(s => (
          <g key={s.year}>
            <circle cx={xOf(s.year)} cy={AXIS} r={10} fill="var(--status-confirmed)" opacity={0.12} />
            <text x={xOf(s.year)} y={AXIS + 5} textAnchor="middle" fontSize={13}>
              {s.icon}
            </text>
          </g>
        ))}

        {/* Hover crosshair */}
        {hoverYr !== null && (
          <g style={{ pointerEvents: "none" }}>
            <line x1={hoverX} y1={ET} x2={hoverX} y2={HB} stroke="var(--chart-axis)" strokeWidth={1} strokeDasharray="3 2" />
            <rect x={hoverX - 22} y={AXIS - 10} width={44} height={20} rx={10} fill="var(--background-secondary)" />
            <text x={hoverX} y={AXIS + 4} textAnchor="middle" fill="var(--foreground)" fontSize={11} fontWeight={700}>
              {hoverYr}
            </text>
            <text x={hoverX} y={ET + 14} textAnchor="middle" fill="var(--accent)" fontSize={10} fontWeight={600}>
              EMF {hoverEmf}%
            </text>
            {EPIDEMICS.map(ep => {
              const v = lerp(hoverYr, ep.v);
              return (
                <circle key={ep.id} cx={hoverX} cy={hlthY(v)} r={4} fill={ep.color} stroke="var(--figure-bg)" strokeWidth={1.5} />
              );
            })}
            {SENTINELS.filter(s => Math.abs(s.year - hoverYr) <= 3).map(s => (
              <text key={`sh-${s.year}`} x={hoverX} y={AXIS + 34} textAnchor="middle" fill="var(--status-confirmed)" fontSize={10} fontWeight={500}>
                {s.year} · {pickName(s, locale)}
              </text>
            ))}
          </g>
        )}
      </svg>

      {/* Below-chart content */}
      <div className="px-6 pb-10 pt-2 space-y-6 max-w-3xl mx-auto">
        <h1 className="text-center text-lg sm:text-xl lg:text-2xl font-serif text-foreground tracking-tight leading-snug">
          {t.thesis}
        </h1>

        {/* Korea vs Amish */}
        <div className="flex items-center justify-center gap-8 sm:gap-14">
          <div className="text-center">
            <p className="font-mono text-3xl sm:text-4xl font-bold" style={{ color: "var(--status-refuted)" }}>0.72</p>
            <p className="text-sm text-foreground mt-1">{t.koreaLabel}</p>
            <p className="text-xs text-foreground-muted mt-0.5">{t.koreaDetail}</p>
          </div>
          <div className="flex flex-col items-center gap-0.5">
            <span className="text-[10px] uppercase tracking-widest text-foreground-muted">{t.tfrLabel}</span>
            <span className="text-sm text-foreground-muted">{t.vs}</span>
          </div>
          <div className="text-center">
            <p className="font-mono text-3xl sm:text-4xl font-bold" style={{ color: "var(--status-confirmed)" }}>6.1</p>
            <p className="text-sm text-foreground mt-1">{t.amishLabel}</p>
            <p className="text-xs text-foreground-muted mt-0.5">{t.amishDetail}</p>
          </div>
        </div>

        {/* Key stats */}
        <div className="flex items-center justify-center gap-8 sm:gap-12">
          <div className="text-center">
            <p className="font-mono text-2xl sm:text-3xl font-bold" style={{ color: "var(--accent)" }}>{t.stat1}</p>
            <p className="text-xs text-foreground-muted mt-1 max-w-[8rem]">{t.stat1Label}</p>
          </div>
          <div className="text-center">
            <p className="font-mono text-2xl sm:text-3xl font-bold" style={{ color: "var(--status-refuted)" }}>{t.stat2}</p>
            <p className="text-xs text-foreground-muted mt-1 max-w-[8rem]">{t.stat2Label}</p>
          </div>
          <div className="text-center">
            <p className="font-mono text-2xl sm:text-3xl font-bold" style={{ color: "var(--status-partial)" }}>{t.stat3}</p>
            <p className="text-xs text-foreground-muted mt-1 max-w-[8rem]">{t.stat3Label}</p>
          </div>
        </div>

        <div className="text-center">
          <Link
            href={`/${locale}/model`}
            className="inline-flex items-center gap-2 text-sm font-medium transition-colors hover:brightness-125"
            style={{ color: "var(--accent)" }}
          >
            {t.cta} <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}
