"use client";

import { motion } from "framer-motion";

interface SurvivalGaugeProps {
  rate: number;
}

export default function SurvivalGauge({ rate }: SurvivalGaugeProps) {
  const getColor = () => {
    if (rate >= 70) return "bg-green-500";
    if (rate >= 40) return "bg-yellow-500";
    return "bg-red-500";
  };

  const getTextColor = () => {
    if (rate >= 70) return "text-green-400";
    if (rate >= 40) return "text-yellow-400";
    return "text-red-400";
  };

  return (
    <div className="flex items-center gap-3">
      <span className="text-sm font-medium text-slate-400 whitespace-nowrap">
        생존률
      </span>
      <div className="flex-1 bg-slate-700 rounded-full h-4 overflow-hidden min-w-[100px]">
        <motion.div
          className={`h-full rounded-full ${getColor()} ${rate < 40 ? "pulse-glow" : ""}`}
          initial={{ width: "100%" }}
          animate={{ width: `${rate}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      </div>
      <span className={`text-lg font-bold ${getTextColor()} min-w-[50px] text-right`}>
        {rate}%
      </span>
    </div>
  );
}
