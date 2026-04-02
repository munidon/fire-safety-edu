"use client";

import { motion } from "framer-motion";
import { StageData } from "@/data/types";

interface StageCompleteProps {
  stage: StageData;
  score: number;
  survivalRate: number;
  onRetry: () => void;
  onGoHome: () => void;
}

export default function StageComplete({
  stage,
  score,
  survivalRate,
  onRetry,
  onGoHome,
}: StageCompleteProps) {
  const passed = score >= stage.passingScore;
  const maxScore = stage.steps.reduce((acc, step) => {
    if (step.type === "choice") {
      const maxChoice = Math.max(...step.choices.map((c) => c.scoreDelta));
      return acc + maxChoice;
    }
    return acc + step.scoreReward;
  }, 0);
  const percentage = Math.round((score / maxScore) * 100);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="w-full max-w-lg mx-auto text-center"
    >
      {/* Result icon */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
        className="text-7xl mb-6"
      >
        {passed ? "🎉" : "😥"}
      </motion.div>

      <h2 className="text-2xl font-bold text-white mb-2">
        {passed ? "스테이지 클리어!" : "아쉽게 실패..."}
      </h2>
      <p className="text-slate-400 mb-8">
        {passed
          ? "훌륭한 판단력을 보여주셨습니다!"
          : `${stage.passingScore}% 이상 달성해야 다음 스테이지가 해금됩니다.`}
      </p>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="bg-slate-800 rounded-xl p-5 border border-slate-700">
          <div className="text-3xl font-bold text-blue-400 mb-1">
            {score}
          </div>
          <div className="text-xs text-slate-500">획득 점수</div>
          <div className="text-xs text-slate-600 mt-1">/ {maxScore}점</div>
        </div>
        <div className="bg-slate-800 rounded-xl p-5 border border-slate-700">
          <div
            className={`text-3xl font-bold mb-1 ${
              survivalRate >= 70
                ? "text-green-400"
                : survivalRate >= 40
                  ? "text-yellow-400"
                  : "text-red-400"
            }`}
          >
            {survivalRate}%
          </div>
          <div className="text-xs text-slate-500">생존률</div>
        </div>
        <div className="bg-slate-800 rounded-xl p-5 border border-slate-700">
          <div className="text-3xl font-bold text-purple-400 mb-1">
            {percentage}%
          </div>
          <div className="text-xs text-slate-500">달성률</div>
        </div>
        <div className="bg-slate-800 rounded-xl p-5 border border-slate-700">
          <div className="text-3xl font-bold text-amber-400 mb-1">
            {passed ? "PASS" : "FAIL"}
          </div>
          <div className="text-xs text-slate-500">
            기준: {stage.passingScore}%
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        <button
          onClick={onRetry}
          className="flex-1 py-3 bg-slate-700 hover:bg-slate-600 text-white font-bold rounded-xl transition-colors"
        >
          다시 도전
        </button>
        <button
          onClick={onGoHome}
          className={`flex-1 py-3 font-bold rounded-xl transition-colors ${
            passed
              ? "bg-blue-600 hover:bg-blue-700 text-white"
              : "bg-slate-700 hover:bg-slate-600 text-white"
          }`}
        >
          {passed ? "다음 스테이지" : "스테이지 선택"}
        </button>
      </div>
    </motion.div>
  );
}
