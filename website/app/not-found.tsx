import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[var(--background)] text-[var(--foreground)] px-6">
      <h1 className="text-6xl font-bold tracking-tight mb-4">404</h1>
      <p className="text-lg text-[var(--foreground-muted)] mb-8 text-center max-w-md">
        This page could not be found. It may have been moved or no longer
        exists.
      </p>
      <Link
        href="/en"
        className="inline-flex items-center gap-2 rounded-lg bg-[var(--accent)] px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[var(--accent-hover)]"
      >
        Back to home
      </Link>
    </div>
  );
}
