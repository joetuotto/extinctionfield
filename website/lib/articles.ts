import type { BermIconName } from "@/components/BermIcon";

export interface Article {
  id: string;
  slug: string;
  title: string;
  titleFi: string;
  subtitle: string;
  subtitleFi: string;
  icon: BermIconName;
  publishedDate: string;
  readingTimeMinutes: number;
  tags: string[];
  heroImage?: string;
  ogImage?: string;
  thumbImage?: string;
}

export const ARTICLES: Article[] = [
  {
    id: "bees",
    slug: "bees",
    title: "Why the Bees Can't Fight Back",
    titleFi: "Miksi mehiläiset eivät pysty puolustautumaan",
    subtitle:
      "How electromagnetic fields tilt the balance between honeybees and their deadliest parasite",
    subtitleFi:
      "Miten sähkömagneettiset kentät kallistavat tasapainoa mehiläisten ja niiden tappavimman loisen välillä",
    icon: "honeybee",
    publishedDate: "2026-08-21",
    readingTimeMinutes: 12,
    tags: ["ecology", "varroa", "sentinel", "faraday"],
    heroImage: "/images/articles/bee-hero.webp",
    ogImage: "/images/articles/bee-og.webp",
    thumbImage: "/images/articles/bee-thumb.webp",
  },
  {
    id: "spectrum",
    slug: "spectrum",
    title: "The Spectrum of Proof",
    titleFi: "Todisteiden kirjo",
    subtitle:
      "Every frequency has been proven biologically active — except the one worth $1.9 trillion a year",
    subtitleFi:
      "Jokainen taajuus on todistettu biologisesti aktiiviseksi — paitsi se, joka on 1,9 biljoonan dollarin arvoinen vuodessa",
    icon: "rf-safety",
    publishedDate: "2026-08-22",
    readingTimeMinutes: 14,
    tags: ["therapeutic", "FDA", "paradox"],
    heroImage: "/images/articles/spectrum-editorial-hero.webp",
    ogImage: "/images/articles/spectrum-editorial-og.webp",
    thumbImage: "/images/articles/spectrum-editorial-thumb.webp",
  },
  {
    id: "implausibility",
    slug: "implausibility",
    title: "The Implausibility Argument",
    titleFi: "Epäuskottavuusargumentti",
    subtitle:
      "How missing physics led to 50 years of dismissal — and what changed",
    subtitleFi:
      "Miten puuttuva fysiikka johti 50 vuoden hylkäämiseen — ja mikä muuttui",
    icon: "physics",
    publishedDate: "2026-08-22",
    readingTimeMinutes: 16,
    tags: ["mechanism", "history", "lindgren", "VGCC"],
    heroImage: "/images/articles/implausibility-editorial-hero.webp",
    ogImage: "/images/articles/implausibility-editorial-og.webp",
    thumbImage: "/images/articles/implausibility-editorial-thumb.webp",
  },
  {
    id: "thirteen-phenomena",
    slug: "thirteen-phenomena",
    title: "Thirteen Phenomena Conventional Models Cannot Adequately Explain",
    titleFi: "13 ilmiötä joita nykyiset selitysmallit eivät selitä tyydyttävästi",
    subtitle:
      "A literature review of simultaneous trends that require separate explanations — unless they share a single biological cause",
    subtitleFi:
      "Kirjallisuuskatsaus samanaikaisista trendeistä jotka vaativat erilliset selitykset — ellei niillä ole yhteistä biologista syytä",
    icon: "history",
    publishedDate: "2026-08-31",
    readingTimeMinutes: 25,
    tags: ["civilization", "literature-review", "parsimony", "cascade"],
  },
  {
    id: "dual-lock",
    slug: "dual-lock",
    title: "The Dual Lock",
    titleFi: "Kaksoislukkoteoria",
    subtitle:
      "Why testosterone decline and cortisol rise produce behavioral suppression greater than either alone",
    subtitleFi:
      "Miksi testosteronin lasku ja kortisolin nousu tuottavat voimakkaamman käyttäytymisen vaimentumisen kuin kumpikin yksinään",
    icon: "human",
    heroImage: "/images/articles/dual-lock-editorial-hero.webp",
    ogImage: "/images/articles/dual-lock-editorial-og.webp",
    thumbImage: "/images/articles/dual-lock-editorial-thumb.webp",
    publishedDate: "2026-08-25",
    readingTimeMinutes: 11,
    tags: ["testosterone", "cortisol", "societal", "dual-hormone"],
  },
];

export function getArticleBySlug(slug: string): Article | undefined {
  return ARTICLES.find((a) => a.slug === slug);
}

export function getLatestArticles(count = 3): Article[] {
  return [...ARTICLES]
    .sort(
      (a, b) =>
        new Date(b.publishedDate).getTime() -
        new Date(a.publishedDate).getTime(),
    )
    .slice(0, count);
}
