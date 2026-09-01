import type { Metadata } from "next";
import Link from "next/link";
import { Lightbulb } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { BermIcon } from "@/components/BermIcon";
import { LightingTransitionTimeline } from "@/components/LightingTransitionTimeline";
import { CitationLink } from "@/components/CitationLink";
import { InlineReferenceText } from "@/components/InlineReferenceText";
import { StudyCitation } from "@/components/StudyCitation";
import { pickCopy } from "@/lib/i18n";

const COPY = {
  en: {
    title: "The IF Channel: Lighting & Display Transition",
    subtitle:
      "How the replacement of incandescent bulbs and CRT screens introduced intermediate-frequency EMF into every home — and why the regulatory gap matters.",
    backLink: "← Back to Evidence",
    narratives: [
      {
        id: "lighting",
        title: "Lighting transition: the invisible EMF shift",
        paragraphs: [
          "The replacement of incandescent bulbs with LED lighting (EU ban 2009–2012, similar elsewhere) transformed every lamp socket from a passive resistor producing zero EMF above 50 Hz into an active kHz-frequency EMF source. A typical home has 15–30 LED bulbs, each containing a switch-mode power supply operating at 20–200 kHz with harmonic overtones extending higher.",
          "Studies attributing LED health effects to ‘blue light’ (Tosini 2016) did not control for the EMF component. LED bulbs produce both blue light and kHz-EMF; incandescent bulbs produce neither. When a study compares LED to incandescent and finds melatonin suppression, it cannot determine whether the cause was spectral (blue light via retina → SCN) or electromagnetic (kHz fields via pineal or VGCC). No separation experiment has been conducted.",
          "The biological activity of intermediate-frequency fields (kHz range) is confirmed by [[ref:ttfields_mechanism|Tumor Treating Fields (TTFields)]], an FDA-approved cancer therapy using 100–300 kHz alternating fields to disrupt cell division. If these frequencies are therapeutically active in cancer cells, they cannot be biologically inert in normal tissue.",
          "LED street lighting compounds the effect: [[ref:boyes2021|Boyes et al. 2021 (Science Advances)]] found 47% reduction in moth caterpillar abundance under LED streetlights vs unlit sites, with worse effects from LEDs than sodium lamps. [[ref:pawson2014|Pawson & Bader 2014]] found LED traps captured 48% more insects than sodium. The Science editorial note on [[ref:lindecke2026|Lindecke 2026]] explicitly identifies LED lights as a source of biological RF noise.",
          "The EU incandescent ban ([[ref:eu_regulation_244_2009|Directive 244/2009]]) provides a testable natural experiment. The ban was phased: >100W in September 2009, >75W in 2010, >60W in 2011, all remaining in 2012, halogens in 2018. This was an administratively mandated, non-self-selected, population-wide switch from zero IF-EMF sources to continuous IF-EMF sources affecting ~450 million people. [[ref:zeghoudi2025_led_driver_emf|Zeghoudi et al. 2025 (Optics & Laser Technology)]] directly measured LED driver near-field emissions, confirming measurable E-field components at centimeter distances.",
          "BERM predicts that EU countries — where the lighting transition was mandated and simultaneous — will show accelerated TFR decline in 2015–2022 (5–10 year lag from cumulative spermatogenic damage) compared to countries where the ban occurred later or not at all (USA effective 2023, many developing countries still no ban). This is testable with existing demographic data using difference-in-differences regression with LED ban timing as the treatment variable.",
        ],
        studies: [
          { citation: "Boyes et al. (Science Advances)", year: 2021, referenceId: "boyes2021", note: "LED streetlights: −47% moth caterpillars vs unlit" },
          { citation: "Pawson & Bader (Ecological Applications)", year: 2014, referenceId: "pawson2014", note: "LED traps: +48% insect capture vs sodium" },
          { citation: "Tuszynski et al. — TTFields (PMC5129338)", year: 2016, referenceId: "ttfields_mechanism", note: "100–300 kHz fields disrupt cell division (FDA-approved)" },
          { citation: "LED power quality study (PMC9920439)", year: 2023, referenceId: "pmc9920439_led_harmonics", note: "LED bulbs exceed harmonic distortion limits" },
          { citation: "Havas — dirty electricity (ICEMS)", year: 2006, referenceId: "havas2006", note: "kHz filtering improved diabetes/MS symptoms" },
          { citation: "Aerts et al. (Environment International)", year: 2019, referenceId: "if_systematic_review_2019", note: "IF fields (300 Hz–1 MHz) poorly studied" },
          { citation: "IJRB systematic review", year: 2022, referenceId: "ijrb2022_if_review", note: "IF-EMF (300 Hz–10 MHz) animal studies: minimal health research vs ELF/RF" },
          { citation: "Zeghoudi et al. (Optics & Laser Technology)", year: 2025, referenceId: "zeghoudi2025_led_driver_emf", note: "LED driver near-field E-field emission measured" },
          { citation: "EU Directive 244/2009", year: 2009, referenceId: "eu_regulation_244_2009", note: "Phased incandescent ban 2009–2012, no EMF assessment" },
        ],
      },
      {
        id: "display",
        title: "Display transition: CRT → LCD/LED",
        paragraphs: [
          "The transition from CRT to flat-panel LCD/LED televisions (2005–2015) was not simply a display technology change — it was a multiplicative EMF transformation. Screen count per household increased from ~1 to ~3–4. Average screen size grew from 27\" to 60\" (~5× surface area). Bedroom TV penetration rose from 15% to 70%. Built-in Wi-Fi added continuous 2.4/5 GHz RF emission. Viewing distance decreased. Viewing hours increased with streaming culture.",
          "CRT televisions were not EMF-silent — their deflection coils produced strong VLF fields (15.6 kHz) and ELF fields (50 Hz). But these were from a single device at 3–4 m distance. The replacement by multiple Wi-Fi-connected LCD screens in every room, including bedrooms at 1.5–2 m from the pineal gland during evening hours, represents a qualitative change in the circadian EMF exposure profile.",
          "The bedroom television is particularly relevant to BERM’s circadian pathway (Pathway B): a large LED-backlit, Wi-Fi-connected screen at head height, operating from evening through the melatonin production window, producing both blue light and EMF simultaneously. The multiplicative effect (count × size × bedroom × Wi-Fi × hours × proximity) is far larger than any single-factor analysis would suggest.",
        ],
        studies: [
          { citation: "Display market penetration data (Statista/GWI)", year: "2005–24", referenceId: "display_market_penetration_2005_2024", note: "Screen count 1 → 3.5, bedroom penetration 15% → 70%" },
          { citation: "Streaming culture and screen time increase", year: "2012–24", referenceId: "streaming_screen_time_2012_2024", note: "Average viewing hours +2.5h with streaming adoption" },
        ],
      },
    ],
    seeAlsoTitle: "See also",
    evidenceLink: "← Evidence portal",
    citationHeader: "Citation",
    yearHeader: "Year",
    noteHeader: "Note",
    findingHeader: "Finding",
    lightingTransition: {
      title: "The Lighting Transition: From Thermal to Electronic Light",
      paragraphs: [
        "Between 2009 and 2019, the European Union phased out incandescent light bulbs and replaced them with LED lighting. The stated reason was energy efficiency. The electromagnetic consequence was unstated: every LED lamp contains a switched-mode power supply (SMPS) that converts 230V AC to DC at switching frequencies of 20–300 kHz. This introduced a new electromagnetic channel — intermediate frequency (IF) — into every home, office, school, and hospital that did not exist in the incandescent era. An incandescent bulb is a resistor: it produces 50/60 Hz magnetic field (ELF) proportional to its current draw, and nothing else. An LED lamp is a switching circuit: it produces ELF (from the mains), IF (from the driver, 20–300 kHz), and optical flicker (from incomplete DC smoothing).",
        "The IF range (300 Hz – 10 MHz) sits in a regulatory gap. ELF (below 300 Hz) is regulated by ICNIRP’s 2010 guidelines. RF (above 100 kHz) is regulated by ICNIRP’s 1998/2020 guidelines. The IF range falls between the two, with overlapping but inconsistent limits. [[ref:ijrb2022_if_review|A 2022 systematic review in the International Journal of Radiation Biology]] found that ‘compared to ELF or RF EMF bands, studies on health effects with more diverse perspectives of IF-EMF have NOT been conducted.’ The IF channel is unstudied because no one studied it — not because it was found safe. This is the regulatory gap that BERM identifies as the third exposure channel.",
        "Three independent lines of evidence connect IF-frequency EMF to biological effects. First, [[ref:kim2026_cell_gene_switch|Kim et al. (Cell, 2026)]] demonstrated that 60 Hz pulsed EMF activates gene expression via Cyb5b-mediated calcium oscillations; their gene switch used 4 kHz, squarely in the IF range produced by LED drivers. Second, [[ref:heliyon_150khz_fertility_2022|a 2022 study (Heliyon, PMC9952889)]] exposed rats to 150 kHz IF-EMF for 8 weeks and found significant changes in testicular mass (p=0.03), interstitial cell count (p=0.01), and FSH levels (p=0.01). Third, [[ref:ttfields_novocure_fda|Novocure’s TTFields — FDA-approved for glioblastoma treatment]] — operates at 200 kHz, destroying cancer cells through disruption of the mitotic spindle. If 200 kHz fields can disrupt cell division intentionally, environmental 200 kHz fields from LED drivers may disrupt cell division unintentionally.",
        "The conventional explanation attributes LED’s health effects to blue light suppression of melatonin. BERM does not deny this mechanism but argues it is insufficient. [[ref:duraccio2019_blue_light|Duraccio et al. (2019)]] found that blue-light-filtering glasses did NOT significantly improve adolescent sleep quality — suggesting that the non-optical component (IF emissions) may be the more important pathway. BERM’s prediction: a Faraday-shielded LED lamp (blocking IF emissions while preserving identical light output) would produce less biological disruption than an unshielded lamp with identical spectrum. Blue-light filtering addresses the wrong channel.",
        "The EU’s lighting transition (2009–2019) created a natural experiment. Countries that adopted LED lighting earlier experienced IF exposure increases earlier. If IF contributes to biological effects, TFR decline should accelerate more in early-adopting countries after controlling for RF growth. Falsification test T1: Compare TFR acceleration before and after LED transition onset, controlling for mobile/broadband growth. If no acceleration → IF channel not supported. If acceleration correlates with LED adoption timing → consistent with IF hypothesis.",
      ],
      epistemic: "Epistemic level: IF regulatory gap [E] ([[ref:ijrb2022_if_review|IJRB 2022]]). Cyb5b mechanism [E] ([[ref:kim2026_cell_gene_switch|Kim 2026 Cell]]). 150 kHz fertility [E] ([[ref:heliyon_150khz_fertility_2022|Heliyon 2022]]). [[ref:ttfields_novocure_fda|TTFields]] [E] (FDA). Blue light insufficiency [C] ([[ref:duraccio2019_blue_light|Duraccio 2019]]). LED-DID population test [C] (untested).",
      citationFindings: [
        "IF-EMF (300 Hz – 10 MHz) systematically under-researched; regulatory gap documented",
        "Cyb5b EMF sensor: 60 Hz → Ca²⁺ oscillations → gene expression in vivo (CRISPR-validated)",
        "150 kHz IF-EMR 8 wk: testicular mass ↓, interstitial cells ↓, FSH ↑ in rats",
        "200 kHz destroys cancer cells via mitotic spindle disruption (FDA-approved)",
        "Blue-light-filtering glasses did NOT significantly improve adolescent sleep",
        "Reducing kHz transients changed urinary dopamine and PEA (N=7 pilot)",
        "LED drivers generate IF-EMF noise at 65 kHz – 2 MHz",
        "Cav1.4 (VGCC) promotes retinal degeneration",
        "Blue-light hazard assessment: A2E photosensitization real, but mechanism overlapping",
        "Incandescent lamps ‘did not demonstrate adverse effects on vision’",
      ],
    },
    spermatogenesis: {
      title: "The Spermatogenesis Connection",
      paragraphs: [
        "Spermatogenesis — the production of mature sperm from germ cells — is a MITOTIC process. Germ cells divide clonally through multiple rounds of mitosis before differentiating into spermatozoa. This makes spermatogenesis inherently vulnerable to any agent that disrupts mitosis.",
        "[[ref:ttfields_mechanism|TTFields]], the FDA-approved cancer therapy operating at 100–300 kHz, destroys cancer cells precisely by disrupting mitosis. The manufacturer’s own research shows that NORMAL cell mitosis is disrupted at approximately 50 kHz — a frequency chosen to be AVOIDED in cancer treatment to minimize side effects on healthy tissue (Nature 2020).",
        "LED driver switching frequencies (20–100 kHz) fall squarely in this range. The environmental IF exposure from LED lighting operates at the frequency that TTFields research identified as most disruptive to normal cell division.",
        "The UWI Trinidad research group made this connection explicit: ‘Since mammalian testicular germ cells proliferate clonally via mitotic rounds before differentiating into mature spermatozoa, the effect of IF on reproductive risks in this TTFields frequency range needs to be investigated.’ [[ref:heliyon_150khz_fertility_2022|Their 150 kHz study]] found significant reductions in testicular mass (p=0.03), interstitial cell count (p=0.01), and altered FSH levels (p=0.01) (Sundaram 2022).",
      ],
      epistemic: "Epistemic level: [[ref:ttfields_mechanism|TTFields mechanism]] [E] (FDA-approved). [[ref:heliyon_150khz_fertility_2022|UWI Trinidad 150 kHz]] [M|C] (animal study, single group). Environmental relevance [L] (field strength gap).",
    },
    vdt: {
      title: "The VDT Precedent: IF Fields and Reproduction in the 1980s",
      paragraphs: [
        "In the 1980s, clusters of miscarriages were reported among VDT (video display terminal) workers. CRT monitors’ horizontal deflection coils produced 15–30 kHz IF fields — the same frequency range as modern LED drivers. The issue was resolved by technology change (LCD), not by science.",
        "Epidemiological evidence was mixed: some studies showed elevated risk (McDonald 1986, Goldhaber 1988), others did not (Schnorr/NIOSH 1991). The NIOSH study was treated as definitive, but it used VLF field measurements (15 kHz) only as a crude proxy — it did not distinguish pulsed from continuous fields, nor measure individual monitor emission variability. When LCD screens replaced CRTs in the 2000s, IF exposure from VDT workers disappeared — and with it, the motivation to investigate.",
        "BERM context: The VDT case is a historical precedent for the IF channel. CRT 15–30 kHz fields occupy the same frequency range as LED driver 20–100 kHz emissions. The VDT problem was ‘solved’ by replacing CRTs with LCDs — but LCDs contain LED backlights whose drivers produce fields in the same frequency range. IF exposure did not disappear; it shifted from VDT workers to the entire population.",
      ],
      epistemic: "Epistemic level: [C] (historical precedent). VDT epidemiology is not proof of IF harm — it is evidence that IF field reproductive effects were observed before and left unresolved.",
    },
  },
  fi: {
    title: "IF-kanava: valaistus- ja näyttösiirtymä",
    subtitle:
      "Kuinka hehkulamppujen ja CRT-näyttöjen korvaaminen toi välitaajuisen EMF:n jokaiseen kotiin — ja miksi säätelyaukko on merkittävä.",
    backLink: "← Takaisin näyttöön",
    narratives: [
      {
        id: "lighting",
        title: "Valaistussiirtymä: näkymätön EMF-muutos",
        paragraphs: [
          "Hehkulamppujen korvaaminen LED-valaistuksella (EU-kielto 2009–2012, vastaavat muualla) muutti jokaisen lampunkannan passiivisesta resistanssista, joka ei tuota EMF:ää yli 50 Hz:n, aktiiviseksi kilohertsitaajuiseksi EMF-lähteeksi. Tyypillisessä kodissa on 15–30 LED-lamppua, joista jokaisessa on hakkuriteholähde, joka toimii 20–200 kHz:n taajuudella ja tuottaa korkeampia harmonisia.",
          "Tutkimukset, jotka yhdistävät LED:n terveysvaikutukset ‘siniselle valolle’ (Tosini 2016), eivät kontrolloineet EMF-komponenttia. LED-lamput tuottavat sekä sinistä valoa että kHz-EMF:ää; hehkulamput eivät kumpaakaan. Kun tutkimus vertaa LED:ää hehkulamppuun ja havaitsee melatoniinin suppression, se ei pysty erottamaan, oliko syy spektraalinen (sininen valo verkkokalvon kautta → SCN) vai sähkömagneettinen (kHz-kentät pineaalirauhasen tai VGCC:n kautta). Erottelututkimusta ei ole tehty.",
          "Välitaajuisten kenttien (kHz-alue) biologinen aktiivisuus on vahvistettu [[ref:ttfields_mechanism|Tumor Treating Fields (TTFields)]] -hoidolla, FDA:n hyväksymällä syöpähoidolla, joka käyttää 100–300 kHz:n vaihtokenttiä solunjakautumisen häiritsemiseen. Jos nämä taajuudet ovat terapeuttisesti aktiivisia syöpäsoluissa, ne eivät voi olla biologisesti inerttejä normaalissa kudoksessa.",
          "LED-katuvalaistus vahvistaa vaikutusta: [[ref:boyes2021|Boyes ym. 2021 (Science Advances)]] havaitsivat 47 %:n vähenemisen yöperhosten toukkamäärissä LED-katuvalojen alla verrattuna valaisemattomiin kohteisiin. [[ref:pawson2014|Pawson & Bader 2014]] havaitsivat LED-loukkujen pyydystäneen 48 % enemmän hyönteisiä kuin natriumlamppu. Sciencen toimituksellinen huomautus [[ref:lindecke2026|Lindecke 2026]] -tutkimuksessa tunnistaa nimenomaisesti LED-valot biologisen RF-kohinan lähteeksi.",
          "EU:n hehkulamppukielto ([[ref:eu_regulation_244_2009|direktiivi 244/2009]]) tarjoaa testattavan luonnollisen kokeen. Kielto vaiheistettiin: >100 W syyskuussa 2009, >75 W 2010, >60 W 2011, kaikki loput 2012, halogeenit 2018. Tämä oli hallinnollisesti pakotettu, ei-itsevalittu, väestönlaajuinen siirtymä nollasta IF-EMF-lähteestä jatkuviin IF-EMF-lähteisiin, joka koski ~450 miljoonaa ihmistä. [[ref:zeghoudi2025_led_driver_emf|Zeghoudi ym. 2025 (Optics & Laser Technology)]] mittasi suoraan LED-ajurin lähikenttäemission ja vahvisti mitattavat sähkökentän komponentit senttimetrien etäisyydellä.",
          "BERM ennustaa, että EU-maat — joissa valaistussiirtymä oli pakollinen ja samanaikainen — osoittavat kiihtyvää TFR-laskua 2015–2022 (5–10 vuoden viive kumulatiivisesta spermatogeneesivauriosta) verrattuna maihin, joissa kielto tuli voimaan myöhemmin tai ei lainkaan (USA vasta 2023, monet kehitysmaat yhä ilman kieltoa). Tämä on testattavissa olemassa olevalla demografisella datalla käyttäen erotus-erotuksissa-regressiota LED-kiellon ajoituksella käsittelymuuttujana.",
        ],
        studies: [
          { citation: "Boyes ym. (Science Advances)", year: 2021, referenceId: "boyes2021", note: "LED-katuvalot: −47 % yöperhosten toukkia vs valaisemattomat" },
          { citation: "Pawson & Bader (Ecological Applications)", year: 2014, referenceId: "pawson2014", note: "LED-loukut: +48 % hyönteispyydystys vs natrium" },
          { citation: "Tuszynski ym. — TTFields (PMC5129338)", year: 2016, referenceId: "ttfields_mechanism", note: "100–300 kHz kentät häiritsevät solunjakautumista (FDA-hyväksytty)" },
          { citation: "LED-sähkönlaatututkimus (PMC9920439)", year: 2023, referenceId: "pmc9920439_led_harmonics", note: "LED-lamput ylittävät harmonisen särön rajat" },
          { citation: "Havas — dirty electricity (ICEMS)", year: 2006, referenceId: "havas2006", note: "kHz-suodatus paransi diabetes-/MS-oireita" },
          { citation: "Aerts ym. (Environment International)", year: 2019, referenceId: "if_systematic_review_2019", note: "IF-kentät (300 Hz–1 MHz) heikosti tutkittuja" },
          { citation: "IJRB systemaattinen katsaus", year: 2022, referenceId: "ijrb2022_if_review", note: "IF-EMF (300 Hz–10 MHz) eläintutkimukset: minimaalinen terveystutkimus vs ELF/RF" },
          { citation: "Zeghoudi ym. (Optics & Laser Technology)", year: 2025, referenceId: "zeghoudi2025_led_driver_emf", note: "LED-ajurin lähikenttäemissio mitattu" },
          { citation: "EU-direktiivi 244/2009", year: 2009, referenceId: "eu_regulation_244_2009", note: "Hehkulamppujen asteittainen kielto 2009–2012, ei EMF-arviointia" },
        ],
      },
      {
        id: "display",
        title: "Näyttöteknologiasiirtymä: CRT → LCD/LED",
        paragraphs: [
          "Siirtymä CRT-kuvaputkinäytöistä LCD/LED-litteänäyttöihin (2005–2015) ei ollut pelkkä näyttöteknologian muutos — se oli moninkertaistava EMF-muutos. Näyttöjen lukumäärä kotitaloutta kohti kasvoi ~1:stä ~3–4:ään. Keskimääräinen ruutukoko kasvoi 27\":stä 60\":iin (~5-kertainen pinta-ala). Makuuhuoneen TV-penetraatio nousi 15 %:sta 70 %:iin. Sisäänrakennettu Wi-Fi lisäsi jatkuvan 2,4/5 GHz RF-emission. Katselyetäisyys lyheni. Katseluaika kasvoi suoratoistokulttuurin myötä.",
          "CRT-televisiot eivät olleet EMF-hiljaisia — niiden poikkeutuskäämit tuottivat voimakkaita VLF-kenttiä (15,6 kHz) ja ELF-kenttiä (50 Hz). Mutta nämä olivat yhdestä laitteesta 3–4 m:n etäisyydellä. Korvaaminen useilla Wi-Fi-yhdistetyillä LCD-näytöillä jokaisessa huoneessa, mukaan lukien makuuhuoneessa 1,5–2 m:n päässä pineaalirauhasesta ilta-aikaan, edustaa laadullista muutosta sirkadiaanisessa EMF-altistusprofiilissa.",
          "Makuuhuoneen televisio on erityisen relevantti BERM:n sirkadiaaniselle reitille (Polku B): suuri LED-taustavalaistu, Wi-Fi-yhdistetty näyttö pään korkeudella, toimii illasta melatoniinin tuotantoikkunan läpi, tuottaen sekä sinistä valoa että EMF:ää samanaikaisesti. Moninkertaisuusvaikutus (lukumäärä × koko × makuuhuone × Wi-Fi × tunnit × läheisyys) on paljon suurempi kuin mikään yksittäisen tekijän analyysi antaisi ymmärtää.",
        ],
        studies: [
          { citation: "Näyttömarkkinapenetraatiodata (Statista/GWI)", year: "2005–24", referenceId: "display_market_penetration_2005_2024", note: "Näyttömäärä 1 → 3,5, makuuhuonepenetraatio 15 % → 70 %" },
          { citation: "Suoratoistokulttuuri ja ruutuajan kasvu", year: "2012–24", referenceId: "streaming_screen_time_2012_2024", note: "Keskimääräinen katseluaika +2,5h suoratoiston myötä" },
        ],
      },
    ],
    seeAlsoTitle: "Katso myös",
    evidenceLink: "← Näyttöportaali",
    citationHeader: "Viite",
    yearHeader: "Vuosi",
    noteHeader: "Huomio",
    findingHeader: "Löydös",
    lightingTransition: {
      title: "Valaistussiirtymä: termisestä valosta elektroniseen",
      paragraphs: [
        "Vuosina 2009–2019 Euroopan unioni luopui asteittain hehkulampuista ja korvasi ne LED-valaistuksella. Ilmoitettu syy oli energiatehokkuus. Sähkömagneettinen seuraus jäi mainitsematta: jokainen LED-lamppu sisältää hakkuriteholähteen (SMPS), joka muuntaa 230 V AC:n DC:ksi kytkentätaajuudella 20–300 kHz. Tämä toi uuden sähkömagneettisen kanavan — välitaajuuden (IF) — jokaiseen kotiin, toimistoon, kouluun ja sairaalaan, jota ei ollut hehkulamppuaikakaudella. Hehkulamppu on vastus: se tuottaa 50/60 Hz magneettikentän (ELF) suhteessa virtaansa, eikä mitään muuta. LED-lamppu on kytkentäpiiri: se tuottaa ELF:ää (verkkovirrasta), IF:ää (ajurista, 20–300 kHz) ja optista välkyntää (epätäydellisestä DC-tasoituksesta).",
        "IF-alue (300 Hz – 10 MHz) sijaitsee säätelyaukossa. ELF (alle 300 Hz) on säädelty ICNIRP:n 2010 ohjeilla. RF (yli 100 kHz) on säädelty ICNIRP:n 1998/2020 ohjeilla. IF-alue jää näiden väliin, päällekkäisin mutta epäjohdonmukaisin rajoin. [[ref:ijrb2022_if_review|Vuoden 2022 systemaattinen katsaus International Journal of Radiation Biology -lehdessä]] totesi: ‘verrattuna ELF- tai RF-EMF-kaistoihin, IF-EMF:n terveysvaikutuksia EI ole tutkittu monipuolisemmista näkökulmista.’ IF-kanavaa ei ole tutkittu siksi, ettei kukaan tutkinut sitä — ei siksi, että se todettiin turvalliseksi.",
        "Kolme riippumatonta todistuslinjaa yhdistää IF-taajuudet biologisiin vaikutuksiin. Ensinnäkin [[ref:kim2026_cell_gene_switch|Kim ym. (Cell, 2026)]] osoitti, että 60 Hz pulssi-EMF aktivoi geeniekspression Cyb5b-välitteisten kalsiumoskillaatioiden kautta; heidän geenikytkin käytti 4 kHz taajuutta, joka on suoraan LED-ajureiden tuottamalla IF-alueella. Toiseksi [[ref:heliyon_150khz_fertility_2022|vuoden 2022 tutkimus (Heliyon, PMC9952889)]] altisti rottia 150 kHz IF-EMR:lle 8 viikon ajan ja havaitsi merkitseviä muutoksia kivesten massassa (p=0.03), interstitiaalisten solujen määrässä (p=0.01) ja FSH-tasoissa (p=0.01). Kolmanneksi [[ref:ttfields_novocure_fda|Novocuren TTFields — FDA:n hyväksymä syöpähoito]] — toimii taajuudella 200 kHz tuhoten syöpäsoluja mitoottisen karan häiriön kautta. Jos 200 kHz kentät voivat häiritä solunjakautumista tarkoituksellisesti, ympäristön 200 kHz kentät LED-ajureista voivat häiritä sitä tahattomasti.",
        "Konventionaalinen selitys kohdistaa LED:n terveysvaikutukset siniseen valoon, joka vaimentaa melatoniinia. BERM ei kiistä tätä mekanismia mutta väittää sen olevan riittämätön. [[ref:duraccio2019_blue_light|Duraccio ym. (2019)]] havaitsi, että sinisen valon suodatuslasit EIVÄT merkitsevästi parantaneet nuorten unenlaatua — mikä viittaa siihen, että ei-optinen komponentti (IF-emissiot) saattaa olla tärkeämpi vaikutuspolku. BERM:n ennuste: Faraday-suojattu LED-lamppu (estää IF-emissiot mutta säilyttää identtisen valospektrin) tuottaisi vähemmän biologista häiriötä kuin suojaamaton lamppu identtisellä spektrillä.",
        "EU:n valaistussiirtymä (2009–2019) loi luonnollisen kokeen. Maat jotka ottivat LED-valaistuksen käyttöön aikaisemmin kokivat IF-altistuksen kasvun aikaisemmin. Jos IF vaikuttaa biologisiin päätepisteisiin, TFR-laskun pitäisi kiihtyä enemmän aikaisin omaksuneissa maissa RF-kasvun kontrolloinnin jälkeen. Falsifikaatiotesti T1: vertaa TFR-kiihtyvyyttä ennen ja jälkeen LED-siirtymän alkamisen, kontrolloiden matkapuhelin-/laajakaistakehitystä. Jos kiihtyvyyttä ei ole → IF-kanava ei tuettu. Jos kiihtyvyys korreloi LED-omaksumisajankohtaan → yhteensopiva IF-hypoteesin kanssa.",
      ],
      epistemic: "Episteeminen taso: IF-säätelyaukko [E] ([[ref:ijrb2022_if_review|IJRB 2022]]). Cyb5b-mekanismi [E] ([[ref:kim2026_cell_gene_switch|Kim 2026 Cell]]). 150 kHz hedelmällisyys [E] ([[ref:heliyon_150khz_fertility_2022|Heliyon 2022]]). [[ref:ttfields_novocure_fda|TTFields]] [E] (FDA). Sinisen valon riittämättömyys [C] ([[ref:duraccio2019_blue_light|Duraccio 2019]]). LED-DID populaatiotesti [C] (testaamaton).",
      citationFindings: [
        "IF-EMF (300 Hz – 10 MHz) systemaattisesti alitutkittu; säätelyaukko dokumentoitu",
        "Cyb5b EMF-sensori: 60 Hz → Ca²⁺-vaihtelut → geeniekspressio in vivo (CRISPR-validoitu)",
        "150 kHz IF-EMR 8 vk: kivesten massa ↓, interstitiaalisolut ↓, FSH ↑ rotilla",
        "200 kHz tuhoaa syöpäsoluja mitoottisen karan häiriöllä (FDA-hyväksytty)",
        "Sinisen valon suodatuslasit EIVÄT parantaneet nuorten unta merkitsevästi",
        "kHz-transienttien vähentäminen muutti virtsan dopamiinia ja PEA:ta (N=7 pilotti)",
        "LED-ajurit tuottavat IF-EMF-kohinaa 65 kHz – 2 MHz",
        "Cav1.4 (VGCC) edistää verkkokalvon degeneraatiota",
        "Sinivalon vaara-arviointi: A2E-fotosensitisaatio todellinen, mutta mekanismi päällekkäinen",
        "Hehkulamput ‘eivät osoittaneet haitallisia vaikutuksia näköön’",
      ],
    },
    spermatogenesis: {
      title: "Spermatogeneesiyhteys",
      paragraphs: [
        "Spermatogeneesi — kypsien siittiöiden tuottaminen kantasoluista — on MITOOTTINEN prosessi. Kantasolut jakautuvat klonaalisten mitoottisten kierrosten kautta ennen erilaistumista siittiöiksi. Tämä tekee spermatogeneesistä luonnostaan haavoittuvan mille tahansa tekijälle, joka häiritsee mitoosia.",
        "[[ref:ttfields_mechanism|TTFields]], FDA-hyväksytty syöpähoito taajuudella 100–300 kHz, tuhoaa syöpäsoluja juuri häiritsemällä mitoosia. Valmistajan oma tutkimus osoittaa, että NORMAALIEN solujen mitoosi häiriintyy noin 50 kHz:n taajuudella — taajuudella jonka käyttöä syöpähoidossa VÄLTETÄÄN haittavaikutusten minimoimiseksi terveeseen kudokseen (Nature 2020).",
        "LED-hakkurien kytkentätaajuudet (20–100 kHz) osuvat juuri tälle alueelle. Ympäristön IF-altistus LED-valaistuksesta toimii taajuudella, jonka TTFields-tutkimus tunnisti normaalin solunjakautumisen kannalta haitallisimmaksi.",
        "UWI Trinidadin tutkimusryhmä teki tämän yhteyden nimenomaiseksi: ‘Koska nisäkkäiden kivesten itusolut lisääntyvät klonaalisesti mitoottisten kierrosten kautta ennen erilaistumista kypsiksi siittiöiksi, IF:n vaikutus lisääntymisriskeihin tässä TTFields-taajuusalueella (100–300 kHz) on tutkittava.’ [[ref:heliyon_150khz_fertility_2022|Heidän 150 kHz tutkimuksensa]] havaitsi merkitsevän kivesmassan vähenemisen (p=0.03), interstitiaalisten solujen lukumäärän laskun (p=0.01) ja muuttuneet FSH-tasot (p=0.01) (Sundaram 2022).",
      ],
      epistemic: "Episteeminen taso: [[ref:ttfields_mechanism|TTFields-mekanismi]] [E] (FDA-hyväksytty). [[ref:heliyon_150khz_fertility_2022|UWI Trinidad 150 kHz]] [M|C] (eläinkoe, yksi ryhmä). Ympäristörelevanssi [L] (kenttävoimakkuusero).",
    },
    vdt: {
      title: "VDT-ennakkotapaus: IF-kentät ja lisääntyminen 1980-luvulla",
      paragraphs: [
        "1980-luvulla VDT-työntekijöiden (video display terminal) keskuudessa havaittiin keskenmenoklustereita. CRT-monitorien vaakapoikkeutuskäämi tuotti 15–30 kHz IF-kenttiä — sama taajuusalue kuin nykyisten LED-hakkurien. Tapaus ratkesi teknologian vaihdolla (LCD), ei tieteellä.",
        "Epidemiologinen näyttö oli ristiriitainen: jotkut tutkimukset osoittivat kohonnutta riskiä (McDonald 1986, Goldhaber 1988), toiset eivät (Schnorr/NIOSH 1991). NIOSH:n tutkimusta pidettiin lopullisena, mutta se käytti VLF-kenttämittauksia (15 kHz) vain karkeana proksi-altistuksena — se ei erottanut pulssimuotoisia kenttiä jatkuvista, eikä mitattu yksittäisten monitorien hetkellistä emissiovaihtelua. Kun LCD-näytöt korvasivat CRT:t 2000-luvulla, IF-altistus VDT-työntekijöiltä hävisi — ja samalla hävisi motiivi tutkia asiaa.",
        "BERM-konteksti: VDT-tapaus on IF-kanavan historiallinen ennakkotapaus. CRT:n 15–30 kHz -kentät ovat samaa taajuusaluetta kuin LED-hakkurien 20–100 kHz -emissiot. VDT-ongelma ‘ratkesi’ korvaamalla CRT:t LCD:illä — mutta LCD:t sisältävät LED-taustavalot, joiden hakkurit tuottavat saman taajuusalueen kenttiä. IF-altistus ei hävinnyt; se siirtyi VDT-työntekijöiltä koko väestöön.",
      ],
      epistemic: "Episteeminen taso: [C] (historiallinen ennakkotapaus). VDT-epidemiologia ei ole todiste IF:n vaarallisuudesta — se on todiste siitä, että IF-kenttien lisääntymisvaikutukset on havaittu aiemmin ja jätetty ratkaisematta.",
    },
  },

  ja: {
    title: "IFチャネル：照明とディスプレイの転換",
    subtitle:
      "白熱電球とCRTスクリーンの置き換えがいかに中間周波数EMFをすべての家庭に導入したか――そしてなぜ規制の空白が重要なのか。",
    backLink: "← エビデンスに戻る",
    narratives: [
      {
        id: "lighting",
        title: "照明の転換：見えないEMFシフト",
        paragraphs: [
          "白熱電球のLED照明への置き換え（EU禁止2009-2012年、他地域も同様）は、すべてのランプソケットを50 Hz以上のEMFを発生しない受動抵抗器から、アクティブなkHz周波数EMF源へと変えました。典型的な家庭には15-30個のLED電球があり、それぞれが20-200 kHzで動作するスイッチング電源を内蔵し、より高い高調波を発生します。",
          "LEDの健康影響を「ブルーライト」に帰する研究（Tosini 2016）はEMF成分を制御していませんでした。LED電球はブルーライトとkHz-EMFの両方を発生しますが、白熱電球はどちらも発生しません。研究がLEDと白熱電球を比較してメラトニン抑制を発見した場合、その原因がスペクトル的（ブルーライトが網膜→SCNを通じて）か電磁的（kHz場が松果体またはVGCCを通じて）かを判定できません。分離実験は実施されていません。",
          "中間周波数場（kHz帯域）の生物学的活性は、[[ref:ttfields_mechanism|Tumor Treating Fields（TTFields）]]――100-300 kHzの交流場を用いて細胞分裂を阻害するFDA承認のがん治療法――により確認されています。これらの周波数ががん細胞に対して治療的に活性であるなら、正常組織に対して生物学的に不活性であることはありえません。",
          "LED街灯照明が影響を増幅します：[[ref:boyes2021|Boyesら2021年（Science Advances）]]はLED街灯下で無照明地点と比較して蛾の幼虫個体数の47%減少を発見し、ナトリウムランプよりLEDの影響が大きいことを示しました。[[ref:pawson2014|Pawson & Bader 2014年]]はLEDトラップがナトリウムより48%多くの昆虫を捕獲したと報告。[[ref:lindecke2026|Lindecke 2026年]]に対するScienceの編集注記はLEDライトを生物学的RFノイズ源として明確に特定しています。",
          "EUの白熱電球禁止（[[ref:eu_regulation_244_2009|指令244/2009]]）は検証可能な自然実験を提供します。禁止は段階的に実施：2009年9月に100W超、2010年に75W超、2011年に60W超、2012年に残りすべて、2018年にハロゲン。これは行政的に義務付けられた、自己選択ではない、約4億5000万人に影響する人口規模のIF-EMFゼロ源から連続IF-EMF源への切り替えでした。[[ref:zeghoudi2025_led_driver_emf|Zeghoudiら2025年（Optics & Laser Technology）]]はLEDドライバーの近接場放射を直接測定し、センチメートル距離での測定可能な電界成分を確認しました。",
          "BERMは、照明転換が義務的かつ同時であったEU諸国が、禁止がより遅くまたは実施されなかった国（米国は2023年発効、多くの発展途上国は未禁止）と比較して、2015-2022年にTFR低下の加速を示すと予測します（累積的精子形成損傷からの5-10年のラグ）。これはLED禁止タイミングを処置変数とする差の差回帰分析を用いて既存の人口統計データで検証可能です。",
        ],
        studies: [
          { citation: "Boyes et al. (Science Advances)", year: 2021, referenceId: "boyes2021", note: "LED街灯：無照明比で蛾の幼虫-47%" },
          { citation: "Pawson & Bader (Ecological Applications)", year: 2014, referenceId: "pawson2014", note: "LEDトラップ：ナトリウム比で昆虫捕獲+48%" },
          { citation: "Tuszynski et al. — TTFields (PMC5129338)", year: 2016, referenceId: "ttfields_mechanism", note: "100-300 kHz場が細胞分裂を阻害（FDA承認）" },
          { citation: "LED電力品質研究 (PMC9920439)", year: 2023, referenceId: "pmc9920439_led_harmonics", note: "LED電球が高調波歪み限度を超過" },
          { citation: "Havas — dirty electricity (ICEMS)", year: 2006, referenceId: "havas2006", note: "kHzフィルタリングが糖尿病/MS症状を改善" },
          { citation: "Aerts et al. (Environment International)", year: 2019, referenceId: "if_systematic_review_2019", note: "IF場（300 Hz-1 MHz）は研究不足" },
          { citation: "IJRB系統的レビュー", year: 2022, referenceId: "ijrb2022_if_review", note: "IF-EMF（300 Hz-10 MHz）動物研究：ELF/RFと比較して健康研究が最小限" },
          { citation: "Zeghoudi et al. (Optics & Laser Technology)", year: 2025, referenceId: "zeghoudi2025_led_driver_emf", note: "LEDドライバー近接場E場放射を測定" },
          { citation: "EU指令244/2009", year: 2009, referenceId: "eu_regulation_244_2009", note: "白熱電球の段階的禁止2009-2012年、EMF評価なし" },
        ],
      },
      {
        id: "display",
        title: "ディスプレイの転換：CRT → LCD/LED",
        paragraphs: [
          "CRTからフラットパネルLCD/LEDテレビへの移行（2005-2015年）は単なるディスプレイ技術の変更ではなく、乗法的なEMF変換でした。世帯あたりのスクリーン数は約1から約3-4に増加。平均画面サイズは27インチから60インチへ拡大（約5倍の表面積）。寝室のTV普及率は15%から70%に上昇。内蔵Wi-Fiが2.4/5 GHzの連続RF放射を追加。視聴距離は短縮。ストリーミング文化により視聴時間が増加。",
          "CRTテレビはEMFサイレントではありませんでした――偏向コイルが強いVLF場（15.6 kHz）とELF場（50 Hz）を生成していました。しかしこれは3-4 m離れた1台のデバイスからのものでした。すべての部屋、特に夕方の時間帯に松果体から1.5-2 mの位置にある寝室で、複数のWi-Fi接続LCD画面への置き換えは、概日EMF曝露プロファイルの質的変化を意味します。",
          "寝室のテレビはBERMの概日経路（経路B）に特に関連します：頭の高さにある大型LED バックライト付きWi-Fi接続画面が、夕方からメラトニン産生ウィンドウを通じて動作し、ブルーライトとEMFの両方を同時に発生させます。乗法効果（台数×サイズ×寝室×Wi-Fi×時間×近接度）は、単一因子分析が示唆するよりもはるかに大きいです。",
        ],
        studies: [
          { citation: "ディスプレイ市場普及率データ (Statista/GWI)", year: "2005-24", referenceId: "display_market_penetration_2005_2024", note: "スクリーン数1→3.5、寝室普及率15%→70%" },
          { citation: "ストリーミング文化とスクリーンタイム増加", year: "2012-24", referenceId: "streaming_screen_time_2012_2024", note: "ストリーミング導入で平均視聴時間+2.5h" },
        ],
      },
    ],
    seeAlsoTitle: "関連項目",
    evidenceLink: "← エビデンスポータル",
    citationHeader: "引用",
    yearHeader: "年",
    noteHeader: "注記",
    findingHeader: "所見",
    lightingTransition: {
      title: "照明の転換：熱的光源から電子的光源へ",
      paragraphs: [
        "2009年から2019年にかけて、欧州連合は白熱電球を段階的に廃止し、LED照明に置き換えました。公表された理由はエネルギー効率でした。電磁気的結果は言及されませんでした：すべてのLEDランプには、230V ACを20-300 kHzのスイッチング周波数でDCに変換するスイッチング電源（SMPS）が含まれています。これは白熱電球時代には存在しなかった新しい電磁チャネル――中間周波数（IF）――をすべての家庭、オフィス、学校、病院に導入しました。白熱電球は抵抗器です：電流に比例した50/60 Hz磁場（ELF）を生成するだけです。LEDランプはスイッチング回路です：ELF（電源から）、IF（ドライバーから、20-300 kHz）、および光学的フリッカー（不完全なDC平滑化から）を生成します。",
        "IF帯域（300 Hz - 10 MHz）は規制の空白に位置しています。ELF（300 Hz未満）はICNIRPの2010年ガイドラインで規制されています。RF（100 kHz超）はICNIRPの1998/2020年ガイドラインで規制されています。IF帯域はこの2つの間に位置し、重複するが不整合な制限があります。[[ref:ijrb2022_if_review|International Journal of Radiation Biologyの2022年の系統的レビュー]]は「ELFまたはRF EMF帯域と比較して、IF-EMFの健康影響に関するより多様な観点からの研究は実施されていない」と述べています。IFチャネルは誰も研究しなかったから未研究なのであり、安全と判明したからではありません。",
        "3つの独立した証拠がIF周波数EMFを生物学的影響に結びつけています。第一に、[[ref:kim2026_cell_gene_switch|Kimら（Cell, 2026）]]は60 Hzパルス EMFがCyb5b媒介カルシウム振動を介して遺伝子発現を活性化することを実証しました。彼らの遺伝子スイッチは4 kHzを使用しており、LEDドライバーが生成するIF帯域に完全に含まれます。第二に、[[ref:heliyon_150khz_fertility_2022|2022年の研究（Heliyon、PMC9952889）]]はラットを150 kHz IF-EMFに8週間曝露し、精巣質量（p=0.03）、間質細胞数（p=0.01）、FSH値（p=0.01）に有意な変化を認めました。第三に、[[ref:ttfields_novocure_fda|NovocureのTTFields――膠芽腫治療のFDA承認済み――]]は200 kHzで動作し、有糸分裂紡錘体の撹乱によりがん細胞を破壊します。200 kHz場が意図的に細胞分裂を阻害できるなら、LEDドライバーからの環境200 kHz場は非意図的に細胞分裂を阻害する可能性があります。",
        "従来の説明はLEDの健康影響をメラトニンのブルーライト抑制に帰しています。BERMはこのメカニズムを否定しませんが、不十分であると主張します。[[ref:duraccio2019_blue_light|Duraccioら（2019）]]はブルーライトフィルタリンググラスが青年の睡眠の質を有意に改善しなかったことを発見しました――これは非光学的成分（IF放射）がより重要な経路である可能性を示唆しています。BERMの予測：ファラデーシールドされたLEDランプ（同一光出力を維持しながらIF放射をブロック）は、同一スペクトルのシールドされていないランプよりも少ない生物学的撹乱を生じるでしょう。",
        "EUの照明転換（2009-2019年）は自然実験を創出しました。LED照明をより早く採用した国はIF曝露の増加をより早く経験しました。IFが生物学的影響に寄与するなら、TFR低下はRF成長を制御した後、早期採用国でより加速するはずです。否定検証T1：LED転換開始前後のTFR加速を比較し、モバイル/ブロードバンドの成長を制御。加速がなければ→IFチャネルは支持されない。加速がLED採用タイミングと相関すれば→IF仮説と整合的。",
      ],
      epistemic: "認識論的レベル：IF規制の空白 [E]（[[ref:ijrb2022_if_review|IJRB 2022]]）。Cyb5bメカニズム [E]（[[ref:kim2026_cell_gene_switch|Kim 2026 Cell]]）。150 kHz生殖能力 [E]（[[ref:heliyon_150khz_fertility_2022|Heliyon 2022]]）。[[ref:ttfields_novocure_fda|TTFields]] [E]（FDA）。ブルーライトの不十分性 [C]（[[ref:duraccio2019_blue_light|Duraccio 2019]]）。LED-DID集団テスト [C]（未検証）。",
      citationFindings: [
        "IF-EMF（300 Hz - 10 MHz）は体系的に研究不足；規制の空白が文書化",
        "Cyb5b EMFセンサー：60 Hz → Ca²⁺振動 → 遺伝子発現 in vivo（CRISPR検証済み）",
        "150 kHz IF-EMR 8週間：ラットで精巣質量↓、間質細胞↓、FSH↑",
        "200 kHzが有糸分裂紡錘体の撹乱によりがん細胞を破壊（FDA承認）",
        "ブルーライトフィルタリンググラスは青年の睡眠を有意に改善せず",
        "kHzトランジェントの低減が尿中ドーパミンとPEAを変化させた（N=7パイロット）",
        "LEDドライバーは65 kHz - 2 MHzでIF-EMFノイズを生成",
        "Cav1.4（VGCC）が網膜変性を促進",
        "ブルーライト危険性評価：A2E光増感は実在するがメカニズムが重複",
        "白熱電球は「視覚への有害影響を示さなかった」",
      ],
    },
    spermatogenesis: {
      title: "精子形成との関連",
      paragraphs: [
        "精子形成――生殖細胞からの成熟精子の産生――は有糸分裂プロセスです。生殖細胞は精子に分化する前に複数回の有糸分裂を通じてクローン的に分裂します。これにより精子形成は有糸分裂を阻害するあらゆる因子に対して本質的に脆弱です。",
        "[[ref:ttfields_mechanism|TTFields]]、100-300 kHzで動作するFDA承認のがん治療法は、まさに有糸分裂を阻害することによりがん細胞を破壊します。製造業者自身の研究は、正常細胞の有糸分裂が約50 kHzで阻害されることを示しています――この周波数は健康な組織への副作用を最小化するためにがん治療で回避されるように選択された周波数です（Nature 2020）。",
        "LEDドライバーのスイッチング周波数（20-100 kHz）はまさにこの範囲に該当します。LED照明からの環境IF曝露は、TTFields研究が正常な細胞分裂に最も破壊的と特定した周波数で動作しています。",
        "UWIトリニダードの研究グループはこの関連を明示しました。「哺乳類の精巣生殖細胞は、成熟精子へ分化する前に有糸分裂を反復してクローン増殖するため、このTTFields周波数帯（100–300 kHz）におけるIFの生殖リスクへの影響を調べる必要がある」。[[ref:heliyon_150khz_fertility_2022|同グループの150 kHz研究]]は、精巣質量の有意な減少（p=0.03）、間質細胞数の減少（p=0.01）、FSH値の変化（p=0.01）を認めました（Sundaram 2022）。",
      ],
      epistemic: "認識論的レベル：[[ref:ttfields_mechanism|TTFieldsメカニズム]] [E]（FDA承認）。[[ref:heliyon_150khz_fertility_2022|UWIトリニダード150 kHz]] [M|C]（動物実験、単一群）。環境関連性 [L]（場の強度差）。",
    },
    vdt: {
      title: "VDT先例：1980年代のIF場と生殖",
      paragraphs: [
        "1980年代、VDT（ビデオディスプレイ端末）作業者の間で流産のクラスターが報告されました。CRTモニターの水平偏向コイルは15-30 kHzのIF場を発生しました――現代のLEDドライバーと同じ周波数帯域です。この問題は科学ではなく技術変更（LCD）により解決されました。",
        "疫学的エビデンスは混在していました：一部の研究はリスクの上昇を示し（McDonald 1986, Goldhaber 1988）、他の研究は示しませんでした（Schnorr/NIOSH 1991）。NIOSH研究は決定的とされましたが、VLF場測定（15 kHz）を粗いプロキシとしてのみ使用しました――パルス場と連続場を区別せず、個々のモニターの瞬間的放射変動を測定しませんでした。2000年代にLCD画面がCRTに取って代わると、VDT作業者からのIF曝露は消失しました――そして調査の動機も消失しました。",
        "BERMコンテクスト：VDTの事例はIFチャネルの歴史的先例です。CRTの15-30 kHz場はLEDドライバーの20-100 kHz放射と同じ周波数帯域を占めます。VDT問題はCRTをLCDに置き換えることで「解決」されました――しかしLCDは同じ周波数帯域の場を発生するドライバーを持つLEDバックライトを含んでいます。IF曝露は消失しませんでした；VDT作業者から全人口へ移行しました。",
      ],
      epistemic: "認識論的レベル：[C]（歴史的先例）。VDT疫学はIFの有害性の証明ではありません――IF場の生殖影響が以前に観察され未解決のまま残されたことの証拠です。",
    },
  },

  fr: {
    title: "Le canal IF : transition de l'éclairage et des écrans",
    subtitle:
      "Comment le remplacement des ampoules à incandescence et des écrans CRT a introduit les EMF de fréquence intermédiaire dans chaque foyer — et pourquoi le vide réglementaire est important.",
    backLink: "← Retour aux preuves",
    narratives: [
      {
        id: "lighting",
        title: "Transition de l'éclairage : le virage EMF invisible",
        paragraphs: [
          "Le remplacement des ampoules à incandescence par l'éclairage LED (interdiction UE 2009-2012, similaire ailleurs) a transformé chaque douille de lampe d'une résistance passive ne produisant aucun EMF au-dessus de 50 Hz en une source EMF active à fréquence kHz. Un foyer typique possède 15 à 30 ampoules LED, chacune contenant une alimentation à découpage fonctionnant à 20-200 kHz avec des harmoniques s'étendant plus haut.",
          "Les études attribuant les effets sanitaires des LED à la 'lumière bleue' (Tosini 2016) n'ont pas contrôlé la composante EMF. Les ampoules LED produisent à la fois de la lumière bleue et des EMF kHz ; les ampoules à incandescence ne produisent ni l'un ni l'autre. Lorsqu'une étude compare LED et incandescence et trouve une suppression de la mélatonine, elle ne peut déterminer si la cause était spectrale (lumière bleue via rétine → SCN) ou électromagnétique (champs kHz via pinéale ou VGCC). Aucune expérience de séparation n'a été menée.",
          "L'activité biologique des champs de fréquence intermédiaire (gamme kHz) est confirmée par les [[ref:ttfields_mechanism|Tumor Treating Fields (TTFields)]], une thérapie anticancéreuse approuvée par la FDA utilisant des champs alternatifs de 100-300 kHz pour perturber la division cellulaire. Si ces fréquences sont thérapeutiquement actives dans les cellules cancéreuses, elles ne peuvent être biologiquement inertes dans les tissus normaux.",
          "L'éclairage public LED amplifie l'effet : [[ref:boyes2021|Boyes et al. 2021 (Science Advances)]] ont constaté une réduction de 47 % de l'abondance des chenilles de papillons de nuit sous les lampadaires LED vs sites non éclairés, avec des effets plus importants des LED que des lampes au sodium. [[ref:pawson2014|Pawson & Bader 2014]] ont trouvé que les pièges LED capturaient 48 % d'insectes de plus que le sodium. La note éditoriale de Science sur [[ref:lindecke2026|Lindecke 2026]] identifie explicitement les lumières LED comme source de bruit RF biologique.",
          "L'interdiction européenne de l'incandescence ([[ref:eu_regulation_244_2009|Directive 244/2009]]) fournit une expérience naturelle testable. L'interdiction a été phasée : >100 W en septembre 2009, >75 W en 2010, >60 W en 2011, tous les restants en 2012, halogènes en 2018. C'était un changement mandaté administrativement, non auto-sélectionné, à l'échelle de la population, de zéro source IF-EMF à des sources IF-EMF continues affectant ~450 millions de personnes. [[ref:zeghoudi2025_led_driver_emf|Zeghoudi et al. 2025 (Optics & Laser Technology)]] ont directement mesuré les émissions en champ proche des drivers LED, confirmant des composantes de champ E mesurables à des distances centimétriques.",
          "BERM prédit que les pays de l'UE — où la transition lumineuse a été mandatée et simultanée — montreront un déclin accéléré du TFR en 2015-2022 (décalage de 5-10 ans dû aux dommages spermatogéniques cumulatifs) par rapport aux pays où l'interdiction est survenue plus tard ou pas du tout (USA effective 2023, de nombreux pays en développement encore sans interdiction). Ceci est testable avec les données démographiques existantes utilisant une régression en différences de différences avec le moment de l'interdiction LED comme variable de traitement.",
        ],
        studies: [
          { citation: "Boyes et al. (Science Advances)", year: 2021, referenceId: "boyes2021", note: "Lampadaires LED : -47 % chenilles vs non éclairé" },
          { citation: "Pawson & Bader (Ecological Applications)", year: 2014, referenceId: "pawson2014", note: "Pièges LED : +48 % capture d'insectes vs sodium" },
          { citation: "Tuszynski et al. — TTFields (PMC5129338)", year: 2016, referenceId: "ttfields_mechanism", note: "Champs 100-300 kHz perturbent la division cellulaire (FDA)" },
          { citation: "Étude qualité électrique LED (PMC9920439)", year: 2023, referenceId: "pmc9920439_led_harmonics", note: "Les ampoules LED dépassent les limites de distorsion harmonique" },
          { citation: "Havas — dirty electricity (ICEMS)", year: 2006, referenceId: "havas2006", note: "Le filtrage kHz a amélioré les symptômes diabète/SEP" },
          { citation: "Aerts et al. (Environment International)", year: 2019, referenceId: "if_systematic_review_2019", note: "Champs IF (300 Hz-1 MHz) peu étudiés" },
          { citation: "Revue systématique IJRB", year: 2022, referenceId: "ijrb2022_if_review", note: "IF-EMF (300 Hz-10 MHz) : recherche sanitaire minimale vs ELF/RF" },
          { citation: "Zeghoudi et al. (Optics & Laser Technology)", year: 2025, referenceId: "zeghoudi2025_led_driver_emf", note: "Émission champ E proche du driver LED mesurée" },
          { citation: "Directive UE 244/2009", year: 2009, referenceId: "eu_regulation_244_2009", note: "Interdiction progressive incandescence 2009-2012, sans évaluation EMF" },
        ],
      },
      {
        id: "display",
        title: "Transition des écrans : CRT → LCD/LED",
        paragraphs: [
          "La transition des CRT aux téléviseurs LCD/LED à écran plat (2005-2015) n'était pas simplement un changement de technologie d'affichage — c'était une transformation EMF multiplicative. Le nombre d'écrans par foyer est passé de ~1 à ~3-4. La taille moyenne des écrans est passée de 27\" à 60\" (~5× la surface). La pénétration des TV dans les chambres est passée de 15 % à 70 %. Le Wi-Fi intégré a ajouté une émission RF continue 2,4/5 GHz. La distance de visionnage a diminué. Les heures de visionnage ont augmenté avec la culture du streaming.",
          "Les téléviseurs CRT n'étaient pas silencieux en EMF — leurs bobines de déviation produisaient de forts champs VLF (15,6 kHz) et ELF (50 Hz). Mais ceux-ci provenaient d'un seul appareil à 3-4 m de distance. Le remplacement par plusieurs écrans LCD connectés au Wi-Fi dans chaque pièce, y compris les chambres à 1,5-2 m de la glande pinéale pendant les heures du soir, représente un changement qualitatif du profil d'exposition EMF circadien.",
          "Le téléviseur de chambre est particulièrement pertinent pour la voie circadienne de BERM (Voie B) : un grand écran rétroéclairé LED, connecté au Wi-Fi, à hauteur de tête, fonctionnant du soir à travers la fenêtre de production de mélatonine, produisant simultanément lumière bleue et EMF. L'effet multiplicatif (nombre × taille × chambre × Wi-Fi × heures × proximité) est bien plus important que toute analyse mono-facteur ne le suggérerait.",
        ],
        studies: [
          { citation: "Données pénétration marché écrans (Statista/GWI)", year: "2005-24", referenceId: "display_market_penetration_2005_2024", note: "Nombre d'écrans 1 → 3,5, pénétration chambre 15 % → 70 %" },
          { citation: "Culture streaming et augmentation temps écran", year: "2012-24", referenceId: "streaming_screen_time_2012_2024", note: "Heures visionnage moyennes +2,5h avec streaming" },
        ],
      },
    ],
    seeAlsoTitle: "Voir aussi",
    evidenceLink: "← Portail des preuves",
    citationHeader: "Citation",
    yearHeader: "Année",
    noteHeader: "Note",
    findingHeader: "Résultat",
    lightingTransition: {
      title: "La transition lumineuse : de la lumière thermique à la lumière électronique",
      paragraphs: [
        "Entre 2009 et 2019, l'Union européenne a progressivement interdit les ampoules à incandescence et les a remplacées par l'éclairage LED. La raison invoquée était l'efficacité énergétique. La conséquence électromagnétique n'a pas été mentionnée : chaque lampe LED contient une alimentation à découpage (SMPS) qui convertit le 230 V AC en DC à des fréquences de commutation de 20-300 kHz. Cela a introduit un nouveau canal électromagnétique — la fréquence intermédiaire (IF) — dans chaque foyer, bureau, école et hôpital qui n'existait pas à l'ère de l'incandescence. Une ampoule à incandescence est une résistance : elle produit un champ magnétique 50/60 Hz (ELF) proportionnel à son courant, et rien d'autre. Une lampe LED est un circuit de commutation : elle produit de l'ELF (du secteur), de l'IF (du driver, 20-300 kHz) et du scintillement optique (du lissage DC incomplet).",
        "La gamme IF (300 Hz – 10 MHz) se situe dans un vide réglementaire. L'ELF (en dessous de 300 Hz) est réglementé par les directives ICNIRP de 2010. La RF (au-dessus de 100 kHz) est réglementée par les directives ICNIRP de 1998/2020. La gamme IF se situe entre les deux, avec des limites chevauchantes mais incohérentes. [[ref:ijrb2022_if_review|Une revue systématique de 2022 dans l'International Journal of Radiation Biology]] a constaté que 'par rapport aux bandes ELF ou RF EMF, des études sur les effets sanitaires avec des perspectives plus diversifiées de l'IF-EMF n'ont PAS été menées.' Le canal IF n'est pas étudié parce que personne ne l'a étudié — pas parce qu'il a été trouvé sûr.",
        "Trois lignes de preuves indépendantes relient les EMF de fréquence IF aux effets biologiques. Premièrement, [[ref:kim2026_cell_gene_switch|Kim et al. (Cell, 2026)]] ont démontré que les EMF pulsés à 60 Hz activent l'expression génique via des oscillations calciques médiées par Cyb5b ; leur interrupteur génique utilisait 4 kHz, en plein dans la gamme IF produite par les drivers LED. Deuxièmement, [[ref:heliyon_150khz_fertility_2022|une étude de 2022 (Heliyon, PMC9952889)]] a exposé des rats à des EMF IF de 150 kHz pendant huit semaines et observé des modifications significatives de la masse testiculaire (p=0,03), du nombre de cellules interstitielles (p=0,01) et des taux de FSH (p=0,01). Troisièmement, [[ref:ttfields_novocure_fda|les TTFields de Novocure — approuvés par la FDA —]] opèrent à 200 kHz, détruisant les cellules cancéreuses par perturbation du fuseau mitotique. Si les champs de 200 kHz peuvent perturber intentionnellement la division cellulaire, les champs environnementaux de 200 kHz des drivers LED peuvent la perturber involontairement.",
        "L'explication conventionnelle attribue les effets sanitaires des LED à la suppression de la mélatonine par la lumière bleue. BERM ne nie pas ce mécanisme mais argue qu'il est insuffisant. [[ref:duraccio2019_blue_light|Duraccio et al. (2019)]] ont constaté que les lunettes filtrant la lumière bleue n'amélioraient PAS significativement la qualité du sommeil des adolescents — suggérant que la composante non optique (émissions IF) pourrait être la voie la plus importante. Prédiction de BERM : une lampe LED blindée Faraday (bloquant les émissions IF tout en préservant un spectre lumineux identique) produirait moins de perturbation biologique qu'une lampe non blindée avec un spectre identique.",
        "La transition lumineuse de l'UE (2009-2019) a créé une expérience naturelle. Les pays ayant adopté l'éclairage LED plus tôt ont connu des augmentations d'exposition IF plus tôt. Si l'IF contribue aux effets biologiques, le déclin du TFR devrait s'accélérer davantage dans les pays précoces après contrôle de la croissance RF. Test de falsification T1 : Comparer l'accélération du TFR avant et après le début de la transition LED, en contrôlant la croissance mobile/haut débit. Si pas d'accélération → canal IF non soutenu. Si l'accélération corrèle avec le moment d'adoption LED → cohérent avec l'hypothèse IF.",
      ],
      epistemic: "Niveau épistémique : vide réglementaire IF [E] ([[ref:ijrb2022_if_review|IJRB 2022]]). Mécanisme Cyb5b [E] ([[ref:kim2026_cell_gene_switch|Kim 2026 Cell]]). Fertilité 150 kHz [E] ([[ref:heliyon_150khz_fertility_2022|Heliyon 2022]]). [[ref:ttfields_novocure_fda|TTFields]] [E] (FDA). Insuffisance lumière bleue [C] ([[ref:duraccio2019_blue_light|Duraccio 2019]]). Test population LED-DID [C] (non testé).",
      citationFindings: [
        "IF-EMF (300 Hz – 10 MHz) systématiquement sous-étudié ; vide réglementaire documenté",
        "Capteur EMF Cyb5b : 60 Hz → oscillations Ca²⁺ → expression génique in vivo (validé CRISPR)",
        "150 kHz IF-EMR 8 sem : masse testiculaire ↓, cellules interstitielles ↓, FSH ↑ chez les rats",
        "200 kHz détruit les cellules cancéreuses via perturbation du fuseau mitotique (FDA)",
        "Les lunettes filtrant la lumière bleue n'ont PAS amélioré significativement le sommeil des adolescents",
        "La réduction des transitoires kHz a modifié la dopamine et la PEA urinaires (N=7 pilote)",
        "Les drivers LED génèrent du bruit IF-EMF à 65 kHz – 2 MHz",
        "Cav1.4 (VGCC) favorise la dégénérescence rétinienne",
        "Évaluation du danger lumière bleue : photosensibilisation A2E réelle, mais mécanisme chevauchant",
        "Les ampoules à incandescence 'n'ont pas démontré d'effets indésirables sur la vision'",
      ],
    },
    spermatogenesis: {
      title: "La connexion avec la spermatogenèse",
      paragraphs: [
        "La spermatogenèse — la production de spermatozoïdes matures à partir de cellules germinales — est un processus MITOTIQUE. Les cellules germinales se divisent de manière clonale à travers plusieurs cycles de mitose avant de se différencier en spermatozoïdes. Cela rend la spermatogenèse intrinsèquement vulnérable à tout agent perturbant la mitose.",
        "Les [[ref:ttfields_mechanism|TTFields]], la thérapie anticancéreuse approuvée par la FDA opérant à 100-300 kHz, détruisent les cellules cancéreuses précisément en perturbant la mitose. Les propres recherches du fabricant montrent que la mitose des cellules NORMALES est perturbée à environ 50 kHz — une fréquence choisie pour être ÉVITÉE dans le traitement du cancer afin de minimiser les effets secondaires sur les tissus sains (Nature 2020).",
        "Les fréquences de commutation des drivers LED (20-100 kHz) tombent exactement dans cette gamme. L'exposition IF environnementale de l'éclairage LED opère à la fréquence que la recherche TTFields a identifiée comme la plus perturbatrice pour la division cellulaire normale.",
        "Le groupe de recherche de l'UWI Trinidad a explicité ce lien : « Puisque les cellules germinales testiculaires des mammifères prolifèrent clonalement par cycles mitotiques avant de se différencier en spermatozoïdes matures, l'effet des IF sur les risques reproductifs dans cette gamme de fréquences TTFields (100–300 kHz) doit être étudié. » [[ref:heliyon_150khz_fertility_2022|Leur étude à 150 kHz]] a observé des réductions significatives de la masse testiculaire (p=0,03), du nombre de cellules interstitielles (p=0,01) et une modification des taux de FSH (p=0,01) (Sundaram 2022).",
      ],
      epistemic: "Niveau épistémique : [[ref:ttfields_mechanism|mécanisme TTFields]] [E] (approuvé FDA). [[ref:heliyon_150khz_fertility_2022|UWI Trinidad 150 kHz]] [M|C] (étude animale, groupe unique). Pertinence environnementale [L] (écart d'intensité de champ).",
    },
    vdt: {
      title: "Le précédent VDT : champs IF et reproduction dans les années 1980",
      paragraphs: [
        "Dans les années 1980, des clusters de fausses couches ont été signalés parmi les travailleurs VDT (terminal d'affichage vidéo). Les bobines de déviation horizontale des moniteurs CRT produisaient des champs IF de 15-30 kHz — la même gamme de fréquences que les drivers LED modernes. Le problème a été résolu par un changement technologique (LCD), pas par la science.",
        "Les preuves épidémiologiques étaient mitigées : certaines études montraient un risque élevé (McDonald 1986, Goldhaber 1988), d'autres non (Schnorr/NIOSH 1991). L'étude NIOSH a été considérée comme définitive, mais elle n'utilisait les mesures de champ VLF (15 kHz) que comme proxy grossier — elle ne distinguait pas les champs pulsés des continus, ni ne mesurait la variabilité d'émission des moniteurs individuels. Quand les écrans LCD ont remplacé les CRT dans les années 2000, l'exposition IF des travailleurs VDT a disparu — et avec elle, la motivation d'enquêter.",
        "Contexte BERM : le cas VDT est un précédent historique pour le canal IF. Les champs CRT de 15-30 kHz occupent la même gamme de fréquences que les émissions de 20-100 kHz des drivers LED. Le problème VDT a été 'résolu' en remplaçant les CRT par des LCD — mais les LCD contiennent des rétroéclairages LED dont les drivers produisent des champs dans la même gamme de fréquences. L'exposition IF n'a pas disparu ; elle s'est déplacée des travailleurs VDT à la population entière.",
      ],
      epistemic: "Niveau épistémique : [C] (précédent historique). L'épidémiologie VDT n'est pas une preuve du danger IF — c'est la preuve que les effets reproductifs des champs IF ont été observés auparavant et laissés non résolus.",
    },
  },

  ko: {
    title: "IF 채널: 조명 및 디스플레이 전환",
    subtitle:
      "백열전구와 CRT 화면의 교체가 어떻게 중간 주파수 EMF를 모든 가정에 도입했는지 — 그리고 규제 공백이 왜 중요한지.",
    backLink: "← 증거로 돌아가기",
    narratives: [
      {
        id: "lighting",
        title: "조명 전환: 보이지 않는 EMF 변화",
        paragraphs: [
          "백열전구를 LED 조명으로 교체(EU 금지 2009-2012년, 다른 지역도 유사)하면서 모든 램프 소켓이 50 Hz 이상의 EMF를 생성하지 않는 수동 저항체에서 활성 kHz 주파수 EMF 원으로 전환되었습니다. 일반 가정에는 15-30개의 LED 전구가 있으며, 각각 20-200 kHz에서 작동하는 스위칭 전원 공급 장치를 내장하고 더 높은 고조파를 생성합니다.",
          "LED 건강 영향을 '블루라이트'에 귀속시킨 연구(Tosini 2016)는 EMF 구성요소를 통제하지 않았습니다. LED 전구는 블루라이트와 kHz-EMF를 모두 생성하지만 백열전구는 어느 것도 생성하지 않습니다. 연구가 LED와 백열전구를 비교하여 멜라토닌 억제를 발견했을 때, 원인이 스펙트럼적(블루라이트가 망막 → SCN을 통해)인지 전자기적(kHz 장이 송과체 또는 VGCC를 통해)인지 결정할 수 없습니다. 분리 실험은 수행되지 않았습니다.",
          "중간 주파수 장(kHz 대역)의 생물학적 활성은 [[ref:ttfields_mechanism|Tumor Treating Fields(TTFields)]] — 세포 분열을 방해하기 위해 100-300 kHz 교류장을 사용하는 FDA 승인 암 치료법 — 에 의해 확인되었습니다. 이 주파수가 암 세포에 치료적으로 활성이라면, 정상 조직에서 생물학적으로 불활성일 수 없습니다.",
          "LED 가로등 조명이 효과를 증폭합니다: [[ref:boyes2021|Boyes 등 2021년(Science Advances)]]은 LED 가로등 아래에서 비조명 지점 대비 나방 유충 개체 수 47% 감소를 발견했으며, 나트륨 램프보다 LED 효과가 더 컸습니다. [[ref:pawson2014|Pawson & Bader 2014년]]은 LED 트랩이 나트륨보다 48% 더 많은 곤충을 포획했다고 보고했습니다. [[ref:lindecke2026|Lindecke 2026년]]에 대한 Science 편집 주석은 LED 조명을 생물학적 RF 노이즈 원으로 명시적으로 식별합니다.",
          "EU 백열전구 금지([[ref:eu_regulation_244_2009|지침 244/2009]])는 검증 가능한 자연 실험을 제공합니다. 금지는 단계적이었습니다: 2009년 9월 100W 초과, 2010년 75W 초과, 2011년 60W 초과, 2012년 나머지 전부, 2018년 할로겐. 이것은 행정적으로 의무화된, 자기 선택이 아닌, 약 4억 5천만 명에게 영향을 미치는 IF-EMF 제로 원에서 연속 IF-EMF 원으로의 인구 규모 전환이었습니다. [[ref:zeghoudi2025_led_driver_emf|Zeghoudi 등 2025년(Optics & Laser Technology)]]은 LED 드라이버 근접장 방출을 직접 측정하여 센티미터 거리에서 측정 가능한 전기장 성분을 확인했습니다.",
          "BERM은 조명 전환이 의무적이고 동시적이었던 EU 국가들이, 금지가 더 늦게 또는 전혀 시행되지 않은 국가(미국은 2023년 발효, 많은 개발도상국은 아직 금지 없음)와 비교하여, 2015-2022년에 TFR 감소 가속을 보일 것으로 예측합니다(누적 정자형성 손상으로부터 5-10년 시차). 이는 LED 금지 시점을 처치 변수로 사용하는 이중차분 회귀분석으로 기존 인구 통계 데이터에서 검증 가능합니다.",
        ],
        studies: [
          { citation: "Boyes et al. (Science Advances)", year: 2021, referenceId: "boyes2021", note: "LED 가로등: 비조명 대비 나방 유충 -47%" },
          { citation: "Pawson & Bader (Ecological Applications)", year: 2014, referenceId: "pawson2014", note: "LED 트랩: 나트륨 대비 곤충 포획 +48%" },
          { citation: "Tuszynski et al. — TTFields (PMC5129338)", year: 2016, referenceId: "ttfields_mechanism", note: "100-300 kHz 장이 세포 분열 방해(FDA 승인)" },
          { citation: "LED 전력 품질 연구 (PMC9920439)", year: 2023, referenceId: "pmc9920439_led_harmonics", note: "LED 전구가 고조파 왜곡 한도 초과" },
          { citation: "Havas — dirty electricity (ICEMS)", year: 2006, referenceId: "havas2006", note: "kHz 필터링이 당뇨/MS 증상 개선" },
          { citation: "Aerts et al. (Environment International)", year: 2019, referenceId: "if_systematic_review_2019", note: "IF 장(300 Hz-1 MHz) 연구 부족" },
          { citation: "IJRB 체계적 리뷰", year: 2022, referenceId: "ijrb2022_if_review", note: "IF-EMF(300 Hz-10 MHz) 동물 연구: ELF/RF 대비 최소한의 건강 연구" },
          { citation: "Zeghoudi et al. (Optics & Laser Technology)", year: 2025, referenceId: "zeghoudi2025_led_driver_emf", note: "LED 드라이버 근접장 E장 방출 측정" },
          { citation: "EU 지침 244/2009", year: 2009, referenceId: "eu_regulation_244_2009", note: "백열전구 단계적 금지 2009-2012, EMF 평가 없음" },
        ],
      },
      {
        id: "display",
        title: "디스플레이 전환: CRT → LCD/LED",
        paragraphs: [
          "CRT에서 평면 LCD/LED 텔레비전으로의 전환(2005-2015년)은 단순한 디스플레이 기술 변경이 아니었습니다 — 곱셈적 EMF 변환이었습니다. 가구당 화면 수가 약 1에서 약 3-4로 증가했습니다. 평균 화면 크기가 27인치에서 60인치로 성장(약 5배 표면적). 침실 TV 보급률이 15%에서 70%로 상승했습니다. 내장 Wi-Fi가 2.4/5 GHz 연속 RF 방출을 추가했습니다. 시청 거리가 감소했습니다. 스트리밍 문화로 시청 시간이 증가했습니다.",
          "CRT 텔레비전은 EMF 무음이 아니었습니다 — 편향 코일이 강한 VLF 장(15.6 kHz)과 ELF 장(50 Hz)을 생성했습니다. 그러나 이것은 3-4 m 거리의 단일 장치에서 발생한 것이었습니다. 저녁 시간에 송과체에서 1.5-2 m 떨어진 침실을 포함한 모든 방에서 여러 Wi-Fi 연결 LCD 화면으로의 교체는 일주기 EMF 노출 프로필의 질적 변화를 나타냅니다.",
          "침실 텔레비전은 BERM의 일주기 경로(경로 B)에 특히 관련됩니다: 머리 높이에 있는 대형 LED 백라이트, Wi-Fi 연결 화면이 저녁부터 멜라토닌 생산 윈도우를 통해 작동하며 블루라이트와 EMF를 동시에 생성합니다. 곱셈 효과(대수 × 크기 × 침실 × Wi-Fi × 시간 × 근접성)는 단일 요인 분석이 제안하는 것보다 훨씬 큽니다.",
        ],
        studies: [
          { citation: "디스플레이 시장 보급률 데이터 (Statista/GWI)", year: "2005-24", referenceId: "display_market_penetration_2005_2024", note: "화면 수 1 → 3.5, 침실 보급률 15% → 70%" },
          { citation: "스트리밍 문화와 스크린 타임 증가", year: "2012-24", referenceId: "streaming_screen_time_2012_2024", note: "스트리밍 도입으로 평균 시청 시간 +2.5h" },
        ],
      },
    ],
    seeAlsoTitle: "관련 항목",
    evidenceLink: "← 증거 포털",
    citationHeader: "인용",
    yearHeader: "연도",
    noteHeader: "비고",
    findingHeader: "발견",
    lightingTransition: {
      title: "조명 전환: 열적 광원에서 전자적 광원으로",
      paragraphs: [
        "2009년부터 2019년까지 유럽연합은 백열전구를 단계적으로 폐지하고 LED 조명으로 교체했습니다. 공표된 이유는 에너지 효율이었습니다. 전자기적 결과는 언급되지 않았습니다: 모든 LED 램프는 230V AC를 20-300 kHz의 스위칭 주파수로 DC로 변환하는 스위칭 전원 공급 장치(SMPS)를 포함합니다. 이는 백열전구 시대에 존재하지 않았던 새로운 전자기 채널 — 중간 주파수(IF) — 를 모든 가정, 사무실, 학교, 병원에 도입했습니다. 백열전구는 저항입니다: 전류에 비례하는 50/60 Hz 자기장(ELF)을 생성하며 그 외에는 아무것도 없습니다. LED 램프는 스위칭 회로입니다: ELF(전원에서), IF(드라이버에서, 20-300 kHz), 그리고 광학적 깜빡임(불완전한 DC 평활에서)을 생성합니다.",
        "IF 범위(300 Hz – 10 MHz)는 규제 공백에 위치합니다. ELF(300 Hz 미만)는 ICNIRP의 2010년 가이드라인으로 규제됩니다. RF(100 kHz 초과)는 ICNIRP의 1998/2020년 가이드라인으로 규제됩니다. IF 범위는 이 둘 사이에 위치하며, 중첩되지만 불일치하는 한도를 가집니다. [[ref:ijrb2022_if_review|International Journal of Radiation Biology의 2022년 체계적 리뷰]]는 'ELF 또는 RF EMF 대역과 비교하여, IF-EMF의 건강 영향에 대한 보다 다양한 관점의 연구가 수행되지 않았다'고 밝혔습니다. IF 채널은 아무도 연구하지 않았기 때문에 미연구 상태입니다 — 안전하다고 밝혀졌기 때문이 아닙니다.",
        "세 가지 독립적인 증거 라인이 IF 주파수 EMF를 생물학적 영향과 연결합니다. 첫째, [[ref:kim2026_cell_gene_switch|Kim 등(Cell, 2026)]]은 60 Hz 펄스 EMF가 Cyb5b 매개 칼슘 진동을 통해 유전자 발현을 활성화함을 입증했습니다; 그들의 유전자 스위치는 4 kHz를 사용했으며, 이는 LED 드라이버가 생성하는 IF 범위에 정확히 해당합니다. 둘째, [[ref:heliyon_150khz_fertility_2022|2022년 연구(Heliyon, PMC9952889)]]는 쥐를 150 kHz IF-EMF에 8주간 노출하고 고환 질량(p=0.03), 간질세포 수(p=0.01), FSH 수치(p=0.01)의 유의한 변화를 관찰했습니다. 셋째, [[ref:ttfields_novocure_fda|Novocure의 TTFields — FDA 승인 교모세포종 치료 —]] 는 200 kHz에서 작동하며, 유사분열 방추체 교란을 통해 암 세포를 파괴합니다. 200 kHz 장이 의도적으로 세포 분열을 교란할 수 있다면, LED 드라이버의 환경 200 kHz 장은 비의도적으로 세포 분열을 교란할 수 있습니다.",
        "기존의 설명은 LED의 건강 영향을 멜라토닌의 블루라이트 억제에 귀속시킵니다. BERM은 이 메커니즘을 부정하지 않지만 불충분하다고 주장합니다. [[ref:duraccio2019_blue_light|Duraccio 등(2019)]]은 블루라이트 차단 안경이 청소년 수면의 질을 유의하게 개선하지 않았음을 발견했습니다 — 이는 비광학적 구성요소(IF 방출)가 더 중요한 경로일 수 있음을 시사합니다. BERM의 예측: 패러데이 차폐 LED 램프(동일 광출력을 유지하면서 IF 방출을 차단)는 동일 스펙트럼의 비차폐 램프보다 적은 생물학적 교란을 생성할 것입니다.",
        "EU의 조명 전환(2009-2019)은 자연 실험을 창출했습니다. LED 조명을 더 일찍 채택한 국가는 IF 노출 증가를 더 일찍 경험했습니다. IF가 생물학적 영향에 기여한다면, TFR 감소는 RF 성장을 통제한 후 조기 채택 국가에서 더 가속되어야 합니다. 부정 검증 T1: LED 전환 시작 전후의 TFR 가속을 비교하고 모바일/광대역 성장을 통제. 가속이 없으면 → IF 채널 지지되지 않음. 가속이 LED 채택 시기와 상관하면 → IF 가설과 일관.",
      ],
      epistemic: "인식론적 수준: IF 규제 공백 [E] ([[ref:ijrb2022_if_review|IJRB 2022]]). Cyb5b 메커니즘 [E] ([[ref:kim2026_cell_gene_switch|Kim 2026 Cell]]). 150 kHz 생식력 [E] ([[ref:heliyon_150khz_fertility_2022|Heliyon 2022]]). [[ref:ttfields_novocure_fda|TTFields]] [E] (FDA). 블루라이트 불충분 [C] ([[ref:duraccio2019_blue_light|Duraccio 2019]]). LED-DID 인구 테스트 [C] (미검증).",
      citationFindings: [
        "IF-EMF(300 Hz – 10 MHz) 체계적으로 연구 부족; 규제 공백 문서화",
        "Cyb5b EMF 센서: 60 Hz → Ca²⁺ 진동 → 유전자 발현 in vivo(CRISPR 검증)",
        "150 kHz IF-EMR 8주: 쥐에서 고환 질량 ↓, 간질 세포 ↓, FSH ↑",
        "200 kHz가 유사분열 방추체 교란으로 암 세포 파괴(FDA 승인)",
        "블루라이트 차단 안경이 청소년 수면을 유의하게 개선하지 않음",
        "kHz 과도현상 감소가 소변 도파민과 PEA를 변화시킴(N=7 파일럿)",
        "LED 드라이버가 65 kHz – 2 MHz에서 IF-EMF 노이즈 생성",
        "Cav1.4(VGCC)가 망막 변성을 촉진",
        "블루라이트 위험 평가: A2E 광감작은 실재하나 메커니즘이 중복",
        "백열전구는 '시각에 대한 유해 효과를 보이지 않았다'",
      ],
    },
    spermatogenesis: {
      title: "정자형성 연관",
      paragraphs: [
        "정자형성 — 생식 세포로부터 성숙 정자의 생산 — 은 유사분열 과정입니다. 생식 세포는 정자로 분화하기 전에 여러 차례의 유사분열을 통해 클론적으로 분열합니다. 이는 정자형성을 유사분열을 교란하는 모든 인자에 대해 본질적으로 취약하게 만듭니다.",
        "[[ref:ttfields_mechanism|TTFields]], 100-300 kHz에서 작동하는 FDA 승인 암 치료법은 정확히 유사분열을 교란함으로써 암 세포를 파괴합니다. 제조업체 자체 연구에 따르면 정상 세포의 유사분열은 약 50 kHz에서 교란됩니다 — 건강한 조직에 대한 부작용을 최소화하기 위해 암 치료에서 회피하도록 선택된 주파수입니다(Nature 2020).",
        "LED 드라이버 스위칭 주파수(20-100 kHz)는 정확히 이 범위에 해당합니다. LED 조명으로부터의 환경 IF 노출은 TTFields 연구가 정상 세포 분열에 가장 파괴적이라고 식별한 주파수에서 작동합니다.",
        "UWI 트리니다드 연구팀은 이 연관을 명시했습니다. ‘포유류의 고환 생식세포는 성숙한 정자로 분화하기 전에 유사분열을 반복해 클론 증식하므로, 이 TTFields 주파수 범위(100–300 kHz)에서 IF가 생식 위험에 미치는 영향을 조사해야 한다.’ [[ref:heliyon_150khz_fertility_2022|이들의 150 kHz 연구]]는 고환 질량의 유의한 감소(p=0.03), 간질세포 수 감소(p=0.01), FSH 수치 변화(p=0.01)를 관찰했습니다(Sundaram 2022).",
      ],
      epistemic: "인식론적 수준: [[ref:ttfields_mechanism|TTFields 메커니즘]] [E] (FDA 승인). [[ref:heliyon_150khz_fertility_2022|UWI 트리니다드 150 kHz]] [M|C] (동물 연구, 단일 그룹). 환경 관련성 [L] (장 강도 차이).",
    },
    vdt: {
      title: "VDT 선례: 1980년대 IF 장과 생식",
      paragraphs: [
        "1980년대에 VDT(비디오 디스플레이 터미널) 작업자 사이에서 유산 클러스터가 보고되었습니다. CRT 모니터의 수평 편향 코일은 15-30 kHz IF 장을 생성했습니다 — 현대 LED 드라이버와 동일한 주파수 범위입니다. 이 문제는 과학이 아닌 기술 변경(LCD)으로 해결되었습니다.",
        "역학적 증거는 혼재했습니다: 일부 연구는 위험 증가를 보여주었고(McDonald 1986, Goldhaber 1988), 다른 연구는 그렇지 않았습니다(Schnorr/NIOSH 1991). NIOSH 연구는 결정적인 것으로 취급되었지만, VLF 장 측정(15 kHz)을 조잡한 프록시로만 사용했습니다 — 펄스 장과 연속 장을 구분하지 않았고, 개별 모니터 방출 변동성을 측정하지 않았습니다. 2000년대에 LCD 화면이 CRT를 대체하면서 VDT 작업자의 IF 노출이 사라졌고 — 조사 동기도 함께 사라졌습니다.",
        "BERM 맥락: VDT 사례는 IF 채널의 역사적 선례입니다. CRT의 15-30 kHz 장은 LED 드라이버의 20-100 kHz 방출과 동일한 주파수 범위를 차지합니다. VDT 문제는 CRT를 LCD로 교체함으로써 '해결'되었습니다 — 그러나 LCD는 동일한 주파수 범위의 장을 생성하는 드라이버가 있는 LED 백라이트를 포함합니다. IF 노출은 사라지지 않았습니다; VDT 작업자에서 전체 인구로 이동했습니다.",
      ],
      epistemic: "인식론적 수준: [C] (역사적 선례). VDT 역학은 IF 유해성의 증거가 아닙니다 — IF 장의 생식 영향이 이전에 관찰되고 미해결로 남겨졌다는 증거입니다.",
    },
  },
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const d = pickCopy(COPY, locale);
  return { title: `${d.title} – Extinction Field`, description: d.subtitle };
}

export default async function LightingPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const d = pickCopy(COPY, locale);

  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <Link href={`/${locale}/evidence`} className="text-sm text-accent hover:underline mb-6 inline-block">
        {d.backLink}
      </Link>

      <PageHeader icon={Lightbulb} title={d.title} subtitle={d.subtitle} lensIcon={<BermIcon name="physics" size={28} className="text-accent" />} />

      {/* Thematic narratives */}
      <section className="mb-16">
        <div className="space-y-12 max-w-4xl">
          {d.narratives.map((narrative, ni) => (
            <article key={narrative.id} id={`narrative-${narrative.id}`} className="scroll-mt-24">
              <h3 className="text-lg font-semibold mb-4">
                <span className="font-mono-num text-xs text-accent mr-2">0{ni + 1}</span>
                {narrative.title}
              </h3>
              {narrative.paragraphs.length > 0 && (
                <p className="editorial-rail mb-4 text-[0.95rem] leading-relaxed text-foreground">
                  <InlineReferenceText text={narrative.paragraphs[0]} locale={locale} />
                </p>
              )}
              <div className="space-y-3 text-sm text-foreground-muted leading-relaxed mb-5">
                {narrative.paragraphs.slice(1).map((p, pi) => (
                  <p key={pi}><InlineReferenceText text={p} locale={locale} /></p>
                ))}
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="border-b border-card-border text-left text-xs text-foreground-muted uppercase tracking-wider">
                      <th className="py-2 pr-3">{d.citationHeader}</th>
                      <th className="py-2 pr-3 w-16">{d.yearHeader}</th>
                      <th className="py-2">{d.noteHeader}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {narrative.studies.map((s) => (
                      <tr key={`${s.citation}-${s.year}`} className="border-b border-card-border/40">
                        <td className="py-2 pr-3 font-medium text-foreground"><CitationLink referenceId={s.referenceId} locale={locale} citation={s.citation} year={s.year} /></td>
                        <td className="py-2 pr-3 font-mono-num text-foreground-muted">{s.year}</td>
                        <td className="py-2 text-foreground-muted">{s.note}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {narrative.id === "lighting" && (
                <div className="mt-8">
                  <LightingTransitionTimeline locale={locale} />
                </div>
              )}
            </article>
          ))}
        </div>
      </section>

      {/* The Lighting Transition -- IF-EMF from LED drivers */}
      <section id="lighting-transition" className="mb-16 border-t editorial-rule pt-6">
        <h2 className="editorial-section-heading mb-3">
          {d.lightingTransition.title}
        </h2>
        <div className="space-y-4 text-sm text-foreground-muted leading-relaxed max-w-4xl">
          <p className="editorial-rail text-[0.95rem] text-foreground">
            <InlineReferenceText text={d.lightingTransition.paragraphs[0]} locale={locale} />
          </p>
          {d.lightingTransition.paragraphs.slice(1).map((p, i) => (
            <p key={i}><InlineReferenceText text={p} locale={locale} /></p>
          ))}
        </div>
        <p className="text-xs text-foreground-muted italic mt-2 max-w-4xl">
          <InlineReferenceText text={d.lightingTransition.epistemic} locale={locale} />
        </p>

        <div className="mt-6 overflow-x-auto">
          <table className="w-full text-sm border-collapse max-w-4xl">
            <thead>
              <tr className="border-b border-card-border text-left text-xs text-foreground-muted uppercase tracking-wider">
                <th className="py-2 pr-3">{d.citationHeader}</th>
                <th className="py-2 pr-3 w-16">{d.yearHeader}</th>
                <th className="py-2">{d.findingHeader}</th>
              </tr>
            </thead>
            <tbody className="text-foreground-muted">
              {[
                { name: "IJRB (Ohkubo & Okano)", year: 2022, referenceId: "ijrb2022_if_review" },
                { name: "Kim et al. (Cell)", year: 2026, referenceId: "kim2026_cell_gene_switch" },
                { name: "Sundaram et al. (Heliyon, PMC9791864)", year: 2022, referenceId: "heliyon_150khz_fertility_2022" },
                { name: "TTFields / Novocure (FDA)", year: 2011, referenceId: "ttfields_novocure_fda" },
                { name: "Duraccio et al.", year: 2019, referenceId: "duraccio2019_blue_light" },
                { name: "Milham & Stetzer", year: 2013, referenceId: "milham_stetzer2013_dirty_electricity" },
                { name: "CISPR / LISUN", year: 2020 },
                { name: "PMC4896623", year: 2016, referenceId: "pmc4896623_cav14" },
                { name: "PMC7830240", year: 2021, referenceId: "pmc7830240_blue_light" },
                { name: "ScienceDirect", year: 2024 },
              ].map((row, i) => (
                <tr key={i} className="border-b border-card-border/40">
                  <td className="py-2 pr-3 font-medium text-foreground">
                    {row.referenceId ? <StudyCitation referenceId={row.referenceId} locale={locale} label={row.name} /> : row.name}
                  </td>
                  <td className="py-2 pr-3 font-mono-num">{row.year}</td>
                  <td className="py-2">{d.lightingTransition.citationFindings[i]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* The Spermatogenesis Connection */}
      <section id="spermatogenesis-connection" className="mb-16 border-t editorial-rule pt-6">
        <span id="sperm" /><span id="pathway-A-mitotic" /><span id="ttfields" />
        <h2 className="editorial-section-heading mb-3">
          {d.spermatogenesis.title}
        </h2>
        <div className="space-y-4 text-sm text-foreground-muted leading-relaxed max-w-4xl">
          <p className="editorial-rail text-[0.95rem] text-foreground">
            <InlineReferenceText text={d.spermatogenesis.paragraphs[0]} locale={locale} />
          </p>
          {d.spermatogenesis.paragraphs.slice(1).map((p, i) => (
            <p key={i}><InlineReferenceText text={p} locale={locale} /></p>
          ))}
          <p className="text-xs text-foreground-muted/70 italic">
            <InlineReferenceText text={d.spermatogenesis.epistemic} locale={locale} />
          </p>
        </div>
      </section>

      {/* VDT Precedent */}
      <section id="vdt-precedent" className="mb-16 border-t editorial-rule pt-6">
        <h2 className="editorial-section-heading mb-3">
          {d.vdt.title}
        </h2>
        <div className="space-y-4 text-sm text-foreground-muted leading-relaxed max-w-4xl">
          <p className="editorial-rail text-[0.95rem] text-foreground">
            <InlineReferenceText text={d.vdt.paragraphs[0]} locale={locale} />
          </p>
          {d.vdt.paragraphs.slice(1).map((p, i) => (
            <p key={i}><InlineReferenceText text={p} locale={locale} /></p>
          ))}
          <p className="text-xs text-foreground-muted/70 italic">
            <InlineReferenceText text={d.vdt.epistemic} locale={locale} />
          </p>
        </div>
      </section>

      {/* See also */}
      <section className="border-t editorial-rule pt-6">
        <h3 className="text-sm font-semibold text-foreground mb-3">{d.seeAlsoTitle}</h3>
        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            href={`/${locale}/evidence`}
            className="rounded-lg border border-accent/20 bg-card-bg px-4 py-3 text-accent hover:underline font-semibold text-sm"
          >
            {d.evidenceLink}
          </Link>
        </div>
      </section>
    </div>
  );
}
