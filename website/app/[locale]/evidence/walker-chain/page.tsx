import type { Metadata } from "next";
import Link from "next/link";
import { Link2 } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { CautionBox } from "@/components/CautionBox";
import { DerivedPrediction } from "@/components/DerivedPrediction";

const COPY = {
  en: {
    title: "The Walker Chain: Sleep → Testosterone → Collapse",
    subtitle: "The complete causal chain from EMF to testosterone decline via sleep is now closed. Seven verified branches form a self-amplifying loop where sleep loss simultaneously attacks testosterone through multiple independent routes.",
    backLink: "← Back to Evidence",
    cautionText: "This page documents the closed Walker chain — a causal loop where each link has been independently verified. The complete loop prediction (superadditive combined effect) has not yet been tested in a single experiment.",

    chainTitle: "The closed loop",
    chainLead: "The Walker chain was originally identified as a linear pathway (EMF → melatonin↓ → sleep↓ → GABA↓ → Q↑). With VK25, the chain closes: sleep↓ → T↓ feeds back into neuroprotection loss, creating a self-amplifying degradation spiral.",

    branches: [
      { id: "W1", name: "EMF → melatonin↓", mechanism: "RF-EMF suppresses melatonin via CRY magnetoreception pathway and direct pineal gland effects. PGC (pineal gland calcification) further reduces melatonin capacity over time.", evidence: "CRY magnetoreception confirmed; PGC ↔ melatonin r=0.569; EMF→melatonin↓ in multiple studies", status: "confirmed" },
      { id: "W2", name: "Melatonin↓ → sleep quality↓", mechanism: "Melatonin is the primary chronobiotic hormone. Its reduction disrupts circadian entrainment, reduces sleep onset efficiency, and degrades slow-wave sleep architecture.", evidence: "Basic chronobiology; melatonin supplementation improves sleep in multiple RCTs", status: "confirmed" },
      { id: "W3", name: "Sleep↓ → GABA↓ → Q↑", mechanism: "Sleep deprivation reduces GABAergic tonic inhibition (γ decreases → Q-factor increases). This is used clinically as diagnostic provocation for epilepsy — 23-62% of patients show epileptiform discharges.", evidence: "Sleep deprivation activates epileptiform discharges (clinical); EEG studies confirm GABA↓", status: "confirmed" },
      { id: "W4", name: "Sleep↓ → T↓ (CLOSURE)", mechanism: "One week of 5-hour sleep reduces testosterone by 10-15%, equivalent to 10-15 years of aging. The effect is dose-dependent: partial restriction shows a trend (p=0.067), total deprivation is significant. This closes the Walker chain.", evidence: "JAMA 2011 (305:2173): 5h sleep → T -10-15%; meta-analysis confirms (PMID:34801825); Sleep Med 2019 RCT confirms dose-response", status: "confirmed" },
      { id: "W5", name: "T↓ → neuroprotection↓", mechanism: "Testosterone provides neuroprotection via AR-mediated BDNF upregulation, anti-inflammatory effects, and synaptic maintenance. T↓ increases hippocampal vulnerability to cortisol, oxidative stress, and neuroinflammation.", evidence: "T↓ neuroprotection link verified in multiple animal models; testosterone replacement improves cognitive outcomes", status: "confirmed" },
      { id: "W6", name: "Sleep↓ → cortisol↑ → GnIH↑ → T↓", mechanism: "Sleep restriction activates the HPA axis → cortisol↑. Cortisol induces GnIH (RFRP-3) in the hypothalamus which suppresses GnRH → LH → T↓. This is a SECOND route from sleep to T↓, amplifying W4.", evidence: "RF9 (GnIH antagonist) restored T in cortisol-treated primates (PMC7946976); CRF→GnRH↓ confirmed (PMC3576618)", status: "confirmed" },
      { id: "W7", name: "Sleep↓ → Per2↓ → gut barrier↓ → neuroinflammation", mechanism: "Sleep/circadian disruption → Per2↓ in gut epithelium → tight junction degradation → LPS enters bloodstream → neuroinflammation → hippocampal neurogenesis↓. Hippocampal damage → HPA braking lost → more cortisol → more sleep disruption.", evidence: "Per2 KO → gut barrier↓ → LPS → depression (PMC12631932); circadian disruption → microbiome shift (PMC5909328)", status: "confirmed" },
    ],

    closureTitle: "Why closure matters",
    closureLead: "Before VK25, the Walker chain was a linear pathway — it stopped at GABA↓ → Q↑. Now it closes: sleep↓ → T↓ → neuroprotection↓ → hippocampus vulnerable → HPA braking lost → cortisol↑ → more sleep disruption. This means the chain is SELF-AMPLIFYING — initial sleep loss creates its own conditions for worsening. No increase in EMF exposure is required for progressive deterioration.",

    superaddTitle: "Superadditive prediction",
    superaddBody: "The closed Walker chain predicts a specific testable outcome: sleep restriction PLUS EMF exposure should produce GREATER testosterone decline than either alone (superadditive, not merely additive). Predicted: >25% T decline in the combined condition vs ~15% for sleep restriction alone. A 2×2 factorial RCT (normal/restricted sleep × low/high EMF) could test this within 3 months.",

    predictionText: "The Walker chain closure generates prediction E-NEW-6: sleep restriction + EMF produces superadditive testosterone decline.",
    predictionLink: "See supplementary layer predictions →",
    predictionHref: "/predictions",
  },
  fi: {
    title: "Walkerin ketju: Uni → Testosteroni → Romahdus",
    subtitle: "Täydellinen kausaaliketju EMF:stä testosteronin laskuun unen kautta on nyt suljettu. Seitsemän verifioitua haaraa muodostavat itseään vahvistavan silmukan, jossa unen menetys hyökkää testosteronia vastaan useita itsenäisiä reittejä pitkin samanaikaisesti.",
    backLink: "← Takaisin Evidenssiin",
    cautionText: "Tämä sivu dokumentoi suljetun Walkerin ketjun — kausaalisilmukan, jossa jokainen linkki on verifioitu itsenäisesti. Täydellisen silmukan ennustetta (superadditiivinen yhdistelmävaikutus) ei ole vielä testattu yksittäisessä kokeessa.",

    chainTitle: "Suljettu silmukka",
    chainLead: "Walkerin ketju tunnistettiin alun perin lineaarisena reittinä (EMF → melatoniini↓ → uni↓ → GABA↓ → Q↑). VK25:n myötä ketju sulkeutuu: uni↓ → T↓ palautuu takaisin neuroprotektiomenetykseen luoden itseään vahvistavan rappeutumisspiraalin.",

    branches: [
      { id: "W1", name: "EMF → melatoniini↓", mechanism: "RF-EMF suppressoi melatoniinia CRY-magnetoreseptioreitin ja suorien pineaalirauhasvaikutusten kautta. PGC (pineaalirauhasen kalsifikaatio) vähentää melatoniinikapasiteettia ajan myötä.", evidence: "CRY-magnetoreseptio vahvistettu; PGC ↔ melatoniini r=0,569; EMF→melatoniini↓ useissa tutkimuksissa", status: "confirmed" },
      { id: "W2", name: "Melatoniini↓ → unenlaatu↓", mechanism: "Melatoniini on primäärinen kronobioottinen hormoni. Sen väheneminen häiritsee sirkadiaanista synkronointia, vähentää nukahtamistehokkuutta ja heikentää syvän unen arkkitehtuuria.", evidence: "Perus kronobiologia; melatoniinilisä parantaa unta useissa RCT:issä", status: "confirmed" },
      { id: "W3", name: "Uni↓ → GABA↓ → Q↑", mechanism: "Univaje vähentää GABAergista toonista inhibitiota (γ pienenee → Q-tekijä kasvaa). Tätä käytetään kliinisesti epilepsian diagnostisena provokaationa — 23-62 % potilaista osoittaa epileptiformisia purkauksia.", evidence: "Univaje aktivoi epileptiformisia purkauksia (kliininen); EEG-tutkimukset vahvistavat GABA↓", status: "confirmed" },
      { id: "W4", name: "Uni↓ → T↓ (SULKEMINEN)", mechanism: "Viikko 5 tunnin unta vähentää testosteronia 10-15 %, vastaten 10-15 vuoden ikääntymistä. Vaikutus on annosriippuvainen: osittainen rajoitus osoittaa trendiä (p=0,067), täydellinen deprivaatio on merkitsevä. Tämä sulkee Walkerin ketjun.", evidence: "JAMA 2011 (305:2173): 5h uni → T -10-15 %; meta-analyysi vahvistaa (PMID:34801825); Sleep Med 2019 RCT vahvistaa annosvasteen", status: "confirmed" },
      { id: "W5", name: "T↓ → neuroprotektio↓", mechanism: "Testosteroni tarjoaa neuroprotektiota AR-välitteisen BDNF-ylössäätelyn, anti-inflammatoristen vaikutusten ja synaptisen ylläpidon kautta. T↓ kasvattaa hippokampuksen haavoittuvuutta kortisolille, oksidatiiviselle stressille ja neurotulehdukselle.", evidence: "T↓ neuroprotektiolinkki verifioitu useissa eläinmalleissa; testosteronikorvaus parantaa kognitiivisia tuloksia", status: "confirmed" },
      { id: "W6", name: "Uni↓ → kortisoli↑ → GnIH↑ → T↓", mechanism: "Unirajoitus aktivoi HPA-akselin → kortisoli↑. Kortisoli indusoi GnIH:n (RFRP-3) hypotalamuksessa joka suppressoi GnRH → LH → T↓. Tämä on TOINEN reitti unesta T↓:iin, vahvistaen W4:ää.", evidence: "RF9 (GnIH-antagonisti) palautti T:n kortisolikäsitellyissä kädellisisssä (PMC7946976); CRF→GnRH↓ vahvistettu (PMC3576618)", status: "confirmed" },
      { id: "W7", name: "Uni↓ → Per2↓ → suoliston este↓ → neurotulehdus", mechanism: "Uni/sirkadiaaninen häiriö → Per2↓ suoliston epitheelissä → tiiviin liitoksen hajoaminen → LPS pääsee verenkiertoon → neurotulehdus → hippokampaalinen neurogeneesi↓. Hippokampusvaurio → HPA-jarru menetetty → lisää kortisolia → lisää unihäiriöitä.", evidence: "Per2 KO → suoliston este↓ → LPS → masennus (PMC12631932); sirkadiaanihäiriö → mikrobiomimuutos (PMC5909328)", status: "confirmed" },
    ],

    closureTitle: "Miksi sulkeutuminen on tärkeää",
    closureLead: "Ennen VK25:tä Walkerin ketju oli lineaarinen reitti — se pysähtyi kohtaan GABA↓ → Q↑. Nyt se sulkeutuu: uni↓ → T↓ → neuroprotektio↓ → hippokampus haavoittuva → HPA-jarru menetetty → kortisoli↑ → lisää unihäiriöitä. Tämä tarkoittaa, että ketju on ITSEÄÄN VAHVISTAVA — alkuperäinen unen menetys luo omat olosuhteet pahenemiselle. EMF-altistuksen kasvua ei tarvita progressiiviseen rappeutumiseen.",

    superaddTitle: "Superadditiivinen ennuste",
    superaddBody: "Suljettu Walkerin ketju ennustaa spesifisen testattavan tuloksen: unirajoitus PLUS EMF-altistus tuottaa SUUREMMAN testosteronilaskun kuin kumpikaan yksin (superadditiivinen, ei pelkästään additiivinen). Ennuste: >25 % T-lasku yhdistelmätilanteessa vs ~15 % pelkälle unirajoitukselle. 2×2-faktoriaalinen RCT (normaali/rajoitettu uni × matala/korkea EMF) voisi testata tämän 3 kuukaudessa.",

    predictionText: "Walkerin ketjun sulkeutuminen tuottaa ennusteen E-NEW-6: unirajoitus + EMF tuottaa superadditiivisen testosteronilaskun.",
    predictionLink: "Ks. täydennyskerrosten ennusteet →",
    predictionHref: "/predictions",
  },
} as const;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const d = locale === "fi" ? COPY.fi : COPY.en;
  return { title: `${d.title} – Extinction Field`, description: d.subtitle };
}

export default async function WalkerChainPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const activeLocale = locale === "fi" ? "fi" : "en";
  const d = COPY[activeLocale];
  const prefix = `/${locale}`;

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 sm:py-20">
      <p className="mb-6">
        <Link href={`${prefix}/evidence`} className="text-sm text-accent hover:underline">{d.backLink}</Link>
      </p>
      <PageHeader icon={Link2} title={d.title} subtitle={d.subtitle} />
      <div className="mt-8">
        <CautionBox locale={activeLocale}><p>{d.cautionText}</p></CautionBox>
      </div>

      <section className="mt-12">
        <h2 className="text-lg font-semibold mb-2">{d.chainTitle}</h2>
        <p className="text-sm text-foreground-muted leading-relaxed mb-6 max-w-3xl">{d.chainLead}</p>
        <div className="space-y-3">
          {d.branches.map((b) => (
            <div key={b.id} className="rounded-lg border border-green-500/30 bg-green-500/5 p-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="font-mono-num text-xs text-accent">{b.id}</span>
                <h3 className="font-semibold text-sm">{b.name}</h3>
                <span className="ml-auto shrink-0 px-2 py-0.5 rounded-full text-[10px] font-bold bg-green-500/10 text-green-600 dark:text-green-400">
                  {activeLocale === "fi" ? "✓ Vahvistettu" : "✓ Confirmed"}
                </span>
              </div>
              <p className="text-sm text-foreground-muted leading-relaxed mb-1">{b.mechanism}</p>
              <p className="text-xs text-foreground-muted italic">{b.evidence}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-14 border-t editorial-rule pt-6">
        <h2 className="text-lg font-semibold mb-2">{d.closureTitle}</h2>
        <p className="text-sm text-foreground-muted leading-relaxed max-w-3xl">{d.closureLead}</p>
      </section>

      <section className="mt-10">
        <h2 className="text-lg font-semibold mb-2">{d.superaddTitle}</h2>
        <div className="rounded-lg border border-accent/20 bg-accent/5 p-4">
          <p className="text-sm leading-relaxed text-foreground-muted">{d.superaddBody}</p>
        </div>
      </section>

      <section className="mt-14 border-t editorial-rule pt-6">
        <DerivedPrediction>
          <p className="text-sm leading-relaxed mb-3">{d.predictionText}</p>
          <Link href={`${prefix}${d.predictionHref}`} className="text-sm text-accent hover:underline">{d.predictionLink}</Link>
        </DerivedPrediction>
      </section>
    </div>
  );
}
