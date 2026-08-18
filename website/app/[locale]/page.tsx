import Link from "next/link";
import CausalChain from "@/components/CausalChain";
import type { Locale } from "@/lib/i18n";

const t = {
  en: {
    hero: "Extinction Field",
    heroSub:
      "A falsifiable model linking electromagnetic field exposure to global fertility decline.",
    globalTfr: "Global TFR 2040",
    spermConc: "Sperm concentration 2050",
    ofLevels: "of 2020 levels",
    modelVersion: "Model version",
    lockedPredictions: "7 locked predictions",
    whatTitle: "What is happening?",
    whatFacts: [
      "Global fertility is collapsing faster than any model predicted. The UN revised its 2100 population projection down by 700 million between 2019 and 2024.",
      "Sperm concentration dropped 62% in 50 years, accelerating after 2000. The decline is global and affects all regions regardless of lifestyle.",
      "The same reproductive decline is occurring in dogs, horses, insects, and amphibians — species that share none of our social or economic pressures.",
      "49 countries are now below TFR 1.4 — a level demography once considered impossible under voluntary fertility models.",
      "Male testosterone has declined ~1% per year since the 1980s across all age groups, independent of obesity, smoking, or alcohol (Travison 2007, n=1,532; Lokeshwar 2021). Young men today have T levels their grandfathers had in old age.",
    ],
    whatConclusion:
      "Something biological is happening, across species, across continents, at the same time. BERM proposes a testable explanation.",
    desc1:
      "The Bio-Electromagnetic Reproductive Model (BERM) proposes that anthropogenic electromagnetic fields -- from cell towers, Wi-Fi, and smartphones -- are a significant factor in the global fertility decline. The model produces quantitative, falsifiable predictions that will either come true or not. It is a testable hypothesis, not a certainty claim.",
    desc2:
      "Each prediction is locked with a confidence interval before the observation period begins. If observed values fall outside the predicted interval, the model is refuted on that prediction -- not the prediction adjusted. All source code, data, and methodology are open for anyone to reproduce, challenge, or extend.",
    causalTitle: "Causal pathway overview",
    causalDesc:
      "EMF exposure propagates through five biological pathways to converge on fecundability and fertility rate. Node borders indicate the epistemic level of the supporting evidence.",
    btnPredictions: "View prediction registry",
    btnModel: "Model documentation",
    btnEvidence: "Browse evidence",
    epistemic:
      "Epistemic note: BERM is a scientific model, not a certainty claim. 86% of placebo series fit the current data better (K8). The backcast claim has been refuted in replication (K10). Cross-section R² = 0.9999 is calibration, not validation. If the data contradicts the model, the model is wrong -- that is the point of falsifiability.",
  },
  fi: {
    hero: "Extinction Field",
    heroSub:
      "Falsifioitava malli, joka yhdistää sähkömagneettisen kenttäaltistuksen maailmanlaajuiseen syntyvyyden laskuun.",
    globalTfr: "Globaali TFR 2040",
    spermConc: "Siittiöpitoisuus 2050",
    ofLevels: "vuoden 2020 tasosta",
    modelVersion: "Malliversio",
    lockedPredictions: "7 lukittua ennustetta",
    whatTitle: "Mitä tapahtuu?",
    whatFacts: [
      "Maailman syntyvyys romahtaa nopeammin kuin yksikään malli ennusti. YK laski vuoden 2100 väestöennustettaan 700 miljoonalla vuosien 2019 ja 2024 välillä.",
      "Siittiökonsentraatio laski 62 % 50 vuodessa, kiihtyen vuoden 2000 jälkeen. Lasku on maailmanlaajuinen ja koskee kaikkia alueita elämäntavasta riippumatta.",
      "Sama lisääntymiskyvyn heikkeneminen tapahtuu koirilla, hevosilla, hyönteisillä ja sammakkoeläimillä — lajeilla, joilla ei ole mitään sosiaalisia tai taloudellisia paineitamme.",
      "49 maata on nyt alle TFR 1,4 — tason, jota väestötiede piti mahdottomana vapaaehtoisissa hedelmällisyysmalleissa.",
      "Miesten testosteroni on laskenut ~1 % vuodessa 1980-luvulta kaikissa ikaryhmissa, riippumatta lihavuudesta, tupakoinnista tai alkoholista (Travison 2007, n=1 532; Lokeshwar 2021). Nuorilla miehilla on nykyaan T-tasot, jotka heidan isoisillaan olivat vanhalla iaalla.",
    ],
    whatConclusion:
      "Jotain biologista tapahtuu, lajeista toiseen, mantereelta toiselle, samanaikaisesti. BERM tarjoaa testattavan selityksen.",
    desc1:
      "Bio-sähkömagneettinen lisääntymismalli (BERM) esittää, että ihmisen tuottamat sähkömagneettiset kentät -- tukiasemista, Wi-Fistä ja älypuhelimista -- ovat merkittävä tekijä maailmanlaajuisessa syntyvyyden laskussa. Malli tuottaa kvantitatiivisia, falsifioitavia ennusteita, jotka joko toteutuvat tai eivät. Se on testattava hypoteesi, ei varmuusväite.",
    desc2:
      "Jokainen ennuste lukitaan luottamusvälin kanssa ennen havaintojakson alkua. Jos havaitut arvot jäävät ennustetun välin ulkopuolelle, malli kumotaan kyseisen ennusteen osalta -- ennustetta ei muuteta. Kaikki lähdekoodi, data ja menetelmät ovat avoimesti saatavilla kenelle tahansa toistettavaksi, haastettavaksi tai laajennettavaksi.",
    causalTitle: "Kausaalireitin yleiskatsaus",
    causalDesc:
      "EMF-altistus etenee viiden biologisen reitin kautta ja konvergoi hedelmällisyyteen ja syntyvyyteen. Solmujen reunat osoittavat tukevan näytön episteemisen tason.",
    btnPredictions: "Näytä ennusterekisteri",
    btnModel: "Mallin dokumentaatio",
    btnEvidence: "Selaa näyttöä",
    epistemic:
      "Episteeminen huomautus: BERM on tieteellinen malli, ei varmuusväite. 86 % plasebosarjoista sopii nykyiseen dataan paremmin (K8). Takautuvan ennustamisen väite on kumottu replikaatiossa (K10). Poikkileikkauksen R² = 0.9999 on kalibraatio, ei validaatio. Jos data on ristiriidassa mallin kanssa, malli on väärässä -- se on falsifioitavuuden tarkoitus.",
  },
} as const;

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const d = t[(locale as Locale) in t ? (locale as Locale) : "en"];
  const prefix = `/${locale}`;

  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <header className="mb-16">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
          {d.hero}
        </h1>
        <p className="text-lg md:text-xl text-foreground-muted max-w-2xl">
          {d.heroSub}
        </p>
      </header>

      <section className="mb-16 max-w-3xl">
        <h2 className="text-xl font-semibold mb-5">{d.whatTitle}</h2>
        <ol className="space-y-4">
          {d.whatFacts.map((fact, i) => (
            <li key={i} className="flex gap-4">
              <span className="flex-shrink-0 mt-0.5 w-7 h-7 rounded-full bg-status-refuted/15 text-status-refuted flex items-center justify-center text-xs font-bold">
                {i + 1}
              </span>
              <p className="text-foreground-muted leading-relaxed">{fact}</p>
            </li>
          ))}
        </ol>
        <p className="mt-6 text-foreground font-medium">{d.whatConclusion}</p>
      </section>

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

      <section className="max-w-3xl mb-16 space-y-5">
        <p className="text-foreground-muted leading-relaxed">{d.desc1}</p>
        <p className="text-foreground-muted leading-relaxed">{d.desc2}</p>
      </section>

      <section className="mb-16">
        <h2 className="text-xl font-semibold mb-4">{d.causalTitle}</h2>
        <p className="text-sm text-foreground-muted mb-4 max-w-3xl leading-relaxed">
          {d.causalDesc}
        </p>
        <div className="border border-card-border bg-card-bg rounded-lg p-4 md:p-6 overflow-x-auto">
          <CausalChain />
        </div>
      </section>

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

      <section className="border-t border-border pt-8">
        <p className="text-xs text-foreground-muted leading-relaxed max-w-3xl">
          {d.epistemic}
        </p>
      </section>
    </div>
  );
}
