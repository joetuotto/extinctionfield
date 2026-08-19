import { Navigation } from "./navigation";
import { SetLang } from "./set-lang";
import { SiteFooter } from "@/components/SiteFooter";
import { isValidLocale } from "@/lib/i18n";
import { notFound } from "next/navigation";

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
      <SiteFooter locale={locale} />
    </>
  );
}
