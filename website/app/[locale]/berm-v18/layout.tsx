import { LegacyV18Chrome } from "@/components/LegacyV18Archive";

export default async function LegacyV18Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return <LegacyV18Chrome locale={locale}>{children}</LegacyV18Chrome>;
}
