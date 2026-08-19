"use client";

import { useState, useEffect } from "react";

const t = {
  en: {
    title: "Phase 4: ASFR Cohort Model",
    desc: "Age-specific fertility rate projections for 2024–2050. The model applies EMF-driven biological capacity decline differentially across age groups, with younger cohorts (higher cumulative lifetime exposure) showing larger effects. Cultural shift moves peak childbearing later.",
    country: "Country",
    loading: "Loading ASFR data...",
    error: "Failed to load ASFR data",
    ageGroup: "Age group",
    refTFR: "Reference TFR (2024)",
    projected: "Projected TFR",
    mab: "Mean age at birth",
    yearLabel: "Projection year",
    keyFindings: "Key findings",
    f1: "Youngest age groups (15-19, 20-24) show the steepest proportional decline — consistent with highest cumulative lifetime EMF exposure",
    f2: "Peak childbearing shifts from 25-29 to 30-34 in most countries by 2040, driven by cultural shift coefficient",
    f3: "Total TFR decline is distributed unevenly across age groups — not a uniform scaling",
    note: "ASFR projections are model outputs, not demographic forecasts. They test whether BERM's biological capacity mechanism produces age-differentiated fertility patterns consistent with observed trends. The cultural shift parameter is calibrated against historical MAB (mean age at birth) trends.",
  },
  fi: {
    title: "Vaihe 4: ASFR-kohorttimalli",
    desc: "Ikäryhmäkohtaiset hedelmällisyysennusteet 2024–2050. Malli soveltaa EMF-pohjaista biologisen kapasiteetin laskua eri tavoin ikäryhmiin: nuoremmilla kohorteilla (korkeampi kumulatiivinen elinikäinen altistus) vaikutus on suurempi. Kulttuurinen muutos siirtää synnyttämisen huippua myöhemmäksi.",
    country: "Maa",
    loading: "Ladataan ASFR-dataa...",
    error: "ASFR-datan lataus epäonnistui",
    ageGroup: "Ikäryhmä",
    refTFR: "Viite-TFR (2024)",
    projected: "Ennustettu TFR",
    mab: "Keskimääräinen synnytysikä",
    yearLabel: "Ennustevuosi",
    keyFindings: "Keskeiset havainnot",
    f1: "Nuorimmat ikäryhmät (15-19, 20-24) osoittavat jyrkimmän suhteellisen laskun — yhdenmukainen korkeimman kumulatiivisen elinikäisen EMF-altistuksen kanssa",
    f2: "Synnyttämisen huippu siirtyy ikäryhmästä 25-29 ryhmään 30-34 useimmissa maissa vuoteen 2040 mennessä kulttuurisen muutoskertoimen vaikutuksesta",
    f3: "TFR:n kokonaislasku jakautuu epätasaisesti ikäryhmiin — ei yhtenäistä skaalausta",
    note: "ASFR-ennusteet ovat mallin tuotoksia, eivät demografisia ennusteita. Ne testaavat tuottaako BERM:n biologisen kapasiteetin mekanismi ikäeriteltyjä hedelmällisyyskuvioita, jotka ovat yhdenmukaisia havaittujen trendien kanssa. Kulttuurisen muutoksen parametri on kalibroitu historiallisia MAB-trendejä (keskimääräinen synnytysikä) vasten.",
  },
} as const;

interface ASFRData {
  age_groups: string[];
  projection_years: number[];
  countries: Record<string, {
    reference_asfr: number[];
    reference_tfr: number;
    projections: Record<string, {
      asfr: number[];
      tfr: number;
      mab: number;
      cultural_shift: number;
      ratios: number[];
    }>;
  }>;
}

interface Props {
  locale: string;
}

export function ASFRCohortPhase({ locale }: Props) {
  const d = locale === "fi" ? t.fi : t.en;
  const [data, setData] = useState<ASFRData | null>(null);
  const [error, setError] = useState(false);
  const [country, setCountry] = useState("Finland");
  const [year, setYear] = useState("2040");

  useEffect(() => {
    fetch("/data/asfr_cohort.json")
      .then((r) => {
        if (!r.ok) throw new Error();
        return r.json();
      })
      .then(setData)
      .catch(() => setError(true));
  }, []);

  if (error) return <p className="text-sm text-status-refuted">{d.error}</p>;
  if (!data) return <p className="text-sm text-foreground-muted">{d.loading}</p>;

  const countries = Object.keys(data.countries).sort();
  const cd = data.countries[country];
  if (!cd) return null;

  const proj = cd.projections[year];
  if (!proj) return null;

  const maxASFR = Math.max(...cd.reference_asfr, ...proj.asfr);

  return (
    <div className="mb-10">
      <h3 className="text-base font-semibold mb-2">{d.title}</h3>
      <p className="text-sm text-foreground-muted mb-4 max-w-3xl">{d.desc}</p>

      <div className="flex flex-wrap gap-3 mb-4">
        <select
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          className="text-sm border border-card-border bg-card-bg rounded-lg px-3 py-1.5 text-foreground"
        >
          {countries.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
        <select
          value={year}
          onChange={(e) => setYear(e.target.value)}
          className="text-sm border border-card-border bg-card-bg rounded-lg px-3 py-1.5 text-foreground"
        >
          {data.projection_years.filter((y) => y > 2024).map((y) => (
            <option key={y} value={String(y)}>{y}</option>
          ))}
        </select>
      </div>

      {/* Bar chart comparison */}
      <div className="grid grid-cols-7 gap-1.5 max-w-2xl mb-4">
        {data.age_groups.map((ag, i) => {
          const ref = cd.reference_asfr[i];
          const pro = proj.asfr[i];
          const refH = (ref / maxASFR) * 100;
          const proH = (pro / maxASFR) * 100;
          const pctChange = ref > 0 ? ((pro - ref) / ref * 100) : 0;
          return (
            <div key={ag} className="flex flex-col items-center">
              <div className="w-full h-32 flex items-end gap-0.5">
                <div
                  className="flex-1 bg-foreground-muted/20 rounded-t"
                  style={{ height: `${refH}%` }}
                  title={`2024: ${ref.toFixed(1)}`}
                />
                <div
                  className={`flex-1 rounded-t ${pctChange < -10 ? "bg-status-refuted/60" : pctChange < -5 ? "bg-status-partial/60" : "bg-accent/60"}`}
                  style={{ height: `${proH}%` }}
                  title={`${year}: ${pro.toFixed(1)}`}
                />
              </div>
              <p className="text-[10px] text-foreground-muted mt-1 text-center">{ag}</p>
              <p className={`text-[10px] font-mono-num ${pctChange < -10 ? "text-status-refuted" : "text-foreground-muted"}`}>
                {pctChange > 0 ? "+" : ""}{pctChange.toFixed(0)}%
              </p>
            </div>
          );
        })}
      </div>

      <div className="text-xs text-foreground-muted mb-4 flex gap-4">
        <span className="flex items-center gap-1.5">
          <span className="inline-block w-3 h-3 bg-foreground-muted/20 rounded" /> 2024
        </span>
        <span className="flex items-center gap-1.5">
          <span className="inline-block w-3 h-3 bg-accent/60 rounded" /> {year}
        </span>
      </div>

      {/* Summary stats */}
      <div className="grid grid-cols-3 gap-4 max-w-lg mb-4">
        <div className="border border-card-border bg-card-bg rounded-lg p-3 text-center">
          <p className="text-xs text-foreground-muted mb-1">{d.refTFR}</p>
          <p className="text-lg font-mono-num font-semibold">{cd.reference_tfr.toFixed(2)}</p>
        </div>
        <div className="border border-card-border bg-card-bg rounded-lg p-3 text-center">
          <p className="text-xs text-foreground-muted mb-1">{d.projected} {year}</p>
          <p className={`text-lg font-mono-num font-semibold ${proj.tfr < cd.reference_tfr ? "text-status-refuted" : ""}`}>
            {proj.tfr.toFixed(2)}
          </p>
        </div>
        <div className="border border-card-border bg-card-bg rounded-lg p-3 text-center">
          <p className="text-xs text-foreground-muted mb-1">{d.mab}</p>
          <p className="text-lg font-mono-num font-semibold">{proj.mab.toFixed(1)}</p>
        </div>
      </div>

      {/* Key findings */}
      <div className="mt-4 p-3 rounded-lg border border-blue-500/30 bg-blue-500/5 max-w-3xl">
        <h4 className="text-xs font-semibold text-foreground-muted uppercase tracking-wide mb-2">
          {d.keyFindings}
        </h4>
        <ul className="text-xs text-foreground-muted space-y-1.5 leading-relaxed">
          <li className="flex gap-2"><span className="text-accent flex-shrink-0">1.</span>{d.f1}</li>
          <li className="flex gap-2"><span className="text-accent flex-shrink-0">2.</span>{d.f2}</li>
          <li className="flex gap-2"><span className="text-accent flex-shrink-0">3.</span>{d.f3}</li>
        </ul>
      </div>

      <p className="text-xs text-foreground-muted mt-3 max-w-3xl leading-relaxed">{d.note}</p>
    </div>
  );
}
