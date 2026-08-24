export interface Article {
  id: string;
  slug: string;
  title: string;
  titleFi: string;
  subtitle: string;
  subtitleFi: string;
  icon: string;
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
    icon: "🐝",
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
    titleFi: "Todistuksen spektri",
    subtitle:
      "Every frequency has been proven biologically active — except the one worth $1.9 trillion a year",
    subtitleFi:
      "Jokainen taajuus on todistettu biologisesti aktiiviseksi — paitsi se joka on 1,9 biljoonan dollarin arvoinen vuodessa",
    icon: "⚡",
    publishedDate: "2026-08-22",
    readingTimeMinutes: 14,
    tags: ["therapeutic", "FDA", "paradox"],
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
    icon: "🔬",
    publishedDate: "2026-08-22",
    readingTimeMinutes: 16,
    tags: ["mechanism", "history", "lindgren", "VGCC"],
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
