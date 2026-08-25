import type { Metadata } from "next";
import Link from "next/link";
import { Compass } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { DifferentialSusceptibility } from "@/components/DifferentialSusceptibility";
import { CitationLink } from "@/components/CitationLink";

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
          "Chae et al. (2019, PLOS ONE, n=41) provided the first behavioral evidence that CRY/RPM magnetoreception is functional in humans. Starved men (n=20) oriented significantly toward modulated magnetic north associated with food (α=350.0°, r=0.51, P=0.00043) and east (α=83.2°, r=0.34, P=0.015). The effect disappeared under blindfold (P=0.52) and at wavelengths >500 nm (P=0.44) — the diagnostic signature of the radical pair mechanism in cryptochrome, whose FAD chromophore absorbs specifically at 400–500 nm. Vertical field inversion reversed orientation to south (α=178.4°, r=0.50, P=0.00062), consistent with an inclination compass as RPM theory predicts. Women (n=21) showed no significant orientation under any condition.",
          "BERM relevance: This establishes that the biological substrate of BERM's primary pathway (C_RPM) exists and is functional in humans. Prior CRY/RPM evidence was limited to Drosophila (Yoshii 2009), birds (Ritz 2004, Engels 2014), planarians (PNAS Nexus 2026), and human cell systems in vitro (Sherrard 2018). Chae 2019 demonstrates the necessary condition — that the human CRY system responds to geomagnetic fields via the RPM — but does not test RF disruption of that response (which awaits discriminating tests D1–D3).",
          "The night-exposure pathway is particularly relevant: BERM's v17_night_fraction() models the scenario where a smartphone in the bedroom simultaneously produces blue light (activating CRY radical pairs) and RF fields (potentially disrupting them). Chae 2019 demonstrates that human CRY requires blue light to be magnetically active — meaning nighttime phone use creates precisely the conditions under which CRY is both active and vulnerable to RF interference.",
          "Caveats: Small sample (n=41). Correction notice Oct 2019 corrects a misplaced table caption — no methodological changes. Not yet replicated. The sex difference (men only) may relate to glucose/motivation rather than CRY sensitivity per se.",
        ],
        studies: [
          { citation: "Chae et al. (PLOS ONE)", year: 2019, note: "Blue-light-dependent human magnetoreception (P<0.001), consistent with inclination compass" },
          { citation: "Ritz et al. (Nature)", year: 2004, note: "RF at Larmor frequency disrupts bird compass" },
          { citation: "Engels et al. (Nature)", year: 2014, note: "Anthropogenic EM noise disrupts bird orientation" },
          { citation: "Yoshii et al. (Nature)", year: 2009, note: "CRY mutants lose magnetosensitivity in Drosophila" },
          { citation: "Sherrard et al. (PLOS Biology)", year: 2018, note: "EMF modulates CRY-dependent ROS in human cell systems" },
        ],
      },
      {
        id: "cry-pulse-resonance",
        title: "CRY/RPM pulse-duration resonance",
        paragraphs: [
          "The radical-pair mechanism (RPM) lifetime in cryptochrome is approximately 1 µs — the time window during which the singlet-triplet interconversion is magnetically sensitive. This is temporally compatible with pulse durations used by air-defense radars (also ~1 µs). The coincidence is not designed but arises from the physical timescales involved: cryptochrome's singlet-triplet conversion time is the same order of magnitude as the pulse width of surveillance radars.",
          "Each radar pulse covers the radical pair's entire lifetime, delivering the magnetic perturbation during the full conversion window. At 400 pulses per second, this produces 400 complete RPM events per second near a radar installation. By contrast, a continuous-wave (CW) signal at the same RMS applies a steady field with no pulse structure — the radical pair experiences a constant perturbation rather than discrete 1 µs windows. This predicts that pulse-modulated RF is more biologically active than CW at the same SAR. The REFLEX project (Diem et al. 2005) formally reported greater genotoxic effects from intermittent versus continuous exposure, consistent with this prediction. The temporal match is a physical coincidence, not a demonstrated resonance mechanism — it remains a testable prediction.",
          "Talbi, Zadeh-Haghighi & Simon 2025 (Front. Quantum Sci. Technol. 4:1544473): Computational simulations confirm RPM resonance ceiling at ~22.5 MHz. At 872 MHz, effect is 6×10⁻⁵ % — negligible. The paper's conclusion points to electric field/VGIC interactions (pathway A) as the mechanism for telecom-frequency biological effects. From BERM's perspective, this confirms the frequency-domain separation between pathways A and B. Note: This paper is frequently misread as 'RPM doesn't work.' It actually says 'RPM works for static/ELF fields, not for GHz carriers' — which is exactly what BERM's pathway architecture assumes.",
        ],
        studies: [
          { citation: "Sherrard RM et al. PLOS Biology", year: 2018, note: "CRY-dependent ROS generation under pulsed EMF" },
          { citation: "REFLEX / Diem et al.", year: 2005, note: "Intermittent > continuous genotoxicity at same SAR" },
          { citation: "Hore & Mouritsen, Annual Review of Biophysics", year: 2016, note: "Radical-pair mechanism lifetime ~1 µs" },
          { citation: "Talbi, Zadeh-Haghighi & Simon (Front. Quantum Sci. Technol.)", year: 2025, note: "RPM resonance ceiling ~22.5 MHz. At 872 MHz: 6×10⁻⁵ % effect — negligible. Confirms pathway A/B frequency separation." },
        ],
      },
      {
        id: "melatonin-systematic",
        title: "Melatonin suppression: PRISMA systematic review (Tbahriti 2026)",
        paragraphs: [
          "Tbahriti et al. (2026, Sleep Biol Rhythms 24(2):195–214) present a PRISMA 2020 systematic review of 55 studies from 892 screened, examining EMF effects on circadian rhythms. 88% of high-quality animal studies report EMF-induced melatonin suppression of 20–50% from baseline. Clock gene expression altered. Sleep architecture changes documented. EMF-induced melatonin suppression is smaller than light-induced (>90%).",
          "This directly supports BERM pathway C (EMF → pineal melatonin suppression → GnRH pulsatility disruption → HPG → gonadal function). The 20–50% suppression magnitude is biologically significant and consistent with BERM's v17_night_fraction() function, where EMF is one component of the nocturnal triple hit (melanopsin + CRY + melatonin suppression). The suppression magnitude being smaller than light-induced (>90%) is consistent with BERM modeling EMF as one of multiple nocturnal disruption pathways, not the sole driver. Methodological note: only 27% of reviewed studies met high methodological standards; 48% of animal studies lacked adequate sham controls. The transition from cellular effects to systemic circadian disruption is not fully established clinically.",
          "BERM interpretation: WHO and ICNIRP evidence classifications are subject to the same systematic biases BERM identifies: attenuation bias from proxy exposure measures, control group contamination (lab baseline bias), and funder bias (Huss 2007: industry-funded studies less likely to find harmful effects). If these biases are real, 'moderate certainty' in the standard framework may correspond to higher certainty in a bias-corrected framework. BERM treats institutional evidence hierarchies as CONTEXT_ONLY because they are external to BERM's own epistemology, not because the underlying evidence is weak.",
        ],
        studies: [
          { citation: "Tbahriti et al. (Sleep Biol Rhythms)", year: 2026, note: "PRISMA 55 studies: 88% of high-quality animal studies report melatonin suppression 20–50%. Only 27% met high standards." },
          { citation: "Huss et al. (Environ Health Perspect)", year: 2007, note: "Industry-funded EMF studies less likely to report harmful effects. Systematic funder bias." },
        ],
      },
      {
        id: "susceptibility",
        title: "Individual susceptibility variation",
        paragraphs: [
          "Electromagnetic hypersensitivity (EHS) clinical data suggests a continuous distribution of individual susceptibility. Belpomme et al. 2022 characterized approximately 1,000 EHS patients with objective biomarkers including histamine, S100B protein and nitrotyrosine. While EHS as a clinical entity remains debated, the biomarker data suggests measurable physiological responses in a susceptible subpopulation.",
          "Sousouri et al. 2025 (NeuroImage, ETH Zurich) provided the first double-blind human experimental demonstration of VGCC genotype-dependent EMF sensitivity. In 34 healthy volunteers, CACNA1C rs7304986 T/C carriers showed altered sleep spindle frequency after 30 minutes of 3.6 GHz 5G exposure below ICNIRP limits. T/T carriers showed no effect. This is not nocebo — it is a genetically determined, objectively measured neurophysiological response. The regulatory variant does not change the protein but its expression density: more VGCC channels = greater sensitivity. HRV studies under controlled Wi-Fi exposure (2023) show measurable autonomic changes in a subset of participants. If susceptibility follows a normal distribution, the population-level reproductive effect is the integral over the entire distribution, not the response of the median individual.",
          "See also: Eye Color & Magnetoreception — how iris pigmentation, nutrition, and sex modulate CRY sensitivity. Blue eyes transmit ~100× more light to retinal cryptochrome than brown eyes (Higuchi 2007: 89% vs 73% melatonin suppression). FAD availability from vitamin B2 directly controls CRY stability and magnetic field directional selectivity (Hirano 2017, Yap/Sherrard 2025). These modulators may explain part of the inter-individual and inter-population variance in pathway C effectiveness.",
        ],
        studies: [
          { citation: "Belpomme et al.", year: 2022, note: "EHS biomarkers (~1,000 patients)" },
          { citation: "Sousouri et al. (NeuroImage, ETH Zurich)", year: 2025, note: "Double-blind RCT: CACNA1C rs7304986 T/C → altered sleep spindles at 3.6 GHz below ICNIRP" },
          { citation: "CACNA1C genotyping", year: 2024, note: "VGCC polymorphism → EMF sensitivity" },
          { citation: "HRV Wi-Fi exposure", year: 2023, note: "Autonomic changes in susceptible subset" },
          { citation: "Higuchi et al.", year: 2007, note: "Eye color → melatonin suppression (89% vs 73%)" },
          { citation: "Yap/Sherrard lab (Cells)", year: 2025, note: "FAD depletion → loss of magnetic directional selectivity" },
        ],
      },
    ],
  },
  fi: {
    title: "Ihmisen magnetoreseptio ja CRY-reitit",
    subtitle: "Ihmisen kryptokromin magnetoreseptio, CRY-pulssiresonanssi, melatoniinisuppressio ja differentiaalinen herkkyys",
    backLink: "← Takaisin evidenssiin",
    narratives: [
      {
        id: "human-cry-magnetoreception",
        title: "Ihmisen CRY/RPM-magnetoreseptio on toiminnallinen",
        paragraphs: [
          "Chae ym. (2019, PLOS ONE, n=41) tarjosivat ensimmäisen käyttäytymistason näytön siitä, että CRY/RPM-magnetoreseptio on toiminnallinen ihmisessä. Nälkiintyneet miehet (n=20) orientoituivat tilastollisesti merkitsevästi kohti moduloitua magneettista pohjoista, joka yhdistettiin ruokaan (α=350,0°, r=0,51, P=0,00043) ja itään (α=83,2°, r=0,34, P=0,015). Vaikutus hävisi silmäsiteellä (P=0,52) ja aallonpituuksilla >500 nm (P=0,44) — kryptokromin radikaaliparimekanismin diagnostinen sormenjälki, jonka FAD-kromofori absorboi nimenomaan 400–500 nm:ssä. Pystykomponentin kääntäminen käänsi orientaation etelään (α=178,4°, r=0,50, P=0,00062), mikä on yhdenmukainen inklinaatiokompassin kanssa kuten RPM-teoria ennustaa. Naiset (n=21) eivät osoittaneet merkitsevää orientaatiota missään olosuhteissa.",
          "BERM-merkitys: Osoittaa, että BERM:n ensisijaisen polun (C_RPM) biologinen substraatti on olemassa ja toiminnallinen ihmisessä. Aiempi CRY/RPM-näyttö rajoittui Drosophilaan (Yoshii 2009), lintuihin (Ritz 2004, Engels 2014), planarioihin (PNAS Nexus 2026) ja ihmisen solujärjestelmiin in vitro (Sherrard 2018). Chae 2019 osoittaa välttämättömän ehdon — että ihmisen CRY-järjestelmä reagoi geomagneettisiin kenttiin RPM:n kautta — mutta ei testaa RF-häiriön vaikutusta tähän vasteeseen (mikä odottaa diskriminoivia testejä D1–D3).",
          "Yöaltistusreitti on erityisen merkityksellinen: BERM:n v17_night_fraction() mallintaa tilannetta, jossa älypuhelin makuuhuoneessa tuottaa samanaikaisesti sinistä valoa (aktivoi CRY:n radikaaliparit) ja RF-kenttiä (mahdollisesti häiritsee niitä). Chae 2019 osoittaa, että ihmisen CRY tarvitsee sinistä valoa ollakseen magneettisesti aktiivinen — yöllinen puhelimen käyttö luo juuri ne olosuhteet, joissa CRY on sekä aktiivinen että haavoittuvainen RF-häiriölle.",
          "Varoitukset: Pieni otoskoko (n=41). Korjausilmoitus lokakuu 2019 koski taulukon otsikkotekstin sijoitusta — ei metodologisia muutoksia. Ei vielä replikoitu. Sukupuoliero (vain miehet) voi liittyä glukoosi-/motivaatiotekijöihin eikä välttämättä CRY-herkkyyteen sinänsä.",
        ],
        studies: [
          { citation: "Chae ym. (PLOS ONE)", year: 2019, note: "Sinivalosta riippuva ihmisen magnetoreseptio (P<0,001), yhdenmukainen inklinaatiokompassin kanssa" },
          { citation: "Ritz ym. (Nature)", year: 2004, note: "RF Larmor-taajuudella häiritsee lintujen kompassia" },
          { citation: "Engels ym. (Nature)", year: 2014, note: "Ihmisen tuottama EM-kohina häiritsee lintujen orientaatiota" },
          { citation: "Yoshii ym. (Nature)", year: 2009, note: "CRY-mutantit menettävät magnetoreseption Drosophilassa" },
          { citation: "Sherrard ym. (PLOS Biology)", year: 2018, note: "EMF moduloi CRY-riippuvaista ROS:ia ihmisen solujärjestelmissä" },
        ],
      },
      {
        id: "cry-pulse-resonance",
        title: "CRY/RPM-pulssikestoresonanssi",
        paragraphs: [
          "Radikaaliparimekanismin (RPM) elinaika kryptokromissa on noin 1 µs — aikaikkuna, jonka aikana singletti–tripletti-interkonversio on magneettisesti herkkä. Tämä on ajallisesti yhteensopiva ilmapuolustustutkien pulssikestojen kanssa (myös ~1 µs). Yhteensattuma ei ole suunniteltu vaan syntyy mukana olevista fysikaalisista aikaskaaloista: kryptokromin singletti–tripletti-konversioaika on samaa suuruusluokkaa kuin valvontatutkien pulssinkesto.",
          "Jokainen tutkapulssi kattaa radikaaliparin koko elinkaaren ja tuottaa magneettisen häiriön koko konversioikkunan ajan. 400 pulssia sekunnissa tuottaa 400 täydellistä RPM-tapahtumaa sekunnissa tutka-aseman lähellä. Sitä vastoin jatkuva aalto (CW) samalla RMS:llä tuottaa tasaisen kentän ilman pulssirakennetta — radikaalipari kokee vakiohäiriön yksittäisten 1 µs -ikkunoiden sijaan. Tämä ennustaa, että pulssimoduloitu RF on biologisesti aktiivisempi kuin CW samalla SAR-arvolla. REFLEX-projekti (Diem ym. 2005) raportoi muodollisesti suuremmat genotoksiset vaikutukset katkonaiselle altistukselle jatkuvaan verrattuna, mikä on yhteensopivaa tämän ennusteen kanssa. Ajallinen vastaavuus on fysikaalinen yhteensattuma, ei osoitettu resonanssimekanismi — se on testattava ennuste.",
          "Talbi, Zadeh-Haghighi & Simon 2025 (Front. Quantum Sci. Technol. 4:1544473): Laskennalliset simulaatiot vahvistavat RPM-resonanssimaksimin ~22,5 MHz:ssä. 872 MHz:llä vaikutus on 6×10⁻⁵ % — mitätön. Artikkelin johtopäätös osoittaa sähkökenttä/VGIC-interaktioihin (polku A) telecom-taajuisten biologisten vaikutusten mekanismina. BERM:n näkökulmasta tämä vahvistaa polkujen A ja B taajuusalue-erottelun. Huom: Tätä artikkelia luetaan usein väärin 'RPM ei toimi'. Se sanoo 'RPM toimii staattisilla/ELF-kentillä, ei GHz-kantoaalloilla' — mikä on täsmälleen BERM:n polkuarkkitehtuurin oletus.",
        ],
        studies: [
          { citation: "Sherrard RM ym. PLOS Biology", year: 2018, note: "CRY-riippuvainen ROS-tuotanto pulssi-EMF:ssä" },
          { citation: "REFLEX / Diem ym.", year: 2005, note: "Katkonainen > jatkuva genotoksisuus samalla SAR:lla" },
          { citation: "Hore & Mouritsen, Annual Review of Biophysics", year: 2016, note: "Radikaaliparimekanismin elinaika ~1 µs" },
          { citation: "Talbi, Zadeh-Haghighi & Simon (Front. Quantum Sci. Technol.)", year: 2025, note: "RPM-resonanssimaksimi ~22,5 MHz. 872 MHz:llä: 6×10⁻⁵ % vaikutus — mitätön. Vahvistaa polku A/B -taajuuserottelun." },
        ],
      },
      {
        id: "melatonin-systematic",
        title: "Melatoniinisuppressio: PRISMA-katsaus (Tbahriti 2026)",
        paragraphs: [
          "Tbahriti ym. (2026, Sleep Biol Rhythms 24(2):195–214) esittävät PRISMA 2020 -systemaattisen katsauksen: 55 tutkimusta 892 seulotusta, tarkastellen EMF:n vaikutuksia sirkadiaanirytmeihin. 88 % korkealaatuisista eläintutkimuksista raportoi EMF-indusoitua melatoniinisuppressiota (20–50 % basaalitasosta). Kellogenien ekspressio muuttuu. Uniarkkitehtuurin muutokset dokumentoitu. EMF:n melatoniinisuppressio on pienempi kuin valon aiheuttama (>90 %).",
          "Tukee suoraan BERM:n polkua C (EMF → pineaalinen melatoniinisuppressio → GnRH-pulsaatiohäiriö → HPG → gonadifunktio). 20–50 %:n suppressio on biologisesti merkittävä ja yhdenmukainen BERM:n v17_night_fraction()-funktion kanssa, jossa EMF on yksi komponentti yöllisessä kolminkertaisessa osumassa (melanopsiini + CRY + melatoniinisuppressio). Suppression suuruus on pienempi kuin valon aiheuttama (>90 %) — yhdenmukainen sen kanssa, että BERM mallintaa EMF:n yhtenä useista yöllisistä häiriöreiteistä, ei ainoana ajurina. Metodologinen huomio: vain 27 % tutkimuksista täytti korkeat metodologiset standardit; 48 % eläintutkimuksista ilman riittävää sham-kontrollia. Siirtymä soluvaikutuksista systeemiseen sirkadiaaniseen häiriöön ei ole täysin osoitettu kliinisesti.",
          "BERM-tulkinta: WHO:n ja ICNIRP:n evidenssiluokitukset ovat alttiina samoille systemaattisille vinoumille jotka BERM tunnistaa: proxy-altistusmittauksen vaimennusbias, kontrolliryhmän kontaminaatio (lab baseline bias) ja rahoittajan vinouma (Huss 2007: teollisuusrahoitteiset tutkimukset löytävät harvemmin haittoja). Jos nämä vinoumat ovat todellisia, 'kohtalainen varmuus' standardikehyksessä voi vastata korkeampaa varmuutta bias-korjatussa kehyksessä. BERM käsittelee institutionaalisia evidenssihierarkioita CONTEXT_ONLY-roolissa koska ne ovat BERM:n epistemologian ulkopuolisia, ei siksi että alla oleva evidenssi olisi heikkoa.",
        ],
        studies: [
          { citation: "Tbahriti ym. (Sleep Biol Rhythms)", year: 2026, note: "PRISMA, 55 tutkimusta: 88 % korkealaatuisista eläintutkimuksista raportoi melatoniinisuppressiota 20–50 %. Vain 27 % täytti korkeat standardit." },
          { citation: "Huss ym. (Environ Health Perspect)", year: 2007, note: "Teollisuusrahoitteiset EMF-tutkimukset raportoivat harvemmin haittoja. Systemaattinen rahoittajan vinouma." },
        ],
      },
      {
        id: "susceptibility",
        title: "Yksilöllinen herkkyysvariaatio",
        paragraphs: [
          "Sähkömagneettinen yliherkkyyys (EHS) -kliininen data viittaa jatkuvaan yksilöllisen herkkyyden jakaumaan. Belpomme ym. 2022 karakterisoivat noin 1 000 EHS-potilasta objektiivisilla biomarkkereilla, mukaan lukien histamiini, S100B-proteiini ja nitrotyrosiini. Vaikka EHS kliinisenä entiteettina on kiistanalainen, biomarkkerit viittaavat mitattaviin fysiologisiin vasteisiin herkässä alapopulaatiossa.",
          "Sousouri ym. 2025 (NeuroImage, ETH Zürich) tarjosi ensimmäisen kaksoissokko-ihmiskokeellisen osoituksen VGCC-genotyyppiriippuvaisesta EMF-herkkyydestä. Satunnaistetussa kontrolloidussa kokeessa CACNA1C rs7304986 T/C -kantajat osoittivat muuttunutta unisukkuladynamiikkaa 3,6 GHz RF-altistuksessa ICNIRP-rajojen alapuolella, kun taas CC-homotsygootit eivät. Tämä on ensimmäinen kokeellinen vahvistus sille, että ionikanavan genotyyppi ennustaa yksilöllistä EMF-vastetta, ja se muuttaa herkkyysjakauman aiemmin ehdotetusta (CACNA1C-assosiaatiotutkimukset 2024) kokeellisesti todistetuksi. Jos herkkyys noudattaa normaalijakaumaa, väestötason lisääntymisvaikutus on integraali koko jakauman yli, ei mediaani-yksilön vaste.",
          "Katso myös: Silmien väri ja magnetoreseptio — miten iiriksen pigmentaatio, ravitsemus ja sukupuoli moduloivat CRY-herkkyyttä. Siniset silmät päästävät ~100× enemmän valoa verkkokalvon kryptokromille kuin ruskeat silmät (Higuchi 2007: 89 % vs. 73 % melatoniinisuppressio). FAD-saatavuus B2-vitamiinista kontrolloi suoraan CRY-stabiilisuutta ja magneettikentän suuntaerottelukykyä (Hirano 2017, Yap/Sherrard 2025). Nämä modulaattorit voivat selittää osan polku C:n tehokkuuden yksilöiden ja populaatioiden välisestä vaihtelusta.",
        ],
        studies: [
          { citation: "Belpomme ym.", year: 2022, note: "EHS-biomarkkerit (~1 000 potilasta)" },
          { citation: "Sousouri ym. (NeuroImage, ETH Zürich)", year: 2025, note: "Kaksoissokko-RCT: CACNA1C rs7304986 T/C → muuttunut unisukkuladynamiikka 3,6 GHz:ssä ICNIRP-rajan alla" },
          { citation: "HRV Wi-Fi -altistus", year: 2023, note: "Autonomiset muutokset herkässä osajoukossa" },
          { citation: "Higuchi ym.", year: 2007, note: "Silmien väri → melatoniinisuppressio (89 % vs. 73 %)" },
          { citation: "Yap/Sherrard-lab (Cells)", year: 2025, note: "FAD-puutos → magneettisen suuntaerottelun menetys" },
        ],
      },
    ],
  },
} as const;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const d = locale === "fi" ? COPY.fi : COPY.en;
  return { title: `${d.title} – Extinction Field`, description: d.subtitle };
}

export default async function MagnetoreceptionPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const isFi = locale === "fi";
  const d = isFi ? COPY.fi : COPY.en;

  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <Link href={`/${locale}/evidence`} className="text-sm text-accent hover:underline mb-6 inline-block">
        {d.backLink}
      </Link>

      <PageHeader icon={Compass} title={d.title} subtitle={d.subtitle} />

      {/* Thematic evidence narratives */}
      <section className="mb-16 border-t editorial-rule pt-6">
        <div className="space-y-12 max-w-4xl">
          {d.narratives.map((narrative, ni) => (
            <article key={narrative.id} id={`narrative-${narrative.id}`} className="scroll-mt-24">
              {narrative.id === "human-cry-magnetoreception" && <span id="human-cry-magnetoreception" />}
              {narrative.id === "susceptibility" && <span id="individual-susceptibility" />}
              <h3 className="text-lg font-semibold mb-4">
                <span className="font-mono-num text-xs text-accent mr-2">0{ni + 1}</span>
                {narrative.title}
              </h3>
              {narrative.paragraphs.length > 0 && (
                <p className="editorial-rail mb-4 text-[0.95rem] leading-relaxed text-foreground">
                  {narrative.paragraphs[0]}
                </p>
              )}
              <div className="space-y-3 text-sm text-foreground-muted leading-relaxed mb-5">
                {narrative.paragraphs.slice(1).map((p, pi) => (
                  <p key={pi}>{p}</p>
                ))}
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="border-b border-card-border text-left text-xs text-foreground-muted uppercase tracking-wider">
                      <th className="py-2 pr-3">{isFi ? "Viite" : "Citation"}</th>
                      <th className="py-2 pr-3 w-16">{isFi ? "Vuosi" : "Year"}</th>
                      <th className="py-2">{isFi ? "Huomio" : "Note"}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {narrative.studies.map((s) => (
                      <tr key={`${s.citation}-${s.year}`} className="border-b border-card-border/40">
                        <td className="py-2 pr-3 font-medium text-foreground"><CitationLink citation={s.citation} year={s.year} /></td>
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
                    {isFi
                      ? "→ Silmien väri ja magnetoreseptio"
                      : "→ Eye Color & Magnetoreception"}
                  </a>
                  <a href={`/${locale}/evidence/nutrition`} className="text-accent hover:underline font-semibold text-sm">
                    {isFi
                      ? "→ Ravitsemuksellinen CRY-modulaatio"
                      : "→ Nutritional CRY Modulation"}
                  </a>
                </div>
              )}
            </article>
          ))}
        </div>
      </section>

      {/* Differential susceptibility */}
      <DifferentialSusceptibility locale={locale as "en" | "fi"} />

      {/* See also links */}
      <section className="mt-12 rounded-lg border border-card-border bg-card-bg p-6">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground-muted mb-4">
          {isFi ? "Katso myös" : "See also"}
        </h3>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link href={`/${locale}/evidence`} className="text-accent hover:underline text-sm font-medium">
            {isFi ? "← Evidenssirekisteri" : "← Evidence register"}
          </Link>
          <Link href={`/${locale}/evidence/eyes`} className="text-accent hover:underline text-sm font-medium">
            {isFi ? "Silmien väri ja magnetoreseptio →" : "Eye Color & Magnetoreception →"}
          </Link>
        </div>
      </section>
    </div>
  );
}
