import { SteroidogenesisIntegrationPanel } from "@/components/SteroidogenesisIntegrationPanel";
import type { Metadata } from "next";
import Link from "next/link";
import { Layers } from "lucide-react";
import { pickCopy } from "@/lib/i18n";
import { PageHeader } from "@/components/PageHeader";
import { TranslationNotice } from "@/components/TranslationNotice";
import { LayerStack } from "@/components/modulome/LayerStack";
import { ModulomeLayers } from "@/components/ModulomeLayers";
import { ModulomeStateTriad } from "@/components/modulome/StateTriad";
import { ModulomeCalciumCycle } from "@/components/modulome/CalciumCycle";
import { ModulomeStateWindow } from "@/components/modulome/StateWindow";
import { ModulomePhotonSequence } from "@/components/modulome/PhotonSequence";
import { ModulomePolarityResponse } from "@/components/modulome/PolarityResponse";
import { ModulomeFeedbackStability } from "@/components/modulome/FeedbackStability";
import { ModulomeMechanismCards } from "@/components/modulome/MechanismCards";
import { MODULOME_LAYERS } from "@/lib/modulome/layers";
import { ORGAN_PROFILES } from "@/lib/modulome/organs";
import { FERTILITY_ROUTES } from "@/lib/modulome/routes";

/* ── Bilingual copy ── */
const COPY = {
  en: {
    title: "EMF Modulome",
    subtitle:
      "Systematic mapping of electromagnetic susceptibility across the human body",
    /* Section 1: Hero */
    heroHeading: "THE HUMAN BODY AS AN ELECTROMAGNETIC SYSTEM",
    heroBody:
      "Every cell maintains voltage, every mitochondrion sustains \u0394\u03A8m, every barrier guards a gradient, every gland secretes via Ca\u00B2\u207A-dependent exocytosis, every heartbeat is paced by VGCCs. The EMF Modulome maps this: 12 layers, 12 target organs, 4 independent routes.",
    /* Section 2: Terminology */
    termHeading: "What is the EMF Modulome?",
    termBody:
      "The EMF Modulome is BERM\u2019s systematic mapping of electromagnetic susceptibility across the human body, analogous to how the genome maps genetic information and the proteome maps protein expression.",
    /* Section 3: Twelve Layers */
    layersHeading: "Twelve Layers",
    layersSubtitle:
      "From molecular spin physics to population patterns \u2014 each imported L3 response is named separately from \u03C7_geo",
    stateHeading:
      "The Receiver as a Measured State",
    stateLead:
      "The modulome names which measurable cell state sets the strength, the direction and the time course of a field response. Three quantities are kept apart because a single effect size cannot tell them apart: the receptor state s, which decides what the next exposure transduces; the repair capacity A, which processes the load that is produced; and the damage load D, which is what remains at the moment of measurement.",
    stateBody:
      "Separating them makes the history effect explainable. A small additional response can mean strengthened repair, a weakened receptor, or a baseline that has already moved. It also sharpens the replication question: instead of a publication year, what a second laboratory has to match is the declared cell history — passage number, differentiation, culture conditions and prior exposures.",
    membraneHeading:
      "Field Sensitivity in Transferable Membrane Machinery",
    membraneBody:
      "Membrane vesicles prepared from myoblasts answered a 1.5 mT pulsed field with a calcium signal, while vesicles from TRPC1-silenced cells did not. Vesicles from normal cells also partly restored field-associated respiratory and growth responses in TRPC1-silenced recipient cells. Producing the acute local response did not require an intact source cell, so the receptor coordinate is not a channel count: it is the membrane itself, its protein complexes and their location. Vesicles also give a way to localise the mechanism, because the receiver can be studied before any hormonal or behavioural response. That design used prepared vesicles; an equivalent natural transfer inside tissue is a separate hypothesis.",
    calciumHeading:
      "Calcium as a Circulation Between Compartments",
    calciumBody:
      "A 50 Hz field at 1 mT reduced inward and transient outward membrane currents in hippocampal neurons, and interfering with release from the ER store or with reuptake into it prevented those changes. The layer is therefore written as membrane channels ↔ cytosolic Ca²⁺ ↔ ER store ↔ mitochondria, and the model predicts the first calcium response, the change in the store and the later current change as three separate quantities. Measurable inputs are the resting potential, the ER calcium load, the release and recovery rates and the mitochondrial response.",
    photoHeading:
      "Flavin State and the Order of the Light",
    photoBody:
      "CRY2 amount, the RFK/FAD system, field direction and light history all changed the pulsed-field response in muscle cells. In purified human CRY1, a conformational change accompanied the move from the neutral radical to the fully reduced flavin, and the process involved the sequential absorption of two photons. The usable extension is that the same total light dose can leave a different molecular state when the order of wavelengths and the delay between them change, so the inputs become the CRY subtype, isoform and compartment, the flavin binding occupancy and redox state, and the light spectrum, intensity and temporal order. The photochemical change is observed; its magnetic modulation is the next separate test. Subtype differences matter as well, which is why no single CRY sensitivity coefficient is used for every protein.",
    directionHeading:
      "Position and Direction as a Functional Dimension",
    directionBody:
      "A screen of ion-transport genes located field-directed migration to the KCNJ15/Kir4.2 channel acting together with polyamines, using a 200 mV/mm direct field. Silencing KCNJ15 removed orientation while basic motility was retained, and interfering with polyamine level or binding changed the response; PI3Kγ and PTEN interventions likewise changed electrically guided movement in wound healing. This gives the modulome an endpoint that no damage measure reaches: a cell can stay alive and motile while processing directional information incorrectly. Polarity, the spatial PIP₃ distribution and directed movement enter layers 2, 4 and 6. What these experiments establish is a capability at the stated local field magnitudes; which of BERM's own exposures actually perturb the same machinery is a separate calculation or measurement.",
    tissueHeading:
      "Cell-to-Cell Signalling and Immune State",
    tissueBody:
      "Culture medium from radiofrequency-exposed cells carried a protective effect to unexposed recipient cells. That completes the vesicle result from the other side: both the receiver machinery and the later biological message can move between cells. A brief pulsed exposure also changed macrophage function through a TRPC1–STING–NF-κB route, with phagocytosis of co-cultured cancer cells as the endpoint and TRPC1 silencing or blocking removing the responses. The modulome therefore carries a local tissue environment — cell density, secreted mediators, recipient-cell state and immune-cell function — which is why an isolated cell and the same cell type in tissue can respond differently. In this line of work the responses were often functionally useful, so a rise in an inflammatory or calcium signal is always reported together with the function it changes.",
    windowHeading:
      "A Response Window That Depends on the State",
    windowBody:
      "The response-window test connects to all of this through the frequency selectivity of the receiver. The natural continuation is R²_j = ∫ W(f; s_j, B₀) S_d,j(f) df, where S_d,j is the spectrum of a defined biological driver and s_j is the cell state measured before the experiment. The same window law applies to every technology, and a technology name is not a biological tuning coefficient: the model only accepts coefficients keyed on measured state quantities. The earlier locked window remains its own comparison candidate. The state-dependent window is a new version to be tested separately, its parameters have to come from independent measurements, and the present calculation is not yet a biologically validated ordering prediction for experiments.",
    feedbackHeading:
      "Feedback Loops Written Out",
    feedbackBody:
      "With x a barrier disturbance and y a hormonal disturbance, a simple local model is ẋ = au + by − r_x x and ẏ = cu + dx − r_y y, where b and d are the mutual gains and r_x and r_y the recovery rates. With positive recovery rates the equilibrium of this linear model is stable when bd < r_x r_y. That gives BERM a precise new target: does chronic exposure move the ratio of gain to recovery toward instability? Near the boundary recovery slows, and the slowdown can be looked for in existing time series before any large functional change. Positive feedback on its own does not settle irreversibility.",
    cardsHeading:
      "Mechanism Cards: One Structure",
    cardsBody:
      "The twelve-layer navigation stays as it is. What is added is the same structure on every mechanism card, so the exposure, the receiver, the baseline state, the proximal response, the propagation, the memory, the functional consequence and the bounding intervention are recorded in the same places every time.",
    /* Section 4: Routes */
    routesHeading: "Four Independent Routes",
    routesMechanism: "Mechanism",
    routesBlocked: "Blocked by",
    routesOrgans: "Organ links",
    /* Section 5: Organs */
    organsHeading: "Twelve Target Organs",
    organCav3: "Cav3 subtype",
    organLevel: "Level",
    organView: "View organ profile",
    organComingSoon: "Coming soon",
    /* Section 6: Population */
    popHeading: "Candidate \u03C7_pop Profiles",
    popBody:
      "\u03C7_pop is an imported L3 population-response candidate built from genetic, dietary and technology-timing variables. It is distinct from \u03C7_geo; its weights, exposure mapping and fertility endpoint require the open L2 bridge and independent calibration against the 54-country data.",
    popLink: "Explore evolution & population data",
    /* Section 7: Predictions */
    predHeading: "Testable Predictions",
    predIntro:
      "The Modulome generates specific, falsifiable predictions. Seven representative MOD-level predictions:",
    predictions: [
      "MOD-001: T-type Ca\u00B2\u207A channel blockers (ethosuximide) will attenuate RF-EMF effects on testosterone in Leydig cells.",
      "MOD-002: Populations with higher dairy consumption (B2 source) will show slower fertility decline rates.",
      "MOD-003: HRV reduction will precede measurable hormonal changes in chronic EMF exposure.",
      "MOD-004: Blue-eyed individuals (higher CRY sensitivity) will show stronger circadian disruption from evening screen use.",
      "MOD-005: Pituitary gonadotroph LH pulse frequency will be directly modulable by specific EMF frequencies.",
      "MOD-006: Mitochondrial age (measured by ΔΨm) will correlate with EMF susceptibility within the same cell type.",
      "MOD-007: EMF-induced sperm DNA methylation changes are detectable in occupationally exposed men and include VGCC-related gene loci (CACNA1C, CACNA1G). Preprint support: Research Square 2025 (radar-exposed men).",
      "MOD-008: Vesicles prepared from cells with an intact receptor complex restore a field-associated calcium response in channel-silenced recipient cells, while vesicles from silenced donors do not.",
      "MOD-009: The late change in membrane currents after a 50 Hz exposure disappears when either ER release or ER reuptake is blocked, while the first calcium response survives both interventions.",
      "MOD-010: At matched channel expression, cells differing only in ER calcium load show different first calcium responses to the same exposure.",
      "MOD-011: A reduced response after pre-exposure is attributable to repair capacity when absolute baseline damage and recovery curves are measured; matched-baseline challenge tolerance separates it from receptor desensitisation.",
      "MOD-012: Two light protocols with identical total photon dose but reversed wavelength order leave different flavin redox states, and the difference shrinks as the inter-episode delay grows beyond the intermediate lifetime.",
      "MOD-013: An exposure that removes field-directed migration leaves migration speed unchanged, so directional error and motility dissociate in the same cells.",
      "MOD-014: Along a chronic-exposure series, recovery time after a standard perturbation lengthens before any large change in the functional endpoint, and the lengthening tracks the gain-to-recovery ratio.",
    ],
    predLink: "Full predictions register",
    /* Navigation */
    seeAlso: "See also",
    modelPage: "BERM model",
    evidencePage: "Evidence register",
  },
  fi: {
    title: "EMF-modulomi",
    subtitle:
      "S\u00E4hk\u00F6magneettisen herkkyyden systemaattinen kartoitus ihmiskehossa",
    /* Section 1: Hero */
    heroHeading: "IHMISKEHO S\u00C4HK\u00D6MAGNEETTISENA J\u00C4RJESTELM\u00C4N\u00C4",
    heroBody:
      "Jokainen solu yll\u00E4pit\u00E4\u00E4 j\u00E4nnitett\u00E4, jokainen mitokondrio yll\u00E4pit\u00E4\u00E4 \u0394\u03A8m:\u00E4\u00E4, jokainen este vartioi gradienttia, jokainen rauhanen erittää Ca\u00B2\u207A-riippuvaisen eksosytoosin kautta, jokainen sy\u00E4menlyönti tahdistetaan VGCC:ill\u00E4. EMF-modulomi kartoittaa t\u00E4m\u00E4n: 12 kerrosta, 12 kohde-elint\u00E4, 4 itsenäistä reittiä.",
    /* Section 2: Terminology */
    termHeading: "Mik\u00E4 on EMF-modulomi?",
    termBody:
      "EMF-modulomi on BERM:n systemaattinen kartoitus s\u00E4hk\u00F6magneettisesta herkkyydest\u00E4 ihmiskehossa, analoginen sille miten genomi kartoittaa geneettist\u00E4 informaatiota ja proteomi proteiinien ilmentymist\u00E4.",
    /* Section 3: Twelve Layers */
    layersHeading: "Kaksitoista kerrosta",
    layersSubtitle:
      "Molekulaarisesta spinfysiikasta populaatiomalleihin \u2014 kukin tuotu L3-vaste nimetään erilleen \u03C7_geosta",
    stateHeading:
      "Vastaanotin mitattuna tilana",
    stateLead:
      "Moduloomi nimeää sen, mikä mitattava solutila määrää kenttävasteen voimakkuuden, suunnan ja ajallisen kehityksen. Kolme suuretta pidetään erillään, koska yksittäinen vasteen suuruus ei erota niitä: vastaanottimen tila s, joka ratkaisee mitä seuraava altistus transdusoi; korjauskapasiteetti A, joka käsittelee syntyvän kuorman; ja vauriokuorma D, joka on se, mitä mittaushetkellä on jäljellä.",
    stateBody:
      "Näiden erottaminen tekee historiavaikutuksesta selitettävän. Vähäinen lisävaste voi tarkoittaa vahvistunutta korjausta, heikentynyttä vastaanotinta tai jo muuttunutta lähtötilaa. Se myös täsmentää replikaatiokysymystä: julkaisuvuoden sijaan toisen laboratorion on kohdattava ilmoitettu soluhistoria — solupassage, erilaistuminen, kasvatusolot ja aiemmat altistukset.",
    membraneHeading:
      "Kenttäherkkyys siirrettävässä kalvokoneistossa",
    membraneBody:
      "Myoblasteista valmistetut kalvovesikkelit vastasivat 1,5 mT:n pulssikenttään kalsiumsignaalilla, kun taas TRPC1-vaimennetuista soluista peräisin olevissa vesikkeleissä vaste puuttui. Tavallisista soluista saadut vesikkelit myös palauttivat osittain TRPC1-vaimennettujen vastaanottajasolujen kenttään liittyviä hengitys- ja kasvuvasteita. Akuutin lähivasteen tuottamiseen ei tarvittu ehjää alkuperäistä solua, joten vastaanotinkoordinaatti ei ole kanavien lukumäärä: se on kalvo itse, sen proteiinikompleksit ja niiden sijainti. Vesikkelit tarjoavat myös tavan paikantaa mekanismia, koska vastaanotinta voidaan tutkia ennen hormonaalisia tai käyttäytymiseen liittyviä vasteita. Kyse oli valmistetuista vesikkeleistä; vastaava luonnollinen siirtyminen kudoksissa on erillinen hypoteesi.",
    calciumHeading:
      "Kalsium kiertona soluosastojen välillä",
    calciumBody:
      "50 Hz:n kenttä 1 mT:ssa pienensi hippokampuksen neuronien sisäänpäin suuntautuvia ja ohimeneviä ulospäin suuntautuvia kalvovirtoja, ja ER-varastosta vapautumiseen tai siihen takaisinottoon puuttuminen esti nämä muutokset. Kerros kirjoitetaan siksi muotoon kalvokanavat ↔ soluliman Ca²⁺ ↔ ER:n varasto ↔ mitokondriot, ja malli ennustaa ensimmäisen kalsiumvasteen, varaston muutoksen ja myöhemmän virtamuutoksen kolmena erillisenä suureena. Mitattavia syötteitä ovat lähtöjännite, ER:n kalsiumkuorma, vapautumis- ja palautumisnopeus sekä mitokondrion vaste.",
    photoHeading:
      "Flaviinin tila ja valon järjestys",
    photoBody:
      "CRY2:n määrä, RFK/FAD-järjestelmä, kentän suunta ja valohistoria muuttivat kaikki pulssikenttävastetta lihassoluissa. Puhdistetussa ihmisen CRY1:ssä rakennemuutos liittyi siirtymään neutraalista radikaalitilasta täysin pelkistyneeseen flaviiniin, ja prosessiin kuului kahden fotonin peräkkäinen absorptio. Käyttökelpoinen laajennus on, että sama kokonaisvaloannos voi tuottaa erilaisen molekyylitilan, jos aallonpituuksien järjestys ja niiden välinen viive muuttuvat. Syötteiksi tulevat siten CRY:n alatyyppi, proteiinimuoto ja solunsisäinen sijainti, flaviinin sitoutumisaste ja hapetus-pelkistystila sekä valospektri, intensiteetti ja ajallinen järjestys. Fotokemiallinen muutos on havaittu; sen magneettinen modulaatio on seuraava erillinen testikohde. Myös alatyyppien erot ovat olennaisia, minkä vuoksi yhtä yleistä CRY-herkkyyskerrointa ei käytetä kaikille proteiineille.",
    directionHeading:
      "Sijainti ja suunta omana toiminnallisena ulottuvuutenaan",
    directionBody:
      "Ionikuljetukseen liittyvien geenien seulonta paikansi kenttään suuntautuvan liikkeen KCNJ15/Kir4.2-kanavan ja polyamiinien yhteistoimintaan 200 mV/mm:n tasakentässä. KCNJ15:n vaimentaminen poisti suuntautumisen solujen perusliikkuvuuden säilyessä, ja polyamiinien määrään tai sitoutumiseen puuttuminen muutti vastetta; myös PI3Kγ- ja PTEN-interventiot muuttivat sähköisesti ohjautuvaa liikettä haavan paranemisessa. Tämä antaa moduloomille päätepisteen, johon vauriomittari ei yllä: solu voi säilyä elävänä ja liikkuvana mutta käsitellä suunnan informaatiota väärin. Polariteetti, PIP₃:n alueellinen jakautuminen ja suunnattu liike tulevat kerroksiin 2, 4 ja 6. Nämä kokeet osoittavat kyvyn ilmoitetuilla paikallisilla kenttävoimakkuuksilla; se, missä BERM:n omissa altistuksissa sama koneisto todella häiriintyy, on erillinen laskenta tai mittaus.",
    tissueHeading:
      "Solujen välinen viestintä ja immuunitila",
    tissueBody:
      "Radiotaajuudelle altistettujen solujen kasvatusneste välitti suojaavaa vaikutusta altistamattomille vastaanottajasoluille. Tämä täydentää vesikkelihavaintoa toisesta suunnasta: sekä vastaanottimen koneisto että myöhempi biologinen viesti voivat siirtyä solujen välillä. Lyhyt pulssialtistus muutti myös makrofagien toimintaa TRPC1–STING–NF-κB-reitin kautta, päätepisteenä yhteisviljeltyjen syöpäsolujen fagosytoosi, ja TRPC1:n vaimentaminen tai esto kumosi vasteet. Moduloomi kantaa siksi paikallista kudosympäristöä — solutiheyttä, eritettyjä välittäjiä, vastaanottajasolujen tilaa ja immuunisolujen toimintaa — mikä selittää, miksi eristetty solu ja sama solutyyppi kudoksessa voivat vastata eri tavoin. Tässä tutkimuslinjassa vasteet olivat usein toiminnallisesti hyödyllisiä, joten tulehdus- tai kalsiumsignaalin nousu raportoidaan aina yhdessä sen toiminnan kanssa, jota se muuttaa.",
    windowHeading:
      "Vasteikkuna, joka riippuu tilasta",
    windowBody:
      "Vasteikkunatesti liittyy tähän vastaanottimen taajuusvalikoivuuden kautta. Luonteva jatkomuoto on R²_j = ∫ W(f; s_j, B₀) S_d,j(f) df, missä S_d,j on määritellyn biologisen ajurin spektri ja s_j ennen koetta mitattu solutila. Sama vasteikkunan laki koskee kaikkia teknologioita, eikä teknologian nimi ole biologinen säätökerroin: malli hyväksyy vain mitattuihin tilasuureisiin sidotut kertoimet. Aiempi lukittu ikkuna säilyy omana vertailuehdokkaanaan. Tilariippuvainen ikkuna on uusi, erikseen testattava versio, sen parametrit on määrättävä riippumattomista mittauksista, eikä nykyinen laskenta ole vielä biologisesti validoitu kokeiden järjestysennuste.",
    feedbackHeading:
      "Palautesilmukat kirjoitettuna auki",
    feedbackBody:
      "Jos x kuvaa estehäiriötä ja y hormonaalista häiriötä, yksinkertainen paikallinen malli on ẋ = au + by − r_x x ja ẏ = cu + dx − r_y y, missä b ja d kuvaavat keskinäistä vahvistumista ja r_x ja r_y palautumista. Positiivisilla palautumisnopeuksilla tämän lineaarisen mallin tasapaino on vakaa, kun bd < r_x r_y. Tämä antaa BERM:lle täsmällisen uuden tutkimuskohteen: muuttaako krooninen altistus vahvistuksen ja palautumisen suhdetta kohti epävakautta? Lähellä rajaa palautuminen hidastuu, ja hidastumista voi etsiä olemassa olevista aikasarjoista ennen suurta toiminnallista muutosta. Pelkkä positiivinen palaute ei vielä määrää peruuttamattomuutta.",
    cardsHeading:
      "Mekanismikortit: yksi rakenne",
    cardsBody:
      "Nykyinen 12 kerroksen navigaatio säilyy. Uutta on sama rakenne jokaisessa mekanismikortissa, jolloin altiste, vastaanotin, lähtötila, lähivaste, välittyminen, muisti, toiminnallinen seuraus ja rajaava interventio kirjataan joka kerta samoihin kohtiin.",
    /* Section 4: Routes */
    routesHeading: "Nelj\u00E4 itsen\u00E4ist\u00E4 reitti\u00E4",
    routesMechanism: "Mekanismi",
    routesBlocked: "Estet\u00E4\u00E4n",
    routesOrgans: "Elinlinkit",
    /* Section 5: Organs */
    organsHeading: "Kaksitoista kohde-elint\u00E4",
    organCav3: "Cav3-alatyyppi",
    organLevel: "Taso",
    organView: "N\u00E4yt\u00E4 elinprofiili",
    organComingSoon: "Tulossa pian",
    /* Section 6: Population */
    popHeading: "Ehdokasprofiilit \u03C7_pop",
    popBody:
      "\u03C7_pop on tuotu L3-populaatiovaste-ehdokas, joka koostuu geneettisistä, ravitsemus- ja teknologia-ajoitusmuuttujista. Se on eri suure kuin \u03C7_geo; painot, altistuskuvaus ja fertiliteettipäätepiste vaativat avoimen L2-sillan sekä riippumattoman kalibroinnin 54 maan aineistossa.",
    popLink: "Tutustu evoluutio- ja populaatiodataan",
    /* Section 7: Predictions */
    predHeading: "Testattavat ennusteet",
    predIntro:
      "Modulomi tuottaa spesifisi\u00E4, falsifioitavia ennusteita. Seitsem\u00E4n edustavaa MOD-tason ennustetta:",
    predictions: [
      "MOD-001: T-tyypin Ca\u00B2\u207A-kanavasalpaajat (etosuksimidi) vaimentavat RF-EMF:n vaikutuksia testosteroniin Leydigin soluissa.",
      "MOD-002: Populaatiot, joilla on korkeampi maitotuotteiden kulutus (B2-l\u00E4hde), osoittavat hitaampaa fertiliteetin laskua.",
      "MOD-003: HRV:n lasku edelt\u00E4\u00E4 mitattavia hormonaalisia muutoksia kroonisessa EMF-altistuksessa.",
      "MOD-004: Sinisilm\u00E4iset yksil\u00F6t (korkeampi CRY-herkkyys) osoittavat voimakkaampaa sirkadiaanista h\u00E4iri\u00F6t\u00E4 iltaisesta n\u00E4ytt\u00F6k\u00E4yt\u00F6st\u00E4.",
      "MOD-005: Aivolisäkkeen gonadotroopin LH-pulssitaajuus on suoraan moduloitavissa tietyill\u00E4 EMF-taajuuksilla.",
      "MOD-006: Mitokondrion ik\u00E4 (mitattuna \u0394\u03A8m:ll\u00E4) korreloi EMF-herkkyyden kanssa saman solutyypin sis\u00E4ll\u00E4.",
      "MOD-007: EMF-indusoidut siitti\u00F6iden DNA-metylaatiomuutokset ovat havaittavissa ammatillisesti altistuneilla miehill\u00E4 ja sis\u00E4lt\u00E4v\u00E4t VGCC-geenilokuksia (CACNA1C, CACNA1G). Preprint-tuki: Research Square 2025 (tutkalle altistuneet miehet).",
      "MOD-008: Ehjän vastaanotinkompleksin soluista valmistetut vesikkelit palauttavat kenttään liittyvän kalsiumvasteen kanavavaimennetuissa vastaanottajasoluissa; vaimennetuista luovuttajista peräisin olevat vesikkelit eivät.",
      "MOD-009: 50 Hz:n altistuksen jälkeinen myöhäinen kalvovirtojen muutos katoaa, kun joko ER:n vapautus tai takaisinotto estetään, mutta ensimmäinen kalsiumvaste säilyy molemmissa interventioissa.",
      "MOD-010: Kanavien ilmentymisen ollessa vakioitu solut, jotka eroavat vain ER:n kalsiumkuormassa, antavat samalle altistukselle eri ensimmäisen kalsiumvasteen.",
      "MOD-011: Esikäsittelyn jälkeinen pienentynyt vaste on luettavissa korjauskapasiteetin ansioksi, kun absoluuttinen lähtövaurio ja palautumiskäyrät mitataan; vakioidun lähtötason haastetoleranssi erottaa sen vastaanottimen herkkyyden laskusta.",
      "MOD-012: Kaksi valoprotokollaa, joilla on identtinen kokonaisfotoniannos mutta käänteinen aallonpituusjärjestys, jättävät eri flaviinin hapetus-pelkistystilan, ja ero pienenee episodien välisen viiveen kasvaessa yli välitilan eliniän.",
      "MOD-013: Altistus, joka poistaa kenttään suuntautuvan liikkeen, jättää liikenopeuden ennalleen, joten suuntavirhe ja liikkuvuus erkanevat samoissa soluissa.",
      "MOD-014: Kroonisen altistuksen sarjassa palautumisaika vakioidun häiriön jälkeen pitenee ennen suurta muutosta toiminnallisessa päätepisteessä, ja piteneminen seuraa vahvistuksen ja palautumisen suhdetta.",
    ],
    predLink: "T\u00E4ydellinen ennusterekisteri",
    /* Navigation */
    seeAlso: "Katso my\u00F6s",
    modelPage: "BERM-malli",
    evidencePage: "Näyttörekisteri",
  },
  ja: {
    title: "EMFモジュローム",
    subtitle:
      "人体全体にわたる電磁感受性の体系的マッピング",
    /* Section 1: Hero */
    heroHeading: "電磁システムとしての人体",
    heroBody:
      "すべての細胞は電圧を維持し、すべてのミトコンドリアはΔΨmを維持し、すべてのバリアは勾配を守り、すべての腺はCa²⁺依存性エキソサイトーシスを介して分泌し、すべての心拍はVGCCによって調律される。EMFモジュロームはこれをマッピングする：12層、12の標的臓器、4つの独立経路。",
    /* Section 2: Terminology */
    termHeading: "EMFモジュロームとは？",
    termBody:
      "EMFモジュロームは、ゲノムが遺伝情報をマッピングし、プロテオームがタンパク質発現をマッピングするのと同様に、人体全体にわたる電磁感受性のBERMによる体系的マッピングである。",
    /* Section 3: Twelve Layers */
    layersHeading: "12の層",
    layersSubtitle:
      "分子スピン物理学から集団パターンまで — 各導入L3応答をχ_geoとは別名で扱う",
    stateHeading:
      "測定された状態としての受容体",
    stateLead:
      "モジュロームは、どの測定可能な細胞状態が場応答の強さ・方向・時間発展を決めるのかを名指しする。三つの量を分けて扱うのは、単一の効果量ではそれらを区別できないからである：次の曝露が何を伝達するかを決める受容体状態 s、生じた負荷を処理する修復能 A、そして測定時点で残っているものである損傷負荷 D。",
    stateBody:
      "これらを分けることで履歴効果が説明可能になる。追加応答が小さいことは、修復の強化、受容体の弱化、あるいはすでに動いた基線のいずれをも意味しうる。複製の問いも明確になる：発表年ではなく、第二の研究室が一致させるべきは明示された細胞履歴——継代数、分化、培養条件、既往曝露——である。",
    membraneHeading:
      "移送可能な膜機構における場感受性",
    membraneBody:
      "筋芽細胞から調製した膜小胞は1.5 mTのパルス磁場にカルシウム信号で応答したが、TRPC1を抑制した細胞由来の小胞では応答が欠けた。正常細胞由来の小胞は、TRPC1を抑制した受容細胞において場に関連する呼吸・増殖応答を部分的に回復させた。急性の近位応答の産生に無傷の供与細胞は必要でなかった。したがって受容体座標はチャネル数ではなく、膜そのもの、そのタンパク質複合体とその局在である。小胞はまた機構の位置づけの手段でもある。ホルモン応答や行動応答より前に受容体を調べられるからである。これは調製小胞の設計であり、組織内での同等の自然な移行は別の仮説である。",
    calciumHeading:
      "区画間の循環としてのカルシウム",
    calciumBody:
      "1 mTの50 Hz磁場は海馬ニューロンの内向き電流および一過性外向き電流を減少させ、ER貯蔵からの放出または貯蔵への再取り込みへの介入がその変化を阻止した。したがってこの層は「膜チャネル ↔ 細胞質Ca²⁺ ↔ ER貯蔵 ↔ ミトコンドリア」として記述され、モデルは最初のカルシウム応答、貯蔵の変化、後の電流変化を三つの別個の量として予測する。測定される入力は静止電位、ERカルシウム負荷、放出速度と回復速度、そしてミトコンドリア応答である。",
    photoHeading:
      "フラビンの状態と光の順序",
    photoBody:
      "筋細胞では、CRY2の量、RFK/FAD系、場の方向、光履歴のすべてがパルス磁場応答を変えた。精製ヒトCRY1では、中性ラジカルから完全還元フラビンへの移行に構造変化が伴い、その過程は二光子の逐次吸収を含んでいた。使える拡張は、波長の順序とその間隔が変われば同じ総光量でも異なる分子状態が残る、という点である。したがって入力はCRYの亜型・アイソフォーム・区画、フラビンの結合占有率と酸化還元状態、そして光スペクトル・強度・時間的順序となる。光化学的変化は観測済みであり、その磁気変調は次の独立した検証対象である。亜型間の差も重要であり、だからこそすべてのタンパク質に単一のCRY感受性係数は用いない。",
    directionHeading:
      "機能的次元としての位置と方向",
    directionBody:
      "イオン輸送関連遺伝子のスクリーニングは、200 mV/mmの直流電場を用いて、場に沿った移動をKCNJ15/Kir4.2チャネルとポリアミンの共同作用に位置づけた。KCNJ15の抑制は基本的な運動性を保ったまま配向を消失させ、ポリアミンの量や結合への介入は応答を変えた。創傷治癒ではPI3KγおよびPTENへの介入も電気的に誘導される移動を変えた。これはモジュロームに、損傷指標では届かないエンドポイントを与える：細胞は生存し運動しながら方向情報を誤って処理しうる。極性、PIP₃の空間分布、方向性のある移動が第2・4・6層に入る。これらの実験が示すのは記載された局所電場強度における能力であり、BERM自身のどの曝露が同じ機構を実際に乱すのかは別個の計算あるいは測定である。",
    tissueHeading:
      "細胞間シグナルと免疫状態",
    tissueBody:
      "高周波に曝露した細胞の培地は、曝露されていない受容細胞に保護効果を運んだ。これは小胞の結果を反対側から補完する：受容体機構も、その後の生物学的メッセージも、細胞間を移動しうる。短時間のパルス曝露はまた、TRPC1–STING–NF-κB経路を介してマクロファージ機能を変え、共培養したがん細胞の貪食をエンドポイントとし、TRPC1の抑制または遮断は応答を消失させた。したがってモジュロームは局所組織環境——細胞密度、分泌メディエーター、受容細胞の状態、免疫細胞の機能——を担う。だからこそ単離細胞と組織内の同一細胞型は異なる応答を示しうる。この研究系列では応答はしばしば機能的に有益であり、それゆえ炎症やカルシウム信号の上昇は常にそれが変える機能とともに報告される。",
    windowHeading:
      "状態に依存する応答窓",
    windowBody:
      "応答窓の検定は、受容体の周波数選択性を通じてこのすべてに接続する。自然な発展形は R²_j = ∫ W(f; s_j, B₀) S_d,j(f) df であり、S_d,j は定義された生物学的ドライバーのスペクトル、s_j は実験前に測定した細胞状態である。同じ窓の法則がすべての技術に適用され、技術の名前は生物学的な調整係数ではない：モデルは測定された状態量に結びついた係数のみを受け入れる。以前の固定窓は独自の比較候補として残る。状態依存窓は個別に検証すべき新しい版であり、そのパラメータは独立した測定から決めなければならず、現在の計算はまだ生物学的に検証された実験順序の予測ではない。",
    feedbackHeading:
      "書き下されたフィードバックループ",
    feedbackBody:
      "xを障壁の乱れ、yをホルモンの乱れとすると、単純な局所モデルは ẋ = au + by − r_x x および ẏ = cu + dx − r_y y であり、b と d が相互利得、r_x と r_y が回復速度である。回復速度が正であれば、この線形モデルの平衡は bd < r_x r_y のとき安定である。これはBERMに精密な新しい標的を与える：慢性曝露は利得と回復の比を不安定側へ動かすのか。境界の近くでは回復が遅くなり、その遅れは大きな機能変化に先立って既存の時系列から探しうる。正のフィードバックだけでは不可逆性は決まらない。",
    cardsHeading:
      "メカニズムカード：一つの構造",
    cardsBody:
      "12層のナビゲーションはそのまま維持する。加わるのは、すべてのメカニズムカードに共通する同一の構造である。曝露、受容体、基準状態、近位応答、伝播、記憶、機能的帰結、そして境界づける介入が、毎回同じ場所に記録される。",
    /* Section 4: Routes */
    routesHeading: "4つの独立経路",
    routesMechanism: "メカニズム",
    routesBlocked: "阻害因子",
    routesOrgans: "臓器リンク",
    /* Section 5: Organs */
    organsHeading: "12の標的臓器",
    organCav3: "Cav3サブタイプ",
    organLevel: "レベル",
    organView: "臓器プロファイルを表示",
    organComingSoon: "近日公開",
    /* Section 6: Population */
    popHeading: "候補χ_popプロファイル",
    popBody:
      "χ_popは遺伝・食事・技術時期変数から構成する導入L3集団応答候補で、χ_geoとは別物である。その重み、曝露写像、出生エンドポイントには未解決L2橋と54か国データでの独立較正が必要である。",
    popLink: "進化と集団データを探る",
    /* Section 7: Predictions */
    predHeading: "検証可能な予測",
    predIntro:
      "モジュロームは特定の反証可能な予測を生成する。7つの代表的なMODレベル予測：",
    predictions: [
      "MOD-001: T型Ca²⁺チャネル遮断薬（エトスクシミド）は、ライディッヒ細胞におけるRF-EMFのテストステロンへの影響を減弱させる。",
      "MOD-002: 乳製品消費量が多い集団（B2源）は、出生率低下がより緩やかである。",
      "MOD-003: 慢性EMF曝露において、HRVの低下は測定可能なホルモン変化に先行する。",
      "MOD-004: 青い目の個人（CRY感受性が高い）は、夕方のスクリーン使用による概日リズム障害がより強い。",
      "MOD-005: 下垂体ゴナドトロフのLHパルス頻度は、特定のEMF周波数によって直接変調可能である。",
      "MOD-006: ミトコンドリア年齢（ΔΨmで測定）は、同一細胞型内でEMF感受性と相関する。",
      "MOD-007: EMF誘発性の精子DNAメチル化変化は、職業的に曝露された男性で検出可能であり、VGCC関連遺伝子座（CACNA1C、CACNA1G）を含む。プレプリントサポート：Research Square 2025（レーダー曝露男性）。",
      "MOD-008: 無傷の受容体複合体をもつ細胞から調製した小胞は、チャネルを抑制した受容細胞で場に関連するカルシウム応答を回復させるが、抑制した供与細胞由来の小胞は回復させない。",
      "MOD-009: 50 Hz曝露後の膜電流の後期変化は、ER放出またはER再取り込みのいずれかを遮断すると消失するが、最初のカルシウム応答は両方の介入で残る。",
      "MOD-010: チャネル発現を揃えた条件で、ERカルシウム負荷のみが異なる細胞は、同じ曝露に対して異なる最初のカルシウム応答を示す。",
      "MOD-011: 前曝露後の応答低下は、絶対的な基準損傷と回復曲線を測定すれば修復能に帰属できる。基準を揃えた負荷耐性が、それを受容体の脱感作から区別する。",
      "MOD-012: 総光子量が同一で波長順序が逆の二つの光プロトコルは異なるフラビン酸化還元状態を残し、その差は episode 間の遅延が中間体寿命を超えて延びるにつれ縮小する。",
      "MOD-013: 場に沿った移動を消失させる曝露は移動速度を変えない。すなわち同一細胞において方向誤差と運動性は解離する。",
      "MOD-014: 慢性曝露系列に沿って、標準的な摂動後の回復時間は機能エンドポイントの大きな変化に先立って延び、その延長は利得対回復の比を追随する。",
    ],
    predLink: "完全な予測レジスター",
    /* Navigation */
    seeAlso: "関連項目",
    modelPage: "BERMモデル",
    evidencePage: "エビデンスレジスター",
  },
  fr: {
    title: "Modulome EMF",
    subtitle:
      "Cartographie systématique de la susceptibilité électromagnétique dans le corps humain",
    /* Section 1: Hero */
    heroHeading: "LE CORPS HUMAIN COMME SYSTÈME ÉLECTROMAGNÉTIQUE",
    heroBody:
      "Chaque cellule maintient une tension, chaque mitochondrie soutient ΔΨm, chaque barrière protège un gradient, chaque glande sécrète par exocytose Ca²⁺-dépendante, chaque battement cardiaque est cadencé par les VGCC. Le Modulome EMF cartographie ceci : 12 couches, 12 organes cibles, 4 voies indépendantes.",
    /* Section 2: Terminology */
    termHeading: "Qu'est-ce que le Modulome EMF ?",
    termBody:
      "Le Modulome EMF est la cartographie systématique par BERM de la susceptibilité électromagnétique dans le corps humain, analogue à la façon dont le génome cartographie l'information génétique et le protéome cartographie l'expression protéique.",
    /* Section 3: Twelve Layers */
    layersHeading: "Douze couches",
    layersSubtitle:
      "De la physique du spin aux tendances démographiques — chaque réponse L3 importée est nommée séparément de χ_geo",
    stateHeading:
      "Le récepteur comme état mesuré",
    stateLead:
      "Le modulome nomme quel état cellulaire mesurable fixe l'intensité, la direction et l'évolution temporelle d'une réponse au champ. Trois quantités sont tenues séparées parce qu'une seule taille d'effet ne permet pas de les distinguer : l'état du récepteur s, qui décide de ce que la prochaine exposition transduit ; la capacité de réparation A, qui traite la charge produite ; et la charge de dommage D, qui est ce qui subsiste au moment de la mesure.",
    stateBody:
      "Les séparer rend l'effet d'historique explicable. Une réponse additionnelle faible peut signifier une réparation renforcée, un récepteur affaibli, ou une ligne de base qui a déjà bougé. Cela précise aussi la question de la réplication : au lieu d'une année de publication, ce qu'un second laboratoire doit apparier est l'historique cellulaire déclaré — numéro de passage, différenciation, conditions de culture et expositions antérieures.",
    membraneHeading:
      "Sensibilité au champ dans une machinerie membranaire transférable",
    membraneBody:
      "Des vésicules membranaires préparées à partir de myoblastes ont répondu à un champ pulsé de 1,5 mT par un signal calcique, alors que les vésicules issues de cellules dont TRPC1 était éteint n'ont pas répondu. Les vésicules de cellules normales ont aussi partiellement restauré les réponses respiratoires et de croissance associées au champ dans des cellules réceptrices privées de TRPC1. Produire la réponse locale aiguë n'a pas exigé de cellule source intacte : la coordonnée réceptrice n'est donc pas un décompte de canaux, mais la membrane elle-même, ses complexes protéiques et leur localisation. Les vésicules offrent également un moyen de localiser le mécanisme, puisque le récepteur peut être étudié avant toute réponse hormonale ou comportementale. Ce protocole utilisait des vésicules préparées ; un transfert naturel équivalent dans le tissu est une hypothèse distincte.",
    calciumHeading:
      "Le calcium comme circulation entre compartiments",
    calciumBody:
      "Un champ de 50 Hz à 1 mT a réduit les courants membranaires entrants et sortants transitoires dans des neurones hippocampiques, et intervenir sur la libération depuis le stock du RE ou sur sa recapture a empêché ces changements. La couche s'écrit donc canaux membranaires ↔ Ca²⁺ cytosolique ↔ stock du RE ↔ mitochondries, et le modèle prédit la première réponse calcique, le changement du stock et le changement tardif de courant comme trois quantités séparées. Les entrées mesurables sont le potentiel de repos, la charge calcique du RE, les vitesses de libération et de récupération, et la réponse mitochondriale.",
    photoHeading:
      "L'état du flavine et l'ordre de la lumière",
    photoBody:
      "La quantité de CRY2, le système RFK/FAD, la direction du champ et l'historique lumineux ont tous modifié la réponse au champ pulsé dans des cellules musculaires. Dans la CRY1 humaine purifiée, un changement de conformation accompagnait le passage du radical neutre au flavine complètement réduit, et le processus impliquait l'absorption séquentielle de deux photons. L'extension utilisable est qu'une même dose lumineuse totale peut laisser un état moléculaire différent lorsque l'ordre des longueurs d'onde et le délai entre elles changent ; les entrées deviennent donc le sous-type, l'isoforme et le compartiment de CRY, le taux d'occupation et l'état redox du flavine, ainsi que le spectre, l'intensité et l'ordre temporel de la lumière. Le changement photochimique est observé ; sa modulation magnétique est le test suivant, distinct. Les différences entre sous-types comptent aussi, raison pour laquelle aucun coefficient de sensibilité CRY unique n'est appliqué à toutes les protéines.",
    directionHeading:
      "Position et direction comme dimension fonctionnelle propre",
    directionBody:
      "Un criblage de gènes du transport ionique a localisé la migration dirigée par le champ dans le canal KCNJ15/Kir4.2 agissant avec les polyamines, sous un champ continu de 200 mV/mm. Éteindre KCNJ15 a supprimé l'orientation tout en conservant la motilité de base, et intervenir sur le niveau ou la liaison des polyamines a modifié la réponse ; les interventions sur PI3Kγ et PTEN ont de même modifié le déplacement guidé électriquement dans la cicatrisation. Cela donne au modulome un endpoint qu'aucune mesure de dommage n'atteint : une cellule peut rester vivante et mobile tout en traitant mal l'information directionnelle. La polarité, la distribution spatiale du PIP₃ et le déplacement dirigé entrent dans les couches 2, 4 et 6. Ces expériences établissent une capacité aux magnitudes de champ local indiquées ; savoir lesquelles des expositions propres à BERM perturbent réellement la même machinerie est un calcul ou une mesure à part.",
    tissueHeading:
      "Signalisation intercellulaire et état immunitaire",
    tissueBody:
      "Le milieu de culture de cellules exposées aux radiofréquences a porté un effet protecteur à des cellules réceptrices non exposées. Cela complète le résultat des vésicules par l'autre côté : la machinerie réceptrice comme le message biologique ultérieur peuvent circuler entre cellules. Une brève exposition pulsée a également modifié la fonction macrophagique par une voie TRPC1–STING–NF-κB, avec la phagocytose de cellules cancéreuses co-cultivées comme endpoint, et l'extinction ou le blocage de TRPC1 a supprimé les réponses. Le modulome porte donc un environnement tissulaire local — densité cellulaire, médiateurs sécrétés, état des cellules réceptrices et fonction des cellules immunitaires — ce qui explique qu'une cellule isolée et le même type cellulaire en tissu puissent répondre différemment. Dans cette ligne de travaux les réponses étaient souvent fonctionnellement utiles : une hausse de signal inflammatoire ou calcique est donc toujours rapportée avec la fonction qu'elle modifie.",
    windowHeading:
      "Une fenêtre de réponse qui dépend de l'état",
    windowBody:
      "Le test de la fenêtre de réponse se relie à tout ceci par la sélectivité fréquentielle du récepteur. Le prolongement naturel est R²_j = ∫ W(f; s_j, B₀) S_d,j(f) df, où S_d,j est le spectre d'un pilote biologique défini et s_j l'état cellulaire mesuré avant l'expérience. La même loi de fenêtre s'applique à toutes les technologies, et un nom de technologie n'est pas un coefficient de réglage biologique : le modèle n'accepte que des coefficients indexés sur des quantités d'état mesurées. La fenêtre verrouillée antérieure reste son propre candidat de comparaison. La fenêtre dépendante de l'état est une nouvelle version à tester séparément, ses paramètres doivent venir de mesures indépendantes, et le calcul actuel n'est pas encore une prédiction d'ordonnancement validée biologiquement.",
    feedbackHeading:
      "Les boucles de rétroaction écrites explicitement",
    feedbackBody:
      "Avec x une perturbation de barrière et y une perturbation hormonale, un modèle local simple est ẋ = au + by − r_x x et ẏ = cu + dx − r_y y, où b et d sont les gains mutuels et r_x et r_y les taux de récupération. Avec des taux de récupération positifs, l'équilibre de ce modèle linéaire est stable lorsque bd < r_x r_y. Cela donne à BERM une cible nouvelle et précise : l'exposition chronique déplace-t-elle le rapport gain/récupération vers l'instabilité ? Près de la frontière, la récupération ralentit, et ce ralentissement peut être cherché dans des séries temporelles existantes avant tout changement fonctionnel important. La rétroaction positive seule ne règle pas la question de l'irréversibilité.",
    cardsHeading:
      "Fiches de mécanisme : une seule structure",
    cardsBody:
      "La navigation en douze couches reste inchangée. Ce qui s'ajoute est la même structure sur chaque fiche de mécanisme, de sorte que l'exposition, le récepteur, l'état de départ, la réponse proximale, la propagation, la mémoire, la conséquence fonctionnelle et l'intervention qui borne le mécanisme soient consignés chaque fois aux mêmes endroits.",
    /* Section 4: Routes */
    routesHeading: "Quatre voies indépendantes",
    routesMechanism: "Mécanisme",
    routesBlocked: "Bloqué par",
    routesOrgans: "Liens d'organes",
    /* Section 5: Organs */
    organsHeading: "Douze organes cibles",
    organCav3: "Sous-type Cav3",
    organLevel: "Niveau",
    organView: "Voir le profil d'organe",
    organComingSoon: "Bientôt disponible",
    /* Section 6: Population */
    popHeading: "Profils candidats χ_pop",
    popBody:
      "χ_pop est un candidat L3 importé de réponse démographique construit à partir de variables génétiques, alimentaires et de calendrier technologique. Il est distinct de χ_geo ; ses poids, son application à l'exposition et l'endpoint de fécondité exigent le pont L2 ouvert et un calibrage indépendant sur 54 pays.",
    popLink: "Explorer les données d'évolution et de population",
    /* Section 7: Predictions */
    predHeading: "Prédictions testables",
    predIntro:
      "Le Modulome génère des prédictions spécifiques et falsifiables. Sept prédictions représentatives de niveau MOD :",
    predictions: [
      "MOD-001 : Les bloqueurs des canaux Ca²⁺ de type T (éthosuximide) atténueront les effets du RF-EMF sur la testostérone dans les cellules de Leydig.",
      "MOD-002 : Les populations ayant une consommation laitière plus élevée (source de B2) montreront des taux de déclin de la fécondité plus lents.",
      "MOD-003 : La réduction de la VFC précédera les changements hormonaux mesurables lors d'une exposition chronique aux EMF.",
      "MOD-004 : Les individus aux yeux bleus (sensibilité CRY plus élevée) montreront une perturbation circadienne plus forte liée à l'utilisation d'écrans en soirée.",
      "MOD-005 : La fréquence des impulsions de LH des gonadotrophes hypophysaires sera directement modulable par des fréquences EMF spécifiques.",
      "MOD-006 : L'âge mitochondrial (mesuré par ΔΨm) corrélera avec la susceptibilité aux EMF au sein du même type cellulaire.",
      "MOD-007 : Les changements de méthylation de l'ADN spermatique induits par les EMF sont détectables chez les hommes exposés professionnellement et incluent des loci géniques liés aux VGCC (CACNA1C, CACNA1G). Soutien de preprint : Research Square 2025 (hommes exposés au radar).",
      "MOD-008 : Des vésicules préparées à partir de cellules au complexe récepteur intact restaurent une réponse calcique associée au champ dans des cellules réceptrices dont le canal est éteint ; les vésicules de donneurs éteints ne le font pas.",
      "MOD-009 : Le changement tardif des courants membranaires après une exposition à 50 Hz disparaît lorsque la libération ou la recapture du RE est bloquée, tandis que la première réponse calcique survit aux deux interventions.",
      "MOD-010 : À expression de canaux appariée, des cellules ne différant que par la charge calcique du RE montrent des premières réponses calciques différentes à la même exposition.",
      "MOD-011 : Une réponse réduite après pré-exposition est attribuable à la capacité de réparation lorsque le dommage de base absolu et les courbes de récupération sont mesurés ; la tolérance au challenge à base appariée la distingue d'une désensibilisation du récepteur.",
      "MOD-012 : Deux protocoles lumineux de dose photonique totale identique mais d'ordre de longueurs d'onde inversé laissent des états redox du flavine différents, et l'écart diminue à mesure que le délai entre épisodes dépasse la durée de vie de l'intermédiaire.",
      "MOD-013 : Une exposition qui supprime la migration dirigée par le champ laisse la vitesse de migration inchangée : erreur directionnelle et motilité se dissocient dans les mêmes cellules.",
      "MOD-014 : Le long d'une série d'exposition chronique, le temps de récupération après une perturbation standard s'allonge avant tout changement important de l'endpoint fonctionnel, et cet allongement suit le rapport gain/récupération.",
    ],
    predLink: "Registre complet des prédictions",
    /* Navigation */
    seeAlso: "Voir aussi",
    modelPage: "Modèle BERM",
    evidencePage: "Registre des preuves",
  },
  ko: {
    title: "EMF 모듈롬",
    subtitle:
      "인체 전반에 걸친 전자기 감수성의 체계적 매핑",
    /* Section 1: Hero */
    heroHeading: "전자기 시스템으로서의 인체",
    heroBody:
      "모든 세포는 전압을 유지하고, 모든 미토콘드리아는 ΔΨm을 유지하며, 모든 장벽은 기울기를 보호하고, 모든 분비선은 Ca²⁺ 의존성 세포외배출을 통해 분비하며, 모든 심박은 VGCC에 의해 조율된다. EMF 모듈롬은 이를 매핑한다: 12개 층, 12개 표적 기관, 4개 독립 경로.",
    /* Section 2: Terminology */
    termHeading: "EMF 모듈롬이란?",
    termBody:
      "EMF 모듈롬은 게놈이 유전 정보를, 프로테옴이 단백질 발현을 매핑하는 것과 유사하게, 인체 전반에 걸친 전자기 감수성에 대한 BERM의 체계적 매핑이다.",
    /* Section 3: Twelve Layers */
    layersHeading: "12개 층",
    layersSubtitle:
      "분자 스핀 물리학에서 집단 패턴까지 — 각 도입 L3 반응은 χ_geo와 별도 명칭을 쓴다",
    stateHeading:
      "측정된 상태로서의 수용체",
    stateLead:
      "모듈롬은 어떤 측정 가능한 세포 상태가 장 반응의 세기와 방향, 시간적 전개를 정하는지를 명시한다. 세 가지 양을 분리해 두는 이유는 하나의 효과 크기로는 이들을 구별할 수 없기 때문이다: 다음 노출이 무엇을 변환할지 정하는 수용체 상태 s, 생성된 부하를 처리하는 복구 능력 A, 그리고 측정 시점에 남아 있는 손상 부하 D.",
    stateBody:
      "이들을 분리하면 이력 효과를 설명할 수 있다. 추가 반응이 작다는 것은 복구의 강화, 수용체의 약화, 또는 이미 이동한 기준선 중 어느 것이든 의미할 수 있다. 이는 복제 문제도 분명하게 만든다: 발표 연도가 아니라, 두 번째 실험실이 맞추어야 할 것은 선언된 세포 이력 — 계대 수, 분화, 배양 조건, 이전 노출 — 이다.",
    membraneHeading:
      "이전 가능한 막 기구 속의 장 감수성",
    membraneBody:
      "근아세포에서 제작한 막 소포는 1.5 mT 펄스장에 칼슘 신호로 반응했지만, TRPC1이 침묵된 세포에서 만든 소포에서는 반응이 없었다. 정상 세포의 소포는 TRPC1이 침묵된 수용 세포에서 장과 연관된 호흡·성장 반응을 부분적으로 회복시켰다. 급성 근위 반응을 만드는 데 온전한 공여 세포는 필요하지 않았다. 따라서 수용체 좌표는 채널 수가 아니라 막 자체, 그 단백질 복합체와 그 위치다. 소포는 기전을 국소화하는 방법이기도 하다. 호르몬 반응이나 행동 반응보다 먼저 수용체를 조사할 수 있기 때문이다. 이는 제작된 소포 설계였으며, 조직 내의 동등한 자연적 이전은 별개의 가설이다.",
    calciumHeading:
      "구획 사이의 순환으로서의 칼슘",
    calciumBody:
      "1 mT의 50 Hz 장은 해마 뉴런의 내향 전류와 일과성 외향 전류를 감소시켰고, ER 저장고에서의 방출이나 저장고로의 재흡수에 개입하면 그 변화가 나타나지 않았다. 따라서 이 층은 막 채널 ↔ 세포질 Ca²⁺ ↔ ER 저장고 ↔ 미토콘드리아로 기술되며, 모델은 첫 칼슘 반응, 저장고의 변화, 이후의 전류 변화를 세 개의 별개 양으로 예측한다. 측정되는 입력은 안정 전위, ER 칼슘 부하, 방출 속도와 회복 속도, 그리고 미토콘드리아 반응이다.",
    photoHeading:
      "플라빈의 상태와 빛의 순서",
    photoBody:
      "근세포에서는 CRY2의 양, RFK/FAD 계, 장의 방향, 광 이력이 모두 펄스장 반응을 바꾸었다. 정제된 인간 CRY1에서는 중성 라디칼에서 완전 환원 플라빈으로의 이동에 구조 변화가 동반되었고, 그 과정은 두 광자의 순차적 흡수를 포함했다. 쓸 수 있는 확장은, 파장의 순서와 그 사이의 지연이 달라지면 같은 총 광량이라도 다른 분자 상태를 남긴다는 점이다. 따라서 입력은 CRY의 아형·이소폼·구획, 플라빈의 결합 점유율과 산화환원 상태, 그리고 광 스펙트럼·강도·시간적 순서가 된다. 광화학적 변화는 관측되었고, 그 자기 조절은 다음의 별도 검증 과제다. 아형 간 차이도 중요하며, 그래서 모든 단백질에 하나의 CRY 감수성 계수를 쓰지 않는다.",
    directionHeading:
      "고유한 기능적 차원으로서의 위치와 방향",
    directionBody:
      "이온 수송 관련 유전자 스크리닝은 200 mV/mm 직류장에서 장 방향 이동을 KCNJ15/Kir4.2 채널과 폴리아민의 공동 작용으로 국소화했다. KCNJ15를 침묵시키면 기본 운동성은 유지된 채 배향이 사라졌고, 폴리아민의 양이나 결합에 개입하면 반응이 바뀌었다. 상처 치유에서도 PI3Kγ와 PTEN 개입이 전기 유도 이동을 바꾸었다. 이는 모듈롬에 손상 지표로는 닿지 못하는 종점을 준다: 세포는 살아 움직이면서도 방향 정보를 잘못 처리할 수 있다. 극성, PIP₃의 공간 분포, 방향성 이동이 2·4·6층에 들어간다. 이 실험들이 확립하는 것은 명시된 국소 장 세기에서의 능력이며, BERM 자신의 어떤 노출이 같은 기구를 실제로 교란하는지는 별도의 계산 또는 측정이다.",
    tissueHeading:
      "세포 간 신호와 면역 상태",
    tissueBody:
      "고주파에 노출된 세포의 배지는 노출되지 않은 수용 세포에 보호 효과를 전달했다. 이는 소포 결과를 반대편에서 보완한다: 수용체 기구도, 이후의 생물학적 메시지도 세포 사이를 이동할 수 있다. 짧은 펄스 노출은 또한 TRPC1–STING–NF-κB 경로를 통해 대식세포 기능을 바꾸었고, 공배양한 암세포의 식균작용이 종점이었으며, TRPC1의 침묵이나 차단은 반응을 없앴다. 따라서 모듈롬은 국소 조직 환경 — 세포 밀도, 분비 매개체, 수용 세포의 상태, 면역 세포의 기능 — 을 담는다. 그래서 분리된 세포와 조직 속 같은 세포 유형의 반응이 다를 수 있다. 이 연구 계열에서 반응은 종종 기능적으로 유익했고, 그래서 염증이나 칼슘 신호의 상승은 언제나 그것이 바꾸는 기능과 함께 보고된다.",
    windowHeading:
      "상태에 의존하는 반응 창",
    windowBody:
      "반응 창 검정은 수용체의 주파수 선택성을 통해 이 모든 것과 연결된다. 자연스러운 확장 형태는 R²_j = ∫ W(f; s_j, B₀) S_d,j(f) df이며, 여기서 S_d,j는 정의된 생물학적 구동자의 스펙트럼이고 s_j는 실험 전에 측정한 세포 상태다. 같은 창 법칙이 모든 기술에 적용되며, 기술의 이름은 생물학적 조정 계수가 아니다: 모델은 측정된 상태량에 결부된 계수만 받아들인다. 이전의 고정 창은 그 자체의 비교 후보로 남는다. 상태 의존 창은 따로 검증해야 할 새 판본이고, 그 파라미터는 독립적인 측정에서 정해져야 하며, 현재의 계산은 아직 생물학적으로 검증된 실험 순서 예측이 아니다.",
    feedbackHeading:
      "명시적으로 적은 피드백 루프",
    feedbackBody:
      "x를 장벽 교란, y를 호르몬 교란이라 하면 단순한 국소 모델은 ẋ = au + by − r_x x, ẏ = cu + dx − r_y y이며, b와 d는 상호 이득, r_x와 r_y는 회복 속도다. 회복 속도가 양수이면 이 선형 모델의 평형은 bd < r_x r_y일 때 안정하다. 이는 BERM에 정확한 새 과제를 준다: 만성 노출이 이득 대 회복의 비를 불안정 쪽으로 옮기는가? 경계 근처에서는 회복이 느려지고, 그 둔화는 큰 기능 변화에 앞서 기존 시계열에서 찾을 수 있다. 양의 피드백만으로는 비가역성이 정해지지 않는다.",
    cardsHeading:
      "메커니즘 카드: 하나의 구조",
    cardsBody:
      "12개 층 내비게이션은 그대로 유지한다. 더해지는 것은 모든 메커니즘 카드에 동일한 구조다. 노출, 수용체, 기준 상태, 근위 반응, 전파, 기억, 기능적 귀결, 그리고 기전을 한정하는 개입이 매번 같은 자리에 기록된다.",
    /* Section 4: Routes */
    routesHeading: "4개 독립 경로",
    routesMechanism: "메커니즘",
    routesBlocked: "차단 인자",
    routesOrgans: "기관 연결",
    /* Section 5: Organs */
    organsHeading: "12개 표적 기관",
    organCav3: "Cav3 하위유형",
    organLevel: "수준",
    organView: "기관 프로파일 보기",
    organComingSoon: "준비 중",
    /* Section 6: Population */
    popHeading: "후보 χ_pop 프로파일",
    popBody:
      "χ_pop은 유전·식이·기술 시점 변수로 구성한 도입 L3 집단 반응 후보이며 χ_geo와 별개다. 가중치, 노출 매핑, 출산 종점에는 열린 L2 다리와 54개국 자료에서의 독립 보정이 필요하다.",
    popLink: "진화 및 집단 데이터 탐색",
    /* Section 7: Predictions */
    predHeading: "검증 가능한 예측",
    predIntro:
      "모듈롬은 구체적이고 반증 가능한 예측을 생성한다. 7개의 대표적인 MOD 수준 예측:",
    predictions: [
      "MOD-001: T형 Ca²⁺ 채널 차단제(에토숙시미드)는 라이디히 세포에서 RF-EMF의 테스토스테론에 대한 영향을 감쇠시킨다.",
      "MOD-002: 유제품 소비가 높은 집단(B2 공급원)은 출산율 감소 속도가 더 느리다.",
      "MOD-003: 만성 EMF 노출에서 HRV 감소는 측정 가능한 호르몬 변화에 선행한다.",
      "MOD-004: 파란 눈을 가진 개인(CRY 감수성이 높음)은 저녁 스크린 사용으로 인한 일주기 리듬 장애가 더 강하게 나타난다.",
      "MOD-005: 뇌하수체 생식선자극세포의 LH 펄스 빈도는 특정 EMF 주파수에 의해 직접 조절 가능하다.",
      "MOD-006: 미토콘드리아 연령(ΔΨm으로 측정)은 동일 세포 유형 내에서 EMF 감수성과 상관관계가 있다.",
      "MOD-007: EMF 유발 정자 DNA 메틸화 변화는 직업적으로 노출된 남성에서 검출 가능하며, VGCC 관련 유전자 좌위(CACNA1C, CACNA1G)를 포함한다. 프리프린트 지원: Research Square 2025 (레이더 노출 남성).",
      "MOD-008: 온전한 수용체 복합체를 가진 세포에서 제작한 소포는 채널이 침묵된 수용 세포에서 장 연관 칼슘 반응을 회복시키지만, 침묵된 공여체의 소포는 그렇지 않다.",
      "MOD-009: 50 Hz 노출 후의 후기 막 전류 변화는 ER 방출 또는 ER 재흡수 중 하나만 차단해도 사라지지만, 첫 칼슘 반응은 두 개입 모두에서 남는다.",
      "MOD-010: 채널 발현을 맞춘 조건에서 ER 칼슘 부하만 다른 세포는 같은 노출에 대해 서로 다른 첫 칼슘 반응을 보인다.",
      "MOD-011: 사전 노출 후 감소한 반응은 절대적 기준 손상과 회복 곡선을 측정하면 복구 능력에 귀속할 수 있다. 기준을 맞춘 부하 내성이 이를 수용체 탈감작과 구분한다.",
      "MOD-012: 총 광자량이 동일하고 파장 순서가 뒤바뀐 두 광 프로토콜은 서로 다른 플라빈 산화환원 상태를 남기며, 그 차이는 에피소드 간 지연이 중간체 수명을 넘어 길어질수록 줄어든다.",
      "MOD-013: 장 방향 이동을 없애는 노출은 이동 속도를 바꾸지 않는다. 즉 같은 세포에서 방향 오차와 운동성이 분리된다.",
      "MOD-014: 만성 노출 계열을 따라 표준 교란 후의 회복 시간은 기능 종점의 큰 변화보다 먼저 길어지며, 그 연장은 이득 대 회복의 비를 따른다.",
    ],
    predLink: "전체 예측 레지스터",
    /* Navigation */
    seeAlso: "참고 항목",
    modelPage: "BERM 모델",
    evidencePage: "증거 레지스터",
  },
};

const LEVEL_BADGE: Record<string, string> = {
  E: "bg-green-500/10 text-green-600 dark:text-green-400",
  M: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  C: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
  "M|C": "bg-amber-500/10 text-amber-600 dark:text-amber-400",
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const d = pickCopy(COPY, locale);
  return {
    title: `${d.title} \u2013 Extinction Field`,
    description: d.subtitle,
  };
}

export default async function ModulomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const d = pickCopy(COPY, locale);
  const l = locale;

  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <PageHeader icon={Layers} title={d.title} subtitle={d.subtitle} />

      <SteroidogenesisIntegrationPanel locale={locale} focus="overview" />

      <TranslationNotice copy={COPY} locale={locale} />

      {/* ── 01 Hero ── */}
      <section className="mb-16 border-t editorial-rule pt-6">
        <h2 className="text-lg font-semibold mb-4 tracking-wide">
          {d.heroHeading}
        </h2>
        <p className="editorial-rail text-[0.95rem] leading-relaxed text-foreground max-w-4xl">
          {d.heroBody}
        </p>
      </section>

      {/* ── 02 Terminology note ── */}
      <section className="mb-16">
        <div className="rounded-lg border border-card-border bg-card p-5 max-w-3xl">
          <h3 className="text-sm font-bold text-foreground mb-2">
            {d.termHeading}
          </h3>
          <p className="text-sm text-foreground-muted leading-relaxed">
            {d.termBody}
          </p>
        </div>
      </section>

      {/* ── 03 Twelve Layers ── */}
      <section className="mb-16 border-t editorial-rule pt-6">
        <h3 className="text-lg font-semibold mb-1">
          <span className="font-mono-num text-xs text-accent mr-2">03</span>
          {d.layersHeading}
        </h3>
        <p className="text-sm text-foreground-muted mb-6">{d.layersSubtitle}</p>

        <LayerStack layers={MODULOME_LAYERS} locale={l} />

        <div className="mt-10">
          <ModulomeLayers locale={l} />
        </div>
      </section>

      {/* ── 04 The receiver as a measured state ── */}
      <section className="mb-16 border-t editorial-rule pt-6">
        <h3 className="text-lg font-semibold mb-4">
          <span className="font-mono-num text-xs text-accent mr-2">04</span>
          {d.stateHeading}
        </h3>
        <p className="editorial-rail text-[0.95rem] leading-relaxed text-foreground max-w-4xl mb-3">
          {d.stateLead}
        </p>
        <p className="text-sm text-foreground-muted leading-relaxed max-w-4xl mb-8">
          {d.stateBody}
        </p>
        <ModulomeStateTriad locale={l} />
      </section>

      {/* ── 05 Transferable membrane machinery ── */}
      <section className="mb-16 border-t editorial-rule pt-6">
        <h3 className="text-lg font-semibold mb-4">
          <span className="font-mono-num text-xs text-accent mr-2">05</span>
          {d.membraneHeading}
        </h3>
        <p className="text-sm text-foreground-muted leading-relaxed max-w-4xl">
          {d.membraneBody}
        </p>
      </section>

      {/* ── 06 Calcium compartments ── */}
      <section className="mb-16 border-t editorial-rule pt-6">
        <h3 className="text-lg font-semibold mb-4">
          <span className="font-mono-num text-xs text-accent mr-2">06</span>
          {d.calciumHeading}
        </h3>
        <p className="text-sm text-foreground-muted leading-relaxed max-w-4xl mb-8">
          {d.calciumBody}
        </p>
        <ModulomeCalciumCycle locale={l} />
      </section>

      {/* ── 07 Flavin state and light history ── */}
      <section className="mb-16 border-t editorial-rule pt-6">
        <h3 className="text-lg font-semibold mb-4">
          <span className="font-mono-num text-xs text-accent mr-2">07</span>
          {d.photoHeading}
        </h3>
        <p className="text-sm text-foreground-muted leading-relaxed max-w-4xl mb-8">
          {d.photoBody}
        </p>
        <ModulomePhotonSequence locale={l} />
      </section>

      {/* ── 08 Position and direction ── */}
      <section className="mb-16 border-t editorial-rule pt-6">
        <h3 className="text-lg font-semibold mb-4">
          <span className="font-mono-num text-xs text-accent mr-2">08</span>
          {d.directionHeading}
        </h3>
        <p className="text-sm text-foreground-muted leading-relaxed max-w-4xl mb-8">
          {d.directionBody}
        </p>
        <ModulomePolarityResponse locale={l} />
      </section>

      {/* ── 09 Tissue environment and immune state ── */}
      <section className="mb-16 border-t editorial-rule pt-6">
        <h3 className="text-lg font-semibold mb-4">
          <span className="font-mono-num text-xs text-accent mr-2">09</span>
          {d.tissueHeading}
        </h3>
        <p className="text-sm text-foreground-muted leading-relaxed max-w-4xl">
          {d.tissueBody}
        </p>
      </section>

      {/* ── 10 State-dependent response window ── */}
      <section className="mb-16 border-t editorial-rule pt-6">
        <h3 className="text-lg font-semibold mb-4">
          <span className="font-mono-num text-xs text-accent mr-2">10</span>
          {d.windowHeading}
        </h3>
        <p className="text-sm text-foreground-muted leading-relaxed max-w-4xl mb-8">
          {d.windowBody}
        </p>
        <ModulomeStateWindow locale={l} />
      </section>

      {/* ── 11 Feedback loops ── */}
      <section className="mb-16 border-t editorial-rule pt-6">
        <h3 className="text-lg font-semibold mb-4">
          <span className="font-mono-num text-xs text-accent mr-2">11</span>
          {d.feedbackHeading}
        </h3>
        <p className="text-sm text-foreground-muted leading-relaxed max-w-4xl mb-8">
          {d.feedbackBody}
        </p>
        <ModulomeFeedbackStability locale={l} />
      </section>

      {/* ── 12 Mechanism cards ── */}
      <section className="mb-16 border-t editorial-rule pt-6">
        <h3 className="text-lg font-semibold mb-4">
          <span className="font-mono-num text-xs text-accent mr-2">12</span>
          {d.cardsHeading}
        </h3>
        <p className="text-sm text-foreground-muted leading-relaxed max-w-4xl mb-6">
          {d.cardsBody}
        </p>
        <ModulomeMechanismCards locale={l} />
      </section>

      {/* ── 13 Four Independent Routes ── */}
      <section className="mb-16 border-t editorial-rule pt-6">
        <h3 className="text-lg font-semibold mb-6">
          <span className="font-mono-num text-xs text-accent mr-2">13</span>
          {d.routesHeading}
        </h3>

        <div className="grid gap-5 sm:grid-cols-2">
          {FERTILITY_ROUTES.map((route) => {
            const name = l === "fi" ? route.nameFi : l === "ja" ? route.nameJa : l === "fr" ? route.nameFr : l === "ko" ? route.nameKo : route.nameEn;
            const mechanism =
              l === "fi" ? route.mechanismFi : l === "ja" ? route.mechanismJa : l === "fr" ? route.mechanismFr : l === "ko" ? route.mechanismKo : route.mechanismEn;
            const blocked =
              l === "fi" ? route.blockedByFi : l === "ja" ? route.blockedByJa : l === "fr" ? route.blockedByFr : l === "ko" ? route.blockedByKo : route.blockedByEn;

            return (
              <div
                key={route.id}
                className="rounded-lg bg-card border border-card-border p-5 space-y-3"
                style={{ borderLeftWidth: 4, borderLeftColor: route.color }}
              >
                <div className="flex items-start justify-between gap-2">
                  <h4 className="font-bold text-foreground text-sm leading-tight">
                    {name}
                  </h4>
                  {route.isNew && (
                    <span className="shrink-0 text-[0.6rem] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-accent/10 text-accent">
                      {l === "fi" ? "UUSI" : l === "fr" ? "NOUVEAU" : "NEW"}
                    </span>
                  )}
                </div>

                <div>
                  <p className="text-xs font-semibold text-foreground-muted uppercase tracking-wider mb-1">
                    {d.routesMechanism}
                  </p>
                  <p className="text-xs text-foreground-muted leading-relaxed">
                    {mechanism}
                  </p>
                </div>

                <div>
                  <p className="text-xs font-semibold text-foreground-muted uppercase tracking-wider mb-1">
                    {d.routesBlocked}
                  </p>
                  <p className="text-xs text-foreground-muted leading-relaxed">
                    {blocked}
                  </p>
                </div>

                <div>
                  <p className="text-xs font-semibold text-foreground-muted uppercase tracking-wider mb-1">
                    {d.routesOrgans}
                  </p>
                  <p className="text-xs text-foreground-muted leading-relaxed font-mono">
                    {route.organLinks.join(", ")}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── 14 Twelve Target Organs ── */}
      <section className="mb-16 border-t editorial-rule pt-6">
        <h3 className="text-lg font-semibold mb-6">
          <span className="font-mono-num text-xs text-accent mr-2">14</span>
          {d.organsHeading}
        </h3>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {ORGAN_PROFILES.map((organ) => {
            const name = l === "fi" ? organ.nameFi : l === "ja" ? organ.nameJa : l === "fr" ? organ.nameFr : l === "ko" ? organ.nameKo : organ.nameEn;
            const summary = l === "fi" ? organ.summaryFi : l === "ja" ? organ.summaryJa : l === "fr" ? organ.summaryFr : l === "ko" ? organ.summaryKo : organ.summaryEn;

            return (
              <div
                key={organ.id}
                className="rounded-lg bg-card border border-card-border p-5 space-y-3"
                style={{ borderTopWidth: 4, borderTopColor: organ.color }}
              >
                <div className="flex items-start justify-between gap-2">
                  <h4 className="font-bold text-foreground text-sm">
                    {name}
                  </h4>
                  <span
                    className={`shrink-0 text-[0.65rem] font-semibold px-1.5 py-0.5 rounded ${LEVEL_BADGE[organ.level] ?? LEVEL_BADGE.M}`}
                  >
                    {organ.level}
                  </span>
                </div>

                <p className="text-xs text-foreground-muted leading-relaxed">
                  {summary}
                </p>

                <div>
                  <p className="text-xs font-semibold text-foreground-muted uppercase tracking-wider mb-1">
                    {d.organCav3}
                  </p>
                  <p className="text-xs text-foreground-muted font-mono">
                    {organ.cav3Subtype}
                  </p>
                </div>

                {organ.ready ? (
                  <Link
                    href={`/${locale}${organ.subpage}`}
                    className="inline-block text-xs text-accent hover:underline"
                  >
                    {d.organView} &rarr;
                  </Link>
                ) : (
                  <span className="inline-block text-xs text-foreground-muted italic">
                    {d.organComingSoon}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* ── 15 Population chi Profiles ── */}
      <section className="mb-16 border-t editorial-rule pt-6">
        <h3 className="text-lg font-semibold mb-4">
          <span className="font-mono-num text-xs text-accent mr-2">15</span>
          {d.popHeading}
        </h3>

        <p className="text-sm text-foreground-muted leading-relaxed max-w-4xl mb-4">
          {d.popBody}
        </p>

        <Link
          href={`/${locale}/evidence/evolution`}
          className="text-sm text-accent hover:underline"
        >
          {d.popLink} &rarr;
        </Link>
      </section>

      {/* ── 16 Testable Predictions ── */}
      <section className="mb-16 border-t editorial-rule pt-6">
        <h3 className="text-lg font-semibold mb-4">
          <span className="font-mono-num text-xs text-accent mr-2">16</span>
          {d.predHeading}
        </h3>

        <p className="text-sm text-foreground-muted mb-4">{d.predIntro}</p>

        <ul className="space-y-2 text-sm text-foreground-muted leading-relaxed max-w-4xl">
          {d.predictions.map((pred, i) => (
            <li key={i} className="pl-1 flex gap-2">
              <span className="shrink-0 text-accent font-mono text-xs mt-0.5">
                {"\u2022"}
              </span>
              <span>{pred}</span>
            </li>
          ))}
        </ul>

        <Link
          href={`/${locale}/predictions`}
          className="inline-block mt-4 text-sm text-accent hover:underline"
        >
          {d.predLink} &rarr;
        </Link>
      </section>

      {/* ── See also ── */}
      <section className="border-t editorial-rule pt-6">
        <h3 className="text-sm font-semibold text-foreground mb-3">
          {d.seeAlso}
        </h3>
        <div className="flex gap-6">
          <Link
            href={`/${locale}/model`}
            className="text-sm text-accent hover:underline"
          >
            {d.modelPage} &rarr;
          </Link>
          <Link
            href={`/${locale}/evidence`}
            className="text-sm text-accent hover:underline"
          >
            {d.evidencePage} &rarr;
          </Link>
        </div>
      </section>
    </div>
  );
}
