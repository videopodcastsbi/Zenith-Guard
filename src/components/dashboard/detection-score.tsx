"use client";

import { motion } from "motion/react";
import { useEffect, useState } from "react";

export function DetectionScore({ score }: { score: number }) {
  const [animatedScore, setAnimatedScore] = useState(0);

  useEffect(() => {
    // Simple count up animation
    const duration = 1500;
    const steps = 60;
    const stepTime = duration / steps;
    const increment = score / steps;
    
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= score) {
        setAnimatedScore(score);
        clearInterval(timer);
      } else {
        setAnimatedScore(Math.floor(current));
      }
    }, stepTime);
    
    return () => clearInterval(timer);
  }, [score]);

  // Determine colors based on score
  let color = "#ef4444"; // red
  let glowColor = "rgba(239, 68, 68, 0.5)";
  
  if (score > 30) {
    color = "#eab308"; // yellow
    glowColor = "rgba(234, 179, 8, 0.5)";
  }
  if (score > 60) {
    color = "#22c55e"; // green
    glowColor = "rgba(34, 197, 94, 0.5)";
  }
  if (score > 80) {
    color = "#10b981"; // bright emerald
    glowColor = "rgba(16, 185, 129, 0.6)";
  }

  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (animatedScore / 100) * circumference;

  return (
    <div className="relative flex items-center justify-center">
      {/* Background glow */}
      <div 
        className="absolute inset-0 m-auto w-24 h-24 rounded-full blur-2xl opacity-40 transition-colors duration-1000"
        style={{ backgroundColor: color }}
      />
      
      <svg width="160" height="160" viewBox="0 0 160 160" className="rotate-[-90deg]">
        {/* Track */}
        <circle
          cx="80"
          cy="80"
          r={radius}
          fill="none"
          stroke="rgba(255,255,255,0.05)"
          strokeWidth="12"
        />
        {/* Progress */}
        <motion.circle
          cx="80"
          cy="80"
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth="12"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          style={{ filter: `drop-shadow(0 0 6px ${glowColor})` }}
        />
      </svg>
      
      <div className="absolute flex flex-col items-center justify-center">
        <span className="text-4xl font-bold text-foreground tracking-tighter">
          {animatedScore}
        </span>
        <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider mt-1">
          / 100
        </span>
      </div>
    </div>
  );
}
