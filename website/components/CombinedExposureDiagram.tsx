"use client";

import { useId, useState } from "react";

const COPY = {
  fi: {
    title: "Sama kenttälähde, eri siirtoreitti ja vastaanottotila",
    lead: "Valitse tarkastelukohta. Yhteisvaikutus voi syntyä ennen kudosta, kudoksen vastaanotossa tai saman biologisen varannon käytössä.",
    label: "BERM:n ehdollinen prosessikuva",
    tabs: ["Materiaali ja laite", "Lääke ja vastaanotto", "Yhteinen biologinen reitti"],
    steps: [
      { title: "Lähde", text: "Laitteen RF-protokolla sekä erikseen mitattu staattinen tai muuttuva sähkökenttä." },
      { title: "Siirtoreitti", text: "Etäisyys, materiaalikerrokset, kosteus, rajapinta ja kudoksen sähköiset ominaisuudet." },
      { title: "Vastaanottotila", text: "Lääkeaine, annos ja ajoitus; reseptorit, kello, redox-varanto ja aiempi historia." },
      { title: "Biologinen vaste", text: "Kalsium ja redox, hormonin tuotanto ja sitoutuminen, kudostoiminta ja lisääntymisen ehdot." },
    ],
    notes: [
      "Materiaali muuttaa laitteen ja kehon välistä rajapintaa. Varautuva kontakti voi lisäksi olla oma sähkökentän lähteensä. Sama kangas kuvataan näissä kahdessa tehtävässä, mutta sen vaikutusta ei lasketa kahdesti.",
      "Yhdistelmäehkäisy muuttaa hormonisäätelyä ja sitoutumista jo omalla vaikutuksellaan. BERM:ssa lääkkeen muuttama tila kuuluu myös kenttävasteen ehtoihin. Valmiste ja kudos määräävät, millainen muutos on kyseessä.",
      "Kaksi reittiä voi kohdata samassa varannossa tai tuotantovaiheessa. Niiden yhteinen seuraus kuljetetaan ketjussa kerran. Yhteisvaikutuksen suunta ja suuruus määritellään nimetylle vasteelle ja aikapisteelle.",
    ],
    scope: "Kuva esittää vaikutuspaikat. Se ei anna materiaalille, lääkkeelle tai kehoalueelle yleistä vahvistuskerrointa.",
  },
  en: {
    title: "One field source, different transfer and receiving states",
    lead: "Choose a point in the chain. An interaction can arise before tissue, in reception, or through use of a shared biological reserve.",
    label: "Conditional BERM process diagram",
    tabs: ["Material and device", "Drug and reception", "Shared biological pathway"],
    steps: [
      { title: "Source", text: "A device RF protocol and a separately measured static or time-varying electric field." },
      { title: "Transfer", text: "Distance, material layers, moisture, interface and tissue electrical properties." },
      { title: "Receiving state", text: "Drug, dose and timing; receptors, clock, redox reserve and prior history." },
      { title: "Biological response", text: "Calcium and redox, hormone production and binding, tissue function and reproductive conditions." },
    ],
    notes: [
      "Material changes the interface between device and body. A charging contact can also supply its own electric field. The same fabric has two recorded roles, with each contribution carried forward once.",
      "Combined contraception changes hormonal regulation and binding through its own action. In BERM, the drug-conditioned state also enters the field-response conditions. Formulation and tissue specify the change.",
      "Two pathways can meet at the same reserve or production stage. Their shared consequence is propagated once. Interaction direction and magnitude are defined for a named endpoint and time point.",
    ],
    scope: "The diagram locates the mechanisms. It assigns no universal amplification factor to a material, drug or body region.",
  },
};

export function CombinedExposureDiagram({ locale }: { locale: string }) {
  const d = locale === "fi" ? COPY.fi : COPY.en;
  const [selected, setSelected] = useState(0);
  const id = useId();
  const active = [[0, 1], [2], [2, 3]][selected];
  return <figure id="combined-response-process" aria-labelledby={`${id}-title`} className="my-8 min-w-0 rounded-xl border border-card-border bg-figure-bg p-5 sm:p-7">
    <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-accent">{d.label}</p>
    <h3 id={`${id}-title`} className="font-serif text-2xl leading-snug">{d.title}</h3>
    <p className="mt-3 text-sm leading-6 text-foreground-muted">{d.lead}</p>
    <div role="group" aria-label={d.title} className="my-6 grid gap-2 sm:grid-cols-3">
      {d.tabs.map((tab, i) => <button key={tab} type="button" aria-pressed={selected === i} aria-controls={`${id}-note`} onClick={() => setSelected(i)} className={`min-h-12 rounded-lg border px-3 py-3 text-sm font-medium focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${selected === i ? "border-accent bg-accent/10 text-accent" : "border-card-border hover:bg-card-bg"}`}>{tab}</button>)}
    </div>
    <ol className="grid gap-3 lg:grid-cols-4">
      {d.steps.map((step, i) => <li key={step.title} data-exposure-stage={i} data-emphasized={active.includes(i)} className={`min-w-0 rounded-lg border-t-4 p-4 ${active.includes(i) ? "border-accent bg-accent/5" : "border-card-border bg-card-bg"}`}>
        <p className="mb-2 text-xs font-mono text-accent" aria-hidden="true">0{i + 1}{i < 3 ? " →" : ""}</p>
        <h4 className="font-semibold">{step.title}</h4><p className="mt-2 text-sm leading-6 text-foreground-muted">{step.text}</p>
      </li>)}
    </ol>
    <p id={`${id}-note`} aria-live="polite" className="mt-5 border-l-2 border-accent pl-4 text-sm leading-6">{d.notes[selected]}</p>
    <figcaption className="mt-5 border-t border-card-border pt-4 text-xs leading-5 text-foreground-muted">{d.scope}</figcaption>
  </figure>;
}
