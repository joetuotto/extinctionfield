import type { Metadata } from "next";
import Link from "next/link";
import { Moon } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { BehavioralSuppression } from "@/components/BehavioralSuppression";

const COPY = {
  en: {
    title: "Circadian Disruption, Sleep & Recovery",
    subtitle: "Melatonin-fertility bridge, sleep deprivation as mediating mechanism, recovery window elimination, and behavioral suppression pathways",
    backLink: "← Back to Evidence",
    narrativeTitle: "Thematic evidence narratives",
    narrativeLead: "Cross-cutting themes that connect individual studies into mechanistic arguments. Each narrative synthesizes published findings; none establishes a population-level causal coefficient.",
    narratives: [
      {
        id: "recovery",
        title: "Recovery window elimination",
        paragraphs: [
          "The REFLEX project (Diem et al. 2005) demonstrated that intermittent RF exposure produces greater genotoxic effects than continuous exposure at the same SAR, suggesting that cellular repair mechanisms are activated during exposure-free intervals. The recovery window hypothesis proposes that biological repair of RF-induced damage (ROS neutralization, DNA repair, protein refolding) requires sufficient EMF-free time.",
          "A modern urban adult experiences approximately 2 hours per day of near-zero RF exposure (sleep in a connected bedroom), yielding ~20.6% potential recovery time. A 1950s adult experienced approximately 20 hours per day in RF-free environments, yielding ~90.1% recovery time. If repair mechanisms require a minimum duty-free fraction to maintain homeostasis, the 4.4× reduction in recovery time could produce cumulative damage even at sub-thermal exposure levels.",
          "The first 5G-frequency-specific testicular data (Bektas et al. 2026, Bioelectromagnetics) supports the recovery window concept from a different angle: CoQ10 supplementation ameliorated 3.5 GHz RF-induced testicular and oxidative damage in rats. The CoQ10 rescue demonstrates mechanism reversibility — the oxidative pathway is pharmacologically blockable, consistent with the model net_daily = damage_rate × t_emf × (1 − exp(−t_free / τ_repair)). CoQ10 increases antioxidant capacity, effectively shortening τ_repair and reducing net daily damage. This is a pharmacological analogue of the recovery window: instead of reducing exposure time, the intervention enhances repair rate.",
        ],
        studies: [
          { citation: "REFLEX / Diem et al.", year: 2005, note: "Intermittent > continuous genotoxicity" },
          { citation: "Recovery window model (BERM)", year: 2026, note: "20.6% vs 90.1% EMF-free time" },
          { citation: "Bektas et al. (Bioelectromagnetics)", year: 2026, note: "3.5 GHz → testicular ROS damage; CoQ10 ameliorates — mechanism reversibility, consistent with recovery window." },
        ],
      },
      {
        id: "qbs",
        title: "Quadruple behavioral suppression",
        paragraphs: [
          "Conception probability can be decomposed as P(child) = P(approach) × P(attraction) × P(intercourse) × P(fertilization). EMF-sensitive pathways exist at each stage: testosterone governs approach motivation (Puts 2008), attraction requires intact olfactory-hormonal signaling, sexual frequency depends on libido and opportunity, and fertilization requires sperm quality. Each multiplicative factor below 1.0 compounds the reduction.",
          "Goetz et al. 2024 (RCT) demonstrated that exogenous testosterone modulates approach behavior. Dreher et al. 2016 (PNAS) showed testosterone-dependent reward valuation in mating contexts. The dual-hormone meta-analysis (2018, N = 8,538) confirmed that testosterone and cortisol jointly predict dominance and mating effort. If EMF exposure suppresses testosterone at the population level (as suggested by the −1%/year secular trend), all four stages are affected simultaneously.",
        ],
        studies: [
          { citation: "Puts 2008", year: 2008, note: "Testosterone and approach motivation" },
          { citation: "Goetz et al. RCT", year: 2024, note: "Exogenous T modulates approach behavior" },
          { citation: "Dreher et al. PNAS", year: 2016, note: "T-dependent reward valuation" },
          { citation: "Dual-hormone meta-analysis", year: 2018, note: "T + cortisol predict mating effort (N = 8,538)" },
        ],
      },
      {
        id: "oxytocin",
        title: "Dual oxytocin pathway",
        paragraphs: [
          "Two independent biological routes converge on oxytocin suppression. The Porges polyvagal pathway: chronic sympathetic activation (consistent with EMF-induced autonomic stress) downregulates the ventral vagal complex, reducing parasympathetic-mediated OT release. This affects pair bonding, sexual receptivity and uterine contractility.",
          "The Poutahidis/Erdman (MIT) microbiome pathway: Lactobacillus reuteri stimulates OT secretion via the vagus nerve. EMF exposure has been shown to alter gut microbiome composition in animal models. If L. reuteri populations decline under chronic RF exposure, the vagal OT signaling pathway is independently suppressed. Both routes — autonomic and microbial — converge on reduced circulating OT, affecting reproductive behavior and physiology from different directions.",
          "Direct experimental evidence: a 2024 study in Scientific Reports showed that 4.9 GHz RF exposure caused gut microbiome dysbiosis in mice, including decreased microbial diversity and altered Bacteroidetes/Firmicutes ratio. This links RF exposure directly to the gut-brain axis disruption that BERM's pathway E describes: RF → microbiome disruption → L. reuteri decline → vagal oxytocin suppression → reproductive motivation decline.",
        ],
        studies: [
          { citation: "Porges polyvagal theory", year: 2011, note: "Vagal tone → OT release pathway" },
          { citation: "Poutahidis & Erdman (MIT)", year: 2014, note: "L. reuteri → vagus → OT" },
          { citation: "Microbiome-EMF animal studies", year: "2019–24", note: "RF alters gut flora composition" },
          { citation: "Scientific Reports (4.9 GHz RF)", year: 2024, note: "RF → gut dysbiosis: decreased diversity, altered Bacteroidetes/Firmicutes ratio" },
        ],
      },
      {
        id: "melatonin-systematic",
        title: "Melatonin suppression: PRISMA systematic review (Tbahriti 2026)",
        paragraphs: [
          "Tbahriti et al. (2026, Sleep Biol Rhythms 24(2):195–214) present a PRISMA 2020 systematic review of 55 studies from 892 screened, examining EMF effects on circadian rhythms. 88% of high-quality animal studies report EMF-induced melatonin suppression of 20–50% from baseline. Clock gene expression altered. Sleep architecture changes documented. EMF-induced melatonin suppression is smaller than light-induced (>90%).",
          "This directly supports BERM pathway C (EMF → pineal melatonin suppression → GnRH pulsatility disruption → HPG → gonadal function). The 20–50% suppression magnitude is biologically significant and consistent with BERM's v17_night_fraction() function, where EMF is one component of the nocturnal triple hit (melanopsin + CRY + melatonin suppression). The suppression magnitude being smaller than light-induced (>90%) is consistent with BERM modeling EMF as one of multiple nocturnal disruption pathways, not the sole driver. Methodological note: only 27% of reviewed studies met high methodological standards; 48% of animal studies lacked adequate sham controls. The transition from cellular effects to systemic circadian disruption is not fully established clinically.",
          "BERM interpretation: WHO and ICNIRP evidence classifications are subject to the same systematic biases BERM identifies: attenuation bias from proxy exposure measures, control group contamination (lab baseline bias), and funder bias (Huss 2007: industry-funded studies less likely to find harmful effects). If these biases are real, 'moderate certainty' in the standard framework may correspond to higher certainty in a bias-corrected framework. BERM treats institutional evidence hierarchies as CONTEXT_ONLY because they are external to BERM's own epistemology, not because the underlying evidence is weak.",
        ],
        studies: [
          { citation: "Tbahriti et al. (Sleep Biol Rhythms)", year: 2026, note: "PRISMA 55 studies: 88% of high-quality animal studies report melatonin suppression 20–50%. Only 27% met high standards." },
          { citation: "Huss et al. (Environ Health Perspect)", year: 2007, note: "Industry-funded EMF studies less likely to report harmful effects. Systematic funder bias." },
        ],
      },
    ],
  },
  fi: {
    title: "Sirkadiaaninen häiriö, uni ja palautuminen",
    subtitle: "Melatoniini-hedelmällisyyssilta, unideprivaatio välittävänä mekanismina, palautumisikkunan eliminaatio ja käyttäytymissuppressiopolut",
    backLink: "← Takaisin evidenssiin",
    narrativeTitle: "Temaattiset evidenssinarratiivit",
    narrativeLead: "Poikkileikkaavia teemoja, jotka yhdistävät yksittäiset tutkimukset mekanistisiksi argumenteiksi. Kukin narratiivi syntetisoi julkaistuja löydöksiä; mikään ei osoita väestötason kausaalikerrointa.",
    narratives: [
      {
        id: "recovery",
        title: "Palautumisikkunan eliminaatio",
        paragraphs: [
          "REFLEX-projekti (Diem ym. 2005) osoitti, että katkonainen RF-altistus tuottaa suurempia genotoksisia vaikutuksia kuin jatkuva altistus samalla SAR-tasolla, viitaten siihen että solujen korjausmekanismit aktivoituvat altistusvapaina jaksoina. Palautumisikkunahypoteesi esittää, että RF:n aiheuttaman vaurion biologinen korjaus (ROS-neutralointi, DNA-korjaus, proteiinien uudelleenlaskostuminen) vaatii riittävästi EMF-vapaata aikaa.",
          "Moderni kaupunkiaikuinen kokee noin 2 tuntia päivässä lähes nolla-RF-altistusta (uni verkotetussa makuuhuoneessa), jolloin potentiaalinen palautumisaika on noin 20,6 %. 1950-luvun aikuinen koki noin 20 tuntia päivässä RF-vapaissa ympäristöissä, jolloin palautumisaika oli noin 90,1 %. Jos korjausmekanismit vaativat vähimmäismäärän altistusvapaata aikaa homeostaasin ylläpitämiseksi, 4,4-kertainen palautumisajan väheneminen voi tuottaa kumulatiivista vauriota myös subtermisillä altistustasoilla.",
          "Ensimmäinen 5G-taajuusspesifinen testisdata (Bektas ym. 2026, Bioelectromagnetics) tukee palautumisikkunakonseptia eri kulmasta: CoQ10-lisäravinto lievitti 3,5 GHz RF:n aiheuttamaa testis- ja oksidatiivista vauriota rotilla. CoQ10-interventio osoittaa mekanismin reversiibeliuden — oksidatiivinen polku on farmakologisesti estettävissä, yhdenmukainen mallin net_daily = damage_rate × t_emf × (1 − exp(−t_free / τ_repair)) kanssa. CoQ10 lisää antioksidanttikapasiteettia, lyhentäen efektiivisesti τ_repair-arvoa ja vähentäen nettovauriota. Tämä on palautumisikkunan farmakologinen analogi: altistusajan vähentämisen sijaan interventio tehostaa korjausnopeutta.",
        ],
        studies: [
          { citation: "REFLEX / Diem ym.", year: 2005, note: "Katkonainen > jatkuva genotoksisuus" },
          { citation: "Palautumisikkunamalli (BERM)", year: 2026, note: "20,6 % vs 90,1 % EMF-vapaata aikaa" },
          { citation: "Bektas ym. (Bioelectromagnetics)", year: 2026, note: "3,5 GHz → testis-ROS-vaurio; CoQ10 lievittää — mekanismin reversiibeilyys, yhdenmukainen palautumisikkunan kanssa." },
        ],
      },
      {
        id: "qbs",
        title: "Nelinkertainen käyttäytymissuppressio",
        paragraphs: [
          "Hedelmöittymistodennäköisyys voidaan hajottaa muotoon P(lapsi) = P(lähestyminen) × P(attraktio) × P(yhdyntä) × P(hedelmöitys). EMF-herkkiä reittejä on jokaisessa vaiheessa: testosteroni ohjaa lähestymismotivaatiota (Puts 2008), attraktio vaatii ehjää hajuaisti-hormonaalista signalointia, seksuaalinen frekvenssi riippuu libidosta ja mahdollisuudesta, ja hedelmöitys vaatii siittiölaatua. Jokainen alle 1,0:n kerroin kumuloi vähennyksen.",
          "Goetz ym. 2024 (RCT) osoittivat, että eksogeeninen testosteroni moduloi lähestymiskäyttäytymistä. Dreher ym. 2016 (PNAS) osoittivat testosteroniriippuvaisen palkintoarvostuksen parittelukonteksteissa. Kaksoishormonimeta-analyysi (2018, N = 8 538) vahvisti, että testosteroni ja kortisoli ennustavat yhdessä dominanssia ja paritteluponnistelua. Jos EMF-altistus suppressoi testosteronia väestötasolla (kuten −1 %/vuosi sekulaaritrendi viittaa), kaikki neljä vaihetta vaikuttuvat samanaikaisesti.",
        ],
        studies: [
          { citation: "Puts 2008", year: 2008, note: "Testosteroni ja lähestymismotivaatio" },
          { citation: "Goetz ym. RCT", year: 2024, note: "Eksogeeninen T moduloi lähestymistä" },
          { citation: "Dreher ym. PNAS", year: 2016, note: "T-riippuvainen palkintoarvostus" },
          { citation: "Kaksoishormonimeta-analyysi", year: 2018, note: "T + kortisoli ennustavat parittelua (N = 8 538)" },
        ],
      },
      {
        id: "oxytocin",
        title: "Kaksoisoksitossiinireitti",
        paragraphs: [
          "Kaksi itsenäistä biologista reittiä konvergoi oksitosiinin suppressioon. Porgesin polyvagaalireitti: krooninen sympaattinen aktivaatio (yhteensopiva EMF:n aiheuttaman autonomisen stressin kanssa) alassäätelee ventraalista vagaali-kompleksia, vähentäen parasympaattista OT-vapautumista. Tämä vaikuttaa parisiteeseen, seksuaaliseen vastaanottavuuteen ja kohdun supistuvuuteen.",
          "Poutahidiksen/Erdmanin (MIT) mikrobiomireitti: Lactobacillus reuteri stimuloi OT-eritystä vagushermon kautta. EMF-altistuksen on osoitettu muuttavan suoliston mikrobiomikoostumusta eläinmalleissa. Jos L. reuteri -populaatiot vähenevät kroonisen RF-altistuksen alla, vagaalinen OT-signalointireitti suppressoituu itsenäisesti. Molemmat reitit — autonominen ja mikrobinen — konvergoivat vähäisempään kiertävään OT:iin, vaikuttaen lisääntymiskäyttäytymiseen ja -fysiologiaan eri suunnista.",
          "Suora kokeellinen evidenssi: vuoden 2024 Scientific Reports -tutkimus osoitti, että 4,9 GHz RF-altistus aiheutti suoliston mikrobiomidysbioosin hiirillä, mukaan lukien mikrobiston monimuotoisuuden laskun ja muuttuneen Bacteroidetes/Firmicutes-suhteen. Tämä yhdistää RF-altistuksen suoraan suoli-aivo-akselin häiriöön, jota BERM:n polku E kuvaa: RF → mikrobiomin häiriö → L. reuterin väheneminen → vagaalisen oksitosiinin suppressio → lisääntymismotivaation lasku.",
        ],
        studies: [
          { citation: "Porges polyvagaaliteoria", year: 2011, note: "Vagaalinen tonus → OT-vapautumisreitti" },
          { citation: "Poutahidis & Erdman (MIT)", year: 2014, note: "L. reuteri → vagus → OT" },
          { citation: "Mikrobiomi-EMF-eläintutkimukset", year: "2019–24", note: "RF muuttaa suolistoflooraa" },
          { citation: "Scientific Reports (4,9 GHz RF)", year: 2024, note: "RF → suolistodysbioosia: vähentynyt diversiteetti, muuttunut Bacteroidetes/Firmicutes-suhde" },
        ],
      },
      {
        id: "melatonin-systematic",
        title: "Melatoniinisuppressio: PRISMA-katsaus (Tbahriti 2026)",
        paragraphs: [
          "Tbahriti ym. (2026, Sleep Biol Rhythms 24(2):195–214) esittävät PRISMA 2020 -systemaattisen katsauksen: 55 tutkimusta 892 seulotusta, tarkastellen EMF:n vaikutuksia sirkadiaanirytmeihin. 88 % korkealaatuisista eläintutkimuksista raportoi EMF-indusoitua melatoniinisuppressiota (20–50 % basaalitasosta). Kellogenien ekspressio muuttuu. Uniarkkitehtuurin muutokset dokumentoitu. EMF:n melatoniinisuppressio on pienempi kuin valon aiheuttama (>90 %).",
          "Tukee suoraan BERM:n polkua C (EMF → pineaalinen melatoniinisuppressio → GnRH-pulsaatiohäiriö → HPG → gonadifunktio). 20–50 %:n suppressio on biologisesti merkittävä ja yhdenmukainen BERM:n v17_night_fraction()-funktion kanssa, jossa EMF on yksi komponentti yöllisessä kolminkertaisessa osumassa (melanopsiini + CRY + melatoniinisuppressio). Suppression suuruus on pienempi kuin valon aiheuttama (>90 %) — yhdenmukainen sen kanssa, että BERM mallintaa EMF:n yhtenä useista yöllisistä häiriöreiteistä, ei ainoana ajurina. Metodologinen huomio: vain 27 % tutkimuksista täytti korkeat metodologiset standardit; 48 % eläintutkimuksista ilman riittävää sham-kontrollia. Siirtymä soluvaikutuksista systeemiseen sirkadiaaniseen häiriöön ei ole täysin osoitettu kliinisesti.",
          "BERM-tulkinta: WHO:n ja ICNIRP:n evidenssiluokitukset ovat alttiina samoille systemaattisille vinoumille jotka BERM tunnistaa: proxy-altistusmittauksen vaimennusbias, kontrolliryhmän kontaminaatio (lab baseline bias) ja rahoittajan vinouma (Huss 2007: teollisuusrahoitteiset tutkimukset löytävät harvemmin haittoja). Jos nämä vinoumat ovat todellisia, 'kohtalainen varmuus' standardikehyksessä voi vastata korkeampaa varmuutta bias-korjatussa kehyksessä. BERM käsittelee institutionaalisia evidenssihierarkioita CONTEXT_ONLY-roolissa koska ne ovat BERM:n epistemologian ulkopuolisia, ei siksi että alla oleva evidenssi olisi heikkoa.",
        ],
        studies: [
          { citation: "Tbahriti ym. (Sleep Biol Rhythms)", year: 2026, note: "PRISMA, 55 tutkimusta: 88 % korkealaatuisista eläintutkimuksista raportoi melatoniinisuppressiota 20–50 %. Vain 27 % täytti korkeat standardit." },
          { citation: "Huss ym. (Environ Health Perspect)", year: 2007, note: "Teollisuusrahoitteiset EMF-tutkimukset raportoivat harvemmin haittoja. Systemaattinen rahoittajan vinouma." },
        ],
      },
    ],
  },
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const d = locale === "fi" ? COPY.fi : COPY.en;
  return { title: `${d.title} – Extinction Field`, description: d.subtitle };
}

export default async function CircadianPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const activeLocale = locale === "fi" ? "fi" : "en";
  const d = COPY[activeLocale];

  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <Link href={`/${locale}/evidence`} className="text-sm text-accent hover:underline mb-6 inline-block">
        {d.backLink}
      </Link>

      <PageHeader icon={Moon} title={d.title} subtitle={d.subtitle} />

      {/* Thematic evidence narratives */}
      <section className="mb-16 border-t editorial-rule pt-6">
        <h2 className="editorial-section-heading mb-3">{d.narrativeTitle}</h2>
        <p className="text-sm text-foreground-muted leading-relaxed mb-8 max-w-4xl">{d.narrativeLead}</p>

        <div className="space-y-12 max-w-4xl">
          {d.narratives.map((narrative, ni) => (
            <article key={narrative.id} id={`narrative-${narrative.id}`} className="scroll-mt-24">
              {narrative.id === "qbs" && <span id="qbs" />}
              {narrative.id === "oxytocin" && <><span id="pathway-E" /><span id="gut" /><span id="vagal-tone" /></>}
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
                      <th className="py-2 pr-3">{activeLocale === "fi" ? "Viite" : "Citation"}</th>
                      <th className="py-2 pr-3 w-16">{activeLocale === "fi" ? "Vuosi" : "Year"}</th>
                      <th className="py-2">{activeLocale === "fi" ? "Huomio" : "Note"}</th>
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

              {narrative.id === "qbs" && (
                <div className="mt-8">
                  <BehavioralSuppression locale={activeLocale} />
                </div>
              )}
            </article>
          ))}
        </div>
      </section>

      {/* Melatonin-fertility bridge: cascade 1 → cascade 6 */}
      <section id="melatonin-bridge" className="mb-16 border-t editorial-rule pt-6">
        <span id="melatonin" /><span id="ovarian" /><span id="fertility" />
        <h2 className="editorial-section-heading mb-3">
          {activeLocale === "fi" ? "Melatoniinisilta: kaskadi 1 → kaskadi 6" : "The Melatonin Bridge: Cascade 1 → Cascade 6"}
        </h2>
        <div className="space-y-4 text-sm text-foreground-muted leading-relaxed max-w-4xl">
          <p className="editorial-rail text-[0.95rem] text-foreground">
            {activeLocale === "fi"
              ? "BERM:n kuusi kaskadia eivät ole rinnakkaisia — ne ovat sarjassa. Melatoniini on kriittinen silta kaskadin 1 (uni/sirkadiaaninen) ja kaskadin 6 (hedelmällisyys) välillä. EMF → pinealirauhanen → melatoniinisuppressio → HPG-akselin häiriö + follikulaarisen antioksidanttipuolustuksen heikkeneminen → hedelmällisyyden lasku. Tämä reitti on erillinen EMF:n suorasta gonadivasteesta (VGCC → siittiöt), ja molempien täytyy olla aktiivisia samanaikaisesti kokonaisvaikutuksen tuottamiseksi."
              : "BERM's six cascades are not parallel — they are serial. Melatonin is the critical bridge between cascade 1 (sleep/circadian) and cascade 6 (fertility). EMF → pineal gland → melatonin suppression → HPG axis disruption + follicular antioxidant defense decline → fertility decline. This pathway is separate from EMF's direct gonadal effects (VGCC → sperm), and both must be active simultaneously to produce the full effect."}
          </p>
          <p>
            {activeLocale === "fi"
              ? "Pinealirauhanen 'näkee' sähkömagneettisen kentän valona. Battellen tutkimus (1980) osoitti EMF:n suppressoivan yöllistä melatoniinihuippua koe-eläimillä. Mekanismi: magnetiitti (Fe₃O₄) pinealirauhan kalvoilla ja/tai kryptokromien (CRY1/CRY2) radikaalipari­mekanismi havaitsevat kentän, NAT-aktiivisuus (serotoniiini → melatoniini -konversio) hidastuu, yöllisen melatoniinihuipun amplitudi laskee ja ajoitus viivästyy. Ihmistutkimukset ovat RISTIRIITAISIA: jotkin osoittavat suppressiota, toiset eivät — mutta eläindata on johdonmukaista ja mekanismi on biologisesti uskottava."
              : "The pineal gland 'sees' electromagnetic fields as light. Battelle's study (1980) demonstrated EMF suppression of nocturnal melatonin peak in experimental animals. Mechanism: magnetite (Fe₃O₄) on pineal membranes and/or cryptochrome (CRY1/CRY2) radical pair mechanism sense the field, NAT activity (serotonin → melatonin conversion) slows, nocturnal melatonin peak amplitude drops and timing delays. Human studies are INCONSISTENT: some show suppression, others don't — but animal data is consistent and the mechanism is biologically plausible."}
          </p>
          <p>
            {activeLocale === "fi"
              ? "Melatoniini follikkuli­nesteessä on munasolun kriittinen suojaaja. Tamura ym. (2012) osoittivat, että follikkelinesteen melatoniinikonsentraatio korreloi suoraan munasolun laadun kanssa. Melatoniini neutraloi happiradikaaleja (ROS), suojaa mitokondriaalista DNA:ta ja säätelee Gdf9- ja Bmp15-geenien ilmentymistä munasoluissa. IVF meta-analyysit (Tong 2017, PMC12500685, PMC11265587) osoittavat johdonmukaisesti: melatoniinilisä parantaa fertilisaatioastetta, alkionlaatua ja kliinistä raskausastetta. Mutta meta-analyysien otoskoot ovat pieniä, sokkoutus vaikeaa ja julkaisuvinouma mahdollinen."
              : "Melatonin in follicular fluid is the oocyte's critical protector. Tamura et al. (2012) showed that follicular fluid melatonin concentration directly correlates with oocyte quality. Melatonin neutralizes reactive oxygen species (ROS), protects mitochondrial DNA, and regulates Gdf9 and Bmp15 gene expression in oocytes. IVF meta-analyses (Tong 2017, PMC12500685, PMC11265587) consistently show: melatonin supplementation improves fertilization rate, embryo quality, and clinical pregnancy rate. But meta-analysis sample sizes are small, blinding is difficult, and publication bias is possible."}
          </p>
          <p>
            {activeLocale === "fi"
              ? "Miesten hedelmällisyydessä melatoniini suojaa Leydigin soluja oksidatiiviselta stressiltä (testosteronituotanto), säätelee HPG-akselia (GnRH → LH/FSH) ja ylläpitää siittiöiden mitokondriaalista toimintaa. Nishihara ym. (2014) osoittivat melatoniinin parantavan siittiöiden liikkuvuutta in vitro. VAROITUS: melatoniinin HPG-vaikutus EI ole yksisuuntainen — korkeina pitoisuuksina melatoniini voi SUPPRESSOIDA GnRH:ta joissain konteksteissa. Melatoniinilisä ei ole riskitöntä lisääntymisiässä."
              : "In male fertility, melatonin protects Leydig cells from oxidative stress (testosterone production), regulates the HPG axis (GnRH → LH/FSH), and maintains sperm mitochondrial function. Nishihara et al. (2014) showed melatonin improves sperm motility in vitro. CAUTION: melatonin's HPG effect is NOT unidirectional — at high concentrations, melatonin can SUPPRESS GnRH in some contexts. Melatonin supplementation is not risk-free in reproductive age."}
          </p>
          <p>
            {activeLocale === "fi"
              ? "Vuorotyö on vahvin luonnollinen koe melatoniinisillalle: se suppressoi melatoniinia sirkadiaanisen häiriön, työpaikan valaistuksen JA mahdollisen ammatillisen EMF:n kautta samanaikaisesti. Vuorotyöntekijöillä on dokumentoitu matalampi hedelmällisyys, enemmän raskauskomplikaatioita ja epäsäännöllisemmät kuukautiskierrot. Mutta vuorotyön hedelmällisyysvaikutukset ovat MONITEKIJÄISIÄ — stressi, ruokailutottumukset, sosiaalinen eristäytyminen ja muut tekijät vaikuttavat. Melatoniini on yksi tekijä, ei ainoa."
              : "Shift work is the strongest natural experiment for the melatonin bridge: it suppresses melatonin through circadian disruption, workplace lighting, AND possible occupational EMF simultaneously. Shift workers have documented lower fertility, more pregnancy complications, and more irregular menstrual cycles. But shift work fertility effects are MULTIFACTORIAL — stress, eating patterns, social isolation, and other factors contribute. Melatonin is one factor, not the only one."}
          </p>
        </div>

        <div className="mt-6 overflow-x-auto">
          <h3 className="text-xs uppercase tracking-[0.16em] text-foreground-muted/60 mb-2">
            {activeLocale === "fi" ? "Viisi melatoniini–hedelmällisyys -polkua" : "Five melatonin–fertility pathways"}
          </h3>
          <table className="w-full text-sm border-collapse max-w-4xl">
            <thead>
              <tr className="border-b border-card-border text-left text-xs text-foreground-muted uppercase tracking-wider">
                <th className="py-2 pr-3">{activeLocale === "fi" ? "Polku" : "Pathway"}</th>
                <th className="py-2">{activeLocale === "fi" ? "Mekanismi" : "Mechanism"}</th>
              </tr>
            </thead>
            <tbody className="text-foreground-muted">
              <tr className="border-b border-card-border/40">
                <td className="py-2 pr-3 font-medium text-foreground">HPG</td>
                <td className="py-2">{activeLocale === "fi" ? "Melatoniini → hypotalamus → GnRH → LH/FSH → gonadit" : "Melatonin → hypothalamus → GnRH → LH/FSH → gonads"}</td>
              </tr>
              <tr className="border-b border-card-border/40">
                <td className="py-2 pr-3 font-medium text-foreground">{activeLocale === "fi" ? "Antioksidantti" : "Antioxidant"}</td>
                <td className="py-2">{activeLocale === "fi" ? "Melatoniini follikkuli­nesteessä → ROS-neutralointi → munasolun suoja" : "Melatonin in follicular fluid → ROS neutralization → oocyte protection"}</td>
              </tr>
              <tr className="border-b border-card-border/40">
                <td className="py-2 pr-3 font-medium text-foreground">{activeLocale === "fi" ? "Anti-inflammatorinen" : "Anti-inflammatory"}</td>
                <td className="py-2">{activeLocale === "fi" ? "Melatoniini → NF-κB ↓ → krooninen tulehdus ↓ → endometrioosi/PCOS ↓" : "Melatonin → NF-κB ↓ → chronic inflammation ↓ → endometriosis/PCOS ↓"}</td>
              </tr>
              <tr className="border-b border-card-border/40">
                <td className="py-2 pr-3 font-medium text-foreground">{activeLocale === "fi" ? "Mitokondriaalinen" : "Mitochondrial"}</td>
                <td className="py-2">{activeLocale === "fi" ? "Melatoniini → AMPK/SIRT1 ↑ → lisääntymissolujen energia ↑" : "Melatonin → AMPK/SIRT1 ↑ → reproductive cell energy ↑"}</td>
              </tr>
              <tr className="border-b border-card-border/40">
                <td className="py-2 pr-3 font-medium text-foreground">{activeLocale === "fi" ? "Epigeneettinen" : "Epigenetic"}</td>
                <td className="py-2">{activeLocale === "fi" ? "Melatoniini säätelee Gdf9- ja Bmp15-geenien ilmentymistä munasoluissa" : "Melatonin regulates Gdf9 and Bmp15 gene expression in oocytes"}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="mt-6 overflow-x-auto">
          <h3 className="text-xs uppercase tracking-[0.16em] text-foreground-muted/60 mb-2">
            {activeLocale === "fi" ? "Viitteet" : "References"}
          </h3>
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
                <td className="py-2 pr-3 font-medium text-foreground">Battelle / Wilson ym.</td>
                <td className="py-2 pr-3 font-mono-num">1980</td>
                <td className="py-2">{activeLocale === "fi" ? "EMF suppressoi yöllistä melatoniinia koe-eläimissä (60 Hz, ELF)" : "EMF suppresses nocturnal melatonin in experimental animals (60 Hz, ELF)"}</td>
              </tr>
              <tr className="border-b border-card-border/40">
                <td className="py-2 pr-3 font-medium text-foreground">Tamura ym.</td>
                <td className="py-2 pr-3 font-mono-num">2012</td>
                <td className="py-2">{activeLocale === "fi" ? "Follikkuli­nesteen melatoniini korreloi munasolun laadun kanssa; antioksidanttirooli munasolussa" : "Follicular fluid melatonin correlates with oocyte quality; antioxidant role in oocyte"}</td>
              </tr>
              <tr className="border-b border-card-border/40">
                <td className="py-2 pr-3 font-medium text-foreground">Tong ym.</td>
                <td className="py-2 pr-3 font-mono-num">2017</td>
                <td className="py-2">{activeLocale === "fi" ? "Meta-analyysi: melatoniinilisä parantaa IVF-tuloksia (fertilisaatio, alkion laatu, raskaus)" : "Meta-analysis: melatonin supplementation improves IVF outcomes (fertilization, embryo quality, pregnancy)"}</td>
              </tr>
              <tr className="border-b border-card-border/40">
                <td className="py-2 pr-3 font-medium text-foreground">PMC12500685</td>
                <td className="py-2 pr-3 font-mono-num">2025</td>
                <td className="py-2">{activeLocale === "fi" ? "Systemaattinen katsaus: melatoniini parantaa munasolun ja alkion laatua IVF:ssä" : "Systematic review: melatonin improves oocyte and embryo quality in IVF"}</td>
              </tr>
              <tr className="border-b border-card-border/40">
                <td className="py-2 pr-3 font-medium text-foreground">PMC11265587</td>
                <td className="py-2 pr-3 font-mono-num">2024</td>
                <td className="py-2">{activeLocale === "fi" ? "Meta-analyysi: melatoniini parantaa kliinistä raskausastetta IVF:ssä" : "Meta-analysis: melatonin improves clinical pregnancy rate in IVF"}</td>
              </tr>
              <tr className="border-b border-card-border/40">
                <td className="py-2 pr-3 font-medium text-foreground">PMC10354453</td>
                <td className="py-2 pr-3 font-mono-num">2023</td>
                <td className="py-2">{activeLocale === "fi" ? "Katsaus: melatoniinin viisi reittiä naisen hedelmällisyyteen (HPG, antioksidantti, anti-inflammatorinen, mitokondriaalinen, epigeneettinen)" : "Review: melatonin's five pathways to female fertility (HPG, antioxidant, anti-inflammatory, mitochondrial, epigenetic)"}</td>
              </tr>
              <tr className="border-b border-card-border/40">
                <td className="py-2 pr-3 font-medium text-foreground">Reiter ym.</td>
                <td className="py-2 pr-3 font-mono-num">2007</td>
                <td className="py-2">{activeLocale === "fi" ? "Melatoniini suojaa siittiöitä oksidatiiviselta vauriolta; säätelee HPG-akselia" : "Melatonin protects sperm from oxidative damage; regulates HPG axis"}</td>
              </tr>
              <tr className="border-b border-card-border/40">
                <td className="py-2 pr-3 font-medium text-foreground">Unfer ym.</td>
                <td className="py-2 pr-3 font-mono-num">2011</td>
                <td className="py-2">{activeLocale === "fi" ? "Melatoniini IVF:ssä: munasolun laatu paranee, mutta pienet otoskoot ja sokkoutuksen haasteet" : "Melatonin in IVF: oocyte quality improves, but small sample sizes and blinding challenges"}</td>
              </tr>
              <tr className="border-b border-card-border/40">
                <td className="py-2 pr-3 font-medium text-foreground">Nishihara ym.</td>
                <td className="py-2 pr-3 font-mono-num">2014</td>
                <td className="py-2">{activeLocale === "fi" ? "Melatoniini parantaa siittiöiden liikkuvuutta in vitro" : "Melatonin improves sperm motility in vitro"}</td>
              </tr>
              <tr className="border-b border-card-border/40">
                <td className="py-2 pr-3 font-medium text-foreground">Rad. Prot. Dosimetry</td>
                <td className="py-2 pr-3 font-mono-num">2013</td>
                <td className="py-2">{activeLocale === "fi" ? "RF-EMF ja melatoniinisuppressio: epidemiologinen katsaus (tulokset epäjohdonmukaisia ihmisillä)" : "RF-EMF and melatonin suppression: epidemiological review (inconsistent results in humans)"}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-xs text-foreground-muted italic mt-4 max-w-4xl">
          {activeLocale === "fi"
            ? "Episteeminen taso: Melatoniini follikkuli­nesteessä → munasolun laatu [E] (Tamura 2012, replikoitu). Melatoniinilisä IVF:ssä [E] (meta-analyysit, mutta pienet otoskoot). EMF → melatoniinisuppressio [M|C] (vahva eläindata, epäjohdonmukainen ihmisdata). Melatoniini-hedelmällisyyssilta kokonaisuutena [C] (teoreettinen yhdistäminen). IVF meta-analyysit ovat pieniä — julkaisuvinouma mahdollinen. Melatoniini HPG-vaikutus on KAKSISUUNTAINEN. Vuorotyön hedelmällisyysvaje on monitekijäinen — melatoniini on yksi polku."
            : "Epistemic level: Melatonin in follicular fluid → oocyte quality [E] (Tamura 2012, replicated). Melatonin supplementation in IVF [E] (meta-analyses, but small sample sizes). EMF → melatonin suppression [M|C] (strong animal data, inconsistent human data). Melatonin-fertility bridge as a whole [C] (theoretical unification). IVF meta-analyses are small — publication bias possible. Melatonin HPG effect is BIDIRECTIONAL. Shift work fertility deficit is multifactorial — melatonin is one pathway."}
        </p>
      </section>

      {/* Sleep as mediating mechanism */}
      <section id="sleep" className="mb-16 border-t editorial-rule pt-6">
        <span id="testosterone" /><span id="nk-cells" /><span id="cortisol" />
        <h2 className="editorial-section-heading mb-3">
          {activeLocale === "fi" ? "Unideprivaatio keskeisenä välittävänä mekanismina" : "Sleep deprivation as the central mediating mechanism"}
        </h2>
        <div className="space-y-4 text-sm text-foreground-muted leading-relaxed max-w-4xl">
          <p className="editorial-rail text-[0.95rem] text-foreground">
            {activeLocale === "fi"
              ? "Unideprivaatio tuottaa jokaisen biologisen lopputuloksen jonka BERM:n kuusi retrodiktiota kuvaavat: testosteronilasku (Leproult & Van Cauter: −10–15 % nuorilla miehillä), siittiölasku (−29 %, enemmän epämuodostumia), NK-solujen romahdus (Irwin: −70 % yhdessä yössä), metabolinen oireyhtymä (Spiegel ym.: pre-diabeettinen tila viikossa), sympaattinen yliaktivaatio (krooninen tulehdus) ja masennus (Walker: 'syy, ei oire'). Jos EMF häiritsee unta — kuten sirkadiaaninen polku (CRY/RPM, melatoniinisuppressio) ennustaa — kaikki kuusi retrodiktiota seuraavat yhden ylävirran syyn alavirtavaikutuksina."
              : "Sleep deprivation produces every biological outcome that BERM's six retrodictions describe: testosterone decline (Leproult & Van Cauter: −10–15% in young men), sperm decline (−29% with more deformities), NK cell collapse (Irwin: −70% in one night), metabolic syndrome (Spiegel et al.: pre-diabetic in one week), sympathetic overdrive (chronic inflammation), and depression (Walker: 'a cause, not a symptom'). If EMF disrupts sleep — which the circadian pathway (CRY/RPM, melatonin suppression) predicts — then ALL six retrodictions follow as downstream consequences of a single upstream cause."}
          </p>
          <p>
            {activeLocale === "fi"
              ? "Järjestys jossa nämä tilat ilmaantuvat vastaa modulooman ennustetta: unihäiriö ensin (lyhin latenssi, kuukausia), masennus toisena (1–3 vuotta), metabolinen oireyhtymä kolmantena (3–8 vuotta), autoimmuunisairaus neljäntenä (5–10 vuotta), hedelmällisyyslasku viidentenä (5–15 vuotta), syöpä kuudentena (10–25 vuotta). Tämä järjestys ei ole mielivaltainen — se heijastaa kunkin kudoksen uusiutumisnopeutta ja kumulatiivisen vaurion kynnystä. Walker dokumentoi saman kaskadin empiirisesti ilman EMF-kehystä, tarjoten riippumattoman validoinnin modulooman ennustamalle järjestykselle."
              : "The order in which these conditions appear matches the modulome's prediction: sleep disruption first (shortest latency, months), depression second (1–3 years), metabolic syndrome third (3–8 years), autoimmune disease fourth (5–10 years), fertility decline fifth (5–15 years), cancer sixth (10–25 years). This order is not arbitrary — it reflects each tissue's regeneration rate and cumulative damage threshold. Walker documents this same cascade empirically without an EMF framework, providing independent validation of the modulome's predicted ordering."}
          </p>
          <p>
            {activeLocale === "fi"
              ? "Jos uniepidemia johtuisi yksinomaan sinisestä valosta, sinisen valon suodatus (Night Shift, f.lux, keltaiset lasit) korjaisi sen. Se ei korjaa: Duraccio ym. (2021) osoitti, ettei Night Shift-tila parantanut merkittävästi objektiivista unenlaatua. BERM ehdottaa, että sähkömagneettisen kentän komponentti (laitteen RF, LED-valaistuksen IF) on itsenäinen unihäiritsijä joka toimii CRY/RPM-mekanismin kautta, ei retinaalisen melanopsiinin. Tämä selittää miksi valon suodatus ei riitä — EMF-polku ohittaa silmän kokonaan."
              : "If the sleep epidemic were caused solely by blue light from screens, blue-light filtering (Night Shift, f.lux, amber glasses) should resolve it. It does not: Duraccio et al. (2021) showed that Night Shift mode did not significantly improve objective sleep quality. BERM proposes that the electromagnetic field component (RF from the device, IF from LED lighting) is an independent sleep disruptor that operates through the CRY/RPM mechanism, not through retinal melanopsin. This explains why filtering light is insufficient — the EMF pathway bypasses the eye entirely."}
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
                <td className="py-2 pr-3 font-medium text-foreground">Walker MP</td>
                <td className="py-2 pr-3 font-mono-num">2017</td>
                <td className="py-2">{activeLocale === "fi" ? "Uni → testosteroni −10–15 %, siittiöt −29 %, NK-solut −70 %, metabolinen oireyhtymä, masennus (kausaalinen)" : "Sleep → testosterone −10–15%, sperm −29%, NK cells −70%, metabolic syndrome, depression (causal)"}</td>
              </tr>
              <tr className="border-b border-card-border/40">
                <td className="py-2 pr-3 font-medium text-foreground">Leproult & Van Cauter (JAMA)</td>
                <td className="py-2 pr-3 font-mono-num">2011</td>
                <td className="py-2">{activeLocale === "fi" ? "5h uni 1 viikko → testosteroni −10–15 % nuorilla miehillä" : "5h sleep for 1 week → testosterone −10–15% in young men"}</td>
              </tr>
              <tr className="border-b border-card-border/40">
                <td className="py-2 pr-3 font-medium text-foreground">Irwin MR (Annu Rev Psychol)</td>
                <td className="py-2 pr-3 font-mono-num">2015</td>
                <td className="py-2">{activeLocale === "fi" ? "4h uni 1 yö → NK-solut −70 %. WHO 2A: yötyö" : "4h sleep 1 night → NK cells −70%. WHO 2A: night-shift work"}</td>
              </tr>
              <tr className="border-b border-card-border/40">
                <td className="py-2 pr-3 font-medium text-foreground">Spiegel, Leproult & Van Cauter (Lancet)</td>
                <td className="py-2 pr-3 font-mono-num">1999</td>
                <td className="py-2">{activeLocale === "fi" ? "4h uni 6 yötä → pre-diabeettinen glukoositoleranssi" : "4h sleep for 6 nights → pre-diabetic glucose tolerance"}</td>
              </tr>
              <tr className="border-b border-card-border/40">
                <td className="py-2 pr-3 font-medium text-foreground">Chang et al. (PNAS)</td>
                <td className="py-2 pr-3 font-mono-num">2015</td>
                <td className="py-2">{activeLocale === "fi" ? "iPad-lukeminen: melatoniini −50 %, viive +3h, LED 2× vs hehku" : "iPad reading: melatonin −50%, delay +3h, LED 2× vs incandescent"}</td>
              </tr>
              <tr className="border-b border-card-border/40">
                <td className="py-2 pr-3 font-medium text-foreground">Duraccio et al. (Sleep Health)</td>
                <td className="py-2 pr-3 font-mono-num">2021</td>
                <td className="py-2">{activeLocale === "fi" ? "Night Shift EI parantanut objektiivista unenlaatua" : "Night Shift did NOT improve objective sleep quality"}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-xs text-foreground-muted italic mt-4 max-w-4xl">
          {activeLocale === "fi"
            ? "Episteeminen taso: mekanismi [E] (Walker/Leproult/Irwin/Spiegel data). EMF-kytkentä: [M|C] (CRY/RPM + Lindecke 2026)."
            : "Epistemic level: mechanism [E] (Walker/Leproult/Irwin/Spiegel data). EMF linkage: [M|C] (CRY/RPM + Lindecke 2026)."}
        </p>
      </section>

      {/* Proxy masking: Walker example */}
      <section className="mb-16 border-t editorial-rule pt-6">
        <h2 className="editorial-section-heading mb-3">
          {activeLocale === "fi" ? "Proksimasking: unitutkimuksen sokea piste" : "Proxy masking: the blind spot in sleep science"}
        </h2>
        <div className="max-w-4xl rounded-lg border border-card-border bg-card-bg p-5">
          <p className="text-sm text-foreground-muted leading-relaxed">
            {activeLocale === "fi"
              ? "Paradigmaattinen esimerkki: Matthew Walkerin 'Why We Sleep' (2017) on kenties vaikutusvaltaisin unitutkimuksen kirja koskaan. Walker analysoi laajasti miten LED-näytöt suppressoivat melatoniinia sinisen valon kautta. Hän dokumentoi LED-sinisen valon aiheuttavan 2× melatoniinisuppression verrattuna hehkulamppuun samalla intensiteetillä. Silti hän ei koskaan kysy tuottavatko LED-laitteet muuta kuin valoa — erityisesti, emittoivatko jokaisen LED-laitteen hakkuriteholähteet keskitaajuisia sähkömagneettisia kenttiä (20–200 kHz) jotka voisivat itsenäisesti häiritä sirkadiaanista järjestelmää CRY/RPM-mekanismin kautta. Sähkömagneettinen kenttä ei ole hänen käsitteellisessä sanastossaan. Tämä ei ole kritiikki Walkeria kohtaan — se on osoitus siitä, miten täydellisesti EMF-hypoteesi puuttuu valtavirran unitieteestä."
              : "A paradigmatic example: Matthew Walker's 'Why We Sleep' (2017) is perhaps the most influential sleep science book ever written. Walker devotes extensive analysis to how LED screens suppress melatonin through blue light. He documents that LED blue light has twice the melatonin-suppressing effect of incandescent light at matched intensity. Yet he never asks whether LED devices produce anything other than light — specifically, whether the switch-mode power supplies in every LED device emit intermediate-frequency electromagnetic fields (20–200 kHz) that might independently disrupt the circadian system through the CRY/RPM mechanism. The electromagnetic field is not in his conceptual vocabulary. This is not a criticism of Walker — it is a demonstration of how completely the EMF hypothesis is absent from mainstream sleep science."}
          </p>
        </div>
      </section>

      {/* See also navigation */}
      <section className="border-t editorial-rule pt-6">
        <h2 className="editorial-section-heading mb-4">
          {activeLocale === "fi" ? "Katso myös" : "See also"}
        </h2>
        <div className="grid gap-3 sm:grid-cols-2">
          <Link
            href={`/${locale}/evidence`}
            className="rounded-lg border border-card-border bg-card-bg p-4 hover:border-accent transition-colors"
          >
            <h3 className="font-semibold text-sm">{activeLocale === "fi" ? "Evidenssirekisteri" : "Evidence Register"}</h3>
            <p className="text-xs text-foreground-muted mt-1">{activeLocale === "fi" ? "Kaikki evidenssitietueet ja -narratiivit" : "All evidence records and narratives"}</p>
          </Link>
          <Link
            href={`/${locale}/evidence/eyes`}
            className="rounded-lg border border-card-border bg-card-bg p-4 hover:border-accent transition-colors"
          >
            <h3 className="font-semibold text-sm">{activeLocale === "fi" ? "Silmien väri ja magnetoreseptio" : "Eye Color & Magnetoreception"}</h3>
            <p className="text-xs text-foreground-muted mt-1">{activeLocale === "fi" ? "CRY-herkkyys, iiriksen pigmentaatio ja ravitsemus" : "CRY sensitivity, iris pigmentation, and nutrition"}</p>
          </Link>
          <Link
            href={`/${locale}/evidence/nutrition`}
            className="rounded-lg border border-card-border bg-card-bg p-4 hover:border-accent transition-colors"
          >
            <h3 className="font-semibold text-sm">{activeLocale === "fi" ? "Ravitsemuksellinen CRY-modulaatio" : "Nutritional CRY Modulation"}</h3>
            <p className="text-xs text-foreground-muted mt-1">{activeLocale === "fi" ? "B2, omega-rasvahapot ja paastodynamiikka" : "B2, omega fatty acids, and fasting dynamics"}</p>
          </Link>
        </div>
      </section>
    </div>
  );
}
