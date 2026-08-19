"use client";

import { SentinelReadiness } from "./SentinelReadiness";

/**
 * The explorer intentionally exposes the same readiness state as the
 * evidence page. No lag estimate, country ranking, or prospective claim is
 * shown until the F1–F6 prerequisites are met in the canonical artifact.
 */
export function SentinelExplorer({ locale }: { locale: string }) {
  return <SentinelReadiness locale={locale} />;
}
