import Image from "next/image";
import { StudyCitation } from "@/components/StudyCitation";
import { pickCopy } from "@/lib/i18n";

const COPY = {
  en: {
    figure: "Figure 1 · Ixodes / host interface",
    title: "A local electrostatic route to host encounter",
    lead:
      "This figure separates a reported observation from its mechanism illustration. At the host–vegetation interface, a local static-electric gradient can create an attraction force on a polarizable tick.",
    observedLabel: "Observed result",
    resultValue: "15 / 20",
    resultText: "live nymphs fully lifted in the reported apparatus",
    studyFrameLabel: "Reported study frame",
    voltageLabel: "Applied potential",
    voltageValue: "+750 V",
    gapLabel: "Air gap",
    gapValue: "3 mm",
    contextLabel: "Reported comparison",
    resultContext: "0 / 20 at 0 V · median lift time 0.79 s",
    sequenceLabel: "Mechanism route isolated in the study",
    host: "Host + reference geometry",
    interface: "Local EDC / ∇(E²) interface",
    tick: "Tick encounter / attachment",
    illustrationLabel: "Mechanism illustration",
    captionLabel: "Interpretation",
    caption:
      "Conceptual reconstruction of a local host–vegetation interface. Geometry and field lines are illustrative, not to scale and not a field measurement.",
    provenanceLabel: "Evidence provenance",
    sourcePrefix: "Mechanism and reported lift result:",
    source: "England, Lihou & Robert (2023)",
    illustration:
      "Image: BERM–Eco illustration; it is not an experimental photograph or a quantitative field map.",
    link: "Read source",
  },
  fi: {
    figure: "Kuva 1 · Ixodes / isäntärajapinta",
    title: "Paikallinen sähköstaattinen reitti isäntäkohtaamiseen",
    lead:
      "Kuva erottaa raportoidun havainnon sen mekanismikuvasta. Isännän ja kasvillisuuden rajapinnassa paikallinen staattisen sähkökentän gradientti voi synnyttää polarisoituvaan punkkiin vetovoiman.",
    observedLabel: "Havaittu tulos",
    resultValue: "15 / 20",
    resultText: "elävää nymfiä nousi kokonaan raportoidussa koejärjestelyssä",
    studyFrameLabel: "Raportoitu koeasetelma",
    voltageLabel: "Asetettu potentiaali",
    voltageValue: "+750 V",
    gapLabel: "Ilmarako",
    gapValue: "3 mm",
    contextLabel: "Raportoitu vertailu",
    resultContext: "0 / 20 0 V:ssa · nousun mediaaniaika 0,79 s",
    sequenceLabel: "Kokeessa eristetty mekanismireitti",
    host: "Isäntä + referenssigeometria",
    interface: "Paikallinen EDC / ∇(E²) -rajapinta",
    tick: "Punkin kohtaaminen / kiinnittyminen",
    illustrationLabel: "Mekanismikuva",
    captionLabel: "Tulkinta",
    caption:
      "Käsitteellinen rekonstruktio paikallisesta isäntä–kasvillisuusrajapinnasta. Geometria ja kenttäviivat ovat havainnollistavia, eivät mittakaavassa eivätkä kenttämittaus.",
    provenanceLabel: "Näytön lähde ja kuvan alkuperä",
    sourcePrefix: "Mekanismi ja raportoitu nostotulos:",
    source: "England, Lihou & Robert (2023)",
    illustration:
      "Kuva: BERM–Eco-havainnollistus; se ei ole kokeellinen valokuva eikä kvantitatiivinen kenttäkartta.",
    link: "Avaa lähde",
  },
  ja: {
    figure: "図1 · Ixodes / 宿主界面",
    title: "宿主遭遇への局所的静電経路",
    lead:
      "この図は報告された観察とそのメカニズムの図解を分離しています。宿主–植生界面において、局所的な静電勾配は分極可能なダニに誘引力を生み出すことができます。",
    observedLabel: "観測結果",
    resultValue: "15 / 20",
    resultText: "報告された装置で完全に持ち上がった生きた若虫",
    studyFrameLabel: "報告された研究フレーム",
    voltageLabel: "印加電位",
    voltageValue: "+750 V",
    gapLabel: "空気間隙",
    gapValue: "3 mm",
    contextLabel: "報告された比較",
    resultContext: "0 V で 0 / 20 · 持ち上がりの中央値 0.79 秒",
    sequenceLabel: "研究で分離されたメカニズム経路",
    host: "宿主 + 基準幾何学",
    interface: "局所 EDC / ∇(E²) 界面",
    tick: "ダニの遭遇 / 付着",
    illustrationLabel: "メカニズム図解",
    captionLabel: "解釈",
    caption:
      "局所的な宿主–植生界面の概念的再構成。幾何学と電場線は例示的であり、縮尺通りではなく、電場測定ではありません。",
    provenanceLabel: "証拠の出所",
    sourcePrefix: "メカニズムおよび報告された持ち上がり結果:",
    source: "England, Lihou & Robert (2023)",
    illustration:
      "画像: BERM–Eco図解; 実験写真や定量的フィールドマップではありません。",
    link: "出典を読む",
  },
  fr: {
    figure: "Figure 1 · Interface Ixodes / hote",
    title: "Une voie electrostatique locale vers la rencontre avec l'hote",
    lead:
      "Cette figure separe l'observation rapportee de l'illustration de son mecanisme. A l'interface hote–vegetation, un gradient electrostatique local peut creer une force d'attraction sur une tique polarisable.",
    observedLabel: "Resultat observe",
    resultValue: "15 / 20",
    resultText: "nymphes vivantes entierement soulevees dans le dispositif rapporte",
    studyFrameLabel: "Cadre d'etude rapporte",
    voltageLabel: "Potentiel applique",
    voltageValue: "+750 V",
    gapLabel: "Entrefer",
    gapValue: "3 mm",
    contextLabel: "Comparaison rapportee",
    resultContext: "0 / 20 a 0 V · temps median de soulevement 0,79 s",
    sequenceLabel: "Voie mecanistique isolee dans l'etude",
    host: "Hote + geometrie de reference",
    interface: "Interface locale EDC / ∇(E²)",
    tick: "Rencontre / fixation de la tique",
    illustrationLabel: "Illustration du mecanisme",
    captionLabel: "Interpretation",
    caption:
      "Reconstruction conceptuelle d'une interface locale hote–vegetation. La geometrie et les lignes de champ sont illustratives, pas a l'echelle et ne constituent pas une mesure de champ.",
    provenanceLabel: "Provenance des preuves",
    sourcePrefix: "Mecanisme et resultat de soulevement rapporte :",
    source: "England, Lihou & Robert (2023)",
    illustration:
      "Image : illustration BERM–Eco ; ce n'est ni une photographie experimentale ni une carte de champ quantitative.",
    link: "Lire la source",
  },
  ko: {
    figure: "그림 1 · Ixodes / 숙주 계면",
    title: "숙주 조우를 위한 국소 정전 경로",
    lead:
      "이 그림은 보고된 관찰과 그 메커니즘 설명을 분리합니다. 숙주-식생 계면에서 국소 정전기 기울기는 분극 가능한 진드기에 유인력을 생성할 수 있습니다.",
    observedLabel: "관측 결과",
    resultValue: "15 / 20",
    resultText: "보고된 장치에서 완전히 들어올려진 살아있는 약충",
    studyFrameLabel: "보고된 연구 프레임",
    voltageLabel: "인가 전위",
    voltageValue: "+750 V",
    gapLabel: "공기 간극",
    gapValue: "3 mm",
    contextLabel: "보고된 비교",
    resultContext: "0 V에서 0 / 20 · 들어올림 중앙값 0.79초",
    sequenceLabel: "연구에서 분리된 메커니즘 경로",
    host: "숙주 + 기준 기하학",
    interface: "국소 EDC / ∇(E²) 계면",
    tick: "진드기 조우 / 부착",
    illustrationLabel: "메커니즘 그림",
    captionLabel: "해석",
    caption:
      "국소 숙주-식생 계면의 개념적 재구성. 기하학과 전기장선은 예시적이며, 축척에 맞지 않고, 전기장 측정이 아닙니다.",
    provenanceLabel: "증거 출처",
    sourcePrefix: "메커니즘 및 보고된 들어올림 결과:",
    source: "England, Lihou & Robert (2023)",
    illustration:
      "이미지: BERM–Eco 도해; 실험 사진이나 정량적 필드 맵이 아닙니다.",
    link: "출처 읽기",
  },
} as const;

/**
 * Evidence, illustration and provenance intentionally live in separate
 * editorial zones. The image therefore cannot be mistaken for a data panel.
 */
const ALT_TEXT: Record<string, string> = {
  en: "A tick on a blade of grass and mammal fur, with illustrative electrostatic field lines between them.",
  fi: "Punkki ruohonkorsella ja nisäkkään turkki; niiden välissä havainnollistavat sähköstaattiset kenttäviivat.",
  ja: "草の葉とほ乳類の毛皮の上のダニ。それらの間に例示的な静電場線がある。",
  fr: "Une tique sur un brin d'herbe et de la fourrure de mammifere, avec des lignes de champ electrostatique illustratives entre eux.",
  ko: "풀잎과 포유류 털 위의 진드기, 그 사이에 예시적인 정전기장 선이 있음.",
};

export function EcoTickHero({ locale }: { locale: string }) {
  const l: "en" | "fi" | "ja" | "fr" | "ko" = (locale === "fi" || locale === "ja" || locale === "fr" || locale === "ko") ? locale : "en";
  const d = COPY[l];

  return (
    <figure
      aria-labelledby="eco-tick-hero-title"
      className="mb-14 overflow-hidden border-y border-card-border bg-card-bg shadow-[0_20px_60px_-52px_rgba(15,23,42,0.65)] sm:border"
    >
      <div className="grid lg:min-h-[500px] lg:grid-cols-[minmax(0,0.94fr)_minmax(0,1.06fr)]">
        <div className="order-2 flex flex-col px-6 py-8 sm:px-9 sm:py-10 lg:order-1 lg:px-10">
          <div>
            <p className="editorial-kicker text-accent">{d.figure}</p>
            <h2
              id="eco-tick-hero-title"
              className="editorial-section-heading mt-3 max-w-xl text-[clamp(1.85rem,1.3rem+1.5vw,2.65rem)]"
            >
              {d.title}
            </h2>
            <p className="editorial-deck mt-4 max-w-xl">{d.lead}</p>
          </div>

          <section aria-label={d.observedLabel} className="mt-8 border-y editorial-rule py-5">
            <p className="editorial-kicker text-status-confirmed">{d.observedLabel}</p>
            <div className="mt-3 flex items-end gap-4">
              <strong className="font-mono-num shrink-0 text-[2.55rem] font-semibold leading-none tracking-[-0.065em] text-foreground">
                {d.resultValue}
              </strong>
              <span className="mb-0.5 max-w-[15rem] text-xs leading-5 text-foreground-muted">
                {d.resultText}
              </span>
            </div>
          </section>

          <dl className="mt-5 grid grid-cols-2 gap-x-7 gap-y-4" aria-label={d.studyFrameLabel}>
            <div>
              <dt className="editorial-kicker">{d.voltageLabel}</dt>
              <dd className="mt-1 font-mono-num text-sm font-semibold text-foreground">{d.voltageValue}</dd>
            </div>
            <div>
              <dt className="editorial-kicker">{d.gapLabel}</dt>
              <dd className="mt-1 font-mono-num text-sm font-semibold text-foreground">{d.gapValue}</dd>
            </div>
          </dl>
          <p className="mt-5 border-l-2 border-status-partial pl-3 text-xs leading-5 text-foreground-muted">
            <span className="editorial-kicker block text-status-partial">{d.contextLabel}</span>
            <span className="mt-1 block">{d.resultContext}</span>
          </p>
        </div>

        <div className="relative order-1 aspect-[16/10] overflow-hidden border-b border-card-border bg-slate-950 lg:order-2 lg:aspect-auto lg:border-b-0 lg:border-l">
          <Image
            src="/images/eco-tick-fieldstate-hero.png"
            alt={pickCopy(ALT_TEXT, locale)}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 560px"
            className="object-cover object-[26%_50%]"
          />
        </div>
      </div>

      <div className="border-t border-card-border px-6 py-5 sm:px-9 lg:px-10">
        <p className="editorial-kicker">{d.sequenceLabel}</p>
        <ol className="mt-3 grid gap-x-6 gap-y-3 sm:grid-cols-3">
          {[
            ["01", d.host],
            ["02", d.interface],
            ["03", d.tick],
          ].map(([number, label], index) => (
            <li key={number} className="border-t border-card-border pt-3">
              <span
                className={
                  index === 1
                    ? "font-mono-num text-xs font-semibold text-accent"
                    : index === 2
                      ? "font-mono-num text-xs font-semibold text-status-partial"
                      : "font-mono-num text-xs font-semibold text-foreground-muted"
                }
              >
                {number}
              </span>
              <span className="mt-1 block text-xs font-medium leading-5 text-foreground">{label}</span>
            </li>
          ))}
        </ol>
      </div>

      <figcaption className="grid gap-5 border-t border-card-border bg-figure-caption-bg px-6 py-5 sm:grid-cols-[minmax(0,1.15fr)_minmax(16rem,0.85fr)] sm:px-9 lg:px-10">
        <div>
          <p className="editorial-kicker">{d.illustrationLabel}</p>
          <p className="mt-2 text-xs leading-5 text-foreground-muted">
            <span className="font-semibold text-foreground">{d.captionLabel}. </span>
            {d.caption}
          </p>
        </div>
        <div className="border-t border-card-border pt-4 sm:border-t-0 sm:border-l sm:pl-5 sm:pt-0">
          <p className="editorial-kicker">{d.provenanceLabel}</p>
          <p className="mt-2 text-xs leading-5 text-foreground-muted">
            {d.sourcePrefix}{" "}
            <StudyCitation
              referenceId="england_2023_ticks"
              locale={locale}
              label={d.source}
            />
          </p>
          <p className="mt-2 text-[11px] leading-4 text-foreground-muted">{d.illustration}</p>
        </div>
      </figcaption>
    </figure>
  );
}
