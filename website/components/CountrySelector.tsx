"use client";

import { useState } from "react";

interface Props {
  countries: string[];
  selected: string;
  onSelect: (country: string) => void;
}

const DISPLAY_NAMES: Record<string, string> = {
  SouthKorea: "South Korea",
  USA: "United States",
  UK: "United Kingdom",
  UAE: "United Arab Emirates",
  DRCongo: "DR Congo",
  SouthAfrica: "South Africa",
  SaudiArabia: "Saudi Arabia",
  SriLanka: "Sri Lanka",
};

export function CountrySelector({ countries, selected, onSelect }: Props) {
  const [search, setSearch] = useState("");

  const filtered = search
    ? countries.filter((c) =>
        (DISPLAY_NAMES[c] || c).toLowerCase().includes(search.toLowerCase())
      )
    : countries;

  return (
    <div className="space-y-2">
      <label className="text-sm text-foreground-muted">Select country</label>
      <input
        type="text"
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full bg-card-bg border border-card-border rounded-lg px-3 py-2
                   text-foreground placeholder-foreground-muted text-sm focus:outline-none
                   focus:border-accent"
      />
      <div className="max-h-48 overflow-y-auto bg-card-bg rounded-lg border border-card-border">
        {filtered.map((country) => (
          <button
            key={country}
            onClick={() => {
              onSelect(country);
              setSearch("");
            }}
            className={`w-full text-left px-3 py-2 text-sm transition-colors ${
              country === selected
                ? "bg-accent/20 text-accent font-medium"
                : "text-foreground-muted hover:text-foreground hover:bg-background-secondary"
            }`}
          >
            {DISPLAY_NAMES[country] || country}
          </button>
        ))}
      </div>
    </div>
  );
}
