"use client";

import { motion } from "motion/react";
import { AlertTriangle, ShieldAlert, Crosshair, Cpu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface AlertProps {
  alert: {
    id: string;
    type: string;
    severity: "critical" | "high" | "medium" | "low";
    player: string;
    game: string;
    timestamp: string;
    description: string;
  };
}

const SEVERITY_CONFIG = {
  critical: { color: "bg-red-500", text: "text-red-400", border: "border-l-red-500", icon: ShieldAlert },
  high: { color: "bg-orange-500", text: "text-orange-400", border: "border-l-orange-500", icon: AlertTriangle },
  medium: { color: "bg-yellow-500", text: "text-yellow-400", border: "border-l-yellow-500", icon: Crosshair },
  low: { color: "bg-blue-500", text: "text-blue-400", border: "border-l-blue-500", icon: Cpu },
};

export function AlertCard({ alert }: AlertProps) {
  const config = SEVERITY_CONFIG[alert.severity];
  const Icon = config.icon;

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className={cn(
        "bg-[#111118]/80 border border-white/5 p-4 rounded-lg flex flex-col sm:flex-row sm:items-center gap-4 group hover:bg-white/5 transition-colors border-l-4",
        config.border
      )}
    >
      <div className={cn("p-2 rounded-lg bg-black/40 shrink-0 self-start sm:self-center", config.text)}>
        <Icon className="w-5 h-5" />
      </div>
      
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2 mb-1">
          <h4 className="text-sm font-semibold text-slate-200 truncate">
            {alert.type} Detected
          </h4>
          <span className="text-xs text-slate-500 whitespace-nowrap">{alert.timestamp}</span>
        </div>
        <p className="text-sm text-slate-400 mb-2 truncate">{alert.description}</p>
        <div className="flex flex-wrap items-center gap-3 text-xs">
          <div className="flex items-center gap-1.5 text-slate-300">
            <span className="w-1.5 h-1.5 rounded-full bg-slate-600" />
            <span className="font-medium text-slate-200">{alert.player}</span>
          </div>
          <div className="flex items-center gap-1.5 text-slate-400">
            <span className="w-1.5 h-1.5 rounded-full bg-slate-600" />
            {alert.game}
          </div>
          <div className={cn("px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-black/30", config.text)}>
            {alert.severity}
          </div>
        </div>
      </div>

      <div className="shrink-0 mt-3 sm:mt-0">
        <Button variant="outline" size="sm" className="w-full sm:w-auto border-white/10 text-slate-300 hover:text-white hover:bg-white/10">
          Details
        </Button>
      </div>
    </motion.div>
  );
}
