import type { Metadata } from "next";
import Link from "next/link";
import { Sun } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { StudyCitation } from "@/components/StudyCitation";
import { pickCopy } from "@/lib/i18n";

type ReferenceEntry = {
  citation: string;
  referenceId: string;
};

const COPY = {
  en: {
    title: "Space Weather and Biology",
    subtitle:
      "Three space weather phenomena — Schumann resonance, Pc1 micropulsations, and geomagnetically induced currents — connect heliobiology to the CRY/RPM mechanism.",
    backLink: "← Back to Evidence",

    epistemicTitle: "Century-old field, new mechanism",
    epistemicText:
      "Heliobiology has documented correlations between solar/geomagnetic activity and health outcomes since Chizhevsky (1936). The evidence is extensive but heterogeneous. BERM does not originate these observations — it proposes the CRY/RPM pathway as a unifying mechanism.",

    srKicker: "SCHUMANN RESONANCE",
    srTitle: "The Earth’s electromagnetic heartbeat",
    srLead:
      "The Schumann resonance (SR) is an electromagnetic standing wave in the Earth-ionosphere cavity with a fundamental frequency of 7.83 Hz. This frequency falls within the alpha brainwave range (8–13 Hz), and biological systems appear to use it as a timing reference.",
    srParagraphs: [
      "Wever’s bunker experiments (1968–1979) represent the most systematic study of human isolation from natural EM fields. In 418 experiments with 447 subjects in an electromagnetically shielded bunker in Andechs, Bavaria, subjects showed circadian period fragmentation (ranging from 12 to 56 hours), core body temperature and sleep-wake cycle desynchronization, and endocrine/mood disruption. When a 7.83 Hz signal was introduced into the shielded room, circadian rhythms stabilized.",
      "A controlled comparison between two identical bunkers — one EM-shielded, one not — showed that the free-running circadian period was significantly longer in the shielded bunker (p < 0.01), providing direct evidence that removing the natural EM environment lengthens the biological clock.",
      "Critically, Tatsis et al. (2021) demonstrated that in urban environments, the SR signal is buried under anthropogenic ELF noise. Clean SR spectrum measurement requires locations > 5 km from interference sources. This means the natural timing signal that Wever showed is biologically important is being masked in exactly the environments where most humans now live.",
    ],
    srReferences: [
      { citation: "Wever RA (1979) The Circadian System of Man", referenceId: "wever1979_bunker" },
      { citation: "Wever RA (1970) Effects of electric fields on circadian rhythmicity", referenceId: "wever1970_shielded_vs_unshielded" },
      { citation: "Tatsis G et al. (2021) Anthropogenic Noise and SR Recordings", referenceId: "frontiers2021_sr_anthropogenic" },
    ] as ReferenceEntry[],

    pc1Kicker: "Pc1 MICROPULSATIONS",
    pc1Title: "When the magnetosphere pulses at heart rate",
    pc1Lead:
      "Pc1 micropulsations are ion cyclotron waves from the magnetosphere with frequencies of 0.2–5 Hz — overlapping with the human resting heart rate (0.8–1.3 Hz). This frequency coincidence is biologically significant.",
    pc1Paragraphs: [
      "Kleimenova et al. (2007) found that Pc1 micropulsation activity modulates myocardial infarction and sudden cardiac death rates, particularly in winter. The effect was strongest during the geomagnetic storm recovery phase (3–5 days after the initial storm), when Pc1 activity increases.",
      "Multiple studies document synchronization between heart rate variability (HRV) and geomagnetic field variations. Otsuka et al. (2001) showed HRV decreased with increasing geomagnetic activity in subarctic populations, with the effect being latitude-dependent — strongest near the auroral oval. Zenchenko & Breus (2024) demonstrated heart rate and EEG synchronization with geomagnetic variations in both SR (8–14 Hz) and Pc1 (0.5–2 Hz) ranges, observed in 69% of cases.",
      "McCraty et al. (2018) in a long-term study published in Nature Scientific Reports confirmed that field-line resonances are the strongest source of ULF waves at ground level, and that HRV responds to changes in the solar and geomagnetic environment.",
    ],
    pc1References: [
      { citation: "Kleimenova NG et al. (2007) Pc1 pulsations and MI", referenceId: "kleimenova2007_pc1_mi" },
      { citation: "Otsuka K et al. (2001) HRV and geomagnetic activity", referenceId: "otsuka2001_hrv_subarctic" },
      { citation: "Zenchenko & Breus (2024) GMF-heart rate sync", referenceId: "zenchenko2024_hr_gmf_sync" },
      { citation: "McCraty R et al. (2018) Long-term HRV study", referenceId: "mccraty2018_hrv_global" },
    ] as ReferenceEntry[],

    gicKicker: "GIC CROSS-TERM",
    gicTitle: "When space weather meets the power grid",
    gicLead:
      "Geomagnetically Induced Currents (GIC) represent a unique cross-term: a natural space weather phenomenon channeled through anthropogenic infrastructure to produce biological exposure. Without the power grid, GIC would not produce indoor ELF bioexposure.",
    gicParagraphs: [
      "During a geomagnetic storm (CME or CIR impact), rapid changes in the geomagnetic field induce ground currents. These currents flow through the power grid’s grounding system, saturating transformer cores and generating harmonics (3rd, 5th, 7th). These harmonics produce ELF fields inside buildings — converting a natural space weather event into indoor electromagnetic exposure.",
      "The GIC cross-term has a distinctive prediction signature: health effects should correlate with the interaction of storm intensity × grid infrastructure density × magnetic latitude. High-latitude regions with dense power grids (Scandinavia, Canada) should show the strongest effect. This prediction is testable with existing health registries and geomagnetic data.",
    ],
    gicReferences: [
      { citation: "Zenchenko & Breus (2024) GMF-heart rate sync", referenceId: "zenchenko2024_hr_gmf_sync" },
    ] as ReferenceEntry[],

    bermKicker: "BERM INTERPRETATION",
    bermTitle: "CRY/RPM as the unifying mechanism",
    bermParagraphs: [
      "The heliobiology literature documents three distinct frequency-dependent phenomena: SR affects circadian timing, Pc1 affects cardiac rhythm, and GIC affects indoor ELF exposure. Different frequencies, different biological targets — yet all converge on one question: which molecular mechanism responds to such weak fields?",
      "BERM’s answer: the CRY/RPM (cryptochrome radical pair mechanism) pathway. Cryptochrome is both a circadian clock protein and a demonstrated magnetoreceptor. Its radical pair is sensitive to fields in exactly the range of natural geomagnetic variations. When the natural EM reference signal (SR) is masked or the geomagnetic field is perturbed (storms, GIC harmonics), CRY’s function is disrupted — affecting circadian rhythm, melatonin production, and downstream reproductive and immune pathways.",
      "This connects the century-old observations of heliobiology to BERM’s Level 2 spin susceptibility function χ_B and explains why the effects are strongest at high latitudes (larger geomagnetic variations), during storm recovery phases (Pc1 increase), and in electromagnetically noisy urban environments (SR masking).",
    ],

    falsificationTitle: "Falsification criteria",
    falsificationText:
      "If Wever’s bunker results cannot be replicated with modern methodology, or if CRY is shown to be insensitive to fields in the SR/Pc1 range, or if the GIC–health correlation disappears after controlling for temperature and activity level, the space weather–biology link via CRY/RPM would be weakened.",

    navPredictions: "Predictions →",
    navModel: "Model Specification →",
    navEvidence: "Evidence overview →",
  },

  fi: {
    title: "Avaruussää ja biologia",
    subtitle:
      "Kolme avaruussään ilmiötä — Schumannin resonanssi, Pc1-mikropulsaatiot ja geomagneettisesti indusoidut virrat — yhdistävät heliobiologian CRY/RPM-mekanismiin.",
    backLink: "← Takaisin näyttöön",

    epistemicTitle: "Vuosisatainen tieteenala, uusi mekanismi",
    epistemicText:
      "Heliobiologia on dokumentoinut korrelaatioita aurinko-/geomagneettisen aktiivisuuden ja terveystulosten välillä Tšiževskin (1936) ajoista. Näyttö on laaja mutta heterogeeninen. BERM ei luo näitä havaintoja — se ehdottaa CRY/RPM-reittiä yhdistäväksi mekanismiksi.",

    srKicker: "SCHUMANNIN RESONANSSI",
    srTitle: "Maapallon sähkömagneettinen sydämen syke",
    srLead:
      "Schumannin resonanssi (SR) on sähkömagneettinen seisova aalto Maa-ionosfääri-ontelossa perustaajuudella 7,83 Hz. Tämä taajuus osuu alfa-aivoaaltojen alueelle (8–13 Hz), ja biologiset järjestelmät näyttävät käyttävän sitä ajoitusreferenssinä.",
    srParagraphs: [
      "Weverin bunkkerikokeet (1968–1979) ovat systemaattisin tutkimus ihmisen eristämisestä luonnollisista EM-kentistä. 418 kokeessa 447 koehenkilöllä sähkömagneettisesti suojatussa bunkkerissa Andechsissa, Baijerissa, koehenkilöillä ilmeni sirkadiaanisen jakson pirstoutuminen (12–56 tunnin vaihteluväli), ydinlämpötilan ja uni-valverytmin desynkronisaatio sekä endokriinisiä ja mielialahäiriöitä. Kun 7,83 Hz:n signaali tuotiin suojattuun huoneeseen, sirkadiaaniset rytmit stabiloituivat.",
      "Kontrolloitu vertailu kahden identtisen bunkkerin välillä — toinen EM-suojattu, toinen ei — osoitti, että vapaasti juokseva sirkadiaaninen jakso oli merkitsevästi pidempi suojatussa bunkkerissa (p < 0,01). Suora todiste: luonnollisen EM-ympäristön poistaminen pidentää biologista kelloa.",
      "Kriittisesti Tatsis ym. (2021) osoittivat, että kaupunkiympäristöissä SR-signaali peittyy antropogeenisen ELF-kohinan alle. Puhdas SR-spektrin mittaus vaatii sijainteja > 5 km häiriölähteistä. Tämä tarkoittaa, että luonnollinen ajoitussignaali, jonka Wever osoitti biologisesti tärkeäksi, peittyy juuri niissä ympäristöissä joissa useimmat ihmiset nyt elävät.",
    ],
    srReferences: [
      { citation: "Wever RA (1979) The Circadian System of Man", referenceId: "wever1979_bunker" },
      { citation: "Wever RA (1970) Effects of electric fields on circadian rhythmicity", referenceId: "wever1970_shielded_vs_unshielded" },
      { citation: "Tatsis G et al. (2021) Anthropogenic Noise and SR Recordings", referenceId: "frontiers2021_sr_anthropogenic" },
    ] as ReferenceEntry[],

    pc1Kicker: "Pc1-MIKROPULSAATIOT",
    pc1Title: "Kun magnetosfääri pulsoi sydämen taajuudella",
    pc1Lead:
      "Pc1-mikropulsaatiot ovat magnetosfäärin ionisyklotroniaaltoja taajuuksilla 0,2–5 Hz — päällekkäin ihmisen leposykkeen (0,8–1,3 Hz) kanssa. Tämä taajuusyhteensattuma on biologisesti merkittävä.",
    pc1Paragraphs: [
      "Kleimenova ym. (2007) havaitsivat, että Pc1-mikropulsaatioaktiivisuus moduloi sydäninfarkti- ja äkkikuolemafrekvenssiä, erityisesti talvella. Vaikutus oli voimakkain geomagneettisen myrskyn palautumisvaiheessa (3–5 päivää alkuperäisen myrskyn jälkeen), kun Pc1-aktiivisuus kasvaa.",
      "Useat tutkimukset dokumentoivat synkronoinnin sydämen sykevariaation (HRV) ja geomagneettisen kentän vaihtelujen välillä. Otsuka ym. (2001) osoittivat HRV:n laskevan geomagneettisen aktiivisuuden kasvaessa subarktisissa populaatioissa, vaikutuksen ollessa leveysasteriippuvainen — voimakkain revontuliovaalin lähellä. Zenchenko ja Breus (2024) osoittivat sydämen sykkeen ja EEG:n synkronoitumisen geomagneettisten vaihtelujen kanssa sekä SR- (8–14 Hz) että Pc1- (0,5–2 Hz) alueilla, 69 %:ssa tapauksista.",
      "McCraty ym. (2018) vahvistivat pitkäaikaistutkimuksessa Nature Scientific Reportsissa, että kenttälinjan resonanssit ovat ULF-aaltojen voimakkain lähde maanpinnalla ja että HRV reagoi aurinko- ja geomagneettisen ympäristön muutoksiin.",
    ],
    pc1References: [
      { citation: "Kleimenova NG et al. (2007) Pc1 pulsations and MI", referenceId: "kleimenova2007_pc1_mi" },
      { citation: "Otsuka K et al. (2001) HRV and geomagnetic activity", referenceId: "otsuka2001_hrv_subarctic" },
      { citation: "Zenchenko & Breus (2024) GMF-heart rate sync", referenceId: "zenchenko2024_hr_gmf_sync" },
      { citation: "McCraty R et al. (2018) Long-term HRV study", referenceId: "mccraty2018_hrv_global" },
    ] as ReferenceEntry[],

    gicKicker: "GIC-RISTITERMI",
    gicTitle: "Kun avaruussää kohtaa sähköverkon",
    gicLead:
      "Geomagneettisesti indusoidut virrat (GIC) edustavat ainutlaatuista ristitermiä: luonnollinen avaruussääilmiö kanavoituu antropogeenisen infrastruktuurin kautta biologiseksi altistukseksi. Ilman sähköverkkoa GIC ei tuottaisi sisätilojen ELF-bioaltistusta.",
    gicParagraphs: [
      "Geomagneettisen myrskyn (CME tai CIR) aikana nopeat muutokset geomagneettisessa kentässä indusoivat maavirtoja. Nämä virrat kulkevat sähköverkon maadoitusjärjestelmän kautta kyllästäen muuntajien sydämet ja tuottaen harmonisia (3., 5., 7.). Nämä harmoniset tuottavat ELF-kenttiä rakennusten sisällä — muuttaen luonnollisen avaruussäätapahtuman sisätilojen sähkömagneettiseksi altistukseksi.",
      "GIC-ristitermin ennustekuvio on tunnusomainen: terveysvaikutusten tulisi korreloida myrskyintensiteetin × verkon infrastruktuuritiheyden × magneettisen leveysasteen yhdistelmän kanssa. Korkean leveysasteen alueilla tiheilä sähköverkoilla (Skandinavia, Kanada) vaikutuksen tulisi olla voimakkain. Tämä ennuste on testattavissa olemassaolevilla terveysrekistereillä ja geomagneettisella datalla.",
    ],
    gicReferences: [
      { citation: "Zenchenko & Breus (2024) GMF-heart rate sync", referenceId: "zenchenko2024_hr_gmf_sync" },
    ] as ReferenceEntry[],

    bermKicker: "BERM-TULKINTA",
    bermTitle: "CRY/RPM yhdistävänä mekanismina",
    bermParagraphs: [
      "Heliobiologian kirjallisuus dokumentoi kolme erillistä taajuusriippuvaista ilmiötä: SR vaikuttaa sirkadiaaniseen ajoitukseen, Pc1 sydämen rytmiin ja GIC sisätilojen ELF-altistukseen. Eri taajuudet, eri biologiset kohteet — mutta kaikki yhtyvat yhteen kysymykseen: mikä molekulaarinen mekanismi reagoi näin heikkoihin kenttiin?",
      "BERM:n vastaus: CRY/RPM (kryptokromin radikaalipari -mekanismi) -reitti. Kryptokromi on sekä sirkadiaanisen kellon proteiini että osoitettu magnetoreseptori. Sen radikaalipari on herkkä kentille juuri luonnollisten geomagneettisten vaihtelujen alueella. Kun luonnollinen EM-referenssisignaali (SR) peittyy tai geomagneettinen kenttä häiriintyy (myrskyt, GIC-harmoniset), CRY:n toiminta häiriintyy — vaikuttaen sirkadiaaniseen rytmiin, melatoniinituotantoon ja alavirtaisiin lisääntymis- ja immuunireitteihin.",
      "Tämä yhdistää vuosisataiset heliobiologian havainnot BERM:n tason 2 spin-herkkyysfunktioon χ_B ja selitää miksi vaikutukset ovat voimakkaimpia korkeilla leveysasteilla (suuremmat geomagneettiset vaihtelut), myrskyjen palautumisvaiheissa (Pc1-kasvu) ja sähkömagneettisesti meluisissa kaupunkiympäristöissä (SR:n peittyminen).",
    ],

    falsificationTitle: "Falsifikaatiokriteerit",
    falsificationText:
      "Jos Weverin bunkkerituloksia ei voida toistaa nykyaikaisella metodologialla, tai jos CRY osoitetaan epäherkäksi SR/Pc1-alueen kentille, tai jos GIC–terveys-korrelaatio katoaa lämpötilan ja aktiivisuustason kontrolloinnin jälkeen, avaruussää–biologia-yhteys CRY/RPM:n kautta heikkenisi.",

    navPredictions: "Ennusteet →",
    navModel: "Mallispesifikaatio →",
    navEvidence: "Näytön yleiskatsaus →",
  },

  ja: {
    title: "宇宙天気と生物学",
    subtitle:
      "Three space weather phenomena — Schumann resonance, Pc1 micropulsations, and geomagnetically induced currents — connect heliobiology to the CRY/RPM mechanism.",
    backLink: "← 証拠に戻る",

    epistemicTitle: "一世紀の分野、新しいメカニズム",
    epistemicText:
      "Heliobiology has documented correlations between solar/geomagnetic activity and health outcomes since Chizhevsky (1936). The evidence is extensive but heterogeneous. BERM does not originate these observations — it proposes the CRY/RPM pathway as a unifying mechanism.",

    srKicker: "シューマン共鳴",
    srTitle: "地球の電磁気的心拍",
    srLead:
      "The Schumann resonance (SR) is an electromagnetic standing wave in the Earth-ionosphere cavity with a fundamental frequency of 7.83 Hz. This frequency falls within the alpha brainwave range (8–13 Hz), and biological systems appear to use it as a timing reference.",
    srParagraphs: [
      "Wever’s bunker experiments (1968–1979) represent the most systematic study of human isolation from natural EM fields. In 418 experiments with 447 subjects in an electromagnetically shielded bunker in Andechs, Bavaria, subjects showed circadian period fragmentation (ranging from 12 to 56 hours), core body temperature and sleep-wake cycle desynchronization, and endocrine/mood disruption. When a 7.83 Hz signal was introduced into the shielded room, circadian rhythms stabilized.",
      "A controlled comparison between two identical bunkers — one EM-shielded, one not — showed that the free-running circadian period was significantly longer in the shielded bunker (p < 0.01), providing direct evidence that removing the natural EM environment lengthens the biological clock.",
      "Critically, Tatsis et al. (2021) demonstrated that in urban environments, the SR signal is buried under anthropogenic ELF noise. Clean SR spectrum measurement requires locations > 5 km from interference sources. This means the natural timing signal that Wever showed is biologically important is being masked in exactly the environments where most humans now live.",
    ],
    srReferences: [
      { citation: "Wever RA (1979) The Circadian System of Man", referenceId: "wever1979_bunker" },
      { citation: "Wever RA (1970) Effects of electric fields on circadian rhythmicity", referenceId: "wever1970_shielded_vs_unshielded" },
      { citation: "Tatsis G et al. (2021) Anthropogenic Noise and SR Recordings", referenceId: "frontiers2021_sr_anthropogenic" },
    ] as ReferenceEntry[],

    pc1Kicker: "Pc1マイクロパルセーション",
    pc1Title: "磁気圈が心拍で脈打つとき",
    pc1Lead:
      "Pc1 micropulsations are ion cyclotron waves from the magnetosphere with frequencies of 0.2–5 Hz — overlapping with the human resting heart rate (0.8–1.3 Hz). This frequency coincidence is biologically significant.",
    pc1Paragraphs: [
      "Kleimenova et al. (2007) found that Pc1 micropulsation activity modulates myocardial infarction and sudden cardiac death rates, particularly in winter. The effect was strongest during the geomagnetic storm recovery phase (3–5 days after the initial storm), when Pc1 activity increases.",
      "Multiple studies document synchronization between heart rate variability (HRV) and geomagnetic field variations. Otsuka et al. (2001) showed HRV decreased with increasing geomagnetic activity in subarctic populations, with the effect being latitude-dependent — strongest near the auroral oval. Zenchenko & Breus (2024) demonstrated heart rate and EEG synchronization with geomagnetic variations in both SR (8–14 Hz) and Pc1 (0.5–2 Hz) ranges, observed in 69% of cases.",
      "McCraty et al. (2018) in a long-term study published in Nature Scientific Reports confirmed that field-line resonances are the strongest source of ULF waves at ground level, and that HRV responds to changes in the solar and geomagnetic environment.",
    ],
    pc1References: [
      { citation: "Kleimenova NG et al. (2007) Pc1 pulsations and MI", referenceId: "kleimenova2007_pc1_mi" },
      { citation: "Otsuka K et al. (2001) HRV and geomagnetic activity", referenceId: "otsuka2001_hrv_subarctic" },
      { citation: "Zenchenko & Breus (2024) GMF-heart rate sync", referenceId: "zenchenko2024_hr_gmf_sync" },
      { citation: "McCraty R et al. (2018) Long-term HRV study", referenceId: "mccraty2018_hrv_global" },
    ] as ReferenceEntry[],

    gicKicker: "GICクロスターム",
    gicTitle: "宇宙天気が電力網と出会うとき",
    gicLead:
      "Geomagnetically Induced Currents (GIC) represent a unique cross-term: a natural space weather phenomenon channeled through anthropogenic infrastructure to produce biological exposure. Without the power grid, GIC would not produce indoor ELF bioexposure.",
    gicParagraphs: [
      "During a geomagnetic storm (CME or CIR impact), rapid changes in the geomagnetic field induce ground currents. These currents flow through the power grid’s grounding system, saturating transformer cores and generating harmonics (3rd, 5th, 7th). These harmonics produce ELF fields inside buildings — converting a natural space weather event into indoor electromagnetic exposure.",
      "The GIC cross-term has a distinctive prediction signature: health effects should correlate with the interaction of storm intensity × grid infrastructure density × magnetic latitude. High-latitude regions with dense power grids (Scandinavia, Canada) should show the strongest effect. This prediction is testable with existing health registries and geomagnetic data.",
    ],
    gicReferences: [
      { citation: "Zenchenko & Breus (2024) GMF-heart rate sync", referenceId: "zenchenko2024_hr_gmf_sync" },
    ] as ReferenceEntry[],

    bermKicker: "BERM解釈",
    bermTitle: "統一メカニズムとしてのCRY/RPM",
    bermParagraphs: [
      "The heliobiology literature documents three distinct frequency-dependent phenomena: SR affects circadian timing, Pc1 affects cardiac rhythm, and GIC affects indoor ELF exposure. Different frequencies, different biological targets — yet all converge on one question: which molecular mechanism responds to such weak fields?",
      "BERM’s answer: the CRY/RPM (cryptochrome radical pair mechanism) pathway. Cryptochrome is both a circadian clock protein and a demonstrated magnetoreceptor. Its radical pair is sensitive to fields in exactly the range of natural geomagnetic variations. When the natural EM reference signal (SR) is masked or the geomagnetic field is perturbed (storms, GIC harmonics), CRY’s function is disrupted — affecting circadian rhythm, melatonin production, and downstream reproductive and immune pathways.",
      "This connects the century-old observations of heliobiology to BERM’s Level 2 spin susceptibility function χ_B and explains why the effects are strongest at high latitudes (larger geomagnetic variations), during storm recovery phases (Pc1 increase), and in electromagnetically noisy urban environments (SR masking).",
    ],

    falsificationTitle: "反証基準",
    falsificationText:
      "If Wever’s bunker results cannot be replicated with modern methodology, or if CRY is shown to be insensitive to fields in the SR/Pc1 range, or if the GIC–health correlation disappears after controlling for temperature and activity level, the space weather–biology link via CRY/RPM would be weakened.",

    navPredictions: "Predictions →",
    navModel: "Model Specification →",
    navEvidence: "Evidence overview →",
  },

  fr: {
    title: "Météorologie spatiale et biologie",
    subtitle:
      "Three space weather phenomena — Schumann resonance, Pc1 micropulsations, and geomagnetically induced currents — connect heliobiology to the CRY/RPM mechanism.",
    backLink: "← Retour aux preuves",

    epistemicTitle: "Un siècle de recherche, un nouveau mécanisme",
    epistemicText:
      "Heliobiology has documented correlations between solar/geomagnetic activity and health outcomes since Chizhevsky (1936). The evidence is extensive but heterogeneous. BERM does not originate these observations — it proposes the CRY/RPM pathway as a unifying mechanism.",

    srKicker: "RÉSONANCE DE SCHUMANN",
    srTitle: "Le battement de cœur électromagnétique de la Terre",
    srLead:
      "The Schumann resonance (SR) is an electromagnetic standing wave in the Earth-ionosphere cavity with a fundamental frequency of 7.83 Hz. This frequency falls within the alpha brainwave range (8–13 Hz), and biological systems appear to use it as a timing reference.",
    srParagraphs: [
      "Wever’s bunker experiments (1968–1979) represent the most systematic study of human isolation from natural EM fields. In 418 experiments with 447 subjects in an electromagnetically shielded bunker in Andechs, Bavaria, subjects showed circadian period fragmentation (ranging from 12 to 56 hours), core body temperature and sleep-wake cycle desynchronization, and endocrine/mood disruption. When a 7.83 Hz signal was introduced into the shielded room, circadian rhythms stabilized.",
      "A controlled comparison between two identical bunkers — one EM-shielded, one not — showed that the free-running circadian period was significantly longer in the shielded bunker (p < 0.01), providing direct evidence that removing the natural EM environment lengthens the biological clock.",
      "Critically, Tatsis et al. (2021) demonstrated that in urban environments, the SR signal is buried under anthropogenic ELF noise. Clean SR spectrum measurement requires locations > 5 km from interference sources. This means the natural timing signal that Wever showed is biologically important is being masked in exactly the environments where most humans now live.",
    ],
    srReferences: [
      { citation: "Wever RA (1979) The Circadian System of Man", referenceId: "wever1979_bunker" },
      { citation: "Wever RA (1970) Effects of electric fields on circadian rhythmicity", referenceId: "wever1970_shielded_vs_unshielded" },
      { citation: "Tatsis G et al. (2021) Anthropogenic Noise and SR Recordings", referenceId: "frontiers2021_sr_anthropogenic" },
    ] as ReferenceEntry[],

    pc1Kicker: "MICROPULSATIONS Pc1",
    pc1Title: "Quand la magnétosphère pulse au rythme du cœur",
    pc1Lead:
      "Pc1 micropulsations are ion cyclotron waves from the magnetosphere with frequencies of 0.2–5 Hz — overlapping with the human resting heart rate (0.8–1.3 Hz). This frequency coincidence is biologically significant.",
    pc1Paragraphs: [
      "Kleimenova et al. (2007) found that Pc1 micropulsation activity modulates myocardial infarction and sudden cardiac death rates, particularly in winter. The effect was strongest during the geomagnetic storm recovery phase (3–5 days after the initial storm), when Pc1 activity increases.",
      "Multiple studies document synchronization between heart rate variability (HRV) and geomagnetic field variations. Otsuka et al. (2001) showed HRV decreased with increasing geomagnetic activity in subarctic populations, with the effect being latitude-dependent — strongest near the auroral oval. Zenchenko & Breus (2024) demonstrated heart rate and EEG synchronization with geomagnetic variations in both SR (8–14 Hz) and Pc1 (0.5–2 Hz) ranges, observed in 69% of cases.",
      "McCraty et al. (2018) in a long-term study published in Nature Scientific Reports confirmed that field-line resonances are the strongest source of ULF waves at ground level, and that HRV responds to changes in the solar and geomagnetic environment.",
    ],
    pc1References: [
      { citation: "Kleimenova NG et al. (2007) Pc1 pulsations and MI", referenceId: "kleimenova2007_pc1_mi" },
      { citation: "Otsuka K et al. (2001) HRV and geomagnetic activity", referenceId: "otsuka2001_hrv_subarctic" },
      { citation: "Zenchenko & Breus (2024) GMF-heart rate sync", referenceId: "zenchenko2024_hr_gmf_sync" },
      { citation: "McCraty R et al. (2018) Long-term HRV study", referenceId: "mccraty2018_hrv_global" },
    ] as ReferenceEntry[],

    gicKicker: "TERME CROISÉ GIC",
    gicTitle: "Quand la météo spatiale rencontre le réseau électrique",
    gicLead:
      "Geomagnetically Induced Currents (GIC) represent a unique cross-term: a natural space weather phenomenon channeled through anthropogenic infrastructure to produce biological exposure. Without the power grid, GIC would not produce indoor ELF bioexposure.",
    gicParagraphs: [
      "During a geomagnetic storm (CME or CIR impact), rapid changes in the geomagnetic field induce ground currents. These currents flow through the power grid’s grounding system, saturating transformer cores and generating harmonics (3rd, 5th, 7th). These harmonics produce ELF fields inside buildings — converting a natural space weather event into indoor electromagnetic exposure.",
      "The GIC cross-term has a distinctive prediction signature: health effects should correlate with the interaction of storm intensity × grid infrastructure density × magnetic latitude. High-latitude regions with dense power grids (Scandinavia, Canada) should show the strongest effect. This prediction is testable with existing health registries and geomagnetic data.",
    ],
    gicReferences: [
      { citation: "Zenchenko & Breus (2024) GMF-heart rate sync", referenceId: "zenchenko2024_hr_gmf_sync" },
    ] as ReferenceEntry[],

    bermKicker: "INTERPRÉTATION BERM",
    bermTitle: "CRY/RPM comme mécanisme unificateur",
    bermParagraphs: [
      "The heliobiology literature documents three distinct frequency-dependent phenomena: SR affects circadian timing, Pc1 affects cardiac rhythm, and GIC affects indoor ELF exposure. Different frequencies, different biological targets — yet all converge on one question: which molecular mechanism responds to such weak fields?",
      "BERM’s answer: the CRY/RPM (cryptochrome radical pair mechanism) pathway. Cryptochrome is both a circadian clock protein and a demonstrated magnetoreceptor. Its radical pair is sensitive to fields in exactly the range of natural geomagnetic variations. When the natural EM reference signal (SR) is masked or the geomagnetic field is perturbed (storms, GIC harmonics), CRY’s function is disrupted — affecting circadian rhythm, melatonin production, and downstream reproductive and immune pathways.",
      "This connects the century-old observations of heliobiology to BERM’s Level 2 spin susceptibility function χ_B and explains why the effects are strongest at high latitudes (larger geomagnetic variations), during storm recovery phases (Pc1 increase), and in electromagnetically noisy urban environments (SR masking).",
    ],

    falsificationTitle: "Critères de falsification",
    falsificationText:
      "If Wever’s bunker results cannot be replicated with modern methodology, or if CRY is shown to be insensitive to fields in the SR/Pc1 range, or if the GIC–health correlation disappears after controlling for temperature and activity level, the space weather–biology link via CRY/RPM would be weakened.",

    navPredictions: "Predictions →",
    navModel: "Model Specification →",
    navEvidence: "Evidence overview →",
  },

  ko: {
    title: "우주 날씨와 생물학",
    subtitle:
      "Three space weather phenomena — Schumann resonance, Pc1 micropulsations, and geomagnetically induced currents — connect heliobiology to the CRY/RPM mechanism.",
    backLink: "← 증거로 돌아가기",

    epistemicTitle: "한 세기의 분야, 새로운 메커니즘",
    epistemicText:
      "Heliobiology has documented correlations between solar/geomagnetic activity and health outcomes since Chizhevsky (1936). The evidence is extensive but heterogeneous. BERM does not originate these observations — it proposes the CRY/RPM pathway as a unifying mechanism.",

    srKicker: "슈만 공명",
    srTitle: "지구의 전자기적 심장 박동",
    srLead:
      "The Schumann resonance (SR) is an electromagnetic standing wave in the Earth-ionosphere cavity with a fundamental frequency of 7.83 Hz. This frequency falls within the alpha brainwave range (8–13 Hz), and biological systems appear to use it as a timing reference.",
    srParagraphs: [
      "Wever’s bunker experiments (1968–1979) represent the most systematic study of human isolation from natural EM fields. In 418 experiments with 447 subjects in an electromagnetically shielded bunker in Andechs, Bavaria, subjects showed circadian period fragmentation (ranging from 12 to 56 hours), core body temperature and sleep-wake cycle desynchronization, and endocrine/mood disruption. When a 7.83 Hz signal was introduced into the shielded room, circadian rhythms stabilized.",
      "A controlled comparison between two identical bunkers — one EM-shielded, one not — showed that the free-running circadian period was significantly longer in the shielded bunker (p < 0.01), providing direct evidence that removing the natural EM environment lengthens the biological clock.",
      "Critically, Tatsis et al. (2021) demonstrated that in urban environments, the SR signal is buried under anthropogenic ELF noise. Clean SR spectrum measurement requires locations > 5 km from interference sources. This means the natural timing signal that Wever showed is biologically important is being masked in exactly the environments where most humans now live.",
    ],
    srReferences: [
      { citation: "Wever RA (1979) The Circadian System of Man", referenceId: "wever1979_bunker" },
      { citation: "Wever RA (1970) Effects of electric fields on circadian rhythmicity", referenceId: "wever1970_shielded_vs_unshielded" },
      { citation: "Tatsis G et al. (2021) Anthropogenic Noise and SR Recordings", referenceId: "frontiers2021_sr_anthropogenic" },
    ] as ReferenceEntry[],

    pc1Kicker: "Pc1 미세맥동",
    pc1Title: "자기권이 심장 박동수로 맥동할 때",
    pc1Lead:
      "Pc1 micropulsations are ion cyclotron waves from the magnetosphere with frequencies of 0.2–5 Hz — overlapping with the human resting heart rate (0.8–1.3 Hz). This frequency coincidence is biologically significant.",
    pc1Paragraphs: [
      "Kleimenova et al. (2007) found that Pc1 micropulsation activity modulates myocardial infarction and sudden cardiac death rates, particularly in winter. The effect was strongest during the geomagnetic storm recovery phase (3–5 days after the initial storm), when Pc1 activity increases.",
      "Multiple studies document synchronization between heart rate variability (HRV) and geomagnetic field variations. Otsuka et al. (2001) showed HRV decreased with increasing geomagnetic activity in subarctic populations, with the effect being latitude-dependent — strongest near the auroral oval. Zenchenko & Breus (2024) demonstrated heart rate and EEG synchronization with geomagnetic variations in both SR (8–14 Hz) and Pc1 (0.5–2 Hz) ranges, observed in 69% of cases.",
      "McCraty et al. (2018) in a long-term study published in Nature Scientific Reports confirmed that field-line resonances are the strongest source of ULF waves at ground level, and that HRV responds to changes in the solar and geomagnetic environment.",
    ],
    pc1References: [
      { citation: "Kleimenova NG et al. (2007) Pc1 pulsations and MI", referenceId: "kleimenova2007_pc1_mi" },
      { citation: "Otsuka K et al. (2001) HRV and geomagnetic activity", referenceId: "otsuka2001_hrv_subarctic" },
      { citation: "Zenchenko & Breus (2024) GMF-heart rate sync", referenceId: "zenchenko2024_hr_gmf_sync" },
      { citation: "McCraty R et al. (2018) Long-term HRV study", referenceId: "mccraty2018_hrv_global" },
    ] as ReferenceEntry[],

    gicKicker: "GIC 교차항",
    gicTitle: "우주 날씨가 전력망을 만날 때",
    gicLead:
      "Geomagnetically Induced Currents (GIC) represent a unique cross-term: a natural space weather phenomenon channeled through anthropogenic infrastructure to produce biological exposure. Without the power grid, GIC would not produce indoor ELF bioexposure.",
    gicParagraphs: [
      "During a geomagnetic storm (CME or CIR impact), rapid changes in the geomagnetic field induce ground currents. These currents flow through the power grid’s grounding system, saturating transformer cores and generating harmonics (3rd, 5th, 7th). These harmonics produce ELF fields inside buildings — converting a natural space weather event into indoor electromagnetic exposure.",
      "The GIC cross-term has a distinctive prediction signature: health effects should correlate with the interaction of storm intensity × grid infrastructure density × magnetic latitude. High-latitude regions with dense power grids (Scandinavia, Canada) should show the strongest effect. This prediction is testable with existing health registries and geomagnetic data.",
    ],
    gicReferences: [
      { citation: "Zenchenko & Breus (2024) GMF-heart rate sync", referenceId: "zenchenko2024_hr_gmf_sync" },
    ] as ReferenceEntry[],

    bermKicker: "BERM 해석",
    bermTitle: "통합 메커니즘으로서의 CRY/RPM",
    bermParagraphs: [
      "The heliobiology literature documents three distinct frequency-dependent phenomena: SR affects circadian timing, Pc1 affects cardiac rhythm, and GIC affects indoor ELF exposure. Different frequencies, different biological targets — yet all converge on one question: which molecular mechanism responds to such weak fields?",
      "BERM’s answer: the CRY/RPM (cryptochrome radical pair mechanism) pathway. Cryptochrome is both a circadian clock protein and a demonstrated magnetoreceptor. Its radical pair is sensitive to fields in exactly the range of natural geomagnetic variations. When the natural EM reference signal (SR) is masked or the geomagnetic field is perturbed (storms, GIC harmonics), CRY’s function is disrupted — affecting circadian rhythm, melatonin production, and downstream reproductive and immune pathways.",
      "This connects the century-old observations of heliobiology to BERM’s Level 2 spin susceptibility function χ_B and explains why the effects are strongest at high latitudes (larger geomagnetic variations), during storm recovery phases (Pc1 increase), and in electromagnetically noisy urban environments (SR masking).",
    ],

    falsificationTitle: "반증 기준",
    falsificationText:
      "If Wever’s bunker results cannot be replicated with modern methodology, or if CRY is shown to be insensitive to fields in the SR/Pc1 range, or if the GIC–health correlation disappears after controlling for temperature and activity level, the space weather–biology link via CRY/RPM would be weakened.",

    navPredictions: "Predictions →",
    navModel: "Model Specification →",
    navEvidence: "Evidence overview →",
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

export default async function SpaceWeatherBiologyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const d = pickCopy(COPY, locale);
  const prefix = `/${locale}`;

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 sm:py-20">
      {/* Back link */}
      <p className="mb-6">
        <Link href={`${prefix}/evidence`} className="text-sm text-accent hover:underline">
          {d.backLink}
        </Link>
      </p>

      {/* Header */}
      <PageHeader icon={Sun} title={d.title} subtitle={d.subtitle} />

      {/* Epistemic banner */}
      <div className="mt-8 rounded-lg border-2 border-amber-500/30 bg-amber-500/5 p-4">
        <h3 className="text-sm font-semibold mb-1">{d.epistemicTitle}</h3>
        <p className="text-sm text-foreground-muted leading-relaxed">
          {d.epistemicText}
        </p>
      </div>

      {/* Section 1: Schumann Resonance */}
      <section className="mt-14 border-t editorial-rule pt-6">
        <p className="text-xs font-semibold tracking-widest text-accent mb-1">
          {d.srKicker}
        </p>
        <h2 className="text-lg font-semibold mb-2">{d.srTitle}</h2>
        <p className="text-sm text-foreground-muted leading-relaxed mb-4 max-w-3xl font-medium">
          {d.srLead}
        </p>
        {d.srParagraphs.map((p, i) => (
          <p
            key={i}
            className="text-sm text-foreground-muted leading-relaxed mb-4 max-w-3xl"
          >
            {p}
          </p>
        ))}
        <div className="mt-4 space-y-1">
          {d.srReferences.map((ref, i) => (
            <p key={i} className="text-xs text-foreground-muted/60">
              <StudyCitation referenceId={ref.referenceId} locale={locale} label={ref.citation} />
            </p>
          ))}
        </div>
      </section>

      {/* Section 2: Pc1 Micropulsations */}
      <section className="mt-14 border-t editorial-rule pt-6">
        <p className="text-xs font-semibold tracking-widest text-accent mb-1">
          {d.pc1Kicker}
        </p>
        <h2 className="text-lg font-semibold mb-2">{d.pc1Title}</h2>
        <p className="text-sm text-foreground-muted leading-relaxed mb-4 max-w-3xl font-medium">
          {d.pc1Lead}
        </p>
        {d.pc1Paragraphs.map((p, i) => (
          <p
            key={i}
            className="text-sm text-foreground-muted leading-relaxed mb-4 max-w-3xl"
          >
            {p}
          </p>
        ))}
        <div className="mt-4 space-y-1">
          {d.pc1References.map((ref, i) => (
            <p key={i} className="text-xs text-foreground-muted/60">
              <StudyCitation referenceId={ref.referenceId} locale={locale} label={ref.citation} />
            </p>
          ))}
        </div>
      </section>

      {/* Section 3: GIC Cross-Term */}
      <section className="mt-14 border-t editorial-rule pt-6">
        <p className="text-xs font-semibold tracking-widest text-accent mb-1">
          {d.gicKicker}
        </p>
        <h2 className="text-lg font-semibold mb-2">{d.gicTitle}</h2>
        <p className="text-sm text-foreground-muted leading-relaxed mb-4 max-w-3xl font-medium">
          {d.gicLead}
        </p>
        {d.gicParagraphs.map((p, i) => (
          <p
            key={i}
            className="text-sm text-foreground-muted leading-relaxed mb-4 max-w-3xl"
          >
            {p}
          </p>
        ))}
        <div className="mt-4 space-y-1">
          {d.gicReferences.map((ref, i) => (
            <p key={i} className="text-xs text-foreground-muted/60">
              <StudyCitation referenceId={ref.referenceId} locale={locale} label={ref.citation} />
            </p>
          ))}
        </div>
      </section>

      {/* Section 4: BERM Interpretation */}
      <section className="mt-14 border-t editorial-rule pt-6">
        <p className="text-xs font-semibold tracking-widest text-accent mb-1">
          {d.bermKicker}
        </p>
        <h2 className="text-lg font-semibold mb-2">{d.bermTitle}</h2>
        {d.bermParagraphs.map((p, i) => (
          <p
            key={i}
            className="text-sm text-foreground-muted leading-relaxed mb-4 max-w-3xl"
          >
            {p}
          </p>
        ))}
      </section>

      {/* Falsification box */}
      <section className="mt-14 border-t editorial-rule pt-6">
        <h2 className="text-lg font-semibold mb-2">{d.falsificationTitle}</h2>
        <div className="rounded-lg border-2 border-amber-500/30 bg-amber-500/5 p-4">
          <p className="text-sm text-foreground-muted leading-relaxed">
            {d.falsificationText}
          </p>
        </div>
      </section>

      {/* Navigation links */}
      <nav className="mt-14 border-t editorial-rule pt-6 flex flex-wrap gap-4">
        <Link
          href={`${prefix}/predictions`}
          className="text-sm text-accent hover:underline"
        >
          {d.navPredictions}
        </Link>
        <Link
          href={`${prefix}/model`}
          className="text-sm text-accent hover:underline"
        >
          {d.navModel}
        </Link>
        <Link
          href={`${prefix}/evidence`}
          className="text-sm text-accent hover:underline"
        >
          {d.navEvidence}
        </Link>
      </nav>
    </div>
  );
}
