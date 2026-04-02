"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useGameStore } from "@/store/gameStore";
import { STAGES } from "@/data/stages";

export default function ResultsPage() {
  const router = useRouter();
  const { stageResults, unlockedStages } = useGameStore();

  const totalMaxStages = STAGES.length;
  const completedStages = stageResults.filter((r) => {
    const stage = STAGES.find((s) => s.id === r.stageId);
    return stage && r.score >= stage.passingScore;
  });
  const totalScore = stageResults.reduce((sum, r) => sum + r.score, 0);
  const avgSurvival =
    stageResults.length > 0
      ? Math.round(
          stageResults.reduce((sum, r) => sum + r.survivalRate, 0) /
            stageResults.length
        )
      : 0;

  const getGrade = () => {
    const avgScore =
      stageResults.length > 0
        ? totalScore / stageResults.length
        : 0;
    if (avgScore >= 90) return { grade: "S", color: "text-yellow-400", label: "화재 대응 전문가" };
    if (avgScore >= 80) return { grade: "A", color: "text-green-400", label: "우수한 대응 능력" };
    if (avgScore >= 70) return { grade: "B", color: "text-blue-400", label: "기본 대응 가능" };
    if (avgScore >= 50) return { grade: "C", color: "text-orange-400", label: "추가 학습 필요" };
    return { grade: "D", color: "text-red-400", label: "기초부터 다시 학습" };
  };

  const gradeInfo = getGrade();

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 px-4 py-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => router.push("/")}
            className="text-slate-400 hover:text-white text-sm"
          >
            &#8592; 홈으로
          </button>
          <h1 className="text-xl font-bold text-white">나의 학습 결과</h1>
          <div />
        </div>

        {/* Overall Grade */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-slate-800/60 rounded-2xl p-8 border border-slate-700 text-center mb-8"
        >
          <div className="text-sm text-slate-400 mb-2">종합 등급</div>
          <div className={`text-7xl font-black ${gradeInfo.color} mb-2`}>
            {gradeInfo.grade}
          </div>
          <div className="text-slate-300 font-medium">{gradeInfo.label}</div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-3 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-slate-800/60 rounded-xl p-4 border border-slate-700 text-center"
          >
            <div className="text-2xl font-bold text-blue-400">
              {completedStages.length}/{totalMaxStages}
            </div>
            <div className="text-xs text-slate-500 mt-1">클리어</div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-slate-800/60 rounded-xl p-4 border border-slate-700 text-center"
          >
            <div className="text-2xl font-bold text-amber-400">
              {totalScore}
            </div>
            <div className="text-xs text-slate-500 mt-1">총점</div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-slate-800/60 rounded-xl p-4 border border-slate-700 text-center"
          >
            <div className={`text-2xl font-bold ${avgSurvival >= 70 ? "text-green-400" : avgSurvival >= 40 ? "text-yellow-400" : "text-red-400"}`}>
              {avgSurvival}%
            </div>
            <div className="text-xs text-slate-500 mt-1">평균 생존률</div>
          </motion.div>
        </div>

        {/* Stage Results */}
        <h2 className="text-lg font-bold text-white mb-4">스테이지별 결과</h2>
        <div className="space-y-3">
          {STAGES.map((stage, index) => {
            const result = stageResults.find((r) => r.stageId === stage.id);
            const isUnlocked = unlockedStages.includes(stage.id);
            const passed = result && result.score >= stage.passingScore;

            return (
              <motion.div
                key={stage.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className={`flex items-center gap-4 p-4 rounded-xl border ${
                  result
                    ? passed
                      ? "bg-green-900/20 border-green-800"
                      : "bg-red-900/20 border-red-800"
                    : isUnlocked
                      ? "bg-slate-800/40 border-slate-700"
                      : "bg-slate-800/20 border-slate-800 opacity-50"
                }`}
              >
                <span className="text-2xl">{stage.icon}</span>
                <div className="flex-1 min-w-0">
                  <div className="text-white font-medium text-sm truncate">
                    Stage {stage.id}: {stage.title}
                  </div>
                  <div className="text-xs text-slate-500">{stage.location}</div>
                </div>
                {result ? (
                  <div className="text-right flex-shrink-0">
                    <div className={`text-lg font-bold ${passed ? "text-green-400" : "text-red-400"}`}>
                      {result.score}%
                    </div>
                    <div className="text-xs text-slate-500">
                      생존 {result.survivalRate}%
                    </div>
                  </div>
                ) : (
                  <span className="text-slate-600 text-sm">
                    {isUnlocked ? "미도전" : "🔒"}
                  </span>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Action */}
        <div className="mt-8">
          <button
            onClick={() => router.push("/")}
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-colors"
          >
            스테이지 선택으로 돌아가기
          </button>
        </div>
      </div>
    </div>
  );
}
