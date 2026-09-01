"use client";

import Link from "next/link";
import { ArrowRight, CheckCircle } from "lucide-react";
import { StudyCitation } from "@/components/StudyCitation";
import { pickCopy } from "@/lib/i18n";

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
      "TheraBionic P1 -laite hoitaa pitkälle edennyttä maksasyöpää käyttäen amplitudimoduloituja radiotaajuisia sähkömagneettisia kenttiä altistustasoilla jotka ovat 100–1 000 kertaa matkapuhelimen alapuolella. Julkaistu mekanismi: EMF aktivoi Cav3.2 T-tyypin jänniteriippuvaiset kalsiumkanavat aiheuttaen kalsium-sisäänvirtauksen joka käynnistää syöpäsolujen erilaistumisen. Tämä on täsmälleen se mekanismi jonka BERM kuvaa lisääntymis- ja terveysvaikutuksille — ei-terminen EMF joka toimii jänniteriippuvaisten kalsiumkanavien kautta. Kysymys ei ole siitä onko mekanismi olemassa. Se on FDA:n validoima. Kysymys on siitä mitä se tarkoittaa krooniselle, kontrolloimattomalle ympäristöaltistukselle.",
    fdaLabelTitle: "FDA:n laitemerkintä",
    fdaLabelText:
      "Laitetta ei saa käyttää henkilöillä jotka saavat kalsiumkanavansalpaajia tai L- tai T-tyypin jänniteriippuvaisia kalsiumkanavia salpaavia aineita ellei hoitoa muokata. Tämä vasta-aihe vahvistaa, että kalsiumkanavamekanismi on olennainen laitteen toiminnalle.",
    cta: "Lue koko TheraBionic-näyttöanalyysi",
  },
  ja: {
    kicker: "臨床的検証",
    title: "メカニズムはすでに臨床的に証明されている",
    fdaApproval: "FDA承認済み（2019年、HDE H220001）進行肝細胞癌に対して",
    channelLabel: "T型カルシウムチャネル — BERMの予測と同一",
    sarLabel: "携帯電話のSAR以下 — 定義上非熱的",
    survivalLabel: "進行肝癌における生存利益",
    explanation:
      "TheraBionic P1デバイスは、携帯電話の100〜1,000倍低い曝露レベルで振幅変調高周波電磁場を使用して進行肝癌を治療します。公表されたメカニズム：EMFがCav3.2 T型電位依存性カルシウムチャネルを活性化し、カルシウム流入が癌細胞の分化を誘発します。これはBERMが生殖および健康への影響について記述するメカニズムと正確に同じです — 電位依存性カルシウムチャネルを介して作用する非熱的EMF。問題はこのメカニズムが存在するかどうかではありません。それはFDAにより検証済みです。問題は、慢性的で制御されていない環境曝露にとって何を意味するかです。",
    fdaLabelTitle: "FDAデバイス表示",
    fdaLabelText:
      "カルシウムチャネル遮断薬またはL型もしくはT型電位依存性カルシウムチャネルを遮断する薬剤を投与中の患者には、治療が変更されない限り使用してはなりません。この禁忌事項は、カルシウムチャネルメカニズムがデバイスの機能に不可欠であることを確認しています。",
    cta: "TheraBionicエビデンス分析の全文を読む",
  },
  fr: {
    kicker: "VALIDATION CLINIQUE",
    title: "Le mécanisme est déjà cliniquement prouvé",
    fdaApproval: "Approuvé par la FDA (2019, HDE H220001) pour le carcinome hépatocellulaire avancé",
    channelLabel: "Canal calcique de type T — identique à la prédiction BERM",
    sarLabel: "en dessous du DAS du téléphone mobile — non thermique par définition",
    survivalLabel: "bénéfice de survie dans le cancer du foie avancé",
    explanation:
      "Le dispositif TheraBionic P1 traite le cancer du foie avancé en utilisant des champs électromagnétiques radiofréquences modulés en amplitude à des niveaux d'exposition 100 à 1 000 fois inférieurs à ceux d'un téléphone mobile. Le mécanisme publié : l'EMF active les canaux calciques voltage-dépendants de type T Cav3.2, provoquant un influx de calcium qui déclenche la différenciation des cellules cancéreuses. C'est exactement le mécanisme que BERM décrit pour les effets reproductifs et sanitaires — un EMF non thermique agissant par les canaux calciques voltage-dépendants. La question n'est pas de savoir si ce mécanisme existe. Il est validé par la FDA. La question est ce qu'il signifie pour une exposition environnementale chronique et non contrôlée.",
    fdaLabelTitle: "Étiquetage FDA du dispositif",
    fdaLabelText:
      "Le dispositif ne doit pas être utilisé chez les personnes recevant des inhibiteurs calciques ou des agents bloquant les canaux calciques voltage-dépendants de type L ou T, sauf si le traitement est modifié. Cette contre-indication confirme que le mécanisme des canaux calciques est essentiel au fonctionnement du dispositif.",
    cta: "Lire l'analyse complète des preuves TheraBionic",
  },
  ko: {
    kicker: "임상적 검증",
    title: "메커니즘은 이미 임상적으로 입증되었다",
    fdaApproval: "FDA 승인(2019, HDE H220001) 진행성 간세포암에 대해",
    channelLabel: "T형 칼슘 채널 — BERM 예측과 동일",
    sarLabel: "휴대전화 SAR 이하 — 정의상 비열적",
    survivalLabel: "진행성 간암에서의 생존 이점",
    explanation:
      "TheraBionic P1 장치는 휴대전화보다 100~1,000배 낮은 노출 수준에서 진폭 변조 고주파 전자기장을 사용하여 진행성 간암을 치료합니다. 공개된 메커니즘: EMF가 Cav3.2 T형 전압 의존성 칼슘 채널을 활성화하여 칼슘 유입이 암세포 분화를 촉발합니다. 이것은 BERM이 생식 및 건강 영향에 대해 설명하는 메커니즘과 정확히 동일합니다 — 전압 의존성 칼슘 채널을 통해 작용하는 비열적 EMF. 문제는 이 메커니즘이 존재하는지 여부가 아닙니다. FDA가 검증했습니다. 문제는 만성적이고 통제되지 않는 환경 노출에 대해 이것이 무엇을 의미하는가입니다.",
    fdaLabelTitle: "FDA 기기 표시",
    fdaLabelText:
      "칼슘 채널 차단제 또는 L형이나 T형 전압 의존성 칼슘 채널을 차단하는 약제를 투여 중인 환자에게는 치료가 수정되지 않는 한 사용해서는 안 됩니다. 이 금기사항은 칼슘 채널 메커니즘이 장치 기능에 필수적임을 확인합니다.",
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
            <p className="font-mono-num text-xl font-semibold text-accent">+34%</p>
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
