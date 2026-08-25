"use client";

import type { Locale } from "@/lib/i18n";

const FACTORS = [
  {
    en: {
      title: "StAR bottleneck",
      detail:
        "Small Ca²⁺ perturbation → large testosterone effect because StAR protein is the rate-limiting step in steroidogenesis",
    },
    fi: {
      title: "StAR-pullonkaula",
      detail:
        "Pieni Ca²⁺-perturbointia → suuri testosteronivaikutus koska StAR-proteiini on steroidogeneesin nopeutta rajoittava vaihe",
    },
    ref: "Springer 2007",
    color: "#EF4444",
  },
  {
    en: {
      title: "No storage buffer",
      detail:
        "Leydig cells store very little steroid — testosterone reflects real-time synthesis, not reserves",
    },
    fi: {
      title: "Ei varastopuskuria",
      detail:
        "Leydigin solut varastoivat hyvin vähän steroideita — testosteroni heijastaa reaaliaik. synteesiä",
    },
    ref: "ScienceDirect 2007",
    color: "#F59E0B",
  },
  {
    en: {
      title: "Three pathways converge",
      detail:
        "Direct Cav3.2 + sleep/melatonin + stress/cortisol all suppress testosterone simultaneously",
    },
    fi: {
      title: "Kolme polkua konvergoivat",
      detail:
        "Suora Cav3.2 + uni/melatoniini + stressi/kortisoli suppressoivat testosteronia samanaikaisesti",
    },
    ref: "Asian J Androl 2014",
    color: "#8B5CF6",
  },
  {
    en: {
      title: "Anatomically unshielded",
      detail:
        "Leydig cells are outside the blood-testis barrier. Phone in pocket = 2.5 cm from target tissue",
    },
    fi: {
      title: "Anatomisesti suojaamaton",
      detail:
        "Leydigin solut ovat veri-kives-esteen ulkopuolella. Puhelin taskussa = 2,5 cm kohdekudoksesta",
    },
    ref: "PMC11782230 (2025)",
    color: "#3B82F6",
  },
  {
    en: {
      title: "Feedback cannot compensate",
      detail:
        "LH rises but testosterone still falls — the factory is damaged, not the order signal",
    },
    fi: {
      title: "Palaute ei kompensoi",
      detail:
        "LH nousee mutta testosteroni laskee silti — tehdas on vaurioitunut, ei tilaussignaali",
    },
    ref: "EMAS: 9.5% compensated",
    color: "#22C55E",
  },
  {
    en: {
      title: "Sensitivity increases over time",
      detail:
        "CaMKII shifts Cav3.2 activation threshold leftward — chronic exposure makes cells more sensitive",
    },
    fi: {
      title: "Herkkyys kasvaa ajan myötä",
      detail:
        "CaMKII siirtää Cav3.2-kynnystä vasemmalle — krooninen altistus tekee soluista herkempiä",
    },
    ref: "PMC9913649 (2023)",
    color: "#EC4899",
  },
];

export function SixFactorSummary({ locale = "en" }: { locale?: Locale }) {
  const fi = locale === "fi";
  return (
    <div className="mt-8 mb-4">
      <h3 className="text-sm font-semibold mb-4">
        {fi
          ? "Kuusi tekijää jotka tekevät testosteronista poikkeuksellisen herkkiä"
          : "Six factors that make testosterone exceptionally sensitive"}
      </h3>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {FACTORS.map((f, i) => {
          const t = fi ? f.fi : f.en;
          return (
            <article
              key={i}
              className="rounded-lg border border-card-border bg-card-bg p-4"
              style={{ borderLeftWidth: 3, borderLeftColor: f.color }}
            >
              <h4 className="text-sm font-semibold mb-1" style={{ color: f.color }}>
                {t.title}
              </h4>
              <p className="text-xs text-foreground-muted leading-relaxed mb-2">
                {t.detail}
              </p>
              <p className="text-[10px] text-foreground-muted/60 font-mono-num">
                {f.ref}
              </p>
            </article>
          );
        })}
      </div>
    </div>
  );
}
