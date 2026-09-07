import type { Metadata } from "next";
import Link from "next/link";
import { Braces } from "lucide-react";

import { CautionBox } from "@/components/CautionBox";
import { InlineReferenceText } from "@/components/InlineReferenceText";
import { PageHeader } from "@/components/PageHeader";
import { TranslationNotice } from "@/components/TranslationNotice";
import { DKC_FRAMEWORK } from "@/lib/dkcFramework";

const COPY = {
  en: {
    title: "Lindgren tensor derivation",
    subtitle: "An auditable path through the 2025 variational GME, Weyl semimetry and Bianchi identity to a formalized—but still open—geometry-to-biology bridge.",
    caution: "The implementation groups its explicitly computed or provenance-attested residuals into three mandatory branches: variation, Weyl geometry and Bianchi. Passing every branch checks internal consistency under the stated premises; it is not empirical validation, a biological response, or closure of L2.",
  },
  fi: {
    title: "Lindgrenin tensorijohto",
    subtitle: "Auditoitava johto vuoden 2025 variaatio-GME:n, Weyl-semimetrisyyden ja Bianchi-identiteetin kautta formallisoituun mutta edelleen avoimeen geometria–biologia-siltaan.",
    caution: "Toteutus ryhmittelee eksplisiittisesti lasketut tai provenienssilla attestoidut residuaalit kolmeen pakolliseen haaraan: variaatioon, Weyl-geometriaan ja Bianchiin. Kaikkien haarojen läpäisy tarkistaa sisäisen konsistenssin ilmoitetuilla premisseillä; se ei ole empiirinen validaatio, biologinen vaste eikä L2:n sulkeutuminen.",
  },
} as const;

const FI_TENSOR_TESTS: Record<string, string> = {
  F_T1: "Nollataustan ensimmäisen kertaluvun tilavuusvaste",
  F_T2: "Avaruudellisen skalaari-reduktion saturaatio",
  F_T3: "Suunnattu tilavuusderivaatta",
  F_T4: "Taajuusriippuvainen SAR",
  F_T5: "Schwanin kalvosuodin",
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const d = locale === "fi" ? COPY.fi : COPY.en;
  return { title: `${d.title} – Extinction Field`, description: d.subtitle };
}

export default async function TensorDerivationPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const fi = locale === "fi";
  const d = fi ? COPY.fi : COPY.en;

  return (
    <main id="main-content">
      <TranslationNotice copy={COPY} locale={locale} />
      <div className="mx-auto max-w-5xl px-6 py-12 sm:py-20">
        <p className="mb-6">
          <Link href={`/${locale}/model/math`} className="text-sm text-accent hover:underline">
            {fi ? "← Takaisin matematiikkaan" : "← Back to mathematics"}
          </Link>
        </p>
        <PageHeader icon={Braces} title={d.title} subtitle={d.subtitle} />
        <CautionBox className="mt-8">{d.caution}</CautionBox>

        <section className="mt-14">
          <LevelHeading level="L0" status={fi ? "PREMISSI" : "PREMISE"} title={fi ? "Metriikka-ansatz" : "Metric ansatz"} />
          <FormulaBlock lines={[
            "g_mu_nu = eta_mu_nu + kappa A_mu A_nu",
            "eta = diag(-1,+1,+1,+1)",
          ]} />
          <p className="mt-4 text-sm leading-relaxed text-foreground-muted">
            <InlineReferenceText
              locale={locale}
              text={fi
                ? "Tämä on [[ref:lindgren2025|Lindgrenin, Kovacsin ja Liukkosen (2025)]] julkaistu lähtökohta, ei BERM:n johtama tulos."
                : "This is the published starting point of [[ref:lindgren2025|Lindgren, Kovacs and Liukkonen (2025)]], not a result derived by BERM."}
            />
          </p>
        </section>

        <section className="mt-14">
          <LevelHeading level="L1" status={fi ? "EHDOLLINEN ALGEBRA" : "CONDITIONAL ALGEBRA"} title={fi ? "Käänteismetriikka ja determinantti" : "Inverse metric and determinant"} />
          <FormulaBlock lines={[
            "A^2 = eta^(mu nu) A_mu A_nu",
            "g^(mu nu) = eta^(mu nu) - kappa A^mu A^nu / (1 + kappa A^2)",
            "det(g) = -(1 + kappa A^2)",
            "sqrt(-det g) = sqrt(1 + kappa A^2)",
          ]} />
          <p className="mt-4 text-sm leading-relaxed text-foreground-muted">
            {fi
              ? "Käänteismetriikka vaatii 1 + kappa A² ≠ 0. Reaalinen Lorentz-tilavuuselementti vaatii vahvemman ehdon 1 + kappa A² > 0. A² ei ole euklidinen itseisarvo, joten aika- ja avaruustyyppisiä potentiaaleja ei saa yhdistää samaan |A|-kaavaan ilman lisäreduktiota."
              : "The inverse requires 1 + kappa A² ≠ 0. A real Lorentzian volume element requires the stronger condition 1 + kappa A² > 0. A² is not a Euclidean magnitude, so timelike and spacelike potentials cannot be merged into one |A| formula without an additional reduction."}
          </p>
        </section>

        <section className="mt-14">
          <LevelHeading level="L1 + L2 boundary" status={fi ? "JOHDETTU SUUNTA · AVOIN PROJEKTIO" : "DERIVED DIRECTION · OPEN PROJECTION"} title={fi ? "Perturbaatio ja tilavuusherkkyys" : "Perturbation and volume sensitivity"} />
          <FormulaBlock lines={[
            "delta_g = kappa(A_bio⊗a + a⊗A_bio + a⊗a)",
            "h = kappa(A_bio⊗a + a⊗A_bio)  [first order]",
            "D_u sqrt(-det g) = kappa (A·u) / sqrt(1 + kappa A^2)",
            "L2 spatial/scalar choice: q = |A_bar| := sqrt(kappa)s",
            "L1 algebraic formula: chi_geo(q) = q / sqrt(1 + q^2); evaluate chi_geo(|A_bar|) only after that L2 choice",
          ]} />
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <InfoCard
              title={fi ? "Lorentzinen L1-tulos" : "Lorentzian L1 result"}
              text={fi ? "Eksakti tensorilaajennus ja geodeesipoikkeaman suunnattu tilavuusvaste seuraavat ansatzista L1-tuloksina. Lorentzin geometriassa osoittaja säilyy allekirjoitettuna kontraktiona kappa A·u; sitä ei korvata itseisarvolla ennen eksplisiittistä reduktiota." : "The exact tensor expansion and the directional volume response from geodesic deviation follow from the ansatz as L1 results. In Lorentzian geometry the numerator remains the signed contraction kappa A·u; it is not replaced by an absolute value before an explicit reduction."}
            />
            <InfoCard
              title={fi ? "L2 · Spatiaalinen skalaari-reduktio" : "L2 · Spatial scalar reduction"}
              text={fi ? "Positiivisen q=|A_bar|-koordinaatin valinta vaatii dimensiottoman, kollineaarisen Lorentz→Euklidisen spatiaaliprojektion ja on L2-askel. Suunnattu derivaatta evaluoi sen jälkeen aina L1:nä pysyvän kaavan muodossa chi_geo(|A_bar|). Kalvo- tai ambient-suureen normalisointi tähän koordinaattiin on vielä erillinen avoin L0→L2-silta." : "Selecting the positive coordinate q=|A_bar| requires a dimensionless, collinear Lorentz-to-Euclidean spatial projection and is an L2 step. The directional derivative then evaluates the always-L1 formula as chi_geo(|A_bar|). Normalizing a membrane or ambient quantity to this coordinate is another open L0→L2 bridge."}
            />
          </div>
        </section>

        <section id="variational-gme" className="mt-14 scroll-mt-24">
          <LevelHeading
            level="L1"
            status="FORMAL RESIDUAL CONTRACT"
            title={fi ? "1 · Variaatioperiaate, harmoninen metriikka ja GME" : "1 · Variational principle, harmonic metric and GME"}
          />
          <FormulaBlock lines={[
            "S_EH[A] = integral sqrt(-det g(A)) R_LC[g(A)] d^4x",
            "R_EH^mu := delta S_EH / delta A_mu",
            "R_EH^mu = -2 kappa sqrt(-det g) G_LC^(mu nu) A_nu = 0",
            "S_GME[g,nabla_hat] = integral <nabla_hat g, nabla_hat g>_g sqrt(|det g|) d^4x",
            "Box_div T := nabla_hat_sigma(g^(sigma rho) nabla_hat_rho T)",
            "content-bound full Euler-Lagrange attestation for the declared action scope = required",
            "R_harm_mu_nu := Box_div g_mu_nu",
            "R_eta_mu_nu := Box_div eta_mu_nu",
            "R_outer_mu_nu := Box_div(kappa A_mu A_nu) = kappa R_GME_mu_nu",
            "R_GME_mu_nu = A_nu Box_div A_mu + A_mu Box_div A_nu",
            "  + g^(sigma rho)[(nabla_sigma A_nu)(nabla_rho A_mu)",
            "                   + (nabla_sigma A_mu)(nabla_rho A_nu)]]",
            "R_decomp := R_harm - R_eta - R_outer = 0",
            "R_harm = R_outer only under the separately checked condition R_eta=0",
            "variational_check := bound full_EL attestation AND R_EH=0 AND R_harm=0",
            "  AND R_outer=0 AND R_eta=0 AND R_decomp=0",
          ]} />
          <p className="mt-4 text-sm leading-relaxed text-foreground-muted">
            {fi
              ? "Einstein–Hilbert-vaikutus ja lähteen metric-gradient/GME-vaikutus ovat rinnakkaiset L0-premissit, eivät yksi toisesta johdettuja vaiheita. EH-residuaali lasketaan annetusta A:sta ja annetusta symmetrisestä Einstein-tensorista; tämä numeerinen API ei rekonstruoi Einstein-tensoria metriikan toisista derivaatoista. GME-haara käyttää lukittua Weyl-divergenssioperaattoria. Täyden variaation attestaatiot sidotaan koko numeerisen syötenipun SHA-256-tiivisteeseen, mutta ne ovat edelleen kutsujan todistusaineistoa eivätkä itsenäinen symbolinen johto. Harmonic-, tausta-, ulkotulo- ja hajotelmaresiduaalit pidetään erillään."
              : "The Einstein–Hilbert action and the source's metric-gradient/GME action are parallel L0 premises, not stages derived from one another. The EH residual is computed from the supplied A and supplied symmetric Einstein tensor; this numerical API does not reconstruct the Einstein tensor from second metric derivatives. The GME branch uses the locked Weyl divergence operator. Full-variation attestations are bound to the SHA-256 digest of the complete numerical input bundle, but remain caller evidence rather than an independent symbolic derivation. Harmonic, background, outer-product and decomposition residuals remain separate."}
          </p>
          <p className="mt-3 text-xs leading-relaxed text-foreground-muted">
            {fi
              ? "Merkintä Box_div tarkoittaa tässä lukittua operaattoria nabla_hat_sigma(g^(sigma rho)nabla_hat_rho); sitä ei pidä sekoittaa edellä käytettyyn metriikan perturbaatioon delta g_mu_nu."
              : "Here Box_div denotes the locked operator nabla_hat_sigma(g^(sigma rho)nabla_hat_rho); it must not be confused with the metric perturbation delta g_mu_nu used above."}
          </p>
        </section>

        <section id="weyl-semimetry" className="mt-14 scroll-mt-24">
          <LevelHeading
            level="L1"
            status="FORMAL RESIDUAL CONTRACT"
            title={fi ? "2 · Weyl-semimetrisyys ja Weyl-yhteys" : "2 · Weyl semimetry and Weyl connection"}
          />
          <FormulaBlock lines={[
            "Q_sigma_mu_nu := tilde_nabla_sigma g_mu_nu - 2 phi_sigma g_mu_nu",
            "Weyl-semimetry contract: Q_sigma_mu_nu = 0",
            "T^lambda_mu_nu := tilde_Gamma^lambda_mu_nu - tilde_Gamma^lambda_nu_mu = 0",
            "tilde_Gamma^lambda_mu_nu = {lambda_mu_nu}_LC",
            "  - delta^lambda_mu phi_nu - delta^lambda_nu phi_mu",
            "  + g_mu_nu phi^lambda",
            "R_Weyl := supplied tilde_Gamma - reconstructed tilde_Gamma(g,phi) = 0",
          ]} />
          <p className="mt-4 text-sm leading-relaxed text-foreground-muted">
            {fi
              ? "Weyl-semimetrisyys ei ole Bianchin seuraus vaan vuoden 2025 muotoilun erillinen geometrinen rakenne. Portti tarkistaa Q=0:n lisäksi torsion nollaksi ja vertaa annettua yhteyttä suoraan g:stä, sen Levi–Civita-yhteydestä ja phi:stä rekonstruoituun Weyl-yhteyteen. Näin väärä ei-symmetrinen yhteys ei voi läpäistä porttia pelkän Q=0:n avulla."
              : "Weyl semimetry is not a consequence of Bianchi but a separate geometric structure in the 2025 formulation. In addition to Q=0, the gate checks zero torsion and compares the supplied connection directly with the Weyl connection reconstructed from g, its Levi–Civita connection and phi. A wrong nonsymmetric connection therefore cannot pass through Q=0 alone."}
          </p>
        </section>

        <section id="bianchi-df" className="mt-14 scroll-mt-24">
          <LevelHeading
            level="L1 IDENTITY"
            status="FORMAL RESIDUAL CONTRACT"
            title={fi ? "3 · Kontraktoitu Bianchi ja erillinen dF-identiteetti" : "3 · Contracted Bianchi and the separate dF identity"}
          />
          <FormulaBlock lines={[
            "R_B^nu := nabla_mu^LC G_LC^(mu nu) = 0  [contracted Bianchi]",
            "F_mu_nu := partial_mu A_nu - partial_nu A_mu  (F = dA)",
            "R_F_mu_nu := F_mu_nu - (partial_mu A_nu - partial_nu A_mu) = 0",
            "R_dF_lambda_mu_nu := partial_lambda F_mu_nu",
            "  + partial_mu F_nu_lambda + partial_nu F_lambda_mu",
            "homogeneous contract: R_dF = dF = d(dA) = 0",
            "for a torsion-free connection: equivalently nabla_[lambda F_mu_nu] = 0",
          ]} />
          <p className="mt-4 text-sm leading-relaxed text-foreground-muted">
            {fi
              ? "contracted_bianchi_residual tarkistaa annetun LC-divergenssivektorin nollaehtoa; numeerinen API ei rakenna sitä metriikan toisista derivaatoista. F-definition-residuaali sitoo F:n samaan annettuun partial A:han, ja syklinen ulkoderivaatta tarkistaa annetun partial F:n dF=0:n. LC- ja partial-F-attestaatiot sidotaan täsmälleen samaan syötenipputiivisteeseen. Tämä on auditoitava ehdollinen input-sopimus, ei riippumaton differentiaaligeometrinen todistus. Mikään ehdoista ei yksin sisällä lähdevirtaa J."
              : "contracted_bianchi_residual checks the supplied LC-divergence vector for zero; the numerical API does not construct it from second metric derivatives. The F-definition residual binds F to the same supplied partial A, and the cyclic exterior derivative checks dF=0 for the supplied partial F. The LC and partial-F attestations are bound to the exact same input-bundle digest. This is an auditable conditional input contract, not an independent differential-geometric proof. None of the conditions alone contains the source current J."}
          </p>
        </section>

        <section id="maxwell-dependency" className="mt-14 scroll-mt-24">
          <LevelHeading
            level="SOURCE BOUNDARY"
            status={fi ? "RIIPPUVUUSSOPIMUS" : "DEPENDENCY CONTRACT"}
            title={fi ? "Mitä Bianchi antaa — ja mitä lähteellinen raja lisäksi vaatii" : "What Bianchi supplies—and what the sourced limit additionally requires"}
          />
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <InfoCard
              title={fi ? "Homogeeninen sektori" : "Homogeneous sector"}
              text={fi ? "∇^LC G_LC=0 sekä F=dA ⇒ dF=0 ovat eri residuaalisopimuksia ja käyttävät nimettyä yhteysprovenienssia. dF=0 sulkee vain homogeeniset Maxwell-yhtälöt; kumpikaan ei yksin tuota sähkövirtaa tai varaustiheyttä." : "∇^LC G_LC=0 and F=dA ⇒ dF=0 are distinct residual contracts with named connection provenance. dF=0 closes only the homogeneous Maxwell equations; neither one alone produces electric current or charge density."}
            />
            <InfoCard
              title={fi ? "Lähteellinen sektori" : "Sourced sector"}
              text={fi ? "Vuoden 2025 lähteen Maxwell-raja tarvitsee lisäksi variaatioperiaatteen, R_GME=0-harmonisuusehdon, Q=0-Weyl-rakenteen sekä potentiaalia, Weylin yksi-muotoa ja lähdettä koskevat identifikaatiot. Se ei seuraa Bianchista yksin." : "The 2025 source's Maxwell limit additionally requires the variational principle, the R_GME=0 harmonicity condition, the Q=0 Weyl structure, and identifications relating the potential, Weyl one-form and source. It does not follow from Bianchi alone."}
            />
          </div>
          <FormulaBlock lines={[
            "Bianchi branch: R_B=nabla^LC G_LC=0 AND R_F=F-dA=0 AND R_dF=0",
            "required gate: variational_check AND weyl_check AND bianchi_check",
            "sourced limit: delta S/delta A=0 + Q=0 + Bianchi + source identifications",
            "invalid shortcut: Bianchi alone =/=> sourced Maxwell equation",
          ]} />
          <p className="mt-4 text-sm leading-relaxed text-foreground-muted">
            {fi
              ? "Kolmeen AND-haaraan ryhmitellyt residuaalit ja attestaatiot tekevät lähteen muodollisen ketjun testattavaksi koodissa. Jokaisella residuaalilla on oma mittakaavansa, atol/rtol-raja ja provenienssi. Läpäisy ei osoita, että geometrinen suure kytkeytyy kudokseen, ionikanavaan tai muuhun biologiseen havaittavaan: tämä on edelleen avoin L2-silta."
              : "Residuals and attestations grouped into the three AND branches make the source's formal chain testable in code. Every residual has its own scale, atol/rtol threshold and provenance. Passing does not establish that a geometric quantity couples to tissue, an ion channel or another biological observable: that remains the open L2 bridge."}
          </p>
        </section>

        <section className="mt-14">
          <LevelHeading level="L2" status={fi ? "FORMALLISOITU · AVOIN" : "FORMALIZED · OPEN"} title={fi ? "Geometria → ionikanava" : "Geometry → ion channel"} />
          <FormulaBlock lines={[
            "L1 formula: chi_geo(q) = q / sqrt(1 + q^2)",
            "L2 spatial/scalar coordinate choice: q = |A_bar|",
            "L0→L2 biological candidate: delta_V_VGCC = C_bridge chi_geo(q) Delta_V_mem(f)",
            "observable: O_r = integral K_r^(mu nu) delta_g_mu_nu dV",
          ]} />
          <p className="mt-4 text-sm leading-relaxed text-foreground-muted">
            {fi
              ? "Algebrallisen chi_geo-kaavan L1-status säilyy myös tässä: empiirinen käyttö ei muuta johdetun tuloksen tasoa. Spatiaalinen itseisarvoprojektio q=|A_bar| on L2-valinta, ja biologinen identifikaatio on erillinen avoin L0→L2-silta. C_bridge/K_r, yksiköt, mittavapaus, kudossiirto, kanavan rakenne ja aktivaatiokynnys eivät seuraa metriikan determinantista eivätkä kolmesta yllä olevasta residuaalisopimuksesta."
              : "The algebraic chi_geo formula retains its L1 status here: empirical use does not reclassify the derived result. The spatial magnitude projection q=|A_bar| is an L2 choice, and biological identification is a separate open L0→L2 bridge. C_bridge/K_r, units, gauge choice, tissue transfer, channel structure and activation threshold follow neither from the metric determinant nor from the three residual contracts above."}
          </p>
        </section>

        <section className="mt-14">
          <LevelHeading level="L1 components / OPEN L2 / L3" status={fi ? "SEKAPROVENIENSSI" : "MIXED PROVENANCE"} title={fi ? "Taajuuspainot, DKC ja terveyspäätepiste" : "Frequency weights, DKC and health endpoint"} />
          <FormulaBlock lines={[
            "candidate mixed-provenance product (NOT L1 as a whole): w_L(f) = SAR_norm(f) × VGCC_coupling(f) × MOD_envelope(f)",
            "L1 components: SAR form/normalization; Schwan DeltaV=1.5 r E g(f); algebraic product/sum identities",
            "OPEN L2: field/geometry -> tissue and channel observable identification",
            "L3 inputs: numerical tissue dielectric/material parameters for SAR; numerical tau_m for Schwan; VGCC_coupling(f), MOD_envelope(f), fitted endpoint weights",
            "supplied E, r and evaluation f remain variables of the L1 forms; the formulas do not relabel them as L3",
            "L3 DKC: BL(t) = alpha(k_B*FS)(t) + (1-alpha)(k_R*FS)(t)",
            "L3 pathways: VGCC / tissue-response mechanisms",
            "L3 Hill endpoint: Delta Health = -gamma BL^n / (x_half^n + BL^n)",
          ]} />
          <p className="mt-4 text-sm leading-relaxed text-foreground-muted">
            {fi
              ? "Koko w_L-tuote ei ole L1-johdettu. SAR-muoto ja -normalisointi ovat L1; vain kudoksen dielektristen/materiaaliparametrien numeeriset arvot ovat L3, eikä annettua E:tä luokitella uudelleen. Schwanin ΔV=1,5rE g(f) on L1; vain τ_m:n numeerinen arvo on L3, eikä r:n, E:n tai f:n esiintyminen muuta kaavan tasoa. Yhdistäminen kudos- tai kanavahavaittavaan on avoin L2; VGCC-kytkentä, modulaatioverho, sovitetut painot ja DKC-biologia ovat L3:a."
              : "The w_L product is not L1-derived as a whole. The SAR form and normalization are L1; only numerical tissue dielectric/material parameters are L3, and supplied E is not relabelled. Schwan ΔV=1.5rE g(f) is L1; only the numerical value of τ_m is L3, and the presence of r, E or f does not change the formula's level. Joining either form to a tissue or channel observable is open L2; VGCC coupling, the modulation envelope, fitted weights and DKC biology are L3."}
          </p>
        </section>

        <section className="mt-14">
          <h2 className="text-xl font-semibold">{fi ? "Ehdolliset tensoritestit" : "Conditional tensor tests"}</h2>
          <div className="mt-5 grid gap-3 md:grid-cols-2">
            {DKC_FRAMEWORK.tensorTests.map((test) => (
              <article key={test.id} className="rounded-xl border border-card-border bg-card-bg p-4">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-sm font-semibold">
                    <span className="mr-2 font-mono-num text-xs text-accent">{test.id}</span>
                    {fi ? FI_TENSOR_TESTS[test.id] : test.name}
                  </h3>
                  <span className="text-[9px] font-semibold uppercase tracking-wide text-foreground-muted">{test.status}</span>
                </div>
                <p className="mt-3 break-words font-mono text-xs leading-relaxed text-foreground-muted">{test.formula}</p>
              </article>
            ))}
          </div>
        </section>

        <div className="mt-14 flex flex-wrap gap-3 border-t border-card-border pt-8">
          <Link href={`/${locale}/model/dual-kernel`} className="rounded-lg border border-card-border bg-card-bg px-4 py-2.5 text-sm font-medium hover:border-accent/40 hover:text-accent">
            {fi ? "DKC-laskenta" : "DKC calculation"} →
          </Link>
          <Link href={`/${locale}/model/frequency-weights`} className="rounded-lg border border-card-border bg-card-bg px-4 py-2.5 text-sm font-medium hover:border-accent/40 hover:text-accent">
            {fi ? "Taajuuspainot" : "Frequency weights"} →
          </Link>
        </div>
      </div>
    </main>
  );
}

function LevelHeading({ level, status, title }: { level: string; status: string; title: string }) {
  return (
    <div>
      <div className="mb-2 flex flex-wrap items-center gap-3">
        <span className="font-mono-num text-xs font-semibold text-accent">{level}</span>
        <span className="rounded-full border border-card-border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-foreground-muted">{status}</span>
      </div>
      <h2 className="text-xl font-semibold">{title}</h2>
    </div>
  );
}

function FormulaBlock({ lines }: { lines: string[] }) {
  return (
    <div className="mt-5 space-y-2 rounded-xl border border-card-border bg-card-bg p-5 font-mono text-xs leading-relaxed sm:text-sm">
      {lines.map((line) => <p key={line} className="break-words">{line}</p>)}
    </div>
  );
}

function InfoCard({ title, text }: { title: string; text: string }) {
  return (
    <article className="rounded-xl border border-card-border bg-card-bg p-5">
      <h3 className="text-sm font-semibold">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-foreground-muted">{text}</p>
    </article>
  );
}
