"use client";

import { useId, useState } from "react";
import styles from "./SignalStructureIllustration.module.css";

/** Ten complete carrier cycles per envelope period; every allowed gate ends at a
 * complete cycle. Hence mean(sin²) = 1/2 on the gate, exactly, not approximately
 * for an arbitrarily clipped sine. Time and amplitude are dimensionless examples. */
export function buildSignalStructureExample(dutyPercent: number) {
  if (!Number.isInteger(dutyPercent) || dutyPercent < 10 || dutyPercent > 100 || dutyPercent % 10 !== 0) {
    throw new RangeError("Duty must be 10–100 percent in steps of 10");
  }
  const duty = dutyPercent / 100;
  const peak = Math.sqrt(2 / duty);
  const points = Array.from({ length: 801 }, (_, i) => {
    const time = i / 400;
    const carrier = Math.sin(2 * Math.PI * 10 * time);
    return { time, continuous: Math.SQRT2 * carrier, pulsed: time % 1 < duty ? peak * carrier : 0 };
  });
  return { duty, peak, rms: 1, cyclesPerPeriod: 10, points };
}

const COPY = {
  fi: {
    title: "Sama RMS, erilainen aikarakenne",
    synthetic: "Laskettu signaaliesimerkki",
    duty: "Aktiivinen osuus toistojaksosta",
    continuous: "Jatkuva siniaalto", pulsed: "Pulssitettu siniaalto", peak: "Huippu",
    time: "Aika / toistojakso", scale: "Yhteinen amplitudiasteikko −4,5…+4,5; normalisoidut yksiköt.",
    note: "Lyhyempi aktiivinen aika tarvitsee tässä suuremman huipun, jotta RMS pysyy samana. Kantoaallon taajuus ja toistojakso säilyvät.",
    boundary: "Synteettinen fysikaalisen syötteen vertailu. Kuva ei laske reseptorivastetta eikä kerro, kumpi signaali vaikuttaa biologisesti enemmän.",
    formula: "RMS = huippu × √(d/2) = 1, kun d on aktiivinen osuus. Jokainen pulssi sisältää kokonaisia sinijaksoja.",
  },
  en: {
    title: "Same RMS, different time structure",
    synthetic: "Computed signal example",
    duty: "Active share of each repetition period",
    continuous: "Continuous sine wave", pulsed: "Pulsed sine wave", peak: "Peak",
    time: "Time / repetition period", scale: "Shared amplitude scale −4.5…+4.5; normalized units.",
    note: "A shorter active time requires a higher peak here to keep RMS unchanged. Carrier frequency and repetition period stay fixed.",
    boundary: "A synthetic comparison of physical inputs. It does not calculate a receptor response or establish which signal has a larger biological effect.",
    formula: "RMS = peak × √(d/2) = 1, where d is the active fraction. Every pulse contains complete sine cycles.",
  },
};

export function SignalStructureIllustration({ locale }: { locale: string }) {
  const c = locale === "fi" ? COPY.fi : COPY.en;
  const [dutyPercent, setDutyPercent] = useState(20);
  const id = useId();
  const example = buildSignalStructureExample(dutyPercent);
  const format = (value: number) => new Intl.NumberFormat(locale === "fi" ? "fi-FI" : "en-GB", { maximumFractionDigits: 2 }).format(value);
  const waveform = (key: "continuous" | "pulsed") => example.points.map((point, i) =>
    `${i ? "L" : "M"}${(point.time * 300).toFixed(2)},${(50 - point[key] / 4.5 * 47).toFixed(2)}`).join(" ");

  return <figure className={styles.figure} aria-labelledby={`${id}-title`} data-signal-illustration="synthetic">
    <figcaption>
      <p className={styles.kicker}>{c.synthetic}</p>
      <h3 id={`${id}-title`} className={styles.title}>{c.title}</h3>
    </figcaption>
    <label className={styles.control} htmlFor={`${id}-duty`}>
      <span>{c.duty} <strong>{dutyPercent} %</strong></span>
      <input id={`${id}-duty`} type="range" min={10} max={100} step={10} value={dutyPercent} aria-label={c.duty} aria-valuetext={`${dutyPercent} %`}
        onChange={event => setDutyPercent(Number(event.target.value))} />
    </label>
    <div className={styles.waves}>
      {(["continuous", "pulsed"] as const).map(key => <div className={styles.wave} key={key} data-signal={key}>
        <div className={styles.waveHeading}>
          <strong>{c[key]}</strong>
          <span>RMS <b data-signal-rms>1</b> · {c.peak} <b data-signal-peak>{format(key === "continuous" ? Math.SQRT2 : example.peak)}</b></span>
        </div>
        <svg viewBox="0 0 600 100" preserveAspectRatio="none" className={styles.plot} aria-hidden="true">
          <line x1={0} y1={50} x2={600} y2={50} className={styles.axis} />
          <line x1={300} y1={0} x2={300} y2={100} className={styles.period} />
          <path d={waveform(key)} className={key === "continuous" ? styles.continuous : styles.pulsed} />
        </svg>
        <div className={styles.timeAxis} aria-hidden="true"><span>0</span><span>1</span><span>2</span></div>
      </div>)}
    </div>
    <p className={styles.axisLabel}>{c.time} · {c.scale}</p>
    <p className={styles.note}>{c.note}</p>
    <p className={styles.formula}>{c.formula}</p>
    <p className={styles.boundary}>{c.boundary}</p>
  </figure>;
}
