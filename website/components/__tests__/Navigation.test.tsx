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
let viewportWidth = 1440;
let resizeCallback: ResizeObserverCallback;
let headerObserver: ResizeObserver;
let observedHeader: Element;
const disconnectObserver = vi.fn();
beforeEach(() => {
  location.pathname = "/fi/model";
  window.history.replaceState(null, "", "/fi/model");
  breakpointListener = undefined;
  viewportWidth = 1440;
  disconnectObserver.mockReset();
  headerObserver = {
    observe(element: Element) { observedHeader = element; },
    unobserve() { /* no native observer in jsdom */ },
    disconnect: disconnectObserver,
  };
  vi.stubGlobal("ResizeObserver", vi.fn(function (callback: ResizeObserverCallback) {
    resizeCallback = callback;
    return headerObserver;
  }));
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: vi.fn(() => ({
      matches: viewportWidth >= 1280,
      addEventListener: (_event: string, listener: () => void) => { breakpointListener = listener; },
      removeEventListener: vi.fn(),
    })),
  });
});
afterEach(() => { cleanup(); vi.restoreAllMocks(); vi.unstubAllGlobals(); vi.useRealTimers(); });

function primary() {
  return document.querySelector('[data-navigation="primary"]') as HTMLElement;
}
function controlledPanel(trigger: HTMLElement) {
  return document.getElementById(trigger.getAttribute("aria-controls")!) as HTMLElement;
}

describe("shared navigation disclosure behavior", () => {
  it("renders a visible home link, seven sections and valid disclosure controls", () => {
    render(<Navigation locale="fi" />);
    expect(screen.getByRole("navigation", { name: "Päävalikko" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Extinction Field — Etusivu" })).toHaveAttribute("href", "/fi");
    expect(within(primary()).getByRole("link", { name: "Etusivu" })).toHaveAttribute("href", "/fi");
    const sectionButtons = within(primary()).getAllByRole("button").filter((button) => button.hasAttribute("aria-controls"));
    expect(sectionButtons.map((button) => button.textContent)).toEqual(["Malli", "Fysiikka", "Biologia", "Käyttäytyminen", "Sivilisaatio", "Näyttö", "Tietoa"]);
    for (const trigger of sectionButtons) {
      expect(trigger).toHaveAttribute("aria-expanded", "false");
      expect(controlledPanel(trigger)).toHaveAttribute("hidden");
      expect(controlledPanel(trigger)).toHaveAttribute("aria-labelledby", trigger.id);
    }
    expect(document.querySelector('[role="menu"]')).toBeNull();
    expect(primary().querySelectorAll('[data-active="true"]')).toHaveLength(1);
  });

  it("supports arrow entry, link navigation, Home/End and Escape with focus restored", () => {
    render(<Navigation locale="fi" />);
    const trigger = within(primary()).getByRole("button", { name: "Fysiikka" });
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
    const trigger = within(primary()).getByRole("button", { name: "Näyttö" });
    fireEvent.click(trigger);
    fireEvent.pointerDown(screen.getByRole("button", { name: "Outside" }));
    expect(trigger).toHaveAttribute("aria-expanded", "false");
    fireEvent.keyDown(trigger, { key: "ArrowDown" });
    act(() => screen.getByRole("button", { name: "Outside" }).focus());
    expect(trigger).toHaveAttribute("aria-expanded", "false");
  });

  it("opens only one group and keeps long lists scrollable inside the viewport", () => {
    render(<Navigation locale="fi" />);
    const physics = within(primary()).getByRole("button", { name: "Fysiikka" });
    const evidence = within(primary()).getByRole("button", { name: "Näyttö" });
    fireEvent.click(physics);
    fireEvent.click(evidence);
    expect(physics).toHaveAttribute("aria-expanded", "false");
    expect(evidence).toHaveAttribute("aria-expanded", "true");
    expect(controlledPanel(evidence)).toHaveClass("overflow-y-auto", "overscroll-contain", "xl:right-0");
    expect(controlledPanel(evidence).className).toContain("max-h-[calc(100dvh-var(--site-header-height,4rem)-1rem)]");
    expect(within(controlledPanel(evidence)).getByRole("link", { name: "Ennusteet" })).toHaveAttribute("href", "/fi/predictions");
    expect(within(controlledPanel(evidence)).getByRole("link", { name: "Artikkelit" })).toHaveAttribute("href", "/fi/articles");
  });

  it("keeps main's newer civilization and response-condition pages reachable after integration", () => {
    location.pathname = "/fi/civilization/epistapege";
    render(<Navigation locale="fi" />);
    const civilization = within(primary()).getByRole("button", { name: "Sivilisaatio" });
    fireEvent.click(civilization);
    const epistapege = within(controlledPanel(civilization)).getByRole("link", { name: /^Epistapege/ });
    expect(epistapege).toHaveAttribute("href", "/fi/civilization/epistapege");
    expect(epistapege).toHaveAttribute("aria-current", "page");
    const evidence = within(primary()).getByRole("button", { name: "Näyttö" });
    fireEvent.click(evidence);
    expect(within(controlledPanel(evidence)).getByRole("link", { name: /^Vaste-ehdot/ })).toHaveAttribute("href", "/fi/evidence/response-conditions");
  });

  it("opens on hover and closes on leaving without taking keyboard focus", () => {
    vi.useFakeTimers();
    render(<Navigation locale="fi" />);
    const trigger = within(primary()).getByRole("button", { name: "Biologia" });
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
    const trigger = within(primary()).getByRole("button", { name: "Käyttäytyminen" });
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
    fireEvent.click(within(primary()).getByRole("button", { name: "Malli" }));
    location.pathname = "/fi/model/math";
    view.rerender(<Navigation locale="fi" />);
    expect(within(primary()).getByRole("button", { name: "Malli" })).toHaveAttribute("aria-expanded", "false");
    expect(primary().querySelectorAll('[data-active="true"]')).toHaveLength(1);
    expect(primary().querySelector('[data-active="true"]')).toHaveAttribute("data-nav-section", "/physics");
  });
});

describe("visible navigation at every viewport width", () => {
  it.each([390, 897, 1440])("keeps Home and all seven primary groups directly available at %d px", (width) => {
    viewportWidth = width;
    render(<Navigation locale="fi" />);
    const list = primary();
    expect(list.children).toHaveLength(8);
    expect(within(list).getByRole("link", { name: "Etusivu" })).toBeVisible();
    const sections = within(list).getAllByRole("button");
    expect(sections.map((button) => button.textContent)).toEqual(["Malli", "Fysiikka", "Biologia", "Käyttäytyminen", "Sivilisaatio", "Näyttö", "Tietoa"]);
    for (const button of sections) expect(button).toBeVisible();
    expect(list.closest("[hidden]")).toBeNull();
    expect(list).toHaveClass("flex-wrap");
    expect(list.className).not.toMatch(/(?:^|\s)(?:hidden|overflow-x-auto)(?:\s|$)/);
    expect(screen.queryByRole("button", { name: "Avaa valikko" })).not.toBeInTheDocument();
    expect(screen.getAllByRole("button", { name: "Language" })).toHaveLength(1);
    expect(screen.getAllByRole("button", { name: "Theme" })).toHaveLength(1);
  });

  it.each([
    ["en", "Home"], ["fi", "Etusivu"], ["ja", "ホーム"], ["fr", "Accueil"], ["ko", "홈"],
  ])("provides a named Home link before the seven groups in %s", (locale, label) => {
    location.pathname = `/${locale}`;
    viewportWidth = 390;
    render(<Navigation locale={locale} />);
    const homeLink = within(primary()).getByRole("link", { name: label });
    expect(homeLink).toHaveAttribute("href", `/${locale}`);
    expect(homeLink).toHaveAttribute("aria-current", "page");
    expect(primary().firstElementChild).toContainElement(homeLink);
    expect(primary().querySelectorAll("[data-nav-section]")).toHaveLength(7);
    expect(primary().querySelectorAll('[data-active="true"]')).toHaveLength(0);
  });

  it("uses the same keyboard-accessible dropdown on narrow screens without an outer menu", () => {
    viewportWidth = 390;
    render(<><Navigation locale="fi" /><button>Outside</button></>);
    const trigger = within(primary()).getByRole("button", { name: "Fysiikka" });
    act(() => trigger.focus());
    fireEvent.keyDown(trigger, { key: "ArrowDown" });
    const panel = controlledPanel(trigger);
    const links = within(panel).getAllByRole("link");
    expect(links[0]).toHaveFocus();
    expect(panel).toHaveClass("left-3", "right-3", "top-full", "overflow-y-auto");
    expect(trigger.closest("li")).toHaveClass("static", "xl:relative");
    fireEvent.keyDown(links[0], { key: "Escape" });
    expect(trigger).toHaveFocus();
    expect(panel).toHaveAttribute("hidden");
    fireEvent.click(trigger);
    fireEvent.pointerDown(screen.getByRole("button", { name: "Outside" }));
    expect(panel).toHaveAttribute("hidden");
    expect(trigger).toBeVisible();
  });

  it("keeps section labels visible while resetting a dropdown across the layout breakpoint", () => {
    render(<Navigation locale="fi" />);
    const trigger = within(primary()).getByRole("button", { name: "Näyttö" });
    fireEvent.click(trigger);
    viewportWidth = 897;
    act(() => breakpointListener?.());
    expect(trigger).toHaveAttribute("aria-expanded", "false");
    expect(trigger).toBeVisible();
    expect(within(primary()).getByRole("link", { name: "Etusivu" })).toBeVisible();
    expect(within(primary()).getAllByRole("button")).toHaveLength(7);
  });
});

describe("measured header height", () => {
  it("publishes the initial and changed header height for anchor offsets, then cleans up", () => {
    const geometry = vi.spyOn(HTMLElement.prototype, "getBoundingClientRect").mockReturnValue(new DOMRect(0, 0, 390, 149));
    const view = render(<Navigation locale="fi" />);
    expect(observedHeader).toBe(screen.getByRole("navigation", { name: "Päävalikko" }));
    expect(document.documentElement.style.getPropertyValue("--site-header-height")).toBe("149px");
    geometry.mockReturnValue(new DOMRect(0, 0, 897, 110.25));
    act(() => resizeCallback([], headerObserver));
    expect(document.documentElement.style.getPropertyValue("--site-header-height")).toBe("111px");
    geometry.mockReturnValue(new DOMRect(0, 0, 1440, 65));
    fireEvent(window, new Event("resize"));
    expect(document.documentElement.style.getPropertyValue("--site-header-height")).toBe("65px");
    view.unmount();
    expect(disconnectObserver).toHaveBeenCalledOnce();
    expect(document.documentElement.style.getPropertyValue("--site-header-height")).toBe("");
  });
});

describe("initial fragment alignment", () => {
  function setup({ top = 80, hash = "#solar-biological", id = "solar-biological", ready = "complete", includeTarget = true }: {
    top?: number;
    hash?: string;
    id?: string;
    ready?: DocumentReadyState;
    includeTarget?: boolean;
  } = {}) {
    window.history.replaceState(null, "", `/fi/model${hash}`);
    vi.spyOn(document, "readyState", "get").mockReturnValue(ready);
    vi.spyOn(HTMLElement.prototype, "getBoundingClientRect").mockReturnValue(new DOMRect(0, 0, 390, 150));
    let frame: FrameRequestCallback | undefined;
    const requestFrame = vi.fn((callback: FrameRequestCallback) => { frame = callback; return 1; });
    const cancelFrame = vi.fn();
    vi.stubGlobal("requestAnimationFrame", requestFrame);
    vi.stubGlobal("cancelAnimationFrame", cancelFrame);
    const scroll = vi.fn();
    const view = render(<><Navigation locale="fi" />{includeTarget && <section id={id} ref={(element) => {
      if (element) {
        element.scrollIntoView = scroll;
        element.getBoundingClientRect = () => new DOMRect(0, top, 390, 80);
      }
    }}>Linked section</section>}</>);
    return { view, scroll, requestFrame, cancelFrame, flush: () => act(() => frame?.(16)) };
  }

  it("realigns a fresh fragment that was scrolled under the taller header before hydration", () => {
    const check = setup();
    expect(document.documentElement.style.getPropertyValue("--site-header-height")).toBe("150px");
    expect(check.scroll).not.toHaveBeenCalled();
    check.flush();
    expect(check.scroll).toHaveBeenCalledExactlyOnceWith({ block: "start", behavior: "instant" });
    act(() => resizeCallback([], headerObserver));
    fireEvent(window, new Event("resize"));
    expect(check.requestFrame).toHaveBeenCalledOnce();
    expect(check.scroll).toHaveBeenCalledOnce();
  });

  it.each([-1, 166, 600])("leaves a fragment at top=%d alone after the reader moved past it or it is already visible", (top) => {
    const check = setup({ top });
    check.flush();
    expect(check.scroll).not.toHaveBeenCalled();
  });

  it.each(["wheel", "touchstart", "pointerdown", "keydown"])("cancels the pending correction after user %s input", (event) => {
    const check = setup();
    fireEvent(document, new Event(event));
    check.flush();
    expect(check.cancelFrame).toHaveBeenCalledWith(1);
    expect(check.scroll).not.toHaveBeenCalled();
  });

  it("does not reuse an initial fragment after the URL changes", () => {
    const check = setup();
    window.history.replaceState(null, "", "/fi/model#different-section");
    check.flush();
    expect(check.scroll).not.toHaveBeenCalled();
  });

  it("waits until the document is parsed before checking the target", () => {
    const check = setup({ ready: "loading" });
    expect(check.requestFrame).not.toHaveBeenCalled();
    fireEvent(document, new Event("DOMContentLoaded"));
    check.flush();
    expect(check.scroll).toHaveBeenCalledOnce();
  });

  it("decodes an escaped fragment and tolerates a missing target", () => {
    const escaped = setup({ hash: "#tila%20ja%20arvo", id: "tila ja arvo" });
    escaped.flush();
    expect(escaped.scroll).toHaveBeenCalledOnce();
    escaped.view.unmount();
    const missing = setup({ includeTarget: false });
    missing.flush();
    expect(missing.scroll).not.toHaveBeenCalled();
  });

  it.each(["", "#%E0%A4%A"])("ignores an empty or malformed fragment %s without scheduling a scroll", (hash) => {
    const check = setup({ hash });
    check.flush();
    expect(check.requestFrame).not.toHaveBeenCalled();
    expect(check.scroll).not.toHaveBeenCalled();
  });

  it("cancels a queued frame when the navigation unmounts", () => {
    const check = setup();
    check.view.unmount();
    check.flush();
    expect(check.cancelFrame).toHaveBeenCalledWith(1);
    expect(check.scroll).not.toHaveBeenCalled();
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
