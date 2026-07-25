"use client";

import { motion } from "motion/react";
import { AlertTriangle, ShieldAlert, Crosshair, Cpu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface AlertProps {
  alert: {
    id: string;
    type: string;
    severity: "critical" | "high" | "medium" | "low";
    player: string;
    userId?: string;
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
        "bg-card/80 border border-border p-4 rounded-lg flex flex-col sm:flex-row sm:items-center gap-4 group hover:bg-muted/50 transition-colors border-l-4",
        config.border
      )}
    >
      <div className="shrink-0 self-start sm:self-center">
        {alert.userId ? (
          <Avatar className="h-12 w-12 border border-border">
            <AvatarImage src={`https://www.roblox.com/headshot-thumbnail/image?userId=${alert.userId}&width=150&height=150&format=png`} alt={alert.player} />
            <AvatarFallback className="bg-background/50 text-foreground">
              <Icon className={cn("w-5 h-5", config.text)} />
            </AvatarFallback>
          </Avatar>
        ) : (
          <div className={cn("p-3 rounded-full bg-background/50", config.text)}>
            <Icon className="w-5 h-5" />
          </div>
        )}
      </div>
      
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2 mb-1">
          <h4 className="text-sm font-semibold text-foreground truncate">
            {alert.type} Detected
          </h4>
          <span className="text-xs text-muted-foreground whitespace-nowrap">{alert.timestamp}</span>
        </div>
        <p className="text-sm text-muted-foreground mb-2 truncate">{alert.description}</p>
        <div className="flex flex-wrap items-center gap-3 text-xs">
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/50" />
            <span className="font-medium text-foreground">{alert.player}</span>
          </div>
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/50" />
            {alert.game}
          </div>
          <div className={cn("px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-background/50", config.text)}>
            {alert.severity}
          </div>
        </div>
      </div>

      <div className="shrink-0 mt-3 sm:mt-0">
        <Button variant="outline" size="sm" className="w-full sm:w-auto border-border text-muted-foreground hover:text-foreground hover:bg-muted/50">
          Details
        </Button>
      </div>
    </motion.div>
  );
}
