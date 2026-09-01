export interface ModulomeTarget {
  id: string;
  organEn: string;
  organFi: string;
  cav3Subtype: string;
  cellTypeEn: string;
  cellTypeFi: string;
  functionEn: string;
  functionFi: string;
  emfEvidenceEn: string;
  emfEvidenceFi: string;
  keyRefs: string[];
  level: string;
  bermPathway: string[];
  lindgrenChiEn: string;
  lindgrenChiFi: string;
  predictionEn: string;
  predictionFi: string;
  verified: boolean;
}

export const MODULOME_TARGETS: ModulomeTarget[] = [
  {
    id: "pituitary-gonadotroph",
    organEn: "Pituitary (Gonadotroph)",
    organFi: "Aivolisäke (Gonadotrooppi)",
    cav3Subtype: "Cav3 (T-type)",
    cellTypeEn: "Gonadotroph → FSH/LH",
    cellTypeFi: "Gonadotrooppi → FSH/LH",
    functionEn: "GnRH pulse decoding → FSH and LH secretion",
    functionFi: "GnRH-pulssin dekoodaus → FSH- ja LH-sekretio",
    emfEvidenceEn: "2.45 GHz RF-EMR significantly increased GnRH levels (2026, IJMS). LH release is driven mainly by Ca²⁺ increase. ELF-EMF modulates cellular calcium. 50 Hz 18 weeks decreased FSH in female rats. GnRH pulse FREQUENCY determines FSH/LH ratio — EMF perturbation of gonadotroph Ca²⁺ dynamics shifts this ratio.",
    emfEvidenceFi: "2,45 GHz RF-EMR nosti merkittävästi GnRH-tasoja (2026, IJMS). LH:n vapautuminen johtuu pääasiassa Ca²⁺:n noususta. ELF-EMF säätelee solun kalsiumia. 50 Hz 18 viikkoa laski FSH:ta naarasrotilla. GnRH-pulssin TAAJUUS määrää FSH/LH-suhteen — EMF:n häiriö gonadotroopin Ca²⁺-dynamiikassa siirtää tätä suhdetta.",
    keyRefs: ["ijms2026-hpg"],
    level: "M|C",
    bermPathway: ["A", "D"],
    lindgrenChiEn: "Pituitary is OUTSIDE BBB → direct vascular EMF access without barrier attenuation. T-type channels at bifurcation in gonadotroph. This is the THIRD independent EMF→TFR route.",
    lindgrenChiFi: "Aivolisäke on BBB:n ULKOPUOLELLA → suora vaskulaarinen EMF-pääsy ilman estevaimennusta. T-tyypin kanavat bifurkaatiossa gonadotroopissa. Tämä on KOLMAS itsenäinen EMF→TFR-reitti.",
    predictionEn: "FSH/LH pulsatile ratio is EMF-sensitive. Chronic EMF shifts the ratio → impaired follicle selection (women) and spermatogenesis support (men).",
    predictionFi: "FSH/LH-pulssisuhde on EMF-herkkä. Krooninen EMF siirtää suhdetta → heikentynyt follikkelivalinta (naiset) ja spermatogeneesin tuki (miehet).",
    verified: true,
  },
  {
    id: "adrenal-glomerulosa",
    organEn: "Adrenal Cortex (Zona glomerulosa)",
    organFi: "Lisämunuaiskuori (Zona glomerulosa)",
    cav3Subtype: "Cav3.2",
    cellTypeEn: "Glomerulosa cell → Aldosterone",
    cellTypeFi: "Glomerulosasolu → Aldosteroni",
    functionEn: "Aldosterone synthesis → sodium retention → blood pressure",
    functionFi: "Aldosteronisynteesi → natriumretentio → verenpaine",
    emfEvidenceEn: "Cell phone EMF 4-8 weeks significantly increased systolic blood pressure in ALL exposed rats. Plasma renin activity increased dose-dependently. Renin-angiotensin-aldosterone system activated.",
    emfEvidenceFi: "Matkapuhelimen EMF 4-8 viikkoa nosti merkittävästi systolista verenpainetta KAIKILLA altistuneilla rotilla. Plasman reniiniaktiivisuus nousi annosriippuvaisesti. Reniini-angiotensiini-aldosteronijärjestelmä aktivoitui.",
    keyRefs: ["mohamed-bp-emf"],
    level: "M|C",
    bermPathway: ["A"],
    lindgrenChiEn: "Cav3.2 in glomerulosa → T-type bifurcation at resting potential → aldosterone synthesis. Chronic EMF → chronic aldosterone → hypertension. Adrenal is NOT protected by BBB.",
    lindgrenChiFi: "Cav3.2 glomerulosassa → T-tyypin bifurkaatio lepopotentiaalissa → aldosteronisynteesi. Krooninen EMF → krooninen aldosteroni → verenpainetauti. Lisämunuainen EI ole BBB:n suojassa.",
    predictionEn: "Hypertension prevalence correlates with chronic EMF exposure after controlling for salt, obesity, and age.",
    predictionFi: "Verenpainetaudin esiintyvyys korreloi kroonisen EMF-altistuksen kanssa suolan, lihavuuden ja iän kontrolloinnin jälkeen.",
    verified: true,
  },
  {
    id: "pancreas-beta",
    organEn: "Pancreas (β-cell)",
    organFi: "Haima (β-solu)",
    cav3Subtype: "Cav1 (L-type) + Cav3 (T-type)",
    cellTypeEn: "β-cell → Insulin",
    cellTypeFi: "β-solu → Insuliini",
    functionEn: "Glucose-stimulated insulin secretion via VGCC → Ca²⁺",
    functionFi: "Glukoosistimuloitu insuliinisekretio VGCC → Ca²⁺ kautta",
    emfEvidenceEn: "Sakurai 2008: ELF reduced insulin secretion ~30% in hamster islets. Electric field stimulation induces insulin secretion via L-type VGCCs WITHOUT glucose. EMF decreased insulin levels and pancreatic islet area in exposed rats.",
    emfEvidenceFi: "Sakurai 2008: ELF vähensi insuliinisekreetiota ~30 % hamsterin saarekkeissa. Sähkökentän stimulaatio aiheuttaa insuliinisekreetiota L-tyypin VGCC:n kautta ILMAN glukoosia. EMF laski insuliinitasoja ja haiman saarekealaa altistuneilla rotilla.",
    keyRefs: ["sakurai2008"],
    level: "M|C",
    bermPathway: ["A"],
    lindgrenChiEn: "GLUCOSE-DEPENDENT χ: High glucose → K_ATP close → Vmem depolarizes → VGCCs primed → χ_β-cell MAXIMUM. Fasting → K_ATP open → χ_β-cell LOW. EMF × high-GI diet = synergistic diabetes risk.",
    lindgrenChiFi: "GLUKOOSIRIIPPUVAINEN χ: Korkea glukoosi → K_ATP sulkeutuu → Vmem depolarisoituu → VGCC:t viritetty → χ_β-solu MAKSIMI. Paasto → K_ATP auki → χ_β-solu MATALA. EMF × korkean GI:n ruokavalio = synergistinen diabetesriski.",
    predictionEn: "EMF effect on insulin is glucose-dependent. At high glucose: Ca²⁺ overload → β-cell exhaustion → diabetes. At low glucose: minimal effect.",
    predictionFi: "EMF:n vaikutus insuliiniin on glukoosiriippuvainen. Korkealla glukoosilla: Ca²⁺-ylikuormitus → β-solun uupuminen → diabetes. Matalalla glukoosilla: minimaalinen vaikutus.",
    verified: true,
  },
  {
    id: "hippocampus-dg",
    organEn: "Hippocampus (Dentate Gyrus)",
    organFi: "Hippokampus (Gyrus dentatus)",
    cav3Subtype: "Cav3.2 (highest T-type density in brain)",
    cellTypeEn: "Granule cells, neuronal progenitors",
    cellTypeFi: "Granuulisolut, hermoston kantasolut",
    functionEn: "Neurogenesis, memory consolidation, learning",
    functionFi: "Neurogeneesi, muistin konsolidaatio, oppiminen",
    emfEvidenceEn: "Pall 2022: 18 types of evidence for EMF → VGCC → Ca²⁺ → Alzheimer's. 34% brain cell death in 4 weeks of EMF exposure in rats — blocked by VGCC blocker amlodipine. BBB opening → amyloid entry.",
    emfEvidenceFi: "Pall 2022: 18 tyyppistä näyttöä EMF → VGCC → Ca²⁺ → Alzheimer -ketjulle. 34 % aivosolujen kuolema 4 viikossa EMF-altistusta rotilla — estetty VGCC-salpaajalla amlodipiinilla. BBB:n avautuminen → amyloidin pääsy.",
    keyRefs: ["pall2022-ad"],
    level: "M|C",
    bermPathway: ["A", "F"],
    lindgrenChiEn: "Double hit: (1) Cav3.2 bifurcation in DG → chronic Ca²⁺ → amyloid cascade. (2) BBB opening → blood-borne Aβ enters brain. Both converge on hippocampus. Age amplifies via mitochondrial χ.",
    lindgrenChiFi: "Kaksoisosuma: (1) Cav3.2-bifurkaatio DG:ssä → krooninen Ca²⁺ → amyloidikaskadi. (2) BBB:n avautuminen → veren Aβ pääsee aivoihin. Molemmat yhtyvät hippokampukseen. Ikä vahvistaa mitokondriaalisella χ:llä.",
    predictionEn: "Alzheimer's onset age correlates inversely with cumulative EMF exposure. VGCC blocker slows progression.",
    predictionFi: "Alzheimerin alkamisikä korreloi käänteisesti kumulatiivisen EMF-altistuksen kanssa. VGCC-salpaaja hidastaa etenemistä.",
    verified: true,
  },
  {
    id: "heart-sa-node",
    organEn: "Heart (SA Node + Ventricles)",
    organFi: "Sydän (SA-solmu + kammiot)",
    cav3Subtype: "Cav3 (SA pacemaking) + Cav1.2 (contraction)",
    cellTypeEn: "Pacemaker cells, cardiomyocytes",
    cellTypeFi: "Tahdistinsolut, kardiomyosyytit",
    functionEn: "Heart rate, rhythm, contractile force",
    functionFi: "Syketaajuus, rytmi, supistusvoima",
    emfEvidenceEn: "Blood pressure elevation in EMF-exposed rats (Mohamed). Left ventricular hypertrophy from chronic hypertension. TRPC channels confirmed in ventricular myocytes (arrhythmia substrate). CRY2-TRPC1 in myoblasts (Yap 2025).",
    emfEvidenceFi: "Verenpaineen nousu EMF-altistetuilla rotilla (Mohamed). Vasemman kammion hypertrofia kroonisesta hypertensiosta. TRPC-kanavat vahvistettu kammioiden lihassoluissa (arytmia-substraatti). CRY2-TRPC1 myoblasteissa (Yap 2025).",
    keyRefs: ["mohamed-bp-emf"],
    level: "M",
    bermPathway: ["A"],
    lindgrenChiEn: "SA node T-type channels → pacemaking. EMF perturbation → HRV reduction → autonomic imbalance. Ventricular L-type → contractile dysfunction at high chronic Ca²⁺.",
    lindgrenChiFi: "SA-solmun T-tyypin kanavat → tahdistus. EMF-häiriö → HRV:n lasku → autonominen epätasapaino. Kammioiden L-tyyppi → kontraktiilinen toimintahäiriö korkealla kroonisella Ca²⁺:lla.",
    predictionEn: "Chronic EMF exposure reduces HRV. Nighttime phone use → arrhythmia risk.",
    predictionFi: "Krooninen EMF-altistus vähentää HRV:tä. Yöllinen puhelinkäyttö → arytmiariski.",
    verified: false,
  },
  {
    id: "thyroid-hpt",
    organEn: "Thyroid (via Pituitary Thyrotroph)",
    organFi: "Kilpirauhanen (aivolisäkkeen tyreotrooppi)",
    cav3Subtype: "Cav3 (thyrotroph) → TSH",
    cellTypeEn: "Thyrotroph → TSH → Thyrocyte",
    cellTypeFi: "Tyreotrooppi → TSH → Tyreosyytti",
    functionEn: "Thyroid hormone synthesis (T3, T4)",
    functionFi: "Kilpirauhashormonien synteesi (T3, T4)",
    emfEvidenceEn: "Systematic review (F1000Research): 5 observational studies found EMF → hypothyroidism. Workers >33 h/month phone use → lower TSH. LTE in mice: T3 increased, Dio2/Dio3 expression decreased. Thyroid location (anterior neck) → direct phone exposure.",
    emfEvidenceFi: "Systemaattinen katsaus (F1000Research): 5 havainnointitutkimusta löysi EMF → kilpirauhasen vajaatoiminta. Työntekijät >33 h/kk puhelinkäyttöä → matalampi TSH. LTE hiirillä: T3 nousi, Dio2/Dio3-ilmentyminen laski. Kilpirauhasen sijainti (kaulan etuosa) → suora puhelinaltistus.",
    keyRefs: ["thyroid-sysrev-2024", "lte-thyroid-2024"],
    level: "M|C",
    bermPathway: ["A", "D"],
    lindgrenChiEn: "Two-level attack: (1) Pituitary thyrotroph Cav3 → TSH dysregulation (OUTSIDE BBB). (2) Thyroid in anterior neck → maximum phone-proximity exposure.",
    lindgrenChiFi: "Kaksitasoinen hyökkäys: (1) Aivolisäkkeen tyreotrooppi Cav3 → TSH:n säätelyn häiriö (BBB:n ULKOPUOLELLA). (2) Kilpirauhanen kaulan etuosassa → maksimaalinen puhelinläheisyysaltistus.",
    predictionEn: "Hypothyroidism prevalence correlates with mobile phone adoption. T-type blocker protects thyroid function.",
    predictionFi: "Kilpirauhasen vajaatoiminnan esiintyvyys korreloi matkapuhelimen yleistymisen kanssa. T-tyypin salpaaja suojaa kilpirauhasen toimintaa.",
    verified: true,
  },
];
