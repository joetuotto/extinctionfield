import type { Metadata } from "next";
import Link from "next/link";
import { Flame } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";

const COPY = {
  en: {
    title: "Brown Adipose Tissue",
    subtitle:
      "VGCC → Ca²⁺ → CaMKII: two independent thermogenic pathways disrupted",
    backLink: "← Back to Modulome",

    /* --- SECTION 1: BAT Channel Architecture --- */
    s1SectionTitle: "BAT Channel Architecture",

    /* 01 Channel Profile */
    channelProfile: "Channel Profile",
    channel: "Channel",
    gene: "Gene",
    cellType: "Cell type",
    function: "Function",
    level: "Evidence level",
    channelVal: "VGCC (voltage-gated calcium channels)",
    geneVal: "CACNA1H (Cav3.2) — CaMKII downstream",
    cellTypeVal: "Brown adipocytes",
    functionVal:
      "Thermogenesis via UCP1 transcription + SERCA2b/RyR2 Ca²⁺ cycling",
    levelVal: "E",

    /* --- SECTION 2: Dual Thermogenic Mechanisms --- */
    s2SectionTitle: "Dual Thermogenic Mechanisms",

    /* 02 UCP1 Pathway */
    s2Title: "Pathway 1: CaMKII → UCP1 Transcription",
    s2Chain:
      "VGCC → Ca²⁺ → CaMKII → CREB phosphorylation → UCP1 transcription ↓ → proton leak ↓ → thermogenesis ↓",
    s2p1: "UCP1 (uncoupling protein 1) is the defining protein of brown adipose tissue. It sits in the inner mitochondrial membrane and dissipates the proton gradient as heat instead of ATP — the molecular basis of non-shivering thermogenesis. UCP1 expression is regulated by the CaMKII/CREB signaling axis: Ca²⁺ influx through VGCCs activates CaMKII, which phosphorylates CREB, which drives UCP1 gene transcription.",
    s2p2: "EMF-induced disruption of VGCC gating alters Ca²⁺ dynamics in brown adipocytes. The downstream effect is reduced CaMKII activation, impaired CREB phosphorylation, and decreased UCP1 transcription. With less UCP1, the mitochondrial proton leak is diminished, and the cell burns fewer calories as heat. The thermogenic capacity of BAT is degraded even when the tissue itself remains anatomically intact.",
    s2p3: "This pathway is dose- and time-dependent. Maalouf et al. (2023) demonstrated that 900 MHz exposure at SAR 0.1–0.4 W/kg reduced BAT thermogenesis and mitochondrial activity in a dose-response manner — precisely the pattern predicted by a VGCC-mediated mechanism.",

    /* 03 Ca²⁺ Cycling Pathway */
    s3Title: "Pathway 2: SERCA2b/RyR2 Ca²⁺ Futile Cycling",
    s3Chain:
      "SERCA2b pumps Ca²⁺ into ER → RyR2 releases Ca²⁺ back → cycle repeats → ATP hydrolyzed as heat",
    s3p1: "Independent of UCP1, brown adipocytes possess a second thermogenic mechanism: the SERCA2b/RyR2 calcium futile cycle. SERCA2b (sarco/endoplasmic reticulum Ca²⁺-ATPase 2b) pumps cytoplasmic Ca²⁺ into the endoplasmic reticulum, consuming ATP. The ryanodine receptor RyR2 then releases the Ca²⁺ back into the cytoplasm. This cycle repeats continuously, converting ATP energy into heat without any productive work — a thermogenic \"futile cycle.\"",
    s3p2: "This mechanism is entirely Ca²⁺-dependent and thus directly susceptible to VGCC perturbation. EMF-induced alterations in intracellular Ca²⁺ homeostasis disrupt both the SERCA2b pump rate and RyR2 release dynamics, degrading the futile cycle's thermogenic output. Because this pathway operates independently of UCP1, EMF exposure simultaneously impairs BOTH thermogenic mechanisms — a double hit on the cell's calorie-burning capacity.",

    /* --- SECTION 3: Evidence --- */
    s3SectionTitle: "Key Evidence",

    /* 04 Maalouf 2023 */
    s4Title: "Maalouf et al. 2023 (PMC10342026)",
    s4p1: "900 MHz RF-EMF exposure at SAR 0.1–0.4 W/kg reduced BAT thermogenesis and mitochondrial activity. The effect was dose- and time-dependent — higher SAR and longer exposure produced greater suppression. This study provides direct measurement of EMF-induced thermogenic impairment at exposure levels within the range of mobile phone use.",
    s4Badge: "E — direct measurement, dose-response",

    /* 05 French 5G Study 2025 */
    s5Title: "5G Differentiation Study 2025 (PMC11942954)",
    s5p1: "A French research group exposed preadipocytes to 5G frequencies (3.5 GHz) and measured expression of key brown adipocyte differentiation markers. Results:",
    s5Stats: [
      "PRDM16 expression: −49% — the master transcription factor for brown adipocyte identity",
      "C/EBPβ expression: −32% — essential for brown adipocyte differentiation program",
    ],
    s5p2: "PRDM16 is the defining transcription factor that determines whether a precursor cell becomes a brown adipocyte or a white adipocyte. A 49% reduction means that nearly half the potential brown fat cell differentiation is blocked. C/EBPβ cooperates with PRDM16 in the brown fat gene program. Together, these reductions indicate that 5G exposure substantially impairs the body's ability to generate new brown adipocytes — reducing not just the activity of existing BAT, but the tissue's capacity for renewal.",

    /* --- SECTION 4: CaMKII Convergence --- */
    s4SectionTitle: "CaMKII Convergence",

    /* 06 CaMKII Connection */
    s6Title: "The CaMKII Hub: Same Molecule, Multiple Organs",
    s6p1: "The CaMKII that mediates BAT thermogenesis is the same calcium/calmodulin-dependent protein kinase II that operates across the BERM modulome:",
    s6Points: [
      "In BAT: CaMKII → CREB → UCP1 transcription (thermogenesis)",
      "In testes: CaMKII shifts Cav3.2 activation threshold → StAR regulation (steroidogenesis)",
      "In brain: CaMKII → synaptic plasticity, memory consolidation",
      "In heart: CaMKII → arrhythmogenesis under Ca²⁺ overload",
    ],
    s6p2: "This convergence is not coincidental. CaMKII is a direct downstream effector of VGCC-mediated Ca²⁺ influx. Any perturbation of VGCCs — whether by EMF, pharmacological blockade, or genetic mutation — propagates through CaMKII to all its downstream targets simultaneously. The BAT thermogenesis pathway is one arm of a multi-organ cascade that also drives infertility, neurodegeneration, and cardiac dysfunction through the same upstream mechanism.",
    s6LinkText: "Full CaMKII convergence model",

    /* --- SECTION 5: Clinical Parallel & Epistemic Context --- */
    s5SectionTitle: "Clinical Context",

    /* 07 Cold Exposure */
    s7Title: "Clinical Parallel: Cold Exposure Therapy",
    s7p1: "Cold exposure therapy (cold plunges, cold showers, cryotherapy) activates BAT thermogenesis via the same Ca²⁺ signaling pathways that EMF disrupts. Cold stress triggers sympathetic activation → norepinephrine release → β3-adrenergic receptor → Ca²⁺ signaling cascade → CaMKII → UCP1 activation. The clinical efficacy of cold exposure for metabolic health, weight management, and insulin sensitivity improvement is well-documented.",
    s7p2: "This creates a mechanistic symmetry: cold exposure ACTIVATES the VGCC → Ca²⁺ → CaMKII → UCP1 pathway; EMF exposure DISRUPTS it. The same molecular machinery is the target of both interventions, operating in opposite directions. This parallel provides independent clinical validation that the pathway is real and metabolically significant — if cold can upregulate it, EMF can downregulate it.",

    /* 08 Epistemic Note */
    s8Title: "Epistemic Note",
    s8p1: "Obesity is a multifactorial condition. Diet, physical activity, genetics, gut microbiome, sleep, stress, and endocrine disruptors all contribute to energy balance. EMF-induced BAT impairment is ONE contributing factor within this complex landscape — not the sole cause.",
    s8p2: "The BERM framework does not claim that EMF causes obesity. It identifies a specific, measurable mechanism (VGCC → Ca²⁺ → CaMKII → UCP1/SERCA2b) by which EMF reduces thermogenic calorie burning. The magnitude (PRDM16 −49%, C/EBPβ −32%) indicates this is a non-trivial contribution to energy balance, but its relative weight alongside diet, exercise, and other factors remains to be quantified in population studies.",

    /* See also */
    seeAlso: "See also",
    modulomeOverview: "Modulome overview",
    testesPage: "Testes (CaMKII → StAR)",
    pancreasPage: "Pancreas (β-cell VGCC)",
    brainPage: "Brain (VGCC → Alzheimer's)",
    predictionsPage: "Predictions register",
  },
  fi: {
    title: "Ruskea rasvakudos",
    subtitle:
      "VGCC → Ca²⁺ → CaMKII: kaksi itsenäistä termogeneesireittiä häiriintynyt",
    backLink: "← Takaisin moduloomiin",

    /* --- OSIO 1: BAT-kanava-arkkitehtuuri --- */
    s1SectionTitle: "BAT-kanava-arkkitehtuuri",

    /* 01 Kanavaprofiili */
    channelProfile: "Kanavaprofiili",
    channel: "Kanava",
    gene: "Geeni",
    cellType: "Solutyyppi",
    function: "Toiminto",
    level: "Evidenssitaso",
    channelVal: "VGCC (jänniteohjatut kalsiumkanavat)",
    geneVal: "CACNA1H (Cav3.2) — CaMKII alajuoksulla",
    cellTypeVal: "Ruskeat adiposyytit",
    functionVal:
      "Termogeneesi UCP1-transkription + SERCA2b/RyR2 Ca²⁺ -kierron kautta",
    levelVal: "E",

    /* --- OSIO 2: Kaksoistermogeneesimekanismit --- */
    s2SectionTitle: "Kaksoistermogeneesimekanismit",

    /* 02 UCP1-reitti */
    s2Title: "Reitti 1: CaMKII → UCP1-transkriptio",
    s2Chain:
      "VGCC → Ca²⁺ → CaMKII → CREB-fosforylaatio → UCP1-transkriptio ↓ → protonivuoto ↓ → termogeneesi ↓",
    s2p1: "UCP1 (irtikytkentäproteiini 1) on ruskean rasvakudoksen tunnusproteiini. Se sijaitsee mitokondrion sisäkalvolla ja haihduttaa protonierot lämpönä ATP:n sijaan — paleleemattoman termogeneesin molekulaarinen perusta. UCP1-ekspressiota säätelee CaMKII/CREB-signalointiakseli: Ca²⁺-sisäänvirtaus VGCC:iden kautta aktivoi CaMKII:n, joka fosforyloi CREB:n, joka ajaa UCP1-geenin transkriptiota.",
    s2p2: "EMF-indusoitu VGCC-avautumisen häiriö muuttaa Ca²⁺-dynamiikkaa ruskeissa adiposyyteissä. Alavirran vaikutus on CaMKII-aktivaation väheneminen, CREB-fosforylaation heikentyminen ja UCP1-transkription lasku. Vähemmällä UCP1:llä mitokondriaalinen protonivuoto pienenee, ja solu polttaa vähemmän kaloreita lämpönä. BAT:n termogeneettinen kapasiteetti heikkenee, vaikka kudos itsessään pysyisi anatomisesti ehjänä.",
    s2p3: "Tämä reitti on annos- ja aikariippuvainen. Maalouf ym. (2023) osoittivat, että 900 MHz:n altistus SAR-tasoilla 0,1–0,4 W/kg vähensi BAT-termogeneesiä ja mitokondriaalista aktiivisuutta annosvasteisesti — täsmälleen VGCC-välitteisen mekanismin ennustama kuvio.",

    /* 03 Ca²⁺ -kiertoreitti */
    s3Title: "Reitti 2: SERCA2b/RyR2 Ca²⁺ -turha kierto",
    s3Chain:
      "SERCA2b pumppaa Ca²⁺:n ER:iin → RyR2 vapauttaa Ca²⁺:n takaisin → kierto toistuu → ATP hydrolysoituu lämmöksi",
    s3p1: "UCP1:stä riippumatta ruskeat adiposyytit omaavat toisen termogeneettisen mekanismin: SERCA2b/RyR2-kalsiumin turhan kierron. SERCA2b (sarko/endoplasmakalvoston Ca²⁺-ATPaasi 2b) pumppaa sytoplasman Ca²⁺:n endoplasmakalvostoon kuluttaen ATP:tä. Ryanodiinireseptori RyR2 vapauttaa Ca²⁺:n takaisin sytoplasmaan. Kierto toistuu jatkuvasti, muuntaen ATP-energian lämmöksi ilman tuottavaa työtä — termogeneettinen \"turha kierto\".",
    s3p2: "Tämä mekanismi on täysin Ca²⁺-riippuvainen ja siten suoraan altis VGCC-häiriölle. EMF-indusoidut muutokset solunsisäisessä Ca²⁺-homeostaasissa häiritsevät sekä SERCA2b-pumpun nopeutta että RyR2:n vapautumisdynamiikkaa, heikentäen turhan kierron termogeneettistä tuottoa. Koska tämä reitti toimii UCP1:stä riippumatta, EMF-altistus heikentää samanaikaisesti MOLEMPIA termogeneesimekanismeja — kaksoisosuma solun kalorinpolttamiskapasiteettiin.",

    /* --- OSIO 3: Evidenssi --- */
    s3SectionTitle: "Keskeinen evidenssi",

    /* 04 Maalouf 2023 */
    s4Title: "Maalouf ym. 2023 (PMC10342026)",
    s4p1: "900 MHz:n RF-EMF-altistus SAR-tasoilla 0,1–0,4 W/kg vähensi BAT-termogeneesiä ja mitokondriaalista aktiivisuutta. Vaikutus oli annos- ja aikariippuvainen — korkeampi SAR ja pidempi altistus tuottivat suuremman suppression. Tutkimus tarjoaa suoran mittauksen EMF-indusoidusta termogeneettisestä heikentymisestä altistustasoilla, jotka ovat matkapuhelinkäytön alueella.",
    s4Badge: "E — suora mittaus, annosvaste",

    /* 05 Ranskalainen 5G-tutkimus 2025 */
    s5Title: "5G-differentiaatiotutkimus 2025 (PMC11942954)",
    s5p1: "Ranskalainen tutkimusryhmä altisti esiadipotypyyttejä 5G-taajuuksille (3,5 GHz) ja mittasi ruskean adiposyytin keskeisten differentiaatiomarkkereiden ekspression. Tulokset:",
    s5Stats: [
      "PRDM16-ekspressio: −49 % — ruskean adiposyytin identiteetin päätranskriptiotekijä",
      "C/EBPβ-ekspressio: −32 % — välttämätön ruskean adiposyytin differentiaatio-ohjelmalle",
    ],
    s5p2: "PRDM16 on se transkriptiotekijä, joka määrää kehittyykö esiastesolu ruskeaksi vai valkeaksi adiposyytiksi. 49 %:n lasku tarkoittaa, että lähes puolet potentiaalisesta ruskean rasvasolun differentiaatiosta estyy. C/EBPβ toimii yhteistyössä PRDM16:n kanssa ruskean rasvan geeniohjelmassa. Yhdessä nämä vähennykset osoittavat, että 5G-altistus heikentää merkittävästi kehon kykyä tuottaa uusia ruskeita adiposyyttejä — vähentäen paitsi olemassa olevan BAT:n aktiivisuutta, myös kudoksen uusiutumiskapasiteettia.",

    /* --- OSIO 4: CaMKII-konvergenssi --- */
    s4SectionTitle: "CaMKII-konvergenssi",

    /* 06 CaMKII-yhteys */
    s6Title: "CaMKII-solmukohta: sama molekyyli, useita elimiä",
    s6p1: "BAT-termogeneesiä välittävä CaMKII on sama kalsiumin/kalmoduliiniriippuvainen proteiinikinaasi II, joka toimii koko BERM-moduloomissa:",
    s6Points: [
      "BAT:ssa: CaMKII → CREB → UCP1-transkriptio (termogeneesi)",
      "Kiveksissä: CaMKII siirtää Cav3.2:n aktivaatiokynnystä → StAR-säätely (steroidogeneesi)",
      "Aivoissa: CaMKII → synaptinen plastisuus, muistin konsolidaatio",
      "Sydämessä: CaMKII → arytmogeneesi Ca²⁺-ylikuormituksessa",
    ],
    s6p2: "Tämä konvergenssi ei ole sattumaa. CaMKII on VGCC-välitteisen Ca²⁺-sisäänvirtauksen suora alajuoksun efektori. Mikä tahansa VGCC-häiriö — olipa se EMF:n, farmakologisen salpauksen tai geneettisen mutaation aiheuttama — etenee CaMKII:n kautta kaikkiin sen alajuoksun kohteisiin samanaikaisesti. BAT-termogeneesireitti on yksi haara monielimisessä kaskadissa, joka ajaa myös hedelmättömyyttä, neurodegeneraatiota ja sydämen toimintahäiriöitä saman ylävirtamekanismin kautta.",
    s6LinkText: "Täydellinen CaMKII-konvergenssimalli",

    /* --- OSIO 5: Kliininen konteksti --- */
    s5SectionTitle: "Kliininen konteksti",

    /* 07 Kylmäaltistus */
    s7Title: "Kliininen rinnakkaisuus: kylmäaltistusterapia",
    s7p1: "Kylmäaltistusterapia (avantouinti, kylmät suihkut, kryoterapia) aktivoi BAT-termogeneesin samojen Ca²⁺-signalointireittien kautta, jotka EMF häiritsee. Kylmästressi laukaisee sympaattisen aktivaation → noradrenaliinin vapautumisen → β3-adrenergisen reseptorin → Ca²⁺-signalointikaskadin → CaMKII → UCP1-aktivaation. Kylmäaltistuksen kliininen teho metaboliselle terveydelle, painonhallinnalle ja insuliiniherkkyyden parantamiselle on hyvin dokumentoitu.",
    s7p2: "Tämä luo mekanistisen symmetrian: kylmäaltistus AKTIVOI VGCC → Ca²⁺ → CaMKII → UCP1 -reitin; EMF-altistus HÄIRITSEE sitä. Sama molekulaarinen koneisto on molempien interventioiden kohde, mutta päinvastaisiin suuntiin. Tämä rinnakkaisuus tarjoaa riippumattoman kliinisen vahvistuksen sille, että reitti on todellinen ja metabolisesti merkittävä — jos kylmä voi ylössäädellä sen, EMF voi alassäädellä sen.",

    /* 08 Episteeminen huomautus */
    s8Title: "Episteeminen huomautus",
    s8p1: "Lihavuus on monitekijäinen tila. Ruokavalio, liikunta, genetiikka, suolistomikrobiomi, uni, stressi ja endokriiniset häiritsijät kaikki vaikuttavat energiatasapainoon. EMF-indusoitu BAT-heikentyminen on YKSI vaikuttava tekijä tässä monimutkaisessa maisemassa — ei ainoa syy.",
    s8p2: "BERM-kehys ei väitä, että EMF aiheuttaa lihavuuden. Se tunnistaa spesifisen, mitattavan mekanismin (VGCC → Ca²⁺ → CaMKII → UCP1/SERCA2b), jolla EMF vähentää termogeneettistä kalorinpolttoa. Suuruusluokka (PRDM16 −49 %, C/EBPβ −32 %) osoittaa, ettei kyseessä ole merkityksetön vaikutus energiatasapainoon, mutta sen suhteellinen paino ruokavalion, liikunnan ja muiden tekijöiden rinnalla on vielä kvantifioitava populaatiotutkimuksissa.",

    /* Katso myös */
    seeAlso: "Katso myös",
    modulomeOverview: "Moduloomin yleiskatsaus",
    testesPage: "Kivekset (CaMKII → StAR)",
    pancreasPage: "Haima (β-solun VGCC)",
    brainPage: "Aivot (VGCC → Alzheimer)",
    predictionsPage: "Ennusterekisteri",
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

export default async function BATPage({
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

      <PageHeader icon={Flame} title={d.title} subtitle={d.subtitle} />

      {/* ═══════════════════════════════════════════════
          SECTION 1 — BAT Channel Architecture
          ═══════════════════════════════════════════════ */}
      <div className="mb-4 mt-12">
        <h2 className="text-xl font-bold text-foreground tracking-tight">
          {d.s1SectionTitle}
        </h2>
        <div className="h-px bg-accent/30 mt-2" />
      </div>

      {/* 01 — Channel Profile */}
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
              <span className="text-[0.65rem] font-semibold px-1.5 py-0.5 rounded bg-green-500/10 text-green-600 dark:text-green-400">
                {d.levelVal}
              </span>
            </span>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          SECTION 2 — Dual Thermogenic Mechanisms
          ═══════════════════════════════════════════════ */}
      <div className="mb-4 mt-12">
        <h2 className="text-xl font-bold text-foreground tracking-tight">
          {d.s2SectionTitle}
        </h2>
        <div className="h-px bg-accent/30 mt-2" />
      </div>

      {/* 02 — UCP1 Pathway */}
      <section className="mb-16 border-t editorial-rule pt-6">
        <h3 className="text-lg font-semibold mb-4">
          <span className="font-mono-num text-xs text-accent mr-2">02</span>
          {d.s2Title}
        </h3>

        <div className="bg-card rounded-lg border border-card-border p-5 mb-6">
          <p className="font-mono text-sm text-accent leading-relaxed text-center">
            {d.s2Chain}
          </p>
        </div>

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

      {/* 03 — Ca²⁺ Futile Cycling Pathway */}
      <section className="mb-16 border-t editorial-rule pt-6">
        <h3 className="text-lg font-semibold mb-4">
          <span className="font-mono-num text-xs text-accent mr-2">03</span>
          {d.s3Title}
        </h3>

        <div className="bg-card rounded-lg border border-card-border p-5 mb-6">
          <p className="font-mono text-sm text-accent leading-relaxed text-center">
            {d.s3Chain}
          </p>
        </div>

        <div className="space-y-4 text-sm text-foreground-muted leading-relaxed max-w-4xl">
          <p className="editorial-rail text-[0.95rem] text-foreground">
            {d.s3p1}
          </p>
          <div className="border-l-4 border-amber-500/40 rounded-r-lg bg-card p-5">
            <p className="text-sm text-foreground-muted leading-relaxed">
              {d.s3p2}
            </p>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          SECTION 3 — Key Evidence
          ═══════════════════════════════════════════════ */}
      <div className="mb-4 mt-12">
        <h2 className="text-xl font-bold text-foreground tracking-tight">
          {d.s3SectionTitle}
        </h2>
        <div className="h-px bg-accent/30 mt-2" />
      </div>

      {/* 04 — Maalouf 2023 */}
      <section className="mb-16 border-t editorial-rule pt-6">
        <h3 className="text-lg font-semibold mb-4">
          <span className="font-mono-num text-xs text-accent mr-2">04</span>
          {d.s4Title}
          <span className="ml-2 text-[0.65rem] font-semibold px-1.5 py-0.5 rounded bg-green-500/10 text-green-600 dark:text-green-400">
            {d.s4Badge}
          </span>
        </h3>
        <p className="text-sm text-foreground-muted leading-relaxed max-w-4xl">
          {d.s4p1}
        </p>
      </section>

      {/* 05 — 5G Differentiation Study */}
      <section className="mb-16 border-t editorial-rule pt-6">
        <h3 className="text-lg font-semibold mb-4">
          <span className="font-mono-num text-xs text-accent mr-2">05</span>
          {d.s5Title}
        </h3>

        <p className="text-sm text-foreground-muted leading-relaxed max-w-4xl mb-4">
          {d.s5p1}
        </p>

        <ul className="space-y-3 text-sm text-foreground-muted leading-relaxed max-w-4xl mb-6">
          {d.s5Stats.map((stat, i) => (
            <li key={i} className="pl-1 flex gap-2">
              <span className="text-accent shrink-0">*</span>
              <span>{stat}</span>
            </li>
          ))}
        </ul>

        <div className="border-l-4 border-accent/40 rounded-r-lg bg-card p-5">
          <p className="text-sm text-foreground-muted leading-relaxed">
            {d.s5p2}
          </p>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          SECTION 4 — CaMKII Convergence
          ═══════════════════════════════════════════════ */}
      <div className="mb-4 mt-12">
        <h2 className="text-xl font-bold text-foreground tracking-tight">
          {d.s4SectionTitle}
        </h2>
        <div className="h-px bg-accent/30 mt-2" />
      </div>

      {/* 06 — CaMKII Connection */}
      <section className="mb-16 border-t editorial-rule pt-6">
        <h3 className="text-lg font-semibold mb-4">
          <span className="font-mono-num text-xs text-accent mr-2">06</span>
          {d.s6Title}
        </h3>

        <p className="text-sm text-foreground-muted leading-relaxed max-w-4xl mb-4">
          {d.s6p1}
        </p>

        <ul className="space-y-3 text-sm text-foreground-muted leading-relaxed max-w-4xl mb-6">
          {d.s6Points.map((point, i) => (
            <li key={i} className="pl-1 flex gap-2">
              <span className="text-accent shrink-0">*</span>
              <span>{point}</span>
            </li>
          ))}
        </ul>

        <div className="rounded-lg bg-amber-500/10 border border-amber-500/20 p-5 mb-4">
          <p className="text-sm text-foreground-muted leading-relaxed">
            {d.s6p2}
          </p>
        </div>

        <Link
          href={`/${locale}/model#camkii-convergence`}
          className="text-xs text-accent hover:underline inline-block"
        >
          {d.s6LinkText} &rarr;
        </Link>
      </section>

      {/* ═══════════════════════════════════════════════
          SECTION 5 — Clinical Context
          ═══════════════════════════════════════════════ */}
      <div className="mb-4 mt-12">
        <h2 className="text-xl font-bold text-foreground tracking-tight">
          {d.s5SectionTitle}
        </h2>
        <div className="h-px bg-accent/30 mt-2" />
      </div>

      {/* 07 — Cold Exposure Parallel */}
      <section className="mb-16 border-t editorial-rule pt-6">
        <h3 className="text-lg font-semibold mb-4">
          <span className="font-mono-num text-xs text-accent mr-2">07</span>
          {d.s7Title}
        </h3>

        <div className="space-y-4 text-sm text-foreground-muted leading-relaxed max-w-4xl">
          <p className="editorial-rail text-[0.95rem] text-foreground">
            {d.s7p1}
          </p>
          <div className="border-l-4 border-green-500 rounded-r-lg bg-card p-4">
            <p className="text-sm text-foreground-muted leading-relaxed">
              {d.s7p2}
            </p>
          </div>
        </div>
      </section>

      {/* 08 — Epistemic Note */}
      <section className="mb-16 border-t editorial-rule pt-6">
        <h3 className="text-lg font-semibold mb-4">
          <span className="font-mono-num text-xs text-accent mr-2">08</span>
          {d.s8Title}
        </h3>

        <div className="rounded-lg bg-blue-500/10 border border-blue-500/20 p-5">
          <p className="text-sm text-foreground-muted leading-relaxed mb-3">
            {d.s8p1}
          </p>
          <p className="text-sm text-foreground-muted leading-relaxed">
            {d.s8p2}
          </p>
        </div>
      </section>

      {/* See also */}
      <section className="border-t editorial-rule pt-6">
        <h3 className="text-sm font-semibold text-foreground mb-3">
          {d.seeAlso}
        </h3>
        <div className="flex gap-6 flex-wrap">
          <Link
            href={`/${locale}/modulome`}
            className="text-sm text-accent hover:underline"
          >
            {d.modulomeOverview} &rarr;
          </Link>
          <Link
            href={`/${locale}/modulome/testes`}
            className="text-sm text-accent hover:underline"
          >
            {d.testesPage} &rarr;
          </Link>
          <Link
            href={`/${locale}/modulome/pancreas`}
            className="text-sm text-accent hover:underline"
          >
            {d.pancreasPage} &rarr;
          </Link>
          <Link
            href={`/${locale}/modulome/brain`}
            className="text-sm text-accent hover:underline"
          >
            {d.brainPage} &rarr;
          </Link>
          <Link
            href={`/${locale}/predictions`}
            className="text-sm text-accent hover:underline"
          >
            {d.predictionsPage} &rarr;
          </Link>
        </div>
      </section>
    </div>
  );
}
