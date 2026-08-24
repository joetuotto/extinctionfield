import fs from "node:fs";
import path from "node:path";
import { Navigation } from "./navigation";
import { SetLang } from "./set-lang";
import { SiteFooter } from "@/components/SiteFooter";
import { isValidLocale } from "@/lib/i18n";
import { notFound } from "next/navigation";

// Read at build time so the footer count tracks the reference database.
function referenceCount(): number {
  const file = path.join(process.cwd(), "public", "data", "references_full.json");
  const data = JSON.parse(fs.readFileSync(file, "utf8")) as { references: unknown[] };
  return data.references.length;
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();

  return (
    <>
      <SetLang locale={locale} />
      <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:bg-background focus:text-foreground focus:px-4 focus:py-2 focus:rounded-md focus:border focus:border-border focus:shadow-lg">
        {locale === "fi" ? "Siirry sisältöön" : "Skip to content"}
      </a>
      <Navigation locale={locale} />
      <main id="main-content" className="flex-1">{children}</main>
      <SiteFooter locale={locale} referenceCount={referenceCount()} />
    </>
  );
}
