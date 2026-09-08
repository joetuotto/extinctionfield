import { CombinedExposurePanel } from "@/components/CombinedExposurePanel";
import { SteroidogenesisIntegrationPanel } from "@/components/SteroidogenesisIntegrationPanel";
import type { Metadata } from "next";
import Link from "next/link";
import { GitMerge, ArrowRight } from "lucide-react";
import { ClaimRef } from "@/components/ClaimRef";
import { ExplanationHub, ExplanationSection, ExplanationText, ResearchConnection } from "@/components/ExplanationHub";
import { MathBlock } from "@/components/MathBlock";
import { pickCopy } from "@/lib/i18n";

const COPY = {
  en: {
    title: "How the evidence connects",
    subtitle: "Seven converging research connections, from a receiving system to motivation and collective outcomes.",
    lead: "The strongest synthesis joins studies at a named, measurable interface. A change located in one experiment becomes an input to the next part of the explanation. BERM assembles this chain from its physical premise through biological state, valuation and interaction, keeping the shared variables visible across scales.",
    incoming: "Lindgren’s 2025 premise and its tensor consequence, followed by the explicit geometry-to-receptor bridge. The component literature then supplies measured biological relationships.",
    outgoing: "A composed model with shared state variables, linked outcomes and concrete datasets. Each source supports the transition it measures; their connections support the wider synthesis.",
    contents: [{ id: "reading-evidence", title: "Three orders of evidence" }, { id: "cry-circuit", title: "CRY–receptor–clock circuit" }, { id: "hormone-time", title: "Hormone signal and timing" }, { id: "reproductive-motivation", title: "Reproduction and motivation" }, { id: "effort", title: "State and effort valuation" }, { id: "reasons", title: "Choices and reported reasons" }, { id: "social-learning", title: "Social value and learning" }, { id: "network", title: "Partners and networks" }, { id: "shared-state", title: "Parsimony in the joint pattern" }, { id: "data", title: "Data that join the levels" }],
    orderLead: "Explanatory scale, the origin of a proposition and the role of a study are different questions. Keeping them separate lets a molecular intervention and a population dataset contribute to the same explanation without pretending that they measure the same link.",
    axes: [
      { title: "Where in the explanation?", text: "Physics → reception → organism → behavior → interaction → civilization. This is the website’s reading order, not a ranking from weak to strong evidence." },
      { title: "Where does the proposition come from?", text: "An identified premise, an algebraic consequence, an explicit bridge, a mechanism measured elsewhere, or a synthesis of connected relationships." },
      { title: "What does the study supply?", text: "The structure of a mechanism, direction, magnitude, timing, receiver dependence, or an aggregate constraint. Species, protocol and dataset family remain attached to the result." },
    ],
    gate: "L0 is g = η + A⊗A. L1 follows by A = Ab + a: δg = Ab⊗a + a⊗Ab + a⊗a. At L2, BERM conditionally derives a formal response operator under minimal matter–metric coupling and causal response theory; z = ∫K(S):δg is a receptor-specific temporal representation. Gauge, scale, tissue kernels, sign, lag and endpoint calibration remain open. The studies below establish or constrain L3 biological realizations and L4 downstream relationships; their composition continues through this explicit bridge. [[ref:lindgren2025|Lindgren 2025]]; [[ref:kubo1957_linear_response|Kubo 1957]].",
    physicsLink: "Read the physical derivation and coupling →",
    inputLabel: "Upstream quantity", interfaceLabel: "Shared interface", outputLabel: "Downstream output",
    chains: [
      {
        id: "cry-circuit", title: "CRY, hormone receptors and clocks close a regulatory loop",
        input: "Field response and CRY state", interface: "Receptor response / cAMP / clock phase", output: "A changed response to the next signal",
        text: "This connection joins the physical-reception literature to the machinery that determines hormone effectiveness. It also returns endocrine state to the receiver: biological phase and steroid signaling can change subsequent responsiveness.",
        studies: "Sherrard’s defined pulsed-field protocol produced CRY-dependent responses and a gene-response enrichment involving corticosteroid receptors and cyclic nucleotides. Lamia located CRY–glucocorticoid-receptor regulation, Rizzini identified a CRY–DET1–COP1 transcriptional route, and Manella located CRY2 dependence in steroid-driven clock resetting. Zhang independently connects CRY to hepatic glucagon/cAMP signaling. [[ref:sherrard2018|Sherrard 2018]]; [[ref:lamia2011_cry_glucocorticoid|Lamia 2011]]; [[ref:rizzini2019_cry_cop1|Rizzini 2019]]; [[ref:manella2026_cry2_steroid_clock|Manella 2025/2026]]; [[ref:zhang2010_cry_camp|Zhang 2010]].",
        implication: "A small set of coupled variables can represent reception, clock timing and endocrine sensitivity. The direct connecting measurement is a hormone-receptor response curve under the specified field and cell conditions. Gene enrichment locates that interface; it is not itself the response curve. Tissue, CRY isoform and regulatory partners determine the sign.",
      },
      {
        id: "hormone-time", title: "Hormone action depends on temporal structure",
        input: "Dose, pulses and clock phase", interface: "Time-dependent tissue receptivity", output: "Gene, emotional and cognitive responses",
        text: "The CRY–receptor circuit becomes more explanatory when the signal retains its timing. Receptor responsiveness can vary while circulating abundance remains similar, and a different pulse pattern can produce a different accumulated response.",
        studies: "Stavreva’s receptor experiments locate pulse-dependent gene regulation. Archer’s human circadian study measures disrupted transcript timing. Kalafatakis changes hydrocortisone delivery pattern at the same administered daily dose in 15 men and measures emotional and cognitive effects. These studies describe different stages of temporal decoding. [[ref:stavreva2009_hormone_pulses|Stavreva 2009]]; [[ref:archer2014_transcriptome|Archer 2014]]; [[ref:kalafatakis2018_cortisol_pulsatility|Kalafatakis 2018]].",
        implication: "BERM composes hormone availability with receptive state over time. This supports a route from altered biological coordination to functional change even when one concentration measurement does not shift. Dose, blood waveform and receptor sensitivity remain distinct measurable quantities.",
      },
      {
        id: "reproductive-motivation", title: "The reproductive axis reaches both function and motivation",
        input: "Hormonal and neural regulation", interface: "Sexual processing and responsiveness", output: "Initiation, partner response and reproductive opportunity",
        text: "A reproductive model needs the formation of an attempt as well as success conditional on it. The biological system contributes to both. This makes desire and initiative part of the explanation rather than fixed external inputs.",
        studies: "Finkelstein separates testosterone and estradiol contributions using controlled suppression and replacement. Mills’s kisspeptin crossover trial measures sexual-stimulus processing and penile response without a significant measured testosterone change. CatSper research independently locates a physiological fertilization gate. [[ref:finkelstein2013_gonadal_steroids|Finkelstein 2013]]; [[ref:mills2023_kisspeptin|Mills 2023]]; [[ref:catsper2024|Young 2024]].",
        implication: "Shared biological state can affect motivation, opportunity and physiological success. Sexual desire, wanting a child and an intentional attempt retain separate observations. Their transitions enter the couple’s calendar, alongside pregnancies beginning without an intentional attempt.",
      },
      {
        id: "effort", title: "Biological state changes what effort is worth",
        input: "Dopamine, sleep or inflammatory state", interface: "Reward and effort weights", output: "Willingness to choose an available action",
        text: "Several interventions converge on the distinction between being able to perform a task and wanting to select it. Their value for BERM lies in the decision variables they identify, including different responses to cognitive and physical effort.",
        studies: "Westbrook combines baseline dopamine synthesis, drug manipulation and cognitive-effort choice. Jurgelis’s sleep restriction changes cognitive-effort aversion relative to a short physical-effort task. Draper’s inflammatory challenge reduces high-effort acceptance without a matching significant change in reward sensitivity. [[ref:westbrook2020_dopamine_effort|Westbrook 2020]]; [[ref:jurgelis2022_sleep_effort|Jurgelis 2022]]; [[ref:draper2018_inflammation_effort|Draper 2018]].",
        implication: "The same external cost can receive a different subjective weight. BERM can therefore explain why a coherent account of insufficient time or energy may follow an altered biological state. A quantitative model preserves the intervention, baseline state, task and measured cost rather than imposing one universal motivation factor.",
      },
      {
        id: "reasons", title: "The reported reason is an observable in the chain",
        input: "State, valuation and chosen outcome", interface: "Interpretation and deliberation", output: "Expressed reasons and later commitments",
        text: "A reason can describe a decision, help form it, and later guide another decision. Its place in the chain depends on timing. BERM treats the experienced value and the explanation of that value as outputs of the same biological and cognitive process.",
        studies: "Johansson’s choice-blindness intervention shows that people can justify an unnoticed substituted choice outcome. Eisenegger’s testosterone experiment distinguishes a randomized biological intervention from a later observed belief about that intervention. The belief association is not an experimentally isolated causal effect. [[ref:johansson2005_choice_blindness|Johansson 2005]]; [[ref:eisenegger2010_testosterone_fairness|Eisenegger 2010]].",
        implication: "Reported reasons cannot automatically close the explanation upstream of biology. A change in motivation can be experienced as a change in what makes sense, and its verbal account can become feedback. These experiments do not assign a universal fraction of human reasoning to retrospective rationalization.",
      },
      {
        id: "social-learning", title: "Social values and learning carry state into later action",
        input: "Neuromodulatory, nutritional and sleep state", interface: "Harm weights and feedback updating", output: "Social choices and accumulated action history",
        text: "Socially consequential decisions remain decisions made by biological organisms. The bridge to durable patterns is the combination of current valuation with learning: today’s state affects both today’s action and what is carried into the next encounter.",
        studies: "Crockett manipulates serotonin- and dopamine-related signaling in choices trading money against harm. Strang changes breakfast composition and observes altered rejection of unfair offers. Lim measures altered positive-feedback learning and choice consistency under sleep restriction. Westbrook’s later publication supplies related learning outcomes within the RADBOUD-DA dataset family. [[ref:crockett2015_harm_aversion|Crockett 2015]]; [[ref:strang2017_nutrition_decisions|Strang 2017]]; [[ref:lim2026_sleep_learning|Lim 2026]]; [[ref:westbrook2025_dopamine_learning|Westbrook 2025]].",
        implication: "BERM carries state into social decision weights and the learning rule. Repetition can turn a transient shift into a durable action pattern through remembered outcomes and changed opportunities. The same mechanism can yield different signs for different choices because the task’s rewards and harms differ.",
      },
      {
        id: "network", title: "One organism’s output becomes another’s environment",
        input: "Initiatives, responses and repeated actions", interface: "Dyadic interaction and network position", output: "Collective outcomes and institutional renewal",
        text: "The transition to society is a composition of encounters. Pair success depends on both participants; propagation depends on who interacts with whom and how actions alter future participation. Stored consequences give institutions and ecosystems their longer timescales.",
        studies: "Weisman’s father–infant intervention locates changes in an untreated partner’s behavior and physiological response during interaction. Paluck’s school-network intervention connects participants’ network positions to community conflict reports. Ben Simon combines distinct sleep, diary and donation studies; willingness to help and aggregated donations remain different outcomes. [[ref:weisman2012_oxytocin_dyad|Weisman 2012]]; [[ref:paluck2016_network_conflict|Paluck 2016]]; [[ref:bensimon2022_sleep_helping|Ben Simon 2022]].",
        implication: "Individual effects need not be identical to create a stable shift in the aggregate distribution. BERM connects biological action probabilities to encounter rates, network transmission, participation and stored institutional capacity. This is a synthesis of distinct measured links; its coefficients belong to the population and time scale being modeled.",
      },
    ],
    parsimonyClaim: "BERM derives physiological and behavioral outputs from a shared time-dependent biological state; the field-to-state coupling is the separately specified upstream step of the chain.",
    parsimony: "Parsimony becomes substantive when the same measured states explain several outcomes together. Near a specified baseline, a local approximation is ΔY = JΔS + ε. If k shared state variables generate the shared component, its covariance JΣS Jᵀ has rank at most k. This is a conditional mathematical constraint, not a covariance pattern already demonstrated for BERM.",
    parsimonyMeaning: "This makes studies measuring hormones, desire, fatigue, choice and perceived change in the same people especially valuable. Different publications from the same cohort supply connected outputs. Independent interventions reaching the same interface provide another kind of convergence. Publication count alone measures neither kind.",
    dataLead: "These existing resources make the proposed interfaces concrete. Availability describes the actual shared material; access-controlled individual data are distinguished from public derivatives. The synthesis identifies analyses to do rather than reporting a reanalysis already performed.",
    datasets: [
      { title: "CRY, hormone response and gene expression", description: "Rizzini’s GSE124388 RNA-seq can be compared at defined pathways with Sherrard’s gene lists and Manella’s source data. The cell systems remain distinct.", href: "https://www.ncbi.nlm.nih.gov/geo/query/acc.cgi?acc=GSE124388", access: "Public RNA-seq and article supplements" },
      { title: "Dopamine, effort and learning", description: "Westbrook 2025: processed data from the RADBOUD-DA program. The 2020 and 2025 papers belong to a shared study family.", href: "https://data.ru.nl/collections/di/dccn/DSC_3017048.01_923", access: "Open processed data · CC BY-SA 4.0" },
      { title: "Hormones, desire and perceived change", description: "Testosterone Trials connect hormone assays, sexual desire, fatigue, affect and self-reported change in the same participants.", href: "https://agingresearchbiobank.nia.nih.gov/studies/ttrials/details", access: "Public dictionary · individual data by application" },
      { title: "Sleep and feedback learning", description: "Lim’s repository contains sleep measurements, participant files and analysis code for the sequential-updating task.", href: "https://github.com/nightowl0063/seq_updating_analyses", access: "Public data and analysis repository" },
      { title: "Sleep, helping and aggregate donations", description: "Ben Simon’s shared files cover separate experimental, diary and aggregate donation analyses. The full donation register is a separate resource.", href: "https://osf.io/2973t/", access: "Public study files and aggregate data" },
      { title: "Hormones, partners and motivation", description: "NSHAP links older adults’ hormone measures, initiation and receptivity, partners and networks. Its population defines the inference scope.", href: "https://www.icpsr.umich.edu/web/NACDA/studies/20541/summary", access: "Public and separately restricted files" },
    ],
    links: [
      { href: "/evidence", title: "Evidence registry", description: "Browse the existing evidence catalogue and its research relationships." },
      { href: "/references", title: "Primary sources", description: "Publication records and their connections to site claims." },
      { href: "/epistemology", title: "How the reasoning works", description: "Premises, derivation, synthesis and the interpretation of evidence." },
      { href: "/predictions", title: "Predictions", description: "Follow the model’s consequences into specified outcomes." },
      { href: "/measurement/fieldstate", title: "Measurements and estimation", description: "The physical observation route that informs the upstream state." },
      { href: "/evidence/ecology", title: "Cross-species connections", description: "The parallel ecological branch and its existing evidence." },
    ],
    next: { href: "/model", title: "Read the whole model in order", description: "Start with the premises and follow the connected explanation through physics, biology, behavior and civilization." },
  },
  fi: {
    title: "Miten tutkimusnäyttö yhdistyy",
    subtitle: "Seitsemän yhdistyvää tutkimusketjua vastaanottimesta motivaatioon ja yhteisiin tuloksiin.",
    lead: "Vahvin synteesi yhdistää tutkimukset nimetyssä, mitattavassa rajapinnassa. Yhdessä kokeessa paikannettu muutos tulee seuraavan selitysvaiheen syötteeksi. BERM kokoaa ketjun fysikaalisesta premissistä biologiseen tilaan, arvottamiseen ja vuorovaikutukseen ja pitää yhteiset muuttujat näkyvissä mittakaavojen välillä.",
    incoming: "Lindgrenin vuoden 2025 premissi ja sen tensorinen seuraus sekä eksplisiittinen geometriasta vastaanottimeen kulkeva kytkentä. Osatutkimukset antavat tämän jälkeen mitattuja biologisia yhteyksiä.",
    outgoing: "Yhdistetty malli, jolla on yhteiset tilamuuttujat, toisiinsa liittyvät ulostulot ja konkreettiset aineistot. Kukin lähde tukee mittaamaansa siirtymää; niiden yhteydet tukevat laajempaa synteesiä.",
    contents: [{ id: "reading-evidence", title: "Kolme näytön järjestystä" }, { id: "cry-circuit", title: "CRY–reseptori–kello-piiri" }, { id: "hormone-time", title: "Hormonisignaali ja ajoitus" }, { id: "reproductive-motivation", title: "Lisääntyminen ja motivaatio" }, { id: "effort", title: "Tila ja vaivan arvottaminen" }, { id: "reasons", title: "Valinnat ja kerrotut syyt" }, { id: "social-learning", title: "Sosiaalinen arvo ja oppiminen" }, { id: "network", title: "Kumppanit ja verkostot" }, { id: "shared-state", title: "Parsimonia yhteisessä kuviossa" }, { id: "data", title: "Tasoja yhdistävät aineistot" }],
    orderLead: "Selityksen mittakaava, väitteen alkuperä ja tutkimuksen tehtävä ovat eri kysymyksiä. Niiden erottaminen antaa molekyyli-intervention ja väestöaineiston osallistua samaan selitykseen siten, että kummankin todella mittaama yhteys säilyy näkyvissä.",
    axes: [
      { title: "Missä selityksen kohdassa?", text: "Fysiikka → vastaanotto → elimistö → käyttäytyminen → vuorovaikutus → sivilisaatio. Tämä on sivuston lukujärjestys, ei heikosta vahvaan etenevä näyttöasteikko." },
      { title: "Mistä väite on peräisin?", text: "Yksilöity premissi, algebrallinen seuraus, eksplisiittinen kytkentä, muualla mitattu mekanismi tai yhdistyvistä suhteista koottu synteesi." },
      { title: "Mitä tutkimus antaa?", text: "Mekanismin rakenteen, suunnan, suuruuden, ajoituksen, vastaanotintilan riippuvuuden tai aggregaatin rajoitteen. Laji, protokolla ja aineistoperhe säilyvät tuloksen yhteydessä." },
    ],
    gate: "L0 on g = η + A⊗A. L1 seuraa jaosta A = Ab + a: δg = Ab⊗a + a⊗Ab + a⊗a. L2:ssa BERM johtaa formaalin vasteoperaattorin ehdollisesti minimaalisella materia–metriikka-kytkennällä ja kausaalisella vastefunktioteorialla; z = ∫K(S):δg on vastaanotinkohtainen ajallinen esitys. Gauge, mittakaava, kudosytimet, merkki, viive ja päätepistekalibraatio ovat avoimia. Alla olevat tutkimukset osoittavat tai rajaavat L3:n biologisia toteutuksia ja L4:n myöhempiä yhteyksiä; niiden yhdistelmä jatkaa tämän eksplisiittisen kytkennän kautta. [[ref:lindgren2025|Lindgren 2025]]; [[ref:kubo1957_linear_response|Kubo 1957]].",
    physicsLink: "Lue fysikaalinen johto ja kytkentä →",
    inputLabel: "Edeltävä suure", interfaceLabel: "Yhteinen rajapinta", outputLabel: "Seuraava ulostulo",
    chains: [
      {
        id: "cry-circuit", title: "CRY, hormonireseptorit ja kellot sulkevat säätelypiirin",
        input: "Kenttävaste ja CRY-tila", interface: "Reseptorivaste / cAMP / kellovaihe", output: "Muuttunut vaste seuraavaan signaaliin",
        text: "Tämä yhteys liittää fysikaalisen vastaanoton kirjallisuuden hormonien vaikuttavuutta määräävään koneistoon. Se palauttaa myös hormonitilan vastaanottimeen: biologinen vaihe ja steroidisignalointi voivat muuttaa myöhempää vastaanottavuutta.",
        studies: "Sherrardin määritelty magneettipulssiprotokolla tuotti CRY-riippuvaisia vasteita ja kortikosteroidireseptoreihin sekä syklisiin nukleotideihin liittyviä geenivasteen rikastumia. Lamia paikansi CRY:n glukokortikoidireseptorin säätelyyn, Rizzini tunnisti CRY–DET1–COP1-geenivastereitin ja Manella CRY2-riippuvuuden steroidien välittämässä kellon tahdistuksessa. Zhang yhdistää CRY:n erikseen maksan glukagoni–cAMP-signalointiin. [[ref:sherrard2018|Sherrard 2018]]; [[ref:lamia2011_cry_glucocorticoid|Lamia 2011]]; [[ref:rizzini2019_cry_cop1|Rizzini 2019]]; [[ref:manella2026_cry2_steroid_clock|Manella 2025/2026]]; [[ref:zhang2010_cry_camp|Zhang 2010]].",
        implication: "Pieni joukko kytkeytyviä muuttujia voi kuvata vastaanottoa, kellon ajoitusta ja hormoniherkkyyttä. Suora yhdistävä mittaus on hormonireseptorin vastekäyrä määritellyssä kentässä ja solutilassa. Geenirikastuma paikantaa rajapinnan; se ei itsessään ole vastekäyrä. Kudos, CRY:n alalaji ja säätelykumppanit määräävät suunnan.",
      },
      {
        id: "hormone-time", title: "Hormonin toiminta riippuu ajallisesta rakenteesta",
        input: "Annos, pulssit ja kellovaihe", interface: "Ajassa muuttuva kudoksen vastaanottavuus", output: "Geeni-, tunne- ja kognitiiviset vasteet",
        text: "CRY–reseptoripiirin selitys tarkentuu, kun signaali säilyttää ajoituksensa. Reseptorin vastaanottavuus voi muuttua veren määrän pysyessä samankaltaisena, ja erilainen pulssikuvio voi tuottaa erilaisen kertyvän vasteen.",
        studies: "Stavrevan reseptorikokeet paikantavat pulssiriippuvaisen geenisäätelyn. Archerin ihmistutkimus mittaa transkriptien ajoituksen häiriötä. Kalafatakis muuttaa hydrokortisonin antotapaa samalla vuorokausiannoksella 15 miehellä ja mittaa tunne- ja kognitiivisia vaikutuksia. Tutkimukset kuvaavat ajallisen tulkinnan eri vaiheita. [[ref:stavreva2009_hormone_pulses|Stavreva 2009]]; [[ref:archer2014_transcriptome|Archer 2014]]; [[ref:kalafatakis2018_cortisol_pulsatility|Kalafatakis 2018]].",
        implication: "BERM yhdistää hormonin saatavuuden vastaanottavaan tilaan ajassa. Se tukee reittiä biologisen koordinaation muutoksesta toiminnan muutokseen myös silloin, kun yksittäinen pitoisuusmittaus ei muutu. Annos, veren pitoisuuskäyrä ja reseptoriherkkyys ovat erillisiä mitattavia suureita.",
      },
      {
        id: "reproductive-motivation", title: "Lisääntymisakseli ulottuu toimintaan ja motivaatioon",
        input: "Hormonaalinen ja neuraalinen säätely", interface: "Seksuaalinen käsittely ja vastaanottavuus", output: "Aloite, kumppanin vastaus ja lisääntymismahdollisuus",
        text: "Lisääntymismalli tarvitsee yrityksen muodostumisen ja onnistumisen yrityksen ehdolla. Biologinen järjestelmä osallistuu molempiin. Halu ja aloitteisuus kuuluvat näin selityksen tuloksiin.",
        studies: "Finkelstein erottaa testosteronin ja estradiolin osuuksia kontrolloidulla vaimennuksella ja korvauksella. Millsin kisspeptiinin vaihtovuorokoe mittaa seksuaalisten ärsykkeiden käsittelyä ja peniksen vastetta ilman merkitsevää mitattua testosteronimuutosta. CatSper-tutkimus paikantaa erikseen fysiologisen hedelmöittymisportin. [[ref:finkelstein2013_gonadal_steroids|Finkelstein 2013]]; [[ref:mills2023_kisspeptin|Mills 2023]]; [[ref:catsper2024|Young 2024]].",
        implication: "Yhteinen biologinen tila voi vaikuttaa motivaatioon, mahdollisuuteen ja fysiologiseen onnistumiseen. Seksuaalinen halu, lapsitoive ja tarkoituksellinen yritys säilyttävät omat havaintonsa. Niiden siirtymät tulevat parin kalenteriin yhdessä ilman tarkoituksellista yritystä alkavien raskauksien kanssa.",
      },
      {
        id: "effort", title: "Biologinen tila muuttaa vaivan arvoa",
        input: "Dopamiini-, uni- tai tulehdustila", interface: "Palkkion ja vaivan painot", output: "Halukkuus valita mahdollinen toiminto",
        text: "Useat interventiot kohtaavat erossa tehtävään kykenemisen ja sen valitsemishalun välillä. Niiden arvo BERMille on nimetyissä päätösmuuttujissa sekä kognitiivisen ja fyysisen vaivan erilaisten vasteiden paikantamisessa.",
        studies: "Westbrook yhdistää lähtötason dopamiinisynteesin, lääkeintervention ja kognitiivisen vaivan valinnan. Jurgelisin unirajoitus muuttaa kognitiivisen vaivan välttämistä suhteessa lyhyeen fyysiseen tehtävään. Draperin tulehdushaaste vähentää vaativiin vaihtoehtoihin suostumista ilman vastaavaa merkitsevää palkkioherkkyyden muutosta. [[ref:westbrook2020_dopamine_effort|Westbrook 2020]]; [[ref:jurgelis2022_sleep_effort|Jurgelis 2022]]; [[ref:draper2018_inflammation_effort|Draper 2018]].",
        implication: "Sama ulkoinen kustannus voi saada erilaisen subjektiivisen painon. BERM voi siksi selittää, miksi johdonmukainen kuvaus ajan tai energian riittämättömyydestä voi seurata muuttunutta biologista tilaa. Määrällinen malli säilyttää intervention, lähtötilan, tehtävän ja mitatun kustannuksen yhden yleisen motivaatiokertoimen sijaan.",
      },
      {
        id: "reasons", title: "Kerrottu syy on ketjun havaittava suure",
        input: "Tila, arvottaminen ja valittu tulos", interface: "Tulkinta ja harkinta", output: "Ilmaistut syyt ja myöhemmät sitoumukset",
        text: "Perustelu voi kuvata päätöstä, osallistua sen muodostamiseen ja myöhemmin ohjata toista päätöstä. Sen paikka ketjussa riippuu ajoituksesta. BERM käsittelee koettua arvoa ja sen selitystä saman biologisen ja kognitiivisen prosessin ulostuloina.",
        studies: "Johanssonin valintasokeusinterventio osoittaa, että ihminen voi perustella huomaamatta vaihdettua valinnan lopputulosta. Eiseneggerin testosteronikoe erottaa satunnaistetun biologisen intervention myöhemmin havaitusta uskomuksesta koskien interventiota. Uskomuksen yhteys ei ole kokeellisesti eristetty kausaalivaikutus. [[ref:johansson2005_choice_blindness|Johansson 2005]]; [[ref:eisenegger2010_testosterone_fairness|Eisenegger 2010]].",
        implication: "Kerrottu syy ei automaattisesti päätä selitystä biologian yläpuolelle. Motivaation muutos voi tuntua muutokselta siinä, mikä on järkevää, ja sanallinen selitys voi muuttua palautteeksi. Kokeet eivät anna yleistä prosenttiosuutta jälkikäteiselle järkeistämiselle ihmisen kaikessa päättelyssä.",
      },
      {
        id: "social-learning", title: "Sosiaaliset arvot ja oppiminen vievät tilan myöhempiin tekoihin",
        input: "Välittäjäaine-, ravitsemus- ja unitila", interface: "Haittapainot ja palautteen päivitys", output: "Sosiaaliset valinnat ja kertyvä toimintahistoria",
        text: "Sosiaalisesti merkitykselliset päätökset ovat biologisten eliöiden päätöksiä. Kestäviin kuvioihin johtava yhteys syntyy nykyisestä arvottamisesta ja oppimisesta: tämän päivän tila vaikuttaa sekä tekoon että siihen, mitä seuraavaan kohtaamiseen siirtyy.",
        studies: "Crockett manipuloi serotoniiniin ja dopamiiniin liittyvää signalointia rahan ja haitan välisissä valinnoissa. Strang muuttaa aamiaisen koostumusta ja havaitsee epäreilujen tarjousten hylkäämisen muutoksen. Lim mittaa myönteisen palautteen oppimisen ja valintojen johdonmukaisuuden muutoksia univajeessa. Westbrookin myöhempi julkaisu antaa yhdistyviä oppimistuloksia RADBOUD-DA-aineistoperheestä. [[ref:crockett2015_harm_aversion|Crockett 2015]]; [[ref:strang2017_nutrition_decisions|Strang 2017]]; [[ref:lim2026_sleep_learning|Lim 2026]]; [[ref:westbrook2025_dopamine_learning|Westbrook 2025]].",
        implication: "BERM vie tilan sosiaalisiin päätöspainoihin ja oppimissääntöön. Toisto voi muuttaa hetkellisen siirtymän kestäväksi toimintakuvioksi muistettujen tulosten ja muuttuneiden mahdollisuuksien kautta. Sama mekanismi voi tuottaa eri valinnoille erimerkkisiä vaikutuksia, koska tehtävien palkkiot ja haitat eroavat.",
      },
      {
        id: "network", title: "Yhden eliön ulostulo muuttuu toisen ympäristöksi",
        input: "Aloitteet, vastaukset ja toistuvat teot", interface: "Parivuorovaikutus ja verkostosijainti", output: "Yhteiset tulokset ja instituutioiden uusintaminen",
        text: "Siirtymä yhteiskuntaan on kohtaamisten yhdistelmä. Parin onnistuminen riippuu molemmista; eteneminen riippuu siitä, ketkä kohtaavat ja miten teot muuttavat tulevaa osallistumista. Varastoituvat seuraukset antavat instituutioille ja ekosysteemeille pidemmät aikaskaalat.",
        studies: "Weismanin isä–vauva-interventio paikantaa muutoksia käsittelemättömän kumppanin käyttäytymisessä ja fysiologisessa vasteessa vuorovaikutuksen aikana. Paluckin kouluverkostointerventio yhdistää osallistujien verkostosijainnin yhteisön konfliktiraportteihin. Ben Simon yhdistää erillisiä uni-, päiväkirja- ja lahjoitustutkimuksia; auttamishalu ja aggregoidut lahjoitukset pysyvät eri päätepisteinä. [[ref:weisman2012_oxytocin_dyad|Weisman 2012]]; [[ref:paluck2016_network_conflict|Paluck 2016]]; [[ref:bensimon2022_sleep_helping|Ben Simon 2022]].",
        implication: "Yksilövaikutusten ei tarvitse olla identtisiä, jotta aggregaattijakauma siirtyisi vakaasti. BERM yhdistää biologiset toimintatodennäköisyydet kohtaamismääriin, verkostovälitykseen, osallistumiseen ja varastoituvaan institutionaaliseen kapasiteettiin. Tämä on erillisten mitattujen yhteyksien synteesi, jonka kertoimet kuuluvat mallinnettavaan populaatioon ja aikaskaalaan.",
      },
    ],
    parsimonyClaim: "BERM johtaa yhteisestä ajallisesta biologisesta tilasta fysiologisia ja käyttäytymisen ulostuloja; kentästä tilaan johtava kytkentä on ketjun erikseen määriteltävä alkuvaihe.",
    parsimony: "Parsimonia saa sisältöä, kun samat mitatut tilat selittävät useita tuloksia yhdessä. Nimetyn lähtötilan lähellä voidaan käyttää paikallista approksimaatiota ΔY = JΔS + ε. Jos yhteisiä tilamuuttujia on k, niiden tuottaman yhteiskovarianssin JΣS Jᵀ aste on enintään k. Tämä on ehdollinen matemaattinen rajoite, ei BERMille jo aineistosta osoitettu kovarianssikuvio.",
    parsimonyMeaning: "Siksi samojen ihmisten hormonit, halu, väsymys, valinnat ja koettu muutos yhdistävät aineistot ovat erityisen arvokkaita. Saman kohortin eri julkaisut antavat toisiinsa liittyviä ulostuloja. Riippumattomat interventiot samassa rajapinnassa tuottavat toisenlaista konvergenssia. Pelkkä julkaisumäärä ei mittaa kumpaakaan.",
    dataLead: "Nämä olemassa olevat aineistot tekevät yhdistettävät rajapinnat konkreettisiksi. Saatavuus kuvaa todella jaettua materiaalia; käyttöluvan alainen yksilödata erotetaan julkisista johdannaisista. Synteesi yksilöi tehtäviä analyysejä eikä esitä uudelleenanalyysiä jo suoritetuksi.",
    datasets: [
      { title: "CRY, hormonivaste ja geenitoiminta", description: "Rizzinin GSE124388-RNA-seq voidaan yhdistää rajattujen reittien vertailussa Sherrardin geenilistoihin ja Manellan lähdedataan. Solujärjestelmät säilyvät erillisinä.", href: "https://www.ncbi.nlm.nih.gov/geo/query/acc.cgi?acc=GSE124388", access: "Julkinen RNA-seq ja artikkeliliitteet" },
      { title: "Dopamiini, vaiva ja oppiminen", description: "Westbrook 2025: RADBOUD-DA-ohjelman prosessoitu aineisto. Vuosien 2020 ja 2025 julkaisut kuuluvat samaan tutkimusperheeseen.", href: "https://data.ru.nl/collections/di/dccn/DSC_3017048.01_923", access: "Avoin prosessoitu aineisto · CC BY-SA 4.0" },
      { title: "Hormonit, halu ja koettu muutos", description: "Testosterone Trials yhdistää hormonimittaukset, seksuaalisen halun, väsymyksen, affektin ja oman muutosarvion samoilta osallistujilta.", href: "https://agingresearchbiobank.nia.nih.gov/studies/ttrials/details", access: "Julkinen muuttujaluettelo · yksilödata hakemuksella" },
      { title: "Uni ja palauteoppiminen", description: "Limin aineistovarasto sisältää unimittaukset, osallistujatiedostot ja peräkkäisen päivitystehtävän analyysit.", href: "https://github.com/nightowl0063/seq_updating_analyses", access: "Julkinen data- ja analyysivarasto" },
      { title: "Uni, auttaminen ja lahjoitusaggregaatit", description: "Ben Simonin jaetut tiedostot kattavat erilliset kokeelliset, päiväkirja- ja lahjoitusaggregaattien analyysit. Koko lahjoitusrekisteri on erillinen aineisto.", href: "https://osf.io/2973t/", access: "Julkiset tutkimustiedostot ja aggregaatit" },
      { title: "Hormonit, kumppanit ja motivaatio", description: "NSHAP yhdistää iäkkäiden hormonimittaukset, aloitteisuuden ja vastaanottavuuden, kumppanit ja verkostot. Tutkimusväestö määrittelee päätelmän alueen.", href: "https://www.icpsr.umich.edu/web/NACDA/studies/20541/summary", access: "Julkisia ja erikseen rajattuja tiedostoja" },
    ],
    links: [
      { href: "/evidence", title: "Näyttörekisteri", description: "Selaa nykyistä näyttöluetteloa ja tutkimusten yhteyksiä." },
      { href: "/references", title: "Primäärilähteet", description: "Julkaisutiedot ja niiden yhteydet sivuston väitteisiin." },
      { href: "/epistemology", title: "Miten päättely toimii", description: "Premissit, johtaminen, synteesi ja näytön tulkitseminen." },
      { href: "/predictions", title: "Ennusteet", description: "Seuraa mallin johtopäätöksiä yksilöityihin tuloksiin." },
      { href: "/measurement/fieldstate", title: "Mittaus ja estimointi", description: "Ketjun alkupään tilaa kuvaava fysikaalinen havaintoreitti." },
      { href: "/evidence/ecology", title: "Lajienväliset yhteydet", description: "Rinnakkainen ekologinen haara ja sen nykyinen tutkimusnäyttö." },
    ],
    next: { href: "/model", title: "Lue koko malli järjestyksessä", description: "Aloita premisseistä ja seuraa yhdistyvää selitystä fysiikan, biologian ja käyttäytymisen kautta sivilisaatioon." },
  },
  ja: {}, fr: {}, ko: {},
} as const;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const d = pickCopy(COPY, locale) as typeof COPY.en;
  return { title: `${d.title} – Extinction Field`, description: d.subtitle };
}

export default async function ConvergencePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const d = pickCopy(COPY, locale) as typeof COPY.en;
  const p = (text: string) => <ExplanationText locale={locale}>{text}</ExplanationText>;
  return <ExplanationHub locale={locale} copy={COPY} {...d} icon={GitMerge} stage="convergence">
    <ExplanationSection {...d.contents[0]}>{p(d.orderLead)}
      <div className="grid gap-4">{d.axes.map((axis) => <div key={axis.title} className="border-l-2 border-accent/40 pl-4"><h3 className="mb-2 text-base font-semibold">{axis.title}</h3>{p(axis.text)}</div>)}</div>
      {p(d.gate)}<Link href={`/${locale}/physics`} className="inline-block text-sm text-accent hover:underline">{d.physicsLink}</Link>
    </ExplanationSection>
    <SteroidogenesisIntegrationPanel locale={locale} focus="overview" />
    {d.chains.map((chain) => <ExplanationSection key={chain.id} id={chain.id} title={chain.title}>
      <ol className="grid gap-3 rounded-lg bg-accent/5 p-4 sm:grid-cols-3 sm:p-5">
        {[{ label: d.inputLabel, value: chain.input }, { label: d.interfaceLabel, value: chain.interface }, { label: d.outputLabel, value: chain.output }].map((item, i) => <li key={item.label} className="relative min-w-0"><p className="mb-2 flex items-center gap-2 text-[0.65rem] font-semibold uppercase tracking-wider text-accent">{i > 0 && <ArrowRight size={11} aria-hidden="true" />}{item.label}</p><p className="text-sm font-medium leading-6">{item.value}</p></li>)}
      </ol>
      {p(chain.text)}<ResearchConnection locale={locale} studies={chain.studies} implication={chain.implication} />
    </ExplanationSection>)}
    <ExplanationSection {...d.contents[8]}><p className="text-lg font-medium leading-8"><ClaimRef claimId="claim.behavior.biological-state-to-action">{d.parsimonyClaim}</ClaimRef></p>{p(d.parsimony)}<MathBlock tex={String.raw`\Delta\mathbf Y=J\Delta\mathbf S+\epsilon,\qquad\operatorname{rank}(J\Sigma_SJ^{\mathsf T})\leq k`} />{p(d.parsimonyMeaning)}</ExplanationSection>
    <ExplanationSection {...d.contents[9]}>{p(d.dataLead)}<div className="grid gap-4 sm:grid-cols-2">{d.datasets.map((dataset) => <a key={dataset.href} href={dataset.href} className="block rounded-lg border border-card-border p-5 transition-colors hover:border-accent/60 hover:bg-accent/5 focus-visible:outline-2 focus-visible:outline-accent"><h3 className="mb-2 text-base font-semibold">{dataset.title}</h3><p className="mb-4 text-sm leading-6 text-foreground-muted">{dataset.description}</p><p className="text-xs font-medium leading-5 text-accent">{dataset.access}</p></a>)}</div></ExplanationSection>
  <CombinedExposurePanel locale={locale} focus="model" />
      </ExplanationHub>;
}
