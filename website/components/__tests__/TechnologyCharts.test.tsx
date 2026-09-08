import "@testing-library/jest-dom/vitest";
import { act, cleanup, render, screen, within } from "@testing-library/react";
import { renderToString } from "react-dom/server";
import { hydrateRoot } from "react-dom/client";
import { afterEach, describe, expect, it, vi } from "vitest";
import type { AnchorHTMLAttributes } from "react";
import type { Locale } from "@/lib/i18n";
import { BermMasterInfographic } from "../BermMasterInfographic";
import { TechnologyGradientChart } from "../TechnologyGradientChart";
import { LightingTransitionTimeline } from "../LightingTransitionTimeline";
import { TechnologyAdoptionChart } from "../TechnologyAdoptionChart";

vi.mock("next/link", () => ({
  default: ({ children, ...props }: AnchorHTMLAttributes<HTMLAnchorElement>) => <a {...props}>{children}</a>,
}));

afterEach(cleanup);

const locales: Locale[] = ["en", "fi", "ja", "fr", "ko"];

describe("technology figures preserve the boundary between history and inference", () => {
  it.each(locales)("hydrates the server-rendered SVG descriptions without replacing charts in %s", async (locale) => {
    const charts = <><LightingTransitionTimeline locale={locale} /><TechnologyAdoptionChart locale={locale} /></>;
    const container = document.createElement("div");
    // Real HTML parsing is essential: a client-only render cannot catch title/desc hydration mismatches.
    container.innerHTML = renderToString(charts);
    document.body.append(container);
    const serverSvgs = [...container.querySelectorAll("svg")];
    const recoverableErrors: unknown[] = [];
    let root: ReturnType<typeof hydrateRoot> | undefined;
    try {
      await act(async () => {
        root = hydrateRoot(container, charts, { onRecoverableError: (error) => recoverableErrors.push(error) });
      });
      expect(recoverableErrors).toEqual([]);
      const hydratedSvgs = [...container.querySelectorAll("svg")];
      expect(hydratedSvgs).toHaveLength(serverSvgs.length);
      hydratedSvgs.forEach((svg, index) => expect(svg).toBe(serverSvgs[index]));
      for (const description of container.querySelectorAll("svg title, svg desc")) {
        expect(description.textContent?.trim()).toBeTruthy();
        expect(description.childNodes).toHaveLength(1);
        expect(description.firstChild?.nodeType).toBe(Node.TEXT_NODE);
      }
    } finally {
      await act(async () => { root?.unmount(); });
      container.remove();
    }
  });

  it.each(locales)("keeps the overview qualitative and its evidence routes usable in %s", (locale) => {
    const { container } = render(<BermMasterInfographic locale={locale} />);
    expect(screen.getByRole("figure")).toHaveAccessibleName();
    expect(container.textContent).not.toMatch(/88\s?%|58\s?%|0\.72|6\.1|EMF\s+\d+%/);
    expect(container.textContent).toMatch(/calibrat|kalibroin/i);
    const targets = screen.getAllByRole("link").map((link) => link.getAttribute("href"));
    expect(targets).toEqual(expect.arrayContaining([`/${locale}/evidence/technology`, `/${locale}/model`, `/${locale}/evidence`]));
    expect(container.querySelectorAll("h2:empty, h3:empty, p:empty, a:empty")).toHaveLength(0);
  });

  it.each(locales)("does not present invented adoption scores as a fertility fit in %s", (locale) => {
    const { container } = render(<TechnologyGradientChart locale={locale} />);
    expect(screen.getByRole("figure")).toHaveAccessibleName();
    expect(container.textContent).not.toMatch(/0\.05|0\.72|6\.5|Same country, same healthcare|Sama maa, sama terveydenhuolto/);
    expect(container.textContent).toMatch(/hypothesis|hypoteesi/i);
    expect(container.textContent).toMatch(/different measures|eri mittareita/i);
    expect(screen.getAllByRole("link").map((link) => link.getAttribute("href"))).toContain(`/${locale}/evidence/amish-control`);
  });

  it.each(locales)("ties policy milestones to source links and separates sales from stock in %s", (locale) => {
    const { container } = render(<LightingTransitionTimeline locale={locale} />);
    const milestones = within(screen.getByRole("list")).getAllByRole("listitem");
    expect(milestones).toHaveLength(6);
    for (const milestone of milestones) {
      expect(within(milestone).getByRole("link").getAttribute("href")).toMatch(/^https:\/\/(eur-lex\.europa\.eu|energy\.ec\.europa\.eu|www\.energy\.gov)\//);
    }
    expect(container.textContent).toMatch(/45 lm\/W/);
    expect(container.textContent).toMatch(/exceptions|poikkeuksia/i);
    expect(container.textContent).toMatch(/residential lighting sales|kotitalousvalaistuksen myynti/i);
    expect(container.textContent).toMatch(/installed lighting|asennetusta valaistuksesta/i);
    expect(container.textContent).not.toMatch(/92%|87%|TTFields|5–10/);
    const iea = screen.getAllByRole("link").find((link) => link.getAttribute("href")?.startsWith("https://www.iea.org/"));
    expect(iea).toHaveAccessibleName();
    expect(container.querySelectorAll("h3:empty, h4:empty, p:empty, a:empty")).toHaveLength(0);
  });
});
