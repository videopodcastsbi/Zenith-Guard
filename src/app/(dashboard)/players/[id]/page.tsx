"use client";

import { use } from "react";
import { motion } from "motion/react";
import { ArrowLeft, ShieldAlert, Clock, Gamepad2, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { mockPlayers } from "@/data/mock";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from "recharts";

const timelineData = [
  { time: '10:00', risk: 10 },
  { time: '11:00', risk: 15 },
  { time: '12:00', risk: 45 },
  { time: '13:00', risk: 80 },
  { time: '14:00', risk: 95 },
];

export default function PlayerDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const player = mockPlayers.find(p => p.id === resolvedParams.id) || mockPlayers[0];

  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto">
      <div className="flex items-center space-x-4 mb-4">
        <Link href="/players">
          <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <div className="flex items-center space-x-4">
          <Avatar className="h-16 w-16 border-2 border-gray-700">
            <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-2xl font-bold text-white">
              {player.username.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-3xl font-bold text-white">{player.username}</h1>
            <p className="text-gray-400 font-mono text-sm mt-1">User ID: {player.userId}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-[#111118]/50 border-gray-800">
          <CardHeader>
            <CardTitle>Risk Profile</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center py-6">
            <div className="relative w-48 h-48 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="40" stroke="#1f2937" strokeWidth="8" fill="none" />
                <motion.circle 
                  initial={{ strokeDasharray: "0 251.2" }}
                  animate={{ strokeDasharray: `${(player.riskScore / 100) * 251.2} 251.2` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  cx="50" cy="50" r="40" 
                  stroke={player.riskScore > 70 ? "#ef4444" : player.riskScore > 30 ? "#eab308" : "#22c55e"} 
                  strokeWidth="8" fill="none" 
                  strokeLinecap="round" 
                />
              </svg>
              <div className="absolute flex flex-col items-center">
                <span className="text-4xl font-bold text-white">{player.riskScore}</span>
                <span className="text-sm text-gray-400">/ 100</span>
              </div>
            </div>
            <Badge variant="outline" className={cn(
              "mt-4 font-semibold text-lg py-1 px-4",
              player.status === 'Flagged' ? "border-red-500/30 text-red-400 bg-red-500/10" : "border-green-500/30 text-green-400 bg-green-500/10"
            )}>
              {player.status}
            </Badge>
          </CardContent>
        </Card>

        <Card className="md:col-span-2 bg-[#111118]/50 border-gray-800">
          <CardHeader>
            <CardTitle className="flex items-center"><Activity className="mr-2 h-5 w-5 text-purple-400" /> Detection Timeline</CardTitle>
            <CardDescription>Risk score progression over the last 24 hours</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[200px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={timelineData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                  <XAxis dataKey="time" stroke="#888" tick={{fontSize: 12}} />
                  <YAxis stroke="#888" domain={[0, 100]} tick={{fontSize: 12}} />
                  <Tooltip contentStyle={{ backgroundColor: '#111118', borderColor: '#333' }} />
                  <Line type="stepAfter" dataKey="risk" stroke="#8b5cf6" strokeWidth={2} dot={{ r: 4, fill: '#8b5cf6' }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-[#111118]/50 border-gray-800">
          <CardHeader>
            <CardTitle className="flex items-center"><ShieldAlert className="mr-2 h-5 w-5 text-red-400" /> Recent Alerts</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {player.alerts > 0 ? (
              <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-semibold text-red-400">Speed Hack Detected</h4>
                  <span className="text-xs text-gray-500">2 mins ago</span>
                </div>
                <p className="text-sm text-gray-300">Player velocity exceeded physical limits in Jailbreak.</p>
              </div>
            ) : (
              <p className="text-gray-500 text-center py-4">No recent alerts recorded for this player.</p>
            )}
          </CardContent>
        </Card>

        <Card className="bg-[#111118]/50 border-gray-800">
          <CardHeader>
            <CardTitle className="flex items-center"><Gamepad2 className="mr-2 h-5 w-5 text-blue-400" /> Connected Games</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between p-3 bg-gray-900/50 rounded-lg border border-gray-800">
              <span className="font-medium text-gray-200">Jailbreak</span>
              <span className="text-sm text-gray-500 flex items-center"><Clock className="mr-1 h-3 w-3" /> Last seen: Now</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
