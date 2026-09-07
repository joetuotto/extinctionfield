/**
 * Cell memory, gene interventions and reproductive biology (findings 35–46),
 * plus the exposure-class register (Appendix A).
 *
 * Source: berm/docs/berm-new-findings-and-refinements-2026-09-07.md.
 *
 * Every entry states what the intervention locates AND the transfer limit.
 * The recurring bound is the one the source document states most sharply:
 * an intervention that is necessary for a response does not thereby identify
 * the field sensor, and results from different exposure classes do not
 * combine into one "EMF effect".
 */

import type { LocalizedText } from "./correction_registry";
import type { FindingStatus } from "./signal_structure";

export interface BiologicalFinding {
  id: string;
  findings: string;
  title: LocalizedText;
  status: FindingStatus;
  /** Exposure class and dose, stated so classes are not silently merged. */
  exposure: LocalizedText;
  /** What the study or intervention locates. */
  locates: LocalizedText;
  /** The transfer limit: what may not be concluded from it. */
  limit: LocalizedText;
  referenceIds?: string[];
}

/** Findings 35–43: exposure history, repair capacity and the receiving state. */
export const CELL_MEMORY_FINDINGS: BiologicalFinding[] = [
  {
    id: "rf_pretreatment_memory",
    findings: "35",
    title: {
      en: "A radiofrequency pre-treatment can change a response 20 hours later",
      fi: "RF-esikäsittely voi muuttaa vastetta 20 tuntia myöhemmin",
    },
    status: "experimentally_bounded",
    exposure: {
      en: "1950 MHz UMTS, SAR 0.3 or 1.25 W/kg, SH-SY5Y cells; exposure at culture hours 48–51, menadione challenge at hours 71–72",
      fi: "1950 MHz UMTS, SAR 0,3 tai 1,25 W/kg, SH-SY5Y-solut; altistus viljelytunneilla 48–51, menadionihaaste tunneilla 71–72",
    },
    locates: {
      en: "The pre-treatment reduced later DNA damage across an interval free of the given radiofrequency exposure. This replaces the general assumption that a cell may have memory with a bounded observation: an earlier treatment changes a later response across a long gap.",
      fi: "Esikäsittely vähensi myöhempää DNA-vauriota välin yli, joka oli vapaa annetusta RF-altistuksesta. Tämä korvaa yleisen oletuksen solun mahdollisesta muistista rajatulla havainnolla: aiempi käsittely muuttaa myöhempää vastetta pitkän välin yli.",
    },
    limit: {
      en: "This supports a protective state, not a demonstration of accumulated damage. One post-interval does not fix an exponential time constant τ ≥ 20 h. Radiofrequency alone did not change measured DNA damage or the TRX1, HSF1, HSP70 and PARP1 expression studied in that short setup, so a functional after-effect can fall outside a single baseline gene panel.",
      fi: "Tämä tukee suojaavaa tilaa, ei kertyneen vaurion osoitusta. Yksi jälkiviive ei määritä eksponentiaalista aikavakiota τ ≥ 20 h. RF yksin ei muuttanut mitattua DNA-vauriota eikä tutkittuja TRX1-, HSF1-, HSP70- ja PARP1-ilmentymiä kyseisessä lyhyessä asetelmassa, joten funktionaalinen jälkivaikutus voi jäädä yksittäisen perustason geenipaneelin ulkopuolelle.",
    },
    referenceIds: ["sannino2024"],
  },
  {
    id: "autophagy_dependence",
    findings: "36",
    title: { en: "Autophagy is a named, intervention-bounded part of the protective response", fi: "Autofagia on nimetty, interventioilla rajattu suojaavan vasteen osa" },
    status: "experimentally_bounded",
    exposure: {
      en: "20 h UMTS pre-treatment, SH-SY5Y cells; pharmacological autophagy inhibitors and loss of ATG5 or ATG7 function",
      fi: "20 tunnin UMTS-esikäsittely, SH-SY5Y-solut; autofagian estäjät sekä ATG5- tai ATG7-toiminnan poisto",
    },
    locates: {
      en: "The protective effect disappeared under both chemical and genetic interference. Combining the two bounds the mechanism more than a single expression change would. In BERM's terms the history term can be sharpened towards recycling and repair capacity: net damage is formation minus removal, and exposure may change the second of those.",
      fi: "Suojaava vaikutus hävisi sekä kemiallisella että geneettisellä puuttumisella. Yhdistelmä rajaa mekanismia enemmän kuin yksittäinen ilmentymismuutos. BERM:n termeissä historiatermiä voi tarkentaa kierrätys- ja korjauskapasiteettiin: nettovaurio on muodostuminen miinus poistuminen, ja altistus voi muuttaa jälkimmäistä.",
    },
    limit: {
      en: "ATG5/7 dependence does not identify the first EMF receptor. A gene intervention's general effect on growth and chemical sensitivity has to be separated from the radiofrequency interaction, and the existing system allows that separation to be made quantitative.",
      fi: "ATG5/7-riippuvuus ei yksilöi ensimmäistä EMF-vastaanotinta. Geeni-intervention yleinen vaikutus kasvuun ja kemialliseen herkkyyteen täytyy erottaa RF-interaktiosta, ja olemassa oleva järjestelmä sallii tuon erottelun tekemisen määrälliseksi.",
    },
    referenceIds: ["sannino2022_autophagy_adaptive"],
  },
  {
    id: "parp_dependence",
    findings: "37",
    title: { en: "PARP dependence supports the repair branch without locating the sensor", fi: "PARP-riippuvuus tukee korjaushaaraa paikantamatta sensoria" },
    status: "experimentally_bounded",
    exposure: {
      en: "UMTS pre-treatment with a mitomycin C challenge; human lymphocytes and V79 cells; 3-aminobenzamide as the PARP inhibitor",
      fi: "UMTS-esikäsittely ja MMC-haaste; ihmisen lymfosyytit ja V79-solut; 3-aminobentsamidi PARP:n estäjänä",
    },
    locates: {
      en: "The inhibitor blocked the adaptive protection, raising a PARP-mediated repair and stress response to a named part of the biological reading. With the autophagy result it supports a model in which one radiofrequency pre-treatment changes the cell's later handling capacity along several connected routes.",
      fi: "Estäjä esti adaptiivisen suojan, mikä nostaa PARP-välitteisen korjaus- ja stressivasteen nimetyksi osaksi biologista tulkintaa. Autofagiatuloksen kanssa se tukee mallia, jossa yksi RF-esikäsittely muuttaa solun myöhempää käsittelykapasiteettia usealla kytkeytyvällä reitillä.",
    },
    limit: {
      en: "The intervention may act on the formation of the protection or on the handling of the chemical damage; it does not show that EMF acts directly on the PARP protein. The order and necessity of these routes has to be resolved in one system — separate studies do not automatically compose into one proven serial chain.",
      fi: "Interventio voi vaikuttaa suojan muodostumiseen tai kemiallisen vaurion käsittelyyn; se ei osoita EMF:n vaikuttavan suoraan PARP-proteiiniin. Reittien järjestys ja välttämättömyys on ratkaistava samassa järjestelmässä — eri tutkimuksista ei muodostu automaattisesti yhtä todistettua sarjaketjua.",
    },
    referenceIds: ["sannino2019_parp_adaptive"],
  },
  {
    id: "medium_transfer",
    findings: "38",
    title: { en: "The effect transfers in culture medium", fi: "Vaikutus siirtyy kasvatusnesteessä" },
    status: "experimentally_bounded",
    exposure: {
      en: "Medium from radiofrequency-exposed SH-SY5Y cells transferred to unexposed recipient cells",
      fi: "RF-altistettujen SH-SY5Y-solujen kasvatusneste siirrettiin altistamattomille vastaanottajasoluille",
    },
    locates: {
      en: "Recipients showed less menadione DNA damage. HSP70 rose in the exposed cells' medium while intracellular HSP70 did not change correspondingly. A biological effect of the exposure can therefore cross the boundary of the directly exposed cell population, which makes shared medium, its exchange timing and conditioning causally relevant to a design.",
      fi: "Vastaanottajissa menadionin DNA-vaurio oli pienempi. HSP70 kohosi altistettujen solujen nesteessä, kun solunsisäinen HSP70 ei muuttunut vastaavasti. Altistuksen biologinen vaikutus voi siis ylittää suoraan altistetun solujoukon rajan, mikä tekee yhteisestä nesteestä, sen vaihtoajasta ja ehdollistamisesta kausaalisesti merkityksellisiä asetelmalle.",
    },
    limit: {
      en: "HSP70 stays a candidate mediator: a rise alone does not identify it as the cause. The result does not mean that ordinary separate cultures are always contaminated. Fractionation, neutralisation or a restoration experiment would sharpen the mediator.",
      fi: "HSP70 pysyy välittäjäehdokkaana: kohoaminen ei yksin yksilöi sitä syyksi. Tulos ei tarkoita, että tavalliset erilliset viljelmät olisivat aina kontaminoituneet. Fraktiointi, neutralointi tai palautuskoe tarkentaisi välittäjän.",
    },
    referenceIds: ["zeni2021_bystander"],
  },
  {
    id: "cry_dependence",
    findings: "39",
    title: { en: "Cryptochrome dependence is shown in a particular PEMF system", fi: "Kryptokromiriippuvuus on osoitettu tietyssä PEMF-järjestelmässä" },
    status: "experimentally_bounded",
    exposure: {
      en: "Low-frequency millitesla-class pulsed magnetic field, not 900 MHz – 3.5 GHz environmental radiofrequency",
      fi: "Pienitaajuinen milliteslaluokan pulssitettu magneettikenttä, ei 900 MHz – 3,5 GHz:n ympäristö-RF",
    },
    locates: {
      en: "Silencing cryptochromes in human cells and a Cry1/Cry2 double knockout in mouse cells removed the studied ROS response; human CRY1 restored a field-related behavioural response in a cryptochrome-deficient fly model. A conserved cellular protein can therefore take part in a field response without a navigating animal.",
      fi: "Kryptokromien hiljentäminen ihmisen soluissa ja Cry1/Cry2-kaksoispoisto hiiren soluissa hävitti tutkitun ROS-vasteen; ihmisen CRY1 palautti kenttään liittyvän käyttäytymisvasteen kryptokromipuutteisessa kärpäsmallissa. Konservatiivinen soluproteiini voi siis osallistua kenttävasteeseen ilman suunnistavaa eläintä.",
    },
    limit: {
      en: "The cellular ROS result and the fly behavioural rescue are different endpoints. Transfer to a radiofrequency power envelope needs a separate transduction chain: a power envelope is not itself a real magnetic field oscillating at that frequency.",
      fi: "Solujen ROS-tulos ja kärpäsen käyttäytymisen palautus ovat eri päätepisteitä. Siirto radiotaajuisen tehon verhokäyrään vaatii erillisen transduktioketjun: tehoverhokäyrä ei ole sellaisenaan samalla taajuudella värähtelevä magneettikenttä.",
    },
    referenceIds: ["sherrard2018"],
  },
  {
    id: "cry2_trpc1_axis",
    findings: "40",
    title: { en: "The CRY2–RFK/FAD–TRPC1 axis makes the cell state measurable", fi: "CRY2–RFK/FAD–TRPC1-akseli tekee solutilasta mitattavan" },
    status: "experimentally_bounded",
    exposure: {
      en: "1.5 mT PEMF, ten minutes, C2C12 muscle cells; downward field more effective than upward; 48 h dark culture weakened the response",
      fi: "1,5 mT PEMF, kymmenen minuuttia, C2C12-lihassolut; alaspäin suunnattu kenttä tehokkaampi kuin ylöspäin; 48 tunnin pimeäkasvatus heikensi vastetta",
    },
    locates: {
      en: "Adding CRY2 strengthened and silencing it weakened the response; silencing RFK weakened the FAD-related response and the direction discrimination. CRY2 and TRPC1 appeared in the same experimentally observed protein complex. TRPC1 is not a voltage-gated calcium channel, so this opens a measurable alternative channel route beside the VGCC branch.",
      fi: "CRY2:n lisääminen vahvisti ja hiljentäminen heikensi vastetta; RFK:n hiljentäminen heikensi FAD:iin liittyvää vastetta ja suunnan erottelua. CRY2 ja TRPC1 esiintyivät samassa kokeellisesti havaitussa proteiinikokonaisuudessa. TRPC1 ei ole jänniteohjattu kalsiumkanava, joten tämä avaa mitattavan vaihtoehtoisen kanavareitin VGCC-haaran rinnalle.",
    },
    limit: {
      en: "Co-precipitation alone does not show direct binding of two purified molecules. The general claim that darkness heightens field sensitivity has to be bounded per tissue. The measured response concerned the progression of myogenesis, so it is not recorded as an observation of reproductive harm.",
      fi: "Yhteissaostus ei yksin osoita kahden puhdistetun molekyylin suoraa sitoutumista. Yleinen väite pimeyden voimistamasta kenttäherkkyydestä on rajattava kudoskohtaisesti. Mitattu vaste liittyi myogeneesin edistymiseen, joten sitä ei kirjata lisääntymishaitan havainnoksi.",
    },
    referenceIds: ["iversen2025"],
  },
  {
    id: "hypomagnetic_background",
    findings: "41",
    title: { en: "Removing the geomagnetic background can itself disturb cell function", fi: "Geomagneettisen taustan poistaminen voi itsessään häiritä solutoimintaa" },
    status: "experimentally_bounded",
    exposure: {
      en: "Mouse, from about 55 µT to a hypomagnetic environment of about 0.29 µT",
      fi: "Hiiri, noin 55 µT:n kentästä noin 0,29 µT:n hypomagneettiseen ympäristöön",
    },
    locates: {
      en: "The change reduced hippocampal neural stem cell ROS and neurogenesis, and returning to the geomagnetic field or altering ROS pharmacologically restored responses. This sharpens the control: the smallest possible total field is not automatically biologically neutral, and the artificial alternating component has to be separated from the geomagnetic background.",
      fi: "Muutos vähensi hippokampuksen hermokantasolujen ROS-tasoa ja neurogeneesiä, ja geomagneettiseen kenttään palaaminen tai ROS:n farmakologinen muuttaminen palautti vasteita. Tämä tarkentaa kontrollia: pienin mahdollinen kokonaiskenttä ei ole automaattisesti biologisesti neutraali, ja keinotekoinen vaihtuva komponentti on erotettava geomagneettisesta taustasta.",
    },
    limit: {
      en: "The finding concerned a named cell population; it does not mean a general ROS reduction across the organism. It does not fix one optimal field for all tissues and does not show an effect of modern radiofrequency exposure.",
      fi: "Havainto koski nimettyä solupopulaatiota; se ei tarkoita yleistä ROS:n vähenemistä koko elimistössä. Se ei määritä kaikille kudoksille yhtä optimaalista kenttää eikä osoita modernin RF-altistuksen vaikutusta.",
    },
    referenceIds: ["zhang2021"],
  },
  {
    id: "developmental_history",
    findings: "42",
    title: { en: "Developmental history can change frequency selectivity", fi: "Kehityshistoria voi muuttaa taajuusvalikoivuutta" },
    status: "experimentally_bounded",
    exposure: {
      en: "Chicken eggs incubated 21 days in a 50 or 60 Hz electric field; post-hatch brain-tissue Ca²⁺ efflux test",
      fi: "Kananmunia haudottiin 21 päivää 50 tai 60 Hz:n sähkökentässä; kuoriutumisen jälkeinen aivokudoksen Ca²⁺-ulosvirtauskoe",
    },
    locates: {
      en: "After 60 Hz developmental exposure a response appeared at 50 Hz but not at 60 Hz; after 50 Hz developmental exposure neither test frequency produced a response. The history term therefore need not be described only as a fall in overall sensitivity: it can change the shape of the response window, or which frequency the tissue answers. This is direct experimental grounds for controlling developmental history in replication designs.",
      fi: "60 Hz:n kehitysaltistuksen jälkeen vaste ilmeni 50 Hz:lle mutta ei 60 Hz:lle; 50 Hz:n kehitysaltistuksen jälkeen kumpikaan testitaajuus ei tuottanut vastetta. Historiatermiä ei siis tarvitse kuvata vain kokonaisherkkyyden alenemisena: se voi muuttaa vasteikkunan muotoa tai sitä, mille taajuudelle kudos vastaa. Tämä on suora koeperuste kehityshistorian kontrolloinnille replikaatioasetelmissa.",
    },
    limit: {
      en: "The experiment concerned development within one individual and does not show a change inherited across generations. The exposure must not be described as merely a magnetic field: in the original setup the electric field was the central defined quantity.",
      fi: "Koe koski saman yksilön kehitystä eikä osoita sukupolvien yli periytyvää muutosta. Altistetta ei pidä kuvata pelkäksi magneettikentäksi: alkuperäisasetelmassa sähkökenttä oli keskeinen määritelty suure.",
    },
    referenceIds: ["blackman1988_calcium_efflux"],
  },
  {
    id: "cell_passage",
    findings: "43",
    title: { en: "Cell passage is a real effect-modifying variable", fi: "Solupassage on todellinen vaikutusta muuntava muuttuja" },
    status: "experimentally_bounded",
    exposure: {
      en: "Broad replication across modulated wireless signals; MRC-5 cells at early versus later passage",
      fi: "Laaja replikaatio moduloiduilla langattomilla signaaleilla; MRC-5-solut varhaisessa ja myöhemmässä passagessa",
    },
    locates: {
      en: "An ELF response present at early passage disappeared at a later one. In the same work most radiofrequency comparisons were negative, and a small early difference seen with UMTS and EMS did not persist under longer exposure. A cell line's name is therefore not a guarantee of an unchanged receiver, which identifies a measurable biological moderator.",
      fi: "Varhaisessa passagessa havaittu ELF-vaste katosi myöhemmässä. Samassa työssä suurin osa RF-vertailuista jäi negatiiviseksi, eikä UMTS:n ja EMS:n yhteydessä nähty pieni varhainen ero säilynyt pidemmässä altistuksessa. Solulinjan nimi ei siis takaa muuttumatonta vastaanotinta, mikä tunnistaa mitattavan biologisen moderaattorin.",
    },
    limit: {
      en: "Passage can mean ageing, differentiation, selection and much else. Accumulated EMF damage was not separated out as the cause there, and the same observation fits several state-dependent models, so EMF history needs its own documentation and intervention.",
      fi: "Passage voi tarkoittaa ikääntymistä, erilaistumista, selektiota ja monta muuta. Kertynyttä EMF-vauriota ei siinä erotettu syyksi, ja sama havainto sopii useaan tilariippuvaiseen malliin, joten EMF-historia tarvitsee oman dokumentoinnin ja intervention.",
    },
    referenceIds: ["schuermann2020_passage"],
  },
];

/** Findings 44–46: functional reproductive endpoints. */
export const REPRODUCTIVE_FINDINGS: BiologicalFinding[] = [
  {
    id: "catsper_function",
    findings: "44",
    title: {
      en: "CatSper separates a normal semen analysis from normal fertilising function",
      fi: "CatSper erottaa normaalin siemennesteanalyysin normaalista hedelmöitystoiminnasta",
    },
    status: "experimentally_bounded",
    exposure: { en: "Genetic study of 2286 men — not an EMF experiment", fi: "2286 miehen geneettinen tutkimus — ei EMF-koe" },
    locates: {
      en: "Nine CatSper function deficiencies were found, mostly linked to CATSPER2. Ordinary semen parameters could be normal while sperm failed to hyperactivate as fertilisation requires, and ICSI could bypass the defect where natural conception and ordinary IVF failed. This confirms the separation of functional reproductive capacity from baseline parameters.",
      fi: "Löydettiin yhdeksän CatSper-toiminnan puutosta, pääosin CATSPER2:een liittyviä. Tavalliset siemennesteparametrit saattoivat olla normaaleja, vaikka siittiöt eivät hyperaktivoituneet hedelmöityksen edellyttämällä tavalla, ja ICSI saattoi ohittaa häiriön siellä missä luonnollinen hedelmöittyminen ja tavallinen IVF epäonnistuivat. Tämä vahvistaa toiminnallisen lisääntymiskyvyn ja perusparametrien erottelun.",
    },
    limit: {
      en: "The genetic study does not show that EMF causes the identified deficiencies. A possible EMF effect on CatSper would have to appear in a named Ca²⁺ or hyperactivation endpoint and a suitable fertilisation assay.",
      fi: "Geenitutkimus ei osoita, että EMF aiheuttaisi tunnistetut puutokset. Mahdollisen EMF-vaikutuksen CatSperiin pitäisi näkyä nimetyssä Ca²⁺- tai hyperaktivaatiopäätepisteessä ja sopivassa hedelmöityskokeessa.",
    },
    referenceIds: ["catsper2024"],
  },
  {
    id: "endpoint_decoupling",
    findings: "45",
    title: {
      en: "Sperm damage and fertilising capacity already decouple in one RF experiment",
      fi: "Spermavaurio ja hedelmöityskyky irtoavat jo yhdessä RF-kokeessa",
    },
    status: "experimentally_bounded",
    exposure: {
      en: "Mouse, 905 MHz, about 2.2 W/kg, 12 h per day, up to five weeks",
      fi: "Hiiri, 905 MHz, noin 2,2 W/kg, 12 tuntia päivässä, enintään viisi viikkoa",
    },
    locates: {
      en: "Exposure was associated with sperm ROS and DNA changes and, in the longest arm, reduced motility, while IVF and early embryo development were not impaired in the measured experiments. That fits a reproductive-reserve reading in which a biomarker moves before measured function does, and it shows why \"fertility normal\" and \"biological effect observed\" can both be correct about different endpoints.",
      fi: "Altistus liittyi siittiöiden ROS- ja DNA-muutoksiin ja pisimmässä haarassa liikkuvuuden heikkenemiseen, kun IVF ja varhainen alkionkehitys eivät heikentyneet mitatuissa kokeissa. Tämä sopii lisääntymisreservin ajatukseen, jossa biomarkkeri muuttuu ennen mitattua toimintakykyä, ja osoittaa miksi sekä \"hedelmällisyys normaali\" että \"biologinen vaikutus havaittu\" voivat olla oikeita eri päätepisteistä.",
    },
    limit: {
      en: "It does not show a later exhaustion or collapse of the reserve. A 905 MHz carrier must not automatically be named a verified GSM waveform. The useful prediction is a temporal and functional ordering, which should be measured in one system.",
      fi: "Se ei osoita reservin myöhempää loppumista tai romahdusta. 905 MHz:n kantajaa ei pidä automaattisesti nimetä varmennetuksi GSM-aaltomuodoksi. Hyödyllinen ennuste on ajallinen ja funktionaalinen järjestys, joka pitäisi mitata samassa järjestelmässä.",
    },
    referenceIds: ["sci-rep-2019-sperm-ros"],
  },
  {
    id: "spock3_barrier",
    findings: "46",
    title: { en: "SPOCK3 and the blood–testis barrier locate a slow tissue route", fi: "SPOCK3 ja veri–kiveseste paikantavat hitaan kudosreitin" },
    status: "experimentally_bounded",
    exposure: {
      en: "Rat, 150 days of phone exposure; comparison points at 50 and 100 days",
      fi: "Rotta, 150 päivän puhelinaltistus; vertailupisteet 50 ja 100 päivän kohdalla",
    },
    locates: {
      en: "Sperm and testis changes appeared at 150 days but not correspondingly at 50 or 100 days, and blocking the SPOCK3 rise mitigated the barrier and sperm changes and the MMP14–MMP2 deviations. That separates a slow disturbance of the tissue environment from an acute duct dysfunction, and the named intervention chain strengthens the biological mechanism in this experiment.",
      fi: "Siittiö- ja kivesmuutokset ilmenivät 150 päivän kohdalla mutta eivät vastaavasti 50 tai 100 päivän kohdalla, ja SPOCK3:n nousun estäminen lievitti este- ja siittiömuutoksia sekä MMP14–MMP2-poikkeamia. Tämä erottaa hitaan kudosympäristön häiriön akuutista tiehytten toimintahäiriöstä, ja nimetty interventioketju vahvistaa biologista mekanismia tässä kokeessa.",
    },
    limit: {
      en: "The observation times bound when the change appeared in that series but do not give a precise threshold such as 120 days. A \"4G\" label does not verify an LTE signal. The mating result of 13/15 against 10/14 did not show a clear fertility collapse, and an exposure-specific explanation needs better dosimetry and waveform.",
      fi: "Havaintoajankohdat rajaavat muutoksen ilmaantumista kyseisessä sarjassa mutta eivät anna tarkkaa esimerkiksi 120 päivän kynnystä. \"4G\"-nimike ei varmista LTE-signaalia. Pariutumistulos 13/15 vastaan 10/14 ei osoittanut selvää hedelmällisyysromahdusta, ja altistekohtainen selitys tarvitsee paremman dosimetrian ja aaltomuodon.",
    },
    referenceIds: ["yu2019_btb"],
  },
];

/** Appendix A: exposure classes and the limits on transferring mechanisms between them. */
export interface ExposureClassRow {
  evidence: string;
  exposure: LocalizedText;
  targets: LocalizedText;
  referenceIds?: string[];
}

export const EXPOSURE_CLASSES: ExposureClassRow[] = [
  {
    evidence: "Koch / Blackman IPR",
    exposure: { en: "DC background + weak ELF, defined geometry", fi: "DC-tausta + heikko ELF, määrätty geometria" },
    targets: { en: "The reported frequency and amplitude windows", fi: "Raportoidut taajuus- ja amplitudi-ikkunat" },
    referenceIds: ["baureuskoch2003_vesicle_ipr", "blackman1994_ipr_pc12"],
  },
  {
    evidence: "Sherrard / Iversen",
    exposure: { en: "Millitesla-class PEMF", fi: "Milliteslaluokan PEMF" },
    targets: {
      en: "CRY, redox and channel dependence under those conditions",
      fi: "CRY-, redox- ja kanavariippuvuus kyseisissä oloissa",
    },
    referenceIds: ["sherrard2018", "iversen2025"],
  },
  {
    evidence: "Zhang",
    exposure: { en: "Strong reduction of the geomagnetic background", fi: "Geomagneettisen taustan voimakas vähentäminen" },
    targets: { en: "Neural stem cell redox and neurogenesis", fi: "Hermokantasolujen redox ja neurogeneesi" },
    referenceIds: ["zhang2021"],
  },
  {
    evidence: "Sannino / Zeni",
    exposure: { en: "1950 MHz radiofrequency pre-treatment", fi: "1950 MHz:n RF-esikäsittely" },
    targets: {
      en: "Adaptation, repair, autophagy and the medium-borne response",
      fi: "Adaptaatio, korjaus, autofagia ja nestevälitteinen vaste",
    },
    referenceIds: ["sannino2024", "sannino2022_autophagy_adaptive", "zeni2021_bystander"],
  },
  {
    evidence: "Houston / Yu",
    exposure: { en: "Radiofrequency or phone exposure in animals", fi: "RF- tai puhelinaltistus eläimillä" },
    targets: { en: "Sperm biology and the slow tissue-barrier branch", fi: "Spermabiologia ja hidas kudosestehaara" },
    referenceIds: ["sci-rep-2019-sperm-ros", "yu2019_btb"],
  },
  {
    evidence: "Young / Ozil",
    exposure: { en: "Genetic or Ca²⁺-function intervention", fi: "Geneettinen tai Ca²⁺-toiminnan interventio" },
    targets: {
      en: "Functional mechanism of reproduction; no EMF cause",
      fi: "Lisääntymisen toiminnallinen mekanismi; ei EMF-syytä",
    },
    referenceIds: ["catsper2024", "ozil2006_calcium_code"],
  },
  {
    evidence: "Kirson TTFields",
    exposure: { en: "Intermediate-frequency electric fields", fi: "Välitaajuiset sähkökentät" },
    targets: {
      en: "Field intervention on cell division in a therapy-type setting",
      fi: "Solunjakautumisen kenttäinterventio hoitotyyppisessä asetelmassa",
    },
    referenceIds: ["kirson2004_ttfields"],
  },
  {
    evidence: "Publication map",
    exposure: { en: "Varying radiofrequency experiments and study classes", fi: "Vaihtelevat RF-kokeet ja tutkimusluokat" },
    targets: {
      en: "Relations in result reporting; no shared measured waveform",
      fi: "Tulosraportoinnin yhteydet; ei yhteinen mitattu aaltomuoto",
    },
  },
];

export const EXPOSURE_CLASS_NOTE: LocalizedText = {
  en: "A shared cellular route may connect rows as a hypothesis. The rows' exposure physics does not become the same because one of them involves Ca²⁺, ROS or the same frequency number.",
  fi: "Yhteinen solureitti voi yhdistää rivejä hypoteesina. Rivien altistusfysiikka ei muutu samaksi siksi, että jokin niistä sisältää Ca²⁺:n, ROS:n tai saman taajuusnumeron.",
};
