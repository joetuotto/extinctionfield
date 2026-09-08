import type { Metadata } from "next";
import { pickCopy } from "@/lib/i18n";
import { MathematicsSections, mathematicsCopy as t } from "@/components/MathematicsSections";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const d = pickCopy(t, locale);
  return {
    title: d.meta.title,
    description: d.meta.description,
  };
}

function SectionNav({
  sections,
}: {
  sections: { id: string; num: string; label: string }[];
}) {
  return (
    <nav className="hidden lg:block sticky top-[calc(var(--site-header-height,4rem)+1rem)] w-48 shrink-0 self-start">
      <ul className="space-y-1.5 text-sm border-l border-card-border pl-3">
        {sections.map((s) => (
          <li key={s.id}>
            <a
              href={`#${s.id}`}
              className="block text-foreground-muted hover:text-accent transition-colors leading-snug"
            >
              <span className="text-xs text-foreground-muted/60 mr-1">
                {s.num}
              </span>
              {s.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default async function MathematicsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const d = pickCopy(t, locale);

  return (
    <div className="max-w-5xl mx-auto overflow-x-clip px-6 py-16">
      <header className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight mb-3">
          {d.pageTitle}
        </h1>
        <p className="text-foreground-muted max-w-2xl leading-relaxed">
          {d.pageSubtitle}
        </p>
      </header>
      <div className="flex gap-10">
        <SectionNav sections={d.sections} />
        <div className="flex-1 min-w-0">
          <MathematicsSections locale={locale} />
        </div>
      </div>
    </div>
  );
}
