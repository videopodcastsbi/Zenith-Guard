"use client";

import { motion } from "motion/react";
import { Shield, Info, Heart, AlertTriangle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { mockGames } from "@/data/mock";
import { cn } from "@/lib/utils";

export default function ChildSafetyPage() {
  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-green-400 to-cyan-500 bg-clip-text text-transparent flex items-center">
            <Heart className="mr-3 h-8 w-8 text-green-400" />
            Child Safety & Compliance
          </h1>
          <p className="text-gray-400 mt-2 max-w-2xl">
            Monitor and manage content ratings, chat safety, and player interactions to ensure compliance 
            with Roblox community standards and global child safety regulations.
          </p>
        </div>
      </div>

      <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4 flex items-start">
        <Info className="h-5 w-5 text-yellow-500 mt-0.5 mr-3 flex-shrink-0" />
        <div className="text-sm text-yellow-200/80">
          <strong>Disclaimer:</strong> Zenith-Guard ratings are automated assessments based on chat logs and interaction data. 
          They do not replace official Roblox age guidelines or manual moderation. Always review flagged content.
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockGames.map((game, i) => (
          <motion.div
            key={game.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Card className="bg-[#111118]/50 backdrop-blur border-gray-800 h-full flex flex-col">
              <CardHeader className="pb-4">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-xl text-gray-200">{game.name}</CardTitle>
                  <Badge 
                    className={cn(
                      "font-semibold",
                      game.securityScore > 80 ? "bg-green-500/20 text-green-400 border-green-500/30" : 
                      game.securityScore > 60 ? "bg-yellow-500/20 text-yellow-400 border-yellow-500/30" : 
                      "bg-red-500/20 text-red-400 border-red-500/30"
                    )}
                    variant="outline"
                  >
                    {game.securityScore > 80 ? 'All Ages' : game.securityScore > 60 ? '9+' : '13+'}
                  </Badge>
                </div>
                <CardDescription>Place ID: {game.placeId}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6 flex-grow">
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-gray-400">Chat Filter Violations</span>
                      <span className={game.securityScore > 80 ? "text-green-400" : "text-yellow-400"}>
                        {game.securityScore > 80 ? 'Low' : 'Moderate'}
                      </span>
                    </div>
                    <div className="h-2 w-full bg-gray-800 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-500 rounded-full" style={{ width: `${100 - game.securityScore}%` }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-gray-400">Suspicious Interactions</span>
                      <span className="text-green-400">Minimal</span>
                    </div>
                    <div className="h-2 w-full bg-gray-800 rounded-full overflow-hidden">
                      <div className="h-full bg-purple-500 rounded-full" style={{ width: '15%' }} />
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-300 mb-2">Content Tags Detected</h4>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline" className="border-gray-700 text-gray-400 bg-black/20">Trading</Badge>
                    {game.name === 'Phantom Forces' && (
                      <Badge variant="outline" className="border-red-900 text-red-400 bg-red-900/10">FPS / Violence</Badge>
                    )}
                    <Badge variant="outline" className="border-gray-700 text-gray-400 bg-black/20">Multiplayer</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
