"use client";

import { useState, useEffect } from "react";

const t = {
  en: {
    title: "Housing Type EMF Factor",
    desc: "Building construction affects indoor EMF exposure through three mechanisms: wall attenuation of outdoor signals, indoor device density, and reflection-enhanced hotspots. Steel high-rises attenuate outdoor RF strongly but compensate with higher indoor device density and multipath reflection. Net factor = attenuation x density x reflection.",
    diagnostic: "DIAGNOSTIC — does not affect TFR predictions",
    country: "Country",
    netFactor: "Net factor",
    outdoor: "Outdoor attenuation",
    indoor: "Indoor density",
    reflection: "Reflection",
    mix: "Housing mix",
    loading: "Loading housing data...",
    error: "Failed to load housing data",
    typeLabel: "Building type",
    typeFraction: "Share",
    sources: "Sources: ITU-R P.2040-3 (building entry loss), Ofcom 2017 (UK indoor measurements), Sagar 2018 (Singapore residential survey)",
  },
  fi: {
    title: "Asuntotyypin EMF-kerroin",
    desc: "Rakennuksen rakenne vaikuttaa sisatilan EMF-altistukseen kolmen mekanismin kautta: seinien vaimennus ulkosignaaleista, sisaisten laitteiden tiheys ja heijastusten luomat hotspot-alueet. Teraskerrostalot vaimentavat ulko-RF:aa voimakkaasti mutta kompensoivat korkeammalla laitetiheydella ja monitieheijastuksella. Nettokerroin = vaimennus x tiheys x heijastus.",
    diagnostic: "DIAGNOSTINEN — ei vaikuta TFR-ennusteisiin",
    country: "Maa",
    netFactor: "Nettokerroin",
    outdoor: "Ulkovaimennus",
    indoor: "Sisatiheys",
    reflection: "Heijastus",
    mix: "Asuntojakauma",
    loading: "Ladataan asuntodataa...",
    error: "Asuntodatan lataus epaonnistui",
    typeLabel: "Rakennus­tyyppi",
    typeFraction: "Osuus",
    sources: "Lahteet: ITU-R P.2040-3 (sisaanpaasyvaimennus), Ofcom 2017 (UK sisamittaukset), Sagar 2018 (Singapore asuntotutkimus)",
  },
} as const;

const COUNTRY_NAMES: Record<string, string> = {
  SouthKorea: "South Korea",
  USA: "United States",
};

const TYPE_LABELS: Record<string, { en: string; fi: string }> = {
  wooden_frame: { en: "Wooden frame", fi: "Puurunko" },
  brick: { en: "Brick", fi: "Tiili" },
  concrete: { en: "Concrete", fi: "Betoni" },
  steel_highrise: { en: "Steel high-rise", fi: "Teraskerrostalo" },
  traditional: { en: "Traditional", fi: "Perinteinen" },
};

interface HousingCountry {
  country: string;
  net_factor: number;
  outdoor_atten: number;
  indoor_density: number;
  reflection: number;
  mix: Record<string, number>;
}

interface HousingData {
  countries: HousingCountry[];
}

interface Props {
  locale: string;
}

export function HousingEMF({ locale }: Props) {
  const d = locale === "fi" ? t.fi : t.en;
  const [data, setData] = useState<HousingData | null>(null);
  const [error, setError] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);

  useEffect(() => {
    fetch("/data/housing.json")
      .then((r) => {
        if (!r.ok) throw new Error();
        return r.json();
      })
      .then(setData)
      .catch(() => setError(true));
  }, []);

  if (error) return <p className="text-sm text-status-refuted">{d.error}</p>;
  if (!data) return <p className="text-sm text-foreground-muted">{d.loading}</p>;

  const countries = data.countries;
  const maxNet = Math.max(...countries.map((c) => c.net_factor));
  const sel = selected ? countries.find((c) => c.country === selected) : null;

  return (
    <section id="housing-emf" className="mb-14">
      <h2 className="text-xl font-semibold mb-1">{d.title}</h2>
      <p className="text-xs text-status-partial font-medium mb-3">{d.diagnostic}</p>
      <p className="text-sm text-foreground-muted mb-6 max-w-3xl leading-relaxed">{d.desc}</p>

      <div className="overflow-x-auto mb-4">
        <table className="text-sm w-full max-w-3xl">
          <thead>
            <tr className="border-b border-border text-left text-foreground-muted">
              <th className="py-2 pr-4 font-medium">{d.country}</th>
              <th className="py-2 pr-4 font-medium text-right">{d.netFactor}</th>
              <th className="py-2 pr-4 font-medium" style={{ minWidth: 120 }}></th>
              <th className="py-2 pr-4 font-medium text-right">{d.outdoor}</th>
              <th className="py-2 pr-4 font-medium text-right">{d.indoor}</th>
              <th className="py-2 font-medium text-right">{d.reflection}</th>
            </tr>
          </thead>
          <tbody>
            {countries.map((c) => {
              const pct = (c.net_factor / maxNet) * 100;
              return (
                <tr
                  key={c.country}
                  className={`border-b border-card-border last:border-0 cursor-pointer hover:bg-card-bg/50 transition-colors ${selected === c.country ? "bg-accent/5" : ""}`}
                  onClick={() => setSelected(selected === c.country ? null : c.country)}
                >
                  <td className="py-2.5 pr-4 font-medium whitespace-nowrap">
                    {COUNTRY_NAMES[c.country] || c.country}
                  </td>
                  <td className="py-2.5 pr-4 text-right font-mono-num">{c.net_factor.toFixed(4)}</td>
                  <td className="py-2.5 pr-4">
                    <div className="w-full bg-card-border/30 rounded-full h-2">
                      <div
                        className="h-2 rounded-full bg-accent"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </td>
                  <td className="py-2.5 pr-4 text-right font-mono-num text-foreground-muted">{c.outdoor_atten.toFixed(3)}</td>
                  <td className="py-2.5 pr-4 text-right font-mono-num text-foreground-muted">{c.indoor_density.toFixed(3)}</td>
                  <td className="py-2.5 text-right font-mono-num text-foreground-muted">{c.reflection.toFixed(3)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {sel && (
        <div className="border border-card-border bg-card-bg rounded-lg p-4 max-w-xl mb-4">
          <h4 className="text-sm font-semibold mb-2">
            {COUNTRY_NAMES[sel.country] || sel.country} — {d.mix}
          </h4>
          <div className="space-y-1.5">
            {Object.entries(sel.mix)
              .sort(([, a], [, b]) => b - a)
              .map(([type, frac]) => (
                <div key={type} className="flex items-center gap-3">
                  <span className="text-xs text-foreground-muted w-28">
                    {TYPE_LABELS[type]?.[locale === "fi" ? "fi" : "en"] || type}
                  </span>
                  <div className="flex-1 bg-card-border/30 rounded-full h-1.5">
                    <div
                      className="h-1.5 rounded-full bg-accent/60"
                      style={{ width: `${frac * 100}%` }}
                    />
                  </div>
                  <span className="text-xs font-mono-num text-foreground-muted w-10 text-right">
                    {(frac * 100).toFixed(0)}%
                  </span>
                </div>
              ))}
          </div>
        </div>
      )}

      <p className="text-xs text-foreground-muted max-w-3xl">{d.sources}</p>
    </section>
  );
}
