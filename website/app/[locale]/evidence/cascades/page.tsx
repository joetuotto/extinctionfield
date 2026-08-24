import type { Metadata } from "next";
import { Activity } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { IonicHierarchyDiagram } from "@/components/IonicHierarchyDiagram";
import { DiseaseCascadeTimeline } from "@/components/DiseaseCascadeTimeline";
import Link from "next/link";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const title = locale === "fi" ? "Tautikaskadi: ionikanavakonvergenssi" : "Disease Cascade: Ion Channel Convergence";
  const subtitle = locale === "fi"
    ? "Ioninen hoitohierarkia, ihoakku, ADHD ja kahdeksan sairauden konvergenssi"
    : "The ionic treatment hierarchy, skin battery, ADHD, and the eight-disease convergence";
  return { title: `${title} – Extinction Field`, description: subtitle };
}

export default async function CascadesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const activeLocale = locale === "fi" ? "fi" : "en";

  const title = activeLocale === "fi" ? "Tautikaskadi: ionikanavakonvergenssi" : "Disease Cascade: Ion Channel Convergence";
  const subtitle = activeLocale === "fi"
    ? "Ioninen hoitohierarkia, ihoakku, ADHD ja kahdeksan sairauden konvergenssi"
    : "The ionic treatment hierarchy, skin battery, ADHD, and the eight-disease convergence";
  const backLink = activeLocale === "fi" ? "← Takaisin evidenssiin" : "← Back to Evidence";

  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <Link href={`/${activeLocale}/evidence`} className="text-sm text-accent hover:underline mb-6 inline-block">
        {backLink}
      </Link>

      <PageHeader icon={Activity} title={title} subtitle={subtitle} />

      {/* R4b-d: Ionic Treatment Hierarchy */}
      <section id="ionic-hierarchy" className="mb-16 border-t editorial-rule pt-6">
        <h2 className="editorial-section-heading mb-3">
          {activeLocale === "fi" ? "R4b-d: Ioninen hoitohierarkia" : "R4b-d: The Ionic Treatment Hierarchy"}
        </h2>
        <div className="space-y-4 text-sm text-foreground-muted leading-relaxed max-w-4xl">
          <p className="editorial-rail text-[0.95rem] text-foreground">
            {activeLocale === "fi"
              ? "Retrodiktio R4 esittää, että masennus reagoi paremmin sähköön kuin kemiaan. Ioninen hoitohierarkia selittää miksi: kaikki mielialahäiriöiden hoidot — SSRI:istä psykedeeeleihin — konvergoivat lopulta kalsiumhomeostaasiin. Niiden tehokkuus seuraa ionisen kohdistuksen astetta."
              : "Retrodiction R4 states that depression responds better to electricity than chemistry. The ionic treatment hierarchy explains why: all mood disorder treatments — from SSRIs to psychedelics — ultimately converge on calcium homeostasis. Their efficacy tracks with the degree of ionic directness."}
          </p>
          <p>
            {activeLocale === "fi"
              ? "R4b — Litium: Litium on maailman vanhin ja tehokkain mielialastabilisaattori, ja ainoa joka vähentää itsemurhakuolleisuutta (meta-analyysi >14 000 potilasta). Sen mekanismi on ioninen, ei kemiallinen: Li⁺-ioni läpäisee jänniteriippuvaisen natriumkanavan (VGSC), korvaa Na⁺:n 1:1-suhteessa ja normalisoi solujen Na⁺/Ca²⁺-tasapainon. GWAS-tutkimukset liittävät litiumvasteen ionikanavageeneihin — ei serotoniiniteihin. Yhtään serotoniinilääkettä ei ole koskaan osoitettu vähentävän itsemurhakuolleisuutta."
              : "R4b — Lithium: Lithium is the world's oldest and most effective mood stabilizer, and the only one shown to reduce suicide mortality (meta-analysis of >14,000 patients). Its mechanism is ionic, not chemical: the Li⁺ ion permeates the voltage-gated sodium channel (VGSC), replaces Na⁺ at a 1:1 ratio, and normalizes cellular Na⁺/Ca²⁺ balance. GWAS studies link lithium response to ion channel genes — not serotonin pathways. No serotonin-based drug has ever been shown to reduce suicide mortality."}
          </p>
          <p>
            {activeLocale === "fi"
              ? "R4c — Psykedeelit ja Ca²⁺-konvergenssi: Psilosybiinin (NEJM 2022, NNT ≈ 3) signaaliketju päättyy Cav1.2-kalsiumkanavaan (CACNA1C). Sousouri ym. (2025, PMC12491688) osoittivat, että 5-HT2A → Gq → IP3 → Ca²⁺-ER-vapautuminen aktivoi Cav1.2:n kautta massiivisen Ca²⁺-aallon — saman kanavan jonka EMF moduloi VGCC-mekanismin kautta. Ketamiini (NNT ≈ 3,5) saavuttaa saman Ca²⁺-konvergenssin NMDA-reseptorieston kautta: NMDA-esto → glutamaattipurkaus → AMPA → Ca²⁺-sisäänvirtaus. NMDA itsessään on ionikanava, ei välittäjäainereseptori."
              : "R4c — Psychedelics and Ca²⁺ convergence: Psilocybin's signal chain (NEJM 2022, NNT ≈ 3) terminates at the Cav1.2 calcium channel (CACNA1C). Sousouri et al. (2025, PMC12491688) demonstrated that 5-HT2A → Gq → IP3 → Ca²⁺ ER release activates Cav1.2, producing a massive Ca²⁺ surge — the same channel that EMF modulates via the VGCC mechanism. Ketamine (NNT ≈ 3.5) achieves the same Ca²⁺ convergence through NMDA receptor blockade: NMDA block → glutamate surge → AMPA → Ca²⁺ influx. NMDA itself is an ion channel, not a neurotransmitter receptor."}
          </p>
          <p>
            {activeLocale === "fi"
              ? "R4d — Hierarkia: Viisitasoinen hierarkia (kemiallinen < sähkömagneettinen < ioninen krooninen < ioninen reset < totaalinen ioninen nollaus) selittää miksi nopeampi vaikutusmekanismi ennustaa suurempaa tehoa. SSRI:t (NNT 7) vaikuttavat ionikanaviin epäsuorasti viikkojen viiveellä. TMS/tDCS (NNT 5–6) indusoivat ionivirtoja suoraan. Litium korvaa Na⁺-ionin suoraan. Psykedeelit tuottavat akuutin Ca²⁺-resetin tunneissa. ECT — psykiatrian tehokkain hoito (70–80 % vaste hoitoresistenteissä) — laukaisee leviävän depolarisaatioaallon (CSD) joka nollaa koko korteksin ionigradientit (Rosenthal ym. 2025, Nature Communications). Tämä kuvio on yhteensopiva vain ionikanavahypoteesin kanssa."
              : "R4d — The hierarchy: The five-level hierarchy (chemical < electromagnetic < ionic chronic < ionic reset < total ionic reset) explains why faster mechanisms predict greater efficacy. SSRIs (NNT 7) affect ion channels indirectly over weeks. TMS/tDCS (NNT 5–6) induce ion currents directly. Lithium replaces the Na⁺ ion directly. Psychedelics produce an acute Ca²⁺ reset within hours. ECT — psychiatry's most effective treatment (70–80% response in treatment-resistant cases) — triggers cortical spreading depolarization (CSD) that resets all ionic gradients across the entire cortex (Rosenthal et al. 2025, Nature Communications). This pattern is consistent only with the ion channel hypothesis."}
          </p>
        </div>

        <IonicHierarchyDiagram locale={activeLocale} />

        <div className="mt-6 overflow-x-auto">
          <table className="w-full text-sm border-collapse max-w-4xl">
            <thead>
              <tr className="border-b border-card-border text-left text-xs text-foreground-muted uppercase tracking-wider">
                <th className="py-2 pr-3">{activeLocale === "fi" ? "Viite" : "Citation"}</th>
                <th className="py-2 pr-3 w-16">{activeLocale === "fi" ? "Vuosi" : "Year"}</th>
                <th className="py-2">{activeLocale === "fi" ? "Löydös" : "Finding"}</th>
              </tr>
            </thead>
            <tbody className="text-foreground-muted">
              <tr className="border-b border-card-border/40">
                <td className="py-2 pr-3 font-medium text-foreground">Cipriani et al. (Lancet)</td>
                <td className="py-2 pr-3 font-mono-num">2018</td>
                <td className="py-2">{activeLocale === "fi" ? "21 masennuslääkettä, 116 477 potilasta: NNT ≈ 7 SSRI:ille" : "21 antidepressants, 116,477 patients: NNT ≈ 7 for SSRIs"}</td>
              </tr>
              <tr className="border-b border-card-border/40">
                <td className="py-2 pr-3 font-medium text-foreground">Goodwin et al. (NEJM)</td>
                <td className="py-2 pr-3 font-mono-num">2022</td>
                <td className="py-2">{activeLocale === "fi" ? "Psilosybiini vs essitalopraami: NNT ≈ 3, vaikutus tunneissa" : "Psilocybin vs escitalopram: NNT ≈ 3, effect within hours"}</td>
              </tr>
              <tr className="border-b border-card-border/40">
                <td className="py-2 pr-3 font-medium text-foreground">Sousouri et al. (PMC12491688)</td>
                <td className="py-2 pr-3 font-mono-num">2025</td>
                <td className="py-2">{activeLocale === "fi" ? "5-HT2A → Gq → IP3 → Cav1.2 (CACNA1C): psykedeelit kohdistuvat samaan kanavaan kuin EMF" : "5-HT2A → Gq → IP3 → Cav1.2 (CACNA1C): psychedelics target the same channel as EMF"}</td>
              </tr>
              <tr className="border-b border-card-border/40">
                <td className="py-2 pr-3 font-medium text-foreground">El-Mallakh & Bhansali</td>
                <td className="py-2 pr-3 font-mono-num">2004/2010</td>
                <td className="py-2">{activeLocale === "fi" ? "Li⁺ läpäisee VGSC:n, korvaa Na⁺:n: ionimekanismi, ei kemiallinen" : "Li⁺ permeates VGSC, replaces Na⁺: ionic mechanism, not chemical"}</td>
              </tr>
              <tr className="border-b border-card-border/40">
                <td className="py-2 pr-3 font-medium text-foreground">Zarate et al. (Arch Gen Psych)</td>
                <td className="py-2 pr-3 font-mono-num">2006</td>
                <td className="py-2">{activeLocale === "fi" ? "Ketamiini: ensimmäinen RCT. NMDA on ionikanava, vaikutus tunneissa" : "Ketamine: first RCT. NMDA is an ion channel, effect within hours"}</td>
              </tr>
              <tr className="border-b border-card-border/40">
                <td className="py-2 pr-3 font-medium text-foreground">Rosenthal et al. (Nat Commun)</td>
                <td className="py-2 pr-3 font-mono-num">2025</td>
                <td className="py-2">{activeLocale === "fi" ? "ECT laukaisee leviävän depolarisaatioaallon (CSD): totaalinen ioninen nollaus" : "ECT triggers cortical spreading depolarization (CSD): total ionic reset"}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-xs text-foreground-muted italic mt-4 max-w-4xl">
          {activeLocale === "fi"
            ? "Episteeminen taso: litiumin ionimekanismi [E] (El-Mallakh/Bhansali data). Psykedeelien Ca²⁺/CACNA1C-konvergenssi [E] (Sousouri 2025). ECT:n CSD-mekanismi [E] (Rosenthal 2025). Hierarkiaennuste [M|C] (Lindgren)."
            : "Epistemic level: lithium ionic mechanism [E] (El-Mallakh/Bhansali data). Psychedelic Ca²⁺/CACNA1C convergence [E] (Sousouri 2025). ECT CSD mechanism [E] (Rosenthal 2025). Hierarchy prediction [M|C] (Lindgren)."}
        </p>
      </section>

      {/* The Skin Battery — dermal bioelectric system */}
      <section id="skin-battery" className="mb-16 border-t editorial-rule pt-6">
        <h2 className="editorial-section-heading mb-3">
          {activeLocale === "fi" ? "Ihoakku — ihon biosähköinen sensorijärjestelmä" : "The Skin Battery — dermal bioelectric sensor system"}
        </h2>
        <div className="space-y-4 text-sm text-foreground-muted leading-relaxed max-w-4xl">
          <p className="editorial-rail text-[0.95rem] text-foreground">
            {activeLocale === "fi"
              ? "Iho ei ole passiivinen suoja vaan aktiivinen biosähköinen sensoriverkko. Epidermis ylläpitää jatkuvaa transepiteliaalista potentiaalia (TEP, 10–60 mV) Na⁺/K⁺-ATPaasin avulla — kirjaimellinen paristo joka generoi sähkökentän ihon läpi. Kun iho vaurioituu, TEP romahtaa ja generoi lateraalisen sähkökentän (100–200 mV/mm) joka ohjaa keratinosyyttien ja fibroblastien elektrotaksista. Tämä sähköinen signaali on ensimmäinen parantava signaali — ENNEN biokemiallisia signaaleja."
              : "Skin is not a passive barrier but an active bioelectric sensor network. The epidermis maintains a continuous transepithelial potential (TEP, 10–60 mV) via Na⁺/K⁺-ATPase — a literal battery that generates an electric field across the skin. When skin is wounded, TEP collapses and generates a lateral electric field (100–200 mV/mm) that guides keratinocyte and fibroblast electrotaxis. This electrical signal is the first healing signal — BEFORE biochemical signals."}
          </p>
          <p>
            {activeLocale === "fi"
              ? "Ihon dermis on pääasiassa kollageenia, joka on pietsosähköinen (7–8 pC/N): se muuntaa mekaanisen voiman suoraan sähköiseksi signaaliksi. Kosketuksen havaitseminen ei ole pelkästään mekaanisten reseptorien (PIEZO1/2) toimintaa — se on myös pietsosähköinen prosessi jossa kollageeni generoi jännitteen joka avaa SAMAT jänniteohjatut kalsiumkanavat (VGCC) jotka BERM identifioi EMF:n kohteiksi. Mekaaninen kosketus ja EMF konvergoivat samaan Ca²⁺-kanavaan."
              : "The skin dermis is primarily collagen, which is piezoelectric (7–8 pC/N): it converts mechanical force directly into electrical signal. Touch perception is not solely the work of mechanical receptors (PIEZO1/2) — it is also a piezoelectric process where collagen generates voltage that opens the SAME voltage-gated calcium channels (VGCC) that BERM identifies as EMF targets. Mechanical touch and EMF converge on the same Ca²⁺ channel."}
          </p>
          <p>
            {activeLocale === "fi"
              ? "Keratinosyyttien TRPV4 on multimodaalinen ionikanava joka reagoi mekaaniseen paineeseen, lämpöön (>27°C), UVB-säteilyyn ja osmoottiseen paineeseen — kaikki samaksi Ca²⁺-vasteeksi. TRPV4 välittää myös histaminergista kutinaa. Jos EMF aktivoi TRPV4:ää, tuloksena on kutina joka on erottamaton allergisesta kutinasta. Tämä selittää miksi EHS:n yleisimmät iho-oireet (pistely, polttelu, kutina) ovat biologisesti ennustettavia vasteita, eivät nocebo-ilmiöitä."
              : "Keratinocyte TRPV4 is a multimodal ion channel that responds to mechanical pressure, heat (>27°C), UVB radiation, and osmotic pressure — all producing the same Ca²⁺ response. TRPV4 also mediates histaminergic itch. If EMF activates TRPV4, the result is itch indistinguishable from allergic itch. This explains why the most common EHS skin symptoms (tingling, burning, itching) are biologically predictable responses, not nocebo phenomena."}
          </p>
          <p>
            {activeLocale === "fi"
              ? "Skedung ym. (2013, Scientific Reports) osoittivat, että ihmisen sormi havaitsee 13 nm kohoumat — kokoluokkaero sormenjälkiharjanteeseen nähden on 15 000:1. Mekaaniset mallit eivät selitä tätä tarkkuutta. Pietsosähköinen + ionikanavaselitys voi: nanometritason pintarakenne generoi sähköisen signaalin joka on riittävän voimakas aktivoimaan VGCC/PIEZO1/TRPV4-kanavia. Tämä todistaa, että ihon sensorijärjestelmä operoi tasolla jossa EMF:n ja luonnollisten biosähköisten signaalien erottaminen on mahdotonta."
              : "Skedung et al. (2013, Scientific Reports) demonstrated that the human finger detects 13 nm ridges — a scale difference of 15,000:1 relative to fingerprint ridges. Mechanical models cannot explain this precision. The piezoelectric + ion channel explanation can: nanometer surface structure generates an electrical signal sufficient to activate VGCC/PIEZO1/TRPV4 channels. This proves the skin sensory system operates at a level where distinguishing EMF from natural bioelectric signals is impossible."}
          </p>
        </div>

        <div className="mt-6 overflow-x-auto">
          <table className="w-full text-sm border-collapse max-w-4xl">
            <thead>
              <tr className="border-b border-card-border text-left text-xs text-foreground-muted uppercase tracking-wider">
                <th className="py-2 pr-3">{activeLocale === "fi" ? "Viite" : "Citation"}</th>
                <th className="py-2 pr-3 w-16">{activeLocale === "fi" ? "Vuosi" : "Year"}</th>
                <th className="py-2">{activeLocale === "fi" ? "Löydös" : "Finding"}</th>
              </tr>
            </thead>
            <tbody className="text-foreground-muted">
              <tr className="border-b border-card-border/40">
                <td className="py-2 pr-3 font-medium text-foreground">Lim et al. (SAGE Journals)</td>
                <td className="py-2 pr-3 font-mono-num">2024</td>
                <td className="py-2">{activeLocale === "fi" ? "TEP 'ihoakku' 10–60 mV nisäkkään ihossa" : "TEP 'skin battery' 10–60 mV in mammalian skin"}</td>
              </tr>
              <tr className="border-b border-card-border/40">
                <td className="py-2 pr-3 font-medium text-foreground">Zhao et al. (Nature)</td>
                <td className="py-2 pr-3 font-mono-num">2006</td>
                <td className="py-2">{activeLocale === "fi" ? "Endogeeninen haavan sähkökenttä 100–200 mV/mm, ensimmäinen parantava signaali" : "Endogenous wound EF 100–200 mV/mm, first healing signal"}</td>
              </tr>
              <tr className="border-b border-card-border/40">
                <td className="py-2 pr-3 font-medium text-foreground">Fukada & Yasuda</td>
                <td className="py-2 pr-3 font-mono-num">1957</td>
                <td className="py-2">{activeLocale === "fi" ? "Luun pietsosähköisyys (laajennettu: kollageeni 7–8 pC/N)" : "Bone piezoelectricity (extended: collagen 7–8 pC/N)"}</td>
              </tr>
              <tr className="border-b border-card-border/40">
                <td className="py-2 pr-3 font-medium text-foreground">Mohandas et al. (eLife)</td>
                <td className="py-2 pr-3 font-mono-num">2022</td>
                <td className="py-2">{activeLocale === "fi" ? "PIEZO1 keratinosyyteissä: mekanotransduktio ja Ca²⁺/Na⁺-permeabiliteetti" : "PIEZO1 in keratinocytes: mechanotransduction and Ca²⁺/Na⁺ permeability"}</td>
              </tr>
              <tr className="border-b border-card-border/40">
                <td className="py-2 pr-3 font-medium text-foreground">Skedung et al. (Scientific Reports)</td>
                <td className="py-2 pr-3 font-mono-num">2013</td>
                <td className="py-2">{activeLocale === "fi" ? "Ihmisen sormi havaitsee 13 nm kohoumat — kokoluokkaero 15 000:1" : "Human finger detects 13 nm ridges — scale difference 15,000:1"}</td>
              </tr>
              <tr className="border-b border-card-border/40">
                <td className="py-2 pr-3 font-medium text-foreground">PMC4858974</td>
                <td className="py-2 pr-3 font-mono-num">2016</td>
                <td className="py-2">{activeLocale === "fi" ? "TRPV4 välittää Ca²⁺-influksia ja histaminergista kutinaa keratinosyyteissä" : "TRPV4 mediates Ca²⁺ influx and histaminergic itch in keratinocytes"}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-xs text-foreground-muted italic mt-4 max-w-4xl">
          {activeLocale === "fi"
            ? "Episteeminen taso: TEP ja haavan sähkökenttä [E] (Lim/Zhao). Pietsosähköinen kollageeni [E] (Fukada/Yasuda). VGCC-konvergenssi [E] (Pall/PMC5828134). EHS-selitys [M|C] (malli)."
            : "Epistemic level: TEP and wound EF [E] (Lim/Zhao). Piezoelectric collagen [E] (Fukada/Yasuda). VGCC convergence [E] (Pall/PMC5828134). EHS explanation [M|C] (model)."}
        </p>
      </section>

      {/* ADHD as developmental ion channel calibration error */}
      <section id="adhd-calibration" className="mb-16 border-t editorial-rule pt-6">
        <span id="adhd" />
        <h2 className="editorial-section-heading mb-3">
          {activeLocale === "fi" ? "ADHD: kehityksellinen ionikanavien kalibraatiovirhe" : "ADHD: A Developmental Ion Channel Calibration Error"}
        </h2>
        <div className="space-y-4 text-sm text-foreground-muted leading-relaxed max-w-4xl">
          <p className="editorial-rail text-[0.95rem] text-foreground">
            {activeLocale === "fi"
              ? "ADHD:n konventionaalinen selitys (dopamiinivajaus prefrontaalisessa korteksissa) ei vastaa kysymykseen MIKSI dopamiinijärjestelmä on häiriintynyt. BERM:n ionikanavakehys tarjoaa ylävirtaan menevän vastauksen: ADHD on kehityksellinen ionikanavien kalibraatiovirhe, joka syntyy kun sikiön tai varhaisen lapsuuden hermoverkon ionikanavat kalibroituvat EMF-kontaminoidussa ympäristössä. Tämä perustuu kolmeen itsenäiseen todistuslinjaan: GWAS (CACNA1C-variantit ADHD:ssä), epidemiologia (Li 2020 JAMA, raskausaikainen EMF → ADHD) ja farmakologia (guanfasiini toimii ionikanaviin, ei neurotransmittereihin)."
              : "The conventional explanation of ADHD (dopamine deficit in prefrontal cortex) does not answer WHY the dopamine system is disrupted. BERM's ion channel framework offers an upstream answer: ADHD is a developmental ion channel calibration error that occurs when fetal or early childhood neural ion channels calibrate to an EMF-contaminated environment. This is based on three independent evidence lines: GWAS (CACNA1C variants in ADHD), epidemiology (Li 2020 JAMA, prenatal EMF → ADHD), and pharmacology (guanfacine acts on ion channels, not neurotransmitters)."}
          </p>
          <p>
            {activeLocale === "fi"
              ? "GWAS-todiste: CACNA1C (Cav1.2) -geenin variantit assosioituvat toistuvasti ADHD:hen, autismiin, bipolaarihäiriöön ja masennukseen (PMC6101623, PMC6679227). Tämä on SAMA geeni/kanava joka moduloi EMF:n uni-vaikutusta (Sousouri 2025), on psykedeelien signaaliketjun kohde ja osallistuu AD:n Ca²⁺-kaskadiin. Timothy-syndrooma (de novo CACNA1C gain-of-function G406R) aiheuttaa autismin korkealla penetranssilla — VGCC:n YLITOIMINTA = autistinen fenotyyppi. Muut VGCC-geenit (CACNA1A, CACNA1H, CACNA1I) assosioituvat myös neurokehityshäiriöihin (PMC4643966, PMC8957782)."
              : "GWAS evidence: CACNA1C (Cav1.2) gene variants repeatedly associate with ADHD, autism, bipolar disorder, and depression (PMC6101623, PMC6679227). This is the SAME gene/channel that modulates EMF sleep effects (Sousouri 2025), is the psychedelic signal chain target, and participates in AD's Ca²⁺ cascade. Timothy syndrome (de novo CACNA1C gain-of-function G406R) causes autism with high penetrance — VGCC OVERACTIVITY = autistic phenotype. Other VGCC genes (CACNA1A, CACNA1H, CACNA1I) also associate with neurodevelopmental disorders (PMC4643966, PMC8957782)."}
          </p>
          <p>
            {activeLocale === "fi"
              ? "Epidemiologinen todiste: Li ym. (2020, JAMA Network Open) seurasivat 1482 äiti-lapsi-paria Kaiser Permanente -kohortissa. Raskausaikainen EMF mitattiin OBJEKTIIVISESTI (MF-mittari 24h). Korkea raskausaikainen MF-altistus assosioi ADHD-riskiin, erityisesti PYSYVÄÄN ja VAIKEAAN ADHD:hen sekä ADHD:hen immuunivälitteisten liitännäissairauksien kanssa. Sama tutkimusryhmä on osoittanut saman altistuksen assosioivan myös keskenmenoon (OR 2.72), lapsuuden lihavuuteen ja astmaan — YKSI altistus, MONTA vastetta, kuten modulooma ennustaa."
              : "Epidemiological evidence: Li et al. (2020, JAMA Network Open) followed 1482 mother-child pairs in the Kaiser Permanente cohort. Prenatal EMF was measured OBJECTIVELY (MF meter, 24h). High prenatal MF exposure associated with ADHD risk, specifically PERSISTENT and SEVERE ADHD and ADHD with immune-mediated comorbidities. The same research group has shown the same exposure associates with miscarriage (OR 2.72), childhood obesity, and asthma — ONE exposure, MULTIPLE outcomes, as the modulome predicts."}
          </p>
          <p>
            {activeLocale === "fi"
              ? "Farmakologinen todiste: Guanfasiini (Intuniv, FDA/EMA-hyväksytty ADHD:hen) EI koske dopamiiniin. Se on α2A-adrenerginen agonisti joka estää cAMP:n → SULKEE HCN-kanavat → stabiloi membraanipotentiaalin → prefrontaalisen korteksin signaali-kohinasuhde paranee (Wang ym. 2007, Cell). Tämä on SUORA ionikanavainterventio. Guanfasiini toimii juuri niihin ADHD-oireisiin (impulsiivisuus, emotionaalinen säätely) jotka vaativat tarkinta ionista kontrollia. Stimulantit sen sijaan KOMPENSOIVAT kalibraatiovirhettä nostamalla signaalia — guanfasiini KORJAA kynnystä."
              : "Pharmacological evidence: Guanfacine (Intuniv, FDA/EMA-approved for ADHD) does NOT touch dopamine. It is an α2A-adrenergic agonist that inhibits cAMP → CLOSES HCN channels → stabilizes membrane potential → prefrontal cortex signal-to-noise ratio improves (Wang et al. 2007, Cell). This is a DIRECT ion channel intervention. Guanfacine works precisely on those ADHD symptoms (impulsivity, emotional regulation) requiring the finest ionic control. Stimulants instead COMPENSATE for the calibration error by raising the signal — guanfacine CORRECTS the threshold."}
          </p>
          <p>
            {activeLocale === "fi"
              ? "Kalibraatioikkuna: prefrontaalinen korteksi on viimeiseksi kypsyvä aivoalue. Jos sikiökauden ja varhaisen lapsuuden (0–10 v) ionikanavien viritys tapahtuu EMF-kontaminoidussa ympäristössä, HCN-kanavat viritetään korkeammalle kohinatasolle ja VGCC:t asetetaan aktivoitumaan korkeammalla kynnyksellä — signaali-kohinasuhde jää matalaksi. Hong ym. (2020, PMC7287020) osoittivat raskausaikaisen matkapuhelinaltistuksen vaikuttavan kognitioon VANHOISSA rottien jälkeläisissä — vaikutus on ELINIKÄINEN."
              : "Calibration window: the prefrontal cortex is the last brain region to mature. If fetal and early childhood (0–10 y) ion channel tuning occurs in an EMF-contaminated environment, HCN channels tune to a higher noise floor and VGCCs set to activate at a higher threshold — signal-to-noise ratio remains low. Hong et al. (2020, PMC7287020) showed prenatal mobile phone exposure affects cognition in AGED rat offspring — the effect is LIFELONG."}
          </p>
        </div>

        <div className="mt-6 overflow-x-auto">
          <table className="w-full text-sm border-collapse max-w-4xl">
            <thead>
              <tr className="border-b border-card-border text-left text-xs text-foreground-muted uppercase tracking-wider">
                <th className="py-2 pr-3">{activeLocale === "fi" ? "Viite" : "Citation"}</th>
                <th className="py-2 pr-3 w-16">{activeLocale === "fi" ? "Vuosi" : "Year"}</th>
                <th className="py-2">{activeLocale === "fi" ? "Löydös" : "Finding"}</th>
              </tr>
            </thead>
            <tbody className="text-foreground-muted">
              <tr className="border-b border-card-border/40">
                <td className="py-2 pr-3 font-medium text-foreground">Li ym. (JAMA Network Open)</td>
                <td className="py-2 pr-3 font-mono-num">2020</td>
                <td className="py-2">{activeLocale === "fi" ? "Raskausaikainen MF → ADHD-riski ↑ (1482 paria, 20v seuranta, objektiivinen mittaus)" : "Prenatal MF → ADHD risk ↑ (1482 pairs, 20y follow-up, objective measurement)"}</td>
              </tr>
              <tr className="border-b border-card-border/40">
                <td className="py-2 pr-3 font-medium text-foreground">PMC6101623 / PMC6679227</td>
                <td className="py-2 pr-3 font-mono-num">2018/19</td>
                <td className="py-2">{activeLocale === "fi" ? "CACNA1C-variantit assosioituvat ADHD:hen, ASD:hen, bipolaarihäiriöön, MDD:hen (GWAS)" : "CACNA1C variants associate with ADHD, ASD, bipolar, MDD (GWAS)"}</td>
              </tr>
              <tr className="border-b border-card-border/40">
                <td className="py-2 pr-3 font-medium text-foreground">PMC6894750</td>
                <td className="py-2 pr-3 font-mono-num">2019</td>
                <td className="py-2">{activeLocale === "fi" ? "Timothy-syndrooman CACNA1C gain-of-function → aksonikohdennus ja käyttäytyminen muuttuvat" : "Timothy syndrome CACNA1C gain-of-function → axon targeting and behavior altered"}</td>
              </tr>
              <tr className="border-b border-card-border/40">
                <td className="py-2 pr-3 font-medium text-foreground">Wang ym. (Cell)</td>
                <td className="py-2 pr-3 font-mono-num">2007</td>
                <td className="py-2">{activeLocale === "fi" ? "α2A → cAMP↓ → HCN sulkeutuu → PFC:n työmuistiverkot vahvistuvat (guanfasiinin mekanismi)" : "α2A → cAMP↓ → HCN closure → PFC working memory networks strengthened (guanfacine mechanism)"}</td>
              </tr>
              <tr className="border-b border-card-border/40">
                <td className="py-2 pr-3 font-medium text-foreground">Aldad ym. (PMC3306017)</td>
                <td className="py-2 pr-3 font-mono-num">2012</td>
                <td className="py-2">{activeLocale === "fi" ? "800–1900 MHz sikiöaltistus hiirillä → neurokehityksen ja käyttäytymisen muutokset" : "800–1900 MHz fetal exposure in mice → neurodevelopmental and behavioral changes"}</td>
              </tr>
              <tr className="border-b border-card-border/40">
                <td className="py-2 pr-3 font-medium text-foreground">Hong ym. (PMC7287020)</td>
                <td className="py-2 pr-3 font-mono-num">2020</td>
                <td className="py-2">{activeLocale === "fi" ? "Raskausaikainen matkapuhelinaltistus → kognitiivinen heikkeneminen VANHOISSA jälkeläisissä (elinikäinen)" : "Prenatal mobile phone exposure → cognitive decline in AGED offspring (lifelong)"}</td>
              </tr>
              <tr className="border-b border-card-border/40">
                <td className="py-2 pr-3 font-medium text-foreground">PMC4658333</td>
                <td className="py-2 pr-3 font-mono-num">2015</td>
                <td className="py-2">{activeLocale === "fi" ? "VGCC:t ovat kriittisiä aivojen KEHITYKSELLE — kanavaekspressio säätelee hermoverkon muodostumista" : "VGCCs are critical for brain DEVELOPMENT — channel expression regulates neural network formation"}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-xs text-foreground-muted italic mt-4 max-w-4xl">
          {activeLocale === "fi"
            ? "Episteeminen taso: CACNA1C × neurokehitys [E] (GWAS, replikoitu). Raskausaikainen EMF → ADHD [E] (Li 2020 JAMA, objektiivinen mittaus). Guanfasiini HCN-mekanismi [E] (Wang 2007 Cell, FDA/EMA). Kalibraatioikkunateoria [C] (teoreettinen kehys). ADHD on monitekijäinen — EMF on yksi mahdollinen riskitekijä. Li 2020 on yksittäinen kohortti — replikaatio kriittistä."
            : "Epistemic level: CACNA1C × neurodevelopment [E] (GWAS, replicated). Prenatal EMF → ADHD [E] (Li 2020 JAMA, objective measurement). Guanfacine HCN mechanism [E] (Wang 2007 Cell, FDA/EMA). Calibration window theory [C] (theoretical framework). ADHD is multifactorial — EMF is one possible risk factor. Li 2020 is a single cohort — replication critical."}
        </p>
      </section>

      {/* Ion channel convergence across 8 cascade diseases */}
      <section id="ion-convergence" className="mb-16 border-t editorial-rule pt-6">
        <h2 className="editorial-section-heading mb-3">
          {activeLocale === "fi" ? "Ionikanavakonvergenssi: kahdeksan sairautta, yksi malli" : "The Ion Channel Convergence: Eight Diseases, One Model"}
        </h2>
        <div className="space-y-4 text-sm text-foreground-muted leading-relaxed max-w-4xl">
          <p className="editorial-rail text-[0.95rem] text-foreground">
            {activeLocale === "fi"
              ? "Jokainen BERM-kaskadin sairaus noudattaa samaa rakennetta: (1) GWAS-assosiaatio ionikanavageeneihin, (2) tehokkain hoito kohdistuu ionikanaviin, (3) EMF-altistus assosioituu sairauteen, (4) mekanistinen ketju EMF → ionikanava → patologia. Tämä ei ole sattuma — se on BERM:n ydinväite: ympäristö-EMF häiritsee ionikanavahomeostaasia, ja eri sairaudet ovat saman häiriön ilmentymiä eri kudoksissa eri viiveillä."
              : "Every BERM cascade disease follows the same structure: (1) GWAS association with ion channel genes, (2) most effective treatment targets ion channels, (3) EMF exposure associates with the disease, (4) mechanistic chain from EMF → ion channel → pathology. This is not coincidence — it is BERM's core claim: environmental EMF disrupts ion channel homeostasis, and different diseases are manifestations of the same disruption in different tissues at different latencies."}
          </p>
          <span id="depression" />
          <p>
            {activeLocale === "fi"
              ? "Bipolaarihäiriö on mallin eleganttein tapaus. Laskennalliset mallit (PubMed 32278494, Translational Psychiatry) osoittavat suoraan, että bipolaariset hippokampusneuronit heilahtelevat hypereksitaabeliuden ja hypoeksitaabeliuden välillä ionikanavien konduktanssimuutosten vuoksi. El-Mallakhin Na,K-ATPaasi-hypoteesi selittää molemmat ääripäät: LIEVÄ pumpun häiriö → eksitabiliteetti ↑ → mania; VOIMAKKAAMPI häiriö → neurotransmitterien vapautuminen ↓ → depressio. Litium (Li⁺) kulkee VGSC:n kautta ja kertyy ensisijaisesti hyperaktiivisiin neuroneihin → vaimentaa oskillaation. Antiepileptit (valproaatti, karbamatsepiini, lamotrigiini) toimivat SEKÄ epilepsiaan ETTÄ bipolaarihäiriöön koska SAMA ionisen eksitabiliteetin säätely on häiriintynyt molemmissa — eri aikaskaalalla."
              : "Bipolar disorder is the model's most elegant case. Computational models (PubMed 32278494, Translational Psychiatry) directly show that bipolar hippocampal neurons oscillate between hyperexcitability and hypoexcitability due to ion channel conductance changes. El-Mallakh's Na,K-ATPase hypothesis explains both poles: MILD pump dysfunction → excitability ↑ → mania; MORE SEVERE dysfunction → neurotransmitter release ↓ → depression. Lithium (Li⁺) traverses VGSC and accumulates preferentially in hyperactive neurons → dampens oscillation. Antiepileptics (valproate, carbamazepine, lamotrigine) work for BOTH epilepsy AND bipolar because the SAME ionic excitability regulation is disrupted in both — at different timescales."}
          </p>
          <span id="metabolic" /><span id="insulin" />
          <p>
            {activeLocale === "fi"
              ? "Metabolinen oireyhtymä: haiman β-solujen K-ATP-kanava (Kir6.2 + SUR1) on insuliinisäätelyn PÄÄKYTKIN. Glukoosi ↑ → ATP ↑ → K-ATP sulkeutuu → depolarisaatio → VGCC avautuu → Ca²⁺ → insuliini vapautuu. Sulfonyyliureat (FDA-hyväksytyt) sulkevat K-ATP-kanavan SUORAAN. US Patent 4850959 (1989) todistaa: resonanssi-EMF kontrolloi β-solujen insuliinieritystä kalsiumkanavien kautta. Klimentidis 2011: myös laboratorion kontrollieläimet lihovat (p = 1.2 × 10⁻⁷, 8 lajia) — ympäristömuutos, ei pelkkä ruokavalio."
              : "Metabolic syndrome: the pancreatic β-cell K-ATP channel (Kir6.2 + SUR1) is the MASTER SWITCH of insulin regulation. Glucose ↑ → ATP ↑ → K-ATP closes → depolarization → VGCC opens → Ca²⁺ → insulin release. Sulfonylureas (FDA-approved) close the K-ATP channel DIRECTLY. US Patent 4850959 (1989) proves: resonance-EMF controls β-cell insulin secretion via calcium channels. Klimentidis 2011: even lab control animals are gaining weight (p = 1.2 × 10⁻⁷, 8 species) — environmental change, not diet alone."}
          </p>
          <span id="autoimmune" />
          <p>
            {activeLocale === "fi"
              ? "Autoimmuunisairaudet: α7-nikotiininen asetyylikoliinireseptori (α7nAChR) — ionikanava (ligandiohjattu kationikanava) — säätelee kolinergistä anti-inflammatorista refleksiä. VNS (FDA-hyväksytty) aktivoi α7nAChR:n → NF-κB ↓ → tulehdus vähenee. EMF aktivoi NF-κB:tä VGCC-Ca²⁺-reitin kautta (Pall 2013), samalla kun vagushermon signalointi heikkenee. EMF on funktionaalisesti 'anti-VNS'. Koopman 2016 (PNAS): VNS tuotti merkitsevän vasteen nivelreumaan."
              : "Autoimmune diseases: α7 nicotinic acetylcholine receptor (α7nAChR) — an ion channel (ligand-gated cation channel) — regulates the cholinergic anti-inflammatory pathway. VNS (FDA-approved) activates α7nAChR → NF-κB ↓ → inflammation decreases. EMF activates NF-κB via the VGCC-Ca²⁺ pathway (Pall 2013), while vagal signaling weakens. EMF is functionally 'anti-VNS'. Koopman 2016 (PNAS): VNS produced significant response in rheumatoid arthritis."}
          </p>
          <span id="cancer" />
          <p>
            {activeLocale === "fi"
              ? "Syöpä on kumulatiivisen depolarisaation seuraus. Normaalit solut: Vm ≈ −60 mV (hyperpolaroitunut). Syöpäsolut: Vm ≈ −15 mV (depolaroitunut). Levin (2012) osoitti suoraan: onkogeenin yliekspressio depolarisoi soluja → kasvain. Mutta jos depolarisaatio estetään hyperpolaroivilla ionikanavilla → kasvain EI muodostu vaikka onkogeeni on aktiivinen. PMC12533209 (2025): leukemiasolut 'kaappaavat' stroomansolujen biosähkön CaV1.2-depolarisaation kautta. TTFields (FDA-hyväksytty) ja verapamiili (VGCC-estäjä, PMC5034549) ovat suoria ionisia syöpähoitoja."
              : "Cancer is the consequence of cumulative depolarization. Normal cells: Vm ≈ −60 mV (hyperpolarized). Cancer cells: Vm ≈ −15 mV (depolarized). Levin (2012) showed directly: oncogene overexpression depolarizes cells → tumor. But if depolarization is prevented by hyperpolarizing ion channels → tumor does NOT form even with active oncogene. PMC12533209 (2025): leukemia cells 'hijack' stromal cell bioelectricity via CaV1.2 depolarization. TTFields (FDA-approved) and verapamil (VGCC blocker, PMC5034549) are direct ionic cancer treatments."}
          </p>
        </div>

        <div className="mt-6 overflow-x-auto">
          <table className="w-full text-sm border-collapse max-w-4xl">
            <thead>
              <tr className="border-b border-card-border text-left text-xs text-foreground-muted uppercase tracking-wider">
                <th className="py-2 pr-3">{activeLocale === "fi" ? "Sairaus" : "Disease"}</th>
                <th className="py-2 pr-3">{activeLocale === "fi" ? "Ionikanava" : "Ion channel"}</th>
                <th className="py-2 pr-3">{activeLocale === "fi" ? "Ioninen hoito" : "Ionic treatment"}</th>
                <th className="py-2">{activeLocale === "fi" ? "TDP-todiste" : "TDP evidence"}</th>
              </tr>
            </thead>
            <tbody className="text-foreground-muted">
              <tr className="border-b border-card-border/40">
                <td className="py-2 pr-3 font-medium text-foreground">{activeLocale === "fi" ? "1. Uni" : "1. Sleep"}</td>
                <td className="py-2 pr-3">CRY + VGCC</td>
                <td className="py-2 pr-3">{activeLocale === "fi" ? "Melatoniini" : "Melatonin"}</td>
                <td className="py-2">Flock Off (CRY)</td>
              </tr>
              <tr className="border-b border-card-border/40">
                <td className="py-2 pr-3 font-medium text-foreground">{activeLocale === "fi" ? "2. Masennus/bipolaari" : "2. Depression/bipolar"}</td>
                <td className="py-2 pr-3">CACNA1C, Na,K-ATPase, HCN</td>
                <td className="py-2 pr-3">Li⁺, TMS, ECT</td>
                <td className="py-2">TMS/tDCS/ECT (FDA)</td>
              </tr>
              <tr className="border-b border-card-border/40">
                <td className="py-2 pr-3 font-medium text-foreground">3. ADHD</td>
                <td className="py-2 pr-3">CACNA1C, HCN</td>
                <td className="py-2 pr-3">{activeLocale === "fi" ? "Guanfasiini" : "Guanfacine"}</td>
                <td className="py-2">{activeLocale === "fi" ? "Guanfasiini (FDA/EMA)" : "Guanfacine (FDA/EMA)"}</td>
              </tr>
              <tr className="border-b border-card-border/40">
                <td className="py-2 pr-3 font-medium text-foreground">{activeLocale === "fi" ? "4. T2D/metabolinen" : "4. T2D/metabolic"}</td>
                <td className="py-2 pr-3">K-ATP (Kir6.2), VGCC</td>
                <td className="py-2 pr-3">{activeLocale === "fi" ? "Sulfonyyliureat" : "Sulfonylureas"}</td>
                <td className="py-2">Patent 4850959</td>
              </tr>
              <tr className="border-b border-card-border/40">
                <td className="py-2 pr-3 font-medium text-foreground">{activeLocale === "fi" ? "5. Autoimmuuni" : "5. Autoimmune"}</td>
                <td className="py-2 pr-3">α7nAChR</td>
                <td className="py-2 pr-3">VNS</td>
                <td className="py-2">VNS (FDA)</td>
              </tr>
              <tr className="border-b border-card-border/40">
                <td className="py-2 pr-3 font-medium text-foreground">{activeLocale === "fi" ? "6. Hedelmättömyys" : "6. Infertility"}</td>
                <td className="py-2 pr-3">CatSper, VGCC</td>
                <td className="py-2 pr-3">(TTFields)</td>
                <td className="py-2">TTFields (FDA)</td>
              </tr>
              <tr className="border-b border-card-border/40">
                <td className="py-2 pr-3 font-medium text-foreground">{activeLocale === "fi" ? "7. Syöpä" : "7. Cancer"}</td>
                <td className="py-2 pr-3">Vm/Cav1.2</td>
                <td className="py-2 pr-3">{activeLocale === "fi" ? "TTFields, verapamiili" : "TTFields, verapamil"}</td>
                <td className="py-2">TTFields (FDA)</td>
              </tr>
              <tr className="border-b border-card-border/40">
                <td className="py-2 pr-3 font-medium text-foreground">8. Alzheimer</td>
                <td className="py-2 pr-3">CACNA1C, PSEN</td>
                <td className="py-2 pr-3">TEMT</td>
                <td className="py-2">TEMT ({activeLocale === "fi" ? "kliininen pilotti" : "clinical pilot"})</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="mt-6 overflow-x-auto">
          <table className="w-full text-sm border-collapse max-w-4xl">
            <thead>
              <tr className="border-b border-card-border text-left text-xs text-foreground-muted uppercase tracking-wider">
                <th className="py-2 pr-3">{activeLocale === "fi" ? "Viite" : "Citation"}</th>
                <th className="py-2 pr-3 w-16">{activeLocale === "fi" ? "Vuosi" : "Year"}</th>
                <th className="py-2">{activeLocale === "fi" ? "Löydös" : "Finding"}</th>
              </tr>
            </thead>
            <tbody className="text-foreground-muted">
              <tr className="border-b border-card-border/40">
                <td className="py-2 pr-3 font-medium text-foreground">PubMed 32278494</td>
                <td className="py-2 pr-3 font-mono-num">2020</td>
                <td className="py-2">{activeLocale === "fi" ? "Bipolaariset neuronit: ionisen konduktanssin muutokset → hyper/hypoeksitaabelisuuden oskillaatio" : "Bipolar neurons: ion conductance changes → hyper/hypoexcitability oscillation"}</td>
              </tr>
              <tr className="border-b border-card-border/40">
                <td className="py-2 pr-3 font-medium text-foreground">El-Mallakh 2000/2004</td>
                <td className="py-2 pr-3 font-mono-num">2004</td>
                <td className="py-2">{activeLocale === "fi" ? "Na,K-ATPaasi-hypoteesi: lievä häiriö → mania, voimakkaampi → depressio" : "Na,K-ATPase hypothesis: mild dysfunction → mania, severe → depression"}</td>
              </tr>
              <tr className="border-b border-card-border/40">
                <td className="py-2 pr-3 font-medium text-foreground">PMC3678088</td>
                <td className="py-2 pr-3 font-mono-num">2013</td>
                <td className="py-2">{activeLocale === "fi" ? "K⁺-kanavat bipolaarihäiriössä — kattava katsaus" : "K⁺ channels in bipolar disorder — comprehensive review"}</td>
              </tr>
              <tr className="border-b border-card-border/40">
                <td className="py-2 pr-3 font-medium text-foreground">PMC12533209</td>
                <td className="py-2 pr-3 font-mono-num">2025</td>
                <td className="py-2">{activeLocale === "fi" ? "Leukemiasolut kaappaavat stroomansolujen biosähkön CaV1.2-depolarisaation kautta" : "Leukemia cells hijack stromal bioelectricity via CaV1.2 depolarization"}</td>
              </tr>
              <tr className="border-b border-card-border/40">
                <td className="py-2 pr-3 font-medium text-foreground">Koopman 2016 (PNAS)</td>
                <td className="py-2 pr-3 font-mono-num">2016</td>
                <td className="py-2">{activeLocale === "fi" ? "VNS → α7nAChR → merkitsevä vaste nivelreumaan" : "VNS → α7nAChR → significant response in rheumatoid arthritis"}</td>
              </tr>
              <tr className="border-b border-card-border/40">
                <td className="py-2 pr-3 font-medium text-foreground">Klimentidis 2011</td>
                <td className="py-2 pr-3 font-mono-num">2011</td>
                <td className="py-2">{activeLocale === "fi" ? "24 populaatiota 8 lajissa — myös kontrollieläimet lihovat (p < 10⁻⁷)" : "24 populations across 8 species — even control animals gaining weight (p < 10⁻⁷)"}</td>
              </tr>
              <tr className="border-b border-card-border/40">
                <td className="py-2 pr-3 font-medium text-foreground">PMC5034549</td>
                <td className="py-2 pr-3 font-mono-num">2016</td>
                <td className="py-2">{activeLocale === "fi" ? "Verapamiili (VGCC-estäjä) estää rintasyöpäsolujen kasvua in vitro" : "Verapamil (VGCC blocker) inhibits breast cancer cell growth in vitro"}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-xs text-foreground-muted italic mt-4 max-w-4xl">
          {activeLocale === "fi"
            ? "Episteeminen taso: Ionikanavien rooli jokaisessa sairaudessa [E] (GWAS, farmakologia, FDA). EMF → ionikanava -mekanismi [E] (Pall 2013). EMF → sairauskausaatio [C] (hypoteesi). Konvergenssimalli on TEOREETTINEN KEHYS — se ei todista kausaatiota. Jokainen sairaus on monitekijäinen. Se, että ionikanavalääke toimii, todistaa ionikanavien roolin OIREISSA mutta ei välttämättä SYYSSÄ."
            : "Epistemic level: Ion channel role in each disease [E] (GWAS, pharmacology, FDA). EMF → ion channel mechanism [E] (Pall 2013). EMF → disease causation [C] (hypothesis). The convergence model is a THEORETICAL FRAMEWORK — it does not prove causation. Each disease is multifactorial. That an ion channel drug works proves the ion channel role in SYMPTOMS but not necessarily in CAUSE."}
        </p>
      </section>

      {/* Disease Cascade Timeline */}
      <DiseaseCascadeTimeline locale={activeLocale} />

      {/* See also navigation */}
      <section className="mt-16 border-t editorial-rule pt-6">
        <h2 className="editorial-section-heading mb-4">
          {activeLocale === "fi" ? "Katso myös" : "See also"}
        </h2>
        <div className="grid gap-3 sm:grid-cols-2">
          <Link
            href={`/${activeLocale}/evidence`}
            className="block rounded-lg border border-card-border p-4 hover:border-accent transition-colors"
          >
            <span className="text-sm font-medium text-foreground">
              {activeLocale === "fi" ? "Evidenssirekisteri" : "Evidence Register"}
            </span>
            <p className="text-xs text-foreground-muted mt-1">
              {activeLocale === "fi" ? "Koko BERM v17 -evidenssirekisteri" : "Full BERM v17 evidence register"}
            </p>
          </Link>
          <Link
            href={`/${activeLocale}/evidence/eyes`}
            className="block rounded-lg border border-card-border p-4 hover:border-accent transition-colors"
          >
            <span className="text-sm font-medium text-foreground">
              {activeLocale === "fi" ? "Silmien väri ja magnetoreseptio" : "Eye Color & Magnetoreception"}
            </span>
            <p className="text-xs text-foreground-muted mt-1">
              {activeLocale === "fi" ? "CRY-herkkyys ja iiriksen pigmentaatio" : "CRY sensitivity and iris pigmentation"}
            </p>
          </Link>
          <Link
            href={`/${activeLocale}/evidence/nutrition`}
            className="block rounded-lg border border-card-border p-4 hover:border-accent transition-colors"
          >
            <span className="text-sm font-medium text-foreground">
              {activeLocale === "fi" ? "Ravitsemuksellinen CRY-modulaatio" : "Nutritional CRY Modulation"}
            </span>
            <p className="text-xs text-foreground-muted mt-1">
              {activeLocale === "fi" ? "B2, omega-rasvahapot ja paasto" : "B2, omega fatty acids, and fasting"}
            </p>
          </Link>
          <Link
            href={`/${activeLocale}/modulome/brain`}
            className="block rounded-lg border border-card-border p-4 hover:border-accent transition-colors"
          >
            <span className="text-sm font-medium text-foreground">
              {activeLocale === "fi" ? "Aivot — moduloomi" : "Brain — Modulome"}
            </span>
            <p className="text-xs text-foreground-muted mt-1">
              {activeLocale === "fi" ? "CACNA1C, 7 kehityskanavaa ja neurokehitys" : "CACNA1C, 7 developmental channels, and neurodevelopment"}
            </p>
          </Link>
        </div>
      </section>
    </div>
  );
}
