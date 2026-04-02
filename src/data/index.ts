import { StageData } from "./types";
import { stage1 } from "./stage1";
import { stage2 } from "./stage2";
import { stage3 } from "./stage3";
import { stage4 } from "./stage4";
import { stage5 } from "./stage5";
import { stage6 } from "./stage6";

const stageMap: Record<number, StageData> = {
  1: stage1,
  2: stage2,
  3: stage3,
  4: stage4,
  5: stage5,
  6: stage6,
};

export function getStageData(id: number): StageData | undefined {
  return stageMap[id];
}

export { STAGES } from "./stages";
export type { StageData, StageInfo, ScenarioStep, ChoiceStep, MissionStep, Choice } from "./types";
