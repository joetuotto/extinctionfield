"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-6 text-center">
      <h2 className="text-3xl font-bold tracking-tight mb-3">
        Something went wrong
      </h2>
      <p className="text-[var(--foreground-muted)] mb-8 max-w-md">
        An unexpected error occurred. You can try again or return to the home
        page.
      </p>
      <div className="flex gap-4">
        <button
          onClick={() => reset()}
          className="rounded-lg bg-[var(--accent)] px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[var(--accent-hover)]"
        >
          Try again
        </button>
        <a
          href="/en"
          className="rounded-lg border border-[var(--border)] px-5 py-2.5 text-sm font-medium transition-colors hover:bg-[var(--background-secondary)]"
        >
          Home
        </a>
      </div>
    </div>
  );
}
