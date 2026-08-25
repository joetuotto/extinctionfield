"use client";

import { useState, type ReactNode } from "react";
import { ChevronRight } from "lucide-react";

export function CollapsibleSection({
  id,
  title,
  subtitle,
  children,
  defaultOpen = false,
}: {
  id?: string;
  title: string;
  subtitle?: string;
  children: ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <section id={id} className="mb-14">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="w-full flex items-start gap-3 text-left group"
      >
        <ChevronRight
          size={18}
          className={`mt-1 text-foreground-muted transition-transform duration-200 ${open ? "rotate-90" : ""}`}
        />
        <div className="flex-1 min-w-0">
          <h2 className="text-xl font-semibold group-hover:text-accent transition-colors">
            {title}
          </h2>
          {subtitle && !open && (
            <p className="text-sm text-foreground-muted mt-1 line-clamp-2">{subtitle}</p>
          )}
        </div>
      </button>
      {open && <div className="mt-4 pl-7">{children}</div>}
    </section>
  );
}
