import "@testing-library/jest-dom/vitest";
import { cleanup, fireEvent, render, screen, within } from "@testing-library/react";
import { afterEach, expect, it } from "vitest";
import { ProxyExplanationsExplorer } from "../ProxyExplanationsExplorer";

afterEach(cleanup);

it("changes the causal explanation and renders the selected evidence as canonical links", () => {
  const { container } = render(<ProxyExplanationsExplorer locale="fi" />);
  const options = screen.getByRole("group", { name: "Tutki proxiselittäjää" });
  expect(within(options).getAllByRole("button")).toHaveLength(10);
  expect(screen.getByText("Miksi tämä ei riitä")).toBeInTheDocument();
  expect(container.querySelector('[data-reference-id="stone2025_amish_demography"] a')).toHaveAttribute("href", "https://doi.org/10.4054/DemRes.2025.52.26");
  fireEvent.click(within(options).getByRole("button", { name: "Ruutuaika ja sosiaalinen media" }));
  expect(screen.getByRole("heading", { name: "Ruutuaika ja sosiaalinen media" })).toBeInTheDocument();
  expect(container.querySelector('[data-reference-id="birks2021_modeled_rf_dose"] a')).toHaveAttribute("href", "https://doi.org/10.1016/j.envres.2020.110505");
  expect(container.querySelector('[data-reference-id="stone2025_amish_demography"]')).not.toBeInTheDocument();
  expect(container.querySelector('[data-reference-id="chang2015_ipad_melatonin"] a')).toHaveAttribute("href", "https://doi.org/10.1073/pnas.1418490112");
  expect(container.textContent).not.toContain("[[ref:");
  fireEvent.click(within(options).getByRole("button", { name: "Diagnostiikka ja tilastointi" }));
  expect(screen.getByText(/Se ei itsessään selitä fysiologista muutosta/)).toBeInTheDocument();
  expect(container.querySelector('[data-reference-id="birks2021_modeled_rf_dose"]')).not.toBeInTheDocument();
});
