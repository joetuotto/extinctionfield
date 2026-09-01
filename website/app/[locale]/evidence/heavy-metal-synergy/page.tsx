import type { Metadata } from "next";
import Link from "next/link";
import { FlaskRound } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { CautionBox } from "@/components/CautionBox";
import { DerivedPrediction } from "@/components/DerivedPrediction";
import { InlineReferenceText } from "@/components/InlineReferenceText";
import { pickCopy } from "@/lib/i18n";

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
        ref: "[[ref:marchetti2013_heavy_metal|Marchetti 2013]]",
      },
      {
        symbol: "Pb²⁺",
        name: "Lead",
        mechanism: "Mimics Ca²⁺ at calmodulin (CaM) binding sites",
        evidence: "Pb²⁺ binds CaM with higher affinity than Ca²⁺ itself — displaces Ca²⁺ from CaM/CaMKII",
        level: "confirmed",
        detail: "Pb²⁺ doesn't just pass through the channel — it hijacks the downstream signaling. At calmodulin, Pb²⁺ binds the EF-hand domains with higher affinity than Ca²⁺, disrupting CaMKII activation. This means even trace Pb²⁺ in the cytoplasm can disrupt the entire Ca²⁺ signaling cascade.",
        synergy: "EMF → Ca²⁺ influx → CaM activation → Pb²⁺ displaces Ca²⁺ at CaM → signaling disrupted",
        ref: "Bhatt 2012, [[ref:bhatt2012_cav31_cd|Bhatt/Bhatt 2012 Cav3.1]]",
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
        ref: "[[ref:pgc2025_fluoride|PGC 2025 fluoride]], [[ref:pgc2026_convergent|PGC 2026 convergent]]",
      },
      {
        symbol: "F⁻",
        name: "Fluoride",
        mechanism: "Promotes pineal calcification and disrupts Ca²⁺ homeostasis",
        evidence: "Pineal accumulates more F⁻ than any other soft tissue; F⁻ concentration correlates with PGC grade",
        level: "confirmed",
        detail: "The pineal gland accumulates fluoride to concentrations exceeding bone. Fluoride replaces hydroxyl groups in hydroxyapatite, forming fluorapatite — more stable, harder to resorb. This makes pineal calcification progressive and essentially irreversible. The melatonin-suppressive effect compounds over decades.",
        synergy: "F⁻ makes PGC irreversible + EMF suppresses remaining melatonin production → permanent circadian disruption",
        ref: "[[ref:pgc2025_fluoride|PGC 2025 fluoride]]",
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
    pgcRefs: "[[ref:mahlberg2006_pgc_ad|Mahlberg 2006 (AD)]], [[ref:kunz2008_pgc_insomnia|Kunz 2008 (insomnia)]], [[ref:intechopen2020_melatonin_heart|Intechopen 2020 (melatonin-cardiac)]]",

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

    emfSynergyLabel: "EMF synergy",
    cycleRepeats: "Cycle repeats",
    tableExposure: "Exposure",
    tableTarget: "Target",
    tableDownstream: "Downstream",
    tablePopulation: "Population",
    derivedPredictionText: "Heavy metal × EMF synergy generates four testable predictions covering chelation intervention, PGC correlation, cadmium tissue accumulation, and methylmercury threshold values.",
    predictionLink: "See heavy metal synergy predictions (METAL-EMF-1–4)",
    predictionHref: "/predictions",
  },

  fi: {
    title: "Raskasmetalli × EMF -synergismi",
    subtitle:
      "Cd²⁺ läpäisee Cav3.1:n, Pb²⁺ matkii Ca²⁺:ia kalmoduliinissa, MeHg kasvattaa T-tyypin virtoja, Al³⁺ ja F⁻ kiihdyttävät pineaalisen kalsifikaation. EMF avaa portin; raskasmetallit kulkevat sen läpi. Yhdentyminen ei ole sattumaa — se on mekanistisesti väistämätöntä.",
    backLink: "← Takaisin näyttöön",

    cautionText:
      "Tämä sivu esittää raskasmetalli × EMF -synergismin mekanistisen perustan. Jokaisen metallin vuorovaikutus jänniteohjattujen kalsiumkanavien kanssa on todennettu itsenäisesti. Synergiahypoteesi — että EMF-altistus kasvattaa raskasmetallien myrkyllisyyttä avaamalla sisääntuloreitit — tuottaa tarkkoja testattavia ennusteita.",

    gatewayTitle: "VGCC-portti",
    gatewayLead:
      "Jänniteohjatut kalsiumkanavat (VGCC:t) eivät ole täydellisen selektiivisiä Ca²⁺:lle. Useat myrkylliset metallit voivat läpäistä avoimien VGCC-kanavien läpi tai matkia Ca²⁺:ia signaalireitin kohteissa. EMF avaa VGCC:t → myrkylliset metallit pääsevät sisään.",

    metalsTitle: "Metalli × VGCC -vuorovaikutukset",
    metalsLead: "Jokainen raskasmetalli vuorovaikuttaa kalsiumsignaalikaskadin kanssa tietyssä pisteessä. Yhdentyminen VGCC:ihin tarkoittaa, että EMF-altistus tehostaa KAIKKIA näitä vuorovaikutuksia samanaikaisesti.",
    metals: [
      {
        symbol: "Cd²⁺",
        name: "Kadmium",
        mechanism: "Permeoi Cav3.1 T-tyypin kanavien läpi",
        evidence: "Vahvistettu radioleimatulla ¹⁰⁹Cd²⁺:lla — suora läpäisy kanavan huokosen läpi",
        level: "confirmed",
        detail: "Cd²⁺:n ionisäde (0,95 Å) on riittävän lähellä Ca²⁺:ia (1,00 Å) kulkemaan Cav3.1:n selektiivisuussuodattimen läpi. T-tyypin kanavan ikkunavirta lähellä lepokalvopotentiaalia tarkoittaa, että Cd²⁺ voi kulkeutua sisään jopa ilman depolarisaatiota — EMF kasvattaa avautumistodennäköisyyttä → enemmän Cd²⁺-läpäisyä.",
        synergy: "EMF avaa Cav3.1:n → Cd²⁺:n sisäänvirtaus kasvaa vakiolla ulkoisella Cd²⁺-pitoisuudella",
        ref: "[[ref:marchetti2013_heavy_metal|Marchetti 2013]]",
      },
      {
        symbol: "Pb²⁺",
        name: "Lyijy",
        mechanism: "Matkii Ca²⁺:ia kalmoduliinin (CaM) sitoutumispaikoissa",
        evidence: "Pb²⁺ sitoutuu CaM:iin korkeammalla affiniteetilla kuin Ca²⁺ itse — syrjäyttää Ca²⁺:n CaM/CaMKII:sta",
        level: "confirmed",
        detail: "Pb²⁺ ei vain kulje kanavan läpi — se kaappaa signaalireitin. Kalmoduliinissa Pb²⁺ sitoutuu EF-käsi-domeeneihin korkeammalla affiniteetilla kuin Ca²⁺, häiriten CaMKII:n aktivaatiota. Tämä tarkoittaa, että jopa jälkimäärät Pb²⁺:ia sytoplasmassa voivat häiritä koko Ca²⁺-signaalikaskadin.",
        synergy: "EMF → Ca²⁺-sisäänvirtaus → CaM-aktivaatio → Pb²⁺ syrjäyttää Ca²⁺:n CaM:issa → signalointi häiriintyy",
        ref: "Bhatt 2012, [[ref:bhatt2012_cav31_cd|Bhatt/Bhatt 2012 Cav3.1]]",
      },
      {
        symbol: "MeHg",
        name: "Metyylielohopea",
        mechanism: "Kasvattaa T-tyypin Ca²⁺-virtoja",
        evidence: "MeHg tehostaa T-tyypin kanavan johtavuutta → enemmän Ca²⁺:ia per avautumistapahtuma",
        level: "experimental",
        detail: "Metyylielohopea ei läpäisee kanavaa — se muokkaa kanavan käyttäytymistä. MeHg kasvattaa T-tyypin kanavien johtavuutta, mikä tarkoittaa enemmän Ca²⁺:ia (ja Cd²⁺:ia) per kanavan avautuminen. Yhdistettynä EMF:n aiheuttamaan kasvaneeseen avautumistodennäköisyyteen tulos on multiplikatiivinen Ca²⁺-kuormitus.",
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
        ref: "[[ref:pgc2025_fluoride|PGC 2025 fluoridi]], [[ref:pgc2026_convergent|PGC 2026 yhdensuuntainen]]",
      },
      {
        symbol: "F⁻",
        name: "Fluoridi",
        mechanism: "Edistää pineaalisen kalsifikaation ja häiritsee Ca²⁺-homeostaasia",
        evidence: "Pineaalirauhanen kerää enemmän F⁻:ia kuin mikään muu pehmytkudos; F⁻-pitoisuus korreloi PGC-asteen kanssa",
        level: "confirmed",
        detail: "Pineaalirauhanen kerää fluoridia pitoisuuksiin jotka ylittävät luukudoksen. Fluoridi korvaa hydroksiryhmät hydroksiapatiitissa muodostaen fluorapatiittia — termodynaamisesti stabiilimpi, vaikeampi resorboida. Tämä tekee pineaalisesta kalsifikaatiosta etenevän ja olennaisesti palautumattoman. Melatoniinia suppressoiva vaikutus kumuloituu vuosikymmenten kuluessa.",
        synergy: "F⁻ tekee PGC:stä palautumattoman + EMF vaimentaa jäljellä olevaa melatoniinin tuotantoa → pysyvä vuorokausirytmin häiriö",
        ref: "[[ref:pgc2025_fluoride|PGC 2025 fluoridi]]",
      },
    ],

    pgcTitle: "Pineaalisen kalsifikaation spiraali",
    pgcLead:
      "Pineaalirauhasen kalsifikaatio (PGC) on kohta jossa raskasmetallit, fluoridi ja EMF yhtyvät yhteen anatomiseen rakenteeseen. Tuloksena on itseään vahvistava melatoniinin menetyksen spiraali.",
    pgcSteps: [
      { step: "EMF → oksidatiivinen stressi pineaalirauhasessa", detail: "Pinealosyytit ovat metabolisesti aktiivisia ja EMF-herkkiä. Oksidatiivinen stressi vahingoittaa solukalvoja ja edistää Ca²⁺/PO₄-kertymistä." },
      { step: "Ca²⁺ + PO₄ → hydroksiapatiittikiteet muodostuvat", detail: "Alkuvaiheen kalsifikaatio luo ydintymiskohtia lisäkiteiden kasvulle." },
      { step: "Al³⁺ kiihdyttää kiteiden ydintymistä", detail: "Alumiini toimii hydroksiapatiittikiteiden siemenenä, laskien kalsifikaation kynnystä." },
      { step: "F⁻ muuntaa hydroksiapatiittia → fluorapatiittia", detail: "Fluorapatiitti on termodynaamisesti stabiilimpi — kalsifikaatiosta tulee palautumaton." },
      { step: "Kalsifioitunut kudos ≠ toiminnalliset pinealosyytit", detail: "Jokainen kalsifioitunut alue lopettaa pysyvästi melatoniinin tuotannon. r=0,569 kalsifioitumattoman kudostilavuuden ja melatoniinituotannon välillä." },
      { step: "Melatoniini↓ → antioksidanttipuolustus↓ → LISÄÄ oksidatiivista stressiä", detail: "Melatoniini on voimakas antioksidantti. Sen menetys poistaa suojan kalsifikaation aiheuttanutta oksidatiivista stressiä vastaan → positiivinen takaisinkytkentä." },
      { step: "Melatoniini↓ → uni↓ → GABA↓ → Q↑", detail: "Tämä kytkeytyy Walkerin uniketjuun (takaisinkytkentäsilmukka 4). Spiraali syöttää resonanssimalliin." },
    ],
    pgcCorrelation: "Kliininen näyttö: Alzheimerin taudin potilailla on 76 % PGC-esiintyvyys vs. 64 % ikävakioiduilla kontrolleilla. Unettomuuspotilailla on korkeampi PGC-aste suoralla korrelaatiolla melatoniinin vähenemiseen.",
    pgcRefs: "[[ref:mahlberg2006_pgc_ad|Mahlberg 2006 (AD)]], [[ref:kunz2008_pgc_insomnia|Kunz 2008 (unettomuus)]], [[ref:intechopen2020_melatonin_heart|Intechopen 2020 (melatoniini-sydän)]]",

    convergenceTitle: "Kolminkertainen yhdentyminen",
    convergenceLead: "Kolme itsenäistä altistusreittiä yhtyvät samoihin molekyylitason kohteisiin:",
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
    convergenceConclusion: "MIKÄ TAHANSA yksittäinen altistus tuottaa mitattavia vaikutuksia. Synergia on siinä, että jokainen POTENTIOI toisia: EMF avaa kanavia raskasmetalleille, raskasmetallit korruptoivat signaloinnin joka kompensoisi EMF:ää, ja kalsifikaatioagentit tuhoavat melatoniinijärjestelmän joka tarjoaa yöllisen palautumisen. Kysymys ei ole siitä, ovatko yksittäiset mekanismit olemassa — jokainen on todennettu itsenäisesti — vaan tuottaako niiden yhdentyminen nykyisissä populaatioissa emergenttejä haittoja jotka ylittävät osien summan.",

    shiftworkTitle: "Vuorotyö luonnollisena koeasetelmana",
    shiftworkLead: "Vuorotyöntekijät tarjoavat luonnollisen koeasetelman PGC → melatoniini → terveys -reitille.",
    shiftworkPoints: [
      "Krooninen valo yöllä vaimentaa melatoniinia retinohypotalaamisen reitin kautta",
      "Vuorotyöntekijöillä korkeampi syöpäriski (IARC ryhmä 2A karsinogeeni), sydän- ja verisuonitauti, metabolinen oireyhtymä ja kognitiivinen heikkeneminen",
      "Nämä ovat SAMAT tilat jotka BERM ennustaa EMF → melatoniinivaimennuksesta",
      "Reitti on sama (melatoniini↓); vain syöte eroaa (valo vs. EMF + PGC)",
      "Booker 2024: vuorotyöepidemiologia vahvistaa kroonisen melatoniinivaimennuksen terveysvaikutukset",
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

    emfSynergyLabel: "EMF-synergia",
    cycleRepeats: "Sykli toistuu",
    tableExposure: "Altistus",
    tableTarget: "Kohde",
    tableDownstream: "Alavirtaan",
    tablePopulation: "Populaatio",
    derivedPredictionText: "Raskasmetalli × EMF -synergia tuottaa neljä testattavaa ennustetta kelaatiointerventiosta, PGC-korrelaatiosta, kadmiumin kudoskertymästä ja metyylielohopean kynnysarvoista.",
    predictionLink: "Ks. raskasmetallisynergian ennusteet (METAL-EMF-1–4)",
    predictionHref: "/predictions",
  },

  ja: {
    title: "重金属 × EMF シナジー",
    subtitle:
      "Cd²⁺はCav3.1を透過し、Pb²⁺はカルモジュリンでCa²⁺を模倣し、MeHgはT型電流を増加させ、Al³⁺とF⁻は松果体石灰化を促進する。EMFがゲートを開き、重金属がそこを通過する。この収束は偶然ではない――メカニズム的に不可避である。",
    backLink: "← エビデンスに戻る",
    cautionText:
      "このページは重金属 × EMFシナジーのメカニズム的基盤を提示します。各金属の電位依存性カルシウムチャネルとの相互作用は独立に検証されています。シナジー仮説――EMF曝露が侵入経路を開くことで重金属の毒性を増加させる――は特定の検証可能な予測を生成します。",
    gatewayTitle: "VGCCゲートウェイ",
    gatewayLead:
      "電位依存性カルシウムチャネル（VGCC）はCa²⁺に対して完全に選択的ではありません。いくつかの毒性金属は開口したVGCCを透過するか、下流シグナル部位でCa²⁺を模倣できます。EMFがVGCCを開く → 毒性金属が侵入する。",
    metalsTitle: "金属 × VGCC 相互作用",
    metalsLead: "各重金属はカルシウムシグナリングカスケードの特定のポイントで相互作用します。VGCCへの収束は、EMF曝露がこれらの相互作用すべてを同時に増強することを意味します。",
    metals: [
      {
        symbol: "Cd²⁺",
        name: "カドミウム",
        mechanism: "Cav3.1 T型チャネルを透過",
        evidence: "放射標識¹⁰⁹Cd²⁺で確認――チャネル孔を通じた直接透過",
        level: "confirmed",
        detail: "Cd²⁺のイオン半径（0.95 Å）はCa²⁺（1.00 Å）に十分近く、Cav3.1の選択性フィルターを通過できます。T型チャネルの静止電位付近のウィンドウ電流は、脱分極なしでもCd²⁺が侵入できることを意味します――EMFが開口確率を増加 → より多くのCd²⁺透過。",
        synergy: "EMFがCav3.1を開く → 外部Cd²⁺濃度一定でCd²⁺侵入が増加",
        ref: "[[ref:marchetti2013_heavy_metal|Marchetti 2013]]",
      },
      {
        symbol: "Pb²⁺",
        name: "鉛",
        mechanism: "カルモジュリン（CaM）結合部位でCa²⁺を模倣",
        evidence: "Pb²⁺はCa²⁺自体よりも高い親和性でCaMに結合――CaM/CaMKIIからCa²⁺を置換",
        level: "confirmed",
        detail: "Pb²⁺は単にチャネルを通過するのではなく、下流シグナリングを乗っ取ります。カルモジュリンでは、Pb²⁺がCa²⁺よりも高い親和性でEF-handドメインに結合し、CaMKII活性化を撹乱します。これは細胞質中の微量のPb²⁺でもCa²⁺シグナリングカスケード全体を撹乱できることを意味します。",
        synergy: "EMF → Ca²⁺流入 → CaM活性化 → Pb²⁺がCaMでCa²⁺を置換 → シグナリング撹乱",
        ref: "Bhatt 2012, [[ref:bhatt2012_cav31_cd|Bhatt/Bhatt 2012 Cav3.1]]",
      },
      {
        symbol: "MeHg",
        name: "メチル水銀",
        mechanism: "T型Ca²⁺電流を増加",
        evidence: "MeHgがT型チャネルのコンダクタンスを増強 → 開口イベントあたりのCa²⁺増加",
        level: "experimental",
        detail: "メチル水銀はチャネルを透過しません――チャネルの挙動を変化させます。MeHgはT型チャネルのコンダクタンスを増加させ、チャネル開口あたりのCa²⁺（およびCd²⁺）侵入量が増加します。EMF誘発の開口確率増加と組み合わせると、結果は乗法的なCa²⁺過負荷です。",
        synergy: "EMFが開口確率を増加 × MeHgがコンダクタンスを増加 = 乗法的Ca²⁺過負荷",
        ref: "Bhatt 2012",
      },
      {
        symbol: "Al³⁺",
        name: "アルミニウム",
        mechanism: "松果体石灰化（PGC）を促進",
        evidence: "Al³⁺は松果体を含む軟組織でハイドロキシアパタイト結晶の核形成を促進",
        level: "mechanistic",
        detail: "Al³⁺はハイドロキシアパタイト結晶形成の核形成剤として機能します。松果体では石灰化を促進 → メラトニン産生を減少 → 概日リズムを撹乱 → 睡眠依存のGABA回復を障害します。これはWalkerの睡眠連鎖フィードバックループに接続します。",
        synergy: "EMF → 酸化ストレス → Ca²⁺沈着 + Al³⁺核形成 → 加速されたPGC → メラトニン↓",
        ref: "[[ref:pgc2025_fluoride|PGC 2025 fluoride]], [[ref:pgc2026_convergent|PGC 2026 convergent]]",
      },
      {
        symbol: "F⁻",
        name: "フッ化物",
        mechanism: "松果体石灰化を促進し、Ca²⁺恒常性を撹乱",
        evidence: "松果体は他のどの軟組織よりも多くのF⁻を蓄積；F⁻濃度はPGCグレードと相関",
        level: "confirmed",
        detail: "松果体は骨組織を超える濃度までフッ化物を蓄積します。フッ化物はハイドロキシアパタイト中の水酸基を置換してフルオロアパタイトを形成します――より安定で、再吸収が困難です。これにより松果体石灰化は進行性かつ本質的に不可逆となります。メラトニン抑制効果は数十年にわたり蓄積します。",
        synergy: "F⁻がPGCを不可逆化 + EMFが残存メラトニン産生を抑制 → 永続的概日リズム撹乱",
        ref: "[[ref:pgc2025_fluoride|PGC 2025 fluoride]]",
      },
    ],
    pgcTitle: "松果体石灰化スパイラル",
    pgcLead:
      "松果体石灰化（PGC）は重金属、フッ化物、EMFが単一の解剖学的構造に収束する場所です。結果は自己強化的なメラトニン喪失のスパイラルです。",
    pgcSteps: [
      { step: "EMF → 松果体の酸化ストレス", detail: "松果体細胞は代謝的に活発でEMF感受性が高い。酸化ストレスは細胞膜を損傷し、Ca²⁺/PO₄沈着を促進する。" },
      { step: "Ca²⁺ + PO₄ → ハイドロキシアパタイト結晶が形成", detail: "初期石灰化がさらなる結晶成長の核形成部位を創出する。" },
      { step: "Al³⁺が結晶核形成を促進", detail: "アルミニウムがハイドロキシアパタイト形成の種として機能し、石灰化の閾値を低下させる。" },
      { step: "F⁻がハイドロキシアパタイト → フルオロアパタイトに変換", detail: "フルオロアパタイトは熱力学的により安定――石灰化は不可逆となる。" },
      { step: "石灰化組織 ≠ 機能的松果体細胞", detail: "石灰化した各領域は永続的にメラトニン産生を停止する。非石灰化組織体積とメラトニン出力の間にr=0.569。" },
      { step: "メラトニン↓ → 抗酸化防御↓ → さらなる酸化ストレス", detail: "メラトニンは強力な抗酸化物質。その喪失は石灰化を引き起こした酸化ストレスに対する防御を除去する → 正のフィードバック。" },
      { step: "メラトニン↓ → 睡眠↓ → GABA↓ → Q↑", detail: "これはWalkerの睡眠連鎖（フィードバックループ4）に接続する。スパイラルは共鳴モデルに供給される。" },
    ],
    pgcCorrelation: "臨床的エビデンス：アルツハイマー病患者は年齢一致対照群の64%に対し76%のPGC有病率を示す。不眠症患者はメラトニン減少との直接相関を伴うより高いPGCグレードを示す。",
    pgcRefs: "[[ref:mahlberg2006_pgc_ad|Mahlberg 2006 (AD)]], [[ref:kunz2008_pgc_insomnia|Kunz 2008 (insomnia)]], [[ref:intechopen2020_melatonin_heart|Intechopen 2020 (melatonin-cardiac)]]",
    convergenceTitle: "三重収束",
    convergenceLead: "3つの独立した曝露経路が同じ分子標的に収束する：",
    convergenceRows: [
      {
        exposure: "EMF (RF/ELF)",
        target: "VGCC → Ca²⁺流入",
        downstream: "CaMKII, TPH-2, CSD閾値",
        population: "普遍的（電力網 + 無線）",
      },
      {
        exposure: "重金属 (Cd, Pb, MeHg)",
        target: "VGCC孔 / CaM / T型コンダクタンス",
        downstream: "同じCaMKIIカスケード、ただし破損",
        population: "産業 + 食事由来",
      },
      {
        exposure: "石灰化促進物質 (Al, F)",
        target: "松果体 → メラトニン",
        downstream: "睡眠 → GABA → Q因子",
        population: "水 + 食品 + ワクチン",
      },
    ],
    convergenceConclusion: "いずれか一つの曝露でも測定可能な影響を生じます。シナジーとは、各々が他を増強することです：EMFが重金属のためのチャネルを開き、重金属がEMFを補償するシグナリングを破壊し、石灰化促進物質が夜間の回復を提供するメラトニンシステムを破壊します。問題は個々のメカニズムが存在するかどうかではなく――各々は独立に検証されています――現代の集団におけるそれらの収束が部分の総和を超える創発的害を生じるかどうかです。",
    shiftworkTitle: "自然実験としてのシフトワーク",
    shiftworkLead: "シフトワーカーはPGC → メラトニン → 健康経路の自然実験を提供します。",
    shiftworkPoints: [
      "夜間の慢性的光曝露が網膜視床下部路を介してメラトニンを抑制",
      "シフトワーカーはがん（IARC グループ2A発がん物質）、心血管疾患、メタボリックシンドローム、認知機能低下のリスクが高い",
      "これらはBERMがEMF → メラトニン抑制から予測する同じ疾患",
      "経路は同じ（メラトニン↓）；入力のみが異なる（光 vs. EMF + PGC）",
      "Booker 2024：シフトワーク疫学が慢性的メラトニン抑制の健康への影響を確認",
    ],
    breastmilkTitle: "母乳中のメラトニン",
    breastmilkLead: "母乳は概日パターンでメラトニンを含む――夜間に高く、日中に低い。これは松果体が未成熟な乳児に外因性メラトニンを提供する。",
    breastmilkPoints: [
      "新生児の松果体は機能的に未成熟 → 最小限の内因性メラトニン",
      "母乳メラトニンは夜間にピーク → 乳児に概日シグナルを提供",
      "人工乳はメラトニンをゼロ含有 → 人工乳哺育児はこの保護的入力を欠く",
      "SIDSのピークは集団間の人工乳使用率と相関",
      "BERM関連：EMF → 母体メラトニン↓ → 母乳メラトニン↓ → 乳児保護↓",
    ],
    emfSynergyLabel: "EMFシナジー",
    cycleRepeats: "サイクル繰り返し",
    tableExposure: "曝露",
    tableTarget: "標的",
    tableDownstream: "下流",
    tablePopulation: "集団",
    derivedPredictionText: "重金属 × EMFシナジーは、キレーション介入、PGC相関、カドミウム組織蓄積、メチル水銀閾値に関する4つの検証可能な予測を生成します。",
    predictionLink: "重金属シナジー予測を参照（METAL-EMF-1–4）",
    predictionHref: "/predictions",
  },

  fr: {
    title: "Synergie métaux lourds × EMF",
    subtitle:
      "Cd²⁺ perméabilise Cav3.1, Pb²⁺ mime Ca²⁺ à la calmoduline, MeHg augmente les courants de type T, Al³⁺ et F⁻ accélèrent la calcification pinéale. Les EMF ouvrent la porte ; les métaux lourds la franchissent. La convergence n'est pas une coïncidence — elle est mécanistiquement inévitable.",
    backLink: "← Retour aux preuves",
    cautionText:
      "Cette page présente la base mécanistique de la synergie métaux lourds × EMF. L'interaction de chaque métal avec les canaux calciques voltage-dépendants a été vérifiée indépendamment. L'hypothèse de synergie — selon laquelle l'exposition aux EMF augmente la toxicité des métaux lourds en ouvrant les voies d'entrée — génère des prédictions testables spécifiques.",
    gatewayTitle: "La porte VGCC",
    gatewayLead:
      "Les canaux calciques voltage-dépendants (VGCC) ne sont pas parfaitement sélectifs pour Ca²⁺. Plusieurs métaux toxiques peuvent perméer à travers les VGCC ouverts ou mimer Ca²⁺ aux sites de signalisation en aval. Les EMF ouvrent les VGCC → les métaux toxiques pénètrent.",
    metalsTitle: "Interactions métal × VGCC",
    metalsLead: "Chaque métal lourd interagit avec la cascade de signalisation calcique à un point spécifique. La convergence sur les VGCC signifie que l'exposition aux EMF potentialise TOUTES ces interactions simultanément.",
    metals: [
      {
        symbol: "Cd²⁺",
        name: "Cadmium",
        mechanism: "Perméabilise les canaux T de type Cav3.1",
        evidence: "Confirmé avec du ¹⁰⁹Cd²⁺ radiomarqué — perméation directe à travers le pore du canal",
        level: "confirmed",
        detail: "Le rayon ionique du Cd²⁺ (0,95 Å) est suffisamment proche de Ca²⁺ (1,00 Å) pour traverser le filtre de sélectivité de Cav3.1. Le courant de fenêtre du canal T près du potentiel de repos signifie que le Cd²⁺ peut entrer même sans dépolarisation — les EMF augmentent la probabilité d'ouverture → plus de perméation de Cd²⁺.",
        synergy: "Les EMF ouvrent Cav3.1 → l'entrée de Cd²⁺ augmente à concentration externe constante de Cd²⁺",
        ref: "[[ref:marchetti2013_heavy_metal|Marchetti 2013]]",
      },
      {
        symbol: "Pb²⁺",
        name: "Plomb",
        mechanism: "Mime Ca²⁺ aux sites de liaison de la calmoduline (CaM)",
        evidence: "Pb²⁺ se lie à CaM avec une affinité supérieure à Ca²⁺ — déplace Ca²⁺ de CaM/CaMKII",
        level: "confirmed",
        detail: "Pb²⁺ ne se contente pas de traverser le canal — il détourne la signalisation en aval. À la calmoduline, Pb²⁺ se lie aux domaines EF-hand avec une affinité supérieure à Ca²⁺, perturbant l'activation de CaMKII. Cela signifie que même des traces de Pb²⁺ dans le cytoplasme peuvent perturber toute la cascade de signalisation Ca²⁺.",
        synergy: "EMF → influx Ca²⁺ → activation CaM → Pb²⁺ déplace Ca²⁺ sur CaM → signalisation perturbée",
        ref: "Bhatt 2012, [[ref:bhatt2012_cav31_cd|Bhatt/Bhatt 2012 Cav3.1]]",
      },
      {
        symbol: "MeHg",
        name: "Méthylmercure",
        mechanism: "Augmente les courants Ca²⁺ de type T",
        evidence: "MeHg augmente la conductance des canaux T → plus de Ca²⁺ par événement d'ouverture",
        level: "experimental",
        detail: "Le méthylmercure ne perméabilise pas le canal — il modifie le comportement du canal. MeHg augmente la conductance des canaux T, ce qui signifie plus de Ca²⁺ (et de Cd²⁺) par ouverture. Combiné avec l'augmentation de la probabilité d'ouverture induite par les EMF, le résultat est une surcharge calcique multiplicative.",
        synergy: "Les EMF augmentent la probabilité d'ouverture × MeHg augmente la conductance = surcharge Ca²⁺ multiplicative",
        ref: "Bhatt 2012",
      },
      {
        symbol: "Al³⁺",
        name: "Aluminium",
        mechanism: "Accélère la calcification de la glande pinéale (PGC)",
        evidence: "Al³⁺ favorise la nucléation des cristaux d'hydroxyapatite dans les tissus mous, y compris la glande pinéale",
        level: "mechanistic",
        detail: "Al³⁺ agit comme agent de nucléation pour la formation de cristaux d'hydroxyapatite. Dans la glande pinéale, cela accélère la calcification → réduit la production de mélatonine → perturbe le rythme circadien → altère la restauration du GABA dépendante du sommeil. Cela se connecte à la boucle de rétroaction de la chaîne de sommeil de Walker.",
        synergy: "EMF → stress oxydatif → dépôt Ca²⁺ + nucléation Al³⁺ → PGC accélérée → mélatonine↓",
        ref: "[[ref:pgc2025_fluoride|PGC 2025 fluoride]], [[ref:pgc2026_convergent|PGC 2026 convergent]]",
      },
      {
        symbol: "F⁻",
        name: "Fluorure",
        mechanism: "Favorise la calcification pinéale et perturbe l'homéostasie Ca²⁺",
        evidence: "La glande pinéale accumule plus de F⁻ que tout autre tissu mou ; la concentration de F⁻ corrèle avec le grade de PGC",
        level: "confirmed",
        detail: "La glande pinéale accumule le fluorure à des concentrations dépassant le tissu osseux. Le fluorure remplace les groupes hydroxyle dans l'hydroxyapatite, formant de la fluorapatite — plus stable thermodynamiquement, plus difficile à résorber. Cela rend la calcification pinéale progressive et essentiellement irréversible. L'effet suppresseur de mélatonine s'accumule sur des décennies.",
        synergy: "F⁻ rend la PGC irréversible + les EMF suppriment la production résiduelle de mélatonine → perturbation circadienne permanente",
        ref: "[[ref:pgc2025_fluoride|PGC 2025 fluoride]]",
      },
    ],
    pgcTitle: "La spirale de calcification pinéale",
    pgcLead:
      "La calcification de la glande pinéale (PGC) est le point de convergence des métaux lourds, du fluorure et des EMF sur une structure anatomique unique. Le résultat est une spirale auto-renforçante de perte de mélatonine.",
    pgcSteps: [
      { step: "EMF → stress oxydatif dans la glande pinéale", detail: "Les pinéalocytes sont métaboliquement actifs et sensibles aux EMF. Le stress oxydatif endommage les membranes cellulaires et favorise le dépôt Ca²⁺/PO₄." },
      { step: "Ca²⁺ + PO₄ → formation de cristaux d'hydroxyapatite", detail: "La calcification initiale crée des sites de nucléation pour la croissance cristalline ultérieure." },
      { step: "Al³⁺ accélère la nucléation cristalline", detail: "L'aluminium agit comme germe pour la formation d'hydroxyapatite, abaissant le seuil de calcification." },
      { step: "F⁻ convertit l'hydroxyapatite → fluorapatite", detail: "La fluorapatite est plus stable thermodynamiquement — la calcification devient irréversible." },
      { step: "Tissu calcifié ≠ pinéalocytes fonctionnels", detail: "Chaque région calcifiée cesse définitivement de produire de la mélatonine. r=0,569 entre le volume de tissu non calcifié et la production de mélatonine." },
      { step: "Mélatonine↓ → défense antioxydante↓ → PLUS de stress oxydatif", detail: "La mélatonine est un puissant antioxydant. Sa perte supprime la protection contre le stress oxydatif qui a causé la calcification → rétroaction positive." },
      { step: "Mélatonine↓ → sommeil↓ → GABA↓ → Q↑", detail: "Cela se connecte à la chaîne de sommeil de Walker (boucle de rétroaction 4). La spirale alimente le modèle de résonance." },
    ],
    pgcCorrelation: "Preuve clinique : les patients atteints de la maladie d'Alzheimer présentent une prévalence de PGC de 76 % contre 64 % chez les témoins appariés par âge. Les patients insomniaques présentent un grade de PGC plus élevé avec corrélation directe à la réduction de mélatonine.",
    pgcRefs: "[[ref:mahlberg2006_pgc_ad|Mahlberg 2006 (AD)]], [[ref:kunz2008_pgc_insomnia|Kunz 2008 (insomnie)]], [[ref:intechopen2020_melatonin_heart|Intechopen 2020 (mélatonine-cardiaque)]]",
    convergenceTitle: "La triple convergence",
    convergenceLead: "Trois voies d'exposition indépendantes convergent vers les mêmes cibles moléculaires :",
    convergenceRows: [
      {
        exposure: "EMF (RF/ELF)",
        target: "VGCC → influx Ca²⁺",
        downstream: "CaMKII, TPH-2, seuil CSD",
        population: "Universel (réseau + sans fil)",
      },
      {
        exposure: "Métaux lourds (Cd, Pb, MeHg)",
        target: "Pore VGCC / CaM / conductance T",
        downstream: "Même cascade CaMKII, mais corrompue",
        population: "Industriel + alimentaire",
      },
      {
        exposure: "Agents de calcification (Al, F)",
        target: "Glande pinéale → mélatonine",
        downstream: "Sommeil → GABA → facteur Q",
        population: "Eau + alimentation + vaccins",
      },
    ],
    convergenceConclusion: "N'importe LAQUELLE de ces expositions produit des effets mesurables. La synergie réside dans le fait que chacune POTENTIALISE les autres : les EMF ouvrent les canaux aux métaux lourds, les métaux lourds corrompent la signalisation qui compenserait les EMF, et les agents de calcification détruisent le système mélatonine qui assure la récupération nocturne. La question n'est pas de savoir si les mécanismes individuels existent — chacun a été vérifié indépendamment — mais si leur convergence dans les populations modernes produit des dommages émergents supérieurs à la somme des parties.",
    shiftworkTitle: "Le travail posté comme expérience naturelle",
    shiftworkLead: "Les travailleurs postés fournissent une expérience naturelle pour la voie PGC → mélatonine → santé.",
    shiftworkPoints: [
      "L'exposition chronique à la lumière nocturne supprime la mélatonine via le tractus rétino-hypothalamique",
      "Les travailleurs postés présentent des taux plus élevés de cancer (cancérogène IARC Groupe 2A), maladies cardiovasculaires, syndrome métabolique et déclin cognitif",
      "Ce sont les MÊMES conditions que BERM prédit à partir de EMF → suppression de mélatonine",
      "La voie est la même (mélatonine↓) ; seule l'entrée diffère (lumière vs. EMF + PGC)",
      "Booker 2024 : l'épidémiologie du travail posté confirme les conséquences sanitaires de la suppression chronique de mélatonine",
    ],
    breastmilkTitle: "La mélatonine dans le lait maternel",
    breastmilkLead: "Le lait maternel contient de la mélatonine selon un rythme circadien — élevée la nuit, basse le jour. Cela fournit de la mélatonine exogène au nourrisson dont la glande pinéale est immature.",
    breastmilkPoints: [
      "La glande pinéale néonatale est fonctionnellement immature → mélatonine endogène minimale",
      "La mélatonine du lait maternel atteint son pic la nuit → fournit un signal circadien au nourrisson",
      "Les préparations pour nourrissons contiennent ZÉRO mélatonine → les nourrissons nourris au biberon manquent de cet apport protecteur",
      "Les pics de SIDS corrèlent avec les taux d'alimentation au biberon entre les populations",
      "Connexion BERM : EMF → mélatonine maternelle↓ → mélatonine du lait maternel↓ → protection du nourrisson↓",
    ],
    emfSynergyLabel: "Synergie EMF",
    cycleRepeats: "Le cycle se répète",
    tableExposure: "Exposition",
    tableTarget: "Cible",
    tableDownstream: "En aval",
    tablePopulation: "Population",
    derivedPredictionText: "La synergie métaux lourds × EMF génère quatre prédictions testables couvrant l'intervention par chélation, la corrélation PGC, l'accumulation tissulaire de cadmium et les valeurs seuils du méthylmercure.",
    predictionLink: "Voir les prédictions de synergie des métaux lourds (METAL-EMF-1–4)",
    predictionHref: "/predictions",
  },

  ko: {
    title: "중금속 × EMF 시너지",
    subtitle:
      "Cd²⁺는 Cav3.1을 투과하고, Pb²⁺는 칼모듈린에서 Ca²⁺를 모방하며, MeHg는 T형 전류를 증가시키고, Al³⁺와 F⁻는 송과체 석회화를 가속한다. EMF가 문을 열고 중금속이 통과한다. 이 수렴은 우연이 아니다 — 메커니즘적으로 불가피하다.",
    backLink: "← 증거로 돌아가기",
    cautionText:
      "이 페이지는 중금속 × EMF 시너지의 메커니즘적 기반을 제시합니다. 각 금속의 전압 의존성 칼슘 채널과의 상호작용은 독립적으로 검증되었습니다. 시너지 가설 — EMF 노출이 진입 경로를 열어 중금속 독성을 증가시킨다는 것 — 은 특정 검증 가능한 예측을 생성합니다.",
    gatewayTitle: "VGCC 게이트웨이",
    gatewayLead:
      "전압 의존성 칼슘 채널(VGCC)은 Ca²⁺에 대해 완벽하게 선택적이지 않습니다. 여러 독성 금속이 열린 VGCC를 통해 투과하거나 하류 신호 부위에서 Ca²⁺를 모방할 수 있습니다. EMF가 VGCC를 열면 → 독성 금속이 진입합니다.",
    metalsTitle: "금속 × VGCC 상호작용",
    metalsLead: "각 중금속은 칼슘 신호 캐스케이드의 특정 지점에서 상호작용합니다. VGCC로의 수렴은 EMF 노출이 이 모든 상호작용을 동시에 강화함을 의미합니다.",
    metals: [
      {
        symbol: "Cd²⁺",
        name: "카드뮴",
        mechanism: "Cav3.1 T형 채널을 투과",
        evidence: "방사성 표지 ¹⁰⁹Cd²⁺로 확인 — 채널 구멍을 통한 직접 투과",
        level: "confirmed",
        detail: "Cd²⁺의 이온 반경(0.95 Å)은 Ca²⁺(1.00 Å)에 충분히 가까워 Cav3.1 선택성 필터를 통과할 수 있습니다. 정지 전위 근처의 T형 채널 윈도우 전류는 탈분극 없이도 Cd²⁺가 진입할 수 있음을 의미합니다 — EMF가 개방 확률을 증가 → 더 많은 Cd²⁺ 투과.",
        synergy: "EMF가 Cav3.1을 열면 → 일정한 외부 Cd²⁺ 농도에서 Cd²⁺ 진입 증가",
        ref: "[[ref:marchetti2013_heavy_metal|Marchetti 2013]]",
      },
      {
        symbol: "Pb²⁺",
        name: "납",
        mechanism: "칼모듈린(CaM) 결합 부위에서 Ca²⁺를 모방",
        evidence: "Pb²⁺는 Ca²⁺ 자체보다 높은 친화도로 CaM에 결합 — CaM/CaMKII에서 Ca²⁺를 대체",
        level: "confirmed",
        detail: "Pb²⁺는 단순히 채널을 통과하는 것이 아니라 하류 신호전달을 탈취합니다. 칼모듈린에서 Pb²⁺는 Ca²⁺보다 높은 친화도로 EF-hand 도메인에 결합하여 CaMKII 활성화를 교란합니다. 이는 세포질 내 미량의 Pb²⁺로도 전체 Ca²⁺ 신호 캐스케이드를 교란할 수 있음을 의미합니다.",
        synergy: "EMF → Ca²⁺ 유입 → CaM 활성화 → Pb²⁺가 CaM에서 Ca²⁺를 대체 → 신호전달 교란",
        ref: "Bhatt 2012, [[ref:bhatt2012_cav31_cd|Bhatt/Bhatt 2012 Cav3.1]]",
      },
      {
        symbol: "MeHg",
        name: "메틸수은",
        mechanism: "T형 Ca²⁺ 전류를 증가",
        evidence: "MeHg가 T형 채널 전도도를 증강 → 개방 이벤트당 더 많은 Ca²⁺",
        level: "experimental",
        detail: "메틸수은은 채널을 투과하지 않습니다 — 채널 행동을 변화시킵니다. MeHg는 T형 채널의 전도도를 증가시켜 채널 개방당 더 많은 Ca²⁺(및 Cd²⁺)가 진입합니다. EMF에 의한 개방 확률 증가와 결합하면 결과는 곱셈적 Ca²⁺ 과부하입니다.",
        synergy: "EMF가 개방 확률 증가 × MeHg가 전도도 증가 = 곱셈적 Ca²⁺ 과부하",
        ref: "Bhatt 2012",
      },
      {
        symbol: "Al³⁺",
        name: "알루미늄",
        mechanism: "송과체 석회화(PGC)를 가속",
        evidence: "Al³⁺는 송과체를 포함한 연조직에서 하이드록시아파타이트 결정 핵형성을 촉진",
        level: "mechanistic",
        detail: "Al³⁺는 하이드록시아파타이트 결정 형성의 핵형성제로 기능합니다. 송과체에서 이는 석회화를 가속 → 멜라토닌 생산 감소 → 일주기 리듬 교란 → 수면 의존적 GABA 복원 장애. 이는 Walker 수면 사슬 피드백 루프와 연결됩니다.",
        synergy: "EMF → 산화 스트레스 → Ca²⁺ 침착 + Al³⁺ 핵형성 → 가속된 PGC → 멜라토닌↓",
        ref: "[[ref:pgc2025_fluoride|PGC 2025 fluoride]], [[ref:pgc2026_convergent|PGC 2026 convergent]]",
      },
      {
        symbol: "F⁻",
        name: "불소",
        mechanism: "송과체 석회화를 촉진하고 Ca²⁺ 항상성을 교란",
        evidence: "송과체는 다른 어떤 연조직보다 더 많은 F⁻를 축적; F⁻ 농도는 PGC 등급과 상관",
        level: "confirmed",
        detail: "송과체는 골조직을 초과하는 농도까지 불소를 축적합니다. 불소는 하이드록시아파타이트의 수산기를 대체하여 플루오로아파타이트를 형성합니다 — 열역학적으로 더 안정적이며 재흡수가 어렵습니다. 이는 송과체 석회화를 진행성이며 본질적으로 비가역적으로 만듭니다. 멜라토닌 억제 효과는 수십 년에 걸쳐 축적됩니다.",
        synergy: "F⁻가 PGC를 비가역화 + EMF가 잔존 멜라토닌 생산을 억제 → 영구적 일주기 리듬 교란",
        ref: "[[ref:pgc2025_fluoride|PGC 2025 fluoride]]",
      },
    ],
    pgcTitle: "송과체 석회화 나선",
    pgcLead:
      "송과체 석회화(PGC)는 중금속, 불소, EMF가 단일 해부학적 구조에 수렴하는 지점입니다. 결과는 자기 강화적인 멜라토닌 손실 나선입니다.",
    pgcSteps: [
      { step: "EMF → 송과체의 산화 스트레스", detail: "송과체 세포는 대사적으로 활발하고 EMF에 민감하다. 산화 스트레스는 세포막을 손상시키고 Ca²⁺/PO₄ 침착을 촉진한다." },
      { step: "Ca²⁺ + PO₄ → 하이드록시아파타이트 결정 형성", detail: "초기 석회화가 추가 결정 성장을 위한 핵형성 부위를 생성한다." },
      { step: "Al³⁺가 결정 핵형성을 가속", detail: "알루미늄이 하이드록시아파타이트 형성의 씨앗으로 작용하여 석회화 역치를 낮춘다." },
      { step: "F⁻가 하이드록시아파타이트 → 플루오로아파타이트로 변환", detail: "플루오로아파타이트는 열역학적으로 더 안정 — 석회화가 비가역적이 된다." },
      { step: "석회화 조직 ≠ 기능적 송과체 세포", detail: "각 석회화 영역은 영구적으로 멜라토닌 생산을 중단한다. 비석회화 조직 체적과 멜라토닌 출력 간 r=0.569." },
      { step: "멜라토닌↓ → 항산화 방어↓ → 더 많은 산화 스트레스", detail: "멜라토닌은 강력한 항산화제이다. 그 손실은 석회화를 야기한 산화 스트레스에 대한 방어를 제거한다 → 양성 피드백." },
      { step: "멜라토닌↓ → 수면↓ → GABA↓ → Q↑", detail: "이는 Walker 수면 사슬(피드백 루프 4)과 연결된다. 나선은 공명 모델에 공급된다." },
    ],
    pgcCorrelation: "임상적 증거: 알츠하이머병 환자는 연령 대조군의 64%에 비해 76%의 PGC 유병률을 보인다. 불면증 환자는 멜라토닌 감소와 직접적 상관관계를 가진 더 높은 PGC 등급을 보인다.",
    pgcRefs: "[[ref:mahlberg2006_pgc_ad|Mahlberg 2006 (AD)]], [[ref:kunz2008_pgc_insomnia|Kunz 2008 (insomnia)]], [[ref:intechopen2020_melatonin_heart|Intechopen 2020 (melatonin-cardiac)]]",
    convergenceTitle: "삼중 수렴",
    convergenceLead: "세 가지 독립적인 노출 경로가 동일한 분자 표적에 수렴합니다:",
    convergenceRows: [
      {
        exposure: "EMF (RF/ELF)",
        target: "VGCC → Ca²⁺ 유입",
        downstream: "CaMKII, TPH-2, CSD 역치",
        population: "보편적 (전력망 + 무선)",
      },
      {
        exposure: "중금속 (Cd, Pb, MeHg)",
        target: "VGCC 구멍 / CaM / T형 전도도",
        downstream: "동일한 CaMKII 캐스케이드, 그러나 손상됨",
        population: "산업 + 식이",
      },
      {
        exposure: "석회화 촉진제 (Al, F)",
        target: "송과체 → 멜라토닌",
        downstream: "수면 → GABA → Q 인자",
        population: "물 + 식품 + 백신",
      },
    ],
    convergenceConclusion: "이 노출 중 어느 하나만으로도 측정 가능한 효과를 생산합니다. 시너지는 각각이 다른 것을 강화한다는 것입니다: EMF가 중금속을 위한 채널을 열고, 중금속이 EMF를 보상할 신호전달을 파괴하고, 석회화 촉진제가 야간 회복을 제공하는 멜라토닌 시스템을 파괴합니다. 문제는 개별 메커니즘이 존재하는지가 아니라 — 각각은 독립적으로 검증되었습니다 — 현대 인구에서 그들의 수렴이 부분의 합을 초과하는 창발적 해를 생산하는지입니다.",
    shiftworkTitle: "자연 실험으로서의 교대근무",
    shiftworkLead: "교대근무자는 PGC → 멜라토닌 → 건강 경로의 자연 실험을 제공합니다.",
    shiftworkPoints: [
      "만성적 야간 광노출이 망막-시상하부 경로를 통해 멜라토닌을 억제",
      "교대근무자는 암(IARC 그룹 2A 발암물질), 심혈관 질환, 대사 증후군, 인지 기능 저하의 비율이 더 높음",
      "이는 BERM이 EMF → 멜라토닌 억제로부터 예측하는 동일한 질환",
      "경로는 동일 (멜라토닌↓); 입력만 다름 (빛 vs. EMF + PGC)",
      "Booker 2024: 교대근무 역학이 만성 멜라토닌 억제의 건강 결과를 확인",
    ],
    breastmilkTitle: "모유 속 멜라토닌",
    breastmilkLead: "모유는 일주기 패턴으로 멜라토닌을 함유합니다 — 밤에 높고 낮에 낮습니다. 이는 자체 송과체가 미성숙한 영아에게 외인성 멜라토닌을 제공합니다.",
    breastmilkPoints: [
      "신생아 송과체는 기능적으로 미성숙 → 최소한의 내인성 멜라토닌",
      "모유 멜라토닌은 밤에 최고치 → 영아에게 일주기 신호를 제공",
      "분유는 멜라토닌을 전혀 함유하지 않음 → 분유 수유 영아는 이 보호적 입력을 결여",
      "SIDS 최고치는 인구 간 분유 수유율과 상관",
      "BERM 연관: EMF → 모체 멜라토닌↓ → 모유 멜라토닌↓ → 영아 보호↓",
    ],
    emfSynergyLabel: "EMF 시너지",
    cycleRepeats: "주기 반복",
    tableExposure: "노출",
    tableTarget: "표적",
    tableDownstream: "하류",
    tablePopulation: "인구",
    derivedPredictionText: "중금속 × EMF 시너지는 킬레이션 개입, PGC 상관관계, 카드뮴 조직 축적, 메틸수은 역치 값에 관한 4가지 검증 가능한 예측을 생성합니다.",
    predictionLink: "중금속 시너지 예측 참조 (METAL-EMF-1–4)",
    predictionHref: "/predictions",
  },
} as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const d = pickCopy(COPY, locale);
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
  const d = pickCopy(COPY, locale);
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
        <CautionBox locale={locale}>
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
                  {d.emfSynergyLabel}
                </p>
                <p className="text-sm text-foreground-muted leading-relaxed">{metal.synergy}</p>
              </div>
              <p className="text-xs text-foreground-muted mt-2 italic"><InlineReferenceText text={metal.ref} locale={locale} /></p>
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
                {d.cycleRepeats}
              </p>
              <p className="text-sm text-foreground-muted leading-relaxed">{d.pgcCorrelation}</p>
              <p className="text-xs text-foreground-muted mt-1 italic"><InlineReferenceText text={d.pgcRefs} locale={locale} /></p>
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
                  {d.tableExposure}
                </th>
                <th className="text-left py-2 pr-4 font-medium text-foreground-muted text-xs uppercase tracking-wide">
                  {d.tableTarget}
                </th>
                <th className="text-left py-2 pr-4 font-medium text-foreground-muted text-xs uppercase tracking-wide">
                  {d.tableDownstream}
                </th>
                <th className="text-left py-2 font-medium text-foreground-muted text-xs uppercase tracking-wide">
                  {d.tablePopulation}
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
              <p><InlineReferenceText text={point} locale={locale} /></p>
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
            {d.derivedPredictionText}
          </p>
          <Link href={`${prefix}${d.predictionHref}`} className="text-sm text-accent hover:underline">
            {d.predictionLink} →
          </Link>
        </DerivedPrediction>
      </section>
    </div>
  );
}
