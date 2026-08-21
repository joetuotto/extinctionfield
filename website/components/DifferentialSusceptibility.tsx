import Link from "next/link";
import type { Locale } from "@/lib/i18n";

type ProfileRow = {
  organism: string;
  stars: number;
  mechanism: string;
  effect: string;
};

const COPY = {
  en: {
    title: "BERM-Eco: Differential Electromagnetic Susceptibility as a Novel Selection Pressure",
    p1: "The EMF modulome does not affect all species equally. Each species' \"modulome profile\" — which ion channels, which sensors, what body size, what cell division rate — determines how it responds to the changed electromagnetic environment. Species whose critical biological processes depend on electromagnetic sensing (navigation, circadian regulation, electrostatic communication) are more vulnerable than species whose survival strategies are chemical or mechanical.",
    p2: "Honeybees rely on magnetoreception for navigation, electrostatic sensing for pollen collection, olfaction for hygienic behavior, and circadian regulation for colony coordination — all electromagnetically mediated. Varroa destructor relies on chemical host-finding, salivary chitinase for feeding, and is protected by a rigid sclerotin exoskeleton. EMF weakens the host and does not affect the parasite. This differential creates a new selection pressure that favors EMF-robust parasites at the expense of EMF-sensitive hosts.",
    p3: "This principle extends beyond bees. Tick populations (Ixodes, Dermacentor) are expanding across Europe and North America. Ticks use electrostatic host-contact (England 2023, Current Biology) — a mechanism that may be enhanced in the changed FieldState. Simultaneously, their predators (insectivorous birds, bats) are declining partly due to EMF disruption of magnetic navigation (Lindecke 2026, Science; PECBMS bird indices). The ecological cascade compounds: fewer predators + enhanced parasite contact = vector-borne disease expansion.",
    tableTitle: "Species modulome profiles",
    colOrganism: "Organism",
    colSensitivity: "EM sensitivity",
    colMechanism: "Primary mechanism",
    colEffect: "EMF effect",
    profiles: [
      { organism: "Honeybee", stars: 5, mechanism: "CRY/RPM, electrostatic sense", effect: "Weakens" },
      { organism: "Migratory bird", stars: 5, mechanism: "CRY/RPM compass", effect: "Disorients" },
      { organism: "Bat", stars: 4, mechanism: "Magnetic compass", effect: "Disorients" },
      { organism: "Moth", stars: 4, mechanism: "GHz resonance", effect: "Absorption ↑" },
      { organism: "Human", stars: 3, mechanism: "VGCC, CRY, VNS", effect: "Chronic disease" },
      { organism: "Varroa mite", stars: 1, mechanism: "Chemical", effect: "Shielded" },
      { organism: "Ixodes tick", stars: 1, mechanism: "Electrostatic", effect: "May benefit" },
    ] as ProfileRow[],
    sentinelLink: "See Varroa cascade analysis",
    ecologyLink: "Selection landscape",
    epistemicNote: "Sensitivity ratings are BERM-Eco estimates [H] based on known mechanisms and body-plan physics — not measured differential values. Individual mechanism citations carry their own evidence levels (see references).",
  },
  fi: {
    title: "BERM-Eco: Differentiaalinen sähkömagneettinen herkkyys uutena valintapaineena",
    p1: "EMF-modulomi ei vaikuta kaikkiin lajeihin yhtäläisesti. Jokaisen lajin \"modulomiprofiili\" — mitkä ionikanavat, mitkä sensorit, mikä kehon koko, mikä solunjakautumisnopeus — määrää miten se reagoi muuttuneeseen sähkömagneettiseen ympäristöön. Lajit joiden kriittiset biologiset prosessit riippuvat sähkömagneettisesta aistimisesta (navigointi, vuorokausirytmin säätelystä, sähköstaattinen viestintä) ovat haavoittuvampia kuin lajit joiden selviytymisstrategiat ovat kemiallisia tai mekaanisia.",
    p2: "Mehiläiset luottavat magnetoreseptioon navigoinnissa, sähköstaattiseen aistimiseen siitepölyn keräämisessä, hajuaistiin hygieenisessä käyttäytymisessä ja vuorokausirytmin säätelyyn yhdyskunnan koordinoinnissa — kaikki sähkömagneettisesti välitettyjä. Varroa destructor luottaa kemialliseen isännänlöytöön, sylkikitinaasiin syöttämisessä ja on suojattu jäykällä sklerotiini-ulkokuorella. EMF heikentää isäntää eikä vaikuta loiseen. Tämä ero luo uuden valintapaineen joka suosii EMF-kestäviä loisia EMF-herkkien isäntien kustannuksella.",
    p3: "Tämä periaate ulottuu mehiläisten ulkopuolelle. Punkkipopulaatiot (Ixodes, Dermacentor) laajenevat kautta Euroopan ja Pohjois-Amerikan. Punkit käyttävät sähköstaattista isäntäkontaktia (England 2023, Current Biology) — mekanismia joka voi tehostua muuttuneessa FieldStatessa. Samanaikaisesti niiden saalistajat (hyönteissyöjälinnut, lepakot) vähenevät osin EMF:n magneettikompassin häirinnän vuoksi (Lindecke 2026, Science; PECBMS-lintuindeksit). Ekologinen kaskadi yhdistyy: vähemmän saalistajia + tehostunut loiskontakti = vektorivälitteisten tautien laajeneminen.",
    tableTitle: "Lajikohtaiset moduloomiprofiilit",
    colOrganism: "Organismi",
    colSensitivity: "EM-herkkyys",
    colMechanism: "Päämekanismi",
    colEffect: "EMF-vaikutus",
    profiles: [
      { organism: "Mehiläinen", stars: 5, mechanism: "CRY/RPM, sähköaisti", effect: "Heikkenee" },
      { organism: "Muuttolintu", stars: 5, mechanism: "CRY/RPM-kompassi", effect: "Desorientoituu" },
      { organism: "Lepakko", stars: 4, mechanism: "Magneettikompassi", effect: "Desorientoituu" },
      { organism: "Yöperhonen", stars: 4, mechanism: "GHz-resonanssi", effect: "Absorptiokasvu" },
      { organism: "Ihminen", stars: 3, mechanism: "VGCC, CRY, VNS", effect: "Krooninen tauti" },
      { organism: "Varroa-punkki", stars: 1, mechanism: "Kemiallinen", effect: "Suojassa" },
      { organism: "Ixodes-punkki", stars: 1, mechanism: "Sähköstaattinen", effect: "Voi hyötyä" },
    ] as ProfileRow[],
    sentinelLink: "Katso Varroa-kaskadianalyysi",
    ecologyLink: "Valintamaisema",
    epistemicNote: "Herkkyysluokitukset ovat BERM-Eco-arvioita [H] perustuen tunnettuihin mekanismeihin ja ruumiinrakenteen fysiikkaan — eivät mitattuja differentiaaliarvoja. Yksittäisten mekanismien viittaukset kantavat omat evidenssitasonsa (ks. lähdeluettelo).",
  },
} as const;

function Stars({ count }: { count: number }) {
  return (
    <span className="font-mono-num text-accent tracking-wider">
      {"★".repeat(count)}
      <span className="text-foreground-muted/20">{"★".repeat(5 - count)}</span>
    </span>
  );
}

export function DifferentialSusceptibility({ locale }: { locale: Locale }) {
  const d = COPY[locale];
  const prefix = `/${locale}`;

  return (
    <section className="mb-16 border-t editorial-rule pt-6 max-w-4xl">
      <h2 className="editorial-section-heading mb-4">{d.title}</h2>

      <div className="space-y-4 text-sm text-foreground-muted leading-relaxed mb-8">
        <p>{d.p1}</p>
        <p>{d.p2}</p>
        <p>{d.p3}</p>
      </div>

      {/* Modulome profiles table */}
      <div className="rounded-xl border border-card-border bg-card-bg overflow-hidden mb-6">
        <div className="px-5 py-3 border-b border-card-border">
          <h3 className="text-sm font-semibold">{d.tableTitle}</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-card-border text-left text-xs text-foreground-muted uppercase tracking-wider">
                <th className="py-2.5 px-5">{d.colOrganism}</th>
                <th className="py-2.5 px-3">{d.colSensitivity}</th>
                <th className="py-2.5 px-3">{d.colMechanism}</th>
                <th className="py-2.5 px-3">{d.colEffect}</th>
              </tr>
            </thead>
            <tbody>
              {d.profiles.map((row) => (
                <tr key={row.organism} className="border-b border-card-border/40">
                  <td className="py-2.5 px-5 font-medium text-foreground">{row.organism}</td>
                  <td className="py-2.5 px-3">
                    <Stars count={row.stars} />
                  </td>
                  <td className="py-2.5 px-3 text-foreground-muted">{row.mechanism}</td>
                  <td className="py-2.5 px-3">
                    <span
                      className={
                        row.stars >= 3
                          ? "text-status-refuted"
                          : "text-status-confirmed"
                      }
                    >
                      {row.effect}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <p className="text-xs text-foreground-muted/60 leading-relaxed italic mb-6">
        {d.epistemicNote}
      </p>

      <div className="flex flex-wrap gap-4 text-sm">
        <Link href={`${prefix}/sentinel`} className="text-accent hover:underline">
          {d.sentinelLink} →
        </Link>
        <Link href={`${prefix}/ecology`} className="text-accent hover:underline">
          {d.ecologyLink} →
        </Link>
      </div>
    </section>
  );
}
