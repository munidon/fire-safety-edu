import { supabase } from "./supabase";

export async function signUp(email: string, password: string, nickname: string) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { nickname },
    },
  });

  // Supabase returns a user with empty identities if the email is already registered
  if (!error && data.user && data.user.identities?.length === 0) {
    return {
      data,
      error: { message: "이미 가입된 이메일 주소입니다. 로그인해주세요." } as { message: string },
    };
  }

  return { data, error };
}

export async function signIn(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  return { data, error };
}

export async function signOut() {
  await supabase.auth.signOut();
}

export async function getSession() {
  const { data } = await supabase.auth.getSession();
  return data.session;
}

export function onAuthStateChange(callback: (session: unknown) => void) {
  return supabase.auth.onAuthStateChange((_event, session) => {
    callback(session);
  });
}
