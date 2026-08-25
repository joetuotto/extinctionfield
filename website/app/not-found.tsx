"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const COPY = {
  en: {
    title: "404",
    desc: "This page could not be found. It may have been moved or no longer exists.",
    home: "Back to home",
  },
  fi: {
    title: "404",
    desc: "Sivua ei löytynyt. Se on saatettu siirtää tai sitä ei enää ole.",
    home: "Takaisin etusivulle",
  },
} as const;

export default function NotFound() {
  const pathname = usePathname();
  const locale = pathname?.startsWith("/fi") ? "fi" : "en";
  const d = COPY[locale];

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[var(--background)] text-[var(--foreground)] px-6">
      <h1 className="text-6xl font-bold tracking-tight mb-4">{d.title}</h1>
      <p className="text-lg text-[var(--foreground-muted)] mb-8 text-center max-w-md">
        {d.desc}
      </p>
      <Link
        href={`/${locale}`}
        className="inline-flex items-center gap-2 rounded-lg bg-[var(--accent)] px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[var(--accent-hover)]"
      >
        {d.home}
      </Link>
    </div>
  );
}
