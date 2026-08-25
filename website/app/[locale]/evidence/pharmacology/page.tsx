import type { Metadata } from "next";
import Link from "next/link";
import { Pill } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { CitationLink } from "@/components/CitationLink";

const COPY = {
  en: {
    title: "Pharmacological Evidence",
    subtitle: "If VGCC activation is the primary transduction mechanism, drugs that block or modulate the same channels should attenuate EMF-associated biological effects. Eight drug classes provide convergent pharmacological evidence.",
    backLink: "← Back to Evidence",
    cardsTitle: "Drug evidence cards",
    cardsLead: "Each card presents a drug class, its mechanism of action on the BERM-relevant pathway, the key evidence, and the model interpretation. Evidence levels follow the BERM classification: E = experimental, C = clinical/epidemiological, M = mechanistic, L = logical inference, L* = speculative.",
    cards: [
      {
        id: "CCB",
        drug: "Calcium channel blockers (CCBs)",
        drugSub: "Nifedipine, amlodipine, verapamil, diltiazem",
        mechanism: "L-type VGCC blockade → prevents EMF-induced Ca²⁺ influx at the primary transduction node (pathway A). CCBs are the most direct pharmacological test of BERM's central mechanism.",
        evidence: [
          "Pall 2013 (J. Cell. Mol. Med.): systematic review of 23 studies — VGCC blockers prevent or attenuate EMF-induced biological effects across cell types, exposure frequencies, and endpoints. The most replicated pharmacological finding in EMF bioeffects research.",
          "CCBs are the most prescribed antihypertensive class globally with >264,000 published studies. They are among the best-characterized drugs in clinical medicine. The Ca²⁺ channel they target is the same channel BERM identifies as the EMF transduction node.",
          "Amlodipine (the most prescribed CCB) has a 36-hour half-life — providing near-continuous VGCC blockade. If ambient EMF causes chronic low-grade VGCC activation, amlodipine users should show attenuated EMF bioeffects compared to users of non-CCB antihypertensives.",
        ],
        interpretation: "CCBs are the BERM model's positive pharmacological control. If EMF acts through VGCCs, CCB users constitute a population-scale 'partial Faraday cage' — pharmacologically shielded at the transduction node. Testable: compare sperm parameters, melatonin levels, and oxidative stress markers in CCB users vs. ARB/ACE inhibitor users (same indication, different mechanism).",
        level: "E",
        critical: true,
      },
      {
        id: "VERAPAMIL",
        drug: "Verapamil (phenylalkylamine CCB)",
        drugSub: "Non-dihydropyridine, frequency-dependent blockade",
        mechanism: "Verapamil has a unique pharmacological property: frequency-dependent (use-dependent) channel blockade — it blocks VGCCs more effectively when channels open frequently. If EMF causes high-frequency VGCC opening (IFO mechanism), verapamil should be disproportionately effective at blocking EMF-induced Ca²⁺ influx compared to dihydropyridines like amlodipine.",
        evidence: [
          "Verapamil's use-dependent blockade is well-established in cardiac pharmacology (class IV antiarrhythmic). The same property makes it theoretically optimal for blocking IFO-induced rapid channel cycling.",
          "Lundberg 1996 (Bioelectromagnetics): verapamil blocked EMF-induced calcium efflux in bone cells — direct evidence that the EMF-calcium pathway is pharmacologically blockable in reproductive-adjacent tissue.",
          "Verapamil is also used in reproductive medicine for sperm preparation protocols, where it can improve motility by modulating calcium dynamics — mechanistic overlap with BERM's predicted EMF pathway.",
        ],
        interpretation: "Verapamil's use-dependent kinetics predict it should be the most effective CCB against EMF effects. A head-to-head comparison of verapamil vs. amlodipine vs. non-CCB antihypertensive users on sperm quality endpoints would be a high-discrimination test.",
        level: "E|M",
      },
      {
        id: "LITHIUM",
        drug: "Lithium",
        drugSub: "Mood stabilizer, GSK-3β inhibitor, neuroprotective",
        mechanism: "Lithium inhibits GSK-3β, which phosphorylates CRY proteins and targets them for degradation. GSK-3β inhibition → CRY accumulates → stronger circadian clock → enhanced melatonin signaling. Lithium also stabilizes circadian period length and increases melatonin secretion — directly opposing BERM pathway C (CRY/RPM → melatonin suppression).",
        evidence: [
          "Lithium lengthens circadian period in every organism tested from cyanobacteria to humans (McCarthy 2019, Translational Psychiatry). This is mediated by GSK-3β inhibition of CRY degradation.",
          "Lithium increases melatonin secretion in bipolar patients (Hallam 2005, J. Psychopharmacology). This is the opposite direction to EMF-induced melatonin suppression (Tbahriti 2026 PRISMA: 88% of high-quality animal studies report EMF-induced melatonin suppression).",
          "Lithium is neuroprotective via multiple BERM-relevant mechanisms: GSK-3β inhibition reduces tau phosphorylation (Alzheimer's pathway), BDNF upregulation supports neuroplasticity, and anti-inflammatory effects reduce neuroinflammation. All three are downstream of BERM's Ca²⁺ disruption cascade.",
        ],
        interpretation: "Lithium provides pathway C pharmacological counter-evidence. If CRY-mediated melatonin suppression contributes to EMF bioeffects, lithium's CRY stabilization and melatonin enhancement should partially protect against pathway C effects. Testable: lithium-treated bipolar patients should show less circadian disruption in high-EMF environments compared to bipolar patients on non-lithium mood stabilizers (e.g. valproate).",
        level: "M|C",
      },
      {
        id: "SEMAGLUTIDE",
        drug: "Semaglutide / GLP-1 receptor agonists",
        drugSub: "Ozempic, Wegovy, Mounjaro (tirzepatide)",
        mechanism: "GLP-1R signaling activates L-type VGCCs in pancreatic β-cells to trigger insulin release (Bhatt 2012). If EMF chronically disrupts the L-type VGCC → Ca²⁺ → ERK pathway, GLP-1 agonists may partially correct this disruption by pharmacologically amplifying the same pathway downstream of the channel.",
        evidence: [
          "Semaglutide's unprecedented efficacy in metabolic syndrome (15–20% weight loss, cardiovascular risk reduction, NASH improvement, kidney protection) maps onto multiple BERM-predicted metabolic disruption endpoints. The breadth of benefit is consistent with correcting an upstream disruption rather than a downstream symptom.",
          "The Klimentidis paradox (2011, Proc. R. Soc. B): 24 populations of 8 species have all gained weight since the 1970s (p = 1.2×10⁻⁷). Diet/exercise cannot explain weight gain in laboratory animals on controlled diets. An environmental factor affecting calcium-dependent metabolic pathways is consistent with BERM.",
          "GLP-1 is expressed in the brain (NTS, hypothalamus) where it modulates appetite, reward, and nausea through calcium-dependent signaling. Semaglutide's central effects could partially compensate for EMF-disrupted hypothalamic calcium dynamics.",
        ],
        interpretation: "SPECULATIVE: if EMF disrupts the L-type VGCC → Ca²⁺ → ERK pathway, semaglutide's efficacy may be partly explained by pharmacological compensation for environmental calcium disruption. Testable prediction: semaglutide efficacy should correlate with ambient EMF level (METAB-3). This prediction is currently locked as evidence level L*.",
        level: "L*",
      },
      {
        id: "GABAPENTINOID",
        drug: "Gabapentinoids",
        drugSub: "Gabapentin, pregabalin (Lyrica)",
        mechanism: "Gabapentinoids bind the α2δ subunit of voltage-gated calcium channels, reducing Ca²⁺ influx at presynaptic terminals. This is NOT the same subunit as the α1 pore-forming unit targeted by CCBs — gabapentinoids modulate channel trafficking and surface expression rather than directly blocking the pore.",
        evidence: [
          "Gabapentin and pregabalin are prescribed for neuropathic pain, epilepsy, and anxiety — conditions that involve neuronal calcium hyperexcitability. If EMF contributes to neuronal calcium dysregulation (BERM pathway A), gabapentinoid users may inadvertently be partially protected.",
          "Pregabalin carries a known side effect of reduced libido and sexual dysfunction (Calabrò 2015), which could appear to contradict BERM — but this is consistent: gabapentinoids suppress ALL calcium-dependent signaling including normal reproductive hormone pathways, not just EMF-induced excess.",
          "The α2δ subunit is heavily expressed in dorsal root ganglia and spinal cord — explaining gabapentinoids' efficacy in neuropathic pain. It is also expressed in the hypothalamus, where it could modulate GnRH pulsatility (BERM Level 7).",
        ],
        interpretation: "Gabapentinoids provide a pharmacological dissection of BERM's calcium model: they modulate a different calcium channel subunit than CCBs, predicting partially overlapping but distinguishable effects. The α2δ modulation is more relevant to neural endpoints (pain, sleep, anxiety) while α1 blockade (CCBs) is more relevant to peripheral/reproductive endpoints.",
        level: "M",
      },
      {
        id: "NIMODIPINE-ETH",
        drug: "Nimodipine (L-type CCB, CNS-selective)",
        drugSub: "Dihydropyridine with BBB penetration",
        mechanism: "Nimodipine crosses the blood-brain barrier — unlike most other dihydropyridine CCBs — and preferentially blocks L-type VGCCs in cerebral vasculature and neurons. If EMF-induced VGCC activation contributes to neurodegeneration and cognitive decline, a CNS-selective CCB should provide neuroprotection.",
        evidence: [
          "Nimodipine is FDA-approved for cerebral vasospasm prevention after subarachnoid hemorrhage. Its neuroprotective mechanism (calcium-mediated) overlaps with BERM's predicted CNS effects of chronic VGCC activation.",
          "Ongoing clinical interest in nimodipine for Alzheimer's disease and vascular dementia suggests that calcium channel dysregulation contributes to neurodegeneration — consistent with BERM's BBB/neurodegeneration cascade (evidence page: /evidence/bbb).",
          "Nimodipine's BBB penetration makes it the only CCB that could theoretically attenuate EMF effects on both peripheral (reproductive) and central (cognitive, circadian) endpoints simultaneously.",
        ],
        interpretation: "Nimodipine is the most informative single CCB for BERM's expanded model: its CNS selectivity allows testing the hypothesis that VGCC activation contributes to EMF-associated cognitive and neurodegenerative effects independently of peripheral endpoints. If nimodipine attenuates EMF-induced cognitive effects (cf. Koivisto 2000) while amlodipine does not, it confirms BBB penetration as the critical pharmacological variable.",
        level: "M|L",
      },
      {
        id: "MELATONIN",
        drug: "Exogenous melatonin",
        drugSub: "Pathway C endpoint supplementation",
        mechanism: "Melatonin supplementation directly replaces the hormone that BERM pathway C (CRY/RPM → melatonin suppression) predicts is reduced by EMF exposure. This is endpoint supplementation, not mechanism blockade — it does not prevent EMF-induced CRY disruption but compensates for its downstream hormonal consequence.",
        evidence: [
          "Tbahriti et al. 2026 (Sleep Biol Rhythms, PRISMA systematic review of 55 studies): 88% of high-quality animal studies report EMF-induced melatonin suppression of 20–50% from baseline. Exogenous melatonin would replace this deficit.",
          "Melatonin is a potent antioxidant that scavenges ROS — directly counteracting the oxidative stress cascade (BERM Level 5A) independently of its hormonal function. This dual action (antioxidant + hormonal replacement) makes it effective against both pathway A downstream (ROS) and pathway C downstream (melatonin deficit).",
          "Reiter et al. 2007, 2014: multiple reviews demonstrating melatonin's protective effects against RF-induced oxidative damage in animal models. Dose-dependent protection consistent with BERM's recovery window model.",
        ],
        interpretation: "Melatonin is the most accessible pharmacological test of BERM pathway C. If nighttime melatonin supplementation (1–3 mg, timed to natural secretion) attenuates EMF-associated sleep disruption and improves sperm parameters in high-EMF environments, it supports the melatonin bridge hypothesis. Caveat: melatonin does not address pathways A (VGCC) or B (ELF), so protection should be partial.",
        level: "E|M",
      },
      {
        id: "COENZYME-Q10",
        drug: "Coenzyme Q10 (CoQ10 / ubiquinone)",
        drugSub: "Mitochondrial electron carrier, endogenous antioxidant",
        mechanism: "CoQ10 operates at the mitochondrial inner membrane where it shuttles electrons in the electron transport chain (complex I→III). It is also a lipid-soluble antioxidant that neutralizes ROS in membranes. BERM's Level 5A (Ca²⁺ → mitochondrial ROS) predicts that antioxidant capacity determines net daily damage: net_daily = damage_rate × t_emf × (1 − exp(−t_free / τ_repair)). CoQ10 supplementation reduces τ_repair by increasing antioxidant capacity.",
        evidence: [
          "Bektas et al. 2026 (Bioelectromagnetics): 3.5 GHz RF (5G frequency) induced testicular and oxidative damage in rats. CoQ10 supplementation ameliorated the damage. This is the first direct demonstration that antioxidant supplementation protects against 5G-frequency reproductive damage.",
          "CoQ10 supplementation improves sperm parameters in subfertile men (Safarinejad 2012, meta-analysis: improved motility and concentration). If part of modern sperm decline is EMF-mediated oxidative damage, CoQ10's benefit is mechanistically consistent.",
          "CoQ10 levels decline with age — tracking the same timeline as testosterone decline and rising oxidative stress. Age-related CoQ10 depletion would amplify EMF-induced oxidative damage by reducing repair capacity.",
        ],
        interpretation: "CoQ10 is the pharmacological analogue of BERM's recovery window: instead of reducing exposure time, it enhances repair rate. The Bektas 2026 result is the strongest single-study evidence for pharmacological EMF protection. CoQ10 addresses pathway A downstream (ROS) but not the upstream transduction (VGCC activation) or pathways B/C.",
        level: "E",
      },
    ],
    convergenceTitle: "Pharmacological convergence argument",
    convergenceLead: "The strongest evidence for any biological mechanism is pharmacological: if blocking the proposed transduction channel abolishes the effect, the mechanism is confirmed. Eight drug classes converge on BERM's predicted pathways:",
    convergencePoints: [
      "Pathway A (VGCC): CCBs (23 blocker studies), verapamil (frequency-dependent blockade), gabapentinoids (α2δ modulation), nimodipine (CNS-selective blockade)",
      "Pathway C (CRY/melatonin): Lithium (CRY stabilization via GSK-3β), exogenous melatonin (endpoint replacement)",
      "ROS cascade: CoQ10 (antioxidant rescue, Bektas 2026 5G data), melatonin (dual antioxidant + hormonal)",
      "Metabolic branch: Semaglutide/GLP-1 agonists (Ca²⁺-ERK pathway amplification) — speculative but testable",
    ],
    convergenceConclusion: "No other environmental exposure hypothesis predicts that these specific drug classes should be relevant to the same biological endpoints. The pharmacological convergence — CCBs, lithium, melatonin, CoQ10, and gabapentinoids acting on distinct but connected targets — constitutes the model's clinically strongest argument.",
    predictionLink: "See: Pharmacological predictions (PHARM-1 through PHARM-5)",
    predictionHref: "/predictions",
  },
  fi: {
    title: "Farmakologinen evidenssi",
    subtitle: "Jos VGCC-aktivaatio on primaarinen transduutiomekanismi, lääkkeet jotka blokkaavat tai moduloivat samoja kanavia pitäisi vaimentaa EMF:ään liittyviä biologisia vaikutuksia. Kahdeksan lääkeryhmää tarjoaa konvergoivan farmakologisen evidenssin.",
    backLink: "← Takaisin evidenssiin",
    cardsTitle: "Lääke-evidenssikortit",
    cardsLead: "Jokainen kortti esittää lääkeryhmän, sen vaikutusmekanismin BERM:n kannalta relevantille reitille, avainevidenssin ja mallitulkinnan. Evidenssitasot noudattavat BERM-luokittelua: E = kokeellinen, C = kliininen/epidemiologinen, M = mekanistinen, L = looginen päätelmä, L* = spekulatiivinen.",
    cards: [
      {
        id: "CCB",
        drug: "Kalsiumkanavan salpaajat (CCB:t)",
        drugSub: "Nifedipiini, amlodipiini, verapamiili, diltiatseemi",
        mechanism: "L-tyypin VGCC-salppaus → estää EMF:n aiheuttaman Ca²⁺-influksin primaarisessa transduuktiopisteessä (reitti A). CCB:t ovat suorin farmakologinen testi BERM:n keskeiselle mekanismille.",
        evidence: [
          "Pall 2013 (J. Cell. Mol. Med.): systemaattinen katsaus 23 tutkimuksesta — VGCC-salpaajat estävät tai vaimentavat EMF:n aiheuttamia biologisia vaikutuksia eri solutyypeissä, altistustaajuuksilla ja päätepisteissä. Eniten toistettu farmakologinen havainto EMF-bioeffektitutkimuksessa.",
          "CCB:t ovat maailmanlaajuisesti eniten määrätty verenpainelääkeryhmä yli 264 000 julkaistulla tutkimuksella. Ca²⁺-kanava johon ne kohdistuvat on sama kanava jonka BERM tunnistaa EMF:n transduutiopisteeksi.",
          "Amlodipiinilla (eniten määrätty CCB) on 36 tunnin puoliintumisaika — tarjoten lähes jatkuvan VGCC-salppauksen. Jos ympäröivä EMF aiheuttaa kroonista matala-asteista VGCC-aktivaatiota, amlodipiinin käyttäjillä pitäisi näkyä vaimennettuja EMF-bioeffektejä verrattuna muiden verenpainelääkkeiden käyttäjiin.",
        ],
        interpretation: "CCB:t ovat BERM-mallin positiivinen farmakologinen kontrolli. Jos EMF toimii VGCC:n kautta, CCB-käyttäjät muodostavat populaatiotason 'osittaisen Faradayn häkin' — farmakologisesti suojattuja transduutiopisteessä.",
        level: "E",
        critical: true,
      },
      {
        id: "VERAPAMIL",
        drug: "Verapamiili (fenyylialkylamiini-CCB)",
        drugSub: "Ei-dihydropyridini, taajuusriippuvainen salppaus",
        mechanism: "Verapamiililla on ainutlaatuinen ominaisuus: taajuusriippuvainen (käyttöriippuvainen) kanavasalppaus — se salppaa VGCC:itä tehokkaammin kun kanavat avautuvat usein. Jos EMF aiheuttaa korkeataajuista VGCC-avautumista (IFO-mekanismi), verapamiilin pitäisi olla suhteettoman tehokas EMF-indusoidun Ca²⁺-influksin estämisessä.",
        evidence: [
          "Verapamiilin käyttöriippuvainen salppaus on vakiintunut sydänfarmakologiassa (luokka IV antiarytminen). Sama ominaisuus tekee siitä teoreettisesti optimaalisen IFO-indusoidun nopean kanavasyklin estämiseen.",
          "Lundberg 1996 (Bioelectromagnetics): verapamiili esti EMF:n aiheuttaman kalsiumeffluksin luusoluissa — suora evidenssi siitä, että EMF-kalsiumreitti on farmakologisesti estettävissä.",
          "Verapamiilia käytetään myös lisääntymislääketieteessä siittiöiden valmisteluprotokollissa, joissa se voi parantaa motiliteettia moduloimalla kalsiumdynamiikkaa.",
        ],
        interpretation: "Verapamiilin käyttöriippuvainen kinetiikka ennustaa sen olevan tehokkain CCB EMF-vaikutuksia vastaan. Vertailututkimus verapamiili vs. amlodipiini vs. ei-CCB verenpainelääke siittiöiden laatupäätepisteillä olisi korkean erottelukyvyn testi.",
        level: "E|M",
      },
      {
        id: "LITHIUM",
        drug: "Litium",
        drugSub: "Mielialantasaaja, GSK-3β-inhibiittori, neuroprotektiivinen",
        mechanism: "Litium inhiboi GSK-3β:tä, joka fosforyloi CRY-proteiineja ja kohdistaa ne hajoamiseen. GSK-3β-inhibitio → CRY akkumuloituu → vahvempi sirkadiaaninen kello → parantunut melatoniinisignalointi. Litium vastustaa suoraan BERM:n reittiä C (CRY/RPM → melatoniinisuppressio).",
        evidence: [
          "Litium pidentää sirkadiaanista periodia kaikissa testatuissa organismeissa syanobakteereista ihmisiin (McCarthy 2019, Translational Psychiatry). Tämä välittyy GSK-3β:n CRY-degradaation inhibition kautta.",
          "Litium lisää melatoniinineritystä bipolaaripotilailla (Hallam 2005, J. Psychopharmacology). Tämä on vastakkainen suunta kuin EMF:n aiheuttama melatoniinisuppressio.",
          "Litium on neuroprotektiivinen useiden BERM-relevanttien mekanismien kautta: GSK-3β-inhibitio vähentää tau-fosforylaatiota, BDNF-upregulation tukee neuroplastisuutta ja anti-inflammatoriset vaikutukset vähentävät neuroinflammatiota.",
        ],
        interpretation: "Litium tarjoaa reitin C farmakologisen vasta-evidenssin. Jos CRY-välitteinen melatoniinisuppressio osallistuu EMF-bioeffekteihin, litiumin CRY-stabiloinnin pitäisi osittain suojata reitin C vaikutuksilta.",
        level: "M|C",
      },
      {
        id: "SEMAGLUTIDE",
        drug: "Semaglutidi / GLP-1-reseptoriagonistit",
        drugSub: "Ozempic, Wegovy, Mounjaro (tirtsepatidi)",
        mechanism: "GLP-1R-signalointi aktivoi L-tyypin VGCC:itä haiman β-soluissa insuliinin vapautumiseksi (Bhatt 2012). Jos EMF kroonisesti häiritsee L-tyypin VGCC → Ca²⁺ → ERK -reittiä, GLP-1-agonistit voivat osittain korjata tämän häiriön vahvistamalla samaa reittiä farmakologisesti kanavan alapuolelta.",
        evidence: [
          "Semaglutidin ennennäkemätön tehokkuus metabolisessa oireyhtymässä (15–20 % painonlasku, CV-riskin vähentyminen, NASH-parannus) kartoittuu useille BERM:n ennustamille metabolisen häiriön päätepisteille.",
          "Klimentidis-paradoksi (2011, Proc. R. Soc. B): 24 populaatiota 8 lajista on kaikki lihoneet 1970-luvulta (p = 1,2×10⁻⁷). Ruokavalio/liikunta ei selitä painonnousua kontrolloiduilla ruokavalioilla olevilla koe-eläimillä.",
          "GLP-1:tä ilmennetään aivoissa (NTS, hypotalamus) missä se moduloi ruokahalua, palkitsemista ja pahoinvointia kalsiumriippuvaisen signaloinnin kautta.",
        ],
        interpretation: "SPEKULATIIVINEN: jos EMF häiritsee L-tyypin VGCC → Ca²⁺ → ERK -reittiä, semaglutidin tehokkuus voi osittain selittyä farmakologisella kompensoinnilla ympäristöperäiselle kalsiumhäiriölle. Testattava ennuste: semaglutidin tehokkuuden pitäisi korreloida ympäröivän EMF-tason kanssa (METAB-3).",
        level: "L*",
      },
      {
        id: "GABAPENTINOID",
        drug: "Gabapentinoidit",
        drugSub: "Gabapentiini, pregabaliini (Lyrica)",
        mechanism: "Gabapentinoidit sitoutuvat jänniteriippuvaisten kalsiumkanavien α2δ-alayksikköön, vähentäen Ca²⁺-influksia presynaptisissa terminaaleissa. Tämä EI ole sama alayksikkö kuin CCB:iden kohteena oleva α1-huokosyksikkö.",
        evidence: [
          "Gabapentiinia ja pregabaliinia määrätään neuropaattiseen kipuun, epilepsiaan ja ahdistukseen — tiloihin jotka liittyvät neuronaaliseen kalsiumhypereksitabiliteettiin.",
          "Pregabaliinilla on tunnettu haittavaikutus: alentunut libido ja seksuaalinen toimintahäiriö (Calabrò 2015). Tämä on yhdenmukainen: gabapentinoidit suppressoivat KAIKKEA kalsiumriippuvaista signalointia, mukaan lukien normaalit reproduktiiviset hormonireitit.",
          "α2δ-alayksikköä ilmennetään runsaasti dorsaalisissa takajuuriganglioissa ja selkäytimessä. Sitä ilmennetään myös hypotalamuksessa, missä se voisi moduloida GnRH-pulsatiliteettia (BERM-taso 7).",
        ],
        interpretation: "Gabapentinoidit tarjoavat farmakologisen dissektion BERM:n kalsiummallista: ne moduloivat eri kalsiumkanavan alayksikköä kuin CCB:t, ennustaen osittain päällekkäisiä mutta erotettavia vaikutuksia.",
        level: "M",
      },
      {
        id: "NIMODIPINE-ETH",
        drug: "Nimodipiini (L-tyypin CCB, CNS-selektiivinen)",
        drugSub: "Dihydropyridiini BBB-penetraatiolla",
        mechanism: "Nimodipiini läpäisee veri-aivoesteen — toisin kuin useimmat muut dihydropyridiini-CCB:t — ja salppaa preferoiden L-tyypin VGCC:itä aivoverisuonistossa ja neuroneissa.",
        evidence: [
          "Nimodipiini on FDA-hyväksytty aivoverisuonispasmien ehkäisyyn subaraknoidaalivuodon jälkeen. Sen neuroprotektiivinen mekanismi (kalsiumvälitteinen) limittyy BERM:n ennustamien CNS-vaikutusten kanssa.",
          "Jatkuva kliininen kiinnostus nimodipiiniin Alzheimerin taudin ja vaskulaarisen dementian hoidossa viittaa siihen, että kalsiumkanavasäätelyn häiriö osallistuu neurodegeneraatioon.",
          "Nimodipiinin BBB-penetraatio tekee siitä ainoan CCB:n joka voisi teoreettisesti vaimentaa EMF-vaikutuksia sekä perifeerisissä (reproduktiiviset) että sentraalisissa (kognitiiviset, sirkadiaaniset) päätepisteissä samanaikaisesti.",
        ],
        interpretation: "Nimodipiini on informatiivisin yksittäinen CCB BERM:n laajennetulle mallille: sen CNS-selektiivisyys mahdollistaa sen hypoteesin testaamisen, että VGCC-aktivaatio osallistuu EMF-assosioituihin kognitiivisiin ja neurodegeneratiivisiin vaikutuksiin riippumatta perifeerisistä päätepisteistä.",
        level: "M|L",
      },
      {
        id: "MELATONIN",
        drug: "Eksogeeninen melatoniini",
        drugSub: "Reitin C päätepisteen täydennys",
        mechanism: "Melatoniinilisä korvaa suoraan hormonin, jonka BERM:n reitti C (CRY/RPM → melatoniinisuppressio) ennustaa vähenevän EMF-altistuksesta. Tämä on päätepisteen supplementointi, ei mekanismin salppaus.",
        evidence: [
          "Tbahriti ym. 2026 (Sleep Biol Rhythms, PRISMA-katsaus 55 tutkimuksesta): 88 % korkealaatuisista eläintutkimuksista raportoi EMF:n aiheuttaman melatoniinisuppression 20–50 % lähtötasosta.",
          "Melatoniini on voimakas antioksidantti joka neutraloi ROS:ia — vastatoimena oksidatiivisen stressin kaskadille (BERM-taso 5A) riippumatta sen hormonaalisesta funktiosta.",
          "Reiter ym. 2007, 2014: melatoniinin suojaavat vaikutukset RF-indusoidulta oksidatiiviselta vauriolta eläinmalleissa.",
        ],
        interpretation: "Melatoniini on helpoiten saatavilla oleva farmakologinen testi BERM:n reitille C. Jos yöllinen melatoniinilisä (1–3 mg) vaimentaa EMF-assosioitua unihäiriötä ja parantaa siittiöparametreja korkean EMF:n ympäristöissä, se tukee melatoniinisilta-hypoteesia.",
        level: "E|M",
      },
      {
        id: "COENZYME-Q10",
        drug: "Koentsyymi Q10 (CoQ10 / ubikinooni)",
        drugSub: "Mitokondriaalinen elektroninkuljettaja, endogeeninen antioksidantti",
        mechanism: "CoQ10 toimii mitokondrian sisäkalvolla elektroninsiirtoketjussa (kompleksi I→III). Se on myös rasvaliukoinen antioksidantti. BERM:n taso 5A (Ca²⁺ → mitokondriaalinen ROS) ennustaa, että antioksidanttikapasiteetti määrää nettopäivävaurion.",
        evidence: [
          "Bektas ym. 2026 (Bioelectromagnetics): 3,5 GHz RF (5G-taajuus) aiheutti kivesten ja oksidatiivista vauriota rotilla. CoQ10-supplementaatio lievitti vauriota. Ensimmäinen suora osoitus siitä, että antioksidanttilisä suojaa 5G-taajuuden reproduktiiviselta vauriolta.",
          "CoQ10-supplementaatio parantaa siittiöparametreja subfertileillä miehillä (Safarinejad 2012: parantunut motiliteetti ja konsentraatio).",
          "CoQ10-tasot laskevat iän myötä — seuraten samaa aikajanaa kuin testosteronin lasku ja nouseva oksidatiivinen stressi.",
        ],
        interpretation: "CoQ10 on BERM:n palautumisikkunan farmakologinen analogi: sen sijaan että vähennettäisiin altistusaikaa, se tehostaa korjausnopeutta. Bektas 2026 -tulos on vahvin yksittäisen tutkimuksen evidenssi farmakologisesta EMF-suojauksesta.",
        level: "E",
      },
    ],
    convergenceTitle: "Farmakologinen konvergenssiarumentti",
    convergenceLead: "Vahvin evidenssi mille tahansa biologiselle mekanismille on farmakologinen: jos ehdotetun transduuktiokanavan salppaus kumoaa vaikutuksen, mekanismi on vahvistettu. Kahdeksan lääkeryhmää konvergoivat BERM:n ennustamille reiteille:",
    convergencePoints: [
      "Reitti A (VGCC): CCB:t (23 salppajatutkimusta), verapamiili (taajuusriippuvainen salppaus), gabapentinoidit (α2δ-modulaatio), nimodipiini (CNS-selektiivinen salppaus)",
      "Reitti C (CRY/melatoniini): Litium (CRY-stabilointi GSK-3β:n kautta), eksogeeninen melatoniini (päätepisteen korvaus)",
      "ROS-kaskadi: CoQ10 (antioksidanttipelastus, Bektas 2026 5G-data), melatoniini (kaksois-antioksidantti + hormonaalinen)",
      "Metabolinen haara: Semaglutidi/GLP-1-agonistit (Ca²⁺-ERK-reitin vahvistus) — spekulatiivinen mutta testattava",
    ],
    convergenceConclusion: "Mikään muu ympäristöaltistushypoteesi ei ennusta, että juuri nämä lääkeryhmät olisivat relevantteja samoille biologisille päätepisteille. Farmakologinen konvergenssi — CCB:t, litium, melatoniini, CoQ10 ja gabapentinoidit vaikuttaen erillisiin mutta yhteydessä oleviin kohteisiin — muodostaa mallin kliinisesti vahvimman argumentin.",
    predictionLink: "Ks. Farmakologiset ennusteet (PHARM-1–PHARM-5)",
    predictionHref: "/predictions",
  },
} as const;

const LEVEL_COLORS: Record<string, { bg: string; text: string }> = {
  E: { bg: "bg-green-500/10", text: "text-green-600 dark:text-green-400" },
  "E|M": { bg: "bg-green-500/10", text: "text-green-600 dark:text-green-400" },
  M: { bg: "bg-blue-500/10", text: "text-blue-600 dark:text-blue-400" },
  "M|C": { bg: "bg-blue-500/10", text: "text-blue-600 dark:text-blue-400" },
  "M|L": { bg: "bg-purple-500/10", text: "text-purple-600 dark:text-purple-400" },
  C: { bg: "bg-teal-500/10", text: "text-teal-600 dark:text-teal-400" },
  L: { bg: "bg-amber-500/10", text: "text-amber-600 dark:text-amber-400" },
  "L*": { bg: "bg-amber-500/10", text: "text-amber-600 dark:text-amber-400" },
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const d = locale === "fi" ? COPY.fi : COPY.en;
  return { title: `${d.title} – Extinction Field`, description: d.subtitle };
}

export default async function PharmacologyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const d = locale === "fi" ? COPY.fi : COPY.en;
  const prefix = `/${locale}`;

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 sm:py-20">
      <p className="mb-6">
        <Link href={`${prefix}/evidence`} className="text-sm text-accent hover:underline">{d.backLink}</Link>
      </p>

      <PageHeader icon={Pill} title={d.title} subtitle={d.subtitle} />

      <section className="mt-12">
        <h2 className="text-lg font-semibold mb-2">{d.cardsTitle}</h2>
        <p className="text-sm text-foreground-muted leading-relaxed mb-8 max-w-3xl">{d.cardsLead}</p>

        <div className="space-y-6">
          {d.cards.map((card) => {
            const lc = LEVEL_COLORS[card.level] ?? LEVEL_COLORS.M;
            return (
              <div
                key={card.id}
                className={`rounded-xl border ${card.critical ? "border-green-500/40 bg-green-500/[0.03]" : "border-card-border bg-card-bg"} p-5 sm:p-6`}
              >
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div>
                    <h3 className="font-semibold text-sm">{card.drug}</h3>
                    <p className="text-xs text-foreground-muted mt-0.5">{card.drugSub}</p>
                  </div>
                  <span className={`shrink-0 px-2.5 py-0.5 rounded-full text-[10px] font-bold ${lc.bg} ${lc.text}`}>
                    {card.level}
                  </span>
                </div>

                <div className="mb-4">
                  <p className="text-xs font-medium text-foreground-muted uppercase tracking-wide mb-1">
                    {locale === "fi" ? "Mekanismi" : "Mechanism"}
                  </p>
                  <p className="text-sm leading-relaxed">{card.mechanism}</p>
                </div>

                <div className="mb-4">
                  <p className="text-xs font-medium text-foreground-muted uppercase tracking-wide mb-1">
                    {locale === "fi" ? "Evidenssi" : "Evidence"}
                  </p>
                  <ul className="space-y-2">
                    {card.evidence.map((e, i) => (
                      <li key={i} className="text-sm leading-relaxed text-foreground-muted pl-3 border-l-2 border-card-border">
                        {e}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <p className="text-xs font-medium text-foreground-muted uppercase tracking-wide mb-1">
                    {locale === "fi" ? "Mallitulkinta" : "Model interpretation"}
                  </p>
                  <p className="text-sm leading-relaxed italic text-foreground-muted">{card.interpretation}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-lg font-semibold mb-2">{d.convergenceTitle}</h2>
        <p className="text-sm text-foreground-muted leading-relaxed mb-4 max-w-3xl">{d.convergenceLead}</p>
        <ul className="space-y-2 mb-6">
          {d.convergencePoints.map((point, i) => (
            <li key={i} className="text-sm leading-relaxed pl-4 border-l-2 border-accent/30">{point}</li>
          ))}
        </ul>
        <p className="text-sm leading-relaxed font-medium max-w-3xl">{d.convergenceConclusion}</p>
        <p className="mt-4">
          <Link href={`${prefix}${d.predictionHref}`} className="text-sm text-accent hover:underline">
            {d.predictionLink} →
          </Link>
        </p>
      </section>
    </div>
  );
}
