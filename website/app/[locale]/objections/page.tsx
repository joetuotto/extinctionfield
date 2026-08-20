import type { Metadata } from "next";
import { ShieldQuestion } from "lucide-react";
import type { Locale } from "@/lib/i18n";
import { PageHeader } from "@/components/PageHeader";
import { FindingCard } from "@/components/FindingCard";
import {
  CLASSIFICATION_SUMMARY,
  CLASSIFICATION_VERSION,
  findingsInGroup,
} from "@/lib/findingsClassification";

type Objection = { question: string; response: readonly string[]; boundary: string };
type DiscriminatingTest = {
  id: string;
  name: string;
  berm: string;
  consensus: string;
  protocol: string;
  cost: string;
};
type VersionRow = { version: string; mechanism: string; status: string; why: string };
type Copy = {
  title: string;
  subtitle: string;
  introduction: string;
  summaryLabel: string;
  activeTitle: string;
  activeLead: string;
  reclassifiedTitle: string;
  reclassifiedLead: string;
  refinementTitle: string;
  refinementLead: string;
  testsTitle: string;
  testsLead: string;
  tests: readonly DiscriminatingTest[];
  historyTitle: string;
  historyHeaders: readonly [string, string, string, string];
  history: readonly VersionRow[];
  questionsTitle: string;
  objections: readonly Objection[];
  closingTitle: string;
  closingText: string;
};

const t: Record<Locale, Copy> = {
  en: {
    title: "Criticism and open problems",
    subtitle:
      "Every identified negative finding, open problem and falsified earlier version — and what each one actually bears on.",
    introduction:
      "BERM FieldState–ASFR-v2 treats openness as an epistemological principle. The classification below applies the BERM reasoning protocol (v1.0) to findings previously read as negative. Reclassification does not mean a finding supports BERM: it means the original test was not discriminating, or did not address the target it was taken to address. The primary branch (pathway C / RPM / cohort effect) remains empirically untested by discriminating tests.",
    summaryLabel: "REVIEW OF NEGATIVE FINDINGS",
    activeTitle: "Active problems (remain negative)",
    activeLead:
      "These stand. Two are falsified mechanisms from BERM v6–v9, one is a mathematical obstruction in the soliton layer, one is a documentation-integrity failure, and two are open theoretical problems in the Lindgren framework.",
    reclassifiedTitle: "Reclassified (do not discriminate between models)",
    reclassifiedLead:
      "Each of these was read as a falsification. Under the protocol, none of them tested a prediction that separates BERM from the consensus model — either the BERM prediction was never derived, or the test addressed a claim the model does not make.",
    refinementTitle: "Internal refinements (led to model corrections)",
    refinementLead:
      "These were genuine failures of a specific formulation, and each produced a structural correction rather than a defence.",
    testsTitle: "Discriminating tests still needed",
    testsLead:
      "None of the 13 findings tested the primary branch. These three would separate pathway C (RPM) from the consensus model. None has been carried out.",
    tests: [
      {
        id: "D1",
        name: "Directional dependence (cell level)",
        berm: "RPM response depends on the angle between B₀ and B_ext (Larmor resonance, anisotropic hyperfine).",
        consensus: "Isotropic response: power-dependent, not direction-dependent.",
        protocol: "CRY-expressing cells, controlled B₀ direction, 3 angles × 3 field levels; endpoint ROS or melatonin production.",
        cost: "~€5,000–15,000 · one cell-biology laboratory",
      },
      {
        id: "D2",
        name: "Cohort-step hypothesis (demographic)",
        berm: "Cohorts born in the 4G era (2012+) show a different ASFR profile than 2G-era cohorts, controlling for cultural variables.",
        consensus: "No cohort step by technology generation.",
        protocol: "WPP ASFR data, age-group analysis, cohort birth year vs technology generation, country fixed effects.",
        cost: "€0 (public data) · ~2 weeks · partial test now, full test 2030+",
      },
      {
        id: "D3",
        name: "Species hierarchy (spin coherence × population decline)",
        berm: "CRY spin-coherence time predicts the between-species sensitivity ordering: longer coherence → greater sensitivity → faster decline.",
        consensus: "No prediction about ordering between species.",
        protocol: "Literature synthesis of CRY coherence times × population trend data (bee, migratory bird, house sparrow, dog, human).",
        cost: "€0 (literature) · ~1 week",
      },
    ],
    historyTitle: "Version history",
    historyHeaders: ["Version", "Mechanism", "Status", "Why abandoned"],
    history: [
      { version: "BERM 6–9", mechanism: "VGCC resonance 94–183 GHz", status: "Abandoned", why: "Physically impossible: five orders of magnitude too fast for protein conformational dynamics" },
      { version: "BERM 6–9", mechanism: "Water resonance 2.45 GHz", status: "Abandoned", why: "Inverted physics: absorption is rotational damping, not amplifying resonance" },
      { version: "BERM 6–9", mechanism: "Soliton propagation", status: "Abandoned", why: "Ghost obstruction: π₂ = 0 for timelike A, ghost energy for spacelike A" },
      { version: "L-BERM", mechanism: "VGCC via pure geometry", status: "Demoted", why: "δV_m is 10¹⁷× too small without biological amplifiers" },
      { version: "BERM < v6", mechanism: "EMF explains the whole demographic transition", status: "Abandoned", why: "The pre-EMF decline is driven by the D-term (cultural demand)" },
    ],
    questionsTitle: "Research questions and evidence boundaries",
    objections: [
      {
        question: "Could demographic and social causes explain period TFR change?",
        response: [
          "Yes. Education, contraception, housing, labour markets, partnership formation, migration, policy, desired family size, tempo and ART all affect observed fertility. A period TFR is a five-year-age-group sum, not a direct assay of gametes or conception.",
          "V2 therefore models ASFR before TFR and keeps demand/opportunity, tempo and ART/live-birth delivery explicit. It does not assign their residual variation to a biological field pathway.",
        ],
        boundary: "A country trend alone cannot identify a biological cause. Population inference requires a matched FieldState, endpoint, couple and ASFR panel with credible competing models.",
      },
      {
        question: "Does Lindgren physics establish a human reproductive mechanism?",
        response: [
          "No. In v2, the Lindgren-derived formulation is a theory-level premise that motivates a background-, vector-, geometry- and spectrum-aware measurement design. It supplies neither a human receptor identity nor an EMF-to-TFR coefficient.",
          "The relevant tests are discriminating physical and biological experiments: for example a pre-specified angle, background or PSD dependence with calibrated fields and appropriate sham/thermal controls.",
        ],
        boundary: "A theoretical premise is not elevated to an empirical endpoint. Each additional link needs its own measured evidence.",
      },
      {
        question: "What do the reproductive and barrier studies actually show?",
        response: [
          "The registry includes bounded findings such as in-vitro human sperm endpoints, animal blood–testis-barrier and ovarian studies, and mechanistic redox/tight-junction work. These can motivate organ-specific states rather than a single generic biological-capacity curve.",
          "Their systems, frequencies, amplitudes, durations and endpoints differ. Animal and cell results cannot simply be converted into a population dose, fertility probability or country forecast.",
        ],
        boundary: "A study-to-node record supports the registered part of the route only. None is a direct TFR slope or a substitute for a human endpoint panel.",
      },
      {
        question: "Can mobile subscriptions or eDRX show a physical exposure pathway?",
        response: [
          "No. Mobile subscriptions can time digital-technology diffusion but are not a local field measurement, organ transfer or biological dose. The current N = 163 cohort result is reported as a descriptive technology-timing analysis.",
          "Likewise, eDRX is device reception/paging scheduling metadata, not by itself a known downlink RF field signature. Any envelope or beat feature must be measured in the actual field before it is tested biologically.",
        ],
        boundary: "Proxy timing and physical dosimetry answer different questions and must remain labelled differently.",
      },
      {
        question: "What about mixed EMF research and systematic reviews?",
        response: [
          "The evidence base is heterogeneous. Study quality, exposure characterisation, thermal control, endpoint selection and replication vary substantially. Reviews can establish that findings exist across systems, but their certainty assessments and sensitivity analyses need to be reported rather than replaced with a single headline.",
          "For example, the WHO-commissioned reproductive review reported adverse findings in several analyses while rating much of the certainty low or very low and requiring sensitivity to high-SAR studies. V2 treats that as context, not a settled population effect.",
        ],
        boundary: "The right response to uncertainty is better measurement and transparent study weighting, not a stronger narrative claim.",
      },
      {
        question: "Could chemicals, climate, disease, lifestyle or other exposures be involved?",
        response: [
          "Yes. These exposures may affect reproductive biology and may co-vary with technology, urbanisation and socioeconomic change. They are competing explanations and potential interactions, not nuisance variables that can be dismissed by a simple correlation.",
          "A useful test measures or designs around plausible co-exposures, compares alternative causal models and reports which inference changes when they are included.",
        ],
        boundary: "No single cross-country pattern establishes dominance of one environmental cause. V2 must earn any attribution through discriminating data.",
      },
      {
        question: "What would move the model from structure to a result?",
        response: [
          "A measurement-ready FieldState needs documented calibration, B₀ vector, organ transfer, PSD, circadian context, phase/coherence and provenance. It must then be joined to a pre-specified organ or couple endpoint with evidence- and parameter-linked mappings.",
          "Calibration should use a training period only, followed by an independent laboratory replication and a held-out ASFR/TFR period. Both null and non-null results should update the causal registry.",
        ],
        boundary: "Until those joins exist, v2 is a research specification and causal map, not a calibrated country forecast model.",
      },
    ],
    closingTitle: "Constructive ways to test the programme",
    closingText:
      "The most useful critiques provide a competing measurement model, a source correction, an independently replicated experiment, or a better demographic design. The project should be judged by whether its registered links survive those tests and how they compare with alternative explanations.",
  },
  fi: {
    title: "Kritiikki ja avoimet ongelmat",
    subtitle:
      "Kaikki tunnistetut negatiiviset havainnot, avoimet ongelmat ja falsifioidut aiemmat versiot — sekä se, mitä kukin niistä todella koskee.",
    introduction:
      "BERM FieldState–ASFR-v2 pitää avoimuutta epistemologisena periaatteena. Alla oleva luokittelu soveltaa BERM-päättelyprotokollaa (v1.0) aiemmin negatiivisiksi tulkittuihin havaintoihin. Uudelleenluokittelu ei tarkoita, että havainto tukisi BERM:ää — se tarkoittaa, ettei alkuperäinen testi ollut erotteleva tai kohdistui oikeaan kohteeseen. BERM:n primäärihaara (polku C / RPM / kohorttivaikutus) on edelleen empiirisesti testaamaton erottelevilla testeillä.",
    summaryLabel: "NEGATIIVISTEN HAVAINTOJEN UUDELLEENARVIOINTI",
    activeTitle: "Aktiiviset ongelmat (pysyvät negatiivisina)",
    activeLead:
      "Nämä pätevät. Kaksi on falsifioituja mekanismeja BERM v6–v9:stä, yksi on matemaattinen este solitonikerroksessa, yksi on dokumentaation eheysvirhe ja kaksi on avoimia teoreettisia ongelmia Lindgrenin kehyksessä.",
    reclassifiedTitle: "Uudelleenluokitellut (eivät erottele malleja)",
    reclassifiedLead:
      "Jokainen näistä tulkittiin falsifikaatioksi. Protokollan mukaan yksikään ei testannut ennustetta, joka erottaa BERM:n konsensusmallista — joko BERM:n ennustetta ei koskaan johdettu, tai testi kohdistui väitteeseen jota malli ei esitä.",
    refinementTitle: "Sisäiset tarkennukset (johtivat mallin parantamiseen)",
    refinementLead:
      "Nämä olivat aitoja tietyn muotoilun epäonnistumisia, ja kumpikin tuotti rakenteellisen korjauksen puolustuksen sijaan.",
    testsTitle: "Tarvittavat erottelevat testit",
    testsLead:
      "Yksikään 13 havainnosta ei testannut primäärihaaraa. Nämä kolme erottelisivat polun C (RPM) konsensusmallista. Yhtäkään ei ole suoritettu.",
    tests: [
      {
        id: "D1",
        name: "Suuntariippuvuus (solutaso)",
        berm: "RPM-vaste riippuu B₀:n ja B_ext:n välisestä kulmasta (Larmor-resonanssi, anisotrooppinen hyperfine).",
        consensus: "Isotrooppinen vaste: tehoriippuvainen, ei suuntariippuvainen.",
        protocol: "CRY-ekspressoivat solut, kontrolloitu B₀-suunta, 3 kulmaa × 3 kenttätasoa; päätepiste ROS tai melatoniinituotanto.",
        cost: "~5 000–15 000 € · yksi solubiologian laboratorio",
      },
      {
        id: "D2",
        name: "Kohorttiporrashypoteesi (demografinen)",
        berm: "4G-kaudella (2012+) syntyneet kohortit näyttävät eri ASFR-profiilin kuin 2G-kaudella syntyneet, kontrolloituna kulttuurisille muuttujille.",
        consensus: "Ei kohorttiporrasta teknologiasukupolven mukaan.",
        protocol: "WPP ASFR-data, ikäryhmittäinen analyysi, kohortin syntymävuosi vs. teknologiasukupolvi, maakohtaiset kiinteät vaikutukset.",
        cost: "0 € (julkinen data) · ~2 viikkoa · osittain testattavissa nyt, täysi testi 2030+",
      },
      {
        id: "D3",
        name: "Lajihierarkia (spin-koherenssi × populaatiolasku)",
        berm: "CRY:n spin-koherenssiaika ennustaa lajien välisen herkkyysjärjestyksen: pidempi koherenssi → suurempi herkkyys → nopeampi lasku.",
        consensus: "Ei ennustetta lajien välisestä järjestyksestä.",
        protocol: "Kirjallisuussynteesi CRY-koherenssiajoista × populaatiotrendidata (mehiläinen, muuttolintu, kotivarpunen, koira, ihminen).",
        cost: "0 € (kirjallisuusdata) · ~1 viikko",
      },
    ],
    historyTitle: "Versiohistoria",
    historyHeaders: ["Versio", "Mekanismi", "Status", "Miksi hylätty"],
    history: [
      { version: "BERM 6–9", mechanism: "VGCC-resonanssi 94–183 GHz", status: "Hylätty", why: "Fysikaalisesti mahdoton: viisi kertaluokkaa liian nopea proteiinin konformaatiodynamiikalle" },
      { version: "BERM 6–9", mechanism: "Vesiresonanssi 2,45 GHz", status: "Hylätty", why: "Käänteinen fysiikka: absorptio on rotaatiovaimennusta, ei vahvistavaa resonanssia" },
      { version: "BERM 6–9", mechanism: "Solitonipropagaatio", status: "Hylätty", why: "Ghost-obstruktio: π₂ = 0 aikakaltaiselle A:lle, ghost-energia avaruuskaltaiselle" },
      { version: "L-BERM", mechanism: "VGCC puhtaan geometrian kautta", status: "Demotoitu", why: "δV_m on 10¹⁷× liian pieni ilman biologisia vahvistimia" },
      { version: "BERM < v6", mechanism: "EMF selittää koko demografisen transition", status: "Hylätty", why: "Pre-EMF-lasku on D-termin (kulttuurinen kysyntä) ajamaa" },
    ],
    questionsTitle: "Tutkimuskysymykset ja evidenssirajat",
    objections: [
      {
        question: "Voivatko demografiset ja sosiaaliset syyt selittää periodin TFR-muutoksen?",
        response: [
          "Kyllä. Koulutus, ehkäisy, asuminen, työmarkkinat, parinmuodostus, muuttoliike, politiikka, toivottu perhekoko, tempo ja ART vaikuttavat havaittuun hedelmällisyyteen. Periodin TFR on viisivuotisikäryhmien summa, ei suora gametti- tai conception-testi.",
          "V2 mallintaa siksi ASFR:n ennen TFR:ää ja pitää kysynnän/mahdollisuuden, tempon sekä ART/live-birth-deliveryn eksplisiittisinä. Se ei kohdista niiden residuaalivaihtelua biologiseen kenttäreittiin.",
        ],
        boundary: "Maakohtainen trendi ei yksin tunnista biologista syytä. Väestöpäättely vaatii kohdistetun FieldState-, päätepiste-, pari- ja ASFR-paneelin sekä uskottavat kilpailevat mallit.",
      },
      {
        question: "Osoittaako Lindgren-fysiikka ihmisen lisääntymismekanismin?",
        response: [
          "Ei. V2:ssa Lindgrenistä johdettu muotoilu on teoriatason premissi, joka motivoi tausta-, vektori-, geometria- ja spektritietoista mittaussuunnitelmaa. Se ei anna ihmisen reseptori-identiteettiä eikä EMF → TFR -kerrointa.",
          "Relevantit testit ovat erottavia fysikaalisia ja biologisia kokeita: esimerkiksi ennalta määritelty kulma-, tausta- tai PSD-riippuvuus kalibroiduilla kentillä sekä asianmukaisilla sham-/lämpökontrolleilla.",
        ],
        boundary: "Teoreettista premissiä ei ylennetä empiiriseksi päätepisteeksi. Jokainen lisälenkki tarvitsee oman mitatun evidenssinsä.",
      },
      {
        question: "Mitä lisääntymis- ja estetutkimukset todella osoittavat?",
        response: [
          "Rekisterissä on rajattuja löydöksiä, kuten in-vitro-ihmisen siittiöpäätepisteitä, eläinmallien veri–kiveseste- ja munasarjatutkimuksia sekä mekanistista redox-/tight-junction-työtä. Ne voivat motivoida elinkohtaisia tiloja yhden geneerisen biologisen kapasiteettikäyrän sijasta.",
          "Järjestelmät, taajuudet, amplitudit, kestot ja päätepisteet eroavat. Eläin- ja solutuloksia ei voi suoraan muuntaa väestöannokseksi, hedelmällisyystodennäköisyydeksi tai maakohtaiseksi ennusteeksi.",
        ],
        boundary: "Tutkimus–solmu-tietue tukee vain rekisteröityä reitin osaa. Mikään niistä ei ole suora TFR-kulmakerroin eikä ihmisen päätepistepaneelin korvike.",
      },
      {
        question: "Voivatko mobiililiittymät tai eDRX osoittaa fysikaalisen altistusreitin?",
        response: [
          "Eivät. Mobiililiittymät voivat ajoittaa digitaaliteknologian leviämistä, mutta ne eivät ole paikallinen kenttämittaus, elinsiirto eivätkä biologinen annos. Nykyinen N = 163 -kohorttitulosta raportoidaan kuvailevana teknologia-ajoitusanalyysinä.",
          "Samoin eDRX on laitteen vastaanoton/sivutuksen ajoitusmetadataa, ei yksin tunnettu downlink-RF-kenttäallekirjoitus. Mahdollinen verhokäyrä- tai beat-piirre on mitattava todellisessa kentässä ennen biologista testiä.",
        ],
        boundary: "Proxyn ajoitus ja fysikaalinen dosimetria vastaavat eri kysymyksiin, ja ne on merkittävä eri tavoin.",
      },
      {
        question: "Entä vaihteleva EMF-kirjallisuus ja systemaattiset katsaukset?",
        response: [
          "Evidenssipohja on heterogeeninen. Tutkimuslaatu, altistuskarakterisointi, lämpökontrolli, päätepistevalinta ja replikaatio vaihtelevat huomattavasti. Katsaukset voivat osoittaa, että eri järjestelmistä on löydöksiä, mutta niiden varmuusarviot ja herkkyysanalyysit on raportoitava yhden otsikkolauseen sijaan.",
          "Esimerkiksi WHO:n tilaama lisääntymiskatsaus raportoi haitallisia löydöksiä useissa analyyseissä, mutta arvioi suuren osan varmuudesta matalaksi tai hyvin matalaksi ja edellytti herkkyyttä korkean SAR:n tutkimuksille. V2 käsittelee tätä kontekstina, ei vakiintuneena väestövaikutuksena.",
        ],
        boundary: "Oikea vastaus epävarmuuteen on parempi mittaus ja läpinäkyvä tutkimuspainotus, ei vahvempi narratiiviväite.",
      },
      {
        question: "Voivatko kemikaalit, ilmasto, sairaudet, elämäntapa tai muut altisteet olla mukana?",
        response: [
          "Kyllä. Nämä altisteet voivat vaikuttaa lisääntymisbiologiaan ja yhteisvaihdella teknologian, kaupungistumisen ja sosioekonomisen muutoksen kanssa. Ne ovat kilpailevia selityksiä ja mahdollisia yhteisvaikutuksia, eivät häiriötekijöitä, jotka voidaan sivuuttaa yksinkertaisella korrelaatiolla.",
          "Hyödyllinen testi mittaa tai suunnittelee uskottavien yhteisaltisteiden ympärille, vertailee vaihtoehtoisia kausaalimalleja ja raportoi, miten päätelmä muuttuu, kun ne sisällytetään.",
        ],
        boundary: "Yksittäinen maidenvälinen kuvio ei osoita yhden ympäristösyyn hallitsevuutta. V2:n on ansaittava attribuutio erottavalla datalla.",
      },
      {
        question: "Mikä siirtäisi mallin rakenteesta tulokseksi?",
        response: [
          "Mittausvalmis FieldState tarvitsee dokumentoidun kalibroinnin, B₀-vektorin, elinsiirron, PSD:n, vuorokausikontekstin, vaiheen/koherenssin ja provenienssin. Se on sen jälkeen yhdistettävä ennalta määriteltyyn elin- tai paripäätepisteeseen evidenssi- ja parametri-ID:hin kiinnittyvillä mappingeilla.",
          "Kalibrointi tehdään vain opetusjaksolla, jota seuraavat riippumaton laboratorioreplikaatio ja sovituksen ulkopuolelle jätetty ASFR/TFR-jakso. Sekä nolla- että ei-nollatulosten tulee päivittää kausaalirekisteriä.",
        ],
        boundary: "Kunnes nämä joinit ovat olemassa, v2 on tutkimusmäärittely ja kausaalikartta, ei kalibroitu maakohtainen ennustemalli.",
      },
    ],
    closingTitle: "Rakentavia tapoja testata tutkimusohjelmaa",
    closingText:
      "Hyödyllisimmät kritiikit tarjoavat kilpailevan mittausmallin, lähdekorjauksen, riippumattomasti replikoidun kokeen tai paremman demografisen asetelman. Projektia tulee arvioida sen mukaan, kestävätkö rekisteröidyt lenkit nämä testit ja miten ne vertautuvat vaihtoehtoisiin selityksiin.",
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const d = t[locale === "fi" ? "fi" : "en"];
  return { title: `${d.title} – Extinction Field`, description: d.subtitle };
}

export default async function ObjectionsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const d = t[locale === "fi" ? "fi" : "en"];

  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <PageHeader icon={ShieldQuestion} title={d.title} subtitle={d.subtitle} />
      <div className="max-w-3xl space-y-8">
        <p className="text-foreground-muted leading-relaxed">{d.introduction}</p>

        {/* Summary bar: the whole review in one line */}
        <section className="rounded-xl border border-card-border bg-card-bg p-4 sm:p-5">
          <p className="editorial-kicker text-accent">{d.summaryLabel}</p>
          <div className="mt-3 flex flex-wrap gap-x-6 gap-y-2 text-sm">
            <span className="font-mono-num">
              {CLASSIFICATION_SUMMARY.total}{" "}
              <span className="font-sans text-xs text-foreground-muted">
                {locale === "fi" ? "havaintoa" : "findings"}
              </span>
            </span>
            <span className="font-mono-num text-status-refuted">
              {CLASSIFICATION_SUMMARY.remains_negative}{" "}
              <span className="font-sans text-xs text-foreground-muted">
                {locale === "fi" ? "pysyy" : "remain"}
              </span>
            </span>
            <span className="font-mono-num text-status-partial">
              {CLASSIFICATION_SUMMARY.reclassified}{" "}
              <span className="font-sans text-xs text-foreground-muted">
                {locale === "fi" ? "uudelleenluokiteltu" : "reclassified"}
              </span>
            </span>
            <span className="font-mono-num text-accent">
              {CLASSIFICATION_SUMMARY.internal_refinement}{" "}
              <span className="font-sans text-xs text-foreground-muted">
                {locale === "fi" ? "sisäinen tarkennus" : "internal refinement"}
              </span>
            </span>
          </div>
          <p className="mt-3 text-xs leading-relaxed text-foreground-muted">
            {locale === "fi"
              ? `${CLASSIFICATION_SUMMARY.affects_current_berm}/${CLASSIFICATION_SUMMARY.total} koskee nykyistä empiiristä BERM:ää · ${CLASSIFICATION_SUMMARY.affects_l_berm_only} koskee L-BERM:n teoriakerrosta · ${CLASSIFICATION_SUMMARY.affects_old_versions_only} koskee vanhoja versioita · ${CLASSIFICATION_SUMMARY.discriminating_tests_needed} erottelevaa jatkotestiä tunnistettu`
              : `${CLASSIFICATION_SUMMARY.affects_current_berm}/${CLASSIFICATION_SUMMARY.total} affect the current empirical BERM · ${CLASSIFICATION_SUMMARY.affects_l_berm_only} affect the L-BERM theory layer · ${CLASSIFICATION_SUMMARY.affects_old_versions_only} affect superseded versions · ${CLASSIFICATION_SUMMARY.discriminating_tests_needed} follow-up discriminating tests identified`}
          </p>
          <p className="mt-1 font-mono-num text-xs text-foreground-muted">
            CLASSIFICATION_TABLE v{CLASSIFICATION_VERSION}
          </p>
        </section>

        {/* Three outcome groups, read from the shared table */}
        {(
          [
            ["remains_negative", d.activeTitle, d.activeLead],
            ["reclassified", d.reclassifiedTitle, d.reclassifiedLead],
            ["internal_refinement", d.refinementTitle, d.refinementLead],
          ] as const
        ).map(([group, title, lead]) => (
          <section key={group} className="space-y-3">
            <h2 className="editorial-section-heading">{title}</h2>
            <p className="text-sm leading-relaxed text-foreground-muted">{lead}</p>
            {findingsInGroup(group).map((finding) => (
              <FindingCard key={finding.id} finding={finding} locale={locale} />
            ))}
          </section>
        ))}

        {/* Discriminating tests D1–D3 */}
        <section className="space-y-3">
          <h2 className="editorial-section-heading">{d.testsTitle}</h2>
          <p className="text-sm leading-relaxed text-foreground-muted">{d.testsLead}</p>
          {d.tests.map((test) => (
            <article key={test.id} className="rounded-xl border border-card-border bg-card-bg p-4 sm:p-5">
              <h3 className="text-sm font-semibold">
                <span className="font-mono-num text-accent">{test.id}</span>{" "}
                <span className="text-foreground">{test.name}</span>
              </h3>
              <dl className="mt-3 grid grid-cols-1 gap-1 text-xs sm:grid-cols-[7rem_1fr]">
                <dt className="text-accent">BERM</dt>
                <dd className="text-foreground-muted">{test.berm}</dd>
                <dt className="text-foreground-muted">
                  {locale === "fi" ? "Konsensus" : "Consensus"}
                </dt>
                <dd className="text-foreground-muted">{test.consensus}</dd>
                <dt className="text-foreground-muted">
                  {locale === "fi" ? "Protokolla" : "Protocol"}
                </dt>
                <dd className="text-foreground-muted">{test.protocol}</dd>
              </dl>
              <p className="mt-3 border-t border-card-border/60 pt-2 font-mono-num text-xs text-foreground-muted">
                {test.cost}
              </p>
            </article>
          ))}
        </section>

        {/* Version history: what was abandoned and why */}
        <section className="space-y-3">
          <h2 className="editorial-section-heading">{d.historyTitle}</h2>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[34rem] border-collapse text-xs">
              <thead>
                <tr className="border-b border-card-border text-left uppercase tracking-wider text-foreground-muted">
                  {d.historyHeaders.map((header) => (
                    <th key={header} className="py-2 pr-3 font-normal">{header}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {d.history.map((row) => (
                  <tr key={`${row.version}-${row.mechanism}`} className="border-b border-card-border/50">
                    <td className="py-2 pr-3 font-mono-num whitespace-nowrap">{row.version}</td>
                    <td className="py-2 pr-3 text-foreground">{row.mechanism}</td>
                    <td className="py-2 pr-3 text-status-refuted whitespace-nowrap">{row.status}</td>
                    <td className="py-2 leading-relaxed text-foreground-muted">{row.why}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <h2 className="editorial-section-heading border-t editorial-rule pt-6">{d.questionsTitle}</h2>

        {d.objections.map((objection, index) => (
          <section key={objection.question} className="rounded-xl border border-card-border bg-card-bg p-5">
            <p className="font-mono-num text-xs text-accent">0{index + 1}</p>
            <h2 className="mt-2 text-lg font-semibold">{objection.question}</h2>
            <div className="mt-3 space-y-3 text-sm leading-relaxed text-foreground-muted">
              {objection.response.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </div>
            <p className="mt-4 rounded-lg border border-status-partial/35 bg-status-partial/5 p-3 text-xs leading-relaxed text-foreground-muted">{objection.boundary}</p>
          </section>
        ))}

        <section className="rounded-xl border border-accent/25 bg-accent/5 p-5">
          <h2 className="text-lg font-semibold">{d.closingTitle}</h2>
          <p className="mt-2 text-sm leading-relaxed text-foreground-muted">{d.closingText}</p>
        </section>
      </div>
    </div>
  );
}
