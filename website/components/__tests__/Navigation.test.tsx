import "@testing-library/jest-dom/vitest";
import { act, cleanup, fireEvent, render, screen, within } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { AnchorHTMLAttributes } from "react";
import { Navigation } from "../../app/[locale]/navigation";
import { AboutTabs } from "../AboutTabs";

const location = vi.hoisted(() => ({ pathname: "/fi/model" }));
vi.mock("next/navigation", () => ({ usePathname: () => location.pathname }));
vi.mock("next/link", () => ({
  default: ({ children, onClick, ...props }: AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a {...props} onClick={(event) => { event.preventDefault(); onClick?.(event); }}>{children}</a>
  ),
}));
vi.mock("../ThemeToggle", () => ({ ThemeToggle: () => <button>Theme</button> }));
vi.mock("../LanguageSwitcher", () => ({ LanguageSwitcher: () => <button>Language</button> }));

let breakpointListener: (() => void) | undefined;
beforeEach(() => {
  location.pathname = "/fi/model";
  breakpointListener = undefined;
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: vi.fn(() => ({
      matches: true,
      addEventListener: (_event: string, listener: () => void) => { breakpointListener = listener; },
      removeEventListener: vi.fn(),
    })),
  });
});
afterEach(() => { cleanup(); vi.useRealTimers(); });

function desktop() {
  return document.querySelector('[data-navigation="desktop"]') as HTMLElement;
}
function mobile() {
  return document.querySelector('[data-navigation="mobile"]') as HTMLElement;
}
function controlledPanel(trigger: HTMLElement) {
  return document.getElementById(trigger.getAttribute("aria-controls")!) as HTMLElement;
}

describe("desktop navigation disclosure behavior", () => {
  it("renders seven sections, a localized home logo and valid disclosure controls", () => {
    render(<Navigation locale="fi" />);
    expect(screen.getByRole("navigation", { name: "Päävalikko" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Extinction Field — Etusivu" })).toHaveAttribute("href", "/fi");
    const sectionButtons = within(desktop()).getAllByRole("button").filter((button) => button.hasAttribute("aria-controls"));
    expect(sectionButtons.map((button) => button.textContent)).toEqual(["Malli", "Fysiikka", "Biologia", "Käyttäytyminen", "Sivilisaatio", "Näyttö", "Tietoa"]);
    for (const trigger of sectionButtons) {
      expect(trigger).toHaveAttribute("aria-expanded", "false");
      expect(controlledPanel(trigger)).toHaveAttribute("hidden");
      expect(controlledPanel(trigger)).toHaveAttribute("aria-labelledby", trigger.id);
    }
    expect(document.querySelector('[role="menu"]')).toBeNull();
    expect(desktop().querySelectorAll('[data-active="true"]')).toHaveLength(1);
  });

  it("supports arrow entry, link navigation, Home/End and Escape with focus restored", () => {
    render(<Navigation locale="fi" />);
    const trigger = within(desktop()).getByRole("button", { name: "Fysiikka" });
    act(() => trigger.focus());
    fireEvent.keyDown(trigger, { key: "ArrowDown" });
    expect(trigger).toHaveAttribute("aria-expanded", "true");
    const links = within(controlledPanel(trigger)).getAllByRole("link");
    expect(links[0]).toHaveFocus();
    fireEvent.keyDown(links[0], { key: "ArrowDown" });
    expect(links[1]).toHaveFocus();
    fireEvent.keyDown(links[1], { key: "End" });
    expect(links[links.length - 1]).toHaveFocus();
    fireEvent.keyDown(links[links.length - 1], { key: "Home" });
    expect(links[0]).toHaveFocus();
    fireEvent.keyDown(links[0], { key: "Escape" });
    expect(trigger).toHaveFocus();
    expect(controlledPanel(trigger)).toHaveAttribute("hidden");
    fireEvent.keyDown(trigger, { key: "ArrowUp" });
    expect(links[links.length - 1]).toHaveFocus();
  });

  it("closes on outside pointer interaction and when keyboard focus leaves", () => {
    render(<><Navigation locale="fi" /><button>Outside</button></>);
    const trigger = within(desktop()).getByRole("button", { name: "Näyttö" });
    fireEvent.click(trigger);
    fireEvent.pointerDown(screen.getByRole("button", { name: "Outside" }));
    expect(trigger).toHaveAttribute("aria-expanded", "false");
    fireEvent.keyDown(trigger, { key: "ArrowDown" });
    act(() => screen.getByRole("button", { name: "Outside" }).focus());
    expect(trigger).toHaveAttribute("aria-expanded", "false");
  });

  it("opens only one group and keeps long lists scrollable inside the viewport", () => {
    render(<Navigation locale="fi" />);
    const physics = within(desktop()).getByRole("button", { name: "Fysiikka" });
    const evidence = within(desktop()).getByRole("button", { name: "Näyttö" });
    fireEvent.click(physics);
    fireEvent.click(evidence);
    expect(physics).toHaveAttribute("aria-expanded", "false");
    expect(evidence).toHaveAttribute("aria-expanded", "true");
    expect(controlledPanel(evidence)).toHaveClass("overflow-y-auto", "overscroll-contain", "right-0");
    expect(controlledPanel(evidence).className).toContain("max-h-[calc(100dvh-5.5rem)]");
    expect(within(controlledPanel(evidence)).getByRole("link", { name: "Ennusteet" })).toHaveAttribute("href", "/fi/predictions");
    expect(within(controlledPanel(evidence)).getByRole("link", { name: "Artikkelit" })).toHaveAttribute("href", "/fi/articles");
  });

  it("opens on hover and closes on leaving without taking keyboard focus", () => {
    vi.useFakeTimers();
    render(<Navigation locale="fi" />);
    const trigger = within(desktop()).getByRole("button", { name: "Biologia" });
    fireEvent.mouseEnter(trigger.closest("li")!);
    act(() => vi.advanceTimersByTime(80));
    expect(trigger).toHaveAttribute("aria-expanded", "true");
    expect(trigger).not.toHaveFocus();
    fireEvent.mouseLeave(trigger.closest("li")!);
    act(() => vi.advanceTimersByTime(200));
    expect(trigger).toHaveAttribute("aria-expanded", "false");
  });

  it("closes same-page anchor navigation and marks only its containing page as current", () => {
    location.pathname = "/fi/behavior";
    render(<Navigation locale="fi" />);
    const trigger = within(desktop()).getByRole("button", { name: "Käyttäytyminen" });
    fireEvent.click(trigger);
    const links = within(controlledPanel(trigger)).getAllByRole("link");
    expect(links.filter((link) => link.getAttribute("aria-current") === "page")).toHaveLength(1);
    const reasons = within(controlledPanel(trigger)).getByRole("link", { name: "Päätös ja perustelu" });
    expect(reasons).not.toHaveAttribute("aria-current");
    fireEvent.click(reasons);
    expect(trigger).toHaveAttribute("aria-expanded", "false");
  });

  it("resets disclosures and section ownership on a client route change", () => {
    const view = render(<Navigation locale="fi" />);
    fireEvent.click(within(desktop()).getByRole("button", { name: "Malli" }));
    location.pathname = "/fi/model/math";
    view.rerender(<Navigation locale="fi" />);
    expect(within(desktop()).getByRole("button", { name: "Malli" })).toHaveAttribute("aria-expanded", "false");
    expect(desktop().querySelectorAll('[data-active="true"]')).toHaveLength(1);
    expect(desktop().querySelector('[data-active="true"]')).toHaveAttribute("data-nav-section", "/physics");
  });
});

describe("mobile navigation", () => {
  it("opens with keyboard, exposes the active section and closes nested then outer disclosure with Escape", () => {
    location.pathname = "/fi/model/math";
    render(<Navigation locale="fi" />);
    const open = screen.getByRole("button", { name: "Avaa valikko" });
    act(() => open.focus());
    fireEvent.keyDown(open, { key: "ArrowDown" });
    expect(within(mobile()).getByRole("button", { name: "Malli" })).toHaveFocus();
    const physics = within(mobile()).getByRole("button", { name: "Fysiikka" });
    expect(physics).toHaveAttribute("aria-expanded", "true");
    expect(mobile().querySelectorAll('[data-active="true"]')).toHaveLength(1);
    const current = mobile().querySelector('a[aria-current="page"]') as HTMLElement;
    expect(current).toHaveAttribute("href", "/fi/model/math");
    act(() => current.focus());
    fireEvent.keyDown(current, { key: "Escape" });
    expect(physics).toHaveFocus();
    expect(physics).toHaveAttribute("aria-expanded", "false");
    fireEvent.keyDown(physics, { key: "Escape" });
    expect(mobile()).toHaveAttribute("hidden");
    expect(screen.getByRole("button", { name: "Avaa valikko" })).toHaveFocus();
  });

  it("closes after following an anchor or clicking outside, and fits the visible viewport", () => {
    location.pathname = "/fi/behavior";
    render(<><Navigation locale="fi" /><button>Outside</button></>);
    fireEvent.click(screen.getByRole("button", { name: "Avaa valikko" }));
    expect(mobile()).toHaveClass("overflow-y-auto", "overscroll-contain");
    expect(mobile().className).toContain("max-h-[calc(100dvh-4rem)]");
    fireEvent.click(within(mobile()).getByRole("link", { name: "Päätös ja perustelu" }));
    expect(mobile()).toHaveAttribute("hidden");
    fireEvent.click(screen.getByRole("button", { name: "Avaa valikko" }));
    fireEvent.pointerDown(screen.getByRole("button", { name: "Outside" }));
    expect(mobile()).toHaveAttribute("hidden");
  });

  it("resets open menus when crossing the desktop breakpoint", () => {
    render(<Navigation locale="fi" />);
    fireEvent.click(screen.getByRole("button", { name: "Avaa valikko" }));
    fireEvent.click(within(desktop()).getByRole("button", { name: "Näyttö" }));
    act(() => breakpointListener?.());
    expect(mobile()).toHaveAttribute("hidden");
    expect(within(desktop()).getByRole("button", { name: "Näyttö" })).toHaveAttribute("aria-expanded", "false");
  });
});

describe("About navigation", () => {
  it.each(["en", "fi", "ja", "fr", "ko"])("keeps all About destinations and epistemology available in %s", (locale) => {
    location.pathname = `/${locale}/epistemology`;
    render(<AboutTabs locale={locale} />);
    const links = screen.getAllByRole("link");
    expect(links).toHaveLength(6);
    expect(links.find((link) => link.getAttribute("aria-current") === "page")).toHaveAttribute("href", `/${locale}/epistemology`);
    for (const href of ["/about", "/about/history", "/about/replication", "/about/measurement", "/about/objections"]) {
      expect(links.some((link) => link.getAttribute("href") === `/${locale}${href}`)).toBe(true);
    }
  });
});
