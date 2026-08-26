import type { Metadata } from "next";
import Link from "next/link";
import { FlaskRound } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { CautionBox } from "@/components/CautionBox";
import { DerivedPrediction } from "@/components/DerivedPrediction";

const LEVEL_COLORS: Record<string, string> = {
  confirmed: "bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/30",
  experimental: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/30",
  mechanistic: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30",
  epidemiological: "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/30",
};

const COPY = {
  en: {
    title: "Heavy Metal × EMF Synergy",
    subtitle:
      "Cd²⁺ permeates Cav3.1, Pb²⁺ mimics Ca²⁺ at calmodulin, MeHg increases T-type currents, Al³⁺ and F⁻ accelerate pineal calcification. EMF opens the gate; heavy metals walk through it. The convergence is not coincidental — it is mechanistically inevitable.",
    backLink: "← Back to Evidence",

    cautionText:
      "This page presents the mechanistic basis for heavy metal × EMF synergism. Each metal's interaction with voltage-gated calcium channels has been independently verified. The synergy hypothesis — that EMF exposure increases heavy metal toxicity by opening entry pathways — generates specific testable predictions.",

    gatewayTitle: "The VGCC gateway",
    gatewayLead:
      "Voltage-gated calcium channels (VGCCs) are not perfectly selective for Ca²⁺. Several toxic metals can permeate through open VGCCs or mimic Ca²⁺ at downstream signaling sites. EMF opens VGCCs → toxic metals gain entry.",

    metalsTitle: "Metal × VGCC interactions",
    metalsLead: "Each heavy metal interacts with the calcium signaling cascade at a specific point. The convergence on VGCCs means that EMF exposure potentiates ALL of these interactions simultaneously.",
    metals: [
      {
        symbol: "Cd²⁺",
        name: "Cadmium",
        mechanism: "Permeates through Cav3.1 T-type channels",
        evidence: "Confirmed with radiolabeled ¹⁰⁹Cd²⁺ — direct permeation through the channel pore",
        level: "confirmed",
        detail: "Cd²⁺ has an ionic radius (0.95 Å) close enough to Ca²⁺ (1.00 Å) to pass through the Cav3.1 selectivity filter. The T-type channel's window current near resting potential means Cd²⁺ can enter even without depolarization — EMF increases open probability → more Cd²⁺ permeation.",
        synergy: "EMF opens Cav3.1 → Cd²⁺ entry increases at constant external Cd²⁺ concentration",
        ref: "Marchetti 2013",
      },
      {
        symbol: "Pb²⁺",
        name: "Lead",
        mechanism: "Mimics Ca²⁺ at calmodulin (CaM) binding sites",
        evidence: "Pb²⁺ binds CaM with higher affinity than Ca²⁺ itself — displaces Ca²⁺ from CaM/CaMKII",
        level: "confirmed",
        detail: "Pb²⁺ doesn't just pass through the channel — it hijacks the downstream signaling. At calmodulin, Pb²⁺ binds the EF-hand domains with higher affinity than Ca²⁺, disrupting CaMKII activation. This means even trace Pb²⁺ in the cytoplasm can disrupt the entire Ca²⁺ signaling cascade.",
        synergy: "EMF → Ca²⁺ influx → CaM activation → Pb²⁺ displaces Ca²⁺ at CaM → signaling disrupted",
        ref: "Bhatt 2012, Bhatt/Bhatt 2012 Cav3.1",
      },
      {
        symbol: "MeHg",
        name: "Methylmercury",
        mechanism: "Increases T-type Ca²⁺ currents",
        evidence: "MeHg enhances T-type channel conductance → more Ca²⁺ per opening event",
        level: "experimental",
        detail: "Methylmercury doesn't permeate the channel — it modifies channel behavior. MeHg increases the conductance of T-type channels, meaning more Ca²⁺ (and Cd²⁺) enters per channel opening. Combined with EMF-induced increased open probability, the result is multiplicative Ca²⁺ loading.",
        synergy: "EMF increases open probability × MeHg increases conductance = multiplicative Ca²⁺ overload",
        ref: "Bhatt 2012",
      },
      {
        symbol: "Al³⁺",
        name: "Aluminum",
        mechanism: "Accelerates pineal gland calcification (PGC)",
        evidence: "Al³⁺ promotes hydroxyapatite crystal nucleation in soft tissue including pineal gland",
        level: "mechanistic",
        detail: "Al³⁺ acts as a nucleation agent for hydroxyapatite crystal formation. In the pineal gland, this accelerates calcification → reduces melatonin production → disrupts circadian rhythm → impairs sleep-dependent GABA restoration. This connects to the Walker sleep chain feedback loop.",
        synergy: "EMF → oxidative stress → Ca²⁺ deposition + Al³⁺ nucleation → accelerated PGC → melatonin↓",
        ref: "PGC 2025 fluoride, PGC 2026 convergent",
      },
      {
        symbol: "F⁻",
        name: "Fluoride",
        mechanism: "Promotes pineal calcification and disrupts Ca²⁺ homeostasis",
        evidence: "Pineal accumulates more F⁻ than any other soft tissue; F⁻ concentration correlates with PGC grade",
        level: "confirmed",
        detail: "The pineal gland accumulates fluoride to concentrations exceeding bone. Fluoride replaces hydroxyl groups in hydroxyapatite, forming fluorapatite — more stable, harder to resorb. This makes pineal calcification progressive and essentially irreversible. The melatonin-suppressive effect compounds over decades.",
        synergy: "F⁻ makes PGC irreversible + EMF suppresses remaining melatonin production → permanent circadian disruption",
        ref: "PGC 2025 fluoride",
      },
    ],

    pgcTitle: "The pineal calcification spiral",
    pgcLead:
      "Pineal gland calcification (PGC) is where heavy metals, fluoride, and EMF converge on a single anatomical structure. The result is a self-reinforcing spiral of melatonin loss.",
    pgcSteps: [
      { step: "EMF → oxidative stress in pineal gland", detail: "Pinealocytes are metabolically active and EMF-sensitive. Oxidative stress damages cell membranes and promotes Ca²⁺/PO₄ deposition." },
      { step: "Ca²⁺ + PO₄ → hydroxyapatite crystals form", detail: "Initial calcification creates nucleation sites for further crystal growth." },
      { step: "Al³⁺ accelerates crystal nucleation", detail: "Aluminum acts as a seed for hydroxyapatite formation, lowering the threshold for calcification." },
      { step: "F⁻ converts hydroxyapatite → fluorapatite", detail: "Fluorapatite is more thermodynamically stable — calcification becomes irreversible." },
      { step: "Calcified tissue ≠ functional pinealocytes", detail: "Each calcified region permanently stops producing melatonin. r=0.569 between uncalcified tissue volume and melatonin output." },
      { step: "Melatonin↓ → antioxidant defense↓ → MORE oxidative stress", detail: "Melatonin is a potent antioxidant. Its loss removes protection against the oxidative stress that caused calcification → positive feedback." },
      { step: "Melatonin↓ → sleep↓ → GABA↓ → Q↑", detail: "This connects to the Walker sleep chain (feedback loop 4). The spiral feeds into the resonance model." },
    ],
    pgcCorrelation: "Clinical evidence: Alzheimer's disease patients show 76% PGC prevalence vs. 64% in age-matched controls. Insomnia patients show higher PGC grade with direct correlation to melatonin reduction.",
    pgcRefs: "Mahlberg 2006 (AD), Kunz 2008 (insomnia), Intechopen 2020 (melatonin-cardiac)",

    convergenceTitle: "The triple convergence",
    convergenceLead: "Three independent exposure routes converge on the same molecular targets:",
    convergenceRows: [
      {
        exposure: "EMF (RF/ELF)",
        target: "VGCC → Ca²⁺ influx",
        downstream: "CaMKII, TPH-2, CSD threshold",
        population: "Universal (grid + wireless)",
      },
      {
        exposure: "Heavy metals (Cd, Pb, MeHg)",
        target: "VGCC pore / CaM / T-type conductance",
        downstream: "Same CaMKII cascade, but corrupted",
        population: "Industrial + dietary",
      },
      {
        exposure: "Calcification agents (Al, F)",
        target: "Pineal gland → melatonin",
        downstream: "Sleep → GABA → Q-factor",
        population: "Water + food + vaccines",
      },
    ],
    convergenceConclusion: "Any ONE of these exposures produces measurable effects. The synergy is that each POTENTIATES the others: EMF opens channels for heavy metals, heavy metals corrupt the signaling that would compensate for EMF, and calcification agents destroy the melatonin system that provides overnight recovery. The question is not whether individual mechanisms exist — each has been independently verified — but whether their convergence in modern populations produces emergent harm greater than the sum of parts.",

    shiftworkTitle: "Shiftwork as natural experiment",
    shiftworkLead: "Shiftworkers provide a natural experiment for the PGC → melatonin → health pathway.",
    shiftworkPoints: [
      "Chronic light-at-night suppresses melatonin via the retinohypothalamic tract",
      "Shiftworkers show higher rates of cancer (IARC Group 2A carcinogen), cardiovascular disease, metabolic syndrome, and cognitive decline",
      "These are the SAME conditions BERM predicts from EMF → melatonin suppression",
      "The pathway is the same (melatonin↓); only the input differs (light vs. EMF + PGC)",
      "Booker 2024: shiftwork epidemiology confirms the downstream health consequences of chronic melatonin suppression",
    ],

    breastmilkTitle: "Melatonin in breast milk",
    breastmilkLead: "Breast milk contains melatonin in a circadian pattern — high at night, low during day. This provides exogenous melatonin to the infant whose own pineal gland is immature.",
    breastmilkPoints: [
      "Neonatal pineal is functionally immature → minimal endogenous melatonin",
      "Breast milk melatonin peaks at night → provides circadian signal to infant",
      "Formula contains ZERO melatonin → formula-fed infants lack this protective input",
      "SIDS peaks correlate with formula feeding rates across populations",
      "BERM connection: EMF → maternal melatonin↓ → breast milk melatonin↓ → infant protection↓",
    ],

    predictionLink: "See heavy metal synergy predictions (METAL-EMF-1–4)",
    predictionHref: "/predictions",
  },

  fi: {
    title: "Raskasmetalli × EMF -synergismi",
    subtitle:
      "Cd²⁺ permeoi Cav3.1:n, Pb²⁺ matkii Ca²⁺:ia kalmoduliinissa, MeHg kasvattaa T-tyypin virtoja, Al³⁺ ja F⁻ kiihdyttävät pineaalisen kalsifikaation. EMF avaa portin; raskasmetallit kulkevat sen läpi. Konvergenssi ei ole sattumaa — se on mekanistisesti väistämätöntä.",
    backLink: "← Takaisin Evidenssiin",

    cautionText:
      "Tämä sivu esittää raskasmetalli × EMF -synergismin mekanistisen perustan. Jokaisen metallin vuorovaikutus jänniteohjattujen kalsiumkanavien kanssa on verifioitu itsenäisesti. Synergiahypoteesi — että EMF-altistus kasvattaa raskasmetallien myrkyllisyyttä avaamalla sisääntuloreitit — generoi spesifisiä testattavia ennusteita.",

    gatewayTitle: "VGCC-portti",
    gatewayLead:
      "Jänniteohjatut kalsiumkanavat (VGCC:t) eivät ole täydellisen selektiivisiä Ca²⁺:lle. Useat myrkylliset metallit voivat permeata avoimien VGCC-kanavien läpi tai matkia Ca²⁺:ia signaalireitin kohteissa. EMF avaa VGCC:t → myrkylliset metallit pääsevät sisään.",

    metalsTitle: "Metalli × VGCC -vuorovaikutukset",
    metalsLead: "Jokainen raskasmetalli vuorovaikuttaa kalsiumsignaalikaskadin kanssa tietyssä pisteessä. Konvergenssi VGCC:ihin tarkoittaa, että EMF-altistus potentioi KAIKKIA näitä vuorovaikutuksia samanaikaisesti.",
    metals: [
      {
        symbol: "Cd²⁺",
        name: "Kadmium",
        mechanism: "Permeoi Cav3.1 T-tyypin kanavien läpi",
        evidence: "Vahvistettu radioleimatulla ¹⁰⁹Cd²⁺:lla — suora permeaatio kanavan huokosen läpi",
        level: "confirmed",
        detail: "Cd²⁺:n ionisäde (0,95 Å) on riittävän lähellä Ca²⁺:ia (1,00 Å) kulkemaan Cav3.1:n selektiivisuussuodattimen läpi. T-tyypin kanavan ikkunavirta lähellä lepokalvopotentiaalia tarkoittaa, että Cd²⁺ voi kulkeutua sisään jopa ilman depolarisaatiota — EMF kasvattaa avautumistodennäköisyyttä → enemmän Cd²⁺-permeaatiota.",
        synergy: "EMF avaa Cav3.1:n → Cd²⁺:n sisäänvirtaus kasvaa vakiolla ulkoisella Cd²⁺-pitoisuudella",
        ref: "Marchetti 2013",
      },
      {
        symbol: "Pb²⁺",
        name: "Lyijy",
        mechanism: "Matkii Ca²⁺:ia kalmoduliinin (CaM) sitoutumispaikoissa",
        evidence: "Pb²⁺ sitoutuu CaM:iin korkeammalla affiniteetilla kuin Ca²⁺ itse — syrjäyttää Ca²⁺:n CaM/CaMKII:sta",
        level: "confirmed",
        detail: "Pb²⁺ ei vain kulje kanavan läpi — se kaappaa signaalireitin. Kalmoduliinissa Pb²⁺ sitoutuu EF-käsi-domeeneihin korkeammalla affiniteetilla kuin Ca²⁺, häiriten CaMKII:n aktivaatiota. Tämä tarkoittaa, että jopa jälkimäärät Pb²⁺:ia sytoplasmassa voivat häiritä koko Ca²⁺-signaalikaskadin.",
        synergy: "EMF → Ca²⁺-sisäänvirtaus → CaM-aktivaatio → Pb²⁺ syrjäyttää Ca²⁺:n CaM:issa → signalointi häiriintyy",
        ref: "Bhatt 2012, Bhatt/Bhatt 2012 Cav3.1",
      },
      {
        symbol: "MeHg",
        name: "Metyylielohopea",
        mechanism: "Kasvattaa T-tyypin Ca²⁺-virtoja",
        evidence: "MeHg tehostaa T-tyypin kanavan johtavuutta → enemmän Ca²⁺:ia per avautumistapahtuma",
        level: "experimental",
        detail: "Metyylielohopea ei permeoi kanavaa — se muokkaa kanavan käyttäytymistä. MeHg kasvattaa T-tyypin kanavien johtavuutta, mikä tarkoittaa enemmän Ca²⁺:ia (ja Cd²⁺:ia) per kanavan avautuminen. Yhdistettynä EMF:n aiheuttamaan kasvaneeseen avautumistodennäköisyyteen tulos on multiplikatiivinen Ca²⁺-kuormitus.",
        synergy: "EMF kasvattaa avautumistodennäköisyyttä × MeHg kasvattaa johtavuutta = multiplikatiivinen Ca²⁺-ylikuorma",
        ref: "Bhatt 2012",
      },
      {
        symbol: "Al³⁺",
        name: "Alumiini",
        mechanism: "Kiihdyttää pineaalirauhasen kalsifikaatiota (PGC)",
        evidence: "Al³⁺ edistää hydroksiapatiittikiteiden ydintymistä pehmytkudoksessa mukaan lukien pineaalirauhanen",
        level: "mechanistic",
        detail: "Al³⁺ toimii hydroksiapatiittikiteiden ydintymisagenttina. Pineaalirauhasessa tämä kiihdyttää kalsifikaatiota → vähentää melatoniinin tuotantoa → häiritsee vuorokausirytmiä → heikentää uniriippuvaista GABA:n palautumista. Tämä kytkeytyy Walkerin uniketjun takaisinkytkentäsilmukkaan.",
        synergy: "EMF → oksidatiivinen stressi → Ca²⁺-kertymä + Al³⁺-ydintyminen → kiihtynyt PGC → melatoniini↓",
        ref: "PGC 2025 fluoridi, PGC 2026 konvergentti",
      },
      {
        symbol: "F⁻",
        name: "Fluoridi",
        mechanism: "Edistää pineaalisen kalsifikaation ja häiritsee Ca²⁺-homeostaasia",
        evidence: "Pineaalirauhanen kerää enemmän F⁻:ia kuin mikään muu pehmytkudos; F⁻-pitoisuus korreloi PGC-asteen kanssa",
        level: "confirmed",
        detail: "Pineaalirauhanen kerää fluoridia pitoisuuksiin jotka ylittävät luukudoksen. Fluoridi korvaa hydroksiryhmät hydroksiapatiitissa muodostaen fluorapatiittia — termodynaamisesti stabiilimpi, vaikeampi resorboida. Tämä tekee pineaalisesta kalsifikaatiosta progressiivisen ja olennaisesti palautumattoman. Melatoniinia suppressoiva vaikutus kumuloituu vuosikymmenten kuluessa.",
        synergy: "F⁻ tekee PGC:stä palautumattoman + EMF suppressoi jäljellä olevaa melatoniinin tuotantoa → pysyvä vuorokausirytmin häiriö",
        ref: "PGC 2025 fluoridi",
      },
    ],

    pgcTitle: "Pineaalisen kalsifikaation spiraali",
    pgcLead:
      "Pineaalirauhasen kalsifikaatio (PGC) on kohta jossa raskasmetallit, fluoridi ja EMF konvergoivat yhteen anatomiseen rakenteeseen. Tuloksena on itseään vahvistava melatoniinin menetyksen spiraali.",
    pgcSteps: [
      { step: "EMF → oksidatiivinen stressi pineaalirauhasessa", detail: "Pinealosyytit ovat metabolisesti aktiivisia ja EMF-herkkiä. Oksidatiivinen stressi vahingoittaa solukalvoja ja edistää Ca²⁺/PO₄-kertymistä." },
      { step: "Ca²⁺ + PO₄ → hydroksiapatiittikiteet muodostuvat", detail: "Alkuvaiheen kalsifikaatio luo ydintymiskohtia lisäkiteiden kasvulle." },
      { step: "Al³⁺ kiihdyttää kiteiden ydintymistä", detail: "Alumiini toimii hydroksiapatiittikiteiden siemenenä, laskien kalsifikaation kynnystä." },
      { step: "F⁻ muuntaa hydroksiapatiittia → fluorapatiittia", detail: "Fluorapatiitti on termodynaamisesti stabiilimpi — kalsifikaatiosta tulee palautumaton." },
      { step: "Kalsifioitunut kudos ≠ toiminnalliset pinealosyytit", detail: "Jokainen kalsifioitunut alue lopettaa pysyvästi melatoniinin tuotannon. r=0,569 kalsifioitumattoman kudostilavuuden ja melatoniinituotannon välillä." },
      { step: "Melatoniini↓ → antioksidanttipuolustus↓ → LISÄÄ oksidatiivista stressiä", detail: "Melatoniini on voimakas antioksidantti. Sen menetys poistaa suojan kalsifikaation aiheuttanutta oksidatiivista stressiä vastaan → positiivinen takaisinkytkentä." },
      { step: "Melatoniini↓ → uni↓ → GABA↓ → Q↑", detail: "Tämä kytkeytyy Walkerin uniketjuun (takaisinkytkentäsilmukka 4). Spiraali syöttää resonanssimalliin." },
    ],
    pgcCorrelation: "Kliininen evidenssi: Alzheimerin taudin potilailla on 76 % PGC-esiintyvyys vs. 64 % ikävakioiduilla kontrolleilla. Unettomuuspotilailla on korkeampi PGC-aste suoralla korrelaatiolla melatoniinin vähenemiseen.",
    pgcRefs: "Mahlberg 2006 (AD), Kunz 2008 (unettomuus), Intechopen 2020 (melatoniini-sydän)",

    convergenceTitle: "Kolminkertainen konvergenssi",
    convergenceLead: "Kolme itsenäistä altistusreittiä konvergoivat samoihin molekyylitason kohteisiin:",
    convergenceRows: [
      {
        exposure: "EMF (RF/ELF)",
        target: "VGCC → Ca²⁺-sisäänvirtaus",
        downstream: "CaMKII, TPH-2, CSD-kynnys",
        population: "Universaali (sähköverkko + langattomat)",
      },
      {
        exposure: "Raskasmetallit (Cd, Pb, MeHg)",
        target: "VGCC-huokonen / CaM / T-tyypin johtavuus",
        downstream: "Sama CaMKII-kaskadi, mutta korruptoitu",
        population: "Teollinen + ravinnosta",
      },
      {
        exposure: "Kalsifikaatioagentit (Al, F)",
        target: "Pineaalirauhanen → melatoniini",
        downstream: "Uni → GABA → Q-tekijä",
        population: "Vesi + ruoka + rokotteet",
      },
    ],
    convergenceConclusion: "MIKÄ TAHANSA yksittäinen altistus tuottaa mitattavia vaikutuksia. Synergia on siinä, että jokainen POTENTIOI toisia: EMF avaa kanavia raskasmetalleille, raskasmetallit korruptoivat signaloinnin joka kompensoisi EMF:ää, ja kalsifikaatioagentit tuhoavat melatoniinijärjestelmän joka tarjoaa yöllisen palautumisen. Kysymys ei ole siitä, ovatko yksittäiset mekanismit olemassa — jokainen on verifioitu itsenäisesti — vaan tuottaako niiden konvergenssi nykyisissä populaatioissa emergenttejä haittoja jotka ylittävät osien summan.",

    shiftworkTitle: "Vuorotyö luonnollisena koeasetelmana",
    shiftworkLead: "Vuorotyöntekijät tarjoavat luonnollisen koeasetelman PGC → melatoniini → terveys -reitille.",
    shiftworkPoints: [
      "Krooninen valo yöllä suppressoi melatoniinia retinohypotalaamisen reitin kautta",
      "Vuorotyöntekijöillä korkeampi syöpäriski (IARC ryhmä 2A karsinogeeni), sydän- ja verisuonitauti, metabolinen oireyhtymä ja kognitiivinen heikkeneminen",
      "Nämä ovat SAMAT tilat jotka BERM ennustaa EMF → melatoniinisuppressiosta",
      "Reitti on sama (melatoniini↓); vain syöte eroaa (valo vs. EMF + PGC)",
      "Booker 2024: vuorotyöepidemiologia vahvistaa kroonisen melatoniinisuppression terveysvaikutukset",
    ],

    breastmilkTitle: "Melatoniini rintamaidossa",
    breastmilkLead: "Rintamaito sisältää melatoniinia vuorokausirytmissä — korkeana yöllä, matalana päivällä. Tämä tarjoaa eksogeenistä melatoniinia imeväiselle jonka oma pineaalirauhanen on kypsymätön.",
    breastmilkPoints: [
      "Neonataalinen pineaalirauhanen on toiminnallisesti kypsymätön → minimaalinen endogeeninen melatoniini",
      "Rintamaidon melatoniini huipussaan yöllä → tarjoaa vuorokausisignaalin imeväiselle",
      "Äidinmaidonkorvike sisältää NOLLA melatoniinia → korvikkeella ruokitut imeväiset ovat vailla tätä suojaavaa syötettä",
      "SIDS-huiput korreloivat äidinmaidonkorvikkeen käyttöasteiden kanssa populaatioiden välillä",
      "BERM-yhteys: EMF → äidin melatoniini↓ → rintamaidon melatoniini↓ → imeväisen suojaus↓",
    ],

    predictionLink: "Ks. raskasmetallisynergian ennusteet (METAL-EMF-1–4)",
    predictionHref: "/predictions",
  },
} as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const d = locale === "fi" ? COPY.fi : COPY.en;
  return {
    title: `${d.title} – Extinction Field`,
    description: d.subtitle,
  };
}

export default async function HeavyMetalSynergyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const activeLocale = locale === "fi" ? "fi" : "en";
  const d = COPY[activeLocale];
  const prefix = `/${locale}`;

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 sm:py-20">
      <p className="mb-6">
        <Link href={`${prefix}/evidence`} className="text-sm text-accent hover:underline">
          {d.backLink}
        </Link>
      </p>

      <PageHeader icon={FlaskRound} title={d.title} subtitle={d.subtitle} />

      <div className="mt-8">
        <CautionBox locale={activeLocale}>
          <p>{d.cautionText}</p>
        </CautionBox>
      </div>

      {/* VGCC gateway */}
      <section className="mt-12">
        <h2 className="text-lg font-semibold mb-2">{d.gatewayTitle}</h2>
        <p className="text-sm text-foreground-muted leading-relaxed mb-4 max-w-3xl">{d.gatewayLead}</p>
      </section>

      {/* Metal cards */}
      <section className="mt-10">
        <h2 className="text-lg font-semibold mb-2">{d.metalsTitle}</h2>
        <p className="text-sm text-foreground-muted leading-relaxed mb-6 max-w-3xl">{d.metalsLead}</p>
        <div className="space-y-4">
          {d.metals.map((metal) => (
            <div key={metal.symbol} className="rounded-xl border border-card-border bg-card-bg p-5">
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex items-center gap-3">
                  <span className="font-mono-num text-lg font-bold text-accent">{metal.symbol}</span>
                  <div>
                    <h3 className="font-semibold text-sm">{metal.name}</h3>
                    <p className="text-xs text-foreground-muted">{metal.mechanism}</p>
                  </div>
                </div>
                <span className={`shrink-0 px-2 py-0.5 rounded-full text-[10px] font-bold border ${LEVEL_COLORS[metal.level]}`}>
                  {metal.level}
                </span>
              </div>
              <p className="text-sm text-foreground-muted leading-relaxed mb-2">{metal.evidence}</p>
              <p className="text-sm text-foreground-muted leading-relaxed mb-3">{metal.detail}</p>
              <div className="rounded border border-accent/20 bg-accent/5 p-3">
                <p className="text-xs font-semibold text-accent mb-1">
                  {activeLocale === "fi" ? "EMF-synergia" : "EMF synergy"}
                </p>
                <p className="text-sm text-foreground-muted leading-relaxed">{metal.synergy}</p>
              </div>
              <p className="text-xs text-foreground-muted mt-2 italic">{metal.ref}</p>
            </div>
          ))}
        </div>
      </section>

      {/* PGC spiral */}
      <section className="mt-14 border-t editorial-rule pt-6">
        <h2 className="text-lg font-semibold mb-2">{d.pgcTitle}</h2>
        <p className="text-sm text-foreground-muted leading-relaxed mb-6 max-w-3xl">{d.pgcLead}</p>
        <div className="space-y-3">
          {d.pgcSteps.map((item, i) => (
            <div key={i} className="flex gap-3">
              <div className="shrink-0 w-8 h-8 rounded-full bg-red-500/10 text-red-500 flex items-center justify-center text-xs font-bold">
                {i + 1}
              </div>
              <div className="flex-1 rounded-lg border border-card-border bg-card-bg p-3">
                <p className="text-sm font-semibold mb-1">{item.step}</p>
                <p className="text-sm text-foreground-muted leading-relaxed">{item.detail}</p>
              </div>
            </div>
          ))}
          <div className="flex gap-3">
            <div className="shrink-0 w-8 h-8 rounded-full bg-red-500/10 text-red-500 flex items-center justify-center text-xs font-bold">
              ↺
            </div>
            <div className="flex-1 rounded-lg border border-red-500/20 bg-red-500/5 p-3">
              <p className="text-sm font-semibold mb-1">
                {activeLocale === "fi" ? "Sykli toistuu" : "Cycle repeats"}
              </p>
              <p className="text-sm text-foreground-muted leading-relaxed">{d.pgcCorrelation}</p>
              <p className="text-xs text-foreground-muted mt-1 italic">{d.pgcRefs}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Triple convergence */}
      <section className="mt-14 border-t editorial-rule pt-6">
        <h2 className="text-lg font-semibold mb-2">{d.convergenceTitle}</h2>
        <p className="text-sm text-foreground-muted leading-relaxed mb-6 max-w-3xl">{d.convergenceLead}</p>
        <div className="overflow-x-auto mb-6">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-card-border">
                <th className="text-left py-2 pr-4 font-medium text-foreground-muted text-xs uppercase tracking-wide">
                  {activeLocale === "fi" ? "Altistus" : "Exposure"}
                </th>
                <th className="text-left py-2 pr-4 font-medium text-foreground-muted text-xs uppercase tracking-wide">
                  {activeLocale === "fi" ? "Kohde" : "Target"}
                </th>
                <th className="text-left py-2 pr-4 font-medium text-foreground-muted text-xs uppercase tracking-wide">
                  {activeLocale === "fi" ? "Alavirtaan" : "Downstream"}
                </th>
                <th className="text-left py-2 font-medium text-foreground-muted text-xs uppercase tracking-wide">
                  {activeLocale === "fi" ? "Populaatio" : "Population"}
                </th>
              </tr>
            </thead>
            <tbody>
              {d.convergenceRows.map((row, i) => (
                <tr key={i} className="border-b border-card-border/50 last:border-0">
                  <td className="py-2.5 pr-4 text-foreground-muted font-medium">{row.exposure}</td>
                  <td className="py-2.5 pr-4 text-foreground-muted">{row.target}</td>
                  <td className="py-2.5 pr-4 text-foreground-muted">{row.downstream}</td>
                  <td className="py-2.5 text-foreground-muted">{row.population}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="rounded-lg border border-amber-500/20 bg-amber-500/5 p-4">
          <p className="text-sm leading-relaxed text-foreground-muted">{d.convergenceConclusion}</p>
        </div>
      </section>

      {/* Shiftwork */}
      <section className="mt-14 border-t editorial-rule pt-6">
        <h2 className="text-lg font-semibold mb-2">{d.shiftworkTitle}</h2>
        <p className="text-sm text-foreground-muted leading-relaxed mb-4 max-w-3xl">{d.shiftworkLead}</p>
        <div className="space-y-2">
          {d.shiftworkPoints.map((point, i) => (
            <div key={i} className="flex gap-2 text-sm text-foreground-muted leading-relaxed">
              <span className="text-accent shrink-0 mt-0.5">→</span>
              <p>{point}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Breast milk */}
      <section className="mt-14 border-t editorial-rule pt-6">
        <h2 className="text-lg font-semibold mb-2">{d.breastmilkTitle}</h2>
        <p className="text-sm text-foreground-muted leading-relaxed mb-4 max-w-3xl">{d.breastmilkLead}</p>
        <div className="space-y-2">
          {d.breastmilkPoints.map((point, i) => (
            <div key={i} className="flex gap-2 text-sm text-foreground-muted leading-relaxed">
              <span className="text-accent shrink-0 mt-0.5">→</span>
              <p>{point}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Predictions link */}
      <section className="mt-14 border-t editorial-rule pt-6">
        <DerivedPrediction>
          <p className="text-sm leading-relaxed mb-3">
            {activeLocale === "fi"
              ? "Raskasmetalli × EMF -synergia tuottaa neljä testattavaa ennustetta kelaatiointerventiosta, PGC-korrelaatiosta, kadmiumin kudoskertymästä ja metyylielohopean kynnysarvoista."
              : "Heavy metal × EMF synergy generates four testable predictions covering chelation intervention, PGC correlation, cadmium tissue accumulation, and methylmercury threshold values."}
          </p>
          <Link href={`${prefix}${d.predictionHref}`} className="text-sm text-accent hover:underline">
            {d.predictionLink} →
          </Link>
        </DerivedPrediction>
      </section>
    </div>
  );
}
