"use client";

const t = {
  en: {
    title: "Statistical Validation (v18)",
    subtitle:
      "Systematic model comparison, decomposition analysis, synthetic falsification, and rollout event study. All results are reported regardless of whether they strengthen or weaken BERM — this is the epistemic core of the project.",

    ph1Title: "Phase 1: Model Comparison (LOOCV)",
    ph1Desc:
      "Leave-One-Country-Out Cross-Validation across 57 countries. Each model is calibrated on 56 countries and predicts the left-out country's TFR. Lower RMSE = better out-of-sample prediction.",
    ph1M0: "M0 — Demographic null (no EMF)",
    ph1M1: "M1 — Current BERM (cumulative EMF + cohort weighting)",
    ph1M2: "M2 — Exponential decay weighted exposure",
    ph1M3: "M3 — Free-form B-spline lag weights",
    ph1Note:
      "M1 (BERM) beats the null model by 16% in out-of-sample prediction. M3 (data-driven lag weights) achieves comparable performance, which is expected since B-splines can approximate the cumulative weighting. M2 performs poorly because pure exponential decay loses the cumulative signal.",

    ph2Title: "Phase 2: Reversible / Persistent Decomposition",
    ph2Desc:
      "State-space model separating EMF damage into a reversible component (decays with half-life) and a persistent component (accumulates). q = fraction reversible, ρ = recovery rate.",
    ph2Param: "Parameter",
    ph2Value: "Value",
    ph2Interp: "Interpretation",
    ph2Row1: ["Best q (reversible fraction)", "0.80", "80% of effect is reversible"],
    ph2Row2: ["Best ρ (recovery rate)", "0.90", "Reversible component decays with 9.5-year half-life"],
    ph2Row3: ["R+P RMSE", "0.9755", "Beats M1 (1.0073) by ~3%"],
    ph2Note:
      "The R+P model finds that most of the EMF effect is reversible with a ~10-year half-life — only 20% is truly persistent. This has implications: if EMF exposure were reduced, ~80% of the fertility effect could recover within a decade. This is scientifically important but also means BERM's cumulative assumption slightly overestimates long-term damage.",

    ph3Title: "Phase 3: Synthetic Falsification",
    ph3Desc:
      "Seven synthetic worlds test whether BERM gives correct answers on data where the ground truth is known.",
    ph3Scenario: "Scenario",
    ph3Truth: "Ground truth",
    ph3Result: "Result",
    ph3Correct: "Correct",
    ph3S0: ["S0: No EMF effect", "Null should win", "Null wins"],
    ph3S1: ["S1: Linear EMF dose-response", "BERM should win", "BERM wins"],
    ph3S2: ["S2: Threshold EMF effect", "BERM should win", "BERM wins"],
    ph3S3: ["S3: Cumulative EMF effect", "BERM should win", "BERM wins"],
    ph3S4: ["S4: Delayed onset", "BERM should win", "BERM wins"],
    ph3S5: ["S5: Confounder (urbanization drives TFR decline, correlated with EMF)", "Null should win", "BERM wins"],
    ph3S6: ["S6: Reverse causation", "Null should win", "Null wins"],
    ph3Note:
      "6 of 7 tests pass. S5 is a FAILURE: when urbanization drives TFR decline and happens to correlate with EMF rollout, BERM incorrectly detects an EMF effect. This is a known limitation of cross-sectional ecological data — temporal confounders that correlate with EMF cannot be distinguished without an exogenous instrument.",
    ph3Pass: "PASS",
    ph3Fail: "FAIL",

    ph3bTitle: "Placebo & Wrong-Lag Tests",
    ph3bPlacebo:
      "Placebo rollout test: shuffling 4G launch years across countries destroys the signal (p = 0.000, n = 200 permutations). The original timing produces a significantly lower RMSE than random reassignment.",
    ph3bWrongLag:
      "Wrong-lag test: shifting exposure timing by ±5 years produces the best fit at shift = 0 (no shift). If BERM were fitting noise, there would be no reason for the correct timing to produce the best result.",

    ph5Title: "Phase 5: 4G Rollout Event Study",
    ph5Desc:
      "Staggered-difference event study using variation in 4G launch years across 57 countries. Event time τ = calendar year − T_4G(country). BERM predicts: β_τ < 0 for τ > 0 (TFR drops after rollout), β_τ ≈ 0 for τ < 0 (no effect before rollout).",
    ph5PreTrend: "Pre-trend (|β|)",
    ph5PostEffect: "Post-effect (β)",
    ph5PreOk: "Pre-trend clean?",
    ph5Yes: "Yes",
    ph5No: "No",
    ph5Note:
      "The event study finds post-rollout TFR decline (−0.076/yr average in years 1–5 after 4G), but the pre-trend is not clean — TFR was already declining at comparable rates before 4G rollout. This means the 4G event cannot be isolated as a clean shock. The pre-trend likely reflects ongoing demographic transition, increasing smartphone use before formal 4G launch, and secular fertility decline trends. This result does NOT confirm a causal rollout effect.",

    summTitle: "Summary",
    summStrengths: "What the statistics show",
    summS1: "BERM (M1) outperforms the demographic null in cross-validated prediction (RMSE 1.01 vs 1.27)",
    summS2: "The EMF signal survives placebo permutation (p < 0.005) and wrong-lag falsification",
    summS3: "R+P decomposition suggests ~80% of the effect is reversible (half-life ~10 years)",
    summS4: "BERM correctly rejects S0 (no effect) and S6 (reverse causation) synthetic worlds",
    summWeaknesses: "What the statistics do not show",
    summW1: "S5 failure: BERM cannot distinguish EMF from correlated confounders (urbanization, development) in ecological data",
    summW2: "Event study pre-trend: 4G rollout is not a clean quasi-experiment for TFR",
    summW3: "57-country cross-section provides no causal identification — only predictive fit",
    summW4: "Phase 4 (ASFR cohort model) and within-country panel analysis remain unimplemented",
  },
  fi: {
    title: "Tilastollinen validointi (v18)",
    subtitle:
      "Systemaattinen mallivertailu, dekomponointi, synteettinen falsifiointi ja kayttoonottotapahtumatutkimus. KAIKKI tulokset raportoidaan riippumatta siita, vahvistavatko vai heikentavatko ne BERM:aa — tama on projektin episteeminen ydin.",

    ph1Title: "Vaihe 1: Mallivertailu (LOOCV)",
    ph1Desc:
      "Leave-One-Country-Out ristiinvalidointi 57 maalle. Kukin malli kalibroidaan 56 maalla ja ennustaa pois jatetyn maan TFR:n. Matalampi RMSE = parempi otoksen ulkopuolinen ennuste.",
    ph1M0: "M0 — Demografinen nollahypoteesi (ei EMF:aa)",
    ph1M1: "M1 — Nykyinen BERM (kumulatiivinen EMF + kohorttipainotus)",
    ph1M2: "M2 — Eksponentiaalinen vaimenemispainotettu altistus",
    ph1M3: "M3 — Vapaamuotoinen B-spline-viivepainotus",
    ph1Note:
      "M1 (BERM) voittaa nollamallin 16 % otoksen ulkopuolisessa ennusteessa. M3 (dataohjatuilla viivepainoilla) saavuttaa vertailukelpoisen suorituskyvyn, mika on odotettua koska B-splinet voivat approksimoida kumulatiivista painotusta. M2 suoriutuu huonosti koska puhdas eksponentiaalinen vaimeneminen kadottaa kumulatiivisen signaalin.",

    ph2Title: "Vaihe 2: Palautuva / pysyva dekomponointi",
    ph2Desc:
      "Tilaavaruusmalli joka erottelee EMF-vaurion palautuvaan komponenttiin (vaimeneminen puoliintumisajalla) ja pysyvaan komponenttiin (kumuloituu). q = palautuva osuus, ρ = palautumisnopeus.",
    ph2Param: "Parametri",
    ph2Value: "Arvo",
    ph2Interp: "Tulkinta",
    ph2Row1: ["Paras q (palautuva osuus)", "0,80", "80 % vaikutuksesta on palautuvaa"],
    ph2Row2: ["Paras ρ (palautumisnopeus)", "0,90", "Palautuva komponentti vaimeneminen 9,5 v puoliintumisajalla"],
    ph2Row3: ["R+P RMSE", "0,9755", "Voittaa M1:n (1,0073) ~3 %"],
    ph2Note:
      "R+P-malli loytyy, etta suurin osa EMF-vaikutuksesta on palautuvaa ~10 vuoden puoliintumisajalla — vain 20 % on pysyvaa. Talla on seurauksia: jos EMF-altistus vahenisi, ~80 % hedelmallisyysvaikutuksesta voisi palautua vuosikymmenessa. Tama on tieteellisesti tarkeaa, mutta tarkoittaa myos etta BERM:n kumulatiivinen oletus yliarvioi lievästi pitkaaikaista vaurioita.",

    ph3Title: "Vaihe 3: Synteettinen falsifiointi",
    ph3Desc:
      "Seitseman synteettista maailmaa testaavat antaako BERM oikeat vastaukset datalla jossa perimmäinen totuus on tunnettu.",
    ph3Scenario: "Skenaario",
    ph3Truth: "Perimmäinen totuus",
    ph3Result: "Tulos",
    ph3Correct: "Oikein",
    ph3S0: ["S0: Ei EMF-vaikutusta", "Nollamallin pitaisi voittaa", "Nollamalli voittaa"],
    ph3S1: ["S1: Lineaarinen EMF-annosriste", "BERM:n pitaisi voittaa", "BERM voittaa"],
    ph3S2: ["S2: Kynnys-EMF-vaikutus", "BERM:n pitaisi voittaa", "BERM voittaa"],
    ph3S3: ["S3: Kumulatiivinen EMF-vaikutus", "BERM:n pitaisi voittaa", "BERM voittaa"],
    ph3S4: ["S4: Viivästynyt alku", "BERM:n pitaisi voittaa", "BERM voittaa"],
    ph3S5: ["S5: Sekoittaja (kaupungistuminen ohjaa TFR-laskua, korreloi EMF:n kanssa)", "Nollamallin pitaisi voittaa", "BERM voittaa"],
    ph3S6: ["S6: Käänteisvaikutus", "Nollamallin pitaisi voittaa", "Nollamalli voittaa"],
    ph3Note:
      "6/7 testia lapaistaan. S5 on EPAONNISTUMINEN: kun kaupungistuminen ohjaa TFR-laskua ja sattuu korreloimaan EMF-kayttoonoton kanssa, BERM havaitsee virheellisesti EMF-vaikutuksen. Tama on tunnettu poikkileikkausekologisen datan rajoitus — ajalliset sekoittajat jotka korreloivat EMF:n kanssa ei voida erottaa ilman eksogeenista instrumenttia.",
    ph3Pass: "OIKEIN",
    ph3Fail: "EPAONNISTUI",

    ph3bTitle: "Plasebo- ja vaaranviive-testit",
    ph3bPlacebo:
      "Plasebokayttoonottotesti: 4G-lanseerausvuosien sekoittaminen maiden valilla tuhoaa signaalin (p = 0,000, n = 200 permutaatiota). Alkuperainen ajoitus tuottaa merkitsevasti matalamman RMSE:n kuin satunnainen uudelleensijoitus.",
    ph3bWrongLag:
      "Vaaranviivetesti: altistuksen ajoituksen siirtaminen ±5 vuodella tuottaa parhaan sovitteen siirrolla = 0 (ei siirtoa). Jos BERM sovittaisi kohinaa, oikealle ajoitukselle ei olisi syyta tuottaa parasta tulosta.",

    ph5Title: "Vaihe 5: 4G-kayttoonoton tapahtumatutkimus",
    ph5Desc:
      "Porrastettu erotustapahtumatutkimus kayttaen 4G-lanseerausvuosien vaihtelua 57 maassa. Tapahtuma-aika τ = kalenterivuosi − T_4G(maa). BERM ennustaa: β_τ < 0 kun τ > 0 (TFR laskee kayttoonoton jalkeen), β_τ ≈ 0 kun τ < 0 (ei vaikutusta ennen kayttoonottoa).",
    ph5PreTrend: "Esitrendi (|β|)",
    ph5PostEffect: "Jalkivaikutus (β)",
    ph5PreOk: "Esitrendi puhdas?",
    ph5Yes: "Kylla",
    ph5No: "Ei",
    ph5Note:
      "Tapahtumatutkimus loytyy kayttoonoton jalkeinen TFR-lasku (−0,076/v keskiarvo vuosina 1–5 4G:n jalkeen), mutta esitrendi ei ole puhdas — TFR laski jo vertailukelpoisella vauhdilla ennen 4G-kayttoonottoa. Tama tarkoittaa etta 4G-tapahtumaa ei voida eristaa puhtaana sokkina. Esitrendi heijastaa todennakoisesti meneillaan olevaa demografista siirtymaa, alypuhelinten lisamista ennen virallista 4G-lanseerausta ja hedelmallisyyden yleislaskutrendia. Tama tulos EI vahvista kausaalista kayttoonottovaikutusta.",

    summTitle: "Yhteenveto",
    summStrengths: "Mita tilastot nayttavat",
    summS1: "BERM (M1) voittaa demografisen nollan ristiinvalidoidussa ennusteessa (RMSE 1,01 vs 1,27)",
    summS2: "EMF-signaali selviaa plasebopermutaation (p < 0,005) ja vaaranviivefalsifioinnin",
    summS3: "R+P-dekomponointi viittaa siihen etta ~80 % vaikutuksesta on palautuvaa (puoliintumisaika ~10 v)",
    summS4: "BERM hylkaa oikein S0 (ei vaikutusta) ja S6 (kaaenteisvaikutus) synteettiset maailmat",
    summWeaknesses: "Mita tilastot eivat nayta",
    summW1: "S5-epaonnistuminen: BERM ei voi erottaa EMF:aa korreloiduista sekoittajista (kaupungistuminen, kehitys) ekologisessa datassa",
    summW2: "Tapahtumatutkimuksen esitrendi: 4G-kayttoonotto ei ole puhdas kvasikoe TFR:lle",
    summW3: "57 maan poikkileikkaus ei tarjoa kausaalista identifikaatiota — vain ennustavaa sovitetta",
    summW4: "Vaihe 4 (ASFR-kohorttimalli) ja maan sisainen panelianalyysi ovat toteuttamatta",
  },
} as const;

interface Props {
  locale: string;
}

export function StatisticalValidation({ locale }: Props) {
  const d = locale === "fi" ? t.fi : t.en;

  const ph1Data = [
    { label: d.ph1M0, rmse: "1.2710", rank: 4 },
    { label: d.ph1M1, rmse: "1.0073", rank: 1 },
    { label: d.ph1M2, rmse: "1.3055", rank: 3, note: "τ = 50y" },
    { label: d.ph1M3, rmse: "1.0179", rank: 2, note: locale === "fi" ? "\"early\" profiili" : "\"early\" profile" },
  ];

  const ph3Data = [
    { cells: d.ph3S0, pass: true },
    { cells: d.ph3S1, pass: true },
    { cells: d.ph3S2, pass: true },
    { cells: d.ph3S3, pass: true },
    { cells: d.ph3S4, pass: true },
    { cells: d.ph3S5, pass: false },
    { cells: d.ph3S6, pass: true },
  ];

  return (
    <section id="statistical-validation" className="mb-14">
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">{d.title}</h2>
        <p className="text-sm text-foreground-muted leading-relaxed max-w-3xl">
          {d.subtitle}
        </p>
      </div>

      {/* Phase 1: Model Comparison */}
      <div className="mb-10">
        <h3 className="text-base font-semibold mb-2">{d.ph1Title}</h3>
        <p className="text-sm text-foreground-muted mb-4 max-w-3xl">{d.ph1Desc}</p>
        <div className="overflow-x-auto">
          <table className="text-sm w-full max-w-2xl">
            <thead>
              <tr className="border-b border-border text-left text-foreground-muted">
                <th className="py-2 pr-4 font-medium">Model</th>
                <th className="py-2 pr-4 font-medium text-right">RMSE</th>
                <th className="py-2 font-medium text-right">Rank</th>
              </tr>
            </thead>
            <tbody>
              {ph1Data.map((row) => (
                <tr
                  key={row.label}
                  className={`border-b border-card-border last:border-0 ${row.rank === 1 ? "bg-green-500/5" : ""}`}
                >
                  <td className="py-2.5 pr-4">
                    {row.label}
                    {row.note && (
                      <span className="text-xs text-foreground-muted ml-2">({row.note})</span>
                    )}
                  </td>
                  <td className="py-2.5 pr-4 text-right font-mono-num">{row.rmse}</td>
                  <td className="py-2.5 text-right font-mono-num">
                    {row.rank === 1 ? (
                      <span className="text-green-600 dark:text-green-400 font-semibold">#{row.rank}</span>
                    ) : (
                      `#${row.rank}`
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-foreground-muted mt-3 max-w-3xl leading-relaxed">{d.ph1Note}</p>
      </div>

      {/* Phase 2: R+P Decomposition */}
      <div className="mb-10">
        <h3 className="text-base font-semibold mb-2">{d.ph2Title}</h3>
        <p className="text-sm text-foreground-muted mb-4 max-w-3xl">{d.ph2Desc}</p>
        <div className="overflow-x-auto">
          <table className="text-sm w-full max-w-2xl">
            <thead>
              <tr className="border-b border-border text-left text-foreground-muted">
                <th className="py-2 pr-4 font-medium">{d.ph2Param}</th>
                <th className="py-2 pr-4 font-medium">{d.ph2Value}</th>
                <th className="py-2 font-medium">{d.ph2Interp}</th>
              </tr>
            </thead>
            <tbody>
              {[d.ph2Row1, d.ph2Row2, d.ph2Row3].map((row, i) => (
                <tr key={i} className="border-b border-card-border last:border-0">
                  <td className="py-2.5 pr-4 font-medium">{row[0]}</td>
                  <td className="py-2.5 pr-4 font-mono-num">{row[1]}</td>
                  <td className="py-2.5 text-foreground-muted">{row[2]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-3 p-3 rounded-lg border border-blue-500/30 bg-blue-500/5 max-w-3xl">
          <p className="text-xs text-foreground-muted leading-relaxed">{d.ph2Note}</p>
        </div>
      </div>

      {/* Phase 3: Synthetic Falsification */}
      <div className="mb-10">
        <h3 className="text-base font-semibold mb-2">{d.ph3Title}</h3>
        <p className="text-sm text-foreground-muted mb-4 max-w-3xl">{d.ph3Desc}</p>
        <div className="overflow-x-auto">
          <table className="text-sm w-full max-w-3xl">
            <thead>
              <tr className="border-b border-border text-left text-foreground-muted">
                <th className="py-2 pr-4 font-medium">{d.ph3Scenario}</th>
                <th className="py-2 pr-4 font-medium">{d.ph3Truth}</th>
                <th className="py-2 pr-4 font-medium">{d.ph3Result}</th>
                <th className="py-2 font-medium text-center">{d.ph3Correct}</th>
              </tr>
            </thead>
            <tbody>
              {ph3Data.map((row, i) => (
                <tr
                  key={i}
                  className={`border-b border-card-border last:border-0 ${!row.pass ? "bg-red-500/5" : ""}`}
                >
                  <td className="py-2.5 pr-4">{row.cells[0]}</td>
                  <td className="py-2.5 pr-4 text-foreground-muted">{row.cells[1]}</td>
                  <td className="py-2.5 pr-4 text-foreground-muted">{row.cells[2]}</td>
                  <td className="py-2.5 text-center">
                    <span
                      className={`px-2 py-0.5 rounded text-xs font-semibold ${
                        row.pass
                          ? "bg-green-500/10 text-green-600 dark:text-green-400"
                          : "bg-red-500/10 text-red-600 dark:text-red-400"
                      }`}
                    >
                      {row.pass ? d.ph3Pass : d.ph3Fail}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-3 p-3 rounded-lg border border-red-500/30 bg-red-500/5 max-w-3xl">
          <p className="text-xs text-foreground-muted leading-relaxed">{d.ph3Note}</p>
        </div>

        <div className="mt-6">
          <h4 className="text-sm font-semibold mb-2">{d.ph3bTitle}</h4>
          <div className="space-y-2 max-w-3xl">
            <p className="text-sm text-foreground-muted leading-relaxed">{d.ph3bPlacebo}</p>
            <p className="text-sm text-foreground-muted leading-relaxed">{d.ph3bWrongLag}</p>
          </div>
        </div>
      </div>

      {/* Phase 5: Event Study */}
      <div className="mb-10">
        <h3 className="text-base font-semibold mb-2">{d.ph5Title}</h3>
        <p className="text-sm text-foreground-muted mb-4 max-w-3xl">{d.ph5Desc}</p>

        <div className="grid grid-cols-3 gap-4 max-w-lg mb-4">
          <div className="border border-card-border bg-card-bg rounded-lg p-3 text-center">
            <p className="text-xs text-foreground-muted mb-1">{d.ph5PreTrend}</p>
            <p className="text-lg font-mono-num font-semibold">0.098</p>
          </div>
          <div className="border border-card-border bg-card-bg rounded-lg p-3 text-center">
            <p className="text-xs text-foreground-muted mb-1">{d.ph5PostEffect}</p>
            <p className="text-lg font-mono-num font-semibold text-red-500">−0.076</p>
          </div>
          <div className="border border-red-500/30 bg-red-500/5 rounded-lg p-3 text-center">
            <p className="text-xs text-foreground-muted mb-1">{d.ph5PreOk}</p>
            <p className="text-lg font-semibold text-red-600 dark:text-red-400">{d.ph5No}</p>
          </div>
        </div>

        <div className="p-3 rounded-lg border border-red-500/30 bg-red-500/5 max-w-3xl">
          <p className="text-xs text-foreground-muted leading-relaxed">{d.ph5Note}</p>
        </div>
      </div>

      {/* Summary */}
      <div className="border border-card-border bg-card-bg rounded-lg p-6 max-w-3xl">
        <h3 className="text-base font-semibold mb-4">{d.summTitle}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="text-xs font-semibold text-green-600 dark:text-green-400 uppercase tracking-wide mb-2">
              {d.summStrengths}
            </h4>
            <ul className="text-sm text-foreground-muted space-y-2 leading-relaxed">
              <li className="flex gap-2">
                <span className="text-green-500 flex-shrink-0">+</span>
                <span>{d.summS1}</span>
              </li>
              <li className="flex gap-2">
                <span className="text-green-500 flex-shrink-0">+</span>
                <span>{d.summS2}</span>
              </li>
              <li className="flex gap-2">
                <span className="text-green-500 flex-shrink-0">+</span>
                <span>{d.summS3}</span>
              </li>
              <li className="flex gap-2">
                <span className="text-green-500 flex-shrink-0">+</span>
                <span>{d.summS4}</span>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-semibold text-red-600 dark:text-red-400 uppercase tracking-wide mb-2">
              {d.summWeaknesses}
            </h4>
            <ul className="text-sm text-foreground-muted space-y-2 leading-relaxed">
              <li className="flex gap-2">
                <span className="text-red-500 flex-shrink-0">−</span>
                <span>{d.summW1}</span>
              </li>
              <li className="flex gap-2">
                <span className="text-red-500 flex-shrink-0">−</span>
                <span>{d.summW2}</span>
              </li>
              <li className="flex gap-2">
                <span className="text-red-500 flex-shrink-0">−</span>
                <span>{d.summW3}</span>
              </li>
              <li className="flex gap-2">
                <span className="text-red-500 flex-shrink-0">−</span>
                <span>{d.summW4}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
