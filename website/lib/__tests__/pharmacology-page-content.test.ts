import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { renderToStaticMarkup } from "react-dom/server";
import ts from "typescript";
import { describe, expect, it } from "vitest";
import { DrugDiseaseCrossMap } from "@/components/DrugDiseaseCrossMap";
import { INTERVENTIONS } from "@/lib/interventions";

type Copy = string | number | boolean | Copy[] | { [key: string]: Copy };
const locales = ["en", "fi", "ja", "fr", "ko"] as const;
const source = (route: string) => readFileSync(resolve(process.cwd(), `app/[locale]/${route}/page.tsx`), "utf8");
function value(expression: ts.Expression): Copy {
  if (ts.isAsExpression(expression) || ts.isSatisfiesExpression(expression)) return value(expression.expression);
  if (ts.isStringLiteral(expression) || ts.isNoSubstitutionTemplateLiteral(expression)) return expression.text;
  if (ts.isNumericLiteral(expression)) return Number(expression.text);
  if (expression.kind === ts.SyntaxKind.TrueKeyword) return true;
  if (expression.kind === ts.SyntaxKind.FalseKeyword) return false;
  if (ts.isArrayLiteralExpression(expression)) return expression.elements.map(value);
  if (ts.isObjectLiteralExpression(expression)) return Object.fromEntries(expression.properties.flatMap((entry) => {
    if (!ts.isPropertyAssignment(entry) || !(ts.isIdentifier(entry.name) || ts.isStringLiteral(entry.name))) return [];
    return [[entry.name.text, value(entry.initializer)]];
  }));
  return ""; // Never evaluate unrelated application expressions.
}
function copy(route: string): Record<string, Copy> {
  const ast = ts.createSourceFile("page.tsx", source(route), ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
  for (const statement of ast.statements) if (ts.isVariableStatement(statement)) {
    const declaration = statement.declarationList.declarations.find((entry) => ts.isIdentifier(entry.name) && ["COPY", "t"].includes(entry.name.text));
    if (declaration?.initializer) return value(declaration.initializer) as Record<string, Copy>;
  }
  throw new Error(`No authored copy in ${route}`);
}
function field(object: Copy, key: string): Copy {
  if (!object || typeof object !== "object" || Array.isArray(object) || !(key in object)) throw new Error(`Missing ${key}`);
  return object[key];
}
function item(object: Copy, id: string): Record<string, Copy> {
  if (object && typeof object === "object") {
    if (!Array.isArray(object) && object.id === id) return object;
    for (const child of Object.values(object)) {
      try { return item(child, id); } catch { /* Continue in the next authored branch. */ }
    }
  }
  throw new Error(`Missing item ${id}`);
}
const pharmacology = copy("evidence/pharmacology");
const predictions = copy("predictions");
const epidemiology = copy("evidence/epidemiology");
const circadian = copy("evidence/circadian");
const model = copy("model");
const infants = copy("evidence/infant-vulnerability");

describe("pharmacology source identities", () => {
  const bibliography = JSON.parse(readFileSync(resolve(process.cwd(), "public/data/references_full.json"), "utf8")) as { references: { id: string; doi: string; authors: string; pmcid?: string; aliases?: string[]; finding?: string; tags?: string[] }[] };
  const ref = (id: string) => bibliography.references.find((entry) => entry.id === id);
  it("repairs Selway while preserving the old link and distinct Liu study", () => {
    expect(ref("bhatt2012_glp1")).toMatchObject({ doi: "10.1371/journal.pone.0033004", pmcid: "PMC3296766" });
    expect(ref("bhatt2012_glp1")?.authors).toMatch(/^Selway /);
    expect(ref("bhatt2012_glp1")?.aliases).toContain("selway2012_glp1");
    expect(ref("liu2014_mt2")?.doi).toBe("10.1111/jcmm.12250");
    expect(ref("liu2014")?.doi).toBe("10.1073/pnas.1209249111");
    expect(source("evidence/pharmacology") + source("predictions")).not.toContain("PMC3556522");
  });
  it("retains the distinct store experiments and correct photoreversal paper", () => {
    expect(ref("bertagna2022_serca")?.doi).toBe("10.14814/phy2.15189");
    expect(ref("bertagna2025")?.doi).toBe("10.1111/nyas.15386");
    expect(ref("sanguinetti1984_photoreversal")?.doi.toLowerCase()).toBe("10.1016/s0006-3495(84)84233-2");
    for (const profile of INTERVENTIONS.profiles) for (const id of profile.referenceIds) expect(ref(id), id).toBeDefined();
  });
  it("records Bektas by modulation instead of assigning a carrier technology", () => {
    expect(ref("bektas2026")?.finding).toContain("GSM-modulated 3.5 GHz");
    expect(ref("bektas2026")?.tags).not.toContain("5g");
    expect(ref("bektas2026")?.tags).not.toContain("reversibility");
  });
});

describe.each(locales)("%s pharmacology meaning", (locale) => {
  it("separates L-channel microdomains from semaglutide field efficacy", () => {
    const card = item(pharmacology[locale], "SEMAGLUTIDE");
    for (const marker of ["Selway 2012", "BAPTA", "EGTA", "ERK"]) expect(card.mechanism).toContain(marker);
    expect(String(card.mechanism)).not.toMatch(/Bhatt|downstream of the channel|kanavan alapuolelta/);
    const prediction = item(predictions[locale], "METAB-3");
    for (const marker of ["Selway 2012", "BAPTA/EGTA", "GLP-1"]) expect(prediction.description).toContain(marker);
  });
  it("retains the MT2 study and tissue-specific milk interpretation", () => {
    const card = item(pharmacology[locale], "MELATONIN");
    for (const marker of ["liu2014_mt2", "MT2", "Ca²⁺"]) expect(card.mechanism).toContain(marker);
    const milk = item(infants[locale], "BREAST_MILK_MELATONIN");
    expect(milk.mechanism).toContain("liu2014_mt2");
    expect(milk.drugSub).not.toMatch(/Ca²⁺.*(?:antagon|拮抗|길항)/);
  });
  it("keeps the GSM/NR distinction visible across the Bektas summaries", () => {
    const card = item(pharmacology[locale], "COENZYME-Q10");
    const records = [card.evidence, field(model[locale], "fiveGReproNote"), item(epidemiology[locale], "5g-testis-ros").paragraphs, item(circadian[locale], "recovery").paragraphs];
    for (const record of records) for (const marker of ["GSM", "5G NR", "bektas2026"]) expect(JSON.stringify(record)).toContain(marker);
    expect(JSON.stringify(item(epidemiology[locale], "5g-testis-ros").paragraphs)).toContain("haidar2025_5g_skin_null");
  });
  it("shows production minus clearance and the four-arm contrast", () => {
    expect(item(pharmacology[locale], "COENZYME-Q10").mechanism).toContain("D_next = max(0, D + g_D·u·s − r_D·A·D)");
    const prediction = item(predictions[locale], "PHARM-5");
    expect(prediction.description).toContain("(Y_field+drug − Y_sham+drug) − (Y_field − Y_sham)");
    expect(prediction.description).toContain("GSM");
    expect(JSON.stringify(item(circadian[locale], "recovery"))).not.toContain("net_daily");
    expect(JSON.stringify(item(circadian[locale], "recovery"))).not.toMatch(/20[.,]6.*90[.,]1/);
  });
  it("keeps CRY abundance, clock output and ligand occupancy distinct", () => {
    const mechanism = String(item(pharmacology[locale], "LITHIUM").mechanism);
    const dimensions = {
      en: ["occupancy", "period", "amplitude"],
      fi: ["sitoutumisen", "jakson", "amplitudin"],
      ja: ["占有率", "周期", "振幅"],
      fr: ["occupation", "période", "amplitude"],
      ko: ["점유", "주기", "진폭"],
    };
    for (const marker of ["hirota2012_kl001", "CRY", "KL001", ...dimensions[locale]]) expect(mechanism).toContain(marker);
    expect(mechanism).not.toMatch(/CRY accumulates → stronger|CRY akkumuloituu → vahvempi|CRY蓄積 → より強い|accumulation CRY → horloge|CRY 축적 → 더 강한/);
  });
  it("uses calcium blockade to test mediation without assigning the first sensor", () => {
    const card = item(pharmacology[locale], "CCB");
    expect(card.mechanism).toContain("sham");
    expect(card.interpretation).toContain("bertagna2025");
    expect(JSON.stringify(card.evidence)).toContain("pall2013_v2");
    const sensor = { en: "first field sensor", fi: "ensimmäistä kenttäanturia", ja: "最初の場センサー", fr: "premier capteur", ko: "최초 장 센서" };
    expect(card.interpretation).toContain(sensor[locale]);
    expect(JSON.stringify(card)).not.toMatch(/264[, ]?000|most replicated|most direct pharmacological test|主要トランスダクションノード|noeud de transduction primaire|주요 전달 노드/);
  });
  it("separates clinical results from identifying the physical coupling", () => {
    const conclusion = String(field(pharmacology[locale], "convergenceConclusion"));
    for (const marker of ["L3/L4", "L2"]) expect(conclusion).toContain(marker);
    expect(item(pharmacology[locale], "ISRADIPINE").interpretation).toContain("STEADY-PD III");
  });
});

describe("shared intervention profile links", () => {
  it.each(locales)("%s opens every profile without requiring hover", (locale) => {
    const html = renderToStaticMarkup(DrugDiseaseCrossMap({ locale }));
    for (const profile of INTERVENTIONS.profiles) expect(html).toContain(`/${locale}/evidence/pharmacology?profile=${profile.id}#intervention-explorer`);
    expect(html).not.toContain("MT1/MT2 → Ca²⁺↓");
  });
});
