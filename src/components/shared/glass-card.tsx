"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: "blue" | "purple" | "cyan";
  hoverable?: boolean;
}

export default function GlassCard({
  children,
  className,
  glowColor,
  hoverable = false,
}: GlassCardProps) {
  return (
    <motion.div
      whileHover={hoverable ? { y: -5 } : {}}
      className={cn(
        "glass-card rounded-xl p-6 relative overflow-hidden",
        hoverable && "glass-card-hover cursor-pointer",
        glowColor === "blue" && "glow-blue",
        glowColor === "purple" && "glow-purple",
        glowColor === "cyan" && "glow-cyan",
        className
      )}
    >
      {/* Subtle top border gradient highlight */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      {children}
    </motion.div>
  );
}
