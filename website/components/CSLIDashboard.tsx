"use client";

import { useEffect, useState } from "react";

interface CSLIData {
  generated: string;
  cross_species_comparison: {
    lag_order?: [string, number, number][];
    spearman_rho: number | null;
    spearman_p: number | null;
    order_matches_biology: boolean | null;
    species_results?: Record<string, {
      mean_lag: number;
      peak_lag: number;
      n_observations: number;
      r_squared: number;
      expected_lag: number;
      description: string;
    }>;
  };
  lag_invariance: Record<string, {
    mu_lag: number;
    sigma_lag: number;
    cv: number;
    n_countries: number;
    assessment: string;
  }>;
  biological_scaling: {
    formula: string;
    r_squared: number;
    follows_scaling: boolean;
    species_data: { species: string; observed_lag: number; expected_lag: number }[];
  };
  latent_common_shock: {
    n_countries: number;
    n_observations: number;
    first_pc_explains: number;
    H_emf_correlation: number;
    model_comparison: Record<string, { r2: number; bic: number }>;
    common_shock_real: boolean;
    emf_explains_shock: boolean;
    caveats: string[];
  };
  prospective_test: {
    hit_rate: number;
    overall_mu_delta: number;
    overall_sigma_delta: number;
    predictions: {
      holdout: string;
      predicted_lag: number;
      ci_95: [number, number];
      actual_lag: number;
      hit: boolean;
    }[];
  };
}

const SPECIES_LABELS: Record<string, Record<string, string>> = {
  en: {
    bees: "Bees",
    birds: "Birds",
    human_sperm: "Human sperm",
    human_tfr: "Human TFR",
  },
  fi: {
    bees: "Mehiläiset",
    birds: "Linnut",
    human_sperm: "Siittiöt",
    human_tfr: "TFR",
  },
};

interface Props {
  locale: string;
  t: {
    title: string;
    intro: string;
    lagCompTitle: string;
    lagCompDesc: string;
    thSpecies: string;
    thMeanLag: string;
    thExpected: string;
    thNObs: string;
    thR2: string;
    invarianceTitle: string;
    invarianceDesc: string;
    thCountries: string;
    thMuLag: string;
    thSigma: string;
    thCV: string;
    thAssessment: string;
    scalingTitle: string;
    scalingDesc: string;
    shockTitle: string;
    shockDesc: string;
    thModel: string;
    thBIC: string;
    prospTitle: string;
    prospDesc: string;
    loading: string;
    error: string;
    caveatsTitle: string;
    resultPositive: string;
    resultNegative: string;
    spearmanLabel: string;
    hitRateLabel: string;
    pc1Label: string;
    hemfLabel: string;
    commonShockReal: string;
    commonShockNo: string;
    emfExplains: string;
    emfNoExplain: string;
  };
}

export default function CSLIDashboard({ locale, t }: Props) {
  const [data, setData] = useState<CSLIData | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch("/data/csli_results.json")
      .then((r) => r.json())
      .then(setData)
      .catch(() => setError(true));
  }, []);

  if (error) return <p className="text-status-refuted text-sm">{t.error}</p>;
  if (!data) return <p className="text-foreground-muted text-sm">{t.loading}</p>;

  const labels = SPECIES_LABELS[locale] || SPECIES_LABELS.en;
  const comp = data.cross_species_comparison;
  const inv = data.lag_invariance;
  const scal = data.biological_scaling;
  const shock = data.latent_common_shock;
  const prosp = data.prospective_test;

  return (
    <div className="space-y-10">
      {/* Cross-species lag comparison */}
      <div>
        <h3 className="text-lg font-semibold mb-2">{t.lagCompTitle}</h3>
        <p className="text-sm text-foreground-muted mb-4">{t.lagCompDesc}</p>

        {comp.lag_order && (
          <div className="overflow-x-auto">
            <table className="text-sm border-collapse w-full">
              <thead>
                <tr className="border-b border-card-border text-foreground-muted">
                  <th className="text-left py-2 pr-4">{t.thSpecies}</th>
                  <th className="text-right py-2 pr-4">{t.thMeanLag}</th>
                  <th className="text-right py-2 pr-4">{t.thExpected}</th>
                  <th className="text-right py-2 pr-4">{t.thNObs}</th>
                  <th className="text-right py-2">{t.thR2}</th>
                </tr>
              </thead>
              <tbody className="text-foreground-muted">
                {comp.lag_order.map(([species, meanLag, expectedLag]) => {
                  const sr = comp.species_results?.[species];
                  return (
                    <tr key={species} className="border-b border-card-border/50">
                      <td className="py-2 pr-4 font-medium text-foreground">
                        {labels[species] || species}
                      </td>
                      <td className="py-2 pr-4 text-right font-mono-num">
                        {meanLag.toFixed(1)}y
                      </td>
                      <td className="py-2 pr-4 text-right font-mono-num">
                        {expectedLag.toFixed(1)}y
                      </td>
                      <td className="py-2 pr-4 text-right font-mono-num">
                        {sr?.n_observations ?? "?"}
                      </td>
                      <td className="py-2 text-right font-mono-num">
                        {sr?.r_squared?.toFixed(3) ?? "?"}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        <div className="mt-3 flex flex-wrap gap-4 text-xs text-foreground-muted">
          <span>
            {t.spearmanLabel}: <span className="font-mono-num">{comp.spearman_rho}</span>{" "}
            (p = <span className="font-mono-num">{comp.spearman_p}</span>)
          </span>
          <span className={comp.order_matches_biology ? "text-status-confirmed" : "text-status-refuted"}>
            {comp.order_matches_biology ? t.resultPositive : t.resultNegative}
          </span>
        </div>
      </div>

      {/* Lag invariance */}
      <div>
        <h3 className="text-lg font-semibold mb-2">{t.invarianceTitle}</h3>
        <p className="text-sm text-foreground-muted mb-4">{t.invarianceDesc}</p>

        <div className="overflow-x-auto">
          <table className="text-sm border-collapse w-full">
            <thead>
              <tr className="border-b border-card-border text-foreground-muted">
                <th className="text-left py-2 pr-4">{t.thSpecies}</th>
                <th className="text-right py-2 pr-4">{t.thCountries}</th>
                <th className="text-right py-2 pr-4">{t.thMuLag}</th>
                <th className="text-right py-2 pr-4">{t.thSigma}</th>
                <th className="text-right py-2 pr-4">{t.thCV}</th>
                <th className="text-left py-2">{t.thAssessment}</th>
              </tr>
            </thead>
            <tbody className="text-foreground-muted">
              {Object.entries(inv).map(([species, vals]) => {
                const cvColor =
                  vals.cv < 0.3
                    ? "text-status-confirmed"
                    : vals.cv < 0.5
                      ? "text-status-partial"
                      : "text-status-refuted";
                return (
                  <tr key={species} className="border-b border-card-border/50">
                    <td className="py-2 pr-4 font-medium text-foreground">
                      {labels[species] || species}
                    </td>
                    <td className="py-2 pr-4 text-right font-mono-num">{vals.n_countries}</td>
                    <td className="py-2 pr-4 text-right font-mono-num">{vals.mu_lag.toFixed(1)}y</td>
                    <td className="py-2 pr-4 text-right font-mono-num">{vals.sigma_lag.toFixed(1)}y</td>
                    <td className={`py-2 pr-4 text-right font-mono-num ${cvColor}`}>{vals.cv.toFixed(3)}</td>
                    <td className="py-2 text-xs">{vals.assessment}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Biological scaling */}
      <div>
        <h3 className="text-lg font-semibold mb-2">{t.scalingTitle}</h3>
        <p className="text-sm text-foreground-muted mb-3">{t.scalingDesc}</p>
        <div className="bg-card-bg border border-card-border rounded-lg p-4">
          <code className="text-sm text-accent">{scal.formula}</code>
          <div className="mt-2 text-sm text-foreground-muted">
            R² = <span className="font-mono-num">{scal.r_squared.toFixed(4)}</span>
            <span className={`ml-3 ${scal.follows_scaling ? "text-status-confirmed" : "text-status-refuted"}`}>
              {scal.follows_scaling ? t.resultPositive : t.resultNegative}
            </span>
          </div>
        </div>
      </div>

      {/* Latent common shock */}
      <div>
        <h3 className="text-lg font-semibold mb-2">{t.shockTitle}</h3>
        <p className="text-sm text-foreground-muted mb-4">{t.shockDesc}</p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
          <div className="bg-card-bg border border-card-border rounded-lg p-3 text-center">
            <div className="text-xs text-foreground-muted">{t.pc1Label}</div>
            <div className="text-lg font-mono-num font-semibold">{(shock.first_pc_explains * 100).toFixed(1)}%</div>
          </div>
          <div className="bg-card-bg border border-card-border rounded-lg p-3 text-center">
            <div className="text-xs text-foreground-muted">{t.hemfLabel}</div>
            <div className="text-lg font-mono-num font-semibold">{shock.H_emf_correlation.toFixed(3)}</div>
          </div>
          <div className="bg-card-bg border border-card-border rounded-lg p-3 text-center">
            <div className="text-xs text-foreground-muted">{t.thCountries}</div>
            <div className="text-lg font-mono-num font-semibold">{shock.n_countries}</div>
          </div>
          <div className="bg-card-bg border border-card-border rounded-lg p-3 text-center">
            <div className="text-xs text-foreground-muted">N obs</div>
            <div className="text-lg font-mono-num font-semibold">{shock.n_observations}</div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="text-sm border-collapse w-full">
            <thead>
              <tr className="border-b border-card-border text-foreground-muted">
                <th className="text-left py-2 pr-4">{t.thModel}</th>
                <th className="text-right py-2 pr-4">{t.thR2}</th>
                <th className="text-right py-2">{t.thBIC}</th>
              </tr>
            </thead>
            <tbody className="text-foreground-muted">
              {Object.entries(shock.model_comparison).map(([model, vals]) => {
                const isBest = Object.values(shock.model_comparison).every(
                  (v) => vals.bic <= v.bic
                );
                return (
                  <tr key={model} className={`border-b border-card-border/50 ${isBest ? "bg-accent/5" : ""}`}>
                    <td className={`py-2 pr-4 ${isBest ? "font-semibold text-accent" : ""}`}>
                      {model.replace(/_/g, " ")}
                    </td>
                    <td className="py-2 pr-4 text-right font-mono-num">{vals.r2.toFixed(4)}</td>
                    <td className="py-2 text-right font-mono-num">{vals.bic.toFixed(1)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="mt-3 space-y-1 text-xs">
          <p className={shock.common_shock_real ? "text-status-confirmed" : "text-status-refuted"}>
            {shock.common_shock_real ? t.commonShockReal : t.commonShockNo}
          </p>
          <p className={shock.emf_explains_shock ? "text-status-confirmed" : "text-status-refuted"}>
            {shock.emf_explains_shock ? t.emfExplains : t.emfNoExplain}
          </p>
        </div>
      </div>

      {/* Prospective test */}
      <div>
        <h3 className="text-lg font-semibold mb-2">{t.prospTitle}</h3>
        <p className="text-sm text-foreground-muted mb-4">{t.prospDesc}</p>

        <div className="bg-card-bg border border-card-border rounded-lg p-4 mb-4">
          <div className="flex flex-wrap gap-6">
            <div>
              <span className="text-xs text-foreground-muted">{t.hitRateLabel}: </span>
              <span className="font-mono-num font-semibold">{(prosp.hit_rate * 100).toFixed(1)}%</span>
            </div>
            <div>
              <span className="text-xs text-foreground-muted">Δ: </span>
              <span className="font-mono-num">{prosp.overall_mu_delta.toFixed(1)} ± {prosp.overall_sigma_delta.toFixed(1)}y</span>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto max-h-64 overflow-y-auto">
          <table className="text-xs border-collapse w-full">
            <thead className="sticky top-0 bg-background">
              <tr className="border-b border-card-border text-foreground-muted">
                <th className="text-left py-1 pr-2">Country</th>
                <th className="text-right py-1 pr-2">Pred</th>
                <th className="text-right py-1 pr-2">95% CI</th>
                <th className="text-right py-1 pr-2">Actual</th>
                <th className="text-center py-1">Result</th>
              </tr>
            </thead>
            <tbody className="text-foreground-muted">
              {prosp.predictions.map((p) => (
                <tr key={p.holdout} className="border-b border-card-border/30">
                  <td className="py-1 pr-2 font-medium">{p.holdout}</td>
                  <td className="py-1 pr-2 text-right font-mono-num">{p.predicted_lag.toFixed(1)}</td>
                  <td className="py-1 pr-2 text-right font-mono-num">
                    {p.ci_95[0].toFixed(1)}–{p.ci_95[1].toFixed(1)}
                  </td>
                  <td className="py-1 pr-2 text-right font-mono-num">{p.actual_lag}</td>
                  <td className={`py-1 text-center ${p.hit ? "text-status-confirmed" : "text-status-refuted"}`}>
                    {p.hit ? "HIT" : "MISS"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Caveats */}
      <div className="border-t border-card-border pt-4">
        <h3 className="text-sm font-semibold mb-2">{t.caveatsTitle}</h3>
        <ul className="space-y-1">
          {shock.caveats.map((c, i) => (
            <li key={i} className="text-xs text-foreground-muted">
              — {c}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
