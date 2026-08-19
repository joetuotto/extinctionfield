import type { Metadata } from "next";
import {
  LegacyV18Page,
  legacyV18SectionFromSlug,
} from "@/components/LegacyV18Archive";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string[] }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const section = legacyV18SectionFromSlug(slug);
  const fi = locale === "fi";
  const label = section === "home" ? "BERM v18.0" : `BERM v18.0 · ${section}`;
  return {
    title: `${label} – Extinction Field`,
    description: fi
      ? "BERM v18.0:n versioitu historiallinen sivunäkymä."
      : "Versioned historical page view from BERM v18.0.",
  };
}

export default async function LegacyV18SectionPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string[] }>;
}) {
  const { locale, slug } = await params;
  return <LegacyV18Page locale={locale} section={legacyV18SectionFromSlug(slug)} />;
}
