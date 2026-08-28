"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const COPY: Record<string, { title: string; desc: string; home: string }> = {
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
  ja: {
    title: "404",
    desc: "このページは見つかりませんでした。移動されたか、存在しなくなった可能性があります。",
    home: "ホームに戻る",
  },
  fr: {
    title: "404",
    desc: "Cette page est introuvable. Elle a peut-être été déplacée ou n'existe plus.",
    home: "Retour à l'accueil",
  },
  ko: {
    title: "404",
    desc: "이 페이지를 찾을 수 없습니다. 이동되었거나 더 이상 존재하지 않을 수 있습니다.",
    home: "홈으로 돌아가기",
  },
};

export default function NotFound() {
  const pathname = usePathname();
  const seg = pathname?.split("/")[1] || "en";
  const locale = seg in COPY ? seg : "en";
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
