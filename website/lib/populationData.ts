export interface PopulationHealth {
  tfr: string | null;
  cvd: string;
  dementia: string;
  obesity: string;
  t2d: string;
  cancer: string;
  depression: string;
}

export interface LowEMFPopulation {
  id: string;
  nameEn: string;
  nameFi: string;
  nameJa: string;
  nameFr: string;
  nameKo: string;
  location: string;
  lat: number;
  lon: number;
  emfLevel: "none" | "minimal" | "ambient";
  emfLabelEn: string;
  emfLabelFi: string;
  emfLabelJa: string;
  emfLabelFr: string;
  emfLabelKo: string;
  descriptionEn: string;
  descriptionFi: string;
  descriptionJa: string;
  descriptionFr: string;
  descriptionKo: string;
  keyFindingEn: string;
  keyFindingFi: string;
  keyFindingJa: string;
  keyFindingFr: string;
  keyFindingKo: string;
  testosteroneProfile?: {
    baselineEn: string;
    baselineFi: string;
    baselineJa: string;
    baselineFr: string;
    baselineKo: string;
    ageDeclineEn: string;
    ageDeclineFi: string;
    ageDeclineJa: string;
    ageDeclineFr: string;
    ageDeclineKo: string;
    reactivityEn: string;
    reactivityFi: string;
    reactivityJa: string;
    reactivityFr: string;
    reactivityKo: string;
    implicationEn: string;
    implicationFi: string;
    implicationJa: string;
    implicationFr: string;
    implicationKo: string;
    source: string;
    referenceId?: string;
  };
  health: PopulationHealth;
  referenceIds: string[];
}

export interface ModernComparison {
  id: string;
  nameEn: string;
  nameFi: string;
  nameJa: string;
  nameFr: string;
  nameKo: string;
  emfLabelEn: string;
  emfLabelFi: string;
  emfLabelJa: string;
  emfLabelFr: string;
  emfLabelKo: string;
  health: PopulationHealth;
}

export const LOW_EMF_POPULATIONS: LowEMFPopulation[] = [
  {
    id: "tsimane",
    nameEn: "Tsimane",
    nameFi: "Tsimane",
    nameJa: "Tsimane",
    nameFr: "Tsimane",
    nameKo: "Tsimane",
    location: "Bolivia",
    lat: -14.8,
    lon: -65.5,
    emfLevel: "none",
    emfLabelEn: "Zero",
    emfLabelFi: "Nolla",
    emfLabelJa: "ゼロ",
    emfLabelFr: "Zéro",
    emfLabelKo: "제로",
    descriptionEn: "Indigenous forager-horticulturalists in the Bolivian Amazon. No electricity, no phones, no modern technology.",
    descriptionFi: "Alkuperäiskansaan kuuluvia metsästäjä-puutarhaviljelijöitä Bolivian Amazoniassa. Ei sähköä, ei puhelimia, ei modernia teknologiaa.",
    descriptionJa: "ボリビアのアマゾンに住む先住民の採集・園芸民。電気なし、電話なし、現代技術なし。",
    descriptionFr: "Horticulteurs-cueilleurs autochtones de l'Amazonie bolivienne. Pas d'électricité, pas de téléphones, pas de technologie moderne.",
    descriptionKo: "볼리비아 아마존의 원주민 채집-원예 농경민. 전기 없음, 전화 없음, 현대 기술 없음.",
    keyFindingEn: "Lowest coronary artery disease ever recorded (Lancet 2017). Dementia 1.2% vs USA 8-11%. Brain atrophy 70% slower than Western populations. Testosterone does not decline with age (Trumble 2012) despite 33% lower baseline — no cumulative EMF damage.",
    keyFindingFi: "Matalin koskaan mitattu sepelvaltimotauti (Lancet 2017). Dementia 1,2 % vs USA 8–11 %. Aivoatrofia 70 % hitaampi kuin länsimaissa. Testosteroni ei laske iän myötä (Trumble 2012), vaikka lähtötaso on 33 % matalampi — ei kumulatiivista EMF-vauriota.",
    keyFindingJa: "史上最低の冠動脈疾患を記録（Lancet 2017）。認知症1.2%（米国8〜11%）。脳萎縮は西洋人より70%遅い。テストステロンは加齢に伴い低下しない（Trumble 2012）、ベースラインは33%低いにもかかわらず — EMFによる累積的損傷なし。",
    keyFindingFr: "Taux le plus bas de maladie coronarienne jamais enregistré (Lancet 2017). Démence 1,2 % vs USA 8–11 %. Atrophie cérébrale 70 % plus lente que les populations occidentales. La testostérone ne décline pas avec l'âge (Trumble 2012) malgré un niveau de base 33 % inférieur — pas de dommage CEM cumulatif.",
    keyFindingKo: "역대 최저 관상동맥 질환 기록 (Lancet 2017). 치매 1.2% vs 미국 8-11%. 뇌위축 서양인 대비 70% 느림. 테스토스테론이 나이에 따라 감소하지 않음 (Trumble 2012), 기준치가 33% 낮음에도 불구하고 — 누적 EMF 손상 없음.",
    testosteroneProfile: {
      baselineEn: "33% lower than age-matched US men (salivary testosterone)",
      baselineFi: "33 % matalampi kuin ikävakioidut yhdysvaltalaiset miehet (sylkitestosteroni)",
      baselineJa: "年齢対応の米国男性より33%低い（唾液テストステロン）",
      baselineFr: "33 % inférieur aux hommes américains appariés par âge (testostérone salivaire)",
      baselineKo: "연령 대응 미국 남성보다 33% 낮음 (타액 테스토스테론)",
      ageDeclineEn: "None observed — testosterone does NOT decline with age",
      ageDeclineFi: "Ei havaittua — testosteroni EI laske iän myötä",
      ageDeclineJa: "観察されず — テストステロンは加齢に伴い低下しない",
      ageDeclineFr: "Aucun observé — la testostérone NE décline PAS avec l'âge",
      ageDeclineKo: "관찰되지 않음 — 테스토스테론이 나이에 따라 감소하지 않음",
      reactivityEn: "Normal: 30% increase during competition/hunting",
      reactivityFi: "Normaali: 30 %:n nousu kilpailun/metsästyksen aikana",
      reactivityJa: "正常：競争・狩猟中に30%増加",
      reactivityFr: "Normale : augmentation de 30 % pendant la compétition/chasse",
      reactivityKo: "정상: 경쟁/사냥 중 30% 증가",
      implicationEn: "Age-related testosterone decline is not biological inevitability but environment-dependent. Low baseline reflects immune trade-off (high pathogen load), not dysfunction.",
      implicationFi: "Ikään liittyvä testosteronilasku ei ole biologinen väistämättömyys vaan ympäristöriippuvainen ilmiö. Matala lähtötaso heijastaa immuunijärjestelmän kompromissia (korkea patogeenipaine), ei toimintahäiriötä.",
      implicationJa: "加齢に伴うテストステロン低下は生物学的必然ではなく、環境依存である。低いベースラインは免疫トレードオフ（高い病原体負荷）を反映しており、機能障害ではない。",
      implicationFr: "Le déclin de la testostérone lié à l'âge n'est pas une fatalité biologique mais dépend de l'environnement. Le niveau de base bas reflète un compromis immunitaire (charge pathogène élevée), pas un dysfonctionnement.",
      implicationKo: "연령 관련 테스토스테론 감소는 생물학적 필연이 아니라 환경 의존적이다. 낮은 기준치는 면역 트레이드오프(높은 병원체 부하)를 반영하며 기능 장애가 아니다.",
      source: "Trumble et al. 2012, Proc R Soc B",
      referenceId: "trumble2012",
    },
    health: {
      tfr: "~9",
      cvd: "Lowest ever recorded",
      dementia: "1.2%",
      obesity: "<5%",
      t2d: "~0%",
      cancer: "?",
      depression: "?",
    },
    referenceIds: ["lancet-2017-tsimane-heart", "alz-dem-2022-tsimane-dementia", "j-gerontol-2021-tsimane-brain", "trumble2012"],
  },
  {
    id: "hadza",
    nameEn: "Hadza",
    nameFi: "Hadza",
    nameJa: "Hadza",
    nameFr: "Hadza",
    nameKo: "Hadza",
    location: "Tanzania",
    lat: -3.8,
    lon: 35.0,
    emfLevel: "none",
    emfLabelEn: "Zero",
    emfLabelFi: "Nolla",
    emfLabelJa: "ゼロ",
    emfLabelFr: "Zéro",
    emfLabelKo: "제로",
    descriptionEn: "One of the last true hunter-gatherer populations. Lifestyle largely unchanged for ~10,000 years. ~17,000 steps/day (vs USA ~4,000).",
    descriptionFi: "Yksi viimeisistä aidoista metsästäjä-keräilijäpopulaatioista. Elämäntapa pysynyt pääosin muuttumattomana ~10 000 vuotta. ~17 000 askelta/vrk (vs USA ~4 000).",
    descriptionJa: "最後の真の狩猟採集民の一つ。約1万年間、生活様式がほとんど変わっていない。1日約17,000歩（米国約4,000歩）。",
    descriptionFr: "L'une des dernières véritables populations de chasseurs-cueilleurs. Mode de vie largement inchangé depuis ~10 000 ans. ~17 000 pas/jour (vs USA ~4 000).",
    descriptionKo: "마지막 진정한 수렵채집 인구 중 하나. 약 10,000년간 생활 방식이 거의 변하지 않음. 하루 약 17,000보 (미국 약 4,000보).",
    keyFindingEn: "Near-absence of obesity, T2D, and cardiovascular disease despite diverse diet.",
    keyFindingFi: "Lähes olematon obesiteetti, T2D ja sydänsairaus monipuolisesta ruokavaliosta huolimatta.",
    keyFindingJa: "多様な食事にもかかわらず、肥満、2型糖尿病、心血管疾患がほぼ存在しない。",
    keyFindingFr: "Quasi-absence d'obésité, de diabète de type 2 et de maladie cardiovasculaire malgré un régime alimentaire diversifié.",
    keyFindingKo: "다양한 식단에도 불구하고 비만, 2형 당뇨병, 심혈관 질환이 거의 없음.",
    health: {
      tfr: "6–7",
      cvd: "Very low",
      dementia: "?",
      obesity: "<5%",
      t2d: "0–2%",
      cancer: "?",
      depression: "?",
    },
    referenceIds: ["obesity-rev-2018-hunter-gatherer"],
  },
  {
    id: "kitava",
    nameEn: "Kitava",
    nameFi: "Kitava",
    nameJa: "Kitava",
    nameFr: "Kitava",
    nameKo: "Kitava",
    location: "Papua New Guinea",
    lat: -8.5,
    lon: 151.1,
    emfLevel: "none",
    emfLabelEn: "Zero",
    emfLabelFi: "Nolla",
    emfLabelJa: "ゼロ",
    emfLabelFr: "Zéro",
    emfLabelKo: "제로",
    descriptionEn: "Melanesian islanders studied by Lindeberg in the 1990s. 70% energy from carbohydrates (tubers, fruit).",
    descriptionFi: "Melanesialaisia saarelaisia, joita Lindeberg tutki 1990-luvulla. 70 % energiasta hiilihydraateista (juurekset, hedelmät).",
    descriptionJa: "1990年代にLindebergが研究したメラネシアの島民。エネルギーの70%を炭水化物（芋類、果物）から摂取。",
    descriptionFr: "Insulaires mélanésiens étudiés par Lindeberg dans les années 1990. 70 % de l'énergie provient des glucides (tubercules, fruits).",
    descriptionKo: "1990년대 Lindeberg가 연구한 멜라네시아 섬 주민. 에너지의 70%를 탄수화물(뿌리 작물, 과일)에서 섭취.",
    keyFindingEn: "Apparent absence of CVD, T2D, and metabolic syndrome despite high-carbohydrate diet.",
    keyFindingFi: "CVD:n, T2D:n ja metabolisen oireyhtymän näennäinen poissaolo korkeahiilihydraattisesta ruokavaliosta huolimatta.",
    keyFindingJa: "高炭水化物食にもかかわらず、心血管疾患、2型糖尿病、メタボリックシンドロームが明らかに存在しない。",
    keyFindingFr: "Absence apparente de MCV, de diabète de type 2 et de syndrome métabolique malgré un régime riche en glucides.",
    keyFindingKo: "고탄수화물 식단에도 불구하고 심혈관 질환, 2형 당뇨병, 대사증후군이 명백히 없음.",
    health: {
      tfr: "High",
      cvd: "Absent",
      dementia: "?",
      obesity: "~0%",
      t2d: "Absent",
      cancer: "?",
      depression: "?",
    },
    referenceIds: ["kitava-lindeberg-1993"],
  },
  {
    id: "ache",
    nameEn: "Aché",
    nameFi: "Aché",
    nameJa: "Aché",
    nameFr: "Aché",
    nameKo: "Aché",
    location: "Paraguay",
    lat: -24.0,
    lon: -56.0,
    emfLevel: "none",
    emfLabelEn: "Zero",
    emfLabelFi: "Nolla",
    emfLabelJa: "ゼロ",
    emfLabelFr: "Zéro",
    emfLabelKo: "제로",
    descriptionEn: "Indigenous hunter-gatherers of eastern Paraguay. Studied extensively for life history and reproductive ecology.",
    descriptionFi: "Itä-Paraguayn alkuperäisiä metsästäjä-keräilijöitä. Tutkittu laajasti elämänhistorian ja lisääntymisekologian osalta.",
    descriptionJa: "東パラグアイの先住民狩猟採集民。生活史と生殖生態学について広範に研究されている。",
    descriptionFr: "Chasseurs-cueilleurs autochtones de l'est du Paraguay. Étudiés de manière approfondie pour l'histoire de vie et l'écologie reproductive.",
    descriptionKo: "동부 파라과이의 원주민 수렵채집민. 생활사와 생식 생태학에 대해 광범위하게 연구됨.",
    keyFindingEn: "TFR approximately 8. Low obesity prevalence.",
    keyFindingFi: "TFR noin 8. Matala obesiteettiprevalenssi.",
    keyFindingJa: "TFR約8。低い肥満有病率。",
    keyFindingFr: "TFR d'environ 8. Faible prévalence de l'obésité.",
    keyFindingKo: "TFR 약 8. 낮은 비만 유병률.",
    health: {
      tfr: "~8",
      cvd: "?",
      dementia: "?",
      obesity: "Low",
      t2d: "?",
      cancer: "?",
      depression: "?",
    },
    referenceIds: [],
  },
  {
    id: "san",
    nameEn: "San / Bushmen",
    nameFi: "San / Bushmannit",
    nameJa: "San / ブッシュマン",
    nameFr: "San / Bochimans",
    nameKo: "San / 부시맨",
    location: "Southern Africa",
    lat: -22.0,
    lon: 21.0,
    emfLevel: "none",
    emfLabelEn: "Zero",
    emfLabelFi: "Nolla",
    emfLabelJa: "ゼロ",
    emfLabelFr: "Zéro",
    emfLabelKo: "제로",
    descriptionEn: "Indigenous peoples of the Kalahari. Among the oldest continuous populations on Earth.",
    descriptionFi: "Kalaharin alkuperäiskansoja. Maailman vanhimpia yhtäjaksoisesti asuneita populaatioita.",
    descriptionJa: "カラハリの先住民族。地球上で最も古い連続した集団の一つ。",
    descriptionFr: "Peuples autochtones du Kalahari. Parmi les plus anciennes populations continues sur Terre.",
    descriptionKo: "칼라하리의 원주민. 지구상에서 가장 오래된 연속적 인구 집단 중 하나.",
    keyFindingEn: "Low CVD, low obesity, low T2D. TFR 4-5.",
    keyFindingFi: "Matala CVD, matala obesiteetti, matala T2D. TFR 4–5.",
    keyFindingJa: "低い心血管疾患、低い肥満、低い2型糖尿病。TFR 4〜5。",
    keyFindingFr: "Faible MCV, faible obésité, faible diabète de type 2. TFR 4–5.",
    keyFindingKo: "낮은 심혈관 질환, 낮은 비만, 낮은 2형 당뇨병. TFR 4-5.",
    health: {
      tfr: "4–5",
      cvd: "Low",
      dementia: "?",
      obesity: "Low",
      t2d: "Low",
      cancer: "?",
      depression: "?",
    },
    referenceIds: [],
  },
  {
    id: "shuar",
    nameEn: "Shuar",
    nameFi: "Shuar",
    nameJa: "Shuar",
    nameFr: "Shuar",
    nameKo: "Shuar",
    location: "Ecuador",
    lat: -2.5,
    lon: -77.5,
    emfLevel: "minimal",
    emfLabelEn: "~Zero",
    emfLabelFi: "~Nolla",
    emfLabelJa: "~ゼロ",
    emfLabelFr: "~Zéro",
    emfLabelKo: "~제로",
    descriptionEn: "Indigenous people of the Ecuadorian Amazon. Transitioning between traditional and market-integrated lifestyles.",
    descriptionFi: "Ecuadorin Amazonian alkuperäiskansaa. Siirtymässä perinteisestä markkinaintegroituun elämäntapaan.",
    descriptionJa: "エクアドルのアマゾンの先住民族。伝統的な生活から市場統合型の生活への移行期。",
    descriptionFr: "Peuple autochtone de l'Amazonie équatorienne. En transition entre modes de vie traditionnel et intégré au marché.",
    descriptionKo: "에콰도르 아마존의 원주민. 전통적 생활 방식에서 시장 통합 생활 방식으로 전환 중.",
    keyFindingEn: "TFR approximately 5. Low obesity and inflammatory markers.",
    keyFindingFi: "TFR noin 5. Matala obesiteetti ja tulehdusmarkkerit.",
    keyFindingJa: "TFR約5。低い肥満率と炎症マーカー。",
    keyFindingFr: "TFR d'environ 5. Faible obésité et marqueurs inflammatoires bas.",
    keyFindingKo: "TFR 약 5. 낮은 비만 및 염증 마커.",
    health: {
      tfr: "~5",
      cvd: "?",
      dementia: "?",
      obesity: "Low",
      t2d: "?",
      cancer: "?",
      depression: "?",
    },
    referenceIds: [],
  },
  {
    id: "moseten",
    nameEn: "Mosetén",
    nameFi: "Mosetén",
    nameJa: "Mosetén",
    nameFr: "Mosetén",
    nameKo: "Mosetén",
    location: "Bolivia",
    lat: -15.4,
    lon: -67.5,
    emfLevel: "minimal",
    emfLabelEn: "Low",
    emfLabelFi: "Matala",
    emfLabelJa: "低",
    emfLabelFr: "Faible",
    emfLabelKo: "낮음",
    descriptionEn: "Share Tsimane ancestral history and subsistence base but with more technology, medicine, and infrastructure. Key natural experiment for dose-response.",
    descriptionFi: "Jakavat Tsimanen esi-isällisen historian ja elinkeinon mutta enemmän teknologiaa, lääketiedettä ja infrastruktuuria. Avainluonnollinen koe annos-vasteelle.",
    descriptionJa: "Tsimaneと祖先の歴史と生業基盤を共有するが、より多くの技術、医療、インフラを持つ。用量反応の重要な自然実験。",
    descriptionFr: "Partagent l'histoire ancestrale et la base de subsistance des Tsimane mais avec plus de technologie, de médecine et d'infrastructure. Expérience naturelle clé pour la relation dose-réponse.",
    descriptionKo: "Tsimane와 조상의 역사와 생계 기반을 공유하지만 더 많은 기술, 의료, 인프라를 보유. 용량-반응에 대한 핵심 자연 실험.",
    keyFindingEn: "Health metrics fall BETWEEN Tsimane and Western on every measured variable — the dose-response gradient. Testosterone shows intermediate age-decline pattern, consistent with partial EMF exposure.",
    keyFindingFi: "Terveysmittarit ovat Tsimanen ja länsimaisen VÄLISSÄ jokaisessa mitatussa muuttujassa — annos-vastegradientti. Testosteroni osoittaa väliasteen ikälaskumallin, yhdenmukainen osittaisen EMF-altistuksen kanssa.",
    keyFindingJa: "健康指標は測定されたすべての変数でTsimaneと西洋の間に位置する — 用量反応勾配。テストステロンは中間的な加齢低下パターンを示し、部分的なEMF曝露と一致。",
    keyFindingFr: "Les indicateurs de santé se situent ENTRE les Tsimane et les Occidentaux pour chaque variable mesurée — le gradient dose-réponse. La testostérone montre un schéma intermédiaire de déclin avec l'âge, cohérent avec une exposition partielle aux CEM.",
    keyFindingKo: "건강 지표가 모든 측정 변수에서 Tsimane와 서양인 사이에 위치 — 용량-반응 구배. 테스토스테론은 중간 수준의 연령 감소 패턴을 보이며, 부분적 EMF 노출과 일치.",
    testosteroneProfile: {
      baselineEn: "Intermediate between Tsimane and US — consistent with partial market integration",
      baselineFi: "Tsimanen ja USA:n välissä — yhdenmukainen osittaisen markkinaintegraation kanssa",
      baselineJa: "TsimaneとUSの中間 — 部分的な市場統合と一致",
      baselineFr: "Intermédiaire entre les Tsimane et les États-Unis — cohérent avec une intégration partielle au marché",
      baselineKo: "Tsimane와 미국의 중간 — 부분적 시장 통합과 일치",
      ageDeclineEn: "Modest age-related decline — between Tsimane (none) and US (~1.5%/yr)",
      ageDeclineFi: "Maltillinen ikään liittyvä lasku — Tsimanen (ei) ja USA:n (~1,5 %/v) välissä",
      ageDeclineJa: "緩やかな加齢関連低下 — Tsimane（なし）と米国（約1.5%/年）の中間",
      ageDeclineFr: "Déclin modeste lié à l'âge — entre les Tsimane (aucun) et les États-Unis (~1,5 %/an)",
      ageDeclineKo: "완만한 연령 관련 감소 — Tsimane(없음)와 미국(약 1.5%/년)의 중간",
      reactivityEn: "Attenuated compared to Tsimane but higher than US",
      reactivityFi: "Vaimentunut Tsimaneen verrattuna mutta korkeampi kuin USA",
      reactivityJa: "Tsimaneと比較して減弱しているが、米国より高い",
      reactivityFr: "Atténuée par rapport aux Tsimane mais plus élevée qu'aux États-Unis",
      reactivityKo: "Tsimane에 비해 약화되었으나 미국보다 높음",
      implicationEn: "Dose-response gradient: EMF exposure level predicts testosterone trajectory. Same ancestry, same subsistence base, different technology → different T-aging pattern.",
      implicationFi: "Annos-vastegradientti: EMF-altistustaso ennustaa testosteronitrajektoriaa. Sama esi-isällinen tausta, sama elinkeinopohja, eri teknologia → eri T-ikääntymismalli.",
      implicationJa: "用量反応勾配：EMF曝露レベルがテストステロンの軌跡を予測する。同じ祖先、同じ生業基盤、異なる技術 → 異なるT加齢パターン。",
      implicationFr: "Gradient dose-réponse : le niveau d'exposition aux CEM prédit la trajectoire de la testostérone. Même ascendance, même base de subsistance, technologie différente → schéma de vieillissement-T différent.",
      implicationKo: "용량-반응 구배: EMF 노출 수준이 테스토스테론 궤적을 예측. 동일한 조상, 동일한 생계 기반, 다른 기술 → 다른 T 노화 패턴.",
      source: "Trumble et al. 2012 (comparative); Gurven et al. 2009",
    },
    health: {
      tfr: "?",
      cvd: "Low",
      dementia: "Intermediate",
      obesity: "<5%",
      t2d: "?",
      cancer: "?",
      depression: "?",
    },
    referenceIds: ["alz-dem-2022-tsimane-dementia", "pnas-2025-tsimane-moseten-brain"],
  },
  {
    id: "amish",
    nameEn: "Old Order Amish",
    nameFi: "Vanhan järjestyksen amissit",
    nameJa: "旧秩序アーミッシュ",
    nameFr: "Amish de l'Ancien Ordre",
    nameKo: "구파 아미시",
    location: "USA (Ohio, Pennsylvania)",
    lat: 40.5,
    lon: -81.1,
    emfLevel: "ambient",
    emfLabelEn: "Ambient only",
    emfLabelFi: "Vain ympäristö",
    emfLabelJa: "環境のみ",
    emfLabelFr: "Ambiant uniquement",
    emfLabelKo: "주변만",
    descriptionEn: "No phones, no smartphones, limited electricity. Surrounded by modern infrastructure but refuse personal technology. TFR has declined slightly (6.9 → 6.1, 1924–2014). Amish = zero technology layers. Their health profile resembles pre-electrification statistics from the early 1900s. An Amish man who moves to the city begins to gain weight and experience testosterone decline within ~2–5 years as ELF-priming progresses.",
    descriptionFi: "Ei puhelimia, ei älypuhelimia, rajoitettu sähkö. Modernin infrastruktuurin ympäröimiä mutta kieltäytyvät henkilökohtaisesta teknologiasta. TFR laskenut lievästi (6,9 → 6,1, 1924–2014). Amissit = nolla teknologiakerrosta. Heidän terveysprofiili muistuttaa sähköistystä edeltävien 1900-luvun alun tilastoja. Amissi, joka muuttaa kaupunkiin, alkaa lihoa ja kokea testosteronin laskua ~2–5 vuodessa ELF-primauksen edetessä.",
    descriptionJa: "電話なし、スマートフォンなし、限定的な電気使用。現代のインフラに囲まれているが個人の技術を拒否。TFRはわずかに低下（6.9→6.1、1924〜2014年）。アーミッシュ＝技術レイヤーゼロ。健康プロファイルは1900年代初頭の電化以前の統計に類似。都市に移住したアーミッシュの男性は、ELFプライミングが進行するにつれ約2〜5年で体重増加とテストステロン低下を経験し始める。",
    descriptionFr: "Pas de téléphones, pas de smartphones, électricité limitée. Entourés d'infrastructure moderne mais refusent la technologie personnelle. Le TFR a légèrement baissé (6,9 → 6,1, 1924–2014). Amish = zéro couche technologique. Leur profil de santé ressemble aux statistiques d'avant l'électrification du début des années 1900. Un homme amish qui déménage en ville commence à prendre du poids et à connaître un déclin de testostérone en ~2–5 ans à mesure que l'amorçage ELF progresse.",
    descriptionKo: "전화 없음, 스마트폰 없음, 제한적 전기 사용. 현대 인프라에 둘러싸여 있지만 개인 기술을 거부. TFR이 약간 감소(6.9→6.1, 1924-2014). 아미시 = 기술 레이어 제로. 건강 프로파일은 1900년대 초 전기화 이전 통계와 유사. 도시로 이주한 아미시 남성은 ELF 프라이밍이 진행됨에 따라 약 2-5년 내에 체중 증가와 테스토스테론 감소를 경험하기 시작.",
    keyFindingEn: "TFR 6.1 (vs US 1.66). Cancer ~60% of US rates. Depression <1%. Allergic sensitization 7.2% (vs 44%).",
    keyFindingFi: "TFR 6,1 (vs USA 1,66). Syöpä ~60 % USA:n tasosta. Masennus <1 %. Allerginen herkistyminen 7,2 % (vs 44 %).",
    keyFindingJa: "TFR 6.1（米国1.66対比）。がん率は米国の約60%。うつ病1%未満。アレルギー感作7.2%（44%対比）。",
    keyFindingFr: "TFR 6,1 (vs USA 1,66). Cancer ~60 % des taux américains. Dépression <1 %. Sensibilisation allergique 7,2 % (vs 44 %).",
    keyFindingKo: "TFR 6.1 (미국 1.66 대비). 암 발생률 미국의 약 60%. 우울증 1% 미만. 알레르기 감작 7.2% (44% 대비).",
    health: {
      tfr: "6.1",
      cvd: "Low",
      dementia: "?",
      obesity: "Low",
      t2d: "Low",
      cancer: "~60% of US",
      depression: "<1%",
    },
    referenceIds: ["amish-fertility-demogr-res-2025", "amish-cancer-westman-2010", "amish-depression-cross-2007"],
  },
  {
    id: "mennonite",
    nameEn: "Traditional Mennonite",
    nameFi: "Perinteiset mennoniitit",
    nameJa: "伝統的メノナイト",
    nameFr: "Mennonites traditionnels",
    nameKo: "전통 메노나이트",
    location: "USA / Canada",
    lat: 43.0,
    lon: -80.5,
    emfLevel: "minimal",
    emfLabelEn: "Low",
    emfLabelFi: "Matala",
    emfLabelJa: "低",
    emfLabelFr: "Faible",
    emfLabelKo: "낮음",
    descriptionEn: "Similar to Amish but with somewhat more technology adoption. Limited electricity and phone use.",
    descriptionFi: "Samanlaisia kuin amissit mutta hieman enemmän teknologian omaksumista. Rajoitettu sähkö- ja puhelinkäyttö.",
    descriptionJa: "アーミッシュに似ているが、やや多くの技術を採用。限定的な電気と電話の使用。",
    descriptionFr: "Similaires aux Amish mais avec une adoption technologique un peu plus importante. Utilisation limitée de l'électricité et du téléphone.",
    descriptionKo: "아미시와 유사하지만 다소 더 많은 기술 채택. 제한적 전기 및 전화 사용.",
    keyFindingEn: "TFR 4-5. Low chronic disease rates across measured categories.",
    keyFindingFi: "TFR 4–5. Matala kroonisten sairauksien esiintyvyys mitatuissa kategorioissa.",
    keyFindingJa: "TFR 4〜5。測定されたカテゴリー全体で低い慢性疾患率。",
    keyFindingFr: "TFR 4–5. Faibles taux de maladies chroniques dans toutes les catégories mesurées.",
    keyFindingKo: "TFR 4-5. 측정된 범주 전반에 걸쳐 낮은 만성 질환율.",
    health: {
      tfr: "4–5",
      cvd: "Low",
      dementia: "?",
      obesity: "Low",
      t2d: "Low",
      cancer: "?",
      depression: "?",
    },
    referenceIds: [],
  },
];

export const MODERN_COMPARISONS: ModernComparison[] = [
  {
    id: "usa",
    nameEn: "Modern USA",
    nameFi: "Moderni USA",
    nameJa: "現代アメリカ",
    nameFr: "États-Unis modernes",
    nameKo: "현대 미국",
    emfLabelEn: "High",
    emfLabelFi: "Korkea",
    emfLabelJa: "高",
    emfLabelFr: "Élevé",
    emfLabelKo: "높음",
    health: {
      tfr: "1.66",
      cvd: "High",
      dementia: "8–11%",
      obesity: "42%",
      t2d: "11.6%",
      cancer: "100% (ref)",
      depression: "~8%",
    },
  },
  {
    id: "south-korea",
    nameEn: "South Korea",
    nameFi: "Etelä-Korea",
    nameJa: "韓国",
    nameFr: "Corée du Sud",
    nameKo: "대한민국",
    emfLabelEn: "Very high",
    emfLabelFi: "Erittäin korkea",
    emfLabelJa: "非常に高い",
    emfLabelFr: "Très élevé",
    emfLabelKo: "매우 높음",
    health: {
      tfr: "0.72",
      cvd: "Moderate",
      dementia: "10+%",
      obesity: "High",
      t2d: "High",
      cancer: "High",
      depression: "High",
    },
  },
];

export const CASCADE_COMPARISON = [
  { cascadeEn: "Sleep", cascadeFi: "Uni", cascadeJa: "睡眠", cascadeFr: "Sommeil", cascadeKo: "수면", lowEmf: "Better", modern: "Disorders ↑", bermPredicts: "EMF→Cav3.3→spindle disruption", confirmed: true },
  { cascadeEn: "Depression", cascadeFi: "Masennus", cascadeJa: "うつ病", cascadeFr: "Dépression", cascadeKo: "우울증", lowEmf: "<1% (Amish)", modern: "~8%", bermPredicts: "CACNA1C oscillation", confirmed: true },
  { cascadeEn: "ADHD/Autism", cascadeFi: "ADHD/Autismi", cascadeJa: "ADHD/自閉症", cascadeFr: "TDAH/Autisme", cascadeKo: "ADHD/자폐증", lowEmf: "~1:10000 (Amish)", modern: "1:36", bermPredicts: "VGCC synaptogenesis", confirmed: true },
  { cascadeEn: "T2D", cascadeFi: "T2D", cascadeJa: "2型糖尿病", cascadeFr: "Diabète de type 2", cascadeKo: "2형 당뇨병", lowEmf: "0–2% / absent", modern: "11.6%", bermPredicts: "β-cell Cav→insulin", confirmed: true },
  { cascadeEn: "Autoimmune", cascadeFi: "Autoimmuuni", cascadeJa: "自己免疫", cascadeFr: "Auto-immune", cascadeKo: "자가면역", lowEmf: "7.2% allergy (Amish)", modern: "44%", bermPredicts: "Ca²⁺-NFAT", confirmed: true },
  { cascadeEn: "Fertility", cascadeFi: "Hedelmällisyys", cascadeJa: "生殖能力", cascadeFr: "Fertilité", cascadeKo: "생식력", lowEmf: "TFR 6–9", modern: "TFR 0.72–1.66", bermPredicts: "Cav3→StAR→T", confirmed: true },
  { cascadeEn: "Cancer", cascadeFi: "Syöpä", cascadeJa: "がん", cascadeFr: "Cancer", cascadeKo: "암", lowEmf: "~60% (Amish)", modern: "100% (ref)", bermPredicts: "VGCC/Ca²⁺/ROS", confirmed: true },
  { cascadeEn: "Alzheimer's", cascadeFi: "Alzheimer", cascadeJa: "アルツハイマー病", cascadeFr: "Alzheimer", cascadeKo: "알츠하이머", lowEmf: "1.2% (Tsimane)", modern: "8–11%", bermPredicts: "Cav3.2→hippocampus", confirmed: true },
  { cascadeEn: "Myopia", cascadeFi: "Likitaitteisuus", cascadeJa: "近視", cascadeFr: "Myopie", cascadeKo: "근시", lowEmf: "1–3% (Africa)", modern: "80–95% (East Asia)", bermPredicts: "DA/VGCC+CRY", confirmed: true },
  { cascadeEn: "Autoimmune (trend)", cascadeFi: "Autoimmuuni (trendi)", cascadeJa: "自己免疫（傾向）", cascadeFr: "Auto-immune (tendance)", cascadeKo: "자가면역 (추세)", lowEmf: "Rare", modern: "+19.1%/yr", bermPredicts: "Ca²⁺-NFAT", confirmed: true },
  { cascadeEn: "Tinnitus", cascadeFi: "Tinnitus", cascadeJa: "耳鳴り", cascadeFr: "Acouphènes", cascadeKo: "이명", lowEmf: "?", modern: "17.7% (youth)", bermPredicts: "Cav1.3→IHC", confirmed: null },
  { cascadeEn: "Migraine", cascadeFi: "Migreeni", cascadeJa: "片頭痛", cascadeFr: "Migraine", cascadeKo: "편두통", lowEmf: "?", modern: "Common", bermPredicts: "CACNA1A/1I", confirmed: null },
  { cascadeEn: "Chronic pain", cascadeFi: "Kroon. kipu", cascadeJa: "慢性疼痛", cascadeFr: "Douleur chronique", cascadeKo: "만성 통증", lowEmf: "?", modern: "Epidemic", bermPredicts: "Cav3.2→DRG", confirmed: null },
  { cascadeEn: "PCOS", cascadeFi: "PCOS", cascadeJa: "多嚢胞性卵巣症候群", cascadeFr: "SOPK", cascadeKo: "다낭성 난소 증후군", lowEmf: "?", modern: "5–20%", bermPredicts: "4-organ convergence", confirmed: null },
  { cascadeEn: "Cardiac arrhythmia", cascadeFi: "Sydänarytmia", cascadeJa: "心不整脈", cascadeFr: "Arythmie cardiaque", cascadeKo: "심부정맥", lowEmf: "Rare", modern: "Common", bermPredicts: "Cav1.2→QT", confirmed: true },
  { cascadeEn: "Neurodevelopment", cascadeFi: "Neurokehitys", cascadeJa: "神経発達", cascadeFr: "Neurodéveloppement", cascadeKo: "신경발달", lowEmf: "?", modern: "GD ↑↑", bermPredicts: "7 channels", confirmed: null },
];

export const MYOPIA_GRADIENT = [
  { regionEn: "Rural Africa", regionFi: "Maaseutu-Afrikka", regionJa: "農村アフリカ", regionFr: "Afrique rurale", regionKo: "농촌 아프리카", prevalence: "1.4–11.4%", techLevel: 1 },
  { regionEn: "Latin America", regionFi: "Latinalainen Amerikka", regionJa: "ラテンアメリカ", regionFr: "Amérique latine", regionKo: "라틴아메리카", prevalence: "1.4–14.4%", techLevel: 2 },
  { regionEn: "Europe (youth)", regionFi: "Eurooppa (nuoret)", regionJa: "ヨーロッパ（若年層）", regionFr: "Europe (jeunes)", regionKo: "유럽 (청소년)", prevalence: "17–36%", techLevel: 3 },
  { regionEn: "USA (youth)", regionFi: "USA (nuoret)", regionJa: "アメリカ（若年層）", regionFr: "États-Unis (jeunes)", regionKo: "미국 (청소년)", prevalence: "~50%", techLevel: 4 },
  { regionEn: "East Asia (youth)", regionFi: "Itä-Aasia (nuoret)", regionJa: "東アジア（若年層）", regionFr: "Asie de l'Est (jeunes)", regionKo: "동아시아 (청소년)", prevalence: "80–95%", techLevel: 5 },
];
