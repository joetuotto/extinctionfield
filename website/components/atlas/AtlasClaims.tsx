import { atlasClaims } from "@/lib/atlasEvidence";
import { ClaimRef } from "@/components/ClaimRef";
import { StudyCitation } from "@/components/StudyCitation";
import { getChainEpistemicLabel } from "@/lib/epistemicConstants";

const COPY = {
  en: {
    title: "Claims and evidence", empty: "No claim binding has been curated for this channel yet.",
    scope: "Each study applies to the named claim and protocol. A component finding does not establish the whole connection.",
    limits: "Scope and study details", supports: "Within scope", excludes: "Outside scope", noEvidence: "No study relation is assigned to this claim. It may be a definition, a model assumption or an uncurated claim.",
    test: "What would challenge the claim", registryLanguage: "Detailed scope notes use the source registry's language.", assessment: "Claim evidence type", assessmentScope: "Assessment scope",
    relation: { supports: "Supports this component", challenges: "Challenges this claim", contextualizes: "Provides context", method: "Method" },
    calibration: { structural_only: "Component structure; no fitted field-to-outcome coefficient", context_only: "Context; no calibration", calibration: "Calibration input for the stated endpoint" },
    lifecycle: { draft: "Draft claim", reviewed: "Reviewed claim", active: "Active claim", deprecated: "Deprecated claim", superseded: "Superseded claim" },
  },
  fi: {
    title: "Väitteet ja näyttö", empty: "Tälle kanavalle ei ole vielä kuratoitu väiteliitosta.",
    scope: "Tutkimus koskee nimettyä väitettä ja koejärjestelyä. Komponenttilöydös ei osoita koko yhteyttä.",
    limits: "Rajaukset ja tutkimustiedot", supports: "Soveltamisala", excludes: "Rajauksen ulkopuolella", noEvidence: "Väitteeseen ei ole liitetty tutkimussuhdetta. Se voi olla määritelmä, mallioletus tai vielä kuratoimaton väite.",
    test: "Mikä haastaisi väitteen", registryLanguage: "Yksityiskohtaiset rajaukset ovat lähderekisterin kielellä.", assessment: "Väitteen näytön tyyppi", assessmentScope: "Arvion rajaus",
    relation: { supports: "Tukee tätä komponenttia", challenges: "Haastaa väitteen", contextualizes: "Taustoittaa", method: "Menetelmä" },
    calibration: { structural_only: "Komponenttirakenne; kenttä–päätepistekerrointa ei sovitettu", context_only: "Taustatieto; ei kalibrointia", calibration: "Kalibrointisyöte nimetylle päätepisteelle" },
    lifecycle: { draft: "Luonnosväite", reviewed: "Arvioitu väite", active: "Aktiivinen väite", deprecated: "Poistuva väite", superseded: "Korvattu väite" },
  },
};

const DIRECTNESS: Record<string, { fi: string; en: string }> = {
  direct_mechanism: { fi: "Suora mekanismikoe", en: "Direct mechanism experiment" },
  mechanistic_intermediate: { fi: "Mekanistinen välivaihe", en: "Mechanistic intermediate" },
  endpoint_measurement: { fi: "Päätepisteen mittaus", en: "Endpoint measurement" },
  ecological_endpoint: { fi: "Ekologinen päätepiste", en: "Ecological endpoint" },
  human_behavioural_intermediate: { fi: "Ihmisen käyttäytymisen välivaihe", en: "Human behavioural intermediate" },
  human_population_association: { fi: "Ihmisväestön assosiaatio", en: "Human population association" },
  human_reproductive_endpoint: { fi: "Ihmisen lisääntymisen päätepiste", en: "Human reproductive endpoint" },
  reproductive_endpoint: { fi: "Lisääntymisen päätepiste", en: "Reproductive endpoint" },
  physics_signature: { fi: "Fysikaalinen tunnusmerkki", en: "Physical signature" },
  population_descriptive: { fi: "Väestöä kuvaava havainto", en: "Descriptive population observation" },
  source_correction: { fi: "Tutkimusjulkaisun korjaus", en: "Publication correction" },
  systematic_review: { fi: "Systemaattinen katsaus", en: "Systematic review" },
  theoretical_premise: { fi: "Teoreettinen premissi", en: "Theoretical premise" },
};

export function AtlasClaims({ claimIds, locale, compact = false }: { claimIds: readonly string[]; locale: string; compact?: boolean }) {
  const lang = locale === "fi" ? "fi" : "en";
  const copy = COPY[lang];
  const entries = atlasClaims(claimIds);
  return <div className="space-y-3" data-testid="atlas-claims">
    {!compact && <h3 className="text-xs font-semibold text-[var(--atlas-text)]">{copy.title}</h3>}
    <p className="text-xs leading-relaxed text-[var(--atlas-text-dim)]">{entries.length ? copy.scope : copy.empty}</p>
    {entries.map(({ claim, evidence, assessment }) => <article key={claim.id} className="break-words rounded-lg border border-[var(--border)] p-3 text-xs">
      <ClaimRef claimId={claim.id}><span className="font-medium leading-relaxed text-[var(--atlas-text)]">{(claim.statement[lang] ?? claim.statement.en)?.text}</span></ClaimRef>
      <p className="mt-2 text-[var(--atlas-text-muted)]">{copy.lifecycle[claim.lifecycle]}</p>
      {assessment && <p className="mt-2 text-[var(--atlas-text-dim)]">{copy.assessment}: {assessment.level} · {getChainEpistemicLabel(assessment.level, lang)}</p>}
      <details className="mt-2">
        <summary className="min-h-11 cursor-pointer content-center text-blue-400">{copy.limits}</summary>
        <div className="space-y-3 leading-relaxed text-[var(--atlas-text-dim)]">
          {lang === "fi" && <p>{copy.registryLanguage}</p>}
          {assessment?.note && <div><p className="font-semibold">{copy.assessmentScope}</p><p lang="en">{assessment.note}</p></div>}
          {claim.scope.supports.length > 0 && <div><p className="font-semibold">{copy.supports}</p><ul className="ml-4 list-disc" lang="en">{claim.scope.supports.map(text => <li key={text}>{text}</li>)}</ul></div>}
          {claim.scope.does_not_support.length > 0 && <div><p className="font-semibold">{copy.excludes}</p><ul className="ml-4 list-disc" lang="en">{claim.scope.does_not_support.map(text => <li key={text}>{text}</li>)}</ul></div>}
          {claim.falsification_condition && <div><p className="font-semibold">{copy.test}</p><p lang="en">{claim.falsification_condition}</p></div>}
          {evidence.length === 0 && <p>{copy.noEvidence}</p>}
          {evidence.map(relation => <div key={relation.id} className="space-y-1 border-t border-[var(--border)] pt-3">
            <StudyCitation referenceId={relation.referenceId} locale={locale} />
            <p className="font-medium">{copy.relation[relation.relation]}</p>
            <p>{copy.calibration[relation.calibrationRole]}</p>
            <p>{DIRECTNESS[relation.directness]?.[lang] ?? relation.directness}</p>
            <p lang="en">{relation.applicability}</p>
            {relation.limitations.length > 0 && <ul className="ml-4 list-disc" lang="en">{relation.limitations.map(text => <li key={text}>{text}</li>)}</ul>}
          </div>)}
        </div>
      </details>
    </article>)}
  </div>;
}
