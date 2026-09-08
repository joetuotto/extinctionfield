import { describe, expect, it } from "vitest";
import {
  ABOUT_ROUTES,
  NAV_ROUTES,
  getActiveNavSection,
  getAboutRoutes,
  getHomeRoute,
  getNavRoutes,
  isNavPageCurrent,
} from "../navigation";
import baseline from "./fixtures/navigation-before-levels.json";
import currentMain from "./fixtures/navigation-main-2026-09-08.json";

const locales = ["en", "fi", "ja", "fr", "ko"] as const;
const destinations = NAV_ROUTES.flatMap((section) => [section.href, ...(section.children ?? []).map((child) => child.href)]);

describe("explanation-level navigation", () => {
  it("follows the seven-part reading order with home reachable through the logo", () => {
    expect(getNavRoutes("fi").map((section) => [section.href, section.label])).toEqual([
      ["/model", "Malli"],
      ["/physics", "Fysiikka"],
      ["/biology", "Biologia"],
      ["/behavior", "Käyttäytyminen"],
      ["/civilization", "Sivilisaatio"],
      ["/evidence/convergence", "Näyttö"],
      ["/about", "Tietoa"],
    ]);
    expect(getHomeRoute("fi")).toMatchObject({ href: "", label: "Etusivu" });
  });

  it("preserves every destination from the pre-migration header and dropdowns", () => {
    const reachable = new Set([getHomeRoute("en").href, ...destinations]);
    expect(baseline.hrefs).toHaveLength(38);
    expect(baseline.hrefs.filter((href) => !reachable.has(href))).toEqual([]);
  });

  it("also preserves every current-main destination when integrating the explanation-level branch", () => {
    const reachable = new Set([getHomeRoute("en").href, ...destinations]);
    expect(currentMain.hrefs).toHaveLength(40);
    expect(currentMain.hrefs.filter((href) => !reachable.has(href))).toEqual([]);
    expect(currentMain.hrefs.filter((href) => !baseline.hrefs.includes(href))).toEqual([
      "/civilization/epistapege", "/evidence/response-conditions",
    ]);
  });

  it("keeps main's updated descriptions and its new destinations in their corresponding sections", () => {
    const sections = getNavRoutes("fi");
    expect(sections.find((section) => section.href === "/physics")?.children?.find((child) => child.href === "/model/math")?.desc)
      .toBe("Lindgren-premissi, johdettu geometria, ehdollinen L2-vaste ja avoin kalibrointi");
    expect(sections.find((section) => section.href === "/civilization")?.children?.[0].desc)
      .toBe("Seitsemänvaiheinen lukupolku, mukaan lukien Epistapegen havaittavuushaara");
    expect(sections.find((section) => section.href === "/civilization")?.children?.find((child) => child.href === "/civilization/epistapege"))
      .toMatchObject({ label: "Epistapege", desc: "episteme + pege — kausaalisen havaittavuuden rakenteellinen menetys" });
    expect(sections.find((section) => section.href === "/evidence/convergence")?.children?.find((child) => child.href === "/evidence/response-conditions"))
      .toMatchObject({ label: "Vaste-ehdot", desc: "Vaihe, koherenssi, ajoitus, reseptoritila ja kanavavuorovaikutukset" });
  });

  it("preserves every About tab and adds epistemology without renaming its URL", () => {
    const tabs = ABOUT_ROUTES.map((tab) => tab.href);
    for (const href of ["/about", "/about/objections", "/about/replication", "/about/history", "/about/measurement", "/epistemology"]) {
      expect(tabs).toContain(href);
    }
    expect(getNavRoutes("fi").find((section) => section.href === "/about")?.children).toEqual(getAboutRoutes("fi"));
  });

  it("keeps each section overview as its first child and makes child destinations unique", () => {
    for (const section of NAV_ROUTES) {
      expect(section.children?.[0].href).toBe(section.href);
    }
    const childDestinations = NAV_ROUTES.flatMap((section) => (section.children ?? []).map((child) => child.href));
    expect(new Set(childDestinations).size).toBe(childDestinations.length);
  });

  it("has complete menu labels and descriptions in all five languages", () => {
    for (const locale of locales) {
      const all = getNavRoutes(locale).flatMap((section) => [section, ...(section.children ?? [])]);
      for (const route of all) {
        expect(route.label.trim(), `${locale}: ${route.href}`).not.toBe("");
        if (route.desc !== undefined) expect(route.desc.trim(), `${locale}: ${route.href}`).not.toBe("");
      }
      for (const route of NAV_ROUTES.flatMap((section) => [section, ...(section.children ?? [])])) {
        expect(route.labels[locale]).toBeTruthy();
        if (route.descs) expect(route.descs[locale]).toBeTruthy();
      }
    }
    expect(getNavRoutes("unknown")).toEqual(getNavRoutes("en"));
  });

  it("orders civilization essays from individuals and interactions toward institutions", () => {
    expect(NAV_ROUTES.find((section) => section.href === "/civilization")?.children?.map((child) => child.href)).toEqual([
      "/civilization", "/civilization/pathopege", "/civilization/pathopolites", "/civilization/epistapege", "/civilization/patokinesis",
      "/civilization/patopolis", "/civilization/patokratia", "/civilization/patopoliteia",
    ]);
  });
});

describe("single section ownership", () => {
  const cases = [
    ["/model", "/model"], ["/map", "/model"], ["/model/proxy-masking", "/model"],
    ["/physics", "/physics"], ["/model/math", "/physics"],
    ["/model/tensor-derivation", "/physics"], ["/model/frequency-weights", "/physics"],
    ["/biology", "/biology"], ["/model/biological-coordination", "/biology"],
    ["/model/q-factor", "/biology"], ["/model/dual-kernel", "/biology"],
    ["/modulome/brain", "/biology"], ["/sentinel", "/biology"],
    ["/behavior", "/behavior"], ["/civilization/pathopolites", "/civilization"],
    ["/civilization/epistapege", "/civilization"],
    ["/evidence", "/evidence/convergence"], ["/evidence/convergence", "/evidence/convergence"],
    ["/evidence/response-conditions", "/evidence/convergence"],
    ["/evidence/converging-patterns", "/evidence/convergence"],
    ["/evidence/testosterone", "/evidence/convergence"], ["/measurement/fieldstate/math", "/evidence/convergence"],
    ["/model/comparison", "/evidence/convergence"], ["/explore", "/evidence/convergence"],
    ["/data", "/evidence/convergence"], ["/predictions", "/evidence/convergence"],
    ["/articles/a-study", "/evidence/convergence"], ["/references/lamia2011", "/evidence/convergence"],
    ["/objections", "/evidence/convergence"], ["/epistemology", "/about"],
    ["/about/history", "/about"], ["/about/measurement", "/about"],
  ];

  it.each(cases)("assigns %s to %s in every locale, including trailing slashes", (path, owner) => {
    expect(getActiveNavSection(path)).toBe(owner);
    for (const locale of locales) {
      expect(getActiveNavSection(`/${locale}${path}`)).toBe(owner);
      expect(getActiveNavSection(`/${locale}${path}/`)).toBe(owner);
    }
  });

  it("does not let biological anchor shortcuts steal ownership of the model page", () => {
    for (const anchor of ["vgcc-gene-family", "camkii-convergence", "testosterone-threshold"]) {
      expect(getActiveNavSection(`/fi/model#${anchor}`)).toBe("/model");
      expect(isNavPageCurrent("/fi/model", `/model#${anchor}`)).toBe(false);
    }
    expect(getActiveNavSection("/fr/behavior#reasons")).toBe("/behavior");
    expect(getActiveNavSection("/ko/model/math?view=full#equation")).toBe("/physics");
  });

  it("does not match partial segment prefixes or assign home to an explanation level", () => {
    for (const path of ["/", "/fi", "/fi/", "/fr/modelish", "/en/evidences", "/ko/unknown"]) {
      expect(getActiveNavSection(path)).toBeNull();
    }
  });

  it("marks only the actual page link with aria-current", () => {
    expect(isNavPageCurrent("/fi/model/", "/model")).toBe(true);
    expect(isNavPageCurrent("/fi/model/math", "/model")).toBe(false);
    expect(isNavPageCurrent("/fi/evidence/convergence", "/evidence")).toBe(false);
    expect(isNavPageCurrent("/fi", "")).toBe(true);
    expect(isNavPageCurrent("/fi/model?mode=full", "/model")).toBe(true);
  });
});
