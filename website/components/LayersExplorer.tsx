"use client";

import { TechnologyHistoryExplorer } from "@/components/TechnologyHistoryExplorer";

/** Keep the existing model/explore entry point on the shared source registry. */
export function LayersExplorer({ locale }: { locale: string }) {
  return <TechnologyHistoryExplorer locale={locale} compact />;
}
