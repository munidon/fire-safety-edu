"use client";

import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MissionStep } from "@/data/types";
import Timer from "./Timer";

interface MissionPanelProps {
  step: MissionStep;
  onComplete: (success: boolean) => void;
}

export default function MissionPanel({ step, onComplete }: MissionPanelProps) {
  const [items, setItems] = useState<string[]>(() =>
    [...step.items].sort(() => Math.random() - 0.5)
  );
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(step.timeLimit ?? 30);
  const [timerRunning, setTimerRunning] = useState(true);
  const [timedOut, setTimedOut] = useState(false);

  const checkAnswer = useCallback(() => {
    if (step.missionType === "order" && step.correctOrder) {
      return items.every((item, index) => item === step.correctOrder![index]);
    }
    return false;
  }, [items, step]);

  const handleSubmit = useCallback(() => {
    if (submitted) return;
    const correct = checkAnswer();
    setIsCorrect(correct);
    setSubmitted(true);
    setTimerRunning(false);
  }, [submitted, checkAnswer]);

  const handleTimeUp = useCallback(() => {
    if (!submitted) {
      setTimedOut(true);
      setSubmitted(true);
      setIsCorrect(false);
      setTimerRunning(false);
    }
  }, [submitted]);

  const handleTick = useCallback((remaining: number) => {
    setTimeRemaining(remaining);
  }, []);

  const handleContinue = () => {
    onComplete(isCorrect);
  };

  // Drag & drop for ordering
  const handleDragStart = (index: number) => {
    setDraggedIndex(index);
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === index) return;

    const newItems = [...items];
    const [removed] = newItems.splice(draggedIndex, 1);
    newItems.splice(index, 0, removed);
    setItems(newItems);
    setDraggedIndex(index);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
  };

  // Touch support: tap to swap
  const [selectedForSwap, setSelectedForSwap] = useState<number | null>(null);

  const handleTap = (index: number) => {
    if (submitted) return;
    if (selectedForSwap === null) {
      setSelectedForSwap(index);
    } else {
      const newItems = [...items];
      [newItems[selectedForSwap], newItems[index]] = [
        newItems[index],
        newItems[selectedForSwap],
      ];
      setItems(newItems);
      setSelectedForSwap(null);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <h2 className="text-xl font-bold text-white mb-2">{step.title}</h2>
        <div className="bg-slate-800/80 rounded-xl p-5 border border-slate-700">
          <p className="text-slate-300 text-sm mb-2">{step.description}</p>
          <p className="text-amber-400 font-medium text-sm">
            {step.instruction}
          </p>
        </div>
      </motion.div>

      {/* Timer */}
      {step.timeLimit && !submitted && (
        <div className="mb-4 flex justify-center">
          <Timer
            seconds={timeRemaining}
            isRunning={timerRunning}
            onTick={handleTick}
            onTimeUp={handleTimeUp}
          />
        </div>
      )}

      {/* Sortable items */}
      <div className="space-y-2 mb-6">
        {items.map((item, index) => (
          <motion.div
            key={item}
            layout
            draggable={!submitted}
            onDragStart={() => handleDragStart(index)}
            onDragOver={(e) => handleDragOver(e as unknown as React.DragEvent, index)}
            onDragEnd={handleDragEnd}
            onClick={() => handleTap(index)}
            className={`flex items-center gap-3 p-4 rounded-xl border-2 transition-all cursor-grab active:cursor-grabbing ${
              submitted
                ? step.correctOrder && item === step.correctOrder[index]
                  ? "border-green-500 bg-green-900/20"
                  : "border-red-500 bg-red-900/20"
                : selectedForSwap === index
                  ? "border-blue-400 bg-blue-900/30"
                  : draggedIndex === index
                    ? "border-blue-400 bg-blue-900/30 scale-105"
                    : "border-slate-600 bg-slate-800/60 hover:border-slate-500"
            }`}
          >
            <span
              className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                submitted
                  ? step.correctOrder && item === step.correctOrder[index]
                    ? "bg-green-500 text-white"
                    : "bg-red-500 text-white"
                  : "bg-slate-600 text-white"
              }`}
            >
              {index + 1}
            </span>
            <span className="text-white text-sm">{item}</span>
            {!submitted && (
              <span className="ml-auto text-slate-500 text-xs">
                &#x2630;
              </span>
            )}
          </motion.div>
        ))}
      </div>

      {/* Submit / Feedback */}
      {!submitted ? (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={handleSubmit}
          className="w-full py-3 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-xl transition-colors"
        >
          정답 확인
        </motion.button>
      ) : (
        <>
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`p-5 rounded-xl border mb-4 ${
                isCorrect
                  ? "bg-green-900/30 border-green-700"
                  : "bg-red-900/30 border-red-700"
              }`}
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl">
                  {timedOut ? "⏰" : isCorrect ? "✅" : "❌"}
                </span>
                <span
                  className={`font-bold ${isCorrect ? "text-green-400" : "text-red-400"}`}
                >
                  {timedOut
                    ? "시간 초과!"
                    : isCorrect
                      ? "미션 성공!"
                      : "미션 실패!"}
                </span>
                <span className="text-sm text-slate-400 ml-auto">
                  {isCorrect
                    ? `+${step.scoreReward}점`
                    : `생존률 ${step.survivalDelta}%`}
                </span>
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                {isCorrect ? step.successFeedback : step.failFeedback}
              </p>
            </motion.div>
          </AnimatePresence>
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={handleContinue}
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-colors"
          >
            다음 단계로
          </motion.button>
        </>
      )}
    </div>
  );
}
