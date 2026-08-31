import type { Metadata } from "next";
import Link from "next/link";
import { BarChart3 } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { BermIcon } from "@/components/BermIcon";
import { ThreeChannelDiagram } from "@/components/ThreeChannelDiagram";
import { RetrodictionCards } from "@/components/RetrodictionCards";
import { CitationLink } from "@/components/CitationLink";
import { InlineReferenceText } from "@/components/InlineReferenceText";
import { pickCopy } from "@/lib/i18n";

const COPY = {
  en: {
    title: "Population & Epidemiological Evidence",
    subtitle: "COVID lockdown natural experiment, electrification boundary, mobile phone paradox, 5G testicular evidence, ambient assessment, and the Kaiser Permanente series.",
    backLink: "← Back to Evidence",
    seeAlso: "See also",
    evidenceLink: "Evidence Register →",
    cascadesLink: "Disease Cascade Timelines →",
    narratives: [
      {
        id: "covid",
        title: "COVID-19 lockdown validates three-channel prediction",
        paragraphs: [
          "Multiple studies report improved semen parameters during strict lockdown periods. A Chinese cohort ([[ref:chinese_lockdown_cohort_41036143|PubMed 41036143]]) found sperm concentration and motility increased during home confinement. [[ref:zhang2025_post_lockdown_semen|Zhang]] et al. 2025 observed that semen quality declined again when restrictions were lifted, consistent with a reversible environmental component.",
          "The three-channel model predicted this outcome: sperm quality improved while mental health declined because each frequency channel affects different tissues. The intermediate frequency (IF) channel (300 Hz – 1 MHz), which affects cell division through the same frequency-cell size relationship as FDA-approved TTFields cancer therapy, dropped dramatically during lockdown because office environments with hundreds of LED fixtures, HVAC variable frequency drives, and power electronics were eliminated. At environmental intensities (0.01–3 V/m), the IF mechanism operates via Ion Forced Oscillation (IFO-VGIC, threshold 10⁻⁵ V/m — [[ref:panagopoulos2025_ifo|Panagopoulos 2025]]), not via dielectrophoresis which requires TTFields-level intensity (100–300 V/m). A typical office floor has 200–500 LED fixtures versus 15–20 at home — a 10–25× difference in IF sources. The RF channel (> 1 MHz), which affects circadian and neuropsychological pathways, increased 30–50% because screen time and device usage rose. Two different frequencies, two different mechanisms, two different tissues, two different directions — exactly what the three-channel model predicts.",
          "The sentinel species result confirms the outdoor component: COLOSS data shows bee colony winter loss increased by 2.27 percentage points during COVID (24/35 countries worsened, p = 0.043). BBS birds also declined 2.8–3.0% in 2020–22. Bees and birds remained in outdoor environments where ambient RF from cell towers continued uninterrupted, while human sperm quality benefited from reduced indoor IF exposure.",
        ],
        studies: [
          { citation: "Chinese lockdown cohort (PubMed 41036143)", year: 2024, referenceId: "chinese_lockdown_cohort_41036143", note: "Sperm quality improvement during confinement" },
          { citation: "Zhang et al.", year: 2025, referenceId: "zhang2025_post_lockdown_semen", note: "Quality decline after restriction lifting (reverse lockdown effect)" },
          { citation: "COLOSS winter loss panel", year: "2020–22", referenceId: "coloss_winter_loss_panel_2020_2022", note: "Counter-result: bees worsened (+2.27 pp, outdoor RF unchanged)" },
          { citation: "Optune TTFields (FDA PMA)", year: 2015, referenceId: "ttfields_novocure_fda", note: "IF fields (100–300 kHz) disrupt cell division — same frequency as LED drivers" },
        ],
      },
      {
        id: "electrification-boundary",
        title: "The electrification boundary",
        paragraphs: [
          "The IFO-VGIC activation threshold (10⁻⁵ V/m, [[ref:panagopoulos2025_ifo|Panagopoulos 2025]]) is so low that every household appliance exceeds it at operating distance. This means the electrification boundary — whether a household has electricity or not — IS the biological exposure boundary. A person without electricity lives permanently below the IFO threshold. A person with electricity lives above it 24/7.",
          "This is a binary threshold, not a gradient. Education, income, and contraception access are all gradients — more is gradually different from less. Only EMF exposure has a physical threshold that maps to an infrastructure boundary. This structural difference produces a testable prediction: adjusting national electricity consumption by the fraction of the population with access should improve TFR prediction. It does: correlation improves from r = −0.864 to r = −0.885 (54 countries, LOOCV full-model RMSE 0.522).",
          "In partially electrified countries, the unelectrified population lives in the electromagnetic environment that evolution calibrated biological sensors for. Their TFR should be near the biological maximum (~6.5). National TFR is a mixture of the electrified (lower TFR) and unelectrified (higher TFR) populations. Correcting for this, Nigeria's electrified population (55%) has an estimated TFR of 4.03, Ethiopia's (51%) has 1.89, and Uganda's (42%) has 1.86 — dramatically lower than their national averages.",
        ],
        studies: [
          { citation: "Panagopoulos et al. (Frontiers in Public Health)", year: 2025, referenceId: "panagopoulos2025_ifo", note: "IFO-VGIC threshold 10⁻⁵ V/m for polarized fields" },
          { citation: "Belmin et al. (Nature Sustainability)", year: 2022, referenceId: "belmin2022_nature_sustainability", note: "155 DHS surveys: electricity access negatively affects fertility" },
          { citation: "DeLong et al. (PLOS ONE)", year: 2010, referenceId: "delong2010_plosone", note: "Energy consumption negatively related to population growth" },
          { citation: "BERM v17.1 formula discovery", year: 2026, referenceId: "nations2024", note: "54 countries, LOOCV full-model RMSE 0.522, R² 0.851" },
        ],
      },
      {
        id: "mobile-paradox",
        title: "The mobile phone paradox",
        paragraphs: [
          "Mobile phone subscriptions per 100 people — intuitively the most direct EMF proxy — is the WEAKEST single predictor of TFR across 54 countries (RMSE 1.053, worse than GDP alone at 0.719). Residential electricity consumption is the BEST (univariate RMSE 0.533 in exponential form).",
          "This is paradoxical only if EMF exposure comes from phones. BERM's three-channel model resolves it: a mobile phone is one device in one channel (RF), used intermittently. Residential electricity measures the entire electromagnetic environment — every light, every appliance, every wire in every wall, the 50/60 Hz field that permeates the home 24 hours a day.",
          "If the mechanism were 'information access' (TV, internet, phone), the mobile phone should be the BEST proxy because it IS the information device. The fact that it is the WORST proxy, while electricity consumption (which measures physical infrastructure, not information) is the BEST, is structurally consistent with EMF exposure rather than information access as the mechanism.",
        ],
        studies: [
          { citation: "BERM v17.1 cross-sectional analysis", year: 2026, referenceId: "nations2024", note: "Mobile RMSE 1.053 vs electricity univariate RMSE 0.533 (54 countries)" },
          { citation: "World Bank Development Indicators", year: 2024, referenceId: "world_bank_wdi_2024", note: "Source for residential electricity, broadband, mobile data" },
        ],
      },
      {
        id: "5g-testis-ros",
        title: "5G-frequency testicular evidence ([[ref:bektas2026|Bektas]] 2026)",
        paragraphs: [
          "[[ref:bektas2026|Bektas]] et al. (2026, Bioelectromagnetics, bem.70043) provide the first 5G-frequency-specific testicular data: rats exposed to 3.5 GHz RF radiation (the 5G core frequency) showed testicular and oxidative damage, with decreased testis antioxidant capacity. CoQ10 supplementation ameliorated the damage, demonstrating mechanism reversibility. This operates directly on the Level 5A→6 edge (ROS → sperm cascade) and extends the oxidative stress evidence base ([[ref:yakymenko2016|Yakymenko]] 2016: 93/100; [[ref:panagopoulos2025|Panagopoulos 2025]]: 95%) to the 5G frequency range.",
          "The tissue-specific nature of this damage is underscored by contemporaneous high-quality null results in skin cells: [[ref:meyer2026|Meyer]] et al. (2026, Bioelectromagnetics, bem.70046) found no cell viability change, DNA damage, or micronucleus formation in HaCaT keratinocytes at 50 Hz, 200 µT (blinded sham-controlled, WST-1, alkaline comet assay, micronucleus/CREST); [[ref:haidar2025_5g_skin_null|Haidar]] et al. (2025, Scientific Reports) found no effect on basal ROS or DNA damage in fibroblasts and keratinocytes at 5G-modulated 3.5 GHz (SAR 0.08 and 4 W/kg, 20–48h). Same or similar frequencies, different tissues, different outcomes — consistent with BERM's χ(Ā) selection rule where response depends on tissue-specific VGIC density, mitochondrial ROS capacity, and Ca²⁺ store architecture. Both possibilities (tissue specificity or insufficient effect) should be kept open.",
          "Important: Lab baseline bias is symmetric. It does not only explain negative results — it also means that positive results underestimate the true effect size. When a study finds that RF exposure increases ROS by 30% compared to sham controls, the actual increase relative to a truly unexposed baseline may be larger, because sham controls are themselves partially exposed. This systematic underestimation affects all in vitro EMF research, not selectively.",
        ],
        studies: [
          { citation: "Bektas et al. (Bioelectromagnetics)", year: 2026, referenceId: "bektas2026", note: "3.5 GHz → testicular ROS damage; CoQ10 ameliorates. First 5G-frequency testicular data." },
          { citation: "Meyer et al. (Bioelectromagnetics)", year: 2026, referenceId: "meyer2026", note: "50 Hz, 200 µT, HaCaT keratinocytes: no viability change, no DNA damage. Blinded sham-controlled." },
          { citation: "Haidar et al. (Scientific Reports)", year: 2025, referenceId: "haidar2025_5g_skin_null", note: "5G-modulated 3.5 GHz, fibroblasts + keratinocytes: no ROS, no DNA damage (CPD). High-quality null." },
        ],
      },
      {
        id: "5g-ambient-spectral",
        title: "5G ambient exposure assessment ([[ref:deprez2025|Deprez]] 2025)",
        paragraphs: [
          "[[ref:deprez2025|Deprez]] et al. (2025, Bioelectromagnetics, bem.70019) present spectral measurements of 5G RF-EMF exposure levels in four European countries — the first quantitative ambient data relevant to BERM's Level 3 calibration at 5G frequencies. 5G beam-formed signals produce different spatial exposure patterns than 2G/3G/4G: directed beams may create higher instantaneous personal exposures but lower background ambient. This changes the ambient/personal ratio in BERM's two-channel model (total = ambient + χ(Ā) × personal): ambient decreases relative to 4G while personal increases transiently, producing different χ(Ā) dynamics.",
        ],
        studies: [
          { citation: "Deprez et al. (Bioelectromagnetics)", year: 2025, referenceId: "deprez2025", note: "5G spectral exposure assessment, 4 European countries. Beamforming changes ambient/personal ratio." },
        ],
      },
    ],
  },
  fi: {
    title: "Väestö- ja epidemiologinen evidenssi",
    subtitle: "COVID-lockdownin luonnollinen koe, sähköistymisraja, matkapuhelinparadoksi, 5G-testisevidenssi, ambient-arviointi ja Kaiser Permanente -sarja.",
    backLink: "← Takaisin evidenssiin",
    seeAlso: "Katso myös",
    evidenceLink: "Evidenssirekisteri →",
    cascadesLink: "Tautikaskadien aikajanat →",
    narratives: [
      {
        id: "covid",
        title: "COVID-19-lockdown vahvistaa kolmikanavaennusteen",
        paragraphs: [
          "Useat tutkimukset raportoivat parantuneen siemennesteen laadun tiukkojen lockdown-jaksojen aikana. Kiinalainen kohortti ([[ref:chinese_lockdown_cohort_41036143|PubMed 41036143]]) havaitsi siittiökonsentraation ja liikkuvuuden kasvaneen kotieristyksen aikana. [[ref:zhang2025_post_lockdown_semen|Zhang]] ym. 2025 havaitsivat, että siemennesteen laatu laski jälleen rajoitusten purkamisen jälkeen, mikä on yhteensopivaa palautuvan ympäristötekijän kanssa.",
          "Kolmikanavamalli ennusti tämän tuloksen: siittiölaatu parani mutta mielenterveys heikkeni, koska kukin taajuuskanava vaikuttaa eri kudoksiin. Välitaajuuskanava (IF, 300 Hz – 1 MHz), joka vaikuttaa solunjakautumiseen saman taajuus-solukoko-suhteen kautta kuin FDA:n hyväksymä TTFields-syöpähoito, laski dramaattisesti lockdownin aikana, koska toimistoympäristöt satojen LED-valaisimien, HVAC-taajuusmuuttajien ja tehoelektroniikan kanssa poistuivat. Ympäristöintensiteeteillä (0,01–3 V/m) IF-mekanismi toimii ionien pakotetun oskillaation kautta (IFO-VGIC, kynnys 10⁻⁵ V/m — [[ref:panagopoulos2025_ifo|Panagopoulos 2025]]), ei dielektroforeesin kautta, joka vaatii TTFields-tason intensiteetin (100–300 V/m). Tyypillisessä toimistokerroksessa on 200–500 LED-valaisinta verrattuna kodin 15–20:een — 10–25-kertainen ero IF-lähteissä. RF-kanava (> 1 MHz), joka vaikuttaa sirkadiaanisiin ja neuropsykologisiin reitteihin, kasvoi 30–50 % ruutuajan ja laitekäytön lisääntyessä. Kaksi eri taajuutta, kaksi eri mekanismia, kaksi eri kudosta, kaksi eri suuntaa — juuri mitä kolmikanavamalli ennustaa.",
          "Sentinellilajien tulos vahvistaa ulkokomponentin: COLOSS-data osoittaa mehiläispesien talvihäviön kasvaneen 2,27 prosenttiyksikköä COVIDin aikana (24/35 maata heikkeni, p = 0,043). BBS-linnut laskivat myös 2,8–3,0 % vuosina 2020–22. Mehiläiset ja linnut pysyivät ulkoympäristöissä, joissa tukiasemien ambient-RF jatkui keskeytyksettä, kun taas ihmisten siittiölaatu hyötyi vähentyneestä sisätilojen IF-altistuksesta.",
        ],
        studies: [
          { citation: "Kiinalainen lockdown-kohortti (PubMed 41036143)", year: 2024, referenceId: "chinese_lockdown_cohort_41036143", note: "Siittiölaadun paraneminen eristyksen aikana" },
          { citation: "Zhang ym.", year: 2025, referenceId: "zhang2025_post_lockdown_semen", note: "Laadun lasku rajoitusten purkamisen jälkeen (käänteinen lockdown-efekti)" },
          { citation: "COLOSS-talvihäviöpaneeli", year: "2020–22", referenceId: "coloss_winter_loss_panel_2020_2022", note: "Vastatulos: mehiläiset heikkenivät (+2,27 pp, ulko-RF ennallaan)" },
          { citation: "Optune TTFields (FDA PMA)", year: 2015, referenceId: "ttfields_novocure_fda", note: "IF-kentät (100–300 kHz) häiritsevät solunjakautumista — sama taajuus kuin LED-hakkurit" },
        ],
      },
      {
        id: "electrification-boundary",
        title: "Sähköistymisraja",
        paragraphs: [
          "IFO-VGIC-aktivaatiokynnys (10⁻⁵ V/m, [[ref:panagopoulos2025_ifo|Panagopoulos 2025]]) on niin matala, että jokainen kodin sähkölaite ylittää sen käyttöetäisyydellä. Tämä tarkoittaa, että sähköistymisraja — onko kotitaloudella sähköä vai ei — ON biologisen altistuksen raja. Ihminen ilman sähköä elää pysyvästi IFO-kynnyksen alapuolella. Ihminen jolla on sähkö elää sen yläpuolella 24/7.",
          "Tämä on binäärinen kynnys, ei gradientti. Koulutus, tulot ja ehkäisyn saatavuus ovat kaikki gradientteja — enemmän on asteittain erilaista kuin vähemmän. Vain EMF-altistuksella on fysikaalinen kynnys joka vastaa infrastruktuurirajaa. Tämä rakenteellinen ero tuottaa testattavan ennusteen: kansallisen sähkönkulutuksen korjaaminen sähköistetyn väestöosuuden mukaan parantaa TFR-ennustetta. Näin käy: korrelaatio paranee r = −0,864:stä r = −0,885:een (54 maata, LOOCV kokonaismallin RMSE 0,522).",
          "Osittain sähköistetyissä maissa sähköistämätön väestö elää sähkömagneettisessa ympäristössä, johon evoluutio kalibroi biologiset sensorit. Heidän TFR:nsä tulisi olla lähellä biologista maksimia (~6,5). Kansallinen TFR on sekoitus sähköistettyä (matalampi TFR) ja sähköistämätöntä (korkeampi TFR) väestöä. Korjattuna Nigerian sähköistetyn väestön (55 %) arvioitu TFR on 4,03, Etiopian (51 %) 1,89 ja Ugandan (42 %) 1,86 — dramaattisesti kansallisia keskiarvoja matalampia.",
        ],
        studies: [
          { citation: "Panagopoulos ym. (Frontiers in Public Health)", year: 2025, referenceId: "panagopoulos2025_ifo", note: "IFO-VGIC-kynnys 10⁻⁵ V/m polarisoituneille kentille" },
          { citation: "Belmin ym. (Nature Sustainability)", year: 2022, referenceId: "belmin2022_nature_sustainability", note: "155 DHS-kyselyjä: sähkön saatavuus vähentää hedelmällisyyttä" },
          { citation: "DeLong ym. (PLOS ONE)", year: 2010, referenceId: "delong2010_plosone", note: "Energiankulutus negatiivisesti yhteydessä väestönkasvuun" },
          { citation: "BERM v17.1 kaavanlöytö", year: 2026, referenceId: "nations2024", note: "54 maata, LOOCV kokonaismallin RMSE 0,522, R² 0,851" },
        ],
      },
      {
        id: "mobile-paradox",
        title: "Matkapuhelinparadoksi",
        paragraphs: [
          "Matkapuhelinliittymät sataa henkeä kohti — intuitiivisesti suorin EMF-proxy — on HEIKOIN yksittäinen TFR-ennustaja 54 maassa (RMSE 1,053, heikompi kuin BKT yksinään 0,719). Asumisen sähkönkulutus on PARAS (univariaatti-RMSE 0,533 eksponentiaalisessa muodossa).",
          "Tämä on paradoksaalista vain jos EMF-altistus tulee puhelimista. BERM:n kolmikanavamalli ratkaisee sen: matkapuhelin on yksi laite yhdellä kanavalla (RF), käytetty ajoittain. Asumisen sähkönkulutus mittaa koko sähkömagneettista ympäristöä — jokainen valo, jokainen kodinlaite, jokainen johto jokaisessa seinässä, 50/60 Hz kenttä joka läpäisee kodin 24 tuntia vuorokaudessa.",
          "Jos mekanismi olisi 'tiedon saatavuus' (TV, internet, puhelin), matkapuhelimen pitäisi olla PARAS proxy koska se ON tietolaite. Se, että se on HUONOIN proxy kun sähkönkulutus (joka mittaa fyysistä infrastruktuuria, ei tietoa) on PARAS, on rakenteellisesti yhdenmukaista EMF-altistuksen kanssa pikemmin kuin tiedonsaannin mekanismina.",
        ],
        studies: [
          { citation: "BERM v17.1 poikkileikkausanalyysi", year: 2026, referenceId: "nations2024", note: "Matkapuhelin RMSE 1,053 vs sähkö univariaatti-RMSE 0,533 (54 maata)" },
          { citation: "Maailmanpankin kehitysindikaattorit", year: 2024, referenceId: "world_bank_wdi_2024", note: "Lähde: asumisen sähkö, laajakaista, matkapuhelindata" },
        ],
      },
      {
        id: "5g-testis-ros",
        title: "5G-taajuusspesifinen testisevidenssi ([[ref:bektas2026|Bektas]] 2026)",
        paragraphs: [
          "[[ref:bektas2026|Bektas]] ym. (2026, Bioelectromagnetics, bem.70043) tarjoavat ensimmäisen 5G-taajuusspesifisen testisdatan: rotat altistettiin 3,5 GHz RF-säteilylle (5G:n ydintaajuus), jolloin havaittiin testis- ja oksidatiivinen vaurio sekä heikentynyt testiksen antioksidanttikapasiteetti. CoQ10-lisäravinto lievitti vauriota, osoittaen mekanismin palautuvuuden. Tämä toimii suoraan tason 5A→6 nuolella (ROS → siittiökaskadi) ja laajentaa oksidatiivisen stressin evidenssipohjan ([[ref:yakymenko2016|Yakymenko]] 2016: 93/100; [[ref:panagopoulos2025|Panagopoulos 2025]]: 95 %) 5G-taajuusalueelle.",
          "Vaurion kudosspesifisyyttä korostavat samanaikaiset laadukkaat nollatulokset ihosoluissa: [[ref:meyer2026|Meyer]] ym. (2026, Bioelectromagnetics, bem.70046) eivät löytäneet solujen elinvoimaisuusmuutosta, DNA-vauriota eikä mikronukleusmuodostusta HaCaT-keratinosyyteissä 50 Hz, 200 µT:ssa (sokkoutettu, sham-kontrolloitu, WST-1, komet, mikronukleus/CREST); [[ref:haidar2025_5g_skin_null|Haidar]] ym. (2025, Scientific Reports) eivät löytäneet vaikutusta basaaliin ROS-tasoon eikä DNA-vauriota fibroblasteissa ja keratinosyyteissä 5G-moduloidulla 3,5 GHz:llä (SAR 0,08 ja 4 W/kg, 20–48 h). Samat tai vastaavat taajuudet, eri kudokset, eri tulokset — yhdenmukainen BERM:n χ(Ā)-valintasäännön kanssa, jossa vaste riippuu kudosspesifisestä VGIC-tiheydestä, mitokondrioiden ROS-kapasiteetista ja Ca²⁺-varastojen arkkitehtuurista. Molemmat mahdollisuudet (kudosspesifisyys tai riittämätön vaikutus) on pidettävä avoimina.",
          "Tärkeää: Laboratorion lähtötasovinouma on symmetrinen. Se ei selitä ainoastaan negatiivisia tuloksia — se tarkoittaa myös, että positiiviset tulokset aliarvioivat todellista vaikutuskokoa. Kun tutkimus havaitsee RF-altistuksen nostavan ROS:ia 30 % sham-kontrolleihin verrattuna, todellinen nousu altistamattomaan lähtötasoon nähden voi olla suurempi, koska sham-kontrollit ovat itsekin osittain altistuneet. Tämä systemaattinen aliarviointi koskee kaikkea in vitro EMF-tutkimusta, ei valikoivasti.",
        ],
        studies: [
          { citation: "Bektas ym. (Bioelectromagnetics)", year: 2026, referenceId: "bektas2026", note: "3,5 GHz → testis-ROS-vaurio; CoQ10 lievittää. Ensimmäinen 5G-taajuusspesifinen testisdata." },
          { citation: "Meyer ym. (Bioelectromagnetics)", year: 2026, referenceId: "meyer2026", note: "50 Hz, 200 µT, HaCaT-keratinosyytit: ei elinvoimaisuusmuutosta, ei DNA-vauriota. Sokkoutettu sham-kontrolloitu." },
          { citation: "Haidar ym. (Scientific Reports)", year: 2025, referenceId: "haidar2025_5g_skin_null", note: "5G-moduloitu 3,5 GHz, fibroblastit + keratinosyytit: ei ROS:ia, ei DNA-vauriota (CPD). Laadukas nollatulos." },
        ],
      },
      {
        id: "5g-ambient-spectral",
        title: "5G:n ambient-altistusarviointi ([[ref:deprez2025|Deprez]] 2025)",
        paragraphs: [
          "[[ref:deprez2025|Deprez]] ym. (2025, Bioelectromagnetics, bem.70019) esittävät 5G RF-EMF -altistustasojen spektraalimittaukset neljässä Euroopan maassa — ensimmäistä kvantitatiivista ambient-dataa BERM:n tason 3 kalibrointiin 5G-taajuuksilla. 5G:n suunnatut keilat tuottavat erilaisia spatiaalisia altistuskuvioita kuin 2G/3G/4G: suunnatut keilat voivat luoda korkeampia hetkellisiä henkilökohtaisia altistuksia mutta matalamman taustakomponentin. Tämä muuttaa ambient/personal-suhdetta BERM:n kaksikanavamallissa (total = ambient + χ(Ā) × personal): ambient laskee suhteessa 4G:hen, personal nousee hetkittäin → eri χ(Ā)-dynamiikka.",
        ],
        studies: [
          { citation: "Deprez ym. (Bioelectromagnetics)", year: 2025, referenceId: "deprez2025", note: "5G:n spektraalinen altistusarviointi, 4 Euroopan maata. Suunnattu keila muuttaa ambient/personal-suhdetta." },
        ],
      },
    ],
  },
  ja: {
    title: "人口および疫学的エビデンス",
    subtitle: "COVID封鎖の自然実験、電化境界、携帯電話パラドックス、5G精巣エビデンス、環境評価、およびKaiser Permanenteシリーズ。",
    backLink: "← エビデンスに戻る",
    seeAlso: "関連項目",
    evidenceLink: "エビデンス登録 →",
    cascadesLink: "疾患カスケードタイムライン →",
    narratives: [
      {
        id: "covid",
        title: "COVID-19ロックダウンが3チャネル予測を検証",
        paragraphs: [
          "複数の研究が厳格なロックダウン期間中の精液パラメータの改善を報告している。中国のコホート（[[ref:chinese_lockdown_cohort_41036143|PubMed 41036143]]）は自宅隔離中に精子濃度と運動性が増加したことを発見した。[[ref:zhang2025_post_lockdown_semen|Zhang]] et al. 2025は制限解除後に精液の質が再び低下したことを観察し、可逆的な環境成分と一致している。",
          "3チャネルモデルはこの結果を予測した：精子の質は改善したが精神的健康は悪化した。各周波数チャネルが異なる組織に影響するためである。中間周波数(IF)チャネル（300 Hz – 1 MHz）はFDA承認のTTFieldsがん治療と同じ周波数-細胞サイズ関係を通じて細胞分裂に影響するが、数百のLED照明、HVACインバータ、パワーエレクトロニクスを備えたオフィス環境が排除されたためロックダウン中に劇的に低下した。環境強度（0.01–3 V/m）ではIFメカニズムはイオン強制振動（IFO-VGIC、閾値10⁻⁵ V/m — [[ref:panagopoulos2025_ifo|Panagopoulos 2025]]）を介して作動し、TTFieldsレベルの強度（100–300 V/m）を必要とする誘電泳動を介さない。典型的なオフィスフロアには200–500のLED照明があり家庭の15–20と比較して — IF源で10–25倍の差である。RFチャネル（> 1 MHz）は概日および神経心理学的経路に影響しスクリーン時間とデバイス使用の増加により30–50%増加した。2つの異なる周波数、2つの異なるメカニズム、2つの異なる組織、2つの異なる方向 — まさに3チャネルモデルが予測することである。",
          "歩哨種の結果は屋外成分を確認する：COLOSSデータはCOVID期間中にミツバチのコロニー冬季損失が2.27パーセントポイント増加したことを示す（24/35か国で悪化、p = 0.043）。BBS鳥類も2020–22年に2.8–3.0%減少した。ミツバチと鳥類は携帯電話基地局からの環境RFが中断なく続いた屋外環境に留まったが、人間の精子の質は屋内IF曝露の減少から恩恵を受けた。",
        ],
        studies: [
          { citation: "中国ロックダウンコホート（PubMed 41036143）", year: 2024, referenceId: "chinese_lockdown_cohort_41036143", note: "隔離中の精子の質の改善" },
          { citation: "Zhang et al.", year: 2025, referenceId: "zhang2025_post_lockdown_semen", note: "制限解除後の品質低下（逆ロックダウン効果）" },
          { citation: "COLOSS冬季損失パネル", year: "2020–22", referenceId: "coloss_winter_loss_panel_2020_2022", note: "逆の結果：ミツバチは悪化（+2.27 pp、屋外RF不変）" },
          { citation: "Optune TTFields (FDA PMA)", year: 2015, referenceId: "ttfields_novocure_fda", note: "IF場（100–300 kHz）が細胞分裂を撹乱 — LEDドライバと同じ周波数" },
        ],
      },
      {
        id: "electrification-boundary",
        title: "電化境界",
        paragraphs: [
          "IFO-VGIC活性化閾値（10⁻⁵ V/m、[[ref:panagopoulos2025_ifo|Panagopoulos 2025]]）は非常に低く、あらゆる家庭用電気製品が作動距離でそれを超える。これは電化境界 — 家庭に電気があるかないか — が生物学的曝露境界であることを意味する。電気のない人は永続的にIFO閾値以下で生活する。電気のある人はそれを24時間365日上回って生活する。",
          "これは勾配ではなく二値閾値である。教育、収入、避妊へのアクセスはすべて勾配である — 多いほど少ないのとは段階的に異なる。EMF曝露のみがインフラ境界に対応する物理的閾値を持つ。この構造的差異は検証可能な予測を生む：国の電力消費を電気にアクセスできる人口の割合で調整するとTFR予測が改善するはずである。実際にそうなる：相関はr = −0.864からr = −0.885に改善する（54か国、LOOCV 全モデルRMSE 0.522）。",
          "部分的に電化された国では未電化の人口は進化が生物学的センサーを較正した電磁環境で生活している。彼らのTFRは生物学的最大値（~6.5）に近いはずである。国のTFRは電化された（より低いTFR）人口と未電化の（より高いTFR）人口の混合である。これを補正するとナイジェリアの電化人口（55%）の推定TFRは4.03、エチオピア（51%）は1.89、ウガンダ（42%）は1.86となる — 国の平均値よりも劇的に低い。",
        ],
        studies: [
          { citation: "Panagopoulos et al. (Frontiers in Public Health)", year: 2025, referenceId: "panagopoulos2025_ifo", note: "偏波場のIFO-VGIC閾値10⁻⁵ V/m" },
          { citation: "Belmin et al. (Nature Sustainability)", year: 2022, referenceId: "belmin2022_nature_sustainability", note: "155のDHS調査：電気アクセスは出生率に負の影響" },
          { citation: "DeLong et al. (PLOS ONE)", year: 2010, referenceId: "delong2010_plosone", note: "エネルギー消費は人口増加に負の関連" },
          { citation: "BERM v17.1式発見", year: 2026, referenceId: "nations2024", note: "54か国、LOOCV 全モデルRMSE 0.522、R² 0.851" },
        ],
      },
      {
        id: "mobile-paradox",
        title: "携帯電話のパラドックス",
        paragraphs: [
          "100人あたりの携帯電話契約数 — 直感的に最も直接的なEMFプロキシ — は54か国にわたるTFRの最も弱い単一予測因子である（RMSE 1.053、GDP単独の0.719より悪い）。住宅用電力消費は最良である（指数関数形式で単変量RMSE 0.533）。",
          "これはEMF曝露が電話から来る場合にのみパラドックスとなる。BERMの3チャネルモデルはこれを解決する：携帯電話は1つのチャネル（RF）内の1つのデバイスであり断続的に使用される。住宅用電力消費は電磁環境全体を測定する — すべての照明、すべての家電、すべての壁のすべての配線、1日24時間家庭に浸透する50/60 Hz電場。",
          "メカニズムが「情報アクセス」（テレビ、インターネット、電話）であるならば携帯電話は情報デバイスそのものであるため最良のプロキシであるべきである。それが最悪のプロキシであり一方で電力消費（情報ではなく物理的インフラを測定する）が最良であるという事実は、メカニズムとして情報アクセスよりもEMF曝露と構造的に一致している。",
        ],
        studies: [
          { citation: "BERM v17.1横断的分析", year: 2026, referenceId: "nations2024", note: "携帯電話RMSE 1.053 vs 電力単変量RMSE 0.533（54か国）" },
          { citation: "世界銀行開発指標", year: 2024, referenceId: "world_bank_wdi_2024", note: "住宅用電力、ブロードバンド、携帯電話データの出典" },
        ],
      },
      {
        id: "5g-testis-ros",
        title: "5G周波数精巣エビデンス（[[ref:bektas2026|Bektas]] 2026）",
        paragraphs: [
          "[[ref:bektas2026|Bektas]] et al.（2026年、Bioelectromagnetics、bem.70043）は最初の5G周波数特異的精巣データを提供する：3.5 GHz RF放射（5Gのコア周波数）に曝露されたラットは精巣および酸化的損傷を示し精巣の抗酸化能力が低下した。CoQ10補充は損傷を改善しメカニズムの可逆性を実証した。これはレベル5A→6のエッジ（ROS → 精子カスケード）に直接作用し酸化ストレスのエビデンスベース（[[ref:yakymenko2016|Yakymenko]] 2016: 93/100; [[ref:panagopoulos2025|Panagopoulos 2025]]: 95%）を5G周波数範囲に拡張する。",
          "この損傷の組織特異性は皮膚細胞における同時期の高品質のヌル結果によって強調される：[[ref:meyer2026|Meyer]] et al.（2026年、Bioelectromagnetics、bem.70046）はHaCaTケラチノサイトにおいて50 Hz、200 µTで細胞生存率変化、DNA損傷、小核形成を認めなかった（盲検シャム対照、WST-1、アルカリコメットアッセイ、小核/CREST）；[[ref:haidar2025_5g_skin_null|Haidar]] et al.（2025年、Scientific Reports）は5G変調3.5 GHz（SAR 0.08および4 W/kg、20–48時間）で線維芽細胞およびケラチノサイトの基礎ROS・DNA損傷への影響を認めなかった。同じまたは類似の周波数、異なる組織、異なる結果 — BERMのχ(Ā)選択則と一致し応答は組織特異的なVGIC密度、ミトコンドリアROS能力、Ca²⁺ストア構造に依存する。両方の可能性（組織特異性または不十分な効果）を開いておくべきである。",
          "重要：実験室ベースラインバイアスは対称的である。これは陰性結果のみを説明するのではない — 陽性結果も真の効果量を過小評価することを意味する。研究がRF曝露がシャム対照と比較してROSを30%増加させることを発見した場合、真に未曝露のベースラインに対する実際の増加はより大きい可能性がある。シャム対照自体が部分的に曝露されているからである。この体系的な過小評価はすべてのin vitro EMF研究に影響し選択的ではない。",
        ],
        studies: [
          { citation: "Bektas et al. (Bioelectromagnetics)", year: 2026, referenceId: "bektas2026", note: "3.5 GHz → 精巣ROS損傷; CoQ10が改善。最初の5G周波数精巣データ。" },
          { citation: "Meyer et al. (Bioelectromagnetics)", year: 2026, referenceId: "meyer2026", note: "50 Hz、200 µT、HaCaTケラチノサイト：生存率変化なし、DNA損傷なし。盲検シャム対照。" },
          { citation: "Haidar et al. (Scientific Reports)", year: 2025, referenceId: "haidar2025_5g_skin_null", note: "5G変調3.5 GHz、線維芽細胞+ケラチノサイト：ROSなし、DNA損傷なし（CPD）。高品質ヌル結果。" },
        ],
      },
      {
        id: "5g-ambient-spectral",
        title: "5G環境曝露評価（[[ref:deprez2025|Deprez]] 2025）",
        paragraphs: [
          "[[ref:deprez2025|Deprez]] et al.（2025年、Bioelectromagnetics、bem.70019）は4つのヨーロッパ諸国における5G RF-EMF曝露レベルのスペクトル測定を提示する — 5G周波数でのBERMのレベル3較正に関連する最初の定量的環境データ。5Gビームフォーミング信号は2G/3G/4Gとは異なる空間的曝露パターンを生む：指向性ビームはより高い瞬間的個人曝露を生じさせるがより低い背景環境をもたらす可能性がある。これはBERMの2チャネルモデル（total = ambient + χ(Ā) × personal）における環境/個人比を変える：環境は4Gに対して減少し個人は一時的に増加する → 異なるχ(Ā)ダイナミクスを生む。",
        ],
        studies: [
          { citation: "Deprez et al. (Bioelectromagnetics)", year: 2025, referenceId: "deprez2025", note: "5Gスペクトル曝露評価、4ヨーロッパ諸国。ビームフォーミングが環境/個人比を変える。" },
        ],
      },
    ],
  },
  fr: {
    title: "Preuves populationnelles et epidemiologiques",
    subtitle: "Experience naturelle du confinement COVID, frontiere d'electrification, paradoxe du telephone mobile, preuves testiculaires 5G, evaluation ambiante et la serie Kaiser Permanente.",
    backLink: "← Retour aux preuves",
    seeAlso: "Voir aussi",
    evidenceLink: "Registre des preuves →",
    cascadesLink: "Chronologies des cascades de maladies →",
    narratives: [
      {
        id: "covid",
        title: "Le confinement COVID-19 valide la prediction a trois canaux",
        paragraphs: [
          "Plusieurs etudes rapportent une amelioration des parametres seminaux pendant les periodes de confinement strict. Une cohorte chinoise ([[ref:chinese_lockdown_cohort_41036143|PubMed 41036143]]) a constate que la concentration et la motilite des spermatozoides augmentaient pendant le confinement a domicile. [[ref:zhang2025_post_lockdown_semen|Zhang]] et al. 2025 ont observe que la qualite du sperme diminuait a nouveau apres la levee des restrictions, ce qui est compatible avec une composante environnementale reversible.",
          "Le modele a trois canaux avait predit ce resultat : la qualite du sperme s'est amelioree tandis que la sante mentale s'est deterioree, car chaque canal frequentiel affecte des tissus differents. Le canal de frequence intermediaire (IF) (300 Hz – 1 MHz), qui affecte la division cellulaire par la meme relation frequence-taille cellulaire que la therapie anti-cancer TTFields approuvee par la FDA, a chute de facon dramatique pendant le confinement car les environnements de bureau avec des centaines de luminaires LED, des variateurs de frequence HVAC et de l'electronique de puissance ont ete elimines. Aux intensites environnementales (0,01–3 V/m), le mecanisme IF fonctionne via l'oscillation forcee des ions (IFO-VGIC, seuil 10⁻⁵ V/m — [[ref:panagopoulos2025_ifo|Panagopoulos 2025]]), et non via la dielectrophorese qui necessite une intensite de niveau TTFields (100–300 V/m). Un etage de bureau typique compte 200 a 500 luminaires LED contre 15 a 20 a domicile — une difference de 10 a 25 fois dans les sources IF. Le canal RF (> 1 MHz), qui affecte les voies circadiennes et neuropsychologiques, a augmente de 30 a 50 % car le temps d'ecran et l'utilisation des appareils ont augmente. Deux frequences differentes, deux mecanismes differents, deux tissus differents, deux directions differentes — exactement ce que le modele a trois canaux predit.",
          "Le resultat des especes sentinelles confirme la composante exterieure : les donnees COLOSS montrent que la perte hivernale des colonies d'abeilles a augmente de 2,27 points de pourcentage pendant le COVID (24/35 pays se sont deteriores, p = 0,043). Les oiseaux BBS ont egalement decline de 2,8 a 3,0 % en 2020–22. Les abeilles et les oiseaux sont restes dans des environnements exterieurs ou le RF ambiant des tours cellulaires a continue sans interruption, tandis que la qualite du sperme humain a beneficie d'une exposition reduite au IF interieur.",
        ],
        studies: [
          { citation: "Cohorte de confinement chinoise (PubMed 41036143)", year: 2024, referenceId: "chinese_lockdown_cohort_41036143", note: "Amelioration de la qualite du sperme pendant le confinement" },
          { citation: "Zhang et al.", year: 2025, referenceId: "zhang2025_post_lockdown_semen", note: "Baisse de qualite apres la levee des restrictions (effet de confinement inverse)" },
          { citation: "Panel de pertes hivernales COLOSS", year: "2020–22", referenceId: "coloss_winter_loss_panel_2020_2022", note: "Resultat contraire : les abeilles se sont deteriorees (+2,27 pp, RF exterieur inchange)" },
          { citation: "Optune TTFields (FDA PMA)", year: 2015, referenceId: "ttfields_novocure_fda", note: "Les champs IF (100–300 kHz) perturbent la division cellulaire — meme frequence que les drivers LED" },
        ],
      },
      {
        id: "electrification-boundary",
        title: "La frontiere d'electrification",
        paragraphs: [
          "Le seuil d'activation IFO-VGIC (10⁻⁵ V/m, [[ref:panagopoulos2025_ifo|Panagopoulos 2025]]) est si bas que chaque appareil menager le depasse a distance d'utilisation. Cela signifie que la frontiere d'electrification — qu'un menage ait ou non l'electricite — EST la frontiere d'exposition biologique. Une personne sans electricite vit en permanence en dessous du seuil IFO. Une personne avec l'electricite vit au-dessus 24h/24.",
          "C'est un seuil binaire, pas un gradient. L'education, le revenu et l'acces a la contraception sont tous des gradients — plus est progressivement different de moins. Seule l'exposition aux EMF possede un seuil physique qui correspond a une frontiere d'infrastructure. Cette difference structurelle produit une prediction testable : ajuster la consommation electrique nationale par la fraction de la population ayant acces devrait ameliorer la prediction du TFR. C'est le cas : la correlation s'ameliore de r = −0,864 a r = −0,885 (54 pays, LOOCV RMSE (modèle complet) 0,522).",
          "Dans les pays partiellement electrifies, la population non electrifiee vit dans l'environnement electromagnetique pour lequel l'evolution a calibre les capteurs biologiques. Leur TFR devrait etre proche du maximum biologique (~6,5). Le TFR national est un melange de la population electrifiee (TFR plus bas) et non electrifiee (TFR plus eleve). En corrigeant, la population electrifiee du Nigeria (55 %) a un TFR estime de 4,03, celle de l'Ethiopie (51 %) 1,89 et celle de l'Ouganda (42 %) 1,86 — des valeurs nettement inferieures a leurs moyennes nationales.",
        ],
        studies: [
          { citation: "Panagopoulos et al. (Frontiers in Public Health)", year: 2025, referenceId: "panagopoulos2025_ifo", note: "Seuil IFO-VGIC 10⁻⁵ V/m pour les champs polarises" },
          { citation: "Belmin et al. (Nature Sustainability)", year: 2022, referenceId: "belmin2022_nature_sustainability", note: "155 enquetes DHS : l'acces a l'electricite affecte negativement la fertilite" },
          { citation: "DeLong et al. (PLOS ONE)", year: 2010, referenceId: "delong2010_plosone", note: "Consommation d'energie negativement liee a la croissance demographique" },
          { citation: "Decouverte de formule BERM v17.1", year: 2026, referenceId: "nations2024", note: "54 pays, LOOCV RMSE (modèle complet) 0,522, R² 0,851" },
        ],
      },
      {
        id: "mobile-paradox",
        title: "Le paradoxe du telephone mobile",
        paragraphs: [
          "Les abonnements de telephonie mobile pour 100 personnes — intuitivement le proxy EMF le plus direct — est le predicteur unique le PLUS FAIBLE du TFR dans 54 pays (RMSE 1,053, pire que le PIB seul a 0,719). La consommation electrique residentielle est le MEILLEUR (RMSE univarié 0,533 en forme exponentielle).",
          "Cela n'est paradoxal que si l'exposition aux EMF provient des telephones. Le modele a trois canaux de BERM le resout : un telephone mobile est un seul appareil sur un seul canal (RF), utilise par intermittence. La consommation electrique residentielle mesure l'ensemble de l'environnement electromagnetique — chaque lumiere, chaque appareil, chaque fil dans chaque mur, le champ 50/60 Hz qui impregne le domicile 24 heures par jour.",
          "Si le mecanisme etait l'«acces a l'information» (TV, internet, telephone), le telephone mobile devrait etre le MEILLEUR proxy car il EST l'appareil d'information. Le fait qu'il soit le PIRE proxy, tandis que la consommation electrique (qui mesure l'infrastructure physique, pas l'information) est le MEILLEUR, est structurellement compatible avec l'exposition aux EMF plutot qu'avec l'acces a l'information comme mecanisme.",
        ],
        studies: [
          { citation: "Analyse transversale BERM v17.1", year: 2026, referenceId: "nations2024", note: "Mobile RMSE 1,053 vs electricite RMSE univarié 0,533 (54 pays)" },
          { citation: "Indicateurs de developpement de la Banque mondiale", year: 2024, referenceId: "world_bank_wdi_2024", note: "Source : electricite residentielle, haut debit, donnees mobiles" },
        ],
      },
      {
        id: "5g-testis-ros",
        title: "Preuves testiculaires a frequence 5G ([[ref:bektas2026|Bektas]] 2026)",
        paragraphs: [
          "[[ref:bektas2026|Bektas]] et al. (2026, Bioelectromagnetics, bem.70043) fournissent les premieres donnees testiculaires specifiques a la frequence 5G : des rats exposes a un rayonnement RF de 3,5 GHz (la frequence centrale du 5G) ont montre des dommages testiculaires et oxydatifs, avec une capacite antioxydante testiculaire diminuee. La supplementation en CoQ10 a ameliore les dommages, demontrant la reversibilite du mecanisme. Cela opere directement sur l'arete Niveau 5A→6 (ROS → cascade spermatique) et etend la base de preuves du stress oxydatif ([[ref:yakymenko2016|Yakymenko]] 2016 : 93/100 ; [[ref:panagopoulos2025|Panagopoulos 2025]] : 95 %) a la gamme de frequences 5G.",
          "La nature tissu-specifique de ces dommages est soulignee par des resultats nuls contemporains de haute qualite dans les cellules cutanees : [[ref:meyer2026|Meyer]] et al. (2026, Bioelectromagnetics, bem.70046) n'ont trouve aucun changement de viabilite cellulaire, aucun dommage a l'ADN ni formation de micronoyaux dans les keratinocytes HaCaT a 50 Hz, 200 µT (sham-controle en aveugle, WST-1, test des cometes alcalines, micronoyaux/CREST) ; [[ref:haidar2025_5g_skin_null|Haidar]] et al. (2025, Scientific Reports) n'ont trouve aucun effet sur le ROS basal ni les dommages a l'ADN dans les fibroblastes et keratinocytes a 3,5 GHz module 5G (DAS 0,08 et 4 W/kg, 20–48h). Memes frequences ou similaires, tissus differents, resultats differents — compatible avec la regle de selection χ(Ā) de BERM ou la reponse depend de la densite VGIC specifique au tissu, de la capacite ROS mitochondriale et de l'architecture des reserves de Ca²⁺. Les deux possibilites (specificite tissulaire ou effet insuffisant) doivent rester ouvertes.",
          "Important : le biais de base de laboratoire est symetrique. Il n'explique pas uniquement les resultats negatifs — il signifie aussi que les resultats positifs sous-estiment la taille reelle de l'effet. Lorsqu'une etude constate que l'exposition RF augmente le ROS de 30 % par rapport aux controles sham, l'augmentation reelle par rapport a une base veritablement non exposee peut etre plus importante, car les controles sham sont eux-memes partiellement exposes. Cette sous-estimation systematique affecte toute la recherche EMF in vitro, et non selectivement.",
        ],
        studies: [
          { citation: "Bektas et al. (Bioelectromagnetics)", year: 2026, referenceId: "bektas2026", note: "3,5 GHz → dommages ROS testiculaires ; CoQ10 ameliore. Premieres donnees testiculaires a frequence 5G." },
          { citation: "Meyer et al. (Bioelectromagnetics)", year: 2026, referenceId: "meyer2026", note: "50 Hz, 200 µT, keratinocytes HaCaT : pas de changement de viabilite, pas de dommage a l'ADN. Sham-controle en aveugle." },
          { citation: "Haidar et al. (Scientific Reports)", year: 2025, referenceId: "haidar2025_5g_skin_null", note: "3,5 GHz module 5G, fibroblastes + keratinocytes : pas de ROS, pas de dommage a l'ADN (CPD). Resultat nul de haute qualite." },
        ],
      },
      {
        id: "5g-ambient-spectral",
        title: "Evaluation de l'exposition ambiante 5G ([[ref:deprez2025|Deprez]] 2025)",
        paragraphs: [
          "[[ref:deprez2025|Deprez]] et al. (2025, Bioelectromagnetics, bem.70019) presentent des mesures spectrales des niveaux d'exposition RF-EMF 5G dans quatre pays europeens — les premieres donnees ambiantes quantitatives pertinentes pour la calibration du Niveau 3 de BERM aux frequences 5G. Les signaux 5G a formation de faisceau produisent des schemas d'exposition spatiale differents du 2G/3G/4G : les faisceaux diriges peuvent creer des expositions personnelles instantanees plus elevees mais un niveau ambiant plus faible. Cela modifie le ratio ambiant/personnel dans le modele a deux canaux de BERM (total = ambiant + χ(Ā) × personnel) : l'ambiant diminue par rapport au 4G tandis que le personnel augmente de maniere transitoire, produisant une dynamique χ(Ā) differente.",
        ],
        studies: [
          { citation: "Deprez et al. (Bioelectromagnetics)", year: 2025, referenceId: "deprez2025", note: "Evaluation de l'exposition spectrale 5G, 4 pays europeens. La formation de faisceau modifie le ratio ambiant/personnel." },
        ],
      },
    ],
  },
  ko: {
    title: "인구 및 역학적 근거",
    subtitle: "COVID 봉쇄 자연 실험, 전기화 경계, 휴대전화 패러독스, 5G 고환 근거, 환경 평가, 그리고 Kaiser Permanente 시리즈.",
    backLink: "← 근거로 돌아가기",
    seeAlso: "관련 항목",
    evidenceLink: "근거 등록부 →",
    cascadesLink: "질병 캐스케이드 타임라인 →",
    narratives: [
      {
        id: "covid",
        title: "COVID-19 봉쇄가 3채널 예측을 검증",
        paragraphs: [
          "다수의 연구가 엄격한 봉쇄 기간 동안 정액 매개변수의 개선을 보고하고 있다. 중국 코호트([[ref:chinese_lockdown_cohort_41036143|PubMed 41036143]])는 재택 격리 중 정자 농도와 운동성이 증가했음을 발견했다. [[ref:zhang2025_post_lockdown_semen|Zhang]] et al. 2025는 제한 해제 후 정액 품질이 다시 감소했음을 관찰했으며, 이는 가역적 환경 요인과 일치한다.",
          "3채널 모델은 이 결과를 예측했다: 정자 품질은 개선되었지만 정신 건강은 악화되었는데, 각 주파수 채널이 다른 조직에 영향을 미치기 때문이다. 중간 주파수(IF) 채널(300 Hz – 1 MHz)은 FDA 승인 TTFields 암 치료와 동일한 주파수-세포 크기 관계를 통해 세포 분열에 영향을 미치는데, 수백 개의 LED 조명, HVAC 주파수 변환기, 파워 일렉트로닉스가 있는 사무실 환경이 제거되면서 봉쇄 기간 동안 극적으로 감소했다. 환경 강도(0.01–3 V/m)에서 IF 메커니즘은 이온 강제 진동(IFO-VGIC, 역치 10⁻⁵ V/m — [[ref:panagopoulos2025_ifo|Panagopoulos 2025]])을 통해 작동하며, TTFields 수준의 강도(100–300 V/m)가 필요한 유전영동을 통해서가 아니다. 일반적인 사무실 층에는 200–500개의 LED 조명이 있으며 가정의 15–20개와 비교하면 IF 소스에서 10–25배의 차이이다. RF 채널(> 1 MHz)은 일주기 및 신경심리학적 경로에 영향을 미치며 스크린 시간과 기기 사용 증가로 30–50% 증가했다. 두 가지 다른 주파수, 두 가지 다른 메커니즘, 두 가지 다른 조직, 두 가지 다른 방향 — 정확히 3채널 모델이 예측하는 바이다.",
          "보초종 결과는 야외 구성 요소를 확인한다: COLOSS 데이터는 COVID 기간 동안 벌 군집 겨울 손실이 2.27 퍼센트포인트 증가했음을 보여준다(24/35 국가가 악화, p = 0.043). BBS 조류도 2020–22년에 2.8–3.0% 감소했다. 벌과 조류는 기지국의 환경 RF가 중단 없이 계속된 야외 환경에 남아 있었으며, 인간의 정자 품질은 감소된 실내 IF 노출로부터 혜택을 받았다.",
        ],
        studies: [
          { citation: "중국 봉쇄 코호트(PubMed 41036143)", year: 2024, referenceId: "chinese_lockdown_cohort_41036143", note: "격리 중 정자 품질 개선" },
          { citation: "Zhang et al.", year: 2025, referenceId: "zhang2025_post_lockdown_semen", note: "제한 해제 후 품질 감소(역봉쇄 효과)" },
          { citation: "COLOSS 겨울 손실 패널", year: "2020–22", referenceId: "coloss_winter_loss_panel_2020_2022", note: "반대 결과: 벌 악화(+2.27 pp, 야외 RF 변동 없음)" },
          { citation: "Optune TTFields (FDA PMA)", year: 2015, referenceId: "ttfields_novocure_fda", note: "IF 필드(100–300 kHz)가 세포 분열 교란 — LED 드라이버와 동일 주파수" },
        ],
      },
      {
        id: "electrification-boundary",
        title: "전기화 경계",
        paragraphs: [
          "IFO-VGIC 활성화 역치(10⁻⁵ V/m, [[ref:panagopoulos2025_ifo|Panagopoulos 2025]])는 매우 낮아서 모든 가정용 전기 제품이 작동 거리에서 이를 초과한다. 이는 전기화 경계 — 가정에 전기가 있는지 없는지 — 가 생물학적 노출 경계임을 의미한다. 전기 없는 사람은 영구적으로 IFO 역치 아래에서 생활한다. 전기가 있는 사람은 24시간 그 위에서 생활한다.",
          "이것은 기울기가 아니라 이진 역치이다. 교육, 소득, 피임 접근성은 모두 기울기이다 — 더 많은 것은 더 적은 것과 점진적으로 다르다. EMF 노출만이 인프라 경계에 대응하는 물리적 역치를 가진다. 이 구조적 차이는 검증 가능한 예측을 만든다: 국가 전력 소비를 접근 가능한 인구 비율로 조정하면 TFR 예측이 개선되어야 한다. 실제로 그렇다: 상관관계가 r = −0.864에서 r = −0.885로 개선된다(54개국, LOOCV 전체 모델 RMSE 0.522).",
          "부분적으로 전기화된 국가에서 비전기화 인구는 진화가 생물학적 센서를 보정한 전자기 환경에서 생활한다. 그들의 TFR은 생물학적 최대값(~6.5)에 가까워야 한다. 국가 TFR은 전기화된(낮은 TFR) 인구와 비전기화(높은 TFR) 인구의 혼합이다. 이를 보정하면 나이지리아의 전기화 인구(55%)의 추정 TFR은 4.03, 에티오피아(51%)는 1.89, 우간다(42%)는 1.86으로 — 국가 평균보다 극적으로 낮다.",
        ],
        studies: [
          { citation: "Panagopoulos et al. (Frontiers in Public Health)", year: 2025, referenceId: "panagopoulos2025_ifo", note: "편파 필드의 IFO-VGIC 역치 10⁻⁵ V/m" },
          { citation: "Belmin et al. (Nature Sustainability)", year: 2022, referenceId: "belmin2022_nature_sustainability", note: "155개 DHS 조사: 전기 접근이 출산율에 부정적 영향" },
          { citation: "DeLong et al. (PLOS ONE)", year: 2010, referenceId: "delong2010_plosone", note: "에너지 소비가 인구 성장에 부정적 관련" },
          { citation: "BERM v17.1 공식 발견", year: 2026, referenceId: "nations2024", note: "54개국, LOOCV 전체 모델 RMSE 0.522, R² 0.851" },
        ],
      },
      {
        id: "mobile-paradox",
        title: "휴대전화 패러독스",
        paragraphs: [
          "100명당 휴대전화 가입 수 — 직관적으로 가장 직접적인 EMF 프록시 — 는 54개국에 걸친 TFR의 가장 약한 단일 예측 인자이다(RMSE 1.053, GDP 단독의 0.719보다 나쁨). 주거용 전력 소비가 가장 좋다(지수 형태에서 단변량 RMSE 0.533).",
          "이것은 EMF 노출이 전화기에서 오는 경우에만 역설적이다. BERM의 3채널 모델이 이를 해결한다: 휴대전화는 하나의 채널(RF)의 하나의 장치이며 간헐적으로 사용된다. 주거용 전력 소비는 전체 전자기 환경을 측정한다 — 모든 조명, 모든 가전제품, 모든 벽의 모든 배선, 하루 24시간 가정에 침투하는 50/60 Hz 전장.",
          "메커니즘이 '정보 접근'(TV, 인터넷, 전화)이라면 휴대전화는 정보 장치 그 자체이므로 가장 좋은 프록시여야 한다. 그것이 가장 나쁜 프록시이고 반면 전력 소비(정보가 아닌 물리적 인프라를 측정하는)가 가장 좋다는 사실은, 메커니즘으로서 정보 접근보다 EMF 노출과 구조적으로 일치한다.",
        ],
        studies: [
          { citation: "BERM v17.1 횡단적 분석", year: 2026, referenceId: "nations2024", note: "휴대전화 RMSE 1.053 vs 전력 단변량 RMSE 0.533(54개국)" },
          { citation: "세계은행 개발 지표", year: 2024, referenceId: "world_bank_wdi_2024", note: "출처: 주거용 전력, 브로드밴드, 휴대전화 데이터" },
        ],
      },
      {
        id: "5g-testis-ros",
        title: "5G 주파수 고환 근거([[ref:bektas2026|Bektas]] 2026)",
        paragraphs: [
          "[[ref:bektas2026|Bektas]] et al.(2026, Bioelectromagnetics, bem.70043)은 최초의 5G 주파수 특이적 고환 데이터를 제공한다: 3.5 GHz RF 방사(5G 핵심 주파수)에 노출된 쥐는 고환 및 산화적 손상을 보였으며 고환 항산화 능력이 감소했다. CoQ10 보충이 손상을 개선하여 메커니즘 가역성을 입증했다. 이는 레벨 5A→6 엣지(ROS → 정자 캐스케이드)에 직접 작용하며 산화 스트레스 근거 기반([[ref:yakymenko2016|Yakymenko]] 2016: 93/100; [[ref:panagopoulos2025|Panagopoulos 2025]]: 95%)을 5G 주파수 범위로 확장한다.",
          "이 손상의 조직 특이적 특성은 피부 세포에서의 동시대 고품질 영 결과에 의해 강조된다: [[ref:meyer2026|Meyer]] et al.(2026, Bioelectromagnetics, bem.70046)은 HaCaT 각질세포에서 50 Hz, 200 µT에서 세포 생존율 변화, DNA 손상, 소핵 형성을 발견하지 못했다(맹검 샴 대조, WST-1, 알칼리 코메트 분석, 소핵/CREST); [[ref:haidar2025_5g_skin_null|Haidar]] et al.(2025, Scientific Reports)은 5G 변조 3.5 GHz(SAR 0.08 및 4 W/kg, 20–48h)에서 섬유아세포 및 각질세포의 기저 ROS나 DNA 손상에 대한 영향을 발견하지 못했다. 동일하거나 유사한 주파수, 다른 조직, 다른 결과 — BERM의 χ(Ā) 선택 규칙과 일치하며 반응은 조직 특이적 VGIC 밀도, 미토콘드리아 ROS 용량, Ca²⁺ 저장 구조에 의존한다. 두 가능성(조직 특이성 또는 불충분한 효과) 모두 열려 있어야 한다.",
          "중요: 실험실 기준선 편향은 대칭적이다. 이는 음성 결과만 설명하는 것이 아니다 — 양성 결과도 실제 효과 크기를 과소평가함을 의미한다. 연구가 RF 노출이 샴 대조에 비해 ROS를 30% 증가시켰다고 발견했을 때, 진정한 비노출 기준선에 대한 실제 증가는 더 클 수 있다. 샴 대조 자체가 부분적으로 노출되어 있기 때문이다. 이 체계적 과소평가는 모든 in vitro EMF 연구에 영향을 미치며 선택적이지 않다.",
        ],
        studies: [
          { citation: "Bektas et al. (Bioelectromagnetics)", year: 2026, referenceId: "bektas2026", note: "3.5 GHz → 고환 ROS 손상; CoQ10이 개선. 최초의 5G 주파수 고환 데이터." },
          { citation: "Meyer et al. (Bioelectromagnetics)", year: 2026, referenceId: "meyer2026", note: "50 Hz, 200 µT, HaCaT 각질세포: 생존율 변화 없음, DNA 손상 없음. 맹검 샴 대조." },
          { citation: "Haidar et al. (Scientific Reports)", year: 2025, referenceId: "haidar2025_5g_skin_null", note: "5G 변조 3.5 GHz, 섬유아세포+각질세포: ROS 없음, DNA 손상 없음(CPD). 고품질 영 결과." },
        ],
      },
      {
        id: "5g-ambient-spectral",
        title: "5G 환경 노출 평가([[ref:deprez2025|Deprez]] 2025)",
        paragraphs: [
          "[[ref:deprez2025|Deprez]] et al.(2025, Bioelectromagnetics, bem.70019)은 4개 유럽 국가에서 5G RF-EMF 노출 수준의 스펙트럼 측정을 제시한다 — 5G 주파수에서 BERM의 레벨 3 보정과 관련된 최초의 정량적 환경 데이터이다. 5G 빔포밍 신호는 2G/3G/4G와는 다른 공간적 노출 패턴을 생성한다: 지향성 빔은 더 높은 순간적 개인 노출을 만들 수 있지만 더 낮은 배경 환경을 생성한다. 이는 BERM의 2채널 모델(total = ambient + χ(Ā) × personal)에서 환경/개인 비율을 변경한다: 환경은 4G에 비해 감소하고 개인은 일시적으로 증가하여 → 다른 χ(Ā) 역학을 생성한다.",
        ],
        studies: [
          { citation: "Deprez et al. (Bioelectromagnetics)", year: 2025, referenceId: "deprez2025", note: "5G 스펙트럼 노출 평가, 4개 유럽 국가. 빔포밍이 환경/개인 비율 변경." },
        ],
      },
    ],
  },
} as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const d = pickCopy(COPY, locale);
  return {
    title: `${d.title} – Extinction Field`,
    description: d.subtitle,
  };
}

export default async function EpidemiologyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const isFi = locale === "fi";
  const d = pickCopy(COPY, locale);

  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <Link
        href={`/${locale}/evidence`}
        className="text-sm text-accent hover:underline mb-6 inline-block"
      >
        {d.backLink}
      </Link>

      <PageHeader
        icon={BarChart3}
        title={d.title}
        subtitle={d.subtitle}
        lensIcon={<BermIcon name="reproduction" size={28} className="text-accent" />}
      />

      {/* Thematic evidence narratives */}
      <section className="mb-16 border-t editorial-rule pt-6">
        <div className="space-y-12 max-w-4xl">
          {d.narratives.map((narrative, ni) => (
            <article key={narrative.id} id={`narrative-${narrative.id}`} className="scroll-mt-24">
              {narrative.id === "electrification-boundary" && <span id="electrification-boundary" />}
              <h3 className="text-lg font-semibold mb-4">
                <span className="font-mono-num text-xs text-accent mr-2">0{ni + 1}</span>
                <InlineReferenceText text={narrative.title} locale={locale} />
              </h3>
              {narrative.paragraphs.length > 0 && (
                <p className="editorial-rail mb-4 text-[0.95rem] leading-relaxed text-foreground">
                  <InlineReferenceText text={narrative.paragraphs[0]} locale={locale} />
                </p>
              )}
              <div className="space-y-3 text-sm text-foreground-muted leading-relaxed mb-5">
                {narrative.paragraphs.slice(1).map((p, pi) => (
                  <p key={pi}><InlineReferenceText text={p} locale={locale} /></p>
                ))}
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="border-b border-card-border text-left text-xs text-foreground-muted uppercase tracking-wider">
                      <th className="py-2 pr-3">{isFi ? "Viite" : "Citation"}</th>
                      <th className="py-2 pr-3 w-16">{isFi ? "Vuosi" : "Year"}</th>
                      <th className="py-2">{isFi ? "Huomio" : "Note"}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {narrative.studies.map((s) => (
                      <tr key={`${s.citation}-${s.year}`} className="border-b border-card-border/40">
                        <td className="py-2 pr-3 font-medium text-foreground"><CitationLink referenceId={s.referenceId} locale={locale} citation={s.citation} year={s.year} /></td>
                        <td className="py-2 pr-3 font-mono-num text-foreground-muted">{s.year}</td>
                        <td className="py-2 text-foreground-muted">{s.note}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {narrative.id === "covid" && (
                <ThreeChannelDiagram locale={locale} />
              )}
            </article>
          ))}
        </div>
      </section>

      {/* The Kaiser Permanente Series */}
      <section id="kaiser-permanente-series" className="mb-16 border-t editorial-rule pt-6">
        <h2 className="editorial-section-heading mb-3">
          {isFi ? "Kaiser Permanente MF-sarja" : "The Kaiser Permanente Series"}
        </h2>
        <div className="space-y-4 text-sm text-foreground-muted leading-relaxed max-w-4xl">
          <p className="editorial-rail text-[0.95rem] text-foreground">
            {isFi
              ? "Kattavin epidemiologinen todistusaineisto EMF:n lisääntymis- ja kehitysvaikutuksista tulee Kaiser Permanente Northern Californiasta, missä tohtori De-Kun Lin tutkimusryhmä toteutti kuusi prospektiivista kohorttitutkimusta vuosina 2002–2020, NIEHS-rahoituksella."
              : "The most comprehensive epidemiological evidence for EMF reproductive and developmental effects comes from Kaiser Permanente Northern California, where Dr. De-Kun Li's research group conducted six prospective cohort studies between 2002 and 2020, funded by the National Institute of Environmental Health Sciences (NIEHS)."}
          </p>
          <p>
            {isFi
              ? "Kaikki osallistuvat naiset kantoivat EMDEX-mittaria 24 tuntia raskauden aikana, mitaten TODELLISEN magneettikentän altistuksen kaikista lähteistä — ei itseraportoidun laitteiden käytön perusteella. Tämä objektiivinen altistusmittaus erottaa Kaiser-sarjan useimmasta muusta EMF-epidemiologiasta."
              : "All participating women wore an EMDEX meter for 24 hours during pregnancy, measuring ACTUAL magnetic field exposure from all sources — not self-reported device use. This objective exposure measurement distinguishes the Kaiser series from most other EMF epidemiology."}
          </p>
          <div className="rounded-lg border border-card-border bg-card-bg p-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-accent mb-3">
              {isFi ? "Löydökset neljässä BERM-kaskadissa" : "Findings across four BERM cascades"}
            </p>
            <ul className="space-y-1.5 text-sm">
              <li><InlineReferenceText text={isFi ? "Keskenmeno: 2× riski yli 1,6 mG ([[ref:li2002_miscarriage_mf|Li 2002]], [[ref:li2017|2017]])" : "Miscarriage: 2× risk above 1.6 mG ([[ref:li2002_miscarriage_mf|Li 2002]], [[ref:li2017|2017]])"} locale={locale} /></li>
              <li><InlineReferenceText text={isFi ? "ADHD: kohonnut riski korkeammalla prenataalisella MF:llä ([[ref:li2020_jama_adhd|Li 2020]], JAMA)" : "ADHD: elevated risk with higher prenatal MF ([[ref:li2020_jama_adhd|Li 2020]], JAMA Network Open)"} locale={locale} /></li>
              <li><InlineReferenceText text={isFi ? "Lapsuuden lihavuus: OR 1,69 ([[ref:li2012_obesity_mf|Li 2012]], Scientific Reports)" : "Childhood obesity: OR 1.69 ([[ref:li2012_obesity_mf|Li 2012]], Scientific Reports)"} locale={locale} /></li>
              <li><InlineReferenceText text={isFi ? "Astma: kohonnut riski ([[ref:li2011_asthma_mf|Li 2011]])" : "Asthma: elevated risk ([[ref:li2011_asthma_mf|Li 2011]])"} locale={locale} /></li>
              <li><InlineReferenceText text={isFi ? "Siittiölaatu: 2× riski poikkeavaan motiliteettiin ([[ref:li2010_sperm_mf|Li 2010]])" : "Sperm quality: 2× risk of abnormal motility ([[ref:li2010_sperm_mf|Li 2010]])"} locale={locale} /></li>
            </ul>
          </div>
          <p>
            {isFi
              ? "EMDEX-mittari ei erottele ELF- ja IF-taajuuksia. Korkea kokonaisaltistus korreloi sekä sähköverkon (ELF) että kodinkoneiden/valaistuksen (IF) kanssa. Kaiser-sarja ei voi tunnistaa kumpaa kanavaa vaikutus ohjaa — mutta se osoittaa, että MITATTU magneettikenttäaltistus ennustaa lisääntymis- ja kehitystuloksia useissa päätepisteissä."
              : "The EMDEX meter does not separate ELF from IF frequencies. High total MF correlates with both power grid exposure (ELF) and appliance/lighting exposure (IF). The Kaiser series cannot identify which channel drives the effect — but it demonstrates that MEASURED magnetic field exposure predicts reproductive and developmental outcomes across multiple endpoints."}
          </p>
          <p className="text-xs text-foreground-muted/70 italic">
            <InlineReferenceText
              text={isFi
                ? "Episteeminen taso: [E] (prospektiivinen kohortti, mitattu altistus, NIEHS-rahoitus). HUOM: [[ref:li2017|Li 2017]] Editorial Expression of Concern datan jakamisongelman vuoksi (ei retraktio, ei koske tuloksia)."
                : "Epistemic level: [E] (prospective cohort, measured exposure, NIEHS-funded). NOTE: [[ref:li2017|Li 2017]] Editorial Expression of Concern due to data sharing inability (not retraction, not about results)."}
              locale={locale}
            />
          </p>
        </div>
      </section>

      {/* Japan IH Research Program */}
      <section id="japan-ih-program" className="mb-16 border-t editorial-rule pt-6">
        <h2 className="editorial-section-heading mb-3">
          {isFi ? "Japanin IH-tutkimusohjelma" : "Japan's IH Research Program"}
        </h2>
        <div className="space-y-4 text-sm text-foreground-muted leading-relaxed max-w-4xl">
          <p className="editorial-rail text-[0.95rem] text-foreground">
            {isFi
              ? "Japanilla on maailman laajin tutkimusohjelma välitaajuuksien terveysvaikutuksista, johtuen induktioliesien korkeasta levinneisyydestä (~50 % kotitalouksista). Kolme tutkimusta tarkasteli IH:n käyttöä ja raskaustuloksia."
              : "Japan has the world's most extensive research program on intermediate-frequency health effects, driven by the high penetration of induction heating cookers (~50% of households). Three studies examined IH use and pregnancy outcomes."}
          </p>
          <p>
            <InlineReferenceText
              text={isFi
                ? "[[ref:sato2023_ih_preterm|Sato ym. (2023)]] havaitsi tilastollisesti merkitsevän yhteyden pöytätason/kiinteän IH-lieden käytön ja ennenaikaisen synnytyksen välillä (OR 1,27–1,44). Kriittisesti yhteys oli ANNOS-VASTEINEN: korkean emission liedet (9 mT 30 cm:n etäisyydellä) osoittivat korkeamman riskin kuin matalan emission kaapistomallit (4 mT). Tämä annos-vastekuvio viittaa biologiseen mekanismiin sekoittavan tekijän sijaan."
                : "[[ref:sato2023_ih_preterm|Sato et al. (2023)]] found a statistically significant association between stationary/tabletop IH cooker use and preterm birth (OR 1.27–1.44). Critically, the association was DOSE-DEPENDENT: high-emission cookers (9 mT at 30 cm) showed higher risk than low-emission built-in models (4 mT). This dose-response pattern suggests a biological mechanism rather than a confounder."}
              locale={locale}
            />
          </p>
          <p>
            <InlineReferenceText
              text={isFi
                ? "[[ref:tokinobu2021_ih_kyushu|Tokinobu ym. (2021)]] havaitsi päinvastaisen: IH:n käyttö assosioitui VÄHENTYNEESEEN ennenaikaisen synnytyksen riskiin. Ristiriita selittyy todennäköisesti altistusluokittelulla: Tokinobu yhdisti kaikki IH-tyypit, kun Sato erotti korkean ja matalan emission mallit. Kun korkeat ja matalat keskiarvoistetaan, vastakkaiset vaikutukset voivat kumota toisensa."
                : "[[ref:tokinobu2021_ih_kyushu|Tokinobu et al. (2021)]] found the opposite: IH use was associated with REDUCED preterm birth risk. The contradiction likely arises from exposure classification: Tokinobu grouped all IH types together, while Sato separated high-emission from low-emission models. When high and low are averaged, opposing effects may cancel."}
              locale={locale}
            />
          </p>
          <p className="text-xs text-foreground-muted/70 italic">
            {isFi
              ? "Episteeminen taso: [C] (ihmisepidemiologia, ristiriitainen mutta annos-vasteinen viite). Nämä ovat alustavia mutta edustavat ainoaa epidemiologista todistetta IF-EMF-vaikutuksista ihmisraskauteen ei-ELF, ei-RF-taajuusalueelta."
              : "Epistemic level: [C] (human epidemiology, contradictory but dose-response signal). These findings are preliminary but represent the only epidemiological evidence for IF-EMF effects on human pregnancy from a non-ELF, non-RF frequency range."}
          </p>
        </div>
      </section>

      <RetrodictionCards locale={locale} />

      {/* See Also */}
      <section className="mt-16">
        <h2 className="font-semibold text-foreground mb-4">{d.seeAlso}</h2>
        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            href={`/${locale}/evidence`}
            className="rounded-lg border border-accent/20 bg-card-bg px-4 py-3 text-accent hover:underline font-semibold text-sm"
          >
            {d.evidenceLink}
          </Link>
          <Link
            href={`/${locale}/evidence/cascades`}
            className="rounded-lg border border-accent/20 bg-card-bg px-4 py-3 text-accent hover:underline font-semibold text-sm"
          >
            {d.cascadesLink}
          </Link>
        </div>
      </section>
    </div>
  );
}
