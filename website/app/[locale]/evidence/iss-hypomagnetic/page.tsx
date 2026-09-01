import type { Metadata } from "next";
import Link from "next/link";
import { Rocket } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { CautionBox } from "@/components/CautionBox";
import { StudyCitation } from "@/components/StudyCitation";
import { pickCopy } from "@/lib/i18n";

type EffectRow = {
  effect: string;
  observation: string;
  reference: string;
};

type ReferenceEntry = {
  citation: string;
  referenceId: string;
};

const COPY = {
  en: {
    title: "ISS as Hypomagnetic Experiment",
    subtitle:
      "The International Space Station as an unintentional validation of BERM's cryptochrome spin susceptibility (χ_B) prediction.",
    backLink: "← Back to Evidence",

    cautionText:
      "This section uses ISS astronaut data as an unintentional natural experiment. Astronauts are NOT a designed RCT — microgravity, radiation, and confinement are major confounders. The magnetic field component is one of several simultaneous exposures.",

    leadParagraph:
      "The International Space Station orbits at ~400 km altitude where the geomagnetic field strength drops to B ≈ 0–few μT (compared to 25–65 μT at Earth’s surface). Astronauts experience dramatic magnetic field reduction during their 6-month missions — a natural experiment in what happens when cryptochrome’s spin susceptibility (χ_B) loses its geomagnetic reference background.",

    effectsTitle: "Observed effects in spaceflight",
    effects: [
      {
        effect: "Circadian rhythm",
        observation: "Phase delay 2.7–3.0 hours in low light conditions",
        reference: "hirayama2023_melatonin_space",
      },
      {
        effect: "Sleep duration",
        observation: "Only 6.4 h vs 7–8 h on Earth",
        reference: "hirayama2023_melatonin_space",
      },
      {
        effect: "Melatonin",
        observation: "Declined in microgravity in vitro, STS-132 mission",
        reference: "hirayama2023_melatonin_space",
      },
      {
        effect: "Thymic involution",
        observation:
          "Spaceflight accelerates thymic involution, T-cell production decreased",
        reference: "pmc11802524_thymus",
      },
      {
        effect: "Clock genes",
        observation:
          "Ionizing radiation disrupts Clock, Bmal1, Ror expression in testis",
        reference: "pmc8507176_ir_clock_testis",
      },
      {
        effect: "CRY expression",
        observation:
          "Hypomagnetic field affects CRY1/CRY2 expression levels in insects",
        reference: "nsr2024_hmf_astronaut_cry",
      },
    ] as EffectRow[],

    interpretationTitle: "BERM interpretation: Convergence on CRY/RPM",
    interpretationParagraphs: [
      "All six observed effects converge on the cryptochrome/radical pair mechanism (CRY/RPM) pathway. When the geomagnetic field approaches zero, cryptochrome loses its magnetic reference signal. The radical pair mechanism requires a static magnetic field to bias singlet-triplet interconversion — without it, the spin dynamics that drive circadian timing become unanchored.",
      "The cascade follows the BERM-predicted sequence: B_geo approaches 0 → cryptochrome loses magnetic reference → circadian rhythm disrupts → melatonin production decreases → downstream immune suppression + reproductive effects. This is the SAME mechanism BERM predicts for anthropogenic EMF exposure — different cause (field absence vs field distortion), but the same molecular target (CRY).",
      "The ISS data provides a unique perspective: it shows what happens at the extreme end of magnetic field reduction. If removing the field entirely produces circadian and immune disruption through CRY, then distorting the field with anthropogenic EMF should produce qualitatively similar — though potentially less severe — effects through the same pathway.",
    ],

    falsificationTitle: "Falsification criterion",
    falsificationContent:
      "If ISS health effects are fully and completely explained by microgravity and ionizing radiation alone, with no magnetic field component whatsoever, this would weaken the χ_B pathway. Specifically: if astronauts in a future station with restored geomagnetic field strength (via Helmholtz coils) show identical circadian disruption and immune suppression as current ISS astronauts, the magnetic field hypothesis for these effects would be falsified.",

    referencesTitle: "Key references",
    references: [
      { citation: "Hirayama et al. (2023)", referenceId: "hirayama2023_melatonin_space" },
      { citation: "NSR (2024) — HMF astronaut CRY", referenceId: "nsr2024_hmf_astronaut_cry" },
      { citation: "Frontiers (2021) — HMF circadian", referenceId: "frontiers2021_hmf_circadian" },
      { citation: "PMC11802524 — Thymus spaceflight", referenceId: "pmc11802524_thymus" },
      { citation: "PMC8507176 — IR clock testis", referenceId: "pmc8507176_ir_clock_testis" },
      { citation: "PMC4501744 — Planthopper NZMF", referenceId: "pmc4501744_planthopper_nzmf" },
    ] as ReferenceEntry[],
  },

  fi: {
    title: "ISS hypomagneettisena kokeena",
    subtitle:
      "Kansainvälinen avaruusasema tahattomana validointina BERM:n kryptokromin spin-suskeptibiliteetti (χ_B) -ennusteelle.",
    backLink: "← Takaisin näyttöön",

    cautionText:
      "Tämä osio käyttää ISS-astronauttidataa tahattomana luonnollisena kokeena. Astronautit EIVÄT ole suunniteltu RCT — mikrogravitaatio, säteily ja eristys ovat merkittäviä sekoittavia tekijöitä. Magneettikentäkomponentti on yksi useista samanaikaisista altistuksista.",

    leadParagraph:
      "Kansainvälinen avaruusasema kiertaa noin 400 km korkeudessa, jossa geomagneettisen kentän voimakkuus putoaa tasolle B ≈ 0–muutama μT (verrattuna 25–65 μT Maan pinnalla). Astronautit kokevat dramaattisen magneettikentän vaimenemisen 6 kuukauden tehtäviensä aikana — luonnollinen koe siitä, mitä tapahtuu kun kryptokromin spin-suskeptibiliteetti (χ_B) menettää geomagneettisen referenssitaustansa.",

    effectsTitle: "Havaitut vaikutukset avaruuslennolla",
    effects: [
      {
        effect: "Sirkadiaanirytmi",
        observation: "Vaiheviive 2,7–3,0 tuntia heikoissa valo-olosuhteissa",
        reference: "hirayama2023_melatonin_space",
      },
      {
        effect: "Unen kesto",
        observation: "Vain 6,4 h vs 7–8 h Maassa",
        reference: "hirayama2023_melatonin_space",
      },
      {
        effect: "Melatoniini",
        observation: "Laski mikrogravitaatiossa in vitro, STS-132-tehtävä",
        reference: "hirayama2023_melatonin_space",
      },
      {
        effect: "Kateenkorvan involuutio",
        observation:
          "Avaruuslento kiihdyttää kateenkorvan involuutiota, T-solutuotanto laskee",
        reference: "pmc11802524_thymus",
      },
      {
        effect: "Kellogeneet",
        observation:
          "Ionisoiva säteily häiritsee Clock-, Bmal1-, Ror-ekspressiota kiveksessä",
        reference: "pmc8507176_ir_clock_testis",
      },
      {
        effect: "CRY-ekspressio",
        observation:
          "Hypomagneettinen kenttä vaikuttaa CRY1/CRY2-ekspressiotasoihin hyönteisissä",
        reference: "nsr2024_hmf_astronaut_cry",
      },
    ] as EffectRow[],

    interpretationTitle: "BERM-tulkinta: Yhdentyminen CRY/RPM-reitille",
    interpretationParagraphs: [
      "Kaikki kuusi havaittua vaikutusta yhtyvat kryptokromin/radikaaliparin mekanismi (CRY/RPM) -reitille. Kun geomagneettinen kenttä lähestyy nollaa, kryptokromi menettää magneettisen referenssisignaalinsa. Radikaaliparin mekanismi vaatii staattisen magneettikentän singlet-tripletti-muunnoksen ohjaamiseen — ilman sitä kellonajanmukaista ajoitusta ohjaavat spindynamiikat menettävät ankkurinsa.",
      "Kaskadi noudattaa BERM:n ennustamaa järjestysta: B_geo lähestyy nollaa → kryptokromi menettää magneettisen referenssin → sirkadiaanirytmi häiriytyy → melatoniinituotanto laskee → immuunisuppressio + lisääntymisvaikutukset. Tämä on SAMA mekanismi, jonka BERM ennustaa antropogeeniselle EMF-altistukselle — eri syy (kentän poissaolo vs kentän vääristyminen), mutta sama molekulaarinen kohde (CRY).",
      "ISS-data tarjoaa ainutlaatuisen näkökulman: se näyttää mitä tapahtuu magneettikentän vaimenemisen äärimmäisessä päässä. Jos kentän poistaminen kokonaan tuottaa sirkadiaanisen ja immunologisen häiriön CRY:n kautta, niin kentän vääristäminen antropogeenisella EMF:lla pitaisi tuottaa laadullisesti samankaltaisia — joskin mahdollisesti lievempiä — vaikutuksia saman reitin kautta.",
    ],

    falsificationTitle: "Falsifiointikriteeri",
    falsificationContent:
      "Jos ISS:n terveysvaikutukset selittyvät täysin ja kokonaan mikrogravitaatiolla ja ionisoivalla säteilyllä, ilman mitään magneettikentäkomponenttia, tämä heikentäisi χ_B-reittiä. Erityisesti: jos astronautit tulevassa asemassa, jossa geomagneettinen kentänvoimakkuus on palautettu (Helmholtz-kelojen avulla), osoittavat identtistä sirkadiaanista häiriötä ja immuunisuppressiota kuin nykyiset ISS-astronautit, magneettikentähypoteesi näistä vaikutuksista olisi falsifioitu.",

    referencesTitle: "Avainlähteet",
    references: [
      { citation: "Hirayama et al. (2023)", referenceId: "hirayama2023_melatonin_space" },
      { citation: "NSR (2024) — HMF astronaut CRY", referenceId: "nsr2024_hmf_astronaut_cry" },
      { citation: "Frontiers (2021) — HMF circadian", referenceId: "frontiers2021_hmf_circadian" },
      { citation: "PMC11802524 — Thymus spaceflight", referenceId: "pmc11802524_thymus" },
      { citation: "PMC8507176 — IR clock testis", referenceId: "pmc8507176_ir_clock_testis" },
      { citation: "PMC4501744 — Planthopper NZMF", referenceId: "pmc4501744_planthopper_nzmf" },
    ] as ReferenceEntry[],
  },

  ja: {
    title: "ISSの低磁場実験",
    subtitle:
      "国際宇宙ステーションがBERMのクリプトクロムスピン感受性（χ_B）予測を意図せず検証",
    backLink: "← 証拠に戻る",

    cautionText:
      "This section uses ISS astronaut data as an unintentional natural experiment. Astronauts are NOT a designed RCT — microgravity, radiation, and confinement are major confounders. The magnetic field component is one of several simultaneous exposures.",

    leadParagraph:
      "The International Space Station orbits at ~400 km altitude where the geomagnetic field strength drops to B ≈ 0–few μT (compared to 25–65 μT at Earth’s surface). Astronauts experience dramatic magnetic field reduction during their 6-month missions — a natural experiment in what happens when cryptochrome’s spin susceptibility (χ_B) loses its geomagnetic reference background.",

    effectsTitle: "宇宙飛行で観察された影響",
    effects: [
      {
        effect: "Circadian rhythm",
        observation: "Phase delay 2.7–3.0 hours in low light conditions",
        reference: "hirayama2023_melatonin_space",
      },
      {
        effect: "Sleep duration",
        observation: "Only 6.4 h vs 7–8 h on Earth",
        reference: "hirayama2023_melatonin_space",
      },
      {
        effect: "Melatonin",
        observation: "Declined in microgravity in vitro, STS-132 mission",
        reference: "hirayama2023_melatonin_space",
      },
      {
        effect: "Thymic involution",
        observation:
          "Spaceflight accelerates thymic involution, T-cell production decreased",
        reference: "pmc11802524_thymus",
      },
      {
        effect: "Clock genes",
        observation:
          "Ionizing radiation disrupts Clock, Bmal1, Ror expression in testis",
        reference: "pmc8507176_ir_clock_testis",
      },
      {
        effect: "CRY expression",
        observation:
          "Hypomagnetic field affects CRY1/CRY2 expression levels in insects",
        reference: "nsr2024_hmf_astronaut_cry",
      },
    ] as EffectRow[],

    interpretationTitle: "BERM解釈：CRY/RPMへの収束",
    interpretationParagraphs: [
      "All six observed effects converge on the cryptochrome/radical pair mechanism (CRY/RPM) pathway. When the geomagnetic field approaches zero, cryptochrome loses its magnetic reference signal. The radical pair mechanism requires a static magnetic field to bias singlet-triplet interconversion — without it, the spin dynamics that drive circadian timing become unanchored.",
      "The cascade follows the BERM-predicted sequence: B_geo approaches 0 → cryptochrome loses magnetic reference → circadian rhythm disrupts → melatonin production decreases → downstream immune suppression + reproductive effects. This is the SAME mechanism BERM predicts for anthropogenic EMF exposure — different cause (field absence vs field distortion), but the same molecular target (CRY).",
      "The ISS data provides a unique perspective: it shows what happens at the extreme end of magnetic field reduction. If removing the field entirely produces circadian and immune disruption through CRY, then distorting the field with anthropogenic EMF should produce qualitatively similar — though potentially less severe — effects through the same pathway.",
    ],

    falsificationTitle: "反証基準",
    falsificationContent:
      "If ISS health effects are fully and completely explained by microgravity and ionizing radiation alone, with no magnetic field component whatsoever, this would weaken the χ_B pathway. Specifically: if astronauts in a future station with restored geomagnetic field strength (via Helmholtz coils) show identical circadian disruption and immune suppression as current ISS astronauts, the magnetic field hypothesis for these effects would be falsified.",

    referencesTitle: "主要参考文献",
    references: [
      { citation: "Hirayama et al. (2023)", referenceId: "hirayama2023_melatonin_space" },
      { citation: "NSR (2024) — HMF astronaut CRY", referenceId: "nsr2024_hmf_astronaut_cry" },
      { citation: "Frontiers (2021) — HMF circadian", referenceId: "frontiers2021_hmf_circadian" },
      { citation: "PMC11802524 — Thymus spaceflight", referenceId: "pmc11802524_thymus" },
      { citation: "PMC8507176 — IR clock testis", referenceId: "pmc8507176_ir_clock_testis" },
      { citation: "PMC4501744 — Planthopper NZMF", referenceId: "pmc4501744_planthopper_nzmf" },
    ] as ReferenceEntry[],
  },

  fr: {
    title: "L’ISS comme expérience hypomagnétique",
    subtitle:
      "La Station spatiale internationale comme validation involontaire de la prédiction de susceptibilité de spin du cryptochrome (χ_B) de BERM.",
    backLink: "← Retour aux preuves",

    cautionText:
      "This section uses ISS astronaut data as an unintentional natural experiment. Astronauts are NOT a designed RCT — microgravity, radiation, and confinement are major confounders. The magnetic field component is one of several simultaneous exposures.",

    leadParagraph:
      "The International Space Station orbits at ~400 km altitude where the geomagnetic field strength drops to B ≈ 0–few μT (compared to 25–65 μT at Earth’s surface). Astronauts experience dramatic magnetic field reduction during their 6-month missions — a natural experiment in what happens when cryptochrome’s spin susceptibility (χ_B) loses its geomagnetic reference background.",

    effectsTitle: "Effets observés en vol spatial",
    effects: [
      {
        effect: "Circadian rhythm",
        observation: "Phase delay 2.7–3.0 hours in low light conditions",
        reference: "hirayama2023_melatonin_space",
      },
      {
        effect: "Sleep duration",
        observation: "Only 6.4 h vs 7–8 h on Earth",
        reference: "hirayama2023_melatonin_space",
      },
      {
        effect: "Melatonin",
        observation: "Declined in microgravity in vitro, STS-132 mission",
        reference: "hirayama2023_melatonin_space",
      },
      {
        effect: "Thymic involution",
        observation:
          "Spaceflight accelerates thymic involution, T-cell production decreased",
        reference: "pmc11802524_thymus",
      },
      {
        effect: "Clock genes",
        observation:
          "Ionizing radiation disrupts Clock, Bmal1, Ror expression in testis",
        reference: "pmc8507176_ir_clock_testis",
      },
      {
        effect: "CRY expression",
        observation:
          "Hypomagnetic field affects CRY1/CRY2 expression levels in insects",
        reference: "nsr2024_hmf_astronaut_cry",
      },
    ] as EffectRow[],

    interpretationTitle: "Interprétation BERM : Convergence vers CRY/RPM",
    interpretationParagraphs: [
      "All six observed effects converge on the cryptochrome/radical pair mechanism (CRY/RPM) pathway. When the geomagnetic field approaches zero, cryptochrome loses its magnetic reference signal. The radical pair mechanism requires a static magnetic field to bias singlet-triplet interconversion — without it, the spin dynamics that drive circadian timing become unanchored.",
      "The cascade follows the BERM-predicted sequence: B_geo approaches 0 → cryptochrome loses magnetic reference → circadian rhythm disrupts → melatonin production decreases → downstream immune suppression + reproductive effects. This is the SAME mechanism BERM predicts for anthropogenic EMF exposure — different cause (field absence vs field distortion), but the same molecular target (CRY).",
      "The ISS data provides a unique perspective: it shows what happens at the extreme end of magnetic field reduction. If removing the field entirely produces circadian and immune disruption through CRY, then distorting the field with anthropogenic EMF should produce qualitatively similar — though potentially less severe — effects through the same pathway.",
    ],

    falsificationTitle: "Critère de falsification",
    falsificationContent:
      "If ISS health effects are fully and completely explained by microgravity and ionizing radiation alone, with no magnetic field component whatsoever, this would weaken the χ_B pathway. Specifically: if astronauts in a future station with restored geomagnetic field strength (via Helmholtz coils) show identical circadian disruption and immune suppression as current ISS astronauts, the magnetic field hypothesis for these effects would be falsified.",

    referencesTitle: "Références clés",
    references: [
      { citation: "Hirayama et al. (2023)", referenceId: "hirayama2023_melatonin_space" },
      { citation: "NSR (2024) — HMF astronaut CRY", referenceId: "nsr2024_hmf_astronaut_cry" },
      { citation: "Frontiers (2021) — HMF circadian", referenceId: "frontiers2021_hmf_circadian" },
      { citation: "PMC11802524 — Thymus spaceflight", referenceId: "pmc11802524_thymus" },
      { citation: "PMC8507176 — IR clock testis", referenceId: "pmc8507176_ir_clock_testis" },
      { citation: "PMC4501744 — Planthopper NZMF", referenceId: "pmc4501744_planthopper_nzmf" },
    ] as ReferenceEntry[],
  },

  ko: {
    title: "ISS 저자기장 실험",
    subtitle:
      "BERM의 크립토크롬 스핀 감수성(χ_B) 예측에 대한 의도치 않은 검증으로서의 국제우주정거장.",
    backLink: "← 증거로 돌아가기",

    cautionText:
      "This section uses ISS astronaut data as an unintentional natural experiment. Astronauts are NOT a designed RCT — microgravity, radiation, and confinement are major confounders. The magnetic field component is one of several simultaneous exposures.",

    leadParagraph:
      "The International Space Station orbits at ~400 km altitude where the geomagnetic field strength drops to B ≈ 0–few μT (compared to 25–65 μT at Earth’s surface). Astronauts experience dramatic magnetic field reduction during their 6-month missions — a natural experiment in what happens when cryptochrome’s spin susceptibility (χ_B) loses its geomagnetic reference background.",

    effectsTitle: "우주 비행에서 관찰된 효과",
    effects: [
      {
        effect: "Circadian rhythm",
        observation: "Phase delay 2.7–3.0 hours in low light conditions",
        reference: "hirayama2023_melatonin_space",
      },
      {
        effect: "Sleep duration",
        observation: "Only 6.4 h vs 7–8 h on Earth",
        reference: "hirayama2023_melatonin_space",
      },
      {
        effect: "Melatonin",
        observation: "Declined in microgravity in vitro, STS-132 mission",
        reference: "hirayama2023_melatonin_space",
      },
      {
        effect: "Thymic involution",
        observation:
          "Spaceflight accelerates thymic involution, T-cell production decreased",
        reference: "pmc11802524_thymus",
      },
      {
        effect: "Clock genes",
        observation:
          "Ionizing radiation disrupts Clock, Bmal1, Ror expression in testis",
        reference: "pmc8507176_ir_clock_testis",
      },
      {
        effect: "CRY expression",
        observation:
          "Hypomagnetic field affects CRY1/CRY2 expression levels in insects",
        reference: "nsr2024_hmf_astronaut_cry",
      },
    ] as EffectRow[],

    interpretationTitle: "BERM 해석: CRY/RPM으로의 수렴",
    interpretationParagraphs: [
      "All six observed effects converge on the cryptochrome/radical pair mechanism (CRY/RPM) pathway. When the geomagnetic field approaches zero, cryptochrome loses its magnetic reference signal. The radical pair mechanism requires a static magnetic field to bias singlet-triplet interconversion — without it, the spin dynamics that drive circadian timing become unanchored.",
      "The cascade follows the BERM-predicted sequence: B_geo approaches 0 → cryptochrome loses magnetic reference → circadian rhythm disrupts → melatonin production decreases → downstream immune suppression + reproductive effects. This is the SAME mechanism BERM predicts for anthropogenic EMF exposure — different cause (field absence vs field distortion), but the same molecular target (CRY).",
      "The ISS data provides a unique perspective: it shows what happens at the extreme end of magnetic field reduction. If removing the field entirely produces circadian and immune disruption through CRY, then distorting the field with anthropogenic EMF should produce qualitatively similar — though potentially less severe — effects through the same pathway.",
    ],

    falsificationTitle: "반증 기준",
    falsificationContent:
      "If ISS health effects are fully and completely explained by microgravity and ionizing radiation alone, with no magnetic field component whatsoever, this would weaken the χ_B pathway. Specifically: if astronauts in a future station with restored geomagnetic field strength (via Helmholtz coils) show identical circadian disruption and immune suppression as current ISS astronauts, the magnetic field hypothesis for these effects would be falsified.",

    referencesTitle: "핵심 참고문헌",
    references: [
      { citation: "Hirayama et al. (2023)", referenceId: "hirayama2023_melatonin_space" },
      { citation: "NSR (2024) — HMF astronaut CRY", referenceId: "nsr2024_hmf_astronaut_cry" },
      { citation: "Frontiers (2021) — HMF circadian", referenceId: "frontiers2021_hmf_circadian" },
      { citation: "PMC11802524 — Thymus spaceflight", referenceId: "pmc11802524_thymus" },
      { citation: "PMC8507176 — IR clock testis", referenceId: "pmc8507176_ir_clock_testis" },
      { citation: "PMC4501744 — Planthopper NZMF", referenceId: "pmc4501744_planthopper_nzmf" },
    ] as ReferenceEntry[],
  },
} as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const d = pickCopy(COPY, locale);
  return {
    title: `${d.title} – Extinction Field`,
    description: d.subtitle,
  };
}

export default async function IssHypomagneticPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const d = pickCopy(COPY, locale);
  const prefix = `/${locale}`;

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 sm:py-20">
      <p className="mb-6">
        <Link href={`${prefix}/evidence`} className="text-sm text-accent hover:underline">
          {d.backLink}
        </Link>
      </p>

      <PageHeader icon={Rocket} title={d.title} subtitle={d.subtitle} />

      <div className="mt-8">
        <CautionBox locale={locale}>
          <p>{d.cautionText}</p>
        </CautionBox>
      </div>

      {/* Lead paragraph */}
      <section className="mt-12">
        <p className="text-sm text-foreground-muted leading-relaxed mb-4 max-w-3xl">
          {d.leadParagraph}
        </p>
      </section>

      {/* Observed effects in spaceflight */}
      <section className="mt-14 border-t editorial-rule pt-6">
        <h2 className="text-lg font-semibold mb-2">{d.effectsTitle}</h2>
        <div className="grid gap-3 mt-4 sm:grid-cols-2">
          {d.effects.map((row, i) => (
            <div key={i} className="flex h-full flex-col rounded-lg border border-card-border bg-card-bg p-4">
              <div className="flex items-start justify-between gap-3 mb-2">
                <h3 className="font-semibold text-sm">{row.effect}</h3>
              </div>
              <p className="text-sm text-foreground-muted leading-relaxed mb-2">
                {row.observation}
              </p>
              <p className="mt-auto text-xs text-foreground-muted/60">
                <StudyCitation referenceId={row.reference} locale={locale} />
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* BERM interpretation */}
      <section className="mt-14 border-t editorial-rule pt-6">
        <h2 className="text-lg font-semibold mb-2">{d.interpretationTitle}</h2>
        {d.interpretationParagraphs.map((p, i) => (
          <p
            key={i}
            className="text-sm text-foreground-muted leading-relaxed mb-4 max-w-3xl"
          >
            {p}
          </p>
        ))}
      </section>

      {/* Falsification criterion */}
      <section className="mt-14 border-t editorial-rule pt-6">
        <h2 className="text-lg font-semibold mb-2">{d.falsificationTitle}</h2>
        <div className="rounded-lg border-2 border-amber-500/30 bg-amber-500/5 p-4">
          <p className="text-sm text-foreground-muted leading-relaxed">
            {d.falsificationContent}
          </p>
        </div>
      </section>

      {/* Key references */}
      <section className="mt-14 border-t editorial-rule pt-6">
        <h2 className="text-lg font-semibold mb-2">{d.referencesTitle}</h2>
        <ul className="space-y-2">
          {d.references.map((ref, i) => (
            <li key={i} className="text-sm text-foreground-muted">
              <StudyCitation referenceId={ref.referenceId} locale={locale} label={ref.citation} />
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
