import type { Metadata } from "next";
import Link from "next/link";
import { BrainCircuit } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { CautionBox } from "@/components/CautionBox";
import { DerivedPrediction } from "@/components/DerivedPrediction";

const COPY = {
  en: {
    title: "Autism as BERM Prototype",
    subtitle: "ASD unites three independently verified BERM mechanisms — GABA switch delay, ELF-priming synaptogenesis, and inflammation-driven KCC2 suppression — into a single neurodevelopmental outcome. Genetic modulation (CACNA2D3), sex dimorphism (KCC2), and pharmacological validation (bumetanide) all converge.",
    backLink: "← Back to Evidence",
    cautionText: "This page proposes ASD as a prototype manifestation of BERM mechanisms. While each individual mechanism is independently verified, their combined role in ASD etiology remains a testable hypothesis. BERM does NOT claim EMF is the sole cause of ASD — genetic susceptibility, environmental co-factors, and developmental timing all modulate the outcome.",

    mechTitle: "Three converging mechanisms",
    mechLead: "ASD is uniquely positioned in BERM because three independently verified pathways converge on the same neurodevelopmental outcome: excitation/inhibition (E/I) imbalance.",
    mechanisms: [
      { id: "M1", name: "GABA switch delay (VK6)", path: "EMF → ROS → KCC2 maturation↓ → GABA stays excitatory → E/I↑", detail: "In normal development, KCC2 upregulation switches GABA from excitatory to inhibitory during the first postnatal months. Environmental disruption (ROS, inflammation) delays this switch → prolonged excitatory GABA → circuits develop abnormally. ASD patients show elevated NKCC1/KCC2 ratio = GABA still excitatory.", color: "green" },
      { id: "M2", name: "ELF-priming synaptogenesis (VK4 + VK30)", path: "ELF → α2δ-1 expression↑ → EXCESSIVE excitatory synaptogenesis → E/I↑", detail: "ELF-priming (50/60 Hz, 8-10 days) upregulates VGCC α2δ subunit expression. α2δ-1 overexpression drives excessive excitatory synapse formation. CACNA2D3 (α2δ-3) is an autism susceptibility gene — genetic variants increase sensitivity to this ELF-driven mechanism.", color: "green" },
      { id: "M3", name: "Inflammation → KCC2↓ (S9 + S10)", path: "EMF → mast cells → IL-1β → KCC2 maturation further delayed → E/I↑↑", detail: "EMF-induced mast cell degranulation releases IL-1β which directly delays KCC2 maturation. This creates feedback loop S9: more inflammation → more KCC2 delay → GABA stays excitatory longer → more neuronal damage → more inflammation. The developing brain is trapped in an excitatory state.", color: "green" },
    ],

    spectrumTitle: "The Q-factor spectrum",
    spectrumLead: "ASD and epilepsy are not separate disorders but different manifestations of the same E/I spectrum — determined by Q-factor value.",
    spectrumPoints: [
      "ASD + epilepsy co-occurrence: 38% of ASD individuals have epilepsy",
      "Same mechanism (E/I↑) produces different outcomes at different Q values: moderate Q → ASD features; high Q → seizures; both → ASD + epilepsy",
      "CACNA2D3 variants modulate where on the spectrum an individual falls",
      "KCC2 sex dimorphism: KCC2 expression differs between sexes → explains male 4:1 predominance in ASD",
    ],

    geneticsTitle: "Genetic modulation",
    geneticsLead: "BERM does not predict ASD in everyone — genetic susceptibility determines who is vulnerable.",
    geneticsPoints: [
      { gene: "CACNA2D3 (α2δ-3)", role: "Autism susceptibility gene — encodes the VGCC α2δ subunit that ELF-priming targets. Variants increase sensitivity to ELF-driven synaptogenesis." },
      { gene: "CACNA1C (Cav1.2)", role: "Sousouri 2025 (ETH Zürich): CACNA1C genotype modulates EMF response in sleep EEG. Timothy syndrome (CACNA1C gain-of-function) produces ASD features." },
      { gene: "KCC2 (SLC12A5)", role: "Sex-dimorphic expression. Lower baseline KCC2 in males → males need less additional KCC2 suppression to reach the excitatory GABA threshold → 4:1 male predominance." },
    ],

    pharmaTitle: "Pharmacological validation",
    pharmaLead: "Bumetanide — a drug that restores inhibitory GABA — improves ASD symptoms in multiple RCTs. This is exactly what BERM predicts.",
    pharmaPoints: [
      "Bumetanide blocks NKCC1 → reduces intracellular chloride → GABA becomes inhibitory → E/I ratio normalizes",
      "Multiple RCTs show improvement in ASD core symptoms (Lemonnier 2012, Dai 2021, Shaker 2024)",
      "Bumetanide corrects the SAME disruption (GABA polarity) that EMF produces via KCC2↓",
      "Plasma KCC2, NKCC1, GABA levels now serve as peripheral ASD biomarkers (Springer 2026)",
    ],

    devTitle: "Developmental sequence",
    devStages: [
      { stage: "Prenatal", events: "EMF → ROS → KCC2↓ → GABA switch delays (VK6); EMF → hypothalamic neuroendocrine disruption (VK13); EMF → epigenetic changes in developing brain (VK27)" },
      { stage: "Neonatal", events: "ELF-priming → α2δ-1↑ → excessive excitatory synaptogenesis (VK4/VK30); GABA still excitatory → E/I↑ → Q↑ (VK6); Inflammation (melatonin↓) → IL-1β → KCC2↓ further (S9)" },
      { stage: "Developmental", events: "E/I imbalance → circuits develop abnormally; Social cognition circuits (PFC-amygdala) fail to mature; Sensory hypersensitivity (α2δ-1↑ → VK30); Epileptiform activity (Q↑ → seizures in 38%)" },
    ],

    predictionText: "Predictions E-NEW-15 (NKCC1/KCC2 ratio correlates with prenatal EMF) and E-NEW-16 (bumetanide + EMF reduction outperforms either alone) are directly testable.",
    predictionLink: "See final layer predictions →",
    predictionHref: "/predictions",
  },
  fi: {
    title: "Autismi BERM-prototyyppinä",
    subtitle: "ASD yhdistää kolme itsenäisesti verifioitua BERM-mekanismia — GABA-vaihdon viiveen, ELF-primaami-synaptogeneesin ja tulehduksen aiheuttaman KCC2-suppression — yhdeksi neurokehitykselliseksi lopputulokseksi. Geneettinen modulaatio (CACNA2D3), sukupuolidimorfismi (KCC2) ja farmakologinen validaatio (bumetanidi) kaikki konvergoivat.",
    backLink: "← Takaisin Evidenssiin",
    cautionText: "Tämä sivu ehdottaa ASD:tä BERM-mekanismien prototyyppi-ilmentymänä. Vaikka jokainen yksittäinen mekanismi on verifioitu itsenäisesti, niiden yhdistetty rooli ASD:n etiologiassa on testattava hypoteesi. BERM EI väitä EMF:n olevan ASD:n ainoa syy — geneettinen alttius, ympäristön yhteisvaikuttajat ja kehityksen ajoitus kaikki moduloivat lopputulosta.",

    mechTitle: "Kolme konvergoivaa mekanismia",
    mechLead: "ASD on ainutlaatuisessa asemassa BERM:ssä koska kolme itsenäisesti verifioitua reittiä konvergoivat samaan neurokehitykselliseen lopputulokseen: eksitaation/inhibition (E/I) epätasapainoon.",
    mechanisms: [
      { id: "M1", name: "GABA-vaihdon viive (VK6)", path: "EMF → ROS → KCC2-kypsyminen↓ → GABA pysyy eksitatorisena → E/I↑", detail: "Normaalissa kehityksessä KCC2:n ylössäätely vaihtaa GABAn eksitatorisesta inhibitoriseksi ensimmäisten postnatalisten kuukausien aikana. Ympäristöhäiriö (ROS, tulehdus) viivästyttää tätä vaihtoa → pitkittynyt eksitatorinen GABA → piirit kehittyvät poikkeavasti. ASD-potilailla on kohonnut NKCC1/KCC2-suhde = GABA yhä eksitatorinen.", color: "green" },
      { id: "M2", name: "ELF-primaami-synaptogeneesi (VK4 + VK30)", path: "ELF → α2δ-1-ekspressio↑ → LIIALLINEN eksitatorinen synaptogeneesi → E/I↑", detail: "ELF-primaami (50/60 Hz, 8-10 päivää) säätelee VGCC α2δ -alayksikön ekspressiota ylös. α2δ-1-yliekspressio ajaa liiallista eksitatorista synapsinmuodostusta. CACNA2D3 (α2δ-3) on autismin alttiusgeeni — geneettiset variantit kasvattavat herkkyyttä tälle ELF-ajatulle mekanismille.", color: "green" },
      { id: "M3", name: "Tulehdus → KCC2↓ (S9 + S10)", path: "EMF → syöttösolut → IL-1β → KCC2-kypsyminen viivästyy lisää → E/I↑↑", detail: "EMF-indusoitu syöttösolujen degranulaatio vapauttaa IL-1β:n joka suoraan viivästyttää KCC2-kypsymistä. Tämä luo takaisinkytkentäsilmukan S9: lisää tulehdusta → lisää KCC2-viivettä → GABA pysyy eksitatorisena pidempään → lisää neuronivaurioita → lisää tulehdusta. Kehittyvät aivot ovat loukussa eksitatorisessa tilassa.", color: "green" },
    ],

    spectrumTitle: "Q-tekijä-spektri",
    spectrumLead: "ASD ja epilepsia eivät ole erillisiä häiriöitä vaan saman E/I-spektrin eri ilmentymiä — Q-tekijän arvo määrää lopputuloksen.",
    spectrumPoints: [
      "ASD + epilepsia yhdessä: 38 % ASD-henkilöistä saa epilepsian",
      "Sama mekanismi (E/I↑) tuottaa eri lopputuloksia eri Q-arvoilla: kohtalainen Q → ASD-piirteet; korkea Q → kohtaukset; molemmat → ASD + epilepsia",
      "CACNA2D3-variantit moduloivat missä kohtaa spektriä yksilö on",
      "KCC2-sukupuolidimorfismi: KCC2-ekspressio eroaa sukupuolten välillä → selittää poikien 4:1 yliedustuksen ASD:ssä",
    ],

    geneticsTitle: "Geneettinen modulaatio",
    geneticsLead: "BERM ei ennusta ASD:tä kaikille — geneettinen alttius määrää kuka on haavoittuva.",
    geneticsPoints: [
      { gene: "CACNA2D3 (α2δ-3)", role: "Autismin alttiusgeeni — koodaa VGCC α2δ -alayksikön johon ELF-primaami kohdistuu. Variantit kasvattavat herkkyyttä ELF-ajamalle synaptogeneesille." },
      { gene: "CACNA1C (Cav1.2)", role: "Sousouri 2025 (ETH Zürich): CACNA1C-genotyyppi moduloi EMF-vastetta uni-EEG:ssä. Timothyn oireyhtymä (CACNA1C-gain-of-function) tuottaa ASD-piirteitä." },
      { gene: "KCC2 (SLC12A5)", role: "Sukupuolidimorfineen ekspressio. Matalampi KCC2-lähtötaso pojilla → pojat tarvitsevat vähemmän lisä-KCC2-suppressiota eksitatorisen GABA-kynnyksen saavuttamiseksi → 4:1 poikien yliedustus." },
    ],

    pharmaTitle: "Farmakologinen validaatio",
    pharmaLead: "Bumetanidi — lääke joka palauttaa inhibitorisen GABAn — parantaa ASD-oireita useissa RCT:issä. Tämä on täsmälleen se mitä BERM ennustaa.",
    pharmaPoints: [
      "Bumetanidi estää NKCC1:n → vähentää solunsisäistä kloridia → GABA muuttuu inhibitoriseksi → E/I-suhde normalisoituu",
      "Useita RCT:itä osoittavat parannusta ASD:n ydinoireissa (Lemonnier 2012, Dai 2021, Shaker 2024)",
      "Bumetanidi korjaa SAMAN häiriön (GABA-polariteetti) jonka EMF tuottaa KCC2↓:n kautta",
      "Plasman KCC2-, NKCC1- ja GABA-tasot toimivat nyt perifeerinsinä ASD-biomarkkereina (Springer 2026)",
    ],

    devTitle: "Kehityksellinen sekvenssi",
    devStages: [
      { stage: "Prenataalinen", events: "EMF → ROS → KCC2↓ → GABA-vaihto viivästyy (VK6); EMF → hypotalamuksen neuroendokriininen häiriö (VK13); EMF → epigeneettiset muutokset kehittyvissä aivoissa (VK27)" },
      { stage: "Neonataalinen", events: "ELF-primaami → α2δ-1↑ → liiallinen eksitatorinen synaptogeneesi (VK4/VK30); GABA yhä eksitatorinen → E/I↑ → Q↑ (VK6); Tulehdus (melatoniini↓) → IL-1β → KCC2↓ lisää (S9)" },
      { stage: "Kehityksellinen", events: "E/I-epätasapaino → piirit kehittyvät poikkeavasti; Sosiaalisen kognition piirit (PFC-amygdala) eivät kypsy; Sensorinen yliherkkyys (α2δ-1↑ → VK30); Epileptiforminen aktiivisuus (Q↑ → kohtaukset 38 %:lla)" },
    ],

    predictionText: "Ennusteet E-NEW-15 (NKCC1/KCC2-suhde korreloi prenataalisen EMF:n kanssa) ja E-NEW-16 (bumetanidi + EMF-vähennys yhdessä parempi kuin kumpikaan yksin) ovat suoraan testattavissa.",
    predictionLink: "Ks. viimeisten kerrosten ennusteet →",
    predictionHref: "/predictions",
  },
} as const;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const d = locale === "fi" ? COPY.fi : COPY.en;
  return { title: `${d.title} – Extinction Field`, description: d.subtitle };
}

export default async function AutismPrototypePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const activeLocale = locale === "fi" ? "fi" : "en";
  const d = COPY[activeLocale];
  const prefix = `/${locale}`;

  const mechColors: Record<string, string> = { green: "border-green-500/30 bg-green-500/5" };

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 sm:py-20">
      <p className="mb-6">
        <Link href={`${prefix}/evidence`} className="text-sm text-accent hover:underline">{d.backLink}</Link>
      </p>
      <PageHeader icon={BrainCircuit} title={d.title} subtitle={d.subtitle} />
      <div className="mt-8"><CautionBox locale={activeLocale}><p>{d.cautionText}</p></CautionBox></div>

      <section className="mt-12">
        <h2 className="text-lg font-semibold mb-2">{d.mechTitle}</h2>
        <p className="text-sm text-foreground-muted leading-relaxed mb-6 max-w-3xl">{d.mechLead}</p>
        <div className="space-y-4">
          {d.mechanisms.map((m) => (
            <div key={m.id} className={`rounded-xl border p-5 ${mechColors[m.color]}`}>
              <div className="flex items-center gap-2 mb-2">
                <span className="font-mono-num text-xs text-accent">{m.id}</span>
                <h3 className="font-semibold text-sm">{m.name}</h3>
              </div>
              <p className="text-xs font-mono text-foreground-muted mb-2">{m.path}</p>
              <p className="text-sm text-foreground-muted leading-relaxed">{m.detail}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-14 border-t editorial-rule pt-6">
        <h2 className="text-lg font-semibold mb-2">{d.spectrumTitle}</h2>
        <p className="text-sm text-foreground-muted leading-relaxed mb-4 max-w-3xl">{d.spectrumLead}</p>
        <div className="space-y-2">
          {d.spectrumPoints.map((p, i) => (
            <div key={i} className="flex gap-2 text-sm text-foreground-muted leading-relaxed">
              <span className="text-accent shrink-0">→</span><p>{p}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-14 border-t editorial-rule pt-6">
        <h2 className="text-lg font-semibold mb-2">{d.geneticsTitle}</h2>
        <p className="text-sm text-foreground-muted leading-relaxed mb-4 max-w-3xl">{d.geneticsLead}</p>
        <div className="space-y-3">
          {d.geneticsPoints.map((g, i) => (
            <div key={i} className="rounded-lg border border-blue-500/20 bg-blue-500/5 p-4">
              <p className="text-sm font-semibold mb-1 font-mono">{g.gene}</p>
              <p className="text-sm text-foreground-muted leading-relaxed">{g.role}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-14 border-t editorial-rule pt-6">
        <h2 className="text-lg font-semibold mb-2">{d.pharmaTitle}</h2>
        <p className="text-sm text-foreground-muted leading-relaxed mb-4 max-w-3xl">{d.pharmaLead}</p>
        <div className="space-y-2">
          {d.pharmaPoints.map((p, i) => (
            <div key={i} className="flex gap-2 text-sm text-foreground-muted leading-relaxed">
              <span className="text-green-500 shrink-0">✓</span><p>{p}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-14 border-t editorial-rule pt-6">
        <h2 className="text-lg font-semibold mb-2">{d.devTitle}</h2>
        <div className="space-y-3">
          {d.devStages.map((s, i) => (
            <div key={i} className="rounded-lg border border-card-border bg-card-bg p-4">
              <p className="text-sm font-semibold mb-1">{s.stage}</p>
              <p className="text-sm text-foreground-muted leading-relaxed">{s.events}</p>
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
