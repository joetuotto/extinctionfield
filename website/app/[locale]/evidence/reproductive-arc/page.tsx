import type { Metadata } from "next";
import Link from "next/link";
import { Heart } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { CautionBox } from "@/components/CautionBox";
import { DerivedPrediction } from "@/components/DerivedPrediction";

const COPY = {
  en: {
    title: "The Reproductive Arc",
    subtitle: "From fertilization to first year of life, every critical reproductive stage depends on Ca²⁺ channels. CatSper channels guide sperm (VK17), Cav1.2 controls uterine contractions (VK44), nifedipine prevents preterm birth, pre-eclampsia involves Cav1.2+ROS dysregulation (VK48), and SIDS follows melatonin depletion in the neonate.",
    backLink: "← Back to Evidence",
    cautionText: "This page presents Ca²⁺ channel involvement across reproductive stages. Each mechanism is individually established. The unified arc connecting EMF to reproductive outcomes across all stages is a BERM hypothesis.",

    arcTitle: "The arc",
    arcLead: "Five stages from fertilization to the neonatal period — each Ca²⁺-dependent, each EMF-vulnerable.",
    arcSteps: [
      { step: "Stage 1: Fertilization", detail: "CatSper (Ca²⁺ channel) guides sperm to egg. EMF→CatSper activation→premature hyperactivation (VK17). Already verified: sperm motility↓ with RF." },
      { step: "Stage 2: Pregnancy hormones", detail: "P4:E2 ratio regulates Cav1.2 in uterus. P4↓ → Cav1.2↑ → uterine excitability↑. EMF could lower the P4 threshold for preterm contraction onset." },
      { step: "Stage 3: Preterm birth", detail: "Nifedipine (Ca²⁺ channel blocker) is FIRST-LINE tocolytic. If a Ca²⁺ blocker prevents preterm labor, Ca²⁺ overload is a cause. Cochrane evidence: nifedipine superior to beta-agonists." },
      { step: "Stage 4: Pre-eclampsia", detail: "ET-1→Cav1.2 activation in placenta. ROS + Ca²⁺ dysregulation → endothelial dysfunction → hypertension. Nifedipine also used for pre-eclampsia hypertension management." },
      { step: "Stage 5: Neonatal", detail: "Breast milk melatonin → infant circadian programming. EMF→melatonin↓ in mother → less melatonin transfer → SIDS vulnerability (VK18)." },
    ],

    proofTitle: "Nifedipine: The proof",
    proofLead: "The same drug — nifedipine — treats three distinct reproductive conditions. All three work by Ca²⁺ channel blockade.",
    proofPoints: [
      { use: "Tocolysis (preterm labor)", mechanism: "Blocks Cav1.2 in uterine smooth muscle → reduces contractions → delays preterm delivery", note: "First-line tocolytic in many countries; Cochrane-confirmed superiority over beta-agonists" },
      { use: "Pre-eclampsia hypertension", mechanism: "Blocks Cav1.2 in vascular smooth muscle → vasodilation → blood pressure reduction", note: "Used alongside magnesium sulfate (also a Ca²⁺ channel modulator) for severe pre-eclampsia" },
      { use: "Raynaud's nipple vasospasm", mechanism: "Blocks Cav1.2 in nipple vasculature → prevents vasospasm → enables continued breastfeeding", note: "Prescribed during lactation — Ca²⁺ channel blockade in yet another reproductive tissue" },
    ],
    proofConclusion: "If the drug works by blocking Ca²⁺ channels, then Ca²⁺ channel over-activation is the problem. EMF provides a mechanism for that over-activation.",

    epidTitle: "Epidemiological convergence",
    epidLead: "Multiple reproductive outcomes are worsening simultaneously — consistent with a shared environmental cause acting on Ca²⁺ channels.",
    epidPoints: [
      "Preterm birth rates increased ~36% (1990–2006) in many countries",
      "Pre-eclampsia prevalence rising in developed nations",
      "SIDS declined with Back-to-Sleep but other infant mortality patterns shifted",
      "Male fertility declining globally (sperm counts −50% in 50 years)",
    ],

    predictionText: "Prediction E-NEW-1: CatSper-mediated sperm hyperactivation is RF-dose-dependent, and preterm birth / pre-eclampsia rates correlate with maternal EMF exposure levels via Cav1.2 over-activation.",
    predictionLink: "See final layer predictions →",
    predictionHref: "/predictions",
  },
  fi: {
    title: "Reproduktiivinen kaari",
    subtitle: "Hedelmöityksestä ensimmäiseen elinvuoteen jokainen kriittinen lisääntymisen vaihe on riippuvainen Ca²⁺-kanavista. CatSper-kanavat ohjaavat siittiöitä (VK17), Cav1.2 kontrolloi kohdun supistuksia (VK44), nifedipiini estää ennenaikaista synnytystä, pre-eklampsia sisältää Cav1.2+ROS-dysregulaation (VK48), ja kätkytkuolema seuraa melatoniinin ehtymistä vastasyntyneellä.",
    backLink: "← Takaisin Evidenssiin",
    cautionText: "Tämä sivu esittää Ca²⁺-kanavien osallisuuden lisääntymisen eri vaiheissa. Jokainen mekanismi on yksilöllisesti vakiintunut. Yhtenäinen kaari joka yhdistää EMF:n lisääntymistuloksiin kaikkien vaiheiden läpi on BERM-hypoteesi.",

    arcTitle: "Kaari",
    arcLead: "Viisi vaihetta hedelmöityksestä neonataalikauteen — jokainen Ca²⁺-riippuvainen, jokainen EMF-haavoittuva.",
    arcSteps: [
      { step: "Vaihe 1: Hedelmöitys", detail: "CatSper (Ca²⁺-kanava) ohjaa siittiön munasoluun. EMF→CatSper-aktivaatio→ennenaikainen hyperaktivaatio (VK17). Jo vahvistettu: siittiöiden liikkuvuus↓ RF-altistuksella." },
      { step: "Vaihe 2: Raskaushormonit", detail: "P4:E2-suhde säätelee Cav1.2:ta kohdussa. P4↓ → Cav1.2↑ → kohdun ärtyvyys↑. EMF voisi laskea P4-kynnystä ennenaikaisen supistuksen alkamiselle." },
      { step: "Vaihe 3: Ennenaikainen synnytys", detail: "Nifedipiini (Ca²⁺-kanavasalpaaja) on ENSILINJAN tokolyyttinen lääke. Jos Ca²⁺-salpaaja estää ennenaikaista synnytystä, Ca²⁺-ylikuormitus on syy. Cochrane-evidenssi: nifedipiini parempi kuin beta-agonistit." },
      { step: "Vaihe 4: Pre-eklampsia", detail: "ET-1→Cav1.2-aktivaatio istukassa. ROS + Ca²⁺-dysregulaatio → endoteelin toimintahäiriö → hypertensio. Nifedipiiniä käytetään myös pre-eklampsian verenpaineen hallintaan." },
      { step: "Vaihe 5: Neonataalikausi", detail: "Rintamaidon melatoniini → vauvan vuorokausirytmin ohjelmointi. EMF→melatoniini↓ äidissä → vähemmän melatoniinin siirtoa → kätkytkuoleman haavoittuvuus (VK18)." },
    ],

    proofTitle: "Nifedipiini: Todiste",
    proofLead: "Sama lääke — nifedipiini — hoitaa kolmea erillistä lisääntymistilaa. Kaikki kolme toimivat Ca²⁺-kanavasalpauksen kautta.",
    proofPoints: [
      { use: "Tokolyysi (ennenaikainen synnytys)", mechanism: "Salpaaa Cav1.2:n kohdun sileässä lihaksessa → vähentää supistuksia → viivästyttää ennenaikaista synnytystä", note: "Ensilinjan tokolyyttinen lääke monissa maissa; Cochrane-vahvistettu paremmuus beta-agonisteihin nähden" },
      { use: "Pre-eklampsian hypertensio", mechanism: "Salpaaa Cav1.2:n verisuonten sileässä lihaksessa → vasodilataatio → verenpaineen lasku", note: "Käytetään magnesiumsulfaatin (myös Ca²⁺-kanavamodulaattori) kanssa vaikeassa pre-eklampsiassa" },
      { use: "Raynaud'n nännin vasospasmi", mechanism: "Salpaaa Cav1.2:n nännin verisuonissa → estää vasospasmin → mahdollistaa imetyksen jatkumisen", note: "Määrätään imetyksen aikana — Ca²⁺-kanavasalpaus jälleen toisessa lisääntymiskudoksessa" },
    ],
    proofConclusion: "Jos lääke toimii salpaaamalla Ca²⁺-kanavia, niin Ca²⁺-kanavien yliaktivaatio on ongelma. EMF tarjoaa mekanismin tuolle yliaktivaatiolle.",

    epidTitle: "Epidemiologinen konvergenssi",
    epidLead: "Useat lisääntymistulokset huononevat samanaikaisesti — johdonmukaista yhteisen ympäristösyyn kanssa joka vaikuttaa Ca²⁺-kanaviin.",
    epidPoints: [
      "Ennenaikaisen synnytyksen osuudet kasvaneet ~36 % (1990–2006) monissa maissa",
      "Pre-eklampsian esiintyvyys nousee kehittyneissä maissa",
      "Kätkytkuolema väheni Back-to-Sleep-kampanjalla mutta muut imeväiskuolleisuuden kaavat muuttuivat",
      "Miesten hedelmällisyys laskee globaalisti (siittiömäärät −50 % 50 vuodessa)",
    ],

    predictionText: "Ennuste E-NEW-1: CatSper-välitteinen siittiöiden hyperaktivaatio on RF-annosriippuvaista, ja ennenaikaisen synnytyksen / pre-eklampsian osuudet korreloivat äidin EMF-altistustasojen kanssa Cav1.2-yliaktivaation kautta.",
    predictionLink: "Ks. viimeisten kerrosten ennusteet →",
    predictionHref: "/predictions",
  },
} as const;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const d = locale === "fi" ? COPY.fi : COPY.en;
  return { title: `${d.title} – Extinction Field`, description: d.subtitle };
}

export default async function ReproductiveArcPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const activeLocale = locale === "fi" ? "fi" : "en";
  const d = COPY[activeLocale];
  const prefix = `/${locale}`;

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 sm:py-20">
      <p className="mb-6">
        <Link href={`${prefix}/evidence`} className="text-sm text-accent hover:underline">{d.backLink}</Link>
      </p>
      <PageHeader icon={Heart} title={d.title} subtitle={d.subtitle} />
      <div className="mt-8"><CautionBox locale={activeLocale}><p>{d.cautionText}</p></CautionBox></div>

      <section className="mt-12">
        <h2 className="text-lg font-semibold mb-2">{d.arcTitle}</h2>
        <p className="text-sm text-foreground-muted leading-relaxed mb-6 max-w-3xl">{d.arcLead}</p>
        <div className="space-y-3">
          {d.arcSteps.map((s, i) => (
            <div key={i} className="rounded-lg border border-green-500/20 bg-green-500/5 p-4">
              <p className="text-sm font-semibold mb-1">{s.step}</p>
              <p className="text-sm text-foreground-muted leading-relaxed">{s.detail}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-14 border-t editorial-rule pt-6">
        <h2 className="text-lg font-semibold mb-2">{d.proofTitle}</h2>
        <p className="text-sm text-foreground-muted leading-relaxed mb-4 max-w-3xl">{d.proofLead}</p>
        <div className="space-y-3">
          {d.proofPoints.map((p, i) => (
            <div key={i} className="rounded-lg border border-card-border bg-card-bg p-4">
              <p className="text-sm font-semibold mb-1">{p.use}</p>
              <p className="text-sm text-foreground-muted leading-relaxed mb-1">{p.mechanism}</p>
              <p className="text-xs text-foreground-muted italic">{p.note}</p>
            </div>
          ))}
        </div>
        <div className="mt-4 rounded-lg border border-accent/20 bg-accent/5 p-4">
          <p className="text-sm leading-relaxed text-foreground-muted">{d.proofConclusion}</p>
        </div>
      </section>

      <section className="mt-14 border-t editorial-rule pt-6">
        <h2 className="text-lg font-semibold mb-2">{d.epidTitle}</h2>
        <p className="text-sm text-foreground-muted leading-relaxed mb-4 max-w-3xl">{d.epidLead}</p>
        <div className="space-y-1.5">
          {d.epidPoints.map((s, i) => (
            <div key={i} className="flex gap-2 text-sm text-foreground-muted leading-relaxed">
              <span className="text-accent shrink-0">&bull;</span><p>{s}</p>
            </div>
          ))}
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
