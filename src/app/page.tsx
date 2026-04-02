"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import StageCard from "@/components/StageCard";
import { STAGES } from "@/data/stages";
import { useGameStore } from "@/store/gameStore";
import { signOut } from "@/lib/auth";

export default function Home() {
  const router = useRouter();
  const { unlockedStages, stageResults, nickname, userId, clearUser } =
    useGameStore();

  const totalScore = stageResults.reduce((sum, r) => sum + r.score, 0);
  const completedCount = stageResults.filter(
    (r, i) => r.score >= (STAGES[i]?.passingScore ?? 70)
  ).length;

  const handleStageSelect = (stageId: number) => {
    if (!userId) {
      router.push("/login");
      return;
    }
    if (!unlockedStages.includes(stageId)) {
      alert("이전 스테이지를 먼저 클리어해주세요!");
      return;
    }
    router.push(`/stage/${stageId}`);
  };

  const handleLogout = async () => {
    await signOut();
    clearUser();
    window.location.reload();
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950">
      {/* Auth bar */}
      <div className="flex justify-end px-6 pt-4">
        {userId ? (
          <div className="flex items-center gap-3">
            <span className="text-sm text-slate-400">
              <span className="text-white font-medium">{nickname}</span> 님
            </span>
            <button
              onClick={handleLogout}
              className="text-xs text-slate-500 hover:text-red-400 transition-colors border border-slate-700 px-3 py-1 rounded-full hover:border-red-500"
            >
              로그아웃
            </button>
          </div>
        ) : (
          <button
            onClick={() => router.push("/login")}
            className="text-sm text-slate-300 hover:text-white border border-slate-700 hover:border-blue-500 px-4 py-1.5 rounded-full transition-colors"
          >
            로그인
          </button>
        )}
      </div>

      {/* Header */}
      <header className="px-6 py-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-red-500 to-amber-500 mb-2">
            🔥 Beat the Heat
          </h1>
          <p className="text-slate-400 text-sm md:text-base">
            당신은 현재 화재 상황에서 얼마나 올바른 판단을 내릴 수 있나요?
          </p>
        </motion.div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-6 flex justify-center gap-4 flex-wrap"
        >
          <div className="bg-slate-800/60 px-4 py-2 rounded-full border border-slate-700">
            <span className="text-slate-400 text-xs">완료</span>{" "}
            <span className="text-white font-bold">
              {completedCount}/{STAGES.length}
            </span>
          </div>
          <div className="bg-slate-800/60 px-4 py-2 rounded-full border border-slate-700">
            <span className="text-slate-400 text-xs">총점</span>{" "}
            <span className="text-amber-400 font-bold">{totalScore}</span>
          </div>
          <button
            onClick={() => router.push("/results")}
            className="bg-slate-800/60 px-4 py-2 rounded-full border border-slate-700 hover:border-blue-500 transition-colors text-sm text-slate-300 hover:text-white"
          >
            📊 나의 결과
          </button>
          <button
            onClick={() => router.push("/leaderboard")}
            className="bg-slate-800/60 px-4 py-2 rounded-full border border-slate-700 hover:border-amber-500 transition-colors text-sm text-slate-300 hover:text-white"
          >
            🏆 랭킹
          </button>
        </motion.div>
      </header>

      {/* Stage Grid */}
      <main className="flex-1 px-4 md:px-8 pb-12 max-w-4xl mx-auto w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {STAGES.map((stage, index) => (
            <motion.div
              key={stage.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <StageCard
                stage={stage}
                isUnlocked={unlockedStages.includes(stage.id)}
                result={stageResults.find((r) => r.stageId === stage.id)}
                onSelect={handleStageSelect}
              />
            </motion.div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center py-6 text-slate-600 text-xs">
        Beat the Heat | 화재 대응 시뮬레이션
      </footer>
    </div>
  );
}
