import { CHAIN_EPISTEMIC_COLORS } from "@/lib/epistemicConstants";
import type { EpistemicLevel } from "@/lib/types";
import { StudyCitation } from "@/components/StudyCitation";
import {
  CORRECTION_REGISTRY,
  CORRECTION_STATUS_LABELS,
  MECHANISM_LEVEL_LABELS,
  type LocalizedText,
} from "@/data/correction_registry";
import { DISCRIMINATING_TESTS, NULL_RESULTS_IN_SCOPE } from "@/data/discriminating_tests";
import { KOCH_2003_EXAMPLE, kochWorkedExample } from "@/lib/mechanism";

type Lang = "en" | "fi";

interface ChainStep {
  from: LocalizedText;
  to: LocalizedText;
  assumption: LocalizedText;
  level: EpistemicLevel;
}

const CHAIN: ChainStep[] = [
  {
    from: { en: "Lindgren metric g_μν = η_μν + κA_μA_ν", fi: "Lindgrenin metriikka g_μν = η_μν + κA_μA_ν" },
    to: { en: "δg_μν with an ω and a 2ω component", fi: "δg_μν, jossa ω- ja 2ω-komponentti" },
    assumption: { en: "Algebraic consequence of A = Ā + a cos ωt", fi: "Algebrallinen seuraus, kun A = Ā + a cos ωt" },
    level: "L",
  },
  {
    from: { en: "δg_μν", fi: "δg_μν" },
    to: { en: "Bound-ion Hamiltonian with a modulated gap", fi: "Sidotun ionin Hamiltonin moduloidulla välillä" },
    assumption: { en: "Bound states exist and mix; isotropic binding", fi: "Sidotut tilat ovat olemassa ja sekoittuvat; isotrooppinen sidonta" },
    level: "L1",
  },
  {
    from: { en: "Modulated gap", fi: "Moduloitu väli" },
    to: { en: "Jacobi–Anger expansion → Bessel sidebands J_k(z)", fi: "Jacobi–Anger-laajennus → Bessel-sivukaistat J_k(z)" },
    assumption: { en: "Sufficient phase memory; generic to any driven two-level system", fi: "Riittävä vaihemuisti; yleinen kaikille ajetuille kaksitilajärjestelmille" },
    level: "L1",
  },
  {
    from: { en: "Bessel argument z = λ·(f_c/f)·(b/B₀)", fi: "Bessel-argumentti z = λ·(f_c/f)·(b/B₀)" },
    to: { en: "Amplitude windows b_max, b_null", fi: "Amplitudi-ikkunat b_max, b_null" },
    assumption: { en: "A readout exists and is fixed separately per endpoint", fi: "Lukumekanismi on olemassa ja kiinnitetään erikseen päätepisteittäin" },
    level: "L1",
  },
  {
    from: { en: "Binding-site relaxation τ", fi: "Sidontaympäristön relaksaatio τ" },
    to: { en: "λ(f,τ) from 1 to 2", fi: "λ(f,τ) välillä 1 → 2" },
    assumption: { en: "c = γ — the candidate's own choice, not fixed by the ansatz", fi: "c = γ — kandidaatin oma valinta, ei ansatzin määräämä" },
    level: "KANDIDAATTI",
  },
  {
    from: { en: "λ at 24 Hz with τ = 20 ms", fi: "λ 24 Hz:llä, kun τ = 20 ms" },
    to: { en: "Calmodulin N-terminal time scale", fi: "Kalmoduliinin N-terminaalinen aikaskaala" },
    assumption: { en: "Numerical closeness of two coefficients; not a measurement of a field response", fi: "Kahden kertoimen numeerinen läheisyys; ei kenttävasteen mittaus" },
    level: "L*",
  },
];

const T = {
  en: {
    layers: "Four layers, kept separate",
    layerRows: [
      ["1", "Geometric operator", "Lindgren → δg_μν → Q^μν", "implemented in the tensor derivation"],
      ["2", "Receptor module", "bound ion → phase modulation → Bessel → amplitude", "this module"],
      ["3", "Tissue transfer", "local response → biological endpoint", "coefficients not estimated"],
      ["4", "Population aggregation", "ASFR → TFR", "coefficients not estimated"],
    ],
    layerNote:
      "The receptor module returns a local response candidate and its provenance. It has no TFR output: without a transfer model that names attempts, timing, conception, pregnancy continuation and compensating behaviour, a relative change in a receptor response cannot be placed as a TFR coefficient.",
    chainTitle: "The chain, arrow by arrow",
    chainCols: ["From", "To", "Named assumption", "Level"],
    workedTitle: "Worked example: Bauréus Koch et al. 2003, 24 Hz at 37 µT",
    workedIntro:
      "Every number below is computed live from lib/mechanism.ts in the fixed order u → λ → s → z → J₁. Inputs carry their source.",
    inputs: "Inputs",
    inputRows: (e: typeof KOCH_2003_EXAMPLE) => [
      ["f", `${e.f} Hz`, "Koch 2003 exposure condition [observation]"],
      ["f_c", `${e.f_c} Hz`, "synthesis §15, Ca²⁺ interpretation [candidate input]"],
      ["τ", `${e.tau * 1000} ms`, "Park et al. 2008, calmodulin N-terminal, chemical Ca²⁺ step [observation]"],
      ["B₀", `${(e.B0 * 1e6).toFixed(0)} µT`, "Koch 2003, upper end of the 27–37 µT range [observation]"],
      ["c/γ", `${e.c_gamma}`, "candidate assumption"],
    ],
    outputs: "Outputs",
    outputRows: (w: ReturnType<typeof kochWorkedExample>) => [
      ["u = 2πfτ", w.u.toFixed(5), "L1"],
      ["λ(f,τ)", w.lambda.toFixed(5), "candidate (c = γ)"],
      ["s = λ·f_c/f", w.s.toFixed(5), "argument coefficient"],
      ["|s − 2| / 2", `${(w.coefficientMismatchVs2 * 100).toFixed(2)} %`, "coefficient comparison, not a data fit"],
      ["b_max (first J₁ maximum)", `${(w.b_max * 1e6).toFixed(1)} µT`, "L1 + conditional"],
      ["b_null (first J₁ null)", `${(w.b_null * 1e6).toFixed(1)} µT`, "L1 + conditional"],
      ["τ required for s = 2 exactly", `${(w.tauForSEqual2 * 1000).toFixed(1)} ms`, "reverse calculation — not a blind prediction"],
      ["bare Ca²⁺ cyclotron frequency at 37 µT", `${w.bareCa2CyclotronAtB0.toFixed(2)} Hz`, "for comparison with the 25.2 Hz input"],
    ],
    workedNote:
      "The 25.2 Hz reference frequency is taken from the synthesis. Bare Ca²⁺ at 37 µT gives 28.35 Hz; 25.2 Hz corresponds to B₀ ≈ 32.9 µT for the bare ion, which is inside Koch's reported static-field range. The calmodulin closeness is a numerical compatibility of two argument coefficients and motivates the receptor-structure test below. It does not identify calmodulin as an EMF receptor and it did not predict the 20 ms value.",
    registryTitle: "Correction registry",
    registryIntro:
      "Each claim in the chain with its proper status. The registry extends the tensor-derivation contracts (Maxwell three-premise gate, χ at L1 + L0/L2); it does not replace them.",
    registryCols: ["Claim", "Status", "Description", "Level", "Conditions / note"],
    testsTitle: "Discriminating experiments",
    testsIntro:
      "Six open tests. A positive Bessel-structure result is compatible with phase modulation and is not specific to the metric ansatz; only a prediction whose scale, direction or multi-wave dependence is computed from the ansatz and differs from a competing model at the same biological parameters would be Lindgren-specific.",
    testsCols: ["Test", "Prediction", "Discriminates", "Varied → measured (controlled)", "Ansatz-specific"],
    yes: "yes",
    no: "no",
    nullTitle: "Null results carried with the tests",
    caveat: "Caveat",
  },
  fi: {
    layers: "Neljä kerrosta, pidetty erillään",
    layerRows: [
      ["1", "Geometrinen operaattori", "Lindgren → δg_μν → Q^μν", "toteutettu tensorijohdossa"],
      ["2", "Reseptorimoduuli", "sidottu ioni → vaihemodulaatio → Bessel → amplitudi", "tämä moduuli"],
      ["3", "Kudossiirto", "paikallinen vaste → biologinen päätepiste", "kertoimia ei arvioitu"],
      ["4", "Väestöaggregointi", "ASFR → TFR", "kertoimia ei arvioitu"],
    ],
    layerNote:
      "Reseptorimoduuli palauttaa paikallisen vastekandidaatin ja sen alkuperän. Sillä ei ole TFR-ulostuloa: ilman siirtomallia, joka nimeää yritysten määrän, ajoituksen, hedelmöittymisen, raskauden jatkumisen ja korvaavan käyttäytymisen, reseptorivasteen suhteellista muutosta ei voi sijoittaa TFR-kertoimeksi.",
    chainTitle: "Ketju nuoli nuolelta",
    chainCols: ["Mistä", "Mihin", "Nimetty oletus", "Taso"],
    workedTitle: "Laskuesimerkki: Bauréus Koch ym. 2003, 24 Hz ja 37 µT",
    workedIntro:
      "Jokainen luku lasketaan suoraan lib/mechanism.ts:stä kiinteässä järjestyksessä u → λ → s → z → J₁. Syötteet kantavat lähteensä.",
    inputs: "Syötteet",
    inputRows: (e: typeof KOCH_2003_EXAMPLE) => [
      ["f", `${e.f} Hz`, "Kochin 2003 altistusehto [havainto]"],
      ["f_c", `${e.f_c} Hz`, "synteesi §15, Ca²⁺-tulkinta [kandidaatin syöte]"],
      ["τ", `${e.tau * 1000} ms`, "Park ym. 2008, kalmoduliinin N-terminaali, kemiallinen Ca²⁺-askel [havainto]"],
      ["B₀", `${(e.B0 * 1e6).toFixed(0)} µT`, "Koch 2003, 27–37 µT -alueen yläpää [havainto]"],
      ["c/γ", `${e.c_gamma}`, "kandidaatin oletus"],
    ],
    outputs: "Ulostulot",
    outputRows: (w: ReturnType<typeof kochWorkedExample>) => [
      ["u = 2πfτ", w.u.toFixed(5), "L1"],
      ["λ(f,τ)", w.lambda.toFixed(5), "kandidaatti (c = γ)"],
      ["s = λ·f_c/f", w.s.toFixed(5), "argumenttikerroin"],
      ["|s − 2| / 2", `${(w.coefficientMismatchVs2 * 100).toFixed(2).replace(".", ",")} %`, "kertoimien vertailu, ei datasovitus"],
      ["b_max (J₁:n ensimmäinen maksimi)", `${(w.b_max * 1e6).toFixed(1).replace(".", ",")} µT`, "L1 + ehdollinen"],
      ["b_null (J₁:n ensimmäinen nolla)", `${(w.b_null * 1e6).toFixed(1).replace(".", ",")} µT`, "L1 + ehdollinen"],
      ["τ, jolla s = 2 täsmälleen", `${(w.tauForSEqual2 * 1000).toFixed(1).replace(".", ",")} ms`, "käänteislasku — ei sokkoennuste"],
      ["paljaan Ca²⁺:n syklotronitaajuus 37 µT:ssa", `${w.bareCa2CyclotronAtB0.toFixed(2).replace(".", ",")} Hz`, "vertailuksi 25,2 Hz:n syötteelle"],
    ],
    workedNote:
      "Vertailutaajuus 25,2 Hz on otettu synteesistä. Paljas Ca²⁺ 37 µT:ssa antaa 28,35 Hz; 25,2 Hz vastaa paljaalle ionille B₀ ≈ 32,9 µT, joka on Kochin ilmoittaman staattisen kentän alueella. Kalmoduliinin läheisyys on kahden argumenttikertoimen numeerinen yhteensopivuus ja motivoi alla olevaa reseptorin rakennetestiä. Se ei osoita kalmoduliinia EMF-reseptoriksi eikä ennustanut 20 ms:n arvoa.",
    registryTitle: "Korjausrekisteri",
    registryIntro:
      "Jokainen ketjun väite oikeassa asemassaan. Rekisteri laajentaa tensorijohdon sopimuksia (Maxwellin kolmen premissin portti, χ tasolla L1 + L0/L2); se ei korvaa niitä.",
    registryCols: ["Väite", "Status", "Kuvaus", "Taso", "Ehdot / huomautus"],
    testsTitle: "Erottelevat kokeet",
    testsIntro:
      "Kuusi avointa testiä. Positiivinen Bessel-rakennetulos on yhteensopiva vaihemodulaation kanssa eikä spesifinen metriikan ansatzille; Lindgren-spesifinen olisi vain ennuste, jonka mittakaava, suunta- tai moniaaltoriippuvuus on laskettu ansatzista ja joka poikkeaa kilpailevasta mallista samoilla biologisilla parametreilla.",
    testsCols: ["Testi", "Ennuste", "Erottaa", "Vaihdellaan → mitataan (kontrolloidaan)", "Ansatz-spesifinen"],
    yes: "kyllä",
    no: "ei",
    nullTitle: "Testien rinnalla kulkevat nollatulokset",
    caveat: "Varaus",
  },
};

function Badge({ level }: { level: EpistemicLevel }) {
  const color = CHAIN_EPISTEMIC_COLORS[level] ?? "#6B7280";
  return (
    <span className="rounded-full px-1.5 py-0.5 text-xs font-semibold whitespace-nowrap" style={{ backgroundColor: `${color}20`, color }}>
      {level}
    </span>
  );
}

const TH = "py-2 pr-3 font-semibold text-left";
const TD = "py-2 pr-3 align-top";

export function MechanismCandidate({ locale }: { locale: string }) {
  const lang: Lang = locale === "fi" ? "fi" : "en";
  const t = T[lang];
  const worked = kochWorkedExample();

  return (
    <div className="space-y-10">
      <div>
        <h4 className="text-sm font-semibold text-foreground mb-3">{t.layers}</h4>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <tbody>
              {t.layerRows.map((row) => (
                <tr key={row[0]} className="border-b border-card-border/40">
                  <td className={`${TD} font-mono-num text-accent`}>{row[0]}</td>
                  <td className={`${TD} font-medium text-foreground`}>{row[1]}</td>
                  <td className={`${TD} font-mono text-foreground-muted`}>{row[2]}</td>
                  <td className={`${TD} text-foreground-muted`}>{row[3]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-foreground-muted mt-3 max-w-3xl leading-relaxed">{t.layerNote}</p>
      </div>

      <div>
        <h4 className="text-sm font-semibold text-foreground mb-3">{t.chainTitle}</h4>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-card-border text-foreground-muted">
                {t.chainCols.map((c) => (
                  <th key={c} className={TH}>{c}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {CHAIN.map((step, i) => (
                <tr key={i} className="border-b border-card-border/40">
                  <td className={`${TD} text-foreground`}>{step.from[lang]}</td>
                  <td className={`${TD} text-foreground`}>{step.to[lang]}</td>
                  <td className={`${TD} text-foreground-muted`}>{step.assumption[lang]}</td>
                  <td className={TD}><Badge level={step.level} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div>
        <h4 className="text-sm font-semibold text-foreground mb-1">{t.workedTitle}</h4>
        <p className="text-xs text-foreground-muted mb-3 max-w-3xl leading-relaxed">
          {t.workedIntro}{" "}
          {KOCH_2003_EXAMPLE.referenceIds.map((id, i) => (
            <span key={id}>{i > 0 ? " · " : ""}<StudyCitation referenceId={id} locale={lang} /></span>
          ))}
        </p>
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <h5 className="text-xs font-semibold uppercase tracking-wider text-accent mb-2">{t.inputs}</h5>
            <table className="w-full text-xs">
              <tbody>
                {t.inputRows(KOCH_2003_EXAMPLE).map((row) => (
                  <tr key={row[0]} className="border-b border-card-border/40">
                    <td className={`${TD} font-mono text-foreground`}>{row[0]}</td>
                    <td className={`${TD} font-mono-num text-foreground`}>{row[1]}</td>
                    <td className={`${TD} text-foreground-muted`}>{row[2]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div>
            <h5 className="text-xs font-semibold uppercase tracking-wider text-accent mb-2">{t.outputs}</h5>
            <table className="w-full text-xs">
              <tbody>
                {t.outputRows(worked).map((row) => (
                  <tr key={row[0]} className="border-b border-card-border/40">
                    <td className={`${TD} text-foreground`}>{row[0]}</td>
                    <td className={`${TD} font-mono-num text-foreground`}>{row[1]}</td>
                    <td className={`${TD} text-foreground-muted`}>{row[2]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <p className="text-xs text-foreground-muted mt-3 max-w-3xl leading-relaxed">{t.workedNote}</p>
      </div>

      <div>
        <h4 className="text-sm font-semibold text-foreground mb-1">{t.registryTitle}</h4>
        <p className="text-xs text-foreground-muted mb-3 max-w-3xl leading-relaxed">{t.registryIntro}</p>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-card-border text-foreground-muted">
                {t.registryCols.map((c) => (
                  <th key={c} className={TH}>{c}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {CORRECTION_REGISTRY.map((e) => (
                <tr key={e.id} className="border-b border-card-border/40">
                  <td className={`${TD} font-medium text-foreground`}>{e.claim[lang]}</td>
                  <td className={`${TD} text-foreground`}>{CORRECTION_STATUS_LABELS[e.status][lang]}</td>
                  <td className={`${TD} text-foreground-muted`}>{e.description[lang]}</td>
                  <td className={`${TD} text-foreground-muted`}>
                    <span className="font-mono">{e.epistemicLevel}</span>
                    <span className="block text-[10px] text-foreground-muted/70">{MECHANISM_LEVEL_LABELS[e.epistemicLevel][lang]}</span>
                  </td>
                  <td className={`${TD} text-foreground-muted`}>
                    {e.conditions?.length ? <span className="block">{e.conditions.map((c) => c[lang]).join("; ")}</span> : null}
                    {e.note ? <span className="block italic">{e.note[lang]}</span> : null}
                    {e.referenceIds?.length ? (
                      <span className="block">
                        {e.referenceIds.map((id, i) => (
                          <span key={id}>{i > 0 ? ", " : ""}<StudyCitation referenceId={id} locale={lang} /></span>
                        ))}
                      </span>
                    ) : null}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div>
        <h4 className="text-sm font-semibold text-foreground mb-1">{t.testsTitle}</h4>
        <p className="text-xs text-foreground-muted mb-3 max-w-3xl leading-relaxed">{t.testsIntro}</p>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-card-border text-foreground-muted">
                {t.testsCols.map((c) => (
                  <th key={c} className={TH}>{c}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {DISCRIMINATING_TESTS.map((test) => (
                <tr key={test.id} className="border-b border-card-border/40">
                  <td className={`${TD} font-medium text-foreground`}>
                    {test.name[lang]}
                    <span className="block text-[10px] font-mono text-foreground-muted/70">{test.epistemicLevel}</span>
                  </td>
                  <td className={`${TD} text-foreground-muted`}>{test.prediction[lang]}</td>
                  <td className={`${TD} text-foreground-muted`}>{test.discriminates[lang]}</td>
                  <td className={`${TD} font-mono text-foreground-muted`}>
                    {test.parameters.independent.join(", ")} → {test.parameters.dependent.join(", ")}
                    <span className="block text-[10px]">({test.parameters.controlled.join(", ")})</span>
                    {test.caveat ? <span className="block font-sans italic mt-1">{t.caveat}: {test.caveat[lang]}</span> : null}
                  </td>
                  <td className={`${TD} text-foreground`}>{test.lindgrenSpecific ? t.yes : t.no}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <h5 className="text-xs font-semibold uppercase tracking-wider text-accent mt-6 mb-2">{t.nullTitle}</h5>
        {NULL_RESULTS_IN_SCOPE.map((n) => (
          <p key={n.referenceId} className="text-xs text-foreground-muted max-w-3xl leading-relaxed">
            <StudyCitation referenceId={n.referenceId} locale={lang} /> — {n.endpoint[lang]}. {n.reading[lang]}
          </p>
        ))}
      </div>
    </div>
  );
}
