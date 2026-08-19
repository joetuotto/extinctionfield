/**
 * Public routes for the two independently versioned BERM presentations.
 *
 * The FieldState–ASFR route remains canonical at `/{locale}`. The prior
 * scalar BERM presentation lives below `/{locale}/berm-v18`, so links to the
 * current research surface are never repointed when an archival version is
 * restored or updated.
 */
export const LEGACY_BERM_ROUTE_SEGMENT = "berm-v18";

export type ModelVersionId = "fieldstate-v2" | "berm-v18";

export function legacyModelRoutePrefix(locale: string) {
  return `/${locale}/${LEGACY_BERM_ROUTE_SEGMENT}`;
}

export function isLegacyModelPath(locale: string, pathname: string) {
  const prefix = legacyModelRoutePrefix(locale);
  return pathname === prefix || pathname.startsWith(`${prefix}/`);
}

/**
 * Returns the same page in the requested model version whenever that page is
 * part of the mirrored v18 route tree. For example, `/fi/model` maps to
 * `/fi/berm-v18/model`, while either version's home page maps to its own root.
 */
export function modelVersionHref(
  locale: string,
  pathname: string,
  version: ModelVersionId,
) {
  const localePrefix = `/${locale}`;
  const legacyPrefix = legacyModelRoutePrefix(locale);
  const pathWithinLocale = pathname.startsWith(localePrefix)
    ? pathname.slice(localePrefix.length)
    : "";
  const currentRoute = isLegacyModelPath(locale, pathname)
    ? pathname.slice(legacyPrefix.length)
    : pathWithinLocale;
  const normalizedRoute = currentRoute === "/" ? "" : currentRoute;

  return version === "berm-v18"
    ? `${legacyPrefix}${normalizedRoute}`
    : `${localePrefix}${normalizedRoute}`;
}

export function activeModelVersion(locale: string, pathname: string): ModelVersionId {
  return isLegacyModelPath(locale, pathname) ? "berm-v18" : "fieldstate-v2";
}
