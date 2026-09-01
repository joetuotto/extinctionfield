import type { Metadata } from "next";
import Link from "next/link";
import { Compass } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { BermIcon } from "@/components/BermIcon";
import { DifferentialSusceptibility } from "@/components/DifferentialSusceptibility";
import { CitationLink } from "@/components/CitationLink";
import { InlineReferenceText } from "@/components/InlineReferenceText";
import { pickCopy } from "@/lib/i18n";

const COPY = {
  en: {
    title: "Human Magnetoreception & CRY Pathways",
    subtitle: "Human cryptochrome magnetoreception, CRY pulse resonance, melatonin suppression, and differential susceptibility",
    backLink: "← Back to Evidence",
    narratives: [
      {
        id: "human-cry-magnetoreception",
        title: "Human CRY/RPM magnetoreception is functional",
        paragraphs: [
          "[[ref:chae2019|Chae et al. (2019, PLOS ONE, n=41)]] provided the first behavioral evidence that CRY/RPM magnetoreception is functional in humans. Starved men (n=20) oriented significantly toward modulated magnetic north associated with food (α=350.0°, r=0.51, P=0.00043) and east (α=83.2°, r=0.34, P=0.015). The effect disappeared under blindfold (P=0.52) and at wavelengths >500 nm (P=0.44) — the diagnostic signature of the radical pair mechanism in cryptochrome, whose FAD chromophore absorbs specifically at 400–500 nm. Vertical field inversion reversed orientation to south (α=178.4°, r=0.50, P=0.00062), consistent with an inclination compass as RPM theory predicts. Women (n=21) showed no significant orientation under any condition.",
          "BERM relevance: This establishes that the biological substrate of BERM's primary pathway (B_RPM) exists and is functional in humans. Prior CRY/RPM evidence was limited to Drosophila ([[ref:yoshii2009|Yoshii 2009]]), birds ([[ref:ritz2004|Ritz 2004]], [[ref:engels2014|Engels 2014]]), planarians ([[ref:pnasnexus2026|PNAS Nexus 2026]]), and human cell systems in vitro ([[ref:sherrard2018|Sherrard 2018]]). [[ref:chae2019|Chae 2019]] demonstrates the necessary condition — that the human CRY system responds to geomagnetic fields via the RPM — but does not test RF disruption of that response (which awaits discriminating tests D1–D3).",
          "The night-exposure pathway is particularly relevant: BERM's v17_night_fraction() models the scenario where a smartphone in the bedroom simultaneously produces blue light (activating CRY radical pairs) and RF fields (potentially disrupting them). [[ref:chae2019|Chae 2019]] demonstrates that human CRY requires blue light to be magnetically active — meaning nighttime phone use creates precisely the conditions under which CRY is both active and vulnerable to RF interference.",
          "Caveats: Small sample (n=41). Correction notice Oct 2019 corrects a misplaced table caption — no methodological changes. Not yet replicated. The sex difference (men only) may relate to glucose/motivation rather than CRY sensitivity per se.",
        ],
        studies: [
          { citation: "Chae et al. (PLOS ONE)", year: 2019, referenceId: "chae2019", note: "Blue-light-dependent human magnetoreception (P<0.001), consistent with inclination compass" },
          { citation: "Ritz et al. (Nature)", year: 2004, referenceId: "ritz2004", note: "RF at Larmor frequency disrupts bird compass" },
          { citation: "Engels et al. (Nature)", year: 2014, referenceId: "engels2014", note: "Anthropogenic EM noise disrupts bird orientation" },
          { citation: "Yoshii et al. (Nature)", year: 2009, referenceId: "yoshii2009", note: "CRY mutants lose magnetosensitivity in Drosophila" },
          { citation: "Sherrard et al. (PLOS Biology)", year: 2018, referenceId: "sherrard2018", note: "EMF modulates CRY-dependent ROS in human cell systems" },
        ],
      },
      {
        id: "cry-pulse-resonance",
        title: "CRY/RPM pulse-duration resonance",
        paragraphs: [
          "The radical-pair mechanism (RPM) lifetime in cryptochrome is approximately 1 µs — the time window during which the singlet-triplet interconversion is magnetically sensitive. This is temporally compatible with pulse durations used by air-defense radars (also ~1 µs). The coincidence is not designed but arises from the physical timescales involved: cryptochrome's singlet-triplet conversion time is the same order of magnitude as the pulse width of surveillance radars ([[ref:hore2016_v2|Hore & Mouritsen 2016]]).",
          "Each radar pulse covers the radical pair's entire lifetime, delivering the magnetic perturbation during the full conversion window. At 400 pulses per second, this produces 400 complete RPM events per second near a radar installation. By contrast, a continuous-wave (CW) signal at the same RMS applies a steady field with no pulse structure — the radical pair experiences a constant perturbation rather than discrete 1 µs windows. This predicts that pulse-modulated RF is more biologically active than CW at the same SAR. The REFLEX project ([[ref:diem2005|Diem et al. 2005]]) formally reported greater genotoxic effects from intermittent versus continuous exposure, consistent with this prediction. The temporal match is a physical coincidence, not a demonstrated resonance mechanism — it remains a testable prediction.",
          "[[ref:talbi2025_quantum_magnetoreception|Talbi, Zadeh-Haghighi & Simon 2025]] (Front. Quantum Sci. Technol. 4:1544473): Computational simulations confirm RPM resonance ceiling at ~22.5 MHz. At 872 MHz, effect is 6×10⁻⁵ % — negligible. The paper's conclusion points to electric field/VGIC interactions (pathway A) as the mechanism for telecom-frequency biological effects. From BERM's perspective, this confirms the frequency-domain separation between pathways A and B. Note: This paper is frequently misread as 'RPM doesn't work.' It actually says 'RPM works for static/ELF fields, not for GHz carriers' — which is exactly what BERM's pathway architecture assumes.",
        ],
        studies: [
          { citation: "Sherrard RM et al. PLOS Biology", year: 2018, referenceId: "sherrard2018", note: "CRY-dependent ROS generation under pulsed EMF" },
          { citation: "REFLEX / Diem et al.", year: 2005, referenceId: "diem2005", note: "Intermittent > continuous genotoxicity at same SAR" },
          { citation: "Hore & Mouritsen, Annual Review of Biophysics", year: 2016, referenceId: "hore2016_v2", note: "Radical-pair mechanism lifetime ~1 µs" },
          { citation: "Talbi, Zadeh-Haghighi & Simon (Front. Quantum Sci. Technol.)", year: 2025, referenceId: "talbi2025_quantum_magnetoreception", note: "RPM resonance ceiling ~22.5 MHz. At 872 MHz: 6×10⁻⁵ % effect — negligible. Confirms pathway A/B frequency separation." },
        ],
      },
      {
        id: "melatonin-systematic",
        title: "Melatonin suppression: PRISMA systematic review (Tbahriti 2026)",
        paragraphs: [
          "[[ref:tbahriti2026|Tbahriti et al. (2026, Sleep Biol Rhythms 24(2):195–214)]] present a PRISMA 2020 systematic review of 55 studies from 892 screened, examining EMF effects on circadian rhythms. 88% of high-quality animal studies report EMF-induced melatonin suppression of 20–50% from baseline. Clock gene expression altered. Sleep architecture changes documented. EMF-induced melatonin suppression is smaller than light-induced (>90%).",
          "This directly supports BERM pathway B (EMF → pineal melatonin suppression → GnRH pulsatility disruption → HPG → gonadal function). The 20–50% suppression magnitude is biologically significant and consistent with BERM's v17_night_fraction() function, where EMF is one component of the nocturnal triple hit (melanopsin + CRY + melatonin suppression). The suppression magnitude being smaller than light-induced (>90%) is consistent with BERM modeling EMF as one of multiple nocturnal disruption pathways, not the sole driver. Methodological note: only 27% of reviewed studies met high methodological standards; 48% of animal studies lacked adequate sham controls. The transition from cellular effects to systemic circadian disruption is not fully established clinically.",
          "BERM interpretation: WHO and ICNIRP evidence classifications are subject to the same systematic biases BERM identifies: attenuation bias from proxy exposure measures, control group contamination (lab baseline bias), and funder bias ([[ref:huss2007|Huss 2007]]: industry-funded studies less likely to find harmful effects). If these biases are real, 'moderate certainty' in the standard framework may correspond to higher certainty in a bias-corrected framework. BERM treats institutional evidence hierarchies as CONTEXT_ONLY because they are external to BERM's own epistemology, not because the underlying evidence is weak.",
        ],
        studies: [
          { citation: "Tbahriti et al. (Sleep Biol Rhythms)", year: 2026, referenceId: "tbahriti2026", note: "PRISMA 55 studies: 88% of high-quality animal studies report melatonin suppression 20–50%. Only 27% met high standards." },
          { citation: "Huss et al. (Environ Health Perspect)", year: 2007, referenceId: "huss2007", note: "Industry-funded EMF studies less likely to report harmful effects. Systematic funder bias." },
        ],
      },
      {
        id: "susceptibility",
        title: "Individual susceptibility variation",
        paragraphs: [
          "Electromagnetic hypersensitivity (EHS) clinical data suggests a continuous distribution of individual susceptibility. [[ref:belpomme2022|Belpomme et al. 2022]] characterized approximately 1,000 EHS patients with objective biomarkers including histamine, S100B protein and nitrotyrosine. While EHS as a clinical entity remains debated, the biomarker data suggests measurable physiological responses in a susceptible subpopulation.",
          "[[ref:sousouri2025|Sousouri et al. 2025 (NeuroImage, ETH Zurich)]] provided the first double-blind human experimental demonstration of VGCC genotype-dependent EMF sensitivity. In 34 healthy volunteers, CACNA1C rs7304986 T/C carriers showed altered sleep spindle frequency after 30 minutes of 3.6 GHz 5G exposure below ICNIRP limits. T/T carriers showed no effect. This is not nocebo — it is a genetically determined, objectively measured neurophysiological response. The regulatory variant does not change the protein but its expression density: more VGCC channels = greater sensitivity. HRV studies under controlled Wi-Fi exposure ([[ref:hrv_wifi_2023|2023]]) show measurable autonomic changes in a subset of participants. If susceptibility follows a normal distribution, the population-level reproductive effect is the integral over the entire distribution, not the response of the median individual.",
          "See also: Eye Color & Magnetoreception — how iris pigmentation, nutrition, and sex modulate CRY sensitivity. Blue eyes transmit ~100× more light to retinal cryptochrome than brown eyes ([[ref:higuchi2007|Higuchi 2007]]: 89% vs 73% melatonin suppression). FAD availability from vitamin B2 directly controls CRY stability and magnetic field directional selectivity ([[ref:hirano2017|Hirano 2017]], [[ref:yap2025|Yap/Sherrard 2025]]). These modulators may explain part of the inter-individual and inter-population variance in pathway B effectiveness.",
        ],
        studies: [
          { citation: "Belpomme et al.", year: 2022, referenceId: "belpomme2022", note: "EHS biomarkers (~1,000 patients)" },
          { citation: "Sousouri et al. (NeuroImage, ETH Zurich)", year: 2025, referenceId: "sousouri2025", note: "Double-blind RCT: CACNA1C rs7304986 T/C → altered sleep spindles at 3.6 GHz below ICNIRP" },
          { citation: "CACNA1C genotyping", year: 2024, referenceId: "cacna1c_genotyping_2024", note: "VGCC polymorphism → EMF sensitivity" },
          { citation: "HRV Wi-Fi exposure", year: 2023, referenceId: "hrv_wifi_2023", note: "Autonomic changes in susceptible subset" },
          { citation: "Higuchi et al.", year: 2007, referenceId: "higuchi2007", note: "Eye color → melatonin suppression (89% vs 73%)" },
          { citation: "Yap/Sherrard lab (Cells)", year: 2025, referenceId: "yap2025", note: "FAD depletion → loss of magnetic directional selectivity" },
        ],
      },
    ],
    tableCitation: "Citation",
    tableYear: "Year",
    tableNote: "Note",
    eyeColorLink: "→ Eye Color & Magnetoreception",
    nutritionLink: "→ Nutritional CRY Modulation",
    seeAlso: "See also",
    evidenceRegisterLink: "← Evidence register",
    eyeColorSeeAlsoLink: "Eye Color & Magnetoreception →",
  },
  fi: {
    title: "Ihmisen magnetoreseptio ja CRY-reitit",
    subtitle: "Ihmisen kryptokromin magnetoreseptio, CRY-pulssiresonanssi, melatoniinivaimennus ja differentiaalinen herkkyys",
    backLink: "← Takaisin näyttöön",
    narratives: [
      {
        id: "human-cry-magnetoreception",
        title: "Ihmisen CRY/RPM-magnetoreseptio on toiminnallinen",
        paragraphs: [
          "[[ref:chae2019|Chae ym. (2019, PLOS ONE, n=41)]] tarjosivat ensimmäisen käyttäytymistason näytön siitä, että CRY/RPM-magnetoreseptio on toiminnallinen ihmisessä. Nälkiintyneet miehet (n=20) orientoituivat tilastollisesti merkitsevästi kohti moduloitua magneettista pohjoista, joka yhdistettiin ruokaan (α=350,0°, r=0,51, P=0,00043) ja itään (α=83,2°, r=0,34, P=0,015). Vaikutus hävisi silmäsiteellä (P=0,52) ja aallonpituuksilla >500 nm (P=0,44) — kryptokromin radikaaliparimekanismin diagnostinen sormenjälki, jonka FAD-kromofori absorboi nimenomaan 400–500 nm:ssä. Pystykomponentin kääntäminen käänsi orientaation etelään (α=178,4°, r=0,50, P=0,00062), mikä on yhdenmukainen inklinaatiokompassin kanssa kuten RPM-teoria ennustaa. Naiset (n=21) eivät osoittaneet merkitsevää orientaatiota missään olosuhteissa.",
          "BERM-merkitys: Osoittaa, että BERM:n ensisijaisen polun (B_RPM) biologinen substraatti on olemassa ja toiminnallinen ihmisessä. Aiempi CRY/RPM-näyttö rajoittui Drosophilaan ([[ref:yoshii2009|Yoshii 2009]]), lintuihin ([[ref:ritz2004|Ritz 2004]], [[ref:engels2014|Engels 2014]]), planarioihin ([[ref:pnasnexus2026|PNAS Nexus 2026]]) ja ihmisen solujärjestelmiin in vitro ([[ref:sherrard2018|Sherrard 2018]]). [[ref:chae2019|Chae 2019]] osoittaa välttämättömän ehdon — että ihmisen CRY-järjestelmä reagoi geomagneettisiin kenttiin RPM:n kautta — mutta ei testaa RF-häiriön vaikutusta tähän vasteeseen (mikä odottaa diskriminoivia testejä D1–D3).",
          "Yöaltistusreitti on erityisen merkityksellinen: BERM:n v17_night_fraction() mallintaa tilannetta, jossa älypuhelin makuuhuoneessa tuottaa samanaikaisesti sinistä valoa (aktivoi CRY:n radikaaliparit) ja RF-kenttiä (mahdollisesti häiritsee niitä). [[ref:chae2019|Chae 2019]] osoittaa, että ihmisen CRY tarvitsee sinistä valoa ollakseen magneettisesti aktiivinen — yöllinen puhelimen käyttö luo juuri ne olosuhteet, joissa CRY on sekä aktiivinen että haavoittuvainen RF-häiriölle.",
          "Varoitukset: Pieni otoskoko (n=41). Korjausilmoitus lokakuu 2019 koski taulukon otsikkotekstin sijoitusta — ei metodologisia muutoksia. Ei vielä replikoitu. Sukupuoliero (vain miehet) voi liittyä glukoosi-/motivaatiotekijöihin eikä välttämättä CRY-herkkyyteen sinänsä.",
        ],
        studies: [
          { citation: "Chae ym. (PLOS ONE)", year: 2019, referenceId: "chae2019", note: "Sinivalosta riippuva ihmisen magnetoreseptio (P<0,001), yhdenmukainen inklinaatiokompassin kanssa" },
          { citation: "Ritz ym. (Nature)", year: 2004, referenceId: "ritz2004", note: "RF Larmor-taajuudella häiritsee lintujen kompassia" },
          { citation: "Engels ym. (Nature)", year: 2014, referenceId: "engels2014", note: "Ihmisen tuottama EM-kohina häiritsee lintujen orientaatiota" },
          { citation: "Yoshii ym. (Nature)", year: 2009, referenceId: "yoshii2009", note: "CRY-mutantit menettävät magnetoreseption Drosophilassa" },
          { citation: "Sherrard ym. (PLOS Biology)", year: 2018, referenceId: "sherrard2018", note: "EMF säätelee CRY-riippuvaista ROS:ia ihmisen solujärjestelmissä" },
        ],
      },
      {
        id: "cry-pulse-resonance",
        title: "CRY/RPM-pulssikestoresonanssi",
        paragraphs: [
          "Radikaaliparimekanismin (RPM) elinaika kryptokromissa on noin 1 µs — aikaikkuna, jonka aikana singletti–tripletti-interkonversio on magneettisesti herkkä. Tämä on ajallisesti yhteensopiva ilmapuolustustutkien pulssikestojen kanssa (myös ~1 µs). Yhteensattuma ei ole suunniteltu vaan syntyy mukana olevista fysikaalisista aikaskaaloista: kryptokromin singletti–tripletti-konversioaika on samaa suuruusluokkaa kuin valvontatutkien pulssinkesto ([[ref:hore2016_v2|Hore & Mouritsen 2016]]).",
          "Jokainen tutkapulssi kattaa radikaaliparin koko elinkaaren ja tuottaa magneettisen häiriön koko konversioikkunan ajan. 400 pulssia sekunnissa tuottaa 400 täydellistä RPM-tapahtumaa sekunnissa tutka-aseman lähellä. Sitä vastoin jatkuva aalto (CW) samalla RMS:llä tuottaa tasaisen kentän ilman pulssirakennetta — radikaalipari kokee vakiohäiriön yksittäisten 1 µs -ikkunoiden sijaan. Tämä ennustaa, että pulssimoduloitu RF on biologisesti aktiivisempi kuin CW samalla SAR-arvolla. REFLEX-projekti ([[ref:diem2005|Diem ym. 2005]]) raportoi muodollisesti suuremmat genotoksiset vaikutukset katkonaiselle altistukselle jatkuvaan verrattuna, mikä on yhteensopivaa tämän ennusteen kanssa. Ajallinen vastaavuus on fysikaalinen yhteensattuma, ei osoitettu resonanssimekanismi — se on testattava ennuste.",
          "[[ref:talbi2025_quantum_magnetoreception|Talbi, Zadeh-Haghighi & Simon 2025]] (Front. Quantum Sci. Technol. 4:1544473): Laskennalliset simulaatiot vahvistavat RPM-resonanssimaksimin ~22,5 MHz:ssä. 872 MHz:llä vaikutus on 6×10⁻⁵ % — mitätön. Artikkelin johtopäätös osoittaa sähkökenttä/VGIC-interaktioihin (polku A) telecom-taajuisten biologisten vaikutusten mekanismina. BERM:n näkökulmasta tämä vahvistaa polkujen A ja B taajuusalue-erottelun. Huom: Tätä artikkelia luetaan usein väärin 'RPM ei toimi'. Se sanoo 'RPM toimii staattisilla/ELF-kentillä, ei GHz-kantoaalloilla' — mikä on täsmälleen BERM:n polkuarkkitehtuurin oletus.",
        ],
        studies: [
          { citation: "Sherrard RM ym. PLOS Biology", year: 2018, referenceId: "sherrard2018", note: "CRY-riippuvainen ROS-tuotanto pulssi-EMF:ssä" },
          { citation: "REFLEX / Diem ym.", year: 2005, referenceId: "diem2005", note: "Katkonainen > jatkuva genotoksisuus samalla SAR:lla" },
          { citation: "Hore & Mouritsen, Annual Review of Biophysics", year: 2016, referenceId: "hore2016_v2", note: "Radikaaliparimekanismin elinaika ~1 µs" },
          { citation: "Talbi, Zadeh-Haghighi & Simon (Front. Quantum Sci. Technol.)", year: 2025, referenceId: "talbi2025_quantum_magnetoreception", note: "RPM-resonanssimaksimi ~22,5 MHz. 872 MHz:llä: 6×10⁻⁵ % vaikutus — mitätön. Vahvistaa polku A/B -taajuuserottelun." },
        ],
      },
      {
        id: "melatonin-systematic",
        title: "Melatoniinisuppressio: PRISMA-katsaus (Tbahriti 2026)",
        paragraphs: [
          "[[ref:tbahriti2026|Tbahriti ym. (2026, Sleep Biol Rhythms 24(2):195–214)]] esittävät PRISMA 2020 -systemaattisen katsauksen: 55 tutkimusta 892 seulotusta, tarkastellen EMF:n vaikutuksia sirkadiaanirytmeihin. 88 % korkealaatuisista eläintutkimuksista raportoi EMF-aiheutettua melatoniinivaimennusta (20–50 % basaalitasosta). Kellogenien ekspressio muuttuu. Uniarkkitehtuurin muutokset dokumentoitu. EMF:n melatoniinivaimennus on pienempi kuin valon aiheuttama (>90 %).",
          "Tukee suoraan BERM:n polkua C (EMF → pineaalinen melatoniinivaimennus → GnRH-pulsaatiohäiriö → HPG → gonadifunktio). 20–50 %:n suppressio on biologisesti merkittävä ja yhdenmukainen BERM:n v17_night_fraction()-funktion kanssa, jossa EMF on yksi komponentti yöllisessä kolminkertaisessa osumassa (melanopsiini + CRY + melatoniinivaimennus). Suppression suuruus on pienempi kuin valon aiheuttama (>90 %) — yhdenmukainen sen kanssa, että BERM mallintaa EMF:n yhtenä useista yöllisistä häiriöreiteistä, ei ainoana ajurina. Metodologinen huomio: vain 27 % tutkimuksista täytti korkeat metodologiset standardit; 48 % eläintutkimuksista ilman riittävää sham-kontrollia. Siirtymä soluvaikutuksista systeemiseen sirkadiaaniseen häiriöön ei ole täysin osoitettu kliinisesti.",
          "BERM-tulkinta: WHO:n ja ICNIRP:n näyttöluokitukset ovat alttiina samoille systemaattisille vinoumille jotka BERM tunnistaa: proxy-altistusmittauksen vaimennusvinouma, kontrolliryhmän kontaminaatio (laboratorion lähtötasovinouma) ja rahoittajan vinouma ([[ref:huss2007|Huss 2007]]: teollisuusrahoitteiset tutkimukset löytävät harvemmin haittoja). Jos nämä vinoumat ovat todellisia, 'kohtalainen varmuus' standardikehyksessä voi vastata korkeampaa varmuutta vinoumakorjatussa kehyksessä. BERM käsittelee institutionaalisia näyttöhierarkioita CONTEXT_ONLY-roolissa koska ne ovat BERM:n epistemologian ulkopuolisia, ei siksi että alla oleva näyttö olisi heikkoa.",
        ],
        studies: [
          { citation: "Tbahriti ym. (Sleep Biol Rhythms)", year: 2026, referenceId: "tbahriti2026", note: "PRISMA, 55 tutkimusta: 88 % korkealaatuisista eläintutkimuksista raportoi melatoniinivaimennusta 20–50 %. Vain 27 % täytti korkeat standardit." },
          { citation: "Huss ym. (Environ Health Perspect)", year: 2007, referenceId: "huss2007", note: "Teollisuusrahoitteiset EMF-tutkimukset raportoivat harvemmin haittoja. Systemaattinen rahoittajan vinouma." },
        ],
      },
      {
        id: "susceptibility",
        title: "Yksilöllinen herkkyysvariaatio",
        paragraphs: [
          "Sähkömagneettinen yliherkkyys (EHS) -kliininen data viittaa jatkuvaan yksilöllisen herkkyyden jakaumaan. [[ref:belpomme2022|Belpomme ym. 2022]] luonnehtivat noin 1 000 EHS-potilasta objektiivisilla biomarkkereilla, mukaan lukien histamiini, S100B-proteiini ja nitrotyrosiini. Vaikka EHS kliinisenä entiteettina on kiistanalainen, biomarkkerit viittaavat mitattaviin fysiologisiin vasteisiin herkässä alapopulaatiossa.",
          "[[ref:sousouri2025|Sousouri ym. 2025 (NeuroImage, ETH Zürich)]] tarjosi ensimmäisen kaksoissokko-ihmiskokeellisen osoituksen VGCC-genotyyppiriippuvaisesta EMF-herkkyydestä. Satunnaistetussa kontrolloidussa kokeessa CACNA1C rs7304986 T/C -kantajat osoittivat muuttunutta unisukkuladynamiikkaa 3,6 GHz RF-altistuksessa ICNIRP-rajojen alapuolella, kun taas CC-homotsygootit eivät. Tämä on ensimmäinen kokeellinen vahvistus sille, että ionikanavan genotyyppi ennustaa yksilöllistä EMF-vastetta, ja se muuttaa herkkyysjakauman aiemmin ehdotetusta (CACNA1C-assosiaatiotutkimukset 2024) kokeellisesti todistetuksi. Jos herkkyys noudattaa normaalijakaumaa, väestötason lisääntymisvaikutus on integraali koko jakauman yli, ei mediaani-yksilön vaste.",
          "Katso myös: Silmien väri ja magnetoreseptio — miten iiriksen pigmentaatio, ravitsemus ja sukupuoli säätelevät CRY-herkkyyttä. Siniset silmät päästävät ~100× enemmän valoa verkkokalvon kryptokromille kuin ruskeat silmät ([[ref:higuchi2007|Higuchi 2007]]: 89 % vs. 73 % melatoniinivaimennus). FAD-saatavuus B2-vitamiinista kontrolloi suoraan CRY-stabiilisuutta ja magneettikentän suuntaerottelukykyä ([[ref:hirano2017|Hirano 2017]], [[ref:yap2025|Yap/Sherrard 2025]]). Nämä modulaattorit voivat selittää osan polku B:n tehokkuuden yksilöiden ja populaatioiden välisestä vaihtelusta.",
        ],
        studies: [
          { citation: "Belpomme ym.", year: 2022, referenceId: "belpomme2022", note: "EHS-biomarkkerit (~1 000 potilasta)" },
          { citation: "Sousouri ym. (NeuroImage, ETH Zürich)", year: 2025, referenceId: "sousouri2025", note: "Kaksoissokko-RCT: CACNA1C rs7304986 T/C → muuttunut unisukkuladynamiikka 3,6 GHz:ssä ICNIRP-rajan alla" },
          { citation: "CACNA1C-genotyypitys", year: 2024, referenceId: "cacna1c_genotyping_2024", note: "VGCC-polymorfismi → EMF-herkkyys" },
          { citation: "HRV Wi-Fi -altistus", year: 2023, referenceId: "hrv_wifi_2023", note: "Autonomiset muutokset herkässä osajoukossa" },
          { citation: "Higuchi ym.", year: 2007, referenceId: "higuchi2007", note: "Silmien väri → melatoniinivaimennus (89 % vs. 73 %)" },
          { citation: "Yap/Sherrard-lab (Cells)", year: 2025, referenceId: "yap2025", note: "FAD-puutos → magneettisen suuntaerottelun menetys" },
        ],
      },
    ],
    tableCitation: "Viite",
    tableYear: "Vuosi",
    tableNote: "Huomio",
    eyeColorLink: "→ Silmien väri ja magnetoreseptio",
    nutritionLink: "→ Ravitsemuksellinen CRY-modulaatio",
    seeAlso: "Katso myös",
    evidenceRegisterLink: "← Näyttörekisteri",
    eyeColorSeeAlsoLink: "Silmien väri ja magnetoreseptio →",
  },
  ja: {
    title: "ヒト磁気受容とCRY経路",
    subtitle: "ヒトcryptochrome磁気受容、CRYパルス共鳴、melatonin抑制、差異的感受性",
    backLink: "← エビデンスに戻る",
    tableCitation: "引用",
    tableYear: "年",
    tableNote: "注記",
    eyeColorLink: "→ 眼の色と磁気受容",
    nutritionLink: "→ 栄養によるCRYモジュレーション",
    seeAlso: "関連項目",
    evidenceRegisterLink: "← エビデンス一覧",
    eyeColorSeeAlsoLink: "眼の色と磁気受容 →",
    narratives: [
      {
        id: "human-cry-magnetoreception",
        title: "ヒトのCRY/RPM磁気受容は機能している",
        paragraphs: [
          "[[ref:chae2019|Chaeら（2019年、PLOS ONE、n=41）]]は、CRY/RPM磁気受容がヒトで機能することを示す最初の行動学的証拠を提示した。飢餓状態の男性（n=20）は食物と関連付けられた変調磁北（α=350.0°、r=0.51、P=0.00043）と東（α=83.2°、r=0.34、P=0.015）に有意に定位した。効果は目隠し（P=0.52）と500 nm超の波長（P=0.44）で消失した。これは400–500 nmを特異的に吸収するFAD chromophoreをもつcryptochromeのradical pair mechanismの診断的特徴である。垂直磁場の反転で定位は南（α=178.4°、r=0.50、P=0.00062）へ逆転し、RPM理論が予測する伏角コンパスと一致した。女性（n=21）ではどの条件でも有意な定位は見られなかった。",
          "BERMとの関連：これは、BERMの主要経路（B_RPM）の生物学的基盤がヒトに存在し機能することを確立する。それ以前のCRY/RPM証拠はDrosophila（[[ref:yoshii2009|Yoshii 2009]]）、鳥類（[[ref:ritz2004|Ritz 2004]]、[[ref:engels2014|Engels 2014]]）、プラナリア（[[ref:pnasnexus2026|PNAS Nexus 2026]]）、in vitroヒト細胞系（[[ref:sherrard2018|Sherrard 2018]]）に限られていた。[[ref:chae2019|Chae 2019]]は、ヒトCRY系がRPMを介して地磁気に応答するという必要条件を示すが、この応答のRF妨害は検証していない（判別テストD1〜D3を待つ）。",
          "夜間曝露経路は特に重要である。BERMのv17_night_fraction()は、寝室のスマートフォンがブルーライト（CRY radical pairを活性化）とRF場（それを妨害する可能性）を同時に生じる状況をモデル化する。[[ref:chae2019|Chae 2019]]はヒトCRYが磁気的に活性になるにはブルーライトが必要であることを示した。つまり夜間のスマートフォン使用は、CRYが活性かつRF干渉に脆弱になるまさにその条件を作る。",
          "注意点：小サンプル（n=41）。2019年10月の訂正通知は表キャプション位置ミスを修正——方法論変更なし。未追試。性差（男性のみ）はCRY感受性そのものよりグルコース／動機付けに関連する可能性がある。",
        ],
        studies: [
          { citation: "Chae et al. (PLOS ONE)", year: 2019, referenceId: "chae2019", note: "ブルーライト依存性ヒト磁気受容（P<0.001）、伏角コンパスと一致" },
          { citation: "Ritz et al. (Nature)", year: 2004, referenceId: "ritz2004", note: "Larmor周波数のRFが鳥類コンパスを妨害" },
          { citation: "Engels et al. (Nature)", year: 2014, referenceId: "engels2014", note: "人為的電磁ノイズが鳥類の定位を妨害" },
          { citation: "Yoshii et al. (Nature)", year: 2009, referenceId: "yoshii2009", note: "CRY変異体はDrosophilaで磁気感受性を喪失" },
          { citation: "Sherrard et al. (PLOS Biology)", year: 2018, referenceId: "sherrard2018", note: "EMFがヒト細胞系でCRY依存性ROSを調節" },
        ],
      },
      {
        id: "cry-pulse-resonance",
        title: "CRY/RPMパルス持続時間共鳴",
        paragraphs: [
          "Cryptochromeのradical pair mechanism（RPM）の寿命は約1 µsであり、singlet–triplet相互変換が磁気感受性をもつ時間窓である。これは防空レーダーのパルス持続時間（同じく約1 µs）と時間的に適合する。この一致は設計されたものではなく、関与する物理的時間尺度から生じる。cryptochromeのsinglet–triplet変換時間は監視レーダーのパルス幅と同じ桁である（[[ref:hore2016_v2|Hore & Mouritsen 2016]]）。",
          "各レーダーパルスはradical pairの寿命全体を覆い、変換窓全体に磁気摂動を与える。毎秒400パルスなら、レーダー設備付近で毎秒400回の完全なRPMイベントを生む。同じRMSの連続波（CW）はパルス構造のない定常場を与え、radical pairは個別の1 µs窓ではなく一定の摂動を受ける。したがって同じSARではパルス変調RFの方がCWより生物学的活性が高いと予測される。REFLEXプロジェクト（[[ref:diem2005|Diemら 2005]]）は、間欠曝露の方が連続曝露より遺伝毒性作用が大きいと正式に報告し、この予測と一致した。時間的一致は物理的な偶然で、実証された共鳴機構ではなく、検証可能な予測である。",
          "[[ref:talbi2025_quantum_magnetoreception|Talbi, Zadeh-Haghighi & Simon 2025]]（Front. Quantum Sci. Technol. 4:1544473）：計算シミュレーションはRPM共鳴上限が約22.5 MHzであることを確認する。872 MHzでは作用は6×10⁻⁵ %で無視できる。論文の結論は通信周波数の生物影響の機構として電場/VGIC相互作用（経路A）を指す。BERMの観点では、これは経路AとBの周波数領域分離を確認する。この論文は『RPMは機能しない』と誤読されるが、実際には『RPMは静的/ELF場では機能するがGHz carrierでは機能しない』と述べており、BERMの経路構造が仮定する通りである。",
        ],
        studies: [
          { citation: "Sherrard RM et al. PLOS Biology", year: 2018, referenceId: "sherrard2018", note: "パルスEMF下でのCRY依存性ROS生成" },
          { citation: "REFLEX / Diem et al.", year: 2005, referenceId: "diem2005", note: "同一SARで間欠的 > 連続的遺伝毒性" },
          { citation: "Hore & Mouritsen, Annual Review of Biophysics", year: 2016, referenceId: "hore2016_v2", note: "Radical pair mechanism寿命 ~1 µs" },
          { citation: "Talbi, Zadeh-Haghighi & Simon (Front. Quantum Sci. Technol.)", year: 2025, referenceId: "talbi2025_quantum_magnetoreception", note: "RPM共鳴上限は約22.5 MHz。872 MHzでは6×10⁻⁵ %で無視できる。経路A/Bの周波数分離を確認。" },
        ],
      },
      {
        id: "melatonin-systematic",
        title: "Melatonin抑制：PRISMAシステマティックレビュー（Tbahriti 2026）",
        paragraphs: [
          "[[ref:tbahriti2026|Tbahritiら（2026年、Sleep Biol Rhythms 24(2):195–214）]]は、892件から選別された55研究を対象にEMFの概日リズムへの影響を検討したPRISMA 2020システマティックレビューを提示した。高品質動物研究の88%が基準値から20–50%のEMF誘発melatonin抑制を報告した。時計遺伝子発現の変化と睡眠構造の変化も記録され、EMFによるmelatonin抑制は光による抑制（>90%）より小さい。",
          "これはBERM経路B（EMF → 松果体melatonin抑制 → GnRH拍動障害 → HPG → 性腺機能）を直接支持する。20–50%の抑制は生物学的に有意で、EMFを夜間の三重打撃（melanopsin + CRY + melatonin抑制）の一要素とするBERMのv17_night_fraction()関数と一致する。光誘発性（>90%）より小さいことも、EMFを唯一の駆動因子ではなく複数の夜間撹乱経路の一つとするBERMと一致する。方法論的注記：高い基準を満たした研究は27%のみで、動物研究の48%は適切なsham対照を欠いた。細胞作用から全身的概日撹乱への移行は臨床的に完全には確立していない。",
          "BERM解釈：WHOとICNIRPの証拠分類はBERMが特定する同じ系統的偏り、すなわちproxy曝露測定による減衰bias、対照群汚染（実験室baseline bias）、資金提供者bias（[[ref:huss2007|Huss 2007]]：産業資金研究は有害作用を見出しにくい）を受ける。これらのbiasが実在するなら、標準枠組みの『中等度の確実性』はbias補正枠組みではより高い確実性に相当し得る。BERMは制度的証拠階層をCONTEXT_ONLYとして扱うが、それは基礎証拠が弱いからではなくBERM独自の認識論の外部にあるためである。",
        ],
        studies: [
          { citation: "Tbahriti et al. (Sleep Biol Rhythms)", year: 2026, referenceId: "tbahriti2026", note: "PRISMA 55研究：高品質動物研究の88%がmelatonin抑制20–50%を報告。わずか27%が高い基準を満たした。" },
          { citation: "Huss et al. (Environ Health Perspect)", year: 2007, referenceId: "huss2007", note: "産業資金のEMF研究は有害作用を報告しにくい。系統的な資金提供者bias。" },
        ],
      },
      {
        id: "susceptibility",
        title: "個体間感受性変動",
        paragraphs: [
          "電磁過敏症（EHS）の臨床データは、個人感受性が連続分布することを示唆する。[[ref:belpomme2022|Belpommeら 2022]]は約1,000人のEHS患者をhistamine、S100Bタンパク質、nitrotyrosineなどの客観的biomarkerで特徴づけた。EHSは臨床概念として議論が続くが、biomarkerデータは感受性のある部分集団で測定可能な生理応答を示唆する。",
          "[[ref:sousouri2025|Sousouriら 2025（NeuroImage、ETH Zurich）]]は、VGCC genotype依存性EMF感受性を初めて二重盲検ヒト実験で実証した。34人の健康な志願者で、CACNA1C rs7304986 T/C保有者はICNIRP限度以下の3.6 GHz 5Gに30分曝露した後、睡眠紡錘波周波数が変化した。T/T保有者には作用がなかった。これはnoceboではなく、遺伝的に決定され客観的に測定された神経生理応答である。調節variantはタンパク質自体ではなく発現密度を変える：VGCCチャネルが多いほど感受性が高い。制御Wi-Fi曝露下のHRV研究（[[ref:hrv_wifi_2023|2023]]）は一部参加者で測定可能な自律神経変化を示す。感受性が正規分布するなら、集団レベルの生殖影響は中央値個人の応答ではなく分布全体の積分である。",
          "関連項目：眼の色と磁気受容——虹彩色素、栄養、性別がCRY感受性をどう調節するか。青い眼は茶色の眼より網膜cryptochromeへ約100倍多く光を通す（[[ref:higuchi2007|Higuchi 2007]]：melatonin抑制89%対73%）。ビタミンB2由来FADの利用可能性はCRY安定性と磁場方向選択性を直接制御する（[[ref:hirano2017|Hirano 2017]]、[[ref:yap2025|Yap/Sherrard 2025]]）。これらの調節因子は経路Bの有効性における個人間・集団間分散の一部を説明し得る。",
        ],
        studies: [
          { citation: "Belpomme et al.", year: 2022, referenceId: "belpomme2022", note: "EHSバイオマーカー（約1,000人の患者）" },
          { citation: "Sousouri et al. (NeuroImage, ETH Zurich)", year: 2025, referenceId: "sousouri2025", note: "二重盲検RCT：CACNA1C rs7304986 T/C → ICNIRP以下の3.6 GHzで睡眠紡錘波変化" },
          { citation: "CACNA1C genotyping", year: 2024, referenceId: "cacna1c_genotyping_2024", note: "VGCCポリモーフィズム → EMF感受性" },
          { citation: "HRV Wi-Fi exposure", year: 2023, referenceId: "hrv_wifi_2023", note: "感受性のある部分集団での自律神経変化" },
          { citation: "Higuchi et al.", year: 2007, referenceId: "higuchi2007", note: "眼の色 → melatonin抑制（89% vs 73%）" },
          { citation: "Yap/Sherrard lab (Cells)", year: 2025, referenceId: "yap2025", note: "FAD枯渇 → 磁気方向選択性の喪失" },
        ],
      },
    ],
  },
  fr: {
    title: "Magnétoréception humaine et voies CRY",
    subtitle: "Magnétoréception cryptochrome humaine, résonance par impulsions CRY, suppression de la mélatonine et susceptibilité différentielle",
    backLink: "← Retour aux preuves",
    tableCitation: "Citation",
    tableYear: "Année",
    tableNote: "Note",
    eyeColorLink: "→ Couleur des yeux et magnétoréception",
    nutritionLink: "→ Modulation nutritionnelle du CRY",
    seeAlso: "Voir aussi",
    evidenceRegisterLink: "← Registre des preuves",
    eyeColorSeeAlsoLink: "Couleur des yeux et magnétoréception →",
    narratives: [
      {
        id: "human-cry-magnetoreception",
        title: "La magnétoréception CRY/RPM humaine est fonctionnelle",
        paragraphs: [
          "[[ref:chae2019|Chae et al. (2019, PLOS ONE, n=41)]] ont fourni la première preuve comportementale que la magnétoréception CRY/RPM est fonctionnelle chez l'humain. Les hommes à jeun (n=20) se sont orientés significativement vers le nord magnétique modulé associé à la nourriture (α=350,0°, r=0,51, P=0,00043) et vers l'est (α=83,2°, r=0,34, P=0,015). L'effet a disparu avec un bandeau (P=0,52) et au-dessus de 500 nm (P=0,44) — signature diagnostique du mécanisme de paire radicalaire du cryptochrome, dont le chromophore FAD absorbe spécifiquement à 400–500 nm. L'inversion du champ vertical a inversé l'orientation vers le sud (α=178,4°, r=0,50, P=0,00062), conformément à la boussole d'inclinaison prédite par la théorie RPM. Les femmes (n=21) n'ont montré aucune orientation significative.",
          "Pertinence BERM : cela établit que le substrat biologique de la voie principale de BERM (B_RPM) existe et fonctionne chez l'humain. Les preuves CRY/RPM antérieures se limitaient à la Drosophile ([[ref:yoshii2009|Yoshii 2009]]), aux oiseaux ([[ref:ritz2004|Ritz 2004]], [[ref:engels2014|Engels 2014]]), aux planaires ([[ref:pnasnexus2026|PNAS Nexus 2026]]) et aux systèmes cellulaires humains in vitro ([[ref:sherrard2018|Sherrard 2018]]). [[ref:chae2019|Chae 2019]] démontre la condition nécessaire — que le système CRY humain répond au champ géomagnétique via le RPM — mais ne teste pas la perturbation RF de cette réponse, qui attend les tests discriminants D1–D3.",
          "La voie d'exposition nocturne est particulièrement pertinente : v17_night_fraction() de BERM modélise un smartphone dans la chambre produisant simultanément de la lumière bleue (activation des paires radicalaires CRY) et des champs RF (perturbation potentielle). [[ref:chae2019|Chae 2019]] démontre que le CRY humain exige la lumière bleue pour être magnétiquement actif — l'usage nocturne du téléphone crée donc précisément les conditions où CRY est à la fois actif et vulnérable aux interférences RF.",
          "Mises en garde : Petit échantillon (n=41). L'avis de correction d'octobre 2019 corrige un sous-titre de tableau mal placé — aucun changement méthodologique. Pas encore reproduit. La différence de sexe (hommes uniquement) peut être liée au glucose/motivation plutôt qu'à la sensibilité CRY en soi.",
        ],
        studies: [
          { citation: "Chae et al. (PLOS ONE)", year: 2019, referenceId: "chae2019", note: "Magnétoréception humaine dépendante de la lumière bleue (P<0,001), cohérente avec la boussole d'inclinaison" },
          { citation: "Ritz et al. (Nature)", year: 2004, referenceId: "ritz2004", note: "RF à la fréquence de Larmor perturbe la boussole aviaire" },
          { citation: "Engels et al. (Nature)", year: 2014, referenceId: "engels2014", note: "Le bruit EM anthropique perturbe l'orientation aviaire" },
          { citation: "Yoshii et al. (Nature)", year: 2009, referenceId: "yoshii2009", note: "Les mutants CRY perdent la magnétosensibilité chez la Drosophile" },
          { citation: "Sherrard et al. (PLOS Biology)", year: 2018, referenceId: "sherrard2018", note: "L'EMF module les ROS dépendants du CRY dans les systèmes cellulaires humains" },
        ],
      },
      {
        id: "cry-pulse-resonance",
        title: "Résonance de durée d'impulsion CRY/RPM",
        paragraphs: [
          "La durée de vie du mécanisme de paire radicalaire (RPM) dans le cryptochrome est d'environ 1 µs — la fenêtre pendant laquelle l'interconversion singulet–triplet est sensible au champ magnétique. Elle est temporellement compatible avec les impulsions des radars de défense aérienne, également proches de 1 µs. La coïncidence découle des échelles physiques : le temps de conversion singulet–triplet du cryptochrome est du même ordre que la largeur d'impulsion des radars de surveillance ([[ref:hore2016_v2|Hore & Mouritsen 2016]]).",
          "Chaque impulsion radar couvre toute la durée de vie de la paire radicalaire et délivre la perturbation magnétique pendant toute la fenêtre de conversion. À 400 impulsions par seconde, cela produit 400 événements RPM complets par seconde près d'une installation radar. À l'inverse, une onde continue (CW) au même RMS applique un champ stable sans structure pulsée. Cela prédit que le RF pulsé est biologiquement plus actif que le CW au même SAR. Le projet REFLEX ([[ref:diem2005|Diem et al. 2005]]) a rapporté des effets génotoxiques plus grands pour l'exposition intermittente que continue, conformément à cette prédiction. La correspondance temporelle est une coïncidence physique, pas un mécanisme de résonance démontré — elle demeure une prédiction testable.",
          "[[ref:talbi2025_quantum_magnetoreception|Talbi, Zadeh-Haghighi & Simon 2025]] (Front. Quantum Sci. Technol. 4:1544473) : les simulations confirment un plafond de résonance RPM vers 22,5 MHz. À 872 MHz, l'effet est de 6×10⁻⁵ %, donc négligeable. La conclusion pointe vers les interactions champ électrique/VGIC (voie A) pour les effets biologiques aux fréquences télécom. Pour BERM, cela confirme la séparation fréquentielle des voies A et B. L'article dit que le RPM fonctionne pour les champs statiques/ELF, pas pour les porteuses GHz — exactement l'architecture supposée par BERM.",
        ],
        studies: [
          { citation: "Sherrard RM et al. PLOS Biology", year: 2018, referenceId: "sherrard2018", note: "Génération de ROS dépendante du CRY sous EMF pulsé" },
          { citation: "REFLEX / Diem et al.", year: 2005, referenceId: "diem2005", note: "Génotoxicité intermittente > continue au même SAR" },
          { citation: "Hore & Mouritsen, Annual Review of Biophysics", year: 2016, referenceId: "hore2016_v2", note: "Durée de vie du radical pair mechanism ~1 µs" },
          { citation: "Talbi, Zadeh-Haghighi & Simon (Front. Quantum Sci. Technol.)", year: 2025, referenceId: "talbi2025_quantum_magnetoreception", note: "Plafond de résonance RPM ~22,5 MHz. À 872 MHz : effet de 6×10⁻⁵ %, négligeable. Confirme la séparation fréquentielle A/B." },
        ],
      },
      {
        id: "melatonin-systematic",
        title: "Suppression de la mélatonine : revue systématique PRISMA (Tbahriti 2026)",
        paragraphs: [
          "[[ref:tbahriti2026|Tbahriti et al. (2026, Sleep Biol Rhythms 24(2):195–214)]] présentent une revue systématique PRISMA 2020 de 55 études parmi 892 examinées sur les effets des EMF sur les rythmes circadiens. 88 % des études animales de haute qualité rapportent une suppression de mélatonine de 20–50 % par rapport au niveau de base. L'expression des gènes horloge est modifiée et les changements d'architecture du sommeil sont documentés. La suppression due aux EMF est inférieure à celle due à la lumière (>90 %).",
          "Cela soutient directement la voie B de BERM (EMF → suppression de mélatonine pinéale → perturbation de la pulsatilité GnRH → HPG → fonction gonadique). L'ampleur de 20–50 % est biologiquement significative et cohérente avec v17_night_fraction(), où l'EMF est une composante du triple impact nocturne (mélanopsine + CRY + suppression de mélatonine). Une suppression inférieure à celle de la lumière est cohérente avec plusieurs voies nocturnes plutôt qu'un seul moteur. Note méthodologique : 27 % seulement satisfaisaient les critères élevés et 48 % des études animales manquaient de sham adéquat. Le passage des effets cellulaires à la perturbation circadienne systémique n'est pas entièrement établi cliniquement.",
          "Interprétation BERM : les classifications OMS et ICNIRP sont soumises aux biais systématiques identifiés par BERM : biais d'atténuation des proxies d'exposition, contamination des contrôles et biais du financeur ([[ref:huss2007|Huss 2007]] : les études financées par l'industrie rapportent moins souvent des effets nocifs). Si ces biais existent, une « certitude modérée » standard peut correspondre à une certitude plus élevée après correction. BERM traite les hiérarchies institutionnelles comme CONTEXT_ONLY parce qu'elles sont externes à sa propre épistémologie, non parce que les preuves sous-jacentes seraient faibles.",
        ],
        studies: [
          { citation: "Tbahriti et al. (Sleep Biol Rhythms)", year: 2026, referenceId: "tbahriti2026", note: "PRISMA 55 études : 88 % des études animales de haute qualité rapportent une suppression de 20–50 %. Seulement 27 % remplissaient les critères élevés." },
          { citation: "Huss et al. (Environ Health Perspect)", year: 2007, referenceId: "huss2007", note: "Les études EMF financées par l'industrie rapportent moins souvent des effets nocifs. Biais systématique du financeur." },
        ],
      },
      {
        id: "susceptibility",
        title: "Variation de la susceptibilité individuelle",
        paragraphs: [
          "Les données cliniques sur l'hypersensibilité électromagnétique (EHS) suggèrent une distribution continue de la susceptibilité individuelle. [[ref:belpomme2022|Belpomme et al. 2022]] ont caractérisé environ 1 000 patients EHS avec des biomarqueurs objectifs, dont l'histamine, S100B et la nitrotyrosine. Bien que l'EHS reste débattue, ces biomarqueurs suggèrent des réponses physiologiques mesurables dans une sous-population susceptible.",
          "[[ref:sousouri2025|Sousouri et al. 2025 (NeuroImage, ETH Zurich)]] ont fourni la première démonstration humaine en double aveugle d'une sensibilité EMF dépendante du génotype VGCC. Chez 34 volontaires sains, les porteurs CACNA1C rs7304986 T/C ont montré une fréquence des fuseaux du sommeil modifiée après 30 minutes de 5G à 3,6 GHz sous les limites ICNIRP ; les T/T n'ont montré aucun effet. Ce n'est pas un nocebo, mais une réponse neurophysiologique objectivement mesurée et génétiquement déterminée. Le variant régulateur change la densité d'expression : plus de VGCC signifie plus de sensibilité. Les études HRV sous Wi-Fi contrôlé ([[ref:hrv_wifi_2023|2023]]) montrent des changements autonomiques chez certains participants. Si la sensibilité est normalement distribuée, l'effet reproductif populationnel est l'intégrale de toute la distribution, non la réponse médiane.",
          "Voir aussi : Couleur des yeux et magnétoréception — comment pigmentation, nutrition et sexe modulent CRY. Les yeux bleus transmettent environ 100 fois plus de lumière au cryptochrome rétinien que les yeux bruns ([[ref:higuchi2007|Higuchi 2007]] : suppression de mélatonine 89 % contre 73 %). Le FAD issu de la B2 contrôle directement la stabilité de CRY et la sélectivité directionnelle magnétique ([[ref:hirano2017|Hirano 2017]], [[ref:yap2025|Yap/Sherrard 2025]]). Ces modulateurs peuvent expliquer une partie de la variance interindividuelle et interpopulationnelle de la voie B.",
        ],
        studies: [
          { citation: "Belpomme et al.", year: 2022, referenceId: "belpomme2022", note: "Biomarqueurs EHS (environ 1 000 patients)" },
          { citation: "Sousouri et al. (NeuroImage, ETH Zurich)", year: 2025, referenceId: "sousouri2025", note: "RCT double aveugle : CACNA1C rs7304986 T/C → fuseaux de sommeil altérés à 3,6 GHz sous ICNIRP" },
          { citation: "CACNA1C genotyping", year: 2024, referenceId: "cacna1c_genotyping_2024", note: "Polymorphisme VGCC → sensibilité EMF" },
          { citation: "HRV Wi-Fi exposure", year: 2023, referenceId: "hrv_wifi_2023", note: "Changements autonomiques dans un sous-ensemble susceptible" },
          { citation: "Higuchi et al.", year: 2007, referenceId: "higuchi2007", note: "Couleur des yeux → suppression de mélatonine (89 % vs 73 %)" },
          { citation: "Yap/Sherrard lab (Cells)", year: 2025, referenceId: "yap2025", note: "Épuisement du FAD → perte de sélectivité directionnelle magnétique" },
        ],
      },
    ],
  },
  ko: {
    title: "인간 자기수용과 CRY 경로",
    subtitle: "인간 cryptochrome 자기수용, CRY 펄스 공명, melatonin 억제, 차별적 감수성",
    backLink: "← 증거로 돌아가기",
    tableCitation: "인용",
    tableYear: "연도",
    tableNote: "비고",
    eyeColorLink: "→ 눈 색상과 자기수용",
    nutritionLink: "→ 영양에 의한 CRY 조절",
    seeAlso: "관련 항목",
    evidenceRegisterLink: "← 증거 목록",
    eyeColorSeeAlsoLink: "눈 색상과 자기수용 →",
    narratives: [
      {
        id: "human-cry-magnetoreception",
        title: "인간 CRY/RPM 자기수용은 기능적이다",
        paragraphs: [
          "[[ref:chae2019|Chae 등(2019, PLOS ONE, n=41)]]은 인간에서 CRY/RPM 자기수용이 기능함을 보여주는 최초의 행동 증거를 제시했다. 공복 남성(n=20)은 음식과 연관된 변조 자북(α=350.0°, r=0.51, P=0.00043)과 동쪽(α=83.2°, r=0.34, P=0.015)으로 유의미하게 정위했다. 효과는 안대(P=0.52)와 500 nm 초과 파장(P=0.44)에서 사라졌는데, 이는 FAD chromophore가 400–500 nm를 특이적으로 흡수하는 cryptochrome radical pair mechanism의 진단적 특징이다. 수직 자기장 반전은 정위를 남쪽(α=178.4°, r=0.50, P=0.00062)으로 바꾸어 RPM 이론이 예측하는 경사 나침반과 일치했다. 여성(n=21)은 어떤 조건에서도 유의미한 정위를 보이지 않았다.",
          "BERM 관련성: 이는 BERM의 주요 경로(B_RPM)의 생물학적 기반이 인간에게 존재하고 기능함을 확립한다. 이전 CRY/RPM 증거는 Drosophila([[ref:yoshii2009|Yoshii 2009]]), 조류([[ref:ritz2004|Ritz 2004]], [[ref:engels2014|Engels 2014]]), 플라나리아([[ref:pnasnexus2026|PNAS Nexus 2026]]), in vitro 인간 세포계([[ref:sherrard2018|Sherrard 2018]])에 한정되었다. [[ref:chae2019|Chae 2019]]는 인간 CRY 시스템이 RPM을 통해 지자기장에 반응한다는 필요조건을 입증하지만, 이 반응에 대한 RF 교란은 테스트하지 않았다(판별 테스트 D1–D3 대기).",
          "야간 노출 경로는 특히 중요하다. BERM의 v17_night_fraction()은 침실의 스마트폰이 청색광(CRY radical pair 활성화)과 RF 장(잠재적 교란)을 동시에 발생시키는 상황을 모델링한다. [[ref:chae2019|Chae 2019]]는 인간 CRY가 자기적으로 활성화되려면 청색광이 필요함을 보여준다. 즉 야간 스마트폰 사용은 CRY가 활성인 동시에 RF 간섭에 취약한 정확한 조건을 만든다.",
          "주의사항: 소규모 표본(n=41). 2019년 10월 정정 통지는 표 캡션 위치 오류 수정 — 방법론 변경 없음. 미재현. 성차(남성만)는 CRY 감수성보다 포도당/동기 요인 관련 가능성.",
        ],
        studies: [
          { citation: "Chae et al. (PLOS ONE)", year: 2019, referenceId: "chae2019", note: "청색광 의존적 인간 자기수용(P<0.001), 경사 나침반과 일치" },
          { citation: "Ritz et al. (Nature)", year: 2004, referenceId: "ritz2004", note: "Larmor 주파수 RF가 조류 나침반 방해" },
          { citation: "Engels et al. (Nature)", year: 2014, referenceId: "engels2014", note: "인위적 전자기 잡음이 조류 정위 방해" },
          { citation: "Yoshii et al. (Nature)", year: 2009, referenceId: "yoshii2009", note: "CRY 돌연변이체는 Drosophila에서 자기감수성 상실" },
          { citation: "Sherrard et al. (PLOS Biology)", year: 2018, referenceId: "sherrard2018", note: "EMF가 인간 세포 시스템에서 CRY 의존적 ROS 조절" },
        ],
      },
      {
        id: "cry-pulse-resonance",
        title: "CRY/RPM 펄스 지속시간 공명",
        paragraphs: [
          "Cryptochrome의 radical pair mechanism(RPM) 수명은 약 1 µs로, singlet–triplet 상호변환이 자기적으로 민감한 시간 창이다. 이는 방공 레이더의 펄스 지속시간(역시 약 1 µs)과 시간적으로 양립한다. 이 일치는 설계된 것이 아니라 물리적 시간척도에서 비롯되며, cryptochrome의 singlet–triplet 변환 시간은 감시 레이더 펄스 폭과 같은 차수이다([[ref:hore2016_v2|Hore & Mouritsen 2016]]).",
          "각 레이더 펄스는 radical pair의 전체 수명을 덮고 변환 창 전체에 자기 교란을 가한다. 초당 400펄스는 레이더 시설 근처에서 초당 400개의 완전한 RPM 이벤트를 만든다. 같은 RMS의 연속파(CW)는 펄스 구조 없는 일정한 장을 가하므로 radical pair는 개별 1 µs 창이 아니라 일정한 교란을 경험한다. 따라서 동일 SAR에서 펄스 변조 RF가 CW보다 생물학적으로 더 활성적이라고 예측된다. REFLEX 프로젝트([[ref:diem2005|Diem 등 2005]])는 간헐 노출이 연속 노출보다 더 큰 유전독성 효과를 보였다고 정식 보고해 이 예측과 일치했다. 시간적 일치는 물리적 우연이며 입증된 공명 메커니즘은 아니므로 검증 가능한 예측으로 남는다.",
          "[[ref:talbi2025_quantum_magnetoreception|Talbi, Zadeh-Haghighi & Simon 2025]](Front. Quantum Sci. Technol. 4:1544473): 계산 시뮬레이션은 RPM 공명 상한이 약 22.5 MHz임을 확인한다. 872 MHz에서 효과는 6×10⁻⁵ %로 무시할 수 있다. 논문 결론은 통신 주파수 생물효과의 메커니즘으로 전기장/VGIC 상호작용(경로 A)을 지목한다. BERM 관점에서 이는 경로 A와 B의 주파수 영역 분리를 확인한다. 이 논문은 'RPM이 작동하지 않는다'가 아니라 'RPM은 정적/ELF 장에서 작동하나 GHz 반송파에서는 아니다'라고 말하며, 이는 BERM 경로 구조의 가정과 정확히 같다.",
        ],
        studies: [
          { citation: "Sherrard RM et al. PLOS Biology", year: 2018, referenceId: "sherrard2018", note: "펄스 EMF 하 CRY 의존적 ROS 생성" },
          { citation: "REFLEX / Diem et al.", year: 2005, referenceId: "diem2005", note: "동일 SAR에서 간헐적 > 연속적 유전독성" },
          { citation: "Hore & Mouritsen, Annual Review of Biophysics", year: 2016, referenceId: "hore2016_v2", note: "Radical pair mechanism 수명 ~1 µs" },
          { citation: "Talbi, Zadeh-Haghighi & Simon (Front. Quantum Sci. Technol.)", year: 2025, referenceId: "talbi2025_quantum_magnetoreception", note: "RPM 공명 상한 약 22.5 MHz. 872 MHz에서 6×10⁻⁵ %로 무시 가능. 경로 A/B 주파수 분리를 확인." },
        ],
      },
      {
        id: "melatonin-systematic",
        title: "Melatonin 억제: PRISMA 체계적 리뷰(Tbahriti 2026)",
        paragraphs: [
          "[[ref:tbahriti2026|Tbahriti 등(2026, Sleep Biol Rhythms 24(2):195–214)]]은 892건에서 선별된 55개 연구의 PRISMA 2020 체계적 리뷰로 EMF의 일주기 리듬 영향을 검토했다. 고품질 동물 연구의 88%가 기준선 대비 20–50%의 EMF 유도 melatonin 억제를 보고했다. 시계 유전자 발현과 수면 구조 변화도 기록되었으며, EMF 유도 억제는 빛 유도 억제(>90%)보다 작다.",
          "이는 BERM 경로 B(EMF → 송과체 melatonin 억제 → GnRH 박동 교란 → HPG → 생식선 기능)를 직접 지지한다. 20–50% 억제는 생물학적으로 유의하며 EMF를 야간 삼중 타격(melanopsin + CRY + melatonin 억제)의 한 요소로 두는 v17_night_fraction()과 일치한다. 빛 유도 억제보다 작은 것도 EMF가 유일한 동인이 아니라 여러 야간 교란 경로 중 하나라는 모델과 일치한다. 방법론적 주의: 높은 기준을 충족한 연구는 27%뿐이고 동물 연구의 48%는 적절한 sham 대조군이 없었다. 세포 효과에서 전신 일주기 교란으로의 전이는 임상적으로 완전히 확립되지 않았다.",
          "BERM 해석: WHO와 ICNIRP 증거 분류는 BERM이 식별한 체계적 편향, 즉 proxy 노출 측정의 감쇠 편향, 대조군 오염, 자금 제공자 편향([[ref:huss2007|Huss 2007]]: 산업 지원 연구가 유해 효과를 덜 보고)을 받는다. 이 편향이 실제라면 표준 프레임워크의 '중간 확실성'은 편향 보정 프레임워크에서 더 높은 확실성에 해당할 수 있다. BERM은 제도적 증거 계층을 CONTEXT_ONLY로 다루는데, 근거가 약해서가 아니라 BERM 자체 인식론의 외부에 있기 때문이다.",
        ],
        studies: [
          { citation: "Tbahriti et al. (Sleep Biol Rhythms)", year: 2026, referenceId: "tbahriti2026", note: "PRISMA 55개 연구: 고품질 동물 연구 88%가 melatonin 억제 20–50% 보고. 27%만 높은 기준 충족." },
          { citation: "Huss et al. (Environ Health Perspect)", year: 2007, referenceId: "huss2007", note: "산업 지원 EMF 연구는 유해 효과를 덜 보고한다. 체계적 자금 제공자 편향." },
        ],
      },
      {
        id: "susceptibility",
        title: "개인 간 감수성 변이",
        paragraphs: [
          "전자기 과민증(EHS) 임상 데이터는 개인 감수성이 연속적으로 분포함을 시사한다. [[ref:belpomme2022|Belpomme 등 2022]]은 약 1,000명의 EHS 환자를 histamine, S100B 단백질, nitrotyrosine 등 객관적 바이오마커로 특성화했다. EHS는 임상 개념으로 논쟁 중이지만 바이오마커 데이터는 감수성 하위집단에서 측정 가능한 생리 반응을 시사한다.",
          "[[ref:sousouri2025|Sousouri 등 2025(NeuroImage, ETH Zurich)]]은 VGCC 유전자형 의존적 EMF 감수성을 최초로 이중맹검 인간 실험에서 입증했다. 건강한 지원자 34명 중 CACNA1C rs7304986 T/C 보유자는 ICNIRP 한계 이하 3.6 GHz 5G에 30분 노출 후 수면 방추 주파수가 변했고 T/T 보유자는 효과가 없었다. 이는 nocebo가 아니라 유전적으로 결정되고 객관적으로 측정된 신경생리 반응이다. 조절 variant는 단백질이 아니라 발현 밀도를 바꾼다. VGCC 채널이 많을수록 감수성이 크다. 통제 Wi-Fi 노출 HRV 연구([[ref:hrv_wifi_2023|2023]])는 일부 참가자에서 측정 가능한 자율신경 변화를 보인다. 감수성이 정규분포한다면 인구 수준 생식 효과는 중앙값 개인 반응이 아니라 전체 분포의 적분이다.",
          "관련 항목: 눈 색상과 자기수용 — 홍채 색소, 영양, 성별이 CRY 감수성을 조절한다. 파란 눈은 갈색 눈보다 망막 cryptochrome에 약 100배 더 많은 빛을 전달한다([[ref:higuchi2007|Higuchi 2007]]: melatonin 억제 89% 대 73%). 비타민 B2의 FAD 가용성은 CRY 안정성과 자기장 방향 선택성을 직접 제어한다([[ref:hirano2017|Hirano 2017]], [[ref:yap2025|Yap/Sherrard 2025]]). 이 조절인자들은 경로 B 효과의 개인 간·인구 간 변이 일부를 설명할 수 있다.",
        ],
        studies: [
          { citation: "Belpomme et al.", year: 2022, referenceId: "belpomme2022", note: "EHS 바이오마커(약 1,000명)" },
          { citation: "Sousouri et al. (NeuroImage, ETH Zurich)", year: 2025, referenceId: "sousouri2025", note: "이중맹검 RCT: CACNA1C rs7304986 T/C → ICNIRP 이하 3.6 GHz에서 수면 방추파 변화" },
          { citation: "CACNA1C genotyping", year: 2024, referenceId: "cacna1c_genotyping_2024", note: "VGCC 다형성 → EMF 감수성" },
          { citation: "HRV Wi-Fi exposure", year: 2023, referenceId: "hrv_wifi_2023", note: "감수성 하위 집단의 자율신경 변화" },
          { citation: "Higuchi et al.", year: 2007, referenceId: "higuchi2007", note: "눈 색상 → melatonin 억제(89% vs 73%)" },
          { citation: "Yap/Sherrard lab (Cells)", year: 2025, referenceId: "yap2025", note: "FAD 고갈 → 자기 방향 선택성 상실" },
        ],
      },
    ],
  },
} as const;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const d = pickCopy(COPY, locale);
  return { title: `${d.title} – Extinction Field`, description: d.subtitle };
}

export default async function MagnetoreceptionPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const d = pickCopy(COPY, locale);

  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <Link href={`/${locale}/evidence`} className="text-sm text-accent hover:underline mb-6 inline-block">
        {d.backLink}
      </Link>

      <PageHeader icon={Compass} title={d.title} subtitle={d.subtitle} lensIcon={<BermIcon name="physics" size={28} className="text-accent" />} />

      {/* Thematic evidence narratives */}
      <section className="mb-16 border-t editorial-rule pt-6">
        <div className="space-y-12 max-w-4xl">
          {d.narratives.map((narrative, ni) => (
            <article key={narrative.id} id={`narrative-${narrative.id}`} className="scroll-mt-24">
              {narrative.id === "human-cry-magnetoreception" && <span id="human-cry-magnetoreception" />}
              {narrative.id === "susceptibility" && <span id="individual-susceptibility" />}
              {narrative.id === "cry-pulse-resonance" && <span id="cry-trpc1" />}
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
                      <th className="py-2 pr-3">{d.tableCitation}</th>
                      <th className="py-2 pr-3 w-16">{d.tableYear}</th>
                      <th className="py-2">{d.tableNote}</th>
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

              {narrative.id === "susceptibility" && (
                <div className="mt-6 rounded-lg border border-accent/20 bg-card-bg p-4 flex flex-col sm:flex-row gap-3">
                  <a href={`/${locale}/evidence/eyes`} className="text-accent hover:underline font-semibold text-sm">
                    {d.eyeColorLink}
                  </a>
                  <a href={`/${locale}/evidence/nutrition`} className="text-accent hover:underline font-semibold text-sm">
                    {d.nutritionLink}
                  </a>
                </div>
              )}
            </article>
          ))}
        </div>
      </section>

      {/* Differential susceptibility */}
      <DifferentialSusceptibility locale={locale} />

      {/* See also links */}
      <section className="mt-12 rounded-lg border border-card-border bg-card-bg p-6">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground-muted mb-4">
          {d.seeAlso}
        </h3>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link href={`/${locale}/evidence`} className="text-accent hover:underline text-sm font-medium">
            {d.evidenceRegisterLink}
          </Link>
          <Link href={`/${locale}/evidence/eyes`} className="text-accent hover:underline text-sm font-medium">
            {d.eyeColorSeeAlsoLink}
          </Link>
        </div>
      </section>
    </div>
  );
}
