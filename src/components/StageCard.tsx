"use client";

import { motion } from "framer-motion";
import { StageInfo } from "@/data/types";
import { StageResult } from "@/store/gameStore";

interface StageCardProps {
  stage: StageInfo;
  isUnlocked: boolean;
  result?: StageResult;
  onSelect: (stageId: number) => void;
}

export default function StageCard({
  stage,
  isUnlocked,
  result,
  onSelect,
}: StageCardProps) {
  const isCompleted = result && result.score >= stage.passingScore;

  return (
    <motion.button
      whileHover={isUnlocked ? { scale: 1.03, y: -4 } : {}}
      whileTap={isUnlocked ? { scale: 0.98 } : {}}
      onClick={() => onSelect(stage.id)}
      className={`relative w-full rounded-2xl p-6 text-left transition-all duration-300 ${
        isUnlocked
          ? `bg-gradient-to-br ${stage.bgColor} shadow-lg hover:shadow-xl cursor-pointer`
          : "bg-slate-800/60 cursor-not-allowed opacity-60"
      }`}
    >
      {/* Lock overlay */}
      {!isUnlocked && (
        <div className="absolute inset-0 flex items-center justify-center rounded-2xl bg-black/40 backdrop-blur-sm">
          <span className="text-4xl">🔒</span>
        </div>
      )}

      {/* Completion badge */}
      {isCompleted && (
        <div className="absolute -top-2 -right-2 w-10 h-10 bg-green-500 rounded-full flex items-center justify-center shadow-lg border-2 border-white">
          <span className="text-white text-lg">&#10003;</span>
        </div>
      )}

      <div className="flex items-start gap-4">
        <div className="text-4xl flex-shrink-0">{stage.icon}</div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-semibold uppercase tracking-wider text-white/70">
              Stage {stage.id}
            </span>
            {result && (
              <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full">
                {result.score}점
              </span>
            )}
          </div>
          <h3 className="text-lg font-bold text-white mb-1 truncate">
            {stage.title}
          </h3>
          <p className="text-sm text-white/70 mb-3 line-clamp-2">
            {stage.location}
          </p>
          <p className="text-xs text-white/60 line-clamp-2">
            {stage.description}
          </p>
        </div>
      </div>

      {/* Progress bar for completed stages */}
      {result && (
        <div className="mt-4">
          <div className="flex justify-between text-xs text-white/70 mb-1">
            <span>점수</span>
            <span>{result.score}%</span>
          </div>
          <div className="w-full bg-black/20 rounded-full h-2">
            <div
              className={`h-2 rounded-full transition-all duration-500 ${
                isCompleted ? "bg-green-400" : "bg-yellow-400"
              }`}
              style={{ width: `${Math.min(result.score, 100)}%` }}
            />
          </div>
        </div>
      )}
    </motion.button>
  );
}
