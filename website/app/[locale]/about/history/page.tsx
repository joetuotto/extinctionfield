import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "History — Extinction Field",
};

export default async function HistoryPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const d =
    locale === "fi"
      ? {
          title: "Historiallinen konteksti",
          subtitle:
            "Biosähkömagneettisen tutkimuksen historiallinen tausta: Becker, Frey ja US Navy.",
          wip: "Tämä sivu on rakenteilla.",
        }
      : {
          title: "Historical context",
          subtitle:
            "The historical background of bioelectromagnetic research: Becker, Frey, and the US Navy.",
          wip: "This page is under construction.",
        };

  return (
    <main className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-2xl font-bold mb-2">{d.title}</h1>
      <p className="text-foreground-muted mb-8">{d.subtitle}</p>
      <div className="border border-card-border rounded-lg p-8 text-center text-foreground-muted">
        {d.wip}
      </div>
    </main>
  );
}
