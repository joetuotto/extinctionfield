import "@testing-library/jest-dom/vitest";
import { cleanup, fireEvent, render, screen, within } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { ProxyDemographicTheories } from "../ProxyDemographicTheories";
import { DEMOGRAPHIC_GROUPS, DEMOGRAPHIC_THEORIES } from "@/lib/proxyDemographyData";

afterEach(cleanup);

describe("demographic theory navigation", () => {
  it("makes all 23 theories reachable with one expanded explanation and resolved citations", () => {
    render(<ProxyDemographicTheories locale="fi" />);
    expect(DEMOGRAPHIC_THEORIES).toHaveLength(23);
    expect(new Set(DEMOGRAPHIC_THEORIES.map((item) => item.id)).size).toBe(23);
    for (const group of DEMOGRAPHIC_GROUPS) {
      const groupButton = screen.getByRole("button", { name: new RegExp(group.fi.title) });
      fireEvent.click(groupButton);
      expect(groupButton).toHaveAttribute("aria-pressed", "true");
      for (const item of DEMOGRAPHIC_THEORIES.filter((theory) => theory.group === group.id)) {
        const toggle = screen.getByRole("button", { name: item.fi.title });
        if (toggle.getAttribute("aria-expanded") !== "true") fireEvent.click(toggle);
        const panel = screen.getByRole("region", { name: item.fi.title });
        expect(panel).toBeVisible();
        expect(screen.getAllByRole("region")).toHaveLength(1);
        expect(within(panel).getByRole("link", { name: "Katso tämä osa vaikutusketjua" })).toHaveAttribute("href", `#${item.anchor}`);
        expect(panel.textContent).not.toContain("[[ref:");
        expect(panel.querySelector('a[data-reference-id], [data-reference-id] a')).not.toBeNull();
      }
    }
    const ids = [...document.querySelectorAll("[id]")].map((node) => node.id);
    expect(new Set(ids).size).toBe(ids.length);
  }, 15000);

  it.each(["ja", "fr", "ko"])("keeps the complete catalogue available in English for %s", (locale) => {
    render(<ProxyDemographicTheories locale={locale} />);
    fireEvent.click(screen.getByRole("button", { name: /Biological capacity/ }));
    fireEvent.click(screen.getByRole("button", { name: "Assisted reproduction and compensation" }));
    expect(screen.getByRole("region", { name: "Assisted reproduction and compensation" })).toBeVisible();
    expect(screen.getByText(/Smith’s registry study follows/)).toBeVisible();
    expect(document.querySelectorAll("button:empty, dd:empty, h4:empty")).toHaveLength(0);
  });
});
