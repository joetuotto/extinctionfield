import type { Metadata } from "next";
import Link from "next/link";
import { HeartPulse } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";

const COPY = {
  en: {
    title: "Heart",
    subtitle:
      "SA node Cav3.1 pacemaking and Cav1.2 contraction — HRV as the earliest EMF biomarker",
    backLink: "← Back to Modulome",

    sec1Title: "SA Node Pacemaking",

    channelProfile: "Channel Profile",
    channel: "Channel",
    gene: "Gene",
    cellType: "Cell type",
    function: "Function",
    level: "Evidence level",
    channelVal: "Cav3.1 (T-type, SA pacemaking) + Cav1.2 (L-type, contraction)",
    geneVal: "CACNA1G / CACNA1C",
    cellTypeVal: "SA node pacemaker cells, ventricular cardiomyocytes",
    functionVal: "Heart rate generation, rhythm control, contractile force",
    levelVal: "M",

    s2Title: "SA Node Pacemaking Mechanism",
    s2p1: "The sinoatrial (SA) node is the heart's primary pacemaker. SA node cells use Cav3.1 (CACNA1G) T-type voltage-gated calcium channels to generate the rhythmic depolarizations that initiate each heartbeat. T-type channels have a distinctive biophysical property: they activate at very negative membrane potentials (~−60mV) and exhibit a window current — a small but continuous calcium influx at resting membrane potential where approximately 10% of channels remain open.",
    s2p2: "This window current is not a defect but a feature: it provides the slow diastolic depolarization that drives the SA node toward threshold, generating the next heartbeat. The window current exists because the activation and inactivation voltage curves of T-type channels overlap — at resting potential, some channels are activated but not yet inactivated, permitting steady-state calcium entry.",
    s2p3: "Because T-type channels operate at resting potential — unlike L-type channels that require action potential depolarization — they are continuously susceptible to electromagnetic field perturbation. Even small EMF-induced shifts in membrane voltage can alter the window current fraction, modifying the rate of diastolic depolarization and thus heart rate variability.",

    s3Title: "HRV — The Earliest EMF Biomarker",
    s3Text: "Heart rate variability (HRV) reflects the beat-to-beat variation in heart rate driven by autonomic nervous system modulation of SA node pacemaking. Because SA node Cav3.1 channels are continuously active at rest via their window current, EMF-induced perturbation of these channels directly alters pacemaking dynamics. This makes HRV reduction potentially the earliest measurable EMF biomarker — it requires no tissue damage, only functional perturbation of an ion channel that is already operating at resting potential. HRV changes can be detected with consumer-grade wearable devices, making this prediction immediately testable at population scale.",

    sec2Title: "Cardiomyocyte Contraction",

    s4Title: "Cav1.2 Excitation-Contraction Coupling",
    s4p1: "Ventricular cardiomyocytes use Cav1.2 (CACNA1C) L-type voltage-gated calcium channels for excitation-contraction coupling — the process by which an electrical action potential triggers mechanical contraction. When the action potential depolarizes the cardiomyocyte membrane to approximately −30mV, Cav1.2 channels activate and admit Ca²⁺, which triggers calcium-induced calcium release (CICR) from the sarcoplasmic reticulum, producing contraction.",
    s4p2: "A critical distinction: unlike SA node Cav3.1 (which operates at resting potential), Cav1.2 activates only during the action potential phase at ~−30mV. At resting membrane potential (~−85mV), Cav1.2 channels are closed. This means Cav1.2 is EMF-sensitive only during the brief action potential window — not continuously. However, CACNA1C gain-of-function mutations that increase the Cav1.2 window current demonstrate what happens when this gating is disrupted: the window current expands, allowing calcium entry at voltages where channels should be closed, producing QT prolongation and arrhythmia risk.",

    s5Title: "Timothy Syndrome — Proof of Mechanism",
    s5p1: "Timothy syndrome is caused by a single point mutation in CACNA1C (G406R) that prevents Cav1.2 from inactivating properly. The channel remains open too long during each action potential, admitting excessive Ca²⁺. This single mutation simultaneously causes: long QT syndrome (cardiac), autism spectrum disorder (neurological), and syndactyly (developmental) — three seemingly unrelated conditions from one calcium channel defect.",
    s5p2: "Timothy syndrome provides the strongest single-gene evidence that calcium channel dysfunction has multi-organ consequences. It demonstrates that a single perturbation to Cav1.2 gating — failure to inactivate — is sufficient to cause both cardiac arrhythmia and neurodevelopmental disorder in the same individual. The BERM framework proposes that chronic EMF exposure produces a milder but analogous perturbation: subtle shifts in Cav1.2 gating kinetics that, sustained over years, accumulate into clinically significant calcium dysregulation across multiple organ systems.",

    sec3Title: "TRPC Channels and Cryptochrome",

    s6Title: "CRY2-TRPC1 Cardiac Complex",
    s6p1: "TRPC (Transient Receptor Potential Canonical) channels have been confirmed in ventricular cardiomyocytes, where they serve as a substrate for arrhythmia generation. Unlike voltage-gated calcium channels, TRPC channels are non-selective cation channels that can be activated by multiple stimuli including mechanical stretch and receptor-operated signaling.",
    s6p2: "Yap 2025 demonstrated a physical complex between cryptochrome 2 (CRY2) and TRPC1 in myoblasts. CRY2 is a flavin adenine dinucleotide (FAD)-dependent blue-light photoreceptor. If the CRY2-TRPC1 complex operates in cardiomyocytes — as the presence of both proteins in cardiac tissue suggests — then cardiac calcium entry through TRPC1 is modulated by blue light and FAD redox state. This creates a direct photosensitive pathway for cardiac calcium regulation.",

    s7Title: "Circadian Arrhythmia Hypothesis",
    s7Text: "If CRY2-TRPC1 signaling is active in cardiomyocytes, the implications for nighttime electromagnetic exposure are significant. Blue light from phone screens activates CRY2, which modulates TRPC1-mediated calcium entry. At night, when the circadian system expects darkness, blue light exposure combined with RF-EMF from the device creates a dual perturbation: CRY2 activation opens a calcium entry pathway (TRPC1) while EMF simultaneously perturbs voltage-gated calcium channels. This convergence predicts that nighttime phone use carries higher arrhythmia risk than equivalent daytime use — a testable chronobiological prediction.",

    sec4Title: "EMF Evidence and Predictions",

    s8Title: "Evidence Summary",
    s8Stats: [
      "Blood pressure elevation in EMF-exposed rats (Mohamed) — consistent with chronic autonomic perturbation via SA node calcium channel disruption",
      "Left ventricular hypertrophy develops from chronic hypertension — downstream structural consequence of sustained hemodynamic stress",
      "HRV reduction documented across multiple EMF exposure studies — the predicted early biomarker of SA node Cav3.1 perturbation",
      "Tsimane population of Bolivia: lowest cardiovascular disease prevalence ever recorded in any human population — living in near-zero ambient EMF environment",
    ],

    s9Title: "BERM Predictions",
    s9Text: "The BERM framework generates three specific, testable predictions for cardiac effects of electromagnetic field exposure:",
    predictions: [
      {
        id: "HEART-1",
        text: "Chronic EMF exposure reduces heart rate variability (HRV). HRV measured by SDNN and RMSSD metrics will show dose-dependent reduction correlating with cumulative RF-EMF exposure, controlling for age, fitness, and autonomic medications. This is the most immediately testable cardiac prediction — measurable with consumer wearables at population scale.",
        discriminating: true,
      },
      {
        id: "HEART-2",
        text: "Nighttime phone use produces higher arrhythmia risk than equivalent daytime use. CRY2-TRPC1-dependent calcium entry in cardiomyocytes creates a circadian vulnerability: blue light + RF-EMF at night perturbs a photosensitive calcium pathway that is quiescent in darkness. Atrial fibrillation and premature ventricular contraction rates will correlate with nighttime screen exposure duration after controlling for total daily exposure.",
        discriminating: true,
      },
      {
        id: "HEART-3",
        text: "Sleeping in a Faraday-shielded environment improves HRV within 30 days. Removing nighttime RF-EMF exposure allows SA node Cav3.1 window current to return to baseline oscillation, measurably improving autonomic balance as reflected in HRV metrics. A randomized crossover trial comparing shielded vs. unshielded sleeping environments will show significant SDNN improvement in the shielded condition.",
        discriminating: false,
      },
    ],

    references: "Key References",
    refs: [
      {
        id: "mohamed-emf-blood-pressure",
        citation: "Mohamed et al.",
        finding:
          "Blood pressure elevation in EMF-exposed rats — demonstrates cardiovascular physiological response to chronic electromagnetic field exposure consistent with autonomic dysregulation.",
      },
      {
        id: "yap-2025-cry2-trpc1",
        citation: "Yap 2025",
        finding:
          "CRY2-TRPC1 physical complex demonstrated in myoblasts — establishes a direct photosensitive calcium entry pathway with implications for cardiac tissue.",
      },
      {
        id: "timothy-syndrome-cacna1c",
        citation: "Splawski et al. 2004",
        finding:
          "CACNA1C G406R mutation causes Timothy syndrome — long QT, autism, and syndactyly from a single calcium channel gain-of-function mutation, proving multi-organ consequences of Cav1.2 disruption.",
      },
    ],

    seeAlso: "See also",
    brainModulome: "Brain modulome",
    predictionsPage: "Predictions — HEART series",
    evidencePage: "Evidence register",
    modulomeOverview: "Modulome overview",
  },
  fi: {
    title: "Sydän",
    subtitle:
      "SA-solmun Cav3.1-tahdistus ja Cav1.2-supistus — HRV varhaisimpana EMF-biomarkerina",
    backLink: "← Takaisin moduloomiin",

    sec1Title: "SA-solmun tahdistus",

    channelProfile: "Kanavaprofiili",
    channel: "Kanava",
    gene: "Geeni",
    cellType: "Solutyyppi",
    function: "Toiminto",
    level: "Evidenssitaso",
    channelVal: "Cav3.1 (T-tyyppi, SA-tahdistus) + Cav1.2 (L-tyyppi, supistus)",
    geneVal: "CACNA1G / CACNA1C",
    cellTypeVal: "SA-solmun tahdistinsolut, kammioiden kardiomyosyytit",
    functionVal: "Syketaajuuden generointi, rytminhallinta, supistusvoima",
    levelVal: "M",

    s2Title: "SA-solmun tahdistusmekanismi",
    s2p1: "Sinussolmu (SA-solmu) on sydämen ensisijainen tahdistin. SA-solmun solut käyttävät Cav3.1 (CACNA1G) T-tyypin jänniteohjattuja kalsiumkanavia tuottaakseen rytmiset depolarisaatiot, jotka käynnistävät jokaisen sydämenlyönnin. T-tyypin kanavilla on erottuva biofysikaalinen ominaisuus: ne aktivoituvat hyvin negatiivisissa kalvopotentiaaleissa (~−60mV) ja tuottavat ikkunavirran — pienen mutta jatkuvan kalsiumsisäänvirtauksen lepopotentiaalissa, jossa noin 10 % kanavista pysyy auki.",
    s2p2: "Tämä ikkunavirta ei ole vika vaan ominaisuus: se tuottaa hitaan diastolisen depolarisaation, joka ajaa SA-solmun kohti kynnystä ja generoi seuraavan sydämenlyönnin. Ikkunavirta syntyy koska T-tyypin kanavien aktivaatio- ja inaktivaatiojännitekäyrät menevät päällekkäin — lepopotentiaalissa osa kanavista on aktivoitunut mutta ei vielä inaktivoitunut, mikä sallii tasapainotilan kalsiumsisäänvirtauksen.",
    s2p3: "Koska T-tyypin kanavat toimivat lepopotentiaalissa — toisin kuin L-tyypin kanavat, jotka vaativat aktiopotentiaalidepolarisaation — ne ovat jatkuvasti alttiita sähkömagneettisten kenttien häiriöille. Pienetkin EMF:n aiheuttamat muutokset kalvojännitteessä voivat muuttaa ikkunavirran osuutta, modifioiden diastolisen depolarisaation nopeutta ja siten sykevälivaihtelua.",

    s3Title: "HRV — varhaisin EMF-biomarkeri",
    s3Text: "Sykevälivaihtelu (HRV) heijastaa lyönnistä toiseen vaihtelua sydämen syketaajuudessa, jota autonominen hermosto säätelee SA-solmun tahdistuksen kautta. Koska SA-solmun Cav3.1-kanavat ovat jatkuvasti aktiivisia levossa ikkunavirtansa kautta, EMF:n aiheuttama häiriö näissä kanavissa muuttaa suoraan tahdistusdynamiikkaa. Tämä tekee HRV:n laskusta mahdollisesti varhaisimman mitattavan EMF-biomarkerin — se ei vaadi kudosvauriota, ainoastaan jo lepopotentiaalissa toimivan ionikanavan toiminnallisen häiriön. HRV-muutokset voidaan havaita kuluttajatason puettavilla laitteilla, mikä tekee tästä ennusteesta välittömästi testattavan väestötasolla.",

    sec2Title: "Kardiomyosyytin supistus",

    s4Title: "Cav1.2 eksitaatio-kontraktiokytkentä",
    s4p1: "Kammioiden kardiomyosyytit käyttävät Cav1.2 (CACNA1C) L-tyypin jänniteohjattuja kalsiumkanavia eksitaatio-kontraktiokytkentään — prosessiin, jossa sähköinen aktiopotentiaali laukaisee mekaanisen supistuksen. Kun aktiopotentiaali depolarisoi kardiomyosyytin kalvon noin −30mV:iin, Cav1.2-kanavat aktivoituvat ja päästävät Ca²⁺:n sisään, mikä laukaisee kalsiumin indusoimaa kalsiumin vapautumista (CICR) sarkoplasmaisesta retikulumista ja tuottaa supistuksen.",
    s4p2: "Kriittinen ero: toisin kuin SA-solmun Cav3.1 (joka toimii lepopotentiaalissa), Cav1.2 aktivoituu vain aktiopotentiaalivaiheen aikana ~−30mV:ssa. Lepopotentiaalissa (~−85mV) Cav1.2-kanavat ovat kiinni. Tämä tarkoittaa, että Cav1.2 on EMF-herkkä vain lyhyen aktiopotentiaali-ikkunan aikana — ei jatkuvasti. CACNA1C:n toimintaa vahvistavat mutaatiot, jotka lisäävät Cav1.2:n ikkunavirtaa, osoittavat kuitenkin mitä tapahtuu kun tämä porttitoiminta häiriintyy: ikkunavirta laajenee salliien kalsiumin sisäänpääsyn jännitteissä, joissa kanavien pitäisi olla kiinni, tuottaen QT-ajan pidentymistä ja arytmiariskiä.",

    s5Title: "Timothyn oireyhtymä — mekanismin todiste",
    s5p1: "Timothyn oireyhtymä aiheutuu yksittäisestä pistemutaatiosta CACNA1C:ssä (G406R), joka estää Cav1.2:n asianmukaisen inaktivaation. Kanava pysyy auki liian kauan kunkin aktiopotentiaalin aikana päästäen sisään liiallisesti Ca²⁺:ia. Tämä yksittäinen mutaatio aiheuttaa samanaikaisesti: pitkä QT -oireyhtymän (sydän), autismikirjon häiriön (neurologia) ja syndaktylian (kehitys) — kolme näennäisesti erillistä tilaa yhdestä kalsiumkanavien viasta.",
    s5p2: "Timothyn oireyhtymä tarjoaa vahvimman yhden geenin todisteen siitä, että kalsiumkanavien toimintahäiriöllä on monielimistölliset seuraukset. Se osoittaa, että yksittäinen häiriö Cav1.2:n porttitoiminnassa — inaktivaation epäonnistuminen — riittää aiheuttamaan sekä sydänarytmian että neurokehityksellisen häiriön samalla yksilöllä. BERM-kehys esittää, että krooninen EMF-altistus tuottaa lievemmän mutta analogisen häiriön: hienovaraisia muutoksia Cav1.2:n porttikinetiikassa, jotka vuosien aikana kumuloituvat kliinisesti merkittäväksi kalsiumdysregulaatioksi useiden elinjärjestelmien yli.",

    sec3Title: "TRPC-kanavat ja kryptokromi",

    s6Title: "CRY2-TRPC1-sydänkompleksi",
    s6p1: "TRPC (Transient Receptor Potential Canonical) -kanavat on vahvistettu kammioiden kardiomyosyyteissä, joissa ne toimivat arytmioiden syntymisen substraattina. Toisin kuin jänniteohjatuissa kalsiumkanavissa, TRPC-kanavat ovat epäselektiivisiä kationikanavia, jotka voivat aktivoitua useiden ärsykkeiden kautta mukaan lukien mekaaninen venytys ja reseptorivälitteinen signalointi.",
    s6p2: "Yap 2025 osoitti fyysisen kompleksin kryptokromi 2:n (CRY2) ja TRPC1:n välillä myoblasteissa. CRY2 on flaviiniadeniinidinukleotidista (FAD) riippuvainen sinisen valon fotoreseptori. Jos CRY2-TRPC1-kompleksi toimii kardiomyosyyteissä — kuten molempien proteiinien läsnäolo sydänkudoksessa viittaa — silloin TRPC1:n kautta tapahtuva sydämen kalsiumin sisäänvirtaus säätyy sinisen valon ja FAD-redokstilan mukaan. Tämä luo suoran valoherkän reitin sydämen kalsiumsäätelyyn.",

    s7Title: "Vuorokausirytmiin sidottu arytmiahypoteesi",
    s7Text: "Jos CRY2-TRPC1-signalointi on aktiivista kardiomyosyyteissä, vaikutukset yölliselle sähkömagneettiselle altistukselle ovat merkittäviä. Puhelinten näyttöjen sininen valo aktivoi CRY2:n, joka säätelee TRPC1-välitteistä kalsiumin sisäänvirtausta. Yöllä, kun vuorokausirytmi odottaa pimeyttä, sinisen valon altistus yhdistettynä laitteen RF-EMF:ään luo kaksoisperturbaation: CRY2:n aktivaatio avaa kalsiumin sisäänvirtausreitin (TRPC1) samalla kun EMF häiritsee jänniteohjattuja kalsiumkanavia. Tämä yhteenliittymä ennustaa, että yöllinen puhelinkäyttö kantaa suurempaa arytmiariskiä kuin vastaava päiväkäyttö — testattava kronobiologinen ennuste.",

    sec4Title: "EMF-evidenssi ja ennusteet",

    s8Title: "Evidenssiyhteenveto",
    s8Stats: [
      "Verenpaineen nousu EMF-altistetuilla rotilla (Mohamed) — yhdenmukainen kroonisen autonomisen häiriön kanssa SA-solmun kalsiumkanavien kautta",
      "Vasemman kammion hypertrofia kehittyy kroonisesta hypertensiosta — pitkäkestoisen hemodynamiikan stressin aiheuttama rakenteellinen seuraus",
      "HRV:n lasku dokumentoitu useissa EMF-altistustutkimuksissa — ennustettu varhainen biomarkeri SA-solmun Cav3.1-häiriöstä",
      "Bolivian tsimane-kansa: alhaisin koskaan kirjattu sydän- ja verisuonitautien esiintyvyys missään ihmispopulaatiossa — elävät lähes nollan ympäröivän EMF:n ympäristössä",
    ],

    s9Title: "BERM-ennusteet",
    s9Text: "BERM-kehys tuottaa kolme spesifistä, testattavaa ennustetta sähkömagneettisten kenttien sydänvaikutuksista:",
    predictions: [
      {
        id: "HEART-1",
        text: "Krooninen EMF-altistus vähentää sykevälivaihtelua (HRV). SDNN- ja RMSSD-mittareilla mitattu HRV osoittaa annosriippuvaista vähenemistä, joka korreloi kumulatiivisen RF-EMF-altistuksen kanssa, kontrolloiden ikä, kuntotaso ja autonomiset lääkitykset. Tämä on välittömimmin testattava sydänennuste — mitattavissa kuluttajapuettavilla väestötasolla.",
        discriminating: true,
      },
      {
        id: "HEART-2",
        text: "Yöllinen puhelinkäyttö tuottaa korkeamman arytmiariskin kuin vastaava päiväkäyttö. CRY2-TRPC1-riippuvainen kalsiumin sisäänvirtaus kardiomyosyyteissä luo vuorokausihaavoittuvuuden: sininen valo + RF-EMF yöllä häiritsee valoherkkää kalsiumreittiä, joka on lepotilassa pimeässä. Eteisvärinän ja kammiolisälyöntien esiintyvyys korreloi yöllisen näyttöaltistuksen keston kanssa kokonaispäiväaltistuksen kontrolloinnin jälkeen.",
        discriminating: true,
      },
      {
        id: "HEART-3",
        text: "Faradayn häkillä suojatussa ympäristössä nukkuminen parantaa HRV:tä 30 päivän kuluessa. Yöllisen RF-EMF-altistuksen poistaminen sallii SA-solmun Cav3.1-ikkunavirran palautua lähtötason oskillaatioon, mitattavasti parantaen autonomista tasapainoa HRV-mittareissa. Satunnaistettu vaihtovuorotutkimus suojatun ja suojaamattoman nukkumisympäristön välillä osoittaa merkittävän SDNN-parannuksen suojatussa tilassa.",
        discriminating: false,
      },
    ],

    references: "Keskeiset viitteet",
    refs: [
      {
        id: "mohamed-emf-blood-pressure",
        citation: "Mohamed ym.",
        finding:
          "Verenpaineen nousu EMF-altistetuilla rotilla — osoittaa kardiovaskulaarisen fysiologisen vasteen krooniselle sähkömagneettiselle kenttäaltistukselle, yhdenmukainen autonomisen dysregulaation kanssa.",
      },
      {
        id: "yap-2025-cry2-trpc1",
        citation: "Yap 2025",
        finding:
          "CRY2-TRPC1-fyysinen kompleksi osoitettu myoblasteissa — vahvistaa suoran valoherkän kalsiumin sisäänvirtausreitin, jolla on vaikutuksia sydänkudokseen.",
      },
      {
        id: "timothy-syndrome-cacna1c",
        citation: "Splawski ym. 2004",
        finding:
          "CACNA1C G406R -mutaatio aiheuttaa Timothyn oireyhtymän — pitkä QT, autismi ja syndaktylia yhdestä kalsiumkanavan gain-of-function-mutaatiosta, todistaen Cav1.2-häiriön monielimistölliset seuraukset.",
      },
    ],

    seeAlso: "Katso myös",
    brainModulome: "Aivojen moduloomi",
    predictionsPage: "Ennusteet — HEART-sarja",
    evidencePage: "Evidenssirekisteri",
    modulomeOverview: "Moduloomin yleiskatsaus",
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const d = locale === "fi" ? COPY.fi : COPY.en;
  return {
    title: `${d.title} – Modulome – Extinction Field`,
    description: d.subtitle,
  };
}

export default async function HeartPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const activeLocale = locale === "fi" ? "fi" : "en";
  const d = COPY[activeLocale];

  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <Link
        href={`/${locale}/modulome`}
        className="text-sm text-accent hover:underline mb-6 inline-block"
      >
        {d.backLink}
      </Link>

      <PageHeader icon={HeartPulse} title={d.title} subtitle={d.subtitle} />

      <div className="mb-4 mt-12">
        <h2 className="text-xl font-bold text-foreground tracking-tight">
          {d.sec1Title}
        </h2>
        <div className="h-px bg-accent/30 mt-2" />
      </div>

      <section className="mb-16 border-t editorial-rule pt-6">
        <h3 className="text-lg font-semibold mb-4">
          <span className="font-mono-num text-xs text-accent mr-2">01</span>
          {d.channelProfile}
        </h3>
        <div className="bg-card rounded-lg border border-card-border p-5 space-y-3">
          <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm">
            <span className="text-foreground-muted">{d.channel}</span>
            <span className="text-foreground font-medium">{d.channelVal}</span>
            <span className="text-foreground-muted">{d.gene}</span>
            <span className="text-foreground font-medium font-mono text-xs">
              {d.geneVal}
            </span>
            <span className="text-foreground-muted">{d.cellType}</span>
            <span className="text-foreground font-medium">{d.cellTypeVal}</span>
            <span className="text-foreground-muted">{d.function}</span>
            <span className="text-foreground font-medium">{d.functionVal}</span>
            <span className="text-foreground-muted">{d.level}</span>
            <span className="text-foreground font-medium">
              <span className="text-[0.65rem] font-semibold px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-600 dark:text-amber-400">
                {d.levelVal}
              </span>
            </span>
          </div>
        </div>
      </section>

      <section className="mb-16 border-t editorial-rule pt-6">
        <h3 className="text-lg font-semibold mb-4">
          <span className="font-mono-num text-xs text-accent mr-2">02</span>
          {d.s2Title}
        </h3>
        <div className="space-y-4 text-sm text-foreground-muted leading-relaxed max-w-4xl">
          <p className="editorial-rail text-[0.95rem] text-foreground">
            {d.s2p1}
          </p>
          <p>{d.s2p2}</p>
          <div className="border-l-4 border-accent/40 rounded-r-lg bg-card p-5">
            <p className="text-sm text-foreground-muted leading-relaxed">
              {d.s2p3}
            </p>
          </div>
        </div>
      </section>

      <section className="mb-16 border-t editorial-rule pt-6">
        <h3 className="text-lg font-semibold mb-4">
          <span className="font-mono-num text-xs text-accent mr-2">03</span>
          {d.s3Title}
        </h3>
        <div className="border-l-4 border-accent/40 rounded-r-lg bg-card p-5">
          <p className="text-sm text-foreground-muted leading-relaxed">
            {d.s3Text}
          </p>
        </div>
      </section>

      <div className="mb-4 mt-12">
        <h2 className="text-xl font-bold text-foreground tracking-tight">
          {d.sec2Title}
        </h2>
        <div className="h-px bg-accent/30 mt-2" />
      </div>

      <section className="mb-16 border-t editorial-rule pt-6">
        <h3 className="text-lg font-semibold mb-4">
          <span className="font-mono-num text-xs text-accent mr-2">04</span>
          {d.s4Title}
        </h3>
        <div className="space-y-4 text-sm text-foreground-muted leading-relaxed max-w-4xl">
          <p className="editorial-rail text-[0.95rem] text-foreground">
            {d.s4p1}
          </p>
          <div className="border-l-4 border-accent/40 rounded-r-lg bg-card p-5">
            <p className="text-sm text-foreground-muted leading-relaxed">
              {d.s4p2}
            </p>
          </div>
        </div>
      </section>

      <section className="mb-16 border-t editorial-rule pt-6">
        <h3 className="text-lg font-semibold mb-4">
          <span className="font-mono-num text-xs text-accent mr-2">05</span>
          {d.s5Title}
        </h3>
        <div className="space-y-4 text-sm text-foreground-muted leading-relaxed max-w-4xl">
          <p className="editorial-rail text-[0.95rem] text-foreground">
            {d.s5p1}
          </p>
          <div className="rounded-lg bg-amber-500/10 border border-amber-500/20 p-5">
            <p className="text-sm text-foreground-muted leading-relaxed">
              {d.s5p2}
            </p>
          </div>
        </div>
      </section>

      <div className="mb-4 mt-12">
        <h2 className="text-xl font-bold text-foreground tracking-tight">
          {d.sec3Title}
        </h2>
        <div className="h-px bg-accent/30 mt-2" />
      </div>

      <section className="mb-16 border-t editorial-rule pt-6">
        <h3 className="text-lg font-semibold mb-4">
          <span className="font-mono-num text-xs text-accent mr-2">06</span>
          {d.s6Title}
        </h3>
        <div className="space-y-4 text-sm text-foreground-muted leading-relaxed max-w-4xl">
          <p className="editorial-rail text-[0.95rem] text-foreground">
            {d.s6p1}
          </p>
          <p>{d.s6p2}</p>
        </div>
      </section>

      <section className="mb-16 border-t editorial-rule pt-6">
        <h3 className="text-lg font-semibold mb-4">
          <span className="font-mono-num text-xs text-accent mr-2">07</span>
          {d.s7Title}
        </h3>
        <div className="border-l-4 border-accent/40 rounded-r-lg bg-card p-5">
          <p className="text-sm text-foreground-muted leading-relaxed">
            {d.s7Text}
          </p>
        </div>
      </section>

      <div className="mb-4 mt-12">
        <h2 className="text-xl font-bold text-foreground tracking-tight">
          {d.sec4Title}
        </h2>
        <div className="h-px bg-accent/30 mt-2" />
      </div>

      <section className="mb-16 border-t editorial-rule pt-6">
        <h3 className="text-lg font-semibold mb-4">
          <span className="font-mono-num text-xs text-accent mr-2">08</span>
          {d.s8Title}
        </h3>
        <ul className="space-y-3 text-sm text-foreground-muted leading-relaxed max-w-4xl">
          {d.s8Stats.map((stat, i) => (
            <li key={i} className="pl-1 flex gap-2">
              <span className="text-accent shrink-0">*</span>
              <span>{stat}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="mb-16 border-t editorial-rule pt-6">
        <h3 className="text-lg font-semibold mb-4">
          <span className="font-mono-num text-xs text-accent mr-2">09</span>
          {d.s9Title}
        </h3>

        <p className="text-sm text-foreground-muted leading-relaxed max-w-4xl mb-6">
          {d.s9Text}
        </p>

        <div className="space-y-4">
          {d.predictions.map((pred) => (
            <div
              key={pred.id}
              className="border-l-4 border-green-500 rounded-r-lg bg-card p-4"
            >
              <div className="flex items-start justify-between gap-2 mb-2">
                <span className="font-mono-num text-xs font-bold text-accent">
                  {pred.id}
                </span>
                {pred.discriminating && (
                  <span className="shrink-0 text-[0.65rem] font-semibold px-1.5 py-0.5 rounded bg-green-500/10 text-green-600 dark:text-green-400">
                    {activeLocale === "fi" ? "Erotteleva" : "Discriminating"}
                  </span>
                )}
              </div>
              <p className="text-sm text-foreground-muted leading-relaxed">
                {pred.text}
              </p>
            </div>
          ))}
        </div>

        <Link
          href={`/${locale}/predictions`}
          className="text-xs text-accent hover:underline mt-4 inline-block"
        >
          {activeLocale === "fi" ? "Kaikki ennusteet →" : "All predictions →"}
        </Link>
      </section>

      <section className="mb-16 border-t editorial-rule pt-6">
        <h3 className="text-sm font-semibold text-foreground mb-4">
          {d.references}
        </h3>
        <div className="space-y-3">
          {d.refs.map((ref) => (
            <div
              key={ref.id}
              className="bg-card rounded-lg border border-card-border p-4"
            >
              <p className="text-xs font-semibold text-accent mb-1">
                {ref.citation}
              </p>
              <p className="text-xs text-foreground-muted leading-relaxed">
                {ref.finding}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t editorial-rule pt-6">
        <h3 className="text-sm font-semibold text-foreground mb-3">
          {d.seeAlso}
        </h3>
        <div className="flex gap-6 flex-wrap">
          <Link
            href={`/${locale}/modulome/brain`}
            className="text-sm text-accent hover:underline"
          >
            {d.brainModulome} &rarr;
          </Link>
          <Link
            href={`/${locale}/predictions`}
            className="text-sm text-accent hover:underline"
          >
            {d.predictionsPage} &rarr;
          </Link>
          <Link
            href={`/${locale}/evidence`}
            className="text-sm text-accent hover:underline"
          >
            {d.evidencePage} &rarr;
          </Link>
          <Link
            href={`/${locale}/modulome`}
            className="text-sm text-accent hover:underline"
          >
            {d.modulomeOverview} &rarr;
          </Link>
        </div>
      </section>
    </div>
  );
}
