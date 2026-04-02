"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { signIn, signUp } from "@/lib/auth";

export default function LoginPage() {
  const router = useRouter();
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [signUpSuccess, setSignUpSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (isSignUp) {
        if (!nickname.trim()) {
          setError("닉네임을 입력해주세요.");
          setLoading(false);
          return;
        }
        const { error: err } = await signUp(email, password, nickname);
        if (err) {
          setError(err.message);
        } else {
          setSignUpSuccess(true);
        }
      } else {
        const { error: err } = await signIn(email, password);
        if (err) {
          setError("이메일 또는 비밀번호가 올바르지 않습니다.");
        } else {
          router.push("/");
        }
      }
    } catch {
      setError("오류가 발생했습니다. 다시 시도해주세요.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="text-5xl mb-4">🔥</div>
          <h1 className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-red-500 to-amber-500 mb-2">
            Beat the Heat
          </h1>
          <p className="text-slate-400 text-sm">
            재난안전교육 시뮬레이션 Tool
          </p>
        </div>

        {/* Sign up success */}
        {signUpSuccess ? (
          <div className="bg-slate-800/60 rounded-2xl p-8 border border-slate-700 text-center">
            <div className="text-5xl mb-4">📧</div>
            <h2 className="text-xl font-bold text-white mb-3">
              이메일을 확인해주세요!
            </h2>
            <p className="text-slate-300 text-sm leading-relaxed mb-2">
              <span className="text-blue-400 font-medium">{email}</span>
              으로 인증 메일을 발송했습니다.
            </p>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              메일함에서 인증 링크를 클릭하면 회원가입이 완료됩니다.
              <br />
              메일이 보이지 않으면 스팸 폴더를 확인해주세요.
            </p>
            <button
              onClick={() => {
                setSignUpSuccess(false);
                setIsSignUp(false);
                setEmail("");
                setPassword("");
                setNickname("");
              }}
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-colors"
            >
              로그인 하러 가기
            </button>
          </div>
        ) : (

          /* Form */
          <form
            onSubmit={handleSubmit}
            className="bg-slate-800/60 rounded-2xl p-8 border border-slate-700"
          >
            <h2 className="text-xl font-bold text-white text-center mb-6">
              {isSignUp ? "회원가입" : "로그인"}
            </h2>

            {isSignUp && (
              <div className="mb-4">
                <label className="block text-sm text-slate-400 mb-1">
                  닉네임
                </label>
                <input
                  type="text"
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                  placeholder="게임에서 사용할 닉네임"
                  className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-xl text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none"
                  maxLength={20}
                />
              </div>
            )}

            <div className="mb-4">
              <label className="block text-sm text-slate-400 mb-1">이메일</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="example@email.com"
                className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-xl text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none"
                required
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm text-slate-400 mb-1">
                비밀번호
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="6자 이상"
                className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-xl text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none"
                required
                minLength={6}
              />
            </div>

            {error && (
              <div className="mb-4 p-3 bg-red-900/30 border border-red-700 rounded-xl text-red-400 text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-600 text-white font-bold rounded-xl transition-colors mb-4"
            >
              {loading
                ? "처리 중..."
                : isSignUp
                  ? "회원가입"
                  : "로그인"}
            </button>

            <div className="text-center">
              <button
                type="button"
                onClick={() => {
                  setIsSignUp(!isSignUp);
                  setError("");
                }}
                className="text-sm text-slate-400 hover:text-white transition-colors"
              >
                {isSignUp
                  ? "이미 계정이 있으신가요? 로그인"
                  : "계정이 없으신가요? 회원가입"}
              </button>
            </div>
          </form>
        )}

        {/* Home link */}
        <div className="mt-6 text-center">
          <button
            onClick={() => router.push("/")}
            className="text-sm text-slate-500 hover:text-slate-300 transition-colors"
          >
            &#8592; 홈으로 돌아가기
          </button>
        </div>
      </motion.div>
    </div>
  );
}
