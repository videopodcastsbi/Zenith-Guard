"use client";

import { motion } from "motion/react";
import { Info, Gavel, UserX, AlertTriangle, Shield, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

export default function ModerationPage() {
  const pendingActions = [
    { id: 1, player: "ExploiterX", game: "Jailbreak", reason: "Speed Hack (Severity 95)", suggested: "Kick", time: "2m ago" },
    { id: 2, player: "TrollBot", game: "Phantom Forces", reason: "Chat Spam (Severity 80)", suggested: "Mute", time: "15m ago" },
    { id: 3, player: "AnonymousUser", game: "Adopt Me!", reason: "Suspicious Trades", suggested: "Flag", time: "1h ago" }
  ];

  return (
    <div className="p-8 space-y-8 max-w-6xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
          Moderation Hub
        </h1>
        <p className="text-gray-400 mt-2">Review and execute security actions across your network.</p>
      </div>

      <Alert className="bg-blue-500/10 border-blue-500/20 text-blue-400">
        <Info className="h-4 w-4" />
        <AlertTitle>API Integration Note</AlertTitle>
        <AlertDescription>
          Actions taken here are sent as recommendations to your game servers via the Zenith-Guard API. 
          Ensure your Roblox game servers are correctly configured to handle these incoming requests.
        </AlertDescription>
      </Alert>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card className="bg-[#111118]/50 backdrop-blur border-gray-800">
            <CardHeader>
              <CardTitle className="flex items-center">
                <AlertTriangle className="mr-2 h-5 w-5 text-yellow-500" />
                Pending Actions Queue
              </CardTitle>
              <CardDescription>High-confidence detections awaiting review</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow className="border-gray-800 hover:bg-transparent">
                    <TableHead>Player</TableHead>
                    <TableHead>Game</TableHead>
                    <TableHead>Reason</TableHead>
                    <TableHead>Suggested</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pendingActions.map((action, i) => (
                    <TableRow key={action.id} className="border-gray-800 hover:bg-gray-800/30">
                      <TableCell className="font-medium text-gray-200">{action.player}</TableCell>
                      <TableCell className="text-gray-400">{action.game}</TableCell>
                      <TableCell className="text-red-400">{action.reason}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="border-orange-500/30 text-orange-400">
                          {action.suggested}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right space-x-2">
                        <Button size="sm" variant="outline" className="border-green-500/30 text-green-400 hover:bg-green-500/10">
                          <CheckCircle className="mr-1 h-3 w-3" /> Approve
                        </Button>
                        <Button size="sm" variant="ghost" className="text-gray-500 hover:text-white">Ignore</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="bg-[#111118]/50 backdrop-blur border-gray-800">
            <CardHeader>
              <CardTitle>Manual Action Tools</CardTitle>
              <CardDescription>Force actions globally</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button className="w-full justify-start bg-red-600/10 text-red-500 hover:bg-red-600/20 border border-red-500/20">
                <UserX className="mr-2 h-4 w-4" /> Global Ban Player
              </Button>
              <Button className="w-full justify-start bg-orange-600/10 text-orange-500 hover:bg-orange-600/20 border border-orange-500/20">
                <Gavel className="mr-2 h-4 w-4" /> Temporary Restriction
              </Button>
              <Button className="w-full justify-start bg-blue-600/10 text-blue-500 hover:bg-blue-600/20 border border-blue-500/20">
                <Shield className="mr-2 h-4 w-4" /> Flag for Monitoring
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
