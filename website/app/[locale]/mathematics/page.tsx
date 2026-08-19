import type { Metadata } from "next";
import type { Locale } from "@/lib/i18n";
import { MathBlock } from "@/components/MathBlock";

type Copy = {
  metaTitle: string;
  metaDescription: string;
  title: string;
  subtitle: string;
  nav: readonly { id: string; label: string }[];
  sections: readonly {
    id: string;
    title: string;
    body: readonly string[];
    equations?: readonly string[];
    note?: string;
  }[];
};

const t: Record<Locale, Copy> = {
  en: {
    metaTitle: "FieldState–ASFR mathematics – Extinction Field",
    metaDescription: "The measurement-aware FieldState–ASFR-v2 specification of BERM.",
    title: "FieldState–ASFR-v2 mathematical specification",
    subtitle:
      "A measurement-aware route from Lindgren-derived field hypotheses to organ states, couple capacity, age-specific fertility and TFR.",
    nav: [
      { id: "premise", label: "Physics premise" },
      { id: "fieldstate", label: "FieldState" },
      { id: "organ-state", label: "Organ state" },
      { id: "asfr", label: "ASFR → TFR" },
      { id: "cohort", label: "Cohort signal" },
      { id: "gme", label: "GME / R42" },
      { id: "validation", label: "Validation boundary" },
    ],
    sections: [
      {
        id: "premise",
        title: "1. Lindgren is a physics premise, not a population-effect estimate",
        body: [
          "The geometric ansatz is retained as the upstream hypothesis that motivates background dependence and quadratic cross-terms. It is not treated as independently validated human reproductive physics, and it does not itself supply an EMF-to-TFR coefficient.",
          "The normalised quantity used by the model is a documented FieldState coordinate. It is not obtained by inserting a membrane field expressed in V/m into χ. Local membrane potential, receptor orientation and tissue state are separate biological variables.",
        ],
        equations: ["g_{\\mu\\nu}=\\eta_{\\mu\\nu}+A_\\mu A_\\nu", "\\chi(a)=\\frac{a}{\\sqrt{1+a^2}}"],
        note:
          "Status: theory / structural hypothesis. The discriminating evidence is a measured vector-, angle-, spectrum- or timing-dependent response, not a country-level scalar correlation.",
      },
      {
        id: "fieldstate",
        title: "2. FieldState preserves the required physical quantities",
        body: [
          "For organ o, background, ambient and personal components are transferred through an organ-, posture- and geometry-specific transfer function Tₒ. Vector direction, phase/coherence, envelope/beat PSD, circadian context and source provenance remain explicit fields.",
          "Mobile subscriptions can describe digital-environment diffusion. The FieldState record instead documents local physical conditions and organ-specific transfer before an endpoint is analysed.",
        ],
        equations: [
          "\\mathbf A_{\\mathrm{selected},o}=T_o\\mathbf A_{\\mathrm{ambient}}+\\chi(\\lvert T_o\\mathbf A_{\\mathrm{background}}\\rvert)T_o\\mathbf A_{\\mathrm{personal}}",
          "X_{\\mathrm{geom},o}=2(T_o\\mathbf A_{\\mathrm{background}})\\cdot(T_o\\mathbf A_{\\mathrm{personal}})",
          "\\Xi_o=\\int PSD_{\\mathrm{envelope/beat},o}(f)W_o(f)\\,df",
        ],
        note:
          "A measurement-ready FieldState requires documented normalisation, B₀, organ transfer, PSD, circadian context, phase/coherence and measurement provenance. Incomplete records are reported as partial FieldState data.",
      },
      {
        id: "organ-state",
        title: "3. Biological capacity is organ-specific reversible/persistent state",
        body: [
          "A field feature affects a registered organ endpoint only through an explicit, evidence-linked increment model. Each organ has a reversible state R and persistent state P. Their retention and endpoint mapping are parameterised only when a parameter ID and evidence ID are supplied.",
          "The male branch separates blood–testis-barrier integrity, germline reserve, steroidogenesis, sperm output/function and DNA integrity. The female branch separates ovarian reserve, oocyte redox, ovulatory clock and luteal/implantation support. BTB has the registered direct reproductive branch; BBB, placenta and retina remain separate candidate barrier states rather than a shared multiplier.",
        ],
        equations: [
          "R_{o,t}=r_oR_{o,t-1}+\\Delta R_{o,t},\\qquad P_{o,t}=p_oP_{o,t-1}+\\Delta P_{o,t}",
          "F_o=f_{\\min,o}+(1-f_{\\min,o})\\exp[-(\\beta_{R,o}R_o+\\beta_{P,o}P_o)]",
          "\\Phi_m=F_{\\mathrm{BTB}}F_{\\mathrm{germline}}F_{\\mathrm{steroid}}F_{\\mathrm{sperm\\,output}}F_{\\mathrm{sperm\\,function}}F_{\\mathrm{sperm\\,DNA}}",
          "\\Phi_f=F_{\\mathrm{ovarian\\,reserve}}F_{\\mathrm{oocyte\\,redox}}F_{\\mathrm{ovulatory\\,clock}}F_{\\mathrm{luteal/implantation}}",
        ],
        note:
          "These are structures, not currently published country coefficients. Candidate placenta, BBB and retinal states receive a reproductive increment only after a parameter- and evidence-linked mapping is registered.",
      },
      {
        id: "asfr",
        title: "4. Couple state enters ASFR before TFR",
        body: [
          "A population average must retain the shared household and partner covariance; it is not a country-average male multiplier times a country-average female multiplier. Biological conception/live-birth capacity is then kept separate from demand/opportunity, period tempo and ART/live-birth delivery.",
          "TFR is a period sum of age-specific fertility rates. It is not a direct measure of gonadal capacity, so a change in TFR cannot be assigned to FieldState without the intervening ASFR and biological measurements.",
        ],
        equations: [
          "\\Phi^{\\mathrm{couple}}_{ij,t}=\\Phi_{m,i,t}\\Phi^{\\mathrm{conception}}_{f,j,t}F_{\\mathrm{shared\\,household},ij,t}L_{f,j,t}",
          "ASFR_{c,g,t}=ASFR^{\\mathrm{ref}}_{c,g,t_0}\\times\\frac{\\Phi^{\\mathrm{couple}}_{c,g,t}}{\\Phi^{\\mathrm{couple}}_{c,g,t_0}}\\times\\frac{O_{c,g,t}}{O_{c,g,t_0}}\\times\\frac{\\tau_{c,g,t}}{\\tau_{c,g,t_0}}\\times\\frac{ART_{c,g,t}}{ART_{c,g,t_0}}",
          "TFR_{c,t}=\\frac{5}{1000}\\sum_{g=15\\text{–}19}^{45\\text{–}49}ASFR_{c,g,t}",
        ],
        note:
          "WPP ASFR is the demographic reference. Demand/opportunity (O), tempo (τ) and ART are explicit external inputs, not residual labels for biology.",
      },
      {
        id: "cohort",
        title: "5. Current population result: a descriptive cohort-timing signal",
        body: [
          "With WPP 2024 ASFR and World Bank/ITU mobile subscriptions, the development-weighted young-minus-older cohort timing proxy correlates with the young-minus-older ASFR log-change in 2000–2023. The complete-country run has N = 163 and Pearson r = −0.66645; the BERM-country subset has N = 54 and r = −0.64012.",
          "This is useful because it follows the age/cohort premise better than a contemporaneous national TFR–subscription correlation. It remains a technology-timing proxy: region, income and demographic structure are material alternative explanations. It is not FieldState, a biological effect estimate or a calibration coefficient.",
        ],
        equations: [
          "C_g=\\frac{\\sum_{a=-1}^{17}w(a)M_{c,b_g+a}}{\\sum_a w(a)},\\qquad E_{gap}=\\overline{C}_{15\\text{–}29}-\\overline{C}_{30\\text{–}49}",
          "Y_{gap}=\\overline{\\log(ASFR_{2023,g}/ASFR_{2000,g})}_{15\\text{–}29}-\\overline{\\log(ASFR_{2023,g}/ASFR_{2000,g})}_{30\\text{–}49}",
        ],
        note:
          "This is a versioned, reproducible descriptive technology-timing analysis. Its development weights are scenario weights rather than calibrated sensitivity estimates. A v2 population estimate awaits matched FieldState, biomarker, couple and ASFR panels.",
      },
      {
        id: "gme",
        title: "6. GME / R42 is an experimental branch, not a network inference",
        body: [
          "Quadratic mixing motivates retaining an envelope/beat PSD in FieldState. Zandieh et al. (2025) observed frequency-dependent mitochondrial/ROS behaviour in cancer-cell experiments at ELF conditions (0.01–5 Hz; fields up to 100 mT). This provides an experimental candidate for cell-state-dependent response windows.",
          "It does not demonstrate RF-network envelope effects, an eDRX field signature, or reproductive harm. Any R42 analysis is therefore exploratory and must begin with measured PSD, sham/thermal controls and a pre-specified biological endpoint.",
        ],
        equations: ["I_{\\mathrm{GME},o}=\\int PSD_{\\mathrm{envelope},o}(f)W_{\\mathrm{mito},o}(f;f_0,Q,\\mathrm{redox})\\,df"],
        note:
          "Status: L* research protocol. No country-level or TFR parameter is derived from this branch.",
      },
      {
        id: "validation",
        title: "7. What constitutes a v2 result",
        body: [
          "A valid v2 calibration requires a matched FieldState panel, measured organ or couple endpoint, explicit parameter/evidence IDs and a train-only estimation period. A later ASFR/TFR period remains outside the fit for temporal evaluation.",
          "A population estimate is published when the corresponding FieldState and endpoint panels have been assembled, the mappings are registered and the temporal evaluation is complete.",
        ],
        note:
          "The specification keeps measurement, endpoint mapping and demographic estimation visible so each can be independently tested and improved.",
      },
    ],
  },
  fi: {
    metaTitle: "FieldState–ASFR-matematiikka – Extinction Field",
    metaDescription: "BERM:n mittaustietoinen FieldState–ASFR-v2-määrittely.",
    title: "FieldState–ASFR-v2:n matemaattinen määrittely",
    subtitle:
      "Mittaustietoinen reitti Lindgrenistä johdetuista kenttähypoteeseista elintiloihin, parikapasiteettiin, ikäkohtaiseen hedelmällisyyteen ja TFR:ään.",
    nav: [
      { id: "premise", label: "Fysiikan premissi" },
      { id: "fieldstate", label: "FieldState" },
      { id: "organ-state", label: "Elintila" },
      { id: "asfr", label: "ASFR → TFR" },
      { id: "cohort", label: "Kohorttisignaali" },
      { id: "gme", label: "GME / R42" },
      { id: "validation", label: "Validaatioraja" },
    ],
    sections: [
      {
        id: "premise",
        title: "1. Lindgren on fysiikkapremissi, ei väestövaikutusarvio",
        body: [
          "Geometrinen ansatz säilytetään upstream-hypoteesina, joka motivoi taustariippuvuutta ja neliöllisiä ristitermejä. Sitä ei käsitellä itsenäisesti validoituna ihmisen lisääntymisfysiikkana, eikä se itsessään anna EMF → TFR -kerrointa.",
          "Mallin käyttämä normalisoitu suure on dokumentoitu FieldState-koordinaatti. Sitä ei saada sijoittamalla V/m-yksiköissä oleva kalvokenttä suoraan χ:hon. Paikallinen kalvopotentiaali, reseptorin orientaatio ja kudostila ovat erillisiä biologisia muuttujia.",
        ],
        equations: ["g_{\\mu\\nu}=\\eta_{\\mu\\nu}+A_\\mu A_\\nu", "\\chi(a)=\\frac{a}{\\sqrt{1+a^2}}"],
        note:
          "Tila: teoria / rakenteellinen hypoteesi. Erottava näyttö on mitattu vektori-, kulma-, spektri- tai ajoitusriippuvainen vaste, ei maan tason skalaarikorrelaatio.",
      },
      {
        id: "fieldstate",
        title: "2. FieldState säilyttää tarvittavat fysikaaliset suureet",
        body: [
          "Elimelle o tausta-, ambient- ja henkilökohtaiset komponentit siirtyvät elin-, asento- ja geometriakohtaisen siirtofunktion Tₒ kautta. Vektorin suunta, vaihe/koherenssi, envelope/beat-PSD, vuorokausikonteksti ja lähdeprovenienssi säilyvät eksplisiittisinä kenttinä.",
          "Mobiililiittymät voivat kuvata digitaalisen ympäristön leviämistä. FieldState-tietue dokumentoi sen sijaan paikalliset fysikaaliset olosuhteet ja elinkohtaisen siirron ennen päätepisteanalyysiä.",
        ],
        equations: [
          "\\mathbf A_{\\mathrm{selected},o}=T_o\\mathbf A_{\\mathrm{ambient}}+\\chi(\\lvert T_o\\mathbf A_{\\mathrm{background}}\\rvert)T_o\\mathbf A_{\\mathrm{personal}}",
          "X_{\\mathrm{geom},o}=2(T_o\\mathbf A_{\\mathrm{background}})\\cdot(T_o\\mathbf A_{\\mathrm{personal}})",
          "\\Xi_o=\\int PSD_{\\mathrm{envelope/beat},o}(f)W_o(f)\\,df",
        ],
        note:
          "Mittausvalmis FieldState vaatii dokumentoidun normalisoinnin, B₀:n, elinsiirron, PSD:n, vuorokausikontekstin, vaiheen/koherenssin ja mittausprovenienssin. Epätäydelliset tietueet raportoidaan osittaisena FieldState-datana.",
      },
      {
        id: "organ-state",
        title: "3. Biologinen kapasiteetti on elinkohtainen palautuva/persistentti tila",
        body: [
          "Kenttäpiirre vaikuttaa rekisteröityyn elinpäätepisteeseen vain eksplisiittisen, evidenssiin kiinnitetyn incrementtimallin kautta. Jokaisella elimellä on palautuva R-tila ja persistentti P-tila. Niiden retentio ja endpoint-mapping parametroituu vasta, kun mukana ovat parameter-ID ja evidence-ID.",
          "Mieshaara erottaa veri–kivesesteen, ituradan varannon, steroidogeneesin, siittiötuoton/toiminnan ja DNA-eheyden. Naishaara erottaa munasarjavarannon, oosyyttiredoxin, ovulaation kellotuksen sekä luteaali-/implantaatiotuen. BTB:llä on rekisteröity suora lisääntymishaara; BBB, istukka ja retina ovat erillisiä kandidaatti-estetiloja, eivät yhteinen kerroin.",
        ],
        equations: [
          "R_{o,t}=r_oR_{o,t-1}+\\Delta R_{o,t},\\qquad P_{o,t}=p_oP_{o,t-1}+\\Delta P_{o,t}",
          "F_o=f_{\\min,o}+(1-f_{\\min,o})\\exp[-(\\beta_{R,o}R_o+\\beta_{P,o}P_o)]",
          "\\Phi_m=F_{\\mathrm{BTB}}F_{\\mathrm{germline}}F_{\\mathrm{steroid}}F_{\\mathrm{sperm\\,output}}F_{\\mathrm{sperm\\,function}}F_{\\mathrm{sperm\\,DNA}}",
          "\\Phi_f=F_{\\mathrm{ovarian\\,reserve}}F_{\\mathrm{oocyte\\,redox}}F_{\\mathrm{ovulatory\\,clock}}F_{\\mathrm{luteal/implantation}}",
        ],
        note:
          "Nämä ovat rakenteita, eivät vielä julkaistuja maakohtaisia kertoimia. Istukan, BBB:n ja retinan kandidaattitilat saavat lisääntymisincrementin vasta, kun parametri- ja evidenssikiinnitteinen mapping on rekisteröity.",
      },
      {
        id: "asfr",
        title: "4. Paritila tulee ASFR:ään ennen TFR:ää",
        body: [
          "Väestökeskiarvon on säilytettävä yhteinen kotiympäristö ja partnerikovarianssi; se ei ole maan keskiarvomiehen ja keskiarvonaisen tulo. Biologinen käsitys-/live-birth-kapasiteetti erotetaan lisäksi kysynnästä/mahdollisuudesta, perioditemposta ja ART:n live-birth-toimituksesta.",
          "TFR on ikäkohtaisten hedelmällisyyslukujen periodisumma. Se ei ole suora gonadikapasiteetin mittari, joten TFR-muutosta ei voi osoittaa FieldStatelle ilman välissä olevia ASFR- ja biologisia mittauksia.",
        ],
        equations: [
          "\\Phi^{\\mathrm{couple}}_{ij,t}=\\Phi_{m,i,t}\\Phi^{\\mathrm{conception}}_{f,j,t}F_{\\mathrm{shared\\,household},ij,t}L_{f,j,t}",
          "ASFR_{c,g,t}=ASFR^{\\mathrm{ref}}_{c,g,t_0}\\times\\frac{\\Phi^{\\mathrm{couple}}_{c,g,t}}{\\Phi^{\\mathrm{couple}}_{c,g,t_0}}\\times\\frac{O_{c,g,t}}{O_{c,g,t_0}}\\times\\frac{\\tau_{c,g,t}}{\\tau_{c,g,t_0}}\\times\\frac{ART_{c,g,t}}{ART_{c,g,t_0}}",
          "TFR_{c,t}=\\frac{5}{1000}\\sum_{g=15\\text{–}19}^{45\\text{–}49}ASFR_{c,g,t}",
        ],
        note:
          "WPP-ASFR on demografinen referenssi. Kysyntä/mahdollisuus (O), tempo (τ) ja ART ovat näkyviä ulkoisia syötteitä, eivät biologian residuaalimerkintöjä.",
      },
      {
        id: "cohort",
        title: "5. Nykyinen väestötulos: kuvaileva kohortti-ajoitussignaali",
        body: [
          "WPP 2024:n ASFR- ja World Bank/ITU:n mobiililiittymäsarjoilla kehityspainotettu nuori–vanhempi-kohortin ajoitusproksi korreloi nuori–vanhempi-ASFR:n logmuutoksen kanssa 2000–2023. Koko maapaneelissa N = 163 ja Pearson r = −0,66645; BERM-maiden osajoukossa N = 54 ja r = −0,64012.",
          "Tulos on hyödyllinen, koska se seuraa ikä-/kohorttipremissiä paremmin kuin samanaikainen kansallinen TFR–liittymäkorrelaatio. Se on silti teknologiakehityksen ajoitusproksi: alue, tulotaso ja demografinen rakenne ovat olennaisia vaihtoehtoisia selityksiä. Se ei ole FieldState, biologinen vaikutusarvio eikä kalibrointikerroin.",
        ],
        equations: [
          "C_g=\\frac{\\sum_{a=-1}^{17}w(a)M_{c,b_g+a}}{\\sum_a w(a)},\\qquad E_{gap}=\\overline{C}_{15\\text{–}29}-\\overline{C}_{30\\text{–}49}",
          "Y_{gap}=\\overline{\\log(ASFR_{2023,g}/ASFR_{2000,g})}_{15\\text{–}29}-\\overline{\\log(ASFR_{2023,g}/ASFR_{2000,g})}_{30\\text{–}49}",
        ],
        note:
          "Analyysi on versionoitu ja toistettava kuvaileva teknologia-ajoitusanalyysi. Sen kehityspainot ovat skenaariopainoja, eivät kalibroituja herkkyysestimaatteja. V2:n väestöarvio odottaa kohdistettua FieldState-, biomarkkeri-, pari- ja ASFR-paneelia.",
      },
      {
        id: "gme",
        title: "6. GME / R42 on kokeellinen haara, ei verkkopäätelmä",
        body: [
          "Neliöllinen sekoitus motivoi envelope/beat-PSD:n säilyttämistä FieldStatessa. Zandieh ym. (2025) havaitsi taajuusriippuvaista mitokondrio-/ROS-käyttäytymistä syöpäsolukokeissa ELF-olosuhteissa (0,01–5 Hz; kenttiä enintään 100 mT). Tämä tarjoaa kokeellisen ehdokkaan solutilariippuvaiselle vasteikkunalle.",
          "Se ei osoita RF-verkon envelope-vaikutusta, eDRX-kenttäallekirjoitusta eikä lisääntymishaittaa. Mahdollinen R42-analyysi on siksi eksploratiivinen: lähtökohtana ovat mitattu PSD, sham-/lämpökontrollit ja ennalta määritelty biologinen päätepiste.",
        ],
        equations: ["I_{\\mathrm{GME},o}=\\int PSD_{\\mathrm{envelope},o}(f)W_{\\mathrm{mito},o}(f;f_0,Q,\\mathrm{redox})\\,df"],
        note:
          "Tila: L*-tason tutkimusprotokolla. Tästä haarasta ei johdeta maakohtaista eikä TFR-parametria.",
      },
      {
        id: "validation",
        title: "7. Mikä muodostaa v2-tuloksen",
        body: [
          "Pätevä v2-kalibrointi edellyttää kohdistettua FieldState-paneelia, mitattua elin- tai paripäätepistettä, eksplisiittisiä parameter/evidence-ID:tä ja vain opetusjaksolta tehtävää estimointia. Myöhempi ASFR/TFR-jakso jää sovituksen ulkopuolelle ajalliseen arviointiin.",
          "Väestöarvio julkaistaan, kun vastaavat FieldState- ja endpoint-paneelit on koottu, mappingit rekisteröity ja ajallinen arviointi valmis.",
        ],
        note:
          "Määrittely pitää mittauksen, päätepistemappingin ja demografisen estimoinnin näkyvinä, jotta kutakin voidaan testata ja parantaa itsenäisesti.",
      },
    ],
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const d = t[(locale as Locale) in t ? (locale as Locale) : "en"];
  return { title: d.metaTitle, description: d.metaDescription };
}

function SectionNavigation({ sections }: { sections: Copy["nav"] }) {
  return (
    <nav className="hidden lg:block sticky top-20 w-52 shrink-0 self-start max-h-[calc(100vh-6rem)] overflow-y-auto">
      <ul className="space-y-1 text-sm border-l border-card-border pl-3">
        {sections.map((section) => (
          <li key={section.id}>
            <a href={`#${section.id}`} className="block leading-snug text-foreground-muted hover:text-accent transition-colors">
              {section.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export function MathematicsSections({ locale }: { locale: string }) {
  const d = t[(locale as Locale) in t ? (locale as Locale) : "en"];
  return (
    <div className="space-y-14">
      {d.sections.map((section) => (
        <section key={section.id} id={section.id}>
          <h2 className="text-xl font-semibold mb-3">{section.title}</h2>
          <div className="space-y-3 max-w-3xl">
            {section.body.map((paragraph) => (
              <p key={paragraph} className="text-sm leading-relaxed text-foreground-muted">{paragraph}</p>
            ))}
          </div>
          {section.equations && (
            <div className="mt-5 space-y-3 overflow-x-auto rounded-lg border border-card-border bg-background p-4">
              {section.equations.map((equation) => <MathBlock key={equation} tex={equation} />)}
            </div>
          )}
          {section.note && (
            <p className="mt-4 max-w-3xl rounded-lg border border-accent/20 bg-accent/5 p-3 text-xs leading-relaxed text-foreground-muted">
              {section.note}
            </p>
          )}
        </section>
      ))}
    </div>
  );
}

export default async function MathematicsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const d = t[(locale as Locale) in t ? (locale as Locale) : "en"];
  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      <header className="mb-12 max-w-3xl">
        <h1 className="text-3xl font-bold tracking-tight mb-3">{d.title}</h1>
        <p className="text-foreground-muted leading-relaxed">{d.subtitle}</p>
      </header>
      <div className="flex gap-12 items-start">
        <SectionNavigation sections={d.nav} />
        <div className="min-w-0 flex-1"><MathematicsSections locale={locale} /></div>
      </div>
    </div>
  );
}
