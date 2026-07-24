"use client";

import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { ShieldAlert, CheckCircle2, Clock, MoreVertical, ShieldOff, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { getAlerts } from "./actions";

export default function AlertsPage() {
  const [filter, setFilter] = useState("All");
  const [alerts, setAlerts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAlerts();
  }, []);

  const fetchAlerts = async () => {
    setLoading(true);
    const { alerts: data, error } = await getAlerts();
    if (data) {
      setAlerts(data);
    }
    setLoading(false);
  };

  const filteredAlerts = filter === "All" 
    ? alerts 
    : alerts.filter(a => a.severity === filter);

  const getSeverityStyle = (severity: string) => {
    switch(severity) {
      case 'Critical': return 'bg-red-500/10 text-red-400 border-red-500/30';
      case 'High': return 'bg-orange-500/10 text-orange-400 border-orange-500/30';
      case 'Medium': return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30';
      default: return 'bg-blue-500/10 text-blue-400 border-blue-500/30';
    }
  };

  return (
    <div className="p-8 space-y-8 max-w-5xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-red-400 to-orange-500 bg-clip-text text-transparent">
            Active Alerts
          </h1>
          <p className="text-gray-400 mt-2">Manage and resolve security incidents across your network.</p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline" className="border-gray-800 bg-[#111118]">Bulk Actions</Button>
          <Button className="bg-blue-600 hover:bg-blue-700">Resolve All</Button>
        </div>
      </div>

      <Tabs defaultValue="All" className="w-full" onValueChange={setFilter}>
        <TabsList className="bg-[#111118] border border-gray-800 p-1 rounded-md">
          {["All", "Critical", "High", "Medium", "Low"].map((level) => (
            <TabsTrigger 
              key={level} 
              value={level}
              className="data-[state=active]:bg-gray-800 data-[state=active]:text-white text-gray-400"
            >
              {level}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      <div className="space-y-4">
        {loading ? (
          <div className="flex justify-center items-center py-20 border border-gray-800 border-dashed rounded-lg bg-[#111118]/50">
            <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
          </div>
        ) : filteredAlerts.length === 0 ? (
          <div className="text-center py-20 border border-gray-800 border-dashed rounded-lg bg-[#111118]/50">
            <ShieldOff className="mx-auto h-12 w-12 text-gray-600 mb-4" />
            <h3 className="text-xl font-medium text-gray-300">No alerts found</h3>
            <p className="text-gray-500 mt-2">All systems are clear.</p>
          </div>
        ) : (
          filteredAlerts.map((alert, i) => (
            <motion.div
              key={alert.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className="bg-[#111118]/80 backdrop-blur border-gray-800 overflow-hidden">
                <CardContent className="p-0">
                  <div className="flex items-center p-4 sm:p-6">
                    <div className="flex-shrink-0 mr-4 sm:mr-6">
                      <div className={cn(
                        "w-12 h-12 rounded-full flex items-center justify-center bg-gray-900 border",
                        getSeverityStyle(alert.severity)
                      )}>
                        <ShieldAlert className="h-6 w-6" />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-3 mb-1">
                        <h3 className="text-lg font-semibold text-gray-100 truncate">{alert.title}</h3>
                        <Badge variant="outline" className={cn("hidden sm:inline-flex", getSeverityStyle(alert.severity))}>
                          {alert.severity}
                        </Badge>
                      </div>
                      <div className="flex flex-wrap items-center text-sm text-gray-400 gap-y-2">
                        <span className="font-medium text-gray-300 mr-3">Player: {alert.player}</span>
                        <span className="mr-3 text-gray-500">•</span>
                        <span className="mr-3">Game: {alert.game}</span>
                        <span className="mr-3 text-gray-500 hidden sm:inline">•</span>
                        <div className="flex items-center w-full sm:w-auto mt-2 sm:mt-0">
                          <Clock className="h-3 w-3 mr-1" />
                          {alert.time}
                        </div>
                      </div>
                    </div>
                    <div className="ml-4 flex-shrink-0 flex items-center space-x-2">
                      <Button size="sm" variant="outline" className="hidden sm:flex border-gray-700 bg-gray-900 hover:bg-gray-800 text-green-400 hover:text-green-300">
                        <CheckCircle2 className="mr-2 h-4 w-4" /> Resolve
                      </Button>
                      <Button size="icon" variant="ghost" className="text-gray-400 hover:text-white">
                        <MoreVertical className="h-5 w-5" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}
