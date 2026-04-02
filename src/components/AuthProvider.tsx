"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { loadUserProgress, getUserProfile } from "@/lib/database";
import { useGameStore } from "@/store/gameStore";
import type { Session } from "@supabase/supabase-js";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loading, setLoading] = useState(true);
  const { setUser, clearUser, loadProgress } = useGameStore();

  useEffect(() => {
    let initialLoad = true;

    const { data: listener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        try {
          if (session?.user) {
            await handleUserLogin(session);
          } else {
            clearUser();
          }
        } catch (e) {
          console.error("Auth state change error:", e);
        } finally {
          if (initialLoad) {
            initialLoad = false;
            setLoading(false);
          }
        }
      }
    );

    // 안전장치: 5초 이내에 이벤트가 오지 않으면 로딩 해제
    const timeout = setTimeout(() => {
      if (initialLoad) {
        initialLoad = false;
        setLoading(false);
      }
    }, 5000);

    return () => {
      listener.subscription.unsubscribe();
      clearTimeout(timeout);
    };
  }, []);

  const handleUserLogin = async (session: Session) => {
    const user = session.user;
    // 닉네임을 메타데이터에서 먼저 설정 (즉시 반영)
    const quickNickname = user.user_metadata?.nickname ?? "학습자";
    setUser(user.id, quickNickname);

    // DB 쿼리를 병렬로 실행
    const [profile, progress] = await Promise.all([
      getUserProfile(user.id),
      loadUserProgress(user.id),
    ]);

    const nickname = profile?.nickname ?? quickNickname;
    setUser(user.id, nickname);
    loadProgress(progress.unlockedStages, progress.stageResults);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-slate-400 text-lg">로딩 중...</div>
      </div>
    );
  }

  return <>{children}</>;
}
