/**
 * Typed access to the modulome state model.
 *
 * Every number in this module is computed by `berm/export_modulome.py` from
 * `berm.modulome` and written to `data/modulome-state.json`.
 * `berm/tests/test_modulome_site_sync.py` fails when the file drifts from the
 * model, so a figure on the site cannot quietly disagree with the model that
 * produced it. Regenerate with `python3 berm/export_modulome.py`.
 */
import payload from "@/data/modulome-state.json";

export interface LocalisedText {
  readonly en: string;
  readonly fi: string;
}

export const CARD_FIELD_ORDER = [
  "exposure",
  "receptor",
  "baselineState",
  "proximalResponse",
  "propagation",
  "memory",
  "functionalConsequence",
  "mechanismBounding",
] as const;

export type CardFieldKey =
  | "exposure"
  | "receptor"
  | "baseline_state"
  | "proximal_response"
  | "propagation"
  | "memory"
  | "functional_consequence"
  | "mechanism_bounding";

export interface MechanismCard {
  readonly cardId: string;
  readonly title: LocalisedText;
  readonly layers: readonly number[];
  readonly referenceIds: readonly string[];
  readonly epistemicLevel: string;
  readonly implementingModules: readonly string[];
  readonly exposure: LocalisedText;
  readonly receptor: LocalisedText;
  readonly baseline_state: LocalisedText;
  readonly proximal_response: LocalisedText;
  readonly propagation: LocalisedText;
  readonly memory: LocalisedText;
  readonly functional_consequence: LocalisedText;
  readonly mechanism_bounding: LocalisedText;
}

export interface StateTriadFigure {
  readonly parameterIds: readonly string[];
  readonly calibrationStatus: string;
  readonly exposureSchedule: readonly number[];
  readonly series: {
    readonly receptorReadiness: readonly number[];
    readonly repairCapacity: readonly number[];
    readonly damageLoad: readonly number[];
    readonly probeResponse: readonly number[];
  };
  readonly sameResponseDifferentState: readonly {
    readonly stateId: string;
    readonly receptorReadiness: number;
    readonly repairCapacity: number;
    readonly damageLoad: number;
    readonly probeResponse: number;
  }[];
  readonly discriminatingMeasurements: readonly string[];
}

export interface CalciumArm {
  readonly cytosol: readonly number[];
  readonly erStore: readonly number[];
  readonly mitochondrial: readonly number[];
  readonly summary: {
    readonly firstCalciumResponse: number;
    readonly timeToFirstPeakS: number;
    readonly storeChange: number;
    readonly mitochondrialResponse: number;
    readonly cumulativeStoreCycling: number;
    readonly lateMembraneCurrentChange: number;
  };
}

export interface CalciumFigure {
  readonly parameterIds: readonly string[];
  readonly dtSeconds: number;
  readonly exposureSteps: number;
  readonly timesSeconds: readonly number[];
  readonly arms: Record<string, CalciumArm>;
  readonly sameChannelDifferentStore: readonly {
    readonly label: string;
    readonly erLoad: number;
    readonly firstCalciumResponse: number;
    readonly lateMembraneCurrentChange: number;
  }[];
}

export interface WindowFigure {
  readonly parameterIds: readonly string[];
  readonly frequenciesHz: readonly number[];
  readonly lockedWindow: {
    readonly windowId: string;
    readonly centreHz: number;
    readonly sigmaHz: number;
    readonly responsePower: number;
    readonly weights: readonly number[];
  };
  readonly driver: {
    readonly driverId: string;
    readonly provenance: string;
    readonly totalPower: number;
    readonly bins: readonly {
      readonly frequencyHz: number;
      readonly powerDensity: number;
      readonly bandwidthHz: number;
    }[];
  };
  readonly candidates: readonly {
    readonly stateId: string;
    readonly centreHz: number;
    readonly sigmaHz: number;
    readonly responsePower: number;
    readonly ratioToLocked: number;
    readonly weights: readonly number[];
    readonly measurements: Record<string, number>;
  }[];
}

export interface PhotonSequenceFigure {
  readonly identityKey: string;
  readonly parameterIds: readonly string[];
  readonly totalDose: number;
  readonly delaysSeconds: readonly number[];
  readonly blueThenGreen: readonly number[];
  readonly greenThenBlue: readonly number[];
  readonly registeredSubtypes: readonly string[];
}

export interface PolarityFigure {
  readonly fieldsMvPerMm: readonly number[];
  readonly screenFieldMvPerMm: number;
  readonly arms: Record<
    string,
    {
      readonly directedness: readonly number[];
      readonly migrationSpeed: readonly number[];
      readonly directionalError: readonly number[];
    }
  >;
}

export interface FeedbackFigure {
  readonly parameterIds: readonly string[];
  readonly base: {
    readonly a: number;
    readonly b: number;
    readonly c: number;
    readonly d: number;
    readonly rX: number;
    readonly rY: number;
    readonly xLabel: string;
    readonly yLabel: string;
  };
  readonly gainFactors: readonly number[];
  readonly recoveryFactors: readonly number[];
  readonly series: readonly {
    readonly mutualGainProduct: number;
    readonly recoveryProduct: number;
    readonly stabilityMargin: number;
    readonly isStable: boolean;
    readonly slowestRecoveryTime: number | null;
  }[];
  readonly irreversibilityNote: string;
}

export interface ModulomeStateModel {
  readonly modulomeVersion: string;
  readonly generatedBy: string;
  readonly cardFields: readonly string[];
  readonly cards: readonly MechanismCard[];
  readonly figures: {
    readonly stateTriad: StateTriadFigure;
    readonly calcium: CalciumFigure;
    readonly window: WindowFigure;
    readonly photonSequence: PhotonSequenceFigure;
    readonly polarity: PolarityFigure;
    readonly feedback: FeedbackFigure;
  };
}

export const MODULOME_STATE = payload as unknown as ModulomeStateModel;
export const MECHANISM_CARDS = MODULOME_STATE.cards;
export const MODULOME_FIGURES = MODULOME_STATE.figures;

/** English for every locale that has no Finnish-or-English text of its own. */
export function pickCardText(text: LocalisedText, locale: string): string {
  return locale === "fi" && text.fi ? text.fi : text.en;
}

export function cardsForLayer(layer: number): readonly MechanismCard[] {
  return MECHANISM_CARDS.filter((card) => card.layers.includes(layer));
}
