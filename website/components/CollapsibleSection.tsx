"use client";

import { useEffect, useId, useRef, useState, type ReactNode } from "react";
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
  const contentId = useId();
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    let frame: number | undefined;
    function revealHashTarget() {
      let hash: string;
      try { hash = decodeURIComponent(window.location.hash.slice(1)); } catch { return; }
      if (!hash) return;
      const target = document.getElementById(hash);
      if (target && sectionRef.current?.contains(target)) {
        setOpen(true);
        frame = window.requestAnimationFrame(() => target.scrollIntoView?.({ block: "start", behavior: "instant" }));
      }
    }
    revealHashTarget();
    window.addEventListener("hashchange", revealHashTarget);
    return () => { window.removeEventListener("hashchange", revealHashTarget); if (frame !== undefined) window.cancelAnimationFrame(frame); };
  }, []);

  return (
    <section ref={sectionRef} id={id} className="mb-14" data-search-collapsible="">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls={contentId}
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
      <div id={contentId} hidden={!open} className="mt-4 pl-7" data-search-collapsible-content="">{children}</div>
    </section>
  );
}
