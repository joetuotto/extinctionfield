"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import * as d3 from "d3";
import { geoNaturalEarth1, geoPath } from "d3-geo";
import type { FeatureCollection, Feature, Geometry } from "geojson";

type Layer = "tfr" | "mobile";

interface MapData {
  [iso3: string]: {
    tfr: Record<string, number>;
    mobile: Record<string, number>;
    berm_country: string | null;
  };
}

interface GeoProperties {
  ISO_A3: string;
  ISO_A3_EH: string;
  NAME: string;
  ADMIN: string;
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
    label: "Total Fertility Rate",
    unit: "births/woman",
    domain: [0.5, 7],
    colorScale: (t: number) => d3.interpolateRdYlGn(t),
    format: (v: number) => v.toFixed(2),
  },
  mobile: {
    label: "Mobile Subscriptions",
    unit: "per 100 people",
    domain: [0, 200],
    colorScale: (t: number) => d3.interpolateYlOrRd(t),
    format: (v: number) => v.toFixed(0),
  },
};

function getISO3(feature: Feature<Geometry, GeoProperties>): string {
  const p = feature.properties;
  if (p.ISO_A3 !== "-99") return p.ISO_A3;
  return p.ISO_A3_EH || "";
}

export function WorldMap({ locale }: { locale: string }) {
  const svgRef = useRef<SVGSVGElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const [mapData, setMapData] = useState<MapData | null>(null);
  const [geoData, setGeoData] =
    useState<FeatureCollection<Geometry, GeoProperties> | null>(null);
  const [year, setYear] = useState(2024);
  const [layer, setLayer] = useState<Layer>("tfr");
  const [playing, setPlaying] = useState(false);
  const animRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const stateRef = useRef({ mapData, layer, year });
  stateRef.current = { mapData, layer, year };

  useEffect(() => {
    Promise.all([
      fetch("/data/map_data.json").then((r) => r.json()),
      fetch("/data/geojson/ne_110m_countries.json").then((r) => r.json()),
    ]).then(([md, geo]) => {
      setMapData(md);
      setGeoData(geo);
    });
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

    const svg = d3.select(svgRef.current);
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
      .on("mouseenter", function (_event, d) {
        const iso3 = getISO3(d);
        const { mapData: md, layer: ly, year: yr } = stateRef.current;
        d3.select(this).attr("stroke", "var(--accent)").attr("stroke-width", 1.5);

        const tooltip = tooltipRef.current;
        if (tooltip) {
          const val = getValueFor(iso3, ly, yr, md);
          const berm = md?.[iso3]?.berm_country;
          const config = LAYER_CONFIG[ly];
          tooltip.innerHTML = `
            <strong>${d.properties.ADMIN || d.properties.NAME}</strong>
            ${berm ? `<span style="opacity:0.6;font-size:11px"> (BERM)</span>` : ""}
            <br/>
            ${val !== null ? `${config.label}: <strong>${config.format(val)}</strong> ${config.unit}` : "No data"}
          `;
          tooltip.style.display = "block";
        }
      })
      .on("mousemove", function (event) {
        const tooltip = tooltipRef.current;
        if (tooltip) {
          const rect = svgRef.current!.getBoundingClientRect();
          tooltip.style.left = `${event.clientX - rect.left + 12}px`;
          tooltip.style.top = `${event.clientY - rect.top - 10}px`;
        }
      })
      .on("mouseleave", function () {
        d3.select(this)
          .attr("stroke", "var(--card-border)")
          .attr("stroke-width", 0.5);
        if (tooltipRef.current) tooltipRef.current.style.display = "none";
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [geoData, mapData]);

  // Update fills on year/layer change (fast — no path recreation or event rebinding)
  useEffect(() => {
    if (!svgRef.current || !geoData) return;

    d3.select(svgRef.current)
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
  const legendSteps = 6;

  if (!mapData || !geoData) {
    return (
      <div className="w-full h-64 flex items-center justify-center text-foreground-muted">
        {locale === "fi" ? "Ladataan karttaa..." : "Loading map..."}
      </div>
    );
  }

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
              {l === "tfr" ? "TFR" : locale === "fi" ? "Mobiili" : "Mobile"}
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
          className="absolute pointer-events-none bg-background/95 border border-card-border
                     rounded-lg px-3 py-2 text-sm shadow-lg"
          style={{ display: "none" }}
        />
      </div>

      <div className="flex items-center gap-2 text-xs text-foreground-muted">
        <span>{config.format(config.domain[0])}</span>
        <div className="flex h-3 rounded-sm overflow-hidden flex-1 max-w-48">
          {Array.from({ length: legendSteps }, (_, i) => {
            const t = i / (legendSteps - 1);
            return (
              <div
                key={i}
                className="flex-1"
                style={{ backgroundColor: config.colorScale(t) }}
              />
            );
          })}
        </div>
        <span>{config.format(config.domain[1])}</span>
        <span className="ml-2">{config.unit}</span>
      </div>
    </div>
  );
}
