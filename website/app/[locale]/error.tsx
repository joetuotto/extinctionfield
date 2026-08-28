"use client";

import { useParams } from "next/navigation";
import { pickCopy } from "@/lib/i18n";

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
  ja: {
    title: "エラーが発生しました",
    desc: "予期しないエラーが発生しました。再試行するか、ホームページに戻ることができます。",
    retry: "再試行",
    home: "ホーム",
  },
  fr: {
    title: "Une erreur est survenue",
    desc: "Une erreur inattendue s'est produite. Vous pouvez réessayer ou revenir à la page d'accueil.",
    retry: "Réessayer",
    home: "Accueil",
  },
  ko: {
    title: "문제가 발생했습니다",
    desc: "예기치 않은 오류가 발생했습니다. 다시 시도하거나 홈페이지로 돌아갈 수 있습니다.",
    retry: "다시 시도",
    home: "홈",
  },
} as const;

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const params = useParams();
  const locale = typeof params?.locale === "string" ? params.locale : "en";
  const d = pickCopy(COPY, locale);

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
