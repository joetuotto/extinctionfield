import type { LucideIcon } from "lucide-react";

interface PageHeaderProps {
  icon: LucideIcon;
  title: string;
  subtitle: string;
  motif?: React.ReactNode;
  lensIcon?: React.ReactNode;
}

export function PageHeader({ icon: Icon, title, subtitle, motif, lensIcon }: PageHeaderProps) {
  return (
    <header className="relative mb-10 border-b border-card-border pb-7">
      <div className="flex items-start gap-3">
        <div className="mt-1 flex-shrink-0 p-2 rounded-lg bg-accent/8 text-accent">
          <Icon size={22} strokeWidth={1.8} aria-hidden="true" />
        </div>
        {lensIcon && (
          <div className="mt-1 flex-shrink-0" aria-hidden="true">
            {lensIcon}
          </div>
        )}
        <div className="min-w-0 flex-1">
          <h1 className="mb-3 break-words text-[clamp(1.75rem,7vw,2.25rem)] sm:text-[2.65rem]">{title}</h1>
          <p className="editorial-deck">
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
