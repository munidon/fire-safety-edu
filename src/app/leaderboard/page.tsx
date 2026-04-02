"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useGameStore } from "@/store/gameStore";
import { fetchLeaderboard } from "@/lib/database";

interface LeaderboardEntry {
  rank: number;
  nickname: string;
  totalScore: number;
  avgSurvival: number;
  stagesCompleted: number;
}

export default function LeaderboardPage() {
  const router = useRouter();
  const { stageResults, nickname } = useGameStore();
  const totalScore = stageResults.reduce((sum, r) => sum + r.score, 0);
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLeaderboard().then((data) => {
      setEntries(data);
      setLoading(false);
    });
  }, []);

  const getRankStyle = (rank: number) => {
    if (rank === 1) return "text-yellow-400 bg-yellow-900/30 border-yellow-700";
    if (rank === 2) return "text-slate-300 bg-slate-700/30 border-slate-600";
    if (rank === 3) return "text-amber-600 bg-amber-900/20 border-amber-800";
    return "text-slate-400 bg-slate-800/40 border-slate-700";
  };

  const getMedal = (rank: number) => {
    if (rank === 1) return "\uD83E\uDD47";
    if (rank === 2) return "\uD83E\uDD48";
    if (rank === 3) return "\uD83E\uDD49";
    return `${rank}`;
  };

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
          <h1 className="text-xl font-bold text-white">랭킹 보드</h1>
          <div />
        </div>

        {/* My Rank */}
        {totalScore > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-blue-900/30 rounded-2xl p-5 border border-blue-700 mb-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs text-blue-400 mb-1">나의 기록</div>
                <div className="text-white font-bold">
                  {nickname || "나"}
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-amber-400">
                  {totalScore}점
                </div>
                <div className="text-xs text-slate-400">
                  {stageResults.length}개 스테이지 완료
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Leaderboard */}
        {loading ? (
          <div className="text-center py-12 text-slate-500">
            랭킹을 불러오는 중...
          </div>
        ) : entries.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-4xl mb-4">🏆</div>
            <p className="text-slate-400">아직 랭킹 데이터가 없습니다.</p>
            <p className="text-slate-500 text-sm mt-1">
              로그인 후 스테이지를 클리어하면 랭킹에 등록됩니다!
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            {entries.map((entry, index) => (
              <motion.div
                key={`${entry.nickname}-${index}`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className={`flex items-center gap-4 p-4 rounded-xl border ${getRankStyle(entry.rank)}`}
              >
                <div className="w-10 text-center text-xl font-bold flex-shrink-0">
                  {getMedal(entry.rank)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-white font-medium text-sm truncate">
                    {entry.nickname}
                  </div>
                  <div className="text-xs text-slate-500">
                    평균 생존률 {entry.avgSurvival}% · {entry.stagesCompleted}개 클리어
                  </div>
                </div>
                <div className="text-right flex-shrink-0">
                  <div className="text-lg font-bold text-amber-400">
                    {entry.totalScore}
                  </div>
                  <div className="text-xs text-slate-500">점</div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        <div className="mt-8">
          <button
            onClick={() => router.push("/")}
            className="w-full py-3 bg-slate-700 hover:bg-slate-600 text-white font-bold rounded-xl transition-colors"
          >
            스테이지 도전하기
          </button>
        </div>
      </div>
    </div>
  );
}
