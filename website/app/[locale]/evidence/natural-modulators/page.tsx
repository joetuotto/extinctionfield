import type { Metadata } from "next";
import Link from "next/link";
import { Leaf } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { CautionBox } from "@/components/CautionBox";
import { DerivedPrediction } from "@/components/DerivedPrediction";

const COPY = {
  en: {
    title: "Five Natural Ca²⁺ Modulators",
    subtitle: "Five natural substances modulate the same Ca²⁺ cascade that BERM identifies as EMF’s primary biological pathway. All five are declining in the modern environment — simultaneously — while EMF exposure increases. This convergent loss creates a civilization-level vulnerability.",
    backLink: "← Back to Evidence",
    cautionText: "This page discusses five natural substances with Ca²⁺-modulating properties. Each substance’s individual mechanism is well-established. The combined framework linking their simultaneous decline to EMF vulnerability is a BERM synthesis.",

    modulatorsTitle: "The five modulators",
    modulators: [
      {
        name: "Vitamin D",
        mechanism: "VDR→CACNA1C/1D mRNA↓ = genomic VGCC downregulation.",
        trend: "DEFICIENCY INCREASING (indoor lifestyle, sunscreen). ~40% globally deficient.",
        status: "10th BERM moderator (VK50).",
      },
      {
        name: "Melatonin",
        mechanism: "Antioxidant + SIRT1 + telomerase + BBB protection + estrogen counterbalance.",
        trend: "SUPPRESSED (EMF + LED blue light + shift work).",
        status: "Central to BERM since VK2.",
      },
      {
        name: "Magnesium",
        mechanism: "Direct Ca²⁺ antagonist at multiple channel types = nature’s channel blocker.",
        trend: "DECREASING (processed food, depleted soil, filtered water).",
        status: "Known Ca²⁺ antagonist.",
      },
      {
        name: "Lithium (trace)",
        mechanism: "GSK-3β inhibition + CaMKII modulation + BDNF↑ + circadian stabilization.",
        trend: "DISAPPEARING (modern water filtration removes trace lithium). Dementia↓ and suicide↓ at population level (VK54).",
        status: "Trace lithium in water correlates with lower dementia and suicide rates.",
      },
      {
        name: "Caffeine",
        mechanism: "A2A antagonism → DA neuron protection + anti-neuroinflammation + Ca²⁺ modulation.",
        trend: "ONLY ONE INCREASING. May be compensatory — the one natural modulator humans are self-medicating with.",
        status: "The exception that may prove the rule.",
      },
    ],

    convergentTitle: "The convergent loss",
    convergentPoints: [
      "Four of five natural Ca²⁺ modulators are DECLINING simultaneously.",
      "While the Ca²⁺-disrupting agent (EMF) is INCREASING.",
      "= Fivefold vulnerability shift: less protection + more disruption.",
      "This is not a coincidence — it’s a civilization-level metabolic shift.",
      "Caffeine as the exception: the one modulator humans actively seek out may represent unconscious self-medication.",
    ],

    testableTitle: "Testable framework",
    testableLead: "Each modulator’s effect on EMF biomarkers is independently verifiable.",
    testablePoints: [
      "Each modulator’s effect on EMF biomarkers is independently testable.",
      "Combined modulator score could predict individual EMF vulnerability.",
      "Population-level modulator decline + EMF increase should predict disease trends.",
    ],

    predictionText: "Prediction E-NEW-28: Vitamin D repletion in deficient individuals reduces VGCC expression and attenuates EMF-induced Ca²⁺ influx. Prediction E-NEW-35: Populations with higher trace lithium in water show lower prevalence of EMF-associated neurodegenerative conditions.",
    predictionLink: "See final layer predictions →",
    predictionHref: "/predictions",
  },
  fi: {
    title: "Viisi luonnollista Ca²⁺-modulaattoria",
    subtitle: "Viisi luonnollista ainetta moduloi samaa Ca²⁺-kaskadia, jonka BERM tunnistaa EMF:n ensisijaiseksi biologiseksi reitiksi. Kaikki viisi ovat vähenemässä modernissa ympäristössä — samanaikaisesti — samalla kun EMF-altistus kasvaa. Tämä konvergentti menetys luo sivilisaatiotason haavoittuvuuden.",
    backLink: "← Takaisin Evidenssiin",
    cautionText: "Tämä sivu käsittelee viittä luonnollista ainetta, joilla on Ca²⁺-moduloivia ominaisuuksia. Kunkin aineen yksittäinen mekanismi on vakiintunut. Yhdistetty viitekehys, joka linkittää niiden samanaikaisen vähenemisen EMF-haavoittuvuuteen, on BERM-synteesi.",

    modulatorsTitle: "Viisi modulaattoria",
    modulators: [
      {
        name: "D-vitamiini",
        mechanism: "VDR→CACNA1C/1D-mRNA↓ = genominen VGCC-alassäätely.",
        trend: "PUUTOS LISÄÄNTYY (sisäelämäntyyli, aurinkovoide). ~40 % maailmanlaajuisesti puutteellinen.",
        status: "BERM:n 10. moderaattori (VK50).",
      },
      {
        name: "Melatoniini",
        mechanism: "Antioksidantti + SIRT1 + telomeraasi + BBB-suoja + estrogeenin vastapaino.",
        trend: "TUKAHDUTETTUNA (EMF + LED-sinivalo + vuorotyö).",
        status: "Keskeinen BERM:ssä VK2:sta lähtien.",
      },
      {
        name: "Magnesium",
        mechanism: "Suora Ca²⁺-antagonisti useissa kanavatyypeissä = luonnon kanavasalpaaja.",
        trend: "VÄHENEMÄSSÄ (prosessoitu ruoka, köyhtynyt maaperä, suodatettu vesi).",
        status: "Tunnettu Ca²⁺-antagonisti.",
      },
      {
        name: "Litium (hivenaineena)",
        mechanism: "GSK-3β-inhibitio + CaMKII-modulaatio + BDNF↑ + vuorokausirytmin stabilointi.",
        trend: "KATOAMASSA (moderni veden suodatus poistaa hivelitiumin). Dementia↓ ja itsemurha↓ väestötasolla (VK54).",
        status: "Hivelitium vedessä korreloi matalamman dementian ja itsemurhien kanssa.",
      },
      {
        name: "Kofeiini",
        mechanism: "A2A-antagonismi → DA-neuronien suojaus + anti-neuroinflam­maatio + Ca²⁺-modulaatio.",
        trend: "AINOA KASVUSSA. Saattaa olla kompensoivaa — ainoa luonnollinen modulaattori, jolla ihmiset itselääkitsevät.",
        status: "Poikkeus, joka saattaa todistaa säännön.",
      },
    ],

    convergentTitle: "Konvergentti menetys",
    convergentPoints: [
      "Neljä viidestä luonnollisesta Ca²⁺-modulaattorista VÄHENEE samanaikaisesti.",
      "Samalla kun Ca²⁺-häiritsevä tekijä (EMF) LISÄÄNTYY.",
      "= Viisinkertainen haavoittuvuusmuutos: vähemmän suojaa + enemmän häiriötä.",
      "Tämä ei ole sattumaa — se on sivilisaatiotason metabolinen muutos.",
      "Kofeiini poikkeuksena: ainoa modulaattori, jota ihmiset aktiivisesti hakevat, saattaa edustaa tiedostamatonta itselääkitystä.",
    ],

    testableTitle: "Testattava viitekehys",
    testableLead: "Kunkin modulaattorin vaikutus EMF-biomarkkereihin on itsenäisesti todennettavissa.",
    testablePoints: [
      "Kunkin modulaattorin vaikutus EMF-biomarkkereihin on itsenäisesti testattavissa.",
      "Yhdistetty modulaattoripistemäärä voisi ennustaa yksilöllistä EMF-haavoittuvuutta.",
      "Väestötason modulaattorien väheneminen + EMF:n kasvu pitäisi ennustaa sairaus­trendejä.",
    ],

    predictionText: "Ennuste E-NEW-28: D-vitamiinin täydennys puutostilaisilla yksilöillä vähentää VGCC-ekspressiota ja vaimentaa EMF-indusoitua Ca²⁺-sisäänvirtausta. Ennuste E-NEW-35: Väestöillä, joilla on enemmän hivelitiumia vedessä, on matalampi EMF-liitteisten neurodegeneratiivisten tilojen esiintyvyys.",
    predictionLink: "Ks. viimeisten kerrosten ennusteet →",
    predictionHref: "/predictions",
  },
} as const;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const d = locale === "fi" ? COPY.fi : COPY.en;
  return { title: `${d.title} – Extinction Field`, description: d.subtitle };
}

export default async function NaturalModulatorsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const activeLocale = locale === "fi" ? "fi" : "en";
  const d = COPY[activeLocale];
  const prefix = `/${locale}`;

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 sm:py-20">
      <p className="mb-6">
        <Link href={`${prefix}/evidence`} className="text-sm text-accent hover:underline">{d.backLink}</Link>
      </p>
      <PageHeader icon={Leaf} title={d.title} subtitle={d.subtitle} />
      <div className="mt-8"><CautionBox locale={activeLocale}><p>{d.cautionText}</p></CautionBox></div>

      {/* The five modulators */}
      <section className="mt-12">
        <h2 className="text-lg font-semibold mb-2">{d.modulatorsTitle}</h2>
        <div className="space-y-3">
          {d.modulators.map((m, i) => (
            <div key={i} className="rounded-lg border border-green-500/20 bg-green-500/5 p-4">
              <p className="text-sm font-semibold mb-1">{m.name}</p>
              <p className="text-sm text-foreground-muted leading-relaxed mb-1">{m.mechanism}</p>
              <p className="text-sm text-foreground-muted leading-relaxed mb-1"><span className="font-medium">Trend:</span> {m.trend}</p>
              <p className="text-xs text-foreground-muted italic">{m.status}</p>
            </div>
          ))}
        </div>
      </section>

      {/* The convergent loss */}
      <section className="mt-14 border-t editorial-rule pt-6">
        <h2 className="text-lg font-semibold mb-4">{d.convergentTitle}</h2>
        <div className="rounded-lg border border-amber-500/20 bg-amber-500/5 p-5">
          <div className="space-y-2">
            {d.convergentPoints.map((point, i) => (
              <div key={i} className="flex gap-2 text-sm text-foreground-muted leading-relaxed">
                <span className="text-amber-500 shrink-0">{"→"}</span><p>{point}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testable framework */}
      <section className="mt-14 border-t editorial-rule pt-6">
        <h2 className="text-lg font-semibold mb-2">{d.testableTitle}</h2>
        <p className="text-sm text-foreground-muted leading-relaxed mb-4 max-w-3xl">{d.testableLead}</p>
        <div className="space-y-3">
          {d.testablePoints.map((point, i) => (
            <div key={i} className="rounded-lg border border-card-border bg-card-bg p-4">
              <p className="text-sm text-foreground-muted leading-relaxed">{point}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Derived predictions */}
      <section className="mt-14 border-t editorial-rule pt-6">
        <DerivedPrediction locale={activeLocale}>
          <p className="text-sm leading-relaxed mb-3">{d.predictionText}</p>
          <Link href={`${prefix}${d.predictionHref}`} className="text-sm text-accent hover:underline">{d.predictionLink}</Link>
        </DerivedPrediction>
      </section>
    </div>
  );
}
