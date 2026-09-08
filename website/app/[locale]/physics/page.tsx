import { CombinedExposurePanel } from "@/components/CombinedExposurePanel";
import type { Metadata } from "next";
import Link from "next/link";
import { Atom } from "lucide-react";
import { ExplanationHub, ExplanationSection, ExplanationText } from "@/components/ExplanationHub";
import { MathBlock } from "@/components/MathBlock";
import { SignalStructureIllustration } from "@/components/SignalStructureIllustration";
import { pickCopy } from "@/lib/i18n";

const COPY = {
  en: {
    title: "Physics: the structure of the input",
    subtitle: "From Lindgren’s geometric premise to the physical change a biological receiver must register.",
    lead: "BERM starts with a claim about physical structure. It then asks how a living receiver translates that structure into a change of state. This order matters: the geometry supplies relationships between inputs, the receiving operator supplies the biological coupling, and the downstream model carries the resulting state into behavior and civilization.",
    incoming: "The 2025 Lindgren formulation: an electromagnetic four-potential contributes to the metric alongside the Minkowski background.",
    outgoing: "A receptor-specific input z, with its units, temporal structure and dependence on the receiver’s state. Biology uses this input to describe what changes next.",
    contents: [{ id: "premise", title: "The physical premise" }, { id: "cross-terms", title: "Background and external input" }, { id: "receiver", title: "The receiving operator" }, { id: "structure", title: "Consequences of the structure" }, { id: "measurement", title: "From field to observation" }],
    premise: "The starting point is the normalized 2025 form gμν = ημν + AμAν. The background term η distinguishes it from the 2021 singular formulation. This is the identified theoretical premise from which the following tensor relations are derived. [[ref:lindgren2025|Lindgren, Kovacs & Liukkonen 2025]].",
    premiseMeaning: "The proposition is relational: the total potential enters as a tensor product. BERM therefore retains the components and their relationships before asking what a particular receiving system can detect. A source label or one scalar technology index cannot by itself specify that structure.",
    cross: "Write the total potential as a background Ab and an external component a. Subtracting the background metric gives the exact identity below. The two cross terms retain the relationship between background and perturbation; the last term describes the external component’s own quadratic contribution.",
    crossMeaning: "This result is derived algebraically from the stated premise. It is still a tensor. A scalar biological response requires a declared contraction or observation operator. Where the computational notation retains a coefficient κ, it multiplies all three terms; its calibration belongs to that convention and the specified coupling.",
    receiver: "BERM conditionally derives a formal response operator by adding minimal matter–metric coupling and causal response theory. The resulting retarded tissue kernel maps δg to a selected observable. A receptor-specific temporal representation is written below: zᵣ is the measured input and Kᵣ the receiving operator. The state Sᵣ includes orientation, cofactors, redox state, biological phase and recovery history. [[ref:kubo1957_linear_response|Kubo 1957]].",
    receiverMeaning: "For example, z could be the logarithm of a reaction-rate ratio. In the normalized expression, a dimensionless z requires K to have units of inverse time. A change in membrane voltage needs a different operator and units. Naming CRY or an ion channel identifies a candidate biological implementation; the quantitative mapping must specify what that implementation measures.",
    bridgeTitle: "The explicit coupling premise",
    bridge: "The formal operator follows conditionally from BERM’s stated matter-coupling and response premises. Lindgren’s metric relation alone does not supply the gauge prescription, physical scale, tissue kernel, response sign, lag or human endpoint calibration. These remain open parts of L2. Component experiments constrain receiving states and downstream transitions while the physical bridge retains these explicit calibration tasks.",
    formalLink: "Read the conditional response-operator derivation →",
    structure: "The tensor form yields a useful separation. With background, state and coupling fixed, reversing a separates the part that changes sign from the part that does not. This is a structural prediction of the chosen premise and, for a linear receiving operator, of its composed response.",
    structureMeaning: "A realizable comparison must define the potential convention, the physical stimulus and the observation operator together. A carrier-phase reversal is not automatically a reversal of the complete perturbation in this identity. With several time-varying inputs, the cross terms also retain their relative frequencies, directions and phases before biological temporal filtering.",
    measurement: "FieldState is BERM’s observation and estimation module. Physical state can generate both a measurement and a biological response; using the measurement to estimate that state reverses the direction of inference, not the direction of causation. The model therefore keeps local field measurements, exposure proxies and scenario parameters distinct.",
    protocols: "Static fields, low-frequency fields, radiofrequency signals, pulsed magnetic stimulation and optical inputs each retain their own dose, spectrum, orientation and timing. The biological literature supplies receiver examples within these protocols. Their shared role is to identify which physical and physiological variables the coupling has to carry.",
    consequence: "The next step is now precise: carry z into receptor activity, chemical and electrical state, clocks and hormone responsiveness. This is where one physical input can branch into several coordinated biological consequences.",
    links: [
      { href: "/model/tensor-derivation", title: "The tensor derivation", description: "Follow the algebra, its conventions and the steps needed for a scalar observable." },
      { href: "/model/math", title: "Mathematical structure", description: "Equations, proposed response laws and the model’s computational representation." },
      { href: "/model/frequency-weights", title: "Frequency and response", description: "How spectral structure enters explicit receiver assumptions." },
      { href: "/measurement/fieldstate", title: "Measuring the physical state", description: "Observations, uncertainty and estimation in the FieldState module." },
      { href: "/evidence/superposition", title: "Combining physical inputs", description: "Read the existing superposition examples alongside the tensor structure." },
      { href: "/evidence/magnetoreception", title: "Biological reception", description: "Candidate receivers and the experimental systems that locate their responses." },
    ],
    next: { href: "/biology", title: "Biology: a changing receiving system", description: "Follow the input through receptors, clocks, hormone responsiveness and functional capacity." },
  },
  fi: {
    title: "Fysiikka: syötteen rakenne",
    subtitle: "Lindgrenin geometrisesta premissistä muutokseen, jonka biologisen vastaanottimen on rekisteröitävä.",
    lead: "BERM lähtee fysikaalista rakennetta koskevasta väitteestä. Sen jälkeen se selittää, miten elävä vastaanotin muuttaa tämän rakenteen biologisen tilan muutokseksi. Järjestys on olennainen: geometria antaa syötteiden väliset suhteet, vastaanotto-operaattori biologisen kytkennän ja mallin jatko kuljettaa tilan käyttäytymiseen ja sivilisaatioon.",
    incoming: "Lindgrenin vuoden 2025 muoto: sähkömagneettinen nelipotentiaali osallistuu metriikkaan Minkowskin taustan rinnalla.",
    outgoing: "Vastaanotinkohtainen syöte z, sen yksiköt, aikarakenne ja riippuvuus vastaanottimen tilasta. Biologia kuvaa tämän syötteen seuraukset.",
    contents: [{ id: "premise", title: "Fysikaalinen premissi" }, { id: "cross-terms", title: "Tausta ja ulkoinen syöte" }, { id: "receiver", title: "Vastaanotto-operaattori" }, { id: "structure", title: "Rakenteen seuraukset" }, { id: "measurement", title: "Kentästä havaintoon" }],
    premise: "Lähtökohta on vuoden 2025 normalisoitu muoto gμν = ημν + AμAν. Taustatermi η erottaa sen vuoden 2021 singulaarisesta muodosta. Tämä on yksilöity teoreettinen premissi, josta seuraavat tensorisuhteet johdetaan. [[ref:lindgren2025|Lindgren, Kovacs ja Liukkonen 2025]].",
    premiseMeaning: "Väite koskee suhteita: kokonaispotentiaali esiintyy tensoritulona. BERM säilyttää siksi komponentit ja niiden suhteet ennen kuin ratkaistaan, mitä tietty vastaanottava järjestelmä havaitsee. Lähteen nimi tai yksi teknologiaindeksi ei yksin määrittele tätä rakennetta.",
    cross: "Jaetaan kokonaispotentiaali taustaan Ab ja ulkoiseen osaan a. Taustametriikan vähentäminen antaa alla olevan tarkan identiteetin. Kaksi ristikkäistermiä säilyttävät taustan ja häiriön suhteen; viimeinen termi kuvaa ulkoisen osan omaa neliöllistä osuutta.",
    crossMeaning: "Tulos on johdettu algebrallisesti nimetystä premissistä. Se on edelleen tensori. Skalaarinen biologinen vaste tarvitsee määritellyn kontraktion tai havainto-operaattorin. Laskennallisessa merkinnässä mahdollisesti säilyvä κ kertoo kaikkia kolmea termiä; sen kalibrointi kuuluu kyseiseen konventioon ja määriteltyyn kytkentään.",
    receiver: "BERM johtaa formaalin vasteoperaattorin ehdollisesti lisäämällä minimaalisen materia–metriikka-kytkennän ja kausaalisen vastefunktioteorian. Syntyvä retardoitu kudosydin kuvaa δg:n valittuun havaittavaan. Alla käytetään vastaanotinkohtaista ajallista esitystä: zᵣ on mitattava syöte ja Kᵣ vastaanotto-operaattori. Tila Sᵣ sisältää orientaation, kofaktorit, redox-tilan, biologisen vaiheen ja palautumishistorian. [[ref:kubo1957_linear_response|Kubo 1957]].",
    receiverMeaning: "Esimerkiksi z voi olla reaktionopeuksien suhteen logaritmi. Normalisoidussa lausekkeessa dimensioton z edellyttää K:lta yksikköä 1/aika. Kalvojännitteen muutos tarvitsee toisen operaattorin ja yksiköt. CRY:n tai ionikanavan nimeäminen tunnistaa biologisen toteutusehdokkaan; määrällisessä kytkennässä määritellään, mitä sen toiminnasta mitataan.",
    bridgeTitle: "Eksplisiittinen kytkentäpremissi",
    bridge: "Formaali operaattori seuraa ehdollisesti BERM:n nimetyistä materia-kytkennän ja vastefunktioteorian premisseistä. Lindgrenin metriikkasuhde ei yksin anna gauge-reseptiä, fysikaalista mittakaavaa, kudosydintä, vasteen merkkiä, viivettä tai ihmispäätepisteiden kalibraatiota. Nämä ovat L2:n avoimia osia. Osakokeet rajaavat vastaanottavaa tilaa ja myöhempiä siirtymiä samalla, kun fysikaaliselle liitokselle jäävät nämä eksplisiittiset kalibrointitehtävät.",
    formalLink: "Lue ehdollisen vasteoperaattorin johto →",
    structure: "Tensorimuoto tuottaa käyttökelpoisen erottelun. Kun tausta, tila ja kytkentä säilyvät, a:n suunnan vaihto erottaa etumerkkiä vaihtavan osan parillisesta osasta. Tämä on valitun premissin rakenteellinen ennuste ja lineaarisen vastaanotto-operaattorin tapauksessa myös yhdistetyn vasteen ominaisuus.",
    structureMeaning: "Toteutettava vertailu määrittelee potentiaalin konvention, fysikaalisen ärsykkeen ja havainto-operaattorin yhdessä. Kantoaallon vaiheen kääntäminen ei automaattisesti käännä identiteetin koko häiriötä. Usean ajallisesti muuttuvan syötteen ristikkäistermit säilyttävät myös niiden suhteelliset taajuudet, suunnat ja vaiheet ennen biologista ajallista suodatusta.",
    measurement: "FieldState on BERM:n havainto- ja estimointimoduuli. Fysikaalinen tila voi tuottaa sekä mittauksen että biologisen vasteen. Kun mittauksesta arvioidaan tilaa, päättelyn suunta vaihtuu mutta syy-yhteyden suunta säilyy. Malli erottaa siksi paikalliset kenttämittaukset, altistusproksit ja skenaarioparametrit.",
    protocols: "Staattiset kentät, pienitaajuiset kentät, radiotaajuiset signaalit, magneettipulssit ja optiset syötteet säilyttävät omat annoksensa, spektrinsä, suuntansa ja ajoituksensa. Biologinen kirjallisuus antaa vastaanotinesimerkkejä näissä protokollissa. Niiden yhteinen tehtävä on tunnistaa, mitä fysikaalisia ja fysiologisia muuttujia kytkennän on kuljetettava.",
    consequence: "Seuraava askel on nyt täsmällinen: z viedään vastaanottimen toimintaan, kemialliseen ja sähköiseen tilaan, kelloihin ja hormonivasteisiin. Tässä yksi fysikaalinen syöte voi haarautua useiksi toisiinsa liittyviksi biologisiksi seurauksiksi.",
    links: [
      { href: "/model/tensor-derivation", title: "Tensorijohto", description: "Algebra, merkintäkonventiot ja skalaariseen havaintoon tarvittavat vaiheet." },
      { href: "/model/math", title: "Matemaattinen rakenne", description: "Yhtälöt, ehdotetut vastelait ja mallin laskennallinen esitys." },
      { href: "/model/frequency-weights", title: "Taajuus ja vaste", description: "Spektrin rakenne osana eksplisiittisiä vastaanotinoletuksia." },
      { href: "/measurement/fieldstate", title: "Fysikaalisen tilan mittaus", description: "Havainnot, epävarmuus ja estimointi FieldState-moduulissa." },
      { href: "/evidence/superposition", title: "Fysikaalisten syötteiden yhdistyminen", description: "Nykyiset superpositioesimerkit tensorirakenteen rinnalla." },
      { href: "/evidence/magnetoreception", title: "Biologinen vastaanotto", description: "Vastaanotinten ehdokkaat ja niiden vasteita paikantavat koejärjestelmät." },
    ],
    next: { href: "/biology", title: "Biologia: muuttuva vastaanottava järjestelmä", description: "Seuraa syötettä reseptoreihin, kelloihin, hormonien vaikuttavuuteen ja toimintakykyyn." },
  },
  ja: {}, fr: {}, ko: {},
} as const;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const d = pickCopy(COPY, locale) as typeof COPY.en;
  return { title: `${d.title} – Extinction Field`, description: d.subtitle };
}

export default async function PhysicsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const d = pickCopy(COPY, locale) as typeof COPY.en;
  const p = (text: string) => <ExplanationText locale={locale}>{text}</ExplanationText>;
  return <ExplanationHub locale={locale} copy={COPY} {...d} icon={Atom} stage="physics">
    <ExplanationSection {...d.contents[0]}>{p(d.premise)}<MathBlock tex={String.raw`g_{\mu\nu}=\eta_{\mu\nu}+A_\mu A_\nu`} />{p(d.premiseMeaning)}</ExplanationSection>
    <ExplanationSection {...d.contents[1]}>{p(d.cross)}<MathBlock tex={String.raw`A=A_b+a,\qquad\delta g_{\mu\nu}=A_{b,\mu}a_\nu+a_\mu A_{b,\nu}+a_\mu a_\nu`} />{p(d.crossMeaning)}</ExplanationSection>
    <ExplanationSection {...d.contents[2]}>{p(d.receiver)}<MathBlock tex={String.raw`z_r(t)=\int_0^\infty K_r^{\mu\nu}(\tau;S_r(t))\,\delta g_{\mu\nu}(t-\tau)\,d\tau`} />{p(d.receiverMeaning)}<div className="rounded-lg border border-accent/30 bg-accent/5 p-5"><h3 className="mb-3 text-base font-semibold">{d.bridgeTitle}</h3>{p(d.bridge)}<Link href={`/${locale}/mathematics#l2-response`} className="mt-4 inline-block text-sm text-accent hover:underline">{d.formalLink}</Link></div></ExplanationSection>
    <ExplanationSection {...d.contents[3]}>{p(d.structure)}<MathBlock tex={String.raw`\delta g(+a)-\delta g(-a)=2(A_b\otimes a+a\otimes A_b)`} /><MathBlock tex={String.raw`\delta g(+a)+\delta g(-a)=2a\otimes a`} />{p(d.structureMeaning)}<SignalStructureIllustration locale={locale} /></ExplanationSection>
    <ExplanationSection {...d.contents[4]}>{p(d.measurement)}{p(d.protocols)}{p(d.consequence)}</ExplanationSection>
  <CombinedExposurePanel locale={locale} focus="measurement" />
      </ExplanationHub>;
}
