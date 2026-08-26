import type { Metadata } from "next";
import Link from "next/link";
import { Sun } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { CautionBox } from "@/components/CautionBox";
import { DerivedPrediction } from "@/components/DerivedPrediction";

const COPY = {
  en: {
    title: "Vitamin D: Nature's Channel Blocker",
    subtitle: "Vitamin D (1,25(OH)₂D₃) downregulates CACNA1C and CACNA1D mRNA — the same L-type VGCCs that EMF activates. Vitamin D deficiency leaves VGCCs over-expressed, creating the same vulnerable state as chronic EMF exposure. This makes vitamin D the 10th BERM moderator.",
    backLink: "← Back to Evidence",
    cautionText: "This page discusses vitamin D’s role in VGCC regulation. The transcriptional effects of vitamin D on CACNA1C/1D are established in the literature. The implications for EMF sensitivity are a BERM hypothesis.",

    tripleTitle: "Triple strike hypothesis",
    tripleLead: "Three independent pathways converge on the same endpoint: excessive Ca²⁺ influx through L-type VGCCs.",
    tripleStrikes: [
      { strike: "Strike 1: GENETIC", detail: "CACNA1C risk variants (GWAS: schizophrenia, bipolar, ASD) → Cav1.2 function↑" },
      { strike: "Strike 2: ENVIRONMENTAL", detail: "EMF → VGCC activation → Ca²⁺↑ (the core BERM mechanism)" },
      { strike: "Strike 3: NUTRITIONAL", detail: "Vitamin D deficiency → CACNA1C/1D mRNA over-expressed → more VGCCs on membrane → more Ca²⁺ per photon" },
    ],

    transTitle: "The transcriptional evidence",
    transLead: "Vitamin D receptor (VDR) directly controls L-type VGCC gene expression.",
    transPoints: [
      { finding: "VDR silences CACNA1C and CACNA1D transcription", detail: "VDR (vitamin D receptor) directly silences CACNA1C and CACNA1D transcription, reducing L-type VGCC density on the cell membrane (J Neurosci 2001)." },
      { finding: "VDR silencing → Cav1.2/Cav1.3 upregulation", detail: "VDR silencing prevents Cav1.2/Cav1.3 downregulation → NGF↓. Loss of vitamin D signaling removes the brake on VGCC expression (PLoS ONE 2011)." },
      { finding: "Neonatal vitamin D deficiency + CACNA1C variants", detail: "Neonatal vitamin D deficiency and CACNA1C variants converge on schizophrenia risk — gene-environment interaction on the same channel (Transl Psychiatry 2019)." },
      { finding: "Genomic and non-genomic pathways", detail: "1,25D modulates L-type VDCCs in cortical neurons through both genomic (transcriptional) and non-genomic (rapid membrane signaling) pathways, providing dual control over calcium influx." },
    ],

    modTitle: "The 10th moderator",
    modLead: "BERM’s moderator list grows: vitamin D status determines individual VGCC density and therefore EMF vulnerability.",
    modPoints: [
      { point: "Moderator list expansion", detail: "BERM’s moderators: laji, kesto, pulsaatio, genotyyppi, vuodenaika, ikä, EMF-tyyppi, raskasmetallit, nikotiini → now add D-vitamiini." },
      { point: "Individual variation explained", detail: "Vitamin D status explains individual variation in EMF sensitivity. Two people in the same EMF environment can have different VGCC densities — and therefore different Ca²⁺ loads — based on their vitamin D levels alone." },
      { point: "Seasonal patterns", detail: "Seasonal vitamin D variation may explain seasonal patterns in EMF-related symptoms. Winter = low vitamin D = high VGCC expression = greater EMF vulnerability." },
      { point: "Population-level vulnerability", detail: "Population-level vitamin D deficiency (~40% globally) = population-level VGCC over-expression. This is a modifiable risk factor at scale." },
    ],

    clinTitle: "Clinical implications",
    clinLead: "Vitamin D repletion as a protective intervention against EMF vulnerability.",
    clinPoints: [
      { implication: "Testable intervention", detail: "Vitamin D repletion could reduce EMF vulnerability by downregulating VGCC expression — a directly testable prediction (E-NEW-28)." },
      { implication: "Triple hit model", detail: "Low vitamin D + CACNA1C variant + high EMF = triple hit. This three-factor convergence model predicts highest risk for conditions like schizophrenia (E-NEW-31)." },
      { implication: "Realistic protection", detail: "Vitamin D is cheap, safe, and widely available — a realistic protective intervention. Unlike reducing EMF exposure (infrastructure-dependent), vitamin D supplementation is individually actionable." },
    ],

    predictionText: "Prediction E-NEW-28: Vitamin D repletion in deficient individuals reduces VGCC expression and attenuates EMF-induced Ca²⁺ influx. Prediction E-NEW-29: Populations with higher vitamin D status show lower prevalence of EMF-associated symptom clusters.",
    predictionLink: "See final layer predictions →",
    predictionHref: "/predictions",
  },
  fi: {
    title: "D-vitamiini: Luonnon kanavasalpaaja",
    subtitle: "D-vitamiini (1,25(OH)₂D₃) vaimentaa CACNA1C- ja CACNA1D-mRNA:ta — samoja L-tyypin VGCC-kanavia, joita EMF aktivoi. D-vitamiinin puutos jättää VGCC:t yliekspressoituneiksi, luoden saman haavoittuvan tilan kuin krooninen EMF-altistus. Tämä tekee D-vitamiinista BERM:n 10. moderaattorin.",
    backLink: "← Takaisin Evidenssiin",
    cautionText: "Tämä sivu käsittelee D-vitamiinin roolia VGCC-säätelyssä. D-vitamiinin transkriptionaaliset vaikutukset CACNA1C/1D:hen ovat vakiintuneita kirjallisuudessa. Vaikutukset EMF-herkkyyteen ovat BERM-hypoteesi.",

    tripleTitle: "Kolmoisiskuhypoteesi",
    tripleLead: "Kolme itsenäistä reittiä konvergoituu samaan päätepisteeseen: liiallinen Ca²⁺-sisäänvirtaus L-tyypin VGCC:iden kautta.",
    tripleStrikes: [
      { strike: "Isku 1: GENEETTINEN", detail: "CACNA1C-riskivariantit (GWAS: skitsofrenia, kaksisuuntainen mielialahäiriö, ASD) → Cav1.2-toiminta↑" },
      { strike: "Isku 2: YMPÄRISTÖLLINEN", detail: "EMF → VGCC-aktivaatio → Ca²⁺↑ (BERM:n ydinmekanismi)" },
      { strike: "Isku 3: RAVITSEMUKSELLINEN", detail: "D-vitamiinin puutos → CACNA1C/1D-mRNA yliekspressoitunut → enemmän VGCC:itä kalvolla → enemmän Ca²⁺:ta per fotoni" },
    ],

    transTitle: "Transkriptionaalinen evidenssi",
    transLead: "D-vitamiinireseptori (VDR) kontrolloi suoraan L-tyypin VGCC-geenien ilmentymistä.",
    transPoints: [
      { finding: "VDR vaimentaa CACNA1C:n ja CACNA1D:n transkription", detail: "VDR (D-vitamiinireseptori) vaimentaa suoraan CACNA1C:n ja CACNA1D:n transkription, vähentäen L-tyypin VGCC-tiheyttyä solukalvolla (J Neurosci 2001)." },
      { finding: "VDR:n vaimentaminen → Cav1.2/Cav1.3-ylössäätely", detail: "VDR:n vaimentaminen estää Cav1.2/Cav1.3-alassäätelyn → NGF↓. D-vitamiinisignaloinnin menetys poistaa jarrun VGCC-ekspressiolta (PLoS ONE 2011)." },
      { finding: "Neonataali D-vitamiinipuutos + CACNA1C-variantit", detail: "Neonataali D-vitamiinipuutos ja CACNA1C-variantit konvergoituvat skitsofreniariskiin — geeni-ympäristö-vuorovaikutus samassa kanavassa (Transl Psychiatry 2019)." },
      { finding: "Genomiset ja ei-genomiset reitit", detail: "1,25D moduloi L-tyypin VDCC:itä kortikaalisissa neuroneissa sekä genomisten (transkriptionaalisten) että ei-genomisten (nopea kalvosignalointi) reittien kautta, tarjoten kaksoishallinnan kalsiumsisäänvirtaukselle." },
    ],

    modTitle: "10. moderaattori",
    modLead: "BERM:n moderaattorilista kasvaa: D-vitamiinitaso määrittää yksilöllisen VGCC-tiheyden ja siten EMF-haavoittuvuuden.",
    modPoints: [
      { point: "Moderaattorilistan laajennus", detail: "BERM:n moderaattorit: laji, kesto, pulsaatio, genotyyppi, vuodenaika, ikä, EMF-tyyppi, raskasmetallit, nikotiini → nyt lisätään D-vitamiini." },
      { point: "Yksilöllinen vaihtelu selitettynä", detail: "D-vitamiinitaso selittää yksilöllistä vaihtelua EMF-herkkyydessä. Kaksi ihmistä samassa EMF-ympäristössä voi omata eri VGCC-tiheydet — ja siten eri Ca²⁺-kuormat — pelkästään D-vitamiinitasonsa perusteella." },
      { point: "Kausittaiset kaavat", detail: "D-vitamiinin kausittainen vaihtelu voi selittää kausittaiset kaavat EMF-liitteisissä oireissa. Talvi = matala D-vitamiini = korkea VGCC-ekspressio = suurempi EMF-haavoittuvuus." },
      { point: "Väestötason haavoittuvuus", detail: "Väestötason D-vitamiinipuutos (~40 % maailmanlaajuisesti) = väestötason VGCC-yliekspressio. Tämä on muokattavissa oleva riskitekijä laajassa mittakaavassa." },
    ],

    clinTitle: "Kliiniset implikaatiot",
    clinLead: "D-vitamiinin täydennys suojaavana interventiona EMF-haavoittuvuutta vastaan.",
    clinPoints: [
      { implication: "Testattava interventio", detail: "D-vitamiinin täydennys voisi vähentää EMF-haavoittuvuutta VGCC-ekspression alassäätelyn kautta — suoraan testattava ennuste (E-NEW-28)." },
      { implication: "Kolmoisiskumalli", detail: "Matala D-vitamiini + CACNA1C-variantti + korkea EMF = kolmoisosu. Tämä kolmen tekijän konvergenssimalli ennustaa suurimman riskin tiloille kuten skitsofrenia (E-NEW-31)." },
      { implication: "Realistinen suojaus", detail: "D-vitamiini on halpaa, turvallista ja laajalti saatavilla — realistinen suojaava interventio. Toisin kuin EMF-altistuksen vähentäminen (infrastruktuuririippuvaista), D-vitamiinilisä on yksilöllisesti toteutettavissa." },
    ],

    predictionText: "Ennuste E-NEW-28: D-vitamiinin täydennys puutostilaisilla yksilöillä vähentää VGCC-ekspressiota ja vaimentaa EMF-indusoitua Ca²⁺-sisäänvirtausta. Ennuste E-NEW-29: Väestöillä joilla on korkeampi D-vitamiinitaso, on matalampi EMF-liitteisten oireklustereiden esiintyvyys.",
    predictionLink: "Ks. viimeisten kerrosten ennusteet →",
    predictionHref: "/predictions",
  },
} as const;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const d = locale === "fi" ? COPY.fi : COPY.en;
  return { title: `${d.title} – Extinction Field`, description: d.subtitle };
}

export default async function VitaminDChannelBlockerPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const activeLocale = locale === "fi" ? "fi" : "en";
  const d = COPY[activeLocale];
  const prefix = `/${locale}`;

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 sm:py-20">
      <p className="mb-6">
        <Link href={`${prefix}/evidence`} className="text-sm text-accent hover:underline">{d.backLink}</Link>
      </p>
      <PageHeader icon={Sun} title={d.title} subtitle={d.subtitle} />
      <div className="mt-8"><CautionBox locale={activeLocale}><p>{d.cautionText}</p></CautionBox></div>

      <section className="mt-12">
        <h2 className="text-lg font-semibold mb-2">{d.tripleTitle}</h2>
        <p className="text-sm text-foreground-muted leading-relaxed mb-6 max-w-3xl">{d.tripleLead}</p>
        <div className="space-y-3">
          {d.tripleStrikes.map((s, i) => (
            <div key={i} className="rounded-lg border border-green-500/20 bg-green-500/5 p-4">
              <p className="text-sm font-semibold mb-1">{s.strike}</p>
              <p className="text-sm text-foreground-muted leading-relaxed">{s.detail}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-14 border-t editorial-rule pt-6">
        <h2 className="text-lg font-semibold mb-2">{d.transTitle}</h2>
        <p className="text-sm text-foreground-muted leading-relaxed mb-4 max-w-3xl">{d.transLead}</p>
        <div className="space-y-3">
          {d.transPoints.map((p, i) => (
            <div key={i} className="rounded-lg border border-card-border bg-card-bg p-4">
              <p className="text-sm font-semibold mb-1">{p.finding}</p>
              <p className="text-sm text-foreground-muted leading-relaxed">{p.detail}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-14 border-t editorial-rule pt-6">
        <h2 className="text-lg font-semibold mb-2">{d.modTitle}</h2>
        <p className="text-sm text-foreground-muted leading-relaxed mb-4 max-w-3xl">{d.modLead}</p>
        <div className="space-y-3">
          {d.modPoints.map((p, i) => (
            <div key={i} className="rounded-lg border border-card-border bg-card-bg p-4">
              <p className="text-sm font-semibold mb-1">{p.point}</p>
              <p className="text-sm text-foreground-muted leading-relaxed">{p.detail}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-14 border-t editorial-rule pt-6">
        <h2 className="text-lg font-semibold mb-2">{d.clinTitle}</h2>
        <p className="text-sm text-foreground-muted leading-relaxed mb-4 max-w-3xl">{d.clinLead}</p>
        <div className="space-y-3">
          {d.clinPoints.map((p, i) => (
            <div key={i} className="rounded-lg border border-accent/20 bg-accent/5 p-4">
              <p className="text-sm font-semibold mb-1">{p.implication}</p>
              <p className="text-sm text-foreground-muted leading-relaxed">{p.detail}</p>
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
