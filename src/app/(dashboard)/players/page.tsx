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
        <h1 className="text-3xl font-bold text-foreground">
          Players Overview
        </h1>
        <Button variant="outline" className="border-border bg-background">
          <Filter className="mr-2 h-4 w-4" /> Filter
        </Button>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input
          placeholder="Search by username or ID..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 bg-card border-border h-12 text-lg text-foreground placeholder:text-muted-foreground"
        />
      </div>

      <div className="rounded-md border border-border bg-card/50 backdrop-blur overflow-hidden">
        <Table>
          <TableHeader className="bg-background/50">
            <TableRow className="border-border hover:bg-transparent">
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
                className="border-border hover:bg-muted/50 transition-colors cursor-pointer"
              >
                <TableCell>
                  <Link href={`/players/${player.id}`} className="flex items-center space-x-3">
                    <Avatar className="h-9 w-9 border border-border">
                      <AvatarImage src={`https://www.roblox.com/headshot-thumbnail/image?userId=${player.userId}&width=150&height=150&format=png`} alt={player.username} />
                      <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                        {player.username.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <span className="font-medium text-foreground">{player.username}</span>
                  </Link>
                </TableCell>
                <TableCell className="text-muted-foreground font-mono">{player.userId}</TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <div className="w-16 h-2 bg-muted rounded-full overflow-hidden border border-border">
                      <div 
                        className={cn(
                          "h-full rounded-full",
                          player.riskScore < 30 ? "bg-emerald-500" : player.riskScore < 70 ? "bg-yellow-500" : "bg-destructive"
                        )}
                        style={{ width: `${player.riskScore}%` }}
                      />
                    </div>
                    <span className="text-sm text-muted-foreground">{player.riskScore}</span>
                  </div>
                </TableCell>
                <TableCell>
                  {player.alerts > 0 ? (
                    <span className="flex items-center text-destructive">
                      <ShieldAlert className="mr-1 h-4 w-4" /> {player.alerts}
                    </span>
                  ) : (
                    <span className="text-muted-foreground">0</span>
                  )}
                </TableCell>
                <TableCell className="text-muted-foreground">{player.lastSeen}</TableCell>
                <TableCell>
                  <Badge 
                    variant="outline" 
                    className={cn(
                      player.status === 'Online' ? "border-emerald-500/30 text-emerald-500" : 
                      player.status === 'Flagged' ? "border-destructive/30 text-destructive" : 
                      "border-border text-muted-foreground"
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
