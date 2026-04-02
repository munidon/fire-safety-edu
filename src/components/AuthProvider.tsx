"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { loadUserProgress, getUserProfile } from "@/lib/database";
import { useGameStore } from "@/store/gameStore";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loading, setLoading] = useState(true);
  const { setUser, clearUser, loadProgress } = useGameStore();

  const restoreUser = async (userId: string, fallbackNickname: string) => {
    const [profile, progress] = await Promise.all([
      getUserProfile(userId),
      loadUserProgress(userId),
    ]);
    setUser(userId, profile?.nickname ?? fallbackNickname);
    loadProgress(progress.unlockedStages, progress.stageResults);
  };

  useEffect(() => {
    // 1. 페이지 로드 시 세션 확인
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        const fallback = session.user.user_metadata?.nickname ?? "학습자";
        restoreUser(session.user.id, fallback).finally(() => setLoading(false));
      } else {
        setLoading(false);
      }
    });

    // 2. 로그인/로그아웃 이벤트 감지
    const { data: listener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === "SIGNED_IN" && session?.user) {
          const fallback = session.user.user_metadata?.nickname ?? "학습자";
          restoreUser(session.user.id, fallback);
        }
        if (event === "SIGNED_OUT") {
          clearUser();
        }
      }
    );

    return () => listener.subscription.unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-slate-400 text-lg">로딩 중...</div>
      </div>
    );
  }

  return <>{children}</>;
}
