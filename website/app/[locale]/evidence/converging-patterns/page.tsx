import type { Metadata } from "next";
import Link from "next/link";
import { GitMerge } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { ClaimRef } from "@/components/ClaimRef";
import { StudyCitation } from "@/components/StudyCitation";
import { TranslationNotice } from "@/components/TranslationNotice";
import { pickCopy } from "@/lib/i18n";

const CLUSTERS = [
  {
    id: "joint-endocrine",
    claimId: "claim.synthesis.joint-endocrine-gate",
    path: "HPA/HPG × androgen use → behavioural response",
    sources: [
      { referenceId: "mehta2010_dual_hormone", label: "Mehta & Josephs 2010" },
      { referenceId: "narinx2022_free_testosterone", label: "Narinx et al. 2022" },
    ],
  },
  {
    id: "cry-clock",
    claimId: "claim.synthesis.cry-clock-hpg-chain",
    path: "CRY/RPM → clock/redox → HPA–HPG",
    sources: [
      { referenceId: "yoshii2009", label: "Yoshii et al. 2009" },
      { referenceId: "sherrard2018", label: "Sherrard et al. 2018" },
      { referenceId: "cao2015", label: "Cao et al. 2015" },
      { referenceId: "liu2014", label: "Liu et al. 2014" },
    ],
  },
  {
    id: "pharmacology",
    claimId: "claim.synthesis.target-intervention-triangulation",
    path: "VGCC/Vmem → mTOR → sperm and fertility endpoints",
    sources: [
      { referenceId: "pall2013_v2", label: "Pall 2013" },
      { referenceId: "ccb_fertility", label: "Benoff et al. 1994" },
      { referenceId: "rapamycin_fertility", label: "Zuber et al. 2008" },
    ],
  },
  {
    id: "heterogeneity",
    claimId: "claim.synthesis.protocol-state-heterogeneity",
    path: "protocol state → response kernel → positive/null/sign-changing endpoint",
    sources: [
      { referenceId: "litovitz1991_coherence_time", label: "Litovitz et al. 1991" },
      { referenceId: "blackman1990", label: "Blackman et al. 1990" },
      { referenceId: "blackman1991", label: "Blackman et al. 1991" },
      { referenceId: "berman1990_multilab_embryo", label: "Berman et al. 1990" },
    ],
  },
  {
    id: "vmem",
    claimId: "claim.synthesis.vmem-calcium-interface",
    path: "field-conditioned Vmem → Ca²⁺/mTOR fate state → fertilization capacity",
    sources: [
      { referenceId: "zandieh2025", label: "Zandieh et al. 2025" },
      { referenceId: "sempou2022", label: "Sempou et al. 2022" },
      { referenceId: "brown2016", label: "Brown et al. 2016" },
    ],
  },
  {
    id: "cross-species",
    claimId: "claim.synthesis.cross-species-transfer-prior",
    path: "conserved CRY dependence → ecological encounter → selection test",
    sources: [
      { referenceId: "ritz2004", label: "Ritz et al. 2004" },
      { referenceId: "yoshii2009", label: "Yoshii et al. 2009" },
      { referenceId: "wan2021_cryptochrome_monarch", label: "Wan et al. 2021" },
      { referenceId: "hallmann2017_v2", label: "Hallmann et al. 2017" },
      { referenceId: "rosenberg2019", label: "Rosenberg et al. 2019" },
    ],
  },
  {
    id: "susceptibility",
    claimId: "claim.synthesis.graded-susceptibility",
    path: "continuous biological state → individual threshold → observed response mixture",
    sources: [
      { referenceId: "mccarty2011", label: "McCarty et al. 2011" },
      { referenceId: "belpomme2022", label: "Belpomme & Irigaray 2022" },
      { referenceId: "rubin2010_ieiemf_provocation", label: "Rubin et al. 2010" },
    ],
  },
] as const;

type SynthesisClaimId = (typeof CLUSTERS)[number]["claimId"];

function SynthesisClaimRef({ claimId, children }: { claimId: SynthesisClaimId; children: React.ReactNode }) {
  switch (claimId) {
    case "claim.synthesis.joint-endocrine-gate":
      return <ClaimRef claimId="claim.synthesis.joint-endocrine-gate">{children}</ClaimRef>;
    case "claim.synthesis.cry-clock-hpg-chain":
      return <ClaimRef claimId="claim.synthesis.cry-clock-hpg-chain">{children}</ClaimRef>;
    case "claim.synthesis.target-intervention-triangulation":
      return <ClaimRef claimId="claim.synthesis.target-intervention-triangulation">{children}</ClaimRef>;
    case "claim.synthesis.protocol-state-heterogeneity":
      return <ClaimRef claimId="claim.synthesis.protocol-state-heterogeneity">{children}</ClaimRef>;
    case "claim.synthesis.vmem-calcium-interface":
      return <ClaimRef claimId="claim.synthesis.vmem-calcium-interface">{children}</ClaimRef>;
    case "claim.synthesis.cross-species-transfer-prior":
      return <ClaimRef claimId="claim.synthesis.cross-species-transfer-prior">{children}</ClaimRef>;
    case "claim.synthesis.graded-susceptibility":
      return <ClaimRef claimId="claim.synthesis.graded-susceptibility">{children}</ClaimRef>;
  }
}

const COPY = {
  en: {
    title: "The converging pattern in BERM evidence",
    subtitle: "Seven underused evidence combinations strengthen the same biological middle of the model.",
    lead: "The pattern is not that every paper tests all of BERM. It is that independent methods repeatedly locate causal leverage at the same intermediate states, in a compatible order. BERM gains explanatory force when those results are composed as one typed causal structure instead of being left as isolated citations.",
    ruleTitle: "The BERM composition rule",
    rule: "same mediator + compatible direction + independent method + predicted moderator → stronger causal-route constraint",
    ruleBody: "A composed route is therefore more informative than any one component. It does not need an impossible view of the world ‘as such’; it needs observable consequences that cohere, triangulate the same control points and outperform rival decompositions.",
    status: "Composed M|C",
    clusters: {
      "joint-endocrine": {
        title: "1. Testosterone × cortisol: the joint endocrine gate",
        body: "The dual-hormone finding supplies the missing interaction logic: androgen-linked behaviour depends on HPA state. Adding free/bound androgen and receptor-use capacity makes this a stronger BERM operator than total testosterone alone. At aggregate level the relevant quantity is the distribution of the joint endocrine state, not a national mean hormone value.",
        gain: "Strengthens: endocrine state → motivation, dominance and approach weighting.",
      },
      "cry-clock": {
        title: "2. CRY/RPM → clock/redox → HPG",
        body: "Genetic CRY dependence of magnetic clock responses, CRY-dependent redox modulation in mammalian cells, exposure-linked reproductive hormone/redox changes and ovarian clock control align in one direction. Together they close much of the biological serial bridge between magnetic sensitivity and reproductive timing.",
        gain: "Strengthens: an independent circadian route alongside VGCC/ROS.",
      },
      pharmacology: {
        title: "3. Pharmacological target triangulation",
        body: "Blocker-sensitive exposure responses locate leverage at calcium channels; calcium antagonists alter human sperm fertilization functions; mTOR inhibition alters sperm output, motility and fathered pregnancy rates. The interventions differ, but they converge on adjacent control points in BERM's VGCC/Vmem/mTOR reproductive branch.",
        gain: "Strengthens: the proposed intermediate nodes are causally capable of moving reproductive output.",
      },
      heterogeneity: {
        title: "4. Laboratory background and protocol state",
        body: "Coherence time, AC×DC orientation, temperature history and laboratory identity repeatedly change response magnitude or sign. The combined pattern supports BERM's state-conditioned kernel: laboratory background is part of the treatment state, and heterogeneous results contain information about the response surface.",
        gain: "Strengthens: mixed literature is predicted structure, not automatically random contradiction.",
      },
      vmem: {
        title: "5. Vmem, calcium and mTOR form one control interface",
        body: "Field-conditioned membrane-potential dynamics, experimental Vmem→Ca²⁺/mTOR cell-fate control and the association between depolarized human sperm Vmem and poor IVF fertilization form a coherent bridge. This places bioelectric state between exposure response and reproductive capacity rather than treating it as a decorative parallel pathway.",
        gain: "Strengthens: membrane state is a measurable mediator and intervention point.",
      },
      "cross-species": {
        title: "6. Conserved receptor logic organizes ecological evidence",
        body: "CRY-dependent magnetic sensing appears across distinct animal systems. This conservation gives BERM a principled way to order ecological tests: receptor dependence, life stage and field-reliant behaviour define predicted susceptibility, while insect and bird trend series supply population endpoints for that comparison.",
        gain: "Strengthens: ecology becomes a receptor-stratified comparative test, not a list of temporal coincidences.",
      },
      susceptibility: {
        title: "7. Susceptibility is a continuum, not a binary label",
        body: "An individualized transition-sensitive positive result, candidate physiological strata and negative average results across broad self-identified groups jointly point to a mixture model. BERM therefore estimates a continuous response threshold. A small responsive tail can disappear in a binary group average without ceasing to be a testable biological population.",
        gain: "Strengthens: null averages constrain the distribution while individualized replication tests its tail.",
      },
    },
    sources: "Source roles",
    consequencesTitle: "What this adds to the model",
    consequences: [
      "The HPA–HPG branch becomes an interaction model, not a list of hormone main effects.",
      "The CRY branch gains a serial receptor→redox/clock→reproductive-endocrine structure.",
      "Vmem becomes an explicit mediator joining calcium dynamics, mTOR and reproductive cell state.",
      "Protocol heterogeneity and individual heterogeneity become estimable parts of the response kernel.",
      "Pharmacology and cross-species data become independent triangulation axes for the same causal nodes.",
    ],
    boundaryTitle: "The remaining empirical target",
    boundary: "The main missing object is no longer a plausible biological chain. It is its joint calibration: one preregistered design that measures field state, tissue response, Vmem/Ca²⁺ or CRY state, endocrine mediators and a reproductive or behavioural endpoint in the same subjects and time order.",
    modelLink: "See the synthesis inside the BERM model",
    responseLink: "Response conditions and interaction tests",
    circadianLink: "Circadian and endocrine route",
    pharmacologyLink: "Pharmacological convergence",
    ecologyLink: "Ecological branch",
  },
  fi: {
    title: "BERM-evidenssin konvergoiva patterni",
    subtitle: "Seitsemän alihyödynnettyä evidenssiyhdistelmää vahvistaa mallin samaa biologista keskiosaa.",
    lead: "Patterni ei ole se, että jokainen tutkimus testaisi koko BERM:n. Patterni on se, että riippumattomat menetelmät paikantavat toistuvasti kausaalisen vaikutusvallan samoihin välitiloihin ja yhteensopivaan järjestykseen. BERM:n selitysvoima kasvaa, kun tulokset yhdistetään yhdeksi tyypitetyksi kausaalirakenteeksi eikä jätetä irrallisiksi viitteiksi.",
    ruleTitle: "BERM:n kompositiosääntö",
    rule: "sama välittäjä + yhteensopiva suunta + riippumaton menetelmä + ennustettu moderaattori → vahvempi kausaalireitin rajoite",
    ruleBody: "Koostettu reitti on siksi informatiivisempi kuin yksikään komponentti. Se ei vaadi mahdotonta näkymää maailmaan sellaisenaan, vaan havaittavia seurauksia, jotka sopivat yhteen, trianguloivat samat säätöpisteet ja päihittävät kilpailevat dekompositiot.",
    status: "Koostettu M|C",
    clusters: {
      "joint-endocrine": {
        title: "1. Testosteroni × kortisoli: yhteinen endokriininen portti",
        body: "Kaksoishormonilöydös antaa puuttuneen vuorovaikutuslogiikan: androgeeniin liittyvä käyttäytyminen riippuu HPA-tilasta. Vapaan/sidotun androgeenin ja reseptorinkäyttökapasiteetin lisääminen tekee tästä vahvemman BERM-operaattorin kuin kokonais-testosteroni yksin. Agregaattitasolla olennainen suure on yhteisen endokriinisen tilan jakauma, ei maan keskimääräinen hormonitaso.",
        gain: "Vahvistaa: endokriininen tila → motivaatio-, dominanssi- ja lähestymispainotus.",
      },
      "cry-clock": {
        title: "2. CRY/RPM → kello/redox → HPG",
        body: "Kellon magneettivasteen geneettinen CRY-riippuvuus, CRY-riippuvainen redox-modulaatio nisäkässoluissa, altistukseen liittyvät lisääntymishormoni-/redox-muutokset ja munasarjakellon säätö osoittavat samaan suuntaan. Yhdessä ne sulkevat suuren osan magneettiherkkyyden ja lisääntymisen ajoituksen välisestä biologisesta sarjasillasta.",
        gain: "Vahvistaa: itsenäinen sirkadiaaninen reitti VGCC/ROS-reitin rinnalla.",
      },
      pharmacology: {
        title: "3. Farmakologinen kohdetriangulaatio",
        body: "Salpaajaherkät altistusvasteet paikantavat vaikutusvallan kalsiumkanaviin; kalsiumantagonistit muuttavat ihmisen siittiöiden hedelmöitystoimintoja; mTOR-inhibitio muuttaa siittiömäärää, liikkuvuutta ja isäksi tulemisen todennäköisyyttä. Interventiot ovat erilaisia, mutta ne konvergoivat vierekkäisiin säätöpisteisiin BERM:n VGCC/Vmem/mTOR-lisääntymishaarassa.",
        gain: "Vahvistaa: ehdotetut välisolmut pystyvät kausaalisesti muuttamaan lisääntymistulosta.",
      },
      heterogeneity: {
        title: "4. Laboratoriotausta ja protokollatila",
        body: "Koherenssiaika, AC×DC-suunta, lämpötilahistoria ja laboratorio muuttavat toistuvasti vasteen suuruutta tai etumerkkiä. Yhteinen patterni tukee BERM:n tilariippuvaista ydintä: laboratoriotausta kuuluu käsittelytilaan ja heterogeeniset tulokset sisältävät tietoa vastepinnasta.",
        gain: "Vahvistaa: sekava kirjallisuus on ennustettua rakennetta, ei automaattisesti satunnaista ristiriitaa.",
      },
      vmem: {
        title: "5. Vmem, kalsium ja mTOR muodostavat yhden säätörajapinnan",
        body: "Kentän ehdollistama kalvopotentiaalidynamiikka, kokeellinen Vmem→Ca²⁺/mTOR-solukohtalosäätö ja depolarisoituneen ihmisen siittiö-Vmem:n yhteys heikkoon IVF-hedelmöitymiseen muodostavat koherentin sillan. Biosähköinen tila sijoittuu altistusvasteen ja lisääntymiskapasiteetin väliin eikä jää koristeelliseksi rinnakkaishaaraksi.",
        gain: "Vahvistaa: kalvotila on mitattava välittäjä ja interventiopiste.",
      },
      "cross-species": {
        title: "6. Säilynyt reseptorilogiikka järjestää ekologisen evidenssin",
        body: "CRY-riippuvainen magneettiaistimus esiintyy erillisissä eläinjärjestelmissä. Säilyneisyys antaa BERM:lle periaatteellisen tavan järjestää ekologiset testit: reseptoririippuvuus, elinvaihe ja kentästä riippuva käyttäytyminen määrittävät ennustetun herkkyyden, ja hyönteis- sekä lintusarjat antavat vertailulle populaatiopäätepisteet.",
        gain: "Vahvistaa: ekologia muuttuu reseptoriositetuksi vertailutestiksi eikä ajallisten yhteensattumien listaksi.",
      },
      susceptibility: {
        title: "7. Herkkyys on jatkumo, ei binäärinen luokka",
        body: "Yksilöllinen siirtymäherkkä positiivinen tulos, ehdokkaat fysiologiset ositteet ja laajojen itse määriteltyjen ryhmien negatiiviset keskiarvot osoittavat yhdessä seosmalliin. BERM estimoi siksi jatkuvaa vastekynnystä. Pieni vasteellinen häntä voi kadota binääriseen ryhmäkeskiarvoon lakkaamatta olemasta testattava biologinen populaatio.",
        gain: "Vahvistaa: nollakeskiarvot rajaavat jakaumaa ja yksilöllinen replikaatio testaa sen häntää.",
      },
    },
    sources: "Lähteiden roolit",
    consequencesTitle: "Mitä tämä lisää malliin",
    consequences: [
      "HPA–HPG-haarasta tulee vuorovaikutusmalli eikä hormonien päävaikutusten luettelo.",
      "CRY-haara saa sarjallisen reseptori→redox/kello→lisääntymisendokriininen-rakenteen.",
      "Vmem:stä tulee eksplisiittinen välittäjä kalsiumdynamiikan, mTOR:n ja lisääntymissolun tilan välille.",
      "Protokolla- ja yksilöheterogeenisuus muuttuvat estimoitaviksi vasteytimen osiksi.",
      "Farmakologia ja lajienvälinen data muuttuvat samojen kausaalisolmujen riippumattomiksi triangulaatioakseleiksi.",
    ],
    boundaryTitle: "Jäljelle jäävä empiirinen kohde",
    boundary: "Pääasiallinen puuttuva kohde ei enää ole uskottava biologinen ketju, vaan sen yhteiskalibrointi: yksi esirekisteröity asetelma, joka mittaa kenttätilan, kudosvasteen, Vmem/Ca²⁺- tai CRY-tilan, endokriiniset välittäjät ja lisääntymis- tai käyttäytymispäätepisteen samoissa koehenkilöissä ja oikeassa aikajärjestyksessä.",
    modelLink: "Katso synteesi BERM-mallissa",
    responseLink: "Vaste-ehdot ja vuorovaikutustestit",
    circadianLink: "Sirkadiaaninen ja endokriininen reitti",
    pharmacologyLink: "Farmakologinen konvergenssi",
    ecologyLink: "Ekologinen haara",
  },
} as const;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const d = pickCopy(COPY, locale);
  return { title: `${d.title} – BERM`, description: d.subtitle };
}

export default async function ConvergingPatternsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const d = pickCopy(COPY, locale);
  const clusterCopy = d.clusters as Record<string, { title: string; body: string; gain: string }>;

  return (
    <>
      <TranslationNotice copy={COPY} locale={locale} />
      <main id="main-content" className="mx-auto max-w-5xl px-6 py-16">
        <PageHeader icon={GitMerge} title={d.title} subtitle={d.subtitle} />

        <p className="mb-10 max-w-4xl text-base leading-relaxed text-foreground-muted">{d.lead}</p>

        <section className="mb-12 rounded-xl border border-accent/35 bg-accent/5 p-6">
          <h2 className="font-semibold">{d.ruleTitle}</h2>
          <p className="my-4 overflow-x-auto rounded-lg bg-background/70 p-4 text-center font-mono-num text-sm font-semibold">{d.rule}</p>
          <p className="text-sm leading-relaxed text-foreground-muted">{d.ruleBody}</p>
        </section>

        <section className="mb-14 space-y-5">
          {CLUSTERS.map((cluster) => {
            const copy = clusterCopy[cluster.id];
            return (
              <article id={cluster.id} key={cluster.id} className="rounded-xl border border-card-border bg-card-bg p-6">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <h2 className="text-lg font-semibold">{copy.title}</h2>
                    <p className="mt-1 font-mono-num text-xs text-accent">{cluster.path}</p>
                  </div>
                  <span className="rounded-full border border-status-partial/40 bg-status-partial/10 px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-wider text-status-partial">{d.status}</span>
                </div>
                <SynthesisClaimRef claimId={cluster.claimId}>
                  <p className="mt-4 text-sm leading-relaxed text-foreground-muted">{copy.body}</p>
                </SynthesisClaimRef>
                <p className="mt-4 border-l-2 border-accent/50 pl-3 text-sm font-medium">{copy.gain}</p>
                <div className="mt-5">
                  <p className="mb-2 text-[0.68rem] font-semibold uppercase tracking-wider text-foreground-muted">{d.sources}</p>
                  <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs">
                    {cluster.sources.map((source) => (
                      <StudyCitation key={source.referenceId} referenceId={source.referenceId} locale={locale} label={source.label} />
                    ))}
                  </div>
                </div>
              </article>
            );
          })}
        </section>

        <section className="mb-12 grid gap-5 md:grid-cols-2">
          <article className="rounded-xl border border-card-border bg-card-bg p-6">
            <h2 className="font-semibold">{d.consequencesTitle}</h2>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed text-foreground-muted">
              {d.consequences.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </article>
          <article className="rounded-xl border border-status-partial/35 bg-status-partial/5 p-6">
            <h2 className="font-semibold">{d.boundaryTitle}</h2>
            <p className="mt-4 text-sm leading-relaxed text-foreground-muted">{d.boundary}</p>
          </article>
        </section>

        <nav className="grid gap-3 border-t editorial-rule pt-6 text-sm sm:grid-cols-2">
          <Link href={`/${locale}/model#evidence-synthesis`} className="text-accent hover:underline">{d.modelLink} →</Link>
          <Link href={`/${locale}/evidence/response-conditions`} className="text-accent hover:underline">{d.responseLink} →</Link>
          <Link href={`/${locale}/evidence/circadian`} className="text-accent hover:underline">{d.circadianLink} →</Link>
          <Link href={`/${locale}/evidence/pharmacology`} className="text-accent hover:underline">{d.pharmacologyLink} →</Link>
          <Link href={`/${locale}/evidence/ecology`} className="text-accent hover:underline">{d.ecologyLink} →</Link>
        </nav>
      </main>
    </>
  );
}
