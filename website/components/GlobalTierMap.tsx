"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { geoNaturalEarth1, geoPath } from "d3-geo";
import type { Feature, FeatureCollection, Geometry } from "geojson";
import {
  GLOBAL_TIER_ORDER,
  membershipsFromPanel,
  parseGlobalPanelCsv,
  tierForCountry,
  type GlobalTier,
  type GlobalTierMemberships,
} from "@/lib/globalArtifacts";

type Locale = "en" | "fi";

interface GeoProperties {
  ISO_A3?: string;
  ISO_A3_EH?: string;
  NAME?: string;
  ADMIN?: string;
  [key: string]: unknown;
}

const TIER_COLORS: Record<GlobalTier, string> = {
  core: "#3B82F6",
  extended: "#8B5CF6",
  global: "#14B8A6",
};

const copy = {
  en: {
    title: "Coverage tiers, not predictions",
    description:
      "Colors show each country’s highest applicable membership in the pre-specified data tiers. They do not encode a fertility forecast, effect size, or model score.",
    loading: "Loading tier map…",
    error: "The published tier artifact is not available yet.",
    core: "Core 51",
    extended: "Extended",
    global: "Global",
    unassigned: "No published tier",
    select: "Select a country to inspect its published tier membership.",
    selected: "Selected country",
    overlap: "Memberships can overlap; the map color shows the highest applicable tier.",
    aria: "World map showing published global data tier memberships",
  },
  fi: {
    title: "Kattavuustasot, eivät ennusteet",
    description:
      "Värit näyttävät kunkin maan korkeimman soveltuvan jäsenyyden ennalta määritellyssä datajaossa. Ne eivät kuvaa hedelmällisyysennustetta, vaikutuskokoa tai mallipistettä.",
    loading: "Ladataan tasokarttaa…",
    error: "Julkaistua tasoartefaktia ei ole vielä saatavilla.",
    core: "Core 51",
    extended: "Laajennettu",
    global: "Globaali",
    unassigned: "Ei julkaistua tasoa",
    select: "Valitse maa nähdäksesi sen julkaistun tasojäsenyyden.",
    selected: "Valittu maa",
    overlap: "Jäsenyydet voivat olla päällekkäisiä; kartan väri näyttää korkeimman soveltuvan tason.",
    aria: "Maailmankartta, joka näyttää julkaistut globaalin aineiston tasojäsenyydet",
  },
} as const;

function getIso3(feature: Feature<Geometry, GeoProperties>): string {
  const properties = feature.properties;
  const primary = typeof properties?.ISO_A3 === "string" ? properties.ISO_A3 : "";
  if (primary && primary !== "-99") return primary;
  return typeof properties?.ISO_A3_EH === "string" ? properties.ISO_A3_EH : "";
}

function featureName(feature: Feature<Geometry, GeoProperties>): string {
  const properties = feature.properties;
  if (typeof properties?.ADMIN === "string") return properties.ADMIN;
  if (typeof properties?.NAME === "string") return properties.NAME;
  return getIso3(feature);
}

function tierLabel(tier: GlobalTier | undefined, locale: Locale) {
  if (!tier) return copy[locale].unassigned;
  return copy[locale][tier];
}

function membershipLabel(iso3: string, memberships: GlobalTierMemberships, locale: Locale) {
  const values = memberships.membershipsByIso[iso3] ?? [];
  return values.length > 0 ? values.map((tier) => tierLabel(tier, locale)).join(" · ") : copy[locale].unassigned;
}

export function GlobalTierMap({ locale }: { locale: string }) {
  const language: Locale = locale === "fi" ? "fi" : "en";
  const d = copy[language];
  const containerRef = useRef<HTMLDivElement>(null);
  const [geoData, setGeoData] = useState<FeatureCollection<Geometry, GeoProperties> | null>(null);
  const [tiers, setTiers] = useState<GlobalTierMemberships | null>(null);
  const [width, setWidth] = useState(760);
  const [selectedIso3, setSelectedIso3] = useState<string | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    Promise.all([
      fetch("/data/global_panel.csv", { signal: controller.signal }),
      fetch("/data/geojson/ne_110m_countries.json", { signal: controller.signal }),
    ])
      .then(async ([panelResponse, geoResponse]) => {
        if (!panelResponse.ok || !geoResponse.ok) throw new Error("Global tier artefact request failed");
        const [panelCsv, geographyPayload] = await Promise.all([
          panelResponse.text(),
          geoResponse.json(),
        ]);
        const panel = parseGlobalPanelCsv(panelCsv);
        if (!panel || panel.countries.length === 0) {
          throw new Error("Global tier artefact schema is invalid");
        }
        setTiers(membershipsFromPanel(panel));
        setGeoData(geographyPayload as FeatureCollection<Geometry, GeoProperties>);
      })
      .catch((error: unknown) => {
        if (error instanceof Error && error.name === "AbortError") return;
        setFailed(true);
      });
    return () => controller.abort();
  }, []);

  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;
    const updateWidth = () => setWidth(Math.max(320, Math.round(element.clientWidth || 760)));
    updateWidth();
    const observer = new ResizeObserver(updateWidth);
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  const map = useMemo(() => {
    if (!geoData) return null;
    const height = Math.round(width * 0.52);
    const projection = geoNaturalEarth1().fitSize([width - 16, height - 16], geoData);
    return { height, path: geoPath(projection) };
  }, [geoData, width]);

  const selectedFeature = geoData?.features.find((feature) => getIso3(feature) === selectedIso3);

  return (
    <section className="rounded-xl border border-card-border bg-card-bg p-4 sm:p-6">
      <div className="mb-4 max-w-3xl">
        <h3 className="text-base font-semibold">{d.title}</h3>
        <p className="mt-1 text-sm leading-relaxed text-foreground-muted">{d.description}</p>
      </div>

      {failed ? (
        <p className="rounded-lg border border-status-partial/30 bg-status-partial/5 p-3 text-sm text-foreground-muted">
          {d.error}
        </p>
      ) : !geoData || !tiers || !map ? (
        <p className="py-14 text-center text-sm text-foreground-muted">{d.loading}</p>
      ) : (
        <>
          <div ref={containerRef} className="overflow-hidden rounded-lg border border-card-border bg-background-secondary">
            <svg
              role="img"
              aria-label={d.aria}
              className="h-auto w-full"
              viewBox={`0 0 ${width} ${map.height}`}
            >
              <title>{d.aria}</title>
              <desc>{d.description}</desc>
              {geoData.features.map((feature) => {
                const iso3 = getIso3(feature);
                const tier = iso3 ? tierForCountry(iso3, tiers) : undefined;
                const isSelected = iso3 === selectedIso3;
                return (
                  <path
                    key={`${iso3}-${featureName(feature)}`}
                    d={map.path(feature) ?? ""}
                    fill={tier ? TIER_COLORS[tier] : "var(--card-border)"}
                    fillOpacity={tier ? 0.86 : 0.48}
                    stroke={isSelected ? "var(--foreground)" : "var(--background)"}
                    strokeWidth={isSelected ? 1.4 : 0.45}
                    className={iso3 ? "cursor-pointer transition-opacity hover:opacity-70" : undefined}
                    onClick={() => iso3 && setSelectedIso3(iso3)}
                  >
                    <title>{`${featureName(feature)} · ${membershipLabel(iso3, tiers, language)}`}</title>
                  </path>
                );
              })}
            </svg>
          </div>

          <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-xs text-foreground-muted">
            {GLOBAL_TIER_ORDER.map((tier) => (
              <span key={tier} className="inline-flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-sm" style={{ backgroundColor: TIER_COLORS[tier] }} aria-hidden="true" />
                {tierLabel(tier, language)} ({tiers.countriesByTier[tier].length})
              </span>
            ))}
            <span className="inline-flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-sm bg-card-border" aria-hidden="true" />
              {d.unassigned}
            </span>
          </div>
          <p className="mt-2 text-xs text-foreground-muted">{d.overlap}</p>

          <div className="mt-4 border-t border-card-border pt-3 text-sm">
            <p className="text-xs uppercase tracking-wider text-foreground-muted">{d.selected}</p>
            {selectedFeature && selectedIso3 ? (
              <p className="mt-1">
                <span className="font-medium">{featureName(selectedFeature)}</span>
                <span className="text-foreground-muted"> · {membershipLabel(selectedIso3, tiers, language)}</span>
              </p>
            ) : (
              <p className="mt-1 text-foreground-muted">{d.select}</p>
            )}
          </div>
        </>
      )}
    </section>
  );
}
