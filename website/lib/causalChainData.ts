import type { ChainNode, ChainEdge, EpistemicLevel } from "./types";

export const EPISTEMIC_COLORS: Record<EpistemicLevel, string> = {
  L: "#6B7280",
  "L*": "#9CA3AF",
  M: "#3B82F6",
  C: "#F59E0B",
  "M|C": "#8B5CF6",
  E: "#10B981",
};

export const EPISTEMIC_LABELS: Record<EpistemicLevel, string> = {
  L: "Premissi",
  "L*": "Premissi (ei validoitu)",
  M: "Matemaattinen seuraus",
  C: "Ehdokas",
  "M|C": "Välttämätön seuraus",
  E: "Empiirisesti vahvistettu",
};

export const LEVEL_TITLES: Record<number, string> = {
  1: "Geometria",
  2: "Valintasääntö",
  3: "Altistus",
  4: "Kalvofysiikka",
  5: "Polut",
  6: "Kaskadi",
  7: "Konvergenssi",
  8: "Demografinen kaskadi",
  9: "Takaisinkytkentä",
};

export const NODES: ChainNode[] = [
  // TASO 1
  {
    id: "geometry",
    level: 1,
    label: "Lindgrenin geometria",
    sublabel: "gμν = ημν + AμAν",
    epistemicLevel: "L",
    title: "Sähkömagnetismi aika-avaruuden geometriana",
    mechanism:
      "Lindgrenin, Kovacsin ja Liukkosen (2025) kehyksessä sähkömagneettinen potentiaali Aμ ei ole erillinen kenttä aika-avaruudessa vaan osa aika-avaruuden metrisen tensorin rakennetta. Metriikka gμν = ημν + AμAν tarkoittaa, että sähkömagneettinen kenttä kirjaimellisesti muuttaa geometriaa jossa kaikki partikkelit liikkuvat ja kaikki fysikaaliset prosessit tapahtuvat.",
    lindgrenInterpretation:
      "Tämä on koko mallin perusta. Jos metriikka on oikea, biologiset järjestelmät — jotka ovat ionien, varausten ja potentiaalien järjestelmiä — elävät geometriassa joka muuttuu ulkoisten sähkömagneettisten kenttien mukana. Vaikutus ei ole valinnainen vaan geometrinen välttämättömyys.",
    quantitative:
      "gμν = ημν + Aμ Aν\n\nημν = Minkowskin metriikka (litteä aika-avaruus)\nAμ = sähkömagneettinen 4-potentiaali\nAμ Aν = neliöllinen korjaustermi",
    keyReferences: [
      {
        authors: "Lindgren, Kovacs & Liukkonen 2025",
        title: "Electromagnetism as a purely geometric theory",
        journal: "J. Phys.: Conf. Ser. 2987, 012001",
        keyFinding:
          "Maxwellin yhtälöt seuraavat geometriasta ilman erillistä EM-kenttää",
      },
      {
        authors: "Vassallo ym. 2025",
        title: "Independent Scientific Validation of Lindgren et al.",
        journal: "Demokritos Scientific Journal",
        keyFinding: "Riippumaton validaatio Lindgrenin johdolle",
      },
    ],
    falsificationCondition:
      "Jos Lindgrenin metriikka on matemaattisesti virheellinen tai kokeellisesti yhteensopimaton tunnetun fysiikan kanssa",
  },

  // TASO 2
  {
    id: "chi",
    level: 2,
    label: "Valintasääntö χ(Ā)",
    sublabel: "Ā / √(1 + Ā²)",
    epistemicLevel: "M",
    title: "Taustariippuvainen herkkyys",
    mechanism:
      "Geometriasta seuraa, että biologisen systeemin herkkyys ulkoiselle EMF-perturbointille riippuu taustakentän voimakkuudesta. Funktiossa χ(Ā) = Ā/√(1+Ā²) arvolla Ā=0 (ei taustaa) herkkyys on nolla — lineaarista vastetta ei ole. Kun Ā kasvaa, χ lähestyy 1:tä — herkkyys saturoituu. Solun kalvopotentiaali (−70 mV, 10 nm yli) tuottaa Ā ≈ 7×10⁶ V/m → χ ≈ 1.0. Solut ovat maksimaalisesti herkkiä.",
    lindgrenInterpretation:
      "Tämä on geometrian suora seuraus: litteässä tyhjässä taustassa perturbointia ei muuta geodeesejä ensimmäisessä kertaluvussa. Tausta rikkoo symmetrian ja mahdollistaa lineaarisen vasteen. Biologian suuri taustapotentiaali (kalvopotentiaali) tekee soluista erityisen herkkiä.",
    quantitative:
      "χ(Ā) = Ā / √(1 + Ā²)\n\nĀ = 0 → χ = 0 (ei lineaarista vastetta)\nĀ = 1 → χ = 0.71\nĀ → ∞ → χ → 1.0 (saturaatio)\n\nSolun kalvo: Ā ≈ 7×10⁶ → χ ≈ 1.0",
    keyReferences: [
      {
        authors: "Lindgren ym. 2025",
        title: "Electromagnetism as a purely geometric theory",
        journal: "J. Phys.: Conf. Ser. 2987",
        keyFinding: "Tyhjän taustan kieltosääntö: δg(1) = 0 kun Ā = 0",
      },
    ],
    falsificationCondition:
      "Jos lineaarinen biologinen vaste havaitaan ilman taustkenttää (Ā = 0)",
  },

  // TASO 3
  {
    id: "ambient",
    level: 3,
    label: "Ambient-EMF",
    sublabel: "Tukiasemat + Wi-Fi + IoT",
    epistemicLevel: "E",
    title: "Ympäristön sähkömagneettinen tausta",
    mechanism:
      "Tukiasemat, Wi-Fi-reitittimet, IoT-laitteet ja voimalinjat muodostavat jatkuvan sähkömagneettisen taustan joka on kasvanut eksponentiaalisesti 1990-luvulta. Kaupunkiympäristössä mitattu mediaanikenttä on 0.67–1.51 V/m (PMC 2022). Tämä kenttä on läsnä 24/7 riippumatta yksilön omasta laitekäytöstä.",
    lindgrenInterpretation:
      "Ambient-EMF on Ā — taustapotentiaali joka määrää χ(Ā):n arvon. Se ei itsessään ole pääasiallinen biologinen vaikuttaja vaan se MAHDOLLISTAA personal-EMF:n vaikutuksen. Ilman ambient-taustaa (esim. amish-yhteisö) personal-laitteiden vaikutus olisi geometrisesti minimoitu.",
    keyReferences: [
      {
        authors: "GSMA Intelligence 2024",
        title: "Mobile Economy Report",
        journal: "GSMA",
        keyFinding:
          "5.8 miljardia mobiililiittymää, 4.93 miljoonaa tukiasemaa globaalisti",
      },
      {
        authors: "Eurooppalaiset mittausverkot 2022",
        title: "RF-EMF exposure in European cities",
        journal: "PMC",
        keyFinding: "Mediaanikentät 0.67–1.51 V/m kaupungeissa",
      },
    ],
  },
  {
    id: "personal",
    level: 3,
    label: "Personal-EMF",
    sublabel: "Puhelin + kuulokkeet + kellot",
    epistemicLevel: "E",
    title: "Henkilökohtainen laitealtistus",
    mechanism:
      "Älypuhelin keholla (taskussa, kädessä, yöpöydällä) tuottaa SAR-arvon joka on 100–1500× ympäristötaustan. Keskimääräinen kehokontaktiaika on kasvanut 2h/vrk (2007) → 14h/vrk (2024). Nappikuulokkeet tuottavat jatkuvan RF-altistuksen hypotalamuksen lähelle. Älykellot ranteessa, läppäri sylissä.",
    lindgrenInterpretation:
      "Personal-EMF on perturbointia a joka kohdistuu tiettyihin kudoksiin (kivekset taskussa, aivolisäke korvalla, hypotalamus kuulokkeissa). Sen biologinen vaste riippuu χ(Ā):stä — ambient-taustan tasosta. Korkea ambient + korkea personal = maksimaalinen biologinen vaste.",
    quantitative:
      "phoneBodyContactHours(2024) = 14 h/vrk\nsmartphonePenetration(Finland, 2024) = 0.90\nearpodPenetration(Finland, 2024) = 0.28",
    keyReferences: [
      {
        authors: "WHO SR3A / Kenny ym. 2024",
        title: "Systematic review: RF-EMF and male fertility",
        journal: "Environment International",
        keyFinding:
          "Altistuksen karakterisointi merkittävin heikkous tutkimuksissa",
      },
    ],
  },
  {
    id: "two_channel",
    level: 3,
    label: "Kaksikanavamalli",
    sublabel: "total = ambient + χ(Ā)×personal",
    epistemicLevel: "M|C",
    title: "Kaksikanavainen altistusyhdistelmä",
    mechanism:
      "Kokonaisaltistus ei ole ambient + personal (lineaarinen summa) vaan ambient + χ(ambient) × personal. Tämä tarkoittaa: kun ambient on matala (esim. maaseutu), personal-laitteiden biologinen vaikutus on pieni vaikka käyttö on samaa. Kun ambient on korkea (kaupunki), personal lisää altistusta lähes lineaarisesti.",
    lindgrenInterpretation:
      "Kaksikanavamalli on geometrisen valintasäännön suora sovellus. Se selittää miksi amish-yhteisö (Ā ≈ 0) ei koe biologista vaikutusta vaikka joku vierailisi matkapuhelimen kanssa — χ(0) × personal = 0. Ja miksi Soul (Ā korkea) kokee dramaattisen vaikutuksen — χ(Ā) ≈ 1, personal lisäytyy täysimääräisesti.",
    quantitative:
      "total(y) = ambient(y) + χ(ambient(y)) × personal(y)\ncumEMF = Σ_y total(y)  [vuodesta EMF_start]",
    keyReferences: [
      {
        authors: "Lindgren ym. 2025",
        title: "Geometrinen valintasääntö",
        journal: "J. Phys.: Conf. Ser.",
        keyFinding:
          "Lineaarinen kytkentä vaatii rikkoutumattoman taustariippuvuuden",
      },
    ],
    falsificationCondition:
      "Jos personal-EMF tuottaa saman biologisen vasteen ambient-taustasta riippumatta",
  },

  // TASO 4
  {
    id: "membrane",
    level: 4,
    label: "Kalvopotentiaali",
    sublabel: "Vmem = −70 mV / 10 nm",
    epistemicLevel: "E",
    title: "Solun kalvopotentiaali biologisena taustana",
    mechanism:
      "Jokaisen elävän solun kalvon yli on jännitegradientti: −70 mV 10 nanometrin matkalla. Tämä vastaa kentänvoimakkuutta 7×10⁶ V/m — suuruusluokkia enemmän kuin mikään ulkoinen EMF. Kalvopotentiaali ylläpidetään ionipumppujen (Na⁺/K⁺-ATPaasi) aktiivisella työllä ja se on elämän perusedellytys.",
    lindgrenInterpretation:
      "Kalvopotentiaali on biologisen aika-avaruuden paikallinen Ā. Se on valtava — 7 miljoonaa volttia metrillä. Lindgrenin kehyksessä tämä tarkoittaa, että solukalvo on äärimmäisen 'kaareva' alue metriikassa. χ(7×10⁶) ≈ 1.0: maksimaalinen herkkyys. Tämä selittää miksi pienet ulkoiset kentät (1–10 V/m) voivat vaikuttaa biologiaan — ne eivät kilpaile kalvopotentiaalin kanssa vaan PERTURBOIVAT sitä.",
    keyReferences: [],
  },
  {
    id: "vgic",
    level: 4,
    label: "VGIC-aktivaatio",
    sublabel: "IFO-mekanismi (Panagopoulos 2025)",
    epistemicLevel: "E",
    title: "Jänniteohjattujen ionikanavien pakko-oskillaatio",
    mechanism:
      "Jänniteohjatut ionikanavat (VGIC) avaavat ja sulkevat sähkökentän mukaan. S4-jännitesensori on varattu heliksi joka liikkuu kentän muuttuessa. Panagopouloksen IFO-mekanismi (Irregular Forced Opening): polarisoitu, koherentti RF-EMF pakottaa S4:n oskilloiman taajuudella johon se ei ole sopeutunut → kanava avautuu ja sulkeutuu epäsäännöllisesti → hallitsematon Ca²⁺-influksi.",
    lindgrenInterpretation:
      "VGIC:n S4-heliksi on varattu partikkeli metrisessä kentässä gμν. Kun ulkoinen EMF muuttaa paikallista metriikkaa, S4:n liikerata muuttuu — se on geodeesimuutos. IFO on geometrinen seuraus: RF-kenttä muuttaa metriikkaa S4:n ympäristössä → S4:n tasapainoasema muuttuu → kanava avautuu.",
    quantitative:
      "Tang ym. 2024 (Nature Communications): S4-heliksin protonidynamiikka määrää VGIC:n rakenteen ja toiminnan. Panagopoulos 2025: IFO-mekanismi polarisoituneelle koherentille kentälle.",
    keyReferences: [
      {
        authors: "Panagopoulos ym. 2015, 2021, 2025",
        title: "IFO-VGIC mechanism",
        journal: "BioMed Research International / Adv. Exp. Med. Biol.",
        keyFinding:
          "Polarisoitu, koherentti RF-EMF pakottaa S4-heliksin epäsäännölliseen oskillaatioon",
      },
      {
        authors: "Tang ym. 2024",
        title: "Proton dynamics determine VGIC structure and function",
        journal: "Nature Communications 15, 704",
        keyFinding: "S4-protonidynamiikka on VGIC-toiminnan perusta",
      },
      {
        authors: "Pall 2013",
        title: "EMF act via activation of voltage-gated calcium channels",
        journal: "J. Cell. Mol. Med. 17(8)",
        keyFinding: "23 tutkimusta: VGCC-salpaajat estävät EMF-vasteen",
      },
    ],
    falsificationCondition:
      "Jos VGIC-salpaajat (esim. nifedipiini) eivät estä RF-EMF:n biologisia vaikutuksia",
  },

  {
    id: "gme",
    level: 4,
    label: "GME-itsesekoitus",
    sublabel: "u²(t) → R42-ikkuna",
    epistemicLevel: "L*",
    title: "RF-verhokäyrän geometrinen itsesekoitus",
    mechanism:
      "Full-Weyl-metriikan neliötermi (AμAν) tuottaa itsesekoituksen: RF-verhokäyrä u²(t) siirtää tehospektrin kantoaallon taajuudelta peruskaistalle. Tuloksena syntyvä peruskaistaspektri sisältää harmonisia, jotka osuvat R42-biologiseen ikkunaan (20–40 mHz). 3GPP TS 24.008 eDRX/PTW-ajastukset tuottavat pulssirakenteita joiden spektraalinen energia keskittyy tähän ikkunaan — PTW=33.28s tuottaa 30.048 mHz (0.16% R42-keskipisteestä).",
    lindgrenInterpretation:
      "GME on Lindgrenin metriikan suora seuraus: gμν = ημν + AμAν -termin neliöllinen Aμ tuottaa itsesekoituksen matemaattisesti. Tämä on geometrinen ominaisuus, ei ad hoc -lisäys. R42-ikkuna on biologinen fakta (Zandieh 2025); 3GPP-ajoitus on tekninen standardi. GME yhdistää nämä matemaattisesti.",
    quantitative:
      "R_G(ᾱ) = 3ᾱ²/(1+ᾱ²)\nC(ᾱ) = (2ᾱ²−1)/(ᾱ(1+ᾱ²))\nΞ_R42 = Σ_n |c_n|² × W_R42(f_n)\n\nPTW=33.28s → f=30.048 mHz → 0.16% R42:sta",
    keyReferences: [
      {
        authors: "Zandieh ym. 2025",
        title: "Frequency-specific mitochondrial and ROS responses",
        journal: "(L* — yksittäinen lähde)",
        keyFinding: "20–40 mHz taajuusalueella havaittu spesifinen soluvaste",
      },
      {
        authors: "3GPP TS 24.008",
        title: "Extended DRX / Paging Time Window",
        journal: "3GPP standardidokumentti",
        keyFinding: "PTW=33.28s osuu 0.16% päähän R42-ikkunan keskipisteestä",
      },
    ],
    falsificationCondition:
      "R43-kokeen falsifikaatiokriteerit F1–F6: ei kaistanpäästöä, CW>pulssi, valesignaali>=kaikki, maksimi T=[25,50]s ulkopuolella, Spearman rho<0.5, ei p<0.05",
  },

  // TASO 5
  {
    id: "pathway_a",
    level: 5,
    label: "Polku A: ROS",
    sublabel: "Ca²⁺ → mitokondriaali ROS",
    epistemicLevel: "E",
    title: "Oksidatiivinen stressi",
    mechanism:
      "VGIC-aktivaation tuottama Ca²⁺-influksi aktivoi mitokondriaalisen elektroninsiirtoketjun ylikuormituksen → reaktiivisten happilajien (ROS) tuotanto kasvaa. ROS vaurioittaa DNA:ta, lipidejä ja proteiineja. Umbrella review 2025 (9 katsausta, 215 tutkimusta): RF-EMR laski siittiöiden motiliteettia merkitsevästi (MD: −3.90) ja vitaliteettia (MD: −2.85). Testosteroni laski merkitsevästi (MD: −1.5 ng/dL).",
    lindgrenInterpretation:
      "ROS-tuotanto on metrisen perturbointian kemiallinen seuraus. Ca²⁺ on varaus jonka liike seuraa geometriaa. Kun geometria muuttuu (EMF), Ca²⁺:n jakautuminen solun sisällä muuttuu → mitokondriaalinen kuormitus muuttuu → ROS-tasapaino häiriintyy. Redox-bifurkaatiovahvistus G = 1/(2µ) selittää miksi pieni Ca²⁺-muutos tuottaa suuren ROS-vasteen: systeemi on lähellä bifurkaatiokynnystä.",
    recoveryAlpha: 0.8,
    recoveryTimescale: "päivistä viikkoihin",
    bermComponent: "biology/sperm_cascade.py → ros_index()",
    keyReferences: [],
  },
  {
    id: "pathway_b",
    level: 5,
    label: "Polku B: CRY",
    sublabel: "RPM → kellogeenihäiriö",
    epistemicLevel: "E",
    title: "Kryptokromi-sirkadiaanihäiriö",
    mechanism:
      "RF-kentät häiritsevät kryptokromin (CRY) radikaaliparimekanismia (RPM). CRY on sirkadiaanisen kellon ydinkomponentti gonadikudoksessa. RPM-häiriö → kellogeenien ekspression muutos → ovulaation ajoitus häiriintyy (naiset) + spermatogeneesin rytmi häiriintyy (miehet). FAD-superoksidi-radikaalipari tunnistettu sensoriksi (Nature Comms 2024). Ei-monotoniset RPM-ennusteet vahvistettu planaariamatoissa (PNAS Nexus 2026). Engels 2014 (Nature): antropogeeninen EMF-kohina häiritsee magneettikompassia muuttolinnuissa — nykyiset ympäristötasot riittävät. Vuorotyödata validoi: vuorotyöntekijöillä vähemmän lapsia ja enemmän keskenmenoja.",
    lindgrenInterpretation:
      "CRY-kanava on VGIC:stä RIIPPUMATON polku ja teoreettisesti puhtaampi: 87,5 % RPM-Hamiltoniaanin elementeistä on johdettavissa Lindgrenin metriikka-ansatzista. Se ei kulje Ca²⁺:n kautta vaan suoraan kvanttibiologisen spin-kemiallisen mekanismin kautta. Lindgrenin kehyksessä RPM:n susceptibiliteetti χ_B on eri funktio kuin geometrinen χ(Ā) — se on ei-monotoninen ja kolmiregiiminen. VGCC-aktivaation suuruusluokan ongelma (δV_m ≈ 10⁻²¹ V ilman biologista vahvistusta) ei koske RPM-reittiä, koska 5 V/m kentässä magneettinen komponentti (~16,7 nT) ylittää Ritzin (2004) kokeellisen häiriökynnyksen (~15 nT).",
    recoveryAlpha: 0.7,
    recoveryTimescale: "viikkoja (vuorokausirytmin uudelleenkalibrointi)",
    bermComponent: "biology/cry.py",
    keyReferences: [],
  },
  {
    id: "pathway_c",
    level: 5,
    label: "Polku C: Melatoniini",
    sublabel: "Pineaali → vuorokausirytmi",
    epistemicLevel: "E",
    title: "Pineaalin melatoniinisuppressio",
    mechanism:
      "Pineaalirauhanen tuottaa melatoniinia joka säätelee vuorokausirytmiä ja GnRH-pulsaatiota. Pineaali on herkkä geomagneettiselle kentälle (Becker: melatoniinisekretio muuttuu geomagneettisen kentän vahvuisilla kentillä). EMF häiritsee pineaalin kalibraatiota → melatoniini↓ → uni↓ → GnRH-pulsaatio↓ → FSH/LH↓ → gonadifunktio↓. Burch 2002: matkapuhelinkäyttäjien melatoniinimetaboliitit matalammat. Leproult 2011: 1 viikko unirajoitusta → T −15%.",
    lindgrenInterpretation:
      "Pineaali on biologinen χ(Ā)-detektori. Se mittaa geomagneettisen taustan magnetiittikristallien kautta ja säätää melatoniinia sen mukaan. Ulkoinen EMF häiritsee tätä mittausta — pineaali saa virheellisen Ā-arvon → tuottaa virheellisen melatoniinivasteen. Korkeammilla leveysasteilla (korkeampi geomag-Ā) pineaali on herkempi häiriölle (χ(Ā) suurempi).",
    recoveryAlpha: 0.7,
    recoveryTimescale: "päiviä (melatoniinisyklin palautuminen)",
    bermComponent:
      "biology/cry.py (jaettu CRY-kanavan kanssa sirkadiaanikomponentin osalta)",
    keyReferences: [],
  },
  {
    id: "pathway_d",
    level: 5,
    label: "Polku D: HPA→HPG",
    sublabel: "Kortisoli → T↓, OT↓, DA↓",
    epistemicLevel: "E",
    title: "Stressiakselin ristikkäisinhibitio",
    mechanism:
      "EMF aktivoi HPA-akselin (hypotalamus-aivolisäke-lisämunuainen) → kortisoli nousee → HPG-akselin (hypotalamus-aivolisäke-gonadi) suppressio. Krooninen kortisoli laskee testosteronia, oksitosiinia ja dopamiinia. Guyn koe (Cross Currents): 25 kk mikroaaltoaltistus → kortisoli nousi → laski (Selyen uupuminen) → stressivasteen elinten syövät (3.6× kontrolli). Travison 2007: testosteroni −1%/vuosi 1980-luvulta.",
    lindgrenInterpretation:
      "HPA-aktivaatio on metrisen perturbointian systeeminen vaste. Hypotalamus on neuroendokriininen solmukohta jossa ionikanavadynamiikka ohjaa hormonaalista signalointia. EMF häiritsee GnRH-pulsaatiota (Schlegel: Ca²⁺-oskillaatiot aivolisäkkeessä) → koko HPG-akseli häiriintyy. Selyen kolmivaihedynamiikka on metrisessä kehyksessä: alarm = geometrinen perturbointia, resistance = uusi stationaarinen ratkaisu, exhaustion = stationaarisen ratkaisun romahdus.",
    recoveryAlpha: 0.5,
    recoveryTimescale: "viikkoja–kuukausia (HPA-akselin normalisoituminen)",
    bermComponent: "biology/hpa.py",
    keyReferences: [],
  },
  {
    id: "pathway_e",
    level: 5,
    label: "Polku E: BBB",
    sublabel: "eNOS↑ → permeabiliteetti↑",
    epistemicLevel: "E",
    title: "Veri-aivoesteen avautuminen",
    mechanism:
      "EMF lisää veri-aivoesteen (BBB) permeabiliteettia eNOS-aktivaation ja tight junction -proteiinien (occludin, claudin-5) vähenemisen kautta. Salford: SAR 0.012 W/kg (100× alle FCC-rajan) riitti avaamaan BBB:n rotilla. BBB:n avautuminen päästää endokriinihäiriöaineita, raskasmetalleja ja mikromuoveja aivoihin missä ne häiritsevät hypotalamuksen signalointia.",
    lindgrenInterpretation:
      "BBB on biologinen metrinen rajapinta: verisuonen endoteeli ja aivoparenkyyma ovat eri metrisiä alueita (eri ionikokoonpanot). Tight junction -proteiinit ylläpitävät metrisen diskontinuiteetin. EMF:n metriikkamuutos heikentää tätä rajapintaa → metriset alueet 'vuotavat' toisiinsa. Lindgrenin kehys selittää miksi pienet kentät riittävät: BBB on bifurkaatiokynnyksen lähellä — pieni metrinen perturbointia kääntää tight junction -proteiinien konformaation.",
    recoveryAlpha: 0.0,
    recoveryTimescale: "pysyvä (Salfordin rotilla neuronivauriot 50 pv jälkeen)",
    bermComponent: "biology/bbb.py",
    keyReferences: [],
  },
  {
    id: "pathway_f",
    level: 5,
    label: "Polku F: Vmem-koodi",
    sublabel: "Vmem-depolarisaatio → morfogeneesi",
    epistemicLevel: "L*",
    title: "Kalvopotentiaalin bioelektrinen koodi",
    mechanism:
      "Brownin ym. (2016) mukaan solun kalvopotentiaali (Vmem) toimii morfogeneettisen informaation kantajana. EMF-altistus depolarisoi kalvopotentiaalia → Vmem-gradientti häiriintyy → solujen proliferaatio- ja differentiaatiosignaalit muuttuvat. Levinin tutkimusryhmä (Tufts): bioelektrinen koodi ohjaa kudosten kehitystä ja regeneraatiota. Vmem-depolarisaatio → sammakoilla pään/hännän identiteetin kääntyminen.",
    lindgrenInterpretation:
      "Vmem on biologisen aika-avaruuden paikallinen metrinen signaali. Lindgrenin kehyksessä kalvopotentiaali on Ā — taustakenttä joka määrää paikallisen geometrian. EMF-perturbointia muuttaa tätä paikallista geometriaa → solujen 'koordinaatisto' häiriintyy → positio-informaatio vioittuu. Tämä on suorin yhteys geometrian ja biologian välillä.",
    keyReferences: [
      {
        authors: "Brown ym. 2016",
        title: "Vmem depolarization and bioelectric signaling",
        journal: "Bioelectrochemistry",
        keyFinding: "Vmem-depolarisaatio muuttaa solujen morfogeneettistä koodia",
      },
      {
        authors: "Levin 2014",
        title:
          "Molecular bioelectricity: how endogenous voltage potentials control cell behavior",
        journal: "Molecular Biology of the Cell 25(24)",
        keyFinding:
          "Bioelektrinen koodi ohjaa kudosten morfogeneesiä ja regeneraatiota",
      },
    ],
    falsificationCondition:
      "Jos Vmem-muutokset eivät korreloi morfogeneettisten virheiden kanssa EMF-altistuksessa",
  },

  // TASO 6
  {
    id: "sdf",
    level: 6,
    label: "DNA-fragmentaatio (SDF)",
    sublabel: "ROS → DNA-katko",
    epistemicLevel: "E",
    title: "Siittiön DNA-vaurio",
    mechanism:
      "ROS tuottaa yksi- ja kaksijuosteisia DNA-katkoja siittiöissä. Houston 2019: DNA-vaurio SÄILYY vaikka ROS palautuu 5 viikossa. Czerski 1979: kromosomivaurioita koko turvaraja-alueen läpi. SDF on kumulatiivinen ja osittain palautumaton.",
    recoveryAlpha: 0.2,
    recoveryTimescale:
      "kuukausia (uusi spermatogeneesisykli 74 pv, mutta kantasoluvaurio voi säilyä)",
    keyReferences: [],
  },
  {
    id: "motility",
    level: 6,
    label: "Motiliteetti ↓",
    sublabel: "−8.1% (Yu 2021)",
    epistemicLevel: "E",
    title: "Siittiöiden liikkuvuuden heikkeneminen",
    mechanism:
      "ROS ja SDF heikentävät siittiöiden progressiivista motiliteettia. Yu 2021 (IVF-laboratorio): motiliteetti −8.1% tunnin EMF-altistuksen jälkeen. Adeen kirja: Ca²⁺-kanava on siittiön navigoinnin avain — ilman sitä siittiö 'wriggles ineptly and goes nowhere.'",
    keyReferences: [],
  },
  {
    id: "concentration",
    level: 6,
    label: "Konsentraatio ↓",
    sublabel: "−51% (1973–2018)",
    epistemicLevel: "E",
    title: "Siittiökonsentraation sekulaarilasku",
    mechanism:
      "Levine 2023: siittiökonsentraatio laskenut 51% vuodesta 1973. Lasku kiihtynyt 2000-luvulla. Leydigin solujen kumulatiivinen vaurio (ROS + epigeneettinen) → testosteronituotanto↓ → spermatogeneesi↓ → konsentraatio↓.",
    recoveryAlpha: 0.3,
    recoveryTimescale:
      "kuukausia–vuosia (Leydigin solujen osittainen palautuminen)",
    keyReferences: [],
  },
  {
    id: "ovulation",
    level: 6,
    label: "Ovulaation ajoitus ↓",
    sublabel: "CRY + VGIC → ajoitusvirhe",
    epistemicLevel: "M|C",
    title: "Ovulaation bioelektrisen ajoituksen häiriö",
    mechanism:
      "Ovulaatio on bioelektrinen tapahtuma (Burr 1937: jännitegradientin nousu ovulaation hetkellä). CRY-häiriö muuttaa kellogeenien ekspressiota gonadikudoksessa → ovulaation ajoitus siirtyy. Samanaikaisesti VGIC-häiriö häiritsee ionikanavakoordinaatiota jota ovulaatio vaatii (kloridi-ionien konsentraatiopiikki). EMF → aromataasin häiriö → estrogeenisynteesi↓ → follikulaarinen kehitys↓.",
    keyReferences: [],
  },
  {
    id: "implantation",
    level: 6,
    label: "Implantaatio ↓",
    sublabel: "Mikrobiomi + bioelektrinen",
    epistemicLevel: "C",
    title: "Implantaation heikkeneminen",
    mechanism:
      "Reproductive tract -mikrobiomi (vaginal Lactobacillus-dominanssi, endometrial microbiota) vaikuttaa implantaatioon. EMF → suoliston ja reproduktiokanavan mikrobiomihäiriö (polku E via dysbiosis) → tulehdus → endometriumin reseptiivisyys↓. Bioelektrinen koodi (Levin) ohjaa implantaatioikkunaa — EMF häiritsee tätä.",
    keyReferences: [],
  },
  {
    id: "sexratio",
    level: 6,
    label: "Sukupuolisuhde Δ",
    sublabel: "X-siittiö herkempi",
    epistemicLevel: "E",
    title: "Sukupuolisuhteen siirtymä",
    mechanism:
      "X-kromosomin kantavat siittiöt ovat suurempia ja hitaampia kuin Y-kantavat. Ca²⁺-kanavahäiriö vaikuttaa enemmän isompaan X-siittiöön → Y-siittiöt pääsevät suhteessa useammin perille → poikia enemmän. Quebec Hydro (Becker 1985): 6:1 poika/tyttö-suhde sähkötyöntekijöiden lapsilla. Norjan laivaston data (Magerøy 2006): lineaarinen trendi.",
    lindgrenInterpretation:
      "X- ja Y-siittiöt ovat partikkeleita eri massoilla samassa metrisessä kentässä. Niiden geodeeseejä (liikeatoja) metrinen perturbointia muuttaa eri verran koska vuorovaikutuspoikkipinta on eri. cos(θ)-riippuvuus ennustaa lisäksi, että vaikutus riippuu EMF:n suunnasta suhteessa reproduktiokanavaan.",
    keyReferences: [],
  },
  {
    id: "testosterone",
    level: 6,
    label: "Testosteroni ↓ sekulaari",
    sublabel: "−1%/vuosi (Travison 2007)",
    epistemicLevel: "E",
    title: "Testosteronin sekulaarilasku",
    mechanism:
      "Travison 2007: miesten testosteronitasot laskevat −1%/vuosi ikävakioituna. Lasku ei selity painonnousulla, tupakoinnin vähenemisellä tai muilla tunnetuilla tekijöillä. HPA-akselin krooninen aktivaatio (polku D) → kortisoli↑ → HPG-akselin suppressio → testosteronituotanto↓. Leydigin solujen kumulatiivinen ROS-vaurio (polku A) heikentää steroidogeneesiä.",
    recoveryAlpha: 0.5,
    recoveryTimescale: "kuukausia (HPA-normalisoituminen) – vuosia (Leydig-palautuminen)",
    keyReferences: [
      {
        authors: "Travison ym. 2007",
        title: "A population-level decline in serum testosterone levels in American men",
        journal: "J. Clin. Endocrinol. Metab. 92(1)",
        keyFinding: "Ikävakioitu testosteroni laskee −1%/vuosi 1980-luvulta",
      },
    ],
  },
  {
    id: "amh",
    level: 6,
    label: "AMH / munasolureservi ↓",
    sublabel: "AFC↓, reservi ehtyyy aikaisemmin",
    epistemicLevel: "C",
    title: "Munasolureservin ennenaikainen ehtyminen",
    mechanism:
      "Anti-Müllerian hormoni (AMH) on primaaristen follikkelien markkeri. AMH-tasot ovat laskeneet sekulaarisesti: nykynaisten AMH vastaa edellisten sukupolvien 5–10 vuotta vanhempien naisten tasoa. ROS-vaurio (polku A) vaurioittaa primordiaalisia follikkeleita. CRY-häiriö (polku B) kiihdyttää follikulaarista rekrytointia → reservi ehtyyy nopeammin. mTOR-hyperaktivaatio kiihdyttää follikulaarista loppuunpalamista.",
    keyReferences: [
      {
        authors: "Kelsey ym. 2012",
        title: "A validated age-related model of total count of non-growing follicles",
        journal: "PLoS ONE 7(10)",
        keyFinding: "Munasolujen lukumäärämallit ja reservin ehtymisdynamiikka",
      },
    ],
  },
  {
    id: "mtor",
    level: 6,
    label: "mTOR-hyperaktivaatio",
    sublabel: "Ca²⁺ → mTOR↑ → autofagia↓",
    epistemicLevel: "M|C",
    title: "mTOR-reitin ylisäätely EMF-altistuksessa",
    mechanism:
      "VGIC-aktivaation tuottama Ca²⁺-influksi aktivoi mTOR-reitin (mammalian target of rapamycin). mTOR-hyperaktivaatio → autofagian suppressio → seneskenttien solujen kertyminen → krooninen tulehdus. Sempou-reitti: EMF → VGIC → Ca²⁺↑ → mTOR↑ → kolme epidemiaa: kiihtynyt ikääntyminen, hedelmällisyyden lasku, syöpäriskin kasvu.",
    lindgrenInterpretation:
      "mTOR on solunsisäinen integraattori joka yhdistää useita metrisestä perturbointiasta syntyviä signaaleja yhdeksi soluvasteeksi. Geometrinen perturbointia → Ca²⁺-dynamiikan muutos → mTOR-tasapainon siirtymä. Metformiinin pitkäikäisyyshyöty on geometrisessa kehyksessä anti-perturbointia: AMPK-aktivaatio kumoaa mTOR-hyperaktivaatiota.",
    quantitative:
      "mTOR_eff = (1.0 + 0.25 × EMF) × Π(1 − reduction_i)\naging_rate = mTOR_eff^0.7\n\nReduction factors:\nMetformiini: 0.30\nRapamysiini: 0.85\nKalorinrajoitus: 0.20\nAjoittainen paasto: 0.10",
    bermComponent: "biology/mtor.py",
    keyReferences: [
      {
        authors: "Saxton & Sabatini 2017",
        title: "mTOR Signaling in Growth, Metabolism, and Disease",
        journal: "Cell 168(6)",
        keyFinding: "mTOR integroi ravinteet, energian ja kasvutekijät solun kasvuun",
      },
    ],
    falsificationCondition:
      "Jos mTOR-inhibiittorit (rapamysiini) eivät vähennä EMF:n biologisia vaikutuksia",
  },
  {
    id: "sleep",
    level: 6,
    label: "Unihäiriö",
    sublabel: "Melatoniini↓ → uni↓ → GnRH↓",
    epistemicLevel: "E",
    title: "Unen laadun heikkeneminen ja hormonaaliset seuraukset",
    mechanism:
      "Melatoniinisuppressio (polku C) → unisyklin häiriö → syvän unen väheneminen. Syvä uni on kriittinen GnRH-pulsaation ja kasvuhormonin erityksen kannalta. Leproult & Van Cauter 2011: 1 viikko unirajoitusta (5h/yö) → testosteroni −15%. Nuorten aikuisten unen kesto on lyhentynyt ~1h/yö 1970-luvulta. Älypuhelimen sininen valo → melatoniinisuppressio → viivästynyt unilatenssi.",
    keyReferences: [
      {
        authors: "Leproult & Van Cauter 2011",
        title: "Effect of 1 week of sleep restriction on testosterone levels",
        journal: "JAMA 305(21)",
        keyFinding: "5h unirajoitus → T −15%, efekti vastaa 10–15 vuoden ikääntymistä",
      },
    ],
  },
  {
    id: "miscarriage",
    level: 6,
    label: "Keskenmeno ↑",
    sublabel: "SDF + implantaatio → varhainen menetys",
    epistemicLevel: "C",
    title: "Keskenmenoriskin kasvu",
    mechanism:
      "Kohonnut SDF (DNA-fragmentaatio) siittiöissä → hedelmöitys voi tapahtua mutta embryon kehitys häiriintyy varhaisessa vaiheessa. Heikentynyt implantaatio (endometriumin reseptiivisyys↓, mikrobiomihäiriö) → biokemiallisten raskauksien menetys. Kliinisesti tunnistettujen keskenmenojen osuus on kasvanut. Varhaiset (pre-kliiniset) menetykset jäävät usein havaitsematta.",
    keyReferences: [],
  },
  {
    id: "epigenetic",
    level: 6,
    label: "Epigeneettinen periytyminen",
    sublabel: "Sperm methylome → F1, F2",
    epistemicLevel: "C",
    title: "Sukupolvien välinen epigeneettinen välittyminen",
    mechanism:
      "ROS-vaurio (polku A) muuttaa siittiöiden metylaatioprofiilia. Muuttuneet epigeneettiset merkit periytyvät F1- ja F2-sukupolviin. Hiiritutkimuksissa: isien ympäristöaltistus muuttaa jälkeläisten lisääntymiskykyä. EMF-altistuksen epigeneettiset vaikutukset kumuloituvat sukupolvien yli — jokainen sukupolvi altistuu enemmän JA perii edellisen sukupolven epigeneettiset vauriot.",
    lindgrenInterpretation:
      "Epigeneettinen periytyminen on metrisen historian biologinen tallenne. Solujen metriikka (Vmem, ionidynamiikka) ohjaa geeniekspressiota epigeneettisesti. Muuttunut metriikka → muuttunut epigeneettinen tila → muuttunut perusta seuraavan sukupolven metriikalle. Tämä on geometrinen positiivinen palautesilmukka biologisella aikaskaalalla.",
    recoveryAlpha: 0.1,
    recoveryTimescale: "sukupolvia (3–5 sukupolvea täydelliseen palautumiseen)",
    keyReferences: [
      {
        authors: "Skinner ym. 2019",
        title: "Transgenerational epigenetic inheritance",
        journal: "Nature Reviews Endocrinology",
        keyFinding: "Ympäristöaltistukset periytyvät 3+ sukupolven yli epigeneettisesti",
      },
    ],
  },

  // TASO 7
  {
    id: "fecundability_bio",
    level: 7,
    label: "Biologinen fekunditeetti",
    sublabel: "F_bio = sperm × oocyte × tract",
    epistemicLevel: "E",
    title: "Biologinen hedelmöityskyky",
    mechanism:
      "Kaikkien biologisten polkujen konvergenssi: siittiölaatu (motiliteetti, konsentraatio, SDF) × munasolun laatu (AMH, AFC, ovulaation ajoitus) × reproduktiokanavan eheys (mikrobiomi, implantaatioikkuna). TTP (time-to-pregnancy) on suorin mittari.",
    keyReferences: [],
  },
  {
    id: "motivation",
    level: 7,
    label: "Lisääntymismotivaatio",
    sublabel: "M = f(T, OT, DA, kortisoli)",
    epistemicLevel: "E",
    title: "Endokriinipohjainen lisääntymismotivaatio",
    mechanism:
      "Testosteroni (seksuaalinen motivaatio), oksitosiini (kiintymys/pariside), dopamiini (palkkio/tavoittelu), kortisoli (stressieste). Kaikki neljä muuttuvat EMF-altistuksessa samanaikaisesti: T↓ (Travison), OT↓ (L. reuteri -kadon kautta), DA↓ (striataaliset muutokset), kortisoli↑ (HPA-aktivaatio). Multiplikatiivinen lukko: F_bio × M_repro — jos kumpikaan on nolla, syntymähazardi on nolla.",
    lindgrenInterpretation:
      "Motivaatiokerros on bioelektrisen tilan systeeminen seuraus. Hypothalamus-aivolisäke-gonadi -akseli on ionikanavadynamiikan säätelemä ketju. EMF muuttaa geometriaa → ionidynamiikka muuttuu → hormonitasot muuttuvat → käyttäytyminen muuttuu. Calhounin Universe 25 'Beautiful Ones' -ilmiö (vetäytyminen lisääntymisestä) on tämän ääriesimerkki.",
    keyReferences: [],
  },
  {
    id: "art",
    level: 7,
    label: "Avustettu lisääntyminen",
    sublabel: "IVF/ICSI → osittainen kompensaatio",
    epistemicLevel: "E",
    title: "Avustetun lisääntymisen kompensaatiovaikutus",
    mechanism:
      "IVF ja ICSI ohittavat osan biologisen fekundabiliteetin esteistä: motiliteetti↓ ja konsentraatio↓ eivät estä ICSI:tä, ovariaalistimulaatio kompensoi osittain AMH↓:ää. Kuitenkin ART ei korjaa: SDF:ää (DNA-vaurio siirtyy embryoon), epigeneettisiä muutoksia, implantaation bioelektristä koodia. ART:n osuus synnytyksistä: Israel 5%, Tanska 10%. ART-riippuvuus kasvaa kun luonnollinen fekundabiliteetti laskee.",
    keyReferences: [],
  },

  // TASO 8
  {
    id: "fecundability",
    level: 8,
    label: "Fekundabiliteettiaste",
    sublabel: "F_bio × M_repro",
    epistemicLevel: "E",
    title: "Todennäköisyys hedelmöitykselle per sykli",
    mechanism:
      "Fekundabiliteettiaste = biologinen fekunditeetti × motivaatio × yritystodennäköisyys. TTP (time-to-pregnancy) = 1/fekundabiliteettiaste. PRESTO-kohortti mittaa tätä prospektiivisesti.",
    keyReferences: [],
  },
  {
    id: "asfr",
    level: 8,
    label: "ASFR(ikä)",
    sublabel: "Ikäkohtainen hedelmällisyys",
    epistemicLevel: "E",
    title: "Ikäkohtainen hedelmällisyysluku",
    mechanism:
      "ASFR = fekundabiliteettiaste × yritystodennäköisyys(ikä) × (1 − keskenmenoriski(ikä)). Eri ikäryhmät altistuvat eri kumulatiiviselle EMF:lle (kohortti-ikävaikutus). 15–19-vuotiaat: koko elämä EMF:ssä syntyneet. 35–39-vuotiaat: lapsuus ennen mobiilivallankumousta.",
    keyReferences: [],
  },
  {
    id: "tfr",
    level: 8,
    label: "TFR",
    sublabel: "Kokonaishedelmällisyysluku",
    epistemicLevel: "E",
    title: "Kokonaishedelmällisyysluku",
    mechanism:
      "TFR = 5 × Σ ASFR(ikäryhmä). Globaali TFR: 4.84 (1950) → 2.23 (2021). GBD 2024 ennuste: alle 2.1 (korvautumistaso) lähes kaikissa maissa 2050 mennessä. Etelä-Korea: 0.72 (2023). Pronatalistiset interventiot ($200+ miljardia globaalisti) eivät ole kääntäneet trendiä yhdessäkään maassa pysyvästi.",
    keyReferences: [],
  },
  {
    id: "childlessness",
    level: 8,
    label: "Tahdoton lapsettomuus ↑",
    sublabel: "12–24 kk yrittämisen jälkeen",
    epistemicLevel: "E",
    title: "Tahdottoman lapsettomuuden yleistyminen",
    mechanism:
      "WHO: 1/6 parista kärsii hedelmättömyydestä maailmanlaajuisesti. Trendi on kasvava. TTP (time-to-pregnancy) pitenee → yhä useampi pari ei koskaan saavuta raskautta luonnollisesti. Biologinen kello on muuttumaton mutta biologinen ikä etenee nopeammin: 30-vuotiaan naisen munasolureservi vastaa edellisten sukupolvien 35-vuotiaan tasoa.",
    keyReferences: [
      {
        authors: "WHO 2023",
        title: "Infertility prevalence estimates",
        journal: "WHO",
        keyFinding:
          "1 kuudesta parista: hedelmättömyys on globaali kansanterveyshaaste",
      },
    ],
  },

  // TASO 9
  {
    id: "feedback",
    level: 9,
    label: "Takaisinkytkentä",
    sublabel: "TFR↓ → urbanisaatio↑ → EMF↑",
    epistemicLevel: "M|C",
    title: "Positiivinen palautesilmukka",
    mechanism:
      "TFR:n lasku → pienemmät perheet → muutto kaupunkiin (koulu, työ) → kaupungistuminen↑ → tukiasematiheys↑ → ambient-EMF↑ → lisää altistusta → TFR↓ edelleen. Tämä on itsevahvistuva kierre jota on vaikea katkaista koska jokainen kierros vahvistaa seuraavaa.",
    lindgrenInterpretation:
      "Metrinen takaisinkytkentä: biologinen vaste (TFR↓) muuttaa ympäristöä (kaupungistuminen) joka muuttaa metriikkaa (ambient-Ā↑) joka vahvistaa biologista vastetta. Tämä on geometrinen positiivinen palautesilmukka — harvinainen mutta ei ennennäkemätön fysiikassa (gravitaatioaaltojen itsevuorovaikutus yleisessä suhteellisuusteoriassa).",
    keyReferences: [],
  },
  {
    id: "urbanization",
    level: 9,
    label: "Kaupungistuminen",
    sublabel: "TFR↓ → muutto kaupunkiin",
    epistemicLevel: "E",
    title: "Kaupungistuminen takaisinkytkentänä",
    mechanism:
      "TFR:n lasku → pienemmät perheet → muutto kaupunkiin (koulu, työ, palvelut). Globaali kaupungistumisaste: 56% (2020) → 68% ennuste (2050). Kaupungissa tukiasematiheys on 10–100× maaseudun. Wi-Fi-verkkojen tiheys kaksinkertaistuu alle 2 vuodessa kaupungeissa. Jokainen uusi asukas lisää ambient-EMF-tarvetta.",
    keyReferences: [
      {
        authors: "UN DESA 2019",
        title: "World Urbanization Prospects",
        journal: "United Nations",
        keyFinding:
          "68% maailman väestöstä asuu kaupungeissa vuonna 2050",
      },
    ],
  },
  {
    id: "device_adoption",
    level: 9,
    label: "Laiteadoptio ↑",
    sublabel: "5G, IoT, puettavat laitteet",
    epistemicLevel: "E",
    title: "Uusien laitetyyppien käyttöönotto",
    mechanism:
      "Älypuhelinpenetraatio kasvaa edelleen (2024: 6.9 miljardia). Uudet laitetyypit: AirPods (2016→), älykellot, VR-lasit, IoT-sensorit. 5G:n mm-aaltoalueet vaativat tiheämpää tukiasemaverkkoa (small cells). Starlink ja muut satelliittiverkot laajentavat kattavuuden alueille joilla ei aiemmin ollut ambient-EMF:ää. Teknologinen takaisinkytkentä: laitteiden kysyntä → infrastruktuuri → ambient-EMF↑.",
    keyReferences: [
      {
        authors: "GSMA Intelligence 2024",
        title: "Mobile Economy 2024",
        journal: "GSMA",
        keyFinding:
          "6.9 miljardia matkapuhelinliittymää, 5G-käyttäjät 1.9 miljardia",
      },
    ],
  },
];

export const EDGES: ChainEdge[] = [
  // Taso 1→2
  {
    from: "geometry",
    to: "chi",
    label: "geometrinen seuraus",
    epistemicLevel: "M",
    priority: "primary",
  },
  // Taso 2→3
  {
    from: "chi",
    to: "two_channel",
    label: "kytkentäfunktio",
    epistemicLevel: "M",
    priority: "primary",
  },
  {
    from: "ambient",
    to: "two_channel",
    label: "Ā (tausta)",
    epistemicLevel: "E",
    priority: "primary",
  },
  {
    from: "personal",
    to: "two_channel",
    label: "a (perturbointia)",
    epistemicLevel: "E",
    priority: "primary",
  },
  // Taso 3→4
  {
    from: "two_channel",
    to: "membrane",
    label: "EMF saavuttaa solun",
    epistemicLevel: "E",
    priority: "primary",
  },
  {
    from: "membrane",
    to: "vgic",
    label: "kentänmuutos kalvolla",
    epistemicLevel: "E",
    priority: "primary",
  },
  // Taso 3→4 (GME)
  {
    from: "two_channel",
    to: "gme",
    label: "RF-verhokäyrä",
    epistemicLevel: "L*",
  },
  // Taso 4→5
  {
    from: "vgic",
    to: "pathway_a",
    label: "Ca²⁺ influx",
    derivative: "∂ROS/∂Ca²⁺ > 0",
    epistemicLevel: "E",
    priority: "primary",
  },
  {
    from: "two_channel",
    to: "pathway_b",
    label: "RF → spin-kemia",
    derivative: "∂CRY/∂B_RF ≠ 0",
    epistemicLevel: "E",
    priority: "primary",
  },
  {
    from: "gme",
    to: "pathway_b",
    label: "GME → R42",
    epistemicLevel: "L*",
  },
  {
    from: "two_channel",
    to: "pathway_c",
    label: "EMF → pineaali",
    epistemicLevel: "E",
  },
  {
    from: "vgic",
    to: "pathway_d",
    label: "Ca²⁺ → HPA",
    epistemicLevel: "E",
    priority: "primary",
  },
  {
    from: "vgic",
    to: "pathway_e",
    label: "Ca²⁺ → eNOS",
    epistemicLevel: "E",
  },
  // Taso 5→6
  {
    from: "pathway_a",
    to: "sdf",
    label: "ROS → DNA-katko",
    epistemicLevel: "E",
    priority: "primary",
  },
  {
    from: "sdf",
    to: "motility",
    label: "SDF → motiliteetti↓",
    epistemicLevel: "E",
  },
  {
    from: "pathway_a",
    to: "concentration",
    label: "ROS → Leydig-vaurio",
    epistemicLevel: "E",
  },
  {
    from: "pathway_b",
    to: "ovulation",
    label: "kellogeenihäiriö",
    epistemicLevel: "E",
  },
  {
    from: "pathway_a",
    to: "ovulation",
    label: "aromataasin häiriö",
    epistemicLevel: "M|C",
  },
  {
    from: "pathway_a",
    to: "sexratio",
    label: "X>Y herkkyys",
    epistemicLevel: "E",
  },
  {
    from: "pathway_e",
    to: "implantation",
    label: "kemikaalikuorma",
    epistemicLevel: "E",
  },
  // Taso 6→7
  { from: "motility", to: "fecundability_bio", epistemicLevel: "E", priority: "primary" },
  { from: "concentration", to: "fecundability_bio", epistemicLevel: "E", priority: "primary" },
  { from: "ovulation", to: "fecundability_bio", epistemicLevel: "M|C" },
  { from: "implantation", to: "fecundability_bio", epistemicLevel: "C" },
  {
    from: "pathway_d",
    to: "motivation",
    label: "T↓, OT↓, DA↓",
    epistemicLevel: "E",
    priority: "primary",
  },
  {
    from: "pathway_c",
    to: "motivation",
    label: "melatoniini → GnRH↓",
    epistemicLevel: "E",
  },
  // Taso 7→8
  {
    from: "fecundability_bio",
    to: "fecundability",
    label: "F_bio",
    epistemicLevel: "E",
    priority: "primary",
  },
  {
    from: "motivation",
    to: "fecundability",
    label: "M_repro",
    epistemicLevel: "E",
    priority: "primary",
  },
  { from: "fecundability", to: "asfr", epistemicLevel: "E", priority: "primary" },
  {
    from: "asfr",
    to: "tfr",
    label: "Σ ikäryhmät",
    epistemicLevel: "E",
    priority: "primary",
  },
  {
    from: "sexratio",
    to: "tfr",
    label: "itsenäinen kanava",
    epistemicLevel: "E",
  },
  // Taso 8→9
  {
    from: "tfr",
    to: "feedback",
    label: "TFR↓ → urbanisaatio↑",
    epistemicLevel: "M|C",
    priority: "primary",
  },
  // Taso 4→5 (uudet)
  {
    from: "vgic",
    to: "pathway_f",
    label: "Ca²⁺/Vmem",
    epistemicLevel: "L*",
  },
  // Taso 5→6 (uudet)
  {
    from: "pathway_d",
    to: "testosterone",
    label: "HPG-suppressio",
    epistemicLevel: "E",
  },
  {
    from: "pathway_a",
    to: "amh",
    label: "ROS → follikkeli",
    epistemicLevel: "C",
  },
  {
    from: "vgic",
    to: "mtor",
    label: "Ca²⁺ → mTOR",
    epistemicLevel: "M|C",
  },
  {
    from: "mtor",
    to: "amh",
    label: "follikulaarinen burnout",
    epistemicLevel: "M|C",
  },
  {
    from: "pathway_c",
    to: "sleep",
    label: "melatoniini↓",
    epistemicLevel: "E",
  },
  {
    from: "sdf",
    to: "miscarriage",
    label: "DNA-vaurio",
    epistemicLevel: "C",
  },
  {
    from: "pathway_a",
    to: "epigenetic",
    label: "ROS → metylaatio",
    epistemicLevel: "C",
  },
  {
    from: "pathway_f",
    to: "implantation",
    label: "bioelektrinen koodi",
    epistemicLevel: "L*",
  },
  // Taso 6→7 (uudet)
  {
    from: "testosterone",
    to: "motivation",
    label: "T↓",
    epistemicLevel: "E",
  },
  {
    from: "sleep",
    to: "motivation",
    label: "uni↓ → hormonit↓",
    epistemicLevel: "E",
  },
  { from: "amh", to: "fecundability_bio", epistemicLevel: "C" },
  {
    from: "epigenetic",
    to: "fecundability_bio",
    label: "transgenerationaalinen",
    epistemicLevel: "C",
  },
  {
    from: "fecundability_bio",
    to: "art",
    label: "biologinen lasku → ART",
    epistemicLevel: "E",
  },
  // Taso 7→8 (uudet)
  {
    from: "art",
    to: "fecundability",
    label: "osittainen kompensaatio",
    epistemicLevel: "E",
  },
  {
    from: "miscarriage",
    to: "asfr",
    label: "raskausmenetys",
    epistemicLevel: "C",
  },
  {
    from: "fecundability",
    to: "childlessness",
    label: "matala p(raskaus)",
    epistemicLevel: "E",
  },
  // Taso 9 (uudet — takaisinkytkentä tarkennettu)
  {
    from: "feedback",
    to: "urbanization",
    epistemicLevel: "M|C",
  },
  {
    from: "urbanization",
    to: "device_adoption",
    label: "tiheys → laitteet",
    epistemicLevel: "E",
  },
  {
    from: "device_adoption",
    to: "ambient",
    label: "infra → ambient↑",
    epistemicLevel: "E",
  },
];
