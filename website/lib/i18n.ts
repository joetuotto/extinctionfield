export const locales = ["en", "fi", "ja", "fr", "ko"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

export function isValidLocale(locale: string): locale is Locale {
  return locales.includes(locale as Locale);
}

export const LOCALE_NAMES: Record<Locale, string> = {
  en: "English",
  fi: "Suomi",
  ja: "日本語",
  fr: "Français",
  ko: "한국어",
};

export function pickCopy<T>(copy: Record<string, T>, locale: string): T {
  return copy[locale] ?? copy["en"];
}

/** Pick a locale-specific field using underscore convention (title_en, title_fi, title_ja, …). Falls back to _en. */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function pickField(obj: any, base: string, locale: string): string {
  return (obj[`${base}_${locale}`] as string) ?? (obj[`${base}_en`] as string) ?? "";
}

/** Pick a locale-specific field using camelCase suffix (nameEn, nameFi, nameJa, …). Falls back to *En. */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function pickSuffix(obj: any, base: string, locale: string): string {
  const suffix = locale.charAt(0).toUpperCase() + locale.slice(1);
  return (obj[`${base}${suffix}`] as string) ?? (obj[`${base}En`] as string) ?? "";
}

export const LOCALE_FLAGS: Record<Locale, string> = {
  en: "EN",
  fi: "FI",
  ja: "JA",
  fr: "FR",
  ko: "KO",
};
