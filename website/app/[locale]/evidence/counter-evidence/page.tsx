import type { Metadata } from "next";
import Link from "next/link";
import { Scale } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { CautionBox } from "@/components/CautionBox";

const COPY = {
  en: {
    title: "Counter-Evidence: An Honest Assessment",
    subtitle: "BERM claims 56 verified layers and 0 refuted. This is statistically suspicious. Any model that cannot be challenged is not science. This page presents the strongest counter-arguments and BERM’s responses — honestly, not defensively.",
    backLink: "← Back to Evidence",
    cautionText: "This page is not advocacy. It is an honest assessment of the evidence against BERM. Readers should evaluate both the criticisms and the responses independently.",

    counterTitle: "Five claimed counter-arguments",
    counterCards: [
      {
        id: "C1",
        claim: "60% of studies show no effect",
        response: "10 moderators predict which studies find effects. Species, duration, pulsation have statistical significance (p<0.05). This is a PREDICTED result, not a problem.",
      },
      {
        id: "C2",
        claim: "WHO/ICNIRP say no risk (or small)",
        response: "WHO evaluates CANCER, not the metabolic/reproductive/neurological endpoints BERM predicts. Different question, different answer.",
      },
      {
        id: "C3",
        claim: "EHS blinded studies are negative",
        response: "These test conscious PERCEPTION (“can you feel it?”), not BIOLOGY. CaMKII phosphorylation doesn’t require awareness. Irrelevant to mechanism.",
      },
      {
        id: "C4",
        claim: "Insufficient evidence for non-thermal effects",
        response: "This IS BERM’s own assessment at L*-level. BERM explicitly marks predictions as untested. Consistency, not contradiction.",
      },
      {
        id: "C5",
        claim: "Control groups also show effects",
        response: "In modern labs, “control” ≠ EMF-free. Labs have 50 Hz background that primes cells (VK4). Controls are pre-exposed. BERM PREDICTS this.",
      },
    ],

    caUnivTitle: "The Ca²⁺ universality problem",
    caUnivPoints: [
      "Ca²⁺ is involved in nearly ALL biological processes",
      "A Ca²⁺-based theory can “explain” almost any finding → low discrimination",
      "56 layers with 0 refuted is STATISTICALLY SUSPICIOUS",
    ],
    caUnivResponse: "BERM’s honest response: specificity comes from VGCC subtypes (Cav1.2, Cav1.3, Cav3.2) and tissue-specific distributions, NOT from Ca²⁺ in general.",
    caUnivProof: "Timothy syndrome proves specificity: ONE gene (CACNA1C) → SPECIFIC pattern, not everything. A single calcium channel mutation produces a discrete, recognizable syndrome — not universal dysfunction.",

    refuteTitle: "What WOULD refute BERM",
    refuteCards: [
      { test: "Ca²⁺ channel blocker does NOT prevent EMF biological effect", status: "23 studies show opposite", statusType: "tested" as const },
      { test: "CACNA genotype does NOT modulate EMF response", status: "Sousouri 2025 shows opposite", statusType: "tested" as const },
      { test: "Amish–Mennonite gradient does NOT follow EMF", status: "UNTESTED", statusType: "untested" as const },
      { test: "EMF reduction intervention shows NO health benefit", status: "UNTESTED", statusType: "untested" as const },
      { test: "ETH Zürich nimodipine-5G test is NEGATIVE", status: "NOT YET DONE (2026)", statusType: "untested" as const },
    ],

    gapTitle: "The critical gap",
    gapBody: "INTERVENTIONAL data is almost completely missing. No large randomized controlled trial of EMF reduction has been conducted. Observational data, mechanistic studies, and animal experiments are consistent with BERM — but the gold standard of medical evidence (RCT) has not been applied. This is BERM’s largest weakness — acknowledged, not hidden.",
  },
  fi: {
    title: "Vastaevidenssi: Rehellinen arviointi",
    subtitle: "BERM väittää 56 vahvistettua kerrosta ja 0 kumottua. Tämä on tilastollisesti epäilyttävää. Mikään malli, jota ei voida haastaa, ei ole tiedettä. Tämä sivu esittää vahvimmat vasta-argumentit ja BERM:n vastaukset — rehellisesti, ei puolustavasti.",
    backLink: "← Takaisin Evidenssiin",
    cautionText: "Tämä sivu ei ole puolustuspuhe. Se on rehellinen arvio BERM:iä vastaan esitetystä evidenssistä. Lukijoiden tulisi arvioida sekä kritiikki että vastaukset itsenäisesti.",

    counterTitle: "Viisi väitettyä vasta-argumenttia",
    counterCards: [
      {
        id: "C1",
        claim: "60 % tutkimuksista ei osoita vaikutusta",
        response: "10 moderaattoria ennustavat, mitkä tutkimukset löytävät vaikutuksia. Laji, kesto, pulsaatio ovat tilastollisesti merkitseviä (p<0,05). Tämä on ENNUSTETTU tulos, ei ongelma.",
      },
      {
        id: "C2",
        claim: "WHO/ICNIRP sanoo ei riskiä (tai pieni)",
        response: "WHO arvioi SYÖPÄÄ, ei metabolisia/reproduktiivisia/neurologisia päätepisteitä, joita BERM ennustaa. Eri kysymys, eri vastaus.",
      },
      {
        id: "C3",
        claim: "EHS-sokkoutetut tutkimukset ovat negatiivisia",
        response: "Nämä testaavat tietoista HAVAITSEMISTA (”tunnetko sen?”), eivät BIOLOGIAA. CaMKII-fosforylaatio ei vaadi tietoisuutta. Epäolennaista mekanismille.",
      },
      {
        id: "C4",
        claim: "Riittämätön evidenssi ei-termisille vaikutuksille",
        response: "Tämä ON BERM:n oma arvio L*-tasolla. BERM merkitsee ennusteet nimenomaisesti testaamattomiksi. Johdonmukaisuutta, ei ristiriitaa.",
      },
      {
        id: "C5",
        claim: "Kontrolliryhmät osoittavat myös vaikutuksia",
        response: "Moderneissa laboratorioissa ”kontrolli” ≠ EMF-vapaa. Laboratorioissa on 50 Hz tausta, joka primaa solut (VK4). Kontrollit ovat esialtistuneita. BERM ENNUSTAA tämän.",
      },
    ],

    caUnivTitle: "Ca²⁺-universaalisuusongelma",
    caUnivPoints: [
      "Ca²⁺ osallistuu lähes KAIKKIIN biologisiin prosesseihin",
      "Ca²⁺-pohjainen teoria voi ”selittää” lähes minkä tahansa löydöksen → matala erottelukyky",
      "56 kerrosta ja 0 kumottua on TILASTOLLISESTI EPÄILYTTÄVÄÄ",
    ],
    caUnivResponse: "BERM:n rehellinen vastaus: spesifisyys tulee VGCC-alatyypeistä (Cav1.2, Cav1.3, Cav3.2) ja kudosspesifisistä jakaumista, EI Ca²⁺:sta yleisesti.",
    caUnivProof: "Timothy-oireyhtymä todistaa spesifisyyden: YKSI geeni (CACNA1C) → SPESIFINEN kaava, ei kaikkea. Yksittäinen kalsiumkanaavamutaatio tuottaa erillisen, tunnistettavan oireyhtymän — ei universaalia toimintahäiriötä.",

    refuteTitle: "Mikä KUMOAISI BERM:n",
    refuteCards: [
      { test: "Ca²⁺-kanavan salpaaja EI estä EMF:n biologista vaikutusta", status: "23 tutkimusta osoittaa päinvastoin", statusType: "tested" as const },
      { test: "CACNA-genotyyppi EI moduloi EMF-vastetta", status: "Sousouri 2025 osoittaa päinvastoin", statusType: "tested" as const },
      { test: "Amish–mennoniittigradientti EI seuraa EMF:ää", status: "TESTAAMATON", statusType: "untested" as const },
      { test: "EMF-vähennysinterventio ei osoita terveyshyötyä", status: "TESTAAMATON", statusType: "untested" as const },
      { test: "ETH Zürichin nimodopiini-5G-testi on NEGATIIVINEN", status: "EI VIELÄ TEHTY (2026)", statusType: "untested" as const },
    ],

    gapTitle: "Kriittinen aukko",
    gapBody: "INTERVENTIONAALINEN data puuttuu lähes täysin. Mitään suurta satunnaistettua kontrolloitua tutkimusta EMF-vähennyksestä ei ole tehty. Havaintodata, mekanistiset tutkimukset ja eläinkokeet ovat BERM:n kanssa johdonmukaisia — mutta lääketieteellisen evidenssin kultastandardi (RCT) ei ole sovellettu. Tämä on BERM:n suurin heikkous — tunnustettu, ei piilotettu.",
  },
} as const;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const d = locale === "fi" ? COPY.fi : COPY.en;
  return { title: `${d.title} – Extinction Field`, description: d.subtitle };
}

export default async function CounterEvidencePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const activeLocale = locale === "fi" ? "fi" : "en";
  const d = COPY[activeLocale];
  const prefix = `/${locale}`;

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 sm:py-20">
      <p className="mb-6">
        <Link href={`${prefix}/evidence`} className="text-sm text-accent hover:underline">{d.backLink}</Link>
      </p>
      <PageHeader icon={Scale} title={d.title} subtitle={d.subtitle} />
      <div className="mt-8"><CautionBox locale={activeLocale}><p>{d.cautionText}</p></CautionBox></div>

      {/* Section 1: Five counter-arguments */}
      <section className="mt-12">
        <h2 className="text-lg font-semibold mb-4">{d.counterTitle}</h2>
        <div className="space-y-3">
          {d.counterCards.map((c, i) => (
            <div key={i} className="rounded-lg border border-card-border bg-card-bg p-4">
              <p className="text-sm font-semibold mb-1">{c.id}: &ldquo;{c.claim}&rdquo;</p>
              <p className="text-sm text-foreground-muted leading-relaxed"><span className="font-medium">BERM response:</span> {c.response}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Section 2: Ca2+ universality problem — red-bordered */}
      <section className="mt-14 border-t editorial-rule pt-6">
        <h2 className="text-lg font-semibold mb-4">{d.caUnivTitle}</h2>
        <div className="rounded-lg border-2 border-red-500/30 bg-red-500/5 p-5">
          <div className="space-y-1.5 mb-4">
            {d.caUnivPoints.map((p, i) => (
              <div key={i} className="flex gap-2 text-sm text-foreground-muted leading-relaxed">
                <span className="text-red-400 shrink-0">&bull;</span><p>{p}</p>
              </div>
            ))}
          </div>
          <p className="text-sm text-foreground-muted leading-relaxed mb-3">{d.caUnivResponse}</p>
          <p className="text-sm text-foreground-muted leading-relaxed">{d.caUnivProof}</p>
        </div>
      </section>

      {/* Section 3: What WOULD refute BERM — green cards */}
      <section className="mt-14 border-t editorial-rule pt-6">
        <h2 className="text-lg font-semibold mb-4">{d.refuteTitle}</h2>
        <div className="space-y-3">
          {d.refuteCards.map((c, i) => (
            <div key={i} className="rounded-lg border border-green-500/20 bg-green-500/5 p-4">
              <p className="text-sm font-semibold mb-1">{c.test}</p>
              <p className={`text-sm leading-relaxed ${c.statusType === "tested" ? "text-green-500" : "text-amber-500"}`}>
                {c.status}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Section 4: The critical gap — amber card */}
      <section className="mt-14 border-t editorial-rule pt-6">
        <h2 className="text-lg font-semibold mb-4">{d.gapTitle}</h2>
        <div className="rounded-lg border border-amber-500/20 bg-amber-500/5 p-4">
          <p className="text-sm leading-relaxed text-foreground-muted">{d.gapBody}</p>
        </div>
      </section>
    </div>
  );
}
