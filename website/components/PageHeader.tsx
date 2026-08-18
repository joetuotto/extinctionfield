import type { LucideIcon } from "lucide-react";

interface PageHeaderProps {
  icon: LucideIcon;
  title: string;
  subtitle: string;
  motif?: React.ReactNode;
}

export function PageHeader({ icon: Icon, title, subtitle, motif }: PageHeaderProps) {
  return (
    <header className="mb-10 relative">
      <div className="flex items-start gap-3">
        <div className="mt-1 flex-shrink-0 p-2 rounded-lg bg-accent/8 text-accent">
          <Icon size={22} strokeWidth={1.8} aria-hidden="true" />
        </div>
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">{title}</h1>
          <p className="text-foreground-muted max-w-2xl leading-relaxed">
            {subtitle}
          </p>
        </div>
      </div>
      {motif && (
        <div className="mt-6" aria-hidden="true">
          {motif}
        </div>
      )}
    </header>
  );
}
