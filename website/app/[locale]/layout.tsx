import { Navigation } from "./navigation";
import { SetLang } from "./set-lang";
import { isValidLocale } from "@/lib/i18n";
import { notFound } from "next/navigation";

const footerText = {
  en: {
    disclaimer:
      "BERM FieldState–ASFR-v2 is a measurement-aware research specification. It does not currently publish calibrated country-level TFR forecasts.",
    bullets: [
      "Mobile subscriptions are a technology-timing proxy, not measured FieldState or dose",
      "Evidence records are bounded to causal nodes; none is a TFR coefficient",
      "TFR is derived from ASFR after biological and demographic terms are kept separate",
    ],
    license: "Code: MIT License. Documentation: CC BY-4.0.",
  },
  fi: {
    disclaimer:
      "BERM FieldState–ASFR-v2 on mittaustietoinen tutkimusmäärittely. Se ei tällä hetkellä julkaise kalibroituja maakohtaisia TFR-ennusteita.",
    bullets: [
      "Mobiililiittymät ovat teknologian ajoitusproksi, eivät mitattu FieldState tai annos",
      "Evidenssitietueet on rajattu kausaalisolmuihin; mikään niistä ei ole TFR-kerroin",
      "TFR johdetaan ASFR:stä, kun biologiset ja demografiset termit pidetään erillään",
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
