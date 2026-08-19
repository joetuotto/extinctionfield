"use client";

import { usePathname } from "next/navigation";
import { activeModelVersion } from "@/lib/modelVersions";

const COPY = {
  en: {
    v2: {
      label: "FieldState–ASFR v2 · current research presentation",
      text: "BERM FieldState–ASFR-v2 is a measurement-aware research specification. It does not currently publish calibrated country-level TFR forecasts.",
      bullets: [
        "Mobile subscriptions are a technology-timing proxy, not measured FieldState or dose",
        "Evidence records are bounded to causal nodes; none is a TFR coefficient",
        "TFR is derived from ASFR after biological and demographic terms are kept separate",
      ],
    },
    v18: {
      label: "BERM v18.0 · historical model presentation",
      text: "This route preserves the earlier public BERM presentation as a separately versioned research record. Its equations, scenarios and numerical outputs belong to v18.0 and are not silently substituted for FieldState–ASFR-v2 outputs.",
      bullets: [
        "Use the model-version switcher to compare the two specifications on parallel routes",
        "Versioned pages retain their original model context and source snapshot",
        "The current FieldState–ASFR-v2 presentation remains available alongside this archive",
      ],
    },
    license: "Code: MIT License. Documentation: CC BY-4.0.",
  },
  fi: {
    v2: {
      label: "FieldState–ASFR v2 · nykyinen tutkimusesitys",
      text: "BERM FieldState–ASFR-v2 on mittaustietoinen tutkimusmäärittely. Se ei tällä hetkellä julkaise kalibroituja maakohtaisia TFR-ennusteita.",
      bullets: [
        "Mobiililiittymät ovat teknologian ajoitusproksi, eivät mitattu FieldState tai annos",
        "Evidenssitietueet on rajattu kausaalisolmuihin; mikään niistä ei ole TFR-kerroin",
        "TFR johdetaan ASFR:stä, kun biologiset ja demografiset termit pidetään erillään",
      ],
    },
    v18: {
      label: "BERM v18.0 · aiempi malliesitys",
      text: "Tämä reitti säilyttää aiemman julkisen BERM-esityksen erillisenä, versioituna tutkimustietueena. Sen yhtälöt, skenaariot ja numeeriset tulokset kuuluvat v18.0:aan, eikä niitä korvata huomaamatta FieldState–ASFR-v2:n tuloksilla.",
      bullets: [
        "Malliversiovaihtimella voit verrata kahta määrittelyä rinnakkaisilla reiteillä",
        "Versioidut sivut säilyttävät oman mallikontekstinsa ja lähdetilannekuvansa",
        "Nykyinen FieldState–ASFR-v2-esitys on käytettävissä tämän arkiston rinnalla",
      ],
    },
    license: "Koodi: MIT-lisenssi. Dokumentaatio: CC BY-4.0.",
  },
} as const;

export function SiteFooter({ locale }: { locale: string }) {
  const pathname = usePathname();
  const language = locale === "fi" ? "fi" : "en";
  const version = activeModelVersion(locale, pathname);
  const content = COPY[language][version === "berm-v18" ? "v18" : "v2"];

  return (
    <footer className="border-t border-border py-8 px-6">
      <div className="max-w-5xl mx-auto">
        <p className="text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-foreground-muted mb-3">
          {content.label}
        </p>
        <p className="text-sm text-foreground-muted leading-relaxed">{content.text}</p>
        <ul className="mt-4 space-y-1 text-xs text-foreground-muted leading-relaxed list-disc list-inside">
          {content.bullets.map((bullet) => (
            <li key={bullet}>{bullet}</li>
          ))}
        </ul>
        <p className="text-xs text-foreground-muted mt-4">{COPY[language].license}</p>
      </div>
    </footer>
  );
}
