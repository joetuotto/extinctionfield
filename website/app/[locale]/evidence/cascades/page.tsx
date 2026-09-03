import type { Metadata } from "next";
import { Activity } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { BermIcon } from "@/components/BermIcon";
import { IonicHierarchyDiagram } from "@/components/IonicHierarchyDiagram";
import { DiseaseCascadeTimeline } from "@/components/DiseaseCascadeTimeline";
import { StudyCitation } from "@/components/StudyCitation";
import { InlineReferenceText } from "@/components/InlineReferenceText";
import Link from "next/link";
import { pickCopy } from "@/lib/i18n";

const COPY = {
  en: {
    title: "Disease Cascade: Ion Channel Convergence",
    subtitle: "The ionic treatment hierarchy, skin battery, ADHD, and the eight-disease convergence",
    backLink: "← Back to Evidence",
    // Shared table headers
    thCitation: "Citation",
    thYear: "Year",
    thFinding: "Finding",
    thDisease: "Disease",
    thIonChannel: "Ion channel",
    thIonicTreatment: "Ionic treatment",
    thTdpEvidence: "TDP evidence",
    // Section 1: Ionic Treatment Hierarchy
    ihHeading: "R4b-d: The Ionic Treatment Hierarchy",
    ihP1: "Retrodiction R4 states that depression responds better to electricity than chemistry. The ionic treatment hierarchy explains why: all mood disorder treatments — from SSRIs to psychedelics — ultimately converge on calcium homeostasis. Their efficacy tracks with the degree of ionic directness.",
    ihP2: "R4b — Lithium: Lithium is the world's oldest and most effective mood stabilizer, and the only one shown to reduce suicide mortality (meta-analysis of >14,000 patients). Its mechanism is ionic, not chemical: the Li⁺ ion permeates the voltage-gated sodium channel (VGSC), replaces Na⁺ at a 1:1 ratio, and normalizes cellular Na⁺/Ca²⁺ balance. GWAS studies link lithium response to ion channel genes — not serotonin pathways. No serotonin-based drug has ever been shown to reduce suicide mortality.",
    ihP3: "R4c — Psychedelics and Ca²⁺ convergence: Psilocybin's signal chain ([[ref:goodwin2022_psilocybin|NEJM 2022]], NNT ≈ 3) terminates at the Cav1.2 calcium channel (CACNA1C). Sousouri et al. (2025, [[ref:sousouri2025_cacna1c|PMC12491688]]) demonstrated that 5-HT2A → Gq → IP3 → Ca²⁺ ER release activates Cav1.2, producing a massive Ca²⁺ surge — the same channel that EMF modulates via the VGCC mechanism. Ketamine (NNT ≈ 3.5) achieves the same Ca²⁺ convergence through NMDA receptor blockade: NMDA block → glutamate surge → AMPA → Ca²⁺ influx. NMDA itself is an ion channel, not a neurotransmitter receptor.",
    ihP4: "R4d — The hierarchy: The five-level hierarchy (chemical < electromagnetic < ionic chronic < ionic reset < total ionic reset) explains why faster mechanisms predict greater efficacy. SSRIs (NNT 7) affect ion channels indirectly over weeks. TMS/tDCS (NNT 5–6) induce ion currents directly. Lithium replaces the Na⁺ ion directly. Psychedelics produce an acute Ca²⁺ reset within hours. ECT — psychiatry's most effective treatment (70–80% response in treatment-resistant cases) — triggers cortical spreading depolarization (CSD) that resets all ionic gradients across the entire cortex ([[ref:rosenthal2025_ect_csd|Rosenthal et al. 2025]], Nature Communications). This pattern is consistent only with the ion channel hypothesis.",
    ihFinding1: "21 antidepressants, 116,477 patients: NNT ≈ 7 for SSRIs",
    ihFinding2: "Psilocybin vs escitalopram: NNT ≈ 3, effect within hours",
    ihFinding3: "5-HT2A → Gq → IP3 → Cav1.2 (CACNA1C): psychedelics target the same channel as EMF",
    ihFinding4: "Li⁺ permeates VGSC, replaces Na⁺: ionic mechanism, not chemical",
    ihFinding5: "Ketamine: first RCT. NMDA is an ion channel, effect within hours",
    ihFinding6: "ECT triggers cortical spreading depolarization (CSD): total ionic reset",
    ihEpistemic: "Epistemic level: lithium ionic mechanism [E] ([[ref:elmallakh2004_lithium_ion|El-Mallakh/Bhansali]] data). Psychedelic Ca²⁺/CACNA1C convergence [E] ([[ref:sousouri2025|Sousouri 2025]]). ECT CSD mechanism [E] ([[ref:rosenthal2025_ect_csd|Rosenthal 2025]]). Hierarchy prediction [M|C] (BERM; L2 operator open).",
    // Section 2: Skin Battery
    sbHeading: "The Skin Battery — dermal bioelectric sensor system",
    sbP1: "Skin is not a passive barrier but an active bioelectric sensor network. The epidermis maintains a continuous transepithelial potential (TEP, 10–60 mV) via Na⁺/K⁺-ATPase — a literal battery that generates an electric field across the skin. When skin is wounded, TEP collapses and generates a lateral electric field (100–200 mV/mm) that guides keratinocyte and fibroblast electrotaxis. This electrical signal is the first healing signal — BEFORE biochemical signals.",
    sbP2: "The skin dermis is primarily collagen, which is piezoelectric (7–8 pC/N): it converts mechanical force directly into electrical signal. Touch perception is not solely the work of mechanical receptors (PIEZO1/2) — it is also a piezoelectric process where collagen generates voltage that opens the SAME voltage-gated calcium channels (VGCC) that BERM identifies as EMF targets. Mechanical touch and EMF converge on the same Ca²⁺ channel.",
    sbP3: "Keratinocyte TRPV4 is a multimodal ion channel that responds to mechanical pressure, heat (>27°C), UVB radiation, and osmotic pressure — all producing the same Ca²⁺ response. TRPV4 also mediates histaminergic itch. If EMF activates TRPV4, the result is itch indistinguishable from allergic itch. This explains why the most common EHS skin symptoms (tingling, burning, itching) are biologically predictable responses, not nocebo phenomena.",
    sbP4: "[[ref:skedung2013_nanoscale_touch|Skedung]] et al. (2013, Scientific Reports) demonstrated that the human finger detects 13 nm ridges — a scale difference of 15,000:1 relative to fingerprint ridges. Mechanical models cannot explain this precision. The piezoelectric + ion channel explanation can: nanometer surface structure generates an electrical signal sufficient to activate VGCC/PIEZO1/TRPV4 channels. This proves the skin sensory system operates at a level where distinguishing EMF from natural bioelectric signals is impossible.",
    sbFinding1: "TEP 'skin battery' 10–60 mV in mammalian skin",
    sbFinding2: "Endogenous wound EF 100–200 mV/mm, first healing signal",
    sbFinding3: "Bone piezoelectricity (extended: collagen 7–8 pC/N)",
    sbFinding4: "PIEZO1 in keratinocytes: mechanotransduction and Ca²⁺/Na⁺ permeability",
    sbFinding5: "Human finger detects 13 nm ridges — scale difference 15,000:1",
    sbFinding6: "TRPV4 mediates Ca²⁺ influx and histaminergic itch in keratinocytes",
    sbEpistemic: "Epistemic level: TEP and wound EF [E] ([[ref:lim2024_skin_battery|Lim]]/[[ref:zhao2006_wound_ef|Zhao]]). Piezoelectric collagen [E] ([[ref:fukada1957_piezo|Fukada/Yasuda]]). VGCC convergence [E] ([[ref:pall2013_v2|Pall/PMC5828134]]). EHS explanation [M|C] (model).",
    // Section 3: ADHD
    adhdHeading: "ADHD: A Developmental Ion Channel Calibration Error",
    adhdP1: "The conventional explanation of ADHD (dopamine deficit in prefrontal cortex) does not answer WHY the dopamine system is disrupted. BERM's ion channel framework offers an upstream answer: ADHD is a developmental ion channel calibration error that occurs when fetal or early childhood neural ion channels calibrate to an EMF-contaminated environment. This is based on three independent evidence lines: GWAS (CACNA1C variants in ADHD), epidemiology ([[ref:li2020_jama_adhd|Li 2020]] JAMA, prenatal EMF → ADHD), and pharmacology (guanfacine acts on ion channels, not neurotransmitters).",
    adhdP2: "GWAS evidence: CACNA1C (Cav1.2) gene variants repeatedly associate with ADHD, autism, bipolar disorder, and depression ([[ref:pmc6101623_cacna1c_gwas|PMC6101623]], [[ref:pmc6679227_cacna1c_review|PMC6679227]]). This is the SAME gene/channel that modulates EMF sleep effects ([[ref:sousouri2025|Sousouri 2025]]), is the psychedelic signal chain target, and participates in AD's Ca²⁺ cascade. Timothy syndrome (de novo CACNA1C gain-of-function G406R) causes autism with high penetrance — VGCC OVERACTIVITY = autistic phenotype. Other VGCC genes (CACNA1A, CACNA1H, CACNA1I) also associate with neurodevelopmental disorders ([[ref:pmc4643966_cacna1a_asd|PMC4643966]], [[ref:pmc8957782_cacna1h_asd|PMC8957782]]).",
    adhdP3: "Epidemiological evidence: [[ref:li2020_jama_adhd|Li et al.]] (2020, JAMA Network Open) followed 1482 mother-child pairs in the Kaiser Permanente cohort. Prenatal EMF was measured OBJECTIVELY (MF meter, 24h). High prenatal MF exposure associated with ADHD risk, specifically PERSISTENT and SEVERE ADHD and ADHD with immune-mediated comorbidities. The same research group has shown the same exposure associates with miscarriage (OR 2.72), childhood obesity, and asthma — ONE exposure, MULTIPLE outcomes, as the modulome predicts.",
    adhdP4: "Pharmacological evidence: Guanfacine (Intuniv, FDA/EMA-approved for ADHD) does NOT touch dopamine. It is an α2A-adrenergic agonist that inhibits cAMP → CLOSES HCN channels → stabilizes membrane potential → prefrontal cortex signal-to-noise ratio improves ([[ref:wang2007_guanfacine_hcn|Wang et al.]] 2007, Cell). This is a DIRECT ion channel intervention. Guanfacine works precisely on those ADHD symptoms (impulsivity, emotional regulation) requiring the finest ionic control. Stimulants instead COMPENSATE for the calibration error by raising the signal — guanfacine CORRECTS the threshold.",
    adhdP5: "Calibration window: the prefrontal cortex is the last brain region to mature. If fetal and early childhood (0–10 y) ion channel tuning occurs in an EMF-contaminated environment, HCN channels tune to a higher noise floor and VGCCs set to activate at a higher threshold — signal-to-noise ratio remains low. [[ref:pmc7287020_hong_lifelong|Hong et al.]] (2020, [[ref:pmc7287020_hong_lifelong|PMC7287020]]) showed prenatal mobile phone exposure affects cognition in AGED rat offspring — the effect is LIFELONG.",
    adhdFinding1: "Prenatal MF → ADHD risk ↑ (1482 pairs, 20y follow-up, objective measurement)",
    adhdFinding2: "CACNA1C variants associate with ADHD, ASD, bipolar, MDD (GWAS)",
    adhdFinding3: "Timothy syndrome CACNA1C gain-of-function → axon targeting and behavior altered",
    adhdFinding4: "α2A → cAMP↓ → HCN closure → PFC working memory networks strengthened (guanfacine mechanism)",
    adhdFinding5: "800–1900 MHz fetal exposure in mice → neurodevelopmental and behavioral changes",
    adhdFinding6: "Prenatal mobile phone exposure → cognitive decline in AGED offspring (lifelong)",
    adhdFinding7: "VGCCs are critical for brain DEVELOPMENT — channel expression regulates neural network formation",
    adhdEpistemic: "Epistemic level: CACNA1C × neurodevelopment [E] (GWAS, replicated). Prenatal EMF → ADHD [E] ([[ref:li2020_jama_adhd|Li 2020]] JAMA, objective measurement). Guanfacine HCN mechanism [E] ([[ref:wang2007_guanfacine_hcn|Wang 2007]] Cell, FDA/EMA). Calibration window theory [C] (theoretical framework). ADHD is multifactorial — EMF is one possible risk factor. [[ref:li2020_jama_adhd|Li 2020]] is a single cohort — replication critical.",
    // Section 4: Ion Convergence
    icHeading: "The Ion Channel Convergence: Eight Diseases, One Model",
    icP1: "Every BERM cascade disease follows the same structure: (1) GWAS association with ion channel genes, (2) most effective treatment targets ion channels, (3) EMF exposure associates with the disease, (4) mechanistic chain from EMF → ion channel → pathology. This is not coincidence — it is BERM's core claim: environmental EMF disrupts ion channel homeostasis, and different diseases are manifestations of the same disruption in different tissues at different latencies.",
    icBipolarP: "Bipolar disorder is the model's most elegant case. Computational models ([[ref:pubmed32278494_bipolar_ionic|PubMed 32278494]], Translational Psychiatry) directly show that bipolar hippocampal neurons oscillate between hyperexcitability and hypoexcitability due to ion channel conductance changes. El-Mallakh's Na,K-ATPase hypothesis explains both poles: MILD pump dysfunction → excitability ↑ → mania; MORE SEVERE dysfunction → neurotransmitter release ↓ → depression. Lithium (Li⁺) traverses VGSC and accumulates preferentially in hyperactive neurons → dampens oscillation. Antiepileptics (valproate, carbamazepine, lamotrigine) work for BOTH epilepsy AND bipolar because the SAME ionic excitability regulation is disrupted in both — at different timescales.",
    icMetabolicP: "Metabolic syndrome: the pancreatic β-cell K-ATP channel (Kir6.2 + SUR1) is the MASTER SWITCH of insulin regulation. Glucose ↑ → ATP ↑ → K-ATP closes → depolarization → VGCC opens → Ca²⁺ → insulin release. Sulfonylureas (FDA-approved) close the K-ATP channel DIRECTLY. US Patent [[ref:patent_4850959_insulin|4850959]] (1989) proves: resonance-EMF controls β-cell insulin secretion via calcium channels. [[ref:klimentidis2010|Klimentidis 2011]]: even lab control animals are gaining weight (p = 1.2 × 10⁻⁷, 8 species) — environmental change, not diet alone.",
    icAutoimmuneP: "Autoimmune diseases: α7 nicotinic acetylcholine receptor (α7nAChR) — an ion channel (ligand-gated cation channel) — regulates the cholinergic anti-inflammatory pathway. VNS (FDA-approved) activates α7nAChR → NF-κB ↓ → inflammation decreases. EMF activates NF-κB via the VGCC-Ca²⁺ pathway ([[ref:pall2013_v2|Pall 2013]]), while vagal signaling weakens. EMF is functionally 'anti-VNS'. [[ref:koopman2016_vns_ra|Koopman 2016]] (PNAS): VNS produced significant response in rheumatoid arthritis.",
    icCancerP: "Cancer is the consequence of cumulative depolarization. Normal cells: Vm ≈ −60 mV (hyperpolarized). Cancer cells: Vm ≈ −15 mV (depolarized). Levin (2012) showed directly: oncogene overexpression depolarizes cells → tumor. But if depolarization is prevented by hyperpolarizing ion channels → tumor does NOT form even with active oncogene. [[ref:pmc12533209_leukemia_bioelectric|PMC12533209]] (2025): leukemia cells 'hijack' stromal cell bioelectricity via CaV1.2 depolarization. TTFields (FDA-approved) and verapamil (VGCC blocker, [[ref:pmc5034549_verapamil_cancer|PMC5034549]]) are direct ionic cancer treatments.",
    icDisSleep: "1. Sleep",
    icDisDepBipolar: "2. Depression/bipolar",
    icDisT2D: "4. T2D/metabolic",
    icDisAutoimmune: "5. Autoimmune",
    icDisInfertility: "6. Infertility",
    icDisCancer: "7. Cancer",
    icTreatMelatonin: "Melatonin",
    icTreatGuanfacine: "Guanfacine",
    icTreatGuanfacineFDA: "Guanfacine (FDA/EMA)",
    icTreatSulfonylureas: "Sulfonylureas",
    icTreatTTFieldsVerap: "TTFields, verapamil",
    icClinicalPilot: "clinical pilot",
    icFinding1: "Bipolar neurons: ion conductance changes → hyper/hypoexcitability oscillation",
    icFinding2: "Na,K-ATPase hypothesis: mild dysfunction → mania, severe → depression",
    icFinding3: "K⁺ channels in bipolar disorder — comprehensive review",
    icFinding4: "Leukemia cells hijack stromal bioelectricity via CaV1.2 depolarization",
    icFinding5: "VNS → α7nAChR → significant response in rheumatoid arthritis",
    icFinding6: "24 populations across 8 species — even control animals gaining weight (p < 10⁻⁷)",
    icFinding7: "Verapamil (VGCC blocker) inhibits breast cancer cell growth in vitro",
    icEpistemic: "Epistemic level: Ion channel role in each disease [E] (GWAS, pharmacology, FDA). EMF → ion channel mechanism [E] ([[ref:pall2013_v2|Pall 2013]]). EMF → disease causation [C] (hypothesis). The convergence model is a THEORETICAL FRAMEWORK — it does not prove causation. Each disease is multifactorial. That an ion channel drug works proves the ion channel role in SYMPTOMS but not necessarily in CAUSE.",
    // Section 5: See Also
    seeAlso: "See also",
    evidenceRegister: "Evidence Register",
    evidenceRegisterDesc: "Full BERM v17 evidence register",
    eyeColorTitle: "Eye Color & Magnetoreception",
    eyeColorDesc: "CRY sensitivity and iris pigmentation",
    nutritionTitle: "Nutritional CRY Modulation",
    nutritionDesc: "B2, omega fatty acids, and fasting",
    brainTitle: "Brain — Modulome",
    brainDesc: "CACNA1C, 7 developmental channels, and neurodevelopment",
  },
  fi: {
    title: "Tautikaskadi: ionikanavayhdentyminen",
    subtitle: "Ioninen hoitohierarkia, ihoakku, ADHD ja kahdeksan sairauden yhdentyminen",
    backLink: "← Takaisin näyttöön",
    // Shared table headers
    thCitation: "Viite",
    thYear: "Vuosi",
    thFinding: "Löydös",
    thDisease: "Sairaus",
    thIonChannel: "Ionikanava",
    thIonicTreatment: "Ioninen hoito",
    thTdpEvidence: "TDP-todiste",
    // Section 1: Ionic Treatment Hierarchy
    ihHeading: "R4b-d: Ioninen hoitohierarkia",
    ihP1: "Retrodiktio R4 esittää, että masennus reagoi paremmin sähköön kuin kemiaan. Ioninen hoitohierarkia selittää, miksi: kaikki mielialahäiriöiden hoidot — SSRI:istä psykedeeleihin — yhtyvät lopulta kalsiumhomeostaasiin. Niiden tehokkuus seuraa ionisen kohdistuksen astetta.",
    ihP2: "R4b — Litium: Litium on maailman vanhin ja tehokkain mielialastabilisaattori, ja ainoa, joka vähentää itsemurhakuolleisuutta (meta-analyysi >14 000 potilasta). Sen mekanismi on ioninen, ei kemiallinen: Li⁺-ioni läpäisee jänniteriippuvaisen natriumkanavan (VGSC), korvaa Na⁺:n 1:1-suhteessa ja normalisoi solujen Na⁺/Ca²⁺-tasapainon. GWAS-tutkimukset liittävät litiumvasteen ionikanavageeneihin — ei serotoniiniteihin. Yhtään serotoniinilääkettä ei ole koskaan osoitettu vähentävän itsemurhakuolleisuutta.",
    ihP3: "R4c — Psykedeelit ja Ca²⁺-yhdentyminen: Psilosybiinin ([[ref:goodwin2022_psilocybin|NEJM 2022]], NNT ≈ 3) signaaliketju päättyy Cav1.2-kalsiumkanavaan (CACNA1C). Sousouri ym. (2025, [[ref:sousouri2025_cacna1c|PMC12491688]]) osoittivat, että 5-HT2A → Gq → IP3 → Ca²⁺-ER-vapautuminen aktivoi Cav1.2:n kautta massiivisen Ca²⁺-aallon — saman kanavan jonka EMF säätelee VGCC-mekanismin kautta. Ketamiini (NNT ≈ 3,5) saavuttaa saman Ca²⁺-yhdentymisen NMDA-reseptorieston kautta: NMDA-esto → glutamaattipurkaus → AMPA → Ca²⁺-sisäänvirtaus. NMDA itsessään on ionikanava, ei välittäjäainereseptori.",
    ihP4: "R4d — Hierarkia: Viisitasoinen hierarkia (kemiallinen < sähkömagneettinen < ioninen krooninen < ioninen reset < totaalinen ioninen nollaus) selittää, miksi nopeampi vaikutusmekanismi ennustaa suurempaa tehoa. SSRI:t (NNT 7) vaikuttavat ionikanaviin epäsuorasti viikkojen viiveellä. TMS/tDCS (NNT 5–6) indusoivat ionivirtoja suoraan. Litium korvaa Na⁺-ionin suoraan. Psykedeelit tuottavat akuutin Ca²⁺-resetin tunneissa. ECT — psykiatrian tehokkain hoito (70–80 % vaste hoitoresistenteissä) — laukaisee leviävän depolarisaatioaallon (CSD), joka nollaa koko korteksin ionigradientit ([[ref:rosenthal2025_ect_csd|Rosenthal ym. 2025]], Nature Communications). Tämä kuvio on yhteensopiva vain ionikanavahypoteesin kanssa.",
    ihFinding1: "21 masennuslääkettä, 116 477 potilasta: NNT ≈ 7 SSRI:ille",
    ihFinding2: "Psilosybiini vs essitalopraami: NNT ≈ 3, vaikutus tunneissa",
    ihFinding3: "5-HT2A → Gq → IP3 → Cav1.2 (CACNA1C): psykedeelit kohdistuvat samaan kanavaan kuin EMF",
    ihFinding4: "Li⁺ läpäisee VGSC:n, korvaa Na⁺:n: ionimekanismi, ei kemiallinen",
    ihFinding5: "Ketamiini: ensimmäinen RCT. NMDA on ionikanava, vaikutus tunneissa",
    ihFinding6: "ECT laukaisee leviävän depolarisaatioaallon (CSD): totaalinen ioninen nollaus",
    ihEpistemic: "Episteeminen taso: litiumin ionimekanismi [E] ([[ref:elmallakh2004_lithium_ion|El-Mallakh/Bhansali]] data). Psykedeelien Ca²⁺/CACNA1C-yhdentyminen [E] ([[ref:sousouri2025|Sousouri 2025]]). ECT:n CSD-mekanismi [E] ([[ref:rosenthal2025_ect_csd|Rosenthal 2025]]). Hierarkiaennuste [M|C] (BERM; L2-operaattori avoin).",
    // Section 2: Skin Battery
    sbHeading: "Ihoakku — ihon biosähköinen sensorijärjestelmä",
    sbP1: "Iho ei ole passiivinen suoja vaan aktiivinen biosähköinen sensoriverkko. Epidermis ylläpitää jatkuvaa transepiteliaalista potentiaalia (TEP, 10–60 mV) Na⁺/K⁺-ATPaasin avulla — kirjaimellinen paristo, joka tuottaa sähkökentän ihon läpi. Kun iho vaurioituu, TEP romahtaa ja tuottaa lateraalisen sähkökentän (100–200 mV/mm), joka ohjaa keratinosyyttien ja fibroblastien elektrotaksista. Tämä sähköinen signaali on ensimmäinen parantava signaali — ENNEN biokemiallisia signaaleja.",
    sbP2: "Ihon dermis on pääasiassa kollageenia, joka on pietsosähköinen (7–8 pC/N): se muuntaa mekaanisen voiman suoraan sähköiseksi signaaliksi. Kosketuksen havaitseminen ei ole pelkästään mekaanisten reseptorien (PIEZO1/2) toimintaa — se on myös pietsosähköinen prosessi, jossa kollageeni tuottaa jännitteen, joka avaa SAMAT jänniteohjatut kalsiumkanavat (VGCC) jotka BERM identifioi EMF:n kohteiksi. Mekaaninen kosketus ja EMF yhtyvät samaan Ca²⁺-kanavaan.",
    sbP3: "Keratinosyyttien TRPV4 on multimodaalinen ionikanava, joka reagoi mekaaniseen paineeseen, lämpöön (>27°C), UVB-säteilyyn ja osmoottiseen paineeseen — kaikki samaksi Ca²⁺-vasteeksi. TRPV4 välittää myös histaminergista kutinaa. Jos EMF aktivoi TRPV4:ää, tuloksena on kutina, joka on erottamaton allergisesta kutinasta. Tämä selittää, miksi EHS:n yleisimmät iho-oireet (pistely, polttelu, kutina) ovat biologisesti ennustettavia vasteita, eivät nocebo-ilmiöitä.",
    sbP4: "[[ref:skedung2013_nanoscale_touch|Skedung]] ym. (2013, Scientific Reports) osoittivat, että ihmisen sormi havaitsee 13 nm kohoumat — kokoluokkaero sormenjälkiharjanteeseen nähden on 15 000:1. Mekaaniset mallit eivät selitä tätä tarkkuutta. Pietsosähköinen + ionikanavaselitys voi: nanometritason pintarakenne tuottaa sähköisen signaalin, joka on riittävän voimakas aktivoimaan VGCC/PIEZO1/TRPV4-kanavia. Tämä todistaa, että ihon sensorijärjestelmä toimii tasolla, jossa EMF:n ja luonnollisten biosähköisten signaalien erottaminen on mahdotonta.",
    sbFinding1: "TEP 'ihoakku' 10–60 mV nisäkkään ihossa",
    sbFinding2: "Endogeeninen haavan sähkökenttä 100–200 mV/mm, ensimmäinen parantava signaali",
    sbFinding3: "Luun pietsosähköisyys (laajennettu: kollageeni 7–8 pC/N)",
    sbFinding4: "PIEZO1 keratinosyyteissä: mekanotransduktio ja Ca²⁺/Na⁺-permeabiliteetti",
    sbFinding5: "Ihmisen sormi havaitsee 13 nm kohoumat — kokoluokkaero 15 000:1",
    sbFinding6: "TRPV4 välittää Ca²⁺-sisäänvirtausta ja histaminergista kutinaa keratinosyyteissä",
    sbEpistemic: "Episteeminen taso: TEP ja haavan sähkökenttä [E] ([[ref:lim2024_skin_battery|Lim]]/[[ref:zhao2006_wound_ef|Zhao]]). Pietsosähköinen kollageeni [E] ([[ref:fukada1957_piezo|Fukada/Yasuda]]). VGCC-yhdentyminen [E] ([[ref:pall2013_v2|Pall/PMC5828134]]). EHS-selitys [M|C] (malli).",
    // Section 3: ADHD
    adhdHeading: "ADHD: kehityksellinen ionikanavien kalibraatiovirhe",
    adhdP1: "ADHD:n konventionaalinen selitys (dopamiinivajaus prefrontaalisessa korteksissa) ei vastaa kysymykseen MIKSI dopamiinijärjestelmä on häiriintynyt. BERM:n ionikanavakehys tarjoaa ylävirtaan menevän vastauksen: ADHD on kehityksellinen ionikanavien kalibraatiovirhe, joka syntyy kun sikiön tai varhaisen lapsuuden hermoverkon ionikanavat kalibroituvat EMF-kontaminoidussa ympäristössä. Tämä perustuu kolmeen itsenäiseen todistuslinjaan: GWAS (CACNA1C-variantit ADHD:ssä), epidemiologia ([[ref:li2020_jama_adhd|Li 2020]] JAMA, raskausaikainen EMF → ADHD) ja farmakologia (guanfasiini toimii ionikanaviin, ei neurotransmittereihin).",
    adhdP2: "GWAS-todiste: CACNA1C (Cav1.2) -geenin variantit assosioituvat toistuvasti ADHD:hen, autismiin, bipolaarihäiriöön ja masennukseen ([[ref:pmc6101623_cacna1c_gwas|PMC6101623]], [[ref:pmc6679227_cacna1c_review|PMC6679227]]). Tämä on SAMA geeni/kanava, joka säätelee EMF:n uni-vaikutusta ([[ref:sousouri2025|Sousouri 2025]]), on psykedeelien signaaliketjun kohde ja osallistuu AD:n Ca²⁺-kaskadiin. Timothy-oireyhtymä (de novo CACNA1C gain-of-function G406R) aiheuttaa autismin korkealla penetranssilla — VGCC:n YLITOIMINTA = autistinen fenotyyppi. Muut VGCC-geenit (CACNA1A, CACNA1H, CACNA1I) assosioituvat myös neurokehityshäiriöihin ([[ref:pmc4643966_cacna1a_asd|PMC4643966]], [[ref:pmc8957782_cacna1h_asd|PMC8957782]]).",
    adhdP3: "Epidemiologinen todiste: [[ref:li2020_jama_adhd|Li ym.]] (2020, JAMA Network Open) seurasivat 1482 äiti-lapsi-paria Kaiser Permanente -kohortissa. Raskausaikainen EMF mitattiin OBJEKTIIVISESTI (MF-mittari 24h). Korkea raskausaikainen MF-altistus assosioi ADHD-riskiin, erityisesti PYSYVÄÄN ja VAIKEAAN ADHD:hen sekä ADHD:hen immuunivälitteisten liitännäissairauksien kanssa. Sama tutkimusryhmä on osoittanut saman altistuksen assosioivan myös keskenmenoon (OR 2.72), lapsuuden lihavuuteen ja astmaan — YKSI altistus, MONTA vastetta, kuten modulooma ennustaa.",
    adhdP4: "Farmakologinen todiste: Guanfasiini (Intuniv, FDA/EMA-hyväksytty ADHD:hen) EI koske dopamiiniin. Se on α2A-adrenerginen agonisti, joka estää cAMP:n → SULKEE HCN-kanavat → stabiloi membraanipotentiaalin → prefrontaalisen korteksin signaali-kohinasuhde paranee ([[ref:wang2007_guanfacine_hcn|Wang ym.]] 2007, Cell). Tämä on SUORA ionikanavainterventio. Guanfasiini toimii juuri niihin ADHD-oireisiin (impulsiivisuus, emotionaalinen säätely), jotka vaativat tarkinta ionista kontrollia. Stimulantit sen sijaan KOMPENSOIVAT kalibraatiovirhettä nostamalla signaalia — guanfasiini KORJAA kynnystä.",
    adhdP5: "Kalibraatioikkuna: prefrontaalinen korteksi on viimeiseksi kypsyvä aivoalue. Jos sikiökauden ja varhaisen lapsuuden (0–10 v) ionikanavien viritys tapahtuu EMF-kontaminoidussa ympäristössä, HCN-kanavat viritetään korkeammalle kohinatasolle ja VGCC:t asetetaan aktivoitumaan korkeammalla kynnyksellä — signaali-kohinasuhde jää matalaksi. [[ref:pmc7287020_hong_lifelong|Hong ym.]] (2020, [[ref:pmc7287020_hong_lifelong|PMC7287020]]) osoittivat raskausaikaisen matkapuhelinaltistuksen vaikuttavan kognitioon VANHOISSA rottien jälkeläisissä — vaikutus on ELINIKÄINEN.",
    adhdFinding1: "Raskausaikainen MF → ADHD-riski ↑ (1482 paria, 20v seuranta, objektiivinen mittaus)",
    adhdFinding2: "CACNA1C-variantit assosioituvat ADHD:hen, ASD:hen, bipolaarihäiriöön, MDD:hen (GWAS)",
    adhdFinding3: "Timothy-oireyhtymän CACNA1C gain-of-function → aksonikohdennus ja käyttäytyminen muuttuvat",
    adhdFinding4: "α2A → cAMP↓ → HCN sulkeutuu → PFC:n työmuistiverkot vahvistuvat (guanfasiinin mekanismi)",
    adhdFinding5: "800–1900 MHz sikiöaltistus hiirillä → neurokehityksen ja käyttäytymisen muutokset",
    adhdFinding6: "Raskausaikainen matkapuhelinaltistus → kognitiivinen heikkeneminen VANHOISSA jälkeläisissä (elinikäinen)",
    adhdFinding7: "VGCC:t ovat kriittisiä aivojen KEHITYKSELLE — kanavaekspressio säätelee hermoverkon muodostumista",
    adhdEpistemic: "Episteeminen taso: CACNA1C × neurokehitys [E] (GWAS, replikoitu). Raskausaikainen EMF → ADHD [E] ([[ref:li2020_jama_adhd|Li 2020]] JAMA, objektiivinen mittaus). Guanfasiini HCN-mekanismi [E] ([[ref:wang2007_guanfacine_hcn|Wang 2007]] Cell, FDA/EMA). Kalibraatioikkunateoria [C] (teoreettinen kehys). ADHD on monitekijäinen — EMF on yksi mahdollinen riskitekijä. [[ref:li2020_jama_adhd|Li 2020]] on yksittäinen kohortti — replikaatio kriittistä.",
    // Section 4: Ion Convergence
    icHeading: "Ionikanavayhdentyminen: kahdeksan sairautta, yksi malli",
    icP1: "Jokainen BERM-kaskadin sairaus noudattaa samaa rakennetta: (1) GWAS-assosiaatio ionikanavageeneihin, (2) tehokkain hoito kohdistuu ionikanaviin, (3) EMF-altistus assosioituu sairauteen, (4) mekanistinen ketju EMF → ionikanava → taudinkuva. Tämä ei ole sattuma — se on BERM:n ydinväite: ympäristö-EMF häiritsee ionikanavahomeostaasia, ja eri sairaudet ovat saman häiriön ilmentymiä eri kudoksissa eri viiveillä.",
    icBipolarP: "Bipolaarihäiriö on mallin eleganttein tapaus. Laskennalliset mallit ([[ref:pubmed32278494_bipolar_ionic|PubMed 32278494]], Translational Psychiatry) osoittavat suoraan, että bipolaariset hippokampusneuronit heilahtelevat hypereksitaabeliuden ja hypoeksitaabeliuden välillä ionikanavien konduktanssimuutosten vuoksi. El-Mallakhin Na,K-ATPaasi-hypoteesi selittää molemmat ääripäät: LIEVÄ pumpun häiriö → eksitabiliteetti ↑ → mania; VOIMAKKAAMPI häiriö → neurotransmitterien vapautuminen ↓ → depressio. Litium (Li⁺) kulkee VGSC:n kautta ja kertyy ensisijaisesti hyperaktiivisiin neuroneihin → vaimentaa oskillaation. Antiepileptit (valproaatti, karbamatsepiini, lamotrigiini) toimivat SEKÄ epilepsiaan ETTÄ bipolaarihäiriöön koska SAMA ionisen eksitabiliteetin säätely on häiriintynyt molemmissa — eri aikaskaalalla.",
    icMetabolicP: "Metabolinen oireyhtymä: haiman β-solujen K-ATP-kanava (Kir6.2 + SUR1) on insuliinisäätelyn PÄÄKYTKIN. Glukoosi ↑ → ATP ↑ → K-ATP sulkeutuu → depolarisaatio → VGCC avautuu → Ca²⁺ → insuliini vapautuu. Sulfonyyliureat (FDA-hyväksytyt) sulkevat K-ATP-kanavan SUORAAN. US Patent [[ref:patent_4850959_insulin|4850959]] (1989) todistaa: resonanssi-EMF kontrolloi β-solujen insuliinieritystä kalsiumkanavien kautta. [[ref:klimentidis2010|Klimentidis 2011]]: myös laboratorion kontrollieläimet lihovat (p = 1.2 × 10⁻⁷, 8 lajia) — ympäristömuutos, ei pelkkä ruokavalio.",
    icAutoimmuneP: "Autoimmuunisairaudet: α7-nikotiininen asetyylikoliinireseptori (α7nAChR) — ionikanava (ligandiohjattu kationikanava) — säätelee kolinergistä anti-inflammatorista refleksiä. VNS (FDA-hyväksytty) aktivoi α7nAChR:n → NF-κB ↓ → tulehdus vähenee. EMF aktivoi NF-κB:tä VGCC-Ca²⁺-reitin kautta ([[ref:pall2013_v2|Pall 2013]]), samalla kun vagushermon signalointi heikkenee. EMF on funktionaalisesti 'anti-VNS'. [[ref:koopman2016_vns_ra|Koopman 2016]] (PNAS): VNS tuotti merkitsevän vasteen nivelreumaan.",
    icCancerP: "Syöpä on kumulatiivisen depolarisaation seuraus. Normaalit solut: Vm ≈ −60 mV (hyperpolaroitunut). Syöpäsolut: Vm ≈ −15 mV (depolaroitunut). Levin (2012) osoitti suoraan: onkogeenin yliekspressio depolarisoi soluja → kasvain. Mutta jos depolarisaatio estetään hyperpolaroivilla ionikanavilla → kasvain EI muodostu vaikka onkogeeni on aktiivinen. [[ref:pmc12533209_leukemia_bioelectric|PMC12533209]] (2025): leukemiasolut 'kaappaavat' stroomansolujen biosähkön CaV1.2-depolarisaation kautta. TTFields (FDA-hyväksytty) ja verapamiili (VGCC-estäjä, [[ref:pmc5034549_verapamil_cancer|PMC5034549]]) ovat suoria ionisia syöpähoitoja.",
    icDisSleep: "1. Uni",
    icDisDepBipolar: "2. Masennus/bipolaari",
    icDisT2D: "4. T2D/metabolinen",
    icDisAutoimmune: "5. Autoimmuuni",
    icDisInfertility: "6. Hedelmättömyys",
    icDisCancer: "7. Syöpä",
    icTreatMelatonin: "Melatoniini",
    icTreatGuanfacine: "Guanfasiini",
    icTreatGuanfacineFDA: "Guanfasiini (FDA/EMA)",
    icTreatSulfonylureas: "Sulfonyyliureat",
    icTreatTTFieldsVerap: "TTFields, verapamiili",
    icClinicalPilot: "kliininen pilotti",
    icFinding1: "Bipolaariset neuronit: ionisen konduktanssin muutokset → hyper/hypoeksitaabelisuuden oskillaatio",
    icFinding2: "Na,K-ATPaasi-hypoteesi: lievä häiriö → mania, voimakkaampi → depressio",
    icFinding3: "K⁺-kanavat bipolaarihäiriössä — kattava katsaus",
    icFinding4: "Leukemiasolut kaappaavat stroomansolujen biosähkön CaV1.2-depolarisaation kautta",
    icFinding5: "VNS → α7nAChR → merkitsevä vaste nivelreumaan",
    icFinding6: "24 populaatiota 8 lajissa — myös kontrollieläimet lihovat (p < 10⁻⁷)",
    icFinding7: "Verapamiili (VGCC-estäjä) estää rintasyöpäsolujen kasvua in vitro",
    icEpistemic: "Episteeminen taso: Ionikanavien rooli jokaisessa sairaudessa [E] (GWAS, farmakologia, FDA). EMF → ionikanava -mekanismi [E] ([[ref:pall2013_v2|Pall 2013]]). EMF → sairauskausaatio [C] (hypoteesi). Yhdentymismalli on TEOREETTINEN KEHYS — se ei todista kausaatiota. Jokainen sairaus on monitekijäinen. Se, että ionikanavalääke toimii, todistaa ionikanavien roolin OIREISSA mutta ei välttämättä SYYSSÄ.",
    // Section 5: See Also
    seeAlso: "Katso myös",
    evidenceRegister: "Näyttörekisteri",
    evidenceRegisterDesc: "Koko BERM v17 -näyttörekisteri",
    eyeColorTitle: "Silmien väri ja magnetoreseptio",
    eyeColorDesc: "CRY-herkkyys ja iiriksen pigmentaatio",
    nutritionTitle: "Ravitsemuksellinen CRY-modulaatio",
    nutritionDesc: "B2, omega-rasvahapot ja paasto",
    brainTitle: "Aivot — moduloomi",
    brainDesc: "CACNA1C, 7 kehityskanavaa ja neurokehitys",
  },
  ja: {
    title: "疾患カスケード：イオンチャネル収束",
    subtitle: "イオン治療階層、皮膚電池、ADHD、および8疾患の収束",
    backLink: "← エビデンスに戻る",
    // Shared table headers
    thCitation: "引用",
    thYear: "年",
    thFinding: "所見",
    thDisease: "疾患",
    thIonChannel: "イオンチャネル",
    thIonicTreatment: "イオン治療",
    thTdpEvidence: "TDP証拠",
    // Section 1: Ionic Treatment Hierarchy
    ihHeading: "R4b-d：イオン治療階層",
    ihP1: "逆予測R4は、うつ病は化学療法よりも電気療法に良く反応すると述べている。イオン治療階層はその理由を説明する：SSRIからサイケデリクスまで、すべての気分障害治療は最終的にカルシウムホメオスタシスに収束する。その有効性はイオン直接性の程度に追従する。",
    ihP2: "R4b — リチウム：リチウムは世界最古かつ最も効果的な気分安定薬であり、自殺死亡率を低下させることが示された唯一の薬剤である（>14,000人のメタ分析）。そのメカニズムはイオン性であり、化学的ではない：Li⁺イオンは電位依存性ナトリウムチャネル（VGSC）を透過し、Na⁺を1:1の比率で置換し、細胞のNa⁺/Ca²⁺バランスを正常化する。GWAS研究はリチウム応答をイオンチャネル遺伝子に結びつけている — セロトニン経路ではない。セロトニン系薬剤が自殺死亡率を低下させることは一度も示されていない。",
    ihP3: "R4c — サイケデリクスとCa²⁺収束：シロシビンのシグナル鎖（[[ref:goodwin2022_psilocybin|NEJM 2022]]、NNT ≈ 3）はCav1.2カルシウムチャネル（CACNA1C）で終結する。Sousouriら（2025、[[ref:sousouri2025_cacna1c|PMC12491688]]）は、5-HT2A → Gq → IP3 → Ca²⁺ ER放出がCav1.2を活性化し、大規模なCa²⁺サージを生成することを実証した — EMFがVGCCメカニズムを介して調節するのと同じチャネルである。ケタミン（NNT ≈ 3.5）はNMDA受容体遮断を通じて同じCa²⁺収束を達成する：NMDA遮断 → グルタミン酸サージ → AMPA → Ca²⁺流入。NMDA自体は神経伝達物質受容体ではなくイオンチャネルである。",
    ihP4: "R4d — 階層：5段階の階層（化学的 < 電磁的 < イオン性慢性 < イオン性リセット < 完全イオンリセット）は、より速いメカニズムがより高い有効性を予測する理由を説明する。SSRI（NNT 7）は数週間かけて間接的にイオンチャネルに影響する。TMS/tDCS（NNT 5–6）はイオン電流を直接誘導する。リチウムはNa⁺イオンを直接置換する。サイケデリクスは数時間以内に急性Ca²⁺リセットを生成する。ECT — 精神医学で最も効果的な治療法（治療抵抗性症例で70–80%の応答率）— は皮質拡延性脱分極（CSD）を誘発し、皮質全体のすべてのイオン勾配をリセットする（[[ref:rosenthal2025_ect_csd|Rosenthalら 2025]]、Nature Communications）。このパターンはイオンチャネル仮説とのみ整合的である。",
    ihFinding1: "抗うつ薬21種、116,477人：SSRIのNNT ≈ 7",
    ihFinding2: "シロシビン vs エスシタロプラム：NNT ≈ 3、数時間で効果",
    ihFinding3: "5-HT2A → Gq → IP3 → Cav1.2（CACNA1C）：サイケデリクスはEMFと同じチャネルを標的とする",
    ihFinding4: "Li⁺はVGSCを透過しNa⁺を置換：イオンメカニズムであり化学的ではない",
    ihFinding5: "ケタミン：初のRCT。NMDAはイオンチャネルであり、数時間で効果",
    ihFinding6: "ECTは皮質拡延性脱分極（CSD）を誘発：完全イオンリセット",
    ihEpistemic: "認識論的レベル：リチウムのイオンメカニズム[E]（[[ref:elmallakh2004_lithium_ion|El-Mallakh/Bhansali]]データ）。サイケデリクスのCa²⁺/CACNA1C収束[E]（[[ref:sousouri2025|Sousouri 2025]]）。ECTのCSDメカニズム[E]（[[ref:rosenthal2025_ect_csd|Rosenthal 2025]]）。階層予測[M|C]（BERM；L2演算子は未確定）。",
    // Section 2: Skin Battery
    sbHeading: "皮膚電池 — 真皮生体電気センサーシステム",
    sbP1: "皮膚は受動的なバリアではなく、能動的な生体電気センサーネットワークである。表皮はNa⁺/K⁺-ATPaseを介して連続的な経上皮電位（TEP、10–60 mV）を維持する — 皮膚を通じて電場を生成する文字通りのバッテリーである。皮膚が損傷すると、TEPが崩壊し、ケラチノサイトと線維芽細胞の電気走性を導く横方向電場（100–200 mV/mm）を生成する。この電気信号は最初の治癒信号であり — 生化学的信号の前に生じる。",
    sbP2: "皮膚の真皮は主にコラーゲンで構成され、それは圧電性（7–8 pC/N）を持つ：機械的力を直接電気信号に変換する。触覚は単に機械的受容体（PIEZO1/2）の機能だけではない — コラーゲンが電圧を生成し、BERMがEMFの標的として特定した同じ電位依存性カルシウムチャネル（VGCC）を開く圧電プロセスでもある。機械的接触とEMFは同じCa²⁺チャネルに収束する。",
    sbP3: "ケラチノサイトのTRPV4は、機械的圧力、熱（>27°C）、UVB放射、浸透圧に応答するマルチモーダルイオンチャネルであり — すべて同じCa²⁺応答を生成する。TRPV4はヒスタミン性かゆみも媒介する。EMFがTRPV4を活性化すると、アレルギー性かゆみと区別できないかゆみが生じる。これはEHSの最も一般的な皮膚症状（チクチク感、灼熱感、かゆみ）がノセボ現象ではなく、生物学的に予測可能な応答である理由を説明する。",
    sbP4: "[[ref:skedung2013_nanoscale_touch|Skedung]]ら（2013、Scientific Reports）は、ヒトの指が13nmの隆起を検出することを実証した — 指紋の隆線に対する尺度差は15,000:1である。機械的モデルではこの精度を説明できない。圧電+イオンチャネルの説明は可能：ナノメートルスケールの表面構造がVGCC/PIEZO1/TRPV4チャネルを活性化するのに十分な電気信号を生成する。これは、皮膚の感覚システムがEMFと自然な生体電気信号を区別することが不可能なレベルで機能していることを証明する。",
    sbFinding1: "TEP「皮膚電池」哺乳類皮膚で10–60 mV",
    sbFinding2: "内因性創傷電場100–200 mV/mm、最初の治癒信号",
    sbFinding3: "骨の圧電性（拡張：コラーゲン7–8 pC/N）",
    sbFinding4: "ケラチノサイトのPIEZO1：メカノトランスダクションとCa²⁺/Na⁺透過性",
    sbFinding5: "ヒトの指は13nmの隆起を検出 — 尺度差15,000:1",
    sbFinding6: "TRPV4はケラチノサイトにおけるCa²⁺流入とヒスタミン性かゆみを媒介",
    sbEpistemic: "認識論的レベル：TEPと創傷電場[E]（[[ref:lim2024_skin_battery|Lim]]/[[ref:zhao2006_wound_ef|Zhao]]）。圧電コラーゲン[E]（[[ref:fukada1957_piezo|Fukada/Yasuda]]）。VGCC収束[E]（[[ref:pall2013_v2|Pall/PMC5828134]]）。EHS説明[M|C]（モデル）。",
    // Section 3: ADHD
    adhdHeading: "ADHD：発達性イオンチャネルキャリブレーションエラー",
    adhdP1: "ADHDの従来の説明（前頭前皮質のドーパミン欠乏）は、なぜドーパミンシステムが障害されるのかという問いに答えない。BERMのイオンチャネルフレームワークは上流の回答を提供する：ADHDは、胎児期または幼児期の神経イオンチャネルがEMF汚染環境でキャリブレーションされる際に生じる発達性イオンチャネルキャリブレーションエラーである。これは3つの独立した証拠ラインに基づく：GWAS（ADHDにおけるCACNA1Cバリアント）、疫学（[[ref:li2020_jama_adhd|Li 2020]] JAMA、出生前EMF → ADHD）、薬理学（グアンファシンは神経伝達物質ではなくイオンチャネルに作用）。",
    adhdP2: "GWASの証拠：CACNA1C（Cav1.2）遺伝子バリアントはADHD、自閉症、双極性障害、うつ病と繰り返し関連する（[[ref:pmc6101623_cacna1c_gwas|PMC6101623]]、[[ref:pmc6679227_cacna1c_review|PMC6679227]]）。これはEMFの睡眠効果を調節し（[[ref:sousouri2025|Sousouri 2025]]）、サイケデリクスのシグナル鎖の標的であり、ADのCa²⁺カスケードに関与する同じ遺伝子/チャネルである。ティモシー症候群（de novo CACNA1C gain-of-function G406R）は高い浸透度で自閉症を引き起こす — VGCCの過活動 = 自閉症表現型。他のVGCC遺伝子（CACNA1A、CACNA1H、CACNA1I）も神経発達障害と関連する（[[ref:pmc4643966_cacna1a_asd|PMC4643966]]、[[ref:pmc8957782_cacna1h_asd|PMC8957782]]）。",
    adhdP3: "疫学的証拠：[[ref:li2020_jama_adhd|Liら]]（2020、JAMA Network Open）はKaiser Permanenteコホートの1482組の母子ペアを追跡した。出生前EMFは客観的に測定された（MFメーター、24時間）。高い出生前MF曝露はADHDリスクと関連し、特に持続性かつ重度のADHDおよび免疫介在性併存疾患を伴うADHDと関連した。同じ研究グループは、同じ曝露が流産（OR 2.72）、小児肥満、喘息とも関連することを示した — 1つの曝露、複数の結果、モジュロームが予測する通り。",
    adhdP4: "薬理学的証拠：グアンファシン（Intuniv、ADHD用FDA/EMA承認）はドーパミンに触れない。α2Aアドレナリン作動薬であり、cAMPを阻害 → HCNチャネルを閉じる → 膜電位を安定化 → 前頭前皮質の信号対雑音比が改善する（[[ref:wang2007_guanfacine_hcn|Wangら]] 2007、Cell）。これは直接的なイオンチャネル介入である。グアンファシンは、最も精密なイオン制御を必要とするADHD症状（衝動性、感情制御）に正確に作用する。刺激薬は信号を上げることでキャリブレーションエラーを補償する — グアンファシンは閾値を修正する。",
    adhdP5: "キャリブレーションウィンドウ：前頭前皮質は最後に成熟する脳領域である。胎児期および幼児期（0–10歳）のイオンチャネルチューニングがEMF汚染環境で行われると、HCNチャネルはより高いノイズフロアにチューニングされ、VGCCはより高い閾値で活性化するように設定される — 信号対雑音比は低いままとなる。[[ref:pmc7287020_hong_lifelong|Hongら]]（2020、[[ref:pmc7287020_hong_lifelong|PMC7287020]]）は、出生前の携帯電話曝露が老齢ラットの子孫の認知に影響することを示した — 効果は生涯にわたる。",
    adhdFinding1: "出生前MF → ADHDリスク↑（1482ペア、20年追跡、客観的測定）",
    adhdFinding2: "CACNA1CバリアントがADHD、ASD、双極性障害、MDDと関連（GWAS）",
    adhdFinding3: "ティモシー症候群CACNA1C gain-of-function → 軸索ターゲティングと行動が変化",
    adhdFinding4: "α2A → cAMP↓ → HCN閉鎖 → PFC作業記憶ネットワーク強化（グアンファシンメカニズム）",
    adhdFinding5: "800–1900 MHzマウス胎児曝露 → 神経発達および行動変化",
    adhdFinding6: "出生前携帯電話曝露 → 老齢子孫の認知低下（生涯）",
    adhdFinding7: "VGCCは脳の発達に不可欠 — チャネル発現が神経ネットワーク形成を制御",
    adhdEpistemic: "認識論的レベル：CACNA1C × 神経発達[E]（GWAS、再現済み）。出生前EMF → ADHD[E]（[[ref:li2020_jama_adhd|Li 2020]] JAMA、客観的測定）。グアンファシンHCNメカニズム[E]（[[ref:wang2007_guanfacine_hcn|Wang 2007]] Cell、FDA/EMA）。キャリブレーションウィンドウ理論[C]（理論的枠組み）。ADHDは多因子性 — EMFは一つの可能なリスク因子。[[ref:li2020_jama_adhd|Li 2020]]は単一コホート — 再現が重要。",
    // Section 4: Ion Convergence
    icHeading: "イオンチャネル収束：8つの疾患、1つのモデル",
    icP1: "BERMカスケードのすべての疾患は同じ構造に従う：(1) イオンチャネル遺伝子とのGWAS関連、(2) 最も効果的な治療がイオンチャネルを標的とする、(3) EMF曝露が疾患と関連する、(4) EMF → イオンチャネル → 病理のメカニスティックチェーン。これは偶然ではない — BERMの核心的主張である：環境EMFがイオンチャネルホメオスタシスを攪乱し、異なる疾患は異なる組織における異なる潜時での同じ攪乱の発現である。",
    icBipolarP: "双極性障害はモデルの最もエレガントな事例である。計算モデル（[[ref:pubmed32278494_bipolar_ionic|PubMed 32278494]]、Translational Psychiatry）は、双極性海馬ニューロンがイオンチャネルコンダクタンスの変化により過興奮性と低興奮性の間で振動することを直接示す。El-MallakhのNa,K-ATPase仮説は両極を説明する：軽度のポンプ機能障害 → 興奮性↑ → 躁状態；より重度の機能障害 → 神経伝達物質放出↓ → うつ状態。リチウム（Li⁺）はVGSCを通過し過活動ニューロンに優先的に蓄積 → 振動を減衰。抗てんかん薬（バルプロ酸、カルバマゼピン、ラモトリギン）はてんかんと双極性障害の両方に効く — 同じイオン性興奮性制御が両者で異なるタイムスケールで障害されているため。",
    icMetabolicP: "メタボリックシンドローム：膵β細胞のK-ATPチャネル（Kir6.2 + SUR1）はインスリン調節のマスタースイッチである。グルコース↑ → ATP↑ → K-ATP閉鎖 → 脱分極 → VGCC開口 → Ca²⁺ → インスリン放出。スルホニル尿素薬（FDA承認）はK-ATPチャネルを直接閉鎖する。US Patent [[ref:patent_4850959_insulin|4850959]]（1989）が証明：共鳴EMFがカルシウムチャネルを介してβ細胞インスリン分泌を制御。[[ref:klimentidis2010|Klimentidis 2011]]：実験室の対照動物も体重増加（p = 1.2 × 10⁻⁷、8種）— 食事だけでなく環境変化。",
    icAutoimmuneP: "自己免疫疾患：α7ニコチン性アセチルコリン受容体（α7nAChR）— イオンチャネル（リガンド依存性カチオンチャネル）— はコリン作動性抗炎症経路を制御する。VNS（FDA承認）はα7nAChRを活性化 → NF-κB↓ → 炎症減少。EMFはVGCC-Ca²⁺経路を介してNF-κBを活性化し（[[ref:pall2013_v2|Pall 2013]]）、迷走神経シグナリングが弱まる。EMFは機能的に「抗VNS」である。[[ref:koopman2016_vns_ra|Koopman 2016]]（PNAS）：VNSは関節リウマチに有意な応答を生じた。",
    icCancerP: "がんは累積的脱分極の結果である。正常細胞：Vm ≈ −60 mV（過分極）。がん細胞：Vm ≈ −15 mV（脱分極）。Levin（2012）は直接示した：がん遺伝子の過剰発現が細胞を脱分極 → 腫瘍。しかし、過分極イオンチャネルによって脱分極が防止されれば → がん遺伝子が活性でも腫瘍は形成されない。[[ref:pmc12533209_leukemia_bioelectric|PMC12533209]]（2025）：白血病細胞がCaV1.2脱分極を介して間質細胞の生体電気を「ハイジャック」。TTFields（FDA承認）とベラパミル（VGCC遮断薬、[[ref:pmc5034549_verapamil_cancer|PMC5034549]]）は直接的なイオン性がん治療である。",
    icDisSleep: "1. 睡眠",
    icDisDepBipolar: "2. うつ病/双極性障害",
    icDisT2D: "4. T2D/メタボリック",
    icDisAutoimmune: "5. 自己免疫",
    icDisInfertility: "6. 不妊",
    icDisCancer: "7. がん",
    icTreatMelatonin: "メラトニン",
    icTreatGuanfacine: "グアンファシン",
    icTreatGuanfacineFDA: "グアンファシン（FDA/EMA）",
    icTreatSulfonylureas: "スルホニル尿素薬",
    icTreatTTFieldsVerap: "TTFields、ベラパミル",
    icClinicalPilot: "臨床パイロット",
    icFinding1: "双極性ニューロン：イオンコンダクタンスの変化 → 過興奮/低興奮の振動",
    icFinding2: "Na,K-ATPase仮説：軽度の機能障害 → 躁、重度 → うつ",
    icFinding3: "双極性障害におけるK⁺チャネル — 包括的レビュー",
    icFinding4: "白血病細胞がCaV1.2脱分極を介して間質の生体電気をハイジャック",
    icFinding5: "VNS → α7nAChR → 関節リウマチに有意な応答",
    icFinding6: "8種24集団 — 対照動物も体重増加（p < 10⁻⁷）",
    icFinding7: "ベラパミル（VGCC遮断薬）が乳がん細胞の増殖をin vitroで阻害",
    icEpistemic: "認識論的レベル：各疾患におけるイオンチャネルの役割[E]（GWAS、薬理学、FDA）。EMF → イオンチャネルメカニズム[E]（[[ref:pall2013_v2|Pall 2013]]）。EMF → 疾患因果関係[C]（仮説）。収束モデルは理論的枠組みであり — 因果関係を証明するものではない。各疾患は多因子性。イオンチャネル薬が機能することはイオンチャネルの症状における役割を証明するが、必ずしも原因における役割ではない。",
    // Section 5: See Also
    seeAlso: "関連項目",
    evidenceRegister: "エビデンスレジスター",
    evidenceRegisterDesc: "BERM v17エビデンスレジスター完全版",
    eyeColorTitle: "目の色と磁気受容",
    eyeColorDesc: "CRY感受性と虹彩色素沈着",
    nutritionTitle: "栄養によるCRYモジュレーション",
    nutritionDesc: "B2、オメガ脂肪酸、断食",
    brainTitle: "脳 — モジュローム",
    brainDesc: "CACNA1C、7つの発達チャネル、神経発達",
  },
  fr: {
    title: "Cascade de maladies : convergence des canaux ioniques",
    subtitle: "La hiérarchie de traitement ionique, la batterie cutanée, le TDAH et la convergence de huit maladies",
    backLink: "← Retour aux preuves",
    // Shared table headers
    thCitation: "Référence",
    thYear: "Année",
    thFinding: "Découverte",
    thDisease: "Maladie",
    thIonChannel: "Canal ionique",
    thIonicTreatment: "Traitement ionique",
    thTdpEvidence: "Preuve TDP",
    // Section 1: Ionic Treatment Hierarchy
    ihHeading: "R4b-d : La hiérarchie de traitement ionique",
    ihP1: "La rétrodiction R4 stipule que la dépression répond mieux à l'électricité qu'à la chimie. La hiérarchie de traitement ionique explique pourquoi : tous les traitements des troubles de l'humeur — des ISRS aux psychédéliques — convergent finalement vers l'homéostasie calcique. Leur efficacité suit le degré de directitude ionique.",
    ihP2: "R4b — Lithium : Le lithium est le stabilisateur de l'humeur le plus ancien et le plus efficace au monde, et le seul dont il a été démontré qu'il réduit la mortalité par suicide (méta-analyse de >14 000 patients). Son mécanisme est ionique, non chimique : l'ion Li⁺ perméabilise le canal sodique voltage-dépendant (VGSC), remplace Na⁺ dans un rapport 1:1 et normalise l'équilibre cellulaire Na⁺/Ca²⁺. Les études GWAS lient la réponse au lithium aux gènes des canaux ioniques — pas aux voies sérotoninergiques. Aucun médicament basé sur la sérotonine n'a jamais démontré de réduction de la mortalité par suicide.",
    ihP3: "R4c — Psychédéliques et convergence Ca²⁺ : La chaîne de signalisation de la psilocybine ([[ref:goodwin2022_psilocybin|NEJM 2022]], NNT ≈ 3) se termine au canal calcique Cav1.2 (CACNA1C). Sousouri et al. (2025, [[ref:sousouri2025_cacna1c|PMC12491688]]) ont démontré que 5-HT2A → Gq → IP3 → libération Ca²⁺ du RE active Cav1.2, produisant une vague massive de Ca²⁺ — le même canal que l'EMF module via le mécanisme VGCC. La kétamine (NNT ≈ 3,5) atteint la même convergence Ca²⁺ par blocage du récepteur NMDA : blocage NMDA → libération de glutamate → AMPA → afflux Ca²⁺. Le NMDA est lui-même un canal ionique, pas un récepteur de neurotransmetteurs.",
    ihP4: "R4d — La hiérarchie : La hiérarchie à cinq niveaux (chimique < électromagnétique < ionique chronique < réinitialisation ionique < réinitialisation ionique totale) explique pourquoi les mécanismes plus rapides prédisent une plus grande efficacité. Les ISRS (NNT 7) affectent les canaux ioniques indirectement sur des semaines. La TMS/tDCS (NNT 5–6) induit des courants ioniques directement. Le lithium remplace l'ion Na⁺ directement. Les psychédéliques produisent une réinitialisation aiguë du Ca²⁺ en quelques heures. L'ECT — le traitement le plus efficace en psychiatrie (70–80 % de réponse dans les cas résistants) — déclenche une dépolarisation corticale envahissante (CSD) qui réinitialise tous les gradients ioniques à travers le cortex ([[ref:rosenthal2025_ect_csd|Rosenthal et al. 2025]], Nature Communications). Ce schéma n'est compatible qu'avec l'hypothèse des canaux ioniques.",
    ihFinding1: "21 antidépresseurs, 116 477 patients : NNT ≈ 7 pour les ISRS",
    ihFinding2: "Psilocybine vs escitalopram : NNT ≈ 3, effet en quelques heures",
    ihFinding3: "5-HT2A → Gq → IP3 → Cav1.2 (CACNA1C) : les psychédéliques ciblent le même canal que l'EMF",
    ihFinding4: "Li⁺ perméabilise le VGSC, remplace Na⁺ : mécanisme ionique, non chimique",
    ihFinding5: "Kétamine : premier ECR. Le NMDA est un canal ionique, effet en quelques heures",
    ihFinding6: "L'ECT déclenche une dépolarisation corticale envahissante (CSD) : réinitialisation ionique totale",
    ihEpistemic: "Niveau épistémique : mécanisme ionique du lithium [E] (données [[ref:elmallakh2004_lithium_ion|El-Mallakh/Bhansali]]). Convergence Ca²⁺/CACNA1C des psychédéliques [E] ([[ref:sousouri2025|Sousouri 2025]]). Mécanisme CSD de l'ECT [E] ([[ref:rosenthal2025_ect_csd|Rosenthal 2025]]). Prédiction hiérarchique [M|C] (BERM ; opérateur L2 ouvert).",
    // Section 2: Skin Battery
    sbHeading: "La batterie cutanée — système sensoriel bioélectrique dermique",
    sbP1: "La peau n'est pas une barrière passive mais un réseau sensoriel bioélectrique actif. L'épiderme maintient un potentiel transépithélial continu (TEP, 10–60 mV) via Na⁺/K⁺-ATPase — littéralement une batterie qui génère un champ électrique à travers la peau. Lorsque la peau est blessée, le TEP s'effondre et génère un champ électrique latéral (100–200 mV/mm) qui guide l'électrotaxie des kératinocytes et des fibroblastes. Ce signal électrique est le premier signal de guérison — AVANT les signaux biochimiques.",
    sbP2: "Le derme cutané est principalement constitué de collagène, qui est piézoélectrique (7–8 pC/N) : il convertit la force mécanique directement en signal électrique. La perception du toucher n'est pas uniquement le fait des récepteurs mécaniques (PIEZO1/2) — c'est aussi un processus piézoélectrique où le collagène génère une tension qui ouvre les MÊMES canaux calciques voltage-dépendants (VGCC) que BERM identifie comme cibles de l'EMF. Le toucher mécanique et l'EMF convergent sur le même canal Ca²⁺.",
    sbP3: "Le TRPV4 des kératinocytes est un canal ionique multimodal qui répond à la pression mécanique, à la chaleur (>27°C), au rayonnement UVB et à la pression osmotique — tous produisant la même réponse Ca²⁺. Le TRPV4 médie également le prurit histaminergique. Si l'EMF active le TRPV4, le résultat est un prurit indiscernable du prurit allergique. Cela explique pourquoi les symptômes cutanés les plus courants de l'EHS (picotements, brûlures, démangeaisons) sont des réponses biologiquement prévisibles, non des phénomènes nocebo.",
    sbP4: "[[ref:skedung2013_nanoscale_touch|Skedung]] et al. (2013, Scientific Reports) ont démontré que le doigt humain détecte des reliefs de 13 nm — une différence d'échelle de 15 000:1 par rapport aux crêtes d'empreintes digitales. Les modèles mécaniques ne peuvent expliquer cette précision. L'explication piézoélectrique + canal ionique le peut : la structure de surface à l'échelle nanométrique génère un signal électrique suffisant pour activer les canaux VGCC/PIEZO1/TRPV4. Cela prouve que le système sensoriel cutané opère à un niveau où distinguer l'EMF des signaux bioélectriques naturels est impossible.",
    sbFinding1: "TEP « batterie cutanée » 10–60 mV dans la peau des mammifères",
    sbFinding2: "Champ électrique endogène de plaie 100–200 mV/mm, premier signal de guérison",
    sbFinding3: "Piézoélectricité osseuse (étendu : collagène 7–8 pC/N)",
    sbFinding4: "PIEZO1 dans les kératinocytes : mécanotransduction et perméabilité Ca²⁺/Na⁺",
    sbFinding5: "Le doigt humain détecte des reliefs de 13 nm — différence d'échelle 15 000:1",
    sbFinding6: "TRPV4 médie l'afflux Ca²⁺ et le prurit histaminergique dans les kératinocytes",
    sbEpistemic: "Niveau épistémique : TEP et champ de plaie [E] ([[ref:lim2024_skin_battery|Lim]]/[[ref:zhao2006_wound_ef|Zhao]]). Collagène piézoélectrique [E] ([[ref:fukada1957_piezo|Fukada/Yasuda]]). Convergence VGCC [E] ([[ref:pall2013_v2|Pall/PMC5828134]]). Explication EHS [M|C] (modèle).",
    // Section 3: ADHD
    adhdHeading: "TDAH : une erreur de calibration développementale des canaux ioniques",
    adhdP1: "L'explication conventionnelle du TDAH (déficit dopaminergique dans le cortex préfrontal) ne répond pas à la question POURQUOI le système dopaminergique est perturbé. Le cadre des canaux ioniques de BERM offre une réponse en amont : le TDAH est une erreur de calibration développementale des canaux ioniques qui survient lorsque les canaux ioniques neuronaux fœtaux ou de la petite enfance se calibrent dans un environnement contaminé par les EMF. Ceci repose sur trois lignes de preuves indépendantes : GWAS (variants CACNA1C dans le TDAH), épidémiologie ([[ref:li2020_jama_adhd|Li 2020]] JAMA, EMF prénatal → TDAH) et pharmacologie (la guanfacine agit sur les canaux ioniques, pas les neurotransmetteurs).",
    adhdP2: "Preuve GWAS : les variants du gène CACNA1C (Cav1.2) s'associent de manière répétée au TDAH, à l'autisme, au trouble bipolaire et à la dépression ([[ref:pmc6101623_cacna1c_gwas|PMC6101623]], [[ref:pmc6679227_cacna1c_review|PMC6679227]]). C'est le MÊME gène/canal qui module les effets de l'EMF sur le sommeil ([[ref:sousouri2025|Sousouri 2025]]), est la cible de la chaîne de signalisation des psychédéliques et participe à la cascade Ca²⁺ de la MA. Le syndrome de Timothy (CACNA1C gain-de-fonction de novo G406R) cause l'autisme avec haute pénétrance — SURACTIVITÉ des VGCC = phénotype autistique. D'autres gènes VGCC (CACNA1A, CACNA1H, CACNA1I) s'associent également aux troubles neurodéveloppementaux ([[ref:pmc4643966_cacna1a_asd|PMC4643966]], [[ref:pmc8957782_cacna1h_asd|PMC8957782]]).",
    adhdP3: "Preuve épidémiologique : [[ref:li2020_jama_adhd|Li et al.]] (2020, JAMA Network Open) ont suivi 1482 paires mère-enfant dans la cohorte Kaiser Permanente. L'EMF prénatal a été mesuré OBJECTIVEMENT (compteur MF, 24h). Une exposition MF prénatale élevée s'est associée au risque de TDAH, spécifiquement au TDAH PERSISTANT et SÉVÈRE et au TDAH avec comorbidités à médiation immunitaire. Le même groupe de recherche a montré que la même exposition s'associe aux fausses couches (OR 2,72), à l'obésité infantile et à l'asthme — UNE exposition, MULTIPLES résultats, comme le modulome le prédit.",
    adhdP4: "Preuve pharmacologique : La guanfacine (Intuniv, approuvée FDA/EMA pour le TDAH) ne touche PAS la dopamine. C'est un agoniste α2A-adrénergique qui inhibe l'AMPc → FERME les canaux HCN → stabilise le potentiel membranaire → le rapport signal/bruit du cortex préfrontal s'améliore ([[ref:wang2007_guanfacine_hcn|Wang et al.]] 2007, Cell). C'est une intervention DIRECTE sur les canaux ioniques. La guanfacine agit précisément sur les symptômes du TDAH (impulsivité, régulation émotionnelle) nécessitant le contrôle ionique le plus fin. Les stimulants COMPENSENT l'erreur de calibration en augmentant le signal — la guanfacine CORRIGE le seuil.",
    adhdP5: "Fenêtre de calibration : le cortex préfrontal est la dernière région cérébrale à maturer. Si le réglage des canaux ioniques fœtaux et de la petite enfance (0–10 ans) se produit dans un environnement contaminé par les EMF, les canaux HCN se règlent sur un plancher de bruit plus élevé et les VGCC se configurent pour s'activer à un seuil plus élevé — le rapport signal/bruit reste bas. [[ref:pmc7287020_hong_lifelong|Hong et al.]] (2020, [[ref:pmc7287020_hong_lifelong|PMC7287020]]) ont montré que l'exposition prénatale au téléphone portable affecte la cognition chez les descendants ÂGÉS — l'effet est À VIE.",
    adhdFinding1: "MF prénatal → risque de TDAH ↑ (1482 paires, suivi 20 ans, mesure objective)",
    adhdFinding2: "Les variants CACNA1C s'associent au TDAH, TSA, bipolaire, TDM (GWAS)",
    adhdFinding3: "Syndrome de Timothy CACNA1C gain-de-fonction → ciblage axonal et comportement altérés",
    adhdFinding4: "α2A → AMPc↓ → fermeture HCN → réseaux de mémoire de travail du CPF renforcés (mécanisme guanfacine)",
    adhdFinding5: "Exposition fœtale 800–1900 MHz chez la souris → changements neurodéveloppementaux et comportementaux",
    adhdFinding6: "Exposition prénatale au téléphone portable → déclin cognitif chez les descendants ÂGÉS (à vie)",
    adhdFinding7: "Les VGCC sont essentiels au DÉVELOPPEMENT cérébral — l'expression des canaux régule la formation des réseaux neuronaux",
    adhdEpistemic: "Niveau épistémique : CACNA1C × neurodéveloppement [E] (GWAS, répliqué). EMF prénatal → TDAH [E] ([[ref:li2020_jama_adhd|Li 2020]] JAMA, mesure objective). Mécanisme HCN de la guanfacine [E] ([[ref:wang2007_guanfacine_hcn|Wang 2007]] Cell, FDA/EMA). Théorie de la fenêtre de calibration [C] (cadre théorique). Le TDAH est multifactoriel — l'EMF est un facteur de risque possible. [[ref:li2020_jama_adhd|Li 2020]] est une cohorte unique — la réplication est essentielle.",
    // Section 4: Ion Convergence
    icHeading: "La convergence des canaux ioniques : huit maladies, un modèle",
    icP1: "Chaque maladie de la cascade BERM suit la même structure : (1) association GWAS avec des gènes de canaux ioniques, (2) le traitement le plus efficace cible les canaux ioniques, (3) l'exposition EMF s'associe à la maladie, (4) chaîne mécanistique EMF → canal ionique → pathologie. Ce n'est pas une coïncidence — c'est l'affirmation centrale de BERM : l'EMF environnemental perturbe l'homéostasie des canaux ioniques, et différentes maladies sont des manifestations de la même perturbation dans différents tissus à différentes latences.",
    icBipolarP: "Le trouble bipolaire est le cas le plus élégant du modèle. Les modèles computationnels ([[ref:pubmed32278494_bipolar_ionic|PubMed 32278494]], Translational Psychiatry) montrent directement que les neurones hippocampiques bipolaires oscillent entre hyperexcitabilité et hypoexcitabilité en raison de changements de conductance des canaux ioniques. L'hypothèse Na,K-ATPase d'El-Mallakh explique les deux pôles : dysfonction LÉGÈRE de la pompe → excitabilité ↑ → manie ; dysfonction PLUS SÉVÈRE → libération de neurotransmetteurs ↓ → dépression. Le lithium (Li⁺) traverse le VGSC et s'accumule préférentiellement dans les neurones hyperactifs → amortit l'oscillation. Les antiépileptiques (valproate, carbamazépine, lamotrigine) fonctionnent pour l'épilepsie ET le bipolaire car la MÊME régulation de l'excitabilité ionique est perturbée dans les deux — à des échelles temporelles différentes.",
    icMetabolicP: "Syndrome métabolique : le canal K-ATP des cellules β pancréatiques (Kir6.2 + SUR1) est l'INTERRUPTEUR PRINCIPAL de la régulation de l'insuline. Glucose ↑ → ATP ↑ → K-ATP se ferme → dépolarisation → VGCC s'ouvre → Ca²⁺ → libération d'insuline. Les sulfonylurées (approuvées FDA) ferment le canal K-ATP DIRECTEMENT. Le brevet US [[ref:patent_4850959_insulin|4850959]] (1989) prouve : l'EMF de résonance contrôle la sécrétion d'insuline des cellules β via les canaux calciques. [[ref:klimentidis2010|Klimentidis 2011]] : même les animaux de contrôle de laboratoire prennent du poids (p = 1,2 × 10⁻⁷, 8 espèces) — changement environnemental, pas seulement le régime alimentaire.",
    icAutoimmuneP: "Maladies auto-immunes : le récepteur nicotinique α7 de l'acétylcholine (α7nAChR) — un canal ionique (canal cationique ligand-dépendant) — régule la voie anti-inflammatoire cholinergique. La VNS (approuvée FDA) active α7nAChR → NF-κB ↓ → l'inflammation diminue. L'EMF active NF-κB via la voie VGCC-Ca²⁺ ([[ref:pall2013_v2|Pall 2013]]), tandis que la signalisation vagale s'affaiblit. L'EMF est fonctionnellement « anti-VNS ». [[ref:koopman2016_vns_ra|Koopman 2016]] (PNAS) : la VNS a produit une réponse significative dans la polyarthrite rhumatoïde.",
    icCancerP: "Le cancer est la conséquence d'une dépolarisation cumulative. Cellules normales : Vm ≈ −60 mV (hyperpolarisé). Cellules cancéreuses : Vm ≈ −15 mV (dépolarisé). Levin (2012) a montré directement : la surexpression d'oncogènes dépolarise les cellules → tumeur. Mais si la dépolarisation est empêchée par des canaux ioniques hyperpolarisants → la tumeur NE se forme PAS même avec un oncogène actif. [[ref:pmc12533209_leukemia_bioelectric|PMC12533209]] (2025) : les cellules leucémiques « détournent » la bioélectricité des cellules stromales via la dépolarisation CaV1.2. Les TTFields (approuvés FDA) et le vérapamil (bloqueur VGCC, [[ref:pmc5034549_verapamil_cancer|PMC5034549]]) sont des traitements anticancéreux ioniques directs.",
    icDisSleep: "1. Sommeil",
    icDisDepBipolar: "2. Dépression/bipolaire",
    icDisT2D: "4. DT2/métabolique",
    icDisAutoimmune: "5. Auto-immune",
    icDisInfertility: "6. Infertilité",
    icDisCancer: "7. Cancer",
    icTreatMelatonin: "Mélatonine",
    icTreatGuanfacine: "Guanfacine",
    icTreatGuanfacineFDA: "Guanfacine (FDA/EMA)",
    icTreatSulfonylureas: "Sulfonylurées",
    icTreatTTFieldsVerap: "TTFields, vérapamil",
    icClinicalPilot: "pilote clinique",
    icFinding1: "Neurones bipolaires : changements de conductance ionique → oscillation hyper/hypoexcitabilité",
    icFinding2: "Hypothèse Na,K-ATPase : dysfonction légère → manie, sévère → dépression",
    icFinding3: "Canaux K⁺ dans le trouble bipolaire — revue complète",
    icFinding4: "Les cellules leucémiques détournent la bioélectricité stromale via la dépolarisation CaV1.2",
    icFinding5: "VNS → α7nAChR → réponse significative dans la polyarthrite rhumatoïde",
    icFinding6: "24 populations de 8 espèces — même les animaux de contrôle prennent du poids (p < 10⁻⁷)",
    icFinding7: "Le vérapamil (bloqueur VGCC) inhibe la croissance des cellules du cancer du sein in vitro",
    icEpistemic: "Niveau épistémique : rôle des canaux ioniques dans chaque maladie [E] (GWAS, pharmacologie, FDA). Mécanisme EMF → canal ionique [E] ([[ref:pall2013_v2|Pall 2013]]). EMF → causalité de la maladie [C] (hypothèse). Le modèle de convergence est un CADRE THÉORIQUE — il ne prouve pas la causalité. Chaque maladie est multifactorielle. Qu'un médicament agissant sur les canaux ioniques fonctionne prouve le rôle des canaux ioniques dans les SYMPTÔMES mais pas nécessairement dans la CAUSE.",
    // Section 5: See Also
    seeAlso: "Voir aussi",
    evidenceRegister: "Registre des preuves",
    evidenceRegisterDesc: "Registre complet des preuves BERM v17",
    eyeColorTitle: "Couleur des yeux et magnétoréception",
    eyeColorDesc: "Sensibilité CRY et pigmentation de l'iris",
    nutritionTitle: "Modulation nutritionnelle de CRY",
    nutritionDesc: "B2, acides gras oméga et jeûne",
    brainTitle: "Cerveau — Modulome",
    brainDesc: "CACNA1C, 7 canaux développementaux et neurodéveloppement",
  },
  ko: {
    title: "질병 캐스케이드: 이온 채널 수렴",
    subtitle: "이온 치료 계층, 피부 전지, ADHD, 그리고 8가지 질병의 수렴",
    backLink: "← 근거로 돌아가기",
    // Shared table headers
    thCitation: "인용",
    thYear: "연도",
    thFinding: "발견",
    thDisease: "질환",
    thIonChannel: "이온 채널",
    thIonicTreatment: "이온 치료",
    thTdpEvidence: "TDP 근거",
    // Section 1: Ionic Treatment Hierarchy
    ihHeading: "R4b-d: 이온 치료 계층",
    ihP1: "역추론 R4는 우울증이 화학보다 전기에 더 잘 반응한다고 명시한다. 이온 치료 계층은 그 이유를 설명한다: SSRI에서 환각제까지 모든 기분 장애 치료는 궁극적으로 칼슘 항상성에 수렴한다. 그 효능은 이온 직접성의 정도를 따른다.",
    ihP2: "R4b — 리튬: 리튬은 세계에서 가장 오래되고 가장 효과적인 기분 안정제이며, 자살 사망률을 줄이는 것으로 입증된 유일한 약물이다(>14,000명 메타분석). 그 메커니즘은 이온성이지 화학적이지 않다: Li⁺ 이온은 전위 의존성 나트륨 채널(VGSC)을 투과하고, 1:1 비율로 Na⁺를 대체하며, 세포의 Na⁺/Ca²⁺ 균형을 정상화한다. GWAS 연구는 리튬 반응을 이온 채널 유전자와 연결한다 — 세로토닌 경로가 아니다. 어떤 세로토닌 기반 약물도 자살 사망률을 줄이는 것으로 입증된 적이 없다.",
    ihP3: "R4c — 환각제와 Ca²⁺ 수렴: 실로시빈의 신호 사슬([[ref:goodwin2022_psilocybin|NEJM 2022]], NNT ≈ 3)은 Cav1.2 칼슘 채널(CACNA1C)에서 종결된다. Sousouri 등(2025, [[ref:sousouri2025_cacna1c|PMC12491688]])은 5-HT2A → Gq → IP3 → Ca²⁺ ER 방출이 Cav1.2를 활성화하여 대규모 Ca²⁺ 서지를 생성함을 입증했다 — EMF가 VGCC 메커니즘을 통해 조절하는 것과 동일한 채널이다. 케타민(NNT ≈ 3.5)은 NMDA 수용체 차단을 통해 동일한 Ca²⁺ 수렴을 달성한다: NMDA 차단 → 글루타메이트 서지 → AMPA → Ca²⁺ 유입. NMDA 자체는 신경전달물질 수용체가 아니라 이온 채널이다.",
    ihP4: "R4d — 계층: 5단계 계층(화학적 < 전자기적 < 이온성 만성 < 이온성 리셋 < 완전 이온 리셋)은 왜 더 빠른 메커니즘이 더 큰 효능을 예측하는지 설명한다. SSRI(NNT 7)는 수주에 걸쳐 간접적으로 이온 채널에 영향을 미친다. TMS/tDCS(NNT 5–6)는 이온 전류를 직접 유도한다. 리튬은 Na⁺ 이온을 직접 대체한다. 환각제는 수시간 내에 급성 Ca²⁺ 리셋을 생성한다. ECT — 정신의학에서 가장 효과적인 치료(치료 저항성 사례에서 70–80% 반응) — 는 피질 확산성 탈분극(CSD)을 유발하여 전체 피질의 모든 이온 기울기를 리셋한다([[ref:rosenthal2025_ect_csd|Rosenthal 등 2025]], Nature Communications). 이 패턴은 이온 채널 가설과만 일치한다.",
    ihFinding1: "항우울제 21종, 116,477명: SSRI의 NNT ≈ 7",
    ihFinding2: "실로시빈 vs 에스시탈로프람: NNT ≈ 3, 수시간 내 효과",
    ihFinding3: "5-HT2A → Gq → IP3 → Cav1.2(CACNA1C): 환각제는 EMF와 동일한 채널을 표적으로 한다",
    ihFinding4: "Li⁺는 VGSC를 투과하고 Na⁺를 대체: 이온 메커니즘, 화학적이지 않음",
    ihFinding5: "케타민: 최초의 RCT. NMDA는 이온 채널, 수시간 내 효과",
    ihFinding6: "ECT는 피질 확산성 탈분극(CSD)을 유발: 완전 이온 리셋",
    ihEpistemic: "인식론적 수준: 리튬 이온 메커니즘 [E] ([[ref:elmallakh2004_lithium_ion|El-Mallakh/Bhansali]] 데이터). 환각제 Ca²⁺/CACNA1C 수렴 [E] ([[ref:sousouri2025|Sousouri 2025]]). ECT CSD 메커니즘 [E] ([[ref:rosenthal2025_ect_csd|Rosenthal 2025]]). 계층 예측 [M|C] (BERM; L2 연산자 미확정).",
    // Section 2: Skin Battery
    sbHeading: "피부 전지 — 진피 생체전기 센서 시스템",
    sbP1: "피부는 수동적 장벽이 아니라 능동적 생체전기 센서 네트워크이다. 표피는 Na⁺/K⁺-ATPase를 통해 지속적인 경상피 전위(TEP, 10–60 mV)를 유지한다 — 피부를 통해 전기장을 생성하는 문자 그대로의 배터리이다. 피부가 상처를 입으면 TEP가 붕괴되고 각질세포와 섬유아세포의 전기주성을 안내하는 횡방향 전기장(100–200 mV/mm)을 생성한다. 이 전기 신호는 첫 번째 치유 신호이다 — 생화학적 신호보다 앞선다.",
    sbP2: "피부 진피는 주로 콜라겐으로 구성되며, 이는 압전성(7–8 pC/N)을 가진다: 기계적 힘을 직접 전기 신호로 변환한다. 촉각은 기계적 수용체(PIEZO1/2)의 작용만이 아니다 — 콜라겐이 전압을 생성하여 BERM이 EMF 표적으로 식별한 동일한 전위 의존성 칼슘 채널(VGCC)을 여는 압전 과정이기도 하다. 기계적 접촉과 EMF는 동일한 Ca²⁺ 채널에 수렴한다.",
    sbP3: "각질세포의 TRPV4는 기계적 압력, 열(>27°C), UVB 방사선, 삼투압에 반응하는 다중 모드 이온 채널이며 — 모두 동일한 Ca²⁺ 반응을 생성한다. TRPV4는 또한 히스타민성 가려움을 매개한다. EMF가 TRPV4를 활성화하면, 결과는 알레르기성 가려움과 구별할 수 없는 가려움이다. 이것은 EHS의 가장 흔한 피부 증상(따끔거림, 화끈거림, 가려움)이 노세보 현상이 아닌 생물학적으로 예측 가능한 반응인 이유를 설명한다.",
    sbP4: "[[ref:skedung2013_nanoscale_touch|Skedung]] 등(2013, Scientific Reports)은 인간의 손가락이 13nm 융기를 감지함을 입증했다 — 지문 융선에 대한 척도 차이는 15,000:1이다. 기계적 모델은 이 정밀도를 설명할 수 없다. 압전 + 이온 채널 설명은 가능하다: 나노미터 규모의 표면 구조가 VGCC/PIEZO1/TRPV4 채널을 활성화하기에 충분한 전기 신호를 생성한다. 이는 피부 감각 시스템이 EMF와 자연적 생체전기 신호를 구별하는 것이 불가능한 수준에서 작동함을 증명한다.",
    sbFinding1: "TEP '피부 전지' 포유류 피부에서 10–60 mV",
    sbFinding2: "내인성 상처 전기장 100–200 mV/mm, 첫 번째 치유 신호",
    sbFinding3: "뼈의 압전성 (확장: 콜라겐 7–8 pC/N)",
    sbFinding4: "각질세포의 PIEZO1: 기계전달과 Ca²⁺/Na⁺ 투과성",
    sbFinding5: "인간의 손가락은 13nm 융기를 감지 — 척도 차이 15,000:1",
    sbFinding6: "TRPV4는 각질세포에서 Ca²⁺ 유입과 히스타민성 가려움을 매개",
    sbEpistemic: "인식론적 수준: TEP와 상처 전기장 [E] ([[ref:lim2024_skin_battery|Lim]]/[[ref:zhao2006_wound_ef|Zhao]]). 압전 콜라겐 [E] ([[ref:fukada1957_piezo|Fukada/Yasuda]]). VGCC 수렴 [E] ([[ref:pall2013_v2|Pall/PMC5828134]]). EHS 설명 [M|C] (모델).",
    // Section 3: ADHD
    adhdHeading: "ADHD: 발달성 이온 채널 보정 오류",
    adhdP1: "ADHD의 기존 설명(전두엽 피질의 도파민 결핍)은 왜 도파민 시스템이 교란되는지에 대한 질문에 답하지 못한다. BERM의 이온 채널 프레임워크는 상류 답변을 제공한다: ADHD는 태아 또는 초기 아동기의 신경 이온 채널이 EMF 오염 환경에서 보정될 때 발생하는 발달성 이온 채널 보정 오류이다. 이는 세 가지 독립적 증거 라인에 기반한다: GWAS(ADHD에서 CACNA1C 변이), 역학([[ref:li2020_jama_adhd|Li 2020]] JAMA, 산전 EMF → ADHD), 약리학(구안파신은 신경전달물질이 아닌 이온 채널에 작용).",
    adhdP2: "GWAS 증거: CACNA1C(Cav1.2) 유전자 변이는 ADHD, 자폐증, 양극성 장애, 우울증과 반복적으로 연관된다([[ref:pmc6101623_cacna1c_gwas|PMC6101623]], [[ref:pmc6679227_cacna1c_review|PMC6679227]]). 이는 EMF 수면 효과를 조절하고([[ref:sousouri2025|Sousouri 2025]]), 환각제 신호 사슬의 표적이며, AD의 Ca²⁺ 캐스케이드에 참여하는 동일한 유전자/채널이다. 티모시 증후군(de novo CACNA1C gain-of-function G406R)은 높은 침투도로 자폐증을 유발한다 — VGCC 과활성 = 자폐 표현형. 다른 VGCC 유전자(CACNA1A, CACNA1H, CACNA1I)도 신경발달 장애와 연관된다([[ref:pmc4643966_cacna1a_asd|PMC4643966]], [[ref:pmc8957782_cacna1h_asd|PMC8957782]]).",
    adhdP3: "역학적 증거: [[ref:li2020_jama_adhd|Li 등]](2020, JAMA Network Open)은 Kaiser Permanente 코호트에서 1482쌍의 모자 쌍을 추적했다. 산전 EMF는 객관적으로 측정되었다(MF 측정기, 24시간). 높은 산전 MF 노출은 ADHD 위험과 연관되었으며, 특히 지속적이고 심각한 ADHD 및 면역 매개 동반 질환을 가진 ADHD와 연관되었다. 동일한 연구 그룹은 같은 노출이 유산(OR 2.72), 아동 비만, 천식과도 연관됨을 보여주었다 — 하나의 노출, 다수의 결과, 모듈롬이 예측하는 대로.",
    adhdP4: "약리학적 증거: 구안파신(Intuniv, ADHD용 FDA/EMA 승인)은 도파민에 관여하지 않는다. α2A 아드레날린 작용제로서 cAMP를 억제 → HCN 채널을 닫음 → 막전위를 안정화 → 전두엽 피질의 신호 대 잡음비가 개선된다([[ref:wang2007_guanfacine_hcn|Wang 등]] 2007, Cell). 이것은 직접적인 이온 채널 개입이다. 구안파신은 가장 정밀한 이온 제어가 필요한 ADHD 증상(충동성, 감정 조절)에 정확히 작용한다. 자극제는 신호를 높여 보정 오류를 보상한다 — 구안파신은 역치를 수정한다.",
    adhdP5: "보정 윈도우: 전두엽 피질은 마지막으로 성숙하는 뇌 영역이다. 태아 및 초기 아동기(0–10세)의 이온 채널 튜닝이 EMF 오염 환경에서 이루어지면, HCN 채널은 더 높은 노이즈 플로어에 튜닝되고 VGCC는 더 높은 역치에서 활성화되도록 설정된다 — 신호 대 잡음비는 낮게 유지된다. [[ref:pmc7287020_hong_lifelong|Hong 등]](2020, [[ref:pmc7287020_hong_lifelong|PMC7287020]])은 산전 휴대전화 노출이 노령 쥐 자손의 인지에 영향을 미침을 보여주었다 — 효과는 평생 지속된다.",
    adhdFinding1: "산전 MF → ADHD 위험 ↑ (1482쌍, 20년 추적, 객관적 측정)",
    adhdFinding2: "CACNA1C 변이가 ADHD, ASD, 양극성 장애, MDD와 연관 (GWAS)",
    adhdFinding3: "티모시 증후군 CACNA1C gain-of-function → 축삭 표적화 및 행동 변화",
    adhdFinding4: "α2A → cAMP↓ → HCN 폐쇄 → PFC 작업 기억 네트워크 강화 (구안파신 메커니즘)",
    adhdFinding5: "마우스 800–1900 MHz 태아 노출 → 신경발달 및 행동 변화",
    adhdFinding6: "산전 휴대전화 노출 → 노령 자손의 인지 저하 (평생)",
    adhdFinding7: "VGCC는 뇌 발달에 필수적 — 채널 발현이 신경 네트워크 형성을 조절",
    adhdEpistemic: "인식론적 수준: CACNA1C × 신경발달 [E] (GWAS, 재현됨). 산전 EMF → ADHD [E] ([[ref:li2020_jama_adhd|Li 2020]] JAMA, 객관적 측정). 구안파신 HCN 메커니즘 [E] ([[ref:wang2007_guanfacine_hcn|Wang 2007]] Cell, FDA/EMA). 보정 윈도우 이론 [C] (이론적 틀). ADHD는 다인자성 — EMF는 하나의 가능한 위험 인자. [[ref:li2020_jama_adhd|Li 2020]]은 단일 코호트 — 재현이 중요.",
    // Section 4: Ion Convergence
    icHeading: "이온 채널 수렴: 8가지 질환, 하나의 모델",
    icP1: "BERM 캐스케이드의 모든 질환은 동일한 구조를 따른다: (1) 이온 채널 유전자와의 GWAS 연관, (2) 가장 효과적인 치료가 이온 채널을 표적으로 함, (3) EMF 노출이 질환과 연관, (4) EMF → 이온 채널 → 병리의 메커니즘 체인. 이것은 우연이 아니다 — BERM의 핵심 주장이다: 환경 EMF가 이온 채널 항상성을 교란하며, 서로 다른 질환은 서로 다른 조직에서 서로 다른 잠복기를 가진 동일한 교란의 발현이다.",
    icBipolarP: "양극성 장애는 모델의 가장 우아한 사례이다. 계산 모델([[ref:pubmed32278494_bipolar_ionic|PubMed 32278494]], Translational Psychiatry)은 양극성 해마 뉴런이 이온 채널 컨덕턴스 변화로 인해 과흥분성과 저흥분성 사이를 진동함을 직접 보여준다. El-Mallakh의 Na,K-ATPase 가설은 양 극을 설명한다: 경미한 펌프 기능 장애 → 흥분성 ↑ → 조증; 더 심한 기능 장애 → 신경전달물질 방출 ↓ → 우울증. 리튬(Li⁺)은 VGSC를 통과하여 과활성 뉴런에 우선적으로 축적 → 진동을 감쇠시킨다. 항경련제(발프로산, 카르바마제핀, 라모트리진)는 간질과 양극성 장애 모두에 효과가 있다 — 동일한 이온 흥분성 조절이 다른 시간 척도에서 양쪽 모두에서 교란되기 때문이다.",
    icMetabolicP: "대사 증후군: 췌장 β세포의 K-ATP 채널(Kir6.2 + SUR1)은 인슐린 조절의 마스터 스위치이다. 포도당 ↑ → ATP ↑ → K-ATP 폐쇄 → 탈분극 → VGCC 개방 → Ca²⁺ → 인슐린 방출. 설폰요소제(FDA 승인)는 K-ATP 채널을 직접 폐쇄한다. US Patent [[ref:patent_4850959_insulin|4850959]](1989)가 증명: 공명 EMF가 칼슘 채널을 통해 β세포 인슐린 분비를 제어. [[ref:klimentidis2010|Klimentidis 2011]]: 실험실 대조 동물도 체중 증가(p = 1.2 × 10⁻⁷, 8종) — 식단만이 아닌 환경 변화.",
    icAutoimmuneP: "자가면역 질환: α7 니코틴성 아세틸콜린 수용체(α7nAChR) — 이온 채널(리간드 의존성 양이온 채널) — 은 콜린성 항염증 경로를 조절한다. VNS(FDA 승인)는 α7nAChR 활성화 → NF-κB ↓ → 염증 감소. EMF는 VGCC-Ca²⁺ 경로를 통해 NF-κB를 활성화하며([[ref:pall2013_v2|Pall 2013]]), 미주신경 신호 전달이 약화된다. EMF는 기능적으로 '항VNS'이다. [[ref:koopman2016_vns_ra|Koopman 2016]](PNAS): VNS는 류마티스 관절염에서 유의한 반응을 생성했다.",
    icCancerP: "암은 누적적 탈분극의 결과이다. 정상 세포: Vm ≈ −60 mV(과분극). 암세포: Vm ≈ −15 mV(탈분극). Levin(2012)은 직접 보여주었다: 종양 유전자 과발현이 세포를 탈분극 → 종양. 그러나 과분극 이온 채널에 의해 탈분극이 방지되면 → 종양 유전자가 활성이어도 종양이 형성되지 않는다. [[ref:pmc12533209_leukemia_bioelectric|PMC12533209]](2025): 백혈병 세포가 CaV1.2 탈분극을 통해 기질 세포의 생체전기를 '하이재킹'. TTFields(FDA 승인)와 베라파밀(VGCC 차단제, [[ref:pmc5034549_verapamil_cancer|PMC5034549]])은 직접적인 이온성 암 치료이다.",
    icDisSleep: "1. 수면",
    icDisDepBipolar: "2. 우울증/양극성 장애",
    icDisT2D: "4. T2D/대사성",
    icDisAutoimmune: "5. 자가면역",
    icDisInfertility: "6. 불임",
    icDisCancer: "7. 암",
    icTreatMelatonin: "멜라토닌",
    icTreatGuanfacine: "구안파신",
    icTreatGuanfacineFDA: "구안파신 (FDA/EMA)",
    icTreatSulfonylureas: "설폰요소제",
    icTreatTTFieldsVerap: "TTFields, 베라파밀",
    icClinicalPilot: "임상 파일럿",
    icFinding1: "양극성 뉴런: 이온 컨덕턴스 변화 → 과흥분/저흥분 진동",
    icFinding2: "Na,K-ATPase 가설: 경미한 기능 장애 → 조증, 심각 → 우울증",
    icFinding3: "양극성 장애의 K⁺ 채널 — 포괄적 리뷰",
    icFinding4: "백혈병 세포가 CaV1.2 탈분극을 통해 기질 생체전기를 하이재킹",
    icFinding5: "VNS → α7nAChR → 류마티스 관절염에서 유의한 반응",
    icFinding6: "8종 24개 집단 — 대조 동물도 체중 증가 (p < 10⁻⁷)",
    icFinding7: "베라파밀(VGCC 차단제)이 유방암 세포 성장을 in vitro에서 억제",
    icEpistemic: "인식론적 수준: 각 질환에서 이온 채널의 역할 [E] (GWAS, 약리학, FDA). EMF → 이온 채널 메커니즘 [E] ([[ref:pall2013_v2|Pall 2013]]). EMF → 질환 인과관계 [C] (가설). 수렴 모델은 이론적 틀이며 — 인과관계를 증명하지 않는다. 각 질환은 다인자성이다. 이온 채널 약물이 효과가 있다는 것은 증상에서 이온 채널의 역할을 증명하지만 반드시 원인에서는 아니다.",
    // Section 5: See Also
    seeAlso: "참고 항목",
    evidenceRegister: "근거 등록부",
    evidenceRegisterDesc: "BERM v17 근거 등록부 전체",
    eyeColorTitle: "눈 색깔과 자기수용",
    eyeColorDesc: "CRY 민감도와 홍채 색소 침착",
    nutritionTitle: "영양에 의한 CRY 조절",
    nutritionDesc: "B2, 오메가 지방산, 단식",
    brainTitle: "뇌 — 모듈롬",
    brainDesc: "CACNA1C, 7개 발달 채널, 신경발달",
  },
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const d = pickCopy(COPY, locale);
  return { title: `${d.title} – Extinction Field`, description: d.subtitle };
}

export default async function CascadesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const d = pickCopy(COPY, locale);

  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <Link href={`/${locale}/evidence`} className="text-sm text-accent hover:underline mb-6 inline-block">
        {d.backLink}
      </Link>

      <PageHeader icon={Activity} title={d.title} subtitle={d.subtitle} lensIcon={<BermIcon name="signal" size={28} className="text-accent" />} />

      {/* R4b-d: Ionic Treatment Hierarchy */}
      <section id="ionic-hierarchy" className="mb-16 border-t editorial-rule pt-6">
        <h2 className="editorial-section-heading mb-3">
          {d.ihHeading}
        </h2>
        <div className="space-y-4 text-sm text-foreground-muted leading-relaxed max-w-4xl">
          <p className="editorial-rail text-[0.95rem] text-foreground">
            <InlineReferenceText text={d.ihP1} locale={locale} />
          </p>
          <p>
            <InlineReferenceText text={d.ihP2} locale={locale} />
          </p>
          <p>
            <InlineReferenceText text={d.ihP3} locale={locale} />
          </p>
          <p>
            <InlineReferenceText text={d.ihP4} locale={locale} />
          </p>
        </div>

        <IonicHierarchyDiagram locale={locale} />

        <div className="mt-6 overflow-x-auto">
          <table className="w-full text-sm border-collapse max-w-4xl">
            <thead>
              <tr className="border-b border-card-border text-left text-xs text-foreground-muted uppercase tracking-wider">
                <th className="py-2 pr-3">{d.thCitation}</th>
                <th className="py-2 pr-3 w-16">{d.thYear}</th>
                <th className="py-2">{d.thFinding}</th>
              </tr>
            </thead>
            <tbody className="text-foreground-muted">
              <tr className="border-b border-card-border/40">
                <td className="py-2 pr-3 font-medium text-foreground"><StudyCitation referenceId="cipriani2018_antidepressants" locale={locale} label="Cipriani et al. (Lancet)" /></td>
                <td className="py-2 pr-3 font-mono-num">2018</td>
                <td className="py-2">{d.ihFinding1}</td>
              </tr>
              <tr className="border-b border-card-border/40">
                <td className="py-2 pr-3 font-medium text-foreground"><StudyCitation referenceId="goodwin2022_psilocybin" locale={locale} label="Goodwin et al. (NEJM)" /></td>
                <td className="py-2 pr-3 font-mono-num">2022</td>
                <td className="py-2">{d.ihFinding2}</td>
              </tr>
              <tr className="border-b border-card-border/40">
                <td className="py-2 pr-3 font-medium text-foreground"><StudyCitation referenceId="sousouri2025_cacna1c" locale={locale} label="Sousouri et al. (PMC12491688)" /></td>
                <td className="py-2 pr-3 font-mono-num">2025</td>
                <td className="py-2">{d.ihFinding3}</td>
              </tr>
              <tr className="border-b border-card-border/40">
                <td className="py-2 pr-3 font-medium text-foreground"><StudyCitation referenceId="elmallakh2004_lithium_ion" locale={locale} label="El-Mallakh & Bhansali" /></td>
                <td className="py-2 pr-3 font-mono-num">2004/2010</td>
                <td className="py-2">{d.ihFinding4}</td>
              </tr>
              <tr className="border-b border-card-border/40">
                <td className="py-2 pr-3 font-medium text-foreground"><StudyCitation referenceId="zarate2006_ketamine" locale={locale} label="Zarate et al. (Arch Gen Psych)" /></td>
                <td className="py-2 pr-3 font-mono-num">2006</td>
                <td className="py-2">{d.ihFinding5}</td>
              </tr>
              <tr className="border-b border-card-border/40">
                <td className="py-2 pr-3 font-medium text-foreground"><StudyCitation referenceId="rosenthal2025_ect_csd" locale={locale} label="Rosenthal et al. (Nat Commun)" /></td>
                <td className="py-2 pr-3 font-mono-num">2025</td>
                <td className="py-2">{d.ihFinding6}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-xs text-foreground-muted italic mt-4 max-w-4xl">
          <InlineReferenceText text={d.ihEpistemic} locale={locale} />
        </p>
      </section>

      {/* The Skin Battery — dermal bioelectric system */}
      <section id="skin-battery" className="mb-16 border-t editorial-rule pt-6">
        <h2 className="editorial-section-heading mb-3">
          {d.sbHeading}
        </h2>
        <div className="space-y-4 text-sm text-foreground-muted leading-relaxed max-w-4xl">
          <p className="editorial-rail text-[0.95rem] text-foreground">
            <InlineReferenceText text={d.sbP1} locale={locale} />
          </p>
          <p>
            <InlineReferenceText text={d.sbP2} locale={locale} />
          </p>
          <p>
            <InlineReferenceText text={d.sbP3} locale={locale} />
          </p>
          <p>
            <InlineReferenceText text={d.sbP4} locale={locale} />
          </p>
        </div>

        <div className="mt-6 overflow-x-auto">
          <table className="w-full text-sm border-collapse max-w-4xl">
            <thead>
              <tr className="border-b border-card-border text-left text-xs text-foreground-muted uppercase tracking-wider">
                <th className="py-2 pr-3">{d.thCitation}</th>
                <th className="py-2 pr-3 w-16">{d.thYear}</th>
                <th className="py-2">{d.thFinding}</th>
              </tr>
            </thead>
            <tbody className="text-foreground-muted">
              <tr className="border-b border-card-border/40">
                <td className="py-2 pr-3 font-medium text-foreground"><StudyCitation referenceId="lim2024_skin_battery" locale={locale} label="Lim et al. (SAGE Journals)" /></td>
                <td className="py-2 pr-3 font-mono-num">2024</td>
                <td className="py-2">{d.sbFinding1}</td>
              </tr>
              <tr className="border-b border-card-border/40">
                <td className="py-2 pr-3 font-medium text-foreground"><StudyCitation referenceId="zhao2006_wound_ef" locale={locale} label="Zhao et al. (Nature)" /></td>
                <td className="py-2 pr-3 font-mono-num">2006</td>
                <td className="py-2">{d.sbFinding2}</td>
              </tr>
              <tr className="border-b border-card-border/40">
                <td className="py-2 pr-3 font-medium text-foreground"><StudyCitation referenceId="fukada1957_piezo" locale={locale} label="Fukada & Yasuda" /></td>
                <td className="py-2 pr-3 font-mono-num">1957</td>
                <td className="py-2">{d.sbFinding3}</td>
              </tr>
              <tr className="border-b border-card-border/40">
                <td className="py-2 pr-3 font-medium text-foreground"><StudyCitation referenceId="mohandas2022_piezo1_keratinocyte" locale={locale} label="Mohandas et al. (eLife)" /></td>
                <td className="py-2 pr-3 font-mono-num">2022</td>
                <td className="py-2">{d.sbFinding4}</td>
              </tr>
              <tr className="border-b border-card-border/40">
                <td className="py-2 pr-3 font-medium text-foreground"><StudyCitation referenceId="skedung2013_nanoscale_touch" locale={locale} label="Skedung et al. (Scientific Reports)" /></td>
                <td className="py-2 pr-3 font-mono-num">2013</td>
                <td className="py-2">{d.sbFinding5}</td>
              </tr>
              <tr className="border-b border-card-border/40">
                <td className="py-2 pr-3 font-medium text-foreground">—</td>
                <td className="py-2 pr-3 font-mono-num">2016</td>
                <td className="py-2">{d.sbFinding6}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-xs text-foreground-muted italic mt-4 max-w-4xl">
          <InlineReferenceText text={d.sbEpistemic} locale={locale} />
        </p>
      </section>

      {/* ADHD as developmental ion channel calibration error */}
      <section id="adhd-calibration" className="mb-16 border-t editorial-rule pt-6">
        <span id="adhd" />
        <h2 className="editorial-section-heading mb-3">
          {d.adhdHeading}
        </h2>
        <div className="space-y-4 text-sm text-foreground-muted leading-relaxed max-w-4xl">
          <p className="editorial-rail text-[0.95rem] text-foreground">
            <InlineReferenceText text={d.adhdP1} locale={locale} />
          </p>
          <p>
            <InlineReferenceText text={d.adhdP2} locale={locale} />
          </p>
          <p>
            <InlineReferenceText text={d.adhdP3} locale={locale} />
          </p>
          <p>
            <InlineReferenceText text={d.adhdP4} locale={locale} />
          </p>
          <p>
            <InlineReferenceText text={d.adhdP5} locale={locale} />
          </p>
        </div>

        <div className="mt-6 overflow-x-auto">
          <table className="w-full text-sm border-collapse max-w-4xl">
            <thead>
              <tr className="border-b border-card-border text-left text-xs text-foreground-muted uppercase tracking-wider">
                <th className="py-2 pr-3">{d.thCitation}</th>
                <th className="py-2 pr-3 w-16">{d.thYear}</th>
                <th className="py-2">{d.thFinding}</th>
              </tr>
            </thead>
            <tbody className="text-foreground-muted">
              <tr className="border-b border-card-border/40">
                <td className="py-2 pr-3 font-medium text-foreground"><StudyCitation referenceId="li2020_jama_adhd" locale={locale} label="Li ym. (JAMA Network Open)" /></td>
                <td className="py-2 pr-3 font-mono-num">2020</td>
                <td className="py-2">{d.adhdFinding1}</td>
              </tr>
              <tr className="border-b border-card-border/40">
                <td className="py-2 pr-3 font-medium text-foreground"><StudyCitation referenceId="pmc6101623_cacna1c_gwas" locale={locale} label="PMC6101623" /> / <StudyCitation referenceId="pmc6679227_cacna1c_review" locale={locale} label="PMC6679227" /></td>
                <td className="py-2 pr-3 font-mono-num">2018/19</td>
                <td className="py-2">{d.adhdFinding2}</td>
              </tr>
              <tr className="border-b border-card-border/40">
                <td className="py-2 pr-3 font-medium text-foreground"><StudyCitation referenceId="pmc6894750_timothy" locale={locale} label="PMC6894750" /></td>
                <td className="py-2 pr-3 font-mono-num">2019</td>
                <td className="py-2">{d.adhdFinding3}</td>
              </tr>
              <tr className="border-b border-card-border/40">
                <td className="py-2 pr-3 font-medium text-foreground"><StudyCitation referenceId="wang2007_guanfacine_hcn" locale={locale} label="Wang ym. (Cell)" /></td>
                <td className="py-2 pr-3 font-mono-num">2007</td>
                <td className="py-2">{d.adhdFinding4}</td>
              </tr>
              <tr className="border-b border-card-border/40">
                <td className="py-2 pr-3 font-medium text-foreground"><StudyCitation referenceId="pmc3306017_aldad_fetal" locale={locale} label="Aldad ym. (PMC3306017)" /></td>
                <td className="py-2 pr-3 font-mono-num">2012</td>
                <td className="py-2">{d.adhdFinding5}</td>
              </tr>
              <tr className="border-b border-card-border/40">
                <td className="py-2 pr-3 font-medium text-foreground"><StudyCitation referenceId="pmc7287020_hong_lifelong" locale={locale} label="Hong ym. (PMC7287020)" /></td>
                <td className="py-2 pr-3 font-mono-num">2020</td>
                <td className="py-2">{d.adhdFinding6}</td>
              </tr>
              <tr className="border-b border-card-border/40">
                <td className="py-2 pr-3 font-medium text-foreground"><StudyCitation referenceId="pmc4658333_vgcc_brain_dev" locale={locale} label="PMC4658333" /></td>
                <td className="py-2 pr-3 font-mono-num">2015</td>
                <td className="py-2">{d.adhdFinding7}</td>
              </tr>

            </tbody>
          </table>
        </div>
        <p className="text-xs text-foreground-muted italic mt-4 max-w-4xl">
          <InlineReferenceText text={d.adhdEpistemic} locale={locale} />
        </p>
      </section>

      {/* Ion channel convergence across 8 cascade diseases */}
      <section id="ion-convergence" className="mb-16 border-t editorial-rule pt-6">
        <h2 className="editorial-section-heading mb-3">
          {d.icHeading}
        </h2>
        <div className="space-y-4 text-sm text-foreground-muted leading-relaxed max-w-4xl">
          <p className="editorial-rail text-[0.95rem] text-foreground">
            <InlineReferenceText text={d.icP1} locale={locale} />
          </p>
          <span id="depression" />
          <p>
            <InlineReferenceText text={d.icBipolarP} locale={locale} />
          </p>
          <span id="metabolic" /><span id="insulin" />
          <p>
            <InlineReferenceText text={d.icMetabolicP} locale={locale} />
          </p>
          <span id="autoimmune" />
          <p>
            <InlineReferenceText text={d.icAutoimmuneP} locale={locale} />
          </p>
          <span id="cancer" />
          <p>
            <InlineReferenceText text={d.icCancerP} locale={locale} />
          </p>
        </div>

        <div className="mt-6 overflow-x-auto">
          <table className="w-full text-sm border-collapse max-w-4xl">
            <thead>
              <tr className="border-b border-card-border text-left text-xs text-foreground-muted uppercase tracking-wider">
                <th className="py-2 pr-3">{d.thDisease}</th>
                <th className="py-2 pr-3">{d.thIonChannel}</th>
                <th className="py-2 pr-3">{d.thIonicTreatment}</th>
                <th className="py-2">{d.thTdpEvidence}</th>
              </tr>
            </thead>
            <tbody className="text-foreground-muted">
              <tr className="border-b border-card-border/40">
                <td className="py-2 pr-3 font-medium text-foreground">{d.icDisSleep}</td>
                <td className="py-2 pr-3">CRY + VGCC</td>
                <td className="py-2 pr-3">{d.icTreatMelatonin}</td>
                <td className="py-2">Flock Off (CRY)</td>
              </tr>
              <tr className="border-b border-card-border/40">
                <td className="py-2 pr-3 font-medium text-foreground">{d.icDisDepBipolar}</td>
                <td className="py-2 pr-3">CACNA1C, Na,K-ATPase, HCN</td>
                <td className="py-2 pr-3">Li⁺, TMS, ECT</td>
                <td className="py-2">TMS/tDCS/ECT (FDA)</td>
              </tr>
              <tr className="border-b border-card-border/40">
                <td className="py-2 pr-3 font-medium text-foreground">3. ADHD</td>
                <td className="py-2 pr-3">CACNA1C, HCN</td>
                <td className="py-2 pr-3">{d.icTreatGuanfacine}</td>
                <td className="py-2">{d.icTreatGuanfacineFDA}</td>
              </tr>
              <tr className="border-b border-card-border/40">
                <td className="py-2 pr-3 font-medium text-foreground">{d.icDisT2D}</td>
                <td className="py-2 pr-3">K-ATP (Kir6.2), VGCC</td>
                <td className="py-2 pr-3">{d.icTreatSulfonylureas}</td>
                <td className="py-2">Patent 4850959</td>
              </tr>
              <tr className="border-b border-card-border/40">
                <td className="py-2 pr-3 font-medium text-foreground">{d.icDisAutoimmune}</td>
                <td className="py-2 pr-3">α7nAChR</td>
                <td className="py-2 pr-3">VNS</td>
                <td className="py-2">VNS (FDA)</td>
              </tr>
              <tr className="border-b border-card-border/40">
                <td className="py-2 pr-3 font-medium text-foreground">{d.icDisInfertility}</td>
                <td className="py-2 pr-3">CatSper, VGCC</td>
                <td className="py-2 pr-3">(TTFields)</td>
                <td className="py-2">TTFields (FDA)</td>
              </tr>
              <tr className="border-b border-card-border/40">
                <td className="py-2 pr-3 font-medium text-foreground">{d.icDisCancer}</td>
                <td className="py-2 pr-3">Vm/Cav1.2</td>
                <td className="py-2 pr-3">{d.icTreatTTFieldsVerap}</td>
                <td className="py-2">TTFields (FDA)</td>
              </tr>
              <tr className="border-b border-card-border/40">
                <td className="py-2 pr-3 font-medium text-foreground">8. Alzheimer</td>
                <td className="py-2 pr-3">CACNA1C, PSEN</td>
                <td className="py-2 pr-3">TEMT</td>
                <td className="py-2">TEMT ({d.icClinicalPilot})</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="mt-6 overflow-x-auto">
          <table className="w-full text-sm border-collapse max-w-4xl">
            <thead>
              <tr className="border-b border-card-border text-left text-xs text-foreground-muted uppercase tracking-wider">
                <th className="py-2 pr-3">{d.thCitation}</th>
                <th className="py-2 pr-3 w-16">{d.thYear}</th>
                <th className="py-2">{d.thFinding}</th>
              </tr>
            </thead>
            <tbody className="text-foreground-muted">
              <tr className="border-b border-card-border/40">
                <td className="py-2 pr-3 font-medium text-foreground"><StudyCitation referenceId="pubmed32278494_bipolar_ionic" locale={locale} label="PubMed 32278494" /></td>
                <td className="py-2 pr-3 font-mono-num">2020</td>
                <td className="py-2">{d.icFinding1}</td>
              </tr>
              <tr className="border-b border-card-border/40">
                <td className="py-2 pr-3 font-medium text-foreground"><StudyCitation referenceId="elmallakh2004_nakatpase" locale={locale} label="El-Mallakh 2000/2004" /></td>
                <td className="py-2 pr-3 font-mono-num">2004</td>
                <td className="py-2">{d.icFinding2}</td>
              </tr>
              <tr className="border-b border-card-border/40">
                <td className="py-2 pr-3 font-medium text-foreground"><StudyCitation referenceId="pmc3678088_k_channels_bipolar" locale={locale} label="PMC3678088" /></td>
                <td className="py-2 pr-3 font-mono-num">2013</td>
                <td className="py-2">{d.icFinding3}</td>
              </tr>
              <tr className="border-b border-card-border/40">
                <td className="py-2 pr-3 font-medium text-foreground"><StudyCitation referenceId="pmc12533209_leukemia_bioelectric" locale={locale} label="PMC12533209" /></td>
                <td className="py-2 pr-3 font-mono-num">2025</td>
                <td className="py-2">{d.icFinding4}</td>
              </tr>
              <tr className="border-b border-card-border/40">
                <td className="py-2 pr-3 font-medium text-foreground"><StudyCitation referenceId="koopman2016_vns_ra" locale={locale} label="Koopman 2016 (PNAS)" /></td>
                <td className="py-2 pr-3 font-mono-num">2016</td>
                <td className="py-2">{d.icFinding5}</td>
              </tr>
              <tr className="border-b border-card-border/40">
                <td className="py-2 pr-3 font-medium text-foreground"><StudyCitation referenceId="klimentidis2010" locale={locale} label="Klimentidis 2011" /></td>
                <td className="py-2 pr-3 font-mono-num">2011</td>
                <td className="py-2">{d.icFinding6}</td>
              </tr>
              <tr className="border-b border-card-border/40">
                <td className="py-2 pr-3 font-medium text-foreground"><StudyCitation referenceId="pmc5034549_verapamil_cancer" locale={locale} label="PMC5034549" /></td>
                <td className="py-2 pr-3 font-mono-num">2016</td>
                <td className="py-2">{d.icFinding7}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-xs text-foreground-muted italic mt-4 max-w-4xl">
          <InlineReferenceText text={d.icEpistemic} locale={locale} />
        </p>
      </section>

      {/* Disease Cascade Timeline */}
      <DiseaseCascadeTimeline locale={locale} />

      {/* See also navigation */}
      <section className="mt-16 border-t editorial-rule pt-6">
        <h2 className="editorial-section-heading mb-4">
          {d.seeAlso}
        </h2>
        <div className="grid gap-3 sm:grid-cols-2">
          <Link
            href={`/${locale}/evidence`}
            className="block rounded-lg border border-card-border p-4 hover:border-accent transition-colors"
          >
            <span className="text-sm font-medium text-foreground">
              {d.evidenceRegister}
            </span>
            <p className="text-xs text-foreground-muted mt-1">
              {d.evidenceRegisterDesc}
            </p>
          </Link>
          <Link
            href={`/${locale}/evidence/eyes`}
            className="block rounded-lg border border-card-border p-4 hover:border-accent transition-colors"
          >
            <span className="text-sm font-medium text-foreground">
              {d.eyeColorTitle}
            </span>
            <p className="text-xs text-foreground-muted mt-1">
              {d.eyeColorDesc}
            </p>
          </Link>
          <Link
            href={`/${locale}/evidence/nutrition`}
            className="block rounded-lg border border-card-border p-4 hover:border-accent transition-colors"
          >
            <span className="text-sm font-medium text-foreground">
              {d.nutritionTitle}
            </span>
            <p className="text-xs text-foreground-muted mt-1">
              {d.nutritionDesc}
            </p>
          </Link>
          <Link
            href={`/${locale}/modulome/brain`}
            className="block rounded-lg border border-card-border p-4 hover:border-accent transition-colors"
          >
            <span className="text-sm font-medium text-foreground">
              {d.brainTitle}
            </span>
            <p className="text-xs text-foreground-muted mt-1">
              {d.brainDesc}
            </p>
          </Link>
        </div>
      </section>
    </div>
  );
}
