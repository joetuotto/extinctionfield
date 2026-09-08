import "@testing-library/jest-dom/vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { LanguageSwitcher } from "../LanguageSwitcher";

const push = vi.hoisted(() => vi.fn());
vi.mock("next/navigation", () => ({ usePathname: () => "/fi/search", useRouter: () => ({ push }) }));
afterEach(() => { cleanup(); vi.clearAllMocks(); });

describe("search language switching", () => {
  it("keeps the query and type while resetting pagination", () => {
    window.history.replaceState(null, "", "/fi/search?q=Ca%C2%B2%2B&type=reference&page=3");
    render(<LanguageSwitcher locale="fi" />);
    fireEvent.click(screen.getByRole("button", { name: "Select language" }));
    fireEvent.click(screen.getByRole("link", { name: /EN\s*English/ }));
    expect(push).toHaveBeenCalledWith("/en/search?q=Ca%C2%B2%2B&type=reference");
  });
});
