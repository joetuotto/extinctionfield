import { LOCKED_PREDICTIONS } from "@/lib/predictions";
import type { LockedPrediction, PredictionVersion } from "@/lib/types";
import type { Metadata } from "next";
import type { Locale } from "@/lib/i18n";
import { PageHeader } from "@/components/PageHeader";
import { TemporalPredictionStatus } from "@/components/TemporalPredictionStatus";
import { Target } from "lucide-react";

const t = {
  en: {
    title: "Prediction Registry",
    subtitle:
      "Each prediction below is locked: timestamped, versioned, and immutable. When observed data becomes available, predictions are scored as confirmed (observed value within CI), refuted (outside CI), or partial.",
    pending: "Pending",
    confirmed: "Confirmed",
    refuted: "Refuted",
    partial: "Partial",
    targetYear: "Target year",
    locked: "Locked",
    model: "Model",
    gitSha: "Git SHA",
    immutability:
      "CI is locked at first version. If future observations fall outside the confidence interval, the model is falsified.",
    versionHistory: "Version history",
    ciLocked: "CI locked",
    centralUpdated: "Central updated",
    noChanges: "No changes since initial lock",
    auditTitle: "Transparency & Audit Trail",
    auditP1Title: "What is locked",
    auditP1: "Confidence intervals (CI bounds) are locked at the first version of each prediction and can never be widened. This is the falsification mechanism: if observed values fall outside the CI, the model is refuted.",
    auditP2Title: "What can change",
    auditP2: "Central estimates may be updated when the model structure improves (e.g., better cohort weighting). Every change is documented with a reason, date, model version, and git commit SHA. The CI never changes.",
    auditP3Title: "How to verify",
    auditP3: "Every prediction version includes a git SHA linking to the exact code state. The full version history is shown on each prediction card. The git history of lib/predictions.ts serves as the authoritative audit log.",
    auditGitLink: "View git history on GitHub",
    methodology:
      "Methodology: Confidence intervals are derived from the BERM model using Monte Carlo simulation over parameter uncertainty. CI bounds are locked at the first version and never widened. Central estimates may be updated when the model structure improves (documented transparently in version history). Predictions are evaluated against official statistical sources (UN, World Bank, national statistics offices).",
    labTitle: "Laboratory Predictions (THEORETICAL)",
    labSubtitle: "These predictions derive from GME multiwave theory and require experimental verification. Epistemic level: L* (single source, not replicated). The R43 prediction is locked but the underlying theory is not yet validated.",
    r43Title: "R43: Band-pass biological response",
    r43Desc: "RF envelope self-mixing (GME) predicts that pulsed RF exposure produces maximum biological response when the pulse period places spectral energy inside the R42 window (20–40 mHz). The only eDRX fundamental inside R42 is 40.96s → 24.414 mHz. All conditions use eDRX timer values (PTW is a window duration, not a period).",
    r43Chain: "Three-stage evidence chain",
    r43ChainA: "A: 3GPP TS 24.008 eDRX timing (documented standard)",
    r43ChainB: "B: Zandieh 2025 ROS/mitochondrial response at 20–40 mHz (experimental, L*)",
    r43ChainC: "C: GME quadratic self-mixing (mathematical derivation)",
    r43ChainMissing: "Missing link: A + C → B — this is the experiment R43 predicts",
    r43Conditions: "Locked condition ordering (Ξᵣ₄₂ descending)",
    r43Falsification: "Falsification criteria",
    r43Warning: "THEORETICAL: GME envelope theory is L*-level (single-source, not replicated). The 3GPP timing convergence may be coincidental. This prediction is locked for transparency, not because the theory is established.",
    r43Hash: "Prediction integrity hash (SHA-256)",
    r43HashValue: "9fece5e73a8df096cb88514f16e27e63ce0e7a687c7a21b4ce059d2021fbe0e1",
    r43HashNote: "Covers: conditions, falsification criteria, evidence chain, and convergence significance. Verify: download the JSON, extract these four fields, serialize with sorted keys, and compare SHA-256.",
    r43DataLink: "Full preregistration data (JSON)",
  },
  fi: {
    title: "Ennusterekisteri",
    subtitle:
      "Jokainen alla oleva ennuste on lukittu: aikaleimatttu, versioitu ja muuttumaton. Kun havaintodata tulee saataville, ennusteet pisteytetään vahvistetuiksi (havaittu arvo luottamusvälin sisällä), kumotuiksi (välin ulkopuolella) tai osittaisiksi.",
    pending: "Odottaa",
    confirmed: "Vahvistettu",
    refuted: "Kumottu",
    partial: "Osittainen",
    targetYear: "Tavoitevuosi",
    locked: "Lukittu",
    model: "Malli",
    gitSha: "Git SHA",
    immutability:
      "Luottamusväli lukitaan ensimmäisessä versiossa. Jos tulevat havainnot jäävät luottamusvälin ulkopuolelle, malli falsifioidaan.",
    versionHistory: "Versiohistoria",
    ciLocked: "LV lukittu",
    centralUpdated: "Keskiarvo paivitetty",
    noChanges: "Ei muutoksia alkuperaisen lukituksen jalkeen",
    auditTitle: "Lapinakyvyys ja tarkastusketju",
    auditP1Title: "Mika on lukittu",
    auditP1: "Luottamusvalit (LV-rajat) lukitaan jokaisen ennusteen ensimmaisessa versiossa eika niita voi laajentaa. Tama on falsifikaatiomekanismi: jos havaitut arvot jaavat LV:n ulkopuolelle, malli kumotaan.",
    auditP2Title: "Mika voi muuttua",
    auditP2: "Keskiarvioita voidaan paivittaa mallirakenteen parantuessa (esim. parempi kohorttipainotus). Jokainen muutos dokumentoidaan syylla, paivamaaralla, malliversiolla ja git-commitin SHA:lla. Luottamusvali ei koskaan muutu.",
    auditP3Title: "Kuinka varmistaa",
    auditP3: "Jokainen ennusteversio sisaltaa git-SHA:n, joka linkittaa tarkkaan kooditilaan. Taysi versiohistoria nakyy jokaisessa ennustekortissa. lib/predictions.ts-tiedoston git-historia toimii virallisena tarkastuslokina.",
    auditGitLink: "Nayta git-historia GitHubissa",
    methodology:
      "Menetelmä: Luottamusvälit johdetaan BERM-mallista Monte Carlo -simulaatiolla parametriepävarmuuden yli. Luottamusvälin rajat lukitaan ensimmäisessä versiossa eikä niitä laajenneta. Keskiarvioita voidaan päivittää mallirakenteen parantuessa (dokumentoidaan läpinäkyvästi versiohistoriassa). Ennusteita arvioidaan virallisia tilastolähteitä vasten (YK, Maailmanpankki, kansalliset tilastovirastot).",
    labTitle: "Laboratorioennusteet (TEOREETTINEN)",
    labSubtitle: "Nämä ennusteet perustuvat GME-monikaistoiteoriaan ja vaativat kokeellisen vahvistuksen. Episteeminen taso: L* (yksittäinen lähde, ei replikoitu). R43-ennuste on lukittu, mutta taustateoria ei ole vielä validoitu.",
    r43Title: "R43: Kaistanpäästö-biologinen vaste",
    r43Desc: "RF-verhokäyrän itsesekoitus (GME) ennustaa, että pulssitettu RF-altistus tuottaa suurimman biologisen vasteen, kun pulssijakso sijoittaa spektraalienergian R42-ikkunaan (20–40 mHz). Ainoa eDRX-fundamentaali R42:ssa on 40,96s → 24,414 mHz. Kaikki olosuhteet käyttävät eDRX-ajastinarvoja (PTW on ikkunan kesto, ei periodi).",
    r43Chain: "Kolmivaiheinen todistusketju",
    r43ChainA: "A: 3GPP TS 24.008 eDRX-ajoitus (dokumentoitu standardi)",
    r43ChainB: "B: Zandieh 2025 ROS/mitokondriaalinen vaste 20–40 mHz (kokeellinen, L*)",
    r43ChainC: "C: GME neliöllinen itsesekoitus (matemaattinen johtaminen)",
    r43ChainMissing: "Puuttuva linkki: A + C → B — tämä on koe, jonka R43 ennustaa",
    r43Conditions: "Lukittu olosuhdejärjestys (Ξᵣ₄₂ laskeva)",
    r43Falsification: "Falsifikaatiokriteerit",
    r43Warning: "TEOREETTINEN: GME-verhokäyräteoria on L*-tason (yksittäinen lähde, ei replikoitu). 3GPP-ajoituksen yhteensopivuus voi olla sattumaa. Tämä ennuste on lukittu läpinäkyvyyden vuoksi, ei siksi että teoria olisi vakiintunut.",
    r43Hash: "Ennusteen eheyshajautus (SHA-256)",
    r43HashValue: "9fece5e73a8df096cb88514f16e27e63ce0e7a687c7a21b4ce059d2021fbe0e1",
    r43HashNote: "Kattaa: olosuhteet, falsifikaatiokriteerit, todistusketju ja konvergenssin merkitsevyys. Verifiointi: lataa JSON, poimi nama nelj kenttaa, serialisoi jarjestetyilla avaimilla ja vertaa SHA-256.",
    r43DataLink: "Täydet esirekisteröintitiedot (JSON)",
  },
} as const;

const statusLabels = {
  en: { pending: "Pending", confirmed: "Confirmed", refuted: "Refuted", partial: "Partial" },
  fi: { pending: "Odottaa", confirmed: "Vahvistettu", refuted: "Kumottu", partial: "Osittainen" },
} as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return locale === "fi"
    ? {
        title: "Ennusterekisteri - Extinction Field",
        description:
          "Lukitut, falsifioitavat ennusteet BERM-mallista. Jokainen ennuste on aikaleimatttu eikä sitä voi muokata.",
      }
    : {
        title: "Prediction Registry - Extinction Field",
        description:
          "Locked, falsifiable predictions from the BERM model. Each prediction is timestamped and cannot be modified.",
      };
}

function StatusBadge({
  status,
  locale,
}: {
  status: LockedPrediction["status"];
  locale: string;
}) {
  const styles: Record<LockedPrediction["status"], string> = {
    pending: "bg-status-pending/20 text-status-pending",
    confirmed: "bg-status-confirmed/20 text-status-confirmed",
    refuted: "bg-status-refuted/20 text-status-refuted",
    partial: "bg-status-partial/20 text-status-partial",
  };
  const labels = locale === "fi" ? statusLabels.fi : statusLabels.en;

  return (
    <span
      className={`inline-block text-xs font-medium px-2 py-0.5 rounded ${styles[status]}`}
    >
      {labels[status]}
    </span>
  );
}

function CIBar({
  ciLow,
  ciHigh,
  central,
  min,
  max,
}: {
  ciLow: number;
  ciHigh: number;
  central: number;
  min: number;
  max: number;
}) {
  const range = max - min;
  if (range <= 0) return null;

  const leftPct = ((ciLow - min) / range) * 100;
  const widthPct = ((ciHigh - ciLow) / range) * 100;
  const centerPct = ((central - min) / range) * 100;

  return (
    <div className="mt-3 mb-1">
      <div className="relative w-full h-3 bg-ci-bar-bg rounded-full">
        <div
          className="absolute top-0 h-full bg-ci-bar-fill/40 rounded-full"
          style={{ left: `${leftPct}%`, width: `${widthPct}%` }}
        />
        <div
          className="absolute top-0 h-full w-0.5 bg-ci-bar-center rounded-full"
          style={{ left: `${centerPct}%` }}
        />
      </div>
      <div className="flex justify-between mt-1 text-[10px] text-foreground-muted font-mono-num">
        <span>{min.toFixed(min < 10 ? 2 : 0)}</span>
        <span>{max.toFixed(max < 10 ? 2 : 0)}</span>
      </div>
    </div>
  );
}

function PredictionCard({
  prediction,
  locale,
}: {
  prediction: LockedPrediction;
  locale: string;
}) {
  const d = locale === "fi" ? t.fi : t.en;
  const range = prediction.ciHigh - prediction.ciLow;
  const barMin = Math.max(0, prediction.ciLow - range * 0.5);
  const barMax = prediction.ciHigh + range * 0.5;

  return (
    <div className="border border-card-border bg-card-bg rounded-lg p-4 flex flex-col">
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="text-base font-semibold leading-tight">
            {prediction.countryLabel}
          </h3>
          <p className="text-xs text-foreground-muted mt-0.5">
            {prediction.metricLabel}
          </p>
        </div>
        <StatusBadge status={prediction.status} locale={locale} />
      </div>

      <div className="mb-1">
        <span className="text-2xl font-bold font-mono-num">
          {prediction.central.toFixed(2)}
        </span>
        <span className="text-xs text-foreground-muted ml-1.5">
          {prediction.unit}
        </span>
      </div>

      <p className="text-xs text-foreground-muted font-mono-num">
        95% CI [{prediction.ciLow.toFixed(2)}, {prediction.ciHigh.toFixed(2)}]
      </p>

      <CIBar
        ciLow={prediction.ciLow}
        ciHigh={prediction.ciHigh}
        central={prediction.central}
        min={barMin}
        max={barMax}
      />

      <div className="mt-auto pt-3 border-t border-border text-[11px] text-foreground-muted space-y-0.5">
        <div className="flex justify-between">
          <span>{d.targetYear}</span>
          <span className="font-mono-num">{prediction.year}</span>
        </div>
        <div className="flex justify-between">
          <span>{d.locked}</span>
          <span className="font-mono-num">{prediction.lockedDate}</span>
        </div>
        <div className="flex justify-between">
          <span>{d.model}</span>
          <span className="font-mono-num">{prediction.modelVersion}</span>
        </div>
        {prediction.gitSha && (
          <div className="flex justify-between">
            <span>{d.gitSha}</span>
            <span className="font-mono-num">{prediction.gitSha}</span>
          </div>
        )}
      </div>

      {/* Version history — always shown */}
      {prediction.history && prediction.history.length > 0 && (
        <div className="mt-3 pt-3 border-t border-border">
          <p className="text-[11px] font-semibold text-foreground-muted mb-2">
            {d.versionHistory}
          </p>
          <div className="space-y-1.5">
            {prediction.history.map((v: PredictionVersion, idx: number) => {
              const isInitial = idx === 0;
              const isCurrent = idx === prediction.history!.length - 1;
              const prevVersion = idx > 0 ? prediction.history![idx - 1] : null;
              const centralChanged = prevVersion && prevVersion.central !== v.central;
              const ciChanged = prevVersion && (prevVersion.ci[0] !== v.ci[0] || prevVersion.ci[1] !== v.ci[1]);

              return (
                <div
                  key={v.version}
                  className={`text-[11px] rounded p-1.5 ${
                    isCurrent
                      ? "bg-background border border-card-border"
                      : ""
                  }`}
                >
                  <div className="flex items-baseline justify-between">
                    <span className="font-mono-num font-semibold">{v.version}</span>
                    <span className="font-mono-num text-[10px] text-foreground-muted/60">
                      {v.date}
                      {v.gitSha && <> &middot; {v.gitSha}</>}
                    </span>
                  </div>
                  <div className="font-mono-num text-foreground-muted mt-0.5">
                    {v.central.toFixed(2)}
                    <span className="text-foreground-muted/60 ml-1">
                      [{v.ci[0].toFixed(2)}, {v.ci[1].toFixed(2)}]
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1 mt-0.5">
                    {isInitial && (
                      <span className="text-[9px] px-1 py-px rounded bg-status-confirmed/15 text-status-confirmed font-medium">
                        {d.ciLocked}
                      </span>
                    )}
                    {centralChanged && (
                      <span className="text-[9px] px-1 py-px rounded bg-status-partial/15 text-status-partial font-medium">
                        {d.centralUpdated}
                      </span>
                    )}
                    {ciChanged && (
                      <span className="text-[9px] px-1 py-px rounded bg-status-refuted/15 text-status-refuted font-semibold">
                        CI CHANGED
                      </span>
                    )}
                  </div>
                  {v.changeReason !== "initial lock" && (
                    <p className="mt-1 text-[10px] text-foreground-muted/60 leading-snug">
                      {v.changeReason}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
          {prediction.history.length === 1 && (
            <p className="text-[10px] text-foreground-muted/60 mt-1 italic">
              {d.noChanges}
            </p>
          )}
        </div>
      )}

      <p className="mt-2 text-[10px] text-foreground-muted/60 italic leading-snug">
        {d.immutability}
      </p>
    </div>
  );
}

export default async function PredictionsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const d = locale === "fi" ? t.fi : t.en;

  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <PageHeader icon={Target} title={d.title} subtitle={d.subtitle} />

      <TemporalPredictionStatus locale={locale} />

      <div className="flex flex-wrap gap-4 mb-8 text-xs text-foreground-muted">
        <div className="flex items-center gap-1.5">
          <span className="inline-block w-2.5 h-2.5 rounded-full bg-status-pending" />
          {d.pending}
        </div>
        <div className="flex items-center gap-1.5">
          <span className="inline-block w-2.5 h-2.5 rounded-full bg-status-confirmed" />
          {d.confirmed}
        </div>
        <div className="flex items-center gap-1.5">
          <span className="inline-block w-2.5 h-2.5 rounded-full bg-status-refuted" />
          {d.refuted}
        </div>
        <div className="flex items-center gap-1.5">
          <span className="inline-block w-2.5 h-2.5 rounded-full bg-status-partial" />
          {d.partial}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {LOCKED_PREDICTIONS.map((prediction) => (
          <PredictionCard
            key={prediction.id}
            prediction={prediction}
            locale={locale}
          />
        ))}
      </div>

      {/* R43 Laboratory Prediction */}
      <section id="r43" className="mt-16 border-t border-border pt-10">
        <div className="mb-6">
          <h2 className="text-xl font-bold tracking-tight mb-2">{d.labTitle}</h2>
          <p className="text-sm text-foreground-muted max-w-2xl leading-relaxed">
            {d.labSubtitle}
          </p>
        </div>

        <div className="border border-status-partial/30 bg-card-bg rounded-lg p-6 max-w-4xl">
          <div className="flex items-start justify-between mb-4">
            <h3 className="text-lg font-semibold">{d.r43Title}</h3>
            <span className="inline-block text-xs font-medium px-2 py-0.5 rounded bg-status-pending/20 text-status-pending">
              {d.pending}
            </span>
          </div>

          <p className="text-sm text-foreground-muted leading-relaxed mb-6">
            {d.r43Desc}
          </p>

          {/* Three-stage evidence chain */}
          <div className="mb-6">
            <h4 className="text-xs font-semibold uppercase tracking-wide text-foreground-muted mb-2">
              {d.r43Chain}
            </h4>
            <div className="space-y-1.5 text-sm">
              <p className="text-foreground-muted">{d.r43ChainA}</p>
              <p className="text-foreground-muted">{d.r43ChainB}</p>
              <p className="text-foreground-muted">{d.r43ChainC}</p>
              <p className="text-accent font-medium mt-2">{d.r43ChainMissing}</p>
            </div>
          </div>

          {/* Locked conditions table */}
          <div className="mb-6">
            <h4 className="text-xs font-semibold uppercase tracking-wide text-foreground-muted mb-2">
              {d.r43Conditions}
            </h4>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border text-left text-xs text-foreground-muted">
                    <th className="py-2 pr-4">ID</th>
                    <th className="py-2 pr-4">T (s)</th>
                    <th className="py-2 pr-4">Label</th>
                    <th className="py-2 pr-4 text-right">{"Ξ"}&#x1D63;&#x2084;&#x2082;</th>
                    <th className="py-2 text-right">{"Ξ"} norm</th>
                  </tr>
                </thead>
                <tbody className="font-mono-num">
                  {[
                    { id: "C3", T: "40.96", label: locale === "fi" ? "eDRX-fundamentaali (24,4 mHz)" : "eDRX fundamental hit (24.4 mHz)", xi: "0.0543", norm: "1.000" },
                    { id: "C8", T: "100.0", label: "NB-IoT typical", xi: "0.0113", norm: "0.208" },
                    { id: "C4", T: "81.92", label: locale === "fi" ? "eDRX harm. 2-3 R42:ssa" : "eDRX harmonics 2-3 in R42", xi: "0.0049", norm: "0.090" },
                    { id: "C5", T: "163.84", label: locale === "fi" ? "eDRX harm. 4-6 R42:ssa" : "eDRX harmonics 4-6 in R42", xi: "0.0049", norm: "0.089" },
                    { id: "C6", T: "327.68", label: locale === "fi" ? "eDRX korkeat harmonit" : "eDRX high harmonics", xi: "0.0024", norm: "0.044" },
                    { id: "C7", T: "655.36", label: locale === "fi" ? "eDRX pitkä (lähes neg.)" : "eDRX very long (near-negative)", xi: "0.0008", norm: "0.015" },
                    { id: "C2", T: "20.48", label: locale === "fi" ? "eDRX lyhin" : "eDRX shortest", xi: "0.0001", norm: "0.002" },
                    { id: "C1", T: "10.24", label: locale === "fi" ? "Alle R42 (neg. kontrolli)" : "Below R42 (negative control)", xi: "0.0000", norm: "0.000" },
                  ].map((row) => (
                    <tr key={row.id} className="border-b border-border/50">
                      <td className="py-1.5 pr-4 font-semibold">{row.id}</td>
                      <td className="py-1.5 pr-4">{row.T}</td>
                      <td className="py-1.5 pr-4 font-sans text-foreground-muted">{row.label}</td>
                      <td className="py-1.5 pr-4 text-right">{row.xi}</td>
                      <td className="py-1.5 text-right">{row.norm}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Falsification criteria */}
          <div className="mb-6">
            <h4 className="text-xs font-semibold uppercase tracking-wide text-foreground-muted mb-2">
              {d.r43Falsification}
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {[
                { id: "F1", desc: locale === "fi" ? "Monotoninen SAR-vaste (ei kaistanpäästöä)" : "Monotonic SAR response (no band-pass)", kills: locale === "fi" ? "R42 ei funktionaalinen" : "R42 non-functional" },
                { id: "F2", desc: locale === "fi" ? "CW > kaikki pulssitetut" : "CW > all pulsed conditions", kills: locale === "fi" ? "Verhokäyrä irrelevantti" : "Envelope irrelevant" },
                { id: "F3", desc: locale === "fi" ? "Valesignaali >= kaikki" : "Sham >= all", kills: locale === "fi" ? "Ei RF-biologista vaikutusta" : "No RF-biological effect" },
                { id: "F4", desc: locale === "fi" ? "Maksimi T=[25,50]s ulkopuolella" : "Maximum outside T=[25,50]s", kills: locale === "fi" ? "R42-ikkuna väärässä paikassa" : "R42 window misplaced" },
                { id: "F5", desc: locale === "fi" ? "Spearman rho < 0.5 Ξ(T) vs vaste" : "Spearman rho < 0.5 Xi(T) vs response", kills: locale === "fi" ? "Spektrikampateoria väärä" : "Spectral comb theory wrong" },
                { id: "F6", desc: locale === "fi" ? "Ei p < 0.05 (Bonferroni) vs valesignaali" : "No p < 0.05 (Bonferroni) vs sham", kills: locale === "fi" ? "Riittämätön vaikutuskoko" : "Insufficient effect size" },
              ].map((f) => (
                <div key={f.id} className="flex gap-2 text-xs text-foreground-muted">
                  <span className="font-mono-num font-semibold text-status-refuted shrink-0">{f.id}</span>
                  <span>{f.desc} &rarr; {f.kills}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Warning box */}
          <div className="border border-status-partial/40 bg-status-partial/5 rounded-lg p-4 mb-4">
            <p className="text-xs text-status-partial leading-relaxed font-medium">
              {d.r43Warning}
            </p>
          </div>

          {/* Integrity hash */}
          <div className="border border-border rounded-lg p-3 mb-4 bg-background-alt/50">
            <p className="text-[11px] font-medium text-foreground-muted mb-1">{d.r43Hash}</p>
            <p className="text-[10px] font-mono break-all text-foreground-muted/80 leading-relaxed">{d.r43HashValue}</p>
            <p className="text-[10px] text-foreground-muted/60 mt-1">{d.r43HashNote}</p>
          </div>

          {/* Metadata */}
          <div className="flex flex-wrap gap-x-6 gap-y-1 text-[11px] text-foreground-muted font-mono-num">
            <span>{d.locked}: 2026-08-18</span>
            <span>{d.model}: v17.2</span>
            <a
              href="/data/r43_preregistration.json"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:underline"
            >
              {d.r43DataLink} &rarr;
            </a>
          </div>
        </div>
      </section>

      <section id="audit-trail" className="mt-12 border-t border-border pt-8 mb-10">
        <h2 className="text-lg font-semibold mb-4">{d.auditTitle}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl">
          <div className="border border-status-confirmed/30 bg-status-confirmed/5 rounded-lg p-4">
            <h3 className="text-xs font-semibold text-status-confirmed uppercase tracking-wide mb-2">
              {d.auditP1Title}
            </h3>
            <p className="text-sm text-foreground-muted leading-relaxed">
              {d.auditP1}
            </p>
          </div>
          <div className="border border-status-partial/30 bg-status-partial/5 rounded-lg p-4">
            <h3 className="text-xs font-semibold text-status-partial uppercase tracking-wide mb-2">
              {d.auditP2Title}
            </h3>
            <p className="text-sm text-foreground-muted leading-relaxed">
              {d.auditP2}
            </p>
          </div>
          <div className="border border-card-border bg-card-bg rounded-lg p-4">
            <h3 className="text-xs font-semibold text-foreground-muted uppercase tracking-wide mb-2">
              {d.auditP3Title}
            </h3>
            <p className="text-sm text-foreground-muted leading-relaxed">
              {d.auditP3}
            </p>
            <a
              href="https://github.com/joetuotto/extinctionfield/commits/main/website/lib/predictions.ts"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-2 text-xs text-accent hover:underline"
            >
              {d.auditGitLink} &rarr;
            </a>
          </div>
        </div>
      </section>

      <section className="border-t border-border pt-8">
        <p className="text-xs text-foreground-muted leading-relaxed max-w-3xl">
          {d.methodology}
        </p>
      </section>
    </div>
  );
}
