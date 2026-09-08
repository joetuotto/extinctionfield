import "@testing-library/jest-dom/vitest";
import { cleanup, fireEvent, render, screen, within } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { ReproductiveRegulationEvidence } from "../ReproductiveRegulationEvidence";
import { ReproductiveRegulationIntegration } from "../ReproductiveRegulationIntegration";
import { ReproductiveRegulationAxes } from "../ReproductiveRegulationAxes";
import ReproductiveRegulationPage from "../../app/[locale]/behavior/reproductive-regulation/page";
import { REPRODUCTIVE_REGULATION as data, regulationFamily, regulationText, regulationVariableLabel } from "@/lib/reproductiveRegulation";
import { getActiveNavSection, getHomeRoute, getNavRoutes } from "@/lib/navigation";

afterEach(cleanup);

describe("reproductive regulation evidence", () => {
  it("resolves every study and data resource to its family, branch and localized measurements", () => {
    for (const study of data.studies) {
      expect(regulationFamily(study.familyId)).toBeDefined();
      expect(study.branches.length).toBeGreaterThan(0);
      expect(["component_experiment", "observational"]).toContain(study.evidenceKind);
      for (const id of [...study.measuredVariables, ...study.outcomes]) {
        expect(regulationVariableLabel(id, "fi").trim()).not.toBe("");
        expect(regulationVariableLabel(id, "en").trim()).not.toBe("");
      }
      for (const id of study.datasetIds) expect(data.existingDatasets.find(item => item.id === id), id).toBeDefined();
    }
    for (const dataset of data.existingDatasets) {
      expect(regulationFamily(dataset.familyId)).toBeDefined();
      expect(["collection", "publication"]).toContain(dataset.yearBasis);
      expect(dataset.years.trim()).not.toBe("");
    }
  });

  it("combines branch, evidence-kind and family filters while keeping the two Cebu analyses in one family", () => {
    const fatherhood = data.studies.find(item => item.referenceId === "gettler2011_fatherhood_testosterone")!;
    const sexualActivity = data.studies.find(item => item.referenceId === "gettler2013_fatherhood_sex")!;
    expect(fatherhood.familyId).toBe(sexualActivity.familyId);
    render(<ReproductiveRegulationEvidence locale="fi" />);
    fireEvent.change(screen.getByRole("combobox", { name: "Lisääntymisen haara" }), { target: { value: "care_feedback" } });
    fireEvent.change(screen.getByRole("combobox", { name: "Näyttölaji" }), { target: { value: "observational" } });
    fireEvent.change(screen.getByRole("combobox", { name: "Tutkimusperhe" }), { target: { value: fatherhood.familyId } });
    const rows = [...document.querySelectorAll("details[data-study-id]")];
    expect(new Set(rows.map(row => row.getAttribute("data-study-id")))).toEqual(new Set([fatherhood.id, sexualActivity.id]));
    expect(screen.getByRole("status")).toHaveTextContent("2 tutkimusta · 1 tutkimusperhettä");
    for (const row of rows) expect(row).toHaveAttribute("data-evidence-kind", "observational");
  });

  it("reveals the full study set and opens a measured intervention without losing its scope or time course", () => {
    render(<ReproductiveRegulationEvidence locale="en" />);
    expect(document.querySelectorAll("details[data-study-id]")).toHaveLength(6);
    fireEvent.click(screen.getByRole("button", { name: `Show all ${data.studies.length} matching studies` }));
    expect(document.querySelectorAll("details[data-study-id]")).toHaveLength(data.studies.length);
    const study = data.studies.find(item => item.referenceId === "peragine2017_rfrp_suppression")!;
    const row = document.querySelector(`details[data-study-id="${study.id}"]`)!;
    fireEvent.click(row.querySelector("summary")!);
    expect(row).toHaveAttribute("open");
    expect(within(row as HTMLElement).getByText(study.intervention.en)).toBeVisible();
    expect(within(row as HTMLElement).getByText(study.finding.en)).toBeVisible();
    expect(within(row as HTMLElement).getByText(study.scope.en)).toBeVisible();
    expect(within(row as HTMLElement).getByText(study.timeCourse.en)).toBeVisible();
    expect(row).toHaveAttribute("data-evidence-kind", "component_experiment");
  });

  it("recovers from a filter combination with no matching studies", () => {
    const observational = data.studies.find(item => item.referenceId === "gettler2011_fatherhood_testosterone")!;
    render(<ReproductiveRegulationEvidence locale="en" />);
    fireEvent.change(screen.getByRole("combobox", { name: "Research family" }), { target: { value: observational.familyId } });
    fireEvent.change(screen.getByRole("combobox", { name: "Evidence kind" }), { target: { value: "component_experiment" } });
    expect(document.querySelectorAll("details[data-study-id]")).toHaveLength(0);
    fireEvent.click(screen.getByRole("button", { name: "Reset filters" }));
    expect(document.querySelectorAll("details[data-study-id]")).toHaveLength(6);
    expect(screen.getByRole("combobox", { name: "Research family" })).toHaveValue("all");
  });
});

describe("reproductive regulation site integration", () => {
  it("preserves all eight axes and renders source links rather than raw reference tokens", () => {
    render(<ReproductiveRegulationAxes locale="fi" />);
    expect(screen.getAllByRole("row")).toHaveLength(9);
    expect(screen.getByRole("columnheader", { name: "Yhteismittaus" })).toBeInTheDocument();
    expect(document.body.textContent).not.toContain("[[ref:");
  });

  it("connects contextual panels to their mechanism anchors", () => {
    const contexts = ["model", "pathopege", "pathopolites", "patopolis", "patokinesis", "epistapege", "civilization"] as const;
    const anchors = ["three-branches", "selective-regulation", "caregiving", "feedback", "feedback", "shared-measures", "feedback"];
    render(<>{contexts.map(context => <ReproductiveRegulationIntegration key={context} locale="fi" context={context} />)}</>);
    for (let i = 0; i < contexts.length; i++) {
      const panel = document.getElementById(`reproductive-regulation-${contexts[i]}`)!;
      expect(within(panel).getByRole("link", { name: "Seuraa kolmea haaraa ja niiden näyttöä" })).toHaveAttribute("href", `/fi/behavior/reproductive-regulation#${anchors[i]}`);
    }
  });

  it("retains the three branches, unplanned pregnancy path and separately labelled data years on the Finnish page", async () => {
    render(await ReproductiveRegulationPage({ params: Promise.resolve({ locale: "fi" }) }));
    for (const id of ["three-branches", "selective-regulation", "caregiving", "time-course", "evidence-matrix", "shared-measures", "eight-axes", "feedback", "existing-data"]) expect(document.getElementById(id), id).toBeInTheDocument();
    expect(screen.getByText("Hoiva → myöhempi kontakti, oppiminen ja vastaanottava tila")).toBeInTheDocument();
    const carePath = screen.getByRole("group", { name: "Hoiva → myöhempi kontakti, oppiminen ja vastaanottava tila" });
    expect(within(carePath).getByRole("heading", { name: "Hoiva ja palaute" })).toBeInTheDocument();
    expect(within(carePath).queryByText("Toteutuneet kohtaamiset ja ehdollinen biologinen onnistuminen → lisääntymisen ajoitus ja syntymät")).not.toBeInTheDocument();
    const birthPath = screen.getByRole("group", { name: "Toteutuneet kohtaamiset ja ehdollinen biologinen onnistuminen → lisääntymisen ajoitus ja syntymät" });
    expect(within(birthPath).getByRole("heading", { name: "Motivaatio ja toteutuminen" })).toBeInTheDocument();
    expect(within(birthPath).getByRole("heading", { name: "Fysiologinen kapasiteetti" })).toBeInTheDocument();
    expect(screen.getByText(/joten myös suunnittelemattomat raskaudet säilyvät ketjussa/)).toBeInTheDocument();
    expect(screen.getByText("Viisi havaintoa, joilla on eri tehtävät")).toBeInTheDocument();
    const nhanes = data.existingDatasets.find(item => item.id === "dataset.nhanes-2013-2014")!;
    const details = screen.getByText(regulationText(nhanes.title, "fi")).closest("details")!;
    fireEvent.click(details.querySelector("summary")!);
    expect(within(details).getByText("Keruuvuodet:")).toBeVisible();
    expect(within(details).getByText(nhanes.years)).toBeVisible();
    expect(document.body.textContent).not.toContain("[[ref:");
  });

  it("uses the English text fallback visibly in the Japanese view", () => {
    render(<ReproductiveRegulationIntegration locale="ja" context="coordination" />);
    expect(screen.getByText("Prolactin reveals why one signal can have different outputs")).toBeInTheDocument();
    expect(document.body.textContent).toMatch(/翻訳|英語/);
    expect(screen.getByRole("link", { name: "Follow the three branches and their evidence" })).toHaveAttribute("href", "/ja/behavior/reproductive-regulation#caregiving");
  });

  it("adds a Behaviour child route while keeping the existing Home destination", () => {
    const routes = getNavRoutes("fi");
    expect(routes.find(route => route.href === "/behavior")?.children?.find(route => route.href === "/behavior/reproductive-regulation")?.label).toBe("Lisääntymisen säätely");
    expect(getActiveNavSection("/fi/behavior/reproductive-regulation")).toBe("/behavior");
    expect(getHomeRoute("fi")).toMatchObject({ href: "", label: "Etusivu" });
  });
});
