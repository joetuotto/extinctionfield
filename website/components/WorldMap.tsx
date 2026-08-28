"use client";

import { useEffect, useMemo, useRef, useState, useCallback } from "react";
import { select } from "d3-selection";
import { interpolateViridis, interpolateCividis } from "d3-scale-chromatic";
import { geoNaturalEarth1, geoPath } from "d3-geo";
import type { FeatureCollection, Feature, Geometry } from "geojson";
import { CountryDetailPanel } from "@/components/CountryDetailPanel";
import { pickCopy } from "@/lib/i18n";

type Layer = "tfr" | "mobile";

interface MapData {
  [iso3: string]: {
    tfr: Record<string, number>;
    mobile: Record<string, number>;
    // Retained because it exists in the public payload, but it is not a map
    // layer: all records currently have no country-level FieldState profile.
    berm_country?: string | null;
  };
}

interface GeoProperties {
  ISO_A3: string;
  ISO_A3_EH: string;
  ISO_A2: string;
  ISO_A2_EH: string;
  NAME: string;
  ADMIN: string;
}

function positionTooltip(
  tooltip: HTMLDivElement,
  svg: SVGSVGElement,
  clientX: number,
  clientY: number,
) {
  const bounds = svg.getBoundingClientRect();
  const gap = 12;
  const edge = 8;
  const width = Math.min(tooltip.offsetWidth, Math.max(0, bounds.width - edge * 2));
  const height = tooltip.offsetHeight;
  const pointerX = clientX - bounds.left;
  const pointerY = clientY - bounds.top;

  let left = pointerX + gap;
  if (left + width > bounds.width - edge) left = pointerX - gap - width;
  left = Math.max(edge, Math.min(left, bounds.width - edge - width));

  let top = pointerY - height / 2;
  if (top + height > bounds.height - edge) top = bounds.height - edge - height;
  top = Math.max(edge, top);

  tooltip.style.left = `${left}px`;
  tooltip.style.top = `${top}px`;
}

const LAYER_CONFIG: Record<
  Layer,
  {
    label: string;
    unit: string;
    domain: [number, number];
    colorScale: (t: number) => string;
    format: (v: number) => string;
  }
> = {
  tfr: {
    label: "World Bank published TFR series",
    unit: "births/woman",
    domain: [0.5, 7],
    // Sequential, colour-vision-safe: low TFR reads as the dark, saturated end.
    // Reversed so the darkest colour marks the lowest fertility.
    colorScale: (t: number) => interpolateViridis(1 - t),
    format: (v: number) => v.toFixed(2),
  },
  mobile: {
    label: "Mobile subscriptions (technology-timing proxy)",
    unit: "per 100 people",
    domain: [0, 200],
    colorScale: (t: number) => interpolateCividis(t),
    format: (v: number) => v.toFixed(0),
  },
};

/**
 * Natural Earth ships English names only. The browser's own region names give
 * a correct label in either locale without shipping a translation table.
 */
function localisedName(
  feature: Feature<Geometry, GeoProperties>,
  display: Intl.DisplayNames | null,
): string {
  const p = feature.properties;
  const iso2 = p.ISO_A2 !== "-99" ? p.ISO_A2 : p.ISO_A2_EH;
  if (display && iso2 && iso2 !== "-99") {
    try {
      const name = display.of(iso2);
      if (name && name !== iso2) return name;
    } catch {
      // Fall through to the English name below.
    }
  }
  return p.ADMIN || p.NAME;
}

function getISO3(feature: Feature<Geometry, GeoProperties>): string {
  const p = feature.properties;
  if (p.ISO_A3 !== "-99") return p.ISO_A3;
  return p.ISO_A3_EH || "";
}

const LOW_EMF_MARKERS = [
  { name: "Tsimane", lat: -14.8, lon: -65.5, detail: "TFR ~9 · Lowest CVD recorded · Dementia 1.2%" },
  { name: "Hadza", lat: -3.8, lon: 35.0, detail: "TFR 6-7 · Obesity <5% · T2D 0-2%" },
  { name: "Kitava", lat: -8.5, lon: 151.1, detail: "CVD absent · T2D absent · High-carb diet" },
  { name: "Aché", lat: -24.0, lon: -56.0, detail: "TFR ~8 · Low obesity" },
  { name: "San", lat: -22.0, lon: 21.0, detail: "TFR 4-5 · Low CVD · Low T2D" },
  { name: "Shuar", lat: -2.5, lon: -77.5, detail: "TFR ~5 · Low obesity" },
  { name: "Amish (OH)", lat: 40.5, lon: -81.1, detail: "TFR 6.1 · Cancer 60% of US · Depression <1%" },
  { name: "Mosetén", lat: -15.4, lon: -67.5, detail: "Intermediate — Tsimane-Modern gradient" },
];

const copy = {
  en: {
    loading: "Loading map...",
    tfr: "TFR (World Bank series)",
    mobile: "Mobile subscriptions (technology-timing proxy)",
    selected: "Selected country",
    select: "Select a country to inspect data for this layer.",
    noData: "No data for selected year",
    tfrSource: "TFR map: World Bank WDI published TFR series. It may incorporate harmonised national sources and UN demographic estimates; it is not the WPP ASFR panel.",
    mobileNote: "Mobile subscription density is a composite proxy for the electromagnetic environment, not measured RF exposure, a FieldState vector, or a dose metric.",
  },
  ja: {
    loading: "地図を読み込み中...",
    tfr: "TFR（世界銀行シリーズ）",
    mobile: "モバイル加入（技術タイミングプロキシ）",
    selected: "選択された国",
    select: "この層のデータを確認するには国を選択してください。",
    noData: "選択された年のデータなし",
    tfrSource: "TFRマップ：世界銀行WDI公開TFRシリーズ。調和された国家ソースとUN人口推定を含む場合がある。WPP ASFRパネルではない。",
    mobileNote: "モバイル加入密度は電磁環境の複合プロキシであり、測定されたRF曝露、FieldStateベクトル、線量指標ではない。",
  },
  fr: {
    loading: "Chargement de la carte...",
    tfr: "TFR (série Banque mondiale)",
    mobile: "Abonnements mobiles (proxy temporel technologique)",
    selected: "Pays sélectionné",
    select: "Sélectionnez un pays pour inspecter les données de cette couche.",
    noData: "Pas de données pour l'année sélectionnée",
    tfrSource: "Carte TFR : série TFR publiée par la Banque mondiale WDI. Elle peut incorporer des sources nationales harmonisées et des estimations démographiques de l'ONU ; ce n'est pas le panel ASFR WPP.",
    mobileNote: "La densité d'abonnements mobiles est un proxy composite pour l'environnement électromagnétique, pas une exposition RF mesurée, un vecteur FieldState ou une métrique de dose.",
  },
  ko: {
    loading: "지도 로딩 중...",
    tfr: "TFR (세계은행 시리즈)",
    mobile: "모바일 가입 (기술 타이밍 프록시)",
    selected: "선택된 국가",
    select: "이 층의 데이터를 확인하려면 국가를 선택하세요.",
    noData: "선택된 연도의 데이터 없음",
    tfrSource: "TFR 지도: 세계은행 WDI 공개 TFR 시리즈. 조화된 국가 소스와 UN 인구 추정을 포함할 수 있으며, WPP ASFR 패널이 아닙니다.",
    mobileNote: "모바일 가입 밀도는 전자기 환경의 복합 프록시이며, 측정된 RF 노출, FieldState 벡터 또는 선량 지표가 아닙니다.",
  },
  fi: {
    loading: "Ladataan karttaa...",
    tfr: "TFR (Maailmanpankin sarja)",
    mobile: "Mobiililiittymät (teknologia-ajoituksen proxy)",
    selected: "Valittu maa",
    select: "Valitse maa kartalta nähdäksesi kyseisen tason tiedot.",
    noData: "Ei tietoa valitulle vuodelle",
    tfrSource: "TFR-kartta: Maailmanpankin WDI:n julkaistu TFR-sarja. Se voi sisältää kansallisten lähteiden ja YK:n väestöarvioiden harmonisointeja; kartta ei ole WPP:n ASFR-paneeli.",
    mobileNote: "Mobiililiittymätiheys on yhdistelmäproksi sähkömagneettiselle ympäristölle, ei mitattu RF-altistus, FieldState-vektori tai annosmitta.",
  },
} as const;

export function WorldMap({ locale }: { locale: string }) {
  const displayNames = useMemo(() => {
    try {
      return new Intl.DisplayNames([locale], { type: "region" });
    } catch {
      return null;
    }
  }, [locale]);
  const svgRef = useRef<SVGSVGElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const [mapData, setMapData] = useState<MapData | null>(null);
  const [geoData, setGeoData] =
    useState<FeatureCollection<Geometry, GeoProperties> | null>(null);
  const [year, setYear] = useState(2024);
  const [layer, setLayer] = useState<Layer>("tfr");
  const [selectedISO3, setSelectedISO3] = useState<string | null>(null);
  const [playing, setPlaying] = useState(false);
  const animRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const stateRef = useRef({ mapData, layer, year, displayNames });

  useEffect(() => {
    stateRef.current = { mapData, layer, year, displayNames };
  }, [mapData, layer, year, displayNames]);

  useEffect(() => {
    const controller = new AbortController();
    Promise.all([
      fetch("/data/map_data.json", { signal: controller.signal }).then((r) => {
        if (!r.ok) throw new Error(`map_data: ${r.status}`);
        return r.json();
      }),
      fetch("/data/geojson/ne_110m_countries.json", { signal: controller.signal }).then((r) => {
        if (!r.ok) throw new Error(`geojson: ${r.status}`);
        return r.json();
      }),
    ]).then(([md, geo]) => {
      setMapData(md);
      setGeoData(geo);
    }).catch((e) => {
      if (e.name !== "AbortError") console.error("WorldMap data fetch failed:", e);
    });
    return () => controller.abort();
  }, []);

  const getValueFor = useCallback(
    (iso3: string, ly: Layer, yr: number, md: MapData | null): number | null => {
      const country = md?.[iso3];
      if (!country) return null;
      const series = ly === "tfr" ? country.tfr : country.mobile;
      return series?.[String(yr)] ?? null;
    },
    []
  );

  const getColorFor = useCallback(
    (iso3: string, ly: Layer, yr: number, md: MapData | null): string => {
      const val = getValueFor(iso3, ly, yr, md);
      if (val === null) return "var(--card-border)";
      const config = LAYER_CONFIG[ly];
      const t = Math.max(
        0,
        Math.min(1, (val - config.domain[0]) / (config.domain[1] - config.domain[0]))
      );
      return config.colorScale(t);
    },
    [getValueFor]
  );

  // Create paths and register event handlers once
  useEffect(() => {
    if (!svgRef.current || !geoData || !mapData) return;

    const svg = select(svgRef.current);
    const width = svgRef.current.clientWidth || 800;
    const height = width * 0.52;

    svg.attr("viewBox", `0 0 ${width} ${height}`);

    const projection = geoNaturalEarth1()
      .fitSize([width - 20, height - 20], geoData)
      .translate([width / 2, height / 2]);

    const pathGen = geoPath().projection(projection);

    svg.select(".countries").selectAll("path").remove();

    svg
      .select(".countries")
      .selectAll<SVGPathElement, Feature<Geometry, GeoProperties>>("path")
      .data(geoData.features, (d) => getISO3(d))
      .enter()
      .append("path")
      .attr("d", (d) => pathGen(d) || "")
      .attr("stroke", "var(--card-border)")
      .attr("stroke-width", 0.5)
      .attr("fill", "var(--card-border)")
      .on("mouseenter", function (event, d) {
        const iso3 = getISO3(d);
        const { mapData: md, layer: ly, year: yr } = stateRef.current;
        select(this).attr("stroke", "var(--accent)").attr("stroke-width", 1.5);

        const tooltip = tooltipRef.current;
        if (tooltip) {
          const val = getValueFor(iso3, ly, yr, md);
          const config = LAYER_CONFIG[ly];
          tooltip.innerHTML = `
            <strong>${localisedName(d, stateRef.current.displayNames)}</strong>
            <br/>
            ${val !== null ? `${config.label}: <strong>${config.format(val)}</strong> ${config.unit}` : "No data"}
          `;
          tooltip.style.display = "block";
          positionTooltip(tooltip, svgRef.current!, event.clientX, event.clientY);
        }
      })
      .on("mousemove", function (event) {
        const tooltip = tooltipRef.current;
        if (tooltip) {
          positionTooltip(tooltip, svgRef.current!, event.clientX, event.clientY);
        }
      })
      .on("mouseleave", function () {
        select(this)
          .attr("stroke", "var(--card-border)")
          .attr("stroke-width", 0.5);
        if (tooltipRef.current) tooltipRef.current.style.display = "none";
      })
      .on("click", function (_event, d) {
        setSelectedISO3(getISO3(d));
      });

    // ── Low-EMF community markers ──
    svg.select(".markers").remove();
    const markers = svg.append("g").attr("class", "markers");

    LOW_EMF_MARKERS.forEach((m) => {
      const coords = projection([m.lon, m.lat]);
      if (!coords) return;

      markers
        .append("circle")
        .attr("cx", coords[0])
        .attr("cy", coords[1])
        .attr("r", 4)
        .attr("fill", "#f59e0b")
        .attr("stroke", "#fff")
        .attr("stroke-width", 1.5)
        .style("cursor", "pointer")
        .on("mouseenter", function (event) {
          select(this).attr("r", 6);
          const tooltip = tooltipRef.current;
          if (tooltip) {
            tooltip.innerHTML = `<strong>${m.name}</strong><br/>${m.detail}`;
            tooltip.style.display = "block";
            positionTooltip(tooltip, svgRef.current!, event.clientX, event.clientY);
          }
        })
        .on("mousemove", function (event) {
          const tooltip = tooltipRef.current;
          if (tooltip) {
            positionTooltip(tooltip, svgRef.current!, event.clientX, event.clientY);
          }
        })
        .on("mouseleave", function () {
          select(this).attr("r", 4);
          if (tooltipRef.current) tooltipRef.current.style.display = "none";
        });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [geoData, mapData]);

  // Update fills on year/layer change (fast — no path recreation or event rebinding)
  useEffect(() => {
    if (!svgRef.current || !geoData) return;

    select(svgRef.current)
      .select(".countries")
      .selectAll<SVGPathElement, Feature<Geometry, GeoProperties>>("path")
      .attr("fill", (d) => getColorFor(getISO3(d), layer, year, mapData));
  }, [geoData, layer, year, mapData, getColorFor]);

  useEffect(() => {
    if (playing) {
      animRef.current = setInterval(() => {
        setYear((y) => {
          if (y >= 2024) {
            setPlaying(false);
            return 2024;
          }
          return y + 1;
        });
      }, 200);
    }
    return () => {
      if (animRef.current) clearInterval(animRef.current);
    };
  }, [playing]);

  const config = LAYER_CONFIG[layer];
  const legendSteps = 12;

  const labels = pickCopy(copy, locale);

  if (!mapData || !geoData) {
    return (
      <div className="w-full h-64 flex items-center justify-center text-foreground-muted">
        {labels.loading}
      </div>
    );
  }

  const selectedFeature = geoData.features.find(
    (feature) => getISO3(feature) === selectedISO3,
  );
  const selectedName = selectedFeature
    ? localisedName(selectedFeature, displayNames)
    : undefined;
  const selectedValue = selectedISO3
    ? getValueFor(selectedISO3, layer, year, mapData)
    : null;

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex gap-2">
          {(["tfr", "mobile"] as Layer[]).map((l) => (
            <button
              key={l}
              onClick={() => setLayer(l)}
              className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
                layer === l
                  ? "bg-accent text-white"
                  : "bg-card-bg border border-card-border text-foreground-muted hover:text-foreground"
              }`}
            >
              {labels[l]}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3 flex-1 min-w-0">
          <button
            onClick={() => {
              if (playing) {
                setPlaying(false);
              } else {
                if (year >= 2024) setYear(1960);
                setPlaying(true);
              }
            }}
            className="px-3 py-1.5 rounded-lg text-sm bg-card-bg border border-card-border
                       text-foreground-muted hover:text-foreground transition-colors"
          >
            {playing ? "⏸" : "▶"}
          </button>
          <input
            type="range"
            min={1960}
            max={2024}
            value={year}
            onChange={(e) => {
              setYear(Number(e.target.value));
              setPlaying(false);
            }}
            className="flex-1 min-w-0 accent-accent"
          />
          <span className="text-sm font-mono text-foreground-muted w-10 text-right">
            {year}
          </span>
        </div>
      </div>

      <div className="relative">
        <svg
          ref={svgRef}
          className="w-full"
          style={{ aspectRatio: "1.92/1" }}
          aria-label="World map"
        >
          <g className="countries" />
        </svg>
        <div
          ref={tooltipRef}
          className="absolute z-10 pointer-events-none break-words bg-background/95 border border-card-border
                     rounded-lg px-3 py-2 text-sm leading-snug shadow-lg"
          style={{ display: "none", maxWidth: "min(18rem, calc(100% - 1rem))" }}
        />
      </div>

      <div className="border-t border-card-border pt-3 text-sm">
        <p className="text-xs uppercase tracking-wider text-foreground-muted mb-1">
          {labels.selected}
        </p>
        {selectedISO3 && selectedName ? (
          <p className="text-foreground">
            <span className="font-medium">{selectedName}</span>
            {selectedValue === null ? (
              <span className="text-foreground-muted"> · {labels.noData}</span>
            ) : (
              <span className="text-foreground-muted">
                {" "}· {config.format(selectedValue)} {config.unit}
              </span>
            )}
          </p>
        ) : (
          <p className="text-foreground-muted">{labels.select}</p>
        )}
      </div>

      {selectedISO3 && selectedName && mapData?.[selectedISO3] && (
        <CountryDetailPanel
          iso3={selectedISO3}
          name={selectedName}
          tfr={mapData[selectedISO3].tfr}
          mobile={mapData[selectedISO3].mobile}
          locale={locale}
        />
      )}

      <div className="max-w-md">
        <div
          className="h-4 w-full rounded-sm"
          style={{
            backgroundImage: `linear-gradient(to right, ${Array.from(
              { length: legendSteps },
              (_, i) => config.colorScale(i / (legendSteps - 1))
            ).join(", ")})`,
          }}
        />
        <div className="mt-1.5 flex justify-between font-mono-num text-xs text-foreground-muted">
          {Array.from({ length: 5 }, (_, i) => {
            const t = i / 4;
            const value =
              config.domain[0] + t * (config.domain[1] - config.domain[0]);
            return <span key={i}>{config.format(value)}</span>;
          })}
        </div>
        <p className="mt-1 text-xs text-foreground-muted">{config.unit}</p>
      </div>
      {layer === "mobile" && (
        <p className="text-xs leading-relaxed text-foreground-muted">
          {labels.mobileNote}
        </p>
      )}
      {layer === "tfr" && (
        <p className="text-xs leading-relaxed text-foreground-muted">{labels.tfrSource}</p>
      )}
    </div>
  );
}
