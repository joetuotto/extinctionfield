"use client";

import { useEffect, useMemo, useRef, useState, useCallback } from "react";
import * as d3 from "d3";
import { geoNaturalEarth1, geoPath } from "d3-geo";
import type { FeatureCollection, Feature, Geometry } from "geojson";
import { CountryDetailPanel } from "@/components/CountryDetailPanel";

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
    colorScale: (t: number) => d3.interpolateViridis(1 - t),
    format: (v: number) => v.toFixed(2),
  },
  mobile: {
    label: "Mobile subscriptions (technology-timing proxy)",
    unit: "per 100 people",
    domain: [0, 200],
    colorScale: (t: number) => d3.interpolateCividis(t),
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
          const config = LAYER_CONFIG[ly];
          tooltip.innerHTML = `
            <strong>${localisedName(d, stateRef.current.displayNames)}</strong>
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
      })
      .on("click", function (_event, d) {
        setSelectedISO3(getISO3(d));
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
  const legendSteps = 12;

  if (!mapData || !geoData) {
    return (
      <div className="w-full h-64 flex items-center justify-center text-foreground-muted">
        {locale === "fi" ? "Ladataan karttaa..." : "Loading map..."}
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
  const labels =
    locale === "fi"
      ? {
          tfr: "TFR (Maailmanpankin sarja)",
          mobile: "Mobiililiittymät (teknologia-ajoituksen proxy)",
          selected: "Valittu maa",
          select: "Valitse maa kartalta nähdäksesi kyseisen tason tiedot.",
          noData: "Ei tietoa valitulle vuodelle",
          tfrSource: "TFR-kartta: Maailmanpankin WDI:n julkaistu TFR-sarja. Se voi sisältää kansallisten lähteiden ja YK:n väestöarvioiden harmonisointeja; kartta ei ole WPP:n ASFR-paneeli.",
        }
      : {
          tfr: "TFR (World Bank series)",
          mobile: "Mobile subscriptions (technology-timing proxy)",
          selected: "Selected country",
          select: "Select a country to inspect data for this layer.",
          noData: "No data for selected year",
          tfrSource: "TFR map: World Bank WDI published TFR series. It may incorporate harmonised national sources and UN demographic estimates; it is not the WPP ASFR panel.",
        };

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
          className="absolute pointer-events-none bg-background/95 border border-card-border
                     rounded-lg px-3 py-2 text-sm shadow-lg"
          style={{ display: "none" }}
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
          {locale === "fi"
            ? "Mobiililiittymätiheys on yhdistelmäproksi sähkömagneettiselle ympäristölle, ei mitattu RF-altistus, FieldState-vektori tai annosmitta."
            : "Mobile subscription density is a composite proxy for the electromagnetic environment, not measured RF exposure, a FieldState vector, or a dose metric."}
        </p>
      )}
      {layer === "tfr" && (
        <p className="text-xs leading-relaxed text-foreground-muted">{labels.tfrSource}</p>
      )}
    </div>
  );
}
