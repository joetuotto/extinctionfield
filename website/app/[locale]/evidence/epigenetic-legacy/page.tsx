import type { Metadata } from "next";
import Link from "next/link";
import { Dna } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { CautionBox } from "@/components/CautionBox";
import { DerivedPrediction } from "@/components/DerivedPrediction";

const COPY = {
  en: {
    title: "Epigenetic Legacy: Transgenerational Inheritance",
    subtitle: "EMF alters three epigenetic mechanisms — DNA methylation, histone modification, and microRNA — which may transmit biological effects to unexposed offspring. The DDT transgenerational model provides the template; sperm methylation dose-dependence (VK27) provides the mechanism.",
    backLink: "← Back to Evidence",
    cautionText: "This page presents BERM's most speculative prediction. While EMF-induced epigenetic changes are experimentally demonstrated, and transgenerational inheritance via sperm epigenome is proven for other environmental exposures (DDT, stress), the specific claim that EMF effects persist to F3 generation has NOT been tested. This prediction (E-NEW-10) is designated as BERM's highest priority research proposal precisely because of its profound implications.",

    mechTitle: "Three epigenetic mechanisms",
    mechLead: "EMF disrupts all three known channels of epigenetic regulation. Each independently alters gene expression; together they create a comprehensive epigenetic signature.",
    mechanisms: [
      { id: "E1", name: "DNA methylation (DNMT1)", detail: "ELF-EMF alters DNMT1 expression in endometrium (ScienceDirect 2024). In sperm cells: 50 Hz ELF produces DOSE-DEPENDENT bidirectional methylation changes — global methylation decreases at 1 mT but INCREASES at 3 mT (PMC4538330). This dose-dependence makes the effect especially difficult to detect in population studies where exposure varies.", color: "amber" },
      { id: "E2", name: "Histone modification (HDAC)", detail: "ELF-EMF alters HDAC activity (VK27, ScienceDirect 2024). Histone modifications control chromatin accessibility and gene expression. HDAC changes affect α2δ-1 expression (VK30 bridge) and developmental gene regulation. Histone retention in sperm is a known transgenerational vehicle.", color: "amber" },
      { id: "E3", name: "MicroRNA biogenesis (DICER1, DGCR8)", detail: "ELF-EMF alters DICER1 and DGCR8 expression — key enzymes in microRNA processing (ScienceDirect 2024). MicroRNAs regulate post-transcriptional gene expression. Sperm-borne microRNAs are transmitted to the embryo and influence early development.", color: "amber" },
    ],

    ddtTitle: "The DDT analogy",
    ddtLead: "DDT provides the established template for transgenerational environmental inheritance.",
    ddtPoints: [
      "DDT exposure in F0 generation → sperm DNA methylation changes → obesity, testicular pathology, kidney disease in F3 (unexposed) generation",
      "Transmission vehicle: DNA methylation, piRNA, and histone retention in sperm (PMC5827984)",
      "F3 effects persist WITHOUT continued exposure — the epigenome carries the memory",
      "Other verified transgenerational exposures: stress (cortisol → sperm methylation), endocrine disruptors (BPA, phthalates), famine (Dutch Hunger Winter)",
    ],
    ddtConclusion: "EMF affects the SAME three epigenetic mechanisms through which DDT achieves transgenerational inheritance. The question is not WHETHER EMF can alter the sperm epigenome (it can — VK27), but whether those changes persist to F3.",

    doseTitle: "The dose-dependence problem",
    doseLead: "EMF epigenetic effects are bidirectional and dose-dependent — a critical complication.",
    doseBody: "At 1 mT: global methylation DECREASES. At 3 mT: global methylation INCREASES. This means population studies with mixed exposure levels may average the effect to zero, even when individual responses are significant. Future research must control for exposure intensity, not just duration. This dose-dependence may explain why EMF epigenetic effects have been difficult to detect in epidemiological studies.",

    networkTitle: "Network connections",
    networkPoints: [
      { bridge: "VK27 → VK30", detail: "HDAC modification → α2δ-1 expression regulation → chronic pain (epigenetic amplification of the pain mechanism)" },
      { bridge: "VK27 → VK6", detail: "Epigenetic changes → KCC2 maturation timing → GABA switch delay (developmental neurotoxicity pathway)" },
      { bridge: "VK27 → VK28", detail: "Methylation changes → telomerase regulation → aging acceleration (epigenetic-aging bridge)" },
      { bridge: "VK27 → VK26", detail: "Epigenetic changes → Dio2/Dio3 expression → thyroid hormone conversion (hidden hypothyroidism)" },
    ],

    implTitle: "Implications",
    implBody: "If EMF effects are transgenerational, the current generation's EMF exposure may affect grandchildren who are never themselves exposed. This transforms EMF from a personal health risk to an intergenerational environmental legacy — similar to DDT, lead, and other persistent environmental exposures that were only recognized as transgenerational after decades of accumulated evidence.",

    predictionText: "Prediction E-NEW-10 (transgenerational sperm methylation persists to F3) is BERM's highest priority research proposal. A multigenerational rodent study (18-24 months) could resolve this question definitively.",
    predictionLink: "See final layer predictions →",
    predictionHref: "/predictions",
  },
  fi: {
    title: "Epigeneettinen perintö: transgenerationaalinen periytyminen",
    subtitle: "EMF muuttaa kolmea epigeneettistä mekanismia — DNA-metylaatio, histonimodifikaatio ja mikroRNA — jotka voivat välittää biologisia vaikutuksia altistumattomille jälkeläisille. DDT:n transgenerationaalinen malli tarjoaa mallin; siittiöiden metylaation annosriippuvuus (VK27) tarjoaa mekanismin.",
    backLink: "← Takaisin Evidenssiin",
    cautionText: "Tämä sivu esittää BERM:n spekulatiivisimman ennusteen. Vaikka EMF-indusoidut epigeneettiset muutokset on osoitettu kokeellisesti ja transgenerationaalinen periytyminen siittiöiden epigenomin kautta on todistettu muille ympäristöaltistuksille (DDT, stressi), spesifinen väite että EMF-vaikutukset säilyvät F3-sukupolveen EI OLE testattu. Tämä ennuste (E-NEW-10) on nimetty BERM:n korkeimman prioriteetin tutkimusehdotukseksi juuri sen syvällisten implikaatioiden vuoksi.",

    mechTitle: "Kolme epigeneettistä mekanismia",
    mechLead: "EMF häiritsee kaikkia kolmea tunnettua epigeneettisen säätelyn kanavaa. Jokainen muuttaa itsenäisesti geeniekspressiota; yhdessä ne luovat kattavan epigeneettisen allekirjoituksen.",
    mechanisms: [
      { id: "E1", name: "DNA-metylaatio (DNMT1)", detail: "ELF-EMF muuttaa DNMT1-ekspressiota kohdun limakalvossa (ScienceDirect 2024). Siittiösoluissa: 50 Hz ELF tuottaa ANNOSRIIPPUVAISIA kaksisuuntaisia metylaatiomuutoksia — globaali metylaatio vähenee 1 mT:ssä mutta KASVAA 3 mT:ssä (PMC4538330). Tämä annosriippuvuus tekee vaikutuksesta erityisen vaikean havaita väestötutkimuksissa joissa altistus vaihtelee.", color: "amber" },
      { id: "E2", name: "Histonimodifikaatio (HDAC)", detail: "ELF-EMF muuttaa HDAC-aktiivisuutta (VK27, ScienceDirect 2024). Histonimodifikaatiot säätelevät kromatiinin saavutettavuutta ja geeniekspressiota. HDAC-muutokset vaikuttavat α2δ-1-ekspressioon (VK30-silta) ja kehityksellisten geenien säätelyyn. Histonien retentio siittiöissä on tunnettu transgenerationaalinen välittäjä.", color: "amber" },
      { id: "E3", name: "MikroRNA-biogeneesi (DICER1, DGCR8)", detail: "ELF-EMF muuttaa DICER1- ja DGCR8-ekspressiota — avainentsyymejä mikroRNA:n prosessoinnissa (ScienceDirect 2024). MikroRNA:t säätelevät post-transkriptionaalista geeniekspressiota. Siittiöiden kantamat mikroRNA:t välittyvät alkioon ja vaikuttavat varhaiseen kehitykseen.", color: "amber" },
    ],

    ddtTitle: "DDT-analogia",
    ddtLead: "DDT tarjoaa vakiintuneen mallin transgenerationaaliselle ympäristöperiytymiselle.",
    ddtPoints: [
      "DDT-altistus F0-sukupolvessa → siittiöiden DNA-metylaatiomuutokset → lihavuus, kivespatologia, munuaissairaus F3-sukupolvessa (altistumaton)",
      "Välityskanava: DNA-metylaatio, piRNA ja histonien retentio siittiöissä (PMC5827984)",
      "F3-vaikutukset säilyvät ILMAN jatkuvaa altistusta — epigenomi kantaa muistin",
      "Muita verifioituja transgenerationaalisia altistuksia: stressi (kortisoli → siittiöiden metylaatio), hormonihäiritsijät (BPA, ftalaatit), nälänhätä (Alankomaiden nälkätalvi)",
    ],
    ddtConclusion: "EMF vaikuttaa SAMOIHIN kolmeen epigeneettiseen mekanismiin joiden kautta DDT saavuttaa transgenerationaalisen periytymisen. Kysymys ei ole VOIKO EMF muuttaa siittiöiden epigenomia (voi — VK27), vaan säilyvätkö nuo muutokset F3:een asti.",

    doseTitle: "Annosriippuvuusongelma",
    doseLead: "EMF:n epigeneettiset vaikutukset ovat kaksisuuntaisia ja annosriippuvaisia — kriittinen komplikaatio.",
    doseBody: "1 mT:ssä: globaali metylaatio VÄHENEE. 3 mT:ssä: globaali metylaatio KASVAA. Tämä tarkoittaa, että väestötutkimukset joissa altistustasot vaihtelevat voivat keskiarvoistaa vaikutuksen nollaan, vaikka yksittäiset vasteet ovat merkittäviä. Tulevien tutkimusten on kontrolloitava altistuksen voimakkuutta, ei pelkästään kestoa. Tämä annosriippuvuus voi selittää miksi EMF:n epigeneettisiä vaikutuksia on ollut vaikea havaita epidemiologisissa tutkimuksissa.",

    networkTitle: "Verkostoyhteydet",
    networkPoints: [
      { bridge: "VK27 → VK30", detail: "HDAC-modifikaatio → α2δ-1-ekspression säätely → krooninen kipu (kipumekanismin epigeneettinen vahvistus)" },
      { bridge: "VK27 → VK6", detail: "Epigeneettiset muutokset → KCC2-kypsymisen ajoitus → GABA-vaihdon viive (kehityksellinen neurotoksisuusreitti)" },
      { bridge: "VK27 → VK28", detail: "Metylaatiomuutokset → telomeraasin säätely → ikääntymisen kiihtyminen (epigeneettinen-ikääntymissilta)" },
      { bridge: "VK27 → VK26", detail: "Epigeneettiset muutokset → Dio2/Dio3-ekspressio → kilpirauhashormonin muuntaminen (piilevä hypotyreoosi)" },
    ],

    implTitle: "Implikaatiot",
    implBody: "Jos EMF-vaikutukset ovat transgenerationaalisia, nykyisen sukupolven EMF-altistus voi vaikuttaa lastenlapsiin jotka eivät itse koskaan altistu. Tämä muuttaa EMF:n henkilökohtaisesta terveysriskistä sukupolvien väliseksi ympäristöperinnöksi — samankaltaiseksi kuin DDT, lyijy ja muut pysyvät ympäristöaltistukset jotka tunnistettiin transgenerationaalisiksi vasta vuosikymmenten kertyneen evidenssin jälkeen.",

    predictionText: "Ennuste E-NEW-10 (transgenerationaalinen siittiöiden metylaatio säilyy F3:een) on BERM:n korkeimman prioriteetin tutkimusehdotus. Monisukupolvinen jyrsijätutkimus (18-24 kuukautta) voisi ratkaista tämän kysymyksen lopullisesti.",
    predictionLink: "Ks. viimeisten kerrosten ennusteet →",
    predictionHref: "/predictions",
  },
} as const;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const d = locale === "fi" ? COPY.fi : COPY.en;
  return { title: `${d.title} – Extinction Field`, description: d.subtitle };
}

export default async function EpigeneticLegacyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const activeLocale = locale === "fi" ? "fi" : "en";
  const d = COPY[activeLocale];
  const prefix = `/${locale}`;

  const mechColors: Record<string, string> = { amber: "border-amber-500/30 bg-amber-500/5" };

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 sm:py-20">
      <p className="mb-6">
        <Link href={`${prefix}/evidence`} className="text-sm text-accent hover:underline">{d.backLink}</Link>
      </p>
      <PageHeader icon={Dna} title={d.title} subtitle={d.subtitle} />
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
              <p className="text-sm text-foreground-muted leading-relaxed">{m.detail}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-14 border-t editorial-rule pt-6">
        <h2 className="text-lg font-semibold mb-2">{d.ddtTitle}</h2>
        <p className="text-sm text-foreground-muted leading-relaxed mb-4 max-w-3xl">{d.ddtLead}</p>
        <div className="space-y-2 mb-4">
          {d.ddtPoints.map((p, i) => (
            <div key={i} className="flex gap-2 text-sm text-foreground-muted leading-relaxed">
              <span className="text-accent shrink-0">→</span><p>{p}</p>
            </div>
          ))}
        </div>
        <div className="rounded-lg border border-accent/20 bg-accent/5 p-4">
          <p className="text-sm leading-relaxed text-foreground-muted">{d.ddtConclusion}</p>
        </div>
      </section>

      <section className="mt-14 border-t editorial-rule pt-6">
        <h2 className="text-lg font-semibold mb-2">{d.doseTitle}</h2>
        <p className="text-sm text-foreground-muted leading-relaxed mb-2 max-w-3xl">{d.doseLead}</p>
        <p className="text-sm text-foreground-muted leading-relaxed max-w-3xl">{d.doseBody}</p>
      </section>

      <section className="mt-14 border-t editorial-rule pt-6">
        <h2 className="text-lg font-semibold mb-2">{d.networkTitle}</h2>
        <div className="space-y-3">
          {d.networkPoints.map((n, i) => (
            <div key={i} className="rounded-lg border border-card-border bg-card-bg p-4">
              <p className="text-sm font-semibold font-mono mb-1">{n.bridge}</p>
              <p className="text-sm text-foreground-muted leading-relaxed">{n.detail}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-14 border-t editorial-rule pt-6">
        <h2 className="text-lg font-semibold mb-2">{d.implTitle}</h2>
        <p className="text-sm text-foreground-muted leading-relaxed max-w-3xl">{d.implBody}</p>
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
