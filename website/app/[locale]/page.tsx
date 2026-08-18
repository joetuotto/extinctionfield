import Link from "next/link";
import CausalChain from "@/components/CausalChain";
import type { Locale } from "@/lib/i18n";

const t = {
  en: {
    hero: "Extinction Field",
    heroSub:
      "A falsifiable model linking electromagnetic field exposure to global fertility decline.",

    happeningTitle: "Something is happening",
    happeningFacts: [
      "Global fertility is collapsing faster than any model predicted. The UN revised its 2100 population projection down by 700 million between 2019 and 2024.",
      "Sperm concentration dropped 62% in 50 years, accelerating after 2000. The decline is global and affects all regions regardless of lifestyle.",
      "The same reproductive decline is occurring in dogs, horses, insects, and amphibians — species that share none of our social or economic pressures.",
      "49 countries are now below TFR 1.4 — a level demography once considered impossible under voluntary fertility models.",
      "Male testosterone has declined ~1% per year since the 1980s across all age groups, independent of obesity, smoking, or alcohol (Travison 2007, n=1,532; Lokeshwar 2021). Young men today have T levels their grandfathers had in old age.",
    ],
    happeningConclusion:
      "Something biological is happening, across species, across continents, at the same time. BERM proposes a testable explanation.",
    mapPlaceholder: "Interactive world map coming soon",
    mapDesc:
      "TFR decline and EMF exposure by country, 1960–2024. Time slider with animation.",

    explainTitle: "One explanation fits all",
    explainDesc:
      "The Bio-Electromagnetic Reproductive Model (BERM) proposes that anthropogenic electromagnetic fields — from cell towers, Wi-Fi, and smartphones — are a significant factor in the global fertility decline. The model produces quantitative, falsifiable predictions that will either come true or not.",
    explainDesc2:
      "Each prediction is locked with a confidence interval before the observation period begins. If observed values fall outside the predicted interval, the model is refuted on that prediction — not the prediction adjusted. All source code, data, and methodology are open for anyone to reproduce, challenge, or extend.",
    causalTitle: "Causal pathway overview",
    causalDesc:
      "EMF exposure propagates through five biological pathways to converge on fecundability and fertility rate. Node borders indicate the epistemic level of the supporting evidence.",

    predTitle: "Locked predictions",
    predDesc:
      "The model produces specific, irrevocable predictions. Each is frozen at a git SHA — if the observation falls outside the CI, the model is falsified.",
    predCountry: "Country",
    predYear: "Year",
    predMetric: "Metric",
    predCentral: "Central",
    predCI: "95% CI",
    predFooter: "v17.0 — 8 locked predictions.",
    predLink: "Full prediction registry",

    caveatsTitle: "What the model gets right — and wrong",
    caveats: [
      {
        label: "K8: Placebo series",
        text: "86% of random placebo series fit the current data better than BERM. The model has not yet distinguished itself from noise on cross-sectional TFR. This is expected — the model's predictive power is in the temporal dimension (locked future predictions), not in cross-country fit.",
      },
      {
        label: "K10: Backcast refuted",
        text: "The original claim that the model 'predicted' historical TFR has been refuted in independent replication. The backcast fit was calibration, not prediction. The model now relies exclusively on forward-locked predictions.",
      },
      {
        label: "R² = 0.9999",
        text: "The cross-section R² is calibration, not validation. The model has enough parameters to fit any smooth curve. Validation will come from locked predictions landing inside their CIs — or not.",
      },
    ],
    caveatsConclusion:
      "BERM is a scientific model, not a certainty claim. If the data contradicts the model, the model is wrong — that is the point of falsifiability.",

    globalTfr: "Global TFR 2040",
    spermConc: "Sperm concentration 2050",
    ofLevels: "of 2020 levels",
    modelVersion: "Model version",
    lockedPredictions: "8 locked predictions",
    btnPredictions: "View prediction registry",
    btnModel: "Model documentation",
    btnEvidence: "Browse evidence",
  },
  fi: {
    hero: "Extinction Field",
    heroSub:
      "Falsifioitava malli, joka yhdistää sähkömagneettisen kenttäaltistuksen maailmanlaajuiseen syntyvyyden laskuun.",

    happeningTitle: "Jotain tapahtuu",
    happeningFacts: [
      "Maailman syntyvyys romahtaa nopeammin kuin yksikään malli ennusti. YK laski vuoden 2100 väestöennustettaan 700 miljoonalla vuosien 2019 ja 2024 välillä.",
      "Siittiökonsentraatio laski 62 % 50 vuodessa, kiihtyen vuoden 2000 jälkeen. Lasku on maailmanlaajuinen ja koskee kaikkia alueita elämäntavasta riippumatta.",
      "Sama lisääntymiskyvyn heikkeneminen tapahtuu koirilla, hevosilla, hyönteisillä ja sammakkoeläimillä — lajeilla, joilla ei ole mitään sosiaalisia tai taloudellisia paineitamme.",
      "49 maata on nyt alle TFR 1,4 — tason, jota väestötiede piti mahdottomana vapaaehtoisissa hedelmällisyysmalleissa.",
      "Miesten testosteroni on laskenut ~1 % vuodessa 1980-luvulta kaikissa ikäryhmissä, riippumatta lihavuudesta, tupakoinnista tai alkoholista (Travison 2007, n=1 532; Lokeshwar 2021). Nuorilla miehillä on nykyään T-tasot, jotka heidän isoisillään olivat vanhalla iällä.",
    ],
    happeningConclusion:
      "Jotain biologista tapahtuu, lajeista toiseen, mantereelta toiselle, samanaikaisesti. BERM tarjoaa testattavan selityksen.",
    mapPlaceholder: "Interaktiivinen maailmankartta tulossa",
    mapDesc:
      "TFR-lasku ja EMF-altistus maittain, 1960–2024. Aikaslider animaatiolla.",

    explainTitle: "Yksi selitys sopii kaikkeen",
    explainDesc:
      "Bio-sähkömagneettinen lisääntymismalli (BERM) esittää, että ihmisen tuottamat sähkömagneettiset kentät — tukiasemista, Wi-Fistä ja älypuhelimista — ovat merkittävä tekijä maailmanlaajuisessa syntyvyyden laskussa. Malli tuottaa kvantitatiivisia, falsifioitavia ennusteita, jotka joko toteutuvat tai eivät.",
    explainDesc2:
      "Jokainen ennuste lukitaan luottamusvälin kanssa ennen havaintojakson alkua. Jos havaitut arvot jäävät ennustetun välin ulkopuolelle, malli kumotaan kyseisen ennusteen osalta — ennustetta ei muuteta. Kaikki lähdekoodi, data ja menetelmät ovat avoimesti saatavilla.",
    causalTitle: "Kausaalireitin yleiskatsaus",
    causalDesc:
      "EMF-altistus etenee viiden biologisen reitin kautta ja konvergoi hedelmällisyyteen ja syntyvyyteen. Solmujen reunat osoittavat tukevan näytön episteemisen tason.",

    predTitle: "Lukitut ennusteet",
    predDesc:
      "Malli tuottaa tarkkoja, peruuttamattomia ennusteita. Jokainen on jäädytetty git SHA:ssa — jos havainto jää luottamusvälin ulkopuolelle, malli falsifioidaan.",
    predCountry: "Maa",
    predYear: "Vuosi",
    predMetric: "Mittari",
    predCentral: "Keskiarvo",
    predCI: "95 % LV",
    predFooter: "v17.0 — 8 lukittua ennustetta.",
    predLink: "Täysi ennusterekisteri",

    caveatsTitle: "Missä malli onnistuu — ja missä ei",
    caveats: [
      {
        label: "K8: Plasebosarjat",
        text: "86 % satunnaisista plasebosarjoista sopii nykyiseen dataan paremmin kuin BERM. Malli ei ole vielä erottunut kohinasta poikkileikkaus-TFR:ssä. Tämä on odotettua — mallin ennustevoima on ajallisessa ulottuvuudessa (lukitut tulevaisuuden ennusteet), ei maakohtaisessa sovituksessa.",
      },
      {
        label: "K10: Takautuva ennustaminen kumottu",
        text: 'Alkuperäinen väite, että malli "ennusti" historiallista TFR:ää, on kumottu itsenäisessä replikaatiossa. Takautuva sovitus oli kalibraatio, ei ennuste. Malli nojaa nyt yksinomaan eteenpäin lukittuihin ennusteisiin.',
      },
      {
        label: "R² = 0,9999",
        text: "Poikkileikkauksen R² on kalibraatio, ei validaatio. Mallissa on riittävästi parametreja minkä tahansa sileän käyrän sovittamiseen. Validaatio tulee lukittujen ennusteiden osumisesta luottamusväleille — tai olemasta.",
      },
    ],
    caveatsConclusion:
      "BERM on tieteellinen malli, ei varmuusväite. Jos data on ristiriidassa mallin kanssa, malli on väärässä — se on falsifioitavuuden tarkoitus.",

    globalTfr: "Globaali TFR 2040",
    spermConc: "Siittiöpitoisuus 2050",
    ofLevels: "vuoden 2020 tasosta",
    modelVersion: "Malliversio",
    lockedPredictions: "8 lukittua ennustetta",
    btnPredictions: "Näytä ennusterekisteri",
    btnModel: "Mallin dokumentaatio",
    btnEvidence: "Selaa näyttöä",
  },
} as const;

const PREDICTIONS_SUMMARY = [
  { country: "Finland", countryFi: "Suomi", year: 2030, metric: "TFR", central: 1.17, ci: "1.02–1.24" },
  { country: "South Korea", countryFi: "Etelä-Korea", year: 2030, metric: "TFR", central: 0.60, ci: "0.48–0.72" },
  { country: "Japan", countryFi: "Japani", year: 2030, metric: "TFR", central: 1.04, ci: "0.88–1.20" },
  { country: "USA", countryFi: "USA", year: 2030, metric: "TFR", central: 1.45, ci: "1.25–1.65" },
  { country: "Global", countryFi: "Maailma", year: 2040, metric: "TFR", central: 1.78, ci: "1.55–2.05" },
];

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const d = t[(locale as Locale) in t ? (locale as Locale) : "en"];
  const prefix = `/${locale}`;
  const isFi = locale === "fi";

  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      {/* Hero */}
      <header className="mb-16">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
          {d.hero}
        </h1>
        <p className="text-lg md:text-xl text-foreground-muted max-w-2xl">
          {d.heroSub}
        </p>
      </header>

      {/* Key metrics */}
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-16">
        <div className="border border-card-border bg-card-bg rounded-lg p-6">
          <p className="text-xs uppercase tracking-wider text-foreground-muted mb-2">
            {d.globalTfr}
          </p>
          <p className="text-3xl font-bold font-mono-num">1.78</p>
          <p className="text-sm text-foreground-muted font-mono-num mt-1">
            95% CI [1.55, 2.05]
          </p>
        </div>
        <div className="border border-card-border bg-card-bg rounded-lg p-6">
          <p className="text-xs uppercase tracking-wider text-foreground-muted mb-2">
            {d.spermConc}
          </p>
          <p className="text-3xl font-bold font-mono-num">62%</p>
          <p className="text-sm text-foreground-muted mt-1">
            {d.ofLevels}{" "}
            <span className="font-mono-num">[48%, 75%]</span>
          </p>
        </div>
        <div className="border border-card-border bg-card-bg rounded-lg p-6">
          <p className="text-xs uppercase tracking-wider text-foreground-muted mb-2">
            {d.modelVersion}
          </p>
          <p className="text-3xl font-bold font-mono-num">v17.0</p>
          <p className="text-sm text-foreground-muted mt-1">
            {d.lockedPredictions}
          </p>
        </div>
      </section>

      {/* Something is happening */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold tracking-tight mb-6">
          {d.happeningTitle}
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-3">
            <ol className="space-y-4">
              {d.happeningFacts.map((fact, i) => (
                <li key={i} className="flex gap-4">
                  <span className="flex-shrink-0 mt-0.5 w-7 h-7 rounded-full bg-status-refuted/15 text-status-refuted flex items-center justify-center text-xs font-bold">
                    {i + 1}
                  </span>
                  <p className="text-foreground-muted leading-relaxed text-sm">
                    {fact}
                  </p>
                </li>
              ))}
            </ol>
            <p className="mt-6 text-foreground font-medium">
              {d.happeningConclusion}
            </p>
          </div>
          <div className="lg:col-span-2">
            <div className="border border-card-border bg-card-bg rounded-lg p-8 text-center h-full flex flex-col items-center justify-center min-h-[240px]">
              <svg
                className="text-foreground-muted/40 mb-3"
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z"
                />
              </svg>
              <h3 className="text-sm font-semibold mb-1 text-foreground-muted">
                {d.mapPlaceholder}
              </h3>
              <p className="text-xs text-foreground-muted/60 max-w-[200px]">
                {d.mapDesc}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* One explanation fits all */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold tracking-tight mb-6">
          {d.explainTitle}
        </h2>
        <div className="max-w-3xl space-y-5 mb-10">
          <p className="text-foreground-muted leading-relaxed">{d.explainDesc}</p>
          <p className="text-foreground-muted leading-relaxed">
            {d.explainDesc2}
          </p>
        </div>
        <h3 className="text-lg font-semibold mb-3">{d.causalTitle}</h3>
        <p className="text-sm text-foreground-muted mb-4 max-w-3xl leading-relaxed">
          {d.causalDesc}
        </p>
        <div className="border border-card-border bg-card-bg rounded-lg p-4 md:p-6 overflow-x-auto">
          <CausalChain />
        </div>
      </section>

      {/* Locked predictions */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold tracking-tight mb-3">
          {d.predTitle}
        </h2>
        <p className="text-sm text-foreground-muted mb-6 max-w-3xl leading-relaxed">
          {d.predDesc}
        </p>
        <div className="border border-card-border bg-card-bg rounded-lg overflow-hidden mb-4">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-left text-foreground-muted bg-background-secondary/50">
                  <th className="py-3 px-4 font-medium">{d.predCountry}</th>
                  <th className="py-3 px-4 font-medium">{d.predYear}</th>
                  <th className="py-3 px-4 font-medium">{d.predMetric}</th>
                  <th className="py-3 px-4 font-medium text-right">
                    {d.predCentral}
                  </th>
                  <th className="py-3 px-4 font-medium text-right">
                    {d.predCI}
                  </th>
                </tr>
              </thead>
              <tbody>
                {PREDICTIONS_SUMMARY.map((p, i) => (
                  <tr
                    key={i}
                    className={
                      i < PREDICTIONS_SUMMARY.length - 1
                        ? "border-b border-card-border"
                        : ""
                    }
                  >
                    <td className="py-3 px-4 font-medium">
                      {isFi ? p.countryFi : p.country}
                    </td>
                    <td className="py-3 px-4 text-foreground-muted">
                      {p.year}
                    </td>
                    <td className="py-3 px-4 text-foreground-muted">
                      {p.metric}
                    </td>
                    <td className="py-3 px-4 text-right font-mono-num font-medium">
                      {p.central}
                    </td>
                    <td className="py-3 px-4 text-right font-mono-num text-foreground-muted">
                      {p.ci}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <p className="text-xs text-foreground-muted mb-4">{d.predFooter}</p>
        <Link
          href={`${prefix}/predictions`}
          className="text-sm text-accent hover:underline"
        >
          {d.predLink} &rarr;
        </Link>
      </section>

      {/* What the model gets right — and wrong */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold tracking-tight mb-6">
          {d.caveatsTitle}
        </h2>
        <div className="space-y-4 max-w-3xl">
          {d.caveats.map((caveat, i) => (
            <div
              key={i}
              className="border border-card-border rounded-lg p-5"
            >
              <p className="text-sm font-semibold text-foreground mb-1">
                {caveat.label}
              </p>
              <p className="text-sm text-foreground-muted leading-relaxed">
                {caveat.text}
              </p>
            </div>
          ))}
        </div>
        <p className="mt-6 text-sm text-foreground-muted max-w-3xl leading-relaxed font-medium">
          {d.caveatsConclusion}
        </p>
      </section>

      {/* Action links */}
      <section className="flex flex-wrap gap-4 mb-16">
        <Link
          href={`${prefix}/predictions`}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-accent hover:bg-accent-hover text-white text-sm font-medium rounded-lg transition-colors"
        >
          {d.btnPredictions}
        </Link>
        <Link
          href={`${prefix}/model`}
          className="inline-flex items-center gap-2 px-5 py-2.5 border border-border text-foreground-muted hover:text-foreground hover:border-foreground-muted text-sm font-medium rounded-lg transition-colors"
        >
          {d.btnModel}
        </Link>
        <Link
          href={`${prefix}/evidence`}
          className="inline-flex items-center gap-2 px-5 py-2.5 border border-border text-foreground-muted hover:text-foreground hover:border-foreground-muted text-sm font-medium rounded-lg transition-colors"
        >
          {d.btnEvidence}
        </Link>
      </section>
    </div>
  );
}
