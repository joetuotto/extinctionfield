import { readFileSync } from "node:fs";
import { resolve } from "node:path";

import { describe, expect, it } from "vitest";

const modelPageSource = readFileSync(
  resolve(process.cwd(), "app/[locale]/model/page.tsx"),
  "utf8",
);

describe("Lindgren model-page content contract", () => {
  it("publishes the complete Maxwell derivation gate in every locale", () => {
    expect(modelPageSource.match(/physBioMaxwellExplain:/g)).toHaveLength(5);
    expect(modelPageSource).toMatch(/variational principle/);
    expect(modelPageSource).toMatch(/Weyl condition/);
    expect(modelPageSource).toMatch(/Bianchi identity/);
    expect(modelPageSource).toMatch(/variaatioperiaatteen/);
    expect(modelPageSource).toMatch(/Weyl-ehdon/);
    expect(modelPageSource).toMatch(/Bianchi-identiteetin/);
  });

  it("publishes χ with the compound reduction status in every locale", () => {
    expect(modelPageSource.match(/physBioChiEpistemic:/g)).toHaveLength(5);
    expect(
      modelPageSource.match(/physBioChiEpistemic: "\[L1 \+ L0\/L2/g),
    ).toHaveLength(5);
    expect(modelPageSource).not.toMatch(/χ_geo\(q\).*always L1/);
    expect(modelPageSource).not.toMatch(/χ_geo\(q\).*aina L1/);
    expect(modelPageSource).not.toMatch(/χ_geo\(q\).*常にL1/);
    expect(modelPageSource).not.toMatch(/χ_geo\(q\).*항상 L1/);
  });
});
