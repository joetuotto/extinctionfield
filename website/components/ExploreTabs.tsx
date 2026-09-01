"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useCallback, Suspense } from "react";
import { ExplorerDashboard } from "./ExplorerDashboard";
import { DataSourcesContent } from "./DataSourcesContent";
import { WorldMap } from "./WorldMap";
import { SentinelExplorer } from "./SentinelExplorer";
import { GlobalDataExplorer } from "./GlobalDataExplorer";
import { LayersExplorer } from "./LayersExplorer";
import { ThresholdExplorer } from "./ThresholdExplorer";
import { CivilizationTimeline } from "./CivilizationTimeline";
import { NaturalEMVisualization } from "./NaturalEMVisualization";
import { getExploreTabs } from "@/lib/navigation";

type Tab = "map" | "country" | "global" | "data" | "sentinel" | "layers" | "threshold" | "civilizations" | "naturalEM";

function ExploreTabsInner({ locale }: { locale: string }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const activeTab = (searchParams.get("tab") as Tab) || "map";
  const tabs = getExploreTabs(locale);

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
      <nav className="flex gap-1 border-b border-border mb-8 overflow-x-auto" role="tablist">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.key;
          return (
            <button
              key={tab.key}
              role="tab"
              aria-selected={isActive}
              onClick={() => setTab(tab.key)}
              className={`inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium border-b-2 transition-colors whitespace-nowrap shrink-0 ${
                isActive
                  ? "border-accent text-accent"
                  : "border-transparent text-foreground-muted hover:text-foreground"
              }`}
            >
              <Icon size={14} strokeWidth={isActive ? 2.2 : 1.8} aria-hidden="true" />
              {tab.label}
            </button>
          );
        })}
      </nav>

      {activeTab === "map" && <WorldMap locale={locale} />}

      {activeTab === "country" && <ExplorerDashboard locale={locale} />}

      {activeTab === "global" && <GlobalDataExplorer locale={locale} />}

      {activeTab === "threshold" && <ThresholdExplorer locale={locale} />}

      {activeTab === "sentinel" && <SentinelExplorer locale={locale} />}

      {activeTab === "data" && <DataSourcesContent locale={locale} />}

      {activeTab === "layers" && <LayersExplorer locale={locale} />}

      {activeTab === "civilizations" && <CivilizationTimeline locale={locale} />}

      {activeTab === "naturalEM" && <NaturalEMVisualization locale={locale} />}
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
