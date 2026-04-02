"use client";

import { create } from "zustand";

export interface StageResult {
  stageId: number;
  score: number;
  survivalRate: number;
  timeSpent: number;
  completedAt: string;
}

interface GameState {
  // User
  userId: string | null;
  nickname: string;

  // Stage progress
  currentStageId: number;
  unlockedStages: number[];
  stageResults: StageResult[];

  // In-game state
  score: number;
  survivalRate: number;
  currentStep: number;
  timeRemaining: number;
  isTimerRunning: boolean;
  selectedChoices: Record<string, string>;

  // Actions
  setUser: (userId: string, nickname: string) => void;
  clearUser: () => void;
  unlockStage: (stageId: number) => void;
  setCurrentStage: (stageId: number) => void;
  updateScore: (delta: number) => void;
  updateSurvivalRate: (delta: number) => void;
  setStep: (step: number) => void;
  setTimeRemaining: (time: number) => void;
  setTimerRunning: (running: boolean) => void;
  recordChoice: (stepKey: string, choiceId: string) => void;
  completeStage: (result: StageResult) => void;
  resetGameState: () => void;
  loadProgress: (unlockedStages: number[], results: StageResult[]) => void;
}

const INITIAL_GAME_STATE = {
  score: 0,
  survivalRate: 100,
  currentStep: 0,
  timeRemaining: 0,
  isTimerRunning: false,
  selectedChoices: {},
};

export const useGameStore = create<GameState>((set) => ({
  userId: null,
  nickname: "",
  currentStageId: 1,
  unlockedStages: [],
  stageResults: [],
  ...INITIAL_GAME_STATE,

  setUser: (userId, nickname) => set({ userId, nickname }),
  clearUser: () => set({ userId: null, nickname: "" }),

  unlockStage: (stageId) =>
    set((state) => ({
      unlockedStages: state.unlockedStages.includes(stageId)
        ? state.unlockedStages
        : [...state.unlockedStages, stageId],
    })),

  setCurrentStage: (stageId) => set({ currentStageId: stageId }),

  updateScore: (delta) =>
    set((state) => ({ score: Math.max(0, state.score + delta) })),

  updateSurvivalRate: (delta) =>
    set((state) => ({
      survivalRate: Math.max(0, Math.min(100, state.survivalRate + delta)),
    })),

  setStep: (step) => set({ currentStep: step }),

  setTimeRemaining: (time) => set({ timeRemaining: time }),

  setTimerRunning: (running) => set({ isTimerRunning: running }),

  recordChoice: (stepKey, choiceId) =>
    set((state) => ({
      selectedChoices: { ...state.selectedChoices, [stepKey]: choiceId },
    })),

  completeStage: (result) =>
    set((state) => ({
      stageResults: [
        ...state.stageResults.filter((r) => r.stageId !== result.stageId),
        result,
      ],
    })),

  resetGameState: () => set(INITIAL_GAME_STATE),

  loadProgress: (unlockedStages, results) =>
    set({ unlockedStages, stageResults: results }),
}));
