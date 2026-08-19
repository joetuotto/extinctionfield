"use client";

import { useState, useEffect } from "react";

const t = {
  en: {
    title: "Hindcast Validation",
    desc: "Model predictions applied to historical data. BERM is calibrated at 2024 — hindcasting tests whether the model structure (not just the calibration point) produces correct trajectories when applied backwards.",
    country: "Country",
    loading: "Loading hindcast data...",
    error: "Failed to load hindcast data",
    year: "Year",
    predicted: "Predicted",
    observed: "Observed",
    error_label: "Error",
    rmse: "RMSE",
    mae: "MAE",
    maxError: "Max |error|",
    nYears: "Years tested",
    note: "High RMSE in some countries reflects the model's known limitation: BERM is calibrated at 2024 and extrapolated backward. Countries with strong historical confounders (policy changes, wars, economic shocks) produce larger hindcast errors. This is expected — hindcast tests structural validity, not precision.",
  },
  fi: {
    title: "Hindcast-validointi",
    desc: "Mallin ennusteet sovellettuna historialliseen dataan. BERM on kalibroitu vuoteen 2024 — hindcast testaa tuottaako mallirakenteen (ei vain kalibrointipisteen) oikeat trajektorit taaksepain sovellettuna.",
    country: "Maa",
    loading: "Ladataan hindcast-dataa...",
    error: "Hindcast-datan lataus epaonnistui",
    year: "Vuosi",
    predicted: "Ennustettu",
    observed: "Havaittu",
    error_label: "Virhe",
    rmse: "RMSE",
    mae: "MAE",
    maxError: "Max |virhe|",
    nYears: "Testattuja vuosia",
    note: "Korkea RMSE joissain maissa heijastaa mallin tunnettua rajoitusta: BERM on kalibroitu vuoteen 2024 ja ekstrapoloitu taaksepain. Maat joissa on vahvoja historiallisia sekoittajia (politiikkamuutokset, sodat, talouskriisit) tuottavat suurempia hindcast-virheita. Tama on odotettua — hindcast testaa rakenteellista validiteettia, ei tarkkuutta.",
  },
} as const;

interface HindcastCountry {
  predicted: Record<string, number>;
  observed: Record<string, number>;
  rmse: number;
  mae: number;
  max_error: number;
  n_years: number;
}

interface Props {
  locale: string;
}

export function HindcastValidation({ locale }: Props) {
  const d = locale === "fi" ? t.fi : t.en;
  const [data, setData] = useState<Record<string, HindcastCountry> | null>(null);
  const [error, setError] = useState(false);
  const [country, setCountry] = useState("Finland");

  useEffect(() => {
    fetch("/data/hindcast.json")
      .then((r) => {
        if (!r.ok) throw new Error();
        return r.json();
      })
      .then(setData)
      .catch(() => setError(true));
  }, []);

  if (error) return <p className="text-sm text-status-refuted">{d.error}</p>;
  if (!data) return <p className="text-sm text-foreground-muted">{d.loading}</p>;

  const countries = Object.keys(data).sort();
  const cd = data[country];
  if (!cd) return null;

  const years = Object.keys(cd.predicted).sort();

  return (
    <section id="hindcast" className="mb-14">
      <h2 className="text-xl font-semibold mb-4">{d.title}</h2>
      <p className="text-sm text-foreground-muted mb-4 max-w-3xl leading-relaxed">{d.desc}</p>

      <div className="flex flex-wrap gap-3 mb-4">
        <select
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          className="text-sm border border-card-border bg-card-bg rounded-lg px-3 py-1.5 text-foreground"
        >
          {countries.map((c) => (
            <option key={c} value={c}>{c === "SouthKorea" ? "South Korea" : c}</option>
          ))}
        </select>
      </div>

      {/* Metrics cards */}
      <div className="grid grid-cols-4 gap-3 max-w-xl mb-4">
        <div className="border border-card-border bg-card-bg rounded-lg p-3 text-center">
          <p className="text-xs text-foreground-muted mb-1">{d.rmse}</p>
          <p className={`text-lg font-mono-num font-semibold ${cd.rmse > 1.0 ? "text-status-partial" : "text-status-confirmed"}`}>
            {cd.rmse.toFixed(3)}
          </p>
        </div>
        <div className="border border-card-border bg-card-bg rounded-lg p-3 text-center">
          <p className="text-xs text-foreground-muted mb-1">{d.mae}</p>
          <p className="text-lg font-mono-num font-semibold">{cd.mae.toFixed(3)}</p>
        </div>
        <div className="border border-card-border bg-card-bg rounded-lg p-3 text-center">
          <p className="text-xs text-foreground-muted mb-1">{d.maxError}</p>
          <p className="text-lg font-mono-num font-semibold">{cd.max_error.toFixed(3)}</p>
        </div>
        <div className="border border-card-border bg-card-bg rounded-lg p-3 text-center">
          <p className="text-xs text-foreground-muted mb-1">{d.nYears}</p>
          <p className="text-lg font-mono-num font-semibold">{cd.n_years}</p>
        </div>
      </div>

      {/* Year-by-year table */}
      <div className="overflow-x-auto mb-4">
        <table className="text-sm w-full max-w-xl">
          <thead>
            <tr className="border-b border-border text-left text-foreground-muted">
              <th className="py-2 pr-4 font-medium">{d.year}</th>
              <th className="py-2 pr-4 font-medium text-right">{d.predicted}</th>
              <th className="py-2 pr-4 font-medium text-right">{d.observed}</th>
              <th className="py-2 font-medium text-right">{d.error_label}</th>
            </tr>
          </thead>
          <tbody>
            {years.map((yr) => {
              const pred = cd.predicted[yr];
              const obs = cd.observed[yr];
              const err = pred - obs;
              return (
                <tr key={yr} className="border-b border-card-border last:border-0">
                  <td className="py-2 pr-4 font-mono-num">{yr}</td>
                  <td className="py-2 pr-4 text-right font-mono-num">{pred.toFixed(3)}</td>
                  <td className="py-2 pr-4 text-right font-mono-num">{obs.toFixed(3)}</td>
                  <td className={`py-2 text-right font-mono-num ${Math.abs(err) > 0.5 ? "text-status-refuted" : Math.abs(err) > 0.2 ? "text-status-partial" : "text-status-confirmed"}`}>
                    {err > 0 ? "+" : ""}{err.toFixed(3)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <p className="text-xs text-foreground-muted max-w-3xl leading-relaxed">{d.note}</p>
    </section>
  );
}
