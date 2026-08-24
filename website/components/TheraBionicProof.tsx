"use client";

import Link from "next/link";
import { ArrowRight, CheckCircle } from "lucide-react";

const COPY = {
  en: {
    kicker: "CLINICAL VALIDATION",
    title: "The mechanism is already clinically proven",
    fdaApproval: "FDA-approved (2019, HDE H220001) for advanced hepatocellular carcinoma",
    channelLabel: "T-type calcium channel — same as BERM predicts",
    sarLabel: "below mobile phone SAR — non-thermal by definition",
    survivalLabel: "survival benefit in advanced liver cancer",
    explanation:
      "The TheraBionic P1 device treats advanced liver cancer using amplitude-modulated radiofrequency electromagnetic fields at exposure levels 100 to 1,000 times below those from a mobile phone. The published mechanism: EMF activates Cav3.2 T-type voltage-gated calcium channels, causing calcium influx that triggers cancer cell differentiation. This is the exact mechanism BERM describes for reproductive and health effects — non-thermal EMF acting through voltage-gated calcium channels. The question is not whether this mechanism exists. It is FDA-validated. The question is what it means for chronic, uncontrolled environmental exposure.",
    fdaLabelTitle: "FDA device labeling",
    fdaLabelText:
      "The device should not be used in people receiving calcium channel blockers or agents blocking L-type or T-type voltage-gated calcium channels unless treatment is modified. This contraindication confirms that the calcium channel mechanism is essential to the device's function.",
    cta: "Read the full TheraBionic evidence analysis",
  },
  fi: {
    kicker: "KLIININEN VALIDOINTI",
    title: "Mekanismi on jo kliinisesti todistettu",
    fdaApproval: "FDA-hyväksytty (2019, HDE H220001) pitkälle edenneeseen maksasyöpään",
    channelLabel: "T-tyypin kalsiumkanava — sama kuin BERM ennustaa",
    sarLabel: "matkapuhelimen SAR:n alla — ei-terminen määritelmällisesti",
    survivalLabel: "elinaikaetu pitkälle edenneessä maksasyövässä",
    explanation:
      "TheraBionic P1 -laite hoitaa pitkälle edennyttä maksasyöpää käyttäen amplitudimoduloituja radiotaajuisia sähkömagneettisia kenttiä altistustasoilla jotka ovat 100–1 000 kertaa matkapuhelimen alapuolella. Julkaistu mekanismi: EMF aktivoi Cav3.2 T-tyypin jänniteriippuvaiset kalsiumkanavat aiheuttaen kalsium-influksin joka käynnistää syöpäsolujen erilaistumisen. Tämä on täsmälleen se mekanismi jonka BERM kuvaa lisääntymis- ja terveysvaikutuksille — ei-terminen EMF joka toimii jänniteriippuvaisten kalsiumkanavien kautta. Kysymys ei ole siitä onko mekanismi olemassa. Se on FDA:n validoima. Kysymys on siitä mitä se tarkoittaa krooniselle, kontrolloimattomalle ympäristöaltistukselle.",
    fdaLabelTitle: "FDA:n laitemerkintä",
    fdaLabelText:
      "Laitetta ei saa käyttää henkilöillä jotka saavat kalsiumkanavansalpaajia tai L- tai T-tyypin jänniteriippuvaisia kalsiumkanavia salpaavia aineita ellei hoitoa muokata. Tämä vasta-aihe vahvistaa, että kalsiumkanavamekanismi on olennainen laitteen toiminnalle.",
    cta: "Lue koko TheraBionic-evidenssianalyysi",
  },
} as const;

export function TheraBionicProof({ locale, prefix }: { locale: string; prefix: string }) {
  const d = locale === "fi" ? COPY.fi : COPY.en;

  return (
    <section className="pb-20">
      <div className="rounded-xl border border-card-border bg-card-bg p-6 sm:p-8">
        <p className="editorial-kicker text-accent mb-2">{d.kicker}</p>
        <h2 className="text-xl font-semibold mb-6">{d.title}</h2>

        <div className="flex items-start gap-3 mb-6">
          <CheckCircle size={22} className="text-green-500 shrink-0 mt-0.5" strokeWidth={2} aria-hidden="true" />
          <div>
            <p className="font-semibold">TheraBionic P1</p>
            <p className="text-sm text-foreground-muted">{d.fdaApproval}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div className="rounded-lg border border-card-border bg-background p-4 text-center">
            <p className="font-mono-num text-xl font-semibold text-accent">Cav3.2</p>
            <p className="text-xs text-foreground-muted mt-1">{d.channelLabel}</p>
          </div>
          <div className="rounded-lg border border-card-border bg-background p-4 text-center">
            <p className="font-mono-num text-xl font-semibold text-accent">100–1000×</p>
            <p className="text-xs text-foreground-muted mt-1">{d.sarLabel}</p>
          </div>
          <div className="rounded-lg border border-card-border bg-background p-4 text-center">
            <p className="font-mono-num text-xl font-semibold text-accent">+34%</p>
            <p className="text-xs text-foreground-muted mt-1">{d.survivalLabel}</p>
          </div>
        </div>

        <p className="text-sm sm:text-[0.9375rem] leading-relaxed text-foreground-muted mb-5">{d.explanation}</p>

        <div className="rounded-lg border border-status-partial/30 bg-status-partial/5 p-4 mb-5">
          <p className="text-sm text-foreground-muted">
            <span className="font-semibold text-foreground">{d.fdaLabelTitle}: </span>
            {d.fdaLabelText}
          </p>
        </div>

        <Link
          href={`${prefix}/evidence/devices#therapeutic-device-paradox`}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-accent transition-colors hover:text-accent-hover"
        >
          {d.cta} <ArrowRight size={14} />
        </Link>
      </div>
    </section>
  );
}
