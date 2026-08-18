"use client";

import { useState } from "react";

interface DerivationProps {
  children: React.ReactNode;
}

export function Derivation({ children }: DerivationProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border border-card-border rounded-lg my-4">
      <button
        onClick={() => setOpen(!open)}
        className="w-full px-4 py-3 text-left flex items-center gap-2 text-sm text-foreground-muted hover:text-foreground transition-colors"
      >
        <span className="text-xs">{open ? "▼" : "▶"}</span>
        Full derivation
      </button>
      {open && (
        <div className="px-4 pb-4 border-t border-card-border bg-background-secondary/50 space-y-3 text-sm leading-relaxed">
          {children}
        </div>
      )}
    </div>
  );
}
