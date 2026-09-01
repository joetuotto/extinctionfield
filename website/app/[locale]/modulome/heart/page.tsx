import type { Metadata } from "next";
import Link from "next/link";
import { HeartPulse } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { CitationLink } from "@/components/CitationLink";
import { pickCopy } from "@/lib/i18n";

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
        referenceId: "mohamed-bp-emf",
        finding:
          "Blood pressure elevation in EMF-exposed rats — demonstrates cardiovascular physiological response to chronic electromagnetic field exposure consistent with autonomic dysregulation.",
      },
      {
        id: "yap-2025-cry2-trpc1",
        citation: "Yap 2025",
        referenceId: "yap2025",
        finding:
          "CRY2-TRPC1 physical complex demonstrated in myoblasts — establishes a direct photosensitive calcium entry pathway with implications for cardiac tissue.",
      },
      {
        id: "timothy-syndrome-cacna1c",
        citation: "Splawski et al. 2004",
        referenceId: "splawski2004",
        finding:
          "CACNA1C G406R mutation causes Timothy syndrome — long QT, autism, and syndactyly from a single calcium channel gain-of-function mutation, proving multi-organ consequences of Cav1.2 disruption.",
      },
    ],

    discriminatingBadge: "Discriminating",
    allPredictions: "All predictions →",

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
    level: "Näyttötaso",
    channelVal: "Cav3.1 (T-tyyppi, SA-tahdistus) + Cav1.2 (L-tyyppi, supistus)",
    geneVal: "CACNA1G / CACNA1C",
    cellTypeVal: "SA-solmun tahdistinsolut, kammioiden kardiomyosyytit",
    functionVal: "Syketaajuuden tuottaminen, rytminhallinta, supistusvoima",
    levelVal: "M",

    s2Title: "SA-solmun tahdistusmekanismi",
    s2p1: "Sinussolmu (SA-solmu) on sydämen ensisijainen tahdistin. SA-solmun solut käyttävät Cav3.1 (CACNA1G) T-tyypin jänniteohjattuja kalsiumkanavia tuottaakseen rytmiset depolarisaatiot, jotka käynnistävät jokaisen sydämenlyönnin. T-tyypin kanavilla on erottuva biofysikaalinen ominaisuus: ne aktivoituvat hyvin negatiivisissa kalvopotentiaaleissa (~−60mV) ja tuottavat ikkunavirran — pienen mutta jatkuvan kalsiumsisäänvirtauksen lepopotentiaalissa, jossa noin 10 % kanavista pysyy auki.",
    s2p2: "Tämä ikkunavirta ei ole vika vaan ominaisuus: se tuottaa hitaan diastolisen depolarisaation, joka ajaa SA-solmun kohti kynnystä ja tuottaa seuraavan sydämenlyönnin. Ikkunavirta syntyy koska T-tyypin kanavien aktivaatio- ja inaktivaatiojännitekäyrät menevät päällekkäin — lepopotentiaalissa osa kanavista on aktivoitunut mutta ei vielä inaktivoitunut, mikä sallii tasapainotilan kalsiumsisäänvirtauksen.",
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

    sec4Title: "EMF-näyttö ja ennusteet",

    s8Title: "Näyttöyhteenveto",
    s8Stats: [
      "Verenpaineen nousu EMF-altistetuilla rotilla (Mohamed) — yhdenmukainen kroonisen autonomisen häiriön kanssa SA-solmun kalsiumkanavien kautta",
      "Vasemman kammion hypertrofia kehittyy kroonisesta hypertensiosta — pitkäkestoisen hemodynamiikan stressin aiheuttama rakenteellinen seuraus",
      "HRV:n lasku dokumentoitu useissa EMF-altistustutkimuksissa — ennustettu varhainen biomarkeri SA-solmun Cav3.1-häiriöstä",
      "Bolivian tsimane-kansa: alhaisin koskaan kirjattu sydän- ja verisuonitautien esiintyvyys missään ihmispopulaatiossa — elävät lähes nollan ympäröivän EMF:n ympäristössä",
    ],

    s9Title: "BERM-ennusteet",
    s9Text: "BERM-kehys tuottaa kolme tarkkaa, testattavaa ennustetta sähkömagneettisten kenttien sydänvaikutuksista:",
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
        referenceId: "mohamed-bp-emf",
        finding:
          "Verenpaineen nousu EMF-altistetuilla rotilla — osoittaa kardiovaskulaarisen fysiologisen vasteen krooniselle sähkömagneettiselle kenttäaltistukselle, yhdenmukainen autonomisen dysregulaation kanssa.",
      },
      {
        id: "yap-2025-cry2-trpc1",
        citation: "Yap 2025",
        referenceId: "yap2025",
        finding:
          "CRY2-TRPC1-fyysinen kompleksi osoitettu myoblasteissa — vahvistaa suoran valoherkän kalsiumin sisäänvirtausreitin, jolla on vaikutuksia sydänkudokseen.",
      },
      {
        id: "timothy-syndrome-cacna1c",
        citation: "Splawski ym. 2004",
        referenceId: "splawski2004",
        finding:
          "CACNA1C G406R -mutaatio aiheuttaa Timothyn oireyhtymän — pitkä QT, autismi ja syndaktylia yhdestä kalsiumkanavan gain-of-function-mutaatiosta, todistaen Cav1.2-häiriön monielimistölliset seuraukset.",
      },
    ],

    discriminatingBadge: "Erotteleva",
    allPredictions: "Kaikki ennusteet →",

    seeAlso: "Katso myös",
    brainModulome: "Aivojen moduloomi",
    predictionsPage: "Ennusteet — HEART-sarja",
    evidencePage: "Näyttörekisteri",
    modulomeOverview: "Moduloomin yleiskatsaus",
  },
  ja: {
    title: "心臓",
    subtitle:
      "SA結節Cav3.1ペースメーキングとCav1.2収縮——最も早期のEMFバイオマーカーとしてのHRV",
    backLink: "← モジュロームに戻る",

    sec1Title: "SA結節ペースメーキング",

    channelProfile: "チャネルプロファイル",
    channel: "チャネル",
    gene: "遺伝子",
    cellType: "細胞種",
    function: "機能",
    level: "エビデンスレベル",
    channelVal: "Cav3.1（T型、SAペースメーキング）+ Cav1.2（L型、収縮）",
    geneVal: "CACNA1G / CACNA1C",
    cellTypeVal: "SA結節ペースメーカー細胞、心室心筋細胞",
    functionVal: "心拍生成、リズム制御、収縮力",
    levelVal: "M",

    s2Title: "SA結節ペースメーキング機構",
    s2p1: "洞房結節（SA結節）は心臓の主要ペースメーカーである。SA結節細胞はCav3.1（CACNA1G）T型電位依存性カルシウムチャネルを用いて、各心拍を開始するリズミカルな脱分極を生成する。T型チャネルは特徴的な生物物理学的特性を持つ：非常に負の膜電位（約-60mV）で活性化し、ウィンドウ電流を示す——静止膜電位における小さいが持続的なカルシウム流入で、約10%のチャネルが開口状態を維持する。",
    s2p2: "このウィンドウ電流は欠陥ではなく特徴である：SA結節を閾値に向かって駆動する緩やかな拡張期脱分極を提供し、次の心拍を生成する。ウィンドウ電流はT型チャネルの活性化曲線と不活性化電圧曲線が重複するために存在する——静止電位で一部のチャネルは活性化されているがまだ不活性化されておらず、定常状態のカルシウム流入を許容する。",
    s2p3: "T型チャネルは静止電位で動作するため——活動電位脱分極を必要とするL型チャネルとは異なり——電磁場擾乱に継続的に感受性がある。EMFによる膜電圧の小さな変化でさえウィンドウ電流の割合を変化させ、拡張期脱分極の速度、すなわち心拍変動を修飾しうる。",

    s3Title: "HRV——最も早期のEMFバイオマーカー",
    s3Text: "心拍変動（HRV）はSA結節ペースメーキングの自律神経系調節による拍動ごとの心拍変動を反映する。SA結節のCav3.1チャネルはウィンドウ電流を通じて安静時に継続的に活動しているため、EMFによるこれらチャネルの擾乱はペースメーキングダイナミクスを直接変化させる。これによりHRV低下は潜在的に最も早期の測定可能なEMFバイオマーカーとなる——組織損傷を必要とせず、既に静止電位で動作しているイオンチャネルの機能的擾乱のみを必要とする。HRV変化は消費者向けウェアラブルデバイスで検出可能であり、この予測は集団規模で即座に検証可能である。",

    sec2Title: "心筋細胞の収縮",

    s4Title: "Cav1.2興奮収縮連関",
    s4p1: "心室心筋細胞はCav1.2（CACNA1C）L型電位依存性カルシウムチャネルを興奮収縮連関に使用する——電気的活動電位が機械的収縮を引き起こすプロセスである。活動電位が心筋細胞膜を約-30mVに脱分極させるとCav1.2チャネルが活性化しCa²⁺を通過させ、筋小胞体からのカルシウム誘発カルシウム放出（CICR）を引き起こし収縮を産生する。",
    s4p2: "重要な区別：SA結節のCav3.1（静止電位で動作）とは異なり、Cav1.2は活動電位相の約-30mVでのみ活性化する。静止膜電位（約-85mV）ではCav1.2チャネルは閉鎖している。つまりCav1.2は短い活動電位ウィンドウの間のみEMF感受性がある——継続的ではない。しかしCav1.2ウィンドウ電流を増加させるCACNA1C機能獲得変異はこのゲーティングが乱された場合の結果を示す：ウィンドウ電流が拡大しチャネルが閉鎖しているべき電圧でカルシウム流入を許容、QT延長と不整脈リスクを産生する。",

    s5Title: "Timothy症候群——メカニズムの証明",
    s5p1: "Timothy症候群はCACNA1Cの単一点変異（G406R）により引き起こされ、Cav1.2の適切な不活性化を妨げる。チャネルは各活動電位中に長く開口したままとなり過剰なCa²⁺を通過させる。この単一変異は同時にQT延長症候群（心臓）、自閉症スペクトラム障害（神経）、合指症（発達）を引き起こす——一つのカルシウムチャネル欠陥による三つの一見無関係な状態。",
    s5p2: "Timothy症候群はカルシウムチャネル機能障害が多臓器的結果をもたらすことの最強の単一遺伝子エビデンスを提供する。Cav1.2ゲーティングへの単一擾乱——不活性化の失敗——が同一個人で心臓不整脈と神経発達障害の両方を引き起こすのに十分であることを示す。BERMフレームワークは慢性EMF曝露がより軽度だが類似の擾乱を産生すると提唱する：Cav1.2ゲーティングキネティクスの微妙な変化が年月を経て蓄積し、複数の臓器系にわたって臨床的に重要なカルシウム調節異常となる。",

    sec3Title: "TRPCチャネルとクリプトクロム",

    s6Title: "CRY2-TRPC1心臓複合体",
    s6p1: "TRPC（Transient Receptor Potential Canonical）チャネルは心室心筋細胞で確認されており、不整脈発生の基質として機能する。電位依存性カルシウムチャネルとは異なり、TRPCチャネルは機械的伸展や受容体作動性シグナリングを含む複数の刺激で活性化される非選択的カチオンチャネルである。",
    s6p2: "Yap 2025は筋芽細胞においてクリプトクロム2（CRY2）とTRPC1間の物理的複合体を実証した。CRY2はフラビンアデニンジヌクレオチド（FAD）依存性青色光光受容体である。CRY2-TRPC1複合体が心筋細胞で機能する場合——心臓組織に両タンパク質が存在することが示唆するように——TRPC1を通じた心臓のカルシウム流入は青色光とFAD酸化還元状態により調節される。これは心臓カルシウム調節のための直接的光感受性経路を生み出す。",

    s7Title: "概日不整脈仮説",
    s7Text: "CRY2-TRPC1シグナリングが心筋細胞で活性であれば、夜間電磁場曝露への影響は重大である。携帯電話画面の青色光がCRY2を活性化し、TRPC1媒介カルシウム流入を調節する。夜間、概日システムが暗闇を期待するとき、青色光曝露とデバイスからのRF-EMFが二重擾乱を生み出す：CRY2活性化がカルシウム流入経路（TRPC1）を開く一方、EMFが同時に電位依存性カルシウムチャネルを擾乱する。この収束は夜間の携帯電話使用が同等の日中使用よりも高い不整脈リスクを伴うと予測する——検証可能な時間生物学的予測。",

    sec4Title: "EMFエビデンスと予測",

    s8Title: "エビデンスの要約",
    s8Stats: [
      "EMF曝露ラットの血圧上昇（Mohamed）——SA結節カルシウムチャネル障害による慢性自律神経擾乱と整合",
      "左室肥大は慢性高血圧から発症——持続的血行動態ストレスの下流構造的結果",
      "複数のEMF曝露研究でHRV低下が記録——SA結節Cav3.1擾乱の予測された早期バイオマーカー",
      "ボリビアのTsimane集団：あらゆるヒト集団で記録された中で最低の心血管疾患有病率——ほぼゼロの環境EMF中で生活",
    ],

    s9Title: "BERM予測",
    s9Text: "BERMフレームワークは電磁場曝露の心臓効果について3つの具体的で検証可能な予測を生成する：",
    predictions: [
      {
        id: "HEART-1",
        text: "慢性EMF曝露はHRVを低下させる。SDNNおよびRMSSD指標で測定されたHRVは、年齢・体力・自律神経系薬剤を制御した上で、累積RF-EMF曝露と相関する用量依存的低下を示す。これは最も即座に検証可能な心臓予測——消費者ウェアラブルで集団規模で測定可能。",
        discriminating: true,
      },
      {
        id: "HEART-2",
        text: "夜間の携帯電話使用は同等の日中使用よりも高い不整脈リスクを産生する。心筋細胞におけるCRY2-TRPC1依存性カルシウム流入が概日脆弱性を生む：夜間の青色光+RF-EMFは暗闘中に静止している光感受性カルシウム経路を擾乱する。心房細動と心室性期外収縮の発生率は総日中曝露を制御した後の夜間スクリーン曝露時間と相関する。",
        discriminating: true,
      },
      {
        id: "HEART-3",
        text: "ファラデーシールド環境での睡眠は30日以内にHRVを改善する。夜間RF-EMF曝露の除去によりSA結節Cav3.1ウィンドウ電流がベースライン振動に復帰し、HRV指標に反映される自律神経バランスの測定可能な改善をもたらす。シールドvs非シールド睡眠環境を比較するランダム化クロスオーバー試験はシールド条件で有意なSDNN改善を示す。",
        discriminating: false,
      },
    ],

    references: "主要参考文献",
    refs: [
      {
        id: "mohamed-emf-blood-pressure",
        citation: "Mohamed et al.",
        referenceId: "mohamed-bp-emf",
        finding:
          "EMF曝露ラットの血圧上昇——自律神経調節異常と整合する慢性電磁場曝露への心血管生理的応答を実証。",
      },
      {
        id: "yap-2025-cry2-trpc1",
        citation: "Yap 2025",
        referenceId: "yap2025",
        finding:
          "筋芽細胞でCRY2-TRPC1物理的複合体を実証——心臓組織への影響を持つ直接的光感受性カルシウム流入経路を確立。",
      },
      {
        id: "timothy-syndrome-cacna1c",
        citation: "Splawski et al. 2004",
        referenceId: "splawski2004",
        finding:
          "CACNA1C G406R変異がTimothy症候群を引き起こす——単一カルシウムチャネル機能獲得変異によるQT延長・自閉症・合指症、Cav1.2障害の多臓器的結果を証明。",
      },
    ],

    discriminatingBadge: "識別的",
    allPredictions: "すべての予測 →",

    seeAlso: "関連ページ",
    brainModulome: "脳モジュローム",
    predictionsPage: "予測 — HEARTシリーズ",
    evidencePage: "エビデンスレジスター",
    modulomeOverview: "モジュローム概要",
  },
  fr: {
    title: "Coeur",
    subtitle:
      "Stimulation Cav3.1 du noeud SA et contraction Cav1.2 — la VFC comme biomarqueur CEM le plus precoce",
    backLink: "← Retour au modulome",

    sec1Title: "Stimulation du noeud SA",

    channelProfile: "Profil du canal",
    channel: "Canal",
    gene: "Gene",
    cellType: "Type cellulaire",
    function: "Fonction",
    level: "Niveau de preuve",
    channelVal: "Cav3.1 (T-type, stimulation SA) + Cav1.2 (L-type, contraction)",
    geneVal: "CACNA1G / CACNA1C",
    cellTypeVal: "Cellules pacemaker du noeud SA, cardiomyocytes ventriculaires",
    functionVal: "Generation de la frequence cardiaque, controle du rythme, force contractile",
    levelVal: "M",

    s2Title: "Mecanisme de stimulation du noeud SA",
    s2p1: "Le noeud sino-auriculaire (SA) est le stimulateur primaire du coeur. Les cellules du noeud SA utilisent les canaux calciques T-type Cav3.1 (CACNA1G) pour generer les depolarisations rythmiques qui initient chaque battement cardiaque. Les canaux T-type ont une propriete biophysique distinctive : ils s'activent a des potentiels membranaires tres negatifs (~-60mV) et presentent un courant de fenetre — un influx calcique petit mais continu au potentiel de repos ou environ 10 % des canaux restent ouverts.",
    s2p2: "Ce courant de fenetre n'est pas un defaut mais une fonctionnalite : il fournit la depolarisation diastolique lente qui pousse le noeud SA vers le seuil, generant le prochain battement. Le courant de fenetre existe parce que les courbes de tension d'activation et d'inactivation des canaux T-type se chevauchent — au potentiel de repos, certains canaux sont actives mais pas encore inactives, permettant une entree calcique a l'etat stable.",
    s2p3: "Parce que les canaux T-type operent au potentiel de repos — contrairement aux canaux L-type qui necessitent une depolarisation par potentiel d'action — ils sont continuellement susceptibles a la perturbation par champ electromagnetique. Meme de petits decalages de tension membranaire induits par les CEM peuvent alterer la fraction du courant de fenetre, modifiant le taux de depolarisation diastolique et donc la variabilite de la frequence cardiaque.",

    s3Title: "VFC — Le biomarqueur CEM le plus precoce",
    s3Text: "La variabilite de la frequence cardiaque (VFC) reflete la variation battement par battement de la frequence cardiaque entrainee par la modulation du systeme nerveux autonome de la stimulation du noeud SA. Parce que les canaux Cav3.1 du noeud SA sont continuellement actifs au repos via leur courant de fenetre, la perturbation induite par les CEM de ces canaux altere directement la dynamique de stimulation. Cela fait de la reduction de la VFC potentiellement le biomarqueur CEM mesurable le plus precoce — elle ne necessite aucun dommage tissulaire, seulement la perturbation fonctionnelle d'un canal ionique deja operationnel au potentiel de repos. Les changements de VFC peuvent etre detectes avec des dispositifs portables grand public, rendant cette prediction immediatement testable a l'echelle de la population.",

    sec2Title: "Contraction du cardiomyocyte",

    s4Title: "Couplage excitation-contraction Cav1.2",
    s4p1: "Les cardiomyocytes ventriculaires utilisent les canaux calciques L-type Cav1.2 (CACNA1C) pour le couplage excitation-contraction — le processus par lequel un potentiel d'action electrique declenche une contraction mecanique. Lorsque le potentiel d'action depolarise la membrane du cardiomyocyte a environ -30mV, les canaux Cav1.2 s'activent et admettent du Ca²⁺, qui declenche la liberation de calcium induite par le calcium (CICR) du reticulum sarcoplasmique, produisant la contraction.",
    s4p2: "Distinction critique : contrairement au Cav3.1 du noeud SA (qui opere au potentiel de repos), le Cav1.2 ne s'active que pendant la phase du potentiel d'action a ~-30mV. Au potentiel de repos (~-85mV), les canaux Cav1.2 sont fermes. Cela signifie que Cav1.2 n'est sensible aux CEM que pendant la breve fenetre du potentiel d'action — pas continuellement. Cependant, les mutations gain-de-fonction de CACNA1C qui augmentent le courant de fenetre de Cav1.2 demontrent ce qui se passe quand ce mecanisme de porte est perturbe : le courant de fenetre s'elargit, permettant l'entree de calcium a des tensions ou les canaux devraient etre fermes, produisant un allongement du QT et un risque d'arythmie.",

    s5Title: "Syndrome de Timothy — Preuve du mecanisme",
    s5p1: "Le syndrome de Timothy est cause par une mutation ponctuelle unique dans CACNA1C (G406R) qui empeche Cav1.2 de s'inactiver correctement. Le canal reste ouvert trop longtemps pendant chaque potentiel d'action, admettant un exces de Ca²⁺. Cette mutation unique cause simultanement : le syndrome du QT long (cardiaque), le trouble du spectre autistique (neurologique) et la syndactylie (developpementale) — trois conditions apparemment sans rapport a partir d'un seul defaut de canal calcique.",
    s5p2: "Le syndrome de Timothy fournit la preuve par gene unique la plus forte que la dysfonction des canaux calciques a des consequences multi-organes. Il demontre qu'une seule perturbation du mecanisme de porte de Cav1.2 — l'echec d'inactivation — suffit a causer a la fois une arythmie cardiaque et un trouble neurodeveloppemental chez le meme individu. Le cadre BERM propose que l'exposition chronique aux CEM produit une perturbation plus legere mais analogue : des decalages subtils de la cinetique de porte de Cav1.2 qui, soutenus sur des annees, s'accumulent en une dysregulation calcique cliniquement significative a travers plusieurs systemes d'organes.",

    sec3Title: "Canaux TRPC et cryptochrome",

    s6Title: "Complexe cardiaque CRY2-TRPC1",
    s6p1: "Les canaux TRPC (Transient Receptor Potential Canonical) ont ete confirmes dans les cardiomyocytes ventriculaires, ou ils servent de substrat pour la generation d'arythmies. Contrairement aux canaux calciques voltage-dependants, les canaux TRPC sont des canaux cationiques non selectifs qui peuvent etre actives par de multiples stimuli incluant l'etirement mecanique et la signalisation operee par recepteur.",
    s6p2: "Yap 2025 a demontre un complexe physique entre le cryptochrome 2 (CRY2) et TRPC1 dans les myoblastes. CRY2 est un photorecepteur de lumiere bleue dependant du flavine adenine dinucleotide (FAD). Si le complexe CRY2-TRPC1 opere dans les cardiomyocytes — comme la presence des deux proteines dans le tissu cardiaque le suggere — alors l'entree calcique cardiaque par TRPC1 est modulee par la lumiere bleue et l'etat redox du FAD. Cela cree une voie photosensible directe pour la regulation calcique cardiaque.",

    s7Title: "Hypothese d'arythmie circadienne",
    s7Text: "Si la signalisation CRY2-TRPC1 est active dans les cardiomyocytes, les implications pour l'exposition electromagnetique nocturne sont significatives. La lumiere bleue des ecrans de telephone active CRY2, qui module l'entree calcique mediee par TRPC1. La nuit, quand le systeme circadien attend l'obscurite, l'exposition a la lumiere bleue combinee au RF-CEM du dispositif cree une double perturbation : l'activation de CRY2 ouvre une voie d'entree calcique (TRPC1) tandis que le CEM perturbe simultanement les canaux calciques voltage-dependants. Cette convergence predit que l'utilisation nocturne du telephone comporte un risque d'arythmie plus eleve qu'une utilisation diurne equivalente — une prediction chronobiologique testable.",

    sec4Title: "Preuves CEM et predictions",

    s8Title: "Resume des preuves",
    s8Stats: [
      "Elevation de la pression arterielle chez les rats exposes aux CEM (Mohamed) — coherent avec une perturbation autonomique chronique via la disruption des canaux calciques du noeud SA",
      "L'hypertrophie ventriculaire gauche se developpe a partir de l'hypertension chronique — consequence structurelle en aval du stress hemodynamique soutenu",
      "Reduction de la VFC documentee dans de multiples etudes d'exposition aux CEM — le biomarqueur precoce predit de la perturbation du Cav3.1 du noeud SA",
      "Population Tsimane de Bolivie : prevalence de maladies cardiovasculaires la plus basse jamais enregistree dans toute population humaine — vivant dans un environnement de CEM ambiant quasi nul",
    ],

    s9Title: "Predictions BERM",
    s9Text: "Le cadre BERM genere trois predictions specifiques et testables pour les effets cardiaques de l'exposition aux champs electromagnetiques :",
    predictions: [
      {
        id: "HEART-1",
        text: "L'exposition chronique aux CEM reduit la VFC. La VFC mesuree par les metriques SDNN et RMSSD montrera une reduction dose-dependante correlee a l'exposition cumulative RF-CEM, en controlant l'age, la forme physique et les medications autonomiques. C'est la prediction cardiaque la plus immediatement testable — mesurable avec des portables grand public a l'echelle de la population.",
        discriminating: true,
      },
      {
        id: "HEART-2",
        text: "L'utilisation nocturne du telephone produit un risque d'arythmie plus eleve qu'une utilisation diurne equivalente. L'entree calcique dependante de CRY2-TRPC1 dans les cardiomyocytes cree une vulnerabilite circadienne : lumiere bleue + RF-CEM la nuit perturbe une voie calcique photosensible quiescente dans l'obscurite. Les taux de fibrillation auriculaire et de contractions ventriculaires prematurees seront correles a la duree d'exposition nocturne aux ecrans apres controle de l'exposition quotidienne totale.",
        discriminating: true,
      },
      {
        id: "HEART-3",
        text: "Dormir dans un environnement blinde par cage de Faraday ameliore la VFC dans les 30 jours. La suppression de l'exposition nocturne au RF-CEM permet au courant de fenetre Cav3.1 du noeud SA de revenir a son oscillation de base, ameliorant de maniere mesurable l'equilibre autonomique refletes dans les metriques VFC. Un essai croise randomise comparant des environnements de sommeil blindes et non blindes montrera une amelioration significative du SDNN dans la condition blindee.",
        discriminating: false,
      },
    ],

    references: "References cles",
    refs: [
      {
        id: "mohamed-emf-blood-pressure",
        citation: "Mohamed et al.",
        referenceId: "mohamed-bp-emf",
        finding:
          "Elevation de la pression arterielle chez les rats exposes aux CEM — demontre une reponse physiologique cardiovasculaire a l'exposition chronique aux champs electromagnetiques coherente avec une dysregulation autonomique.",
      },
      {
        id: "yap-2025-cry2-trpc1",
        citation: "Yap 2025",
        referenceId: "yap2025",
        finding:
          "Complexe physique CRY2-TRPC1 demontre dans les myoblastes — etablit une voie directe photosensible d'entree calcique avec des implications pour le tissu cardiaque.",
      },
      {
        id: "timothy-syndrome-cacna1c",
        citation: "Splawski et al. 2004",
        referenceId: "splawski2004",
        finding:
          "La mutation CACNA1C G406R cause le syndrome de Timothy — QT long, autisme et syndactylie a partir d'une seule mutation gain-de-fonction de canal calcique, prouvant les consequences multi-organes de la perturbation de Cav1.2.",
      },
    ],

    discriminatingBadge: "Discriminant",
    allPredictions: "Toutes les predictions →",

    seeAlso: "Voir aussi",
    brainModulome: "Modulome cerebral",
    predictionsPage: "Predictions — serie HEART",
    evidencePage: "Registre des preuves",
    modulomeOverview: "Apercu du modulome",
  },
  ko: {
    title: "심장",
    subtitle:
      "SA결절 Cav3.1 페이스메이킹과 Cav1.2 수축 — 가장 이른 EMF 바이오마커로서의 HRV",
    backLink: "← 모듈롬으로 돌아가기",

    sec1Title: "SA결절 페이스메이킹",

    channelProfile: "채널 프로파일",
    channel: "채널",
    gene: "유전자",
    cellType: "세포 유형",
    function: "기능",
    level: "근거 수준",
    channelVal: "Cav3.1 (T형, SA 페이스메이킹) + Cav1.2 (L형, 수축)",
    geneVal: "CACNA1G / CACNA1C",
    cellTypeVal: "SA결절 페이스메이커 세포, 심실 심근세포",
    functionVal: "심박수 생성, 리듬 제어, 수축력",
    levelVal: "M",

    s2Title: "SA결절 페이스메이킹 메커니즘",
    s2p1: "동방결절(SA결절)은 심장의 주요 페이스메이커이다. SA결절 세포는 Cav3.1(CACNA1G) T형 전압 의존 칼슘 채널을 사용하여 각 심박을 시작하는 리듬적 탈분극을 생성한다. T형 채널은 독특한 생물물리학적 특성을 갖는다: 매우 음의 막전위(약 -60mV)에서 활성화되며 윈도우 전류를 나타낸다 — 안정 막전위에서의 작지만 지속적인 칼슘 유입으로 약 10%의 채널이 개방 상태를 유지한다.",
    s2p2: "이 윈도우 전류는 결함이 아닌 기능이다: SA결절을 역치로 구동하는 느린 확장기 탈분극을 제공하여 다음 심박을 생성한다. 윈도우 전류는 T형 채널의 활성화 및 비활성화 전압 곡선이 중첩되기 때문에 존재한다 — 안정 전위에서 일부 채널은 활성화되었지만 아직 비활성화되지 않아 정상 상태 칼슘 유입을 허용한다.",
    s2p3: "T형 채널은 안정 전위에서 작동하므로 — 활동 전위 탈분극을 필요로 하는 L형 채널과 달리 — 전자기장 교란에 지속적으로 감수성이 있다. EMF에 의한 작은 막전압 변화도 윈도우 전류 비율을 변화시켜 확장기 탈분극 속도, 따라서 심박 변이도를 수정할 수 있다.",

    s3Title: "HRV — 가장 이른 EMF 바이오마커",
    s3Text: "심박 변이도(HRV)는 SA결절 페이스메이킹의 자율신경계 조절에 의한 박동별 심박수 변동을 반영한다. SA결절 Cav3.1 채널은 윈도우 전류를 통해 안정 시 지속적으로 활동하므로 이러한 채널에 대한 EMF 유도 교란은 페이스메이킹 역학을 직접 변화시킨다. 이는 HRV 감소를 잠재적으로 가장 이른 측정 가능한 EMF 바이오마커로 만든다 — 조직 손상이 아닌 이미 안정 전위에서 작동 중인 이온 채널의 기능적 교란만을 필요로 한다. HRV 변화는 소비자 웨어러블 장치로 감지 가능하여 이 예측을 집단 규모에서 즉시 검증 가능하게 한다.",

    sec2Title: "심근세포 수축",

    s4Title: "Cav1.2 흥분-수축 연결",
    s4p1: "심실 심근세포는 흥분-수축 연결을 위해 Cav1.2(CACNA1C) L형 전압 의존 칼슘 채널을 사용한다 — 전기적 활동 전위가 기계적 수축을 유발하는 과정이다. 활동 전위가 심근세포 막을 약 -30mV로 탈분극시키면 Cav1.2 채널이 활성화되어 Ca²⁺를 통과시키고, 근소포체로부터의 칼슘 유도 칼슘 방출(CICR)을 유발하여 수축을 산출한다.",
    s4p2: "중요한 구분: SA결절 Cav3.1(안정 전위에서 작동)과 달리 Cav1.2는 활동 전위 단계의 약 -30mV에서만 활성화된다. 안정 막전위(약 -85mV)에서 Cav1.2 채널은 닫혀 있다. 이는 Cav1.2가 짧은 활동 전위 윈도우 동안에만 EMF 감수성이 있음을 의미한다 — 지속적이 아니다. 그러나 Cav1.2 윈도우 전류를 증가시키는 CACNA1C 기능 획득 돌연변이는 이 게이팅이 교란될 때의 결과를 보여준다: 윈도우 전류가 확대되어 채널이 닫혀 있어야 할 전압에서 칼슘 유입을 허용하여 QT 연장과 부정맥 위험을 산출한다.",

    s5Title: "Timothy 증후군 — 메커니즘의 증명",
    s5p1: "Timothy 증후군은 Cav1.2의 적절한 비활성화를 방해하는 CACNA1C의 단일 점 돌연변이(G406R)에 의해 야기된다. 채널이 각 활동 전위 동안 너무 오래 개방되어 과도한 Ca²⁺를 통과시킨다. 이 단일 돌연변이는 동시에 QT 연장 증후군(심장), 자폐 스펙트럼 장애(신경), 합지증(발달)을 야기한다 — 하나의 칼슘 채널 결함에서 비롯된 세 가지 외견상 무관한 상태.",
    s5p2: "Timothy 증후군은 칼슘 채널 기능장애가 다장기 결과를 초래한다는 최강의 단일 유전자 근거를 제공한다. Cav1.2 게이팅에 대한 단일 교란 — 비활성화 실패 — 이 동일 개인에서 심장 부정맥과 신경발달 장애 모두를 야기하기에 충분함을 보여준다. BERM 프레임워크는 만성 EMF 노출이 더 경미하지만 유사한 교란을 산출한다고 제안한다: 수년에 걸쳐 축적되어 여러 장기 시스템에 걸쳐 임상적으로 중요한 칼슘 조절이상이 되는 Cav1.2 게이팅 키네틱스의 미묘한 변화.",

    sec3Title: "TRPC 채널과 크립토크롬",

    s6Title: "CRY2-TRPC1 심장 복합체",
    s6p1: "TRPC(Transient Receptor Potential Canonical) 채널은 심실 심근세포에서 확인되었으며 부정맥 발생의 기질로 기능한다. 전압 의존 칼슘 채널과 달리 TRPC 채널은 기계적 신장과 수용체 작동 신호전달을 포함한 다중 자극에 의해 활성화될 수 있는 비선택적 양이온 채널이다.",
    s6p2: "Yap 2025는 근아세포에서 크립토크롬 2(CRY2)와 TRPC1 사이의 물리적 복합체를 입증했다. CRY2는 플라빈 아데닌 다이뉴클레오타이드(FAD) 의존성 청색광 광수용체이다. CRY2-TRPC1 복합체가 심근세포에서 작동한다면 — 심장 조직에 두 단백질이 존재하는 것이 시사하듯 — TRPC1을 통한 심장 칼슘 유입은 청색광과 FAD 산화환원 상태에 의해 조절된다. 이는 심장 칼슘 조절을 위한 직접적 광감수성 경로를 생성한다.",

    s7Title: "일주기 부정맥 가설",
    s7Text: "CRY2-TRPC1 신호전달이 심근세포에서 활성이라면 야간 전자기 노출에 대한 함의는 중대하다. 휴대폰 화면의 청색광이 CRY2를 활성화하여 TRPC1 매개 칼슘 유입을 조절한다. 야간에 일주기 시스템이 암흑을 기대할 때 청색광 노출과 기기의 RF-EMF가 이중 교란을 생성한다: CRY2 활성화가 칼슘 유입 경로(TRPC1)를 열면서 EMF가 동시에 전압 의존 칼슘 채널을 교란한다. 이 수렴은 야간 휴대폰 사용이 동등한 주간 사용보다 높은 부정맥 위험을 수반한다고 예측한다 — 검증 가능한 시간생물학적 예측.",

    sec4Title: "EMF 근거와 예측",

    s8Title: "근거 요약",
    s8Stats: [
      "EMF 노출 쥐의 혈압 상승(Mohamed) — SA결절 칼슘 채널 교란을 통한 만성 자율신경 교란과 일치",
      "좌심실 비대는 만성 고혈압에서 발생 — 지속적 혈역학 스트레스의 하류 구조적 결과",
      "다수 EMF 노출 연구에서 HRV 감소 기록 — SA결절 Cav3.1 교란의 예측된 조기 바이오마커",
      "볼리비아 Tsimane 집단: 모든 인간 집단 중 기록된 최저 심혈관 질환 유병률 — 거의 0의 주변 EMF 환경에서 생활",
    ],

    s9Title: "BERM 예측",
    s9Text: "BERM 프레임워크는 전자기장 노출의 심장 효과에 대해 세 가지 구체적이고 검증 가능한 예측을 생성한다:",
    predictions: [
      {
        id: "HEART-1",
        text: "만성 EMF 노출은 HRV를 감소시킨다. SDNN 및 RMSSD 지표로 측정된 HRV는 연령, 체력, 자율신경계 약물을 통제한 상태에서 누적 RF-EMF 노출과 상관하는 용량 의존적 감소를 보일 것이다. 이것은 가장 즉시 검증 가능한 심장 예측 — 소비자 웨어러블로 집단 규모에서 측정 가능.",
        discriminating: true,
      },
      {
        id: "HEART-2",
        text: "야간 휴대폰 사용은 동등한 주간 사용보다 높은 부정맥 위험을 산출한다. 심근세포에서의 CRY2-TRPC1 의존성 칼슘 유입이 일주기 취약성을 생성한다: 야간 청색광 + RF-EMF는 암흑 중 휴지 상태인 광감수성 칼슘 경로를 교란한다. 심방세동과 심실조기수축 발생률은 총 일일 노출을 통제한 후 야간 스크린 노출 시간과 상관할 것이다.",
        discriminating: true,
      },
      {
        id: "HEART-3",
        text: "패러데이 차폐 환경에서의 수면은 30일 이내에 HRV를 개선한다. 야간 RF-EMF 노출 제거로 SA결절 Cav3.1 윈도우 전류가 기준 진동으로 복귀하여 HRV 지표에 반영되는 자율신경 균형의 측정 가능한 개선을 가져온다. 차폐 vs 비차폐 수면 환경을 비교하는 무작위 교차 시험은 차폐 조건에서 유의한 SDNN 개선을 보일 것이다.",
        discriminating: false,
      },
    ],

    references: "주요 참고문헌",
    refs: [
      {
        id: "mohamed-emf-blood-pressure",
        citation: "Mohamed et al.",
        referenceId: "mohamed-bp-emf",
        finding:
          "EMF 노출 쥐의 혈압 상승 — 자율신경 조절이상과 일치하는 만성 전자기장 노출에 대한 심혈관 생리적 반응을 입증.",
      },
      {
        id: "yap-2025-cry2-trpc1",
        citation: "Yap 2025",
        referenceId: "yap2025",
        finding:
          "근아세포에서 CRY2-TRPC1 물리적 복합체 입증 — 심장 조직에 대한 함의를 가진 직접적 광감수성 칼슘 유입 경로 확립.",
      },
      {
        id: "timothy-syndrome-cacna1c",
        citation: "Splawski et al. 2004",
        referenceId: "splawski2004",
        finding:
          "CACNA1C G406R 돌연변이가 Timothy 증후군을 야기 — 단일 칼슘 채널 기능 획득 돌연변이에 의한 QT 연장, 자폐증, 합지증으로 Cav1.2 교란의 다장기 결과를 증명.",
      },
    ],

    discriminatingBadge: "식별적",
    allPredictions: "모든 예측 →",

    seeAlso: "관련 페이지",
    brainModulome: "뇌 모듈롬",
    predictionsPage: "예측 — HEART 시리즈",
    evidencePage: "근거 레지스터",
    modulomeOverview: "모듈롬 개요",
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const d = pickCopy(COPY, locale);
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
  const d = pickCopy(COPY, locale);

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
                    {d.discriminatingBadge}
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
          {d.allPredictions}
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
                <CitationLink referenceId={ref.referenceId} locale={locale} citation={ref.citation} />
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
