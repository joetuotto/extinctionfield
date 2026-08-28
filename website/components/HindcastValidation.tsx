"use client";

import { pickCopy } from "@/lib/i18n";

const copy = {
  en: {
    eyebrow: "LEGACY_TIMING_PROXY",
    title: "Archived scalar hindcast",
    lead: "The former hindcast applied a scalar v17 proxy, calibrated at a late observation, backwards through the same country series. It is retained as method history only and is not shown as a BERM v17 validation result.",
    whyTitle: "Why the numeric display was withdrawn",
    points: [
      "Its inputs were technology-timing and assumed exposure proxies, not measured local FieldState or organ transfer.",
      "The scalar biological-capacity and TFR trajectories were modelled quantities rather than independently observed endpoints.",
      "Backward fitting from a late calibration point is not an externally locked forecast or an identification strategy.",
    ],
    nextTitle: "Required replacement",
    next: "A v2 temporal validation must lock FieldState measurements and biological/ASFR endpoints before evaluation, report the demand, tempo and ART paths separately, and compare against predefined demographic baselines.",
  },
  fi: {
    eyebrow: "LEGACY_TIMING_PROXY",
    title: "Arkistoitu skalaarinen hindcast",
    lead: "Aiempi hindcast sovelsi myöhäiseen havaintoon kalibroitua v17-skalaariproxya taaksepäin samaan maa-aikasarjaan. Se säilytetään vain menetelmähistoriana eikä sitä esitetä BERM v17:n validointituloksena.",
    whyTitle: "Miksi numeerinen näyttö poistettiin",
    points: [
      "Syötteinä oli teknologia-ajoituksen ja oletetun altistuksen proxeja, ei mitattua paikallista FieldStatea tai elinkohtaista siirtoa.",
      "Skalaariset biologisen kapasiteetin ja TFR:n trajektorit olivat mallinnettuja suureita, eivät riippumattomasti havaittuja päätepisteitä.",
      "Taaksepäin sovitus myöhäisestä kalibrointipisteestä ei ole ulkoisesti lukittu ennuste eikä identifikaatiostrategia.",
    ],
    nextTitle: "Vaadittu korvaava asetelma",
    next: "V2:n ajallisen validoinnin on lukittava FieldState-mittaukset ja biologiset/ASFR-päätepisteet ennen arviointia, raportoitava kysyntä-, tempo- ja ART-polut erikseen ja verrattava ennalta määriteltyihin demografisiin vertailuihin.",
  },
  ja: {
    eyebrow: "LEGACY_TIMING_PROXY",
    title: "アーカイブ済みスカラーヒンドキャスト",
    lead: "以前のヒンドキャストは、遅い観測点で較正されたスカラーv17プロキシを同じ国別時系列に遡って適用しました。方法論の記録としてのみ保持され、BERM v17の検証結果としては提示されません。",
    whyTitle: "数値表示が取り下げられた理由",
    points: [
      "入力は技術タイミングと仮定された曝露プロキシであり、測定されたローカルFieldStateや臓器移転ではありませんでした。",
      "スカラーの生物学的容量およびTFR軌道はモデル化された量であり、独立に観察されたエンドポイントではありませんでした。",
      "遅い較正点からの逆方向フィッティングは、外部的にロックされた予測でも識別戦略でもありません。",
    ],
    nextTitle: "必要な代替手法",
    next: "v2の時間的検証は、評価前にFieldState測定値と生物学的/ASFRエンドポイントをロックし、需要・テンポ・ARTパスを個別に報告し、事前定義された人口統計学的ベースラインと比較する必要があります。",
  },
  fr: {
    eyebrow: "LEGACY_TIMING_PROXY",
    title: "Hindcast scalaire archivé",
    lead: "L'ancien hindcast appliquait un proxy scalaire v17, calibré sur une observation tardive, rétrospectivement à travers la même série nationale. Il est conservé uniquement comme historique de méthode et n'est pas présenté comme résultat de validation BERM v17.",
    whyTitle: "Pourquoi l'affichage numérique a été retiré",
    points: [
      "Ses entrées étaient des proxys de chronologie technologique et d'exposition supposée, pas de FieldState local mesuré ni de transfert d'organe.",
      "Les trajectoires scalaires de capacité biologique et de TFR étaient des quantités modélisées plutôt que des endpoints observés indépendamment.",
      "L'ajustement rétrospectif à partir d'un point de calibration tardif n'est ni une prévision verrouillée de l'extérieur ni une stratégie d'identification.",
    ],
    nextTitle: "Remplacement requis",
    next: "Une validation temporelle v2 doit verrouiller les mesures FieldState et les endpoints biologiques/ASFR avant l'évaluation, rapporter les voies de demande, tempo et ART séparément, et comparer avec des références démographiques prédéfinies.",
  },
  ko: {
    eyebrow: "LEGACY_TIMING_PROXY",
    title: "아카이브된 스칼라 사후검증",
    lead: "이전 사후검증은 늦은 관측점에서 보정된 스칼라 v17 프록시를 같은 국가 시계열에 역방향으로 적용했습니다. 방법론 이력으로만 보존되며 BERM v17 검증 결과로는 제시되지 않습니다.",
    whyTitle: "수치 표시가 철회된 이유",
    points: [
      "입력값은 기술 타이밍과 가정된 노출 프록시였으며, 측정된 로컬 FieldState나 장기 전달이 아니었습니다.",
      "스칼라 생물학적 용량 및 TFR 궤적은 모델링된 수량이었으며, 독립적으로 관찰된 종점이 아니었습니다.",
      "늦은 보정점으로부터의 역방향 피팅은 외부적으로 잠긴 예측이나 식별 전략이 아닙니다.",
    ],
    nextTitle: "필요한 대체 설계",
    next: "v2 시간적 검증은 평가 전에 FieldState 측정값과 생물학적/ASFR 종점을 잠그고, 수요·템포·ART 경로를 개별적으로 보고하며, 사전 정의된 인구통계학적 기준선과 비교해야 합니다.",
  },
} as const;

export function HindcastValidation({ locale }: { locale: string }) {
  const d = pickCopy(copy, locale);
  return (
    <section id="hindcast" className="mb-14 max-w-4xl rounded-xl border border-status-partial/30 bg-status-partial/5 p-5">
      <p className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-status-partial">{d.eyebrow}</p>
      <h2 className="mb-2 text-xl font-semibold">{d.title}</h2>
      <p className="text-sm leading-relaxed text-foreground-muted">{d.lead}</p>

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <div className="rounded-lg border border-card-border bg-background p-4">
          <h3 className="mb-2 text-sm font-semibold">{d.whyTitle}</h3>
          <ul className="space-y-2 text-xs leading-relaxed text-foreground-muted">
            {d.points.map((point) => <li key={point}>{point}</li>)}
          </ul>
        </div>
        <div className="rounded-lg border border-card-border bg-background p-4">
          <h3 className="mb-2 text-sm font-semibold">{d.nextTitle}</h3>
          <p className="text-xs leading-relaxed text-foreground-muted">{d.next}</p>
        </div>
      </div>
    </section>
  );
}
