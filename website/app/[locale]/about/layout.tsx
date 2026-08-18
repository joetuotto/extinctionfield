import { AboutTabs } from "@/components/AboutTabs";

export default async function AboutLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return (
    <div>
      <AboutTabs locale={locale} />
      {children}
    </div>
  );
}
