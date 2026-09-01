import type { Metadata } from "next";
import Link from "next/link";
import { Brain } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { BermIcon } from "@/components/BermIcon";
import { BBBMechanismDiagram } from "@/components/BBBMechanismDiagram";
import { CitationLink } from "@/components/CitationLink";
import { StudyCitation } from "@/components/StudyCitation";
import { InlineReferenceText } from "@/components/InlineReferenceText";
import { pickCopy } from "@/lib/i18n";

const COPY = {
  en: {
    title: "Biological Barriers: BBB & BTB",
    subtitle: "Pathway F biological barrier multiplier — BBB and blood-testis barrier share the same tight junction mechanism",
    backLink: "← Back to Evidence",
    narrativeTitle: "BBB tight junction mechanism ([[ref:gao2024_bbb_conformational|Gao 2024]], [[ref:ulusoy2025_bbb_enos|Ulusoy 2025]])",
    narrativeParagraphs: [
      "[[ref:gao2024_bbb_conformational|Gao et al. (2024, Bioelectromagnetics, bem.22494)]] demonstrate that electromagnetic pulse (EMP) caused BBB disruption in rat brains via tight junction protein (occludin, claudin, ZO-1) degradation. [[ref:ulusoy2025_bbb_enos|Ulusoy et al. (2025, Int J Basic Med Sci)]] showed that 27.12 MHz RF-EMF opens the BBB via eNOS activation and occludin downregulation — without oxidative stress at 30 min, progressing to structural damage at 360 min. This confirms a non-thermal, progressive mechanism.",
      "BERM extends pathway F from BBB-only to a Biological Barrier Multiplier covering both BBB and BTB. The blood-testis barrier (BTB) uses the same tight junction proteins (occludin, ZO-1, claudins) as the BBB. [[ref:yu2019_btb|Yu et al. (2019, Sci Total Environ)]] demonstrated that long-term 4G exposure (2605 MHz) directly disrupts BTB integrity via the Spock3-MMP2 axis, producing time-dependent reproductive toxicity. BTB disruption has a MORE DIRECT reproductive effect because it compromises the immune-privileged spermatogenic microenvironment. The barrier multiplier operates as positive feedback: EMF opens barrier → protected tissue exposed → more damage → barrier weakens further.",
    ],
    narrativeStudies: [
      { citation: "Gao et al. (Bioelectromagnetics)", year: 2024, referenceId: "gao2024_bbb_conformational", note: "EMP → tight junction protein degradation → BBB opening. Mechanistic support for pathway F (EMP, not chronic RF)." },
      { citation: "Salford et al.", year: 2003, referenceId: "salford2003", note: "BBB opening at GSM frequencies (SAR 0.016 W/kg) — BERM's direct pathway F reference." },
      { citation: "Ulusoy et al. (Int J Basic Med Sci)", year: 2025, referenceId: "ulusoy2025_bbb_enos", note: "27.12 MHz RF → eNOS ↑ → occludin ↓ → BBB opening. Non-thermal at 30 min, structural at 360 min." },
      { citation: "Yu et al. (Sci Total Environ)", year: 2019, referenceId: "yu2019_btb", note: "4G (2605 MHz) → Spock3-MMP2-BTB axis → direct spermatogenic toxicity. Time-dependent, progressive." },
    ],
    btbBoundary: "BTB data is from a single research group ([[ref:yu2019_btb|Yu et al. 2019]]). The finding is mechanistically strong and time-dependent, but independent replication from another group is pending.",
    seeAlso: "See also",
    evidencePortal: "Evidence register",
    thCitation: "Citation",
    thYear: "Year",
    thNote: "Note",
    thFinding: "Finding",
    thPathway: "Pathway",
    thEvidence: "Evidence",
    thFrequency: "Frequency",
    pathwayFHeading: "Pathway F: Biological Barriers — The EMF Multiplier",
    threeParallelHeading: "Three parallel BBB-opening mechanisms",
    arendashParadoxHeading: "The Arendash Paradox: BBB opening is bidirectional",
    hospitalBBBHeading: "Hospital-BBB iatrogenic hypothesis",
    alzheimerHeading: "Alzheimer's and the Calcium Upstream",
    hospitalEMFHeading: "The Hospital EMF Hypothesis",
    pathwayFIntroPara: "EMF opens the blood-brain barrier (BBB) via three parallel mechanisms. Aging degrades the SAME tight junction proteins — the combined effect is synergistic, not additive. The hospital environment combines the highest EMF exposure, the most elderly patients, and circulating drugs: the result is unplanned brain dose escalation.",
    pathwayFGaoPara: "[[ref:gao2024_bbb_conformational|Gao et al. (2024, Bioelectromagnetics)]] demonstrated a critical finding: electromagnetic pulse opened tight junctions PHYSICALLY (visible gap in TEM images) even though TJ protein LEVELS (ZO-1, claudin-5, occludin) did not change on western blot. The proteins are present but their 3D conformation has changed — they no longer seal the junction. This explains why studies measuring only protein expression (de Gannes, Franke) do not find BBB effects.",
    pathwayFIOPPara: "[[ref:iop2026_bbb_scoping_review|The IOP Science scoping review (2026, Physics in Medicine and Biology)]] confirms: evidence is contradictory but positive results have been replicated in multiple independent laboratories (Salford/Lund, Tang/China, Ulusoy/Iran, Gao/China). Negative results (Finnie, Franke, de Gannes, Kuribayashi) are partly explained by measurement method differences (western blot vs. TEM vs. albumin leakage), anesthesia type, and exposure modulation.",
    pathwayFUlusoyPara: "[[ref:ulusoy2025_bbb_enos|Ulusoy et al. (2025, Iranian J Basic Medical Sciences)]] propose RF-EMF as a THERAPEUTIC TOOL for opening the BBB to deliver drugs to the brain: 27.12 MHz → eNOS → NO → occludin ↓ → TJ open. This is a new variant of the therapeutic device paradox: researchers exploit EMF's biological activity while ICNIRP denies its existence.",
    miRNACell: "miRNA change → long-term TJ dysregulation",
    arendashPara1: "[[ref:arendash2010_temt_alzheimer|Arendash et al. (2010–2019)]] demonstrated that 918 MHz EMF treatment (2h/day) PROTECTS Alzheimer's mice and even reverses cognitive decline — by disaggregating Aβ oligomers and enhancing mitochondria. A clinical pilot (8 patients, TEMT 2 months) showed cognitive improvement. This does NOT refute BBB-opening findings — it confirms them: BBB opening is a biological process whose net effect depends on context.",
    arendashPara2: "Clean blood + BBB open = Aβ clearance (beneficial). Toxins in blood + BBB open = neurotoxicity (harmful). [[ref:arendash2010_temt_alzheimer|Arendash's]] clean laboratory mice benefited. In the real world, an elderly person's blood contains phthalates, heavy metals, drug residues, and microplastics.",
    hospitalBBBPara: "Drug dosing assumes normal BBB. In elderly hospital patients, BBB is compromised for TWO reasons: aging (occludin ↓, ZO-1 ↓) AND hospital EMF (conformational change + eNOS pathway). Effective brain dose is higher than pharmacokinetic models predict. This may explain part of hospital-acquired delirium (incidence 15–53% surgical, up to 80% ICU).",
    findingGaoConformation: "EMP opens TJs via conformational change — protein expression unchanged",
    findingIOPScoping: "Scoping review: BBB evidence contradictory but positive in multiple independent labs",
    findingUlusoyTherapeutic: "RF-EMF BBB modulation proposed as therapeutic tool; eNOS→NO→occludin↓",
    findingArendashTEMT: "918 MHz TEMT: Aβ disaggregation, cognitive improvement in AD mice and pilot patients",
    findingAgingBBB: "Aged mice BBB: occludin ↓, ZO-1 ↓, TNF-α ↑, permeability ↑",
    findingTangMemory: "900 MHz 3h/day 28d → spatial memory impairment + BBB permeability ↑",
    findingDasdagMiRNA: "2.4 GHz Wi-Fi → brain miRNA expression changes below safety limits",
    findingLeszczynskiHsp27: "900 MHz → hsp27/p38MAPK stress response in endothelial cells → BBB permeability ↑",
    epistemicBBB: "Epistemic level: BBB opening conformational mechanism [E] ([[ref:gao2024_bbb_conformational|Gao 2024]], TEM). BBB evidence overall [M/C] ([[ref:iop2026_bbb_scoping_review|IOP 2026 scoping review]]). Aging synergy [C] (same proteins, untested combination). [[ref:arendash2010_temt_alzheimer|Arendash]] bidirectionality [E] (clinical pilot). Hospital-iatrogenic [C] (hypothesis, P27–P28).",
    alzheimerIntroPara: "The calcium hypothesis of Alzheimer's research (LaFerla, O'Day, Bhatt) states that intracellular calcium dysregulation is an EARLY event that PRECEDES amyloid accumulation. Anti-amyloid drugs remove plaques but do not improve cognition — plaques are a symptom, not the cause. But the calcium hypothesis does not explain WHAT causes Ca²⁺ dysregulation. BERM's VGCC mechanism ([[ref:pall2013_v2|Pall 2013]]) provides the missing upstream cause: EMF → VGCC → Ca²⁺ ↑.",
    alzheimerBhattPara: "Critical finding ([[ref:pmc3065491_bhatt_ca_oligomers|Bhatt et al., PMC3065491]]): in the presence of Ca²⁺, Aβ(1-40) preferentially forms TOXIC OLIGOMERS, whereas in the absence of Ca²⁺ it aggregates into HARMLESS FIBRILS. Calcium level does not just increase amyloid production — it determines whether amyloid is dangerous or not. This explains why removing plaques doesn't help: oligomers (not plaques) are the toxic form, and their formation is directed by Ca²⁺.",
    alzheimerPresenilinPara: "Presenilin convergence: PSEN1/PSEN2 mutations (familial AD, ~5% of cases) cause Ca²⁺ dysregulation GENETICALLY. EMF causes the same Ca²⁺ dysregulation ENVIRONMENTALLY via the VGCC pathway. Same logic as CACNA1C × EHS: gene and environment converge on the same calcium pathway. CACNA1C rs7304986, which modulates EMF sleep effects ([[ref:sousouri2025|Sousouri 2025]]), may also modulate cumulative AD risk.",
    alzheimerFeedbackPara: "Positive feedback loop: Aβ oligomers form NEW calcium pores in the cell membrane → more Ca²⁺ influx → more Aβ production → accelerating cycle. Initially, EMF's Ca²⁺ effect is reversible and compensable. But once oligomer-formed Ca²⁺ pores activate, the process becomes EMF-INDEPENDENT. This 'point of no return' explains why AD accelerates.",
    alzheimerArendashPara: "Arendash paradox: controlled EMF (918 MHz, 2h/day) PROTECTS against AD in mouse models and clinical pilot trials ([[ref:arendash2010_temt_alzheimer|MemorEM/TEMT]]). This does NOT refute BERM — it CONFIRMS biological activity. Dose, frequency, and context determine outcome: clean lab exposure opens BBB → Aβ clearance; chronic environmental multi-frequency EMF → uncontrolled Ca²⁺ disruption.",
    findingCaProximal: "Ca²⁺ dysregulation is a PROXIMAL CAUSE of AD dysfunction",
    findingCaOligomers: "Ca²⁺ directs Aβ → toxic oligomers (not fibrils)",
    findingCaEarly: "Ca²⁺ dysregulation is an EARLY event, precedes neurodegeneration",
    findingCaHomeostasis: "Ca²⁺ homeostasis and neuronal excitability key in Aβ neurotoxicity",
    findingPresenilinMutations: "Presenilin mutations → Ca²⁺ dysregulation (genetic convergence)",
    findingAntiAmyloidFailed: "Anti-amyloid drugs FAILED → need alternative mechanisms",
    epistemicAlzheimer: "Epistemic level: Ca²⁺ dysregulation in AD [E] ([[ref:pmc4909906_calcium_ad|PMC4909906]]/[[ref:pmc7179355_oday_calcium|PMC7179355]]). Ca²⁺ → oligomers [E] ([[ref:pmc3065491_bhatt_ca_oligomers|Bhatt PMC3065491]]). EMF → VGCC → Ca²⁺ [E] ([[ref:pall2013_v2|Pall 2013]]). EMF → AD causation [C] (hypothesis). [[ref:arendash2010_temt_alzheimer|Arendash paradox]] [E] (clinical pilot). The calcium hypothesis is not consensus — it is one of several competing hypotheses.",
    hospitalEMFIntroPara: "'Post-hospital syndrome' ([[ref:krumholz2013_phs|Krumholz, NEJM 2013]]) is a real phenomenon: after hospital discharge, patient risk rises for ALL diagnoses, not just the original one. Within 30 days of discharge, patients face elevated risk of myocardial infarction, pneumonia, falls, and delirium — regardless of admission diagnosis. Conventional explanations (sleep deprivation, bed rest, stress, medications) do not include EMF.",
    hospitalEMFBermPara: "BERM hypothesis: elderly patients move from a low-EMF home environment to the highest-EMF environment. Hospital EMF sources include: 24/7 LED lighting (IF-EMF), Wi-Fi access points (RF), patient monitors (IF+ELF), electric beds (ELF), and numerous medical devices. ICU environments have measured up to 40 µT magnetic fields near equipment ([[ref:pubmed10447544_icu_emf|PubMed 10447544]]). Elderly patients spend 95% of time in bed — they cannot move away from the exposure.",
    hospitalEMFModulomePara: "From the modulome perspective, hospital EMF activates ALL cascade pathways simultaneously: LED 24/7 → IF → sleep disruption + melatonin↓; Wi-Fi → RF → CRY disruption; monitors → IF+ELF → cardiac rhythm disruption (HRV↓); electric bed → ELF → 24/7 body contact. 'Generalized vulnerability' = simultaneous modulome activation in already-compromised ion channel homeostasis.",
    hospitalEMFHADPara: "[[ref:had2024_meta|Hospital-acquired disability (HAD) meta-analysis (Age and Ageing 2024)]]: 61× higher ADL disability risk in hospital, 68% discharge below baseline. These numbers are too large to explain by bed rest and stress alone. EMF is not the sole cause — it is ONE untested additional factor in a multifactorial model.",
    findingKrumholzPHS: "Post-hospital syndrome: risk for all diagnoses within 30 days of discharge",
    findingICUPollution: "ICU EMF 40 µT near equipment; 'ICU is at risk from electromagnetic pollution'",
    findingHospitalRF: "Hospital RF-EMF: modern measurements across all channels",
    findingHADMeta: "HAD: 61× ADL disability risk, 68% discharge below baseline",
    epistemicHospital: "Epistemic level: Post-hospital syndrome [E] ([[ref:krumholz2013_phs|Krumholz NEJM]]). ICU EMF [E] ([[ref:pubmed10447544_icu_emf|PubMed 10447544]]). EMF → PHS causation [C] (hypothesis, untested). Note: ICU study from 1999 — modern equipment may differ.",
    brainModulomeLink: "Brain — modulome",
  },
  fi: {
    title: "Biologiset esteet: BBB ja BTB",
    subtitle: "Polku F:n biologinen estemultiplikeri — BBB ja veri-kiveseste jakavat saman tight junction -mekanismin",
    backLink: "← Takaisin näyttöön",
    narrativeTitle: "BBB:n tight junction -mekanismi ([[ref:gao2024_bbb_conformational|Gao 2024]], [[ref:ulusoy2025_bbb_enos|Ulusoy 2025]])",
    narrativeParagraphs: [
      "[[ref:gao2024_bbb_conformational|Gao ym. (2024, Bioelectromagnetics, bem.22494)]] osoittavat, että sähkömagneettinen pulssi (EMP) aiheutti veri-aivoesteen häiriön rottien aivoissa tight junction -proteiinien (okkludiini, klaudiini, ZO-1) degradaation kautta. [[ref:ulusoy2025_bbb_enos|Ulusoy ym. (2025, Int J Basic Med Sci)]] osoittivat, että 27,12 MHz RF-EMF avaa BBB:n eNOS-aktivaation ja okkludiinin alaregulaation kautta — ilman oksidatiivista stressiä 30 minuutissa, edeten rakenteelliseen vaurioon 360 minuutissa.",
      "BERM laajentaa polun F pelkästä BBB:stä biologiseksi estemultiplieriksi, joka kattaa sekä BBB:n että BTB:n. Veri-kiveseste (BTB) käyttää samoja tight junction -proteiineja (okkludiini, ZO-1, klaudiinit) kuin BBB. [[ref:yu2019_btb|Yu ym. (2019, Sci Total Environ)]] osoittivat, että pitkäaikainen 4G-altistus (2605 MHz) häiritsee BTB:n eheyttä suoraan Spock3-MMP2-akselin kautta, tuottaen aikariippuvaisen lisääntymistoksisuuden. BTB:n häiriöllä on SUOREMPI lisääntymisvaikutus, koska se vaarantaa immuuniprivilegoidun spermatogeneettisen mikroympäristön. Estemultiplieri toimii positiivisena takaisinkytkentänä: EMF avaa esteen → suojattu kudos altistuu → enemmän vauriota → este heikkenee edelleen.",
    ],
    narrativeStudies: [
      { citation: "Gao ym. (Bioelectromagnetics)", year: 2024, referenceId: "gao2024_bbb_conformational", note: "EMP → tight junction -proteiinien degradaatio → BBB-avautuminen. Mekanistinen tuki polulle F (EMP, ei krooninen RF)." },
      { citation: "Salford ym.", year: 2003, referenceId: "salford2003", note: "BBB-avautuminen GSM-taajuuksilla (SAR 0,016 W/kg) — BERM:n suora polun F viite." },
      { citation: "Ulusoy ym. (Int J Basic Med Sci)", year: 2025, referenceId: "ulusoy2025_bbb_enos", note: "27,12 MHz RF → eNOS ↑ → okkludiini ↓ → BBB-avautuminen. Ei-terminen 30 min, rakenteellinen 360 min." },
      { citation: "Yu ym. (Sci Total Environ)", year: 2019, referenceId: "yu2019_btb", note: "4G (2605 MHz) → Spock3-MMP2-BTB-akseli → suora spermatogeneettinen toksisuus. Aikariippuvainen, etenevä." },
    ],
    btbBoundary: "BTB-data on yhdeltä tutkimusryhmältä ([[ref:yu2019_btb|Yu ym. 2019]]). Löydös on mekanistisesti vahva ja aikariippuvainen, mutta itsenäinen replikaatio toisesta ryhmästä puuttuu.",
    seeAlso: "Katso myös",
    evidencePortal: "Näyttörekisteri",
    thCitation: "Viite",
    thYear: "Vuosi",
    thNote: "Huomio",
    thFinding: "Löydös",
    thPathway: "Reitti",
    thEvidence: "Näyttö",
    thFrequency: "Taajuus",
    pathwayFHeading: "Polku F: Biologiset esteet — EMF-multiplikeri",
    threeParallelHeading: "Kolme rinnakkaista BBB-avausmekanismia",
    arendashParadoxHeading: "Arendash-paradoksi: BBB-avaus on kaksisuuntainen",
    hospitalBBBHeading: "Sairaala-BBB iatrogeeninen hypoteesi",
    alzheimerHeading: "Alzheimer ja kalsiumin ylävirta",
    hospitalEMFHeading: "Sairaala-EMF-hypoteesi",
    pathwayFIntroPara: "EMF avaa veri-aivoesteen (BBB) kolmella rinnakkaisella mekanismilla. Ikääntyminen heikentää SAMOJA tight junction -proteiineja — yhdistelmävaikutus on synergistinen, ei additiivinen. Sairaalaympäristö yhdistää korkeimman EMF-altistuksen, ikääntyneimmät potilaat ja lääkeaineet veressä: tulos on suunnittelematon aivoannoksen kasvu.",
    pathwayFGaoPara: "[[ref:gao2024_bbb_conformational|Gao ym. (2024, Bioelectromagnetics)]] osoittivat kriittisen löydöksen: sähkömagneettinen pulssi avasi tight junctionit FYYSISESTI (TEM-kuvissa näkyvä aukko) vaikka TJ-proteiinien (ZO-1, klaudiini-5, okkludiini) TASOT eivät muuttuneet western blotissa. Proteiinit ovat paikalla, mutta niiden 3D-konformaatio on muuttunut — ne eivät enää tiivistä liitosta. Tämä selittää, miksi tutkimukset, jotka mittaavat vain proteiiniespressiota (de Gannes, Franke) eivät löydä BBB-vaikutuksia.",
    pathwayFIOPPara: "[[ref:iop2026_bbb_scoping_review|IOP Science scoping review (2026, Physics in Medicine and Biology)]] vahvistaa: näyttö on ristiriitaista mutta positiiviset tulokset on toistettu useissa itsenäisissä laboratorioissa (Salford/Lund, Tang/Kiina, Ulusoy/Iran, Gao/Kiina). Negatiiviset tulokset (Finnie, Franke, de Gannes, Kuribayashi) selittyvät osittain mittausmenetelmäerolla (western blot vs. TEM vs. albumiinivuoto), anestesiatyypillä ja altistuksen modulaatiolla.",
    pathwayFUlusoyPara: "[[ref:ulusoy2025_bbb_enos|Ulusoy ym. (2025, Iranian J Basic Medical Sciences)]] ehdottavat RF-EMF:ää TERAPEUTTISEKSI TYÖKALUKSI BBB:n avaamiseen lääkeaineiden toimittamiseksi aivoihin: 27.12 MHz → eNOS → NO → okkludiini ↓ → TJ auki. Tämä on terapeuttisten laitteiden paradoksin uusi variantti: tutkijat hyödyntävät EMF:n biologista aktiivisuutta samalla kun ICNIRP kieltää sen olemassaolon.",
    miRNACell: "miRNA-muutos → pitkäaikainen TJ-dysregulaatio",
    arendashPara1: "[[ref:arendash2010_temt_alzheimer|Arendash ym. (2010–2019)]] osoittivat, että 918 MHz EMF-hoito (2h/vrk) SUOJAA Alzheimerin hiiriä ja jopa kääntää kognitiivisen heikkenemisen — hajottamalla Aβ-oligomeerit ja tehostamalla mitokondrioita. Kliininen pilottikoe (8 potilasta, TEMT 2kk) osoitti kognitiivista paranemista. Tämä EI kumoa BBB-avauslöydöksiä — se vahvistaa niitä: BBB:n avautuminen on biologinen prosessi jonka nettovaikutus riippuu kontekstista.",
    arendashPara2: "Puhdas veri + BBB auki = Aβ-puhdistus (hyödyllinen). Toksiineja veressä + BBB auki = neurotoksisuus (haitallinen). [[ref:arendash2010_temt_alzheimer|Arendash-laboratorion]] puhtailla hiirillä vaikutus oli hyödyllinen. Todellisessa maailmassa vanhuksen veressä on ftalaatteja, raskasmetalleja, lääkejäämiä ja mikromuoveja.",
    hospitalBBBPara: "Lääkkeiden annostelussa oletetaan normaali BBB. Vanhusten sairaalapotilailla BBB on heikentynyt KAHDESTA syystä: ikääntyminen (okkludiini ↓, ZO-1 ↓) JA sairaalan EMF (konformaatiomuutos + eNOS-reitti). Efektiivinen aivoannos on suurempi kuin farmakokineettinen malli ennustaa. Tämä voi selittää osan sairaalahoitojakson aikaisesta deliriumista (esiintyvyys 15–53 % kirurgisilla, jopa 80 % tehohoidossa).",
    findingGaoConformation: "EMP avaa TJ:t konformaatiomuutoksella — proteiiniekspressio muuttumaton",
    findingIOPScoping: "Scoping review: BBB-näyttö ristiriitaista mutta positiivinen useissa itsenäisissä laboissa",
    findingUlusoyTherapeutic: "RF-EMF BBB-modulaatio ehdotettu terapeuttiseksi työkaluksi; eNOS→NO→okkludiini↓",
    findingArendashTEMT: "918 MHz TEMT: Aβ-disaggregaatio, kognitiivinen paraneminen AD-hiirissä ja pilottipotilaissa",
    findingAgingBBB: "Ikääntyneiden hiirten BBB: okkludiini ↓, ZO-1 ↓, TNF-α ↑, permeabiliteetti ↑",
    findingTangMemory: "900 MHz 3h/vrk 28vrk → spatiaalisen muistin heikkeneminen + BBB-permeabiliteetti ↑",
    findingDasdagMiRNA: "2.4 GHz Wi-Fi → aivojen miRNA-ekspression muutokset alle turvarajan",
    findingLeszczynskiHsp27: "900 MHz → hsp27/p38MAPK-stressivaste endoteelisoluissa → BBB-permeabiliteetti ↑",
    epistemicBBB: "Episteeminen taso: BBB-avaus konformaatiomekanismi [E] ([[ref:gao2024_bbb_conformational|Gao 2024]], TEM). BBB-näyttö kokonaisuutena [M/C] ([[ref:iop2026_bbb_scoping_review|IOP 2026 scoping review]]). Ikääntymis-synergia [C] (samat proteiinit, testaamaton yhdistelmä). [[ref:arendash2010_temt_alzheimer|Arendash]] kaksisuuntaisuus [E] (kliininen pilotti). Sairaala-iatrogeeninen [C] (hypoteesi, P27–P28).",
    alzheimerIntroPara: "Alzheimer-tutkimuksen kalsiumhypoteesi (LaFerla, O'Day, Bhatt) toteaa, että solunsisäisen kalsiumin dysregulaatio on VARHAINEN tapahtuma joka EDELTÄÄ amyloidin kertymistä. Anti-amyloidilääkkeet poistavat plakit mutta eivät paranna kognitiota — plakit ovat oire, eivät syy. Mutta kalsiumhypoteesi ei selitä MIKÄ aiheuttaa Ca²⁺-dysregulaation. BERM:n VGCC-mekanismi ([[ref:pall2013_v2|Pall 2013]]) tarjoaa puuttuvan ylävirran syyn: EMF → VGCC → Ca²⁺ ↑.",
    alzheimerBhattPara: "Kriittinen löydös ([[ref:pmc3065491_bhatt_ca_oligomers|Bhatt ym., PMC3065491]]): Ca²⁺:n läsnäollessa Aβ(1-40) muodostaa ensisijaisesti TOKSISIA OLIGOMEEREJA, kun taas ilman Ca²⁺:a se aggregoituu HARMITTOMIKSI FIBRILLEIKSI. Kalsiumtaso ei vain lisää amyloidin tuotantoa — se ratkaisee, onko amyloidi vaarallista vai ei. Tämä selittää, miksi plakkien poistaminen ei auta: oligomeerit (ei plakit) ovat toksinen muoto, ja niiden muodostumista ohjaa Ca²⁺.",
    alzheimerPresenilinPara: "Preseniini-yhdentyminen: PSEN1/PSEN2-mutaatiot (perinnöllinen AD, ~5% tapauksista) aiheuttavat Ca²⁺-dysregulaation GENEETTISESTI. EMF aiheuttaa saman Ca²⁺-dysregulaation YMPÄRISTÖLLISESTI VGCC-reitin kautta. Sama logiikka kuin CACNA1C × EHS: geeni ja ympäristö yhtyvät samaan kalsiumpolkuun. CACNA1C rs7304986, joka säätelee EMF:n uni-vaikutusta ([[ref:sousouri2025|Sousouri 2025]]), voi myös säädellä kumulatiivista AD-riskiä.",
    alzheimerFeedbackPara: "Positiivinen palautesilmukka: Aβ-oligomeerit muodostavat UUSIA kalsiumhuokosia solukalvoon → lisää Ca²⁺-sisäänvirtausta → lisää Aβ-tuotantoa → kiihtyvä kierre. Alkuvaiheessa EMF:n Ca²⁺-vaikutus on palautuva ja kompensoitavissa. Mutta kun oligomeerien omat Ca²⁺-huokoset aktivoituvat, prosessi tulee EMF:stä RIIPPUMATTOMAKSI. Tämä 'point of no return' selittää, miksi AD kiihtyy.",
    alzheimerArendashPara: "Arendash-paradoksi: kontrolloitu EMF (918 MHz, 2h/vrk) SUOJAA AD:ltä hiirimalleissa ja kliinisissä pilottikokeissa ([[ref:arendash2010_temt_alzheimer|MemorEM/TEMT]]). Tämä EI kumoa BERM:ää — se VAHVISTAA biologisen aktiivisuuden. Annos, taajuus ja konteksti ratkaisevat: puhdas laboratorioaltistus avaa BBB:n → Aβ-puhdistus; krooninen ympäristö-EMF usean taajuuden sekoituksena → hallitsematon Ca²⁺-häiriö.",
    findingCaProximal: "Ca²⁺-dysregulaatio on AD:n PROKSIMAALINEN SYY",
    findingCaOligomers: "Ca²⁺ ohjaa Aβ → toksiset oligomeerit (ei fibrillit)",
    findingCaEarly: "Ca²⁺-dysregulaatio on VARHAINEN tapahtuma, edeltää neurodegeneraatiota",
    findingCaHomeostasis: "Ca²⁺-homeostaasi ja neuronaalinen eksitabiliteetti keskeisiä Aβ-neurotoksisuudessa",
    findingPresenilinMutations: "Preseniini-mutaatiot → Ca²⁺-dysregulaatio (geneettinen yhdentyminen)",
    findingAntiAmyloidFailed: "Anti-amyloidilääkkeet EPÄONNISTUNEET → tarvitaan vaihtoehtoisia mekanismeja",
    epistemicAlzheimer: "Episteeminen taso: Ca²⁺-dysregulaatio AD:ssä [E] ([[ref:pmc4909906_calcium_ad|PMC4909906]]/[[ref:pmc7179355_oday_calcium|PMC7179355]]). Ca²⁺ → oligomeerit [E] ([[ref:pmc3065491_bhatt_ca_oligomers|Bhatt PMC3065491]]). EMF → VGCC → Ca²⁺ [E] ([[ref:pall2013_v2|Pall 2013]]). EMF → AD-kausaatio [C] (hypoteesi). [[ref:arendash2010_temt_alzheimer|Arendash-paradoksi]] [E] (kliininen pilotti). Kalsiumhypoteesi ei ole konsensus — se on yksi kilpailevista hypoteeseista.",
    hospitalEMFIntroPara: "'Post-hospital syndrome' ([[ref:krumholz2013_phs|Krumholz, NEJM 2013]]) on todellinen ilmiö: sairaalahoidon jälkeen potilaiden riski kasvaa KAIKILLE diagnooseille, ei vain alkuperäiselle. 30 päivän sisällä kotiutumisesta potilaat ovat kohonneessa riskissä sydäninfarkteille, pneumonialle, kaatumisille ja deliriumille — riippumatta tulosyystä. Konventionaaliset selitykset (unenpuute, vuodelepo, stressi, lääkkeet) eivät sisällä EMF:ää.",
    hospitalEMFBermPara: "BERM-hypoteesi: vanhukset siirtyvät matalan EMF:n kotiympäristöstä korkeimman EMF:n ympäristöön. Sairaalan EMF-lähteitä ovat: 24/7 LED-valaistus (IF-EMF), Wi-Fi-tukiasemat (RF), potilasmonitorit (IF+ELF), sähkösängyt (ELF), ja lukuisat lääkintälaitteet. ICU-ympäristössä on mitattu jopa 40 µT magneettikenttiä laitteiden lähellä ([[ref:pubmed10447544_icu_emf|PubMed 10447544]]). Vanhukset ovat 95% ajasta sängyssä — heillä ei ole mahdollisuutta siirtyä pois altistuksesta.",
    hospitalEMFModulomePara: "Modulooman näkökulmasta sairaala-EMF aktivoi KAIKKI kaskadipoluot samanaikaisesti: LED 24/7 → IF → unihäiriö + melatoniini↓; Wi-Fi → RF → CRY-häiriö; monitorit → IF+ELF → sydämen rytmihäiriö (HRV↓); sähkösänky → ELF → 24/7 kehokontakti. 'Yleistynyt riski' = modulooman simultaaninen aktivaatio jo heikentyneessä ionikanavahomeostaasissa.",
    hospitalEMFHADPara: "[[ref:had2024_meta|Hospital-acquired disability (HAD) meta-analyysi (Age and Ageing 2024)]]: 61× suurempi ADL-vammautumisriski sairaalassa, 68% kotiutuu alle lähtötason. Nämä luvut ovat liian suuria selittää pelkästään vuodelevolla ja stressillä. EMF ei ole ainoa syy — se on YKSI testaamaton lisätekijä monitekijäisessä mallissa.",
    findingKrumholzPHS: "Post-hospital syndrome: riski kaikille diagnooseille 30 pv kotiutumisen jälkeen",
    findingICUPollution: "ICU EMF 40 µT laitteiden lähellä; 'ICU is at risk from electromagnetic pollution'",
    findingHospitalRF: "Sairaalan RF-EMF: nykyaikaiset mittaukset kaikilla kanavilla",
    findingHADMeta: "HAD: 61× ADL-vammautumisriski, 68% kotiutuu alle lähtötason",
    epistemicHospital: "Episteeminen taso: Post-hospital syndrome [E] ([[ref:krumholz2013_phs|Krumholz NEJM]]). ICU EMF [E] ([[ref:pubmed10447544_icu_emf|PubMed 10447544]]). EMF → PHS-kausaatio [C] (hypoteesi, ei testattu). Huomio: ICU-tutkimus vuodelta 1999 — nykyaikaiset laitteet voivat olla erilaisia.",
    brainModulomeLink: "Aivot — moduloomi",
  },
  ja: {
    title: "生物学的バリア：BBBとBTB",
    subtitle: "経路F 生物学的バリア乗数 — BBBと血液精巣関門は同じタイトジャンクションメカニズムを共有する",
    backLink: "← エビデンスに戻る",
    narrativeTitle: "BBBタイトジャンクションメカニズム（[[ref:gao2024_bbb_conformational|Gao 2024]]、[[ref:ulusoy2025_bbb_enos|Ulusoy 2025]]）",
    narrativeParagraphs: [
      "[[ref:gao2024_bbb_conformational|Gaoら（2024、Bioelectromagnetics、bem.22494）]]は、電磁パルス（EMP）がタイトジャンクションタンパク質（オクルディン、クローディン、ZO-1）の分解を介してラット脳のBBBを破綻させることを示した。[[ref:ulusoy2025_bbb_enos|Ulusoyら（2025、Int J Basic Med Sci）]]は、27.12 MHz RF-EMFがeNOS活性化とオクルディン低下を介してBBBを開き、30分では酸化ストレスなし、360分では構造損傷へ進むことを示した。これは非熱的で進行性の機構を確認する。",
      "BERMは経路FをBBBだけでなくBTBも含む生物学的バリア乗数へ拡張する。血液精巣関門（BTB）はBBBと同じタイトジャンクションタンパク質（オクルディン、ZO-1、クローディン）を使う。[[ref:yu2019_btb|Yuら（2019、Sci Total Environ）]]は、長期4G曝露（2605 MHz）がSpock3-MMP2軸を介してBTB完全性を直接破壊し、時間依存的な生殖毒性を生むことを示した。BTB破綻は免疫特権的な精子形成微小環境を損なうため、より直接的な生殖影響を持つ。バリア乗数はEMFがバリアを開く → 保護組織が曝露される → 損傷増加 → バリアがさらに弱るという正のフィードバックで働く。",
    ],
    narrativeStudies: [
      { citation: "Gao ら（Bioelectromagnetics）", year: 2024, referenceId: "gao2024_bbb_conformational", note: "EMP → タイトジャンクションタンパク質分解 → BBB開口。経路Fへの機構的支持（EMPであり慢性RFではない）。" },
      { citation: "Salford ら", year: 2003, referenceId: "salford2003", note: "GSM周波数でのBBB開口（SAR 0.016 W/kg） — BERMの直接的な経路F参照。" },
      { citation: "Ulusoy ら（Int J Basic Med Sci）", year: 2025, referenceId: "ulusoy2025_bbb_enos", note: "27.12 MHz RF → eNOS ↑ → オクルディン ↓ → BBB開口。30分で非熱的、360分で構造的。" },
      { citation: "Yu ら（Sci Total Environ）", year: 2019, referenceId: "yu2019_btb", note: "4G（2605 MHz）→ Spock3-MMP2-BTB軸 → 直接的な精子形成毒性。時間依存的、進行性。" },
    ],
    btbBoundary: "BTBデータは単一の研究グループ（[[ref:yu2019_btb|Yuら 2019]]）による。所見は機構的に強く時間依存的だが、別グループによる独立再現は未了である。",
    seeAlso: "関連項目",
    evidencePortal: "エビデンスレジスター",
    thCitation: "引用",
    thYear: "年",
    thNote: "注記",
    thFinding: "所見",
    thPathway: "経路",
    thEvidence: "エビデンス",
    thFrequency: "周波数",
    pathwayFHeading: "経路F：生物学的バリア — EMF乗数効果",
    threeParallelHeading: "3つの並行するBBB開口メカニズム",
    arendashParadoxHeading: "Arendashパラドックス：BBB開口は双方向性",
    hospitalBBBHeading: "病院BBB医原性仮説",
    alzheimerHeading: "アルツハイマー病とカルシウム上流経路",
    hospitalEMFHeading: "病院EMF仮説",
    pathwayFIntroPara: "EMFは3つの並行するメカニズムを介して血液脳関門（BBB）を開口させる。加齢は同じタイトジャンクションタンパク質を劣化させ、複合効果は相加的ではなく相乗的である。病院環境は最高のEMF曝露、最も高齢の患者、循環する薬剤を組み合わせ、結果として計画外の脳内薬物用量増加をもたらす。",
    pathwayFGaoPara: "[[ref:gao2024_bbb_conformational|Gaoら（2024、Bioelectromagnetics）]]は決定的な所見を示した。電磁パルスは、TJタンパク質（ZO-1、クローディン5、オクルディン）の量がウエスタンブロットで変化しないにもかかわらず、タイトジャンクションを物理的に開いた（TEMで可視的な間隙）。タンパク質は存在するが3Dコンフォメーションが変化し、接合部を密閉できない。これはタンパク質発現だけを測る研究がBBB効果を見いださない理由を説明する。",
    pathwayFIOPPara: "[[ref:iop2026_bbb_scoping_review|IOP Scienceのスコーピングレビュー（2026、Physics in Medicine and Biology）]]は、証拠は矛盾するものの、陽性結果が複数の独立研究室（Salford/Lund、Tang/中国、Ulusoy/イラン、Gao/中国）で再現されたと確認する。陰性結果は測定法（ウエスタンブロット、TEM、アルブミン漏出）、麻酔、曝露変調の差で部分的に説明される。",
    pathwayFUlusoyPara: "[[ref:ulusoy2025_bbb_enos|Ulusoyら（2025、Iranian J Basic Medical Sciences）]]は、薬物を脳へ送達するためBBBを開く治療ツールとしてRF-EMFを提案する：27.12 MHz → eNOS → NO → オクルディン↓ → TJ開口。これは、研究者がEMFの生物活性を利用する一方でICNIRPがその存在を否定するという治療機器パラドックスの新しい形である。",
    miRNACell: "miRNA変化 → 長期的TJ調節異常",
    arendashPara1: "[[ref:arendash2010_temt_alzheimer|Arendashら（2010–2019）]]は、918 MHz EMF処置（1日2時間）がAβオリゴマーを分解しミトコンドリアを強化することで、アルツハイマーマウスを保護し認知低下まで逆転させることを示した。8名の臨床パイロット（TEMT 2か月）も認知改善を示した。これはBBB開口所見を反証せず、むしろBBB開口が文脈により正味効果の変わる生物学的過程であることを確認する。",
    arendashPara2: "清浄な血液＋BBB開口＝Aβ除去（有益）。血中毒素＋BBB開口＝神経毒性（有害）。[[ref:arendash2010_temt_alzheimer|Arendash]]の清浄な実験用マウスは利益を得た。現実の高齢者の血液にはフタル酸、重金属、薬剤残留物、マイクロプラスチックが含まれる。",
    hospitalBBBPara: "薬物投与量は正常なBBBを前提とする。高齢入院患者では、加齢（オクルディン↓、ZO-1↓）と病院EMF（コンフォメーション変化＋eNOS経路）の二つの理由でBBBが損なわれる。実効脳内用量は薬物動態モデルの予測より高くなり、院内せん妄の一部を説明し得る（手術患者15–53%、ICUでは最大80%）。",
    findingGaoConformation: "EMPがコンフォメーション変化によりTJを開口 — タンパク質発現は不変",
    findingIOPScoping: "スコーピングレビュー：BBBエビデンスは矛盾するが複数の独立研究室で陽性",
    findingUlusoyTherapeutic: "RF-EMF BBB調節が治療ツールとして提案；eNOS→NO→オクルディン↓",
    findingArendashTEMT: "918 MHz TEMT：Aβ分解、ADマウスとパイロット患者での認知改善",
    findingAgingBBB: "加齢マウスBBB：オクルディン↓、ZO-1↓、TNF-α↑、透過性↑",
    findingTangMemory: "900 MHz 3時間/日 28日 → 空間記憶障害 + BBB透過性↑",
    findingDasdagMiRNA: "2.4 GHz Wi-Fi → 安全基準以下での脳miRNA発現変化",
    findingLeszczynskiHsp27: "900 MHz → 内皮細胞でのhsp27/p38MAPKストレス応答 → BBB透過性↑",
    epistemicBBB: "認識論的レベル：BBB開口のコンフォメーション機構 [E]（[[ref:gao2024_bbb_conformational|Gao 2024]]、TEM）。BBB証拠全体 [M/C]（[[ref:iop2026_bbb_scoping_review|IOP 2026スコーピングレビュー]]）。加齢シナジー [C]（同じタンパク質、組合せ未検証）。[[ref:arendash2010_temt_alzheimer|Arendash]]の双方向性 [E]（臨床パイロット）。病院医原性 [C]（仮説、P27–P28）。",
    alzheimerIntroPara: "アルツハイマー研究のカルシウム仮説（LaFerla、O'Day、Bhatt）は、細胞内Ca²⁺調節異常がアミロイド蓄積に先行する早期事象だとする。抗アミロイド薬はプラークを除去しても認知を改善しないため、プラークは原因ではなく症状である。しかしカルシウム仮説はCa²⁺調節異常の原因を説明しない。BERMのVGCC機構（[[ref:pall2013_v2|Pall 2013]]）が欠けた上流原因、EMF → VGCC → Ca²⁺↑を与える。",
    alzheimerBhattPara: "決定的所見（[[ref:pmc3065491_bhatt_ca_oligomers|Bhattら、PMC3065491]]）：Ca²⁺存在下ではAβ(1-40)は毒性オリゴマーを優先的に形成し、Ca²⁺非存在下では無害なフィブリルへ凝集する。カルシウム量はアミロイド産生だけでなく危険性を決める。毒性型はプラークではなくオリゴマーで、その形成がCa²⁺に方向づけられるため、プラーク除去が効かない理由を説明する。",
    alzheimerPresenilinPara: "プレセニリン収束：家族性AD（約5%）のPSEN1/PSEN2変異は遺伝的にCa²⁺調節異常を起こす。EMFはVGCC経路を介して環境的に同じ異常を起こす。CACNA1C × EHSと同じく遺伝子と環境が同じカルシウム経路へ収束する。EMF睡眠効果を調節するCACNA1C rs7304986（[[ref:sousouri2025|Sousouri 2025]]）は累積ADリスクも調節し得る。",
    alzheimerFeedbackPara: "正のフィードバックループ：Aβオリゴマーが細胞膜に新たなカルシウム孔を形成 → Ca²⁺流入増加 → Aβ産生増加 → 加速するサイクル。初期にはEMFのCa²⁺効果は可逆的で補償可能である。しかしオリゴマー形成Ca²⁺孔が活性化すると、プロセスはEMFから独立する。この「不可逆点」がADの加速を説明する。",
    alzheimerArendashPara: "Arendashパラドックス：制御されたEMF（918 MHz、1日2時間）はADマウスモデルと臨床パイロット（[[ref:arendash2010_temt_alzheimer|MemorEM/TEMT]]）で保護効果を示す。これはBERMを反証せず、生物活性を確認する。用量、周波数、文脈が結果を決める。清浄な実験曝露はBBBを開きAβ除去へ、慢性的な環境多周波EMFは制御されないCa²⁺撹乱へ向かう。",
    findingCaProximal: "Ca²⁺調節異常はAD機能障害の近位原因",
    findingCaOligomers: "Ca²⁺がAβ → 毒性オリゴマーへ誘導（フィブリルではない）",
    findingCaEarly: "Ca²⁺調節異常は早期イベント、神経変性に先行",
    findingCaHomeostasis: "Ca²⁺恒常性と神経興奮性がAβ神経毒性の鍵",
    findingPresenilinMutations: "プレセニリン変異 → Ca²⁺調節異常（遺伝的収斂）",
    findingAntiAmyloidFailed: "抗アミロイド薬が失敗 → 代替メカニズムが必要",
    epistemicAlzheimer: "認識論的レベル：ADのCa²⁺調節異常 [E]（[[ref:pmc4909906_calcium_ad|PMC4909906]]／[[ref:pmc7179355_oday_calcium|PMC7179355]]）。Ca²⁺ → オリゴマー [E]（[[ref:pmc3065491_bhatt_ca_oligomers|Bhatt PMC3065491]]）。EMF → VGCC → Ca²⁺ [E]（[[ref:pall2013_v2|Pall 2013]]）。EMF → AD因果 [C]（仮説）。[[ref:arendash2010_temt_alzheimer|Arendashパラドックス]] [E]（臨床パイロット）。カルシウム仮説はコンセンサスではなく、複数の競合仮説の一つである。",
    hospitalEMFIntroPara: "「退院後症候群」（[[ref:krumholz2013_phs|Krumholz、NEJM 2013]]）は実在する現象である。退院後30日間、入院診断に関係なく心筋梗塞、肺炎、転倒、せん妄など全診断のリスクが上がる。従来の説明（睡眠不足、安静、ストレス、薬剤）にEMFは含まれない。",
    hospitalEMFBermPara: "BERM仮説：高齢患者は低EMFの自宅から最高EMFの環境へ移る。病院のEMF源は24時間LED照明（IF-EMF）、Wi-Fi（RF）、患者モニター（IF+ELF）、電動ベッド（ELF）、多数の医療機器である。ICUでは機器近くで最大40 µTが測定されている（[[ref:pubmed10447544_icu_emf|PubMed 10447544]]）。高齢者は時間の95%をベッドで過ごし、曝露から離れられない。",
    hospitalEMFModulomePara: "モジュロームの観点から、病院EMFは全てのカスケード経路を同時に活性化する：LED 24時間 → IF → 睡眠障害 + メラトニン↓；Wi-Fi → RF → CRY撹乱；モニター → IF+ELF → 心臓リズム撹乱（HRV↓）；電動ベッド → ELF → 24時間身体接触。「全般的脆弱性」= すでに損なわれたイオンチャネル恒常性におけるモジュロームの同時活性化。",
    hospitalEMFHADPara: "[[ref:had2024_meta|院内獲得障害（HAD）メタ分析（Age and Ageing 2024）]]：入院中のADL障害リスクは61倍、68%がベースライン未満で退院する。この規模は安静とストレスだけでは説明できない。EMFは唯一の原因ではなく、多因子モデルにおける一つの未検証追加要因である。",
    findingKrumholzPHS: "退院後症候群：退院後30日以内に全診断のリスク上昇",
    findingICUPollution: "ICU EMF 機器近くで40 µT；「ICUは電磁汚染のリスクがある」",
    findingHospitalRF: "病院RF-EMF：全チャネルにわたる最新の測定",
    findingHADMeta: "HAD：ADL障害リスク61倍、68%がベースライン以下で退院",
    epistemicHospital: "認識論的レベル：退院後症候群 [E]（[[ref:krumholz2013_phs|Krumholz NEJM]]）。ICU EMF [E]（[[ref:pubmed10447544_icu_emf|PubMed 10447544]]）。EMF → 退院後症候群因果 [C]（仮説、未検証）。注：ICU研究は1999年で、現代の機器は異なり得る。",
    brainModulomeLink: "脳 — モジュローム",
  },
  fr: {
    title: "Barrières biologiques : BHE et BTB",
    subtitle: "Voie F multiplicateur de barrières biologiques — la BHE et la barrière hémato-testiculaire partagent le même mécanisme de jonctions serrées",
    backLink: "← Retour aux preuves",
    narrativeTitle: "Mécanisme des jonctions serrées de la BHE ([[ref:gao2024_bbb_conformational|Gao 2024]], [[ref:ulusoy2025_bbb_enos|Ulusoy 2025]])",
    narrativeParagraphs: [
      "[[ref:gao2024_bbb_conformational|Gao et al. (2024, Bioelectromagnetics, bem.22494)]] démontrent que l'impulsion électromagnétique (EMP) a provoqué une altération de la BHE dans le cerveau de rats par dégradation des protéines de jonctions serrées (occludine, claudine, ZO-1). [[ref:ulusoy2025_bbb_enos|Ulusoy et al. (2025, Int J Basic Med Sci)]] ont montré que le RF-EMF à 27,12 MHz ouvre la BHE par activation d'eNOS et baisse de l'occludine — sans stress oxydatif à 30 min, puis avec des lésions structurelles à 360 min. Cela confirme un mécanisme non thermique et progressif.",
      "BERM étend la voie F d'une voie limitée à la BHE à un multiplicateur de barrières biologiques couvrant à la fois la BHE et la BTB. La barrière hémato-testiculaire (BTB) utilise les mêmes protéines de jonctions serrées (occludine, ZO-1, claudines) que la BHE. [[ref:yu2019_btb|Yu et al. (2019, Sci Total Environ)]] ont démontré qu'une exposition prolongée à la 4G (2605 MHz) perturbe directement l'intégrité de la BTB par l'axe Spock3-MMP2, produisant une toxicité reproductive dépendante du temps. La perturbation de la BTB a un effet reproductif PLUS DIRECT, car elle compromet le microenvironnement spermatogénique immunoprivilégié. Le multiplicateur de barrière fonctionne comme une rétroaction positive : l'EMF ouvre la barrière → le tissu protégé est exposé → davantage de dommages → la barrière s'affaiblit encore.",
    ],
    narrativeStudies: [
      { citation: "Gao et al. (Bioelectromagnetics)", year: 2024, referenceId: "gao2024_bbb_conformational", note: "EMP → dégradation des protéines de jonctions serrées → ouverture de la BHE. Soutien mécanistique de la voie F (EMP, pas RF chronique)." },
      { citation: "Salford et al.", year: 2003, referenceId: "salford2003", note: "Ouverture de la BHE aux fréquences GSM (SAR 0,016 W/kg) — référence directe de la voie F de BERM." },
      { citation: "Ulusoy et al. (Int J Basic Med Sci)", year: 2025, referenceId: "ulusoy2025_bbb_enos", note: "27,12 MHz RF → eNOS ↑ → occludine ↓ → ouverture de la BHE. Non thermique à 30 min, structurel à 360 min." },
      { citation: "Yu et al. (Sci Total Environ)", year: 2019, referenceId: "yu2019_btb", note: "4G (2605 MHz) → axe Spock3-MMP2-BTB → toxicité spermatogénique directe. Dépendante du temps, progressive." },
    ],
    btbBoundary: "Les données sur la BTB proviennent d'un seul groupe de recherche ([[ref:yu2019_btb|Yu et al. 2019]]). Le résultat est mécanistiquement robuste et dépendant du temps, mais une réplication indépendante par un autre groupe reste attendue.",
    seeAlso: "Voir aussi",
    evidencePortal: "Registre des preuves",
    thCitation: "Référence",
    thYear: "Année",
    thNote: "Note",
    thFinding: "Découverte",
    thPathway: "Voie",
    thEvidence: "Preuves",
    thFrequency: "Fréquence",
    pathwayFHeading: "Voie F : Barrières biologiques — Le multiplicateur EMF",
    threeParallelHeading: "Trois mécanismes parallèles d'ouverture de la BHE",
    arendashParadoxHeading: "Le paradoxe d'Arendash : l'ouverture de la BHE est bidirectionnelle",
    hospitalBBBHeading: "Hypothèse iatrogène BHE-hôpital",
    alzheimerHeading: "Alzheimer et le calcium en amont",
    hospitalEMFHeading: "L'hypothèse EMF hospitalière",
    pathwayFIntroPara: "L'EMF ouvre la barrière hémato-encéphalique (BHE) par trois mécanismes parallèles. Le vieillissement dégrade les MÊMES protéines de jonctions serrées — l'effet combiné est synergique, non additif. L'environnement hospitalier combine l'exposition EMF la plus élevée, les patients les plus âgés et les médicaments circulants : le résultat est une escalade non planifiée de la dose cérébrale.",
    pathwayFGaoPara: "[[ref:gao2024_bbb_conformational|Gao et al. (2024, Bioelectromagnetics)]] ont démontré un résultat critique : l'impulsion électromagnétique a ouvert PHYSIQUEMENT les jonctions serrées (espace visible en TEM), alors que les NIVEAUX des protéines TJ (ZO-1, claudine-5, occludine) ne changeaient pas au western blot. Les protéines sont présentes, mais leur conformation 3D a changé — elles ne scellent plus la jonction. Cela explique pourquoi les études ne mesurant que l'expression protéique (de Gannes, Franke) ne trouvent pas d'effets sur la BHE.",
    pathwayFIOPPara: "[[ref:iop2026_bbb_scoping_review|La revue de cadrage IOP Science (2026, Physics in Medicine and Biology)]] confirme : les preuves sont contradictoires, mais les résultats positifs ont été reproduits dans plusieurs laboratoires indépendants (Salford/Lund, Tang/Chine, Ulusoy/Iran, Gao/Chine). Les résultats négatifs (Finnie, Franke, de Gannes, Kuribayashi) s'expliquent en partie par les différences de méthode de mesure (western blot, TEM ou fuite d'albumine), le type d'anesthésie et la modulation de l'exposition.",
    pathwayFUlusoyPara: "[[ref:ulusoy2025_bbb_enos|Ulusoy et al. (2025, Iranian J Basic Medical Sciences)]] proposent le RF-EMF comme OUTIL THÉRAPEUTIQUE pour ouvrir la BHE et administrer des médicaments au cerveau : 27,12 MHz → eNOS → NO → occludine ↓ → jonctions serrées ouvertes. Il s'agit d'une nouvelle variante du paradoxe des dispositifs thérapeutiques : les chercheurs exploitent l'activité biologique de l'EMF tandis que l'ICNIRP en nie l'existence.",
    miRNACell: "Modification des miARN → dysrégulation des JS à long terme",
    arendashPara1: "[[ref:arendash2010_temt_alzheimer|Arendash et al. (2010–2019)]] ont démontré qu'un traitement EMF à 918 MHz (2 h/jour) PROTÈGE les souris Alzheimer et inverse même le déclin cognitif — en désagrégeant les oligomères Aβ et en améliorant les mitochondries. Un essai clinique pilote (8 patients, TEMT pendant 2 mois) a montré une amélioration cognitive. Cela NE réfute PAS les résultats d'ouverture de la BHE — cela les confirme : l'ouverture de la BHE est un processus biologique dont l'effet net dépend du contexte.",
    arendashPara2: "Sang propre + BHE ouverte = élimination de l'Aβ (bénéfique). Toxines dans le sang + BHE ouverte = neurotoxicité (nocive). Les souris de laboratoire propres d'[[ref:arendash2010_temt_alzheimer|Arendash]] en ont bénéficié. Dans le monde réel, le sang d'une personne âgée contient des phtalates, des métaux lourds, des résidus de médicaments et des microplastiques.",
    hospitalBBBPara: "Le dosage des médicaments suppose une BHE normale. Chez les patients hospitalisés âgés, la BHE est compromise pour DEUX raisons : le vieillissement (occludine ↓, ZO-1 ↓) ET l'EMF hospitalier (changement conformationnel + voie eNOS). La dose cérébrale effective est supérieure aux prédictions des modèles pharmacocinétiques. Cela peut expliquer une partie du délirium acquis à l'hôpital (incidence de 15 à 53 % en chirurgie, jusqu'à 80 % en soins intensifs).",
    findingGaoConformation: "L'EMP ouvre les JS par changement conformationnel — expression protéique inchangée",
    findingIOPScoping: "Revue de cadrage : preuves BHE contradictoires mais positives dans plusieurs laboratoires indépendants",
    findingUlusoyTherapeutic: "Modulation BHE par RF-EMF proposée comme outil thérapeutique ; eNOS→NO→occludine↓",
    findingArendashTEMT: "TEMT à 918 MHz : désagrégation d'Aβ et amélioration cognitive chez les souris AD et les patients pilotes",
    findingAgingBBB: "BHE de souris âgées : occludine ↓, ZO-1 ↓, TNF-α ↑, perméabilité ↑",
    findingTangMemory: "900 MHz 3h/jour 28j → déficit de mémoire spatiale + perméabilité BHE ↑",
    findingDasdagMiRNA: "2,4 GHz Wi-Fi → modifications de l'expression des miARN cérébraux sous les limites de sécurité",
    findingLeszczynskiHsp27: "900 MHz → réponse au stress hsp27/p38MAPK dans les cellules endothéliales → perméabilité BHE ↑",
    epistemicBBB: "Niveau épistémique : mécanisme conformationnel d'ouverture de la BHE [E] ([[ref:gao2024_bbb_conformational|Gao 2024]], TEM). Preuves globales sur la BHE [M/C] ([[ref:iop2026_bbb_scoping_review|revue de cadrage IOP 2026]]). Synergie du vieillissement [C] (mêmes protéines, combinaison non testée). Bidirectionnalité d'[[ref:arendash2010_temt_alzheimer|Arendash]] [E] (pilote clinique). Iatrogénie hospitalière [C] (hypothèse, P27–P28).",
    alzheimerIntroPara: "L'hypothèse calcique de la recherche sur Alzheimer (LaFerla, O'Day, Bhatt) affirme que la dysrégulation du calcium intracellulaire est un événement PRÉCOCE qui PRÉCÈDE l'accumulation d'amyloïde. Les médicaments anti-amyloïdes éliminent les plaques mais n'améliorent pas la cognition — les plaques sont un symptôme, pas la cause. Mais l'hypothèse calcique n'explique pas CE QUI provoque la dysrégulation du Ca²⁺. Le mécanisme VGCC de BERM ([[ref:pall2013_v2|Pall 2013]]) fournit la cause amont manquante : EMF → VGCC → Ca²⁺ ↑.",
    alzheimerBhattPara: "Résultat critique ([[ref:pmc3065491_bhatt_ca_oligomers|Bhatt et al., PMC3065491]]) : en présence de Ca²⁺, Aβ(1-40) forme préférentiellement des OLIGOMÈRES TOXIQUES, tandis qu'en l'absence de Ca²⁺ il s'agrège en FIBRILLES INOFFENSIVES. Le niveau de calcium n'augmente pas seulement la production d'amyloïde — il détermine si l'amyloïde est dangereuse ou non. Cela explique pourquoi l'élimination des plaques ne suffit pas : les oligomères, et non les plaques, sont la forme toxique, et leur formation est dirigée par le Ca²⁺.",
    alzheimerPresenilinPara: "Convergence de la préséniline : les mutations PSEN1/PSEN2 (Alzheimer familial, environ 5 % des cas) provoquent GÉNÉTIQUEMENT une dysrégulation du Ca²⁺. L'EMF provoque la même dysrégulation du Ca²⁺ ENVIRONNEMENTALEMENT par la voie VGCC. Même logique que CACNA1C × EHS : le gène et l'environnement convergent vers la même voie calcique. CACNA1C rs7304986, qui module les effets de l'EMF sur le sommeil ([[ref:sousouri2025|Sousouri 2025]]), peut également moduler le risque cumulatif d'Alzheimer.",
    alzheimerFeedbackPara: "Boucle de rétroaction positive : les oligomères Aβ forment de NOUVEAUX pores calciques dans la membrane cellulaire → plus d'influx de Ca²⁺ → plus de production d'Aβ → cycle accélérant. Initialement, l'effet Ca²⁺ de l'EMF est réversible et compensable. Mais une fois que les pores Ca²⁺ formés par les oligomères s'activent, le processus devient INDÉPENDANT de l'EMF. Ce « point de non-retour » explique pourquoi l'AD s'accélère.",
    alzheimerArendashPara: "Paradoxe d'Arendash : un EMF contrôlé (918 MHz, 2 h/jour) PROTÈGE contre Alzheimer dans les modèles murins et les essais cliniques pilotes ([[ref:arendash2010_temt_alzheimer|MemorEM/TEMT]]). Cela NE réfute PAS BERM — cela CONFIRME une activité biologique. La dose, la fréquence et le contexte déterminent l'issue : une exposition propre en laboratoire ouvre la BHE → élimination de l'Aβ ; un EMF environnemental chronique multifréquence → perturbation incontrôlée du Ca²⁺.",
    findingCaProximal: "La dysrégulation du Ca²⁺ est une CAUSE PROXIMALE du dysfonctionnement AD",
    findingCaOligomers: "Le Ca²⁺ dirige Aβ → oligomères toxiques (pas les fibrilles)",
    findingCaEarly: "La dysrégulation du Ca²⁺ est un événement PRÉCOCE, précède la neurodégénérescence",
    findingCaHomeostasis: "Homéostasie du Ca²⁺ et excitabilité neuronale clés dans la neurotoxicité Aβ",
    findingPresenilinMutations: "Mutations de la préséniline → dysrégulation du Ca²⁺ (convergence génétique)",
    findingAntiAmyloidFailed: "Médicaments anti-amyloïdes ÉCHOUÉS → besoin de mécanismes alternatifs",
    epistemicAlzheimer: "Niveau épistémique : dysrégulation du Ca²⁺ dans Alzheimer [E] ([[ref:pmc4909906_calcium_ad|PMC4909906]]/[[ref:pmc7179355_oday_calcium|PMC7179355]]). Ca²⁺ → oligomères [E] ([[ref:pmc3065491_bhatt_ca_oligomers|Bhatt PMC3065491]]). EMF → VGCC → Ca²⁺ [E] ([[ref:pall2013_v2|Pall 2013]]). Causalité EMF → Alzheimer [C] (hypothèse). Paradoxe d'[[ref:arendash2010_temt_alzheimer|Arendash]] [E] (pilote clinique). L'hypothèse calcique ne fait pas consensus — elle fait partie de plusieurs hypothèses concurrentes.",
    hospitalEMFIntroPara: "Le « syndrome post-hospitalier » ([[ref:krumholz2013_phs|Krumholz, NEJM 2013]]) est un phénomène réel : après la sortie de l'hôpital, le risque du patient augmente pour TOUS les diagnostics, pas seulement pour celui de l'admission. Dans les 30 jours suivant la sortie, les patients présentent un risque accru d'infarctus du myocarde, de pneumonie, de chutes et de délirium — quel que soit le diagnostic d'admission. Les explications conventionnelles (privation de sommeil, alitement, stress, médicaments) n'incluent pas l'EMF.",
    hospitalEMFBermPara: "Hypothèse BERM : les patients âgés passent d'un domicile à faible EMF à l'environnement présentant l'EMF le plus élevé. Les sources hospitalières comprennent : éclairage LED 24 h/24 (IF-EMF), points d'accès Wi-Fi (RF), moniteurs de patients (IF+ELF), lits électriques (ELF) et de nombreux dispositifs médicaux. Des champs magnétiques atteignant 40 µT ont été mesurés à proximité d'équipements de soins intensifs ([[ref:pubmed10447544_icu_emf|PubMed 10447544]]). Les patients âgés passent 95 % de leur temps au lit — ils ne peuvent pas s'éloigner de l'exposition.",
    hospitalEMFModulomePara: "Du point de vue du modulome, l'EMF hospitalier active TOUTES les voies en cascade simultanément : LED 24h/24 → IF → perturbation du sommeil + mélatonine↓ ; Wi-Fi → RF → perturbation CRY ; moniteurs → IF+ELF → perturbation du rythme cardiaque (VRC↓) ; lit électrique → ELF → contact corporel 24h/24. La « vulnérabilité généralisée » = activation simultanée du modulome dans une homéostasie des canaux ioniques déjà compromise.",
    hospitalEMFHADPara: "[[ref:had2024_meta|Méta-analyse du handicap acquis à l'hôpital (HAD), Age and Ageing 2024]] : risque de handicap dans les AVQ multiplié par 61 à l'hôpital, 68 % des patients sortant sous leur niveau initial. Ces chiffres sont trop élevés pour être expliqués par le seul alitement et le stress. L'EMF n'est pas la seule cause — c'est UN facteur supplémentaire non testé dans un modèle multifactoriel.",
    findingKrumholzPHS: "Syndrome post-hospitalier : risque pour tous les diagnostics dans les 30 jours suivant la sortie",
    findingICUPollution: "EMF en soins intensifs 40 µT près des équipements ; « les soins intensifs sont menacés par la pollution électromagnétique »",
    findingHospitalRF: "RF-EMF hospitalier : mesures modernes sur tous les canaux",
    findingHADMeta: "HAD : risque 61× de handicap AVQ, 68 % sortent en dessous du niveau de base",
    epistemicHospital: "Niveau épistémique : syndrome post-hospitalier [E] ([[ref:krumholz2013_phs|Krumholz NEJM]]). EMF en soins intensifs [E] ([[ref:pubmed10447544_icu_emf|PubMed 10447544]]). Causalité EMF → syndrome post-hospitalier [C] (hypothèse non testée). Remarque : l'étude en soins intensifs date de 1999 — les équipements modernes peuvent différer.",
    brainModulomeLink: "Cerveau — modulome",
  },
  ko: {
    title: "생물학적 장벽: BBB와 BTB",
    subtitle: "경로 F 생물학적 장벽 승수 — BBB와 혈액-고환 장벽은 동일한 밀착연접 메커니즘을 공유한다",
    backLink: "← 근거로 돌아가기",
    narrativeTitle: "BBB 밀착연접 메커니즘 ([[ref:gao2024_bbb_conformational|Gao 2024]], [[ref:ulusoy2025_bbb_enos|Ulusoy 2025]])",
    narrativeParagraphs: [
      "[[ref:gao2024_bbb_conformational|Gao 등(2024, Bioelectromagnetics, bem.22494)]]은 전자기 펄스(EMP)가 밀착연접 단백질(오클루딘, 클라우딘, ZO-1)의 분해를 통해 쥐의 뇌에서 BBB 손상을 일으킨다는 것을 입증했다. [[ref:ulusoy2025_bbb_enos|Ulusoy 등(2025, Int J Basic Med Sci)]]은 27.12 MHz RF-EMF가 eNOS 활성화와 오클루딘 하향조절을 통해 BBB를 개방하며, 30분에는 산화 스트레스 없이 나타나고 360분에는 구조적 손상으로 진행된다고 밝혔다. 이는 비열적이고 진행성인 메커니즘을 확인한다.",
      "BERM은 경로 F를 BBB만의 경로에서 BBB와 BTB를 모두 포괄하는 생물학적 장벽 승수로 확장한다. 혈액-고환 장벽(BTB)은 BBB와 동일한 밀착연접 단백질(오클루딘, ZO-1, 클라우딘)을 사용한다. [[ref:yu2019_btb|Yu 등(2019, Sci Total Environ)]]은 장기 4G 노출(2605 MHz)이 Spock3-MMP2 축을 통해 BTB 무결성을 직접 손상시키고 시간 의존적 생식독성을 일으킨다는 것을 입증했다. BTB 손상은 면역특권 정자형성 미세환경을 훼손하므로 생식에 더 직접적인 영향을 미친다. 장벽 승수는 양성 피드백으로 작동한다: EMF가 장벽을 개방 → 보호 조직이 노출 → 손상 증가 → 장벽이 더욱 약화.",
    ],
    narrativeStudies: [
      { citation: "Gao 등(Bioelectromagnetics)", year: 2024, referenceId: "gao2024_bbb_conformational", note: "EMP → 밀착연접 단백질 분해 → BBB 개방. 경로 F의 기전적 지지(EMP이며 만성 RF는 아님)." },
      { citation: "Salford 등", year: 2003, referenceId: "salford2003", note: "GSM 주파수에서의 BBB 개방(SAR 0.016 W/kg) — BERM의 직접적 경로 F 참조." },
      { citation: "Ulusoy 등(Int J Basic Med Sci)", year: 2025, referenceId: "ulusoy2025_bbb_enos", note: "27.12 MHz RF → eNOS ↑ → 오클루딘 ↓ → BBB 개방. 30분에서 비열적, 360분에서 구조적." },
      { citation: "Yu 등(Sci Total Environ)", year: 2019, referenceId: "yu2019_btb", note: "4G(2605 MHz) → Spock3-MMP2-BTB 축 → 직접적 정자형성 독성. 시간 의존적, 진행성." },
    ],
    btbBoundary: "BTB 데이터는 단일 연구 그룹([[ref:yu2019_btb|Yu 등 2019]])에서 나왔다. 이 발견은 기전적으로 강하고 시간 의존적이지만 다른 그룹의 독립적 재현은 아직 이루어지지 않았다.",
    seeAlso: "관련 항목",
    evidencePortal: "근거 등록부",
    thCitation: "인용",
    thYear: "연도",
    thNote: "비고",
    thFinding: "발견",
    thPathway: "경로",
    thEvidence: "근거",
    thFrequency: "주파수",
    pathwayFHeading: "경로 F: 생물학적 장벽 — EMF 승수 효과",
    threeParallelHeading: "세 가지 병렬 BBB 개방 메커니즘",
    arendashParadoxHeading: "Arendash 역설: BBB 개방은 양방향적",
    hospitalBBBHeading: "병원-BBB 의인성 가설",
    alzheimerHeading: "알츠하이머와 칼슘 상류 경로",
    hospitalEMFHeading: "병원 EMF 가설",
    pathwayFIntroPara: "EMF는 세 가지 병렬 메커니즘을 통해 혈액뇌장벽(BBB)을 개방한다. 노화는 동일한 밀착연접 단백질을 열화시키며, 복합 효과는 가산적이 아니라 상승적이다. 병원 환경은 가장 높은 EMF 노출, 가장 고령의 환자, 순환하는 약물을 결합하여 계획되지 않은 뇌 약물 용량 증가를 초래한다.",
    pathwayFGaoPara: "[[ref:gao2024_bbb_conformational|Gao 등(2024, Bioelectromagnetics)]]은 핵심 발견을 입증했다. 전자기 펄스는 TJ 단백질(ZO-1, 클라우딘-5, 오클루딘)의 수준이 웨스턴 블롯에서 변하지 않았음에도 밀착연접을 물리적으로 개방했다(TEM 영상의 가시적 틈). 단백질은 존재하지만 3차원 구조가 변해 더 이상 접합부를 밀봉하지 못한다. 이는 단백질 발현만 측정한 연구(de Gannes, Franke)가 BBB 효과를 찾지 못한 이유를 설명한다.",
    pathwayFIOPPara: "[[ref:iop2026_bbb_scoping_review|IOP Science 범위 검토(2026, Physics in Medicine and Biology)]]는 다음을 확인한다. 근거는 상충하지만 양성 결과는 여러 독립 연구실(Salford/Lund, Tang/중국, Ulusoy/이란, Gao/중국)에서 재현되었다. 음성 결과(Finnie, Franke, de Gannes, Kuribayashi)는 측정 방법(웨스턴 블롯, TEM, 알부민 누출), 마취 종류, 노출 변조의 차이로 일부 설명된다.",
    pathwayFUlusoyPara: "[[ref:ulusoy2025_bbb_enos|Ulusoy 등(2025, Iranian J Basic Medical Sciences)]]은 뇌에 약물을 전달하기 위해 BBB를 여는 치료 도구로 RF-EMF를 제안한다: 27.12 MHz → eNOS → NO → 오클루딘 ↓ → TJ 개방. 이는 치료기기 역설의 새로운 형태다. 연구자들은 EMF의 생물학적 활성을 활용하는 반면 ICNIRP는 그 존재를 부정한다.",
    miRNACell: "miRNA 변화 → 장기적 TJ 조절 이상",
    arendashPara1: "[[ref:arendash2010_temt_alzheimer|Arendash 등(2010–2019)]]은 918 MHz EMF 처치(하루 2시간)가 Aβ 올리고머를 분해하고 미토콘드리아를 향상시켜 알츠하이머 마우스를 보호하고 인지 저하까지 역전시킨다는 것을 입증했다. 임상 파일럿(환자 8명, TEMT 2개월)은 인지 개선을 보였다. 이는 BBB 개방 발견을 반박하지 않고 오히려 확인한다. BBB 개방은 순효과가 맥락에 따라 달라지는 생물학적 과정이다.",
    arendashPara2: "깨끗한 혈액 + 열린 BBB = Aβ 제거(유익). 혈중 독소 + 열린 BBB = 신경독성(유해). [[ref:arendash2010_temt_alzheimer|Arendash]]의 깨끗한 실험실 마우스는 이득을 보았다. 현실에서 노인의 혈액에는 프탈레이트, 중금속, 약물 잔류물, 미세플라스틱이 들어 있다.",
    hospitalBBBPara: "약물 투여량은 정상 BBB를 전제로 한다. 고령 입원환자의 BBB는 두 가지 이유로 손상된다: 노화(오클루딘 ↓, ZO-1 ↓)와 병원 EMF(구조 변화 + eNOS 경로). 실효 뇌 용량은 약동학 모델의 예측보다 높다. 이는 병원 획득 섬망의 일부를 설명할 수 있다(수술 환자 발생률 15–53%, ICU에서는 최대 80%).",
    findingGaoConformation: "EMP가 구조적 변화로 TJ를 개방 — 단백질 발현 불변",
    findingIOPScoping: "범위 검토: BBB 근거는 모순적이나 여러 독립 연구실에서 양성",
    findingUlusoyTherapeutic: "RF-EMF BBB 조절이 치료 도구로 제안됨; eNOS→NO→오클루딘↓",
    findingArendashTEMT: "918 MHz TEMT: Aβ 분해, AD 마우스와 파일럿 환자의 인지 개선",
    findingAgingBBB: "노화 마우스 BBB: 오클루딘↓, ZO-1↓, TNF-α↑, 투과성↑",
    findingTangMemory: "900 MHz 3시간/일 28일 → 공간 기억 장애 + BBB 투과성↑",
    findingDasdagMiRNA: "2.4 GHz Wi-Fi → 안전 기준 이하에서 뇌 miRNA 발현 변화",
    findingLeszczynskiHsp27: "900 MHz → 내피세포에서 hsp27/p38MAPK 스트레스 반응 → BBB 투과성↑",
    epistemicBBB: "인식론적 수준: BBB 개방의 구조 변화 메커니즘 [E] ([[ref:gao2024_bbb_conformational|Gao 2024]], TEM). BBB 전체 근거 [M/C] ([[ref:iop2026_bbb_scoping_review|IOP 2026 범위 검토]]). 노화 시너지 [C](동일 단백질, 결합은 미검증). [[ref:arendash2010_temt_alzheimer|Arendash]] 양방향성 [E](임상 파일럿). 병원 의인성 [C](가설, P27–P28).",
    alzheimerIntroPara: "알츠하이머 연구의 칼슘 가설(LaFerla, O'Day, Bhatt)은 세포 내 칼슘 조절 이상이 아밀로이드 축적에 앞서는 초기 사건이라고 본다. 항아밀로이드 약물은 플라크를 제거하지만 인지를 개선하지 못한다. 플라크는 원인이 아니라 증상이다. 그러나 칼슘 가설은 무엇이 Ca²⁺ 조절 이상을 일으키는지 설명하지 못한다. BERM의 VGCC 메커니즘([[ref:pall2013_v2|Pall 2013]])은 누락된 상류 원인을 제공한다: EMF → VGCC → Ca²⁺ ↑.",
    alzheimerBhattPara: "핵심 발견([[ref:pmc3065491_bhatt_ca_oligomers|Bhatt 등, PMC3065491]]): Ca²⁺가 있으면 Aβ(1-40)는 독성 올리고머를 우선 형성하지만 Ca²⁺가 없으면 무해한 피브릴로 응집한다. 칼슘 수준은 아밀로이드 생성만 늘리는 것이 아니라 아밀로이드가 위험한지 여부를 결정한다. 그래서 플라크 제거만으로는 도움이 되지 않는다. 플라크가 아니라 올리고머가 독성 형태이고, 그 형성은 Ca²⁺가 지시한다.",
    alzheimerPresenilinPara: "프레세닐린 수렴: PSEN1/PSEN2 변이(가족성 알츠하이머, 전체의 약 5%)는 유전적으로 Ca²⁺ 조절 이상을 일으킨다. EMF는 VGCC 경로를 통해 환경적으로 동일한 Ca²⁺ 조절 이상을 일으킨다. CACNA1C × EHS와 같은 논리로 유전자와 환경이 동일한 칼슘 경로에 수렴한다. EMF의 수면 효과를 조절하는 CACNA1C rs7304986([[ref:sousouri2025|Sousouri 2025]])은 누적 알츠하이머 위험도 조절할 수 있다.",
    alzheimerFeedbackPara: "양성 피드백 루프: Aβ 올리고머가 세포막에 새로운 칼슘 구멍을 형성 → Ca²⁺ 유입 증가 → Aβ 생산 증가 → 가속 순환. 초기에 EMF의 Ca²⁺ 효과는 가역적이며 보상 가능하다. 그러나 올리고머가 형성한 Ca²⁺ 구멍이 활성화되면 과정은 EMF와 무관해진다. 이 '불가역 지점'이 AD 가속을 설명한다.",
    alzheimerArendashPara: "Arendash 역설: 통제된 EMF(918 MHz, 하루 2시간)는 마우스 모델과 임상 파일럿에서 알츠하이머를 방지한다([[ref:arendash2010_temt_alzheimer|MemorEM/TEMT]]). 이는 BERM을 반박하지 않고 생물학적 활성을 확인한다. 결과는 용량, 주파수, 맥락에 달려 있다. 깨끗한 실험실 노출은 BBB 개방 → Aβ 제거를 일으키고, 만성 환경 다중주파수 EMF는 통제되지 않은 Ca²⁺ 교란을 일으킨다.",
    findingCaProximal: "Ca²⁺ 조절 이상은 AD 기능 장애의 근위 원인",
    findingCaOligomers: "Ca²⁺가 Aβ → 독성 올리고머로 유도(피브릴이 아닌)",
    findingCaEarly: "Ca²⁺ 조절 이상은 초기 사건, 신경퇴행에 선행",
    findingCaHomeostasis: "Ca²⁺ 항상성과 신경 흥분성이 Aβ 신경독성의 핵심",
    findingPresenilinMutations: "프레세닐린 변이 → Ca²⁺ 조절 이상(유전적 수렴)",
    findingAntiAmyloidFailed: "항아밀로이드 약물 실패 → 대안적 메커니즘 필요",
    epistemicAlzheimer: "인식론적 수준: 알츠하이머의 Ca²⁺ 조절 이상 [E] ([[ref:pmc4909906_calcium_ad|PMC4909906]]/[[ref:pmc7179355_oday_calcium|PMC7179355]]). Ca²⁺ → 올리고머 [E] ([[ref:pmc3065491_bhatt_ca_oligomers|Bhatt PMC3065491]]). EMF → VGCC → Ca²⁺ [E] ([[ref:pall2013_v2|Pall 2013]]). EMF → 알츠하이머 인과 [C](가설). [[ref:arendash2010_temt_alzheimer|Arendash 역설]] [E](임상 파일럿). 칼슘 가설은 합의가 아니며 여러 경쟁 가설 중 하나다.",
    hospitalEMFIntroPara: "‘퇴원후 증후군’([[ref:krumholz2013_phs|Krumholz, NEJM 2013]])은 실제 현상이다. 퇴원 후에는 입원 원인뿐 아니라 모든 진단에 대한 환자의 위험이 높아진다. 퇴원 후 30일 동안 입원 진단과 무관하게 심근경색, 폐렴, 낙상, 섬망 위험이 증가한다. 기존 설명(수면 부족, 침상 안정, 스트레스, 약물)에는 EMF가 포함되지 않는다.",
    hospitalEMFBermPara: "BERM 가설: 고령 환자는 저-EMF 가정 환경에서 가장 높은 EMF 환경으로 이동한다. 병원의 EMF원에는 24시간 LED 조명(IF-EMF), Wi-Fi 액세스 포인트(RF), 환자 모니터(IF+ELF), 전동 침대(ELF), 다수의 의료기기가 포함된다. ICU 장비 근처에서는 최대 40 µT의 자기장이 측정되었다([[ref:pubmed10447544_icu_emf|PubMed 10447544]]). 고령 환자는 시간의 95%를 침대에서 보내므로 노출에서 벗어날 수 없다.",
    hospitalEMFModulomePara: "모듈롬 관점에서 병원 EMF는 모든 캐스케이드 경로를 동시에 활성화한다: LED 24시간 → IF → 수면 장애 + 멜라토닌↓; Wi-Fi → RF → CRY 교란; 모니터 → IF+ELF → 심장 리듬 교란(HRV↓); 전동 침대 → ELF → 24시간 신체 접촉. '전반적 취약성' = 이미 손상된 이온 채널 항상성에서의 모듈롬 동시 활성화.",
    hospitalEMFHADPara: "[[ref:had2024_meta|병원 획득 장애(HAD) 메타분석(Age and Ageing 2024)]]: 병원 내 ADL 장애 위험 61배, 68%가 기준선 이하 상태로 퇴원했다. 이 수치는 침상 안정과 스트레스만으로 설명하기에는 너무 크다. EMF가 유일한 원인은 아니며 다요인 모델에서 아직 검증되지 않은 하나의 추가 요인이다.",
    findingKrumholzPHS: "퇴원후 증후군: 퇴원 후 30일 이내 모든 진단의 위험 상승",
    findingICUPollution: "ICU EMF 장비 근처 40 µT; 'ICU는 전자기 오염 위험에 처해 있다'",
    findingHospitalRF: "병원 RF-EMF: 모든 채널에 걸친 최신 측정",
    findingHADMeta: "HAD: ADL 장애 위험 61배, 68%가 기준선 이하로 퇴원",
    epistemicHospital: "인식론적 수준: 퇴원후 증후군 [E] ([[ref:krumholz2013_phs|Krumholz NEJM]]). ICU EMF [E] ([[ref:pubmed10447544_icu_emf|PubMed 10447544]]). EMF → 퇴원후 증후군 인과 [C](미검증 가설). 참고: ICU 연구는 1999년 자료이며 현대 장비는 다를 수 있다.",
    brainModulomeLink: "뇌 — 모듈롬",
  },
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const d = pickCopy(COPY, locale);
  return { title: `${d.title} – Extinction Field`, description: d.subtitle };
}

export default async function BBBPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const d = pickCopy(COPY, locale);

  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <Link href={`/${locale}/evidence`} className="text-sm text-accent hover:underline mb-6 inline-block">
        {d.backLink}
      </Link>

      <PageHeader icon={Brain} title={d.title} subtitle={d.subtitle} lensIcon={<BermIcon name="neurobiology" size={28} className="text-accent" />} />

      {/* BBB tight junction narrative */}
      <section className="mb-16 border-t editorial-rule pt-6">
        <article id="narrative-bbb-tight-junction" className="scroll-mt-24">
          <h3 className="text-lg font-semibold mb-4">
            <span className="font-mono-num text-xs text-accent mr-2">01</span>
            <InlineReferenceText text={d.narrativeTitle} locale={locale} />
          </h3>
          {d.narrativeParagraphs.length > 0 && (
            <p className="editorial-rail mb-4 text-[0.95rem] leading-relaxed text-foreground">
              <InlineReferenceText
                text={d.narrativeParagraphs[0]}
                locale={locale}
              />
            </p>
          )}
          <div className="space-y-3 text-sm text-foreground-muted leading-relaxed mb-5">
            {d.narrativeParagraphs.slice(1).map((p, pi) => (
              <p key={pi}>
                <InlineReferenceText text={p} locale={locale} />
              </p>
            ))}
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-card-border text-left text-xs text-foreground-muted uppercase tracking-wider">
                  <th className="py-2 pr-3">{d.thCitation}</th>
                  <th className="py-2 pr-3 w-16">{d.thYear}</th>
                  <th className="py-2">{d.thNote}</th>
                </tr>
              </thead>
              <tbody>
                {d.narrativeStudies.map((s) => (
                  <tr key={`${s.citation}-${s.year}`} className="border-b border-card-border/40">
                    <td className="py-2 pr-3 font-medium text-foreground"><CitationLink referenceId={s.referenceId} locale={locale} citation={s.citation} year={s.year} /></td>
                    <td className="py-2 pr-3 font-mono-num text-foreground-muted">{s.year}</td>
                    <td className="py-2 text-foreground-muted">{s.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </article>
      </section>

      {/* BTB boundary note */}
      {"btbBoundary" in d && (
        <p className="mt-3 text-xs text-foreground-muted max-w-3xl leading-relaxed italic border-l-2 border-amber-500/30 pl-3 mb-8">
          <InlineReferenceText
            text={(d as typeof COPY.en).btbBoundary}
            locale={locale}
          />
        </p>
      )}

      {/* BBB/BTB Pathway F: Mechanism, Aging Synergy, and Arendash Paradox */}
      <section id="bbb-pathway-f" className="mb-16 border-t editorial-rule pt-6">
        <span id="bbb" />
        <h2 className="editorial-section-heading mb-3">
          {d.pathwayFHeading}
        </h2>
        <div className="space-y-4 text-sm text-foreground-muted leading-relaxed max-w-4xl">
          <p className="editorial-rail text-[0.95rem] text-foreground">
            {d.pathwayFIntroPara}
          </p>
          <p>
            <InlineReferenceText text={d.pathwayFGaoPara} locale={locale} />
          </p>
          <p>
            <InlineReferenceText text={d.pathwayFIOPPara} locale={locale} />
          </p>
          <p>
            <InlineReferenceText text={d.pathwayFUlusoyPara} locale={locale} />
          </p>
        </div>

        <div className="mt-6">
          <BBBMechanismDiagram locale={locale} />
        </div>

        <div className="mt-6 space-y-4 text-sm text-foreground-muted leading-relaxed max-w-4xl">
          <h3 className="text-sm font-semibold text-foreground">
            {d.threeParallelHeading}
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-card-border text-left text-xs text-foreground-muted uppercase tracking-wider">
                  <th className="py-2 pr-3">#</th>
                  <th className="py-2 pr-3">{d.thPathway}</th>
                  <th className="py-2 pr-3">{d.thEvidence}</th>
                  <th className="py-2">{d.thFrequency}</th>
                </tr>
              </thead>
              <tbody className="text-foreground-muted">
                <tr className="border-b border-card-border/40">
                  <td className="py-2 pr-3 font-mono-num">1</td>
                  <td className="py-2 pr-3">{"VGCC → Ca²⁺ → eNOS → NO → occludin/claudin ↓"}</td>
                  <td className="py-2 pr-3">
                    <StudyCitation referenceId="ulusoy2025_bbb_enos" locale={locale} label="Ulusoy 2025" />
                    {", "}
                    <StudyCitation referenceId="pall2013_v2" locale={locale} label="Pall 2013" />
                  </td>
                  <td className="py-2">27.12 MHz, RF</td>
                </tr>
                <tr className="border-b border-card-border/40">
                  <td className="py-2 pr-3 font-mono-num">2</td>
                  <td className="py-2 pr-3">{"p38MAPK → hsp27 → stress fibers → TJ"}</td>
                  <td className="py-2 pr-3"><StudyCitation referenceId="leszczynski2002_hsp27_bbb" locale={locale} label="Leszczynski 2002" /></td>
                  <td className="py-2">900 MHz (GSM)</td>
                </tr>
                <tr className="border-b border-card-border/40">
                  <td className="py-2 pr-3 font-mono-num">3</td>
                  <td className="py-2 pr-3">{d.miRNACell}</td>
                  <td className="py-2 pr-3"><StudyCitation referenceId="dasdag2015_wifi_mirna" locale={locale} label="Dasdag 2015" /></td>
                  <td className="py-2">2.4 GHz (Wi-Fi)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-6 space-y-4 text-sm text-foreground-muted leading-relaxed max-w-4xl">
          <h3 className="text-sm font-semibold text-foreground">
            {d.arendashParadoxHeading}
          </h3>
          <p>
            <InlineReferenceText text={d.arendashPara1} locale={locale} />
          </p>
          <p>
            <InlineReferenceText text={d.arendashPara2} locale={locale} />
          </p>
        </div>

        <div className="mt-6 space-y-4 text-sm text-foreground-muted leading-relaxed max-w-4xl">
          <h3 className="text-sm font-semibold text-foreground">
            {d.hospitalBBBHeading}
          </h3>
          <p>
            <InlineReferenceText text={d.hospitalBBBPara} locale={locale} />
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
                <td className="py-2 pr-3 font-medium text-foreground"><StudyCitation referenceId="gao2024_bbb_conformational" locale={locale} label="Gao ym. (Bioelectromagnetics)" /></td>
                <td className="py-2 pr-3 font-mono-num">2024</td>
                <td className="py-2">{d.findingGaoConformation}</td>
              </tr>
              <tr className="border-b border-card-border/40">
                <td className="py-2 pr-3 font-medium text-foreground"><StudyCitation referenceId="iop2026_bbb_scoping_review" locale={locale} label="IOP Science (Phys. Med. Biol.)" /></td>
                <td className="py-2 pr-3 font-mono-num">2026</td>
                <td className="py-2">{d.findingIOPScoping}</td>
              </tr>
              <tr className="border-b border-card-border/40">
                <td className="py-2 pr-3 font-medium text-foreground"><StudyCitation referenceId="ulusoy2025_bbb_enos" locale={locale} label="Ulusoy ym. (Iranian J Basic Med Sci)" /></td>
                <td className="py-2 pr-3 font-mono-num">2025</td>
                <td className="py-2">{d.findingUlusoyTherapeutic}</td>
              </tr>
              <tr className="border-b border-card-border/40">
                <td className="py-2 pr-3 font-medium text-foreground"><StudyCitation referenceId="arendash2010_temt_alzheimer" locale={locale} label="Arendash ym." /></td>
                <td className="py-2 pr-3 font-mono-num">2010</td>
                <td className="py-2">{d.findingArendashTEMT}</td>
              </tr>
              <tr className="border-b border-card-border/40">
                <td className="py-2 pr-3 font-medium text-foreground"><StudyCitation referenceId="aging_bbb_2015" locale={locale} label="Immunity & Ageing" /></td>
                <td className="py-2 pr-3 font-mono-num">2015</td>
                <td className="py-2">{d.findingAgingBBB}</td>
              </tr>
              <tr className="border-b border-card-border/40">
                <td className="py-2 pr-3 font-medium text-foreground"><StudyCitation referenceId="tang2015_900mhz_bbb" locale={locale} label="Tang ym." /></td>
                <td className="py-2 pr-3 font-mono-num">2015</td>
                <td className="py-2">{d.findingTangMemory}</td>
              </tr>
              <tr className="border-b border-card-border/40">
                <td className="py-2 pr-3 font-medium text-foreground"><StudyCitation referenceId="dasdag2015_wifi_mirna" locale={locale} label="Dasdag ym." /></td>
                <td className="py-2 pr-3 font-mono-num">2015</td>
                <td className="py-2">{d.findingDasdagMiRNA}</td>
              </tr>
              <tr className="border-b border-card-border/40">
                <td className="py-2 pr-3 font-medium text-foreground"><StudyCitation referenceId="leszczynski2002_hsp27_bbb" locale={locale} label="Leszczynski ym." /></td>
                <td className="py-2 pr-3 font-mono-num">2002</td>
                <td className="py-2">{d.findingLeszczynskiHsp27}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-xs text-foreground-muted italic mt-4 max-w-4xl">
          <InlineReferenceText text={d.epistemicBBB} locale={locale} />
        </p>
      </section>

      {/* Alzheimer's and the Calcium Upstream */}
      <section id="alzheimer-calcium" className="mb-16 border-t editorial-rule pt-6">
        <h2 className="editorial-section-heading mb-3">
          {d.alzheimerHeading}
        </h2>
        <div className="space-y-4 text-sm text-foreground-muted leading-relaxed max-w-4xl">
          <p className="editorial-rail text-[0.95rem] text-foreground">
            <InlineReferenceText text={d.alzheimerIntroPara} locale={locale} />
          </p>
          <p>
            <InlineReferenceText text={d.alzheimerBhattPara} locale={locale} />
          </p>
          <p>
            <InlineReferenceText
              text={d.alzheimerPresenilinPara}
              locale={locale}
            />
          </p>
          <p>
            {d.alzheimerFeedbackPara}
          </p>
          <p>
            <InlineReferenceText
              text={d.alzheimerArendashPara}
              locale={locale}
            />
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
                <td className="py-2 pr-3 font-medium text-foreground"><StudyCitation referenceId="pmc4909906_calcium_ad" locale={locale} label="PMC4909906" /></td>
                <td className="py-2 pr-3 font-mono-num">2016</td>
                <td className="py-2">{d.findingCaProximal}</td>
              </tr>
              <tr className="border-b border-card-border/40">
                <td className="py-2 pr-3 font-medium text-foreground"><StudyCitation referenceId="pmc3065491_bhatt_ca_oligomers" locale={locale} label="Bhatt ym. (PMC3065491)" /></td>
                <td className="py-2 pr-3 font-mono-num">2009</td>
                <td className="py-2">{d.findingCaOligomers}</td>
              </tr>
              <tr className="border-b border-card-border/40">
                <td className="py-2 pr-3 font-medium text-foreground"><StudyCitation referenceId="pmc7179355_oday_calcium" locale={locale} label="O'Day (PMC7179355)" /></td>
                <td className="py-2 pr-3 font-mono-num">2020</td>
                <td className="py-2">{d.findingCaEarly}</td>
              </tr>
              <tr className="border-b border-card-border/40">
                <td className="py-2 pr-3 font-medium text-foreground"><StudyCitation referenceId="pmc8125740_calcium_abeta" locale={locale} label="PMC8125740" /></td>
                <td className="py-2 pr-3 font-mono-num">2021</td>
                <td className="py-2">{d.findingCaHomeostasis}</td>
              </tr>
              <tr className="border-b border-card-border/40">
                <td className="py-2 pr-3 font-medium text-foreground"><StudyCitation referenceId="pmc7037278_presenilin_calcium" locale={locale} label="PMC7037278" /></td>
                <td className="py-2 pr-3 font-mono-num">2020</td>
                <td className="py-2">{d.findingPresenilinMutations}</td>
              </tr>
              <tr className="border-b border-card-border/40">
                <td className="py-2 pr-3 font-medium text-foreground"><StudyCitation referenceId="pmc8124842_anti_amyloid_failure" locale={locale} label="PMC8124842" /></td>
                <td className="py-2 pr-3 font-mono-num">2021</td>
                <td className="py-2">{d.findingAntiAmyloidFailed}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-xs text-foreground-muted italic mt-4 max-w-4xl">
          <InlineReferenceText text={d.epistemicAlzheimer} locale={locale} />
        </p>
      </section>

      {/* Hospital EMF Hypothesis */}
      <section id="hospital-emf" className="mb-16 border-t editorial-rule pt-6">
        <h2 className="editorial-section-heading mb-3">
          {d.hospitalEMFHeading}
        </h2>
        <div className="space-y-4 text-sm text-foreground-muted leading-relaxed max-w-4xl">
          <p className="editorial-rail text-[0.95rem] text-foreground">
            <InlineReferenceText text={d.hospitalEMFIntroPara} locale={locale} />
          </p>
          <p>
            <InlineReferenceText text={d.hospitalEMFBermPara} locale={locale} />
          </p>
          <p>
            {d.hospitalEMFModulomePara}
          </p>
          <p>
            <InlineReferenceText text={d.hospitalEMFHADPara} locale={locale} />
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
                <td className="py-2 pr-3 font-medium text-foreground"><StudyCitation referenceId="krumholz2013_phs" locale={locale} label="Krumholz (NEJM)" /></td>
                <td className="py-2 pr-3 font-mono-num">2013</td>
                <td className="py-2">{d.findingKrumholzPHS}</td>
              </tr>
              <tr className="border-b border-card-border/40">
                <td className="py-2 pr-3 font-medium text-foreground"><StudyCitation referenceId="pubmed10447544_icu_emf" locale={locale} label="PubMed 10447544" /></td>
                <td className="py-2 pr-3 font-mono-num">1999</td>
                <td className="py-2">{d.findingICUPollution}</td>
              </tr>
              <tr className="border-b border-card-border/40">
                <td className="py-2 pr-3 font-medium text-foreground"><StudyCitation referenceId="pmc12815752_hospital_rf" locale={locale} label="PMC12815752" /></td>
                <td className="py-2 pr-3 font-mono-num">2025</td>
                <td className="py-2">{d.findingHospitalRF}</td>
              </tr>
              <tr className="border-b border-card-border/40">
                <td className="py-2 pr-3 font-medium text-foreground"><StudyCitation referenceId="had2024_meta" locale={locale} label="Age and Ageing (meta)" /></td>
                <td className="py-2 pr-3 font-mono-num">2024</td>
                <td className="py-2">{d.findingHADMeta}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-xs text-foreground-muted italic mt-4 max-w-4xl">
          <InlineReferenceText text={d.epistemicHospital} locale={locale} />
        </p>
      </section>

      {/* See also navigation */}
      <section className="border-t editorial-rule pt-6">
        <h3 className="text-sm font-semibold text-foreground mb-3">{d.seeAlso}</h3>
        <div className="flex flex-col gap-2">
          <Link href={`/${locale}/evidence`} className="text-sm text-accent hover:underline">
            {d.evidencePortal} &rarr;
          </Link>
          <Link href={`/${locale}/modulome/brain`} className="text-sm text-accent hover:underline">
            {d.brainModulomeLink} &rarr;
          </Link>
        </div>
      </section>
    </div>
  );
}
