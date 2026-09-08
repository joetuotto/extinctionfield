"use client";

import { useId, useState } from "react";
import {
  fieldReconstruction, getReconstructionCell, getReconstructionSources,
  reconstructionStageLabels, type ReconstructionCountryId,
} from "@/lib/field-reconstruction";
import styles from "./SourceEnvironmentIllustration.module.css";

type Focus = "grid" | "antenna" | "lighting" | "conversion" | "meter" | "wifi";
type Text = { fi: string; en: string };
const FOCUS: Record<string, Focus> = {
  "electric-grid": "grid", "radio-broadcast": "antenna", "terrestrial-tv": "antenna",
  "analog-cellular": "antenna", "digital-2g": "antenna", "mobile-3g": "antenna",
  "mobile-4g": "antenna", "mobile-5g": "antenna", "radio-navigation": "antenna",
  "lighting-drivers": "lighting", "power-conversion": "conversion", "smart-metering": "meter", wifi: "wifi",
};
const POINTS: Record<Focus, [number, number]> = {
  grid: [132, 145], antenna: [806, 120], lighting: [357, 216], conversion: [320, 283], meter: [282, 258], wifi: [504, 274],
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
  const country = countryId ?? localCountry;
  const atYear = year ?? localYear;
  const family = fieldReconstruction.families.find(f => f.id === (familyId ?? localFamily)) ?? fieldReconstruction.families[0];
  const focus = FOCUS[family.id] ?? "grid";
  const cell = getReconstructionCell(country, family.id, atYear);
  const track = fieldReconstruction.tracks.find(row => row.countryId === country && row.familyId === family.id);
  const unresolved = cell.stage === "unknown" || cell.phase?.scopeKind === "market-policy";
  const [px, py] = POINTS[focus];
  const select = (value: string) => { setFamily(value); onFamilyChange?.(value); };
  const title = fi ? "Missä lähde ja eliö kohtaavat?" : "Where do source and organism meet?";
  const description = fi
    ? "Rakennuksen leikkauskuva paikantaa johdotuksen, laitteet ja antennin. Ihminen, lintu ja kala sijoittuvat eri ympäristöihin. Numerot yhdistävät valitun lähteen, paikallisen reitin ja vastaanottimen alla oleviin selitteisiin."
    : "A building cutaway locates wiring, devices and an antenna. A person, a bird and a fish occupy different environments. Numbers connect the selected source, local route and receiver to the descriptions below.";
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
      <div className={styles.scene}>
        <svg viewBox="0 0 960 420" role="img" aria-labelledby={`${id}-title`} aria-describedby={`${id}-description`} className={styles.svg} data-selected-illustration={focus}>
          <title id={`${id}-title`}>{`${t(family.label)} · ${title}`}</title><desc id={`${id}-description`}>{`${description} ${fi ? "Esimerkkipaikka; ei kentän voimakkuuskartta." : "Example setting; not a field-intensity map."}`}</desc>
          <defs>
            <linearGradient id={`${id}-sky`} x2="0" y2="1"><stop stopColor="var(--se-sky)"/><stop offset="1" stopColor="var(--se-paper)"/></linearGradient>
            <pattern id={`${id}-earth`} width="19" height="17" patternUnits="userSpaceOnUse"><path d="M2 10h3m8-6h2" stroke="var(--se-line)" opacity=".25"/></pattern>
          </defs>
          <path d="M0 0H960V334H0Z" fill={`url(#${id}-sky)`}/>
          <path d="M0 280Q140 200 255 268T475 273Q600 180 736 245T960 220V343H0Z" fill="var(--se-hill)"/>
          <path d="M0 315Q180 302 325 323T635 324Q760 304 960 305V420H0Z" fill="var(--se-earth)"/>
          <path d="M0 338H960V420H0Z" fill={`url(#${id}-earth)`}/>
          <path d="M642 330Q755 301 960 313V420H698Q657 376 642 330Z" fill="var(--se-water)"/>
          <g fill="none" stroke="var(--se-water-line)" strokeWidth="2" opacity=".55"><path d="M685 342q46-12 96-7m38-6q60-5 112 1M724 374q59-13 100-7m34-16 61 1M776 402q54-6 126-4"/></g>
          <g stroke="var(--se-line)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M303 175L424 98 562 175V325H303Z" fill="var(--se-house)"/>
            <path d="M288 178L424 91 577 178" fill="none" strokeWidth="7"/>
            <path d="M303 181H562M303 325H571" fill="none"/>
            <path d="M519 136v-32h22v46" fill="var(--se-house)"/>
            <path d="M399 112l113 68v144M303 245h96" fill="none" opacity=".4"/>
            <rect x="324" y="187" width="49" height="49" rx="3" fill="var(--se-window)"/><path d="M348 187v49m-24-25h49" fill="none"/>
            <path d="M459 291h82m-71 0v34m59-34v34" fill="none" strokeWidth="4"/>
          </g>
          <g stroke="var(--se-line)" fill="none" strokeWidth="3" strokeLinecap="round"><path d="M94 140v176m-27-150h54m-22-19v19m-15-19v19m27-19v19M221 165v151m-25-128h50m-34-16v16m17-16v16"/><path d="M0 155q48 24 84 1m15 2q69 62 113 19m-213-30q52 24 112 13m0 0q63 55 117 16m0 10q36 36 72 30" strokeWidth="1.5"/></g>
          <g stroke="var(--se-line)" fill="none" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M779 314l27-217 29 217m-51-43h46m-40-43h35m-29-43h23m-22-60h20M784 272l42-43m-36 0 30-44m-24 0 18-43m-29 129 46 43m-41-85 35 43m-29-87 28 44"/><path d="M795 109v36m23-36v36" strokeWidth="7"/><path d="M806 96V74"/></g>
          <g stroke="var(--se-line)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M619 320V246m0 43-22-21m22 7 21-24" fill="none" strokeWidth="5"/>
            <path d="M619 197c-36 0-45 31-35 45-19 22 0 39 20 29 16 20 45 8 46-9 31-12 26-44 4-49-5-17-20-22-35-16Z" fill="var(--se-leaf)"/>
            <path d="M645 205q12-11 22 0-9-3-12 5-2-7-10-5" fill="var(--se-line)" stroke="none"/>
            <path d="M686 321v-24m-8 24-7-20m23 20 12-20M732 318v-28m-7 29-8-19" fill="none" stroke="var(--se-leaf-line)"/>
            <path d="M818 367q23-19 48 0-23 21-48 0l-13 10v-20Z" fill="var(--se-fish)"/><circle cx="855" cy="364" r="2" fill="var(--se-line)" stroke="none"/>
            <path d="M902 331v42m-8-42h16M656 402q69-2 109 5t195-4" fill="none" strokeDasharray="5 5"/>
          </g>
          <g stroke="var(--se-line)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><circle cx="438" cy="242" r="12" fill="var(--se-skin)"/><path d="M428 259h21l7 30h-34Z" fill="var(--se-person)"/><path d="M428 287l-4 34m24-34 7 34m-29-58-15 23m38-23 15 14" fill="none" strokeWidth="6"/></g>
          <g stroke="var(--se-line)" strokeWidth="2" fill="var(--se-house)">
            <rect x="269" y="241" width="25" height="36" rx="3"/><rect x="275" y="248" width="13" height="8" fill="var(--se-window)"/>
            <rect x="307" y="264" width="27" height="40" rx="3"/><path d="M313 278h15m-15 5h15m-15 5h15"/>
            <path d="M358 180v24m-11 12 11-13 12 13Z" fill="var(--se-lamp)"/><path d="M352 219q6 7 12 0" fill="none"/>
            <rect x="488" y="271" width="33" height="13" rx="4"/><path d="M493 271v-14m23 14v-14"/><circle cx="511" cy="278" r="1.5" fill="var(--se-line)"/>
          </g>
          <g fill="none" stroke="var(--se-accent)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" strokeDasharray={unresolved ? "5 6" : undefined} opacity={cell.stage === "retired" ? .45 : 1} data-source-route={focus}>
            {focus === "grid" && <><path d="M94 160q67 52 126 23l61 34v28m8 32v30h37v-20m-6 0v14h-36v-23"/><path d="M336 286h56" strokeDasharray="3 7"/></>}
            {focus === "antenna" && <><path d="M795 109v36m23-36v36" strokeWidth="7"/><path d="M779 153l-295 83" strokeDasharray="4 8"/><path d="M499 223l-15 13 20 1" strokeWidth="2"/></>}
            {focus === "lighting" && <><path d="M358 180v24m-11 12 11-13 12 13Z"/><path d="M358 226l64 43" strokeDasharray="4 7"/><path d="M364 225l13 43m-27-43-13 43" stroke="var(--se-amber)" strokeWidth="2"/></>}
            {focus === "conversion" && <><rect x="307" y="264" width="27" height="40" rx="3"/><path d="M336 279h34l43 14" strokeDasharray="4 7"/></>}
            {focus === "meter" && <><rect x="269" y="241" width="25" height="36" rx="3"/><path d="M281 240v-22l-61-32m74 74h53l60 24" strokeDasharray="4 7"/></>}
            {focus === "wifi" && <><rect x="488" y="271" width="33" height="13" rx="4"/><path d="M493 270v-13m23 13v-13"/><path d="M482 274l-24-13" strokeDasharray="4 5"/></>}
          </g>
          {cell.stage === "retired" && <path d={`M${px - 12} ${py - 12}l24 24`} stroke="var(--se-accent)" strokeWidth="3" aria-hidden="true"/>}
          <path d="M31 329H607" stroke="var(--se-line)" strokeWidth="2" opacity=".35"/>
        </svg>
        <span className={styles.marker} style={{ left: `${px / 9.6}%`, top: `${(py - 27) / 4.2}%` }} aria-hidden="true">1</span>
        <span className={styles.marker} style={{ left: focus === "antenna" ? "68%" : "39%", top: focus === "antenna" ? "45%" : "71%" }} aria-hidden="true">2</span>
        <span className={styles.marker} style={{ left: "46%", top: "50%" }} aria-hidden="true">3</span>
      </div>
      <figcaption>
        <ol className={styles.legend}>
          <li><span>1</span><div><strong>{t(SOURCE[focus])}</strong><p>{t(family.label)}</p></div></li>
          <li><span>2</span><div><strong>{fi ? "Paikallinen reitti" : "Local route"}</strong><p>{t(ROUTE[focus])}</p></div></li>
          <li><span>3</span><div><strong>{fi ? "Organismi ja vastaanottava tila" : "Organism and receiving state"}</strong><p>{fi ? "Sijainti, asento, kudos ja ajankohta yhdistävät lähdeympäristön BERM:n vasteeseen." : "Position, orientation, tissue and timing connect the source setting to BERM's response."}</p></div></li>
        </ol>
        <p className={styles.caption}>{fi ? "Esimerkkimaisema. Viivat paikantavat lähteitä ja reittejä; niiden määrä tai väri ei esitä annosta. Vesi- ja kontaktireitit näkyvät ympäristön erillisinä osina." : "Example landscape. Lines locate sources and routes; their number or colour does not encode dose. Water and contact routes are shown as distinct parts of the setting."}</p>
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
