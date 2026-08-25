import type { ChainNode, ChainEdge } from "./types";
export { CHAIN_EPISTEMIC_COLORS as EPISTEMIC_COLORS, CHAIN_EPISTEMIC_LABELS as EPISTEMIC_LABELS, getChainEpistemicLabel } from "./epistemicConstants";

export const LEVEL_TITLES_EN: Record<number, string> = {
  1: "Geometry",
  2: "Selection rule",
  3: "Exposure",
  4: "Four channels",
  5: "Membrane physics",
  6: "Pathways",
  7: "Cascade",
  8: "Convergence",
  9: "Demographic cascade",
  10: "Feedback",
};

export const LEVEL_TITLES_FI: Record<number, string> = {
  1: "Geometria",
  2: "Valintasääntö",
  3: "Altistus",
  4: "Neljä kanavaa",
  5: "Kalvofysiikka",
  6: "Polut",
  7: "Kaskadi",
  8: "Konvergenssi",
  9: "Demografinen kaskadi",
  10: "Takaisinkytkentä",
};

/** @deprecated Use LEVEL_TITLES_FI or _EN */
export const LEVEL_TITLES = LEVEL_TITLES_FI;

export function getLevelTitle(level: number, locale: string): string {
  const titles = locale === "fi" ? LEVEL_TITLES_FI : LEVEL_TITLES_EN;
  return titles[level] ?? `Level ${level}`;
}

export const NODES: ChainNode[] = [
  // TASO 1
  {
    id: "geometry",
    level: 1,
    label: "Lindgrenin geometria",
    label_en: "Lindgren geometry",
    sublabel: "gμν = ημν + AμAν",
    epistemicLevel: "L",
    title: "Sähkömagnetismi aika-avaruuden geometriana",
    title_en: "Electromagnetism as spacetime geometry",
    mechanism:
      "Lindgrenin, Kovacsin ja Liukkosen (2025) kehyksessä sähkömagneettinen potentiaali Aμ ei ole erillinen kenttä aika-avaruudessa vaan osa aika-avaruuden metrisen tensorin rakennetta. Metriikka gμν = ημν + AμAν tarkoittaa, että sähkömagneettinen kenttä kirjaimellisesti muuttaa geometriaa jossa kaikki partikkelit liikkuvat ja kaikki fysikaaliset prosessit tapahtuvat.",
    mechanism_en:
      "In the framework of Lindgren, Kovacs, and Liukkonen (2025), the electromagnetic potential Aμ is not a separate field in spacetime but part of the structure of the spacetime metric tensor. The metric gμν = ημν + AμAν means that the electromagnetic field literally alters the geometry in which all particles move and all physical processes take place.",
    lindgrenInterpretation:
      "Tämä on koko mallin perusta. Jos metriikka on oikea, biologiset järjestelmät — jotka ovat ionien, varausten ja potentiaalien järjestelmiä — elävät geometriassa joka muuttuu ulkoisten sähkömagneettisten kenttien mukana. Vaikutus ei ole valinnainen vaan geometrinen välttämättömyys.",
    lindgrenInterpretation_en:
      "This is the foundation of the entire model. If the metric is correct, biological systems — which are systems of ions, charges, and potentials — live in a geometry that changes along with external electromagnetic fields. The effect is not optional but a geometric necessity.",
    quantitative:
      "gμν = ημν + Aμ Aν\n\nημν = Minkowskin metriikka (litteä aika-avaruus)\nAμ = sähkömagneettinen 4-potentiaali\nAμ Aν = neliöllinen korjaustermi",
    quantitative_en:
      "gμν = ημν + Aμ Aν\n\nημν = Minkowski metric (flat spacetime)\nAμ = electromagnetic 4-potential\nAμ Aν = quadratic correction term",
    keyReferences: [
      {
        authors: "Lindgren, Kovacs & Liukkonen 2025",
        title: "Electromagnetism as a purely geometric theory",
        journal: "J. Phys.: Conf. Ser. 2987, 012001",
        keyFinding:
          "Maxwellin yhtälöt seuraavat geometriasta ilman erillistä EM-kenttää",
        keyFinding_en:
          "Maxwell's equations follow from geometry without a separate EM field",
      },
      {
        authors: "Vassallo ym. 2025",
        title: "Independent Scientific Validation of Lindgren et al.",
        journal: "Demokritos Scientific Journal",
        keyFinding: "Riippumaton validaatio Lindgrenin johdolle",
        keyFinding_en: "Independent validation of Lindgren's derivation",
      },
    ],
    falsificationCondition:
      "Jos Lindgrenin metriikka on matemaattisesti virheellinen tai kokeellisesti yhteensopimaton tunnetun fysiikan kanssa",
    falsificationCondition_en:
      "If Lindgren's metric is mathematically invalid or experimentally incompatible with established physics",
  },

  // TASO 2
  {
    id: "chi",
    level: 2,
    label: "Valintasääntö χ(Ā)",
    label_en: "Selection rule χ(Ā)",
    sublabel: "Ā / √(1 + Ā²)",
    epistemicLevel: "M",
    title: "Taustariippuvainen herkkyys",
    title_en: "Background-dependent sensitivity",
    mechanism:
      "Geometriasta seuraa, että biologisen systeemin herkkyys ulkoiselle EMF-perturbointille riippuu taustakentän voimakkuudesta. Funktiossa χ(Ā) = Ā/√(1+Ā²) arvolla Ā=0 (ei taustaa) herkkyys on nolla — lineaarista vastetta ei ole. Kun Ā kasvaa, χ lähestyy 1:tä — herkkyys saturoituu. Solun kalvopotentiaali (−70 mV, 10 nm yli) tuottaa Ā ≈ 7×10⁶ V/m → χ ≈ 1.0. Solut ovat maksimaalisesti herkkiä.",
    mechanism_en:
      "It follows from the geometry that a biological system's sensitivity to external EMF perturbation depends on the strength of the background field. In the function χ(Ā) = Ā/√(1+Ā²), at Ā=0 (no background) sensitivity is zero — there is no linear response. As Ā increases, χ approaches 1 — sensitivity saturates. The cell membrane potential (−70 mV across 10 nm) produces Ā ≈ 7×10⁶ V/m → χ ≈ 1.0. Cells are maximally sensitive.",
    lindgrenInterpretation:
      "Tämä on geometrian suora seuraus: litteässä tyhjässä taustassa perturbointia ei muuta geodeesejä ensimmäisessä kertaluvussa. Tausta rikkoo symmetrian ja mahdollistaa lineaarisen vasteen. Biologian suuri taustapotentiaali (kalvopotentiaali) tekee soluista erityisen herkkiä.",
    lindgrenInterpretation_en:
      "This is a direct consequence of the geometry: in a flat, empty background, the perturbation does not change the geodesics at first order. The background breaks the symmetry and enables a linear response. Biology's large background potential (the membrane potential) makes cells especially sensitive.",
    quantitative:
      "χ(Ā) = Ā / √(1 + Ā²)\n\nĀ = 0 → χ = 0 (ei lineaarista vastetta)\nĀ = 1 → χ = 0.71\nĀ → ∞ → χ → 1.0 (saturaatio)\n\nSolun kalvo: Ā ≈ 7×10⁶ → χ ≈ 1.0",
    quantitative_en:
      "χ(Ā) = Ā / √(1 + Ā²)\n\nĀ = 0 → χ = 0 (no linear response)\nĀ = 1 → χ = 0.71\nĀ → ∞ → χ → 1.0 (saturation)\n\nCell membrane: Ā ≈ 7×10⁶ → χ ≈ 1.0",
    keyReferences: [
      {
        authors: "Lindgren ym. 2025",
        title: "Electromagnetism as a purely geometric theory",
        journal: "J. Phys.: Conf. Ser. 2987",
        keyFinding: "Tyhjän taustan kieltosääntö: δg(1) = 0 kun Ā = 0",
        keyFinding_en:
          "Empty-background prohibition rule: δg(1) = 0 when Ā = 0",
      },
    ],
    falsificationCondition:
      "Jos lineaarinen biologinen vaste havaitaan ilman taustakenttää (Ā = 0)",
    falsificationCondition_en:
      "If a linear biological response is observed without a background field (Ā = 0)",
  },

  // TASO 3
  {
    id: "ambient",
    level: 3,
    label: "Ambient-EMF",
    label_en: "Ambient EMF",
    sublabel: "Tukiasemat + Wi-Fi + IoT",
    sublabel_en: "Base stations + Wi-Fi + IoT",
    epistemicLevel: "E",
    title: "Ympäristön sähkömagneettinen tausta",
    title_en: "Environmental electromagnetic background",
    mechanism:
      "Tukiasemat, Wi-Fi-reitittimet, IoT-laitteet ja voimalinjat muodostavat jatkuvan sähkömagneettisen taustan joka on kasvanut eksponentiaalisesti 1990-luvulta. Kaupunkiympäristössä mitattu mediaanikenttä on 0.67–1.51 V/m (PMC 2022). Tämä kenttä on läsnä 24/7 riippumatta yksilön omasta laitekäytöstä.",
    mechanism_en:
      "Base stations, Wi-Fi routers, IoT devices, and power lines form a continuous electromagnetic background that has grown exponentially since the 1990s. The measured median field in urban environments is 0.67–1.51 V/m (PMC 2022). This field is present 24/7 regardless of an individual's own device use.",
    lindgrenInterpretation:
      "Ambient-EMF on Ā — taustapotentiaali joka määrää χ(Ā):n arvon. Se ei itsessään ole pääasiallinen biologinen vaikuttaja vaan se MAHDOLLISTAA personal-EMF:n vaikutuksen. Ilman ambient-taustaa (esim. amish-yhteisö) personal-laitteiden vaikutus olisi geometrisesti minimoitu.",
    lindgrenInterpretation_en:
      "Ambient EMF is Ā — the background potential that determines the value of χ(Ā). It is not itself the primary biological driver but rather ENABLES the effect of personal EMF. Without an ambient background (e.g., an Amish community), the effect of personal devices would be geometrically minimized.",
    keyReferences: [
      {
        authors: "GSMA Intelligence 2024",
        title: "Mobile Economy Report",
        journal: "GSMA",
        keyFinding:
          "5.8 miljardia mobiililiittymää, 4.93 miljoonaa tukiasemaa globaalisti",
        keyFinding_en:
          "5.8 billion mobile subscriptions, 4.93 million base stations globally",
      },
      {
        authors: "Eurooppalaiset mittausverkot 2022",
        title: "RF-EMF exposure in European cities",
        journal: "PMC",
        keyFinding: "Mediaanikentät 0.67–1.51 V/m kaupungeissa",
        keyFinding_en: "Median fields of 0.67–1.51 V/m in cities",
      },
      {
        authors: "Deprez ym. 2025",
        title: "5G RF EMF Spectral Exposure Assessment in Four European Countries",
        journal: "Bioelectromagnetics (bem.70019)",
        keyFinding:
          "5G:n spektraalimittaus 4 Euroopan maassa. Suunnattu keila muuttaa ambient/personal-suhdetta BERM:n kaksikanavamallissa: ambient↓ (vs 4G), personal↑ hetkittäin.",
        keyFinding_en:
          "Spectral measurement of 5G in 4 European countries. Beamforming changes the ambient/personal ratio in BERM's two-channel model: ambient↓ (vs. 4G), personal↑ momentarily.",
      },
    ],
  },
  {
    id: "personal",
    level: 3,
    label: "Personal-EMF",
    label_en: "Personal EMF",
    sublabel: "Puhelin + kuulokkeet + kellot",
    sublabel_en: "Phone + earbuds + watches",
    epistemicLevel: "E",
    title: "Henkilökohtainen laitealtistus",
    title_en: "Personal device exposure",
    mechanism:
      "Älypuhelin keholla (taskussa, kädessä, yöpöydällä) tuottaa SAR-arvon joka on 100–1500× ympäristötaustan. Keskimääräinen kehokontaktiaika on kasvanut 2h/vrk (2007) → 14h/vrk (2024). Nappikuulokkeet tuottavat jatkuvan RF-altistuksen hypotalamuksen lähelle. Älykellot ranteessa, läppäri sylissä.",
    mechanism_en:
      "A smartphone on the body (in a pocket, in the hand, on the nightstand) produces a SAR value that is 100–1500× the ambient background. Average body-contact time has grown from 2h/day (2007) to 14h/day (2024). Earbuds produce continuous RF exposure close to the hypothalamus. Smartwatches on the wrist, laptops on the lap.",
    lindgrenInterpretation:
      "Personal-EMF on perturbointia a joka kohdistuu tiettyihin kudoksiin (kivekset taskussa, aivolisäke korvalla, hypotalamus kuulokkeissa). Sen biologinen vaste riippuu χ(Ā):stä — ambient-taustan tasosta. Korkea ambient + korkea personal = maksimaalinen biologinen vaste.",
    lindgrenInterpretation_en:
      "Personal EMF is the perturbation a that is directed at specific tissues (testes in a pocket, pituitary gland near the ear, hypothalamus with earbuds). Its biological response depends on χ(Ā) — the level of the ambient background. High ambient + high personal = maximal biological response.",
    quantitative:
      "phoneBodyContactHours(2024) = 14 h/vrk\nsmartphonePenetration(Finland, 2024) = 0.90\nearpodPenetration(Finland, 2024) = 0.28",
    quantitative_en:
      "phoneBodyContactHours(2024) = 14 h/day\nsmartphonePenetration(Finland, 2024) = 0.90\nearpodPenetration(Finland, 2024) = 0.28",
    keyReferences: [
      {
        authors: "WHO SR3A / Kenny ym. 2024",
        title: "Systematic review: RF-EMF and male fertility",
        journal: "Environment International",
        keyFinding:
          "Altistuksen karakterisointi merkittävin heikkous tutkimuksissa",
        keyFinding_en:
          "Exposure characterization is the most significant weakness in the studies",
      },
    ],
  },
  {
    id: "two_channel",
    level: 3,
    label: "Kaksikanavamalli",
    label_en: "Two-channel model",
    sublabel: "total = ambient + χ(Ā)×personal",
    epistemicLevel: "M|C",
    title: "Kaksikanavainen altistusyhdistelmä",
    title_en: "Two-channel exposure combination",
    mechanism:
      "Kokonaisaltistus ei ole ambient + personal (lineaarinen summa) vaan ambient + χ(ambient) × personal. Tämä tarkoittaa: kun ambient on matala (esim. maaseutu), personal-laitteiden biologinen vaikutus on pieni vaikka käyttö on samaa. Kun ambient on korkea (kaupunki), personal lisää altistusta lähes lineaarisesti.",
    mechanism_en:
      "Total exposure is not ambient + personal (a linear sum) but ambient + χ(ambient) × personal. This means: when ambient is low (e.g., rural areas), the biological effect of personal devices is small even if usage is the same. When ambient is high (cities), personal use adds to exposure almost linearly.",
    lindgrenInterpretation:
      "Kaksikanavamalli on geometrisen valintasäännön suora sovellus. Se selittää miksi amish-yhteisö (Ā ≈ 0) ei koe biologista vaikutusta vaikka joku vierailisi matkapuhelimen kanssa — χ(0) × personal = 0. Ja miksi Soul (Ā korkea) kokee dramaattisen vaikutuksen — χ(Ā) ≈ 1, personal lisäytyy täysimääräisesti.",
    lindgrenInterpretation_en:
      "The two-channel model is a direct application of the geometric selection rule. It explains why an Amish community (Ā ≈ 0) experiences no biological effect even if someone visits with a mobile phone — χ(0) × personal = 0. And why Seoul (Ā high) experiences a dramatic effect — χ(Ā) ≈ 1, personal exposure adds in full.",
    quantitative:
      "total(y) = ambient(y) + χ(ambient(y)) × personal(y)\ncumEMF = Σ_y total(y)  [vuodesta EMF_start]",
    quantitative_en:
      "total(y) = ambient(y) + χ(ambient(y)) × personal(y)\ncumEMF = Σ_y total(y)  [from year EMF_start]",
    keyReferences: [
      {
        authors: "Lindgren ym. 2025",
        title: "Geometrinen valintasääntö",
        journal: "J. Phys.: Conf. Ser.",
        keyFinding:
          "Lineaarinen kytkentä vaatii rikkoutumattoman taustariippuvuuden",
        keyFinding_en:
          "Linear coupling requires an unbroken background dependence",
      },
    ],
    falsificationCondition:
      "Jos personal-EMF tuottaa saman biologisen vasteen ambient-taustasta riippumatta",
    falsificationCondition_en:
      "If personal EMF produces the same biological response regardless of the ambient background",
  },

  // TASO 4 — Kolme kanavaa
  {
    id: "channel_elf",
    level: 4,
    label: "ELF-kanava",
    label_en: "ELF channel",
    sublabel: "f < 300 Hz · PEMF / TMS / VNS",
    epistemicLevel: "E",
    title: "ELF-kanava: kalvomodulaatio",
    title_en: "ELF channel: membrane modulation",
    mechanism:
      "Taajuudet alle solun kalvon RC-rajataajuuden f_c ≈ 1 kHz pääsevät solun sisään ja moduloivat suoraan kalvopotentiaalia. Ulkoinen kenttä indusoituu kalvon yli koko solun antennipinta-alan kautta — δV_m = 1.5 × E × r_cell × cos(θ). FDA-hyväksytyt PEMF-laitteet (luumurtumat), TMS (depressio) ja VNS (epilepsia) toimivat tällä kanavalla.",
    mechanism_en:
      "Frequencies below the cell membrane's RC cutoff frequency f_c ≈ 1 kHz pass into the cell and directly modulate the membrane potential. The external field is induced across the membrane through the cell's entire antenna surface area — δV_m = 1.5 × E × r_cell × cos(θ). FDA-approved PEMF devices (bone fractures), TMS (depression), and VNS (epilepsy) operate through this channel.",
    lindgrenInterpretation:
      "ELF-kanava on geometrisen perturbointian suora kalvovaste. Taajuudet f < f_c pääsevät kalvon RC-suodattimen läpi ja muuttavat paikallista metriikkaa Ā → χ(Ā) muuttuu. H(f) = 1/√(1+(f/f_c)²) on metrisen suodattimen taajuusvaste.",
    lindgrenInterpretation_en:
      "The ELF channel is the direct membrane response to geometric perturbation. Frequencies f < f_c pass through the membrane's RC filter and change the local metric Ā → χ(Ā) changes. H(f) = 1/√(1+(f/f_c)²) is the frequency response of the metric filter.",
    quantitative:
      "f_c ≈ 1/(2π R_m C_m) ≈ 1 kHz\nδV_m = 1.5 · E · r_cell · cos(θ)\nH(f) = 1/√(1 + (f/f_c)²)\n\nFDA-laitteet: PEMF (luumurtumat), TMS (depressio), VNS (epilepsia)",
    quantitative_en:
      "f_c ≈ 1/(2π R_m C_m) ≈ 1 kHz\nδV_m = 1.5 · E · r_cell · cos(θ)\nH(f) = 1/√(1 + (f/f_c)²)\n\nFDA devices: PEMF (bone fractures), TMS (depression), VNS (epilepsy)",
    keyReferences: [
      {
        authors: "Panagopoulos ym. 2015",
        title: "Polarization: A Key Difference between Man-made and Natural EMFs",
        journal: "Scientific Reports 5",
        keyFinding: "Polarisoitu ELF moduloi kalvopotentiaalia suoraan",
        keyFinding_en: "Polarized ELF directly modulates the membrane potential",
      },
    ],
  },
  {
    id: "channel_if",
    level: 4,
    label: "IF-kanava",
    label_en: "IF channel",
    sublabel: "300 Hz – 10 MHz · TTFields",
    epistemicLevel: "E",
    title: "IF-kanava: solunjakautumishäiriö",
    title_en: "IF channel: cell division disruption",
    mechanism:
      "Taajuudet 1 kHz – 1 MHz eivät pääse RC-suodattimen läpi soluun kokonaisina aaltoina, mutta vaikuttavat kahdella mekanismilla: (1) IFO-VGIC — polarisoitu kenttä pakottaa S4-jännitesensorin oskilloiman epäsäännöllisesti, kynnys ~10⁻⁵ V/m (lineaarinen); (2) DEP — dielektroforeettinen voima mitoosin aikana jakautumiskaran tubuliineille, kynnys 100–300 V/m (neliöllinen). TTFields (200 kHz, 1–2 V/cm) käyttää DEP-mekanismia glioblastoomahoidossa (FDA 2011).",
    mechanism_en:
      "Frequencies of 1 kHz – 1 MHz do not pass through the RC filter into the cell as whole waves, but act through two mechanisms: (1) IFO-VGIC — a polarized field forces the S4 voltage sensor to oscillate irregularly, threshold ~10⁻⁵ V/m (linear); (2) DEP — dielectrophoretic force on the mitotic spindle's tubulins during mitosis, threshold 100–300 V/m (quadratic). TTFields (200 kHz, 1–2 V/cm) use the DEP mechanism in glioblastoma treatment (FDA 2011).",
    lindgrenInterpretation:
      "IF-kanava on geometrisesti mielenkiintoisin: mitoottisessa solussa jakautumiskara on anisotrooppinen dielektrinen rakenne. Metrinen perturbointia kohdistuu tubuliinien varausjakaumaan → karan orientaatio häiriintyy → solunjakautuminen keskeytyy tai virheellistyy. Cleavage-uurteen geometrinen vahvistus G ≈ 25× selittää miksi DEP-efekti on voimakkain juuri jakautumisen aikana.",
    lindgrenInterpretation_en:
      "The IF channel is the most geometrically interesting: in a mitotic cell, the spindle is an anisotropic dielectric structure. The metric perturbation acts on the tubulins' charge distribution → spindle orientation is disrupted → cell division is halted or becomes erroneous. The geometric amplification of the cleavage furrow, G ≈ 25×, explains why the DEP effect is strongest precisely during division.",
    quantitative:
      "IFO-kynnys: ~10⁻⁵ V/m (lineaarinen)\nDEP-kynnys: 100–300 V/m (neliöllinen)\nG_furrow ≈ (d_cell / w_furrow)² ≈ 25×\n\nFDA-laite: TTFields (Optune), 200 kHz, glioblastooma",
    quantitative_en:
      "IFO threshold: ~10⁻⁵ V/m (linear)\nDEP threshold: 100–300 V/m (quadratic)\nG_furrow ≈ (d_cell / w_furrow)² ≈ 25×\n\nFDA device: TTFields (Optune), 200 kHz, glioblastoma",
    keyReferences: [
      {
        authors: "Kirson ym. 2004",
        title: "Disruption of cancer cell replication by alternating electric fields",
        journal: "Cancer Research 64(9)",
        keyFinding: "100–300 kHz kentät häiritsevät mitoottista karaa DEP:n kautta",
        keyFinding_en: "100–300 kHz fields disrupt the mitotic spindle via DEP",
      },
    ],
  },
  {
    id: "channel_rf",
    level: 4,
    label: "RF-kanava",
    label_en: "RF channel",
    sublabel: "> 10 MHz · PRF / diatermialaitteet",
    sublabel_en: "> 10 MHz · PRF / diathermy devices",
    epistemicLevel: "E",
    title: "RF-kanava: spin-kemia ja sirkadiaaninen häiriö",
    title_en: "RF channel: spin chemistry and circadian disruption",
    mechanism:
      "Taajuudet yli RPM-koherenssirajan f_RPM ≈ 1 MHz vaikuttavat spin-kemiallisen mekanismin kautta. Kryptokromin (CRY) FAD-superoksidi-radikaalipari toimii magnetosensorina: RF-kenttä muuttaa singletti-tripletti-siirtymänopeutta → CRY-signalointi häiriintyy → sirkadiaaninen kello vioittuu. Lindgrenin kovariantti spinkorjaus: B_local = B_ext × √(det(g_μν)). PRF-laitteet (pulsed RF, FDA: pehmytkudosparaneminen) ja diatermialaitteet toimivat tällä kanavalla.",
    mechanism_en:
      "Frequencies above the RPM coherence limit f_RPM ≈ 1 MHz act through the spin-chemistry mechanism. Cryptochrome's (CRY) FAD-superoxide radical pair functions as a magnetosensor: the RF field changes the singlet-triplet transition rate → CRY signaling is disrupted → the circadian clock malfunctions. Lindgren's covariant spin correction: B_local = B_ext × √(det(g_μν)). PRF devices (pulsed RF, FDA: soft tissue healing) and diathermy devices operate through this channel.",
    lindgrenInterpretation:
      "RF-kanava on geometrisesti puhtain polku: 87.5% RPM-Hamiltoniaanin elementeistä on johdettavissa Lindgrenin metriikka-ansatzista. Spinprekkessio on suoraan metriikan funktio — kovariantti spinkorjaus B_local = B_ext × √(det(g_μν)) tarkoittaa, että RF-kentän biologinen vaikutus riippuu paikallisesta geometriasta. Tämä ohittaa VGIC-reitin δV_m-ongelman kokonaan.",
    lindgrenInterpretation_en:
      "The RF channel is the geometrically purest pathway: 87.5% of the elements of the RPM Hamiltonian can be derived from Lindgren's metric ansatz. Spin precession is directly a function of the metric — the covariant spin correction B_local = B_ext × √(det(g_μν)) means that the biological effect of the RF field depends on the local geometry. This bypasses the VGIC pathway's δV_m magnitude problem entirely.",
    quantitative:
      "f_RPM ≈ 1 MHz (radikaaliparimekanismin koherenssin ylärajaaja)\nB_local = B_ext × √(det(g_μν))\nRitz 2004 kokeellinen häiriökynnys: ~15 nT\n\nFDA-laitteet: PRF (pehmytkudos), diatermia (kipu/tulehdus)",
    quantitative_en:
      "f_RPM ≈ 1 MHz (upper coherence limit of the radical pair mechanism)\nB_local = B_ext × √(det(g_μν))\nRitz 2004 experimental disruption threshold: ~15 nT\n\nFDA devices: PRF (soft tissue), diathermy (pain/inflammation)",
    keyReferences: [
      {
        authors: "Ritz ym. 2004",
        title: "Resonance effects indicate a radical-pair mechanism for avian compass",
        journal: "Nature 429",
        keyFinding: "RF-kentät häiritsevät radikaaliparimekanismia ~15 nT kynnyksel",
        keyFinding_en:
          "RF fields disrupt the radical pair mechanism at a ~15 nT threshold",
      },
      {
        authors: "Xu ym. 2024",
        title: "FAD-superoxide radical pair identified as magnetosensor",
        journal: "Nature Communications",
        keyFinding: "FAD-superoksidi on CRY:n magneettisensori",
        keyFinding_en: "FAD-superoxide is CRY's magnetic sensor",
      },
    ],
  },

  // TASO 5
  {
    id: "membrane",
    level: 5,
    label: "Kalvopotentiaali",
    label_en: "Membrane potential",
    sublabel: "Vmem = −70 mV / 10 nm",
    epistemicLevel: "E",
    title: "Solun kalvopotentiaali biologisena taustana",
    title_en: "The cell membrane potential as a biological background",
    mechanism:
      "Jokaisen elävän solun kalvon yli on jännitegradientti: −70 mV 10 nanometrin matkalla. Tämä vastaa kentänvoimakkuutta 7×10⁶ V/m — suuruusluokkia enemmän kuin mikään ulkoinen EMF. Kalvopotentiaali ylläpidetään ionipumppujen (Na⁺/K⁺-ATPaasi) aktiivisella työllä ja se on elämän perusedellytys.",
    mechanism_en:
      "Across the membrane of every living cell there is a voltage gradient: −70 mV over a distance of 10 nanometers. This corresponds to a field strength of 7×10⁶ V/m — orders of magnitude greater than any external EMF. The membrane potential is maintained by the active work of ion pumps (Na⁺/K⁺-ATPase) and is a fundamental requirement for life.",
    lindgrenInterpretation:
      "Kalvopotentiaali on biologisen aika-avaruuden paikallinen Ā. Se on valtava — 7 miljoonaa volttia metrillä. Lindgrenin kehyksessä tämä tarkoittaa, että solukalvo on äärimmäisen 'kaareva' alue metriikassa. χ(7×10⁶) ≈ 1.0: maksimaalinen herkkyys. Tämä selittää miksi pienet ulkoiset kentät (1–10 V/m) voivat vaikuttaa biologiaan — ne eivät kilpaile kalvopotentiaalin kanssa vaan PERTURBOIVAT sitä.",
    lindgrenInterpretation_en:
      "The membrane potential is the local Ā of biological spacetime. It is enormous — 7 million volts per meter. In Lindgren's framework, this means the cell membrane is an extremely 'curved' region in the metric. χ(7×10⁶) ≈ 1.0: maximal sensitivity. This explains why small external fields (1–10 V/m) can affect biology — they do not compete with the membrane potential but instead PERTURB it.",
    keyReferences: [],
  },
  {
    id: "vgic",
    level: 5,
    label: "VGIC-aktivaatio",
    label_en: "VGIC activation",
    sublabel: "IFO-mekanismi (Panagopoulos 2025)",
    sublabel_en: "IFO mechanism (Panagopoulos 2025)",
    epistemicLevel: "E",
    title: "Jänniteohjattujen ionikanavien pakko-oskillaatio",
    title_en: "Forced oscillation of voltage-gated ion channels",
    mechanism:
      "Jänniteohjatut ionikanavat (VGIC) avaavat ja sulkevat sähkökentän mukaan. S4-jännitesensori on varattu heliksi joka liikkuu kentän muuttuessa. Panagopouloksen IFO-mekanismi (Irregular Forced Opening): polarisoitu, koherentti RF-EMF pakottaa S4:n oskilloiman taajuudella johon se ei ole sopeutunut → kanava avautuu ja sulkeutuu epäsäännöllisesti → hallitsematon Ca²⁺-influksi.",
    mechanism_en:
      "Voltage-gated ion channels (VGICs) open and close in response to the electric field. The S4 voltage sensor is a charged helix that moves as the field changes. Panagopoulos's IFO mechanism (Irregular Forced Opening): a polarized, coherent RF-EMF forces S4 to oscillate at a frequency it is not adapted to → the channel opens and closes irregularly → uncontrolled Ca²⁺ influx.",
    lindgrenInterpretation:
      "VGIC:n S4-heliksi on varattu partikkeli metrisessä kentässä gμν. Kun ulkoinen EMF muuttaa paikallista metriikkaa, S4:n liikerata muuttuu — se on geodeesimuutos. IFO on geometrinen seuraus: RF-kenttä muuttaa metriikkaa S4:n ympäristössä → S4:n tasapainoasema muuttuu → kanava avautuu.",
    lindgrenInterpretation_en:
      "The VGIC's S4 helix is a charged particle in the metric field gμν. When an external EMF changes the local metric, the S4's trajectory changes — this is a change in geodesic. IFO is a geometric consequence: the RF field changes the metric in S4's vicinity → S4's equilibrium position shifts → the channel opens.",
    quantitative:
      "Tang ym. 2024 (Nature Communications): S4-heliksin protonidynamiikka määrää VGIC:n rakenteen ja toiminnan. Panagopoulos 2025: IFO-mekanismi polarisoituneelle koherentille kentälle. Panagopoulos 2025: 131/131 tutkimuksesta 124 (95 %) raportoi oksidatiivisia vaikutuksia RF/Wi-Fi-altistuksessa. Bertagna 2025: inward currents ↓40%, transient outward ↓50%. Both RyR (dantrolene) and SERCA (CPA) blockade fully abrogated EMF effects.",
    quantitative_en:
      "Tang et al. 2024 (Nature Communications): S4 helix proton dynamics determine VGIC structure and function. Panagopoulos 2025: IFO mechanism for a polarized coherent field. Panagopoulos 2025: 124 of 131 studies (95%) reported oxidative effects under RF/Wi-Fi exposure. Bertagna 2025: inward currents ↓40%, transient outward ↓50%. Both RyR (dantrolene) and SERCA (CPA) blockade fully abrogated EMF effects.",
    keyReferences: [
      {
        authors: "Panagopoulos ym. 2015, 2021, 2025",
        title: "IFO-VGIC mechanism",
        journal: "BioMed Research International / Adv. Exp. Med. Biol.",
        keyFinding:
          "Polarisoitu, koherentti RF-EMF pakottaa S4-heliksin epäsäännölliseen oskillaatioon",
        keyFinding_en:
          "Polarized, coherent RF-EMF forces the S4 helix into irregular oscillation",
      },
      {
        authors: "Panagopoulos ym. 2025",
        title: "IFO-VGIC comprehensive review (131 studies)",
        journal: "Bioelectromagnetics",
        keyFinding:
          "95 % raportoi oksidatiivisia vaikutuksia. VGIC-salpaajat estävät vasteen. Yhdenmukainen Yakymenko 2016 (93/100) kanssa.",
        keyFinding_en:
          "95% reported oxidative effects. VGIC blockers prevent the response. Consistent with Yakymenko 2016 (93/100).",
      },
      {
        authors: "Tang ym. 2024",
        title: "Proton dynamics determine VGIC structure and function",
        journal: "Nature Communications 15, 704",
        keyFinding: "S4-protonidynamiikka on VGIC-toiminnan perusta",
        keyFinding_en: "S4 proton dynamics underlie VGIC function",
      },
      {
        authors: "Pall 2013",
        title: "EMF act via activation of voltage-gated calcium channels",
        journal: "J. Cell. Mol. Med. 17(8)",
        keyFinding: "23 tutkimusta: VGCC-salpaajat estävät EMF-vasteen",
        keyFinding_en: "23 studies: VGCC blockers prevent the EMF response",
      },
      {
        authors: "Bertagna ym. 2025",
        title: "EMF modulates ionic currents via Ca²⁺ homeostasis (RyR/SERCA)",
        journal: "Ann NY Acad Sci 1550(1)",
        keyFinding:
          "50 Hz, 1 mT → sisäänpäinvirrat ↓40%, transientit ↓50%. RyR-salpaaja ja SERCA-inhibiittori estivät vaikutukset. Ca²⁺-varastojen dysregulaatio laajentaa IFO-mekanismia.",
        keyFinding_en:
          "50 Hz, 1 mT → inward currents ↓40%, transient currents ↓50%. RyR blocker and SERCA inhibitor prevented the effects. Ca²⁺ store dysregulation extends the IFO mechanism.",
      },
      {
        authors: "Koivisto ym. 2000",
        title: "Effects of 902 MHz EMF on response times in humans",
        journal: "NeuroReport",
        keyFinding: "Kaksi kaksoissokkokokeetta (n=48+48): 902 MHz → kognitiivinen fasilitaatio. Ei replikoitu (Haarala 2003, 2005).",
        keyFinding_en:
          "Two double-blind experiments (n=48+48): 902 MHz → cognitive facilitation. Not replicated (Haarala 2003, 2005).",
      },
      {
        authors: "Eliyahu ym. 2006",
        title: "Lateralized cognitive effects of cellular phone radiation",
        journal: "Bioelectromagnetics",
        keyFinding: "890 MHz → lateralisoitunut RT-vaikutus. Tukee kaksikanavamallin spatiaalirakennetta.",
        keyFinding_en:
          "890 MHz → lateralized RT effect. Supports the spatial structure of the two-channel model.",
      },
      {
        authors: "Luria ym. 2009",
        title: "Cognitive effects of radiation emitted by cellular phones",
        journal: "Bioelectromagnetics 30(3):198–204",
        keyFinding: "890 MHz → aikariippuva lateralisoitunut vaikutus. GAS-dynamiikka (alarm → resistance).",
        keyFinding_en:
          "890 MHz → time-dependent lateralized effect. GAS dynamics (alarm → resistance).",
      },
    ],
    falsificationCondition:
      "Jos VGIC-salpaajat (esim. nifedipiini) eivät estä RF-EMF:n biologisia vaikutuksia",
    falsificationCondition_en:
      "If VGIC blockers (e.g., nifedipine) do not prevent the biological effects of RF-EMF",
  },

  // TASO 6
  {
    id: "pathway_a",
    level: 6,
    label: "Polku A: ROS",
    label_en: "Pathway A: ROS",
    sublabel: "Ca²⁺ → mitokondriaali ROS",
    sublabel_en: "Ca²⁺ → mitochondrial ROS",
    epistemicLevel: "E",
    title: "Oksidatiivinen stressi",
    title_en: "Oxidative stress",
    mechanism:
      "VGIC-aktivaation tuottama Ca²⁺-influksi aktivoi mitokondriaalisen elektroninsiirtoketjun ylikuormituksen → reaktiivisten happilajien (ROS) tuotanto kasvaa. ROS vaurioittaa DNA:ta, lipidejä ja proteiineja. Umbrella review 2025 (9 katsausta, 215 tutkimusta): RF-EMR laski siittiöiden motiliteettia merkitsevästi (MD: −3.90) ja vitaliteettia (MD: −2.85). Testosteroni laski merkitsevästi (MD: −1.5 ng/dL).",
    mechanism_en:
      "The Ca²⁺ influx produced by VGIC activation triggers overload of the mitochondrial electron transport chain → production of reactive oxygen species (ROS) increases. ROS damages DNA, lipids, and proteins. A 2025 umbrella review (9 reviews, 215 studies): RF-EMR significantly decreased sperm motility (MD: −3.90) and vitality (MD: −2.85). Testosterone decreased significantly (MD: −1.5 ng/dL).",
    lindgrenInterpretation:
      "ROS-tuotanto on metrisen perturbointian kemiallinen seuraus. Ca²⁺ on varaus jonka liike seuraa geometriaa. Kun geometria muuttuu (EMF), Ca²⁺:n jakautuminen solun sisällä muuttuu → mitokondriaalinen kuormitus muuttuu → ROS-tasapaino häiriintyy. Redox-bifurkaatiovahvistus G = 1/(2µ) selittää miksi pieni Ca²⁺-muutos tuottaa suuren ROS-vasteen: systeemi on lähellä bifurkaatiokynnystä.",
    lindgrenInterpretation_en:
      "ROS production is the chemical consequence of the metric perturbation. Ca²⁺ is a charge whose movement follows the geometry. When the geometry changes (EMF), the distribution of Ca²⁺ within the cell changes → mitochondrial load changes → the ROS balance is disrupted. The redox bifurcation amplification G = 1/(2µ) explains why a small change in Ca²⁺ produces a large ROS response: the system is close to a bifurcation threshold.",
    recoveryAlpha: 0.8,
    recoveryTimescale: "päivistä viikkoihin",
    recoveryTimescale_en: "days to weeks",
    bermComponent: "biology/sperm_cascade.py → ros_index()",
    keyReferences: [
      {
        authors: "Panagopoulos ym. 2025",
        title: "IFO-VGIC comprehensive review (131 studies)",
        journal: "Bioelectromagnetics",
        keyFinding: "Ca²⁺ → mitokondriaali ROS → DNA-vauriot, siittiöhäiriöt. 95 % konsensus 131 tutkimuksessa, yhdenmukainen Yakymenko 2016 (93/100) kanssa.",
        keyFinding_en:
          "Ca²⁺ → mitochondrial ROS → DNA damage, sperm dysfunction. 95% consensus across 131 studies, consistent with Yakymenko 2016 (93/100).",
      },
      {
        authors: "Bektas ym. 2026",
        title: "CoQ10 ameliorates RF-induced testicular impairments at 3.5 GHz",
        journal: "Bioelectromagnetics (bem.70043)",
        keyFinding:
          "3,5 GHz (5G) → testis-ROS + vaurio. CoQ10 amelioroi — mekanismi reversiibeli. Ensimmäinen 5G-taajuusspesifinen testisdata. Yhdenmukainen recovery window -konseptin kanssa.",
        keyFinding_en:
          "3.5 GHz (5G) → testicular ROS + damage. CoQ10 ameliorates it — the mechanism is reversible. First 5G-frequency-specific testicular data. Consistent with the recovery-window concept.",
      },
    ],
  },
  {
    id: "pathway_b",
    level: 6,
    label: "Polku B: CRY",
    label_en: "Pathway B: CRY",
    sublabel: "RPM → kellogeenihäiriö",
    sublabel_en: "RPM → clock gene disruption",
    epistemicLevel: "E",
    title: "Kryptokromi-sirkadiaanihäiriö",
    title_en: "Cryptochrome circadian disruption",
    mechanism:
      "RF-kentät häiritsevät kryptokromin (CRY) radikaaliparimekanismia (RPM). CRY on sirkadiaanisen kellon ydinkomponentti gonadikudoksessa. RPM-häiriö → kellogeenien ekspression muutos → ovulaation ajoitus häiriintyy (naiset) + spermatogeneesin rytmi häiriintyy (miehet). FAD-superoksidi-radikaalipari tunnistettu sensoriksi (Nature Comms 2024). Ei-monotoniset RPM-ennusteet vahvistettu planaariamatoissa (PNAS Nexus 2026). Engels 2014 (Nature): antropogeeninen EMF-kohina häiritsee magneettikompassia muuttolinnuissa — nykyiset ympäristötasot riittävät. Vuorotyödata validoi: vuorotyöntekijöillä vähemmän lapsia ja enemmän keskenmenoja.",
    mechanism_en:
      "RF fields disrupt cryptochrome's (CRY) radical pair mechanism (RPM). CRY is a core component of the circadian clock in gonadal tissue. RPM disruption → altered clock gene expression → disrupted ovulation timing (women) + disrupted spermatogenesis rhythm (men). The FAD-superoxide radical pair has been identified as the sensor (Nature Comms 2024). Non-monotonic RPM predictions confirmed in planarian flatworms (PNAS Nexus 2026). Engels 2014 (Nature): anthropogenic EMF noise disrupts the magnetic compass in migratory birds — current ambient levels are sufficient. Shift-work data validates this: shift workers have fewer children and more miscarriages.",
    lindgrenInterpretation:
      "CRY-kanava on VGIC:stä RIIPPUMATON polku ja teoreettisesti puhtaampi: 87,5 % RPM-Hamiltoniaanin elementeistä on johdettavissa Lindgrenin metriikka-ansatzista. Se ei kulje Ca²⁺:n kautta vaan suoraan kvanttibiologisen spin-kemiallisen mekanismin kautta. Lindgrenin kehyksessä RPM:n susceptibiliteetti χ_B on eri funktio kuin geometrinen χ(Ā) — se on ei-monotoninen ja kolmiregiiminen. VGCC-aktivaation suuruusluokan ongelma (δV_m ≈ 10⁻²¹ V ilman biologista vahvistusta) ei koske RPM-reittiä, koska 5 V/m kentässä magneettinen komponentti (~16,7 nT) ylittää Ritzin (2004) kokeellisen häiriökynnyksen (~15 nT).",
    lindgrenInterpretation_en:
      "The CRY channel is a pathway INDEPENDENT of VGIC and theoretically cleaner: 87.5% of the elements of the RPM Hamiltonian can be derived from Lindgren's metric ansatz. It does not proceed via Ca²⁺ but directly through the quantum-biological spin-chemistry mechanism. In Lindgren's framework, the RPM susceptibility χ_B is a different function from the geometric χ(Ā) — it is non-monotonic and has three regimes. The order-of-magnitude problem of VGCC activation (δV_m ≈ 10⁻²¹ V without biological amplification) does not apply to the RPM pathway, because at 5 V/m the magnetic component (~16.7 nT) exceeds Ritz's (2004) experimental disruption threshold (~15 nT).",
    recoveryAlpha: 0.7,
    recoveryTimescale: "viikkoja (vuorokausirytmin uudelleenkalibrointi)",
    recoveryTimescale_en: "weeks (recalibration of the circadian rhythm)",
    bermComponent: "biology/cry.py",
    keyReferences: [
      {
        authors: "Ritz ym. 2004",
        title: "Resonance effects indicate a radical-pair mechanism for avian compass",
        journal: "Nature 429",
        keyFinding: "RF häiritsee lintujen kompassia ~15 nT kynnyksellä, kulmariippuvasti",
        keyFinding_en:
          "RF disrupts the avian compass at a ~15 nT threshold, in an angle-dependent manner",
      },
      {
        authors: "Engels ym. 2014",
        title: "Anthropogenic electromagnetic noise disrupts magnetic compass orientation",
        journal: "Nature 509",
        keyFinding: "Nykyiset antropogeeniset EM-kohinatasot riittävät häiritsemään orientaatiota",
        keyFinding_en:
          "Current anthropogenic EM noise levels are sufficient to disrupt orientation",
      },
      {
        authors: "Chae ym. 2019",
        title: "Blue light-dependent human magnetoreception in geomagnetic food orientation",
        journal: "PLOS ONE 14(2)",
        keyFinding:
          "Ihmisen magneettinen orientaatio edellyttää alle 500 nm valoa ja kääntyy pystykomponentin käännöllä — RPM:lle ominainen sormenjälki. Osoittaa substraatin, ei RF-häiriötä; n=41, ei replikoitu. Taso M|C.",
        keyFinding_en:
          "Human magnetic orientation requires light below 500 nm and reverses with inversion of the vertical field component — a signature characteristic of RPM. Demonstrates the substrate, not RF disruption; n=41, not replicated. Level M|C.",
      },
      {
        authors: "Sherrard ym. 2018",
        title: "Low-intensity EMF induce human cryptochrome to modulate intracellular ROS",
        journal: "PLOS Biology 16(10)",
        keyFinding: "CRY-riippuvainen ROS-vaste ihmisen HEK293-soluissa ja hiiren fibroblasteissa",
        keyFinding_en:
          "CRY-dependent ROS response in human HEK293 cells and mouse fibroblasts",
      },
      {
        authors: "Yoshii ym. 2009",
        title: "Cryptochrome mediates light-dependent magnetosensitivity of Drosophila",
        journal: "Nature",
        keyFinding: "CRY-mutantit menettävät magneettivasteen — CRY on transduseri",
        keyFinding_en: "CRY mutants lose the magnetic response — CRY is the transducer",
      },
    ],
  },
  {
    id: "pathway_c",
    level: 6,
    label: "Polku C: Melatoniini",
    label_en: "Pathway C: Melatonin",
    sublabel: "Pineaali → vuorokausirytmi",
    sublabel_en: "Pineal gland → circadian rhythm",
    epistemicLevel: "E",
    title: "Pineaalin melatoniinisuppressio",
    title_en: "Pineal melatonin suppression",
    mechanism:
      "Pineaalirauhanen tuottaa melatoniinia joka säätelee vuorokausirytmiä ja GnRH-pulsaatiota. Pineaali on herkkä geomagneettiselle kentälle (Becker: melatoniinisekretio muuttuu geomagneettisen kentän vahvuisilla kentillä). EMF häiritsee pineaalin kalibraatiota → melatoniini↓ → uni↓ → GnRH-pulsaatio↓ → FSH/LH↓ → gonadifunktio↓. Burch 2002: matkapuhelinkäyttäjien melatoniinimetaboliitit matalammat. Leproult 2011: 1 viikko unirajoitusta → T −15%.",
    mechanism_en:
      "The pineal gland produces melatonin, which regulates the circadian rhythm and GnRH pulsatility. The pineal gland is sensitive to the geomagnetic field (Becker: melatonin secretion changes at field strengths comparable to the geomagnetic field). EMF disrupts pineal calibration → melatonin↓ → sleep↓ → GnRH pulsatility↓ → FSH/LH↓ → gonadal function↓. Burch 2002: mobile phone users have lower melatonin metabolites. Leproult 2011: 1 week of sleep restriction → T −15%.",
    lindgrenInterpretation:
      "Pineaali on biologinen χ(Ā)-detektori. Se mittaa geomagneettisen taustan magnetiittikristallien kautta ja säätää melatoniinia sen mukaan. Ulkoinen EMF häiritsee tätä mittausta — pineaali saa virheellisen Ā-arvon → tuottaa virheellisen melatoniinivasteen. Korkeammilla leveysasteilla (korkeampi geomag-Ā) pineaali on herkempi häiriölle (χ(Ā) suurempi).",
    lindgrenInterpretation_en:
      "The pineal gland is a biological χ(Ā) detector. It measures the geomagnetic background via magnetite crystals and adjusts melatonin accordingly. External EMF disrupts this measurement — the pineal gland receives an incorrect Ā value → produces an incorrect melatonin response. At higher latitudes (higher geomagnetic Ā), the pineal gland is more sensitive to disruption (χ(Ā) larger).",
    recoveryAlpha: 0.7,
    recoveryTimescale: "päiviä (melatoniinisyklin palautuminen)",
    recoveryTimescale_en: "days (recovery of the melatonin cycle)",
    bermComponent:
      "biology/cry.py (jaettu CRY-kanavan kanssa sirkadiaanikomponentin osalta)",
    keyReferences: [
      {
        authors: "Tbahriti ym. 2026",
        title: "EMF and circadian rhythms: PRISMA systematic review",
        journal: "Sleep Biol Rhythms 24(2):195-214",
        keyFinding:
          "55 tutkimuksen PRISMA: 88 % korkealaatuisista eläintutkimuksista raportoi melatoniinisuppressiota (20–50 %). Tukee polkua C kvantitatiivisesti. Vain 27 % tutkimuksista täytti korkeat standardit.",
        keyFinding_en:
          "PRISMA review of 55 studies: 88% of high-quality animal studies reported melatonin suppression (20–50%). Quantitatively supports Pathway C. Only 27% of studies met high-quality standards.",
      },
    ],
  },
  {
    id: "pathway_d",
    level: 6,
    label: "Polku D: HPA→HPG",
    label_en: "Pathway D: HPA→HPG",
    sublabel: "Kortisoli → T↓, OT↓, DA↓",
    sublabel_en: "Cortisol → T↓, OT↓, DA↓",
    epistemicLevel: "E",
    title: "Stressiakselin ristikkäisinhibitio",
    title_en: "Cross-inhibition of the stress axis",
    mechanism:
      "EMF aktivoi HPA-akselin (hypotalamus-aivolisäke-lisämunuainen) → kortisoli nousee → HPG-akselin (hypotalamus-aivolisäke-gonadi) suppressio. Krooninen kortisoli laskee testosteronia, oksitosiinia ja dopamiinia. Guyn koe (Cross Currents): 25 kk mikroaaltoaltistus → kortisoli nousi → laski (Selyen uupuminen) → stressivasteen elinten syövät (3.6× kontrolli). Travison 2007: testosteroni −1%/vuosi 1980-luvulta.",
    mechanism_en:
      "EMF activates the HPA axis (hypothalamus-pituitary-adrenal) → cortisol rises → suppression of the HPG axis (hypothalamus-pituitary-gonad). Chronic cortisol lowers testosterone, oxytocin, and dopamine. Guy's experiment (Cross Currents): 25 months of microwave exposure → cortisol rose → then fell (Selye's exhaustion phase) → cancers of stress-response organs (3.6× control). Travison 2007: testosterone −1%/year since the 1980s.",
    lindgrenInterpretation:
      "HPA-aktivaatio on metrisen perturbointian systeeminen vaste. Hypotalamus on neuroendokriininen solmukohta jossa ionikanavadynamiikka ohjaa hormonaalista signalointia. EMF häiritsee GnRH-pulsaatiota (Schlegel: Ca²⁺-oskillaatiot aivolisäkkeessä) → koko HPG-akseli häiriintyy. Selyen kolmivaihedynamiikka on metrisessä kehyksessä: alarm = geometrinen perturbointia, resistance = uusi stationaarinen ratkaisu, exhaustion = stationaarisen ratkaisun romahdus.",
    lindgrenInterpretation_en:
      "HPA activation is the systemic response to metric perturbation. The hypothalamus is a neuroendocrine node where ion channel dynamics govern hormonal signaling. EMF disrupts GnRH pulsatility (Schlegel: Ca²⁺ oscillations in the pituitary) → the entire HPG axis is disrupted. Selye's three-phase dynamics in the metric framework: alarm = geometric perturbation, resistance = a new stationary solution, exhaustion = collapse of the stationary solution.",
    recoveryAlpha: 0.5,
    recoveryTimescale: "viikkoja–kuukausia (HPA-akselin normalisoituminen)",
    recoveryTimescale_en: "weeks to months (normalization of the HPA axis)",
    bermComponent: "biology/hpa.py",
    keyReferences: [
      {
        authors: "Luria ym. 2009",
        title: "Cognitive effects of cellular phone radiation",
        journal: "Bioelectromagnetics 30(3):198–204",
        keyFinding: "Akuutti alarm→resistance -adaptaatio 1 h sisällä (890 MHz, n=48 miestä). Yhteensopiva GAS-dynamiikan kanssa.",
        keyFinding_en:
          "Acute alarm→resistance adaptation within 1 h (890 MHz, n=48 men). Consistent with GAS dynamics.",
      },
    ],
  },
  {
    id: "pathway_e",
    level: 6,
    label: "Polku E: BBB",
    label_en: "Pathway E: BBB",
    sublabel: "eNOS↑ → permeabiliteetti↑",
    sublabel_en: "eNOS↑ → permeability↑",
    epistemicLevel: "E",
    title: "Veri-aivoesteen avautuminen",
    title_en: "Opening of the blood-brain barrier",
    mechanism:
      "EMF lisää veri-aivoesteen (BBB) permeabiliteettia eNOS-aktivaation ja tight junction -proteiinien (occludin, claudin-5) vähenemisen kautta. Salford: SAR 0.012 W/kg (100× alle FCC-rajan) riitti avaamaan BBB:n rotilla. BBB:n avautuminen päästää endokriinihäiriöaineita, raskasmetalleja ja mikromuoveja aivoihin missä ne häiritsevät hypotalamuksen signalointia.",
    mechanism_en:
      "EMF increases blood-brain barrier (BBB) permeability through eNOS activation and reduction of tight junction proteins (occludin, claudin-5). Salford: SAR of 0.012 W/kg (100× below the FCC limit) was sufficient to open the BBB in rats. Opening of the BBB lets endocrine-disrupting chemicals, heavy metals, and microplastics into the brain, where they disrupt hypothalamic signaling.",
    lindgrenInterpretation:
      "BBB on biologinen metrinen rajapinta: verisuonen endoteeli ja aivoparenkyyma ovat eri metrisiä alueita (eri ionikokoonpanot). Tight junction -proteiinit ylläpitävät metrisen diskontinuiteetin. EMF:n metriikkamuutos heikentää tätä rajapintaa → metriset alueet 'vuotavat' toisiinsa. Lindgrenin kehys selittää miksi pienet kentät riittävät: BBB on bifurkaatiokynnyksen lähellä — pieni metrinen perturbointia kääntää tight junction -proteiinien konformaation.",
    lindgrenInterpretation_en:
      "The BBB is a biological metric interface: the vascular endothelium and the brain parenchyma are distinct metric domains (different ion compositions). Tight junction proteins maintain the metric discontinuity. The EMF-induced metric change weakens this interface → the metric domains 'leak' into each other. Lindgren's framework explains why small fields are sufficient: the BBB is close to a bifurcation threshold — a small metric perturbation flips the conformation of tight junction proteins.",
    recoveryAlpha: 0.0,
    recoveryTimescale: "pysyvä (Salfordin rotilla neuronivauriot 50 pv jälkeen)",
    recoveryTimescale_en:
      "permanent (neuronal damage observed in Salford's rats 50 days later)",
    bermComponent: "biology/bbb.py",
    keyReferences: [
      {
        authors: "Eliyahu ym. 2006 / Luria ym. 2009",
        title: "Lateralisoitunut kognitiivinen vaikutus",
        journal: "Bioelectromagnetics",
        keyFinding: "Lateralisoitunut kognitiivinen vaikutus yhteensopiva paikallisen BBB-avautumisen kanssa (vrt. Salford 2003: SAR 0,016 W/kg).",
        keyFinding_en:
          "Lateralized cognitive effect consistent with local BBB opening (cf. Salford 2003: SAR 0.016 W/kg).",
      },
      {
        authors: "Gao ym. 2024",
        title: "EMP-induced BBB disruption via tight junction degradation",
        journal: "Bioelectromagnetics (bem.22494)",
        keyFinding:
          "EMP → tight junction -proteiinien (okkludiini, klaudiini, ZO-1) degradaatio → BBB-avautuminen rotilla. Mekanistinen tuki polulle E (huom: EMP, ei krooninen RF).",
        keyFinding_en:
          "EMP → degradation of tight junction proteins (occludin, claudin, ZO-1) → BBB opening in rats. Mechanistic support for Pathway E (note: EMP, not chronic RF).",
      },
    ],
  },
  {
    id: "pathway_f",
    level: 6,
    label: "Polku F: Vmem-koodi",
    label_en: "Pathway F: Vmem code",
    sublabel: "Vmem-depolarisaatio → morfogeneesi",
    sublabel_en: "Vmem depolarization → morphogenesis",
    epistemicLevel: "L*",
    title: "Kalvopotentiaalin bioelektrinen koodi",
    title_en: "The bioelectric code of the membrane potential",
    mechanism:
      "Brownin ym. (2016) mukaan solun kalvopotentiaali (Vmem) toimii morfogeneettisen informaation kantajana. EMF-altistus depolarisoi kalvopotentiaalia → Vmem-gradientti häiriintyy → solujen proliferaatio- ja differentiaatiosignaalit muuttuvat. Levinin tutkimusryhmä (Tufts): bioelektrinen koodi ohjaa kudosten kehitystä ja regeneraatiota. Vmem-depolarisaatio → sammakoilla pään/hännän identiteetin kääntyminen.",
    mechanism_en:
      "According to Brown et al. (2016), the cell membrane potential (Vmem) functions as a carrier of morphogenetic information. EMF exposure depolarizes the membrane potential → the Vmem gradient is disrupted → cell proliferation and differentiation signals change. Levin's research group (Tufts): the bioelectric code governs tissue development and regeneration. Vmem depolarization → reversal of head/tail identity in frogs.",
    lindgrenInterpretation:
      "Vmem on biologisen aika-avaruuden paikallinen metrinen signaali. Lindgrenin kehyksessä kalvopotentiaali on Ā — taustakenttä joka määrää paikallisen geometrian. EMF-perturbointia muuttaa tätä paikallista geometriaa → solujen 'koordinaatisto' häiriintyy → positio-informaatio vioittuu. Tämä on suorin yhteys geometrian ja biologian välillä.",
    lindgrenInterpretation_en:
      "Vmem is the local metric signal of biological spacetime. In Lindgren's framework, the membrane potential is Ā — the background field that determines the local geometry. EMF perturbation changes this local geometry → the cells' 'coordinate system' is disrupted → positional information becomes corrupted. This is the most direct link between geometry and biology.",
    keyReferences: [
      {
        authors: "Brown ym. 2016",
        title: "Vmem depolarization and bioelectric signaling",
        journal: "Bioelectrochemistry",
        keyFinding: "Vmem-depolarisaatio muuttaa solujen morfogeneettistä koodia",
        keyFinding_en: "Vmem depolarization alters the cells' morphogenetic code",
      },
      {
        authors: "Levin 2014",
        title:
          "Molecular bioelectricity: how endogenous voltage potentials control cell behavior",
        journal: "Molecular Biology of the Cell 25(24)",
        keyFinding:
          "Bioelektrinen koodi ohjaa kudosten morfogeneesiä ja regeneraatiota",
        keyFinding_en:
          "The bioelectric code governs tissue morphogenesis and regeneration",
      },
    ],
    falsificationCondition:
      "Jos Vmem-muutokset eivät korreloi morfogeneettisten virheiden kanssa EMF-altistuksessa",
    falsificationCondition_en:
      "If Vmem changes do not correlate with morphogenetic errors under EMF exposure",
  },

  // TASO 7
  {
    id: "sdf",
    level: 7,
    label: "DNA-fragmentaatio (SDF)",
    label_en: "DNA fragmentation (SDF)",
    sublabel: "ROS → DNA-katko",
    sublabel_en: "ROS → DNA strand break",
    epistemicLevel: "E",
    title: "Siittiön DNA-vaurio",
    title_en: "Sperm DNA damage",
    mechanism:
      "ROS tuottaa yksi- ja kaksijuosteisia DNA-katkoja siittiöissä. Houston 2019: DNA-vaurio SÄILYY vaikka ROS palautuu 5 viikossa. Czerski 1979: kromosomivaurioita koko turvaraja-alueen läpi. SDF on kumulatiivinen ja osittain palautumaton.",
    mechanism_en:
      "ROS produces single- and double-strand DNA breaks in sperm. Houston 2019: DNA damage PERSISTS even though ROS recovers within 5 weeks. Czerski 1979: chromosomal damage throughout the entire 'safety limit' range. SDF is cumulative and partially irreversible.",
    recoveryAlpha: 0.2,
    recoveryTimescale:
      "kuukausia (uusi spermatogeneesisykli 74 pv, mutta kantasoluvaurio voi säilyä)",
    recoveryTimescale_en:
      "months (a new spermatogenesis cycle takes 74 days, but stem cell damage may persist)",
    keyReferences: [
      {
        authors: "Panagopoulos ym. 2025",
        title: "IFO-VGIC comprehensive review (131 studies)",
        journal: "Bioelectromagnetics",
        keyFinding: "Siittiövauriot (SDF, motiliteetti, viabiliteetti) raportoitu 131 tutkimuksen katsauksessa. IFO → Ca²⁺ → mitokondriaali ROS → siittiövauriot.",
        keyFinding_en:
          "Sperm damage (SDF, motility, viability) reported in a review of 131 studies. IFO → Ca²⁺ → mitochondrial ROS → sperm damage.",
      },
    ],
  },
  {
    id: "motility",
    level: 7,
    label: "Motiliteetti ↓",
    label_en: "Motility ↓",
    sublabel: "−8.1% (Yu 2021)",
    epistemicLevel: "E",
    title: "Siittiöiden liikkuvuuden heikkeneminen",
    title_en: "Decline in sperm motility",
    mechanism:
      "ROS ja SDF heikentävät siittiöiden progressiivista motiliteettia. Yu 2021 (IVF-laboratorio): motiliteetti −8.1% tunnin EMF-altistuksen jälkeen. Adeen kirja: Ca²⁺-kanava on siittiön navigoinnin avain — ilman sitä siittiö 'wriggles ineptly and goes nowhere.'",
    mechanism_en:
      "ROS and SDF impair progressive sperm motility. Yu 2021 (IVF laboratory): motility −8.1% after one hour of EMF exposure. Adee's book: the Ca²⁺ channel is the key to sperm navigation — without it, the sperm 'wriggles ineptly and goes nowhere.'",
    keyReferences: [],
  },
  {
    id: "concentration",
    level: 7,
    label: "Konsentraatio ↓",
    label_en: "Concentration ↓",
    sublabel: "−51% (1973–2018)",
    epistemicLevel: "E",
    title: "Siittiökonsentraation sekulaarilasku",
    title_en: "Secular decline in sperm concentration",
    mechanism:
      "Levine 2023: siittiökonsentraatio laskenut 51% vuodesta 1973. Lasku kiihtynyt 2000-luvulla. Leydigin solujen kumulatiivinen vaurio (ROS + epigeneettinen) → testosteronituotanto↓ → spermatogeneesi↓ → konsentraatio↓.",
    mechanism_en:
      "Levine 2023: sperm concentration has declined 51% since 1973. The decline has accelerated since the 2000s. Cumulative damage to Leydig cells (ROS + epigenetic) → testosterone production↓ → spermatogenesis↓ → concentration↓.",
    recoveryAlpha: 0.3,
    recoveryTimescale:
      "kuukausia–vuosia (Leydigin solujen osittainen palautuminen)",
    recoveryTimescale_en: "months to years (partial recovery of Leydig cells)",
    keyReferences: [
      {
        authors: "Panagopoulos ym. 2025",
        title: "IFO-VGIC comprehensive review (131 studies)",
        journal: "Bioelectromagnetics",
        keyFinding: "Siittiökonsentraation lasku raportoitu 131 tutkimuksen katsauksessa. IFO → Ca²⁺ → ROS → Leydigin soluvaurio → konsentraatio↓.",
        keyFinding_en:
          "Decline in sperm concentration reported in a review of 131 studies. IFO → Ca²⁺ → ROS → Leydig cell damage → concentration↓.",
      },
    ],
  },
  {
    id: "ovulation",
    level: 7,
    label: "Ovulaation ajoitus ↓",
    label_en: "Ovulation timing ↓",
    sublabel: "CRY + VGIC → ajoitusvirhe",
    sublabel_en: "CRY + VGIC → timing error",
    epistemicLevel: "M|C",
    title: "Ovulaation bioelektrisen ajoituksen häiriö",
    title_en: "Disruption of ovulation's bioelectric timing",
    mechanism:
      "Ovulaatio on bioelektrinen tapahtuma (Burr 1937: jännitegradientin nousu ovulaation hetkellä). CRY-häiriö muuttaa kellogeenien ekspressiota gonadikudoksessa → ovulaation ajoitus siirtyy. Samanaikaisesti VGIC-häiriö häiritsee ionikanavakoordinaatiota jota ovulaatio vaatii (kloridi-ionien konsentraatiopiikki). EMF → aromataasin häiriö → estrogeenisynteesi↓ → follikulaarinen kehitys↓.",
    mechanism_en:
      "Ovulation is a bioelectric event (Burr 1937: a voltage-gradient spike at the moment of ovulation). CRY disruption alters clock gene expression in gonadal tissue → the timing of ovulation shifts. At the same time, VGIC disruption interferes with the ion channel coordination that ovulation requires (a chloride-ion concentration spike). EMF → aromatase disruption → estrogen synthesis↓ → follicular development↓.",
    keyReferences: [],
  },
  {
    id: "implantation",
    level: 7,
    label: "Implantaatio ↓",
    label_en: "Implantation ↓",
    sublabel: "Mikrobiomi + bioelektrinen",
    sublabel_en: "Microbiome + bioelectric",
    epistemicLevel: "C",
    title: "Implantaation heikkeneminen",
    title_en: "Impaired implantation",
    mechanism:
      "Reproductive tract -mikrobiomi (vaginal Lactobacillus-dominanssi, endometrial microbiota) vaikuttaa implantaatioon. EMF → suoliston ja reproduktiokanavan mikrobiomihäiriö (polku E via dysbiosis) → tulehdus → endometriumin reseptiivisyys↓. Bioelektrinen koodi (Levin) ohjaa implantaatioikkunaa — EMF häiritsee tätä.",
    mechanism_en:
      "The reproductive tract microbiome (vaginal Lactobacillus dominance, endometrial microbiota) affects implantation. EMF → disruption of the gut and reproductive tract microbiome (Pathway E via dysbiosis) → inflammation → endometrial receptivity↓. The bioelectric code (Levin) governs the implantation window — EMF disrupts this.",
    keyReferences: [],
  },
  {
    id: "sexratio",
    level: 7,
    label: "Sukupuolisuhde Δ",
    label_en: "Sex ratio Δ",
    sublabel: "X-siittiö herkempi",
    sublabel_en: "X-sperm more sensitive",
    epistemicLevel: "E",
    title: "Sukupuolisuhteen siirtymä",
    title_en: "Shift in sex ratio",
    mechanism:
      "X-kromosomin kantavat siittiöt ovat suurempia ja hitaampia kuin Y-kantavat. Ca²⁺-kanavahäiriö vaikuttaa enemmän isompaan X-siittiöön → Y-siittiöt pääsevät suhteessa useammin perille → poikia enemmän. Quebec Hydro (Becker 1985): 6:1 poika/tyttö-suhde sähkötyöntekijöiden lapsilla. Norjan laivaston data (Magerøy 2006): lineaarinen trendi.",
    mechanism_en:
      "X-chromosome-bearing sperm are larger and slower than Y-bearing sperm. Ca²⁺ channel disruption affects the larger X-sperm more → Y-sperm proportionally reach the egg more often → more boys are born. Quebec Hydro (Becker 1985): a 6:1 boy/girl ratio among electrical workers' children. Norwegian navy data (Magerøy 2006): a linear trend.",
    lindgrenInterpretation:
      "X- ja Y-siittiöt ovat partikkeleita eri massoilla samassa metrisessä kentässä. Niiden geodeeseejä (liikeatoja) metrinen perturbointia muuttaa eri verran koska vuorovaikutuspoikkipinta on eri. cos(θ)-riippuvuus ennustaa lisäksi, että vaikutus riippuu EMF:n suunnasta suhteessa reproduktiokanavaan.",
    lindgrenInterpretation_en:
      "X- and Y-sperm are particles of different mass in the same metric field. The metric perturbation changes their geodesics (trajectories) to different degrees because their interaction cross-section differs. The cos(θ) dependence further predicts that the effect depends on the direction of the EMF relative to the reproductive tract.",
    keyReferences: [],
  },
  {
    id: "testosterone",
    level: 7,
    label: "Testosteroni ↓ sekulaari",
    label_en: "Testosterone ↓ secular",
    sublabel: "−1%/vuosi (Travison 2007)",
    sublabel_en: "−1%/year (Travison 2007)",
    epistemicLevel: "E",
    title: "Testosteronin sekulaarilasku",
    title_en: "Secular decline in testosterone",
    mechanism:
      "Travison 2007: miesten testosteronitasot laskevat −1%/vuosi ikävakioituna. Lasku ei selity painonnousulla, tupakoinnin vähenemisellä tai muilla tunnetuilla tekijöillä. HPA-akselin krooninen aktivaatio (polku D) → kortisoli↑ → HPG-akselin suppressio → testosteronituotanto↓. Leydigin solujen kumulatiivinen ROS-vaurio (polku A) heikentää steroidogeneesiä.",
    mechanism_en:
      "Travison 2007: men's testosterone levels are declining −1%/year, age-adjusted. The decline is not explained by weight gain, reduced smoking, or other known factors. Chronic activation of the HPA axis (Pathway D) → cortisol↑ → suppression of the HPG axis → testosterone production↓. Cumulative ROS damage to Leydig cells (Pathway A) impairs steroidogenesis.",
    recoveryAlpha: 0.5,
    recoveryTimescale: "kuukausia (HPA-normalisoituminen) – vuosia (Leydig-palautuminen)",
    recoveryTimescale_en:
      "months (HPA normalization) to years (Leydig cell recovery)",
    keyReferences: [
      {
        authors: "Travison ym. 2007",
        title: "A population-level decline in serum testosterone levels in American men",
        journal: "J. Clin. Endocrinol. Metab. 92(1)",
        keyFinding: "Ikävakioitu testosteroni laskee −1%/vuosi 1980-luvulta",
        keyFinding_en:
          "Age-adjusted testosterone has declined −1%/year since the 1980s",
      },
    ],
  },
  {
    id: "amh",
    level: 7,
    label: "AMH / munasolureservi ↓",
    label_en: "AMH / ovarian reserve ↓",
    sublabel: "AFC↓, reservi ehtyyy aikaisemmin",
    sublabel_en: "AFC↓, reserve depletes earlier",
    epistemicLevel: "C",
    title: "Munasolureservin ennenaikainen ehtyminen",
    title_en: "Premature depletion of ovarian reserve",
    mechanism:
      "Anti-Müllerian hormoni (AMH) on primaaristen follikkelien markkeri. AMH-tasot ovat laskeneet sekulaarisesti: nykynaisten AMH vastaa edellisten sukupolvien 5–10 vuotta vanhempien naisten tasoa. ROS-vaurio (polku A) vaurioittaa primordiaalisia follikkeleita. CRY-häiriö (polku B) kiihdyttää follikulaarista rekrytointia → reservi ehtyyy nopeammin. mTOR-hyperaktivaatio kiihdyttää follikulaarista loppuunpalamista.",
    mechanism_en:
      "Anti-Müllerian hormone (AMH) is a marker of primary follicles. AMH levels have declined secularly: today's women have AMH levels matching women 5–10 years older in previous generations. ROS damage (Pathway A) harms primordial follicles. CRY disruption (Pathway B) accelerates follicular recruitment → the reserve depletes faster. mTOR hyperactivation accelerates follicular burnout.",
    keyReferences: [
      {
        authors: "Kelsey ym. 2012",
        title: "A validated age-related model of total count of non-growing follicles",
        journal: "PLoS ONE 7(10)",
        keyFinding: "Munasolujen lukumäärämallit ja reservin ehtymisdynamiikka",
        keyFinding_en:
          "Models of oocyte counts and reserve-depletion dynamics",
      },
    ],
  },
  {
    id: "mtor",
    level: 7,
    label: "mTOR-hyperaktivaatio",
    label_en: "mTOR hyperactivation",
    sublabel: "Ca²⁺ → mTOR↑ → autofagia↓",
    sublabel_en: "Ca²⁺ → mTOR↑ → autophagy↓",
    epistemicLevel: "M|C",
    title: "mTOR-reitin ylisäätely EMF-altistuksessa",
    title_en: "mTOR pathway upregulation under EMF exposure",
    mechanism:
      "VGIC-aktivaation tuottama Ca²⁺-influksi aktivoi mTOR-reitin (mammalian target of rapamycin). mTOR-hyperaktivaatio → autofagian suppressio → seneskenttien solujen kertyminen → krooninen tulehdus. Sempou-reitti: EMF → VGIC → Ca²⁺↑ → mTOR↑ → kolme epidemiaa: kiihtynyt ikääntyminen, hedelmällisyyden lasku, syöpäriskin kasvu.",
    mechanism_en:
      "Ca²⁺ influx from VGIC activation engages the mTOR pathway (mammalian target of rapamycin). mTOR hyperactivation → autophagy suppression → senescent cell accumulation → chronic inflammation. Sempou pathway: EMF → VGIC → Ca²⁺↑ → mTOR↑ → three epidemics: accelerated aging, fertility decline, cancer risk increase.",
    lindgrenInterpretation:
      "mTOR on solunsisäinen integraattori joka yhdistää useita metrisestä perturbointiasta syntyviä signaaleja yhdeksi soluvasteeksi. Geometrinen perturbointia → Ca²⁺-dynamiikan muutos → mTOR-tasapainon siirtymä. Metformiinin pitkäikäisyyshyöty on geometrisessa kehyksessä anti-perturbointia: AMPK-aktivaatio kumoaa mTOR-hyperaktivaatiota.",
    lindgrenInterpretation_en:
      "mTOR is an intracellular integrator that unifies multiple signals arising from metric perturbation into a single cellular response. Geometric perturbation → Ca²⁺ dynamics shift → mTOR equilibrium displacement. Metformin's longevity benefit is, in the geometric framework, anti-perturbation: AMPK activation counteracts mTOR hyperactivation.",
    quantitative:
      "mTOR_eff = (1.0 + 0.25 × EMF) × Π(1 − reduction_i)\naging_rate = mTOR_eff^0.7\n\nReduction factors:\nMetformiini: 0.30\nRapamysiini: 0.85\nKalorinrajoitus: 0.20\nAjoittainen paasto: 0.10",
    quantitative_en:
      "mTOR_eff = (1.0 + 0.25 × EMF) × Π(1 − reduction_i)\naging_rate = mTOR_eff^0.7\n\nReduction factors:\nMetformin: 0.30\nRapamycin: 0.85\nCaloric restriction: 0.20\nIntermittent fasting: 0.10",
    bermComponent: "biology/mtor.py",
    keyReferences: [
      {
        authors: "Saxton & Sabatini 2017",
        title: "mTOR Signaling in Growth, Metabolism, and Disease",
        journal: "Cell 168(6)",
        keyFinding: "mTOR integroi ravinteet, energian ja kasvutekijät solun kasvuun",
        keyFinding_en: "mTOR integrates nutrients, energy, and growth factors into cell growth",
      },
    ],
    falsificationCondition:
      "Jos mTOR-inhibiittorit (rapamysiini) eivät vähennä EMF:n biologisia vaikutuksia",
    falsificationCondition_en:
      "If mTOR inhibitors (rapamycin) do not reduce the biological effects of EMF",
  },
  {
    id: "sleep",
    level: 7,
    label: "Unihäiriö",
    label_en: "Sleep disruption",
    sublabel: "Melatoniini↓ → uni↓ → GnRH↓",
    sublabel_en: "Melatonin↓ → sleep↓ → GnRH↓",
    epistemicLevel: "E",
    title: "Unen laadun heikkeneminen ja hormonaaliset seuraukset",
    title_en: "Sleep quality decline and hormonal consequences",
    mechanism:
      "Melatoniinisuppressio (polku C) → unisyklin häiriö → syvän unen väheneminen. Syvä uni on kriittinen GnRH-pulsaation ja kasvuhormonin erityksen kannalta. Leproult & Van Cauter 2011: 1 viikko unirajoitusta (5h/yö) → testosteroni −15%. Nuorten aikuisten unen kesto on lyhentynyt ~1h/yö 1970-luvulta. Älypuhelimen sininen valo → melatoniinisuppressio → viivästynyt unilatenssi.",
    mechanism_en:
      "Melatonin suppression (pathway C) → sleep cycle disruption → decreased deep sleep. Deep sleep is critical for GnRH pulsation and growth hormone secretion. Leproult & Van Cauter 2011: 1 week of sleep restriction (5h/night) → testosterone −15%. Young adults' sleep duration has shortened ~1h/night since the 1970s. Smartphone blue light → melatonin suppression → delayed sleep latency.",
    keyReferences: [
      {
        authors: "Leproult & Van Cauter 2011",
        title: "Effect of 1 week of sleep restriction on testosterone levels",
        journal: "JAMA 305(21)",
        keyFinding: "5h unirajoitus → T −15%, efekti vastaa 10–15 vuoden ikääntymistä",
        keyFinding_en: "5h sleep restriction → T −15%, effect equivalent to 10–15 years of aging",
      },
    ],
  },
  {
    id: "miscarriage",
    level: 7,
    label: "Keskenmeno ↑",
    label_en: "Miscarriage ↑",
    sublabel: "SDF + implantaatio → varhainen menetys",
    sublabel_en: "SDF + implantation → early loss",
    epistemicLevel: "C",
    title: "Keskenmenoriskin kasvu",
    title_en: "Increased miscarriage risk",
    mechanism:
      "Kohonnut SDF (DNA-fragmentaatio) siittiöissä → hedelmöitys voi tapahtua mutta embryon kehitys häiriintyy varhaisessa vaiheessa. Heikentynyt implantaatio (endometriumin reseptiivisyys↓, mikrobiomihäiriö) → biokemiallisten raskauksien menetys. Kliinisesti tunnistettujen keskenmenojen osuus on kasvanut. Varhaiset (pre-kliiniset) menetykset jäävät usein havaitsematta.",
    mechanism_en:
      "Elevated SDF (DNA fragmentation) in sperm → fertilization may occur but embryo development is disrupted early. Impaired implantation (endometrial receptivity↓, microbiome disruption) → biochemical pregnancy loss. The proportion of clinically recognized miscarriages has increased. Early (pre-clinical) losses often go undetected.",
    keyReferences: [],
  },
  {
    id: "epigenetic",
    level: 7,
    label: "Epigeneettinen periytyminen",
    label_en: "Epigenetic inheritance",
    sublabel: "Sperm methylome → F1, F2",
    epistemicLevel: "C",
    title: "Sukupolvien välinen epigeneettinen välittyminen",
    title_en: "Transgenerational epigenetic transmission",
    mechanism:
      "ROS-vaurio (polku A) muuttaa siittiöiden metylaatioprofiilia. Muuttuneet epigeneettiset merkit periytyvät F1- ja F2-sukupolviin. Hiiritutkimuksissa: isien ympäristöaltistus muuttaa jälkeläisten lisääntymiskykyä. EMF-altistuksen epigeneettiset vaikutukset kumuloituvat sukupolvien yli — jokainen sukupolvi altistuu enemmän JA perii edellisen sukupolven epigeneettiset vauriot.",
    mechanism_en:
      "ROS damage (pathway A) alters sperm methylation profiles. Modified epigenetic marks are inherited by F1 and F2 generations. Mouse studies: paternal environmental exposure changes offspring reproductive capacity. Epigenetic effects of EMF exposure accumulate across generations — each generation is exposed more AND inherits the previous generation's epigenetic damage.",
    lindgrenInterpretation:
      "Epigeneettinen periytyminen on metrisen historian biologinen tallenne. Solujen metriikka (Vmem, ionidynamiikka) ohjaa geeniekspressiota epigeneettisesti. Muuttunut metriikka → muuttunut epigeneettinen tila → muuttunut perusta seuraavan sukupolven metriikalle. Tämä on geometrinen positiivinen palautesilmukka biologisella aikaskaalalla.",
    lindgrenInterpretation_en:
      "Epigenetic inheritance is the biological record of metric history. Cellular metrics (Vmem, ion dynamics) guide gene expression epigenetically. Altered metrics → altered epigenetic state → altered foundation for the next generation's metrics. This is a geometric positive feedback loop on a biological timescale.",
    recoveryAlpha: 0.1,
    recoveryTimescale: "sukupolvia (3–5 sukupolvea täydelliseen palautumiseen)",
    recoveryTimescale_en: "generations (3–5 generations for full recovery)",
    keyReferences: [
      {
        authors: "Skinner ym. 2019",
        title: "Transgenerational epigenetic inheritance",
        journal: "Nature Reviews Endocrinology",
        keyFinding: "Ympäristöaltistukset periytyvät 3+ sukupolven yli epigeneettisesti",
        keyFinding_en: "Environmental exposures are inherited epigenetically across 3+ generations",
      },
    ],
  },

  // TASO 8
  {
    id: "fecundability_bio",
    level: 8,
    label: "Biologinen fekunditeetti",
    label_en: "Biological fecundity",
    sublabel: "F_bio = sperm × oocyte × tract",
    epistemicLevel: "E",
    title: "Biologinen hedelmöityskyky",
    title_en: "Biological fecundability",
    mechanism:
      "Kaikkien biologisten polkujen konvergenssi: siittiölaatu (motiliteetti, konsentraatio, SDF) × munasolun laatu (AMH, AFC, ovulaation ajoitus) × reproduktiokanavan eheys (mikrobiomi, implantaatioikkuna). TTP (time-to-pregnancy) on suorin mittari.",
    mechanism_en:
      "Convergence of all biological pathways: sperm quality (motility, concentration, SDF) × oocyte quality (AMH, AFC, ovulation timing) × reproductive tract integrity (microbiome, implantation window). TTP (time-to-pregnancy) is the most direct measure.",
    keyReferences: [],
  },
  {
    id: "motivation",
    level: 8,
    label: "Lisääntymismotivaatio",
    label_en: "Reproductive motivation",
    sublabel: "M = f(T, OT, DA, kortisoli)",
    sublabel_en: "M = f(T, OT, DA, cortisol)",
    epistemicLevel: "E",
    title: "Endokriinipohjainen lisääntymismotivaatio",
    title_en: "Endocrine-based reproductive motivation",
    mechanism:
      "Testosteroni (seksuaalinen motivaatio), oksitosiini (kiintymys/pariside), dopamiini (palkkio/tavoittelu), kortisoli (stressieste). Kaikki neljä muuttuvat EMF-altistuksessa samanaikaisesti: T↓ (Travison), OT↓ (L. reuteri -kadon kautta), DA↓ (striataaliset muutokset), kortisoli↑ (HPA-aktivaatio). Multiplikatiivinen lukko: F_bio × M_repro — jos kumpikaan on nolla, syntymähazardi on nolla.",
    mechanism_en:
      "Testosterone (sexual motivation), oxytocin (attachment/pair bonding), dopamine (reward/seeking), cortisol (stress barrier). All four change simultaneously under EMF exposure: T↓ (Travison), OT↓ (via L. reuteri loss), DA↓ (striatal changes), cortisol↑ (HPA activation). Multiplicative lock: F_bio × M_repro — if either is zero, birth hazard is zero.",
    lindgrenInterpretation:
      "Motivaatiokerros on bioelektrisen tilan systeeminen seuraus. Hypothalamus-aivolisäke-gonadi -akseli on ionikanavadynamiikan säätelemä ketju. EMF muuttaa geometriaa → ionidynamiikka muuttuu → hormonitasot muuttuvat → käyttäytyminen muuttuu. Calhounin Universe 25 'Beautiful Ones' -ilmiö (vetäytyminen lisääntymisestä) on tämän ääriesimerkki.",
    lindgrenInterpretation_en:
      "The motivation layer is a systemic consequence of the bioelectric state. The hypothalamus-pituitary-gonad axis is a chain regulated by ion channel dynamics. EMF alters geometry → ion dynamics change → hormone levels change → behavior changes. Calhoun's Universe 25 'Beautiful Ones' phenomenon (withdrawal from reproduction) is an extreme example of this.",
    keyReferences: [],
  },
  {
    id: "art",
    level: 8,
    label: "Avustettu lisääntyminen",
    label_en: "Assisted reproduction",
    sublabel: "IVF/ICSI → osittainen kompensaatio",
    sublabel_en: "IVF/ICSI → partial compensation",
    epistemicLevel: "E",
    title: "Avustetun lisääntymisen kompensaatiovaikutus",
    title_en: "Compensatory effect of assisted reproduction",
    mechanism:
      "IVF ja ICSI ohittavat osan biologisen fekundabiliteetin esteistä: motiliteetti↓ ja konsentraatio↓ eivät estä ICSI:tä, ovariaalistimulaatio kompensoi osittain AMH↓:ää. Kuitenkin ART ei korjaa: SDF:ää (DNA-vaurio siirtyy embryoon), epigeneettisiä muutoksia, implantaation bioelektristä koodia. ART:n osuus synnytyksistä: Israel 5%, Tanska 10%. ART-riippuvuus kasvaa kun luonnollinen fekundabiliteetti laskee.",
    mechanism_en:
      "IVF and ICSI bypass some biological fecundability barriers: motility↓ and concentration↓ do not prevent ICSI, ovarian stimulation partially compensates for AMH↓. However, ART does not fix: SDF (DNA damage transfers to embryo), epigenetic changes, implantation bioelectric code. ART share of births: Israel 5%, Denmark 10%. ART dependency grows as natural fecundability declines.",
    keyReferences: [],
  },

  // TASO 9
  {
    id: "fecundability",
    level: 9,
    label: "Fekundabiliteettiaste",
    label_en: "Fecundability rate",
    sublabel: "F_bio × M_repro",
    epistemicLevel: "E",
    title: "Todennäköisyys hedelmöitykselle per sykli",
    title_en: "Per-cycle probability of conception",
    mechanism:
      "Fekundabiliteettiaste = biologinen fekunditeetti × motivaatio × yritystodennäköisyys. TTP (time-to-pregnancy) = 1/fekundabiliteettiaste. PRESTO-kohortti mittaa tätä prospektiivisesti.",
    mechanism_en:
      "Fecundability rate = biological fecundity × motivation × attempt probability. TTP (time-to-pregnancy) = 1/fecundability rate. The PRESTO cohort measures this prospectively.",
    keyReferences: [],
  },
  {
    id: "asfr",
    level: 9,
    label: "ASFR(ikä)",
    label_en: "ASFR(age)",
    sublabel: "Ikäkohtainen hedelmällisyys",
    sublabel_en: "Age-specific fertility",
    epistemicLevel: "E",
    title: "Ikäkohtainen hedelmällisyysluku",
    title_en: "Age-specific fertility rate",
    mechanism:
      "ASFR = fekundabiliteettiaste × yritystodennäköisyys(ikä) × (1 − keskenmenoriski(ikä)). Eri ikäryhmät altistuvat eri kumulatiiviselle EMF:lle (kohortti-ikävaikutus). 15–19-vuotiaat: koko elämä EMF:ssä syntyneet. 35–39-vuotiaat: lapsuus ennen mobiilivallankumousta.",
    mechanism_en:
      "ASFR = fecundability rate × attempt probability(age) × (1 − miscarriage risk(age)). Different age groups are exposed to different cumulative EMF (cohort-age effect). 15–19 year-olds: born into lifelong EMF. 35–39 year-olds: childhood before the mobile revolution.",
    keyReferences: [],
  },
  {
    id: "tfr",
    level: 9,
    label: "TFR",
    sublabel: "Kokonaishedelmällisyysluku",
    sublabel_en: "Total fertility rate",
    epistemicLevel: "E",
    title: "Kokonaishedelmällisyysluku",
    title_en: "Total fertility rate",
    mechanism:
      "TFR = 5 × Σ ASFR(ikäryhmä). Globaali TFR: 4.84 (1950) → 2.23 (2021). GBD 2024 ennuste: alle 2.1 (korvautumistaso) lähes kaikissa maissa 2050 mennessä. Etelä-Korea: 0.72 (2023). Pronatalistiset interventiot ($200+ miljardia globaalisti) eivät ole kääntäneet trendiä yhdessäkään maassa pysyvästi.",
    mechanism_en:
      "TFR = 5 × Σ ASFR(age group). Global TFR: 4.84 (1950) → 2.23 (2021). GBD 2024 forecast: below 2.1 (replacement level) in nearly all countries by 2050. South Korea: 0.72 (2023). Pronatalist interventions ($200+ billion globally) have not permanently reversed the trend in any country.",
    keyReferences: [],
  },
  {
    id: "childlessness",
    level: 9,
    label: "Tahdoton lapsettomuus ↑",
    label_en: "Involuntary childlessness ↑",
    sublabel: "12–24 kk yrittämisen jälkeen",
    sublabel_en: "After 12–24 months of trying",
    epistemicLevel: "E",
    title: "Tahdottoman lapsettomuuden yleistyminen",
    title_en: "Rising involuntary childlessness",
    mechanism:
      "WHO: 1/6 parista kärsii hedelmättömyydestä maailmanlaajuisesti. Trendi on kasvava. TTP (time-to-pregnancy) pitenee → yhä useampi pari ei koskaan saavuta raskautta luonnollisesti. Biologinen kello on muuttumaton mutta biologinen ikä etenee nopeammin: 30-vuotiaan naisen munasolureservi vastaa edellisten sukupolvien 35-vuotiaan tasoa.",
    mechanism_en:
      "WHO: 1/6 couples experience infertility worldwide. The trend is increasing. TTP (time-to-pregnancy) is lengthening → more couples never achieve pregnancy naturally. The biological clock is unchanged but biological age advances faster: a 30-year-old woman's ovarian reserve now corresponds to that of a 35-year-old in previous generations.",
    keyReferences: [
      {
        authors: "WHO 2023",
        title: "Infertility prevalence estimates",
        journal: "WHO",
        keyFinding:
          "1 kuudesta parista: hedelmättömyys on globaali kansanterveyshaaste",
        keyFinding_en:
          "1 in 6 couples: infertility is a global public health challenge",
      },
    ],
  },

  // TASO 10
  {
    id: "feedback",
    level: 10,
    label: "Takaisinkytkentä",
    label_en: "Feedback loop",
    sublabel: "TFR↓ → urbanisaatio↑ → EMF↑",
    sublabel_en: "TFR↓ → urbanization↑ → EMF↑",
    epistemicLevel: "M|C",
    title: "Positiivinen palautesilmukka",
    title_en: "Positive feedback loop",
    mechanism:
      "TFR:n lasku → pienemmät perheet → muutto kaupunkiin (koulu, työ) → kaupungistuminen↑ → tukiasematiheys↑ → ambient-EMF↑ → lisää altistusta → TFR↓ edelleen. Tämä on itsevahvistuva kierre jota on vaikea katkaista koska jokainen kierros vahvistaa seuraavaa.",
    mechanism_en:
      "TFR decline → smaller families → migration to cities (education, work) → urbanization↑ → base station density↑ → ambient EMF↑ → more exposure → TFR↓ further. This is a self-reinforcing cycle that is difficult to break because each round amplifies the next.",
    lindgrenInterpretation:
      "Metrinen takaisinkytkentä: biologinen vaste (TFR↓) muuttaa ympäristöä (kaupungistuminen) joka muuttaa metriikkaa (ambient-Ā↑) joka vahvistaa biologista vastetta. Tämä on geometrinen positiivinen palautesilmukka — harvinainen mutta ei ennennäkemätön fysiikassa (gravitaatioaaltojen itsevuorovaikutus yleisessä suhteellisuusteoriassa).",
    lindgrenInterpretation_en:
      "Metric feedback: the biological response (TFR↓) changes the environment (urbanization) which changes the metric (ambient Ā↑) which amplifies the biological response. This is a geometric positive feedback loop — rare but not unprecedented in physics (gravitational wave self-interaction in general relativity).",
    keyReferences: [],
  },
  {
    id: "urbanization",
    level: 10,
    label: "Kaupungistuminen",
    label_en: "Urbanization",
    sublabel: "TFR↓ → muutto kaupunkiin",
    sublabel_en: "TFR↓ → migration to cities",
    epistemicLevel: "E",
    title: "Kaupungistuminen takaisinkytkentänä",
    title_en: "Urbanization as feedback",
    mechanism:
      "TFR:n lasku → pienemmät perheet → muutto kaupunkiin (koulu, työ, palvelut). Globaali kaupungistumisaste: 56% (2020) → 68% ennuste (2050). Kaupungissa tukiasematiheys on 10–100× maaseudun. Wi-Fi-verkkojen tiheys kaksinkertaistuu alle 2 vuodessa kaupungeissa. Jokainen uusi asukas lisää ambient-EMF-tarvetta.",
    mechanism_en:
      "TFR decline → smaller families → migration to cities (education, work, services). Global urbanization rate: 56% (2020) → 68% forecast (2050). Urban base station density is 10–100× rural. Wi-Fi network density doubles in under 2 years in cities. Each new resident increases ambient EMF demand.",
    keyReferences: [
      {
        authors: "UN DESA 2019",
        title: "World Urbanization Prospects",
        journal: "United Nations",
        keyFinding:
          "68% maailman väestöstä asuu kaupungeissa vuonna 2050",
        keyFinding_en:
          "68% of world population will live in cities by 2050",
      },
    ],
  },
  {
    id: "device_adoption",
    level: 10,
    label: "Laiteadoptio ↑",
    label_en: "Device adoption ↑",
    sublabel: "5G, IoT, puettavat laitteet",
    sublabel_en: "5G, IoT, wearable devices",
    epistemicLevel: "E",
    title: "Uusien laitetyyppien käyttöönotto",
    title_en: "Adoption of new device types",
    mechanism:
      "Älypuhelinpenetraatio kasvaa edelleen (2024: 6.9 miljardia). Uudet laitetyypit: AirPods (2016→), älykellot, VR-lasit, IoT-sensorit. 5G:n mm-aaltoalueet vaativat tiheämpää tukiasemaverkkoa (small cells). Starlink ja muut satelliittiverkot laajentavat kattavuuden alueille joilla ei aiemmin ollut ambient-EMF:ää. Teknologinen takaisinkytkentä: laitteiden kysyntä → infrastruktuuri → ambient-EMF↑.",
    mechanism_en:
      "Smartphone penetration continues to grow (2024: 6.9 billion). New device types: AirPods (2016→), smartwatches, VR headsets, IoT sensors. 5G mm-wave bands require denser base station networks (small cells). Starlink and other satellite networks extend coverage to areas that previously had no ambient EMF. Technological feedback: device demand → infrastructure → ambient EMF↑.",
    keyReferences: [
      {
        authors: "GSMA Intelligence 2024",
        title: "Mobile Economy 2024",
        journal: "GSMA",
        keyFinding:
          "6.9 miljardia matkapuhelinliittymää, 5G-käyttäjät 1.9 miljardia",
        keyFinding_en:
          "6.9 billion mobile subscriptions, 5G users 1.9 billion",
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
    label_en: "geometric consequence",
    epistemicLevel: "M",
    priority: "primary",
  },
  // Taso 2→3
  {
    from: "chi",
    to: "two_channel",
    label: "kytkentäfunktio",
    label_en: "coupling function",
    epistemicLevel: "M",
    priority: "primary",
  },
  {
    from: "ambient",
    to: "two_channel",
    label: "Ā (tausta)",
    label_en: "Ā (background)",
    epistemicLevel: "E",
    priority: "primary",
  },
  {
    from: "personal",
    to: "two_channel",
    label: "a (perturbointia)",
    label_en: "a (perturbation)",
    epistemicLevel: "E",
    priority: "primary",
  },
  // Taso 3→4 (neljä kanavaa)
  {
    from: "two_channel",
    to: "channel_elf",
    label: "f < 300 Hz",
    epistemicLevel: "E",
    priority: "primary",
  },
  {
    from: "two_channel",
    to: "channel_if",
    label: "300 Hz – 10 MHz",
    epistemicLevel: "E",
    priority: "primary",
  },
  {
    from: "two_channel",
    to: "channel_rf",
    label: "> 10 MHz",
    epistemicLevel: "E",
    priority: "primary",
  },
  // Taso 4→5 (kanavat → kalvofysiikka)
  {
    from: "channel_elf",
    to: "membrane",
    label: "kalvomodulaatio",
    label_en: "membrane modulation",
    epistemicLevel: "E",
    priority: "primary",
  },
  {
    from: "channel_if",
    to: "vgic",
    label: "IFO + DEP",
    epistemicLevel: "E",
    priority: "primary",
  },
  {
    from: "membrane",
    to: "vgic",
    label: "kentänmuutos kalvolla",
    label_en: "field change at membrane",
    epistemicLevel: "E",
    priority: "primary",
  },
  // Taso 5→6
  {
    from: "vgic",
    to: "pathway_a",
    label: "Ca²⁺ influx",
    derivative: "∂ROS/∂Ca²⁺ > 0",
    epistemicLevel: "E",
    priority: "primary",
  },
  {
    from: "channel_rf",
    to: "pathway_b",
    label: "RPM → spin-kemia",
    label_en: "RPM → spin chemistry",
    derivative: "∂CRY/∂B_RF ≠ 0",
    epistemicLevel: "E",
    priority: "primary",
  },
  {
    from: "channel_rf",
    to: "pathway_c",
    label: "RF → pineaali",
    label_en: "RF → pineal gland",
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
    label_en: "ROS → DNA strand break",
    epistemicLevel: "E",
    priority: "primary",
  },
  {
    from: "sdf",
    to: "motility",
    label: "SDF → motiliteetti↓",
    label_en: "SDF → motility↓",
    epistemicLevel: "E",
  },
  {
    from: "pathway_a",
    to: "concentration",
    label: "ROS → Leydig-vaurio",
    label_en: "ROS → Leydig damage",
    epistemicLevel: "E",
  },
  {
    from: "pathway_b",
    to: "ovulation",
    label: "kellogeenihäiriö",
    label_en: "clock gene disruption",
    epistemicLevel: "E",
  },
  {
    from: "pathway_a",
    to: "ovulation",
    label: "aromataasin häiriö",
    label_en: "aromatase disruption",
    epistemicLevel: "M|C",
  },
  {
    from: "pathway_a",
    to: "sexratio",
    label: "X>Y herkkyys",
    label_en: "X>Y sensitivity",
    epistemicLevel: "E",
  },
  {
    from: "pathway_e",
    to: "implantation",
    label: "kemikaalikuorma",
    label_en: "chemical burden",
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
    label_en: "melatonin → GnRH↓",
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
    label_en: "Σ age groups",
    epistemicLevel: "E",
    priority: "primary",
  },
  {
    from: "sexratio",
    to: "tfr",
    label: "itsenäinen kanava",
    label_en: "independent channel",
    epistemicLevel: "E",
  },
  // Taso 8→9
  {
    from: "tfr",
    to: "feedback",
    label: "TFR↓ → urbanisaatio↑",
    label_en: "TFR↓ → urbanization↑",
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
    label_en: "HPG suppression",
    epistemicLevel: "E",
  },
  {
    from: "pathway_a",
    to: "amh",
    label: "ROS → follikkeli",
    label_en: "ROS → follicle",
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
    label_en: "follicular burnout",
    epistemicLevel: "M|C",
  },
  {
    from: "pathway_c",
    to: "sleep",
    label: "melatoniini↓",
    label_en: "melatonin↓",
    epistemicLevel: "E",
  },
  {
    from: "sdf",
    to: "miscarriage",
    label: "DNA-vaurio",
    label_en: "DNA damage",
    epistemicLevel: "C",
  },
  {
    from: "pathway_a",
    to: "epigenetic",
    label: "ROS → metylaatio",
    label_en: "ROS → methylation",
    epistemicLevel: "C",
  },
  {
    from: "pathway_f",
    to: "implantation",
    label: "bioelektrinen koodi",
    label_en: "bioelectric code",
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
    label_en: "sleep↓ → hormones↓",
    epistemicLevel: "E",
  },
  { from: "amh", to: "fecundability_bio", epistemicLevel: "C" },
  {
    from: "epigenetic",
    to: "fecundability_bio",
    label: "transgenerationaalinen",
    label_en: "transgenerational",
    epistemicLevel: "C",
  },
  {
    from: "fecundability_bio",
    to: "art",
    label: "biologinen lasku → ART",
    label_en: "biological decline → ART",
    epistemicLevel: "E",
  },
  // Taso 7→8 (uudet)
  {
    from: "art",
    to: "fecundability",
    label: "osittainen kompensaatio",
    label_en: "partial compensation",
    epistemicLevel: "E",
  },
  {
    from: "miscarriage",
    to: "asfr",
    label: "raskausmenetys",
    label_en: "pregnancy loss",
    epistemicLevel: "C",
  },
  {
    from: "fecundability",
    to: "childlessness",
    label: "matala p(raskaus)",
    label_en: "low p(pregnancy)",
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
    label_en: "density → devices",
    epistemicLevel: "E",
  },
  {
    from: "device_adoption",
    to: "ambient",
    label: "infra → ambient↑",
    epistemicLevel: "E",
  },
];
