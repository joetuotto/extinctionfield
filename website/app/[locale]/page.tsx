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
