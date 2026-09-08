import { MathBlock } from "@/components/MathBlock";
import { pickCopy } from "@/lib/i18n";

const COPY = {
  en: {
    premisesTitle: "Where the deductions begin",
    intro: "The conclusions follow from these BERM premises. A biological field effect is a starting assumption of the model here; it is not inferred from a proxy’s correlation.",
    premises: [
      { title: "Geometry and biological coupling", text: "Lindgren’s 2025 starting point is g = η + A ⊗ A; connecting its change to a biological response through Ξ[S] is a separate BERM premise." },
      { title: "Distinct causal roles", text: "In the pathways examined here, a proxy tracks environmental change, an intermediate transmits an effect, and another exposure modifies it." },
      { title: "Other causes and observation", text: "Food, chemicals, behaviour and practical constraints retain their causal roles; the biological outcome is distinguished from its recorded observation." },
    ],
    boundary: "The biological coupling’s physical scale, gauge prescription and tissue calibration remain open; the geometric starting point does not specify them.",
    deductionsTitle: "What follows from the premises",
    deductions: [
      { title: "A proxy does not identify the effect’s origin", text: "A proxy that tracks a shared environmental change predicts the outcome through that common cause. Calling the proxy the explanation leaves the intervening biological pathway unresolved." },
      { title: "A real proximate cause still has an origin", text: "Increased eating causes weight gain while the change in appetite still needs explaining. Holding an intermediate fixed excludes the pathway through it from the effect being examined." },
      { title: "One exposure’s effect can include another’s contribution", text: "In an interaction, the chemical’s response includes a component that depends on field conditions. The chemical remains a real cause, but its concentration alone does not explain the response’s size." },
      { title: "A category or recorded trend is not a mechanism", text: "Urbanisation combines exposures, resources and behaviour under one label. Recorded prevalence also includes detection and classification, so its change does not by itself identify a biological pathway." },
    ],
    mathTitle: "Open the mathematical derivation of the proxy argument",
    commonTitle: "A common cause creates the association",
    commonText: "Environmental change U affects proxy P and field input E. In this pathway, E acts through biological state B on outcome Y; the association with P does not pass through an effect of P itself.",
    mediationTitle: "The total effect includes the intermediate",
    mediationText: "M is the intermediate. The total derivative includes both the direct effect and the effect transmitted through M. Holding M fixed removes the second term from the comparison.",
    interactionTitle: "The chemical response depends on field conditions",
    interactionText: "C is chemical exposure. For an interaction with γ ≠ 0, the response to C at fixed E is β_C + γE. The sign of γ belongs to the specified chemical, tissue and protocol; it is not assigned to all combinations.",
    observationTitle: "Recording is a separate step",
    observationText: "R describes detection and recording. The recorded outcome depends on biological outcome Y and the observation process, which need to be distinguished when interpreting a trend.",
    identification: "These equations describe effects in the specified causal model. Interpreting observational regression coefficients as those effects additionally requires identification assumptions.",
    standardTitle: "The same standard for every explanation",
    standardText: "Assess every explanation by assembling the positive evidence from component studies, interventions and justified causal links. A proxy’s regression coefficient alone is not a mechanistic explanation, and a chain assembled from different studies retains evidential value; unresolved identification questions are reported separately.",
  },
  fi: {
    premisesTitle: "Mistä johtopäätökset seuraavat?",
    intro: "Johtopäätökset johdetaan seuraavista BERM-premisseistä. Kenttähaaran biologinen vaikutus on tässä mallin lähtöoletus; sitä ei päätellä proksin korrelaatiosta.",
    premises: [
      { title: "Geometria ja biologinen liitos", text: "Lindgrenin vuoden 2025 lähtökohta on g = η + A ⊗ A; sen muutoksen yhdistäminen biologiseen vasteeseen operaattorilla Ξ[S] on erillinen BERM-premissi." },
      { title: "Eri kausaaliset tehtävät", text: "Tarkasteltavissa reiteissä proksi seuraa ympäristömuutosta, välivaihe välittää vaikutusta ja rinnakkainen altiste muokkaa sitä." },
      { title: "Muut syyt ja havainnointi", text: "Ravinto, kemikaalit, käyttäytyminen ja käytännön rajoitteet säilyvät kausaalisina tekijöinä; biologinen lopputulos erotetaan siitä kirjatusta havainnosta." },
    ],
    boundary: "Biologisen liitoksen fysikaalinen asteikko, gauge-resepti ja kudoskalibrointi ovat avoimia; geometrinen lähtökohta ei määritä niitä.",
    deductionsTitle: "Mitä premisseistä seuraa?",
    deductions: [
      { title: "Proksi ei tunnista vaikutuksen alkuperää", text: "Yhteistä ympäristömuutosta seuraava proksi ennustaa lopputulosta tämän yhteisen syyn kautta. Proksin nimeäminen selitykseksi jättää biologisen vaikutusreitin avaamatta." },
      { title: "Todellinen lähisyy tarvitsee alkuperän selityksen", text: "Lisääntynyt syöminen aiheuttaa painonnousua, mutta ruokahalun muutos tarvitsee oman selityksensä. Välivaiheen pitäminen vakiona sulkee sen kautta kulkevan reitin tarkasteltavasta vaikutuksesta." },
      { title: "Altisteen vaikutus voi sisältää toisen osuuden", text: "Yhteisvaikutuksessa kemikaalin vasteeseen kuuluu kenttätilasta riippuva osa. Kemikaali säilyy todellisena syynä, mutta sen pitoisuus ei yksin selitä vasteen suuruutta." },
      { title: "Koontiluokka tai tilastotrendi ei ole mekanismi", text: "Kaupungistuminen kokoaa altistuksia, resursseja ja käyttäytymistä saman nimen alle. Kirjattu esiintyvyys sisältää myös havaitsemisen ja luokittelun, joten sen muutos ei yksin tunnista biologista vaikutusreittiä." },
    ],
    mathTitle: "Avaa proksipäättelyn matemaattinen johto",
    commonTitle: "Yhteinen syy tuottaa yhteyden",
    commonText: "Ympäristömuutos U vaikuttaa proksiin P ja kenttäsyötteeseen E. Tässä reitissä E vaikuttaa biologisen tilan B kautta lopputulokseen Y; yhteys P:hen ei kulje P:n oman vaikutuksen kautta.",
    mediationTitle: "Kokonaisvaikutus sisältää välivaiheen",
    mediationText: "M on välivaihe. Kokonaisderivaatta sisältää suoran vaikutuksen ja M:n kautta välittyvän osan. M:n pitäminen vakiona poistaa jälkimmäisen osan vertailusta.",
    interactionTitle: "Kemikaalin vaste riippuu kenttäolosuhteesta",
    interactionText: "C on kemiallinen altistus. Yhteisvaikutuksessa γ ≠ 0 kemikaalin vaste kiinteällä E:n arvolla on β_C + γE. Kertoimen γ etumerkki kuuluu nimettyyn kemikaaliin, kudokseen ja protokollaan; sitä ei oleteta samaksi kaikissa yhdistelmissä.",
    observationTitle: "Kirjaaminen on erillinen vaihe",
    observationText: "R kuvaa havaitsemista ja kirjaamista. Kirjattu lopputulos riippuu biologisesta lopputuloksesta Y sekä havaintoprosessista, jotka erotetaan trendiä tulkittaessa.",
    identification: "Kaavat kuvaavat nimetyn kausaalimallin vaikutuksia. Havaintoaineiston regressiokertoimien tulkitseminen näiksi vaikutuksiksi edellyttää lisäksi tunnistamisehtoja.",
    standardTitle: "Sama arviointiperuste kaikille selityksille",
    standardText: "Arvioi kaikkia selityksiä kokoamalla komponenttitutkimusten, interventioiden ja perusteltujen kausaalisten liitosten myönteinen näyttö. Proksin regressiokerroin ei yksin ole mekanismiselitys, eikä eri tutkimuksista koottu ketju menetä näyttöarvoaan koostamisen vuoksi; tunnistamisen avoimet kohdat raportoidaan erikseen.",
  },
};

type Props = { locale: string };

export function ProxyPremises({ locale }: Props) {
  const c = pickCopy(COPY, locale);
  return (
    <aside aria-labelledby="proxy-premises-title" className="min-w-0 space-y-5 border-l-2 border-accent bg-figure-bg p-5 sm:p-6">
      <h3 id="proxy-premises-title" className="font-serif text-2xl">{c.premisesTitle}</h3>
      <p className="max-w-[72ch] text-base leading-relaxed">{c.intro}</p>
      <ol className="space-y-4">
        {c.premises.map((premise, index) => (
          <li key={premise.title} className="flex gap-3">
            <span className="shrink-0 pt-0.5 font-mono text-xs font-semibold text-accent">P{index + 1}</span>
            <div className="min-w-0 space-y-1">
              <h4 className="text-sm font-semibold">{premise.title}</h4>
              <p className="max-w-[72ch] text-sm leading-relaxed text-foreground-muted">{premise.text}</p>
            </div>
          </li>
        ))}
      </ol>
      <p className="max-w-[72ch] border-t border-card-border pt-4 text-sm leading-relaxed text-foreground-muted">{c.boundary}</p>
    </aside>
  );
}

export function ProxyDeductions({ locale }: Props) {
  const c = pickCopy(COPY, locale);
  const derivations = [
    { title: c.commonTitle, text: c.commonText, tex: String.raw`P\leftarrow U\rightarrow E\rightarrow B\rightarrow Y` },
    { title: c.mediationTitle, text: c.mediationText, tex: String.raw`\frac{dY}{dE}=\frac{\partial Y}{\partial E}+\frac{\partial Y}{\partial M}\frac{dM}{dE}` },
    { title: c.interactionTitle, text: c.interactionText, tex: String.raw`\begin{aligned}Y&=\beta_C C+\beta_E E+\gamma CE,\quad\gamma\ne0\\\left.\frac{\partial Y}{\partial C}\right|_E&=\beta_C+\gamma E\end{aligned}` },
    { title: c.observationTitle, text: c.observationText, tex: String.raw`Y_{\mathrm{obs}}=h(Y,R)` },
  ];
  return (
    <div className="min-w-0 space-y-6">
      <h3 className="font-serif text-2xl">{c.deductionsTitle}</h3>
      <ol className="grid gap-4 sm:grid-cols-2">
        {c.deductions.map((deduction, index) => (
          <li key={deduction.title} className="min-w-0 space-y-3 rounded-lg border border-card-border p-5">
            <span className="font-mono text-xs text-accent" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
            <h4 className="text-base font-semibold leading-snug">{deduction.title}</h4>
            <p className="text-sm leading-relaxed text-foreground-muted">{deduction.text}</p>
          </li>
        ))}
      </ol>
      <details className="min-w-0 rounded-lg border border-card-border bg-figure-bg p-5 sm:p-6">
        <summary className="cursor-pointer text-sm font-semibold marker:text-accent">{c.mathTitle}</summary>
        <div className="mt-6 min-w-0 space-y-7">
          {derivations.map((derivation) => (
            <div key={derivation.title} className="min-w-0 space-y-3">
              <h4 className="text-sm font-semibold">{derivation.title}</h4>
              <p className="max-w-[72ch] text-sm leading-relaxed text-foreground-muted">{derivation.text}</p>
              <MathBlock tex={derivation.tex} />
            </div>
          ))}
          <p className="max-w-[72ch] border-t border-card-border pt-4 text-sm leading-relaxed text-foreground-muted">{c.identification}</p>
        </div>
      </details>
      <aside className="space-y-2 border-l-2 border-accent/50 py-1 pl-5">
        <h4 className="text-sm font-semibold">{c.standardTitle}</h4>
        <p className="max-w-[72ch] text-sm leading-relaxed text-foreground-muted">{c.standardText}</p>
      </aside>
    </div>
  );
}
