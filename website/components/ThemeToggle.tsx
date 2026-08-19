"use client";

import { useSyncExternalStore } from "react";

type Theme = "light" | "dark" | "system";

export function ThemeToggle() {
  const theme = useSyncExternalStore(subscribeToTheme, readTheme, systemTheme);

  function cycle() {
    const next: Theme =
      theme === "dark" ? "light" : theme === "light" ? "system" : "dark";
    if (next === "system") {
      localStorage.removeItem("theme");
      document.documentElement.removeAttribute("data-theme");
    } else {
      localStorage.setItem("theme", next);
      document.documentElement.setAttribute("data-theme", next);
    }
    window.dispatchEvent(new Event("berm-theme-change"));
  }

  return (
    <button
      onClick={cycle}
      className="p-1.5 text-foreground-muted hover:text-foreground transition-colors"
      aria-label={`Theme: ${theme}`}
      title={`Theme: ${theme}`}
    >
      {theme === "dark" ? (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      ) : theme === "light" ? (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="5" />
          <line x1="12" y1="1" x2="12" y2="3" />
          <line x1="12" y1="21" x2="12" y2="23" />
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
          <line x1="1" y1="12" x2="3" y2="12" />
          <line x1="21" y1="12" x2="23" y2="12" />
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
        </svg>
      ) : (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
          <line x1="8" y1="21" x2="16" y2="21" />
          <line x1="12" y1="17" x2="12" y2="21" />
        </svg>
      )}
    </button>
  );
}

function readTheme(): Theme {
  const stored = localStorage.getItem("theme");
  return stored === "light" || stored === "dark" ? stored : "system";
}

function systemTheme(): Theme {
  return "system";
}

function subscribeToTheme(onStoreChange: () => void) {
  const onStorage = () => onStoreChange();
  window.addEventListener("storage", onStorage);
  window.addEventListener("berm-theme-change", onStorage);
  return () => {
    window.removeEventListener("storage", onStorage);
    window.removeEventListener("berm-theme-change", onStorage);
  };
}
