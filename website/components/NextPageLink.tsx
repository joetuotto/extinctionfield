import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export function NextPageLink({
  href,
  label,
  title,
  icon: Icon,
}: {
  href: string;
  label: string;
  title: string;
  icon?: LucideIcon;
}) {
  return (
    <div className="mt-14 border-t border-card-border pt-6">
      <p className="text-xs uppercase tracking-[0.12em] text-foreground-muted mb-2">{label}</p>
      <Link
        href={href}
        className="group inline-flex items-center gap-2 text-lg font-semibold transition-colors hover:text-accent"
      >
        {Icon && <Icon size={18} aria-hidden="true" />}
        {title}
        <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" aria-hidden="true" />
      </Link>
    </div>
  );
}
