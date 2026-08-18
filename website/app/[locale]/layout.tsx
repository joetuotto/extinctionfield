import { Navigation } from "./navigation";
import { SetLang } from "./set-lang";
import { isValidLocale } from "@/lib/i18n";
import { notFound } from "next/navigation";

const footerText = {
  en: {
    disclaimer:
      "BERM is a falsifiable model. It makes specific, locked predictions that will either come true or not. The model contains explicit refutation conditions.",
    bullets: [
      "86% of placebo series fit the current data better than the model (K8)",
      "The backcast claim has been refuted in replication (K10)",
      "Cross-section R² = 0.9999 is calibration, not validation",
    ],
    license: "Code: MIT License. Documentation: CC BY-4.0.",
  },
  fi: {
    disclaimer:
      "BERM on falsifioitava malli. Se tuottaa spesifejä, lukittuja ennusteita, jotka joko toteutuvat tai eivät. Malli sisältää eksplisiittiset kumoamisehdot.",
    bullets: [
      "86 % plasebosarjoista sopii nykyiseen dataan paremmin kuin malli (K8)",
      "Takautuvan ennustamisen väite on kumottu replikaatiossa (K10)",
      "Poikkileikkauksen R² = 0.9999 on kalibraatio, ei validaatio",
    ],
    license: "Koodi: MIT-lisenssi. Dokumentaatio: CC BY-4.0.",
  },
} as const;

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();

  const ft = footerText[locale];

  return (
    <>
      <SetLang locale={locale} />
      <Navigation locale={locale} />
      <main className="flex-1">{children}</main>
      <footer className="border-t border-border py-8 px-6">
        <div className="max-w-5xl mx-auto">
          <p className="text-sm text-foreground-muted leading-relaxed">
            {ft.disclaimer}
          </p>
          <ul className="mt-4 space-y-1 text-xs text-foreground-muted leading-relaxed list-disc list-inside">
            {ft.bullets.map((b, i) => (
              <li key={i}>{b}</li>
            ))}
          </ul>
          <p className="text-xs text-foreground-muted mt-4">{ft.license}</p>
        </div>
      </footer>
    </>
  );
}
