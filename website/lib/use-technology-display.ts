"use client";

import { useSyncExternalStore } from "react";
import { fieldReconstruction } from "./field-reconstruction";

// replaceState deliberately does not emit popstate. Notify only this display
// store, without pretending a browser navigation occurred in the Next router.
const DISPLAY_CHANGED = "berm:technology-display-changed";
const subscribe = (notify: () => void) => {
  window.addEventListener("popstate", notify);
  window.addEventListener(DISPLAY_CHANGED, notify);
  return () => {
    window.removeEventListener("popstate", notify);
    window.removeEventListener(DISPLAY_CHANGED, notify);
  };
};
const clientSnapshot = () => window.location.search;
const serverSnapshot = () => "";
const validFamily = (family: string | null): family is string => family !== null && (
  ["all", "cellular-total", "unassigned"].includes(family)
  || fieldReconstruction.families.some(row => row.id === family)
);

/** Display selection only: never changes source amplitudes or model inputs.
 * The server and initial hydration render share a default; the URL is restored
 * immediately afterwards. All mounted subscribers read the same URL snapshot. */
export function useTechnologyDisplay() {
  const query = useSyncExternalStore(subscribe, clientSnapshot, serverSnapshot);
  const params = new URLSearchParams(query), requested = params.get("t_family");
  return {
    // A missing/invalid URL has one shared default, independent of which panel
    // has numerical observations in the current country or cropped interval.
    family: validFamily(requested) ? requested : "electric-grid",
    interpolate: params.get("t_interpolate") === "1",
    update: updateTechnologyDisplay,
  };
}

export function updateTechnologyDisplay(patch: { family?: string; interpolate?: boolean }) {
  if (patch.family !== undefined && !validFamily(patch.family)) throw new RangeError("Unknown technology display family");
  const url = new URL(window.location.href);
  if (patch.family !== undefined) url.searchParams.set("t_family", patch.family);
  if (patch.interpolate !== undefined) url.searchParams.set("t_interpolate", patch.interpolate ? "1" : "0");
  window.history.replaceState(window.history.state, "", `${url.pathname}${url.search}${url.hash}`);
  window.dispatchEvent(new Event(DISPLAY_CHANGED));
}
