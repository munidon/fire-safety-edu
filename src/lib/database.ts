import { supabase } from "./supabase";

// --- Progress ---
export async function loadUserProgress(userId: string) {
  const { data: progress } = await supabase
    .from("progress")
    .select("stage_id, unlocked")
    .eq("user_id", userId)
    .eq("unlocked", true);

  const { data: scores } = await supabase
    .from("scores")
    .select("stage_id, score, survival_rate, time_spent, completed_at")
    .eq("user_id", userId);

  const unlockedStages = progress?.map((p) => p.stage_id) ?? [1];
  const stageResults =
    scores?.map((s) => ({
      stageId: s.stage_id,
      score: s.score,
      survivalRate: s.survival_rate,
      timeSpent: s.time_spent,
      completedAt: s.completed_at,
    })) ?? [];

  return { unlockedStages, stageResults };
}

export async function saveStageScore(
  userId: string,
  stageId: number,
  score: number,
  survivalRate: number,
  timeSpent: number
) {
  const { error } = await supabase.from("scores").upsert(
    {
      user_id: userId,
      stage_id: stageId,
      score,
      survival_rate: survivalRate,
      time_spent: timeSpent,
      completed_at: new Date().toISOString(),
    },
    { onConflict: "user_id,stage_id" }
  );
  return !error;
}

export async function unlockStageInDB(userId: string, stageId: number) {
  await supabase.from("progress").upsert(
    {
      user_id: userId,
      stage_id: stageId,
      unlocked: true,
    },
    { onConflict: "user_id,stage_id" }
  );
}

// --- Leaderboard ---
export async function fetchLeaderboard() {
  const { data } = await supabase
    .from("leaderboard")
    .select("*")
    .limit(20);

  return (
    data?.map((entry, index) => ({
      rank: index + 1,
      nickname: entry.nickname,
      totalScore: entry.total_score,
      avgSurvival: entry.avg_survival,
      stagesCompleted: entry.stages_completed,
    })) ?? []
  );
}

// --- Profile ---
export async function getUserProfile(userId: string) {
  const { data } = await supabase
    .from("profiles")
    .select("nickname")
    .eq("id", userId)
    .single();
  return data;
}
