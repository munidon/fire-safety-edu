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
    const initAuth = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (session?.user) {
        await handleUserLogin(session);
      }
      setLoading(false);
    };

    const { data: listener } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        if (session?.user) {
          await handleUserLogin(session);
        } else {
          clearUser();
        }
      }
    );

    initAuth();

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  const handleUserLogin = async (session: Session) => {
    const user = session.user;
    const profile = await getUserProfile(user.id);
    const nickname =
      profile?.nickname ??
      user.user_metadata?.nickname ??
      "학습자";
    setUser(user.id, nickname);

    const { unlockedStages, stageResults } = await loadUserProgress(user.id);
    loadProgress(unlockedStages, stageResults);
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
