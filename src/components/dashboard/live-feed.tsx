"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { AlertCircle, ShieldAlert, Crosshair, MessageSquareWarning, Loader2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { getAlerts } from "@/app/(dashboard)/alerts/actions";

type FeedItem = {
  id: string;
  severity: "low" | "medium" | "high" | "critical";
  player: string;
  userId?: string;
  type: string;
  game: string;
  time: string;
};

const SEVERITY_COLORS = {
  low: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  medium: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
  high: "bg-orange-500/10 text-orange-400 border-orange-500/20",
  critical: "bg-red-500/10 text-red-400 border-red-500/20",
};

const SEVERITY_ICONS = {
  low: MessageSquareWarning,
  medium: AlertCircle,
  high: Crosshair,
  critical: ShieldAlert,
};

export function LiveFeed() {
  const [events, setEvents] = useState<FeedItem[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchLiveEvents = async () => {
    const { alerts } = await getAlerts();
    if (alerts) {
      const formattedEvents = alerts.slice(0, 10).map((a: any) => ({
        id: a.id,
        severity: (a.severity.toLowerCase() as any) || "medium",
        player: a.player, // This uses player_name from the DB which is their real Roblox username
        userId: a.userId,
        type: a.title.replace(' Detected', ''),
        game: a.game,
        time: a.time
      }));
      setEvents(formattedEvents);
    }
    setLoading(false);
  };

  // Poll for new events every 5 seconds
  useEffect(() => {
    fetchLiveEvents(); // Initial fetch
    const interval = setInterval(fetchLiveEvents, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col h-full relative">
      <div className="absolute top-0 right-0 flex items-center gap-2">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
        </span>
        <span className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Live</span>
      </div>
      
      <div className="flex-1 overflow-y-auto pr-2 -mr-2 space-y-3 mt-2">
        {loading ? (
          <div className="flex h-full items-center justify-center">
             <Loader2 className="h-6 w-6 animate-spin text-primary" />
          </div>
        ) : events.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center text-muted-foreground">
             <p>No recent events</p>
             <p className="text-xs mt-1">Waiting for data from your games...</p>
          </div>
        ) : (
          <AnimatePresence initial={false}>
            {events.map((event) => {
              const Icon = SEVERITY_ICONS[event.severity] || SEVERITY_ICONS.medium;
              return (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: -20, height: 0 }}
                  animate={{ opacity: 1, y: 0, height: "auto" }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="bg-background/50 border border-border rounded-lg p-3 flex gap-3 items-start group hover:bg-muted/50 transition-colors"
                >
                  <div className="shrink-0">
                    {event.userId ? (
                      <Avatar className="h-9 w-9 border border-border">
                        <AvatarImage src={`https://www.roblox.com/headshot-thumbnail/image?userId=${event.userId}&width=150&height=150&format=png`} alt={event.player} />
                        <AvatarFallback className={cn("bg-background/50", SEVERITY_COLORS[event.severity] || SEVERITY_COLORS.medium)}>
                          <Icon className="w-4 h-4" />
                        </AvatarFallback>
                      </Avatar>
                    ) : (
                      <div className={cn("p-2 rounded-md border shrink-0 bg-background/50", SEVERITY_COLORS[event.severity] || SEVERITY_COLORS.medium)}>
                        <Icon className="w-4 h-4" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-sm font-medium text-foreground truncate">
                        {event.player}
                      </p>
                      <span className="text-xs text-muted-foreground whitespace-nowrap">{event.time}</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5 flex items-center gap-2">
                      <span className="font-semibold text-foreground">{event.type}</span>
                      <span className="w-1 h-1 rounded-full bg-muted-foreground" />
                      <span className="truncate">{event.game}</span>
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        )}
      </div>
      
      <div className="pt-4 mt-auto border-t border-border text-center">
        <a href="/alerts" className="text-xs text-primary hover:text-primary/80 font-medium transition-colors">
          View All Events
        </a>
      </div>
    </div>
  );
}
