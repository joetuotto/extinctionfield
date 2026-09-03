"use client";

import Link from "next/link";
import { ArrowRight, CheckCircle } from "lucide-react";
import { StudyCitation } from "@/components/StudyCitation";
import { pickCopy } from "@/lib/i18n";

const COPY = {
  en: {
    kicker: "PROTOCOL-SPECIFIC CLINICAL ANCHOR",
    title: "A bounded carrier × envelope × channel example",
    fdaApproval: "FDA HDE approval (2023, H220001) for advanced hepatocellular carcinoma",
    channelLabel: "Cav3.2 response in the tested HCC protocol",
    sarLabel: "below mobile phone SAR — non-thermal by definition",
    survivalLabel: "stable disease beyond six months",
    explanation:
      "TheraBionic P1 applies a specified 27.12 MHz amplitude-modulated protocol in advanced liver cancer. The published HCC experiments identify Cav3.2-dependent calcium influx and tumour-cell differentiation. This is direct component evidence for a carrier × envelope × channel × organ route under that protocol. It does not establish the same kernel, dose or endpoint in reproductive tissue or chronic environmental exposure.",
    fdaLabelTitle: "FDA device labeling",
    fdaLabelText:
      "The label advises against use with agents that block L- or T-type voltage-gated calcium channels unless treatment is modified. This is a protocol-level pharmacological constraint consistent with the proposed channel route; it is not a randomized blocker experiment.",
    cta: "Read the full TheraBionic evidence analysis",
  },
  fi: {
    kicker: "PROTOKOLLIKOHTAINEN KLIININEN ANKKURI",
    title: "Rajattu kantoaalto × verhokäyrä × kanava -esimerkki",
    fdaApproval: "FDA:n HDE-hyväksyntä (2023, H220001) edenneeseen maksasolukarsinoomaan",
    channelLabel: "Cav3.2-vaste testatussa HCC-protokollassa",
    sarLabel: "matkapuhelimen SAR:n alla — ei-terminen määritelmällisesti",
    survivalLabel: "vakaa tauti yli kuusi kuukautta",
    explanation:
      "TheraBionic P1 käyttää edenneessä maksasyövässä määriteltyä 27,12 MHz:n amplitudimoduloitua protokollaa. Julkaistut HCC-kokeet tunnistavat Cav3.2-riippuvaisen kalsiumvirtauksen ja kasvainsolujen erilaistumisen. Tämä on suoraa komponenttinäyttöä kantoaalto × verhokäyrä × kanava × elin -reitille kyseisessä protokollassa. Se ei osoita samaa ydintä, annosta tai päätepistettä lisääntymiskudoksessa tai kroonisessa ympäristöaltistuksessa.",
    fdaLabelTitle: "FDA:n laitemerkintä",
    fdaLabelText:
      "Merkintä neuvoo välttämään käyttöä L- tai T-tyypin kalsiumkanavia salpaavien aineiden kanssa, ellei hoitoa muuteta. Tämä on ehdotetun kanavareitin kanssa yhteensopiva protokollarajoite, ei satunnaistettu salpaajakoe.",
    cta: "Lue koko TheraBionic-näyttöanalyysi",
  },
  ja: {
    kicker: "プロトコル固有の臨床アンカー",
    title: "限定されたキャリア×包絡線×チャネルの例",
    fdaApproval: "FDA HDE承認（2023年、H220001）",
    channelLabel: "試験済みHCCプロトコルのCav3.2応答",
    sarLabel: "携帯電話のSAR以下 — 定義上非熱的",
    survivalLabel: "6か月超の病勢安定",
    explanation:
      "TheraBionic P1は特定の27.12 MHz振幅変調プロトコルを用います。HCC実験はCav3.2依存性カルシウム流入を示しますが、生殖組織や慢性環境曝露に同じカーネル、線量、エンドポイントが成立することは示しません。",
    fdaLabelTitle: "FDAデバイス表示",
    fdaLabelText:
      "表示上のカルシウムチャネル遮断薬に関する注意は、提案経路と整合するプロトコル制約ですが、無作為化遮断薬実験ではありません。",
    cta: "TheraBionicエビデンス分析の全文を読む",
  },
  fr: {
    kicker: "ANCRAGE CLINIQUE PROPRE AU PROTOCOLE",
    title: "Un exemple borné porteuse × enveloppe × canal",
    fdaApproval: "Autorisation FDA HDE (2023, H220001)",
    channelLabel: "Réponse Cav3.2 dans le protocole CHC testé",
    sarLabel: "en dessous du DAS du téléphone mobile — non thermique par définition",
    survivalLabel: "maladie stable au-delà de six mois",
    explanation:
      "TheraBionic P1 utilise un protocole modulé en amplitude à 27,12 MHz. Les expériences CHC identifient une entrée calcique dépendante de Cav3.2, mais n’établissent pas le même noyau, la même dose ou le même résultat dans les tissus reproducteurs ou l’exposition environnementale chronique.",
    fdaLabelTitle: "Étiquetage FDA du dispositif",
    fdaLabelText:
      "La mise en garde concernant les inhibiteurs calciques est une contrainte de protocole compatible avec la voie proposée, et non une expérience randomisée avec bloqueur.",
    cta: "Lire l'analyse complète des preuves TheraBionic",
  },
  ko: {
    kicker: "프로토콜별 임상 앵커",
    title: "제한된 반송파 × 포락선 × 채널 사례",
    fdaApproval: "FDA HDE 승인(2023, H220001)",
    channelLabel: "시험된 HCC 프로토콜의 Cav3.2 반응",
    sarLabel: "휴대전화 SAR 이하 — 정의상 비열적",
    survivalLabel: "6개월 이상 안정 질환",
    explanation:
      "TheraBionic P1은 특정 27.12 MHz 진폭 변조 프로토콜을 사용합니다. HCC 실험은 Cav3.2 의존성 칼슘 유입을 확인하지만 생식 조직이나 만성 환경 노출에서 동일한 커널, 용량 또는 종점을 확립하지 않습니다.",
    fdaLabelTitle: "FDA 기기 표시",
    fdaLabelText:
      "칼슘 채널 차단제 관련 라벨 주의사항은 제안된 경로와 일치하는 프로토콜 제약이지 무작위 차단제 실험은 아닙니다.",
    cta: "TheraBionic 증거 분석 전문 읽기",
  },
} as const;

export function TheraBionicProof({ locale, prefix }: { locale: string; prefix: string }) {
  const d = pickCopy(COPY, locale);

  return (
    <section className="pb-20">
      <div className="rounded-xl border border-card-border bg-card-bg p-6 sm:p-8">
        <p className="editorial-kicker text-accent mb-2">{d.kicker}</p>
        <h2 className="text-xl font-semibold mb-6">{d.title}</h2>

        <div className="flex items-start gap-3 mb-6">
          <CheckCircle size={22} className="text-green-500 shrink-0 mt-0.5" strokeWidth={2} aria-hidden="true" />
          <div>
            <p className="font-semibold">TheraBionic P1</p>
            <p className="text-sm text-foreground-muted">
              <StudyCitation referenceId="fda-hde-h220001" locale={locale} label={d.fdaApproval} />
            </p>
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
            <p className="font-mono-num text-xl font-semibold text-accent">14/41</p>
            <p className="text-xs text-foreground-muted mt-1">{d.survivalLabel}</p>
          </div>
        </div>

        <p className="text-sm sm:text-[0.9375rem] leading-relaxed text-foreground-muted mb-5">
          {d.explanation}{" "}
          <StudyCitation referenceId="therabionic-ebioMedicine-2019" locale={locale} label="Jimenez et al. (2019)" />
        </p>

        <div className="rounded-lg border border-status-partial/30 bg-status-partial/5 p-4 mb-5">
          <p className="text-sm text-foreground-muted">
            <span className="font-semibold text-foreground">{d.fdaLabelTitle}: </span>
            {d.fdaLabelText}{" "}
            <StudyCitation referenceId="fda-hde-h220001" locale={locale} label="FDA H220001" />
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
