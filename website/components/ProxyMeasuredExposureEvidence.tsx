import { InlineReferenceText } from "@/components/InlineReferenceText";
import { pickCopy } from "@/lib/i18n";

const GROUPS = [
  { median: 56.5, n: 223, iqr: "27.5–105.2" },
  { median: 47.9, n: 667, iqr: "25.2–89.0" },
  { median: 45.0, n: 592, iqr: "19.8–88.4" },
  { median: 47.1, n: 669, iqr: "23.0–85.0" },
  { median: 44.5, n: 608, iqr: "21.4–80.9" },
] as const;

const COPY = {
  en: {
    title: "From a use proxy to a measured field",
    lead: "The missing exposure does not have to remain an abstract objection. Human studies have measured personal magnetic fields, compared phone-use groups and adjusted for conventional explanatory variables. They constrain different parts of the exposure–response connection.",
    measuredTitle: "Personal field measurement: an association with semen quality",
    measured: "Li’s participants wore a personal magnetic-field meter. A 90th-percentile exposure of at least 1.6 mG (0.16 µT) was associated with poorer motility and morphology: adjusted odds ratio 2.0, 95% CI 1.0–3.9. Longer time above that field level strengthened the association (trend p = 0.03). The field is measured here, rather than assigned from a lifestyle label. [[ref:li2010_sperm_mf|Li 2010]].",
    chartTitle: "Phone use and sperm concentration",
    chartIntro: "Rahban’s Swiss study recruited 2,886 young men; 2,759 answered the use-frequency question. These are the published group medians, before statistical adjustment. [[ref:rahban2023_phone_semen|Rahban 2023, Table 1]].",
    groups: ["Less than once/week", "1–5 times/day", "5–10 times/day", "10–20 times/day", "More than 20/day"],
    unit: "Median sperm concentration · million/mL",
    caption: "The axis starts at zero. The five groups are not a time series or a calibrated RF dose–response curve.",
    adjusted: "The association with total sperm count remained in a model accounting for education, smoking, body mass index and sampling conditions. Phone use therefore contained information beyond those variables. The study did not isolate how much of that information came from RF exposure.",
    history: "The use–concentration association was more pronounced in 2005–2007 and weaker in later periods. The authors connect this pattern with changing phone technology and output power. This is particularly relevant to BERM: an equal count of uses need not mean an equal physical input to the receiver.",
    details: "Study design, dispersion and adjusted estimates",
    detailText: "Li’s field measurement describes an observation period, not a measured lifetime dose. Rahban measured self-reported use, not individual RF dose. For >20 uses/day versus 1–5/day, adjusted coefficients on the cube-root scale were −0.152 (95% CI −0.316 to 0.011) for concentration and −0.271 (−0.515 to −0.027) for total count. Overall trend tests gave p = 0.021 and 0.010. Motility, morphology and pocket storage showed no consistent adverse association. Period-specific adjusted estimates had overlapping confidence intervals.",
    dispersion: "Published concentration interquartile ranges, in the same group order (million/mL)",
  },
  fi: {
    title: "Käyttöproksista mitattuun kenttään",
    lead: "Puuttuvaa altistusta voidaan tarkentaa tutkimuksilla. Ihmisaineistoissa on mitattu henkilökohtaista magneettikenttää, verrattu puhelimen käyttöryhmiä ja huomioitu tavanomaisia selittäjiä. Nämä paikantavat altistuksen ja vasteen yhteyden eri osia.",
    measuredTitle: "Henkilökohtainen kenttämittaus: yhteys siemennesteen laatuun",
    measured: "Lin tutkimuksessa osallistujat kantoivat magneettikenttämittaria. Altistuksen 90. persentiili vähintään 1,6 mG (0,16 µT) liittyi heikompaan liikkuvuuteen ja morfologiaan: vakioitu vetosuhde 2,0, 95 %:n luottamusväli 1,0–3,9. Pidempi aika tämän kenttätason yläpuolella vahvisti yhteyttä (trendin p = 0,03). Tässä kenttä mitataan suoraan eikä määritetä elämäntapaluokasta. [[ref:li2010_sperm_mf|Li 2010]].",
    chartTitle: "Puhelimen käyttö ja siittiöpitoisuus",
    chartIntro: "Rahbanin sveitsiläistutkimukseen osallistui 2 886 nuorta miestä; 2 759 vastasi käyttötiheyskysymykseen. Kuva näyttää julkaistut ryhmämediaanit ennen tilastollista vakiointia. [[ref:rahban2023_phone_semen|Rahban 2023, taulukko 1]].",
    groups: ["Harvemmin kuin kerran/vko", "1–5 kertaa/vrk", "5–10 kertaa/vrk", "10–20 kertaa/vrk", "Yli 20 kertaa/vrk"],
    unit: "Siittiöpitoisuuden mediaani · milj./ml",
    caption: "Asteikko alkaa nollasta. Viisi ryhmää eivät muodosta aikasarjaa tai kalibroitua RF-annos–vastekäyrää.",
    adjusted: "Yhteys kokonaissiittiömäärään säilyi mallissa, jossa huomioitiin muun muassa koulutus, tupakointi, painoindeksi ja näytteenoton olosuhteet. Käyttötieto sisälsi siis näiden muuttujien ylittävää informaatiota. Tutkimus ei eritellyt, kuinka suuri osa siitä tuli RF-altistuksesta.",
    history: "Käytön ja pitoisuuden yhteys oli voimakkaampi vuosina 2005–2007 ja heikompi myöhemmin. Tekijät yhdistävät tämän puhelinteknologian ja lähetystehon muutokseen. BERM:n kannalta juuri tämä on olennaista: sama käyttökertojen määrä ei määrää samaa fysikaalista syötettä vastaanottajalle.",
    details: "Tutkimusasetelma, hajonta ja vakioidut arviot",
    detailText: "Lin kenttämittaus kuvaa havaintojaksoa, ei mitattua elinikäistä annosta. Rahban mittasi ilmoitettua käyttöä, ei yksilön RF-annosta. Yli 20 käyttökertaa/vrk verrattuna 1–5 kertaan: vakioidut kertoimet kuutiojuuriasteikolla olivat pitoisuudelle −0,152 (95 %:n luottamusväli −0,316…0,011) ja kokonaismäärälle −0,271 (−0,515…−0,027). Koko käyttöasteikon trenditestien p-arvot olivat 0,021 ja 0,010. Liikkuvuudessa, morfologiassa tai taskusäilytyksessä ei havaittu johdonmukaista haitallista yhteyttä. Ajanjaksojen vakioitujen arvioiden luottamusvälit menivät päällekkäin.",
    dispersion: "Julkaistut pitoisuuden kvartiilivälit samassa ryhmäjärjestyksessä (milj./ml)",
  },
};

export function ProxyMeasuredExposureEvidence({ locale }: { locale: string }) {
  const c = pickCopy(COPY, locale);
  const number = (value: number) => value.toFixed(1).replace(".", locale === "fi" ? "," : ".");
  return <section aria-labelledby="proxy-measured-exposure-title" className="min-w-0 space-y-5 border-t border-card-border pt-7">
    <h3 id="proxy-measured-exposure-title" className="font-serif text-2xl">{c.title}</h3>
    <p className="leading-relaxed text-foreground-muted">{c.lead}</p>
    <div className="space-y-2 border-l-2 border-accent pl-4">
      <h4 className="font-semibold">{c.measuredTitle}</h4>
      <p className="text-sm leading-relaxed text-foreground-muted"><InlineReferenceText text={c.measured} locale={locale} /></p>
    </div>
    <figure className="min-w-0 space-y-5 rounded-xl border border-card-border bg-figure-bg p-4 sm:p-6">
      <h4 className="text-lg font-semibold">{c.chartTitle}</h4>
      <p className="text-sm leading-relaxed text-foreground-muted"><InlineReferenceText text={c.chartIntro} locale={locale} /></p>
      <p className="text-xs font-semibold text-foreground-muted">{c.unit}</p>
      <ol className="space-y-4">
        {GROUPS.map((group, index) => <li key={c.groups[index]} className="space-y-1.5">
          <div className="flex justify-between gap-4 text-sm"><span>{c.groups[index]} <span className="text-xs text-foreground-muted">(n = {group.n})</span></span><span className="shrink-0 font-mono font-semibold">{number(group.median)}</span></div>
          <div aria-hidden="true" className="h-4 border-l border-foreground-muted/40 bg-background"><div className="h-full rounded-r bg-accent/75" style={{ width: `${group.median / 60 * 100}%` }} /></div>
        </li>)}
      </ol>
      <div aria-hidden="true" className="flex justify-between font-mono text-[10px] text-foreground-muted"><span>0</span><span>30</span><span>60</span></div>
      <figcaption className="text-xs leading-relaxed text-foreground-muted">{c.caption}</figcaption>
    </figure>
    <p className="leading-relaxed">{c.adjusted}</p>
    <p className="text-sm leading-relaxed text-foreground-muted">{c.history}</p>
    <details className="rounded-lg border border-card-border p-4">
      <summary className="cursor-pointer text-sm font-semibold">{c.details}</summary>
      <p className="mt-4 text-sm leading-relaxed text-foreground-muted">{c.detailText}</p>
      <p className="mt-3 text-xs leading-relaxed text-foreground-muted">{c.dispersion}: {GROUPS.map((group) => locale === "fi" ? group.iqr.replaceAll(".", ",") : group.iqr).join("; ")}.</p>
    </details>
  </section>;
}
