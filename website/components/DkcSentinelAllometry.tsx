const SPECIES = [
  { en: "Honeybee", fi: "Mehiläinen", mass: "100 mg", tau: "~0.5 y" },
  { en: "Small bird", fi: "Pieni lintu", mass: "30 g", tau: "~2 y" },
  { en: "Human", fi: "Ihminen", mass: "70 kg", tau: "~12 y" },
] as const;

export function DkcSentinelAllometry({ locale }: { locale: string }) {
  const fi = locale === "fi";

  return (
    <section className="mb-14 max-w-4xl rounded-2xl border border-amber-500/30 bg-amber-500/5 p-5 sm:p-7">
      <div className="mb-4 flex flex-wrap items-center gap-3">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-amber-600">
          {fi ? "DKC:n lajilaajennus" : "DKC species extension"}
        </p>
        <span className="rounded-full border border-amber-500/40 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-amber-700">
          {fi ? "Tuotu hypoteesi · testaamatta" : "Imported hypothesis · untested"}
        </span>
      </div>
      <h2 className="text-xl font-semibold">
        {fi ? "Allometrinen sentinellikaskadi" : "Allometric sentinel cascade"}
      </h2>
      <p className="mt-2 text-sm leading-relaxed text-foreground-muted">
        {fi
          ? "Ehdokaslaajennus skaalaa hitaan vasteajan massan neljännespotenssilla. Se ei seuraa vielä avoimesta Lindgrenin L2-operaattorista, eikä taulukon arvoja ole kalibroitu lajikohtaisella spektri- ja päätepistedatalla."
          : "The candidate extension scales the slow response time with the quarter power of body mass. It has not been derived from the open Lindgren L2 operator, and the table has not been calibrated with species-specific spectral and endpoint data."}
      </p>
      <div className="my-5 overflow-x-auto rounded-xl border border-card-border bg-card-bg">
        <table className="w-full min-w-[440px] text-sm">
          <thead className="border-b border-card-border text-left text-xs uppercase tracking-wide text-foreground-muted">
            <tr>
              <th className="px-4 py-3">{fi ? "Laji" : "Species"}</th>
              <th className="px-4 py-3">{fi ? "Massa" : "Mass"}</th>
              <th className="px-4 py-3">tau_R</th>
              <th className="px-4 py-3">{fi ? "Tila" : "Status"}</th>
            </tr>
          </thead>
          <tbody>
            {SPECIES.map((row) => (
              <tr key={row.en} className="border-b border-card-border last:border-b-0">
                <td className="px-4 py-3 font-medium">{fi ? row.fi : row.en}</td>
                <td className="px-4 py-3 font-mono-num text-xs">{row.mass}</td>
                <td className="px-4 py-3 font-mono-num text-xs">{row.tau}</td>
                <td className="px-4 py-3 text-xs text-foreground-muted">
                  {fi ? "skenaarioparametri" : "scenario parameter"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <p className="rounded-lg border border-card-border bg-card-bg p-4 font-mono text-sm">
          k_R(species) proportional to mass^(-0.25)
        </p>
        <p className="rounded-lg border border-card-border bg-card-bg p-4 font-mono text-sm">
          tau_R(species) proportional to mass^(0.25)
        </p>
      </div>
      <p className="mt-4 text-xs leading-relaxed text-foreground-muted">
        {fi
          ? "E6 voidaan arvioida vasta, kun mehiläiselle on määritelty mitattu spektrisyöte, rekisteröity vastepäätepiste ja riippumaton tau_R-arvio."
          : "E6 can be evaluated only after a measured honeybee spectral input, a registered response endpoint and an independent tau_R estimate are available."}
      </p>
    </section>
  );
}
