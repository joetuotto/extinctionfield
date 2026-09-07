import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import ts from "typescript";
import { describe, expect, it } from "vitest";

const modelPageSource = readFileSync(resolve(process.cwd(), "app/[locale]/model/page.tsx"), "utf8");
const mathematicsPageSource = readFileSync(resolve(process.cwd(), "app/[locale]/mathematics/page.tsx"), "utf8");

function objectExpression(expression: ts.Expression): ts.ObjectLiteralExpression {
  while (ts.isAsExpression(expression) || ts.isSatisfiesExpression(expression)) expression = expression.expression;
  if (!ts.isObjectLiteralExpression(expression)) throw new Error("Expected authored copy object");
  return expression;
}

function copyObject(source: string, name: string): ts.ObjectLiteralExpression {
  const ast = ts.createSourceFile("page.tsx", source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
  for (const statement of ast.statements) {
    if (!ts.isVariableStatement(statement)) continue;
    const declaration = statement.declarationList.declarations.find((entry) => entry.name.getText(ast) === name);
    if (declaration?.initializer) return objectExpression(declaration.initializer);
  }
  throw new Error(`Missing copy object ${name}`);
}

function property(object: ts.ObjectLiteralExpression, key: string): ts.Expression {
  const entry = object.properties.find((candidate): candidate is ts.PropertyAssignment =>
    ts.isPropertyAssignment(candidate)
    && (ts.isIdentifier(candidate.name) || ts.isStringLiteral(candidate.name))
    && candidate.name.text === key,
  );
  if (!entry) throw new Error(`Missing authored copy key ${key}`);
  return entry.initializer;
}

function localeText(object: ts.ObjectLiteralExpression, locale: string, key: string): string {
  const value = property(objectExpression(property(object, locale)), key);
  if (!ts.isStringLiteral(value)) throw new Error(`Expected string at ${locale}.${key}`);
  return value.text;
}

const modelCopy = copyObject(modelPageSource, "t");
const mathematicalGates = copyObject(mathematicsPageSource, "CANONICAL_COPY");

// Require each authored locale to express the distinction: an English sentence
// elsewhere in the file must not satisfy a missing or incorrect translation.
const localeContracts = [
  {
    locale: "en", identity: /homogeneous/i, distinct: /separate|distinct/i,
    noShortcut: /does not[^.]*derive/i, dynamics: /dynamical|dynamics/i, current: /current/i,
    forbiddenShortcut: /source-free Maxwell equation[^.]*follows from|Maxwell[’']?s? equations follow from[^.]*Bianchi/i,
  },
  {
    locale: "fi", identity: /homogeen/i, distinct: /erilli/i,
    noShortcut: /ei[^.]*johda/i, dynamics: /dynaa|dynami/i, current: /virran/i,
    forbiddenShortcut: /Lähteetön Maxwell-yhtälö[^.]*seuraa|Maxwellin yhtälöt seuraavat[^.]*Bianch/i,
  },
  {
    locale: "ja", identity: /同次/, distinct: /別々|別の/,
    noShortcut: /導出されません|導かれません/, dynamics: /力学/, current: /電流/,
    forbiddenShortcut: /Maxwell方程式はBianchi恒等式から導かれ|無源Maxwell方程式[^。]*Lindgren計量から[^。]*導かれる/,
  },
  {
    locale: "fr", identity: /homogène/i, distinct: /distinct/i,
    noShortcut: /ne dérive pas/i, dynamics: /dynamique/i, current: /courant/i,
    forbiddenShortcut: /équation de Maxwell sans source[^.]*découle de la métrique|équations de Maxwell découlent des identités de Bianchi/i,
  },
  {
    locale: "ko", identity: /동차/, distinct: /별도/,
    noShortcut: /유도되지는 않습니다|도출되지 않습니다/, dynamics: /동역학/, current: /전류/,
    forbiddenShortcut: /Maxwell 방정식은 Bianchi 항등식으로부터 도출|무원천 Maxwell 방정식[^.]*Lindgren 메트릭에서[^.]*도출된다/,
  },
] as const;

describe("Lindgren page content contract", () => {
  it.each(localeContracts)("$locale separates the identity, variation, connection and dynamical gates", (contract) => {
    const explanation = localeText(modelCopy, contract.locale, "physBioMaxwellExplain");
    expect(explanation).toMatch(/F\s*=\s*dA/);
    expect(explanation).toMatch(/dF\s*=\s*0/);
    expect(explanation).toMatch(contract.identity);
    expect(explanation).toContain("EH");
    expect(explanation).toContain("Weyl");
    expect(explanation).toContain("GME");
    expect(explanation).toMatch(contract.distinct);
    expect(explanation).toMatch(contract.noShortcut);
    expect(explanation).toMatch(/∇_μF\^μν\s*=\s*0/);
    expect(explanation).toMatch(/∇_μF\^μν\s*=\s*J\^ν/);
    expect(explanation).toMatch(contract.dynamics);
    expect(explanation).toMatch(contract.current);
    expect(explanation).not.toMatch(contract.forbiddenShortcut);

    // Preserve the linked independent branches, including the restricted
    // diagnostic versus a full Euler–Lagrange result.
    expect(localeText(mathematicalGates, contract.locale, "variationBody")).toContain("Euler");
    expect(localeText(mathematicalGates, contract.locale, "weylBody")).toContain("Levi");
    const bianchi = localeText(mathematicalGates, contract.locale, "bianchiBody");
    expect(bianchi).toMatch(contract.identity);
    expect(bianchi).toContain("L1");
    expect(bianchi).toContain("∇·F = J");
    expect(bianchi).toMatch(contract.dynamics);
  });

  it("renders the separate gates without restoring a gravitational-Bianchi shortcut", () => {
    for (const key of ["variationBody", "weylBody", "bianchiBody"]) {
      expect(mathematicsPageSource).toContain(`{canonical.${key}}`);
    }
    expect(mathematicsPageSource).not.toMatch(
      /\\nabla[^"\n]*F[^"\n]*\\text\{follows from\}[^"\n]*\\nabla[^"\n]*G/,
    );
  });

  it.each(localeContracts)("$locale retains χ's compound reduction status", ({ locale }) => {
    expect(localeText(modelCopy, locale, "physBioChiEpistemic")).toMatch(/^\[L1 \+ L0\/L2 .+\]$/);
  });

  it("does not promote an applied χ coordinate to unconditional L1", () => {
    expect(modelPageSource).not.toMatch(/χ_geo\(q\).*always L1/);
    expect(modelPageSource).not.toMatch(/χ_geo\(q\).*aina L1/);
    expect(modelPageSource).not.toMatch(/χ_geo\(q\).*常にL1/);
    expect(modelPageSource).not.toMatch(/χ_geo\(q\).*항상 L1/);
  });
});
