"use client";

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body style={{ margin: 0, fontFamily: "system-ui, sans-serif", background: "#0a0a0a", color: "#ededed" }}>
        <div style={{ display: "flex", minHeight: "100vh", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "1.5rem", textAlign: "center" }}>
          <h2 style={{ fontSize: "1.875rem", fontWeight: 700, letterSpacing: "-0.025em", marginBottom: "0.75rem" }}>
            Something went wrong
          </h2>
          <p style={{ color: "#999", marginBottom: "2rem", maxWidth: "28rem" }}>
            A critical error occurred. Please try again.
          </p>
          <button
            onClick={() => reset()}
            style={{ borderRadius: "0.5rem", background: "#3b82f6", padding: "0.625rem 1.25rem", fontSize: "0.875rem", fontWeight: 500, color: "#fff", border: "none", cursor: "pointer" }}
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
