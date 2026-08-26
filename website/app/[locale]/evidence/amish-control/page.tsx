import type { Metadata } from "next";
import Link from "next/link";
import { Users } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { CautionBox } from "@/components/CautionBox";
import { DerivedPrediction } from "@/components/DerivedPrediction";

const COPY = {
  en: {
    title: "Amish: The Missing Control Group",
    subtitle: "Old Order Amish have minimal electricity, no personal electronics, and dramatically lower rates of every BERM-predicted condition: obesity -89%, T2D -75%, hypertension -66%, cancer -40%. However, massive lifestyle confounders (diet, exercise, smoking, community) make direct attribution impossible. The critical test is the Amish-Mennonite EMF gradient.",
    backLink: "← Back to Evidence",
    cautionText: "This page presents Amish health data as a natural experiment. The health differences are real and well-documented, but lifestyle confounders are massive. This analysis explicitly acknowledges that Amish data alone CANNOT prove EMF causation. The gradient test is needed.",

    dataTitle: "The data",
    dataCards: [
      { stat: "Obesity: -89%", detail: "Compared to US average (STAT 2025). Old Order Amish obesity prevalence is dramatically lower than the general US population despite similar genetic background." },
      { stat: "Type 2 Diabetes: -75%", detail: "Anderson & Potts 2022 review of 126 studies. Amish T2D rates are approximately one-quarter of the US average." },
      { stat: "Hypertension: -66%", detail: "Amish hypertension rates are roughly one-third of the general US population, consistent across multiple community studies." },
      { stat: "Cancer: -40%", detail: "Overall cancer incidence is approximately 40% lower in Amish populations. Some cancers (lung, cervical) are even more dramatically reduced." },
    ],

    confounderTitle: "The confounders",
    confounderLead: "These differences are real — but honest analysis demands acknowledging the massive lifestyle confounders.",
    confounderCards: [
      { factor: "Physical activity", detail: "Amish are far more physically active: 10,000–18,000 steps/day vs ~4,000 for average Americans. Farming, walking, manual labor are daily norms. This alone could explain substantial metabolic differences." },
      { factor: "Diet", detail: "Less processed food, more home-grown produce, less refined sugar. Amish diets are closer to pre-industrial patterns. Dietary differences are a well-established driver of metabolic health." },
      { factor: "Smoking", detail: "Very low smoking rates in Amish communities. This directly reduces cancer, cardiovascular disease, and respiratory conditions. A major confounder for cancer and hypertension data." },
      { factor: "Community", detail: "Strong social bonds, low social isolation, multigenerational households, shared purpose. Social connectedness is independently associated with lower mortality, better mental health, and reduced chronic disease." },
    ],

    crossTitle: "Cross-validation: Why lifestyle alone may be insufficient",
    crossLead: "Independent lines of evidence reduce — but do not eliminate — the lifestyle-only explanation.",
    crossCards: [
      { source: "Klimentidis et al.", detail: "8 species gaining weight in controlled environments (p=10⁻⁷). Lab animals with fixed diets and exercise are also gaining weight. Diet and exercise alone cannot explain this cross-species trend." },
      { source: "Mazur et al.", detail: "Weight-stable men still show testosterone decline. If obesity were the sole driver of T decline, weight-stable men should have stable T. They do not." },
      { source: "Santi et al.", detail: "LH + T declining after controlling for BMI. The decline persists even when body mass is statistically removed. Something beyond weight is driving hormonal changes." },
    ],
    crossConclusion: "These independent lines REDUCE the lifestyle-only explanation. They do not prove EMF causation, but they establish that lifestyle factors alone are insufficient to explain all observed trends.",

    gradientTitle: "The critical test: Amish-Mennonite EMF gradient",
    gradientSteps: [
      "Old Order Amish (no electricity) → lowest EMF exposure",
      "Conservative Amish (some electricity, limited electronics) → low EMF exposure",
      "Mennonite (modern technology, full electricity) → moderate EMF exposure",
      "General US population → highest EMF exposure",
    ],
    gradientBody: "SAME religion, similar genetics, graduated EMF exposure. These four groups share cultural roots, religious values, and substantial genetic overlap — but differ systematically in electromagnetic field exposure. If disease rates follow the EMF gradient even within this cultural continuum, EMF becomes an independent factor that cannot be explained by diet, exercise, or community alone.",
    gradientConclusion: "This is BERM's most important proposed population test. It is the single study design most likely to separate EMF effects from lifestyle confounders. It has not been conducted.",

    predictionText: "Prediction E-NEW-37: Disease rates across the Amish–Mennonite gradient correlate with EMF exposure levels after controlling for diet, exercise, and other lifestyle factors.",
    predictionLink: "See predictions →",
    predictionHref: "/predictions",
  },
  fi: {
    title: "Amish: Puuttuva kontrolliryhmä",
    subtitle: "Vanhan järjestyksen amishilla on minimaalinen sähkönkäyttö, ei henkilökohtaista elektroniikkaa, ja dramaattisesti alhaisemmat esiintyvyydet jokaisessa BERM:n ennustamassa tilassa: lihavuus -89 %, T2D -75 %, verenpainetauti -66 %, syöpä -40 %. Massiiviset elämäntapamuuttujat (ruokavalio, liikunta, tupakointi, yhteisö) tekevät suoran attribuution mahdottomaksi. Kriittinen testi on amish–mennoniittigradientti.",
    backLink: "← Takaisin Evidenssiin",
    cautionText: "Tämä sivu esittää amish-terveysdata luonnollisena kokeena. Terveyserot ovat todellisia ja hyvin dokumentoituja, mutta elämäntapamuuttujat ovat massiivisia. Tämä analyysi tunnustaa nimenomaisesti, että amish-data yksinään EI VOI todistaa EMF-kausaatiota. Gradienttitesti tarvitaan.",

    dataTitle: "Data",
    dataCards: [
      { stat: "Lihavuus: -89 %", detail: "Verrattuna Yhdysvaltain keskiarvoon (STAT 2025). Vanhan järjestyksen amishien lihavuuden esiintyvyys on dramaattisesti alhaisempi kuin yleisväestöllä vastaavasta geneettisestä taustasta huolimatta." },
      { stat: "Tyypin 2 diabetes: -75 %", detail: "Anderson & Potts 2022, 126 tutkimuksen katsaus. Amishien T2D-esiintyvyys on noin neljäsosa Yhdysvaltain keskiarvosta." },
      { stat: "Verenpainetauti: -66 %", detail: "Amishien verenpainetaudin esiintyvyys on noin kolmasosa yleisväestöstä, johdonmukainen useissa yhteisötutkimuksissa." },
      { stat: "Syöpä: -40 %", detail: "Kokonaissyöpäilmaantuvuus on noin 40 % alhaisempi amish-väestössä. Jotkut syövät (keuhko, kohdunkaula) ovat vielä dramaattisemmin vähentyneet." },
    ],

    confounderTitle: "Sekoittavat tekijät",
    confounderLead: "Nämä erot ovat todellisia — mutta rehellinen analyysi vaatii massiivisten elämäntapamuuttujien tunnustamista.",
    confounderCards: [
      { factor: "Fyysinen aktiivisuus", detail: "Amishit ovat huomattavasti fyysisesti aktiivisempia: 10 000–18 000 askelta/päivä vs. ~4 000 keskivertoamerikkalaisella. Maanviljely, kävely ja ruumiillinen työ ovat päivittäisiä normeja. Tämä yksinään voisi selittää merkittävät metaboliset erot." },
      { factor: "Ruokavalio", detail: "Vähemmän prosessoitua ruokaa, enemmän kotikasvatettuja tuotteita, vähemmän puhdistettua sokeria. Amishien ruokavalio on lähempänä esiteollisia malleja. Ruokavalion erot ovat vakiintunut metabolisen terveyden ajuri." },
      { factor: "Tupakointi", detail: "Erittäin alhaiset tupakointiprosentit amish-yhteisöissä. Tämä vähentää suoraan syöpää, syddn- ja verisuonitauteja sekä hengitystieoireita. Merkittävä sekoittava tekijä syöpä- ja verenpainedatalle." },
      { factor: "Yhteisö", detail: "Vahvat sosiaaliset siteet, vähäinen sosiaalinen eristäytyminen, monisukupolviset kotitaloudet, jaettu tarkoitus. Sosiaalinen yhteys on itsenäisesti yhdistetty alhaisempaan kuolleisuuteen, parempaan mielenterveyteen ja vähentyneisiin kroonisiin sairauksiin." },
    ],

    crossTitle: "Ristiinvalidointi: Miksi elämäntapa yksin ei ehkä riitä",
    crossLead: "Riippumattomat todistuslinjat vähentävät — mutta eivät poista — pelkän elämäntavan selitystä.",
    crossCards: [
      { source: "Klimentidis ym.", detail: "8 lajia lihoo kontrolloiduissa ympäristöissä (p=10⁻⁷). Laboratorioeläimet kiinteällä ruokavaliolla ja liikunnalla lihovat myös. Ruokavalio ja liikunta yksin eivät voi selittää tätä lajienvälistä trendiä." },
      { source: "Mazur ym.", detail: "Painoltaan vakaiden miesten testosteroni laskee silti. Jos lihavuus olisi ainoa T-laskun ajuri, painoltaan vakailla miehillä pitäisi olla vakaa T. Näin ei ole." },
      { source: "Santi ym.", detail: "LH + T laskevat BMI:n kontrolloinnin jälkeen. Lasku jatkuu, vaikka kehon massa poistetaan tilastollisesti. Jokin painon ulkopuolinen tekijä ajaa hormonaalisia muutoksia." },
    ],
    crossConclusion: "Nämä riippumattomat todistuslinjat VÄHENTÄVÄT pelkän elämäntavan selitystä. Ne eivät todista EMF-kausaatiota, mutta ne osoittavat, että elämäntapatekijät yksinään eivät riitä selittämään kaikkia havaittuja trendejä.",

    gradientTitle: "Kriittinen testi: Amish–mennoniittigradientti",
    gradientSteps: [
      "Vanhan järjestyksen amish (ei sähköä) → alhaisin EMF-altistus",
      "Konservatiivinen amish (jonkin verran sähköä, rajattu elektroniikka) → matala EMF-altistus",
      "Mennoniitti (moderni teknologia, täysi sähkö) → kohtalainen EMF-altistus",
      "Yhdysvaltain yleisväestö → korkein EMF-altistus",
    ],
    gradientBody: "SAMA uskonto, samanlainen genetiikka, portaittainen EMF-altistus. Nämä neljä ryhmää jakavat kulttuuriset juuret, uskonnolliset arvot ja merkittävän geneettisen päällekkäisyyden — mutta eroavat systemaattisesti sähkömagneettisen kentän altistuksessa. Jos sairausasteet seuraavat EMF-gradienttia tämän kulttuurisen jatkumon sisällä, EMF:stä tulee itsenäinen tekijä, jota ei voida selittää ruokavaliolla, liikunnalla tai yhteisöllä yksinään.",
    gradientConclusion: "Tämä on BERM:n tärkein ehdotettu väestötutkimus. Se on yksittäinen tutkimusasetelma, joka todennäköisimmin erottaa EMF-vaikutukset elämäntapamuuttujista. Sitä ei ole toteutettu.",

    predictionText: "Ennuste E-NEW-37: Sairausasteet amish–mennoniittigradientin yli korreloivat EMF-altistustasojen kanssa ruokavalion, liikunnan ja muiden elämäntapatekijöiden kontrolloinnin jälkeen.",
    predictionLink: "Ks. ennusteet →",
    predictionHref: "/predictions",
  },
} as const;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const d = locale === "fi" ? COPY.fi : COPY.en;
  return { title: `${d.title} – Extinction Field`, description: d.subtitle };
}

export default async function AmishControlPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const activeLocale = locale === "fi" ? "fi" : "en";
  const d = COPY[activeLocale];
  const prefix = `/${locale}`;

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 sm:py-20">
      <p className="mb-6">
        <Link href={`${prefix}/evidence`} className="text-sm text-accent hover:underline">{d.backLink}</Link>
      </p>
      <PageHeader icon={Users} title={d.title} subtitle={d.subtitle} />
      <div className="mt-8"><CautionBox locale={activeLocale}><p>{d.cautionText}</p></CautionBox></div>

      {/* Section 1: The data — green cards */}
      <section className="mt-12">
        <h2 className="text-lg font-semibold mb-4">{d.dataTitle}</h2>
        <div className="space-y-3">
          {d.dataCards.map((c, i) => (
            <div key={i} className="rounded-lg border border-green-500/20 bg-green-500/5 p-4">
              <p className="text-sm font-semibold mb-1">{c.stat}</p>
              <p className="text-sm text-foreground-muted leading-relaxed">{c.detail}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Section 2: The confounders — amber cards */}
      <section className="mt-14 border-t editorial-rule pt-6">
        <h2 className="text-lg font-semibold mb-2">{d.confounderTitle}</h2>
        <p className="text-sm text-foreground-muted leading-relaxed mb-4 max-w-3xl">{d.confounderLead}</p>
        <div className="space-y-3">
          {d.confounderCards.map((c, i) => (
            <div key={i} className="rounded-lg border border-amber-500/20 bg-amber-500/5 p-4">
              <p className="text-sm font-semibold mb-1">{c.factor}</p>
              <p className="text-sm text-foreground-muted leading-relaxed">{c.detail}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Section 3: Cross-validation */}
      <section className="mt-14 border-t editorial-rule pt-6">
        <h2 className="text-lg font-semibold mb-2">{d.crossTitle}</h2>
        <p className="text-sm text-foreground-muted leading-relaxed mb-4 max-w-3xl">{d.crossLead}</p>
        <div className="space-y-3">
          {d.crossCards.map((c, i) => (
            <div key={i} className="rounded-lg border border-card-border bg-card-bg p-4">
              <p className="text-sm font-semibold mb-1">{c.source}</p>
              <p className="text-sm text-foreground-muted leading-relaxed">{c.detail}</p>
            </div>
          ))}
        </div>
        <div className="mt-4 rounded-lg border border-accent/20 bg-accent/5 p-4">
          <p className="text-sm leading-relaxed text-foreground-muted">{d.crossConclusion}</p>
        </div>
      </section>

      {/* Section 4: The critical test — red-bordered card */}
      <section className="mt-14 border-t editorial-rule pt-6">
        <h2 className="text-lg font-semibold mb-4">{d.gradientTitle}</h2>
        <div className="rounded-lg border-2 border-red-500/30 bg-red-500/5 p-5">
          <div className="space-y-1.5 mb-4">
            {d.gradientSteps.map((s, i) => (
              <div key={i} className="flex gap-2 text-sm text-foreground-muted leading-relaxed">
                <span className="text-red-400 shrink-0">{i + 1}.</span><p>{s}</p>
              </div>
            ))}
          </div>
          <p className="text-sm text-foreground-muted leading-relaxed mb-3">{d.gradientBody}</p>
          <p className="text-sm font-semibold leading-relaxed">{d.gradientConclusion}</p>
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
