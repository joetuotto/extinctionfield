"use client";

const t = {
  en: {
    title: "Quadruple behavioral suppression",
    desc: "Fertility decline operates through four multiplicative hormonal channels. Each channel independently reduces reproductive probability by ~20%. Because the channels are multiplicative (not additive), the combined effect is much larger than any individual channel: 0.8⁴ = 0.41 — a 59% reduction in fertility-relevant behavior.",
    channel: "Channel",
    mechanism: "Mechanism",
    factor: "Factor",
    combined: "Combined effect",
    reduction: "reduction in fertility-relevant behavior",
    c1Name: "Testosterone → approach",
    c1Mech: "T decline reduces male approach behavior and mate-seeking (Puts 2008)",
    c2Name: "Phenotype → attraction",
    c2Mech: "Population-level masculine phenotype weakening reduces female attraction activation (Thornhill 1994)",
    c3Name: "Oxytocin → pair bonding",
    c3Mech: "OT and T decline within couples reduces sexual frequency and pair bond strength (Carter 2021)",
    c4Name: "Sperm quality → fertilization",
    c4Mech: "Sperm quality decline reduces per-act fertilization probability (Levine 2023)",
    dualHormone: "Dual-hormone compounding",
    dualHormoneDesc: "Testosterone's behavioral effects require low cortisol (Mehta 2015). EMF chronically elevates cortisol AND lowers testosterone, creating double suppression within each channel.",
    policy: "Policy implication",
    policyDesc: "This explains why pronatalist economic policies consistently fail — they target conscious choice (\"can we afford a child?\"), but the suppression operates on unconscious hormonal motivation. South Korea spent $200B on pronatalist incentives (2006–2024); TFR fell from 1.13 to 0.72.",
  },
  fi: {
    title: "Nelinkertainen käyttäytymissuppressio",
    desc: "Hedelmällisyyden lasku toimii neljän multiplikatiivisen hormonaalisen kanavan kautta. Kukin kanava vähentää itsenäisesti lisääntymistodennäköisyyttä ~20%. Koska kanavat ovat multiplikatiivisia (eivät additiivisia), yhdistetty vaikutus on paljon suurempi kuin mikään yksittäinen kanava: 0,8⁴ = 0,41 — 59% vähennys hedelmällisyysrelevantissa käyttäytymisessä.",
    channel: "Kanava",
    mechanism: "Mekanismi",
    factor: "Kerroin",
    combined: "Yhdistetty vaikutus",
    reduction: "vähennys hedelmällisyysrelevantissa käyttäytymisessä",
    c1Name: "Testosteroni → lähestyminen",
    c1Mech: "T:n lasku vähentää miesten lähestymiskäyttäytymistä ja kumppanin etsintää (Puts 2008)",
    c2Name: "Fenotyyppi → vetovoima",
    c2Mech: "Väestötason maskuliinisen fenotyypin heikkeneminen vähentää naisten vetovoimaaktivointia (Thornhill 1994)",
    c3Name: "Oksitosiini → parisuhde",
    c3Mech: "OT:n ja T:n lasku pariskunnissa vähentää seksuaalista aktiivisuutta ja parisidettä (Carter 2021)",
    c4Name: "Siittiöiden laatu → hedelmöitys",
    c4Mech: "Siittiöiden laadun heikkeneminen vähentää per-kerta hedelmöitystodennäköisyyttä (Levine 2023)",
    dualHormone: "Kaksoishormonaalinen yhdistelmä",
    dualHormoneDesc: "Testosteronin käyttäytymisvaikutukset vaativat matalan kortisolin (Mehta 2015). EMF nostaa kroonisesti kortisolia JA laskee testosteronia, luoden kaksinkertaisen suppression kunkin kanavan sisällä.",
    policy: "Poliittinen implikaatio",
    policyDesc: "Tämä selittää miksi pronatalilisit talouspolitiikat epäonnistuvat johdonmukaisesti — ne kohdistuvat tietoiseen valintaan (\"onko meillä varaa lapseen?\"), mutta suppressio toimii tiedostamattomalla hormonaalisella tasolla. Etelä-Korea käytti 200 miljardia dollaria pronatalisleihin (2006–2024); TFR laski 1,13:sta 0,72:een.",
  },
} as const;

interface Props {
  locale: string;
}

export function BehavioralSuppression({ locale }: Props) {
  const d = locale === "fi" ? t.fi : t.en;

  const channels = [
    { name: d.c1Name, mech: d.c1Mech, factor: 0.80 },
    { name: d.c2Name, mech: d.c2Mech, factor: 0.80 },
    { name: d.c3Name, mech: d.c3Mech, factor: 0.80 },
    { name: d.c4Name, mech: d.c4Mech, factor: 0.80 },
  ];

  const combined = channels.reduce((acc, c) => acc * c.factor, 1.0);

  return (
    <section id="behavioral-suppression" className="mb-14">
      <h2 className="text-xl font-semibold mb-4">{d.title}</h2>
      <p className="text-sm text-foreground-muted mb-6 max-w-3xl leading-relaxed">{d.desc}</p>

      {/* Multiplicative visualization */}
      <div className="flex items-center gap-2 mb-6 flex-wrap max-w-2xl">
        {channels.map((c, i) => (
          <div key={c.name} className="flex items-center gap-2">
            <div className="bg-card-bg border border-card-border rounded-lg px-3 py-2 text-center min-w-[60px]">
              <p className="text-lg font-mono-num font-bold">{c.factor}</p>
              <p className="text-[9px] text-foreground-muted leading-tight mt-0.5">{c.name.split(" → ")[0]}</p>
            </div>
            {i < channels.length - 1 && (
              <span className="text-foreground-muted font-bold">&times;</span>
            )}
          </div>
        ))}
        <span className="text-foreground-muted font-bold mx-1">=</span>
        <div className="bg-status-refuted/10 border border-status-refuted/30 rounded-lg px-3 py-2 text-center min-w-[70px]">
          <p className="text-xl font-mono-num font-bold text-status-refuted">{combined.toFixed(2)}</p>
          <p className="text-[9px] text-foreground-muted leading-tight mt-0.5">{d.combined}</p>
        </div>
      </div>

      {/* Channel details table */}
      <div className="overflow-x-auto mb-6">
        <table className="text-sm w-full max-w-3xl">
          <thead>
            <tr className="border-b border-border text-left text-foreground-muted">
              <th className="py-2 pr-4 font-medium">{d.channel}</th>
              <th className="py-2 pr-4 font-medium">{d.mechanism}</th>
              <th className="py-2 font-medium text-right">{d.factor}</th>
            </tr>
          </thead>
          <tbody>
            {channels.map((c) => (
              <tr key={c.name} className="border-b border-card-border last:border-0">
                <td className="py-2.5 pr-4 font-medium whitespace-nowrap">{c.name}</td>
                <td className="py-2.5 pr-4 text-foreground-muted">{c.mech}</td>
                <td className="py-2.5 text-right font-mono-num">{c.factor}</td>
              </tr>
            ))}
            <tr className="bg-status-refuted/5">
              <td className="py-2.5 pr-4 font-semibold">{d.combined}</td>
              <td className="py-2.5 pr-4 text-status-refuted font-medium">59% {d.reduction}</td>
              <td className="py-2.5 text-right font-mono-num font-bold text-status-refuted">{combined.toFixed(2)}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Dual-hormone and policy implications */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl">
        <div className="p-4 rounded-lg border border-status-partial/30 bg-status-partial/5">
          <h4 className="text-xs font-semibold uppercase tracking-wide text-status-partial mb-2">{d.dualHormone}</h4>
          <p className="text-sm text-foreground-muted leading-relaxed">{d.dualHormoneDesc}</p>
        </div>
        <div className="p-4 rounded-lg border border-accent/30 bg-accent/5">
          <h4 className="text-xs font-semibold uppercase tracking-wide text-accent mb-2">{d.policy}</h4>
          <p className="text-sm text-foreground-muted leading-relaxed">{d.policyDesc}</p>
        </div>
      </div>
    </section>
  );
}
