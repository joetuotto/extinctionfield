"use client";

import { useId, useState } from "react";
import {
  fieldReconstruction, getReconstructionCell, getReconstructionSources,
  reconstructionStageLabels, type ReconstructionCountryId,
} from "@/lib/field-reconstruction";
import styles from "./SourceEnvironmentIllustration.module.css";
import { SourceEnvironmentScene } from "./SourceEnvironmentScene";

type Focus = "grid" | "antenna" | "lighting" | "conversion" | "meter" | "wifi";
type Text = { fi: string; en: string };
const FOCUS: Record<string, Focus> = {
  "electric-grid": "grid", "radio-broadcast": "antenna", "terrestrial-tv": "antenna",
  "analog-cellular": "antenna", "digital-2g": "antenna", "mobile-3g": "antenna",
  "mobile-4g": "antenna", "mobile-5g": "antenna", "radio-navigation": "antenna",
  "lighting-drivers": "lighting", "power-conversion": "conversion", "smart-metering": "meter", wifi: "wifi",
};
const POINTS: Record<Focus, [number, number]> = {
  grid: [132, 145], antenna: [806, 96], lighting: [357, 216], conversion: [320, 283], meter: [282, 258], wifi: [504, 274],
};
const ROUTE_PINS: Record<Focus, [number, number, number, number]> = {
  grid: [374, 309, 374, 288], antenna: [646, 165, 646, 191],
  lighting: [393, 302, 393, 253], conversion: [374, 309, 374, 282],
  meter: [367, 306, 367, 268], wifi: [480, 316, 480, 276],
};
const SOURCE: Record<Focus, Text> = {
  grid: { fi: "Johto ja virtapiiri", en: "Wiring and circuit" },
  antenna: { fi: "Lähetysantenni", en: "Transmitting antenna" },
  lighting: { fi: "Valaisin ja sen ajuri", en: "Lamp and its driver" },
  conversion: { fi: "Tehonmuunnin", en: "Power converter" },
  meter: { fi: "Mittari ja viestiyhteys", en: "Meter and communication link" },
  wifi: { fi: "Reititin sisätilassa", en: "Indoor router" },
};
const ROUTE: Record<Focus, Text> = {
  grid: { fi: "Johdotus ja virran paluureitti määrittävät paikallista järjestelyä.", en: "Wiring and the current return path define the local arrangement." },
  antenna: { fi: "Antennin sijainti, suunta ja ympäröivät rakenteet kuuluvat rekonstruktioon.", en: "Antenna position, direction and surrounding structures belong in the reconstruction." },
  lighting: { fi: "Valon reitti ja sähköisen ajurin kenttä kuvataan erikseen.", en: "The optical path and the electrical driver's field are described separately." },
  conversion: { fi: "Laite, kuorma ja johtimet muodostavat paikallisen lähdejärjestelyn.", en: "The device, its load and wiring form a local source arrangement." },
  meter: { fi: "Viestintä voi kulkea johtimia tai radiolinkkiä pitkin. Toteutus tarkistetaan lähteestä.", en: "Communication can use wiring or a radio link. The implementation is checked against its source." },
  wifi: { fi: "Reitittimen paikka, käyttörytmi ja etäisyys vastaanottimeen kirjataan.", en: "Record router position, operating rhythm and distance to the receiver." },
};
interface Props {
  locale: string;
  countryId?: ReconstructionCountryId;
  year?: number;
  familyId?: string;
  onFamilyChange?: (familyId: string) => void;
  compact?: boolean;
}

/** Illustrates source placement; all historical states come from the existing registry. */
export function SourceEnvironmentIllustration({ locale, countryId, year, familyId, onFamilyChange, compact = false }: Props) {
  const id = useId();
  const fi = locale === "fi";
  const t = (text: Text) => fi ? text.fi : text.en;
  const [localCountry, setCountry] = useState<ReconstructionCountryId>("FIN");
  const [localYear, setYear] = useState(2023);
  const [localFamily, setFamily] = useState("electric-grid");
  const [detail, setDetail] = useState(false);
  const country = countryId ?? localCountry;
  const atYear = year ?? localYear;
  const family = fieldReconstruction.families.find(f => f.id === (familyId ?? localFamily)) ?? fieldReconstruction.families[0];
  const focus = FOCUS[family.id] ?? "grid";
  const cell = getReconstructionCell(country, family.id, atYear);
  const track = fieldReconstruction.tracks.find(row => row.countryId === country && row.familyId === family.id);
  const unresolved = cell.stage === "unknown" || cell.phase?.scopeKind === "market-policy";
  const [px, py] = POINTS[focus];
  const [rx, ry, tx, ty] = ROUTE_PINS[focus];
  const view = detail
    ? (focus === "antenna" ? [370, 35, 515, 310] : focus === "grid" ? [58, 90, 520, 260] : [250, 165, 330, 175])
    : [0, 0, 960, 420];
  const markerPosition = (x: number, y: number) => ({
    left: `${(x - view[0]) / view[2] * 100}%`,
    top: `${(y - view[1]) / view[3] * 100}%`,
  });
  const select = (value: string) => { setFamily(value); onFamilyChange?.(value); };
  const title = fi ? "Missä lähde ja eliö kohtaavat?" : "Where do source and organism meet?";
  const description = detail
    ? (fi ? "Lähikuva valitusta lähteestä, sen paikallisesta reitistä ja ihmisestä rakennuksessa. Numerot yhdistävät kohteet alla oleviin selitteisiin." : "Close-up of the selected source, its local route and a person inside the building. Numbers connect these features to the descriptions below.")
    : (fi ? "Rakennuksen leikkauskuva paikantaa johdotuksen, laitteet ja antennin. Ihminen, lintu ja kala sijoittuvat eri ympäristöihin. Numerot yhdistävät valitun lähteen, paikallisen reitin ja vastaanottimen alla oleviin selitteisiin." : "A building cutaway locates wiring, devices and an antenna. A person, a bird and a fish occupy different environments. Numbers connect the selected source, local route and receiver to the descriptions below.");
  const status = unresolved && cell.phase?.scopeKind === "market-policy"
    ? (fi ? "Sääntelyvaihe; paikallista käyttöä ei määritetä" : "Policy stage; local operation is not specified")
    : t(reconstructionStageLabels[cell.stage]);
  const historyCountry = fieldReconstruction.countries.find(c => c.id === country)!;

  return <section className={`${styles.root} ${compact ? styles.compact : ""}`} aria-labelledby={`${id}-heading`} data-source-environment={family.id} data-history-year={atYear} data-history-stage={cell.stage}>
    <header className={styles.header}>
      <div><p className={styles.kicker}>{fi ? "Lähteestä paikalliseen kohtaamiseen" : "From source to local encounter"}</p><h3 id={`${id}-heading`}>{title}</h3></div>
      <span className={styles.tag}>{fi ? "Havainnekuva" : "Illustration"}</span>
    </header>
    <div className={styles.controls}>
      <label>{fi ? "Kuvan lähdeperhe" : "Illustrated source family"}<select value={family.id} onChange={e => select(e.target.value)}>{fieldReconstruction.families.map(f => <option key={f.id} value={f.id}>{t(f.label)}</option>)}</select></label>
      {!countryId && <label>{fi ? "Historian maa" : "Historical country"}<select value={country} onChange={e => setCountry(e.target.value as ReconstructionCountryId)}>{fieldReconstruction.countries.map(c => <option key={c.id} value={c.id}>{t(c.name)}</option>)}</select></label>}
      {year === undefined && <label className={styles.year}>{fi ? "Historian vuosi" : "Historical year"}<div><input aria-label={fi ? "Historian vuosi" : "Historical year"} type="range" min={1880} max={2024} value={atYear} onChange={e => setYear(Number(e.target.value))}/><output>{atYear}</output></div></label>}
    </div>
    <figure className={styles.figure}>
      <div className={styles.figureToolbar}>
        <p>{fi ? "Lähteet elinympäristössä" : "Sources in a living environment"}</p>
        <div className={styles.viewControls} role="group" aria-label={fi ? "Kuvan rajaus" : "Illustration framing"}>
          <button type="button" aria-pressed={!detail} onClick={() => setDetail(false)}>{fi ? "Kokonaiskuva" : "Overview"}</button>
          <button type="button" aria-pressed={detail} onClick={() => setDetail(true)}>{fi ? "Lähikuva" : "Close-up"}</button>
        </div>
      </div>
      <div className={styles.scene} data-environment-detail={detail}>
        <svg viewBox={view.join(" ")} role="img" aria-labelledby={`${id}-title`} aria-describedby={`${id}-description`} className={styles.svg} data-selected-illustration={focus}>
          <title id={`${id}-title`}>{`${t(family.label)} · ${title}`}</title><desc id={`${id}-description`}>{`${description} ${fi ? "Esimerkkipaikka; ei kentän voimakkuuskartta." : "Example setting; not a field-intensity map."}`}</desc>
          <SourceEnvironmentScene id={id} focus={focus} unresolved={unresolved} retired={cell.stage === "retired"}/>
          <path d={`M${rx} ${ry}L${tx} ${ty}`} fill="none" stroke="var(--se-line)" strokeWidth=".8"/>
          {cell.stage === "retired" && <path d={`M${px - 9} ${py - 9}l18 18`} stroke="var(--se-accent)" strokeWidth="2" aria-hidden="true"/>}
        </svg>
        <span className={styles.marker} style={markerPosition(px, py - 27)} aria-hidden="true">1</span>
        <span className={styles.marker} style={markerPosition(rx, ry)} aria-hidden="true">2</span>
        <span className={styles.marker} style={markerPosition(444, 207)} aria-hidden="true">3</span>
      </div>
      <figcaption>
        <ol className={styles.legend}>
          <li><span>1</span><div><strong>{t(SOURCE[focus])}</strong><p>{t(family.label)}</p></div></li>
          <li><span>2</span><div><strong>{fi ? "Paikallinen reitti" : "Local route"}</strong><p>{t(ROUTE[focus])}</p></div></li>
          <li><span>3</span><div><strong>{fi ? "Organismi ja vastaanottava tila" : "Organism and receiving state"}</strong><p>{fi ? "Sijainti, asento, kudos ja ajankohta yhdistävät lähdeympäristön BERM:n vasteeseen." : "Position, orientation, tissue and timing connect the source setting to BERM's response."}</p></div></li>
        </ol>
        <p className={styles.caption}>{fi ? "Esimerkkimaisema. Viivat paikantavat lähteitä ja reittejä; niiden määrä tai väri ei esitä annosta. Kokonaiskuva näyttää myös veden ja kontaktireitit; lähikuva suurentaa valittua lähdettä." : "Example landscape. Lines locate sources and routes; their number or colour does not encode dose. The overview also shows water and contact routes; the close-up enlarges the selected source."}</p>
      </figcaption>
    </figure>
    <div className={styles.history}>
      <div className={styles.historyHeading}><strong>{t(historyCountry.name)} · {atYear}</strong><span data-environment-history-status>{status}</span></div>
      <p>{unresolved ? (fi ? "Kuva näyttää lähdetyypin sijoittelun. Valitun vuoden paikallista käyttöä ei tunneta tämän tietueen perusteella." : "The illustration shows the source arrangement. This record does not identify local operation in the selected year.") : t(cell.note)}</p>
      <details><summary>{fi ? "Kenttämuoto ja historian perusteet" : "Field form and historical basis"}</summary>
        <dl className={styles.facts}>{(["carrier", "waveform", "intermittence", "geography"] as const).map((key, i) => <div key={key}><dt>{(fi ? ["Taajuudet", "Aaltomuoto", "Käyttörytmi", "Paikallinen muoto"] : ["Frequencies", "Waveform", "Operating rhythm", "Spatial form"])[i]}</dt><dd>{t(family.morphology[key])}</dd></div>)}</dl>
        {cell.phase && <p>{fi ? "Jakson peruste" : "Interval basis"}: {cell.phase.basis === "documented" ? (fi ? "dokumentoitu tapahtuma" : "documented event") : (fi ? "historiallinen rekonstruktio" : "historical reconstruction")} · {cell.phase.startYear}–{cell.phase.endYear}</p>}
        {cell.anchors.map(a => <p key={a.id}><strong>{a.startYear}{a.endYear ? `–${a.endYear}` : ""} · {t(a.title)}</strong><br/>{t(a.scope)}</p>)}
        {getReconstructionSources(cell.sourceRefs).map(s => <a key={s.id} href={s.url} target="_blank" rel="noreferrer">{s.title} ↗</a>)}
        {unresolved && <p>{t(cell.note)}</p>}
        {track && <p>{t(track.gap)}</p>}
        <p>{fi ? "Historiatietue rajaa lähteen ajoitusta ja kattavuutta. Paikallinen mittaus tai fysikaalinen arvio liitetään erikseen BERM:n ehdolliseen vasteoperaattoriin." : "The historical record bounds source timing and coverage. Local measurements or physical estimates are separately connected to BERM's conditional response operator."}</p>
      </details>
    </div>
  </section>;
}
