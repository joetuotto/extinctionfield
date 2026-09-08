import { describe, it, expect } from "vitest";
import { NextRequest } from "next/server";
import { proxy } from "@/proxy";

describe("legacy data destinations preserve their reading context",()=>{
  it("opens the source catalogue from a localized /data link",()=>{
    const response=proxy(new NextRequest("https://www.extinctionfield.com/fi/data?country=GBR"));
    const url=new URL(response!.headers.get("location")!);
    expect(response!.status).toBe(308);
    expect(url.pathname).toBe("/fi/explore");
    expect(url.searchParams.get("view")).toBe("sources");
    expect(url.searchParams.get("country")).toBe("GBR");
  });
  it("keeps the old /explorer country-year panel accessible",()=>{
    const response=proxy(new NextRequest("https://www.extinctionfield.com/explorer",{headers:{"accept-language":"fi"}}));
    const url=new URL(response!.headers.get("location")!);
    expect(url.pathname).toBe("/fi/explore");
    expect(url.searchParams.get("tab")).toBe("global");
  });
  it("does not replace an explicitly selected legacy tool",()=>{
    const response=proxy(new NextRequest("https://www.extinctionfield.com/en/data?tab=global&country=JPN"));
    const url=new URL(response!.headers.get("location")!);
    expect(url.searchParams.get("tab")).toBe("global");
    expect(url.searchParams.get("view")).toBeNull();
  });
});
