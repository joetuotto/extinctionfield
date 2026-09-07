/**
 * Research programme: analysis frameworks and the verification path
 * (findings 47–54 and section 8).
 *
 * Source: berm/docs/berm-new-findings-and-refinements-2026-09-07.md.
 *
 * These are frameworks and decision rules, not results. The three-variable
 * damage model is a proposal for a future model version, not a correction to
 * the BioCap integral, and it is not a free way to explain any outcome:
 * every quantity is tied to a measurement.
 */

import type { LocalizedText } from "./correction_registry";

/** Finding 47: state, damage load and functional capacity kept apart. */
export const THREE_VARIABLE_MODEL = {
  equations: "ṡ = U(exposure, s) − V(s)\nḊ = P(exposure, s) − R(D, s)\nC = G(D, s, tissue)",
  variables: [
    {
      symbol: "s",
      name: { en: "Receiver and repair state", fi: "Vastaanottimen ja korjauksen tila" },
      measurement: { en: "e.g. autophagic flux", fi: "esim. autofagiavirta" },
    },
    {
      symbol: "D",
      name: { en: "Damage load", fi: "Vauriokuorma" },
      measurement: {
        en: "e.g. rate of DNA damage formation and removal",
        fi: "esim. DNA-vaurion muodostumis- ja poistumisnopeus",
      },
    },
    {
      symbol: "C",
      name: { en: "Functional capacity", fi: "Toiminnallinen kapasiteetti" },
      measurement: { en: "e.g. hyperactivation", fi: "esim. hyperaktivaatio" },
    },
  ],
  rationale: {
    en: "The adaptive response, the ATG dependence, the endpoint decoupling in the mouse work and the tissue-barrier finding can all be described with at least these three separate quantities. One damage variable is too coarse: at one instant the same D can arise from high formation with high repair or from low values of both. Only a temporal measurement plus a repair intervention separates those.",
    fi: "Adaptiivinen vaste, ATG-riippuvuus, hiirityön päätepiste-ero ja kudosestehavainto voidaan kuvata vähintään näillä kolmella erillisellä suureella. Yksi vauriomuuttuja on liian karkea: samalla hetkellä sama D voi syntyä suuresta muodostumisesta ja suuresta korjauksesta tai pienistä molemmista. Vain ajallinen mittaus ja korjausinterventio erottavat nämä.",
  },
  bound: {
    en: "This is not a new fitted BERM version and not a free way to explain any result. It does not replace the BioCap integral, which is unchanged: BioCap is a simplification that merges s, D and C into one quantity. The three-variable form is a proposal whose value is that it makes saturation, adaptation and selection separable — and it is a shared, testable consequence of experiments already performed.",
    fi: "Tämä ei ole uusi sovitettu BERM-versio eikä vapaa tapa selittää mikä tahansa tulos. Se ei korvaa BioCap-integraalia, joka pysyy muuttumattomana: BioCap on yksinkertaistus, joka yhdistää s:n, D:n ja C:n yhdeksi suureeksi. Kolmimuuttujainen muoto on ehdotus, jonka arvo on se että se tekee kyllästymisen, adaptaation ja valikoitumisen erotettaviksi — ja se on usean jo tehdyn kokeen yhteinen, testattava seuraus.",
  },
  referenceIds: ["sannino2024", "sannino2022_autophagy_adaptive", "sannino2019_parp_adaptive", "catsper2024", "sci-rep-2019-sperm-ros", "yu2019_btb"],
} as const;

/** Finding 48: the interaction contrast that isolates the exposure's share. */
export const INTERACTION_CONTRAST = {
  formula: "I = (Y_RF+K − Y_RF) − (Y_K − Y_sham)",
  groups: {
    en: "All four groups are required: sham, RF, chemical, RF + chemical.",
    fi: "Kaikki neljä ryhmää tarvitaan: sham, RF, kemikaali, RF + kemikaali.",
  },
  rationale: {
    en: "This separates a radiofrequency-modified chemical response from the separate baseline effects of the field and the chemical. A shared ROS or Ca²⁺ route then does not mask the exposure's share: the EMF effect is evaluated as a distinct contrast inside the same biological machinery. The same structure works with a gene or drug intervention, comparing I across intervention levels.",
    fi: "Tämä erottaa RF:n muuttaman kemiallisen vasteen kentän ja kemikaalin erillisistä perustason vaikutuksista. Yhteinen ROS- tai Ca²⁺-reitti ei tällöin peitä altisteen osuutta: EMF:n vaikutus arvioidaan erillisenä kontrastina samassa biologisessa koneistossa. Sama rakenne toimii geeni- tai lääkeintervention kanssa vertaamalla I:tä intervention eri tasoilla.",
  },
  bound: {
    en: "The scale has to be chosen in advance: additive and relative interaction are not the same claim. RF + chemical against chemical alone does not yet locate the primary sensor. The Sannino and Luukkonen datasets suit this particularly well if the group data for the independent replicates can be obtained.",
    fi: "Asteikko on valittava etukäteen: additiivinen ja suhteellinen vuorovaikutus eivät ole sama väite. RF + kemikaali vastaan kemikaali yksin ei vielä paikanna primaarista sensoria. Sanninon ja Luukkosen aineistot sopivat tähän erityisen hyvin, jos riippumattomien koetoistojen ryhmätiedot saadaan.",
  },
  referenceIds: ["luukkonen2009_menadione_rf", "sannino2024", "sannino2022_autophagy_adaptive", "sannino2019_parp_adaptive"],
} as const;

/** Finding 49: receiver, mediator and enabler are different roles. */
export interface MechanismRole {
  role: LocalizedText;
  changes: LocalizedText;
  test: LocalizedText;
}

export const MECHANISM_ROLES: MechanismRole[] = [
  {
    role: { en: "Receiver", fi: "Vastaanotin" },
    changes: { en: "The field's first proximal response changes", fi: "Kentän ensimmäinen lähivaste muuttuu" },
    test: { en: "CRY knockout plus a proximal-response measurement", fi: "CRY-poisto ja lähivasteen mittaus" },
  },
  {
    role: { en: "Mediator", fi: "Välittäjä" },
    changes: { en: "The later ROS or Ca²⁺ signal changes", fi: "Myöhempi ROS- tai Ca²⁺-signaali muuttuu" },
    test: { en: "ATG knockout plus a ROS measurement", fi: "ATG-poisto ja ROS-mittaus" },
  },
  {
    role: { en: "Enabler", fi: "Mahdollistaja" },
    changes: { en: "Repair or the final tissue function changes", fi: "Korjaus tai lopullinen kudostoiminta muuttuu" },
    test: { en: "PARP inhibition plus a DNA-damage measurement", fi: "PARP-esto ja DNA-vauriomittaus" },
  },
];

export const MECHANISM_ROLE_NOTE: LocalizedText = {
  en: "CRY2/RFK/TRPC1, ATG5/7, PARP and SPOCK3 are not automatically successive parts of one chain: they were observed in different cells, exposure classes and endpoints. Being necessary for one response does not by itself mean recognising the field. The strong new combination would measure the same proximal response and the later protection under both CRY and ATG interventions; until such a comparison exists, a sensor-to-autophagy serial link stays a candidate even though each branch has separate evidence.",
  fi: "CRY2/RFK/TRPC1, ATG5/7, PARP ja SPOCK3 eivät ole automaattisesti saman ketjun peräkkäisiä osia: ne on havaittu eri soluissa, altistusluokissa ja päätepisteissä. Välttämättömyys yhdelle vasteelle ei yksin tarkoita kentän tunnistamista. Vahva uusi yhdistelmä mittaisi saman lähivasteen ja myöhemmän suojan sekä CRY- että ATG-interventioissa; ennen sellaista vertailua kenttäanturi–autofagia-sarjakytkentä pysyy ehdokkaana, vaikka molemmille haaroille on erillistä näyttöä.",
};

/** Finding 50: four explanations for chronic exposure with separable predictions. */
export interface ChronicMechanism {
  mechanism: LocalizedText;
  prediction: LocalizedText;
}

export const CHRONIC_MECHANISMS: ChronicMechanism[] = [
  {
    mechanism: { en: "Damage saturation", fi: "Vauriokyllästyminen" },
    prediction: {
      en: "A weakened baseline together with a reduced additional response, if the instrument reads the same damage load",
      fi: "Heikentynyt lähtötaso yhdessä pienentyneen lisävasteen kanssa, jos mittari lukee samaa vauriokuormaa",
    },
  },
  {
    mechanism: { en: "Protective adaptation", fi: "Suojaava adaptaatio" },
    prediction: {
      en: "Improved challenge tolerance and often a temporal recovery",
      fi: "Kohentunut haastetoleranssi ja usein ajallinen palautuminen",
    },
  },
  {
    mechanism: { en: "Sensitisation", fi: "Herkistyminen" },
    prediction: { en: "A larger additional response", fi: "Suurempi lisävaste" },
  },
  {
    mechanism: { en: "Selection", fi: "Valikoituminen" },
    prediction: {
      en: "The population's composition or response distribution changes, not necessarily the individual cell",
      fi: "Populaation koostumus tai vastejakauma muuttuu, ei välttämättä yksittäinen solu",
    },
  },
];

export const CHRONIC_MECHANISM_NOTE: LocalizedText = {
  en: "These can be assessed from existing studies given sham groups' absolute levels, response distributions, passage and lineage data, and measurement times. A published yes/no result is not enough. A chronically exposed control is therefore not one numerical correction factor. Making the alternatives distinguishable is what strengthens the history question — and it also prevents flipping a result's sign afterwards under the same word \"saturation\".",
  fi: "Näitä voi arvioida olemassa olevista tutkimuksista, jos saatavilla ovat sham-ryhmien absoluuttiset tasot, vastejakaumat, passage- ja sukulinjatiedot sekä mittausajat. Julkaistu kyllä/ei-tulos ei riitä. Kroonisesti altistunut verrokki ei siis ole yksi numeerinen korjauskerroin. Vaihtoehtojen erotettavaksi tekeminen vahvistaa historiakysymystä — ja estää myös tuloksen merkin vaihtamisen jälkikäteen saman kyllästymissanan avulla.",
};

/** Section 8: what an existing archive could still settle. */
export interface RecoverableData {
  dataset: string;
  needed: LocalizedText;
  settles: LocalizedText;
}

export const RECOVERABLE_DATA: RecoverableData[] = [
  {
    dataset: "Sannino LTE–CW",
    needed: {
      en: "MATLAB code, I/Q buffer, repetition length, local calibration",
      fi: "MATLAB-koodi, I/Q-puskuri, toistopituus, paikallinen kalibrointi",
    },
    settles: {
      en: "Is the protective LTE signal's window score larger than CW's?",
      fi: "Onko suojaavan LTE:n ikkunapiste suurempi kuin CW:n?",
    },
  },
  {
    dataset: "Belyaev UMTS/GSM",
    needed: {
      en: "Test modes, a fast power or I/Q recording, local geometry",
      fi: "Testitilat, nopea teho- tai I/Q-tallenne, paikallinen geometria",
    },
    settles: {
      en: "Does the same score predict the strong UMTS response and the 905/915 difference?",
      fi: "Ennustaako sama piste voimakkaan UMTS-vasteen ja 905/915-eron?",
    },
  },
  {
    dataset: "Schuermann",
    needed: {
      en: "The identified supplementary package and generator specifications",
      fi: "Tunnistettu lisäaineistopaketti ja generaattorimääritykset",
    },
    settles: {
      en: "How did 217 / basic / talk / UMTS actually differ from each other?",
      fi: "Miten 217 / basic / talk / UMTS todella erosivat toisistaan?",
    },
  },
  {
    dataset: "Sannino / Zeni",
    needed: {
      en: "Group data for the independent replicates, and the schedules",
      fi: "Riippumattomien koetoistojen ryhmätiedot ja aikataulut",
    },
    settles: {
      en: "The RF × chemical × repair and medium-transfer contrasts, with uncertainty",
      fi: "RF × kemikaali × korjaus- ja nestesiirtokontrastit ja epävarmuus",
    },
  },
  {
    dataset: "History studies",
    needed: {
      en: "Sham baselines, passage, lineage, culture state",
      fi: "Sham-lähtötasot, passage, sukulinja, kasvatustila",
    },
    settles: {
      en: "Damage, adaptation, sensitisation and selection told apart",
      fi: "Vaurio, adaptaatio, herkistyminen ja valikoituminen erilleen",
    },
  },
];

export const RECOVERABLE_DATA_NOTE: LocalizedText = {
  en: "This information may sit in the authors' existing archives even where it is not in the published article. It was not obtained here and the authors were not contacted. A standard or a patent does not uniquely substitute for the file an experiment actually used.",
  fi: "Nämä tiedot voivat olla tekijöiden olemassa olevissa arkistoissa, vaikka ne eivät sisälly julkaistuun artikkeliin. Niitä ei tässä hankittu eikä tekijöihin otettu yhteyttä. Standardi tai patentti ei yksikäsitteisesti korvaa kokeen käyttämää tiedostoa.",
};

/** Section 8: the decision rule for independent validation. */
export const DECISION_RULE: LocalizedText[] = [
  {
    en: "Before opening any new outcome data, lock the endpoint, the weak-response operating range, the treatment of the background field, the normalisation, the window width and the uncertainty calculation.",
    fi: "Ennen uuden tulosaineiston avaamista lukitaan päätepiste, heikon vasteen käyttöalue, taustakentän käsittely, normalisointi, ikkunan leveys ja epävarmuuden laskenta.",
  },
  {
    en: "Rank experiments that use the same biological system and comparable dosing by effect size, not by p-value.",
    fi: "Samaa biologista järjestelmää ja vertailukelpoista annostusta käyttävät kokeet asetetaan järjestykseen vaikutuskokojen, ei p-arvojen perusteella.",
  },
  {
    en: "Keep positive and negative findings, and protective and damaging directions, in the register.",
    fi: "Positiiviset ja negatiiviset löydökset sekä suojaavat ja vaurioittavat suunnat säilytetään rekisterissä.",
  },
  {
    en: "Strong support would mean one predefined driver predicting the strong UMTS and weak GSM cases and new data as well, without technology-specific coefficients.",
    fi: "Vahva tuki tarkoittaisi sitä, että yksi etukäteen määritelty ajuri ennustaa voimakkaat UMTS- ja heikot GSM-tapaukset sekä uuden aineiston ilman teknologiakohtaisia kertoimia.",
  },
  {
    en: "Removing and re-adding one frequency component, a background-field sweep, and a CRY, ATG or channel intervention can separate the driver from the biological mediation. Failure is attributed to the sub-hypothesis actually tested.",
    fi: "Yhden taajuuskomponentin poisto ja takaisinlisäys, taustakentän pyyhkäisy sekä CRY-, ATG- tai kanavainterventio voivat erottaa ajurin biologisesta välityksestä. Epäonnistuminen kohdistetaan siihen alihypoteesiin, jota todella testattiin.",
  },
  {
    en: "The window or the memory coefficient is not changed after seeing a result unless that is named a new model and tested on new data.",
    fi: "Ikkunaa tai muistikerrointa ei vaihdeta tuloksen näkemisen jälkeen ilman, että kyse nimetään uudeksi malliksi ja testataan uudessa aineistossa.",
  },
];

export const RAW_TRACE_REQUIREMENT: LocalizedText = {
  en: "For a raw time trace the current programme requires at least 200 samples per second over a 20-second span, calibration, and controlled anti-aliasing. Those are minimum conditions for the calculation, not guarantees that the whole experiment is represented. Describing slow power control, movement and long-term exposure needs a recording that spans their own timescales: a five-second temperature log is not an adequate 25 Hz exposure measurement.",
  fi: "Raaka-aikajäljelle nykyinen ohjelma edellyttää vähintään 200 näytettä sekunnissa 20 sekunnin jaksolla, kalibrointia ja hallittua laskostumisen estoa. Nämä ovat laskennan vähimmäisehtoja, eivät takeita koko kokeen edustavuudesta. Hitaan tehonsäädön, liikkeen ja pitkäaikaisen altistuksen kuvaaminen vaatii tallenteen, joka kattaa niiden omat aikaskaalat: lämpötilan viiden sekunnin loki ei ole riittävä 25 Hz:n altistusmittaus.",
};

/** Finding 54: the overall assessment and the TFR bridge. */
export const CONVERGENCE_ASSESSMENT = {
  direction: {
    en: "The strongest shared direction is that predicting a biological response can depend on the local temporal field structure, the background field, the receiver's state, the exposure history, and the chosen measurement time and endpoint. Some of these variables have been shown experimentally in particular systems, and there is now a calculable candidate for combining them. That is considerably more precise support for BERM's research programme than one general EMF–disease association.",
    fi: "Vahvin yhteinen suunta on, että biologisen vasteen ennustamiseen voivat vaikuttaa paikallinen ajallinen kenttärakenne, taustakenttä, vastaanottimen tila, altistushistoria sekä valittu mittaushetki ja päätepiste. Osa näistä muuttujista on osoitettu kokeellisesti tietyissä järjestelmissä, ja niiden yhdistämiseen on nyt laskettava ehdokas. Tämä on BERM:n tutkimusohjelmalle huomattavasti täsmällisempi tuki kuin yksi yleinen EMF–sairausassosiaatio.",
  },
  notEstablished: [
    {
      en: "It does not mean every effect has the same cause.",
      fi: "Se ei tarkoita, että kaikki vaikutukset olisivat samasta syystä.",
    },
    {
      en: "It does not mean the Lindgren coupling is established: specific support would require the same physically fixed parameters to predict the background, direction, phase, frequency and amplitude dependences without per-result retuning, and several ordinary electromagnetic and biological mechanisms can produce non-linearity.",
      fi: "Se ei tarkoita, että Lindgren-kytkentä olisi osoitettu: erityinen tuki edellyttäisi samojen fysikaalisesti määrättyjen parametrien ennustavan tausta-, suunta-, vaihe-, taajuus- ja amplitudiriippuvuudet ilman tuloskohtaista uudelleensäätöä, ja useat tavanomaiset sähkömagneettiset ja biologiset mekanismit voivat tuottaa epälineaarisuutta.",
    },
    {
      en: "It does not mean a TFR share can be calculated.",
      fi: "Se ei tarkoita, että TFR-osuus voitaisiin laskea.",
    },
  ],
  tfrBridge: [
    { en: "Real exposure distributions", fi: "Todelliset altistusjakaumat" },
    {
      en: "A link from biological capacity to age-specific fertility",
      fi: "Yhteys biologisesta kapasiteetista ikäkohtaiseen hedelmällisyyteen",
    },
    { en: "Separation of the other factors", fi: "Muiden tekijöiden erottelu" },
  ],
  tfrBridgeNote: {
    en: "These intermediate steps are not replaced by the number of cell studies, and no unjustified percentage share of the fertility decline is calculated from the present material.",
    fi: "Näitä väliportaita ei korvata solututkimusten lukumäärällä, eikä nykyisestä aineistosta lasketa perustelematonta prosenttiosuutta syntyvyyden laskulle.",
  },
} as const;
