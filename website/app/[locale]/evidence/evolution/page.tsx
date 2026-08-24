import type { Metadata } from "next";
import { Dna } from "lucide-react";
import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import {
  CHI_SCALES,
  NORTHERN_TRAITS,
  HISTORICAL_PHASES,
  POPULATION_PROFILES,
  EVOLUTION_PREDICTIONS,
} from "@/lib/evolutionData";
import {
  CHAIN_EPISTEMIC_COLORS,
  CHAIN_EPISTEMIC_LABELS_EN,
  CHAIN_EPISTEMIC_LABELS_FI,
} from "@/lib/epistemicConstants";
import type { EpistemicLevel } from "@/lib/types";

const COPY = {
  en: {
    title: "Evolutionary Origins: The Northern Package",
    subtitle: "How co-selection of blue eyes, lactose tolerance, and cattle husbandry created the population most sensitive to EMF — and why that population's fertility declined first",
    backLink: "← Back to Evidence",
    section1Title: "One Function, Five Scales",
    section1Intro: "The χ (chi) function appears at every biological scale from molecule to population. At each scale it encodes the same logic: a background variable must be non-zero for a perturbation to have effect. The function χ(B) = 0 when B = 0, and approaches 1 as B increases. This is the selection rule that BERM proposes as the unifying mechanism across all five scales.",
    section2Title: "The Northern Package",
    section2Intro: [
      "Three traits co-selected in Northern European populations between 10,000 and 6,000 years ago: blue eyes (OCA2), lactose tolerance (LCT), and cattle husbandry. The conventional explanation treats each as an independent adaptation — blue eyes for vitamin D synthesis, lactose tolerance for calcium absorption, cattle for food security.",
      "BERM proposes these three traits optimize a single molecular system: cryptochrome. Blue eyes maximize photon delivery to CRY1 in retinal blue cones (optical χ). Lactose tolerance ensures year-round riboflavin (B2) supply via dairy, providing the FAD chromophore that CRY requires (molecular χ). Cattle husbandry is the cultural adaptation that sustains B2 supply through Northern winters when foraging and solar synthesis fail.",
      "If correct, the Northern Package represents the strongest biological amplifier of EMF sensitivity in any human population — and explains why Northern Europe was both the first region to electrify and the first below replacement fertility.",
    ],
    section3Title: "Four Historical Phases",
    section3Intro: "The interaction between biological χ values (evolved) and environmental χ values (technological) creates a four-phase historical pattern that maps onto observed fertility transitions.",
    section4Title: "Population χ Profiles",
    section4Intro: "Each population has a characteristic χ profile determined by its biology (optical, molecular) and environment. The combination produces distinct fertility trajectories.",
    profileHeaders: {
      population: "Population",
      chiEnv: "χ_env",
      chiOptical: "χ_optical",
      chiMolecular: "χ_molecular",
      pathway: "Dominant pathway",
      tfr: "Observed TFR",
      status: "Status",
    },
    section5Title: "Testable Predictions",
    section5Intro: "Five predictions derived from the nested χ model. Each is designed to be falsifiable within its stated timeframe.",
    predictionHeaders: {
      test: "Test",
      falsification: "Falsification criterion",
      timeframe: "Timeframe",
    },
    traitHeaders: {
      trait: "Trait",
      gene: "Gene",
      mechanism: "Mechanism",
      cryLink: "CRY link",
    },
    scaleHeaders: {
      scale: "Scale",
      background: "Background (B)",
      perturbation: "Perturbation",
      expression: "χ expression",
      atZero: "At B = 0",
      atMax: "At B = max",
      verification: "Verification",
    },
    epistemicTitle: "Epistemic Status",
    epistemicText: "This page presents an L*-level synthesis. The individual observations are well-established: OCA2/LCT co-selection timing (E), CRY photocycle requirements (E), iris transmission differences (M|C), B2-FAD-CRY stability chain (E), population TFR differences (C). The synthesis — that these traits form a coherent amplifier of EMF sensitivity — is an L*-level testable hypothesis. The population χ values are rough estimates. The historical narrative is explanatory, not predictive. The CRY-mediated interpretation of co-selection should be presented as an extension of the vitamin D hypothesis, not a replacement.",
    levelLabel: "Evidence level",
  },
  fi: {
    title: "Evoluution alkuperät: Pohjoinen paketti",
    subtitle: "Miten sinisilmäisyyden, laktoosinsietokyvyn ja karjankasvatuksen koselektio loi EMF:lle herkimmän populaation — ja miksi sen hedelmällisyys laski ensimmäisenä",
    backLink: "← Takaisin evidenssiin",
    section1Title: "Yksi funktio, viisi skaalaa",
    section1Intro: "χ (khi) -funktio esiintyy jokaisella biologisella skaalalla molekyylistä populaatioon. Jokaisella skaalalla se koodaa saman logiikan: taustamuuttujan on oltava nollasta poikkeava, jotta häiriö voi vaikuttaa. Funktio χ(B) = 0 kun B = 0, ja lähestyy 1:tä B:n kasvaessa. Tämä on valintasääntö jonka BERM ehdottaa yhdistäväksi mekanismiksi kaikilla viidellä skaalalla.",
    section2Title: "Pohjoinen paketti",
    section2Intro: [
      "Kolme piirrettä koselektoitui Pohjois-Euroopan populaatioissa 10 000–6 000 vuotta sitten: siniset silmät (OCA2), laktoosinsietokyky (LCT) ja karjankasvatus. Perinteinen selitys käsittelee kutakin itsenäisenä adaptaationa — sinisiä silmiä D-vitamiinisynteesille, laktoosinsietokykyä kalsiumin imeytymiselle, karjaa ruokaturvalle.",
      "BERM ehdottaa, että nämä kolme piirrettä optimoivat yhden molekyläärisen järjestelmän: kryptokromin. Siniset silmät maksimoivat fotonien pääsyn CRY1:lle verkkokalvon sinisissä tapeissa (optinen χ). Laktoosinsietokyky varmistaa ympärivuotisen riboflaviinin (B2) saannin maitotuotteiden kautta, tarjoten FAD-kromoforin jota CRY vaatii (molekulaarinen χ). Karjankasvatus on kulttuurinen adaptaatio joka ylläpitää B2-saantia pohjoisen talvien läpi kun keräily ja auringon synteesi eivät riitä.",
      "Jos tämä pitää paikkansa, Pohjoinen paketti edustaa voimakkainta biologista EMF-herkkyyden vahvistinta missään ihmispopulaatiossa — ja selittää miksi Pohjois-Eurooppa sekä sähköistyi ensimmäisenä että laski ensimmäisenä alle uusiutumistason hedelmällisyyden.",
    ],
    section3Title: "Neljä historiallista vaihetta",
    section3Intro: "Biologisten χ-arvojen (kehittyneiden) ja ympäristön χ-arvojen (teknologisten) vuorovaikutus luo neljävaiheisen historiallisen kaavan joka heijastuu havaittuihin hedelmällisyyssiirtymiin.",
    section4Title: "Populaatioiden χ-profiilit",
    section4Intro: "Jokaisella populaatiolla on ominainen χ-profiili jonka määräävät sen biologia (optinen, molekulaarinen) ja ympäristö. Yhdistelmä tuottaa erilaiset hedelmällisyyskehityskulut.",
    profileHeaders: {
      population: "Populaatio",
      chiEnv: "χ_env",
      chiOptical: "χ_optinen",
      chiMolecular: "χ_molekulaarinen",
      pathway: "Hallitseva polku",
      tfr: "Havaittu TFR",
      status: "Tila",
    },
    section5Title: "Testattavat ennusteet",
    section5Intro: "Viisi ennustetta jotka on johdettu sisäkkäisestä χ-mallista. Jokainen on suunniteltu falsifioitavaksi ilmoitetulla aikavälillä.",
    predictionHeaders: {
      test: "Testi",
      falsification: "Falsifikaatiokriteeri",
      timeframe: "Aikaväli",
    },
    traitHeaders: {
      trait: "Piirre",
      gene: "Geeni",
      mechanism: "Mekanismi",
      cryLink: "CRY-yhteys",
    },
    scaleHeaders: {
      scale: "Skaala",
      background: "Tausta (B)",
      perturbation: "Häiriö",
      expression: "χ-lauseke",
      atZero: "Kun B = 0",
      atMax: "Kun B = maks",
      verification: "Verifiointi",
    },
    epistemicTitle: "Episteeminen tila",
    epistemicText: "Tämä sivu esittää L*-tason synteesin. Yksittäiset havainnot ovat vakiintuneita: OCA2/LCT-koselektio-ajoitus (E), CRY:n fotosyklivaatimukset (E), iiriksen transmissioerot (M|C), B2-FAD-CRY-stabiiliusketju (E), populaatioiden TFR-erot (C). Synteesi — että nämä piirteet muodostavat yhtenäisen EMF-herkkyyden vahvistimen — on L*-tason testattava hypoteesi. Populaatioiden χ-arvot ovat karkeita arvioita. Historiallinen narratiivi on selittävä, ei ennustava. CRY-välitteinen koselektiotulkinta tulisi esittää D-vitamiinihypoteesin laajennuksena, ei vaihtoehtona.",
    levelLabel: "Evidenssitaso",
  },
} as const;

function EpistemicBadge({ level, isFi }: { level: string; isFi: boolean }) {
  const color = CHAIN_EPISTEMIC_COLORS[level as EpistemicLevel] ?? "#6B7280";
  const labels = isFi ? CHAIN_EPISTEMIC_LABELS_FI : CHAIN_EPISTEMIC_LABELS_EN;
  const label = labels[level as EpistemicLevel] ?? level;
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold"
      style={{ backgroundColor: `${color}20`, color, border: `1px solid ${color}40` }}
    >
      {level} — {label}
    </span>
  );
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const d = locale === "fi" ? COPY.fi : COPY.en;
  return { title: `${d.title} – Extinction Field`, description: d.subtitle };
}

export default async function EvolutionPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const isFi = locale === "fi";
  const d = isFi ? COPY.fi : COPY.en;

  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <Link href={`/${locale}/evidence`} className="text-sm text-accent hover:underline mb-6 inline-block">
        {d.backLink}
      </Link>

      <PageHeader icon={Dna} title={d.title} subtitle={d.subtitle} />

      {/* Section 1: One Function, Five Scales */}
      <section className="mb-16">
        <h2 className="editorial-section-heading mb-6">{d.section1Title}</h2>
        <p className="text-[0.95rem] leading-relaxed text-foreground max-w-3xl mb-8">
          {d.section1Intro}
        </p>

        <div className="space-y-4">
          {CHI_SCALES.map((scale, i) => {
            const color = CHAIN_EPISTEMIC_COLORS[scale.level as EpistemicLevel] ?? "#6B7280";
            return (
              <article
                key={scale.id}
                className="rounded-lg border border-card-border bg-card-bg p-5"
              >
                <div className="flex items-start justify-between gap-4 mb-3">
                  <h3 className="text-lg font-semibold">
                    <span className="font-mono-num text-xs text-accent mr-2">{i + 1}</span>
                    {isFi ? scale.label_fi : scale.label_en}
                  </h3>
                  <EpistemicBadge level={scale.level} isFi={isFi} />
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <tbody>
                      <tr className="border-b border-card-border/40">
                        <td className="py-2 pr-3 font-semibold text-foreground-muted w-32">{d.scaleHeaders.background}</td>
                        <td className="py-2 text-foreground">{isFi ? scale.background_fi : scale.background_en}</td>
                      </tr>
                      <tr className="border-b border-card-border/40">
                        <td className="py-2 pr-3 font-semibold text-foreground-muted">{d.scaleHeaders.perturbation}</td>
                        <td className="py-2 text-foreground">{isFi ? scale.perturbation_fi : scale.perturbation_en}</td>
                      </tr>
                      <tr className="border-b border-card-border/40">
                        <td className="py-2 pr-3 font-semibold text-foreground-muted">{d.scaleHeaders.expression}</td>
                        <td className="py-2 text-foreground font-mono text-xs">{scale.chi_expression}</td>
                      </tr>
                      <tr className="border-b border-card-border/40">
                        <td className="py-2 pr-3 font-semibold text-foreground-muted">{d.scaleHeaders.atZero}</td>
                        <td className="py-2 text-foreground-muted">{isFi ? scale.at_zero_fi : scale.at_zero_en}</td>
                      </tr>
                      <tr className="border-b border-card-border/40">
                        <td className="py-2 pr-3 font-semibold text-foreground-muted">{d.scaleHeaders.atMax}</td>
                        <td className="py-2 text-foreground">{isFi ? scale.at_max_fi : scale.at_max_en}</td>
                      </tr>
                      <tr>
                        <td className="py-2 pr-3 font-semibold text-foreground-muted">{d.scaleHeaders.verification}</td>
                        <td className="py-2 text-foreground-muted text-xs">{scale.verification}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* Section 2: The Northern Package */}
      <section className="mb-16 border-t editorial-rule pt-6">
        <h2 className="editorial-section-heading mb-6">{d.section2Title}</h2>
        <div className="space-y-4 text-[0.95rem] leading-relaxed text-foreground max-w-3xl mb-8">
          {d.section2Intro.map((paragraph, i) => (
            <p key={i} className={i === 2 ? "font-semibold" : ""}>{paragraph}</p>
          ))}
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-card-border text-left text-xs text-foreground-muted uppercase tracking-wider">
                <th className="py-2 pr-3">{d.traitHeaders.trait}</th>
                <th className="py-2 pr-3">{d.traitHeaders.gene}</th>
                <th className="py-2 pr-3">{d.traitHeaders.mechanism}</th>
                <th className="py-2 pr-3">{d.traitHeaders.cryLink}</th>
                <th className="py-2 w-16">{d.levelLabel}</th>
              </tr>
            </thead>
            <tbody>
              {NORTHERN_TRAITS.map((trait) => {
                const color = CHAIN_EPISTEMIC_COLORS[trait.level as EpistemicLevel] ?? "#6B7280";
                return (
                  <tr key={trait.id} className="border-b border-card-border/40">
                    <td className="py-3 pr-3 font-medium text-foreground">{isFi ? trait.trait_fi : trait.trait_en}</td>
                    <td className="py-3 pr-3 text-foreground-muted font-mono text-xs">{trait.gene}</td>
                    <td className="py-3 pr-3 text-foreground-muted text-xs leading-relaxed">{isFi ? trait.mechanism_fi : trait.mechanism_en}</td>
                    <td className="py-3 pr-3 text-foreground-muted text-xs leading-relaxed">{isFi ? trait.cry_link_fi : trait.cry_link_en}</td>
                    <td className="py-3">
                      <span className="rounded-full px-1.5 py-0.5 text-xs font-semibold" style={{ backgroundColor: `${color}20`, color }}>
                        {trait.level}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      {/* Section 3: Four Historical Phases */}
      <section className="mb-16 border-t editorial-rule pt-6">
        <h2 className="editorial-section-heading mb-6">{d.section3Title}</h2>
        <p className="text-[0.95rem] leading-relaxed text-foreground max-w-3xl mb-8">
          {d.section3Intro}
        </p>

        <div className="space-y-4">
          {HISTORICAL_PHASES.map((phase, i) => (
            <article
              key={phase.id}
              className="rounded-lg border border-card-border bg-card-bg p-5"
            >
              <div className="flex items-start gap-4 mb-2">
                <span className="shrink-0 font-mono-num text-xs text-accent bg-accent/10 rounded-full px-2.5 py-1">
                  {phase.period}
                </span>
                <h3 className="text-base font-semibold text-foreground">
                  {isFi ? phase.title_fi : phase.title_en}
                </h3>
              </div>
              <p className="text-sm text-foreground-muted leading-relaxed">
                {isFi ? phase.description_fi : phase.description_en}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* Section 4: Population χ Profiles */}
      <section className="mb-16 border-t editorial-rule pt-6">
        <h2 className="editorial-section-heading mb-6">{d.section4Title}</h2>
        <p className="text-[0.95rem] leading-relaxed text-foreground max-w-3xl mb-8">
          {d.section4Intro}
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-card-border text-left text-xs text-foreground-muted uppercase tracking-wider">
                <th className="py-2 pr-3">{d.profileHeaders.population}</th>
                <th className="py-2 pr-3">{d.profileHeaders.chiEnv}</th>
                <th className="py-2 pr-3">{d.profileHeaders.chiOptical}</th>
                <th className="py-2 pr-3">{d.profileHeaders.chiMolecular}</th>
                <th className="py-2 pr-3">{d.profileHeaders.pathway}</th>
                <th className="py-2 pr-3">{d.profileHeaders.tfr}</th>
                <th className="py-2 pr-3">{d.profileHeaders.status}</th>
              </tr>
            </thead>
            <tbody>
              {POPULATION_PROFILES.map((p) => (
                <tr key={p.id} className="border-b border-card-border/40">
                  <td className="py-3 pr-3 font-medium text-foreground">{isFi ? p.label_fi : p.label_en}</td>
                  <td className="py-3 pr-3 font-mono text-xs text-foreground">{p.chi_env}</td>
                  <td className="py-3 pr-3 font-mono text-xs text-foreground">{p.chi_optical}</td>
                  <td className="py-3 pr-3 font-mono text-xs text-foreground">{p.chi_molecular}</td>
                  <td className="py-3 pr-3 text-foreground-muted text-xs">{p.dominant_pathway}</td>
                  <td className="py-3 pr-3 font-mono text-xs font-semibold text-foreground">{p.observed_tfr}</td>
                  <td className="py-3 pr-3 text-foreground-muted text-xs leading-relaxed">{isFi ? p.status_fi : p.status_en}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Section 5: Testable Predictions */}
      <section className="mb-16 border-t editorial-rule pt-6">
        <h2 className="editorial-section-heading mb-6">{d.section5Title}</h2>
        <p className="text-[0.95rem] leading-relaxed text-foreground max-w-3xl mb-8">
          {d.section5Intro}
        </p>

        <div className="space-y-6">
          {EVOLUTION_PREDICTIONS.map((pred) => (
            <article
              key={pred.id}
              className="rounded-lg border border-card-border bg-card-bg p-5"
            >
              <div className="flex items-start justify-between gap-3 mb-3">
                <h3 className="font-semibold text-sm">
                  <span className="font-mono-num text-xs text-accent mr-2">{pred.code}</span>
                  {isFi ? pred.title_fi : pred.title_en}
                </h3>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-xs text-foreground-muted">{pred.timeframe}</span>
                  <EpistemicBadge level={pred.level} isFi={isFi} />
                </div>
              </div>

              <div className="space-y-3">
                <div className="rounded border border-card-border/60 bg-background p-3">
                  <p className="text-xs font-semibold uppercase tracking-wider text-accent mb-1">
                    {d.predictionHeaders.test}
                  </p>
                  <p className="text-sm text-foreground-muted leading-relaxed">
                    {isFi ? pred.test_fi : pred.test_en}
                  </p>
                </div>

                <div className="rounded border border-status-partial/30 bg-status-partial/5 p-3">
                  <p className="text-xs font-semibold uppercase tracking-wider text-status-partial mb-1">
                    {d.predictionHeaders.falsification}
                  </p>
                  <p className="text-sm text-foreground-muted leading-relaxed">
                    {isFi ? pred.falsification_fi : pred.falsification_en}
                  </p>
                </div>
              </div>
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
