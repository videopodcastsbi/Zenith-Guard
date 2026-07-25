"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Search, Filter, ShieldAlert } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { mockPlayers } from "@/data/mock";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function PlayersPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPlayers = mockPlayers.filter((player) =>
    player.username.toLowerCase().includes(searchQuery.toLowerCase()) || 
    player.userId.includes(searchQuery)
  );

  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          Players Overview
        </h1>
        <Button variant="outline" className="border-gray-800 bg-[#111118]">
          <Filter className="mr-2 h-4 w-4" /> Filter
        </Button>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
        <Input
          placeholder="Search by username or ID..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 bg-[#111118] border-gray-800 h-12 text-lg"
        />
      </div>

      <div className="rounded-md border border-gray-800 bg-[#111118]/50 backdrop-blur overflow-hidden">
        <Table>
          <TableHeader className="bg-black/20">
            <TableRow className="border-gray-800 hover:bg-transparent">
              <TableHead>Player</TableHead>
              <TableHead>User ID</TableHead>
              <TableHead>Risk Score</TableHead>
              <TableHead>Alerts</TableHead>
              <TableHead>Last Seen</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredPlayers.map((player, index) => (
              <TableRow 
                key={player.id} 
                className="border-gray-800 hover:bg-gray-800/30 transition-colors cursor-pointer"
              >
                <TableCell>
                  <Link href={`/players/${player.id}`} className="flex items-center space-x-3">
                    <Avatar className="h-9 w-9 border border-gray-700">
                      <AvatarImage src={`https://www.roblox.com/headshot-thumbnail/image?userId=${player.userId}&width=150&height=150&format=png`} alt={player.username} />
                      <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                        {player.username.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <span className="font-medium text-gray-200">{player.username}</span>
                  </Link>
                </TableCell>
                <TableCell className="text-gray-400 font-mono">{player.userId}</TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <div className="w-16 h-2 bg-gray-800 rounded-full overflow-hidden">
                      <div 
                        className={cn(
                          "h-full rounded-full",
                          player.riskScore < 30 ? "bg-green-500" : player.riskScore < 70 ? "bg-yellow-500" : "bg-red-500"
                        )}
                        style={{ width: `${player.riskScore}%` }}
                      />
                    </div>
                    <span className="text-sm text-gray-400">{player.riskScore}</span>
                  </div>
                </TableCell>
                <TableCell>
                  {player.alerts > 0 ? (
                    <span className="flex items-center text-red-400">
                      <ShieldAlert className="mr-1 h-4 w-4" /> {player.alerts}
                    </span>
                  ) : (
                    <span className="text-gray-500">0</span>
                  )}
                </TableCell>
                <TableCell className="text-gray-400">{player.lastSeen}</TableCell>
                <TableCell>
                  <Badge 
                    variant="outline" 
                    className={cn(
                      player.status === 'Online' ? "border-green-500/30 text-green-400" : 
                      player.status === 'Flagged' ? "border-red-500/30 text-red-400" : 
                      "border-gray-700 text-gray-500"
                    )}
                  >
                    {player.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
