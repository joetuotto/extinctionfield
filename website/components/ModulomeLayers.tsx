"use client";

import { useState } from "react";

interface Layer {
  id: string;
  level: number;
  color: string;
  freq: string;
  freqFi: string;
  target: string;
  targetFi: string;
  fdaEvidence: string;
  fdaEvidenceFi: string;
  bermPath: string;
  epistemic: string;
  epistemicFi: string;
  description: string;
  descriptionFi: string;
  mechanism: string;
  mechanismFi: string;
}

const LAYERS: Layer[] = [
  {
    id: "cell-division",
    level: 7,
    color: "#FF5722",
    freq: "IF 100–500 kHz",
    freqFi: "IF 100–500 kHz",
    target: "Spermatogenesis, gut epithelium",
    targetFi: "Spermatogeneesi, suoliston epiteeli",
    fdaEvidence: "TTFields (Optune) — FDA PMA 2015, 2026",
    fdaEvidenceFi: "TTFields (Optune) — FDA PMA 2015, 2026",
    bermPath: "A_mitotic",
    epistemic: "E — Phase III RCT",
    epistemicFi: "E — Faasi III RCT",
    description: "Alternating fields at 100–300 kHz disrupt mitotic spindle assembly during cell division. Optimal frequency depends on cell size: larger cells respond to lower frequencies.",
    descriptionFi: "Vaihtovirta 100–300 kHz häiritsee mitoottisen karan kokoamista solunjakautumisen aikana. Optimaalinen taajuus riippuu solukoosta: suuremmat solut reagoivat matalampiin taajuuksiin.",
    mechanism: "TTFields → dielectrophoretic force on tubulin dipoles → spindle misalignment → mitotic catastrophe → apoptosis",
    mechanismFi: "TTFields → dielektroforeettinen voima tubuliinidipoleihin → karan virhesuuntautuminen → mitoottinen katastrofi → apoptoosi",
  },
  {
    id: "vagus-axis",
    level: 6,
    color: "#4CAF50",
    freq: "ELF 1–30 Hz",
    freqFi: "ELF 1–30 Hz",
    target: "Anti-inflammatory reflex, oxytocin",
    targetFi: "Anti-inflammatorinen refleksi, oksitosiini",
    fdaEvidence: "GammaCore VNS, 14+ auricular VNS devices",
    fdaEvidenceFi: "GammaCore VNS, 14+ aurikulaarista VNS-laitetta",
    bermPath: "E_vagus",
    epistemic: "E — FDA 510(k)",
    epistemicFi: "E — FDA 510(k)",
    description: "Vagus nerve stimulation produces systemic anti-inflammatory effects via the cholinergic anti-inflammatory pathway. Environmental RF near the vagus nerve (earbuds, phones at ear) may chronically perturb this reflex.",
    descriptionFi: "Vagushermon stimulaatio tuottaa systeemisiä anti-inflammatorisia vaikutuksia kolinergisen anti-inflammatorisen reitin kautta. Ympäristön RF vagushermon lähellä (nappikuulokkeet, puhelin korvalla) voi kroonisesti häiritä tätä refleksiä.",
    mechanism: "VNS → acetylcholine release → macrophage α7nAChR → TNF-α↓, IL-6↓ → systemic inflammation↓",
    mechanismFi: "VNS → asetyylikoliinin vapautuminen → makrofagien α7nAChR → TNF-α↓, IL-6↓ → systeeminen tulehdus↓",
  },
  {
    id: "pineal-circadian",
    level: 5,
    color: "#9C27B0",
    freq: "DC + ELF + RF",
    freqFi: "DC + ELF + RF",
    target: "Melatonin, biorhythm, HPG axis",
    targetFi: "Melatoniini, biorytmi, HPG-akseli",
    fdaEvidence: "TMS, tDCS (circadian effects)",
    fdaEvidenceFi: "TMS, tDCS (sirkadiaanivaikutukset)",
    bermPath: "C_pineal",
    epistemic: "E/M — experimental + Becker",
    epistemicFi: "E/M — kokeellinen + Becker",
    description: "The pineal gland acts as a magnetic sensor (Becker 1990). Melatonin secretion is altered by magnetic fields at geomagnetic strength. Chronic EMF → chronic melatonin suppression → circadian disruption → HPG axis perturbation.",
    descriptionFi: "Pineaalirauhanen toimii magneettisensorina (Becker 1990). Melatoniinin eritystä muuttavat magneettikentät geomagneettisella voimakkuudella. Krooninen EMF → krooninen melatoniinisuppressio → sirkadiaanihäiriö → HPG-akselin häiriö.",
    mechanism: "EMF → CRY/RPM magnetoreception → melatonin↓ → circadian clock disruption → cortisol rhythm↓ → HPG axis perturbation",
    mechanismFi: "EMF → CRY/RPM-magnetoreseptio → melatoniini↓ → sirkadiaanisen kellon häiriö → kortisoli­rytmi↓ → HPG-akselin häiriö",
  },
  {
    id: "bioelectric-code",
    level: 4,
    color: "#2196F3",
    freq: "All (membrane potential)",
    freqFi: "Kaikki (kalvopotentiaali)",
    target: "Morphology, development, regeneration",
    targetFi: "Muodon hallinta, kehitys, regeneraatio",
    fdaEvidence: "Indirect (PEMF bone healing)",
    fdaEvidenceFi: "Epäsuora (PEMF-luuparaneminen)",
    bermPath: "T_BE",
    epistemic: "E/M — Levin experimental",
    epistemicFi: "E/M — Levinin kokeellinen",
    description: "Cells encode positional information in transmembrane voltage patterns (Levin). Gap junctions create bioelectric networks that coordinate tissue-level decisions: growth, differentiation, and cancer suppression.",
    descriptionFi: "Solut koodaavat sijaintitietoa kalvojännitemalleissa (Levin). Aukkoliitokset luovat bioelektrisiä verkkoja, jotka koordinoivat kudostason päätöksiä: kasvu, erilaistuminen ja syöpäsuppressio.",
    mechanism: "Vmem patterns → gap junction networks → morphogenetic fields → tissue-level growth control",
    mechanismFi: "Vmem-mallit → aukkoliitosverkot → morfogeneettiset kentät → kudostason kasvukontrolli",
  },
  {
    id: "dc-control",
    level: 3,
    color: "#607D8B",
    freq: "DC",
    freqFi: "DC",
    target: "Growth, healing, regeneration, cancer control",
    targetFi: "Kasvu, paraneminen, regeneraatio, syöpäkontrolli",
    fdaEvidence: "Bone stimulator (DC), tDCS",
    fdaEvidenceFi: "Luunstimulaattori (DC), tDCS",
    bermPath: "DC_control",
    epistemic: "E/M — Becker experimental",
    epistemicFi: "E/M — Beckerin kokeellinen",
    description: "Becker discovered a DC control system in perineural cells that governs growth and regeneration. Cancer can be viewed as electrical depolarization — loss of DC growth control. Current of injury drives regeneration in salamanders and frogs.",
    descriptionFi: "Becker löysi perineuraalisten solujen DC-ohjausjärjestelmän, joka hallitsee kasvua ja regeneraatiota. Syöpä voidaan nähdä sähköisenä depolarisaationa — DC-kasvukontrollin menetyksenä. Vammavirtaus ohjaa regeneraatiota salamantereilla ja sammakoilla.",
    mechanism: "DC current of injury → perineural semiconduction → growth control signals → regeneration or neoplasia",
    mechanismFi: "DC-vammavirtaus → perineuraalinen puolijohtavuus → kasvukontrollisignaalit → regeneraatio tai neoplasia",
  },
  {
    id: "ion-channel",
    level: 2,
    color: "#00BCD4",
    freq: "All frequencies",
    freqFi: "Kaikki taajuudet",
    target: "All cells (conserved 3 billion years)",
    targetFi: "Kaikki solut (3 mrd vuotta konservoitunut)",
    fdaEvidence: "PEMF (A2A/A3), TTFields (tubulin), TMS (Na⁺)",
    fdaEvidenceFi: "PEMF (A2A/A3), TTFields (tubuliini), TMS (Na⁺)",
    bermPath: "All pathways",
    epistemic: "E — strongly empirical",
    epistemicFi: "E — vahvasti empiirinen",
    description: "The 'electrome' (Adee 2023): all life has a universal electrical dimension. Ion channels are 3 billion years old, conserved from bacteria to humans. PEMF activates adenosine A2A/A3 receptors (GPCRs), proving EMF affects multiple membrane protein types, not just VGCC.",
    descriptionFi: "'Elektromi' (Adee 2023): kaikella elämällä on universaali sähköinen ulottuvuus. Ionikanavat ovat 3 miljardia vuotta vanhoja, konservoituneet bakteereista ihmisiin. PEMF aktivoi adenosiini A2A/A3-reseptoreita (GPCR), todisten EMF:n vaikuttavan useisiin kalvoproteiini­tyyppeihin, ei vain VGCC:hen.",
    mechanism: "EMF → VGCC Ca²⁺ influx + GPCR activation + Na⁺/K⁺ gating → multiple downstream cascades",
    mechanismFi: "EMF → VGCC Ca²⁺ -influksi + GPCR-aktivaatio + Na⁺/K⁺-porttaus → useita alavirtakaskadeja",
  },
  {
    id: "geometric-foundation",
    level: 1,
    color: "#FFC107",
    freq: "N/A (geometric property)",
    freqFi: "N/A (geometrinen ominaisuus)",
    target: "Vmem = −70 mV / 10 nm → χ(Ā) ≈ 1.0",
    targetFi: "Vmem = −70 mV / 10 nm → χ(Ā) ≈ 1,0",
    fdaEvidence: "Indirect (all devices combined)",
    fdaEvidenceFi: "Epäsuora (kaikki laitteet yhdessä)",
    bermPath: "Lindgren",
    epistemic: "M/C — theoretical",
    epistemicFi: "M/C — teoreettinen",
    description: "Lindgren's geometric framework: the cell membrane's electric field (7 MV/m across 10 nm) places all living cells at χ(Ā) ≈ 1.0 — the geometric regime where external EMF couples maximally to membrane protein conformational states.",
    descriptionFi: "Lindgrenin geometrinen viitekehys: solukalvon sähkökenttä (7 MV/m 10 nm:n yli) asettaa kaikki elävät solut tilaan χ(Ā) ≈ 1,0 — geometrinen alue, jossa ulkoinen EMF kytkeytyy maksimaalisesti kalvoproteiinien konformaatiotiloihin.",
    mechanism: "Riemannian metric ansatz → χ(Ā) coupling → membrane protein susceptibility → all downstream pathways",
    mechanismFi: "Riemannin metriikka-ansatzi → χ(Ā)-kytkentä → kalvoproteiinin herkkyys → kaikki alavirtareitit",
  },
];

const COPY = {
  en: {
    title: "EMF Modulome: Seven Layers of Biological Susceptibility",
    lead: "The modulome synthesizes Becker's DC control system, Adee's electrome, Levin's bioelectric code, and Lindgren's geometric framework into a unified seven-layer model of EMF biological susceptibility. Each layer is independently supported by FDA-approved therapeutic devices that exploit the same mechanism.",
    layer: "Layer",
    frequency: "Frequency band",
    target: "Biological target",
    fdaEvidence: "FDA evidence",
    bermPathLabel: "BERM pathway",
    epistemicLevel: "Epistemic level",
    mechanism: "Mechanism chain",
    clickHint: "Click a layer to see mechanism details",
    note: "Epistemic note: Layer evidence ranges from E (Phase III RCT) to M/C (theoretical model). Each layer's status is marked independently. The modulome as a unified framework is a BERM-specific synthesis [C] — the individual components carry their own evidence levels.",
  },
  fi: {
    title: "EMF-modulooma: seitsemän biologisen herkkyyden tasoa",
    lead: "Modulooma yhdistää Beckerin DC-ohjausjärjestelmän, Adeen elektromin, Levinin bioelektrisen koodin ja Lindgrenin geometrisen viitekehyksen yhtenäiseksi seitsemän­tasoisen malliksi EMF:n biologisesta herkkyydestä. Jokaista tasoa tukevat itsenäisesti FDA-hyväksytyt terapeuttiset laitteet, jotka hyödyntävät samaa mekanismia.",
    layer: "Taso",
    frequency: "Taajuuskaista",
    target: "Biologinen kohde",
    fdaEvidence: "FDA-evidenssi",
    bermPathLabel: "BERM-polku",
    epistemicLevel: "Episteeminen taso",
    mechanism: "Mekanismiketju",
    clickHint: "Klikkaa tasoa nähdäksesi mekanismin yksityiskohdat",
    note: "Episteeminen huomautus: Tasojen evidenssi vaihtelee E:stä (faasi III RCT) M/C:hen (teoreettinen malli). Jokaisen tason status on merkitty itsenäisesti. Modulooma yhtenäisenä viitekehyksenä on BERM-spesifinen synteesi [C] — yksittäiset komponentit kantavat omat evidenssitasonsa.",
  },
} as const;

const SVG_W = 700;
const LAYER_H = 38;
const GAP = 4;
const PAD_L = 60;
const PAD_R = 20;
const PAD_T = 10;
const BAR_W = SVG_W - PAD_L - PAD_R;

export function ModulomeLayers({ locale }: { locale: string }) {
  const [expanded, setExpanded] = useState<string | null>(null);
  const d = locale === "fi" ? COPY.fi : COPY.en;

  const totalH = PAD_T + LAYERS.length * (LAYER_H + GAP) + 20;

  return (
    <div>
      <h3 className="text-lg font-semibold mb-2">{d.title}</h3>
      <p className="text-sm text-foreground-muted leading-relaxed mb-6 max-w-3xl">
        {d.lead}
      </p>

      <div className="overflow-x-auto">
        <svg
          viewBox={`0 0 ${SVG_W} ${totalH}`}
          className="w-full max-w-[700px]"
          style={{ minWidth: 480 }}
          role="img"
          aria-label={d.title}
        >
          {LAYERS.map((layer, i) => {
            const y = PAD_T + i * (LAYER_H + GAP);
            const isExpanded = expanded === layer.id;
            const name = locale === "fi" ? layer.descriptionFi : layer.description;

            const layerLabels: Record<string, { en: string; fi: string }> = {
              "cell-division": { en: "Cell division geometry", fi: "Solunjakautumisen geometria" },
              "vagus-axis": { en: "Vagus–brain–gut axis", fi: "Vagus–aivot–suolisto-akseli" },
              "pineal-circadian": { en: "Pineal / circadian", fi: "Pineaalinen / sirkadiaaninen" },
              "bioelectric-code": { en: "Bioelectric code", fi: "Bioelektrinen koodi" },
              "dc-control": { en: "DC control system", fi: "DC-ohjausjärjestelmä" },
              "ion-channel": { en: "Ion channel network", fi: "Ionikanavaverkko" },
              "geometric-foundation": { en: "Geometric foundation", fi: "Geometrinen perusta" },
            };

            const label = locale === "fi"
              ? layerLabels[layer.id]?.fi ?? layer.id
              : layerLabels[layer.id]?.en ?? layer.id;

            return (
              <g
                key={layer.id}
                onClick={() => setExpanded(isExpanded ? null : layer.id)}
                className="cursor-pointer"
              >
                <rect
                  x={PAD_L}
                  y={y}
                  width={BAR_W}
                  height={LAYER_H}
                  rx={6}
                  fill={layer.color}
                  opacity={isExpanded ? 0.95 : 0.7}
                  stroke={isExpanded ? "currentColor" : layer.color}
                  strokeWidth={isExpanded ? 2 : 1}
                />
                {/* Level number */}
                <text
                  x={PAD_L - 8}
                  y={y + LAYER_H / 2 + 5}
                  textAnchor="end"
                  fontSize={13}
                  fontWeight={700}
                  fill="currentColor"
                  opacity={0.5}
                >
                  {layer.level}
                </text>
                {/* Layer name */}
                <text
                  x={PAD_L + 14}
                  y={y + LAYER_H / 2 + 1}
                  fontSize={12}
                  fontWeight={600}
                  fill="#fff"
                  dominantBaseline="middle"
                >
                  {label}
                </text>
                {/* Frequency badge */}
                <text
                  x={PAD_L + BAR_W - 14}
                  y={y + LAYER_H / 2 - 5}
                  textAnchor="end"
                  fontSize={9}
                  fill="#fff"
                  opacity={0.85}
                >
                  {locale === "fi" ? layer.freqFi : layer.freq}
                </text>
                {/* BERM path badge */}
                <text
                  x={PAD_L + BAR_W - 14}
                  y={y + LAYER_H / 2 + 8}
                  textAnchor="end"
                  fontSize={8}
                  fill="#fff"
                  opacity={0.6}
                >
                  {layer.bermPath}
                </text>
                {/* Expand indicator */}
                <text
                  x={PAD_L + BAR_W / 2}
                  y={y + LAYER_H - 4}
                  textAnchor="middle"
                  fontSize={8}
                  fill="#fff"
                  opacity={0.4}
                >
                  {isExpanded ? "▲" : "▼"}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Detail panel */}
      {expanded ? (
        (() => {
          const layer = LAYERS.find((l) => l.id === expanded);
          if (!layer) return null;
          const isFi = locale === "fi";
          return (
            <div
              className="mt-3 rounded-xl border-2 p-5 max-w-[700px] transition-all"
              style={{ borderColor: layer.color }}
            >
              <div className="flex items-center gap-3 mb-3">
                <span
                  className="inline-flex items-center justify-center w-8 h-8 rounded-lg text-white text-sm font-bold"
                  style={{ background: layer.color }}
                >
                  {layer.level}
                </span>
                <div>
                  <span className="text-sm font-semibold">
                    {d.layer} {layer.level}
                  </span>
                  <span className="text-xs text-foreground-muted ml-2">
                    {isFi ? layer.epistemicFi : layer.epistemic}
                  </span>
                </div>
              </div>

              <p className="text-sm text-foreground-muted leading-relaxed mb-4">
                {isFi ? layer.descriptionFi : layer.description}
              </p>

              <div className="grid gap-3 sm:grid-cols-2 text-xs">
                <div className="rounded-lg border border-card-border bg-card-bg p-3">
                  <span className="font-semibold text-foreground">{d.frequency}</span>
                  <p className="text-foreground-muted mt-0.5">{isFi ? layer.freqFi : layer.freq}</p>
                </div>
                <div className="rounded-lg border border-card-border bg-card-bg p-3">
                  <span className="font-semibold text-foreground">{d.target}</span>
                  <p className="text-foreground-muted mt-0.5">{isFi ? layer.targetFi : layer.target}</p>
                </div>
                <div className="rounded-lg border border-card-border bg-card-bg p-3">
                  <span className="font-semibold text-foreground">{d.fdaEvidence}</span>
                  <p className="text-foreground-muted mt-0.5">{isFi ? layer.fdaEvidenceFi : layer.fdaEvidence}</p>
                </div>
                <div className="rounded-lg border border-card-border bg-card-bg p-3">
                  <span className="font-semibold text-foreground">{d.bermPathLabel}</span>
                  <p className="text-foreground-muted mt-0.5 font-mono">{layer.bermPath}</p>
                </div>
              </div>

              <div className="mt-3 rounded-lg bg-background-secondary p-3">
                <span className="text-xs font-semibold text-foreground">{d.mechanism}</span>
                <p className="text-xs text-foreground-muted mt-1 font-mono leading-relaxed">
                  {isFi ? layer.mechanismFi : layer.mechanism}
                </p>
              </div>
            </div>
          );
        })()
      ) : (
        <p className="text-xs text-foreground-muted mt-2 max-w-[700px]">{d.clickHint}</p>
      )}

      <p className="text-xs text-foreground-muted italic mt-4 max-w-[700px] leading-relaxed">
        {d.note}
      </p>
    </div>
  );
}
