import type { Metadata } from "next";
import { Apple } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import Link from "next/link";
import {
  EVIDENCE_CARDS,
  NUTRITIONAL_MODULATORS,
  EPISTEMIC_LEVELS,
} from "@/lib/eyeColorData";
import { CHAIN_EPISTEMIC_COLORS } from "@/lib/epistemicConstants";

const NUTRITION_CARD_IDS = [
  "hirano2017-fad-cry",
  "sherrard2025-cry2-trpc1",
  "bartoelke2025",
  "majewska2025",
  "lamia2009",
  "b2_fertility_consolidated",
];

const COPY = {
  en: {
    title: "Nutritional CRY Modulation",
    subtitle: "How B2, omega fatty acids, and fasting dynamics control cryptochrome function",
    backLink: "← Back to Evidence",
    section1Title: "The Nutritional Gate",
    section1: [
      "Cryptochrome cannot function without its chromophore. The protein is an antenna, but FAD — a derivative of vitamin B2 (riboflavin) — is the molecule that actually absorbs blue light and initiates the radical pair. Without FAD, cryptochrome exists as a hollow shell: present but magnetically blind.",
      "This creates a simple but profound prediction: populations with vitamin B2 deficiency should show impaired cryptochrome-dependent functions, including circadian rhythm stability, melatonin production, and (if BERM is correct) magnetoreception-mediated reproductive timing.",
      "The evidence for this nutritional gate comes from multiple independent lines of research. Hirano et al. (2017) showed that FAD directly stabilizes CRY proteins in mouse liver. The Sherrard laboratory (Yap et al. 2025) demonstrated that depleting cellular FAD eliminates magnetic field directional selectivity entirely. Lamia et al. (2009) revealed that the fasting sensor AMPK actively degrades CRY1, creating an apparent paradox. And Majewska et al. (2025) showed that CRY orientation on membranes — essential for directional sensing — depends on lipid composition.",
      "Together, these findings define three nutritional control points for pathway C: (1) B2/FAD availability for chromophore loading, (2) membrane lipid composition for CRY orientation, and (3) AMPK-mediated CRY turnover rate during fasting.",
    ],
    section2Title: "Key Evidence",
    section3Title: "Nutritional Modulators",
    section3Sub: "Four factors that control CRY function through distinct mechanisms.",
    section4Title: "The Fasting Paradox",
    section4: [
      "There is an apparent contradiction in the evidence. AMPK, the cell's nutrient sensor that activates during fasting, phosphorylates CRY1 and targets it for degradation (Lamia et al. 2009, Science). Yet the only study showing human magnetoreception used starved subjects (Chae 2019). If fasting destroys the very protein that senses magnetic fields, how can fasting enhance magnetoreception?",
      "The resolution lies in CRY quality versus quantity. Fasting does degrade old CRY molecules via the AMPK-Ser71-FBXL3 pathway. But fasting simultaneously increases the pool of oxidized flavoproteins via fatty acid beta-oxidation — meaning more FAD is available. When the cell synthesizes replacement CRY molecules, they are loaded with fresh FAD chromophore more efficiently. The net result: fewer CRY molecules, but each one is better equipped for magnetoreception.",
      "This predicts an inverted-U dose-response: short fasting (4-12h) improves CRY quality; extended fasting (>24h) depletes the protein pool below functional threshold. B2 supplementation should shift the peak rightward.",
      "The fasting paradox resolution is an L*-level hypothesis. The individual biochemical steps are each E-level established facts. The synthesis has not been directly tested.",
    ],
    section5Title: "The China B2 Case",
    section5: [
      "China presents a striking ecological correlation. The Chinese National Health Survey (CNHS 2015-2017) found >90% B2 inadequacy across the population. China simultaneously has the world's steepest TFR decline. While this is ecological correlation — not causal proof — the mechanism is clear: B2 → FAD → CRY stability → pathway C function.",
      "Wacker et al. (2000) found that B2-deficient mothers had 4.7× higher preeclampsia risk (OR 4.7, CI 1.8-12.2). IVF clinic data shows B2 supplementation improves embryo quality metrics. These are independent lines converging on the same biochemical bottleneck.",
      "If B2 supplementation in a high-deficiency population improved CRY-dependent circadian markers, it would be strong evidence for the nutritional modulation hypothesis. This is prediction NUT-2.",
    ],
    section6Title: "Predictions",
    section6Lead: "Three testable predictions derived from the nutritional CRY modulation hypothesis.",
    predictions: [
      {
        id: "NUT-1",
        title: "B2 supplementation improves circadian resilience to nighttime EMF",
        text: "RCT: B2 supplementation (25mg/day × 8 weeks) vs placebo in subjects with poor sleep quality and high nighttime EMF exposure. B2 group should show faster melatonin onset and better sleep efficiency because FAD-replete CRY is more resistant to EMF-induced disruption.",
        timeline: "Testable within 3-6 months (RCT, N=60)",
        falsification: "No difference in melatonin onset latency or sleep metrics between B2 and placebo groups",
      },
      {
        id: "NUT-2",
        title: "B2 deficiency × EMF interaction in 54-country regression",
        text: "Add population-level B2 adequacy as a control variable to the 54-country EMF-TFR regression model. Prediction: B2-deficient countries show STRONGER EMF-TFR association because CRY is more vulnerable when FAD-depleted. The interaction term (EMF × B2_deficiency) should be negative and significant.",
        timeline: "Testable immediately (existing data + B2 surveys from ~30 countries)",
        falsification: "No significant EMF × B2 interaction term, or interaction is positive",
      },
      {
        id: "NUT-3",
        title: "Fasting duration predicts magnetoreceptive sensitivity (inverted U)",
        text: "Replicate Chae 2019 food orientation paradigm with graded fasting durations (4h, 8h, 12h, 16h, 24h). Prediction: inverted-U dose-response with peak sensitivity at 8-16h. B2 supplementation (25mg) shifts peak rightward. Brown-eyed subjects show lower overall sensitivity but same curve shape.",
        timeline: "Testable within 2-4 months (behavioral, N=40 per duration)",
        falsification: "Monotonic increase (no decline at 24h), or no fasting effect, or B2 does not shift the peak",
      },
    ],
    epistemicTitle: "Epistemic Status",
    epistemicText: "This page presents a testable hypothesis (L*-level). The individual biochemical mechanisms are experimentally confirmed (E-level): FAD stabilizes CRY (Hirano 2017), FAD is required for magnetic sensitivity (Yap 2025), AMPK degrades CRY1 (Lamia 2009), CRY orientation depends on membrane composition (Majewska 2025). The synthesis — that nutritional status systematically modulates pathway C effectiveness at the population level — has not been directly tested. The China B2 correlation is ecological, not causal.",
    seeAlso: "See also",
    eyesLink: "Eye Color & Magnetoreception →",
    predictionsLink: "Locked Predictions (NUT-1, NUT-2, NUT-3) →",
    levelLabel: "Evidence level",
    bermRelevance: "BERM relevance",
    nutrientHeaders: {
      nutrient: "Nutrient",
      target: "Target in CRY chain",
      deficiency: "Deficiency effect",
      source: "Key source",
      level: "Level",
    },
    predictionHeaders: {
      timeline: "Timeline",
      falsification: "Falsification criterion",
    },
  },
  fi: {
    title: "Ravitsemuksellinen CRY-modulaatio",
    subtitle: "Miten B2, omega-rasvahapot ja paastodynamiikka kontrolloivat kryptokromin toimintaa",
    backLink: "← Takaisin evidenssiin",
    section1Title: "Ravitsemuksellinen portti",
    section1: [
      "Kryptokromi ei voi toimia ilman kromoforinsa. Proteiini on antenni, mutta FAD — B2-vitamiinin (riboflaviinin) johdannainen — on molekyyli joka varsinaisesti absorboi sinistä valoa ja käynnistää radikaaliparin. Ilman FAD:ia kryptokromi on ontto kuori: läsnä mutta magneettisesti sokea.",
      "Tämä luo yksinkertaisen mutta syvällisen ennusteen: populaatioilla joilla on B2-vitamiinipuutos tulisi olla heikentyneitä kryptokromiriippuvaisia toimintoja, mukaan lukien vuorokausirytmin stabiilisuus, melatoniinituotanto ja (jos BERM on oikeassa) magnetoreseptiovälitteinen lisääntymisajoitus.",
      "Evidenssi tästä ravitsemuksellisesta portista tulee useista itsenäisistä tutkimuslinjoista. Hirano ym. (2017) osoittivat, että FAD suoraan stabiloi CRY-proteiineja hiiren maksassa. Sherrard-laboratorio (Yap ym. 2025) osoitti, että solun FAD:n poistaminen eliminoi magneettikentän suuntaerottelukyvyn täysin. Lamia ym. (2009) paljastivat, että paastosensori AMPK aktiivisesti hajottaa CRY1:n, luoden ilmeisen paradoksin. Ja Majewska ym. (2025) osoittivat, että CRY:n orientaatio kalvoilla — välttämätön suuntakohtaiselle aistimukselle — riippuu lipidikoostumuksesta.",
      "Yhdessä nämä löydökset määrittelevät kolme ravitsemuksellista ohjauspistettä polku C:lle: (1) B2/FAD-saatavuus kromoforin lataamista varten, (2) kalvon lipidikoostumus CRY:n orientaatiota varten, ja (3) AMPK-välitteinen CRY:n turnover-nopeus paastossa.",
    ],
    section2Title: "Avainevidence",
    section3Title: "Ravitsemukselliset modulaattorit",
    section3Sub: "Neljä tekijää, jotka kontrolloivat CRY-toimintaa eri mekanismein.",
    section4Title: "Paastoparadoksi",
    section4: [
      "Evidenssissä on ilmeinen ristiriita. AMPK, solun ravintosensori, joka aktivoituu paastossa, fosforyloi CRY1:n ja kohdistaa sen hajotettavaksi (Lamia ym. 2009, Science). Kuitenkin ainoa ihmisen magnetoreseptiota osoittanut tutkimus käytti nälkiintyneitä koehenkilöitä (Chae 2019). Jos paasto tuhoaa juuri sen proteiinin, joka aistii magneettikenttiä, miten paasto voi tehostaa magnetoreseptiota?",
      "Ratkaisu piilee CRY:n laadussa verrattuna määrään. Paasto hajottaa vanhoja CRY-molekyylejä AMPK-Ser71-FBXL3-reitin kautta. Mutta paasto lisää samanaikaisesti hapettuneiden flavoproteiinien poolia rasvahappojen beta-oksidaation kautta — mikä tarkoittaa enemmän FAD:ia saatavilla. Kun solu syntetisoi korvaavia CRY-molekyylejä, ne ladataan tuoreella FAD-kromoforilla tehokkaammin. Nettotulos: vähemmän CRY-molekyylejä, mutta jokainen on paremmin varustettu magnetoreseptioon.",
      "Tämä ennustaa käänteisen U-annosvasteen: lyhyt paasto (4-12t) parantaa CRY:n laatua; pitkitetty paasto (>24t) ehdyttää proteiinipoolin alle toiminnallisen kynnyksen. B2-lisä siirtää huippua oikealle.",
      "Paastoparadoksin ratkaisu on L*-tason hypoteesi. Yksittäiset biokemialliset vaiheet ovat kukin E-tason vahvistettuja faktoja. Synteesi ei ole suoraan testattu.",
    ],
    section5Title: "Kiinan B2-tapaus",
    section5: [
      "Kiina tarjoaa hätkähdyttävän ekologisen korrelaation. Kiinan kansallinen terveystutkimus (CNHS 2015-2017) löysi >90 % B2-puutoksen väestössä. Kiinassa on samanaikaisesti maailman jyrkin TFR-lasku. Vaikka tämä on ekologinen korrelaatio — ei kausaalinen todiste — mekanismi on selvä: B2 → FAD → CRY-stabiilisuus → polku C:n toiminta.",
      "Wacker ym. (2000) havaitsivat, että B2-puutteisilla äideillä oli 4,7-kertainen pre-eklampsian riski (OR 4,7, CI 1,8-12,2). IVF-klinikoiden data osoittaa B2-lisän parantavan alkionlaatumittareita. Nämä ovat itsenäisiä evidenssilinjoja jotka konvergoivat samaan biokemialliseen pullonkaulaan.",
      "Jos B2-lisä korkean puutoksen populaatiossa parantaisi CRY-riippuvaisia sirkadiaanisia markkereita, se olisi vahvaa evidenssiä ravitsemuksellisen modulaation hypoteesille. Tämä on ennuste NUT-2.",
    ],
    section6Title: "Ennusteet",
    section6Lead: "Kolme testattavaa ennustetta jotka johdetaan ravitsemuksellisesta CRY-modulaatiohypoteesista.",
    predictions: [
      {
        id: "NUT-1",
        title: "B2-lisä parantaa sirkadiaanista resilienssiä yölliselle EMF-altistukselle",
        text: "RCT: B2-lisä (25mg/pv × 8 viikkoa) vs. lumevalmiste henkilöillä joilla huono unenlaatu ja korkea yöllinen EMF-altistus. B2-ryhmällä tulisi olla nopeampi melatoniinin alku ja parempi unen tehokkuus koska FAD-rikas CRY on vastustuskykyisempi EMF-häiriölle.",
        timeline: "Testattavissa 3-6 kuukaudessa (RCT, N=60)",
        falsification: "Ei eroa melatoniinin alkamisviiveessä tai unimittareissa B2- ja lumelääkeryhmien välillä",
      },
      {
        id: "NUT-2",
        title: "B2-puutos × EMF -interaktio 54 maan regressiossa",
        text: "Lisää väestötason B2-riittävyys kontrollimuuttujaksi 54 maan EMF-TFR-regressiomalliin. Ennuste: B2-puutteisissa maissa on VAHVEMPI EMF-TFR-assosiaatio koska CRY on haavoittuvampi FAD-köyhänä. Interaktiotermin (EMF × B2_puutos) tulisi olla negatiivinen ja merkitsevä.",
        timeline: "Testattavissa välittömästi (olemassa oleva data + B2-tutkimuksia ~30 maasta)",
        falsification: "Ei merkitsevää EMF × B2 -interaktiotermiä, tai interaktio on positiivinen",
      },
      {
        id: "NUT-3",
        title: "Paaston kesto ennustaa magnetoreseptiivistä herkkyyttä (käänteinen U)",
        text: "Toista Chae 2019 ruokaorientaatioasetelma asteittaisilla paastoajoilla (4t, 8t, 12t, 16t, 24t). Ennuste: käänteinen U-annosvaste huipulla 8-16t. B2-lisä (25mg) siirtää huippua oikealle. Ruskesilmäisillä koehenkilöillä matalampi kokonaisherkkys mutta sama käyrän muoto.",
        timeline: "Testattavissa 2-4 kuukaudessa (käyttäytymiskoe, N=40 per kesto)",
        falsification: "Monotoninen kasvu (ei laskua 24t kohdalla), tai ei paastovaikutusta, tai B2 ei siirrä huippua",
      },
    ],
    epistemicTitle: "Episteeminen tila",
    epistemicText: "Tämä sivu esittää testattavan hypoteesin (L*-taso). Yksittäiset biokemialliset mekanismit ovat kokeellisesti vahvistettuja (E-taso): FAD stabiloi CRY:tä (Hirano 2017), FAD vaaditaan magneettiseen herkkyyteen (Yap 2025), AMPK hajottaa CRY1:n (Lamia 2009), CRY:n orientaatio riippuu kalvokoostumuksesta (Majewska 2025). Synteesi — että ravitsemustila systemaattisesti moduloi polku C:n tehokkuutta väestötasolla — ei ole suoraan testattu. Kiinan B2-korrelaatio on ekologinen, ei kausaalinen.",
    seeAlso: "Katso myös",
    eyesLink: "Silmien väri ja magnetoreseptio →",
    predictionsLink: "Lukitut ennusteet (NUT-1, NUT-2, NUT-3) →",
    levelLabel: "Evidenssitaso",
    bermRelevance: "BERM-merkitys",
    nutrientHeaders: {
      nutrient: "Ravintoaine",
      target: "Kohde CRY-ketjussa",
      deficiency: "Puutosvaikutus",
      source: "Avainlähde",
      level: "Taso",
    },
    predictionHeaders: {
      timeline: "Aikataulu",
      falsification: "Falsifikaatiokriteeri",
    },
  },
} as const;

const NUTRIENT_CARDS = EVIDENCE_CARDS.filter((c) =>
  NUTRITION_CARD_IDS.includes(c.id)
);

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

export default async function NutritionPage({
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

      <PageHeader icon={Apple} title={d.title} subtitle={d.subtitle} />

      {/* Section 1: The Nutritional Gate */}
      <section className="mb-16">
        <h2 className="editorial-section-heading mb-6">{d.section1Title}</h2>
        <div className="space-y-4 text-[0.95rem] leading-relaxed text-foreground max-w-3xl">
          {d.section1.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>
      </section>

      {/* Section 2: Key Evidence */}
      <section className="mb-16 border-t editorial-rule pt-6">
        <h2 className="editorial-section-heading mb-6">{d.section2Title}</h2>
        <div className="space-y-6">
          {NUTRIENT_CARDS.map((card, i) => {
            const levelColor =
              CHAIN_EPISTEMIC_COLORS[
                card.level as keyof typeof CHAIN_EPISTEMIC_COLORS
              ] ?? "#6B7280";
            const levelInfo = EPISTEMIC_LEVELS[card.level];
            return (
              <article
                key={card.id}
                className="rounded-lg border border-card-border bg-card-bg p-5"
              >
                <div className="flex items-start gap-4">
                  <span className="text-sm font-mono text-foreground-muted mt-0.5 shrink-0">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-foreground">
                      {isFi ? card.title_fi : card.title_en}
                    </h3>
                    <p
                      className="text-xs font-medium mt-1 px-2 py-0.5 rounded-full inline-block"
                      style={{
                        color: levelColor,
                        backgroundColor: `${levelColor}15`,
                      }}
                    >
                      {card.level}
                      {levelInfo &&
                        ` — ${isFi ? levelInfo.label_fi : levelInfo.label_en}`}
                    </p>
                    <p className="text-sm text-foreground-muted mt-2">
                      {card.authors} ({card.year}).{" "}
                      {card.doi ? (
                        <a
                          href={`https://doi.org/${card.doi}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-accent hover:underline"
                        >
                          <em>{card.journal}</em>
                        </a>
                      ) : (
                        <em>{card.journal}</em>
                      )}
                      . DOI: {card.doi}
                    </p>
                    <p className="text-sm text-foreground-muted mt-1">
                      <span className="text-xs font-medium">
                        {d.levelLabel}: {card.level}
                      </span>
                    </p>
                    <p className="mt-3 text-sm text-foreground leading-relaxed">
                      {isFi ? card.finding_fi : card.finding_en}
                    </p>
                    {(card.berm_relevance_en || card.berm_relevance_fi) && (
                      <>
                        <p className="mt-2 text-xs font-semibold text-accent uppercase tracking-wider">
                          {d.bermRelevance}
                        </p>
                        <p className="text-sm text-foreground-muted leading-relaxed">
                          {isFi
                            ? card.berm_relevance_fi
                            : card.berm_relevance_en}
                        </p>
                      </>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* Section 3: Nutritional Modulators Table */}
      <section className="mb-16 border-t editorial-rule pt-6">
        <h2 className="editorial-section-heading mb-2">{d.section3Title}</h2>
        <p className="text-sm text-foreground-muted mb-6">{d.section3Sub}</p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-card-border">
                <th className="text-left p-3 font-semibold text-foreground">
                  {d.nutrientHeaders.nutrient}
                </th>
                <th className="text-left p-3 font-semibold text-foreground">
                  {d.nutrientHeaders.target}
                </th>
                <th className="text-left p-3 font-semibold text-foreground">
                  {d.nutrientHeaders.deficiency}
                </th>
                <th className="text-left p-3 font-semibold text-foreground">
                  {d.nutrientHeaders.source}
                </th>
              </tr>
            </thead>
            <tbody>
              {NUTRITIONAL_MODULATORS.map((mod) => (
                <tr
                  key={mod.nutrient}
                  className="border-b border-card-border/50"
                >
                  <td className="p-3 font-medium text-foreground whitespace-nowrap">
                    {mod.nutrient}
                  </td>
                  <td className="p-3 text-foreground-muted">{mod.target}</td>
                  <td className="p-3 text-foreground-muted">
                    {isFi
                      ? mod.deficiency_effect_fi
                      : mod.deficiency_effect_en}
                  </td>
                  <td className="p-3 text-foreground-muted whitespace-nowrap">
                    {mod.key_source}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Section 4: The Fasting Paradox */}
      <section className="mb-16 border-t editorial-rule pt-6">
        <h2 className="editorial-section-heading mb-6">{d.section4Title}</h2>
        <div className="space-y-4 text-[0.95rem] leading-relaxed text-foreground max-w-3xl">
          {d.section4.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>
      </section>

      {/* Section 5: China B2 Case */}
      <section className="mb-16 border-t editorial-rule pt-6">
        <h2 className="editorial-section-heading mb-6">{d.section5Title}</h2>
        <div className="space-y-4 text-[0.95rem] leading-relaxed text-foreground max-w-3xl">
          {d.section5.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>
      </section>

      {/* Section 6: Predictions */}
      <section className="mb-16 border-t editorial-rule pt-6">
        <h2 className="editorial-section-heading mb-2">{d.section6Title}</h2>
        <p className="text-sm text-foreground-muted mb-6 max-w-3xl">
          {d.section6Lead}
        </p>
        <div className="space-y-6">
          {d.predictions.map((pred) => (
            <article
              key={pred.id}
              className="rounded-lg border border-card-border bg-card-bg p-5"
            >
              <h3 className="font-semibold text-foreground">
                <span className="text-accent font-mono text-sm mr-2">
                  {pred.id}
                </span>
                {pred.title}
              </h3>
              <p className="text-xs font-medium mt-1 px-2 py-0.5 rounded-full inline-block text-amber-500 bg-amber-500/10">
                LOCKED — awaiting test
              </p>
              <p className="mt-3 text-sm text-foreground leading-relaxed">
                {pred.text}
              </p>
              <p className="mt-2 text-sm text-foreground-muted">
                <span className="font-semibold text-xs">
                  {d.predictionHeaders.timeline}:
                </span>{" "}
                {pred.timeline}
              </p>
              <p className="mt-1 text-sm text-foreground-muted">
                <span className="font-semibold text-xs">
                  {d.predictionHeaders.falsification}:
                </span>{" "}
                {pred.falsification}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* Epistemic Status */}
      <div className="text-sm text-foreground-muted border-t editorial-rule pt-6 mb-16 max-w-3xl">
        <h2 className="font-semibold text-foreground mb-2">
          {d.epistemicTitle}
        </h2>
        <p className="leading-relaxed">{d.epistemicText}</p>
      </div>

      {/* See Also */}
      <div className="flex flex-col sm:flex-row gap-3">
        <Link
          href={`/${locale}/evidence/eyes`}
          className="rounded-lg border border-accent/20 bg-card-bg px-4 py-3 text-accent hover:underline font-semibold text-sm"
        >
          {d.eyesLink}
        </Link>
        <Link
          href={`/${locale}/predictions`}
          className="rounded-lg border border-accent/20 bg-card-bg px-4 py-3 text-accent hover:underline font-semibold text-sm"
        >
          {d.predictionsLink}
        </Link>
      </div>
    </div>
  );
}
