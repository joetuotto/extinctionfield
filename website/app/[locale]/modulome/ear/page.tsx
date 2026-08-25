import type { Metadata } from "next";
import Link from "next/link";
import { Ear } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { CitationLink } from "@/components/CitationLink";

const COPY = {
  en: {
    title: "Inner Ear",
    subtitle:
      "Cav1.3 calcium channels in cochlear hair cells: hearing loss, tinnitus, and Bluetooth EMF",
    backLink: "← Back to Modulome",

    /* --- SECTION 1: Cav1.3 and Inner Hair Cells --- */
    s1SectionTitle: "Cav1.3 and Inner Hair Cells",

    /* 01 Channel Profile */
    channelProfile: "Channel Profile",
    channel: "Channel",
    gene: "Gene",
    cellType: "Cell type",
    function: "Function",
    level: "Evidence level",
    channelVal: "Cav1.3 (L-type)",
    geneVal: "CACNA1D",
    cellTypeVal: "Inner hair cells (IHCs)",
    functionVal: "Sound transduction — glutamate vesicle release at IHC synapse",
    levelVal: "M|C",

    /* 02 Sound Transduction Mechanism */
    s2Title: "Sound Transduction Mechanism",
    s2p1:
      "Inner hair cells (IHCs) are the primary sensory receptors of the cochlea. They use Cav1.3 (CACNA1D) L-type voltage-gated calcium channels to convert mechanical sound waves into electrical signals. When sound deflects the stereocilia, mechanotransduction channels open, depolarizing the IHC. This depolarization activates Cav1.3 channels at the basolateral membrane.",
    s2p2:
      "Ca²⁺ influx through Cav1.3 triggers glutamate vesicle release at the ribbon synapse between the IHC and spiral ganglion neurons. This is the primary site of sound-to-electrical signal conversion in the auditory pathway — without Cav1.3, hearing is impossible.",
    s2p3:
      "Cav1.3 channels have a unique biophysical property: they activate at relatively negative membrane potentials (~−50mV), significantly more negative than other L-type channels (Cav1.2 activates at ~−30mV). This low-voltage activation makes them exceptionally sensitive to small membrane voltage perturbations — including those induced by electromagnetic fields.",

    /* --- SECTION 2: IL-6 -> Cav1.3 Upregulation -> Hearing Loss --- */
    s2SectionTitle:
      "IL-6 → Cav1.3 Upregulation → Hearing Loss",

    /* 03 Inflammaging Mechanism */
    s3Title: "Inflammaging Mechanism",
    s3p1:
      "Aging Cell 2024 study: IL-6-dependent inflammaging upregulates Cav1.3 expression in inner hair cells. Chronic low-grade inflammation, a hallmark of aging (inflammaging), elevates circulating and local IL-6 levels. IL-6 signaling through JAK/STAT pathways increases CACNA1D transcription, resulting in higher Cav1.3 channel density on the IHC membrane.",
    s3p2:
      "Chronic Cav1.3 upregulation leads to excessive Ca²⁺ influx at the IHC ribbon synapse. The resulting calcium overload drives excitotoxic damage to spiral ganglion neurons — the same glutamate excitotoxicity mechanism seen in neurodegenerative disease. This mechanism explains why age-related hearing loss (presbycusis) accelerates in individuals with higher systemic inflammation.",

    /* 04 Tinnitus Pathway */
    s4Title: "Tinnitus Pathway",
    s4Text:
      "Chronic Ca²⁺ overload at the IHC synapse generates aberrant spontaneous neurotransmitter release. Spiral ganglion neurons receive glutamate signals in the absence of sound input, creating phantom auditory perception — tinnitus. The BERM framework identifies this as a specific instance of VGCC-mediated excitotoxicity: upregulated Cav1.3 → excessive Ca²⁺ → aberrant glutamate release → phantom sound perception.",

    /* 05 EMF-Inflammation Link */
    s5Title: "EMF-Inflammation-Hearing Cascade",
    s5Chain:
      "Chronic EMF exposure → low-grade inflammation → IL-6 ↑ → Cav1.3 ↑ → Ca²⁺ overload → accelerated hearing damage",
    s5Text:
      "The BERM framework connects EMF exposure to hearing loss through the inflammation pathway. Chronic EMF exposure induces low-grade systemic inflammation (documented across multiple studies). Elevated IL-6 upregulates Cav1.3 in IHCs (Aging Cell 2024). The resulting Ca²⁺ dysregulation accelerates both hearing loss and tinnitus onset. This pathway is synergistic with acoustic damage: EMF-induced Cav1.3 upregulation lowers the threshold for noise-induced hearing loss.",

    /* --- SECTION 3: Bluetooth/Earphone EMF Proximity --- */
    s3SectionTitle: "Bluetooth/Earphone EMF Proximity",

    /* 06 Proximity Physics */
    s6Title: "Proximity Physics",
    s6p1:
      "Bluetooth earphones emit RF electromagnetic fields directly adjacent to the cochlea, at a distance of approximately 2–5mm. The inverse-square law dictates that EMF power density is inversely proportional to the square of distance. At 3mm, the local field intensity at the cochlea from a Bluetooth earphone can exceed that from a mobile phone held at the ear (typically 10–20mm from the cochlea) — despite the earphone's significantly lower total radiated power.",
    s6p2:
      "This proximity effect is critical and often overlooked in EMF safety assessments, which focus on total radiated power (SAR) rather than local tissue-level field intensity at specific vulnerable structures.",

    /* 07 Epidemiological Context */
    s7Title: "Epidemiological Context",
    s7Stats: [
      "17.7% of young adults report bothersome tinnitus — a rising trend that parallels earphone adoption",
      "1 billion+ young people at risk of hearing loss from unsafe listening practices (WHO 2024)",
      "Average daily earphone use has increased from ~1h (2010) to ~4h (2024) in 18–25 year-olds",
      "Bluetooth earphone market penetration exceeded 80% in 15–35 age group by 2023",
    ],

    /* 08 BERM Prediction */
    s8Title: "BERM Prediction",
    s8Text:
      "The BERM framework predicts that EMF from Bluetooth earphones perturbs Cav1.3 channels in IHCs, causing Ca²⁺ dysregulation that is synergistic with acoustic damage. This generates a specific, testable prediction:",
    s8Prediction: {
      id: "HEAR-1",
      text: "Bluetooth earphone use duration correlates with subclinical hearing loss (measured by extended high-frequency audiometry or otoacoustic emissions) when controlling for volume level and noise exposure history. The effect is dose-dependent on hours of daily use and persists after adjusting for acoustic exposure.",
      discriminating: true,
    },

    /* References */
    references: "Key References",
    refs: [
      {
        id: "aging-cell-2024-cav13-hearing",
        citation: "Aging Cell 2024",
        finding:
          "IL-6-dependent inflammaging upregulates Cav1.3 in inner hair cells, driving age-related hearing loss through excitotoxicity at the IHC–spiral ganglion neuron synapse.",
      },
      {
        id: "brain-2026-cav32-human-drg",
        citation: "Brain 2026",
        finding:
          "Cav3.2 channel characterization in human DRG neurons — establishes voltage-gated calcium channel mechanisms in peripheral sensory neurons relevant to the cochlear pathway.",
      },
    ],

    /* See also */
    seeAlso: "See also",
    brainModulome: "Brain modulome",
    predictionsPage: "Predictions — HEAR-1",
    evidencePage: "Evidence register",
  },
  fi: {
    title: "Sisäkorva",
    subtitle:
      "Cav1.3-kalsiumkanavat sisäkorvan karvasoluissa: kuulonmenetys, tinnitus ja Bluetooth-EMF",
    backLink: "← Takaisin moduloomiin",

    /* --- OSIO 1: Cav1.3 ja sisäiset karvasolut --- */
    s1SectionTitle: "Cav1.3 ja sisäiset karvasolut",

    /* 01 Kanavaprofiili */
    channelProfile: "Kanavaprofiili",
    channel: "Kanava",
    gene: "Geeni",
    cellType: "Solutyyppi",
    function: "Toiminto",
    level: "Evidenssitaso",
    channelVal: "Cav1.3 (L-tyyppi)",
    geneVal: "CACNA1D",
    cellTypeVal: "Sisäiset karvasolut (IHC)",
    functionVal: "Äänitransduktio — glutamaattivesikkelien vapautus IHC-synapsissa",
    levelVal: "M|C",

    /* 02 Äänitransduktion mekanismi */
    s2Title: "Äänitransduktion mekanismi",
    s2p1:
      "Sisäiset karvasolut (IHC) ovat simpukan ensisijaiset sensoriset reseptorit. Ne käyttävät Cav1.3 (CACNA1D) L-tyypin jänniteohjattuja kalsiumkanavia muuntaakseen mekaaniset ääniaallot sähköisiksi signaaleiksi. Kun ääni taivuttaa stereosiliöitä, mekanotransduktiokanavat avautuvat ja depolarisoivat IHC:n. Tämä depolarisaatio aktivoi Cav1.3-kanavat basolateraalisessa kalvossa.",
    s2p2:
      "Ca²⁺-sisäänvirtaus Cav1.3:n kautta laukaisee glutamaattivesikkelien vapautuksen nauhasynapsissa IHC:n ja spiraaliganglioneuronien välillä. Tämä on kuulojohteen ensisijainen ääni–sähkösignaalin muunnoskohta — ilman Cav1.3:a kuuleminen on mahdotonta.",
    s2p3:
      "Cav1.3-kanavilla on ainutlaatuinen biofysikaalinen ominaisuus: ne aktivoituvat suhteellisen negatiivisissa kalvopotentiaaleissa (~−50mV), huomattavasti negatiivisemmassa kuin muut L-tyypin kanavat (Cav1.2 aktivoituu ~−30mV). Tämä matalan jännitteen aktivaatio tekee niistä poikkeuksellisen herkkiä pienille kalvojännitteen häiriöille — mukaan lukien sähkömagneettisten kenttien aiheuttamille.",

    /* --- OSIO 2: IL-6 -> Cav1.3 ylössäätely -> Kuulonmenetys --- */
    s2SectionTitle:
      "IL-6 → Cav1.3-ylössäätely → kuulonmenetys",

    /* 03 Inflammaging-mekanismi */
    s3Title: "Inflammaging-mekanismi",
    s3p1:
      "Aging Cell 2024 -tutkimus: IL-6-riippuvainen inflammaging ylössäätelee Cav1.3-ekspressiota sisäisissä karvasoluissa. Krooninen matala-asteinen tulehdus, ikääntymisen tunnusmerkki (inflammaging), nostaa kiertotien ja paikallisia IL-6-tasoja. IL-6-signalointi JAK/STAT-reittien kautta lisää CACNA1D-transkriptiota, mikä johtaa korkeampaan Cav1.3-kanavatiheyteen IHC-kalvolla.",
    s3p2:
      "Krooninen Cav1.3-ylössäätely johtaa liialliseen Ca²⁺-sisäänvirtaukseen IHC:n nauhasynapsissa. Tuloksena syntynyt kalsiumin ylikuormitus ajaa eksitotoksista vauriota spiraaliganglioneuroneille — sama glutamaattieksitotoksisuusmekanismi kuin neurodegeneratiivisissa sairauksissa. Tämä mekanismi selittää miksi ikääntymiseen liittyvä kuulonmenetys (presbyakusis) kiihtyy henkilöillä joilla on korkeampi systeeminen tulehdus.",

    /* 04 Tinnitusreitti */
    s4Title: "Tinnitusreitti",
    s4Text:
      "Krooninen Ca²⁺-ylikuormitus IHC-synapsissa tuottaa poikkeavaa spontaania välittäjäaineiden vapautusta. Spiraaliganglioneuronit vastaanottavat glutamaattisignaaleja ilman äänisyotettä, luoden haamukuulohavainnon — tinnituksen. BERM-kehys tunnistaa tämän VGCC-välitteisen eksitotoksisuuden erityistapaukena: ylössäädelty Cav1.3 → liiallinen Ca²⁺ → poikkeava glutamaattivapautus → haamuaanihavainto.",

    /* 05 EMF-tulehdusyhteys */
    s5Title: "EMF–tulehdus–kuulokaskadi",
    s5Chain:
      "Krooninen EMF-altistus → matala-asteinen tulehdus → IL-6 ↑ → Cav1.3 ↑ → Ca²⁺-ylikuormitus → kiihtynyt kuulovaurio",
    s5Text:
      "BERM-kehys yhdistää EMF-altistuksen kuulonmenetykseen tulehdusreitin kautta. Krooninen EMF-altistus indusoi matala-asteisen systeemisen tulehduksen (dokumentoitu useissa tutkimuksissa). Kohonnut IL-6 ylössäätelee Cav1.3:a IHC:issä (Aging Cell 2024). Tuloksena syntynyt Ca²⁺-dysregulaatio kiihdyttää sekä kuulonmenytystä että tinnituksen alkamista. Tämä reitti on synergistinen akustisen vaurion kanssa: EMF-indusoitu Cav1.3-ylössäätely laskee meluvauriokynnystä.",

    /* --- OSIO 3: Bluetooth/kuulokkeiden EMF-läheisyys --- */
    s3SectionTitle: "Bluetooth/kuulokkeiden EMF-läheisyys",

    /* 06 Läheisyysfysiikka */
    s6Title: "Läheisyysfysiikka",
    s6p1:
      "Bluetooth-kuulokkeet säteilevät RF-sähkömagneettisia kenttiä suoraan simpukan vieressä, noin 2–5mm etäisyydellä. Käänteisen neliölain mukaan EMF:n tehontiheys on kääntäen verrannollinen etäisyyden neliöön. 3mm etäisyydellä Bluetooth-kuulokkeen paikallinen kenttävoimakkuus simpukassa voi ylittää korvalla pidetyn matkapuhelimen kenttävoimakkuuden (tyypillisesti 10–20mm simpukasta) — huolimatta kuulokkeen huomattavasti pienemmastä kokonaissäteilytehosta.",
    s6p2:
      "Tämä läheisyysvaikutus on kriittinen ja usein jää huomiotta EMF-turvallisuusarvioinneissa, jotka keskittyvät kokonaissäteilytehoon (SAR) eivätkä paikalliseen kudostason kenttäintensiteettiin tietyissä haavoittuvissa rakenteissa.",

    /* 07 Epidemiologinen konteksti */
    s7Title: "Epidemiologinen konteksti",
    s7Stats: [
      "17,7 % nuorista aikuisista raportoi häiritsevää tinnitusta — nouseva trendi joka rinnastuu kuulokkeiden yleistymiseen",
      "Yli 1 miljardia nuorta kuulonmenetysriskissä turvattomien kuuntelukäytäntöjen vuoksi (WHO 2024)",
      "Keskimääräinen päivittäinen kuulokkeiden käyttö on kasvanut ~1h:sta (2010) ~4h:iin (2024) 18–25-vuotiailla",
      "Bluetooth-kuulokkeiden markkinapenetraatio ylitti 80 % 15–35-vuotiaiden ryhmässä vuoteen 2023 mennessä",
    ],

    /* 08 BERM-ennuste */
    s8Title: "BERM-ennuste",
    s8Text:
      "BERM-kehys ennustaa, että Bluetooth-kuulokkeiden EMF häiritsee IHC:iden Cav1.3-kanavia, aiheuttaen Ca²⁺-dysregulaatiota joka on synergistinen akustisen vaurion kanssa. Tämä tuottaa spesifisen, testattavan ennusteen:",
    s8Prediction: {
      id: "HEAR-1",
      text: "Bluetooth-kuulokkeiden käyttöaika korreloi subkliinisen kuulonmenetyksen kanssa (mitattuna laajennetulla korkeataajuusaudiometrialla tai otoakustisilla emissioilla) kun äänenvoimakkuustaso ja melualtistushistoria kontrolloidaan. Vaikutus on annosriippuvainen päivittäisistä käyttötunneista ja säilyy akustisen altistuksen vakioinnin jälkeen.",
      discriminating: true,
    },

    /* Viitteet */
    references: "Keskeiset viitteet",
    refs: [
      {
        id: "aging-cell-2024-cav13-hearing",
        citation: "Aging Cell 2024",
        finding:
          "IL-6-riippuvainen inflammaging ylössäätelee Cav1.3:a sisäisissä karvasoluissa, ajaen ikääntymiseen liittyvää kuulonmenytystä eksitotoksisuuden kautta IHC–spiraaliganglioneuronien synapsissa.",
      },
      {
        id: "brain-2026-cav32-human-drg",
        citation: "Brain 2026",
        finding:
          "Cav3.2-kanavan karakterisointi ihmisen DRG-neuroneissa — vahvistaa jänniteohjattujen kalsiumkanavien mekanismit perifeerisissä sensorisissa neuroneissa, jotka ovat relevantteja simpukan reitille.",
      },
    ],

    /* Katso myös */
    seeAlso: "Katso myös",
    brainModulome: "Aivojen moduloomi",
    predictionsPage: "Ennusteet — HEAR-1",
    evidencePage: "Evidenssirekisteri",
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

export default async function EarPage({
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

      <PageHeader icon={Ear} title={d.title} subtitle={d.subtitle} />

      {/* ===============================================
          SECTION 1 -- Cav1.3 and Inner Hair Cells
          =============================================== */}
      <div className="mb-4 mt-12">
        <h2 className="text-xl font-bold text-foreground tracking-tight">
          {d.s1SectionTitle}
        </h2>
        <div className="h-px bg-accent/30 mt-2" />
      </div>

      {/* 01 -- Channel Profile */}
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
              <span className="text-[0.65rem] font-semibold px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-600 dark:text-amber-400">
                {d.levelVal}
              </span>
            </span>
          </div>
        </div>
      </section>

      {/* 02 -- Sound Transduction Mechanism */}
      <section className="mb-16 border-t editorial-rule pt-6">
        <h3 className="text-lg font-semibold mb-4">
          <span className="font-mono-num text-xs text-accent mr-2">02</span>
          {d.s2Title}
        </h3>
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

      {/* ===============================================
          SECTION 2 -- IL-6 -> Cav1.3 -> Hearing Loss
          =============================================== */}
      <div className="mb-4 mt-12">
        <h2 className="text-xl font-bold text-foreground tracking-tight">
          {d.s2SectionTitle}
        </h2>
        <div className="h-px bg-accent/30 mt-2" />
      </div>

      {/* 03 -- Inflammaging Mechanism */}
      <section className="mb-16 border-t editorial-rule pt-6">
        <h3 className="text-lg font-semibold mb-4">
          <span className="font-mono-num text-xs text-accent mr-2">03</span>
          {d.s3Title}
        </h3>
        <div className="space-y-4 text-sm text-foreground-muted leading-relaxed max-w-4xl">
          <p className="editorial-rail text-[0.95rem] text-foreground">
            {d.s3p1}
          </p>
          <p>{d.s3p2}</p>
        </div>
      </section>

      {/* 04 -- Tinnitus Pathway */}
      <section className="mb-16 border-t editorial-rule pt-6">
        <h3 className="text-lg font-semibold mb-4">
          <span className="font-mono-num text-xs text-accent mr-2">04</span>
          {d.s4Title}
        </h3>
        <div className="border-l-4 border-accent/40 rounded-r-lg bg-card p-5">
          <p className="text-sm text-foreground-muted leading-relaxed">
            {d.s4Text}
          </p>
        </div>
      </section>

      {/* 05 -- EMF-Inflammation-Hearing Cascade */}
      <section className="mb-16 border-t editorial-rule pt-6">
        <h3 className="text-lg font-semibold mb-4">
          <span className="font-mono-num text-xs text-accent mr-2">05</span>
          {d.s5Title}
        </h3>

        <div className="bg-card rounded-lg border border-card-border p-5 mb-6">
          <p className="font-mono text-sm text-accent leading-relaxed text-center">
            {d.s5Chain}
          </p>
        </div>

        <p className="text-sm text-foreground-muted leading-relaxed max-w-4xl">
          {d.s5Text}
        </p>
      </section>

      {/* ===============================================
          SECTION 3 -- Bluetooth/Earphone EMF Proximity
          =============================================== */}
      <div className="mb-4 mt-12">
        <h2 className="text-xl font-bold text-foreground tracking-tight">
          {d.s3SectionTitle}
        </h2>
        <div className="h-px bg-accent/30 mt-2" />
      </div>

      {/* 06 -- Proximity Physics */}
      <section className="mb-16 border-t editorial-rule pt-6">
        <h3 className="text-lg font-semibold mb-4">
          <span className="font-mono-num text-xs text-accent mr-2">06</span>
          {d.s6Title}
        </h3>
        <div className="space-y-4 text-sm text-foreground-muted leading-relaxed max-w-4xl">
          <p className="editorial-rail text-[0.95rem] text-foreground">
            {d.s6p1}
          </p>
          <div className="rounded-lg bg-amber-500/10 border border-amber-500/20 p-5">
            <p className="text-sm text-foreground-muted leading-relaxed">
              {d.s6p2}
            </p>
          </div>
        </div>
      </section>

      {/* 07 -- Epidemiological Context */}
      <section className="mb-16 border-t editorial-rule pt-6">
        <h3 className="text-lg font-semibold mb-4">
          <span className="font-mono-num text-xs text-accent mr-2">07</span>
          {d.s7Title}
        </h3>
        <ul className="space-y-3 text-sm text-foreground-muted leading-relaxed max-w-4xl">
          {d.s7Stats.map((stat, i) => (
            <li key={i} className="pl-1 flex gap-2">
              <span className="text-accent shrink-0">*</span>
              <span>{stat}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* 08 -- BERM Prediction */}
      <section className="mb-16 border-t editorial-rule pt-6">
        <h3 className="text-lg font-semibold mb-4">
          <span className="font-mono-num text-xs text-accent mr-2">08</span>
          {d.s8Title}
        </h3>

        <p className="text-sm text-foreground-muted leading-relaxed max-w-4xl mb-6">
          {d.s8Text}
        </p>

        <div className="border-l-4 border-green-500 rounded-r-lg bg-card p-4">
          <div className="flex items-start justify-between gap-2 mb-2">
            <span className="font-mono-num text-xs font-bold text-accent">
              {d.s8Prediction.id}
            </span>
            {d.s8Prediction.discriminating && (
              <span className="shrink-0 text-[0.65rem] font-semibold px-1.5 py-0.5 rounded bg-green-500/10 text-green-600 dark:text-green-400">
                {activeLocale === "fi" ? "Erotteleva" : "Discriminating"}
              </span>
            )}
          </div>
          <p className="text-sm text-foreground-muted leading-relaxed">
            {d.s8Prediction.text}
          </p>
          <Link
            href={`/${locale}/predictions`}
            className="text-xs text-accent hover:underline mt-2 inline-block"
          >
            {activeLocale === "fi"
              ? "Kaikki ennusteet →"
              : "All predictions →"}
          </Link>
        </div>
      </section>

      {/* References */}
      <section className="mb-16 border-t editorial-rule pt-6">
        <h3 className="text-sm font-semibold text-foreground mb-4">
          {d.references}
        </h3>
        <div className="space-y-3">
          {d.refs.map((ref) => (
            <div
              key={ref.id}
              className="bg-card rounded-lg border border-card-border p-4"
            >
              <p className="text-xs font-semibold text-accent mb-1">
                <CitationLink citation={ref.citation} />
              </p>
              <p className="text-xs text-foreground-muted leading-relaxed">
                {ref.finding}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* See also */}
      <section className="border-t editorial-rule pt-6">
        <h3 className="text-sm font-semibold text-foreground mb-3">
          {d.seeAlso}
        </h3>
        <div className="flex gap-6 flex-wrap">
          <Link
            href={`/${locale}/modulome/brain`}
            className="text-sm text-accent hover:underline"
          >
            {d.brainModulome} &rarr;
          </Link>
          <Link
            href={`/${locale}/predictions`}
            className="text-sm text-accent hover:underline"
          >
            {d.predictionsPage} &rarr;
          </Link>
          <Link
            href={`/${locale}/evidence`}
            className="text-sm text-accent hover:underline"
          >
            {d.evidencePage} &rarr;
          </Link>
        </div>
      </section>
    </div>
  );
}
