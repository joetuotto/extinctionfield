import type { Metadata } from "next";
import { Eye } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import Link from "next/link";
import {
  EVIDENCE_CARDS,
  EYE_PROFILES,
  NUTRITIONAL_MODULATORS,
  PREDICTIONS,
  EPISTEMIC_LEVELS,
} from "@/lib/eyeColorData";
import { CHAIN_EPISTEMIC_COLORS } from "@/lib/epistemicConstants";

const COPY = {
  en: {
    title: "Eye Color & Magnetoreception",
    subtitle: "How iris pigmentation, nutrition, and sex modulate CRY sensitivity",
    backLink: "← Back to Evidence",
    section1Title: "Your Eyes Are Antennas",
    section1: [
      "Every eye contains a hidden sensor. In the retinal ganglion cells — not the rods and cones you learned about in school, but a separate layer of cells closer to the surface — sits a protein called cryptochrome. This protein does something remarkable: it absorbs blue light and uses the energy to create pairs of electrons whose quantum spin states are sensitive to the Earth's magnetic field.",
      "In birds, this system is a compass. European robins use it to navigate thousands of kilometers. In 2011, researchers showed that the human version of cryptochrome (CRY2) can function as a magnetosensor when placed into fruit flies. In 2019, Chae and colleagues demonstrated that blindfolded humans lost their ability to orient toward geomagnetic cues, but only when blue light was removed — the diagnostic signature of the cryptochrome mechanism.",
      "What does this have to do with eye color? Everything.",
      "Blue eyes transmit roughly 100 times more light through the iris than brown eyes. This isn't about seeing better — in fact, blue-eyed people are more sensitive to glare. The extra light reaches those deep ganglion cells where cryptochrome lives. More blue photons means more cryptochrome activation, which means a stronger magnetic signal.",
      "But there's a subtlety that makes this story richer than \"blue eyes = better antenna.\" Cryptochrome's magnetic sensitivity doesn't depend on just any light. It has a two-stage operating cycle: blue light (under 500 nm) activates it, and green light (500-570 nm) maintains it in its magnetically sensitive state. Too much blue light actually pushes the protein past its sensitive state into an inactive form. This is where green eyes become interesting.",
      "Green eyes contain a natural bandpass filter — a yellow pigment called lipochrome that selectively reduces the shortest blue wavelengths while transmitting the 450-570 nm range where cryptochrome operates best. The result is not maximum sensitivity but optimal stability: the protein stays in its magnetically active state longer.",
      "And here is perhaps the most surprising part: this maps onto sex differences. Men are more likely to have blue eyes. Women are more likely to have green eyes. In the framework we're exploring, this isn't random — it reflects different biological priorities. Men's reproductive fitness in ancestral environments depended more on navigation (hunting). Women's depended more on circadian stability (hormonal cycles, pregnancy, ovulation timing). Blue eyes optimize for magnetic sensitivity. Green eyes optimize for circadian resilience.",
      "None of this has been proven as a unified theory. But each individual link is supported by published research, and the whole picture is testable. What follows is the evidence, piece by piece.",
    ],
    section2Title: "The Evidence Chain",
    section3Title: "The Synthesis",
    section3aTitle: "Three Eye Colors, Three Magnetoreceptive Profiles",
    section3bTitle: "Nutritional Modulation Layer",
    section3cTitle: "Sex-Specific CRY Optimization",
    section3cText: [
      "Men are more often blue-eyed. They are the sex that showed magnetoreception in behavioral tests. In BERM's framework, men's reproductive pathway (fMale) depends primarily on sperm quality — a function of pathway A (VGIC → ROS). But their magnetoreceptive advantage (blue eyes → maximum CRY sensitivity) served a different function: spatial navigation for hunting, which indirectly supported reproductive success.",
      "Women are more often green-eyed. They did not show magnetoreception in behavioral tests. In BERM's framework, women's reproductive pathway (fFemale) depends primarily on circadian stability — a function of pathway C (CRY → melatonin → GnRH → HPG). Green eyes optimize precisely for this: the lipochrome filter maintains CRY in its magnetically sensitive semiquinone state longer, producing more stable circadian oscillation.",
      "The X-chromosome mosaicism mechanism (Bressan 2024) provides the proximate genetic explanation. The sex-specific adaptive pressure provides the ultimate evolutionary explanation: natural selection preserved the mosaicism because intermediate eye colors in women were adaptively advantageous for circadian function, while extreme blue in men was advantageous for magnetic navigation.",
    ],
    fastingTitle: "The Fasting Paradox",
    fastingText: [
      "There is an apparent contradiction in the evidence. AMPK, the cell's nutrient sensor that activates during fasting, phosphorylates CRY1 and targets it for degradation (Lamia et al. 2009, Science). Yet the only study showing human magnetoreception used starved subjects (Chae 2019). If fasting destroys the very protein that senses magnetic fields, how can fasting enhance magnetoreception?",
      "The resolution lies in CRY quality versus quantity. Fasting does degrade old CRY molecules via the AMPK-Ser71-FBXL3 pathway. But fasting simultaneously increases the pool of oxidized flavoproteins via fatty acid beta-oxidation — meaning more FAD is available. When the cell synthesizes replacement CRY molecules, they are loaded with fresh FAD chromophore more efficiently. The net result: fewer CRY molecules, but each one is better equipped for magnetoreception.",
      "This also explains why chronic B2 deficiency is far more damaging than acute fasting. During a fast, the FAD pool is maintained or enhanced by metabolic shifts. During chronic B2 deficiency, the FAD pool itself is depleted — so even when new CRY is synthesized, it cannot be properly loaded with its essential chromophore. The protein exists but cannot function.",
      "The fasting paradox resolution is an L*-level hypothesis. The individual biochemical steps (AMPK phosphorylation of CRY, FAD requirement for CRY function, beta-oxidation during fasting) are each E-level established facts. The synthesis — that net CRY quality improves during fasting despite lower quantity — has not been directly tested.",
    ],
    bartolkeTitle: "2025 Update: Two CRY Systems",
    bartolkeText: [
      "In 2025, the QuantumBirds consortium (Bartölke et al., FASEB J) made a discovery that transforms the eye color hypothesis. Using C-terminal specific antibodies, they found full-length CRY1 protein exclusively in the outer segments of short-wavelength-sensitive 'blue' cone photoreceptors — not in ganglion cells, not in rods, not in other cone types. Only in blue cones.",
      "This means the human retina has not one but two cryptochrome systems. CRY1 sits in the phototransduction machinery of blue cones (C1: sensory), while CRY2 is in the ganglion cells that project to the brain's circadian clock (C2: circadian). They have different locations, different probable functions, and different relationships to eye color.",
      "The C1 system (CRY1 in blue cones) is the one most affected by iris pigmentation. Blue eyes transmit ~100x more light to these specific photoreceptors. The stacked membrane lamellae of cone outer segments provide the structural order that CRY needs for directional magnetoreception (confirmed by Majewska et al. 2025: CRY associates with lipid membranes in oriented fashion).",
      "The C2 system (CRY2 in ganglion cells) is the circadian system that controls melatonin production. It forms a physical complex with the ion channel TRPC1 (Yap et al. 2025), linking it directly to BERM's pathway A. This system is less directly affected by iris pigmentation but equally dependent on FAD/B2 status.",
    ],
    section4Title: "Testable Predictions",
    epistemicTitle: "Epistemic Status",
    epistemicText: "This page presents a testable hypothesis (L* level). Individual links in the evidence chain are experimentally confirmed (E level: FAD→CRY stability, FAD→magnetic sensitivity, CRY photocycle wavelength dependence). The overall synthesis — that eye color is an adaptation specifically for magnetoreceptive optimization — has not been directly tested. The predictions above are designed to narrow this uncertainty. This is not established science. It is a structured research proposal grounded in published findings.",
    profileHeaders: {
      transmission: "Iris transmission",
      cryActivation: "CRY activation",
      cryStability: "CRY stability",
      snr: "Signal-to-noise",
      circadian: "Circadian profile",
      magnetoreception: "Magnetoreception",
      sexPrevalence: "Sex prevalence",
      adaptiveContext: "Adaptive context",
      geographic: "Geographic distribution",
    },
    nutrientHeaders: {
      nutrient: "Nutrient",
      target: "Target in CRY chain",
      deficiency: "Deficiency effect",
      source: "Key source",
      level: "Level",
    },
    predictionHeaders: {
      discriminating: "Discriminating",
      observational: "Observational",
      test: "Test design",
    },
    levelLabel: "Evidence level",
    bermRelevance: "BERM relevance",
  },
  fi: {
    title: "Silmien väri ja magnetoreseptio",
    subtitle: "Miten iiriksen pigmentaatio, ravitsemus ja sukupuoli moduloivat CRY-herkkyyttä",
    backLink: "← Takaisin evidenssiin",
    section1Title: "Silmäsi ovat antenneja",
    section1: [
      "Jokaisessa silmässä on piilotettu sensori. Verkkokalvon gangliosoluissa — ei sauvoissa ja tapeissa joista koulussa opetettiin, vaan erillisessä solukerroksessa lähempänä pintaa — on proteiini nimeltä kryptokromi. Tämä proteiini tekee jotain merkittävää: se absorboi sinistä valoa ja käyttää energian luodakseen elektronipareja, joiden kvanttispintilat ovat herkkiä Maan magneettikentälle.",
      "Linnuissa tämä järjestelmä on kompassi. Punarinta käyttää sitä navigoidakseen tuhansia kilometrejä. Vuonna 2011 tutkijat osoittivat, että ihmisen kryptokromin versio (CRY2) voi toimia magnetosensorina kun se siirretään banaanikärpäsiin. Vuonna 2019 Chae kollegoineen osoitti, että silmät peitetyt ihmiset menettivät kykynsä orientoitua geomagneettisiin vihjeisiin, mutta vain kun sininen valo poistettiin — kryptokromimekanismin diagnostinen tunnusmerkki.",
      "Mitä tekemistä tällä on silmien värin kanssa? Kaikki.",
      "Siniset silmät päästävät läpi noin 100 kertaa enemmän valoa iiriksen läpi kuin ruskeat silmät. Kyse ei ole paremmasta näkemisestä — itse asiassa sinisilmäiset ovat herkempiä häikäisylle. Ylimääräinen valo saavuttaa ne syvät gangliosolut joissa kryptokromi sijaitsee. Enemmän sinisiä fotoneja tarkoittaa enemmän kryptokromin aktivaatiota, mikä tarkoittaa vahvempaa magneettista signaalia.",
      "Mutta on hienous joka tekee tästä tarinasta rikkaamman kuin \"siniset silmät = parempi antenni.\" Kryptokromin magneettinen herkkyys ei riipu mistä tahansa valosta. Sillä on kaksivaiheinen toimintasykli: sininen valo (alle 500 nm) aktivoi sen, ja vihreä valo (500-570 nm) ylläpitää sitä magneettisesti herkässä tilassa. Liian paljon sinistä valoa itse asiassa työntää proteiinin herkän tilansa ohi inaktiiviseen muotoon. Tässä vihreät silmät tulevat kiinnostaviksi.",
      "Vihreissä silmissä on luonnollinen kaistanpäästösuodatin — keltainen pigmentti nimeltä lipokromi, joka valikoidusti vähentää lyhyimpiä sinisiä aallonpituuksia päästäen läpi 450-570 nm alueen jossa kryptokromi toimii parhaiten. Tulos ei ole maksimaalinen herkkyys vaan optimaalinen stabiilisuus: proteiini pysyy magneettisesti aktiivisessa tilassaan pidempään.",
      "Ja ehkä yllättävin osa: tämä heijastuu sukupuolieroihin. Miehillä on todennäköisemmin siniset silmät. Naisilla on todennäköisemmin vihreät silmät. Tutkimaamme kehyksessä tämä ei ole satunnaista — se heijastaa erilaisia biologisia prioriteetteja. Miesten lisääntymiskelpoisuus esi-isien ympäristöissä riippui enemmän navigoinnista (metsästys). Naisten riippui enemmän sirkadiaanisesta stabiilisuudesta (hormonaaliset syklit, raskaus, ovulaation ajoitus). Siniset silmät optimoivat magneettista herkkyyttä. Vihreät silmät optimoivat sirkadiaanista resilienssiä.",
      "Mitään tästä ei ole todistettu yhtenäisenä teoriana. Mutta jokainen yksittäinen lenkki perustuu julkaistuun tutkimukseen, ja kokonaiskuva on testattavissa. Seuraavassa on evidenssi, pala palalta.",
    ],
    section2Title: "Evidenssiketju",
    section3Title: "Synteesi",
    section3aTitle: "Kolme silmänväriä, kolme magnetoreseptiivistä profiilia",
    section3bTitle: "Ravitsemuksellinen modulaatiokerros",
    section3cTitle: "Sukupuolispesifinen CRY-optimointi",
    section3cText: [
      "Miehillä on useammin siniset silmät. He ovat sukupuoli joka osoitti magnetoreseptiota käyttäytymiskokeissa. BERM:n kehyksessä miesten lisääntymispolku (fMale) riippuu ensisijaisesti siittiöiden laadusta — polku A:n (VGIC → ROS) funktio. Mutta heidän magnetoreseptiivinen etunsa (siniset silmät → maksimaalinen CRY-herkkyys) palveli eri tarkoitusta: avaruudellista navigointia metsästykseen, mikä epäsuorasti tuki lisääntymismenestystä.",
      "Naisilla on useammin vihreät silmät. He eivät osoittaneet magnetoreseptiota käyttäytymiskokeissa. BERM:n kehyksessä naisten lisääntymispolku (fFemale) riippuu ensisijaisesti sirkadiaanisesta stabiilisuudesta — polku C:n (CRY → melatoniini → GnRH → HPG) funktio. Vihreät silmät optimoivat juuri tätä: lipokromi-suodatin ylläpitää CRY:tä sen magneettisesti herkässä semikinoni-tilassa pidempään, tuottaen stabiilimman sirkadiaanisen oskillaation.",
      "X-kromosomimosaiikkimekanismi (Bressan 2024) tarjoaa proksimaalisen geneettisen selityksen. Sukupuolispesifinen adaptiivinen paine tarjoaa ultimaalisen evoluutiobiologisen selityksen: luonnonvalinta säilytti mosaiikin koska keskiväriset silmät naisilla olivat adaptiivisesti edullisia sirkadiaaniselle toiminnalle, kun taas äärimmäinen sininen miehillä oli edullinen magneettiselle navigoinnille.",
    ],
    fastingTitle: "Paastoparadoksi",
    fastingText: [
      "Evidenssissä on ilmeinen ristiriita. AMPK, solun ravintosensori joka aktivoituu paastossa, fosforyloi CRY1:n ja kohdistaa sen hajotettavaksi (Lamia ym. 2009, Science). Kuitenkin ainoa ihmisen magnetoreseptiota osoittanut tutkimus käytti nälkiintyneitä koehenkilöitä (Chae 2019). Jos paasto tuhoaa juuri sen proteiinin joka aistii magneettikenttiä, miten paasto voi tehostaa magnetoreseptiota?",
      "Ratkaisu piilee CRY:n laadussa verrattuna määrään. Paasto hajottaa vanhoja CRY-molekyylejä AMPK-Ser71-FBXL3-reitin kautta. Mutta paasto lisää samanaikaisesti hapettuneiden flavoproteiinien poolia rasvahappojen beta-oksidaation kautta — mikä tarkoittaa enemmän FAD:ia saatavilla. Kun solu syntetisoi korvaavia CRY-molekyylejä, ne ladataan tuoreella FAD-kromoforilla tehokkaammin. Nettotulos: vähemmän CRY-molekyylejä, mutta jokainen on paremmin varustettu magnetoreseptioon.",
      "Tämä selittää myös miksi krooninen B2-puutos on paljon vahingollisempi kuin akuutti paasto. Paaston aikana FAD-pooli ylläpidetään tai tehostetaan metabolisilla muutoksilla. Kroonisen B2-puutoksen aikana itse FAD-pooli on ehtynyt — joten vaikka uutta CRY:tä syntetisoitaisiin, sitä ei voida ladata kunnolla sen välttämättömällä kromoforilla. Proteiini on olemassa mutta ei voi toimia.",
      "Paastoparadoksin ratkaisu on L*-tason hypoteesi. Yksittäiset biokemialliset vaiheet (AMPK:n CRY-fosforylaatio, FAD:n vaatimus CRY:n toiminnalle, beta-oksidaatio paastossa) ovat kukin E-tason vahvistettuja faktoja. Synteesi — että CRY:n nettolaatu paranee paastossa matalammasta määrästä huolimatta — ei ole suoraan testattu.",
    ],
    bartolkeTitle: "2025-päivitys: Kaksi CRY-järjestelmää",
    bartolkeText: [
      "Vuonna 2025 QuantumBirds-konsortio (Bartölke ym., FASEB J) teki löydöksen joka muuttaa silmien väri -hypoteesia. C-terminaalispesifisillä vasta-aineilla he löysivät täyspitkän CRY1-proteiinin yksinomaan lyhytaaltoherkissä sinisten tappisolujen ulkosegmenteistä — ei gangliosoluista, ei sauvoista, ei muista tappityypeistä. Vain sinisistä tapeista.",
      "Tämä tarkoittaa, ettei ihmisen verkkokalvolla ole yhtä vaan kaksi kryptokromijärjestelmää. CRY1 sijaitsee sinisten tappisolujen fototransduktiokoneistossa (C1: sensorinen), kun taas CRY2 on gangliosoluissa jotka projisoivat aivojen sirkadiaaniseen kelloon (C2: sirkadiaaninen). Niillä on eri sijainnit, eri todennäköiset funktiot ja eri suhteet silmien väriin.",
      "C1-järjestelmä (CRY1 sinisissä tapeissa) on se, johon iiriksen pigmentaatio vaikuttaa eniten. Siniset silmät päästävät ~100-kertaisesti enemmän valoa nimenomaan näihin fotoreseptoreihin. Tappisolujen ulkosegmenttien pinotut kalvolamellit tarjoavat rakenteellisen järjestyksen jota CRY tarvitsee suuntakohtaiseen magnetoreseptioon (vahvistettu: Majewska ym. 2025: CRY assosioituu lipidikalvoihin orientoituneesti).",
      "C2-järjestelmä (CRY2 gangliosoluissa) on sirkadiaaninen järjestelmä joka ohjaa melatoniinituotantoa. Se muodostaa fysikaalisen kompleksin ionikanava TRPC1:n kanssa (Yap ym. 2025), yhdistäen sen suoraan BERM:n polku A:han. Tämä järjestelmä on vähemmän suoraan iiriksen pigmentaation vaikutuksen alainen mutta yhtä riippuvainen FAD/B2-tilasta.",
    ],
    section4Title: "Testattavat ennusteet",
    epistemicTitle: "Episteeminen tila",
    epistemicText: "Tämä sivu esittää testattavan hypoteesin (L*-taso). Evidenssiketjun yksittäiset lenkit ovat kokeellisesti vahvistettu (E-taso: FAD→CRY-stabiilisuus, FAD→magneettinen herkkyys, CRY:n fotosyklin aallonpituusriippuvuus). Kokonaissynteesi — että silmien väri on adaptaatio nimenomaan magnetoreseptiivistä optimointia varten — ei ole suoraan testattu. Edellä esitetyt ennusteet on suunniteltu kaventamaan tätä epävarmuutta. Tämä ei ole vakiintunutta tiedettä. Se on julkaistuihin löydöksiin perustuva jäsennetty tutkimusehdotus.",
    profileHeaders: {
      transmission: "Iiriksen transmissio",
      cryActivation: "CRY-aktivaatio",
      cryStability: "CRY-stabiilisuus",
      snr: "Signaali-kohinasuhde",
      circadian: "Sirkadiaaninen profiili",
      magnetoreception: "Magnetoreseptio",
      sexPrevalence: "Sukupuolijakauma",
      adaptiveContext: "Adaptiivinen konteksti",
      geographic: "Maantieteellinen jakauma",
    },
    nutrientHeaders: {
      nutrient: "Ravintoaine",
      target: "Kohde CRY-ketjussa",
      deficiency: "Puutosvaikutus",
      source: "Avainlähde",
      level: "Taso",
    },
    predictionHeaders: {
      discriminating: "Diskriminoiva",
      observational: "Havainnoiva",
      test: "Koeasetelma",
    },
    levelLabel: "Evidenssitaso",
    bermRelevance: "BERM-merkitys",
  },
} as const;

const EYE_COLOR_STYLES: Record<string, { border: string; bg: string; text: string }> = {
  blue: { border: "border-blue-400/40", bg: "bg-blue-500/5", text: "text-blue-400" },
  green: { border: "border-emerald-400/40", bg: "bg-emerald-500/5", text: "text-emerald-400" },
  brown: { border: "border-amber-600/40", bg: "bg-amber-600/5", text: "text-amber-600" },
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const d = locale === "fi" ? COPY.fi : COPY.en;
  return { title: `${d.title} – Extinction Field`, description: d.subtitle };
}

export default async function EyeColorPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const isFi = locale === "fi";
  const d = isFi ? COPY.fi : COPY.en;

  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <Link href={`/${locale}/evidence`} className="text-sm text-accent hover:underline mb-6 inline-block">
        {d.backLink}
      </Link>

      <PageHeader icon={Eye} title={d.title} subtitle={d.subtitle} />

      {/* Section 1: Your Eyes Are Antennas */}
      <section className="mb-16">
        <h2 className="editorial-section-heading mb-6">{d.section1Title}</h2>
        <div className="space-y-4 text-[0.95rem] leading-relaxed text-foreground max-w-3xl">
          {d.section1.map((paragraph, i) => (
            <p key={i} className={i === 2 ? "font-semibold text-accent" : ""}>{paragraph}</p>
          ))}
        </div>
      </section>

      {/* Section 2: The Evidence Chain */}
      <section className="mb-16 border-t editorial-rule pt-6">
        <h2 className="editorial-section-heading mb-6">{d.section2Title}</h2>
        <div className="space-y-6">
          {EVIDENCE_CARDS.map((card, i) => {
            const levelColor = CHAIN_EPISTEMIC_COLORS[card.level as keyof typeof CHAIN_EPISTEMIC_COLORS] ?? "#6B7280";
            const levelInfo = EPISTEMIC_LEVELS[card.level];
            return (
              <article
                key={card.id}
                className="rounded-lg border border-card-border bg-card-bg p-5"
              >
                <div className="flex items-start justify-between gap-4 mb-3">
                  <h3 className="text-lg font-semibold">
                    <span className="font-mono-num text-xs text-accent mr-2">{String(i + 1).padStart(2, "0")}</span>
                    {isFi ? card.title_fi : card.title_en}
                  </h3>
                  <span
                    className="shrink-0 rounded-full px-2.5 py-0.5 text-xs font-semibold"
                    style={{ backgroundColor: `${levelColor}20`, color: levelColor, border: `1px solid ${levelColor}40` }}
                  >
                    {card.level} — {levelInfo ? (isFi ? levelInfo.label_fi : levelInfo.label_en) : card.level}
                  </span>
                </div>

                <p className="text-xs text-foreground-muted mb-1">
                  {card.authors} ({card.year}). <span className="italic">{card.journal}</span>.
                  {card.doi && <> DOI: {card.doi}</>}
                </p>

                <div className="mt-3 rounded border border-card-border/60 bg-background p-3">
                  <p className="text-xs font-semibold uppercase tracking-wider text-accent mb-1">{d.levelLabel}: {card.level}</p>
                  <p className="text-sm text-foreground-muted leading-relaxed">
                    {isFi ? card.finding_fi : card.finding_en}
                  </p>
                </div>

                {(card.berm_relevance_en || card.berm_relevance_fi) && (
                  <div className="mt-3 rounded border border-accent/30 bg-background p-3">
                    <p className="text-xs font-semibold uppercase tracking-wider text-accent mb-1">{d.bermRelevance}</p>
                    <p className="text-sm text-foreground-muted leading-relaxed">
                      {isFi ? card.berm_relevance_fi : card.berm_relevance_en}
                    </p>
                  </div>
                )}
              </article>
            );
          })}
        </div>
      </section>

      {/* Section 3: The Synthesis */}
      <section className="mb-16 border-t editorial-rule pt-6">
        <h2 className="editorial-section-heading mb-6">{d.section3Title}</h2>

        {/* 3A: Three eye color profiles */}
        <h3 className="text-lg font-semibold mb-4">{d.section3aTitle}</h3>
        <div className="grid gap-4 sm:grid-cols-3 mb-10">
          {EYE_PROFILES.map((profile) => {
            const style = EYE_COLOR_STYLES[profile.color] ?? EYE_COLOR_STYLES.brown;
            return (
              <div key={profile.color} className={`rounded-lg border ${style.border} ${style.bg} p-4`}>
                <h4 className={`font-semibold mb-3 ${style.text}`}>
                  {isFi ? profile.label_fi : profile.label_en}
                </h4>
                <dl className="space-y-2 text-xs">
                  <div><dt className="font-semibold text-foreground-muted">{d.profileHeaders.transmission}</dt><dd className="text-foreground">{profile.transmission}</dd></div>
                  <div><dt className="font-semibold text-foreground-muted">{d.profileHeaders.cryActivation}</dt><dd className="text-foreground">{profile.cry_activation}</dd></div>
                  <div><dt className="font-semibold text-foreground-muted">{d.profileHeaders.cryStability}</dt><dd className="text-foreground">{profile.cry_stability}</dd></div>
                  <div><dt className="font-semibold text-foreground-muted">{d.profileHeaders.snr}</dt><dd className="text-foreground">{profile.snr}</dd></div>
                  <div><dt className="font-semibold text-foreground-muted">{d.profileHeaders.circadian}</dt><dd className="text-foreground">{profile.circadian}</dd></div>
                  <div><dt className="font-semibold text-foreground-muted">{d.profileHeaders.magnetoreception}</dt><dd className="text-foreground">{profile.magnetoreception}</dd></div>
                  <div><dt className="font-semibold text-foreground-muted">{d.profileHeaders.sexPrevalence}</dt><dd className="text-foreground">{profile.sex_prevalence}</dd></div>
                  <div><dt className="font-semibold text-foreground-muted">{d.profileHeaders.adaptiveContext}</dt><dd className="text-foreground">{isFi ? profile.adaptive_context_fi : profile.adaptive_context_en}</dd></div>
                  <div><dt className="font-semibold text-foreground-muted">{d.profileHeaders.geographic}</dt><dd className="text-foreground">{profile.geographic}</dd></div>
                </dl>
              </div>
            );
          })}
        </div>

        {/* 3B: Nutritional modulation */}
        <h3 className="text-lg font-semibold mb-4">{d.section3bTitle}</h3>
        <div className="overflow-x-auto mb-10">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-card-border text-left text-xs text-foreground-muted uppercase tracking-wider">
                <th className="py-2 pr-3">{d.nutrientHeaders.nutrient}</th>
                <th className="py-2 pr-3">{d.nutrientHeaders.target}</th>
                <th className="py-2 pr-3">{d.nutrientHeaders.deficiency}</th>
                <th className="py-2 pr-3 w-32">{d.nutrientHeaders.source}</th>
                <th className="py-2 w-12">{d.nutrientHeaders.level}</th>
              </tr>
            </thead>
            <tbody>
              {NUTRITIONAL_MODULATORS.map((mod) => {
                const levelColor = CHAIN_EPISTEMIC_COLORS[mod.level as keyof typeof CHAIN_EPISTEMIC_COLORS] ?? "#6B7280";
                return (
                  <tr key={mod.nutrient} className="border-b border-card-border/40">
                    <td className="py-2 pr-3 font-medium text-foreground">{mod.nutrient}</td>
                    <td className="py-2 pr-3 text-foreground-muted">{mod.target}</td>
                    <td className="py-2 pr-3 text-foreground-muted">{isFi ? mod.deficiency_effect_fi : mod.deficiency_effect_en}</td>
                    <td className="py-2 pr-3 text-foreground-muted text-xs">{mod.key_source}</td>
                    <td className="py-2">
                      <span className="rounded-full px-1.5 py-0.5 text-xs font-semibold" style={{ backgroundColor: `${levelColor}20`, color: levelColor }}>
                        {mod.level}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* 3C: Sex-specific CRY optimization */}
        <h3 className="text-lg font-semibold mb-4">{d.section3cTitle}</h3>
        <div className="space-y-4 text-sm text-foreground-muted leading-relaxed max-w-3xl mb-8">
          {d.section3cText.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </section>

      {/* Bartölke 2025: Two CRY Systems */}
      <section className="mb-16 border-t editorial-rule pt-6">
        <h2 className="editorial-section-heading mb-6">{d.bartolkeTitle}</h2>
        <div className="space-y-4 text-[0.95rem] leading-relaxed text-foreground max-w-3xl">
          {d.bartolkeText.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>
      </section>

      {/* Fasting Paradox */}
      <section className="mb-16 border-t editorial-rule pt-6">
        <h2 className="editorial-section-heading mb-6">{d.fastingTitle}</h2>
        <div className="space-y-4 text-[0.95rem] leading-relaxed text-foreground max-w-3xl">
          {d.fastingText.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>
      </section>

      {/* Section 4: Testable Predictions */}
      <section className="mb-16 border-t editorial-rule pt-6">
        <h2 className="editorial-section-heading mb-6">{d.section4Title}</h2>
        <div className="space-y-4">
          {PREDICTIONS.map((pred) => (
            <article key={pred.id} className="rounded-lg border border-card-border bg-card-bg p-5">
              <div className="flex items-start justify-between gap-3 mb-2">
                <h3 className="font-semibold text-sm">
                  <span className="font-mono-num text-xs text-accent mr-2">{pred.id}</span>
                  {isFi ? pred.title_fi : pred.title_en}
                </h3>
                <span className={`shrink-0 rounded-full px-2 py-0.5 text-xs font-semibold ${
                  pred.discriminating
                    ? "bg-emerald-500/10 text-emerald-500 border border-emerald-500/30"
                    : "bg-amber-500/10 text-amber-500 border border-amber-500/30"
                }`}>
                  {pred.discriminating ? d.predictionHeaders.discriminating : d.predictionHeaders.observational}
                </span>
              </div>
              <p className="text-sm text-foreground-muted leading-relaxed">
                <span className="font-semibold text-foreground">{d.predictionHeaders.test}: </span>
                {isFi ? pred.test_fi : pred.test_en}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* Epistemic note */}
      <div className="rounded-xl border border-status-partial/30 bg-status-partial/5 p-5">
        <h3 className="font-semibold mb-2">{d.epistemicTitle}</h3>
        <p className="text-sm text-foreground-muted leading-relaxed">{d.epistemicText}</p>
      </div>
    </div>
  );
}
