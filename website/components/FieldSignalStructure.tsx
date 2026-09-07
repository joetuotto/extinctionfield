import { StudyCitation } from "@/components/StudyCitation";
import {
  WORDING_REGISTER,
  type LocalizedText,
} from "@/data/correction_registry";
import {
  FIELD_STRUCTURE_RESULTS,
  FINDING_STATUS_LABELS,
  FINDING_STATUS_MEANING,
  SIGNAL_CALCULATION_RESULTS,
  WINDOW_DEFINITION,
  WINDOW_SCORES,
  type FindingStatus,
  type SignalResult,
} from "@/data/signal_structure";

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
    statusLegend: "What each status means",
    fieldTitle: "From the metric premise to a receptor timescale",
    fieldIntro:
      "The premise fixes an algebraic structure. What reaches a receptor depends on the time average and the projection, and those are separate calculations. Each result below states both what it establishes and what it does not.",
    signalTitle: "What an idealised signal can carry",
    signalIntro:
      "These results are computed from the published radio standards. Several of them narrow the model: two constrain what may be inferred from a power spectrum, and one is a firm identifiability limit.",
    scoresTitle: "Window scores actually computed",
    scoresIntro:
      "The locked window, its normalisation and the score definition, stated so the numbers are reproducible.",
    colSignal: "Signal or condition",
    colScore: "Window score R",
    colReading: "Reading",
    windowLabel: "Window definition",
    weight: "Weight",
    normalisation: "Normalisation",
    scoreDef: "Score",
    registerTitle: "Wording register",
    registerIntro:
      "The standard this chain holds itself to. The left column is what the evidence does not support; the right is what it does. This is documentation, not a list of site corrections — a check on 2026-09-07 found none of the left-column claims on the site.",
    colSuperseded: "Not supported",
    colJustified: "Now justified",
    colFindings: "Findings",
    result: "Establishes",
    bound: "Does not establish",
  },
  fi: {
    statusLegend: "Mitä kukin asema tarkoittaa",
    fieldTitle: "Metriikkapremissistä vastaanottimen aikaskaalaan",
    fieldIntro:
      "Premissi kiinnittää algebrallisen rakenteen. Se mikä saapuu vastaanottimelle riippuu aikakeskiarvosta ja projektiosta, ja ne ovat erillisiä laskuja. Jokainen tulos kertoo sekä sen mitä se osoittaa että sen mitä se ei osoita.",
    signalTitle: "Mitä idealisoitu signaali voi kantaa",
    signalIntro:
      "Nämä tulokset lasketaan julkaistuista radiostandardeista. Useat niistä kapeuttavat mallia: kaksi rajaa sitä mitä tehospektristä voi päätellä, ja yksi on varma identifioitavuusraja.",
    scoresTitle: "Todella lasketut ikkunapisteet",
    scoresIntro:
      "Lukittu ikkuna, sen normalisointi ja pisteen määritelmä, esitettynä niin että luvut ovat toistettavissa.",
    colSignal: "Signaali tai ehto",
    colScore: "Ikkunapiste R",
    colReading: "Tulkinta",
    windowLabel: "Ikkunan määritelmä",
    weight: "Paino",
    normalisation: "Normalisointi",
    scoreDef: "Piste",
    registerTitle: "Sanamuotorekisteri",
    registerIntro:
      "Standardi jota tämä ketju soveltaa itseensä. Vasen sarake on se mitä evidenssi ei tue; oikea on se mitä se tukee. Tämä on dokumentaatiota, ei lista sivuston korjauksista — 7.9.2026 tarkistuksessa yhtään vasemman sarakkeen väitettä ei löytynyt sivustolta.",
    colSuperseded: "Ei tuettu",
    colJustified: "Nyt perusteltu",
    colFindings: "Löydökset",
    result: "Osoittaa",
    bound: "Ei osoita",
  },
};

function StatusPill({ status, lang }: { status: FindingStatus; lang: Lang }) {
  const color = STATUS_COLOR[status];
  return (
    <span
      className="rounded-full px-1.5 py-0.5 text-[10px] font-semibold whitespace-nowrap"
      style={{ backgroundColor: `${color}20`, color }}
    >
      {FINDING_STATUS_LABELS[status][lang]}
    </span>
  );
}

function ResultCard({ r, lang, t }: { r: SignalResult; lang: Lang; t: (typeof T)["en"] }) {
  return (
    <article className="min-w-0 rounded-xl border border-card-border bg-card-bg p-4">
      <div className="mb-2 flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <h4 className="min-w-0 text-sm font-semibold text-foreground">{r.title[lang]}</h4>
        <StatusPill status={r.status} lang={lang} />
        <span className="font-mono-num text-[10px] text-foreground-muted">{t.colFindings} {r.findings}</span>
      </div>
      <pre className="mb-3 overflow-x-auto rounded-lg bg-background-secondary p-3 text-[11px] leading-relaxed font-mono whitespace-pre">
        {r.quantitative}
      </pre>
      <p className="mb-2 text-xs leading-relaxed text-foreground-muted">
        <strong className="text-foreground">{t.result}:</strong> {r.result[lang]}
      </p>
      <p className="text-xs leading-relaxed text-foreground-muted">
        <strong className="text-foreground">{t.bound}:</strong> {r.bound[lang]}
      </p>
      {r.referenceIds?.length ? (
        <p className="mt-2 text-[10px] text-foreground-muted/70">
          {r.referenceIds.map((id, i) => (
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

const TH = "py-2 pr-3 text-left font-semibold";
const TD = "py-2 pr-3 align-top";

export function FieldSignalStructure({ locale }: { locale: string }) {
  const lang: Lang = locale === "fi" ? "fi" : "en";
  const t = T[lang];
  const statuses = Object.keys(FINDING_STATUS_LABELS) as FindingStatus[];

  return (
    <div className="space-y-10">
      <div>
        <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-accent">{t.statusLegend}</h4>
        <ul className="grid gap-2 md:grid-cols-2">
          {statuses.map((s) => (
            <li key={s} className="min-w-0 text-xs leading-relaxed text-foreground-muted">
              <StatusPill status={s} lang={lang} />{" "}
              {FINDING_STATUS_MEANING[s][lang]}
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h4 className="mb-1 text-sm font-semibold text-foreground">{t.fieldTitle}</h4>
        <p className="mb-4 max-w-3xl text-xs leading-relaxed text-foreground-muted">{t.fieldIntro}</p>
        <div className="grid gap-4 md:grid-cols-2">
          {FIELD_STRUCTURE_RESULTS.map((r) => (
            <ResultCard key={r.id} r={r} lang={lang} t={t} />
          ))}
        </div>
      </div>

      <div>
        <h4 className="mb-1 text-sm font-semibold text-foreground">{t.signalTitle}</h4>
        <p className="mb-4 max-w-3xl text-xs leading-relaxed text-foreground-muted">{t.signalIntro}</p>
        <div className="grid gap-4 md:grid-cols-2">
          {SIGNAL_CALCULATION_RESULTS.map((r) => (
            <ResultCard key={r.id} r={r} lang={lang} t={t} />
          ))}
        </div>
      </div>

      <div>
        <h4 className="mb-1 text-sm font-semibold text-foreground">{t.scoresTitle}</h4>
        <p className="mb-3 max-w-3xl text-xs leading-relaxed text-foreground-muted">{t.scoresIntro}</p>
        <div className="mb-4 overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-card-border text-foreground-muted">
                <th className={TH}>{t.colSignal}</th>
                <th className={TH}>{t.colScore}</th>
                <th className={TH}>{t.colReading}</th>
              </tr>
            </thead>
            <tbody>
              {WINDOW_SCORES.map((w) => (
                <tr key={w.score} className="border-b border-card-border/40">
                  <td className={`${TD} text-foreground`}>{w.signal[lang]}</td>
                  <td className={`${TD} font-mono-num text-foreground`}>{w.score}</td>
                  <td className={`${TD} text-foreground-muted`}>{w.reading[lang]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="rounded-xl border border-card-border bg-card-bg p-4">
          <h5 className="mb-2 text-xs font-semibold uppercase tracking-wider text-accent">{t.windowLabel}</h5>
          <dl className="space-y-1 text-[11px] leading-relaxed">
            <div>
              <dt className="inline font-semibold text-foreground">{t.weight}: </dt>
              <dd className="inline break-all font-mono text-foreground-muted">{WINDOW_DEFINITION.weight}</dd>
            </div>
            <div>
              <dt className="inline font-semibold text-foreground">{t.normalisation}: </dt>
              <dd className="inline text-foreground-muted">{WINDOW_DEFINITION.normalisation}</dd>
            </div>
            <div>
              <dt className="inline font-semibold text-foreground">{t.scoreDef}: </dt>
              <dd className="inline break-all font-mono text-foreground-muted">{WINDOW_DEFINITION.score}</dd>
            </div>
          </dl>
          <p className="mt-3 text-[11px] leading-relaxed text-foreground-muted">{WINDOW_DEFINITION.note[lang]}</p>
        </div>
      </div>

      <div>
        <h4 className="mb-1 text-sm font-semibold text-foreground">{t.registerTitle}</h4>
        <p className="mb-3 max-w-3xl text-xs leading-relaxed text-foreground-muted">{t.registerIntro}</p>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-card-border text-foreground-muted">
                <th className={TH}>{t.colSuperseded}</th>
                <th className={TH}>{t.colJustified}</th>
                <th className={TH}>{t.colFindings}</th>
              </tr>
            </thead>
            <tbody>
              {WORDING_REGISTER.map((w) => (
                <tr key={w.id} className="border-b border-card-border/40">
                  <td className={`${TD} text-foreground-muted line-through decoration-red-500/50`}>
                    {(w.superseded as LocalizedText)[lang]}
                  </td>
                  <td className={`${TD} text-foreground`}>{(w.justified as LocalizedText)[lang]}</td>
                  <td className={`${TD} font-mono-num text-foreground-muted`}>{w.findings}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
