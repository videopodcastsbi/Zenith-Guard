"use client";

import { use } from "react";
import { motion } from "motion/react";
import { Shield, Users, Server, Activity, ArrowLeft, Settings, Database, ActivitySquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { mockGames } from "@/data/mock";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function GameDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const game = mockGames.find(g => g.id === resolvedParams.id) || mockGames[0];

  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto">
      <div className="flex items-center space-x-4 mb-4">
        <Link href="/games">
          <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            {game.name}
          </h1>
          <p className="text-gray-400 flex items-center mt-1">
            Place ID: {game.placeId} 
            <span className="mx-2">•</span> 
            <Badge variant="outline" className={cn(
              "font-semibold",
              game.status === "Healthy" ? "border-green-500/30 text-green-400" : "border-yellow-500/30 text-yellow-400"
            )}>
              {game.status}
            </Badge>
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-[#111118]/50 border-gray-800">
          <CardContent className="p-6 flex items-center space-x-4">
            <div className="p-3 bg-blue-500/10 rounded-lg"><Users className="h-6 w-6 text-blue-400" /></div>
            <div>
              <p className="text-sm text-gray-400">Active Players</p>
              <p className="text-2xl font-bold text-white">{game.players.toLocaleString()}</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-[#111118]/50 border-gray-800">
          <CardContent className="p-6 flex items-center space-x-4">
            <div className="p-3 bg-purple-500/10 rounded-lg"><Server className="h-6 w-6 text-purple-400" /></div>
            <div>
              <p className="text-sm text-gray-400">Active Servers</p>
              <p className="text-2xl font-bold text-white">{game.servers.toLocaleString()}</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-[#111118]/50 border-gray-800">
          <CardContent className="p-6 flex items-center space-x-4">
            <div className="p-3 bg-cyan-500/10 rounded-lg"><Shield className="h-6 w-6 text-cyan-400" /></div>
            <div>
              <p className="text-sm text-gray-400">Security Score</p>
              <p className="text-2xl font-bold text-white">{game.securityScore}/100</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-[#111118]/50 border-gray-800">
          <CardContent className="p-6 flex items-center space-x-4">
            <div className="p-3 bg-red-500/10 rounded-lg"><Activity className="h-6 w-6 text-red-400" /></div>
            <div>
              <p className="text-sm text-gray-400">Recent Events</p>
              <p className="text-2xl font-bold text-white">{game.detections}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="bg-[#111118] border border-gray-800 p-1 mb-6">
          <TabsTrigger value="overview" className="data-[state=active]:bg-gray-800 text-gray-400">Overview</TabsTrigger>
          <TabsTrigger value="security" className="data-[state=active]:bg-gray-800 text-gray-400">Security Rules</TabsTrigger>
          <TabsTrigger value="servers" className="data-[state=active]:bg-gray-800 text-gray-400">Servers</TabsTrigger>
          <TabsTrigger value="logs" className="data-[state=active]:bg-gray-800 text-gray-400">Audit Logs</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-6">
          <Card className="bg-[#111118]/50 border-gray-800">
            <CardHeader>
              <CardTitle>Recent Detection Events</CardTitle>
              <CardDescription>Live feed from game servers</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center p-8 text-gray-500">
                <ActivitySquare className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Chart data loading...</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <Card className="bg-[#111118]/50 border-gray-800">
            <CardHeader>
              <CardTitle className="flex items-center"><Settings className="mr-2 h-5 w-5" /> Exploit Protection Rules</CardTitle>
              <CardDescription>Configure auto-detection thresholds</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between p-4 bg-gray-900/50 rounded-lg border border-gray-800">
                <div>
                  <h4 className="font-medium text-gray-200">WalkSpeed Limit Enforcer</h4>
                  <p className="text-sm text-gray-500">Flag players exceeding 24 WalkSpeed</p>
                </div>
                <div className="bg-blue-600 px-3 py-1 rounded-full text-xs font-medium">Enabled</div>
              </div>
              <div className="flex items-center justify-between p-4 bg-gray-900/50 rounded-lg border border-gray-800">
                <div>
                  <h4 className="font-medium text-gray-200">JumpPower Limit Enforcer</h4>
                  <p className="text-sm text-gray-500">Flag players exceeding 50 JumpPower</p>
                </div>
                <div className="bg-blue-600 px-3 py-1 rounded-full text-xs font-medium">Enabled</div>
              </div>
              <div className="flex items-center justify-between p-4 bg-gray-900/50 rounded-lg border border-gray-800">
                <div>
                  <h4 className="font-medium text-gray-200">Noclip Detection</h4>
                  <p className="text-sm text-gray-500">Detect passing through solid parts</p>
                </div>
                <div className="bg-blue-600 px-3 py-1 rounded-full text-xs font-medium">Enabled</div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="servers">
          <Card className="bg-[#111118]/50 border-gray-800">
            <CardContent className="p-12 text-center text-gray-500">
              <Database className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>Server list populated here.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="logs">
          <Card className="bg-[#111118]/50 border-gray-800">
            <CardContent className="p-12 text-center text-gray-500">
              <p>Audit logs view.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
