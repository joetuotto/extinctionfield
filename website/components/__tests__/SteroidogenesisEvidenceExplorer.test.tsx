import "@testing-library/jest-dom/vitest";
import { cleanup, fireEvent, render, screen, within } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { SteroidogenesisEvidenceExplorer } from "../SteroidogenesisEvidenceExplorer";
import { SteroidogenesisIntegrationPanel } from "../SteroidogenesisIntegrationPanel";
import { SteroidogenesisTranslationNotice } from "../SteroidogenesisTranslationNotice";
import { STEROIDOGENESIS, steroidogenesisStateLabel, steroidogenesisText } from "@/lib/steroidogenesis";
import { getActiveNavSection, getHomeRoute, getNavRoutes } from "@/lib/navigation";

afterEach(cleanup);

describe("SteroidogenesisEvidenceExplorer", () => {
  it("announces English study fallback before the Japanese explorer but not in Finnish", () => {
    const view = render(<SteroidogenesisEvidenceExplorer locale="ja" />);
    expect(screen.getByRole("note")).toHaveTextContent("研究ごとの説明など、未翻訳の研究内容は現在英語で表示されます。操作画面は日本語に翻訳されています。");
    view.rerender(<SteroidogenesisEvidenceExplorer locale="fi" />);
    expect(screen.queryByRole("note")).not.toBeInTheDocument();
    expect(screen.getByText("Tuloksen soveltamisala")).toBeInTheDocument();
  });

  it("identifies missing data resource translations separately from study descriptions", () => {
    const view = render(<SteroidogenesisTranslationNotice locale="ja" section="dataResources" />);
    expect(screen.getByRole("note")).toHaveTextContent("未翻訳のデータ資料の説明は現在英語で表示されます。");
    view.rerender(<SteroidogenesisTranslationNotice locale="fi" section="dataResources" />);
    expect(screen.queryByRole("note")).not.toBeInTheDocument();
  });

  it("can resolve the measured variables and research family of every exported study", () => {
    for (const study of STEROIDOGENESIS.studies) {
      const family = STEROIDOGENESIS.families.find(item => item.id === study.familyId);
      expect(family, study.id).toBeDefined();
      expect(family!.studyIds, study.id).toContain(study.id);
      for (const id of study.measuredVariables) {
        for (const locale of ["en", "fi", "ja", "fr", "ko"]) {
          expect(steroidogenesisStateLabel(id, locale).trim(), `${study.id}: ${id}/${locale}`).not.toBe("");
        }
      }
      if (study.evidenceKind === "component_experiment") expect(study.fieldProtocol, study.id).toBeNull();
    }
  });

  it("starts with biological variables, then reveals the intervention and response without equating protocol quantities with effects", () => {
    render(<SteroidogenesisEvidenceExplorer locale="en" />);
    const profile = document.querySelector("article[data-study-id]") as HTMLElement;
    const study = STEROIDOGENESIS.studies.find(item => item.id === profile.dataset.studyId)!;
    const state = STEROIDOGENESIS.states.find(item => item.id === study.measuredVariables[0])!;
    expect(within(profile).getByText(steroidogenesisText(state.description, "en"))).toBeInTheDocument();
    expect(within(profile).queryByText(steroidogenesisText(study.finding, "en"))).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "2. Response directions" }));
    expect(within(profile).getByText(steroidogenesisText(study.intervention, "en"))).toBeInTheDocument();
    expect(within(profile).getByText(steroidogenesisText(study.finding, "en"))).toBeInTheDocument();
    expect(within(profile).queryByText("Reported field strength or SAR")).not.toBeInTheDocument();
  });

  it("filters by mechanism and evidence kind without carrying a field protocol into a component experiment", () => {
    render(<SteroidogenesisEvidenceExplorer locale="en" />);
    fireEvent.change(screen.getByRole("combobox", { name: "Biological mechanism" }), { target: { value: "redox-reserve" } });
    fireEvent.change(screen.getByRole("combobox", { name: "Evidence kind" }), { target: { value: "component_experiment" } });
    const profile = document.querySelector("article[data-study-id]") as HTMLElement;
    expect(profile).toHaveAttribute("data-evidence-kind", "component_experiment");
    const selected = STEROIDOGENESIS.studies.find(study => study.id === profile.dataset.studyId)!;
    expect(selected.mechanisms).toContain("redox-reserve");
    fireEvent.click(screen.getByRole("button", { name: "3. Measured values" }));
    expect(within(profile).getByText("This study investigates a biological component without a field intervention.")).toBeInTheDocument();
    expect(within(profile).queryByText("Reported field strength or SAR")).not.toBeInTheDocument();
    expect(within(profile).getByText(steroidogenesisText(selected.finding, "en"))).toBeInTheDocument();
  });

  it("shows the selected field protocol separately from its biological finding and retains its research family", () => {
    render(<SteroidogenesisEvidenceExplorer locale="en" />);
    fireEvent.change(screen.getByRole("combobox", { name: "Evidence kind" }), { target: { value: "field_experiment" } });
    const study = STEROIDOGENESIS.studies.find(item => item.id === "qin2018")!;
    fireEvent.change(screen.getByRole("combobox", { name: "Choose a study" }), { target: { value: study.id } });
    fireEvent.click(screen.getByRole("button", { name: "3. Measured values" }));
    const profile = document.querySelector("article[data-study-id]") as HTMLElement;
    expect(profile).toHaveAttribute("data-study-id", study.id);
    expect(profile).toHaveAttribute("data-evidence-kind", "field_experiment");
    expect(within(profile).getByText(study.fieldProtocol!.carrierFrequency)).toBeInTheDocument();
    expect(within(profile).getByText(steroidogenesisText(study.scope, "en"))).toBeInTheDocument();
    const family = STEROIDOGENESIS.families.find(item => item.id === study.familyId)!;
    expect(within(profile).getByText(steroidogenesisText(family.label, "en"))).toBeInTheDocument();
    expect(within(profile).getByText(steroidogenesisText(family.notes, "en"))).toBeInTheDocument();
  });

  it("uses diagram branches to reveal their study set while preserving the two distinct transcription routes", () => {
    render(<SteroidogenesisEvidenceExplorer locale="en" />);
    expect(screen.getByRole("link", { name: "CaMKI → NUR77 → StAR" })).toBeInTheDocument();
    fireEvent.click(screen.getByRole("link", { name: "CaMKI / RORα → BMAL1 → steroidogenesis" }));
    expect(screen.getByRole("combobox", { name: "Biological mechanism" })).toHaveValue("clock-steroidogenesis");
    expect(screen.getByText(/CaMKI is distinct from CaMKII/)).toBeInTheDocument();
  });

  it.each(["en", "fi", "ja", "fr", "ko"])("renders complete controls and measurement labels in %s", locale => {
    render(<SteroidogenesisEvidenceExplorer locale={locale} />);
    expect(screen.getAllByRole("combobox")).toHaveLength(3);
    expect(document.querySelectorAll("h2:empty, h3:empty, h4:empty, p:empty, option:empty")).toHaveLength(0);
    expect(document.body.textContent).not.toContain("undefined");
    expect(document.body.textContent).not.toContain("[[ref:");
  });
});

describe("SteroidogenesisIntegrationPanel and navigation", () => {
  it.each(["en", "fi", "ja", "fr", "ko"])("links the reserve explanation to the same mechanism and proxy anchor in %s", locale => {
    render(<SteroidogenesisIntegrationPanel locale={locale} focus="reserve" />);
    const hrefs = screen.getAllByRole("link").map(link => link.getAttribute("href"));
    expect(hrefs).toContain(`/${locale}/biology/calcium-redox-steroidogenesis#redox-reserve`);
    expect(hrefs).toContain(`/${locale}/model/proxy-masking#redox-reserve-masking`);
    expect(document.querySelectorAll("h3:empty, p:empty")).toHaveLength(0);
  });

  it("keeps the page in Biology and the study shortcut in Evidence, with the existing home route", () => {
    const routes = getNavRoutes("fi");
    expect(routes.find(route => route.href === "/biology")?.children?.some(route => route.href === "/biology/calcium-redox-steroidogenesis")).toBe(true);
    expect(routes.find(route => route.href === "/evidence/convergence")?.children?.some(route => route.href === "/biology/calcium-redox-steroidogenesis#study-explorer")).toBe(true);
    expect(getActiveNavSection("/fi/biology/calcium-redox-steroidogenesis#study-explorer")).toBe("/biology");
    expect(getHomeRoute("fi")).toMatchObject({ href: "", label: "Etusivu" });
  });
});
