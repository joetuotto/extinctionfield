import type { Metadata } from "next";
import Link from "next/link";
import { ShieldAlert } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";

const COPY = {
  en: {
    title: "The Reproductive Target",
    subtitle:
      "Leydig cells (Cav3 → testosterone), spermatogonia (Cav1+Cav3), Sertoli cells (BTB), mature sperm (CatSper) — multiple EMF-sensitive components in parallel",
    backLink: "← Back to Modulome",

    /* 01 Hero */
    s1Title: "Multiple EMF-Sensitive Components",
    s1p1:
      "The testes contain at least four distinct EMF-sensitive cellular compartments operating in parallel. Leydig cells use T-type calcium channels (Cav3) for testosterone biosynthesis via StAR protein (Xiang 2025). Spermatogonia require BOTH Cav1 (L-type) and Cav3 (T-type) channels for normal spermatogenesis (Ma 2026). Sertoli cells maintain the blood-testis barrier (BTB) using the same tight junction proteins (occludin, ZO-1) as the blood-brain barrier. Mature sperm use CatSper channels for capacitation and the acrosome reaction.",
    s1p2:
      "This means EMF exposure attacks male reproductive function through multiple independent mechanisms simultaneously. Even if one mechanism is marginal, the convergence of several mechanisms on the same endpoint (reduced fertility) creates a robust effect that is difficult to attribute to any single pathway.",
    s1p3:
      "The testes occupy a unique position in the BERM framework: they are the only organ where both VGCC-mediated ion channel disruption (pathways A/B) and biological barrier disruption (pathway F) converge on the same functional outcome.",

    /* 02 Channel Profile */
    s2Title: "Channel Profile",
    s2Channels: [
      {
        name: "Cav3 (T-type) in Leydig cells",
        function: "Testosterone biosynthesis via StAR protein",
        mechanism: "Cav3 → Ca2+ → StAR phosphorylation → cholesterol transport → testosterone",
        evidence: "Xiang 2025 — Cav3 directly controls StAR-mediated steroidogenesis",
      },
      {
        name: "CatSper in mature sperm",
        function: "Capacitation, hyperactivated motility, acrosome reaction",
        mechanism: "pH-gated Ca2+ channel essential for fertilization competence",
        evidence: "CatSper knockout = male infertility (multiple studies)",
      },
      {
        name: "Cav1 + Cav3 in spermatogonia",
        function: "Both required for normal spermatogenesis",
        mechanism: "L-type (Cav1) and T-type (Cav3) cooperatively support cell proliferation and differentiation",
        evidence: "Ma 2026 — dual requirement demonstrated; neither alone sufficient",
      },
      {
        name: "BTB (Sertoli cell tight junctions)",
        function: "Immune-privileged spermatogenic microenvironment",
        mechanism: "Occludin + ZO-1 + claudins = same TJ proteins as BBB",
        evidence: "Yu 2019 — 4G 2605 MHz disrupts BTB via Spock3-MMP2 axis",
      },
    ],

    /* 03 Mechanism Chain */
    s3Title: "Mechanism Chain: Two Parallel Attacks",
    s3Attack1Title: "Attack 1: Hormonal (Cav3 → testosterone)",
    s3Attack1:
      "EMF → Schwan delta-Vm → Cav3 window current → Ca2+ dysregulation → StAR phosphorylation disruption → cholesterol transport impaired → testosterone ↓",
    s3Attack2Title: "Attack 2: Barrier (BTB disruption)",
    s3Attack2:
      "EMF → MMP2 upregulation (Spock3-MMP2 axis) → occludin/ZO-1 degradation → BTB opening → spermatogenic microenvironment compromised → immune exposure of developing sperm → spermatogenesis disrupted",
    s3p1:
      "These two attacks are independent mechanisms targeting the same organ. Attack 1 operates through Cav3 ion channels (pathway A). Attack 2 operates through biological barrier disruption (pathway F). They reinforce each other: testosterone is required for BTB maintenance (Sertoli cell function is testosterone-dependent), so Attack 1 weakens the defense against Attack 2.",
    s3p2:
      "The result is a positive feedback loop: EMF → testosterone ↓ → BTB weakens → microenvironment exposed → spermatogenesis further disrupted → more damage with cumulative exposure.",

    /* 04 Evidence */
    s4Title: "Key Evidence",
    s4Studies: [
      {
        citation: "Xiang et al.",
        year: 2025,
        finding: "Cav3 (T-type) calcium channels directly control testosterone biosynthesis via StAR protein in Leydig cells. T-type channel activity is required for cholesterol transport to the inner mitochondrial membrane.",
        level: "E",
      },
      {
        citation: "Ma et al.",
        year: 2026,
        finding: "Both Cav1 (L-type) and Cav3 (T-type) calcium channels are required for normal spermatogenesis. Neither channel type alone is sufficient — dual requirement creates dual vulnerability.",
        level: "E",
      },
      {
        citation: "Yu et al. (Sci Total Environ)",
        year: 2019,
        finding: "Long-term 4G exposure (2605 MHz) directly disrupts blood-testis barrier integrity via the Spock3-MMP2 axis. Time-dependent, progressive reproductive toxicity.",
        level: "E",
      },
      {
        citation: "23-28 VGCC blocker studies",
        year: "2018-2025",
        finding: "Systematic evidence from 23-28 studies: VGCC blocker administration prevents or attenuates EMF-induced biological effects. Confirms that VGCC/Cav channels are the primary transduction pathway.",
        level: "M",
      },
    ],

    /* 05 Lindgren Analysis */
    s5Title: "Lindgren Analysis",
    s5p1:
      "The testes present a unique Lindgren analysis because the blood-testis barrier (BTB) creates a positive feedback vulnerability:",
    s5Criteria: [
      "chi_barrier (BTB) — uses same TJ proteins as BBB. EMF opens BTB → spermatogenic microenvironment exposed → more damage",
      "chi_channel — Cav3 in Leydig cells at bifurcation. Cav1+Cav3 dual requirement in spermatogonia doubles vulnerability surface",
      "chi_cumulative — BTB disruption is progressive (Yu 2019: time-dependent). Testosterone decline further weakens BTB. Positive feedback.",
      "chi_barrier amplifies with cumulative exposure — each cycle of BTB weakening + testosterone decline makes the next cycle worse",
    ],
    s5p2:
      "The positive feedback structure means that the testes chi does not reach a steady state — it increases with cumulative exposure duration. This predicts that testicular EMF effects should be progressive and irreversible beyond a certain exposure threshold, consistent with the age-dependent fertility decline observed in epidemiological data.",

    /* 06 Predictions */
    s6Title: "Predictions",
    s6Predictions: [
      {
        id: "TTYPE-1",
        text: "Selective T-type calcium channel blocker (TTA-P2) prevents EMF-induced testosterone decline in Leydig cell cultures. If EMF acts via Cav3, blocking the channel specifically should abolish the StAR-mediated steroidogenesis disruption.",
        discriminating: true,
      },
      {
        id: "BTB-1",
        text: "EMF-exposed testicular tissue shows occludin/ZO-1 degradation in the same spatial pattern as BBB disruption studies. If BTB and BBB share the same EMF-vulnerable tight junction mechanism, the molecular signature should be identical.",
        discriminating: true,
      },
    ],

    /* 07 CatSper Temperature */
    s7Title: "CatSper: Temperature-Gated at 33.5°C",
    s7p1: "Nature Communications 2025 revealed CatSper functions as a temperature-gated ion channel with thermal threshold 33.5°C and Q10 of 5.1. Premature activation impairs sperm function.",
    s7p2: "Connects to Blackman's temperature window (Ca2+ effects at 36–37°C only): both are narrow temperature windows near physiological temperature. Same χ_temperature that modulates Blackman's Ca2+ efflux also modulates CatSper-mediated capacitation.",
    s7p3: "BERM prediction: EMF perturbation via voltage-sensing domains could “pre-activate” CatSper at lower temperatures, causing premature capacitation → sperm exhaustion before reaching the egg. Reduces FUNCTIONAL fertility even if sperm count and morphology appear normal.",

    /* 08 Epigenetic Transgenerational Amplification */
    s8Title: "Epigenetic Transgenerational Amplification",
    s8Subtitle: "From Ca2+ to the Next Generation",
    s8Chain: [
      { step: 1, text: "EMF → VGCC → Ca2+ (Pall 2013, 23 studies)", level: "E", preprint: false },
      { step: 2, text: "Ca2+ → mitochondrial ROS (Scientific Reports 2019: mouse sperm, 905 MHz)", level: "E", preprint: false },
      { step: 3, text: "ROS → oxidative DNA damage in sperm: 8-OHdG as “carrier for next generation” (Cells 2023)", level: "E", preprint: false },
      { step: 4, text: "EMF → sperm DNA methylation changes IN HUMANS (Research Square 2025: radar-exposed men)", level: "E", preprint: true },
      { step: 5, text: "EMF → DNMT1/DNMT3b expression changes in spermatocytes (GC-2 cell line, 50 Hz ELF)", level: "E", preprint: false },
      { step: 6, text: "Non-monotonic methylation: decreased at 1 mT, INCREASED at 3 mT — same “window effect” as Blackman's Ca2+ efflux", level: "E", preprint: false },
      { step: 7, text: "Last link UNTESTED: Do EMF-induced sperm epigenetic changes persist in F3?", level: "U", preprint: false },
    ],
    s8FeedbackTitle: "If confirmed: Transgenerational amplification loop",
    s8FeedbackDesc: "EMF → sperm epigenome → offspring with altered χ_channel → increased EMF sensitivity → more epigenetic changes → F3 even more sensitive. This predicts ACCELERATING decline, consistent with Levine's meta-analysis: −1.16%/yr (1973–2000) → −2.64%/yr (2000–2018).",
    s8PreprintWarning: "Research Square 2025 is a PREPRINT, not peer-reviewed. Results should be treated as preliminary.",
    s8F3Warning: "The transgenerational F3 link is a DERIVED PREDICTION, not proven. It requires F3 animal studies to confirm.",

    seeAlso: "See also",
    modulomeOverview: "Modulome overview",
    evidencePortal: "Evidence register",
    bbbPage: "BBB & BTB barriers",
    citationLabel: "Citation",
    yearLabel: "Year",
    findingLabel: "Finding",
    levelLabel: "Level",
    channelLabel: "Channel",
    functionLabel: "Function",
    mechanismLabel: "Mechanism",
    evidenceLabel: "Evidence",
  },
  fi: {
    title: "Lisaantymiskohde",
    subtitle:
      "Leydigin solut (Cav3 → testosteroni), spermatogoniat (Cav1+Cav3), Sertolin solut (BTB), kypsaat siittiot (CatSper) — useita EMF-herkkia komponentteja rinnakkain",
    backLink: "← Takaisin moduloomiin",

    s1Title: "Useita EMF-herkkia komponentteja",
    s1p1:
      "Kivekset sisaltavat vahintaan nelja erillistaa EMF-herkkaa soluosastoa jotka toimivat rinnakkain. Leydigin solut kayttavat T-tyypin kalsiumkanavia (Cav3) testosteronibiosynteesiin StAR-proteiinin kautta (Xiang 2025). Spermatogoniat vaativat SEKA Cav1- (L-tyyppi) etta Cav3-kanavia (T-tyyppi) normaaliin spermatogeneesiin (Ma 2026). Sertolin solut yllapitavat veri-kivesestetta (BTB) kayttaen samoja tight junction -proteiineja (okkludiini, ZO-1) kuin veri-aivoeste. Kypsaat siittiot kayttavat CatSper-kanavia kapasitaatioon ja akrosomireaktioon.",
    s1p2:
      "Tama tarkoittaa, etta EMF-altistus hyokkaa miehen lisaantymistoimintaa useilla riippumattomilla mekanismeilla samanaikaisesti. Vaikka yksittainen mekanismi olisi marginaalinen, useiden mekanismien konvergenssi samaan paatetapahtumaan (hedelmallisyyden heikkeneminen) luo robustin vaikutuksen jota on vaikea liittaa mihinkaan yksittaiseen polkuun.",
    s1p3:
      "Kivekset ovat ainutlaatuisessa asemassa BERM-kehyksessa: ne ovat ainoa elin jossa seka VGCC-valitteinen ionikanavahairio (polut A/B) etta biologisen esteen hairio (polku F) konvergoivat samaan toiminnalliseen lopputulokseen.",

    s2Title: "Kanavaprofiiili",
    s2Channels: [
      {
        name: "Cav3 (T-tyyppi) Leydigin soluissa",
        function: "Testosteronibiosynteesi StAR-proteiinin kautta",
        mechanism: "Cav3 → Ca2+ → StAR-fosforylaatio → kolesterolin kuljetus → testosteroni",
        evidence: "Xiang 2025 — Cav3 kontrolloi suoraan StAR-valitteista steroidogeneesia",
      },
      {
        name: "CatSper kypsissa siittioissa",
        function: "Kapasitaatio, hyperaktivoitu motiliteetti, akrosomireaktio",
        mechanism: "pH-saadelty Ca2+-kanava joka on valttamaton hedelmotyskykyisyydelle",
        evidence: "CatSper-knockout = miehen infertiliteetti (useita tutkimuksia)",
      },
      {
        name: "Cav1 + Cav3 spermatogonioissa",
        function: "Molemmat vaaditaan normaaliin spermatogeneesiin",
        mechanism: "L-tyyppi (Cav1) ja T-tyyppi (Cav3) tukevat yhdessa solujen proliferaatiota ja erilaistumista",
        evidence: "Ma 2026 — kaksoisvaatimus osoitettu; kumpikaan yksin ei riita",
      },
      {
        name: "BTB (Sertolin solujen tight junctionit)",
        function: "Immuuniprivilegioitu spermatogeneettinen mikroymparisto",
        mechanism: "Okkludiini + ZO-1 + klaudiinit = samat TJ-proteiinit kuin BBB:ssa",
        evidence: "Yu 2019 — 4G 2605 MHz hairitsee BTB:ta Spock3-MMP2-akselin kautta",
      },
    ],

    s3Title: "Mekanismiketju: kaksi rinnakkaista hyokkaysta",
    s3Attack1Title: "Hyokkays 1: Hormonaalinen (Cav3 → testosteroni)",
    s3Attack1:
      "EMF → Schwanin delta-Vm → Cav3-ikkunavirta → Ca2+-dysregulaatio → StAR-fosforylaation hairio → kolesteronin kuljetus heikkenee → testosteroni ↓",
    s3Attack2Title: "Hyokkays 2: Este (BTB-hairio)",
    s3Attack2:
      "EMF → MMP2-ylisakately (Spock3-MMP2-akseli) → okkludiini/ZO-1-degradaatio → BTB avautuu → spermatogeneettinen mikroymparisto vaarantuu → kehittyvat siittiot altistuvat immuunijaarjestelmalle → spermatogeneesi hairiintyy",
    s3p1:
      "Nama kaksi hyokkaaysta ovat riippumattomia mekanismeja jotka kohdistuvat samaan elimeen. Hyokkays 1 toimii Cav3-ionikanavien kautta (polku A). Hyokkays 2 toimii biologisen esteen hairioon kautta (polku F). Ne vahvistavat toisiaan: testosteroni vaaditaan BTB:n yllapitoon (Sertolin solujen toiminta on testosteroniriippuvaista), joten Hyokkays 1 heikentaa puolustusta Hyokkaaysta 2 vastaan.",
    s3p2:
      "Tuloksena on positiivinen takaisinkytkentasilmukka: EMF → testosteroni ↓ → BTB heikkenee → mikroymparisto altistuu → spermatogeneesi hairiintyy edelleen → kumulatiivinen altistus lisaa vahinkoa.",

    s4Title: "Keskeinen evidenssi",
    s4Studies: [
      {
        citation: "Xiang ym.",
        year: 2025,
        finding: "Cav3 (T-tyyppi) kalsiumkanavat kontrolloivat suoraan testosteronibiosynteesia StAR-proteiinin kautta Leydigin soluissa. T-tyypin kanava-aktiivisuus vaaditaan kolesterolin kuljetukseen sisemmalle mitokondriaalikalvolle.",
        level: "E",
      },
      {
        citation: "Ma ym.",
        year: 2026,
        finding: "Seka Cav1- (L-tyyppi) etta Cav3-kalsiumkanavat (T-tyyppi) vaaditaan normaaliin spermatogeneesiin. Kumpikaan kanavatyyppi yksin ei riita — kaksoisvaatimus luo kaksoishaavoittuvuuden.",
        level: "E",
      },
      {
        citation: "Yu ym. (Sci Total Environ)",
        year: 2019,
        finding: "Pitkaaikainen 4G-altistus (2605 MHz) hairitsee suoraan veri-kivesesteen eheyytta Spock3-MMP2-akselin kautta. Aikariippuvainen, progressiivinen lisaantymistoksisuus.",
        level: "E",
      },
      {
        citation: "23-28 VGCC-salpaajatutkimusta",
        year: "2018-2025",
        finding: "Systemaattinen evidenssi 23-28 tutkimuksesta: VGCC-salpaajan anto estaa tai vaimentaa EMF-indusoituja biologisia vaikutuksia. Vahvistaa, etta VGCC/Cav-kanavat ovat ensisijainen transduuktiopolku.",
        level: "M",
      },
    ],

    s5Title: "Lindgren-analyysi",
    s5p1:
      "Kivekset tarjoavat ainutlaatuisen Lindgren-analyysin koska veri-kiveseste (BTB) luo positiivisen takaisinkytkentahaavoittuvuuden:",
    s5Criteria: [
      "chi_barrier (BTB) — kayttaa samoja TJ-proteiineja kuin BBB. EMF avaa BTB:n → spermatogeneettinen mikroymparisto altistuu → enemman vahinkoa",
      "chi_channel — Cav3 Leydigin soluissa bifurkaatiossa. Cav1+Cav3-kaksoisvaatimus spermatogonioissa kaksinkertaistaa haavoittuvuuspinta-alan",
      "chi_cumulative — BTB-hairio on progressiivinen (Yu 2019: aikariippuvainen). Testosteronin lasku heikentaa BTB:ta edelleen. Positiivinen takaisinkytkenta.",
      "chi_barrier vahvistuu kumulatiivisen altistuksen myota — jokainen BTB:n heikkenemisen + testosteronin laskun kierros tekee seuraavasta kierroksesta pahemman",
    ],
    s5p2:
      "Positiivinen takaisinkytkentarakenne tarkoittaa, etta kivesten chi ei saavuta tasapainotilaa — se kasvaa kumulatiivisen altistuksen keston myota. Tama ennustaa, etta kivesten EMF-vaikutusten tulisi olla progressiivisia ja peruuttamattomia tietyn altistuskynnyksen jalkeen, yhdenmukainen epidemiologisissa tiedoissa havaitun ikariippuvaisen hedelmallisyyden laskun kanssa.",

    s6Title: "Ennusteet",
    s6Predictions: [
      {
        id: "TTYPE-1",
        text: "Selektiivinen T-tyypin kalsiumkanavan salpaaja (TTA-P2) estaa EMF-indusoidun testosteronin laskun Leydigin soluviljelma. Jos EMF vaikuttaa Cav3:n kautta, kanavan spesifinen salpaaaminen tulisi kumota StAR-valitteisen steroidogeneesin hairio.",
        discriminating: true,
      },
      {
        id: "BTB-1",
        text: "EMF-altistettu kiveskudos osoittaa okkludiini/ZO-1-degradaation samassa spatiaalisessa kuviossa kuin BBB-hairiootutkimukset. Jos BTB ja BBB jakavat saman EMF-haavoittuvan tight junction -mekanismin, molekulaarisen allekirjoituksen tulisi olla identtinen.",
        discriminating: true,
      },
    ],

    /* 07 CatSper-lampotila */
    s7Title: "CatSper: Lampotilaohjattu 33,5 °C:ssa",
    s7p1: "Nature Communications 2025 paljasti, etta CatSper toimii lampotilaohjattuna ionikanavana termisella kynnyksella 33,5 °C ja Q10-arvolla 5,1. Ennenaikainen aktivoituminen heikentaa siittioiden toimintaa.",
    s7p2: "Yhteys Blackmanin lampotilaikkunaan (Ca2+-vaikutukset vain 36–37 °C:ssa): molemmat ovat kapeita lampotilaikkunoita fysiologisen lampotilan lahella. Sama chi_temperature moduloi seka Blackmanin Ca2+-effluksia etta CatSper-valitteista kapasitaatiota.",
    s7p3: "BERM-ennuste: EMF-hairio janniteanturidomeenien kautta voisi \"esiaktivoida\" CatSperin matalammissa lampotiloissa → ennenaikainen kapasitaatio → siittioiden uupuminen ennen munasolun saavuttamista. Vahentaa TOIMINNALLISTA hedelmallisyytta vaikka siittiomaara ja morfologia nayttaisivat normaaleilta.",

    /* 08 Epigeneettinen transgenerationaalinen vahvistus */
    s8Title: "Epigeneettinen transgenerationaalinen vahvistus",
    s8Subtitle: "Ca2+:sta seuraavaan sukupolveen",
    s8Chain: [
      { step: 1, text: "EMF → VGCC → Ca2+ (Pall 2013, 23 tutkimusta)", level: "E", preprint: false },
      { step: 2, text: "Ca2+ → mitokondriaalinen ROS (Scientific Reports 2019: hiiren siittiot, 905 MHz)", level: "E", preprint: false },
      { step: 3, text: "ROS → oksidatiivinen DNA-vaurio siittioissa: 8-OHdG \"kantajana seuraavalle sukupolvelle\" (Cells 2023)", level: "E", preprint: false },
      { step: 4, text: "EMF → siittioiden DNA-metylaatiomuutokset IHMISILLA (Research Square 2025: tutkasateille altistuneet miehet)", level: "E", preprint: true },
      { step: 5, text: "EMF → DNMT1/DNMT3b-ekspression muutokset spermatosyyteissa (GC-2-solulinja, 50 Hz ELF)", level: "E", preprint: false },
      { step: 6, text: "Ei-monotoninen metylaatio: laskenut 1 mT:ssa, NOUSSUT 3 mT:ssa — sama \"ikkunavaikutus\" kuin Blackmanin Ca2+-effluksissa", level: "E", preprint: false },
      { step: 7, text: "Viimeinen linkki TESTAAMATON: sailyvatko EMF-indusoidut siittioiden epigeneettiset muutokset F3-sukupolveen?", level: "U", preprint: false },
    ],
    s8FeedbackTitle: "Jos vahvistetaan: transgenerationaalinen vahvistussilmukka",
    s8FeedbackDesc: "EMF → siittioiden epigenoomi → jalkela muuttuneella chi_channel → lisaantynyt EMF-herkkyys → enemman epigeneettisia muutoksia → F3 entista herkempi. Ennustaa KIIHTYVAA laskua, yhdenmukainen Levinen meta-analyysin kanssa: −1,16 %/v (1973–2000) → −2,64 %/v (2000–2018).",
    s8PreprintWarning: "Research Square 2025 on PREPRINTTI, ei vertaisarvioitu. Tuloksia tulee kasitella alustavina.",
    s8F3Warning: "Transgenerationaalinen F3-linkki on JOHDETTU ENNUSTE, ei todistettu. Se vaatii F3-elaintutkimuksia vahvistukseksi.",

    seeAlso: "Katso myos",
    modulomeOverview: "Moduloomin yleiskatsaus",
    evidencePortal: "Evidenssirekisteri",
    bbbPage: "BBB- ja BTB-esteet",
    citationLabel: "Viite",
    yearLabel: "Vuosi",
    findingLabel: "Loydos",
    levelLabel: "Taso",
    channelLabel: "Kanava",
    functionLabel: "Toiminto",
    mechanismLabel: "Mekanismi",
    evidenceLabel: "Evidenssi",
  },
};

const LEVEL_BADGE: Record<string, string> = {
  E: "bg-green-500/10 text-green-600 dark:text-green-400",
  M: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  "M|C": "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  "L*": "bg-blue-500/10 text-blue-600 dark:text-blue-400",
  U: "bg-red-500/10 text-red-600 dark:text-red-400",
};

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

export default async function TestesPage({
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

      <PageHeader icon={ShieldAlert} title={d.title} subtitle={d.subtitle} />

      {/* 01 — Hero: Multiple EMF-Sensitive Components */}
      <section className="mb-16 border-t editorial-rule pt-6">
        <article id="components" className="scroll-mt-24">
          <h3 className="text-lg font-semibold mb-4">
            <span className="font-mono-num text-xs text-accent mr-2">01</span>
            {d.s1Title}
          </h3>
          <p className="editorial-rail mb-4 text-[0.95rem] leading-relaxed text-foreground">
            {d.s1p1}
          </p>
          <div className="space-y-3 text-sm text-foreground-muted leading-relaxed">
            <p>{d.s1p2}</p>
            <p>{d.s1p3}</p>
          </div>
        </article>
      </section>

      {/* 02 — Channel Profile */}
      <section className="mb-16 border-t editorial-rule pt-6">
        <h3 className="text-lg font-semibold mb-6">
          <span className="font-mono-num text-xs text-accent mr-2">02</span>
          {d.s2Title}
        </h3>

        <div className="grid gap-6 md:grid-cols-2">
          {d.s2Channels.map((ch, i) => (
            <div
              key={i}
              className="border-l-4 border-accent/40 rounded-r-lg bg-card p-5 space-y-3"
            >
              <h4 className="font-bold text-foreground text-sm leading-tight">
                {ch.name}
              </h4>
              <div>
                <p className="text-xs font-semibold text-foreground-muted uppercase tracking-wider mb-1">
                  {d.functionLabel}
                </p>
                <p className="text-xs text-foreground-muted leading-relaxed">
                  {ch.function}
                </p>
              </div>
              <div>
                <p className="text-xs font-semibold text-foreground-muted uppercase tracking-wider mb-1">
                  {d.mechanismLabel}
                </p>
                <p className="text-xs text-foreground-muted leading-relaxed">
                  {ch.mechanism}
                </p>
              </div>
              <div>
                <p className="text-xs font-semibold text-foreground-muted uppercase tracking-wider mb-1">
                  {d.evidenceLabel}
                </p>
                <p className="text-xs text-foreground-muted leading-relaxed italic">
                  {ch.evidence}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 03 — Mechanism Chain: Two Parallel Attacks */}
      <section className="mb-16 border-t editorial-rule pt-6">
        <h3 className="text-lg font-semibold mb-4">
          <span className="font-mono-num text-xs text-accent mr-2">03</span>
          {d.s3Title}
        </h3>

        <div className="space-y-4 mb-6">
          <div className="bg-card rounded-lg border border-card-border p-5">
            <p className="text-xs font-semibold text-foreground-muted uppercase tracking-wider mb-2">
              {d.s3Attack1Title}
            </p>
            <p className="font-mono text-sm text-accent leading-relaxed">
              {d.s3Attack1}
            </p>
          </div>
          <div className="bg-card rounded-lg border border-card-border p-5">
            <p className="text-xs font-semibold text-foreground-muted uppercase tracking-wider mb-2">
              {d.s3Attack2Title}
            </p>
            <p className="font-mono text-sm text-accent leading-relaxed">
              {d.s3Attack2}
            </p>
          </div>
        </div>

        <div className="space-y-4 text-sm text-foreground-muted leading-relaxed max-w-4xl">
          <p className="editorial-rail text-[0.95rem] text-foreground">
            {d.s3p1}
          </p>
          <p>{d.s3p2}</p>
        </div>
      </section>

      {/* 04 — Evidence */}
      <section className="mb-16 border-t editorial-rule pt-6">
        <h3 className="text-lg font-semibold mb-6">
          <span className="font-mono-num text-xs text-accent mr-2">04</span>
          {d.s4Title}
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-card-border text-left text-xs text-foreground-muted uppercase tracking-wider">
                <th className="py-2 pr-3">{d.citationLabel}</th>
                <th className="py-2 pr-3 w-16">{d.yearLabel}</th>
                <th className="py-2 pr-3">{d.findingLabel}</th>
                <th className="py-2 w-14">{d.levelLabel}</th>
              </tr>
            </thead>
            <tbody>
              {d.s4Studies.map((s) => (
                <tr
                  key={`${s.citation}-${s.year}`}
                  className="border-b border-card-border/40"
                >
                  <td className="py-2 pr-3 font-medium text-foreground">
                    {s.citation}
                  </td>
                  <td className="py-2 pr-3 font-mono-num text-foreground-muted">
                    {s.year}
                  </td>
                  <td className="py-2 pr-3 text-foreground-muted">
                    {s.finding}
                  </td>
                  <td className="py-2">
                    <span
                      className={`text-[0.65rem] font-semibold px-1.5 py-0.5 rounded ${LEVEL_BADGE[s.level] ?? ""}`}
                    >
                      {s.level}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* 05 — Lindgren Analysis */}
      <section className="mb-16 border-t editorial-rule pt-6">
        <h3 className="text-lg font-semibold mb-4">
          <span className="font-mono-num text-xs text-accent mr-2">05</span>
          {d.s5Title}
        </h3>

        <p className="text-sm text-foreground-muted leading-relaxed mb-4 max-w-4xl">
          {d.s5p1}
        </p>

        <ul className="space-y-2 text-sm text-foreground-muted leading-relaxed max-w-4xl mb-6">
          {d.s5Criteria.map((c, i) => (
            <li key={i} className="pl-1 flex gap-2">
              <span className="text-accent shrink-0">*</span>
              <span>
                <span className="font-mono text-xs font-medium text-foreground">
                  {c.split(" — ")[0]}
                </span>
                {" — "}
                {c.split(" — ")[1]}
              </span>
            </li>
          ))}
        </ul>

        <div className="bg-card rounded-lg border border-card-border p-5">
          <p className="text-sm text-foreground-muted leading-relaxed">
            {d.s5p2}
          </p>
        </div>
      </section>

      {/* 06 — Predictions */}
      <section className="mb-16 border-t editorial-rule pt-6">
        <h3 className="text-lg font-semibold mb-6">
          <span className="font-mono-num text-xs text-accent mr-2">06</span>
          {d.s6Title}
        </h3>

        <div className="space-y-4">
          {d.s6Predictions.map((p) => (
            <div
              key={p.id}
              className="border-l-4 border-green-500 rounded-r-lg bg-card p-4"
            >
              <div className="flex items-start justify-between gap-2 mb-2">
                <span className="font-mono-num text-xs font-bold text-accent">
                  {p.id}
                </span>
                {p.discriminating && (
                  <span className="shrink-0 text-[0.65rem] font-semibold px-1.5 py-0.5 rounded bg-green-500/10 text-green-600 dark:text-green-400">
                    {activeLocale === "fi" ? "Erotteleva" : "Discriminating"}
                  </span>
                )}
              </div>
              <p className="text-sm text-foreground-muted leading-relaxed">
                {p.text}
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
          ))}
        </div>
      </section>

      {/* 07 — CatSper: Temperature-Gated */}
      <section className="mb-16 border-t editorial-rule pt-6">
        <h3 className="text-lg font-semibold mb-4">
          <span className="font-mono-num text-xs text-accent mr-2">07</span>
          {d.s7Title}
        </h3>
        <div className="space-y-4">
          <div className="border-l-4 border-accent/40 rounded-r-lg bg-card p-5">
            <p className="text-sm text-foreground-muted leading-relaxed">
              {d.s7p1}
            </p>
          </div>
          <div className="border-l-4 border-accent/40 rounded-r-lg bg-card p-5">
            <p className="text-sm text-foreground-muted leading-relaxed">
              {d.s7p2}
            </p>
          </div>
          <div className="border-l-4 border-accent/40 rounded-r-lg bg-card p-5">
            <p className="text-sm text-foreground-muted leading-relaxed">
              {d.s7p3}
            </p>
          </div>
        </div>
      </section>

      {/* 08 — Epigenetic Transgenerational Amplification */}
      <section className="mb-16 border-t editorial-rule pt-6">
        <h3 className="text-lg font-semibold mb-2">
          <span className="font-mono-num text-xs text-accent mr-2">08</span>
          {d.s8Title}
        </h3>
        <p className="text-sm text-foreground-muted italic mb-6">
          {d.s8Subtitle}
        </p>

        <div className="ml-4 mb-6">
          {d.s8Chain.map((item, i) => {
            const isLast = i === d.s8Chain.length - 1;
            const badgeClass =
              item.level === "E"
                ? "bg-green-500/10 text-green-600 dark:text-green-400"
                : item.level === "U"
                  ? "bg-red-500/10 text-red-600 dark:text-red-400"
                  : "bg-amber-500/10 text-amber-600 dark:text-amber-400";
            return (
              <div
                key={item.step}
                className={`relative pl-8 pb-5 ${!isLast ? "border-l-2 border-accent/30" : ""}`}
              >
                <span className="absolute left-[-9px] top-0.5 w-[18px] h-[18px] rounded-full bg-background border-2 border-accent flex items-center justify-center">
                  <span className="text-[9px] font-bold text-accent">
                    {item.step}
                  </span>
                </span>
                <div className="flex items-start gap-2 flex-wrap">
                  <p className="text-sm text-foreground-muted leading-relaxed flex-1 min-w-0">
                    {item.text}
                  </p>
                  <span
                    className={`shrink-0 text-[0.65rem] font-semibold px-1.5 py-0.5 rounded ${badgeClass}`}
                  >
                    {item.level === "U"
                      ? activeLocale === "fi"
                        ? "EI TESTATTU"
                        : "NOT TESTED"
                      : item.level}
                  </span>
                </div>
                {item.preprint && (
                  <span className="inline-block mt-1 text-[0.65rem] font-semibold px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-600 dark:text-amber-400">
                    PREPRINT
                  </span>
                )}
              </div>
            );
          })}
        </div>

        <div className="space-y-3 mb-6">
          <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4">
            <p className="text-xs text-amber-600 dark:text-amber-400 font-semibold uppercase tracking-wider mb-1">
              {activeLocale === "fi" ? "Varoitus" : "Warning"}
            </p>
            <p className="text-sm text-foreground-muted leading-relaxed">
              {d.s8PreprintWarning}
            </p>
          </div>
          <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4">
            <p className="text-xs text-amber-600 dark:text-amber-400 font-semibold uppercase tracking-wider mb-1">
              {activeLocale === "fi" ? "Varoitus" : "Warning"}
            </p>
            <p className="text-sm text-foreground-muted leading-relaxed">
              {d.s8F3Warning}
            </p>
          </div>
        </div>

        <div className="border-l-4 border-accent/40 rounded-r-lg bg-card p-5">
          <p className="text-xs font-semibold text-foreground-muted uppercase tracking-wider mb-2">
            {d.s8FeedbackTitle}
          </p>
          <p className="text-sm text-foreground-muted leading-relaxed">
            {d.s8FeedbackDesc}
          </p>
        </div>
      </section>

      {/* See also */}
      <section className="border-t editorial-rule pt-6">
        <h3 className="text-sm font-semibold text-foreground mb-3">
          {d.seeAlso}
        </h3>
        <div className="flex gap-6 flex-wrap">
          <Link
            href={`/${locale}/modulome`}
            className="text-sm text-accent hover:underline"
          >
            {d.modulomeOverview} &rarr;
          </Link>
          <Link
            href={`/${locale}/evidence/bbb`}
            className="text-sm text-accent hover:underline"
          >
            {d.bbbPage} &rarr;
          </Link>
          <Link
            href={`/${locale}/evidence`}
            className="text-sm text-accent hover:underline"
          >
            {d.evidencePortal} &rarr;
          </Link>
        </div>
      </section>
    </div>
  );
}
