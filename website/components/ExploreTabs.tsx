"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useCallback, Suspense } from "react";
import { ExplorerDashboard } from "./ExplorerDashboard";
import { DataSourcesContent } from "./DataSourcesContent";
import { WorldMap } from "./WorldMap";
import { SentinelExplorer } from "./SentinelExplorer";

type Tab = "map" | "country" | "data" | "sentinel";

const TABS = {
  en: [
    { key: "map" as Tab, label: "Map" },
    { key: "country" as Tab, label: "Country" },
    { key: "sentinel" as Tab, label: "Sentinel" },
    { key: "data" as Tab, label: "Data" },
  ],
  fi: [
    { key: "map" as Tab, label: "Kartta" },
    { key: "country" as Tab, label: "Maa" },
    { key: "sentinel" as Tab, label: "Indikaattorit" },
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

      {activeTab === "map" && <WorldMap locale={locale} />}

      {activeTab === "country" && <ExplorerDashboard />}

      {activeTab === "sentinel" && <SentinelExplorer locale={locale} />}

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
