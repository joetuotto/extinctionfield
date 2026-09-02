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

/** True for values that carry no translatable content: undefined, null, "" or []. */
export function isBlankCopy(value: unknown): boolean {
  return (
    value === undefined ||
    value === null ||
    value === "" ||
    (Array.isArray(value) && value.length === 0)
  );
}

/**
 * Pick the locale's COPY block with per-key fallback to English.
 * Keys that are missing or blank ("" / []) in the locale resolve to the
 * English value, so a partially translated page renders English text
 * instead of empty headings and paragraphs. Use `copyCoverage` to detect
 * how much of a locale is actually translated.
 */
export function pickCopy<T>(copy: Record<string, T>, locale: string): T {
  const base = copy["en"];
  const chosen = copy[locale];
  if (chosen === undefined || chosen === base) return base;
  if (!isPlainCopyObject(chosen) || !isPlainCopyObject(base)) {
    return chosen ?? base;
  }
  return mergeCopyValue(base, chosen) as T;
}

function isPlainCopyObject(value: unknown): value is Record<string, unknown> {
  return (
    typeof value === "object" &&
    value !== null &&
    !Array.isArray(value) &&
    !("$$typeof" in value) // never spread React elements
  );
}

/**
 * Merge a locale value over its English counterpart: blank values fall back,
 * plain objects merge per key, and arrays of equal length merge per element
 * (so a card list with untranslated fields still shows English in those fields).
 */
function mergeCopyValue(base: unknown, value: unknown): unknown {
  if (isBlankCopy(value)) return base;
  if (Array.isArray(value) && Array.isArray(base) && value.length === base.length) {
    return value.map((item, i) => mergeCopyValue(base[i], item));
  }
  if (isPlainCopyObject(value) && isPlainCopyObject(base)) {
    const out: Record<string, unknown> = { ...base };
    for (const [key, item] of Object.entries(value)) {
      out[key] = mergeCopyValue(base[key], item);
    }
    return out;
  }
  return value;
}

/** Share of English keys that carry a non-blank value in `locale` (1 = fully translated). */
export function copyCoverage(copy: Record<string, unknown>, locale: string): number {
  const base = copy["en"];
  if (locale === "en" || typeof base !== "object" || base === null) return 1;
  const keys = Object.keys(base as Record<string, unknown>);
  if (keys.length === 0) return 1;
  const chosen = copy[locale];
  if (typeof chosen !== "object" || chosen === null) return 0;
  const translated = keys.filter(
    (key) => !isBlankCopy((chosen as Record<string, unknown>)[key])
  ).length;
  return translated / keys.length;
}

/** Notice shown on pages whose locale block is only partially translated. */
export const TRANSLATION_PENDING: Record<Locale, string> = {
  en: "Parts of this page are shown in English while the translation is in progress.",
  fi: "Osa tästä sivusta näytetään englanniksi, kunnes käännös valmistuu.",
  ja: "翻訳が完成するまで、このページの一部は英語で表示されます。",
  fr: "Certaines parties de cette page sont affichées en anglais en attendant la traduction.",
  ko: "번역이 완료될 때까지 이 페이지의 일부는 영어로 표시됩니다.",
};

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
