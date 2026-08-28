"use client";

import { StudyCitation } from "@/components/StudyCitation";
import { pickCopy } from "@/lib/i18n";

const FACTORS = [
  {
    label: {
      en: { title: "StAR bottleneck", detail: "Small Ca²⁺ perturbation → large testosterone effect because StAR protein is the rate-limiting step in steroidogenesis", source: "Xiang et al. (2025)" },
      fi: { title: "StAR-pullonkaula", detail: "Pieni Ca²⁺-perturbointia → suuri testosteronivaikutus koska StAR-proteiini on steroidogeneesin nopeutta rajoittava vaihe", source: "Xiang ym. (2025)" },
      ja: { title: "StARボトルネック", detail: "小さなCa²⁺撹乱 → 大きなテストステロン効果。StARタンパク質がステロイド合成の律速段階だからである", source: "Xiang et al. (2025)" },
      fr: { title: "Goulot StAR", detail: "Petite perturbation du Ca²⁺ → effet important sur la testostérone, car la protéine StAR est l'étape limitante de la stéroïdogenèse", source: "Xiang et al. (2025)" },
      ko: { title: "StAR 병목", detail: "작은 Ca²⁺ 교란 → 큰 테스토스테론 효과. StAR 단백질이 스테로이드 생성의 속도 제한 단계이기 때문이다", source: "Xiang et al. (2025)" },
    },
    referenceId: "xiang2025_clc2_ttype",
    color: "#EF4444",
  },
  {
    label: {
      en: { title: "No storage buffer", detail: "Leydig cells store very little steroid — testosterone reflects real-time synthesis, not reserves", source: "Exact 2007 article unresolved" },
      fi: { title: "Ei varastopuskuria", detail: "Leydigin solut varastoivat hyvin vähän steroideita — testosteroni heijastaa reaaliaik. synteesiä", source: "Vuoden 2007 artikkeli yksilöimättä" },
      ja: { title: "貯蔵バッファなし", detail: "ライディッヒ細胞はステロイドをほとんど貯蔵しない — テストステロンは蓄えではなくリアルタイムの合成を反映する", source: "2007年の記事は未特定" },
      fr: { title: "Pas de tampon de stockage", detail: "Les cellules de Leydig stockent très peu de stéroïdes — la testostérone reflète la synthèse en temps réel, et non les réserves", source: "Article de 2007 non résolu" },
      ko: { title: "저장 버퍼 없음", detail: "라이디히 세포는 스테로이드를 거의 저장하지 않는다 — 테스토스테론은 저장량이 아니라 실시간 합성을 반영한다", source: "2007년 기사 미식별" },
    },
    referenceId: null,
    color: "#F59E0B",
  },
  {
    label: {
      en: { title: "Three pathways converge", detail: "Direct Cav3.2 + sleep/melatonin + stress/cortisol all suppress testosterone simultaneously", source: "Asian J Androl 2014" },
      fi: { title: "Kolme polkua konvergoivat", detail: "Suora Cav3.2 + uni/melatoniini + stressi/kortisoli suppressoivat testosteronia samanaikaisesti", source: "Asian J Androl 2014" },
      ja: { title: "3つの経路が収束", detail: "直接的なCav3.2＋睡眠/メラトニン＋ストレス/コルチゾールがすべて同時にテストステロンを抑制する", source: "Asian J Androl 2014" },
      fr: { title: "Trois voies convergent", detail: "Cav3.2 direct + sommeil/mélatonine + stress/cortisol suppriment tous simultanément la testostérone", source: "Asian J Androl 2014" },
      ko: { title: "세 경로의 수렴", detail: "직접 Cav3.2 + 수면/멜라토닌 + 스트레스/코르티솔이 모두 동시에 테스토스테론을 억제한다", source: "Asian J Androl 2014" },
    },
    referenceId: null,
    color: "#8B5CF6",
  },
  {
    label: {
      en: { title: "Anatomically unshielded", detail: "Leydig cells are outside the blood-testis barrier. Phone in pocket = 2.5 cm from target tissue", source: "Assefa & Abdu (2024)" },
      fi: { title: "Anatomisesti suojaamaton", detail: "Leydigin solut ovat veri-kives-esteen ulkopuolella. Puhelin taskussa = 2,5 cm kohdekudoksesta", source: "Assefa & Abdu (2024)" },
      ja: { title: "解剖学的に遮蔽されていない", detail: "ライディッヒ細胞は血液精巣関門の外側にある。ポケット内の電話 = 標的組織から2.5 cm", source: "Assefa & Abdu (2024)" },
      fr: { title: "Anatomiquement non protégé", detail: "Les cellules de Leydig sont hors de la barrière hémato-testiculaire. Téléphone dans la poche = 2,5 cm du tissu cible", source: "Assefa & Abdu (2024)" },
      ko: { title: "해부학적으로 차폐되지 않음", detail: "라이디히 세포는 혈액-고환 장벽 밖에 있다. 주머니 속 전화기 = 표적 조직에서 2.5 cm", source: "Assefa & Abdu (2024)" },
    },
    referenceId: "assefa2024_testes_review",
    color: "#3B82F6",
  },
  {
    label: {
      en: { title: "Feedback cannot compensate", detail: "LH rises but testosterone still falls — the factory is damaged, not the order signal", source: "Wu et al. (2008, EMAS)" },
      fi: { title: "Palaute ei kompensoi", detail: "LH nousee mutta testosteroni laskee silti — tehdas on vaurioitunut, ei tilaussignaali", source: "Wu ym. (2008, EMAS)" },
      ja: { title: "フィードバックでは補えない", detail: "LHは上昇するがテストステロンはなお低下する — 指令信号ではなく工場が損傷している", source: "Wu et al. (2008, EMAS)" },
      fr: { title: "La rétroaction ne peut pas compenser", detail: "La LH augmente mais la testostérone baisse toujours — c'est l'usine qui est endommagée, pas le signal de commande", source: "Wu et al. (2008, EMAS)" },
      ko: { title: "피드백으로 보상할 수 없음", detail: "LH는 상승하지만 테스토스테론은 계속 감소한다 — 주문 신호가 아니라 공장이 손상된 것이다", source: "Wu et al. (2008, EMAS)" },
    },
    referenceId: "wu2008_emas_hpt_axis",
    color: "#22C55E",
  },
  {
    label: {
      en: { title: "Sensitivity increases over time", detail: "CaMKII shifts Cav3.2 activation threshold leftward — chronic exposure makes cells more sensitive", source: "Cav3.2 review (2023)" },
      fi: { title: "Herkkyys kasvaa ajan myötä", detail: "CaMKII siirtää Cav3.2-kynnystä vasemmalle — krooninen altistus tekee soluista herkempiä", source: "Cav3.2-katsaus (2023)" },
      ja: { title: "感度は時間とともに増加", detail: "CaMKIIはCav3.2活性化閾値を左方へ移動させる — 慢性曝露は細胞をより敏感にする", source: "Cav3.2レビュー（2023）" },
      fr: { title: "La sensibilité augmente avec le temps", detail: "CaMKII déplace le seuil d'activation de Cav3.2 vers la gauche — l'exposition chronique rend les cellules plus sensibles", source: "Revue Cav3.2 (2023)" },
      ko: { title: "민감도는 시간에 따라 증가", detail: "CaMKII는 Cav3.2 활성화 역치를 왼쪽으로 이동시킨다 — 만성 노출은 세포를 더 민감하게 만든다", source: "Cav3.2 리뷰 (2023)" },
    },
    referenceId: "camkii-cav32-threshold-2023",
    color: "#EC4899",
  },
];

const HEADING = {
  en: "Six factors that make testosterone exceptionally sensitive",
  fi: "Kuusi tekijää jotka tekevät testosteronista poikkeuksellisen herkkiä",
  ja: "テストステロンを例外的に敏感にする6つの要因",
  fr: "Six facteurs qui rendent la testostérone exceptionnellement sensible",
  ko: "테스토스테론을 예외적으로 민감하게 만드는 6가지 요인",
} as const;

export function SixFactorSummary({ locale = "en" }: { locale?: string }) {
  return (
    <div className="mt-8 mb-4">
      <h3 className="text-sm font-semibold mb-4">
        {pickCopy(HEADING, locale)}
      </h3>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {FACTORS.map((f, i) => {
          const fCopy = pickCopy(f.label, locale);
          return (
            <article
              key={i}
              className="rounded-lg border border-card-border bg-card-bg p-4"
              style={{ borderLeftWidth: 3, borderLeftColor: f.color }}
            >
              <h4 className="text-sm font-semibold mb-1" style={{ color: f.color }}>
                {fCopy.title}
              </h4>
              <p className="text-xs text-foreground-muted leading-relaxed mb-2">
                {fCopy.detail}
              </p>
              <div className="min-w-0 text-[10px] text-foreground-muted/60 font-mono-num">
                {f.referenceId ? (
                  <StudyCitation
                    referenceId={f.referenceId}
                    locale={locale}
                    label={fCopy.source}
                    className="font-mono-num text-accent decoration-dotted underline-offset-2 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 rounded-sm"
                  />
                ) : (
                  fCopy.source
                )}
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
