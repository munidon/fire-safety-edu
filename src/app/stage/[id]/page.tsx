"use client";

import { useParams, useRouter } from "next/navigation";
import { useState, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getStageData } from "@/data";
import { Choice } from "@/data/types";
import { useGameStore } from "@/store/gameStore";
import { saveStageScore, unlockStageInDB } from "@/lib/database";
import ChoicePanel from "@/components/ChoicePanel";
import MissionPanel from "@/components/MissionPanel";
import SurvivalGauge from "@/components/SurvivalGauge";
import StageComplete from "@/components/StageComplete";

export default function StagePage() {
  const params = useParams();
  const router = useRouter();
  const stageId = Number(params.id);

  const {
    score,
    survivalRate,
    currentStep,
    updateScore,
    updateSurvivalRate,
    setStep,
    resetGameState,
    completeStage,
    unlockStage,
  } = useGameStore();

  const [isComplete, setIsComplete] = useState(false);
  const [finalScore, setFinalScore] = useState(0);
  const [finalSurvival, setFinalSurvival] = useState(100);

  const stageData = useMemo(() => getStageData(stageId), [stageId]);

  const handleChoiceComplete = useCallback(
    (choice: Choice) => {
      updateScore(choice.scoreDelta);
      updateSurvivalRate(choice.survivalDelta);

      if (stageData && currentStep + 1 >= stageData.steps.length) {
        const newScore = useGameStore.getState().score + choice.scoreDelta;
        const newSurvival =
          useGameStore.getState().survivalRate + choice.survivalDelta;
        finishStage(newScore, Math.max(0, Math.min(100, newSurvival)));
      } else {
        setStep(currentStep + 1);
      }
    },
    [currentStep, stageData, updateScore, updateSurvivalRate, setStep]
  );

  const handleMissionComplete = useCallback(
    (success: boolean) => {
      if (!stageData) return;
      const step = stageData.steps[currentStep];
      if (step.type !== "mission") return;

      if (success) {
        updateScore(step.scoreReward);
      } else {
        updateSurvivalRate(step.survivalDelta);
      }

      if (currentStep + 1 >= stageData.steps.length) {
        const state = useGameStore.getState();
        const newScore = success
          ? state.score + step.scoreReward
          : state.score;
        const newSurvival = success
          ? state.survivalRate
          : Math.max(0, state.survivalRate + step.survivalDelta);
        finishStage(newScore, newSurvival);
      } else {
        setStep(currentStep + 1);
      }
    },
    [currentStep, stageData, updateScore, updateSurvivalRate, setStep]
  );

  const finishStage = async (finalScoreVal: number, finalSurvivalVal: number) => {
    setFinalScore(finalScoreVal);
    setFinalSurvival(finalSurvivalVal);

    if (stageData) {
      const maxScore = stageData.steps.reduce((acc, s) => {
        if (s.type === "choice") {
          return acc + Math.max(...s.choices.map((c) => c.scoreDelta));
        }
        return acc + s.scoreReward;
      }, 0);
      const percentage = Math.round((finalScoreVal / maxScore) * 100);

      completeStage({
        stageId,
        score: percentage,
        survivalRate: finalSurvivalVal,
        timeSpent: 0,
        completedAt: new Date().toISOString(),
      });

      if (percentage >= stageData.passingScore) {
        unlockStage(stageId + 1);
      }

      // Save to Supabase if logged in
      const userId = useGameStore.getState().userId;
      if (userId) {
        await saveStageScore(userId, stageId, percentage, finalSurvivalVal, 0);
        if (percentage >= stageData.passingScore) {
          await unlockStageInDB(userId, stageId + 1);
        }
      }
    }

    setIsComplete(true);
  };

  const handleRetry = () => {
    resetGameState();
    setIsComplete(false);
    setFinalScore(0);
    setFinalSurvival(100);
  };

  const handleGoHome = () => {
    resetGameState();
    router.push("/");
  };

  if (!stageData) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-900">
        <div className="text-center">
          <div className="text-6xl mb-4">🚧</div>
          <h2 className="text-xl font-bold text-white mb-2">
            준비 중인 스테이지
          </h2>
          <p className="text-slate-400 mb-6">
            이 스테이지는 아직 개발 중입니다.
          </p>
          <button
            onClick={() => router.push("/")}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl"
          >
            돌아가기
          </button>
        </div>
      </div>
    );
  }

  const currentStepData = stageData.steps[currentStep];
  const progress = ((currentStep + 1) / stageData.steps.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 flex flex-col">
      {/* Top bar */}
      <header className="px-4 py-4 border-b border-slate-800">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-3">
            <button
              onClick={handleGoHome}
              className="text-slate-400 hover:text-white text-sm transition-colors"
            >
              &#8592; 나가기
            </button>
            <div className="flex items-center gap-2">
              <span className="text-2xl">{stageData.icon}</span>
              <span className="text-white font-bold text-sm">
                Stage {stageData.id}
              </span>
            </div>
            <div className="text-amber-400 font-bold text-sm">
              {useGameStore.getState().score}점
            </div>
          </div>

          {/* Progress bar */}
          <div className="w-full bg-slate-800 rounded-full h-2 mb-3">
            <motion.div
              className={`h-2 rounded-full bg-gradient-to-r ${stageData.bgColor}`}
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>

          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>
              {currentStep + 1} / {stageData.steps.length} 단계
            </span>
          </div>

          {/* Survival gauge */}
          <div className="mt-2">
            <SurvivalGauge rate={survivalRate} />
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 px-4 py-8 overflow-y-auto">
        <AnimatePresence mode="wait">
          {isComplete ? (
            <motion.div
              key="complete"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <StageComplete
                stage={stageData}
                score={finalScore}
                survivalRate={finalSurvival}
                onRetry={handleRetry}
                onGoHome={handleGoHome}
              />
            </motion.div>
          ) : currentStepData?.type === "choice" ? (
            <motion.div
              key={`choice-${currentStep}`}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
            >
              <ChoicePanel
                step={currentStepData}
                onComplete={handleChoiceComplete}
              />
            </motion.div>
          ) : currentStepData?.type === "mission" ? (
            <motion.div
              key={`mission-${currentStep}`}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
            >
              <MissionPanel
                step={currentStepData}
                onComplete={handleMissionComplete}
              />
            </motion.div>
          ) : null}
        </AnimatePresence>
      </main>
    </div>
  );
}
