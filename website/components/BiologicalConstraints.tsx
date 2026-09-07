import { StudyCitation } from "@/components/StudyCitation";
import {
  CELL_MEMORY_FINDINGS,
  EXPOSURE_CLASSES,
  EXPOSURE_CLASS_NOTE,
  REPRODUCTIVE_FINDINGS,
  type BiologicalFinding,
} from "@/data/biological_constraints";
import { FINDING_STATUS_LABELS, type FindingStatus } from "@/data/signal_structure";
import {
  CHRONIC_MECHANISMS,
  CHRONIC_MECHANISM_NOTE,
  CONVERGENCE_ASSESSMENT,
  DECISION_RULE,
  INTERACTION_CONTRAST,
  MECHANISM_ROLES,
  MECHANISM_ROLE_NOTE,
  RAW_TRACE_REQUIREMENT,
  RECOVERABLE_DATA,
  RECOVERABLE_DATA_NOTE,
  THREE_VARIABLE_MODEL,
} from "@/data/research_program";

type Lang = "en" | "fi";

const STATUS_COLOR: Record<FindingStatus, string> = {
  calculated: "#0284C7",
  experimentally_bounded: "#10B981",
  observed_in_data: "#F59E0B",
  refined: "#8B5CF6",
  test_hypothesis: "#DB2777",
};

const T = {
  en: {
    memoryTitle: "Exposure history, repair capacity and the receiving state",
    memoryIntro:
      "These are bounded experimental observations, not general assumptions. Each names its exposure class and dose, because results from different classes do not combine into one effect.",
    reproTitle: "Functional reproductive endpoints",
    reproIntro:
      "None of these three is an EMF experiment showing a fertility effect. They establish that baseline semen parameters do not cover functional capacity, which is what an EMF claim would have to measure.",
    classTitle: "Exposure classes and transfer limits",
    classIntro:
      "What each evidence line actually bears on. The rows are kept apart deliberately.",
    colEvidence: "Evidence",
    colExposure: "Exposure or intervention",
    colTargets: "What it directly bears on",
    modelTitle: "Three variables instead of one damage term",
    interactionTitle: "Locating the exposure's share",
    rolesTitle: "Receiver, mediator, enabler",
    colRole: "Role",
    colChanges: "What changes",
    colTest: "Example test",
    chronicTitle: "Saturation, adaptation, sensitisation and selection",
    colMechanism: "Mechanism",
    colPrediction: "Separable prediction",
    recoverTitle: "What an existing archive could still settle",
    colDataset: "Dataset",
    colNeeded: "Information needed",
    colSettles: "What it would settle",
    ruleTitle: "Decision rule for independent validation",
    rawTitle: "Raw time-trace requirement",
    convTitle: "Overall assessment and the TFR bridge",
    convDirection: "Direction",
    convNot: "What this does not mean",
    convBridge: "The TFR bridge still requires",
    exposureLabel: "Exposure",
    locatesLabel: "Locates",
    limitLabel: "Transfer limit",
    variablesLabel: "Variables, each tied to a measurement",
    boundLabel: "Bound",
  },
  fi: {
    memoryTitle: "Altistushistoria, korjauskapasiteetti ja vastaanottava tila",
    memoryIntro:
      "Nämä ovat rajattuja kokeellisia havaintoja, eivät yleisiä oletuksia. Jokainen nimeää altistusluokkansa ja annoksensa, koska eri luokkien tulokset eivät yhdisty yhdeksi vaikutukseksi.",
    reproTitle: "Toiminnalliset lisääntymispäätepisteet",
    reproIntro:
      "Yksikään näistä kolmesta ei ole EMF-koe, joka osoittaisi hedelmällisyysvaikutuksen. Ne osoittavat, etteivät perustason siemennesteparametrit kata toiminnallista kapasiteettia — juuri sitä mitä EMF-väitteen pitäisi mitata.",
    classTitle: "Altistusluokat ja siirtorajat",
    classIntro: "Mihin kukin näyttölinja todella kohdistuu. Rivit pidetään tarkoituksella erillään.",
    colEvidence: "Näyttö",
    colExposure: "Altistus tai interventio",
    colTargets: "Mihin se suoraan kohdistuu",
    modelTitle: "Kolme muuttujaa yhden vauriotermin sijaan",
    interactionTitle: "Altisteen osuuden paikantaminen",
    rolesTitle: "Vastaanotin, välittäjä, mahdollistaja",
    colRole: "Rooli",
    colChanges: "Mikä muuttuu",
    colTest: "Esimerkkitesti",
    chronicTitle: "Kyllästyminen, adaptaatio, herkistyminen ja valikoituminen",
    colMechanism: "Mekanismi",
    colPrediction: "Erotettava ennuste",
    recoverTitle: "Mitä olemassa oleva arkisto voisi vielä ratkaista",
    colDataset: "Aineisto",
    colNeeded: "Tarvittava tieto",
    colSettles: "Mitä se ratkaisisi",
    ruleTitle: "Riippumattoman validoinnin päätössääntö",
    rawTitle: "Raaka-aikajäljen vaatimus",
    convTitle: "Kokonaisarvio ja TFR-silta",
    convDirection: "Suunta",
    convNot: "Mitä tämä ei tarkoita",
    convBridge: "TFR-silta vaatii edelleen",
    exposureLabel: "Altistus",
    locatesLabel: "Paikantaa",
    limitLabel: "Siirtoraja",
    variablesLabel: "Muuttujat, kukin sidottu mittaukseen",
    boundLabel: "Rajaus",
  },
};

const TH = "py-2 pr-3 text-left font-semibold";
const TD = "py-2 pr-3 align-top";

function FindingCard({ f, lang, t }: { f: BiologicalFinding; lang: Lang; t: (typeof T)["en"] }) {
  const color = STATUS_COLOR[f.status];
  return (
    <article className="min-w-0 rounded-xl border border-card-border bg-card-bg p-4">
      <div className="mb-2 flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <h4 className="min-w-0 text-sm font-semibold text-foreground">{f.title[lang]}</h4>
        <span
          className="rounded-full px-1.5 py-0.5 text-[10px] font-semibold whitespace-nowrap"
          style={{ backgroundColor: `${color}20`, color }}
        >
          {FINDING_STATUS_LABELS[f.status][lang]}
        </span>
        <span className="font-mono-num text-[10px] text-foreground-muted">{f.findings}</span>
      </div>
      <p className="mb-2 text-[11px] leading-relaxed text-foreground-muted">
        <strong className="text-foreground">{t.exposureLabel}:</strong> {f.exposure[lang]}
      </p>
      <p className="mb-2 text-xs leading-relaxed text-foreground-muted">
        <strong className="text-foreground">{t.locatesLabel}:</strong> {f.locates[lang]}
      </p>
      <p className="text-xs leading-relaxed text-foreground-muted">
        <strong className="text-foreground">{t.limitLabel}:</strong> {f.limit[lang]}
      </p>
      {f.referenceIds?.length ? (
        <p className="mt-2 text-[10px] text-foreground-muted/70">
          {f.referenceIds.map((id, i) => (
            <span key={id}>
              {i > 0 ? " · " : ""}
              <StudyCitation referenceId={id} locale={lang} />
            </span>
          ))}
        </p>
      ) : null}
    </article>
  );
}

export function BiologicalConstraints({ locale }: { locale: string }) {
  const lang: Lang = locale === "fi" ? "fi" : "en";
  const t = T[lang];

  return (
    <div className="space-y-10">
      <div>
        <h4 className="mb-1 text-sm font-semibold text-foreground">{t.memoryTitle}</h4>
        <p className="mb-4 max-w-3xl text-xs leading-relaxed text-foreground-muted">{t.memoryIntro}</p>
        <div className="grid gap-4 md:grid-cols-2">
          {CELL_MEMORY_FINDINGS.map((f) => (
            <FindingCard key={f.id} f={f} lang={lang} t={t} />
          ))}
        </div>
      </div>

      <div>
        <h4 className="mb-1 text-sm font-semibold text-foreground">{t.reproTitle}</h4>
        <p className="mb-4 max-w-3xl text-xs leading-relaxed text-foreground-muted">{t.reproIntro}</p>
        <div className="grid gap-4 md:grid-cols-2">
          {REPRODUCTIVE_FINDINGS.map((f) => (
            <FindingCard key={f.id} f={f} lang={lang} t={t} />
          ))}
        </div>
      </div>

      <div>
        <h4 className="mb-1 text-sm font-semibold text-foreground">{t.classTitle}</h4>
        <p className="mb-3 max-w-3xl text-xs leading-relaxed text-foreground-muted">{t.classIntro}</p>
        <div className="mb-3 overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-card-border text-foreground-muted">
                <th className={TH}>{t.colEvidence}</th>
                <th className={TH}>{t.colExposure}</th>
                <th className={TH}>{t.colTargets}</th>
              </tr>
            </thead>
            <tbody>
              {EXPOSURE_CLASSES.map((r) => (
                <tr key={r.evidence} className="border-b border-card-border/40">
                  <td className={`${TD} font-medium text-foreground`}>
                    {r.evidence}
                    {r.referenceIds?.length ? (
                      <span className="mt-1 block text-[10px] text-foreground-muted/70">
                        {r.referenceIds.map((id, i) => (
                          <span key={id}>
                            {i > 0 ? " · " : ""}
                            <StudyCitation referenceId={id} locale={lang} />
                          </span>
                        ))}
                      </span>
                    ) : null}
                  </td>
                  <td className={`${TD} text-foreground-muted`}>{r.exposure[lang]}</td>
                  <td className={`${TD} text-foreground-muted`}>{r.targets[lang]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="max-w-3xl text-[11px] italic leading-relaxed text-foreground-muted">{EXPOSURE_CLASS_NOTE[lang]}</p>
      </div>

      <div className="rounded-xl border border-card-border bg-card-bg p-4">
        <h4 className="mb-3 text-sm font-semibold text-foreground">{t.modelTitle}</h4>
        <pre className="mb-3 overflow-x-auto rounded-lg bg-background-secondary p-3 text-[11px] leading-relaxed font-mono whitespace-pre">
          {THREE_VARIABLE_MODEL.equations}
        </pre>
        <h5 className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-accent">{t.variablesLabel}</h5>
        <ul className="mb-3 space-y-1">
          {THREE_VARIABLE_MODEL.variables.map((v) => (
            <li key={v.symbol} className="text-xs text-foreground-muted">
              <span className="font-mono text-accent">{v.symbol}</span> — {v.name[lang]}{" "}
              <span className="text-foreground-muted/70">({v.measurement[lang]})</span>
            </li>
          ))}
        </ul>
        <p className="mb-2 max-w-3xl text-xs leading-relaxed text-foreground-muted">{THREE_VARIABLE_MODEL.rationale[lang]}</p>
        <p className="max-w-3xl text-xs leading-relaxed text-foreground-muted">
          <strong className="text-foreground">{t.boundLabel}:</strong> {THREE_VARIABLE_MODEL.bound[lang]}
        </p>
      </div>

      <div className="rounded-xl border border-card-border bg-card-bg p-4">
        <h4 className="mb-3 text-sm font-semibold text-foreground">{t.interactionTitle}</h4>
        <pre className="mb-3 overflow-x-auto rounded-lg bg-background-secondary p-3 text-[11px] font-mono whitespace-pre">
          {INTERACTION_CONTRAST.formula}
        </pre>
        <p className="mb-2 text-xs font-semibold text-foreground">{INTERACTION_CONTRAST.groups[lang]}</p>
        <p className="mb-2 max-w-3xl text-xs leading-relaxed text-foreground-muted">{INTERACTION_CONTRAST.rationale[lang]}</p>
        <p className="max-w-3xl text-xs leading-relaxed text-foreground-muted">
          <strong className="text-foreground">{t.boundLabel}:</strong> {INTERACTION_CONTRAST.bound[lang]}
        </p>
      </div>

      <div>
        <h4 className="mb-3 text-sm font-semibold text-foreground">{t.rolesTitle}</h4>
        <div className="mb-3 overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-card-border text-foreground-muted">
                <th className={TH}>{t.colRole}</th>
                <th className={TH}>{t.colChanges}</th>
                <th className={TH}>{t.colTest}</th>
              </tr>
            </thead>
            <tbody>
              {MECHANISM_ROLES.map((r) => (
                <tr key={r.role.en} className="border-b border-card-border/40">
                  <td className={`${TD} font-medium text-foreground`}>{r.role[lang]}</td>
                  <td className={`${TD} text-foreground-muted`}>{r.changes[lang]}</td>
                  <td className={`${TD} text-foreground-muted`}>{r.test[lang]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="max-w-3xl text-xs leading-relaxed text-foreground-muted">{MECHANISM_ROLE_NOTE[lang]}</p>
      </div>

      <div>
        <h4 className="mb-3 text-sm font-semibold text-foreground">{t.chronicTitle}</h4>
        <div className="mb-3 overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-card-border text-foreground-muted">
                <th className={TH}>{t.colMechanism}</th>
                <th className={TH}>{t.colPrediction}</th>
              </tr>
            </thead>
            <tbody>
              {CHRONIC_MECHANISMS.map((c) => (
                <tr key={c.mechanism.en} className="border-b border-card-border/40">
                  <td className={`${TD} font-medium text-foreground`}>{c.mechanism[lang]}</td>
                  <td className={`${TD} text-foreground-muted`}>{c.prediction[lang]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="max-w-3xl text-xs leading-relaxed text-foreground-muted">{CHRONIC_MECHANISM_NOTE[lang]}</p>
      </div>

      <div>
        <h4 className="mb-3 text-sm font-semibold text-foreground">{t.recoverTitle}</h4>
        <div className="mb-3 overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-card-border text-foreground-muted">
                <th className={TH}>{t.colDataset}</th>
                <th className={TH}>{t.colNeeded}</th>
                <th className={TH}>{t.colSettles}</th>
              </tr>
            </thead>
            <tbody>
              {RECOVERABLE_DATA.map((r) => (
                <tr key={r.dataset} className="border-b border-card-border/40">
                  <td className={`${TD} font-medium text-foreground`}>{r.dataset}</td>
                  <td className={`${TD} text-foreground-muted`}>{r.needed[lang]}</td>
                  <td className={`${TD} text-foreground-muted`}>{r.settles[lang]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="max-w-3xl text-[11px] italic leading-relaxed text-foreground-muted">{RECOVERABLE_DATA_NOTE[lang]}</p>
      </div>

      <div>
        <h4 className="mb-3 text-sm font-semibold text-foreground">{t.ruleTitle}</h4>
        <ol className="mb-4 space-y-2">
          {DECISION_RULE.map((r, i) => (
            <li key={i} className="border-l-2 border-accent/30 pl-4 text-xs leading-relaxed text-foreground-muted">
              <span className="mr-1 font-mono-num text-accent">{i + 1}.</span> {r[lang]}
            </li>
          ))}
        </ol>
        <div className="rounded-xl border border-card-border bg-card-bg p-4">
          <h5 className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-accent">{t.rawTitle}</h5>
          <p className="max-w-3xl text-xs leading-relaxed text-foreground-muted">{RAW_TRACE_REQUIREMENT[lang]}</p>
        </div>
      </div>

      <div>
        <h4 className="mb-3 text-sm font-semibold text-foreground">{t.convTitle}</h4>
        <p className="mb-4 max-w-3xl text-xs leading-relaxed text-foreground-muted">
          <strong className="text-foreground">{t.convDirection}:</strong> {CONVERGENCE_ASSESSMENT.direction[lang]}
        </p>
        <h5 className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-accent">{t.convNot}</h5>
        <ul className="mb-4 space-y-2">
          {CONVERGENCE_ASSESSMENT.notEstablished.map((n, i) => (
            <li key={i} className="border-l-2 border-red-500/30 pl-4 text-xs leading-relaxed text-foreground-muted">
              {n[lang]}
            </li>
          ))}
        </ul>
        <h5 className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-accent">{t.convBridge}</h5>
        <ol className="mb-3 space-y-1">
          {CONVERGENCE_ASSESSMENT.tfrBridge.map((b, i) => (
            <li key={i} className="text-xs text-foreground-muted">
              <span className="mr-1 font-mono-num text-accent">{i + 1}.</span> {b[lang]}
            </li>
          ))}
        </ol>
        <p className="max-w-3xl text-xs leading-relaxed text-foreground-muted">{CONVERGENCE_ASSESSMENT.tfrBridgeNote[lang]}</p>
      </div>
    </div>
  );
}
