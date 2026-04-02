export interface Choice {
  id: string;
  text: string;
  isCorrect: boolean;
  scoreDelta: number;
  survivalDelta: number;
  feedback: string;
}

export interface MissionStep {
  type: "mission";
  id: string;
  title: string;
  description: string;
  instruction: string;
  missionType: "order" | "click" | "drag";
  items: string[];
  correctOrder?: string[];
  correctAnswer?: string;
  timeLimit?: number;
  scoreReward: number;
  survivalDelta: number;
  failFeedback: string;
  successFeedback: string;
}

export interface ChoiceStep {
  type: "choice";
  id: string;
  title: string;
  description: string;
  situation: string;
  illustration: string;
  choices: Choice[];
  timeLimit?: number;
}

export type ScenarioStep = ChoiceStep | MissionStep;

export interface StageData {
  id: number;
  title: string;
  location: string;
  description: string;
  icon: string;
  bgColor: string;
  steps: ScenarioStep[];
  passingScore: number;
}

export interface StageInfo {
  id: number;
  title: string;
  location: string;
  description: string;
  icon: string;
  bgColor: string;
  stepCount: number;
  passingScore: number;
}
