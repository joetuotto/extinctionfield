import { describe, it, expect } from "vitest";
import {
  pickCopy,
  copyCoverage,
  isBlankCopy,
  TRANSLATION_PENDING,
  locales,
} from "../i18n";

const COPY: Record<string, Record<string, unknown>> = {
  en: { title: "Title", body: "Body", items: ["a", "b"], onlyEn: "Only in English" },
  fi: { title: "Otsikko", body: "", items: [], onlyFi: "Vain suomeksi" },
  ja: { title: "", body: "本文", items: [] },
};

describe("isBlankCopy", () => {
  it("treats undefined, null, empty string and empty array as blank", () => {
    expect(isBlankCopy(undefined)).toBe(true);
    expect(isBlankCopy(null)).toBe(true);
    expect(isBlankCopy("")).toBe(true);
    expect(isBlankCopy([])).toBe(true);
  });
  it("treats content as non-blank", () => {
    expect(isBlankCopy("x")).toBe(false);
    expect(isBlankCopy(["x"])).toBe(false);
    expect(isBlankCopy(0)).toBe(false);
    expect(isBlankCopy({})).toBe(false);
  });
});

describe("pickCopy per-key fallback", () => {
  it("returns the English block unchanged", () => {
    expect(pickCopy(COPY, "en")).toBe(COPY.en);
  });

  it("keeps translated keys and fills blank keys from English", () => {
    const d = pickCopy(COPY, "fi");
    expect(d.title).toBe("Otsikko");
    expect(d.body).toBe("Body");
    expect(d.items).toEqual(["a", "b"]);
    expect(d.onlyFi).toBe("Vain suomeksi");
  });

  it("fills keys that are missing from the locale entirely", () => {
    const d = pickCopy(COPY, "ja");
    expect(d.onlyEn).toBe("Only in English");
    expect(d.title).toBe("Title");
    expect(d.body).toBe("本文");
  });

  it("never yields a blank value where English has content", () => {
    for (const locale of ["fi", "ja", "fr", "ko"]) {
      const d = pickCopy(COPY, locale);
      for (const key of Object.keys(COPY.en)) {
        expect(isBlankCopy(d[key]), `${locale}.${key}`).toBe(false);
      }
    }
  });

  it("falls back to the whole English block for an unknown locale", () => {
    expect(pickCopy(COPY, "de")).toBe(COPY.en);
  });

  it("merges arrays of equal length element-wise and nested objects per key", () => {
    const NESTED: Record<string, Record<string, unknown>> = {
      en: {
        cards: [
          { title: "Alpha", desc: "Alpha desc", examples: ["a1", "a2"] },
          { title: "Beta", desc: "Beta desc", examples: ["b1"] },
        ],
        block: { heading: "Heading", note: "Note" },
        shorter: ["x", "y"],
      },
      ja: {
        cards: [
          { title: "アルファ", desc: "", examples: [] },
          { title: "", desc: "ベータ説明", examples: ["ビー1"] },
        ],
        block: { heading: "見出し", note: "" },
        shorter: ["ゼット"],
      },
    };
    const d = pickCopy(NESTED, "ja") as {
      cards: { title: string; desc: string; examples: string[] }[];
      block: { heading: string; note: string };
      shorter: string[];
    };
    expect(d.cards[0]).toEqual({ title: "アルファ", desc: "Alpha desc", examples: ["a1", "a2"] });
    expect(d.cards[1]).toEqual({ title: "Beta", desc: "ベータ説明", examples: ["ビー1"] });
    expect(d.block).toEqual({ heading: "見出し", note: "Note" });
    // arrays of different length are taken from the locale as-is
    expect(d.shorter).toEqual(["ゼット"]);
  });

  it("does not try to merge non-object copy values", () => {
    const LIST = { en: ["x"], fi: ["y"] };
    expect(pickCopy(LIST, "fi")).toEqual(["y"]);
    expect(pickCopy(LIST, "ja")).toEqual(["x"]);
  });

  it("does not mutate the source blocks", () => {
    const before = JSON.stringify(COPY);
    pickCopy(COPY, "fi");
    pickCopy(COPY, "ja");
    expect(JSON.stringify(COPY)).toBe(before);
  });
});

describe("copyCoverage", () => {
  it("is 1 for English", () => {
    expect(copyCoverage(COPY, "en")).toBe(1);
  });
  it("counts non-blank English keys present in the locale", () => {
    expect(copyCoverage(COPY, "fi")).toBeCloseTo(1 / 4); // title only
    expect(copyCoverage(COPY, "ja")).toBeCloseTo(1 / 4); // body only
  });
  it("is 0 for a missing locale", () => {
    expect(copyCoverage(COPY, "ko")).toBe(0);
  });
});

describe("TRANSLATION_PENDING", () => {
  it("has a non-empty notice for every locale", () => {
    for (const locale of locales) {
      expect(TRANSLATION_PENDING[locale].length).toBeGreaterThan(10);
    }
  });
});
