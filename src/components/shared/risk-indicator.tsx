"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";

interface RiskIndicatorProps {
  score: number; // 0-100
  size?: "sm" | "md" | "lg";
  className?: string;
}

export default function RiskIndicator({ score, size = "md", className }: RiskIndicatorProps) {
  const radius = size === "sm" ? 16 : size === "md" ? 24 : 36;
  const strokeWidth = size === "sm" ? 3 : size === "md" ? 4 : 6;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;
  
  let colorClass = "text-emerald-400";
  if (score >= 80) colorClass = "text-red-500";
  else if (score >= 60) colorClass = "text-orange-400";
  else if (score >= 30) colorClass = "text-amber-400";

  return (
    <div className={cn("relative inline-flex items-center justify-center", className)}>
      <svg
        className="transform -rotate-90"
        width={radius * 2 + strokeWidth * 2}
        height={radius * 2 + strokeWidth * 2}
      >
        <circle
          className="text-white/10"
          strokeWidth={strokeWidth}
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx={radius + strokeWidth}
          cy={radius + strokeWidth}
        />
        <motion.circle
          className={colorClass}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          strokeLinecap="round"
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx={radius + strokeWidth}
          cy={radius + strokeWidth}
        />
      </svg>
      <div className="absolute flex flex-col items-center justify-center text-center">
        <span className={cn(
          "font-mono font-bold",
          size === "sm" ? "text-xs" : size === "md" ? "text-sm" : "text-xl"
        )}>
          {score}
        </span>
      </div>
    </div>
  );
}
