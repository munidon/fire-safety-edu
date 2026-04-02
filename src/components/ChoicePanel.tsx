"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChoiceStep, Choice } from "@/data/types";

interface ChoicePanelProps {
  step: ChoiceStep;
  onComplete: (choice: Choice) => void;
}

export default function ChoicePanel({ step, onComplete }: ChoicePanelProps) {
  const [selected, setSelected] = useState<Choice | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);

  const handleSelect = (choice: Choice) => {
    if (selected) return;
    setSelected(choice);
    setShowFeedback(true);
  };

  const handleContinue = () => {
    if (selected) onComplete(selected);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Situation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <h2 className="text-xl font-bold text-white mb-2">{step.title}</h2>
        <div className="bg-slate-800/80 rounded-xl p-5 border border-slate-700">
          <p className="text-slate-300 text-sm leading-relaxed mb-3">
            {step.situation}
          </p>
          <p className="text-white font-medium">{step.description}</p>
        </div>
      </motion.div>

      {/* Choices */}
      <div className="space-y-3 mb-6">
        {step.choices.map((choice, index) => (
          <motion.button
            key={choice.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            onClick={() => handleSelect(choice)}
            disabled={!!selected}
            className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-300 ${
              selected
                ? selected.id === choice.id
                  ? choice.isCorrect
                    ? "border-green-500 bg-green-500/20"
                    : "border-red-500 bg-red-500/20"
                  : choice.isCorrect
                    ? "border-green-500/50 bg-green-500/10"
                    : "border-slate-700 bg-slate-800/40 opacity-50"
                : "border-slate-600 bg-slate-800/60 hover:border-blue-400 hover:bg-slate-700/60 cursor-pointer"
            }`}
          >
            <div className="flex items-start gap-3">
              <span
                className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                  selected
                    ? selected.id === choice.id
                      ? choice.isCorrect
                        ? "bg-green-500 text-white"
                        : "bg-red-500 text-white"
                      : "bg-slate-600 text-slate-400"
                    : "bg-slate-600 text-white"
                }`}
              >
                {String.fromCharCode(65 + index)}
              </span>
              <span
                className={`text-sm ${selected && selected.id !== choice.id ? "text-slate-500" : "text-white"}`}
              >
                {choice.text}
              </span>
            </div>
          </motion.button>
        ))}
      </div>

      {/* Feedback */}
      <AnimatePresence>
        {showFeedback && selected && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`p-5 rounded-xl border mb-4 ${
              selected.isCorrect
                ? "bg-green-900/30 border-green-700"
                : "bg-red-900/30 border-red-700"
            }`}
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl">
                {selected.isCorrect ? "✅" : "❌"}
              </span>
              <span
                className={`font-bold ${selected.isCorrect ? "text-green-400" : "text-red-400"}`}
              >
                {selected.isCorrect ? "올바른 선택!" : "위험한 선택!"}
              </span>
              <span className="text-sm text-slate-400 ml-auto">
                점수 {selected.scoreDelta > 0 ? "+" : ""}
                {selected.scoreDelta} | 생존률{" "}
                {selected.survivalDelta > 0 ? "+" : ""}
                {selected.survivalDelta}%
              </span>
            </div>
            <p className="text-sm text-slate-300 leading-relaxed">
              {selected.feedback}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Continue button */}
      {selected && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={handleContinue}
          className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-colors"
        >
          다음 단계로
        </motion.button>
      )}
    </div>
  );
}
