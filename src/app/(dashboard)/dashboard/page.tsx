import { StatsCards } from "@/components/dashboard/stats-cards";
import { LiveFeed } from "@/components/dashboard/live-feed";
import { ThreatTimeline } from "@/components/dashboard/threat-timeline";
import { DetectionScore } from "@/components/dashboard/detection-score";
import { AlertCard } from "@/components/dashboard/alert-card";
import { Button } from "@/components/ui/button";
import { Activity, Server } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { getAlerts } from "@/app/(dashboard)/alerts/actions";

type AlertSeverity = "critical" | "high" | "medium" | "low";

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  let gamesCount = 0;
  if (user) {
    const { count } = await supabase
      .from('games')
      .select('*', { count: 'exact', head: true })
      .eq('owner_id', user.id);
    gamesCount = count || 0;
  }

  // Fetch real alerts from the database
  const { alerts } = await getAlerts();
  
  const recentAlerts = (alerts || []).slice(0, 5).map((a: any) => ({
    id: a.id,
    type: a.title.replace(' Detected', ''),
    severity: (a.severity.toLowerCase() as AlertSeverity) || "medium",
    player: a.player,
    game: a.game,
    timestamp: a.time,
    description: a.description
  }));

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight">Welcome back, Developer</h2>
          <p className="text-sm text-slate-400 mt-1">Here's an overview of your security posture across all experiences.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#1a1a24] border border-white/5">
            <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)] animate-pulse" />
            <span className="text-xs font-medium text-slate-300">API Operational</span>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/20">
            Generate Report
          </Button>
        </div>
      </div>

      <StatsCards gamesCount={gamesCount} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 flex flex-col gap-6">
          {/* Main Chart */}
          <div className="bg-[#1a1a24]/80 backdrop-blur-md rounded-xl border border-white/5 p-5">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                  <Activity className="w-5 h-5 text-purple-400" />
                  Threat Timeline (24h)
                </h3>
                <p className="text-sm text-slate-400">Total events detected over the last day</p>
              </div>
            </div>
            <ThreatTimeline />
          </div>

          {/* Recent Alerts */}
          <div className="bg-[#1a1a24]/80 backdrop-blur-md rounded-xl border border-white/5 p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">Recent Alerts</h3>
              <Button variant="link" className="text-blue-400 hover:text-blue-300 px-0">View All</Button>
            </div>
            <div className="grid gap-3">
              {recentAlerts.length === 0 ? (
                <div className="text-center py-8 text-slate-500">
                  <p>No recent alerts.</p>
                  <p className="text-sm mt-1">Waiting for data from your games...</p>
                </div>
              ) : (
                recentAlerts.map((alert: any) => (
                  <AlertCard key={alert.id} alert={alert} />
                ))
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          {/* Security Score */}
          <div className="bg-[#1a1a24]/80 backdrop-blur-md rounded-xl border border-white/5 p-5 flex flex-col items-center justify-center">
            <h3 className="text-lg font-semibold text-white w-full text-left mb-6">Detection Score</h3>
            <DetectionScore score={92} />
            <p className="text-sm text-slate-400 text-center mt-6">
              Your security score is excellent. 92% of known threats are being automatically mitigated.
            </p>
          </div>

          {/* Live Feed */}
          <div className="bg-[#1a1a24]/80 backdrop-blur-md rounded-xl border border-white/5 p-5 flex-1 min-h-[400px] flex flex-col">
            <h3 className="text-lg font-semibold text-white mb-4">Live Event Feed</h3>
            <LiveFeed />
          </div>
        </div>
      </div>
    </div>
  );
}
