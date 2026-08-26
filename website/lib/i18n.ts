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

export function pickCopy<T>(copy: { en: T } & Record<string, T>, locale: string): T {
  return copy[locale] ?? copy.en;
}

export const LOCALE_FLAGS: Record<Locale, string> = {
  en: "EN",
  fi: "FI",
  ja: "JA",
  fr: "FR",
  ko: "KO",
};
