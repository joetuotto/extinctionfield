import { DKC_FRAMEWORK } from "@/lib/dkcFramework";

/**
 * Visible state of the DKC V1–V25 publication gate, read from the registry.
 *
 * The build-time validator (scripts/validate-registry.mjs, step 20) allows the
 * site to build while the DKC release is unauthorized only because this
 * component surfaces that state on the DKC route. Removing it re-arms the
 * build error.
 */
interface GatePoint {
  id: string;
  result: string;
  reason: string;
}

interface GateEvaluation {
  publicationAllowed?: boolean;
  protocolAudit?: { passed?: boolean };
  points?: GatePoint[];
}

/** The registry carries releaseEvaluation/releaseAuthorized only after an authorized export. */
type VerificationGate = typeof DKC_FRAMEWORK.verificationGate & {
  releaseEvaluation?: GateEvaluation;
  releaseAuthorized?: boolean;
};

export function DkcPublicationGate({ locale }: { locale: string }) {
  const fi = locale === "fi";
  const gate = DKC_FRAMEWORK.verificationGate as VerificationGate;
  const evaluation: GateEvaluation | undefined = gate.releaseEvaluation ?? gate.defaultEvaluation;
  const authorized = gate.releaseAuthorized === true;
  const points: GatePoint[] = evaluation?.points ?? [];
  const critical = points.filter((p: GatePoint) => gate.criticalPointIds.includes(p.id));
  const criticalPass = critical.filter((p: GatePoint) => p.result === "PASS").length;
  const protocolPassed = evaluation?.protocolAudit?.passed === true;

  const title = authorized
    ? fi ? "Julkaisuportti: release-authorized" : "Publication gate: release authorized"
    : fi ? "Julkaisuportti: ei release-authorized" : "Publication gate: release not authorized";

  const body = authorized
    ? fi
      ? "V1–V10 ja evidenssiprotokollan auditointi ovat läpi; tämä reitti on julkaisuvaltuutettu."
      : "V1–V10 and the evidence-protocol audit have passed; this route is release-authorized."
    : fi
      ? `Tämä reitti on ehdokasreitti, jota ei ole julkaisuvaltuutettu. Kriittisistä pisteistä V1–V10 on läpi ${criticalPass}/10 ja evidenssiprotokollan auditointi ${protocolPassed ? "on" : "ei ole"} läpi. F1–F9 ovat lukittuja ehdokasennusteita, eivät valtuutetun release-artefaktin tuloksia. Sivusto buildataan tämän tilan näkyessä; portti sulkeutuu vasta arviointinipun myötä.`
      : `This is a candidate route that is not release-authorized. ${criticalPass}/10 critical points V1–V10 pass and the evidence-protocol audit has ${protocolPassed ? "passed" : "not passed"}. F1–F9 are locked candidate forecasts, not results of an authorized release artifact. The site builds with this state shown; the gate closes only with an evaluation bundle.`;

  return (
    <section
      className={`mb-8 rounded-2xl border p-5 ${
        authorized ? "border-emerald-500/40 bg-emerald-500/5" : "border-red-500/40 bg-red-500/5"
      }`}
      data-dkc-release-authorized={authorized ? "true" : "false"}
    >
      <p className={`text-xs font-semibold uppercase tracking-[0.16em] ${authorized ? "text-emerald-600" : "text-red-600"}`}>
        {title}
      </p>
      <p className="mt-2 text-sm leading-relaxed text-foreground-muted max-w-3xl">{body}</p>
      {!authorized && critical.length > 0 ? (
        <ul className="mt-3 grid gap-1 text-xs font-mono text-foreground-muted sm:grid-cols-2">
          {critical.map((p: GatePoint) => (
            <li key={p.id}>
              <span className="text-foreground">{p.id}</span> {p.result} · {p.reason}
            </li>
          ))}
        </ul>
      ) : null}
      <p className="mt-3 text-[10px] text-foreground-muted/70">
        {fi ? "Sääntö" : "Rule"}: {gate.publicationRule}
      </p>
    </section>
  );
}
