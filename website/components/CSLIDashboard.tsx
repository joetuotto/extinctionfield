"use client";

import { SentinelReadiness } from "./SentinelReadiness";

/**
 * Kept as a compatibility boundary for existing page imports. CSLI's former
 * numeric lag and leave-one-country-out display was withdrawn: its inputs do
 * not meet the public readiness criteria. The component now renders only the
 * generated readiness manifest.
 */
export default function CSLIDashboard({ locale }: { locale: string }) {
  return <SentinelReadiness locale={locale} />;
}
