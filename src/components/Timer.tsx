"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

interface TimerProps {
  seconds: number;
  isRunning: boolean;
  onTick: (remaining: number) => void;
  onTimeUp: () => void;
}

export default function Timer({
  seconds,
  isRunning,
  onTick,
  onTimeUp,
}: TimerProps) {
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isRunning && seconds > 0) {
      intervalRef.current = setInterval(() => {
        onTick(seconds - 1);
      }, 1000);
    }

    if (seconds <= 0 && isRunning) {
      onTimeUp();
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRunning, seconds, onTick, onTimeUp]);

  const getColor = () => {
    if (seconds > 15) return "text-green-400";
    if (seconds > 5) return "text-yellow-400";
    return "text-red-400";
  };

  return (
    <div className="flex items-center gap-2">
      <motion.span
        className="text-xl"
        animate={seconds <= 5 && isRunning ? { scale: [1, 1.2, 1] } : {}}
        transition={{ repeat: Infinity, duration: 0.5 }}
      >
        &#9200;
      </motion.span>
      <span className={`text-2xl font-bold font-mono ${getColor()}`}>
        {String(Math.floor(seconds / 60)).padStart(2, "0")}:
        {String(seconds % 60).padStart(2, "0")}
      </span>
    </div>
  );
}
