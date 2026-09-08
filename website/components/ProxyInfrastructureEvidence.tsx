import { InlineReferenceText } from "@/components/InlineReferenceText";
import { pickCopy } from "@/lib/i18n";

const COPY = {
  en: {
    title: "Energy access retains an association with fertility",
    lead: "Across 155 Demographic and Health Surveys from 1990–2015, greater electricity access remained associated with lower total fertility after accounting for women’s education, urbanisation, GDP, age at marriage and conflict. The analysis used region fixed effects, five-year period controls and standard errors clustered by region. [[ref:belmin2022_nature_sustainability|Belmin et al. 2022, Table 1]].",
    caption: "Electricity-access coefficient: TFR units per percentage-point increase in women’s access; standard error in parentheses.",
    model: "Model",
    coefficient: "Coefficient (SE)",
    sample: "Sample",
    rows: [
      { model: "M1 · electricity + controls", coefficient: "−0.018 (0.003)", sample: "1,356 observations · 403 regions · 44 countries" },
      { model: "M3 · electricity + modern cooking fuels + controls", coefficient: "−0.008 (0.004)", sample: "940 observations · 319 regions · 36 countries" },
    ],
    interpretation: "Adding modern cooking-fuel access changes the electricity coefficient; that model also uses a smaller sample. Shared variation and distinct energy-related pathways matter, so the coefficient difference is not a pure measure of mediation.",
    synthesis: "This is the proxy problem in concrete form: an infrastructure variable tracks several changes at once. In BERM, the field branch belongs within this changing environment. Education and other mediators retain their causal roles; their inclusion does not identify which upstream input produced the biological component. The study measures energy access, while the field-specific interpretation is BERM’s composition.",
  },
  fi: {
    title: "Energiansaannin yhteys syntyvyyteen säilyy vakioinneissa",
    lead: "155 väestö- ja terveystutkimuksessa vuosilta 1990–2015 suurempi sähkönsaanti liittyi pienempään kokonaishedelmällisyyteen, kun naisten koulutus, kaupungistuminen, BKT, avioitumisikä ja konfliktit huomioitiin. Analyysi käytti aluekiinteitä vaikutuksia, viiden vuoden aikajaksojen vakiointia ja alueittain klusteroituja keskivirheitä. [[ref:belmin2022_nature_sustainability|Belmin ym. 2022, taulukko 1]].",
    caption: "Sähkönsaannin kerroin: TFR-yksikköä naisten sähkönsaannin prosenttiyksikön lisäystä kohti; keskivirhe sulkeissa.",
    model: "Malli",
    coefficient: "Kerroin (keskivirhe)",
    sample: "Otos",
    rows: [
      { model: "M1 · sähkö + vakioinnit", coefficient: "−0,018 (0,003)", sample: "1 356 havaintoa · 403 aluetta · 44 maata" },
      { model: "M3 · sähkö + modernit ruoanlaittopolttoaineet + vakioinnit", coefficient: "−0,008 (0,004)", sample: "940 havaintoa · 319 aluetta · 36 maata" },
    ],
    interpretation: "Modernien ruoanlaittopolttoaineiden saannin lisääminen muuttaa sähkön kerrointa; samalla otos pienenee. Yhteinen vaihtelu ja energian eri vaikutusreitit merkitsevät, joten kerrointen erotus ei ole puhdas välittymisen mitta.",
    synthesis: "Tämä konkretisoi proksiongelman: infrastruktuurimuuttuja seuraa useaa muutosta yhtä aikaa. BERM:ssä kenttähaara kuuluu tähän muuttuvaan ympäristöön. Koulutus ja muut välittäjät säilyttävät kausaaliset roolinsa; niiden huomioiminen ei yksilöi biologisen osan tuottanutta ylempää syötettä. Tutkimus mittaa energiansaantia, ja kenttäkohtainen tulkinta on BERM:n kokoama liitos.",
  },
};

export function ProxyInfrastructureEvidence({ locale }: { locale: string }) {
  const c = pickCopy(COPY, locale);
  return (
    <section aria-labelledby="proxy-infrastructure-title" className="space-y-5 rounded-xl border border-card-border bg-[var(--figure-bg)] p-4 sm:p-6">
      <h3 id="proxy-infrastructure-title" className="font-serif text-2xl leading-snug">{c.title}</h3>
      <p className="text-base leading-relaxed text-foreground-muted"><InlineReferenceText text={c.lead} locale={locale} /></p>
      <div role="region" aria-label={c.title} tabIndex={0} className="max-w-full overflow-x-auto focus-visible:outline-2 focus-visible:outline-accent">
      <table className="w-full min-w-[34rem] table-fixed border-collapse text-left text-sm leading-relaxed">
        <caption className="mb-3 text-left text-sm leading-relaxed text-foreground-muted">{c.caption}</caption>
        <thead>
          <tr className="border-b border-card-border">
            <th scope="col" className="w-[38%] pb-2 pr-2 font-medium">{c.model}</th>
            <th scope="col" className="w-[29%] pb-2 pr-2 font-medium">{c.coefficient}</th>
            <th scope="col" className="pb-2 font-medium">{c.sample}</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-card-border">
          {c.rows.map((row) => (
            <tr key={row.model} className="align-top">
              <th scope="row" className="break-words py-3 pr-2 font-normal">{row.model}</th>
              <td className="py-3 pr-2 font-medium tabular-nums text-accent">{row.coefficient}</td>
              <td className="py-3 text-foreground-muted">{row.sample}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
      <p className="text-base leading-relaxed text-foreground-muted">{c.interpretation}</p>
      <p className="border-l-2 border-accent pl-4 text-base leading-relaxed">{c.synthesis}</p>
    </section>
  );
}
