import type { Metadata } from "next";
import Link from "next/link";
import { BarChart3 } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { ThreeChannelDiagram } from "@/components/ThreeChannelDiagram";
import { RetrodictionCards } from "@/components/RetrodictionCards";

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
          "Multiple studies report improved semen parameters during strict lockdown periods. A Chinese cohort (PubMed 41036143) found sperm concentration and motility increased during home confinement. Zhang et al. 2025 observed that semen quality declined again when restrictions were lifted, consistent with a reversible environmental component.",
          "The three-channel model predicted this outcome: sperm quality improved while mental health declined because each frequency channel affects different tissues. The intermediate frequency (IF) channel (300 Hz – 1 MHz), which affects cell division through the same frequency-cell size relationship as FDA-approved TTFields cancer therapy, dropped dramatically during lockdown because office environments with hundreds of LED fixtures, HVAC variable frequency drives, and power electronics were eliminated. At environmental intensities (0.01–3 V/m), the IF mechanism operates via Ion Forced Oscillation (IFO-VGIC, threshold 10⁻⁵ V/m — Panagopoulos 2025), not via dielectrophoresis which requires TTFields-level intensity (100–300 V/m). A typical office floor has 200–500 LED fixtures versus 15–20 at home — a 10–25× difference in IF sources. The RF channel (> 1 MHz), which affects circadian and neuropsychological pathways, increased 30–50% because screen time and device usage rose. Two different frequencies, two different mechanisms, two different tissues, two different directions — exactly what the three-channel model predicts.",
          "The sentinel species result confirms the outdoor component: COLOSS data shows bee colony winter loss increased by 2.27 percentage points during COVID (24/35 countries worsened, p = 0.043). BBS birds also declined 2.8–3.0% in 2020–22. Bees and birds remained in outdoor environments where ambient RF from cell towers continued uninterrupted, while human sperm quality benefited from reduced indoor IF exposure.",
        ],
        studies: [
          { citation: "Chinese lockdown cohort (PubMed 41036143)", year: 2024, note: "Sperm quality improvement during confinement" },
          { citation: "Zhang et al.", year: 2025, note: "Quality decline after restriction lifting (reverse lockdown effect)" },
          { citation: "COLOSS winter loss panel", year: "2020–22", note: "Counter-result: bees worsened (+2.27 pp, outdoor RF unchanged)" },
          { citation: "Optune TTFields (FDA PMA)", year: 2015, note: "IF fields (100–300 kHz) disrupt cell division — same frequency as LED drivers" },
        ],
      },
      {
        id: "electrification-boundary",
        title: "The electrification boundary",
        paragraphs: [
          "The IFO-VGIC activation threshold (10⁻⁵ V/m, Panagopoulos 2025) is so low that every household appliance exceeds it at operating distance. This means the electrification boundary — whether a household has electricity or not — IS the biological exposure boundary. A person without electricity lives permanently below the IFO threshold. A person with electricity lives above it 24/7.",
          "This is a binary threshold, not a gradient. Education, income, and contraception access are all gradients — more is gradually different from less. Only EMF exposure has a physical threshold that maps to an infrastructure boundary. This structural difference produces a testable prediction: adjusting national electricity consumption by the fraction of the population with access should improve TFR prediction. It does: correlation improves from r = −0.864 to r = −0.885 (54 countries, LOOCV RMSE 0.522).",
          "In partially electrified countries, the unelectrified population lives in the electromagnetic environment that evolution calibrated biological sensors for. Their TFR should be near the biological maximum (~6.5). National TFR is a mixture of the electrified (lower TFR) and unelectrified (higher TFR) populations. Correcting for this, Nigeria's electrified population (55%) has an estimated TFR of 4.03, Ethiopia's (51%) has 1.89, and Uganda's (42%) has 1.86 — dramatically lower than their national averages.",
        ],
        studies: [
          { citation: "Panagopoulos et al. (Frontiers in Public Health)", year: 2025, note: "IFO-VGIC threshold 10⁻⁵ V/m for polarized fields" },
          { citation: "Belmin et al. (Nature Sustainability)", year: 2022, note: "155 DHS surveys: electricity access negatively affects fertility" },
          { citation: "DeLong et al. (PLOS ONE)", year: 2010, note: "Energy consumption negatively related to population growth" },
          { citation: "BERM v17.1 formula discovery", year: 2026, note: "54 countries, LOOCV RMSE 0.522, R² 0.851" },
        ],
      },
      {
        id: "mobile-paradox",
        title: "The mobile phone paradox",
        paragraphs: [
          "Mobile phone subscriptions per 100 people — intuitively the most direct EMF proxy — is the WEAKEST single predictor of TFR across 54 countries (RMSE 1.053, worse than GDP alone at 0.719). Residential electricity consumption is the BEST (RMSE 0.533 in exponential form).",
          "This is paradoxical only if EMF exposure comes from phones. BERM's three-channel model resolves it: a mobile phone is one device in one channel (RF), used intermittently. Residential electricity measures the entire electromagnetic environment — every light, every appliance, every wire in every wall, the 50/60 Hz field that permeates the home 24 hours a day.",
          "If the mechanism were 'information access' (TV, internet, phone), the mobile phone should be the BEST proxy because it IS the information device. The fact that it is the WORST proxy, while electricity consumption (which measures physical infrastructure, not information) is the BEST, is structurally consistent with EMF exposure rather than information access as the mechanism.",
        ],
        studies: [
          { citation: "BERM v17.1 cross-sectional analysis", year: 2026, note: "Mobile RMSE 1.053 vs electricity RMSE 0.533 (54 countries)" },
          { citation: "World Bank Development Indicators", year: 2024, note: "Source for residential electricity, broadband, mobile data" },
        ],
      },
      {
        id: "5g-testis-ros",
        title: "5G-frequency testicular evidence (Bektas 2026)",
        paragraphs: [
          "Bektas et al. (2026, Bioelectromagnetics, bem.70043) provide the first 5G-frequency-specific testicular data: rats exposed to 3.5 GHz RF radiation (the 5G core frequency) showed testicular and oxidative damage, with decreased testis antioxidant capacity. CoQ10 supplementation ameliorated the damage, demonstrating mechanism reversibility. This operates directly on the Level 5A→6 edge (ROS → sperm cascade) and extends the oxidative stress evidence base (Yakymenko 2016: 93/100; Panagopoulos 2025: 95%) to the 5G frequency range.",
          "The tissue-specific nature of this damage is underscored by contemporaneous high-quality null results in skin cells: Meyer et al. (2026, Bioelectromagnetics, bem.70046) found no cell viability change, DNA damage, or micronucleus formation in HaCaT keratinocytes at 50 Hz, 200 µT (blinded sham-controlled, WST-1, alkaline comet assay, micronucleus/CREST); Haidar et al. (2025, Scientific Reports) found no effect on basal ROS or DNA damage in fibroblasts and keratinocytes at 5G-modulated 3.5 GHz (SAR 0.08 and 4 W/kg, 20–48h). Same or similar frequencies, different tissues, different outcomes — consistent with BERM's χ(Ā) selection rule where response depends on tissue-specific VGIC density, mitochondrial ROS capacity, and Ca²⁺ store architecture. Both possibilities (tissue specificity or insufficient effect) should be kept open.",
          "Important: Lab baseline bias is symmetric. It does not only explain negative results — it also means that positive results underestimate the true effect size. When a study finds that RF exposure increases ROS by 30% compared to sham controls, the actual increase relative to a truly unexposed baseline may be larger, because sham controls are themselves partially exposed. This systematic underestimation affects all in vitro EMF research, not selectively.",
        ],
        studies: [
          { citation: "Bektas et al. (Bioelectromagnetics)", year: 2026, note: "3.5 GHz → testicular ROS damage; CoQ10 ameliorates. First 5G-frequency testicular data." },
          { citation: "Meyer et al. (Bioelectromagnetics)", year: 2026, note: "50 Hz, 200 µT, HaCaT keratinocytes: no viability change, no DNA damage. Blinded sham-controlled." },
          { citation: "Haidar et al. (Scientific Reports)", year: 2025, note: "5G-modulated 3.5 GHz, fibroblasts + keratinocytes: no ROS, no DNA damage (CPD). High-quality null." },
        ],
      },
      {
        id: "5g-ambient-spectral",
        title: "5G ambient exposure assessment (Deprez 2025)",
        paragraphs: [
          "Deprez et al. (2025, Bioelectromagnetics, bem.70019) present spectral measurements of 5G RF-EMF exposure levels in four European countries — the first quantitative ambient data relevant to BERM's Level 3 calibration at 5G frequencies. 5G beam-formed signals produce different spatial exposure patterns than 2G/3G/4G: directed beams may create higher instantaneous personal exposures but lower background ambient. This changes the ambient/personal ratio in BERM's two-channel model (total = ambient + χ(Ā) × personal): ambient decreases relative to 4G while personal increases transiently, producing different χ(Ā) dynamics.",
        ],
        studies: [
          { citation: "Deprez et al. (Bioelectromagnetics)", year: 2025, note: "5G spectral exposure assessment, 4 European countries. Beamforming changes ambient/personal ratio." },
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
          "Useat tutkimukset raportoivat parantuneen siemennesteen laadun tiukkojen lockdown-jaksojen aikana. Kiinalainen kohortti (PubMed 41036143) havaitsi siittiökonsentraation ja liikkuvuuden kasvaneen kotieristyksen aikana. Zhang ym. 2025 havaitsivat, että siemennesteen laatu laski jälleen rajoitusten purkamisen jälkeen, mikä on yhteensopivaa palautuvan ympäristötekijän kanssa.",
          "Kolmikanavamalli ennusti tämän tuloksen: siittiölaatu parani mutta mielenterveys heikkeni, koska kukin taajuuskanava vaikuttaa eri kudoksiin. Välitaajuuskanava (IF, 300 Hz – 1 MHz), joka vaikuttaa solunjakautumiseen saman taajuus-solukoko-suhteen kautta kuin FDA:n hyväksymä TTFields-syöpähoito, laski dramaattisesti lockdownin aikana, koska toimistoympäristöt satojen LED-valaisimien, HVAC-taajuusmuuttajien ja tehoelektroniikan kanssa poistuivat. Ympäristöintensiteeteillä (0,01–3 V/m) IF-mekanismi toimii ionien pakotetun oskillaation kautta (IFO-VGIC, kynnys 10⁻⁵ V/m — Panagopoulos 2025), ei dielektroforeesin kautta, joka vaatii TTFields-tason intensiteetin (100–300 V/m). Tyypillisessä toimistokerroksessa on 200–500 LED-valaisinta verrattuna kodin 15–20:een — 10–25-kertainen ero IF-lähteissä. RF-kanava (> 1 MHz), joka vaikuttaa sirkadiaanisiin ja neuropsykologisiin reitteihin, kasvoi 30–50 % ruutuajan ja laitekäytön lisääntyessä. Kaksi eri taajuutta, kaksi eri mekanismia, kaksi eri kudosta, kaksi eri suuntaa — juuri mitä kolmikanavamalli ennustaa.",
          "Sentinellilajien tulos vahvistaa ulkokomponentin: COLOSS-data osoittaa mehiläispesien talvihäviön kasvaneen 2,27 prosenttiyksikköä COVIDin aikana (24/35 maata heikkeni, p = 0,043). BBS-linnut laskivat myös 2,8–3,0 % vuosina 2020–22. Mehiläiset ja linnut pysyivät ulkoympäristöissä, joissa tukiasemien ambient-RF jatkui keskeytyksettä, kun taas ihmisten siittiölaatu hyötyi vähentyneestä sisätilojen IF-altistuksesta.",
        ],
        studies: [
          { citation: "Kiinalainen lockdown-kohortti (PubMed 41036143)", year: 2024, note: "Siittiölaadun paraneminen eristyksen aikana" },
          { citation: "Zhang ym.", year: 2025, note: "Laadun lasku rajoitusten purkamisen jälkeen (käänteinen lockdown-efekti)" },
          { citation: "COLOSS-talvihäviöpaneeli", year: "2020–22", note: "Vastatulos: mehiläiset heikkenivät (+2,27 pp, ulko-RF ennallaan)" },
          { citation: "Optune TTFields (FDA PMA)", year: 2015, note: "IF-kentät (100–300 kHz) häiritsevät solunjakautumista — sama taajuus kuin LED-hakkurit" },
        ],
      },
      {
        id: "electrification-boundary",
        title: "Sähköistymisraja",
        paragraphs: [
          "IFO-VGIC-aktivaatiokynnys (10⁻⁵ V/m, Panagopoulos 2025) on niin matala, että jokainen kodin sähkölaite ylittää sen käyttöetäisyydellä. Tämä tarkoittaa, että sähköistymisraja — onko kotitaloudella sähköä vai ei — ON biologisen altistuksen raja. Ihminen ilman sähköä elää pysyvästi IFO-kynnyksen alapuolella. Ihminen jolla on sähkö elää sen yläpuolella 24/7.",
          "Tämä on binäärinen kynnys, ei gradientti. Koulutus, tulot ja ehkäisyn saatavuus ovat kaikki gradientteja — enemmän on asteittain erilaista kuin vähemmän. Vain EMF-altistuksella on fysikaalinen kynnys joka vastaa infrastruktuurirajaa. Tämä rakenteellinen ero tuottaa testattavan ennusteen: kansallisen sähkönkulutuksen korjaaminen sähköistetyn väestöosuuden mukaan parantaa TFR-ennustetta. Näin käy: korrelaatio paranee r = −0,864:stä r = −0,885:een (54 maata, LOOCV RMSE 0,522).",
          "Osittain sähköistetyissä maissa sähköistämätön väestö elää sähkömagneettisessa ympäristössä, johon evoluutio kalibroi biologiset sensorit. Heidän TFR:nsä tulisi olla lähellä biologista maksimia (~6,5). Kansallinen TFR on sekoitus sähköistettyä (matalampi TFR) ja sähköistämätöntä (korkeampi TFR) väestöä. Korjattuna Nigerian sähköistetyn väestön (55 %) arvioitu TFR on 4,03, Etiopian (51 %) 1,89 ja Ugandan (42 %) 1,86 — dramaattisesti kansallisia keskiarvoja matalampia.",
        ],
        studies: [
          { citation: "Panagopoulos ym. (Frontiers in Public Health)", year: 2025, note: "IFO-VGIC-kynnys 10⁻⁵ V/m polarisoituneille kentille" },
          { citation: "Belmin ym. (Nature Sustainability)", year: 2022, note: "155 DHS-kyselyjä: sähkön saatavuus vähentää hedelmällisyyttä" },
          { citation: "DeLong ym. (PLOS ONE)", year: 2010, note: "Energiankulutus negatiivisesti yhteydessä väestönkasvuun" },
          { citation: "BERM v17.1 kaavanlöytö", year: 2026, note: "54 maata, LOOCV RMSE 0,522, R² 0,851" },
        ],
      },
      {
        id: "mobile-paradox",
        title: "Matkapuhelinparadoksi",
        paragraphs: [
          "Matkapuhelinliittymät sataa henkeä kohti — intuitiivisesti suorin EMF-proxy — on HEIKOIN yksittäinen TFR-ennustaja 54 maassa (RMSE 1,053, heikompi kuin BKT yksinään 0,719). Asumisen sähkönkulutus on PARAS (RMSE 0,533 eksponentiaalisessa muodossa).",
          "Tämä on paradoksaalista vain jos EMF-altistus tulee puhelimista. BERM:n kolmikanavamalli ratkaisee sen: matkapuhelin on yksi laite yhdellä kanavalla (RF), käytetty ajoittain. Asumisen sähkönkulutus mittaa koko sähkömagneettista ympäristöä — jokainen valo, jokainen kodinlaite, jokainen johto jokaisessa seinässä, 50/60 Hz kenttä joka läpäisee kodin 24 tuntia vuorokaudessa.",
          "Jos mekanismi olisi 'tiedon saatavuus' (TV, internet, puhelin), matkapuhelimen pitäisi olla PARAS proxy koska se ON tietolaite. Se, että se on HUONOIN proxy kun sähkönkulutus (joka mittaa fyysistä infrastruktuuria, ei tietoa) on PARAS, on rakenteellisesti yhdenmukaista EMF-altistuksen kanssa pikemmin kuin tiedonsaannin mekanismina.",
        ],
        studies: [
          { citation: "BERM v17.1 poikkileikkausanalyysi", year: 2026, note: "Matkapuhelin RMSE 1,053 vs sähkö RMSE 0,533 (54 maata)" },
          { citation: "Maailmanpankin kehitysindikaattorit", year: 2024, note: "Lähde: asumisen sähkö, laajakaista, matkapuhelindata" },
        ],
      },
      {
        id: "5g-testis-ros",
        title: "5G-taajuusspesifinen testisevidenssi (Bektas 2026)",
        paragraphs: [
          "Bektas ym. (2026, Bioelectromagnetics, bem.70043) tarjoavat ensimmäisen 5G-taajuusspesifisen testisdatan: rotat altistettiin 3,5 GHz RF-säteilylle (5G:n ydintaajuus), jolloin havaittiin testis- ja oksidatiivinen vaurio sekä heikentynyt testiksen antioksidanttikapasiteetti. CoQ10-lisäravinto lievitti vauriota, osoittaen mekanismin reversiibeliuden. Tämä operoi suoraan tason 5A→6 nuolella (ROS → siittiökaskadi) ja laajentaa oksidatiivisen stressin evidenssipohjan (Yakymenko 2016: 93/100; Panagopoulos 2025: 95 %) 5G-taajuusalueelle.",
          "Vaurion kudosspesifisyyttä korostavat samanaikaiset laadukkaat nollatulokset ihosoluissa: Meyer ym. (2026, Bioelectromagnetics, bem.70046) eivät löytäneet solujen elinvoimaisuusmuutosta, DNA-vauriota eikä mikronukleusmuodostusta HaCaT-keratinosyyteissä 50 Hz, 200 µT:ssa (sokkoutettu, sham-kontrolloitu, WST-1, komet, mikronukleus/CREST); Haidar ym. (2025, Scientific Reports) eivät löytäneet vaikutusta basaaliin ROS-tasoon eikä DNA-vauriota fibroblasteissa ja keratinosyyteissä 5G-moduloidulla 3,5 GHz:llä (SAR 0,08 ja 4 W/kg, 20–48 h). Samat tai vastaavat taajuudet, eri kudokset, eri tulokset — yhdenmukainen BERM:n χ(Ā)-valintasäännön kanssa, jossa vaste riippuu kudosspesifisestä VGIC-tiheydestä, mitokondrioiden ROS-kapasiteetista ja Ca²⁺-varastojen arkkitehtuurista. Molemmat mahdollisuudet (kudosspesifisyys tai riittämätön vaikutus) on pidettävä avoimina.",
          "Tärkeää: Lab baseline bias on symmetrinen. Se ei selitä ainoastaan negatiivisia tuloksia — se tarkoittaa myös, että positiiviset tulokset aliarvioivat todellista vaikutuskokoa. Kun tutkimus havaitsee RF-altistuksen nostavan ROS:ia 30 % sham-kontrolleihin verrattuna, todellinen nousu altistamattomaan lähtötasoon nähden voi olla suurempi, koska sham-kontrollit ovat itsekin osittain altistuneet. Tämä systemaattinen aliarviointi koskee kaikkea in vitro EMF-tutkimusta, ei valikoivasti.",
        ],
        studies: [
          { citation: "Bektas ym. (Bioelectromagnetics)", year: 2026, note: "3,5 GHz → testis-ROS-vaurio; CoQ10 lievittää. Ensimmäinen 5G-taajuusspesifinen testisdata." },
          { citation: "Meyer ym. (Bioelectromagnetics)", year: 2026, note: "50 Hz, 200 µT, HaCaT-keratinosyytit: ei elinvoimaisuusmuutosta, ei DNA-vauriota. Sokkoutettu sham-kontrolloitu." },
          { citation: "Haidar ym. (Scientific Reports)", year: 2025, note: "5G-moduloitu 3,5 GHz, fibroblastit + keratinosyytit: ei ROS:ia, ei DNA-vauriota (CPD). Laadukas nollatulos." },
        ],
      },
      {
        id: "5g-ambient-spectral",
        title: "5G:n ambient-altistusarviointi (Deprez 2025)",
        paragraphs: [
          "Deprez ym. (2025, Bioelectromagnetics, bem.70019) esittävät 5G RF-EMF -altistustasojen spektraalimittaukset neljässä Euroopan maassa — ensimmäistä kvantitatiivista ambient-dataa BERM:n tason 3 kalibrointiin 5G-taajuuksilla. 5G:n suunnatut keilat tuottavat erilaisia spatiaalisia altistuskuvioita kuin 2G/3G/4G: suunnatut keilat voivat luoda korkeampia hetkellisiä henkilökohtaisia altistuksia mutta matalamman taustakomponentin. Tämä muuttaa ambient/personal-suhdetta BERM:n kaksikanavamallissa (total = ambient + χ(Ā) × personal): ambient laskee suhteessa 4G:hen, personal nousee hetkittäin → eri χ(Ā)-dynamiikka.",
        ],
        studies: [
          { citation: "Deprez ym. (Bioelectromagnetics)", year: 2025, note: "5G:n spektraalinen altistusarviointi, 4 Euroopan maata. Suunnattu keila muuttaa ambient/personal-suhdetta." },
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
  const d = locale === "fi" ? COPY.fi : COPY.en;
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
  const d = isFi ? COPY.fi : COPY.en;

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
      />

      {/* Thematic evidence narratives */}
      <section className="mb-16 border-t editorial-rule pt-6">
        <div className="space-y-12 max-w-4xl">
          {d.narratives.map((narrative, ni) => (
            <article key={narrative.id} id={`narrative-${narrative.id}`} className="scroll-mt-24">
              {narrative.id === "electrification-boundary" && <span id="electrification-boundary" />}
              <h3 className="text-lg font-semibold mb-4">
                <span className="font-mono-num text-xs text-accent mr-2">0{ni + 1}</span>
                {narrative.title}
              </h3>
              {narrative.paragraphs.length > 0 && (
                <p className="editorial-rail mb-4 text-[0.95rem] leading-relaxed text-foreground">
                  {narrative.paragraphs[0]}
                </p>
              )}
              <div className="space-y-3 text-sm text-foreground-muted leading-relaxed mb-5">
                {narrative.paragraphs.slice(1).map((p, pi) => (
                  <p key={pi}>{p}</p>
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
                        <td className="py-2 pr-3 font-medium text-foreground">{s.citation}</td>
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
              <li>{isFi ? "Keskenmeno: 2× riski yli 1,6 mG (Li 2002, 2017)" : "Miscarriage: 2× risk above 1.6 mG (Li 2002, 2017)"}</li>
              <li>{isFi ? "ADHD: kohonnut riski korkeammalla prenataalisella MF:llä (Li 2020, JAMA)" : "ADHD: elevated risk with higher prenatal MF (Li 2020, JAMA Network Open)"}</li>
              <li>{isFi ? "Lapsuuden lihavuus: OR 1,69 (Li 2012, Scientific Reports)" : "Childhood obesity: OR 1.69 (Li 2012, Scientific Reports)"}</li>
              <li>{isFi ? "Astma: kohonnut riski (Li 2011)" : "Asthma: elevated risk (Li 2011)"}</li>
              <li>{isFi ? "Siittiölaatu: 2× riski poikkeavaan motiliteettiin (Li 2010)" : "Sperm quality: 2× risk of abnormal motility (Li 2010)"}</li>
            </ul>
          </div>
          <p>
            {isFi
              ? "EMDEX-mittari ei erottele ELF- ja IF-taajuuksia. Korkea kokonaisaltistus korreloi sekä sähköverkon (ELF) että kodinkoneiden/valaistuksen (IF) kanssa. Kaiser-sarja ei voi tunnistaa kumpaa kanavaa vaikutus ohjaa — mutta se osoittaa, että MITATTU magneettikenttäaltistus ennustaa lisääntymis- ja kehitystuloksia useissa päätepisteissä."
              : "The EMDEX meter does not separate ELF from IF frequencies. High total MF correlates with both power grid exposure (ELF) and appliance/lighting exposure (IF). The Kaiser series cannot identify which channel drives the effect — but it demonstrates that MEASURED magnetic field exposure predicts reproductive and developmental outcomes across multiple endpoints."}
          </p>
          <p className="text-xs text-foreground-muted/70 italic">
            {isFi
              ? "Episteeminen taso: [E] (prospektiivinen kohortti, mitattu altistus, NIEHS-rahoitus). HUOM: Li 2017 Editorial Expression of Concern datan jakamisongelman vuoksi (ei retraktio, ei koske tuloksia)."
              : "Epistemic level: [E] (prospective cohort, measured exposure, NIEHS-funded). NOTE: Li 2017 Editorial Expression of Concern due to data sharing inability (not retraction, not about results)."}
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
            {isFi
              ? "Sato ym. (2023) havaitsi tilastollisesti merkitsevän yhteyden pöytätason/kiinteän IH-lieden käytön ja ennenaikaisen synnytyksen välillä (OR 1,27–1,44). Kriittisesti yhteys oli ANNOS-VASTEINEN: korkean emission liedet (9 mT 30 cm:n etäisyydellä) osoittivat korkeamman riskin kuin matalan emission kaapistomallit (4 mT). Tämä annos-vastekuvio viittaa biologiseen mekanismiin sekoittavan tekijän sijaan."
              : "Sato et al. (2023) found a statistically significant association between stationary/tabletop IH cooker use and preterm birth (OR 1.27–1.44). Critically, the association was DOSE-DEPENDENT: high-emission cookers (9 mT at 30 cm) showed higher risk than low-emission built-in models (4 mT). This dose-response pattern suggests a biological mechanism rather than a confounder."}
          </p>
          <p>
            {isFi
              ? "Tokinobu ym. (2021) havaitsi päinvastaisen: IH:n käyttö assosioitui VÄHENTYNEESEEN ennenaikaisen synnytyksen riskiin. Ristiriita selittyy todennäköisesti altistusluokittelulla: Tokinobu yhdisti kaikki IH-tyypit, kun Sato erotti korkean ja matalan emission mallit. Kun korkeat ja matalat keskiarvoistetaan, vastakkaiset vaikutukset voivat kumota toisensa."
              : "Tokinobu et al. (2021) found the opposite: IH use was associated with REDUCED preterm birth risk. The contradiction likely arises from exposure classification: Tokinobu grouped all IH types together, while Sato separated high-emission from low-emission models. When high and low are averaged, opposing effects may cancel."}
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
