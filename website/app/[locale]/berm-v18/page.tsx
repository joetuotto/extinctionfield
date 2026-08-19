import type { Metadata } from "next";
import { LegacyV18Page } from "@/components/LegacyV18Archive";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const fi = locale === "fi";
  return {
    title: fi ? "BERM v18.0 – aiempi malliesitys" : "BERM v18.0 – historical model presentation",
    description: fi
      ? "Selattava BERM v18.0 -malliversio nykyisen FieldState–ASFR-v2-esityksen rinnalla."
      : "Browsable BERM v18.0 model version alongside the current FieldState–ASFR-v2 presentation.",
  };
}

export default async function LegacyV18Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return <LegacyV18Page locale={locale} section="home" />;
}
