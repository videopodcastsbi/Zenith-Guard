"use client";

import { useState, useEffect, useTransition, useRef } from "react";
import { motion } from "motion/react";
import { Search, Plus, ShieldAlert, Activity, Users, Server, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { getGames, addGame } from "./actions";

export default function GamesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [games, setGames] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isPending, startTransition] = useTransition();
  const [open, setOpen] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    fetchGames();
  }, []);

  const fetchGames = async () => {
    setLoading(true);
    const { games: data, error } = await getGames();
    if (data) {
      setGames(data);
    }
    setLoading(false);
  };

  const handleAddGame = (formData: FormData) => {
    startTransition(async () => {
      const res = await addGame(formData);
      if (res?.success) {
        setOpen(false);
        formRef.current?.reset();
        await fetchGames();
      }
    });
  };

  const filteredGames = games.filter((game) =>
    game.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          Protected Games
        </h1>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger 
            render={<Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 border-0" />}
          >
            <Plus className="mr-2 h-4 w-4" /> Add New Game
          </DialogTrigger>
          <DialogContent className="bg-[#111118] border-gray-800 text-white">
            <DialogHeader>
              <DialogTitle>Add Protected Game</DialogTitle>
            </DialogHeader>
            <form action={handleAddGame} ref={formRef} className="space-y-4 py-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Game Name</label>
                <Input name="name" required placeholder="e.g. My Awesome Game" className="bg-[#1a1a24] border-gray-800" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Roblox Place ID</label>
                <Input name="place_id" required placeholder="e.g. 123456789" className="bg-[#1a1a24] border-gray-800" />
              </div>
              <Button type="submit" disabled={isPending} className="w-full bg-blue-600 hover:bg-blue-700">
                {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                {isPending ? "Adding..." : "Add Game"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
        <Input
          placeholder="Search games..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 bg-[#111118] border-gray-800 h-12 text-lg"
        />
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-20">
          <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
        </div>
      ) : filteredGames.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-gray-400">No games found. Add your first game to start protecting it!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGames.map((game, index) => (
            <motion.div
              key={game.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link href={`/games/${game.id}`}>
                <Card className="bg-[#111118]/50 backdrop-blur border-gray-800/50 hover:border-blue-500/50 transition-all cursor-pointer h-full">
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-xl font-semibold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                      {game.name}
                    </CardTitle>
                    <Badge
                      variant={game.status === "Healthy" ? "default" : "destructive"}
                      className={cn(
                        "font-semibold",
                        game.status === "Healthy" ? "bg-green-500/10 text-green-400" : "bg-red-500/10 text-red-400"
                      )}
                    >
                      {game.status}
                    </Badge>
                  </CardHeader>
                  <CardContent className="space-y-4 pt-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <div className="flex items-center text-sm text-gray-400">
                          <Users className="mr-2 h-4 w-4" /> Players
                        </div>
                        <div className="text-lg font-medium text-gray-200">{game.live_players?.toLocaleString() || 0}</div>
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center text-sm text-gray-400">
                          <Server className="mr-2 h-4 w-4" /> Servers
                        </div>
                        <div className="text-lg font-medium text-gray-200">{game.servers?.toLocaleString() || 0}</div>
                      </div>
                    </div>
                    
                    <div className="pt-4 border-t border-gray-800/50 flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <ShieldAlert className={cn("h-5 w-5", "text-green-400")} />
                        <span className="text-sm font-medium text-gray-300">Score: 100/100</span>
                      </div>
                      <div className="flex items-center space-x-2 text-gray-400">
                        <Activity className="h-4 w-4" />
                        <span className="text-xs">0 events</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
