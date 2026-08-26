import type { Metadata } from "next";
import Link from "next/link";
import { Dna } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { CautionBox } from "@/components/CautionBox";

interface CrossMapRow {
  timothy: string;
  bermVK: string;
  mechanism: string;
  match: boolean;
}

const COPY = {
  en: {
    title: "Timothy Syndrome: Nature's CACNA1C Experiment",
    subtitle:
      "Timothy syndrome is caused by a single gain-of-function mutation in CACNA1C (Cav1.2) — the same L-type calcium channel BERM identifies as the primary EMF transduction node. Timothy patients develop nearly every BERM-predicted pathology. If one mutant channel produces the full disease spectrum, chronic environmental activation of the same channel should produce a milder, population-level version.",
    backLink: "← Back to Evidence",
    cautionText:
      "This page presents Timothy syndrome as a natural experiment that tests BERM's central mechanism. Timothy syndrome is a rare, severe genetic disorder (prevalence <1:500,000). The comparison to chronic EMF exposure is mechanistic — not a claim of equivalent severity. Timothy patients experience dramatically more severe pathology because their channels are constitutively activated, while EMF-induced activation is intermittent and partial.",

    crossMapTitle: "Timothy–BERM cross-map",
    crossMapLead:
      "Every major Timothy syndrome phenotype maps onto a specific BERM intermediate layer (VK). This is the strongest possible pharmacogenomic validation: a single gene (CACNA1C) producing the complete BERM disease spectrum.",
    crossMapHeaders: { timothy: "Timothy phenotype", bermVK: "BERM layer", mechanism: "Shared Ca²⁺ mechanism", },
    crossMapRows: [
      { timothy: "Long QT syndrome / arrhythmia", bermVK: "VK — Cardiac", mechanism: "Cav1.2 prolonged opening → delayed repolarization → ventricular arrhythmia. Same channel, same mechanism as EMF-induced QT prolongation.", match: true },
      { timothy: "Syndactyly (fused fingers/toes)", bermVK: "VK — Developmental", mechanism: "Ca²⁺-dependent apoptosis failure during limb development. Ca²⁺ overload prevents programmed cell death at digit boundaries.", match: true },
      { timothy: "Autism spectrum disorder", bermVK: "VK31 (ASD prototype)", mechanism: "CACNA1C GoF → cortical E/I imbalance → social/communication deficits. Bhatt 2012: GLP-1R→Cav1.2→ERK pathway in neurons.", match: true },
      { timothy: "Intellectual disability", bermVK: "VK — BDNF/cognitive", mechanism: "Chronic Ca²⁺ overload → CaMKII dysregulation → impaired synaptic plasticity and BDNF signaling.", match: true },
      { timothy: "Seizures / epilepsy", bermVK: "VK — Q-factor spectrum", mechanism: "Cav1.2 GoF lowers seizure threshold by reducing γ (GABAergic damping). Same Q-factor mechanism as absence/generalized epilepsy.", match: true },
      { timothy: "Immune deficiency", bermVK: "VK — NK cells", mechanism: "T-cell and NK-cell activation requires precise Ca²⁺ signaling (CRAC/Orai1 + Cav1.2). Constitutive activation desensitizes immune response.", match: true },
      { timothy: "Hypoglycemia", bermVK: "VK12 (β-cell)", mechanism: "Cav1.2 GoF → excessive insulin secretion from β-cells → hypoglycemia. Mirror image of EMF→Ca²⁺→β-cell exhaustion over decades.", match: true },
      { timothy: "Facial dysmorphism", bermVK: "VK — Craniofacial", mechanism: "Neural crest cell migration and differentiation are Ca²⁺-dependent. Altered Ca²⁺ dynamics during embryogenesis → structural anomalies.", match: true },
      { timothy: "Temperature dysregulation", bermVK: "VK — Hypothalamic", mechanism: "Hypothalamic thermoregulation depends on Ca²⁺-sensitive neurons (TRPV + Cav1.2). GoF → set-point instability.", match: true },
      { timothy: "Dental enamel defects", bermVK: "VK — Ameloblasts", mechanism: "Enamel formation requires precise Ca²⁺ transport by ameloblasts. Cav1.2 GoF disrupts the Ca²⁺ gradient during amelogenesis.", match: true },
    ] satisfies CrossMapRow[],

    subTimothyTitle: "The 'Sub-Timothy' hypothesis",
    subTimothyLead:
      "Timothy syndrome represents the extreme end of a spectrum. BERM proposes that chronic ambient EMF produces a population-level 'sub-Timothy' state — the same Cav1.2 channel, activated at much lower intensity but for decades rather than constitutively.",
    subTimothyComparison: [
      { dimension: "CACNA1C activation", timothy: "Constitutive (mutation)", berm: "Intermittent (EMF-induced)" },
      { dimension: "Severity", timothy: "Severe (median survival ~2.5 years)", berm: "Subclinical to mild (population-level shift)" },
      { dimension: "Onset", timothy: "Prenatal / neonatal", berm: "Cumulative over years–decades" },
      { dimension: "Cardiac", timothy: "Long QT, arrhythmia, sudden death", berm: "QT prolongation trend, AF incidence rising" },
      { dimension: "Neurological", timothy: "ASD, seizures, ID (100%)", berm: "ASD prevalence 1→36 (1975→2020)" },
      { dimension: "Metabolic", timothy: "Hypoglycemia (β-cell hyperactivation)", berm: "T2D epidemic (β-cell exhaustion after decades)" },
      { dimension: "Immune", timothy: "Recurrent infections (immune desensitization)", berm: "Allergic disease epidemic (immune dysregulation)" },
    ],
    subTimothyHeaders: { dimension: "Dimension", timothy: "Timothy (CACNA1C GoF)", berm: "Sub-Timothy (EMF → Cav1.2)" },

    gwasTitle: "CACNA1C GWAS: the most pleiotropic gene in psychiatry",
    gwasLead:
      "Genome-wide association studies have independently identified CACNA1C as a risk gene for bipolar disorder, schizophrenia, major depression, ASD, and ADHD. It is the single most replicated psychiatric risk gene across disorders — exactly as BERM predicts for the primary EMF transduction channel.",
    gwasPoints: [
      "Ferreira et al. 2008 (Nature Genetics): CACNA1C rs1006737 associated with bipolar disorder (p = 7.0×10⁻⁸)",
      "Green et al. 2010 (Am J Psychiatry): same SNP associated with schizophrenia and altered amygdala function",
      "Cross-Disorder Group 2013 (Lancet): CACNA1C identified as shared risk factor across all five major psychiatric disorders",
      "Yoshimizu et al. 2015: Timothy syndrome mutation in iPSC-derived neurons shows excessive Ca²⁺ and dendrite retraction",
    ],

    predictionsTitle: "Predictions from the Timothy comparison",
    predictions: [
      "CACNA1C common variants (rs1006737 risk allele carriers) should show enhanced sensitivity to ambient EMF — they start closer to the Timothy threshold",
      "Timothy-spectrum symptoms (cardiac, neurological, metabolic) should be more prevalent in high-EMF environments, dose-dependently",
      "Cav1.2-selective CCBs should provide partial protection against EMF-associated pathology in CACNA1C risk allele carriers",
      "iPSC-derived neurons from CACNA1C risk allele carriers should show greater Ca²⁺ influx response to EMF exposure than non-carriers",
    ],
    refsTitle: "Key references",
    refs: [
      "Splawski et al. 2004 (Cell, PMC1149428): Original Timothy syndrome description — CACNA1C G406R mutation",
      "Splawski et al. 2005 (PNAS, PMC1283446): Timothy syndrome type 2 — alternative CACNA1C mutation, broader phenotype",
      "Barrett & Bhatt 2012 (PMC2999985): Comprehensive review of CACNA1C GoF consequences",
      "Bader et al. 2011 (PMC3760222): CACNA1C in psychiatric GWAS — the convergence argument",
      "Cross-Disorder Group 2013 (Lancet): CACNA1C as trans-diagnostic psychiatric risk gene",
    ],
  },
  fi: {
    title: "Timothyn syndrooma: Luonnon CACNA1C-kokeilu",
    subtitle:
      "Timothyn syndrooma aiheutuu yhdestä gain-of-function-mutaatiosta CACNA1C:ssä (Cav1.2) — samassa L-tyypin kalsiumkanavassa, jonka BERM tunnistaa EMF:n primaariseksi transduuktiopisteeksi. Timothy-potilaille kehittyy lähes jokainen BERM:n ennustama patologia. Jos yksi mutatoitunut kanava tuottaa täyden sairasspektrin, saman kanavan kroonisen ympäristöaktivaation pitäisi tuottaa lievempi, väestötason versio.",
    backLink: "← Takaisin evidenssiin",
    cautionText:
      "Tämä sivu esittää Timothyn syndrooman luonnollisena kokeena, joka testaa BERM:n keskeistä mekanismia. Timothyn syndrooma on harvinainen, vakava geneettinen häiriö (prevalenssi <1:500 000). Vertailu krooniseen EMF-altistukseen on mekanistinen — ei väite samasta vakavuudesta.",

    crossMapTitle: "Timothy–BERM-ristikartta",
    crossMapLead:
      "Jokainen merkittävä Timothyn syndrooman fenotyyppi kartoittuu tiettyyn BERM-välikerrokseen (VK). Tämä on vahvin mahdollinen farmakogenominen validaatio: yksi geeni (CACNA1C) tuottaa täydellisen BERM-sairausspektrin.",
    crossMapHeaders: { timothy: "Timothy-fenotyyppi", bermVK: "BERM-kerros", mechanism: "Jaettu Ca²⁺-mekanismi" },
    crossMapRows: [
      { timothy: "Pitkä QT / rytmihäiriö", bermVK: "VK — Sydän", mechanism: "Cav1.2-kanavan pitkittynyt avautuminen → viivästynyt repolarisaatio → kammioperäinen rytmihäiriö. Sama kanava, sama mekanismi kuin EMF-indusoitu QT-pidennys.", match: true },
      { timothy: "Syndaktylia (yhteenkasvaneet sormet/varpaat)", bermVK: "VK — Kehitys", mechanism: "Ca²⁺-riippuvainen apoptoosin epäonnistuminen raajan kehityksen aikana. Ca²⁺-ylikuormitus estää ohjelmoidun solukuoleman sormien rajoilla.", match: true },
      { timothy: "Autismikirjon häiriö", bermVK: "VK31 (ASD-prototyyppi)", mechanism: "CACNA1C GoF → kortikaalinen E/I-epätasapaino → sosiaaliset/kommunikaatiovaikeudet.", match: true },
      { timothy: "Älyllinen kehitysvamma", bermVK: "VK — BDNF/kognitio", mechanism: "Krooninen Ca²⁺-ylikuormitus → CaMKII-säätelyn häiriö → heikentynyt synaptinen plastisuus ja BDNF-signalointi.", match: true },
      { timothy: "Kohtaukset / epilepsia", bermVK: "VK — Q-tekijäspektri", mechanism: "Cav1.2 GoF alentaa kohtauskynnystä vähentämällä γ:tä (GABAergista vaimennusta). Sama Q-tekijämekanismi.", match: true },
      { timothy: "Immuunipuutos", bermVK: "VK — NK-solut", mechanism: "T-solu- ja NK-soluaktivaatio vaatii tarkan Ca²⁺-signaloinnin (CRAC/Orai1 + Cav1.2). Konstitutiiviinen aktivaatio desensitisoi immuunivastetta.", match: true },
      { timothy: "Hypoglykemia", bermVK: "VK12 (β-solu)", mechanism: "Cav1.2 GoF → liiallinen insuliinieritys β-soluista → hypoglykemia. Peilikuva EMF→Ca²⁺→β-solujen uupumisesta vuosikymmenien kuluessa.", match: true },
      { timothy: "Kasvonmuotoanomalia", bermVK: "VK — Kraniofasiaalinen", mechanism: "Hermoharjasolujen migraatio ja erilaistuminen ovat Ca²⁺-riippuvaisia. Muuttunut Ca²⁺-dynamiikka embryogeneesin aikana → rakenteellisia anomalioita.", match: true },
      { timothy: "Lämpötilan säätelyhäiriö", bermVK: "VK — Hypotalamus", mechanism: "Hypotalamuksen lämpötilansäätely riippuu Ca²⁺-herkistä neuroneista (TRPV + Cav1.2). GoF → asetuspisteen epävakaus.", match: true },
      { timothy: "Hammaskilleviat", bermVK: "VK — Ameloblastit", mechanism: "Kiilteen muodostus vaatii tarkan Ca²⁺-kuljetuksen ameloblasteissa. Cav1.2 GoF häiritsee Ca²⁺-gradienttia amelogeneesin aikana.", match: true },
    ] satisfies CrossMapRow[],

    subTimothyTitle: "'Alatason-Timothy'-hypoteesi",
    subTimothyLead:
      "Timothyn syndrooma edustaa spektrin ääripäätä. BERM ehdottaa, että krooninen ympäristön EMF tuottaa väestötason 'alatason-Timothy'-tilan — sama Cav1.2-kanava, aktivoitu paljon matalammalla intensiteetillä mutta vuosikymmeniä konstitutiivisen sijasta.",
    subTimothyComparison: [
      { dimension: "CACNA1C-aktivaatio", timothy: "Konstitutiivinen (mutaatio)", berm: "Ajoittainen (EMF-indusoitu)" },
      { dimension: "Vakavuus", timothy: "Vakava (mediaanieloonjääminen ~2,5 vuotta)", berm: "Subkliininen–lievä (väestötason siirtymä)" },
      { dimension: "Alkamisajankohta", timothy: "Prenataalinen / neonataali", berm: "Kumulatiivinen vuosien–vuosikymmenten kuluessa" },
      { dimension: "Sydän", timothy: "Pitkä QT, rytmihäiriö, äkkikuolema", berm: "QT-pidennystrendi, AF-insidenssi nousee" },
      { dimension: "Neurologinen", timothy: "ASD, kohtaukset, kehitysvamma (100 %)", berm: "ASD-prevalenssi 1→36 (1975→2020)" },
      { dimension: "Metabolinen", timothy: "Hypoglykemia (β-solujen hyperaktivaatio)", berm: "T2D-epidemia (β-solujen uupuminen vuosikymmenien jälkeen)" },
      { dimension: "Immuuni", timothy: "Toistuvat infektiot (immuunidesensitisaatio)", berm: "Allergisten sairauksien epidemia (immuunisäätelyn häiriö)" },
    ],
    subTimothyHeaders: { dimension: "Ulottuvuus", timothy: "Timothy (CACNA1C GoF)", berm: "Alatason-Timothy (EMF → Cav1.2)" },

    gwasTitle: "CACNA1C GWAS: psykiatrian pleiotropisin geeni",
    gwasLead:
      "Genominlaajuiset assosiaatiotutkimukset ovat itsenäisesti tunnistaneet CACNA1C:n riskigeeniksi kaksisuuntaiselle mielialahäiriölle, skitsofrenialle, vakavalle masennukselle, ASD:lle ja ADHD:lle. Se on yksittäinen eniten replikoitu psykiatrinen riskigeeni — juuri kuten BERM ennustaa primaariselle EMF-transduuktiokanavalle.",
    gwasPoints: [
      "Ferreira ym. 2008 (Nature Genetics): CACNA1C rs1006737 assosioitunut kaksisuuntaiseen mielialahäiriöön (p = 7,0×10⁻⁸)",
      "Green ym. 2010 (Am J Psychiatry): sama SNP assosioitunut skitsofreniaan ja muuttuneeseen amygdalan toimintaan",
      "Cross-Disorder Group 2013 (Lancet): CACNA1C tunnistettu jaetuksi riskitekijäksi kaikille viidelle suurelle psykiatriselle häiriölle",
      "Yoshimizu ym. 2015: Timothy-mutaatio iPSC-neuroneissa osoittaa liiallisen Ca²⁺:n ja dendriitin vetäytymisen",
    ],

    predictionsTitle: "Ennusteet Timothy-vertailusta",
    predictions: [
      "CACNA1C:n yleisten varianttien kantajien (rs1006737-riskialleeli) pitäisi osoittaa tehostettu herkkyys ympäristön EMF:lle — he alkavat lähempänä Timothy-kynnystä",
      "Timothy-spektrin oireiden (sydän, neurologinen, metabolinen) pitäisi olla yleisempiä korkean EMF:n ympäristöissä, annosriippuvaisesti",
      "Cav1.2-selektiivisten CCB:ien pitäisi tarjota osittainen suoja EMF-assosioitua patologiaa vastaan CACNA1C-riskialleelin kantajilla",
      "iPSC-neuroneissa CACNA1C-riskialleelin kantajilta pitäisi näkyä suurempi Ca²⁺-influksivaste EMF-altistukselle kuin ei-kantajilla",
    ],
    refsTitle: "Keskeiset viitteet",
    refs: [
      "Splawski ym. 2004 (Cell, PMC1149428): Alkuperäinen Timothyn syndrooman kuvaus — CACNA1C G406R -mutaatio",
      "Splawski ym. 2005 (PNAS, PMC1283446): Timothyn syndrooma tyyppi 2 — vaihtoehtoinen CACNA1C-mutaatio, laajempi fenotyyppi",
      "Barrett & Bhatt 2012 (PMC2999985): Kattava katsaus CACNA1C GoF -seurauksiin",
      "Bader ym. 2011 (PMC3760222): CACNA1C psykiatrisessa GWAS:ssa — konvergenssiarumentti",
      "Cross-Disorder Group 2013 (Lancet): CACNA1C transdiagnostisena psykiatrisena riskigeeninä",
    ],
  },
} as const;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const d = locale === "fi" ? COPY.fi : COPY.en;
  return { title: `${d.title} – Extinction Field`, description: d.subtitle.slice(0, 160) };
}

export default async function TimothyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const d = locale === "fi" ? COPY.fi : COPY.en;
  const prefix = `/${locale}`;

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 sm:py-20">
      <p className="mb-6">
        <Link href={`${prefix}/evidence`} className="text-sm text-accent hover:underline">{d.backLink}</Link>
      </p>

      <PageHeader icon={Dna} title={d.title} subtitle={d.subtitle} />

      <CautionBox className="mt-8">{d.cautionText}</CautionBox>

      {/* Cross-map table */}
      <section className="mt-12">
        <h2 className="text-lg font-semibold mb-2">{d.crossMapTitle}</h2>
        <p className="text-sm text-foreground-muted leading-relaxed mb-6 max-w-3xl">{d.crossMapLead}</p>

        <div className="overflow-x-auto -mx-6 px-6">
          <table className="w-full text-sm border-collapse min-w-[600px]">
            <thead>
              <tr className="border-b border-card-border">
                <th className="text-left p-3 font-medium text-foreground-muted">{d.crossMapHeaders.timothy}</th>
                <th className="text-left p-3 font-medium text-foreground-muted">{d.crossMapHeaders.bermVK}</th>
                <th className="text-left p-3 font-medium text-foreground-muted">{d.crossMapHeaders.mechanism}</th>
              </tr>
            </thead>
            <tbody>
              {d.crossMapRows.map((row, i) => (
                <tr key={i} className="border-b border-card-border/50">
                  <td className="p-3 font-medium align-top whitespace-nowrap">{row.timothy}</td>
                  <td className="p-3 font-mono text-xs text-accent align-top whitespace-nowrap">{row.bermVK}</td>
                  <td className="p-3 text-foreground-muted leading-relaxed text-[13px] align-top">{row.mechanism}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="mt-4 text-sm font-medium text-green-600 dark:text-green-400">
          {locale === "fi" ? "10/10 fenotyyppiä kartoittuu BERM-kerrokseen" : "10/10 phenotypes map to a BERM layer"} ✓
        </p>
      </section>

      {/* Sub-Timothy */}
      <section className="mt-14">
        <h2 className="text-lg font-semibold mb-2">{d.subTimothyTitle}</h2>
        <p className="text-sm text-foreground-muted leading-relaxed mb-6 max-w-3xl">{d.subTimothyLead}</p>

        <div className="overflow-x-auto -mx-6 px-6">
          <table className="w-full text-sm border-collapse min-w-[600px]">
            <thead>
              <tr className="border-b border-card-border">
                <th className="text-left p-3 font-medium text-foreground-muted">{d.subTimothyHeaders.dimension}</th>
                <th className="text-left p-3 font-medium text-red-600 dark:text-red-400">{d.subTimothyHeaders.timothy}</th>
                <th className="text-left p-3 font-medium text-accent">{d.subTimothyHeaders.berm}</th>
              </tr>
            </thead>
            <tbody>
              {d.subTimothyComparison.map((row, i) => (
                <tr key={i} className="border-b border-card-border/50">
                  <td className="p-3 font-medium align-top">{row.dimension}</td>
                  <td className="p-3 text-foreground-muted align-top text-[13px]">{row.timothy}</td>
                  <td className="p-3 text-foreground-muted align-top text-[13px]">{row.berm}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* GWAS */}
      <section className="mt-14">
        <h2 className="text-lg font-semibold mb-2">{d.gwasTitle}</h2>
        <p className="text-sm text-foreground-muted leading-relaxed mb-4 max-w-3xl">{d.gwasLead}</p>
        <ul className="space-y-2">
          {d.gwasPoints.map((p, i) => (
            <li key={i} className="text-sm leading-relaxed pl-4 border-l-2 border-accent/30">{p}</li>
          ))}
        </ul>
      </section>

      {/* Predictions */}
      <section className="mt-14">
        <h2 className="text-lg font-semibold mb-2">{d.predictionsTitle}</h2>
        <ol className="space-y-3 list-decimal list-inside">
          {d.predictions.map((p, i) => (
            <li key={i} className="text-sm leading-relaxed text-foreground-muted">{p}</li>
          ))}
        </ol>
      </section>

      {/* References */}
      <section className="mt-14 pb-8">
        <h2 className="text-lg font-semibold mb-3">{d.refsTitle}</h2>
        <ol className="space-y-2 list-decimal list-inside">
          {d.refs.map((r, i) => (
            <li key={i} className="text-xs text-foreground-muted leading-relaxed">{r}</li>
          ))}
        </ol>
      </section>
    </div>
  );
}
