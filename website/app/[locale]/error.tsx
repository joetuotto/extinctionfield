"use client";

import { useParams } from "next/navigation";

const COPY = {
  en: {
    title: "Something went wrong",
    desc: "An unexpected error occurred. You can try again or return to the home page.",
    retry: "Try again",
    home: "Home",
  },
  fi: {
    title: "Jokin meni pieleen",
    desc: "Tapahtui odottamaton virhe. Voit yrittää uudelleen tai palata etusivulle.",
    retry: "Yritä uudelleen",
    home: "Etusivu",
  },
} as const;

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const params = useParams();
  const locale = params?.locale === "fi" ? "fi" : "en";
  const d = COPY[locale];

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-6 text-center">
      <h2 className="text-3xl font-bold tracking-tight mb-3">{d.title}</h2>
      <p className="text-[var(--foreground-muted)] mb-8 max-w-md">{d.desc}</p>
      <div className="flex gap-4">
        <button
          onClick={() => reset()}
          className="rounded-lg bg-[var(--accent)] px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[var(--accent-hover)]"
        >
          {d.retry}
        </button>
        <a
          href={`/${locale}`}
          className="rounded-lg border border-[var(--border)] px-5 py-2.5 text-sm font-medium transition-colors hover:bg-[var(--background-secondary)]"
        >
          {d.home}
        </a>
      </div>
    </div>
  );
}
