import { ModulomeTabs } from "@/components/ModulomeTabs";

export default async function ModulomeLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return (
    <div>
      <div className="max-w-5xl mx-auto px-6 pt-6">
        <ModulomeTabs locale={locale} />
      </div>
      {children}
    </div>
  );
}
