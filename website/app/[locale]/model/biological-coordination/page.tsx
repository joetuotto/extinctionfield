import type { Metadata } from "next";
import { InterventionExplorer } from "@/components/InterventionExplorer";
import Link from "next/link";
import { Activity } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { TranslationNotice } from "@/components/TranslationNotice";
import { MathBlock } from "@/components/MathBlock";
import { InlineReferenceText } from "@/components/InlineReferenceText";
import { ClaimRef } from "@/components/ClaimRef";
import { BiologicalCoordinationExplorer } from "@/components/BiologicalCoordinationExplorer";
import { ConditionalScenarioExplorer } from "@/components/ConditionalScenarioExplorer";
import { pickCopy } from "@/lib/i18n";

const COPY = {
  en: {
    title: "Biological Coordination",
    subtitle: "How receptor state, tissue timing and biological memory connect a physical input to functional gates and population outcomes.",
    back: "← Model overview",
    lead: "A biological signal has to meet a receptive structure at the right time. BERM develops this principle into one continuous route: physical structure → receptor response → chemical and tissue memory → endocrine coordination → functional success → encounters and population distributions.",
    bridgeTitle: "The geometric starting point and the biological bridge",
    bridge: "Start from [[ref:lindgren2025|Lindgren’s 2025]] ansatz, gμν = ημν + κAμAν. Splitting A into a background Ab and an external component a gives the tensor identity below. BERM then names a state-dependent receiving operator K: it connects the geometric perturbation to receptor activity z, with receptor state S carrying orientation, cofactors, redox, biological phase and recovery history. This biological coupling is an explicit model assumption; the studies below anchor its candidate implementations and downstream transitions in their own experimental systems. FieldState contributes observations for estimating the upstream physical state.",
    bridgeLink: "Follow the tensor derivation →",
    stateTitle: "1. A receiving state that changes with physiology",
    stateClaim: "Receptor orientation, internal chemistry, endocrine state and timing are separately describable inputs to the response.",
    stateText: "In a chemical compass experiment, rotating an optically selected molecular ensemble rotated its magnetic response pattern; isotope substitution changed the response through internal chemistry. The CPF model-molecule experiment was performed at 120 K. In mouse fibroblasts, a defined tNMR protocol produced different clock responses depending on application time and glucocorticoid pretreatment. These interventions identify variables that a receiving operator can represent. [[ref:kerpal2019_chemical_compass|Kerpal 2019]]; [[ref:thoeni2024_tnmr_clock|Thoeni 2024]].",
    stateSign: "The response sign depends on the starting state. In the hypomagnetic mouse experiment, a ROS-raising intervention improved neurogenesis under hypomagnetic conditions and impaired it under the geomagnetic control ([[ref:zhang2021|Zhang 2021]]). RF preconditioning also protected cells from a later chemical challenge, with autophagy interventions removing that protection ([[ref:sannino2024|Sannino 2024]]; [[ref:sannino2022_autophagy_adaptive|Sannino 2022]]). BERM therefore separates receiving state s, repair A, damage D and functional capacity C and compares their time courses.",
    cryTitle: "2. CRY connects clock state directly to hormone response",
    cryClaim: "Cryptochromes participate directly in glucocorticoid-receptor transcriptional regulation and hepatic glucagon–cAMP signalling.",
    cryText: "CRY1 and CRY2 interact with the glucocorticoid receptor, while hepatic cryptochromes suppress glucagon-linked G-protein/cAMP signalling. These links extend the existing nutritional CRY pathway: cofactors, AMPK-mediated turnover and membrane state can feed into hormone responsiveness and metabolism. The BERM synthesis closes a feedback loop in which endocrine state changes reception and clock activity changes subsequent endocrine response. [[ref:lamia2011_cry_glucocorticoid|Lamia 2011]]; [[ref:zhang2010_cry_camp|Zhang 2010]].",
    memoryTitle: "3. Fast selection can leave a slow molecular trace",
    memoryClaim: "Successive stages can carry biological memory on different timescales: reaction selection, chemical populations, protein conformation and tissue state.",
    memoryText: "RF control of photo-generated radical-pair chemistry in algal CraCry and engineered iLOV proteins linked fast spin processes to slower chemical-state accumulation under laboratory protocols. Earlier work showed chemical amplification of magnetic effects. A 2026 Cry4a preprint connects redox state to an allosteric protein conformation. These studies supply different parts of the sequence rather than one combined experiment. [[ref:meng2026_spin_memory|Meng 2026]]; [[ref:kattnig2016_chemical_amplification|Kattnig 2016]]; [[ref:kish2026_cry4a_allostery|Kish 2026, preprint]].",
    memoryText2: "At a longer timescale, transient bioelectric intervention in planarians altered subsequent regeneration, illustrating tissue-state memory. In humans, millisecond light flashes delivered at particular intervals shifted the circadian clock efficiently. BERM represents accumulation and recovery explicitly while retaining the receptor, field protocol and timescale of each component experiment. [[ref:durant2017_bioelectric_memory|Durant 2017]]; [[ref:najjar2016_light_flashes|Najjar & Zeitzer 2016]].",
    timingTitle: "4. Hormonal function depends on signal–tissue timing",
    redoxClaim: "Redox and electrical clock activity form a biological connection through ion-channel regulation.",
    redoxText: "Redox state modulates suprachiasmatic neuronal excitability through potassium channels. This provides a route from chemical state into clock timing and, through rhythmic endocrine outputs and metabolism, back into chemical state. [[ref:wang2012_redox_scn|Wang 2012]].",
    timingClaim: "Hormone concentration, tissue responsiveness and their temporal overlap jointly determine a functional response.",
    timingText: "Sleep misalignment altered human blood-transcript rhythms and the temporal organisation of glucocorticoid-signalling genes while the circulating cortisol rhythm persisted. Archer 2014 and the 2022 reanalysis share a dataset family. Pulsatile glucocorticoid experiments give a complementary anchor for temporal decoding at the receptor and gene-response level. [[ref:archer2014_transcriptome|Archer 2014]]; [[ref:archer2022_glucocorticoid_timing|Archer 2022]]; [[ref:stavreva2009_hormone_pulses|Stavreva 2009]].",
    timingEquation: "For illustrative sinusoidal hormone H and receptivity S, their mean product depends on phase even when both individual means remain fixed. H₀ and S₀ are means; h and s are oscillation amplitudes.",
    multiClaim: "Different environmental inputs can shift different tissue rhythms by different amounts.",
    multiText: "Delayed meals shifted glucose and adipose PER2 rhythms differently while melatonin and cortisol timing remained similar. A simulated night-work experiment showed that maintaining daytime eating preserved glucose tolerance. BERM consequently describes appropriate phase relations across organs and treats nutrition as both a chemical input and a timing input. [[ref:wehrens2017_meal_timing|Wehrens 2017]]; [[ref:chellappa2021_daytime_eating|Chellappa 2021]].",
    gatesTitle: "5. Local reproductive gates become a waiting-time distribution",
    gatesClaim: "Successful reproduction depends on functional transitions with distinct local requirements.",
    gatesText: "Human CatSper deficiency can impair sperm hyperactivation and fertilisation despite normal routine semen parameters. In a mouse steroidogenic-cell clock-gene deletion, ovulation persisted while implantation was strongly impaired; progesterone and ovarian transplantation located the affected functional gate. BERM composes such stages through conditional probabilities so a shared mechanism is counted once. [[ref:catsper2024|Young 2024]]; [[ref:liu2014|Liu 2014]].",
    waitingClaim: "Individual differences in per-cycle success affect the long waiting-time tail and the opportunity to progress to a subsequent birth.",
    waitingText: "Among couples still waiting, the distribution progressively concentrates on lower success probabilities under a stable heterogeneous-probability model. European analyses link waiting at least a year to smaller realised family size; this anchors the next transition from prolonged waiting to parity progression. BERM can therefore carry a biological state distribution through waiting time and age to realised births. The explorer illustrates the distributional mathematics with explicitly chosen inputs. [[ref:gnoth2003_time_to_pregnancy|Gnoth 2003]]; [[ref:joffe2009_ttp_family_size|Joffe 2009]].",
    encounterTitle: "6. Successful encounters connect biology to networks",
    encounterClaim: "Encounter frequency, functional success and temporal overlap jointly determine the flow of successful interactions; feedback changes the subsequent network.",
    encounterText: "A pollinator-removal experiment changed the behaviour of the remaining pollinators and reduced seed production. Human sleep-loss experiments changed social approach and willingness to help, while cooperation experiments show that one participant’s behaviour can influence subsequent partners. These are separate empirical anchors for encounter quality and network propagation. [[ref:brosi2013_pollination_network|Brosi & Briggs 2013]]; [[ref:bensimon2018_sleep_social|Ben Simon & Walker 2018]]; [[ref:bensimon2022_sleep_helping|Ben Simon 2022]]; [[ref:fowler2010_cooperation_cascades|Fowler & Christakis 2010]].",
    encounterText2: "The computational continuation keeps direct biological change and network propagation separate: δb(t+1)=u(t)+βWδb(t), with node order, time step and measured outcome declared. Institution renewal uses I_next=rI+αΣw_i actions_i−withdrawal. Signed behavioral deviations need an explicit baseline-to-action mapping before entering that stock. Ecological encounters use Δt·k_ij·m_ij(state)·n_i·n_j, followed by signed consequences for both species and their own birth/death rates. All species and social coefficients remain supplied assumptions until endpoint calibration; stored capacity and feedback give the aggregate its own time constants.",
    structureTitle: "7. Multiple sources meet a spatially selective receiver",
    structureClaim: "Lindgren’s cross terms preserve relationships between sources; a biological response requires their explicit contraction through a receiving operator.",
    structureText: "Oscillating components produce sum- and difference-frequency terms in the tensor expansion. An independent implementation example comes from temporal-interference stimulation: two electrode fields at 2,000 and 2,005 Hz produced a 5 Hz envelope, and changing their current ratio changed hippocampal targeting. This anchors spatial targeting in that stimulation setting. Its relationship to BERM geometry is carried by the named biological bridge. [[ref:violante2023_temporal_interference|Violante 2023]].",
    datasetsTitle: "Existing data for the next measurements",
    datasetsLead: "These resources provide measured component behaviour. Their variables can constrain the corresponding biological or spatial operators in the model.",
    datasets: [
      { title: "Human transcript timing", description: "GSE48113: blood expression time series before and after sleep–circadian misalignment. Estimate clock, redox and receptor-network phase relations.", href: "https://www.ncbi.nlm.nih.gov/geo/query/acc.cgi?acc=GSE48113" },
      { title: "Protein spin and chemical memory", description: "Meng 2026 data: analyse the measured protein response within the laboratory field, illumination and chemical protocols.", href: "https://zenodo.org/records/19829558" },
      { title: "Spatial stimulation maps", description: "NeuroVault 11908: group-level hippocampal imaging maps across task and stimulation conditions.", href: "https://neurovault.org/collections/11908/" },
    ],
    connections: "Continue through the connected mechanisms",
    links: ["Nutrition and CRY", "Circadian evidence", "The reproductive arc", "Dual-kernel memory", "Biology and civilization"],
  },
  fi: {
    title: "Biologinen koordinaatio",
    subtitle: "Miten vastaanottajatila, kudosten ajoitus ja biologinen muisti yhdistävät fysikaalisen syötteen toiminnallisiin portteihin ja populaatiotuloksiin.",
    back: "← Mallin yleiskatsaus",
    lead: "Biologisen signaalin on kohdattava vastaanottava rakenne oikeaan aikaan. BERM kehittää tästä yhtenäisen reitin: fysikaalinen rakenne → reseptorivaste → kemiallinen ja kudosmuisti → hormonitoiminnan koordinaatio → toiminnallinen onnistuminen → kohtaamiset ja populaatiojakaumat.",
    bridgeTitle: "Geometrinen lähtökohta ja biologinen silta",
    bridge: "Lähtökohtana on [[ref:lindgren2025|Lindgrenin vuoden 2025]] ansatz gμν = ημν + κAμAν. Kun A jaetaan taustaan Ab ja ulkoiseen osaan a, saadaan alla oleva tensorinen identiteetti. BERM nimeää tämän jälkeen tilariippuvaisen vastaanotto-operaattorin K: se yhdistää geometrisen muutoksen reseptoritoimintaan z. Vastaanottajatila S sisältää orientaation, kofaktorit, redox-tilan, biologisen vaiheen ja palautumishistorian. Biologinen kytkentä on eksplisiittinen mallioletus; alla olevat tutkimukset ankkuroivat sen toteutusehdokkaita ja myöhempiä siirtymiä omissa koejärjestelmissään. FieldState tuottaa havaintoja ketjun alkupään fysikaalisen tilan arviointiin.",
    bridgeLink: "Tutustu tensorijohtoon →",
    stateTitle: "1. Fysiologian mukana muuttuva vastaanottajatila",
    stateClaim: "Vastaanottimen orientaatio, sisäinen kemia, hormonitila ja ajoitus ovat erikseen kuvattavia vasteen syötteitä.",
    stateText: "Kemiallisessa kompassikokeessa optisesti valitun molekyylijoukon kierto siirsi sen magneettista vastekuviota; isotooppimuutos puolestaan muutti vastetta sisäisen kemian kautta. CPF-mallimolekyylien koe tehtiin 120 kelvinissä. Hiiren fibroblastien määritellyssä tNMR-protokollassa kellovaste riippui käsittelyn ajoituksesta ja glukokortikoidiesikäsittelystä. Interventiot nimeävät muuttujia vastaanotto-operaattorille. [[ref:kerpal2019_chemical_compass|Kerpal 2019]]; [[ref:thoeni2024_tnmr_clock|Thoeni 2024]].",
    stateSign: "Vasteen suunta riippuu lähtötilasta. Hypomagneettisessa hiirikokeessa ROS:ää lisäävä interventio paransi neurogeneesiä hypomagneettisissa oloissa ja heikensi sitä geomagneettisessa verrokissa ([[ref:zhang2021|Zhang 2021]]). RF-esikäsittely myös suojasi soluja myöhemmältä kemialliselta haasteelta, ja autofagiainterventiot poistivat suojan ([[ref:sannino2024|Sannino 2024]]; [[ref:sannino2022_autophagy_adaptive|Sannino 2022]]). BERM erottaa siksi vastaanotintilan s, korjauksen A, vaurion D ja toimintakyvyn C ja vertaa niiden aikakulkuja.",
    cryTitle: "2. CRY yhdistää kellotilan suoraan hormonivasteeseen",
    cryClaim: "Kryptokromit osallistuvat suoraan glukokortikoidireseptorin geenivasteen ja maksan glukagoni–cAMP-signaloinnin säätelyyn.",
    cryText: "CRY1 ja CRY2 vuorovaikuttavat glukokortikoidireseptorin kanssa, ja maksan kryptokromit vaimentavat glukagonin G-proteiini–cAMP-signalointia. Yhteydet jatkavat nykyistä ravitsemuksellista CRY-reittiä: kofaktorit, AMPK:n säätelemä vaihtuvuus ja kalvotila voivat liittyä hormonivasteeseen ja aineenvaihduntaan. BERM-synteesi sulkee palautesilmukan, jossa hormonitila muuttaa vastaanottoa ja kellotoiminta myöhempää hormonivastetta. [[ref:lamia2011_cry_glucocorticoid|Lamia 2011]]; [[ref:zhang2010_cry_camp|Zhang 2010]].",
    memoryTitle: "3. Nopea valinta voi jättää hitaan molekyylijäljen",
    memoryClaim: "Peräkkäiset vaiheet voivat kantaa biologista muistia eri aikaskaaloilla: reaktiovalinta, kemialliset jakaumat, proteiinin rakenne ja kudostila.",
    memoryText: "Valolla tuotetun radikaaliparikemian RF-ohjaus levän CraCry- ja muokatuissa iLOV-proteiineissa yhdisti nopeat spin-prosessit hitaampaan kemiallisten tilojen kertymiseen laboratorioprotokollissa. Aiempi tutkimus osoitti magneettisten vaikutusten kemiallista vahvistumista. Vuoden 2026 Cry4a-esijulkaisu yhdistää redox-tilan proteiinin allosteriseen rakenteeseen. Tutkimukset kuvaavat ketjun eri osia omissa kokeissaan. [[ref:meng2026_spin_memory|Meng 2026]]; [[ref:kattnig2016_chemical_amplification|Kattnig 2016]]; [[ref:kish2026_cry4a_allostery|Kish 2026, esijulkaisu]].",
    memoryText2: "Pidemmällä aikaskaalalla lyhyt bioelektrinen käsittely muutti laakamatojen myöhempää regeneroitumista ja havainnollisti kudostilan muistia. Ihmisellä tietyin aikavälein annetut millisekuntien valovälähdykset siirsivät tehokkaasti vuorokausikelloa. BERM kuvaa kertymisen ja palautumisen eksplisiittisesti ja säilyttää kunkin osakokeen vastaanottimen, kenttäprotokollan ja aikaskaalan. [[ref:durant2017_bioelectric_memory|Durant 2017]]; [[ref:najjar2016_light_flashes|Najjar ja Zeitzer 2016]].",
    timingTitle: "4. Hormonitoiminta riippuu signaalin ja kudoksen ajoituksesta",
    redoxClaim: "Redox-tila ja keskuskellon sähköinen toiminta liittyvät toisiinsa ionikanavien säätelyn kautta.",
    redoxText: "Redox-tila säätelee keskuskellon hermosolujen sähköistä herkkyyttä kaliumkanavien kautta. Tämä tarjoaa reitin kemiallisesta tilasta kellon ajoitukseen ja rytmisen hormonitoiminnan sekä aineenvaihdunnan kautta takaisin kemialliseen tilaan. [[ref:wang2012_redox_scn|Wang 2012]].",
    timingClaim: "Hormonipitoisuus, kudoksen vastaanottavuus ja niiden ajallinen päällekkäisyys määräävät yhdessä toiminnallista vastetta.",
    timingText: "Unen ajoituksen erkaantuminen sisäisestä kellosta muutti ihmisen veren transkriptien rytmejä ja glukokortikoidisignaloinnin geenien ajallista rakennetta veren kortisolirytmin säilyessä. Archerin vuoden 2014 tutkimus ja vuoden 2022 uudelleenanalyysi ovat samaa aineistoperhettä. Pulssittaisen glukokortikoidisignaalin kokeet ankkuroivat lisäksi ajoituksen tulkintaa reseptorin ja geenivasteen tasolla. [[ref:archer2014_transcriptome|Archer 2014]]; [[ref:archer2022_glucocorticoid_timing|Archer 2022]]; [[ref:stavreva2009_hormone_pulses|Stavreva 2009]].",
    timingEquation: "Havainnollistavien sinimuotoisten hormonin H ja vastaanottavuuden S tulon keskiarvo riippuu vaihe-erosta, vaikka kummankin oma keskiarvo säilyy. H₀ ja S₀ ovat keskiarvoja, h ja s värähtelyjen amplitudeja.",
    multiClaim: "Eri ympäristösyötteet voivat siirtää eri kudosten rytmejä eri verran.",
    multiText: "Aterioiden viivästys siirsi glukoosin ja rasvakudoksen PER2:n rytmejä eri verran melatoniinin ja kortisolin ajoituksen säilyessä samankaltaisena. Simuloidun yötyön kokeessa päiväaikaan rajattu ruokailu säilytti glukoosinsiedon. BERM kuvaa siksi elinten tarkoituksenmukaisia vaihe-eroja ja käsittelee ravitsemusta sekä kemiallisena että ajallisena syötteenä. [[ref:wehrens2017_meal_timing|Wehrens 2017]]; [[ref:chellappa2021_daytime_eating|Chellappa 2021]].",
    gatesTitle: "5. Paikallisista lisääntymisporteista odotusaikajakaumaan",
    gatesClaim: "Lisääntymisen onnistuminen riippuu toiminnallisista siirtymistä, joilla on omat paikalliset edellytyksensä.",
    gatesText: "Ihmisen CatSper-puute voi estää siittiön hyperaktivaatiota ja hedelmöitystä tavanomaisten siemennesteparametrien näyttäessä normaaleilta. Hiiren steroidogeenisten solujen kellogeenipoistossa ovulaatio säilyi mutta implantaatio heikkeni voimakkaasti; progesteroni ja munasarjasiirrot paikansivat toiminnallisen portin. BERM yhdistää vaiheet ehdollisin todennäköisyyksin, jolloin yhteinen mekanismi lasketaan kerran. [[ref:catsper2024|Young 2024]]; [[ref:liu2014|Liu 2014]].",
    waitingClaim: "Kiertokohtaisen onnistumisen yksilöerot vaikuttavat pitkän odotusajan häntään ja mahdollisuuteen saada seuraava lapsi.",
    waitingText: "Pysyvien erisuurten onnistumistodennäköisyyksien mallissa yhä odottavien parien joukko painottuu vähitellen pienempiin todennäköisyyksiin. Eurooppalaisissa analyyseissä vähintään vuoden raskausodotus liittyi pienempään toteutuneeseen perhekokoon. Se ankkuroi seuraavan siirtymän pitkästä odotuksesta lapsiluvun kasvuun. BERM voi näin kuljettaa biologisen tilajakauman odotusajan ja iän kautta toteutuneisiin syntymiin. Tarkastelutyökalu havainnollistaa jakaumamatematiikkaa erikseen valituilla syötteillä. [[ref:gnoth2003_time_to_pregnancy|Gnoth 2003]]; [[ref:joffe2009_ttp_family_size|Joffe 2009]].",
    encounterTitle: "6. Onnistuvat kohtaamiset yhdistävät biologian verkostoihin",
    encounterClaim: "Kohtaamistiheys, toiminnallinen onnistuminen ja ajallinen päällekkäisyys määräävät yhdessä onnistuvien vuorovaikutusten virtaa; palaute muuttaa verkoston myöhempää toimintaa.",
    encounterText: "Pölyttäjän poistokoe muutti jäljelle jäävien pölyttäjien käyttäytymistä ja vähensi siementuottoa. Ihmisen univajekokeet muuttivat sosiaalista lähestymistä ja auttamishalua; yhteistyökokeissa yhden osallistujan toiminta vaikutti myöhempiin kumppaneihin. Nämä ovat erillisiä koeankkureita kohtaamisten laadulle ja verkostovälitykselle. [[ref:brosi2013_pollination_network|Brosi ja Briggs 2013]]; [[ref:bensimon2018_sleep_social|Ben Simon ja Walker 2018]]; [[ref:bensimon2022_sleep_helping|Ben Simon 2022]]; [[ref:fowler2010_cooperation_cascades|Fowler ja Christakis 2010]].",
    encounterText2: "Laskennallinen jatko erottaa suoran biologisen muutoksen verkostovälityksestä: δb(t+1)=u(t)+βWδb(t), kun solmujärjestys, aika-askel ja mitattu päätepiste on määritelty. Instituution uusintaminen käyttää muotoa I_seuraava=rI+αΣw_i teot_i−poistuma. Etumerkillinen käyttäytymispoikkeama tarvitsee eksplisiittisen lähtötasosta tekoihin kulkevan kuvauksen ennen varantoon vientiä. Ekologiset kohtaamiset ovat Δt·k_ij·m_ij(tila)·n_i·n_j, jota seuraavat etumerkilliset seuraukset molemmille lajeille ja niiden omat syntymä-/kuolemanopeudet. Kaikki laji- ja sosiaaliset kertoimet pysyvät annettuina oletuksina päätepistekalibrointiin asti; varastoitunut kapasiteetti ja palaute antavat aggregaatille omat aikavakionsa.",
    structureTitle: "7. Useat lähteet kohtaavat paikan suhteen valikoivan vastaanottimen",
    structureClaim: "Lindgrenin ristitulot säilyttävät lähteiden väliset suhteet; biologinen vaste edellyttää niiden eksplisiittistä kontraktiota vastaanotto-operaattorin kautta.",
    structureText: "Värähtelevät komponentit tuottavat tensorilaajennukseen summa- ja erotaajuuksia. Erillinen toteutusesimerkki on ajalliseen interferenssiin perustuva stimulaatio: elektrodien 2 000 ja 2 005 hertsin kentät muodostivat 5 hertsin verhokäyrän, ja virtasuhteen muutos muutti kohdistumista hippokampukseen. Tämä ankkuroi paikkavalikoivuutta kyseisessä stimulaatioasetelmassa. Yhteys BERM-geometriaan kulkee nimetyn biologisen sillan kautta. [[ref:violante2023_temporal_interference|Violante 2023]].",
    datasetsTitle: "Olemassa olevat aineistot seuraaviin mittauksiin",
    datasetsLead: "Aineistot kuvaavat ketjun osien mitattua toimintaa. Niiden muuttujat voivat rajata mallin vastaavia biologisia tai paikallisia operaattoreita.",
    datasets: [
      { title: "Ihmisen transkriptien ajoitus", description: "GSE48113: veren geenitoiminnan aikasarjat ennen unen ja sisäisen kellon erkaantumista ja sen jälkeen. Kellon, redox- ja reseptoriverkoston vaihe-erot ovat arvioitavia suureita.", href: "https://www.ncbi.nlm.nih.gov/geo/query/acc.cgi?acc=GSE48113" },
      { title: "Proteiinin spin- ja kemiallinen muisti", description: "Mengin vuoden 2026 aineisto: proteiinivastetta voidaan tarkastella mitatuissa kenttä-, valaistus- ja kemiallisissa laboratorioprotokollissa.", href: "https://zenodo.org/records/19829558" },
      { title: "Stimulaation paikkakartat", description: "NeuroVault 11908: hippokampuksen ryhmätason kuvantamiskartat eri tehtävä- ja stimulaatiotilanteissa.", href: "https://neurovault.org/collections/11908/" },
    ],
    connections: "Jatka yhdistettyihin mekanismeihin",
    links: ["Ravitsemus ja CRY", "Vuorokausirytmien evidenssi", "Lisääntymiskaari", "Kaksoisytimen muisti", "Biologia ja sivilisaatio"],
  },
  ja: {}, fr: {}, ko: {},
} as const;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const d = pickCopy(COPY, locale) as typeof COPY.en;
  return { title: `${d.title} – Extinction Field`, description: d.subtitle };
}

export default async function BiologicalCoordinationPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const d = pickCopy(COPY, locale) as typeof COPY.en;
  const paragraph = (text: string) => <p className="text-sm leading-relaxed text-foreground-muted"><InlineReferenceText text={text} locale={locale} /></p>;
  const sectionClass = "scroll-mt-24 space-y-4 border-t editorial-rule pt-7";
  return (
    <article>
      <TranslationNotice copy={COPY} locale={locale} />
      <div className="mx-auto max-w-5xl px-6 py-12 sm:py-16">
        <Link href={`/${locale}/model`} className="mb-6 inline-block text-sm text-accent hover:underline">{d.back}</Link>
        <PageHeader icon={Activity} title={d.title} subtitle={d.subtitle} />
        <p className="mb-10 max-w-3xl text-lg leading-relaxed">{d.lead}</p>
        <div className="space-y-12">
          <section className={sectionClass} id="geometric-bridge">
            <h2 className="editorial-section-heading">{d.bridgeTitle}</h2>
            {paragraph(d.bridge)}
            <MathBlock tex={String.raw`\delta g_{\mu\nu}=\kappa\left(A_{b,\mu}a_\nu+a_\mu A_{b,\nu}+a_\mu a_\nu\right)`} />
            <MathBlock tex={String.raw`z_r(t)=\int_0^\infty K_r^{\mu\nu}(\tau;S_r(t))\,\delta g_{\mu\nu}(t-\tau)\,d\tau`} />
            <Link href={`/${locale}/model/tensor-derivation`} className="inline-block text-sm text-accent hover:underline">{d.bridgeLink}</Link>
          </section>
          <section className={sectionClass} id="receptor-state">
            <h2 className="editorial-section-heading">{d.stateTitle}</h2>
            <p className="text-base font-medium leading-relaxed"><ClaimRef claimId="claim.receptor.state-dependent-response">{d.stateClaim}</ClaimRef></p>
            {paragraph(d.stateText)}{paragraph(d.stateSign)}
          </section>
          <section className={sectionClass} id="cry-endocrine">
            <h2 className="editorial-section-heading">{d.cryTitle}</h2>
            <p className="text-base font-medium leading-relaxed"><ClaimRef claimId="claim.cry.endocrine-gating">{d.cryClaim}</ClaimRef></p>{paragraph(d.cryText)}
          </section>
          <section className={sectionClass} id="biological-memory">
            <h2 className="editorial-section-heading">{d.memoryTitle}</h2>
            <p className="text-base font-medium leading-relaxed"><ClaimRef claimId="claim.receptor.chemical-memory">{d.memoryClaim}</ClaimRef></p>
            {paragraph(d.memoryText)}{paragraph(d.memoryText2)}
          </section>
          <section className={sectionClass} id="tissue-timing">
            <h2 className="editorial-section-heading">{d.timingTitle}</h2>
            <p className="text-base font-medium leading-relaxed"><ClaimRef claimId="claim.coordination.redox-clock">{d.redoxClaim}</ClaimRef></p>{paragraph(d.redoxText)}
            <p className="text-base font-medium leading-relaxed"><ClaimRef claimId="claim.coordination.hormone-target-timing">{d.timingClaim}</ClaimRef></p>{paragraph(d.timingText)}
            <MathBlock tex={String.raw`\langle H S\rangle=H_0S_0+\frac{hs}{2}\cos\Delta\phi`} />
            {paragraph(d.timingEquation)}
            <p className="text-base font-medium leading-relaxed"><ClaimRef claimId="claim.coordination.multiple-zeitgebers">{d.multiClaim}</ClaimRef></p>{paragraph(d.multiText)}
          </section>
          <InterventionExplorer locale={locale} />
          <BiologicalCoordinationExplorer locale={locale} />
          <ConditionalScenarioExplorer locale={locale} />
          <section className={sectionClass} id="functional-gates">
            <h2 className="editorial-section-heading">{d.gatesTitle}</h2>
            <p className="text-base font-medium leading-relaxed"><ClaimRef claimId="claim.reproduction.local-clock-gates">{d.gatesClaim}</ClaimRef></p>{paragraph(d.gatesText)}
            <p className="text-base font-medium leading-relaxed"><ClaimRef claimId="claim.couple.waiting-time-distribution">{d.waitingClaim}</ClaimRef></p>{paragraph(d.waitingText)}
          </section>
          <section className={sectionClass} id="successful-encounters">
            <h2 className="editorial-section-heading">{d.encounterTitle}</h2>
            <p className="text-base font-medium leading-relaxed"><ClaimRef claimId="claim.encounter.network-propagation">{d.encounterClaim}</ClaimRef></p>
            {paragraph(d.encounterText)}{paragraph(d.encounterText2)}
          </section>
          <section className={sectionClass} id="source-relationships">
            <h2 className="editorial-section-heading">{d.structureTitle}</h2>
            <p className="text-base font-medium leading-relaxed"><ClaimRef claimId="claim.geometry.multisource-receptor-coupling">{d.structureClaim}</ClaimRef></p>{paragraph(d.structureText)}
          </section>
          <section className={sectionClass} id="existing-data">
            <h2 className="editorial-section-heading">{d.datasetsTitle}</h2>
            {paragraph(d.datasetsLead)}
            <div className="grid gap-4 sm:grid-cols-3">
              {d.datasets.map((dataset) => <a key={dataset.href} href={dataset.href} target="_blank" rel="noopener noreferrer" className="rounded-lg border border-card-border p-4 transition-colors hover:border-accent/60">
                <h3 className="mb-2 text-sm font-semibold text-accent">{dataset.title} ↗</h3>
                <p className="text-xs leading-relaxed text-foreground-muted">{dataset.description}</p>
              </a>)}
            </div>
          </section>
          <nav aria-label={d.connections} className="border-t editorial-rule pt-7">
            <h2 className="editorial-section-heading mb-4">{d.connections}</h2>
            <div className="flex flex-wrap gap-x-6 gap-y-3">
              {["/evidence/nutrition", "/evidence/circadian", "/evidence/reproductive-arc", "/model/dual-kernel", "/civilization"].map((href, index) => <Link key={href} href={`/${locale}${href}`} className="text-sm text-accent hover:underline">{d.links[index]} →</Link>)}
            </div>
          </nav>
        </div>
      </div>
    </article>
  );
}
