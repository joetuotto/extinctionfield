import type { Metadata } from "next";
import Link from "next/link";
import { BrainCircuit } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { CautionBox } from "@/components/CautionBox";
import { DerivedPrediction } from "@/components/DerivedPrediction";

const COPY = {
  en: {
    title: "Four Neurodegenerations: One Mechanism",
    subtitle:
      "Alzheimer's, multiple sclerosis, Parkinson's, and ALS each attack a different cell type through Ca²⁺-dependent mechanisms. Each has pharmacological validation through Ca²⁺-targeting drugs. Same cascade, four manifestations.",
    backLink: "← Back to Evidence",
    cautionText:
      "This page presents the Ca²⁺ connection across four neurodegenerative diseases. Each disease's Ca²⁺ mechanism is independently established. The unifying EMF connection remains a BERM hypothesis.",

    diseasesTitle: "The four diseases",
    diseases: [
      {
        name: "Alzheimer’s disease",
        cellType: "Hippocampus / cortex",
        caMechanism:
          "PGC + cortisol↑ + melatonin↓. Intracellular Ca²⁺ dysregulation is an EARLY event preceding amyloid accumulation. Ca²⁺ directs Aβ into toxic oligomers rather than harmless fibrils.",
        bermLayers: "VK14 (cortisol→hippocampus), VK3 (PGC→melatonin), S6",
        protectiveDrug:
          "Semaglutide (GLP-1R→Ca²⁺), melatonin",
      },
      {
        name: "Multiple sclerosis",
        cellType: "OPC / myelin",
        caMechanism:
          "Cav1.2 → OPC differentiation → myelination. L-type VGCC activity is required for oligodendrocyte precursor cells to differentiate and form myelin sheaths. Disrupted Cav1.2 timing → myelination failure.",
        bermLayers: "VK20",
        protectiveDrug:
          "— (but EMF-induced Cav1.2 dysregulation → myelination timing disruption)",
      },
      {
        name: "Parkinson’s disease",
        cellType: "SNpc DA neurons",
        caMechanism:
          "Cav1.3 → pacemaker activity. Cav1.3 drives autonomous pacemaking in substantia nigra pars compacta dopaminergic neurons. Ca²⁺ overload → mitochondrial stress → selective neuronal death.",
        bermLayers: "Cav1.3 drives autonomous pacemaking in SNpc neurons; Ca²⁺ overload → mitochondrial stress → death",
        protectiveDrug:
          "Isradipine (Cav1.3 blocker, neuroprotective in animal models)",
      },
      {
        name: "ALS",
        cellType: "Motor neurons",
        caMechanism:
          "Low Ca²⁺ buffering + Ca²⁺-permeable AMPA receptors. Motor neurons have unusually low calcium-buffering capacity, making them selectively vulnerable to Ca²⁺-permeable AMPA receptor activation.",
        bermLayers: "VK45",
        protectiveDrug:
          "Riluzole (indirect — Na⁺ block → glutamate↓ → Ca²⁺↓)",
        occupational: "Electrical workers OR 1.3–1.7",
      },
    ],

    commonTitle: "Common thread",
    commonPoints: [
      "All four diseases involve Ca²⁺ overload in specific cell types",
      "Each cell type has unique vulnerability: hippocampal neurons to cortisol-driven Ca²⁺, OPCs to Cav1.2 timing, SNpc neurons to Cav1.3 pacemaker load, motor neurons to AMPA-mediated Ca²⁺",
      "Pharmacological validation: drugs targeting the Ca²⁺ mechanism show benefit in each disease",
      "EMF provides a common environmental driver through the VGCC pathway",
    ],

    tableTitle: "Different cell types, same mechanism",
    tableHeaders: {
      disease: "Disease",
      cellType: "Cell Type",
      caMechanism: "Ca²⁺ Mechanism",
      protectiveDrug: "Protective Drug",
    },
    tableRows: [
      {
        disease: "Alzheimer’s",
        cellType: "Hippocampus / cortex",
        caMechanism: "PGC + cortisol↑ + melatonin↓",
        protectiveDrug: "Semaglutide, melatonin",
      },
      {
        disease: "Multiple sclerosis",
        cellType: "OPC / myelin",
        caMechanism: "Cav1.2 → OPC differentiation",
        protectiveDrug: "—",
      },
      {
        disease: "Parkinson’s",
        cellType: "SNpc DA neurons",
        caMechanism: "Cav1.3 pacemaker overload",
        protectiveDrug: "Isradipine",
      },
      {
        disease: "ALS",
        cellType: "Motor neurons",
        caMechanism: "Low buffering + Ca²⁺-permeable AMPA",
        protectiveDrug: "Riluzole (indirect)",
      },
    ],

    predictionText:
      "Prediction E-NEW-25: ALS incidence is elevated in occupations with high EMF exposure. Electrical workers show OR 1.3–1.7 for ALS across multiple epidemiological studies.",
    predictionLink: "See predictions →",
    predictionHref: "/predictions",
  },
  fi: {
    title: "Neljä neurodegeneraatiota: Yksi mekanismi",
    subtitle:
      "Alzheimerin tauti, MS-tauti, Parkinsonin tauti ja ALS hyökkäävät kukin eri solutyyppiin Ca²⁺-riippuvaisten mekanismien kautta. Jokaisella on farmakologinen validaatio Ca²⁺-kohdentavien lääkkeiden kautta. Sama kaskadi, neljä ilmenemismuotoa.",
    backLink: "← Takaisin Evidenssiin",
    cautionText:
      "Tämä sivu esittää Ca²⁺-yhteyden neljän neurodegeneratiivisen sairauden välillä. Kunkin sairauden Ca²⁺-mekanismi on itsenäisesti vahvistettu. Yhdistävä EMF-yhteys on edelleen BERM-hypoteesi.",

    diseasesTitle: "Neljä sairautta",
    diseases: [
      {
        name: "Alzheimerin tauti",
        cellType: "Hippokampus / aivokuori",
        caMechanism:
          "PGC + kortisoli↑ + melatoniini↓. Solunsälöinen Ca²⁺-dysregulaatio on VARHAINEN tapahtuma joka edeltää amyloidin kertymistä. Ca²⁺ ohjaa Aβ:n toksisiksi oligomeereiksi harmittomien fibrillien sijaan.",
        bermLayers: "VK14 (kortisoli→hippokampus), VK3 (PGC→melatoniini), S6",
        protectiveDrug:
          "Semaglutiidi (GLP-1R→Ca²⁺), melatoniini",
      },
      {
        name: "MS-tauti",
        cellType: "OPC / myeliini",
        caMechanism:
          "Cav1.2 → OPC-erilaistuminen → myelinaatio. L-tyypin VGCC-aktiivisuus vaaditaan oligodendrosyyttien esiaste solujen erilaistumiseen ja myeliinituppien muodostamiseen. Häiriintynyt Cav1.2-ajoitus → myelinaation epäonnistuminen.",
        bermLayers: "VK20",
        protectiveDrug:
          "— (mutta EMF-indusoitu Cav1.2-dysregulaatio → myelinaation ajoitushäiriö)",
      },
      {
        name: "Parkinsonin tauti",
        cellType: "SNpc DA-neuronit",
        caMechanism:
          "Cav1.3 → tahdistinaktiivisuus. Cav1.3 ohjaa autonomista tahdistusta substantia nigra pars compactan dopaminergisissä neuroneissa. Ca²⁺-ylikuorma → mitokondriaalinen stressi → valikoiva neuronaalinen kuolema.",
        bermLayers: "Cav1.3 ohjaa autonomista tahdistusta SNpc-neuroneissa; Ca²⁺-ylikuorma → mitokondriaalinen stressi → kuolema",
        protectiveDrug:
          "Isradipiini (Cav1.3-salpaaja, neuroprotektiivinen eläinmalleissa)",
      },
      {
        name: "ALS",
        cellType: "Motoneuronit",
        caMechanism:
          "Matala Ca²⁺-puskurointikyky + Ca²⁺-läpäisevät AMPA-reseptorit. Motoneuroneilla on poikkeuksellisen matala kalsiumin puskurointikyky, mikä tekee niistä valikoivasti haavoittuvia Ca²⁺-läpäisevän AMPA-reseptorin aktivaatiolle.",
        bermLayers: "VK45",
        protectiveDrug:
          "Rilutsoli (epäsuora — Na⁺-esto → glutamaatti↓ → Ca²⁺↓)",
        occupational: "Sähkötyöntekijät OR 1,3–1,7",
      },
    ],

    commonTitle: "Yhteinen lanka",
    commonPoints: [
      "Kaikki neljä sairautta sisältävät Ca²⁺-ylikuorman spesifisissä solutyypeissä",
      "Jokaisella solutyypillä on ainutlaatuinen haavoittuvuus: hippokampuksen neuronit kortisolivälitteiselle Ca²⁺:lle, OPC:t Cav1.2-ajoitukselle, SNpc-neuronit Cav1.3-tahdistinkuormalle, motoneuronit AMPA-välitteiselle Ca²⁺:lle",
      "Farmakologinen validaatio: Ca²⁺-mekanismiin kohdistuvat lääkkeet osoittavat hyötyä kussakin sairaudessa",
      "EMF tarjoaa yhteisen ympäristötekijän VGCC-reitin kautta",
    ],

    tableTitle: "Eri solutyypit, sama mekanismi",
    tableHeaders: {
      disease: "Sairaus",
      cellType: "Solutyyppi",
      caMechanism: "Ca²⁺-mekanismi",
      protectiveDrug: "Suojaava lääke",
    },
    tableRows: [
      {
        disease: "Alzheimer",
        cellType: "Hippokampus / aivokuori",
        caMechanism: "PGC + kortisoli↑ + melatoniini↓",
        protectiveDrug: "Semaglutiidi, melatoniini",
      },
      {
        disease: "MS-tauti",
        cellType: "OPC / myeliini",
        caMechanism: "Cav1.2 → OPC-erilaistuminen",
        protectiveDrug: "—",
      },
      {
        disease: "Parkinson",
        cellType: "SNpc DA-neuronit",
        caMechanism: "Cav1.3-tahdistinkuorma",
        protectiveDrug: "Isradipiini",
      },
      {
        disease: "ALS",
        cellType: "Motoneuronit",
        caMechanism: "Matala puskurointi + Ca²⁺-läpäisevä AMPA",
        protectiveDrug: "Rilutsoli (epäsuora)",
      },
    ],

    predictionText:
      "Ennuste E-NEW-25: ALS-ilmaantuvuus on kohonnut ammateissa joissa EMF-altistus on korkea. Sähkötyöntekijöillä OR 1,3–1,7 ALS:lle useissa epidemiologisissa tutkimuksissa.",
    predictionLink: "Ks. ennusteet →",
    predictionHref: "/predictions",
  },
} as const;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const d = locale === "fi" ? COPY.fi : COPY.en;
  return { title: `${d.title} – Extinction Field`, description: d.subtitle };
}

export default async function FourNeurodegenerationsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const activeLocale = locale === "fi" ? "fi" : "en";
  const d = COPY[activeLocale];
  const prefix = `/${locale}`;

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 sm:py-20">
      <p className="mb-6">
        <Link href={`${prefix}/evidence`} className="text-sm text-accent hover:underline">{d.backLink}</Link>
      </p>
      <PageHeader icon={BrainCircuit} title={d.title} subtitle={d.subtitle} />
      <div className="mt-8"><CautionBox locale={activeLocale}><p>{d.cautionText}</p></CautionBox></div>

      {/* Section 1: The four diseases */}
      <section className="mt-12">
        <h2 className="text-lg font-semibold mb-4">{d.diseasesTitle}</h2>
        <div className="space-y-4">
          {d.diseases.map((disease, i) => (
            <div key={i} className="rounded-lg border border-green-500/20 bg-card-bg p-5">
              <h3 className="text-base font-semibold mb-3">{disease.name}</h3>
              <div className="space-y-2 text-sm text-foreground-muted leading-relaxed">
                <p>
                  <span className="font-medium text-foreground">{activeLocale === "fi" ? "Solutyyppi" : "Cell type"}:</span>{" "}
                  {disease.cellType}
                </p>
                <p>
                  <span className="font-medium text-foreground">Ca{"²⁺"} {activeLocale === "fi" ? "mekanismi" : "mechanism"}:</span>{" "}
                  {disease.caMechanism}
                </p>
                <p>
                  <span className="font-medium text-foreground">{activeLocale === "fi" ? "BERM-yhteys" : "BERM connection"}:</span>{" "}
                  {disease.bermLayers}
                </p>
                <p>
                  <span className="font-medium text-foreground">{activeLocale === "fi" ? "Suojaava lääke" : "Protective drug"}:</span>{" "}
                  {disease.protectiveDrug}
                </p>
                {"occupational" in disease && (
                  <p>
                    <span className="font-medium text-foreground">{activeLocale === "fi" ? "Ammattidata" : "Occupational data"}:</span>{" "}
                    {disease.occupational}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Section 2: Common thread */}
      <section className="mt-14 border-t editorial-rule pt-6">
        <h2 className="text-lg font-semibold mb-4">{d.commonTitle}</h2>
        <div className="space-y-2 mb-4">
          {d.commonPoints.map((point, i) => (
            <div key={i} className="flex gap-2 text-sm text-foreground-muted leading-relaxed">
              <span className="text-accent shrink-0">{"→"}</span><p>{point}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Section 3: Summary table */}
      <section className="mt-14 border-t editorial-rule pt-6">
        <h2 className="text-lg font-semibold mb-4">{d.tableTitle}</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-card-border text-left text-xs text-foreground-muted uppercase tracking-wider">
                <th className="py-2 pr-3">{d.tableHeaders.disease}</th>
                <th className="py-2 pr-3">{d.tableHeaders.cellType}</th>
                <th className="py-2 pr-3">{d.tableHeaders.caMechanism}</th>
                <th className="py-2">{d.tableHeaders.protectiveDrug}</th>
              </tr>
            </thead>
            <tbody>
              {d.tableRows.map((row, i) => (
                <tr key={i} className="border-b border-card-border/40">
                  <td className="py-2 pr-3 font-medium text-foreground">{row.disease}</td>
                  <td className="py-2 pr-3 text-foreground-muted">{row.cellType}</td>
                  <td className="py-2 pr-3 text-foreground-muted">{row.caMechanism}</td>
                  <td className="py-2 text-foreground-muted">{row.protectiveDrug}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* DerivedPrediction */}
      <section className="mt-14 border-t editorial-rule pt-6">
        <DerivedPrediction>
          <p className="text-sm leading-relaxed mb-3">{d.predictionText}</p>
          <Link href={`${prefix}${d.predictionHref}`} className="text-sm text-accent hover:underline">{d.predictionLink}</Link>
        </DerivedPrediction>
      </section>
    </div>
  );
}
