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
      <Navigation locale={locale} />
      <main className="flex-1">{children}</main>
      <SiteFooter locale={locale} referenceCount={referenceCount()} />
    </>
  );
}
