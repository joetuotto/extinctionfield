"use client";

import Link from "next/link";
import type { Locale } from "@/lib/i18n";

const COPY = {
  en: {
    title: "The Varroa Cascade: Why EMF Is a Force Multiplier",
    p1: "Colony Collapse Disorder is typically attributed to a combination of stressors: Varroa mites, viruses (DWV), pesticides, and nutritional stress. BERM-Eco adds a mechanism that amplifies ALL of these simultaneously: EMF weakens the honeybee's defenses while leaving its primary parasite structurally protected.",
    p2: "Electromagnetic fields reduce grooming behavior (50 Hz data, Wyszkowska 2025), impair olfactory sensitivity (the primary mechanism for hygienic detection of Varroa-infested brood), trigger stress protein expression (hsp70, hsp90; Wyszkowska et al. 2023), reduce queen laying and brood viability (Odemer 2019), and disrupt magnetic navigation essential for foraging (Shepherd 2023, Science Advances).",
    p3: "Meanwhile, Varroa destructor is structurally protected: its sclerotin exoskeleton likely attenuates EMF penetration far more effectively than the bee's thin cuticle. Its 1.6 mm body is too small for resonant RF absorption. Its host-finding relies on chemical and electrostatic cues, not magnetic navigation. And its parasitic strategy — salivary chitinase to keep wounds open — is biochemical, not electromagnetic.",
    beeLabel: "HONEYBEE — weakens",
    varroaLabel: "VARROA — protected",
    fieldStateLabel: "FieldState",
    beeEffects: [
      { icon: "✗", text: "Grooming ↓ (Wyszkowska 2025)" },
      { icon: "✗", text: "Olfaction ↓ (Shepherd 2023)" },
      { icon: "✗", text: "Navigation ↓ (Shepherd 2023)" },
      { icon: "✗", text: "Stress proteins ↑ (Wyszkowska et al. 2023)" },
      { icon: "✗", text: "Queen laying ↓ (Odemer 2019)" },
      { icon: "✗", text: "Immune resources → stress response" },
    ],
    varroaEffects: [
      { icon: "✓", text: "Sclerotin armour → EMF attenuation" },
      { icon: "✓", text: "1.6 mm → no GHz resonance" },
      { icon: "✓", text: "Chemical parasitic strategy → not EMF-sensitive" },
      { icon: "✓", text: "Electrostatic contact → may be enhanced" },
      { icon: "—", text: "Reproduction inside hive → shielded" },
    ],
    result: "Result: Each increment of ambient EMF tilts the balance further in Varroa's favor. The parasite is shielded; the host is not.",
    favreTitle: "The Faraday Experiment (Favre & Johansson 2025)",
    favreText: "Honeybee colonies placed in complete Faraday shielding (blocking all EMF including natural fields) collapsed — queens stopped laying fertilized eggs. But colonies in Faraday cages WITH artificial Schumann resonance (7.83 Hz) survived. Bees need Earth's natural electromagnetic environment but are harmed by artificial EMF layered on top of it.",
    favreFootnote: `US Patent 12,239,107 states: “With EMF transmissions blocked, bees can better defend the colony against mites and hive beetles.”`,
    readMore: "Read the full story",
    epistemicNote: "The individual effects listed are from published studies [C/M]. The \"double cascade\" framework — that differential susceptibility acts as a force multiplier — is a BERM-Eco synthesis [H] that has not been tested as a unified hypothesis.",
  },
  fi: {
    title: "Varroa-kaskadi: Miksi EMF on voimankerroin",
    p1: "Colony Collapse Disorder liitetään tyypillisesti stressitekijöiden yhdistelmään: Varroa-punkit, virukset (DWV), torjunta-aineet ja ravinnollinen stressi. BERM-Eco lisää mekanismin joka vahvistaa KAIKKIA näitä samanaikaisesti: EMF heikentää mehiläisen puolustuksia jättäen sen pääloisen rakenteellisesti suojatuksi.",
    p2: "Sähkömagneettiset kentät vähentävät sukimiskäyttäytymistä (50 Hz data, Wyszkowska 2025), heikentävät hajuherkkyyttä (ensisijainen mekanismi Varroa-tartunnan saaneen sikiön hygieeniseen havaitsemiseen), laukaisevat stressiproteiinien ilmentymisen (hsp70, hsp90; Wyszkowska ym. 2023), vähentävät kuningattaren munintaa ja sikiön elinkelpoisuutta (Odemer 2019) ja häiritsevät ravinnonhankintaan välttämätöntä magneettinavigointia (Shepherd 2023, Science Advances).",
    p3: "Samaan aikaan Varroa destructor on rakenteellisesti suojattu: sen sklerotiini-ulkokuori todennäköisesti vaimentaa EMF:n tunkeutumista paljon tehokkaammin kuin mehiläisen ohut kutiikkeli. Sen 1,6 mm keho on liian pieni resonantti-RF-absorptiolle. Sen isännänlöytökyky perustuu kemiallisiin ja sähköstaattisiin vihjeisiin, ei magneettinavigointiin. Ja sen loisstrategia — sylkikitinaasi haavojen aukipitämiseksi — on biokemiallinen, ei sähkömagneettinen.",
    beeLabel: "MEHILÄINEN — heikkenee",
    varroaLabel: "VARROA — suojassa",
    fieldStateLabel: "FieldState",
    beeEffects: [
      { icon: "✗", text: "Sukiminen ↓ (Wyszkowska 2025)" },
      { icon: "✗", text: "Hajuaisti ↓ (Shepherd 2023)" },
      { icon: "✗", text: "Navigointi ↓ (Shepherd 2023)" },
      { icon: "✗", text: "Stressiproteiinit ↑ (Wyszkowska ym. 2023)" },
      { icon: "✗", text: "Kuningattaren muninta ↓ (Odemer 2019)" },
      { icon: "✗", text: "Immuuniresurssit → stressivaste" },
    ],
    varroaEffects: [
      { icon: "✓", text: "Sklerotiini-panssari → EMF-vaimennus" },
      { icon: "✓", text: "1,6 mm → ei GHz-resonanssia" },
      { icon: "✓", text: "Kemiallinen loisstrategia → ei EMF-herkkä" },
      { icon: "✓", text: "Sähköstaattinen kontakti → voi tehostua" },
      { icon: "—", text: "Lisääntyminen pesän sisällä → suojassa" },
    ],
    result: "Tulos: jokainen lisäys ambient-EMF:ssä kallistaa tasapainoa edelleen Varroan eduksi. Loinen on suojattu; isäntä ei ole.",
    favreTitle: "Faraday-koe (Favre & Johansson 2025)",
    favreText: "Faradayn häkkiin (kaikki EMF mukaan lukien luonnolliset kentät estetty) asetetut mehiläisyhdyskunnat romahtivat — kuningattaret lopettivat hedelmöitettyjen munien munimisen. Mutta yhdyskunnat Faradayn häkeissä JOISSA oli keinotekoinen Schumannin resonanssi (7,83 Hz) selvisivät. Mehiläiset tarvitsevat Maan luonnollista sähkömagneettista ympäristöä mutta niille on vahingollista keinotekoinen EMF joka on kerrostettu sen päälle.",
    favreFootnote: `US Patent 12 239 107 toteaa: "Kun EMF-lähetykset estetään, mehiläiset pystyvät paremmin puolustamaan yhdyskuntaa punkkeja ja pesäkuoriaisia vastaan."`,
    readMore: "Lue koko tarina",
    epistemicNote: "Yksittäiset listatut vaikutukset ovat julkaistuista tutkimuksista [C/M]. \"Kaksinkertainen kaskadi\" -viitekehys — että differentiaalinen herkkyys toimii voimankertoimena — on BERM-Eco-synteesi [H], jota ei ole testattu yhtenäisenä hypoteesina.",
  },
} as const;

export function VarroaCascade({ locale }: { locale: Locale }) {
  const d = COPY[locale];
  const prefix = `/${locale}`;

  return (
    <section className="mb-14 border-t editorial-rule pt-6 max-w-4xl">
      <h2 className="editorial-section-heading mb-4">{d.title}</h2>

      <div className="space-y-4 text-sm text-foreground-muted leading-relaxed mb-8">
        <p>{d.p1}</p>
        <p>{d.p2}</p>
        <p>{d.p3}</p>
      </div>

      {/* Dual-sided diagram */}
      <div className="rounded-xl border border-card-border bg-card-bg overflow-hidden mb-8">
        <div className="grid md:grid-cols-[1fr_auto_1fr]">
          {/* Bee side */}
          <div className="p-5">
            <p className="text-xs uppercase tracking-[0.16em] font-semibold text-status-refuted mb-4">
              {d.beeLabel}
            </p>
            <ul className="space-y-2.5">
              {d.beeEffects.map((e) => (
                <li key={e.text} className="flex items-start gap-2.5 text-sm">
                  <span className="text-status-refuted font-mono-num text-xs mt-0.5 shrink-0 w-4 text-center">
                    {e.icon}
                  </span>
                  <span className="text-foreground-muted leading-snug">{e.text}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Center FieldState bar */}
          <div className="hidden md:flex flex-col items-center justify-center px-4 border-x border-card-border">
            <div className="writing-mode-vertical text-xs uppercase tracking-[0.2em] font-semibold text-accent [writing-mode:vertical-lr] rotate-180">
              {d.fieldStateLabel}
            </div>
          </div>
          <div className="md:hidden border-t border-card-border py-2 text-center">
            <span className="text-xs uppercase tracking-[0.2em] font-semibold text-accent">
              {d.fieldStateLabel}
            </span>
          </div>

          {/* Varroa side */}
          <div className="p-5 md:border-l-0 border-t md:border-t-0 border-card-border">
            <p className="text-xs uppercase tracking-[0.16em] font-semibold text-status-confirmed mb-4">
              {d.varroaLabel}
            </p>
            <ul className="space-y-2.5">
              {d.varroaEffects.map((e) => (
                <li key={e.text} className="flex items-start gap-2.5 text-sm">
                  <span
                    className={`font-mono-num text-xs mt-0.5 shrink-0 w-4 text-center ${
                      e.icon === "✓"
                        ? "text-status-confirmed"
                        : "text-foreground-muted"
                    }`}
                  >
                    {e.icon}
                  </span>
                  <span className="text-foreground-muted leading-snug">{e.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Result bar */}
        <div className="border-t border-card-border bg-accent/5 px-5 py-4">
          <p className="text-sm font-medium text-foreground/80 leading-relaxed">{d.result}</p>
        </div>
      </div>

      <p className="text-xs text-foreground-muted/60 leading-relaxed italic mb-6">
        {d.epistemicNote}
      </p>

      {/* Favre & Johansson highlight box */}
      <div className="rounded-xl border-2 border-accent/30 bg-accent/5 p-6 mb-4">
        <h3 className="text-sm font-semibold text-accent mb-3">{d.favreTitle}</h3>
        <p className="text-sm text-foreground-muted leading-relaxed mb-4">{d.favreText}</p>
        <p className="text-xs text-foreground-muted/70 leading-relaxed italic mb-4">
          {d.favreFootnote}
        </p>
        <Link
          href={`${prefix}/articles/bees`}
          className="text-sm text-accent hover:underline"
        >
          {d.readMore} →
        </Link>
      </div>
    </section>
  );
}
