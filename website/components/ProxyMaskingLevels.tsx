import { ArrowDownRight } from "lucide-react";
import { pickCopy } from "@/lib/i18n";

const COPY = {
  en: {
    title: "Four places where the chain disappears from view",
    lead: "Masking occurs at different steps: in a dataset, in signal reception, in a person’s experience and in the way separate findings are explained. Following those steps makes the hidden mechanism concrete.",
    levels: [
      { name: "Statistical masking", question: "Which variable gets the association?", text: "A correlated measure, an intermediate step or an unrecorded interaction absorbs part of the relationship being examined.", href: "#proxy-explanations" },
      { name: "Sensory masking", question: "What does the organism receive?", text: "The cue is present, but its detection or biological significance changes with the receiving state.", href: "#receiver-state" },
      { name: "Phenomenological masking", question: "What does the change feel like?", text: "The person experiences motivation, fatigue or preference; the processes producing that experience are not directly visible to them.", href: "#experienced-reasons" },
      { name: "Epistemic masking", question: "How are the findings grouped?", text: "Related changes are assigned to separate explanatory categories. BERM brings their possible shared regulation into the same account.", href: "#syndrome-fragmentation" },
    ],
    synthesis: "Fragmentation of a behavioural profile is the fourth level’s central example: the explanation is split across findings that the model relates through receiving state and regulation.",
  },
  fi: {
    title: "Neljä kohtaa, joissa vaikutusketju peittyy",
    lead: "Peittyminen tapahtuu eri vaiheissa: aineistossa, signaalin vastaanotossa, ihmisen kokemuksessa ja siinä, miten erilliset havainnot selitetään. Näiden vaiheiden seuraaminen tekee piiloon jäävän mekanismin konkreettiseksi.",
    levels: [
      { name: "Tilastollinen peittyminen", question: "Mille muuttujalle yhteys kirjautuu?", text: "Korreloiva mittari, biologinen välivaihe tai kirjaamatta jäänyt yhteisvaikutus ottaa osan tarkasteltavasta yhteydestä nimiinsä.", href: "#proxy-explanations" },
      { name: "Sensorinen peittyminen", question: "Mitä eliö vastaanottaa?", text: "Vihje on olemassa, mutta sen havaitseminen tai biologinen merkitys muuttuu vastaanottotilan mukana.", href: "#receiver-state" },
      { name: "Fenomenologinen peittyminen", question: "Miltä muutos tuntuu?", text: "Ihminen kokee motivaatiota, väsymystä tai mieltymyksen; kokemusta tuottavat prosessit eivät näy hänelle suoraan.", href: "#experienced-reasons" },
      { name: "Episteeminen peittyminen", question: "Miten havainnot ryhmitellään?", text: "Toisiinsa liittyvät muutokset saavat erilliset selitysluokat. BERM tuo niiden mahdollisen yhteisen säätelyn samaan tarkasteluun.", href: "#syndrome-fragmentation" },
    ],
    synthesis: "Käyttäytymisprofiilin fragmentaatio on neljännen tason keskeinen esimerkki: selitys pilkotaan havaintoihin, jotka malli yhdistää vastaanottotilan ja säätelyn kautta.",
  },
};

export function ProxyMaskingLevels({ locale }: { locale: string }) {
  const c = pickCopy(COPY, locale);
  return (
    <nav aria-label={c.title} className="my-9 min-w-0 space-y-4">
      <p className="font-serif text-2xl leading-snug">{c.title}</p>
      <p className="max-w-[72ch] text-base leading-relaxed text-foreground-muted">{c.lead}</p>
      <ol className="grid gap-3 sm:grid-cols-2">
        {c.levels.map((level, index) => (
          <li key={level.href} className="min-w-0">
            <a href={level.href} className="group flex h-full flex-col gap-3 rounded-lg border border-card-border bg-figure-bg p-5 hover:border-accent/60 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent">
              <span className="flex items-center justify-between gap-3 text-xs font-semibold text-accent"><span>{String(index + 1).padStart(2, "0")} · {level.name}</span><ArrowDownRight aria-hidden="true" className="size-4 shrink-0" /></span>
              <span className="text-base font-semibold">{level.question}</span>
              <span className="text-sm leading-relaxed text-foreground-muted">{level.text}</span>
            </a>
          </li>
        ))}
      </ol>
      <p className="max-w-[72ch] text-sm leading-relaxed text-foreground-muted">{c.synthesis}</p>
    </nav>
  );
}
