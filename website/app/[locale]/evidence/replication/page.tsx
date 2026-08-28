import type { Metadata } from "next";
import Link from "next/link";
import { FlaskConical } from "lucide-react";
import { InlineReferenceText } from "@/components/InlineReferenceText";
import { PageHeader } from "@/components/PageHeader";

/* ── Five confounds card data ── */
type Confound = {
  title: string;
  blackman: string;
  chi: string;
  labImpact: string;
  ref: string;
  level: "E" | "M";
  bermNote?: string;
};

const CONFOUNDS: Record<string, Confound[]> = {
  en: [
    {
      title: "Temperature Window (±1°C)",
      blackman:
        "Blackman 1991: Ca²⁺ efflux occurred at 36°C and 37°C but NOT at 35°C, 38°C, or 39°C. Direction depended on temperature trajectory.",
      chi: "χ_bio(T) — biological machinery operates within narrow thermal window. Outside 36–37°C, transduction chain cannot complete.",
      labImpact:
        "Labs at different temperatures get different results. Not a failure of the effect.",
      ref: "[[ref:blackman1991|Blackman et al. 1991, Bioelectromagnetics 12:173–182]]",
      level: "E",
    },
    {
      title: "Geomagnetic Field Orientation",
      blackman:
        "Blackman 1990: DC–AC angle is critical for calcium release. Consistent with magnetic resonance-like mechanism.",
      chi: "χ(Ā_DC, θ) — radical pair mechanism is anisotropic.",
      labImpact:
        "Helsinki (inclination ~73°) vs Rome (~57°) get different results at same AC.",
      ref: "[[ref:blackman1990|Blackman et al. 1990, Bioelectromagnetics 11:159–167]]",
      level: "E",
    },
    {
      title: "Geomagnetic Field Intensity",
      blackman:
        "Blackman: Normal (49.4 µT) vs reduced (19.0 µT) produced different calcium efflux.",
      chi: "χ(|Ā_DC|) — Lindgren's selection rule directly. Higher background → higher χ.",
      labImpact:
        "Near magnetic equator (~25 µT) weaker effects than Scandinavia (~50 µT).",
      ref: "Blackman et al., experiments at normal and reduced LGF",
      level: "E",
    },
    {
      title: "Laboratory Lighting (CRY Photocycle)",
      blackman:
        "Not directly from Blackman. CRY's radical pair requires blue light (Nießner 2014). Lab lighting determines CRY state.",
      chi: "χ_CRY(I_blue, λ) — different lab lighting puts CRY in different states.",
      labImpact:
        "Blue-rich (modern LED) vs warm (incandescent) → systematically different CRY states.",
      ref: "[[ref:niessner2014|Nießner et al. 2014, J Exp Biol]]; [[ref:yap2025|Yap et al. 2025, Cells]]",
      level: "M",
      bermNote:
        "This is BERM's synthesis (M-level), not Blackman's direct finding.",
    },
    {
      title: "Developmental Frequency Imprinting",
      blackman:
        "Blackman 1985/1988: Chicken eggs in 60 Hz → hatchlings responded to 50 Hz but NOT 60 Hz.",
      chi: "χ_dev(f_history) — frequency response shaped by developmental exposure.",
      labImpact:
        "European (50 Hz) vs US (60 Hz) cell lines have different frequency sensitivity.",
      ref: "[[ref:blackman1985|Blackman et al. 1985, Bioelectromagnetics 6:1–11]]",
      level: "E",
    },
  ],
  fi: [
    {
      title: "Lämpötilaikkuna (±1°C)",
      blackman:
        "Blackman 1991: Ca²⁺-effluksi tapahtui 36°C:ssa ja 37°C:ssa mutta EI 35°C:ssa, 38°C:ssa tai 39°C:ssa. Suunta riippui lämpötilaliikeradasta.",
      chi: "χ_bio(T) — biologinen koneisto toimii kapeassa lämpötilaikkunassa. 36–37°C:n ulkopuolella transduktioketju ei voi valmistua.",
      labImpact:
        "Eri lämpötiloissa toimivat laboratoriot saavat eri tuloksia. Ei ole efektin epäonnistuminen.",
      ref: "[[ref:blackman1991|Blackman ym. 1991, Bioelectromagnetics 12:173–182]]",
      level: "E",
    },
    {
      title: "Geomagneettisen kentän suunta",
      blackman:
        "Blackman 1990: DC–AC-kulma on kriittinen kalsiumin vapautumiselle. Yhdenmukainen magneettiseen resonanssiin perustuvan mekanismin kanssa.",
      chi: "χ(Ā_DC, θ) — radikaaliparin mekanismi on anisotrooppinen.",
      labImpact:
        "Helsinki (inklinaatio ~73°) vs Rooma (~57°) saavat eri tuloksia samalla AC:lla.",
      ref: "[[ref:blackman1990|Blackman ym. 1990, Bioelectromagnetics 11:159–167]]",
      level: "E",
    },
    {
      title: "Geomagneettisen kentän voimakkuus",
      blackman:
        "Blackman: Normaali (49,4 µT) vs vähennetty (19,0 µT) tuotti erilaisen kalsiumeffluksin.",
      chi: "χ(|Ā_DC|) — Lindgrenin valintaehto suoraan. Korkeampi tausta → korkeampi χ.",
      labImpact:
        "Lähellä magneettista päiväntasaajaa (~25 µT) heikommat vaikutukset kuin Skandinaviassa (~50 µT).",
      ref: "Blackman ym., kokeet normaalissa ja vähennetyssä LGF:ssä",
      level: "E",
    },
    {
      title: "Laboratoriovalaistus (CRY:n fotosykli)",
      blackman:
        "Ei suoraan Blackmanilta. CRY:n radikaalipari vaatii sinisen valon (Nießner 2014). Laboratoriovalaistus määrittää CRY:n tilan.",
      chi: "χ_CRY(I_blue, λ) — erilainen laboratoriovalaistus asettaa CRY:n eri tiloihin.",
      labImpact:
        "Sinirikas (moderni LED) vs lämmin (hehkulamppu) → systemaattisesti eri CRY-tilat.",
      ref: "[[ref:niessner2014|Nießner ym. 2014, J Exp Biol]]; [[ref:yap2025|Yap ym. 2025, Cells]]",
      level: "M",
      bermNote:
        "Tämä on BERM:n synteesi (M-taso), ei Blackmanin suora löydös.",
    },
    {
      title: "Kehityksellinen taajuusleimautuminen",
      blackman:
        "Blackman 1985/1988: 60 Hz:ssä haudotut kananmunat → poikaset reagoivat 50 Hz:iin mutta EIVÄT 60 Hz:iin.",
      chi: "χ_dev(f_history) — taajuusvaste muovautuu kehityksellisen altistuksen mukaan.",
      labImpact:
        "Eurooppalaiset (50 Hz) vs yhdysvaltalaiset (60 Hz) solulinjat reagoivat eri taajuuksiin.",
      ref: "[[ref:blackman1985|Blackman ym. 1985, Bioelectromagnetics 6:1–11]]",
      level: "E",
    },
  ],
  ja: [
    {
      title: "温度窓 (±1°C)",
      blackman:
        "Blackman 1991: Ca²⁺流出は36°Cおよび37°Cで発生したが、35°C、38°C、39°Cでは発生しなかった。方向は温度の軌跡に依存した。",
      chi: "χ_bio(T) — 生物学的機構は狭い温度窓内で作動する。36-37°Cの範囲外ではトランスダクション連鎖が完了しない。",
      labImpact:
        "異なる温度の研究室では異なる結果が得られる。効果の失敗ではない。",
      ref: "[[ref:blackman1991|Blackman et al. 1991, Bioelectromagnetics 12:173–182]]",
      level: "E",
    },
    {
      title: "地磁気の方向",
      blackman:
        "Blackman 1990: DC-AC角度はカルシウム放出に重要。磁気共鳴様メカニズムと一致。",
      chi: "χ(Ā_DC, θ) — ラジカルペアメカニズムは異方性である。",
      labImpact:
        "ヘルシンキ（傾斜角~73°）対ローマ（~57°）では同じACで異なる結果が得られる。",
      ref: "[[ref:blackman1990|Blackman et al. 1990, Bioelectromagnetics 11:159–167]]",
      level: "E",
    },
    {
      title: "地磁気の強度",
      blackman:
        "Blackman: 通常（49.4 µT）対減衰（19.0 µT）で異なるカルシウム流出を生じた。",
      chi: "χ(|Ā_DC|) — Lindgrenの選択則そのもの。高い背景 → 高いχ。",
      labImpact:
        "磁気赤道付近（~25 µT）ではスカンジナビア（~50 µT）より弱い効果。",
      ref: "Blackman et al., experiments at normal and reduced LGF",
      level: "E",
    },
    {
      title: "実験室の照明（CRYフォトサイクル）",
      blackman:
        "Blackmanから直接ではない。CRYのラジカルペアは青色光を必要とする（Nießner 2014）。実験室の照明がCRYの状態を決定する。",
      chi: "χ_CRY(I_blue, λ) — 異なる実験室照明がCRYを異なる状態に設定する。",
      labImpact:
        "青色リッチ（現代LED）対暖色（白熱灯）→ 系統的に異なるCRY状態。",
      ref: "[[ref:niessner2014|Nießner et al. 2014, J Exp Biol]]; [[ref:yap2025|Yap et al. 2025, Cells]]",
      level: "M",
      bermNote:
        "これはBERMの統合（M水準）であり、Blackmanの直接的な発見ではない。",
    },
    {
      title: "発達的周波数刷り込み",
      blackman:
        "Blackman 1985/1988: 60 Hzで孵化した鶏卵 → 孵化した雛は50 Hzに反応したが60 Hzには反応しなかった。",
      chi: "χ_dev(f_history) — 周波数応答は発達期の曝露によって形成される。",
      labImpact:
        "ヨーロッパ（50 Hz）対米国（60 Hz）の細胞株は異なる周波数感受性を持つ。",
      ref: "[[ref:blackman1985|Blackman et al. 1985, Bioelectromagnetics 6:1–11]]",
      level: "E",
    },
  ],
  fr: [
    {
      title: "Fenêtre de température (±1°C)",
      blackman:
        "Blackman 1991 : L'efflux de Ca²⁺ s'est produit à 36°C et 37°C mais PAS à 35°C, 38°C ou 39°C. La direction dépendait de la trajectoire thermique.",
      chi: "χ_bio(T) — la machinerie biologique opère dans une fenêtre thermique étroite. En dehors de 36-37°C, la chaîne de transduction ne peut pas se compléter.",
      labImpact:
        "Les laboratoires à différentes températures obtiennent des résultats différents. Ce n'est pas un échec de l'effet.",
      ref: "[[ref:blackman1991|Blackman et al. 1991, Bioelectromagnetics 12:173–182]]",
      level: "E",
    },
    {
      title: "Orientation du champ géomagnétique",
      blackman:
        "Blackman 1990 : L'angle DC-AC est critique pour la libération de calcium. Compatible avec un mécanisme de type résonance magnétique.",
      chi: "χ(Ā_DC, θ) — le mécanisme de paire radicalaire est anisotrope.",
      labImpact:
        "Helsinki (inclinaison ~73°) vs Rome (~57°) obtiennent des résultats différents au même AC.",
      ref: "[[ref:blackman1990|Blackman et al. 1990, Bioelectromagnetics 11:159–167]]",
      level: "E",
    },
    {
      title: "Intensité du champ géomagnétique",
      blackman:
        "Blackman : Normal (49,4 µT) vs réduit (19,0 µT) ont produit un efflux de calcium différent.",
      chi: "χ(|Ā_DC|) — la règle de sélection de Lindgren directement. Fond plus élevé → χ plus élevé.",
      labImpact:
        "Près de l'équateur magnétique (~25 µT), effets plus faibles qu'en Scandinavie (~50 µT).",
      ref: "Blackman et al., experiments at normal and reduced LGF",
      level: "E",
    },
    {
      title: "Éclairage du laboratoire (photocycle CRY)",
      blackman:
        "Pas directement de Blackman. La paire radicalaire de CRY nécessite la lumière bleue (Nießner 2014). L'éclairage du laboratoire détermine l'état de CRY.",
      chi: "χ_CRY(I_blue, λ) — un éclairage de laboratoire différent met CRY dans des états différents.",
      labImpact:
        "Riche en bleu (LED moderne) vs chaud (incandescent) → états CRY systématiquement différents.",
      ref: "[[ref:niessner2014|Nießner et al. 2014, J Exp Biol]]; [[ref:yap2025|Yap et al. 2025, Cells]]",
      level: "M",
      bermNote:
        "Ceci est la synthèse BERM (niveau M), pas une découverte directe de Blackman.",
    },
    {
      title: "Empreinte fréquentielle développementale",
      blackman:
        "Blackman 1985/1988 : Œufs de poule à 60 Hz → les poussins ont répondu à 50 Hz mais PAS à 60 Hz.",
      chi: "χ_dev(f_history) — la réponse en fréquence est façonnée par l'exposition développementale.",
      labImpact:
        "Lignées cellulaires européennes (50 Hz) vs américaines (60 Hz) ont une sensibilité fréquentielle différente.",
      ref: "[[ref:blackman1985|Blackman et al. 1985, Bioelectromagnetics 6:1–11]]",
      level: "E",
    },
  ],
  ko: [
    {
      title: "온도 창 (±1°C)",
      blackman:
        "Blackman 1991: Ca²⁺ 유출은 36°C와 37°C에서 발생했지만 35°C, 38°C, 39°C에서는 발생하지 않았다. 방향은 온도 궤적에 의존했다.",
      chi: "χ_bio(T) — 생물학적 기구는 좁은 온도 창 내에서 작동한다. 36-37°C 범위 밖에서는 신호변환 연쇄가 완료될 수 없다.",
      labImpact:
        "다른 온도의 실험실은 다른 결과를 얻는다. 효과의 실패가 아니다.",
      ref: "[[ref:blackman1991|Blackman et al. 1991, Bioelectromagnetics 12:173–182]]",
      level: "E",
    },
    {
      title: "지자기장 방향",
      blackman:
        "Blackman 1990: DC-AC 각도가 칼슘 방출에 결정적이다. 자기 공명 유사 메커니즘과 일치한다.",
      chi: "χ(Ā_DC, θ) — 라디칼 쌍 메커니즘은 이방성이다.",
      labImpact:
        "헬싱키(경사각 ~73°) 대 로마(~57°)는 동일한 AC에서 다른 결과를 얻는다.",
      ref: "[[ref:blackman1990|Blackman et al. 1990, Bioelectromagnetics 11:159–167]]",
      level: "E",
    },
    {
      title: "지자기장 강도",
      blackman:
        "Blackman: 정상(49.4 µT) 대 감소(19.0 µT)에서 다른 칼슘 유출을 생성했다.",
      chi: "χ(|Ā_DC|) — Lindgren의 선택 규칙 그 자체. 높은 배경 → 높은 χ.",
      labImpact:
        "자기 적도 부근(~25 µT)에서 스칸디나비아(~50 µT)보다 약한 효과.",
      ref: "Blackman et al., experiments at normal and reduced LGF",
      level: "E",
    },
    {
      title: "실험실 조명 (CRY 광주기)",
      blackman:
        "Blackman에서 직접 나온 것이 아님. CRY의 라디칼 쌍은 청색광이 필요하다 (Nießner 2014). 실험실 조명이 CRY 상태를 결정한다.",
      chi: "χ_CRY(I_blue, λ) — 다른 실험실 조명이 CRY를 다른 상태로 설정한다.",
      labImpact:
        "청색 풍부(현대 LED) 대 따뜻한(백열등) → 체계적으로 다른 CRY 상태.",
      ref: "[[ref:niessner2014|Nießner et al. 2014, J Exp Biol]]; [[ref:yap2025|Yap et al. 2025, Cells]]",
      level: "M",
      bermNote:
        "이것은 BERM의 통합(M 수준)이며, Blackman의 직접적 발견이 아니다.",
    },
    {
      title: "발달적 주파수 각인",
      blackman:
        "Blackman 1985/1988: 60 Hz에서 부화한 달걀 → 병아리는 50 Hz에 반응했지만 60 Hz에는 반응하지 않았다.",
      chi: "χ_dev(f_history) — 주파수 반응은 발달기 노출에 의해 형성된다.",
      labImpact:
        "유럽(50 Hz) 대 미국(60 Hz) 세포주는 다른 주파수 감수성을 가진다.",
      ref: "[[ref:blackman1985|Blackman et al. 1985, Bioelectromagnetics 6:1–11]]",
      level: "E",
    },
  ],
};

/* ── Five-parameter standard items ── */
const STANDARD_ITEMS = {
  en: [
    "TISSUE TEMPERATURE — continuous monitoring, ±0.3°C precision",
    "LIGHTING SPECTRUM — 400–500 nm blue content, lux",
    "LOCAL GEOMAGNETIC FIELD — DC magnitude, declination, inclination",
    "AMBIENT EMF ENVIRONMENT — 50/60 Hz, WiFi, Faraday shielding",
    "DEVELOPMENTAL HISTORY — origin, culture history, power frequency",
  ],
  fi: [
    "KUDOSLÄMPÖTILA — jatkuva seuranta, ±0,3°C tarkkuus",
    "VALAISTUSSPEKTRI — 400–500 nm sininen sisältö, luxit",
    "PAIKALLINEN GEOMAGNEETTINEN KENTTÄ — DC-magnitudini, deklinaatio, inklinaatio",
    "YMPÄRISTÖN EMF — 50/60 Hz, WiFi, Faraday-suojaus",
    "KEHITYSHISTORIA — alkuperä, viljelyhistoria, verkkotaajuus",
  ],
  ja: [
    "組織温度 — 連続モニタリング、±0.3°C精度",
    "照明スペクトル — 400-500 nm青色成分、ルクス",
    "局所地磁気 — DC強度、偏角、傾斜角",
    "環境EMF — 50/60 Hz、WiFi、ファラデーシールド",
    "発達履歴 — 起源、培養履歴、電源周波数",
  ],
  fr: [
    "TEMPÉRATURE TISSULAIRE — surveillance continue, précision ±0,3°C",
    "SPECTRE D'ÉCLAIRAGE — contenu bleu 400-500 nm, lux",
    "CHAMP GÉOMAGNÉTIQUE LOCAL — magnitude DC, déclinaison, inclinaison",
    "ENVIRONNEMENT EMF AMBIANT — 50/60 Hz, WiFi, blindage Faraday",
    "HISTOIRE DÉVELOPPEMENTALE — origine, historique de culture, fréquence secteur",
  ],
  ko: [
    "조직 온도 — 연속 모니터링, ±0.3°C 정밀도",
    "조명 스펙트럼 — 400-500 nm 청색 함량, 럭스",
    "국소 지자기장 — DC 크기, 편각, 경사각",
    "주변 EMF 환경 — 50/60 Hz, WiFi, 패러데이 차폐",
    "발달 이력 — 기원, 배양 이력, 전원 주파수",
  ],
};

/* ── Bilingual copy ── */
const COPY = {
  en: {
    title: "Resolution of the Replication Crisis",
    subtitle:
      "Why EMF biology seems inconsistent, Blackman's five confounds, and the five-parameter standard",
    backLink: "← Back to Evidence",
    seeAlso: "See also",
    evidencePortal: "Evidence register",
    modelPage: "BERM model",
    /* Section 1 */
    s1Title:
      "Why EMF Biology Seems Inconsistent — And Why It Isn’t",
    s1p1: "For fifty years, the central objection to non-thermal electromagnetic bioeffects has been inconsistency: ‘If the effect is real, why can’t laboratories reproduce it reliably?’",
    s1p2: "The answer was published between 1985 and 1991 by Carl Blackman at the US Environmental Protection Agency — but it was never synthesized into a unified framework. Blackman’s own experiments identified five variables that, when uncontrolled, produce apparently contradictory results from the SAME underlying phenomenon. When all five are controlled, the results are consistent.",
    s1p3: "BERM’s contribution is to recognize that these five variables are all instances of the same mathematical structure: Lindgren’s selection rule χ(Ā), applied at different scales. Each variable modulates the ‘background’ against which the biological system responds to EMF perturbation. Change the background, change the response — not because the effect is unreliable, but because it is multidimensionally sensitive.",
    /* Section 2 */
    s2Title: "The Five Confounds",
    s2BlackmanLabel: "Blackman finding",
    s2ChiLabel: "χ interpretation",
    s2LabLabel: "Lab impact",
    s2RefLabel: "Reference",
    /* Section 3 */
    s3Title: "Proposed: The Five-Parameter EMF Biology Standard",
    s3Note:
      "This standard does not claim any biological effect. It simply requires that the five variables Blackman demonstrated to be critical are documented.",
    /* Section 4 */
    s4Title: "How This Resolves the Apparent Contradiction",
    s4p1: "Lab A and Lab B are at different points in five-dimensional parameter space. When uncontrolled parameters differ, different results are EXPECTED, not anomalous. Blackman demonstrated this directly: the same researcher, with the same equipment, obtained enhancement, reduction, or null depending on temperature alone.",
    s4p2: "The replication crisis in EMF biology is not a crisis of the phenomenon — it is a crisis of experimental control. Once the five confounds are recognized and documented, apparent contradictions resolve into a consistent, multidimensional dose-response surface.",
    s4p3: "Lindgren’s χ(Ā) provides that framework: every confound is a background field (thermal, optical, magnetic, developmental) that modulates sensitivity via the same mathematical function.",
    /* Section 5 */
    s5Title: "Seven Moderators That Predict Study Outcomes",
    s5Lead: "Analysis of 600+ published EMF bioeffect studies across five endpoints (melatonin, sperm, sleep EEG, DNA damage, oxidative stress) reveals that ‘contradictory evidence’ is an artifact of seven uncontrolled moderators. Three are statistically significant, two are directly proven by RCTs, and two are quantified by specific studies.",
    s5StatsCaption: "Statistical results — chi-square tests of moderator × outcome association",
    s5ModeratorCol: "Moderator",
    s5PosYesCol: "Pos%/Yes",
    s5PosNoCol: "Pos%/No",
    s5MatrixCaption: "Five-endpoint moderator confirmation matrix",
    s5MatrixLegend: "✓✓ = confirmed by multiple studies or meta-analysis, ✓ = suggested by limited data, — = no data available",
    s5KeyFinding1Title: "58% of DNA damage below ICNIRP",
    s5KeyFinding1Body: "[[ref:weller2025_dna|Weller 2025]], 517 studies: the majority of DNA-damage-positive studies used exposures below ICNIRP limits.",
    s5KeyFinding2Title: "9-hour recovery window",
    s5KeyFinding2Body: "[[ref:ivancsits_dna_recovery|Ivancsits]]: DNA repair quantified — 9 hours of EMF-free recovery allows measurable DNA repair.",
    s5KeyFinding3Title: "Funding > quality",
    s5KeyFinding3Body: "[[ref:weller2025_dna|Weller 2025]]: funding source predicts study results more strongly than study quality score.",
    rowSpecies: "Species/priming (animal=1)",
    rowDuration: "Duration (chronic=1)",
    rowPulsation: "Pulsation (=1)",
    rowAnimal: "Animal > Human",
    rowChronic: "Chronic > Acute",
    rowPulsed: "Pulsed > CW",
    rowGenotype: "Genotype",
    rowSeason: "Season",
    rowDevice: "Real device",
    rowRecovery: "Recovery",
    rowBelowICNIRP: "Below ICNIRP",
  },
  fi: {
    title: "Replikaatiokriisin ratkaisu",
    subtitle:
      "Miksi EMF-biologia vaikuttaa ristiriitaiselta, Blackmanin viisi sekoittavaa tekijää ja viiden parametrin standardi",
    backLink: "← Takaisin evidenssiin",
    seeAlso: "Katso myös",
    evidencePortal: "Evidenssirekisteri",
    modelPage: "BERM-malli",
    /* Section 1 */
    s1Title:
      "Miksi EMF-biologia vaikuttaa ristiriitaiselta — ja miksi se ei ole",
    s1p1: "Viisikymmentä vuotta keskeisin vastaargumentti ei-termisille sähkömagneettisille biovaikutuksille on ollut epäjohdonmukaisuus: ’Jos vaikutus on todellinen, miksi laboratoriot eivät pysty toistamaan sitä luotettavasti?’",
    s1p2: "Vastaus julkaistiin vuosina 1985–1991 Carl Blackmanin toimesta Yhdysvaltain ympäristönsuojeluvirastossa (EPA) — mutta sitä ei koskaan syntetisoitu yhtenäiseksi kehykseksi. Blackmanin omat kokeet tunnistivat viisi muuttujaa, jotka kontrolloimattomina tuottavat näennäisesti ristiriitaisia tuloksia SAMASTA taustailmiöstä. Kun kaikki viisi kontrolloidaan, tulokset ovat johdonmukaisia.",
    s1p3: "BERM:n panos on tunnistaa, että nämä viisi muuttujaa ovat kaikki saman matemaattisen rakenteen ilmentymyä: Lindgrenin valintaehto χ(Ā), sovellettuna eri skaaloissa. Kukin muuttuja moduloi ’taustaa’, jota vasten biologinen järjestelmä reagoi EMF-häiriöön. Muuta taustaa, muuta vastetta — ei siksi että vaikutus olisi epäluotettava, vaan koska se on moniulotteisesti herkkä.",
    /* Section 2 */
    s2Title: "Viisi sekoittavaa tekijää",
    s2BlackmanLabel: "Blackmanin löydös",
    s2ChiLabel: "χ-tulkinta",
    s2LabLabel: "Laboratoriovaikutus",
    s2RefLabel: "Viite",
    /* Section 3 */
    s3Title: "Ehdotus: Viiden parametrin EMF-biologian standardi",
    s3Note:
      "Tämä standardi ei väitä mitään biologista vaikutusta. Se ainoastaan edellyttää, että viisi muuttujaa, joiden kriittisyyden Blackman osoitti, dokumentoidaan.",
    /* Section 4 */
    s4Title: "Miten tämä ratkaisee näennäisen ristiriidan",
    s4p1: "Laboratorio A ja laboratorio B ovat eri pisteissä viisiulotteisessa parametriavaruudessa. Kun kontrolloimattomat parametrit eroavat, erilaiset tulokset ovat ODOTETTUJA, eivät poikkeavia. Blackman osoitti tämän suoraan: sama tutkija, samat laitteet, sai vahvistuksen, vähenemisen tai nollatuloksen pelkästään lämpötilasta riippuen.",
    s4p2: "EMF-biologian replikaatiokriisi ei ole ilmiön kriisi — se on kokeellisen kontrollin kriisi. Kun viisi sekoittavaa tekijää tunnistetaan ja dokumentoidaan, näennäiset ristiriidat ratkeavat johdonmukaiseksi, moniulotteiseksi annos-vastepinnaksi.",
    s4p3: "Lindgrenin χ(Ā) tarjoaa tuon kehyksen: jokainen sekoittava tekijä on taustakenttä (terminen, optinen, magneettinen, kehityksellinen), joka moduloi herkkyyttä saman matemaattisen funktion kautta.",
    /* Section 5 */
    s5Title: "Seitsemän moderaattoria jotka ennustavat tutkimustuloksia",
    s5Lead: "Analyysi yli 600 julkaistusta EMF-bioefektitutkimuksesta viidellä endpointilla (melatoniini, siittiöt, uni-EEG, DNA-vaurio, oksidatiivinen stressi) paljastaa, että 'ristiriitainen evidenssi' on seitsemän kontrolloimattoman moderaattorin artefakti. Kolme on tilastollisesti merkitseviä, kaksi on suoraan todistettu RCT-tasolla ja kaksi on kvantifioitu spesifisillä tutkimuksilla.",
    s5StatsCaption: "Tilastolliset tulokset — khiin neliö -testit moderaattori x tulosyhteys",
    s5ModeratorCol: "Moderaattori",
    s5PosYesCol: "Pos%/Kyllä",
    s5PosNoCol: "Pos%/Ei",
    s5MatrixCaption: "Viiden endpointin moderaattorivahvistusmatriisi",
    s5MatrixLegend: "✓✓ = vahvistettu useilla tutkimuksilla tai meta-analyysillä, ✓ = viitteitä rajallisesta datasta, — = ei dataa saatavilla",
    s5KeyFinding1Title: "58 % DNA-vauriosta ICNIRP:n alla",
    s5KeyFinding1Body: "[[ref:weller2025_dna|Weller 2025]], 517 tutkimusta: enemmistö DNA-vauriopositiivisista tutkimuksista käytti ICNIRP-rajojen alittavia altistuksia.",
    s5KeyFinding2Title: "9 tunnin palautumisikkuna",
    s5KeyFinding2Body: "[[ref:ivancsits_dna_recovery|Ivancsits]]: DNA-korjaus kvantifioitu — 9 tuntia EMF-vapaata palautumista mahdollistaa mitattavan DNA-korjauksen.",
    s5KeyFinding3Title: "Rahoitus > laatu",
    s5KeyFinding3Body: "[[ref:weller2025_dna|Weller 2025]]: rahoituslähde ennustaa tutkimustuloksia vahvemmin kuin tutkimuksen laatupisteet.",
    rowSpecies: "Laji/primaus (eläin=1)",
    rowDuration: "Kesto (krooninen=1)",
    rowPulsation: "Pulsaatio (=1)",
    rowAnimal: "Eläin > Ihminen",
    rowChronic: "Krooninen > Akuutti",
    rowPulsed: "Pulsaatio > CW",
    rowGenotype: "Genotyyppi",
    rowSeason: "Vuodenaika",
    rowDevice: "Todellinen laite",
    rowRecovery: "Palautuminen",
    rowBelowICNIRP: "ICNIRP:n alla",
  },
  ja: {
    title: "再現性危機の解決",
    subtitle:
      "EMF生物学がなぜ一貫しないように見えるか、Blackmanの5つの交絡因子、そして5パラメータ基準",
    backLink: "← エビデンスに戻る",
    seeAlso: "関連項目",
    evidencePortal: "エビデンス登録",
    modelPage: "BERMモデル",
    s1Title:
      "EMF生物学がなぜ一貫しないように見えるか — そしてなぜ一貫しているのか",
    s1p1: "50年間、非熱的電磁生体影響に対する中心的な反論は一貫性のなさであった：「効果が本物なら、なぜ研究室は確実に再現できないのか？」",
    s1p2: "その答えは1985年から1991年の間に、米国環境保護庁のCarl Blackmanによって公表されていた — しかし統一的な枠組みとして統合されることはなかった。Blackman自身の実験は、制御されない場合に同じ基礎現象から見かけ上矛盾する結果を生む5つの変数を特定した。5つすべてが制御されると、結果は一貫する。",
    s1p3: "BERMの貢献は、これらの5つの変数がすべて同じ数学的構造の事例であることを認識したことである：Lindgrenの選択則χ(Ā)を異なるスケールで適用したもの。各変数は生物学的システムがEMF撹乱に応答する「背景」を変調する。背景を変えれば応答が変わる — 効果が信頼できないからではなく、多次元的に感受性が高いからである。",
    s2Title: "5つの交絡因子",
    s2BlackmanLabel: "Blackmanの発見",
    s2ChiLabel: "χの解釈",
    s2LabLabel: "実験室への影響",
    s2RefLabel: "参考文献",
    s3Title: "提案：5パラメータEMF生物学基準",
    s3Note:
      "この基準はいかなる生物学的効果も主張しない。Blackmanが重要であると実証した5つの変数が文書化されることを単に要求するものである。",
    s4Title: "見かけの矛盾がどのように解消されるか",
    s4p1: "研究室Aと研究室Bは5次元パラメータ空間の異なる点にいる。制御されていないパラメータが異なる場合、異なる結果は異常ではなく予想されるものである。Blackmanはこれを直接実証した：同じ研究者が、同じ機器で、温度だけによって増強、減少、またはヌルを得た。",
    s4p2: "EMF生物学の再現性危機は現象の危機ではない — それは実験的制御の危機である。5つの交絡因子が認識され文書化されると、見かけの矛盾は一貫した多次元的用量反応曲面に解消される。",
    s4p3: "Lindgrenのχ(Ā)がその枠組みを提供する：すべての交絡因子は同じ数学的関数を通じて感受性を変調する背景場（熱的、光学的、磁気的、発達的）である。",
    s5Title: "研究成果を予測する7つのモデレーター",
    s5Lead: "5つのエンドポイント（メラトニン、精子、睡眠EEG、DNA損傷、酸化ストレス）にわたる600以上の公表されたEMF生体影響研究の分析は、「矛盾するエビデンス」が7つの制御されていないモデレーターのアーティファクトであることを明らかにする。3つは統計的に有意、2つはRCTレベルで直接証明され、2つは特定の研究によって定量化されている。",
    s5StatsCaption: "統計結果 — モデレーター×結果の関連のカイ二乗検定",
    s5ModeratorCol: "モデレーター",
    s5PosYesCol: "陽性%/あり",
    s5PosNoCol: "陽性%/なし",
    s5MatrixCaption: "5エンドポイントのモデレーター確認マトリックス",
    s5MatrixLegend: "✓✓ = 複数の研究またはメタアナリシスで確認, ✓ = 限られたデータから示唆, — = データなし",
    s5KeyFinding1Title: "DNA損傷の58%がICNIRP未満",
    s5KeyFinding1Body: "[[ref:weller2025_dna|Weller 2025]]、517研究：DNA損傷陽性研究の過半数がICNIRP制限値未満の曝露を使用していた。",
    s5KeyFinding2Title: "9時間の回復窓",
    s5KeyFinding2Body: "[[ref:ivancsits_dna_recovery|Ivancsits]]: DNA修復が定量化された — 9時間のEMFフリー回復が測定可能なDNA修復を可能にする。",
    s5KeyFinding3Title: "資金源 > 品質",
    s5KeyFinding3Body: "[[ref:weller2025_dna|Weller 2025]]: 資金源が研究品質スコアよりも強く研究結果を予測する。",
    rowSpecies: "種/プライミング（動物=1）",
    rowDuration: "期間（慢性=1）",
    rowPulsation: "パルセーション（=1）",
    rowAnimal: "動物 > ヒト",
    rowChronic: "慢性 > 急性",
    rowPulsed: "パルス > CW",
    rowGenotype: "遺伝子型",
    rowSeason: "季節",
    rowDevice: "実機",
    rowRecovery: "回復",
    rowBelowICNIRP: "ICNIRP未満",
  },
  fr: {
    title: "Résolution de la crise de réplication",
    subtitle:
      "Pourquoi la biologie EMF semble incohérente, les cinq facteurs de confusion de Blackman, et le standard à cinq paramètres",
    backLink: "← Retour aux preuves",
    seeAlso: "Voir aussi",
    evidencePortal: "Registre des preuves",
    modelPage: "Modèle BERM",
    s1Title:
      "Pourquoi la biologie EMF semble incohérente — et pourquoi elle ne l'est pas",
    s1p1: "Pendant cinquante ans, l'objection centrale aux bioeffets électromagnétiques non thermiques a été l'incohérence : « Si l'effet est réel, pourquoi les laboratoires ne peuvent-ils pas le reproduire de manière fiable ? »",
    s1p2: "La réponse a été publiée entre 1985 et 1991 par Carl Blackman à l'Agence américaine de protection de l'environnement (EPA) — mais elle n'a jamais été synthétisée en un cadre unifié. Les propres expériences de Blackman ont identifié cinq variables qui, lorsqu'elles ne sont pas contrôlées, produisent des résultats apparemment contradictoires à partir du MÊME phénomène sous-jacent. Lorsque les cinq sont contrôlées, les résultats sont cohérents.",
    s1p3: "La contribution de BERM est de reconnaître que ces cinq variables sont toutes des instances de la même structure mathématique : la règle de sélection de Lindgren χ(Ā), appliquée à différentes échelles. Chaque variable module le « fond » contre lequel le système biologique répond à la perturbation EMF. Changez le fond, changez la réponse — non pas parce que l'effet est peu fiable, mais parce qu'il est multidimensionnellement sensible.",
    s2Title: "Les cinq facteurs de confusion",
    s2BlackmanLabel: "Découverte de Blackman",
    s2ChiLabel: "Interprétation χ",
    s2LabLabel: "Impact laboratoire",
    s2RefLabel: "Référence",
    s3Title: "Proposition : Le standard à cinq paramètres pour la biologie EMF",
    s3Note:
      "Ce standard ne revendique aucun effet biologique. Il exige simplement que les cinq variables dont Blackman a démontré l'importance critique soient documentées.",
    s4Title: "Comment cela résout la contradiction apparente",
    s4p1: "Le laboratoire A et le laboratoire B sont à des points différents dans l'espace paramétrique à cinq dimensions. Quand les paramètres non contrôlés diffèrent, des résultats différents sont ATTENDUS, pas anomaux. Blackman l'a démontré directement : le même chercheur, avec le même équipement, a obtenu une augmentation, une réduction ou un résultat nul selon la température seule.",
    s4p2: "La crise de réplication en biologie EMF n'est pas une crise du phénomène — c'est une crise du contrôle expérimental. Une fois les cinq facteurs de confusion reconnus et documentés, les contradictions apparentes se résolvent en une surface dose-réponse multidimensionnelle cohérente.",
    s4p3: "Le χ(Ā) de Lindgren fournit ce cadre : chaque facteur de confusion est un champ de fond (thermique, optique, magnétique, développemental) qui module la sensibilité via la même fonction mathématique.",
    s5Title: "Sept modérateurs qui prédisent les résultats des études",
    s5Lead: "L'analyse de plus de 600 études publiées sur les bioeffets EMF à travers cinq endpoints (mélatonine, sperme, EEG du sommeil, dommages à l'ADN, stress oxydatif) révèle que les « preuves contradictoires » sont un artefact de sept modérateurs non contrôlés. Trois sont statistiquement significatifs, deux sont directement prouvés par des ECR, et deux sont quantifiés par des études spécifiques.",
    s5StatsCaption: "Résultats statistiques — tests du chi carré d'association modérateur × résultat",
    s5ModeratorCol: "Modérateur",
    s5PosYesCol: "Pos%/Oui",
    s5PosNoCol: "Pos%/Non",
    s5MatrixCaption: "Matrice de confirmation des modérateurs à cinq endpoints",
    s5MatrixLegend: "✓✓ = confirmé par plusieurs études ou méta-analyse, ✓ = suggéré par des données limitées, — = pas de données disponibles",
    s5KeyFinding1Title: "58 % des dommages à l'ADN sous ICNIRP",
    s5KeyFinding1Body: "[[ref:weller2025_dna|Weller 2025]], 517 études : la majorité des études positives pour les dommages à l'ADN ont utilisé des expositions inférieures aux limites ICNIRP.",
    s5KeyFinding2Title: "Fenêtre de récupération de 9 heures",
    s5KeyFinding2Body: "[[ref:ivancsits_dna_recovery|Ivancsits]] : réparation de l'ADN quantifiée — 9 heures de récupération sans EMF permettent une réparation mesurable de l'ADN.",
    s5KeyFinding3Title: "Financement > qualité",
    s5KeyFinding3Body: "[[ref:weller2025_dna|Weller 2025]] : la source de financement prédit les résultats des études plus fortement que le score de qualité de l'étude.",
    rowSpecies: "Espèce/amorçage (animal=1)",
    rowDuration: "Durée (chronique=1)",
    rowPulsation: "Pulsation (=1)",
    rowAnimal: "Animal > Humain",
    rowChronic: "Chronique > Aigu",
    rowPulsed: "Pulsé > CW",
    rowGenotype: "Génotype",
    rowSeason: "Saison",
    rowDevice: "Appareil réel",
    rowRecovery: "Récupération",
    rowBelowICNIRP: "Sous ICNIRP",
  },
  ko: {
    title: "재현성 위기의 해결",
    subtitle:
      "EMF 생물학이 왜 일관성 없어 보이는지, Blackman의 다섯 가지 교란 요인, 그리고 다섯 매개변수 기준",
    backLink: "← 근거로 돌아가기",
    seeAlso: "관련 항목",
    evidencePortal: "근거 등록부",
    modelPage: "BERM 모델",
    s1Title:
      "EMF 생물학이 왜 일관성 없어 보이는가 — 그리고 왜 그렇지 않은가",
    s1p1: "50년간 비열적 전자기 생체효과에 대한 핵심적 반론은 비일관성이었다: '효과가 실재한다면, 왜 실험실들은 신뢰할 수 있게 재현하지 못하는가?'",
    s1p2: "그 답은 1985년에서 1991년 사이에 미국 환경보호국의 Carl Blackman에 의해 발표되었으나 — 통합된 프레임워크로 합성된 적이 없었다. Blackman 자신의 실험은 통제되지 않을 때 동일한 기저 현상으로부터 겉보기에 모순되는 결과를 생산하는 다섯 가지 변수를 식별했다. 다섯 가지 모두가 통제되면 결과는 일관된다.",
    s1p3: "BERM의 기여는 이 다섯 변수가 모두 동일한 수학적 구조의 사례임을 인식한 것이다: 서로 다른 규모에서 적용된 Lindgren의 선택 규칙 χ(Ā). 각 변수는 생물학적 시스템이 EMF 교란에 반응하는 '배경'을 조절한다. 배경을 바꾸면 반응이 바뀐다 — 효과가 신뢰할 수 없어서가 아니라 다차원적으로 민감하기 때문이다.",
    s2Title: "다섯 가지 교란 요인",
    s2BlackmanLabel: "Blackman의 발견",
    s2ChiLabel: "χ 해석",
    s2LabLabel: "실험실 영향",
    s2RefLabel: "참고문헌",
    s3Title: "제안: 다섯 매개변수 EMF 생물학 기준",
    s3Note:
      "이 기준은 어떠한 생물학적 효과도 주장하지 않는다. 단지 Blackman이 중요하다고 입증한 다섯 변수가 문서화될 것을 요구할 뿐이다.",
    s4Title: "겉보기 모순이 어떻게 해소되는가",
    s4p1: "실험실 A와 실험실 B는 5차원 매개변수 공간의 다른 지점에 있다. 통제되지 않은 매개변수가 다를 때, 다른 결과는 이상이 아니라 예상되는 것이다. Blackman은 이를 직접 입증했다: 동일한 연구자가, 동일한 장비로, 온도만으로 증강, 감소, 또는 무효를 얻었다.",
    s4p2: "EMF 생물학의 재현성 위기는 현상의 위기가 아니다 — 실험적 통제의 위기이다. 다섯 교란 요인이 인식되고 문서화되면, 겉보기 모순은 일관된 다차원 용량-반응 곡면으로 해소된다.",
    s4p3: "Lindgren의 χ(Ā)가 그 프레임워크를 제공한다: 모든 교란 요인은 동일한 수학적 함수를 통해 감수성을 조절하는 배경장(열적, 광학적, 자기적, 발달적)이다.",
    s5Title: "연구 결과를 예측하는 7가지 조절 인자",
    s5Lead: "5가지 종말점(멜라토닌, 정자, 수면 EEG, DNA 손상, 산화 스트레스)에 걸쳐 600건 이상의 발표된 EMF 생체효과 연구 분석은 '모순되는 근거'가 7가지 통제되지 않은 조절 인자의 인공산물임을 밝힌다. 3가지는 통계적으로 유의하고, 2가지는 RCT로 직접 입증되었으며, 2가지는 특정 연구에 의해 정량화되었다.",
    s5StatsCaption: "통계 결과 — 조절 인자 × 결과 연관의 카이제곱 검정",
    s5ModeratorCol: "조절 인자",
    s5PosYesCol: "양성%/예",
    s5PosNoCol: "양성%/아니오",
    s5MatrixCaption: "5종말점 조절 인자 확인 매트릭스",
    s5MatrixLegend: "✓✓ = 다수 연구 또는 메타분석으로 확인, ✓ = 제한된 데이터로 시사, — = 데이터 없음",
    s5KeyFinding1Title: "DNA 손상의 58%가 ICNIRP 미만",
    s5KeyFinding1Body: "[[ref:weller2025_dna|Weller 2025]], 517건의 연구: DNA 손상 양성 연구의 과반수가 ICNIRP 제한치 미만의 노출을 사용했다.",
    s5KeyFinding2Title: "9시간 회복 창",
    s5KeyFinding2Body: "[[ref:ivancsits_dna_recovery|Ivancsits]]: DNA 복구가 정량화됨 — 9시간의 EMF 비노출 회복이 측정 가능한 DNA 복구를 허용한다.",
    s5KeyFinding3Title: "자금원 > 품질",
    s5KeyFinding3Body: "[[ref:weller2025_dna|Weller 2025]]: 자금원이 연구 품질 점수보다 연구 결과를 더 강력하게 예측한다.",
    rowSpecies: "종/프라이밍 (동물=1)",
    rowDuration: "기간 (만성=1)",
    rowPulsation: "펄세이션 (=1)",
    rowAnimal: "동물 > 인간",
    rowChronic: "만성 > 급성",
    rowPulsed: "펄스 > CW",
    rowGenotype: "유전자형",
    rowSeason: "계절",
    rowDevice: "실제 기기",
    rowRecovery: "회복",
    rowBelowICNIRP: "ICNIRP 미만",
  },
};

const LEVEL_COLORS: Record<string, string> = {
  E: "border-green-500",
  M: "border-amber-500",
};

const LEVEL_BADGE_COLORS: Record<string, string> = {
  E: "bg-green-500/10 text-green-600 dark:text-green-400",
  M: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const d = COPY[locale as keyof typeof COPY] ?? COPY.en;
  return {
    title: `${d.title} – Extinction Field`,
    description: d.subtitle,
  };
}

export default async function ReplicationPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const activeLocale = (locale in COPY ? locale : "en") as keyof typeof COPY;
  const d = COPY[activeLocale];
  const confounds = CONFOUNDS[activeLocale] ?? CONFOUNDS.en;
  const standardItems = STANDARD_ITEMS[activeLocale as keyof typeof STANDARD_ITEMS] ?? STANDARD_ITEMS.en;

  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <Link
        href={`/${locale}/evidence`}
        className="text-sm text-accent hover:underline mb-6 inline-block"
      >
        {d.backLink}
      </Link>

      <PageHeader icon={FlaskConical} title={d.title} subtitle={d.subtitle} />

      {/* ── Section 1: Why EMF Biology Seems Inconsistent ── */}
      <section className="mb-16 border-t editorial-rule pt-6">
        <article id="inconsistency" className="scroll-mt-24">
          <h3 className="text-lg font-semibold mb-4">
            <span className="font-mono-num text-xs text-accent mr-2">01</span>
            {d.s1Title}
          </h3>
          <p className="editorial-rail mb-4 text-[0.95rem] leading-relaxed text-foreground">
            {d.s1p1}
          </p>
          <div className="space-y-3 text-sm text-foreground-muted leading-relaxed">
            <p>{d.s1p2}</p>
            <p>{d.s1p3}</p>
          </div>
        </article>
      </section>

      {/* ── Section 2: The Five Confounds ── */}
      <section className="mb-16 border-t editorial-rule pt-6">
        <h3 className="text-lg font-semibold mb-6">
          <span className="font-mono-num text-xs text-accent mr-2">02</span>
          {d.s2Title}
        </h3>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {confounds.map((c, i) => (
            <div
              key={i}
              className={`border-l-4 ${LEVEL_COLORS[c.level]} rounded-r-lg bg-card p-5 space-y-3`}
            >
              <div className="flex items-start justify-between gap-2">
                <h4 className="font-bold text-foreground text-sm leading-tight">
                  {c.title}
                </h4>
                <span
                  className={`shrink-0 text-[0.65rem] font-semibold px-1.5 py-0.5 rounded ${LEVEL_BADGE_COLORS[c.level]}`}
                >
                  {c.level}
                </span>
              </div>

              {c.bermNote && (
                <p className="text-xs italic text-amber-600 dark:text-amber-400">
                  {c.bermNote}
                </p>
              )}

              <div>
                <p className="text-xs font-semibold text-foreground-muted uppercase tracking-wider mb-1">
                  {d.s2BlackmanLabel}
                </p>
                <p className="text-xs text-foreground-muted leading-relaxed">
                  {c.blackman}
                </p>
              </div>

              <div>
                <p className="text-xs font-semibold text-foreground-muted uppercase tracking-wider mb-1">
                  {d.s2ChiLabel}
                </p>
                <p className="text-xs text-foreground-muted leading-relaxed font-mono">
                  {c.chi}
                </p>
              </div>

              <div>
                <p className="text-xs font-semibold text-foreground-muted uppercase tracking-wider mb-1">
                  {d.s2LabLabel}
                </p>
                <p className="text-xs text-foreground-muted leading-relaxed">
                  {c.labImpact}
                </p>
              </div>

              <div>
                <p className="text-xs font-semibold text-foreground-muted uppercase tracking-wider mb-1">
                  {d.s2RefLabel}
                </p>
                <p className="text-xs text-foreground-muted leading-relaxed italic">
                  <InlineReferenceText text={c.ref} locale={locale} />
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Section 3: The Five-Parameter Standard ── */}
      <section className="mb-16 border-t editorial-rule pt-6">
        <h3 className="text-lg font-semibold mb-4">
          <span className="font-mono-num text-xs text-accent mr-2">03</span>
          {d.s3Title}
        </h3>

        <ol className="space-y-2 text-sm text-foreground-muted leading-relaxed max-w-4xl list-decimal list-inside">
          {standardItems.map((item, i) => (
            <li key={i} className="pl-1">
              <span className="font-medium text-foreground">
                {item.split(" — ")[0]}
              </span>
              {" — "}
              {item.split(" — ")[1]}
            </li>
          ))}
        </ol>

        <p className="mt-4 text-xs text-foreground-muted italic max-w-4xl">
          {d.s3Note}
        </p>
      </section>

      {/* ── Section 4: How This Resolves the Contradiction ── */}
      <section className="mb-16 border-t editorial-rule pt-6">
        <h3 className="text-lg font-semibold mb-4">
          <span className="font-mono-num text-xs text-accent mr-2">04</span>
          {d.s4Title}
        </h3>

        <div className="space-y-4 text-sm text-foreground-muted leading-relaxed max-w-4xl">
          <p className="editorial-rail text-[0.95rem] text-foreground">
            {d.s4p1}
          </p>
          <p>{d.s4p2}</p>
          <p>{d.s4p3}</p>
        </div>
      </section>

      {/* ── Section 5: Quantitative Moderator Analysis ── */}
      <section className="mb-16 border-t editorial-rule pt-6">
        <h3 className="text-lg font-semibold mb-4">
          <span className="font-mono-num text-xs text-accent mr-2">05</span>
          {d.s5Title}
        </h3>

        <p className="editorial-rail mb-6 text-[0.95rem] leading-relaxed text-foreground max-w-4xl">
          {d.s5Lead}
        </p>

        {/* Statistical results table */}
        <div className="rounded-xl border border-card-border bg-card p-5 mb-6 max-w-4xl overflow-x-auto">
          <p className="text-xs font-semibold text-foreground-muted uppercase tracking-wider mb-3">
            {d.s5StatsCaption}
          </p>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-card-border text-left">
                <th className="pb-2 pr-4 font-semibold text-foreground">{d.s5ModeratorCol}</th>
                <th className="pb-2 pr-4 font-semibold text-foreground text-right">{d.s5PosYesCol}</th>
                <th className="pb-2 pr-4 font-semibold text-foreground text-right">{d.s5PosNoCol}</th>
                <th className="pb-2 pr-4 font-semibold text-foreground text-right font-mono-num">&chi;&sup2;</th>
                <th className="pb-2 font-semibold text-foreground text-right font-mono-num">p</th>
              </tr>
            </thead>
            <tbody className="text-foreground-muted">
              <tr className="border-b border-card-border/50">
                <td className="py-2 pr-4">
                  {d.rowSpecies}
                </td>
                <td className="py-2 pr-4 text-right font-mono-num">92% (11/12)</td>
                <td className="py-2 pr-4 text-right font-mono-num">35% (6/17)</td>
                <td className="py-2 pr-4 text-right font-mono-num">9.4</td>
                <td className="py-2 text-right font-mono-num font-semibold text-green-600 dark:text-green-400">0.002</td>
              </tr>
              <tr className="border-b border-card-border/50">
                <td className="py-2 pr-4">
                  {d.rowDuration}
                </td>
                <td className="py-2 pr-4 text-right font-mono-num">92% (12/13)</td>
                <td className="py-2 pr-4 text-right font-mono-num">31% (5/16)</td>
                <td className="py-2 pr-4 text-right font-mono-num">10.8</td>
                <td className="py-2 text-right font-mono-num font-semibold text-green-600 dark:text-green-400">0.001</td>
              </tr>
              <tr>
                <td className="py-2 pr-4">
                  {d.rowPulsation}
                </td>
                <td className="py-2 pr-4 text-right font-mono-num">88% (7/8)</td>
                <td className="py-2 pr-4 text-right font-mono-num">48% (10/21)</td>
                <td className="py-2 pr-4 text-right font-mono-num">3.9</td>
                <td className="py-2 text-right font-mono-num font-semibold text-amber-600 dark:text-amber-400">0.048</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Five-endpoint moderator matrix */}
        <div className="rounded-xl border border-card-border bg-card p-5 mb-6 max-w-4xl overflow-x-auto">
          <p className="text-xs font-semibold text-foreground-muted uppercase tracking-wider mb-3">
            {d.s5MatrixCaption}
          </p>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-card-border text-left">
                <th className="pb-2 pr-4 font-semibold text-foreground">{d.s5ModeratorCol}</th>
                <th className="pb-2 pr-2 font-semibold text-foreground text-center font-mono-num">MEL</th>
                <th className="pb-2 pr-2 font-semibold text-foreground text-center font-mono-num">SPERM</th>
                <th className="pb-2 pr-2 font-semibold text-foreground text-center font-mono-num">EEG</th>
                <th className="pb-2 pr-2 font-semibold text-foreground text-center font-mono-num">DNA</th>
                <th className="pb-2 font-semibold text-foreground text-center font-mono-num">OxS</th>
              </tr>
            </thead>
            <tbody className="text-foreground-muted">
              <tr className="border-b border-card-border/50">
                <td className="py-2 pr-4">{d.rowAnimal}</td>
                <td className="py-2 pr-2 text-center">✓✓</td>
                <td className="py-2 pr-2 text-center">✓✓</td>
                <td className="py-2 pr-2 text-center">—</td>
                <td className="py-2 pr-2 text-center">✓✓</td>
                <td className="py-2 text-center">✓✓</td>
              </tr>
              <tr className="border-b border-card-border/50">
                <td className="py-2 pr-4">{d.rowChronic}</td>
                <td className="py-2 pr-2 text-center">✓✓</td>
                <td className="py-2 pr-2 text-center">✓✓</td>
                <td className="py-2 pr-2 text-center">—</td>
                <td className="py-2 pr-2 text-center">✓✓</td>
                <td className="py-2 text-center">✓✓</td>
              </tr>
              <tr className="border-b border-card-border/50">
                <td className="py-2 pr-4">{d.rowPulsed}</td>
                <td className="py-2 pr-2 text-center">—</td>
                <td className="py-2 pr-2 text-center">✓</td>
                <td className="py-2 pr-2 text-center">✓✓</td>
                <td className="py-2 pr-2 text-center">✓✓</td>
                <td className="py-2 text-center">—</td>
              </tr>
              <tr className="border-b border-card-border/50">
                <td className="py-2 pr-4">{d.rowGenotype}</td>
                <td className="py-2 pr-2 text-center">✓</td>
                <td className="py-2 pr-2 text-center">—</td>
                <td className="py-2 pr-2 text-center">✓✓</td>
                <td className="py-2 pr-2 text-center">—</td>
                <td className="py-2 text-center">—</td>
              </tr>
              <tr className="border-b border-card-border/50">
                <td className="py-2 pr-4">{d.rowSeason}</td>
                <td className="py-2 pr-2 text-center">✓✓</td>
                <td className="py-2 pr-2 text-center">—</td>
                <td className="py-2 pr-2 text-center">—</td>
                <td className="py-2 pr-2 text-center">—</td>
                <td className="py-2 text-center">—</td>
              </tr>
              <tr className="border-b border-card-border/50">
                <td className="py-2 pr-4">{d.rowDevice}</td>
                <td className="py-2 pr-2 text-center">—</td>
                <td className="py-2 pr-2 text-center">—</td>
                <td className="py-2 pr-2 text-center">—</td>
                <td className="py-2 pr-2 text-center">✓✓</td>
                <td className="py-2 text-center">—</td>
              </tr>
              <tr className="border-b border-card-border/50">
                <td className="py-2 pr-4">{d.rowRecovery}</td>
                <td className="py-2 pr-2 text-center">✓</td>
                <td className="py-2 pr-2 text-center">—</td>
                <td className="py-2 pr-2 text-center">—</td>
                <td className="py-2 pr-2 text-center">✓✓</td>
                <td className="py-2 text-center">—</td>
              </tr>
              <tr>
                <td className="py-2 pr-4">{d.rowBelowICNIRP}</td>
                <td className="py-2 pr-2 text-center">—</td>
                <td className="py-2 pr-2 text-center">—</td>
                <td className="py-2 pr-2 text-center">—</td>
                <td className="py-2 pr-2 text-center">✓✓</td>
                <td className="py-2 text-center">—</td>
              </tr>
            </tbody>
          </table>
          <p className="mt-3 text-xs text-foreground-muted italic">{d.s5MatrixLegend}</p>
        </div>

        {/* Key finding boxes */}
        <div className="grid gap-4 md:grid-cols-3 max-w-4xl">
          <div className="border-l-4 border-amber-500 rounded-r-lg bg-card p-4 space-y-1">
            <h4 className="font-bold text-foreground text-sm">{d.s5KeyFinding1Title}</h4>
            <p className="text-xs text-foreground-muted leading-relaxed"><InlineReferenceText text={d.s5KeyFinding1Body} locale={locale} /></p>
          </div>
          <div className="border-l-4 border-amber-500 rounded-r-lg bg-card p-4 space-y-1">
            <h4 className="font-bold text-foreground text-sm">{d.s5KeyFinding2Title}</h4>
            <p className="text-xs text-foreground-muted leading-relaxed"><InlineReferenceText text={d.s5KeyFinding2Body} locale={locale} /></p>
          </div>
          <div className="border-l-4 border-amber-500 rounded-r-lg bg-card p-4 space-y-1">
            <h4 className="font-bold text-foreground text-sm">{d.s5KeyFinding3Title}</h4>
            <p className="text-xs text-foreground-muted leading-relaxed"><InlineReferenceText text={d.s5KeyFinding3Body} locale={locale} /></p>
          </div>
        </div>
      </section>

      {/* ── See also navigation ── */}
      <section className="border-t editorial-rule pt-6">
        <h3 className="text-sm font-semibold text-foreground mb-3">
          {d.seeAlso}
        </h3>
        <div className="flex gap-6">
          <Link
            href={`/${locale}/evidence`}
            className="text-sm text-accent hover:underline"
          >
            {d.evidencePortal} &rarr;
          </Link>
          <Link
            href={`/${locale}/model`}
            className="text-sm text-accent hover:underline"
          >
            {d.modelPage} &rarr;
          </Link>
        </div>
      </section>
    </div>
  );
}
