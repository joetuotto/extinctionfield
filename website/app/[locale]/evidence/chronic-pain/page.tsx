import type { Metadata } from "next";
import Link from "next/link";
import { Activity } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { CautionBox } from "@/components/CautionBox";
import { DerivedPrediction } from "@/components/DerivedPrediction";

const COPY = {
  en: {
    title: "Chronic Pain Epidemic: The ELF-Priming Hypothesis",
    subtitle: "ELF-priming (50/60 Hz power grid, continuous) upregulates α2δ-1 expression — the same subunit overexpressed in neuropathic pain. This creates a 'neuropathic state WITHOUT neuropathy': central sensitization, allodynia, and widespread pain from power grid exposure alone.",
    backLink: "← Back to Evidence",
    cautionText: "This page proposes ELF-priming as a mechanism for the chronic pain epidemic. The α2δ-1 overexpression → pain pathway is well-established in neuropathic pain research. The novel claim — that ELF achieves the same α2δ-1 upregulation without nerve injury — requires direct experimental testing (prediction E-NEW-14).",

    mechTitle: "The mechanism",
    mechLead: "α2δ-1 is a VGCC auxiliary subunit. Its overexpression is the primary mechanism of neuropathic pain. ELF-priming upregulates VGCC expression — including α2δ-1.",
    mechSteps: [
      { step: "1. ELF 50/60 Hz (power grid, continuous exposure)", detail: "The background 50/60 Hz electromagnetic field from the power grid is continuous and ubiquitous. Sun 2016 (Scientific Reports) showed that 8-10 days of ELF exposure dramatically increases VGCC expression — including auxiliary subunits." },
      { step: "2. α2δ-1 expression↑ in DRG and spinal dorsal horn", detail: "α2δ-1 upregulation in dorsal root ganglia and spinal cord dorsal horn neurons is THE primary mechanism of neuropathic pain. In transgenic mice, α2δ-1 overexpression alone produces pain behavior WITHOUT any nerve injury (PMID:16764990)." },
      { step: "3. Central sensitization → allodynia", detail: "Elevated α2δ-1 increases excitatory synaptogenesis and neurotransmitter release in spinal pain circuits. This produces central sensitization — the nervous system amplifies pain signals. Normally harmless stimuli (touch, pressure) become painful (allodynia)." },
      { step: "4. Chronic widespread pain WITHOUT identifiable cause", detail: "The result: fibromyalgia, chronic widespread pain, chronic back pain — conditions where patients have genuine pain but no identifiable nerve damage. The damage is functional (α2δ-1↑ → central sensitization), not structural." },
    ],

    pharmaTitle: "Pharmacological validation",
    pharmaLead: "The drugs that treat this pain target EXACTLY the mechanism ELF-priming produces.",
    pharmaPoints: [
      { drug: "Gabapentin (Neurontin)", mechanism: "Binds α2δ-1 → blocks trafficking of α2δ-1 from DRG to spinal presynaptic terminals → reverses central sensitization", note: "First-line treatment for neuropathic pain and fibromyalgia" },
      { drug: "Pregabalin (Lyrica)", mechanism: "Same α2δ-1 binding mechanism as gabapentin; higher potency and more predictable pharmacokinetics", note: "First FDA-approved drug for fibromyalgia (2007)" },
    ],
    pharmaConclusion: "Gabapentinoid prescriptions have increased dramatically over the past two decades. This increase is CONSISTENT with ELF-priming: as power grid density and continuous exposure increase, more people develop the α2δ-1-mediated pain state that gabapentinoids specifically treat.",

    epigenTitle: "Epigenetic amplification",
    epigenLead: "α2δ-1 expression is regulated by epigenetic mechanisms — creating a bridge to VK27.",
    epigenBody: "HDAC inhibitors increase α2δ-1 expression and produce pain states (PMC8514986). ELF-EMF alters HDAC activity (VK27). This creates a double mechanism: ELF directly upregulates α2δ-1 via VGCC expression AND indirectly via HDAC-mediated epigenetic regulation. The epigenetic component means the pain state can persist even after EMF exposure is reduced.",

    loopTitle: "Feedback loop S16: Pain-sleep-cortisol cycle",
    loopSteps: [
      "EMF → α2δ-1↑ → central sensitization → chronic pain",
      "Chronic pain → sleep disruption (Walker chain S4)",
      "Sleep↓ → cortisol↑ (HPA axis S7) + GABA↓",
      "Cortisol↑ → inflammation → more sensitization",
      "Chronic pain → depression (DA↓, VK19)",
      "Depression → sleep↓ → pain amplification → ...",
    ],
    loopConclusion: "The pain-sleep-cortisol cycle means that initial ELF-induced α2δ-1 upregulation creates a self-sustaining pain state. Even temporary EMF exposure can initiate a chronic condition that persists through the feedback loop.",

    predictionText: "Prediction E-NEW-14: ELF-exposed animals show α2δ-1 upregulation in DRG and spinal dorsal horn WITHOUT nerve injury, accompanied by pain-like behavior.",
    predictionLink: "See final layer predictions →",
    predictionHref: "/predictions",
  },
  fi: {
    title: "Kroonisen kivun epidemia: ELF-primaami-hypoteesi",
    subtitle: "ELF-primaami (50/60 Hz sähköverkko, jatkuva) säätelee α2δ-1-ekspressiota ylös — sama alayksikkö joka yliekspressoituu neuropaattisessa kivussa. Tämä luo 'neuropaattisen tilan ILMAN neuropatiaa': sentraalinen sensitisaatio, allodynia ja yleistynyt kipu pelkästä sähköverkkoaltistuksesta.",
    backLink: "← Takaisin Evidenssiin",
    cautionText: "Tämä sivu ehdottaa ELF-primaemia kroonisen kivun epidemian mekanismiksi. α2δ-1-yliekspressio → kipureitti on vakiintunut neuropaattisen kivun tutkimuksessa. Uusi väite — että ELF saavuttaa saman α2δ-1-ylössäätelyn ilman hermovauriota — vaatii suoraa kokeellista testausta (ennuste E-NEW-14).",

    mechTitle: "Mekanismi",
    mechLead: "α2δ-1 on VGCC:n apualayksikkö. Sen yliekspressio on neuropaattisen kivun PÄÄMEKANISMI. ELF-primaami säätelee VGCC-ekspressiota ylös — mukaan lukien α2δ-1.",
    mechSteps: [
      { step: "1. ELF 50/60 Hz (sähköverkko, jatkuva altistus)", detail: "Tausta 50/60 Hz sähkömagneettinen kenttä sähköverkosta on jatkuva ja kaikkialla läsnä. Sun 2016 (Scientific Reports) osoitti, että 8-10 päivän ELF-altistus kasvattaa dramaattisesti VGCC-ekspressiota — mukaan lukien apualayksiköt." },
      { step: "2. α2δ-1-ekspressio↑ DRG:ssä ja selkäytimen dorsaalisarvessa", detail: "α2δ-1-ylössäätely dorsaalijuuriganglioissa ja selkäytimen dorsaalisarven neuroneissa ON neuropaattisen kivun PÄÄMEKANISMI. Transgeenisillä hiirillä α2δ-1-yliekspressio yksin tuottaa kipukäyttäytymisen ILMAN hermovauriota (PMID:16764990)." },
      { step: "3. Sentraalinen sensitisaatio → allodynia", detail: "Kohonnut α2δ-1 kasvattaa eksitatorista synaptogeneesiä ja välittäjäaineiden vapautumista selkäytimen kipupiireissä. Tämä tuottaa sentraalisen sensitisaation — hermosto vahvistaa kipusignaaleja. Normaalisti harmittomat ärsykkeet (kosketus, paine) muuttuvat kivuliaiksi (allodynia)." },
      { step: "4. Krooninen yleistynyt kipu ILMAN tunnistettavaa syytä", detail: "Lopputulos: fibromyalgia, krooninen yleistynyt kipu, krooninen selkäkipu — tiloja joissa potilailla on todellista kipua mutta ei tunnistettavaa hermovauriota. Vaurio on funktionaalista (α2δ-1↑ → sentraalinen sensitisaatio), ei rakenteellista." },
    ],

    pharmaTitle: "Farmakologinen validaatio",
    pharmaLead: "Lääkkeet jotka hoitavat tätä kipua kohdistuvat TÄSMÄLLEEN siihen mekanismiin jonka ELF-primaami tuottaa.",
    pharmaPoints: [
      { drug: "Gabapentiini (Neurontin)", mechanism: "Sitoutuu α2δ-1:een → estää α2δ-1:n kuljetuksen DRG:stä selkäytimen presynaptisiin terminaaleihin → kääntää sentraalisen sensitisaation", note: "Ensisijainen hoito neuropaattiseen kipuun ja fibromyalgiaan" },
      { drug: "Pregabaliini (Lyrica)", mechanism: "Sama α2δ-1-sitoutumismekanismi kuin gabapentiinillä; suurempi teho ja ennustettavampi farmakokinetiikka", note: "Ensimmäinen FDA-hyväksytty lääke fibromyalgiaan (2007)" },
    ],
    pharmaConclusion: "Gabapentinoidien reseptit ovat kasvaneet dramaattisesti viimeisten kahden vuosikymmenen aikana. Tämä kasvu ON KONSISTENTTI ELF-primaamin kanssa: kun sähköverkon tiheys ja jatkuva altistus kasvavat, yhä useampi kehittää α2δ-1-välitteisen kiputilan johon gabapentinoidit spesifisesti kohdistuvat.",

    epigenTitle: "Epigeneettinen vahvistus",
    epigenLead: "α2δ-1-ekspressiota säätelevät epigeneettiset mekanismit — luoden sillan VK27:ään.",
    epigenBody: "HDAC-inhibiittorit kasvattavat α2δ-1-ekspressiota ja tuottavat kiputiloja (PMC8514986). ELF-EMF muuttaa HDAC-aktiivisuutta (VK27). Tämä luo kaksoismekanismin: ELF suoraan säätelee α2δ-1:tä ylös VGCC-ekspression kautta JA epäsuorasti HDAC-välitteisen epigeneettisen säätelyn kautta. Epigeneettinen komponentti tarkoittaa, että kiputila voi jatkua jopa EMF-altistuksen vähentyessä.",

    loopTitle: "Takaisinkytkentäsilmukka S16: Kipu-uni-kortisoli-kierre",
    loopSteps: [
      "EMF → α2δ-1↑ → sentraalinen sensitisaatio → krooninen kipu",
      "Krooninen kipu → unihäiriö (Walkerin ketju S4)",
      "Uni↓ → kortisoli↑ (HPA-akseli S7) + GABA↓",
      "Kortisoli↑ → tulehdus → lisää sensitisaatiota",
      "Krooninen kipu → masennus (DA↓, VK19)",
      "Masennus → uni↓ → kivun vahvistuminen → ...",
    ],
    loopConclusion: "Kipu-uni-kortisoli-kierre tarkoittaa, että alkuperäinen ELF-indusoitu α2δ-1-ylössäätely luo itseään ylläpitävän kiputilan. Väliaikainenkin EMF-altistus voi käynnistää kroonisen tilan joka jatkuu takaisinkytkentäsilmukan kautta.",

    predictionText: "Ennuste E-NEW-14: ELF-altistetuilla eläimillä on α2δ-1-ylössäätely DRG:ssä ja selkäytimen dorsaalisarvessa ILMAN hermovauriota, sekä kipukäyttäytymistä.",
    predictionLink: "Ks. viimeisten kerrosten ennusteet →",
    predictionHref: "/predictions",
  },
} as const;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const d = locale === "fi" ? COPY.fi : COPY.en;
  return { title: `${d.title} – Extinction Field`, description: d.subtitle };
}

export default async function ChronicPainPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const activeLocale = locale === "fi" ? "fi" : "en";
  const d = COPY[activeLocale];
  const prefix = `/${locale}`;

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 sm:py-20">
      <p className="mb-6">
        <Link href={`${prefix}/evidence`} className="text-sm text-accent hover:underline">{d.backLink}</Link>
      </p>
      <PageHeader icon={Activity} title={d.title} subtitle={d.subtitle} />
      <div className="mt-8"><CautionBox locale={activeLocale}><p>{d.cautionText}</p></CautionBox></div>

      <section className="mt-12">
        <h2 className="text-lg font-semibold mb-2">{d.mechTitle}</h2>
        <p className="text-sm text-foreground-muted leading-relaxed mb-6 max-w-3xl">{d.mechLead}</p>
        <div className="space-y-3">
          {d.mechSteps.map((s, i) => (
            <div key={i} className="rounded-lg border border-card-border bg-card-bg p-4">
              <p className="text-sm font-semibold mb-1">{s.step}</p>
              <p className="text-sm text-foreground-muted leading-relaxed">{s.detail}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-14 border-t editorial-rule pt-6">
        <h2 className="text-lg font-semibold mb-2">{d.pharmaTitle}</h2>
        <p className="text-sm text-foreground-muted leading-relaxed mb-4 max-w-3xl">{d.pharmaLead}</p>
        <div className="space-y-3">
          {d.pharmaPoints.map((p, i) => (
            <div key={i} className="rounded-lg border border-green-500/20 bg-green-500/5 p-4">
              <p className="text-sm font-semibold mb-1">{p.drug}</p>
              <p className="text-sm text-foreground-muted leading-relaxed mb-1">{p.mechanism}</p>
              <p className="text-xs text-foreground-muted italic">{p.note}</p>
            </div>
          ))}
        </div>
        <div className="mt-4 rounded-lg border border-accent/20 bg-accent/5 p-4">
          <p className="text-sm leading-relaxed text-foreground-muted">{d.pharmaConclusion}</p>
        </div>
      </section>

      <section className="mt-14 border-t editorial-rule pt-6">
        <h2 className="text-lg font-semibold mb-2">{d.epigenTitle}</h2>
        <p className="text-sm text-foreground-muted leading-relaxed mb-2 max-w-3xl">{d.epigenLead}</p>
        <p className="text-sm text-foreground-muted leading-relaxed max-w-3xl">{d.epigenBody}</p>
      </section>

      <section className="mt-14 border-t editorial-rule pt-6">
        <h2 className="text-lg font-semibold mb-2">{d.loopTitle}</h2>
        <div className="space-y-1.5 mb-4">
          {d.loopSteps.map((s, i) => (
            <div key={i} className="flex gap-2 text-sm text-foreground-muted leading-relaxed">
              <span className="text-accent shrink-0">→</span><p>{s}</p>
            </div>
          ))}
        </div>
        <div className="rounded-lg border border-amber-500/20 bg-amber-500/5 p-4">
          <p className="text-sm leading-relaxed text-foreground-muted">{d.loopConclusion}</p>
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
