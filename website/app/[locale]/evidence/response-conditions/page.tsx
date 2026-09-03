import type { Metadata } from "next";
import Link from "next/link";
import { GitMerge } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { ClaimRef } from "@/components/ClaimRef";
import { StudyCitation } from "@/components/StudyCitation";
import { TranslationNotice } from "@/components/TranslationNotice";
import { EvidenceSynthesisBanner } from "@/components/EvidenceSynthesisBanner";
import { pickCopy } from "@/lib/i18n";

const SOURCES = [
  { year: 1991, author: "Litovitz et al.", condition: "Coherence time", result: "About 10 s of coherence produced the tested ornithine-decarboxylase response; shorter intervals weakened or removed it.", referenceId: "litovitz1991_coherence_time" },
  { year: 2005, author: "Rosenspire et al.", condition: "Metabolic phase", result: "The sign of the cellular response depended on phase relative to a metabolic oscillation.", referenceId: "rosenspire2005_metabolic_phase" },
  { year: 1983, author: "Ubeda et al.", condition: "Pulse shape and developmental window", result: "Chick-embryo effects depended on pulse rise time and exposure during the first 48 hours.", referenceId: "ubeda1983_pulse_shape" },
  { year: 1990, author: "Blackman et al. (orientation)", condition: "AC × DC relative orientation", result: "The tested calcium-release response depended on alignment between the oscillating and local static magnetic fields.", referenceId: "blackman1990" },
  { year: 1991, author: "Blackman et al. (temperature)", condition: "Temperature level and trajectory", result: "The same field protocol produced enhanced, reduced or null calcium release under different temperature conditions.", referenceId: "blackman1991" },
  { year: 1990, author: "Berman et al.", condition: "Laboratory interaction", result: "A six-laboratory replication found a pooled effect together with significant between-laboratory interaction.", referenceId: "berman1990_multilab_embryo" },
  { year: 2000, author: "Burch et al.", condition: "Polarization or linked source state", result: "Personal magnetic-field exposure was associated with lower urinary melatonin metabolite only in specified three-phase/substation conditions.", referenceId: "burch2000_personal_mf_melatonin" },
  { year: 1983, author: "Lymangrover et al.", condition: "Agonist-gated endocrine response", result: "The tested electric-field effect on steroidogenesis appeared under ACTH stimulation and within a field-intensity window.", referenceId: "lymangrover1983_acth_steroidogenesis" },
  { year: 1986, author: "Kavaliers & Ossenkopp", condition: "Calcium-state intervention", result: "Chelation blocked and ionophore treatment potentiated the tested field–morphine interaction.", referenceId: "kavaliers1986_calcium_morphine" },
  { year: 2002, author: "Liu et al.", condition: "Chemical co-exposure", result: "ELF magnetic field and lead produced joint oxidative effects in mouse brain and liver beyond the single exposures.", referenceId: "liu2002_elf_lead" },
  { year: 2005, author: "Ghione et al.", condition: "Human neural endpoint specificity", result: "A double-blind study reported EEG-alpha and pain-threshold changes while blood pressure and heart rate were null.", referenceId: "ghione2005_eeg_pain" },
  { year: 2012, author: "Møllerløkken et al.", condition: "Human protocol-specific null region", result: "One randomized crossover MRI protocol produced no immediate or 11-day change in the measured male reproductive hormones.", referenceId: "mollerlokken2012_mri_hormones" },
  { year: 2024, author: "Iversen et al.", condition: "Light × magnetic-field timing", result: "Combined light and magnetic conditions produced a supra-additive myoblast response whose interpretation depended on intervention timing.", referenceId: "iversen2024_light_magnetic" },
  { year: 2019, author: "Jimenez et al.", condition: "Carrier × envelope × channel × organ", result: "A specified 27.12 MHz amplitude-modulated protocol engaged Cav3.2 in hepatocellular-carcinoma models.", referenceId: "therabionic-ebioMedicine-2019" },
  { year: 2023, author: "FDA HDE H220001", condition: "Protocol-specific clinical boundary", result: "TheraBionic received HDE approval on 26 September 2023; 14/41 patients had stable disease beyond six months. HDE establishes probable benefit, not randomized effectiveness.", referenceId: "fda-hde-h220001" },
  { year: 2026, author: "Burd et al.", condition: "Engineered radical-pair feasibility", result: "An engineered flavin radical-pair construct enabled magnetic control in C. elegans; this does not identify a natural human receptor.", referenceId: "burd2026_engineered_radical_pair" },
] as const;

const SOURCE_FI: Record<string, { condition: string; result: string }> = {
  "Litovitz et al.": { condition: "Koherenssiaika", result: "Noin 10 sekunnin koherenssi tuotti testatun ornitiinidekarboksylaasivasteen; lyhyemmät jaksot heikensivät tai poistivat vasteen." },
  "Rosenspire et al.": { condition: "Metabolinen vaihe", result: "Soluvasteen etumerkki riippui vaiheesta suhteessa metaboliseen oskillaatioon." },
  "Ubeda et al.": { condition: "Pulssimuoto ja kehitysikkuna", result: "Kananalkion vaikutukset riippuivat pulssin nousuajasta ja altistuksesta ensimmäisten 48 tunnin aikana." },
  "Blackman et al. (orientation)": { condition: "AC × DC -kenttien keskinäinen suunta", result: "Testattu kalsiumin vapautumisvaste riippui oskilloivan ja paikallisen staattisen magneettikentän keskinäisestä suunnasta." },
  "Blackman et al. (temperature)": { condition: "Lämpötilataso ja -historia", result: "Sama kenttäprotokolla tuotti eri lämpötilaehdoissa lisääntyneen, vähentyneen tai puuttuvan kalsiumvasteen." },
  "Berman et al.": { condition: "Laboratoriovuorovaikutus", result: "Kuuden laboratorion replikaatiossa havaittiin yhdistetty vaikutus sekä merkitsevä laboratorioiden välinen vuorovaikutus." },
  "Burch et al.": { condition: "Polarisaatio tai siihen liittyvä lähdetila", result: "Henkilökohtainen magneettikenttäaltistus liittyi alempaan virtsan melatoniinimetaboliittiin vain määritellyissä kolmivaihe-/sähköasematilanteissa." },
  "Lymangrover et al.": { condition: "Agonistin portittama endokriininen vaste", result: "Testattu sähkökenttävaikutus steroidogeneesiin ilmeni ACTH-stimulaatiossa ja rajatussa kenttävoimakkuusikkunassa." },
  "Kavaliers & Ossenkopp": { condition: "Kalsiumtilan interventio", result: "Kelaatio esti ja ionofori voimisti testattua kenttä–morfiini-vuorovaikutusta." },
  "Liu et al.": { condition: "Kemiallinen yhteisaltistus", result: "ELF-magneettikenttä ja lyijy tuottivat hiiren aivoissa ja maksassa yhteisiä oksidatiivisia vaikutuksia, jotka ylittivät yksittäisaltistukset." },
  "Ghione et al.": { condition: "Ihmisen neuraalisen päätepisteen spesifisyys", result: "Kaksoissokkotutkimuksessa raportoitiin EEG-alfa- ja kipukynnysmuutoksia, mutta verenpaine ja syke olivat nollatuloksia." },
  "Møllerløkken et al.": { condition: "Ihmisen protokollakohtainen nolla-alue", result: "Yksi satunnaistettu MRI-risteytysprotokolla ei muuttanut mitattuja miesten lisääntymishormoneja välittömästi eikä 11 päivän seurannassa." },
  "Iversen et al.": { condition: "Valo × magneettikenttä -ajoitus", result: "Yhdistetty valo- ja magneettikenttäehto tuotti myoblasteissa supra-additiivisen vasteen, jonka tulkinta riippui intervention ajoituksesta." },
  "Jimenez et al.": { condition: "Kantoaalto × verhokäyrä × kanava × elin", result: "Määritelty 27,12 MHz:n amplitudimoduloitu protokolla aktivoi Cav3.2-reittiä maksasolukarsinooman malleissa." },
  "FDA HDE H220001": { condition: "Protokollakohtainen kliininen raja", result: "TheraBionic sai HDE-hyväksynnän 26.9.2023; 14/41 potilaalla tauti pysyi vakaana yli kuusi kuukautta. HDE osoittaa todennäköisen hyödyn, ei satunnaistettua vaikuttavuutta." },
  "Burd et al.": { condition: "Rakennetun radikaaliparin toteutettavuus", result: "Rakennettu flaviini-radikaaliparirakenne mahdollisti magneettisen ohjauksen C. elegansissa; se ei tunnista luonnollista ihmisen reseptoria." },
};

const COPY = {
  en: {
    title: "Response conditions and interaction evidence",
    subtitle: "What existing studies can constrain in BERM now — and what still requires a calibrated L2 kernel.",
    status: "Integration status",
    statusText: "The literature closes several literature-search gaps. It supports state-dependent response families involving phase, coherence duration, pulse shape, developmental timing, receptor or agonist state, redox state and co-exposure. Organ transfer and BERM's geometry-to-tissue calibration remain open.",
    equationTitle: "The constrained object",
    equationText: "BERM therefore writes the endpoint response as a retarded, state-conditional kernel rather than a universal weighted sum:",
    stateText: "Sᵣ includes background magnitude and direction, polarization, envelope spectrum, coherence time, circadian and metabolic phase, developmental window, receptor/agonist state, redox state, genotype, organ transfer and exposure history. FieldState may measure physical members of Sᵣ; BERM owns the biological kernel and endpoint mapping.",
    interactionTitle: "Interaction rule",
    interactionText: "For matched single- and combined-channel experiments, BERM stores both the additive contrast I₊ = Y₁₂ − Y₁ − Y₂ + Y₀ and the log-multiplicative contrast I× = log(Y₁₂/Y₀) − log(Y₁/Y₀) − log(Y₂/Y₀). Positive, null and negative values are all admissible. The model no longer assumes that combined channels must always be supra-additive.",
    hierarchyTitle: "Evidence hierarchy used here",
    hierarchy: [
      "Direct same-protocol intervention on the proposed mediator",
      "Direct component evidence in a different endpoint or system",
      "Composed convergence across separately observed transitions",
      "Open L2 mapping requiring one matched protocol",
    ],
    tableTitle: "Primary-source constraints",
    tableLead: "Each row constrains a response condition. None supplies an environmental population dose or a TFR coefficient.",
    headers: ["Source", "Condition", "Bounded result"],
    boundaryTitle: "What remains open",
    boundary: [
      "Gauge prescription, physical scale and biological background state A₀",
      "Endpoint-specific retarded kernel Kᵣ and its sign, lag and magnitude",
      "Geometry-to-natural radical-pair mapping in human tissue",
      "Direct EMF → human CatSper and EMF → F3 epigenetic routes",
      "A multichannel personal-exposure × reproduction panel with organ transfer",
      "Numerical FieldState-to-ASFR/TFR calibration",
    ],
    modelLink: "Return to the BERM response operator",
  },
  fi: {
    title: "Vaste-ehdot ja vuorovaikutusnäyttö",
    subtitle: "Mitä olemassa olevat tutkimukset voivat jo rajata BERM:ssä — ja mikä vaatii yhä kalibroidun L2-ytimen.",
    status: "Integraation tila",
    statusText: "Kirjallisuus sulkee useita kirjallisuushakuaukkoja. Se tukee tilariippuvaisia vasteperheitä, joissa olennaisia ovat vaihe, koherenssiaika, pulssimuoto, kehityksellinen ajoitus, reseptori- tai agonistitila, redox-tila ja yhteisaltistus. Elinsiirto ja BERM:n geometria–kudos-kalibrointi jäävät avoimiksi.",
    equationTitle: "Rajattava kohde",
    equationText: "BERM kirjoittaa päätepistevasteen viiveellisenä, tilasta riippuvana ytimenä eikä universaalina painotettuna summana:",
    stateText: "Sᵣ sisältää taustan voimakkuuden ja suunnan, polarisaation, verhokäyräspektrin, koherenssiajan, vuorokausi- ja metabolisen vaiheen, kehitysikkunan, reseptori-/agonistitilan, redox-tilan, genotyypin, elinsiirron ja altistushistorian. FieldState voi mitata Sᵣ:n fysikaalisia jäseniä; biologinen ydin ja päätepistekuvaus kuuluvat BERM:lle.",
    interactionTitle: "Vuorovaikutussääntö",
    interactionText: "Yhden ja kahden kanavan sovitetuissa kokeissa BERM tallentaa sekä additiivisen kontrastin I₊ = Y₁₂ − Y₁ − Y₂ + Y₀ että log-multiplikatiivisen kontrastin I× = log(Y₁₂/Y₀) − log(Y₁/Y₀) − log(Y₂/Y₀). Positiivinen, nolla ja negatiivinen arvo ovat kaikki sallittuja. Malli ei enää oleta, että yhdistetyt kanavat ovat aina supra-additiivisia.",
    hierarchyTitle: "Käytetty näyttöhierarkia",
    hierarchy: [
      "Suora saman protokollan interventio ehdotettuun välittäjään",
      "Suora komponenttinäyttö eri päätepisteessä tai järjestelmässä",
      "Erikseen havaituista siirtymistä koostettu konvergenssi",
      "Avoin L2-kuvaus, joka vaatii yhden sovitetun protokollan",
    ],
    tableTitle: "Primäärilähteiden rajaamat vaste-ehdot",
    tableLead: "Jokainen rivi rajaa vaste-ehtoa. Mikään niistä ei anna ympäristöaltistuksen populaatioannosta tai TFR-kerrointa.",
    headers: ["Lähde", "Ehto", "Rajattu tulos"],
    boundaryTitle: "Mikä on edelleen avoin",
    boundary: [
      "Gauge-määritys, fysikaalinen mittakaava ja biologinen taustatila A₀",
      "Päätepistekohtainen viiveydin Kᵣ sekä sen etumerkki, viive ja suuruus",
      "Geometriasta luonnolliseen radikaaliparivasteeseen johtava kuvaus ihmiskudoksessa",
      "Suorat EMF → ihmisen CatSper- ja EMF → F3-epigeneettiset reitit",
      "Monikanavainen henkilöaltistus × lisääntymispaneeli elinsiirtoineen",
      "Numeerinen FieldState → ASFR/TFR -kalibrointi",
    ],
    modelLink: "Palaa BERM:n vasteoperaattoriin",
  },
} as const;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const d = pickCopy(COPY, locale);
  return { title: `${d.title} – BERM`, description: d.subtitle };
}

export default async function ResponseConditionsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const d = pickCopy(COPY, locale);
  return (
    <>
      <TranslationNotice copy={COPY} locale={locale} />
      <main id="main-content" className="mx-auto max-w-5xl px-6 py-16">
        <PageHeader icon={GitMerge} title={d.title} subtitle={d.subtitle} />

        <EvidenceSynthesisBanner locale={locale} />

        <section className="mb-12 rounded-xl border border-status-partial/35 bg-status-partial/5 p-6">
          <h2 className="font-semibold">{d.status}</h2>
          <p className="mt-3 text-sm leading-relaxed text-foreground-muted">{d.statusText}</p>
        </section>

        <section className="mb-12 border-t editorial-rule pt-6">
          <h2 className="editorial-section-heading">{d.equationTitle}</h2>
          <p className="mt-3 text-sm text-foreground-muted">
            <ClaimRef claimId="claim.bridge.state-conditioned-kernel">{d.equationText}</ClaimRef>
          </p>
          <div className="my-5 overflow-x-auto rounded-xl border border-card-border bg-card-bg p-5 text-center font-mono-num text-sm">
            <ClaimRef claimId="claim.bridge.state-conditioned-kernel">
              uᵢ(t) = ∫ Kᵢᵘᵛ(τ; Sᵢ(t − τ)) Δgᵤᵥ(t − τ) dτ
            </ClaimRef>
          </div>
          <p className="text-sm leading-relaxed text-foreground-muted">{d.stateText}</p>
        </section>

        <section className="mb-12 grid gap-5 md:grid-cols-2">
          <article className="rounded-xl border border-card-border bg-card-bg p-6">
            <h2 className="font-semibold">{d.interactionTitle}</h2>
            <p className="mt-3 text-sm leading-relaxed text-foreground-muted">{d.interactionText}</p>
          </article>
          <article className="rounded-xl border border-card-border bg-card-bg p-6">
            <h2 className="font-semibold">{d.hierarchyTitle}</h2>
            <ol className="mt-3 space-y-2 text-sm text-foreground-muted">
              {d.hierarchy.map((item, index) => <li key={item}>{index + 1}. {item}</li>)}
            </ol>
          </article>
        </section>

        <section className="mb-12 border-t editorial-rule pt-6">
          <h2 className="editorial-section-heading">{d.tableTitle}</h2>
          <p className="mt-3 text-sm text-foreground-muted">{d.tableLead}</p>
          <div className="mt-5 overflow-x-auto rounded-xl border border-card-border">
            <table className="min-w-[760px] w-full border-collapse text-sm">
              <thead className="bg-card-bg text-left text-xs uppercase tracking-wider text-foreground-muted">
                <tr>{d.headers.map((header) => <th key={header} className="p-3">{header}</th>)}</tr>
              </thead>
              <tbody>
                {SOURCES.map((source) => (
                  <tr key={`${source.author}-${source.year}`} className="border-t border-card-border align-top">
                    <td className="p-3 font-medium"><StudyCitation referenceId={source.referenceId} locale={locale} label={`${source.author} (${source.year})`} /></td>
                    <td className="p-3 text-foreground-muted">{locale === "fi" ? SOURCE_FI[source.author]?.condition : source.condition}</td>
                    <td className="p-3 leading-relaxed text-foreground-muted">{locale === "fi" ? SOURCE_FI[source.author]?.result : source.result}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="mb-12 rounded-xl border border-card-border bg-card-bg p-6">
          <h2 className="font-semibold">{d.boundaryTitle}</h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-foreground-muted">
            {d.boundary.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </section>

        <Link href={`/${locale}/model#physics-to-biology`} className="text-sm font-medium text-accent hover:underline">
          {d.modelLink} →
        </Link>
      </main>
    </>
  );
}
