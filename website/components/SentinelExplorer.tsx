"use client";

import { useEffect, useState } from "react";

interface CSLIData {
  lag_invariance: Record<
    string,
    {
      mu_lag: number;
      sigma_lag: number;
      cv: number;
      n_countries: number;
      assessment: string;
      country_lags: Record<string, { best_lag: number; best_corr: number; n_years: number }>;
    }
  >;
  cross_species_comparison: {
    species_results: Record<
      string,
      { mean_lag: number; n_observations: number; r_squared: number; expected_lag: number }
    >;
    spearman_rho: number;
    order_matches_biology: boolean;
  };
  latent_common_shock: {
    first_pc_explains: number;
    H_emf_correlation: number;
    common_shock_real: boolean;
    emf_explains_shock: boolean;
  };
}

const SPECIES_LABELS: Record<string, Record<string, string>> = {
  en: { bees: "Bees", birds: "Birds", human_sperm: "Human sperm", human_tfr: "Human TFR" },
  fi: { bees: "Mehiläiset", birds: "Linnut", human_sperm: "Siittiöt", human_tfr: "TFR" },
};

const T: Record<string, Record<string, string>> = {
  en: {
    title: "Sentinel Species CSLI Explorer",
    desc: "Cross-species lag invariance analysis: does the lag between EMF exposure and biological response follow a consistent pattern across countries and species?",
    summaryTitle: "Summary",
    summaryShock: "Common environmental shock detected (PC1 explains",
    summaryNoEmf: "but EMF does not clearly explain it",
    summaryEmf: "and EMF may contribute",
    lagMapTitle: "Country-Level Lag Map",
    lagMapDesc: "Best-fit lag (years) between EMF proxy and species decline for each country. Darker = longer lag.",
    species: "Species",
    country: "Country",
    lag: "Lag (yr)",
    corr: "Correlation",
    years: "Years",
    selectSpecies: "Select species",
    noData: "No lag data available for this species.",
    verdictTrue: "Consistent with biological prediction",
    verdictFalse: "Inconsistent with biological prediction",
    overallTitle: "Overall CSLI Verdict",
    overallNeg: "The cross-species lag order does NOT match the biological prediction. All species show weak invariance (CV > 0.5). This is a negative result: the data do not support a universal EMF-driven lag cascade.",
    overallCaveat: "Caveat: This does not refute EMF effects on individual species. It means the cross-species pattern alone cannot serve as independent evidence.",
  },
  fi: {
    title: "Indikaattorilajien CSLI-tutkija",
    desc: "Lajien välinen viive-invarianssianalyysi: seuraako viive EMF-altistuksen ja biologisen vasteen välillä johdonmukaista kaavaa maiden ja lajien välillä?",
    summaryTitle: "Yhteenveto",
    summaryShock: "Yhteinen ympäristöshokki havaittu (PC1 selittää",
    summaryNoEmf: "mutta EMF ei selvästi selitä sitä",
    summaryEmf: "ja EMF saattaa vaikuttaa",
    lagMapTitle: "Maakohtainen viivekartta",
    lagMapDesc: "Paras viive (vuotta) EMF-proksyn ja lajivähenemän välillä maittain. Tummempi = pidempi viive.",
    species: "Laji",
    country: "Maa",
    lag: "Viive (v)",
    corr: "Korrelaatio",
    years: "Vuosia",
    selectSpecies: "Valitse laji",
    noData: "Ei viivedataa tälle lajille.",
    verdictTrue: "Yhdenmukainen biologisen ennusteen kanssa",
    verdictFalse: "Ristiriidassa biologisen ennusteen kanssa",
    overallTitle: "CSLI-kokonaisarvio",
    overallNeg: "Lajien välinen viivejärjestys EI vastaa biologista ennustetta. Kaikki lajit osoittavat heikkoa invarianssia (CV > 0,5). Tämä on negatiivinen tulos: data ei tue universaalia EMF-ohjattua viivekaskadia.",
    overallCaveat: "Varoitus: Tämä ei kumoa EMF-vaikutuksia yksittäisiin lajeihin. Se tarkoittaa, että lajien välinen kuvio yksinään ei voi toimia itsenäisenä näyttönä.",
  },
};

export function SentinelExplorer({ locale }: { locale: string }) {
  const [data, setData] = useState<CSLIData | null>(null);
  const [selectedSpecies, setSelectedSpecies] = useState("bees");
  const t = T[locale] || T.en;
  const labels = SPECIES_LABELS[locale] || SPECIES_LABELS.en;

  useEffect(() => {
    fetch("/data/csli_results.json")
      .then((r) => r.json())
      .then(setData)
      .catch(() => {});
  }, []);

  if (!data) return <p className="text-sm text-foreground-muted">Loading...</p>;

  const inv = data.lag_invariance;
  const comp = data.cross_species_comparison;
  const shock = data.latent_common_shock;
  const speciesData = inv[selectedSpecies];
  const countryLags = speciesData?.country_lags || {};

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-lg font-semibold mb-2">{t.title}</h2>
        <p className="text-sm text-foreground-muted max-w-2xl">{t.desc}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="border border-card-border bg-card-bg rounded-lg p-4 text-center">
          <div className="text-xs text-foreground-muted mb-1">Spearman ρ</div>
          <div className="text-xl font-mono-num font-semibold">{comp.spearman_rho}</div>
          <div className={`text-xs mt-1 ${comp.order_matches_biology ? "text-status-confirmed" : "text-status-refuted"}`}>
            {comp.order_matches_biology ? t.verdictTrue : t.verdictFalse}
          </div>
        </div>
        <div className="border border-card-border bg-card-bg rounded-lg p-4 text-center">
          <div className="text-xs text-foreground-muted mb-1">PC1</div>
          <div className="text-xl font-mono-num font-semibold">{(shock.first_pc_explains * 100).toFixed(1)}%</div>
          <div className={`text-xs mt-1 ${shock.common_shock_real ? "text-status-confirmed" : "text-status-refuted"}`}>
            {t.summaryShock} {(shock.first_pc_explains * 100).toFixed(0)}%)
          </div>
        </div>
        <div className="border border-card-border bg-card-bg rounded-lg p-4 text-center">
          <div className="text-xs text-foreground-muted mb-1">H_EMF</div>
          <div className="text-xl font-mono-num font-semibold">{shock.H_emf_correlation.toFixed(3)}</div>
          <div className={`text-xs mt-1 ${shock.emf_explains_shock ? "text-status-confirmed" : "text-status-refuted"}`}>
            {shock.emf_explains_shock ? t.summaryEmf : t.summaryNoEmf}
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-base font-semibold mb-3">{t.lagMapTitle}</h3>
        <p className="text-sm text-foreground-muted mb-4">{t.lagMapDesc}</p>

        <div className="flex flex-wrap gap-2 mb-4">
          {Object.keys(inv).map((sp) => (
            <button
              key={sp}
              onClick={() => setSelectedSpecies(sp)}
              className={`px-3 py-1.5 text-sm rounded-lg border transition-colors ${
                selectedSpecies === sp
                  ? "border-accent bg-accent/10 text-accent font-medium"
                  : "border-card-border text-foreground-muted hover:text-foreground"
              }`}
            >
              {labels[sp] || sp}
            </button>
          ))}
        </div>

        {Object.keys(countryLags).length === 0 ? (
          <p className="text-sm text-foreground-muted">{t.noData}</p>
        ) : (
          <div className="overflow-x-auto max-h-80 overflow-y-auto">
            <table className="text-sm border-collapse w-full">
              <thead className="sticky top-0 bg-background">
                <tr className="border-b border-border text-foreground-muted">
                  <th className="text-left py-2 pr-4 font-medium">{t.country}</th>
                  <th className="text-right py-2 pr-4 font-medium">{t.lag}</th>
                  <th className="text-right py-2 pr-4 font-medium">{t.corr}</th>
                  <th className="text-right py-2 font-medium">{t.years}</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(countryLags)
                  .sort(([, a], [, b]) => a.best_lag - b.best_lag)
                  .map(([iso, vals]) => {
                    const lagPct = Math.min(vals.best_lag / 10, 1);
                    return (
                      <tr key={iso} className="border-b border-card-border/50">
                        <td className="py-2 pr-4 font-medium">{iso}</td>
                        <td className="py-2 pr-4 text-right">
                          <span className="inline-flex items-center gap-2">
                            <span
                              className="inline-block h-2 rounded-full bg-accent/60"
                              style={{ width: `${Math.max(lagPct * 60, 4)}px` }}
                            />
                            <span className="font-mono-num">{vals.best_lag}</span>
                          </span>
                        </td>
                        <td className={`py-2 pr-4 text-right font-mono-num ${vals.best_corr < 0 ? "text-status-refuted" : "text-status-confirmed"}`}>
                          {vals.best_corr.toFixed(3)}
                        </td>
                        <td className="py-2 text-right font-mono-num text-foreground-muted">{vals.n_years}</td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        )}

        {speciesData && (
          <div className="mt-3 flex flex-wrap gap-4 text-xs text-foreground-muted">
            <span>μ = <span className="font-mono-num">{speciesData.mu_lag.toFixed(1)}</span>y</span>
            <span>σ = <span className="font-mono-num">{speciesData.sigma_lag.toFixed(1)}</span>y</span>
            <span className={speciesData.cv < 0.3 ? "text-status-confirmed" : speciesData.cv < 0.5 ? "text-status-partial" : "text-status-refuted"}>
              CV = <span className="font-mono-num">{speciesData.cv.toFixed(3)}</span>
            </span>
            <span>{speciesData.assessment}</span>
          </div>
        )}
      </div>

      <div className="border border-status-refuted/30 bg-status-refuted/5 rounded-lg p-5">
        <h3 className="text-sm font-semibold mb-2">{t.overallTitle}</h3>
        <p className="text-sm text-foreground-muted leading-relaxed">{t.overallNeg}</p>
        <p className="text-xs text-foreground-muted mt-2 italic">{t.overallCaveat}</p>
      </div>
    </div>
  );
}
