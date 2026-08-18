"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useCallback, Suspense } from "react";
import { ExplorerDashboard } from "./ExplorerDashboard";
import { DataSourcesContent } from "./DataSourcesContent";

type Tab = "map" | "country" | "data";

const TABS = {
  en: [
    { key: "map" as Tab, label: "Map" },
    { key: "country" as Tab, label: "Country" },
    { key: "data" as Tab, label: "Data" },
  ],
  fi: [
    { key: "map" as Tab, label: "Kartta" },
    { key: "country" as Tab, label: "Maa" },
    { key: "data" as Tab, label: "Data" },
  ],
} as const;

function ExploreTabsInner({ locale }: { locale: string }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const activeTab = (searchParams.get("tab") as Tab) || "country";
  const tabs = locale === "fi" ? TABS.fi : TABS.en;

  const setTab = useCallback(
    (tab: Tab) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set("tab", tab);
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [searchParams, router, pathname],
  );

  return (
    <div>
      <nav className="flex gap-1 border-b border-border mb-8">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setTab(tab.key)}
            className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
              activeTab === tab.key
                ? "border-accent text-accent"
                : "border-transparent text-foreground-muted hover:text-foreground"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </nav>

      {activeTab === "map" && (
        <div className="border border-card-border rounded-lg p-12 text-center">
          <div className="text-foreground-muted mb-2 text-4xl">
            <svg
              className="inline-block"
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z"
              />
            </svg>
          </div>
          <h3 className="text-lg font-semibold mb-2">
            {locale === "fi"
              ? "Maailmankartta tulossa"
              : "World map coming soon"}
          </h3>
          <p className="text-sm text-foreground-muted max-w-md mx-auto">
            {locale === "fi"
              ? "D3-koropleetti: TFR ja EMF-altistus maailmankartalla, aikaslider 1960-2024 ja animaatio."
              : "D3 choropleth: TFR and EMF exposure on a world map, time slider 1960-2024 with animation."}
          </p>
        </div>
      )}

      {activeTab === "country" && <ExplorerDashboard />}

      {activeTab === "data" && <DataSourcesContent locale={locale} />}
    </div>
  );
}

export function ExploreTabs({ locale }: { locale: string }) {
  return (
    <Suspense>
      <ExploreTabsInner locale={locale} />
    </Suspense>
  );
}
